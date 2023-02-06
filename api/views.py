from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Test
from .serializers import TestSerializer
from rest_framework import generics

# Create your views here.
def main(request):
    return HttpResponse("<h1>Hello, world.</h1>")

class TestCreateView(generics.CreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

# @csrf_exempt
# def get_text_list(request):
#     if request.method == "GET":
#         text_list = Test.objects.all()
#         serializer = TestSerializer(text_list, many=True)
#         return JsonResponse(serializer.data, safe=False)

class TestGetListView(generics.ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer