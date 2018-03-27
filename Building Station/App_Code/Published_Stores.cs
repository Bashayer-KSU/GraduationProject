using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for Published_Stores
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Published_Stores : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    // string cs = "workstation id=BuildingStation4.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BuildingStation4.mssql.somee.com;persist security info=False;initial catalog=BuildingStation4";

    JavaScriptSerializer js = new JavaScriptSerializer();

    public Store store = new Store();
    public Product product = new Product();

    List<Element> ElementsList = new List<Element>();
    public Element e = new Element();

    public Published_Stores()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public void PublishRequest()
    {
        string domain = " ";
        string storeName = " ";
        bool mayExists = false;
        int addChange = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT StoreName FROM Store WHERE Email ='" + Session["user"] + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                storeName = reader["StoreName"].ToString();
            }
            con.Close();

           domain =  storeName.Replace(" ", String.Empty);

            do {
                mayExists = false;
                con.Open();
                cmd = new SqlCommand("SELECT WebsiteDomain FROM Store WHERE WebsiteDomain ='" + domain + "'", con);
                reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    domain = reader["WebsiteDomain"].ToString() + addChange;

                    addChange++;
                    mayExists = true;
                }
                con.Close();
            } while (mayExists);
            store.Domain = domain;
        }
        Context.Response.Write(js.Serialize(store));
    }

    [WebMethod(EnableSession = true)]
    public void Publish( string storeDomainName)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("UPDATE Store SET WebsiteDomain = N'" + storeDomainName + "', Published = 'true' Where Email = '" + Session["user"] + "'", con);
            cmd.ExecuteNonQuery();
            con.Close();
        }
    }

    [WebMethod]
    public void GetTemplate(string StoreDomain)
    {
        int TID = 0;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT TemplateID FROM Store WHERE WebsiteDomain='" + StoreDomain + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                TID = Convert.ToInt32(reader["TemplateID"]);
                store.TemplateID = Convert.ToInt32(reader["TemplateID"]);
            }
            con.Close();
        }
        //  HttpContext.Current.Response.Write(js.Serialize(store));
        Context.Response.Write(js.Serialize(TID));
    }

    [WebMethod]
    public void GetStore(string StoreDomain)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT Email, StoreName, StoreType, Color1, Color2, Color3, Color4, Phone, logo, MenuTitle, StoreDescription, Location, PayPal, BankTransfer, Cash, ShopOwnerBank FROM Store WHERE WebsiteDomain='" + StoreDomain + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.Email = reader["Email"].ToString();
                store.Name = reader["StoreName"].ToString();
                store.Type = reader["StoreType"].ToString();
                store.Color1 = reader["Color1"].ToString();
                store.Color2 = reader["Color2"].ToString();
                store.Color3 = reader["Color3"].ToString();
                store.Color4 = reader["Color4"].ToString();
                store.Phone = reader["Phone"].ToString();
                store.Logo = reader["logo"].ToString();
                store.menuTitle = reader["MenuTitle"].ToString();
                store.menuTitle = reader["MenuTitle"].ToString();
                store.Description = reader["StoreDescription"].ToString();
                store.Address = reader["Location"].ToString();
                store.PayPal = Convert.ToBoolean(reader["PayPal"]);
                store.BankTransfer = Convert.ToBoolean(reader["BankTransfer"]);
                store.Cash = Convert.ToBoolean(reader["Cash"]);
                store.BankAccount = reader["ShopOwnerBank"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Snapchat'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.SnapchatLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Twitter'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.TwitterLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Facebook'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.FacebookLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Instagram'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.InstagramLink = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Value FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'About'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.About = reader["Value"].ToString();
            }
            reader.Close();
            con.Close();

            con.Open();
            cmd = new SqlCommand("SELECT Image FROM Element WHERE StoreEmail='" + store.Email + "' AND Name = 'Slider'", con);
            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.SliderImage = reader["Image"].ToString();
            }
            reader.Close();
            con.Close();
        }
        Context.Response.Write(js.Serialize(store));
    }

    [WebMethod] //Temp for Asmaa
    public void GetProducts(string StoreDomain)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT Email FROM Store WHERE WebsiteDomain = '" + StoreDomain + "'", con);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.Email = reader["Email"].ToString();
            }
            reader.Close();
            con.Close();

            cmd = new SqlCommand("SELECT Name, Price, Description, Discount, Category_ID, StoreEmail, Image FROM Product WHERE StoreEmail = '" + store.Email + "'", con);
            con.Open();
             reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                product.Name = reader["Name"].ToString();
                product.Price = Convert.ToDouble(reader["Price"]);
                product.Description = reader["Description"].ToString();
                product.Discount = Convert.ToInt32(reader["Discount"]);
                product.Category_ID = reader["Category_ID"].ToString();
                product.StoreEmail = reader["StoreEmail"].ToString();
                product.Image = reader["Image"].ToString();
            }
        }
        Context.Response.Write(js.Serialize(product));
    }

    [WebMethod]
    public void GetElements(string StoreDomain)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT Email FROM Store WHERE WebsiteDomain = '" + StoreDomain + "'", con);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                store.Email = reader["Email"].ToString();
            }
            reader.Close();
            con.Close();

            cmd = new SqlCommand("select * from Element Where StoreEmail ='" + store.Email + "'", con);
            con.Open();
            reader = cmd.ExecuteReader();
            int colIndex;
            while (reader.Read())
            {
                e = new Element();
                e.Name = reader["Name"].ToString();
                e.Type = reader["Type"].ToString();
                colIndex = reader.GetOrdinal("Value");
                if (!reader.IsDBNull(colIndex))
                {
                    e.Value = reader["Value"].ToString();
                }
                colIndex = reader.GetOrdinal("Image");
                if (!reader.IsDBNull(colIndex))
                {
                    e.Image = reader["Image"].ToString();
                }
                e.Hidden = Convert.ToBoolean(reader["Hidden"]);
                e.StoreEmail = reader["StoreEmail"].ToString();
                ElementsList.Add(e);
            }
        }
        Context.Response.Write(js.Serialize(ElementsList));
    }

    [WebMethod]
    public void GetAllCategories()
    {
        List<Categories> categories = new List<Categories>();
        //insert selected colors to database
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("select * from Category where StoreEmail = '" + store.Email + "' ORDER BY OrderInMenu ASC", con);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Categories cat = new Categories();
                    cat.ID = Convert.ToInt32(reader["ID"]);
                    cat.Name = reader["Name"].ToString();
                    cat.OrderInMenu = Convert.ToInt32(reader["OrderInMenu"]);
                    categories.Add(cat);
                }
            }
        }
        //\insert selected colors to database
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(categories));
    }

    [WebMethod]
    public void GetAllProducts(string category)
    {
        List<Product> ProductsList = new List<Product>();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            int catID = getCategoryID(category);
            if (catID != -1)

            {
                using (SqlCommand check = new SqlCommand("select * from Product where Category_ID ='" + catID + "'", con))
                {

                    SqlDataReader reader = check.ExecuteReader();
                    while (reader.Read())
                    {
                        Product pro = new Product();
                        pro.ID = Convert.ToInt32(reader["Id"]);
                        pro.Name = reader["Name"].ToString();
                        pro.Price = Convert.ToDouble(reader["Price"]);
                        pro.Image = reader["Image"].ToString();
                        pro.Description = reader["Description"].ToString();
                        pro.Discount = Convert.ToInt32(reader["Discount"]);
                        pro.Category_ID = reader["Category_ID"].ToString();
                        pro.Amount = Convert.ToInt32(reader["Amount"]);
                        pro.StoreEmail = reader["StoreEmail"].ToString();
                        if (pro.Discount != 0)
                        {
                            double i = pro.Price * pro.Discount / 100;
                            i = pro.Price - i;
                            pro.PriceAfterDiscount = i;
                        }
                        else { pro.PriceAfterDiscount = pro.Price; }
                        ProductsList.Add(pro);
                    }
                }
            }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(ProductsList));
    }

    [WebMethod]
    public int getCategoryID(string category)
    {
        int id = -1;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("select ID from Category where Name = N'" + category + "' and StoreEmail = '" + Session["user"] + "'", con);
            SqlDataReader R = cmd.ExecuteReader();
            if (R.Read())
            {
                return Convert.ToInt32(R["ID"]);
            }
        }
        return id;
    }

    [WebMethod]
    public void AddProductToOrder(string OrderID, string ProductID, string Amount, string PreviousAmount)
    {
      //  string StoreEmail = getStoreEmail();
        int row = 0;
        bool result1 = false;
        bool result2 = false;

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
            Context.Response.Write(js.Serialize(true));
        }
        else
            Context.Response.Write(js.Serialize(false));
    }
}
