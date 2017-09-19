# Insurance Linked Securities (ILS) DApp
What are ILS

Cat Bonds
Resilience Bonds

## What is a CAT Bond
From investopedia:

>"A catastrophe bond (CAT) is a high-yield debt instrument that is usually insurance-linked and meant to raise money in case of a catastrophe such as a hurricane or earthquake. It has a special condition that states if the issuer, such as the insurance or reinsurance company, suffers a loss from a particular predefined catastrophe, then its obligation to pay interest and/or repay the principal is either deferred or completely forgiven."

Read more: Catastrophe Bond (CAT) <http://www.investopedia.com/terms/c/catastrophebond.asp#ixzz4t2pXHOIm>

## ILS current business process

* Insurance taker pays a premium to an Insurance company to cover from a natural disaster like hurricane or earthquake
* The Insurance company contact with a Re-Insurance compay
* Re-Insurance company issue bonds that are acquired by investors
* Bond pricipal serve to constitute the risk pool
* Insurance taker premium serve to pay coupon to the bond holders
* If the catastrophe occurs before the bond maturity, then the bond holder loose the principal and cease to receive coupon payments
* If the catastrophe does not occur before the bond maturity, then the bond holder receives the principal back.

Catastrophe trigger
A lot of particpants

- Prototype: Nobody will be sold on an idea alone that anybody could have in a minute. You need something here. Maybe 1-2 slides describing the business processes (see below) with a proof that you can use Ethereum (some code that looks related to your stuff)

Business processes, at least have a hypothesis for:
- as a bondholder how do I get paid? In ETH? If so where is this ETH coming from?
- and as the (re-)insurer how do I pay bond holders?
- as the insurer how do I pay insurance takers? I assume they get fiat money not ETH...
- as the insurer, related to the above, what does this this mean for portfolio management (can I make returns on ETH or do I immediately convert to real money after the ICO and invest the fiat money) and related to that: regulatory capital requirements (depending on how you model it, how does the volatility of ETH come into play..)

Finally, this is more for Mohamed, in terms of blockchain technology, is there anything that you actually have to build specifically once you both have understood the business processes or is this all existing stuff that is already very well understood, just applied in a certain context.


## Blockchain to the rescue
The revisited process will look like:

* Insurance taker pays a premium in fiat currency to an insurance company
* The insurance company issue tokens equivalent to premium payments
* The insurance company issue a bond in the form of a smart contract
* The investors acquires the smart bonds paying the principal in ETH
* The insurance company collects the principals to constitute the risk pool
* The insurance company uses the tokenized preminums to pay coupons to bond holders
* If the catastrophe occurs before the bond maturity, then the bond holder loose the principal and cease to receive coupon payments
* If the catastrophe does not occur before the bond maturity, then the bond holder receives the principal back.


The blockchain will provide security, transparency and automation at lower costs.

### Security
### Transparency
### Automation


### References


## Installation

1. Install truffle:
```
npm install -g truffle
```

2. **clone this repository**
```
git clone https://github.com/tomw1808/truffle_eth_class1.git
```

3. Install testrpc:
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


## Run the Project

then

```
truffle migrate
```

and

```
truffle build
```

or

```
truffle serve
```

which opens an HTTP Server on http://localhost:8080

## Next steps


## Contact
If you run into any problems, don't hesitate to contact us on the course-forum at any time. If you use the forum-search function, there is a high chance that you find the answer to your problem already.
