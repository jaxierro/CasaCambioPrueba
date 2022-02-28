using System;
using System.IO;
using System.Threading;
//using JRBQTO.CORE.Data;
//using JRBQTO.CORE.Models.Base;
using Microsoft.AspNetCore.Buiusing System;
using System.IO;
using System.Threading;
//using JRBQTO.CORE.Data;
//using JRBQTO.CORE.Models.Base;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Rotativa.AspNetCore;

namespace eBQTO
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddSession(so =>
            {
                so.IdleTimeout = TimeSpan.FromSeconds(3600);
            });

            services.AddDistributedMemoryCache();
            services.AddControllersWithViews();
            services.AddRazorPages();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        [Obsolete]
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Microsoft.AspNetCore.Hosting.IHostingEnvironment env2, ILoggerFactory loggerFactory)
        {
             var path = Directory.GetCurrentDirectory();
            //var factory = new LoggerFactory();
            loggerFactory.AddFile($"{path}\\Logs\\Log.txt");
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Oficina}/{action=Login}/{id?}");
                endpoints.MapRazorPages();
            });

            
            RotativaConfiguration.Setup(env2);
            
        }
    }
}
