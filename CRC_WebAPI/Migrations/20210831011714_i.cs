using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CRC_WebAPI.Migrations
{
    public partial class i : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Genders",
                table: "Genders");

            migrationBuilder.DropColumn(
                name: "GenderId",
                table: "Genders");

            migrationBuilder.RenameTable(
                name: "Genders",
                newName: "Gender");

            migrationBuilder.AlterColumn<string>(
                name: "Gender_Name",
                table: "Gender",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Gender_Id",
                table: "Gender",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Gender",
                table: "Gender",
                column: "Gender_Id");

            migrationBuilder.CreateTable(
                name: "Announcement",
                columns: table => new
                {
                    Announcement_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Course_Instance_ID = table.Column<int>(nullable: false),
                    Announcement_Text = table.Column<string>(maxLength: 15, nullable: false),
                    Announcement_Date_Time = table.Column<DateTime>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcement", x => x.Announcement_ID);
                });

            migrationBuilder.CreateTable(
                name: "Chat",
                columns: table => new
                {
                    Chat_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chat", x => x.Chat_ID);
                });

            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    Course_ID = table.Column<int>(nullable: false),
                    Course_Type_ID = table.Column<int>(nullable: false),
                    Course_Name = table.Column<string>(maxLength: 60, nullable: false),
                    Course_Description = table.Column<string>(maxLength: 210, nullable: false),
                    Course_Code = table.Column<string>(maxLength: 20, nullable: false),
                    Course_Picture = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => new { x.Course_ID, x.Course_Type_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Course_Instance",
                columns: table => new
                {
                    Course_Instance_ID = table.Column<int>(nullable: false),
                    Course_ID = table.Column<int>(nullable: false),
                    Course_Instance_Start_Date = table.Column<DateTime>(maxLength: 20, nullable: false),
                    Courses_Instance_End_Date = table.Column<DateTime>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course_Instance", x => new { x.Course_Instance_ID, x.Course_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Course_Instance_Learner",
                columns: table => new
                {
                    Learner_ID = table.Column<int>(nullable: false),
                    Course_Instance_ID = table.Column<int>(nullable: false),
                    Payment_Type_ID = table.Column<int>(nullable: false),
                    Payment_Amount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course_Instance_Learner", x => new { x.Course_Instance_ID, x.Learner_ID, x.Payment_Type_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Course_Instance_Teacher",
                columns: table => new
                {
                    Teacher_ID = table.Column<int>(nullable: false),
                    Course_Instance_ID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course_Instance_Teacher", x => new { x.Course_Instance_ID, x.Teacher_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Course_Price",
                columns: table => new
                {
                    Course_Price_ID = table.Column<int>(nullable: false),
                    Course_ID = table.Column<int>(nullable: false),
                    Price = table.Column<float>(nullable: false),
                    Course_Price_Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course_Price", x => new { x.Course_Price_ID, x.Course_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Course_Rating",
                columns: table => new
                {
                    Course_Rating_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(nullable: false),
                    Course_Review = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course_Rating", x => x.Course_Rating_ID);
                });

            migrationBuilder.CreateTable(
                name: "Course_Type",
                columns: table => new
                {
                    Course_Type_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Course_Type_Description = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course_Type", x => x.Course_Type_ID);
                });

            migrationBuilder.CreateTable(
                name: "CRC_Church",
                columns: table => new
                {
                    Church_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Congregation_Name = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CRC_Church", x => x.Church_ID);
                });

            migrationBuilder.CreateTable(
                name: "Date",
                columns: table => new
                {
                    Date_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Event_Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Date", x => x.Date_ID);
                });

            migrationBuilder.CreateTable(
                name: "Date_Time_Slot",
                columns: table => new
                {
                    Date_ID = table.Column<int>(nullable: false),
                    Time_Slot_ID = table.Column<int>(nullable: false),
                    Lesson_Instance_ID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Date_Time_Slot", x => new { x.Date_ID, x.Time_Slot_ID, x.Lesson_Instance_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    Department_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Department_Name = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.Department_ID);
                });

            migrationBuilder.CreateTable(
                name: "Learner",
                columns: table => new
                {
                    Learner_ID = table.Column<int>(nullable: false),
                    User_ID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Learner", x => new { x.Learner_ID, x.User_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Lesson",
                columns: table => new
                {
                    Lesson_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lesson_Name = table.Column<string>(maxLength: 60, nullable: false),
                    Lesson_Description = table.Column<string>(maxLength: 210, nullable: false),
                    Lesson_Number = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lesson", x => x.Lesson_ID);
                });

            migrationBuilder.CreateTable(
                name: "Lesson_Instance",
                columns: table => new
                {
                    Lesson_Instance_ID = table.Column<int>(nullable: false),
                    Lesson_ID = table.Column<int>(nullable: false),
                    Course_Instance_ID = table.Column<int>(nullable: false),
                    Learner_ID = table.Column<int>(nullable: true),
                    Lesson_Instance_Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lesson_Instance", x => new { x.Lesson_ID, x.Lesson_Instance_ID, x.Course_Instance_ID });
                });

            migrationBuilder.CreateTable(
                name: "Lesson_Instance_Quiz",
                columns: table => new
                {
                    Lesson_Instance_ID = table.Column<int>(nullable: false),
                    Quiz_ID = table.Column<int>(nullable: false),
                    Result = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lesson_Instance_Quiz", x => new { x.Quiz_ID, x.Lesson_Instance_ID });
                });

            migrationBuilder.CreateTable(
                name: "Lesson_Rating",
                columns: table => new
                {
                    Lesson_Rating_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(nullable: false),
                    Lesson_Review = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lesson_Rating", x => x.Lesson_Rating_ID);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    Location_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Country = table.Column<string>(maxLength: 60, nullable: false),
                    City = table.Column<string>(maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Location_ID);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Message_ID = table.Column<int>(nullable: false),
                    Chat_ID = table.Column<int>(nullable: false),
                    Learner_ID = table.Column<int>(nullable: false),
                    Teacher_ID = table.Column<int>(nullable: false),
                    Message_Text = table.Column<string>(nullable: true),
                    Sent_Time = table.Column<DateTime>(nullable: false),
                    Sent_Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => new { x.Message_ID, x.Learner_ID, x.Chat_ID, x.Teacher_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Password_History",
                columns: table => new
                {
                    Password_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Current_Password = table.Column<string>(maxLength: 110, nullable: false),
                    Previous_Password = table.Column<string>(maxLength: 110, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Password_History", x => x.Password_ID);
                });

            migrationBuilder.CreateTable(
                name: "Payment_Type",
                columns: table => new
                {
                    Payment_Type_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Payment_Type_Name = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment_Type", x => x.Payment_Type_ID);
                });

            migrationBuilder.CreateTable(
                name: "Question_Bank",
                columns: table => new
                {
                    Question_Bank_ID = table.Column<int>(nullable: false),
                    Question_Bank_Category_ID = table.Column<int>(nullable: false),
                    Due_Date = table.Column<DateTime>(maxLength: 110, nullable: false),
                    Weight = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question_Bank", x => new { x.Question_Bank_ID, x.Question_Bank_Category_ID });
                });

            migrationBuilder.CreateTable(
                name: "Question_Bank_Category",
                columns: table => new
                {
                    Question_Bank_Category_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question_Bank_Category_Name = table.Column<string>(maxLength: 110, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question_Bank_Category", x => x.Question_Bank_Category_ID);
                });

            migrationBuilder.CreateTable(
                name: "Quiz",
                columns: table => new
                {
                    Quiz_ID = table.Column<int>(nullable: false),
                    Lesson_ID = table.Column<int>(nullable: false),
                    Due_Date = table.Column<DateTime>(nullable: false),
                    Weight = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quiz", x => new { x.Quiz_ID, x.Lesson_ID });
                });

            migrationBuilder.CreateTable(
                name: "Quiz_Question",
                columns: table => new
                {
                    Quiz_ID = table.Column<int>(nullable: false),
                    Question_ID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quiz_Question", x => new { x.Quiz_ID, x.Question_ID });
                });

            migrationBuilder.CreateTable(
                name: "Report",
                columns: table => new
                {
                    Report_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Report_Name = table.Column<string>(maxLength: 110, nullable: false),
                    Report_Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Report", x => x.Report_ID);
                });

            migrationBuilder.CreateTable(
                name: "Resource",
                columns: table => new
                {
                    Resource_ID = table.Column<int>(nullable: false),
                    Resource_Type_ID = table.Column<int>(nullable: false),
                    Lesson_ID = table.Column<int>(nullable: true),
                    Resource_Name = table.Column<string>(maxLength: 110, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resource", x => new { x.Resource_ID, x.Resource_Type_ID });
                });

            migrationBuilder.CreateTable(
                name: "Resource_Type",
                columns: table => new
                {
                    Resource_Type_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Resource_Type_Description = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resource_Type", x => x.Resource_Type_ID);
                });

            migrationBuilder.CreateTable(
                name: "Resource_Video",
                columns: table => new
                {
                    Resource_Video_ID = table.Column<int>(nullable: false),
                    Resource_ID = table.Column<int>(nullable: false),
                    Video_Duration = table.Column<int>(maxLength: 110, nullable: false),
                    Video_Format = table.Column<int>(maxLength: 110, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resource_Video", x => new { x.Resource_ID, x.Resource_Video_ID });
                });

            migrationBuilder.CreateTable(
                name: "Sermon",
                columns: table => new
                {
                    Sermon_ID = table.Column<int>(nullable: false),
                    Sermon_Topic_ID = table.Column<int>(nullable: false),
                    Sermon_Date = table.Column<DateTime>(maxLength: 110, nullable: false),
                    Sermon_Link = table.Column<string>(maxLength: 110, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sermon", x => new { x.Sermon_ID, x.Sermon_Topic_ID });
                });

            migrationBuilder.CreateTable(
                name: "Sermon_Topic",
                columns: table => new
                {
                    Sermon_Topic_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sermon_Topic_Name = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sermon_Topic", x => x.Sermon_Topic_ID);
                });

            migrationBuilder.CreateTable(
                name: "Teacher",
                columns: table => new
                {
                    Teacher_ID = table.Column<int>(nullable: false),
                    Teaching_Level_ID = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teacher", x => new { x.Teacher_ID, x.Teaching_Level_ID });
                });

            migrationBuilder.CreateTable(
                name: "Teacher_Application",
                columns: table => new
                {
                    Teacher_Application_ID = table.Column<int>(nullable: false),
                    Teacher_Application_Status_ID = table.Column<int>(nullable: false),
                    User_ID = table.Column<int>(nullable: false),
                    Application_Date = table.Column<DateTime>(nullable: false),
                    Application_Result = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teacher_Application", x => new { x.Teacher_Application_ID, x.Teacher_Application_Status_ID, x.User_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "Teacher_Application_Status",
                columns: table => new
                {
                    Teacher_Application_Status_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status_Description = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teacher_Application_Status", x => x.Teacher_Application_Status_ID);
                });

            migrationBuilder.CreateTable(
                name: "Teaching_Level",
                columns: table => new
                {
                    Teaching_Level_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Teaching_Level_Description = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teaching_Level", x => x.Teaching_Level_ID);
                });

            migrationBuilder.CreateTable(
                name: "Time_Slot",
                columns: table => new
                {
                    Time_Slot_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Start_Time = table.Column<DateTime>(nullable: false),
                    End_Time = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Time_Slot", x => x.Time_Slot_ID);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    User_ID = table.Column<int>(nullable: false),
                    User_Role_ID = table.Column<int>(nullable: false),
                    Department_ID = table.Column<int>(nullable: false),
                    Password_ID = table.Column<int>(nullable: false),
                    Location_ID = table.Column<int>(nullable: false),
                    Gender_ID = table.Column<int>(nullable: false),
                    Church_ID = table.Column<int>(nullable: false),
                    First_Name = table.Column<string>(nullable: false),
                    Last_Name = table.Column<string>(nullable: false),
                    Date_of_Birth = table.Column<DateTime>(nullable: false),
                    Phone_Number = table.Column<string>(nullable: false),
                    Username = table.Column<string>(nullable: false),
                    Email_Address = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => new { x.User_ID, x.Church_ID, x.Gender_ID, x.Department_ID, x.Location_ID, x.User_Role_ID, x.Password_ID })
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "User_Role",
                columns: table => new
                {
                    User_Role_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User_Role_Description = table.Column<string>(maxLength: 200, nullable: false),
                    User_Role_Name = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Role", x => x.User_Role_ID);
                });

            migrationBuilder.CreateIndex(
                name: "Gender_Name",
                table: "Gender",
                column: "Gender_Name");

            migrationBuilder.CreateIndex(
                name: "Announcement_ID",
                table: "Announcement",
                column: "Announcement_ID");

            migrationBuilder.CreateIndex(
                name: "Chat_ID",
                table: "Chat",
                column: "Chat_ID");

            migrationBuilder.CreateIndex(
                name: "Course_ID",
                table: "Course",
                column: "Course_ID");

            migrationBuilder.CreateIndex(
                name: "Course_Type_ID",
                table: "Course",
                column: "Course_Type_ID");

            migrationBuilder.CreateIndex(
                name: "Course_ID",
                table: "Course_Instance",
                column: "Course_ID");

            migrationBuilder.CreateIndex(
                name: "Course_Instance_ID",
                table: "Course_Instance",
                column: "Course_Instance_ID");

            migrationBuilder.CreateIndex(
                name: "Course_Instance_ID",
                table: "Course_Instance_Learner",
                column: "Course_Instance_ID");

            migrationBuilder.CreateIndex(
                name: "Learner_ID",
                table: "Course_Instance_Learner",
                column: "Learner_ID");

            migrationBuilder.CreateIndex(
                name: "Payment_Type_ID",
                table: "Course_Instance_Learner",
                column: "Payment_Type_ID");

            migrationBuilder.CreateIndex(
                name: "Course_Instance_ID",
                table: "Course_Instance_Teacher",
                column: "Course_Instance_ID");

            migrationBuilder.CreateIndex(
                name: "Teacher_ID",
                table: "Course_Instance_Teacher",
                column: "Teacher_ID");

            migrationBuilder.CreateIndex(
                name: "Course_ID",
                table: "Course_Price",
                column: "Course_ID");

            migrationBuilder.CreateIndex(
                name: "Course_Price_ID",
                table: "Course_Price",
                column: "Course_Price_ID");

            migrationBuilder.CreateIndex(
                name: "Course_Rating_ID",
                table: "Course_Rating",
                column: "Course_Rating_ID");

            migrationBuilder.CreateIndex(
                name: "Course_Type_ID",
                table: "Course_Type",
                column: "Course_Type_ID");

            migrationBuilder.CreateIndex(
                name: "Congregation_Name",
                table: "CRC_Church",
                column: "Congregation_Name");

            migrationBuilder.CreateIndex(
                name: "Date_ID",
                table: "Date",
                column: "Date_ID");

            migrationBuilder.CreateIndex(
                name: "Date_ID",
                table: "Date_Time_Slot",
                column: "Date_ID");

            migrationBuilder.CreateIndex(
                name: "Lesson_Instance_ID",
                table: "Date_Time_Slot",
                column: "Lesson_Instance_ID");

            migrationBuilder.CreateIndex(
                name: "Time_Slot_ID",
                table: "Date_Time_Slot",
                column: "Time_Slot_ID");

            migrationBuilder.CreateIndex(
                name: "Department_ID",
                table: "Department",
                column: "Department_ID");

            migrationBuilder.CreateIndex(
                name: "Learner_ID",
                table: "Learner",
                column: "Learner_ID");

            migrationBuilder.CreateIndex(
                name: "User_ID",
                table: "Learner",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "Lesson_ID",
                table: "Lesson",
                column: "Lesson_ID");

            migrationBuilder.CreateIndex(
                name: "Course_Instance_ID",
                table: "Lesson_Instance",
                column: "Course_Instance_ID");

            migrationBuilder.CreateIndex(
                name: "Lesson_ID",
                table: "Lesson_Instance",
                column: "Lesson_ID");

            migrationBuilder.CreateIndex(
                name: "Lesson_Instance_ID",
                table: "Lesson_Instance",
                column: "Lesson_Instance_ID");

            migrationBuilder.CreateIndex(
                name: "Lesson_Instance_ID",
                table: "Lesson_Instance_Quiz",
                column: "Lesson_Instance_ID");

            migrationBuilder.CreateIndex(
                name: "Quiz_ID",
                table: "Lesson_Instance_Quiz",
                column: "Quiz_ID");

            migrationBuilder.CreateIndex(
                name: "Lesson_Rating_ID",
                table: "Lesson_Rating",
                column: "Lesson_Rating_ID");

            migrationBuilder.CreateIndex(
                name: "Location_ID",
                table: "Location",
                column: "Location_ID");

            migrationBuilder.CreateIndex(
                name: "Chat_ID",
                table: "Message",
                column: "Chat_ID");

            migrationBuilder.CreateIndex(
                name: "Learner_ID",
                table: "Message",
                column: "Learner_ID");

            migrationBuilder.CreateIndex(
                name: "Message_ID",
                table: "Message",
                column: "Message_ID");

            migrationBuilder.CreateIndex(
                name: "Teacher_ID",
                table: "Message",
                column: "Teacher_ID");

            migrationBuilder.CreateIndex(
                name: "Password_ID",
                table: "Password_History",
                column: "Password_ID");

            migrationBuilder.CreateIndex(
                name: "Payment_Type_ID",
                table: "Payment_Type",
                column: "Payment_Type_ID");

            migrationBuilder.CreateIndex(
                name: "Question_Bank_Category_ID",
                table: "Question_Bank",
                column: "Question_Bank_Category_ID");

            migrationBuilder.CreateIndex(
                name: "Question_Bank_ID",
                table: "Question_Bank",
                column: "Question_Bank_ID");

            migrationBuilder.CreateIndex(
                name: "Question_Bank_Category_ID",
                table: "Question_Bank_Category",
                column: "Question_Bank_Category_ID");

            migrationBuilder.CreateIndex(
                name: "Lesson_ID",
                table: "Quiz",
                column: "Lesson_ID");

            migrationBuilder.CreateIndex(
                name: "Quiz_ID",
                table: "Quiz",
                column: "Quiz_ID");

            migrationBuilder.CreateIndex(
                name: "Question_ID",
                table: "Quiz_Question",
                column: "Question_ID");

            migrationBuilder.CreateIndex(
                name: "Quiz_ID",
                table: "Quiz_Question",
                column: "Quiz_ID");

            migrationBuilder.CreateIndex(
                name: "Report_ID",
                table: "Report",
                column: "Report_ID");

            migrationBuilder.CreateIndex(
                name: "Resource_ID",
                table: "Resource",
                column: "Resource_ID");

            migrationBuilder.CreateIndex(
                name: "Resource_Type_ID",
                table: "Resource",
                column: "Resource_Type_ID");

            migrationBuilder.CreateIndex(
                name: "Resource_Type_ID",
                table: "Resource_Type",
                column: "Resource_Type_ID");

            migrationBuilder.CreateIndex(
                name: "Resource_ID",
                table: "Resource_Video",
                column: "Resource_ID");

            migrationBuilder.CreateIndex(
                name: "Resource_Video_ID",
                table: "Resource_Video",
                column: "Resource_Video_ID");

            migrationBuilder.CreateIndex(
                name: "Sermon_ID",
                table: "Sermon",
                column: "Sermon_ID");

            migrationBuilder.CreateIndex(
                name: "Sermon_Topic_ID",
                table: "Sermon",
                column: "Sermon_Topic_ID");

            migrationBuilder.CreateIndex(
                name: "Sermon_Topic_ID",
                table: "Sermon_Topic",
                column: "Sermon_Topic_ID");

            migrationBuilder.CreateIndex(
                name: "Teacher_ID",
                table: "Teacher",
                column: "Teacher_ID");

            migrationBuilder.CreateIndex(
                name: "Teaching_Level_ID",
                table: "Teacher",
                column: "Teaching_Level_ID");

            migrationBuilder.CreateIndex(
                name: "Teacher_Application_ID",
                table: "Teacher_Application",
                column: "Teacher_Application_ID");

            migrationBuilder.CreateIndex(
                name: "Teacher_Application_Status_ID",
                table: "Teacher_Application",
                column: "Teacher_Application_Status_ID");

            migrationBuilder.CreateIndex(
                name: "User_ID",
                table: "Teacher_Application",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "Teacher_Application_Status_ID",
                table: "Teacher_Application_Status",
                column: "Teacher_Application_Status_ID");

            migrationBuilder.CreateIndex(
                name: "Teaching_Level_ID",
                table: "Teaching_Level",
                column: "Teaching_Level_ID");

            migrationBuilder.CreateIndex(
                name: "Time_Slot_ID",
                table: "Time_Slot",
                column: "Time_Slot_ID");

            migrationBuilder.CreateIndex(
                name: "Church_ID",
                table: "User",
                column: "Church_ID");

            migrationBuilder.CreateIndex(
                name: "Department_ID",
                table: "User",
                column: "Department_ID");

            migrationBuilder.CreateIndex(
                name: "Gender_ID",
                table: "User",
                column: "Gender_ID");

            migrationBuilder.CreateIndex(
                name: "Location_ID",
                table: "User",
                column: "Location_ID");

            migrationBuilder.CreateIndex(
                name: "Password_ID",
                table: "User",
                column: "Password_ID");

            migrationBuilder.CreateIndex(
                name: "User_ID",
                table: "User",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "User_Role_ID",
                table: "User",
                column: "User_Role_ID");

            migrationBuilder.CreateIndex(
                name: "User_Role_ID",
                table: "User_Role",
                column: "User_Role_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Announcement");

            migrationBuilder.DropTable(
                name: "Chat");

            migrationBuilder.DropTable(
                name: "Course");

            migrationBuilder.DropTable(
                name: "Course_Instance");

            migrationBuilder.DropTable(
                name: "Course_Instance_Learner");

            migrationBuilder.DropTable(
                name: "Course_Instance_Teacher");

            migrationBuilder.DropTable(
                name: "Course_Price");

            migrationBuilder.DropTable(
                name: "Course_Rating");

            migrationBuilder.DropTable(
                name: "Course_Type");

            migrationBuilder.DropTable(
                name: "CRC_Church");

            migrationBuilder.DropTable(
                name: "Date");

            migrationBuilder.DropTable(
                name: "Date_Time_Slot");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "Learner");

            migrationBuilder.DropTable(
                name: "Lesson");

            migrationBuilder.DropTable(
                name: "Lesson_Instance");

            migrationBuilder.DropTable(
                name: "Lesson_Instance_Quiz");

            migrationBuilder.DropTable(
                name: "Lesson_Rating");

            migrationBuilder.DropTable(
                name: "Location");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "Password_History");

            migrationBuilder.DropTable(
                name: "Payment_Type");

            migrationBuilder.DropTable(
                name: "Question_Bank");

            migrationBuilder.DropTable(
                name: "Question_Bank_Category");

            migrationBuilder.DropTable(
                name: "Quiz");

            migrationBuilder.DropTable(
                name: "Quiz_Question");

            migrationBuilder.DropTable(
                name: "Report");

            migrationBuilder.DropTable(
                name: "Resource");

            migrationBuilder.DropTable(
                name: "Resource_Type");

            migrationBuilder.DropTable(
                name: "Resource_Video");

            migrationBuilder.DropTable(
                name: "Sermon");

            migrationBuilder.DropTable(
                name: "Sermon_Topic");

            migrationBuilder.DropTable(
                name: "Teacher");

            migrationBuilder.DropTable(
                name: "Teacher_Application");

            migrationBuilder.DropTable(
                name: "Teacher_Application_Status");

            migrationBuilder.DropTable(
                name: "Teaching_Level");

            migrationBuilder.DropTable(
                name: "Time_Slot");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "User_Role");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Gender",
                table: "Gender");

            migrationBuilder.DropIndex(
                name: "Gender_Name",
                table: "Gender");

            migrationBuilder.DropColumn(
                name: "Gender_Id",
                table: "Gender");

            migrationBuilder.RenameTable(
                name: "Gender",
                newName: "Genders");

            migrationBuilder.AlterColumn<int>(
                name: "Gender_Name",
                table: "Genders",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 15);

            migrationBuilder.AddColumn<int>(
                name: "GenderId",
                table: "Genders",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Genders",
                table: "Genders",
                column: "GenderId");
        }
    }
}
