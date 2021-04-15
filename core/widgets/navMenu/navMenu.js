(function () {

    var initComponent = function () {

        var x = HomeHub.navMenu.Template("/modules/dashboard/dashboard.html", "Dashboard");
        console.log(x);
        /*
        var x = HomeHub.navMenu.Template({
            MenuName: "Dashboard",
            URL: "/modules/dashboard/dashboard.html"
        });
        */
    }

    document.addEventListener("ResourcesLoaded", initComponent);
})()

