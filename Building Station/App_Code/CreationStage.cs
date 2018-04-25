using System;
using System.Collections.Generic;
using System.Linq;
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

    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id=BS-Database.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BS-Database.mssql.somee.com;persist security info=False;initial catalog=BS-Database";

    JavaScriptSerializer js = new JavaScriptSerializer();

    public Store store = new Store();
    List<Element> ElementsList = new List<Element>();

    public CreationStage()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public void StoreInfo()
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            //, SnapchatLink, TwitterLink, FacebookLink, InstagramLink
            SqlCommand cmd = new SqlCommand("SELECT Email, StoreName, StoreType, Phone, logo, Location FROM Store WHERE Email='" + Session["user"] + "'", con);
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
                /*store.SnapchatLink = reader["SnapchatLink"].ToString();
                store.TwitterLink = reader["TwitterLink"].ToString();
                store.FacebookLink = reader["FacebookLink"].ToString();
                store.InstagramLink = reader["InstagramLink"].ToString();*/
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
        }

        Context.Response.Write(js.Serialize(store));

//        return store;
    }

    [WebMethod(EnableSession = true)]
    public void AddStoreName(string name)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName = N'" + name + "' WHERE Email='" + Session["user"] + "'", con);

            cmd.ExecuteNonQuery();
            con.Close();
            store.Name = name;

            Context.Response.Write(js.Serialize(store));

//            return store;
        }
    }

    [WebMethod(EnableSession = true)]
    public void AddStoreType(string type, string language)
    {
        string Slider_Image = " ";
        string Description_Text = " ";
        string Product_Image = " ";
        string Product_Description = " ";

        if (language.Equals("Arabic"))
        {
            if ((type.Contains("أشغال يدوية")) || (type.Contains("أعمال يدوية")) || (type.Contains("كروشيه")) || (type.Contains("صوف")) || (type.Contains("تريكو")) || (type.Contains("حياكة")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type1_slider, type1_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type1_slider"].ToString();
                        Product_Image = reader["type1_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "صناعة يدوية عالية الجودة بتصاميم مميزة 🎁";
                Product_Description = "دمية أرنب محشوّة بالكروشيه"; 
            }

            else if ((type.Contains("حلويات")) || (type.Contains("كيك")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type2_slider, type2_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type2_slider"].ToString();
                        Product_Image = reader["type2_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "حلويات صنعت بكل حب وشغف 🎂💓";
                Product_Description = "كيك حجم متوسط بنكهة البندق والكريمة";
            }

            else if ((type.Contains("مخبز")) || (type.Contains("معجنات")) || (type.Contains("مخبوزات")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type3_slider, type3_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type3_slider"].ToString();
                        Product_Image = reader["type3_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "مخبوزات ومعجنات لحفلات الشاي ☕️🥐";
                Product_Description = "كروسان محشو بالمكسرات حجم متوسط ";
            }


            else if ((type.Contains("ساعات")) || (type.Contains("اكسسوار")) || (type.Contains("اكسسوارات")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type4_slider, type4_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type4_slider"].ToString();
                        Product_Image = reader["type4_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "نتميز بجودة عالية وخيارات متعددة 💎";
                Product_Description = "ساعة زهرية اللون مُزيّنة بالزهور FREE SIZE";
            }

            else if ((type.Contains("موضة")) || (type.Contains("موضة وملابس")) || (type.Contains("ملابس")) || (type.Contains("فساتين")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type5_slider, type5_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type5_slider"].ToString();
                        Product_Image = reader["type5_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "قطع منتقاة بعناية لتتناسب مع ذوقك الراقي 🎀🛍";
                Product_Description = "فستان وردي مقاس S";
            }

            else if ((type.Contains("أغطية جوال")) || (type.Contains("اكسسوارات جوال ولابتوب")) || (type.Contains("حقائب لابتوب")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type6_slider, type6_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type6_slider"].ToString();
                        Product_Image = reader["type6_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "كل ما هو جديد في عالم الإكسسوارات الإلكترونيات 📱🖥";
                Product_Description = "ستاند لابتوب ١٣ بوصة متعدد الألوان";
            }

            else if ((type.Contains("طبخ")) || (type.Contains("طبخ منزلي")) || (type.Contains("ورق عنب")) || (type.Contains("محاشي")) || (type.Contains("أطعمة شرقية")) || (type.Contains("طعام")) || (type.Contains("غذاء")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type7_slider, type7_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type7_slider"].ToString();
                        Product_Image = reader["type7_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "طبخات لذيذة ودافئة لإرضاء ذائقتكم 🥘😋";
                Product_Description = "صحن ورق عنب حجم صغير";
            }

            else if ((type.Contains("جمال")) || (type.Contains("عناية")) || (type.Contains("مكياج")) || (type.Contains("بشرة")) || (type.Contains("تجميل")) || (type.Contains("كريم")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type8_slider, type8_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type8_slider"].ToString();
                        Product_Image = reader["type8_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "المكان المناسب لتدللي نفسك 💁🏻‍♀️";
                Product_Description = "مجموعة العناية بالبشرة، كريم مرطب للبشرة والوجه";
            }
            else
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type9_slider, type9_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type9_slider"].ToString();
                        Product_Image = reader["type9_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "أسعار منافسة، ومنتجات رائعة ✨";
                Product_Description = "متعدد الاستخدامات بجودة عالية";
            }

        }
        else if (language.Equals("English"))
        {
            type = type.ToLower();

            if ((type.Contains("handmade")) || (type.Contains("crochet")) || (type.Contains("knitwear")) || (type.Contains("yarn")) || (type.Contains("wool")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type1_slider, type1_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type1_slider"].ToString();
                        Product_Image = reader["type1_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "High quality handmade with special designs 🎁";
                Product_Description = "Stuffed Rabbit Doll (Crochet)";
            }

            else if ((type.Contains("sweets")) || (type.Contains("dessert")) || (type.Contains("sugar")) || (type.Contains("cake")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type2_slider, type2_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type2_slider"].ToString();
                        Product_Image = reader["type2_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "Sweets made with love and passion 🎂💓";
                Product_Description = "Cake with hazelnut & cream flavor (enough for 8 people)";
            }

            else if ((type.Contains("bakery")) || (type.Contains("pastries")) || (type.Contains("pastry")) || (type.Contains("baking")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type3_slider, type3_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type3_slider"].ToString();
                        Product_Image = reader["type3_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "Bakery and pastry for tea parties ☕️🥐";
                Product_Description = "Croissant with nuts, medium size";
            }

            else if ((type.Contains("watches")) || (type.Contains("jewelery")) || (type.Contains("accessories")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type4_slider, type4_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type4_slider"].ToString();
                        Product_Image = reader["type4_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "High quality and multiple options 💎";
                Product_Description = "Wristwatch FREE SIZE";
            }

            else if ((type.Contains("fashion")) || (type.Contains("cloths")) || (type.Contains("dresses")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type5_slider, type5_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type5_slider"].ToString();
                        Product_Image = reader["type5_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "Carefully selected pieces to suit your taste 🎀🛍";
                Product_Description = "Pink Lolita Dress, size~ M";
            }

            else if ((type.Contains("mobile covers")) || (type.Contains("phone & laptop accessories")) || (type.Contains("laptop bags")) || (type.Contains("cases")) || (type.Contains("sleeve")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type6_slider, type6_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type6_slider"].ToString();
                        Product_Image = reader["type6_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "Everything new in the world of electronics' accessories 📱🖥";
                Product_Description = "13 inch multi-color laptop stand";
            }

            else if ((type.Contains("cooking")) || (type.Contains("home cook")) || (type.Contains("grape leaves")) || (type.Contains("mahashi")) || (type.Contains("eastern food")) || (type.Contains("food")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type7_slider, type7_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type7_slider"].ToString();
                        Product_Image = reader["type7_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "Delicious and warm dishes to satisfy your taste 🥘😋";
                Product_Description = "grape leaves, Small dish";
            }

            else if ((type.Contains("beauty")) || (type.Contains("skin care")) || (type.Contains("makeup")) || (type.Contains("skin")) || (type.Contains("beauty & skin care")) || (type.Contains("lotion")) || (type.Contains("cream")))
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type8_slider, type8_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type8_slider"].ToString();
                        Product_Image = reader["type8_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "♀️ The right place to take care of your skin 💁🏻";
                Product_Description = "grape leaves, Small dish";
                Product_Description = "Skin Care Set, Moisturizing Cream for Skin & Face";
            }
            else
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    SqlCommand cmd = new SqlCommand("SELECT type9_slider, type9_product FROM type_images WHERE id = '1'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Slider_Image = reader["type9_slider"].ToString();
                        Product_Image = reader["type9_product"].ToString();
                    }
                    con.Close();
                }
                Description_Text = "Competitive prices, great products ✨";
                Product_Description = "Multi-use, high-quality";
            }
        }
        int id = 1;

        if (language.Equals("English"))
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE Category SET Name = 'Category example' WHERE StoreEmail ='" + Session["user"] + "'", con);
                cmd.ExecuteNonQuery(); con.Close();
            }
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT ID FROM Category WHERE StoreEmail = '" + Session["user"] + "' AND Name = 'Category example'", con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    id = Convert.ToInt32(reader["ID"]);
                }
                con.Close();
            }
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO Product (Name, Price, Description, Category_ID, StoreEmail, Image, Amount) values('product example', 50, N'" + Product_Description + "', "+id+", '" + Session["user"] + "', '" + Product_Image + "', 1)", con);
                cmd.ExecuteNonQuery(); con.Close();
            }
        }
        else
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("UPDATE Category SET Name = N'" + "تصنيف مؤقت" + "' WHERE StoreEmail = '" + Session["user"] + "'", con);
                cmd.ExecuteNonQuery(); con.Close();
            }
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT ID FROM Category WHERE StoreEmail = '" + Session["user"] + "' AND Name = N'" + "تصنيف مؤقت" + "'", con);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    id = Convert.ToInt32(reader["ID"]);
                }
                con.Close();
            }
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT INTO Product (Name, Price, Description, Category_ID, StoreEmail, Image, Amount) values(N'" + "مثال على منتج" + "', 50, N'" + Product_Description + "',"+id+", '" + Session["user"] + "', '" + Product_Image + "', 1)", con);
                cmd.ExecuteNonQuery(); con.Close();
            }
        }
            using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreType = N'" + type + "', StoreDescription = N'"+ Description_Text +"' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            //Slider Element
            con.Open();
            cmd = new SqlCommand("UPDATE Element SET Hidden = 'false', Image = '" + Slider_Image + "' WHERE NAME = 'Slider' AND Type = 'Slider' AND StoreEmail = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            //About Element
            con.Open();
            cmd = new SqlCommand("UPDATE Element SET Value = N'"+ Description_Text +"', Hidden = 'false' WHERE NAME = 'About' AND Type = 'About' AND StoreEmail = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.SliderImage = Slider_Image;
            store.Description = Description_Text;
            store.Type = type;

            Context.Response.Write(js.Serialize(store));

 //           return store;
        }
    }

    [WebMethod(EnableSession = true)]
    public void ConnectInstagram(string link, string logo, string description, string name)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName = N'" + name + "', logo = '"+ logo + "', Location = N'"+ description + "' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            con.Open();
            cmd = new SqlCommand("UPDATE Element SET Value = '" + link + "', Hidden = 'false' WHERE Type = 'Link' AND Name = 'Instagram' AND StoreEmail = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            con.Open();
            cmd = new SqlCommand("UPDATE Element SET Value = N'" + description + "', Hidden = 'false' WHERE Type = 'About' AND Name = 'About' AND StoreEmail = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();

            store.Name = name;
            store.InstagramLink = link;
            store.Logo = logo;
            store.Address = description;
            con.Close();
        }

        Context.Response.Write(js.Serialize(store));

        //return store;
    }

    [WebMethod(EnableSession = true)]
    public void AddTemplate(int id)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET TemplateID = " + id + " WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.TemplateID = id;
        }
    }

    [WebMethod(EnableSession = true)]
    public void GetTemplateID()
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT TemplateID FROM Store WHERE Email='" + Session["user"] + "'", con);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.TemplateID = Convert.ToInt32(reader["TemplateID"]);
            }
        }

        Context.Response.Write(js.Serialize(store));

        //return store;
    }

    [WebMethod(EnableSession = true)]
    public void GetColors()
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT Color1, Color2, Color3, Color4 FROM Store WHERE Email='" + Session["user"] + "'", con);
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
//        return store;
    }

    [WebMethod(EnableSession = true)]
    public void UpdateColors(string color1, string color2, string color3, string color4)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET Color1 = '" + color1 + "', Color2 = '"+ color2 +"', Color3 = '"+ color3 +"', Color4 = '"+ color4 +"' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Color1 = color1;
            store.Color2 = color2;
            store.Color3 = color3;
            store.Color4 = color4;

            Context.Response.Write(js.Serialize(store));

          //  return store;
        }
    }

    [WebMethod(EnableSession = true)]
    public void UpdateData(string address, string snapchat_link, string twitter_link, string facebook_link, string instagram_link)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET Location = N'" + address + "' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Address = address;
            store.SnapchatLink = snapchat_link;
            store.TwitterLink = twitter_link;
            store.FacebookLink = facebook_link;
            store.InstagramLink = instagram_link;
        
            con.Open();
            //Link Elements

            //Snapchat Link
            Element element = new Element();
            if (store.SnapchatLink != null)
            {
                if (store.SnapchatLink.ToLower().Contains("https://www.snapchat.com/add/"))
                {
                    element.Hidden = false;
                    element.Value = store.SnapchatLink;
                }
                else
                {
                    element.Hidden = true;
                    element.Value = "No Value";
                }
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
            }

            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden = '" + element.Hidden + "' WHERE NAME = 'Snapchat' AND Type = 'Link' AND StoreEmail = '"+ Session["user"] +"'", con);
            cmd.ExecuteNonQuery();


            //Twitter Link
            element = new Element();
            if (store.TwitterLink != null)
            {
                if (store.TwitterLink.ToLower().Contains("https://twitter.com/"))
                {
                    element.Hidden = false;
                    element.Value = store.TwitterLink;
                }
                else
                {
                    element.Hidden = true;
                    element.Value = "No Value";
                }
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
            }

            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden = '" + element.Hidden + "' WHERE NAME = 'Twitter' AND Type = 'Link' AND StoreEmail = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();


            //Facebook Link
            element = new Element();
            if (store.FacebookLink != null)
            {
                if (store.FacebookLink.ToLower().Contains("https://www.facebook.com/"))
                {
                    element.Hidden = false;
                    element.Value = store.FacebookLink;
                }
                else
                {
                    element.Hidden = true;
                    element.Value = "No Value";
                }
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
            }

            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden = '" + element.Hidden + "' WHERE NAME = 'Facebook' AND Type = 'Link' AND StoreEmail = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();


            //Instagram Link
            element = new Element();
            if (store.InstagramLink != null)
            {
                if (store.InstagramLink.ToLower().Contains("https://www.instagram.com/"))
                {
                    element.Hidden = false;
                    element.Value = store.InstagramLink;
                }
                else
                {
                    element.Hidden = true;
                    element.Value = "No Value";
                }
            }
            else
            {
                element.Hidden = true;
                element.Value = "No Value";
            }

            ElementsList.Add(element);
            cmd = new SqlCommand("UPDATE Element SET Value = '" + element.Value + "', Hidden = '" + element.Hidden + "' WHERE NAME = 'Instagram' AND Type = 'Link' AND StoreEmail = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();

            Context.Response.Write(js.Serialize(store));

           // return store;
        }
    }

    [WebMethod(EnableSession = true)]
    public void UploadLogo(string logo)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET logo = '" + logo +"' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Logo = logo;

            Context.Response.Write(js.Serialize(store));

            //return store;
        }
    }

    [WebMethod(EnableSession = true)]
    public void UpdateType(string type, string language)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreType = N'" + type + "' WHERE Email='" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();

            store.Type = type;

            Context.Response.Write(js.Serialize(store));

//            return store;
        }
    }



   /* [WebMethod]
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
            //  SqlCommand cmd = new SqlCommand("UPDATE Store SET SliderImage =  CONVERT(varbinary,'" + image.SliderImage + "') Where Email = 'asmaa.alrubia@gmail.com'", con);
            // SqlCommand cmd = new SqlCommand("UPDATE Store SET logo = '" + tryMe + "', SliderImage = "+ theBytes + " Where Email = 'asmaa@mail.com'", con);
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
            //   SqlCommand cmd = new SqlCommand("SELECT CONVERT(varchar(max), SliderImage, 2) FROM Store Where Email = 'asmaa.alrubia@gmail.com'", con);
            //  SqlCommand cmd = new SqlCommand("SELECT cast(SliderImage as varchar(max)) FROM Store Where Email = 'asmaa.alrubia@gmail.com'", con);
            SqlCommand cmd = new SqlCommand("SELECT type9_slider FROM type_images Where id = '1'", con);


            SqlDataReader reader = cmd.ExecuteReader();
           // theBytes = (byte[])reader.GetValue(0);
            while (reader.Read())
            {
                //  theBytes = (byte[]) reader["SliderImage"];
              //   theString = Encoding.UTF8.GetString(theBytes);
            store.Logo = reader["type9_slider"].ToString();

          //  store.SliderImage = theString;

           }
            con.Close();

            Context.Response.Write(js.Serialize(store));
        }
    }*/
}