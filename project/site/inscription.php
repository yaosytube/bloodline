<?php
session_start();

if (!empty($_SESSION["bloodline_joined"])) {
    header("Location: welcome.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    readfile(__DIR__ . "/inscription.html");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

require_once __DIR__ . "/connection.php";

$name = trim($_POST["fan_name"] ?? "");
$email = trim($_POST["email"] ?? "");
$favorite = trim($_POST["favorite"] ?? "");
$acknowledge = isset($_POST["acknowledge"]) ? 1 : 0;

$allowed = ["Roman Reigns", "Jey Uso", "Jimmy Uso", "Solo Sikoa", "Paul Heyman"];

if (
    mb_strlen($name) < 2 || mb_strlen($name) > 60 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 120 ||
    !in_array($favorite, $allowed, true) ||
    $acknowledge !== 1
) {
    header("Location: inscription.php?status=invalid");
    exit;
}

try {
    $statement = $pdo->prepare(
        "INSERT INTO fan_registrations (fan_name, email, favorite_member, acknowledged)
         VALUES (:name, :email, :favorite, :acknowledged)"
    );

    $statement->execute([
        ":name" => $name,
        ":email" => $email,
        ":favorite" => $favorite,
        ":acknowledged" => $acknowledge
    ]);

    $_SESSION["bloodline_joined"] = true;
    $_SESSION["fan_name"] = $name;

    header("Location: welcome.php");
    exit;

} catch (PDOException $exception) {
    // Duplicate email (MySQL error 23000) or another database error.
    if ($exception->getCode() === "23000") {
        header("Location: inscription.php?status=already_registered");
        exit;
    }

    error_log($exception->getMessage());
    header("Location: inscription.php?status=error");
    exit;
}
