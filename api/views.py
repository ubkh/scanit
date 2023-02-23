from django.shortcuts import render
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserVerificationSerializer
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth import get_user_model
from .utils import generate_access_token
import jwt
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import random
import string
from django.conf import settings
from django.urls import reverse
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404

class UserRegistrationAPIView(APIView):
    serializer_class = UserRegistrationSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        content = { 'message': 'Hello!' }
        return Response(content)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_user = serializer.save()
            if new_user:
                access_token = generate_access_token(new_user)
                data = { 'user_id': new_user.user_id }
                response = Response(data, status=status.HTTP_201_CREATED)
                response.set_cookie(key='access_token', value=access_token, httponly=True)
                send_verification_code(request)
                return response
                # return redirect(reverse('verify', args=[new_user.user_id]))
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    serializer_class = UserLoginSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get('email', None)
        user_password = request.data.get('password', None)

        if not user_password:
            raise AuthenticationFailed('A user password is needed.')

        if not email:
            raise AuthenticationFailed('An user email is needed.')

        user_instance = authenticate(username=email, password=user_password)

        if not user_instance:
            raise AuthenticationFailed('User not found.')

        if user_instance.is_active:
            user_access_token = generate_access_token(user_instance)
            response = Response()
            response.set_cookie(key='access_token', value=user_access_token, httponly=True)
            response.data = {
                'access_token': user_access_token
            }
            return response

        return Response({
            'message': 'Something went wrong.'
        })

class UserViewAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('access_token')

        if not user_token:
            raise AuthenticationFailed('Unauthenticated user.')

        payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])

        user_model = get_user_model()
        user = user_model.objects.filter(user_id=payload['user_id']).first()
        user_serializer = UserRegistrationSerializer(user)
        return Response(user_serializer.data)

class UserLogoutViewAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('access_token', None)
        if user_token:
            response = Response()
            response.delete_cookie('access_token')
            response.data = {
                'message': 'Logged out successfully.'
            }
            return response
        response = Response()
        response.data = {
            'message': 'User is already logged out.'
        }
        return response

class UserVerificationAPIView(APIView):
    serializer_class = UserVerificationSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, user_id):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            input_verification_code = serializer.validated_data['verification_code']

            # Get the current user based on the authenticated request
            user_model = get_user_model()
            current_user = get_object_or_404(user_model, user_id=user_id)

            # Check if the input verification code matches the stored verification code
            if current_user.verification_code == input_verification_code:
                # If the verification code matches, mark the user as verified
                current_user.is_verified = True
                current_user.save()
                return Response({'message': 'Verification successful!'}, status=status.HTTP_200_OK)
            else:
                # If the verification code does not match, return an error message
                return Response({'error': 'Invalid verification code'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def send_verification_code(request):
    if request.method == 'POST':
        email = request.data.get('email')
        if email:
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            
            user_model = get_user_model()
            user = user_model.objects.get(email=email)
            user.verification_code = code
            user.save()

            subject = 'Verify your email'
            message = f'Your verification code is: {code}'
            print(message)
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)

            # Return a success response
            return JsonResponse({'message': 'Verification code sent'})
    return JsonResponse({'error': 'Invalid request'})