using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;

namespace Demo {
    /// <summary>
    /// Summary description for CreationStage
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CreationStage : System.Web.Services.WebService
    {
        string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;

        public CreationStage()
        {


            //Uncomment the following line if using designed components 
            //InitializeComponent(); 
        }

        [WebMethod]
        public void StoreInfo()
        {
            Store store = new Store();

            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("select * from Store Where ID ", con);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read()) {

                    store.Logo = reader["Logo"].ToString();
                    store.Name = reader["Name"].ToString();
                    store.Address = reader["Address"].ToString();
                    store.Email = reader["Email"].ToString();
                    store.Phone = reader["Phone"].ToString();
                    // store.SocialMedialinks = reader["Social Media Links"].ToString();
                }
            }

            JavaScriptSerializer js = new JavaScriptSerializer();

            Context.Response.Write(js.Serialize(store));
        }

    }
}
