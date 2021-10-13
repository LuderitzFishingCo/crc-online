using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CRC_WebAPI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace CRC_WebAPI.Models
{
  public class AppDBContext : DbContext
  //public class AppDBContext : IdentityDbContext<User>
  {


    public AppDBContext(DbContextOptions<AppDBContext> options): base(options)
    {

    }

    public AppDBContext()
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      IConfigurationRoot configuration = new ConfigurationBuilder()
          .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
          .AddJsonFile("appsettings.json")
          .Build();
      optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
    }
    public virtual DbSet<Gender> Gender { get; set; }
    public virtual DbSet<CRC_Church> CRC_Church { get; set; }
    public virtual DbSet<Payment_Type> Payment_Type { get; set; }
    public virtual DbSet<User_Role> User_Role { get; set; }
    public virtual DbSet<Department> Department { get; set; }
    public virtual DbSet<Course_Type> Course_Type { get; set; }
    public virtual DbSet<Sermon_Topic> Sermon_Topic { get; set; }
    public virtual DbSet<Resource_Type> Resource_Type { get; set; }
    public virtual DbSet<Announcement> Announcement { get; set; }
    public virtual DbSet<Chat> Chat { get; set; }
    public virtual DbSet<Course> Course { get; set; }
    public virtual DbSet<Course_Instance> Course_Instance { get; set; }
    public virtual DbSet<Course_Instance_Learner> Course_Instance_Learner { get; set; }
    public virtual DbSet<Course_Instance_Teacher> Course_Instance_Teacher { get; set; }
    public virtual DbSet<Course_Price> Course_Price { get; set; }
    public virtual DbSet<Course_Rating> Course_Rating { get; set; }
    public virtual DbSet<Date> Date { get; set; }
    public virtual DbSet<Date_Time_Slot> Date_Time_Slot { get; set; }
    public virtual DbSet<Learner> Learner { get; set; }
    public virtual DbSet<Learner_Quiz> Learner_Quiz { get; set; }
    public virtual DbSet<Learner_Quiz_Question> Learner_Quiz_Question { get; set; }
    public virtual DbSet<Lesson> Lesson { get; set; }
    public virtual DbSet<Lesson_Instance> Lesson_Instance { get; set; }
    public virtual DbSet<Lesson_Instance_Learner> Lesson_Instance_Learner { get; set; }
    public virtual DbSet<Lesson_Instance_Quiz> Lesson_Instance_Quiz { get; set; }
    public virtual DbSet<Lesson_Rating> Lesson_Rating { get; set; }
    public virtual DbSet<Lesson_Slot> Lesson_Slot { get; set; }
    public virtual DbSet<Location> Location { get; set; }
    public virtual DbSet<Message> Message { get; set; }
    public virtual DbSet<Password_History> Password_History { get; set; }
    public virtual DbSet<Question> Question { get; set; }
    public virtual DbSet<Question_Bank> Question_Bank { get; set; }
    public virtual DbSet<Question_Bank_Category> Question_Bank_Category { get; set; }
    public virtual DbSet<Quiz> Quiz { get; set; }
    public virtual DbSet<Quiz_Question> Quiz_Question { get; set; }
    public virtual DbSet<Report> Report { get; set; }
    public virtual DbSet<Resource> Resource { get; set; }
    public virtual DbSet<Resource_Video> Resource_Video { get; set; }
    public virtual DbSet<Teacher> Teacher { get; set; }
    public virtual DbSet<Teacher_Application> Teacher_Application { get; set; }
    public virtual DbSet<Teacher_Application_Status> Teacher_Application_Status { get; set; }
    public virtual DbSet<Teaching_Level> Teaching_Level { get; set; }
    public virtual DbSet<Title> Title { get; set; }
    public virtual DbSet<Time_Slot> Time_Slot { get; set; }
    public virtual DbSet<User> User { get; set; }
    public virtual DbSet<Sermon> Sermon { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.Entity<CRC_Church>(entity =>
      {
        entity.HasKey(e => e.Church_ID);

        entity.HasIndex(e => e.Congregation_Name)
            .HasName("Congregation_Name");

        entity.Property(e => e.Church_ID).HasColumnName("Church_ID");

        entity.Property(e => e.Congregation_Name)
            .IsRequired()
            .HasMaxLength(15);
 });
      modelBuilder.Entity<Gender>(entity =>
      {
        entity.HasKey(e => e.Gender_Id);

        entity.HasIndex(e => e.Gender_Name)
            .HasName("Gender_Name");

        entity.Property(e => e.Gender_Id).HasColumnName("Gender_Id");

        entity.Property(e => e.Gender_Name)
            .IsRequired()
            .HasMaxLength(15);
      });
      modelBuilder.Entity<Payment_Type>(entity =>
      {
        entity.HasKey(e => e.Payment_Type_ID);

        entity.HasIndex(e => e.Payment_Type_ID)
            .HasName("Payment_Type_ID");

        entity.Property(e => e.Payment_Type_ID).HasColumnName("Payment_Type_ID");

        entity.Property(e => e.Payment_Type_Name)
            .IsRequired()
            .HasMaxLength(15);
      });
      modelBuilder.Entity<User_Role>(entity =>
      {
        entity.HasKey(e => e.User_Role_ID);

        entity.HasIndex(e => e.User_Role_ID)
            .HasName("User_Role_ID");

        entity.Property(e => e.User_Role_ID).HasColumnName("User_Role_ID");

        entity.Property(e => e.Role_Description)
            .IsRequired()
            .HasMaxLength(200);

        entity.Property(e => e.User_Role_Name)
              .IsRequired()
              .HasMaxLength(15);

      });
      modelBuilder.Entity<Department>(entity =>
      {
        entity.HasKey(e => e.Department_ID);

        entity.HasIndex(e => e.Department_ID)
            .HasName("Department_ID");

        entity.Property(e => e.Department_ID).HasColumnName("Department_ID");

        entity.Property(e => e.Department_Name)
            .IsRequired()
            .HasMaxLength(15);
      });
      modelBuilder.Entity<Course_Type>(entity =>
      {
        entity.HasKey(e => e.Course_Type_ID);

        entity.HasIndex(e => e.Course_Type_ID)
            .HasName("Course_Type_ID");

        entity.Property(e => e.Course_Type_ID).HasColumnName("Course_Type_ID");

        entity.Property(e => e.Course_Type_Description)
            .IsRequired()
            .HasMaxLength(15);


      });
      modelBuilder.Entity<Sermon_Topic>(entity =>
      {
        entity.HasKey(e => e.Sermon_Topic_ID);

        entity.HasIndex(e => e.Sermon_Topic_ID)
            .HasName("Sermon_Topic_ID");

        entity.Property(e => e.Sermon_Topic_ID).HasColumnName("Sermon_Topic_ID");

        entity.Property(e => e.Sermon_Topic_Name)
            .IsRequired()
            .HasMaxLength(15);
      });
      modelBuilder.Entity<Resource_Type>(entity =>
      {
        entity.HasKey(e => e.Resource_Type_ID);

        entity.HasIndex(e => e.Resource_Type_ID)
            .HasName("Resource_Type_ID");

        entity.Property(e => e.Resource_Type_ID).HasColumnName("Resource_Type_ID");

        entity.Property(e => e.Resource_Type_Description)
            .IsRequired()
            .HasMaxLength(15);
      });
      modelBuilder.Entity<Announcement>(entity =>
      {
        entity.HasKey(e => e.Announcement_ID);

        entity.HasIndex(e => e.Announcement_ID)
            .HasName("Announcement_ID");

        entity.Property(e => e.Announcement_ID).HasColumnName("Announcement_ID");

        entity.Property(e => e.Announcement_Text)
            .IsRequired()
            .HasMaxLength(15);

        entity.Property(e => e.Announcement_Date_Time)
            .IsRequired()
            .HasMaxLength(15);

        entity.HasOne(e => e.Teacher).WithMany(d => d.Announcements).HasForeignKey(e => e.Teacher_ID).HasConstraintName("FK_Announcment_Teacher");
       
      });
      modelBuilder.Entity<Chat>(entity =>
      {
        entity.HasKey(e => e.Chat_ID);

        entity.HasIndex(e => e.Chat_ID)
            .HasName("Chat_ID");

        entity.Property(e => e.Chat_ID).HasColumnName("Chat_ID");
      });
      modelBuilder.Entity<Course>(entity =>
      {
        entity.HasKey(e => new { e.Course_ID}).IsClustered(false);

        entity.HasIndex(e => e.Course_ID).HasName("Course_ID");
        entity.HasIndex(e => e.Course_Type_ID).HasName("Course_Type_ID");

        entity.Property(e => e.Course_ID).HasColumnName("Course_ID");
        entity.Property(e => e.Course_Type_ID).HasColumnName("Course_Type_ID");
        entity.Property(e => e.Course_Description).IsRequired().HasMaxLength(210);
        entity.Property(e => e.Course_Name).IsRequired().HasMaxLength(60);
        entity.Property(e => e.Course_Code).IsRequired().HasMaxLength(20);
        entity.Property(e => e.Course_Picture).IsRequired().HasMaxLength(15);


        entity.HasOne(e => e.Course_Type).WithMany(d => d.Course).HasForeignKey(e => e.Course_Type_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Course_Course_Type");
      });
      modelBuilder.Entity<Course_Instance>(entity =>
      {
        entity.HasKey(e => new { e.Course_Instance_ID }).IsClustered(false);

        entity.HasIndex(e => e.Course_Instance_ID).HasName("Course_Instance_ID");
        entity.HasIndex(e => e.Course_ID).HasName("Course_ID");

        entity.Property(e => e.Course_ID).HasColumnName("Course_ID");
        entity.Property(e => e.Course_Instance_ID).HasColumnName("Course_Instance_ID");
        entity.Property(e => e.Course_Instance_Start_Date).IsRequired().HasMaxLength(20);
        entity.Property(e => e.Course_Instance_End_Date).IsRequired().HasMaxLength(15);

        entity.HasOne(e => e.Course).WithMany(d => d.Course_Instances).HasForeignKey(e => e.Course_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Course_Course_Instance");


      });
      modelBuilder.Entity<Course_Instance_Learner>(entity =>
      {
        entity.HasKey(e => new { e.Course_Instance_ID, e.Learner_ID }).IsClustered(false);

        entity.HasIndex(e => e.Course_Instance_ID).HasName("Course_Instance_ID");
        entity.HasIndex(e => e.Learner_ID).HasName("Learner_ID");

        entity.Property(e => e.Learner_ID).HasColumnName("Learner_ID");
        entity.Property(e => e.Course_Instance_ID).HasColumnName("Course_Instance_ID");
        entity.Property(e => e.Payment_Amount).HasColumnName("Payment_Amount");

       entity.HasOne(e => e.Learner).WithMany(d => d.Course_Instance_Learners).HasForeignKey(e => e.Learner_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Course_Instance_Learner_Learner");
        entity.HasOne(e => e.Course_Instance).WithMany(d => d.Course_Instance_Learners).HasForeignKey(e => e.Course_Instance_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Course_Instance_Learner_Course_Instance");
      });
      modelBuilder.Entity<Course_Instance_Teacher>(entity =>
      {
        entity.HasKey(e => new { e.Course_Instance_ID, e.Teacher_ID }).IsClustered(false);

        entity.HasIndex(e => e.Course_Instance_ID).HasName("Course_Instance_ID");
        entity.HasIndex(e => e.Teacher_ID).HasName("Teacher_ID");

        entity.Property(e => e.Teacher_ID).HasColumnName("Teacher_ID");
        entity.Property(e => e.Course_Instance_ID).HasColumnName("Course_Instance_ID");

        entity.HasOne(e => e.Course_Instance).WithMany(d => d.Course_Instance_Teachers).HasForeignKey(e=>e.Course_Instance_ID).HasConstraintName("Course_Instance_Teacher_Course_Instance");
        entity.HasOne(e => e.Teacher).WithMany(d => d.Course_Instance_Teachers).HasForeignKey(e => e.Teacher_ID).HasConstraintName("Course_Instance_Teacher_Teacher");

      });
      modelBuilder.Entity<Course_Price>(entity =>
      {
        entity.HasKey(e => new { e.Course_Price_ID, e.Course_ID }).IsClustered(false);

        entity.HasIndex(e => e.Course_Price_ID).HasName("Course_Price_ID");
        entity.HasIndex(e => e.Course_ID).HasName("Course_ID");

        entity.Property(e => e.Course_Price_ID).HasColumnName("Course_Price_ID");
        entity.Property(e => e.Course_ID).HasColumnName("Course_ID");
        entity.Property(e => e.Course_Price_Date).HasColumnName("Course_Price_Date");

      });
      modelBuilder.Entity<Course_Rating>(entity =>
      {
        entity.HasKey(e =>  e.Course_Rating_ID );

        entity.HasIndex(e => e.Course_Rating_ID).HasName("Course_Rating_ID");

        entity.Property(e => e.Course_Rating_ID).HasColumnName("Course_Rating_ID");
        entity.Property(e => e.Rating).HasColumnName("Rating");
        entity.Property(e => e.Course_Review).HasColumnName("Course_Review");

      });
      modelBuilder.Entity<Date>(entity =>
      {
        entity.HasKey(e => e.Date_ID);

        entity.HasIndex(e => e.Date_ID).HasName("Date_ID");

        entity.Property(e => e.Date_ID).HasColumnName("Date_ID");
        entity.Property(e => e.Event_Date).HasColumnName("Event_Date");

      });
      modelBuilder.Entity<Date_Time_Slot>(entity =>
      {
        entity.HasKey(e => new { e.Date_ID, e.Time_Slot_ID, e.Lesson_Instance_ID }).IsClustered(false);

        entity.HasIndex(e => e.Date_ID).HasName("Date_ID");
        entity.HasIndex(e => e.Time_Slot_ID).HasName("Time_Slot_ID");
        entity.HasIndex(e => e.Lesson_Instance_ID).HasName("Lesson_Instance_ID");

        entity.Property(e => e.Date_ID).HasColumnName("Date_ID");
        entity.Property(e => e.Time_Slot_ID).HasColumnName("Time_Slot_ID");
        entity.Property(e => e.Lesson_Instance_ID).HasColumnName("Lesson_Instance_ID");

      });
      modelBuilder.Entity<Learner>(entity =>
      {
        entity.HasKey(e => new { e.Learner_ID}).IsClustered(false);

        entity.HasIndex(e => e.Learner_ID).HasName("Learner_ID");
       // entity.HasIndex(e => e.User_ID).HasName("User_ID");

        entity.Property(e => e.Learner_ID).HasColumnName("Learner_ID");
        entity.Property(e => e.User_ID).HasColumnName("User_ID");

        entity.HasOne(d => d.User).WithMany(p => p.Learners).HasForeignKey(d => d.User_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Learner_User");

      });
      modelBuilder.Entity<Learner_Quiz>(entity =>
      {
        entity.HasKey(e => new { e.Learner_ID, e.Quiz_ID }).IsClustered(false);

        entity.HasIndex(e => e.Learner_ID).HasName("Learner_ID");
        entity.HasIndex(e => e.Quiz_ID).HasName("User_ID");

        entity.Property(e => e.Learner_ID).HasColumnName("Learner_ID");
        entity.Property(e => e.Quiz_ID).HasColumnName("Quiz_ID");
        entity.Property(e => e.Result).HasColumnName("Result");


        entity.HasOne(d => d.Learner).WithMany(p => p.Learner_Quizzes).HasForeignKey(d => d.Learner_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Learner_Quiz_Learner");
        entity.HasOne(d => d.Quiz).WithMany(p => p.Learner_Quizzes).HasForeignKey(d => d.Quiz_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Learner_Quiz_Quiz");


      });
      modelBuilder.Entity<Learner_Quiz_Question>(entity =>
      {
        entity.HasKey(e => new { e.Learner_ID, e.Quiz_ID, e.Question_ID }).IsClustered(false);

        entity.HasIndex(e => e.Learner_ID).HasName("Learner_ID");
        entity.HasIndex(e => e.Quiz_ID).HasName("Quiz_ID");
        entity.HasIndex(e => e.Question_ID).HasName("Question_ID");


        entity.Property(e => e.Learner_ID).HasColumnName("Learner_ID");
        entity.Property(e => e.Quiz_ID).HasColumnName("Quiz_ID");
        entity.Property(e => e.Question_ID).HasColumnName("Question_ID");
        entity.HasOne(d => d.Learner).WithMany(p => p.Learner_Quiz_Questions).HasForeignKey(d => d.Learner_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Learner_Quiz_Learner");
        entity.HasOne(d => d.Quiz).WithMany(p => p.Learner_Quiz_Questions).HasForeignKey(d => d.Quiz_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Learner_Quiz_Quiz");
        entity.HasOne(d => d.Question).WithMany(p => p.Learner_Quiz_Questions).HasForeignKey(d => d.Question_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Learner_Quiz_Question");


      });

      modelBuilder.Entity<Lesson>(entity =>
      {
        entity.HasKey(e => new { e.Lesson_ID });

        entity.HasIndex(e => e.Lesson_ID).HasName("Lesson_ID");

        entity.Property(e => e.Lesson_ID).HasColumnName("Lesson_ID");
        entity.Property(e => e.Lesson_Name).IsRequired().HasMaxLength(60);
        entity.Property(e => e.Lesson_Description).IsRequired().HasMaxLength(210);
        entity.Property(e => e.Lesson_Number).IsRequired();

      });
      modelBuilder.Entity<Lesson_Instance>(entity =>
      {
        entity.HasKey(e => new { e.Lesson_Instance_ID });

        entity.HasIndex(e => e.Lesson_Instance_ID).HasName("Lesson_Instance_ID");
        entity.HasIndex(e => e.Lesson_ID).HasName("Lesson_ID");
        entity.HasIndex(e => e.Course_Instance_ID).HasName("Course_Instance_ID");
        
        entity.Property(e => e.Lesson_ID).HasColumnName("Lesson_ID");
        entity.Property(e => e.Lesson_Instance_ID).HasColumnName("Lesson_Instance_ID");
        entity.Property(e => e.Course_Instance_ID).HasColumnName("Course_Instance_ID");
        entity.Property(e => e.Lesson_Slot_ID).IsRequired();

        entity.HasOne(d => d.Lesson).WithMany(p => p.Lesson_Instances).HasForeignKey(d => d.Lesson_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Lesson_Instance_Lesson");
        entity.HasOne(d => d.Course_Instance).WithMany(p => p.Lesson_Instances).HasForeignKey(d => d.Course_Instance_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Lesson_Instance_Course_Instance");
        entity.HasOne(d => d.Lesson_Slot).WithMany(p => p.Lesson_Instances).HasForeignKey(d => d.Lesson_Slot_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Lesson_Instance_Lesson_Slot");

      });
      modelBuilder.Entity<Lesson_Instance_Learner>(entity =>
      {
        entity.HasKey(e => new { e.Learner_ID, e.Lesson_Instance_ID });

        entity.HasIndex(e => e.Learner_ID).HasName("Learner_ID");
        entity.HasIndex(e => e.Lesson_Instance_ID).HasName("Lesson_Instance_ID");

        entity.Property(e => e.Learner_ID).HasColumnName("Learner_ID");
        entity.Property(e => e.Lesson_Instance_ID).HasColumnName("Lesson_Instance_ID");

        entity.HasOne(e => e.Learner).WithMany(d => d.Lesson_Instance_Learners).HasForeignKey(e => e.Learner_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Quiz_Question_Question");
        entity.HasOne(e => e.Lesson_Instance).WithMany(d => d.Lesson_Instance_Learners).HasForeignKey(e => e.Lesson_Instance_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Quiz_Question_Quiz");

      });

      modelBuilder.Entity<Lesson_Instance_Quiz>(entity =>
      {
        entity.HasKey(e => new { e.Quiz_ID, e.Lesson_Instance_ID });

        entity.HasIndex(e => e.Quiz_ID).HasName("Quiz_ID");
        entity.HasIndex(e => e.Lesson_Instance_ID).HasName("Lesson_Instance_ID");

        entity.Property(e => e.Quiz_ID).HasColumnName("Quiz_ID");
        entity.Property(e => e.Lesson_Instance_ID).HasColumnName("Lesson_Instance_ID");

        entity.HasOne(d => d.Lesson_Instance).WithMany(p => p.Lesson_Instance_Quizzes).HasForeignKey(d => d.Lesson_Instance_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Lesson_Instance_Quiz_Lesson_Instance");
        entity.HasOne(d => d.Quiz).WithMany(p => p.Lesson_Instance_Quizzes).HasForeignKey(d => d.Quiz_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Lesson_Instance_Quiz_Quiz");

      });
      modelBuilder.Entity<Lesson_Rating>(entity =>
      {
        entity.HasKey(e => e.Lesson_Rating_ID);

        entity.HasIndex(e => e.Lesson_Rating_ID).HasName("Lesson_Rating_ID");

        entity.Property(e => e.Lesson_Rating_ID).HasColumnName("Lesson_Rating_ID");
        entity.Property(e => e.Rating).IsRequired();
        entity.Property(e => e.Lesson_Review).HasColumnName("Lesson_Review");

      });
      modelBuilder.Entity<Lesson_Slot>(entity =>
      {
        entity.HasKey(e => e.Lesson_Slot_ID);

        entity.HasIndex(e => e.Lesson_Slot_ID).HasName("Lesson_Slot_ID");

        entity.Property(e => e.Lesson_Slot_ID).HasColumnName("Lesson_Slot_ID");
        entity.Property(e => e.Lesson_Start).IsRequired();
        entity.Property(e => e.Lesson_End).IsRequired();

      });
      modelBuilder.Entity<Location>(entity =>
      {
        entity.HasKey(e => e.Location_ID);

        entity.HasIndex(e => e.Location_ID).HasName("Location_ID");

        entity.Property(e => e.Location_ID).HasColumnName("Location_ID");
        entity.Property(e => e.City).IsRequired().HasMaxLength(60);
        entity.Property(e => e.Country).IsRequired().HasMaxLength(60);

      });
      modelBuilder.Entity<Message>(entity =>
      {
        entity.HasKey(e => new { e.Message_ID, e.Learner_ID,e.Chat_ID,e.Teacher_ID }).IsClustered(false);

        entity.HasIndex(e => e.Message_ID).HasName("Message_ID");
        entity.HasIndex(e => e.Learner_ID).HasName("Learner_ID");
        entity.HasIndex(e => e.Chat_ID).HasName("Chat_ID");
        entity.HasIndex(e => e.Teacher_ID).HasName("Teacher_ID");


        entity.Property(e => e.Message_ID).HasColumnName("Message_ID");
        entity.Property(e => e.Learner_ID).HasColumnName("Learner_ID");
        entity.Property(e => e.Chat_ID).HasColumnName("Chat_ID");
        entity.Property(e => e.Teacher_ID).HasColumnName("Teacher_ID");
        entity.Property(e => e.Sent_Date).IsRequired();
        entity.Property(e => e.Sent_Time).IsRequired();
      });
      modelBuilder.Entity<Password_History>(entity =>
      {
        entity.HasKey(e => e.Password_ID);

        entity.HasIndex(e => e.Password_ID).HasName("Password_ID");

        entity.Property(e => e.Password_ID).HasColumnName("Password_ID");
        entity.Property(e => e.Current_Password).IsRequired().HasMaxLength(110);
        entity.Property(e => e.Previous_Password).IsRequired().HasMaxLength(110);

      });
      modelBuilder.Entity<Question>(entity =>
      {
        entity.HasKey(e => new { e.Question_ID });

        entity.HasIndex(e => e.Question_ID).HasName("Question_ID");

        entity.Property(e => e.Question_ID).HasColumnName("Question_ID");
        entity.Property(e => e.Question_Bank_ID).HasColumnName("Question_Bank_ID");
        entity.Property(e => e.Question_Asked).IsRequired().HasMaxLength(110);
        entity.Property(e => e.Answer).IsRequired().HasMaxLength(110);

        entity.HasOne(e => e.Question_Bank).WithMany(d => d.Questions).HasForeignKey(e => e.Question_Bank_ID).OnDelete(DeleteBehavior.Cascade).HasConstraintName("FK_Question_Question_Bank");
      });
      modelBuilder.Entity<Question_Bank>(entity =>
      {
        entity.HasKey(e => new {e.Question_Bank_ID});

        entity.HasIndex(e => e.Question_Bank_ID).HasName("Question_Bank_ID");
        entity.HasIndex(e => e.Question_Bank_Category_ID).HasName("Question_Bank_Category_ID");

        entity.Property(e => e.Question_Bank_ID).HasColumnName("Question_Bank_ID");
        entity.Property(e => e.Question_Bank_Category_ID).HasColumnName("Question_Bank_Category_ID");
        entity.Property(e => e.Question_Bank_Name).IsRequired().HasMaxLength(110);

        entity.HasOne(e => e.Question_Bank_Category).WithMany(d => d.Question_Banks).HasForeignKey(e => e.Question_Bank_Category_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Question_Bank_Question_Bank_Category");
      });
      modelBuilder.Entity<Question_Bank_Category>(entity =>
      {
        entity.HasKey(e => e.Question_Bank_Category_ID);

        entity.HasIndex(e => e.Question_Bank_Category_ID).HasName("Question_Bank_Category_ID");

        entity.Property(e => e.Question_Bank_Category_ID).HasColumnName("Question_Bank_Category_ID");
        entity.Property(e => e.Question_Bank_Category_Name).IsRequired().HasMaxLength(110);

      });
      modelBuilder.Entity<Quiz>(entity =>
      {
        entity.HasKey(e => new { e.Quiz_ID });

        entity.HasIndex(e => e.Quiz_ID).HasName("Quiz_ID");
        entity.HasIndex(e => e.Lesson_ID).HasName("Lesson_ID");

        entity.Property(e => e.Quiz_ID).HasColumnName("Quiz_ID");
        entity.Property(e => e.Lesson_ID).HasColumnName("Lesson_ID");
        entity.Property(e => e.Quiz_Name).IsRequired();
        entity.Property(e => e.Due_Date).IsRequired();
        entity.Property(e => e.Weight).IsRequired();

        entity.HasOne(e => e.Lesson).WithMany(d => d.Quizzes).HasForeignKey(e => e.Lesson_ID).HasConstraintName("FK_Quiz_Lesson");
      });

      modelBuilder.Entity<Quiz_Question>(entity =>
      {
        entity.HasKey(e => new { e.Quiz_ID, e.Question_ID });

        entity.HasIndex(e => e.Quiz_ID).HasName("Quiz_ID");
        entity.HasIndex(e => e.Question_ID).HasName("Question_ID");

        entity.Property(e => e.Quiz_ID).HasColumnName("Quiz_ID");
        entity.Property(e => e.Question_ID).HasColumnName("Question_ID");

        entity.HasOne(e => e.Question).WithMany(d => d.Quiz_Questions).HasForeignKey(e => e.Question_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Quiz_Question_Question");
        entity.HasOne(e => e.Quiz).WithMany(d => d.Quiz_Questions).HasForeignKey(e => e.Quiz_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Quiz_Question_Quiz");

      });
      modelBuilder.Entity<Report>(entity =>
      {
        entity.HasKey(e => e.Report_ID);

        entity.HasIndex(e => e.Report_ID).HasName("Report_ID");

        entity.Property(e => e.Report_ID).HasColumnName("Report_ID");
        entity.Property(e => e.Report_Name).IsRequired().HasMaxLength(110);
        entity.Property(e => e.Report_Date).IsRequired();

      });
      modelBuilder.Entity<Resource>(entity =>
      {
        entity.HasKey(e => new { e.Resource_ID, e.Resource_Type_ID });

        entity.HasIndex(e => e.Resource_ID).HasName("Resource_ID");
        entity.HasIndex(e => e.Resource_Type_ID).HasName("Resource_Type_ID");

        entity.Property(e => e.Resource_ID).HasColumnName("Resource_ID");
        entity.Property(e => e.Resource_Type_ID).HasColumnName("Resource_Type_ID");
        entity.Property(e => e.Resource_Name).IsRequired().HasMaxLength(110);

      });
      modelBuilder.Entity<Resource_Video>(entity =>
      {
        entity.HasKey(e => new { e.Resource_ID, e.Resource_Video_ID });

        entity.HasIndex(e => e.Resource_ID).HasName("Resource_ID");
        entity.HasIndex(e => e.Resource_Video_ID).HasName("Resource_Video_ID");

        entity.Property(e => e.Resource_ID).HasColumnName("Resource_ID");
        entity.Property(e => e.Resource_Video_ID).HasColumnName("Resource_Video_ID");
        entity.Property(e => e.Video_Duration).IsRequired().HasMaxLength(110);
        entity.Property(e => e.Video_Format).IsRequired().HasMaxLength(110);

      });
      modelBuilder.Entity<Teacher>(entity =>
      {
        entity.HasKey(e => new { e.Teacher_ID});

        entity.HasIndex(e => e.Teacher_ID).HasName("Teacher_ID");
        //entity.HasIndex(e => e.Teaching_Level_ID).HasName("Teaching_Level_ID");

        entity.Property(e => e.Teacher_ID).HasColumnName("Teacher_ID");
        entity.Property(e => e.User_ID).HasColumnName("User_ID");
        entity.Property(e => e.Teaching_Level_ID).HasColumnName("Teaching_Level_ID");

        entity.HasOne(d => d.Teaching_Level).WithMany(p => p.Teacher).HasForeignKey(d => d.Teaching_Level_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Teacher_Teaching_Level");
        entity.HasOne(d => d.User).WithMany(p => p.Teachers).HasForeignKey(d => d.User_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Teacher_User");
        });
      modelBuilder.Entity<Teacher_Application>(entity =>
      {
        entity.HasKey(e => new { e.Teacher_Application_ID}).IsClustered(false);
        
        entity.HasIndex(e => e.Teacher_Application_ID).HasName("Teacher_Application_ID");
        /*entity.HasIndex(e => e.Teacher_Application_Status_ID).HasName("Teacher_Application_Status_ID");
        entity.HasIndex(e => e.User_ID).HasName("User_ID");
        */
        entity.Property(e => e.Teacher_Application_Status_ID).HasColumnName("Teacher_Application_Status_ID");
        entity.Property(e => e.Teacher_Application_ID).HasColumnName("Teacher_Application_ID");
        entity.Property(e => e.User_ID).HasColumnName("User_ID");
        entity.Property(e => e.Teaching_Level_ID).HasColumnName("Teaching_Level_ID");
        entity.Property(e => e.Application_Date).IsRequired();
        entity.Property(e => e.Application_Message).IsRequired();
        //entity.Property(e => e.Application_CV).IsRequired();


        entity.HasOne(e => e.Teacher_Application_Status).WithMany(d => d.Teacher_Applications).HasForeignKey(e => e.Teacher_Application_Status_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Teacher_Application_Teacher_Application_Status");
        entity.HasOne(e => e.User).WithMany(d => d.Teacher_Applications).HasForeignKey(e => e.User_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Teacher_Application_User");
        entity.HasOne(e => e.Teaching_Level).WithMany(d => d.Teacher_Applications).HasForeignKey(e => e.Teaching_Level_ID).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Teacher_Application_Teaching_Level");
      });
      modelBuilder.Entity<Teacher_Application_Status>(entity =>
      {
        entity.HasKey(e => e.Teacher_Application_Status_ID);

        entity.HasIndex(e => e.Teacher_Application_Status_ID)
            .HasName("Teacher_Application_Status_ID");

        entity.Property(e => e.Teacher_Application_Status_ID).HasColumnName("Teacher_Application_Status_ID");

        entity.Property(e => e.Status_Description)
            .IsRequired()
            .HasMaxLength(15);
      });
      modelBuilder.Entity<Teaching_Level>(entity =>
      {
        entity.HasKey(e => e.Teaching_Level_ID);

        entity.HasIndex(e => e.Teaching_Level_ID)
            .HasName("Teaching_Level_ID");

        entity.Property(e => e.Teaching_Level_ID).HasColumnName("Teaching_Level_ID");

        entity.Property(e => e.Teaching_Level_Description)
            .IsRequired()
            .HasMaxLength(15);
      });
      modelBuilder.Entity<Time_Slot>(entity =>
      {
        entity.HasKey(e => e.Time_Slot_ID);

        entity.HasIndex(e => e.Time_Slot_ID)
            .HasName("Time_Slot_ID");

        entity.Property(e => e.Time_Slot_ID).HasColumnName("Time_Slot_ID");

        entity.Property(e => e.Start_Time)
            .IsRequired();
        entity.Property(e => e.End_Time)
            .IsRequired();
      });
      modelBuilder.Entity<Title>(entity =>
      {
        entity.HasKey(e => e.Title_ID);

        entity.HasIndex(e => e.Title_ID)
            .HasName("Title_ID");

        entity.Property(e => e.Title_ID).HasColumnName("Title_ID");

        entity.Property(e => e.Title_Name)
            .IsRequired()
            .HasMaxLength(15);
      });
      modelBuilder.Entity<User>(entity =>
      {
        entity.HasKey(e => new {e.User_ID}).HasName("PK_User");
        entity.ToTable("User");

        entity.HasIndex(e => e.Church_ID).HasName("Church_ID");
        entity.HasIndex(e => e.Department_ID).HasName("Department_ID");
        entity.HasIndex(e => e.Location_ID).HasName("Location_ID");
        entity.HasIndex(e => e.User_Role_ID).HasName("User_Role_ID");
        entity.HasIndex(e => e.Gender_ID).HasName("Gender_ID");
        entity.HasIndex(e => e.User_ID).HasName("User_ID");
        entity.HasIndex(e => e.Title_ID).HasName("Title_ID");

        entity.Property(e => e.User_ID).HasColumnName("User_ID");
        entity.Property(e => e.Church_ID).HasColumnName("Church_ID");
        entity.Property(e => e.Department_ID).HasColumnName("Department_ID");
        entity.Property(e => e.Location_ID).HasColumnName("Location_ID");
        entity.Property(e => e.Gender_ID).HasColumnName("Gender_ID");
        entity.Property(e => e.User_Role_ID).HasColumnName("User_Role_ID");
        entity.Property(e => e.Title_ID).HasColumnName("Title_ID");
        entity.Property(e => e.Username).IsRequired();
        entity.Property(e => e.First_Name).IsRequired();
        entity.Property(e => e.Last_Name).IsRequired();
        entity.Property(e => e.Password).IsRequired();
        entity.Property(e => e.Phone_Number).IsRequired();
        entity.Property(e => e.Email_Address).IsRequired();
        entity.Property(e => e.Date_of_Birth).IsRequired();
        entity.Property(e => e.User_Join_Date).IsRequired();

        entity.HasOne(e => e.Church)
        .WithMany(c => c.Users)
        .HasForeignKey(e => e.Church_ID)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_User_CRC_Church");

        entity.HasOne(e => e.Department)
        .WithMany(c => c.User)
        .HasForeignKey(e => e.Department_ID)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_User_Department");

        entity.HasOne(e => e.Gender)
        .WithMany(c => c.User)
        .HasForeignKey(e => e.Gender_ID)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_User_Gender");

        entity.HasOne(e => e.Location)
        .WithMany(c => c.User)
        .HasForeignKey(e => e.Location_ID)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_User_Location");


        entity.HasOne(e => e.User_Role)
        .WithMany(c => c.User)
        .HasForeignKey(e => e.User_Role_ID)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_User_User_Role");


        entity.HasOne(e => e.Title)
        .WithMany(c => c.Users)
        .HasForeignKey(e => e.Title_ID)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_User_Title");
      });
      modelBuilder.Entity<Sermon>(entity =>
      {
        entity.HasKey(e => new { e.Sermon_ID, e.Sermon_Topic_ID });

        entity.HasIndex(e => e.Sermon_ID).HasName("Sermon_ID");
        entity.HasIndex(e => e.Sermon_Topic_ID).HasName("Sermon_Topic_ID");

        entity.Property(e => e.Sermon_ID).HasColumnName("Sermon_ID");
        entity.Property(e => e.Sermon_Topic_ID).HasColumnName("Sermon_Topic_ID");
        entity.Property(e => e.Sermon_Date).IsRequired().HasMaxLength(110);
        entity.Property(e => e.Sermon_Link).IsRequired().HasMaxLength(110);

      });



    }


  }
}
