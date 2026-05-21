using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClubLibrary
{
	public class Format
	{
		public int Id { get; set; }
		public string Name { get; set; }   // "Ebook"
		public string Code { get; set; }   // "ebook"

		public List<Product> Products { get; set; } = new();
	}
}
