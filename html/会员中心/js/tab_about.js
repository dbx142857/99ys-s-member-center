$(function(){
	$(".search_title .wrapper").each(function(){
		this.clock=1;
		var clock=this.clock;
		$(this).delegate("a","mouseenter",function(){
			var $thi=$(this);
			if($thi.data("del")){
				$thi.data("del").remove();
			}
			if($thi.data("rename")){
				$thi.data("rename").remove();
			}
			this.clock=clearTimeout(this.clock);
			if($(this).html()!="全部"){
				var common_css={
					width:"80px",
					height:"35px",
					textAlign:"center",
					color:"#fff",
					lineHeight:"35px",
					background:"#666",
					cursor:"pointer"
				}
				var $del=$("<div>")
				.appendTo($thi)
				.css(common_css)
				.html("删除")
				$del.dbx_set_abs_pos({
					$obj:$thi,
					y_pian_yi:$thi.outerHeight()
				});
				$del.click(function(){
					$.ajax({
						success:function(){
							if(confirm("确定删除这条收藏吗")){
								$thi.slideUp("slow");
								$thi.data("rename").slideUp("slow");
								$del.slideUp("slow",function(){
										$del.remove();
										var check_btns=$thi.closest(".wrapper").data("check_btns");
										check_btns();
								})
							}
						}
					})
				})
				var $rename=$("<div>")
					.appendTo($thi)
					.css(common_css)
					.html("改名")
					$rename.dbx_set_abs_pos({
						$obj:$thi,
						y_pian_yi:$thi.outerHeight()+40
					});
					$rename.click(function(){
						var $bg=$("<div>")
							.appendTo($("body"))
							.css({
								position:"fixed",
								width:"100%",
								height:"100%",
								background:"black",
								opacity:"0.9",
								left:"0",
								top:"0",
								zIndex:"10000"
							});
						$("<div>")
							.load(config.child_tpl_path+"collect.html",function(e){
								var $e=$(e)
									.appendTo($("body").css("position","relative"));
								$e.dbx_set_abs_pos({
									$obj:$thi.closest(".wrapper").parent()
								})
								$e.find(":text").attr("placeholder","输入你要修改的名字");
								$e.find(".arraw_left").remove();
								$e.find(".arraw_right").remove();
								$e.find(".xin_jian").remove();
								$e.find(".qu_xiao").click(function(){
									$e.remove();
									$bg.remove();
								})
								$e.find(".que_ding").click(function(){
									var val=$e.find(":text").val();
									if($.trim(val)==""){
										alert("新名字不能为空");
										return false;
									}
									//字数没有做出限制
									$.ajax({
										success:function(){
											$e.find(".qu_xiao").click();
											$thi.html(val);
											var check_btns=$thi.closest(".wrapper").data("check_btns");
										check_btns();
										}
									})
								})
							})
							
					})
				$del.add($rename).mouseenter(function(){
					var t=$(this).data("a").get(0);
					t.clock=clearTimeout(t.clock);
				}).mouseleave(function(){
					var t=$(this).data("a").get(0);
					t.clock=setTimeout(function(){
						var $del=$thi.data("del");
						var $rename=$thi.data("rename");
						$del.add($rename).remove();
					},200);
				})
				$thi.data("del",$del);
				$thi.data("rename",$rename);
				$del.add($rename).data("a",$thi);
			}
		})
		.delegate("a","mouseleave",function(){
			var $thi=$(this);
			var $del=$thi.data("del");
				var $rename=$thi.data("rename");
			this.clock=setTimeout(function(){
				$del.add($rename).remove();
			},200);
		})
	})
})
