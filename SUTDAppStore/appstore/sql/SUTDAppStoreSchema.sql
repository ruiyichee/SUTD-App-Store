USE SUTDAppStore;

CREATE TABLE Application (
DateOfUpload DATE,
Aid VARCHAR (20),
Price FLOAT,
Quantity INTEGER,
AppName CHAR (20),
Description VARCHAR (100),
Genre CHAR (20),
NoOfDownloads INTEGER,
primary key (Aid) );

Alter table auth_user
ADD DOB DATE;

Alter table auth_user
ADD Uploads BLOB;

CREATE TABLE Feedback (
Fid VARCHAR (20),
Stars INTEGER,
Comments VARCHAR (100),
FeedDate DATE,
primary key (Fid) );

CREATE TABLE Purchases (
PurchaseDate DATE,
id INTEGER,
Aid VARCHAR (20),
primary key (id, Aid),
foreign key (id) REFERENCES auth_user (id),
foreign key (Aid) REFERENCES Application (Aid) );

CREATE TABLE Creates (
id INTEGER,
Aid VARCHAR (20),
primary key (id, Aid),
foreign key (id) REFERENCES auth_user (id),
foreign key (Aid) REFERENCES Application (Aid) );

CREATE TABLE Gives (
id INTEGER,
Aid VARCHAR (20),
Fid VARCHAR (20),
primary key (id, Aid, Fid),
foreign key (id) REFERENCES auth_user (id),
foreign key (Aid) REFERENCES Application (Aid),
foreign key (Fid) REFERENCES Feedback (Fid) );

CREATE TABLE Endorses (
id VARCHAR(20),
Fid VARCHAR(20),
EndorseStars INTEGER CHECK (Stars>0 AND stars<6),
primary key (id, Fid),
foreign key (id) REFERENCES auth_user (id),
foreign key (Fid) REFERENCES Feedback (Fid) );