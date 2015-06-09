$(function(){
	$(":checkbox").each(function(){
		var $thi=$(this);
		$(this).prev().css({
			marginRight:"10px"
		});
		// $("input.button").attr("btn_disable","false")
					// .css({
						// background:"#ff6d00"
					// })
		// $thi.bind("change",function(){
			// if($(this).attr("checked")=="checked"){
				// $("input.button").attr("btn_disable","false")
					// .css({
						// background:"#ff6d00"
					// })
			// }else{
				// $("input.button").attr("btn_disable","true")
					// .css({
						// background:"#eee"
					// })
			// }
		// })
	})
	$(":text")
	.bind("focus",function(){
		$(this).closest("li").find(".error").hide();
	})
	.last().blur(function(){
		//验证验证码
		$.ajax({
			
		})
	})
	$("input.button").attr("btn_disable","true").click(function(){
		if($(this).attr("btn_disable")=="false"){
			if($(".error").filter(":visible").size()==0){
				//允许登陆
				//与后台通讯验证是否允许提交
				$.ajax({
					
				})
			}else{
				return false;
			}
		}else{
			return false;
		}
	})
})
