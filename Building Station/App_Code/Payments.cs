using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Payments
/// </summary>
public class Payments
{
    public Payments()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Boolean Paypal { get; set; }
    public string PayPalEmail { get; set; }
    public string PayPalCurrencey { get; set; }
    public string BankName { get; set; }
    public string AccountName { get; set; }
    public string IBAN { get; set; }
    public Boolean BankTransfer { get; set; }
    public Boolean Cash { get; set; }

}