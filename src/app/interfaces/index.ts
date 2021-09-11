import { Time } from '@angular/common';
export interface Genders {
    Gender_ID: number;
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
    ChatID: number;
    ChatStart: Date;
}

export interface Course{
    CourseID: number;
    CourseTypeID: number;
    CourseName: string;
    CourseDescription: string;
    CourseCode: string;
}

export interface CourseInstance{
    CourseInstanceID: number;
    CourseID: number;
    CourseInstanceStartDate: Date;
    CourseInstanceEndDate: Date;
}

export interface CourseInstanceLearner{
    CourseInstanceID: number;
    LearnerID: number;
    PaymentTypeID: string;
    PaymentAmount: number;
}
export interface CourseInstanceTeacher{
    CourseInstanceID: number;
    TeacherID: number;
}

export interface CoursePrice{
    CoursePriceID: number;
    CourseID: number;
    CoursePrice: number;
    CoursePriceDate: number;
}

export interface CourseRating{
    CourseRatingID: number;
    CourseID: number;
    LearnerID: number;
    CourseRating: number;
    CourseReview: string;
}

export interface CourseType{
    CourseTypeID: number;
    CourseTypeDescription: string;
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
    UserID: number;
    LearnerID: number;
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
export interface UserRole{
    UserRoleID: number;
    RoleDescription: string;
    Assigned: Date;
}