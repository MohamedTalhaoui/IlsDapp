var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  build: new DefaultBuilder({
    "index.html": "index.html",
    "app.js": [
      "vendor/angular/angular.js",
      "vendor/angular-route/angular-route.js",
      "javascript/app.js",
      "javascript/controllers/main.js",
      "javascript/controllers/bonds.js",
      "javascript/controllers/issuers.js",
      "javascript/controllers/portfolio.js",
      "javascript/controllers/marketplace.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/",
    "views/": "views/"
  }),

  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // match any network
    },
    live: {
      host: "localhost",
      port: 8545,
      network_id: "*" // match any network
    }
  }
};
