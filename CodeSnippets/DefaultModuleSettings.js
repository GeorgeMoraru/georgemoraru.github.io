(function () {
	window.SH = window.SH || {};

	SH.AnalyticsSettings = SH.AnalyticsSettings || {};
	SH.AnalyticsSettings.DefaultSettings = {
		Enabled: "true",
		PAXModules: "PAX_PortalModule,PAX_SearchModule,PAX_UserProfileModule,PAX_VisualRefinersModule,PAX_SmartPreviewsModule,PAX_Ratings,PAX_ChatBotModule,PAX_SmartAutomationsModule",
		customProperties: "",
		showTrackingBehaviorControl: "true",
		enableGeolocationTracking: "true",
		artifactPushInterval: 60,//seconds
		cleanupInterval: 120,//seconds
		visitsDuration: 30,//minutes
		geolocationTrackingMessage: "We would like to know your location in order to improve your search experience.".toLocaleString(),
		trackingBehaviorPropertyName: "BAISmartHubAnalyticsTrackingBehavior",
		defaultTrackingBehavior: "0", // 0 - Track; 1 - Do not track; 2 - Track but hide identity
		trackingControlFile: "client/pax-tracking-behavior-control", // must have the format used by require.js
		recommendedResultsControl: {
			showRecommendedResultsDropdown: false,
			enableRecommendedResultsControl: true,
			title: "Filter results by".toLocaleString(),
			messageNotFoundRecommededResults: "Could not find any results for option: ".toLocaleString(),
			items: {
				"Default": {
					value: "0",
					label: "Default".toLocaleString()
				},
				"RecentlyViewed": {
					value: "1",
					label: "Recently viewed".toLocaleString(),
					lastDays: "5",
					maxResults: "100"
				},
				"MostUsedByMe": {
					value: "2",
					label: "Most used by me".toLocaleString(),
					lastDays: "5",
					maxResults: "100"
				},
				"WhatOthersAreViewing": {
					value: "3",
					label: "What others are viewing".toLocaleString(),
					lastDays: "5",
					maxResults: "100"
				},
				"NewResults": {
					value: "4",
					label: "New results".toLocaleString(),
					lastDays: "5",
					maxResults: "100"
				},
				"CuratedResults": {
					value: "5",
					label: "Curated results".toLocaleString(),
					lastDays: "5",
					maxResults: "100",
					"SmartAnalyticsIndex.[AccountName]": "AdditionalProperty.[AccountName]"
				}
			},
			parentSelector: ".coveo-results-header" // JQuery selector for parent element(s) where to inject the control.
		},
		UserProfileMappings: {
			"PreferredName": "User".toLocaleString(),
			"AccountName": "AccountName".toLocaleString(),
			"Department": "Department".toLocaleString(),
			"Office": "Office".toLocaleString(),
			"SPS-JobTitle": "JobTitle".toLocaleString(),
			"Title": "Title".toLocaleString(),
			"SPS-Location": "UserLocation".toLocaleString(),
			"SPS-Birthday": "Birthday".toLocaleString(),
			"SPS-TimeZone": "TimeZone".toLocaleString(),
			"Manager": "Manager".toLocaleString(),
			"SPS-Skills": "Skills".toLocaleString(),
			"SPS-HireDate": "HireDate".toLocaleString(),
			"YearsWithCompany": "YearsWithCompany".toLocaleString()
		},
		enableCaseSensitivity: "false",
		logLevel: "WARN"
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.TypeAhead = SH.TypeAhead || {};
	SH.TypeAhead.DefaultSettings = {
		SuggestionsCacheMaxSizeMegabytes: 3,
		SuggestionsCacheExpirationHours: 12,
		SuggestionsContainerParentSelector: ".CoveoQuerybox",
		SearchBoxInputSelector: ".CoveoQuerybox .magic-box-input",
		GetSuggestionsEventName: "SH.GetTypeAheadSuggestions",
		GetAlertsEventName: "SH.GetTypeAheadAlerts",
		GetAlertsEnabled: "SH.GetAlertsEnabled",
		SuggestionsContainerClass: "sh-suggestions-container",
		SuggestionsItemSelectedClass: "sh-suggestions-item-selected",
		SuggestionsSectionLabelClass: "sh-suggestions-section-label",
		DefaultSectionLabel: "",
		CSSPath: SH.RootLevelURL + "/modules/TypeAhead/css/SmartHubTypeAhead.css",
		TemplatePath: SH.RootLevelURL + "/modules/TypeAhead/TypeAheadTemplate.html",
		KeyPressDelay: 700,
		SuggestionsBoxMaxHeight: 1000,
		GridHorizontalCellNumber: 2,
		GridVerticalCellNumber: 5,
		ShowOnPageLoad: false,
		RibbonImgPath: SH.RootLevelURL + "/modules/Ribbon/img/guest.png",
		ActiveProviders: {
			FederatorSuggestions: "/modules/TypeAhead/Providers/FederatorSuggestions/FederatorSuggestions.js",
			PeopleSuggestions: "/modules/TypeAhead/Providers/PeopleSuggestions/PeopleSuggestions.js",
			QuerySuggestions: "/modules/TypeAhead/Providers/QuerySuggestions/QuerySuggestions.js",
			RefinerSuggestions: "/modules/TypeAhead/Providers/RefinerSuggestions/RefinerSuggestions.js",
			SavedQueriesSuggestions: "/modules/TypeAhead/Providers/SavedQueriesSuggestions/SavedQueriesSuggestions.js"
		},
		ProviderSettings: {
			// "Sample Section Label: {
			//     row: 12,
			//     col: 0,
			//     width: 12,
			//     height: 3,
			//     expandsVertically: true,
			//     expandsHorizontally: true
			// },

			BotProvider: {
				QueryTemplate: '{searchboxquery} FederatorBackends:"*"',
				ResultSource: "b29924a9-ec32-4c10-8892-a544b69ee121",
				TemplatePath: SH.RootLevelURL + "/modules/TypeAhead/Providers/BotProvider/template.html",
				MaxNumberOfSuggestions: 5,
				PropertyMappings: {
					Title: "title",
					Url: "clickUri",
					FileType: "FileExtension"
				},
				SectionLabel: "Smart Answers:",
				HideLabel: false,
				row: 0,
				col: 0,
				width: 2,
				height: 1,
				expandsVertically: true,
				expandsHorizontally: true
			},
			FederatorSuggestions: {
				QueryTemplate: '{searchboxquery} FederatorBackends:"*"',
				TemplatePath: SH.RootLevelURL + "/modules/TypeAhead/Providers/FederatorSuggestions/template.html",
				NoSuggestions: 10,
				SectionLabel: "Are you looking for...".toLocaleString(),
				QueryFieldsForTypeAhead: "title, DisplayAuthor",
				row: 1,
				col: 0,
				width: 1,
				height: 1,
				expandsVertically: true,
				expandsHorizontally: true
			},
			SavedQueriesSuggestions: {
				QueryTemplate: '{searchboxquery} FederatorBackends:"*"',
				TemplatePath: SH.RootLevelURL + "/modules/TypeAhead/Providers/SavedQueriesSuggestions/template.html",
				NoSuggestions: 10,
				NoSavedQueries: 5,
				SectionLabel: "Previous searches:".toLocaleString(),
				RefinersLabel: "Applied refiners:".toLocaleString(),
				row: 1,
				col: 1,
				width: 1,
				height: 1,
				expandsVertically: true,
				expandsHorizontally: true,
				ZeroSearchEnabled: true
			},
			RefinerSuggestions: {
				QueryTemplate: '{searchboxquery} FederatorBackends:"*"',
				TemplatePath: SH.RootLevelURL + "/modules/TypeAhead/Providers/RefinerSuggestions/template.html",
				SectionLabel: "See also:".toLocaleString(),
				row: 2,
				col: 0,
				width: 1,
				height: 1,
				expandsVertically: true,
				expandsHorizontally: true,
				NoSuggestionsPerCategory: 1,
				refinerMappings: {
					DisplayAuthor: "Author",
					FileExtension: "File Extension",
					ContentSource: "Content Source",

				}
			},
			QuerySuggestions: {
				"TemplatePath": SH.RootLevelURL + "/modules/TypeAhead/Providers/QuerySuggestions/template.html",
				"MinQueryLength": "1",
				"SectionLabel": "Narrow your search:".toLocaleString(),
				row: 2,
				col: 1,
				width: 1,
				height: 1,
				expandsVertically: true,
				expandsHorizontally: true,
				"RefinerMappings": {
					"DisplayAuthor": "Author",
					"FileExtension": "File Type"
				},
				"ServiceAddresses": {
					"UserProfileServiceURL": SH.RootLevelURL + "/Services/UserProfileService.svc"
				},

				"SuggestionOptions": {
					"0": {
						"Description": "Suggested based on searches made by other users in your department",
						"Separator": "",
						"NoOfSuggestions": "5"
					},
					"1": {
						"Description": "Suggested based on searches made by other users",
						"Separator": "",
						"NoOfSuggestions": "2"
					},

					"2": {
						"Description": "Suggested based on your previous searches",
						"Separator": "",
						"NoOfSuggestions": "1"
					},
					"Refined1": {
						"Description": "Suggested based on popular refiners for this search",
						"Separator": "filtered by",
						"NoOfSuggestions": "1"
					}

				}
			},
			LearnToRankSuggestions: {
				TemplatePath: SH.RootLevelURL + "/modules/TypeAhead/Providers/LearnToRankSuggestions/template.html",
				NoSuggestions: 10,
				SectionLabel: "Suggestions based on Learn To Rank".toLocaleString(),
				row: 3,
				col: 0,
				width: 2,
				height: 1,
				expandsVertically: false,
				expandsHorizontally: true
			},
			PeopleSuggestions: {
				QueryTemplate: '{searchboxquery} FederatorBackends:"*"',
				PeopleResultSource: "b09a7990-05ea-4af9-81ef-edfab16c4e31",
				SectionLabel: "People matches:",
				HideLabel: true,
				row: 4,
				col: 0,
				width: 2,
				height: 1,
				expandsVertically: true,
				expandsHorizontally: true,
				MaxNumberOfSuggestions: 4,
				TemplatePath: SH.RootLevelURL + "/modules/TypeAhead/Providers/PeopleSuggestions/template.html",
				ShowMoreButtonLabel: "Show more".toLocaleString(),
				EnableShowMoreButton: false,
				EnrichUserPictureUsingUserProfileService: true,
				ShowMoreRedirectUri: "", // e.g.: "https://smarthub.contoso.com/Results.html" or "https://smarthub.contoso.com/Results.html#tId=3"
				PropertyMappings: {
					UserName: "UserName",
					AccountName: "accountname",
					PictureUrl: "PictureUrl",
					Name: "title",
					JobTitle: "JobTitle",
					Email: "WorkEmail",
					ClickUri: "clickUri"
				}
			},

			SampleProvider: {
				SectionLabel: "Sample Section Label".toLocaleString(),
				TemplatePath: SH.RootLevelURL + '/modules/TypeAhead/Providers/SampleProvider/template.html'
			}

		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.SmartPreviewsSettings = SH.SmartPreviewsSettings || {};
	SH.SmartPreviewsSettings.DefaultSettings = {
		Enabled: "false",
		Address: "https://smartpreviews.bainsight.com",
		ExtensionProperty: "FileExtension",
		PreviewTriggers: ['.open-preview-button'],
		SupportedExtensions: ['rtf', 'doc', 'docx', 'docm', 'dot', 'dotm', 'dotx', 'ppt', 'pptx', 'pptm', 'pps', 'ppsm', 'pdf', 'xls', 'xlsx', 'xlsm', 'xlsb', 'xltm', 'xltx', 'xlam', 'txt', 'odt', 'url', 'csv', 'zip', 'eml', 'msg', 'exch', 'gif', 'jpg', 'bmp', 'png', 'tiff', 'dib', 'jpeg', 'rle', 'wmf', 'ico', 'wpd', 'odg'],
		Options: {
			OpenSearchPanelByDefault: false,
			KeepStopWords: false,
			ShowDescriptiveText: false
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.TagCloud = SH.TagCloud || {};
	SH.TagCloud.DefaultSettings = {
		EnableTagCloud: "false",
		DefaultState: "expanded", //"collapsed"
		TagCloudMode: "QueryTerms", // "RefinerValues"
		TemplatePath: SH.RootLevelURL + "/modules/TagCloud/TagCloudTemplate.html",
		SearchBoxInputSelector: ".CoveoQuerybox .magic-box-input",
		ParentContainerSelector: "#tagCloud-component",
		QueryTemplate: "{searchboxquery} FederatorBackends:\"*\"",
		SizeStart: 12,
		SizeEnd: 24,
		ColorStart: "#3498DB",
		ColorEnd: "#46CFB0",
		Refiners: {
			// Only string properties are allowed(Date, Size, Taxonomies are not supported)
			// Example:
			// "refiner1":"number of refiners to retrieve",
			// "refiner2":"number of refiners to retrieve"
			//"DisplayAuthor": "5" // in case that TagCloudMode is used with RefinerValues

			"DisplayAuthor": "5"
		},
		QuerySuggestions: {
			"SuggestionOptions": {
				"4": {
					"Description": "Most Popular Query Terms",
					"NoOfSuggestions": "10"
				},
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.Bot = SH.Bot || {}
	SH.Bot.DefaultSettings = {
		botDisabled: false,
		botDisabledOnLanding: true,
		hideBot: false,
		maxFeatureResultsToShow: 3,
		botActions: {
			'ResumeWork': {
				'label': 'Resume where I left off'.toLocaleString(),
				'jsEvaluator': 'EnableResumeWorkAction',
				'jsHandler': 'ExecuteResumeWorkAction',
				'disabled': false,
				'position': 1
			},
			'GetUpdatesForSavedQueries': {
				'label': 'See new documents for my saved queries'.toLocaleString(),
				'jsEvaluator': 'EnableUpdatesForSavedQueries',
				'jsHandler': 'ExecuteUpdatesForSavedQueries',
				'disabled': false,
				'position': 2
			},

			'TooManyResults': {
				'label': 'I see too many results!'.toLocaleString(),
				'jsEvaluator': 'EnableTooManyResultsAction',
				'jsHandler': 'ExecuteTooManyResultsAction',
				'disabled': false,
				'position': 6
			},
			'BadResults': {
				'label': "I didn't find what I need!".toLocaleString(),
				'jsEvaluator': 'EnableBadResultsAction',
				'jsHandler': 'ExecuteBadResultssAction',
				'disabled': false,
				'position': 7
			},
		},
		STMDisabled: false,
		autoCorrectDisabled: false,
		optionsPosition: 'left',
		pickedOptionPosition: 'right',
		collapsedOnLanding: true,
		defaultUserNickName: 'human',
		userNameProperty: 'firstname',
		analyticsNoOfSuggestions: '5',
		analyticsQuerySuggestionAlgorithmId: '5',
		analyticsRefinerSuggestionAlgorithmId: 'Refined2',
		analyticsRefinerSuggestionNoOfSuggestions: '5',
		analyticsFuzzyMatchAlgorithmId: '3',
		analyticsRelevantQueriesAlgorithmId: '6',
		analyticsRelevantQueriesMinimumShouldMatch: '75%',
		minNumberOfResultsForTooManyResultsNthPage: 1000,
		tooManyResultsPage: 2,
		irrelevantResultPopupDisabledWhenReachingPageBottom: false,
		irrelevantResultsWaitTimeSeconds: 120,
		irrelevantResultsTimerEvent: 'seeIrrelevantResults',
		botName: 'Bot',
		botAvatar: SH.RootLevelURL + '/modules/chatbot/images/chatbotIcon.png',
		botParentDivSelectorHelperMode: '.chatbot-sidebar',
		botParentDivSelectorStandaloneMode: '.bot-container',
		maxCorrectionDistance: 2,
		UserProfilePictureURL: SH.RootLevelURL + "/Services/UserProfileService.svc/GetUserPicture",
		events: {},
		conversations: {},
		analyticsKeyPressDelay: 300, //in ms
		analyticsSuggestionsAlgorithm: {
			"NoOfSuggestions": "4",
			"Id": "5"
		},
		savedQueriesUpdatesTimeRestriction: 2, //it means it will try to get the updates for saved queries from the last 2 days
		topNSavedQueries: 3,
		//enter refiner properties(case sensitive) for too many results pop up
		tooManyResultsRefiners: "FileExtension, DisplayAuthor",
		carouselSettingsJson: {
			"slidesToShow": 2,
			"slidesToScroll": 2,
			"infinite": false,
			"dots": true,
			"arrows": false,
			"speed": 300,
			"responsive": [
				{
					"breakpoint": 800,
					"settings": {
						"slidesToShow": 1,
						"slidesToScroll": 1
					}
				}
			]
		},
		botTemplatePath: SH.RootLevelURL + "/modules/ChatBot/templates/template.html",
		templatePaths: {
			aboveLinkTextTemplate: 'default',
			handledCheckboxTemplate: 'default',
			refinerHeaderTemplate: 'default',
			linkTemplate: 'default',
			searchResult: 'default',
			nameChangedResponseTemplate: 'default',
			askForNameTemplate: 'default',
			askIfWantNicknameTemplate: 'default',
			confirmNicknameChangeTemplate: 'default',
			showMore: 'default',
			rejectNicknameTemplate: 'default',
			suggestQueryTemplate: 'default',
			suggestedRefinersHeaderMessageTemplate: 'default',
			suggestedRefinersAllFilterSummaryTemplate: 'default',
			suggestedRefinersApplyAllFilterTemplate: 'default',
			suggestedRefinersApplySelectedFilterTemplate: 'default',
			introMessageTemplate: 'default',
			introMessage2Template: 'default',
			spellCheckSuggestionTemplate: 'default',
			restrictiveFilterPerFilterTemplate: 'default',
			restrictiveFilterPerFilterOptionTemplate: 'default',
			restrictiveFilterInitialMessage: 'default',
			analyticsSuggestionOptionTemplate: 'default',
			firstTimeGreetingTemplate: 'default',
			mainMenuGreetingTemplate: 'default',
			mainMenuChangeNameOptionTemplate: 'default',
			mainMenuTooManyResultsOptionTemplate: 'default',
			mainMenuWhatCanIAskTemplate: 'default',
			askIfWantToSeeSampleQuestionsTemplate: 'default',
			autoCorrectLabelTemplate: 'default',
			guidedRefinementRecommendationInitialMessage: 'default',
			guidedRefinementResultsMessage: 'default',
			guidedRefinementRecommendationInitialMessage: 'default',
			noQuestionMatchFoundMessage: 'default',
			guidedNlqIntentSelectionMessage: 'default',
			findAnswerForMeTemplate: 'default',
			askSomethingElseTemplate: 'default',
			serviceUnresponsiveMessage: 'default',
			checkPreferencesSectionTemplate: 'default',
			showMyQuestionsPanelMessage: 'default',
			showPreferencesPanelMessage: 'default',
			checkOpenPanelMessage: 'default',
			relevantSuggestionTemplate: 'default',
			searchQuery: 'default',
			resumeWorkMessage: 'default',
			showTopNSavedQueriesUpdates: 'default',
			noSavedQueriesUpdatesFound: 'default',
			noSavedQueriesFound: 'default',
			botSavedQueryTemplate: 'default',
			noSuggestionFoundMessage: 'default',
			suggestRelevanceTuningMessage: 'default',
			noQuerySuggestionFoundMessage: 'default'
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.UserPreferences = SH.UserPreferences || {};
	SH.UserPreferences.DefaultSettings = {
		// user preferences
		'Separator': "%^&*",
		'ServiceURL': SH.RootLevelURL + "/Services/UserProfileService.svc/",
		'PersonalizationTemplate': SH.RootLevelURL + "/modules/Personalization/PersonalizationTemplate.html",
		'EnablePersonalizationButton': true,
		'PersonalizationTabsDefinitions': {
			'EditPage': {
				'id': 'editDashboard',
				'label': 'My Homepage'.toLocaleString(),
				'jsCode': 'DisplayEditHomePage',
				'enabled': true
			},
			'EditPreferences': {
				'id': 'changePreferences',
				'label': 'Preferences'.toLocaleString(),
				'jsCode': 'DisplayEditPreferences',
				'enabled': true
			},
			'ChangeRelevancy': {
				'id': 'changeResultsOrder',
				'label': 'Relevancy tuning'.toLocaleString(),
				'jsCode': 'DisplayChangeRelevancy',
				'enabled': true
			},
			'MyQuestions': {
				'id': 'myQuestions',
				'label': 'My Questions'.toLocaleString(),
				'jsCode': 'DisplayMyQuestions',
				'enabled': true
			},
			'AnalyticsTracking': {
				'id': 'analyticsTracking',
				'label': 'Analytics Tracking'.toLocaleString(),
				'jsCode': 'SH.AnalyticsTracking.DisplayAnalyticsTracking',
				'enabled': true
			}
		},
		'ResultsPagePersonalizationTabs': ['EditPreferences', 'ChangeRelevancy', 'MyQuestions', 'AnalyticsTracking'],
		'LandingPagePersonalizationTabs': ['EditPage', 'EditPreferences', 'AnalyticsTracking'],
		'EnablePersonalizeLink': true,
		'PersonalizeLinkContainerSelector': ".CoveoSearchbox",
		'PersonalizeLinkText': "Results not what you expected? Click here to personalize".toLocaleString(),
		'UserPreferencesTemplate': SH.RootLevelURL + "/modules/Personalization/UserPreferencesTemplate.html",
		'PreviewResultsTemplate': SH.RootLevelURL + "/modules/Personalization/PreviewResultsTemplate.html",
		'NoResultsPreviewMessage': "Edit the preferences on any section and preview the results here".toLocaleString(),
		'Sections': {
			'personaDepartment': {
				'title': 'Department'.toLocaleString(),
				'text': 'Select your department'.toLocaleString(),
				'values': {
					'Sales': 'Sales'.toLocaleString(),
					'R&D': 'R&D'.toLocaleString(),
					'Finance': 'Finance'.toLocaleString(),
					'HR': 'HR'.toLocaleString(),
					'Financial': 'Financial'.toLocaleString()
				}
			},
			'personaOffice': {
				'title': 'Region'.toLocaleString(),
				'text': 'Where are you located?'.toLocaleString(),
				'values': {
					'North America': 'North America'.toLocaleString(),
					'EMEA': 'EMEA'.toLocaleString(),
					'APAC': 'APAC'.toLocaleString(),
					'LAC': 'LAC'.toLocaleString()
				}
			},
			'jobs': {
				'title': 'Job Role'.toLocaleString(),
				'text': 'What is your role in the company?'.toLocaleString(),
				'values': {
					'Researcher': 'Researcher'.toLocaleString(),
					'HR': 'HR'.toLocaleString(),
					'Manufacturer': 'Manufacturer'.toLocaleString(),
					'Project Management': 'Project Management'.toLocaleString()
				}
			},
			'interests': {
				'title': 'Interests'.toLocaleString(),
				'text': 'What are your interests'.toLocaleString(),
				'values': {
					'Diabetes Research': 'Diabetes Research'.toLocaleString(),
					'Neuropathy': 'Neuropathy'.toLocaleString(),
					'Metabolic syndrome': 'Metabolic syndrome'.toLocaleString(),
					'Medical': 'Medical'.toLocaleString(),
					'Treatments': 'Treatments'.toLocaleString()
				}
			},
			'projects': {
				'title': 'Projects'.toLocaleString(),
				'text': 'Select your projects'.toLocaleString(),
				'values': {
					'Cardiometabolic Risk Initiative': 'Cardiometabolic Risk Initiative'.toLocaleString(),
					'Improving Depression Treatments': 'Improving Depression Treatments'.toLocaleString(),
					'Precision Medicine': 'Precision Medicine'.toLocaleString(),
					'mHealth Sensors': 'mHealth Sensors'.toLocaleString(),
					'Emerging Nanotechnologies': 'Emerging Nanotechnologies'.toLocaleString()
				}
			}
		},


		//Relevancy
		'MultiValueOperator': 'OR', //AND
		'UserRelevancyTemplate': SH.RootLevelURL + "/modules/Personalization/UserRelevancyTemplate.html",
		'UserRelevancyTitle': "Tune field relevancy for your queries.".toLocaleString(),
		'UserRelevancyDescription': "Documents which have one (or more) of the below fields matching your query will show up higher in the result set.".toLocaleString(),
		'UserRelevancyPropertyNameClassName': "user-relevancy-propName",
		'UserRelevancyPropertyRangeClassName': "user-relevancy-propRange",
		'UserProfileService': SH.RootLevelURL + "/Services/UserProfileService.svc/",
		'SearchBoxInputSelector': ".CoveoQuerybox .magic-box-input",
		'Properties': {
			title: "Title".toLocaleString()
		},
		'RefinableProperties': {
			DisplayAuthor: "Author".toLocaleString()
		},

		//Personas
		'EnablePersonas': "true",
		'PersonasTitle': "Edit Page".toLocaleString(),
		'PersonasDescription': "Select the Content Boxes that you want to see".toLocaleString(),
		'PersonasTemplate': SH.RootLevelURL + "/modules/Personalization/PersonasTemplate.html",
		'DeleteBoxWarnMessage': "Do you want to remove this panel from your home page?".toLocaleString(),
		'AddPersonalizationPanelContainerSelector': ".personalization-button",
		'EnableAddPersonalizationPanelButton': true,
		'AddPersonalizationPanelButtonTooltip': "Add new personalization box",

		//User Questions
		BotDelayedAnswersDisabled: false,
		AnswerQuestionsPanel: "Answered Questions".toLocaleString(),
		AnswerQuestionsSectionTitle: "The Admin has answered these questions".toLocaleString(),
		UnanswerQuestionsPanel: "Unanswered Questions".toLocaleString(),
		UnanswerQuestionsSectionTitle: "The Admin has not answered these questions".toLocaleString(),
		DeleteQuestionWarnMessage: "Are you sure you want to delete this question?".toLocaleString(),
		BotAlertMessage: "Check out new responses to your questions below!".toLocaleString(),
		LoadFailedMessage: "Could not load your questions.".toLocaleString(),
		MyQuestionsTemplate: SH.RootLevelURL + "/modules/Personalization/UserQuestionsTemplate.html",
		UserProfilePropertyName: "MyQuestionsUpdate",

		DefinedQuestions: {
			1: "Show me my P1 cases".toLocaleString(),
			2: "Show me weather in Boston".toLocaleString()
		}
	};

	///////////////////////////////////////////////////////////////////////////////////////

	SH.AuthDialog = SH.AuthDialog || {};
	SH.AuthDialog.DefaultSettings = {
		TitleLabel: "Session expired",
		MessageLabel: "Your session has expired. You will have to refresh the page to continue.",
		ActionLabel: "Refresh",
		Action: "return window.location.reload()",
		EventName: "sessionExpired",
		TemplatePath: SH.RootLevelURL + "/modules/AuthDialog/templates/template.html",
		ParentContainer: "body",
		AutoRunActionFor: {
			"key": "dummy_value"
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.MultiLanguage = SH.MultiLanguage || {};
	SH.MultiLanguage.DefaultSettings = {
		EnableLanguage: false,
		DefaultLanguage: "en-US",
		LanguageRedirects: {
			"en-US": "/",
			"de-DE": "/de",
			"fr-FR": "/fr"
		},
		LanguagePickerParentContent: ".coveo-header-zone",
		TemplatePath: SH.RootLevelURL + '/modules/MultiLanguage/template/LanguagePickerTemplate.html',
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.SimilarDocuments = SH.SimilarDocuments || {};
	SH.SimilarDocuments.DefaultSettings = {
		"Widget1": {
			"Properties": [
				"DisplayAuthor"
			],
			"TotalNumberOfResults": 10,
			"PerPropertyValuesUsedCount": 4,
			"ExclusionProperty": "clickUri"
		},
		"Widget2": {
			"Properties": [
				"FileExtension",
				"source",
				"GoogleExtractedEntities"
			],
			"TotalNumberOfResults": 10,
			"PerPropertyValuesUsedCount": 4,
			"ExclusionProperty": "title"
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.LearnToRank = SH.LearnToRank || {};
	SH.LearnToRank.DefaultSettings = {
		ElementID: "LearnToRank",
		ClientUrlProperty: "clickUri"
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.SavedQueries = SH.SavedQueries || {};
	SH.SavedQueries.DefaultSettings = {
		EnableSavedQueries: "true",
		EnableQueryHistory: "true",
		ParentContainerSelector: "#saved-query-component",
		TemplatePath: SH.RootLevelURL + "/modules/SavedQueries/templates/template.html",
		ModalPath: SH.RootLevelURL + "/modules/SavedQueries/templates/modal.html",
		GroupId: "Default", //Saved Queries components on different pages will show the same content if they have the same GroupId
		UserProfilePropertyName: "SavedQueries",
		MaxHistoryItems: 5,
		EmailTitle: "Useful query".toLocaleString(),
		EmailBody: "I thought you might find this useful: ".toLocaleString(),
		DeleteSavedQueryWarnMessage: "Are you sure you want to delete this query?".toLocaleString()
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.UserQuestions = SH.UserQuestions || {};
	SH.UserQuestions.DefaultSettings = {
		BotDelayedAnswersDisabled: false,
		MyQuestionsPanel: "My Questions".toLocaleString(),
		AnswerQuestionsPanel: "Answered Questions".toLocaleString(),
		AnswerQuestionsSectionTitle: "The Admin has answered these questions".toLocaleString(),
		UnanswerQuestionsPanel: "Unanswered Questions".toLocaleString(),
		UnanswerQuestionsSectionTitle: "The Admin has not answered these questions".toLocaleString(),
		QuestionsAlertMessage: "Your questions have been answered".toLocaleString(),
		BotAlertMessage: "Check out new responses to your questions below!".toLocaleString(),
		DeleteQuestionWarnMessage: "Are you sure you want to delete this question?".toLocaleString(),
		LoadFailedMessage: "Could not load your questions.".toLocaleString(),
		UserPreferencesTemplate: SH.RootLevelURL + "/modules/UserQuestions/UserQuestionsTemplate.html",
		UserProfilePropertyName: "MyQuestionsUpdate",
		DefinedQuestions: {
			1: "Show me my P1 cases".toLocaleString(),
			2: "Show me weather in Boston".toLocaleString()
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.ContentIntelligence = SH.ContentIntelligence || {};
	SH.ContentIntelligence.DefaultSettings = {
		Title: "Content Intelligence".toLocaleString(),
		ContentModalTemplatePath: SH.RootLevelURL + "/modules/ContentIntelligence/templates/modalTemplate.html",
		SearchInterfaceElement: ".CoveoSearchInterface",
		ZeroSearchParentContainerID: "contentIntelligence",
		EnableLandingZeroSearch: false,
		DefaultUrlFunction: '(function (concept) { return "http://wikipedia.org/wiki/"  + concept.replace(/ /g, "_")  })',
		ModuleDetails: {
			label: 'Insights'.toLocaleString(),
			iconClass: 'fas fa-info',
			btnClass: 'contentIntelligenceBtn'
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////

	SH.Ribbon = SH.Ribbon || {}
	SH.Ribbon.DefaultSettings = {
		'enabled': true,
		'templatePath': SH.RootLevelURL + '/modules/Ribbon/RibbonTemplate.html',
		'hasBackButton': false,
		'userNameProperty': 'preferredname',
		'parentSelector': '.ribbon-container',
		'userProfilePictureURL': SH.RootLevelURL + '/Services/UserProfileService.svc/GetUserPicture'
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.SearchMenu = SH.SearchMenu || {};
	SH.SearchMenu.DefaultSettings = {
		'SearchMenuTemplate': SH.RootLevelURL + "/modules/SearchMenu/SearchMenuTemplate.html",
		'ParentContainerSelector': "#menu",
		'Items': [
			{
				'label': "All".toLocaleString(),
				'url': "/Results.html",
				'iconClass': 'fas fa-search',
				'preserveQueryState': true,
				'preserveRefiners': false,
				'preserveQuerySource': false
			}
		]
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.HoverPanel = SH.HoverPanel || {};
	SH.HoverPanel.DefaultSettings = {
		EnableHoverPanel: "false",
		EnableHoverPanelForCBS: "false",
		DisplayPreview: "true",
		TemplatePath: SH.RootLevelURL + "/modules/HoverPanel/templates/template.html",
		ContentTemplatePath: SH.RootLevelURL + "/modules/HoverPanel/templates/defaultContent.html",
		CorrectionLeft: 0,
		CorrectionTop: 0,
		HoverSelector: ".sh-result-item", // For TabularView use ".k-master-row"; For CoveoResults use ".CoveoResult"
		CloseHoverPanelWhenHoverOver: ".coveo-header-zone,.header-info,.footer-zone,.sidebar",
		ViewButtonLabel: "View".toLocaleString(),
		ViewButtonTooltip: "Open in viewer".toLocaleString(),
		AddPageButtonLabel: "Add page to workspace".toLocaleString(),
		AddPageButtonTooltip: "Add this page to workspace".toLocaleString(),
		AddDocumentButtonLabel: "Add document to workspace".toLocaleString(),
		AddDocumentButtonTooltip: "Add full document to workspace".toLocaleString(),
		DelayTime: 300
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.AdvancedSearch = SH.AdvancedSearch || {};
	SH.AdvancedSearch.DefaultSettings = {
		EnableAdvancedSearch: true,
		EnableSearchPreview: true,
		AdvancedSearchQueryTemplate: '{searchboxquery} FederatorBackends:"*"',
		ResultSourceId: "b29924a9-ec32-4c10-8892-a544b69ee121",
		PreviewTemplatePath: SH.RootLevelURL + "/modules/AdvancedSearch/templates/previewTemplate.html",
		PreviewTemplateSelectProperties: "clickUri,title,Rank,ContentSource,DocumentSummaryExtraction,DocumentLanguageExtraction,DocumentEntitiesO365,RefinableString15,RefinableString147,Role,Office,Department,sfcustomers,RefinableString121,author",
		TemplatePath: SH.RootLevelURL + "/modules/AdvancedSearch/templates/template.html",
		Title: "Advanced Search",
		Prefix: "advSearch-",
		Description: "Find documents that have...",
		PreviewDescriptionLabel: "Search preview",
		PreviewNoResultsLabel: "Sorry, no results found",
		PreviewErrorLabel: "There was a problem running the search",
		SearchButtonLabel: "Search",
		AllWords: {
			Enable: true,
			Label: "All of these words:"
		},
		ExactPhrase: {
			Enable: true,
			Label: "The exact phrase:"
		},
		AnyWords: {
			Enable: true,
			Label: "Any of these words:"
		},
		NoneWords: {
			Enable: true,
			Label: "None of these words:"
		},
		AdditionalProperties: {
			Language: {
				Label: "Only the language(s):",
				ManagedProperty: "DetectedLanguage",
				RenderMode: "checkbox",
				ValueMappings: {
					"English": "en",
					"French": "fr",
					"German": "de",
					"Japanese": "ja",
					"Simplified Chinese": "zh-cn",
					"Spanish": "es",
					"Traditional Chinese": "zh-tw"
				}
			},
			ContentSource: {
				Label: "Content source:",
				ManagedProperty: "ContentSource",
				IsDynamic: true,
				RenderMode: "dropdown",
				ValueMappings: {
					"All Results": ""
				}
			},
			ResultType: {
				Label: "Result type:",
				ManagedProperty: "filetype",
				RenderMode: "dropdown",
				ValueMappings: {
					"All Results": "",
					"Word Documents": "doc,docx,dot,docm,odt",
					"Excel Documents": "xls,xlsx,xlsm,xlsb,ods",
					"PowerPoint Presentations": "ppt,pptx,pptm,odp"
				}
			}
		},
		AddPropertyRestrictions: {
			Enable: true,
			TemplatePath: SH.RootLevelURL + "/modules/AdvancedSearch/templates/AddPropertyRestrictionsTemplate.html",
			MaxNumberOfPropertiesRestrictions: 5,
			Labels: {
				Description: "Where the Property...",
				PropertyPlaceholder: "Pick or enter property",
				OperatorPlaceholder: "Pick operator",
				ContainLabel: "Contains",
				NotContainLabel: "Does not contain",
				EqualLabel: "Equals",
				NotEqualLabel: "Does not equal",
				GreaterLabel: "Greater than",
				LessLabel: "Less than",
				OnOrBefore: "On or before",
				OnOrAfter: "On or after",
				StartsWithLabel: "Starts with",
				AndLabel: "And",
				OrLabel: "Or",
				InvalidOperatorError: "Invalid operator: ${operator}. Please choose one from the list!",
				MaximumReachedError: "You have reached the maximum number of allowed properties.",
				BlankFieldsError: "Please complete all fields of a property restriction!",
				PropertyTooltip: "After you choose a property, in order to select another one you have to detele the selected one",
				OperatorTooltip: "After you choose an operator, in order to select another one you have to detele the selected one"
			},
			ListOfProperties: {
				Property1: {
					Label: "Author",
					ManagedProperty: "author",
					Type: "string"
				},
				Property2: {
					Label: "Title",
					ManagedProperty: "title",
					Type: "string"
				},
				Property3: {
					Label: "Size (bytes)",
					ManagedProperty: "Size",
					Type: "number"
				},
				Property4: {
					Label: "URL",
					ManagedProperty: "path",
					Type: "string"
				},
				Property5: {
					Label: "Last Modified Date",
					ManagedProperty: "date",
					Type: "date"
				}
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.Ratings = SH.Ratings || {};
	SH.Ratings.DefaultSettings = {
		"SearchInterfaceElements": "#search.CoveoSearchInterface,.CoveoContentBySearch",
		"EnabledInTabularView": "false",
		"EnabledInResultFeedback": "true",
		"ListTemplateParent": ".widgets-placeholder",
		"CardTemplateParent": ".card-front",
		"ExpanderTemplate": SH.RootLevelURL + "/modules/Ratings/Templates/Expander.html",
		"TabularViewColumnName": "Ratings",
		"GradingTemplate": SH.RootLevelURL + "/modules/Ratings/Templates/Ratings-Stars.html",
		"LikesTemplate": SH.RootLevelURL + "/modules/Ratings/Templates/Ratings-Like.html",
		"ActiveTemplate": "GradingTemplate",
		"MaximumGrade": 5,
		"VoteNotification": "Your vote has been registered and it will be processed soon.".toLocaleString(),
		"EscbasecrawurlMetadata": "escbasecrawlurl",
		"ContentSourceMetadata": "ContentSource"
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.TabularView = SH.TabularView || {};
	SH.TabularView.DefaultSettings = {
		"Enabled": "false",
		"AdvancedTabularResultList": {
			"EnableSmartPreviews": false,
			"EnableContentIntelligence": true,
			"EnableResultFeedback": true,
			"ColumnsPreferencesProfilePropertyName": "columnPreferences",
			"AdditionalFields": [{ field: "clickUri" }, { field: "date" }],
			"KendoGridSettings": {
				dataSource: {
					type: "odata"
				},
				height: 550,
				filterable: true,
				pageable: false,
				groupable: true,
				detailTemplate: SH.RootLevelURL + '/modules/TabularView/DetailsTemplate.html',
				toolbar: SH.RootLevelURL + '/modules/TabularView/ToolbarTemplate.html',
				detailInit: '',
				dataBound: function (e) {
					this.expandRow(this.tbody.find("tr.k-master-row").first());

					var container = e.sender.wrapper.children(".k-grid-content");
					container.scrollLeft(0);
					container.scrollTop(0);
				},
				columns:
					[
						{ field: "title", title: "Title", filterable: false },
						{ field: "FileExtension", title: "File Type" },
						{ field: "Rank", title: "Rank", filterable: false },
						{ field: "Size", title: "Size" },
						{ field: "ContentSource", title: "Content Source" }
					]
			}

		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.PubChem = SH.PubChem || {};
	SH.PubChem.DefaultSettings = {
		Enabled: "false",
		ChemComposerEnabled: "false",
		ContentModalTemplatePath: SH.RootLevelURL + "/modules/PubChem/templates/modal.html",
		ChemComposerTemplatePath: SH.RootLevelURL + "/modules/PubChem/templates/composer.html",
		ChemComposerButtonTooltip: "PubChem Composer",
		ModuleDetails: {
			label: '3D Model',
			iconClass: 'fas fa-code-branch',
			btnClass: 'pubchem'
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.ContentContainers = SH.ContentContainers || {};
	SH.ContentContainers.DefaultSettings = {
		PreviousLabel: "Previous".toLocaleString(),
		NextLabel: "Next".toLocaleString(),
		SortLabel: "Sort by: ".toLocaleString(),
		CollapseLabel: "Collapse".toLocaleString(),
		ExpandLabel: "Expand".toLocaleString(),
		CloseLabel: "Close".toLocaleString(),
		NoResultsLabel: "Sorry, no results found!".toLocaleString(),
		UserProfileServiceURL: SH.RootLevelURL + "/Services/UserProfileService.svc",
		ContentContainers: {
			/*
			SampleContentContainerWithDefaultValues: {
				ParentContainerSelector: '.sh-main-results-container',
				Title: '',
				ControlTemplatePath: SH.RootLevelURL + "/modules/ContentContainers/templates/cbsControlTemplate.html",
				ItemTemplatePicker: function (result) { return SH.RootLevelURL + "/modules/ContentContainers/templates/cbsItemTemplate.html"; },
				QueryText: '',
				QueryTemplate: '{searchboxquery} FederatorBackends:"*"',
				SourceId: 'b29924a9-ec32-4c10-8892-a544b69ee121',
				RowsPerPage: 5,
				EnablePagination: false,
				EnableCountTotal: false,
				EnableSmartPreviews: true,
				EnableContentIntelligence: true,
				EnableResultFeedback: true,
				EnableRatings: false,
				EnablePubChemViewer: false,
				Baskets:{'.basketButton':true},
				ShowSort: false,
				SortProperties: 'Rank,Date',
				SortDirection: 'Descending,Ascending',
				IsMainResults: false,
				FieldsToInclude: 'clickUri,title,Rank,ContentSource,FileExtension,excerpt,SDFUrl,date,DisplayAuthor,isUserProfile,WorkEmail,Title,JobTitle,Department,AboutMe,escbasecrawurl,UserName',
				TriggerNewQueryOn: ''		
			},
			*/
			ChatBotCbs: {
				ParentContainerSelector: '.bot-injected-results',
				Title: 'Bot suggested results:',
				ControlTemplatePath: SH.RootLevelURL + "/modules/ContentContainers/templates/cbsControlTemplate.html",
				ItemTemplatePicker: function (result) { return SH.RootLevelURL + "/modules/ContentContainers/templates/cbsItemTemplate.html"; },
				FieldsToInclude: 'clickUri,title,Rank,ContentSource,FileExtension',
			},
			PersonalizedRecommendations: {
				ParentContainerSelector: '#Recommendations',
				Title: '',
				ControlTemplatePath: SH.RootLevelURL + "/modules/ContentContainers/templates/controlGridResultTemplate.html",
				ItemTemplatePicker: function (result) { return SH.RootLevelURL + "/modules/ContentContainers/templates/personalizedRecommendationsItemTemplate.html"; },
				QueryTemplate: '* FederatorBackends:"*"',
				RowsPerPage: 10,
				FieldsToInclude: 'clickUri,title,Rank,ContentSource,FileExtension,date',
				TriggerNewQueryOn: 'afterInitialization'
			},
			InterestsCBS: {
				ParentContainerSelector: '#InterestsContainer',
				Title: 'Interests',
				ControlTemplatePath: SH.RootLevelURL + "/modules/ContentContainers/templates/controlGridResultTemplate.html",
				ItemTemplatePicker: function (result) { return SH.RootLevelURL + "/modules/ContentContainers/templates/gridResultItemTemplate.html"; },
				QueryTemplate: '* FederatorBackends:"*"',
				FieldsToInclude: 'clickUri,title,Rank,ContentSource,FileExtension',
				TriggerNewQueryOn: 'afterInitialization'
			},
			MyDepartmentCBS: {
				ParentContainerSelector: '#MyDepartmentContainer',
				Title: 'Department',
				ControlTemplatePath: SH.RootLevelURL + "/modules/ContentContainers/templates/controlGridResultTemplate.html",
				ItemTemplatePicker: function (result) { return SH.RootLevelURL + "/modules/ContentContainers/templates/gridResultItemTemplate.html"; },
				QueryTemplate: 'folder FederatorBackends:"*"',
				FieldsToInclude: 'clickUri,title,Rank,ContentSource,FileExtension,date,DisplayAuthor',
				TriggerNewQueryOn: 'afterInitialization'
			},
			ProjectsCBS: {
				ParentContainerSelector: '#ProjectsContainer',
				Title: 'Projects',
				ControlTemplatePath: SH.RootLevelURL + "/modules/ContentContainers/templates/controlGridResultTemplate.html",
				ItemTemplatePicker: function (result) { return SH.RootLevelURL + "/modules/ContentContainers/templates/gridResultItemTemplate.html"; },
				QueryTemplate: 'discussion FederatorBackends:"*"',
				FieldsToInclude: 'clickUri,title,Rank,ContentSource,FileExtension,date,DisplayAuthor',
				TriggerNewQueryOn: 'afterInitialization'
			},
			MyOfficeLocationCBS: {
				ParentContainerSelector: '#MyOfficeLocationContainer',
				Title: 'Office Location',
				ControlTemplatePath: SH.RootLevelURL + "/modules/ContentContainers/templates/controlGridResultTemplate.html",
				ItemTemplatePicker: function (result) { return SH.RootLevelURL + "/modules/ContentContainers/templates/gridResultItemTemplate.html"; },
				QueryTemplate: '* FederatorBackends:"*"',
				FieldsToInclude: 'clickUri,title,Rank,ContentSource,FileExtension,date,DisplayAuthor',
				TriggerNewQueryOn: 'afterInitialization'
			},
			MainResults: {
				Title: 'Content Container',
				ControlTemplatePath: SH.RootLevelURL + "/modules/ContentContainers/templates/controlResultTemplate.html",
				ItemTemplatePicker: function (result) {
					if (result.isUserProfile == 'true')
						return SH.RootLevelURL + "/modules/ContentContainers/templates/peopleResultItemTemplate.html";
					return SH.RootLevelURL + "/modules/ContentContainers/templates/resultItemTemplate.html";
				},
				QueryText: '',
				QueryTemplate: '', //in case that this field remains empty, the value will be read from CoveoTab
				SourceId: '', //in case that this field remains empty, the value will be read from CoveoTab 
				FieldsToInclude: 'clickUri,title,Rank,ContentSource,FileExtension,excerpt,SDFUrl,date,DisplayAuthor,isUserProfile,WorkEmail,Title,JobTitle,Department,AboutMe,escbasecrawurl,UserName',
				RowsPerPage: 10,
				EnablePagination: true,
				EnableCountTotal: true,
				TriggerNewQueryOn: 'deferredQuerySuccess',
				IsMainResults: true
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.ContentFeedback = SH.ContentFeedback || {};
	SH.ContentFeedback.DefaultSettings = {
		Title: "Content Feedback",
		ContentModalTemplatePath: SH.RootLevelURL + "/modules/ContentFeedback/templates/contentFeedbackTemplate.html",
		MailTo: "search@bainsight.com",
		FeedbackReasons: [
			"I should not see this (access issue).".toLocaleString(),
			"Old/Outdated content.".toLocaleString(),
			"Innapropriate content.".toLocaleString()
		],
		ModuleDetails: {
			label: 'Feedback',
			iconClass: 'fas fa-envelope',
			btnClass: 'contentFeedbackBtn'
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.PageFeedback = SH.PageFeedback || {};
	SH.PageFeedback.DefaultSettings = {
		Title: "Page Feedback",
		PageModalTemplatePath: SH.RootLevelURL + "/modules/PageFeedback/templates/pageFeedbackTemplate.html",
		PageFeedbackEnabled: true,
		ButtonTitle: "Search Results Feedback",
		MailTo: "search@bainsight.com",
		FeedbackReasons: [
			"I should not see this (access issue).".toLocaleString(),
			"Old/Outdated content.".toLocaleString(),
			"No results.".toLocaleString()
		]
	};

	///////////////////////////////////////////////////////////////////////////////////////

	SH.BLASTSearch = SH.BLASTSearch || {};
	SH.BLASTSearch.DefaultSettings = {
		Enabled: "false",
		ParentSelector: "#BLASTSearch",
		ProgramName: "blastp",
		DatabaseName: "swissprot",
		TemplatePath: SH.RootLevelURL + "/modules/BLASTSearch/templates/template.html",
		KendoGridSettings: {
			height: 550,
			filterable: false,
			pageable: false,
			groupable: false,
			columns:
				[
					{ field: "accession", title: "Accession", template: "<a href='https://www.ncbi.nlm.nih.gov/protein/#:accession#' target='_blank' class='link'>#:accession# </a>" },
					{ field: "title", title: "Description", width: "30%" },
					{ field: "bit_score", title: "Bit Score" },
					{ field: "score", title: "Score" },
					{ field: "gaps", title: "Gaps" },
					{ field: "evalue", title: "E Value" },
					{ field: "identity", title: "Identity" }
				]
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.SmartAutomations = SH.SmartAutomations || {};
	SH.SmartAutomations.DefaultSettings = {
		Enabled: true,
		PersonalizationText: "Smart Automations".toLocaleString(),
		AddRibbonButton: true,
		ShowAsFlyover: true,
		RibbonButtonText: "Smart Automations".toLocaleString(),
		RibbonButtonLink: SH.RootLevelURL + "/SmartAutomations.html",
		RibbonTemplatePath: SH.RootLevelURL + "/modules/SmartAutomations/templates/ribbonButtonTemplate.html",
		ModuleTemplatePath: SH.RootLevelURL + "/modules/SmartAutomations/templates/moduleTemplate.html",
		CategoryTemplatePath: SH.RootLevelURL + "/modules/SmartAutomations/templates/categoryTemplate.html",
		ActionTemplatePath: SH.RootLevelURL + "/modules/SmartAutomations/templates/actionTemplate.html",
		ActionModalTemplatePath: SH.RootLevelURL + "/modules/SmartAutomations/templates/actionModalTemplate.html",
		ActionModalMetadataTemplatePath: SH.RootLevelURL + "/modules/SmartAutomations/templates/actionModalMetadataTemplate.html",
		ShowMoreTemplatePath: SH.RootLevelURL + "/modules/SmartAutomations/templates/showMoreTemplate.html",
		ActionModalSelector: ".smartAutomationsModal",
		ActionListSelector: ".smartAutomationsList",
		CategoryListSelector: ".smartAutomationsCategoryList",
		ParentSelector: ".smartAutomations",
		CategoryTemplateClass: "category-template",
		NumberOfActions: 5,
		ShowMore: true,
		Categories: [
			{
				Name: "SharePoint",
				Tags: "Sharepoint"
			},
			{
				Name: "Salesforce",
				Tags: "SF"
			},
			{
				Name: "iManage",
				Tags: "iManage"
			},
			{
				Name: "NetDocs",
				Tags: "NetDocs"
			},
			{
				Name: "Dynamics",
				Tags: "Dynamics Browser Automation"
			},
			{
				Name: "Application 1",
				Tags: "TBD"
			},
			{
				Name: "Application 2",
				Tags: "TBD"
			},
			{
				Name: "Application 3",
				Tags: "TBD"
			}
		],
		Applications: {
			Icons: []
		},
		DocumentPickerSettings: {
			EnableCondition: "actionMetadata.indexOf('FileName') !== -1",
			PlaceHolder: "Search for a document".toLocaleString(),
			MaxDocumentsToReturn: 50,
			QueryTemplate: "{searchboxquery}",
			SourceId: "b29924a9-ec32-4c10-8892-a544b69ee121",
			MetadataMappings: {
				"FileName": "title",
				"YourSmartActionFieldName": "SmartHubMedataName"
			}
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////

	SH.ProximitySearch = SH.ProximitySearch || {};
	SH.ProximitySearch.DefaultSettings = {
		Enabled: "false",
		Labels: {
			TermProximity: "Term proximity",
			Description: "Drag the slider to modify the maximum distance between matched terms in documents",
			InactiveSliderReason: "The slider can be used when the query has at least 2 terms and is not an advanced expression.",
			SideBySide: "Side by side",
			SameSentence: "In the same sentence",
			SameParagraph: "In the same paragraph",
			Anywhere: "Anywhere in the document",
			SideBySide_short: "side by side",
			SameSentence_short: "same sentence",
			SameParagraph_short: "same paragraph",
			Anywhere_short: "anywhere",
			OneWordApart: "Max 1 word apart",
			MultipleWordsApart: "Max {0} words apart"
		},
		SameSentencePosition: 8,
		SameParagraphPosition: 20,
		SentenceMatchProperty: "AC_Sentence",
		ParagraphMatchProperty: "AC_Paragraph",
		DefaultNearOperatorValue: 100,
		ParentSelector: "#ProximitySearch",
		MaxWordDistance: 30,
		TemplatePath: SH.RootLevelURL + "/modules/ProximitySearch/ProximitySearchTemplate.html"
	}

	///////////////////////////////////////////////////////////////////////////////////////


	SH.Basket = SH.Basket || {};
	SH.Basket.DefaultSettings = {
		".basketButton": {
			Enabled: false,
			GroupName: "global",
			SearchInterfaceElement: ".CoveoSearchInterface",
			IDMetadata: 'clickUri',
			BasketModalID: "basketModal",
			Labels: {
				AddItem: "Add to basket".toLocaleString(),
				RemoveItem: "Remove from basket".toLocaleString(),
				BasketTitle: "My Items".toLocaleString(),
				BasketButton: "My basket".toLocaleString(),
				CancelButton: "Cancel".toLocaleString(),
				CheckoutOptions: "Checkout options".toLocaleString()
			},
			BasketTemplatePath: SH.RootLevelURL + "/modules/Basket/templates/basketTemplate.html",
			ItemTemplatePath: SH.RootLevelURL + "/modules/Basket/templates/itemTemplate.html",
			ButtonTemplatePath: SH.RootLevelURL + "/modules/Basket/templates/buttonTemplate.html",
			BasketClass: "sh-basket",
			BasketIconClass: "sh-icon-button fas fa-cart-plus",
			RemoveIconClass: "sh-icon-button remove-btn fas fa-cart-arrow-down"
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.PageOverrides = SH.PageOverrides || {};
	SH.PageOverrides = {
		"/SmartAutomations.html": {
			"SH.SmartAutomations": {
				ShowAsFlyover: false,
			}
		},
		"/landing.html": {
			"SH.SmartAutomations": {
				ShowAsFlyover: false,
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////

	SH.Alerts = SH.Alerts || {};
	SH.Alerts.DefaultSettings = {
		Enabled: true,
		CreateAlertTitle: "Create alert",
		GetAlertsEventName: "SH.GetTypeAheadAlerts",
		ModalPath: SH.RootLevelURL + "/modules/Alerts/modal.html",
		EmailFrequency: {
			"Every Monday morning": "0 10 * * 1",
			"Every Friday evening": "0 0 18 * 5",
			"Every month": "0 0 1 * *"
			//add your custom schedule here using the format "Label":"CRON"
		}
	};

	///////////////////////////////////////////////////////////////////////////////////////

	//other here
})();
