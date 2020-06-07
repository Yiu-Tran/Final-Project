$(document).ready(function (){
    var current_URL = location.href;
    $(".nav li a").each(function(){
        if($(this).attr("href") !== "#") {
            var target_URL = $(this).prop("href");
            if (target_URL == current_URL) {
                $(".nav li.active").removeClass("active");
                $(this).parent().addClass("active");
            }
        }
    });
});
