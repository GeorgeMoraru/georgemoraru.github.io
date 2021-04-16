(function () {
    SH.VERSION = '%&VERSION_TARGET%&';
    if (SH.RootLevelURL.substring(SH.RootLevelURL.length - 1) == "/") {
        SH.RootLevelURL = SH.RootLevelURL.substring(0, SH.RootLevelURL.length - 1)
    }

    if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/") != -1 || navigator.userAgent.toUpperCase().indexOf("MSIE") != -1){
       const ieCustomPropsFallback = document.createElement('link')
       ieCustomPropsFallback.rel = 'stylesheet';
       ieCustomPropsFallback.href =SH.RootLevelURL + '/modules/SmartHubResourceLoader/css/ieCustomPropsFallback.css';+ '?v=' + encodeURIComponent(SH.VERSION);
       document.head.appendChild(ieCustomPropsFallback);
    }
    
	if(!SH.IntegrationMode) {
		var pluginLoaderSRC = SH.RootLevelURL + '/integrations/pluginLoader.js';
		var script = document.createElement('script');
		script.src = pluginLoaderSRC + '?' + new Date().getTime();
		script.async = false;
		document.head.appendChild(script);
	}

    var loadResources = function (jsFiles, cssFiles, loadExtraFiles, eventName, doneLoadingCallback) {
        if (!jsFiles) jsFiles = SH.Loader.JSFilesToLoad;
        if (!cssFiles) cssFiles = SH.Loader.CSSFilesToLoad;
        if (!eventName) eventName = 'DOMContentLoaded';
        if (loadExtraFiles === undefined) loadExtraFiles = true;
        
        //load CSS
        let loadedCSS = 0
        let CSSFilesToLoad = convertToArray(cssFiles);

        CSSFilesToLoad = prepareFiles(CSSFilesToLoad.map(function (lib) {
            if (typeof lib == 'object') {
                lib.src = SH.RootLevelURL + lib.src;
                return lib;
            }
            return {
                src: SH.RootLevelURL + lib
            }
        }), true)

        CSSFilesToLoad.forEach(function (file) {
            const link = document.createElement('link')
            let version = file.version ? file.version : encodeURIComponent(SH.VERSION);
            link.rel = 'stylesheet'
            link.href = SH.RootLevelURL + file.src + '?v=' + version
            link.onload = onCSSFileLoaded
            link.onerror = onCSSFileLoaded
            document.head.appendChild(link)
        })

        function checkDoneLoading() {
            if (loadedCSS === CSSFilesToLoad.length && loadedLibs === JSFilesToLoad.length) {
                if (typeof doneLoadingCallback === 'function') {
                    doneLoadingCallback();
                }
            }
        }

        function onCSSFileLoaded() {
            loadedCSS++
            if (loadedCSS < CSSFilesToLoad.length) {
                return
            }
            checkDoneLoading();
            document.body.hidden = false
        }

        // load 
		
        let JSFilesToLoad = convertToArray(jsFiles);
        if (loadExtraFiles) {
            var additionalFiles = getAdditionalFilesToLoad();
            JSFilesToLoad = injectAdditionalFiles(JSFilesToLoad, additionalFiles);
        }

        JSFilesToLoad = prepareFiles(JSFilesToLoad.map(function (lib) {
            if (typeof lib == 'object') {
                lib.src = SH.RootLevelURL + lib.src;
                return lib;
            }
            return {
                src: SH.RootLevelURL + lib
            }
        }), false)

        if (!location.origin) {
            location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + SH.RootLevelURL;
        }

        const fullLibSrcs = JSFilesToLoad.map(function (lib) {
            if (lib.src.indexOf('http') == 0)
                return lib.src

            return location.origin + lib.src
        })

        let loadedLibs = 0

        SH.fakeNodeEnvironment = function () {
            window.exports = window.module = {}
            window.module.exports = window.exports
        }

        JSFilesToLoad.forEach(function (lib) {
            loadLib(lib.src, onLibLoaded, lib.params, lib.version)
        })

        function getAdditionalFilesToLoad() {
            if (!SH.RootLevelURL) return [];

            var additionalFiles = [{
                "DependentOn": "/js/CoveoJsSearch.js",
                "DependentFiles": [
                    "/js/cultures" + SH.RootLevelURL + ".js",
                    "/js/cultures" + SH.RootLevelURL + ".smarthub.js"
                ]
            }];

            return additionalFiles;
        }

        function getFilePosition(files, searchedFile) {
            var position = -1;

            for (var i = 0; i < files.length; i++) {
                if (files[i].src && files[i].src === searchedFile) {
                    position = i;
                    break;
                } else if (!files[i].src && files[i] === searchedFile) {
                    position = i;
                    break;
                }
            }

            return position;
        }

        function injectAdditionalFiles(files, additionalFiles) {

            if (!additionalFiles) return files;

            for (var i = 0; i < additionalFiles.length; i++) {
                var dependentOn = additionalFiles[i].DependentOn;
                var dependentFiles = additionalFiles[i].DependentFiles;

                var insertPos = getFilePosition(files, dependentOn);

                if (insertPos !== -1) {
                    for (var j = dependentFiles.length - 1; j >= 0; j--) {
                        files.splice(insertPos + 1, 0, dependentFiles[j]);
                    }
                }
            }

            return files;
        }

        function onLibLoaded(event) {

            loadedLibs++

            const scriptSrc = event.target.src.substr(0, event.target.src.indexOf('?v='))

            let loadedLib

            fullLibSrcs.forEach(function (src, i) {
                if (src === scriptSrc)
                    loadedLib = JSFilesToLoad[i]
            })

            if (!loadedLib) {
                console.error('fullLibSrcs:', fullLibSrcs)
                throw Error('could not find ' + scriptSrc)
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

                const event = document.createEvent('Event')
                event.initEvent(eventName, true, true)
                document.dispatchEvent(event)

                checkDoneLoading();
            }

            module = exports = undefined
        }

    }


    function loadLib(libSrc, then, params, fileVersion) {
        const script = document.createElement('script')
        const version = libSrc.indexOf("js/cultures/") > -1 ? new Date().getHours() : fileVersion ? fileVersion : encodeURIComponent(SH.VERSION)
        script.src = libSrc + '?v=' + version
        script.async = false

        if (then) {
            script.onload = then
        }

        if (params) {
            Object.keys(params).forEach(function (key) {
                script.setAttribute(key, params[key])
            })
        }

        script.onerror = function (e) {
            console.warn(libSrc + ' could not be loaded. Skipping...')
            then && then(e)
        }

        document.head.appendChild(script)
    }

    function convertToArray(obj) {
        return Object.keys(obj).reduce(function (acc, src) {
            const value = obj[src]

            if (Object.keys(value).length) {
                value.src = src
                acc.push(value)
            } else {
                acc.push(src)
            }

            return acc
        }, [])
    }

    function prepareFiles(files, css) {
        const filesObject = files.reduce(function (acc, file) {
            const key = file.src.toLowerCase();
            acc[key] = file
            return acc
        }, {})

        const isFunc = css ? isCSS : isJS

        const toAddObject = Object.keys(SH.Loader.FilesToLoad).filter(isFunc).reduce(function (acc, path) {
            acc[path.toLowerCase()] = SH.Loader.FilesToLoad[path]
            if (!acc[path.toLowerCase()].src) {
                acc[path.toLowerCase()].src = path
            }
            return acc
        }, {})
        const FilterFunc = css ? isCSS : function (str) {
            return !isCSS(str)
        }
        const excluded = SH.Loader.PathsToExclude.filter(function (arrayPath) {
            return FilterFunc(arrayPath[arrayPath.length - 1])
        })
        const merged = mergeWithExclude(filesObject, toAddObject, excluded, true)
        return Object.keys(merged).map(function (key) {
            return merged[key]
        })
    }

    /* utils */

    function isCSS(file) {
        return hasExtension(file, 'css')
    }

    function isJS(file) {
        return hasExtension(file, 'js')
    }

    function mergeWithExclude(target, source, excludePaths, toLowercase) {
        if (toLowercase == undefined) toLowercase = false;
        source = source || {}
        excludePaths = excludePaths || []
        const result = deepmerge(target, source)
        excludePaths.forEach(function (pathArray) {
            excludePath(result, pathArray, toLowercase)
        })

        return result
    }

    SH.mergeWithExclude = mergeWithExclude

    function excludePath(result, pathArray, toLowercase) {
        let pointer = result
        const lastKey = pathArray.pop()
        pathArray.forEach(function (key) {
            if (toLowercase) {
                if (pointer[key.toLowerCase()] != undefined) {
                    pointer = pointer[key.toLowerCase()]
                }

            } else {
                if (pointer[key] != undefined) {
                    pointer = pointer[key]
                }
            }

        })
        if (toLowercase) {
            pathArray.push(lastKey.toLowerCase())
            delete pointer[lastKey.toLowerCase()]
        } else {
            pathArray.push(lastKey)
            delete pointer[lastKey]
        }

    }

    function hasExtension(f, e) {
        if (e[0] !== '.') {
            e = '.' + e;
        }
        if (f.substring(f.length - e.length, f.length) !== e) {
            return false;
        } else {
            return true;
        }
    }

    function isMergeableObject(val) {
        var nonNullObject = val && typeof val === 'object'

        return nonNullObject &&
            Object.prototype.toString.call(val) !== '[object RegExp]' &&
            Object.prototype.toString.call(val) !== '[object Date]'
    }

    function emptyTarget(val) {
        return Array.isArray(val) ? [] : {}
    }

    function cloneIfNecessary(value, optionsArgument) {
        var clone = optionsArgument && optionsArgument.clone === true
        return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
    }

    function defaultArrayMerge(target, source, optionsArgument) {
        var destination = target.slice()
        source.forEach(function (e, i) {
            if (typeof destination[i] === 'undefined') {
                destination[i] = cloneIfNecessary(e, optionsArgument)
            } else if (isMergeableObject(e)) {
                destination[i] = deepmerge(target[i], e, optionsArgument)
            } else if (target.indexOf(e) === -1) {
                destination.push(cloneIfNecessary(e, optionsArgument))
            }
        })
        return destination
    }


    function mergeObject(target, source, optionsArgument) {
        var destination = {}
        if (isMergeableObject(target)) {
            Object.keys(target).forEach(function (key) {
                destination[key] = cloneIfNecessary(target[key], optionsArgument)
            })
        }
        Object.keys(source).forEach(function (key) {
            if (!isMergeableObject(source[key]) || !target[key]) {
                destination[key] = cloneIfNecessary(source[key], optionsArgument)
            } else {
                destination[key] = deepmerge(target[key], source[key], optionsArgument)
            }
        })
        return destination
    }

    function deepmerge(target, source, optionsArgument) {
        var array = Array.isArray(source);
        var options = optionsArgument || {
            arrayMerge: defaultArrayMerge
        }
        var arrayMerge = options.arrayMerge || defaultArrayMerge

        if (array) {
            return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
        } else {
            return mergeObject(target, source, optionsArgument)
        }
    }

    window.SH.ResourceLoader = {
        deepmerge: deepmerge,
        mergeObject: mergeObject,
        defaultArrayMerge: defaultArrayMerge,
        cloneIfNecessary: cloneIfNecessary,
        emptyTarget: emptyTarget,
        isMergeableObject: isMergeableObject,
        hasExtension: hasExtension,
        loadResources: loadResources

    }

    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('shLoaderReady', false, false, undefined);
    document.dispatchEvent(event);
})()