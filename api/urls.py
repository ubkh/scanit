from django.urls import path
from .views import (
	UserRegistrationAPIView,
	UserLoginAPIView,
	UserViewAPI,
	UserLogoutViewAPI,
	UserVerificationAPIView,
    UserPasswordResetView,
	UserPasswordResetConfirmView,
    storeAddItem,
    storeGetItem
)

urlpatterns = [
	path('user/register/', UserRegistrationAPIView.as_view()),
	path('user/login/', UserLoginAPIView.as_view()),
	path('user/', UserViewAPI.as_view()),
	path('user/logout/', UserLogoutViewAPI.as_view()),
	path('user/verify/<int:user_id>/', UserVerificationAPIView.as_view(), name='verify'),
    path('user/password-reset/', UserPasswordResetView.as_view(), name='password_reset'),
    path('user/password-reset/<uidb64>/<token>/', UserPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
	path('store-add-item/', storeAddItem, name='store-add-item'),
    path('store-get-item/<str:barcode>', storeGetItem, name='store-get-item')
]