using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for manageWebsiteColors
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class manageWebsiteColors : System.Web.Services.WebService
{
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    //string cs = "workstation id=BS-Database.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BS-Database.mssql.somee.com;persist security info=False;initial catalog=BS-Database";

    [WebMethod(EnableSession = true)]
    public void GetWebsiteColors(string path)
    {

        Colors selectedColors = new Colors();
        // our account in cloudinary 
        CloudinaryDotNet.Account account =
                            new CloudinaryDotNet.Account("dkejtwcc6", "799652649934124", "N6eQmnp7-66vxt3IMIpC-z0ijDw");

        CloudinaryDotNet.Cloudinary cloudinary = new CloudinaryDotNet.Cloudinary(account);
        //\our account in cloudinary

        // to upload logo
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(path),//file path
            Colors = true
        };
        var uploadResult = cloudinary.Upload(uploadParams);
        //\to upload logo

        //extract colors
        var s = uploadResult.Colors;
        if (s.Length >= 4)
        {
            selectedColors.color1 = s[0][0];
            selectedColors.color2 = s[1][0];
            selectedColors.color3 = s[2][0];
            selectedColors.color4 = s[3][0];
        } else if(s.Length == 3)
        {
            selectedColors.color1 = s[0][0];
            selectedColors.color2 = s[1][0];
            selectedColors.color3 = selectedColors.color4 = s[2][0];
        } else if(s.Length == 2)
        {
            selectedColors.color1 = selectedColors.color3 = s[0][0];
            selectedColors.color2 = selectedColors.color4 = s[1][0];
        } else if(s.Length == 1)
            selectedColors.color1 = selectedColors.color3 = selectedColors.color2 = selectedColors.color4 = s[0][0];
        //\extract colors

        //insert selected colors to database
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmdee = new SqlCommand("UPDATE Store SET Color1='"+selectedColors.color1+"', Color2='"+selectedColors.color2+"', Color3='"+selectedColors.color3+"', Color4='"+selectedColors.color4+ "' WHERE Email='" + Session["user"] + "'", con);
            cmdee.ExecuteNonQuery();
            con.Close();

            /*con.Open();
            SqlCommand retrieve = new SqlCommand("select Color1, Color2, Color3, Color14 from Store where Email ='asmaa.alrubia@gmail.com'", con);
            SqlDataReader reader = retrieve.ExecuteReader();
            if (reader.Read())
            {
                
                c.color1 = reader["Color1"].ToString();
                c.color2 = reader["Color2"].ToString();
                c.color3 = reader["Color3"].ToString();
                c.color4 = reader["Color4"].ToString();
            }*/
        }
        //\insert selected colors to database

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(selectedColors));
    }

    [WebMethod]
    public void chooseColors()
    {
        Colors c = new Colors();
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand retrieve = new SqlCommand("select Color1, Color2, Color3, Color4 from Store where Email ='asmaa.alrubia@gmail.com'", con);
            SqlDataReader reader = retrieve.ExecuteReader();
            if (reader.Read())
            {

                c.color1 = reader["Color1"].ToString();
                c.color2 = reader["Color2"].ToString();
                c.color3 = reader["Color3"].ToString();
                c.color4 = reader["Color4"].ToString();
            }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(c));
    }

}
