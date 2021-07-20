var loadedLibs = 0;
var JSFilesToLoad;
var eventName = 'ResourcesLoaded';
var fullLibSrcs;

var loadJS = function (jsFiles) {
    
        // load JS files
    JSFilesToLoad = jsFiles.map(function (res) {
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

        //module = exports = undefined;
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
        if (loadedLibs === JSFilesToLoad.length) {
            if (typeof doneLoadingCallback === 'function') {
                doneLoadingCallback();
            }
        }
    }


export {
    loadJS as LoadJS
};