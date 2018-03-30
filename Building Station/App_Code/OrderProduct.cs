using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Product
/// </summary>
public class OrderProduct
{
    public int OrderID { get; set; }
    public int ProductID { get; set; }
    public string Image { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Amount { get; set; }
}