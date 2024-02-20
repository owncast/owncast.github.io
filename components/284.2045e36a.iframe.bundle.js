"use strict";(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[284],{"./node_modules/antd/es/form/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>es_form});var context=__webpack_require__("./node_modules/antd/es/form/context.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),toConsumableArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),es=__webpack_require__("./node_modules/rc-motion/es/index.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),config_provider_context=__webpack_require__("./node_modules/antd/es/config-provider/context.js"),motion=__webpack_require__("./node_modules/antd/es/_util/motion.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");function useDebounce(value){var _React$useState=react.useState(value),_React$useState2=(0,slicedToArray.A)(_React$useState,2),cacheValue=_React$useState2[0],setCacheValue=_React$useState2[1];return react.useEffect((function(){var timeout=setTimeout((function(){setCacheValue(value)}),value.length?0:10);return function(){clearTimeout(timeout)}}),[value]),cacheValue}var EMPTY_LIST=[];function toErrorEntity(error,errorStatus,prefix){var index=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return{key:"string"==typeof error?error:"".concat(prefix,"-").concat(index),error,errorStatus}}function ErrorList(_ref){var help=_ref.help,helpStatus=_ref.helpStatus,_ref$errors=_ref.errors,errors=void 0===_ref$errors?EMPTY_LIST:_ref$errors,_ref$warnings=_ref.warnings,warnings=void 0===_ref$warnings?EMPTY_LIST:_ref$warnings,rootClassName=_ref.className,fieldId=_ref.fieldId,onVisibleChanged=_ref.onVisibleChanged,prefixCls=react.useContext(context.hb).prefixCls,getPrefixCls=react.useContext(config_provider_context.QO).getPrefixCls,baseClassName="".concat(prefixCls,"-item-explain"),rootPrefixCls=getPrefixCls(),debounceErrors=useDebounce(errors),debounceWarnings=useDebounce(warnings),fullKeyList=react.useMemo((function(){return null!=help?[toErrorEntity(help,helpStatus,"help")]:[].concat((0,toConsumableArray.A)(debounceErrors.map((function(error,index){return toErrorEntity(error,"error","error",index)}))),(0,toConsumableArray.A)(debounceWarnings.map((function(warning,index){return toErrorEntity(warning,"warning","warning",index)}))))}),[help,helpStatus,debounceErrors,debounceWarnings]),helpProps={};return fieldId&&(helpProps.id="".concat(fieldId,"_help")),react.createElement(es.Ay,{motionDeadline:motion.Ay.motionDeadline,motionName:"".concat(rootPrefixCls,"-show-help"),visible:!!fullKeyList.length,onVisibleChanged},(function(holderProps){var holderClassName=holderProps.className,holderStyle=holderProps.style;return react.createElement("div",(0,esm_extends.A)({},helpProps,{className:classnames_default()(baseClassName,holderClassName,rootClassName),style:holderStyle,role:"alert"}),react.createElement(es.aF,(0,esm_extends.A)({keys:fullKeyList},motion.Ay,{motionName:"".concat(rootPrefixCls,"-show-help-item"),component:!1}),(function(itemProps){var key=itemProps.key,error=itemProps.error,errorStatus=itemProps.errorStatus,itemClassName=itemProps.className,itemStyle=itemProps.style;return react.createElement("div",{key,className:classnames_default()(itemClassName,(0,defineProperty.A)({},"".concat(baseClassName,"-").concat(errorStatus),errorStatus)),style:itemStyle},error)})))}))}var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js"),rc_field_form_es=__webpack_require__("./node_modules/rc-field-form/es/index.js"),DisabledContext=__webpack_require__("./node_modules/antd/es/config-provider/DisabledContext.js"),SizeContext=__webpack_require__("./node_modules/antd/es/config-provider/SizeContext.js"),validateMessagesContext=__webpack_require__("./node_modules/antd/es/form/validateMessagesContext.js");function t(t){return"object"==typeof t&&null!=t&&1===t.nodeType}function e(t,e){return(!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function n(t,n){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var r=getComputedStyle(t,null);return e(r.overflowY,n)||e(r.overflowX,n)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return!!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return!1}function r(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}var i=function(e,i){var o=window,l=i.scrollMode,d=i.block,f=i.inline,h=i.boundary,u=i.skipOverflowHiddenElements,s="function"==typeof h?h:function(t){return t!==h};if(!t(e))throw new TypeError("Invalid target");for(var a,c,g=document.scrollingElement||document.documentElement,p=[],m=e;t(m)&&s(m);){if((m=null==(c=(a=m).parentElement)?a.getRootNode().host||null:c)===g){p.push(m);break}null!=m&&m===document.body&&n(m)&&!n(document.documentElement)||null!=m&&n(m,u)&&p.push(m)}for(var w=o.visualViewport?o.visualViewport.width:innerWidth,v=o.visualViewport?o.visualViewport.height:innerHeight,W=window.scrollX||pageXOffset,H=window.scrollY||pageYOffset,b=e.getBoundingClientRect(),y=b.height,E=b.width,M=b.top,V=b.right,x=b.bottom,I=b.left,C="start"===d||"nearest"===d?M:"end"===d?x:M+y/2,R="center"===f?I+E/2:"end"===f?V:I,T=[],k=0;k<p.length;k++){var B=p[k],D=B.getBoundingClientRect(),O=D.height,X=D.width,Y=D.top,L=D.right,S=D.bottom,j=D.left;if("if-needed"===l&&M>=0&&I>=0&&x<=v&&V<=w&&M>=Y&&x<=S&&I>=j&&V<=L)return T;var N=getComputedStyle(B),q=parseInt(N.borderLeftWidth,10),z=parseInt(N.borderTopWidth,10),A=parseInt(N.borderRightWidth,10),F=parseInt(N.borderBottomWidth,10),G=0,J=0,K="offsetWidth"in B?B.offsetWidth-B.clientWidth-q-A:0,P="offsetHeight"in B?B.offsetHeight-B.clientHeight-z-F:0,Q="offsetWidth"in B?0===B.offsetWidth?0:X/B.offsetWidth:0,U="offsetHeight"in B?0===B.offsetHeight?0:O/B.offsetHeight:0;if(g===B)G="start"===d?C:"end"===d?C-v:"nearest"===d?r(H,H+v,v,z,F,H+C,H+C+y,y):C-v/2,J="start"===f?R:"center"===f?R-w/2:"end"===f?R-w:r(W,W+w,w,q,A,W+R,W+R+E,E),G=Math.max(0,G+H),J=Math.max(0,J+W);else{G="start"===d?C-Y-z:"end"===d?C-S+F+P:"nearest"===d?r(Y,S,O,z,F+P,C,C+y,y):C-(Y+O/2)+P/2,J="start"===f?R-j-q:"center"===f?R-(j+X/2)+K/2:"end"===f?R-L+A+K:r(j,L,X,q,A+K,R,R+E,E);var Z=B.scrollLeft,$=B.scrollTop;C+=$-(G=Math.max(0,Math.min($+G/U,B.scrollHeight-O/U+P))),R+=Z-(J=Math.max(0,Math.min(Z+J/Q,B.scrollWidth-X/Q+K)))}T.push({el:B,top:G,left:J})}return T};function isOptionsObject(options){return options===Object(options)&&0!==Object.keys(options).length}const scroll_into_view_if_needed_es=function scrollIntoView(target,options){var isTargetAttached=target.isConnected||target.ownerDocument.documentElement.contains(target);if(isOptionsObject(options)&&"function"==typeof options.behavior)return options.behavior(isTargetAttached?i(target,options):[]);if(isTargetAttached){var computeOptions=function getOptions(options){return!1===options?{block:"end",inline:"nearest"}:isOptionsObject(options)?options:{block:"start",inline:"nearest"}}(options);return function defaultBehavior(actions,behavior){void 0===behavior&&(behavior="auto");var canSmoothScroll="scrollBehavior"in document.body.style;actions.forEach((function(_ref){var el=_ref.el,top=_ref.top,left=_ref.left;el.scroll&&canSmoothScroll?el.scroll({top,left,behavior}):(el.scrollTop=top,el.scrollLeft=left)}))}(i(target,computeOptions),computeOptions.behavior)}};var formItemNameBlackList=["parentNode"],defaultItemNamePrefixCls="form_item";function toArray(candidate){return void 0===candidate||!1===candidate?[]:Array.isArray(candidate)?candidate:[candidate]}function getFieldId(namePath,formName){if(namePath.length){var mergedId=namePath.join("_");return formName?"".concat(formName,"_").concat(mergedId):formItemNameBlackList.includes(mergedId)?"".concat(defaultItemNamePrefixCls,"_").concat(mergedId):mergedId}}function toNamePathStr(name){return toArray(name).join("_")}function useForm(form){var _useRcForm=(0,rc_field_form_es.mN)(),rcForm=(0,slicedToArray.A)(_useRcForm,1)[0],itemsRef=react.useRef({}),wrapForm=react.useMemo((function(){return null!=form?form:(0,esm_extends.A)((0,esm_extends.A)({},rcForm),{__INTERNAL__:{itemRef:function itemRef(name){return function(node){var namePathStr=toNamePathStr(name);node?itemsRef.current[namePathStr]=node:delete itemsRef.current[namePathStr]}}},scrollToField:function scrollToField(name){var options=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},fieldId=getFieldId(toArray(name),wrapForm.__INTERNAL__.name),node=fieldId?document.getElementById(fieldId):null;node&&scroll_into_view_if_needed_es(node,(0,esm_extends.A)({scrollMode:"if-needed",block:"nearest"},options))},getFieldInstance:function getFieldInstance(name){var namePathStr=toNamePathStr(name);return itemsRef.current[namePathStr]}})}),[form,rcForm]);return[wrapForm]}var __rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},InternalForm=function InternalForm(props,ref){var contextSize=react.useContext(SizeContext.A),contextDisabled=react.useContext(DisabledContext.A),_React$useContext=react.useContext(config_provider_context.QO),getPrefixCls=_React$useContext.getPrefixCls,direction=_React$useContext.direction,contextForm=_React$useContext.form,customizePrefixCls=props.prefixCls,_props$className=props.className,className=void 0===_props$className?"":_props$className,_props$size=props.size,size=void 0===_props$size?contextSize:_props$size,_props$disabled=props.disabled,disabled=void 0===_props$disabled?contextDisabled:_props$disabled,form=props.form,colon=props.colon,labelAlign=props.labelAlign,labelWrap=props.labelWrap,labelCol=props.labelCol,wrapperCol=props.wrapperCol,hideRequiredMark=props.hideRequiredMark,_props$layout=props.layout,layout=void 0===_props$layout?"horizontal":_props$layout,scrollToFirstError=props.scrollToFirstError,requiredMark=props.requiredMark,onFinishFailed=props.onFinishFailed,name=props.name,restFormProps=__rest(props,["prefixCls","className","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name"]),contextValidateMessages=react.useContext(validateMessagesContext.A),mergedRequiredMark=(0,react.useMemo)((function(){return void 0!==requiredMark?requiredMark:contextForm&&void 0!==contextForm.requiredMark?contextForm.requiredMark:!hideRequiredMark}),[hideRequiredMark,requiredMark,contextForm]),mergedColon=null!=colon?colon:null==contextForm?void 0:contextForm.colon,prefixCls=getPrefixCls("form",customizePrefixCls),formClassName=classnames_default()(prefixCls,(0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)({},"".concat(prefixCls,"-").concat(layout),!0),"".concat(prefixCls,"-hide-required-mark"),!1===mergedRequiredMark),"".concat(prefixCls,"-rtl"),"rtl"===direction),"".concat(prefixCls,"-").concat(size),size),className),_useForm=useForm(form),wrapForm=(0,slicedToArray.A)(_useForm,1)[0],__INTERNAL__=wrapForm.__INTERNAL__;__INTERNAL__.name=name;var formContextValue=(0,react.useMemo)((function(){return{name,labelAlign,labelCol,labelWrap,wrapperCol,vertical:"vertical"===layout,colon:mergedColon,requiredMark:mergedRequiredMark,itemRef:__INTERNAL__.itemRef,form:wrapForm}}),[name,labelAlign,labelCol,wrapperCol,layout,mergedColon,mergedRequiredMark,wrapForm]);react.useImperativeHandle(ref,(function(){return wrapForm}));return react.createElement(DisabledContext.X,{disabled},react.createElement(SizeContext.c,{size},react.createElement(context.Op,(0,esm_extends.A)({},{validateMessages:contextValidateMessages}),react.createElement(context.cK.Provider,{value:formContextValue},react.createElement(rc_field_form_es.Ay,(0,esm_extends.A)({id:name},restFormProps,{name,onFinishFailed:function onInternalFinishFailed(errorInfo){null==onFinishFailed||onFinishFailed(errorInfo);var defaultScrollToFirstError={block:"nearest"};scrollToFirstError&&errorInfo.errorFields.length&&("object"===(0,esm_typeof.A)(scrollToFirstError)&&(defaultScrollToFirstError=scrollToFirstError),wrapForm.scrollToField(errorInfo.errorFields[0].name,defaultScrollToFirstError))},form:wrapForm,className:formClassName}))))))};const form_Form=react.forwardRef(InternalForm);var useState=__webpack_require__("./node_modules/rc-util/es/hooks/useState.js"),ref=__webpack_require__("./node_modules/rc-util/es/ref.js");const hooks_useFormItemStatus=function useFormItemStatus(){return{status:(0,react.useContext)(context.$W).status}};var reactNode=__webpack_require__("./node_modules/antd/es/_util/reactNode.js"),type=__webpack_require__("./node_modules/antd/es/_util/type.js"),raf=__webpack_require__("./node_modules/rc-util/es/raf.js");var CheckCircleFilled=__webpack_require__("./node_modules/@ant-design/icons/es/icons/CheckCircleFilled.js"),CloseCircleFilled=__webpack_require__("./node_modules/@ant-design/icons/es/icons/CloseCircleFilled.js"),ExclamationCircleFilled=__webpack_require__("./node_modules/@ant-design/icons/es/icons/ExclamationCircleFilled.js"),LoadingOutlined=__webpack_require__("./node_modules/@ant-design/icons/es/icons/LoadingOutlined.js"),useLayoutEffect=__webpack_require__("./node_modules/rc-util/es/hooks/useLayoutEffect.js"),omit=__webpack_require__("./node_modules/rc-util/es/omit.js"),row=__webpack_require__("./node_modules/antd/es/grid/row.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");const asn_QuestionCircleOutlined={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"};var AntdIcon=__webpack_require__("./node_modules/@ant-design/icons/es/components/AntdIcon.js"),QuestionCircleOutlined_QuestionCircleOutlined=function QuestionCircleOutlined(props,ref){return react.createElement(AntdIcon.A,(0,objectSpread2.A)((0,objectSpread2.A)({},props),{},{ref,icon:asn_QuestionCircleOutlined}))};QuestionCircleOutlined_QuestionCircleOutlined.displayName="QuestionCircleOutlined";const icons_QuestionCircleOutlined=react.forwardRef(QuestionCircleOutlined_QuestionCircleOutlined);var col=__webpack_require__("./node_modules/antd/es/grid/col.js"),LocaleReceiver=__webpack_require__("./node_modules/antd/es/locale-provider/LocaleReceiver.js"),locale_default=__webpack_require__("./node_modules/antd/es/locale/default.js"),es_tooltip=__webpack_require__("./node_modules/antd/es/tooltip/index.js"),FormItemLabel_rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};const form_FormItemLabel=function FormItemLabel(_ref){var prefixCls=_ref.prefixCls,label=_ref.label,htmlFor=_ref.htmlFor,labelCol=_ref.labelCol,labelAlign=_ref.labelAlign,colon=_ref.colon,required=_ref.required,requiredMark=_ref.requiredMark,tooltip=_ref.tooltip,_useLocaleReceiver=(0,LocaleReceiver.n)("Form"),formLocale=(0,slicedToArray.A)(_useLocaleReceiver,1)[0];return label?react.createElement(context.cK.Consumer,{key:"label"},(function(_ref2){var _a,vertical=_ref2.vertical,contextLabelAlign=_ref2.labelAlign,contextLabelCol=_ref2.labelCol,labelWrap=_ref2.labelWrap,contextColon=_ref2.colon,mergedLabelCol=labelCol||contextLabelCol||{},mergedLabelAlign=labelAlign||contextLabelAlign,labelClsBasic="".concat(prefixCls,"-item-label"),labelColClassName=classnames_default()(labelClsBasic,"left"===mergedLabelAlign&&"".concat(labelClsBasic,"-left"),mergedLabelCol.className,(0,defineProperty.A)({},"".concat(labelClsBasic,"-wrap"),!!labelWrap)),labelChildren=label,computedColon=!0===colon||!1!==contextColon&&!1!==colon;computedColon&&!vertical&&"string"==typeof label&&""!==label.trim()&&(labelChildren=label.replace(/[:|：]\s*$/,""));var tooltipProps=function toTooltipProps(tooltip){return tooltip?"object"!==(0,esm_typeof.A)(tooltip)||react.isValidElement(tooltip)?{title:tooltip}:tooltip:null}(tooltip);if(tooltipProps){var _tooltipProps$icon=tooltipProps.icon,icon=void 0===_tooltipProps$icon?react.createElement(icons_QuestionCircleOutlined,null):_tooltipProps$icon,restTooltipProps=FormItemLabel_rest(tooltipProps,["icon"]),tooltipNode=react.createElement(es_tooltip.A,(0,esm_extends.A)({},restTooltipProps),react.cloneElement(icon,{className:"".concat(prefixCls,"-item-tooltip"),title:""}));labelChildren=react.createElement(react.Fragment,null,labelChildren,tooltipNode)}"optional"!==requiredMark||required||(labelChildren=react.createElement(react.Fragment,null,labelChildren,react.createElement("span",{className:"".concat(prefixCls,"-item-optional"),title:""},(null==formLocale?void 0:formLocale.optional)||(null===(_a=locale_default.A.Form)||void 0===_a?void 0:_a.optional))));var labelClassName=classnames_default()((0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)({},"".concat(prefixCls,"-item-required"),required),"".concat(prefixCls,"-item-required-mark-optional"),"optional"===requiredMark),"".concat(prefixCls,"-item-no-colon"),!computedColon));return react.createElement(col.A,(0,esm_extends.A)({},mergedLabelCol,{className:labelColClassName}),react.createElement("label",{htmlFor,className:labelClassName,title:"string"==typeof label?label:""},labelChildren))})):null};const form_FormItemInput=function FormItemInput(props){var prefixCls=props.prefixCls,status=props.status,wrapperCol=props.wrapperCol,children=props.children,errors=props.errors,warnings=props.warnings,formItemRender=props._internalItemRender,extra=props.extra,help=props.help,fieldId=props.fieldId,marginBottom=props.marginBottom,onErrorVisibleChanged=props.onErrorVisibleChanged,baseClassName="".concat(prefixCls,"-item"),formContext=react.useContext(context.cK),mergedWrapperCol=wrapperCol||formContext.wrapperCol||{},className=classnames_default()("".concat(baseClassName,"-control"),mergedWrapperCol.className),subFormContext=react.useMemo((function(){return(0,esm_extends.A)({},formContext)}),[formContext]);delete subFormContext.labelCol,delete subFormContext.wrapperCol;var inputDom=react.createElement("div",{className:"".concat(baseClassName,"-control-input")},react.createElement("div",{className:"".concat(baseClassName,"-control-input-content")},children)),formItemContext=react.useMemo((function(){return{prefixCls,status}}),[prefixCls,status]),errorListDom=null!==marginBottom||errors.length||warnings.length?react.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},react.createElement(context.hb.Provider,{value:formItemContext},react.createElement(ErrorList,{fieldId,errors,warnings,help,helpStatus:status,className:"".concat(baseClassName,"-explain-connected"),onVisibleChanged:onErrorVisibleChanged})),!!marginBottom&&react.createElement("div",{style:{width:0,height:marginBottom}})):null,extraProps={};fieldId&&(extraProps.id="".concat(fieldId,"_extra"));var extraDom=extra?react.createElement("div",(0,esm_extends.A)({},extraProps,{className:"".concat(baseClassName,"-extra")}),extra):null,dom=formItemRender&&"pro_table_render"===formItemRender.mark&&formItemRender.render?formItemRender.render(props,{input:inputDom,errorList:errorListDom,extra:extraDom}):react.createElement(react.Fragment,null,inputDom,errorListDom,extraDom);return react.createElement(context.cK.Provider,{value:subFormContext},react.createElement(col.A,(0,esm_extends.A)({},mergedWrapperCol,{className}),dom))};var ItemHolder_rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},iconMap={success:CheckCircleFilled.A,warning:ExclamationCircleFilled.A,error:CloseCircleFilled.A,validating:LoadingOutlined.A};function ItemHolder(props){var prefixCls=props.prefixCls,className=props.className,style=props.style,help=props.help,errors=props.errors,warnings=props.warnings,validateStatus=props.validateStatus,meta=props.meta,hasFeedback=props.hasFeedback,hidden=props.hidden,children=props.children,fieldId=props.fieldId,isRequired=props.isRequired,onSubItemMetaChange=props.onSubItemMetaChange,restProps=ItemHolder_rest(props,["prefixCls","className","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","isRequired","onSubItemMetaChange"]),itemPrefixCls="".concat(prefixCls,"-item"),requiredMark=react.useContext(context.cK).requiredMark,itemRef=react.useRef(null),debounceErrors=useDebounce(errors),debounceWarnings=useDebounce(warnings),hasHelp=null!=help,hasError=!!(hasHelp||errors.length||warnings.length),_React$useState=react.useState(null),_React$useState2=(0,slicedToArray.A)(_React$useState,2),marginBottom=_React$useState2[0],setMarginBottom=_React$useState2[1];(0,useLayoutEffect.A)((function(){if(hasError&&itemRef.current){var itemStyle=getComputedStyle(itemRef.current);setMarginBottom(parseInt(itemStyle.marginBottom,10))}}),[hasError]);var mergedValidateStatus="";void 0!==validateStatus?mergedValidateStatus=validateStatus:meta.validating?mergedValidateStatus="validating":debounceErrors.length?mergedValidateStatus="error":debounceWarnings.length?mergedValidateStatus="warning":meta.touched&&(mergedValidateStatus="success");var formItemStatusContext=react.useMemo((function(){var feedbackIcon;if(hasFeedback){var IconNode=mergedValidateStatus&&iconMap[mergedValidateStatus];feedbackIcon=IconNode?react.createElement("span",{className:classnames_default()("".concat(itemPrefixCls,"-feedback-icon"),"".concat(itemPrefixCls,"-feedback-icon-").concat(mergedValidateStatus))},react.createElement(IconNode,null)):null}return{status:mergedValidateStatus,hasFeedback,feedbackIcon,isFormItemInput:!0}}),[mergedValidateStatus,hasFeedback]),itemClassName=(0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)((0,defineProperty.A)({},itemPrefixCls,!0),"".concat(itemPrefixCls,"-with-help"),hasHelp||debounceErrors.length||debounceWarnings.length),"".concat(className),!!className),"".concat(itemPrefixCls,"-has-feedback"),mergedValidateStatus&&hasFeedback),"".concat(itemPrefixCls,"-has-success"),"success"===mergedValidateStatus),"".concat(itemPrefixCls,"-has-warning"),"warning"===mergedValidateStatus),"".concat(itemPrefixCls,"-has-error"),"error"===mergedValidateStatus),"".concat(itemPrefixCls,"-is-validating"),"validating"===mergedValidateStatus),"".concat(itemPrefixCls,"-hidden"),hidden);return react.createElement("div",{className:classnames_default()(itemClassName),style,ref:itemRef},react.createElement(row.A,(0,esm_extends.A)({className:"".concat(itemPrefixCls,"-row")},(0,omit.A)(restProps,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","required","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol"])),react.createElement(form_FormItemLabel,(0,esm_extends.A)({htmlFor:fieldId,required:isRequired,requiredMark},props,{prefixCls})),react.createElement(form_FormItemInput,(0,esm_extends.A)({},props,meta,{errors:debounceErrors,warnings:debounceWarnings,prefixCls,status:mergedValidateStatus,help,marginBottom,onErrorVisibleChanged:function onErrorVisibleChanged(nextVisible){nextVisible||setMarginBottom(null)}}),react.createElement(context.jC.Provider,{value:onSubItemMetaChange},react.createElement(context.$W.Provider,{value:formItemStatusContext},children)))),!!marginBottom&&react.createElement("div",{className:"".concat(itemPrefixCls,"-margin-offset"),style:{marginBottom:-marginBottom}}))}(0,type.P)("success","warning","error","validating","");var MemoInput=react.memo((function(_ref){return _ref.children}),(function(prev,next){return prev.value===next.value&&prev.update===next.update&&prev.childProps.length===next.childProps.length&&prev.childProps.every((function(value,index){return value===next.childProps[index]}))}));var FormItem=function InternalFormItem(props){var name=props.name,noStyle=props.noStyle,dependencies=props.dependencies,customizePrefixCls=props.prefixCls,shouldUpdate=props.shouldUpdate,rules=props.rules,children=props.children,required=props.required,label=props.label,messageVariables=props.messageVariables,_props$trigger=props.trigger,trigger=void 0===_props$trigger?"onChange":_props$trigger,validateTrigger=props.validateTrigger,hidden=props.hidden,getPrefixCls=(0,react.useContext)(config_provider_context.QO).getPrefixCls,formName=(0,react.useContext)(context.cK).name,isRenderProps="function"==typeof children,notifyParentMetaChange=(0,react.useContext)(context.jC),contextValidateTrigger=(0,react.useContext)(rc_field_form_es._z).validateTrigger,mergedValidateTrigger=void 0!==validateTrigger?validateTrigger:contextValidateTrigger,hasName=function hasValidName(name){return!(null==name)}(name),prefixCls=getPrefixCls("form",customizePrefixCls),listContext=react.useContext(rc_field_form_es.EF),fieldKeyPathRef=react.useRef(),_useFrameState=function useFrameState(defaultValue){var _React$useState=react.useState(defaultValue),_React$useState2=(0,slicedToArray.A)(_React$useState,2),value=_React$useState2[0],setValue=_React$useState2[1],frameRef=(0,react.useRef)(null),batchRef=(0,react.useRef)([]),destroyRef=(0,react.useRef)(!1);return react.useEffect((function(){return destroyRef.current=!1,function(){destroyRef.current=!0,raf.A.cancel(frameRef.current),frameRef.current=null}}),[]),[value,function setFrameValue(updater){destroyRef.current||(null===frameRef.current&&(batchRef.current=[],frameRef.current=(0,raf.A)((function(){frameRef.current=null,setValue((function(prevValue){var current=prevValue;return batchRef.current.forEach((function(func){current=func(current)})),current}))}))),batchRef.current.push(updater))}]}({}),_useFrameState2=(0,slicedToArray.A)(_useFrameState,2),subFieldErrors=_useFrameState2[0],setSubFieldErrors=_useFrameState2[1],_useState=(0,useState.A)((function(){return{errors:[],warnings:[],touched:!1,validating:!1,validated:!1,name:[]}})),_useState2=(0,slicedToArray.A)(_useState,2),meta=_useState2[0],setMeta=_useState2[1],onSubItemMetaChange=function onSubItemMetaChange(subMeta,uniqueKeys){setSubFieldErrors((function(prevSubFieldErrors){var clone=(0,esm_extends.A)({},prevSubFieldErrors),mergedNameKey=[].concat((0,toConsumableArray.A)(subMeta.name.slice(0,-1)),(0,toConsumableArray.A)(uniqueKeys)).join("__SPLIT__");return subMeta.destroy?delete clone[mergedNameKey]:clone[mergedNameKey]=subMeta,clone}))},_React$useMemo=react.useMemo((function(){var errorList=(0,toConsumableArray.A)(meta.errors),warningList=(0,toConsumableArray.A)(meta.warnings);return Object.values(subFieldErrors).forEach((function(subFieldError){errorList.push.apply(errorList,(0,toConsumableArray.A)(subFieldError.errors||[])),warningList.push.apply(warningList,(0,toConsumableArray.A)(subFieldError.warnings||[]))})),[errorList,warningList]}),[subFieldErrors,meta.errors,meta.warnings]),_React$useMemo2=(0,slicedToArray.A)(_React$useMemo,2),mergedErrors=_React$useMemo2[0],mergedWarnings=_React$useMemo2[1],getItemRef=function useItemRef(){var itemRef=react.useContext(context.cK).itemRef,cacheRef=react.useRef({});return function getRef(name,children){var childrenRef=children&&"object"===(0,esm_typeof.A)(children)&&children.ref,nameStr=name.join("_");return cacheRef.current.name===nameStr&&cacheRef.current.originRef===childrenRef||(cacheRef.current.name=nameStr,cacheRef.current.originRef=childrenRef,cacheRef.current.ref=(0,ref.K4)(itemRef(name),childrenRef)),cacheRef.current.ref}}();function renderLayout(baseChildren,fieldId,isRequired){return noStyle&&!hidden?baseChildren:react.createElement(ItemHolder,(0,esm_extends.A)({key:"row"},props,{prefixCls,fieldId,isRequired,errors:mergedErrors,warnings:mergedWarnings,meta,onSubItemMetaChange}),baseChildren)}if(!hasName&&!isRenderProps&&!dependencies)return renderLayout(children);var variables={};return"string"==typeof label?variables.label=label:name&&(variables.label=String(name)),messageVariables&&(variables=(0,esm_extends.A)((0,esm_extends.A)({},variables),messageVariables)),react.createElement(rc_field_form_es.D0,(0,esm_extends.A)({},props,{messageVariables:variables,trigger,validateTrigger:mergedValidateTrigger,onMetaChange:function onMetaChange(nextMeta){var keyInfo=null==listContext?void 0:listContext.getKey(nextMeta.name);if(setMeta(nextMeta.destroy?{errors:[],warnings:[],touched:!1,validating:!1,validated:!1,name:[]}:nextMeta,!0),noStyle&&notifyParentMetaChange){var namePath=nextMeta.name;if(nextMeta.destroy)namePath=fieldKeyPathRef.current||namePath;else if(void 0!==keyInfo){var _keyInfo=(0,slicedToArray.A)(keyInfo,2),fieldKey=_keyInfo[0],restPath=_keyInfo[1];namePath=[fieldKey].concat((0,toConsumableArray.A)(restPath)),fieldKeyPathRef.current=namePath}notifyParentMetaChange(nextMeta,namePath)}}}),(function(control,renderMeta,context){var mergedName=toArray(name).length&&renderMeta?renderMeta.name:[],fieldId=getFieldId(mergedName,formName),isRequired=void 0!==required?required:!(!rules||!rules.some((function(rule){if(rule&&"object"===(0,esm_typeof.A)(rule)&&rule.required&&!rule.warningOnly)return!0;if("function"==typeof rule){var ruleEntity=rule(context);return ruleEntity&&ruleEntity.required&&!ruleEntity.warningOnly}return!1}))),mergedControl=(0,esm_extends.A)({},control),childNode=null;if(Array.isArray(children)&&hasName)childNode=children;else if(isRenderProps&&(!shouldUpdate&&!dependencies||hasName));else if(!dependencies||isRenderProps||hasName)if((0,reactNode.zO)(children)){var childProps=(0,esm_extends.A)((0,esm_extends.A)({},children.props),mergedControl);if(childProps.id||(childProps.id=fieldId),props.help||mergedErrors.length>0||mergedWarnings.length>0||props.extra){var describedbyArr=[];(props.help||mergedErrors.length>0)&&describedbyArr.push("".concat(fieldId,"_help")),props.extra&&describedbyArr.push("".concat(fieldId,"_extra")),childProps["aria-describedby"]=describedbyArr.join(" ")}mergedErrors.length>0&&(childProps["aria-invalid"]="true"),isRequired&&(childProps["aria-required"]="true"),(0,ref.f3)(children)&&(childProps.ref=getItemRef(mergedName,children)),new Set([].concat((0,toConsumableArray.A)(toArray(trigger)),(0,toConsumableArray.A)(toArray(mergedValidateTrigger)))).forEach((function(eventName){childProps[eventName]=function(){for(var _a2,_c2,_a,_b,_c,_len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];null===(_a=mergedControl[eventName])||void 0===_a||(_a2=_a).call.apply(_a2,[mergedControl].concat(args)),null===(_c=(_b=children.props)[eventName])||void 0===_c||(_c2=_c).call.apply(_c2,[_b].concat(args))}}));var watchingChildProps=[childProps["aria-required"],childProps["aria-invalid"],childProps["aria-describedby"]];childNode=react.createElement(MemoInput,{value:mergedControl[props.valuePropName||"value"],update:children,childProps:watchingChildProps},(0,reactNode.Ob)(children,childProps))}else childNode=isRenderProps&&(shouldUpdate||dependencies)&&!hasName?children(context):children;else;return renderLayout(childNode,fieldId,isRequired)}))};FormItem.useStatus=hooks_useFormItemStatus;const form_FormItem=FormItem;var FormList_rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};const form_FormList=function FormList(_a){var customizePrefixCls=_a.prefixCls,children=_a.children,props=FormList_rest(_a,["prefixCls","children"]),prefixCls=(0,react.useContext(config_provider_context.QO).getPrefixCls)("form",customizePrefixCls),contextValue=react.useMemo((function(){return{prefixCls,status:"error"}}),[prefixCls]);return react.createElement(rc_field_form_es.B8,(0,esm_extends.A)({},props),(function(fields,operation,meta){return react.createElement(context.hb.Provider,{value:contextValue},children(fields.map((function(field){return(0,esm_extends.A)((0,esm_extends.A)({},field),{fieldKey:field.key})})),operation,{errors:meta.errors,warnings:meta.warnings}))}))};var es_form_Form=form_Form;es_form_Form.Item=form_FormItem,es_form_Form.List=form_FormList,es_form_Form.ErrorList=ErrorList,es_form_Form.useForm=useForm,es_form_Form.useFormInstance=function useFormInstance(){return(0,react.useContext)(context.cK).form},es_form_Form.useWatch=rc_field_form_es.FH,es_form_Form.Provider=context.Op,es_form_Form.create=function(){};const es_form=es_form_Form}}]);