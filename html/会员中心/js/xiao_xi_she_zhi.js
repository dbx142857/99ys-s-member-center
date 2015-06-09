$(function(){
	$(":radio").each(function(){
		var $thi=$(this);
		if(!$thi.attr("name")){
			var name=$thi.closest("li").find("span").first().html();
			name=name.substring(0,name.length-1);
			$thi.attr("name",name);
		}
		$(this).prev().css({
			marginTop:"17px"
		})
		$(this).next().css({
			width:"auto",
			marginRight:"30px"
		})
	})
	$(".cs").addClass("reset");
})
