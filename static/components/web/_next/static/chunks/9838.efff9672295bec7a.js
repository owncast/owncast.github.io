"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9838],{49838:function(e,t,r){r.r(t),r.d(t,{EmojiPicker:function(){return a}});var u=r(85893),n=r(67294),c=r(6431);function s(e){let t=(0,n.useRef)(null),r=(0,n.useRef)(null);return r.current&&r.current.update(e),(0,n.useEffect)(()=>(r.current=new c.cW({...e,ref:t}),()=>{r.current=null}),[]),n.createElement("div",{ref:t})}var o=r(59223);let a=e=>{let{onEmojiSelect:t,customEmoji:r}=e,[c,a]=(0,n.useState)({});return(0,n.useEffect)(()=>{a([{id:"custom",name:"Custom",emojis:r.map(e=>({id:e.name,name:e.name,skins:[{src:e.url}]}))}]);let e=document.querySelector("em-emoji-picker").shadowRoot,t=new CSSStyleSheet;t.replaceSync(".emoji-mart-emoji {width: 24px;}"),e.adoptedStyleSheets=[t]},[]),(0,u.jsx)(s,{data:o,custom:c,onEmojiSelect:t,categories:["frequent","custom","people","nature","foods","activity","places","objects","symbols","flags"]})}}}]);