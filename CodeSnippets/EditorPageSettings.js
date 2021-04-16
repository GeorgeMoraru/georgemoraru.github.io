(function () {

    window.SH = {
        Loader: {
            FilesToLoad: {},
            PathsToExclude: []
        },
        TypeAhead: {},
        AnalyticsSettings: {},
        SmartPreviewsSettings: {},
        Bot: {
            Actions: {}
        },
        TabularView: {},
        SavedQueries: {},
        PubChem: {},
        Ribbon: {},
        SimilarDocuments: {},
        LearnToRank: {},
        TagCloud: {},
        SearchMenu: {},
        Communication: {},
        HoverPanel: {},
        AdvancedSearch: {},
        Plugins: {},
        MultiLanguage: {},
        RootLevelURL: typeof (SHRootLevelURL) == "undefined" ? "" : SHRootLevelURL,
        ContentIntelligence: {},
        Ratings: {},
        AuthDialog: {},
        UserPreferences: {},
        BLASTSearch: {},
        ProximitySearch: {},
        ContentFeedback: {},
        ContentContainers: {},
        SmartAutomations: {},
        Alerts: {},
        Basket: {}
    }

    SH.Loader.CSSFilesToLoad = {
        "/css/CoveoFullSearchNewDesign.css": {},
        "/modules/SmartHubResourceLoader/css/default/shModules.css": {},
        "/modules/SmartHubResourceLoader/css/fa/css/fontawesome-all.css": {},
        "/modules/SmartHubResourceLoader/css/pretty-checkbox.min.css": {},
        "/integrations/editor/css/kendo.common.min.css": {},
        "/integrations/editor/css/kendo.default.min.css": {},
        "/integrations/editor/css/jsoneditor.css": {},
        "/integrations/editor/css/editor.css": {},
        "/integrations/editor/lib/codemirror/lib/codemirror.css": {},
        "/integrations/editor/lib/codemirror/lib/docs.css": {},
        "/integrations/editor/lib/codemirror/addon/hint/show-hint.css": {},
        "/integrations/editor/lib/codemirror/addon/display/fullscreen.css": {},
        "/_bai/settings/gettheme": {}
    };

    SH.Loader.JSFilesToLoad = {
        "/modules/SmartHubResourceLoader/DefaultModuleSettings.js": {},
        "/modules/SmartHubResourceLoader/lib/polyfills.js": {},
        "/js/CoveoJsSearch.js": {
            "params": {
                "id": "CoveoScript",
                "data-page-type": "results"
            },
            "globalAlias": "Coveo",
            "globallyAvailable": true
        },

        "/modules/Authentication/msal.js": {},
        "/services/SecurityService.svc/getSecurityConfig": {},
        "/modules/SmartHubResourceLoader/lib/jquery.js": {
            "globalAlias": ["$", "jquery", "jQuery"],
            "globallyAvailable": true
        },
        "/modules/SmartHubResourceLoader/lib/underscore.js": {
            "globalAlias": "_",
            "globallyAvailable": true
        },
        "/modules/SmartHubResourceLoader/CoveoAdapter.js": {},
        "/modules/AuthDialog/AuthDialog.js": {},
        "/modules/Authentication/ExternalAuth.js": {},
        "/modules/Authentication/OAuth.js": {
            "params": {
                "id": "OAuth",
                "data-search-uri": SH.RootLevelURL + "/services/FederatorService.svc",
                "data-userprofile-uri": SH.RootLevelURL + "/services/UserProfileService.svc",
                "data-bothelper-uri": SH.RootLevelURL + "/Services/HelperBotService.svc",
                "data-spellcheck-uri": SH.RootLevelURL + "/Services/SpellCheckService.svc",
                "data-rest-uri": SH.RootLevelURL + "/services/FederatorService.svc"
            }
        },
        "/modules/SmartHubResourceLoader/lib/ramda.js": {
            "globalAlias": "R"
        },
        "/modules/SmartHubResourceLoader/lib/axios.js": {
            "globalAlias": "axios"
        },
        "/modules/SmartHubResourceLoader/lib/jquerymigrate.js": {},
        "/modules/SmartHubResourceLoader/lib/commonUI.js": {
            "globalAlias": ["SHCommonUI"],
            "globallyAvailable": true
        },
        "/modules/MultiLanguage/MultiLanguage.js": {},
        "/integrations/editor/settings.js": {
            "globalAlias": "EditorSettings"
        },

        "/integrations/editor/js/kendo.all.min.js": {},
        "/integrations/editor/js/jsoneditor.js": {},

        "/integrations/editor/js/editor.utils.kendo.js": {},
        "/integrations/editor/js/editor.utils.modal.js": {},
        "/integrations/editor/js/settingsUtils.js": {},
        "/integrations/editor/js/editor.pageSelector.js": {},
        "/integrations/editor/js/editor.refiners.js": {},
        "/integrations/editor/js/editor.verticals.js": {},
        "/integrations/editor/js/editor.typeahead.js": {},
        "/integrations/editor/js/editor.branding.js": {},
        "/integrations/editor/js/editor.html.js": {},
        "/integrations/editor/js/editor.css.js": {},
        "/integrations/editor/js/editor.settings.js": {},
        "/integrations/editor/js/editor.js": {},
        "/integrations/editor/lib/codemirror/lib/codemirror.js": {},
        "/integrations/editor/lib/codemirror/mode/xml/xml.js": {},
        "/integrations/editor/lib/codemirror/mode/javascript/javascript.js": {},
        "/integrations/editor/lib/codemirror/mode/css/css.js": {},
        "/integrations/editor/lib/codemirror/mode/vbscript/vbscript.js": {},
        "/integrations/editor/lib/codemirror/mode/htmlmixed/htmlmixed.js": {},
        "/integrations/editor/lib/codemirror/addon/selection/selection-pointer.js": {},
        "/integrations/editor/lib/codemirror/addon/edit/matchbrackets.js": {},
        "/integrations/editor/lib/codemirror/addon/comment/continuecomment.js": {},
        "/integrations/editor/lib/codemirror/addon/comment/comment.js": {},
        "/integrations/editor/lib/codemirror/addon/hint/show-hint.js": {},
        "/integrations/editor/lib/codemirror/addon/hint/css-hint.js": {},
        "/integrations/editor/lib/codemirror/addon/display/fullscreen.js": {},
        "/integrations/editor/lib/codemirror/addon/display/autorefresh.js": {}
    };

})();