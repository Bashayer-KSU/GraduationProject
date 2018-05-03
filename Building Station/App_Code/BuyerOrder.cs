using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
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
    //string cs = "workstation id=BS-Database.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BS-Database.mssql.somee.com;persist security info=False;initial catalog=BS-Database";

    JavaScriptSerializer js = new JavaScriptSerializer();

    List<Order> OrdersList = new List<Order>();
    Order order = new Order();

    [WebMethod(EnableSession = true)]
    public string getStoreEmail()
    {
        if (Session["user"] != null)
         return Session["user"].ToString();
        else
         return "test4@4";
    }

    [WebMethod(EnableSession = true)]
    public void CreateOrder(string StoreEmail, string BuyerName, string BuyerPhone, string BuyerEmail, string BuyerLocation, string PaymentMethod, string BankAccount, string OrderID, string TotalPrice)
    {
        SqlDataReader reader;
       // string StoreEmail = getStoreEmail();
        //double TotalPrice = getTotalPrice();
        int row = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd;
            if (PaymentMethod == "BankTransfer")
                cmd = new SqlCommand("insert into \"Order\" (BuyerName, BuyerPhone, BuyerEmail, BuyerLocation, PaymentMethod, BankAccount , TotalPrice, OrderID, Status , StoreEmail) values " +
                  "(N'" + BuyerName + "','" + BuyerPhone + "','" + BuyerEmail + "', N'" + BuyerLocation + "','" + PaymentMethod + "', N'" + BankAccount + "','" + Convert.ToDouble(TotalPrice) + "','" + OrderID + "','" + false + "','" + StoreEmail + "')", con);
            else
                cmd = new SqlCommand("insert into \"Order\" (BuyerName, BuyerPhone, BuyerEmail, BuyerLocation, PaymentMethod , TotalPrice, OrderID, Status , StoreEmail) values " +
               "(N'" + BuyerName + "','" + BuyerPhone + "','" + BuyerEmail + "', N'" + BuyerLocation + "','" + PaymentMethod + "','" + Convert.ToDouble(TotalPrice) + "','" + OrderID + "','" + false + "','" + StoreEmail + "')", con);

            row = cmd.ExecuteNonQuery();
            con.Close();
        }

        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select ID from \"Order\" Where StoreEmail ='" + StoreEmail + "' AND BuyerName = '" + BuyerName + "' AND BuyerPhone = '" + BuyerPhone + "' AND BuyerEmail = '" + BuyerEmail + "' AND BuyerLocation = '" + BuyerLocation + "' AND PaymentMethod = '" + PaymentMethod + "' AND TotalPrice = '" + Convert.ToDouble(TotalPrice) + "' AND OrderID = '" + OrderID + "' AND Status = '" + false + "'", con);
            con.Open();
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                order.ID = Convert.ToInt32(reader["ID"]);
            }
        }

        if (row > 0)
        {
            order.BuyerName = BuyerName;
            order.BuyerPhone = BuyerPhone;
            order.BuyerEmail = BuyerEmail;
            order.BuyerLocation = BuyerLocation;
            order.PaymentMethod = PaymentMethod;
            order.BankAccount = BankAccount;
            order.TotalPrice = Convert.ToDouble(TotalPrice);
            order.StoreEmail = StoreEmail;
            order.OrderID = OrderID;

            Context.Response.Write(js.Serialize(order));
          //  return order;

        }
        else
            Context.Response.Write(js.Serialize(null));
        //return null;

            //return "Failed to make order";
    }

    [WebMethod(EnableSession = true)]
    public void GetAllTransactions()
    { // List<Order>
        Order ord = new Order();
        string StoreEmail = getStoreEmail();
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select * from \"Order\" Where StoreEmail ='" + Session["user"] + "' AND Status = 'FALSE'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                ord = new Order();
                ord.ID = Convert.ToInt32(reader["ID"]);
                ord.BuyerName = reader["BuyerName"].ToString();
                ord.BuyerPhone = reader["BuyerPhone"].ToString();
                ord.BuyerEmail = reader["BuyerEmail"].ToString();
                ord.BuyerLocation = reader["BuyerLocation"].ToString();
                ord.TotalPrice = Convert.ToDouble(reader["TotalPrice"]);
                ord.PaymentMethod = reader["PaymentMethod"].ToString();
                ord.BankAccount = reader["BankAccount"].ToString();
                ord.OrderID = reader["OrderID"].ToString();
                if (ord.PaymentMethod == "Cash")
                {
                    ord.BankAccount = "";
                    ord.OrderID = "";
                }
                if (ord.PaymentMethod == "PayPal")
                    ord.BankAccount = "";
                
                ord.Status = Convert.ToBoolean(reader["Status"]);
                OrdersList.Add(ord);
            }
        }

        Context.Response.Write(js.Serialize(OrdersList));

//        return OrdersList;
    }

    [WebMethod(EnableSession = true)]
    public void UpdateStatus(string ID)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("UPDATE \"Order\" SET Status = 'TRUE' Where StoreEmail='" + Session["user"] + "' AND ID = '" + ID + "'", con);
            con.Open();
            int x = cmd.ExecuteNonQuery();
            if (x != 0)
                Context.Response.Write(js.Serialize(true));

           // return true;
            else
                Context.Response.Write(js.Serialize(false));
            //return false;
        }
    }

    [WebMethod(EnableSession = true)]
    public void AddProductToOrder(string OrderID, string ProductID, string Amount, string PreviousAmount)
    {
        string StoreEmail = getStoreEmail();
        int row = 0;
        bool result1 = false;
        bool result2 = false;
        bool error = false;
        if ((Convert.ToInt32(PreviousAmount) - Convert.ToInt32(Amount)) < 0)
            error = true;

        if (!error) { 
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd;
            cmd = new SqlCommand("insert into ProductOrder (Order_ID, Product_ID, Amount) values " +
           "(" + Convert.ToInt32(OrderID) + "," + Convert.ToInt32(ProductID) + "," + Convert.ToInt32(Amount) + ")", con);

            row = cmd.ExecuteNonQuery();
            con.Close();
        }
        if (row > 0)
            result1 = true;
        else result1 = false;

        row = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd;
            cmd = new SqlCommand("UPDATE Product SET Amount = '" + (Convert.ToInt32(PreviousAmount) - Convert.ToInt32(Amount)) + "' WHERE ID =" + ProductID, con);

            row = cmd.ExecuteNonQuery();
            con.Close();
        }
        if (row > 0)
            result2 = true;
        else result2 = false;

            if (result1 && result2)
            {
                Context.Response.Write(js.Serialize("true"));

                //      return "true";
            }
            else
            {
                Context.Response.Write(js.Serialize("false"));

                //return "false";
            }
    }

        else
            Context.Response.Write(js.Serialize("out of stock product"));
   //     return "out of stock product";
    }


    [WebMethod(EnableSession = true)]
    public void GetAllOrderProducts(string Order_ID)
    { // List<OrderProduct>
        int orderID = Convert.ToInt32(Order_ID);
        List<OrderProduct> OrderProductsList = new List<OrderProduct>();
        OrderProduct orderProduct = new OrderProduct();

        string StoreEmail = getStoreEmail();
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Order_ID, Product_ID, ProductOrder.Amount,  Product.Image, Product.Name,  Product.Description  FROM ProductOrder INNER JOIN Product ON ProductOrder.Product_ID = Product.ID WHERE ProductOrder.Order_ID = " + orderID+" ", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                orderProduct = new OrderProduct();
                orderProduct.OrderID = orderID;
                orderProduct.ProductID = Convert.ToInt32(reader["Product_ID"]);
                orderProduct.Amount = Convert.ToInt32(reader["Amount"]);
                orderProduct.Image = reader["Image"].ToString();
                orderProduct.Name = reader["Name"].ToString();
                orderProduct.Description = reader["Description"].ToString();
                OrderProductsList.Add(orderProduct);
            }
            con.Close();
        }
        Context.Response.Write(js.Serialize(OrderProductsList));

        //return OrderProductsList;
    }
    

         [WebMethod(EnableSession = true)]
    public void IsProductOutOfStock( string ProductID, string Amount)
    {
        int buyerAmount = Convert.ToInt32(Amount);
        Products products = new Products();
        Product product = products.GetProduct(Convert.ToInt32(ProductID));
        
            Context.Response.Write(js.Serialize(product.Amount - buyerAmount));
        
    }
}
