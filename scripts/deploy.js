const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("NFTMaker");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("contract deplyed to:", nftContract.address);

  const deployer = "0xa54Bb3324F767B2bdBBb640A7A9BC315cbEA9A89";
  const newOwner = "0xAbFA9136C14641036d8c9Ea4Bebb081B51f64267";
  const tokenURI1 = "ipfs://QmUz6vFVEDuMmj6bqRAGNqzyGvn4KwTW1WaMV918YxzgdB";

  let txn = await nftContract.transferOwnership(newOwner);
  await txn.wait();
  console.log("Owner changed.");

  txn = await nftContract.mintToken(deployer, tokenURI1);
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await nftContract.mintToken(
    newOwner,
    "ipfs://Qme7JkBJqYFjuMVGgEPb9Yb1VFcnLkc4ULY9Fr6Un3cLYu"
  );
  await txn.wait();
  console.log("Minted NFT #2");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
