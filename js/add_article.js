// var editor = UE.getEditor("eleContentAdd");
var ue = "";
var sys = "http://118.25.59.30:8080/"
var vue = new Vue({
  el: '#app',
  data: {
    cover: '',
    title: '',
    content: '',
    attachPath: '',
    author: '',
    ue:UE.getEditor('eleContentAdd'),
    abs: ''//摘要
  },
  methods: {
    init:function(){

      $.ajax({
        url:"http://118.25.59.30:8080/getLoginUser",
        type:'post',
        dataType:'json',
        xhrFields: {withCredentials: true},
        success:function(res){
          console.log(res)
          // var d =  eval('(' + res + ')');
          if(res.data != null){
            $(".login").show();
            $(".nologin").hide();
            $(".login img").get(0).src = d.data.head;
            $(".login span").text(d.data.name+"，欢迎你!");
          }else{
            spop({
              template: '<h4 class="spop-title">请登陆后再发布</h4>',
              position: 'top-center',
              style: 'success',
              autoclose: 3000,
              onOpen : function(){
                var second = 2;
                var showPop = setInterval(function(){
                  if(second == 0){
                    clearInterval(showPop);
                  }
                  $('.spop-body').html('<h4 class="spop-title">请登陆后再发布</h4>');
                  second--;
                },1000);
              },
              onClose : function(){
                // goto_login();
                window.location = "login.html";
              }
            });

          }
        }
      })
    },
    send: function () {
      vue.content = vue.ue.getContent();
      vue.abs = $("#abs").val();
      var data = {
        title: vue.title,
        cover: vue.cover,
        content: vue.content,
        abs: vue.abs,
        author: vue.author,
        attach: vue.attachPath
      };
      $.ajax({
        url: sys + "publish",
        type: 'post',
        data: JSON.stringify(data),
        contentType: "application/json",
        xhrFields: {withCredentials: true},
        success: function (res) {
          spop({
            template: '<h4 class="spop-title">发布成功</h4>',
            position: 'top-center',
            style: 'error',
            autoclose: 1500,
            onClose: function () {
              // goto_login();
              window.location="index.html";
            }
          })
        }
      });
    },
    uploadFile: function () {
      var form = new FormData();
      var file = document.getElementById("employeeImage").files[0];
      form.append('upfile', file);
      $.ajax({
        url: "http://118.25.59.30:8080/uploadFile",
        type: 'POST',
        cache: false,
        data: form,
        processData: false,
        contentType: false,
        success: function (data) // 服务器成功响应处理函数
        {
          // console.log(data.data);
          vue.cover = data.data;
          // $("#myEditImage").get(0).src = vue.cover;
        },
        error: function (data)// 服务器响应失败处理函数
        {
          console.log("服务器异常");
        }
      });
      return false;
    },
    //上传文件
    uploadAttachFile: function () {
      var form = new FormData();
      var file = document.getElementById("attachFile").files[0];
      form.append('upfile', file);
      $.ajax({
        url: "http://118.25.59.30:8080/uploadFile",
        type: 'POST',
        cache: false,
        data: form,
        processData: false,
        contentType: false,
        success: function (data) // 服务器成功响应处理函数
        {
          vue.attachPath = data.data;

        },
        error: function (data)// 服务器响应失败处理函数
        {
          console.log("服务器异常");
        }
      });
      return false;
    }
  },
  created: function () {
    // 初始化数据
    this.init();
    // this.formValidate();
  }
});

