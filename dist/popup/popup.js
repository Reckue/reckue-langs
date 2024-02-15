(()=>{var e={482:(e,t,s)=>{var n=s(420);e.exports=(n.default||n).apply(n,[])},85:(e,t,s)=>{var n=s(55);e.exports=function(e){var t,s="",i=e||{};return function(e){s=s+"<button"+(n.attr("class",n.classes([e.className],[!0]),!1,!0)+n.attr("disabled",e.disabled,!0,!0))+">"+n.escape(null==(t=e.title)?"":t)+"</button>"}.call(this,"buttonInfo"in i?i.buttonInfo:"undefined"!=typeof buttonInfo?buttonInfo:void 0),s}},420:(e,t,s)=>{s(55),e.exports=function(e){return""+'<div class="wordbook"><div class="header"><div class="filter"><input id="filter-terms" placeholder="Search or filter words..."></div></div><div class="words" id="words"></div><div id="pages"></div></div>'}},227:(e,t,s)=>{var n=s(55);e.exports=function(e){var t,s="",i=e||{};return function(e,i,r){s=s+'<div class="word"><input class="clear"'+n.attr("value",e,!0,!0)+'><select class="level">',function(){var e=r;if("number"==typeof e.length)for(var o=0,a=e.length;o<a;o++){var l=e[o];s=s+"<option"+(n.attr("value",l,!0,!0)+n.attr("selected",i===l,!0,!0))+">"+n.escape(null==(t=l)?"":t)+"</option>"}else for(var o in a=0,e)a++,l=e[o],s=s+"<option"+(n.attr("value",l,!0,!0)+n.attr("selected",i===l,!0,!0))+">"+n.escape(null==(t=l)?"":t)+"</option>"}.call(this),s+="</select></div>"}.call(this,"clear"in i?i.clear:"undefined"!=typeof clear?clear:void 0,"level"in i?i.level:"undefined"!=typeof level?level:void 0,"options"in i?i.options:"undefined"!=typeof options?options:void 0),s}},474:(e,t,s)=>{s(55),e.exports=function(e){return""+'<div class="settings"><div class="block"><div class="title">Languages</div></div></div>'}},696:(e,t,s)=>{var n=s(55);e.exports=function(e){var t,s="",i=e||{};return function(e){s=s+'<div class="enable"'+n.attr("id",e.id,!0,!0)+"><span>"+n.escape(null==(t=e.title)?"":t)+':</span><div class="lever"><div class="slider">|||</div></div></div>'}.call(this,"language"in i?i.language:"undefined"!=typeof language?language:void 0),s}},55:(e,t,s)=>{"use strict";var n=Object.prototype.hasOwnProperty;function i(e,t){return Array.isArray(e)?function(e,t){for(var s,n="",r="",o=Array.isArray(t),a=0;a<e.length;a++)(s=i(e[a]))&&(o&&t[a]&&(s=l(s)),n=n+r+s,r=" ");return n}(e,t):e&&"object"==typeof e?function(e){var t="",s="";for(var i in e)i&&e[i]&&n.call(e,i)&&(t=t+s+i,s=" ");return t}(e):e||""}function r(e){if(!e)return"";if("object"==typeof e){var t="";for(var s in e)n.call(e,s)&&(t=t+s+":"+e[s]+";");return t}return e+""}function o(e,t,s,n){if(!1===t||null==t||!t&&("class"===e||"style"===e))return"";if(!0===t)return" "+(n?e:e+'="'+e+'"');var i=typeof t;return"object"!==i&&"function"!==i||"function"!=typeof t.toJSON||(t=t.toJSON()),"string"==typeof t||(t=JSON.stringify(t),s||-1===t.indexOf('"'))?(s&&(t=l(t))," "+e+'="'+t+'"'):" "+e+"='"+t.replace(/'/g,"&#39;")+"'"}t.merge=function e(t,s){if(1===arguments.length){for(var n=t[0],i=1;i<t.length;i++)n=e(n,t[i]);return n}for(var o in s)if("class"===o){var a=t[o]||[];t[o]=(Array.isArray(a)?a:[a]).concat(s[o]||[])}else if("style"===o){a=(a=r(t[o]))&&";"!==a[a.length-1]?a+";":a;var l=r(s[o]);l=l&&";"!==l[l.length-1]?l+";":l,t[o]=a+l}else t[o]=s[o];return t},t.classes=i,t.style=r,t.attr=o,t.attrs=function(e,t){var s="";for(var a in e)if(n.call(e,a)){var l=e[a];if("class"===a){s=o(a,l=i(l),!1,t)+s;continue}"style"===a&&(l=r(l)),s+=o(a,l,!1,t)}return s};var a=/["&<>]/;function l(e){var t=""+e,s=a.exec(t);if(!s)return e;var n,i,r,o="";for(n=s.index,i=0;n<t.length;n++){switch(t.charCodeAt(n)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}i!==n&&(o+=t.substring(i,n)),i=n+1,o+=r}return i!==n?o+t.substring(i,n):o}t.escape=l,t.rethrow=function e(t,n,i,r){if(!(t instanceof Error))throw t;if(!("undefined"==typeof window&&n||r))throw t.message+=" on line "+i,t;try{r=r||s(835).readFileSync(n,"utf8")}catch(s){e(t,null,i)}var o=3,a=r.split("\n"),l=Math.max(i-o,0),c=Math.min(a.length,i+o);throw o=a.slice(l,c).map((function(e,t){var s=t+l+1;return(s==i?"  > ":"    ")+s+"| "+e})).join("\n"),t.path=n,t.message=(n||"Pug")+":"+i+"\n"+o+"\n\n"+t.message,t}},835:()=>{},218:e=>{"use strict";e.exports=JSON.parse('{"name":"Reckue Languages","version":"0.5.5","description":"Interactive language learning assistant","permissions":["storage","activeTab","tabs"],"background":{"service_worker":"background/application.js"},"action":{"default_popup":"dist/popup/index.html","default_icon":{"16":"images/coach16.png","32":"images/coach32.png","48":"images/coach48.png","128":"images/coach128.png"}},"content_scripts":[{"matches":["http://*/*","https://*/*"],"exclude_matches":["https://translate.google.com/*"],"run_at":"document_idle","js":["dist/page/page.js"]}],"icons":{"16":"images/coach16.png","32":"images/coach32.png","48":"images/coach48.png","128":"images/coach128.png"},"manifest_version":3}')}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{"use strict";class e{log=e=>{window.console.log("Reckue language app: "+e)};#e=e=>{window.console.log(e.textContent),window.console.log(e.toString()),window.console.log(e.parentNode.toString()),window.console.log(e.parentNode.nodeName),window.console.log(e.parentNode.role)}}const t=new Map;class n{static add=(e,s)=>{t.set(e,s)};static get=e=>t.get(e);static getWordbookService=()=>{const e=n.get("wordbook");if(e)return e}}class i{appParams=()=>new Promise((e=>{chrome.storage.local.get(["enable","russian","english","china","korean"],(t=>{n.add("settings",t),e(t.enable)}))}));saveWordbooks=e=>{chrome.storage.local.set(e)};getByName=e=>new Promise((t=>chrome.storage.local.get([e],(s=>t(s[e])))))}class r{#t;#s;#n;constructor(e,t){this.#t=e,this.#n=t}getCount=()=>this.#s;calcPagesCount=()=>(this.#s=Math.ceil(this.#t/this.#n),this.#s);isIndexOnPage=(e,t)=>t>=this.#i(e)&&t<this.#r(e);#i=e=>e*this.#n;#r=e=>(e+1)*this.#n}class o{#o;#a;constructor(){this.#a=new Map,this.#o=new r(0,0)}remove=e=>{this.#a.delete(e),this.#o=new r(this.#a.size,50),this.#o.calcPagesCount()};set=e=>(e.forEach((e=>{this.#a.set(e.word,e.level)})),this.#o=new r(this.#a.size,50),this.#o.calcPagesCount(),this);get=()=>this.#a;getPages=()=>this.#o;getPage=e=>{let t=0;const s=new Map;return this.#a.forEach(((n,i)=>{this.#o.isIndexOnPage(e,t)&&s.set(i,n),t++})),s};toObject=()=>{const e={};return this.#l().forEach(((t,s)=>{e[this.getName(s)]=t})),e};getName=e=>"wordbook"+e;#c=()=>{const e=[];return this.#a.forEach(((t,s)=>{e.push({word:s,level:t})})),e};#l=()=>{const e=[[]];return this.#c().forEach((t=>this.#d(e,t))),e};#d=(e,t)=>{const s=e.length-1;e[s].length<100?e[s].push(t):(e.push([]),this.#d(e,t))}}class a{#h;#u;#g;#p;executeAfter=e=>{this.#p=e};constructor(){this.#h=new i,this.#u=new e,this.#g=new o}set=e=>{this.#g.set(e),this.#v()};remove=e=>{this.#g.remove(e),this.#v()};#v=()=>{const e=this.#g.toObject();this.#h.saveWordbooks(e)};getWordbook=()=>this.#g;getFilteredWordbook=e=>{const t=[];this.#g.get().forEach(((s,n)=>n&&n.includes(e)&&t.push({word:n,level:s})));const s=new o;return s.set(t),s};getWordbookCache=()=>this.#g.get();loadWordbooks=()=>{this.#b(0)};#b=e=>{const t=this.#g.getName(e);this.#u.log(`Loaded ${t} from storage`),this.#h.getByName(t).then((t=>this.#f(t,e)))};#f=(e,t)=>{e?(this.#g.set(e),this.#w(t)):this.#p()};#w=e=>{const t=e+1;this.#b(t)}}class l{toElement=e=>{const t=window.document.createElement("div");return t.innerHTML=e.trim(),t.firstChild}}class c{#m;constructor(){this.#m=new l}getHTMLMapper=()=>this.#m}class d extends c{#E;constructor(){super(),this.#E=window.document.getElementById("content")}getContent=()=>this.#E}class h extends d{#L;buildSettingsContentStructure=()=>{const e=s(474)(),t=this.getHTMLMapper().toElement(e);this.getContent().appendChild(t);const n=this.getContent().getElementsByClassName("block")[0];this.appendSlider(n,{id:"russian",title:"Russian"}),this.appendSlider(n,{id:"korean",title:"Korean"}),this.appendSlider(n,{id:"english",title:"English"}),this.appendSlider(n,{id:"china",title:"China"})};appendSlider=(e,t)=>{const n=s(696)({language:t}),i=this.getHTMLMapper().toElement(n);e.appendChild(i)};loadLevers=()=>{this.#L=window.document.getElementsByClassName("lever")};setupAppEnableLever=e=>{this.#k(this.#L[0],e,"enable")};renderAppEnableLever=e=>{this.renderLever(this.#L[0],e)};setupRussianEnableLever=e=>{this.#k(this.#L[1],e,"russian")};renderRussianEnableLever=e=>{this.renderLever(this.#L[1],e)};setupKoreanEnableLever=e=>{this.#k(this.#L[2],e,"korean")};renderKoreanEnableLever=e=>{this.renderLever(this.#L[2],e)};setupEnglishEnableLever=e=>{this.#k(this.#L[3],e,"english")};renderEnglishEnableLever=e=>{this.renderLever(this.#L[3],e)};setupChinaEnableLever=e=>{this.#k(this.#L[4],e,"china")};renderChinaEnableLever=e=>{this.renderLever(this.#L[4],e)};#k=(e,t,s)=>{e.addEventListener("click",(()=>t(e,s)))};renderLever=(e,t)=>{e.style.justifyContent=t?"flex-end":"flex-start",e.style.background=t?"#c2d7bf":"#ffffff"}}class u{#S;#C;constructor(){this.#S=new h,this.#C={enable:!0,russian:!0,english:!0,china:!0,korean:!0}}fillSettings=()=>{chrome.storage.local.get(["enable","russian","english","china","korean"],(e=>this.#y(e)))};#y=e=>{this.#C=e,this.#S.loadLevers(),this.#B(),this.#x()};#B=()=>{this.#S.setupAppEnableLever(this.#P),this.#S.renderAppEnableLever(this.#C.enable)};#x=()=>{this.#S.setupRussianEnableLever(this.#P),this.#S.renderRussianEnableLever(this.#C.russian),this.#S.setupKoreanEnableLever(this.#P),this.#S.renderKoreanEnableLever(this.#C.korean),this.#S.setupEnglishEnableLever(this.#P),this.#S.renderEnglishEnableLever(this.#C.english),this.#S.setupChinaEnableLever(this.#P),this.#S.renderChinaEnableLever(this.#C.china)};#P=(e,t)=>{this.#C[t]=!this.#C[t],chrome.storage.local.set(this.#C,(()=>{this.#S.renderLever(e,this.#C[t])}))}}const g=(e,t)=>{Object.entries(e).forEach((e=>{const s=e[1];t(s)}))},p=Object.freeze({WORDBOOK:{title:"Wordbook",className:"nav-button",disabled:!0},SETTINGS:{title:"Settings",className:"nav-button"},REFRESH:{title:"↺ page",className:"refresh-btn"}}),v=(e,t,s)=>{e.addEventListener(t,(e=>{s(e)}))},b=(e,t)=>void 0!==t?window.document.getElementsByClassName(e)[t]:b(e,0);class f extends d{#N;constructor(){super(),this.#N=b("navbar")}buildButtons=()=>{const e=s(85);g(p,(t=>{const s=e({buttonInfo:t}),n=this.getHTMLMapper().toElement(s);this.#N.appendChild(n)}))};setContentVisibility=(e,t)=>{const s=this.getContent().getElementsByClassName(e)[0];s.style.visibility=this.#W(t),s.style.transform=this.#M(t)};#W=e=>e?"visible":"hidden";#M=e=>e?"translate(0px)":"translate(-400px)"}const w=Object.freeze({NATIVE:{name:"native",hex:"#2e8801",number:4},ADVANCED:{name:"advanced",hex:"#72d400",number:3},INTERMEDIATE:{name:"intermediate",hex:"#ef9f00",number:2},ELEMENTARY:{name:"elementary",hex:"#ab0000",number:1},BEGINNER:{name:"beginner",hex:"#ff2a00",number:0}});class m extends c{#A;#T;constructor(){super(),this.#A=s(227),this.#T=[],g(w,(e=>{this.#T.push(e.name)}))}addWord=(e,t)=>{const s=this.#I(),n=this.#O(e,t);return s.appendChild(n),n};#O=(e,t)=>{const s=this.#T,n=this.#A({clear:e,level:t,options:s});return this.getHTMLMapper().toElement(n)};clearScroll=()=>{this.#I().innerHTML=""};#I=()=>window.document.getElementById("words")}class E{#R;#j;#H;#V;#F;constructor(e,t){this.#H=n.getWordbookService(),this.#j=window.document.getElementById("pages"),this.#V=e,this.#F=t}buildPageButtons=e=>{this.#R=e,this.#_();const t=this.#H.getFilteredWordbook(n.get("filter").get()).getPages().getCount();if(t<10)1!==t&&this.#D(0,t);else{const e=this.#K(t),s=this.#z(t);this.#J(e,s)}};#_=()=>{this.#j.innerHTML=""};#J=(e,t)=>{this.#D(e[0],e[1]),this.#$(),this.#D(t[0],t[1])};#$=()=>{const e=window.document.createTextNode("...");this.#j.appendChild(e)};#K=e=>this.#R>=2&&this.#R<=e-5?this.#R>=e-8?[e-10,e-5]:[this.#R-2,this.#R+3]:[0,5];#z=e=>[e-5,e];#D=(e,t)=>{for(let s=e;s<t;s++){const e=window.document.createElement("a");e.target="_blank",e.textContent=`${s}`,e.style.cursor="pointer",e.addEventListener("click",(()=>this.#V(s))),this.#j.appendChild(e)}}}class L{#F;#q;#V;constructor(e,t){this.#F="",this.#q=e,this.#V=t,this.#G()}#G=()=>{window.document.getElementById("filter-terms").addEventListener("change",(e=>{this.#F=e.target.value,this.#q(0),this.#V(0)}))};get=()=>this.#F}class k{#H;#Y;#Q;#F;constructor(){this.#H=n.getWordbookService(),this.#Y=new m,this.#Q=new E(this.fillScroll),this.#F=new L(this.#Q.buildPageButtons,this.fillScroll),n.add("filter",this.#F)}fillScroll=e=>{this.#Q.buildPageButtons(e);const t=this.#U(e);this.#X(t)};#U=e=>this.#H.getFilteredWordbook(this.#F.get()).getPage(e);#X=e=>{this.#Y.clearScroll(),e.forEach(((e,t)=>{const s=this.#Y.addWord(t,e);this.#Z(s,t),this.#ee(s,t)}))};#ee=(e,t)=>{e.getElementsByTagName("input")[0].addEventListener("change",(e=>this.#te(e,t)))};#Z=(e,t)=>{e.getElementsByClassName("level")[0].addEventListener("change",(e=>this.#se(e,t)))};#te=(e,t)=>{const s=this.#H.getWordbookCache().get(t),n=e.target.value;this.#H.remove(t),this.#ne(n,s),this.fillScroll(0)};#se=(e,t)=>{const s=e.target.value;this.#ne(t,s)};#ne=(e,t)=>{this.#H.set([{word:e,level:t}])}}class S{#S;#N;#ie;#E;#re;constructor(){this.#S=new f,this.#N=b("navbar")}onClickNavButtons=()=>{this.#oe(),v(this.#ie,"click",this.#ae),g(this.#re,(e=>v(e,"click",this.#le)))};#oe=()=>{this.#ie=b("refresh-btn"),this.#re=this.#N.getElementsByClassName("nav-button"),this.#E=b("content")};#le=e=>{g(this.#re,(e=>e.disabled=!1)),e.target.disabled=!0,this.checkButtonsAndSetContentVisibility()};checkButtonsAndSetContentVisibility=()=>{g(this.#re,(e=>{const t=e.innerText.toLowerCase();this.#S.setContentVisibility(t,e.disabled)}))};#ae=()=>{chrome.tabs.query({active:!0,currentWindow:!0},(e=>{chrome.tabs.executeScript(e[0].id,{file:"./page/page.js"})}))}}class C extends d{build=()=>{const e=s(482),t=this.getHTMLMapper().toElement(e);this.getContent().appendChild(t)}}class y{#ce;#de;constructor(){const e=s(218);this.#de=e.version,this.#ce=b("infobar"),this.#he()}#he=()=>{this.#ce.textContent=`Version ${this.#de}`}}const B=new class{#ue;#ge;#pe;#ve;constructor(){this.#ge=new h,this.#ue=new f,this.#pe=new C,this.#ve=new y}run=()=>{this.#be(),(new u).fillSettings(),(new k).fillScroll(0),this.#fe()};#be=()=>{this.#ue.buildButtons(),this.#ge.buildSettingsContentStructure(),this.#pe.build()};#fe=()=>{const e=new S;e.onClickNavButtons(),e.checkButtonsAndSetContentVisibility()}},x=new class{#we;#H;#me;constructor(e){this.#we=new n,this.#me=e,this.#H=new a}start=()=>{this.#H.executeAfter(this.#Ee),this.#H.loadWordbooks()};#Ee=()=>{n.add("wordbook",this.#H),this.#me.run()}}(B);console.log("run popup"),x.start()})()})();