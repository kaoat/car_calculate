var down = [10, 15, 20, 25, 30];
var down_time = [48, 60, 72, 84];
var down_time_labels = ["48 งวด", "60 งวด", "72 งวด", "84 งวด"];
var myChart = (datas) => {
    let temp1 = new Array();
    let temp2 = new Array();
    datas.forEach((value) => {
        temp2.push(value[1] - value[0]);
        temp1.push(value[0]);
    });
    var barChartData = {
        labels: down_time_labels,
        datasets: [
            {
                label: "จำนวนที่ต้องจ่ายเพิ่มเติมจากดอกเบี้ย",
                data: temp2,
                backgroundColor: "rgb(244, 0, 0)"
            },
            {
                label: "จำนวนที่ต้องจ่ายเริ่มต้น",
                data: temp1,
                backgroundColor: "rgba(13, 122, 231, 0.61)"
            },

        ]
    }
    new Chart(document.getElementById('myChart').getContext('2d'),
        {
            type: 'bar',
            data: barChartData,
            options: {
                title: {
                    display: true,
                    text: "Total price you must pay",
                    fontSize: 20
                },
                animation: {
                    duration: 1000
                },
                responsiveAnimationDuration: 1000,
                legend: {
                    labels: {
                        fontColor: 'black',
                        fontSize: 16,
                    }
                },
                responsive: true,
                tooltips: {
                    mode: "x",
                    intersect: false,
                    bodyFontSize: 14,
                    titleFontSize: 16
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                        stacked: true,
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        }
    )
};
$("#car_head").append("<t\d scope=\"row\">สินเชื่อ/ค่างวดต่อเดือน<\/td>");
$("#calculate_table").hide();
$("#myChart").hide();
for (let i = 0; i < 4; i++) {
    if (i == 0) {
        $("#cal_head").append("<th>ผลของการคำนณค่างวดเบื้องต้น</th>");
    }
    $("#cal_head").append("<th></th>");
}
$(document).ready(() => {

    $("#car_down").append("<\option><\/option>");
    $("#car_down_time").append("<\option><\/option>");
    for (let i = 0; i < down_time.length; i++) {
        $("#car_down_time").append("<\option value=\"" + down_time[i] + "\">" + down_time[i] + " เดือน<\/option>");
        $("#car_head").append("<t\d scope=\"row\">" + down_time[i] + " งวด<\/td>");
        $("#car_down").append("<\option value=\"" + down[i] + "\">" + down[i] + "%<\/option>");
        if ((i + 1) == down_time.length) {
            $("#car_down").append("<\option value=\"" + down[i + 1] + "\">" + down[i + 1] + "%<\/option>");
        }
    }
    $("#reset").click(() => {
        splitToOne();
        $("#car_models").prop("disabled", true);
        splitToOne();
    });

    $("#car_series").change(() => {
        splitToOne();
        if ($("#car_series").val() != "") {

            $.ajax({
                type: "post",
                url: "get_car_model.php",
                data: {
                    car_serie: $("#car_series").val(),
                },
                dataType: "json",
                success: (data) => {
                    $("#car_models").empty();
                    $("#car_models").prop("disabled", false);
                    $("#car_models").append('<option selected value=""></option>');

                    for (let i = 0; i < data.length; i += 2) {
                        $("#car_models").append("<\option value=\"" + data[i + 1] + "\">" + data[i] + " ราคา " + formatNumber(data[i + 1]) + " บาท<\/option>");
                    }
                }
            });
        }
        else {
            $("#car_models").empty();
            $("#car_models").prop("disabled", true);
        }
    });
    $("#car_models").change(() => {
        if ($("#car_models").val() != "") {
            showData();
        } else {
            splitToOne()
        }

    });
    $("#car_down_time").change(() => {
        if ($("#car_down_time").val() != "") {
            showData();
        } else {
            splitToOne();
        }
    });
    $("#car_per").change(() => {
        if ($("#car_per").val() != "") {
            showData();
        } else {
            splitToOne();
        }
    });
    $("#car_down").change(() => {
        if ($("#car_down").val() != "") {
            showData();
        } else {
            splitToOne();
        }
    });
    $("#click_me").click(() => {


    });
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    };
    function calculating() {
        var now = new Array();
        down_time.forEach((value) => {
            total = Math.ceil($("#car_models").val() * (1 - ($("#car_down").val() / 100)));
            tax_all_year = (value / 12) * $("#car_per").val();
            total2 = Math.ceil(total * (1 + tax_all_year / 100));
            total_per_month = Math.ceil(total2 / value);
            now.push([total2, total_per_month, total]);
        });
        return now;
    }
    function showData() {
        if ($("#car_models").val() != "" && $("#car_down").val() != "" && $("#car_down_time").val() != "" && $("#car_per").val() != "" &&
            $("#car_per").val() != "." && isNumber($("#car_per").val()) && $("#car_models").val() != null) {
            oneToSplit();
            now = calculating();
            $("#car_cal").empty();
            $("#car_cal").append("<t\d scope=\"row\">มาตรฐาน (รถใหม่)<\/td>");
            temp1 = new Array();
            for (let i = 0; i < now.length; i++) {
                temp1.push([now[i][2], now[i][0]]);
                temp2 = formatNumber(now[i][1]);
                if ($("#car_down_time").val() == down_time[i]) {
                    temp2 = "<\span style=\"color:blue;font-weight:bold;\">" + temp2 + "<\/span>";
                }
                $("#car_cal").append("<t\d scope=\"row\">" + temp2 + "<\/td>");
            }

            $("#chart").empty();
            $("#chart").append("<\canvas id=\"myChart\"><\/canvas>");
            myChart(temp1);

        } else {
            splitToOne();
        }
    }
    function splitToOne() {
        $("#select_table").removeClass("select-min-table-show").addClass("select-min-table-not-show");
        $("#calculate_table").fadeOut(200);
        $("#myChart").fadeOut(300);
    }
    function oneToSplit() {
        $("#select_table").removeClass("select-min-table-not-show").addClass("select-min-table-show");
        $("#calculate_table").fadeIn(2000);
        $("#myChart").fadeIn(2000);
    }
    function isNumber(n) {
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }
});