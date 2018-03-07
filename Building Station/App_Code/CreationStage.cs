using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;
using System.Text;

/// <summary>
/// Summary description for CreationStage
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class CreationStage : System.Web.Services.WebService
{
    string Slider1 = "";
    string Slider2 = "";
    string Slider3 = "";
    string Slider4 = "";
    string Slider5 = "";
    string Slider6 = "";
    string Slider7 = "";
    string Slider8 = "";
    string Slider_other = "";


    //string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    string cs = "workstation id=BuildingStation4.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BuildingStation4.mssql.somee.com;persist security info=False;initial catalog=BuildingStation4";

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
            SqlCommand cmd = new SqlCommand("SELECT Email, StoreName, StoreType, Phone, logo, Location, SnapchatLink, TwitterLink, FacebookLink, InstagramLink FROM Store WHERE Email = 'asmaa.alrubia@gmail.com'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.Email = reader["Email"].ToString();
                store.Name = reader["StoreName"].ToString();
                store.Type = reader["StoreType"].ToString();
                store.Phone = reader["Phone"].ToString();
                store.Logo = reader["logo"].ToString();
                store.Address = reader["Location"].ToString();
                store.SnapchatLink = reader["SnapchatLink"].ToString();
                store.TwitterLink = reader["TwitterLink"].ToString();
                store.FacebookLink = reader["FacebookLink"].ToString();
                store.InstagramLink = reader["InstagramLink"].ToString();

            }
        }
        Context.Response.Write(js.Serialize(store));
    }

    [WebMethod]
    public void StoreType(string type)
    {
        string[] Type1 = { "sweets", "dessert", "sugar", "cake" };

        string[] Type2 = { "handmade", "craft", "crochet", "yarn", "knitwear" };

        string[] Type3 = { "cloths", "dresses", "fashion", "" };

        string[] Type4 = { "makeup", "beauty", "Beauty & skin care", "skin care" };

        string[] Type5 = { "Baking", "Bakery", "", "" };

        string[] Type6 = { "cooking", "food", "Home cook" };

        string[] Type7 = { "accessories", "", "", "", "", "" };

        string[] Type8 = { "Phone & laptop accessories", "", "" };

        string[][] Types = { Type1, Type2, Type3, Type4, Type5, Type6, Type7, Type8 };

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

            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName = N'" + name + "' Where Email = 'asmaa.alrubia@gmail.com'", con);

            cmd.ExecuteNonQuery();
            con.Close();
            store.Name = name;
            Context.Response.Write(js.Serialize(store));
        }
    }

    [WebMethod]
    public void AddStoreType(string type, string language)
    {
        string Slider_Image = " ";
        string Description_Text = " "; 

        if (language.Equals("Arabic"))
        {
            if ((type.Contains("أشغال يدوية")) || (type.Contains("أعمال يدوية")) || (type.Contains("كروشيه")) || (type.Contains("صوف")) || (type.Contains("تريكو")) || (type.Contains("حياكة")))
            {
                    Slider_Image = Slider1;
                    Description_Text = "صناعة يدوية عالية الجودة بتصاميم مميزة 🎁";
            }

            else if ((type.Contains("حلويات")) || (type.Contains("كيك")))
            {
                Slider_Image = Slider2;
                Description_Text = "حلويات صنعت بكل حب وشغف 🎂💓";
            }

            else if ((type.Contains("مخبز")) || (type.Contains("معجنات")) || (type.Contains("مخبوزات")))
            {
                Slider_Image = Slider3;
                Description_Text = "مخبوزات ومعجنات لحفلات الشاي ☕️🥐";
            }


            else if ((type.Contains("ساعات")) || (type.Contains("اكسسوار")) || (type.Contains("اكسسوارات")))
            {
                Slider_Image = Slider4;
                Description_Text = "نتميز بجودة عالية وخيارات متعددة 💎";
            }

            else if ((type.Contains("موضة")) || (type.Contains("موضة وملابس")) || (type.Contains("ملابس")) || (type.Contains("فساتين")))
            {
                Slider_Image = Slider5;
                Description_Text = "قطع منتقاة بعناية لتناسب ذوقك الراقي 🎀🛍";
            }

            else if ((type.Contains("أغطية جوال")) || (type.Contains("اكسسوارات جوال ولابتوب")) || (type.Contains("حقائب لابتوب")))
            {
                Slider_Image = Slider6;
                Description_Text = "كل ما هو جديد في عالم إكسسوارات الإلكترونيات 📱🖥";
            }

            else if ((type.Contains("طبخ")) || (type.Contains("طبخ منزلي")) || (type.Contains("ورق عنب")) || (type.Contains("محاشي")) || (type.Contains("أطعمة شرقية")) || (type.Contains("طعام")) || (type.Contains("غذاء")))
            {
                Slider_Image = Slider7;
                Description_Text = "طبخات لذيذة ودافئة لإرضاء ذائقتكم 🥘😋";
            }

            else if ((type.Contains("جمال")) || (type.Contains("عناية")) || (type.Contains("مكياج")) || (type.Contains("بشرة")) || (type.Contains("تجميل")) || (type.Contains("كريم")))
            {
                Slider_Image = Slider8;
                Description_Text = "المكان المناسب لتدللي نفسك 💁🏻‍♀️";
            }
            else
            {
                Slider_Image = Slider_other;
                Description_Text = "أسعار منافسة، ومنتجات رائعة ✨";
            }

        }
        else if (language.Equals("English"))
        { }

        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreType = N'" + type + "', SilderImage = '" + Slider_Image + "', StoreDescription = N'"+ Description_Text +"' Where Email = 'asmaa.alrubia@gmail.com'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.SliderImage = Slider_Image;
            store.Description = Description_Text;
            store.Type = type;
            Context.Response.Write(js.Serialize(store));
        }
    }

    [WebMethod]
    public void ConnectInstagram(string link, string logo, string descripton)
    {
    }


    [WebMethod]
    public void AddTemplate(int id)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET TemplateID = " + id + " Where Email = 'asmaa.alrubia@gmail.com'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.TemplateID = id;
            Context.Response.Write(js.Serialize(store));
        }
    }

    [WebMethod]
    public void GetColors()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT Color1, Color2, Color3, Color4 FROM Store WHERE Email = 'asmaa.alrubia@gmail.com'", con);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.Color1 = reader["Color1"].ToString();
                store.Color2 = reader["Color2"].ToString();
                store.Color3 = reader["Color3"].ToString();
                store.Color4 = reader["Color4"].ToString();
            }
        }
        Context.Response.Write(js.Serialize(store));
    }

    [WebMethod]
    public void UpdateColors(string color1, string color2, string color3, string color4)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET Color1 = '" + color1 + "', Color2 = '"+ color2 +"', Color3 = '"+ color3 +"', Color4 = '"+ color4 +"' Where Email = 'asmaa.alrubia@gmail.com'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Color1 = color1;
            store.Color2 = color2;
            store.Color3 = color3;
            store.Color4 = color4;
            Context.Response.Write(js.Serialize(store));
        }
    }

    [WebMethod]
    public void UpdateData(string address, string snapchat_link, string twitter_link, string facebook_link, string instagram_link)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET Location = N'" + address + "', SnapchatLink = '" + snapchat_link + "', TwitterLink = '" + twitter_link + "', FacebookLink = '" + facebook_link + "', InstagramLink = '" + instagram_link + "' Where Email = 'asmaa.alrubia@gmail.com'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Address = address;
            store.SnapchatLink = snapchat_link;
            store.TwitterLink = twitter_link;
            store.FacebookLink = facebook_link;
            store.InstagramLink = instagram_link;
            Context.Response.Write(js.Serialize(store));
        }

    }

    [WebMethod]
    public void UploadLogo(string logo)
    {

        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET logo = '" + logo +"' Where Email = 'asmaa.alrubia@gmail.com'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Logo = logo;
            Context.Response.Write(js.Serialize(store));
        }
    }

    [WebMethod]
    public void UpdateType(string type, string language)
    {

        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreType = N'" + type + "' Where Email = 'asmaa.alrubia@gmail.com'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Type = type;
            Context.Response.Write(js.Serialize(store));
        }
    }




    [WebMethod]
    public void Test1 (Store image)
    {
       // string tryMe = "test2";
       //string Temp_image = image.SliderImage;
   //    string Temp_image = "this is over ";

        //byte[] theBytes = System.Text.Encoding.ASCII.GetBytes(Temp_image);
    //   byte[] theBytes = Encoding.UTF8.GetBytes(Temp_image);
        JavaScriptSerializer js = new JavaScriptSerializer();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            //  SqlCommand cmd = new SqlCommand("UPDATE type_images SET type1_slider = '" + theBytes + "' Where id = '1'", con);
            //  SqlCommand cmd = new SqlCommand("UPDATE Store SET SilderImage =  CONVERT(varbinary,'" + image.SliderImage + "') Where Email = 'asmaa.alrubia@gmail.com'", con);
            // SqlCommand cmd = new SqlCommand("UPDATE Store SET logo = '" + tryMe + "', SilderImage = "+ theBytes + " Where Email = 'asmaa@mail.com'", con);
            SqlCommand cmd = new SqlCommand("UPDATE type_images SET type9_slider = '" + image.SliderImage + "' Where id = '1'", con);

            cmd.ExecuteNonQuery();
            con.Close();
        }
    }

    [WebMethod]
    public void Test2()
    {
       // byte[] theBytes;
      //  string theString = " nothing " ;
        JavaScriptSerializer js = new JavaScriptSerializer();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            // SqlCommand cmd = new SqlCommand("SELECT type1_slider FROM type_images Where id = '1'", con);
            //   SqlCommand cmd = new SqlCommand("SELECT CONVERT(varchar(max), SilderImage, 2) FROM Store Where Email = 'asmaa.alrubia@gmail.com'", con);
            //  SqlCommand cmd = new SqlCommand("SELECT cast(SilderImage as varchar(max)) FROM Store Where Email = 'asmaa.alrubia@gmail.com'", con);
            SqlCommand cmd = new SqlCommand("SELECT type9_slider FROM type_images Where id = '1'", con);


            SqlDataReader reader = cmd.ExecuteReader();
           // theBytes = (byte[])reader.GetValue(0);
            while (reader.Read())
            {
                //  theBytes = (byte[]) reader["SilderImage"];
              //   theString = Encoding.UTF8.GetString(theBytes);
            store.Logo = reader["type9_slider"].ToString();

          //  store.SliderImage = theString;

           }
            con.Close();

            Context.Response.Write(js.Serialize(store));
        }
    }
}