using System;
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
            string email = "asmaa@mail.com";

            //Act
            string actual = BuildingStationLClassLibrary.Published_Stores.Publish(email);

            //Assert
            Assert.AreEqual(expected, actual);
        }

    }
}
