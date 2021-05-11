
    var loadedCSS = 0;
    var CSSFilesToLoad;

    var loadCss = function (cssFiles) {
        debugger;
        //load CSS

        CSSFilesToLoad = cssFiles.map(function (res) {
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
        };

    };

    var setResources = function (res) {
        debugger;
        if (typeof res == 'object') {
            res.src = res.src;
            return res;
        }
        return {
            src: res
        }
    };  
    
export {
    loadCss as LoadCss
};