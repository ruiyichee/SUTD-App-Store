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
            first_name = jsonUser['first_name']
            last_name = jsonUser['last_name']
            username = jsonUser['username']
            cursor.execute("UPDATE auth_user SET first_name = %s, last_name = %s WHERE auth_user.username = %s;", (first_name, last_name, username))
            return HttpResponse('201',status=status.HTTP_201_CREATED)

            # cursor.execute("INSERT INTO application (date_of_upload, price, app_name, description, genre, no_of_downloads) VALUES ('%s', '%s', '%s', '%s', '%s', '%s');", ([appDateTime], [appPrice], [appName], [appDescription], [appGenre], [appDownloads]))

@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def app_list(request):
    """
    List all apps, or create a new app.
    """
    print(request.method)
    with connection.cursor() as cursor:
        if request.method == 'GET':
            cursor.execute("SELECT app_name, aid, price, description, genre, date_of_upload, icon FROM application")
            rows = cursor.fetchall()
            result = []
            keys = ('app_name', 'aid', 'price', 'description', 'genre', 'date_of_upload', 'icon')
            for row in rows:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default=json_serial)
            return HttpResponse(jsonObj, content_type="application/json")
        elif request.method == 'POST':
            print(request.body)
            postedApp = request.body
            jsonApp=json.loads(postedApp)
            id = jsonApp['uid']
            appName = jsonApp['app_name']
            appDescription = jsonApp['description']
            appGenre = jsonApp['genre']
            appDateTime = 20171120
            appPrice = 5.0
            appDownloads = 0
            cursor.execute("INSERT INTO application (date_of_upload, price, app_name, description, genre, no_of_downloads) VALUES (%s, %s, %s, %s, %s, %s);", (appDateTime, appPrice, appName, appDescription, appGenre, appDownloads))
            cursor.execute("SELECT LAST_INSERT_ID() as last_id;")
            aid = cursor.fetchall()
            cursor.execute("INSERT INTO creates (id, aid) VALUES (%s, %s);", (id,appid))
            return HttpResponse('201',status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def recommended_app_list(request, pk):
    """
    List all recommended apps
    """
    print(request.method)
    with connection.cursor() as cursor:
        if request.method == 'GET':
            userid = pk
            cursor.execute("""
            SELECT DISTINCT app_name, A.aid, A.price, A.description, A.genre, A.date_of_upload, A.icon FROM application A, purchases P 
            WHERE A.aid = P.aid
            AND id IN (SELECT id FROM application A, purchases P
            WHERE A.aid = P.aid 
            AND A.aid IN 
            (Select A.aid from purchases P, application A
            WHERE P.aid = A.aid
            AND P.id = %s))
            AND A.aid NOT IN
            (Select A.aid from purchases P, application A
            WHERE P.aid = A.aid
            AND P.id = %s);""", (userid, userid))
            rows = cursor.fetchall()
            result = []
            keys = ('app_name', 'aid', 'price', 'description', 'genre', 'date_of_upload', 'icon')
            for row in rows:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default=json_serial)
            return HttpResponse(jsonObj, content_type="application/json")

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
            cursor.execute("""
            SELECT f.fid, stars, comments, username, feed_date FROM feedback f, gives g, application a, auth_user 
            WHERE g.aid= a.aid 
            AND g.id=auth_user.id 
            AND f.fid=g.fid 
            AND a.aid = %s;""", [appid])
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

    elif request.method == 'POST':
        with connection.cursor() as cursor:
            appid = pk
            print(request.body)
            postedFeedback = request.body
            jsonApp=json.loads(postedFeedback)
            id = jsonApp['uid']
            feedbackStars = jsonApp['stars']
            feedbackComments = jsonApp['comments']
            feedbackDate = 20171120
            cursor.execute("INSERT INTO feedback (stars, comments, feed_date) VALUES (%s, %s, %s);", (feedbackStars, feedbackComments, feedbackDate))
            cursor.execute("SELECT LAST_INSERT_ID() as last_id;")
            fid = cursor.fetchall()
            cursor.execute("INSERT INTO gives (id, aid, fid) VALUES (%s, %s, %s);", (id,appid,fid))
            return HttpResponse('201',status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST', 'DELETE'])
def app_feedback_endorsement(request, pk):
    """
    Retrieve, update or delete a endorsement instance of a feedback
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            appid = pk
            # appid = pk
            cursor.execute("""
            Select f.fid, sum(case when e.thumbs=1 then 1 else 0 end) AS up, sum(case when e.thumbs=-1 then 1 else 0 end) AS down 
            FROM receives r, endorsement e, feedback f, gives g 
            where r.eid=e.eid 
            and r.fid=f.fid 
            and f.fid=g.fid 
            and g.aid=%s 
            group by f.fid;""", [appid])
            selected_endorsement = cursor.fetchall()
            print(selected_endorsement)
            result = []
            keys = ('fid', 'up', 'down')
            for row in selected_endorsement:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default=json_serial)
            return HttpResponse(jsonObj, content_type="application/json")

    elif request.method == 'POST':
        with connection.cursor() as cursor:
            print(request.body)
            postedEndorsement = request.body
            jsonEndorsement=json.loads(postedEndorsement)
            id = jsonEndorsement['uid']
            fid = jsonEndorsement['fid']
            endorsementThumbs = jsonEndorsement['thumbs']
            cursor.execute("INSERT INTO endorsement (thumbs) VALUES (%s);", [endorsementThumbs])
            cursor.execute("SELECT LAST_INSERT_ID() as last_id;")
            eid = cursor.fetchall()
            cursor.execute("INSERT INTO receives (fid,eid) VALUES (%s, %s);", (fid,eid))
            cursor.execute("INSERT INTO writes (id,eid) VALUES (%s, %s);", (id,eid))
            return HttpResponse('201',status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST', 'DELETE'])
def user_feedback(request, pk):
    """
    Retrieve, update or delete a feedback instance.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            userid = pk
            cursor.execute("""
            SELECT DISTINCT f.fid, stars, comments, username, feed_date FROM feedback f, gives g, application a, auth_user 
            WHERE g.id=%s 
            AND f.fid=g.fid 
            AND auth_user.id = %s;""", (userid, userid))
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
            cursor.execute("""
            SELECT A.aid, app_name, price, purchase_date, genre FROM purchases, application A 
            WHERE purchases.aid = A.aid 
            AND Purchases.id = %s;""", [userid])
            selected_feedback = cursor.fetchall()
            print(selected_feedback)
            result = []
            keys = ('aid', 'app_name', 'price', 'purchase_date', 'genre')
            for row in selected_feedback:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default = json_serial)
            return HttpResponse(jsonObj, content_type="application/json")

@api_view(['GET', 'POST', 'DELETE'])
def user_endorsement(request, pk):
    """
    Retrieve, update or delete a purchase instance.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            userid = pk
            cursor.execute("""
            select et.eid, f.fid, a.app_name, et.thumbs from feedback f, receives r, application a, endorsement et, writes w, gives g 
            where w.id=%s 
            and w.eid=et.eid 
            and r.eid=et.eid 
            and r.fid=f.fid 
            and f.fid=g.fid 
            and g.aid=a.aid;""", [userid])
            selected_endorsement = cursor.fetchall()
            print(selected_endorsement)
            result = []
            keys = ('eid', 'fid', 'app_name', 'thumbs')
            for row in selected_endorsement:
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
            cursor.execute("SELECT id, username, first_name, last_name, email, dob, is_superuser from auth_user WHERE auth_user.username = %s;", [currentUsername])
            selected_feedback = cursor.fetchall()
            print(selected_feedback)
            result = []
            keys = ('id', 'username', 'first_name', 'last_name', 'email', 'dob', 'is_superuser')
            for row in selected_feedback:
                result.append(dict(zip(keys,row)))
            jsonObj = json.dumps(result, default = json_serial)
            return HttpResponse(jsonObj, content_type="application/json")

@api_view(['GET'])
def app_search(request, search_value):
    """
    Retrieve, update or delete a user instance.
    """
    if request.method == 'GET':
        with connection.cursor() as cursor:
            search_final_value = "%" + search_value + "%"
            print(search_value)
            cursor.execute("""
            Select a.app_name, a.aid,  a.price, a.description, a.genre, a.date_of_upload, a.icon FROM application a, creates c 
            WHERE c.aid=a.aid 
            AND (a.app_name LIKE %s OR a.genre LIKE %s OR a.description LIKE %s OR c.id LIKE %s) 
            ORDER BY date_of_upload DESC ;""", (search_final_value,search_final_value,search_final_value,search_final_value))
            app_list = cursor.fetchall()
            print(app_list)
            result = []
            keys = ('app_name', 'aid', 'price', 'description', 'genre', 'date_of_upload', 'icon')
            for row in app_list:
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
