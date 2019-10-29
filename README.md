# bamazon
An application to mimic enterprise resource planning system.
***
## Motivation
Create an application to practice **Javascript**, **Node.js** and **MySQL**.
***
## Technologies used and why
[Javascript] is used to build user interface and read/write sql database.
[Node.js] is an environment to execute javascript in terminal.
[MySQL] is a database used to store ivnetory and sales data.
***
## How to use

### bamazon_Customer

1. By using `node bamazonCustomer.js`, as a customer is able to purchase multiple items.

2. If the item is out of stock, terminal will return *Insufficient Inventory*.

3. Once purchase decided, the customer will go to a casher to complete payment.

Please see below demo:

![bamazon_Customer](https://media.giphy.com/media/YkhE7bf91MaLI1yilG/giphy.gif)

![bamazon_Customer](https://media.giphy.com/media/UUo0SuY1zRl5lDWjtq/giphy.gif)

------
### bamazon_Manager

1. By using `node bamazonManager.js`, as a manager is able to access item inventory.

2. There are 4 functions the manager can do:

    1. Review item inventory

    2. List out lower inventory items

    3. Add inventory to the item

    4. Add new items

Please see below demo:

![bamazon_Manager](https://media.giphy.com/media/giKJXzwQuK75fDQZKx/giphy.gif)

![bamazon_Manager](https://media.giphy.com/media/Kc2QE6NzJP1YzVuRXt/giphy.gif)

![bamazon_Manager](https://media.giphy.com/media/kgDNqc2LYZjqXOSOHy/giphy.gif)

![bamazon_Manager](https://media.giphy.com/media/f4D11Bq7bAOckoik1H/giphy.gif)

------
### bamazon_Supervisor

1. By using `node bamazonSupervisor.js`, as a supervisor is able to review deppartment sales and create new departments.

2. Once new department generated, need to add a new item with manager app under that department in order to show department record in the table.

Please see below demo:

![bamazon_Supervisor](https://media.giphy.com/media/jsgA3qNswQ10Exf6RK/giphy.gif)

![bamazon_Supervisor](https://media.giphy.com/media/VItrBgQRjjc4mCGV5o/giphy.gif)

![bamazon_Supervisor](https://media.giphy.com/media/gH1uLlOUvJWsOQ4K0X/giphy.gif)

![bamazon_Supervisor](https://media.giphy.com/media/cjhmJGL1eUQCRR3RVr/giphy.gif)

