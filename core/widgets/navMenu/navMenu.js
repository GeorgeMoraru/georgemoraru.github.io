(function () {
    var settings = HomeHub.helpers.getModuleSettings(HomeHub.navMenu);

    var initComponent = function () {
        debugger;
        // TODO fix underscore not loading.
        HomeHub.helpers.compileTemplateAsync(settings.Template, settings.Items).done(function (html) {
            debugger;
            var parentContainer = $(settings.ParentSelector)[0];
            if (parentContainer){
                parentContainer.innerHTML = html;
            }
        });
    }

    document.addEventListener("ResourcesLoaded", initComponent);
})()

