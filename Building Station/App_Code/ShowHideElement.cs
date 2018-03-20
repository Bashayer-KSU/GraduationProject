using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for ShowHideElement
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class ShowHideElement : System.Web.Services.WebService
{
    JavaScriptSerializer js = new JavaScriptSerializer();

    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id=BuildingStation4.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BuildingStation4.mssql.somee.com;persist security info=False;initial catalog=BuildingStation4";

    List<Element> ElementsList = new List<Element>();
    public Element e = new Element();

    public ShowHideElement()
    {
       
    }

    [WebMethod(EnableSession = true)]
    public void GetElementsInfo()
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select * from Element Where StoreEmail ='" + Session["user"] + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            int colIndex;
                while (reader.Read())
            {
                e = new Element();
                e.Name = reader["Name"].ToString();
                e.Type = reader["Type"].ToString();
                colIndex = reader.GetOrdinal("Value");
                if (!reader.IsDBNull(colIndex)) {
                 e.Value = reader["Value"].ToString();
                }
                colIndex = reader.GetOrdinal("Image");
                if (!reader.IsDBNull(colIndex))
                {
                    e.Image = reader["Image"].ToString();
                }
                e.Hidden = Convert.ToBoolean(reader["Hidden"]);
                e.StoreEmail = reader["StoreEmail"].ToString();
                ElementsList.Add(e);
            }
        }

        Context.Response.Write(js.Serialize(ElementsList));

    }

    [WebMethod(EnableSession = true)]
    public void VisibleElement()
    {
        List<Element> ElementsList = new List<Element>();

        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Name, Hidden FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Type = 'Link'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                Element e = new Element();
                e.Name = reader["Name"].ToString();
                e.Hidden = Convert.ToBoolean(reader["Hidden"]);
                ElementsList.Add(e);
            }
        }
        Context.Response.Write(js.Serialize(ElementsList));
    }

    [WebMethod(EnableSession = true)]
    public void ValidLink(string name)
    {
        string link = "";
        if (name.ToLower() == "snapchat")
            link = "https://www.snapchat.com/add/";
        else if (name.ToLower() == "facebook")
            link = "https://www.facebook.com/";
        else if (name.ToLower() == "instagram")
            link = "https://www.instagram.com/";
        else if (name.ToLower() == "twitter")
            link = "https://twitter.com/";

        if (link != "")
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("select Name, Value from Element Where StoreEmail='" + Session["user"] + "' AND Name = '" + name + "' AND Value Like '" + link + "%' ", con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.HasRows == true)
                {
                    Context.Response.Write(js.Serialize(true));
                }
                else
                Context.Response.Write(js.Serialize(false));
            }
        }
        else
        Context.Response.Write(js.Serialize(false));
    }

    [WebMethod(EnableSession = true)]
    public void ShowHideSection(string section, string action)
    {
        string sectionName = "";
        if (section.ToLower() == "slider")
        {
            sectionName = "Slider";
        }
        else if (section.ToLower() == "about")
        {
            sectionName = "About";
        }
        

        if (sectionName != "" && action == "Show")
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("UPDATE Element SET Hidden = 'FALSE' Where StoreEmail='" + Session["user"] + "' AND Name = '" + sectionName + "'", con);
                con.Open();
                int x = cmd.ExecuteNonQuery();
                if (x != 0)
                    Context.Response.Write(js.Serialize(true));
                else Context.Response.Write(js.Serialize(false));
            }
        }
        else if(sectionName != "" && action == "Hide")
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("UPDATE Element SET Hidden = 'TRUE' Where StoreEmail='" + Session["user"] + "' AND Name = '" + sectionName + "'", con);
                con.Open();
                int x = cmd.ExecuteNonQuery();
                if (x != 0)
                    Context.Response.Write(js.Serialize(true));
                else Context.Response.Write(js.Serialize(false));
            }
        }
        else
            Context.Response.Write(js.Serialize(false));
    }

    [WebMethod(EnableSession = true)]
    public void ShowHideIcon(string icon, string action)
    {
        if (action == "Show")
        {

            if (icon == "Snapchat" || icon == "Facebook" || icon == "Twitter" || icon == "Instagram")
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("UPDATE Element SET Hidden = 'FALSE' Where StoreEmail='" + Session["user"] + "' AND Name = '" + icon + "'", con);
                    con.Open();
                    int x = cmd.ExecuteNonQuery();
                    if (x != 0)
                        Context.Response.Write(js.Serialize(true));
                    else Context.Response.Write(js.Serialize(false));
                }
            }
        }
        else if (action == "Hide")
        {
            if (icon == "Snapchat" || icon == "Facebook" || icon == "Twitter" || icon == "Instagram")
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("UPDATE Element SET Hidden = 'TRUE' Where StoreEmail='" + Session["user"] + "' AND Name = '" + icon + "'", con);
                    con.Open();
                    int x = cmd.ExecuteNonQuery();
                    if (x != 0)
                        Context.Response.Write(js.Serialize(true));
                    else Context.Response.Write(js.Serialize(false));
                }
            }
        }
        else Context.Response.Write(js.Serialize(false));
    }
}
