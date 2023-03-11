from .models import Product
from .serializers import TestSerializer
from rest_framework import generics
import json
from .serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserVerificationSerializer,
    UserPasswordResetSerializer,
    UserConfirmPasswordResetSerializer,
    ) 

from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest, HttpResponseServerError
from django.core.exceptions import ValidationError


from .utils import generate_access_token
import jwt
import random
import string


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
                send_account_verification_code(request)
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
        
        if not user_instance.is_verified:
            raise AuthenticationFailed('User not verified.')

        if user_instance.is_active and user_instance.is_verified:
            user_access_token = generate_access_token(user_instance)
            response = Response()
            response.set_cookie(key='access_token', value=user_access_token, httponly=True)
            response.data = {
                'access_token': user_access_token,
                'user': {
                    'user_id': user_instance.user_id,
                    'email': user_instance.email,
                    'first_name': user_instance.first_name,
                    'last_name': user_instance.last_name,
                    'number': user_instance.number,
                    'is_staff': user_instance.is_staff,
                }
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

            user_model = get_user_model()
            current_user = get_object_or_404(user_model, user_id=user_id)

            if current_user.verification_code == input_verification_code:
                current_user.is_verified = True
                current_user.save()
                return Response({'message': 'Verification successful!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid verification code'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserPasswordResetView(APIView):
    serializer_class = UserPasswordResetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            user_model = get_user_model()
            if not email:
                return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                user = user_model.objects.get(email=email)
            except user_model.DoesNotExist:
                return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
            
            token = default_token_generator.make_token(user)
            print(user.user_id)
            uidb64 = urlsafe_base64_encode(force_bytes(user.user_id))

            reset_link = f"{request.scheme}://{request.get_host()}/api/user/password-reset/{uidb64}/{token}/"
            email_body = f"Please click the following link to reset your password: {reset_link}"
            print(email_body)
            from_email = settings.EMAIL_HOST_USER

        # Send the email
            send_mail(
                'Password Reset',
                email_body,
                from_email,
                [email],
                fail_silently=False,
            )
            return Response({'success': 'Password reset email sent.'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserPasswordResetConfirmView(APIView):
    serializer_class = UserConfirmPasswordResetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, uidb64, token):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            new_password = serializer.validated_data['password']

            user_model = get_user_model()

            try:
                uidb64 = force_str(urlsafe_base64_decode(uidb64))
                user = user_model.objects.get(user_id=uidb64)
            except (TypeError, ValueError, OverflowError, user_model.DoesNotExist):
                user = None

            if user is not None and default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return Response({'success': 'Password reset successfully.'}, status=status.HTTP_200_OK)

            return Response({'error': 'Invalid password reset link.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def send_account_verification_code(request):
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

            return JsonResponse({'message': 'Verification code sent'})
    return JsonResponse({'error': 'Invalid request'})

@csrf_exempt
def storeAddItem(request):
    productData = json.loads(request.body)
    try:
        # Same product with same expiry date and retailer is in the db, i.e: same batch. Update quantity and do not create new entries.
        # if (Product.objects.get(barcode = productData['barcode'], expiry = productData['expiry'], retailer = RETAILER_ID)):
        #     pass
        Product.objects.create(**productData)
        return HttpResponse(status=200)
    except ValidationError:
        return HttpResponseBadRequest()
    except:
        return HttpResponseServerError()
    
@csrf_exempt
def storeGetItem(_, barcode):
    queryset = Product.objects.filter(barcode=barcode)
    if (queryset.count()):
        item = queryset.first()
        return JsonResponse({'name': item.name, 'description': item.description, 'price': item.price, 'barcode': item.barcode})
    else:
        return HttpResponseBadRequest()