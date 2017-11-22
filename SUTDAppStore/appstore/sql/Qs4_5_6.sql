Q3 feedback history
SELECT DISTINCT stars, comments, username, feed_date FROM feedback f, gives g, application a, auth_user WHERE g.id=%s AND f.fid=g.fid AND auth_user.id = %s;

Qs 4
# Display games #
SELECT * FROM Application;

Q4 DONEEEEE
# Insertion of new games #
INSERT INTO application (date_of_upload, price, app_name, description, genre, no_of_downloads) VALUES (%s, %s, %s, %s, %s, %s);

### Q5: Increase number of downloads ### GO TO SCHEMA
# Create trigger if user purchases game #
CREATE TRIGGER IncreaseInserts
AFTER INSERT ON purchase
FOR EACH ROW 
UPDATE application
SET no_of_downloads = no_of_downloads + 1
WHERE application.aid = NEW.aid;

Q6 DONEEEEE select all feedbacks for the app
SELECT stars, comments, username, feed_date
FROM feedback f, gives g, application a, auth_user
WHERE g.aid= a.aid AND g.id=auth_user.id AND f.fid=g.fid and a.aid = %s;

Q7 
Select a.app_name,r.fid, AVG(e.thumbs) AS avg1
FROM 
(Select g.id, g.aid, g.fid, f.stars
FROM gives g, feedback f
WHERE g.fid=f.fid
AND g.aid=3
AND g.id <>9) AS temp, receives r, endorsement e, application a
WHERE temp.fid=r.fid
AND e.eid=r.eid
AND temp.aid=a.aid
GROUP BY r.fid 
ORDER BY avg1 DESC LIMIT 5;

Insert into receives (eid, fid) values (1, 4);
Insert into receives (eid, fid) values (2, 8);
Insert into receives (eid, fid) values (3, 4);
Insert into receives (eid, fid) values (4, 10);
Insert into receives (eid, fid) values (5, 11);
Insert into receives (eid, fid) values (6, 11);
Insert into receives (eid, fid) values (7, 12);
Insert into receives (eid, fid) values (8, 5);
Insert into receives (eid, fid) values (9, 20);
Insert into receives (eid, fid) values (10, 20);
Insert into receives (eid, fid) values (11, 5);
Insert into receives (eid, fid) values (12, 4);
Insert into receives (eid, fid) values (13, 17);
Insert into receives (eid, fid) values (14, 4);
Insert into receives (eid, fid) values (15, 9);
Insert into receives (eid, fid) values (16, 9);
Insert into receives (eid, fid) values (17, 19);
Insert into receives (eid, fid) values (18, 12);
Insert into receives (eid, fid) values (19, 1);
Insert into receives (eid, fid) values (20, 14);

Q8 
NOT DONEEEEE

Q9
User asking for N most useful feedback, find sum of endorsement for each feedback and list it in asc order

Q10
Search Function 

Q11
Statistics for store manager