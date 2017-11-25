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
Select f.fid,
sum(case when e.thumbs=1 then 1 else 0 end) AS up,
sum(case when e.thumbs=-1 then 1 else 0 end) AS down
FROM receives r, endorsement e, feedback f, gives g
where r.eid=e.eid
and r.fid=f.fid
and f.fid=g.fid
and g.aid=1
group by f.fid;

Insert into endorsement (eid, thumbs) values(1, 1);
Insert into endorsement (eid, thumbs) values(2, -1);
Insert into endorsement (eid, thumbs) values(3, -1);
Insert into endorsement (eid, thumbs) values(4, -1);
Insert into endorsement (eid, thumbs) values(5, -1);
Insert into endorsement (eid, thumbs) values(6, 1);
Insert into endorsement (eid, thumbs) values(7, 1);
Insert into endorsement (eid, thumbs) values(8, 1);
Insert into endorsement (eid, thumbs) values(9, 1);
Insert into endorsement (eid, thumbs) values(10, 1);
Insert into endorsement (eid, thumbs) values(11, 1);
Insert into endorsement (eid, thumbs) values(12, 1);
Insert into endorsement (eid, thumbs) values(13, 1);
Insert into endorsement (eid, thumbs) values(14, 1);
Insert into endorsement (eid, thumbs) values(15, 1);
Insert into endorsement (eid, thumbs) values(16, 1);
Insert into endorsement (eid, thumbs) values(17, 1);
Insert into endorsement (eid, thumbs) values (18,-1);
Insert into endorsement (eid, thumbs) values (19,1);
Insert into endorsement (eid, thumbs) values (20,-1);

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