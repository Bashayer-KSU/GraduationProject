using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
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
    List<Order> OrdersList = new List<Order>();

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
    public void CreateOrder(string BuyerName, string BuyerPhone, string BuyerEmail, string BuyerLocation,string PaymentMethod, string BankAccount, string OrderID, string TotalPrice)
    {
        string StoreEmail = getStoreEmail();
        //double TotalPrice = getTotalPrice();
        int row = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd;
            if (PaymentMethod == "BankTransfer") 
             cmd = new SqlCommand("insert into \"Order\" (BuyerName, BuyerPhone, BuyerEmail, BuyerLocation, PaymentMethod, BankAccount , TotalPrice, OrderID, Status , StoreEmail) values " +
               "(N'" + BuyerName + "','" + BuyerPhone + "','" + BuyerEmail + "', N'" + BuyerLocation + "','" + PaymentMethod + "','" + BankAccount + "','" + Convert.ToDouble(TotalPrice) + "','" + OrderID + "','" + false + "','" + StoreEmail + "')", con);
            else
                cmd = new SqlCommand("insert into \"Order\" (BuyerName, BuyerPhone, BuyerEmail, BuyerLocation, PaymentMethod , TotalPrice, OrderID, Status , StoreEmail) values " +
               "(N'" + BuyerName + "','" + BuyerPhone + "','" + BuyerEmail + "', N'" + BuyerLocation + "','" + PaymentMethod + "','" + Convert.ToDouble(TotalPrice) + "','" + OrderID + "','" + false + "','" + StoreEmail + "')", con);

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
            if (PaymentMethod == "BankTransfer")
                order.BankAccount = BankAccount;
            order.TotalPrice = Convert.ToDouble(TotalPrice);
            order.StoreEmail = StoreEmail;
            order.OrderID = OrderID;
            Context.Response.Write(js.Serialize(order));

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

    [WebMethod(EnableSession = true)]
    public void GetAllTransactions()
    {
        string StoreEmail = getStoreEmail();
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select * from \"Order\" Where StoreEmail ='" + Session["user"] + "' AND Status = 'FALSE'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                order = new Order();
                order.ID = Convert.ToInt32(reader["ID"]);
                order.BuyerName = reader["BuyerName"].ToString();
                order.BuyerPhone = reader["BuyerPhone"].ToString();
                order.BuyerEmail = reader["BuyerEmail"].ToString();
                order.BuyerLocation = reader["BuyerLocation"].ToString();
                order.PaymentMethod = reader["PaymentMethod"].ToString();
                order.BankAccount = reader["BankAccount"].ToString();
                order.OrderID = reader["OrderID"].ToString();
                if (order.PaymentMethod != "BankTransfer")
                {
                    order.BankAccount = "";
                    order.OrderID = "";
                }
                order.Status = Convert.ToBoolean(reader["Status"]);
                OrdersList.Add(order);
            }
        }

        Context.Response.Write(js.Serialize(OrdersList));
    }

    [WebMethod(EnableSession = true)]
    public void UpdateStatus (string ID)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("UPDATE \"Order\" SET Status = 'TRUE' Where StoreEmail='" + Session["user"] + "' AND ID = '" + ID + "'", con);
            con.Open();
            int x = cmd.ExecuteNonQuery();
            if (x != 0)
                Context.Response.Write(js.Serialize(true));
            else Context.Response.Write(js.Serialize(false));
        }
    }

    }
