<?php
if (!$_GET['user_id'] {
    echo "failed";
} else {
    $user_id = $_GET['user_id'];
    $link = mysqli_connect("185.86.76.146", "sender", "fuck67UP", "sender") or die("Ошибка " . mysqli_error($link));
    $query = "SELECT * FROM `black_list` WHERE `user_id` = $user_id";
    $response = mysqli_query($link, $query);
    function create_mans_array($response) {
        $mans = array();
        $rows = mysqli_num_rows($response);
        for ($i = 0; $i < $rows; $i++) { 
            $row = mysqli_fetch_row($result);
            array_push($mans, $row[1]);
        }
        return $mans;
    };
    if ($response) {
        header("Status: 200");
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: *');
        $mans_json = array(create_mans_array($response));
        $arr = array('status' => 'success', 'mans' => $mans_json);   
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
