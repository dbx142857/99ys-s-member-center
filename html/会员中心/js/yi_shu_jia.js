$(function(){
		$(".pic_area li").hover(function(){
			if(!$(this).data("div")){
				var $div=$("<div>")
					.appendTo($(this).css("position","relative"))
					.css({
						position:"absolute",
						width:"100%",
						height:"100%",
						left:"0",
						top:"0",
						zIndex:"9999"
					});
				var $span=$(this).find("span:first");
				var $bg=$("<div>")
					.appendTo($div)
					.css({
						width:"100%",
						height:"100%",
						background:"black",
						opacity:"0.7"
					})
				var $heng=$("<div>")
					.appendTo($bg)
					.css({
						height:"2px",
						width:"50%",
						margin:"0 auto",
						background:"#fff",
						position:"relative",
						top:"50%"
					})
				var $shu=$("<div>")
					.appendTo($bg)
					.css({
						width:"2px",
						height:"50%",
						margin:"0 auto",
						background:"#fff",
						position:"relative",
						top:"25%"
					});
				var count={
					xin:"99",
					xing:"99",
					jiantou:"99",
					xiaoxi:"99"
				}
				$.each({
					0:{
						pos_x:"25%",
						pos_y:"25%",
						click:function($thi){//$thi表示被点击的对象本身
							
						}
					}
					,1:{
						pos_x:"55%",
						pos_y:"25%",
						click:function($thi){//$thi表示被点击的对象本身
							
						}
					}
					,2:{
						pos_x:"25%",
						pos_y:"50%",
						click:function($thi){//$thi表示被点击的对象本身
							
						}
					}
					,3:{
						pos_x:"55%",
						pos_y:"50%",
						click:function($thi){//$thi表示被点击的对象本身
							
						}
					}
				},function(k,v){
					//console.log("red url("+config.img_path+$.get_at(k,count)+".png"+") no-repeat center")
					$("<div>")
						.css({
							width:"46px",
							height:"60px",
							position:"absolute",
							marginTop:"-10px",
							left:v.pos_x,
							top:v.pos_y,
							background:"url("+config.img_path+$.get_at(k,count).k+".png"+") no-repeat center",
							cursor:"pointer",
							color:"white",
							textAlign:"center",
							lineHeight:"110px"
						})
						.hover(function(){
							$(this).css({
								background:"url("+config.img_path+$.get_at(k,count).k+"_hov.png"+") no-repeat center"
							})
						},function(){
							$(this).css({
								background:"url("+config.img_path+$.get_at(k,count).k+".png"+") no-repeat center"
							})
						})
						.appendTo($div)
						.html("("+$.get_at(k,count).v+")")
						.click(function(){
							v.click($(this));
						})
				})
				$span.clone().css({
					cursor:"pointer"
				}).appendTo($div);
				
				$(this).data("div",$div);
			}
			var $div=$(this).data("div");
			$div.show();
		},function(){
			var $div=$(this).data("div");
			$div.hide();
		})
	})