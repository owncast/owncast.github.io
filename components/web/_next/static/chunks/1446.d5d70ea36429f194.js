"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1446],{61446:function(e,t,n){n.r(t),n.d(t,{commonLisp:function(){return c}});var r,o=/^(block|let*|return-from|catch|load-time-value|setq|eval-when|locally|symbol-macrolet|flet|macrolet|tagbody|function|multiple-value-call|the|go|multiple-value-prog1|throw|if|progn|unwind-protect|labels|progv|let|quote)$/,a=/^with|^def|^do|^prog|case$|^cond$|bind$|when$|unless$/,i=/^(?:[+\-]?(?:\d+|\d*\.\d+)(?:[efd][+\-]?\d+)?|[+\-]?\d+(?:\/[+\-]?\d+)?|#b[+\-]?[01]+|#o[+\-]?[0-7]+|#x[+\-]?[\da-f]+)/,l=/[^\s'`,@()\[\]";]/;function readSym(e){for(var t;t=e.next();)if("\\"==t)e.next();else if(!l.test(t)){e.backUp(1);break}return e.current()}function base(e,t){if(e.eatSpace())return r="ws",null;if(e.match(i))return"number";var n=e.next();if("\\"==n&&(n=e.next()),'"'==n)return(t.tokenize=inString)(e,t);if("("==n)return r="open","bracket";if(")"==n||"]"==n)return r="close","bracket";if(";"==n)return e.skipToEnd(),r="ws","comment";if(/['`,@]/.test(n))return null;if("|"==n)return e.skipTo("|")?(e.next(),"variableName"):(e.skipToEnd(),"error");if("#"==n){var n=e.next();if("("==n)return r="open","bracket";if(/[+\-=\.']/.test(n))return null;if(/\d/.test(n)&&e.match(/^\d*#/))return null;if("|"==n)return(t.tokenize=inComment)(e,t);else if(":"==n)return readSym(e),"meta";else if("\\"==n)return e.next(),readSym(e),"string.special";else return"error"}else{var l=readSym(e);return"."==l?null:(r="symbol","nil"==l||"t"==l||":"==l.charAt(0))?"atom":"open"==t.lastType&&(o.test(l)||a.test(l))?"keyword":"&"==l.charAt(0)?"variableName.special":"variableName"}}function inString(e,t){for(var n,r=!1;n=e.next();){if('"'==n&&!r){t.tokenize=base;break}r=!r&&"\\"==n}return"string"}function inComment(e,t){for(var n,o;n=e.next();){if("#"==n&&"|"==o){t.tokenize=base;break}o=n}return r="ws","comment"}let c={name:"commonlisp",startState:function(){return{ctx:{prev:null,start:0,indentTo:0},lastType:null,tokenize:base}},token:function(e,t){e.sol()&&"number"!=typeof t.ctx.indentTo&&(t.ctx.indentTo=t.ctx.start+1),r=null;var n=t.tokenize(e,t);return"ws"!=r&&(null==t.ctx.indentTo?"symbol"==r&&a.test(e.current())?t.ctx.indentTo=t.ctx.start+e.indentUnit:t.ctx.indentTo="next":"next"==t.ctx.indentTo&&(t.ctx.indentTo=e.column()),t.lastType=r),"open"==r?t.ctx={prev:t.ctx,start:e.column(),indentTo:null}:"close"==r&&(t.ctx=t.ctx.prev||t.ctx),n},indent:function(e){var t=e.ctx.indentTo;return"number"==typeof t?t:e.ctx.start+1},languageData:{commentTokens:{line:";;",block:{open:"#|",close:"|#"}},closeBrackets:{brackets:["(","[","{",'"']}}}}}]);