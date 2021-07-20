import { getPageResources, getCSSResources, getJSResources, getWidgets, getWidgetSettings } from '/pageSettings.js';
import { LoadCSS } from '/core/js/loader/cssLoader.js';
//import '/core/libs/jQuery.js';
//import '/core/libs/underscore.js';
import { LoadJS } from '/core/js/loader/jsLoader.js';
LoadCSS(getCSSResources());
LoadJS(getJSResources());