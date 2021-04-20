(function () {

    window.HomeHub = {};
    HomeHub.Resources = {
        CSS: [
            "/core/css/core.css",
            "/core/css/theme.css",
            "/modules/dashboard/dashboard.css"
        ],
        JS: [
            "/core/libs/jQuery.js",
            "/core/libs/underscore.js",
            "/core/js/core.js"
        ]
    };

    HomeHub.Widgets = {
        "navMenu": {
            Settings: {
                ParentSelector: "#test",
                Template: "/core/widgets/navMenu/template.html",
                Items: [
                    {
                        MenuText: "Dashboard",
                        URL: "/modules/dashboard/index.html"
                    },
                    {
                        MenuText: "Food",
                        URL: "/modules/food/index.html"
                    },
                    {
                        MenuText: "Utilities",
                        URL: "/modules/utilities/index.html"
                    }
                ]
            }
        }
    };

})();