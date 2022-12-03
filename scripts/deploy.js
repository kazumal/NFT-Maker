const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("NFTMaker");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("contract deplyed to:", nftContract.address);

  let txn = await nftContract.mintToken(
    "0xAbFA9136C14641036d8c9Ea4Bebb081B51f64267",
    "ipfs://QmUz6vFVEDuMmj6bqRAGNqzyGvn4KwTW1WaMV918YxzgdB"
  );
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await nftContract.mintToken(
    "0xAbFA9136C14641036d8c9Ea4Bebb081B51f64267",
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
