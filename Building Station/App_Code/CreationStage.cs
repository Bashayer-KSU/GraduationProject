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
    public void StoreType_Arabic(string type)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        string[] Type4 = { "حلويات", "كيك" };

        string[] Type6 = { "مخبز", "مخبوزات", "معجنات" };


        for (int i = 1; i < 8; i++) {


            if ((type.Contains("أشغال يدوية")) || (type.Contains("أعمال يدوية")) || (type.Contains("كروشيه")) || (type.Contains("صوف")) || (type.Contains("تريكو")) || (type.Contains("حياكة")))
                {

                using (SqlConnection con = new SqlConnection(cs))
                {   con.Open();
                    SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName ='' Where ID = 2", con);

                    cmd.ExecuteNonQuery();
                    con.Close();
                    store.SliderImage = "";
                    store.StoreText = "";
                    Context.Response.Write(js.Serialize(store));
                }
            }

            else if ((type.Contains("ساعات")) || (type.Contains("اكسسوار")) || (type.Contains("اكسسوارات")))
            {

            }

            else if ((type.Contains("موضة")) || (type.Contains("موضة وملابس")) || (type.Contains("ملابس")) || (type.Contains("فساتين")))
            {

            }

            else if ((type.Contains("أغطية جوال")) || (type.Contains("اكسسوارات جوال ولابتوب")) || (type.Contains("حقائب لابتوب")))
            {

            }

            else if ((type.Contains("طبخ")) || (type.Contains("طبخ منزلي")) || (type.Contains("ورق عنب")) || (type.Contains("محاشي")) || (type.Contains("أطعمة شرقية")) || (type.Contains("طعام")))
            {

            }

            else if ((type.Contains("جمال")) || (type.Contains("عناية")) || (type.Contains("مكياج")) || (type.Contains("بشرة")) || (type.Contains("تجميل")) || (type.Contains("كريم")))
            {

            }
        }


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

           //  SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName ='" + n +"' Where ID = 2", con);
            //  SqlCommand cmd = new SqlCommand("insert into Store (ShopOwnerName, Email, Password, StoreName) values " +
            //  "('try','try@msn.com','12345678','" + n + "')", con);

            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName = N'" + name + "' Where ID = 2", con);

            cmd.ExecuteNonQuery();
            con.Close();
            store.Name = name;
            Context.Response.Write(js.Serialize(store));
        }
    }

    [WebMethod]
    public void AddStoreType(string type, string language)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            //  SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreName ='" + n +"' Where ID = 2", con);
            //  SqlCommand cmd = new SqlCommand("insert into Store (ShopOwnerName, Email, Password, StoreName) values " +
            //  "('try','try@msn.com','12345678','" + n + "')", con);

            SqlCommand cmd = new SqlCommand("UPDATE Store SET StoreType = N'" + type + "' Where ID = 2", con);

            cmd.ExecuteNonQuery();
            con.Close();
            store.Type = type;
            Context.Response.Write(js.Serialize(store));
        }

        if (language.Equals("Arabic"))
            StoreType_Arabic(type);
        else if (language.Equals("English"))
            StoreType(type);
    }

    [WebMethod]
    public void ConnectInstagram(string link, string logo, string descripton)
    {
    }
}