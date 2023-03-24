from django.urls import path
from .views import (
	UserRegistrationAPIView,
	StaffRegistrationAPIView,
	UserLoginAPIView,
	UserViewAPI,
	UserLogoutViewAPI,
	UserVerificationAPIView,
    UserPasswordResetView,
	UserPasswordResetConfirmView,
    RetailerUploadItemAPIView,
    TransactionByBarcodeList,
    TransactionByIDList,
    TransactionByUserIDList,
    StoreByBarcodeList,
    RetailerList,
    ProductByBarcodeAndStoreList,
    RetailerBarcodeAPIView,
    CreateTransactionAPIView,
    # retailerAddProduct,
    retailerGetProduct,
    retailerGetAllProducts,
    retailerUpdateProduct,
)

urlpatterns = [
	# USER URL PATHS
	path('user/register/', UserRegistrationAPIView.as_view()),
	path('user/login/', UserLoginAPIView.as_view()),
	path('user/login/', UserLoginAPIView.as_view(), name='user_login'),
	path('user/', UserViewAPI.as_view()),
	path('user/logout/', UserLogoutViewAPI.as_view()),
	path('user/verify/<int:user_id>/', UserVerificationAPIView.as_view(), name='verify'),
    path('user/password-reset/', UserPasswordResetView.as_view(), name='password_reset'),
    path('user/password-reset/<uidb64>/<token>/', UserPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
	
	# ADMIN (RETAILER) URL PATHS
	# path('retailer/dashboard'),
	# path('retailer/add-product/', retailerAddProduct, name='retailer-add-product'),
	
	# ADMIN (DIRECTOR) URL PATHS
	path('staff/register/', StaffRegistrationAPIView.as_view()),
    
	# CUSTOMER AND RETAILER URL PATHS FOR TRANSACTIONS
	path('transactions-by-barcode/', TransactionByBarcodeList.as_view(), name='get-transactions-by-barcode'),
    path('transactions-by-id/', TransactionByIDList.as_view(), name='get-transactions-by-id'),
    path('transactions-by-user-id/', TransactionByUserIDList.as_view(), name='get-transactions-by-user-id'),
    path('stores-by-barcode/', StoreByBarcodeList.as_view(), name='get-stores-by-barcode'),
    path('create-transaction/', CreateTransactionAPIView.as_view(), name='create-transaction'),
    
	path('check-product/', ProductByBarcodeAndStoreList.as_view(), name='check-product'),
    
	path('retailer/all/', RetailerList.as_view(), name='get-all-retailers'),
    path('staff/register/', StaffRegistrationAPIView.as_view()),
	path('retailer/add-product/', RetailerUploadItemAPIView.as_view(),name='retailer-add-product'),
    path('retailer/get-product/<str:barcode>/', retailerGetProduct, name='retailer-get-product'),
    path('retailer/get-all-products/<int:store_id>/', retailerGetAllProducts, name='retailer-get-all-products'),
    path('retailer/update-product/', retailerUpdateProduct, name='update-product'),
    path('retailer/get-barcode/', RetailerBarcodeAPIView.as_view(),name='retailer-get-barcode'),
]