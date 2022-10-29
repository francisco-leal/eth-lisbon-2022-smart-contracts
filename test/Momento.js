import chai from "chai";
import { ethers, waffle } from "hardhat";
import { solidity } from "ethereum-waffle";

import MomentoABI from "../artifacts/contracts/Momento.sol/Momento.json"

chai.use(solidity);

const { expect } = chai;
const { parseUnits } = ethers.utils;
const { deployContract } = waffle;

describe("CommunityUser", () => {
  let creator;
  let addr1;
  let addr2;

  let momentoCollection;

  beforeEach(async () => {
    [creator, addr1, addr2] = await ethers.getSigners();
  });

  it("can be deployed", async () => {
    const action = deployContract(creator, MomentoABI, [
      creator.address,
      "MOMENTO"
    ]);

    await expect(action).not.to.be.reverted;
  });

  const builder = async () => {
    return deployContract(creator, MomentoABI, [
      creator.address,
      "MOMENTO"
    ])
  };

  describe("functions", () => {
    beforeEach(async () => {
      momentoCollection = await builder();
    });

    it("has the given name and symbol", async () => {
      expect(await momentoCollection.name()).to.eq("Momento");
      expect(await momentoCollection.symbol()).to.eq("MOMENTO");
    });

    it("starts with an empty collection", async () => {
      expect(await momentoCollection.totalSupply()).to.eq(0);
      expect(await momentoCollection.balanceOf(creator.address)).to.eq(0);
    });

    it("allows a user to mint a new momento token", async () => {
      await momentoCollection.connect(addr1).mint(addr1.address, "https://avatars.githubusercontent.com/u/31248306?v=4")

      expect(await momentoCollection.ownerOf(1)).to.eq(addr1.address);
    });

    it("allows a owner of the momento token to retrieve the URI", async () => {
      await momentoCollection.connect(addr1).mint(addr1.address, "https://avatars.githubusercontent.com/u/31248306?v=4")

      expect(await momentoCollection.connect(addr1).tokenURI(1)).to.eq("https://avatars.githubusercontent.com/u/31248306?v=4");
    });

    it("does not allow a non-owner of the momento token to retrieve the URI", async () => {
      await momentoCollection.connect(addr1).mint(addr1.address, "https://avatars.githubusercontent.com/u/31248306?v=4")

      const action = momentoCollection.connect(addr2).tokenURI(1);
      await expect(action).to.be.revertedWith("Address is not allowed to view metadata");
    });
  });
});
