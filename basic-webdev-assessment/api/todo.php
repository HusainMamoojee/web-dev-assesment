<?php
$todoData = file_get_contents('todo.json');
$tasks = json_decode($todoData, true);
try {
    require_once("todo.controller.php");

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = explode('/', $uri);
    $requestType = $_SERVER['REQUEST_METHOD'];
    $body = file_get_contents('php://input');
    $pathCount = count($path);

    $controller = new TodoController();

    switch ($requestType) {
        case 'GET':
            //Handle GET request
            if ($path[$pathCount - 2] == 'todo' && isset($path[$pathCount - 1]) && strlen($path[$pathCount - 1])) {
                $id = $path[$pathCount - 1];
                $todo = $controller->load($id);
                if ($todo) {
                    // If todo item found, return it as a JSON response with HTTP status code 200 (OK)
                    http_response_code(200);
                    die(json_encode($todo));
                }
                // If todo item not found, return HTTP status code 404 (Not Found)
                http_response_code(404);
                die();
            } else {
                http_response_code(200);
                die(json_encode($controller->loadAll()));
            }
            break;
        case 'POST':
            // Handle POST request
            //implement your code here
            if ($path[$pathCount - 1] == 'todo') {
                // Create a new todo based on the request body
                $newTodo = json_decode($body);

                if ($newTodo) {
                    // Call the create function to add the new todo item
                    $success = $controller->create($newTodo);

                    if ($success) {
                        // If todo item created successfully, return HTTP status code 201 (Created)
                        http_response_code(201);
                        die();
                    } else {
                        // If there was an error creating the todo item, return HTTP status code 500 (Internal Server Error)
                        http_response_code(500);
                        die();
                    }
                }
            }

            http_response_code(400);
            die();
            break;
        case 'PUT':
            // Handle PUT request
            //implement your code here
            if ($path[$pathCount - 2] == 'todo' && isset($path[$pathCount - 1]) && strlen($path[$pathCount - 1])) {
                $id = $path[$pathCount - 1];
                $todoData = json_decode($body);
                if ($todoData !== null) {
                    // Create a new Todo object with the updated data
                    $todo = new Todo($id, $todoData->title, $todoData->description, $todoData->done);
                    // Call the update function to update the todo item
                    $result = $controller->update($id, $todo);
                    if ($result) {
                        // If todo item updated successfully, return HTTP status code 200 (OK)
                        http_response_code(200);
                        die();
                    }
                }
            }
            // If the request URL doesn't match '/todo/{id}', return HTTP status code 400 (Bad Request)
            http_response_code(400);
            http_response_code(400);
            die();
            break;
        case 'DELETE':
            // Handle DELETE request
            //implement your code here
            if ($path[$pathCount - 2] == 'todo' && isset($path[$pathCount - 1]) && strlen($path[$pathCount - 1])) {
                $id = $path[$pathCount - 1];
                // Call the delete function to delete the todo item
                $success = $controller->delete($id);
                if ($success) {
                    // If todo item deleted successfully, return HTTP status code 204 (No Content)
                    http_response_code(204);
                    die();
                } else {
                    // If the todo item couldn't be found or deleted, return HTTP status code 404 (Not Found)
                    http_response_code(404);
                    die();
                }
            } else {
                // If the request URL doesn't match '/todo/{id}', return HTTP status code 400 (Bad Request)
                http_response_code(400);
                die();
            }
            break;
        default:
            // If the request type is not supported, return HTTP status code 501 (Not Implemented)
            http_response_code(501);
            die();
            break;
    }
} catch (Throwable $e) {
    // Catch any errors or exceptions thrown during the execution of the code
    error_log($e->getMessage());
    // Return HTTP status code 500 (Internal Server Error) in case of an erro
    http_response_code(500);
    die();
}