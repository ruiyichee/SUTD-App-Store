USE SUTDAppStore;

CREATE TABLE application (
date_of_upload DATE, 
aid INT NOT NULL AUTO_INCREMENT,
price FLOAT,
app_name CHAR (20),
description VARCHAR (100),
genre VARCHAR (20),
no_of_downloads INT,
icon BLOB,
app_file BLOB,
screenshot_1 BLOB,
screenshot_2 BLOB,
screenshot_3 BLOB,
primary key (aid) );

CREATE TABLE feedback (
fid INT NOT NULL AUTO_INCREMENT,
stars INTEGER CHECK(stars>0 AND stars<6),
comments VARCHAR (100),
feed_date DATE,
primary key (fid) );

CREATE TABLE endorsement (
eid INT NOT NULL AUTO_INCREMENT,
thumbs INT DEFAULT 0,
CHECK (thumbs =-1 OR thumbs=1) ,
PRIMARY KEY (eid) );

CREATE TABLE purchases (
id INT,
aid INT,
purchase_date DATE,
primary key (id, aid),
foreign key (id) REFERENCES auth_user(id),
foreign key (aid) REFERENCES application (aid) );

CREATE TABLE creates (
id INT,
aid INT,
primary key (id, aid),
foreign key (id) REFERENCES auth_user(id),
foreign key (aid) REFERENCES application (aid) );

CREATE TABLE gives (
id INT,
aid INT,
fid INT,
primary key (id, aid, fid),
foreign key (id) REFERENCES auth_user(id) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key (aid) REFERENCES application (aid) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key (fid) REFERENCES feedback (fid) ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE endorses (
id INT,
fid INT,
primary key (id, fid),
foreign key (id) REFERENCES auth_user(id) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key (fid) REFERENCES feedback (fid) ON UPDATE CASCADE ON DELETE CASCADE );

CREATE TABLE receives(
eid INT,
fid INT,
primary key (eid, fid),
foreign key (eid) REFERENCES endorsement (eid) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key (fid) REFERENCES feedback (fid) ON UPDATE CASCADE ON DELETE CASCADE);

