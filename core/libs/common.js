if ("undefined" == typeof $)
    throw new Error("jQuery is missing");


    +function() {
        "use strict";
        if(window.name == "" )  window.name =  Math.random(99999);
        var NavigationHistoryName = "NavigationHistory-"+window.name;
        var NavigationHistory = sessionStorage.getItem(NavigationHistoryName);
        if( NavigationHistory == undefined ){
                NavigationHistory = [];
                
        } else{
            NavigationHistory = JSON.parse(NavigationHistory);
        }
        var pageURL = window.location.href.toString();
        if( NavigationHistory.length == 0 || NavigationHistory[NavigationHistory.length-1].indexOf(pageURL.toLowerCase()) == -1 ) {
            NavigationHistory.push(pageURL.toLowerCase());
            sessionStorage.setItem(NavigationHistoryName, JSON.stringify(NavigationHistory));
        }
      
    }(),
    
+function() {
    "use strict";
    $(document).on("click", '[data-action-type="collapse"]', function(e) {
        e.stopPropagation();
        var toggleHeader = $(this);
        var collapseTargetID = $(toggleHeader).attr('data-collapse-target');
        var firstCommonParent = toggleHeader.closest(':has('+collapseTargetID+')');
        var target = firstCommonParent.find(collapseTargetID);
        var parentID = $(target).attr('data-collapse-parent');
        var parent = target.parents(parentID);
        var currentArrow = $($(toggleHeader).parent()[0]).find('[class*="-arrow-"]')[0];
        if(parent != undefined){
            var expandedElements =  $(parent[0]).find('.sh-collapse.sh-show');
            for(var i =0;i< expandedElements.length;i++){
                var elem =expandedElements[i];
                if(elem != target[0]){
                    $(elem).removeClass('sh-show');
                }
            }
            var arrows =  $(parent[0]).find('[class*="-arrow-"]');
            for(var i =0;i< arrows.length;i++){
                var elem =arrows[i];
                if(elem != currentArrow){
                    $(elem).removeClass('flipArrow');
                }
            }
        }
        $(target[0]).toggleClass('sh-show');
        if(currentArrow){
            $(currentArrow).toggleClass('flipArrow');
        }
    });
}(),

+function() {
    "use strict";
    var setTabs = function(){
        var tabContainers = $("[data-role='tab']");
        var setActiveTab = false;
        for(var i = 0; i < tabContainers.length; i++){
            var tabSwitches = $(tabContainers[i]).find("[data-action-type='tab-switch']");
            for(var j = 0; j < tabSwitches.length; j++){
                $(tabSwitches[j]).removeClass("active-tab");
                var target = $(tabSwitches[j]).attr('data-tab-target');
                $(target).removeClass('sh-show');
                if(!setActiveTab){
                    if($(tabSwitches[j]).is(":visible") || tabSwitches[j].style.display != "none"){
                        var target = $(tabSwitches[j]).attr('data-tab-target');
                        $(tabSwitches[j]).addClass("active-tab");
                        var tabName = $(tabSwitches[j]).parents("[data-role='tab']").find("[data-action-type='tab-name']")[0];
                        if(tabName){
                             $(tabName).find("span")[0].innerText =  tabSwitches[j].innerText.trim();
                        }
                        $(target).addClass('sh-show');
                        setActiveTab = true;
                     }
                }
            }
            if(!setActiveTab){
                $(tabContainers[i]).find("[data-action-type='tab-name']").addClass("hidden");
            } else{
                $(tabContainers[i]).find("[data-action-type='tab-name']").removeClass("hidden");
            }
        }
    }

    $(document).on("afterInitialization", setTabs);
    $(document).on("PersonaLoaded", setTabs);
    $(document).on("UpdatedTabs", setTabs);

    $(document).on("click", '[data-action-type="tab-name"]', function(e) {
        var toggleHeader = $(this);
        toggleHeader.toggleClass("open");
    });

    $('body').click(function (evt) {
        if (evt.target.closest('[data-action-type="tab-name"]')){
            return;
        }
        $('[data-action-type="tab-name"]').removeClass("open");
    });

    $(document).on("click", '[data-action-type="tab-switch"]', function(e) {
        e.stopPropagation();
        var toggleHeader = $(this);
        var target = $($(toggleHeader).attr('data-tab-target'))[0];
        var parent =$(target).parents("[data-role='tab']")[0];
        if(parent != undefined){
            var expandedElements =  $(parent).find('.sh-tab.sh-show');
            for(var i =0;i< expandedElements.length;i++){
                var elem =expandedElements[i];
                if(elem != target){
                    $(elem).removeClass('sh-show');
                }
            }
            var tabSwitches =  $(parent).find('[data-action-type="tab-switch"]');
            for(var i =0;i< tabSwitches.length;i++){
                var elem =tabSwitches[i];
                if(elem != target){
                    $(elem).removeClass('active-tab');
                }
            }
        }
        $(target).addClass('sh-show');
        $(toggleHeader).addClass('active-tab');
        var tabName = $(toggleHeader).parents("[data-role='tab']").find("[data-action-type='tab-name']")[0];
        if(tabName){
            $(tabName).find("span")[0].innerText =  toggleHeader[0].innerText.trim();
            $(tabName).removeClass("open");
        }
    });
   
}(),

+function() {
    "use strict";
    $(document).on("click", '[data-action-type="hide"]', function(e) {
        e.stopPropagation();
        var fn = SH.Personalization.TogglePersonalizationBox;
        if (typeof fn === 'function') {
            SH.Personalization.TogglePersonalizationBox($(this).attr('data-hide-target'));
        }
        else {
            console.warn("Closing this box requires the Personalization module to be loaded on the page");
        }
    });
}(),
+function() {
    "use strict";
    //TODO fix this
    var Modal = function(config){
        var states = {'show':show,'hide':hide};
        var showCSSClass= 'sh-show';
        switch(typeof config) {
            case 'string':
                if(states.hasOwnProperty(config.toLowerCase())){
                    var fn =states[config.toLowerCase()];
                    fn(this,showCSSClass);
                };
                break;
            case 'undefined':
                if(typeof config === 'undefined'){
                    show(this,showCSSClass);
                };
                break;
            default:
                {
                    var config = checkConfig(config);
                    var target =  $(this);
                    HomeHub.helpers.compileTemplateAsync('/modules/SmartHubResourceLoader/templates/modal.html', {
                        Title:config.title,
                        Body:config.body,
                        Footer:config.footer
                    }).done(function (html) {
                        $(target).removeClass('sh-modal sh-fade');
                        $(target).attr('data-role','');
                        $(target).addClass('sh-modal sh-fade');
                        $(target).attr('data-role','modal');
                        $(target).html(html);
                        $('body').append(target);
                        show(target,showCSSClass);
                    });
                }
        };

        function show(target,showCSSClass){
            if($(target).attr('data-role') == 'modal'){
                $(target).attr('tabindex','-1');
                $(target).addClass(showCSSClass);
                $(target).css('height',document.documentElement.clientHeight);
                $($(target).find('.sh-modal-content')).css('max-height',document.documentElement.clientHeight);
                $('html').attr('style','overflow:hidden;')
                $(target).focus();
                handleResize(target);
                bindEvents(target,showCSSClass);
            }
        };

        function hide(target,showCSSClass){
            if($(target).attr('data-role') == 'modal'){
                $('html').removeAttr('style');
                $(target).removeAttr('tabindex');
                $(target).removeClass(showCSSClass);
                unbindEvents(target);
            }
        }; 

        function bindEvents(target,showCSSClass){
            $(target).on("click.Modal","[data-dismiss]",handleCloseAction.bind(null,showCSSClass));
            $(window).on("resize.Modal",handleResize.bind(null,target));
            $(window).on("hashchange.Modal",handleHashChange.bind(null,target,showCSSClass));
        }

        function unbindEvents(target){
            $(target).off("click.Modal","[data-dismiss]",handleCloseAction);
            $(window).off("resize.Modal");
            $(window).off("hashchange.Modal",handleHashChange);
        }

        function checkConfig(config){
            var fixedConfig = {'title':'','body':'','footer':''};
            if(config.hasOwnProperty('title')) {
                fixedConfig.title= config.title;
            };
            if(config.hasOwnProperty('body')) {
                fixedConfig.body= config.body;
            };
            if(config.hasOwnProperty('footer')) {
                 fixedConfig.footer= config.footer;
            };
            return fixedConfig;
        };

        function handleHashChange(target,showCSSClass){
            if(!$('body')[0].classList.contains('coveo-small-interface'))
                return;
            if($(target).hasClass('sh-show')){
                event.preventDefault();
                event.stopPropagation();
                hide(target,showCSSClass);
            }
        }

        function handleCloseAction(showCSSClass,e){
            e.preventDefault();
            e.stopPropagation();
            var closeButton = $(e.currentTarget);
            var targetType = $(closeButton).attr('data-dismiss');
            var target = $(closeButton).parents('[data-role="'+targetType+'"]');
            hide(target,showCSSClass);
        }
    
        function handleResize(target){
            if($(target).hasClass('sh-show')){
                $(target).css('height',document.documentElement.clientHeight);
                $($(target).find('.sh-modal-content')).css('max-height',document.documentElement.clientHeight);
                if($('body')[0].classList.contains('coveo-small-interface')){
                    $($(target).find('.sh-modal-content')).css('height',document.documentElement.clientHeight);
                }
            }           
        }
    };
   
    $.fn.Modal = Modal;
}();