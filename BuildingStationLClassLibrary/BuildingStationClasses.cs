using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;


namespace BuildingStationLClassLibrary
{
    public class RegisterLogin
    {
        public static Boolean Register(string name, string email, string password, string phone)
        {
            if (password.Length > 7 && password.Length < 21 && phone.Length > 7 && phone.Length < 16)
            {
                Store store = new Store();
                store.ShopOwner = name;
                store.Email = email;
                store.Password = password;
                store.Phone = phone;

                return true;
            }
              return false;
        }
    }

    public class CreationStage
    {
        public static Store AddStoreType(string type, string language)
        {
            Store store = new Store();
            string Description_Text = " ";

            if (language.Equals("Arabic"))
            {
                if ((type.Contains("أشغال يدوية")) || (type.Contains("أعمال يدوية")) || (type.Contains("كروشيه")) || (type.Contains("صوف")) || (type.Contains("تريكو")) || (type.Contains("حياكة")))
                    Description_Text = "صناعة يدوية عالية الجودة بتصاميم مميزة 🎁";

                else if ((type.Contains("حلويات")) || (type.Contains("كيك")))
                    Description_Text = "حلويات صنعت بكل حب وشغف 🎂💓";

                else if ((type.Contains("مخبز")) || (type.Contains("معجنات")) || (type.Contains("مخبوزات")))
                    Description_Text = "مخبوزات ومعجنات لحفلات الشاي ☕️🥐";

                else if ((type.Contains("ساعات")) || (type.Contains("اكسسوار")) || (type.Contains("اكسسوارات")))
                    Description_Text = "نتميز بجودة عالية وخيارات متعددة 💎";

                else if ((type.Contains("موضة")) || (type.Contains("موضة وملابس")) || (type.Contains("ملابس")) || (type.Contains("فساتين")))
                    Description_Text = "قطع منتقاة بعناية لتتناسب مع ذوقك الراقي 🎀🛍";

                else if ((type.Contains("أغطية جوال")) || (type.Contains("اكسسوارات جوال ولابتوب")) || (type.Contains("حقائب لابتوب")))
                    Description_Text = "كل ما هو جديد في عالم الإكسسوارات الإلكترونيات 📱🖥";

                else if ((type.Contains("طبخ")) || (type.Contains("طبخ منزلي")) || (type.Contains("ورق عنب")) || (type.Contains("محاشي")) || (type.Contains("أطعمة شرقية")) || (type.Contains("طعام")) || (type.Contains("غذاء")))
                    Description_Text = "طبخات لذيذة ودافئة لإرضاء ذائقتكم 🥘😋";

                else if ((type.Contains("جمال")) || (type.Contains("عناية")) || (type.Contains("مكياج")) || (type.Contains("بشرة")) || (type.Contains("تجميل")) || (type.Contains("كريم")))
                    Description_Text = "المكان المناسب لتدللي نفسك 💁🏻‍♀️";
                
                else
                    Description_Text = "أسعار منافسة، ومنتجات رائعة ✨";
            }
            else if (language.Equals("English"))
            {
                type = type.ToLower();

                if ((type.Contains("handmade")) || (type.Contains("crochet")) || (type.Contains("knitwear")) || (type.Contains("yarn")) || (type.Contains("wool")))
                    Description_Text = "High quality handmade with special designs 🎁";
                
                else if ((type.Contains("sweets")) || (type.Contains("dessert")) || (type.Contains("sugar")) || (type.Contains("cake")))
                    Description_Text = "Sweets made with love and passion 🎂💓";

                else if ((type.Contains("bakery")) || (type.Contains("pastries")) || (type.Contains("pastry")) || (type.Contains("baking")))
                    Description_Text = "Bakery and pastry for tea parties ☕️🥐";

                else if ((type.Contains("watches")) || (type.Contains("jewelery")) || (type.Contains("accessories")))
                    Description_Text = "High quality and multiple options 💎";

                else if ((type.Contains("fashion")) || (type.Contains("cloths")) || (type.Contains("dresses")))
                    Description_Text = "Carefully selected pieces to suit your taste 🎀🛍";
                
                else if ((type.Contains("mobile covers")) || (type.Contains("phone & laptop accessories")) || (type.Contains("laptop bags")) || (type.Contains("cases")) || (type.Contains("sleeve")))
                    Description_Text = "Everything new in the world of electronics' accessories 📱🖥";

                else if ((type.Contains("cooking")) || (type.Contains("home cook")) || (type.Contains("grape leaves")) || (type.Contains("mahashi")) || (type.Contains("eastern food")) || (type.Contains("food")))
                    Description_Text = "Delicious and warm dishes to satisfy your taste 🥘😋";

                else if ((type.Contains("beauty")) || (type.Contains("skin care")) || (type.Contains("makeup")) || (type.Contains("skin")) || (type.Contains("beauty & skin care")) || (type.Contains("lotion")) || (type.Contains("cream")))
                    Description_Text = "♀️ The right place to take care of your skin 💁🏻";

                else
                    Description_Text = "Competitive prices, great products ✨";
            }
                store.Description = Description_Text;
                store.Type = type;

            return store;
        }
    }

    public class ShowHideElement
    {
        public static Boolean ShowHideSection(string section, string action)
        {
            string sectionName = "";
            if (section.ToLower() == "slider")
            {
                sectionName = "Slider";
            }
            else if (section.ToLower() == "about")
            {
                sectionName = "About";
            }

            if (sectionName != "" && action == "Show")
            {
                int x = 1;
                if (x != 0)
                    return true;
                else
                    return false;
            }
            else if (sectionName != "" && action == "Hide")
            {
                int x = 1;
                if (x != 0)
                    return true;
                else
                    return false;
            }
            return false;
        }

        public static Boolean ShowHideIcon(string icon, string action)
        {
            if (action == "Show")
            {
                if (icon == "Snapchat" || icon == "Facebook" || icon == "Twitter" || icon == "Instagram")
                {
                    {
                        int x = 1;
                        if (x != 0)
                            return true;
                        else
                            return false;
                    }
                }
            }
            else if (action == "Hide")
            {
                if (icon == "Snapchat" || icon == "Facebook" || icon == "Twitter" || icon == "Instagram")
                {
                    int x = 1;
                    if (x != 0)
                        return true;
                    else
                        return false;
                }
            }
            return false;
        }

        public static Boolean ValidLink(string name)
        {
            string link = "";
            if (name.ToLower() == "snapchat")
                link = "https://www.snapchat.com/add/";
            else if (name.ToLower() == "facebook")
                link = "https://www.facebook.com/";
            else if (name.ToLower() == "instagram")
                link = "https://www.instagram.com/";
            else if (name.ToLower() == "twitter")
                link = "https://www.twitter.com/";

            if (link != "")
                return false;
            else
                return false;
        }
    }

    // ادري انه غباء وما يشبه الاصل بس لازم لانه ما يشوف الداتابيس
    public class Published_Stores
    {

        public static string PublishRequest(string email)
        {
            string Published = "false";
            string paymentmethods = "No Payment Methods";
            string domain = "asmaaStore";

            return paymentmethods;
        }

        public static string Publish(string email)
        {
            string Published = "true";
            string domain = "SarahSweets";

            return domain;
        }

        public static Boolean UnPublishRequest(string email)
        {
            Store store = new Store();
            store.Domain = "No WebsiteDomain";
                if (store.Domain.Equals("No WebsiteDomain"))
                {
                store.Published = false;
                }
                else
                {
                store.Published = true;
                }
            
            return store.Published;
        }

        public static Boolean UnPublish(string email)
        {
            bool Published = false;

            return Published;
        }

        public static string DeleteStore(string email, string password)
        {
            string pass = "incorrect password";

            return pass;
        }        
    }

    public class LogoColors
    {
        public static Colors GetLogoColors(string logoPath)
        {

            Colors selectedColors = new Colors();
            // our account in cloudinary 
            CloudinaryDotNet.Account account = new CloudinaryDotNet.Account("dkejtwcc6", "799652649934124", "N6eQmnp7-66vxt3IMIpC-z0ijDw");

            CloudinaryDotNet.Cloudinary cloudinary = new CloudinaryDotNet.Cloudinary(account);
            //\our account in cloudinary

            // to upload logo
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(logoPath),//file path
                Colors = true
            };
            var uploadResult = cloudinary.Upload(uploadParams);
            //\to upload logo

            //extract colors
            var s = uploadResult.Colors;
            if (s.Length >= 4)
            {
                selectedColors.color1 = s[0][0];
                selectedColors.color2 = s[1][0];
                selectedColors.color3 = s[2][0];
                selectedColors.color4 = s[3][0];
            }
            else if (s.Length == 3)
            {
                selectedColors.color1 = s[0][0];
                selectedColors.color2 = s[1][0];
                selectedColors.color3 = selectedColors.color4 = s[2][0];
            }
            else if (s.Length == 2)
            {
                selectedColors.color1 = selectedColors.color3 = s[0][0];
                selectedColors.color2 = selectedColors.color4 = s[1][0];
            }
            else if (s.Length == 1)
                selectedColors.color1 = selectedColors.color3 = selectedColors.color2 = selectedColors.color4 = s[0][0];
            //\extract colors
           // System.Diagnostics.Debug.WriteLine("the colors"+ selectedColors);
            return selectedColors;
        }
    }

    public class Products
    {
        public static Product AddNewProduct(string category, string image, string name, string des, double price, int amount, int discount)
        {
            int catID = getCategoryID(category);
            Product product = new Product();

            if (catID != -1)
            {
                    product.Name = name;
                    product.Price = price;
                    product.Image = image;
                    product.Description = des;
                    product.Discount = discount;
                    product.Category_ID = category;
                    product.Amount = amount;
                    if (product.Discount != 0)
                    {
                        double i = product.Price * product.Discount / 100;
                        i = product.Price - i;
                        product.PriceAfterDiscount = i;
                    }
                    else { product.PriceAfterDiscount = 0; }
            }
            return product;
        }

        public static Product EditProduct(int id, string category, string image, string name, string des, double price, int amount, int discount)
        {
            int x=1;
            Product product = new Product();
            int catID = getCategoryID(category);
                if (x != 0 && catID != -1)
            {
                product.Name = name;
                product.Description = des;
                product.Price = price;
                product.Amount = amount;
                product.Image = image;
                product.ID = id;
                product.Discount = discount;
                product.Category_ID = category;

                if (discount != 0)
                {
                    double k = price * discount / 100;
                    //k = price - k;
                    product.PriceAfterDiscount = price - k;
                }
                else { product.PriceAfterDiscount = price; }
            }
            return product;
        }

        public static Boolean RemoveProduct(int product_ID)
        {
            Boolean result = true;
           
            return result;
        }

        public static Boolean AddNewCategory(string category)
        {
            bool added = false;
            int catID = getCategoryID(category);
            if (catID == -1)
            {
                added = true;
            }
            return added;
        }

        public static Boolean DeleteCategory(string category)
        {
            bool removed = false;
            int catID = getCategoryID(category);
            if (catID == -1)
            {
                removed = true;
            }
            return removed;
        }

        public static List<Statstic> BestProductsInCategory(int CategoryID)
        {
            List<Statstic> statsticList = new List<Statstic>();
            Statstic statstic = new Statstic();
            for (int i = 0; i < 3; i++)
            {
                statstic = new Statstic();
                statstic.Amount = i + 2;
                statstic.ProductID = i+1;
                statstic.ProductName = "Product " +(i+1);
                statstic.CategoryID = CategoryID;
                statsticList.Add(statstic);
            }
                    return statsticList;
        }

            public static int getCategoryID(string category)
        {
            int id = 1;

            if (category.Equals("New Category") || category.Equals("old Category"))
                id = -1;

            return id;
        }
    }

    public class BuyerOrder
    {
        public static String AddProductToOrder(int OrderID, int ProductID, int Amount, int PreviousAmount)
        {
            int row = 0;
            bool result1 = false;
            bool result2 = false;
            bool error = false;
            if ((PreviousAmount - Amount) < 0)
                error = true;

            if (!error)
            {
                    row = 1;
                
                if (row > 0)
                    result1 = true;
                else result1 = false;
                
                if (row > 0)
                    result2 = true;
                else result2 = false;

                if (result1 && result2)
                    return "true";
                else
                    return "false";
            }
            else
                return "out of stock product";
        }

        public static String CreateOrder(string StoreEmail, string BuyerName, string BuyerPhone, string BuyerEmail, string BuyerLocation, string PaymentMethod, string BankAccount, int OrderID, double TotalPrice)
        {
            Order order = new Order();
            int row = 1;

            if (row > 0)
            {
                order.BuyerName = BuyerName;
                order.BuyerPhone = BuyerPhone;
                order.BuyerEmail = BuyerEmail;
                order.BuyerLocation = BuyerLocation;
                order.PaymentMethod = PaymentMethod;
                order.BankAccount = BankAccount;
                order.TotalPrice = TotalPrice;
                order.StoreEmail = StoreEmail;
                order.OrderID = OrderID;

                return order.ToString();
            }
            else
                return "Failed to make order";
        }

        public static Boolean UpdateOrderStatus(int ID)
        {
            int updated = 1;
            if (updated != 0)
                return true;
            else
                return false;
        }
    }

    public class PaymentMethods
    {
        public static String UpdateBankInfo(string IBAN)
        {
            int success = 0;
            if (IBAN.Length > 14 && IBAN.Length < 35)
            {
                    success = 1;
            }
            if (success != 0)
               return IBAN;
            else
               return "IBAN length must be between 15 and 34";
        }
    }

    public class TemplateData
    {
        public static String UpdatStoreData(string DataType, string NewValue)
        {
            if (DataType.Equals("Store Name") || DataType.Equals("اسم المتجر"))
                DataType = "StoreName";
            else if (DataType.Equals("Store Description") || DataType.Equals("وصف المتجر"))
                DataType = "StoreDescription";
            else if (DataType.Equals("Address") || DataType.Equals("العنوان"))
                DataType = "Location";
            else if (DataType.Equals("Phone") || DataType.Equals("رقم التواصل"))
                DataType = "Phone";
            else if (DataType.Equals("About") || DataType.Equals("عن الموقع"))
                DataType = "About";
            else if (DataType.Equals("Menu Title") || DataType.Equals("عنوان القائمة"))
                DataType = "MenuTitle";
            else DataType = "";

            if (NewValue != null && DataType != "About" && DataType != "")
            {
                return NewValue;
            }
            else if (DataType == "About")
            {
                return NewValue;
            }
            else
            return "Error";
        }
    }
}
