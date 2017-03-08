(function($) {
    $.fn.scrolling = function() {
        var lay = arguments[2] ? false : true;
        var trackStyle, thumbStyle;
        var father = $(this);
        father.css({
            position: 'relative',
            overflow: 'hidden'
        });
        if (lay) { //垂直

            trackStyle = {
                width: 10,
                height: '100%',
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#f1f1f1'
            };
        } else { //水平
            trackStyle = {
                width: '100%',
                height: 10,
                position: 'absolute',
                bottom: 0,
                left: 0,
                backgroundColor: '#f1f1f1'
            };
        }
        thumbStyle = {
            height: 10,
            width: '100%',
            backgroundColor: '#c1c1c1',
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 999
        };
        var trackOption = $.extend(trackStyle, arguments[0] && arguments[0].constructor == Object ? arguments[0] : {});
        var thumbOption = $.extend(thumbStyle, arguments[1] && arguments[1].constructor == Object ? arguments[1] : {});
        if (lay) {
            father.append('<div class="trackV"><div class="thumbV"></div></div>');
            father.children('.content').css('overflow', 'hidden');
            father.children('.trackV').css(trackOption).children('.thumbV').css(thumbOption);
            var ul = father.children('.content');
            var track = father.find('.trackV');
            var thumb = father.find('.thumbV');
            var num = 0;
            var b = false;
            var H = track.height();
            var h = H * father.height() / ul.height();
            var HS = ul.height() - father.height();
            thumb.css('height', h);

            thumb[0].onmousedown = function(e) {
                b = true;
                num = e.offsetY;
            };
            thumb[0].onmouseup = function(e) {
                //this.releaseCapture()
                b = false;
            };
            document.onmousemove = function(e) {
                b = false;
            };
            track[0].onmousemove = function(e) {
                e.stopPropagation();
                if (b) {
                    var last = e.clientY - track.offset().top - num;
                    if (HS <= 0) return;
                    move(last)
                };
            };

            function getData(event) {
                var e = event || window.event;
                var data = e.detail || e.wheelDelta;
                data = Math.abs(data) > 5 ? (-data / 10) : (data * 4);
                var last = parseInt(thumb.css('top')) + data;
                if (HS <= 0) return;
                move(last);
            }
            if (father[0].addEventListener && !father[0].attachEvent) {
                father[0].addEventListener('mousewheel', getData);
                father[0].addEventListener('DOMMouseScroll', getData);
            } else if (father[0].attachEvent && !father[0].addEventListener) {
                father[0].attachEvent('onmousewheel', getData);
            } else {
                window.onmousewheel = getData;
            }

            function move(last) {
                last = last < 0 ? 0 : last;
                last = last > (H - h) ? (H - h) : last;
                thumb.css('top', last);
                ul.css('margin-top', -last * HS / (H - h));
            };
        } else {
            father.append('<div class="trackH"><div class="thumbH"></div></div>');
            father.children('.content').css('overflow', 'hidden');
            father.children('.trackH').css(trackOption).children('.thumbH').css(thumbOption);
            var ul = father.children('.content');
            var track = father.find('.trackH');
            var thumb = father.find('.thumbH');
            var num = 0;
            var b = false;
            var W = track.width();
            var w = W * father.width() / ul.width();
            var WS = ul.width() - father.width();

            thumb.css('width', w);

            thumb[0].onmousedown = function(e) {
                b = true;
                num = e.offsetX;
            };
            thumb[0].onmouseup = function(e) {
                b = false;
            };
            document.onmousemove = function(e) {
                b = false;
            };
            track[0].onmousemove = function(e) {
                e.stopPropagation();
                if (b) {
                    var last = e.clientX - track.offset().left - num;
                    if (WS <= 0) return;
                    move(last)
                };
            };

            function getData(event) {
                var e = event || window.event;
                var data = e.detail || e.wheelDelta;
                data = Math.abs(data) > 5 ? (-data / 10) : (data * 4);
                var last = parseInt(thumb.css('left')) + data;
                if (WS <= 0) return;
                move(last);
            };

            function move(last) {
                last = last < 0 ? 0 : last;
                last = last > (W - w) ? (W - w) : last;
                thumb.css('left', last);
                ul.css('margin-left', -last * WS / (W - w));
            };
        }
    };
})($);
