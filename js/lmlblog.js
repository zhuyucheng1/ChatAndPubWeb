function clearButterbar() {
    if (jQuery(".butterBar").length > 0) {
        jQuery(".butterBar").remove();
    }
}

function createButterbar(message) {
    var t = this;
    t.clearButterbar();
    jQuery("body").append('<div class="butterBar butterBar--center is-active"><p class="butterBar-message">' + message + '</p></div>');
    setTimeout("jQuery('.butterBar').remove()", 3000);
}
function go_Back(){
jQuery(".article").load("article.html")
}

jQuery(document).ready(function($) {
  go_Back();

    if( suxingme_url.duang ){
        $(window).on('load', function() {
            $('.loader').fadeOut();
            $('.loader-mask').delay(350).fadeOut('slow');
        });
    }


    if( suxingme_url.sideroll ){
        /*
        -------------------------
        StickySidebar
        -------------------------
        */
        jQuery('.sidebar').theiaStickySidebar({
          // Settings
          additionalMarginTop: 0
        });

    }

    //wow
    if( suxingme_url.wow ){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        });
        wow.init();
    }
    /*

    -------------------------
    StickyNavbar
    -------------------------
    */
    $("div.navbar-fixed-top").autoHidingNavbar();



    switch( suxingme_url.slidestyle ){
        case 'index_slide_sytle_1' :
            var owl = $('.top-slide');
            owl.owlCarousel({
                items: 1,
                loop:true,
                animateOut: 'fadeOut',
                smartSpeed:1000,
                autoplayHoverPause:true,
                autoplay:true,
                autoplayTimeout:3000,
                responsive:{
                    768:{
                      items:1,
                      nav : false,
                    }
                }
            });
            break;
        case 'index_slide_sytle_2' :
            var owl = $('.top-slide-two');
            owl.owlCarousel({
                items: 1,
                loop:true,
                animateOut: 'fadeOut',
                smartSpeed:1000,
                autoplay:true,
                autoplayTimeout:3000,
                autoplayHoverPause:true,
                nav : true,
                navText:'',
                responsive:{
                    768:{
                      items:1,
                      nav : false,
                    },
                    992:{
                        nav : true,
                        navText:'',
                    }
                }
            });
            break;
        case 'index_slide_sytle_3' :
            var owl = $('.top-slide-three');
            owl.owlCarousel({
                items:1,
                loop:true,
                margin:10,
                smartSpeed:1000,
                autoplayHoverPause:true,
                autoplay:true,
                nav : true,
                navText:'',
                responsive: {
                    768 : {
                        items: 1,
                        margin: 0,
                        nav : false,
                    },
                    992 : {
                        items: 3,
                        margin: 20,
                        center: true,
                        autoplayTimeout:5000,
                        autoWidth:true,
                    }
                }
            });
            break;
        case 'index_slide_sytle_4' :
            var owl = $('.top-slide-two');
            owl.owlCarousel({
                items: 1,
                loop:true,
                smartSpeed:1000,
                autoplay:true,
                autoplayTimeout:3000,
                autoplayHoverPause:true,
                nav : true,
                navText:'',
                responsive:{
                    768:{
                      items:1,
                      nav : false,
                    },
                    992:{
                        nav : true,
                        navText:'',
                    }
                }
            });
                break;
        default:
            break;
    }

    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $(document).on('click', '#comments-navi a',
    function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: $(this).attr('href'),
            beforeSend: function() {
                $('#comments-navi').remove();
                $('.commentlist').remove();
                $('#loading-comments').slideDown()
            },
            dataType: "html",
            success: function(out) {
                result = $(out).find('.commentlist');
                nextlink = $(out).find('#comments-navi');
                $('#loading-comments').slideUp(550);
                $('#loading-comments').after(result.fadeIn(800));
                $('.commentlist').after(nextlink);
                $('.commentlist .avatar').lazyload({
                    event: 'scrollstop',
                });
            }
        })
    })



    /*
    -------------------------
    LIKE
    -------------------------
    */

	$.fn.postLike = function() {
	 if ($(this).hasClass('current')) {
     createButterbar("您已经赞过啦:-)");
	 return false;
	 } else {
	 $(this).addClass('current');
	 var id = $(this).data("id"),
	 action = $(this).data('action'),
	 rateHolder = $(this).children('.count');
	 var ajax_data = {
	 action: "suxing_like",
	 um_id: id,
	 um_action: action
	 };
	 $.post(suxingme_url.url_ajax, ajax_data,
	 function(data) {
	 $(rateHolder).html(data);
	 });
	 return false;
	 }
	};
	$(document).on("click", "#Addlike",
	function() {
	 $(this).postLike();
	});

    /*
    -------------------------
    SEARCH
    -------------------------
    */

    $('.js-toggle-search').on('click', function () {
        $('.search-form').toggleClass('is-visible');
        $("html").addClass("overflow-hidden");
    });
    $('.close-search').click(function(){
        $(".search-form").removeClass("is-visible");
        $("html").removeClass("overflow-hidden");
    });


     /*
    -------------------------
    WEIXIN BOOM
    -------------------------
    */

    $('#tooltip-s-weixin').on('click', function () {
        $('.f-weixin-dropdown').toggleClass('is-visible');
    });
    $('#tooltip-f-weixin').on('click', function () {
        $('.f-weixin-dropdown').toggleClass('is-visible');
    });
    $(".close-weixin").on('click', function () {
        $(".f-weixin-dropdown").removeClass('is-visible');
    });

    /*
    -------------------------
    WEIXIN BOOM
    -------------------------
    */

    $('.su-dropbox .icon-wechat').on('click', function () {
        $('.single-weixin-dropdown').toggleClass('is-visible');
    });

    $(".single-weixin-dropdown .close-weixin").on('click', function () {
        $(".single-weixin-dropdown").removeClass('is-visible');
    });

    /*
    -------------------------
    toTop
    -------------------------
    */

    !function(o){"use strict";o.fn.toTop=function(t){var i=this,e=o(window),s=o("html, body"),n=o.extend({autohide:!0,offset:420,speed:500,position:!0,right:38,bottom:38},t);i.css({cursor:"pointer"}),n.autohide&&i.css("display","none"),n.position&&i.css({position:"fixed",right:n.right,bottom:n.bottom}),i.click(function(){s.animate({scrollTop:0},n.speed)}),e.scroll(function(){var o=e.scrollTop();n.autohide&&(o>n.offset?i.fadeIn(n.speed):i.fadeOut(n.speed))})}}(jQuery);
    $(function() {
        $('.to-top').toTop();
     });
    $('body').append('<a class="to-top"><i class="icon-up-small"></i></a>');

    /*
    -------------------------
    MAIN NAV
    -------------------------
    */

    $(".navbar-collapse ul.navbar-nav li:has(>ul)").addClass("has-children");

    if($(".navbar-collapse ul.navbar-nav li").hasClass("has-children")){
        $(".navbar-collapse ul.navbar-nav li.has-children").prepend('<span class="toggle-submenu"></span>')
    }

    $('.navbar-collapse ul.navbar-nav li span').click(function(){
        if($(this).siblings('ul').hasClass('opened')){
            $(this).siblings('ul').removeClass('opened').slideUp(200);
            $(this).closest('li').removeClass('active');
        }
        else{
            $(this).siblings('ul').addClass('opened').slideDown(200);
            $(this).closest('li').addClass('active');
        }
    });

    $(function(){
        $('.navbar-toggle').click(function(e){
            $('html, body').toggleClass('out');
            $('.navbar-fixed-top').toggleClass('out');
            $('.body-overlay').toggleClass('show-overlay');
            $('.navbar-collapse ul.navbar-nav').css({'height':document.documentElement.clientHeight});
            if ($('body').hasClass('out')) {
              $(this).focus();
            } else {
              $(this).blur();
            }
        });
        $('body').on({
            'click touchstart': function (e) {
              if ($('body').hasClass('out') && !$(e.target).closest('.navbar-collapse, button.navbar-toggle').length) {
                e.preventDefault();
                $('button.navbar-toggle').trigger('click');
                $('button.navbar-toggle').blur();
                $('.body-overlay').removeClass('show-overlay');

              }
            },
            keyup: function (e) {
              if (e.keyCode == 27 && $('body').hasClass('out')) {
                $('button.navbar-toggle').trigger('click');
              }
            }
        });
    });
    $(".navbar-collapse ul.navbar-nav").mCustomScrollbar({
        theme:"minimal-dark",
        mouseWheel:{scrollAmount:188,normalizeDelta:true}
    });

    /*
    -------------------------
    Page loader
    -------------------------
    */
    if( suxingme_url.site_loading ){
        $(window).on('load', function () {
            $('body').addClass('loaded');
            setTimeout(function () {
                $('#pageloader').fadeOut('slow');
            }, 300);
        });
    }
});


document.addEventListener('DOMContentLoaded', function(){
   var aluContainer = document.querySelector('.comment-form-smilies');
    if ( !aluContainer ) return;
    aluContainer.addEventListener('click',function(e){
    var myField,
        _self = e.target.dataset.smilies ? e.target : e.target.parentNode,
        tag = ' ' + _self.dataset.smilies + ' ';
        if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') {
            myField = document.getElementById('comment')
        } else {
            return false
        }
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = tag;
            myField.focus()
        } else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            var cursorPos = endPos;
            myField.value = myField.value.substring(0, startPos) + tag + myField.value.substring(endPos, myField.value.length);
            cursorPos += tag.length;
            myField.focus();
            myField.selectionStart = cursorPos;
            myField.selectionEnd = cursorPos
        } else {
            myField.value += tag;
            myField.focus()
        }
    });
});

jQuery(document).on("click", ".facetoggle", function($) {
    jQuery(".comment-form-smilies").toggle();
});



/**
 * Created by zyc on 2019/3/16.
 */
function myAjax(options) {
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  var params = options.data;
  //创建xhr对象 - 非IE6
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else { //IE6及其以下版本浏览器
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.withCredentials = true;
  //GET POST 两种请求方式
  if (options.type == "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type == "POST") {
    xhr.open("POST", options.url, true);
    //设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(params);
  }
  //接收
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText);
      } else {
        options.fail && options.fail(status);
      }
    }
  }
}
function getLoginUser() {
  myAjax({
    url:"http://118.25.59.30:8080/getLoginUser",
    dataType:'json',
    success:function(res){
      // console.log(res)
      var d = JSON.parse(res);
      // console.log(d.data.head);
      if(d.data.head){
        jQuery(".login").show();
        jQuery(".nologin").hide();
        jQuery(".login img").get(0).src = d.data.head;
        jQuery(".login span").text(d.data.name+"，欢迎你!");
      }
    }
  })
}
getLoginUser();
//格式化参数
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  arr.push(("v=" + Math.random()).replace(".",""));
  return arr.join("&");
}



jQuery(document).on("click", ".post-nav span", function($) {
    var _self = jQuery(this),
        _postlistWrap = jQuery('.posts-con'),
        _button = jQuery('#fa-loadmore'),
        _data = _self.data();
    if (_self.hasClass('is-loading')) {
        return false
    } else {
        _postlistWrap.html('<div class="wait-tips"><i class="icon-spin6 animate-spin"></i> 加载中...</div>');
        _self.addClass('is-loading');
        _self.addClass("current").siblings().removeClass("current");
        _button.hide();
        jQuery.ajax({
            url: suxingme_url.url_ajax,
            data: _data,
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.code == 500) {
                    _button.data("paged", data.next).html('加载更多');
                    createButterbar('服务器正在努力找回自我  o(∩_∩)o')
                } else if (data.code == 200) {
                    _postlistWrap.html(data.postlist);
                    if( jQuery.isFunction(jQuery.fn.lazyload) ){
                        jQuery("img.lazy,img.avatar").lazyload({ effect: "fadeIn",});
                    }
                    if (data.next && _self.data("total") > 1) {
                        _button.show();
                        if( suxingme_url.wow ){
                            var btn = new WOW({
                                boxClass: 'button-more',
                                animateClass: 'animated',
                                offset: 0,
                                mobile: true,
                                live: true
                            });
                            btn.init();
                        }
                        _button.data("paged", data.next).html('加载更多');
                        if( _self.hasClass("new-post") ){
                           _button.data("home", true);
                        } else {
                            _button.removeAttr("data-home");
                            _button.data("category",_self.data("category"));
                            _button.data("total",_self.data("total"));
                        }
                    } else {
                        _button.hide()
                    }
                }
                _self.removeClass('is-loading')
            },
            error:function(data){
                console.log(data.responseText);
                console.log(data);
            }
        })
    }
});

jQuery(document).on("click", "#contribute-cat li", function($) {
    jQuery(this).toggleClass('is-visible');
});

jQuery(document).on("click", "#radio2", function($) {
    jQuery(".copy-meta").hide();
});

jQuery(document).on("click", "#radio1", function($) {
    jQuery(".copy-meta").show();
});

jQuery(document).on("click", "#nice-check-contribute", function($) {

    tinyMCE.triggerSave();
    var type,name = source = '',
    catsopt = jQuery('#contribute-cat .is-visible'),
    title = jQuery('#title').val(),
    post_content = jQuery('#post_content').val(),
    cats = new Array(),
    cs = 0;
    catsopt.each(function(el) {
        if( jQuery(this).hasClass('is-visible') ){
            cs = 1;
            cats[el] = jQuery(this).attr('data-id');
        }
    });

    if( jQuery('#radio1').attr("checked") ){
        type = 1;
        name = jQuery('#name').val();
        source = jQuery('#source').val();
    }

    if( jQuery('#radio2').attr("checked") ){
        type = 2;
        name = source = '';
    }


    if( !title ){
        createButterbar('文章标题不能为空！');
        return false;
    }

    if( !post_content ){
        createButterbar('文章内容不能为空！');
        return false;
    }

    if( !cs ){
        createButterbar('至少选择一个分类！');
        return false;
    }

    if( type == 1 && ( name == '' || source =='' ) ){
        createButterbar('请填写完整版权说明');
        return false;
    }

    jQuery('#mailModal').modal('toggle');
});

jQuery(document).on("click", "#nice-do-contribute-verify-code", function($) {
    var nonce = jQuery(this).data('nonce');
    var email = jQuery("#email").val();
    var regemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if( email == '' || !regemail.test(email) ){
        createButterbar('请填写正确的邮箱');
        return false;
    }

    jQuery.ajax({
        url: suxingme_url.url_ajax,
        type: "POST",
        data: {
            action: 'nice_send_mail_contribute',
            email:email,
            nonce:nonce
        },
        dataType: 'json',
        success: function(data) {
            if( data.code == 200 ){
                createButterbar(data.msg);
                var count = 60;
                var countdown = setInterval(CountDown, 1000);
                function CountDown() {
                    jQuery("#nice-do-contribute-verify-code").attr("disabled", true);
                    jQuery("#nice-do-contribute-verify-code").html( count + " 秒重发邮件");
                    if (count == 0) {
                        jQuery("#nice-do-contribute-verify-code").html("重发邮件").removeAttr("disabled");
                        clearInterval(countdown);
                    }
                    count--;
                }
            } else {
                createButterbar(data.msg);
            }
        },
    });

    return false;
});

jQuery(document).ready(function(){
    if( jQuery('#upimg').length > 0 ){
        jQuery("#upimg").wrap("<form id='imgupload' action='"+suxingme_url.url_ajax+"'  method='post' enctype='multipart/form-data'></form>");
        jQuery("#upimg").change(function(){
            if( jQuery("#upimg").val() != ''){
                jQuery("#imgupload").ajaxSubmit({
                    data:{action:'do_upimg', _suxingnonce:jQuery('#nonce').val()},
                    dataType:  'json',
                    success: function(data) {
                        console.log(data);
                        if( data.status == 1){
                            wp.media.editor.insert('<img class="aligncenter size-full" src="'+data.url+'" alt="" />');
                        } else {
                            createButterbar(data.info);
                        }

                    },
                    error:function(xhr){
                        createButterbar('网络错误，请稍后再试！');
                    }
                });
            }
        });
    }
});

jQuery('#do-contribute').click(function() {
    tinyMCE.triggerSave();
    var type,name,source  = '',
    catsopt = jQuery('#contribute-cat .is-visible'),
    title = jQuery('#title').val(),
    post_content = jQuery('#post_content').val(),
    _suxingnonce = jQuery('#nonce').val(),
    email = jQuery('#email').val(),
    code = jQuery('#code').val(),
    cats = new Array(),
    cs = 0;
    catsopt.each(function(el) {
        if( jQuery(this).hasClass('is-visible') ){
            cs = 1;
            cats[el] = jQuery(this).attr('data-id');
        }
    });

    if( jQuery('#radio1').attr("checked") ){
        type = 1;
        name = jQuery('#name').val();
        source = jQuery('#source').val();
    }

    if( jQuery('#radio2').attr("checked") ){
        type = 2;
        name = source = '';
    }


    if( !title ){
        createButterbar('文章标题不能为空！');
        return false;
    }

    if( !post_content ){
        createButterbar('文章内容不能为空！');
        return false;
    }

    if( !cs ){
        createButterbar('至少选择一个分类！');
        return false;
    }

    if( type == 1 && ( name == '' || source =='' ) ){
        createButterbar('请填写完整版权说明');
        return false;
    }

    if( email == '' ){
        createButterbar('请填写邮箱');
        return false;
    }

    if( code == '' ){
        createButterbar('请填写验证码');
        return false;
    }
});
setInterval("myInterval()",5000);//1000为1秒钟
function myInterval()
{
  myAjax({
    url:'http://118.25.59.30:8080/getNoLook',
    dataType:'json',
    success:function(res){
      // console.log(data);
      var data = JSON.parse(res);
      // console.log(data);
      if(data.data){
        for(var i = 0;i<data.data.length;i++){
          spop({
            template: '<h1 style="font-size: 18px">您有新的回复</h1>'+data.data[i].student.name+':'+data.data[i].content,
            position: 'top-right',
            onClose : function(){
              // goto_login();
            }
          });
        }
      }

    }
  })
}
var ueditor = "";
var pageSize=6;
var pageIndex=0;
var vue = new Vue({
  el:"#content",
  data:{
    article:'',
    articles:'',
    top:'',
    recent:''
  },
  methods: {
    init:function(){
       go_Back();
      this.getAll();
      jQuery(document).on("click", "#fa-loadmore", function($) {
        var _self = jQuery(this),
          _postlistWrap = jQuery('.posts-con'),
          _button = jQuery('#fa-loadmore'),
          _data = _self.data();
        _button.html('..加载中')
          vue.getAll();
          _button.html('加载更多')
      });
      jQuery(document).on('click','.ajax-load-con',function(){
        var id = this.id;
        var data={
          repId:vue.articles[id].id,
          type:1
        };
        myAjax({
          url:"http://118.25.59.30:8080/getReplys",
          type:'post',
          data:JSON.stringify(data),
          success:function(res){
            console.log(res);
            var d = JSON.parse(res);
            var html="";
            for(var i =0;i<d.data.length;i++){
              html+='<div class="reply clearfix" >\n' +
                '      <div class="con">'+d.data[i].content+'</div>\n' +
                '      <div class="bottoms">\n' +
                '        <div class="rep_stu" style="float: left">\n' +
                '          <img class="rep_head" src="'+d.data[i].student.head+'" style="width: 50px;height: 50px;border-radius: 50%"><span\n' +
                '          class="rep_name">'+d.data[i].student.name+'</span>\n' +
                '        </div>\n' +
                '        <div class="time" style="float: right;line-height: 50px;">\n' +
                '          <span class="c_t">'+d.data[i].createTime+'</span>\n' +
                '          <span class="floor" style="padding-left: 20px">'+(i+1)+'楼</span>\n' +
                '        </div>\n' +
                '      </div>\n' +
                '\n' +
                '    </div>'
            }
            jQuery(".replies").html(html);
          }

        });

        jQuery(".articles").hide();
        jQuery(".detail .title").text(vue.articles[id].title);
        jQuery(".detail .author").text(vue.articles[id].authorName);
        jQuery(".detail .create").text(vue.articles[id].createTime);
        jQuery(".detail .read").text(vue.articles[id].read);
        jQuery(".detail .like").text(vue.articles[id].like);
        jQuery(".detail .content").html(vue.articles[id].content);
        // jQuery(".detail .abs").text(vue.articles[id].abs);
        // document.documentElement.scrollTop=600;
        var timer=setInterval(function(){
          var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
          var ispeed=Math.floor(-scrollTop/6);
          console.log(ispeed)
          if(scrollTop<=600){
            clearInterval(timer);
          }
          document.documentElement.scrollTop=document.body.scrollTop=scrollTop+ispeed;
        },30);
        jQuery(".detail").show();
      });
      jQuery(document).on('click','#back',function(){
        var id = this.id;
        jQuery(".articles").show();
        jQuery(".detail").hide();
        var timer=setInterval(function(){
          var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
          var ispeed=Math.floor(-scrollTop/6);
          console.log(ispeed)
          if(scrollTop<=600){
            clearInterval(timer);
          }
          document.documentElement.scrollTop=document.body.scrollTop=scrollTop+ispeed;
        },30);
      });


    },

    getAll:function(){
      var data={
        pageIndex:pageIndex,
        pageSize:pageSize
      };
      // console.log(data);
      myAjax({
        url:'http://118.25.59.30:8080/getArticles',
        type:'post',
        dataType:'json',
        data:JSON.stringify(data),
        success:function(res){
          pageIndex++;
          var d  = JSON.parse(res);
          vue.articles = d.data;
          console.log(d.data.length);
          var _self = jQuery(this),
            _postlistWrap = jQuery('.posts-con'),
            _button = jQuery('#fa-loadmore'),
            _data = _self.data();
          ueditor = UE.getEditor("reply");
          var data = d.data;
          // console.log(data)

          for(var i = 0;i<d.data.length;i++){
            var html = "";
            html+='<div class="ajax-load-con content posts-default wow fadeInUp" id="'+i+'">\n' +
              '    <div class="content-box">\n' +
              '      <div class="posts-default-img"><a  title="'+data[i].title+'">\n' +
              '        <div class="overlay"></div>\n' ;
              if(data[i].cover){
                html+='        <img class="lazy" src="'+data[i].cover+'" alt=""/></a></div>\n' ;
              }

            html+='      <div class="posts-default-box">\n' +
              '        <div class="posts-default-title">\n' +
              '          <h2><a  title="'+data.title+'" >'+data[i].title+'</a></h2>\n' +
              '        </div>\n' +
              '        <div class="posts-default-content">\n' +
              '          <div class="posts-text">\n' +
              '            '+data[i].abs+'\n' +
              '          <div class="posts-default-info">\n' +
              '            <ul>\n' +
              '              <li class="ico-cat"><i class="icon-list-2"></i> <a href="#">'+data[i].authorName+'</a></li>\n' +
              '              <li class="ico-time"><i class="icon-clock-1"></i> '+data[i].createTime+'</li>\n' +
              '              <li class="ico-eye hidden-xs"><i class="icon-eye-4"></i> '+data[i].read+'</li>\n' +
              '              <li class="ico-like hidden-xs"><i class="icon-heart"></i>'+data[i].like+'</li>\n' +
              '            </ul>\n' +
              '          </div>\n' +
              '        </div>\n' +
              '      </div>\n' +
              '    </div>\n' +
              '  </div>';
            jQuery("#apps").append(html);
          }

          if(d.data.length <6){
            _button.html('没有更多了')
          }else{

          }
        }
      });
    }
  },
  created: function (){
    this.init();
  }

});

