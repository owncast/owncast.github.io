"use strict";(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[6763],{"./node_modules/date-fns/_lib/getRoundingMethod.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function getRoundingMethod(method){return number=>{const result=(method?Math[method]:Math.trunc)(number);return 0===result?0:result}}__webpack_require__.d(__webpack_exports__,{u:()=>getRoundingMethod})},"./node_modules/date-fns/compareAsc.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>compareAsc});var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/date-fns/toDate.mjs");function compareAsc(dateLeft,dateRight){const _dateLeft=(0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(dateLeft),_dateRight=(0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(dateRight),diff=_dateLeft.getTime()-_dateRight.getTime();return diff<0?-1:diff>0?1:diff}},"./node_modules/date-fns/differenceInMilliseconds.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>differenceInMilliseconds});var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/date-fns/toDate.mjs");function differenceInMilliseconds(dateLeft,dateRight){return+(0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(dateLeft)-+(0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(dateRight)}},"./node_modules/date-fns/differenceInMonths.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>differenceInMonths});var compareAsc=__webpack_require__("./node_modules/date-fns/compareAsc.mjs"),toDate=__webpack_require__("./node_modules/date-fns/toDate.mjs");function differenceInCalendarMonths(dateLeft,dateRight){const _dateLeft=(0,toDate.a)(dateLeft),_dateRight=(0,toDate.a)(dateRight);return 12*(_dateLeft.getFullYear()-_dateRight.getFullYear())+(_dateLeft.getMonth()-_dateRight.getMonth())}function endOfDay(date){const _date=(0,toDate.a)(date);return _date.setHours(23,59,59,999),_date}function endOfMonth(date){const _date=(0,toDate.a)(date),month=_date.getMonth();return _date.setFullYear(_date.getFullYear(),month+1,0),_date.setHours(23,59,59,999),_date}function isLastDayOfMonth(date){const _date=(0,toDate.a)(date);return+endOfDay(_date)==+endOfMonth(_date)}function differenceInMonths(dateLeft,dateRight){const _dateLeft=(0,toDate.a)(dateLeft),_dateRight=(0,toDate.a)(dateRight),sign=(0,compareAsc.z)(_dateLeft,_dateRight),difference=Math.abs(differenceInCalendarMonths(_dateLeft,_dateRight));let result;if(difference<1)result=0;else{1===_dateLeft.getMonth()&&_dateLeft.getDate()>27&&_dateLeft.setDate(30),_dateLeft.setMonth(_dateLeft.getMonth()-sign*difference);let isLastMonthNotFull=(0,compareAsc.z)(_dateLeft,_dateRight)===-sign;isLastDayOfMonth((0,toDate.a)(dateLeft))&&1===difference&&1===(0,compareAsc.z)(dateLeft,_dateRight)&&(isLastMonthNotFull=!1),result=sign*(difference-Number(isLastMonthNotFull))}return 0===result?0:result}},"./node_modules/date-fns/differenceInSeconds.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>differenceInSeconds});var _lib_getRoundingMethod_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/date-fns/_lib/getRoundingMethod.mjs"),_differenceInMilliseconds_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/date-fns/differenceInMilliseconds.mjs");function differenceInSeconds(dateLeft,dateRight,options){const diff=(0,_differenceInMilliseconds_mjs__WEBPACK_IMPORTED_MODULE_0__.b)(dateLeft,dateRight)/1e3;return(0,_lib_getRoundingMethod_mjs__WEBPACK_IMPORTED_MODULE_1__.u)(options?.roundingMethod)(diff)}},"./node_modules/date-fns/formatDistanceToNow.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>formatDistanceToNow});var constructFrom=__webpack_require__("./node_modules/date-fns/constructFrom.mjs");function constructNow(date){return(0,constructFrom.w)(date,Date.now())}var compareAsc=__webpack_require__("./node_modules/date-fns/compareAsc.mjs"),constants=__webpack_require__("./node_modules/date-fns/constants.mjs"),differenceInMonths=__webpack_require__("./node_modules/date-fns/differenceInMonths.mjs"),differenceInSeconds=__webpack_require__("./node_modules/date-fns/differenceInSeconds.mjs"),toDate=__webpack_require__("./node_modules/date-fns/toDate.mjs"),en_US=__webpack_require__("./node_modules/date-fns/locale/en-US.mjs"),_lib_defaultOptions=__webpack_require__("./node_modules/date-fns/_lib/defaultOptions.mjs"),getTimezoneOffsetInMilliseconds=__webpack_require__("./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs");function formatDistance(date,baseDate,options){const defaultOptions=(0,_lib_defaultOptions.q)(),locale=options?.locale??defaultOptions.locale??en_US.c,comparison=(0,compareAsc.z)(date,baseDate);if(isNaN(comparison))throw new RangeError("Invalid time value");const localizeOptions=Object.assign({},options,{addSuffix:options?.addSuffix,comparison});let dateLeft,dateRight;comparison>0?(dateLeft=(0,toDate.a)(baseDate),dateRight=(0,toDate.a)(date)):(dateLeft=(0,toDate.a)(date),dateRight=(0,toDate.a)(baseDate));const seconds=(0,differenceInSeconds.O)(dateRight,dateLeft),offsetInSeconds=((0,getTimezoneOffsetInMilliseconds.G)(dateRight)-(0,getTimezoneOffsetInMilliseconds.G)(dateLeft))/1e3,minutes=Math.round((seconds-offsetInSeconds)/60);let months;if(minutes<2)return options?.includeSeconds?seconds<5?locale.formatDistance("lessThanXSeconds",5,localizeOptions):seconds<10?locale.formatDistance("lessThanXSeconds",10,localizeOptions):seconds<20?locale.formatDistance("lessThanXSeconds",20,localizeOptions):seconds<40?locale.formatDistance("halfAMinute",0,localizeOptions):seconds<60?locale.formatDistance("lessThanXMinutes",1,localizeOptions):locale.formatDistance("xMinutes",1,localizeOptions):0===minutes?locale.formatDistance("lessThanXMinutes",1,localizeOptions):locale.formatDistance("xMinutes",minutes,localizeOptions);if(minutes<45)return locale.formatDistance("xMinutes",minutes,localizeOptions);if(minutes<90)return locale.formatDistance("aboutXHours",1,localizeOptions);if(minutes<constants.F6){const hours=Math.round(minutes/60);return locale.formatDistance("aboutXHours",hours,localizeOptions)}if(minutes<2520)return locale.formatDistance("xDays",1,localizeOptions);if(minutes<constants.Nw){const days=Math.round(minutes/constants.F6);return locale.formatDistance("xDays",days,localizeOptions)}if(minutes<2*constants.Nw)return months=Math.round(minutes/constants.Nw),locale.formatDistance("aboutXMonths",months,localizeOptions);if(months=(0,differenceInMonths.W)(dateRight,dateLeft),months<12){const nearestMonth=Math.round(minutes/constants.Nw);return locale.formatDistance("xMonths",nearestMonth,localizeOptions)}{const monthsSinceStartOfYear=months%12,years=Math.trunc(months/12);return monthsSinceStartOfYear<3?locale.formatDistance("aboutXYears",years,localizeOptions):monthsSinceStartOfYear<9?locale.formatDistance("overXYears",years,localizeOptions):locale.formatDistance("almostXYears",years+1,localizeOptions)}}function formatDistanceToNow(date,options){return formatDistance(date,constructNow(date),options)}}}]);