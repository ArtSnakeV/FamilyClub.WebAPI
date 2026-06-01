using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.DTOs.AgeRestriction
{
	public class AgeRestrictionDto
	{
		public int Id { get; set; }
		public string Name { get; set; }   // "18+"
		public string Code { get; set; }   // "age18"
	}
}
