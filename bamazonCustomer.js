var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Welcome to Bamazon!");
    purchase();
})

var totalCost = 0;
var shoppingList = [];

function casher(){
    console.log('Here is your shopping list:');
    console.log(shoppingList.join('\n'));
    console.log('Your total is: $' + totalCost);
    inquirer.prompt({
        type: 'confirm',
        name: 'paymentConfirmation',
        message: 'Please confirm the payment.'
    }).then(function(customerConfirmation){
        if (customerConfirmation.paymentConfirmation) {
            console.log('Thank you for payment.');
            console.log('See you next time.');
            connection.end();
        }
    });
};

function purchase(){
    connection.query("SELECT item_id, product_name, price FROM products", function(err, saleList){
        if (err) throw err;
        console.table(saleList);
        inquirer.prompt([
            {
                type: 'input',
                name: 'itemNeed',
                message: 'What do you want to purchase? Please input item_id (1-10).',
                validate: function(value){
                    if (isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            },
            {
                type: 'input',
                name: 'qtyNeed',
                message: 'How many do you need?',
                validate: function(value){
                    if (isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(placeOrder){
            connection.query(
                "SELECT product_name, price, stock_quantity, product_sales, sale_quantity FROM products", function(err, transaction){
                    if (err) throw err;

                    var selectItem = transaction[placeOrder.itemNeed - 1];
                    var itemStock = parseInt(selectItem.stock_quantity);
                    var itemSales = parseInt(selectItem.product_sales);
                    var itemSaleQty = parseInt(selectItem.sale_quantity);

                    // console.log(parseInt(selectItem.product_sales));
                    // console.log(parseInt(selectItem.sale_quantity));

                    if (parseInt(selectItem.stock_quantity) === 0){
                        console.log(`Insufficient quantity!`);
                        purchase();
                    }
                    else {
                        shoppingList.push(selectItem.product_name + ' x ' + parseInt(placeOrder.qtyNeed));
                        
                        totalCost += parseInt(selectItem.price) * parseInt(placeOrder.qtyNeed);
    
                        itemStock -= parseInt(placeOrder.qtyNeed);

                        itemSales += parseInt(selectItem.price) * parseInt(placeOrder.qtyNeed);

                        itemSaleQty += parseInt(placeOrder.qtyNeed);
    
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: itemStock,
                                    product_sales: itemSales,
                                    sale_quantity: itemSaleQty
                                },
                                {
                                    item_id: placeOrder.itemNeed
                                }
                            ],
                            function(err) {
                                if (err) throw err;
                                console.log('Item added to cart.');
                                inquirer.prompt({
                                    type: 'list',
                                    name: 'nextAction',
                                    message: 'Do you want to purchase another item?',
                                    choices: ['Purchase another item.', 'Go to casher.']
                                }).then(function(afterOrder){
                                    // console.log(afterOrder.nextAction === 'Purchase another item.');
                                    if (afterOrder.nextAction === 'Purchase another item.'){
                                        purchase();
                                    }
                                    else {
                                        casher();
                                    };
                                });
                            }
                        );
                    }
                }
            );
        });
    });
};