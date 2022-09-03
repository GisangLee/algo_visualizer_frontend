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

const generateRandomNumbers = (labels, emptyList, colors, search_type=null) => {

    let totalIndex = emptyList.length;

    let arr = [];

    while (arr.length < totalIndex){
      let randomNum = Math.floor(Math.random() * totalIndex + 1)
      if (arr.indexOf(randomNum) === -1) {
        arr.push(randomNum);
      }
    }

    if (search_type === "binary"){
        arr = arr.sort(function(a, b) { // 오름차순
            return a - b;
        });;
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

    console.log("scatter_data : ", scatter_data);

    
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

const shuffle = (size_of_data = 20, search_type=null) => {    
    const { labels, emptyList, colors } = generateEmptyList(size_of_data);
    const data = generateRandomNumbers(labels, emptyList, colors, search_type);

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

        const next_pointer = {
            "x": i + 1,
            "y": data.datasets[0].data[i]
        };

        timeout += 50;

        this.updateChartDelayed(chart, data, next_pointer, timeout, i);
    }
};


const display_binary_search_to_chart = (chart, data, binary_pointer_list) => {
    let colors = data.datasets[0].backgroundColor;

    let timeout = 0;

    const mid_points = binary_pointer_list["mid_point"]
    const start_points = binary_pointer_list["start_point"]
    const end_points = binary_pointer_list["end_point"]
    
    for (let i = 0; i < mid_points.length; i++) {

        const mid_point = {
            "x": mid_points[i],
            "y": data.datasets[0].data[mid_points[i]]
        };

        const start_point = {
            "x": start_points[i],
            "y": data.datasets[0].data[start_points[i]]
        };

        const end_point = {
            "x": end_points[i],
            "y": data.datasets[0].data[end_points[i]]
        };

        const next_pointer = {
            mid_point,
            start_point,
            end_point,
        }

        timeout += 1;

        this.updateBinaryChartDelayed(chart, data, next_pointer, timeout);
    }
};

const set_null_prev_pointers = (data) => {

    for(let i = 0; i < data.datasets[1].data.length; i++) {
        data.datasets[1].data[i]["y"] = null;
        //data.datasets[1].data[i]["x"] = null;
    }
}

function updateChartDelayed(chart, data, next_pointer, timeout, i) {
    
    setTimeout(() => {
        data.datasets[1].data[i] = next_pointer;
        data.datasets[1].data[i - 1]["y"] = null;       
        
        chart.update();
    }, timeout)
};

function updateBinaryChartDelayed(chart, data, next_pointer, timeout){

    setTimeout(() => {
        set_null_prev_pointers(data);

        data.datasets[1].data[next_pointer["start_point"]["x"]] = next_pointer["start_point"];
        data.datasets[1].data[next_pointer["mid_point"]["x"]] = next_pointer["mid_point"];
        data.datasets[1].data[next_pointer["end_point"]["x"]] = next_pointer["end_point"];

        data.datasets[1].backgroundColor = ['#FF6633', '#FFB399', '#FF33FF'],
        
        data.datasets[1].label = ["start", "mid", "end"]        

        chart.update();
    }, timeout);
}


$(function() {
    let { chart, data } = shuffle();
    data.datasets[0].backgroundColor[0] = "#C74C4C";


    const plugin = {
        beforeInit(chart) {
          // Get reference to the original fit function
          const originalFit = chart.legend.fit;
      
          // Override the fit function
          chart.legend.fit = function fit() {
            console.log("this.hegith :", this.height);
            // Call original function and bind scope in order to use `this` correctly inside it
            originalFit.bind(chart.legend)();
            // Change the height as suggested in another answers
            this.height += 50;
          }
        }
    }

    plugin.beforeInit(chart);

    chart.update();
    


    $("#shuffle_btn").unbind("click").bind("click", function(){

        const { size_of_data, target_data } = getInputData();

        const search_type = document.getElementById("algo_type").value;

        removeChart(chart);
        let { chart:next_chart, data:next_data } = shuffle(size_of_data, search_type);

        chart = next_chart;
        data = next_data;


        data.datasets[0].backgroundColor[0] = "#C74C4C";
        plugin.beforeInit(chart);
        chart.update();
    });

    $("#search_btn").unbind("click").bind("click", function() {
        plugin.beforeInit(chart);

        const { size_of_data, target_data } = getInputData();
        const req_data = data.datasets[0].data;
        const search_type = document.getElementById("algo_type").value;
        let response;

        if (search_type === "binary"){
            response = binarySearchhApi(target_data, req_data, search_type);
        }else if (search_type === "linear"){
            response = linearSearchApi(target_data, req_data, search_type);
        }
        
        if (response === false) {
            $("#sort_type_error_modal").modal("show");
        }

        if (search_type === "binary"){
            setTimeout(() => display_binary_search_to_chart(chart, data, response), 1000);    
        }else{
            setTimeout(() => display_searched_data_to_chart(chart, data, response), 1000);
        }

        
    });

});