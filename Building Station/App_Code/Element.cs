using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for Colors
/// </summary>
public class Element
{
    public Element() { }

    public String Name { get; set; }
    public String ID { get; set; }
    public String Type { get; set; }
    public String Value { get; set; }
    public Boolean Hidden { get; set; }
    public String Image { get; set; }
    public String StoreEmail { get; set; }


}