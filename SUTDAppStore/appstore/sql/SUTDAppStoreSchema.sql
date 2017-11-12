USE SUTDAppStore;

CREATE TABLE StoreUser (
Uid VARCHAR (20),
DOB DATE,
Uploads BLOB,
email VARCHAR (20),
UserName CHAR (20),
PRIMARY KEY (Uid) );

CREATE TABLE Application (
DateOfUpload DATE,
Aid VARCHAR (20),
Price FLOAT,
Quantity INTEGER,
AppName CHAR (20),
Description VARCHAR (100),
Genre CHAR (20),
primary key (Aid) );

CREATE TABLE Feedback (
Fid VARCHAR (20),
Stars INTEGER,
Comments VARCHAR (100),
FeedDate DATE,
primary key (Fid) );

CREATE TABLE Purchases (
PurchaseDate DATE,
primary key (Uid, Aid),
foreign key (Uid) REFERENCES StoreUser (Uid),
foreign key (Aid) REFERENCES Application (Aid) );

CREATE TABLE Creates (
primary key (Uid, Aid),
foreign key (Uid) REFERENCES StoreUser (Uid),
foreign key (Aid) REFERENCES Application (Aid) );

CREATE TABLE Gives (
primary key (Uid, Aid, Fid),
foreign key (Uid) REFERENCES StoreUser (Uid),
foreign key (Aid) REFERENCES Application (Aid),
foreign key (Fid) REFERENCES Feedback (Fid) );