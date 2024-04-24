$(document).ready(function(){
    _dotsMotion();
    _lnbScroll();
    _getPortfolioItem();
    _introTitleTyping();
    _horizontalLayout();
});
function _horizontalLayout(){
    let _bWidth = $('.wrap').outerWidth();
    let _bHeight = $('.wrap').outerHeight();;
    let $horizonWrap = $('.horizontal--layout');
    $(window).scroll(function(){
        _bWidth = $('.wrap').outerWidth();
        _bHeight = $('.wrap').outerHeight();

        let _wTop = $(window).scrollTop();

        $('body').height(_bWidth - ($(window).innerWidth() - $(window).innerHeight()));
        $('.wrap').css({
            marginLeft:_wTop * -1
        });

        
		for(let i=0; i<$('.content').length; i++){
			let $iSec = $('#sec'+i);
			if($iSec.offset().left < $(window).innerWidth() * 0.33 && $iSec.offset().left + $iSec.outerWidth() > $(window).innerWidth() * 0.33){
				$('.lnb--list__item').removeClass('active');
				$('.lnb--list__item').eq(i).addClass('active');
				break;
			};
		};
        if($(window).innerWidth() <= 1024 || $(window).innerHeight() <= 768){
			$('body').height('auto');
		}else{
	        $('body').height(_bWidth - ($(window).innerWidth() - $(window).innerHeight()));
		};
    }).scroll();
    $(window).resize(function(){
        if($(window).innerWidth() <= 1024 || $(window).innerHeight() <= 768){
            if(!$horizonWrap.hasClass('responsive')){
                $horizonWrap.addClass('responsive');
			};
			$('body').height('auto');
		}else{
			if($horizonWrap.hasClass('responsive')){
				$horizonWrap.removeClass('responsive');
			};
            $('body').height(_bWidth - ($(window).innerWidth() - $(window).innerHeight()));
		};
    }).resize();
    
};
function _introTitleTyping(){
    let _k = 0;
    let $introTitle = $('.content--intro__title span');
    let _introTitleTxt = $introTitle.text();
    let _limit = _introTitleTxt.length;
        $introTitle.text('');


    let _timer = setInterval(function(){
        
        if(_k > _limit){
            clearInterval(_timer);
            setInterval(function(){
                $('.content--intro .content--intro__title i').remove();
            }, 500);
            $('.dots--group').addClass('active');
            $('html,body').removeClass('disscroll');
        }else{
            $introTitle.text(_introTitleTxt.slice(0,_k));
        }
        _k++;
    }, 100);
};
function _dotsMotion(){
    $(window).scroll(function(){
        let _wTop = $(window).scrollTop();
            if(_wTop > 30){
                $('.dot').removeClass('fixed');
                $('.dot__inn').css({
                    width: _wTop * 1.2
                });
            }else{
                $('.dot').addClass('fixed');
            };
    }).scroll();
};
function _lnbScroll(){
    let $mainLnbBtn = $('.lnb--list__item button');
	$mainLnbBtn.click(function(){
		let _mainLnbTarget = $(this).attr('data-scroll-target');
		let $mainLnbSec = $(_mainLnbTarget).offset().left;
			$mainLnbSec = $(window).scrollTop() + $mainLnbSec - 10;
			if(_mainLnbTarget == 'sec0'){
				$mainLnbSec = 0;
			};
		$('html,body').stop().animate({
			scrollTop: $mainLnbSec
		}, 300);
	});
    $(window).scroll(function(){
        for(let i=0; i<$('.content').length; i++){
			let $iSec = $('#sec'+i);
			if($iSec.offset().left < $(window).innerWidth() * 0.33 && $iSec.offset().left + $iSec.outerWidth() > $(window).innerWidth() * 0.33){
				$mainLnbBtn.removeClass('active');
				$mainLnbBtn.eq(i).addClass('active');
				break;
			};
		};
    }).scroll();
};
function _getPortfolioItem(){
    $.getJSON('/assets/js/portfolio.json', function(k){
        let _items = [];
        let _itemTotal = '';
        let $itemWrap = $('#portfolioList');
        $.each(k,function(i,x){
            let _contentDark = '';
                if(x.pLight){
                    _contentDark = 'circle--dark';
                };
            let _itemHtml = '';
                _itemHtml +='<li class="circle--item">';
                _itemHtml +='    <div class="circle--item__wrap '+_contentDark+'">';
                _itemHtml +='        <img src="'+x.pImage+'" alt="'+x.pName+'" class="circle--item__img">';
                _itemHtml +='        <div class="circle--item__txt--wrap">';
                _itemHtml +='            <h3 class="circle--item__txt--title">'+x.pName+'</h3>';
                _itemHtml +='            <span class="circle--item__txt--type">'+x.pType+'</span>';
                _itemHtml +='            <span class="circle--item__txt--type">기여도:'+x.pContribution+'</span>';
                _itemHtml +='            <span class="circle--item__txt--type">'+x.pScope+'</span>';
                if(x.pLocation != null && x.pLocation != undefined && x.pLocation.length > 0){
                    _itemHtml +='        <div class="circle--item__btn--group">';
                    for(let j=0; j<x.pLocation.length; j++){
                        _itemHtml +='       <a href="'+x.pLocation[j]+'" class="circle--item__btn" target="_blank">OPEN</a>';
                    };
                    _itemHtml +='        </div>';
                };
                _itemHtml +='        </div>';
                _itemHtml +='    </div>';
                _itemHtml +='</li>';

                _items.push(_itemHtml);
        });

        while(_items.length > 0){
            let _randomI = Math.floor(Math.random() * _items.length);
            _itemTotal += _items[_randomI];
            _items.splice(_randomI,1)
            $itemWrap.html(_itemTotal);
        };

        
        itemSlickForMobile();
    });
};
function itemSlickForMobile(){
    $(window).resize(function(){
        setTimeout(function(){
            let _wInn = $(window).innerWidth();
            let $itemWrap = $('.circle--item--list');
            if(_wInn < 600 && !$itemWrap.hasClass('slick-slider')){
                console.log(true, $('.circle--item').length);
                $itemWrap.slick({
                    arrows:true,
                    infinite:true,
                    rows:2,
                    slideToShow:8,
                    slideToScroll:8,
                    dots:false,
                    adaptiveHeight:false,
                    centerPadding:'0',
                    centerMode:true
                });
            }else if(_wInn >= 600 && $itemWrap.hasClass('slick-slider')){
                console.log(false);
                $itemWrap.slick('unslick');
            };
        });
    }).resize();
};