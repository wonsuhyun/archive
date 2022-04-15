/* object */
$(document).ready(function(){
	
	$(".tab .tab-list > div").on("click",function(){
		var idx = $(this).index()
		$(this).parent().find('div').removeClass('on');
		$(this).addClass('on');

		$(this).parents('.tab').find('.tab-item .item').removeClass('on')
		$(this).parents('.tab').find('.tab-item .item:eq('+idx+')').addClass('on')
	})

	$(".accodian .tit").on("click",function(){
		if ($(this).hasClass("on")){
			$(this).removeClass("on")
			$(this).parent(".accodian").find(".content").stop().slideUp(200)
		}else{
			$(this).addClass("on")
			$(this).parent(".accodian").find(".content").slideDown(200)
		}
		
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


	$('.layer-popup .popup .popClose').on("click",function(){
		$(this).parents(".layer-popup").removeClass("on")
	})

	popup();

})

//스크롤이벤트
function scrollEvent(){

}

//리사이즈 이벤트
function resizeWindow(){

}

function popup() {
    $('.layer-popup .popup').each(function() {
        var popW = $(this).outerWidth();
        var popH = $(this)[0].scrollHeight;
        $(this).css({'margin-left': -popW / 2, 'margin-top': -popH / 2}).attr('data', popH);

        var winH = $(window).height();
        var data = Number($(this).attr('data'));
        if (data > winH) {
            $(this).closest('.layer-popup').addClass('h-full');
        } else {
            $(this).closest('.layer-popup').removeClass('h-full');
        }
    });
}

var XSP = {
	makeConfirmPopup(title,txt,btn,callback){
		var html = "<div class='layer-popup confirm on' layer-type='layer03'>"
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