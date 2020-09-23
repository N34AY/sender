<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
$data = json_decode(file_get_contents("php://input"), true);
$time = date("Y-m-d H:i:s");
$link = mysqli_connect("185.86.76.146", "sender", "fuck67UP", "sender") or die("Ошибка " . mysqli_error($link));
if ($data["type"] == 0) {
    $user_id = $data["user_id"];
    $type = $data["type"];
    $message = $data["message"];
    $query = "INSERT INTO logs (user_id, time, type, message) VALUES ('$user_id', '$time', '$type', '$message')";
    $response = mysqli_query($link, $query);
    if (!$response) {
        header("Status: 200");
        $arr = array('status' => 'failed');   
        echo json_encode($arr);
    } else {
        header("Status: 200");
        $arr = array('status' => 'success';   
        echo json_encode($arr);
    }
} elseif ($data["type"] == 1) {
    $user_id = $data["user_id"];
    $type = $data["type"];
    $message = $data["message"];
    $subject = $data["subject"];
    $photo_id = $data["photo_id"];
    $query = "INSERT INTO logs (user_id, time, type, subject, message, photo_id) VALUES ('$user_id', '$time', '$type', '$subject', '$message', '$photo_id')";
    $response = mysqli_query($link, $query);
};
?>
