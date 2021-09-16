CREATE DATABASE CRC_DB
GO

USE CRC_DB
GO

CREATE TABLE Report(
	Report_ID int primary key identity (1,1) not null,
	[Report_Name] varchar(100),
	Report_Date datetime
)
CREATE TABLE Time_Slot(
	Time_Slot_ID int primary key identity (1,1) not null,
	Start_Time time,
	End_Time time
)
CREATE TABLE [Date](
	Date_ID int primary key identity (1,1) not null,
	[Event_Date] date
)
CREATE TABLE Date_Time_Slot(
	Date_ID int foreign key references [Date](Date_ID),
	Time_Slot_ID int foreign key references Time_Slot(Time_Slot_ID),
	Lesson_Instance_ID int foreign key references Lesson_Instance(Lesson_Instance_ID) 
)
CREATE TABLE Sermon_Topic(
	Sermon_Topic_ID int primary key identity (1,1) not null,
	Sermon_Topic_Name varchar(100)
)
CREATE TABLE User_Role(
	User_Role_ID int primary key identity (1,1) not null,
	Role_Description varchar(200),
	User_Role_Name varchar(50)
)
CREATE TABLE Password_History(
	Password_ID int primary key identity (1,1) not null,
	Current_Password varchar(200),
	Previous_Password varchar(200)
)
CREATE TABLE Location(
	Location_ID int primary key identity (1,1) not null,
	Country varchar(200),
	City varchar(200)
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
CREATE TABLE [User](
	[User_ID] int primary key identity (1,1) not null,
	User_Role_ID int foreign key references User_Role(User_Role_ID),
	Department_ID int foreign key references Department(Department_ID),
	Password_ID int foreign key references [Password_History](Password_ID),
	Location_ID int foreign key references Location(Location_ID),
	Gender_ID int foreign key references Gender(Gender_ID),
	Church_ID int foreign key references CRC_Church(Church_ID),
	First_Name varchar(60),
	Last_Name varchar(60),
	Date_of_Birth Date,
	Phone_Number varchar(20),
	Username varchar(60),
	Email_Address varchar(50),
	[Password] varchar(100)

)
CREATE TABLE Teacher_Application_Status(
	Teacher_Application_Status_ID int primary key identity (1,1) not null,
	Status_Description varchar(50)
)
CREATE TABLE Teacher_Application(
	Teacher_Application_ID int primary key identity (1,1) not null,
	Teacher_Application_Status_ID int foreign key references Teacher_Application_Status(Teacher_Application_Status_ID),
	[User_ID] int foreign key references [User]([User_ID]),
	Application_Date date,
	Application_Result varchar(50)
)
CREATE TABLE Course_Type(
	Course_Type_ID int primary key identity (1,1) not null,
	Course_Type_Descripton varchar(50)
)
CREATE TABLE Course(
	Course_ID int primary key identity (1,1) not null,
	Course_Type_ID int foreign key references Course_Type(Course_Type_ID),
	Course_Name varchar(50),
	Course_Description varchar(200),
	Course_Code varchar(10),
	Course_Picture varchar(100)
)
CREATE TABLE Course_Price(
	Course_Price_ID int primary key identity (1,1) not null,
	Course_ID int foreign key references Course(Course_ID),
	Price float,
	Course_Price_Date date
)
CREATE TABLE Course_Instance(
	Course_Instance_ID int primary key identity (1,1) not null,
	Course_ID int foreign key references Course(Course_ID),
	Course_Instance_Start_Date date,
	Course_Instance_End_Date date
)
CREATE TABLE Teaching_Level(
	Teaching_Level_ID int primary key identity (1,1) not null,
	Teaching_Level_Description varchar(100)
)
CREATE TABLE Teacher(
	Teacher_ID int primary key identity (1,1) not null,
	Teaching_Level_ID int foreign key references Teaching_Level(Teaching_Level_ID),
	Title varchar(20)
)
CREATE TABLE Course_Instance_Teacher(
	Teacher_ID int foreign key references Teacher(Teacher_ID),
	Course_Instance_ID int foreign key references Course_Instance(Course_Instance_ID)
)
CREATE TABLE Announcement(
	Announcement_ID int primary key identity (1,1) not null,
	Course_Instance_ID int foreign key references Course_Instance(Course_Instance_ID),
	Announcement_Text varchar(500),
	Announecement_Date_Time datetime
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
	Payment_Type_ID int foreign key references Payment_Type(Payment_Type_ID),
	Payment_Amount float
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
	Lesson_Description varchar(200),
	Lesson_Number int
)
CREATE TABLE Lesson_Instance(
	Lesson_Instance_ID int primary key identity (1,1) not null,
	Lesson_ID int foreign key references Lesson(Lesson_ID),
	Course_Instance_ID int foreign key references Course_Instance(Course_Instance_ID),
	Learner_ID int foreign key references Learner(Learner_ID),
	Lesson_Instance_Date date
)
CREATE TABLE Quiz(
	Quiz_ID int primary key identity (1,1) not null,
	Lesson_ID int foreign key references Lesson(Lesson_ID),
	Due_Date date,
	[Weight] int
)
CREATE TABLE Lesson_Instance_Quiz(
	Lesson_Instance_ID int foreign key references Lesson_Instance(Lesson_Instance_ID),
	Quiz_ID int foreign key references Quiz(Quiz_ID),
	Result int
)
CREATE TABLE Question_Bank_Category(
	Question_Bank_Category_ID int primary key identity (1,1) not null,
	Question_Bank_Category_Name varchar(200)
)
CREATE TABLE Question_Bank(
	Question_Bank_ID int primary key identity (1,1) not null,
	Question_Bank_Category_ID int foreign key references Question_Bank_Category(Question_Bank_Category_ID),
	Due_Date date,
	[Weight] int
)
CREATE TABLE Question(
	Question_ID int primary key identity (1,1) not null,
	Question_Bank_ID int foreign key references Question_Bank(Question_Bank_ID),
	Question_Bank_Name varchar(100)
)
CREATE TABLE Quiz_Question(
	Quiz_ID int foreign key references Quiz(Quiz_ID),
	Question_ID int foreign key references Question(Question_ID)
)
CREATE TABLE Resource_Type(
	Resource_Type_ID int primary key identity (1,1) not null,
	Resource_Type_Description varchar(50)
)
CREATE TABLE [Resource](
	Resource_ID int primary key identity (1,1) not null,
	Resource_Type_ID int foreign key references Resource_Type(Resource_Type_ID),
	Lesson_ID int foreign key references Lesson(Lesson_ID),
	Resource_Name varchar(200)
)
CREATE TABLE Resource_Video(
	Resource_Video_ID int primary key identity (1,1) not null,
	Resource_ID int foreign key references [Resource](Resource_ID),
	Video_Duration int,
	Video_Format varchar(200)
)
CREATE TABLE Chat(
	Chat_ID int primary key identity (1,1) not null
)
CREATE TABLE [Message](
	Message_ID int primary key identity (1,1) not null,
	Chat_ID int foreign key references Chat(Chat_ID),
	Learner_ID int foreign key references Learner(Learner_ID),
	Teacher_ID int foreign key references Teacher(Teacher_ID),
	[Message_Text] varchar(500),
	Sent_Time time,
	Sent_Date date
)

INSERT INTO Gender VALUES ('Male')
INSERT INTO Gender VALUES ('Female')
INSERT INTO Resource_Type VALUES ('Document')
INSERT INTO Resource_Type VALUES ('Video')
INSERT INTO Resource_Type VALUES ('Live Lecture')
INSERT INTO Course_Type VALUES ('Static')
INSERT INTO Course_Type VALUES ('Dynamic')