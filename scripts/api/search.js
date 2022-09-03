let loading = false;

const linearSearchApi = (target_data, data, search_type) => {
    console.log(`data: ${data}, sort : ${search_type}`);

    if (search_type === "Searching Algorithm") {
        return false;
    }

    let return_data = [];

    $.ajax({
        url: `http://172.30.1.32:9001/api-v1/searchings/?search_type=${search_type}&data=${data}&target=${target_data}`,
        // beforeSend: function(xhr){
        //     xhr.setRequestHeader("system-key", "key django-insecure-fh2#g)caszb0up1gee@7@u7fcxct=r79sgf#yv^fn-5p7ux5*7")
        // },
        async: false,
        method: "GET",
        // data: data,
        contentType: "application/json",
    }).done(function(data) {
        $("#ajax_loading_modal").modal("hide");

        data["message"].forEach(element => {
            return_data.push(element);
        });

    }).fail(function(error) {
        alert(error.errors);
    });

    return return_data;

}

const binarySearchhApi = (target_data, data, search_type) => {
    console.log(`data: ${data}, sort : ${search_type}`);

    if (search_type === "Searching Algorithm") {
        return false;
    }

    let return_data = {
        mid_point: [],
        start_point: [],
        end_point: []
    };

    $.ajax({
        url: `http://172.30.1.32:9001/api-v1/searchings/?search_type=${search_type}&data=${data}&target=${target_data}`,
        // beforeSend: function(xhr){
        //     xhr.setRequestHeader("system-key", "key django-insecure-fh2#g)caszb0up1gee@7@u7fcxct=r79sgf#yv^fn-5p7ux5*7")
        // },
        async: false,
        method: "GET",
        // data: data,
        contentType: "application/json",
    }).done(function(data) {
        $("#ajax_loading_modal").modal("hide");

        for(let i = 0; i < data["message"]["start"].length; i++){
            return_data["mid_point"].push(data["message"]["mid"][i]);
            return_data["start_point"].push(data["message"]["start"][i]);
            return_data["end_point"].push(data["message"]["end"][i]);
        };

    }).fail(function(error) {
        alert(error.errors);
    });

    return return_data;

}

const hashSearchApi = (target_data, data, search_type) => {
    console.log(`data: ${data}, sort : ${search_type}`);

    if (search_type === "Searching Algorithm") {
        return false;
    }

    let return_data = [];

    $.ajax({
        url: `http://172.30.1.32:9001/api-v1/searchings/?search_type=${search_type}&data=${data}&target=${target_data}`,
        // beforeSend: function(xhr){
        //     xhr.setRequestHeader("system-key", "key django-insecure-fh2#g)caszb0up1gee@7@u7fcxct=r79sgf#yv^fn-5p7ux5*7")
        // },
        async: false,
        method: "GET",
        // data: data,
        contentType: "application/json",
    }).done(function(data) {
        $("#ajax_loading_modal").modal("hide");

        return_data.push(data["message"]);

    }).fail(function(error) {
        alert(error.errors);
    });

    return return_data;

}





$(function() {

});