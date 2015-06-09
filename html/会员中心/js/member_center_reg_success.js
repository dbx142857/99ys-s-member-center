$(function(){
	var $nian_yue_ri=$(".step1 li:last").find("select");
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
			width:138,
			arrow_down_bg:"url("+config.img_path+"arraw_down.png)",
			option_width:148
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
	$(":checkbox,:radio").each(function(){
		var $thi=$(this);
		$(this).prev().css({
			marginRight:"5px",
			marginTop:"0px"
		}).css({
			height:"22px",
			marginTop:$thi.closest(".step1").size()!=0?"12px":"0px"
		});
	})
	$("select").each(function(){
		$(this).replace_with_div({
			width:138,
			arrow_down_bg:"url("+config.img_path+"arraw_down.png)",
			option_width:148
		}).css({
			marginTop:"12px"
		}).each(function(){
			$(this).next().css({
				width:"30px"
			})
		});
	})
	$("a:contains(添加)").click(function(){
		var $thi=$(this);
		var name=$thi.prev().val();
		if($.trim(name)==""){
			alert("亲，艺术门类名称不能为空哦");
			return false;
		}
		$.ajax({
			type:"post",
			url:"../../php/ajax_test.php",
			success:function(e){
				if(1==1){
					var $span=$("<span><input name=\"\" type=\"checkbox\" value=\"\" />"+name+"</span><span>")
						.appendTo($thi.parent().prev().prev());
					$span.find(":checkbox").replace_checkbox().css({
						marginTop:"0",
						marginRight:"5px"
					})
				}
			}
		})
	})
})
