using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for Published_Stores
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Published_Stores : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    // string cs = "workstation id=BuildingStation4.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BuildingStation4.mssql.somee.com;persist security info=False;initial catalog=BuildingStation4";

    JavaScriptSerializer js = new JavaScriptSerializer();

    public Store store = new Store();
    public Product product = new Product();

    public Published_Stores()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public void Publish()
    {
        string domain = " ";
        string storeName = " ";
        bool mayExists = false;
        int addChange = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT StoreName FROM Store WHERE Email ='" + Session["user"] + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                storeName = reader["StoreName"].ToString();
            }
            con.Close();

           domain =  storeName.Replace(" ", String.Empty);

            do {
                con.Open();
                cmd = new SqlCommand("SELECT WebsiteDomain FROM Store WHERE WebsiteDomain ='" + domain + "'", con);
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    domain = reader["WebsiteDomain"].ToString() + addChange;

                    addChange++;
                    mayExists = true;
                }
                con.Close();
            } while (mayExists);

            con.Open();
            cmd = new SqlCommand("UPDATE Store SET WebsiteDomain = N'" + domain + "', Published = 'true' Where Email = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();
        }
        Context.Response.Write(js.Serialize(domain));
    }

    [WebMethod]
    public void GetTemplate(string StoreDomain)
    {
        int TID = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT TemplateID FROM Store WHERE WebsiteDomain='" + StoreDomain + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                TID = Convert.ToInt32(reader["TemplateID"]);
                store.TemplateID = Convert.ToInt32(reader["TemplateID"]);
            }
            con.Close();
        }
        //  HttpContext.Current.Response.Write(js.Serialize(store));
        Context.Response.Write(js.Serialize(TID));
    }

    [WebMethod]
    public void GetStore(string StoreDomain)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Email, StoreName, StoreType, Color1, Color2, Color3, Color4, Phone, logo, MenuTitle, StoreDescription, Location, PayPal, BankTransfer, Cash, ShopOwnerBank FROM Store WHERE WebsiteDomain='" + StoreDomain + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.Email = reader["Email"].ToString();
                store.Name = reader["StoreName"].ToString();
                store.Type = reader["StoreType"].ToString();
                store.Color1 = reader["Color1"].ToString();
                store.Color2 = reader["Color2"].ToString();
                store.Color3 = reader["Color3"].ToString();
                store.Color4 = reader["Color4"].ToString();
                store.Phone = reader["Phone"].ToString();
                store.Logo = reader["logo"].ToString();
                store.menuTitle = reader["MenuTitle"].ToString();
                store.menuTitle = reader["MenuTitle"].ToString();
                store.Description = reader["StoreDescription"].ToString();
                store.Address = reader["Location"].ToString();
                store.PayPal = Convert.ToBoolean(reader["PayPal"]);
                store.BankTransfer = Convert.ToBoolean(reader["BankTransfer"]);
                store.Cash = Convert.ToBoolean(reader["Cash"]);
                store.BankAccount = reader["ShopOwnerBank"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Snapchat'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.SnapchatLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Twitter'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.TwitterLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Facebook'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.FacebookLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Instagram'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.InstagramLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'About'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.About = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Image FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Slider'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.SliderImage = reader["Image"].ToString();
            }
            reader.Close();
            con.Close();
        }
        Context.Response.Write(js.Serialize(store));
    }

    [WebMethod]
    public void GetProducts(string StoreDomain)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Name, Price, Description, Discount, Category_ID, StoreEmail, Image FROM Product WHERE StoreEmail = '" + store.Email + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                product.Name = reader["Name"].ToString();
                product.Price = Convert.ToDouble(reader["Price"]);
                product.Description = reader["Description"].ToString();
                product.Discount = Convert.ToInt32(reader["Discount"]);
                product.Category_ID = reader["Category_ID"].ToString();
                product.StoreEmail = reader["StoreEmail"].ToString();
                product.Image = reader["Image"].ToString();
            }
        }
        Context.Response.Write(js.Serialize(product));

    }
}
