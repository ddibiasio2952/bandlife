using BandLife.Authorization;
using BandLife.Data;
using BandLife.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<BandLifeDbContext>(options =>
options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnectionString")));

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BandLife",
        Version = "v1"
    });
});

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<ApplicationUser>(options =>
{
    options.User.RequireUniqueEmail = true;

    options.Password.RequiredLength = 8;
    options.Password.RequireDigit = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;

    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan
    = TimeSpan.FromMinutes(5);
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<BandLifeDbContext>();

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Swagger
    app.UseSwagger(); // Serves the Swagger JSON file
    app.UseSwaggerUI(); // Serves the interactive Swagger UI

    // Assign admin role to the first registered user
    //await DevelopmentUserSeeder.AssignAdminRoleAsync(app.Services, "mail@mail.com");

}

await RoleSeeder.SeedRolesAsync(app.Services);
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapIdentityApi<ApplicationUser>();

app.Run();
