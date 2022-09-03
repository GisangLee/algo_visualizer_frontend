const generateEmptyList = (size_of_data) => {

    const loop = parseInt(size_of_data);

    let emptyList = [];
    let labels = [];
    let colors = [];

    for (let i = 0; i < loop; i++) {
        emptyList[i] = i;
        labels[i] = "";
        colors[i] = "#424242";
    }

    return { emptyList, labels, colors };
};

const generateRandomNumbers = (labels, emptyList, colors) => {

    let totalIndex = emptyList.length;

    let arr = [];

    while (arr.length < totalIndex){
      let randomNum = Math.floor(Math.random() * totalIndex + 1)
      if (arr.indexOf(randomNum) === -1) {
        arr.push(randomNum);
      }
    }

    let scatter_data = [];

    scatter_data.push({
        "x": 0,
        "y": arr[0]
    });

    for(let i = 1; i < arr.length; i++) {
        scatter_data.push({
            "x": i,
            "y": null   
        });
    };
    
    const data = {
        labels: labels,
        datasets: [
            {
                type: "bar",
                label: 'search',
                //backgroundColor: colors,
                backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF4D4D'],
                borderColor: 'rgb(255, 99, 132)',
                data: arr,
                order: 2,
            },
            {
                type: "scatter",
                backgroundColor: ["#000000"],
                label: "pointer",
                pointRadius: 9,
                pointHoverRadius: 10,
                data: scatter_data,
                order: 1
            }
        ]
    };

    return data;
};

const setChart = (data) => {

    const config = {
        type: 'scatter',
        data: data,
        options: {}
    };

    const dataChart = new Chart(
        document.getElementById('dataChart'),
        config
    );

    return dataChart;
};

const shuffle = (size_of_data = 20) => {    
    const { labels, emptyList, colors } = generateEmptyList(size_of_data);
    const data = generateRandomNumbers(labels, emptyList, colors);
    const chart = setChart(data);

    return { chart, data };
};

const getInputData = () =>{
    let size_of_data = parseInt($("#size_of_data").val());

    const target_data = $("#target_data").val();

    if (isNaN(size_of_data)) {
        size_of_data = 20;
    }

    return { size_of_data, target_data };
};

const removeChart = (chart) => {
    chart.destroy();
};

const display_searched_data_to_chart = (chart, data, searched_idx_list) => {
    let colors = data.datasets[0].backgroundColor;

    let timeout = 0;

    
    for (let i = 0; i < searched_idx_list.length; i++) {
        console.log(data.datasets[1].data[i]["y"]);
        //console.log(initial_data.datasets[0].data.legnth / i);
        const next_pointer = {
            "x": i + 1,
            //"y": searched_idx_list[i]
            "y": data.datasets[0].data[i]
        };

        timeout += 50;
        //console.log(`color : ${sorted_color_data[i]}`);
        //this.updateChartDelayed(chart, data, sorted_data[i], timeout, sorted_color_data[i]);
        this.updateChartDelayed(chart, data, next_pointer, timeout, i);
    }
};

function updateChartDelayed(chart, data, next_pointer, timeout, i){

    //console.log("기존 스캐터 : ", data.datasets[1].data);

    setTimeout(() => {
        data.datasets[1].data[i] = next_pointer;
        data.datasets[1].data[i - 1]["y"] = null;
        chart.update();
    }, timeout);
}


$(function() {
    let { chart, data } = shuffle();
    data.datasets[0].backgroundColor[0] = "#C74C4C";
    chart.update();

    $("#shuffle_btn").unbind("click").bind("click", function(){

        const { size_of_data, target_data } = getInputData();

        removeChart(chart);
        let { chart:next_chart, data:next_data } = shuffle(size_of_data);

        chart = next_chart;
        data = next_data;


        data.datasets[0].backgroundColor[0] = "#C74C4C";
        chart.update();
    });

    $("#search_btn").unbind("click").bind("click", function() {
        const { size_of_data, target_data } = getInputData();
        const req_data = data.datasets[0].data;
        const search_type = document.getElementById("algo_type").value;

        const response = searchApi(target_data, req_data, search_type);
        
        if (response === false) {
            $("#sort_type_error_modal").modal("show");
        }

        console.log("RES : ", response);

        setTimeout(() => display_searched_data_to_chart(chart, data, response), 1000);
        
    });

    console.log("준비 끝");
});