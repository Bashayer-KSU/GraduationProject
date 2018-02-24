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

    [WebMethod]
    public void GetAllCategories(string storeID)
    {
        List<string> categories = new List<string>();
        //insert selected colors to database
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("select Name from Category where Store_ID = '" + storeID + "'", con);
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    categories.Add(reader["Name"].ToString());
                }
            }
        }
        //\insert selected colors to database
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(categories));

    }

    [WebMethod]
    public void AddNewCategory(string cat, string storID)
    {
        int x;
        string msg = "";
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand check = new SqlCommand("select Name from Category where Name ='" + cat + "' and Store_ID = '" + storID + "'", con);
            SqlDataReader reader = check.ExecuteReader();
            if (!reader.Read())
            {
                reader.Close();
                Random R = new Random();
                using (SqlCommand cmd = new SqlCommand("insert into Category (Store_ID, ID, Name, OrderInMenu) values " + "('" + storID + "','" + R.Next(0, 100) + "','" + cat + "','2')", con))
                {
                    x = cmd.ExecuteNonQuery();
                    if (x != 0) { msg = cat + " category added successfully"; }
                }
            }
            else { msg = cat + " category already exists"; }
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
            SqlCommand cmd = new SqlCommand("select ID from Category where Name ='" + category + "' and Store_ID = '" + 1 + "'", con);
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
                        pro.Store_ID = reader["Store_ID"].ToString();
                        ProductsList.Add(pro);
                    }
                }
            }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(ProductsList));
    }

    [WebMethod]
    public void AddNewProduct(Product pro)
    {
        int x;
        Product product = new Product();
        Random R = new Random();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand check = new SqlCommand("select ID from Category where Name ='" + pro.Category_ID + "' and Store_ID = '" + pro.Store_ID + "'", con);
            SqlDataReader reader = check.ExecuteReader();
            if (reader.Read())
            {
                int id = R.Next(0, 100);
                using (SqlCommand cmd = new SqlCommand("INSERT INTO Product (ID, Name, Category_ID, Store_ID, Price, Image, Description, Discount, Amount) values(" + id + ", '" + pro.Name + "', '" + reader["ID"].ToString() + "','1'," + pro.Price + ",'" + pro.Image + "','" + pro.Description + "'," + pro.Discount + "," + pro.Amount + ")", con))
                {
                    reader.Close();
                    x = cmd.ExecuteNonQuery();
                    if (true)
                    {

                        product.ID = id;
                        product.Name = pro.Name;
                        product.Price = pro.Price;
                        product.Image = pro.Image;
                        product.Description = pro.Description;
                        product.Discount = pro.Discount;
                        product.Category_ID = pro.Category_ID;
                        product.Amount = pro.Amount;
                        product.Store_ID = "1";
                        System.Console.WriteLine("added");
                    }
                }
            }
        }
        System.Console.WriteLine("faild");
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(product));
    }

    [WebMethod]
    public void RemoveProduct(int product_ID)
    {
        int x;
        Boolean result = false;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            using (SqlCommand cmd = new SqlCommand("DELETE FROM Product WHERE ID = '" + product_ID + "'; ", con))
            {
                x = cmd.ExecuteNonQuery();
                if (x != 0)
                    result = true;
            }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(result));
    }

    [WebMethod]
    public void EditProduct(Product pro)
    {
        int x;
        Boolean result = false;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            using (SqlCommand cmd = new SqlCommand("UPDATE Product SET Name ='" + pro.Name + "', Price =" + pro.Price + ", Image = '" + pro.Image + "', Description = '" + pro.Description + "', Discount = " + pro.Discount + ", Amount = " + pro.Amount + " WHERE ID =" + pro.ID + ";", con))
            {
                x = cmd.ExecuteNonQuery();
                if (x != 0)
                    result = true;
            }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(result));
    }

}
