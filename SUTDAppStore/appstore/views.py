from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import App
from .serializers import *
from django.db import connection

from rest_framework import status , generics , mixins

class app_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):

    queryset = App.objects.all()
    serializer_class = AppSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class app_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = App.objects.all()
    serializer_class = AppSerializer

