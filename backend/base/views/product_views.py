from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework import status

from base.models import Product
from base.serailizers import ProductSerializers, UserSerializers, UserSerializerWithToken
from base.products import products


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
