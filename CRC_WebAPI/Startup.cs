using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using CRC_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace CRC_WebAPI
{
  public class CorsMiddleware
  {



    private readonly RequestDelegate _next;

    public CorsMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public Task Invoke(HttpContext httpContext)
    {
      httpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
      httpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
      httpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name");
      httpContext.Response.Headers.Add("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE,OPTIONS");
      httpContext.Response.StatusCode = 200;
      return _next(httpContext);
    }
  }

  public class Startup
  {

     

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      
      /*
      services.AddIdentity<User, IdentityRole>(options =>
      {
        options.User.RequireUniqueEmail = true;

      }).AddEntityFrameworkStores<AppDBContext>();*/
      services.AddControllers();
       // Register the Swagger generator, defining 1 or more Swagger documents
      services.AddSwaggerGen();

     services.AddCors(options => options.AddDefaultPolicy(builder =>
          {
            builder.AllowAnyOrigin();
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
          }));
     services.AddControllers();
     services.AddDbContext<AppDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
      services.Configure<FormOptions>(o => {
        o.ValueLengthLimit = int.MaxValue;
        o.MultipartBodyLengthLimit = int.MaxValue;
        o.MemoryBufferThreshold = int.MaxValue;
      });
    }


    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

      //app.UseMiddleware<CorsMiddleware>();
      app.UseCors(x =>
      {
        x.AllowAnyOrigin();
        x.AllowAnyHeader();
        x.AllowAnyMethod();
      }
);
      // Enable middleware to serve generated Swagger as a JSON endpoint.
      app.UseSwagger();

      // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
      // specifying the Swagger JSON endpoint.
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
      });
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseHttpsRedirection();

      app.UseStaticFiles();
      app.UseStaticFiles(new StaticFileOptions()
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"StaticFiles")),
        RequestPath = new PathString("/StaticFiles")
      });

      app.UseRouting();
      //app.UseAuthentication();
      app.UseAuthorization();
      app.UseRouting();
      app.UseCors();
      app.UseEndpoints(endpoints =>
      {
          endpoints.MapControllers();
      });
      app.UseAuthorization();

    }
  }
}
