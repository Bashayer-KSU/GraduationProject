﻿using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for RegisterLogin
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RegisterLogin : System.Web.Services.WebService
{
    //string cs = ConfigurationManager.ConnectionStrings["DB"].ConnectionString;
    string cs = "workstation id=BS-Database.mssql.somee.com;packet size=4096;user id=BuildingStation_SQLLogin_1;pwd=fdowma8mzh;data source=BS-Database.mssql.somee.com;persist security info=False;initial catalog=BS-Database";
    JavaScriptSerializer js = new JavaScriptSerializer();
    [WebMethod(EnableSession = true)]
    public void Register(String name, String email, String password, String phone, String lang)
    {


        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM Store WHERE Email='" + email + "'", con);
            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.HasRows == true)
            {
                con.Close();
                Context.Response.Write(js.Serialize("/index.html"));
            }
            else
            {
                dr.Close();
                cmd = new SqlCommand("insert into Store (ShopOwnerName, Email, Password, Phone) values " +
                   "(N'" + name + "','" + email + "','" + password + "','" + phone + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                Store store = new Store();
                store.ShopOwner = name;
                store.Email = email;
                store.Password = password;
                store.Phone = phone;
                Session["user"] = email;
                //Context.Response.Write(js.Serialize(Session["user"].ToString()));

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Snapchat', 'Link','" + Session["user"] + "','"+true+"')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Twitter', 'Link','" + Session["user"] + "','" + true + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Facebook', 'Link','" + Session["user"] + "','" + true + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Instagram', 'Link','" + Session["user"] + "','" + true + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('Slider', 'Slider','" + Session["user"] + "','" + false + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail, Hidden) values " +
                "('About', 'About','" + Session["user"] + "','" + false + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail) values " +
                "('PayPal', 'AccountEmail','" + Session["user"] + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                con.Open();
                cmd = new SqlCommand("insert into Element (Name, Type, StoreEmail) values " +
                "('PayPal', 'Currency','" + Session["user"] + "')", con);
                cmd.ExecuteNonQuery();
                con.Close();

                if (lang.Equals("eng"))
                {
                    Context.Response.Write(js.Serialize("/CreationStage.html"));
                }
                else if(lang.Equals("ar"))
                {
                    Context.Response.Write(js.Serialize("/CreationSatgeArabic.html"));
                }
            }
        }
    }
    [WebMethod(EnableSession = true)]
    public void Login(String email, String password, String lang)
    {

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM Store WHERE Email='" + email + "' AND Password='" + password + "'", con);
            SqlDataReader dr = cmd.ExecuteReader();

            if (dr.HasRows == true)
            {
                Session["user"] = email;
                dr.Read();
                if (Convert.ToInt32(dr["TemplateID"]) == 0) //If user not start building template yet
                {
                    con.Close();

                    if (lang.Equals("eng"))
                    {
                        Context.Response.Write(js.Serialize("/CreationStage.html"));
                    }
                    else
                    {
                        Context.Response.Write(js.Serialize("/CreationSatgeArabic.html"));
                    }
                }
                else //If user already has template 
                {
                    if (lang.Equals("eng"))
                    {
                        Context.Response.Write(js.Serialize("/Views/BasicE.html"));
                    }
                    else
                    {
                        Context.Response.Write(js.Serialize("/Basic.html"));
                    }
                }
            }

            //Invalid login
            else
            {
                Context.Response.Write(js.Serialize("/index.html"));
            }
        }
    }

    [WebMethod(EnableSession = true)]
    public void CheckUser()
    {
        if (Session["user"] == null)
        {
            Context.Response.Write(js.Serialize(false));
        }
        else
        {
            Context.Response.Write(js.Serialize(true));
        }
    }


    [WebMethod(EnableSession = true)]
    public void SignOut()
    {
        // Session.Clear();
        Session.Abandon();
        Context.Response.Write(js.Serialize("/index.html"));
    }
}
