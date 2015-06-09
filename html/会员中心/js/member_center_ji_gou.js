$(function(){
	$.module({
		
		表单验证:{
			$inputs:$(".login_con ul li :text,.login_con ul li :password"),
			rules:{
				0:{
					reg:/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/,
					min:6,
					max:16,
					chong_fu:"该邮箱已注册",
					format_error:"邮箱格式错误",
					url:"",
					data:function(){
						return {};
					}
				}
				// ,1:{
					// reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
					// min:6,
					// max:16,
					// chong_fu:"用户名重复",
					// format_error:"用户名格式错误",
					// url:"",
					// data:function(){
						// return {};
					// }
				// }
				,1:{
					reg:/^[a-z0-9!@#$%^&*]{6,16}$/,
					min:6,
					max:16,
					lt_min:"密码过于简单",
					format_error:"密码格式错误"
				}
				,2:{
					$reference:$(".login_con ul li :text,.login_con ul li :password").eq(1),
					format_error:"两次密码不一致"
				}
				,4:{
					reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
					min:1,
					max:20,
					chong_fu:"请输入机构名称",
					format_error:"机构名称格式错误"
				}
			},
			show_err:function(msg){
				$(this).closest("li").find(".error").show().find(".ts").html(msg);
			},
			init:function(m){
				$(".login_con").find("select").each(function(k){
					var $select=$(this).replace_with_div({
						height:m.$inputs.first().height(),
						arrow_down_bg:"url("+config.img_path+"arraw_down.png)",
						border:"none",
						on_expand:(function(){
							return function(){
								if(k==0){
									$(".dbx_select_title").eq(1-k).parent().hide();
								}
							}
						})(),
						on_close:(function(){
							return function(){
								if(k==0){
									$(".dbx_select_title").eq(1-k).parent().show();
								}
							}
						})()
					})
					$select.parent().css({
						position:"relative",
						zIndex:"99"
					});
					$select.css({
						position:"absolute",
						top:"19px",
						right:"5px"
					});
					$select.find(".dbx_select_title").add($select.find(".dbx_select_title").parent()).css({
						width:"228px"
					})
					$select.find("b").css({
						fontWeight:"normal"
					});
				})
				$(":checkbox").bind("change",function(){
					if($(this).attr("checked")=="checked"){
						$("input.button:first").css({
							background:"#FF6D00"
						}).addClass("disable_false")
							.removeClass("disable_true")
					}else{
						$("input.button:first").css({
							background:"#eee"
						}).addClass("disable_true")
						.removeClass("disable_false")
					}
				})
				$("select").bind("change",function(){
					if($(this).val()==0){
						$(this).closest("li").find(".error").show();
					}
					else{
						$(this).closest("li").find(".error").hide();
					}
				})
				$("input.button").click(function(){
					if($(this).hasClass("disable_false")){
						m.$inputs.focus().blur();
						var $select=$("select");
						$select.each(function(){
							if($(this).val()==0){
								$(this).closest("li").find(".error").show();
							}
						})
						if($(".error").filter(":visible").size()==0){
							$(this).closest("form").submit();
						}else{
							return false;
						}
					}
					else
					{
						return false;
					}
				})
				$(":checkbox").each(function(){
					$(this).prev().css({
						marginRight:"10px"
					});
				})
				$.each(m.rules,function(k,v){
					m.$inputs.eq(k).on("focus",function(){
						$(this).closest("li").find(".error").hide();
					}).on("blur",function(){
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
					})
				})
			}
		}
	})
})
