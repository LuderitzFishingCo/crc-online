import { Time } from '@angular/common';
export interface Gender {
    Gender_Id: number;
    Gender_Name: string;
}

export interface Church {
    Church_ID: number;
    Congregation_Name: string;
}

export interface Announcement{
    AnnouncnementID: number;
    CourseInstanceID: number;
    Announcment_Text: string;
    AnnouncementDate: Date;
}

export interface BackUp{
    BackupID: number;
    BackupDate: Date;
    BackupSystemList: string;
}

export interface Chat{
    Chat_ID: number;
    Chat_Start: Date;
}

export interface Course{
    Course_ID: number;
    Course_Type_ID: number;
    Course_Name: string;
    Course_Description: string;
    Course_Picture: string;
    Course_Code: string;
}

export interface CourseInstance{
    Course_Instance_ID: number;
    Course_ID: number;
    Course_Instance_Start_Date: Date;
    Course_Instance_End_Date: Date;
}

export interface CourseInstanceLearner{
    Course_Instance_ID: number;
    Learner_ID: number;
    Payment_Type_ID: string;
    Payment_Amount: number;
}
export interface CourseInstanceTeacher{
    Course_Instance_ID: number;
    Teacher_ID: number;
}

export interface CoursePrice{
    Course_Price_ID: number;
    Course_ID: number;
    Course_Price: number;
    Course_Price_Date: number;
}

export interface CourseRating{
    Course_Rating_ID: number;
    Course_ID: number;
    Learner_ID: number;
    Course_Rating: number;
    Course_Review: string;
}

export interface CourseType{
    Course_Type_ID: number;
    Course_Type_Description: string;
}

export interface Date{
    DateID: number;
    Date: Date;
}
export interface DateTimeSlot{
    DateID: number;
    TimeSlotID: number;
    LessonInstanceID: number;
}

export interface Department{
    Department_ID: number;
    Department_Name: string;
}

export interface Learner{
    User_ID: number;
    Learner_ID: number;
}

export interface Lesson{
    Lesson_ID: number;
    Lesson_Name: string;
    Lesson_Description: string;
    Lesson_Number: number;
}

export interface LessonInstance{
    LessonInstanceID: number;
    LessonID: number;
    CourseInstanceID: number;
    LearnerID: number;
    LessonInstanceDate: Date;
}
export interface LessonInstanceQuiz{
    LessonInstanceID: number;
    QuizID: number;
    Result: number;
}

export interface LessonInstanceTeacher{
    LessonInstanceID: number;
    TeacherID: number;
}

export interface LessonRating{
    LessonRatingID: number;
    LessonID: number;
    LearnerID: number;
    LessonRating: number;
    LessonReview: string;
}

export interface Locations{
    Location_ID: number;
    Country: string;
    City: string;
}


export interface Message{
    MessageID: number;
    ChatID: number;
    TeacherID: number;
    LearnerID: number;
    SentDate: Date;
    SentTime: Time;
    Message: string;
}

export interface PasswordHistory{
    PasswordID: number;
    CurrentPassword: string;
    PreviousPassword: string;
}


export interface PaymentType{
    PaymentTypeID: number;
    PaymentType: string;
}

export interface Question{
    QuestionID: number;
    QuestionBankID: number;
    Question: string;
    Answer: string;
}

export interface QuestionBank{
    QuestionBankID: number;
    QuestionBankCategoryID: number;
    CourseInstanceID: number;
    QuestionBankName: string;
}

export interface QuestionBankCategory{
    QuestionBankCategoryID: number;
    QuestionBankCategory: string;
}

export interface Quiz{
    QuizID: number;
    LessonID: number;
    DueDate: Date;
    Weight: number;
}

export interface QuizQuestion{
    QuestionID: number;
    QuizID: number;
}


export interface Report{
    ReportID: number;
    ReportName: number;
    ReportDate: Date;
}

export interface Resource{
    ResourceID: number;
    ResourceTypeID: number;
    LessonID: number;
    ResourceName: string;
}
export interface ResourceType{
    ResourceTypeID: number;
    ResourceTypeName: string;
}
export interface ResourceVideo{
    ResourceID: number;
    ResourceVideoID: number;
    VideoDuration: number;
    VideoFormat: string;
}
export interface Sermon{
    SermonID: number;
    SermonTopicID: number;
    UserID: number;
    SermonDate: Date;
    SermonLink: string;
}

export interface Sermon{
    SermonTopicID: number;
    SermonTopic: string;
}
export interface Teacher{
    TeacherID: number;
    TeachingLevelID: number;
    Title: string;
}
export interface TeacherApplication{
    TeacherApplicationID: number;
    TeacherApplicationStatusID: number;
    UserID: number;
    ApplicationDate: Date;
    ApplicationResult: string;
}
export interface TeacherApplicationStatus{
    TeacherApplicationStatusID: number;
    ApplicationResult: string;
}
export interface TimeSlot{
    TimeSlotID: any;
    StartTime: any;
    EndTime: any;
}

export interface User{
    User_id: number;
    User_Role_ID: number;
    Department_ID:number;
    Password_ID:number;
    Location_ID: number;
    Gender_ID: number;
    First_Name: string;
    Last_Name: string;
    Date_of_Birth: Date;
    Phone_Number: string;
    Username: string;
    Email_Address: string;
    Password: string;
}
export interface UserLogin{
    Email_Address: string;
    Password: string;
}
export interface User_Role{
    User_Role_ID: number;
    User_Role_Name: string;
    Role_Description: string;
    Assigned: Date;
}