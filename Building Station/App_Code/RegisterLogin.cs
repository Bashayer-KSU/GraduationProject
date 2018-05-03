using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for RegisterLogin
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RegisterLogin : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id=BS-Database.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BS-Database.mssql.somee.com;persist security info=False;initial catalog=BS-Database";

    JavaScriptSerializer js = new JavaScriptSerializer();

    [WebMethod(EnableSession = true)]
    public void Register(string name, string email, string password, string phone, string lang)
    {
        string value = "";
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM Store WHERE Email='" + email + "'", con);
            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.HasRows == true)
            {
                con.Close();
                value = "/index.html";
            }
            else
            {
                dr.Close();
                cmd = new SqlCommand("insert into Store (ShopOwnerName, Email, Password, Phone) values " +
                   "(N'" + name + "','" + email + "','" + password + "','" + phone + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                Store store = new Store();
                store.ShopOwner = name;
                store.Email = email;
                store.Password = password;
                store.Phone = phone;
                Session["user"] = email;
                //Context.Response.Write(js.Serialize(Session["user"].ToString()));

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Snapchat', 'Link','" + Session["user"] + "','" + true + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Twitter', 'Link','" + Session["user"] + "','" + true + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Facebook', 'Link','" + Session["user"] + "','" + true + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Instagram', 'Link','" + Session["user"] + "','" + true + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Slider', 'Slider','" + Session["user"] + "','" + false + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('About', 'About','" + Session["user"] + "','" + false + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail) values " +
                "('PayPal', 'AccountEmail','" + Session["user"] + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail) values " +
                "('PayPal', 'Currency','" + Session["user"] + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail) values " +
                "('BankTransfer', 'BankName','" + Session["user"] + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail) values " +
                "('BankTransfer', 'AccountName','" + Session["user"] + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail) values " +
                "('BankTransfer', 'IBAN','" + Session["user"] + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("INSERT INTO Category (StoreEmail, Name, OrderInMenu) values('" +
                    Session["user"] + "', 'Category example', 1)", con);
                cmd.ExecuteNonQuery();
                con.Close();

                if (lang.Equals("eng"))
                {
                    value = "/CreationStage.html";
                }
                else if (lang.Equals("ar"))
                {
                    value = "/CreationSatgeArabic.html";
                }
            }
        }
        Context.Response.Write(js.Serialize(value));

        //   return value;
    }

    [WebMethod(EnableSession = true)]
    public void Login(string email, string password, string lang)
    {
        string value = "";
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM Store WHERE Email='" + email + "' AND Password='" + password + "'", con);
            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.HasRows == true)
            {
                Session["user"] = email;
                dr.Read();
                if (Convert.ToInt32(dr["TemplateID"]) == 0) //If user not start building template yet
                {
                    con.Close();

                    if (lang.Equals("eng"))
                    {
                        value = "/CreationStage.html";
                    }
                    else
                    {
                        value = "/CreationSatgeArabic.html";
                    }
                }
                else //If user already has template 
                {
                    if (lang.Equals("eng"))
                    {
                        //  value = "/Views/BasicE.html";
                        value = "/EDITandINFO-English";

                    }
                    else
                    {
                        // value = "/Views/Basic.html";
                        value = "/EDITandINFO";
                    }
                }
            }

            //Invalid login
            else
            {
                value = "/index.html";
            }
        }
        Context.Response.Write(js.Serialize(value));

        //return value;
    }

    [WebMethod(EnableSession = true)]
    public void CheckUser()
    {
        if (Session["user"] == null)
        {
            Context.Response.Write(js.Serialize("false"));

            //       return "false";
        }
        else
        {
            Context.Response.Write(js.Serialize("true"));

            //return "true";
        }
    }


    [WebMethod(EnableSession = true)]
    public void SignOut()
    {
        // Session.Clear();
        Session.Abandon();
        Context.Response.Write(js.Serialize("/BuildingStation"));

        //  return "/index.html";
    }
}