<?php
if (!$_GET['data']) {
    echo "failed";
} else {
    $data_json = $_GET['data'];
    $data = var_dump($data_json);
    $time = date("Y-m-d H:i:s");
    $link = mysqli_connect("185.86.76.146", "sender", "fuck67UP", "sender") or die("Ошибка " . mysqli_error($link));
    $query = "INSERT INTO `logs` (user_id, time, type, subject, message, photo_id) VALUES ($user_id, $time, $type, $subject, $message, $photo_id)";
    $response = mysqli_query($link, $query);
    if ($response) {
        header("Status: 200");
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: *');
        $arr = array('status' => 'success');   
        echo json_encode($arr);
    } else {
        header("Status: 200");
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: *');
        $arr = array('status' => 'failed');   
        echo json_encode($arr);
    };
};
?>
