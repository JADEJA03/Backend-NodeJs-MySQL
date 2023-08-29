use family;

CREATE TABLE familytree(
id int(11) NOT NULL AUTO_INCREMENT,
person1 varchar(45),
person2 varchar(45),
person1_isof_person2 varchar(45),
PRIMARY KEY(id)
    )ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT 
    CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO familytree(id,person1,person2,person1_isof_person2)
VALUES(1,'Ram','Sita','Husband'),
(2,'Ram','Luv','Father'),
(3,'Ram','Kush','Father'),
(4,'Ram','Laxman','Brother');

Select * from tree;
