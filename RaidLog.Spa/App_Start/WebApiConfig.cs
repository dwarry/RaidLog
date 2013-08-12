using System.Linq;
using System.Web.Http;
using System.Web.Mvc;

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
                           name: "Actions",
                           routeTemplate: "api/{itemType}/{itemId}/actions",
                           defaults: new
                           {
                               controller = "Actions",
                           }
                );

            config.Routes.MapHttpRoute(
                "ProjectItems",
                "api/Project/{projectId}/{controller}/{id}",
                new { id = RouteParameter.Optional });



            config.Routes.MapHttpRoute("ProjectItemActions",
                "api/Project/{projectId}/{itemType}/{itemId}/actions",
                new{ controller="Actions"})
            ;
        }
    }
}
