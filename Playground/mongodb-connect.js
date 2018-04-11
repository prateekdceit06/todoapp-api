const MongoClient = require('mongodb').MongoClient;

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

    db.collection('Users').insertOne({
        name: "Prateek",
        age : 25,
        location:"Delhi"
    }, (err, result) => {
        if (err) {
            return console.log("unable to insert Users");
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

    });
    db.close();
});