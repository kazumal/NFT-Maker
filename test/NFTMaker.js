const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const nftContractFactory = await hre.ethers.getContractFactory("NFTMaker");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  let txn = await nftContract.mintToken(
    deployer.address,
    "https://api.npoint.io/a62125652f1218bffe1a"
  );
  await txn.wait();
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
