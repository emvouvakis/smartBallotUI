# smartBallotUI

This project is about combining web3 and Remix IDE. With this combination everyone can create a User Interface for any deployed Smart Contract. The smart contract created here is a variation of the 3_Ballot.sol in Remix IDE.

Steps:
1. **Connect** localhost to Remix IDE : `remixd -s YOURPATH --remix-ide https://remix.ethereum.org`
2. **Generate** addresses with Ganache : `ganache-cli -a 100`
3. **Link** Ganache with Remix IDE using web3 provider option.
4. **Compile** and **deploy** the smart contract.
5. **Copy the address** of the deployed smart contract and **replace it in main.js** .
7. **Open index.html with Live Server.**

Sneak peek at the User Interface:
1. Access all addresses:
![addresses](https://user-images.githubusercontent.com/86418773/171160467-3188abf7-62e3-4857-bb1e-90566ab08e87.png)
2. Random vote:
![vote](https://user-images.githubusercontent.com/86418773/171160607-024bd948-1945-49c4-97a2-7929c55679ef.png)
3. Show results:
![Results](https://user-images.githubusercontent.com/86418773/171159840-db241731-7e0a-41f1-89bc-795832b5386c.png)
