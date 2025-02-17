const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{  //like other todos but as part of the request
        console.log(req.user)  //have the ability to see the user who is making the request, so we see the usual request AND the logged in user
                               // we can console log and see everythign about that logged in user
                               //the user has their own unique ids to put in MongoDB collection, putting new user in our usercollection in MongoDB
                               //unique ID is useful since we can use it throughout the application, just get todos with that matching id
                               //if I have users what else must I have to add to the database, a new schema. models only thing that talk to the database. So if you see in the models database we have a todo and users model
        try{
            const todoItems = await Todo.find({userId:req.user.id})  //only get todos of logged in user

            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user}) 

        }catch(err){
            console.log(err)
        }
    },
    
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id}) //every todo we create will always have the users id
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    