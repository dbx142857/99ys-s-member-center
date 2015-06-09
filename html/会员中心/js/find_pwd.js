$(function(){
	$.module({
		
		表单验证:{
			$inputs:$(".login_con ul li :text"),
			rules:{
				0:{
					reg:/^[a-z0-9!@#$%^&*]{6,16}$/,
					min:6,
					max:16,
					lt_min:"密码过于简单",
					format_error:"密码格式错误",
					on_right:function(thi){
						$(thi).closest("li").find(".error").addClass("error2").show();
					},
					on_error:function(){
						$(this).closest("li").find(".error").removeClass("error2").show();
					}
				},
				1:{
					$reference:$(".login_con ul li :text").eq(0),
					format_error:"两次密码不一致"
				}
			},
			show_err:function(msg){
				$(this).closest("li").find(".error").show().find(".ts").html(msg);
			},
			init:function(m){
				$("input.retake").click(function(){
						m.$inputs.focus().blur();
						if($(".error").filter(":visible").not(".error2").size()==0){
							//可以提交
						}
						else{
							return false;
						}
				})
				$.each(m.rules,function(k,v){
					m.$inputs.eq(k).on("focus",function(){
						$(this).closest("li").find(".error").hide();
					}).on("blur",function(){
						var if_right=false;
						var $thi=$(this);
						var thi=this;
						var val=$(this).val(),vlen=val.length;
						if(v.$reference&&val!=v.$reference.val()){
							m.show_err.call(this,v.format_error);
						}
						else if(v.min&&vlen<v.min){
							m.show_err.call(this,v.lt_min?v.lt_min:v.format_error);
						}
						else if(v.max&&vlen>v.max){
							m.show_err.call(this,v.format_error);
						}
						else if(v.reg&&!v.reg.test(val)){
							m.show_err.call(this,v.format_error);
						}
						else if(v.url&&v.url!=""){
							$.ajax({
								type:"post",
								url:v.url,
								data:v.data.call(thi),
								async:false,
								success:function(){
									
								}
							})
						}
						else
						{
							if_right=true;
						}
						if(if_right==true){
							if(v.on_right){
								v.on_right(thi);
								m.show_err.call(this,"");
							}
						}
						else{
							if(v.on_error){
								v.on_error.call(thi);
							}
						}
					})
				})
			}
		}
	})
})
