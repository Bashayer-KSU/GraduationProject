using System;
using System.Collections.Generic;
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

    public int ID { get; set; }
    public double TotalPrice { get; set; }
    public string PaymentMethod { get; set; }
    public string BuyerName { get; set; }
    public string BuyerPhone { get; set; }
    public string BuyerEmail { get; set; }
    public string BuyerLocation { get; set; }
    public bool Status { get; set; }
    public string BankAccount { get; set; }
    public string ShipmentMethod { get; set; }
    public string StoreEmail { get; set; }
    public int OrderID { get; set; }



}