using System.Linq;
using System.Web.Http;

namespace RaidLog.Spa
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                                       name: "DefaultApi",
                                       routeTemplate: "api/{controller}/{id}",
                                       defaults: new
                                           {
                                               id = RouteParameter.Optional
                                           }
                );

            config.Routes.MapHttpRoute(
                "ProjectItems",
                "api/Project/{projectId}/{controller}/{id}",
                new { id = RouteParameter.Optional });
        }
    }
}
