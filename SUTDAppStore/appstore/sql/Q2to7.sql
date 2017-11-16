USE SUTDAppStore;

#Question 2 -------------------------------------------------------------------
##Display:
SELECT Aid, AppName, price, genre from Application;
##If ordered:
###By Name in ascending:
SELECT Aid, AppName, price, genre from Application
ORDER BY AppName;
###By Name in descending:
SELECT Aid, AppName, price, genre from Application
ORDER BY AppName desc;
###By price in ascending:
SELECT Aid, AppName, price, genre from Application
ORDER BY price asc;
###By price in descending:
SELECT Aid, AppName, price, genre from Application
ORDER BY price desc;

##Arrow-down to specifics:
SELECT A.Aid, AppName, Description, Price, Genre, DateOfUpload, Avg(Stars) from Application A
INNER JOIN Gives ON A.Aid = Gives.Aid
INNER JOIN Feedback F ON F.Fid = Gives.Fid
WHERE Aid = %s;   #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/;  

#INSERT PURCHASES DATABASE After purchase:
INSERT INTO Purchases VALUES (%s, %s, %s);  #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/
#VALUES (PurchaseDate, id, Aid)

#Update Application DATABASE After purchase (On # of Downloads):
UPDATE Application SET NoOfDownloads = NoOfDownloads + 1 WHERE Application.Aid = %s;
#WHERE Application.Aid = Aid selected


#Question 3  -------------------------------------------------------------------
#User's account information (Username, email)
SELECT username, email, Application.Appname FROM auth_user, Creates, Application
WHERE auth_user.id=creates.id AND Applicaition.Aid=Creates.Aid AND username = %s;   #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/

#Select History of purchase
SELECT A.Aid, AppName, Price, PurchaseDate, genre FROM Purchases, Application 
INNER JOIN Application A ON Purchases.Aid = A.Aid
#INNER JOIN Gives ON Gives.Aid = Purchases.Aid
#INNER JOIN Feedback ON Feedback.Fid = Gives.Fid
WHERE Purchases.id = %s;  #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/

#Select History of qualitative feedback and ratings from database
SELECT star, comments from Feedback, Gives, Application WHERE Gives.Aid = %s AND auth_user.id = Gives.id; 
INNER JOIN Gives ON Gives.Fid = Feedback.Fid
INNER JOIN Application A ON A.Aid = Gives.Aid
INNER JOIN auth_user ON auth_user.id = Gives.id
WHERE auth_user.id = %s;  #To use passing parameters; see django https://docs.djangoproject.com/en/1.11/topics/db/sql/

#*Question 7* -------------------------------------------------------------------
#user's endorsement 
Select G.id,G.Aid,E.Fid,E.EndorseStars
from Endorses E INNER JOIN Gives G
WHERE G.Fid=E.Fid
AND E.id=G.id

#*Question 8* -------------------------------------------------------------------
#Game search feature: Users may search for particular games by keying certain keywords related to the search query such as:
#sort by dateofupload/year
Select A.Appname,A.DateofUpload, A.AID, A.price, A.description, A.genre
FROM Application A
WHERE A.AppName LIKE '%userinput%'
OR A.genre LIKE '%userinput%'
OR A.description LIKE '%userinput%'
ORDER BY DateofUpload ASC
UNION
Select A.Appname,A.DateofUpload, A.AID, A.price, A.description, A.genre
FROM Application A,Creates C
WHERE C.name LIKE'%userinput%'
ORDER BY DateofUpload ASC;

#by price
Select A.Appname,A.DateofUpload, A.AID, A.price, A.description, A.genre
FROM Application A
WHERE A.AppName LIKE '%userinput%'
OR (A.genre LIKE '%3D%')
OR (A.genre LIKE '%userinput%')
OR (A.description LIKE '%userinput%')
UNION
Select A.Appname,A.DateofUpload, A.AID, A.price, A.description, A.genre
FROM Application A,Creates C
WHERE C.UID LIKE'%userinput%'
ORDER BY A.price ASC;

#Game type (2D or 3D)
#Game creator
#Game genre (eg. Action, simulation, puzzle etc.)
Select A.Appname,A.DateofUpload, A.AID, A.price, A.description, A.genre
FROM Application A
WHERE A.AppName LIKE '%userinput%'
OR (A.genre LIKE '%3D%')
OR (A.genre LIKE '%userinput%')
OR (A.description LIKE '%userinput%')
UNION
Select A.Appname,A.DateofUpload, A.AID, A.price, A.description, A.genre
FROM Application A,Creates C
WHERE C.id LIKE'%userinput%'
ORDER BY (Select avg(EndorseStars) FROM Endorsement E, Application A WHERE G.Fid=E.Fid AND G.Aid=A.Aid) ASC;

#Question 10 -------------------------------------------------------------------
#check for name 
select AppName, Genre, Price from Application A, Application B, Purchases
where A.Aid=Purchases.Aid and A.AppName IS LIKE B.AppName;

#Seller - how do we identify seller of an app? -- do we need a new attribute here? how does the purchase relation help?
select DISTINCT AppName, Genre, Price from Application, Purchases, Creates
#INNER JOIN Creates ON Application.Aid = Creates.Aid
#INNER JOIN StoreUser ON StoreUser.Uid = Creates.Uid
where Purchases.Aid=Application.Aid AND Creates.Uid=Purchases.Uid;

#check for Genre -- how do we find userGenre
select AppName, Genre, Price from Application, Purchases
where Application.Aid=Purchases.Aid and Application.Genre = '2D';

#Question 11 -------------------------------------------------------------------
#how do I do this by month? 
select AppName, NoOfDownloads from Application, Purchases
where Purchases.Aid=Application.Aid
group by year(PurchaseDate)
order by NoOfDownloads Desc;


#The best selling games of the month (Number of downloads)

#Game creators with best selling games (Aggregate number of downloads)
select Creates.id, avg(NoOfDownloads) from Application, Purchases, Creates
where Purchases.Aid=Application.Aid AND Creates.id=Purchases.id 
group by Creates.id;

#Best selling genre (Aggregate number of downloads)
select count(Genre), Genre from Application, Purchases
where Purchases.Aid=Application.Aid AND PurchaseDate BETWEEN curdate() - interval 30 day and curdate()
group by Genre Desc;

#Best new games (number of downloads for games < 1 month)
select AppName, NoOfDownloads from Application, Purchases
where Purchases.Aid=Application.Aid AND PurchaseDate BETWEEN curdate() - interval 30 day and curdate()
order by NoOfDownloads Desc;

