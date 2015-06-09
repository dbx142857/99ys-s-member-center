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
       	.html("照片尺寸560X750以内，小于2M")
       	.appendTo($("body").css("position","relative"))
       	.css({
       		color:"#999"
       	})
       	.dbx_set_abs_pos({
       		$obj:$dbx_file_input,
       		x_pian_yi:160,
       		y_pian_yi:15
       	})
      //文本域字数限制
      var $textarea=$(".set_content textarea");
      $("<label style='line-height:12px;float:right;margin-right:106px;color:#999;'>0/2000</label>")
      	.insertAfter($textarea);
      $textarea.textarea_words_limit({
		$words_msg_ti_shi_obj:(function(){
			var html=$textarea.next().html();
			var limit=parseInt(html.substring(html.indexOf("/")+1));
			return $textarea.next().html("<label>0</label>/<label>"+limit+"</label>").find("label").first()
		})(),
		words_num_limit:parseInt($textarea.next().find("label").last().html()),
		num_ti_shi_only:true
	})	
	//文本域验证
	var str=$textarea.prev().html().substring(0,4);
	$textarea.form_check({
		null_value:"请输入"+str,
		max:function(){
			return $textarea.next().text()
		},
		gt_max:str+"过长(最多2000个字符)"
	})
})
