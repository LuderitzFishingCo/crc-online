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
    Announcement_Date: Date;
}

export interface BackUp{
    Backup_ID: number;
    Backup_Date: Date;
    Backup_System_List: string;
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

// export interface Date{
//     Date_ID: number;
//     Event_Date: Date;
// }
export interface DateTimeSlot{
    Date_ID: number;
    Time_Slot_ID: number;
    Lesson_Instance_ID: number;
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
    Lesson_Instance_ID: number;
    Lesson_ID: number;
    Course_Instance_ID: number;
    Lesson_Instance_Date: Date;
}
export interface LessonInstanceQuiz{
    Lesson_Instance_ID: number;

    Quiz_ID: number;
    Result: number;
}

export interface LessonInstanceTeacher{
    Lesson_Instance_ID: number;
    Teacher_ID: number;
}

export interface LessonRating{
    Lesson_Rating_ID: number;
    Lesson_ID: number;
    Learner_ID: number;
    Lesson_Rating: number;
    Lesson_Review: string;
}

export interface Location{
    Location_ID: number;
    Country: string;
    City: string;
}


export interface Message{
    Message_ID: number;
    Chat_ID: number;
    Teacher_ID: number;
    Learner_ID: number;
    Sent_Date: Date;
    Sent_Time: Time;
    Message_Content: string;
}

export interface PasswordHistory{
    Password_ID: number;
    Current_Password: string;
    Previous_Password: string;
}


export interface PaymentType{
    Payment_Type_ID: number;
    Payment_Type: string;
}

export interface Question{
    Question_ID: number;
    Question_Bank_ID: number;
    Question_Asked: string;
    Answer: string;
}

export interface QuestionBank{
    Question_Bank_ID: number;
    Question_Bank_Category_ID: number;
    Question_Bank_Name: string;
}

export interface QuestionBankCategory{
    Question_Bank_Category_ID: number;
    Question_Bank_Category_Name: string;
}

export interface Quiz{
    Quiz_ID: number;
    Lesson_ID: number;
    Quiz_Name: string;
    Due_Date: Date;
    Weight: number;
}

export interface QuizQuestion{
    Question_ID: number;
    Quiz_ID: number;
}


export interface Report{
    Report_ID: number;
    Report_Name: number;
    Report_Date: Date;
}

export interface Resource{
    Resource_ID: number;
    Resource_Type_ID: number;
    Lesson_ID: number;
    Resource_Name: string;
}
export interface ResourceType{
    Resource_Type_ID: number;
    Resource_Type_Name: string;
}
export interface ResourceVideo{
    Resource_ID: number;
    Resource_Video_ID: number;
    Video_Duration: number;
    Video_Format: string;
}
export interface Sermon{
    Sermon_ID: number;
    Sermon_Topic_ID: number;
    User_ID: number;
    Sermon_Date: Date;
    Sermon_Link: string;
}

export interface Sermon{
    Sermon_Topic_ID: number;
    Sermon_Topic: string;
}
export interface Teacher{
    Teacher_ID: number;
    Teaching_Level_ID: number;
}
export interface TeacherInformation{
    User_id: number;
    Department:string;
    Location: string;
    Gender: string;
    First_Name: string;
    Last_Name: string;
    Date_of_Birth: Date;
    Phone_Number: string;
    Username: string;
    TeachingLevel: string;
    Email_Address: string;
    Password: string;
}

export interface Teaching_Level{
    Teaching_Level_ID: number;
    Teaching_Level_Description: string;
}
export interface TeacherApplication{
    Teacher_Application_ID: number;
    Teacher_Application_Status_ID: number;
    User_ID: number;
    Application_Date: Date;
    Application_Message: string;
}
export interface TeacherApplicationStatus{
    Teacher_Application_Status_ID: number;
    Application_Result: string;
}
export interface TimeSlot{
    Time_Slot_ID: any;
    Start_Time: any;
    End_Time: any;
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
export interface LessonSlot{
    Lesson_Slot_ID: number;
    Lesson_Start: Date;
    Lesson_End: Date;
}