import hre from "hardhat";

async function main() {

    const { ethers } = await hre.network.connect();

    const Token = await ethers.getContractFactory("KPPToken");
    const token = await Token.deploy();
    await token.waitForDeployment();

    console.log("KPPToken deployed to:", token.target);

    const Points = await ethers.getContractFactory("KPPPoints");
    const points = await Points.deploy(token.target);
    await points.waitForDeployment();

    console.log("KPPPoints deployed to:", points.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
