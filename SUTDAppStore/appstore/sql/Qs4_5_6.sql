#Qs 4
# Display games #
SELECT * FROM Application;

# Insertion of new games #
INSERT INTO application (date_of_upload, price, app_name, description, genre, no_of_downloads) VALUES (%s, %s, %s, %s, %s, %s);

### Q5: Increase number of downloads ###
# Create trigger if user purchases game #
CREATE TRIGGER IncreaseInserts
AFTER INSERT ON Purchases
FOR EACH ROW 
UPDATE application
SET no_of_downloads = no_of_downloads + 1
WHERE application.aid = NEW.aid;

#Qs 6
SELECT stars, comments, username, feed_date
FROM feedback f, gives g, application a, auth_user
WHERE g.aid= a.aid AND g.id=auth_user.id AND f.fid=g.fid and a.aid = %s;

