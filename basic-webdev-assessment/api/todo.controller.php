<?php
require_once("todo.class.php");

class TodoController
{
    private const PATH = __DIR__ . "/todo.json";
    private array $todos = [];

    public function __construct()
    {
        $content = file_get_contents(self::PATH);
        if ($content === false) {
            throw new Exception(self::PATH . " does not exist");
        }
        $dataArray = json_decode($content);
        if (!json_last_error()) {
            foreach ($dataArray as $data) {
                if (isset($data->id) && isset($data->title))
                    $this->todos[] = new Todo($data->id, $data->title, $data->description, $data->done);
            }
        }
    }

    public function loadAll(): array
    {
        return $this->todos;
    }

    public function load(string $id): Todo|bool
    {
        foreach ($this->todos as $todo) {
            if ($todo->id == $id) {
                return $todo;
            }
        }
        return false;
    }



    //creates a new item in the to do list
    public function create(Todo $todo): bool
    {
        //implement your code here
        //checks the id and title
        if (empty($todo->id) || empty($todo->title)) {
            return false;
        }
        //add to the todos array
        $this->todos[] = $todo;

        //save the todo to the JSON file
        return $this->saveTodosToFile();
    }

    //function to update existing to do lisr
    public function update(string $id, Todo $todo): bool
    {
        // implement your code here
        foreach ($this->todos as $key => $existingTodo) {
            if ($existingTodo->id == $id) {
                //replace existiing data with updated data
                $this->todos[$key] = $todo;
                //saving to JSON file
                $this->saveTodosToFile();
                return true;
            }
        }
        return false;
    }

    //function to delete items from to do lisr
    public function delete(string $id): bool
    {
        // implement your code here
        foreach ($this->todos as $key => $todo) {
            if ($todo->id == $id) {
                //remove item from todos array
                unset($this->todos[$key]);
                //updating JSON file
                $this->saveTodosToFile();
                return true;
            }
        }
        return false;
    }

    // add any additional functions you need below
    //function to save items to JSON file
    private function saveTodosToFile(): bool
    {
        $todoData = [];
        foreach ($this->todos as $todo) {
            $todoData[] = [
                'id' => $todo->id,
                'title' => $todo->title,
                'description' => $todo->description,
                'done' => $todo->done
            ];
        }
        //encodes data as JSON
        $jsonData = json_encode($todoData, JSON_PRETTY_PRINT);
        return file_put_contents(self::PATH, $jsonData) !== false;

    }

}