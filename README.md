# SUTD AppStore

## Description
This project is part of the final deliverables for 50.012 Databases course for Fall 2017 in Singapore University of Technology and Design. The requirements for this project include creating a web app using the Django framework and utilising MySQL as the database. The SUTD App Store is created mainly for SUTD students to deposit apps of past projects that they worked on.

## Before Running
Launch virtual environment. Install Angular 2 CLI and the following libraries to setup Django backend without errors. 
+ Download Angular 2 CLI
```
npm install -g @angular/cli 
```
+ Download Django
```
pip install django
```
+ Download Django Restframework
```
pip install djangorestframework
```
+ Download Django Corsheaders
```
pip install django-cors-headers
```
+ Download Django Rest authentication package
```
pip install django-rest-auth
```
+ Download Django All authentication package
```
pip install django-allauth
```
+ Download Django MySQL
```
pip install django mysqlclient
```

## Instructions to Run:
1. Remember to get your MySQL server up and running using `mysql.server start`
2. cd into SUTDAppStore and run django server using `python manage.py runserver`
3. Open a new command line tab and cd into Frontend and serve Angular 2 using `npm start`
4. Go to your favourite web browser and enter the url `localhost:4200` to launch the SUTD AppStore

## Using the Web App:
1. Once you enter, you will be greeted by the login page, simply click on sign up to create a new account. 
2. A confirmation email will be sent, but no further action is required. Users will still be able to access the website even if their accounts are not activated.
3. Browse and purchase apps! No implementation of actual purchase is included in this web app.
4. You can also give feedbacks and endorse other people's feedbacks. 
5. You can view your user profile, transaction history, feedback history and endorsement history.
6. If you are an admin, you will also be able to view the sales section. The best performing apps and developers can be seen in a separate tab called "Sales". It will only appear if you are authenticated as a superuser.

## Team Members
1. Neo Ze Yuan Matthew 1001483
2. Maylizabeth 1001818 
3. Aastha Chouhan 1001782
4. Yin Ji Sheng 1001670
5. Chee Rui Yi 1001738

