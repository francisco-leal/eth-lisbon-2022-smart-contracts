import fs from 'fs';
import { ethers } from "hardhat";
import { NFTStorage, File } from 'nft.storage';

const { exit } = process;

async function main() {
  const [owner] = await ethers.getSigners();

  const Momento = await ethers.getContractFactory("Momento");

  const momento = await Momento.deploy(owner.address, "MOMENTO");
  await momento.deployed();

  console.log("Momento contract deployed: ", momento.address);

  const storage = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZGOTMwMEMxNWRmMTIxMEMyRTA4YTVEZWY5OTkwRDM4ZTE1MTNmN0IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzA1NDM4Nzg1NCwibmFtZSI6Im1vbWVudG8ifQ.HIWCpDx1iBfNWkcB-oRH80rMj7ZkQVDKf6F6oLCotok" })

  let data = await fs.promises.readFile("images/01.jpg");

  let metadata = await storage.store({
    name: 'Momento - the first',
    description: 'The actual first event that has happened in the momento ecosystem. Lorem ipsum, Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum',
    image: new File(
      [
        data
      ],
      '01.jpg',
      { type: 'image/jpg' }
    ),
    properties: {
      type: "image",
      coords: { latitude: 38.71324477396179, longitude: -9.15018940759991 },
      timestamp: 1667053815980,
      tags: ["WEB3", "WEB4", "CRYPTO", "CONFERENCE"]
    }
  })
  console.log('NFT data stored!')
  console.log('Metadata URI: ', metadata.url)

  await momento.connect(owner).mint(owner.address, metadata.url)

  console.log("Momento #1 minted");

  data = await fs.promises.readFile("images/02.jpg");

  metadata = await storage.store({
    name: 'Momento - the second',
    description: 'The actual second event that has happened in the momento ecosystem. Lorem ipsum, Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum',
    image: new File(
      [
        data
      ],
      '03.jpg',
      { type: 'image/jpg' }
    ),
    properties: {
      type: "image",
      coords: { latitude: 39.71324477396179, longitude: -10.15018940759991 },
      timestamp: 1667053815980,
      tags: ["CRYPTO", "CONFERENCE"]
    }
  });
  console.log('NFT data stored!');
  console.log('Metadata URI: ', metadata.url);

  await momento.connect(owner).mint(owner.address, metadata.url);

  console.log("Momento #2 minted");

  data = await fs.promises.readFile("images/03.jpg");

  metadata = await storage.store({
    name: 'Momento - the third',
    description: 'The actual third event that has happened in the momento ecosystem. Lorem ipsum, Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum',
    image: new File(
      [
        data
      ],
      '03.jpg',
      { type: 'image/jpg' }
    ),
    properties: {
      type: "image",
      coords: { latitude: 38.71324477396179, longitude: -10.15018940759991 },
      timestamp: 1667053815980,
      tags: []
    }
  });
  console.log('NFT data stored!');
  console.log('Metadata URI: ', metadata.url);

  await momento.connect(owner).mint(owner.address, metadata.url);

  console.log("Momento #3 minted");
}

main()
  .then(() => exit(0))
  .catch((error) => {
    console.error(error);
    exit(1);
  });
