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
    salesReview();
});

function viewProductSalesByDepartment (){
    var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(product_sales) AS department_sales, (SUM(product_sales) - departments.over_head_costs) AS total_profit\n';
    query += 'FROM products LEFT JOIN departments ON departments.department_name = products.department_name\n';
    query += 'GROUP BY departments.department_id, departments.department_name, departments.over_head_costs;';
    connection.query(query,function(err,analysed){
        if (err) throw err;
        console.table(analysed);
        salesReview();
    });
};

function createNewDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepart',
            message: "What's the new department?"
        },
        {
            type: 'input',
            name: 'newDapartCost',
            message: "What's the new department overhead costs?",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        }
    ]).then(function(newDepartAdd){
        var query = "INSERT INTO departments\n" + 'SET department_name = "' + newDepartAdd.newDepart + '", over_head_costs = ' + newDepartAdd.newDapartCost + ';'
        connection.query(query,function(err){
            console.log('Department ' + newDepartAdd.newDepart + ' has been added to the report successfully.');
            salesReview();
        });
    });
};

function salesReview(){
    inquirer.prompt({
        type: 'list',
        name: 'departSupervisor',
        message: 'How do you want to do?',
        choices: ['View Product Sales by Department', 'Create New Department', 'Exit']
    }).then(function(answer){
        switch (answer.departSupervisor){
            case 'View Product Sales by Department':
                viewProductSalesByDepartment();
                break;
            case 'Create New Department':
                createNewDepartment();
                break;
            case 'Exit':
                connection.end();
                break;
        };
    });
};

