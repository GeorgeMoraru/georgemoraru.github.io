(function () {
    var settings = HomeHub.helpers.getModuleSettings(HomeHub.navMenu);

    var initComponent = function () {
        HomeHub.helpers.compileTemplateAsync(settings.Template, settings).done(function (html) {
            var parentContainer = $(settings.ParentSelector)[0];
            if (parentContainer){
                parentContainer.innerHTML = html;
                bindHoverEvent();
            }
        });
    }

    var expandNavigation = function(){
        $(settings.ParentSelector).find(".nav").addClass("expanded");
    }

    var colapseNavigation = function () {
        $(settings.ParentSelector).find(".nav").removeClass("expanded");
    }

    var bindHoverEvent = function ()
    {
        $(settings.ParentSelector).find(".nav").off("mouseenter", expandNavigation);
        $(settings.ParentSelector).find(".nav").on("mouseenter", expandNavigation);

        $(settings.ParentSelector).find(".nav").off("mouseleave", colapseNavigation);
        $(settings.ParentSelector).find(".nav").on("mouseleave", colapseNavigation);
        
    }



    document.addEventListener("ResourcesLoaded", initComponent);
})()

