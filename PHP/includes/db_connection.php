<?php
  // 1. Create a database connection
  define("DB_SERVER","localhost");
  define("DB_USER","tathagat");
  define("DB_PASS","***************//Put in your password");
  define("DB_NAME","examplecompany");

  $connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
  // Test if connection succeeded
  if(mysqli_connect_errno()) {
    die("Database connection failed: " . 
         mysqli_connect_error() . 
         " (" . mysqli_connect_errno() . ")"
    );
  }
?> 