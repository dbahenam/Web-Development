## How NoSQL Databases Are Designed & Work

- Allow you to store data without focusing on a strict schemas/ data structures or relationships across multiple tables

- Collections are a bit like "Tables" in SQL databases but they don't contain "columns" and "rows"

- Instead Collections contain "Documents"

### Documents:

- Documents are like JavaScript objects - complex data structures with key-value pairs

- NoSQL does support related data

- Instead of splitting normalized data across a lot of tables, NoSQL relies on less tables - instead related data is stored together (i.e nested)

- With NoSQL, you try to optimize your database layout to make your expected queries as efficient as possible.

- Data which is frequently queried together, should typically be stored together (avoid having to merge data)

### Commands:

- mongod --dbpath /Users/davidbahenamoctezuma/development/mongodb/data --logpath /Users/davidbahenamoctezuma/development/mongodb/logs/mongo.log

### Querying Command:

**CREATE**:

- db.restaurants.insertOne({name: "Burger House", address: {street: "Another Street 5", streetnumber: "15" } })

**READ**:

- db.restaurants.find({}, {name: 1, \_id: 0})
  - first parameter allows you to define conditions to which documents are fetched, the second parameter allows you to control which fields are shown for the fetched
- **find** function returns an array, **findOne** returns first matching object

- db.restaurants.find({ \_id: ObjectId("6355de2b8b5dfd62f2d3904b")})

**UPDATE**:

- db.restaurants.updateOne({\_id: ObjectId("6355de2b8b5dfd62f2d3904b")}, {$set: {"address.street": "Some Street" } })

- db.restaurants.deleteOne({\_id: ObjectId("6355de2b8b5dfd62f2d3904b")})
