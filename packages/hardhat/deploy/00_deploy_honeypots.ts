import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
 
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
   
  const HoneyPotcontract = await deploy("HoneyPot", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  await hre.run("verify:verify", {
    address: HoneyPotcontract.address,
    constructorArguments: [],
  });

  const Loggercontract = await deploy("Logger", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  await hre.run("verify:verify", {
    address: Loggercontract.address,
    constructorArguments: [],
  });

  const your_contract = await deploy("Bank", {
    from: deployer,
    // Contract constructor arguments
    args: [HoneyPotcontract.address],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
   

  await hre.run("verify:verify", {
    address: your_contract.address,
    constructorArguments: [HoneyPotcontract.address],
  });
 
  const Attackcontract = await deploy("Attack", {
    from: deployer,
    // Contract constructor arguments
    args: [your_contract.address],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });


  await hre.run("verify:verify", {
    address: Attackcontract.address,
    constructorArguments: [your_contract.address],
  });
  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["Bank"];
deployYourContract.tags = ["HoneyPot"];
deployYourContract.tags = ["Logger"];
deployYourContract.tags = ["Attack"];