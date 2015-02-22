/**
 * Created by Сергій on 03.08.2014.
 */

var Scroll = function () {
    var self = this;
    var step = $('.dMenu').width();
    var $scroll = $('div#scroll');
    var $imgPrev = $("span.prev").find("img");
    var $imgNext = $("span.next").find("img");

    self.init = function () {
        $imgPrev.hide();
        self.scrollLeft();
        self.scrollRight();
    };

    self.scrollLeft = function () {
        $imgPrev.click(function () {
            var x = $scroll.scrollLeft();
            $imgNext.show();
            if (x - step <= 0) {
                $scroll.animate({scrollLeft: x - step});
                $(this).hide()
            }
            $(function () {
                $scroll.animate({scrollLeft: x - step});
            });
        });
    };

    self.scrollRight = function () {
        $imgNext.click(function () {
            var maxW = $("#placeForDMenu").width() - $scroll.width();
            var x = $scroll.scrollLeft();
            $imgPrev.show();
            var xNext = 0;
            $(function () {
                xNext = x + step;
                if (xNext + step >= maxW) {
                    $scroll.animate({scrollLeft: xNext});
                    $imgNext.hide();
                } else {
                    $scroll.animate({scrollLeft: xNext});
                }
            });
        });
    };

    self.init();

};