$(function(){
	//取消关注
	$(".result_gz").delegate(".gray","click",function(){
		var $obj=$(this).closest(".result_list");
		$.ajax({
			url:"",
			success:function(){
				//假设修改成功
				if(1==1){
					$obj.slideUp("fast",function(){
						$obj.remove();
					})
				}
			}
		})
		return false;
	})
	$(".result_list").each(function(){
		var $spans=$(this).find(".gz span");
		$.each(["被关注次数","粉丝数","我的收藏"],function(k,v){
			var $t=$spans.eq(k);
			if(!$t.attr("title")){
				$t.attr("title",v);
			}
		})
	})
})
