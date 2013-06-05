using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.WebApi;

using CacheCow.Common;
using CacheCow.Server;
using CacheCow.Server.EntityTagStore.SqlServer;
using Newtonsoft.Json.Serialization;

namespace RaidLog
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            HttpConfiguration config = GlobalConfiguration.Configuration;

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            AreaRegistration.RegisterAllAreas();

            InitialiseIocContainer();
//            InitializeCaching();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        private void InitialiseIocContainer()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;

            // Create the container builder.
            var builder = new ContainerBuilder();
            
            // Register the Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            
            // Register other dependencies.
            builder.Register(c => new SqlConnection(connectionString)).As<IDbConnection>().InstancePerApiRequest();
            
            // Build the container.
            var container = builder.Build();
            
            // Create the depenedency resolver.
            var resolver = new AutofacWebApiDependencyResolver(container);
            
            // Configure Web API with the dependency resolver.
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
        }

        /*private void InitializeCaching()
        {
            IEntityTagStore db = new SqlServerEntityTagStore();
            var cachecow = new CachingHandler(db);
            GlobalConfiguration.Configuration.MessageHandlers.Add(cachecow);
        }*/
    }
}