pragma solidity ^0.4.0;
import "./usingOraclize.sol";

contract IlsContract is usingOraclize {

  address private owner;
  
  enum State{active, matur, triggered}

  struct Issuer {
    bool exists;
    string name;
  }
  mapping(address => Issuer) private issuers;

  struct Investor {
    bool exists;
    string name;
  }
  mapping(address => Investor) private investors;
  
  struct CatBond {
    uint id;
    address issuer;
    uint principal;
    uint termInMonths;
    uint rate;
    uint cityKey;
    State state;
  }
  mapping(uint => CatBond) private bonds;
  uint bondCount;

  struct PortfolioLine {
    uint quantity;
  }
  struct Portfolio {
    // bondId -> quantity
    mapping(uint => PortfolioLine) lines;
  }
  mapping(address => Portfolio) private portolios;

  mapping(bytes32 => uint) private checks;


  event BondIssued(uint bondId);
  event MaturityReached(uint bondId);
  event CatastropheOccured(uint windSpeed);
  event newOraclizeQuery(string description);

  function IlsContract() {
    owner = msg.sender;
    OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
  }  

  function __callback(bytes32 queryId, string strWindSpeed) {
      if (msg.sender != oraclize_cbAddress()) throw;
      var windSpeed = parseInt(strWindSpeed);
      if(windSpeed > 100) {
        CatastropheOccured(windSpeed);        
      } else {
        checkTriggerCondition(checks[queryId]);
      }
  }

  function checkTriggerCondition(uint _bondId) payable {
      if (oraclize_getPrice("URL") > this.balance) {
          newOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
      } else {
          newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
          var bond = bonds[_bondId];
          var queryId = oraclize_query("URL", strConcat(
            "json(http://dataservice.accuweather.com//currentconditions/v1/", 
            uint2str(bond.cityKey), 
            "?apikey=PiXAx3gAdDyWqnGA46tYKBbComtv1TL2&details=true)[0].Wind.Speed.Metric.Value")
          );
          checks[queryId] = _bondId;
      }
  }

  function registerInvestor(address _address, string _name){
    if(msg.sender==owner) {
      investors[_address] = Investor(true, _name);
    }
  }

  function registerIssuer(address _address, string _name){
    if(msg.sender==owner) {
      issuers[_address] = Issuer(true, _name);
    }
  }

  function issue(uint _principal, uint _termInMonths, uint _rate, uint _cityKey) returns (uint)  {
    //if(isIssuer(msg.sender)) {
      var bondId = bondCount++;
      bonds[bondId] = CatBond(bondId, msg.sender, _principal, _termInMonths, _rate, _cityKey, State.active);
      BondIssued(bondId);
      return bondCount;      
    //}
  } 

  function subscribe(uint _bondId, uint _quantity) {
    if(isInvestor(msg.sender)) {
      var bond = bonds[_bondId];
      var amount = _quantity * bond.principal;
      if(this.balance >= amount) {
        //Pay the principal to the bond issuer
        if(!bond.issuer.send(amount)) {
          throw;
        }
        // Add bond to the investor's portfolio
        var portfolio = portolios[msg.sender];
        portfolio.lines[_bondId].quantity += _quantity;
      }
    }
  }

 function buy(uint _bondId, uint _quantity, address _buyer) {
    var seller = msg.sender;
    if(isInvestor(seller) && isInvestor(_buyer)) {
      var bond = bonds[_bondId];
      var amount = _quantity * bond.principal;
      var sellerPortfolio = portolios[seller];
      if(this.balance >= amount && haveEnoughBonds(seller, _bondId, _quantity) ) {
        //Pay the principal to the bond issuer
        if(!_buyer.send(amount)) {
          throw;
        }
        // Add bonds to the buyer's portfolio
        var buyerPortfolio = portolios[_buyer];
        buyerPortfolio.lines[_bondId].quantity += _quantity;
        // remove bonds from the seller's portfolio
        sellerPortfolio.lines[_bondId].quantity -= _quantity;
      }
    }
  }

  function isIssuer(address _caller) constant returns (bool) {
    return issuers[_caller].exists;
  }

  function isInvestor(address _caller) constant returns (bool) {
    return investors[_caller].exists;
  }

  function haveEnoughBonds(address _investor, uint _bondId, uint _quantity) constant returns (bool){
    var line = portolios[_investor].lines[_bondId];
    return line.quantity >= _quantity;
  }

  function kill() {
    if(msg.sender == owner) {
      suicide(owner);
    }
  }
}