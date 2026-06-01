using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClubLibrary
{
	public class AgeRestriction
	{
		public int Id { get; set; }
		public string Name { get; set; }   // "18+"
		public string Code { get; set; }   // "age18"

		public List<Product> Products { get; set; } = new();
	}
}
