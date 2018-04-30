using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for Products
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Products : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    // string cs = "workstation id=BS-Database.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BS-Database.mssql.somee.com;persist security info=False;initial catalog=BS-Database";

    JavaScriptSerializer js = new JavaScriptSerializer();

    [WebMethod(EnableSession = true)]
    public void GetAllCategories()
    { // List<Categories> 
        List<Categories> categories = new List<Categories>();
        //insert selected colors to database
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("select * from Category where StoreEmail = '" + Session["user"] + "' ORDER BY OrderInMenu ASC", con);
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

        Context.Response.Write(js.Serialize(categories));

        // return categories;

    }

    [WebMethod(EnableSession = true)]
    public void AddNewCategory(string cat)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            int catID = getCategoryID(cat);
            if (catID == -1)
            {
                using (SqlCommand cmd = new SqlCommand("insert into Category (StoreEmail, Name, OrderInMenu) values " + "('" + Session["user"] + "',N'" + cat + "','0')", con))
                {
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }

    [WebMethod(EnableSession = true)]
    public void DeleteCategory(string category)
    {
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            int catID = getCategoryID(category);
            if (catID != -1)
            {
                using (SqlCommand cmd2 = new SqlCommand("DELETE FROM Product WHERE (Category_ID = " + catID + " AND StoreEmail='" + Session["user"] + "') ", con))
                {
                    cmd2.ExecuteNonQuery();
                    using (SqlCommand cmd3 = new SqlCommand("DELETE FROM Category WHERE ID =" + catID, con))
                    {
                        cmd3.ExecuteNonQuery();
                    }
                }
            }
        }
    }

    [WebMethod(EnableSession = true)]
    public void ChangeOrder(string categoriesOrders)
    { //List<Categories>
        try
        {
            List<Categories> categories = new List<Categories>();
            string[] Orders = categoriesOrders.Split(',');
            SqlConnection con = new SqlConnection(cs);
            con.Open();
            ///////////////////
            SqlCommand cmd = new SqlCommand("select * from Category where StoreEmail = '" + Session["user"] + "' ORDER BY OrderInMenu ASC", con);
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
            ///////////////////

            for (int i = 0; i < categories.Count; i++)
            {
                SqlCommand cmd2 = new SqlCommand("UPDATE Category SET OrderInMenu = " + Orders[i] + " WHERE StoreEmail = '" + Session["user"] + "' AND Name= N'" + categories[i].Name + "'", con);
                int x = cmd2.ExecuteNonQuery();
                categories[i].OrderInMenu = Convert.ToInt32(Orders[i]);
            }
            Context.Response.Write(js.Serialize(categories));
            //  return categories;
        }
        catch(Exception e) { }
    }

    [WebMethod(EnableSession = true)]
    public void GetAllProducts(string category)
    { // List<Product>
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
        Context.Response.Write(js.Serialize(ProductsList));
       // return ProductsList;
    }

    [WebMethod(EnableSession = true)]
    public void RemoveProduct(int product_ID)
    {
        Boolean result = false;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd1 = new SqlCommand("SELECT P.ID FROM Product AS P INNER JOIN ProductOrder AS PO ON P.ID = PO.Product_ID INNER JOIN \"Order\" AS O ON O.ID = PO.Order_ID WHERE P.ID = '" + product_ID + "' AND O.Status = 0", con);
            SqlDataReader reader = cmd1.ExecuteReader();
            if (!reader.HasRows) {
                con.Close();
                using (SqlCommand cmd2 = new SqlCommand("DELETE FROM ProductOrder WHERE Product_ID = '" + product_ID + "'; ", con))
                {
                    con.Open();

                    int rows = cmd2.ExecuteNonQuery();
                    SqlCommand cmd3 = new SqlCommand("DELETE FROM Product WHERE ID = '" + product_ID + "' AND StoreEmail= '"+ Session["user"] + "'", con);
                    if(cmd3.ExecuteNonQuery() == 1)
                        result = true;
                }
            }
        }
        Context.Response.Write(js.Serialize(result));

       // return result;
    }

    [WebMethod(EnableSession = true)]
    public Product EditProduct(int id, string cat, string image, string name, string des, double price, double PADs, int amount, int discount)
    {
        int x;
        Product product = new Product();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            int catID = getCategoryID(cat);
            if (catID != -1)
            {

                using (SqlCommand cmd2 = new SqlCommand("UPDATE Product SET Name = N'" + name + "', Price =" + price + ", Image = '" + image + "', Description = N'" + des + "', Discount = " + discount + ", Amount = " + amount + ",Category_ID ='" + catID + "' WHERE ID =" + id, con))
                {
                    x = cmd2.ExecuteNonQuery();
                    if (x != 0)
                    {
                        product.Name = name;
                        product.Description = des;
                        product.Price = price;
                        product.Amount = amount;
                        product.Image = image;
                        product.ID = id;
                        product.Discount = discount;
                        product.Category_ID = cat;

                        product.StoreEmail = "" + Session["user"];

                        if (discount != 0)
                        {
                            double k = price * discount / 100;
                            //k = price - k;
                            product.PriceAfterDiscount = price - k;
                        }
                        else { product.PriceAfterDiscount = price; }
                    }
                }
            }
        }
      //  Context.Response.Write(js.Serialize(product));
       return product;
    }

    [WebMethod(EnableSession = true)]
    public Product AddNewProduct(string category, string image, string name, string des, double price, int amount, int discount)

    {
        int catID = getCategoryID(category);
        Product product = new Product();
        if (catID != -1)
        {
            int rows;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand cmd;

                cmd = new SqlCommand("INSERT INTO Product (Name, Category_ID, StoreEmail, Price, Image, Description, Discount, Amount) values(N'" + name + "', " + catID + ",'" + Session["user"] + "'," + price + ",'" + image + "',N'" + des + "'," + discount + "," + amount + ")", con);
                //string query = "SELECT ID FROM Product WHERE (Name= N'" + name + "' AND Category_ID = '" + reader["ID"].ToString() + "' AND ShopEmail = '" + ShopEmail + "')";
                //reader.Close();

                rows = cmd.ExecuteNonQuery();
                con.Close();
                // product.ID = Convert.ToInt32(id["ID"]);
                product.Name = name;
                product.Price = price;
                product.Image = image;
                product.Description = des;
                product.Discount = discount;
                product.Category_ID = category;
                product.Amount = amount;
                product.StoreEmail = "" + Session["user"];
                if (product.Discount != 0)
                {
                    double i = product.Price * product.Discount / 100;
                    i = product.Price - i;
                    product.PriceAfterDiscount = i;
                }
                else { product.PriceAfterDiscount = 0; }
            }
        }
        //Context.Response.Write(js.Serialize(product));
        return product;
    }

    [WebMethod(EnableSession = true)]
        public void BestProducts()
    { // List<Statstic>
        List<Product> StoreProductsList = GetAllStoreProducts();
            List<Statstic> statsticList = new List<Statstic>();

            Statstic statstic = new Statstic();

            using (SqlConnection con = new SqlConnection(cs))
            {
                foreach (var pro in StoreProductsList)
                {
                    int id = pro.ID;
                    SqlCommand cmd = new SqlCommand("select SUM(Amount) AS amnt from ProductOrder Where Product_ID = '" + id + "'", con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        statstic = new Statstic();
                        statstic.ProductID = Convert.ToInt32(pro.ID);
                        statstic.ProductName = pro.Name;
                        statstic.CategoryName = GetCategoryName(Convert.ToInt32(pro.Category_ID));
                    //    statstic.Image = pro.Image;
                        string amount = reader["amnt"].ToString();
                        if (reader["amnt"] != DBNull.Value)
                        {
                            statstic.Amount = Convert.ToInt32(reader["amnt"]);
                        }

                        statsticList.Add(statstic);
                    }
                    con.Close();
                }
            }
        Context.Response.Write(js.Serialize(statsticList));
       // return statsticList;
        }

    [WebMethod(EnableSession = true)]
    public void BestCategories ()
    { //  List<Statstic>
        List<Statstic> statsticList = new List<Statstic>();
        Statstic statstic = new Statstic();
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT SUM(ProductOrder.Amount) AS amount, Category.ID AS CatID, Category.Name AS CatName FROM ProductOrder INNER JOIN Product ON ProductOrder.Product_ID = Product.ID INNER JOIN Category ON Product.Category_ID = Category.ID WHERE Product.StoreEmail = '" + Session["user"] + "' GROUP BY Category.ID, Category.Name", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                statstic = new Statstic();
                statstic.Amount = Convert.ToInt32(reader["amount"]);
                statstic.CategoryID = Convert.ToInt32(reader["CatID"]);
                statstic.CategoryName = Convert.ToString(reader["CatName"]);
                statsticList.Add(statstic);
            }
            con.Close();
            Context.Response.Write(js.Serialize(statsticList));
            //     return statsticList;
        }
    }

    [WebMethod(EnableSession = true)]
    public void BestProductsInCategory(string CategoryID)
    { // List<Statstic>
        int Category_ID = Convert.ToInt32(CategoryID);
        int count = 0;
        List<Statstic> statsticList = new List<Statstic>();
        Statstic statstic = new Statstic();
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("SELECT SUM(ProductOrder.Amount) AS amount, Product.ID AS ProID, Product.Name AS ProName FROM ProductOrder INNER JOIN Product ON ProductOrder.Product_ID = Product.ID WHERE Product.StoreEmail = '" + Session["user"] + "' AND Product.Category_ID = "+ Category_ID+ "  GROUP BY Product.ID, Product.Name", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                count++;
                statstic = new Statstic();
                statstic.Amount = Convert.ToInt32(reader["amount"]);
                statstic.ProductID = Convert.ToInt32(reader["ProID"]);
                statstic.ProductName = Convert.ToString(reader["ProName"]);
                statsticList.Add(statstic);
            }
            con.Close();

            Context.Response.Write(js.Serialize(statsticList));
        //    return statsticList;
        }
    }

    [WebMethod(EnableSession = true)]
    public List<Product> GetAllStoreProducts()
    { 
        List<Product> ProductsList = new List<Product>();
        Product product = new Product();

        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select * from Product Where StoreEmail ='" + Session["user"] + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                product = new Product();
                product.ID = Convert.ToInt32(reader["ID"]);
                product.Name = reader["Name"].ToString();
                product.Category_ID = reader["Category_ID"].ToString();
                product.Image = reader["Image"].ToString();

                ProductsList.Add(product);
            }
            con.Close();
        }
        return ProductsList;
    }

    [WebMethod(EnableSession = true)]
    public string GetCategoryName(int id)
    {
        string category_name = "";
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("select Name from Category where ID ='" + id + "' and StoreEmail = '" + Session["user"] + "'", con);
            SqlDataReader R = cmd.ExecuteReader();
            if (R.Read())
            {
              return R["Name"].ToString();
            }
        }
        return category_name;
    }

    [WebMethod(EnableSession = true)]
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

}
