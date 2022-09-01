
const generateEmptyList = (size_of_data) => {

    const loop = parseInt(size_of_data);

    for (var emptyList=[],i=0; i < loop; ++i) emptyList[i]=i;

    for (var labels=[],i=0; i < loop; ++i) labels[i]="";
    return { emptyList, labels };
}

const generateRandomNumbers = (labels, emptyList) => {

    let totalIndex = emptyList.length;

    let arr = []

    while (arr.length < totalIndex){
      let randomNum = Math.floor(Math.random() * totalIndex + 1)
      if (arr.indexOf(randomNum) === -1) {
        arr.push(randomNum)
      }
    }

    console.log("arr : ", arr);

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF4D4D'],
            borderColor: 'rgb(255, 99, 132)',
            data: arr,
        }]
    };

    return data
}


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
}

const shuffle = (size_of_data = 20) => {    
    const { labels, emptyList} = generateEmptyList(size_of_data);
    const data = generateRandomNumbers(labels, emptyList);
    const chart = setChart(data);

    return { chart, data };
}

const removeChart = (chart) => {
    chart.destroy();
}


const getInputData = () =>{
    let size_of_data = parseInt($("#size_of_data").val());

    if (isNaN(size_of_data)) {
        size_of_data = 20;
    }

    return size_of_data;
}

function bubble_sort(chart, initial_data, sorted_data) {
    let labels = initial_data.labels;
    let data = initial_data.datasets[0].data;
    let colors = initial_data.datasets[0].backgroundColor;
    let swapped;
    let timeout = 0;

    for (let i = 0; i < sorted_data.length; i++) {
        data = sorted_data[i];
        chart.update();
    }

    // do {
    //     swapped = false;
    //     for (let i = 0; i < 2; i++) {

    //         data = sorted_data[i];
    //         chart.update();
    //         swapped = true;
    //         // swap(labels, "");
    //         // swap(data, sorted_data[i]);
    //         // swap(colors, i);
    //         // timeout += 50;
    //         // this.updateChartDelayed(labels.slice(0), data, colors.slice(0), timeout, chart);
    //         // swapped = true;
    //     }
    //   } while (swapped);
}

function swap(arr, i) {
    arr = i;
}
  
function updateChartDelayed(labels, data, colors, timeout, chart) {
    setTimeout(() => {
        data.labels = labels;
        data.datasets[0].data = data;
        data.datasets[0].backgroundColor = colors;
        chart.update();
}, timeout);
}

$(function(){

    let { chart, data } = shuffle();

    $("#shuffle_btn").unbind("click").bind("click", function(){

        const size_of_data = getInputData();

        removeChart(chart);
        let { chart:next_chart, data:next_data } = shuffle(size_of_data);

        chart = next_chart;
        data = next_data;
    });

    $("#sort_btn").unbind("click").bind("click", function (){

        const req_data = data.datasets[0].data;

        const algo_type = document.getElementById("algo_type").value;

        const res = sortApi(req_data, algo_type);

        if (res === false) {
            $("#sort_type_error_modal").modal("show");
        }

        console.log(`res : ${res}`);

        //setTimeout(() => bubble_sort(chart, data, res), 1000);
    });

  });