CREATE DATABASE CRC_Learning
GO

USE CRC_Learning
GO

CREATE TABLE Report(
	Report_ID int primary key identity (1,1) not null,
	[Report_Name] varchar(100),
	Report_Date datetime
)

CREATE TABLE Lesson_Slot(
	Lesson_Slot_ID int primary key identity (1,1) not null,
	Lesson_Start Datetime,
	Lesson_End Datetime
)
CREATE TABLE User_Role(
	User_Role_ID int primary key identity (1,1) not null,
	Role_Description varchar(300),
	User_Role_Name varchar(50)
)
CREATE TABLE Location(
	Location_ID int primary key identity (1,1) not null,
	Country varchar(200),
	City varchar(200)
)
CREATE TABLE Title(
	Title_ID int primary key identity (1,1) not null,
	Title_Name varchar(60)
)
CREATE TABLE CRC_Church(
	Church_ID int primary key identity (1,1) not null,
	Congregation_Name varchar(60)
)
CREATE TABLE Department(
	Department_ID int primary key identity (1,1) not null,
	Department_Name varchar(60)
)
CREATE TABLE Gender(
	Gender_ID int primary key identity (1,1) not null,
	Gender_Name varchar(50)
)

CREATE TABLE Teaching_Level(
	Teaching_Level_ID int primary key identity (1,1) not null,
	Teaching_Level_Description varchar(100)
)
CREATE TABLE [User](
	[User_ID] int primary key identity (1,1) not null,
	User_Role_ID int foreign key references User_Role(User_Role_ID),
	Department_ID int foreign key references Department(Department_ID),
	Location_ID int foreign key references Location(Location_ID),
	Gender_ID int foreign key references Gender(Gender_ID),
	Church_ID int foreign key references CRC_Church(Church_ID),
	Title_ID int foreign key references Title(Title_ID),
	First_Name varchar(60),
	Last_Name varchar(60),
	Date_of_Birth Datetime,
	Phone_Number varchar(20),
	Username varchar(60),
	Email_Address varchar(100),
	[Password] varchar(100),
	User_Join_Date datetime,
	User_Profile_Path varchar(500)
)
CREATE TABLE Teacher_Application_Status(
	Teacher_Application_Status_ID int primary key identity (1,1) not null,
	Status_Description varchar(50)
)
CREATE TABLE Teacher_Application(
	Teacher_Application_ID int primary key identity (1,1) not null,
	Teacher_Application_Status_ID int foreign key references Teacher_Application_Status(Teacher_Application_Status_ID),
	Teaching_Level_ID int foreign key references Teaching_Level(Teaching_Level_ID),
	[User_ID] int foreign key references [User]([User_ID]),
	Application_Date datetime,
	Application_Message varchar(1000),
	Application_CV_Path varchar(500)
)
CREATE TABLE Course_Type(
	Course_Type_ID int primary key identity (1,1) not null,
	Course_Type_Description varchar(50)
)
CREATE TABLE Course(
	Course_ID int primary key identity (1,1) not null,
	Course_Type_ID int foreign key references Course_Type(Course_Type_ID),
	Course_Name varchar(50),
	Course_Description varchar(500),
	Course_Code varchar(10),
	Course_Picture_Path varchar(300)
)

CREATE TABLE Course_Instance(
	Course_Instance_ID int primary key identity (1,1) not null,
	Course_ID int foreign key references Course(Course_ID),
	Course_Instance_Start_Date datetime,
	Course_Instance_End_Date datetime
)
CREATE TABLE Course_Price(
	Course_Price_ID int primary key identity (1,1) not null,
	Course_Instance_ID int foreign key references Course_Instance(Course_Instance_ID),
	Price float,
	Course_Price_Date datetime
)
CREATE TABLE Teacher(
	Teacher_ID int primary key identity (1,1) not null,
	[User_ID] int foreign key references [User]([User_ID]),
	Teaching_Level_ID int foreign key references Teaching_Level(Teaching_Level_ID)
)
CREATE TABLE Course_Instance_Teacher(
	Teacher_ID int foreign key references Teacher(Teacher_ID),
	Course_Instance_ID int foreign key references Course_Instance(Course_Instance_ID)
)
CREATE TABLE Announcement(
	Announcement_ID int primary key identity (1,1) not null,
	Course_Instance_ID int foreign key references Course_Instance(Course_Instance_ID),
	Announcement_Text varchar(800),
	Announecement_Date_Time datetime,
	Teacher_ID int foreign key references Teacher(Teacher_ID)
)
CREATE TABLE Learner(
	Learner_ID int primary key identity (1,1) not null,
	[User_ID] int foreign key references [User]([User_ID])
)
CREATE TABLE Payment_Type(
	Payment_Type_ID int primary key identity (1,1) not null,
	Payment_Type varchar(50)
)
CREATE TABLE Course_Instance_Learner(
	Learner_ID int foreign key references Learner(Learner_ID),
	Course_Instance_ID int foreign key references Course_Instance(Course_Instance_ID),
	Payment_Amount float,
	Payment_Date datetime
)
CREATE TABLE Course_Rating(
	Course_Rating_ID int primary key identity (1,1) not null,
	Rating int,
	Course_Review varchar(500)
)
CREATE TABLE Lesson_Rating(
	Lesson_Rating_ID int primary key identity (1,1) not null,
	Rating int,
	Lesson_Review varchar(500)
)
CREATE TABLE Lesson(
	Lesson_ID int primary key identity (1,1) not null,
	Lesson_Name varchar(50),
	Lesson_Description varchar(500),
	Lesson_Number int
)
CREATE TABLE Lesson_Instance(
	Lesson_Instance_ID int primary key identity (1,1) not null,
	Lesson_ID int foreign key references Lesson(Lesson_ID),
	Course_Instance_ID int foreign key references Course_Instance(Course_Instance_ID),
	Lesson_Slot_ID int foreign key references Lesson_Slot(Lesson_Slot_ID)
)

CREATE TABLE Lesson_Instance_Learner(
	Lesson_Instance_ID int foreign key references Lesson_Instance(Lesson_Instance_ID),
	Learner_ID int foreign key references Learner(Learner_ID),
)
CREATE TABLE Quiz(
	Quiz_ID int primary key identity (1,1) not null,
	Quiz_Name varchar(100),
	Due_Date datetime,
	[Weight] int
)
CREATE TABLE Learner_Quiz (
	Quiz_ID int foreign key references Quiz(Quiz_ID),
	Learner_ID int foreign key references Learner(Learner_ID),
	Result int
)
CREATE TABLE Lesson_Instance_Quiz(
	Lesson_Instance_ID int foreign key references Lesson_Instance(Lesson_Instance_ID),
	Quiz_ID int foreign key references Quiz(Quiz_ID),
)
CREATE TABLE Question_Bank_Category(
	Question_Bank_Category_ID int primary key identity (1,1) not null,
	Question_Bank_Category_Name varchar(200)
)
CREATE TABLE Question_Bank(
	Question_Bank_ID int primary key identity (1,1) not null,
	Question_Bank_Category_ID int foreign key references Question_Bank_Category(Question_Bank_Category_ID),
	Question_Bank_Name varchar(100)
)
CREATE TABLE Question(
	Question_ID int primary key identity (1,1) not null,
	Question_Bank_ID int foreign key references Question_Bank(Question_Bank_ID),
	Question_Asked varchar(300),
	Answer varchar(300)
)
CREATE TABLE Quiz_Question(
	Quiz_ID int foreign key references Quiz(Quiz_ID),
	Question_ID int foreign key references Question(Question_ID)
)

CREATE TABLE Learner_Quiz_Question (
	Quiz_ID int foreign key references Quiz(Quiz_ID),
	Learner_ID int foreign key references Learner(Learner_ID),
	Question_ID int foreign key references Question(Question_ID),
	Learner_Answer varchar(200)
)
CREATE TABLE Resource_Type(
	Resource_Type_ID int primary key identity (1,1) not null,
	Resource_Type_Description varchar(50)
)
CREATE TABLE [Resource](
	Resource_ID int primary key identity (1,1) not null,
	Resource_Type_ID int foreign key references Resource_Type(Resource_Type_ID),
	Lesson_ID int foreign key references Lesson(Lesson_ID),
	Resource_Name varchar(200),
	Resource_Path varchar(500)
)
CREATE TABLE Resource_Video(
	Resource_Video_ID int primary key identity (1,1) not null,
	Resource_ID int foreign	 key references [Resource](Resource_ID),
	Video_Duration int,
	Video_Format varchar(200)
)

INSERT INTO Gender VALUES ('Male')
INSERT INTO Gender VALUES ('Female')
INSERT INTO Resource_Type VALUES ('Document')
INSERT INTO Resource_Type VALUES ('Video')
INSERT INTO Resource_Type VALUES ('Live Lecture')
INSERT INTO Course_Type VALUES ('Static')
INSERT INTO Course_Type VALUES ('Dynamic')
insert into Department values ('Main')
insert into Department values ('Children')
insert into Teacher_Application_Status values ('Accepted')
insert into Teacher_Application_Status values ('Declined')
insert into Teacher_Application_Status values ('Pending')
insert into User_Role values ('A system administraotr','Administrator')
insert into User_Role values ('An unregistered user','User')
insert into User_Role values ('A teacher for a course','Teacher')
insert into User_Role values ('A coordinator for a course','Course Coordinator')
insert into User_Role values ('A learner for a course or multiple courses','Learner')
insert into Location values ('Namibia', 'Windhoek')
insert into Location values ('South Africa', 'Pretoria')
insert into Location values ('South Africa', 'Bloemfontein')
insert into Location values ('South Africa', 'Cape Town')
insert CRC_Church values ('Pretoria')
insert CRC_Church values ('Bloemfontein')
insert CRC_Church values ('Nelspruit')
insert CRC_Church values ('Cape Town')
insert into Title values ('Mr')
insert into Title values ('Miss')
insert into Title values ('Mrs')
insert into Title values ('Dr')
insert into Teaching_Level values ('Children')
insert into Teaching_Level values ('Teenagers')
insert into Teaching_Level values ('Young Adults')
insert into Teaching_Level values ('Adults')
insert into [User] values (1,1,1,1,1,1,'Ndeshi','Kali','1997-5-20','0736948303','LuderitzFishing','u17210021@tuks.co.za','12345678','2021-10-11','\Resources\ProfilePhotos\rossandndeshi.jpg')
insert into [User] values (2,2,1,2,1,2,'Martha','Kali','2006-07-27','0816129221','Potassium','marthakali@gmail.com','12345678','2021-10-11','\Resources\ProfilePhotos\potassium.jpg')
insert into [User] values (3,2,1,2,1,2,'Ross','Campbell','1998-09-23','447832496411','Rosenrankz','rosscampbell@gmail.com','12345678','2021-10-11','\Resources\ProfilePhotos\rossandndeshi.jpg')
insert into Teacher values (3,1)
insert into Course values (1,'Fellowship with God','The first book in the Studies in I John series. The modern-day church desperately needs to grasp the lessons of First John and Dr. Lloyd-Jones discussion of this dynamic book of the Bible is sure to produce spiritual renewal and deeply committed living. An inspiring new series from a highly respected Christian author.','FWG01','https://bible.knowing-jesus.com/topics-images/s/500/Fellowship%20with%20God-Genesis%205-24.jpg')
insert into Course_Instance values (1,'2021-10-01','2022-02-01')
insert into Course_Price values (1,250, '2021-09-16')
insert into Announcement values (1,'First announcment in this course','2021-09-16',1)
insert into Payment_Type values ('EFT')
insert into Payment_Type values ('Cash')
insert into Lesson values ('What is Fellowship with God?','An introductory lesson into our Fellowship with God course',1)
insert into Lesson values ('How to be in Fellowship with God?','A lesson on how to be in fellowship with God',2)
insert into Lesson_Slot values ('20211218 10:30:00 PM','20211218 12:30:00 PM')
insert into Lesson_Slot values ('20210911 08:30:00 PM','20210911 10:30:00 PM')
insert into Lesson_Slot values ('20210520 11:30:00 PM','20210520 13:30:00 PM')
insert into Lesson_Instance values (1,1,1)
insert into Quiz values ('The Dragontamer Questions','2021-09-30',50)
insert into Question_Bank_Category values ('Children Questions')
insert into Question_Bank_Category values ('Teenager Questions')
insert into Question_Bank_Category values ('Young Adult Questions')
insert into Question_Bank_Category values ('Adult Questions')
insert into Question_Bank values (4, 'Fellowship with God Questions')
insert into Question_Bank values (1, 'The Apostles Questions')
insert into Question values (1,'What is God?','Love')