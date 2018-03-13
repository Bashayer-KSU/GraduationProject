using System;
using System.Collections.Generic;
using System.Configuration;
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
public class Products : System.Web.Services.WebService {
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id = BuildingStation4.mssql.somee.com; packet size = 4096; user id = BuildingStation_SQLLogin_1; pwd=fdowma8mzh;data source = BuildingStation4.mssql.somee.com; persist security info=False;initial catalog = BuildingStation4";
    string ShopEmail = "star7s@msn.com";

    [WebMethod]
    public void GetAllCategories(/*string ShopEmail*/)
    {
        List<string> categories = new List<string>();
        //insert selected colors to database
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            int i = 0;
            SqlCommand cmd = new SqlCommand("select Name from Category where ShopEmail = '" + ShopEmail + "'", con);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (i!=2)
                {
                    categories.Add(reader["Name"].ToString());
                    i++;
                }
            }
        }
        //\insert selected colors to database
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(categories));

    }

    [WebMethod]
    public void AddNewCategory(string cat /*, string ShopEmail*/)
    {
        int x;
        string msg = "";
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand check = new SqlCommand("select Name from Category where Name =N'" + cat + "' and ShopEmail = '" + ShopEmail + "'", con);
            SqlDataReader reader = check.ExecuteReader();
            if (!reader.Read())
            {
                reader.Close();
                //Random R = new Random();
                using (SqlCommand cmd = new SqlCommand("insert into Category (ShopEmail, Name, OrderInMenu) values " + "('" + ShopEmail + "',N'" + cat + "','0')", con))
                {
                    x = cmd.ExecuteNonQuery();
                    if (x != 0) { msg = cat + " category added successfully"; }
                }
            }
            else { msg = cat + "category already exists"; }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(msg));
    }

    [WebMethod]
    public void GetAllProducts(string category)
    {
        List<Product> ProductsList = new List<Product>();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("select ID from Category where Name =N'" + category + "' and ShopEmail = '" + ShopEmail + "'", con);
            SqlDataReader R = cmd.ExecuteReader();
            if (R.Read())
            {
                using (SqlCommand check = new SqlCommand("select * from Product where Category_ID ='" + R["ID"].ToString() + "'", con))
                {
                    R.Close();
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
                        pro.StoreEmail = reader["ShopEmail"].ToString();
                        if(pro.Discount != 0)
                        {
                            double i = pro.Price * pro.Discount / 100;
                            i = pro.Price - i;
                            pro.PriceAfterDiscount = i;
                        }
                        else { pro.PriceAfterDiscount = 0; }
                        ProductsList.Add(pro);
                    }
                }
            }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(ProductsList));
    }

    [WebMethod]
    public Product AddNewProduct(Product pro)
    {
        Product product = new Product();
        Random R = new Random();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand check = new SqlCommand("select ID from Category where Name =N'" + pro.Category_ID + "' and ShopEmail = '" + ShopEmail + "'", con);
            SqlDataReader reader = check.ExecuteReader();
            int categoryID = Convert.ToInt32(reader["ID"]);
            if (reader.Read())
            {
                using (SqlCommand cmd = new SqlCommand("INSERT INTO Product (Name, Category_ID, ShopEmail, Price, Image, Description, Discount, Amount) values(N'" + pro.Name + "', " + categoryID + ",'" + ShopEmail + "'," + pro.Price + ",'" + pro.Image + "',N'" + pro.Description + "'," + pro.Discount + "," + pro.Amount + ")", con))
                {
                    reader.Close();
                    int rows = cmd.ExecuteNonQuery();

                    using (SqlCommand cmd2 = new SqlCommand("SELECT ID FROM Product WHERE Name=N'" + pro.Name + "AND Category_ID=" + categoryID + "AND ShopEmail=" + ShopEmail, con))
                    {
                        SqlDataReader id = cmd2.ExecuteReader();
                        product.ID = Convert.ToInt32(id["ID"]);
                        product.Name = pro.Name;
                        product.Price = pro.Price;
                        product.Image = pro.Image;
                        product.Description = pro.Description;
                        product.Discount = pro.Discount;
                        product.Category_ID = pro.Category_ID;
                        product.Amount = pro.Amount;
                        product.StoreEmail = ShopEmail;
                        if (product.Discount != 0)
                        {
                            double i = product.Price * product.Discount / 100;
                            i = product.Price - i;
                            product.PriceAfterDiscount = i;
                        }
                        else { pro.PriceAfterDiscount = 0; }
                    }
                }
            }
        }
        return product;
    }

    [WebMethod]
    public void RemoveProduct(int product_ID)
    {
        Boolean result = false;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            using (SqlCommand cmd = new SqlCommand("DELETE FROM Product WHERE ID = '" + product_ID + "'; ", con))
            {
                int rows = cmd.ExecuteNonQuery();
                if(rows != 0)
                    result = true;
            }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(result));
    }

    [WebMethod]
    public Product EditProduct(Product pro)
    {
        int x;
        Product product = new Product();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
            SqlCommand check = new SqlCommand("select ID from Category where Name =N'" + pro.Category_ID + "' and ShopEmail = '" + ShopEmail + "'", con);
            SqlDataReader reader = check.ExecuteReader();
            if (reader.Read())
            {
                using (SqlCommand cmd = new SqlCommand("UPDATE Product SET Name =N'" + pro.Name + "', Price =" + pro.Price + ", Image = '" + pro.Image + "', Description = N'" + pro.Description + "', Discount = " + pro.Discount + ", Amount = " + pro.Amount + ",Category_ID	='" + reader["ID"].ToString() + "' WHERE ID =" + pro.ID , con))
                {
                    reader.Close();
                    x = cmd.ExecuteNonQuery();
                    if (x != 0)
                    {
                        product.Name = pro.Name;
                        product.Description = pro.Description;
                        product.Price = pro.Price;
                        product.Amount = pro.Amount;
                        product.Image = pro.Image;
                        product.ID = pro.ID;
                        product.Discount = pro.Discount;
                        product.Category_ID = pro.Category_ID;
                        product.StoreEmail = ShopEmail;

                        if (pro.Discount != 0)
                        {
                            double k = pro.Price * pro.Discount / 100;
                            k = pro.Price - k;
                            product.PriceAfterDiscount = k;
                        }
                        else { product.PriceAfterDiscount = 0; }
                    }
                }
            }
        }
        return product;
    }

}
