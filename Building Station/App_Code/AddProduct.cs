using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for AddProduct
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AddProduct : System.Web.Services.WebService
{
    //string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    string cs = "workstation id = BuildingStation4.mssql.somee.com; packet size = 4096; user id = BuildingStation_SQLLogin_1; pwd=fdowma8mzh;data source = BuildingStation4.mssql.somee.com; persist security info=False;initial catalog = BuildingStation4";

    string ShopEmail = "lamia@gmail.com";

    [WebMethod]
    public Product AddNewProduct(string cat, string image, string name, string des, double price, double PAD, int amount, int discount)
    {
        Product product = new Product();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand check = new SqlCommand("select ID from Category where Name ='" + cat + "' and ShopEmail = '" + ShopEmail + "'", con);
            SqlDataReader reader = check.ExecuteReader();
            string categoryID = reader["ID"].ToString();
            if (reader.Read())
            {
                //int categoryID = 1;
                using (SqlCommand cmd = new SqlCommand("INSERT INTO Product (Name, Category_ID, ShopEmail, Price, Image, Description, Discount, Amount) values(N'" + name + "', '" + categoryID + "','" + ShopEmail + "'," + price + ",'" + image + "',N'" + des + "'," + discount + "," + amount + ")", con))
                {
                    reader.Close();
                    int rows = cmd.ExecuteNonQuery();

                    using (SqlCommand cmd2 = new SqlCommand("SELECT ID FROM Product WHERE Name= N'" + name + "' AND Category_ID= '" + categoryID + " AND ShopEmail= '" + ShopEmail + "'", con))
                    {
                        SqlDataReader id = cmd2.ExecuteReader();
                        product.ID = Convert.ToInt32(id["ID"]);
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
            else { }
        }
        return product;
    }


}
