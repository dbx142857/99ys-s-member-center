$(function(){
	$("select").each(function(){
		$(this).replace_with_div({
			width:91,
			option_width:101,
			height:56,
			arrow_down_bg:"url("+config.img_path+"arraw_down.png"+")"
		});
	})
})
