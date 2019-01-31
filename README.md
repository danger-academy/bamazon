## BAMAZON
Bamazon is a CLI app for product purchasing, as well as inventory/revenue control. 

### Challenges
The initial build (Node.js and MySQL), allowing customer to purchase directly from existing inventory, was straightforward. Took a little more thought and work to enable direct inventory/revenue control from a managerial perspective.

### Packages used: 
* [dotenv]
* [inquirer]
* [colors]
* [cli-tables]
* [mysql]

### Securing API keys
Uses [dotenv](https://www.npmjs.com/package/dotenv) to add a layer of data security, by storing the relevant password in a separate file 