"use strict";(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[1721],{"./node_modules/antd/es/dropdown/dropdown.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>dropdown});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),RightOutlined=__webpack_require__("./node_modules/@ant-design/icons/es/icons/RightOutlined.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),es=__webpack_require__("./node_modules/rc-dropdown/es/index.js"),useEvent=__webpack_require__("./node_modules/rc-util/es/hooks/useEvent.js"),useMergedState=__webpack_require__("./node_modules/rc-util/es/hooks/useMergedState.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),es_menu=__webpack_require__("./node_modules/antd/es/menu/index.js"),context=__webpack_require__("./node_modules/antd/es/config-provider/context.js"),OverrideContext=__webpack_require__("./node_modules/antd/es/menu/OverrideContext.js"),placements=__webpack_require__("./node_modules/antd/es/_util/placements.js"),reactNode=__webpack_require__("./node_modules/antd/es/_util/reactNode.js"),type=__webpack_require__("./node_modules/antd/es/_util/type.js"),EllipsisOutlined=__webpack_require__("./node_modules/@ant-design/icons/es/icons/EllipsisOutlined.js"),es_button=__webpack_require__("./node_modules/antd/es/button/index.js"),Compact=__webpack_require__("./node_modules/antd/es/space/Compact.js"),space=__webpack_require__("./node_modules/antd/es/space/index.js"),__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},DropdownButton=function DropdownButton(props){var _React$useContext=react.useContext(context.QO),getContextPopupContainer=_React$useContext.getPopupContainer,getPrefixCls=_React$useContext.getPrefixCls,direction=_React$useContext.direction,customizePrefixCls=props.prefixCls,_props$type=props.type,type=void 0===_props$type?"default":_props$type,danger=props.danger,disabled=props.disabled,loading=props.loading,onClick=props.onClick,htmlType=props.htmlType,children=props.children,className=props.className,menu=props.menu,arrow=props.arrow,autoFocus=props.autoFocus,overlay=props.overlay,trigger=props.trigger,align=props.align,visible=props.visible,open=props.open,onVisibleChange=props.onVisibleChange,onOpenChange=props.onOpenChange,placement=props.placement,getPopupContainer=props.getPopupContainer,href=props.href,_props$icon=props.icon,icon=void 0===_props$icon?react.createElement(EllipsisOutlined.A,null):_props$icon,title=props.title,_props$buttonsRender=props.buttonsRender,buttonsRender=void 0===_props$buttonsRender?function(buttons){return buttons}:_props$buttonsRender,mouseEnterDelay=props.mouseEnterDelay,mouseLeaveDelay=props.mouseLeaveDelay,overlayClassName=props.overlayClassName,overlayStyle=props.overlayStyle,destroyPopupOnHide=props.destroyPopupOnHide,restProps=__rest(props,["prefixCls","type","danger","disabled","loading","onClick","htmlType","children","className","menu","arrow","autoFocus","overlay","trigger","align","visible","open","onVisibleChange","onOpenChange","placement","getPopupContainer","href","icon","title","buttonsRender","mouseEnterDelay","mouseLeaveDelay","overlayClassName","overlayStyle","destroyPopupOnHide"]),prefixCls=getPrefixCls("dropdown-button",customizePrefixCls),dropdownProps={menu,arrow,autoFocus,align,disabled,trigger:disabled?[]:trigger,onOpenChange:onOpenChange||onVisibleChange,getPopupContainer:getPopupContainer||getContextPopupContainer,mouseEnterDelay,mouseLeaveDelay,overlayClassName,overlayStyle,destroyPopupOnHide},_useCompactItemContex=(0,Compact.RQ)(prefixCls,direction),compactSize=_useCompactItemContex.compactSize,compactItemClassnames=_useCompactItemContex.compactItemClassnames,classes=classnames_default()(prefixCls,compactItemClassnames,className);"overlay"in props&&(dropdownProps.overlay=overlay),"open"in props?dropdownProps.open=open:"visible"in props&&(dropdownProps.open=visible),dropdownProps.placement="placement"in props?placement:"rtl"===direction?"bottomLeft":"bottomRight";var _buttonsRender=buttonsRender([react.createElement(es_button.A,{type,danger,disabled,loading,onClick,htmlType,href,title},children),react.createElement(es_button.A,{type,danger,icon})]),_buttonsRender2=(0,slicedToArray.A)(_buttonsRender,2),leftButtonToRender=_buttonsRender2[0],rightButtonToRender=_buttonsRender2[1];return react.createElement(space.A.Compact,(0,esm_extends.A)({className:classes,size:compactSize,block:!0},restProps),leftButtonToRender,react.createElement(dropdown,(0,esm_extends.A)({},dropdownProps),rightButtonToRender))};DropdownButton.__ANT_BUTTON=!0;const dropdown_button=DropdownButton;(0,type.P)("topLeft","topCenter","topRight","bottomLeft","bottomCenter","bottomRight","top","bottom");var Dropdown=function Dropdown(props){var _React$useContext=react.useContext(context.QO),getContextPopupContainer=_React$useContext.getPopupContainer,getPrefixCls=_React$useContext.getPrefixCls,direction=_React$useContext.direction;var alignPoint,menu=props.menu,arrow=props.arrow,customizePrefixCls=props.prefixCls,children=props.children,trigger=props.trigger,disabled=props.disabled,dropdownRender=props.dropdownRender,getPopupContainer=props.getPopupContainer,overlayClassName=props.overlayClassName,visible=props.visible,open=props.open,onVisibleChange=props.onVisibleChange,onOpenChange=props.onOpenChange,_props$mouseEnterDela=props.mouseEnterDelay,mouseEnterDelay=void 0===_props$mouseEnterDela?.15:_props$mouseEnterDela,_props$mouseLeaveDela=props.mouseLeaveDelay,mouseLeaveDelay=void 0===_props$mouseLeaveDela?.1:_props$mouseLeaveDela,_props$autoAdjustOver=props.autoAdjustOverflow,autoAdjustOverflow=void 0===_props$autoAdjustOver||_props$autoAdjustOver,prefixCls=getPrefixCls("dropdown",customizePrefixCls),child=react.Children.only(children),dropdownTrigger=(0,reactNode.Ob)(child,{className:classnames_default()("".concat(prefixCls,"-trigger"),(0,defineProperty.A)({},"".concat(prefixCls,"-rtl"),"rtl"===direction),child.props.className),disabled}),triggerActions=disabled?[]:trigger;triggerActions&&triggerActions.includes("contextMenu")&&(alignPoint=!0);var _useMergedState=(0,useMergedState.A)(!1,{value:void 0!==open?open:visible}),_useMergedState2=(0,slicedToArray.A)(_useMergedState,2),mergedOpen=_useMergedState2[0],setOpen=_useMergedState2[1],onInnerOpenChange=(0,useEvent.A)((function(nextOpen){null==onVisibleChange||onVisibleChange(nextOpen),null==onOpenChange||onOpenChange(nextOpen),setOpen(nextOpen)})),overlayClassNameCustomized=classnames_default()(overlayClassName,(0,defineProperty.A)({},"".concat(prefixCls,"-rtl"),"rtl"===direction)),builtinPlacements=(0,placements.A)({arrowPointAtCenter:"object"===(0,esm_typeof.A)(arrow)&&arrow.pointAtCenter,autoAdjustOverflow}),onMenuClick=react.useCallback((function(){setOpen(!1)}),[]);return react.createElement(es.A,(0,esm_extends.A)({alignPoint},props,{mouseEnterDelay,mouseLeaveDelay,visible:mergedOpen,builtinPlacements,arrow:!!arrow,overlayClassName:overlayClassNameCustomized,prefixCls,getPopupContainer:getPopupContainer||getContextPopupContainer,transitionName:function getTransitionName(){var rootPrefixCls=getPrefixCls(),_props$placement=props.placement,placement=void 0===_props$placement?"":_props$placement,transitionName=props.transitionName;return void 0!==transitionName?transitionName:placement.includes("top")?"".concat(rootPrefixCls,"-slide-down"):"".concat(rootPrefixCls,"-slide-up")}(),trigger:triggerActions,overlay:function renderOverlay(){var overlayNode,overlay=props.overlay;return overlayNode=(null==menu?void 0:menu.items)?react.createElement(es_menu.A,(0,esm_extends.A)({},menu)):"function"==typeof overlay?overlay():overlay,dropdownRender&&(overlayNode=dropdownRender(overlayNode)),overlayNode=react.Children.only("string"==typeof overlayNode?react.createElement("span",null,overlayNode):overlayNode),react.createElement(OverrideContext.A,{prefixCls:"".concat(prefixCls,"-menu"),expandIcon:react.createElement("span",{className:"".concat(prefixCls,"-menu-submenu-arrow")},react.createElement(RightOutlined.A,{className:"".concat(prefixCls,"-menu-submenu-arrow-icon")})),mode:"vertical",selectable:!1,onClick:onMenuClick,validator:function validator(_ref3){_ref3.mode}},react.createElement(Compact.K6,null,overlayNode))},placement:function getPlacement(){var placement=props.placement;return placement?placement.includes("Center")?placement.slice(0,placement.indexOf("Center")):placement:"rtl"===direction?"bottomRight":"bottomLeft"}(),onVisibleChange:onInnerOpenChange}),dropdownTrigger)};Dropdown.Button=dropdown_button;const dropdown=Dropdown},"./node_modules/antd/es/dropdown/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("./node_modules/antd/es/dropdown/dropdown.js").A},"./node_modules/rc-dropdown/es/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rc_dropdown_es});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),es=__webpack_require__("./node_modules/rc-trigger/es/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),autoAdjustOverflow={adjustX:1,adjustY:1},targetOffset=[0,0];const es_placements={topLeft:{points:["bl","tl"],overflow:autoAdjustOverflow,offset:[0,-4],targetOffset},topCenter:{points:["bc","tc"],overflow:autoAdjustOverflow,offset:[0,-4],targetOffset},topRight:{points:["br","tr"],overflow:autoAdjustOverflow,offset:[0,-4],targetOffset},bottomLeft:{points:["tl","bl"],overflow:autoAdjustOverflow,offset:[0,4],targetOffset},bottomCenter:{points:["tc","bc"],overflow:autoAdjustOverflow,offset:[0,4],targetOffset},bottomRight:{points:["tr","br"],overflow:autoAdjustOverflow,offset:[0,4],targetOffset}};var KeyCode=__webpack_require__("./node_modules/rc-util/es/KeyCode.js"),raf=__webpack_require__("./node_modules/rc-util/es/raf.js"),Dom_focus=__webpack_require__("./node_modules/rc-util/es/Dom/focus.js"),ESC=KeyCode.A.ESC,TAB=KeyCode.A.TAB;var _excluded=["arrow","prefixCls","transitionName","animation","align","placement","placements","getPopupContainer","showAction","hideAction","overlayClassName","overlayStyle","visible","trigger","autoFocus"];function Dropdown(props,ref){var _props$arrow=props.arrow,arrow=void 0!==_props$arrow&&_props$arrow,_props$prefixCls=props.prefixCls,prefixCls=void 0===_props$prefixCls?"rc-dropdown":_props$prefixCls,transitionName=props.transitionName,animation=props.animation,align=props.align,_props$placement=props.placement,placement=void 0===_props$placement?"bottomLeft":_props$placement,_props$placements=props.placements,placements=void 0===_props$placements?es_placements:_props$placements,getPopupContainer=props.getPopupContainer,showAction=props.showAction,hideAction=props.hideAction,overlayClassName=props.overlayClassName,overlayStyle=props.overlayStyle,visible=props.visible,_props$trigger=props.trigger,trigger=void 0===_props$trigger?["hover"]:_props$trigger,autoFocus=props.autoFocus,otherProps=(0,objectWithoutProperties.A)(props,_excluded),_React$useState=react.useState(),_React$useState2=(0,slicedToArray.A)(_React$useState,2),triggerVisible=_React$useState2[0],setTriggerVisible=_React$useState2[1],mergedVisible="visible"in props?visible:triggerVisible,triggerRef=react.useRef(null);react.useImperativeHandle(ref,(function(){return triggerRef.current})),function useAccessibility(_ref){var visible=_ref.visible,setTriggerVisible=_ref.setTriggerVisible,triggerRef=_ref.triggerRef,onVisibleChange=_ref.onVisibleChange,autoFocus=_ref.autoFocus,focusMenuRef=react.useRef(!1),handleCloseMenuAndReturnFocus=function handleCloseMenuAndReturnFocus(){var _triggerRef$current,_triggerRef$current$t,_triggerRef$current$t2,_triggerRef$current$t3;visible&&triggerRef.current&&(null===(_triggerRef$current=triggerRef.current)||void 0===_triggerRef$current||null===(_triggerRef$current$t=_triggerRef$current.triggerRef)||void 0===_triggerRef$current$t||null===(_triggerRef$current$t2=_triggerRef$current$t.current)||void 0===_triggerRef$current$t2||null===(_triggerRef$current$t3=_triggerRef$current$t2.focus)||void 0===_triggerRef$current$t3||_triggerRef$current$t3.call(_triggerRef$current$t2),setTriggerVisible(!1),"function"==typeof onVisibleChange&&onVisibleChange(!1))},focusMenu=function focusMenu(){var _triggerRef$current2,_triggerRef$current2$,_triggerRef$current2$2,_triggerRef$current2$3,firstElement=(0,Dom_focus.jD)(null===(_triggerRef$current2=triggerRef.current)||void 0===_triggerRef$current2||null===(_triggerRef$current2$=_triggerRef$current2.popupRef)||void 0===_triggerRef$current2$||null===(_triggerRef$current2$2=_triggerRef$current2$.current)||void 0===_triggerRef$current2$2||null===(_triggerRef$current2$3=_triggerRef$current2$2.getElement)||void 0===_triggerRef$current2$3?void 0:_triggerRef$current2$3.call(_triggerRef$current2$2))[0];return!!(null==firstElement?void 0:firstElement.focus)&&(firstElement.focus(),focusMenuRef.current=!0,!0)},handleKeyDown=function handleKeyDown(event){switch(event.keyCode){case ESC:handleCloseMenuAndReturnFocus();break;case TAB:var focusResult=!1;focusMenuRef.current||(focusResult=focusMenu()),focusResult?event.preventDefault():handleCloseMenuAndReturnFocus()}};react.useEffect((function(){return visible?(window.addEventListener("keydown",handleKeyDown),autoFocus&&(0,raf.A)(focusMenu,3),function(){window.removeEventListener("keydown",handleKeyDown),focusMenuRef.current=!1}):function(){focusMenuRef.current=!1}}),[visible])}({visible:mergedVisible,setTriggerVisible,triggerRef,onVisibleChange:props.onVisibleChange,autoFocus});var getMenuElement=function getMenuElement(){var overlayElement=function getOverlayElement(){var overlay=props.overlay;return"function"==typeof overlay?overlay():overlay}();return react.createElement(react.Fragment,null,arrow&&react.createElement("div",{className:"".concat(prefixCls,"-arrow")}),overlayElement)},triggerHideAction=hideAction;return triggerHideAction||-1===trigger.indexOf("contextMenu")||(triggerHideAction=["click"]),react.createElement(es.A,(0,objectSpread2.A)((0,objectSpread2.A)({builtinPlacements:placements},otherProps),{},{prefixCls,ref:triggerRef,popupClassName:classnames_default()(overlayClassName,(0,defineProperty.A)({},"".concat(prefixCls,"-show-arrow"),arrow)),popupStyle:overlayStyle,action:trigger,showAction,hideAction:triggerHideAction||[],popupPlacement:placement,popupAlign:align,popupTransitionName:transitionName,popupAnimation:animation,popupVisible:mergedVisible,stretch:function getMinOverlayWidthMatchTrigger(){var minOverlayWidthMatchTrigger=props.minOverlayWidthMatchTrigger,alignPoint=props.alignPoint;return"minOverlayWidthMatchTrigger"in props?minOverlayWidthMatchTrigger:!alignPoint}()?"minWidth":"",popup:function getMenuElementOrLambda(){return"function"==typeof props.overlay?getMenuElement:getMenuElement()}(),onPopupVisibleChange:function onVisibleChange(newVisible){var onVisibleChangeProp=props.onVisibleChange;setTriggerVisible(newVisible),"function"==typeof onVisibleChangeProp&&onVisibleChangeProp(newVisible)},onPopupClick:function onClick(e){var onOverlayClick=props.onOverlayClick;setTriggerVisible(!1),onOverlayClick&&onOverlayClick(e)},getPopupContainer}),function renderChildren(){var children=props.children,childrenProps=children.props?children.props:{},childClassName=classnames_default()(childrenProps.className,function getOpenClassName(){var openClassName=props.openClassName;return void 0!==openClassName?openClassName:"".concat(prefixCls,"-open")}());return mergedVisible&&children?react.cloneElement(children,{className:childClassName}):children}())}const rc_dropdown_es=react.forwardRef(Dropdown)}}]);