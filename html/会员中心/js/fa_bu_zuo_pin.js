$(function(){
	
	//加入并设置日历组件
	var $calendar_input=$(".set_content :text").eq(4);
	$calendar_input.daterangepicker({
		on_data_click:function(){
			$calendar_input.focus();
		}
	});
	$calendar_input.one("click",function(){
		var $thi=$(this);
		$(".ui-daterangepicker-specificDate")
		//$(".ui-daterangepicker-dateRange")
			.click()
			.closest("ul").hide();
		$(".btnDone:first").click(function(){
			$(".ui-daterangepickercontain:first").slideUp("fast")
		})
		$(".ui-daterangepickercontain:first").css({
			top:$thi.offset().top+$thi.outerHeight()+"px"
		})
		.close_when_click_white({
			$expect:$calendar_input
		})
	})
	.click(function(){
		$(".ui-daterangepickercontain:first").slideDown("fast");
		$(".ui-daterangepicker-specificDate").click();
	})
	
	//表单验证
	var $inputs=$(".set_content :text");
	$inputs.first().form_check({
		null_value:"请输入作品名称",
		max:100,
		gt_max:"作品名称过长(最多100个字符)",
		reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
		format_error:"作品名称格式错误（只允许字母数字下划线汉字）"
	})
	$.each({
		1:{
			
		}
		,2:{
			
		}
		,3:{
			
		},
		4:{
			
		}
		,5:{
			
		}
	},function(k,v){
		var html=$inputs.eq(k).prev().html();
		if(k!=5){
			v={
				max:100,
				gt_max:html+"过长(最多100个字符)",
				reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
				format_error:html+"格式错误（只允许字母数字下划线汉字）"
			}
		}
		else{
			v={
				max:10,
				gt_max:html+"过长(最多10个字符)",
				reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
				format_error:html+"格式错误（只允许字母数字下划线汉字）"
			}
		}
			v.null_value="请输入"+html.substring(0,html.length-1);
			$inputs.eq(k).form_check(v);
	})
	//提交按钮点击
	$(".an").children().last().click(function(){
		$(".set_content :text,.set_content textarea").blur();
		var $errs=$(".dbx_input_error").filter(":visible");
		if($errs.size()>0){
			$("body,html").animate({
				scrollTop:$errs.first().offset().top-10+"px"
			})
			return false;
		}else{
			//执行ajax或者提交表单等操作
			
		}
	})
})
