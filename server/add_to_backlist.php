<?php
if (!$_GET['user_id'] || !$_GET['mans']) {
    echo "failed";
} else {
    $user_id = $_GET['user_id'];
    $mans_json = $_GET['mans'];
    $mans = var_dump($mans_json);
    $ban_time = date("Y-m-d H:i:s");
    $link = mysqli_connect("185.86.76.146", "sender", "fuck67UP", "sender") or die("Ошибка " . mysqli_error($link));
    $query = "INSERT INTO `black_list` (user_id, mans, ban_time) VALUES ($user_id, $mans, $ban_time)";
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
