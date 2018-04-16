using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestBuildingStation
{
    [TestClass]
    public class BuildingStationUnitTest
    {
        [TestMethod]
        public void Test_ValidLink()
        {
            //Arrange
            bool expected = false;
            string link = "https://www.snap.com/";

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

        public void Test_UnPublish()
        {
            //Arrange
            bool expected = false;
            string email = "sarah@mail.com";

            //Act
            bool actual = BuildingStationLClassLibrary.Published_Stores.UnPublish(email);

            //Assert
            Assert.AreEqual(expected, actual);
        }

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

        public void Test_getLogoColors()
        {
            //Arrange
            List<string> ExpectedColors = new List<string>();
             ExpectedColors[0] = "#DACDC3";
             ExpectedColors[1] = "#D29B74";
             ExpectedColors[2] = "#7D8B90";
             ExpectedColors[3] = "#E0BE73";
            string Logo = @"C:\Users\star7\OneDrive\Desktop\ONLINE SHOPS PIC's\-2- Sweets";


            //Act
             string[] actual = BuildingStationLClassLibrary.LogoColors.GetLogoColors(Logo);

            //Assert
            Assert.AreEqual(ExpectedColors, actual);
        }
    }
}
