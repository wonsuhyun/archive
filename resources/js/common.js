/* object */
$(document).ready(function(){
	
	$(".tab .tab-list > div").on("click",function(){
		var idx = $(this).index()
		$(this).parent().find('div').removeClass('on');
		$(this).addClass('on');

		$(this).parents('.tab').find('.tab-item .item').removeClass('on')
		$(this).parents('.tab').find('.tab-item .item:eq('+idx+')').addClass('on')
	})

	$(".accodian .acc_btn").on("click",function(){
		if ($(this).hasClass("on")){
			$(this).removeClass("on")
			$(this).parent(".accodian").find(".acc_conts").stop().slideUp(200)
		}else{
			$(this).addClass("on")
			$(this).parent(".accodian").find(".acc_conts").slideDown(200)
		}
		
	})

	$(".checkboxs .all_check input[type=checkbox]").on("change",function(){
		var child = $(this).parents(".checkboxs").find(".check_item input[type=checkbox]");
		if ($(this).prop("checked")){
			child.prop("checked",true);
		}else{
			child.prop("checked",false);
		}
	})
	$(".checkboxs .check_item input[type=checkbox]").on("change",function(){
		var parent = $(this).parents(".checkboxs").find(".all_check input[type=checkbox]");
		var child = $(this).parents(".checkboxs").find(".check_item input[type=checkbox]");
		var flag = true;
		child.each(function(i,v){
			if (!$(v).prop("checked")){
				flag=false;
				return false;
			}
		})
		parent.prop("checked",flag)
	})

	$(window).scroll(function(e) {
		scrollEvent()
	});
	
	$(document).on('touchstart touchmove touchend', function(e) {
		scrollEvent();
	});
	$( window ).resize( function() {
		resizeWindow()
	});


	$('.layer_popup .popup .pop_close').on("click",function(){
		$(this).parents(".layer_popup").removeClass("on")
	})

	popup();

})

//스크롤이벤트
function scrollEvent(){

}

//리사이즈 이벤트
function resizeWindow(){
	popup()
}

function popup() {
    $('.layer_popup .popup').each(function() {
        var popW = $(this).outerWidth();
		var popH = $(this)[0].scrollHeight;
		var winH = $(window).height();
		if (popH > winH) {
            $(this).closest('.layer_popup').addClass('h_full');
        } else {
            $(this).closest('.layer_popup').removeClass('h_full');
		}

		popH = popH > winH ? winH : popH;

        $(this).css({'margin-left': -popW / 2, 'margin-top': -popH / 2})		
		
    });
}

var XSP = {
	makeConfirmPopup(title,txt,btn,callback){
		var html = "<div class='layer_popup confirm on' layer-type='layer03'>"
		html+="<div class='popup'>"
		html+="<h3 class='pop-tit'>"+title+"</h3>"
		html+="<div class='pop-conts'>" 
		html+="<div class='txt'>"+txt+"</div>"
		html+="<div class='pop-bottom-btns'>"
		html+="<button class='type2 popClose'>취소하기</button>"	
		html+="<button class='step'>"+btn+"</button>"
		html+="</div></div></div>"
                
		$(".wrapper").append(html);
		popup();

		$('.layer-popup.confirm .popup .popClose').on("click",function(){
			$(this).parents(".layer-popup").remove();
		})

		$('.layer-popup.confirm .popup .step').on("click",function(){
			callback();
			$(this).parents(".layer-popup").remove();
		})
	}
}