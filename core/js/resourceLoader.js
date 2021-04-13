(function () {
    
    var loadResources = function (files, eventName, doneLoadingCallback) {
        debugger;
        if (!files) files = HomeHub.ResourceLoader.LoadResources;
        if (!eventName) eventName = 'DOMContentLoaded';
        if (loadExtraFiles === undefined) loadExtraFiles = true;
        
        //load CSS
        let loadedCSS = 0
        let CSSFilesToLoad = convertToArray(files);

        CSSFilesToLoad = prepareFiles(CSSFilesToLoad.map(function (lib) {
            if (typeof lib == 'object') {
                lib.src =lib.src;
                return lib;
            }
            return {
                src: lib
            }
        }), true)

        CSSFilesToLoad.forEach(function (file) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = file.src
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
		
        let JSFilesToLoad = convertToArray(files);

        JSFilesToLoad = prepareFiles(JSFilesToLoad.map(function (lib) {
            if (typeof lib == 'object') {
                lib.src = lib.src;
                return lib;
            }
            return {
                src: lib
            }
        }), false)

        if (!location.origin) {
            location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }

        const fullLibSrcs = JSFilesToLoad.map(function (lib) {
            if (lib.src.indexOf('http') == 0)
                return lib.src

            return location.origin + lib.src
        })

        let loadedLibs = 0

        HomeHub.fakeNodeEnvironment = function () {
            window.exports = window.module = {}
            window.module.exports = window.exports
        }

        JSFilesToLoad.forEach(function (lib) {
            loadLib(lib.src, onLibLoaded, lib.params, lib.version)
        })

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
        const version = new Date().getHours()
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
        debugger;
        const filesObject = files.reduce(function (acc, file) {
            const key = file.src.toLowerCase();
            acc[key] = file
            return acc
        }, {})

        const isFunc = css ? isCSS : isJS

        const toAddObject = Object.keys(HomeHub.Loader.FilesToLoad).filter(isFunc).reduce(function (acc, path) {
            acc[path.toLowerCase()] = HomeHub.Loader.FilesToLoad[path]
            if (!acc[path.toLowerCase()].src) {
                acc[path.toLowerCase()].src = path
            }
            return acc
        }, {})
        const FilterFunc = css ? isCSS : function (str) {
            return !isCSS(str)
        }
        const excluded = HomeHub.Loader.PathsToExclude.filter(function (arrayPath) {
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
    
    window.HomeHub.ResourceLoader = {
        hasExtension: hasExtension,
        LoadResources: loadResources
    }

})()