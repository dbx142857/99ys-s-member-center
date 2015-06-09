var config={
	child_tpl_path:"../child_tpl/",
	img_path:"../images/"
	,script_path:"../js/"
	,css_path:"../css/"
	,upload_php_url:"../../php/uploadify.php"//php上传文件测试的url
			,upload_swf_path:"../js/uploadify.swf"//上传文件锁使用的swf文件存放路径
			,loading_img_path:"../images/loading.gif"//使用loading图片的地址
	//    ../../php/ajax_test.php
}
$(function(){
	//引入nicescroll以便美化下拉菜单
	//头部输入框的placeholder
	$(".top_nav :text").filter(":visible").each(function(){
		var val=$(this).val();
		$(this).val("").attr("placeholder",val);
		$(this).placeholder();
	})
	$(".need_PIE").each(function(){
		try{
			PIE.attach($(this).get(0));
		}
		catch(e){
			
		}
	})
	$(":checkbox").each(function(){
		if($(this).closest(".pinglun").size()==0){
			$(this).replace_checkbox();
		}
	})
	$(":radio").each(function(){
		var $r=$(this).replace_radio();
	})
	$(":text").each(function(){
		$(this).css({
			lineHeight:$(this).css("height")
		})
		// var val=this.value;
		// if(val!=""){
			// $(this).val("").attr("placeholder",val);
		// }
		if($(this).attr("placeholder")!=""){
			$(this).placeholder();
		}
	})
	// $("*[title]").betterTooltip({speed: 300, delay: 100});
	$("a[href=#]").each(function(){
		$(this).attr({
			href:"javascript:;"
		})
	})
	//图片点击打对号
	$(".step3 img").each(function(){
		
		$(this).css({
				cursor:"pointer"
			}).click(function(){
			var $thi=$(this);
			var $p=$(this).parent();
			if($(this).next().size()==0){
				$("<div>")
				.css({
					width:"25px",
					height:"25px",
					background:"url("+config.img_path+"correct.png)",
					position:"absolute",
					zIndex:"2",
					right:"0",
					bottom:"0"
				})
				.addClass("dbx_correct")
				.appendTo($p.css("position","relative"));
				$thi.css({
					opacity:"1"
				})
			}
			else
			{
				$(this).next().remove();
				$thi.css({
					opacity:"0.5"
				})
			}
		})
	})
	$("input.cs").addClass("reset")
	//重置按钮
	$(".reset").live("click",function(){
		$(":checkbox").each(function(){
			if($(this).prev().html()!=""){
				$(this).prev().click();
			}
		})
		$(".dbx_correct").remove();
		$(":text,textarea,:password").each(function(){
			if(!$(this).attr("readonly")){
				$(this).val("").blur();
			}
		})
		$(".dbx_input_error").hide();
	})
	//回到顶部
	try{
		var $goto_top=$("<div>")
			.hide()
			.addClass("climb")
			.css({
				left:screen.width-330+"px"
			})
			.appendTo($("body"))
			.load(config.child_tpl_path+"goto_top.html",function(){
					
					var set_goto_top=function(){
					var doc_st=($(document).scrollTop());
					var win_h=($(window).height());
					if(doc_st>(win_h+100)){
						$goto_top.show();
					}else{
						$goto_top.hide();
					}
				}
				$(window).resize(function(){
					set_goto_top();
				}).scroll(function(){
					set_goto_top();
				}).resize();
				$(".climbRun").hover(function(){
					$(this).find("span").show();
				},function(){
					$(this).find("span").hide();
				})
				$(".climbBtn").attr("href","javascript:;")
					.click(function(){
							$("html,body").animate({
								scrollTop:"0"
							})
					})
			})
	}
	catch(e){
		
	}
	
		
		$.module({
			搜索框的特效:{
			$input:$(".fl").find(":text"),
			$menu:(function(){
				var $input=$(".fl").find(":text");
				var $div=$("<div>")
						.appendTo($("body"))
						.css({
							height:"69px",
							width:$input.outerWidth()-2+"px",
							background:"#111",
							border:"solid 1px #484848"
						});
				$("body").click(function(e){
					var e=e?e:window.event;
					var tar=e.srcElement||e.target;
					if($(tar).closest($div).size()==0&&$(tar).closest($input).size()==0){
						$div.hide();
					}
				})
				$div.dbx_set_abs_pos({
							$obj:$(".wrap:first"),
							x_pian_yi:527,
							y_pian_yi:$input.outerHeight()+6
						});
				for(var i=0;i<2;i++){
					$("<div>")
						.appendTo($div)
						.css({
							height:"34px",
							borderTop:"solid 1px transparent",
							borderBottom:"solid 1px rgb(72, 72, 72)",
							lineHeight:"30px",
							cursor:"pointer",
							borderTop:"none",
							color:"white"
						})
						.hover(function(){
							$(this).css({
								backgroundColor:"#4B4141",
								borderTopColor:"#484848",
								borderBottomColor:"#484848",
								textDecoration:"underline"
							})
						},function(){
							$(this).css({
								backgroundColor:"transparent",
								borderTopColor:"#484848",
								borderBottomColor:"#484848",
								textDecoration:"none"
							})
						})
				}
				return $div.hide();
			})(),
			make_input_menu:function(m){
				var $m=m.$menu,
						$childs=$m.children(),
						$c1=$childs.first(),
						$c2=$childs.last();
				var val=$.trim(this.value);
				if(val!=""){
					var vall=val;
					if(vall.length>5){
						vall=vall.substring(0,5)+"...";
					}
					$m.show();
					$c1.html("&nbsp;搜\""+vall+"\"的人/机构");
					$c2.html("&nbsp;搜\""+vall+"\"的内容");
				}
				else{
					$m.hide();
				}
			},
			E:{
				"keyup focus paste:100 .fl->:text":function($thi,m){
					m.make_input_menu.call(m.$input.get(0),m);
				}
			},
			init:function(m){
				
			}
		}
		,头部标题右侧的下拉菜单:{
			$title:$(".wrap span:first a:last"),
			$menu:(function(){
				var $div;
				var $title=$(".wrap span:first a:last")
					.click(function(){
						if(!$div.is(":visible")){
							$div.show().stop().slideUp(0).slideDown("slow");
							$(this).find("i").css({
								transform:"rotate(180deg)"
							})
						}else{
							$div.stop().slideUp("slow",function(){
								$div.hide();
							});
							$(this).find("i").css({
								transform:"rotate(0deg)"
							})
						}
					})
				$div=$("<div>")
						.appendTo($("body"))
						.css({
							width:$title.outerWidth()-2+"px",
							background:"#111",
							border:"solid 1px #484848"
						});
				$("body").click(function(e){
					var e=e?e:window.event;
					var tar=e.srcElement||e.target;
					if($(tar).closest($div).size()==0&&$(tar).closest($title).size()==0){
						$div.stop().slideUp("slow",function(){
							$div.hide();
						});
						$title.find("i").css({
								transform:"rotate(0deg)"
							})
					}
				})
				$div.dbx_set_abs_pos({
							$obj:$(".wrap:first"),
							x_pian_yi:$(".wrap:first").width()-$title.width()-33,
							y_pian_yi:$title.outerHeight()
						});
				var index=-1;
				//value表示a链接的地址
				$.each({
					基本信息:"",
					更改密码:"",
					消息设置:"",
					官方认证:"",
					我的订阅:"",
					我的积分:"",
					退出:""
				},function(k,v){
					index++;
					$("<div>")
						.appendTo($div)
						.html("&nbsp;<a style='color:#fff;' href='"+v+"'>"+k+"</a>")
						.css({
							height:"34px",
							borderTop:"solid 1px transparent",
							borderBottom:"solid 1px rgb(72, 72, 72)",
							lineHeight:"34px",
							cursor:"pointer",
							borderTop:"none",
							color:"white"
						})
						.hover(function(){
							$(this).css({
								backgroundColor:"#ff6d00",
								borderTopColor:"#484848",
								borderBottomColor:"#484848"
							})
						},function(){
							$(this).css({
								backgroundColor:"transparent",
								borderTopColor:"#484848",
								borderBottomColor:"#484848"
							})
						})
				})
				return $div.hide().slideUp(0);
			})()
		}
		,删除说说:{
			init:function(){
				//dynamic_list
				//".person_ss"
				$(".dynamic_list").live("mouseenter",function(){
					var $p=$(this);
					var $person_ss=$(this).find(".person_ss:first");
					var is_exhibit=false;//判断是否是展览
					if($person_ss.size()==0){
						$person_ss=$p.find(".exhibition_title:first");
						is_exhibit=true;
						var $edit=$("<a href=''><span>编辑</span></a>")
							.appendTo($person_ss.css("position","relative"))
							.css({
								position:"absolute",
								right:"10px",
								cursor:"pointer"
							})
							.hover(function(){
								$(this).find("span").css({
									textDecoration:"underline"
								})
							},function(){
								$(this).find("span").css({
									textDecoration:"none"
								})
							})
						$p.data("$edit",$edit);
					}
					var $span=$("<span>")
						.html("删除")
						.appendTo($person_ss.css("position","relative"))
						.css({
							position:"absolute",
							right:is_exhibit==true?"40px":"10px",
							cursor:"pointer"
						})
						.hover(function(){
							$(this).css({
								textDecoration:"underline"
							})
						},function(){
							$(this).css({
								textDecoration:"none"
							})
						})
						.click(function(){
							$.ajax({
								success:function(){
									//如果删除成功
									$p.css({
										minHeight:"0"
									}).slideUp("fast",function(){
										$p.remove();
									})
								}
							})
						})
						$(this).data("$del",$span);
				})
				.live("mouseleave",function(){
					var $del=$(this).data("$del");
					$del.remove();
					if($(this).data("$edit")){
						$(this).data("$edit").remove();
					}
				})
			}
		}
		
		
		})
		
//旋转动画
//&&$(".hd_title").size()==0
if($(".portrait #container:first").size()!=0){
	$.getScript(config.script_path+"jquery.easing.min.js",function(){
		$.getScript(config.script_path+"jQueryRotate.2.2.js",function(){
			var $obj=$(".portrait #container:first").show().css({
				transform:"rotate(30deg)"
			})
				$obj.rotate({
					angle:30, 
					duration: 3000, 
					animateTo: 0
				}); 
		})
	})
}
else{
	$(".portrait #container:first").show().css({
		opacity:"0"
	})
	.animate({
		opacity:"1"
	},3000);
}
		
		
		
//顶部消息子模板载入
var $div=$("<div>")
	.load(config.child_tpl_path+"news.html",function(){
		var $a=$(".top_nav a:first");
		var $news=$div.find(".news");
		var w=$news.outerWidth();
		$div.css({
			width:w+"px",
			position:"absolute"
		}).slideUp(0);
		$div.dbx_set_abs_pos({
			$obj:$a,
			x_pian_yi:-(w-$a.outerWidth()),
			y_pian_yi:$a.outerHeight()
		})
		$a.click(function(){
			$div.slideDown("fast")
		})
		$div.close_when_click_white({
			$expect:$a
		})
	})
	.appendTo($("body"));
	//top_nav
	var $d_recommended_con=$(".d_recommended_con");
	if(($d_recommended_con.children().size()==1&&$d_recommended_con.children().first().get(0).nodeName.toLowerCase()=="img")||($d_recommended_con.children().size()==0)){
		$.get(config.css_path+"bei_liu_lan_dong_tai_banner.css",function(e){
			$("<style>"+e+"</style>").appendTo($("body"));
			$d_recommended_con.load(config.child_tpl_path+"bei_liu_lan_slider.html",function(){
				$.getScript(config.script_path+"bei_liu_lan_dong_tai.js");
			})
		})
	}
		
		
		
		
		
		//给部分东西加title
		var $obj=$(".head .count:first ul:first li");
		if($obj.size()>0){
			var $imgs=$obj
			$.each(["被访问次数","被关注次数","粉丝数","我的收藏"],function(k,v){
				var $t=$imgs.eq(k);
				if(!$t.attr("title")){
					$t.attr("title",v);
				}
			})
		}
		//修复某些宽度不够的评论列表
		$(".pl_wrapper .dbx_content").each(function(){
			var $p=$(this).parent(),
				p_w=$p.width();
				var margin_left=parseInt($(this).css("margin-left"),10);
			$(this).css({
				width:p_w-$(this).prev().outerWidth()-margin_left+"px"
			})
		})
		//qqface
		$(".qqface").live("click",function(){
			var $thi=$(this);
			if($(this).closest(".pl_wrapper").size()!=0){
				if(!$(this).attr("qqface")){
					$(this).attr("qqface","1");
					var $textarea=$(this).closest(".pl_wrapper").find("textarea").first();
					$.get(config.css_path+"jquery.qqFace.css",function(e){
						$("<style>").html(e).appendTo($("body"));
						$.getScript(config.script_path+"jquery.qqFace.js",function(){
							var num=parseInt(Math.random()*10000,10);
							var id="facebox"+num;
							var assign="saytext"+num;
							$textarea.attr("id",assign);
							var replace_str=$thi
								.qqFace({
									id : id, 
									assign:assign, 
									path:config.img_path+'qq_face/',	//表情存放的路径
									on_insert_end:function(){
										//refresh_tishi.refresh_tishi(m.$textarea);
									}
								})
								
								$thi.trigger("click");
						})
					})
				}
			}
		})
		
//换头图
if($(".wrap .banner").size()>0){
	var $img=$(".wrap .banner img:first");
	var $d=$("<div>")
		.css({
			width:"70px",
			height:"70px",
			background:"url("+config.img_path+"huan_tou_tu.png)",
			cursor:"pointer"
		})
		//.html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更换&nbsp;图像")
		.addClass("huan_tou_tu")
		.appendTo($("body"));
		var i=new Image();
		i.onload=function(){
			$d.dbx_set_abs_pos({
				$obj:$img,
				x_pian_yi:this.width-70
			})
		}
		i.src=$img.attr("src");
		var $span=$("<span>")
			.html("设置封面")
			.css({
				width:"28px",
				display:"block",
				position:"relative",
				left:"40px",
				fontSize:"12px"
			})
			.appendTo($d);
}
		
		
		
		
		
		
		
		
		
		
})
