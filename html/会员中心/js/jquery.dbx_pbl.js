/*作品图片背景变色*/
var set_pbl_hov=function($item){
	$item.hover(function(){
			$(this).css('background','#333');
			$(this).find($('.pro_text p')).css('color','#fff');
			$(this).find("a").css({
				color:"#fff"
			});
		},function(){
			$(this).css('background','#eee');	
			$(this).find($('.pro_text p')).css('color','#333');
			$(this).find("a").css({
				color:"#333"
			});
		}).each(function(){
			$(this).find("a").hover(function(){
				$(this).css({
					color:"#ff6d00"
				})
			},function(){
				$(this).css({
					color:"#fff"
				})
			})
		})
}
$(function(){
	set_pbl_hov($('.pro_area'));
	})
;(function($) {
	$.fn.dbx_pbl = function(options) {
		var options = $.extend({
			item_cls : "item",
			// cmds_data_id:"waterflow",
			column_count : 3,
			addfooter : false,
			margin:6
		}, options), $thi = $(this), $items = $thi.find("." + options.item_cls), $first_item = $items.eq(0);
		var $kong_bai_divs = [];
		//底部的空白div
		$thi.css({
			position : $thi.css("position") == "static" ? "relative" : $thi.css("position")
			//,width : parseInt($first_item.css("margin")) + options.column_count * (parseInt($first_item.width()) + parseInt($first_item.css("padding")) * 2 + parseInt($first_item.css("margin")) + parseInt($first_item.css("borderWidth")) * 2) + "px"
		})
		var _box_width = $thi.width(), margin = options.margin, _owidth = $first_item.outerWidth() + margin,
		//所有可能的left值
		pos = (function() {
			var pos = [];
			for (var i = 0, cc = options.column_count; i < cc; i++) {
				pos.push([i * (_owidth+margin), 0]);
			}
			return pos;
		})(), cmds = {
			set_pos : function($item) {
				var _temp = 0, _height = $item.outerHeight() + margin;
				//遍历每一列
				for (var j = 0, cc = options.column_count; j < cc; j++) {
					if (pos[j][1] < pos[_temp][1]) {
						//暂存top值最小那列的index
						_temp = j;
					}
				}
				$item.animate({
					left : pos[_temp][0]+ "px",
					top : pos[_temp][1] + "px"
				})
				//定位完毕后，更新下该列的top值
				pos[_temp][1] += _height+options.margin;
				$thi.height(pos[_temp][1]);
			},
			re_render : function(column_count) {
				for (var i in $kong_bai_divs) {
					$kong_bai_divs[i].remove();
				}
				options.column_count = column_count;
				$thi.waterfall(options);
			}
		}
		// cmds.set_cmds();
		$items.css({
			position : "absolute"
		}).each(function() {
			cmds.set_pos($(this));
		});

		//添加footer使与底部对齐
		if (options.addfooter) {
			var tops = [], addfooter = function(max) {
				for (var i = 0, cc = options.column_count; i < cc; i++) {
					if (max != pos[i][1]) {
						var $div = $("<div>").addClass(options.item_cls).css({
							position : "absolute",
							height : max - pos[i][1] - margin - parseInt($first_item.css("borderWidth")) * 2 + "px",
							left : pos[i][0] + "px",
							top : pos[i][1] + "px",
							width : $first_item.width() + "px",
							padding : "0 " + $first_item.css("padding")
						}).appendTo($thi);
						$kong_bai_divs.push($div);
					}
				}
			};
			for (var i = 0, cc = options.column_count; i < cc; i++) {
				tops.push(pos[i][1]);
			}
			tops.sort(function(a, b) {
				return a - b;
			});
			addfooter(tops[options.column_count - 1]);
		}

		return cmds;
	}
})(jQuery); 