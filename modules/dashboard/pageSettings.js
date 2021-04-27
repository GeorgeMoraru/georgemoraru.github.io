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
                ParentSelector: ".wrapper .sidebar",
                Template: "/core/widgets/navMenu/template.html",
                Items: [
                    {
                        MenuIcon: "home",
                        MenuText: "Home",
                        URL: "/"
                    },
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

})();