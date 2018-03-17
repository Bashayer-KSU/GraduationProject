﻿using System;
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
    string ShopEmail = "lamia@gmail.com";

    [WebMethod]
    public void GetAllCategories(/*string ShopEmail*/)
    {
        List<string> categories = new List<string>();
        //insert selected colors to database
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("select Name from Category where ShopEmail = '" + ShopEmail + "'", con);
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
    public Product EditProduct(int id, string cat, string image, string name, string des, double price, int amount, int discount)
    {
        int x;
        Product product = new Product();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
            SqlCommand check = new SqlCommand("select ID from Category where Name =N'" + cat + "' and ShopEmail = '" + ShopEmail + "'", con);
            SqlDataReader reader = check.ExecuteReader();
            if (reader.Read())
            {
                using (SqlCommand cmd = new SqlCommand("UPDATE Product SET Name =N'" + name + "', Price =" + price + ", Image = '" + image + "', Description = N'" + des + "', Discount = " + discount + ", Amount = " + amount + ",Category_ID	='" + reader["ID"].ToString() + "' WHERE ID =" + id , con))
                {
                    reader.Close();
                    x = cmd.ExecuteNonQuery();
                    if (x != 0)
                    {
                        product.Name = name;
                        product.Description = des;
                        product.Price = price;
                        product.Amount = amount;
                        product.Image =image;
                        product.ID = id;
                        product.Discount = discount;
                        product.Category_ID = cat;
                        product.StoreEmail = ShopEmail;

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
        return product;
    }

    [WebMethod]
    public Product AddNewProduct(string cat, string image, string name, string des, double price, double PAD, int amount, int discount)
    {
        int rows;
        Product product = new Product();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand check = new SqlCommand("select ID from Category where (Name =N'" + cat + "' and ShopEmail = '" + ShopEmail + "')", con);
            SqlDataReader reader = check.ExecuteReader();
            if (reader.Read())
            {
                int catID = Convert.ToInt32(reader["ID"]);
                using (SqlCommand cmd = new SqlCommand("INSERT INTO Product (Name, Category_ID, ShopEmail, Price, Image, Description, Discount, Amount) values(N'" + name + "', " + catID + ",'" + ShopEmail + "'," + price + ",'" + image + "',N'" + des + "'," + discount + "," + amount + ")", con))
                {
                    
                    //string query = "SELECT ID FROM Product WHERE (Name= N'" + name + "' AND Category_ID = '" + reader["ID"].ToString() + "' AND ShopEmail = '" + ShopEmail + "')";
                    reader.Close();

                    rows = cmd.ExecuteNonQuery();

                    using (SqlCommand cmd2 = new SqlCommand("SELECT ID FROM Product WHERE (Name =N'" + name + "' AND Category_ID =" + catID + ") AND ShopEmail = '" + ShopEmail + "'", con))
                    {
                        SqlDataReader id = cmd2.ExecuteReader();
                       // product.ID = Convert.ToInt32(id["ID"]);
                        product.Name = name;
                        product.Price = price;
                        product.Image = image;
                        product.Description = des;
                        product.Discount = discount;
                        product.Category_ID = cat;
                        product.Amount = amount;
                        product.StoreEmail = ShopEmail;
                        if (product.Discount != 0)
                        {
                            double i = product.Price * product.Discount / 100;
                            i = product.Price - i;
                            product.PriceAfterDiscount = i;
                        }
                        else { product.PriceAfterDiscount = 0; }
                    }
                }
            }
        }
        return product;
    }
    
}
