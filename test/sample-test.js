const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage", function () {
  it("Should return the new data once it's changed", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.deployed();

    expect(await storage.get()).to.equal(0);

    const setStorageDataTx = await storage.set(22);

    await setStorageDataTx.wait();

    expect(await storage.get()).to.equal(22);
  });
});
