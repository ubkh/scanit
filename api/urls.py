
from django.urls import re_path
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPIView, LogoutUserAPIView

urlpatterns = [
    re_path(r'^auth/login/$',
        obtain_auth_token,
        name='auth_user_login'),
    re_path(r'^auth/register/$',
        CreateUserAPIView.as_view(),
        name='auth_user_create'),
    re_path(r'^auth/logout/$',
        LogoutUserAPIView.as_view(),
        name='auth_user_logout')
]