using System;
using System.Linq;
using System.Web.Optimization;

namespace RaidLog.Spa
{
    public class DurandalBundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(new StyleBundle("~/Content/css")
                            .Include("~/Content/ie10mobile.css")
                            .Include("~/Content/bootstrap.min.css")
                            .Include("~/Content/bootstrap-responsive.min.css")
                            .Include("~/Content/font-awesome.min.css")
                            .Include("~/Content/durandal.css")
                            .Include("~/Content/toastr.css")
                            .Include("~/Content/site.css")
                );


            bundles.Add(new ScriptBundle("~/Scripts/static")
                            .Include("~/Scripts/jquery-2.0.2.js",
                                     "~/Scripts/knockout-2.2.1.js",
                                     "~/Scripts/moment.js",
                                     "~/Scripts/toastr.js"));
        }


        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js",
                              OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}
