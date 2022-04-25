/*!
 * hnl.mobileConsole - javascript mobile console - v2.0.6 - build 22.0422 - 04/2022
 * Adds html console to webpage. Especially useful for debugging JS on mobile devices.
 * Supports 'log', 'trace', 'info', 'warn', 'error', 'group', 'groupEnd', 'table', 'assert', 'clear'
 * Licensed under the MIT license
 *
 * Changelog:
 * 2.0.6
 *  - Bugfix
 * 2.0.5
 *  - Restructured & cleaned up code
 *  - Shortened CSS selectors
 *  - Factory-wrapped mobileConsole
 *  - Rewrote parts of, and restructured, HTML stringifier
 * 2.0.4
 *  - Fixed mobileConsole leaking into the window
 *  - Fixed a bug where everything other than objects didn't produce any output
 * 2.0.3
 *  - Rewrote large portions of the object parser to better match chrome devtools output + colors
 *  - Continued restructuring colors
 * 2.0.2
 *  - Restructured colors
 *  - Added stack traces to custom .error() log messages
 *  - Minor fixes
 * 2.0.1
 *  - Integrated stacktracejs instead of dynamic import
 *  - Added user-prefers dark-mode support
 *  - Added time() and timeEnd() support
 *  - Added option to minimize console, by tapping/clicking the top bar, which also acts as a resize-handle for the console
 * 2.0.0
 *  - Complete rewrite
 *
 * Original author: @hnldesign
 * Further changes, comments: @hnldesign
 * Copyright (c) 2014-2022 HN Leussink
 * Dual licensed under the MIT and GPL licenses.
 *
 * Info: http://www.hnldesign.nl/work/code/javascript-mobile-console/
 * Demo: http://code.hnldesign.nl/demo/hnl.MobileConsole.html
 *
 * todo:
 *  grouping
 *  grouping repeated logs of same type
 *  toggling of logtypes
 *
 */

/* stracktracejs:*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.StackTrace=e()}}(function(){var e;return function(){function e(n,r,t){function o(a,s){if(!r[a]){if(!n[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[a]={exports:{}};n[a][0].call(l.exports,function(e){var r=n[a][1][e];return o(r||e)},l,l.exports,e,n,r,t)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<t.length;a++)o(t[a]);return o}return e}()({1:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("error-stack-parser",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.ErrorStackParser=i(o.StackFrame)}(this,function(e){"use strict";var n=/(^|@)\S+:\d+/,r=/^\s*at .*(\S+:\d+|\(native\))/m,t=/^(eval@)?(\[native code])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(r))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var n=/(.+?)(?::(\d+))?(?::(\d+))?$/,r=n.exec(e.replace(/[()]/g,""));return[r[1],r[2]||void 0,r[3]||void 0]},parseV8OrIE:function(n){var t=n.stack.split("\n").filter(function(e){return!!e.match(r)},this);return t.map(function(n){n.indexOf("(eval ")>-1&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(\),.*$)/g,""));var r=n.replace(/^\s+/,"").replace(/\(eval code/g,"("),t=r.match(/ (\((.+):(\d+):(\d+)\)$)/);r=t?r.replace(t[0],""):r;var o=r.split(/\s+/).slice(1),i=this.extractLocation(t?t[1]:o.pop()),a=o.join(" ")||void 0,s=["eval","<anonymous>"].indexOf(i[0])>-1?void 0:i[0];return new e({functionName:a,fileName:s,lineNumber:i[1],columnNumber:i[2],source:n})},this)},parseFFOrSafari:function(n){var r=n.stack.split("\n").filter(function(e){return!e.match(t)},this);return r.map(function(n){if(n.indexOf(" > eval")>-1&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),n.indexOf("@")===-1&&n.indexOf(":")===-1)return new e({functionName:n});var r=/((.*".+"[^@]*)?[^@]*)(?:@)/,t=n.match(r),o=t&&t[1]?t[1]:void 0,i=this.extractLocation(n.replace(r,""));return new e({functionName:o,fileName:i[0],lineNumber:i[1],columnNumber:i[2],source:n})},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,t=n.message.split("\n"),o=[],i=2,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera10:function(n){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,t=n.stacktrace.split("\n"),o=[],i=0,a=t.length;i<a;i+=2){var s=r.exec(t[i]);s&&o.push(new e({functionName:s[3]||void 0,fileName:s[2],lineNumber:s[1],source:t[i]}))}return o},parseOpera11:function(r){var t=r.stack.split("\n").filter(function(e){return!!e.match(n)&&!e.match(/^Error created at/)},this);return t.map(function(n){var r,t=n.split("@"),o=this.extractLocation(t.pop()),i=t.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0;i.match(/\(([^)]*)\)/)&&(r=i.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new e({functionName:a,args:s,fileName:o[0],lineNumber:o[1],columnNumber:o[2],source:n})},this)}}})},{stackframe:2}],2:[function(n,r,t){!function(n,o){"use strict";"function"==typeof e&&e.amd?e("stackframe",[],o):"object"==typeof t?r.exports=o():n.StackFrame=o()}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function n(e){return e.charAt(0).toUpperCase()+e.substring(1)}function r(e){return function(){return this[e]}}function t(e){if(e)for(var r=0;r<u.length;r++)void 0!==e[u[r]]&&this["set"+n(u[r])](e[u[r]])}var o=["isConstructor","isEval","isNative","isToplevel"],i=["columnNumber","lineNumber"],a=["fileName","functionName","source"],s=["args"],u=o.concat(i,a,s);t.prototype={getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(e){if(e instanceof t)this.evalOrigin=e;else{if(!(e instanceof Object))throw new TypeError("Eval Origin must be an Object or StackFrame");this.evalOrigin=new t(e)}},toString:function(){var e=this.getFileName()||"",n=this.getLineNumber()||"",r=this.getColumnNumber()||"",t=this.getFunctionName()||"";return this.getIsEval()?e?"[eval] ("+e+":"+n+":"+r+")":"[eval]:"+n+":"+r:t?t+" ("+e+":"+n+":"+r+")":e+":"+n+":"+r}},t.fromString=function(e){var n=e.indexOf("("),r=e.lastIndexOf(")"),o=e.substring(0,n),i=e.substring(n+1,r).split(","),a=e.substring(r+1);if(0===a.indexOf("@"))var s=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(a,""),u=s[1],c=s[2],l=s[3];return new t({functionName:o,args:i||void 0,fileName:u,lineNumber:c||void 0,columnNumber:l||void 0})};for(var c=0;c<o.length;c++)t.prototype["get"+n(o[c])]=r(o[c]),t.prototype["set"+n(o[c])]=function(e){return function(n){this[e]=Boolean(n)}}(o[c]);for(var l=0;l<i.length;l++)t.prototype["get"+n(i[l])]=r(i[l]),t.prototype["set"+n(i[l])]=function(n){return function(r){if(!e(r))throw new TypeError(n+" must be a Number");this[n]=Number(r)}}(i[l]);for(var f=0;f<a.length;f++)t.prototype["get"+n(a[f])]=r(a[f]),t.prototype["set"+n(a[f])]=function(e){return function(n){this[e]=String(n)}}(a[f]);return t})},{}],3:[function(e,n,r){function t(){this._array=[],this._set=Object.create(null)}var o=e("./util"),i=Object.prototype.hasOwnProperty;t.fromArray=function(e,n){for(var r=new t,o=0,i=e.length;o<i;o++)r.add(e[o],n);return r},t.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},t.prototype.add=function(e,n){var r=o.toSetString(e),t=i.call(this._set,r),a=this._array.length;t&&!n||this._array.push(e),t||(this._set[r]=a)},t.prototype.has=function(e){var n=o.toSetString(e);return i.call(this._set,n)},t.prototype.indexOf=function(e){var n=o.toSetString(e);if(i.call(this._set,n))return this._set[n];throw new Error('"'+e+'" is not in the set.')},t.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},t.prototype.toArray=function(){return this._array.slice()},r.ArraySet=t},{"./util":9}],4:[function(e,n,r){function t(e){return e<0?(-e<<1)+1:(e<<1)+0}function o(e){var n=1===(1&e),r=e>>1;return n?-r:r}var i=e("./base64"),a=5,s=1<<a,u=s-1,c=s;r.encode=function(e){var n,r="",o=t(e);do n=o&u,o>>>=a,o>0&&(n|=c),r+=i.encode(n);while(o>0);return r},r.decode=function(e,n,r){var t,s,l=e.length,f=0,p=0;do{if(n>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(s=i.decode(e.charCodeAt(n++)),s===-1)throw new Error("Invalid base64 digit: "+e.charAt(n-1));t=!!(s&c),s&=u,f+=s<<p,p+=a}while(t);r.value=o(f),r.rest=n}},{"./base64":5}],5:[function(e,n,r){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");r.encode=function(e){if(0<=e&&e<t.length)return t[e];throw new TypeError("Must be between 0 and 63: "+e)},r.decode=function(e){var n=65,r=90,t=97,o=122,i=48,a=57,s=43,u=47,c=26,l=52;return n<=e&&e<=r?e-n:t<=e&&e<=o?e-t+c:i<=e&&e<=a?e-i+l:e==s?62:e==u?63:-1}},{}],6:[function(e,n,r){function t(e,n,o,i,a,s){var u=Math.floor((n-e)/2)+e,c=a(o,i[u],!0);return 0===c?u:c>0?n-u>1?t(u,n,o,i,a,s):s==r.LEAST_UPPER_BOUND?n<i.length?n:-1:u:u-e>1?t(e,u,o,i,a,s):s==r.LEAST_UPPER_BOUND?u:e<0?-1:e}r.GREATEST_LOWER_BOUND=1,r.LEAST_UPPER_BOUND=2,r.search=function(e,n,o,i){if(0===n.length)return-1;var a=t(-1,n.length,e,n,o,i||r.GREATEST_LOWER_BOUND);if(a<0)return-1;for(;a-1>=0&&0===o(n[a],n[a-1],!0);)--a;return a}},{}],7:[function(e,n,r){function t(e,n,r){var t=e[n];e[n]=e[r],e[r]=t}function o(e,n){return Math.round(e+Math.random()*(n-e))}function i(e,n,r,a){if(r<a){var s=o(r,a),u=r-1;t(e,s,a);for(var c=e[a],l=r;l<a;l++)n(e[l],c)<=0&&(u+=1,t(e,u,l));t(e,u+1,l);var f=u+1;i(e,n,r,f-1),i(e,n,f+1,a)}}r.quickSort=function(e,n){i(e,n,0,e.length-1)}},{}],8:[function(e,n,r){function t(e){var n=e;return"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=n.sections?new a(n):new o(n)}function o(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),t=s.getArg(n,"sources"),o=s.getArg(n,"names",[]),i=s.getArg(n,"sourceRoot",null),a=s.getArg(n,"sourcesContent",null),u=s.getArg(n,"mappings"),l=s.getArg(n,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);t=t.map(String).map(s.normalize).map(function(e){return i&&s.isAbsolute(i)&&s.isAbsolute(e)?s.relative(i,e):e}),this._names=c.fromArray(o.map(String),!0),this._sources=c.fromArray(t,!0),this.sourceRoot=i,this.sourcesContent=a,this._mappings=u,this.file=l}function i(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function a(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=s.getArg(n,"version"),o=s.getArg(n,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new c,this._names=new c;var i={line:-1,column:0};this._sections=o.map(function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var n=s.getArg(e,"offset"),r=s.getArg(n,"line"),o=s.getArg(n,"column");if(r<i.line||r===i.line&&o<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=n,{generatedOffset:{generatedLine:r+1,generatedColumn:o+1},consumer:new t(s.getArg(e,"map"))}})}var s=e("./util"),u=e("./binary-search"),c=e("./array-set").ArraySet,l=e("./base64-vlq"),f=e("./quick-sort").quickSort;t.fromSourceMap=function(e){return o.fromSourceMap(e)},t.prototype._version=3,t.prototype.__generatedMappings=null,Object.defineProperty(t.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),t.prototype.__originalMappings=null,Object.defineProperty(t.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),t.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},t.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},t.GENERATED_ORDER=1,t.ORIGINAL_ORDER=2,t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.prototype.eachMapping=function(e,n,r){var o,i=n||null,a=r||t.GENERATED_ORDER;switch(a){case t.GENERATED_ORDER:o=this._generatedMappings;break;case t.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var u=this.sourceRoot;o.map(function(e){var n=null===e.source?null:this._sources.at(e.source);return null!=n&&null!=u&&(n=s.join(u,n)),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,i)},t.prototype.allGeneratedPositionsFor=function(e){var n=s.getArg(e,"line"),r={source:s.getArg(e,"source"),originalLine:n,originalColumn:s.getArg(e,"column",0)};if(null!=this.sourceRoot&&(r.source=s.relative(this.sourceRoot,r.source)),!this._sources.has(r.source))return[];r.source=this._sources.indexOf(r.source);var t=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,u.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(void 0===e.column)for(var a=i.originalLine;i&&i.originalLine===a;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var c=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==c;)t.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return t},r.SourceMapConsumer=t,o.prototype=Object.create(t.prototype),o.prototype.consumer=t,o.fromSourceMap=function(e){var n=Object.create(o.prototype),r=n._names=c.fromArray(e._names.toArray(),!0),t=n._sources=c.fromArray(e._sources.toArray(),!0);n.sourceRoot=e._sourceRoot,n.sourcesContent=e._generateSourcesContent(n._sources.toArray(),n.sourceRoot),n.file=e._file;for(var a=e._mappings.toArray().slice(),u=n.__generatedMappings=[],l=n.__originalMappings=[],p=0,g=a.length;p<g;p++){var h=a[p],m=new i;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=t.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=r.indexOf(h.name)),l.push(m)),u.push(m)}return f(n.__originalMappings,s.compareByOriginalPositions),n},o.prototype._version=3,Object.defineProperty(o.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?s.join(this.sourceRoot,e):e},this)}}),o.prototype._parseMappings=function(e,n){for(var r,t,o,a,u,c=1,p=0,g=0,h=0,m=0,d=0,v=e.length,_=0,y={},w={},b=[],O=[];_<v;)if(";"===e.charAt(_))c++,_++,p=0;else if(","===e.charAt(_))_++;else{for(r=new i,r.generatedLine=c,a=_;a<v&&!this._charIsMappingSeparator(e,a);a++);if(t=e.slice(_,a),o=y[t])_+=t.length;else{for(o=[];_<a;)l.decode(e,_,w),u=w.value,_=w.rest,o.push(u);if(2===o.length)throw new Error("Found a source, but no line and column");if(3===o.length)throw new Error("Found a source and line, but no column");y[t]=o}r.generatedColumn=p+o[0],p=r.generatedColumn,o.length>1&&(r.source=m+o[1],m+=o[1],r.originalLine=g+o[2],g=r.originalLine,r.originalLine+=1,r.originalColumn=h+o[3],h=r.originalColumn,o.length>4&&(r.name=d+o[4],d+=o[4])),O.push(r),"number"==typeof r.originalLine&&b.push(r)}f(O,s.compareByGeneratedPositionsDeflated),this.__generatedMappings=O,f(b,s.compareByOriginalPositions),this.__originalMappings=b},o.prototype._findMapping=function(e,n,r,t,o,i){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[t]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[t]);return u.search(e,n,o,i)},o.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},o.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",s.compareByGeneratedPositionsDeflated,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(r>=0){var o=this._generatedMappings[r];if(o.generatedLine===n.generatedLine){var i=s.getArg(o,"source",null);null!==i&&(i=this._sources.at(i),null!=this.sourceRoot&&(i=s.join(this.sourceRoot,i)));var a=s.getArg(o,"name",null);return null!==a&&(a=this._names.at(a)),{source:i,line:s.getArg(o,"originalLine",null),column:s.getArg(o,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},o.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))},o.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=s.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var r;if(null!=this.sourceRoot&&(r=s.urlParse(this.sourceRoot))){var t=e.replace(/^file:\/\//,"");if("file"==r.scheme&&this._sources.has(t))return this.sourcesContent[this._sources.indexOf(t)];if((!r.path||"/"==r.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},o.prototype.generatedPositionFor=function(e){var n=s.getArg(e,"source");if(null!=this.sourceRoot&&(n=s.relative(this.sourceRoot,n)),!this._sources.has(n))return{line:null,column:null,lastColumn:null};n=this._sources.indexOf(n);var r={source:n,originalLine:s.getArg(e,"line"),originalColumn:s.getArg(e,"column")},o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,s.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(o>=0){var i=this._originalMappings[o];if(i.source===r.source)return{line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},r.BasicSourceMapConsumer=o,a.prototype=Object.create(t.prototype),a.prototype.constructor=t,a.prototype._version=3,Object.defineProperty(a.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),a.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},r=u.search(n,this._sections,function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r?r:e.generatedColumn-n.generatedOffset.generatedColumn}),t=this._sections[r];return t?t.consumer.originalPositionFor({line:n.generatedLine-(t.generatedOffset.generatedLine-1),column:n.generatedColumn-(t.generatedOffset.generatedLine===n.generatedLine?t.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},a.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},a.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r],o=t.consumer.sourceContentFor(e,!0);if(o)return o}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},a.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(r.consumer.sources.indexOf(s.getArg(e,"source"))!==-1){var t=r.consumer.generatedPositionFor(e);if(t){var o={line:t.line+(r.generatedOffset.generatedLine-1),column:t.column+(r.generatedOffset.generatedLine===t.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}},a.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var t=this._sections[r],o=t.consumer._generatedMappings,i=0;i<o.length;i++){var a=o[i],u=t.consumer._sources.at(a.source);null!==t.consumer.sourceRoot&&(u=s.join(t.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var c=t.consumer._names.at(a.name);this._names.add(c),c=this._names.indexOf(c);var l={source:u,generatedLine:a.generatedLine+(t.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(t.generatedOffset.generatedLine===a.generatedLine?t.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:c};this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}f(this.__generatedMappings,s.compareByGeneratedPositionsDeflated),f(this.__originalMappings,s.compareByOriginalPositions)},r.IndexedSourceMapConsumer=a},{"./array-set":3,"./base64-vlq":4,"./binary-search":6,"./quick-sort":7,"./util":9}],9:[function(e,n,r){function t(e,n,r){if(n in e)return e[n];if(3===arguments.length)return r;throw new Error('"'+n+'" is a required argument.')}function o(e){var n=e.match(v);return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function i(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function a(e){var n=e,t=o(e);if(t){if(!t.path)return e;n=t.path}for(var a,s=r.isAbsolute(n),u=n.split(/\/+/),c=0,l=u.length-1;l>=0;l--)a=u[l],"."===a?u.splice(l,1):".."===a?c++:c>0&&(""===a?(u.splice(l+1,c),c=0):(u.splice(l,2),c--));return n=u.join("/"),""===n&&(n=s?"/":"."),t?(t.path=n,i(t)):n}function s(e,n){""===e&&(e="."),""===n&&(n=".");var r=o(n),t=o(e);if(t&&(e=t.path||"/"),r&&!r.scheme)return t&&(r.scheme=t.scheme),i(r);if(r||n.match(_))return n;if(t&&!t.host&&!t.path)return t.host=n,i(t);var s="/"===n.charAt(0)?n:a(e.replace(/\/+$/,"")+"/"+n);return t?(t.path=s,i(t)):s}function u(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");for(var r=0;0!==n.indexOf(e+"/");){var t=e.lastIndexOf("/");if(t<0)return n;if(e=e.slice(0,t),e.match(/^([^\/]+:\/)?\/*$/))return n;++r}return Array(r+1).join("../")+n.substr(e.length+1)}function c(e){return e}function l(e){return p(e)?"$"+e:e}function f(e){return p(e)?e.slice(1):e}function p(e){if(!e)return!1;var n=e.length;if(n<9)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var r=n-10;r>=0;r--)if(36!==e.charCodeAt(r))return!1;return!0}function g(e,n,r){var t=e.source-n.source;return 0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t||r?t:(t=e.generatedColumn-n.generatedColumn,0!==t?t:(t=e.generatedLine-n.generatedLine,0!==t?t:e.name-n.name))))}function h(e,n,r){var t=e.generatedLine-n.generatedLine;return 0!==t?t:(t=e.generatedColumn-n.generatedColumn,0!==t||r?t:(t=e.source-n.source,0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t?t:e.name-n.name))))}function m(e,n){return e===n?0:e>n?1:-1}function d(e,n){var r=e.generatedLine-n.generatedLine;return 0!==r?r:(r=e.generatedColumn-n.generatedColumn,0!==r?r:(r=m(e.source,n.source),0!==r?r:(r=e.originalLine-n.originalLine,0!==r?r:(r=e.originalColumn-n.originalColumn,0!==r?r:m(e.name,n.name)))))}r.getArg=t;var v=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,_=/^data:.+\,.+$/;r.urlParse=o,r.urlGenerate=i,r.normalize=a,r.join=s,r.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(v)},r.relative=u;var y=function(){var e=Object.create(null);return!("__proto__"in e)}();r.toSetString=y?c:l,r.fromSetString=y?c:f,r.compareByOriginalPositions=g,r.compareByGeneratedPositionsDeflated=h,r.compareByGeneratedPositionsInflated=d},{}],10:[function(e,n,r){arguments[4][2][0].apply(r,arguments)},{dup:2}],11:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stack-generator",["stackframe"],i):"object"==typeof t?r.exports=i(n("stackframe")):o.StackGenerator=i(o.StackFrame)}(this,function(e){return{backtrace:function(n){var r=[],t=10;"object"==typeof n&&"number"==typeof n.maxStackSize&&(t=n.maxStackSize);for(var o=arguments.callee;o&&r.length<t&&o.arguments;){for(var i=new Array(o.arguments.length),a=0;a<i.length;++a)i[a]=o.arguments[a];/function(?:\s+([\w$]+))+\s*\(/.test(o.toString())?r.push(new e({functionName:RegExp.$1||void 0,args:i})):r.push(new e({args:i}));try{o=o.caller}catch(s){break}}return r}}})},{stackframe:10}],12:[function(e,n,r){arguments[4][2][0].apply(r,arguments)},{dup:2}],13:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace-gps",["source-map","stackframe"],i):"object"==typeof t?r.exports=i(n("source-map/lib/source-map-consumer"),n("stackframe")):o.StackTraceGPS=i(o.SourceMap||o.sourceMap,o.StackFrame)}(this,function(e,n){"use strict";function r(e){return new Promise(function(n,r){var t=new XMLHttpRequest;t.open("get",e),t.onerror=r,t.onreadystatechange=function(){4===t.readyState&&(t.status>=200&&t.status<300||"file://"===e.substr(0,7)&&t.responseText?n(t.responseText):r(new Error("HTTP status: "+t.status+" retrieving "+e)))},t.send()})}function t(e){if("undefined"!=typeof window&&window.atob)return window.atob(e);throw new Error("You must supply a polyfill for window.atob in this environment")}function o(e){if("undefined"!=typeof JSON&&JSON.parse)return JSON.parse(e);throw new Error("You must supply a polyfill for JSON.parse in this environment")}function i(e,n){for(var r=[/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,/function\s+([^('"`]*?)\s*\(([^)]*)\)/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,/\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?(\S+)\s*\(.*?\)\s*\{/,/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/],t=e.split("\n"),o="",i=Math.min(n,20),a=0;a<i;++a){var s=t[n-a-1],u=s.indexOf("//");if(u>=0&&(s=s.substr(0,u)),s){o=s+o;for(var c=r.length,l=0;l<c;l++){var f=r[l].exec(o);if(f&&f[1])return f[1]}}}}function a(){if("function"!=typeof Object.defineProperty||"function"!=typeof Object.create)throw new Error("Unable to consume source maps in older browsers")}function s(e){if("object"!=typeof e)throw new TypeError("Given StackFrame is not an object");if("string"!=typeof e.fileName)throw new TypeError("Given file name is not a String");if("number"!=typeof e.lineNumber||e.lineNumber%1!==0||e.lineNumber<1)throw new TypeError("Given line number must be a positive integer");if("number"!=typeof e.columnNumber||e.columnNumber%1!==0||e.columnNumber<0)throw new TypeError("Given column number must be a non-negative integer");return!0}function u(e){for(var n,r,t=/\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;r=t.exec(e);)n=r[1];if(n)return n;throw new Error("sourceMappingURL not found")}function c(e,r,t){return new Promise(function(o,i){var a=r.originalPositionFor({line:e.lineNumber,column:e.columnNumber});if(a.source){var s=r.sourceContentFor(a.source);s&&(t[a.source]=s),o(new n({functionName:a.name||e.functionName,args:e.args,fileName:a.source,lineNumber:a.line,columnNumber:a.column}))}else i(new Error("Could not get original source for given stackframe and source map"))})}return function l(f){return this instanceof l?(f=f||{},this.sourceCache=f.sourceCache||{},this.sourceMapConsumerCache=f.sourceMapConsumerCache||{},this.ajax=f.ajax||r,this._atob=f.atob||t,this._get=function(e){return new Promise(function(n,r){var t="data:"===e.substr(0,5);if(this.sourceCache[e])n(this.sourceCache[e]);else if(f.offline&&!t)r(new Error("Cannot make network requests in offline mode"));else if(t){var o=/^data:application\/json;([\w=:"-]+;)*base64,/,i=e.match(o);if(i){var a=i[0].length,s=e.substr(a),u=this._atob(s);this.sourceCache[e]=u,n(u)}else r(new Error("The encoding of the inline sourcemap is not supported"))}else{var c=this.ajax(e,{method:"get"});this.sourceCache[e]=c,c.then(n,r)}}.bind(this))},this._getSourceMapConsumer=function(n,r){return new Promise(function(t){if(this.sourceMapConsumerCache[n])t(this.sourceMapConsumerCache[n]);else{var i=new Promise(function(t,i){return this._get(n).then(function(n){"string"==typeof n&&(n=o(n.replace(/^\)\]\}'/,""))),"undefined"==typeof n.sourceRoot&&(n.sourceRoot=r),t(new e.SourceMapConsumer(n))},i)}.bind(this));this.sourceMapConsumerCache[n]=i,t(i)}}.bind(this))},this.pinpoint=function(e){return new Promise(function(n,r){this.getMappedLocation(e).then(function(e){function r(){n(e)}this.findFunctionName(e).then(n,r)["catch"](r)}.bind(this),r)}.bind(this))},this.findFunctionName=function(e){return new Promise(function(r,t){s(e),this._get(e.fileName).then(function(t){var o=e.lineNumber,a=e.columnNumber,s=i(t,o,a);r(s?new n({functionName:s,args:e.args,fileName:e.fileName,lineNumber:o,columnNumber:a}):e)},t)["catch"](t)}.bind(this))},void(this.getMappedLocation=function(e){return new Promise(function(n,r){a(),s(e);var t=this.sourceCache,o=e.fileName;this._get(o).then(function(r){var i=u(r),a="data:"===i.substr(0,5),s=o.substring(0,o.lastIndexOf("/")+1);return"/"===i[0]||a||/^https?:\/\/|^\/\//i.test(i)||(i=s+i),this._getSourceMapConsumer(i,s).then(function(r){return c(e,r,t).then(n)["catch"](function(){n(e)})})}.bind(this),r)["catch"](r)}.bind(this))})):new l(f)}})},{"source-map/lib/source-map-consumer":8,stackframe:12}],14:[function(n,r,t){!function(o,i){"use strict";"function"==typeof e&&e.amd?e("stacktrace",["error-stack-parser","stack-generator","stacktrace-gps"],i):"object"==typeof t?r.exports=i(n("error-stack-parser"),n("stack-generator"),n("stacktrace-gps")):o.StackTrace=i(o.ErrorStackParser,o.StackGenerator,o.StackTraceGPS)}(this,function(e,n,r){function t(e,n){var r={};return[e,n].forEach(function(e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}),r}function o(e){return e.stack||e["opera#sourceloc"]}function i(e,n){return"function"==typeof n?e.filter(n):e}var a={filter:function(e){return(e.functionName||"").indexOf("StackTrace$$")===-1&&(e.functionName||"").indexOf("ErrorStackParser$$")===-1&&(e.functionName||"").indexOf("StackTraceGPS$$")===-1&&(e.functionName||"").indexOf("StackGenerator$$")===-1},sourceCache:{}},s=function(){try{throw new Error}catch(e){return e}};return{get:function(e){var n=s();return o(n)?this.fromError(n,e):this.generateArtificially(e)},getSync:function(r){r=t(a,r);var u=s(),c=o(u)?e.parse(u):n.backtrace(r);return i(c,r.filter)},fromError:function(n,o){o=t(a,o);var s=new r(o);return new Promise(function(r){var t=i(e.parse(n),o.filter);r(Promise.all(t.map(function(e){return new Promise(function(n){function r(){n(e)}s.pinpoint(e).then(n,r)["catch"](r)})})))}.bind(this))},generateArtificially:function(e){e=t(a,e);var r=n.backtrace(e);return"function"==typeof e.filter&&(r=r.filter(e.filter)),Promise.resolve(r)},instrument:function(e,n,r,t){if("function"!=typeof e)throw new Error("Cannot instrument non-function object");if("function"==typeof e.__stacktraceOriginalFn)return e;var i=function(){try{return this.get().then(n,r)["catch"](r),e.apply(t||this,arguments)}catch(i){throw o(i)&&this.fromError(i).then(n,r)["catch"](r),i}}.bind(this);return i.__stacktraceOriginalFn=e,i},deinstrument:function(e){if("function"!=typeof e)throw new Error("Cannot de-instrument non-function object");return"function"==typeof e.__stacktraceOriginalFn?e.__stacktraceOriginalFn:e},report:function(e,n,r,t){return new Promise(function(o,i){var a=new XMLHttpRequest;if(a.onerror=i,a.onreadystatechange=function(){4===a.readyState&&(a.status>=200&&a.status<400?o(a.responseText):i(new Error("POST to "+n+" failed with status: "+a.status)))},a.open("post",n),a.setRequestHeader("Content-Type","application/json"),t&&"object"==typeof t.headers){var s=t.headers;for(var u in s)Object.prototype.hasOwnProperty.call(s,u)&&a.setRequestHeader(u,s[u])}var c={stack:e};void 0!==r&&null!==r&&(c.message=r),a.send(JSON.stringify(c))})}}})},{"error-stack-parser":1,"stack-generator":11,"stacktrace-gps":13}]},{},[14])(14)});

/* mobileconsole: */
!function (e) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
    var n;
    n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, n.StackTrace = e()
  }
}(function () {
  'use strict';
  (function mobileConsole(console, StackTraceJs) {
    window.originalConsole = {}; //keep the original, unmodified console for internal debugging

    const mc = {
      _build : '22.0408',
      _options : {
        stacktraces: true, //do you want stacktraces? Frees up some screenspace if disabled
      },
      _icos : {
        caret:    '<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>',
        chevron:  '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>',
        error:    '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>',
        info:     '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>',
        warn:     '<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>',
        clear:    '<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>'
      },
      _methods: [],
      _timers : {},
      _uriRegex : new RegExp(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?Â«Â»â€œâ€â€˜â€™]))/ig),
      _eleRegex : new RegExp(/(\w+)=["'](.+?)["']/gi)
    }

    //DETERMINATOR 2 - JUDGEMENT DAY (type determination)
    const _is = {
      HTMLElement: function ($object) {
        return (
          typeof HTMLElement === 'object' ? $object instanceof HTMLElement : //DOM2
            $object && typeof $object === 'object' && true && $object.nodeType === 1 && typeof $object.nodeName === 'string'
        );
      },
      SelfEnclosed: function ($element) {
        return ['area', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param'].indexOf($element.tagName.toLowerCase()) !== -1;
      }
    }

    const _stringify = {
      expander : '<span class="inline-console-icon expander"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' + mc._icos['caret'] + '</svg></span>',
      html : function ($htmlObject, $short) {
        if (!$short) {
          let firstLine = '', expanded = '',
            nodeName = $htmlObject.nodeName.toLowerCase(),
            isEmpty = $htmlObject.innerHTML === '';
          firstLine = (!isEmpty ?this.expander : '') + _prettyHTMLTag($htmlObject);
          if (!isEmpty) {
            expanded += '<span class="mc-object-row visible-expanded"><pre>' + $htmlObject.innerHTML.replace(/[\u00A0-\u9999<>&]/g, function (i) {
              return '&#' + i.charCodeAt(0) + ';';
            }).trim() + '</pre></span>';
          }
          expanded += '<span class="mc-object-row visible-expanded mc-color-tag">&lt;/' + nodeName + '&gt;</span>';
          firstLine += '<span class="hidden-expanded">' + (isEmpty ? '' : '<span class="console-color-hellip">&hellip;</span>') + '&lt;/' + nodeName + '&gt;</span>';
          return firstLine + expanded;
        } else {
          return '<span class="mc-color-tag">' + ($htmlObject.nodeName.toLowerCase() + '</span><span class="mc-color-element-attr-val">#' + $htmlObject.id + '</span><span class="mc-color-element-attr">.' + Object.values($htmlObject.classList).join('.')) + '</span>';
        }
      },
      object: function ($object) {
        let firstLine = '', expanded = '';
        if (typeof $object !== 'undefined') {
          if (!_is.HTMLElement($object)) {
            if (typeof $object !== 'object') {
              expanded = _renderType($object);
            } else if (Array.isArray($object)) {
              firstLine = this.expander + ' <em>(' + $object.length + ') [<span class="mc-color-array-value">' + $object.join('</span>, <span class="mc-color-array-value">') + '</span>]</em>';
              for (const property in $object) {
                expanded += '<span class="mc-object-row"><span class="mc-color-obj-prop">' + property + '</span>: <span class="mc-color-array-value">' + _renderType($object[property], false) + '</span></span>';
              }
              expanded += '<span class="mc-object-row"><span class="mc-color-obj-length">length</span>: <span class="mc-color-array-value">' + $object.length + '</span></span>';
            } else {
              firstLine = this.expander + ' <em>{';
              for (const property in $object) {
                firstLine += '<span class="mc-color-obj-prop">' + property + '</span>: ' + _renderType($object[property], false) + ', ';
                expanded += '<span class="mc-object-row"><span class="mc-color-obj-prop">' + property + '</span>: ' + _renderType($object[property], false) + '</span>';
              }
              firstLine += '}</em>';
            }
            expanded += '<span class="mc-object-row visible-expanded"><span class="mc-color-obj-prop-unchanged">[[Prototype]]</span>: ' + $object.constructor.name + '</span>';
            return '<span class="mc-row-firstline">' + firstLine + '</span>' + expanded;
          } else {
            return _stringify.html($object);
          }
        } else {
          return '<span class="mc-color-grey">undefined</span>';
        }
      }
    }

    function _prettyHTMLTag($input) {
      let nodeName = $input.nodeName.toLowerCase();
      let out = '<span class="mc-color-tag">&lt;' + nodeName + ' ';
      [...$input.outerHTML.split('>')[0].matchAll(mc._eleRegex)].forEach(function(attr){
        attr.shift(); //first item is the match. Don't need that.
        out += '<span class="mc-color-element-attr">' + attr[0] + '</span>="<span class="mc-color-element-attr-val">' + attr[1] + '</span>" ';
      });
      out = out.trim() + '&gt;'
      return out;
    }

    function _renderType($input, $unFolded) {
      let span = '<span class="mc-color-' + (typeof $input) + '">'
      if ($input == null) {
        return span + 'null</span>';
      } else if (_is.HTMLElement($input)) {
        return span + '' + _stringify.html($input, !$unFolded) + '</span>';
      } else if (Array.isArray($input)) {
        let parsedArray = [];
        $input.forEach(function (value, i) {
          //handle nested arrays
          if (Array.isArray(value)) {
            parsedArray.push('</span>Array(' + value.length + ')<span class="mc-color-array-value">');
          } else {
            parsedArray.push(value);
          }
        })
        return '(' + parsedArray.length + ') [<span class="mc-color-array-value">' + ($unFolded ? _stringify.object(parsedArray) : parsedArray.join(', ')) + '</span>]';
      } else if (typeof $input === 'object') {
        return span + '{&hellip;}</span>';
      } else if (typeof $input === 'string') {
        return span + '"' + $input + '"</span>';
      } else if (typeof $input === 'boolean') {
        return span + '' + ($input ? 'true' : 'false') + '</span>';
      } else {
        return span + $input + '</span>';
      }
    }

    function _create($type, $className, $id) {
      if (!$type) {
        return;
      }
      let element = document.createElement($type);
      if ($className) {
        element.className = $className;
      }
      if ($id) {
        element.id = $id;
      }
      return element;
    }

    function _getReferrerFilename($filePath) {
      let fileName = ($filePath && $filePath.includes('/')) ? $filePath.split('\\').pop().split('/').pop() : 'anonymous';
      fileName = fileName.trim() === '' ? '(index)' : fileName;
      fileName = (fileName.split('?').shift().trim() === '') ? fileName : fileName.split('?').shift().trim(); //remove querystring, but only if that doesn't clear the entire filename
      return fileName;
    }

    function _logger($contents) {
      let parts = [],
        timeStamp = performance.now(),
        row = _create('span', 'mc-row'),
        ico = _create('span', 'mc-icon'),
        msg = _create('span', 'mc-message'),
        expander = '<span class="inline-console-icon expander"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' + mc._icos['caret'] + '</svg></span>';
      if ($contents.log_level === 'clear') {
        mc._scroller.innerHTML = '';
        msg.innerHTML = '<i>Console was cleared</i>';
        row.appendChild(ico);
        row.appendChild(msg);
        mc._scroller.appendChild(row);
      } else {
        if ($contents.log_level === 'time') {
          if (mc._timers[$contents.message[0]]) {
            $contents.message[0] = 'Timer \'' + ($contents.message[0] ? $contents.message[0] : 'default') + '\' already exists';
            $contents.log_level = 'warn';
          } else {
            mc._timers[$contents.message[0]] = timeStamp;
            return;
          }
        } else if ($contents.log_level === 'timeEnd') {
          let newMsg;
          if (!mc._timers[$contents.message[0]]) {
            newMsg = 'Timer \'' + ($contents.message[0] ? $contents.message[0] : 'default') + '\' does not exist';
            $contents.log_level = 'warn';
          } else {
            newMsg = $contents.message[0] + ': ' + (timeStamp - mc._timers[$contents.message[0]]) + ' ms';
            delete mc._timers[$contents.message[0]];
          }
          $contents.message[0] = newMsg;
        }
        //parse message
        $contents.message.forEach(function (messagePart, i) {
          if (typeof messagePart === 'string' && messagePart.includes('%c')) {
            parts.push(messagePart.split('%c').slice(1));
          } else {
            parts.push(typeof messagePart !== 'string' ? _stringify.object(messagePart) : messagePart);
          }
        });

        //split into parts
        let finalParts = [];
        parts.forEach(function (part, i) {
          if (typeof part === 'object') {
            part.forEach(function (txt, si) {
              finalParts.push('<span style="' + parts[si + 1] + '">' + txt + '</span>');
              delete parts[si + 1];
            });
          } else {
            finalParts.push(part);
          }
        });

        let ref = _create('span', 'mc-referrer');
        ref.innerHTML = 'anonymous';

        //get referrer (from trace)
        if (typeof $contents.trace !== 'undefined' && $contents.trace.length > 0) {
          let theTrace = $contents.trace[0];
          let fileName = _getReferrerFilename(theTrace.fileName),
            href = theTrace.fileName ? theTrace.fileName.match(mc._uriRegex)[0] : '',
            lineCol = (theTrace.lineNumber) ? ":" + theTrace.lineNumber : '';
          ref.innerHTML = href ? '<a href="' + href + '" target="_blank">' + fileName + lineCol + '</a>' : fileName + lineCol;
          if (theTrace.details) {
            finalParts.push('<br/>' + theTrace.details);
          }
        }

        //todo: rewrite
        if ($contents.log_level === 'trace') {
          if (!mc._options.stacktraces) {
            console.warn('[mobileConsole] stacktraces not enabled, console.trace not available.');
            return false;
          } else {
            msg.innerHTML = expander + 'console.trace<br/>';
            $contents.trace.forEach(function (traceRow) {
              msg.innerHTML += traceRow.source + '<br/>';
            });
            msg.innerHTML = $contents.trace.length ? msg.innerHTML : '(empty trace)';
            row.classList.add('mc-row-expanded');
          }
        } else {
          if ($contents.log_level === 'error' || $contents.log_level === 'warn') {
            msg.innerHTML = (($contents.trace.length && mc._options.stacktraces) ? expander : '') + finalParts.join('') + '<br/>';
            if (mc._options.stacktraces) {
              $contents.trace.forEach(function (traceRow) {
                msg.innerHTML += traceRow.source + '<br/>';
              });
            }
          } else {
            msg.innerHTML += finalParts.join('');
          }
        }
        ico.innerHTML = mc._icos[$contents.log_level] ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' + mc._icos[$contents.log_level] + '</svg>' : '';

        row.appendChild(ico);
        row.appendChild(msg);
        row.classList.add('mc-row-' + $contents.log_level);

        if (mc._options.stacktraces) row.appendChild(ref);

        //make row expandable by user click
        row.addEventListener('click', function () {
          this.classList.toggle('mc-row-expanded');
          _updateWrapper();
        });

        _updateWrapper();
        //write row to console
        mc._scroller.appendChild(row);
      }
    }

    function _updateWrapper() {
      if (mc._scrollWrapper.scrollTop >= 0) {
        // Fixes a safari @ ios issue that requires the element to be redrawn when adding children,
        // to maintain scrolled to bottom position
        mc._scrollWrapper.style.display = 'block';
        mc._scrollWrapper.offsetHeight;
        mc._scrollWrapper.style.display = '';
      }
    }

    function _preLogger($log_level, $originalArgs, $stackTrace) {
      return _logger({
        //'sender_frame' : __gCrWeb.message.getFrameId(),
        'log_level': $log_level,
        'message': Array.prototype.slice.call($originalArgs),
        'url': document.location.href,
        'trace': mc._options.stacktraces ? ($stackTrace ? $stackTrace : StackTraceJs.getSync({
          filter: function (line) {
            return line.fileName ? (!line.fileName.includes('mobileconsole') && !line.fileName.includes('stacktrace')) : true;
          },
          offline: true
        })) : undefined
      });
    }

    function _writeCSS() {
      let scriptPath = new Error().stack.match(mc._uriRegex)[0];
      scriptPath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
      let link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = scriptPath + '/hnl.mobileconsole.css';
      document.head.appendChild(link);
    }

    function _attachConsole() {
      function _attach() {
        document.body.appendChild(mc._element);
        setTimeout(function () {
          document.body.style.paddingBottom = mc._element.clientHeight + 12 + 'px';
        }, 50);
        _writeCSS();
      }

      if (document.readyState !== 'loading') {
        _attach();
      } else {
        window.addEventListener('DOMContentLoaded', _attach);
      }
    }

    function _makeResizable(handle, dest) {
      let startPos = 0,
        resizing = false;

      function resize($e) {
        resizing = true;
        $e.stopPropagation();
        $e.stopImmediatePropagation();
        dest.style.height = dest.clientHeight + 'px';
        document.body.style.paddingBottom = dest.clientHeight + 12 + 'px';
        mc._element.classList.remove('minimized');

        let x, y, dist;
        if ($e.type === 'touchstart' || $e.type === 'touchmove' || $e.type === 'touchend' || $e.type === 'touchcancel') {
          let evt = (typeof $e.originalEvent === 'undefined') ? $e : $e.originalEvent;
          let touch = evt.touches[0] || evt.changedTouches[0];
          x = touch.clientX;
          y = touch.clientY;
          dist = startPos - y;
        } else if ($e.type === 'mousemove') {
          x = $e.clientX;
          y = $e.clientY;
          dist = startPos - y;
        }
        dest.style.height = (parseInt(getComputedStyle(dest, '').height) + dist) + "px";
        startPos = y;
      }

      function pointerDown($e) {
        startPos = $e.y;
        handle.classList.add('active');
        if ($e.type === 'touchstart') {
          document.addEventListener('touchend', pointerUp, false);
          document.addEventListener('touchmove', resize, false);
        } else if ($e.type === 'mousedown') {
          document.addEventListener('mouseup', pointerUp, false);
          document.addEventListener('mousemove', resize, false);
        }
      }

      function pointerUp($e) {
        if (!resizing) {
          //no movement; click/tap event
          mc._element.classList.toggle('minimized');
        }
        handle.classList.remove('active');
        document.body.style.paddingBottom = dest.clientHeight + 12 + 'px';
        if ($e.type === 'touchend') {
          document.removeEventListener('touchmove', resize, false);
          document.removeEventListener('touchend', pointerUp, false);
        } else if ($e.type === 'mouseup') {
          document.removeEventListener('mousemove', resize, false);
          document.removeEventListener('mouseup', pointerUp, false);
        }
        resizing = false;
      }

      handle.addEventListener('mousedown', pointerDown, false);
      handle.addEventListener('touchstart', pointerDown, false);

    }

    function _saferEval($input) {
      $input = mc._inputUser.value
        .replace(/[\u2014]/g, "--")       // em-dash
        .replace(/[\u2022]/g, "*")        // bullet
        .replace(/[\u2018\u2019]/g, "'")  // smart single quotes
        .replace(/[\u201C\u201D]/g, '"'); // smart double quotes
      //taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
      return Function('"use strict";return (' + $input + ')')();
    }

    function _constructConsole() {
      //bricks
      mc._element = _create('div', 'mobile-console');
      mc._handle = _create('div', 'mc-scroll-handle');
      mc._scrollWrapper = _create('div', 'mc-scroller-wrapper');
      mc._scroller = _create('div', 'mc-scroller-content');
      mc._inputForm = _create('form', 'mc-input-form');
      mc._inputUser = _create('input', 'mc-input-input', 'mc-user-input');
      mc._inputWrapper = _create('div', 'mc-input');
      mc._inputChevron = _create('span', 'mc-icon');
      mc._btnClear = _create('span', 'mc-icon console-button');

      //lego
      mc._scrollWrapper.appendChild(mc._scroller);
      mc._inputChevron.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' + mc._icos.chevron + '</svg>';
      mc._inputForm.appendChild(mc._inputUser);
      mc._btnClear.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' + mc._icos.clear + '</svg>';
      mc._inputWrapper.appendChild(mc._inputChevron);
      mc._inputWrapper.appendChild(mc._inputForm);
      mc._inputWrapper.appendChild(mc._btnClear);
      mc._element.appendChild(mc._scrollWrapper);
      mc._element.appendChild(mc._inputWrapper);
      mc._element.appendChild(mc._handle);

      mc._handle.setAttribute('title', 'Drag to resize console, or tap/click to minimize');
      mc._btnClear.setAttribute('title', 'Tap/click to clear console');
      mc._btnClear.setAttribute('role', 'button');
      mc._inputUser.setAttribute('type', 'text');
      mc._inputUser.setAttribute('autocapitalize', 'none');
      mc._inputUser.setAttribute('autocorrect', 'off');
      mc._inputUser.setAttribute('spellcheck', 'false');
      mc._inputUser.setAttribute('autocomplete', 'on');
      mc._scrollWrapper.addEventListener('scroll', function () {
        //fix scroll sticking issue
        if (this.scrollTop > 0) {
          this.scrollTop = 0;
        }
      });
      mc._btnClear.addEventListener('click', function () {
        console.clear();
      });

      //make console resizable
      _makeResizable(mc._handle, mc._element);
    }

    function _init() {
      //build console
      _constructConsole();

      console.warn('[mobileConsole] now taking over browser console. Line-numbers will now be misreported in regular console.');

      //replace console
      for (let method in console) {
        mc._methods.push(method); //store available methods for this device (future use)
        if (console.hasOwnProperty(method)) {
          window.originalConsole[method] = console[method];
          console[method] = function () {
            if (arguments[0] == null) { arguments[0] = 'null'; }
            _preLogger.call(mc, method, arguments);
            window.originalConsole[method].apply(console, arguments);
          }
        }
      }

      //Bind to window.onerror
      window.onerror = function () {
        _preLogger.call(mc, 'error', arguments[0], [{
          fileName: arguments[1],
          lineNumber: arguments[2],
          details: arguments[4].stack.replace('\n', '<br\>')
        }]);
        return false;
      };

      //listen for user input
      mc._inputForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        //write input command to console
        let icon = _create('span', 'mc-icon');
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' + mc._icos.chevron + '</svg>';
        let row = _create('span', 'mc-row'),
          msg = _create('span', 'mc-message');
        msg.innerHTML = mc._inputUser.value;
        row.appendChild(icon);
        row.appendChild(msg);
        mc._scroller.appendChild(row);

        //execute the input
        try {
          console.log.call(window, _saferEval(mc._inputUser.value));
        } catch (e) {
          console.error(e.message);
        } finally {
          mc._inputUser.value = '';
          mc._scrollWrapper.scrollTop = 0;
        }
      });

      if (!mc._element.isConnected) {
        setTimeout(_attachConsole.bind(mc), 10);
      }

      console.info('[mobileConsole] v2 - build ' + mc._build + ' ready.');

    }

    _init();

  }(window.console || console, window.StackTrace));
});
