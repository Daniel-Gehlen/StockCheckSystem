using System.ComponentModel.DataAnnotations;

namespace StockCheckSystem.API.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string? Name { get; set; } // Tornar nullable
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }
    }
}
