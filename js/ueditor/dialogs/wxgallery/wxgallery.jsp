<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script src="/resources/assets/plugins/jquery-1.10.2.min.js"></script>
<script src="/resources/web/common/common.js"></script>
 <div class="container">
	<div class="row">

	</div>
</div>

<div style="display:none">
    "${err}"
</div>
<script type="text/javascript">
    var IsOK = "${IsOK}";
    var ErrorMsg = "${ErrorMsg}";
    $(function () {
        //回调成功获取授权码
        window.parent.redirectFunc(IsOK);

    });

</script>
