import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const deploy: DeployFunction = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();
	console.log(deployer)
	await deploy("Greeter", {
	  from: deployer,
	  args: ['Hello, Hardhat!'],
	  log: true,
	});
}

export default deploy;

export const tags = ['Greeter'];

