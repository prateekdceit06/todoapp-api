const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require ('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo');

const todos= [{
    _id : new ObjectID(),
    text : 'First test to do'
}, {
    _id : new ObjectID(),
    text : 'Second test to do'
}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);
        done();
    });
});

describe('POST /todos', ()=>{
    it ('should create a new todo', (done)=>{
        var text = 'Test todo text';
    

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
        expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
        if (err) {
            return done(err);
        }

        Todo.find({text}).then ((todos)=>{
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
        }).catch((e) => {done(e)});
    });
});


it ('sould not create todo with invalid body data', (done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
        if (err) {
            return done(err);
        }
        Todo.find().then((todos)=>{
            expect(todos.length).toBe(2);
            done();
        }).catch((e) => {done(e)});
    });

});
});


describe('GET /todos', ()=>{
     it('should fetch all todos', (done)=>{
         request(app)
         .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        }).end (done);
    });
});

describe('GET /todos/:id', () => {
    it ('should return todo doc', (done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        }).end(done);
    });

    it('should return 404 if todo not found',(done)=>{
        var id = new ObjectID();
        request(app)
        .get(`/todos/${id.toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return a 404 for non-object ids', (done)=>{
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id',()=>{
    it('should remove a todo', (done)=>{
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[1].text)
        }).end((err, res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(hexId).then((todo)=>{
                expect(todo).toBe(null);
                done();
            }).catch((e)=>done(e));
        });
    });

    it('should return 404 if todo not found',(done)=>{
        var id = new ObjectID();
        request(app)
        .get(`/todos/${id.toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return a 404 for non-object ids', (done)=>{
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    });

});