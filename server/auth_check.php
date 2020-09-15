<?php
if (!$_GET['id']) {
    echo "failed";
} else {
    $user_id = $_GET['id'];
    $link = mysqli_connect("185.86.76.146", "sender", "fuck67UP", "sender") or die("Ошибка " . mysqli_error($link));
    $query = "SELECT * FROM `users_list` WHERE `user_id` = $user_id";
    $response = mysqli_query($link, $query);
    if (!$response) {
        $arr = array('id' => $id, 'status' => 'failed');   
        echo json_encode($arr);
        exit;
    } else {
        $row = mysqli_fetch_row($response);
        $id= $row[0];
        if ($id != NULL) {
            header("Status: 200");
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: *');
            $arr = array('id' => $id, 'status' => 'success');   
            echo json_encode($arr);
        } else {
            header("Status: 200");
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: *');
            $arr = array('id' => $id, 'status' => 'failed');   
            echo json_encode($arr);
        };
    };
};
?>
