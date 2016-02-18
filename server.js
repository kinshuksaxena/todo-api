var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'call the operator',
	completed: false
}, {
	id: 2,
	description: 'meet the VC',
	completed: false
}, {
	id: 3,
	description: 'Find more funding',
	completed: true
}];

app.get('/', function (req, res){
	res.send('Todo API root 1');
});

// GET /todos
app.get('/todos', function (req, res){
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id);
	var matchTodo;

	todos.forEach(function (todo){
		if (todoId === todo.id){
			matchTodo = todo;
		}
	});

	if (matchTodo){
		res.json(matchTodo);
	} else {
		res.status(404).send();
	};
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});