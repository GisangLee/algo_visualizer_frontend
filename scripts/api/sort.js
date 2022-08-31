const sortApi = (data, sort_type) => {
    console.log(`data: ${data}, sort : ${sort_type}`);

    if (sort_type === "Sorting Algorithm") {
        return false;
    }

    //console.log(data);

    $.ajax({
        url: LOCAL_URL + `sorts/?sort_type=${sort_type}&data=${data}`,
        // beforeSend: function(xhr){
        //     xhr.setRequestHeader("system-key", "key django-insecure-fh2#g)caszb0up1gee@7@u7fcxct=r79sgf#yv^fn-5p7ux5*7")
        // },
        method: "GET",
        // data: data,
        contentType: "application/json",
    }).done(function(data) {

        console.log(data);

    }).fail(function(error) {
        alert(error);
    });

}

$(function() {

});