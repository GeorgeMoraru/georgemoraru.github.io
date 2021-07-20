var HomeHub = {};
HomeHub.Resources = {
    CSS: [
        "/core/css/core.css",
        "/core/css/theme.css",
        "/core/css/index.css",
    ],
    JS: [
        "/core/libs/jQuery.js",
        "/core/libs/underscore.js",
    ]
};

HomeHub.Widgets = {
    "navMenu": {
        Settings: {
            ParentSelector: ".wrapper .sidebar",
            Template: "/core/widgets/navMenu/template.html",
            Items: [
                {
                    MenuIcon: "dashboard",
                    MenuText: "Dashboard",
                    URL: "/modules/dashboard"
                },
                {
                    MenuIcon: "kitchen",
                    MenuText: "Food",
                    URL: "/modules/food"
                },
                {
                    MenuIcon: "event",
                    MenuText: "Utilities",
                    URL: "/modules/utilities"
                }
            ]
        }
    }
};

var getPageResources = function () {
    debugger;
    return HomeHub;
};

var getCSSResources =  function() {
    return HomeHub.Resources.CSS;
};

var getJSResources = function () {
    return HomeHub.Resources.JS;
};

var getWidgets = function () {
    return HomeHub.Widgets;
};

var getWidgetSettings = function(widgetName) {
    return HHomeHub.Widgets[widgetName].Settings;
}

export {
    getPageResources as getPageResources,
    getCSSResources as getCSSResources,
    getJSResources as getJSResources,
    getWidgets as getWidgets,
    getWidgetSettings as getWidgetSettings
};