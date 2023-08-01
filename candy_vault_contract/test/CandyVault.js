const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CandyVault Contract", function () {
  let candyVault;
  let CandyVault;
  let vaultBalance = 250;

  beforeEach(async function(){
    CandyVault = await ethers.getContractFactory("CandyVault");
    candyVault = await CandyVault.deploy();
  })
  
  describe("Testing Essentials", function () {

    it("Should get the candy vault balance", async function () {
      expect(await candyVault.getCandyVaultBalance()).to.equal(vaultBalance);
    });

    it("Refill Candy Vault", async function () {
      await candyVault.refillCandyVault(20);
      expect(await candyVault.getCandyVaultBalance()).to.equal(vaultBalance + 20);
    });

    it("Buy Candy", async function () {
      const amount = 2;
      const total = ethers.parseEther("0.02");
      expect(await candyVault.buyCandy(amount, {value: total})).to.not.be.reverted;
      expect(await candyVault.buyCandy(0, {value: total})).to.be.revertedWith("Invalid purchase");
    });

    it("Set the price of the candy", async function () {
      const price = ethers.parseEther("2");
      await candyVault.setCandyPrice(price);
      const candyPrice = await candyVault.getCandyPrice();
      expect(price).to.equal(candyPrice);
      console.log(await candyVault.getCandyPrice());
    });
  });
});
