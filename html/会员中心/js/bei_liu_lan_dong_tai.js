
// $(function(){
	//焦点拍品幻灯片
	(function(){
		var index=0;
		var $left=$(".d_recommended_con .dbx_l_btn");
		var $right=$(".d_recommended_con .dbx_r_btn");
		var allow_anim=true;
		var $spans=$(".d_recommended_con .dbx_points span");
		var len=$spans.size();
		var $inner=$(".d_recommended_con .dbx_img_wrapper_inner");
		var w=$inner.parent().width();
		$left.click(function(){
			if(allow_anim==true){
				$spans.eq(index).removeClass("current");
				allow_anim=false;
				index--;
				if(index==-1){
					index=len-1;
				}
				$spans.eq(index).addClass("current");
				$inner.animate({
					left:-w*index+"px"
				},function(){
					allow_anim=true;
				})
			}
		})
		$right.click(function(){
			if(allow_anim==true){
				$spans.eq(index).removeClass("current");
				allow_anim=false;
				index++;
				if(index==len){
					index=0;
				}
				$spans.eq(index).addClass("current");
				$inner.animate({
					left:-w*index+"px"
				},function(){
					allow_anim=true;
				})
			}
		})
		setInterval(function(){
			$right.click();
		},3000);
	})();
// })
