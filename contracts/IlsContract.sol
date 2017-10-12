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
    uint initialQuantity;
    uint remainingQuantity;
    State state;
  }
  mapping(uint => CatBond) private bonds;
  uint bondCount;

  struct Line {
    uint quantity;
    uint quantityForSale;
    uint sellPrice;
  }

  struct Portfolio {
    // bondId -> quantity
    mapping(uint => Line) lines;
  }
  
  mapping(address => Portfolio) private portolios;

  // Oraclize query id -> bond id
  mapping(bytes32 => uint) private queries;

  mapping(uint => string) private conditions;


  event BondIssued(uint bondId, address issuer, uint quantity);
  event BondSubscribed(uint bondId, address investor, uint quantity, uint remainingQuantity);
  event BondSaleOffer(uint bondId, address investor, uint quantity, uint price);
  event MaturityReached(uint bondId);
  event CatastropheOccured(uint windSpeed);
  event newOraclizeQuery(string description);
  event WeatherCheckReceived(uint bondId, uint cityKey, string windSpeed);

  function IlsContract() {
    owner = msg.sender;
    OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
  }  

  function __callback(bytes32 queryId, string strWindSpeed) {
      if (msg.sender != oraclize_cbAddress()) throw;
      var windSpeed = parseInt(strWindSpeed);
      if(windSpeed > 100) {
        CatastropheOccured(windSpeed);        
      }
      var bond = bonds[queries[queryId]];
      conditions[bond.cityKey] = strWindSpeed;
      WeatherCheckReceived(bond.id, bond.cityKey, strWindSpeed);
  }

  function getConditionForBond(uint _bondId) constant returns (string){
    return conditions[bonds[_bondId].cityKey];
  }

  function checkWeatherCondition(uint _bondId) payable {
      if (oraclize_getPrice("URL") > this.balance) {
          newOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
      } else {
          newOraclizeQuery("Oraclize query was sent, standing by for the answer...");
          var bond = bonds[_bondId];
          var queryId = oraclize_query("URL", strConcat(
            "json(http://api.openweathermap.org/data/2.5/weather?id=", 
            uint2str(bond.cityKey), 
            "&APPID=ecfbdb6fcf21df82d26c2a94b0ad3556).wind.speed")
          );
          
          queries[queryId] = _bondId;
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

  function issue(uint _principal, uint _termInMonths, uint _rate, uint _cityKey, uint _quantity) returns (uint)  {
    //if(isIssuer(msg.sender)) {
      var bondId = bondCount++;
      bonds[bondId] = CatBond(bondId, msg.sender, _principal, _termInMonths, _rate, _cityKey, _quantity, _quantity, State.active);
      BondIssued(bondId, msg.sender, _quantity);
      return bondCount;      
    //}
  } 

  function subscribe(uint _bondId, uint _quantity) payable {
    //if(isInvestor(msg.sender)) {
      var bond = bonds[_bondId];
      var amount = _quantity * bond.principal;

      if(bonds[_bondId].remainingQuantity >= _quantity && msg.value >= amount) {
        //Pay the principal to the bond issuer
        if(!bond.issuer.send(amount)) {
          throw;
        }
        // Add bond to the investor's portfolio
        var portfolio = portolios[msg.sender];
        var line = portfolio.lines[_bondId];
        line.quantity += _quantity;
        bonds[_bondId].remainingQuantity -= _quantity;
        BondSubscribed(_bondId, msg.sender, _quantity, bonds[_bondId].remainingQuantity);
      } 
    //}
  }

  function offerForSale(uint _bondId, uint _quantityForSale, uint _sellPrice) {
    //if(isInvestor(msg.sender)) {
      var portfolio = portolios[msg.sender];
      var line = portfolio.lines[_bondId];
      if(line.quantity >= _quantityForSale) {
        line.quantityForSale += _quantityForSale;
        line.quantity -= _quantityForSale;
        line.sellPrice = _sellPrice;
        BondSaleOffer(_bondId, msg.sender, _quantityForSale, _sellPrice);
      }
    //}
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
        buyerPortfolio.lines[_bondId].quantityForSale += _quantity;
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
    var quantityForSale = portolios[_investor].lines[_bondId].quantityForSale;
    return quantityForSale >= _quantity;
  }

  function kill() {
    if(msg.sender == owner) {
      suicide(owner);
    }
  }
}