/**
 * Created by Сергій on 30.07.2014.
 */
var dataMenuS;
var dataMenuD;
function delItemMenu(id) {

    $.each(dataMenuD, function(index, value){
        if(value.id == id){
            dataMenuD.splice(index, 1)
            return false;
        }
    });
    $("#" + id + "").parent().remove();
};

$(document).ready(function () {
    var img = $("span.prev").find("img").css("display", "none");
    var menuStatic = $("#menuStatic");
    var menuDynamic = $("ul#placeForDMenu");

    var form = $("form[name='test_2']");
    var formAdd = $("form[name='addItemMenu']");

    var widthgBlockforMenu = $("div#menuB").width();

    $("div#spinner").css("display", "none");
    getDMenu(true);

    function createStaticMenu(dataMenu) {
        var html = "";

        $.each(dataMenu, function (index, value) {
            var li = $("<li/>").addClass("static");
            var a = $("<a/>").attr("id", value.id).html(value.a);
            var ul = $("<ul/>");
            li.append(a);
            menuStatic.append(li);
            if (value.ul != null) {
                var ul = $("<ul/>");
                $.each(value.ul, function (index, value) {
                    var li = $("<li/>").addClass("static");
                    var a = $("<a/>").attr("id", value.id).html(value.a);
                    li.append(a);
                    ul.append(li);
                });
                li.append(ul);
                menuStatic.append(li);
            }
        });
        menuStatic.append(html);

    }

    function createDynamicMenu(dataMenu) {
        menuDynamic.html("");
        $.each(dataMenu, function (index, value) {
            var li = $("<li/>").addClass("dMenu");
            var a = $("<a/>").css("cursor", "pointer");
            var img = $("<img/>").addClass("close").attr("id", value.id).attr("src", "images/gtk-close.png")
                .attr("onclick", "delItemMenu(id)");
            var span = $("<span/>").html(value.title);
            li.append(a);
            a.append(img);
            a.append(span);
            menuDynamic.append(li);
        });
    }

    function getDMenu(staticGetBool) {
        $.ajax({
            url: "data/menu.json",
            method: "GET",
            async: false,
            success: function(data){
                dataMenuS = data.menuStaticBean;
                dataMenuD = data.menuDynamicBean;
            }
        });

        var widthStatickMenu;
        createDynamicMenu(dataMenuD);
        if (staticGetBool) {
            createStaticMenu(dataMenuS);
        }
        var w = $("ul#menuStatic")[0].childNodes[1].clientWidth;
        var c = $("ul#menuStatic")[0].childNodes.length - 1;
        widthStatickMenu = w * c;
        var dimanicW = widthgBlockforMenu - widthStatickMenu;
        $("div#scroll").css("width", dimanicW);

        $("span.next").css("margin-left", dimanicW - 20);

        $("li.static").click(function (e) {
            e.stopPropagation();
            var id = $(this).find("a").attr("id");
            for (i = 0; i < dataMenuS.length; i++) {
                if (dataMenuS[i].ul != null) {
                    for (j = 0; j < dataMenuS[i].ul.length; j++) {
                        if (id == dataMenuS[i].ul[j].id) {
                            $("#contentView").html(dataMenuS[i].ul[j].content);
                        }
                    }
                } else {
                    if (id == dataMenuS[i].id) {
                        $("#contentView").html(dataMenuS[i].content);
                    }
                }
            }
        });

        $("li.dMenu").click(function () {
            getContent($(this));
        });
    }

    function getContent(element){
        $("div#spinner").css("display", "block");
        var id = element.find("img").attr("id");
        for (i = 0; i < dataMenuD.length; i++) {
            if(dataMenuD[i].id == id){
                $("#contentView").html(dataMenuD[i].content);
            }
        }
        $("div#spinner").css("display", "none");
        return null;
    }

    formAdd.submit(function (e) {
        e.preventDefault();

        var size = dataMenuD.length;
        var id = dataMenuD[size - 1].id;

        var item = {id: id + 1};
        item.title = formAdd.find("#title").val();
        item.content = formAdd.find("#content").val();

        dataMenuD.push(item);

        var li = $("<li/>").addClass("dMenu").on("click",function(){getContent($(this))});
        var a = $("<a/>").css("cursor", "pointer");
        var img = $("<img/>").addClass("close").attr("id", item.id).attr("src", "images/gtk-close.png")
            .attr("onclick", "delItemMenu(id)");
        var span = $("<span/>").html(formAdd.find("#title").val());
        li.append(a);
        a.append(img);
        a.append(span);
        menuDynamic.append(li);

        $("#title").val("");
        $("#content").val("");
    });
});