$(function(){
	//所有地区
	var $all_area_ul=$(".all_area_ul"),
		$all_area_a=$all_area_ul.prev()
			.css({
				border:"solid 1px transparent",
				width:"96px",
				background:"rgb(153,153,153) url("+config.img_path+"arraw_down_white.png) no-repeat 94px center"
			})
			.click(function(){
				if(!$all_area_ul.is(":visible")){
					$(this).css({
						borderColor:"#ff6d00",
						backgroundColor:"#ff6d00",
						color:"#ffffff"
					})
					$all_area_ul.slideDown("fast");
				}else{
					$(this).css({
						borderColor:"transparent",
						backgroundColor:"rgb(153,153,153)",
						color:"#333"
					})
					$all_area_ul.slideUp("fast");
				}
			})
	$all_area_ul
		.close_when_click_white({
			$expect:$all_area_a,
			on_close:function(){
				$all_area_a.css({
						borderColor:"transparent",
						backgroundColor:"rgb(153,153,153)",
						color:"#333"
					})
			}
		})
		.css({
			width:$all_area_a.outerWidth()+210,
			background:"white",
			border:"solid 1px #ff6d00"
		})
		.appendTo($("body").css("position","relative"))
		.dbx_set_abs_pos({
			$obj:$all_area_a,
			y_pian_yi:$all_area_a.outerHeight()-1
		});
	$all_area_ul
	.children()
	.first()
	.css({
		width:"90%",
		marginLeft:"5%",
		height:"36px",
		lineHeight:"36px",
		borderBottom:"solid 1px #ddd"
	})
	.children()
	.css({
		color:"#333"
	})
	.first()
	.css({
		float:"left"
	})
	.next()
	.css({
		float:"right",
		marginRight:"30px"
	})
	.parent()
	.find("span")
	.css({
		color:"#666"
	});
	
	
	$all_area_ul
	.children()
	.first()
	.nextAll()
	.css({
		width:"23%",
		marginLeft:"2%",
		cursor:"pointer",
		color:"#666",
		float:"left",
		height:"36px",
		lineHeight:"36px"
	}).hover(function(){
		$(this).css({
			textDecoration:"underline"
		})
	},function(){
		$(this).css({
			textDecoration:"none"
		})
	})
	
	$("<span>")
		.appendTo($all_area_ul)
		.html("X")
		.css({
			height:"24px",
			lineHeight:"24px",
			width:"24px",
			position:"absolute",
			right:"15px",
			top:"6px",
			background:"rgb(255, 109, 0)",
			cursor:"pointer",
			textAlign:"center",
						color:"#ffffff"
		})
		.click(function(){
			$all_area_a.css({
						borderColor:"transparent",
						backgroundColor:"rgb(153,153,153)",
						color:"#333"
					})
					$all_area_ul.slideUp("fast");
		})
	
	
	
	
	
	
	
	
	
	
	//所有用户
	var $all_people_ul=$(".all_people_ul"),
		$all_people_a=$all_people_ul.prev()
			.css({
				border:"solid 1px transparent",
				width:"96px",
				background:"rgb(153,153,153) url("+config.img_path+"arraw_down_white.png) no-repeat 94px center"
			})
			
			// .hover(function(){
				// $(this).css({
					// borderColor:"#ff6d00",
					// backgroundColor:"#ff6d00"
				// })
			// },function(){
				// $(this).css({
					// borderColor:"transparent",
					// backgroundColor:"rgb(153,153,153)"
				// })
			// })
			.click(function(){
				if(!$all_people_ul.is(":visible")){
					$(this).css({
						borderColor:"#ff6d00",
						backgroundColor:"#ff6d00",
						color:"#ffffff"
					})
					$all_people_ul.slideDown("fast");
				}else{
					$(this).css({
						borderColor:"transparent",
						backgroundColor:"rgb(153,153,153)",
						color:"#333"
					})
					$all_people_ul.slideUp("fast");
				}
				//$all_people_ul.is(":visible")?$all_people_ul.slideUp("fast"):$all_people_ul.slideDown("fast");
			})
	$all_people_ul
		.close_when_click_white({
			$expect:$all_people_a,
			on_close:function(){
				$all_people_a.css({
						borderColor:"transparent",
						backgroundColor:"rgb(153,153,153)",
						color:"#333"
					})
			}
		})
		.css({
			width:$all_people_a.outerWidth()-2,
			background:"white",
			border:"solid 1px #ff6d00",
			borderTop:"none"
		})
		.appendTo($("body").css("position","relative"))
		.dbx_set_abs_pos({
			$obj:$all_people_a,
			y_pian_yi:$all_people_a.outerHeight()-1
		});
	$all_people_ul.children().css({
		height:"36px",
		lineHeight:"36px",
		cursor:"pointer",
		paddingLeft:"10px"
	})
	.hover(function(){
		$(this).css({
			background:"rgb(238,238,238)",
			textDecoration:"underline"
		})
	},function(){
		$(this).css({
			background:"none",
			textDecoration:"none"
		})
	})
})
