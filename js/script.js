$(function() {
    
    // Init
    $(".sidenav").sidenav();
    $(".carousel.carousel-slider").carousel({
        fullWidth: true,
        noWrap: false,
        duration: 300
    });
    $("#modal_donation").modal();
    
    // Animated Anchor
    $(".scrollNav").on("click",function(e){
        var scrollTarget = $(this).data("scrolltarget");
        var scrollPos = $("#"+scrollTarget).offset();
        $("html, body").animate({ scrollTop: scrollPos.top - 100 });
    })
    
    // Carousel Indicator
    $(".carousel-indicator").on("click",function(e){
        console.log($(this).data("carousel"));
        $("#carousel_future").carousel("set",($(this).data("carousel")-1));
    })
    
    // Pickup URL Parameters
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    var URLparam = getUrlVars(); 
    
    // Collect Donation Amount Info
    $("button").on("click",function(){
        $("#mce-AMOUNT").val("");
        if($(this).data("amount")){
            $("#mce-AMOUNT").val($(this).data("amount"));
        }
        M.updateTextFields();
    })
    
    // i18n init
    var i18n = $.i18n();
    
    // Enable i18n debug
    $.i18n.debug = true;
    
    // Load Translations
    $.i18n().load({
        "en": "translation/en.json",
        "zh": "translation/zh.json",
    }).done( function(){
        updateLang(URLparam.lang);
    })
    
    // Update Language
    function updateLang(lang){
                
        lang = (lang == "zh" || lang == "en")?lang:"en";
        
        $.i18n().locale = lang;
        
        $("html").i18n();
    }
    
    // Switch Language
    $("[data-lang]").on("click", function(){
        updateLang($(this).data("lang"));
    })
    
    function open(url){
        console.log(url);
        window.open(url, "_blank");
    }
    
    var donateBtnTop = $("#donate_goFundMe").offset().top;
    var offset = 100;
    
    // Sticky button
    $(window).scroll(function(){ stickyDonate() });
    
    function stickyDonate(){
        if($(window).scrollTop() - donateBtnTop > offset){
            $("#stickyDonate").removeClass("hide-y");
        }else{
            $("#stickyDonate").addClass("hide-y");
        };
    }
    
    stickyDonate();
})