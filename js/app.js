var app = angular.module('todo', []);

app.controller('TodoCtrl',function($scope, filterFilter, $http)
{
    $scope.todos = [];
    $scope.placeholder = "Chargement...";

    $http.get('todos.php').success(function(data)
    {
        $scope.todos = data;
        $scope.placeholder = "Ajouter une Nouvelle Tache";
    });

    $scope.$watch('todos', function(){
        $scope.remaining = filterFilter($scope.todos, {completed:true}).length;
        $scope.allchecked = !$scope.remaining;
    },true);

    $scope.removeTodo = function(index)
    {
        $scope.todos.slice(index,1);
        console.log("TODO N°"+ index + "supprime");
    }

    $scope.addTodo = function()
    {
        $scope.todos.push(
            {
                name : $scope.newtodo,
                completed : false
            });
        $scope.newtodo = '';
    }

    $scope.checkAllTodo = function (allchecked)
    {
        $scope.todos.foreach(function(todo)
        {
            todo.completed = allchecked;
        })

    }
});