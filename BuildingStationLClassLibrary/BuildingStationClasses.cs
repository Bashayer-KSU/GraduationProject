using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Configuration;
using System.Data.Entity;
using System.Data.SqlClient;


namespace BuildingStationLClassLibrary
{
    public class ShowHideElement
    {
        public static Boolean ValidLink(string name)
        {
            string link = "";
            if (name.ToLower() == "snapchat")
                link = "https://www.snapchat.com/add/";
            else if (name.ToLower() == "facebook")
                link = "https://www.facebook.com/";
            else if (name.ToLower() == "instagram")
                link = "https://www.instagram.com/";
            else if (name.ToLower() == "twitter")
                link = "https://www.twitter.com/";

            if (link != "")
                return false;
            else
                return false;
        }
    }

    // ادري انه غباء وما يشبه الاصل بس لازم لانه ما يشوف الداتابيس
    public class Published_Stores
    {
        string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;

        public static string PublishRequest(string email)
        {
            string Published = "false";
            string paymentmethods = "No Payment Methods";
            string domain = "asmaaStore";

            return paymentmethods;
        }

        public static string Publish(string email)
        {
            string Published = "true";
            string domain = "SarahSweets";

            return domain;
        }

        public static Boolean UnPublishRequest(string email)
        {
            Store store = new Store();
            bool Published;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("SELECT WebsiteDomain FROM Store WHERE Email ='" + email + "'", con);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    store.Domain = reader["WebsiteDomain"].ToString();
                }
                reader.Close();
                con.Close();

                if (store.Domain.Equals("No WebsiteDomain"))
                {
                    Published = false;
                }
                else
                {
                    Published = true;
                }
            }
            return Published;
        }

        public static Boolean UnPublish(string email)
        {
            bool Published = false;

            return Published;
        }

        public static string DeleteStore(string email, string password)
        {
            string pass = "incorrect password";

            return pass;
        }        
    }

    public class LogoColors
    {
        public static Colors GetLogoColors(string logoPath)
        {

            Colors selectedColors = new Colors();
            // our account in cloudinary 
            CloudinaryDotNet.Account account = new CloudinaryDotNet.Account("dkejtwcc6", "799652649934124", "N6eQmnp7-66vxt3IMIpC-z0ijDw");

            CloudinaryDotNet.Cloudinary cloudinary = new CloudinaryDotNet.Cloudinary(account);
            //\our account in cloudinary

            // to upload logo
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(logoPath),//file path
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
            }
            else if (s.Length == 3)
            {
                selectedColors.color1 = s[0][0];
                selectedColors.color2 = s[1][0];
                selectedColors.color3 = selectedColors.color4 = s[2][0];
            }
            else if (s.Length == 2)
            {
                selectedColors.color1 = selectedColors.color3 = s[0][0];
                selectedColors.color2 = selectedColors.color4 = s[1][0];
            }
            else if (s.Length == 1)
                selectedColors.color1 = selectedColors.color3 = selectedColors.color2 = selectedColors.color4 = s[0][0];
            //\extract colors

            return selectedColors;
        }
    }
}
