/*

    Do not modify this file as it will be overwritten when upgrading to a newer SmartHub version.
    Instead, use this file as a template for your custom settings file.

*/
SH.Loader.FilesToLoad = {

    //adding files

    /*
        '/modules/my-css.css': {},
        '/modules/my-library.js': {},
        '/modules/my-other-library.js': {
            globalAlias: 'myLib',
            params: {
                id: "myLib"
            }
        },

    */

    //modifying loaded files (see /modules/SmartHubResourceLoader/settings.js for the default settings)

    /*
        '/js/CoveoJsSearch.js': {
            params: {
                myFavoriteArgument: 'myFavoriteArgumentValue'
            }
        }

    */

};

SH.Loader.PathsToExclude = [
    /*
        ['/modules/Analytics/AnalyticsLoader.js', 'params', 'id'],
        ['/modules/Ribbon/ribbon.css']
    */
];

//modifying TypeAhead settings (see /modules/TypeAhead/settings.js for the default settings)


SH.Ribbon.CustomSettings = {
    /*
        'hasBackButton':'false',
        'hasLogo':'false',
        'logoSource':'/modules/Ribbon/img/guest.png',
        'logoURL':'',
        'logoTarget':''
    */
};

SH.Ribbon.PathsToExclude = [];

SH.TypeAhead.CustomSettings = {
    /*
        ProviderSettings: {
            PeopleSuggestions: {
                ShowMoreButtonLabel: 'A Custom Label'
            }
        }
        */
};

SH.Ratings.CustomSettings = {
/*
    "IndexSearchInterfaceElement":".CoveoContentBySearch",
    "ResultsSearchInterfaceElement":"#search.CoveoSearchInterface",
    "EnabledInTabularView": "true",
    "Enabled": "true"
*/
};

SH.Ratings.PathsToExclude = [];

SH.UserPreferences.CustomSettings = {
    /* 
    'Sections':{
        'department':{
            'title':'New Department',
            'text':'Select your department',
            'values':{
				'Project Manager':'Project Manager'
				}
        }
		
	"UserRelevancyDescription": "Documents matching these fields will show up higher in the result set",
	"PersonasEnabled": true
     */
};

SH.UserPreferences.PathsToExclude = [
    /*
        ['Sections','personaDepartment','values','HR', 'UserRelevancyDescription']
    */
];


SH.TabularView.CustomSettings = {
    /*
     "TabularResultList":{
         groupable:true,
         columns: 
         [
             { field: "title", title: "Title", filterable:false},
             { field: "author", title: "Author"},
             { field: "filetype", title: "File Type"},
             { field: "Rank", title: "Rank", filterable:false},
             { field: "Size", title: "Size"},
             { field: "ContentSource", title: "Content Source"}
         ]
     }
     */
};

SH.TabularView.PathsToExclude = [
    /*
        ['ProviderSettings', 'PeopleSuggestions', 'ShowMoreButtonLabel']
    */
];


SH.TypeAhead.PathsToExclude = [
    /*
        ['ProviderSettings', 'PeopleSuggestions', 'ShowMoreButtonLabel']
    */
];

//modifying Analytics settings (see /modules/Analytics/settings.js for the default settings)

SH.AnalyticsSettings.CustomSettings = {
    // logLevel: "ERROR"
};

SH.AnalyticsSettings.PathsToExclude = [
    //['logLevel']
];

//modifying Saved Queries settings (see /modules/SavedQueries/settings.js for the default settings)

SH.SavedQueries.CustomSettings = {
    // MaxHistoryItems: "5"
};

SH.SavedQueries.PathsToExclude = [
    //['MaxHistoryItems']
];

//modifying User Relevancy settings (see /modules/Personalization/Settings.js for the default settings)

SH.TagCloud.CustomSettings = {
    // SizeStart: 12
};

SH.TagCloud.PathsToExclude = [
    //['SizeEnd']
];

SH.Bot.CustomSettings = {

};

SH.Bot.PathsToExclude = [

];

SH.SimilarDocuments.CustomSettings = {

};

SH.SimilarDocuments.PathsToExclude = [

];

SH.SearchMenu.PathsToExclude = [];
SH.SearchMenu.CustomSettings = {};

SH.HoverPanel.CustomSettings = {
    // EnableHoverPanel: "true"
};

SH.HoverPanel.PathsToExclude = [];

SH.AdvancedSearch.CustomSettings = {};

SH.AdvancedSearch.PathsToExclude = [];

SH.PubChem.CustomSettings = {
	/*
	ChemViewerEnabled: "false",
    ChemComposerEnabled: "false"
	*/
};

SH.PubChem.PathsToExclude = [];

SH.ContentIntelligence.CustomSettings = {};

SH.ContentIntelligence.PathsToExclude = [];

SH.AuthDialog.CustomSettings = {};

SH.AuthDialog.PathsToExclude = [];

SH.MultiLanguage.CustomSettings = {};
SH.MultiLanguage.PathsToExclude = [];

SH.LearnToRank.CustomSettings = {};
SH.LearnToRank.PathsToExclude = [];

SH.SmartAutomations.CustomSettings = {};
SH.SmartAutomations.PathsToExclude = [];

SH.Alerts.CustomSettings = {};
SH.Alerts.PathsToExclude = [];

SH.ContentContainers.CustomSettings = {};
SH.ContentContainers.PathsToExclude = [];

SH.Plugins = {
    "chrome": {
        "CustomSettingsFile": SHRootLevelURL + "/integrations/chrome/chromeCustomSettings.js"
    },

    "dynamics": {
        "CustomSettingsFile": SHRootLevelURL + "/integrations/dynamics/dynamicsCustomSettings.js"
    },
    "msteams": {
        "CustomSettingsFile": SHRootLevelURL + "/integrations/msteams/msteamsCustomSettings.js"
    },
    "office": {
        "CustomSettingsFile": SHRootLevelURL + "/integrations/office/officeCustomSettings.js"
    },
    "salesforce": {
        "CustomSettingsFile": SHRootLevelURL + "/integrations/sf/salesforceCustomSettings.js"
    },
    "servicenow": {
        "CustomSettingsFile": SHRootLevelURL + "/integrations/snow/servicenowCustomSettings.js"
    },
    "spo": {
        "CustomSettingsFile": SHRootLevelURL + "/integrations/spo/spoCustomSettings.js"
    },
    "shiframe": {
        "CustomSettingsFile": SHRootLevelURL + "/integrations/shiframe/shiframeCustomSettings.js"
    }
}
