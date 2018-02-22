using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for Colors
/// </summary>
public class Element
{
    public Element() { }

    public String Name { get; set; }
    public String ID { get; set; }
    public String Type { get; set; }
    public String Value { get; set; }
    public Boolean Hidden { get; set; }
    public String Image { get; set; }
    public String Store_ID { get; set; }
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    public Element e = new Element();

/// <summary>
/// 
/// </summary>

    [WebMethod]
    public void ElementInfo()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select * from Element Where ID='" + e.ID + "'", con);
            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {

                e.Name = reader["Name"].ToString();
                e.Type = reader["Type"].ToString();
                e.Value = reader["Value"].ToString();
                e.Hidden = reader["Hidden"].ToString();
                e.Image = reader["Image"].ToString();
                e.Store_ID = reader["Store_ID"].ToString();

            }
        }

        Context.Response.Write(js.Serialize(e));
        if(e.Hidden==0)
        {


        }
    }

}