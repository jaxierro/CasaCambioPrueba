using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using CasaCambio.Core.Models;

namespace CasaCambio.Core.Data
{
    public class ApplicationDbContext : DbContext
    {
        public virtual DbSet<Clientes> Clientes { get; set; }
        public virtual DbSet<Emails>   Emails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().Build();
            //optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            if (String.IsNullOrEmpty(configuration.GetConnectionString("DefaultConnection")))
            {
                optionsBuilder.UseSqlServer(new BaseDA().ConnectionStri﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using CasaCambio.Core.Models;

namespace CasaCambio.Core.Data
{
    public class ApplicationDbContext : DbContext
    {
        public virtual DbSet<Clientes> Clientes { get; set; }
        public virtual DbSet<Emails>   Emails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().Build();
            //optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            if (String.IsNullOrEmpty(configuration.GetConnectionString("DefaultConnection")))
            {
                optionsBuilder.UseSqlServer(new BaseDA().ConnectionString);
            }
            else
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            }
        }


    }

  


}
