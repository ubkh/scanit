
from django.urls import path
from .views import main, TestView, get_text_list

urlpatterns = [
    path('', main),
    path('api/', TestView.as_view()),
    path('api/list', get_text_list, name='get_text_list')
]