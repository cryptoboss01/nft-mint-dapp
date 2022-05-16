import { expect } from "chai";
import { ethers } from "hardhat";

describe("EvolveeNFT", () => {
  let EvolveeNFT, evolveeNft;
  let alice, bob;

  before(async () => {
    EvolveeNFT = await ethers.getContractFactory("EvolveeNFT");
    evolveeNft = await EvolveeNFT.deploy();
    await evolveeNft.deployed();
    
    let signers = (await ethers.getSigners());
    alice = signers[0], bob = signers[1];
  })

  it("Should return the token name", async () => {
    expect(await evolveeNft.name()).to.equal("EvolveeNFT");
  });

  it("Should return the token symbol", async () => {
    expect(await evolveeNft.symbol()).to.equal("EVVNFT");
  });

  it("Should return 0", async () => {
    expect(await evolveeNft.currentCounter()).to.equal(0);
  });

  it("Should return 1 and alice should be the owner of NFT", async () => {
    await evolveeNft.safeMint(alice.address, "...");
    expect(await evolveeNft.currentCounter()).to.equal(1);
    expect(await evolveeNft.ownerOf(0)).to.equal(alice.address);
  });

  it("Should transfer the ownership to bob", async () => {
    await evolveeNft.approve(bob.address, 0);
    await evolveeNft.transferFrom(alice.address, bob.address, 0);
    expect(await evolveeNft.ownerOf(0)).to.equal(bob.address);
  })
});
