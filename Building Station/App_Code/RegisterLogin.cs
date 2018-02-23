using System;
using System.Configuration;
using System.Data.SqlClient;
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


    [WebMethod]
    public void Register(String name, String email, String password, String phone)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();


        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM Store WHERE Email='" + email + "'", con);
            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.HasRows == true)
            {
                con.Close();
                Context.Response.Write(js.Serialize(false));
            }
            else
            {

                cmd = new SqlCommand("insert into Store (ShopOwnerName, Email, Password, Phone) values " +
                   "(N'" + name + "','" + email + "','" + password + "','" + phone + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                Store store = new Store();
                store.ShopOwner = name;
                store.Email = email;
                store.Password = password;
                store.Phone = phone;

                Context.Response.Write(js.Serialize(store));

            }
        }
    }
    [WebMethod]
    public void Login(String name, String password)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();


        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM Store WHERE Name='" + name + "' AND Password='" + password + "'", con);
            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.HasRows == true)
            {
                con.Close();
                Context.Response.Write(js.Serialize(true));

            }
            else
            {
                Context.Response.Write(js.Serialize(false));
            }
        }
    }
}
