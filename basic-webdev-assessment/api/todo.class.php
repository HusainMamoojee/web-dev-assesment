<?php

class Todo {
    public function __construct(
        public string $id, 
        public string $title, 
        public string $description = '',
        public bool $done = false
    ) {}
}