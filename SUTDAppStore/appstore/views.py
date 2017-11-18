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
from datetime import date, datetime

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

@api_view(['GET', 'POST'])
def app_list(request):
    """
    List all apps, or create a new app.
    """
    print(request.method)
    with connection.cursor() as cursor:
        if request.method == 'GET':
            cursor.execute("SELECT aid, app_name, description, genre FROM application")
            rows = cursor.fetchall()
            result = []
            keys = ('aid','appName','description', 'genre')
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

@api_view(['GET', 'POST', 'DELETE'])
def app_detail(request, pk):
    """
    Retrieve, update or delete a app instance.
    """
    print(request.body)
    print(request)
    print(pk)
    if request.method == 'GET':
        with connection.cursor() as cursor:
            appid = pk
            print(type(appid))
            cursor.execute("SELECT description, genre FROM application WHERE aid = %s", [appid])
            selected_app = cursor.fetchall()
            print(selected_app)
            result = []
            keys = ('description', 'genre')
            for row in selected_app:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result)
            return HttpResponse(jsonObj, content_type="application/json")

    elif request.method == 'POST':
        with connection.cursor() as cursor:
            appid = pk
            print(type(appid))
            cursor.execute("UPDATE application SET no_of_downloads = no_of_downloads + 1 WHERE application.aid = %s;", [appid])
            result = cursor.fetchall()
            jsonObj = json.dumps(result)
            return HttpResponse(jsonObj, content_type="application/json")

@api_view(['GET', 'POST', 'DELETE'])
def app_feedback(request, pk):
    """
    Retrieve, update or delete a feedback instance.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            appid = pk
            cursor.execute("SELECT DISTINCT stars, comments, username, feed_date from feedback, gives, application, auth_user WHERE gives.aid = %s AND auth_user.id = gives.id;", [appid])
            selected_feedback = cursor.fetchall()
            print(selected_feedback)
            result = []
            keys = ('stars', 'comments', 'username', 'feed_date')
            for row in selected_feedback:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default=json_serial)
            return HttpResponse(jsonObj, content_type="application/json")

@api_view(['GET', 'POST', 'DELETE'])
def user_feedback(request, pk):
    """
    Retrieve, update or delete a feedback instance.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            userid = pk
            cursor.execute("SELECT DISTINCT feedback.fid, stars, comments, username, feed_date from feedback, gives, application, auth_user WHERE auth_user.id = %s;", [userid])
            selected_feedback = cursor.fetchall()
            print(selected_feedback)
            result = []
            keys = ('fid', 'stars', 'comments', 'username', 'feed_date')
            for row in selected_feedback:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default = json_serial)
            return HttpResponse(jsonObj, content_type="application/json")


@api_view(['GET', 'POST', 'DELETE'])
def user_purchase(request, pk):
    """
    Retrieve, update or delete a purchase instance.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            userid = pk
            cursor.execute("SELECT A.aid, app_name, price, purchase_date, genre FROM purchases, application A WHERE purchases.aid = A.aid AND Purchases.id = %s;", [userid])
            selected_feedback = cursor.fetchall()
            print(selected_feedback)
            result = []
            keys = ('aid', 'app_name', 'price', 'purchase_date', 'genre')
            for row in selected_feedback:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default = json_serial)
            return HttpResponse(jsonObj, content_type="application/json")

@api_view(['GET', 'POST', 'DELETE'])
def user(request, pk):
    """
    Retrieve, update or delete a user instance.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            userid = pk
            cursor.execute("SELECT username, first_name, last_name, email, dob from auth_user WHERE auth_user.id = %s;", [userid])
            selected_feedback = cursor.fetchall()
            print(selected_feedback)
            result = []
            keys = ('username', 'first_name', 'last_name', 'email', 'dob')
            for row in selected_feedback:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default = json_serial)
            return HttpResponse(jsonObj, content_type="application/json")



def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))
