using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Configuration;
using System.Data.SqlClient;
using CloudinaryDotNet;

/// <summary>
/// Summary description for TemplateData
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class TemplateData : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id=BS-Database.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BS-Database.mssql.somee.com;persist security info=False;initial catalog=BS-Database";

    JavaScriptSerializer js = new JavaScriptSerializer();

    public Store store = new Store();
   // public Product Product = new Product();
    List<Element> ElementsList = new List<Element>();

    [WebMethod(EnableSession = true)]
    public void StoreData()
    {
        try {
            using (SqlConnection con = new SqlConnection(cs))
            {
                // SnapchatLink, TwitterLink, FacebookLink, InstagramLink,
                SqlCommand cmd = new SqlCommand("SELECT Email, StoreName, Color1, Color2, Color3, Color4, Phone, logo, MenuTitle, StoreDescription, Location, PayPal, BankTransfer, Cash FROM Store Where Email = '" + Session["user"] + "'", con);
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
                    store.menuTitle = reader["MenuTitle"].ToString();
                    store.Description = reader["StoreDescription"].ToString();
                    store.Address = reader["Location"].ToString();
                    store.PayPal = Convert.ToBoolean(reader["PayPal"]);
                    store.BankTransfer = Convert.ToBoolean(reader["BankTransfer"]);
                    store.Cash = Convert.ToBoolean(reader["Cash"]);
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

                con.Open();
                cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'PayPal' AND Type = 'Currency'", con);
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    store.PayPalCurrencey = reader["Value"].ToString();
                }
                reader.Close();
                con.Close();

                con.Open();
                cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'PayPal' AND Type = 'AccountEmail'", con);
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    store.PayPalEmail = reader["Value"].ToString();
                }
                reader.Close();
                con.Close();

                con.Open();
                cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'BankTransfer' AND Type = 'BankName'", con);
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    store.BankName = reader["Value"].ToString();
                }
                reader.Close();
                con.Close();

                con.Open();
                cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'BankTransfer' AND Type = 'AccountName'", con);
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    store.AccountName = reader["Value"].ToString();
                }
                reader.Close();
                con.Close();

                con.Open();
                cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + Session["user"] + "' AND Name = 'BankTransfer' AND Type = 'IBAN'", con);
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    store.IBAN = reader["Value"].ToString();
                }
                reader.Close();
                con.Close();
            }
            Context.Response.Write(js.Serialize(store));

            //        return store;
        }
        catch(Exception e) { }
        }

    [WebMethod(EnableSession = true)]
    public void ProductData()
    { //List<Product>

        try
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
            //  return ProductsList;

        }
        catch (Exception e) { }

    }

    [WebMethod(EnableSession = true)]
    public void UpdatStoreData(String DataType, String NewValue)
    {
        if (DataType.Equals("Store Name") || DataType.Equals("اسم المتجر"))
            DataType = "StoreName";
        else if (DataType.Equals("Store Description") || DataType.Equals("وصف المتجر"))
            DataType = "StoreDescription";
        else if (DataType.Equals("Address") || DataType.Equals("العنوان"))
            DataType = "Location";
        else if (DataType.Equals("Phone") || DataType.Equals("رقم التواصل"))
            DataType = "Phone";
        else if (DataType.Equals("About") || DataType.Equals("عن الموقع"))
            DataType = "About";
        else if (DataType.Equals("Menu Title") || DataType.Equals("عنوان القائمة"))
            DataType = "MenuTitle";
        else DataType = "";

        int x;
        Boolean result = false;

        if (NewValue!= null && DataType!="About" && DataType != "") {

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

           // return NewValue;
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

          //  return NewValue;
        }
        else
        Context.Response.Write(js.Serialize(""));

     //   return "Error";
    }

    [WebMethod(EnableSession = true)]
    public void UpdateLinks(string snapchat_link, string twitter_link, string facebook_link, string instagram_link)
    { //List<Element>
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
                if ((twitter_link.ToLower().Contains("https://www.twitter.com/"))|| (twitter_link.ToLower().Contains("https://twitter.com/")))
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

          //  return ElementsList;
        }
      //  Context.Response.Write(js.Serialize(null));

        //return null;
    }

    [WebMethod(EnableSession = true)]
    public void UploadLogo(string logo)
    {
/*
        // our account in cloudinary 
        CloudinaryDotNet.Account account =
                            new CloudinaryDotNet.Account("dkejtwcc6", "799652649934124", "N6eQmnp7-66vxt3IMIpC-z0ijDw");

        CloudinaryDotNet.Cloudinary cloudinary = new CloudinaryDotNet.Cloudinary(account);
        //\our account in cloudinary
       //string ImageURL = cloudinary.Api.UrlImgUp.Transform(new Transformation().Width(200).Crop("scale")).BuildImageTag(logo);
       string ImageURL = cloudinary.Api.UrlImgUp.Transform(new Transformation().Width(200).Crop("scale")).BuildImageTag(@"C:\Users\star7\OneDrive\Desktop\ONLINE SHOPS PIC's\-2- Sweets");
        //C: \Users\star7\OneDrive\Desktop\ONLINE SHOPS PIC's\-1- HAND MADE
        // cloudinary.Api.UrlImgUp.Transform(new Transformation().Width(200).Crop("scale")).BuildImageTag("turtles.jpg")
        */

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET logo = '" + logo + "' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Logo = logo;
            Context.Response.Write(js.Serialize(store));

    //        return store;
        }
      //  Context.Response.Write(js.Serialize(null));

       // return null;
    }

    [WebMethod(EnableSession = true)]
    public void UploadSlider(string slider)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Element SET Hidden = 'false', Image = '" + slider + "' WHERE StoreEmail='" + Session["user"] + "' AND Type = 'Slider' AND Name = 'Slider'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.SliderImage = slider;
            Context.Response.Write(js.Serialize(store));

        //    return store;
        }
      //  Context.Response.Write(js.Serialize(null));

   //     return null;
    }

    [WebMethod(EnableSession = true)]
    public void UploadAboutImage(string image)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Element SET Hidden = 'false', Image = '" + image + "' WHERE StoreEmail='" + Session["user"] + "' AND Type = 'About' AND Name = 'About'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            Context.Response.Write(js.Serialize(true));

         //   return true;
        }
    }
}




