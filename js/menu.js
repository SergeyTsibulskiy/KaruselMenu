var Menu = function () {
    var self = this;
    var dataMenuS;
    var dataMenuD;

    var $menuStatic = $("#menuStatic");
    var $menuDynamic = $("ul#placeForDMenu");
    var $spinner = $("div#spinner");
    var $scrollDiv = $("div#scroll");
    var $submit = $("input[type='submit']");

    self.init = function () {
        $spinner.hide();
        self.getMenu();
        self.calcWidth();
        self.handleMenuD();
        self.handleMenuS();
        self.addItemMenu();
        self.deleteItem();
    };

    self.getMenu = function () {
        $.ajax({
            url: "data/menu.json",
            method: "GET",
            async: false,
            success: function (data) {
                dataMenuS = data.menuStaticBean;
                dataMenuD = data.menuDynamicBean;
                self.renderStaticMenu(dataMenuS);
                self.renderDynamicMenu(dataMenuD);
            }
        });
    };

    self.renderStaticMenu = function (dataMenu) {
        $.each(dataMenu, function (index, value) {
            var $li = $("<li />").addClass("static");
            var $a = $("<a />").attr("id", value.id).html(value.a);
            var $ul = $("<ul />");
            $li.append($a);
            $menuStatic.append($li);
            if (value.ul != null) {
                var $ul = $("<ul />");
                $.each(value.ul, function (index, value) {
                    var $li = $("<li />").addClass("static");
                    var $a = $("<a />").attr("id", value.id).html(value.a);
                    $li.append($a);
                    $ul.append($li);
                });
                $li.append($ul);
                $menuStatic.append($li);
            }
        });
    };

    self.renderDynamicMenu = function (dataMenu) {
        $.each(dataMenu, function (index, value) {
            var $li = $("<li/>").addClass("dMenu");
            var $a = $("<a/>").css("cursor", "pointer");
            var $img = $("<img/>").addClass("close").attr("id", value.id).attr("src", "images/gtk-close.png");
            var $span = $("<span/>").html(value.title);
            $a.append($img);
            $a.append($span);
            $li.append($a);
            $menuDynamic.append($li);
        });
    };

    self.handleMenuD = function () {
        $("li.dMenu").click(function () {
            self.getContent($(this));
        });
    };

    self.getContent = function getContent(element) {
        $spinner.css("display", "block");
        var id = element.find("img").attr("id");
        self.viewContent(dataMenuD, id);
        $spinner.css("display", "none");
    };

    self.viewContent = function (dataMenu, id) {
        for (i = 0; i < dataMenu.length; i++) {
            if (dataMenu[i].id == id) {
                $("#contentView").html(dataMenu[i].content);
            }
        }
    };

    self.handleMenuS = function () {
        $("li.static").click(function () {
            var id = $(this).find("a").attr("id");
            for (i = 0; i < dataMenuS.length; i++) {
                if (dataMenuS[i].ul != null) {
                    self.viewContent(dataMenuS[i].ul, id);
                } else {
                    if (id == dataMenuS[i].id) {
                        $("#contentView").html(dataMenuS[i].content);
                    }
                }
            }
        });
    };

    self.calcWidth = function () {
        var widthBlockforMenu = $("div#menuB").width();
        var $ul = $("ul#menuStatic");
        var w = $ul.find('li').width();
        var c = $ul.children().length;
        var widthStaticMenu = w * c;
        var dymanicW = widthBlockforMenu - widthStaticMenu;

        $scrollDiv.css("width", dymanicW);
        $("span.next").css("margin-left", dymanicW - 20);
    };

    self.addItem = function (item) {
        var $li = $("<li />").addClass("dMenu");
        var $a = $("<a />").css("cursor", "pointer");
        var $img = $("<img />").addClass("close").attr("id", item.id).attr("src", "images/gtk-close.png");
        var $span = $("<span />").html(item.content);
        $li.append($a);
        $a.append($img);
        $a.append($span);
        $menuDynamic.append($li);
        self.calcWidth();
    };

    self.addItemMenu = function () {
        $submit.click(function() {
            var size = dataMenuD.length;
            var lastId = dataMenuD[size - 1].id;

            var item = {id: lastId + 1};
            item.title = $("#title").val();
            item.content = $('#content').val();

            dataMenuD.push(item);
            self.addItem(item);

            $("#title").val("");
            $("#content").val("");
        });
    };

    self.deleteItem = function () {
        $('img.close').click(function () {
            var id = $(this).attr('id');
            $.each(dataMenuD, function (index, value) {
                if (value.id == id) {
                    dataMenuD.splice(index, 1);
                    return false;
                }
            });
            $("#" + id + "").parent().parent().remove();
            self.calcWidth();
        });
    };

    self.init();
};