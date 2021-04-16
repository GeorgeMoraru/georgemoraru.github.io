(function () {
    const SH = window.SH;
    const $ = SH.$;
    const _ = SH._;

    var settings = SH.utils.getMergedModuleSettings(SH.SearchMenu);
    var parentContainer = $(settings.ParentContainerSelector)[0];

    var render = function () {
        SH.utils.compileTemplateAsync(settings.SearchMenuTemplate, settings).done(function (html) {
            if (parentContainer)
                parentContainer.innerHTML = html;
                bindEvents();
        });
    };

    var toggleMenu = function () {
        var menu = $(".megamenu")[0];
        var menuIcon = $(".megamenu .menu-icon")[0];
        if (menu.className === "megamenu") {
            menu.className += " open";
        } else {
            menu.className = "megamenu";
        }
    };

    var bindEvents = function(){
        $('body').click(function (evt) {
            if (evt.target.closest('.megamenu')){
                return;
            }
            var menu = $(".megamenu")[0];
            if(menu){
                menu.className = "megamenu";
            }
        });
    }  
    var processItem = function (key) {
        var item = settings.Items[key];
        currentHash = window.location.hash;
        itemUrl = processUrl(item);
        if (item.preserveQueryState) {
            var t = getHashValue("t");
            if (t != undefined && item.preserveQuerySource == false) {
                currentHash = currentHash.replace('t=' + t, '');
            }
            currentHash = currentHash.split("&&").join("&");
            var tid = getHashValue("tId");
            if (tid != undefined  && item.preserveQuerySource == false) {
                currentHash = currentHash.replace('tId=' + tid, '');
            }
            if(item.preserveRefiners == false){
                var appliedFilters = getFiltersHashValues();
                for(var filter in appliedFilters){
                    currentHash = currentHash.replace(filter+'=' + appliedFilters[filter], '');
                    currentHash = currentHash.split("&&").join("&");
                }
            }
            currentHash = currentHash.split("&&").join("&");
            currentHash = currentHash.split("#&").join("#");
            if(currentHash.endsWith("&")){
                currentHash = currentHash.substring(0,currentHash.lastIndexOf('&'));
            }
            
            window.location = itemUrl + currentHash;
        } else {
            var hashToKeep = SH.SearchProvider.encodeValues(SH.SearchProvider.getCustomAttributes(SH.SearchProvider.GetMainSearchInterface().queryStateModel.defaultAttributes));
            if (!hashToKeep) {
                window.location = item.url;
            }
            else if (item.url.indexOf("#") == -1) {
                window.location = item.url + "#" + hashToKeep;
            } else {
                window.location = item.url + "&" + hashToKeep;
            }

        }
    };
    
    var processUrl = function (item) {
        var itemUrl = item.url;
        if (item.preserveQueryState) {
            if (itemUrl.indexOf("#") != -1) {
                itemUrl = itemUrl.replace(itemUrl.substring(itemUrl.indexOf("#"), itemUrl.length), "");
            }
        }
        return itemUrl;
    };

    var getHashValue = function (key) {
        var hash = window.location.hash;
        if (hash.indexOf("#") == 0) hash = hash.substring(1, hash.length);
        var paramsArray = hash.split("&");
        for (var i = 0; i < paramsArray.length; i++) {
            var param = paramsArray[i];
            param = param.split("=");
            if (param[0] == key) return param[1];
        }
        return undefined;
    }
    
    var getFiltersHashValues = function () {
        var appliedFilters=[];
        var hash = window.location.hash;
        if (hash.indexOf("#") == 0) hash = hash.substring(1, hash.length);
        var paramsArray = hash.split("&");
        for (var i = 0; i < paramsArray.length; i++) {
            var param = paramsArray[i];
            param = param.split("=");
            if (param[0].startsWith("f:@")){
                appliedFilters[param[0]] = param[1];
            }
        }
        return appliedFilters;
    }

    SH.SearchMenu = SH.SearchMenu || {};
    SH.SearchMenu.toggleMenu = toggleMenu;
    SH.SearchMenu.processItem = processItem;
    SH.SearchMenu.processUrl = processUrl;

    render();
})();
