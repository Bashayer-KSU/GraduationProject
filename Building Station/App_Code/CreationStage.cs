using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;

/// <summary>
/// Summary description for CreationStage
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class CreationStage : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    public Store store = new Store();

    public CreationStage()
    {


        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void StoreInfo()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select * from Store Where ID ", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {

                store.Logo = reader["Logo"].ToString();
                store.Name = reader["Name"].ToString();
                store.Address = reader["Address"].ToString();
                store.Email = reader["Email"].ToString();
                store.Phone = reader["Phone"].ToString();
                // store.SocialMedialinks = reader["Social Media Links"].ToString();
            }
        }

        Context.Response.Write(js.Serialize(store));
    }

    [WebMethod]
    public void StoreType(string type)
    {

        string[] Type1 = { "sweet", "dessert", "sugar", "cake", "cupcake", "confection", "pie", "pastry", "pudding", "tart", "" };

        string[] Type2 = { "craft", "decoupage", "" };

        string[] Type3 = { "cloths", "dresses", "fashion", "" };

        string[] Type4 = { "makeup", "beauty" };

        string[] Type5 = { "skin care", "mask", "hair care", "" };

        string[] Type6 = { "crochet", "yarn", "knitwear", "" };

        string[] Type7 = { "accessories", "necklace", "bracelet", "earing", "Gemstones", "" };

        string[] Type8 = { "electronics", "headphones", "" };

        string[] Type9 = { "cooking", "food", "" };

        string[] Type10 = { "handmade" };

        string[][] Types = { Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8, Type9, Type10 };

        foreach (string[] j in Types)
        {

            foreach (string i in j)
            {

                if (type.Equals(i))
                {

                }

            }
        }


    }

    [WebMethod]
    public void AddStoreName(string name)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

           //  SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName ='" + n +"' Where ID = 2", con);
            //  SqlCommand cmd = new SqlCommand("insert into Store (ShopOwnerName, Email, Password, StoreName) values " +
            //  "('try','try@msn.com','12345678','" + n + "')", con);

            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName ='" + name + "' Where ID = 2", con);

            cmd.ExecuteNonQuery();
            con.Close();
            store.Name = name;
            Context.Response.Write(js.Serialize(store));
        }
    }
}