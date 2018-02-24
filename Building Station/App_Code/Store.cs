using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Store
/// </summary>
public class Store
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string ShopOwner { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Logo { get; set; }
    public string Description { get; set; }
    public string SliderImage{ get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public bool Published { get; set; }
    public string Domain { get; set; }
    public string Color1 { get; set; }
    public string Color2 { get; set; }
    public string Color3 { get; set; }
    public string Color4 { get; set; }
    public List<string> SocialMedialinks { get; set; }
    public int TemplateID { get; set; }
    public bool PayPal { get; set; }
    public bool Cach { get; set; }
    public bool BankTransfer { get; set; }
    public string BankAccount { get; set; }
    public string menuTitle { get; set; }

    public Store()
    {


        //
        // TODO: Add constructor logic here
        //
    }
}