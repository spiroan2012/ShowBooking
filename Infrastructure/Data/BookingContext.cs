using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BookingContext : IdentityDbContext<AppUser, AppRole, int,
                                IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
                                IdentityRoleClaim<int>, IdentityUserToken<int>>
    {

        public BookingContext(DbContextOptions<BookingContext> options) : base(options)
        {
        }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Show> Shows { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Seat> Seats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Hall>()
                .HasMany(sh => sh.Shows)
                .WithOne(sh => sh.Hall);
            modelBuilder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(ur => ur.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(ur => ur.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly()); 
        }
    }
}
