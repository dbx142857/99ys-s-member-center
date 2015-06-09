
$(function(){
	//修正一些tab菜单的样式
	$(".search_title").each(function(){
		if($(this).find(".wrapper").size()==0){
			var $thi=$(this);
			$("<div>")
				.addClass("wrapper")
				.html($thi.html())
				.appendTo($thi.html(""));
			$("<div class='dbx_add'><div class='fade'></div><div class='control'><div class='btn'>+</div><div class='arraw'><div class='dbx_left black'></div><div class='dbx_right black'></div></div></div></div>")
				.appendTo($thi);
		}
	})
	
	
	$.module({
		config:{
			//调用w.Eagain为新载入到页面的HTML注册事件的时候会自动调用该方法为新元素注册事件
			on_Eagain:function(w){
				w._图像hover事件.init();
			}
		}
		,_图像hover事件:{
			init:function(m){
				var $list_photo=$(".list_photo");
				$list_photo.each(function(){
					var $btns=[];//写私信等的两个按钮
					var name;//名字
					$(this)
					.unbind()
					.one("mouseenter",function(){
						var $thi=$(this);
						name=$thi.next().find(".person_name:first").text();
						$(this)
							.attr({
								default_w:$thi.outerWidth()
							})
							.data({
								html:(function(){
									//这里获取图像展开后相关数据并启动模板引擎创造html
									$.ajax({
										
									})
								})()
							})
					})
					.mouseenter(function(){
						var oft=$(this).offset(),
							w=$(this).outerWidth(),
							$thi=$(this),
							tar_w=276,
							$layer=$("<div>")
								.css({
									width:tar_w+"px",
									height:"135px"
								})
								.appendTo($("body"));
								$layer.dbx_set_abs_pos({
									$obj:$thi
								}),
							h=$(this).outerHeight();
						$.each({
							写私信:{
								bg:"green",
								y_pian_yi:68,
								clk:function(){
									
								}
							}
							,取消关注:{
								bg:"gray",
								y_pian_yi:100,
								clk:function(){
									
								}
							}
						},function(k,v){
							var $btn=$("<div>")
								.html(k)
								.appendTo($layer)
								.css({
									background:v.bg,
									width:"64px",
									height:"25px",
									textAlign:"center",
									lineHeight:"25px",
									color:"white",
									borderRadius:"2px",
									cursor:"pointer",
									position:"absolute",
									left:"0",
									top:v.y_pian_yi+"px"
								})
								.click(function(){
									v.clk.apply($thi.get(0));
								})
								.hover_scale({
									duration:100
								})
								.fadeOut(0)
								.fadeIn("slow");
							$btns.push($btn);
						})
						
						
						
						var $div=$("<div>")
							.appendTo($layer)
							.css({
								width:w+"px",
								height:h+"px",
								borderRadius:w/2+"px",
								overflow:"hidden",
								background:"#eee",
								position:"absolute",
								left:"0",
								top:"0"
							})
						
						$thi.clone().appendTo($div);
						$div
							.append($thi.data("html"))
							.stop()
							.animate({
								width:tar_w+"px"
							});
						var $msg=$("<div>")
							.appendTo($div)
							.css({
								width:"195px",
								height:"100%",
								position:"absolute",
								left:"65px",
								padding:"5px"
							});
						var str=$.tpl({
							tpl:[
								"<span style='font-weight:bold;'>{{name}}</span>",
								"<img src='{{src}}'>",
								"<div><span title={{title1}} style='background:{{bg1}}'>{{num1}}</span>",
								"<span title={{title2}} style='background:{{bg2}}'>{{num2}}</span>",
								"<span title={{title3}} style='background:{{bg3}}'>{{num3}}</span></div>"
							].join(""),
							data:{
								name:name,
								src:config.img_path+"card2.png",
								num1:"100000",
								num2:"100000",
								num3:"100000",
								bg1:"url("+config.img_path+"count_02.png) left center no-repeat",
								bg2:"url("+config.img_path+"count_03.png) left center no-repeat",
								bg3:"url("+config.img_path+"count_04.png) left center no-repeat",
								title1:"被关注次数",
								title2:"粉丝数",
								title3:"我喜欢的"
							}
						});
						$msg.html(str)
							.find("div:last span")
							.css({
								marginRight:"5px",
								fontSize:"12px",
								paddingLeft:"18px",
								position:"relative",
								top:"10px",
								cursor:"pointer"
							});
						$layer
						.unbind()
						.bind("mouseleave",function(){
							$.each($btns,function(k,$v){
								$v.stop().fadeOut("slow");
							})
							$div
								.stop()
								.animate({
									width:w+"px"
								},function(){
									$layer.remove();
								})
								
						})
					})
				})
			}
		}
		,_发表微博部分:{
			$C:$(".publish"),
			$textarea:$("textarea"),
			init:function(m,w){
				if(m.$C.find(".issue").size()!=0){
					//文本域字数限制
					var refresh_tishi=m.$textarea.textarea_words_limit({
							$words_msg_ti_shi_obj:m.$C.find(".cou").find("span"),
							$fa_biao_button:$(".issue"),
							num_ti_shi_only:true
					});
					//点击空白隐藏dbx_pop_layer
					$("body").click(function(e){
						e=e?e:window.event;
						var tar=e.srcElement||e.target;
						if($(tar).closest(".dbx_pop_layer").size()==0){
							$(".dbx_pop_layer").hide();
						}
					})
					//qq表情
					var replace_str=m.$C.find(".add").find("a").first()
					.qqFace({
						id : 'facebox', 
						assign:m.$textarea.attr("id","saytext").attr("id"), 
						path:config.img_path+'qq_face/',	//表情存放的路径
						on_insert_end:function(){
							refresh_tishi.refresh_tishi(m.$textarea);
						}
					})
					// m.$C.find(".add").find("a").first()
						// .click(function(){
							// $("<i>").appendTo($("#facebox"))
								// .css({
									// display: "block",
									// position: "absolute",
									// width: "9px",
									// height: "6px",
									// background: "url("+config.img_path+"sj_01.png) no-repeat center",
									// top: "-6px",
									// left: "8px",
									// overflow: "hidden",
									// lineHeight: "6px"
								// })
							// $(".dbx_pop_layer").not("#facebox").hide();
							// $("#facebox")
								// .addClass("dbx_pop_layer")
								// .css({
									// background:"#eee",
									// marginTop:"20px",
									// borderColor:"#ddd"
								// })
								// .find("img")
								// .css({
									// borderColor:"#eee"
								// })
								// .hover(function(){
									// $(this).css({
										// borderColor:"purple"
									// })
								// },function(){
									// $(this).css({
										// borderColor:"#eee"
									// })
								// })
					// })
					//上传视频
					var $div_video=$("<div>")
						.addClass("dbx_pop_layer")
						.appendTo($("body"))
						.hide()
						.load(config.child_tpl_path+"video.html",function(){
							$div_video.set_pop_layer({
								$open_handle:m.$C.find(".video"),
								$outest_div:m.$C.find("textarea")
							})
							$div_video.find("i").first().css({
								left:"65px"
							})
							
							$div_video.find(".bz").find("span").first().hide();
							var check_video_url=function($thi){
								var reg=/[a-zA-z]+:\/\/[^\s]+/;
									if(!reg.test($thi.val())){
										$div_video.find(".bz").find("span").first().show();
									}else{
										$div_video.find(".bz").find("span").first().hide();
									}
							}
							$div_video.find(".sr").children().eq(0).bind("blur keyup",function(){
								check_video_url($(this));
							})
							$div_video.find(".sr").children().eq(0).bind("paste",function(){
								var $thi=$(this);
								setTimeout(function(){
									check_video_url($thi);
								},100)
							})
							$div_video.find(".sr").children().eq(1).click(function(){
								$(this).prev().blur();
								if(!$div_video.find(".bz").find("span").first().is(":visible")){
									if(m.$textarea.val()==m.$textarea.attr("default_val")||m.$textarea.val()==""){
										m.$textarea.val("分享视频 :"+$(this).prev().val())
										refresh_tishi.refresh_tishi();
									}
								}
							})
						})
					//上传图片
					var $div=$("<div>")
						.addClass("dbx_pop_layer")
						.appendTo($("body"))
						.load(config.child_tpl_path+"pictures.html",function(){
							$div.set_pop_layer({
								$open_handle:m.$C.find(".pic"),
								$outest_div:m.$C.find("textarea")
							})
							$div.find("i").first().css({
								left:"35px"
							})
							var $last_li=$div.find("li").last();
							$last_li.prevAll().remove();
							var $talk=$last_li.closest(".talk");
							$talk.attr("dft_h",$talk.height());
							var $file_input=$div.find("li").last().find("a"),
								src=$file_input.find("img").attr("src");
							$file_input=$file_input.replaceWith("<input type='file' id='dbx_file_input' />");
							 $div.hide();
							var check_count_and_disply=function(){
								var count=$last_li.parent().children().size();
								if(count>9){
									$last_li.hide();
								}else{
									$last_li.show();
								}
								if(count>6){
									$talk.css({
										height:parseInt($talk.attr("dft_h"))+100+"px"
									})
								}else{
									$talk.css({
										height:$talk.attr("dft_h")+"px"
									})
								}
								if($last_li.find("#loading_img")){
															$last_li.find("#loading_img").remove();
														}
							}
							$("<style>.uploadify-queue{width:0;height:0;overflow:hidden;}</style>").appendTo($("body"));
								var $loading;
								$("#dbx_file_input").uploadify({
				                    'swf':config.upload_swf_path,
				                    'multi':true,
				                    "fileSizeLimit":"2MB",
				                    "width":"80",
				                    "height":"80",
				                    // "fileTypeExts":["*.jpg","*.png"],
				                    'buttonText':'',
				                    'uploader' :config.upload_php_url,
				                    "onSelect":function(){
				                    	$loading=$("#dbx_file_input").loading_img_before_request({
				                    		src:config.loading_img_path,
				                    		bg_opacity:"1"
				                    	})
				                    },
				                   'onQueueComplete':function(e){
										$loading.remove();
									},
									'onUploadSuccess':function(file,data,response){
										if(data.indexOf("类型不合法")!=-1){
											alert(data);
										}else{
											if($last_li.parent().children().size()<10){
												if(m.$textarea.val()==m.$textarea.attr("default_val")||m.$textarea.val()==""){
													m.$textarea.val("分享图片");
													refresh_tishi.refresh_tishi();
												}
												var src=data.split("/");
												src="http://localhost/uploads/"+src[src.length-1];
												var $li=$("<li><img width='80' height='80' src='"+src+"'/></li>").insertBefore($("#dbx_file_input").parent());
												$last_li.parent().children().css({
													marginRight:"14px",
													marginBottom:"10px"
												})
												check_count_and_disply();
												var $loading=$li.loading_img_before_request().html("X")
													.css({
														fontSize:"75px",
														textAlign:"center",
														lineHeight:"80px",
														color:"white",
														display:"none",
														cursor:"pointer"
													})
													.click(function(){
														
														var $p=$(this).parent();
														$p.animate({
															height:"0"
														},function(){
															$p.remove();
														});
														check_count_and_disply();
														$last_li.show();
													})
												$li.hover(function(){
													$loading.show();
												},function(){
													$loading.hide();
												})
											}
										}
									}
				                });	
				                $file_input=$("#dbx_file_input").css({
				                	cursor:"pointer",
				                	background:"url("+src+")"
				                }).find("object").css({
				                	cursor:"pointer"
				                })
						})
				}
			}
		}
		,_图像查看部分:{
			img_click:function($thi,m,ww){
				var $list_content=$thi.closest(".list_content");
				$("body").animate({
					scrollTop:$list_content.offset().top+"px"
				})
				if($thi.attr("allow_view_big")==0){
					return false;
				}
				$thi.attr("allow_view_big","0");//是否允许查看大图
				var big_img_src=$thi.attr("big_src")||"http://bxmusic-bxmusic.stor.sinaapp.com/115767.jpg",
						$talk=$thi.closest(".talk"),
						active_index=$thi.parent().index(),//当前激活的图片index
						oft=$thi.offset(),
						talk_oft=$talk.offset(),
						w=$thi.width(),
						h=$thi.height(),
						$active_thumb,//当前高亮的缩略图
						talk_h=$talk.height(),
						tar_w,
						tar_h,
						$p=$talk.find("p").first(),
						$ul=$talk.find(".talk_pic").add($talk.find(".pic_one")),
						ul_num=$ul.find("img").size(),
						img=new Image();
					img.onload=function(){
						tar_w=this.width;
						if(tar_w>$talk.width()-10){
							tar_w=$talk.width()-10;
						}
						tar_h=tar_w*this.height/this.width;
						var $img=$("<img>")
							.attr({
								src:big_img_src
							})
							.addClass("dbx_big_img")
							.appendTo($talk.css("position","relative"))
							.css({
								position:"absolute",
								width:w+"px",
								height:h+"px",
								left:oft.left-talk_oft.left+"px",
								top:oft.top-talk_oft.top+"px",
								opacity:"0",
								marginLeft:"-10px"
							})
							.stop().animate({
								width:tar_w,
								height:tar_h,
								left:$talk.width()/2-tar_w/2+20+"px",
								top:$talk.find(".time").size()==0?"70px":"90px",
								opacity:"1"
							},function(){
								$ul.hide();
								$p.attr({
									dft_txt:$p.html()
								})
								$p.get(0).innerHTML+="<br><a href='javascript:;'>收起</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href='javascript:;'>查看大图</a>";
								$p.find("a").first()
									.click(function(){
										if($talk.find(".time").size()!=0){
													var $time=$talk.find(".time");
													$time.css("position","relative").animate({
														top:"0"
													})
												}
										if($ul.find("img").size()!=1){
											$talk.children().last().animate({
												opacity:"0"
											},function(){
												$talk.children().last().remove();
											})
										}
										$img.stop().animate({
											width:w+"px",
											height:h+"px",
											left:oft.left-talk_oft.left+"px",
											top:oft.top-talk_oft.top+"px",
											opacity:"0"
										},function(){
											$img.remove();
											$p.html($p.attr("dft_txt"));
											$thi.attr("allow_view_big","1");
										});
										$ul.show().stop().animate({
											opacity:'1'
										});
										$talk.stop().animate({
											height:talk_h+"px"
										})
									})
									.next()
									.click(function(){
										window.open($img.attr("src"), "newwindow");
									});
								if($ul.find("img").size()>1){
									var $control=$("<div>")
										.appendTo($talk.css("position","relative"))
										.css({
											width:$talk.width()+"px",
											height:"64px",
											position:"absolute",
											height:h+"px",
											left:$talk.css("padding-left"),
											bottom:$talk.find(".time").size()==0?"20px":"40px",
											opacity:"0"
										});
									var $prev=$("<div>")
										.appendTo($control)
										.css({
											position:"absolute",
											width:"22px",
											left:"0",
											cursor:"pointer",
											height:"100%",
											background:"#bbbbbb url("+config.img_path+"calendarPrev.png) center center no-repeat"
										})
									var $next=$("<div>")
										.appendTo($control)
										.css({
											position:"absolute",
											width:"22px",
											right:"0",
											cursor:"pointer",
											height:"100%",
											background:"#bbbbbb url("+config.img_path+"calendarNext.png) center center no-repeat"
										})
									$next.add($prev).hover(function(){
										$(this).css("background-color","#ff6d00");
									},function(){
										$(this).css("background-color","#bbbbbb");
									})
									var $wrapper=$("<div>")
										.appendTo($control)
										.css({
											position:"absolute",
											width:$control.width()-60+"px",
											height:"100%",
											left:"30px",
											height:"100%"
										})
									var $content=$("<div>")
										.appendTo($wrapper);
									$ul.find("img").each(function(){
										var $thi=$(this);
										$("<img>")
											.attr({
												src:$thi.attr("src")
											})
											.css({
												width:$wrapper.height()-8+"px",
												height:$wrapper.height()-8+"px",
												marginTop:"2px",
												border:"solid 2px transparent"
											})
											.appendTo($content)
									})
									var cmds=$content.dbx_scroll_slide({
										$items:$content.children(),//图片元素集合
										viewport_width:$content.parent().width(),//可视范围的宽度
										per_viewport_img_nums:7,//单一适口图片显示张数
										$prev_viewport_btn:$prev,//上一个视口触发的按钮
										$next_viewport_btn:$next,//下一个视口触发的按钮
										auto_scroll:false,
										scroll_interval:2000,
										anim_interval:500,
										hover_pause:true,//鼠标移入暂停定时器
										on_initial_end:function($childs,cmds){
											var set_img_cur=function(){
												$list_content.find(".dbx_big_img")
													.each(function(){
														$(this).css({
															cursor:"auto"
														})
														$(this).img_cur({
															left_cur_img:config.img_path+"left.png",
															right_cur_img:config.img_path+"right.png",
															click_left:function(){
																cmds.get_prev_obj($active_thumb).mouseenter().click();
																if($active_thumb.index()%7==6){
																	$prev.click();
																}
																$active_thumb.siblings().css({
																	opacity:"0.5"
																})
															},
															click_right:function(){
																cmds.get_next_obj($active_thumb).mouseenter().click();
																if($active_thumb.index()%7==0){
																	$next.click();
																}
																$active_thumb.siblings().css({
																	opacity:"0.5"
																})
															}
														})
													})
											}
											// $img.click(function(){
												// if($(this).css("cursor").indexOf("right")==-1){
													// cmds.get_prev_obj($active_thumb).mouseenter().click();
													// if($active_thumb.index()%7==6){
														// $prev.click();
													// }
												// }else{
													// cmds.get_next_obj($active_thumb).mouseenter().click();
													// if($active_thumb.index()%7==0){
														// $next.click();
													// }
												// }
											// })
											if(active_index>=7){
												$next.click();
											}
											$childs
											.css({
												cursor:"pointer"
											})
											.hover(function(){
												$(this).css("border-color","#ff6d00").css({
													opacity:"1"
												});
											},function(){
												$(this).css("border-color","transparent")
													.css({
														opacity:".5"
													})
												$active_thumb.css("border-color","#ff6d00")
															.css({
																opacity:"1"
															})
														.siblings().css("border-color","transparent")
															.css({
																opacity:".5"
															})
											})
											.click(function(){
												$active_thumb=$(this);
												active_index=cmds.get_index($(this));
												$(this).css("border-color","#ff6d00")
													.siblings().css("border-color","transparent");
												var img=new Image();
												img.onload=function(){
													tar_w=this.width;
													if(tar_w>$talk.width()){
														tar_w=$talk.width();
													}
													tar_h=tar_w*this.height/this.width;
													$img
													.stop()
													.animate({
															width:tar_w,
															height:tar_h,
															left:$talk.width()/2-tar_w/2+20+"px",
															top:$talk.find(".time").size()==0?"70px":"90px",
															opacity:"0"
														},500,function(){
															$img.attr({
																src:img.src
															}).animate({
																opacity:"1"
															},500);
														})
													var talk_h_resize=$talk.find(".time").size()==0?30:10;
													$talk.animate({
														height:talk_h_resize+talk_h+(tar_h-$ul.find("img").first().height()*Math.ceil(ul_num/3))+$talk.children().last().height()+20+"px"
													})
													
													if($talk.find(".time").size()!=0){
														var $time=$talk.find(".time");
														$time.css("position","relative").animate({
															top:tar_h+$talk.children().last().height()+30+"px"
														})
													}
												}
												img.src=$(this).attr("src");
												
											})
											for(var i=7,len=$childs.size();i<len;i++){
													var $obj=$childs.eq(i);
													$active_thumb=$obj;
													if(cmds.get_index($obj)==active_index){
														$obj.css("border-color","#ff6d00")
															.css({
																opacity:"1"
															})
														.siblings().css("border-color","transparent")
															.css({
																opacity:".5"
															})
														break;
													}
												}
											set_img_cur();
										}//初始化完毕执行的回调函数
									})
									
									if($talk.find(".time").size()!=0){
										var $time=$talk.find(".time");
										$time.css("position","relative").animate({
											top:tar_h+$talk.children().last().height()+30+"px"
										})
									}
										
								}
								else{
									if($talk.find(".time").size()!=0){
										var $time=$talk.find(".time");
										$time.css("position","relative").animate({
											top:tar_h+10+"px"
										})
									}
								}
							})
							.click(function(){
								if($ul.find("img").size()==1){
									$p.find("a").first().click();
								}
							})
							var talk_h_resize=$talk.find(".time").size()==0?30:10;
							$talk.stop().animate({
								height:talk_h_resize+talk_h+(tar_h-$ul.find("img").first().height()*Math.ceil(ul_num/3))+"px"
							},function(){
								if($ul.find("img").size()!=1){
									$talk.stop().animate({
										height:$talk.height()+$talk.children().last().height()+20+"px"
									},function(){
										$talk.children().last().animate({
											opacity:"1"
										})
									});
								}
							})
							$ul.stop().animate({
								opacity:"0"
							})
					}
					img.src=big_img_src;
			}
			,E:{
				"click .talk_pic->img&.pic_one->img":function($thi,m,w){
					m.img_click($thi,m,w);
				}
				// ,"mouseenter .dbx_big_img":function($thi,m){
					// $thi.data({
						// left_oft:$thi.offset().left
					// })
				// }
				// ,"mousemove .dbx_big_img":function($thi){
					// var w=$thi.width(),
						// cur_pageX=event.pageX;
					// if(cur_pageX-$thi.data("left_oft")>w/2){
						// $thi.addClass("dbx_big_img_right_cur").removeClass("dbx_big_img_left_cur");
					// }else{
						// $thi.removeClass("dbx_big_img_right_cur").addClass("dbx_big_img_left_cur");
					// }
				// }
			}
		}
		,_收藏喜欢评论转发:{
			E:{
				//"click .time:not(.time2)->a"
				"click .time->a":function($thi,m,w){
					//相关ajax
					var funs={
						//喜欢
						"fav":function(){
							//是否已经收藏
							if(!$thi.attr("allow_fav")){
								$thi.attr("allow_fav","1");
							}
							var ti_shi=function(bg){
								var $div=$("<div>")
											.appendTo($("body"))
											.css({
												width:"51px",
												height:"40px",
												background:bg,
												marginTop:"0"
											})
											$div.dbx_set_abs_pos({
												$obj:$thi,
												x_pian_yi:0
											});
										$div.animate({
											marginTop:-$thi.height()-20+"px",
											opacity:"0.5"
										},1000,function(){
											$div.remove();
										})
							}
							$.ajax({
								success:function(){
									if($thi.attr("allow_fav")=="1"){
										// $thi.css({
											// backgroundPosition:"0 -22px",
											// color:"#ff6d00"
										// })
										var txt=$thi.text();
										txt=txt.substring(1,txt.length-1);
										txt=parseInt(txt,10)+1;
										$thi.html("("+txt+")");
										$thi.attr("allow_fav","0");
										ti_shi("url("+config.img_path+"heart.png) 0 -40px");
									}else{
										// $thi.css({
											// backgroundPosition:"0 0",
											// color:"#333"
										// })
										var txt=$thi.text();
										txt=txt.substring(1,txt.length-1);
										txt=parseInt(txt,10)-1;
										$thi.html("("+txt+")");
										$thi.attr("allow_fav","1");
										ti_shi("url("+config.img_path+"heart.png) 0 -0px");
									}
								}
							})
						}
						//分享
						,"share":function(){
							var $list_content=$thi.closest(".list_content");
							var $div;
							if(!$thi.attr("if_load_share")){
								$div=$("<div>")
									.addClass("dbx_list_child_tpls")
									.load(config.child_tpl_path+"share.html",function(){
										$div.insertAfter($thi.closest(".time"));
										$div.show().slideUp(0).slideDown("slow")
										// $collect.slideUp(0).slideDown("slow");
										//set_collect_load_event($list_content);
										$thi.data({
											"div":$div
										})
									})
								$thi.attr("if_load_share",1);
							}else{
								$div=$thi.data("div");
							}
							$list_content.find(".dbx_list_child_tpls").not($div).hide();
							if(!$thi.data("div")){
								return false;
							}
							if($div.is(":visible")==false){
								$div.addClass("dbx_collect").css({
									minHeight:"0"
								}).show().slideUp(0).slideDown("slow");
							}else{
								$div.addClass("dbx_collect")
								.css({
									minHeight:"0"
								}).slideUp("slow",function(){
									$div.hide();
								});
							}
						}
						//收藏
						,"colect":function(){
							var $list_content=$thi.closest(".list_content");
							var $collect;
							if(!$thi.attr("if_load_collect")){
								$collect=$("<div>")
									.addClass("dbx_list_child_tpls")
									.load(config.child_tpl_path+"collect.html",function(){
										$collect.insertAfter($thi.closest(".time"));
										$collect.show().slideUp(0).slideDown("slow");
										// $collect.slideUp(0).slideDown("slow");
										set_collect_load_event($list_content);
										$collect.find(".arraw_right").click();
										$collect.find(".xin_jian").click(function(){
											$collect.find(".arraw_left").click();
										})
										$thi.data({
											"div":$collect
										})
									})
								$thi.attr("if_load_collect",1);
							}else{
								$collect=$thi.data("div");
							}
							$list_content.find(".dbx_list_child_tpls").not($collect).hide();
							if(!$thi.data("div")){
								return false;
							}
							if($collect.is(":visible")==false){
								$collect.addClass("dbx_collect").css({
									minHeight:"0"
								}).show().slideUp(0).slideDown("slow");
							}else{
								$collect.addClass("dbx_collect")
								.css({
									minHeight:"0"
								}).slideUp("slow",function(){
									$collect.hide();
								});
							}
						}
						//评论
						,"comment":function(){
							var $list_content=$thi.closest(".list_content");
							var $div;
							if($thi.attr("if_load_list_tpl")==undefined){
								var $time=$thi.closest(".time");
							$div=$("<div>")
								.addClass("dbx_list_child_tpls")
								.hide()
									.insertAfter($time)
									.load(config.child_tpl_path+"ping_lun_list.html",function(){
										$div.show().slideUp(0).slideDown("slow")
										var $C=$time.next();
										$thi.data({
											"div":$div
										})
										load_pl_list_script($div);
									})
								$thi.attr("if_load_list_tpl",1);
							}else{
								$div=$thi.data("div");
							}
							$list_content.find(".dbx_list_child_tpls").not($div).hide();
							if(!$thi.data("div")){
								return false;
							}
							if($div.is(":visible")==false){
								$div.addClass("dbx_comment").slideDown("slow");
							}else{
								$div.addClass("dbx_comment").slideUp("slow");
							}
						}
					}
					funs[$thi.attr("class")]();
				}
			}
			,Ebefore:function(){
				// $(".share").each(function(){
					// $(this).prev().addClass("fav");
				// })
				$(".time").each(function(){
					var $fav=null;
					$(this).find("a").each(function(){
						if(!$(this).attr("class")){
							$fav=$(this);
							return false;
						}
					})
					if($fav!=null){
						$fav.addClass("fav");
					}
					// var $a=$(this).find("a:first");
					// if($a.attr("class")==""){
						// $a.addClass("fav");
					// }
				})
			}
		}
		,_星评效果:{
			E:{
				"mouseenter .grade->a":function($thi,m){
					var index=$thi.index(),
						$p=$thi.parent(),
						$grade=$thi.parent().find("span").first();
					if($p.attr("cur_grade")==undefined){
						$p.attr("cur_grade",parseInt($grade.html()));
					}
					$grade.html(index*2+2+"分");
					$thi.prevAll()
						.add($thi)
						.css({
							opacity:"1",
							backgroundPosition:"left -133px"
						});
					$thi.nextAll()
						.each(function(){
							if(this.nodeName.toLowerCase()=="a"){
								$(this).css({
									opacity:"0.3",
									backgroundPosition:"left -107px"
								});
							}
						})
				}
				,"click .grade->a":function($thi,m){
					//执行星评的ajax
					$.ajax({
						
					})
				}
				,"mouseleave .grade->a":function($thi,m){
					var $p=$thi.parent();
					$p.find("a").eq(parseInt($p.attr("cur_grade"))/2-1).mouseenter();
				}
			}
		}
		,视频播放部分:{
			flag:{
				allow_add_video:true
			}
			,E:{
				"click .vidio->img,i":function($thi,m){
					if(m.flag.allow_add_video==false){
						return false;
					}else{
						m.flag.allow_add_video=false;
					}
					var $video=$thi.closest(".vidio"),
						src=$video.attr("video_src")==undefined?"http://i1.hunantv.com/ui/swf/share/player.swf?tid=340&amp;cid=665938&amp;fid=713246":$video.attr("src"),
						video_h=425,
						$talk=$thi.closest(".talk"),
						$p=$video.prev(),
						str=[
							"<embed align='middle' allowfullscreen='true' allowscriptaccess='always' height='"+video_h+"' quality='high' src='",
							src,
							"' type='application/x-shockwave-flash' width='"+$video.width()+"'>"
						].join("");
					if($video.attr("default_h")==undefined){
						$video.attr("default_h",$video.height());
					}
					var $dian_ying=$(str).appendTo($video);
					$video.find("span").animate({
						opacity:"0",
						height:"0"
					},function(){
						$p.attr({
									dft_txt:$p.html()
								})
						$p.get(0).innerHTML+="<br><a href='javascript:;'>收起</a>";
						$p.find("a").first()
							.click(function(){
								m.flag.allow_add_video=true;
								$video.find("span").css({
									opacity:"1",
									height:"160px"
								})
								$dian_ying.remove();
								$p.html($p.attr("dft_txt"));
								$video.css({
									height:$video.attr("default_h")
								})
							})
					})
					$video.animate({
						height:parseInt($video.attr("default_h"))+video_h-130+"px"
					})
				}
			}
			,init:function(m){
				$(".vidio img,i").css("cursor","pointer")
			}
		}
		,每日签到:{
			init:function(){
				$("a:contains(每日签到)").one("click",function(){
					var $thi=$(this);
					//每日签到的ajax
					$.ajax({
						url:"../../php/ajax_test.php",
						success:function(){
							var $div=$("<div>")
								.appendTo($("body"))
								.css({
									width:$thi.width()+"px",
									height:$thi.height()+"px",
									lineHeight:$thi.height()+"px",
									textAlign:"center",
									fontSize:"16px",
									color:"#fff",
									background:"#FF6D00",
									marginTop:"0"
								})
								.html("+1");
								$div.dbx_set_abs_pos({
									$obj:$thi
								});
							$div.animate({
								marginTop:-$thi.height()+"px",
								opacity:"0"
							},1000)
							$thi.html("已签到");
						}
					})
				})
			}
		}
		,tab菜单相关:{
			$C:$(".search_title").css({
				overflow:"hidden"
			}),
			$W:$(".search_title .wrapper"),
			$control:$(".dbx_add"),
			$left_btn:$(".dbx_left"),
			$right_btn:$(".dbx_right"),
			
			check_btns:function(m,k){
				var get_total_w=function(){
					var w=0;
					m.$W.eq(k).children().each(function(){
						w+=$(this).outerWidth()+parseInt($(this).css("margin-left"));
					})
					return w;
				}
				if(m.$C.eq(k).width()>=get_total_w()){
					m.$control.eq(k).hide();
					return false;
				}
				var $left=m.$left_btn.eq(k),
					$right=m.$right_btn.eq(k);
				if(m.$W.eq(k).css("left")=="auto"){
					m.$W.eq(k).css("left","0");
				}
				var cur_left=parseInt(m.$W.eq(k).css("left"));
					if(cur_left>=0&&cur_left<=10){
						$left.addClass("disable").removeClass("black");
					}
					else{
						
					}
			}
			,init:function(m){
				if(m.$W.size()==0){
					return false;
				}
				m.$W.each(function(k){
					m.$C.eq(k).css({
						borderBottom:"none"
					}).find(".btn").click(function(){
						var $thi=$(this);
						var $bg=$("<div>")
							.appendTo($("body"))
							.css({
								background:"black",
								opacity:"0.9",
								width:"100%",
								height:"100%",
								position:"fixed",
								left:"0",
								top:"0",
								zIndex:"1000"
							});
							
						var $collect=$("<div>")
									.appendTo($("body"))
									.load(config.child_tpl_path+"collect.html",function(){
										
										set_collect_load_event($collect);
										$collect.find(".qu_xiao").click(function(){
											$collect.add($bg).remove();
										})
										$collect.find(".arraw_right").click();
										$collect.find(".xin_jian").click(function(){
											$collect.find(".arraw_left").click();
										})
										$collect.find(".que_ding").click(function(){
											var $txt=$collect.find(".left :text");
											var val=$txt.val();
											if($.trim(val)==""){
												alert("收藏名称不能为空");
											}else{
												$.ajax({
													success:function(){
														alert("恭喜，添加收藏成功");
														$("<a>")
															.attr({
																href:"javascript:;"
															})
															.html(val)
															.insertAfter($thi.closest(".search_title").find(".wrapper a:last"));
															$collect.add($bg).remove();
															m.check_btns(m,k);
													}
												})
											}
										})
									});
						$collect.dbx_set_abs_pos({
							$obj:$thi.closest(".search_title"),
							x_pian_yi:310,
							y_pian_yi:-30
						});
					})
					m.$W.eq(k).css({
						borderBottom:"solid 1px black",
						height:"46px"
					})
					m.$W.eq(k).find(".hov").css({
						borderBottom:"solid 1px white",
						marginTop:"0px",
						zIndex:"99999"
					})
					//tab菜单鼠标移入效果
					m.$W.eq(k).delegate("a","mouseenter",function(){
						if(!$(this).hasClass("hov")){
							
						}
					})
					var $hov=m.$W.eq(k).find(".hov");
					var hov_left=$hov.position().left;
					var $control=m.$control.eq(k);
					if(hov_left>=m.$C.eq(k).width()-$control.outerWidth()){
						m.$W.eq(k).css({
							left:-hov_left+(m.$C.eq(k).width()-$control.outerWidth()-$hov.outerWidth())+"px"
						})
					}
					m.check_btns(m,k);
					m.$W.eq(k).data("check_btns",function(){
						m.check_btns(m,k);
					})
					m.$left_btn.eq(k).click(function(){
						var $thi=$(this);
						if($thi.hasClass("hover")){
							var cur_left=parseInt(m.$W.eq(k).css("left"));
							var tar_left=cur_left+500;
							if(tar_left>0){
								tar_left=0;
							}
							m.$right_btn.eq(k).addClass("black").removeClass("disable");
							m.$W.eq(k).animate({
									left:tar_left+"px"
							},function(){
								m.check_btns(m,k);
							});
						}
					})
					.hover(function(){
						var $thi=$(this);
						if(!$thi.hasClass("disable")){
							$thi.addClass("hover");
						}
					},function(){
						var $thi=$(this);
						$thi.removeClass("hover");
					})
					m.$right_btn.eq(k).click(function(){
					var $thi=$(this);
					if($thi.hasClass("hover")){
						var cur_left=parseInt(m.$W.eq(k).css("left"));
						var tar_left=cur_left-500;
						var get_total_w=function(){
							var w=0;
							m.$W.eq(k).children().each(function(){
								w+=$(this).outerWidth()+parseInt($(this).css("margin-left"));
							})
							return w;
						}
						if(-tar_left+m.$C.eq(k).width()>get_total_w()+m.$control.eq(k).outerWidth()){
							tar_left=-(get_total_w()-m.$C.eq(k).width()+m.$control.eq(k).outerWidth());
							m.$right_btn.eq(k).removeClass("black").addClass("disable");
						}
						m.$left_btn.eq(k).addClass("black").removeClass("disable");
						m.$W.eq(k).stop().animate({
							left:tar_left+"px"
						},500,function(){
							m.check_btns(m,k);
						})
					}
				})
				.hover(function(){
					var $thi=$(this);
					if(!$thi.hasClass("disable")){
						$thi.addClass("hover");
					}
				},function(){
					var $thi=$(this);
					$thi.removeClass("hover");
				})
				var $hov=m.$W.eq(k).find(".hov");
				})
				
				
				
				
			}
		}
		
	})
})
