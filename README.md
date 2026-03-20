# Sample Hardhat 3 Beta Project (`node:test` and `viem`)

This project showcases a Hardhat 3 Beta project using the native Node.js test runner (`node:test`) and the `viem` library for Ethereum interactions.

To learn more about the Hardhat 3 Beta, please visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3). To share your feedback, join our [Hardhat 3 Beta](https://hardhat.org/hardhat3-beta-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new) in our GitHub issue tracker.

## Project Overview

This example project includes:

- A simple Hardhat configuration file.
- Foundry-compatible Solidity unit tests.
- TypeScript integration tests using [`node:test`](nodejs.org/api/test.html), the new Node.js native test runner, and [`viem`](https://viem.sh/).
- Examples demonstrating how to connect to different types of networks, including locally simulating OP mainnet.

## Usage

### Running Tests

To run all the tests in the project, execute the following command:

```shell
npx hardhat test
```

You can also selectively run the Solidity or `node:test` tests:

```shell
npx hardhat test solidity
npx hardhat test nodejs
```

### Make a deployment to Sepolia

This project includes an example Ignition module to deploy the contract. You can deploy this module to a locally simulated chain or to Sepolia.

To run the deployment to a local chain:

```shell
npx hardhat ignition deploy ignition/modules/Counter.ts
```

To run the deployment to Sepolia, you need an account with funds to send the transaction. The provided Hardhat configuration includes a Configuration Variable called `SEPOLIA_PRIVATE_KEY`, which you can use to set the private key of the account you want to use.

You can set the `SEPOLIA_PRIVATE_KEY` variable using the `hardhat-keystore` plugin or by setting it as an environment variable.

To set the `SEPOLIA_PRIVATE_KEY` config variable using `hardhat-keystore`:

```shell
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

After setting the variable, you can run the deployment with the Sepolia network:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```
# Tech-society KPP
 # Kaiitzn Pocket Pay (KPP)
### Campus Micro-Payments & Rewards Platform on Stellar

## 🌍 Overview
Kaiitzn Pocket Pay (KPP) is a campus-first micro-payments and rewards platform built on the Stellar network, designed to turn everyday student activities into an on-chain earning and spending ecosystem.
Instead of being just another crypto wallet, KPP acts as a **campus economy layer** where students can earn value through meaningful contributions and spend it within a closed, high-trust environment.
By focusing on small, frequent interactions such as tasks, referrals, and shared services, KPP integrates naturally into student life while demonstrating a real-world, high-frequency use case of blockchain.

## ❗ Problem Statement

In campus environments, students constantly contribute to events, projects, and peer support systems. However, these contributions are:

- Often unrewarded or inconsistently compensated  
- Tracked informally through chats or spreadsheets  
- Lacking transparency and trust  

Additionally, there is no unified system for:

- Micro-earnings  
- Peer-to-peer campus payments  
- Structured reward distribution  

This results in lost value, reduced motivation, and lack of verifiable contribution records.

## 💡 Solution

KPP introduces a **closed-loop campus economy powered by Stellar**, where students can:

- Earn rewards for completing tasks and contributing to the community  
- Convert earned points into Stellar-based assets (XLM or custom tokens)  
- Spend tokens on campus services and peer-to-peer payments  
- Track all activity transparently through on-chain records  

This creates a seamless **Earn → Convert → Spend → Track** cycle embedded into daily student life.

## ⚙️ Core Features

- 🎯 Task-based earning system for campus contributions  
- 🪙 On-chain points tracking via smart contracts  
- 🔄 Points-to-token conversion using inter-contract calls  
- 💸 Peer-to-peer payments (QR + wallet integration)  
- 📊 Transaction history and balance tracking  
- 📱 Mobile-responsive interface for real-world usability  

## 🏗️ Architecture

KPP is designed with a modular, production-oriented architecture:

### 1. Points Contract
- Tracks student contributions and rewards  
- Maintains on-chain record of earned points  

### 2. Token Contract
- Represents KPP token (Stellar asset)  
- Used for payments and value transfer within the ecosystem  

### 3. Conversion Logic (Inter-Contract Calls)
- Enables secure conversion of points into tokens  
- Demonstrates advanced contract interaction patterns  

### 4. Frontend Layer
- Built with React  
- Integrates Stellar Wallet Kit for seamless wallet connectivity  
- Provides real-time feedback on balances and transactions  

## 🔄 How It Works

1. Students complete tasks (e.g., helping clubs, referrals, contributions)  
2. Earn KPP Points (on-chain tracked)  
3. Convert points into KPP Tokens or XLM  
4. Use tokens for:
   - Food orders (canteens)  
   - Bicycle sharing  
   - Power bank sharing  
   - Book/notes exchange  
   - Peer-to-peer payments  
5. Track all transactions and balances in real time  

## 💰 Cashout Mechanism

At the end of the semester:

- Unused rewards can be converted into XLM or stable assets  
- Users can off-ramp via existing Stellar-compatible wallets or exchanges  
- Funds can be transferred to bank accounts or UPI externally  

KPP does not directly handle fiat, keeping regulatory complexity minimal.

## 🎯 Real-World Use Cases

- Campus task rewards (design, development, event support)  
- Micro-payments between students  
- Shared resource economy (cycles, power banks, notes)  
- Contribution tracking for resumes and portfolios  

Future Scope (Level 5 & 6)
Real student onboarding and usage analytics
Campus-level adoption and scaling
Multi-campus deployment model
Advanced reward mechanisms and incentives
Error tracking and performance monitoring
### Planned Enhancements:
- Integration with real campus services (canteens, libraries, rentals)
- QR-based payments for instant transactions
- Role-based task system for clubs and startups
- Analytics dashboard for tracking user activity
- Expansion to multiple campuses as a reusable model

### Flow:

User → Completes Task → Earns Points  
Points Stored On-Chain → Converted to Tokens  
Token Minted via KPPToken Contract  

## ⚡ Why Stellar?

KPP leverages Stellar for:
- Low transaction fees (ideal for micro-payments)  
- Fast settlement times  
- Native asset support  
- Real-world financial interoperability  

This makes it ideal for high-frequency, low-value transactions in student ecosystems.

## 🔗 Live Demo

Frontend: [Vercel / Netlify Link Here]

## 📱 Screenshots

- Mobile Responsive View  
- Dashboard Interface  
- Payment Flow (QR / Wallet)  

### 🧾 Contract Compilation
Shows successful compilation of smart contracts using Hardhat.
![Compilation Screenshot](./screenshots/compile.png)

### 🔗 Inter-Contract Call
Proof of interaction between KPPPoints and KPPToken contracts.
![Inter-contract Screenshot](./screenshots/intercontract.png)

### 📂 Project Structure
Overview of project folders and files.
![Structure Screenshot](./screenshots/structure.png)

### ⚙️ Local Node Running
Hardhat local blockchain running with test accounts.
![Node Screenshot](./screenshots/node.png)

### 📱 Mobile Responsive View
GitHub repository viewed in mobile format.
![Mobile View](./screenshots/mobile.png)

## ⚙️ CI/CD Pipeline
CI/CD is configured using GitHub Actions to ensure production readiness:

- Automated builds  
- Code validation  
- Deployment checks  

(CI/CD badge or screenshot folder)

## 🔐 Smart Contract Details

- Points Contract Address: [To be added]  
- Token Contract Address: [To be added]  
- Transaction Hash (Inter-contract call): [To be added] 

## Author Details
Twisha Shriyam
IIT Madras BS
Built under Rise In with Stellar (Started: 14th Feb 2026)

## 🔧 Local Testing (Simulation)
The KPP system was tested locally using Hardhat.

### Flow Simulated:

1. Deploy KPPToken contract (campus currency)
2. Deploy KPPPoints contract (reward system)
3. Add points to a user (simulating task completion)
4. Convert points into KPP tokens
5. Verify token balance update

### Expected Output:
Deployer: 0x...
KPPToken deployed at: 0x...
KPPPoints deployed at: 0x...

Added 100 points
Converted 50 points
Final Token Balance: 50

### Key Highlight:
The conversion logic uses an inter-contract call:
`IKPPToken(tokenAddress).mint(msg.sender, amount);`

This ensures:
- Points are deducted securely
- Tokens are minted via a separate contract
- System remains modular and extensible

## 🧪 Local Setup
```bash
git clone <repo-link>
cd kaiitzn-kpp
npm install
npm run dev
