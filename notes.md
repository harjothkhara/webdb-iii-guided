Querying Data, Migrations and Seeding

TK Exercises - use this online tool to write the following queries: https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top

Learn to query data from multiple tables

1. list the products including their category name
SELECT * FROM Products
JOIN Categories on products.categoryID = categories.categoryID

2. list the products including the supplier name
SELECT * FROM Products
JOIN Suppliers on Products.SupplierID = Suppliers.SupplierID

3. list the products including both the category name and supplier name.

in class sql queries using join --

select orders.orderId, customers.customerName, customers.city, 
orders.employeeId, orders.orderDate
from orders
inner join  customers on orders.customerId = customers.customerId 

-- add information about the employee (first name and last name)
select orders.orderId 
	,customers.customerName
    ,customers.city
    ,(employees.firstName || ' ' || employees.lastName) as Employee 
    ,orders.orderDate
from orders
inner join customers on orders.customerId = customers.customerId
inner join employees on orders.employeeID = employees.employeeId


"can have multiple joins, even up to 4 joins in one query is ok"

-- i want to bring all the customers, whether they have orders or not, if there are orders i want to see information about the orders.
I want to see all customers regardless of whether they have orders or not --> use the left join!
left join has 2 tables, the left table is the one that shows up after the FROM.

-- I want to see all customers regardless of whether they have orders or not --196 > 213
select * 
from customers as c
left join orders as o on c.customerId = o.customerId

-- customers without orders... 17 records
select * 
from customers as c
left join orders as o on c.customerId = o.customerId
where o.orderId is null

--all the customers that have orders...196
select * 
from customers as c
left join orders as o on c.customerId = o.customerId
where o.orderId is not null

--only care about the customer names, unique names
select distinct c.customerName
from customers as c
left join orders as o on c.customerId = o.customerId
where o.orderId is not null
order by 1

-- aggregations, num of items grouped by order (orderId, 5) --sum()
select o.orderId, count(od.orderId) as ItemsCount
from orders as o
inner join orderdetails as od on o.orderId = od.orderId
group by o.orderId

-- revenue per order (quantity * price) //sum and total are the same thing, 2 is the number of decimal places
select o.orderId, round(sum(od.quantity * p.price), 2) as Revenue
from orders as o
inner join orderdetails as od on o.orderId = od.orderId
inner join products as p on p.productId = od.productId
group by o.orderId
order by Revenue desc

^^ there's a business need of knowing how much money am i making per order - writing a simple query, couple of fields, we round them up, give it a name, join the tables that we need to join in order to get at the data.

limit the number of records you want to display - limit 5 per page
select * from customers
limit 5

--pagination
select * from customers
order by customerName --optional, but highly recommended
limit 5 -- per page --take
offset 5 -- ignore this many records --skip

Review

- joins (inner and left)
- table aliasing
- aggregate functions with grouping
- pagination
- concatenation
- is null (is not null)

Schema

- structure of .....
    - database
    - table
- create tables.
- add columns to tables

# migrations

- run `npx knex init` to generate a `./knexfile.js`
- modify `knexfile.js` to configure our db connection
- remove staging and production configs from `knexfile.js`
- make a migration for each db schema change
    (create a table, create another table, rename a column - create a migration...every change that happens to the schema of the db, to the structure, should have a seperate migration)