﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsDisabled { get; set; } = false;
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
