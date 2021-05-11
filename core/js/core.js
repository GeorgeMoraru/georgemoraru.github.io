
    'use strict';

    if (!window.HomeHub) {
        window.HomeHub = {};
    };

    const templateCache = {};

    var isEmail = function (email) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(String(email).toLowerCase());
    };

    // SH.utils.generateEvent("didnotFindTheResultsINeedEvent", document.body, {object});
    function generateEvent(name, targetEl) {
        targetEl = targetEl || document.body;
        const event = new CustomEvent('Event', { detail: arguments });
        event.initEvent(name, true, true);
        targetEl.dispatchEvent(event);
    };

    var compileTemplateAsync = function (templatePath, propertiesObject) {
        return HomeHub.helpers.loadTemplateAsync(templatePath).then(function (templateString) {
            return _.template(templateString)(propertiesObject);
        });
    };

    function promiseResolve(res) {
        return $.Deferred().resolve(res)
    };

    function loadTemplateAsync(path) {
        if (templateCache[path])
            return HomeHub.helpers.PromiseResolve(templateCache[path]);

        return $.get(path).then(function (res) {
            return templateCache[path] = res;
        })
    };


    function promiseAll(jqPromises) {
        return $.when.apply($, jqPromises).then(function () {
            return [].slice.call(arguments)
        })
    }

    function Promise(func) {

        const d = $.Deferred();

        func(d.resolve.bind(d), d.reject.bind(d))

        return d.promise()
    };

    function blobToURL(blob) {
        return new HomeHub.utils.Promise(function (res) {
            const reader = new FileReader()
            reader.onload = function (e) {
                res(e.target.result)
            }
            reader.readAsDataURL(blob)
        })
    };

    function getModuleSettings(module) {
        if (!module || !module.Settings) {
            console.error("Could not load module settings.")
            return null;
        }
        return module.Settings
    };

    var retryWithLimit = function (call) {
        var tries = 0;

        var calling = function () {
            return call().catch(function (xhr) {
                if (xhr.status !== 419) {
                    var def = $.Deferred();
                    return def.reject.apply(def, arguments);
                }

                ++tries;
                if (tries < 3) {
                    return calling();
                } else {
                    console.log("There was an error making the request - retried 3 times");
                    var def = $.Deferred();
                    return def.reject.apply(def, arguments);
                }
            });
        };
        return calling();
    };

    var getParameterByName = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var setHashParameter = function (name, value, url) {
        if (!url) {
            url = window.location.href;
        }
        url = new URL(url);
        var param = getParameterByName(name, url);
        if (param) {
            param = encodeURIComponent(param);
            if (url.search != "") {
                url.search = url.search.replace(name + "=" + param, name + "=" + value);
            } else {
                url.hash = url.hash.replace(name + "=" + param, name + "=" + value);
            }
        } else {
            if (url.search != "") {
                url.search = url.search.replace("?", "?" + name + "=" + value + "&");
            } else {
                if (url.hash == "") {
                    url.hash = name + "=" + value;
                } else {
                    url.hash = url.hash.replace("#", "#" + name + "=" + value + "&");
                }

            }
        }
        url.href = url.href.replace("&&", "&");
        url.href = url.href.replace("?&", "?");
        url.href = url.href.replace("#&", "#");
        return url.href;
    };

    var cleanHashParameter = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        var param = getParameterByName(name, url);
        if (param) {
            url = url.replace(name + "=" + param, "");
        }

        url = url.replace('&&', '&');

        if ((url.lastIndexOf("?") == url.length - 1) || (url.lastIndexOf("#") == url.length - 1)) {
            url = url.substring(0, url.length - 1);
        }

        return url;
    };

    var defer = function (functionToDefer) {
        return function () {
            var currentArg = arguments;

            setTimeout(function () {
                functionToDefer.apply(null, currentArg);
            }, 0);
        }
    };

    var prettifyURL = function (url) {
        var l = document.createElement("a");
        l.href = url;

        var cleanUrl = decodeURIComponent(l.pathname);
        if (cleanUrl === "/") {
            return url;
        }

        var lastSlash = cleanUrl.lastIndexOf("/");
        if (lastSlash < 0) {
            return url;
        }

        var filename = cleanUrl.substring(lastSlash > 0 ? lastSlash : 1);
        var lastDot = filename.lastIndexOf(".");
        if (lastDot > 0) {
            cleanUrl = cleanUrl.substring(0, lastDot + lastSlash);
        }

        var parts = cleanUrl.split('/');

        return parts.join(" &#0155; ");
    };

    var prettifyName = function (name, split) {
        var res = name;

        if (split) {
            res = res.replace(/[A-Z]/g, function (letter) {
                return " " + letter;
            });
        }

        return res.charAt(0).toUpperCase() + res.slice(1);
    };

    var prettifyName = function (name, split) {
        var res = name;

        if (split) {
            res = res.replace(/[A-Z]/g, function (letter) {
                return " " + letter;
            });
        }

        return res.charAt(0).toUpperCase() + res.slice(1);
    };

    function defineProperty(obj, key, value) {
        if (!key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }

    var defineNamespace = function (location, namespace, functions) {
        var functionNamespace = namespace.split('.');
        var fn = location;
        var lastIndexToGo = functionNamespace.length - 1
        for (var i = 0; i < lastIndexToGo; i++) {
            if (fn[functionNamespace[i]] == undefined) {
                fn[functionNamespace[i]] = {};
            }
            fn = fn[functionNamespace[i]];
        }
        if (fn[functionNamespace[lastIndexToGo]] == undefined) {
            fn[functionNamespace[lastIndexToGo]] = functions;
        } else {
            for (var func in functions) {
                fn[functionNamespace[lastIndexToGo]][func] = functions[func];
            }

        }
    }

    var getNamespace = function (location, namespace) {
        var fn = location;
        var functionNamespace = namespace.split(".");
        for (var i = 0; i < functionNamespace.length; i++) {

            if (fn[functionNamespace[i]] == undefined) {
                fn = "";
            } else {
                fn = fn[functionNamespace[i]];
            }
        }
        return fn;
    };

    var generateGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

export {
    compileTemplateAsync as compileTemplateAsync,
    promiseResolve as promiseResolve,
    loadTemplateAsync as loadTemplateAsync,
    promiseAll as promiseAll,
    Promise as Promise,
    blobToURL as blobToURL,
    getParameterByName as getParameterByName,
    getModuleSettings as getModuleSettings,
    generateEvent as generateEvent,
    defer as defer,
    prettifyURL as prettifyURL,
    defineNamespace as defineNamespace,
    setHashParameter as setHashParameter,
    cleanHashParameter as cleanHashParameter,
    getNamespace as getNamespace,
    generateGuid as generateGuid,
    defineProperty as defineProperty,
    prettifyName as prettifyName,
    isEmail as isEmail
};