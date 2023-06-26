
//function to  update to do item
function putTodo(todo) {
  // implement your code here
  // Make a PUT request to update the todo item
  fetch(window.location.href + 'api/todo/' + todo.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .then(response => {
      if (response.ok) {
        // Handle successful update
        showToastMessage('item updated')
        console.log('Todo updated successfully');
      } else {
        // Handle update failure
        console.log('Failed to update todo');
      }
    })
    .catch(error => {
      // Handle  error
      console.log('Error updating todo:', error);
    });
    console.log("calling putTodo");
    console.log(todo);
}

//function to create post 
function postTodo(todo) {
    // implement your code here
   fetch('api/todo', {
    method: 'POST' ,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
   })
   .then(response => {
    if (response.ok) {
      showToastMessage('Item created...');
      getTodos(); // Refresh the TODO list
    } else {
      console.error('Failed to create TODO item');
    }
  })
  .catch(error => {
    console.error('Error creating TODO item:', error);
  });
  
  
  
   
   console.log("calling postTodo");
   console.log(todo);
 }




//delete function 
function deleteTodo(todo) {
    // implement your code here
      // Send a DELETE request to delete the TODO item
 fetch(window.location.href + 'api/todo/' + todo.id, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        // Handle the success case, where the item was deleted
        console.log('TODO item deleted successfully');
        // You can update the UI or perform any additional actions here
        showToastMessage('item deleted...')
        
      } else {
        // Handle the error case, where the item could not be deleted
        console.error('Failed to delete TODO item');
      }
    })
    .catch(error => {
      console.error('Error deleting TODO item:', error);
    });

    console.log("calling deleteTodo");
    console.log(todo);
}



// example using the FETCH API to do a GET request
function getTodos() {
    fetch(window.location.href + 'api/todo')
    .then(response => response.json())
    .then(json => drawTodos(json))
    .catch(error => showToastMessage('Failed to retrieve todos...'));
}




//calling functions
getTodos();
