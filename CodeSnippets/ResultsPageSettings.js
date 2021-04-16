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
        "/modules/SmartHubResourceLoader/css/nouislider.min.css": {},
        "/modules/SmartHubResourceLoader/css/fa/css/fontawesome-all.css": {},
        "/modules/SmartHubResourceLoader/css/pretty-checkbox.min.css": {},
        "/modules/SmartHubResourceLoader/css/adaptiveCards/adaptiveCards.css": {},
        "/modules/FacetDatePicker/daterangepicker.css": {},
        "/modules/SmartHubResourceLoader/css/jquery-editable.css": {},
        "/modules/SmartHubResourceLoader/css/notyf.min.css": {},
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
        "/js/templates/templates.js": {},
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
                "data-analytics-uri": SH.RootLevelURL + "/_bai/Analytics"
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
        "/modules/SmartHubResourceLoader/lib/nouislider.min.js": {
            "globalAlias": "noUiSlider",
            "globallyAvailable": true
        },
        "/modules/Analytics/AnalyticsLoader.js": {},
        "/modules/SmartPreviews/SHSmartPreviewsLoader.js": {},
        "/modules/MultiLanguage/MultiLanguage.js": {},
        "/modules/TypeAhead/TypeAhead.js": {},
        "/modules/ChatBot/ChatBot.js": {},
        "/modules/SimilarDocuments/SimilarDocuments.js": {},
        "/modules/LearnToRank/LearnToRank.js": {},
        "/modules/SavedQueries/SavedQueries.js": {},
        "/modules/Ribbon/Ribbon.js": {},
        "/modules/TagCloud/TagCloud.js": {},
        "/modules/Personalization/Personalization.js": {},
        "/modules/Personalization/UserQuestions.js": {},
        "/modules/SearchMenu/SearchMenu.js": {},
        "/modules/HoverPanel/HoverPanel.js": {},
        "/modules/AdvancedSearch/AdvancedSearch.js": {},
        "/modules/FacetDatePicker/moment.min.js": {},
        "/modules/FacetDatePicker/daterangepicker.js": {},
        "/modules/ContentIntelligence/ContentIntelligence.js": {},
        "/modules/Ratings/Ratings.js": {},
        "/modules/TabularView/TabularView.js": {},
        "/modules/PubChem/PubChem.js": {},
        "/modules/SmartHubResourceLoader/lib/jquery-editable-poshytip.min.js": {},
        "/modules/SmartHubResourceLoader/lib/notyf.min.js": {},
        "/modules/SmartHubResourceLoader/lib/jquery-editable-file.min.js": {},
        "/modules/SmartAutomations/SmartAutomations.js": {},
        "/modules/ProximitySearch/ProximitySearch.js": {},
        "/modules/Basket/Basket.js": {},
        "/modules/ContentContainers/ContentContainers.js": {},
        "/modules/ContentFeedback/ContentFeedback.js": {},
        "/modules/PageFeedback/PageFeedback.js": {},
        "/modules/BLASTSearch/BLASTSearch.js": {},
        "/modules/Alerts/Alerts.js": {}
    };

})();