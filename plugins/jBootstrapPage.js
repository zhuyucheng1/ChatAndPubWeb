(function($) {
    $.fn.jBootstrapPage = function(config) {

        if (this.size() != 1)
            $.error('请为这个插件提供一个唯一的编号');

        var c = {
            pageSize : 10,
            total : 0,
            maxPages : 1,
            realPageCount : 1,
            lastSelectedIndex : 1,
            selectedIndex : 1,
            currentPageIndex : 1,
            maxPageButton: 3,
            onPageClicked : null
        };

        this.setCurrentPageIndex = function(pageIndex) {
            this.find('li').removeClass('active');
            this.find('li:nth-child(' + (pageIndex + 3) + ')').addClass('active');
        }

        var firstBtn, preBtn, nextBtn, lastBtn;

        return this.each(function() {

            var $this = $(this);
            if (config) $.extend(c, config);
            init();
            bindALL();

            function init() {
                $this.find('li').remove();
                c.maxPages = Math.ceil(c.total/c.pageSize);

                if(c.maxPages < 1) return;
                var pageCount2 = Math.ceil(c.total / c.pageSize);

                $this.append('<li class="disabled"><a class="first" href="#">&laquo;</a></li>');
                $this.append('<li class="' + (c.selectedIndex > 1 && pageCount2 > 1 ? '' : 'disabled')+ '"><a class="pre" href="#">上一页</a></li>');

                var pageCount = c.maxPages < c.maxPageButton ? c.maxPages : c.maxPageButton;
                var pNum = 0;
                for(var index = 1; index <= pageCount; index++) {
                    pNum++;
                    $this.append('<li class="page" pNum="'+pNum+'"><a href="#" page="'+index+'">'+index+'</a></li>');
                }

                $this.append('<li class="' + (c.selectedIndex < pageCount2 ? '' : 'disabled')+ '"><a class="next" href="#">下一页</a></li>');
                $this.append('<li><a class="last" href="#">&raquo;</a></li>');

                //总几页,跳转到第几页
                $this.append('<li class="selectWrap">分页数<select  id="selectOption" value="'+c.pageSize+'" ><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="100">100</option></select></li><li class="gopage" ><div class="gopagetitle">共' + pageCount2 + '页&nbsp;' +
                    '跳转到</div><input type="text" class="gopageinput form-control" id="toPageInput" size="3px;" ><a class="gopagebtn" id="toPageButton">确定</a></li>');
                $("#selectOption").val($("#selectOption").attr('value'));
                var valInt = $("#selectOption").val();
                sessionStorage.setItem("sysSelectItemPaySize",valInt);





                //跳转到第几页事件
                $this.find("#toPageButton").click(function () {
                    controlLoading();

                    var toPageIn = $this.find("#toPageInput").val();
                    if (toPageIn && !isNaN(toPageIn) && toPageIn > 0 && toPageIn <= pageCount2){

                        c.selectedIndex = toPageIn - 1;
                        c.onPageClicked($this, c.selectedIndex);
                        mathNextPage(c.selectedIndex, c.selectedIndex, c.maxPages, c.maxPageButton);

                        var selectedBtn = $this.find('li.page').find('a[page="'+(c.selectedIndex+1)+'"]');

                        onClickPage(selectedBtn, true);
                    }
                })

                if(c.maxPageButton > c.maxPages) {
                    //$this.find('li a.next').parent().addClass("disabled");
                    $this.find('li a.last').parent().addClass("disabled");
                }else {
                    //$this.find('li a.next').parent().removeClass("disabled");
                    $this.find('li a.last').parent().removeClass("disabled");
                }



                //初始化这个分页按钮时, 选中哪一个
                $this.find('li:nth-child('+(c.selectedIndex+2)+')').addClass('active');

                firstBtn = $this.find('li a.first').parent();
                preBtn = $this.find('li a.pre').parent();
                lastBtn = $this.find('li a.last').parent();
                nextBtn = $this.find('li a.next').parent();
            }

            function mathPrePage(currButtonNum, currPage, maxPage, showPage) {
                if(maxPage < 1) return;

                //选中的按钮大于中间数，就进一位
                var middle = Math.ceil(showPage/2); // 4
                // 4 > 3
                // 5 - 4 + 3
                if(currButtonNum != currPage && currButtonNum < middle) {
                    $this.find('li.page').remove();

                    //1 2 3 4 5 6 7 8 9 10
                    //
                    var endPages = currPage + Math.floor(middle/2);
                    if(endPages < c.maxPageButton) endPages = c.maxPageButton+1;

                    var startPages = endPages - c.maxPageButton;

                    if(startPages <= 0)startPages = 1;

                    if(endPages - startPages >= c.maxPageButton) {
                        var d = endPages - startPages - c.maxPageButton;
                        if(d == 0) d = 1;
                        endPages -= d;
                    }

                    var pNum = 0;
                    var html = '';
                    for(var index = startPages; index <= endPages; index++) {
                        pNum++;
                        html += '<li class="page" pNum="'+pNum+'"><a href="#" page="'+index+'">'+index+'</a></li>';
                    }

                    $this.find('li:nth-child(2)').after(html);

                    bindPages();
                }
            }

            function mathNextPage(currButtonNum, currPage, maxPage, showPage) {
                if(maxPage < 1) return;
                var offsetRight = 2;
                //选中的按钮大于中间数，就进一位
                var middle = showPage - 1; // 4
                // 4 > 3
                // 5 - 4 + 3
                if((currButtonNum != currPage+1 || maxPage > showPage)) {
                    //显示后面2个按钮
                    var startPages = currPage - offsetRight;
                    var endPages = currPage + middle;

                    endPages = endPages >= maxPage ? maxPage : endPages;

                    if(endPages <= c.maxPageButton) endPages = c.maxPageButton;

                    if(endPages - startPages >= c.maxPageButton) {
                        var d = endPages - startPages - c.maxPageButton;
                        endPages -= d;
                    }

                    if(endPages == maxPage)endPages++;

                    if(endPages - startPages < c.maxPageButton) {
                        var d = c.maxPageButton - (endPages - startPages);
                        startPages -= d;
                    }

                    var pNum = 0;
                    var html = '';

                    //如果算出来到了负数,从头开始算起
                    if (startPages <= 0) {
                        startPages = 1;
                        if (c.maxPages > c.pageSize) {
                            endPages = c.maxPageButton + 1;
                        } else {
                            // endPages = c.maxPageButton + 1;
                            endPages = c.maxPages + 1;

                        }
                    }

                    for(var index = startPages; index < endPages; index++) {
                        pNum++;
                        html += '<li class="page" pNum="'+pNum+'"><a href="#" page="'+index+'">'+index+'</a></li>';
                    }

                    $this.find('li.page').remove();
                    $this.find('li:nth-child(2)').after(html);

                    bindPages();

                    return true;
                }else{
                    return false;
                }




                /*if((currButtonNum != currPage+1 || maxPage > showPage) && currButtonNum > middle) {
                    var startPages = currPage - middle + offsetRight;

                    var endPages = currPage + middle + offsetRight;
                    endPages = endPages > maxPage ? maxPage : endPages;

                    if(endPages < c.maxPageButton) endPages = c.maxPageButton;

                    if(endPages - startPages > c.maxPageButton) {
                        var d = endPages - startPages - c.maxPageButton;
                        endPages -= d;
                    }

                    if(endPages - startPages < c.maxPageButton) {
                        var d = c.maxPageButton - (endPages - startPages);
                        startPages -= d;
                    }

                    var pNum = 0;
                    var html = '';
                    for(var index = startPages; index < endPages; index++) {
                        pNum++;
                        html += '<li class="page" pNum="'+pNum+'"><a href="#" page="'+index+'">'+index+'</a></li>';
                    }

                    $this.find('li.page').remove();
                    $this.find('li:nth-child(2)').after(html);

                    bindPages();
                }*/
            }

            function onClickPage(pageBtn, notCallBack) {
                controlLoading();
                c.lastSelectedIndex = c.selectedIndex;
                c.selectedIndex = parseInt(pageBtn.text());

                if(!notCallBack && c.onPageClicked) {
                    c.onPageClicked.call(this, $this, c.selectedIndex-1);
                }

                $this.find('li.active').removeClass('active');
                pageBtn.parent().addClass('active');

                if(c.selectedIndex > 1) {
                    if(preBtn.hasClass('disabled')) {
                        firstBtn.removeClass("disabled");
                        preBtn.removeClass("disabled");

                        bindFirsts();
                    }
                }else {
                    if(!preBtn.hasClass('disabled')) {
                        firstBtn.addClass("disabled");
                        preBtn.addClass("disabled");
                    }
                }

                if(c.selectedIndex >= c.maxPages) {
                    if(!nextBtn.hasClass('disabled')) {
                        nextBtn.addClass("disabled");
                        lastBtn.addClass("disabled");
                    }
                }else {
                    if(nextBtn.hasClass('disabled')) {
                        nextBtn.removeClass("disabled");
                        lastBtn.removeClass("disabled");

                        bindLasts();
                    }
                }
            }

            function onPageBtnClick($_this) {
                var selectedText = $_this.text();
                var selectedBtn = $this.find('li.active').find('a');

                if(selectedText == '下一页' || selectedText == '»') {

                    var selectedIndex = parseInt(selectedBtn.text());
                    var selectNum = parseInt($this.find('li.active').attr('pNum'))+1;
                    if(selectNum > c.maxPageButton) selectNum = c.maxPageButton-1;

                    if(selectedIndex > 0) {
                        mathNextPage(selectNum, selectedIndex, c.maxPages, c.maxPageButton);
                        selectedBtn = $this.find('li.page').find('a[page="'+(selectedIndex+1)+'"]');
                    }
                }
                else if(selectedText == '上一页'  || selectedText == '«') {
                    var selectedIndex = parseInt(selectedBtn.text())-1;
                    var selectNum = parseInt($this.find('li.active').attr('pNum'))-1;
                    if(selectNum < 1) selectNum = 1;

                    mathPrePage(selectNum, selectedIndex, c.maxPages, c.maxPageButton);
                    selectedBtn = $this.find('li.page').find('a[page="'+(selectedIndex)+'"]');
                }
                else {
                    selectedBtn = $_this;
                }

                onClickPage(selectedBtn);
            }

            function onPageBtnClick($_this) {
                var selectedText = $_this.text();
                var selectedBtn = $this.find('li.active').find('a');

                if(selectedText == '下一页' || selectedText == '»') {
                    var selectedIndex = parseInt(selectedBtn.text());
                    var selectNum = parseInt($this.find('li.active').attr('pNum'))+1;
                    if(selectNum > c.maxPageButton) selectNum = c.maxPageButton-1;

                    if(selectedIndex > 0) {
                        mathNextPage(selectNum, selectedIndex, c.maxPages, c.maxPageButton);
                        selectedBtn = $this.find('li.page').find('a[page="'+(selectedIndex+1)+'"]');
                    }
                }
                else if(selectedText == '上一页'  || selectedText == '«') {
                    var selectedIndex = parseInt(selectedBtn.text())-1;
                    var selectNum = parseInt($this.find('li.active').attr('pNum'))-1;
                    if(selectNum < 1) selectNum = 1;

                    mathPrePage(selectNum, selectedIndex, c.maxPages, c.maxPageButton);
                    selectedBtn = $this.find('li.page').find('a[page="'+(selectedIndex)+'"]');
                }
                else {
                    selectedBtn = $_this;
                }

                onClickPage(selectedBtn);
            }

            function bindPages() {
                $this.find("li.page a").each(function(){
                    if($(this).parent().hasClass('disabled')) return;

                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });

                $this.find("li.page a").click(function(e){
                    e.preventDefault();

                    $(this).trigger('pageClick', e);
                });
            }

            function bindFirsts() {
                $this.find("li a.first,li a.pre").each(function() {
                    if($(this).parent().hasClass('disabled')) return;

                    $(this).unbind('pageClick');
                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });
            }

            function controlLoading(){
                setTimeout(function(){
                    $(".loading").addClass("ng-hide");
                    $(".spinner").addClass("ng-hide");
                },1000);
                $(".loading").removeClass("ng-hide");
                $(".spinner").removeClass("ng-hide");
            }

            function bindLasts() {
                $this.find("li a.last,li a.next").each(function() {
                    if($(this).parent().hasClass('disabled')) return;

                    $(this).unbind('pageClick');
                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });
            }

            function bindALL() {
                $this.find("li.page a,li a.first,li a.last,li a.pre,li a.next").each(function() {
                    if($(this).parent().hasClass('disabled')) return;

                    $(this).on('pageClick', function(e) {
                        onPageBtnClick($(this));
                    });
                });

                $this.find("li.page a,li a.first,li a.last,li a.pre,li a.next").click(function(e) {
                    e.preventDefault();
                    controlLoading();
                    if($(this).parent().hasClass('disabled')) return;
                    $(this).trigger('pageClick', e);
                });
            }
        });
    };
})(jQuery);

(function(jQuery){
    tablesort();
    function tablesort(){
        $('.dataTable th').click(function(event) {
            // console.log('th')
            if($(this).hasClass('sorting_asc')){
                $(this).addClass('sorting_desc');
                $(this).removeClass('sorting_asc');
                // if($(this).siblings('th').hasClass('sorting_asc')){
                //     $(this).removeClass('sorting_asc').addClass('sorting')
                // }

            } else if($(this).hasClass('sorting_desc')){
                $(this).addClass('sorting_asc')
                $(this).removeClass('sorting_desc')
                // $(this).siblings('th').addClass('sorting')
            }else if($(this).hasClass('sorting')){
                $(this).addClass('sorting_asc')
                $(this).removeClass('sorting')
            }
        });
    }
})(jQuery);
$(document).ready(function() {
    $(".collapse-link").on("click", function() {
        var a = $(this).closest(".x_panel"),
            b = $(this).find("i"),
            c = a.find(".x_content");
        a.attr("style") ? c.slideToggle(200, function() {
            a.removeAttr("style")
        }) : (c.slideToggle(200), a.css("height", "auto")), b.toggleClass("fa-chevron-up fa-chevron-down")
    }), $(".close-link").click(function() {
        var a = $(this).closest(".x_panel");
        a.remove()
    })
});
function tableEmpty(num){
    if(num){
        var table = document.getElementsByClassName('dataTable')[0];
        console.log("tableEmpty")
        var tfoot = document.createElement('tfoot');
        if($("table").find($("tfoot")).length>0){
        }else{
            table.appendChild(tfoot);
        }
        $("tfoot").html('<tr><td>暂无数据~~~</td></tr>');

        $("tfoot tr td").css({
            'line-height': '36px',
            'text-align': 'center',
            'border-bottom':'1px solid #eaeff0',
            'background-color':'#f9f9f9'
        }).attr("colspan", num).siblings().remove();
    }else{
        $("tfoot").html("")
    }

}