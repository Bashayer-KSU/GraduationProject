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
    //Session["user"]
   // string email = "star7s@msn.com";
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id=BuildingStation4.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BuildingStation4.mssql.somee.com;persist security info=False;initial catalog=BuildingStation4";
    JavaScriptSerializer js = new JavaScriptSerializer();


    public Store store = new Store();
    public Product product = new Product();
    List<Element> ElementsList = new List<Element>();

    public TemplateData()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public void StoreData()
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Email, StoreName, Color1, Color2, Color3, Color4, Phone, logo, MenuTitle, StoreDescription, SliderImage, Location, SnapchatLink, TwitterLink, FacebookLink, InstagramLink, PayPal, BankTransfer, Cash, ShopOwnerBank FROM Store Where Email = '" + Session["user"] + "'", con);
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
                store.menuTitle= reader["MenuTitle"].ToString();
                store.Description = reader["StoreDescription"].ToString();
                store.SliderImage = reader["SliderImage"].ToString();
                store.Address = reader["Location"].ToString();
                store.SnapchatLink = reader["SnapchatLink"].ToString();
                store.TwitterLink = reader["TwitterLink"].ToString();
                store.FacebookLink = reader["FacebookLink"].ToString();
                store.InstagramLink = reader["InstagramLink"].ToString();
                store.PayPal = Convert.ToBoolean(reader["PayPal"]);
                store.BankTransfer = Convert.ToBoolean(reader["BankTransfer"]);
                store.Cash = Convert.ToBoolean(reader["Cash"]);
                store.BankAccount = reader["ShopOwnerBank"].ToString();

            }
        }
        Context.Response.Write(js.Serialize(store));
    }

    [WebMethod(EnableSession = true)]
    public void ProductData()
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Name, Price, Description, Discount, Category_ID, StoreEmail, Image FROM Product WHERE StoreEmail = '" + Session["user"] + "'", con);
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

    [WebMethod(EnableSession = true)]
    public void UpdatStoreData(String DataType, String NewValue)
    {
        if (DataType.Equals("Store Name"))
            DataType = "StoreName";
        else if(DataType.Equals("Store Description"))
            DataType = "StoreDescription";
        else if (DataType.Equals("Address"))
            DataType = "Location";


        int x;
        Boolean result = false;

        if (NewValue!= null) {

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("UPDATE Store SET  [" + DataType + "] = N'" + NewValue + "' Where Email = '" + Session["user"] + "'", con))
                {
                    x = cmd.ExecuteNonQuery();
                    if (x != 0)
                        result = true;
                }
            }
            if(result)
        Context.Response.Write(js.Serialize(NewValue));
            else
                Context.Response.Write(js.Serialize("Error"));

        }
    }

    [WebMethod(EnableSession = true)]
    public void UpdateLinks(string snapchat_link, string twitter_link, string facebook_link, string instagram_link)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET SnapchatLink = '" + snapchat_link + "', TwitterLink = '" + twitter_link + "', FacebookLink = '" + facebook_link + "', InstagramLink = '" + instagram_link + "' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();
            store.SnapchatLink = snapchat_link;
            store.TwitterLink = twitter_link;
            store.FacebookLink = facebook_link;
            store.InstagramLink = instagram_link;

            con.Open();
            //Link Elements

            //Snapchat Link
            Element element = new Element();
            element.StoreEmail = Session["user"].ToString();
            if (store.SnapchatLink != null)
            {
                element.Value = store.SnapchatLink;
                if (store.SnapchatLink.ToLower().Contains("snapchat"))
                {
                    element.Hidden = false;
                }
                else
                    element.Hidden = true;
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
            }

            element.Name = "Snapchat";
            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden= '" + element.Hidden + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();


            //Twitter Link
            element = new Element();
            element.StoreEmail = Session["user"].ToString();
            if (store.TwitterLink != null)
            {
                element.Value = store.TwitterLink;
                if (store.TwitterLink.ToLower().Contains("https://twitter.com/"))
                    element.Hidden = false;
                else
                    element.Hidden = true;
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
            }

            element.Name = "Twitter";
            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden= '" + element.Hidden + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();


            //Facebook Link
            element = new Element();
            element.StoreEmail = Session["user"].ToString();
            if (store.FacebookLink != null)
            {
                element.Value = store.FacebookLink;
                if (store.FacebookLink.ToLower().Contains("https://www.facebook.com/"))
                    element.Hidden = false;
                else
                    element.Hidden = true;
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
            }

            element.Name = "Facebook";
            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden= '" + element.Hidden + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();


            //Instagram Link
            element = new Element();
            element.StoreEmail = Session["user"].ToString();
            if (store.InstagramLink != null)
            {
                element.Value = store.InstagramLink;
                if (store.InstagramLink.ToLower().Contains("https://www.instagram.com/"))
                    element.Hidden = false;
                else
                    element.Hidden = true;
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
            }

            element.Name = "Instagram";
            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden= '" + element.Hidden + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();

            con.Close();

            Context.Response.Write(js.Serialize(store));
        }
    }

    [WebMethod(EnableSession = true)]
    public void UploadLogo(string logo)
    {

        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET logo = '" + logo + "' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Logo = logo;
            Context.Response.Write(js.Serialize(store));
        }

    }

    [WebMethod(EnableSession = true)]
    public void UploadSlider(string slider)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET SliderImage = '" + slider + "' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.SliderImage = slider;

            con.Open();
            Element element = new Element();
            //Slider Element
            element = new Element();
            element.StoreEmail = Session["user"].ToString();
            element.Name = "Slider";
            element.Hidden = false;
            element.Image = store.SliderImage;
            ElementsList.Add(element);

            cmd = new SqlCommand("UPDATE Element SET Hidden = '" + element.Hidden + "', Image = '" + element.Image + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();

            Context.Response.Write(js.Serialize(store));
        }
    }
}




