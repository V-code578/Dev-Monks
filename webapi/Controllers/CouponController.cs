using FHSquareLibrary.Models;
using FHSquareLibrary.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        ICouponRepo couponRepo;
        public CouponController(ICouponRepo repo)
        {
            couponRepo=repo;
        }
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<Coupon> coupons=await couponRepo.GetAllCoupons();
            return Ok(coupons);
        }
        [HttpGet("{couponId}")]
        public async Task<ActionResult> GetById(int couponId)
        {
            try
            {
                Coupon coupon = await couponRepo.GetCouponById(couponId);
                return Ok(coupon);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Insert(Coupon coupon)
        {
            await couponRepo.AddCoupon(coupon);
            return Created($"api/Coupon/{coupon.CouponId}", coupon);
        }
        [HttpDelete]
        public async Task<ActionResult> Delete(int couponId)
        {
            await couponRepo.DeleteCoupon(couponId);
            return Ok();
        }
    }
}
