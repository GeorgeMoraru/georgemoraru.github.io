(function () {
    'use strict';

    if (!window.SH) {
        window.SH = {};
    };

    const $ = window.SH.$ || window.$;

    var DefaultQueryText = "*";
    const templateCache = {};
    var resolvedTokenTime;
    var resolvedTokenTimeTimeout;
    var cachedUserProfileProperties = [];
    let pendingQueries = [];

    var iconMap = { accdb: { extensions: ["accdb", "mdb"] }, archive: { extensions: ["7z", "ace", "arc", "arj", "dmg", "gz", "iso", "lzh", "pkg", "rar", "sit", "tgz", "tar", "z"] }, audio: { extensions: ["aif", "aiff", "aac", "amr", "au", "awb", "dct", "dss", "dvf", "flac", "gsm", "m4a", "m4p", "mid", "mmf", "mp3", "oga", "ra", "rm", "wav", "wma", "wv"] }, calendar: { extensions: ["ical", "icalendar", "ics", "ifb", "vcs"] }, code: { extensions: ["abap", "ada", "adp", "ahk", "as", "as3", "asc", "ascx", "asm", "asp", "awk", "bash", "bash_login", "bash_logout", "bash_profile", "bashrc", "bat", "bib", "bsh", "build", "builder", "c", "c++", "capfile", "cc", "cfc", "cfm", "cfml", "cl", "clj", "cls", "cmake", "cmd", "coffee", "config", "cpp", "cpt", "cpy", "cs", "cshtml", "cson", "csproj", "css", "ctp", "cxx", "d", "ddl", "di", "disco", "dml", "dtd", "dtml", "el", "emakefile", "erb", "erl", "f", "f90", "f95", "fs", "fsi", "fsscript", "fsx", "gemfile", "gemspec", "gitconfig", "go", "groovy", "gvy", "Hcp", "h", "h++", "haml", "handlebars", "hbs", "hh", "hpp", "hrl", "hs", "htc", "hxx", "idl", "iim", "inc", "inf", "ini", "inl", "ipp", "irbrc", "jade", "jav", "java", "js", "json", "jsp", "jsx", "l", "less", "lhs", "lisp", "log", "lst", "ltx", "lua", "m", "mak", "make", "manifest", "master", "md", "markdn", "markdown", "mdown", "mkdn", "ml", "mli", "mll", "mly", "mm", "mud", "nfo", "opml", "osascript", "p", "pas", "patch", "php", "php2", "php3", "php4", "php5", "phtml", "pl", "pm", "pod", "pp", "profile", "ps1", "ps1xml", "psd1", "psm1", "pss", "pt", "py", "pyw", "r", "rake", "rb", "rbx", "rc", "rdf", "re", "reg", "rest", "resw", "resx", "rhtml", "rjs", "rprofile", "rpy", "rss", "rst", "ruby", "rxml", "s", "sass", "scala", "scm", "sconscript", "sconstruct", "script", "scss", "sgml", "sh", "shtml", "sml", "svn-base", "swift", "sql", "sty", "tcl", "tex", "textile", "tld", "tli", "tmpl", "tpl", "vb", "vi", "vim", "vmg", "webpart", "wsp", "wsdl", "xhtml", "xoml", "xsd", "xslt", "yaml", "yaws", "yml", "zsh"] }, contact: { extensions: ["vcf"] }, csv: { extensions: ["csv"] }, docset: {}, docx: { extensions: ["doc", "docm", "docx", "docb"] }, dotx: { extensions: ["dot", "dotm", "dotx"] }, email: { extensions: ["eml", "msg", "ost", "pst"] }, exe: { extensions: ["application", "appref-ms", "apk", "app", "appx", "exe", "ipa", "msi", "xap"] }, folder: {}, font: { extensions: ["ttf", "otf", "woff"] }, fluid: { extensions: ["b", "fluid"] }, genericfile: {}, html: { extensions: ["htm", "html", "mht"] }, link: { extensions: ["lnk", "link", "url", "website", "webloc"] }, linkedfolder: {}, splist: { extensions: ["listitem"] }, model: { extensions: ["3ds", "3mf", "blend", "cool", "dae", "df", "dwfx", "dwg", "dxf", "fbx", "glb", "gltf", "holo", "layer", "layout", "max", "mtl", "obj", "off", "ply", "skp", "stp", "stl", "t", "thl", "x"] }, mpp: { extensions: ["mpp"] }, mpt: { extensions: ["mpt"] }, multiple: {}, one: { extensions: ["one"] }, onetoc: { extensions: ["ms-one-stub", "onetoc", "onetoc2", "onepkg"] }, pdf: { extensions: ["pdf"] }, photo: { extensions: ["arw", "bmp", "cr2", "crw", "dcr", "dds", "dib", "dng", "erf", "gif", "heic", "heif", "ico", "jfi", "jfif", "jif", "jpe", "jpeg", "jpg", "kdc", "mrw", "nef", "orf", "pct", "pict", "png", "pns", "psd", "raw", "tga", "tif", "tiff", "wdp"] }, photo360: {}, potx: { extensions: ["pot", "potm", "potx"] }, powerbi: { extensions: ["pbids", "pbix"] }, ppsx: { extensions: ["pps", "ppsm", "ppsx"] }, pptx: { extensions: ["ppt", "pptm", "pptx", "sldx", "sldm"] }, presentation: { extensions: ["odp", "gslides", "key"] }, pub: { extensions: ["pub"] }, spo: { extensions: ["aspx"] }, sponews: {}, spreadsheet: { extensions: ["odc", "ods", "gsheet", "numbers"] }, stream: {}, rtf: { extensions: ["epub", "gdoc", "odt", "rtf", "wri", "pages"] }, sharedfolder: {}, sway: {}, sysfile: { extensions: ["bak", "bin", "cab", "cache", "cat", "cer", "class", "dat", "db", "dbg", "dl_", "dll", "ithmb", "jar", "kb", "ldt", "lrprev", "pkpass", "ppa", "ppam", "pdb", "rom", "thm", "thmx", "vsl", "xla", "xlam", "xlb", "xll"] }, txt: { extensions: ["dif", "diff", "readme", "out", "plist", "properties", "text", "txt"] }, vaultclosed: {}, vaultopen: {}, vector: { extensions: ["ai", "cvs", "dgn", "gdraw", "pd", "emf", "eps", "fig", "ind", "indd", "indt", "indb", "ps", "svg", "svgz", "wmf", "oxps", "xps", "xd", "sketch"] }, video: { extensions: ["3g2", "3gp", "3gp2", "3gpp", "asf", "avi", "dvr-ms", "flv", "m1v", "m4v", "mkv", "mod", "mov", "mm4p", "mp2", "mp2v", "mp4", "mpa", "mpe", "mpeg", "mpg", "mpv", "mpv2", "mts", "ogg", "qt", "swf", "ts", "vob", "webm", "wlmp", "wm", "wmv", "wmx"] }, video360: {}, vsdx: { extensions: ["vdx", "vsd", "vsdm", "vsdx", "vsw", "vdw"] }, vssx: { extensions: ["vss", "vssm", "vssx"] }, vstx: { extensions: ["vst", "vstm", "vstx", "vsx"] }, xlsx: { extensions: ["xlc", "xls", "xlsb", "xlsm", "xlsx"] }, xltx: { extensions: ["xlt", "xltm", "xltx"] }, xml: { extensions: ["xaml", "xml", "xsl"] }, xsn: { extensions: ["xsn"] }, zip: { extensions: ["zip"] } };
    var systemIconMap = {
        host: { box: ["app.box.com"], dynamics: [".dynamics.com"], egnyte: [".egnyte.com"], netdocuments: [".netvoyage.com"], onedrive: ["-my.sharepoint.com"], pubchem: ["pubchem.ncbi.nlm.nih.gov"], pubmed: ["ncbi.nlm.nih.gov"], salesforce: [".salesforce.com"], servicenow: [".service-now.com"], sharepoint: [".sharepoint.com"], teams: ["teams.microsoft.com"], workplace: ["workplace.facebook.com"], yammer: [".yammer.com"] },
        href: { alfresco: ["share/page/document-details?nodeRef"], confluence: [".com/display/"], fileshare: ["file://"], filenet: ["/navigator/bookmark.jsp"], opentext: ["/otcs/"] },
        contentSource: { alfresco: ["alfresco"], box: ["box"], confluence: ["confluence"], documentum: ["documentum"], dynamics: ["dynamics"], egnyte: ["egnyte"], fileshare: ["fileshare"], filenet: ["filenet"], imanage: ["imanage"], netdocuments: ["netdocuments", "netdocs"], onedrive: ["onedrive"], opentext: ["ibm", "opentext"], pubchem: ["pubchem"], pubmed: ["pubmed"], salesforce: ["salesforce"], servicenow: ["servicenow"], sharepoint: ["sharepoint"], teams: ["teams"], workplace: ["workplace", "facebook"], yammer: ["yammer"] }
    };

    var cancelPendingQueries = function (sourceName) {
        if (!sourceName) return false;
        if (pendingQueries[sourceName]) {
            if (pendingQueries[sourceName].readyState != 4) {
                pendingQueries[sourceName].abort();
            }
            pendingQueries[sourceName] = undefined;
            return true;
        }
        return false;

    }
    var getSuggestionsFromResponse = function (response) {
        var suggestions = [];

        if (response && response.completions) {
            for (var i = 0; i < response.completions.length; i++) {
                var rawSuggestion = response.completions[i];

                var suggestion = {
                    "Value": rawSuggestion.expression,
                    "Query": rawSuggestion.expression
                };

                suggestions.push(suggestion);
            }
        }

        return suggestions;
    };

    var getRefinersFromResponse = function (response) {
        if (!response || !response.groupByResults) return [];

        return response.groupByResults; // this already has an acceptable format so we will not covert into an internal wrapper object
    };

    var getDocumentsFromResponse = function (response, properties) {
        var results = [];
        if (!response || !response.results) return results;

        response.results
            .filter(function (r) {
                return !r.isError;
            })
            .map(function (result) {
                const person = {};

                Object.values(properties).forEach(function (prop) {
                    person[prop] = result[prop] || "";
                });

                results.push(person);
            });

        return results;
    };

   var buildQueryObject = function (lastQuery, queryText, queryTemplate, resultSourceId, requestedRefiners, fieldsToInclude, numberOfResults, excerptLength, startRow, sortCriteria) {
        var query = {
            q: "*",
            groupBy: [],
            tab: ""
        };

        if (lastQuery) {
            query = JSON.parse(JSON.stringify(lastQuery));
        }

        var el = document.querySelector(".CoveoSearchInterface");
        var searchInterface = Coveo.get(el, "SearchInterface")

        var queryBuilder = searchInterface.queryController.createQueryBuilder({
            isInternalQuery: true
        });

        query.advancedExpression = queryBuilder.advancedExpression.getParts();
        query.constantExpression = queryBuilder.constantExpression.getParts();
        query.longQueryExpression = queryBuilder.longQueryExpression.getParts();
        query.disjunctionExpression = queryBuilder.disjunctionExpression.getParts();

        if (queryText) {
            query.q = queryText;
        }

        if (queryTemplate) {
            query.cq = queryTemplate;
        }

        if (resultSourceId) {
            query.tab = resultSourceId;
        }

        requestedRefiners = requestedRefiners || []
        query.groupBy = [];

        requestedRefiners.forEach(function (field) {
            query.groupBy.push({
                field: '@' + field
            });
        });

        if (excerptLength !== undefined && excerptLength !== null) {
            query.excerptLength = excerptLength;
        }

        if (fieldsToInclude) {
            query.fieldsToInclude = [];

            fieldsToInclude.forEach(function (key) {
                query.fieldsToInclude.push(key);
            });

            query.numberOfResults = numberOfResults;
        }
		if (startRow) {
			query.firstResult = startRow;
		}
		
		if (sortCriteria) {
			query.sortCriteria = sortCriteria.Direction === "ascending" ? "fieldascending" : "fielddescending";
			query.sortField = sortCriteria.Property;
		}

        return query;
    };

     var buildParameters = function (query, numberOfSuggestions, sourceName, queryFieldsForTypeAhead) {
        var PreferredLanguage = "en-US";
        if (localStorage.getItem('PreferredLanguage')) {
            PreferredLanguage = localStorage.getItem('PreferredLanguage');
        }
        var parameters = {
            q: query,
            numberOfQuerySuggestions: numberOfSuggestions,
            enableWordCompletion: false,
            language: "en",
            source: sourceName,
            preferredLanguage: PreferredLanguage,
            queryFields: queryFieldsForTypeAhead
        };

        return parameters;
    }

    var getFederatorSuggestions = function (query, numberOfSuggestions, sourceName, queryFieldsForTypeAhead) {
        var queryController = SH.SearchProvider.GetMainSearchInterface().queryController;
        cancelPendingQueries(sourceName);
        var parameters = buildParameters(query, numberOfSuggestions, sourceName, queryFieldsForTypeAhead);
        var suggestionsDeferred = new $.Deferred();
        var endpointToUse = queryController.getEndpoint();
        var promise = endpointToUse.getRevealQuerySuggest(parameters);
        if (sourceName) {
            pendingQueries[sourceName] = endpointToUse.getXmlHttpRequest();
        }
        promise.then(function (response) {
            var suggestions = getSuggestionsFromResponse(response);
            suggestionsDeferred.resolve(suggestions);
        }).catch(function () { });

        return suggestionsDeferred.promise();
    };

    var getLearnToRankSuggestions = function (query, numberOfSuggestions, sourceName) {
        var queryController = SH.SearchProvider.GetMainSearchInterface().queryController;
        cancelPendingQueries(sourceName);
        var parameters = buildParameters(query, numberOfSuggestions, sourceName);
        var suggestionsDeferred = new $.Deferred();

        var endpointToUse = queryController.getEndpoint();
        var promise = endpointToUse.getLearnToRankQuerySuggest(parameters);
        if (sourceName) {
            pendingQueries[sourceName] = endpointToUse.getXmlHttpRequest();
        }
        promise.then(function (response) {
            var suggestions = getSuggestionsFromResponse(response);
            suggestionsDeferred.resolve(suggestions);
        }).catch(function () { });

        return suggestionsDeferred.promise();
    }

    var triggerSearch = function (queryText, dataTabId, refiners, lookupValues, queryLabel) {
        var el = document.querySelector(".CoveoSearchInterface");
        var searchInterface = Coveo.get(el, "SearchInterface");
        var preferredLanguage = localStorage.getItem("PreferredLanguage");

        if (searchInterface && searchInterface.options.searchPageUri === "_SELF_" && SH.Integrations && SH.Integrations.RunQuery) {
            SH.Integrations.RunQuery(queryText);
            return;
        }

        if (refiners) {

            if (refiners["RefinerType"] === 'Slider Facet' || refiners["RefinerType"] === "FacetSlider") {
                searchInterface.queryStateModel.attributes[refiners["RefinerName"] + ':range'] = lookupValues[0];
            } else {
                if (refiners["RefinerType"] !== 'unknown') {
                    searchInterface.queryStateModel.attributes[refiners["RefinerName"]] = [];
                    searchInterface.queryStateModel.attributes[refiners["RefinerName"] + ':lookupvalues'] = {};
                }
            }

            if (refiners["RefinerValues"]) {
                if (refiners["RefinerType"] !== 'Slider Facet' && refiners["RefinerType"] !== "FacetSlider" && refiners["RefinerType"] !== 'unknown') {
                    searchInterface.queryStateModel.set(refiners["RefinerName"], refiners["RefinerValues"]);
                    if (lookupValues) {
                        searchInterface.queryStateModel.set(refiners["RefinerName"] + ':lookupvalues', lookupValues);
                    }
                }
            }

        }

        searchInterface.queryStateModel.set("q", queryText);
        searchInterface.queryStateModel.set("ql", queryLabel || queryText);
        if (dataTabId) {

            var tabOptions = getCoveoTabOptions(dataTabId);
            if (tabOptions) {
                searchInterface.queryStateModel.set("t", tabOptions.id);
                searchInterface.queryStateModel.set("tId", tabOptions.tabId);
            }

        }

        searchInterface.queryController.executeQuery();
    };

    var getCoveoTabOptions = function (dataTabId) {
        var mainSearchInterface = SH.SearchProvider.GetMainSearchInterface();
        var tabs = mainSearchInterface.attachedComponents.Tab;

        for (var i = 0; i < tabs.length; i++) {
            var tabOptions = tabs[i].options;

            if (tabOptions.tabId === dataTabId) {
                return tabOptions;
            }
        }

        return null;
    };

    var isLandingPage = function () {
        var isLanding = false;

        var coveoScript = document.getElementById('CoveoScript');
        if (coveoScript) {
            isLanding = coveoScript.getAttribute('data-page-type') === "index";
        }

        return isLanding;
    }

    var getRefiners = function (queryText, queryTemplate, refiners, forceNewQuery, sourceName) {
        var queryController = SH.SearchProvider.GetMainSearchInterface().queryController;
        cancelPendingQueries(sourceName);
        var lastQuery;
        if (forceNewQuery || !queryController.lastQuery) {
            lastQuery = queryController.createQueryBuilder({ isInternalQuery: true }).build();
        }
        else {
            lastQuery = queryController.lastQuery;
        }

        var query = buildQueryObject(lastQuery, queryText, queryTemplate, null, refiners, [], 1, 0);
        query.source = sourceName;
        var endpointToUse = queryController.getEndpoint();
        var refinersDeferred = new $.Deferred();
        var promise = endpointToUse.search(query);
        if (sourceName) {
            pendingQueries[sourceName] = endpointToUse.getXmlHttpRequest();
        }
        promise.then(function (response) {
            var refiners = getRefinersFromResponse(response);
            curateManagedProperties(refiners);
            refinersDeferred.resolve(refiners);
        }).catch(function () { });

        return refinersDeferred.promise();
    };

    var getAppliedRefiners = function () {
        var el = document.querySelector(".CoveoSearchInterface");
        var searchInterface = Coveo.get(el, "SearchInterface")

        var lastQuery = searchInterface.queryController.lastQuery || searchInterface.queryController.createQueryBuilder({
            isInternalQuery: true
        }).build();

        return lastQuery.advancedExpression;
    };

    var isEmail = function (email) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(String(email).toLowerCase());
    }

    var getDocuments = function (queryText, queryTemplate, resultSource, properties, numberOfDocumentsRequired, sourceName, startRow, sortCriteria, includeTotalCount) {
        var queryController = SH.SearchProvider.GetMainSearchInterface().queryController;
        cancelPendingQueries(sourceName);
        var deffered = new $.Deferred();
        var lastQuery = queryController.lastQuery || queryController.createQueryBuilder({ isInternalQuery: true }).build();
        var query = buildQueryObject(lastQuery, queryText, queryTemplate, resultSource, undefined, Object.values(properties), numberOfDocumentsRequired, undefined, startRow, sortCriteria);
        query.source = sourceName;
        query.sortCriteria = sortCriteria ? sortCriteria : query.sortCriteria;
        var endpointToUse = queryController.getEndpoint();
        var promise = endpointToUse.search(query);
        if (sourceName) {
            pendingQueries[sourceName] = endpointToUse.getXmlHttpRequest();
        }
        promise.then(function (response) {
            if (includeTotalCount) {
                deffered.resolve({ results: getDocumentsFromResponse(response, properties), totalCount: response.totalCountFiltered });
            }
            else {
                deffered.resolve(getDocumentsFromResponse(response, properties));
            }
        }).catch(function () { });

        return deffered.promise();
    };

    var getRequiredFields = function (){
        var queryController = SH.SearchProvider.GetMainSearchInterface().queryController;
        var requiredFields = queryController.lastQueryBuilder != undefined ? queryController.lastQueryBuilder.requiredFields:[];
        return requiredFields;
    }

    var getMainSearchInterface = function () {
        return this.get($('.CoveoSearchInterface')[0], 'SearchInterface');
    };

    var getSearchInterface = function (element) {
        return this.get($(element)[0], 'SearchInterface');
    };

    var getResultLists = function (searchInterface) {
		if (!searchInterface) {
            searchInterface = SH.SearchProvider.GetMainSearchInterface();
        }

        return searchInterface.getComponents('ResultList');
    };

    var getMainSearchBoxes = function (searchInterface) {
        return searchInterface.getComponents('Searchbox');
    };


    var getFacets = function (searchInterface) {
        var facets = [];
        var normalFacets = searchInterface.getComponents('Facet');
        var sliderFacets = searchInterface.getComponents('FacetSlider');
        var hierarchicalFacets = searchInterface.getComponents('HierarchicalFacet');

        for (let i = 0; i < normalFacets.length; i++) {
            facets.push(normalFacets[i]);
        }
        for (let i = 0; i < sliderFacets.length; i++) {
            facets.push(sliderFacets[i]);
        }
        for (let i = 0; i < hierarchicalFacets.length; i++) {
            facets.push(hierarchicalFacets[i]);
        }

        return facets;
    };

    var getResultLayout = function (searchInterface) {
        return searchInterface.getComponents('ResultLayout');
    };

    var getSARecommandations = function (userProfileProperties, stageConfiguration, queryConfiguration) {
        var index = pax.path.lastIndexOf("/Scripts/");
        var url = pax.path.substring(0, index) + "/_bai/Analytics/ResultsRecommendations";
		
		return SH.utils.GetSecurityToken().then(function (securityToken) {
			return $.ajax({
				url: url,
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify({
					SecurityContext: securityToken,
					UserProfileProperties: userProfileProperties,
					ConfigurationJson: JSON.stringify(stageConfiguration),
					QueryConfiguration: JSON.stringify(queryConfiguration)
				}),
				dataType: "text",
				crossDomain: true,
				success: function (data) {
					resolve(data);
				},
				error: function (error) {
					reject(error);
				}
			});
		});
    };

    function curateManagedProperties(refiners) {
        if (!refiners)
            return

        refiners.forEach(function (refiner) {
            if (!refiner.values)
                return

            refiner.values = refiner.values
                .filter(shouldKeepRefinerValue)
                .map(curateManagedProperty)
        })
    }

    function shouldKeepRefinerValue(val) {
        if (val.value.startsWith('GTSet|#') ||
            val.value.startsWith('GPP|#') ||
            val.value.startsWith('GP0|#'))
            return false

        return true
    }

    function curateManagedProperty(ref) {

        if (ref.value.startsWith('L0|#')) {
            ref.value = ref.value.substr(ref.value.lastIndexOf('|') + 1);
        }

        return ref;
    }

    function generateEvent(name, targetEl) {
        targetEl = targetEl || document.body;
        const event = new CustomEvent('Event', { detail: arguments });
        event.initEvent(name, true, true);
        targetEl.dispatchEvent(event);
    }

    var GetSecurityToken = function () {
        return SH.utils.Promise(function (resolve, reject) {
            if (config !== undefined && config.authMode !== "None" && window['authClient']) {
                var allAccounts = authClient.getAllAccounts();
                var loggedInAccount = allAccounts[0];
                var requestedScopes = config['scopes'] ? config['scopes'] : ["openid", "profile"]
                var tokenRequest = {
                    scopes: requestedScopes,
                    account: loggedInAccount
                };
                authClient.acquireTokenSilent(tokenRequest)
                    .then(function (resp) {
                        var token = resp["idToken"];
                        resolve(token);
                        var ev = new CustomEvent("tokenAquired");
                        document.dispatchEvent(ev);
                    })
                    .catch(function (error) {
                        //Throw sessionExpired event so that other modules can catch it when it happens
						authClient.browserStorage.clear();
                        handleIframe(error);
                        var ev = new CustomEvent("sessionExpired", { detail: error });
                        document.dispatchEvent(ev);
                        localStorage.removeItem('SHLoginRetryCount');
                        localStorage.removeItem("tokenLastCheck");
                        clearTimeout(resolvedTokenTimeTimeout);
                        resolvedTokenTimeTimeout = null;
                        return;
                    });
            }
            else {
                resolve(""); //No authentication
            }
        }).then(function (resolvedToken) {
            localStorage.setItem("tokenLastCheck", new Date().getTime());
            return resolvedToken;
        });
    };

    var handleIframe = function (error) {
        if (error.errorCode != "redirect_in_iframe") {
            console.log(error);
            return;
        }
        var message = encodeURIComponent("Session expired. Please refresh the SmartHub Administration page");
        window.location = '/Error.aspx?error=' + message;
    }
    
    var compileTemplateAsync = function (templatePath, propertiesObject) {
        return SH.utils.loadTemplateAsync(templatePath).then(function (templateString) {
            return SH._.template(templateString)(propertiesObject);
        });
    };

    function PromiseResolve(res) {
        return $.Deferred().resolve(res)
    };

    function loadTemplateAsync(path) {
        if (templateCache[path])
            return SH.utils.PromiseResolve(templateCache[path]);

        return $.get(path).then(function (res) {
            return templateCache[path] = res;
        })
    };


    function PromiseAll(jqPromises) {
        return $.when.apply($, jqPromises).then(function () {
            return [].slice.call(arguments)
        })
    }

    function Promise(func) {

        const d = $.Deferred();

        func(d.resolve.bind(d), d.reject.bind(d))

        return d.promise()
    }

    function blobToURL(blob) {
        return new SH.utils.Promise(function (res) {
            const reader = new FileReader()
            reader.onload = function (e) {
                res(e.target.result)
            }
            reader.readAsDataURL(blob)
        })
    }

    var notifyQueryHasChanged = function () {
        document.body.CoveoSearchInterface.queryStateModel.attributeHasChangedEvent(
            'q'
        );
        document.body.CoveoSearchInterface.queryStateModel.attributesHasChangedEvent();
        document.body.CoveoSearchInterface.queryStateModel.anyEvent();
    };

    function getModuleSettings(settingsFile) {
        return JSON.parse(JSON.stringify(settingsFile));
    };

    function getMergedModuleSettings(module) {
        if (!module || !module.DefaultSettings) {
            console.error("Could not load module settings. Make sure you have defined DefaultSettings for your module. Ex: SH.MyModule.DefaultSettings")
            return null;
        }

        return SH.mergeWithExclude(module.DefaultSettings, module.CustomSettings || {}, module.PathsToExclude || []);
    };

    var defaultPageOverrides = function (moduleName, module) {
        var currentPage = window.location.pathname;
        
        if(SH.PageOverrides[currentPage] && SH.PageOverrides[currentPage][moduleName]){
           var settingsToOverride = SH.PageOverrides[currentPage][moduleName];
           Object.keys(settingsToOverride).forEach(function (key) {
                module.DefaultSettings[key] = settingsToOverride[key];
           });
        }
    }


    var initializeServiceEndpoints = function (elementId) {
        var script = document.getElementById(elementId);

        var searchUri = script.getAttribute("data-search-uri") || '/Services/FederatorService.svc';
        var userProfileUri = script.getAttribute("data-userprofile-uri") || '/Services/UserProfileService.svc';
        var botUri = script.getAttribute("data-bothelper-uri") || '/Services/HelperBotService.svc';
        var spellCheckUri = script.getAttribute("data-spellcheck-uri") || '/Services/SpellCheckService.svc';
        var analyticsUri = script.getAttribute("data-analytics-uri") || '/_bai/Analytics';
        var backendsUri = script.getAttribute("data-backends-uri") || '/_bai/backends';
        var filesUri = script.getAttribute("data-files-uri") || '/_bai/files';
        var settingsUri = script.getAttribute("data-settings-uri") || '/_bai/settings';
        var pageEditorUri = "/integrations/editor/Editor.html";
        var integrationUri = script.getAttribute("data-integration-uri") || '/_integration';
        var smartAutomationsUri = script.getAttribute("data-smartautomations-uri") || '/_bai/integration/appbus/list';
        var alertsUri = "/services/AlertsService.svc/initAlerts";

        window.SH.ServiceAddresses = window.SH.ServiceAddresses || {};
        window.SH.ServiceAddresses.UserProfileService = userProfileUri;
        window.SH.ServiceAddresses.SearchService = searchUri;
        window.SH.ServiceAddresses.SpellCheckService = spellCheckUri;
        window.SH.ServiceAddresses.BotService = botUri;
        window.SH.ServiceAddresses.AnalyticsService = analyticsUri;
        window.SH.ServiceAddresses.FileService = filesUri;
        window.SH.ServiceAddresses.SettingsService = settingsUri;
        window.SH.ServiceAddresses.PageEditor = pageEditorUri;
        window.SH.ServiceAddresses.BackendsService = backendsUri;
        window.SH.ServiceAddresses.AlertsService = alertsUri;

        window.SH.ServiceAddresses.IntegrationService = integrationUri;
        window.SH.ServiceAddresses.SmartAutomationsService = smartAutomationsUri;
    };


    var userPicture = function (data) {
        var userName = '';
        if (data !== undefined) {
            userName = '?userName=' + encodeURIComponent(data);
        }
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.UserProfileService + "/GetUserPicture";

                return $.ajax({
                    url: url + userName,
                    type: "GET",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    data: data,
                    xhrFields: {
                        responseType: "blob"
                    },
                    crossDomain: true
                });
            });
        });
    };

    var userProfileSetProperties = function (data) {

        var serializedData = null;

        if (data) {
            serializedData = JSON.stringify(data);
        }

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.UserProfileService + "/SetUserProfileProperties";

                return $.ajax({
                    type: "POST",
                    url: url,
                    headers: {
                        'X-SH-Authorization': " Bearer " + token
                    },
                    contentType: "application/json;charset=utf-8",
                    processData: false,
                    data: serializedData
                });
            });
        });
    };

    var userProfileGetProperties = function (data) {
        var serializedData = null;
        var key = "all";
        var shouldCache = true;

        if (data) {
            shouldCache = !data.personalizedStoreOnly || data.personalizedStoreOnly == false
            serializedData = JSON.stringify(data);
            key = serializedData;
        }
        if (shouldCache) {
            if (cachedUserProfileProperties[key]) {
                return new Promise(function (resolve) {
                    resolve(cachedUserProfileProperties[key]);
                });
            }
        }

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.UserProfileService + "/GetUserProfileProperties";
                return $.ajax({
                    url: url,
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    data: serializedData,
                    dataType: "json",
                    crossDomain: true,
                    success: function (data) {
                        cachedUserProfileProperties[key] = data;
                    }
                });
            });
        });
    };

    var userProfileGetBatchProperties = function (data) {
        var serializedData = null;
        var key = "all";
        if (data) {
            serializedData = JSON.stringify(data);
            key = serializedData;
        }

        if (cachedUserProfileProperties[key]) {
            return new Promise(function (resolve) {
                resolve(cachedUserProfileProperties[key]);
            });
        }
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.UserProfileService + "/GetBatchUserProfileProperties";
                return $.ajax({
                    url: url,
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    data: serializedData,
                    dataType: "json",
                    crossDomain: true,
                    success: function (data) {
                        cachedUserProfileProperties[key] = data;
                    }
                });
            });
        });
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

    var verifyUserQuestion = function (queryText, queryObject) {

        var serializedData = JSON.stringify({
            question: queryText,
            query: queryObject
        });

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                return $.ajax({
                    type: "POST",
                    url: window.SH.ServiceAddresses.BotService + "/VerifyUserQuestion",
                    headers: {
                        'X-SH-Authorization': " Bearer " + token
                    },
                    contentType: "application/json;charset=utf-8",
                    processData: false,
                    data: serializedData
                });
            });
        });
    };

    var addDelayedAnswerQuestion = function (queryText, intent, searchPage) {

        var serializedData = JSON.stringify({
            question: queryText,
            intent: intent,
            querySearchPage: searchPage
        });

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                return $.ajax({
                    type: "POST",
                    url: window.SH.ServiceAddresses.BotService + "/AddQuestionForDelayedAnswer",
                    headers: {
                        'X-SH-Authorization': " Bearer " + token
                    },
                    contentType: "application/json;charset=utf-8",
                    processData: false,
                    data: serializedData
                });
            });
        });
    };

    var guidedRefinement = function (conversationState) {

        var serializedData = JSON.stringify({
            conversationState: conversationState
        });

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                return $.ajax({
                    type: "POST",
                    url: window.SH.ServiceAddresses.BotService + "/GuidedRefinementResponse",
                    headers: {
                        'X-SH-Authorization': " Bearer " + token
                    },
                    contentType: "application/json;charset=utf-8",
                    processData: false,
                    data: serializedData
                });
            });
        });
    };

    var getItemTemplate = function (itemId, queryText, queryObject) {

        var serializedData = JSON.stringify({
            itemId: itemId,
            query: queryObject,
            queryText: queryText
        });

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                return $.ajax({
                    type: "POST",
                    url: window.SH.ServiceAddresses.BotService + "/getItemTemplateResponse",
                    headers: {
                        'X-SH-Authorization': " Bearer " + token
                    },
                    contentType: "application/json;charset=utf-8",
                    processData: false,
                    data: serializedData
                });
            });
        });
    }

    var processUserQuestion = function (queryObject, payload, useStm) {

        var data = {
            query: queryObject
        };

        if (useStm) {
            data.context = payload;
        } else {
            data.question = payload;
        }

        var serializedData = JSON.stringify(data);

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                return $.ajax({
                    type: "POST",
                    url: window.SH.ServiceAddresses.BotService + "/PrelucrateUserQuestion" + (useStm ? "WithStm" : ""),
                    headers: {
                        'X-SH-Authorization': " Bearer " + token
                    },
                    contentType: "application/json;charset=utf-8",
                    processData: false,
                    data: serializedData
                });
            });
        });
    };

    var deleteUserQuestion = function (data) {

        var serializedData = null;

        if (data) {
            serializedData = JSON.stringify(data);
        }

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.BotService + "/deleteUserQuestion";

                return $.ajax({
                    url: url,
                    type: "POST",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    contentType: "application/json;charset=utf-8",
                    processData: false,
                    data: serializedData
                });
            });
        });
    };

    var getUserQuestions = function (data) {

        var serializedData = null;

        if (data) {
            serializedData = JSON.stringify(data);
        }

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.BotService + "/getQuestions";

                return $.ajax({
                    url: url,
                    type: "POST",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    dataType: "json",
                    contentType: "application/json",
                    data: serializedData
                });
            });
        });
    };

    var updateUserQuestion = function (data) {

        var serializedData = null;

        if (data) {
            serializedData = JSON.stringify(data);
        }

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.BotService + "/updateUserQuestion";

                return $.ajax({
                    url: url,
                    type: "POST",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    contentType: "application/json",
                    processData: false,
                    data: serializedData
                });
            });
        });
    };

    var objectToFormData = function (obj, rootName, ignoreList) {
        var formData = new FormData();

        var appendFormData = function (data, root) {
            if (!ignore(root)) {
                root = root || '';
                if (data && data.files && data.files instanceof FileList) {
                    for (var i = 0; i < data.files.length; i++) {
                        var name = root + '[' + i + ']';
                        if (data.files.length == 1) {
                            name = root;
                        }
                        appendFormData(data.files[i], name);
                    }
                } else if (data instanceof File) {
                    formData.append(root, data);
                } else if (Array.isArray(data)) {
                    for (var i = 0; i < data.length; i++) {
                        appendFormData(data[i], root + '[' + i + ']');
                    }
                } else if (typeof data === 'object' && data) {
                    if (root === '') {
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                if (root === '') {
                                    appendFormData(data[key], key);
                                } else {
                                    appendFormData(data[key], root + '.' + key);
                                }
                            }
                        }
                    } else {
                        formData.append(root, JSON.stringify(data));
                    }
                } else {
                    if (data !== null && typeof data !== 'undefined') {
                        formData.append(root, data);
                    }
                }
            }
        }

        var ignore = function (root) {
            return Array.isArray(ignoreList) && ignoreList.some(function (x) { return x === root; });
        }

        appendFormData(obj, rootName);

        return formData;
    }

    var runIntegration = function (method, integrationProvider, integrationParams, queryString, body, multiPart, headers) {
        var useJson = !multiPart;
        var notGet = method.toLowerCase() !== "get";

        if (window.PAX_SmartAutomationsModule) {
            generateEvent('SmartAutomationsEvent', document.body, {
                "SmartAutomations_Method": method,
                "SmartAutomations_Provider": integrationProvider,
                "SmartAutomations_Parameters": integrationParams,
                "SmartAutomations_QueryString": queryString,
                "SmartAutomations_RequestData": body,
                "IsMultiPart": multiPart,
                "SmartAutomations_Headers": headers
            });
        }

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {

                if (integrationParams.charAt(0) === '/') {
                    integrationParams = integrationParams.substring(1);
                }

                var url = window.SH.ServiceAddresses.IntegrationService + "/" + integrationProvider + "/" + integrationParams + (queryString ? "?" + queryString : "");
                headers = headers || {};
                headers['X-SH-Authorization'] = 'Bearer ' + token;

                return $.ajax({
                    url: url,
                    type: method,
                    processData: useJson,
                    contentType: useJson ? "application/json" : false,
                    headers: headers,
                    data: (notGet && body) ? (multiPart ? objectToFormData(body) : JSON.stringify(body)) : undefined
                });
            });
        });
    };

    var runPostIntegration = function (integrationProvider, integrationParams, postData, headers) {
        return runIntegration("POST", integrationProvider, integrationParams, undefined, postData, false, headers);
    };

    var runGetIntegration = function (integrationProvider, integrationParams, queryString, headers) {
        return runIntegration("GET", integrationProvider, integrationParams, queryString, undefined, false, headers);
    };

    var runMultiPartPostIntegration = function (integrationProvider, integrationParams, postData, headers) {
        return runIntegration("POST", integrationProvider, integrationParams, undefined, postData, true, headers);
    };

    var spellCheck = function (data) {

        var serializedData = null;

        if (data) {
            serializedData = JSON.stringify(data);
        }

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.SpellCheckService + "/SpellCheckText";

                return $.ajax({
                    url: url,
                    type: "POST",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    contentType: "application/json",
                    data: serializedData,
                    dataType: "json"
                });
            });
        });
    };

    var getByRelativeUrl = function(path){
        var data = "relativePath=" + encodeURIComponent(path);
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.FileService;
                return $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    data: data,
                    crossDomain: true
                });
            });
        });
    }

    var getPages = function(){
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.FileService+"/getpages";
                return $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    crossDomain: true
                });
            });
        });
    }

    // window.SH.ServiceAddresses.BackendsService
    var getAllBackends = function(){
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.BackendsService;
                return $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    crossDomain: true
                });
            });
        });
    }

    var initAlerts = function(){
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.AlertsService;
                return $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    crossDomain: true
                });
            });
        });
    }

    var createPage = function(relativePath, pageType){
        var data = "?relativePath=" + encodeURIComponent(relativePath) + "&type=" + pageType;
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.FileService + "/createPage";
                return $.ajax({
                    type: "POST",
                    url: url+data,
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': " Bearer " + token
                    },
                    crossDomain: true
                });
            });
        });
    }

    var setAtRelativeUrl = function(relativePath,pageContent){
        relativePath = "?relativePath=" + encodeURIComponent(relativePath);
        return SH.utils.GetSecurityToken().then(function (token) {
            var url = window.SH.ServiceAddresses.FileService;
            return $.ajax({
                type: "POST",
                url: url+relativePath,
                headers: {
                    'X-SH-Authorization': " Bearer " + token
                },
                contentType: "application/json",
                data: JSON.stringify(pageContent),
                crossDomain: true
            });
        });
    }

    var getPageSettings = function(path){
        var data = "";
        if (path) {
            data = "?url=" + encodeURIComponent(path);
        }
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.SettingsService+data;
                return $.ajax({
                    url: url,
                    type: "GET",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    crossDomain: true
                });
            });
        });
    }

    var setPageSettings = function(relativePath,pageContent){
        relativePath = "?relativePath=" + encodeURIComponent(relativePath);
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.SettingsService;
                return $.ajax({
                    url: url+relativePath,
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    data: JSON.stringify(pageContent),
                    crossDomain: true
                });
            });
        });
    }

    var setPageTheme = function (relativePath, pageContent, overrideCSS) {
        if (relativePath) {
            relativePath = "?relativePath=" + encodeURIComponent(relativePath);
        } else{
            relativePath = "";
        }
        if(overrideCSS != undefined){
            overrideCSS = "&overrideCSS="+overrideCSS;
        } else{
            overrideCSS = "";
        }
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.SettingsService+"/settheme";
                return $.ajax({
                    url: url + relativePath + overrideCSS,
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    data: JSON.stringify(pageContent),
                    crossDomain: true
                });
            });
        });
    }

    var getPageTheme = function(relativePath){
        if(relativePath){
            relativePath = "?url=" + encodeURIComponent(relativePath);
        } else{
            relativePath = "";
        }

        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.SettingsService+"/gettheme";
                return $.ajax({
                    url: url+relativePath,
                    type: "GET",
                    contentType: "text/css",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    crossDomain: true
                });
            });
        });
    }

    var needsUpgrade = function(path){
        var data = "relativePath=" + encodeURIComponent(path);
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.SettingsService + "/needsupgrade";
                return $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    data: data,
                    crossDomain: true
                });
            });
        });
    }

    var upgrade = function(path){
        var data = "relativePath=" + encodeURIComponent(path);
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                var url = window.SH.ServiceAddresses.SettingsService + "/upgrade";
                return $.ajax({
                    url: url,
                    type: "GET",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    data: data,
                    crossDomain: true
                });
            });
        });
    }

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

    var setHashParameter = function(name,value, url){
        if (!url) {
            url = window.location.href;
        }
        url = new URL(url);
        var param = SH.utils.getParameterByName(name,url);
        if (param) {
            param = encodeURIComponent(param);
            if (url.search != "") {
                url.search = url.search.replace(name + "=" + param, name + "=" + value);
            } else {
                url.hash = url.hash.replace(name + "=" + param, name + "=" + value);
            }
        } else {
            if(url.search != ""){
                url.search = url.search.replace("?", "?" + name + "=" + value + "&");
            } else{
                if(url.hash == ""){
                    url.hash = name+"="+value;
                } else {
                    url.hash = url.hash.replace("#", "#" + name + "=" + value + "&");
                }

            }
        }
        url.href = url.href.replace("&&","&");
        url.href =url.href.replace("?&","?");
        url.href =url.href.replace("#&","#");
        return url.href;
    }

    var cleanHashParameter = function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        var param = SH.utils.getParameterByName(name, url);
        if (param) {
            url = url.replace(name + "=" + param, "");
        }

        url = url.replace('&&', '&');

        if ((url.lastIndexOf("?") == url.length - 1) || (url.lastIndexOf("#") == url.length - 1)) {
            url = url.substring(0, url.length - 1);
        }

        return url;
    }

    var handleExternalQueryRedirect = function () {
        var spQuery = window.SH.utils.getParameterByName("k");
        var currentQuery = getParameterByName("q", window.location.hash);
        if (spQuery && !currentQuery) {
            window.location.hash += "&q=" + spQuery;
        }
    };

    var handlePopupCallback = function (err) {
        if (!err) {
            window.location = window.SH.utils.getParameterByName("redirectUri");
        } else {
            window.top.postMessage({ type: 'SH', msg: { type: 'SHUserClosedPopup' } }, '*');
            window.location = '/Error.aspx?error=' + encodeURIComponent(err);
        }
    }

    var defer = function (functionToDefer) {
        return function () {
            var currentArg = arguments;

            setTimeout(function () {
                functionToDefer.apply(null, currentArg);
            }, 0);
        }
    };



    function showNotification(message, options) {
        options = options || {};
        if (!("Notification" in window) || Notification.permission === "denied" || options.useNonNative) {
            if (!options.customTypes) {
                options.customTypes = [{ type: "info", background: "var(--secondary-color)", icon: { className: "fas fa-info", tagName: "i", text: "info" } }];
            }
            var notyf = new Notyf({ position: { x: options.horizontalPos || 'right', y: options.verticalPos || 'top' }, duration: options.duration || 3000, dismissible: options.dismissable || true, ripple: false, types: options.customTypes });
            notyf.open(notyf.normalizeOptions(options.type || "info", (options.title ? (options.title + "<br/>") : "") + message))
        } else if (Notification.permission === "granted") {
            options.body = message;
            new Notification(options.title || document.title, options);
        } else {
            Notification.requestPermission().then(function (permission) {
                if (permission == "default") {
                    options.useNonNative = true;
                }
                showNotification(message, options);
            });
        }
    };

    var makeEditableForm = function (containerSelector, saveButtonSelector) {
        SH.$.fn.editableform.buttons = "<button type=\"submit\" class=\"editable-submit sh-icon-button\"><i class='fas fa-check'></i></button><button type=\"button\" class=\"editable-cancel sh-icon-button\"><i class='fas fa-times'></i></button>"

        var btn = SH.$(containerSelector).find(saveButtonSelector || "[data-integration-url]");
        var callIntegration = btn.attr("data-integration-url");
        var integrationType = (btn.attr("data-integration-type") || "GET").toLowerCase();
        var integrationNotification = btn.attr("data-notify") || true;
        var integrationDescription = btn.attr("data-description") || "calling integration " + integrationType + ":" + callIntegration;

        var successCallback = btn.attr("data-success-callback");
        var errorCallback = btn.attr("data-error-callback");

        function getFunc(fullName) {
            var fn;

            if (fullName && fullName.length) {
                if (fullName.indexOf(".") > -1) {
                    var functionNamespace = fullName.split(".");
                    fn = window;
                    for (var i = 0; i < functionNamespace.length; i++) {
                        fn = fn[functionNamespace[i]];
                    }
                } else {
                    fn = window[fullName];
                }
            }

            if (typeof fn === 'function') {
                return fn;
            }
            return null;
        }

        var fields = SH.$(containerSelector).find("[data-edit='true']");

        var fieldSuccessTriggerFunc;
        if (fields && fields.length === 1 && btn && btn.length === 1 && fields[0] === btn[0]) {
            //This is a self-trigger form
            fieldSuccessTriggerFunc = function (fieldDetails, savePromise, data) {
                var ctx = {};
                readEditedField(fieldDetails, ctx, data);
                processBase64Fields(ctx, function (ctx) {
                    triggerIntegrationFunc(containerSelector, callIntegration, integrationType, integrationDescription, integrationNotification, getFunc(fieldDetails.attr("data-success-callback")), getFunc(fieldDetails.attr("data-error-callback")), fieldDetails.attr("data-long-running") === "true", ctx);
                });
            };
        }

        for (var i = 0; i < fields.length; i++) {
            var fld = SH.$(fields[i]);
            var fieldSuccessCallback = fieldSuccessTriggerFunc ? (function (p, d) { fieldSuccessTriggerFunc(fld, p, d); }) : getFunc(fld.attr("data-success-callback"));
            var fieldErrorCallback = getFunc(fld.attr("data-error-callback"));
            fld.editable({ savenochange: true, success: fieldSuccessCallback, error: fieldErrorCallback });
        }

        if (!fieldSuccessTriggerFunc) {
            btn.on("click", function (e) {
                triggerIntegrationFunc(containerSelector, callIntegration, integrationType, integrationDescription, integrationNotification, successCallback, errorCallback, btn.attr("data-long-running") === "true");
            });
        }
    };

    var triggerIntegrationFunc = function (containerSelector, callIntegration, integrationType, integrationDescription, integrationNotification, successCallback, errorCallback, longRunning, data) {
        var callback = function (ctx) {
            if (callIntegration) {
                var headers = undefined;
                if (longRunning) {
                    headers = {
                        'X-Job-Referer': callIntegration
                    };
                }

                window.SH.Services.IntegrationService.Run(integrationType === "multipart" ? "POST" : integrationType, "appbus", callIntegration, integrationType === "get" ? SH.$.param(ctx, true) : undefined, ctx, integrationType === "multipart", headers).done(function (data) {

                    var jobData = {};
                    try {
                        jobData = JSON.parse(data);
                    } catch (error) {
                        //
                    }

                    var jobID = jobData.jobID;
                    if (jobID) {
                        if (!longRunning) {
                            console.warn("Found jobID in response but integration " + callIntegration + " was not marked as long-running. Please add the attribute data-long-running=\"true\" if it's expected to be long running");
                        } else {
                            var statusChecker = setInterval(function () {
                                window.SH.Services.IntegrationService.RunGet("appbus", "job/status/" + jobID, undefined, headers).done(function (jobStatus) {
                                    var jobState = JSON.parse(jobStatus);
                                    if (jobState.status === "job_done") {
                                        clearInterval(statusChecker);

                                        if (jobState.resultAvailable) {
                                            window.SH.Services.IntegrationService.RunGet("appbus", "job/result/" + jobID, undefined, headers).done(function (jobResult) {
                                                if (successCallback) {
                                                    successCallback(ctx, data);
                                                }
                                                if (integrationNotification) {
                                                    showNotification(integrationDescription, { type: "success", title: "Success" });
                                                }
                                            }).catch(function (data) {
                                                clearInterval(statusChecker);
                                                if (errorCallback) {
                                                    errorCallback(ctx, data);
                                                }
                                                if (integrationNotification) {
                                                    showNotification(integrationDescription, { type: "error", title: "Failure" });
                                                }
                                            });
                                        }
                                    }
                                }).catch(function (data) {
                                    clearInterval(statusChecker);
                                    if (errorCallback) {
                                        errorCallback(ctx, data);
                                    }
                                    if (integrationNotification) {
                                        showNotification(integrationDescription, { type: "error", title: "Failure" });
                                    }
                                });
                            }, 500);
                        }
                    } else {
                        if (!longRunning) {
                            if (successCallback) {
                                successCallback(ctx, data);
                            }
                            if (integrationNotification) {
                                showNotification(integrationDescription, { type: "success", title: "Success" });
                            }
                        } else {
                            throw "Integration " + callIntegration + " marked as long running via data-long-running attribute but AppBus did not return a job ID. Are you sure this is a long running job?";
                        }
                    }
                }).catch(function (data) {
                    if (errorCallback) {
                        errorCallback(ctx, data);
                    }
                    if (integrationNotification) {
                        showNotification(integrationDescription, { type: "error", title: "Failure" });
                    }
                });
            } else {
                if (successCallback) {
                    successCallback(ctx);
                }
            }
        };

        readEditedContent(containerSelector, function (currentData) {
            var combinedData = SH.$.extend({}, currentData, data);
            callback(combinedData);
        });
    };

    var processBase64Fields = function (ctx, callback) {
        var promises = [];
        for (var prop in ctx) {
            if (ctx.hasOwnProperty(prop) && ctx[prop] && ctx[prop].files && ctx[prop].files.length && ctx[prop].files instanceof FileList) {
                var mainEl = document.querySelector("[data-integration-mapto='attach1']");
                if (!mainEl || !mainEl.getAttribute("data-base64")) {
                    continue;
                }

                var selectedFiles = ctx[prop].files;
                var currentProp = prop;
                ctx[currentProp].files = new Array(selectedFiles.length);

                for (var fileIndex = 0; fileIndex < selectedFiles.length; fileIndex++) {
                    var currentFile = selectedFiles[fileIndex];
                    var currentIndex = fileIndex;
                    promises.push(SH.utils.Promise(function (resolve, reject) {
                        var reader = new FileReader();
                        reader.addEventListener("load", function () {
                            ctx[currentProp].files[currentIndex] = {
                                lastModified: currentFile.lastModified,
                                name: currentFile.name,
                                size: currentFile.size,
                                type: currentFile.type,
                                data: reader.result.split(',')[1]
                            };
                            resolve();
                        });
                        reader.addEventListener("error", function () {
                            reject(reader.error);
                        });
                        reader.readAsDataURL(currentFile);
                    }));
                }
            }
        }

        if (promises.length) {
            SH.utils.PromiseAll(promises).then(function () {
                (callback || function () { })(ctx);
            });
        } else {
            (callback || function () { })(ctx);
        }
    };

    var readEditedField = function (f, obj, fValue) {

        var currentValue;

        if (f.hasClass('editable-open')) {
            f.data("editableContainer").tip().find("form").submit();
        }

        if (f.hasClass('editable-open')) {
            f.data("editableContainer").tip().find("form").submit();
        }

        if (!fValue) {
            var data = f.data();
            if (data && data.editable && (data.editable.value || data.editable.isEmpty)) {
                currentValue = f.data().editable.value;
            } else {
                currentValue = f.html();
            }
        } else {
            currentValue = fValue;
        }

        var property = f.attr('data-integration-mapTo') || "";

        if (property.indexOf("@") === 0) {
            property = property.substring(1);
        }

        if (property && property.indexOf(".") < 0) {
            obj[property] = currentValue;
        }

        if (property && property.indexOf(".") > 0) {
            var currentProp = property;
            var currentObj = obj;
            while (currentProp.indexOf(".") > 0) {
                var firstDot = currentProp.indexOf(".");
                var part = currentProp.substring(0, firstDot);
                if (!currentObj[part]) {
                    currentObj[part] = {};
                }
                currentObj = currentObj[part];
                currentProp = currentProp.substring(firstDot + 1);
            }

            currentObj[currentProp] = currentValue;
        }
    }

    var readEditedContent = function (containerSelector, callback) {
        var obj = {};
        var fields = SH.$(containerSelector).find("[data-integration-mapTo]");

        for (var i = 0; i < fields.length; i++) {
            var f = $(fields[i]);
            readEditedField(f, obj);
        }

        processBase64Fields(obj, callback);
    };

    var makeEditableControl = function (el) {
        if (event.currentTarget !== el || el.classList.contains("editable-click"))
            return;

        SH.$(el).addClass("integrationAction");
        SH.utils.makeEditableForm(SH.$(el).parent());
        SH.$(el).trigger("click");
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
    }

    var findIconByExtensionOrType = function (key) {
        if (key == null) {
            return window.SHRootLevelURL + "/image/FileTypes/genericfile.png";
        }
        var dotlessKey = key.replace(".", "");
        var iconNames = Object.keys(iconMap).filter(function (map) { return map == dotlessKey || (iconMap[map].extensions || []).indexOf(dotlessKey) > -1 });
        return  window.SHRootLevelURL + "/image/FileTypes/" + (iconNames.length ? iconNames[0] : "genericfile") + ".png";
    }

    var getSourceSystemIcon = function (url, contentSource) {
        var url = url || "";
        var contentSource = contentSource || "";

        var anc = document.createElement("a");
        anc.href = url;

        var icon = undefined;
        var sourceSystem = "<span title='" + contentSource + "'>";

        //Try to use host to match
        var hostMatches = Object.keys(systemIconMap.host).filter(function (k) { return systemIconMap.host[k].filter(function (vk) { return anc.host.toLowerCase().indexOf(vk.toLowerCase()) >= 0 }).length });
        icon = hostMatches.length ? hostMatches[0] : icon;

        if (!icon) {
            //Try to use the full URL to match
            var hrefMatches = Object.keys(systemIconMap.href).filter(function (k) { return systemIconMap.href[k].filter(function (vk) { return anc.href.toLowerCase().indexOf(vk.toLowerCase()) >= 0 }).length });
            icon = hrefMatches.length ? hrefMatches[0] : icon;
        }

        if (!icon) {
            //Try to use the ContentSource
            var csMatches = Object.keys(systemIconMap.contentSource).filter(function (k) { return systemIconMap.contentSource[k].filter(function (vk) { return contentSource.toLowerCase().indexOf(vk.toLowerCase()) >= 0 }).length });
            icon = csMatches.length ? csMatches[0] : icon;
        }

        return icon;
    }

    var getSourceSystemImage = function (url, contentSource) {
        var icon = getSourceSystemIcon(url, contentSource);
        return icon ? "<img class='sourceSystemIcon' src='" + window.SHRootLevelURL + "/image/SourceSystems/" + icon + ".png'/>" : undefined;
    }

    var getSelectedTab = function () {
        let selectedTab;
        var searchInterface = SH.SearchProvider.GetMainSearchInterface();
        var tabs = searchInterface.attachedComponents.Tab;
        for (var i = 0; i < tabs.length; i++) {
            if ((tabs[i].element.className).indexOf('coveo-selected') !== -1) {
                selectedTab = tabs[i]
                break
            }
        }
        return selectedTab;
    }

    var getQueryTemplate = function () {
        let selectedTab = getSelectedTab();
        let template;

        if (selectedTab) {
            template = selectedTab.options.expression;
        } else {
            template = path('document.body.CoveoSearchInterface.queryController.lastQuery.cq'.split('.'), window);
            if (!template || template.indexOf('FederatorBackends') == -1) {
                if (document.body.CoveoSearchInterface.attachedComponents['Tab'] != undefined) {
                    template = document.body.CoveoSearchInterface.attachedComponents['Tab'][0].options.expression;
                } else {
                    //botWarn('no FederatorBackends found on last query template: ' + template + '. "{searchboxquery}" was used instead.');
                    template = '{searchboxquery}';
                }

            }
        }
        return template;
    }

    var getQueryResultSource = function () {
        let resultSource;
        let selectedTab = getSelectedTab();

        if (selectedTab) {
            resultSource = selectedTab.options.id;
        } else {
            resultSource = path('document.body.CoveoSearchInterface.queryController.lastQuery.tab'.split('.'), window);
            if (!resultSource) {
                if (document.body.CoveoSearchInterface.attachedComponents['Tab'] != undefined) {
                    resultSource = document.body.CoveoSearchInterface.attachedComponents['Tab'][0].options.id;
                } else {
                    resultSource = undefined;
                }
            }
        }
        return resultSource;
    }
    
    var getDefaultDocument = function (url) {
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                return $.ajax({
                    url: url,
                    type: "HEAD",
                    contentType: "application/json",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    crossDomain: true
                });
            });
        });

    }
    var getURL = function () {
        var serviceUrl = "/_bai/settings?relativePath=";
        var sitePath = window.location.pathname;
        return serviceUrl + sitePath;
    }

    var getQueryRecommendations = function (userProps, queryText, sugestionOptions, clientConfiguration, dataType) {
        var type = dataType ? dataType : "text";
        var serializedData = JSON.stringify({
            UserProfileProperties: userProps,
            QueryText: queryText,
            QuerySuggestionsOptions: JSON.stringify(sugestionOptions),
            ConfigurationJson: JSON.stringify(
                clientConfiguration
            )
        })
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                return $.ajax({
                    url: window.SH.ServiceAddresses.AnalyticsService + '/queryRecommendations',
                    type: "POST",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    contentType: "application/json",
                    data: serializedData,
                    dataType: type,
                    crossDomain: true
                });
            })
        });
    }

    var listSmartAutomations = function (skip, take, filter) {
        return retryWithLimit(function () {
            return SH.utils.GetSecurityToken().then(function (token) {
                return $.ajax({
                    url: window.SH.ServiceAddresses.SmartAutomationsService + '?skip=' + skip + '&top=' + take + '&filter=' + (filter || ""),
                    type: "GET",
                    headers: {
                        'X-SH-Authorization': 'Bearer ' + token
                    },
                    contentType: "application/json",
                    crossDomain: true
                });
            });
        });
    };
    var showContentModal = function (parent, result, configuration, callback) {
        var modal = $(parent).find(".contentModal");
        var cmlDataUrl = $(result)[0].SDFUrl;

        if (modal.length) {
            $(modal).remove();
        }

        window.SH.utils.compileTemplateAsync(configuration.ContentModalTemplatePath, {
            config: configuration,
            result: result
        }).done(function (html) {
            $(parent).append(html);

            if (callback && typeof callback === 'function') {
                callback();
            }

            $(parent).find(".contentModal").SHModal("show");
            if (cmlDataUrl) {
                SH.$.ajax(cmlDataUrl, {
                    success: function (cmlData) {
                        var viewer = Kekule.Widget.getWidgetById('chemViewer');
						if(viewer){
							var mol = Kekule.IO.loadFormatData(cmlData, 'sd');
							viewer.setChemObj(mol);
							viewer.setEnableToolbar(true);
							viewer.setToolButtons(['zoomIn', 'zoomOut']);
						}
                    }
                });
            }
        });
    };

    window.SH.Services = {
        UserProfileService: {
            GetProperties: userProfileGetProperties,
            SetProperties: userProfileSetProperties,
            GetPicture: userPicture,
            GetBatchProperties: userProfileGetBatchProperties
        },
        BotService: {
            DeleteUserQuestion: deleteUserQuestion,
            GetUserQuestions: getUserQuestions,
            UpdateUserQuestion: updateUserQuestion,
            VerifyUserQuestion: verifyUserQuestion,
            ProcessUserQuestion: processUserQuestion,
            GetItemTemplate: getItemTemplate,
            GuidedRefinement: guidedRefinement,
            AddDelayedAnswerQuestion: addDelayedAnswerQuestion
        },
        SpellCheckService: {
            SpellCheckText: spellCheck
        },
        FileService: {
            getByRelativeUrl: getByRelativeUrl,
            setAtRelativeUrl: setAtRelativeUrl,
            getPages: getPages,
            createPage: createPage
        },
        SettingsService: {
            GetSettings: getPageSettings,
            SetSettings: setPageSettings,
            SetTheme: setPageTheme,
            GetTheme: getPageTheme,
            needsUpgrade: needsUpgrade,
            upgrade: upgrade
        },
        AnalyticsService: {
            GetQueryRecommendations: getQueryRecommendations
        },
        BackendsService: {
            GetAllBackends: getAllBackends
        },
        IntegrationService: {
            Run: runIntegration,
            RunPost: runPostIntegration,
            RunGet: runGetIntegration,
            RunMultiPart: runMultiPartPostIntegration
        },
        SmartAutomationsService: {
            List: listSmartAutomations
        },
        AlertsService:{
            InitializeAlerts:initAlerts
        }
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

    var getPreauthenticatedContext = function(){
		//Support for SPO SSO - reuse existing session if possible
		if(window._spPageContextInfo) {
			return {
				sessionId: window._spPageContextInfo.aadSessionId,
				userEmail: window._spPageContextInfo.userEmail
			}
		}
		
		//TODO: add handling for other systems when needed
		return undefined;
    };

    var getSearchRoot = function(){
		return document.querySelector("#search.CoveoSearchInterface") || document.body;
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

            if(fn[functionNamespace[i]] == undefined) {
                fn = "";
            } else {
                fn = fn[functionNamespace[i]];
            }
        }
        return fn;
    }

    var generateGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    var initUI = function(){
        SH.utils.GetSecurityToken().then(function(token){

            Coveo.Logger.level = 6;

            Coveo.SearchEndpoint.configureFederatorEndpoint(window.SH.ServiceAddresses.SearchService, token, SH.utils.GetSecurityToken);

            var contentBySearch = document.getElementsByClassName('CoveoContentBySearch');

            for (var i = 0; i < contentBySearch.length; i++) {
                Coveo.initContentBySearch(contentBySearch[i]);
            }

            var redirectUri = document.getElementById("OAuth").getAttribute("data-redirect-uri");
            if (redirectUri) {
                Coveo.initSearchbox(document.getElementById('search'), redirectUri);
            } else {
                setTimeout(function () {
                    Coveo.init(document.getElementById('search'));
                }, 0);
            }
        });
    }


    window.SH.utils = {
        initUI: initUI,
		getSearchRoot: getSearchRoot,
		getPreauthenticatedContext: getPreauthenticatedContext,
        get DateUtils() { return window.Coveo.DateUtils; },
        compileTemplateAsync: compileTemplateAsync,
        PromiseResolve: PromiseResolve,
        loadTemplateAsync: loadTemplateAsync,
        GetSecurityToken: GetSecurityToken,
        PromiseAll: PromiseAll,
        Promise: Promise,
        blobToURL: blobToURL,
        isLandingPage: isLandingPage,
        initServices: initializeServiceEndpoints,
        getParameterByName: getParameterByName,
        handleExternalQueryRedirect: handleExternalQueryRedirect,
        handlePopupCallback: handlePopupCallback,
        getModuleSettings: getModuleSettings,
        getMergedModuleSettings: getMergedModuleSettings,
        generateEvent: generateEvent,
        defer: defer,
        getIconUrl: findIconByExtensionOrType,
        getSourceSystemIcon: getSourceSystemIcon,
        getSourceSystemImage: getSourceSystemImage,
        prettifyURL: prettifyURL,
        iconMap: iconMap,
        sourceSysteIconmMap: systemIconMap,
        defineNamespace: defineNamespace,
        setHashParameter: setHashParameter,
        cleanHashParameter: cleanHashParameter,
        getNamespace: getNamespace,
        getDefaultDocument: getDefaultDocument,
        getURL: getURL,
        generateGuid: generateGuid,
        defineProperty: defineProperty,
        makeEditableForm: makeEditableForm,
        makeEditableControl: makeEditableControl,
        readEditedContent: readEditedContent,
        showNotification: showNotification,
        prettifyName: prettifyName,
        defaultPageOverrides: defaultPageOverrides,
        isEmail: isEmail,
        showContentModal: showContentModal
    };

    window.SH.SearchProvider = {
        get get() { return window.Coveo.get; },
        get state() { return window.Coveo.state; },
        get getComponents() { return window.Coveo.getComponents; },
        get QueryEvents() { return window.Coveo.QueryEvents; },
        get ResultLayoutEvents() { return window.Coveo.ResultLayoutEvents; },
        get ResultListEvents() { return window.Coveo.ResultListEvents; },
        get SearchAlertsEvents() { return window.Coveo.SearchAlertsEvents; },
        get OmniboxEvents() { return window.Coveo.OmniboxEvents; },
        get PendingSearchEvent() { return window.Coveo.PendingSearchEvent; },
        get PreferencesPanelEvents() { return window.Coveo.PreferencesPanelEvents; },
        get SettingsEvents() { return window.Coveo.SettingsEvents; },
        get SliderEvents() { return window.Coveo.SliderEvents; },
        get StandaloneSearchInterfaceEvents() { return window.Coveo.StandaloneSearchInterfaceEvents; },
        get InitializationEvents() { return window.Coveo.InitializationEvents; },
        get SearchEndpoint() { return Coveo.SearchEndpoint; },
        get getCustomAttributes() { return window.Coveo.HashUtils.getCustomAttributes; },
        get encodeValues() { return window.Coveo.HashUtils.encodeValues; },
        GetFederatorSuggestions: getFederatorSuggestions,
        GetLearnToRankSuggestions: getLearnToRankSuggestions,
        GetMainSearchInterface: getMainSearchInterface,
        GetSearchInterface: getSearchInterface,
        GetResultLists: getResultLists,
        GetFacets: getFacets,
        GetResultLayout: getResultLayout,
        GetMainSearchBoxes: getMainSearchBoxes,
        GetCoveoTabOptions: getCoveoTabOptions,
        NotifyQueryHasChanged: notifyQueryHasChanged,
        TriggerSearch: triggerSearch,
        GetRefiners: getRefiners,
        GetAppliedRefiners: getAppliedRefiners,
        GetDocuments: getDocuments,
        GetRequiredFields: getRequiredFields,
        GetQueryTemplate: getQueryTemplate,
        GetQueryResultSource: getQueryResultSource,
        GetSARecommandations: getSARecommandations
    };
})();