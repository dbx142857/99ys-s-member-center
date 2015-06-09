$(function(){
	//上传图片
	var $up_li=$(".set_content li").eq(1);
	$up_li.next().css({
		marginTop:"90px"
	})
	var $span=$("<span style='width:140px;'></span>").appendTo($up_li);
	var $input=$("<input type='file' id='dbx_file_input'/>")
		.appendTo($span);
	$("<style>.uploadify-queue{width:0;height:0;overflow:hidden;}</style>").appendTo($("body"));
		var $loading;
		$("#dbx_file_input").uploadify({
            'swf':config.upload_swf_path,
            'multi':true,
            "fileSizeLimit":"2MB",
            "width":"140",
            "height":"50",
            // "fileTypeExts":["*.jpg","*.png"],
            'buttonText':'上&nbsp;&nbsp;传',
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
					var img=new Image();
					var src;
					var name;
					img.onload=function(){
						if($("#dbx_upload_pic").size()>0){
							$("#dbx_upload_pic").remove();
						}
						if($("#dbx_upload_pic_info").size()>0){
							$("#dbx_upload_pic_info").remove();
						}
						var w=this.width,
							h=this.height;
						if(w>200){
							w=200
						}
						if(h>200){
							h=200
						}
						var $img=$("<img>")
							.appendTo($("body"))
							.css({
								display:"block",
								zIndex:"999",
								width:w+"px",
								height:h+"px"
							})
							.hide()
							.attr({
								src:src,
								id:"dbx_upload_pic"
							});
							$img.dbx_set_abs_pos({
								$obj:$dbx_file_input,
					       		x_pian_yi:160,
					       		y_pian_yi:60
							})
							
						var $s=$("<span>")
						.html(name+"&nbsp;&nbsp;<a href='javascript:;'>删除</a>")
						.css({
							fontSize:"12px",
							color:"#ff6d00"
						})
						.attr({
							id:"dbx_upload_pic_info"
						})
						.hover(function(){
							$img.show();
						},function(){
							$img.hide();
						})
						.appendTo($("body"));
						$s.dbx_set_abs_pos({
					       		$obj:$dbx_file_input,
					       		x_pian_yi:160,
					       		y_pian_yi:35
					       	})
					$s.find("a")
					.css({
						color:"#ff6d00"
					})
					.hover(function(){
						$(this).css("text-decoration","underline");
					},function(){
						$(this).css("text-decoration","none");
					})
					.click(function(){
						$img.slideUp("fast",function(){
							$img.remove();
							$s.remove();
						})
					})
					
					
					}
					src=data.split("/");
					name=src[src.length-1];
					src="http://localhost/uploads/"+name;
					img.src=src;
				}
			}
        });	
        var $dbx_file_input=$("#dbx_file_input").css({
        	background:"#EEEBEB"
        });
        $(".uploadify-button-text")
        	.css({
	        	fontSize:"24px",
	        	fontFamily:"微软雅黑",
	        	fontWeight:"bolder",
	        	textAlign:"center",
	        	width:"140px",
	        	color:"#666"
	        })
        $("#SWFUpload_0")
	        .dbx_set_abs_pos({
	        	$obj:$dbx_file_input
	        })
    $("<span>")
       	.html("海报尺寸560X750以内，小于2M")
       	.appendTo($("body").css("position","relative"))
       	.css({
       		color:"#999"
       	})
       	.dbx_set_abs_pos({
       		$obj:$dbx_file_input,
       		x_pian_yi:160,
       		y_pian_yi:15
       	})
     //创作年代日历
     //加入并设置日历组件
	var $calendar_input=$(".set_content :text").eq(4).keydown(function(){return false;});
	$calendar_input.daterangepicker({
		on_data_click:function(){
			$calendar_input.focus();
		}
	});
	$calendar_input.one("click",function(){
		var $thi=$(this);
		$(".ui-daterangepicker-specificDate")
		//$(".ui-daterangepicker-dateRange")
			.click()
			.closest("ul").hide();
		$(".btnDone:first").click(function(){
			$(".ui-daterangepickercontain:first").slideUp("fast")
		})
		$(".ui-daterangepickercontain:first").css({
			top:$thi.offset().top+$thi.outerHeight()+"px"
		})
		.close_when_click_white({
			$expect:$calendar_input
		})
	})
	.click(function(){
		$(".ui-daterangepickercontain:first").slideDown("fast");
		$(".ui-daterangepicker-specificDate").click();
	})
	//提交按钮点击
	$(".an").children().last().click(function(){
		$(".set_content :text,.set_content textarea").blur();
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
	
	//表单验证
	var $inputs=$(".set_content :text");
	$.each((function(){
		var arr={};
		for(var i=0;i<$inputs.size();i++){
			arr[i]={};
		}
		return arr;
	})(),function(k,v){
		var $input=$inputs.eq(k);
		var html=$input.prev().html().substring(0,$input.prev().html().length-1);
		v={
			max:100,
			gt_max:html+"过长(最多100个字符)",
			reg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
			format_error:html+"格式错误（只允许字母数字下划线汉字）",
			null_value:"请输入"+html
		}
		$input.form_check(v);
	})
	
	//select美化
	$("select").each(function(){
		$(this).replace_with_div({
			width:340,
			option_width:350,
			height:56,
			arrow_down_bg:"url("+config.img_path+"arraw_down.png"+")"
		})
		.prev()
		.prev()
		.css({
			float:"left",
			marginTop:"20px"
		})
	})
	
})
