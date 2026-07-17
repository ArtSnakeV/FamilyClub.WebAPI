namespace FamilyClub.BLL.DTOs.Promotion;

public class PromotionDto
{
    public int Id { get; set; }
    public int? DiscountPercent { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
