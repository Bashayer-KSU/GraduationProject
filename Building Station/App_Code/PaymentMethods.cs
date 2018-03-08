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
    public void UbdateBankInfo(String IBAN)
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
}
