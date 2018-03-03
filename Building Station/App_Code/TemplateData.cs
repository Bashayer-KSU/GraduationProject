using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Configuration;
using System.Data.SqlClient;

/// <summary>
/// Summary description for TemplateData
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class TemplateData : System.Web.Services.WebService
{

    //string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    string cs = "workstation id=BuildingStation4.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BuildingStation4.mssql.somee.com;persist security info=False;initial catalog=BuildingStation4";

    public Store store = new Store();
    public Product product = new Product();
    public TemplateData()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void StoreData()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Email, StoreName, Color1, Color2, Color3, Color4, Phone, logo, SocialMediaLinks, Location FROM Store WHERE Email = 'asmaa.alrubia@gmail.com'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.Email = reader["Email"].ToString();
                store.Name = reader["StoreName"].ToString();
                store.Color1 = reader["Color1"].ToString();
                store.Color2 = reader["Color2"].ToString();
                store.Color3 = reader["Color3"].ToString();
                store.Color4 = reader["Color4"].ToString();
                store.Phone = reader["Phone"].ToString();
                store.Logo = reader["logo"].ToString();
                store.SocialMedialinks = (reader["SocialMediaLinks"].ToString()).Split(null);
                store.Address = reader["Location"].ToString();
            }
        }
        Context.Response.Write(js.Serialize(store));
    }


    [WebMethod]
    public void ProductData()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Name, Price, Description, Discount, Category_ID, ShopEmail, Image FROM Product WHERE ShopEmail = 'asmaa.alrubia@gmail.com'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                product.Name = reader["Name"].ToString();
                product.Price = Convert.ToDouble(reader["Price"]);
                product.Description = reader["Description"].ToString();
                product.Discount = Convert.ToInt32(reader["Discount"]);
                product.Category_ID = reader["Category_ID"].ToString();
                product.ShopEmail = reader["ShopEmail"].ToString();
                product.Image = reader["Image"].ToString();

            }
        }
        Context.Response.Write(js.Serialize(product));
    }
}
