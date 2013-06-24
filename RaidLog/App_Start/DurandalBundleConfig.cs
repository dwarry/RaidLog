using System;
using System.Web.Optimization;

namespace RaidLog {
  public class DurandalBundleConfig {
    public static void RegisterBundles(BundleCollection bundles) {
      bundles.IgnoreList.Clear();
      AddDefaultIgnorePatterns(bundles.IgnoreList);

      bundles.Add(
        new ScriptBundle("~/scripts/vendor")
          .Include("~/Scripts/jquery-{version}.js")
          .Include("~/Scripts/jquery.dataTables.js")
          .Include("~/Scripts/knockout-{version}.js")
          .Include("~/Scripts/knockout.validation.js")
          .Include("~/Scripts/knockout.mapping-latest.js")
          .Include("~/Scripts/cog.js")
          .Include("~/Scripts/cog.utils.js")
          .Include("~/Scripts/knockout.bindings.dataTables.js")
          .Include("~/Scripts/sammy-{version}.js")
          .Include("~/Scripts/bootstrap.min.js")
          .Include("~/Scripts/knockout.simpleGrid.1.3.js")
          .Include("~/Scripts/moment.min.js")
          //.Include("~/Scripts/koGrid-{version}.js")

          .Include("~/Scripts/toastr.min.js")
        );

      bundles.Add(
        new StyleBundle("~/Content/css")
          .Include("~/Content/ie10mobile.css")
          .Include("~/Content/bootstrap.min.css")
          .Include("~/Content/bootstrap-responsive.min.css")
          .Include("~/Content/font-awesome.min.css")
          .Include("~/Content/jquery.dataTables.css")
		  .Include("~/Content/durandal.css")
          .Include("~/Content/app.css")
          .Include("~/Content/knockout.simpleGrid.css")
          //.Include("~/Content/KoGrid.css")
          .Include("~/Content/toastr.min.css")
        );
    }

    public static void AddDefaultIgnorePatterns(IgnoreList ignoreList) {
      if(ignoreList == null) {
        throw new ArgumentNullException("ignoreList");
      }

      ignoreList.Ignore("*.intellisense.js");
      ignoreList.Ignore("*-vsdoc.js");
      ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
      //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
      //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
    }
  }
}