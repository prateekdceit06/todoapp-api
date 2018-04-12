const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB Server.');

    // db.collection('TodoApp').insertOne({
    //     text : "Something to do 2",
    //     completed : "False"

    // }, (err, result) => {
    //     if (err){
    //         return console.log("unable to insert Todo");
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    // db.collection('Users').insertOne({
    //     name: "Prateek",
    //     age : 25,
    //     location:"Delhi"
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("unable to insert Users");
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // });


    // db.collection('Todos').find({_id : new ObjectID('5acdf34695e238268a58b4af')}).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fetch data", err);
    // });

    db.collection('Todos').deleteMany({test: "Eat lunch"}).then((result)=>{
        console.log(result);
    });
 
    db.close();
});