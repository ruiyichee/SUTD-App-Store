from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
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
from decimal import Decimal
import json

# Create your views here.
# def index(request):
#     template = loader.get_template('appstore/index.html')
#     context = {
#         # 'latest_question_list': latest_question_list,
#     }
#     return HttpResponse(template.render(context, request))
@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def signup(request):
    jsonUser = json.loads(request.body)
    if (request.method == "POST"):
        with connection.cursor() as cursor:
            username = jsonUser['username']
            first_name = jsonUser['first_name']
            last_name = jsonUser['last_name']
            email = jsonUser['email']
            password = jsonUser['password1']
            dob = 20110103
            is_superuser = 0
            is_staff = 0
            is_active = 0
            date_joined = 20110103
            cursor.execute("INSERT INTO auth_user (date_joined, is_active, is_staff, is_superuser, username, first_name, last_name, email, password, dob) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", (date_joined, is_active, is_staff, is_superuser, username, first_name, last_name, email, password, dob))
            return HttpResponse('201',status=status.HTTP_201_CREATED)

            # cursor.execute("INSERT INTO application (date_of_upload, price, app_name, description, genre, no_of_downloads) VALUES ('%s', '%s', '%s', '%s', '%s', '%s');", ([appDateTime], [appPrice], [appName], [appDescription], [appGenre], [appDownloads]))

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
@permission_classes((IsAuthenticated,))
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
        elif request.method == 'POST':
            print(request.body)
            postedApp = request.body
            jsonApp=json.loads(postedApp)
            appName = jsonApp['app_name']
            appDescription = jsonApp['description']
            appGenre = jsonApp['genre']
            appDateTime = 20171120
            appPrice = 5.0
            appDownloads = 0
            # cursor.execute("INSERT INTO application (date_of_upload, price, app_name, description, genre, no_of_downloads) VALUES ('%s', '%s', '%s', '%s', '%s', '%s');", ([appDateTime], [appPrice], [appName], [appDescription], [appGenre], [appDownloads]))
            cursor.execute("INSERT INTO application (date_of_upload, price, app_name, description, genre, no_of_downloads) VALUES (%s, %s, %s, %s, %s, %s);", (appDateTime, appPrice, appName, appDescription, appGenre, appDownloads))
            return HttpResponse('201',status=status.HTTP_201_CREATED)

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
            cursor.execute("SELECT f.fid, stars, comments, username, feed_date FROM feedback f, gives g, application a, auth_user WHERE g.aid= a.aid AND g.id=auth_user.id AND f.fid=g.fid and a.aid = %s;", [appid])
            selected_feedback = cursor.fetchall()
            print(selected_feedback)
            result = []
            keys = ('fid', 'stars', 'comments', 'username', 'feed_date')
            for row in selected_feedback:
                result.append(dict(zip(keys,row)))
            print('Working til here')
            jsonObj = json.dumps(result, default=json_serial)
            print('Working til dumps')
            return HttpResponse(jsonObj, content_type="application/json")

@api_view(['GET', 'POST', 'DELETE'])
def app_feedback_endorsement(request, pk):
    """
    Retrieve, update or delete a endorsement instance of a feedback
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            appid = pk
            # appid = pk
            cursor.execute("Select f.fid, sum(case when e.thumbs=1 then 1 else 0 end) AS up, sum(case when e.thumbs=-1 then 1 else 0 end) AS down FROM receives r, endorsement e, feedback f, gives g where r.eid=e.eid and r.fid=f.fid and f.fid=g.fid and g.aid=%s group by f.fid;", [appid])
            selected_endorsement = cursor.fetchall()
            print(selected_endorsement)
            result = []
            keys = ('fid', 'up', 'down')
            for row in selected_endorsement:
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
            cursor.execute("SELECT DISTINCT f.fid, stars, comments, username, feed_date FROM feedback f, gives g, application a, auth_user WHERE g.id=%s AND f.fid=g.fid AND auth_user.id = %s;", (userid, userid))
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
def user(request, username):
    """
    Retrieve, update or delete a user instance.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            currentUsername = username
            cursor.execute("SELECT id, username, first_name, last_name, email, dob from auth_user WHERE auth_user.username = %s;", [currentUsername])
            selected_feedback = cursor.fetchall()
            print(selected_feedback)
            result = []
            keys = ('id', 'username', 'first_name', 'last_name', 'email', 'dob')
            for row in selected_feedback:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default = json_serial)
            return HttpResponse(jsonObj, content_type="application/json")



def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError ("Type %s not serializable" % type(obj))
