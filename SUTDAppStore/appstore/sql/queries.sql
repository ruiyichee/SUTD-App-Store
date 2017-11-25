USE SUTDAppStore;

###Q2 -------------------------------------------------------------------
##Display:
SELECT aid, app_name, price, genre from application;
##If ordered:
###By Name in ascending:
SELECT aid, app_name, price, genre from application
ORDER BY app_name;
###By Name in descending:
SELECT aid, app_name, price, genre from application
ORDER BY app_name desc;
###By price in ascending:
SELECT aid, app_name, price, genre from application
ORDER BY price asc;
###By price in descending:
SELECT aid, app_name, price, genre from application
ORDER BY price desc;

##Arrow-down to specifics:
SELECT A.aid, app_name, Description, Price, Genre, date_of_upload, Avg(Stars) from application A
INNER JOIN gives ON A.aid = gives.aid
INNER JOIN feedback F ON F.Fid = gives.Fid
WHERE A.aid = %s;   #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/;  

#INSERT purchases DATABASE After purchase:
INSERT INTO purchases VALUES (%s, %s, %s);  #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/
#VALUES (purchase_date, id, aid)

#Update application DATABASE After purchase (On # of Downloads):
UPDATE application SET NoOfDownloads = NoOfDownloads + 1 WHERE application.aid = %s;
#WHERE application.aid = aid selected


###Q3  -------------------------------------------------------------------
#User's account information (Username, email)
SELECT username, email, application.app_name FROM auth_user, creates, application
WHERE auth_user.id=creates.id AND application.aid=creates.aid AND username = %s;   #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/

#Select History of purchase
SELECT A.aid, A.app_name, A.price, purchase_date, A.genre FROM purchases
INNER JOIN application A ON purchases.aid = A.aid
#INNER JOIN gives ON gives.aid = purchases.aid
#INNER JOIN feedback ON feedback.Fid = gives.Fid
WHERE purchases.id = %s;  #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/

#Select History of qualitative feedback and ratings from database
SELECT A.app_name, comments from feedback
INNER JOIN gives ON gives.Fid = feedback.Fid
INNER JOIN application A ON A.aid = gives.aid
INNER JOIN auth_user ON auth_user.id = gives.id
WHERE auth_user.id = %s;  #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/

# Select History of ratings: listed out all the ratings/star the user gave to other people’s feedback 
select et.eid, f.fid, a.app_name, et.thumbs from feedback f, receives r, application a, endorsement et, writes w, gives g
where w.id=1 
and w.eid=et.eid
and r.eid=et.eid
and r.fid=f.fid
and f.fid=g.fid
and g.aid=a.aid;

#ONLY USER WHO BOUGHT THE APP CAN GIVE THE feedback


### Q4: New games ###
# Display games #
SELECT * FROM application;

# Insertion of new games #
INSERT INTO application(date_of_upload, aid, price, quantity,
app_name, description, genre, no_of_downloads)
VALUES (date_of_upload, aid, price, quantity, app_name, 
description, genre, no_of_downloads);

### Q5: Increase number of downloads ###
# Display number of downloads #
SELECT no_of_downloads FROM application
WHERE application.aid = application.aid;

### Q6: Insertion of new feedback ###
# Display feedback #
select gives.aid, gives.id, f.fid, stars, comments, feed_date, app_name, username from feedback f, gives, application, auth_user
where gives.aid= application.aid and gives.id=auth_user.id and f.fid=gives.fid
order by app_name;
# Insert feedback #
INSERT INTO feedback(fid, stars, comments, feed_date)
VALUES (fid, stars, comments, feed_date);

### Q7 ------------------------------------------------------
Select g.id, g.aid, g.fid, f.stars
FROM gives g, feedback f
WHERE g.fid=f.fid
AND g.aid=3
AND g.id <>9;

###Q8 -------------------------------------------------------
#question 8:
#SEARCH BAR: SORT BY 
Select a.app_name, a.aid,  a.price, a.description, a.genre, a.date_of_upload, a.icon 
FROM application a, creates c
WHERE c.aid=a.aid
AND
(a.app_name LIKE '%temple%' OR a.genre LIKE '%temple%' OR a.description LIKE '%temple%' OR c.id LIKE '%temple%')
ORDER BY date_of_upload DESC ;
#ORDER BY a.price ASC;
#ORDER BY a.price DESC;
#ORDER BY a.app_name ASC;
#ORDER BY a.app_name DESC;

Select g.aid, a.app_name, avg(f.stars) from feedback f, gives g, application a
WHERE g.fid=f.fid
AND g.aid=a.aid
GROUP BY g.aid
ORDER BY AVG(f.stars) DESC;

#FILTER:
#1. GENRE: 3D
Select a.app_name, a.aid,  a.price, a.description, a.genre, a.date_of_upload, a.icon 
FROM application a
WHERE a.genre="3D"
ORDER BY date_of_upload DESC;
#GENRE: 2D
Select a.app_name, a.aid,  a.price, a.description, a.genre, a.date_of_upload, a.icon 
FROM application a
WHERE a.genre="2D"
ORDER BY date_of_upload DESC;

#2.PRICE: <5
Select a.app_name, a.aid,  a.price, a.description, a.genre, a.date_of_upload, a.icon 
FROM application a
WHERE a.price <5
ORDER BY a.price DESC;
# PRICE : 5 - 10
Select a.app_name, a.aid,  a.price, a.description, a.genre, a.date_of_upload, a.icon 
FROM application a
WHERE a.price >=5 and a.price <10
ORDER BY a.price DESC;
#PRICE: >10
Select a.app_name, a.aid,  a.price, a.description, a.genre, a.date_of_upload, a.icon 
FROM application a
WHERE a.price >10
ORDER BY a.price DESC;

#3.CREATOR
Select a.app_name, a.aid,  a.price, a.description, a.genre, a.date_of_upload, a.icon 
FROM application a, creates c, auth_user 
WHERE c.id=auth_user.id
AND c.id='%s%';

select avg(f.stars), app_name from feedback f, application a, gives g
where a.aid=g.aid
group by(g.aid);

#order by avg(f.stars) desc;


###Q9 -------------------------------------------------------
Select a.app_name,r.fid, AVG(e.thumbs) AS avg1
FROM 
(Select g.id, g.aid, g.fid, f.stars
FROM gives g, feedback f
WHERE g.fid=f.fid
AND g.aid= 3
AND g.id <>9) AS temp, receives r, endorsement e, application a
WHERE temp.fid=r.fid
AND e.eid=r.eid
AND temp.aid=a.aid
GROUP BY r.fid 
ORDER BY avg1 DESC LIMIT 3;

###Q10

SELECT DISTINCT app_name, A.aid FROM application A, purchases P
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
AND P.id = %s);

#Q11 -------------------------------------------------------------------
#best selling new games
#select distinct app_name, sum(no_of_downloads), purchase_date from application, purchases
#where purchases.aid=application.aid
#group by(no_of_downloads)
#order by year(purchase_date) desc;

#4 
select distinct app_name, no_of_downloads from application, purchases
where purchases.aid=application.aid AND date_of_upload BETWEEN curdate() - interval 30 day and curdate()
order by no_of_downloads Desc;


#2 Game creators with best selling games (Aggregate number of downloads) - WORKING
select DISTINCT creates.id,first_name , sum(no_of_downloads) from application, purchases, creates, auth_user
where purchases.aid=application.aid AND creates.id=purchases.id AND auth_user.id=creates.id
group by (creates.id)
order by sum(no_of_downloads) desc;

#3 Best selling genre (Aggregate number of downloads) - returning a count of 14 instead of 20 -- why?
select count(genre), genre from application, purchases
where purchases.aid=application.aid AND purchase_date BETWEEN curdate() - interval 200000 day and curdate()
group by genre
order by count(genre) desc;


#1 Best selling games  (number of downloads for games < 1 month) - WORKING
select distinct app_name, no_of_downloads from application, purchases
where purchases.aid=application.aid AND purchase_date BETWEEN curdate() - interval 30 day and curdate()
order by no_of_downloads Desc;

#ENDORSEMENT THING COUNTING THUMBS
Select f.fid,
sum(case when e.thumbs=1 then 1 else 0 end) AS up,
sum(case when e.thumbs=-1 then 1 else 0 end) AS down
FROM receives r, endorsement e, feedback f
where r.eid=e.eid
and r.fid=f.fid
group by f.fid;



