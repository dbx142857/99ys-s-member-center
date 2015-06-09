$(function(){
	//重设
	$("input.cs").addClass("reset");
	//修复男 女 及其checkbox样式
	var $li=$(".set_content:first ul li").eq(5);
	var li_html=$li.html();
	$.each(["男","女","保密"],function(k,v){
		li_html=li_html.replace(v,"<span>"+v+"</span>");
	})
	$li.html(li_html)
	$li.find(":radio").each(function(k){
		$(this).prev().remove();
		$(this)
		.replace_radio()
		.css({
			marginTop:"15px"
		})
		.next().next()
		.css({
			width:k<2?"15px":"30px"
		})
	})
	
	
	
	//年月日选择
	var $li=$(".set_content:first ul li").eq(1);
	// var li_html=$li.html();
	// $.each(["年","月","日"],function(k,v){
		// li_html=li_html.replace(v,"<span>"+v+"</span>");
	// })
	// $li.html(li_html);
	
	
	
	
	var $nian_yue_ri=$li.find("select");
	//渲染日期option
	var render_ri_option=function(){
		var $ri=$nian_yue_ri.last().html("");
		var yue=$nian_yue_ri.eq(1).val();
		var year=$nian_yue_ri.first().val();
		var is_leap_year=function(Year){
			if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
				return (true);
			} else { return (false); }
		}
		var day_num;
		switch(yue){
			case "1":
			case "3":
			case "5":
			case "7":
			case "8":
			case "10":
			case "12":{
				day_num=31;
				break;
			}
			case "4":
			case "6":
			case "9":
			case "11":{
				day_num=30;
				break;
			}
			case "2":{
				day_num=is_leap_year(year)==true?29:28;
			}
		}
		for(var i=1;i<=day_num;i++){
			$("<option>")
				.attr({
					value:i
				})
				.html(i<10?("0"+i):i)
				.appendTo($ri)
		}
		
		$ri.next().remove();
		$ri.replace_with_div({
			width:68,
			arrow_down_bg:"url("+config.img_path+"arraw_down.png)",
			option_width:78
		}).css({
			marginTop:"12px"
		}).each(function(){
			$(this).next().css({
				width:"30px"
			})
		});
		
	}
	$nian_yue_ri.each(function(){
		var $thi=$(this);
		switch($(this).next().html()){
			case "年":{
				$(this).bind("change",function(){
					render_ri_option();
				})
				break;
			}
			case "月":{
				$thi.bind("change",function(){
					render_ri_option();
				})
				for(var i=1;i<=12;i++){
					$("<option>")
						.attr({
							value:i
						})
						.html(i<10?("0"+i):i)
						.appendTo($thi)
				}
				break;
			}
			case "日":{
				for(var i=1;i<=31;i++){
					$("<option>")
						.attr({
							value:i
						})
						.html(i<10?("0"+i):i)
						.appendTo($thi)
				}
				break;
			}
		}
	})
	
	
	
	
	
	
	
	
	
	
	
	$("select").each(function(){
		$(this).replace_with_div({
			width:68,
			arrow_down_bg:"url("+config.img_path+"arraw_down.png)",
			option_width:78
		}).css({
			marginTop:"12px"
		}).each(function(){
			$(this).next().css({
				width:"20px"
			})
		});
	})
	
	$nian_yue_ri.first().next().css("z-index",parseInt($nian_yue_ri.first().next().css("z-index"))+1);
	
	
	
	
	
	
	
	
	
	
	//表单验证
	var $inputs=$(".set_content :text,.set_content textarea");
		$.each({
			0:{
				max:10,
				gt_max:"姓名过长(最多10个字符)",
				reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
				format_error:"姓名格式错误（只允许字母数字下划线汉字）"
			},
			1:{
				max:100,
				gt_max:"籍贯过长(最多100个字符)",
				reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
				format_error:"籍贯格式错误（只允许字母数字下划线汉字）"
			}
			,
			2:{
				max:100,
				gt_max:"媒介过长(最多100个字符)",
				reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
				format_error:"媒介格式错误（只允许字母数字下划线汉字）"
			}
			,
			3:{
				max:100,
				gt_max:"职务过长(最多100个字符)",
				reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
				format_error:"职务格式错误（只允许字母数字下划线汉字）"
			}
			,
			4:{
				max:100,
				gt_max:"邮箱长度过长（不能超过100个字符）",
				format_error:"邮箱格式错误",
				reg:/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/,
				null_value:"请输入邮箱"
			},
			//,
			// 3:{
				// reg:/^[1-9]*[1-9][0-9]*$/,
				// null_value:"请输入qq号码",
				// format_error:"qq号码格式错误",
				// max:100,
				// gt_max:"qq号码长度有误(不能超过100个字符)"
			// },
			6:{
				reg:/^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/,
				format_error:"电话格式错误",
				null_value:"请输入电话号码或者手机号码"
			},
			5:{
				reg:/^[1-9]*[1-9][0-9]*$/,
				null_value:"请输入qq号码",
				format_error:"qq号码格式错误",
				max:100,
				gt_max:"qq号码长度有误(不能超过100个字符)"
			},
			7:{
				min:2,
				lt_min:"签名过短(至少2个字符)",
				max:function(){
					return $inputs.eq(7).next().text()
				},
				gt_max:"签名过长(最多50个字符)"
			},
			8:{
				min:2,
				lt_min:"简介过短(至少2个字符)",
				max:function(){
					return $inputs.eq(8).next().text()
				},
				gt_max:"简介过长(最多500个字符)"
			}
		},function(k,v){
			var html=$inputs.eq(k).prev().html();
			v.null_value="请输入"+html.substring(0,html.length-1);
			$inputs.eq(k).form_check(v);
		})
		
	$inputs.eq(8).textarea_words_limit({
		$words_msg_ti_shi_obj:(function(){
			var html=$inputs.eq(8).next().html();
			var limit=parseInt(html.substring(html.indexOf("/")+1));
			return $inputs.eq(8).next().html("<label>0</label>/<label>"+limit+"</label>").find("label").first()
		})(),
		words_num_limit:parseInt($inputs.eq(8).next().find("label").last().html()),
		num_ti_shi_only:true,
	})	
	$inputs.eq(7).textarea_words_limit({
		$words_msg_ti_shi_obj:(function(){
			var html=$inputs.eq(7).next().html();
			var limit=parseInt(html.substring(html.indexOf("/")+1));
			return $inputs.eq(7).next().html("<label>0</label>/<label>"+limit+"</label>").find("label").first()
		})(),
		words_num_limit:parseInt($inputs.eq(7).next().find("label").last().html()),
		num_ti_shi_only:true,
	})	
	
		//提交按钮点击
	$(".an").children().last().click(function(){
		$inputs.blur();
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
