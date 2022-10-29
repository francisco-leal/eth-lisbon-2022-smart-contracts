import { ethers } from "hardhat";

const { exit } = process;

async function main() {
  const [owner] = await ethers.getSigners();

  const Momento = await ethers.getContractFactory("Momento");

  const momento = await Momento.deploy(owner.address, "MOMENTO");
  await momento.deployed();

  console.log("Momento contract deployed: ", momento.address);

  await momento.connect(owner).mint(owner.address, "https://avatars.githubusercontent.com/u/31248306?v=4")

  console.log("Momento minted");
}

main()
  .then(() => exit(0))
  .catch((error) => {
    console.error(error);
    exit(1);
  });
