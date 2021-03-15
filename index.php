<!doctype html>
<html lang="en">
  <head>
    <title>คำนวณค่างวดรถ Toyota</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="layout.css">
  </head>
  <body>
    <?php
        $json = json_decode(file_get_contents('data.json'));
    ?>
    <div class="container">
        <h1>คำนวณค่างวดรถ Toyota</h1>
        <div id="select_table" class="select-min-table-not-show">
            <form>
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td scope="row">เลือกซีรีย์รถ</td>
                            <td scope="row">
                                <select name="car_series" id="car_series" class="form-control">
                                    <option value="">--Select Car Series--</option>
                                    <?php
                                        $json_car=$json->car; ?>
                                        <?php foreach($json_car as $car_serie=>$price){ ?>
                                    <option value="<?php echo $car_serie; ?>"><?php echo $car_serie; ?></option>
                                        <?php }
                                    ?>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">รุ่นรถ</td>
                            <td scope="row">
                                <select disabled name="car_models" id="car_models" class="form-control">
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">เงินดาวน์</td>
                            <td scope="row">
                                <select name="car_down" id="car_down" class="form-control">
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">ระยะเวลาผ่อน</td>
                            <td scope="row">
                                <select name="car_down_time" id="car_down_time" class="form-control">
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">ดอกเบี้ย (%)</td>
                            <td scope="row">
                                <input type="text" class="form-control" name="car_per" id="car_per" placeholder="2.5">
                            </td>
                        </tr>
                        <tr>
                            <td scope="row"></td>
                            <td scope="row">
                                <button id="click_me" type="button" class="btn btn-primary">Calculate</button>
                                <button id="reset" type="reset" class="btn btn-warning">Reset</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div class="calculate-min-table-show">
            <table id="calculate_table" class="table table-borderless">
                <thead>
                    <tr id="cal_head">
                    </tr>
                </thead>
                <tbody>
                    <tr id="car_head">
                    </tr>
                    <tr id="car_cal">
                    </tr>
                </tbody>
            </table>
        </div>
         <div id="chart">
            <canvas id="myChart"></canvas>
        </div>
    </div>
   
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"></script>
    <script>
        $.ajax({
            type: "post",
            url: "myAJAX.js"
        });
    </script>
  </body>
</html>