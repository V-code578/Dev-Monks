using FHSquareLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public interface ICouponRepo
    {
        Task<Coupon> GetCouponById(int couponId);
        Task<List<Coupon>> GetAllCoupons();
        Task AddCoupon(Coupon coupon);
        Task DeleteCoupon(int couponId); 
    }
}
