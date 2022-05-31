# smartBallotUI

This project is about combining web3 and Remix IDE. With this combination everyone can create a User Interface for any deployed Smart Contract.

Steps:
1. **Connect** localhost to Remix IDE : `remixd -s YOURPATH --remix-ide https://remix.ethereum.org`
2. **Generate** addresses with Ganache : `ganache-cli -a 100`
3. **Link** Ganache with Remix IDE using web3 provider option.
4. **Compile** and **deploy** the smart contract.
5. **Copy the address** of the deployed smart contract and **replace it in main.js** .
7. **Open index.html with Live Server.**
