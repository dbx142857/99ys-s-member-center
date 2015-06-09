$(function(){
	$(":text").blur(function(){
		var thi=this;
		$.ajax({
			type:"post",
			url:v.url,
			data:v.data.call(thi),
			async:false,
			success:function(){
				//如果邮箱未注册
				if(1==1){
					$(thi).closest("li").find(".error").show();
				}else{
					$(thi).closest("li").find(".error").hide();
				}
			}
		})
	})
	.focus(function(){
		var thi=this;
		$(thi).closest("li").find(".error").hide();
	})
	$("input.retake").click(function(){
		//如果邮箱正确
		if(1==1){
			
		}else{
			
		}
	})
})
