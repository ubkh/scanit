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
    retailerAddProduct,
    retailerGetProduct,
    retailerGetAllProducts,
    retailerUpdateProduct
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
	path('retailer/add-product/', RetailerUploadItemAPIView.as_view(),name='retailer-add-product'),
    path('retailer/get-products/', retailerGetAllProducts, name='retailer-get-all-products'),
    path('retailer/update-product/', retailerUpdateProduct, name='update-product')
]