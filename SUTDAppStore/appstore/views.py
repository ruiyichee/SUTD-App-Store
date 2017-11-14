from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
# from .models import App
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.shortcuts import render, redirect, render_to_response
from appstore.forms import SignUpForm, EmailChangeForm
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
# from .serializers import *
from rest_framework import status , generics , mixins
from django.db import connection

import json

# Create your views here.
# def index(request):
#     template = loader.get_template('appstore/index.html')
#     context = {
#         # 'latest_question_list': latest_question_list,
#     }
#     return HttpResponse(template.render(context, request))
def signup(request):
	if request.method == "POST":
		form = SignUpForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			raw_password = form.cleaned_data.get('password1')
			user = authenticate(username=username, password=raw_password)
			login(request, user)
			return redirect('/login')
	else:
		form = SignUpForm()
	return render(request, 'signup.html', {'form':form})

def change_password(request):
	if request.method == "POST":
		form = PasswordChangeForm(request.user, request.POST)
		if form.is_valid():
			user = form.save()
			update_session_auth_hash(request, user)
			messages.success(request, 'Your password was successfully updated!')
			return redirect('/appstore')
		else:
			messages.error(request, 'Please correct the error below.')
	else:
		form = PasswordChangeForm(request.user)
	return render(request, 'accounts/change_password.html', {'form': form})

def edit_particulars(request):
	#form = EmailChangeForm(request.user)
	if request.method=='POST':
		form = EmailChangeForm(request.user, request.POST)
		if form.is_valid():
			user = form.save()
			update_session_auth_hash(request, user)
			messages.success(request, 'Your email was successfully updated!')
			return redirect('/appstore')
		else:
			messages.error(request, 'Please correct the error below.')
	else:
		form = EmailChangeForm(request.user)
	return render(request, 'accounts/profile/edit_particulars.html', {'form': form})
# class IndexView(generic.ListView):
#     template_name = 'appstore/index.html'
#     context_object_name = 'latest_app_list'
#     def get_queryset(self):
#         """Return the last five published apps."""
#         return App.objects.order_by('-pub_date')[:5]

# def index(request):
#     latest_app_list = App.objects.order_by('-pub_date')[:5]
#     context = {'latest_app_list': latest_app_list}
#     return render(request, 'appstore/index.html', context)

# def detail(request, app_id):
#     app = get_object_or_404(App, pk=app_id)
#     return render(request, 'appstore/detail.html', {'app': app})

# class DetailView(generic.DetailView):
#     model = App
#     template_name = 'appstore/detail.html'
# class app_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
#     queryset = App.objects.all()
    # testname = 'Test App'
    # for app in App.objects.raw('SELECT * FROM appstore_app WHERE app_name = %s', [testname]):
    #     print(app)
    #     cursor.execute("")
        # --> tuple which is not what i want
#     # queryset = []
#     # for app in App.objects.raw('SELECT * FROM appstore_app'):
#     #     print(app)
#     #     queryset.append(app)
    
#     serializer_class = AppSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)


@api_view(['GET', 'POST'])
def app_list(request):
    """
    List all apps, or create a new app.
    """
    print(request.method)
    with connection.cursor() as cursor:
        if request.method == 'GET':
            cursor.execute("SELECT Aid, AppName, Description, Genre FROM Application")
            rows = cursor.fetchall()
            result = []
            keys = ('Aid','AppName','Description', 'Genre')
            for row in rows:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result)
            return HttpResponse(jsonObj, content_type="application/json")
            # serializer = AppSerializer(apps,context={'request': request} ,many=True)
            # return Response(serializer.data)
        # elif request.method == 'POST':
        #     serializer = AppSerializer(data=request.data)
        #     if serializer.is_valid():
        #         serializer.save()
        #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def app_detail(request, pk):
#     """
#     Retrieve, update or delete a app instance.
#     """
#     print(request.body)
#     print(request)
#     print(pk)
#     try:
#         app = App.objects.get(pk=pk)
#         print(app)
#     except App.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = AppSerializer(app,context={'request': request})
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = AppSerializer(app, data=request.data,context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         app.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# class user_list(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
#     queryset = App.objects.all()
#     serializer_class = AppSerializer
