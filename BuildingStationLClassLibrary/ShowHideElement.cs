using System;

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
        public static string PublishRequest(string email)
        {
            string Published = "false";
            string paymentmethods = "No Payment Methods";
            string domain = "SarahSweets";
          

             return paymentmethods;
        }

        public static string Publish(string email)
        {
            string Published = "true";
            string domain = "SarahSweets";

            return domain;
        }
    }
}
