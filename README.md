# SUTD AppStore

## Description
This project is part of the final deliverables for 50.012 Databases course for Fall 2017 in Singapore University of Technology and Design. The requirements for this project include creating a web app using the Django framework and utilising MySQL as the database. The SUTD App Store is created mainly for SUTD students to deposit apps of past projects that they worked on.

## Before Running
1. Download Angular 2 CLI
```
npm install -g @angular/cli 
```
2. Launch your virtual environment and download the necessary Django libraries and packages. Make sure you are using Python 3.
```
pip install django

pip install djangorestframework

pip install django-cors-headers

pip install django-rest-auth

pip install django-allauth

pip install django mysqlclient
```
3. Remember to get your MySQL server up and running using `mysql.server start`. Create a database user to interact and connect with the database. Use the following command to prevent any errors. If you so desire to change the username or password, you will have to change it in the following section in `settings.py`. Currently, this is what it looks like
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'SUTDAppstore',
        'USER': 'SUTDAppstoreUser2',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```
+ Run the following commands on MySQL to create the user
```
CREATE DATABASE SUTDAppstore CHARACTER SET UTF8;
CREATE USER SUTDAppstoreUser2@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON SUTDAppstore.* TO SUTDAppstoreUser2@localhost;
FLUSH PRIVILEGES;
```

## Instructions to Run:
1. Make sure your MySQL is up. 
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

