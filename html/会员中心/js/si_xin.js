$(function(){
	//点击删除私信
	$(".delate").live("click",function(){
		var $thi=$(this);
		$.ajax({
			url:"../../php/ajax_test.php",
			success:function(){
				//如果数据库记录删除成功
				if(1==1){
					var $personal_list=$thi.closest(".personal_list");
					$personal_list
					.css("min-height","0")
					.animate({
						height:"0"
					},function(){
						$personal_list.remove();
					})
				}else{
					alert("删除失败，请稍后再试");
				}
			}
		})
	})
})
