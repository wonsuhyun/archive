/* object */
$(document).ready(function(){
	
	$(".tab .tab-list > div").on("click",function(){
		var idx = $(this).index()
		$(this).parent().find('div').removeClass('on');
		$(this).addClass('on');

		$(this).parents('.tab').find('.tab-item .item').removeClass('on')
		$(this).parents('.tab').find('.tab-item .item:eq('+idx+')').addClass('on')
	})
	$(document).on("change","input[type=file]",function(e){
		$(this).siblings(".file-txt").val($(this)[0].files[0].name)
		
		if ($(this).siblings('.file-img').length > 0 ){
			var reader = new FileReader();
			var item = new Image;
			$(this).siblings('.file-img').append(item);
			var el = $(this).siblings('.file-img').find('img')
			el.attr('width','100%')
			reader.onload = function(e) {
				el.attr('src', e.target.result);
			}
			reader.readAsDataURL($(this)[0].files[0]);
		}
	})
	$(document).on("click",".input-plus .input-it .action-btn",function(){
		if ($(this).hasClass("plus")){
			var leg = $(this).parents(".input-plus").find(".input-it").length
			var item = "<div class='input-it'><input type='text'/><span class='action-btn minus'>-</span></div>"
			
			$(this).parents(".input-plus").find(".input-it:eq("+(leg-1)+")").find('.action-btn.minus').remove();
			$(this).parents(".input-plus").append(item)
		}else {
			var leg = $(this).parents(".input-plus").find(".input-it").length
			if (leg >= 3){
				$(this).parents(".input-plus").find(".input-it:eq("+(leg-2)+")").append("<span class='action-btn minus'>-</span>")
			}
			$(this).parents(".input-plus").find(".input-it:eq("+(leg-1)+")").remove();

		}
	})
    $(".full-search > input").on("keyup",function(e){
		if(e.keyCode == 13){
			$(this).siblings("button").trigger("click")
		}
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
	
	$(".select .selected").on("click",function(){
		$(this).siblings(".option").slideToggle(300)
	})

	$(".select .option > div").on("click",function(){
		$(this).parent(".option").siblings(".selected").text($(this).text());
		$(this).parent(".option").slideUp(300);
	})

	$(window).scroll(function(e) {
		scrollEvent()
	});
	
	$(document).on('touchstart touchmove touchend', function(e) {
		scrollEvent();
	});

	popup();

	$('.layer-popup .popup .popClose').on("click",function(){
		$(this).parents(".layer-popup").removeClass("on")
	})

	$(".openPop").on("click",function(){
		var dataType= $(this).attr("layer-data");
		$(".layer-popup").each(function(){
			if ( $(this).attr("layer-type") == dataType ) {
				$(this).addClass("on")
				popup();
			}
		})
	})

})

//스크롤이벤트
function scrollEvent(){

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

function validater(type,_this){
	
}

var PZL = {
    commonAjax : function(){

	},
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
    	
	},
	validater : function(type,_this){
		switch(type){
			case "email" :
				var validateCheckter = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;
				if(validateCheckter.test(_this.val())){
				
				}else{
					
				}
				break;
			case "password" :
				var pw=_this.val()
				var num = pw.search(/[0-9]/g);
				var eng = pw.search(/[a-z]/ig);
				var spe = pw.search(/[\~\!\@\#\$\%\^\&\*\(\)\_\+]/gi);
				var espe = /[A-Za-z0-9\~\!\@\#\$\%\^\&\*\(\)\_\+]/; //문자+특수문자+숫자 외 금지
				var id = $("#webId").val() || "";
				// ~!@#$%^&*()_+
				var type01 = false;
				var type02 = false;
				var type03 = true;
				var type04 = true;
				var type05 = true;
	
				if(id.trim() !== ""){
					id = id.split("@")[0];
				}
		
				if(pw.trim().length > 0){
				
				}

				if(pw.length < 10 || pw.length > 20){
				
				type01=false
				}else{
				
				type01=true
				}

				if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
					
					type02 = false;
				}else{
					
					type02 = true;
				}

				for(var i =0 ; i < pw.length ; i ++){
					if(espe.test(pw.charAt(i)) === false ){
						
						type03=false
					}
				}

				

				if(id.trim().length > 0 ){
					if(pw.indexOf(id) > -1){
					
						type05=false
					}
				}

				if(type01 == true && type02 == true && type03 == true && type04 == true && type05 == true){
					
				}else{
					
				}
				break;
	   	}
	}

    

}