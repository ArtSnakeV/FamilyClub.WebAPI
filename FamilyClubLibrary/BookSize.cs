using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClubLibrary
{
	public class BookSize
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Code { get; set; }
		public List<Product> Products { get; set; } = new();
	}
}
