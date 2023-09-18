const express = require('express');
const app = express();
const port =8000;

// For Database
const db = require('./config/mongoose');
const Task =require('./models/tasks');

// Use Express Router
// app.use('/',require('./routes'));

// For view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded());
app.use(express.static('assests'))

var tasksList=[
    // {
    //     Descripton:"Eat Food",
    //     Category:"personal",
    //     DueDate:"16/09/2023"
    // },
    // {
    //     Descripton:"Market",
    //     Category:"others",
    //     DueDate:"16/09/2023"
    // },
    // {
    //     Descripton:"walk",
    //     Category:"personal",
    //     DueDate:"16/09/2023"
    // }
]




app.get('/',function(req,res){

    Task.find({})
    .then(tasks =>{
        return res.render('home',{
            title: "ToDo List",
            tasks_list:tasks
        });
    
    })
    .catch(error => {
        console.log('Error in Fetching Tasks from db', error);
        
      });

    // return res.render('home',{
    //     title:'ToDo List',
    //     tasks_list : tasksList
    //     });
});

// For adding task
app.post('/create-task' , function(req,res){
    
    Task.create({
       Description: req.body.Description,
       Category: req.body.Category,
       DueDate: req.body.DueDate
     } )
      .then(newTask => {
        console.log('********', newTask);
        return res.redirect('back');
      })
      .catch(error => {
        console.log('error in creating the task!!', error);
        return;
       
      });
    
    
    
    // tasksList.push({
    //     Descripton: req.body.Descripton,
    //     Category:req.body.Category,
    //     DueDate:req.body.DueDate
    // })

    // return res.redirect('/');



});


// Route to handle the deletion of selected tasks
app.get('/delete-task', function (req, res) {
  const taskId = req.query.id; // Assuming the URL parameter is 'id'

  // Use the Task model to find and delete the task by its ID
  Task.findByIdAndDelete(taskId)
      .then(() => {
          console.log('Task deleted successfully');
          return res.redirect('back'); // Redirect back to the previous page
      })
      .catch(error => {
          console.log('Error in deleting from the database', error);
          // Handle the error and possibly return an error response to the client
      });
});




app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
