
# SUTD AppStore

## Description
This project is part of the final deliverables for 50.012 Databases course for Fall 2017 in Singapore University of Technology and Design. The requirements for this project include creating a web app using the Django framework and utilising MySQL as the database. The SUTD App Store is created mainly for SUTD students to deposit apps of past projects that they worked on.

## Collaborators
1. Neo Ze Yuan Matthew 1001483
2. Maylizabeth 1001818 
3. Aastha Chouhan 1001782
4. Yin Ji Sheng 1001670
5. Chee Rui Yi 1001738

### 1. Registration/New subscription: 
+ A new user has to provide necessary information such as:
    + Username (Must be unique)
    + First Name
    + Last Name
    + Email 
    + Date of Birth 
    + Password 

The SQL query shows the first name, last name and username only as other information is being handled by the backend, Django, using rest auth and django rest framework.
```
UPDATE auth_user SET first_name = %s, last_name = %s 
WHERE auth_user.username = %s;", (first_name, last_name, username)
```

### 2. Ordering:
+ In the Appstore project, one particular game can only be downloaded once by the same user. Hence, this feature is not applicable to this project. 


### 3. User profile: 
+ When user accesses his/her dashboard or homepage, user will be able to view the following information: 
#### User’s account information: 
+ Id
+ Username
+ First name
+ Last name
+ Email
+ Date of Birth
+ User Status (which is a boolean, indicating whether the user is admin or not)
```
"SELECT id, username, first_name, last_name, email, dob, is_superuser from auth_user WHERE auth_user.username = %s;", [currentUsername]
```
#### History of purchase: 
+ Aid
+ App name
+ Price of the App
+ Purchase Date
+ Genre
```
"""SELECT A.aid, app_name, price, purchase_date, genre FROM purchases, application A
WHERE purchases.aid = A.aid
AND Purchases.id = %s;""", [userid]
```

#### History of qualitative feedback: listed out the feedbacks the user gave to other apps/games before
+ Fid
+ Stars
+ Comments
+ Username
+ Feedback Date

```
"""SELECT DISTINCT f.fid, stars, comments, username, feed_date FROM feedback f, gives g, application a, auth_user
WHERE g.id=%s
AND f.fid=g.fid
AND auth_user.id = %s;""", (userid, userid)
```
#### History of endorsement: 
+ Listed out all the endorsement in form of thumbs that the user gave to other people’s feedback 
    + Eid
    + Fid
    + App name
    + Thumbs
```
"""SELECT et.eid, f.fid, a.app_name, et.thumbs FROM feedback f, receives r, application a, endorsement et, writes w, gives g 
WHERE w.id=%s 
AND w.eid=et.eid 
AND r.eid=et.eid 
AND r.fid=f.fid 
AND f.fid=g.fid 
AND g.aid=a.aid;""", [userid]
```

### 4. New games added: 
+ The website administrator can add new games into the database, when creating a new game entry, it should contain the following:
    + date_of_upload
    + price
    + app_name
    + description
    + genre
    + no_of_downloads

+ Instead of indicating the number of new books that have arrived, we will include the number of downloads or purchases that has been made. 
```
"INSERT INTO application (date_of_upload, price, app_name, description, genre, no_of_downloads) VALUES (%s, %s, %s, %s, %s, %s);", (appDateTime, appPrice, appName, appDescription, appGenre, appDownloads)
```

+ To obtain the id of the newly-created app:
```
SELECT LAST_INSERT_ID() as last_id;
```

+ To insert the newly-created app into the relation entity “creates”:
```
"INSERT INTO creates (id, aid) VALUES (%s, %s);", (id,aid)
```


### 5. Arrival of more copies: 
+ As an app store doesn’t require physical products unlike books, we will store the total number of purchases/downloads. Every time a purchase/download has been made, the number of purchase/download increases by 1.

+ SQL query for adding application to “purchases” database:
```
"INSERT INTO purchases (id, aid, purchase_date) VALUES (%s, %s, %s);", (userid,appid,purchaseDate)
```

+ SQL query for incrementing the number of downloads:
```
"UPDATE application SET no_of_downloads = no_of_downloads + 1 WHERE application.aid = %s;", [appid]
```

+ SQL query for displaying the number of downloads for a given application:
```
"SELECT app_name, aid, price, description, genre, date_of_upload, icon, no_of_downloads FROM application"
```

+ SQL trigger to increase number of downloads whenever the following app has been purchased:
```
CREATE TRIGGER increase_inserts
AFTER INSERT ON purchases
FOR EACH ROW 
UPDATE application
SET no_of_downloads = no_of_downloads + 1
WHERE application.aid = NEW.aid;
```

### 6. User’s review: 
+ Users can give a feedback for a game. For each feedback, users should fill up the following fields:
    + Date of feedback given
    + Scale of feedback (0-10; 0=absolute rubbish, 10=crazily addictive game)
    + Optional commentary (limit like 1000 characters or so)
    

+ SQL query for adding feedback to an application:
```
"INSERT INTO feedback (stars, comments, feed_date) VALUES (%s, %s, %s);", (feedbackStars, feedbackComments, feedbackDate)
```

+ SQL query for adding feedback to “gives” database:
```
“INSERT INTO gives (id, aid, fid) VALUES (%s, %s, %s);", (id,appid,fid)
```

+ SQL query for displaying feedback for a given application:
```
"""SELECT f.fid, stars, comments, username, feed_date FROM feedback f, gives g, application a, auth_user 
WHERE g.aid= a.aid 
AND g.id=auth_user.id 
AND f.fid=g.fid 
AND a.aid = %s;""", [appid]
```

### 7. User’s endorsement: 
+ User can endorse feedbacks given by other users on a particular game, with either a thumbs up or a thumbs down. A user is not allowed to rate his/her own feedback.

+ SQL query for adding endorsement to feedback:
```
"INSERT INTO endorsement (thumbs) VALUES (%s);", [endorsementThumbs]
```
+ SQL query for storing endorsements into “receives” database:
```
"INSERT INTO receives (fid,eid) VALUES (%s, %s);", (fid,eid)
```

+ SQL query for storing endorsements into “writes” database:
```
"INSERT INTO receives (fid,eid) VALUES (%s, %s);", (fid,eid)
```

+ SQL query for displaying endorsements as thumbs up or thumbs down for a given feedback:
```
"""SELECT f.fid, sum(case when e.thumbs=1 then 1 else 0 end) AS up, sum(case when e.thumbs=-1 then 1 else 0 end) AS down 
FROM receives r, endorsement e, feedback f, gives g 
WHERE r.eid=e.eid 
AND r.fid=f.fid 
AND f.fid=g.fid 
AND g.aid=%s 
GROUP BY f.fid;""", [appid]
```

### 8. Game search feature: 
+ Users may search for particular games by keying certain keywords related to the search query such as: 
    + game title 
    + price range of less than 5, between 5 and 10, and more than 10  
    + genre such as 2D and 3D

```
#DEFAULT when the user did not specify the search criteria
#FROM DJANGO

If (genre == 'All'):
          genre = '%'
If (search_value == 'All'):
          search_final_value = '%'

#When user specify at least one search criteria
#Below is the sample code for one the criteria input: price <5. Similar codes are reiterated for different different price range. 

SELECT a.app_name, a.aid, a.price, a.description, a.genre, a.date_of_upload, a.icon, a.no_of_downloads
FROM application a
INNER JOIN creates c 
ON c.aid = a.aid
WHERE a.genre LIKE %s
AND (a.app_name LIKE %s OR a.description LIKE %s OR c.id LIKE %s);""", (genre,search_final_value,search_final_value,search_final_value));
```

### 9. Useful Feedbacks: 
+ Filters the feedback according to its endorsement scores. Usefulness of a feedback is its average endorsement score. 
+ The usefulness level is set by the viewer, and only the reviews with a endorsement score that is more than or equal to the level specified will be displayed. 

```
SELECT f.fid, sum(case when e.thumbs=1 then 1 else 0 end) AS up, sum(case when e.thumbs=-1 then 1 else 0 end) AS down 
FROM receives r, endorsement e, feedback f, gives g 
WHERE r.eid=e.eid 
AND r.fid=f.fid 
AND f.fid=g.fid 
AND g.aid=%s 
GROUP BY f.fid;, [appid])
```

### 10. Games recommendation: 
+ After user purchased a game (Game X), games recommendation will appear at the home page and are limited to 3 recommendations.
+ When a user purchased Game X, the system will give a list of other recommended games. Game Y is suggested, if there exist a user A that bought game X and Y.
```
"""SELECT DISTINCT app_name, A.aid, A.price, A.description, A.genre, A.date_of_upload,A.icon, A.no_of_downloads 
FROM application A, purchases P 
WHERE A.aid = P.aid
AND id IN (SELECT id FROM application A, purchases P
WHERE A.aid = P.aid 
AND A.aid IN 
(SELECT A.aid FROM purchases P, application A
WHERE P.aid = A.aid
AND P.id = %s))
AND A.aid NOT IN
(SELECT A.aid FROM purchases P, application A
WHERE P.aid = A.aid
AND P.id = %s);""", (userid, userid);
```


### 11. Sales performance: every month, the website owner could view top 5 or 10:
+ The best selling games of the month (Number of downloads)
+ Game creators with best selling games (Aggregate number of downloads)
+ Best selling genre (Aggregate number of downloads)
```
"""SELECT DISTINCT app_name, no_of_downloads from application, purchases
WHERE purchases.aid=application.aid 
AND purchase_date 
ORDER BY  no_of_downloads Desc;"""
```
```
"""SELECT DISTINCT first_name , sum(no_of_downloads) from application, purchases, creates, auth_user
where purchases.aid=application.aid 
AND creates.id=purchases.id 
AND auth_user.id=creates.id
GROUP BY (creates.id)
ORDER BY SUM(no_of_downloads) desc limit 6;"""
```
```
"""SELECT genre, count(genre) 
FROM application, purchases
WHERE purchases.aid=application.aid 
AND purchase_date BETWEEN curdate() - interval 200000 day and curdate()
GROUP BY genre
ORDER BY count(genre) DESC;"""
```


```python

```
