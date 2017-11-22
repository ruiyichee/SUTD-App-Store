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
NOT DONEEEEE

Q8 
NOT DONEEEEE

Q9
User asking for N most useful feedback, find sum of endorsement for each feedback and list it in asc order

Q10
Search Function 

Q11
Statistics for store manager