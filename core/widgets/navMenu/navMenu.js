(function () {
    var settings = HomeHub.helpers.getModuleSettings(HomeHub.navMenu);

    var initComponent = function () {
        HomeHub.helpers.compileTemplateAsync(settings.Template, settings).done(function (html) {
            var parentContainer = $(settings.ParentSelector)[0];
            if (parentContainer){
                parentContainer.innerHTML = html;
            }
        });
    }

    document.addEventListener("ResourcesLoaded", initComponent);
})()

