let loading = false;

const searchApi = (target_data, data, search_type) => {
    console.log(`data: ${data}, sort : ${search_type}`);

    if (search_type === "Searching Algorithm") {
        return false;
    }

    let return_data = [];

    //console.log(data);

    $.ajax({
        url: `http://127.0.0.1:8000/api-v1/searchings/?search_type=${search_type}&data=${data}&target=${target_data}`,
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


$(function() {

});