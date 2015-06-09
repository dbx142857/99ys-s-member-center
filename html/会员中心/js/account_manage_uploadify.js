$(function(){
	var $up_div=$("<div>")
		.appendTo($("body"))
		.css({
			width:"207px",
			height:"208px",
			background:"#999 url("+config.img_path+"vip.png) no-repeat center",
			cursor:"pointer"
		});
		$up_div.dbx_set_abs_pos({
			$obj:$(".set_content :text:first"),
			x_pian_yi:$(".set_content :text:first").outerWidth()+20
		});
	//var $up=$("<input id='dbx_file_input' type='file'>")
	// var $up=$("#dbx_file_input")
		// .appendTo($up_div);
	var $loading;
	$("<style>.uploadify-queue{width:0;height:0;overflow:hidden;}</style>").appendTo($("body"));
		$("#dbx_file_input").uploadify({
				                    'swf':config.upload_swf_path,
				                    'multi':true,
				                    "fileSizeLimit":"2MB",
				                    "width":"207",
				                    "height":"208",
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
										$up.css({
												opacity:"0.8"
											})
									},
									'onUploadSuccess':function(file,data,response){
										if(data.indexOf("类型不合法")!=-1){
											alert(data);
											$loading.remove();
										}else{
											var src=data.split("/");
											src="http://localhost/uploads/"+src[src.length-1];
											var img=new Image();
											img.onload=function(){
												$loading.remove();
												$("<img>")
													.css({
														display:"block",
														width:"100%",
														height:"100%"
													})
													.attr({
														src:src
													})
													.appendTo($up_div);
													$up.css({
														opacity:"0"
													})
											}
											img.src=src;
										}
									}
				                });	
	
	var $up=$("#dbx_file_input");
	$up.css({
			background:"black url("+config.img_path+"camera.png) no-repeat center",
			opacity:"0"
		})
	$up.dbx_set_abs_pos({
		$obj:$up_div
	})
	$up.mouseenter(function(){
		$up.css({
			opacity:"0.8"
		})
	})
	$up.mouseleave(function(){
		$up.css({
			opacity:"0"
		})
	})
})
