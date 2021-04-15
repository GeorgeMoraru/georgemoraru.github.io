(function () {

    var widgetsRoot = "/core/widgets/";
    var fullLibSrcs;
    var loadedLibs = 0;
    var loadedCSS = 0;
    var JSFilesToLoad;
    var CSSFilesToLoad;

    var loadResources = function () {

        eventName = 'ResourcesLoaded';

        Object.keys(HomeHub.Resources.Widgets).forEach(function (key) {
            var widgetFullPath = widgetsRoot + "/" + key + "/" + key + ".js";
            var widgetTemplatePath = widgetsRoot + "/" + key + "/template.js";
            HomeHub.Resources.JS.push(widgetFullPath);
            HomeHub[key] = {};
            HomeHub[key].Settings = HomeHub.Resources.Widgets[key].Settings;
            HomeHub.Resources.JS.push(widgetTemplatePath);
        })

        //load CSS

        CSSFilesToLoad = HomeHub.Resources.CSS.map(function (res) {
            return setResources(res);
        });

        CSSFilesToLoad.forEach(function (file) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = file.src;
            link.onload = onCSSFileLoaded;
            link.onerror = onCSSFileLoaded;
            document.head.appendChild(link);
        });

        var onCSSFileLoaded = function () {
            loadedCSS++
            if (loadedCSS < CSSFilesToLoad.length) {
                return;
            }

            checkDoneLoading();
        };

        // load JS files
        JSFilesToLoad = HomeHub.Resources.JS.map(function (res) {
            return setResources(res);
        });

        if (!location.origin) {
            location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }

        fullLibSrcs = JSFilesToLoad.map(function (lib) {
            if (lib.src.indexOf('http') == 0)
                return lib.src;

            return location.origin + lib.src;
        })

        JSFilesToLoad.forEach(function (lib) {
            loadLib(lib.src, onLibLoaded, lib.params, lib.version);
        })
    };

    var setResources = function (res) {
        if (typeof res == 'object') {
            res.src = res.src;
            return res;
        }
        return {
            src: res
        }
    };

    var onLibLoaded = function (event) {

        loadedLibs++;

        let scriptSrc = event.target.src.substr(0, event.target.src.indexOf('?v='));

        let loadedLib;

        fullLibSrcs.forEach(function (src, i) {
            if (src === scriptSrc)
                loadedLib = JSFilesToLoad[i];
        })

        if (!loadedLib) {
            console.error('fullLibSrcs:', fullLibSrcs);
            throw Error('could not find ' + scriptSrc);
        }

        if (window.module && window.module.exports) {

            if (loadedLib.globalAlias instanceof Array) {
                for (var i = 0; i < loadedLib.globalAlias.length; i++) {
                    var alias = loadedLib.globalAlias[i];
                    SH[alias] = module.exports;
                    if (loadedLib.globallyAvailable) {
                        window[alias] = SH[alias];
                    }
                }
            } else {
                SH[loadedLib.globalAlias] = module.exports;
                if (loadedLib.globallyAvailable) {
                    window[loadedLib.globalAlias] = SH[loadedLib.globalAlias];
                }
            }
        }

        if (loadedLibs == JSFilesToLoad.length) {
            const event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
            document.dispatchEvent(event);
        }

        module = exports = undefined;
    };

    var loadLib = function (libSrc, then, params) {
        const script = document.createElement('script');
        const version = new Date().getHours();
        script.src = libSrc + '?v=' + version;
        script.async = false;

        if (then) {
            script.onload = then;
        }

        if (params) {
            Object.keys(params).forEach(function (key) {
                script.setAttribute(key, params[key]);
            })
        }

        script.onerror = function (e) {
            console.warn(libSrc + ' could not be loaded. Skipping...')
            then && then(e);
        }

        document.head.appendChild(script);

        checkDoneLoading();
    };

    var checkDoneLoading = function () {
        if (loadedCSS === CSSFilesToLoad.length && loadedLibs === JSFilesToLoad.length) {
            if (typeof doneLoadingCallback === 'function') {
                doneLoadingCallback();
            }
        }
    }

    window.HomeHub = window.HomeHub || {};
    window.HomeHub.ResourceLoader = window.HomeHub.ResourceLoader || {};
    window.HomeHub.ResourceLoader.LoadResources = loadResources;

    window.HomeHub.ResourceLoader.LoadResources();
})()