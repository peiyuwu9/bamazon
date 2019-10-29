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
    inventoryManage();
});

function viewProductsForSale(){
    connection.query("SELECT item_id, product_name, price, stock_quantity, sale_quantity, product_sales FROM products", function(err, inventoryList){
        if (err) throw err;
        console.table(inventoryList);
        inventoryManage();
    });
};

function viewLowInventory(){
    var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity BETWEEN ? AND ?";
    connection.query(query, [0, 4], function(err, lowInventoryList){
        if (err) throw err;
        console.table(lowInventoryList);
        inventoryManage();
    });
};

var choiceArry = [];

function addToInventory(){
    choiceArry = [];
    connection.query("SELECT product_name, stock_quantity FROM products", function(err, callInventory) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'itemToAddInventory',
                message: 'Which item do you want to add inventory to?',
                choices: function() {
                    for (var i=0; i < callInventory.length; i++) {
                        choiceArry.push(callInventory[i].product_name);
                    }
                    return choiceArry;
                }
            },
            {
                type: 'input',
                name: 'updateQty',
                message: 'How many do you want to add to inventory?'
            }
        ]).then(function(addInventory){

            var selectItem = callInventory[choiceArry.indexOf(addInventory.itemToAddInventory)];
            // console.log(selectItem);
            var itemStock = parseInt(selectItem.stock_quantity);
            // console.log(itemStock);
            var finalQty = itemStock + parseInt(addInventory.updateQty);
            // console.log(finalQty);

            var query = "UPDATE products SET ? WHERE ?"
            connection.query(query,[
                {
                    stock_quantity: finalQty
                },
                {
                    product_name: addInventory.itemToAddInventory
                }
            ], function(err){
                if (err) throw err;
                console.log('Inventory of ' + addInventory.itemToAddInventory + ' has been updated successfully.');
                inventoryManage();
            });
        })
    });
};

function addNewProduct(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemName',
            message: "What's the item name?",
        },
        {
            type: 'input',
            name: 'departmentName',
            message: "What's the department for this item?",
        },
        {
            type: 'input',
            name: 'price',
            message: "What's the item price?",
        },
        {
            type: 'input',
            name: 'stockQty',
            message: "What's the item initial stock?",
        }
    ]).then(function(addNewItem){
        var query = 'INSERT INTO products\n' + 
        'SET product_name = "' + addNewItem.itemName + '", department_name = "' + addNewItem.departmentName + '", price = ' + addNewItem.price + ', stock_quantity = ' + addNewItem.stockQty + ', sale_quantity = 0, product_sales = 0;';
        connection.query(query, function(err){
            if (err) throw err;
            console.log('Item ' + addNewItem.itemName + ' has been added to the list successfully.');
            inventoryManage();
        });
    });
};

function inventoryManage() {
    inquirer.prompt({
        type: 'list',
        name: 'manageMenu',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
    }).then(function(answer){
        switch (answer.manageMenu){
            case 'View Products for Sale':
                viewProductsForSale();
                break;
            case 'View Low Inventory':
                viewLowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            case 'Exit':
                connection.end();
                break;
        };
    });
};

