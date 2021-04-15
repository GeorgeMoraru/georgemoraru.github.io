(function () {

    window.HomeHub = {
        Resources: {
            CSS: [
                "/core/css/core.css",
                "/core/css/theme.css"
            ],
            JS: ["/core/js/core.js"],
            Widgets: {
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
            }
        }
    }

})();