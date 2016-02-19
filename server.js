var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res){
	res.send('Todo API root 1');
});

// GET /todos
app.get('/todos', function (req, res){
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function (req, res){
	var todoId = parseInt(req.params.id);
	var matchTodo = _.findWhere(todos, {id: todoId});
	// var matchTodo;

	// todos.forEach(function (todo){
	// 	if (todoId === todo.id){
	// 		matchTodo = todo;
	// 	}
	// });

	if (matchTodo){
		res.json(matchTodo);
	} else {
		res.status(404).send();
	};
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}
    
    body.description = body.description.trim();


	body.id = todoNextId++;

	todos.push(body);
	
	res.json(body);
});

//DELETE /todos/:id
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id);
	var matchTodo = _.findWhere(todos, {id: todoId});

    if (!matchTodo){
    	return res.status(400).json({"error": "No Todo Found for the ID"});

    }else {
    		todos = _.without(todos, matchTodo);
	// return res.status(200).send();
			res.json(matchTodo);

    }

})

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});