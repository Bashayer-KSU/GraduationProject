using System;
using System.Collections.Generic;
using BuildingStationLClassLibrary;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestBuildingStation
{
    [TestClass]
    public class BuildingStationUnitTest
    {
        [TestMethod]
        public void Test_Register()
        {
            //Arrange
            bool expected = true;
            string name = "maha";
            string email = "maha@gmail.com";
            string password = "1210902Maha22";
            string phone = "0502331130";
            
            //Act
            bool actual = BuildingStationLClassLibrary.RegisterLogin.Register(name, email, password, phone);

            //Assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void Test_AddStoreType()
        {
            //Arrange
            Store expected = new Store();
            expected.Description = "Sweets made with love and passion 🎂💓";
            expected.Type = "desserts";
            string enteredType = "Desserts";
            string language = "English";

            //Act
            Store actual = BuildingStationLClassLibrary.CreationStage.AddStoreType(enteredType, language);

            //Assert
            Assert.AreEqual(expected.Description, actual.Description);
            Assert.AreEqual(expected.Type, actual.Type);
        }

        [TestMethod]
        public void Test_ValidLink()
        {
            //Arrange
            bool expected = false;
            string link = "https://www.snap.com/asmaa";

            //Act
        bool actual = BuildingStationLClassLibrary.ShowHideElement.ValidLink(link);

            //Assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void Test_PublishRequest()
        {
            //Arrange
            string expected = "No Payment Methods";
            string email = "asmaa@mail.com";

            //Act
            string actual = BuildingStationLClassLibrary.Published_Stores.PublishRequest(email);

            //Assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void Test_Publish()
        {
            //Arrange
            string expected = "SarahSweets";
            string email = "sarah@mail.com";

            //Act
            string actual = BuildingStationLClassLibrary.Published_Stores.Publish(email);

            //Assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void Test_UnPublishRequest()
        {
            //Arrange
            bool expected = false;
            string email = "asmaa@mail.com";

            //Act
            bool actual = BuildingStationLClassLibrary.Published_Stores.UnPublishRequest(email);

            //Assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void Test_UnPublish()
        {
            //Arrange
            bool expected = true;
            string email = "sarah@mail.com";

            //Act
            bool actual = BuildingStationLClassLibrary.Published_Stores.UnPublish(email);

            //Assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void Test_DeleteStore()
        {
            //Arrange
            string expected = "incorrect password";
            string email = "sarah@mail.com";
            string password = "12e39o405";
            //Act
            string actual = BuildingStationLClassLibrary.Published_Stores.DeleteStore(email, password);
            //Assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void Test_GetWebsiteColors()
        {
            //Arrange
            Colors Expected = new Colors();
             Expected.color1 = "#7092BF";
             Expected.color2 = "#B97B56";
             Expected.color3 = "#FDECA6";
             Expected.color4 = "#545454";
            string Logo = @"C:\Users\star7\OneDrive\Desktop\ONLINE SHOPS PIC's\-2- Sweets/Test-logo.jpg";

            //Act
            Colors actual = BuildingStationLClassLibrary.LogoColors.GetWebsiteColors(Logo);
            // System.Diagnostics.Debug.WriteLine("the colors" + actual);
            //Console.Write("the colors hhhhheeeeeeeerrrrrreee"+ actual);
            //Assert
            //Assert.AreEqual(Expected, actual);
            Assert.AreEqual(Expected.color1, actual.color1);
            Assert.AreEqual(Expected.color2, actual.color2);
            Assert.AreEqual(Expected.color3, actual.color3);
            Assert.AreEqual(Expected.color4, actual.color4);

        }

        [TestMethod]
        public void Test_AddNewProduct()
        {
            //Arrange
            Product Expeted = new Product();
            Expeted.Name = "test product";
            Expeted.Price = 80;
            Expeted.Image = "C:Sweets";
            Expeted.Description = "test Description";
            Expeted.Discount = 10;
            Expeted.Category_ID = "test Category";
            Expeted.Amount = 5;
            Expeted.PriceAfterDiscount = 80 - (80 * 10 / 100);
            //Act
            Product actual = BuildingStationLClassLibrary.Products.AddNewProduct("test Category", "C:Sweets", "test product", "test Description", 80, 5, 10);
            //Assert
            // Assert.AreEqual(Expeted, actual);
            Assert.AreEqual(Expeted.Name, actual.Name);
            Assert.AreEqual(Expeted.Price, actual.Price);
            Assert.AreEqual(Expeted.Image, actual.Image);
            Assert.AreEqual(Expeted.Description, actual.Description);
            Assert.AreEqual(Expeted.Discount, actual.Discount);
            Assert.AreEqual(Expeted.Category_ID, actual.Category_ID);
            Assert.AreEqual(Expeted.Amount, actual.Amount);
            Assert.AreEqual(Expeted.PriceAfterDiscount, actual.PriceAfterDiscount);
        }

       [TestMethod]
        public void Test_EditProduct()
        {
            //Arrange
            Product Expeted = new Product();
            Expeted.Name = "test product";
            Expeted.Price = 50;
            Expeted.Image = "image";
            Expeted.Description = "test Description";
            Expeted.Discount = 20;
            Expeted.ID = 1;
            Expeted.Category_ID = "test Category";
            Expeted.Amount = 3;
            Expeted.PriceAfterDiscount = 50 - (50 * 20 / 100);
            //Act
            Product actual = BuildingStationLClassLibrary.Products.EditProduct(1, "test Category", "image", "test product", "test Description", 50, 3, 20);
            //Assert
            Assert.AreEqual(Expeted.Amount, actual.Amount);
            Assert.AreEqual(Expeted.Category_ID, actual.Category_ID);
            Assert.AreEqual(Expeted.Description, actual.Description);
            Assert.AreEqual(Expeted.Discount, actual.Discount);
            Assert.AreEqual(Expeted.Image, actual.Image);
            Assert.AreEqual(Expeted.Name, actual.Name);
            Assert.AreEqual(Expeted.Price, actual.Price);
            Assert.AreEqual(Expeted.ID, actual.ID);
            Assert.AreEqual(Expeted.PriceAfterDiscount, actual.PriceAfterDiscount);
        }

        [TestMethod]
        public void Test_RemoveProduct()
        {
            //Arrange
            bool Expeted = true;
            //Act
            bool actual = BuildingStationLClassLibrary.Products.RemoveProduct(2);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }
       
        [TestMethod]
        public void Test_AddNewCategory()
        {
            //Arrange
            bool Expeted = true;
            string CategoryName = "New Category";

            //Act
            bool actual = BuildingStationLClassLibrary.Products.AddNewCategory(CategoryName);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }
        
        [TestMethod]
        public void Test_DeleteCategory()
        {
            //Arrange
            bool Expeted = true;
            string CategoryName = "old Category";
            //Act
            bool actual = BuildingStationLClassLibrary.Products.DeleteCategory(CategoryName);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }

        [TestMethod]
        public void Test_BestProductsInCategory()
        {
            //Arrange
            int CategoryID = 1;
            List<Statstic> Expeted = new List<Statstic>();
            Statstic statstic1 = new Statstic();
            statstic1.Amount = 7;
            statstic1.ProductID = 1;
            statstic1.ProductName = "Product 1";
            statstic1.CategoryID = CategoryID;
            Expeted.Add(statstic1);
            Statstic statstic2 = new Statstic();
            statstic2.Amount = 8;
            statstic2.ProductID = 2;
            statstic2.ProductName = "Product 2";
            statstic2.CategoryID = CategoryID;
            Expeted.Add(statstic2);
            Statstic statstic3 = new Statstic();
            statstic3.Amount = 9;
            statstic3.ProductID = 3;
            statstic3.ProductName = "Product 3";
            statstic3.CategoryID = CategoryID;
            Expeted.Add(statstic3);
            //Act
            List<Statstic> actual = BuildingStationLClassLibrary.Products.BestProductsInCategory(CategoryID);
            //Assert
            Assert.AreEqual(Expeted[0].CategoryID, actual[0].CategoryID);
            Assert.AreEqual(Expeted[0].ProductID, actual[0].ProductID);
            Assert.AreEqual(Expeted[0].ProductName, actual[0].ProductName);
            Assert.AreEqual(Expeted[0].Amount, actual[0].Amount);

            Assert.AreEqual(Expeted[1].CategoryID, actual[1].CategoryID);
            Assert.AreEqual(Expeted[1].ProductID, actual[1].ProductID);
            Assert.AreEqual(Expeted[1].ProductName, actual[1].ProductName);
            Assert.AreEqual(Expeted[1].Amount, actual[1].Amount);

            Assert.AreEqual(Expeted[2].CategoryID, actual[2].CategoryID);
            Assert.AreEqual(Expeted[2].ProductID, actual[2].ProductID);
            Assert.AreEqual(Expeted[2].ProductName, actual[2].ProductName);
            Assert.AreEqual(Expeted[2].Amount, actual[2].Amount);
        }

        [TestMethod]
        public void Test_ShowHideSection()
        {
            //Arrange
            bool Expeted = true;
            string section = "Slider";
            string action = "Show";

            //Act
            bool actual = BuildingStationLClassLibrary.ShowHideElement.ShowHideSection(section, action);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }

        [TestMethod]
        public void Test_ShowHideIcon()
        {
            //Arrange
            bool Expeted = true;
            string icon = "Facebook";
            string action = "Hide";

            //Act
            bool actual = BuildingStationLClassLibrary.ShowHideElement.ShowHideIcon(icon, action);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }

        [TestMethod]
        public void Test_AddProductToOrder()
        {
            //Arrange
            string Expeted = "out of stock product";
            int OrderID = 1;
            int ProductID = 7; 
            int Amount = 10;
            int PreviousAmount = 8;

            //Act
            string actual = BuildingStationLClassLibrary.BuyerOrder.AddProductToOrder(OrderID, ProductID, Amount, PreviousAmount);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }

        [TestMethod]
        public void Test_CreateOrder()
        {
            //Arrange
            Order order = new Order();

            order.BuyerName = "buyer name";
            order.BuyerPhone = "0502331135";
            order.BuyerEmail = "buyer@mail.com";
            order.BuyerLocation = "riyadh 6948";
            order.PaymentMethod = "cash";
            order.BankAccount = "";
            order.TotalPrice = 70.00;
            order.StoreEmail = "sarah@mail.com";
            order.OrderID = 1;

            string Expeted = order.ToString();

            //Act
            string actual = BuildingStationLClassLibrary.BuyerOrder.CreateOrder("sarah@mail.com", "buyer name", "0502331135", "buyer@mail.com", "riyadh 6948", "cash", "", 1, 70.00);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }

        [TestMethod]
        public void Test_UpdateOrderStatus()
        {
            //Arrange
            bool Expeted = true;
            int OrderID = 1;
            //Act
            bool actual = BuildingStationLClassLibrary.BuyerOrder.UpdateOrderStatus(OrderID);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }

        [TestMethod]
        public void Test_UpdateStoreData()
        {
            //Arrange
            string Expeted = "Sweets Dishes";
            string DataType = "Menu Title";
            string NewValue = "Sweets Dishes";
            //Act
            string actual = BuildingStationLClassLibrary.TemplateData.UpdateStoreData(DataType, NewValue);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }

        [TestMethod]
        public void Test_UpdateBankInfo()
        {
            // "IBAN length must be between 15 and 34 and shall contain no spaces or special characters"
            //Arrange
            string Expeted = "143456789879766SD";
            string IBAN = "143456789879766SD";
            //Act
            string actual = BuildingStationLClassLibrary.PaymentMethods.UpdateBankInfo(IBAN);
            //Assert
            Assert.AreEqual(Expeted, actual);
        }
    }
}