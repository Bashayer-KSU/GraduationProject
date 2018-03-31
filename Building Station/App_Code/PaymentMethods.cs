﻿using System;
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
    //string cs = "workstation id=BuildingStation4.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BuildingStation4.mssql.somee.com;persist security info=False;initial catalog=BuildingStation4";

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

            }
        }
    }


    [WebMethod(EnableSession = true)]
    public void UpdateBankInfo(String IBAN)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET ShopOwnerBank = '" + IBAN + "' Where Email = '" + Session["user"] + "'", con);

            cmd.ExecuteNonQuery();
            con.Close();

            Context.Response.Write(js.Serialize(IBAN));
        }
    }

    [WebMethod(EnableSession = true)]
    public void GetBankInfo()
    {
        if (Session["user"] != null)
        {
            var IBAN = "";
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

            }
        }
    }

    [WebMethod(EnableSession = true)]
    public void GetPayPalInfo()
    {
        // var PayPalButton = "";

       /* using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT Value FROM Element Where StoreEmail = '" + Session["user"] + "' AND Type = 'Button' AND Name = 'PayPal'", con);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                reader.Read();
                PayPalButton = reader["Value"].ToString();
            }
            con.Close();

            Context.Response.Write(js.Serialize(PayPalButton));
        }*/

        using (var conn = new SqlConnection(cs))
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
        }
        Context.Response.Write(js.Serialize(payments));
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
        using (var conn = new SqlConnection(cs))
        using (var cmd = conn.CreateCommand())
        {
            conn.Open();
            cmd.CommandText = "UPDATE Element SET Value = @Value Where StoreEmail = '" + Session["user"] + "' AND Type = 'AccountEmail' AND Name = 'PayPal'";
            cmd.Parameters.AddWithValue("@Value", email);
            cmd.ExecuteNonQuery();
            conn.Close();

            conn.Open();
            cmd.CommandText = "UPDATE Element SET Value = @Value2 Where StoreEmail = '" + Session["user"] + "' AND Type = 'Currency' AND Name = 'PayPal'";
            cmd.Parameters.AddWithValue("@Value2", currency);
            cmd.ExecuteNonQuery();
            conn.Close();
        }
    }
}
