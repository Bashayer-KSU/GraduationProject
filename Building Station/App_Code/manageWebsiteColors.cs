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

    Colors selectedColors = new Colors();
    string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;

    [WebMethod]
    public void getWebsiteColors(string path)
    {
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
        selectedColors.color1 = s[0][0];
        selectedColors.color2 = s[1][0];
        selectedColors.color3 = s[2][0];
        selectedColors.color4 = s[3][0];
        //\extract colors
        //insert selected colors to database
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmdee = new SqlCommand("insert into color (first, second, third, fourth) values " +
                "('" + selectedColors.color1 + "','" + selectedColors.color2 + "','" + selectedColors.color3 + "','" + selectedColors.color4 + "')", con);
            cmdee.ExecuteNonQuery();
            con.Close();
        }
        //\insert selected colors to database

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(selectedColors));
    }

    public void chooseColors()
    {

    }

}
