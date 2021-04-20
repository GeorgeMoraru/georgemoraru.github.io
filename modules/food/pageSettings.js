(function () {

    window.HomeHub = {};
    HomeHub.Resources = {
        CSS: [
            "/core/css/core.css",
            "/core/css/theme.css",
            "/modules/food/food.css"
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
                ParentSelector: "",
                Items: [
                    {
                        MenuName: "Dashboard",
                        URL: "/modules/dashboard/dashboard.html"
                    },
                    {
                        MenuName: "Food",
                        URL: "/modules/food/food.html"
                    },
                    {
                        MenuName: "Utilities",
                        URL: "/modules/utilities/utilities.html"
                    }
                ]
            }
        }
    };

})();