$(function(){
	//加入并设置日历组件
	//第一个：开幕时间
	var time_h="00";
	var time_i="00";
	var $calendar_input_first=$(".set_content :text").css({
		width:"250px"
	})
	.click(function(){
		$(".ui-daterangepickercontain").slideUp("fast")
	})
	.eq(1);
	$calendar_input_first.daterangepicker({
		on_data_click:function(){
			var calendar_input_val=$calendar_input_first.val().split(" ")[0];
			$calendar_input_first.val(calendar_input_val+" "+time_h+":"+time_i).focus();
		}
	});
	$calendar_input_first.one("click",function(){
		var $thi=$(this);
		var $r=$(".ranges:first");
		$div=$("<div>")
			.html("<input type='text' value='00' />&nbsp;:&nbsp;<input type='text' value='00'/>")
			.appendTo($r.css("position","relative"))
			.css({
				position:"absolute",
				left:"5px",
				bottom:"5px"
			})
			.find(":text")
			.css({
				width:"50px",
				border:"none"
			})
			.keyup(function(){
				var val=$(this).val();
				var vlen=val.length;
				if(vlen>2){
					val=val.substring(0,2);
				}
				if(isNaN(val)==false){
					if($(this).index()==0){
						if(parseInt(val)<=24){
							if(val.length==1){
								val="0"+val;
							}
							time_h=val;
						}
					}else{
						if(parseInt(val)<=60){
							if(val.length==1){
								val="0"+val;
							}
							time_i=val;
						}
					}
				}
				$(this).val(val);
				var calendar_input_val=$calendar_input_first.val().split(" ")[0];
				$calendar_input_first.val(calendar_input_val+" "+time_h+":"+time_i);
			})
		$(".ui-daterangepicker-specificDate:first")
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
			$expect:$calendar_input_first
		})
	})
	.click(function(){
		$(".ui-daterangepickercontain:first").slideDown("fast");
		$(".ui-daterangepicker-specificDate:first").click();
	})
	.keydown(function(){
		return false;
	})
	//日期范围选择
	$.each([2,4],function(k,v){
		var $input=$(".set_content :text").eq(v);
		$input
		.keydown(function(){
			return false;
		})
		.daterangepicker({
			on_data_click:function(){
				$(".ui-state-highlight").removeClass("ui-state-highlight");
				$input.focus();
			}
		});
		$input.click(function(){
			$(".ui-daterangepicker-dateRange").eq(k+1).click().closest("ul").hide();
			$(".ui-daterangepickercontain").eq(k+1).css({
				top:$input.offset().top+$input.outerHeight()+"px"
			})
		})
		$input.click(function(){
			$(".ui-daterangepickercontain").eq(k+1).slideDown("fast");
		}).one("click",function(){
			$(".ui-state-highlight").removeClass("ui-state-highlight");
		})
		$(".ui-daterangepickercontain").eq(k+1)
			.close_when_click_white({
				$expect:$input
			})
		$(".btnDone").eq(k+1).click(function(){
			$(".ui-daterangepickercontain").eq(k+1).slideUp("fast")
		})
	})
	//表单验证
	$.each({
		0:{
			
		},
		3:{
			
		},
		5:{
			
		}
	},function(k,v){
		var $inputs=$(".set_content :text");
		var html=$inputs.eq(k).prev().html();
		v={
			max:100,
			gt_max:html+"过长(最多100个字符)",
			reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
			format_error:html+"格式错误（只允许字母数字下划线汉字）"
		}
		v.null_value="请输入"+html.substring(0,html.length-1);
		$inputs.eq(k).form_check(v);
	})
	$.each([1,2,4],function(k,v){
		var $input=$(".set_content :text").eq(v);
		$input.form_check({
			null_value:"请输入"+$input.prev().html().substring(0,$input.prev().html().length-1)
		})
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
