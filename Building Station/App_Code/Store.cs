using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Store
/// </summary>
public class Store
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Logo { get; set; }
    public List<string> TextSet { get; set; }
    public List<string> ImageSet { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public bool Published { get; set; }
    public string Domain { get; set; }
    public string ShopOwner { get; set; }
    public int Color1 { get; set; }
    public int Color2 { get; set; }
    public int Color3 { get; set; }
    public int Color4 { get; set; }
    public List<string> SocialMedialinks { get; set; }
    public string Password { get; set; }



    public Store()
    {


        //
        // TODO: Add constructor logic here
        //
    }
}