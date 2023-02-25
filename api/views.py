from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError

from .models import Test, Product
from .serializers import TestSerializer
from rest_framework import generics
import json

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
        
