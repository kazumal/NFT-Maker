const main = async () => {
  const [deployer, holder1] = await hre.ethers.getSigners();
  const nftContractFactory = await hre.ethers.getContractFactory("NFTMaker");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  let txn = await nftContract.mintToken(deployer.address, "");
  await txn.wait();

  console.log("#1 NFT is minted");

  txn = await nftContract.trasnferNFT(deployer.address, holder1.address, 1);
  await txn.wait();
  console.log("transfer is successed");
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
