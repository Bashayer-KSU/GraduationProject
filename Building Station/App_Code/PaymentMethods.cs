using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for PaymentMethods
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]

public class PaymentMethods : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id=BS-Database.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BS-Database.mssql.somee.com;persist security info=False;initial catalog=BS-Database";

    JavaScriptSerializer js = new JavaScriptSerializer();

    private Payments payments;


    public PaymentMethods()
    {
         payments = new Payments();
    }

    [WebMethod(EnableSession = true)]
    public void AcceptPaymentMethods(Boolean paypal, Boolean bankTransfer, Boolean cash )
    {

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET PayPal = '" + paypal + "', BankTransfer = '"+ bankTransfer + "', Cash = '" + cash + "' Where Email = '"+Session["user"]+"'", con);

            cmd.ExecuteNonQuery();
            con.Close();
            payments.Paypal = paypal;
            payments.BankTransfer = bankTransfer;
            payments.Cash = cash;

            Context.Response.Write(js.Serialize(payments));

            // return payments;

        }
    }

    [WebMethod(EnableSession = true)]
    public void GetPaymentMethods()
    {
        if (Session["user"] != null)
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT PayPal,BankTransfer,Cash FROM Store Where Email = '" + Session["user"] + "'", con);
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    payments.Paypal = Convert.ToBoolean(reader["PayPal"].ToString());
                    payments.BankTransfer = Convert.ToBoolean(reader["BankTransfer"].ToString());
                    payments.Cash = Convert.ToBoolean(reader["Cash"].ToString());

                }
                con.Close();
                Context.Response.Write(js.Serialize(payments));
                //return payments;
            }
        }
        else 
        Context.Response.Write(js.Serialize(null));
       // return null;
    }

    [WebMethod(EnableSession = true)]
    public void UpdateBankInfo(String IBAN)
    {
        int success = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET ShopOwnerBank = '" + IBAN + "' Where Email = '" + Session["user"] + "'", con);
            success = cmd.ExecuteNonQuery();
            con.Close();
        }

        if (success != 0)
            Context.Response.Write(js.Serialize(IBAN));
    }

    [WebMethod(EnableSession = true)]
    public void GetBankInfo()
    {
        if (Session["user"] != null)
        {
            string IBAN = "";
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("SELECT ShopOwnerBank FROM Store Where Email = '" + Session["user"] + "'", con);
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    IBAN = Convert.ToString(reader["ShopOwnerBank"]);
                }
                con.Close();
                Context.Response.Write(js.Serialize(IBAN));
                //return IBAN;
            }
        }
        else
        Context.Response.Write(js.Serialize(""));
        //return "";
    }

    [WebMethod(EnableSession = true)]
    public void GetPayPalInfo()
    {
        // var PayPalButton = "";
         using (SqlConnection con = new SqlConnection(cs))
         {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT Value FROM Element Where StoreEmail = '" + Session["user"] + "' AND Type = 'Currency' AND Name = 'PayPal'", con);
            SqlDataReader reader = cmd.ExecuteReader();
            while(reader.Read()) 
            {
                 payments.PayPalCurrencey = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element Where StoreEmail = '" + Session["user"] + "' AND Type = 'AccountEmail' AND Name = 'PayPal'", con);
            reader = cmd.ExecuteReader();
            while(reader.Read())
            {
                 payments.PayPalEmail = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();
         }

        /* using (var conn = new SqlConnection(cs))
         using (var cmd = conn.CreateCommand())
         {
             cmd.CommandText = "SELECT Value FROM Element Where StoreEmail = @User AND Type = 'Currency' AND Name = 'PayPal'";
             cmd.Parameters.AddWithValue("@User", Session["user"]);
             conn.Open();
             using (SqlDataReader oReader = cmd.ExecuteReader())
             {
                 while (oReader.Read())
                 {
                     payments.PayPalCurrencey = oReader["Value"].ToString();
                 }
                 conn.Close();
             }

             cmd.CommandText = "SELECT Value FROM Element Where StoreEmail = @User2 AND Type = 'AccountEmail' AND Name = 'PayPal'";
             cmd.Parameters.AddWithValue("@User2", Session["user"]);
             conn.Open();
             using (SqlDataReader oReader = cmd.ExecuteReader())
             {
                 while (oReader.Read())
                 {
                     payments.PayPalEmail = oReader["Value"].ToString();
                 }
                 conn.Close();
             }
         }*/
        Context.Response.Write(js.Serialize(payments));

        //return payments;
    }

    [WebMethod(EnableSession = true)]
    public void UpdatePayPalInfo(string email, string currency)
    {
        /*   using (SqlConnection con = new SqlConnection(cs))
           {
               con.Open();
               SqlCommand cmd = new SqlCommand("UPDATE Element SET Value = '" + button + "' Where StoreEmail = '" + Session["user"] + "' AND Type = 'Button' AND Name = 'PayPal'", con);
               cmd.ExecuteNonQuery();
               con.Close();

               Context.Response.Write(js.Serialize(button));
           }*/
        int success = 0;
        using (var conn = new SqlConnection(cs))
        using (var cmd = conn.CreateCommand())
        {
            conn.Open();
            cmd.CommandText = "UPDATE Element SET Value = @Value Where StoreEmail = '" + Session["user"] + "' AND Type = 'AccountEmail' AND Name = 'PayPal'";
            cmd.Parameters.AddWithValue("@Value", email);
            success = cmd.ExecuteNonQuery();
            conn.Close();
            if (success != 0)
            {
                conn.Open();
                cmd.CommandText = "UPDATE Element SET Value = @Value2 Where StoreEmail = '" + Session["user"] + "' AND Type = 'Currency' AND Name = 'PayPal'";
                cmd.Parameters.AddWithValue("@Value2", currency);
                success = cmd.ExecuteNonQuery();
                conn.Close();
            }
        }
        if (success != 0)
            Context.Response.Write(js.Serialize(true));
        else Context.Response.Write(js.Serialize(false));

    }
}
