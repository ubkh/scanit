
from django.urls import path
from .views import *

urlpatterns = [
    path('', main),
    path('create/', TestCreateView.as_view()),
    path('list/', TestGetListView.as_view(), name='get_text_list'),
    path('store-add-item/',storeAddItem, name='store-add-item')
]