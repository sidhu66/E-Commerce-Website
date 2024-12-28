from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import redirect
from .products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Library to Access Data from Database
from .models import Product
from .serailizers import ProductSerializers
# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    route = [ '/api/products/', '/api/products/upload/', '/api/products/<id>/reviews/',
              '/api/products/top/', '/api/products/<id>/', '/api/products/delete/<id>/', 
              '/api/products/<update>/<id>/',]
    return Response(route)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serailizer = ProductSerializers(products, many=True)
    return Response(serailizer.data)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)  # Look up the product by its ID
    except Product.DoesNotExist:
        return Response({"detail": "Product not found"}, status=404)  
    serailizer = ProductSerializers(product, many=False)
    return Response(serailizer.data)

