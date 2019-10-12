<?php // Do not put any HTML above this line

//Go back to index.php if the user hits the cancel button in the form.
if ( isset($_POST['cancel'] ) ) {
    header("Location: index.php");
    return;
}

$salt = 'XyZzy12*_';
$stored_hash = '1a52e17fa899cf40fb04cfc42e6352f1'; 

$failure = false;  // If we have no POST data, this is always the case the first time we enter.

// Check to see if we have POST data, if we do, process it
if ( isset($_POST['email']) && isset($_POST['pass']) ) {	
    if ( strlen($_POST['email']) < 1 || strlen($_POST['pass']) < 1 ) {
        $failure = "User name and password are required";
    }
	elseif ( strpos($_POST['email'], '@') < 1 ){
		$failure = "The Email should contain an at-sign '@'";
	}
	
	else {
        $check = hash('md5', $salt.$_POST['pass']);
        if ( $check == $stored_hash ) {
            // Redirect the browser to game.php ONLY when the correct password is given.
            // we pass on the name as a parameter in the url, so it populates the $_GET in game.php
            header("Location: autos.php?email=".urlencode($_POST['email']));
            return;
        } else {
            $failure = "Incorrect password";
        }
    }
}

// Fall through into the View
?>
<!DOCTYPE html>
<html>

<head>
<?php require_once "bootstrap.php"; ?>
<title>Ivan Dario P.</title>
</head>

<body>
<div class="container">
<h1>Please Log In to Autos Database</h1>
<?php
// the first time the page is loaded $failure equals false, so nothing displays
if ( $failure !== false ) {
    // Look closely at the use of single and double quotes
    echo('<p style="color: red;">'.htmlentities($failure)."</p>\n");
}
?>
<form method="POST">
<label for="email">Email</label>
<input type="text" name="email" id="email"><br/>
<label for="id_1723">Password</label>
<input type="text" name="pass" id="id_1723"><br/>
<input type="submit" value="Log In"> 
<input type="submit" name="cancel" value="Cancel"> <!--if you add a name to submit, you add it as a variable-->
<!-- Hint: The password is the three character name of the 
programming language used in this class (all lower case) 
followed by 123. -->
</form>
</div>
</body>
