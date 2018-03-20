using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Order
/// </summary>
public class Order
{
    public Order()
    {
        //
        // TODO: Add constructor logic here
        //
    }


    public string ID { get; set; }
    public double TotalPrice { get; set; }
    public string PaymentMethod { get; set; }
    public string BuyerName { get; set; }
    public string BuyerPhone { get; set; }
    public string BuyerEmail { get; set; }
    public string BuyerLocation { get; set; }
    public string Status { get; set; }
    public string BankAccount { get; set; }
    public string ShipmentMethod { get; set; }
    public string StoreEmail { get; set; }
    public string OrderID { get; set; }



}