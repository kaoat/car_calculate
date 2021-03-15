<?php
    $json = json_decode(file_get_contents("data.json"));
    $get_car_serie=$_POST['car_serie'];
    if($get_car_serie!=""){
        $car=$json->car;

        foreach($car as $model=>$value){
            if($model==$get_car_serie){
                $return=[];

                foreach($value as $model=>$price){
                    array_push($return,$model,$price);
                }
                echo json_encode($return);
            }
        }
    }
?>