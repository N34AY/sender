<?php
header("Status: 200");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
?>
<div id='exmodal'>
    <div id='exmodal_header'>
        <div><span id='exmodal_close'>X</span></div>
        <h2 id='exmodaltext'>Нажмите на фото</h2>
    </div>
    <div id='exmodal_content'></div>
</div>