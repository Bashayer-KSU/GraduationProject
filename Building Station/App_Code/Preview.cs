using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for Preview
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Preview : System.Web.Services.WebService
{
    [WebMethod(EnableSession =true)]
    public void EnableDesktopView()
    {
        Session["Preview"] = "DesktopView";
    }

    [WebMethod(EnableSession = true)]
    public void EnableMobileView()
    {
        Session["Preview"] = "MobileView";
    }

    [WebMethod(EnableSession = true)]
    public void SelectedView()
    {
        string type;
        if (Session["Preview"].ToString().Equals(null))
            type = "no value";
        else type = Session["Preview"].ToString();

        //\insert selected colors to database
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(type));
    }
}
