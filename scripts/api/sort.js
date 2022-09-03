let loading = false;

const sortApi = (data, sort_type) => {
    console.log(`data: ${data}, sort : ${sort_type}`);

    if (sort_type === "Sorting Algorithm") {
        return false;
    }

    let return_data = [];

    let color_data = [];

    //console.log(data);

    $.ajax({
        url: `http://172.30.1.32:9001/api-v1/sorts/?sort_type=${sort_type}&data=${data}`,
        // beforeSend: function(xhr){
        //     xhr.setRequestHeader("system-key", "key django-insecure-fh2#g)caszb0up1gee@7@u7fcxct=r79sgf#yv^fn-5p7ux5*7")
        // },
        async: false,
        method: "GET",
        // data: data,
        contentType: "application/json",
    }).done(function(data) {
        $("#ajax_loading_modal").modal("hide");

        console.log("response : ", data);

        data["message"]["data"].forEach(element => {
            return_data.push(element);
        });

        data["message"]["color"].forEach(element => {
            color_data.push(element);
        })

    }).fail(function(error) {
        alert(error.errors);
    });

    return { return_data, color_data };

}


$(function() {

});