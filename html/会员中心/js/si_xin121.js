$(function(){
	//文本域字数限制
	var $textarea=$("textarea").first();
	$(".fb span").html("<span>/300</span><span>0</span>");
	var refresh_tishi=$textarea.textarea_words_limit({
							$words_msg_ti_shi_obj:$(".fb span").find("span").last(),
							$fa_biao_button:$(".fb :button"),
							num_ti_shi_only:true,
							words_num_limit:300
					});
	//qq表情
	var $qq_face_a=$(".dialogue_con").find("a").first().css("cursor","pointer");
	var replace_str=$qq_face_a
					.qqFace({
						id : 'facebox', 
						assign:$textarea.attr("id","saytext").attr("id"), 
						path:config.img_path+'qq_face/',	//表情存放的路径
						on_insert_end:function(){
							refresh_tishi.refresh_tishi($textarea);
						}
					})
	$qq_face_a.click(function(){
		$("<i>")
			.appendTo($("#facebox"))
								.css({
									display: "block",
									position: "absolute",
									width: "9px",
									height: "6px",
									background: "url("+config.img_path+"sj_01.png) no-repeat center",
									top: "-6px",
									left: "8px",
									overflow: "hidden",
									lineHeight: "6px"
								})
								
		$("#facebox")
								.addClass("dbx_pop_layer")
								.css({
									background:"#eee",
									marginTop:"20px",
									borderColor:"#ddd"
								})
								.find("img")
								.css({
									borderColor:"#eee"
								})
								.hover(function(){
									$(this).css({
										borderColor:"purple"
									})
								},function(){
									$(this).css({
										borderColor:"#eee"
									})
								})
	})
})
