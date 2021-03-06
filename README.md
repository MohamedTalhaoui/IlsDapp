# Insurance Linked Securities (ILS) DApp
This project is a prototype demonstrating the use of blockchain technology to implement ILS.
Thi prototype is developped on Ethereum blockchain and focus on Cat bonds.

## What is a CAT Bond
From investopedia:

>"A catastrophe bond (CAT) is a high-yield debt instrument that is usually insurance-linked and meant to raise money in case of a catastrophe such as a hurricane or earthquake. It has a special condition that states if the issuer, such as the insurance or reinsurance company, suffers a loss from a particular predefined catastrophe, then its obligation to pay interest and/or repay the principal is either deferred or completely forgiven."

Read more: Catastrophe Bond (CAT) <http://www.investopedia.com/terms/c/catastrophebond.asp#ixzz4t2pXHOIm>

## ILS current business process
The simplifified process look like:

![ILS current process](images/Problem.png)

* Insurance taker pays a premium to an Insurance company to cover from a natural disaster like hurricane or earthquake
* The Insurance company contact with a Re-Insurance compay
* Re-Insurance company issue bonds that are acquired by investors
* Bond pricipal serve to constitute the risk pool
* Insurance taker premium serve to pay coupon to the bond holders
* If the catastrophe occurs before the bond maturity, then the bond holder loose the principal and cease to receive coupon payments
* If the catastrophe does not occur before the bond maturity, then the bond holder receives the principal back.

To keep it simple, bond clearance and settlements is not described, but it is also an important part adding complexity to the process
Read more: Bond clearance and settlement <...>



## Blockchain to the rescue
The revisited process will look like:

![ILS revisited process](images/Solution.png)

* Insurance taker pays a premium in ETH to an insurance company
* The insurance company issue a bond in the form of a smart contract
* The investors acquires the smart bonds paying the principal in ETH
* The insurance company collects the principals to constitute the risk pool
* The insurance company uses the preminums to pay coupons to bond holders
* If the catastrophe occurs before the bond maturity, then the bond holder loose the principal and cease to receive coupon payments
* If the catastrophe does not occur before the bond maturity, then the bond holder receives the principal back.

The whole process is completly hold on-chain, so the blockchain provides security, transparency and automation at lower costs.
Also clearance and settlement are built-in when using the blockchain.


## Install the project

Install truffle:
```
npm install -g truffle
```

clone this repository
```
git clone https://github.com/MohamedTalhaoui/IlsDapp
```

Install testrpc:
```
npm install -g testrpc
```

and run

```
bower install
```

which installs the angular components.

and then run

```
npm install
```

which installs the node components.


## Run the Project locally

Start testrpc

```
testrpc -m "secret" --accounts 50
```

Setup etherum-bridge

```
git clone https://github.com/oraclize/ethereum-bridge
cd ethereum-bridge
node bridge -a 49
```
ref:
http://ethereum.stackexchange.com/questions/11383/oracle-oraclize-it-with-truffle-and-testrpc

Add a custom address resolver
Add OAR = OraclizeAddrResolverI(EnterYourOarCustomAddress);

Migrate the contract

```
truffle migrate
```

and

```
truffle serve
```

which opens an HTTP Server on http://localhost:8080

