using FHSquareLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{

    public class EFCouponRepo : ICouponRepo
    {
        FHSquareContextDB ctx=new FHSquareContextDB();
        public async Task AddCoupon(Coupon coupon)
        {
            ctx.Coupons.Add(coupon);
            await ctx.SaveChangesAsync();
        }

        public async Task DeleteCoupon(int couponId)
        {
            Coupon coupon = await GetCouponById(couponId);
            ctx.Coupons.Remove(coupon);
            await ctx.SaveChangesAsync();
        }

        public async Task<List<Coupon>> GetAllCoupons()
        {
            List<Coupon> coupons= await ctx.Coupons.ToListAsync();
            return coupons;
        }

        public async Task<Coupon> GetCouponById(int couponId)
        {
            Coupon coupon=await (from c in ctx.Coupons where c.CouponId==couponId select c).FirstAsync();
            return coupon;
        }
    }
}
