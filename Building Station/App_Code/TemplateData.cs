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
   // string email = "lastlink@mail.com";
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id=BuildingStation4.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BuildingStation4.mssql.somee.com;persist security info=False;initial catalog=BuildingStation4";
    JavaScriptSerializer js = new JavaScriptSerializer();


    public Store store = new Store();
   // public Product Product = new Product();
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
            // SnapchatLink, TwitterLink, FacebookLink, InstagramLink,
            SqlCommand cmd = new SqlCommand("SELECT Email, StoreName, Color1, Color2, Color3, Color4, Phone, logo, MenuTitle, StoreDescription, Location, PayPal, BankTransfer, Cash, ShopOwnerBank FROM Store Where Email = '" + Session["user"] + "'", con);
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
             //   store.SliderImage = reader["SliderImage"].ToString();
                store.Address = reader["Location"].ToString();
               // store.SnapchatLink = reader["SnapchatLink"].ToString();
               // store.TwitterLink = reader["TwitterLink"].ToString();
               // store.FacebookLink = reader["FacebookLink"].ToString();
               // store.InstagramLink = reader["InstagramLink"].ToString();
                store.PayPal = Convert.ToBoolean(reader["PayPal"]);
                store.BankTransfer = Convert.ToBoolean(reader["BankTransfer"]);
                store.Cash = Convert.ToBoolean(reader["Cash"]);
                store.BankAccount = reader["ShopOwnerBank"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'Snapchat'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.SnapchatLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'Twitter'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.TwitterLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'Facebook'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.FacebookLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'Instagram'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.InstagramLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'About'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.About = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Image FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'Slider'", con);
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

    [WebMethod(EnableSession = true)]
    public void ProductData()
    {
        List<Product> ProductsList = new List<Product>();

        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT ID, Name, Price, Description, Discount, Category_ID, Image FROM Product WHERE StoreEmail = '" + Session["user"] + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                Product product = new Product();
                product.ID = Convert.ToInt32(reader["ID"]);
                product.Name = reader["Name"].ToString();
                product.Price = Convert.ToDouble(reader["Price"]);
                product.Description = reader["Description"].ToString();
                product.Discount = Convert.ToInt32(reader["Discount"]);
                product.Category_ID = reader["Category_ID"].ToString();
              //  product.StoreEmail = reader["StoreEmail"].ToString();
                product.Image = reader["Image"].ToString();

                ProductsList.Add(product);
            }
        }
        Context.Response.Write(js.Serialize(ProductsList));
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
        else if (DataType.Equals("About"))
            DataType = "About";

        int x;
        Boolean result = false;

        if (NewValue!= null && DataType!="About") {

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("UPDATE Store SET  [" + DataType + "] = N'" + NewValue + "' Where Email = '" + Session["user"] + "'", con))
                {
                    x = cmd.ExecuteNonQuery();
                    if (x != 0)
                        result = true;
                }
                con.Close();
            }
            if(result)
        Context.Response.Write(js.Serialize(NewValue));
            else
                Context.Response.Write(js.Serialize("Error"));

        }
        else if(DataType == "About")
        {

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("UPDATE Element SET  Value = N'" + NewValue + "' Where StoreEmail = '" + Session["user"] + "' And Name = 'About'", con))
                {
                    x = cmd.ExecuteNonQuery();
                    if (x != 0)
                        result = true;
                }
                con.Close();

            }
            if (result)
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
            /* con.Open();
             SqlCommand cmd = new SqlCommand("UPDATE Store SET SnapchatLink = '" + snapchat_link + "', TwitterLink = '" + twitter_link + "', FacebookLink = '" + facebook_link + "', InstagramLink = '" + instagram_link + "' WHERE Email='" + Session["user"] + "'", con);
             cmd.ExecuteNonQuery();
             con.Close();
             store.SnapchatLink = snapchat_link;
             store.TwitterLink = twitter_link;
             store.FacebookLink = facebook_link;
             store.InstagramLink = instagram_link;
             */
            con.Open();
            //Link Elements
            List<Element> ElementsList = new List<Element>();
            //Snapchat Link
            Element element = new Element();
            element.StoreEmail = Session["user"].ToString();
            if (snapchat_link != null)
            {
                if (snapchat_link.ToLower().Contains("https://www.snapchat.com/add/"))
                {
                    store.SnapchatLink = snapchat_link;
                    element.Hidden = false;
                    element.Value = snapchat_link;
                }
                else
                {
                    element.Hidden = true;
                    element.Value = "No Value";
                    store.SnapchatLink = "No Value";
                }
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
                store.SnapchatLink = "No Value";
            }

            element.Name = "Snapchat";
            ElementsList.Add(element);
            SqlCommand cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden= '" + element.Hidden + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();


            //Twitter Link
            element = new Element();
            element.StoreEmail = Session["user"].ToString();
            if (twitter_link != null)
            {
                if (twitter_link.ToLower().Contains("https://www.twitter.com/"))
                {
                    store.TwitterLink = twitter_link;
                    element.Hidden = false;
                    element.Value = twitter_link;
                }
                else
                {
                    element.Hidden = true;
                    element.Value = "No Value";
                    store.TwitterLink = "No Value";
                }
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
                store.TwitterLink = "No Value";
            }

            element.Name = "Twitter";
            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden= '" + element.Hidden + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();


            //Facebook Link
            element = new Element();
            element.StoreEmail = Session["user"].ToString();
            if (facebook_link != null)
            {
                if (facebook_link.ToLower().Contains("https://www.facebook.com/"))
                {
                    element.Hidden = false;
                    element.Value = facebook_link;
                    store.FacebookLink = facebook_link ;
                }
                else
                {
                    element.Hidden = true;
                    element.Value = "No Value";
                    store.FacebookLink = "No Value";
                }
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
                store.FacebookLink = "No Value";

            }

            element.Name = "Facebook";
            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden= '" + element.Hidden + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();


            //Instagram Link
            element = new Element();
            element.StoreEmail = Session["user"].ToString();
            if (instagram_link != null)
            {
                if (instagram_link.ToLower().Contains("https://www.instagram.com/"))
                {
                    element.Hidden = false;
                    element.Value = instagram_link;
                    store.InstagramLink = instagram_link;
                }
                else
                {
                    element.Hidden = true;
                    element.Value = "No Value";
                    store.InstagramLink = "No Value";

                }
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
                store.InstagramLink = "No Value";
            }

            element.Name = "Instagram";
            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden= '" + element.Hidden + "' WHERE StoreEmail = '" + element.StoreEmail + "' AND Name = '" + element.Name + "'", con);
            cmd.ExecuteNonQuery();

            con.Close();

            Context.Response.Write(js.Serialize(ElementsList));
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
            SqlCommand cmd = new SqlCommand("UPDATE Element SET Hidden = 'false', Image = '" + slider + "' WHERE StoreEmail='" + Session["user"] + "' AND Type = 'Slider' AND Name = 'Slider'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.SliderImage = slider;
            Context.Response.Write(js.Serialize(store));
        }
    }
    [WebMethod(EnableSession = true)]
    public void UploadAboutImage(string image)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Element SET Hidden = 'false', Image = '" + image + "' WHERE StoreEmail='" + Session["user"] + "' AND Type = 'About' AND Name = 'About'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            Context.Response.Write(js.Serialize(true));
        }
    }
}




