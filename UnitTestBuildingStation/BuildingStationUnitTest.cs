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
    }
}
