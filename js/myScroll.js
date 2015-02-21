/**
 * Created by Сергій on 03.08.2014.
 */

function myScrollToLeft() {
    var block = $('div#scroll');
    var x = block.scrollLeft();
    var img = $("span.prev").find("img");
    var imgNext = $("span.next").find("img");
    imgNext.css("display","block");
    if(x == 0){
        img.css("display","none");
    }
    $(function () {
        $('#scroll').animate({scrollLeft: x - 100});
    });
}


function myScrollToRight() {
    var block = $('div#scroll');
    var x = block.scrollLeft();
    var img = $("span.next").find("img");
    var imgPrev = $("span.prev").find("img");
    imgPrev.css("display","block");
    var xNext = 0;
    var tmp;
    $(function () {
        xNext = x + 100;
        $('#scroll').animate({scrollLeft: xNext});
        if (xNext%10 != 0){
            img.css("display", "none");
        }
    });

}