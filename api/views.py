from .models import Product, Transaction
from rest_framework import generics
from rest_framework.decorators import api_view
import json
from .serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserVerificationSerializer,
    UserPasswordResetSerializer,
    UserConfirmPasswordResetSerializer,
    UserSerializer,
    RetailerUploadItemSerializer,
    StoreRegistrationSerializer,
    TransactionSerializer,
    ProductSerializer,
    StoreSerializer
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

from .models import Store, User

from .utils import generate_access_token, get_logged_in_user
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

            if new_user.account_type == User.Account.RETAIL_OWNER:
                store_data = {'address': request.data['store_address'], 'name': request.data['store_name'], 'description': request.data['store_description']}
                store_serializer = StoreRegistrationSerializer(data=store_data)
                if store_serializer.is_valid(raise_exception=True):
                    new_store = store_serializer.save()
                    new_user.employed_at = new_store
                    new_user.save()

            if new_user:
                access_token = generate_access_token(new_user)
                data = { 'user_id': new_user.user_id }
                response = Response(data, status=status.HTTP_201_CREATED)
                response.set_cookie(key='access_token', value=access_token, httponly=True)
                send_account_verification_code(request)
                return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StaffRegistrationAPIView(APIView):
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
            email = request.data.get('email', None)
            user_model = get_user_model()
            user = user_model.objects.get(email=email)
            # user.is_staff=True
            user.account_type=2 # RETAIL STAFF
            user.is_verified=True
            user.employed_at=Store.objects.get(id=request.data.get('employed_at_id'))      
            user.save()

            if new_user:
                access_token = generate_access_token(new_user)
                data = { 'user_id': new_user.user_id }
                response = Response(data, status=status.HTTP_201_CREATED)
                response.set_cookie(key='access_token', value=access_token, httponly=True)
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
            
            if user_instance.employed_at:
                employed_at_id = user_instance.employed_at.id
            else:
                employed_at_id = None

            response.data = {
                'access_token': user_access_token,
                'user': {
                    'user_id': user_instance.user_id,
                    'email': user_instance.email,
                    'first_name': user_instance.first_name,
                    'last_name': user_instance.last_name,
                    'number': user_instance.number,
                    'account_type': user_instance.account_type,
                    'employed_at_id': employed_at_id,
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
                # current_user.is_staff = True
                # current_user.is_retailer = True
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
            uidb64 = urlsafe_base64_encode(force_bytes(user.user_id))

            reset_link = f"{request.scheme}://{request.get_host()}/api/user/password-reset/{uidb64}/{token}/"
            email_body = f"Please click the following link to reset your password: {reset_link}"
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
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)

            return JsonResponse({'message': 'Verification code sent'})
    return JsonResponse({'error': 'Invalid request'})

# FILTER TRANSACTIONS BY BARCODE OF THE STORE
class TransactionByBarcodeList(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        barcode = self.request.query_params.get('barcode', None)
        if barcode is not None:
            return Transaction.objects.filter(shop__barcode=barcode)
        else:
            return Transaction.objects.all()
        
# FIND A TRANSACTION WITH A SPECIFIC ID  
class TransactionByIDList(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        transaction_id = self.request.query_params.get('transaction_id', None)
        if transaction_id is not None:
            return Transaction.objects.filter(transaction_id=transaction_id)
        else:
            return Transaction.objects.all()

class TransactionByUserIDList(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        customer = self.request.query_params.get('customer', None)

        if customer is not None:
            return Transaction.objects.filter(customer=customer)
        else:
            return Transaction.objects.all()

@csrf_exempt
def create_transaction(request):
    if request.method == 'POST':

        store_id = request.body.get('store')
        customer_id = request.body.get('customer')
        store = get_object_or_404(Store, id=store_id)
        customer = get_object_or_404(User, id=customer_id)

        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(store=store, customer=customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateTransactionAPIView(APIView):
    serializer_class = TransactionSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        content = { 'message': 'Hello!' }
        return Response(content)
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=200)

        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# USE THIS TO CHECK IF THE STORE BARCODE WE SCAN IS VALID
class StoreByBarcodeList(generics.ListAPIView):
    serializer_class = StoreSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        barcode = self.request.query_params.get('barcode', None)
        if barcode is not None:
            return Store.objects.filter(barcode=barcode)
        else:
            return Store.objects.all()

# USE THIS TO CHECK STORE BY ID
class StoreByUserID(generics.ListAPIView):
    serializer_class = StoreSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        id = self.request.query_params.get('id', None)
        if id is not None:
            return Store.objects.filter(id=id)
        else:
            return Store.objects.all()

class RetailerList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        retailer_types = [User.Account.RETAIL_STAFF, User.Account.RETAIL_OWNER]
        return User.objects.filter(account_type__in=retailer_types)

# USE THIS FOR WHEN WE SCAN A PRODUCT BARCODE TO CHECK IF THE PRODUCT IS IN THAT RETAILER
class ProductByBarcodeAndStoreList(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        barcode = self.request.query_params.get('barcode', None)
        store_barcode = self.request.query_params.get('store_barcode', None)

        if barcode is not None and store_barcode is not None:
            return Product.objects.filter(barcode=barcode, store__barcode=store_barcode)
        else:
            return Product.objects.none()

class RetailerUploadItemAPIView(APIView):
    serializer_class = RetailerUploadItemSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        content = { 'message': 'Hello!' }
        return Response(content)
    
    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            product_data = request.data
            product_query = Product.objects.filter(barcode=product_data['barcode'], store=product_data['store'])
            if (product_query.count()):
                product_obj = product_query.first()
                updated_quantity = product_obj.quantity + int(product_data['quantity'])
                product_obj.quantity = updated_quantity

                product_obj.save()
            else:
                serializer.save()
            return HttpResponse(status=200)
        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
def retailerGetProduct(request, barcode):
    user_token = request.COOKIES.get('access_token')
    user = get_logged_in_user(user_token)

    if not user:
        return HttpResponse('Unauthorized', status=400)
    
    if user.account_type == 1:
        return HttpResponse('Unauthorized', status=401)
    
    queryset = Product.objects.filter(barcode=barcode, store=user.employed_at) 
    if (queryset.count()):
        product_obj = queryset.first()
        return JsonResponse({'name': product_obj.name, 'description': product_obj.description, 'price': product_obj.price, 'barcode': product_obj.barcode})
    else:
        return HttpResponseBadRequest()

@csrf_exempt
def retailerGetAllProducts(request, store_id):
    
    queryset = Product.objects.filter(store=store_id)
    if (queryset.count()):
        data = list(queryset.values())
        return JsonResponse({'products':data})
    else:
        return HttpResponseBadRequest()

@csrf_exempt
def retailerUpdateProduct(request):
    # user_token = request.COOKIES.get('access_token')
    # user = get_logged_in_user(user_token)

    # if not user_token or not user or not user.account_type == User.Account.RETAIL_OWNER or not user.account_type == User.Account.RETAIL_STAFF:
    #     return HttpResponse('Unauthorized', status=401)


    try:
        product_data = json.loads(request.body)
        product_query = Product.objects.filter(barcode=product_data['barcode'], store=product_data["store"])
        if (product_query.count()):
            product_obj = product_query.first()
            for (key, value) in product_data.items():
                if (key == 'barcode'):  # should not be able to change the barcode
                    continue
                if (key=='store'):
                    continue
                setattr(product_obj, key, value)
            product_obj.save()
            return HttpResponse(status=200)
        else:
            return HttpResponseBadRequest()
    except ValidationError:
        return HttpResponseBadRequest()
    except:
        return HttpResponseServerError()
    
class RetailerBarcodeAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):
        store_id = request.data.get("store_id")
        
        try:
            store = Store.objects.get(id=store_id)

            return Response(data={"barcode": store.barcode})
            #return Response({'success': 'Password reset email sent.'}, status=status.HTTP_200_OK)

        except:
            HttpResponse("Store does not exist!", status=status.HTTP_400_BAD_REQUEST)
       
class RetailerStaffAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request, store_id):

        try:
            store = Store.objects.get(id=store_id)
            staff = User.objects.filter(employed_at=store)
            data = list(staff.values())
            return JsonResponse({'staff':data})

        except:
            return HttpResponse("Store does not exist!", status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):

        user_id = request.data.get('user_id')
    
        try:
            user = User.objects.get(user_id=user_id)
            store = user.employed_at
            staff = User.objects.filter(employed_at=store)

            data = list(staff.values())
            return JsonResponse(data, safe=False)

        except:
            HttpResponse("User does not exist!", status=status.HTTP_400_BAD_REQUEST)

class RetailerEditStaffAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        content = { 'message': 'Hello!' }
        return Response(content)
    
    def post(self, request):
        user_id = request.data.get('user_id')
        try:
            user_id = request.data.get('user_id')
            staff_query = User.objects.filter(user_id=user_id)
            if (staff_query.count()):
                staff = staff_query.first()
                
                for (key, value) in request.data.items():
                    if (key == 'user_id'):  # should not be able to change the user_id
                        continue
                    setattr(staff, key, value)
                staff.save()
                return HttpResponse(status=200)
            else:
                return HttpResponseBadRequest()
        except ValidationError:
            return HttpResponseBadRequest()
        except:
            return HttpResponseServerError()
