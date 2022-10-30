import fs from 'fs';
import { ethers } from "hardhat";
import { NFTStorage, File } from 'nft.storage';

const { exit } = process;

import MomentoArtifact from "../artifacts/contracts/Momento.sol/Momento.json"

async function main() {
  const [owner] = await ethers.getSigners();

  "0x92e16023C1201aEf432cEb15677791AE03966De6"

  const momento = new ethers.Contract(
    "0x92e16023C1201aEf432cEb15677791AE03966De6",
    MomentoArtifact.abi,
    owner
  )

  const storage = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZGOTMwMEMxNWRmMTIxMEMyRTA4YTVEZWY5OTkwRDM4ZTE1MTNmN0IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzA1NDM4Nzg1NCwibmFtZSI6Im1vbWVudG8ifQ.HIWCpDx1iBfNWkcB-oRH80rMj7ZkQVDKf6F6oLCotok" })

  let data = await fs.promises.readFile("images/04.jpg");

  let metadata = await storage.store({
    name: 'ETH Lisbon #1',
    description: 'ETH Lisbon first report',
    image: new File(
      [
        data
      ],
      'ETH01.jpg',
      { type: 'image/jpg' }
    ),
    properties: {
      type: "image",
      coords: { latitude: 38.71313605277149, longitude: -9.152227110511149 },
      timestamp: 1667053815980,
      rating: 5,
      tags: ["WEB3", "WEB4", "CRYPTO", "CONFERENCE"]
    }
  })
  console.log('NFT data stored!')
  console.log('Metadata URI: ', metadata.url)

  await momento.connect(owner).mint(owner.address, metadata.url)

  console.log("Momento #1 minted");

  metadata = await storage.store({
    name: 'ETH Lisbon #2',
    description: 'ETH Lisbon second report',
    image: new File(
      [
        data
      ],
      'ETH02.jpg',
      { type: 'image/jpg' }
    ),
    properties: {
      type: "image",
      coords: { latitude: 38.71344407248206, longitude: -9.14859145822142 },
      timestamp: 1667053815980,
      rating: 5,
      tags: ["CRYPTO", "CONFERENCE"]
    }
  });
  console.log('NFT data stored!');
  console.log('Metadata URI: ', metadata.url);

  await momento.connect(owner).mint(owner.address, metadata.url);

  console.log("Momento #2 minted");

  metadata = await storage.store({
    name: 'ETH Lisbon #3',
    description: 'ETH Lisbon third report',
    image: new File(
      [
        data
      ],
      'ETH03.jpg',
      { type: 'image/jpg' }
    ),
    properties: {
      type: "image",
      coords: { latitude: 38.7119884065863, longitude: -9.150195998311755 },
      timestamp: 1667053815980,
      rating: 5,
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
