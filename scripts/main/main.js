
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
            backgroundColor: 'rgb(255, 99, 132)',
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


$(function(){

    let { chart, data } = shuffle();

    $("#shuffle_btn").unbind("click").bind("click", function(){

        const size_of_data = getInputData();

        removeChart(chart);
        let { chart:next_chart, data:next_data } = shuffle(size_of_data);

        chart = next_chart;
        data = next_data;
    });

    $("#sort_btn").unbind("click").bind("click", function(){

        const req_data = data.datasets[0].data;

        const algo_type = document.getElementById("algo_type").value;

        const res = sortApi(req_data, algo_type);

        if (res === false) {
            $("#sort_type_error_modal").modal("show");
        }
    });

  });