
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

    const data = {
        labels: labels,
        datasets: [{
            label: 'sort',
            //backgroundColor: colors,
            backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF4D4D'],
            borderColor: 'rgb(255, 99, 132)',
            
            data: arr,
        }]
    };

    return data;
};


const setChart = (data) => {

    const config = {
        type: 'bar',
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

const removeChart = (chart) => {
    chart.destroy();
};


const getInputData = () =>{
    let size_of_data = parseInt($("#size_of_data").val());

    if (isNaN(size_of_data)) {
        size_of_data = 20;
    }

    return size_of_data;
};

function display_sorted_data_to_chart(chart, initial_data, sorted_data, sorted_color_data) {
    let labels = initial_data.labels;
    //let data = initial_data.datasets[0].data;
    let data = initial_data
    let colors = initial_data.datasets[0].backgroundColor;

    let timeout = 0;

    console.log(data.datasets[0].data.length);
    

    for (let i = 0; i < sorted_data.length; i++) {
        //console.log(initial_data.datasets[0].data.legnth / i);

        swap(colors, i);
        timeout += 10;
        //this.updateChartDelayed(chart, data, sorted_data[i], timeout, sorted_color_data[i]);
        this.updateChartDelayed(chart, data, sorted_data[i], timeout, colors);
    }
};

function swap(arr, i) {
    let tmp = arr[i];
    arr[i] = arr[i + 1];
    arr[i + 1] = tmp;
}
  
function updateChartDelayed(chart, data, sorted_data, timeout, colors) {
    console.log(`initial data : ${data}`);
    setTimeout(() => {
        data.datasets[0].data = sorted_data;
        data.datasets[0].backgroundColor = colors;
        chart.update();
    }, timeout);
};
// function updateChartDelayed(chart, data, sorted_data, timeout, sorted_color_data) {
//     console.log(`initial data : ${data}`);
//     setTimeout(() => {
//         data.datasets[0].data = sorted_data;
//         data.datasets[0].backgroundColor = sorted_color_data;
//         chart.update();
//     }, timeout);
// };

$(function(){

    let { chart, data } = shuffle();

    data.datasets[0].backgroundColor[0] = "#C74C4C";
    chart.update();

    $("#shuffle_btn").unbind("click").bind("click", function(){

        const size_of_data = getInputData();

        removeChart(chart);
        let { chart:next_chart, data:next_data } = shuffle(size_of_data);

        chart = next_chart;
        data = next_data;


        data.datasets[0].backgroundColor[0] = "#C74C4C";
        chart.update();
    });

    $("#sort_btn").unbind("click").bind("click", function(){

        const req_data = data.datasets[0].data;

        const algo_type = document.getElementById("algo_type").value;

        const { return_data:res, color_data } = sortApi(req_data, algo_type);

        if (res === false) {
            $("#sort_type_error_modal").modal("show");
        }

        console.log(`res : ${res}`);
        
        setTimeout(() => display_sorted_data_to_chart(chart, data, res, color_data), 1000);
    });

});