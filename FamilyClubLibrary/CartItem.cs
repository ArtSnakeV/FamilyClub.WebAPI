using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClubLibrary
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; } = default!;
        public int ProductId { get; set; }
        public Product Product { get; set; } = default!;
        public int Quantity { get; set; }
        public string? Format { get; set; }
    }
}
