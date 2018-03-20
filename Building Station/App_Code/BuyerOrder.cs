using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for BuyerOrder
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]


public class BuyerOrder : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    JavaScriptSerializer js = new JavaScriptSerializer();
    Order order = new Order();
    public BuyerOrder()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }
    [WebMethod(EnableSession = true)]
    public string getStoreEmail()
    {
        if (Session["user"] != null)
            return Session["user"].ToString();
        else
            return "test4@4";
    }
    [WebMethod(EnableSession = true)]
    public double getTotalPrice()
    {
        return 44.4;
    }
    [WebMethod(EnableSession = true)]
    public void CreateOrder(string BuyerName, string BuyerPhone, string BuyerEmail, string BuyerLocation,string PaymentMethod, string BankAccount)
    {
        string StoreEmail = getStoreEmail();
        double TotalPrice = getTotalPrice();
        int row = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("insert into Order (BuyerName, BuyerPhone, BuyerEmail, BuyerLocation, PaymentMethod, BankAccount , TotalPrice, ShopEmail) values " +
               "(N'" + BuyerName + "','" + BuyerPhone + "','" + BuyerEmail + "', N'" + BuyerLocation + "','" + PaymentMethod + "','" + BankAccount + "','" + TotalPrice + "','" + StoreEmail + "')", con);
            row = cmd.ExecuteNonQuery();
            con.Close();
        }
        if (row > 0)
        {
            order.BuyerName = BuyerName;
            order.BuyerPhone = BuyerPhone;
            order.BuyerEmail = BuyerEmail;
            order.BuyerLocation = BuyerLocation;
            order.PaymentMethod = PaymentMethod;
            order.BankAccount = BankAccount;
            order.TotalPrice = TotalPrice;
            order.StoreEmail = StoreEmail;
            Context.Response.Write(js.Serialize("Order Added Successfully"));

        }
        else
            Context.Response.Write(js.Serialize("Failed to make order"));
    }

    [WebMethod(EnableSession = true)]
    public void CreateOrderWithShipmentMethod(string BuyerName, string BuyerPhone, string BuyerEmail, string BuyerLocation, string TotalPrice, string PaymentMethod, string BankAccount, string ShipmentMethod, string ShopEmail)
    {
        Context.Response.Write(js.Serialize("Order Added Successfully"));
        Context.Response.Write(js.Serialize("Failed to make order"));
    }

}
