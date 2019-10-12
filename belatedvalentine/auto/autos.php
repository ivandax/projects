<?php

// if we do NOT have a name key in the $GET OR the lenght of the value is name is lower than one, then abort.
if ( ! isset($_GET['email']) || strlen($_GET['email']) < 1  ) {
    die('Email missing - Try again');
}

// If the user requested logout go back to index.php
if ( isset($_POST['logout']) ) {
    header('Location: index.php');
    return;
}


?>
<!DOCTYPE html>
<html>
<head>
<title>Ivan Dario P.</title>
<?php require_once "bootstrap.php"; ?>
</head>
<body>
<div class="container">
<h1>Welcome to Ivan's Auto Database</h1>

</div>
</body>
</html>


