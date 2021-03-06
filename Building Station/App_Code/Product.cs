﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Product
/// </summary>
public class Product
{
    public int ID { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public double PriceAfterDiscount { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
    public int Discount { get; set; }
    public string Category_ID { get; set; }
    public int Amount { get; set; }
    public string StoreEmail { get; set; }
}