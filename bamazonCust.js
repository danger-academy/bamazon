// Dependencies (same as exec script)
const mysql = require("mysql");
const inquirer = require("inquirer");
const colors = require('colors');
const Table = require('cli-table');

// Connection script
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Username
    user: "root",

    // Credentials
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(colors.cyan("Welcome! You are now connected to the Bamazon Store as User ID " + connection.threadId));
    //connection.end();

    //Calls main function
    bamazon();

});

// BEGIN Display Inventory
function bamazon() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        // Cli-Table display code with Color
        var table = new Table({
            head: ["Product ID".cyan.bold, "Product Name".cyan.bold, "Department".cyan.bold,
                "Price".cyan.bold, "Quantity".cyan.bold
            ],
            colWidths: [12, 75, 20, 12, 12],
        });

        // Set/Style table headings and Loop through entire inventory
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2),
                    res[i].stock_quantity
                ]
            );
        }

        console.log(table.toString());
        // END Display Inventory

        // Prompt Customers Input
        inquirer.prompt([{
                    type: "number",
                    message: "Please enter the Product ID of the item you wish to purchase?".green,
                    name: "id"
                },
                {
                    type: "number",
                    message: "Quantity you wish to purchase?".green,
                    name: "quantity"
                },
            ])

            // Ordering function
            .then(function (cart) {

                var quantity = cart.quantity;
                var itemID = cart.id;

                connection.query('SELECT * FROM products WHERE id=' + itemID, function (err, selectedItem) {
                    if (err) throw err;

                    // constify item quantity desired is in inventory
                    if (selectedItem[0].stock_quantity - quantity >= 0) {

                        console.log("INVENTORY AUDIT: Quantity in Stock: ".green + selectedItem[0].stock_quantity +
                            " Order Quantity: ".yellow + quantity.purple);

                        console.log("Success! Bamazon has sufficient inventory of ".green +
                            selectedItem[0].product_name.yellow + " to fill your order!".green);



                        // Calculate total sale, and fix 2 decimal places
                        console.log("Thank You for your purchase. Your order total will be ".green +
                            (cart.quantity * selectedItem[0].price).toFixed(2).yellow +
                            " dollars.".green, "\nThank you for shopping at Bamazon!".magenta);

                        // Query to remove the purchased item from inventory.                       
                        connection.query('UPDATE products SET stock_quantity=? WHERE id=?',
                            [selectedItem[0].stock_quantity - quantity, itemID],

                            function (err, inventory) {
                                if (err) throw err;

                                bamazon(); // Runs the prompt again, so the customer can continue shopping.
                            }); // Ends the code to remove item from inventory.

                    }
                    // Low inventory warning
                    else {
                        console.log("LOW INVENTORY WARNING: \nBamazon has only ".red + selectedItem[0].stock_quantity +
                            " " + selectedItem[0].product_name.cyan + " in stock at this moment. \nPlease make another selection or reduce your quantity.".red.bold,
                            "\nThank you for shopping at Bamazon!".yellow.bold);

                        // Run the prompt again, so the customer can continue shopping.
                        bamazon();
                    }
                });
            });
    });
}