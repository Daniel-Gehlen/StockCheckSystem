using StockCheckSystem.API.Data; // Importar AppDbContext
using Microsoft.EntityFrameworkCore; // Importar as extensões de banco de dados

var builder = WebApplication.CreateBuilder(args);

// Adicionar serviços ao contêiner
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("StockCheckDB")); // Configura o banco de dados em memória

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Aceitar requisições do seu frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build(); // Move o Build para cá

app.UseCors("AllowAllOrigins"); // Usar a política CORS

// Configure o pipeline de requisições HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Servir arquivos estáticos da pasta wwwroot
app.UseDefaultFiles(); // Usar o index.html como página inicial
app.UseStaticFiles();  // Servir arquivos estáticos

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Defina o ponto de entrada padrão
app.MapGet("/", () => Results.Redirect("/index.html"));

app.Run();
