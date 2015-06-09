//$:
/*
 * 1)-------->tpl------------------------------------简单的模板引擎
 * 2)-------->module------------------------------------简单的模块处理
 * 3)-------->clog------------------------------------在ie下修复console_log事件
 * 4)-------->parse_url-------------------------------解析url参数
 * 5)---------get_at(eq)-----------------------------------得到json中第eq个的k和v
 */

//$.fn:
/*
 * 1)->add_zhe_zhao()----------添加遮罩层
 * 2)->textarea_words_limit()-------------文本域文字限制
 * 3)->draggable()-------------------使元素具有可拖动行为
 * 4)->set_pop_layer()---------------------设置pop layer
 * 5)-> loading_img_before_request------------在执行一个请求之前加载loading图片
 * 6)-> placeholder-------------------------------placeholder插件
 * 7)->dbx_mouseenter_show_and_hide-----在鼠标移入某些元素时候隐藏一些东东，显示另一些东东
 * 8)->dbx_fade_slide------------------------淡入淡出幻灯片插件
 * 9)->dbx_scroll_slide-----------------------滚动幻灯片插件
 * 10)->dbx_set_abs_pos---------------------选取某个元素作为参照，将另一个元素位置固定到那儿，即使窗口缩放也不受影响
 	11)->replace_with_div-------------------将select替换成div类型的
 	12)->replace_checkbox----------------替换复选框
 	13)->hover_scale-----------------------鼠标移入放大
 	14)->img_cur--------------------------在图片的左右两边分别显示不同 的光标（png格式的）
 	15)->close_when_click_white------------点击空白处关闭
 	16)->betterTooltip--------------------------替代title
 	17)->form_check---------------------------表单验证(依赖于dbx_set_abs_pos)
 	18)->replace_radio---------------------------替换单选框
 * */
(function($) {
	$.extend({
		parse_url:function(href){
			var url=href||location.href;
			var a =  document.createElement('a');
			 a.href = url;
	     var ret = {},
	         seg = a.search.replace(/^\?/,'').split('&'),
	         len = seg.length, i = 0, s;
	     for (;i<len;i++) {
	         if (!seg[i]) { continue; }
	         s = seg[i].split('=');
	         ret[s[0]] = s[1];
	     }
	     return ret;
		},
		clog:function(str){
			if(typeof(console)!="undefined"){
				console.log(str);
				return false;
			}
			if(!$("body").attr("if_clog")){
				$("body").attr("if_clog",1);
					$("<div>")
						.appendTo($("body").css("position","relative"))
						.attr({
							id:"clog"
						})
						.css({
							position:"absolute",
							width:"200px",
							height:"400px",
							right:"0",
							top:"0",
							fontWeight:"bolder",
							background:"purple",
							overflow:"scroll",
							zIndex:"1000",
							opacity:"0.8"
						})
			}
			var div=$("#clog").get(0);
			div.innerHTML+="<div style='height:20px;'>"+str+"</div>";
			div.scrollTop = div.scrollHeight;
		},
		/*
		 * demos:
		 * var data={
			0:{
				str:"fucku00000000",
				str1:{
					sub:"hello00000000"
				}
			}
			,1:{
				str:"fucku1111111111",
				str1:{
					sub:"hello111111111"
				}
			}
		};
		var $div=$("div").appendTo($("body"));
		for(var i in data)
		{
			var str=$.tpl({
				tpl:[
					"<div>{{str}}1111111111111111{{str}}2222{{str1.sub}}</div>"
					,"<div>{{str}}1111111111111111{{str}}2222{{str1.sub}}</div>"
					].join(""),
				data:data[i]
			});
			$(str).appendTo($div)
		}
		 */

		tpl : function(options) {
			options = $.extend({
				left_split : "{{",
				right_split : "}}",
				tpl : "",
				data : null
			}, options);
			if (options.data == null) {
				return options.tpl;
			} else {
				var reg = new RegExp(options.left_split + "(.+?)" + options.right_split, "gi");
				var strs = options.tpl.match(reg), tpl = options.tpl;
				for (var i = 0; i < strs.length; i++) {
					var str = strs[i];
					strs[i] = str.substring(options.left_split.length, str.length - (options.right_split.length));
					tpl = tpl.replace(str, str.indexOf(".") == -1 ? (options.data[strs[i]]) : (eval("options.data." + strs[i])));
				}
				return tpl;
			}
		},

		/*docs:
		 *
		 * 模块分割，以每个模块中init为入口方法
		 * !!!仅仅支持jquery中可以delegate的事件
		 * module中键名不可以相同
		 * E模块的回调函数中第一个参数表示触发事件的对象，第二个表示当前模块引用
			可以加入配置：在json中添加config模块：{
				on_Eagain：表示页面元素事件重置时候执行 的动作
			}
		 * $C:视图容器，不声明则默认$("body")
		 * 为整体json增加Eagain方法，调用则重新注册事件
		 *如果存在E模块，则默认为其增加Eagain，功能是重新运行然后给新增加的元素注册事件
		 *如果存在E模块，则默认为其增加Ebefore，功能是运行E之前处理相关东东
		 * E:事件集合{
		 * 	k={
		 * 	最后一个参数表示参与事件的对象：{
		 * 	若存在->，则->之前的selector表示delegate中的父元素，->之后的selector表示被delegate的元素
		 * }
		 * 最后一个参数之前表示事件的类型：{
		 * 	若不存在：，则改事件触发时立即执行函数，否则将等待：之后设置的时间之后再执行函数
		 * }
		 * }
		 */
		/*
		 * demos:
		 * $.module({
			test1:{
				msg:"hello"
				,E:{
					"click:1000 #div0":function($thi,module){
						clog("div clicked")
						$thi.html("dsfsdf");
					}
					,"click mouseenter:1000 .div0->input[type=button],textarea":function($thi,module){
						clog("button clicked");
					}
					,"click .div0->input[type=button]:first":function($thi,module){
						alert($thi.val()+module.msg)
					}
					,"paste:1000 textarea":function($thi,module){
						$thi.val("i am pasteed")
					}
					,"resize window":function($thi,module){
						clog("window resized1");
						clog("msg"+module.msg)
					}
					,"resize:30 window":function($thi,module){
						clog("window resized2")
					}
					,"resize:1000 window":function($thi,module){
						clog("window resized3")
					}
					,"click:500 body":function($thi,module){
						$("<textarea>").appendTo($("body"));
						clog("body clicked")
					}
					,"mousewheel window":function(){
						clog("mouse wheellllllllllll")
					}
					,"keyup textarea":function(){
						alert("textarea keyup")
					}
				}
				,init:function()
				{
					$("<input type='button' value='123e'/>").appendTo($("body"));
					$("<input type='button' value='123e'/>").appendTo($("#div0"));
					$("<textarea>").appendTo($("#div0"));
					$("<textarea>").appendTo($("body"));
				}
			}
		})
		 */
		module : function(json) {
			for (var i in json) {
				var item = json[i];
				var $C = item.$C || $("body");
				item.$C = $C;
				if (item.E) {
					item.Eagain=function(the_item){
							if(item.Ebefore){
								item.Ebefore(item,json);
							}
							if(arguments.length!=0){
								item=the_item;
							}
							var e = item.E;
							for(var j in e){
								var fn = e[j];
								var arr = j.split(" "), arr_len = arr.length, ele = arr[arr_len - 1], $parent, childs;
								var e_types = arr.splice(0, arr_len - 1);
								var delegates=ele.split("&");
								var set_event=function($parent,childs){
									for (var q in e_types) {
										var e_type = e_types[q], mao_hao_index = e_type.indexOf(":");
										if (childs!="window") {
											if (mao_hao_index == -1) {
												if(childs!="body")
												{
													$parent.undelegate(e_type).delegate(childs, e_type, (function(fn,item,json) {
														return function() {
															fn($(this),item,json);
														}
													})(fn,item,json))
												}
												else
												{
													$("body").on(e_type,(function(fn,item,json) {
														return function() {
															var $thi = $(this);
															fn($thi,item,json)
														}
													})(fn,item,json))
												}
											} else {
												var e_type_arr = e_type.split(":");
												if(childs!="body")
												{
													$parent.undelegate(e_type).delegate(childs, e_type_arr[0], (function(fn,item,json,dealy) {
														return function() {
															var $thi = $(this);
															setTimeout(function() {
																fn($thi,item,json);
															}, dealy);
														}
													})(fn,item,json,e_type_arr[1]))
												}
												else
												{
													$("body").on(e_type_arr[0], (function(fn,item,json,dealy) {
														return function() {
															var $thi = $(this);
															setTimeout(function() {
																fn($thi,item,json);
															}, dealy);
														}
													})(fn,item,json,e_type_arr[1]))
												}
											}
										}
										else
										{
											if (mao_hao_index == -1) {
													$(window).on(e_type,(function(fn,item,json) {
													return function() {
														var $thi = $(this);
														fn($thi,item,json)
													}
												})(fn,item,json))
											} else {
												var e_type_arr = e_type.split(":");
												$(window).on(e_type_arr[0],(function(fn,item,json,dealy) {
													return function() {
														var $thi = $(this);
														setTimeout(function() {
															fn($thi,item,json);
														}, dealy);
													}
												})(fn,item,json,e_type_arr[1]))
											}
										}
									}
								}
								for(var kkk in delegates){
									var ele=delegates[kkk];
									if (ele.indexOf("->") == -1) {
										$parent = $C;
										childs = ele;
									} else {
										obj_arr = ele.split("->");
										$parent = obj_arr[0]=="document"?$(document):$(obj_arr[0]);
										childs = obj_arr[1];
									}
									set_event($parent,childs);
								}
							}
					};
					item.Eagain();
				}
			}
			json.Eagain=function(){
				for(var kk in json){
					var item=json[kk];
					if(item.Eagain){
						item.Eagain(item);
					}
				}
				if(json.config.on_Eagain){
					json.config.on_Eagain(json);
				}
			}
			for(var k in json){
				var item=json[k];
				if(item.init){
					item.init(item,json);
				}
			}
			return $;
		}
		,get_at:function(eq,obj){
			var index=0,result={};
			for(var i in obj){
				if(index==eq){
					result.k=i;
					result.v=obj[i];
					break;
				}
				index++;
			}
			return result;
		}
	})
})(jQuery);



jQuery.fn.extend({
	//给元素添加遮罩
	/*
	 * 不依赖于任何遮罩层样式定义
	 * demo:
	 * $('#beizhu_div').add_zhe_zhao({
		$close_zhe_zhao_handle:$('.zhezhao_close'),
		$open_zhe_zhao_handle:$('.bei_zhu_span'),
		opacity:0.5
	})
	 */
	add_zhe_zhao:function(options)
	{
		var defaults={
			$close_zhe_zhao_handle:null,//打开遮罩层的触发者
			$open_zhe_zhao_handle:null,//关闭遮罩层的出发者
			zIndex:"1000",//遮罩层整体的zindex
			opacity:"0.5",//遮罩层北京透明度
			bg_opacity:"0.1",//黑色边框层透明度
			bg_border_radius:"5px"
		}
		var options=jQuery.extend(defaults,options);
		var $thi=$(this).css({
			display:"block"
		}).wrap("<div style='display:none;'></div>");
		var zhe_zhao_css={
			position:"fixed",
			top:"0",
			left:"0",
			width:"100%",
			height:"100%",
			zIndex:options.zIndex
		}
		var $bg=$("<div>").css({
				width:$thi.width()+10+"px",
				height:$thi.height()+10+"px",
				background:"black",
				opacity:options.bg_opacity,
				borderRadius:options.bg_border_radius,
				behavior:"url(ie-css3.htc)"
			})
			.addClass("zhe_zhao_bg")
			.appendTo($thi.parent());
		$thi.parent().css(zhe_zhao_css).append(
			$("<div>").css(zhe_zhao_css).css({
				opacity:options.opacity,
				background:"#000"
			})
		)
		
		
		options.$close_zhe_zhao_handle.live("click",function()
		{
			$thi.parent().hide();
		})
		options.$open_zhe_zhao_handle.click(function()
		{
			var thi_top=(document.body.scrollHeight*0.8-$thi.height())/2,
				bg_top=(document.body.scrollHeight*0.8-$bg.height())/2;
			if(thi_top<0)
			{
				thi_top=0;
			}
			if(bg_top<-5)
			{
				bg_top=-5;
			}
			$thi.css({
				zIndex:parseInt(options.zIndex)+2,
				margin:"0 auto",
				position:"relative",
				top:"30%"
			})
			$bg.css({
				zIndex:parseInt(options.zIndex)+1,
				margin:"0 auto",
				position:"relative",
				top:"30%",
				marginTop:-$thi.height()-5+"px"
			})
			$thi.parent().show();
		});
		return $(this);
	},
	/*
	 * demo:
	 * $(".input_detail").textarea_words_limit({
			$words_msg_ti_shi_obj:$("#textarea_words_ti_shi"),
			$fa_biao_button:$(".btn_30px"),
			num_ti_shi_only:true
	});
	 */
	textarea_words_limit:function(options)
	{
		var defaults={
			$words_msg_ti_shi_obj:null,//文字剩余提示的对象
			num_ti_shi_only:false,//是否仅仅使用阿拉伯数字作为提示
			$fa_biao_button:null,//点击发表的按钮
			words_num_limit:500,//文字数目限制
			allow_fa_biao_fun:function()//字数不超过限制允许发表调用的方法
			{
				alert("测试：执行发表的ajax");
			}
		}
		var options=jQuery.extend(defaults,options);
		var $textarea=$(this).attr("default_val",$(this).val()),
			textarea_default_val = $textarea.val();
		var check_words = function($thi) {
			var sx_con = $textarea.val();
			var han_zi_num = 0, not_han_zi_num = 0;
			for (var i = 0; i < sx_con.length; i++) {
				var chr = sx_con[i];
				var reg = /[\u4E00-\u9FA5]/g
				if (reg.test(chr)) {
					han_zi_num++;
				} else {
					not_han_zi_num++;
				}
			}
			var sx_cd = sx_con.length;
			var sx_cd = Math.round(han_zi_num + (not_han_zi_num) / 2);
			$textarea.attr("words_num",sx_cd);
			var sx_zs=options.words_num_limit;
			var sx_sy = sx_zs - sx_cd;
			if(!options.num_ti_shi_only)
			{
				if(sx_sy < 0)
				{
					options.$words_msg_ti_shi_obj.html("已经超出 <b>" + (-sx_sy) + "</b> 个字 ");
				}
				else
				{
					options.$words_msg_ti_shi_obj.html("还能输入 <b>" + sx_sy + "</b> 个字 ");
				}
			}
			else
			{
				options.$words_msg_ti_shi_obj.html(sx_sy);
			}
		}
		
		$textarea.focus(function() {
		if ($(this).val() == textarea_default_val) {
			$(this).val('');
		}
	}).blur(function() {
		if ($(this).val() == '') {
			$(this).val(textarea_default_val);
		}
	}).on("keypress keyup mouseup blur focus", function() {
		check_words($(this));
	}).on("paste",function(){
		var $thi=$(this);
		setTimeout(function(){
			check_words($thi);
		},100);
	})
	if(options.$fa_biao_button==null){
		return false;
	}
	options.$fa_biao_button.click(function()
	{
		var sx_cd=$textarea.attr("words_num");
		var $b=options.num_ti_shi_only?(options.$words_msg_ti_shi_obj):(options.$words_msg_ti_shi_obj.find($('b')));
			var change=function(from,to)
			{
				$b.css({
					color:"red"
				})
				setTimeout(function()
				{
					$b.css({
						color:from
					})
					setTimeout(function()
					{
						$b.css({
							color:to
						})
						setTimeout(function()
						{
							$b.css({
								color:from
							})
						},200);
					},200);
				},200);
				
			}
		if(sx_cd>options.words_num_limit)
		{
			change("black","red");
		}
		else
		{
			if($textarea.val()==textarea_default_val){
				change("black","red");
			}
			else{
				options.allow_fa_biao_fun();
			}
		}
	})
		
		
		
		return {
			refresh_tishi:check_words
		}
	},
	/*
	 * demo:
	 * $obj.draggable({
				expect_obj_id:["es_resize","es_resize_inner"],
				on_drag:function($thi)
				{
					$thi.add($can_kao).css({
						backgroundPosition:"-"+$thi.css("left")+" -"+$thi.css("top")
					})
					on_resize_and_drag_fun();
				}
			});
	 */
	draggable:function(options)
	{
		var defaults={
			move_scope_limit:1,//被拖动的元素活动范围（1为父元素内部，2为父元素的父元素内部，以此类推，0为整个页面）
			expect_obj_id:[],//包含在该数组里的元素在点击时候不出发拖动事件
			$chick_who_to_start_drag:"self",//默认点击自身任何部位开启拖拽
			on_drag_begin:function($thi)//开始拖动瞬间的动作
			{
				
			},
			on_drag:function($thi)//拖动过程中的动作
			{
				
			},//拖动过程中执行的方法
			on_drag_end:function($thi)//拖动结束时的动作
			{
				
			}//拖动结束释放鼠标瞬间执行的动作
		}
		var options=jQuery.extend(defaults,options),	
			$cur_drag_obj=null,
			on_drag_start_mouse_pos_x,
			on_drag_start_mouse_pos_y;
		$(this).each(function()
		{
			var $thi=$(this),thi=$thi.get(0);
			var default_left;
			var default_top;
			var position=$thi.css("position");
			var	$out_scope=$thi;
			if(options.move_scope_limit!=0)
			{
				for(var i=0;i<options.move_scope_limit;i++)
				{
					$out_scope=$out_scope.parent();
				}
			}
			if(!position||position.toLowerCase()=="static")
			{
				$thi.css({
					position:"relative"
				})
			}
			if($thi.css("left")=="auto"){
				var right=parseInt($thi.css("right"));
				$thi.css({
					left:$out_scope.width()-right-$thi.outerWidth()+"px"
				})
			}
			var $chick_who_to_start_drag=options.$chick_who_to_start_drag=="self"?$thi:$thi.find(options.$chick_who_to_start_drag);
			$chick_who_to_start_drag.mousedown(function(e)
			{
				var e = e ? e : window.event;
				var tar=e.srcElement||e.target;
				if(jQuery.inArray(tar.id,options.expect_obj_id)==-1)
				{
					
					default_left=$thi.css("left");
					default_top=$thi.css("top");
					if(default_left=="auto")
					{
						default_left=0;
					}
					else
					{
						var px_left_index=default_left.indexOf("px");
						default_left=parseInt(default_left.substring(0,px_left_index));
					}
					if(default_top=="auto")
					{
						default_top=0;
					}
					else
					{
						var px_top_index=default_top.indexOf("px");
						default_top=parseInt(default_top.substring(0,px_top_index));
					}
					
					
					on_drag_start_mouse_pos_x=e.pageX;
					on_drag_start_mouse_pos_y=e.pageY;
					$cur_drag_obj=$thi;
					options.on_drag_begin($thi);
					}
				event.preventDefault();
				event.stopPropagation();
			})
			$('body').mouseup(function()
			{
				options.on_drag_end($cur_drag_obj);
				$cur_drag_obj=null;
			})
			.mousemove(function(e)
			{
				if($cur_drag_obj!=null)
				{
					var e = e ? e : window.event,
						tar_left=default_left+(e.pageX-on_drag_start_mouse_pos_x),
						tar_top=default_top+(e.pageY-on_drag_start_mouse_pos_y);
					if(options.move_scope_limit!=0)
					{
						if(position=="absolute")
						{
							if(tar_left<0)
							{
								tar_left=0;
							}
							if(tar_left<0)
							{
								tar_left=0;
							}
							if(tar_top<0)
							{
								tar_top=0;
							}
							var max_left=$out_scope.width()-$cur_drag_obj.outerWidth(),
								max_top=$out_scope.height()-$cur_drag_obj.outerHeight();
							if(tar_left>max_left)
							{
								tar_left=max_left;
							}
							if(tar_top>max_top)
							{
								tar_top=max_top;
							}
						}
					}
					$cur_drag_obj.css({
						left:tar_left,
						top:tar_top
					})
					options.on_drag($cur_drag_obj);
				}
			})
		})
		return $(this);
	},
	/*
	 * demo:
	 * $("#link_div").set_pop_layer({
		$open_handle:$('.icon_sw_link'),
		$outest_div:$('#sx_textarea')
	})
	 */
	set_pop_layer:function(options)
	{
		//129 212
		var $thi=$(this).css({
			position:"absolute"
		}).addClass("dbx_pop_layer");
		$('body').css({
			position:"relative"
		})
		var defaults={
			$open_handle:null,//pop层打开触发者
			$close_handle:$thi.find($('.fz_close')),//pop层关闭触发者（默认为pop右上角的x）
			show_direction:"bottom",//pop层位置（默认在打开触发者正下方）
			$outest_div:$('body'),//最外层父容器，以保证pop层完全显示在可视范围内
			space_click_close:false,//是否点击空白处关闭
			need_class:null//被点击的元素需要具备改样式才能打开pop_layer
		};
		var options=$.extend(defaults,options);
		// if(options.space_click_close==true)
		// {
			// $(document).click(function(e)
			// {
				// var e=e?e:window.event;
				// var $tar=$(e.srcElement||e.target);
				// if(!$tar.hasClass("pop_layer_click_handle")&&!$tar.hasClass("pop_layer_elements"))
				// {
					// $thi.hide();
				// }
			// })
		// }

		var $click_handle=options.$open_handle;
		if(options.space_click_close==true)
		{
			//$click_handle.add($click_handle.find($('*'))).addClass("pop_layer_click_handle");
			//$thi.add($thi.find($('*'))).not(options.$close_handle).addClass("pop_layer_elements")
		}
		$click_handle.live("click",function(e)
		{
			if(options.need_class==null||$click_handle.hasClass(options.need_class))
			{
				$('.dbx_pop_layer').not($thi).hide();
				var $handle=$(this),
					handle_pos=$handle.offset(),
					outest_div_pos=options.$outest_div.offset(),
					tar_top,
					tar_left;
				switch(options.show_direction)
				{
					case "bottom":
					{
						tar_top=handle_pos.top+$handle.height()+10;
						tar_left=handle_pos.left-($thi.width()/2)+($handle.width()/2);
						if(tar_left<outest_div_pos.left)
						{
							tar_left=outest_div_pos.left;
						}
						break;
					}
				}
				$thi.css({
					top:tar_top+"px",
					left:tar_left+"px"
				})
				$thi.show();
				//$thi.css("display")=="none"?$thi.show():$thi.hide();
			}
		})
		options.$close_handle.click(function()
		{
			$thi.hide();
		})
	},
	loading_img_before_request:function(options)
	{
		var defaults={
			src:"",//默认loading图片的src
			use_id:"loading_img",//使用id作为loading图片的唯一标示，避免找对象出错
			bg_opacity:0.5//北京层透明度
		}
		var options=$.extend(defaults,options);
		var $thi=$(this);
		var $out;
		if(!$thi.css("position")||$thi.css("position")=="static")
		{
			$thi.css({
				position:"relative"
			})
		}
		if($thi.find($('#'+options.use_id)).size()==0)
		{
			$out=$("<div>")
				.css({
					width:"100%",
					height:"100%",
					background:"black",
					opacity:options.bg_opacity,
					position:"absolute",
					left:"0",
					top:"0",
					zIndex:"1000"
				})
				.attr({
					id:options.use_id
				})
				.addClass("pop_layer_elements")
				.appendTo($thi);
			if(options.src!=""){
				var img=new Image();
				img.onload=function()
				{
					$("<img>")
						.attr({
							src:img.src
						})
						.addClass("pop_layer_elements")
						.css({
							display:"block",
							position:"absolute",
							left:"50%",
							top:"50%",
							marginLeft:(-img.width/2)+"px",
							marginTop:(-img.height/2)+"px"
						}).appendTo($out)
						
				}
				img.src=options.src;
			}
		}
		else
		{
			$out=$thi.find($('#'+options.use_id));
		}
		$out.show();
		return $out;
	},
	placeholder:function(options){
		 var defaults = {
            pColor: "#333",
            pActive: "#999",
            pFont: "14px",
            activeBorder: "#080",
            posL: 8,
            zIndex: "2"
        },
        opts = $.extend(defaults, options);
        return this.each(function () {
            if ("placeholder" in document.createElement("input")) return;
            $(this).parent().css("position", "relative");
            var isIE = $.browser.msie,
            version = $.browser.version;
            //不支持placeholder的浏览器
            var $this = $(this),
                msg = $this.attr("placeholder"),
                iH = $this.outerHeight(),
                iW = $this.outerWidth(),
                iX = $this.position().left,
                iY = $this.position().top,
                oInput = $("<label>", {
                "class": "test",
                "text": msg,
                "css": {
                    "position": "absolute",
                    "left": iX + "px",
                    "top": iY + "px",
                    "width": iW - opts.posL + "px",
                    "padding-left": opts.posL + "px",
                    "height": iH + "px",
                    "line-height": iH + "px",
                    "color": opts.pColor,
                    "font-size": opts.pFont,
                    "z-index": opts.zIndex,
                    "cursor": "text"
                }
                }).insertBefore($this);
            //初始状态就有内容
            var value = $this.val();
            if (value.length > 0) {
            oInput.hide();
            };
 
            //
            $this.on("focus", function () {
                var value = $(this).val();
                if (value.length > 0) {
                    oInput.hide();
                }
                oInput.css("color", opts.pActive);
                //
 
                if(isIE && version < 9){
                    var myEvent = "propertychange";
                }else{
                    var myEvent = "input";
                }
 
                $(this).on(myEvent, function () {
                    var value = $(this).val();
                    if (value.length == 0) {
                        oInput.show();
                    } else {
                        oInput.hide();
                    }
                });
 
            }).on("blur", function () {
                var value = $(this).val();
                if (value.length == 0) {
                    oInput.css("color", opts.pColor).show();
                }
            });
            //
            oInput.on("click", function () {
                $this.trigger("focus");
                $(this).css("color", opts.pActive)
            });
            //
            $this.filter(":focus").trigger("focus");
        });
	},
	dbx_mouseenter_show_and_hide:function(options){
			/*
			 * options demo:
			 * $objs:$ul.children(),
				$shows:function(){
					return $(this).find(".Img");
				},
				$hides:function(){
					return $(this).siblings();
				},
				on_mouseenter:function(){
					$ul.find(".Hover").removeClass("Hover");
					$(this).addClass("Hover");
				}
			 */
			options.$objs.each(function(){
				$(this).bind("mouseenter",function(){
					var $show=options.$shows.call(this);
					$show.show();
					var $hide=options.$hides.call(this);
					$hide.hide();
					options.on_mouseenter.call(this);
				})
			})
			
			
			
			return $(this);
		},
		dbx_fade_slide:function(options){
				options=$.extend({
					change_interval:3000,//淡入淡出间隔
					fade_interval:1000,//幻灯片更换间隔
					half_transparent:false
				},options)
				var $thi=$(this);
				var $childs=$thi.css({
					position:"relative"
				})
				.children()
				.css({
					position:"absolute",
					left:"0",
					top:"0"
				})
				.hide();
				$childs
					.first()
					.show();
				
				var index=0,
					len=$childs.size();
				var change=function(jia_or_jian){
					var $last=$childs.eq(index);
					index=jia_or_jian==1?(index+1):(index-1);
					if(index==len){
						index=0;
					}
					if(index==-1){
						index=len-1;
					}
					var $now=$childs.eq(index);
					$last.stop().fadeOut(options.fade_interval);
					$now.stop().fadeIn(options.fade_interval);
				}
				setInterval(function(){
					change(1);
				},options.change_interval);
				
				var common_css={
					width:"31px",
						height:"51px",
						position:"absolute",
						top:"50%",
						marginTop:"-28px",
						overflow:"hidden",
						cursor:"pointer"
				}
				var $prev=$("<div>")
					.appendTo($thi)
					.css(common_css)
					.css({
						left:"0",
						background:"orange"
					})
					.click(function(){
						change(-1);
					})
					
				var $next=$("<div>")
					.appendTo($thi)
					.css(common_css)
					.css({
						right:"0",
						background:"orange"
					})
					.click(function(){
						change(1);
					})
				if(options.half_transparent==true){
					$prev.add($next)
					.css({
						opacity:"0.5"
					})
					.hover(function(){
						$(this).css({
							opacity:"1"
						})
					},function(){
						$(this).css({
							opacity:"0.5"
						})
					})
				}
				
				return {
					$prev:$prev,
					$next:$next
				}
			},
			//原理：改变$items_outer_div的left
			/*
			 * 前提：
			 * 视口中不能显示半张图片
			 * demo:
			 * var $inner=$("#inner_div");
					$inner.dbx_scroll_slide({
						$items:$inner.children(),//图片元素集合
						viewport_width:$inner.parent().width(),//可视范围的宽度
						per_viewport_img_nums:1,//单一适口图片显示张数
						$prev_viewport_btn:$("#btn1"),//上一个视口触发的按钮
						$next_viewport_btn:$("#btn2"),//下一个视口触发的按钮
						auto_scroll:true,
						scroll_interval:2000,
						anim_interval:500,
						hover_pause:true,//鼠标移入暂停定时器
						on_initial_end:function(){
							
						}//初始化完毕执行的回调函数
					})
			 */
			dbx_scroll_slide:function(options){
				var $thi=$(this);
				options=$.extend({
					$items:null,//图片元素集合
					viewport_width:$thi.parent().width(),//可视范围的宽度
					per_viewport_img_nums:4,//单一适口图片显示张数
					$prev_viewport_btn:null,//上一个视口触发的按钮
					$next_viewport_btn:null,//下一个视口触发的按钮
					auto_scroll:true,
					scroll_interval:3000,
					anim_interval:500,
					hover_pause:true,//鼠标移入暂停定时器
					on_initial_end:function(){
						
					}//初始化完毕执行的回调函数
				},options);
					/*
			 * 计算公式：
			 * 总张数=单一适口图片显示张数  和   需要显示的图片总张数  的最小公倍数+2*单一适口图片显示张数
			 */
				var per_viewport_img_nums=options.per_viewport_img_nums,//单一适口图片显示张数
					$items=options.$items,
					viewport_width=options.viewport_width,
					total_img_nums=options.$items.size();//需要显示的图片总张数
				var get_zxgbs=function(x,y){//获取最小公倍数
					
					var gcd=function(){
						var m, n, t ;
						if(x > y)
						{
						m = x ;
						n = y ;
						}
						else
						{
						m = y ;
						n = x ;
						}
						
						while(m % n != 0)
						{
						t = n ;
						n = m % n ;
						m = t ;
						}
						
						return n ;
					}
					return x*y/gcd(x,y);
				}
				
				var zxgbs=get_zxgbs(per_viewport_img_nums,total_img_nums);//最小公倍数
				var now_added_img_index=0;
				for(var i=0;i<zxgbs+per_viewport_img_nums-total_img_nums;i++){
					$items.eq(now_added_img_index)
					.attr({
						dbx_index:now_added_img_index
					})
					.clone()
					.attr({
						dbx_index:now_added_img_index
					})
					.appendTo($thi);
					now_added_img_index++;
					if(now_added_img_index==total_img_nums){
						now_added_img_index=0;
					}
				}
//				var $last_viewport_imgs=$items.slice(total_img_nums-per_viewport_img_nums);//最后一个视口的几张图片
				var $items_new=$items.first().parent().children();
				var size=$items_new.size();
				var $last_viewport_imgs=$items_new.slice(size-(per_viewport_img_nums*2),size-per_viewport_img_nums);//最后一个视口的几张图片
				for(var len=$last_viewport_imgs.size(),i=len-1;i>=0;i--)
				{
					$last_viewport_imgs.eq(i).clone()
					.attr({
						dbx_index:total_img_nums-(options.per_viewport_img_nums-i)
					})
					.prependTo($thi);
				}
				$thi.css({
					width:"100000px",
					position:$thi.css("position")=="static"?"relative":($thi.css("position"))
				})
				
				var allow_click=1;//是否允许点击按钮切换视口，在动画执行过程中通过修改改属性禁止点击
				var how_many_viewport=zxgbs/per_viewport_img_nums;//需要多少个视口才能平铺完整（即最小公倍数/单一视口图片个数）
				var cur_view_port_index=1;//当前所处viewport的索引
				//计算margin
				var margin=viewport_width-(per_viewport_img_nums*$items.first().outerWidth());
				var margin_right=parseInt(margin/per_viewport_img_nums);
				$thi.children().css({
					marginRight:margin_right+"px"
				})
				$thi
					.css({
						left:-viewport_width+"px"
					})
				$thi.parent().css({
					overflow:"hidden",
					position:"relative"
				})
				var last_item_margin_right=viewport_width-(per_viewport_img_nums*(margin_right+$items.first().outerWidth()))+margin_right;
				$thi.children().each(function(k){
					if((k+1)%per_viewport_img_nums==0){
						$(this).css({
							marginRight:last_item_margin_right+"px"
						})
					}
				})
				var if_should_stop_clock=false;//是否应该停止时钟
				var clock;//定时器
				var cmds={
					change:function(direction){//1表示右边按钮被点击，否则表示左边按钮被点击
						allow_click=0;
						var step=direction==1?1:-1;
						cur_view_port_index=cur_view_port_index+step;
						$thi.stop().animate({
							left:-viewport_width*cur_view_port_index+"px"
						},options.anim_interval,function(){
							if(how_many_viewport+1==cur_view_port_index){
								cur_view_port_index=1;
								$thi.css({
									left:-viewport_width+"px"
								})
							}
							if(0==cur_view_port_index){
								cur_view_port_index=how_many_viewport;
								$thi.css({
									left:-viewport_width*cur_view_port_index+"px"
								})
							}
							allow_click=1;
							if(options.auto_scroll==true){
								clock=clearInterval(clock);
								if(if_should_stop_clock==false){
									clock=setInterval(function(){
										options.$next_viewport_btn.click();
									},options.scroll_interval);
								}
							}
						});
					}
					,get_index:function($obj){
						return parseInt($obj.attr("dbx_index"));
					}
					,get_prev_obj:function($obj){
						if($obj.index()==per_viewport_img_nums){
							var $childs=$obj.parent().children();
							return $childs.eq($childs.size()-per_viewport_img_nums-1);
						}
						else{
							return $obj.prev();
						}
					}
					,get_next_obj:function($obj){
						var $childs=$obj.parent().children();
						if($obj.index()==$childs.size()-per_viewport_img_nums-1){
							return per_viewport_img_nums;
						}
						else{
							return $obj.next();
						}
					}
				}
				options.$next_viewport_btn.click(function(){
					if(allow_click==1){
						cmds.change(1);
					}
				})
				options.$prev_viewport_btn.click(function(){
					if(allow_click==1){
						cmds.change(-1);
					}
				})
				if(options.auto_scroll==true){
					$thi.hover(function(){
						if_should_stop_clock=true;
					},function(){
						if_should_stop_clock=false;
					})
				}
				if(options.auto_scroll==true){
					clock=setInterval(function(){
						options.$next_viewport_btn.click();
					},options.scroll_interval);
				}
				options.on_initial_end($thi.children(),cmds);
				
				
				return cmds;
			}
			,dbx_set_abs_pos:function(options){
				options=$.extend({
					$obj:null,
					x_pian_yi:0,
					y_pian_yi:0
				},options);
				var $thi=$(this);
				var set_pos=function(){
					var offset=options.$obj.offset();
					$thi.css({
						left:offset.left+options.x_pian_yi+"px",
						top:offset.top+options.y_pian_yi+"px",
						zIndex:"10000"
					})
				}
				$thi.css({
					position:"absolute"
				}).appendTo($("body").css("position","relative"));
				set_pos();
				$(window).bind("resize",function(){
					set_pos();
				})
				return {
					set_pos:set_pos
				}
			}
			,replace_with_div:function(options){
				//$("#intro_text").niceScroll({cursorborder:"",cursorcolor:"#999",boxzoom:true});
				var $thi=$(this);
				options=$.extend({
					on_expand:function(){
						
					},
					on_close:function(){
						
					},
					auto_set_menu_width:false,//自动计算menu的宽度
					width:238,
					height:30,
					extend_max_height:200,
					use_two_status_arraw:false,
					borderRadius:3,
					padding:"0 5px",
					border:"solid 1px #DDD",
					//border:"none",
					float:"left",
					option_height:30,
					option_width:238,
					option_hover_bg_color:"rgb(30,144,255)",
					arrow_down_bg:"red"
				},options);
				if($thi.get(0).nodeName.toLowerCase()!="select"){
					return $thi;
				}
				// var expand=false;
				var offset=$thi.offset();
				var $div=$("<div>");
				$div.insertAfter($thi);
				$div.css({
					width:options.width+"px",
					height:options.height+"px",
					borderRadius:options.borderRadius+"px",
					border:options.border,
					lineHeight:options.height+"px",
					padding:options.padding,
					float:options.float,
					position:"relative",
					background:"white",
					marginRight:"10px",
					zIndex:"1000000"
				})
				.addClass("dbx_select");
				var $title=$("<div>")
					.attr("expand",false)
					.appendTo($div)
					.addClass("dbx_select_title")
					.css({
						width:options.width+"px",
						padding:options.padding,
						height:options.height+"px",
						position:"absolute",
						left:"0",
						top:"0"
					});
				
					var html;
				$thi.children().each(function(){
					if($(this).attr("selected")=="selected"){
						html=$(this).html();
						return false;
					}
				})
				$title.html("<b style='font-weight:normal;'>"+html+"</b>");
				var $arrow=$("<div>")
					.css({
						width:"11px",
						height:"6px",
						 background:options.arrow_down_bg+" no-repeat",
						position:"absolute",
						right:"10px",
						top:options.height/2-3+"px",
						zIndex:"100"
					})
					.appendTo($title);
				var $menu=$("<div>")
					.appendTo($div)
					.css({
						position:"absolute",
						left:"-1px",
						top:options.height+"px",
						 display:"none",
						overflowY:"scroll",
						overflowX:options.auto_set_menu_width==false?"hidden":"scroll",
						background:"white",
						border:options.border,
						borderTop:"none",
						borderBottomLeftRadius:options.borderRadius+"px",
						borderBottomRightRadius:options.borderRadius+"px"
					})
				var $childs=$thi.children(),len=$childs.size();
				var padding_left=parseInt($div.css("paddingLeft"));
				//$title.heml($thi.find("option[selected]").html());
				$menu.css({
					width:options.auto_set_menu_width==true?(options.width+(2*padding_left)+"px"):(options.option_width+"px"),
					height:options.extend_max_height<(len*options.option_height)?(options.extend_max_height+"px"):(len*options.option_height+"px")
				})
				var menu_height=$menu.height(),div_height=$div.height();
				for(var i=0;i<len;i++)
				{
					$("<div>").html($childs.eq(i).html())
					.attr("value",$thi.children().eq(i).attr("value"))
					.css({
						height:options.option_height+"px",
						width:options.option_width+"px",
						lineHeight:options.option_height+"px",
						padding:options.padding
					})
					.click(function(){
						var index=$(this).index();
						$title.find("b").html($(this).html());
						$thi.children().eq(index).attr("selected","selected");
						$thi.trigger("change");
						$thi.val($(this).attr("value"));
					})
					.hover(function(){
						$(this).css({
							background:options.option_hover_bg_color
						})
					},function(){
						$(this).css({
							background:"none"
						})
					})
					.appendTo($menu)
				}
				

				$div.click(function(){
					$(".dbx_select_title").not($(this).find(".dbx_select_title")).each(function(){
						if($(this).attr("expand")=="true"){
							$(this).click();
						}
					})
					if($title.attr("expand")=="false"){
						$arrow.css({
							transform:"rotate(180deg)"
						})
						$menu.show();
						// expand=true;
						$title.attr("expand","true");
						$div.css({
							borderBottomLeftRadius:"0",
							borderBottomRightRadius:"0"
						})
						$title.css({
							height:options.height-1+"px",
							borderBottom:"solid #DDD 1px"
						})
						options.on_expand();
					}
					else
					{
						$arrow.css({
							transform:"rotate(0deg)"
						})
						options.on_close();
						$menu.hide();
						// expand=false;
						$title.attr("expand","false");
						$div.css({
							borderBottomLeftRadius:options.borderRadius+"px",
							borderBottomRightRadius:options.borderRadius+"px"
						});
						$title.css({
							height:options.height+"px",
							borderBottom:"none"
						})
					}
				})
				$("body").click(function(e){
					var e=e?e:window.event;
					var tar=e.srcElement||e.target;
					if($(tar).closest(".dbx_select_title").size()==0){
						$arrow.css({
							transform:"rotate(0deg)"
						})
						options.on_close();
						$menu.hide();
						// expand=false;
						$title.attr("expand","false");
						$div.css({
							borderBottomLeftRadius:options.borderRadius+"px",
							borderBottomRightRadius:options.borderRadius+"px"
						});
						$title.css({
							height:options.height+"px",
							borderBottom:"none"
						})
					}
				})
				
				$thi.hide();
				// $.getScript(config.script_path+"jquery.nicescroll.min.js",function(){
					// $menu.niceScroll({cursorborder:"",cursorcolor:"#999",boxzoom:true});
				// })
				return $div;
			}
			,replace_checkbox:function(){
				var $thi=$(this);
				var checked=$(this).attr("checked");
				var $span=$("<span>")
					.addClass("dbx_checkbox")
					.insertBefore($(this).hide())
					.css({
						border:"solid red 1px",
						width:"22px",
						height:"22px",
						padding:"0",
						lineHeight:"22px",
						border:"solid 1px #b2b2b2",
						textAlign:"center",
						fontWeight:"bolder",
						cursor:"pointer"
					})
					.click(function(){
						if($(this).html()!=""){
							$(this).html("");
							$thi.attr("checked",false);
							$thi.trigger("change")
						}else{
							$(this).html("√");
								$thi.attr("checked","checked");
								$thi.trigger("change")
							}
					})
				if(checked!=undefined){
					$span.html("√")
				}
				return $span;
			}
			,replace_radio:function(){
				var $thi=$(this);
				var $span=$(this).replace_checkbox();
				$span.click(function(){
					var name=$thi.attr("name");
					var $radios=$(":radio[name="+name+"]");
						if(!$thi.attr("checked")){
							$thi.attr("checked","checked");
							$span.html("√");
						}
					$radios.not($thi).each(function(){
							var $s=$(this).prev();
							var $r=$(this);
							$s.html("");
							$r.attr("checked",false);
						})
				})
				return $span;
			}
			,hover_scale:function(options)
			{
				var defaults={
					scale:1.2,
					duration:200
				};
				var options=$.extend(defaults,options);
				if($(this).attr("default_width")==undefined)
				{
					var default_w=$(this).width();
					var default_h=$(this).height();
					var default_l=$(this).position().left;
					var default_t=$(this).position().top;
					var default_font_size=parseInt($(this).css("font-size"));
					$(this).attr("default_width",default_w);
					$(this).attr("default_height",default_h);
					$(this).attr("default_left",default_l);
					$(this).attr("default_top",default_t);
					$(this).attr("default_font_size",default_font_size);
				}
				var target_w=options.scale*$(this).attr("default_width");
				var target_h=options.scale*$(this).attr("default_height");
				var target_l=$(this).attr("default_left")-(target_w-$(this).attr("default_width"))/2;
				var target_t=$(this).attr("default_top")-(target_h-$(this).attr("default_height"))/2;
				var target_font_size=options.scale*$(this).attr("default_font_size");
				$(this).hover(function()
				{
					$(this).stop().animate({
						width:target_w+"px",
						height:target_h+"px",
						lineHeight:target_h+"px",
						left:target_l+"px",
						top:target_t+"px",
						fontSize:target_font_size
					},options.duration);
				},function()
				{
					$(this).stop().animate({
						width:$(this).attr("default_width")+"px",
						height:$(this).attr("default_height")+"px",
						lineHeight:$(this).attr("default_height")+"px",
						left:$(this).attr("default_left")+"px",
						top:$(this).attr("default_top")+"px",
						fontSize:$(this).attr("default_font_size")+"px"
					},options.duration);
				})
				return $(this);
			}
			,img_cur:function(options){
				options=$.extend({
					left_cur_img:"",
					right_cur_img:"",
					w:32,
					h:32,
					cur_img_class:"dbx_cur_img",
					click_left:function(){
						
					},
					click_right:function(){
						
					}
				},options);
				var direction;//分left和right用于区别点击事件
				var $img=$("<div>").appendTo($("body").css("position","relative")).hide()
					.addClass(options.cur_img_class)
					.css({
						position:"absolute",
						width:options.w+"px",
						height:options.h+"px",
						cursor:"none",
						zIndex:"9999"
					});
				var $thi=$(this);
				$("body").mousemove(function(e){
					var w=$thi.width();
					var h=$thi.height();
					e=e?e:window.event;
					var cur_pageX=e.pageX;
					var a=cur_pageX-parseInt($thi.data("left_oft"));
					var b=e.pageY-parseInt($thi.data("top_oft"));
					if(a<=0||b<=0||a>=w||b>=h){
						$img.hide();
					}
				})
				$thi.mouseenter(function(){
					$thi.data({
								left_oft:$thi.offset().left,
								top_oft:$thi.offset().top
							})
				})
				$(window).resize(function(){
					$thi.data({
								left_oft:$thi.offset().left,
								top_oft:$thi.offset().top
							})
				})
				$thi.css({
					cursor:"none"
				})
				.data({
								left_oft:$thi.offset().left,
								top_oft:$thi.offset().top
							})
				.mouseenter(function(){
					$img.show().css({
						background:"url("+options.left_cur_img+")"
					});
				})
				.add($img).bind("mousemove",function(e){
					var w=$thi.width();
					var h=$thi.height();
					e=e?e:window.event;
					var cur_pageX=e.pageX;
					var a=cur_pageX-parseInt($thi.data("left_oft"));
					var b=e.pageY-parseInt($thi.data("top_oft"));
					if(a<=0||b<=0||a>=w||b>=h){
						// $img.hide();
					}else{
						$img
						.css({
							left:e.pageX-options.w/2+"px",
							top:e.pageY-options.w/2+"px",
							cursor:"none",
							display:"block"
						})
						$img.show();
						if(a>w/2){
							$img.css({
								background:"url("+options.right_cur_img+") center no-repeat"
							});
							direction="right";
						}else{
							$img.css({
								background:"url("+options.left_cur_img+") center no-repeat"
							});
							direction="left";
						}
					}
					$(this).css({
						cursor:"none"
					})
				})
				.click(function(e){
					if(direction=="left"){
						options.click_left.call($thi.get(0),direction);
					}else{
						options.click_right.call($thi.get(0),direction);
					}
					return false;
				})
			}
			,close_when_click_white:function(options){
				options=$.extend({
					$expect:null,
					on_close:function(){
						
					}
				},options)
				$(this).each(function(){
					var $thi=$(this);
					$("body").click(function(e){
						var e=e?e:window.event;
						var tar=e.srcElement||e.target;
						if(options.$expect==null){
							if($(tar).closest($thi).size()==0){
								$thi.slideUp("fast");
								options.on_close();
							}
						}
						else{
							if($(tar).closest($thi).size()==0&&$(tar).closest(options.$expect).size()==0){
								$thi.slideUp("fast");
								options.on_close();
							}
						}
					})
				})
				return $(this);
			}
			,form_check:function(options){
				if(typeof(options)=="undefined"){
					return false;
				}
				options=$.extend({
					reg:null,
					min:0,
					max:null,
					null_value:"",//用户没有任何输入的提示
					chong_fu:"",//重复
					format_error:"",//格式错误
					url:"",
					async:false,
					data:function(){
						return {};
					},
					success:function(){
						
					},
					lt_min:"",//长度不足
					gt_max:"",//长度过长
					$reference:null,
					re_pwd_err:"两次密码不一致哦",
					x_pian_yi:10,
					y_pian_yi:0,
					use_class:"dbx_input_error"
				},options);
				
				var $thi=$(this);
				var $div=$("<div>")
					.hide().appendTo($thi.closest("li"))
					.addClass(options.use_class)
					.css({
						// height:height,
						color:"red",
						height:"20px",
						lineHeight:"20px",
						marginTop:"10px",
						//lineHeight:$thi.outerHeight()+"px",
						zIndex:"99",
						paddingLeft:$thi.offset().left-$thi.closest("li").offset().left
					});
					// $div.dbx_set_abs_pos({
						// $obj:$thi,
						// y_pian_yi:options.y_pian_yi,
						// x_pian_yi:$thi.outerWidth()+options.x_pian_yi
					// })
				var err_msg;
				$thi.focus(function(){
					$div.hide();
				}).blur(function(){
					var v=options;
					var thi=this;
						var val=$(this).val(),vlen=val.length;
						if(v.null_value!=""&&$.trim(val)==""){
							err_msg=v.null_value;
						}
						else if(v.$reference&&val!=v.$reference.val()){
							err_msg=v.re_pwd_err;
						}
						else if(v.min&&vlen<v.min){
							err_msg=v.lt_min!=""?v.lt_min:v.format_error;
						}//v.max
						else if(v.max!=null){
							var the_len,max;
							if($.isFunction(v.max)){
								var html=v.max();
								var index=html.indexOf("/");
								the_len=parseInt(html.substring(0,index));
								if(the_len<0){
									err_msg=v.gt_max!=""?v.gt_max:v.format_error;
								}else{
									err_msg="";
								}
							}else{
								the_len=vlen;
								max=v.max;
								if(the_len>max){
									err_msg=v.gt_max!=""?v.gt_max:v.format_error;
								}else{
									err_msg="";
								}
							}
							
						}
						else if(v.reg&&!v.reg.test(val)){
							err_msg=v.format_error;
						}
						else if(v.url!=""){
							$.ajax({
								type:"post",
								url:v.url,
								data:v.data.call(thi),
								async:false,
								success:v.success(msg,status)
							})
						}
						else{
							err_msg="";
						}
						if(err_msg!=""){
							$div.html(err_msg).css({
								width:12*err_msg.length+40+"px"
							}).show();
						}
					})
				
				
				
				return $(this);
			}
})




































//jquery.tooltips.js

/*-------------------------------------------------------------------------------
	A Better jQuery Tooltip
	Version 1.0
	By Jon Cazier
	jon@3nhanced.com
	01.22.08
-------------------------------------------------------------------------------*/

$.fn.betterTooltip = function(options){
	/* Setup the options for the tooltip that can be 
	   accessed from outside the plugin              */
	var defaults = {
		speed: 200,
		delay: 300
	};
	
	var options = $.extend(defaults, options);
	
	/* Create a function that builds the tooltip 
	   markup. Then, prepend the tooltip to the body */
	getTip = function() {
		var tTip = 
			"<div class='tip'>" +
				"<div class='tipMid'>"	+
				"</div>" +
				"<div class='tipBtm'></div>" +
			"</div>";
		return tTip;
	}
	var tip=$(getTip()).appendTo($("body").css({
		position:"relative"
	}));
	var tipInner=tip.find(".tipMid");
	
	if($.browser.msie&&parseInt($.browser.version)==6){
		try{
			//EvPNG.fix('div');  
		}
		catch(e){
			
		}
	}
	
	
	/* Give each item with the class associated with 
	   the plugin the ability to call the tooltip    */
	$(this).each(function(){
		var $this = $(this);
		
		var tTitle = (this.title);
		this.title = "";
		
		var offset = $(this).offset();
		var tLeft = offset.left;
		var tTop = offset.top;
		var tWidth = $this.width();
		var tHeight = $this.height();
		/* Mouse over and out functions*/
		$this.siblings().each(function(){
			if(this.nodeName=="shape"){
				$(this).hover(function() {
					
					tipInner.html(tTitle);
					setTip(tTop, tLeft);
					setTimer();
				}, 
				function() {
					stopTimer();
					tip.hide();
				});		
			}
		})
		$this.hover(function() {
				tipInner.html(tTitle);
				setTip(tTop, tLeft);
				setTimer();
			}, 
			function() {
				stopTimer();
				tip.hide();
			});		   
		/* Delay the fade-in animation of the tooltip */
		setTimer = function() {
			$this.showTipTimer = setInterval("showTip()", defaults.delay);
		}
		
		stopTimer = function() {
			clearInterval($this.showTipTimer);
		}
		
		/* Position the tooltip relative to the class 
		   associated with the tooltip                */
		setTip = function(top, left){
			var topOffset = tip.height();
			var xTip = (left-30)+"px";
			var yTip = (top-topOffset-60)+"px";
			tip.css({'top' : yTip, 'left' : xTip});
		}
		
		/* This function stops the timer and creates the
		   fade-in animation                          */
		showTip = function(){
			stopTimer();
			tip.animate({"top": "+=20px", "opacity": "toggle"}, defaults.speed);
		}
	});
};