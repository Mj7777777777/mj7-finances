(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Nd="mj7-depenses";let $s=null;function uu(){return $s||($s=new Promise((i,e)=>{const t=indexedDB.open(Nd,1);t.onupgradeneeded=()=>{t.result.createObjectStore("items",{keyPath:"id"}).createIndex("kind","kind")},t.onsuccess=()=>i(t.result),t.onerror=()=>e(t.error)}),$s)}function du(i){return uu().then(e=>e.transaction("items",i).objectStore("items"))}function hu(i){return new Promise((e,t)=>{i.onsuccess=()=>e(i.result),i.onerror=()=>t(i.error)})}async function Od(){return hu((await du("readonly")).getAll())}async function Xi(i){const e=await uu();await new Promise((t,n)=>{const s=e.transaction("items","readwrite"),r=s.objectStore("items");i.forEach(a=>r.put(a)),s.oncomplete=()=>t(),s.onerror=()=>n(s.error)})}async function Fd(){await hu((await du("readwrite")).clear())}function un(){return Date.now().toString(36)+Math.random().toString(36).slice(2,10)}function Hr(i,e){return i?i.m==="p"?Math.round(e*i.v/100):i.v:0}const kd=[["cat_perso_dep_v3_0","Argent de poche Souhad","👛","#E89AC0",5.1],["cat_perso_dep_v3_1","Argent de poche Johane","👝","#7C9CF2",5.2],["cat_perso_dep_v2_0","Scolarité et enfants","🎒","#F2A65A",20],["cat_perso_dep_v2_1","Téléphone et internet","📱","#5AB8C9",21],["cat_perso_dep_v2_3","Imprévus","🧯","#E87A5A",23],["cat_perso_dep_v2_4","Soins et beauté","💇","#E89AC0",24],["cat_perso_dep_v2_5","Projets","🎯","#9C8CF2",25]],Bd=["cat_perso_dep_v2_2"],zd=[["Mon salaire","💼","#E8C27E"],["Salaire de ma femme","💼","#F28CB1"],["Activités MJ7","🎛️","#FF9A3D"],["Autre revenu","＋","#9AA0A6"]],fu=[{id:"foyer",name:"Foyer équilibré",desc:"Pour une famille : loyer, nourriture, enfants, famille, épargne.",pct:{Logement:25,Nourriture:18,Famille:8,"Scolarité et enfants":7,Transport:7,Factures:5,"Téléphone et internet":3,Santé:4,"Église et dons":5,Épargne:9,Imprévus:2,Loisirs:3,"Argent de poche Souhad":2,"Argent de poche Johane":2}},{id:"503020",name:"50 / 30 / 20",desc:"50 % besoins, 30 % envies et famille, 20 % épargne.",pct:{Logement:25,Nourriture:15,Factures:5,Transport:5,Loisirs:6,Shopping:4,Famille:8,"Église et dons":5,"Soins et beauté":3,"Argent de poche Souhad":2,"Argent de poche Johane":2,Épargne:15,Imprévus:5}},{id:"epargne",name:"Priorité épargne",desc:"35 % mis de côté : épargne et projets.",pct:{Épargne:25,Projets:10,Logement:22,Nourriture:15,Transport:6,Factures:5,Famille:6,"Église et dons":5,Imprévus:3,"Argent de poche Souhad":1.5,"Argent de poche Johane":1.5}}];function Hd(i){const e=[],t=(s,r)=>[...i.values()].some(a=>a.kind===s&&!a.deleted&&a.data.space==="perso"&&a.data.type==="dep"&&a.data.name===r);return kd.forEach(([s,r,a,o,c])=>{!i.has(s)&&!t("cat",r)&&e.push({id:s,kind:"cat",data:{name:r,icon:a,color:o,space:"perso",type:"dep",order:c},updatedAt:1,dirty:!0})}),Bd.forEach(s=>{const r=i.get(s);r&&!r.deleted&&e.push({...r,deleted:!0,updatedAt:Date.now(),dirty:!0})}),[...i.values()].some(s=>s.kind==="src")||zd.forEach(([s,r,a],o)=>e.push({id:`src_${o}`,kind:"src",data:{name:s,icon:r,color:a,amount:0,order:o},updatedAt:1,dirty:!0})),e}function Vd(i){const[e,t]=i.split("-").map(Number);return`${i}-${String(new Date(e,t,0).getDate()).padStart(2,"0")}`}const Ko=["Espèces","Wave","Orange Money","MTN MoMo","Moov Money","Carte","Virement"],Jo={Espèces:"#8FA36B",Wave:"#3FB6E8","Orange Money":"#FF7A1A","MTN MoMo":"#F2C230","Moov Money":"#3E6FD8",Carte:"#B07CE8",Virement:"#9AA0A6"},Gd=[["Logement","🏠","#E8C27E"],["Nourriture","🍲","#FF9A3D"],["Transport","🚕","#F2C230"],["Factures","💡","#3FB6E8"],["Santé","🩺","#E8636B"],["Famille","👨‍👩‍👧","#D98AD9"],["Église et dons","⛪","#8FD0B0"],["Loisirs","🎬","#7C9CF2"],["Shopping","🛍️","#F28CB1"],["Épargne","🏦","#5FC28A"],["Autre","•","#9AA0A6"]],$d=[["Matériel","🎛️","#FF9A3D"],["Logiciels et abonnements","💻","#7C9CF2"],["Location de lieux","📍","#E8C27E"],["Transport et déplacements","🚐","#F2C230"],["Équipe et assistants","🤝","#5FC28A"],["Publicité","📣","#F28CB1"],["Frais bancaires et Mobile Money","🏧","#3FB6E8"],["Autre","•","#9AA0A6"]],Wd=[["Salaire","💼","#5FC28A"],["Cadeau reçu","🎁","#F28CB1"],["Autre revenu","＋","#9AA0A6"]],jd=[["Ventes","🛒","#5FC28A"],["Prestations","🎥","#FF9A3D"],["Autre revenu","＋","#9AA0A6"]];function Xd(){const e=[],t=(n,s,r)=>n.forEach(([a,o,c],l)=>e.push({id:`cat_${s}_${r}_${l}`,kind:"cat",data:{name:a,icon:o,color:c,space:s,type:r,order:l},updatedAt:1,dirty:!0}));return t(Gd,"perso","dep"),t($d,"act","dep"),t(Wd,"perso","rev"),t(jd,"act","rev"),[["MJ7 PLUGINS","#FF9A3D"],["Prestations vidéo","#7C9CF2"],["Prestations son","#5FC28A"]].forEach(([n,s],r)=>e.push({id:`act_${r}`,kind:"act",data:{name:n,color:s,order:r},updatedAt:1,dirty:!0})),e}function Ne(i,e=!1){const t=Math.round(Math.abs(i)).toString().replace(/\B(?=(\d{3})+(?!\d))/g," ");return(i<0?"−":e&&i>0?"+":"")+t+" FCFA"}function $t(i){return Math.round(Math.abs(i)).toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}const pu=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],qd=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];function Ls(i){const[e,t]=i.split("-").map(Number);return`${pu[t-1]} ${e}`}function Vr(){return mu(new Date)}function mu(i){return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function fn(){return Vr().slice(0,7)}function Xn(i,e){const[t,n]=i.split("-").map(Number),s=new Date(t,n-1+e,1);return mu(s).slice(0,7)}function Yd(i){const e=[],t=[],n=Date.now(),s=fn(),r=new Date().getDate();for(const a of i){if(a.deleted||!a.data.active)continue;let o=a.data.lastMonth?Xn(a.data.lastMonth,1):s,c=a.data.lastMonth,l=0;for(;o<=s&&l++<24;){const[u,d]=o.split("-").map(Number),f=new Date(u,d,0).getDate(),m=Math.min(a.data.day,f);if(o===s&&m>r)break;e.push({id:"tx_"+un(),kind:"tx",updatedAt:n,dirty:!0,data:{type:a.data.type,amount:a.data.amount,date:`${o}-${String(m).padStart(2,"0")}`,space:a.data.space,actId:a.data.actId,catId:a.data.catId,pay:a.data.pay,note:a.data.label,recId:a.id}}),c=o,o=Xn(o,1)}c!==a.data.lastMonth&&t.push({...a,data:{...a.data,lastMonth:c},updatedAt:n,dirty:!0})}return{txs:e,updated:t}}function Kd(i,e){const t=[],n=Date.now(),s=(l,u,d)=>i.find(f=>!f.deleted&&f.data.space===l&&f.data.type===u&&f.data.name===d)?.id||i.find(f=>!f.deleted&&f.data.space===l&&f.data.type===u)?.id||"",r=l=>e.filter(u=>!u.deleted)[l]?.id,a=[[0,"dep","perso","Logement",15e4,"Virement","Loyer"],[0,"dep","perso","Nourriture",42500,"Wave","Courses"],[0,"dep","perso","Transport",18e3,"Espèces","Yango"],[0,"dep","perso","Factures",25e3,"Orange Money","CIE + internet"],[0,"dep","perso","Église et dons",2e4,"Espèces","Dîme"],[0,"dep","perso","Loisirs",12e3,"Wave","Cinéma"],[0,"rev","perso","Salaire",45e4,"Virement","Salaire"],[0,"dep","act","Logiciels et abonnements",16500,"Carte","Abonnement logiciel",0],[0,"dep","act","Publicité",3e4,"Carte","Pub Instagram",0],[0,"rev","act","Ventes",3e5,"Wave","2 Vocal Pack + 1 Suite",0],[0,"dep","act","Location de lieux",75e3,"Orange Money","Lieu de tournage",1],[0,"dep","act","Équipe et assistants",6e4,"Espèces","Assistants",1],[0,"rev","act","Prestations",4e5,"Virement","Clip",1],[0,"dep","act","Matériel",45e3,"Wave","Câbles + micro",2],[0,"rev","act","Prestations",12e4,"Wave","Mixage single",2],[-1,"dep","perso","Logement",15e4,"Virement","Loyer"],[-1,"dep","perso","Nourriture",55e3,"Wave","Courses"],[-1,"dep","perso","Transport",22e3,"Espèces","Yango"],[-1,"rev","perso","Salaire",45e4,"Virement","Salaire"],[-1,"rev","act","Ventes",15e4,"Wave","Vocal Pack",0],[-1,"dep","act","Publicité",2e4,"Carte","Pub",0],[-1,"rev","act","Prestations",25e4,"Virement","Spot",1],[-1,"dep","act","Location de lieux",5e4,"Wave","Lieu",1],[-2,"dep","perso","Logement",15e4,"Virement","Loyer"],[-2,"dep","perso","Nourriture",48e3,"Wave","Courses"],[-2,"rev","perso","Salaire",45e4,"Virement","Salaire"],[-2,"rev","act","Prestations",18e4,"Wave","Mix",2],[-3,"dep","perso","Logement",15e4,"Virement","Loyer"],[-3,"rev","perso","Salaire",45e4,"Virement","Salaire"],[-3,"dep","perso","Santé",35e3,"Espèces","Pharmacie"],[-3,"rev","act","Prestations",3e5,"Virement","Captation",1]],o=fn(),c=new Date().getDate();return a.forEach(([l,u,d,f,m,g,y,h],p)=>{const T=Xn(o,l),b=l===0?Math.max(1,Math.min(c,1+p*3%27)):1+p*5%27;t.push({id:"tx_demo_"+p,kind:"tx",updatedAt:n,dirty:!0,data:{type:u,amount:m,date:`${T}-${String(b).padStart(2,"0")}`,space:d,catId:s(d,u,f),pay:g,note:y,actId:d==="act"?r(h??0):void 0,demo:!0}})}),t}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zo="169",Jd=0,Uc=1,Zd=2,gu=1,_u=2,Sn=3,qn=0,Ft=1,Mn=2,Vn=0,Gi=1,Nc=2,Oc=3,Fc=4,Qd=5,li=100,eh=101,th=102,nh=103,ih=104,sh=200,rh=201,ah=202,oh=203,ja=204,Xa=205,ch=206,lh=207,uh=208,dh=209,hh=210,fh=211,ph=212,mh=213,gh=214,qa=0,Ya=1,Ka=2,qi=3,Ja=4,Za=5,Qa=6,eo=7,vu=0,_h=1,vh=2,Gn=0,yh=1,xh=2,bh=3,yu=4,Sh=5,Mh=6,Eh=7,xu=300,Yi=301,Ki=302,to=303,no=304,Gr=306,io=1e3,hi=1001,so=1002,Ot=1003,wh=1004,Ws=1005,an=1006,ra=1007,fi=1008,Tn=1009,bu=1010,Su=1011,Is=1012,Qo=1013,mi=1014,dn=1015,Ns=1016,ec=1017,tc=1018,Ji=1020,Mu=35902,Eu=1021,wu=1022,cn=1023,Tu=1024,Au=1025,$i=1026,Zi=1027,nc=1028,ic=1029,Cu=1030,sc=1031,rc=1033,br=33776,Sr=33777,Mr=33778,Er=33779,ro=35840,ao=35841,oo=35842,co=35843,lo=36196,uo=37492,ho=37496,fo=37808,po=37809,mo=37810,go=37811,_o=37812,vo=37813,yo=37814,xo=37815,bo=37816,So=37817,Mo=37818,Eo=37819,wo=37820,To=37821,wr=36492,Ao=36494,Co=36495,Ru=36283,Ro=36284,Po=36285,Lo=36286,Th=3200,Ah=3201,Pu=0,Ch=1,zn="",sn="srgb",Kn="srgb-linear",ac="display-p3",$r="display-p3-linear",Rr="linear",lt="srgb",Pr="rec709",Lr="p3",Mi=7680,kc=519,Rh=512,Ph=513,Lh=514,Lu=515,Ih=516,Dh=517,Uh=518,Nh=519,Bc=35044,zc="300 es",En=2e3,Ir=2001;class rs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],aa=Math.PI/180,Io=180/Math.PI;function Os(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Et[i&255]+Et[i>>8&255]+Et[i>>16&255]+Et[i>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]).toLowerCase()}function Nt(i,e,t){return Math.max(e,Math.min(t,i))}function Oh(i,e){return(i%e+e)%e}function oa(i,e,t){return(1-t)*i+t*e}function hs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function It(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Xe{constructor(e=0,t=0){Xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,n,s,r,a,o,c,l){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],m=n[5],g=n[8],y=s[0],h=s[3],p=s[6],T=s[1],b=s[4],E=s[7],U=s[2],C=s[5],A=s[8];return r[0]=a*y+o*T+c*U,r[3]=a*h+o*b+c*C,r[6]=a*p+o*E+c*A,r[1]=l*y+u*T+d*U,r[4]=l*h+u*b+d*C,r[7]=l*p+u*E+d*A,r[2]=f*y+m*T+g*U,r[5]=f*h+m*b+g*C,r[8]=f*p+m*E+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,f=o*c-u*r,m=l*r-a*c,g=t*d+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=d*y,e[1]=(s*l-u*n)*y,e[2]=(o*n-s*a)*y,e[3]=f*y,e[4]=(u*t-s*c)*y,e[5]=(s*r-o*t)*y,e[6]=m*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ca.makeScale(e,t)),this}rotate(e){return this.premultiply(ca.makeRotation(-e)),this}translate(e,t){return this.premultiply(ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ca=new ke;function Iu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Fh(){const i=Dr("canvas");return i.style.display="block",i}const Hc={};function Tr(i){i in Hc||(Hc[i]=!0,console.warn(i))}function kh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Bh(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function zh(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Vc=new ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Gc=new ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fs={[Kn]:{transfer:Rr,primaries:Pr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[sn]:{transfer:lt,primaries:Pr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[$r]:{transfer:Rr,primaries:Lr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Gc),fromReference:i=>i.applyMatrix3(Vc)},[ac]:{transfer:lt,primaries:Lr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Gc),fromReference:i=>i.applyMatrix3(Vc).convertLinearToSRGB()}},Hh=new Set([Kn,$r]),nt={enabled:!0,_workingColorSpace:Kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Hh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=fs[e].toReference,s=fs[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return fs[i].primaries},getTransfer:function(i){return i===zn?Rr:fs[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(fs[e].luminanceCoefficients)}};function Wi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function la(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ei;class Vh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ei===void 0&&(Ei=Dr("canvas")),Ei.width=e.width,Ei.height=e.height;const n=Ei.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ei}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Dr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Wi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Wi(t[n]/255)*255):t[n]=Wi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gh=0;class Du{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=Os(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ua(s[a].image)):r.push(ua(s[a]))}else r=ua(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $h=0;class Rt extends rs{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=hi,s=hi,r=an,a=fi,o=cn,c=Tn,l=Rt.DEFAULT_ANISOTROPY,u=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=Os(),this.name="",this.source=new Du(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case io:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case so:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case io:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case so:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=xu;Rt.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,n=0,s=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],m=c[5],g=c[9],y=c[2],h=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(g-h)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(g+h)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,E=(m+1)/2,U=(p+1)/2,C=(u+f)/4,A=(d+y)/4,N=(g+h)/4;return b>E&&b>U?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=C/n,r=A/n):E>U?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=C/s,r=N/s):U<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(U),n=A/r,s=N/r),this.set(n,s,r,t),this}let T=Math.sqrt((h-g)*(h-g)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(h-g)/T,this.y=(d-y)/T,this.z=(f-u)/T,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wh extends rs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Rt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Du(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gi extends Wh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Uu extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jh extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class as{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3];const f=r[a+0],m=r[a+1],g=r[a+2],y=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=y;return}if(d!==y||c!==f||l!==m||u!==g){let h=1-o;const p=c*f+l*m+u*g+d*y,T=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const U=Math.sqrt(b),C=Math.atan2(U,p*T);h=Math.sin(h*C)/U,o=Math.sin(o*C)/U}const E=o*T;if(c=c*h+f*E,l=l*h+m*E,u=u*h+g*E,d=d*h+y*E,h===1-o){const U=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=U,l*=U,u*=U,d*=U}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+u*d+c*m-l*f,e[t+1]=c*g+u*f+l*d-o*m,e[t+2]=l*g+u*m+o*f-c*d,e[t+3]=u*g-o*d-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),d=o(r/2),f=c(n/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*u*d+l*m*g,this._y=l*m*d-f*u*g,this._z=l*u*g+f*m*d,this._w=l*u*d-f*m*g;break;case"YXZ":this._x=f*u*d+l*m*g,this._y=l*m*d-f*u*g,this._z=l*u*g-f*m*d,this._w=l*u*d+f*m*g;break;case"ZXY":this._x=f*u*d-l*m*g,this._y=l*m*d+f*u*g,this._z=l*u*g+f*m*d,this._w=l*u*d-f*m*g;break;case"ZYX":this._x=f*u*d-l*m*g,this._y=l*m*d+f*u*g,this._z=l*u*g-f*m*d,this._w=l*u*d+f*m*g;break;case"YZX":this._x=f*u*d+l*m*g,this._y=l*m*d+f*u*g,this._z=l*u*g-f*m*d,this._w=l*u*d-f*m*g;break;case"XZY":this._x=f*u*d-l*m*g,this._y=l*m*d-f*u*g,this._z=l*u*g+f*m*d,this._w=l*u*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),d=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($c.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return da.copy(this).projectOnVector(e),this.sub(da)}reflect(e){return this.sub(da.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const da=new D,$c=new as;class vi{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(r,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),js.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),js.copy(n.boundingBox)),js.applyMatrix4(e.matrixWorld),this.union(js)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ps),Xs.subVectors(this.max,ps),wi.subVectors(e.a,ps),Ti.subVectors(e.b,ps),Ai.subVectors(e.c,ps),Pn.subVectors(Ti,wi),Ln.subVectors(Ai,Ti),Qn.subVectors(wi,Ai);let t=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-Qn.z,Qn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,Qn.z,0,-Qn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-Qn.y,Qn.x,0];return!ha(t,wi,Ti,Ai,Xs)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,wi,Ti,Ai,Xs))?!1:(qs.crossVectors(Pn,Ln),t=[qs.x,qs.y,qs.z],ha(t,wi,Ti,Ai,Xs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _n=[new D,new D,new D,new D,new D,new D,new D,new D],Qt=new D,js=new vi,wi=new D,Ti=new D,Ai=new D,Pn=new D,Ln=new D,Qn=new D,ps=new D,Xs=new D,qs=new D,ei=new D;function ha(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ei.fromArray(i,r);const o=s.x*Math.abs(ei.x)+s.y*Math.abs(ei.y)+s.z*Math.abs(ei.z),c=e.dot(ei),l=t.dot(ei),u=n.dot(ei);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Xh=new vi,ms=new D,fa=new D;class os{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Xh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ms.subVectors(e,this.center);const t=ms.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ms,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ms.copy(e.center).add(fa)),this.expandByPoint(ms.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new D,pa=new D,Ys=new D,In=new D,ma=new D,Ks=new D,ga=new D;class oc{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){pa.copy(e).add(t).multiplyScalar(.5),Ys.copy(t).sub(e).normalize(),In.copy(this.origin).sub(pa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ys),o=In.dot(this.direction),c=-In.dot(Ys),l=In.lengthSq(),u=Math.abs(1-a*a);let d,f,m,g;if(u>0)if(d=a*c-o,f=a*o-c,g=r*u,d>=0)if(f>=-g)if(f<=g){const y=1/u;d*=y,f*=y,m=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),m=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),m=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(pa).addScaledVector(Ys,f),m}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,n,s,r){ma.subVectors(t,e),Ks.subVectors(n,e),ga.crossVectors(ma,Ks);let a=this.direction.dot(ga),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;In.subVectors(this.origin,e);const c=o*this.direction.dot(Ks.crossVectors(In,Ks));if(c<0)return null;const l=o*this.direction.dot(ma.cross(In));if(l<0||c+l>a)return null;const u=-o*In.dot(ga);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,n,s,r,a,o,c,l,u,d,f,m,g,y,h){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,d,f,m,g,y,h)}set(e,t,n,s,r,a,o,c,l,u,d,f,m,g,y,h){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=m,p[7]=g,p[11]=y,p[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ci.setFromMatrixColumn(e,0).length(),r=1/Ci.setFromMatrixColumn(e,1).length(),a=1/Ci.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=a*u,m=a*d,g=o*u,y=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=m+g*l,t[5]=f-y*l,t[9]=-o*c,t[2]=y-f*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*u,m=c*d,g=l*u,y=l*d;t[0]=f+y*o,t[4]=g*o-m,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=m*o-g,t[6]=y+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*u,m=c*d,g=l*u,y=l*d;t[0]=f-y*o,t[4]=-a*d,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*u,t[9]=y-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*u,m=a*d,g=o*u,y=o*d;t[0]=c*u,t[4]=g*l-m,t[8]=f*l+y,t[1]=c*d,t[5]=y*l+f,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,m=a*l,g=o*c,y=o*l;t[0]=c*u,t[4]=y-f*d,t[8]=g*d+m,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*d+g,t[10]=f-y*d}else if(e.order==="XZY"){const f=a*c,m=a*l,g=o*c,y=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+y,t[5]=a*u,t[9]=m*d-g,t[2]=g*d-m,t[6]=o*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qh,e,Yh)}lookAt(e,t,n){const s=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),Dn.crossVectors(n,zt),Dn.lengthSq()===0&&(Math.abs(n.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),Dn.crossVectors(n,zt)),Dn.normalize(),Js.crossVectors(zt,Dn),s[0]=Dn.x,s[4]=Js.x,s[8]=zt.x,s[1]=Dn.y,s[5]=Js.y,s[9]=zt.y,s[2]=Dn.z,s[6]=Js.z,s[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],m=n[13],g=n[2],y=n[6],h=n[10],p=n[14],T=n[3],b=n[7],E=n[11],U=n[15],C=s[0],A=s[4],N=s[8],K=s[12],_=s[1],S=s[5],z=s[9],k=s[13],V=s[2],Y=s[6],H=s[10],Q=s[14],G=s[3],ce=s[7],le=s[11],xe=s[15];return r[0]=a*C+o*_+c*V+l*G,r[4]=a*A+o*S+c*Y+l*ce,r[8]=a*N+o*z+c*H+l*le,r[12]=a*K+o*k+c*Q+l*xe,r[1]=u*C+d*_+f*V+m*G,r[5]=u*A+d*S+f*Y+m*ce,r[9]=u*N+d*z+f*H+m*le,r[13]=u*K+d*k+f*Q+m*xe,r[2]=g*C+y*_+h*V+p*G,r[6]=g*A+y*S+h*Y+p*ce,r[10]=g*N+y*z+h*H+p*le,r[14]=g*K+y*k+h*Q+p*xe,r[3]=T*C+b*_+E*V+U*G,r[7]=T*A+b*S+E*Y+U*ce,r[11]=T*N+b*z+E*H+U*le,r[15]=T*K+b*k+E*Q+U*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],m=e[14],g=e[3],y=e[7],h=e[11],p=e[15];return g*(+r*c*d-s*l*d-r*o*f+n*l*f+s*o*m-n*c*m)+y*(+t*c*m-t*l*f+r*a*f-s*a*m+s*l*u-r*c*u)+h*(+t*l*d-t*o*m-r*a*d+n*a*m+r*o*u-n*l*u)+p*(-s*o*u-t*c*d+t*o*f+s*a*d-n*a*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],m=e[11],g=e[12],y=e[13],h=e[14],p=e[15],T=d*h*l-y*f*l+y*c*m-o*h*m-d*c*p+o*f*p,b=g*f*l-u*h*l-g*c*m+a*h*m+u*c*p-a*f*p,E=u*y*l-g*d*l+g*o*m-a*y*m-u*o*p+a*d*p,U=g*d*c-u*y*c-g*o*f+a*y*f+u*o*h-a*d*h,C=t*T+n*b+s*E+r*U;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return e[0]=T*A,e[1]=(y*f*r-d*h*r-y*s*m+n*h*m+d*s*p-n*f*p)*A,e[2]=(o*h*r-y*c*r+y*s*l-n*h*l-o*s*p+n*c*p)*A,e[3]=(d*c*r-o*f*r-d*s*l+n*f*l+o*s*m-n*c*m)*A,e[4]=b*A,e[5]=(u*h*r-g*f*r+g*s*m-t*h*m-u*s*p+t*f*p)*A,e[6]=(g*c*r-a*h*r-g*s*l+t*h*l+a*s*p-t*c*p)*A,e[7]=(a*f*r-u*c*r+u*s*l-t*f*l-a*s*m+t*c*m)*A,e[8]=E*A,e[9]=(g*d*r-u*y*r-g*n*m+t*y*m+u*n*p-t*d*p)*A,e[10]=(a*y*r-g*o*r+g*n*l-t*y*l-a*n*p+t*o*p)*A,e[11]=(u*o*r-a*d*r-u*n*l+t*d*l+a*n*m-t*o*m)*A,e[12]=U*A,e[13]=(u*y*s-g*d*s+g*n*f-t*y*f-u*n*h+t*d*h)*A,e[14]=(g*o*s-a*y*s-g*n*c+t*y*c+a*n*h-t*o*h)*A,e[15]=(a*d*s-u*o*s+u*n*c-t*d*c-a*n*f+t*o*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,d=o+o,f=r*l,m=r*u,g=r*d,y=a*u,h=a*d,p=o*d,T=c*l,b=c*u,E=c*d,U=n.x,C=n.y,A=n.z;return s[0]=(1-(y+p))*U,s[1]=(m+E)*U,s[2]=(g-b)*U,s[3]=0,s[4]=(m-E)*C,s[5]=(1-(f+p))*C,s[6]=(h+T)*C,s[7]=0,s[8]=(g+b)*A,s[9]=(h-T)*A,s[10]=(1-(f+y))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ci.set(s[0],s[1],s[2]).length();const a=Ci.set(s[4],s[5],s[6]).length(),o=Ci.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],en.copy(this);const l=1/r,u=1/a,d=1/o;return en.elements[0]*=l,en.elements[1]*=l,en.elements[2]*=l,en.elements[4]*=u,en.elements[5]*=u,en.elements[6]*=u,en.elements[8]*=d,en.elements[9]*=d,en.elements[10]*=d,t.setFromRotationMatrix(en),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=En){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let m,g;if(o===En)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ir)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=En){const c=this.elements,l=1/(t-e),u=1/(n-s),d=1/(a-r),f=(t+e)*l,m=(n+s)*u;let g,y;if(o===En)g=(a+r)*d,y=-2*d;else if(o===Ir)g=r*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ci=new D,en=new st,qh=new D(0,0,0),Yh=new D(1,1,1),Dn=new D,Js=new D,zt=new D,Wc=new st,jc=new as;class pn{constructor(e=0,t=0,n=0,s=pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jc.setFromEuler(this),this.setFromQuaternion(jc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pn.DEFAULT_ORDER="XYZ";class cc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kh=0;const Xc=new D,Ri=new as,yn=new st,Zs=new D,gs=new D,Jh=new D,Zh=new as,qc=new D(1,0,0),Yc=new D(0,1,0),Kc=new D(0,0,1),Jc={type:"added"},Qh={type:"removed"},Pi={type:"childadded",child:null},_a={type:"childremoved",child:null};class xt extends rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new D,t=new pn,n=new as,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new ke}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ri.setFromAxisAngle(e,t),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(e,t){return Ri.setFromAxisAngle(e,t),this.quaternion.premultiply(Ri),this}rotateX(e){return this.rotateOnAxis(qc,e)}rotateY(e){return this.rotateOnAxis(Yc,e)}rotateZ(e){return this.rotateOnAxis(Kc,e)}translateOnAxis(e,t){return Xc.copy(e).applyQuaternion(this.quaternion),this.position.add(Xc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qc,e)}translateY(e){return this.translateOnAxis(Yc,e)}translateZ(e){return this.translateOnAxis(Kc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Zs.copy(e):Zs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(gs,Zs,this.up):yn.lookAt(Zs,gs,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),Ri.setFromRotationMatrix(yn),this.quaternion.premultiply(Ri.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jc),Pi.child=e,this.dispatchEvent(Pi),Pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qh),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jc),Pi.child=e,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,e,Jh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,Zh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}xt.DEFAULT_UP=new D(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new D,xn=new D,va=new D,bn=new D,Li=new D,Ii=new D,Zc=new D,ya=new D,xa=new D,ba=new D,Sa=new rt,Ma=new rt,Ea=new rt;class on{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),tn.subVectors(e,t),s.cross(tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){tn.subVectors(s,t),xn.subVectors(n,t),va.subVectors(e,t);const a=tn.dot(tn),o=tn.dot(xn),c=tn.dot(va),l=xn.dot(xn),u=xn.dot(va),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,m=(l*c-o*u)*f,g=(a*u-o*c)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,bn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bn.x),c.addScaledVector(a,bn.y),c.addScaledVector(o,bn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Sa.setScalar(0),Ma.setScalar(0),Ea.setScalar(0),Sa.fromBufferAttribute(e,t),Ma.fromBufferAttribute(e,n),Ea.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Sa,r.x),a.addScaledVector(Ma,r.y),a.addScaledVector(Ea,r.z),a}static isFrontFacing(e,t,n,s){return tn.subVectors(n,t),xn.subVectors(e,t),tn.cross(xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tn.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),tn.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return on.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Li.subVectors(s,n),Ii.subVectors(r,n),ya.subVectors(e,n);const c=Li.dot(ya),l=Ii.dot(ya);if(c<=0&&l<=0)return t.copy(n);xa.subVectors(e,s);const u=Li.dot(xa),d=Ii.dot(xa);if(u>=0&&d<=u)return t.copy(s);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Li,a);ba.subVectors(e,r);const m=Li.dot(ba),g=Ii.dot(ba);if(g>=0&&m<=g)return t.copy(r);const y=m*l-c*g;if(y<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ii,o);const h=u*g-m*d;if(h<=0&&d-u>=0&&m-g>=0)return Zc.subVectors(r,s),o=(d-u)/(d-u+(m-g)),t.copy(s).addScaledVector(Zc,o);const p=1/(h+y+f);return a=y*p,o=f*p,t.copy(n).addScaledVector(Li,a).addScaledVector(Ii,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function wa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class He{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=nt.workingColorSpace){if(e=Oh(e,1),t=Nt(t,0,1),n=Nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=wa(a,r,e+1/3),this.g=wa(a,r,e),this.b=wa(a,r,e-1/3)}return nt.toWorkingColorSpace(this,s),this}setStyle(e,t=sn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=sn){const n=Nu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}copyLinearToSRGB(e){return this.r=la(e.r),this.g=la(e.g),this.b=la(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=sn){return nt.fromWorkingColorSpace(wt.copy(this),e),Math.round(Nt(wt.r*255,0,255))*65536+Math.round(Nt(wt.g*255,0,255))*256+Math.round(Nt(wt.b*255,0,255))}getHexString(e=sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.fromWorkingColorSpace(wt.copy(this),t);const n=wt.r,s=wt.g,r=wt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.fromWorkingColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=sn){nt.fromWorkingColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,s=wt.b;return e!==sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(Qs);const n=oa(Un.h,Qs.h,t),s=oa(Un.s,Qs.s,t),r=oa(Un.l,Qs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new He;He.NAMES=Nu;let ef=0;class cs extends rs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Os(),this.name="",this.type="Material",this.blending=Gi,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ja,this.blendDst=Xa,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mi,this.stencilZFail=Mi,this.stencilZPass=Mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ja&&(n.blendSrc=this.blendSrc),this.blendDst!==Xa&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class lc extends cs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=vu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new D,er=new Xe;class qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Bc,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)er.fromBufferAttribute(this,t),er.applyMatrix3(e),this.setXY(t,er.x,er.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=hs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hs(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hs(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hs(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),s=It(s,this.array),r=It(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bc&&(e.usage=this.usage),e}}class Ou extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Fu extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Tt extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let tf=0;const jt=new st,Ta=new xt,Di=new D,Ht=new vi,_s=new vi,_t=new D;class Jt extends rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=Os(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Iu(e)?Fu:Ou)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,n){return jt.makeTranslation(e,t,n),this.applyMatrix4(jt),this}scale(e,t,n){return jt.makeScale(e,t,n),this.applyMatrix4(jt),this}lookAt(e){return Ta.lookAt(e),Ta.updateMatrix(),this.applyMatrix4(Ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Tt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(_t.addVectors(Ht.min,_s.min),Ht.expandByPoint(_t),_t.addVectors(Ht.max,_s.max),Ht.expandByPoint(_t)):(Ht.expandByPoint(_s.min),Ht.expandByPoint(_s.max))}Ht.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)_t.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(_t));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)_t.fromBufferAttribute(o,l),c&&(Di.fromBufferAttribute(e,l),_t.add(Di)),s=Math.max(s,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new D,c[N]=new D;const l=new D,u=new D,d=new D,f=new Xe,m=new Xe,g=new Xe,y=new D,h=new D;function p(N,K,_){l.fromBufferAttribute(n,N),u.fromBufferAttribute(n,K),d.fromBufferAttribute(n,_),f.fromBufferAttribute(r,N),m.fromBufferAttribute(r,K),g.fromBufferAttribute(r,_),u.sub(l),d.sub(l),m.sub(f),g.sub(f);const S=1/(m.x*g.y-g.x*m.y);isFinite(S)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(S),h.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(S),o[N].add(y),o[K].add(y),o[_].add(y),c[N].add(h),c[K].add(h),c[_].add(h))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let N=0,K=T.length;N<K;++N){const _=T[N],S=_.start,z=_.count;for(let k=S,V=S+z;k<V;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const b=new D,E=new D,U=new D,C=new D;function A(N){U.fromBufferAttribute(s,N),C.copy(U);const K=o[N];b.copy(K),b.sub(U.multiplyScalar(U.dot(K))).normalize(),E.crossVectors(C,K);const S=E.dot(c[N])<0?-1:1;a.setXYZW(N,b.x,b.y,b.z,S)}for(let N=0,K=T.length;N<K;++N){const _=T[N],S=_.start,z=_.count;for(let k=S,V=S+z;k<V;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,a=new D,o=new D,c=new D,l=new D,u=new D,d=new D;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),y=e.getX(f+1),h=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,h),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,h),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(h,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,f=new l.constructor(c.length*u);let m=0,g=0;for(let y=0,h=c.length;y<h;y++){o.isInterleavedBufferAttribute?m=c[y]*o.data.stride+o.offset:m=c[y]*u;for(let p=0;p<u;p++)f[g++]=l[m++]}return new qt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){const f=l[u],m=e(f,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const m=l[d];u.push(m.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let f=0,m=d.length;f<m;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qc=new st,ti=new oc,tr=new os,el=new D,nr=new D,ir=new D,sr=new D,Aa=new D,rr=new D,tl=new D,ar=new D;class Ct extends xt{constructor(e=new Jt,t=new lc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){rr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],d=r[c];u!==0&&(Aa.fromBufferAttribute(d,e),a?rr.addScaledVector(Aa,u):rr.addScaledVector(Aa.sub(t),u))}t.add(rr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(r),ti.copy(e.ray).recast(e.near),!(tr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(tr,el)===null||ti.origin.distanceToSquared(el)>(e.far-e.near)**2))&&(Qc.copy(r).invert(),ti.copy(e.ray).applyMatrix4(Qc),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const h=f[g],p=a[h.materialIndex],T=Math.max(h.start,m.start),b=Math.min(o.count,Math.min(h.start+h.count,m.start+m.count));for(let E=T,U=b;E<U;E+=3){const C=o.getX(E),A=o.getX(E+1),N=o.getX(E+2);s=or(this,p,e,n,l,u,d,C,A,N),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);for(let h=g,p=y;h<p;h+=3){const T=o.getX(h),b=o.getX(h+1),E=o.getX(h+2);s=or(this,a,e,n,l,u,d,T,b,E),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const h=f[g],p=a[h.materialIndex],T=Math.max(h.start,m.start),b=Math.min(c.count,Math.min(h.start+h.count,m.start+m.count));for(let E=T,U=b;E<U;E+=3){const C=E,A=E+1,N=E+2;s=or(this,p,e,n,l,u,d,C,A,N),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=h.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);for(let h=g,p=y;h<p;h+=3){const T=h,b=h+1,E=h+2;s=or(this,a,e,n,l,u,d,T,b,E),s&&(s.faceIndex=Math.floor(h/3),t.push(s))}}}}function nf(i,e,t,n,s,r,a,o){let c;if(e.side===Ft?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===qn,o),c===null)return null;ar.copy(o),ar.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ar);return l<t.near||l>t.far?null:{distance:l,point:ar.clone(),object:i}}function or(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,nr),i.getVertexPosition(c,ir),i.getVertexPosition(l,sr);const u=nf(i,e,t,n,nr,ir,sr,tl);if(u){const d=new D;on.getBarycoord(tl,nr,ir,sr,d),s&&(u.uv=on.getInterpolatedAttribute(s,o,c,l,d,new Xe)),r&&(u.uv1=on.getInterpolatedAttribute(r,o,c,l,d,new Xe)),a&&(u.normal=on.getInterpolatedAttribute(a,o,c,l,d,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new D,materialIndex:0};on.getNormal(nr,ir,sr,f.normal),u.face=f,u.barycoord=d}return u}class Fs extends Jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(d,2));function g(y,h,p,T,b,E,U,C,A,N,K){const _=E/A,S=U/N,z=E/2,k=U/2,V=C/2,Y=A+1,H=N+1;let Q=0,G=0;const ce=new D;for(let le=0;le<H;le++){const xe=le*S-k;for(let We=0;We<Y;We++){const qe=We*_-z;ce[y]=qe*T,ce[h]=xe*b,ce[p]=V,l.push(ce.x,ce.y,ce.z),ce[y]=0,ce[h]=0,ce[p]=C>0?1:-1,u.push(ce.x,ce.y,ce.z),d.push(We/A),d.push(1-le/N),Q+=1}}for(let le=0;le<N;le++)for(let xe=0;xe<A;xe++){const We=f+xe+Y*le,qe=f+xe+Y*(le+1),W=f+(xe+1)+Y*(le+1),Z=f+(xe+1)+Y*le;c.push(We,qe,Z),c.push(qe,W,Z),G+=6}o.addGroup(m,G,K),m+=G,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function At(i){const e={};for(let t=0;t<i.length;t++){const n=Qi(i[t]);for(const s in n)e[s]=n[s]}return e}function sf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ku(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const rf={clone:Qi,merge:At};var af=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,of=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends cs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=af,this.fragmentShader=of,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=sf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Bu extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=En}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new D,nl=new Xe,il=new Xe;class Gt extends Bu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Io*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(aa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Io*2*Math.atan(Math.tan(aa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-e/Nn.z)}getViewSize(e,t){return this.getViewBounds(e,nl,il),t.subVectors(il,nl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(aa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ui=-90,Ni=1;class cf extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Gt(Ui,Ni,e,t);s.layers=this.layers,this.add(s);const r=new Gt(Ui,Ni,e,t);r.layers=this.layers,this.add(r);const a=new Gt(Ui,Ni,e,t);a.layers=this.layers,this.add(a);const o=new Gt(Ui,Ni,e,t);o.layers=this.layers,this.add(o);const c=new Gt(Ui,Ni,e,t);c.layers=this.layers,this.add(c);const l=new Gt(Ui,Ni,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class zu extends Rt{constructor(e,t,n,s,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Yi,super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lf extends gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new zu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:an}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Fs(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:Vn});r.uniforms.tEquirect.value=t;const a=new Ct(s,r),o=t.minFilter;return t.minFilter===fi&&(t.minFilter=an),new cf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Ca=new D,uf=new D,df=new ke;class ai{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ca.subVectors(n,t).cross(uf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ca),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||df.getNormalMatrix(e),s=this.coplanarPoint(Ca).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new os,cr=new D;class uc{constructor(e=new ai,t=new ai,n=new ai,s=new ai,r=new ai,a=new ai){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],d=s[6],f=s[7],m=s[8],g=s[9],y=s[10],h=s[11],p=s[12],T=s[13],b=s[14],E=s[15];if(n[0].setComponents(c-r,f-l,h-m,E-p).normalize(),n[1].setComponents(c+r,f+l,h+m,E+p).normalize(),n[2].setComponents(c+a,f+u,h+g,E+T).normalize(),n[3].setComponents(c-a,f-u,h-g,E-T).normalize(),n[4].setComponents(c-o,f-d,h-y,E-b).normalize(),t===En)n[5].setComponents(c+o,f+d,h+y,E+b).normalize();else if(t===Ir)n[5].setComponents(o,d,y,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(e){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(cr.x=s.normal.x>0?e.max.x:e.min.x,cr.y=s.normal.y>0?e.max.y:e.min.y,cr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(cr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Hu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function hf(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<d.length;m++){const g=d[f],y=d[m];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,d[f]=y)}d.length=f+1;for(let m=0,g=d.length;m<g;m++){const y=d[m];i.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class Wr extends Jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,d=e/o,f=t/c,m=[],g=[],y=[],h=[];for(let p=0;p<u;p++){const T=p*f-a;for(let b=0;b<l;b++){const E=b*d-r;g.push(E,-T,0),y.push(0,0,1),h.push(b/o),h.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<o;T++){const b=T+l*p,E=T+l*(p+1),U=T+1+l*(p+1),C=T+1+l*p;m.push(b,E,C),m.push(E,U,C)}this.setIndex(m),this.setAttribute("position",new Tt(g,3)),this.setAttribute("normal",new Tt(y,3)),this.setAttribute("uv",new Tt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.width,e.height,e.widthSegments,e.heightSegments)}}var ff=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_f=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Af=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Of=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ff=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Bf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Kf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ep=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,np=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ip=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ap=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,op=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,up=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_p=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ep=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Lp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Np=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Op=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$p=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Yp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,em=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,im=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,am=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,om=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,dm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_m=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ym=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Am=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Lm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Im=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Um=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Om=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Fm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$m=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:ff,alphahash_pars_fragment:pf,alphamap_fragment:mf,alphamap_pars_fragment:gf,alphatest_fragment:_f,alphatest_pars_fragment:vf,aomap_fragment:yf,aomap_pars_fragment:xf,batching_pars_vertex:bf,batching_vertex:Sf,begin_vertex:Mf,beginnormal_vertex:Ef,bsdfs:wf,iridescence_fragment:Tf,bumpmap_pars_fragment:Af,clipping_planes_fragment:Cf,clipping_planes_pars_fragment:Rf,clipping_planes_pars_vertex:Pf,clipping_planes_vertex:Lf,color_fragment:If,color_pars_fragment:Df,color_pars_vertex:Uf,color_vertex:Nf,common:Of,cube_uv_reflection_fragment:Ff,defaultnormal_vertex:kf,displacementmap_pars_vertex:Bf,displacementmap_vertex:zf,emissivemap_fragment:Hf,emissivemap_pars_fragment:Vf,colorspace_fragment:Gf,colorspace_pars_fragment:$f,envmap_fragment:Wf,envmap_common_pars_fragment:jf,envmap_pars_fragment:Xf,envmap_pars_vertex:qf,envmap_physical_pars_fragment:rp,envmap_vertex:Yf,fog_vertex:Kf,fog_pars_vertex:Jf,fog_fragment:Zf,fog_pars_fragment:Qf,gradientmap_pars_fragment:ep,lightmap_pars_fragment:tp,lights_lambert_fragment:np,lights_lambert_pars_fragment:ip,lights_pars_begin:sp,lights_toon_fragment:ap,lights_toon_pars_fragment:op,lights_phong_fragment:cp,lights_phong_pars_fragment:lp,lights_physical_fragment:up,lights_physical_pars_fragment:dp,lights_fragment_begin:hp,lights_fragment_maps:fp,lights_fragment_end:pp,logdepthbuf_fragment:mp,logdepthbuf_pars_fragment:gp,logdepthbuf_pars_vertex:_p,logdepthbuf_vertex:vp,map_fragment:yp,map_pars_fragment:xp,map_particle_fragment:bp,map_particle_pars_fragment:Sp,metalnessmap_fragment:Mp,metalnessmap_pars_fragment:Ep,morphinstance_vertex:wp,morphcolor_vertex:Tp,morphnormal_vertex:Ap,morphtarget_pars_vertex:Cp,morphtarget_vertex:Rp,normal_fragment_begin:Pp,normal_fragment_maps:Lp,normal_pars_fragment:Ip,normal_pars_vertex:Dp,normal_vertex:Up,normalmap_pars_fragment:Np,clearcoat_normal_fragment_begin:Op,clearcoat_normal_fragment_maps:Fp,clearcoat_pars_fragment:kp,iridescence_pars_fragment:Bp,opaque_fragment:zp,packing:Hp,premultiplied_alpha_fragment:Vp,project_vertex:Gp,dithering_fragment:$p,dithering_pars_fragment:Wp,roughnessmap_fragment:jp,roughnessmap_pars_fragment:Xp,shadowmap_pars_fragment:qp,shadowmap_pars_vertex:Yp,shadowmap_vertex:Kp,shadowmask_pars_fragment:Jp,skinbase_vertex:Zp,skinning_pars_vertex:Qp,skinning_vertex:em,skinnormal_vertex:tm,specularmap_fragment:nm,specularmap_pars_fragment:im,tonemapping_fragment:sm,tonemapping_pars_fragment:rm,transmission_fragment:am,transmission_pars_fragment:om,uv_pars_fragment:cm,uv_pars_vertex:lm,uv_vertex:um,worldpos_vertex:dm,background_vert:hm,background_frag:fm,backgroundCube_vert:pm,backgroundCube_frag:mm,cube_vert:gm,cube_frag:_m,depth_vert:vm,depth_frag:ym,distanceRGBA_vert:xm,distanceRGBA_frag:bm,equirect_vert:Sm,equirect_frag:Mm,linedashed_vert:Em,linedashed_frag:wm,meshbasic_vert:Tm,meshbasic_frag:Am,meshlambert_vert:Cm,meshlambert_frag:Rm,meshmatcap_vert:Pm,meshmatcap_frag:Lm,meshnormal_vert:Im,meshnormal_frag:Dm,meshphong_vert:Um,meshphong_frag:Nm,meshphysical_vert:Om,meshphysical_frag:Fm,meshtoon_vert:km,meshtoon_frag:Bm,points_vert:zm,points_frag:Hm,shadow_vert:Vm,shadow_frag:Gm,sprite_vert:$m,sprite_frag:Wm},ne={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},ln={basic:{uniforms:At([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:At([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new He(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:At([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:At([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:At([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new He(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:At([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:At([ne.points,ne.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:At([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:At([ne.common,ne.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:At([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:At([ne.sprite,ne.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:At([ne.common,ne.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:At([ne.lights,ne.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};ln.physical={uniforms:At([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const lr={r:0,b:0,g:0},ii=new pn,jm=new st;function Xm(i,e,t,n,s,r,a){const o=new He(0);let c=r===!0?0:1,l,u,d=null,f=0,m=null;function g(T){let b=T.isScene===!0?T.background:null;return b&&b.isTexture&&(b=(T.backgroundBlurriness>0?t:e).get(b)),b}function y(T){let b=!1;const E=g(T);E===null?p(o,c):E&&E.isColor&&(p(E,1),b=!0);const U=i.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,a):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function h(T,b){const E=g(b);E&&(E.isCubeTexture||E.mapping===Gr)?(u===void 0&&(u=new Ct(new Fs(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:Qi(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(U,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ii.copy(b.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(jm.makeRotationFromEuler(ii)),u.material.toneMapped=nt.getTransfer(E.colorSpace)!==lt,(d!==E||f!==E.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,d=E,f=E.version,m=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new Ct(new Wr(2,2),new Yn({name:"BackgroundMaterial",uniforms:Qi(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=nt.getTransfer(E.colorSpace)!==lt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,d=E,f=E.version,m=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function p(T,b){T.getRGB(lr,ku(i)),n.buffers.color.setClear(lr.r,lr.g,lr.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(T,b=1){o.set(T),c=b,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,p(o,c)},render:y,addToRenderList:h}}function qm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(_,S,z,k,V){let Y=!1;const H=d(k,z,S);r!==H&&(r=H,l(r.object)),Y=m(_,k,z,V),Y&&g(_,k,z,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,E(_,S,z,k),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function c(){return i.createVertexArray()}function l(_){return i.bindVertexArray(_)}function u(_){return i.deleteVertexArray(_)}function d(_,S,z){const k=z.wireframe===!0;let V=n[_.id];V===void 0&&(V={},n[_.id]=V);let Y=V[S.id];Y===void 0&&(Y={},V[S.id]=Y);let H=Y[k];return H===void 0&&(H=f(c()),Y[k]=H),H}function f(_){const S=[],z=[],k=[];for(let V=0;V<t;V++)S[V]=0,z[V]=0,k[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:z,attributeDivisors:k,object:_,attributes:{},index:null}}function m(_,S,z,k){const V=r.attributes,Y=S.attributes;let H=0;const Q=z.getAttributes();for(const G in Q)if(Q[G].location>=0){const le=V[G];let xe=Y[G];if(xe===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(xe=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(xe=_.instanceColor)),le===void 0||le.attribute!==xe||xe&&le.data!==xe.data)return!0;H++}return r.attributesNum!==H||r.index!==k}function g(_,S,z,k){const V={},Y=S.attributes;let H=0;const Q=z.getAttributes();for(const G in Q)if(Q[G].location>=0){let le=Y[G];le===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(le=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(le=_.instanceColor));const xe={};xe.attribute=le,le&&le.data&&(xe.data=le.data),V[G]=xe,H++}r.attributes=V,r.attributesNum=H,r.index=k}function y(){const _=r.newAttributes;for(let S=0,z=_.length;S<z;S++)_[S]=0}function h(_){p(_,0)}function p(_,S){const z=r.newAttributes,k=r.enabledAttributes,V=r.attributeDivisors;z[_]=1,k[_]===0&&(i.enableVertexAttribArray(_),k[_]=1),V[_]!==S&&(i.vertexAttribDivisor(_,S),V[_]=S)}function T(){const _=r.newAttributes,S=r.enabledAttributes;for(let z=0,k=S.length;z<k;z++)S[z]!==_[z]&&(i.disableVertexAttribArray(z),S[z]=0)}function b(_,S,z,k,V,Y,H){H===!0?i.vertexAttribIPointer(_,S,z,V,Y):i.vertexAttribPointer(_,S,z,k,V,Y)}function E(_,S,z,k){y();const V=k.attributes,Y=z.getAttributes(),H=S.defaultAttributeValues;for(const Q in Y){const G=Y[Q];if(G.location>=0){let ce=V[Q];if(ce===void 0&&(Q==="instanceMatrix"&&_.instanceMatrix&&(ce=_.instanceMatrix),Q==="instanceColor"&&_.instanceColor&&(ce=_.instanceColor)),ce!==void 0){const le=ce.normalized,xe=ce.itemSize,We=e.get(ce);if(We===void 0)continue;const qe=We.buffer,W=We.type,Z=We.bytesPerElement,me=W===i.INT||W===i.UNSIGNED_INT||ce.gpuType===Qo;if(ce.isInterleavedBufferAttribute){const de=ce.data,Le=de.stride,Ce=ce.offset;if(de.isInstancedInterleavedBuffer){for(let Ve=0;Ve<G.locationSize;Ve++)p(G.location+Ve,de.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Ve=0;Ve<G.locationSize;Ve++)h(G.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let Ve=0;Ve<G.locationSize;Ve++)b(G.location+Ve,xe/G.locationSize,W,le,Le*Z,(Ce+xe/G.locationSize*Ve)*Z,me)}else{if(ce.isInstancedBufferAttribute){for(let de=0;de<G.locationSize;de++)p(G.location+de,ce.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let de=0;de<G.locationSize;de++)h(G.location+de);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let de=0;de<G.locationSize;de++)b(G.location+de,xe/G.locationSize,W,le,xe*Z,xe/G.locationSize*de*Z,me)}}else if(H!==void 0){const le=H[Q];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(G.location,le);break;case 3:i.vertexAttrib3fv(G.location,le);break;case 4:i.vertexAttrib4fv(G.location,le);break;default:i.vertexAttrib1fv(G.location,le)}}}}T()}function U(){N();for(const _ in n){const S=n[_];for(const z in S){const k=S[z];for(const V in k)u(k[V].object),delete k[V];delete S[z]}delete n[_]}}function C(_){if(n[_.id]===void 0)return;const S=n[_.id];for(const z in S){const k=S[z];for(const V in k)u(k[V].object),delete k[V];delete S[z]}delete n[_.id]}function A(_){for(const S in n){const z=n[S];if(z[_.id]===void 0)continue;const k=z[_.id];for(const V in k)u(k[V].object),delete k[V];delete z[_.id]}}function N(){K(),a=!0,r!==s&&(r=s,l(r.object))}function K(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:K,dispose:U,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:h,disableUnusedAttributes:T}}function Ym(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];t.update(m,n,1)}function c(l,u,d,f){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],u[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,d);let g=0;for(let y=0;y<d;y++)g+=u[y];for(let y=0;y<f.length;y++)t.update(g,n,f[y])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Km(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==cn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const N=A===Ns&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Tn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==dn&&!N)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(f===!0){const A=e.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),U=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:h,maxAttributes:p,maxVertexUniforms:T,maxVaryings:b,maxFragmentUniforms:E,vertexTextures:U,maxSamples:C}}function Jm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ai,o=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||s;return s=f,n=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,y=d.clipIntersection,h=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!h)r?u(null):l();else{const T=r?0:n,b=T*4;let E=p.clippingState||null;c.value=E,E=u(g,f,b,m);for(let U=0;U!==b;++U)E[U]=t[U];p.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,m,g){const y=d!==null?d.length:0;let h=null;if(y!==0){if(h=c.value,g!==!0||h===null){const p=m+y*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(h===null||h.length<p)&&(h=new Float32Array(p));for(let b=0,E=m;b!==y;++b,E+=4)a.copy(d[b]).applyMatrix4(T,o),a.normal.toArray(h,E),h[E+3]=a.constant}c.value=h,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,h}}function Zm(i){let e=new WeakMap;function t(a,o){return o===to?a.mapping=Yi:o===no&&(a.mapping=Ki),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===to||o===no)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new lf(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Vu extends Bu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Vi=4,sl=[.125,.215,.35,.446,.526,.582],ui=20,Ra=new Vu,rl=new He;let Pa=null,La=0,Ia=0,Da=!1;const oi=(1+Math.sqrt(5))/2,Oi=1/oi,al=[new D(-oi,Oi,0),new D(oi,Oi,0),new D(-Oi,0,oi),new D(Oi,0,oi),new D(0,oi,-Oi),new D(0,oi,Oi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class ol{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pa,La,Ia),this._renderer.xr.enabled=Da,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yi||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:Ns,format:cn,colorSpace:Kn,depthBuffer:!1},s=cl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qm(r)),this._blurMaterial=eg(r,e,t)}return s}_compileMaterial(e){const t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Ra)}_sceneToCubeUV(e,t,n,s){const o=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(rl),u.toneMapping=Gn,u.autoClear=!1;const m=new lc({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),g=new Ct(new Fs,m);let y=!1;const h=e.background;h?h.isColor&&(m.color.copy(h),e.background=null,y=!0):(m.color.copy(rl),y=!0);for(let p=0;p<6;p++){const T=p%3;T===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):T===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const b=this._cubeSize;ur(s,T*b,p>2?b:0,b,b),u.setRenderTarget(s),y&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=h}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Yi||e.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ll());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;ur(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ra)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=al[(s-r-1)%al.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ct(this._lodPlanes[s],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ui-1),y=r/g,h=isFinite(r)?1+Math.floor(u*y):ui;h>ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${h} samples when the maximum is set to ${ui}`);const p=[];let T=0;for(let A=0;A<ui;++A){const N=A/y,K=Math.exp(-N*N/2);p.push(K),A===0?T+=K:A<h&&(T+=2*K)}for(let A=0;A<p.length;A++)p[A]=p[A]/T;f.envMap.value=e.texture,f.samples.value=h,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-n;const E=this._sizeLods[s],U=3*E*(s>b-Vi?s-b+Vi:0),C=4*(this._cubeSize-E);ur(t,U,C,3*E,2*E),c.setRenderTarget(t),c.render(d,Ra)}}function Qm(i){const e=[],t=[],n=[];let s=i;const r=i-Vi+1+sl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Vi?c=sl[a-i+Vi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,y=3,h=2,p=1,T=new Float32Array(y*g*m),b=new Float32Array(h*g*m),E=new Float32Array(p*g*m);for(let C=0;C<m;C++){const A=C%3*2/3-1,N=C>2?0:-1,K=[A,N,0,A+2/3,N,0,A+2/3,N+1,0,A,N,0,A+2/3,N+1,0,A,N+1,0];T.set(K,y*g*C),b.set(f,h*g*C);const _=[C,C,C,C,C,C];E.set(_,p*g*C)}const U=new Jt;U.setAttribute("position",new qt(T,y)),U.setAttribute("uv",new qt(b,h)),U.setAttribute("faceIndex",new qt(E,p)),e.push(U),s>Vi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function cl(i,e,t){const n=new gi(i,e,t);return n.texture.mapping=Gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function eg(i,e,t){const n=new Float32Array(ui),s=new D(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ll(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ul(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function dc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function tg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===to||c===no,u=c===Yi||c===Ki;if(l||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new ol(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return l&&m&&m.height>0||u&&m&&s(m)?(t===null&&(t=new ol(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ng(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Tr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ig(i,e,t,n){const s={},r=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const y=f.morphAttributes[g];for(let h=0,p=y.length;h<p;h++)e.remove(y[h])}f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const y=m[g];for(let h=0,p=y.length;h<p;h++)e.update(y[h],i.ARRAY_BUFFER)}}function l(d){const f=[],m=d.index,g=d.attributes.position;let y=0;if(m!==null){const T=m.array;y=m.version;for(let b=0,E=T.length;b<E;b+=3){const U=T[b+0],C=T[b+1],A=T[b+2];f.push(U,C,C,A,A,U)}}else if(g!==void 0){const T=g.array;y=g.version;for(let b=0,E=T.length/3-1;b<E;b+=3){const U=b+0,C=b+1,A=b+2;f.push(U,C,C,A,A,U)}}else return;const h=new(Iu(f)?Fu:Ou)(f,1);h.version=y;const p=r.get(d);p&&e.remove(p),r.set(d,h)}function u(d){const f=r.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function sg(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,m){i.drawElements(n,m,r,f*a),t.update(m,n,1)}function l(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,f*a,g),t.update(m,n,g))}function u(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,f,0,g);let h=0;for(let p=0;p<g;p++)h+=m[p];t.update(h,n,1)}function d(f,m,g,y){if(g===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let p=0;p<f.length;p++)l(f[p]/a,m[p],y[p]);else{h.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,y,0,g);let p=0;for(let T=0;T<g;T++)p+=m[T];for(let T=0;T<y.length;T++)t.update(p,n,y[T])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function rg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ag(i,e,t){const n=new WeakMap,s=new rt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let K=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",K)};f!==void 0&&f.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let b=0;m===!0&&(b=1),g===!0&&(b=2),y===!0&&(b=3);let E=o.attributes.position.count*b,U=1;E>e.maxTextureSize&&(U=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const C=new Float32Array(E*U*4*d),A=new Uu(C,E,U,d);A.type=dn,A.needsUpdate=!0;const N=b*4;for(let _=0;_<d;_++){const S=h[_],z=p[_],k=T[_],V=E*U*4*_;for(let Y=0;Y<S.count;Y++){const H=Y*N;m===!0&&(s.fromBufferAttribute(S,Y),C[V+H+0]=s.x,C[V+H+1]=s.y,C[V+H+2]=s.z,C[V+H+3]=0),g===!0&&(s.fromBufferAttribute(z,Y),C[V+H+4]=s.x,C[V+H+5]=s.y,C[V+H+6]=s.z,C[V+H+7]=0),y===!0&&(s.fromBufferAttribute(k,Y),C[V+H+8]=s.x,C[V+H+9]=s.y,C[V+H+10]=s.z,C[V+H+11]=k.itemSize===4?s.w:1)}}f={count:d,texture:A,size:new Xe(E,U)},n.set(o,f),o.addEventListener("dispose",K)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let y=0;y<l.length;y++)m+=l[y];const g=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function og(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class Gu extends Rt{constructor(e,t,n,s,r,a,o,c,l,u=$i){if(u!==$i&&u!==Zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===$i&&(n=mi),n===void 0&&u===Zi&&(n=Ji),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ot,this.minFilter=c!==void 0?c:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const $u=new Rt,dl=new Gu(1,1),Wu=new Uu,ju=new jh,Xu=new zu,hl=[],fl=[],pl=new Float32Array(16),ml=new Float32Array(9),gl=new Float32Array(4);function ls(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=hl[s];if(r===void 0&&(r=new Float32Array(s),hl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jr(i,e){let t=fl[e];t===void 0&&(t=new Int32Array(e),fl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function cg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function hg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;gl.set(n),i.uniformMatrix2fv(this.addr,!1,gl),gt(t,n)}}function fg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;ml.set(n),i.uniformMatrix3fv(this.addr,!1,ml),gt(t,n)}}function pg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;pl.set(n),i.uniformMatrix4fv(this.addr,!1,pl),gt(t,n)}}function mg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function _g(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function vg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function yg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function xg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function bg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function Sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function Mg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(dl.compareFunction=Lu,r=dl):r=$u,t.setTexture2D(e||r,s)}function Eg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ju,s)}function wg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Xu,s)}function Tg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Wu,s)}function Ag(i){switch(i){case 5126:return cg;case 35664:return lg;case 35665:return ug;case 35666:return dg;case 35674:return hg;case 35675:return fg;case 35676:return pg;case 5124:case 35670:return mg;case 35667:case 35671:return gg;case 35668:case 35672:return _g;case 35669:case 35673:return vg;case 5125:return yg;case 36294:return xg;case 36295:return bg;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return Mg;case 35679:case 36299:case 36307:return Eg;case 35680:case 36300:case 36308:case 36293:return wg;case 36289:case 36303:case 36311:case 36292:return Tg}}function Cg(i,e){i.uniform1fv(this.addr,e)}function Rg(i,e){const t=ls(e,this.size,2);i.uniform2fv(this.addr,t)}function Pg(i,e){const t=ls(e,this.size,3);i.uniform3fv(this.addr,t)}function Lg(i,e){const t=ls(e,this.size,4);i.uniform4fv(this.addr,t)}function Ig(i,e){const t=ls(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Dg(i,e){const t=ls(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ug(i,e){const t=ls(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ng(i,e){i.uniform1iv(this.addr,e)}function Og(i,e){i.uniform2iv(this.addr,e)}function Fg(i,e){i.uniform3iv(this.addr,e)}function kg(i,e){i.uniform4iv(this.addr,e)}function Bg(i,e){i.uniform1uiv(this.addr,e)}function zg(i,e){i.uniform2uiv(this.addr,e)}function Hg(i,e){i.uniform3uiv(this.addr,e)}function Vg(i,e){i.uniform4uiv(this.addr,e)}function Gg(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||$u,r[a])}function $g(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ju,r[a])}function Wg(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Xu,r[a])}function jg(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Wu,r[a])}function Xg(i){switch(i){case 5126:return Cg;case 35664:return Rg;case 35665:return Pg;case 35666:return Lg;case 35674:return Ig;case 35675:return Dg;case 35676:return Ug;case 5124:case 35670:return Ng;case 35667:case 35671:return Og;case 35668:case 35672:return Fg;case 35669:case 35673:return kg;case 5125:return Bg;case 36294:return zg;case 36295:return Hg;case 36296:return Vg;case 35678:case 36198:case 36298:case 36306:case 35682:return Gg;case 35679:case 36299:case 36307:return $g;case 35680:case 36300:case 36308:case 36293:return Wg;case 36289:case 36303:case 36311:case 36292:return jg}}class qg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ag(t.type)}}class Yg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xg(t.type)}}class Kg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Ua=/(\w+)(\])?(\[|\.)?/g;function _l(i,e){i.seq.push(e),i.map[e.id]=e}function Jg(i,e,t){const n=i.name,s=n.length;for(Ua.lastIndex=0;;){const r=Ua.exec(n),a=Ua.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){_l(t,l===void 0?new qg(o,i,e):new Yg(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Kg(o),_l(t,d)),t=d}}}class Ar{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Jg(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function vl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Zg=37297;let Qg=0;function e_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function t_(i){const e=nt.getPrimaries(nt.workingColorSpace),t=nt.getPrimaries(i);let n;switch(e===t?n="":e===Lr&&t===Pr?n="LinearDisplayP3ToLinearSRGB":e===Pr&&t===Lr&&(n="LinearSRGBToLinearDisplayP3"),i){case Kn:case $r:return[n,"LinearTransferOETF"];case sn:case ac:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function yl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+e_(i.getShaderSource(e),a)}else return s}function n_(i,e){const t=t_(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function i_(i,e){let t;switch(e){case yh:t="Linear";break;case xh:t="Reinhard";break;case bh:t="Cineon";break;case yu:t="ACESFilmic";break;case Mh:t="AgX";break;case Eh:t="Neutral";break;case Sh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const dr=new D;function s_(){nt.getLuminanceCoefficients(dr);const i=dr.x.toFixed(4),e=dr.y.toFixed(4),t=dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function a_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function o_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ws(i){return i!==""}function xl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const c_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(i){return i.replace(c_,u_)}const l_=new Map;function u_(i,e){let t=Fe[e];if(t===void 0){const n=l_.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Do(t)}const d_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sl(i){return i.replace(d_,h_)}function h_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ml(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function f_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===gu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===_u?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function p_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Yi:case Ki:e="ENVMAP_TYPE_CUBE";break;case Gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function m_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ki:e="ENVMAP_MODE_REFRACTION";break}return e}function g_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case vu:e="ENVMAP_BLENDING_MULTIPLY";break;case _h:e="ENVMAP_BLENDING_MIX";break;case vh:e="ENVMAP_BLENDING_ADD";break}return e}function __(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function v_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=f_(t),l=p_(t),u=m_(t),d=g_(t),f=__(t),m=r_(t),g=a_(r),y=s.createProgram();let h,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ws).join(`
`),h.length>0&&(h+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ws).join(`
`),p.length>0&&(p+=`
`)):(h=[Ml(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),p=[Ml(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Gn?i_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,n_("linearToOutputTexel",t.outputColorSpace),s_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ws).join(`
`)),a=Do(a),a=xl(a,t),a=bl(a,t),o=Do(o),o=xl(o,t),o=bl(o,t),a=Sl(a),o=Sl(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,h=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,p=["#define varying in",t.glslVersion===zc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=T+h+a,E=T+p+o,U=vl(s,s.VERTEX_SHADER,b),C=vl(s,s.FRAGMENT_SHADER,E);s.attachShader(y,U),s.attachShader(y,C),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function A(S){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(y).trim(),k=s.getShaderInfoLog(U).trim(),V=s.getShaderInfoLog(C).trim();let Y=!0,H=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,U,C);else{const Q=yl(s,U,"vertex"),G=yl(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+z+`
`+Q+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(k===""||V==="")&&(H=!1);H&&(S.diagnostics={runnable:Y,programLog:z,vertexShader:{log:k,prefix:h},fragmentShader:{log:V,prefix:p}})}s.deleteShader(U),s.deleteShader(C),N=new Ar(s,y),K=o_(s,y)}let N;this.getUniforms=function(){return N===void 0&&A(this),N};let K;this.getAttributes=function(){return K===void 0&&A(this),K};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(y,Zg)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Qg++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=U,this.fragmentShader=C,this}let y_=0;class x_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new b_(e),t.set(e,n)),n}}class b_{constructor(e){this.id=y_++,this.code=e,this.usedTimes=0}}function S_(i,e,t,n,s,r,a){const o=new cc,c=new x_,l=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.reverseDepthBuffer,m=s.vertexTextures;let g=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(_){return l.add(_),_===0?"uv":`uv${_}`}function p(_,S,z,k,V){const Y=k.fog,H=V.geometry,Q=_.isMeshStandardMaterial?k.environment:null,G=(_.isMeshStandardMaterial?t:e).get(_.envMap||Q),ce=G&&G.mapping===Gr?G.image.height:null,le=y[_.type];_.precision!==null&&(g=s.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const xe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,We=xe!==void 0?xe.length:0;let qe=0;H.morphAttributes.position!==void 0&&(qe=1),H.morphAttributes.normal!==void 0&&(qe=2),H.morphAttributes.color!==void 0&&(qe=3);let W,Z,me,de;if(le){const Lt=ln[le];W=Lt.vertexShader,Z=Lt.fragmentShader}else W=_.vertexShader,Z=_.fragmentShader,c.update(_),me=c.getVertexShaderID(_),de=c.getFragmentShaderID(_);const Le=i.getRenderTarget(),Ce=V.isInstancedMesh===!0,Ve=V.isBatchedMesh===!0,Ze=!!_.map,Ge=!!_.matcap,w=!!G,Se=!!_.aoMap,ie=!!_.lightMap,ge=!!_.bumpMap,ue=!!_.normalMap,ze=!!_.displacementMap,se=!!_.emissiveMap,M=!!_.metalnessMap,v=!!_.roughnessMap,O=_.anisotropy>0,X=_.clearcoat>0,J=_.dispersion>0,j=_.iridescence>0,ye=_.sheen>0,re=_.transmission>0,pe=O&&!!_.anisotropyMap,Je=X&&!!_.clearcoatMap,ee=X&&!!_.clearcoatNormalMap,_e=X&&!!_.clearcoatRoughnessMap,De=j&&!!_.iridescenceMap,Ue=j&&!!_.iridescenceThicknessMap,ve=ye&&!!_.sheenColorMap,Ye=ye&&!!_.sheenRoughnessMap,Oe=!!_.specularMap,at=!!_.specularColorMap,P=!!_.specularIntensityMap,he=re&&!!_.transmissionMap,$=re&&!!_.thicknessMap,q=!!_.gradientMap,ae=!!_.alphaMap,fe=_.alphaTest>0,Ke=!!_.alphaHash,ft=!!_.extensions;let Pt=Gn;_.toneMapped&&(Le===null||Le.isXRRenderTarget===!0)&&(Pt=i.toneMapping);const Qe={shaderID:le,shaderType:_.type,shaderName:_.name,vertexShader:W,fragmentShader:Z,defines:_.defines,customVertexShaderID:me,customFragmentShaderID:de,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:Ve,batchingColor:Ve&&V._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&V.instanceColor!==null,instancingMorph:Ce&&V.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Le===null?i.outputColorSpace:Le.isXRRenderTarget===!0?Le.texture.colorSpace:Kn,alphaToCoverage:!!_.alphaToCoverage,map:Ze,matcap:Ge,envMap:w,envMapMode:w&&G.mapping,envMapCubeUVHeight:ce,aoMap:Se,lightMap:ie,bumpMap:ge,normalMap:ue,displacementMap:m&&ze,emissiveMap:se,normalMapObjectSpace:ue&&_.normalMapType===Ch,normalMapTangentSpace:ue&&_.normalMapType===Pu,metalnessMap:M,roughnessMap:v,anisotropy:O,anisotropyMap:pe,clearcoat:X,clearcoatMap:Je,clearcoatNormalMap:ee,clearcoatRoughnessMap:_e,dispersion:J,iridescence:j,iridescenceMap:De,iridescenceThicknessMap:Ue,sheen:ye,sheenColorMap:ve,sheenRoughnessMap:Ye,specularMap:Oe,specularColorMap:at,specularIntensityMap:P,transmission:re,transmissionMap:he,thicknessMap:$,gradientMap:q,opaque:_.transparent===!1&&_.blending===Gi&&_.alphaToCoverage===!1,alphaMap:ae,alphaTest:fe,alphaHash:Ke,combine:_.combine,mapUv:Ze&&h(_.map.channel),aoMapUv:Se&&h(_.aoMap.channel),lightMapUv:ie&&h(_.lightMap.channel),bumpMapUv:ge&&h(_.bumpMap.channel),normalMapUv:ue&&h(_.normalMap.channel),displacementMapUv:ze&&h(_.displacementMap.channel),emissiveMapUv:se&&h(_.emissiveMap.channel),metalnessMapUv:M&&h(_.metalnessMap.channel),roughnessMapUv:v&&h(_.roughnessMap.channel),anisotropyMapUv:pe&&h(_.anisotropyMap.channel),clearcoatMapUv:Je&&h(_.clearcoatMap.channel),clearcoatNormalMapUv:ee&&h(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&h(_.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&h(_.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&h(_.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&h(_.sheenColorMap.channel),sheenRoughnessMapUv:Ye&&h(_.sheenRoughnessMap.channel),specularMapUv:Oe&&h(_.specularMap.channel),specularColorMapUv:at&&h(_.specularColorMap.channel),specularIntensityMapUv:P&&h(_.specularIntensityMap.channel),transmissionMapUv:he&&h(_.transmissionMap.channel),thicknessMapUv:$&&h(_.thicknessMap.channel),alphaMapUv:ae&&h(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ue||O),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!H.attributes.uv&&(Ze||ae),fog:!!Y,useFog:_.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:f,skinning:V.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:We,morphTextureStride:qe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:Pt,decodeVideoTexture:Ze&&_.map.isVideoTexture===!0&&nt.getTransfer(_.map.colorSpace)===lt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Mn,flipSided:_.side===Ft,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ft&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&_.extensions.multiDraw===!0||Ve)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Qe.vertexUv1s=l.has(1),Qe.vertexUv2s=l.has(2),Qe.vertexUv3s=l.has(3),l.clear(),Qe}function T(_){const S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(const z in _.defines)S.push(z),S.push(_.defines[z]);return _.isRawShaderMaterial===!1&&(b(S,_),E(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function b(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function E(_,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.alphaToCoverage&&o.enable(20),_.push(o.mask)}function U(_){const S=y[_.type];let z;if(S){const k=ln[S];z=rf.clone(k.uniforms)}else z=_.uniforms;return z}function C(_,S){let z;for(let k=0,V=u.length;k<V;k++){const Y=u[k];if(Y.cacheKey===S){z=Y,++z.usedTimes;break}}return z===void 0&&(z=new v_(i,S,_,r),u.push(z)),z}function A(_){if(--_.usedTimes===0){const S=u.indexOf(_);u[S]=u[u.length-1],u.pop(),_.destroy()}}function N(_){c.remove(_)}function K(){c.dispose()}return{getParameters:p,getProgramCacheKey:T,getUniforms:U,acquireProgram:C,releaseProgram:A,releaseShaderCache:N,programs:u,dispose:K}}function M_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function E_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function El(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,f,m,g,y,h){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:y,group:h},i[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=m,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=y,p.group=h),e++,p}function o(d,f,m,g,y,h){const p=a(d,f,m,g,y,h);m.transmission>0?n.push(p):m.transparent===!0?s.push(p):t.push(p)}function c(d,f,m,g,y,h){const p=a(d,f,m,g,y,h);m.transmission>0?n.unshift(p):m.transparent===!0?s.unshift(p):t.unshift(p)}function l(d,f){t.length>1&&t.sort(d||E_),n.length>1&&n.sort(f||El),s.length>1&&s.sort(f||El)}function u(){for(let d=e,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function w_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new wl,i.set(n,[a])):s>=r.length?(a=new wl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function T_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new He};break;case"SpotLight":t={position:new D,direction:new D,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function A_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let C_=0;function R_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function P_(i){const e=new T_,t=A_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const s=new D,r=new st,a=new st;function o(l){let u=0,d=0,f=0;for(let K=0;K<9;K++)n.probe[K].set(0,0,0);let m=0,g=0,y=0,h=0,p=0,T=0,b=0,E=0,U=0,C=0,A=0;l.sort(R_);for(let K=0,_=l.length;K<_;K++){const S=l[K],z=S.color,k=S.intensity,V=S.distance,Y=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)u+=z.r*k,d+=z.g*k,f+=z.b*k;else if(S.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(S.sh.coefficients[H],k);A++}else if(S.isDirectionalLight){const H=e.get(S);if(H.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const Q=S.shadow,G=t.get(S);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=Y,n.directionalShadowMatrix[m]=S.shadow.matrix,T++}n.directional[m]=H,m++}else if(S.isSpotLight){const H=e.get(S);H.position.setFromMatrixPosition(S.matrixWorld),H.color.copy(z).multiplyScalar(k),H.distance=V,H.coneCos=Math.cos(S.angle),H.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),H.decay=S.decay,n.spot[y]=H;const Q=S.shadow;if(S.map&&(n.spotLightMap[U]=S.map,U++,Q.updateMatrices(S),S.castShadow&&C++),n.spotLightMatrix[y]=Q.matrix,S.castShadow){const G=t.get(S);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.spotShadow[y]=G,n.spotShadowMap[y]=Y,E++}y++}else if(S.isRectAreaLight){const H=e.get(S);H.color.copy(z).multiplyScalar(k),H.halfWidth.set(S.width*.5,0,0),H.halfHeight.set(0,S.height*.5,0),n.rectArea[h]=H,h++}else if(S.isPointLight){const H=e.get(S);if(H.color.copy(S.color).multiplyScalar(S.intensity),H.distance=S.distance,H.decay=S.decay,S.castShadow){const Q=S.shadow,G=t.get(S);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=S.shadow.matrix,b++}n.point[g]=H,g++}else if(S.isHemisphereLight){const H=e.get(S);H.skyColor.copy(S.color).multiplyScalar(k),H.groundColor.copy(S.groundColor).multiplyScalar(k),n.hemi[p]=H,p++}}h>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ne.LTC_FLOAT_1,n.rectAreaLTC2=ne.LTC_FLOAT_2):(n.rectAreaLTC1=ne.LTC_HALF_1,n.rectAreaLTC2=ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const N=n.hash;(N.directionalLength!==m||N.pointLength!==g||N.spotLength!==y||N.rectAreaLength!==h||N.hemiLength!==p||N.numDirectionalShadows!==T||N.numPointShadows!==b||N.numSpotShadows!==E||N.numSpotMaps!==U||N.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=y,n.rectArea.length=h,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=E+U-C,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,N.directionalLength=m,N.pointLength=g,N.spotLength=y,N.rectAreaLength=h,N.hemiLength=p,N.numDirectionalShadows=T,N.numPointShadows=b,N.numSpotShadows=E,N.numSpotMaps=U,N.numLightProbes=A,n.version=C_++)}function c(l,u){let d=0,f=0,m=0,g=0,y=0;const h=u.matrixWorldInverse;for(let p=0,T=l.length;p<T;p++){const b=l[p];if(b.isDirectionalLight){const E=n.directional[d];E.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(h),d++}else if(b.isSpotLight){const E=n.spot[m];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(h),E.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(h),m++}else if(b.isRectAreaLight){const E=n.rectArea[g];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(h),a.identity(),r.copy(b.matrixWorld),r.premultiply(h),a.extractRotation(r),E.halfWidth.set(b.width*.5,0,0),E.halfHeight.set(0,b.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const E=n.point[f];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(h),f++}else if(b.isHemisphereLight){const E=n.hemi[y];E.direction.setFromMatrixPosition(b.matrixWorld),E.direction.transformDirection(h),y++}}}return{setup:o,setupView:c,state:n}}function Tl(i){const e=new P_(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function L_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Tl(i),e.set(s,[o])):r>=a.length?(o=new Tl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class I_ extends cs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class D_ extends cs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const U_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function O_(i,e,t){let n=new uc;const s=new Xe,r=new Xe,a=new rt,o=new I_({depthPacking:Ah}),c=new D_,l={},u=t.maxTextureSize,d={[qn]:Ft,[Ft]:qn,[Mn]:Mn},f=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:U_,fragmentShader:N_}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new Jt;g.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ct(g,f),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gu;let p=this.type;this.render=function(C,A,N){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||C.length===0)return;const K=i.getRenderTarget(),_=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Vn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const k=p!==Sn&&this.type===Sn,V=p===Sn&&this.type!==Sn;for(let Y=0,H=C.length;Y<H;Y++){const Q=C[Y],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ce=G.getFrameExtents();if(s.multiply(ce),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ce.x),s.x=r.x*ce.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ce.y),s.y=r.y*ce.y,G.mapSize.y=r.y)),G.map===null||k===!0||V===!0){const xe=this.type!==Sn?{minFilter:Ot,magFilter:Ot}:{};G.map!==null&&G.map.dispose(),G.map=new gi(s.x,s.y,xe),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const le=G.getViewportCount();for(let xe=0;xe<le;xe++){const We=G.getViewport(xe);a.set(r.x*We.x,r.y*We.y,r.x*We.z,r.y*We.w),z.viewport(a),G.updateMatrices(Q,xe),n=G.getFrustum(),E(A,N,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===Sn&&T(G,N),G.needsUpdate=!1}p=this.type,h.needsUpdate=!1,i.setRenderTarget(K,_,S)};function T(C,A){const N=e.update(y);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new gi(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,N,f,y,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,N,m,y,null)}function b(C,A,N,K){let _=null;const S=N.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(S!==void 0)_=S;else if(_=N.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const z=_.uuid,k=A.uuid;let V=l[z];V===void 0&&(V={},l[z]=V);let Y=V[k];Y===void 0&&(Y=_.clone(),V[k]=Y,A.addEventListener("dispose",U)),_=Y}if(_.visible=A.visible,_.wireframe=A.wireframe,K===Sn?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:d[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,N.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const z=i.properties.get(_);z.light=N}return _}function E(C,A,N,K,_){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&_===Sn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,C.matrixWorld);const k=e.update(C),V=C.material;if(Array.isArray(V)){const Y=k.groups;for(let H=0,Q=Y.length;H<Q;H++){const G=Y[H],ce=V[G.materialIndex];if(ce&&ce.visible){const le=b(C,ce,K,_);C.onBeforeShadow(i,C,A,N,k,le,G),i.renderBufferDirect(N,null,k,le,C,G),C.onAfterShadow(i,C,A,N,k,le,G)}}}else if(V.visible){const Y=b(C,V,K,_);C.onBeforeShadow(i,C,A,N,k,Y,null),i.renderBufferDirect(N,null,k,Y,C,null),C.onAfterShadow(i,C,A,N,k,Y,null)}}const z=C.children;for(let k=0,V=z.length;k<V;k++)E(z[k],A,N,K,_)}function U(C){C.target.removeEventListener("dispose",U);for(const N in l){const K=l[N],_=C.target.uuid;_ in K&&(K[_].dispose(),delete K[_])}}}const F_={[qa]:Ya,[Ka]:Qa,[Ja]:eo,[qi]:Za,[Ya]:qa,[Qa]:Ka,[eo]:Ja,[Za]:qi};function k_(i){function e(){let P=!1;const he=new rt;let $=null;const q=new rt(0,0,0,0);return{setMask:function(ae){$!==ae&&!P&&(i.colorMask(ae,ae,ae,ae),$=ae)},setLocked:function(ae){P=ae},setClear:function(ae,fe,Ke,ft,Pt){Pt===!0&&(ae*=ft,fe*=ft,Ke*=ft),he.set(ae,fe,Ke,ft),q.equals(he)===!1&&(i.clearColor(ae,fe,Ke,ft),q.copy(he))},reset:function(){P=!1,$=null,q.set(-1,0,0,0)}}}function t(){let P=!1,he=!1,$=null,q=null,ae=null;return{setReversed:function(fe){he=fe},setTest:function(fe){fe?me(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(fe){$!==fe&&!P&&(i.depthMask(fe),$=fe)},setFunc:function(fe){if(he&&(fe=F_[fe]),q!==fe){switch(fe){case qa:i.depthFunc(i.NEVER);break;case Ya:i.depthFunc(i.ALWAYS);break;case Ka:i.depthFunc(i.LESS);break;case qi:i.depthFunc(i.LEQUAL);break;case Ja:i.depthFunc(i.EQUAL);break;case Za:i.depthFunc(i.GEQUAL);break;case Qa:i.depthFunc(i.GREATER);break;case eo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=fe}},setLocked:function(fe){P=fe},setClear:function(fe){ae!==fe&&(i.clearDepth(fe),ae=fe)},reset:function(){P=!1,$=null,q=null,ae=null}}}function n(){let P=!1,he=null,$=null,q=null,ae=null,fe=null,Ke=null,ft=null,Pt=null;return{setTest:function(Qe){P||(Qe?me(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(Qe){he!==Qe&&!P&&(i.stencilMask(Qe),he=Qe)},setFunc:function(Qe,Lt,gn){($!==Qe||q!==Lt||ae!==gn)&&(i.stencilFunc(Qe,Lt,gn),$=Qe,q=Lt,ae=gn)},setOp:function(Qe,Lt,gn){(fe!==Qe||Ke!==Lt||ft!==gn)&&(i.stencilOp(Qe,Lt,gn),fe=Qe,Ke=Lt,ft=gn)},setLocked:function(Qe){P=Qe},setClear:function(Qe){Pt!==Qe&&(i.clearStencil(Qe),Pt=Qe)},reset:function(){P=!1,he=null,$=null,q=null,ae=null,fe=null,Ke=null,ft=null,Pt=null}}}const s=new e,r=new t,a=new n,o=new WeakMap,c=new WeakMap;let l={},u={},d=new WeakMap,f=[],m=null,g=!1,y=null,h=null,p=null,T=null,b=null,E=null,U=null,C=new He(0,0,0),A=0,N=!1,K=null,_=null,S=null,z=null,k=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,H=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Y=H>=1):Q.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Y=H>=2);let G=null,ce={};const le=i.getParameter(i.SCISSOR_BOX),xe=i.getParameter(i.VIEWPORT),We=new rt().fromArray(le),qe=new rt().fromArray(xe);function W(P,he,$,q){const ae=new Uint8Array(4),fe=i.createTexture();i.bindTexture(P,fe),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ke=0;Ke<$;Ke++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,q,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(he+Ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return fe}const Z={};Z[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),me(i.DEPTH_TEST),r.setFunc(qi),ie(!1),ge(Uc),me(i.CULL_FACE),w(Vn);function me(P){l[P]!==!0&&(i.enable(P),l[P]=!0)}function de(P){l[P]!==!1&&(i.disable(P),l[P]=!1)}function Le(P,he){return u[P]!==he?(i.bindFramebuffer(P,he),u[P]=he,P===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=he),P===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=he),!0):!1}function Ce(P,he){let $=f,q=!1;if(P){$=d.get(he),$===void 0&&($=[],d.set(he,$));const ae=P.textures;if($.length!==ae.length||$[0]!==i.COLOR_ATTACHMENT0){for(let fe=0,Ke=ae.length;fe<Ke;fe++)$[fe]=i.COLOR_ATTACHMENT0+fe;$.length=ae.length,q=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,q=!0);q&&i.drawBuffers($)}function Ve(P){return m!==P?(i.useProgram(P),m=P,!0):!1}const Ze={[li]:i.FUNC_ADD,[eh]:i.FUNC_SUBTRACT,[th]:i.FUNC_REVERSE_SUBTRACT};Ze[nh]=i.MIN,Ze[ih]=i.MAX;const Ge={[sh]:i.ZERO,[rh]:i.ONE,[ah]:i.SRC_COLOR,[ja]:i.SRC_ALPHA,[hh]:i.SRC_ALPHA_SATURATE,[uh]:i.DST_COLOR,[ch]:i.DST_ALPHA,[oh]:i.ONE_MINUS_SRC_COLOR,[Xa]:i.ONE_MINUS_SRC_ALPHA,[dh]:i.ONE_MINUS_DST_COLOR,[lh]:i.ONE_MINUS_DST_ALPHA,[fh]:i.CONSTANT_COLOR,[ph]:i.ONE_MINUS_CONSTANT_COLOR,[mh]:i.CONSTANT_ALPHA,[gh]:i.ONE_MINUS_CONSTANT_ALPHA};function w(P,he,$,q,ae,fe,Ke,ft,Pt,Qe){if(P===Vn){g===!0&&(de(i.BLEND),g=!1);return}if(g===!1&&(me(i.BLEND),g=!0),P!==Qd){if(P!==y||Qe!==N){if((h!==li||b!==li)&&(i.blendEquation(i.FUNC_ADD),h=li,b=li),Qe)switch(P){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Nc:i.blendFunc(i.ONE,i.ONE);break;case Oc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Nc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Oc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}p=null,T=null,E=null,U=null,C.set(0,0,0),A=0,y=P,N=Qe}return}ae=ae||he,fe=fe||$,Ke=Ke||q,(he!==h||ae!==b)&&(i.blendEquationSeparate(Ze[he],Ze[ae]),h=he,b=ae),($!==p||q!==T||fe!==E||Ke!==U)&&(i.blendFuncSeparate(Ge[$],Ge[q],Ge[fe],Ge[Ke]),p=$,T=q,E=fe,U=Ke),(ft.equals(C)===!1||Pt!==A)&&(i.blendColor(ft.r,ft.g,ft.b,Pt),C.copy(ft),A=Pt),y=P,N=!1}function Se(P,he){P.side===Mn?de(i.CULL_FACE):me(i.CULL_FACE);let $=P.side===Ft;he&&($=!$),ie($),P.blending===Gi&&P.transparent===!1?w(Vn):w(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),r.setFunc(P.depthFunc),r.setTest(P.depthTest),r.setMask(P.depthWrite),s.setMask(P.colorWrite);const q=P.stencilWrite;a.setTest(q),q&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ze(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?me(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function ie(P){K!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),K=P)}function ge(P){P!==Jd?(me(i.CULL_FACE),P!==_&&(P===Uc?i.cullFace(i.BACK):P===Zd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),_=P}function ue(P){P!==S&&(Y&&i.lineWidth(P),S=P)}function ze(P,he,$){P?(me(i.POLYGON_OFFSET_FILL),(z!==he||k!==$)&&(i.polygonOffset(he,$),z=he,k=$)):de(i.POLYGON_OFFSET_FILL)}function se(P){P?me(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function M(P){P===void 0&&(P=i.TEXTURE0+V-1),G!==P&&(i.activeTexture(P),G=P)}function v(P,he,$){$===void 0&&(G===null?$=i.TEXTURE0+V-1:$=G);let q=ce[$];q===void 0&&(q={type:void 0,texture:void 0},ce[$]=q),(q.type!==P||q.texture!==he)&&(G!==$&&(i.activeTexture($),G=$),i.bindTexture(P,he||Z[P]),q.type=P,q.texture=he)}function O(){const P=ce[G];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function X(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ye(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function re(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Je(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ee(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function _e(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function De(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ue(P){We.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),We.copy(P))}function ve(P){qe.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),qe.copy(P))}function Ye(P,he){let $=c.get(he);$===void 0&&($=new WeakMap,c.set(he,$));let q=$.get(P);q===void 0&&(q=i.getUniformBlockIndex(he,P.name),$.set(P,q))}function Oe(P,he){const q=c.get(he).get(P);o.get(he)!==q&&(i.uniformBlockBinding(he,q,P.__bindingPointIndex),o.set(he,q))}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},G=null,ce={},u={},d=new WeakMap,f=[],m=null,g=!1,y=null,h=null,p=null,T=null,b=null,E=null,U=null,C=new He(0,0,0),A=0,N=!1,K=null,_=null,S=null,z=null,k=null,We.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:me,disable:de,bindFramebuffer:Le,drawBuffers:Ce,useProgram:Ve,setBlending:w,setMaterial:Se,setFlipSided:ie,setCullFace:ge,setLineWidth:ue,setPolygonOffset:ze,setScissorTest:se,activeTexture:M,bindTexture:v,unbindTexture:O,compressedTexImage2D:X,compressedTexImage3D:J,texImage2D:_e,texImage3D:De,updateUBOMapping:Ye,uniformBlockBinding:Oe,texStorage2D:Je,texStorage3D:ee,texSubImage2D:j,texSubImage3D:ye,compressedTexSubImage2D:re,compressedTexSubImage3D:pe,scissor:Ue,viewport:ve,reset:at}}function Al(i,e,t,n){const s=B_(n);switch(t){case Eu:return i*e;case Tu:return i*e;case Au:return i*e*2;case nc:return i*e/s.components*s.byteLength;case ic:return i*e/s.components*s.byteLength;case Cu:return i*e*2/s.components*s.byteLength;case sc:return i*e*2/s.components*s.byteLength;case wu:return i*e*3/s.components*s.byteLength;case cn:return i*e*4/s.components*s.byteLength;case rc:return i*e*4/s.components*s.byteLength;case br:case Sr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Mr:case Er:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ao:case co:return Math.max(i,16)*Math.max(e,8)/4;case ro:case oo:return Math.max(i,8)*Math.max(e,8)/2;case lo:case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case po:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case mo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case _o:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case vo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case xo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case So:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case wo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case To:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case wr:case Ao:case Co:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ru:case Ro:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Po:case Lo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function B_(i){switch(i){case Tn:case bu:return{byteLength:1,components:1};case Is:case Su:case Ns:return{byteLength:2,components:1};case ec:case tc:return{byteLength:2,components:4};case mi:case Qo:case dn:return{byteLength:4,components:1};case Mu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function z_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xe,u=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,v){return m?new OffscreenCanvas(M,v):Dr("canvas")}function y(M,v,O){let X=1;const J=se(M);if((J.width>O||J.height>O)&&(X=O/Math.max(J.width,J.height)),X<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const j=Math.floor(X*J.width),ye=Math.floor(X*J.height);d===void 0&&(d=g(j,ye));const re=v?g(j,ye):d;return re.width=j,re.height=ye,re.getContext("2d").drawImage(M,0,0,j,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+j+"x"+ye+")."),re}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),M;return M}function h(M){return M.generateMipmaps&&M.minFilter!==Ot&&M.minFilter!==an}function p(M){i.generateMipmap(M)}function T(M,v,O,X,J=!1){if(M!==null){if(i[M]!==void 0)return i[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let j=v;if(v===i.RED&&(O===i.FLOAT&&(j=i.R32F),O===i.HALF_FLOAT&&(j=i.R16F),O===i.UNSIGNED_BYTE&&(j=i.R8)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.R8UI),O===i.UNSIGNED_SHORT&&(j=i.R16UI),O===i.UNSIGNED_INT&&(j=i.R32UI),O===i.BYTE&&(j=i.R8I),O===i.SHORT&&(j=i.R16I),O===i.INT&&(j=i.R32I)),v===i.RG&&(O===i.FLOAT&&(j=i.RG32F),O===i.HALF_FLOAT&&(j=i.RG16F),O===i.UNSIGNED_BYTE&&(j=i.RG8)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RG8UI),O===i.UNSIGNED_SHORT&&(j=i.RG16UI),O===i.UNSIGNED_INT&&(j=i.RG32UI),O===i.BYTE&&(j=i.RG8I),O===i.SHORT&&(j=i.RG16I),O===i.INT&&(j=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RGB8UI),O===i.UNSIGNED_SHORT&&(j=i.RGB16UI),O===i.UNSIGNED_INT&&(j=i.RGB32UI),O===i.BYTE&&(j=i.RGB8I),O===i.SHORT&&(j=i.RGB16I),O===i.INT&&(j=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),O===i.UNSIGNED_INT&&(j=i.RGBA32UI),O===i.BYTE&&(j=i.RGBA8I),O===i.SHORT&&(j=i.RGBA16I),O===i.INT&&(j=i.RGBA32I)),v===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),v===i.RGBA){const ye=J?Rr:nt.getTransfer(X);O===i.FLOAT&&(j=i.RGBA32F),O===i.HALF_FLOAT&&(j=i.RGBA16F),O===i.UNSIGNED_BYTE&&(j=ye===lt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function b(M,v){let O;return M?v===null||v===mi||v===Ji?O=i.DEPTH24_STENCIL8:v===dn?O=i.DEPTH32F_STENCIL8:v===Is&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===mi||v===Ji?O=i.DEPTH_COMPONENT24:v===dn?O=i.DEPTH_COMPONENT32F:v===Is&&(O=i.DEPTH_COMPONENT16),O}function E(M,v){return h(M)===!0||M.isFramebufferTexture&&M.minFilter!==Ot&&M.minFilter!==an?Math.log2(Math.max(v.width,v.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?v.mipmaps.length:1}function U(M){const v=M.target;v.removeEventListener("dispose",U),A(v),v.isVideoTexture&&u.delete(v)}function C(M){const v=M.target;v.removeEventListener("dispose",C),K(v)}function A(M){const v=n.get(M);if(v.__webglInit===void 0)return;const O=M.source,X=f.get(O);if(X){const J=X[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&N(M),Object.keys(X).length===0&&f.delete(O)}n.remove(M)}function N(M){const v=n.get(M);i.deleteTexture(v.__webglTexture);const O=M.source,X=f.get(O);delete X[v.__cacheKey],a.memory.textures--}function K(M){const v=n.get(M);if(M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(v.__webglFramebuffer[X]))for(let J=0;J<v.__webglFramebuffer[X].length;J++)i.deleteFramebuffer(v.__webglFramebuffer[X][J]);else i.deleteFramebuffer(v.__webglFramebuffer[X]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[X])}else{if(Array.isArray(v.__webglFramebuffer))for(let X=0;X<v.__webglFramebuffer.length;X++)i.deleteFramebuffer(v.__webglFramebuffer[X]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let X=0;X<v.__webglColorRenderbuffer.length;X++)v.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[X]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=M.textures;for(let X=0,J=O.length;X<J;X++){const j=n.get(O[X]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(O[X])}n.remove(M)}let _=0;function S(){_=0}function z(){const M=_;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),_+=1,M}function k(M){const v=[];return v.push(M.wrapS),v.push(M.wrapT),v.push(M.wrapR||0),v.push(M.magFilter),v.push(M.minFilter),v.push(M.anisotropy),v.push(M.internalFormat),v.push(M.format),v.push(M.type),v.push(M.generateMipmaps),v.push(M.premultiplyAlpha),v.push(M.flipY),v.push(M.unpackAlignment),v.push(M.colorSpace),v.join()}function V(M,v){const O=n.get(M);if(M.isVideoTexture&&ue(M),M.isRenderTargetTexture===!1&&M.version>0&&O.__version!==M.version){const X=M.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{qe(O,M,v);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function Y(M,v){const O=n.get(M);if(M.version>0&&O.__version!==M.version){qe(O,M,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function H(M,v){const O=n.get(M);if(M.version>0&&O.__version!==M.version){qe(O,M,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function Q(M,v){const O=n.get(M);if(M.version>0&&O.__version!==M.version){W(O,M,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const G={[io]:i.REPEAT,[hi]:i.CLAMP_TO_EDGE,[so]:i.MIRRORED_REPEAT},ce={[Ot]:i.NEAREST,[wh]:i.NEAREST_MIPMAP_NEAREST,[Ws]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[ra]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},le={[Rh]:i.NEVER,[Nh]:i.ALWAYS,[Ph]:i.LESS,[Lu]:i.LEQUAL,[Lh]:i.EQUAL,[Uh]:i.GEQUAL,[Ih]:i.GREATER,[Dh]:i.NOTEQUAL};function xe(M,v){if(v.type===dn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===an||v.magFilter===ra||v.magFilter===Ws||v.magFilter===fi||v.minFilter===an||v.minFilter===ra||v.minFilter===Ws||v.minFilter===fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,G[v.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,G[v.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,G[v.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,ce[v.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,ce[v.minFilter]),v.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,le[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ot||v.minFilter!==Ws&&v.minFilter!==fi||v.type===dn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(M,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function We(M,v){let O=!1;M.__webglInit===void 0&&(M.__webglInit=!0,v.addEventListener("dispose",U));const X=v.source;let J=f.get(X);J===void 0&&(J={},f.set(X,J));const j=k(v);if(j!==M.__cacheKey){J[j]===void 0&&(J[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),J[j].usedTimes++;const ye=J[M.__cacheKey];ye!==void 0&&(J[M.__cacheKey].usedTimes--,ye.usedTimes===0&&N(v)),M.__cacheKey=j,M.__webglTexture=J[j].texture}return O}function qe(M,v,O){let X=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(X=i.TEXTURE_3D);const J=We(M,v),j=v.source;t.bindTexture(X,M.__webglTexture,i.TEXTURE0+O);const ye=n.get(j);if(j.version!==ye.__version||J===!0){t.activeTexture(i.TEXTURE0+O);const re=nt.getPrimaries(nt.workingColorSpace),pe=v.colorSpace===zn?null:nt.getPrimaries(v.colorSpace),Je=v.colorSpace===zn||re===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let ee=y(v.image,!1,s.maxTextureSize);ee=ze(v,ee);const _e=r.convert(v.format,v.colorSpace),De=r.convert(v.type);let Ue=T(v.internalFormat,_e,De,v.colorSpace,v.isVideoTexture);xe(X,v);let ve;const Ye=v.mipmaps,Oe=v.isVideoTexture!==!0,at=ye.__version===void 0||J===!0,P=j.dataReady,he=E(v,ee);if(v.isDepthTexture)Ue=b(v.format===Zi,v.type),at&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,Ue,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Ue,ee.width,ee.height,0,_e,De,null));else if(v.isDataTexture)if(Ye.length>0){Oe&&at&&t.texStorage2D(i.TEXTURE_2D,he,Ue,Ye[0].width,Ye[0].height);for(let $=0,q=Ye.length;$<q;$++)ve=Ye[$],Oe?P&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ve.width,ve.height,_e,De,ve.data):t.texImage2D(i.TEXTURE_2D,$,Ue,ve.width,ve.height,0,_e,De,ve.data);v.generateMipmaps=!1}else Oe?(at&&t.texStorage2D(i.TEXTURE_2D,he,Ue,ee.width,ee.height),P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee.width,ee.height,_e,De,ee.data)):t.texImage2D(i.TEXTURE_2D,0,Ue,ee.width,ee.height,0,_e,De,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Oe&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,Ue,Ye[0].width,Ye[0].height,ee.depth);for(let $=0,q=Ye.length;$<q;$++)if(ve=Ye[$],v.format!==cn)if(_e!==null)if(Oe){if(P)if(v.layerUpdates.size>0){const ae=Al(ve.width,ve.height,v.format,v.type);for(const fe of v.layerUpdates){const Ke=ve.data.subarray(fe*ae/ve.data.BYTES_PER_ELEMENT,(fe+1)*ae/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,fe,ve.width,ve.height,1,_e,Ke,0,0)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ve.width,ve.height,ee.depth,_e,ve.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Ue,ve.width,ve.height,ee.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?P&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ve.width,ve.height,ee.depth,_e,De,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,Ue,ve.width,ve.height,ee.depth,0,_e,De,ve.data)}else{Oe&&at&&t.texStorage2D(i.TEXTURE_2D,he,Ue,Ye[0].width,Ye[0].height);for(let $=0,q=Ye.length;$<q;$++)ve=Ye[$],v.format!==cn?_e!==null?Oe?P&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ve.width,ve.height,_e,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,$,Ue,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?P&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ve.width,ve.height,_e,De,ve.data):t.texImage2D(i.TEXTURE_2D,$,Ue,ve.width,ve.height,0,_e,De,ve.data)}else if(v.isDataArrayTexture)if(Oe){if(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,Ue,ee.width,ee.height,ee.depth),P)if(v.layerUpdates.size>0){const $=Al(ee.width,ee.height,v.format,v.type);for(const q of v.layerUpdates){const ae=ee.data.subarray(q*$/ee.data.BYTES_PER_ELEMENT,(q+1)*$/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,q,ee.width,ee.height,1,_e,De,ae)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,_e,De,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ue,ee.width,ee.height,ee.depth,0,_e,De,ee.data);else if(v.isData3DTexture)Oe?(at&&t.texStorage3D(i.TEXTURE_3D,he,Ue,ee.width,ee.height,ee.depth),P&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,_e,De,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Ue,ee.width,ee.height,ee.depth,0,_e,De,ee.data);else if(v.isFramebufferTexture){if(at)if(Oe)t.texStorage2D(i.TEXTURE_2D,he,Ue,ee.width,ee.height);else{let $=ee.width,q=ee.height;for(let ae=0;ae<he;ae++)t.texImage2D(i.TEXTURE_2D,ae,Ue,$,q,0,_e,De,null),$>>=1,q>>=1}}else if(Ye.length>0){if(Oe&&at){const $=se(Ye[0]);t.texStorage2D(i.TEXTURE_2D,he,Ue,$.width,$.height)}for(let $=0,q=Ye.length;$<q;$++)ve=Ye[$],Oe?P&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,_e,De,ve):t.texImage2D(i.TEXTURE_2D,$,Ue,_e,De,ve);v.generateMipmaps=!1}else if(Oe){if(at){const $=se(ee);t.texStorage2D(i.TEXTURE_2D,he,Ue,$.width,$.height)}P&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,De,ee)}else t.texImage2D(i.TEXTURE_2D,0,Ue,_e,De,ee);h(v)&&p(X),ye.__version=j.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function W(M,v,O){if(v.image.length!==6)return;const X=We(M,v),J=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+O);const j=n.get(J);if(J.version!==j.__version||X===!0){t.activeTexture(i.TEXTURE0+O);const ye=nt.getPrimaries(nt.workingColorSpace),re=v.colorSpace===zn?null:nt.getPrimaries(v.colorSpace),pe=v.colorSpace===zn||ye===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Je=v.isCompressedTexture||v.image[0].isCompressedTexture,ee=v.image[0]&&v.image[0].isDataTexture,_e=[];for(let q=0;q<6;q++)!Je&&!ee?_e[q]=y(v.image[q],!0,s.maxCubemapSize):_e[q]=ee?v.image[q].image:v.image[q],_e[q]=ze(v,_e[q]);const De=_e[0],Ue=r.convert(v.format,v.colorSpace),ve=r.convert(v.type),Ye=T(v.internalFormat,Ue,ve,v.colorSpace),Oe=v.isVideoTexture!==!0,at=j.__version===void 0||X===!0,P=J.dataReady;let he=E(v,De);xe(i.TEXTURE_CUBE_MAP,v);let $;if(Je){Oe&&at&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Ye,De.width,De.height);for(let q=0;q<6;q++){$=_e[q].mipmaps;for(let ae=0;ae<$.length;ae++){const fe=$[ae];v.format!==cn?Ue!==null?Oe?P&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae,0,0,fe.width,fe.height,Ue,fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae,Ye,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae,0,0,fe.width,fe.height,Ue,ve,fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae,Ye,fe.width,fe.height,0,Ue,ve,fe.data)}}}else{if($=v.mipmaps,Oe&&at){$.length>0&&he++;const q=se(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,Ye,q.width,q.height)}for(let q=0;q<6;q++)if(ee){Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,_e[q].width,_e[q].height,Ue,ve,_e[q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ye,_e[q].width,_e[q].height,0,Ue,ve,_e[q].data);for(let ae=0;ae<$.length;ae++){const Ke=$[ae].image[q].image;Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae+1,0,0,Ke.width,Ke.height,Ue,ve,Ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae+1,Ye,Ke.width,Ke.height,0,Ue,ve,Ke.data)}}else{Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Ue,ve,_e[q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ye,Ue,ve,_e[q]);for(let ae=0;ae<$.length;ae++){const fe=$[ae];Oe?P&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae+1,0,0,Ue,ve,fe.image[q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae+1,Ye,Ue,ve,fe.image[q])}}}h(v)&&p(i.TEXTURE_CUBE_MAP),j.__version=J.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function Z(M,v,O,X,J,j){const ye=r.convert(O.format,O.colorSpace),re=r.convert(O.type),pe=T(O.internalFormat,ye,re,O.colorSpace);if(!n.get(v).__hasExternalTextures){const ee=Math.max(1,v.width>>j),_e=Math.max(1,v.height>>j);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,j,pe,ee,_e,v.depth,0,ye,re,null):t.texImage2D(J,j,pe,ee,_e,0,ye,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,J,n.get(O).__webglTexture,0,ie(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,J,n.get(O).__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function me(M,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,M),v.depthBuffer){const X=v.depthTexture,J=X&&X.isDepthTexture?X.type:null,j=b(v.stencilBuffer,J),ye=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=ie(v);ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,j,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,j,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,j,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,M)}else{const X=v.textures;for(let J=0;J<X.length;J++){const j=X[J],ye=r.convert(j.format,j.colorSpace),re=r.convert(j.type),pe=T(j.internalFormat,ye,re,j.colorSpace),Je=ie(v);O&&ge(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Je,pe,v.width,v.height):ge(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Je,pe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,pe,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function de(M,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V(v.depthTexture,0);const X=n.get(v.depthTexture).__webglTexture,J=ie(v);if(v.depthTexture.format===$i)ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0);else if(v.depthTexture.format===Zi)ge(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function Le(M){const v=n.get(M),O=M.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==M.depthTexture){const X=M.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),X){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,X.removeEventListener("dispose",J)};X.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=X}if(M.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");de(v.__webglFramebuffer,M)}else if(O){v.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[X]),v.__webglDepthbuffer[X]===void 0)v.__webglDepthbuffer[X]=i.createRenderbuffer(),me(v.__webglDepthbuffer[X],M,!1);else{const J=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,j)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),me(v.__webglDepthbuffer,M,!1);else{const X=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,J)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ce(M,v,O){const X=n.get(M);v!==void 0&&Z(X.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Le(M)}function Ve(M){const v=M.texture,O=n.get(M),X=n.get(v);M.addEventListener("dispose",C);const J=M.textures,j=M.isWebGLCubeRenderTarget===!0,ye=J.length>1;if(ye||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=v.version,a.memory.textures++),j){O.__webglFramebuffer=[];for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[re]=[];for(let pe=0;pe<v.mipmaps.length;pe++)O.__webglFramebuffer[re][pe]=i.createFramebuffer()}else O.__webglFramebuffer[re]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let re=0;re<v.mipmaps.length;re++)O.__webglFramebuffer[re]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ye)for(let re=0,pe=J.length;re<pe;re++){const Je=n.get(J[re]);Je.__webglTexture===void 0&&(Je.__webglTexture=i.createTexture(),a.memory.textures++)}if(M.samples>0&&ge(M)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const pe=J[re];O.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[re]);const Je=r.convert(pe.format,pe.colorSpace),ee=r.convert(pe.type),_e=T(pe.internalFormat,Je,ee,pe.colorSpace,M.isXRRenderTarget===!0),De=ie(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,De,_e,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,O.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),me(O.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),xe(i.TEXTURE_CUBE_MAP,v);for(let re=0;re<6;re++)if(v.mipmaps&&v.mipmaps.length>0)for(let pe=0;pe<v.mipmaps.length;pe++)Z(O.__webglFramebuffer[re][pe],M,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,pe);else Z(O.__webglFramebuffer[re],M,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);h(v)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let re=0,pe=J.length;re<pe;re++){const Je=J[re],ee=n.get(Je);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture),xe(i.TEXTURE_2D,Je),Z(O.__webglFramebuffer,M,Je,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,0),h(Je)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(re=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,X.__webglTexture),xe(re,v),v.mipmaps&&v.mipmaps.length>0)for(let pe=0;pe<v.mipmaps.length;pe++)Z(O.__webglFramebuffer[pe],M,v,i.COLOR_ATTACHMENT0,re,pe);else Z(O.__webglFramebuffer,M,v,i.COLOR_ATTACHMENT0,re,0);h(v)&&p(re),t.unbindTexture()}M.depthBuffer&&Le(M)}function Ze(M){const v=M.textures;for(let O=0,X=v.length;O<X;O++){const J=v[O];if(h(J)){const j=M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ye=n.get(J).__webglTexture;t.bindTexture(j,ye),p(j),t.unbindTexture()}}}const Ge=[],w=[];function Se(M){if(M.samples>0){if(ge(M)===!1){const v=M.textures,O=M.width,X=M.height;let J=i.COLOR_BUFFER_BIT;const j=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(M),re=v.length>1;if(re)for(let pe=0;pe<v.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let pe=0;pe<v.length;pe++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[pe]);const Je=n.get(v[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Je,0)}i.blitFramebuffer(0,0,O,X,0,0,O,X,J,i.NEAREST),c===!0&&(Ge.length=0,w.length=0,Ge.push(i.COLOR_ATTACHMENT0+pe),M.depthBuffer&&M.resolveDepthBuffer===!1&&(Ge.push(j),w.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,w)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ge))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let pe=0;pe<v.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,ye.__webglColorRenderbuffer[pe]);const Je=n.get(v[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,Je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&c){const v=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ie(M){return Math.min(s.maxSamples,M.samples)}function ge(M){const v=n.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ue(M){const v=a.render.frame;u.get(M)!==v&&(u.set(M,v),M.update())}function ze(M,v){const O=M.colorSpace,X=M.format,J=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||O!==Kn&&O!==zn&&(nt.getTransfer(O)===lt?(X!==cn||J!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function se(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(l.width=M.naturalWidth||M.width,l.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(l.width=M.displayWidth,l.height=M.displayHeight):(l.width=M.width,l.height=M.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=S,this.setTexture2D=V,this.setTexture2DArray=Y,this.setTexture3D=H,this.setTextureCube=Q,this.rebindTextures=Ce,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=ge}function H_(i,e){function t(n,s=zn){let r;const a=nt.getTransfer(s);if(n===Tn)return i.UNSIGNED_BYTE;if(n===ec)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bu)return i.BYTE;if(n===Su)return i.SHORT;if(n===Is)return i.UNSIGNED_SHORT;if(n===Qo)return i.INT;if(n===mi)return i.UNSIGNED_INT;if(n===dn)return i.FLOAT;if(n===Ns)return i.HALF_FLOAT;if(n===Eu)return i.ALPHA;if(n===wu)return i.RGB;if(n===cn)return i.RGBA;if(n===Tu)return i.LUMINANCE;if(n===Au)return i.LUMINANCE_ALPHA;if(n===$i)return i.DEPTH_COMPONENT;if(n===Zi)return i.DEPTH_STENCIL;if(n===nc)return i.RED;if(n===ic)return i.RED_INTEGER;if(n===Cu)return i.RG;if(n===sc)return i.RG_INTEGER;if(n===rc)return i.RGBA_INTEGER;if(n===br||n===Sr||n===Mr||n===Er)if(a===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===br)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===br)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ro||n===ao||n===oo||n===co)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ro)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ao)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===co)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lo||n===uo||n===ho)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lo||n===uo)return a===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ho)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===yo||n===xo||n===bo||n===So||n===Mo||n===Eo||n===wo||n===To)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===fo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===po)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===mo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===go)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_o)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===So)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Eo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wo)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===To)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wr||n===Ao||n===Co)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===wr)return a===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ao)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Co)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ru||n===Ro||n===Po||n===Lo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===wr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ro)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Po)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class V_ extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ts extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const G_={type:"move"};class Na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ts,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ts,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ts,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const y of e.hand.values()){const h=t.getJointPose(y,n),p=this._getHandJoint(l,y);h!==null&&(p.matrix.fromArray(h.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=h.radius),p.visible=h!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(G_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ts;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const $_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,W_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class j_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Rt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Yn({vertexShader:$_,fragmentShader:W_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new Wr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class X_ extends rs{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,f=null,m=null,g=null;const y=new j_,h=t.getContextAttributes();let p=null,T=null;const b=[],E=[],U=new Xe;let C=null;const A=new Gt;A.layers.enable(1),A.viewport=new rt;const N=new Gt;N.layers.enable(2),N.viewport=new rt;const K=[A,N],_=new V_;_.layers.enable(1),_.layers.enable(2);let S=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Z=b[W];return Z===void 0&&(Z=new Na,b[W]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(W){let Z=b[W];return Z===void 0&&(Z=new Na,b[W]=Z),Z.getGripSpace()},this.getHand=function(W){let Z=b[W];return Z===void 0&&(Z=new Na,b[W]=Z),Z.getHandSpace()};function k(W){const Z=E.indexOf(W.inputSource);if(Z===-1)return;const me=b[Z];me!==void 0&&(me.update(W.inputSource,W.frame,l||a),me.dispatchEvent({type:W.type,data:W.inputSource}))}function V(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",Y);for(let W=0;W<b.length;W++){const Z=E[W];Z!==null&&(E[W]=null,b[W].disconnect(Z))}S=null,z=null,y.reset(),e.setRenderTarget(p),m=null,f=null,d=null,s=null,T=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",V),s.addEventListener("inputsourceschange",Y),h.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(U),s.renderState.layers===void 0){const Z={antialias:h.antialias,alpha:!0,depth:h.depth,stencil:h.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Z),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new gi(m.framebufferWidth,m.framebufferHeight,{format:cn,type:Tn,colorSpace:e.outputColorSpace,stencilBuffer:h.stencil})}else{let Z=null,me=null,de=null;h.depth&&(de=h.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=h.stencil?Zi:$i,me=h.stencil?Ji:mi);const Le={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(Le),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new gi(f.textureWidth,f.textureHeight,{format:cn,type:Tn,depthTexture:new Gu(f.textureWidth,f.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:h.stencil,colorSpace:e.outputColorSpace,samples:h.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function Y(W){for(let Z=0;Z<W.removed.length;Z++){const me=W.removed[Z],de=E.indexOf(me);de>=0&&(E[de]=null,b[de].disconnect(me))}for(let Z=0;Z<W.added.length;Z++){const me=W.added[Z];let de=E.indexOf(me);if(de===-1){for(let Ce=0;Ce<b.length;Ce++)if(Ce>=E.length){E.push(me),de=Ce;break}else if(E[Ce]===null){E[Ce]=me,de=Ce;break}if(de===-1)break}const Le=b[de];Le&&Le.connect(me)}}const H=new D,Q=new D;function G(W,Z,me){H.setFromMatrixPosition(Z.matrixWorld),Q.setFromMatrixPosition(me.matrixWorld);const de=H.distanceTo(Q),Le=Z.projectionMatrix.elements,Ce=me.projectionMatrix.elements,Ve=Le[14]/(Le[10]-1),Ze=Le[14]/(Le[10]+1),Ge=(Le[9]+1)/Le[5],w=(Le[9]-1)/Le[5],Se=(Le[8]-1)/Le[0],ie=(Ce[8]+1)/Ce[0],ge=Ve*Se,ue=Ve*ie,ze=de/(-Se+ie),se=ze*-Se;if(Z.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(se),W.translateZ(ze),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Le[10]===-1)W.projectionMatrix.copy(Z.projectionMatrix),W.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const M=Ve+ze,v=Ze+ze,O=ge-se,X=ue+(de-se),J=Ge*Ze/v*M,j=w*Ze/v*M;W.projectionMatrix.makePerspective(O,X,J,j,M,v),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ce(W,Z){Z===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Z.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let Z=W.near,me=W.far;y.texture!==null&&(y.depthNear>0&&(Z=y.depthNear),y.depthFar>0&&(me=y.depthFar)),_.near=N.near=A.near=Z,_.far=N.far=A.far=me,(S!==_.near||z!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),S=_.near,z=_.far);const de=W.parent,Le=_.cameras;ce(_,de);for(let Ce=0;Ce<Le.length;Ce++)ce(Le[Ce],de);Le.length===2?G(_,A,N):_.projectionMatrix.copy(A.projectionMatrix),le(W,_,de)};function le(W,Z,me){me===null?W.matrix.copy(Z.matrixWorld):(W.matrix.copy(me.matrixWorld),W.matrix.invert(),W.matrix.multiply(Z.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Z.projectionMatrix),W.projectionMatrixInverse.copy(Z.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Io*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(W){c=W,f!==null&&(f.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(_)};let xe=null;function We(W,Z){if(u=Z.getViewerPose(l||a),g=Z,u!==null){const me=u.views;m!==null&&(e.setRenderTargetFramebuffer(T,m.framebuffer),e.setRenderTarget(T));let de=!1;me.length!==_.cameras.length&&(_.cameras.length=0,de=!0);for(let Ce=0;Ce<me.length;Ce++){const Ve=me[Ce];let Ze=null;if(m!==null)Ze=m.getViewport(Ve);else{const w=d.getViewSubImage(f,Ve);Ze=w.viewport,Ce===0&&(e.setRenderTargetTextures(T,w.colorTexture,f.ignoreDepthValues?void 0:w.depthStencilTexture),e.setRenderTarget(T))}let Ge=K[Ce];Ge===void 0&&(Ge=new Gt,Ge.layers.enable(Ce),Ge.viewport=new rt,K[Ce]=Ge),Ge.matrix.fromArray(Ve.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(Ve.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Ce===0&&(_.matrix.copy(Ge.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),de===!0&&_.cameras.push(Ge)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const Ce=d.getDepthInformation(me[0]);Ce&&Ce.isValid&&Ce.texture&&y.init(e,Ce,s.renderState)}}for(let me=0;me<b.length;me++){const de=E[me],Le=b[me];de!==null&&Le!==void 0&&Le.update(de,Z,l||a)}xe&&xe(W,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const qe=new Hu;qe.setAnimationLoop(We),this.setAnimationLoop=function(W){xe=W},this.dispose=function(){}}}const si=new pn,q_=new st;function Y_(i,e){function t(h,p){h.matrixAutoUpdate===!0&&h.updateMatrix(),p.value.copy(h.matrix)}function n(h,p){p.color.getRGB(h.fogColor.value,ku(i)),p.isFog?(h.fogNear.value=p.near,h.fogFar.value=p.far):p.isFogExp2&&(h.fogDensity.value=p.density)}function s(h,p,T,b,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(h,p):p.isMeshToonMaterial?(r(h,p),d(h,p)):p.isMeshPhongMaterial?(r(h,p),u(h,p)):p.isMeshStandardMaterial?(r(h,p),f(h,p),p.isMeshPhysicalMaterial&&m(h,p,E)):p.isMeshMatcapMaterial?(r(h,p),g(h,p)):p.isMeshDepthMaterial?r(h,p):p.isMeshDistanceMaterial?(r(h,p),y(h,p)):p.isMeshNormalMaterial?r(h,p):p.isLineBasicMaterial?(a(h,p),p.isLineDashedMaterial&&o(h,p)):p.isPointsMaterial?c(h,p,T,b):p.isSpriteMaterial?l(h,p):p.isShadowMaterial?(h.color.value.copy(p.color),h.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(h,p){h.opacity.value=p.opacity,p.color&&h.diffuse.value.copy(p.color),p.emissive&&h.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.bumpMap&&(h.bumpMap.value=p.bumpMap,t(p.bumpMap,h.bumpMapTransform),h.bumpScale.value=p.bumpScale,p.side===Ft&&(h.bumpScale.value*=-1)),p.normalMap&&(h.normalMap.value=p.normalMap,t(p.normalMap,h.normalMapTransform),h.normalScale.value.copy(p.normalScale),p.side===Ft&&h.normalScale.value.negate()),p.displacementMap&&(h.displacementMap.value=p.displacementMap,t(p.displacementMap,h.displacementMapTransform),h.displacementScale.value=p.displacementScale,h.displacementBias.value=p.displacementBias),p.emissiveMap&&(h.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,h.emissiveMapTransform)),p.specularMap&&(h.specularMap.value=p.specularMap,t(p.specularMap,h.specularMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest);const T=e.get(p),b=T.envMap,E=T.envMapRotation;b&&(h.envMap.value=b,si.copy(E),si.x*=-1,si.y*=-1,si.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),h.envMapRotation.value.setFromMatrix4(q_.makeRotationFromEuler(si)),h.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.reflectivity.value=p.reflectivity,h.ior.value=p.ior,h.refractionRatio.value=p.refractionRatio),p.lightMap&&(h.lightMap.value=p.lightMap,h.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,h.lightMapTransform)),p.aoMap&&(h.aoMap.value=p.aoMap,h.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,h.aoMapTransform))}function a(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform))}function o(h,p){h.dashSize.value=p.dashSize,h.totalSize.value=p.dashSize+p.gapSize,h.scale.value=p.scale}function c(h,p,T,b){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.size.value=p.size*T,h.scale.value=b*.5,p.map&&(h.map.value=p.map,t(p.map,h.uvTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function l(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.rotation.value=p.rotation,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function u(h,p){h.specular.value.copy(p.specular),h.shininess.value=Math.max(p.shininess,1e-4)}function d(h,p){p.gradientMap&&(h.gradientMap.value=p.gradientMap)}function f(h,p){h.metalness.value=p.metalness,p.metalnessMap&&(h.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,h.metalnessMapTransform)),h.roughness.value=p.roughness,p.roughnessMap&&(h.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,h.roughnessMapTransform)),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)}function m(h,p,T){h.ior.value=p.ior,p.sheen>0&&(h.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),h.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(h.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,h.sheenColorMapTransform)),p.sheenRoughnessMap&&(h.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,h.sheenRoughnessMapTransform))),p.clearcoat>0&&(h.clearcoat.value=p.clearcoat,h.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(h.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,h.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(h.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ft&&h.clearcoatNormalScale.value.negate())),p.dispersion>0&&(h.dispersion.value=p.dispersion),p.iridescence>0&&(h.iridescence.value=p.iridescence,h.iridescenceIOR.value=p.iridescenceIOR,h.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(h.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,h.iridescenceMapTransform)),p.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),p.transmission>0&&(h.transmission.value=p.transmission,h.transmissionSamplerMap.value=T.texture,h.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(h.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,h.transmissionMapTransform)),h.thickness.value=p.thickness,p.thicknessMap&&(h.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=p.attenuationDistance,h.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(h.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(h.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=p.specularIntensity,h.specularColor.value.copy(p.specularColor),p.specularColorMap&&(h.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,h.specularColorMapTransform)),p.specularIntensityMap&&(h.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,h.specularIntensityMapTransform))}function g(h,p){p.matcap&&(h.matcap.value=p.matcap)}function y(h,p){const T=e.get(p).light;h.referencePosition.value.setFromMatrixPosition(T.matrixWorld),h.nearDistance.value=T.shadow.camera.near,h.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function K_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,b){const E=b.program;n.uniformBlockBinding(T,E)}function l(T,b){let E=s[T.id];E===void 0&&(g(T),E=u(T),s[T.id]=E,T.addEventListener("dispose",h));const U=b.program;n.updateUBOMapping(T,U);const C=e.render.frame;r[T.id]!==C&&(f(T),r[T.id]=C)}function u(T){const b=d();T.__bindingPointIndex=b;const E=i.createBuffer(),U=T.__size,C=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,U,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,E),E}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const b=s[T.id],E=T.uniforms,U=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let C=0,A=E.length;C<A;C++){const N=Array.isArray(E[C])?E[C]:[E[C]];for(let K=0,_=N.length;K<_;K++){const S=N[K];if(m(S,C,K,U)===!0){const z=S.__offset,k=Array.isArray(S.value)?S.value:[S.value];let V=0;for(let Y=0;Y<k.length;Y++){const H=k[Y],Q=y(H);typeof H=="number"||typeof H=="boolean"?(S.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,z+V,S.__data)):H.isMatrix3?(S.__data[0]=H.elements[0],S.__data[1]=H.elements[1],S.__data[2]=H.elements[2],S.__data[3]=0,S.__data[4]=H.elements[3],S.__data[5]=H.elements[4],S.__data[6]=H.elements[5],S.__data[7]=0,S.__data[8]=H.elements[6],S.__data[9]=H.elements[7],S.__data[10]=H.elements[8],S.__data[11]=0):(H.toArray(S.__data,V),V+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(T,b,E,U){const C=T.value,A=b+"_"+E;if(U[A]===void 0)return typeof C=="number"||typeof C=="boolean"?U[A]=C:U[A]=C.clone(),!0;{const N=U[A];if(typeof C=="number"||typeof C=="boolean"){if(N!==C)return U[A]=C,!0}else if(N.equals(C)===!1)return N.copy(C),!0}return!1}function g(T){const b=T.uniforms;let E=0;const U=16;for(let A=0,N=b.length;A<N;A++){const K=Array.isArray(b[A])?b[A]:[b[A]];for(let _=0,S=K.length;_<S;_++){const z=K[_],k=Array.isArray(z.value)?z.value:[z.value];for(let V=0,Y=k.length;V<Y;V++){const H=k[V],Q=y(H),G=E%U,ce=G%Q.boundary,le=G+ce;E+=ce,le!==0&&U-le<Q.storage&&(E+=U-le),z.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=E,E+=Q.storage}}}const C=E%U;return C>0&&(E+=U-C),T.__size=E,T.__cache={},this}function y(T){const b={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(b.boundary=4,b.storage=4):T.isVector2?(b.boundary=8,b.storage=8):T.isVector3||T.isColor?(b.boundary=16,b.storage=12):T.isVector4?(b.boundary=16,b.storage=16):T.isMatrix3?(b.boundary=48,b.storage=48):T.isMatrix4?(b.boundary=64,b.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),b}function h(T){const b=T.target;b.removeEventListener("dispose",h);const E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class J_{constructor(e={}){const{canvas:t=Fh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),g=new Int32Array(4);let y=null,h=null;const p=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=sn,this.toneMapping=Gn,this.toneMappingExposure=1;const b=this;let E=!1,U=0,C=0,A=null,N=-1,K=null;const _=new rt,S=new rt;let z=null;const k=new He(0);let V=0,Y=t.width,H=t.height,Q=1,G=null,ce=null;const le=new rt(0,0,Y,H),xe=new rt(0,0,Y,H);let We=!1;const qe=new uc;let W=!1,Z=!1;const me=new st,de=new st,Le=new D,Ce=new rt,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function Ge(){return A===null?Q:1}let w=n;function Se(x,L){return t.getContext(x,L)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zo}`),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",ae,!1),t.addEventListener("webglcontextcreationerror",fe,!1),w===null){const L="webgl2";if(w=Se(L,x),w===null)throw Se(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let ie,ge,ue,ze,se,M,v,O,X,J,j,ye,re,pe,Je,ee,_e,De,Ue,ve,Ye,Oe,at,P;function he(){ie=new ng(w),ie.init(),Oe=new H_(w,ie),ge=new Km(w,ie,e,Oe),ue=new k_(w),ge.reverseDepthBuffer&&ue.buffers.depth.setReversed(!0),ze=new rg(w),se=new M_,M=new z_(w,ie,ue,se,ge,Oe,ze),v=new Zm(b),O=new tg(b),X=new hf(w),at=new qm(w,X),J=new ig(w,X,ze,at),j=new og(w,J,X,ze),Ue=new ag(w,ge,M),ee=new Jm(se),ye=new S_(b,v,O,ie,ge,at,ee),re=new Y_(b,se),pe=new w_,Je=new L_(ie),De=new Xm(b,v,O,ue,j,f,c),_e=new O_(b,j,ge),P=new K_(w,ze,ge,ue),ve=new Ym(w,ie,ze),Ye=new sg(w,ie,ze),ze.programs=ye.programs,b.capabilities=ge,b.extensions=ie,b.properties=se,b.renderLists=pe,b.shadowMap=_e,b.state=ue,b.info=ze}he();const $=new X_(b,w);this.xr=$,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const x=ie.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=ie.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(x){x!==void 0&&(Q=x,this.setSize(Y,H,!1))},this.getSize=function(x){return x.set(Y,H)},this.setSize=function(x,L,F=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=x,H=L,t.width=Math.floor(x*Q),t.height=Math.floor(L*Q),F===!0&&(t.style.width=x+"px",t.style.height=L+"px"),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(Y*Q,H*Q).floor()},this.setDrawingBufferSize=function(x,L,F){Y=x,H=L,Q=F,t.width=Math.floor(x*F),t.height=Math.floor(L*F),this.setViewport(0,0,x,L)},this.getCurrentViewport=function(x){return x.copy(_)},this.getViewport=function(x){return x.copy(le)},this.setViewport=function(x,L,F,B){x.isVector4?le.set(x.x,x.y,x.z,x.w):le.set(x,L,F,B),ue.viewport(_.copy(le).multiplyScalar(Q).round())},this.getScissor=function(x){return x.copy(xe)},this.setScissor=function(x,L,F,B){x.isVector4?xe.set(x.x,x.y,x.z,x.w):xe.set(x,L,F,B),ue.scissor(S.copy(xe).multiplyScalar(Q).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(x){ue.setScissorTest(We=x)},this.setOpaqueSort=function(x){G=x},this.setTransparentSort=function(x){ce=x},this.getClearColor=function(x){return x.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(x=!0,L=!0,F=!0){let B=0;if(x){let I=!1;if(A!==null){const te=A.texture.format;I=te===rc||te===sc||te===ic}if(I){const te=A.texture.type,oe=te===Tn||te===mi||te===Is||te===Ji||te===ec||te===tc,be=De.getClearColor(),Me=De.getClearAlpha(),Pe=be.r,Ie=be.g,Ee=be.b;oe?(m[0]=Pe,m[1]=Ie,m[2]=Ee,m[3]=Me,w.clearBufferuiv(w.COLOR,0,m)):(g[0]=Pe,g[1]=Ie,g[2]=Ee,g[3]=Me,w.clearBufferiv(w.COLOR,0,g))}else B|=w.COLOR_BUFFER_BIT}L&&(B|=w.DEPTH_BUFFER_BIT,w.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),F&&(B|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",ae,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),pe.dispose(),Je.dispose(),se.dispose(),v.dispose(),O.dispose(),j.dispose(),at.dispose(),P.dispose(),ye.dispose(),$.dispose(),$.removeEventListener("sessionstart",Tc),$.removeEventListener("sessionend",Ac),Zn.stop()};function q(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ae(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const x=ze.autoReset,L=_e.enabled,F=_e.autoUpdate,B=_e.needsUpdate,I=_e.type;he(),ze.autoReset=x,_e.enabled=L,_e.autoUpdate=F,_e.needsUpdate=B,_e.type=I}function fe(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ke(x){const L=x.target;L.removeEventListener("dispose",Ke),ft(L)}function ft(x){Pt(x),se.remove(x)}function Pt(x){const L=se.get(x).programs;L!==void 0&&(L.forEach(function(F){ye.releaseProgram(F)}),x.isShaderMaterial&&ye.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,F,B,I,te){L===null&&(L=Ve);const oe=I.isMesh&&I.matrixWorld.determinant()<0,be=Ld(x,L,F,B,I);ue.setMaterial(B,oe);let Me=F.index,Pe=1;if(B.wireframe===!0){if(Me=J.getWireframeAttribute(F),Me===void 0)return;Pe=2}const Ie=F.drawRange,Ee=F.attributes.position;let it=Ie.start*Pe,ct=(Ie.start+Ie.count)*Pe;te!==null&&(it=Math.max(it,te.start*Pe),ct=Math.min(ct,(te.start+te.count)*Pe)),Me!==null?(it=Math.max(it,0),ct=Math.min(ct,Me.count)):Ee!=null&&(it=Math.max(it,0),ct=Math.min(ct,Ee.count));const dt=ct-it;if(dt<0||dt===1/0)return;at.setup(I,B,be,F,Me);let kt,et=ve;if(Me!==null&&(kt=X.get(Me),et=Ye,et.setIndex(kt)),I.isMesh)B.wireframe===!0?(ue.setLineWidth(B.wireframeLinewidth*Ge()),et.setMode(w.LINES)):et.setMode(w.TRIANGLES);else if(I.isLine){let Te=B.linewidth;Te===void 0&&(Te=1),ue.setLineWidth(Te*Ge()),I.isLineSegments?et.setMode(w.LINES):I.isLineLoop?et.setMode(w.LINE_LOOP):et.setMode(w.LINE_STRIP)}else I.isPoints?et.setMode(w.POINTS):I.isSprite&&et.setMode(w.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)et.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(ie.get("WEBGL_multi_draw"))et.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Te=I._multiDrawStarts,bt=I._multiDrawCounts,tt=I._multiDrawCount,Zt=Me?X.get(Me).bytesPerElement:1,Si=se.get(B).currentProgram.getUniforms();for(let Bt=0;Bt<tt;Bt++)Si.setValue(w,"_gl_DrawID",Bt),et.render(Te[Bt]/Zt,bt[Bt])}else if(I.isInstancedMesh)et.renderInstances(it,dt,I.count);else if(F.isInstancedBufferGeometry){const Te=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,bt=Math.min(F.instanceCount,Te);et.renderInstances(it,dt,bt)}else et.render(it,dt)};function Qe(x,L,F){x.transparent===!0&&x.side===Mn&&x.forceSinglePass===!1?(x.side=Ft,x.needsUpdate=!0,Gs(x,L,F),x.side=qn,x.needsUpdate=!0,Gs(x,L,F),x.side=Mn):Gs(x,L,F)}this.compile=function(x,L,F=null){F===null&&(F=x),h=Je.get(F),h.init(L),T.push(h),F.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(h.pushLight(I),I.castShadow&&h.pushShadow(I))}),x!==F&&x.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(h.pushLight(I),I.castShadow&&h.pushShadow(I))}),h.setupLights();const B=new Set;return x.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const te=I.material;if(te)if(Array.isArray(te))for(let oe=0;oe<te.length;oe++){const be=te[oe];Qe(be,F,I),B.add(be)}else Qe(te,F,I),B.add(te)}),T.pop(),h=null,B},this.compileAsync=function(x,L,F=null){const B=this.compile(x,L,F);return new Promise(I=>{function te(){if(B.forEach(function(oe){se.get(oe).currentProgram.isReady()&&B.delete(oe)}),B.size===0){I(x);return}setTimeout(te,10)}ie.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Lt=null;function gn(x){Lt&&Lt(x)}function Tc(){Zn.stop()}function Ac(){Zn.start()}const Zn=new Hu;Zn.setAnimationLoop(gn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(x){Lt=x,$.setAnimationLoop(x),x===null?Zn.stop():Zn.start()},$.addEventListener("sessionstart",Tc),$.addEventListener("sessionend",Ac),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(L),L=$.getCamera()),x.isScene===!0&&x.onBeforeRender(b,x,L,A),h=Je.get(x,T.length),h.init(L),T.push(h),de.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),qe.setFromProjectionMatrix(de),Z=this.localClippingEnabled,W=ee.init(this.clippingPlanes,Z),y=pe.get(x,p.length),y.init(),p.push(y),$.enabled===!0&&$.isPresenting===!0){const te=b.xr.getDepthSensingMesh();te!==null&&ta(te,L,-1/0,b.sortObjects)}ta(x,L,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(G,ce),Ze=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Ze&&De.addToRenderList(y,x),this.info.render.frame++,W===!0&&ee.beginShadows();const F=h.state.shadowsArray;_e.render(F,x,L),W===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=y.opaque,I=y.transmissive;if(h.setupLights(),L.isArrayCamera){const te=L.cameras;if(I.length>0)for(let oe=0,be=te.length;oe<be;oe++){const Me=te[oe];Rc(B,I,x,Me)}Ze&&De.render(x);for(let oe=0,be=te.length;oe<be;oe++){const Me=te[oe];Cc(y,x,Me,Me.viewport)}}else I.length>0&&Rc(B,I,x,L),Ze&&De.render(x),Cc(y,x,L);A!==null&&(M.updateMultisampleRenderTarget(A),M.updateRenderTargetMipmap(A)),x.isScene===!0&&x.onAfterRender(b,x,L),at.resetDefaultState(),N=-1,K=null,T.pop(),T.length>0?(h=T[T.length-1],W===!0&&ee.setGlobalState(b.clippingPlanes,h.state.camera)):h=null,p.pop(),p.length>0?y=p[p.length-1]:y=null};function ta(x,L,F,B){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)F=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)h.pushLight(x),x.castShadow&&h.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||qe.intersectsSprite(x)){B&&Ce.setFromMatrixPosition(x.matrixWorld).applyMatrix4(de);const oe=j.update(x),be=x.material;be.visible&&y.push(x,oe,be,F,Ce.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||qe.intersectsObject(x))){const oe=j.update(x),be=x.material;if(B&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ce.copy(x.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Ce.copy(oe.boundingSphere.center)),Ce.applyMatrix4(x.matrixWorld).applyMatrix4(de)),Array.isArray(be)){const Me=oe.groups;for(let Pe=0,Ie=Me.length;Pe<Ie;Pe++){const Ee=Me[Pe],it=be[Ee.materialIndex];it&&it.visible&&y.push(x,oe,it,F,Ce.z,Ee)}}else be.visible&&y.push(x,oe,be,F,Ce.z,null)}}const te=x.children;for(let oe=0,be=te.length;oe<be;oe++)ta(te[oe],L,F,B)}function Cc(x,L,F,B){const I=x.opaque,te=x.transmissive,oe=x.transparent;h.setupLightsView(F),W===!0&&ee.setGlobalState(b.clippingPlanes,F),B&&ue.viewport(_.copy(B)),I.length>0&&Vs(I,L,F),te.length>0&&Vs(te,L,F),oe.length>0&&Vs(oe,L,F),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function Rc(x,L,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[B.id]===void 0&&(h.state.transmissionRenderTarget[B.id]=new gi(1,1,{generateMipmaps:!0,type:ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float")?Ns:Tn,minFilter:fi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));const te=h.state.transmissionRenderTarget[B.id],oe=B.viewport||_;te.setSize(oe.z,oe.w);const be=b.getRenderTarget();b.setRenderTarget(te),b.getClearColor(k),V=b.getClearAlpha(),V<1&&b.setClearColor(16777215,.5),b.clear(),Ze&&De.render(F);const Me=b.toneMapping;b.toneMapping=Gn;const Pe=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),h.setupLightsView(B),W===!0&&ee.setGlobalState(b.clippingPlanes,B),Vs(x,F,B),M.updateMultisampleRenderTarget(te),M.updateRenderTargetMipmap(te),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let Ee=0,it=L.length;Ee<it;Ee++){const ct=L[Ee],dt=ct.object,kt=ct.geometry,et=ct.material,Te=ct.group;if(et.side===Mn&&dt.layers.test(B.layers)){const bt=et.side;et.side=Ft,et.needsUpdate=!0,Pc(dt,F,B,kt,et,Te),et.side=bt,et.needsUpdate=!0,Ie=!0}}Ie===!0&&(M.updateMultisampleRenderTarget(te),M.updateRenderTargetMipmap(te))}b.setRenderTarget(be),b.setClearColor(k,V),Pe!==void 0&&(B.viewport=Pe),b.toneMapping=Me}function Vs(x,L,F){const B=L.isScene===!0?L.overrideMaterial:null;for(let I=0,te=x.length;I<te;I++){const oe=x[I],be=oe.object,Me=oe.geometry,Pe=B===null?oe.material:B,Ie=oe.group;be.layers.test(F.layers)&&Pc(be,L,F,Me,Pe,Ie)}}function Pc(x,L,F,B,I,te){x.onBeforeRender(b,L,F,B,I,te),x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),I.onBeforeRender(b,L,F,B,x,te),I.transparent===!0&&I.side===Mn&&I.forceSinglePass===!1?(I.side=Ft,I.needsUpdate=!0,b.renderBufferDirect(F,L,B,I,x,te),I.side=qn,I.needsUpdate=!0,b.renderBufferDirect(F,L,B,I,x,te),I.side=Mn):b.renderBufferDirect(F,L,B,I,x,te),x.onAfterRender(b,L,F,B,I,te)}function Gs(x,L,F){L.isScene!==!0&&(L=Ve);const B=se.get(x),I=h.state.lights,te=h.state.shadowsArray,oe=I.state.version,be=ye.getParameters(x,I.state,te,L,F),Me=ye.getProgramCacheKey(be);let Pe=B.programs;B.environment=x.isMeshStandardMaterial?L.environment:null,B.fog=L.fog,B.envMap=(x.isMeshStandardMaterial?O:v).get(x.envMap||B.environment),B.envMapRotation=B.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,Pe===void 0&&(x.addEventListener("dispose",Ke),Pe=new Map,B.programs=Pe);let Ie=Pe.get(Me);if(Ie!==void 0){if(B.currentProgram===Ie&&B.lightsStateVersion===oe)return Ic(x,be),Ie}else be.uniforms=ye.getUniforms(x),x.onBeforeCompile(be,b),Ie=ye.acquireProgram(be,Me),Pe.set(Me,Ie),B.uniforms=be.uniforms;const Ee=B.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Ee.clippingPlanes=ee.uniform),Ic(x,be),B.needsLights=Dd(x),B.lightsStateVersion=oe,B.needsLights&&(Ee.ambientLightColor.value=I.state.ambient,Ee.lightProbe.value=I.state.probe,Ee.directionalLights.value=I.state.directional,Ee.directionalLightShadows.value=I.state.directionalShadow,Ee.spotLights.value=I.state.spot,Ee.spotLightShadows.value=I.state.spotShadow,Ee.rectAreaLights.value=I.state.rectArea,Ee.ltc_1.value=I.state.rectAreaLTC1,Ee.ltc_2.value=I.state.rectAreaLTC2,Ee.pointLights.value=I.state.point,Ee.pointLightShadows.value=I.state.pointShadow,Ee.hemisphereLights.value=I.state.hemi,Ee.directionalShadowMap.value=I.state.directionalShadowMap,Ee.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Ee.spotShadowMap.value=I.state.spotShadowMap,Ee.spotLightMatrix.value=I.state.spotLightMatrix,Ee.spotLightMap.value=I.state.spotLightMap,Ee.pointShadowMap.value=I.state.pointShadowMap,Ee.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Ie,B.uniformsList=null,Ie}function Lc(x){if(x.uniformsList===null){const L=x.currentProgram.getUniforms();x.uniformsList=Ar.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function Ic(x,L){const F=se.get(x);F.outputColorSpace=L.outputColorSpace,F.batching=L.batching,F.batchingColor=L.batchingColor,F.instancing=L.instancing,F.instancingColor=L.instancingColor,F.instancingMorph=L.instancingMorph,F.skinning=L.skinning,F.morphTargets=L.morphTargets,F.morphNormals=L.morphNormals,F.morphColors=L.morphColors,F.morphTargetsCount=L.morphTargetsCount,F.numClippingPlanes=L.numClippingPlanes,F.numIntersection=L.numClipIntersection,F.vertexAlphas=L.vertexAlphas,F.vertexTangents=L.vertexTangents,F.toneMapping=L.toneMapping}function Ld(x,L,F,B,I){L.isScene!==!0&&(L=Ve),M.resetTextureUnits();const te=L.fog,oe=B.isMeshStandardMaterial?L.environment:null,be=A===null?b.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Kn,Me=(B.isMeshStandardMaterial?O:v).get(B.envMap||oe),Pe=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ie=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ee=!!F.morphAttributes.position,it=!!F.morphAttributes.normal,ct=!!F.morphAttributes.color;let dt=Gn;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(dt=b.toneMapping);const kt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,et=kt!==void 0?kt.length:0,Te=se.get(B),bt=h.state.lights;if(W===!0&&(Z===!0||x!==K)){const Wt=x===K&&B.id===N;ee.setState(B,x,Wt)}let tt=!1;B.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==bt.state.version||Te.outputColorSpace!==be||I.isBatchedMesh&&Te.batching===!1||!I.isBatchedMesh&&Te.batching===!0||I.isBatchedMesh&&Te.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Te.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Te.instancing===!1||!I.isInstancedMesh&&Te.instancing===!0||I.isSkinnedMesh&&Te.skinning===!1||!I.isSkinnedMesh&&Te.skinning===!0||I.isInstancedMesh&&Te.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Te.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Te.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Te.instancingMorph===!1&&I.morphTexture!==null||Te.envMap!==Me||B.fog===!0&&Te.fog!==te||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ee.numPlanes||Te.numIntersection!==ee.numIntersection)||Te.vertexAlphas!==Pe||Te.vertexTangents!==Ie||Te.morphTargets!==Ee||Te.morphNormals!==it||Te.morphColors!==ct||Te.toneMapping!==dt||Te.morphTargetsCount!==et)&&(tt=!0):(tt=!0,Te.__version=B.version);let Zt=Te.currentProgram;tt===!0&&(Zt=Gs(B,L,I));let Si=!1,Bt=!1,na=!1;const ht=Zt.getUniforms(),Rn=Te.uniforms;if(ue.useProgram(Zt.program)&&(Si=!0,Bt=!0,na=!0),B.id!==N&&(N=B.id,Bt=!0),Si||K!==x){ge.reverseDepthBuffer?(me.copy(x.projectionMatrix),Bh(me),zh(me),ht.setValue(w,"projectionMatrix",me)):ht.setValue(w,"projectionMatrix",x.projectionMatrix),ht.setValue(w,"viewMatrix",x.matrixWorldInverse);const Wt=ht.map.cameraPosition;Wt!==void 0&&Wt.setValue(w,Le.setFromMatrixPosition(x.matrixWorld)),ge.logarithmicDepthBuffer&&ht.setValue(w,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ht.setValue(w,"isOrthographic",x.isOrthographicCamera===!0),K!==x&&(K=x,Bt=!0,na=!0)}if(I.isSkinnedMesh){ht.setOptional(w,I,"bindMatrix"),ht.setOptional(w,I,"bindMatrixInverse");const Wt=I.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),ht.setValue(w,"boneTexture",Wt.boneTexture,M))}I.isBatchedMesh&&(ht.setOptional(w,I,"batchingTexture"),ht.setValue(w,"batchingTexture",I._matricesTexture,M),ht.setOptional(w,I,"batchingIdTexture"),ht.setValue(w,"batchingIdTexture",I._indirectTexture,M),ht.setOptional(w,I,"batchingColorTexture"),I._colorsTexture!==null&&ht.setValue(w,"batchingColorTexture",I._colorsTexture,M));const ia=F.morphAttributes;if((ia.position!==void 0||ia.normal!==void 0||ia.color!==void 0)&&Ue.update(I,F,Zt),(Bt||Te.receiveShadow!==I.receiveShadow)&&(Te.receiveShadow=I.receiveShadow,ht.setValue(w,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Rn.envMap.value=Me,Rn.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&L.environment!==null&&(Rn.envMapIntensity.value=L.environmentIntensity),Bt&&(ht.setValue(w,"toneMappingExposure",b.toneMappingExposure),Te.needsLights&&Id(Rn,na),te&&B.fog===!0&&re.refreshFogUniforms(Rn,te),re.refreshMaterialUniforms(Rn,B,Q,H,h.state.transmissionRenderTarget[x.id]),Ar.upload(w,Lc(Te),Rn,M)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ar.upload(w,Lc(Te),Rn,M),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ht.setValue(w,"center",I.center),ht.setValue(w,"modelViewMatrix",I.modelViewMatrix),ht.setValue(w,"normalMatrix",I.normalMatrix),ht.setValue(w,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Wt=B.uniformsGroups;for(let sa=0,Ud=Wt.length;sa<Ud;sa++){const Dc=Wt[sa];P.update(Dc,Zt),P.bind(Dc,Zt)}}return Zt}function Id(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function Dd(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(x,L,F){se.get(x.texture).__webglTexture=L,se.get(x.depthTexture).__webglTexture=F;const B=se.get(x);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,L){const F=se.get(x);F.__webglFramebuffer=L,F.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(x,L=0,F=0){A=x,U=L,C=F;let B=!0,I=null,te=!1,oe=!1;if(x){const Me=se.get(x);if(Me.__useDefaultFramebuffer!==void 0)ue.bindFramebuffer(w.FRAMEBUFFER,null),B=!1;else if(Me.__webglFramebuffer===void 0)M.setupRenderTarget(x);else if(Me.__hasExternalTextures)M.rebindTextures(x,se.get(x.texture).__webglTexture,se.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Ee=x.depthTexture;if(Me.__boundDepthTexture!==Ee){if(Ee!==null&&se.has(Ee)&&(x.width!==Ee.image.width||x.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(x)}}const Pe=x.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(oe=!0);const Ie=se.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ie[L])?I=Ie[L][F]:I=Ie[L],te=!0):x.samples>0&&M.useMultisampledRTT(x)===!1?I=se.get(x).__webglMultisampledFramebuffer:Array.isArray(Ie)?I=Ie[F]:I=Ie,_.copy(x.viewport),S.copy(x.scissor),z=x.scissorTest}else _.copy(le).multiplyScalar(Q).floor(),S.copy(xe).multiplyScalar(Q).floor(),z=We;if(ue.bindFramebuffer(w.FRAMEBUFFER,I)&&B&&ue.drawBuffers(x,I),ue.viewport(_),ue.scissor(S),ue.setScissorTest(z),te){const Me=se.get(x.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+L,Me.__webglTexture,F)}else if(oe){const Me=se.get(x.texture),Pe=L||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,Me.__webglTexture,F||0,Pe)}N=-1},this.readRenderTargetPixels=function(x,L,F,B,I,te,oe){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=se.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&oe!==void 0&&(be=be[oe]),be){ue.bindFramebuffer(w.FRAMEBUFFER,be);try{const Me=x.texture,Pe=Me.format,Ie=Me.type;if(!ge.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-B&&F>=0&&F<=x.height-I&&w.readPixels(L,F,B,I,Oe.convert(Pe),Oe.convert(Ie),te)}finally{const Me=A!==null?se.get(A).__webglFramebuffer:null;ue.bindFramebuffer(w.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(x,L,F,B,I,te,oe){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=se.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&oe!==void 0&&(be=be[oe]),be){const Me=x.texture,Pe=Me.format,Ie=Me.type;if(!ge.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=x.width-B&&F>=0&&F<=x.height-I){ue.bindFramebuffer(w.FRAMEBUFFER,be);const Ee=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Ee),w.bufferData(w.PIXEL_PACK_BUFFER,te.byteLength,w.STREAM_READ),w.readPixels(L,F,B,I,Oe.convert(Pe),Oe.convert(Ie),0);const it=A!==null?se.get(A).__webglFramebuffer:null;ue.bindFramebuffer(w.FRAMEBUFFER,it);const ct=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await kh(w,ct,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Ee),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,te),w.deleteBuffer(Ee),w.deleteSync(ct),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,L=null,F=0){x.isTexture!==!0&&(Tr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,x=arguments[1]);const B=Math.pow(2,-F),I=Math.floor(x.image.width*B),te=Math.floor(x.image.height*B),oe=L!==null?L.x:0,be=L!==null?L.y:0;M.setTexture2D(x,0),w.copyTexSubImage2D(w.TEXTURE_2D,F,0,0,oe,be,I,te),ue.unbindTexture()},this.copyTextureToTexture=function(x,L,F=null,B=null,I=0){x.isTexture!==!0&&(Tr("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,x=arguments[1],L=arguments[2],I=arguments[3]||0,F=null);let te,oe,be,Me,Pe,Ie;F!==null?(te=F.max.x-F.min.x,oe=F.max.y-F.min.y,be=F.min.x,Me=F.min.y):(te=x.image.width,oe=x.image.height,be=0,Me=0),B!==null?(Pe=B.x,Ie=B.y):(Pe=0,Ie=0);const Ee=Oe.convert(L.format),it=Oe.convert(L.type);M.setTexture2D(L,0),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,L.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,L.unpackAlignment);const ct=w.getParameter(w.UNPACK_ROW_LENGTH),dt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),kt=w.getParameter(w.UNPACK_SKIP_PIXELS),et=w.getParameter(w.UNPACK_SKIP_ROWS),Te=w.getParameter(w.UNPACK_SKIP_IMAGES),bt=x.isCompressedTexture?x.mipmaps[I]:x.image;w.pixelStorei(w.UNPACK_ROW_LENGTH,bt.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,bt.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,be),w.pixelStorei(w.UNPACK_SKIP_ROWS,Me),x.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,I,Pe,Ie,te,oe,Ee,it,bt.data):x.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,I,Pe,Ie,bt.width,bt.height,Ee,bt.data):w.texSubImage2D(w.TEXTURE_2D,I,Pe,Ie,te,oe,Ee,it,bt),w.pixelStorei(w.UNPACK_ROW_LENGTH,ct),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,dt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,kt),w.pixelStorei(w.UNPACK_SKIP_ROWS,et),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Te),I===0&&L.generateMipmaps&&w.generateMipmap(w.TEXTURE_2D),ue.unbindTexture()},this.copyTextureToTexture3D=function(x,L,F=null,B=null,I=0){x.isTexture!==!0&&(Tr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,B=arguments[1]||null,x=arguments[2],L=arguments[3],I=arguments[4]||0);let te,oe,be,Me,Pe,Ie,Ee,it,ct;const dt=x.isCompressedTexture?x.mipmaps[I]:x.image;F!==null?(te=F.max.x-F.min.x,oe=F.max.y-F.min.y,be=F.max.z-F.min.z,Me=F.min.x,Pe=F.min.y,Ie=F.min.z):(te=dt.width,oe=dt.height,be=dt.depth,Me=0,Pe=0,Ie=0),B!==null?(Ee=B.x,it=B.y,ct=B.z):(Ee=0,it=0,ct=0);const kt=Oe.convert(L.format),et=Oe.convert(L.type);let Te;if(L.isData3DTexture)M.setTexture3D(L,0),Te=w.TEXTURE_3D;else if(L.isDataArrayTexture||L.isCompressedArrayTexture)M.setTexture2DArray(L,0),Te=w.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,L.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,L.unpackAlignment);const bt=w.getParameter(w.UNPACK_ROW_LENGTH),tt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Zt=w.getParameter(w.UNPACK_SKIP_PIXELS),Si=w.getParameter(w.UNPACK_SKIP_ROWS),Bt=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,dt.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,dt.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Me),w.pixelStorei(w.UNPACK_SKIP_ROWS,Pe),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Ie),x.isDataTexture||x.isData3DTexture?w.texSubImage3D(Te,I,Ee,it,ct,te,oe,be,kt,et,dt.data):L.isCompressedArrayTexture?w.compressedTexSubImage3D(Te,I,Ee,it,ct,te,oe,be,kt,dt.data):w.texSubImage3D(Te,I,Ee,it,ct,te,oe,be,kt,et,dt),w.pixelStorei(w.UNPACK_ROW_LENGTH,bt),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,tt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Zt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Si),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Bt),I===0&&L.generateMipmaps&&w.generateMipmap(Te),ue.unbindTexture()},this.initRenderTarget=function(x){se.get(x).__webglFramebuffer===void 0&&M.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?M.setTextureCube(x,0):x.isData3DTexture?M.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?M.setTexture2DArray(x,0):M.setTexture2D(x,0),ue.unbindTexture()},this.resetState=function(){U=0,C=0,A=null,ue.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ac?"display-p3":"srgb",t.unpackColorSpace=nt.workingColorSpace===$r?"display-p3":"srgb"}}class Z_ extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Q_ extends Rt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Ot,u=Ot,d,f){super(null,a,o,c,l,u,s,r,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cl extends qt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Fi=new st,Rl=new st,hr=[],Pl=new vi,ev=new st,vs=new Ct,ys=new os;class tv extends Ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Cl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,ev)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new vi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fi),Pl.copy(e.boundingBox).applyMatrix4(Fi),this.boundingBox.union(Pl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new os),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fi),ys.copy(e.boundingSphere).applyMatrix4(Fi),this.boundingSphere.union(ys)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(vs.geometry=this.geometry,vs.material=this.material,vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ys.copy(this.boundingSphere),ys.applyMatrix4(n),e.ray.intersectsSphere(ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fi),Rl.multiplyMatrices(n,Fi),vs.matrixWorld=Rl,vs.raycast(e,hr);for(let a=0,o=hr.length;a<o;a++){const c=hr[a];c.instanceId=r,c.object=this,t.push(c)}hr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Cl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Q_(new Float32Array(s*this.count),s,this.count,nc,dn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class qu extends cs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ll=new st,Uo=new oc,fr=new os,pr=new D;class nv extends xt{constructor(e=new Jt,t=new qu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),fr.radius+=r,e.ray.intersectsSphere(fr)===!1)return;Ll.copy(s).invert(),Uo.copy(e.ray).applyMatrix4(Ll);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=f,y=m;g<y;g++){const h=l.getX(g);pr.fromBufferAttribute(d,h),Il(pr,h,c,s,e,t,this)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=f,y=m;g<y;g++)pr.fromBufferAttribute(d,g),Il(pr,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Il(i,e,t,n,s,r,a){const o=Uo.distanceSqToPoint(i);if(o<t){const c=new D;Uo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class hc extends Jt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new D,u=new Xe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const m=n+d/t*s;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Tt(a,3)),this.setAttribute("normal",new Tt(o,3)),this.setAttribute("uv",new Tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ur extends Jt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],m=[];let g=0;const y=[],h=n/2;let p=0;T(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new Tt(d,3)),this.setAttribute("normal",new Tt(f,3)),this.setAttribute("uv",new Tt(m,2));function T(){const E=new D,U=new D;let C=0;const A=(t-e)/n;for(let N=0;N<=r;N++){const K=[],_=N/r,S=_*(t-e)+e;for(let z=0;z<=s;z++){const k=z/s,V=k*c+o,Y=Math.sin(V),H=Math.cos(V);U.x=S*Y,U.y=-_*n+h,U.z=S*H,d.push(U.x,U.y,U.z),E.set(Y,A,H).normalize(),f.push(E.x,E.y,E.z),m.push(k,1-_),K.push(g++)}y.push(K)}for(let N=0;N<s;N++)for(let K=0;K<r;K++){const _=y[K][N],S=y[K+1][N],z=y[K+1][N+1],k=y[K][N+1];e>0&&(u.push(_,S,k),C+=3),t>0&&(u.push(S,z,k),C+=3)}l.addGroup(p,C,0),p+=C}function b(E){const U=g,C=new Xe,A=new D;let N=0;const K=E===!0?e:t,_=E===!0?1:-1;for(let z=1;z<=s;z++)d.push(0,h*_,0),f.push(0,_,0),m.push(.5,.5),g++;const S=g;for(let z=0;z<=s;z++){const V=z/s*c+o,Y=Math.cos(V),H=Math.sin(V);A.x=K*H,A.y=h*_,A.z=K*Y,d.push(A.x,A.y,A.z),f.push(0,_,0),C.x=Y*.5+.5,C.y=H*.5*_+.5,m.push(C.x,C.y),g++}for(let z=0;z<s;z++){const k=U+z,V=S+z;E===!0?u.push(V,V+1,k):u.push(V+1,V,k),N+=3}l.addGroup(p,N,E===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fc extends Jt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let d=e;const f=(t-e)/s,m=new D,g=new Xe;for(let y=0;y<=s;y++){for(let h=0;h<=n;h++){const p=r+h/n*a;m.x=d*Math.cos(p),m.y=d*Math.sin(p),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,u.push(g.x,g.y)}d+=f}for(let y=0;y<s;y++){const h=y*(n+1);for(let p=0;p<n;p++){const T=p+h,b=T,E=T+n+1,U=T+n+2,C=T+1;o.push(b,E,C),o.push(E,U,C)}}this.setIndex(o),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(l,3)),this.setAttribute("uv",new Tt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Oa extends cs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pu,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pc extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class iv extends pc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Fa=new st,Dl=new D,Ul=new D;class Yu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uc,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Dl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Dl),Ul.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ul),t.updateMatrixWorld(),Fa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Nl=new st,xs=new D,ka=new D;class sv extends Yu{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Xe(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),xs.setFromMatrixPosition(e.matrixWorld),n.position.copy(xs),ka.copy(n.position),ka.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ka),n.updateMatrixWorld(),s.makeTranslation(-xs.x,-xs.y,-xs.z),Nl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nl)}}class Ol extends pc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new sv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class rv extends Yu{constructor(){super(new Vu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class av extends pc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new rv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Fl=new st;class ov{constructor(e,t,n=0,s=1/0){this.ray=new oc(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new cc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Fl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Fl),this}intersectObject(e,t=!0,n=[]){return No(e,this,n,t),n.sort(kl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)No(e[s],this,n,t);return n.sort(kl),n}}function kl(i,e){return i.distance-e.distance}function No(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)No(r[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zo);const Ba=.11,mr=.42,gr=26;function cv(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}function lv(i,e){const t=new J_({antialias:!0,alpha:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.outputColorSpace=sn,t.toneMapping=yu,t.toneMappingExposure=1.05,t.shadowMap.enabled=!0,t.shadowMap.type=_u,i.appendChild(t.domElement);const n=new Z_,s=new Gt(36,1,.1,100),r=new D(0,1.3,0),a=new iv(16773597,1707784,.55);n.add(a);const o=new av(16769720,2.4);o.position.set(4,8,5),o.castShadow=!0,o.shadow.mapSize.set(1024,1024),Object.assign(o.shadow.camera,{left:-7,right:7,top:7,bottom:-7}),n.add(o);const c=new Ol(16742938,26,18);c.position.set(-4,3,-4),n.add(c);const l=new Ol(15254142,10,14);l.position.set(3,1.2,4),n.add(l);const u=new Oa({color:986123,roughness:.55,metalness:.4}),d=new Ct(new hc(9,96),u);d.rotation.x=-Math.PI/2,d.receiveShadow=!0,n.add(d);const f=new lc({color:16751165,transparent:!0,opacity:.35});[3.2,4.6,6.2].forEach((w,Se)=>{const ie=new Ct(new fc(w,w+.012+Se*.004,160),f.clone());ie.material.opacity=.32-Se*.09,ie.rotation.x=-Math.PI/2,ie.position.y=.002,n.add(ie)});const m=new Jt,g=160,y=new Float32Array(g*3);for(let w=0;w<g;w++){const Se=Math.random()*Math.PI*2,ie=1.5+Math.random()*6;y[w*3]=Math.cos(Se)*ie,y[w*3+1]=Math.random()*5,y[w*3+2]=Math.sin(Se)*ie}m.setAttribute("position",new qt(y,3));const h=new nv(m,new qu({color:15254142,size:.035,transparent:!0,opacity:.6,depthWrite:!1}));n.add(h);const p=new Ur(mr,mr,Ba*.86,40),T=new Ts;n.add(T);let b=[];const E=[];function U(w){const Se=new He(w);return Se.lerp(new He(15254142),.35),Se}function C(w){const Se=new Map(b.map(se=>[se.bar.id,se.shown]));b.forEach(se=>{T.remove(se.mesh),T.remove(se.base),se.mesh.dispose(),se.mat.dispose(),se.base.material.dispose()}),b=[];const ie=w.filter(se=>se.amount>0).sort((se,M)=>M.amount-se.amount).slice(0,9),ge=Math.max(1,...ie.map(se=>se.amount)),ue=ie.length,ze=1.18;ie.forEach((se,M)=>{const v=(M-(ue-1)/2)*ze,O=new D(v,0,-.09*v*v+(M%2?-.35:.2)),X=Math.max(1,Math.round(se.amount/ge*gr)),J=new Oa({color:U(se.color),metalness:.85,roughness:.28,emissive:new He(se.color),emissiveIntensity:.06}),j=new tv(p,J,gr+4);j.castShadow=!0,j.receiveShadow=!0,j.count=0,j.userData.colIndex=M;const ye=new Ct(new Ur(mr*1.35,mr*1.5,.05,48),new Oa({color:1774866,metalness:.6,roughness:.4,emissive:new He(se.color),emissiveIntensity:.25}));ye.position.copy(O).setY(.025),ye.receiveShadow=!0,ye.userData.colIndex=M,T.add(j),T.add(ye),b.push({bar:se,mesh:j,mat:J,pos:O,n:X,shown:Math.min(X,Se.get(se.id)??0),hover:0,jit:Array.from({length:gr+4},()=>(Math.random()-.5)*.05),base:ye})})}const A=new st,N=new as,K=new D(1,1,1),_=new D;function S(w){const Se=Math.floor(w.shown);w.mesh.count=Se;for(let ie=0;ie<Se;ie++)_.set(w.pos.x+w.jit[ie],.05+Ba*(ie+.5)+w.hover*ie*.012,w.pos.z+w.jit[(ie+7)%w.jit.length]),N.setFromAxisAngle(new D(0,1,0),ie*.4),A.compose(_,N,K),w.mesh.setMatrixAt(ie,A);w.mesh.instanceMatrix.needsUpdate=!0}let z=.3,k=.36,V=10.5,Y=!0,H=!1,Q=0,G=0,ce=0,le=0;const xe=new ov,We=new Xe;let qe=-1;const W=t.domElement;W.style.touchAction="pan-y",W.addEventListener("pointerdown",w=>{H=!0,Q=0,G=w.clientX,ce=w.clientY,Y=!1,le=performance.now()}),window.addEventListener("pointerup",()=>{H=!1}),W.addEventListener("pointermove",w=>{const Se=W.getBoundingClientRect();if(H){const ie=w.clientX-G,ge=w.clientY-ce;Q+=Math.abs(ie)+Math.abs(ge),z-=ie*.008,k=Math.max(.12,Math.min(.95,k+ge*.004)),G=w.clientX,ce=w.clientY,le=performance.now()}We.set((w.clientX-Se.left)/Se.width*2-1,-((w.clientY-Se.top)/Se.height)*2+1),Z(w.clientX-Se.left,w.clientY-Se.top)}),W.addEventListener("pointerleave",()=>{qe=-1,e.onHover(null,0,0)}),W.addEventListener("click",w=>{if(Q>8)return;const Se=W.getBoundingClientRect();We.set((w.clientX-Se.left)/Se.width*2-1,-((w.clientY-Se.top)/Se.height)*2+1);const ie=Z(w.clientX-Se.left,w.clientY-Se.top);ie>=0&&e.onPick(b[ie].bar.id)}),W.addEventListener("wheel",w=>{V=Math.max(6,Math.min(14,V+w.deltaY*.004)),w.preventDefault()},{passive:!1});function Z(w,Se){xe.setFromCamera(We,s);const ie=xe.intersectObjects(b.flatMap(ue=>[ue.mesh,ue.base]),!1),ge=ie.length?ie[0].object.userData.colIndex:-1;return ge!==qe&&(qe=ge,W.style.cursor=ge>=0?"pointer":"grab"),e.onHover(ge>=0?b[ge].bar:null,w,Se),ge}function me(){const w=i.clientWidth,Se=i.clientHeight;t.setSize(w,Se,!1),s.aspect=w/Se,s.fov=w<520?44:36,s.updateProjectionMatrix()}const de=new ResizeObserver(me);de.observe(i),me();let Le=0,Ce=performance.now(),Ve=!0;const Ze=new IntersectionObserver(w=>{Ve=w[0].isIntersecting});Ze.observe(i);function Ge(w){Le=requestAnimationFrame(Ge);const Se=Math.min(.05,(w-Ce)/1e3);if(Ce=w,!Ve||document.hidden)return;!Y&&w-le>6e3&&(Y=!0),Y&&(z+=Se*.12);const ie=V*(s.aspect<1.2?1.35:1);s.position.set(Math.sin(z)*Math.cos(k)*ie,r.y+Math.sin(k)*ie,Math.cos(z)*Math.cos(k)*ie),s.lookAt(r),b.forEach((ge,ue)=>{const ze=ge.n;ge.shown<ze&&(ge.shown=Math.min(ze,ge.shown+Se*(14+ze*.8))),ge.shown>ze&&(ge.shown=ze);const se=ue===qe?1:0;ge.hover+=(se-ge.hover)*Math.min(1,Se*10),ge.mat.emissiveIntensity=.06+ge.hover*.45,S(ge)});for(let ge=E.length-1;ge>=0;ge--){const ue=E[ge];ue.t+=Se;const ze=Math.min(1,ue.t/.7),se=ze<1?ze*ze:1,M=ze>=1?Math.max(0,Math.sin((ue.t-.7)*18)*.12*Math.exp(-(ue.t-.7)*8)):0;ue.mesh.position.y=ue.y0+(ue.y1-ue.y0)*se+M,ue.mesh.rotation.x=(1-se)*6,ue.mesh.rotation.z=(1-se)*3,ue.t>1.1&&(T.remove(ue.mesh),ue.mesh.material.dispose(),E.splice(ge,1),ue.col.n=Math.min(gr+4,ue.col.n+0))}h.rotation.y+=Se*.02,t.render(n,s)}return Le=requestAnimationFrame(Ge),{update(w){C(w)},drop(w){const Se=b.find(ge=>ge.bar.id===w);if(!Se)return;const ie=new Ct(p,Se.mat.clone());ie.castShadow=!0,ie.position.set(Se.pos.x,5,Se.pos.z),T.add(ie),E.push({mesh:ie,col:Se,t:0,y0:5,y1:.05+Ba*(Se.n+.5)})},setTheme(w){u.color.set(w?986123:15327702),a.intensity=w?.55:1.1},dispose(){cancelAnimationFrame(Le),de.disconnect(),Ze.disconnect(),t.dispose(),i.innerHTML=""}}}const uv="modulepreload",dv=function(i,e){return new URL(i,e).href},Bl={},es=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");s=Promise.allSettled(t.map(l=>{if(l=dv(l,n),l in Bl)return;Bl[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(!!n)for(let g=a.length-1;g>=0;g--){const y=a[g];if(y.href===l&&(!u||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${d}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":uv,u||(m.as="script"),m.crossOrigin="",m.href=l,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((g,y)=>{m.addEventListener("load",g),m.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},hv=i=>{let e;return i?e=i:typeof fetch>"u"?e=(...t)=>es(async()=>{const{default:n}=await Promise.resolve().then(()=>us);return{default:n}},void 0,import.meta.url).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)};class mc extends Error{constructor(e,t="FunctionsError",n){super(e),this.name=t,this.context=n}}class fv extends mc{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class pv extends mc{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class mv extends mc{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Oo;(function(i){i.Any="any",i.ApNortheast1="ap-northeast-1",i.ApNortheast2="ap-northeast-2",i.ApSouth1="ap-south-1",i.ApSoutheast1="ap-southeast-1",i.ApSoutheast2="ap-southeast-2",i.CaCentral1="ca-central-1",i.EuCentral1="eu-central-1",i.EuWest1="eu-west-1",i.EuWest2="eu-west-2",i.EuWest3="eu-west-3",i.SaEast1="sa-east-1",i.UsEast1="us-east-1",i.UsWest1="us-west-1",i.UsWest2="us-west-2"})(Oo||(Oo={}));var gv=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function c(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})};class _v{constructor(e,{headers:t={},customFetch:n,region:s=Oo.Any}={}){this.url=e,this.headers=t,this.region=s,this.fetch=hv(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e,t={}){var n;return gv(this,void 0,void 0,function*(){try{const{headers:s,method:r,body:a}=t;let o={},{region:c}=t;c||(c=this.region),c&&c!=="any"&&(o["x-region"]=c);let l;a&&(s&&!Object.prototype.hasOwnProperty.call(s,"Content-Type")||!s)&&(typeof Blob<"u"&&a instanceof Blob||a instanceof ArrayBuffer?(o["Content-Type"]="application/octet-stream",l=a):typeof a=="string"?(o["Content-Type"]="text/plain",l=a):typeof FormData<"u"&&a instanceof FormData?l=a:(o["Content-Type"]="application/json",l=JSON.stringify(a)));const u=yield this.fetch(`${this.url}/${e}`,{method:r||"POST",headers:Object.assign(Object.assign(Object.assign({},o),this.headers),s),body:l}).catch(g=>{throw new fv(g)}),d=u.headers.get("x-relay-error");if(d&&d==="true")throw new pv(u);if(!u.ok)throw new mv(u);let f=((n=u.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),m;return f==="application/json"?m=yield u.json():f==="application/octet-stream"?m=yield u.blob():f==="text/event-stream"?m=u:f==="multipart/form-data"?m=yield u.formData():m=yield u.text(),{data:m,error:null}}catch(s){return{data:null,error:s}}})}}var Yt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function cx(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}function vv(i){if(i.__esModule)return i;var e=i.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var s=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,s.get?s:{enumerable:!0,get:function(){return i[n]}})}),t}var Xt={},gc={},Xr={},ks={},qr={},Yr={},yv=function(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")},ts=yv();const xv=ts.fetch,Ku=ts.fetch.bind(ts),Ju=ts.Headers,bv=ts.Request,Sv=ts.Response,us=Object.freeze(Object.defineProperty({__proto__:null,Headers:Ju,Request:bv,Response:Sv,default:Ku,fetch:xv},Symbol.toStringTag,{value:"Module"})),Mv=vv(us);var _c={};Object.defineProperty(_c,"__esModule",{value:!0});class Ev extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}}_c.default=Ev;var Zu=Yt&&Yt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Yr,"__esModule",{value:!0});const wv=Zu(Mv),Tv=Zu(_c);let Av=class{constructor(e){this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=e.headers,this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle,e.fetch?this.fetch=e.fetch:typeof fetch>"u"?this.fetch=wv.default:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=Object.assign({},this.headers),this.headers[e]=t,this}then(e,t){this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers["Accept-Profile"]=this.schema:this.headers["Content-Profile"]=this.schema),this.method!=="GET"&&this.method!=="HEAD"&&(this.headers["Content-Type"]="application/json");const n=this.fetch;let s=n(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async r=>{var a,o,c;let l=null,u=null,d=null,f=r.status,m=r.statusText;if(r.ok){if(this.method!=="HEAD"){const p=await r.text();p===""||(this.headers.Accept==="text/csv"||this.headers.Accept&&this.headers.Accept.includes("application/vnd.pgrst.plan+text")?u=p:u=JSON.parse(p))}const y=(a=this.headers.Prefer)===null||a===void 0?void 0:a.match(/count=(exact|planned|estimated)/),h=(o=r.headers.get("content-range"))===null||o===void 0?void 0:o.split("/");y&&h&&h.length>1&&(d=parseInt(h[1])),this.isMaybeSingle&&this.method==="GET"&&Array.isArray(u)&&(u.length>1?(l={code:"PGRST116",details:`Results contain ${u.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},u=null,d=null,f=406,m="Not Acceptable"):u.length===1?u=u[0]:u=null)}else{const y=await r.text();try{l=JSON.parse(y),Array.isArray(l)&&r.status===404&&(u=[],l=null,f=200,m="OK")}catch{r.status===404&&y===""?(f=204,m="No Content"):l={message:y}}if(l&&this.isMaybeSingle&&(!((c=l?.details)===null||c===void 0)&&c.includes("0 rows"))&&(l=null,f=200,m="OK"),l&&this.shouldThrowOnError)throw new Tv.default(l)}return{error:l,data:u,count:d,status:f,statusText:m}});return this.shouldThrowOnError||(s=s.catch(r=>{var a,o,c;return{error:{message:`${(a=r?.name)!==null&&a!==void 0?a:"FetchError"}: ${r?.message}`,details:`${(o=r?.stack)!==null&&o!==void 0?o:""}`,hint:"",code:`${(c=r?.code)!==null&&c!==void 0?c:""}`},data:null,count:null,status:0,statusText:""}})),s.then(e,t)}};Yr.default=Av;var Cv=Yt&&Yt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(qr,"__esModule",{value:!0});const Rv=Cv(Yr);let Pv=class extends Rv.default{select(e){let t=!1;const n=(e??"*").split("").map(s=>/\s/.test(s)&&!t?"":(s==='"'&&(t=!t),s)).join("");return this.url.searchParams.set("select",n),this.headers.Prefer&&(this.headers.Prefer+=","),this.headers.Prefer+="return=representation",this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:s,referencedTable:r=s}={}){const a=r?`${r}.order`:"order",o=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${o?`${o},`:""}${e}.${t?"asc":"desc"}${n===void 0?"":n?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){const s=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:s=n}={}){const r=typeof s>"u"?"offset":`${s}.offset`,a=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(r,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.Accept="application/vnd.pgrst.object+json",this}maybeSingle(){return this.method==="GET"?this.headers.Accept="application/json":this.headers.Accept="application/vnd.pgrst.object+json",this.isMaybeSingle=!0,this}csv(){return this.headers.Accept="text/csv",this}geojson(){return this.headers.Accept="application/geo+json",this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:s=!1,wal:r=!1,format:a="text"}={}){var o;const c=[e?"analyze":null,t?"verbose":null,n?"settings":null,s?"buffers":null,r?"wal":null].filter(Boolean).join("|"),l=(o=this.headers.Accept)!==null&&o!==void 0?o:"application/json";return this.headers.Accept=`application/vnd.pgrst.plan+${a}; for="${l}"; options=${c};`,a==="json"?this:this}rollback(){var e;return((e=this.headers.Prefer)!==null&&e!==void 0?e:"").trim().length>0?this.headers.Prefer+=",tx=rollback":this.headers.Prefer="tx=rollback",this}returns(){return this}};qr.default=Pv;var Lv=Yt&&Yt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(ks,"__esModule",{value:!0});const Iv=Lv(qr);let Dv=class extends Iv.default{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}in(e,t){const n=Array.from(new Set(t)).map(s=>typeof s=="string"&&new RegExp("[,()]").test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(e,`in.(${n})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:n,type:s}={}){let r="";s==="plain"?r="pl":s==="phrase"?r="ph":s==="websearch"&&(r="w");const a=n===void 0?"":`(${n})`;return this.url.searchParams.append(e,`${r}fts${a}.${t}`),this}match(e){return Object.entries(e).forEach(([t,n])=>{this.url.searchParams.append(t,`eq.${n}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){const s=n?`${n}.or`:"or";return this.url.searchParams.append(s,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}};ks.default=Dv;var Uv=Yt&&Yt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Xr,"__esModule",{value:!0});const bs=Uv(ks);let Nv=class{constructor(e,{headers:t={},schema:n,fetch:s}){this.url=e,this.headers=t,this.schema=n,this.fetch=s}select(e,{head:t=!1,count:n}={}){const s=t?"HEAD":"GET";let r=!1;const a=(e??"*").split("").map(o=>/\s/.test(o)&&!r?"":(o==='"'&&(r=!r),o)).join("");return this.url.searchParams.set("select",a),n&&(this.headers.Prefer=`count=${n}`),new bs.default({method:s,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}insert(e,{count:t,defaultToNull:n=!0}={}){const s="POST",r=[];if(this.headers.Prefer&&r.push(this.headers.Prefer),t&&r.push(`count=${t}`),n||r.push("missing=default"),this.headers.Prefer=r.join(","),Array.isArray(e)){const a=e.reduce((o,c)=>o.concat(Object.keys(c)),[]);if(a.length>0){const o=[...new Set(a)].map(c=>`"${c}"`);this.url.searchParams.set("columns",o.join(","))}}return new bs.default({method:s,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:s,defaultToNull:r=!0}={}){const a="POST",o=[`resolution=${n?"ignore":"merge"}-duplicates`];if(t!==void 0&&this.url.searchParams.set("on_conflict",t),this.headers.Prefer&&o.push(this.headers.Prefer),s&&o.push(`count=${s}`),r||o.push("missing=default"),this.headers.Prefer=o.join(","),Array.isArray(e)){const c=e.reduce((l,u)=>l.concat(Object.keys(u)),[]);if(c.length>0){const l=[...new Set(c)].map(u=>`"${u}"`);this.url.searchParams.set("columns",l.join(","))}}return new bs.default({method:a,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}update(e,{count:t}={}){const n="PATCH",s=[];return this.headers.Prefer&&s.push(this.headers.Prefer),t&&s.push(`count=${t}`),this.headers.Prefer=s.join(","),new bs.default({method:n,url:this.url,headers:this.headers,schema:this.schema,body:e,fetch:this.fetch,allowEmpty:!1})}delete({count:e}={}){const t="DELETE",n=[];return e&&n.push(`count=${e}`),this.headers.Prefer&&n.unshift(this.headers.Prefer),this.headers.Prefer=n.join(","),new bs.default({method:t,url:this.url,headers:this.headers,schema:this.schema,fetch:this.fetch,allowEmpty:!1})}};Xr.default=Nv;var Kr={},Jr={};Object.defineProperty(Jr,"__esModule",{value:!0});Jr.version=void 0;Jr.version="0.0.0-automated";Object.defineProperty(Kr,"__esModule",{value:!0});Kr.DEFAULT_HEADERS=void 0;const Ov=Jr;Kr.DEFAULT_HEADERS={"X-Client-Info":`postgrest-js/${Ov.version}`};var Qu=Yt&&Yt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(gc,"__esModule",{value:!0});const Fv=Qu(Xr),kv=Qu(ks),Bv=Kr;let zv=class ed{constructor(e,{headers:t={},schema:n,fetch:s}={}){this.url=e,this.headers=Object.assign(Object.assign({},Bv.DEFAULT_HEADERS),t),this.schemaName=n,this.fetch=s}from(e){const t=new URL(`${this.url}/${e}`);return new Fv.default(t,{headers:Object.assign({},this.headers),schema:this.schemaName,fetch:this.fetch})}schema(e){return new ed(this.url,{headers:this.headers,schema:e,fetch:this.fetch})}rpc(e,t={},{head:n=!1,get:s=!1,count:r}={}){let a;const o=new URL(`${this.url}/rpc/${e}`);let c;n||s?(a=n?"HEAD":"GET",Object.entries(t).filter(([u,d])=>d!==void 0).map(([u,d])=>[u,Array.isArray(d)?`{${d.join(",")}}`:`${d}`]).forEach(([u,d])=>{o.searchParams.append(u,d)})):(a="POST",c=t);const l=Object.assign({},this.headers);return r&&(l.Prefer=`count=${r}`),new kv.default({method:a,url:o,headers:l,schema:this.schemaName,body:c,fetch:this.fetch,allowEmpty:!1})}};gc.default=zv;var Bs=Yt&&Yt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Xt,"__esModule",{value:!0});Xt.PostgrestBuilder=Xt.PostgrestTransformBuilder=Xt.PostgrestFilterBuilder=Xt.PostgrestQueryBuilder=Xt.PostgrestClient=void 0;const td=Bs(gc);Xt.PostgrestClient=td.default;const nd=Bs(Xr);Xt.PostgrestQueryBuilder=nd.default;const id=Bs(ks);Xt.PostgrestFilterBuilder=id.default;const sd=Bs(qr);Xt.PostgrestTransformBuilder=sd.default;const rd=Bs(Yr);Xt.PostgrestBuilder=rd.default;var Hv=Xt.default={PostgrestClient:td.default,PostgrestQueryBuilder:nd.default,PostgrestFilterBuilder:id.default,PostgrestTransformBuilder:sd.default,PostgrestBuilder:rd.default};const{PostgrestClient:Vv,PostgrestQueryBuilder:fx,PostgrestFilterBuilder:px,PostgrestTransformBuilder:mx,PostgrestBuilder:gx}=Hv,Gv="2.10.2",$v={"X-Client-Info":`realtime-js/${Gv}`},Wv="1.0.0",ad=1e4,jv=1e3;var ji;(function(i){i[i.connecting=0]="connecting",i[i.open=1]="open",i[i.closing=2]="closing",i[i.closed=3]="closed"})(ji||(ji={}));var Vt;(function(i){i.closed="closed",i.errored="errored",i.joined="joined",i.joining="joining",i.leaving="leaving"})(Vt||(Vt={}));var rn;(function(i){i.close="phx_close",i.error="phx_error",i.join="phx_join",i.reply="phx_reply",i.leave="phx_leave",i.access_token="access_token"})(rn||(rn={}));var Fo;(function(i){i.websocket="websocket"})(Fo||(Fo={}));var di;(function(i){i.Connecting="connecting",i.Open="open",i.Closing="closing",i.Closed="closed"})(di||(di={}));class Xv{constructor(){this.HEADER_LENGTH=1}decode(e,t){return e.constructor===ArrayBuffer?t(this._binaryDecode(e)):t(typeof e=="string"?JSON.parse(e):{})}_binaryDecode(e){const t=new DataView(e),n=new TextDecoder;return this._decodeBroadcast(e,t,n)}_decodeBroadcast(e,t,n){const s=t.getUint8(1),r=t.getUint8(2);let a=this.HEADER_LENGTH+2;const o=n.decode(e.slice(a,a+s));a=a+s;const c=n.decode(e.slice(a,a+r));a=a+r;const l=JSON.parse(n.decode(e.slice(a,e.byteLength)));return{ref:null,topic:o,event:c,payload:l}}}class od{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var ot;(function(i){i.abstime="abstime",i.bool="bool",i.date="date",i.daterange="daterange",i.float4="float4",i.float8="float8",i.int2="int2",i.int4="int4",i.int4range="int4range",i.int8="int8",i.int8range="int8range",i.json="json",i.jsonb="jsonb",i.money="money",i.numeric="numeric",i.oid="oid",i.reltime="reltime",i.text="text",i.time="time",i.timestamp="timestamp",i.timestamptz="timestamptz",i.timetz="timetz",i.tsrange="tsrange",i.tstzrange="tstzrange"})(ot||(ot={}));const zl=(i,e,t={})=>{var n;const s=(n=t.skipTypes)!==null&&n!==void 0?n:[];return Object.keys(e).reduce((r,a)=>(r[a]=qv(a,i,e,s),r),{})},qv=(i,e,t,n)=>{const s=e.find(o=>o.name===i),r=s?.type,a=t[i];return r&&!n.includes(r)?cd(r,a):ko(a)},cd=(i,e)=>{if(i.charAt(0)==="_"){const t=i.slice(1,i.length);return Zv(e,t)}switch(i){case ot.bool:return Yv(e);case ot.float4:case ot.float8:case ot.int2:case ot.int4:case ot.int8:case ot.numeric:case ot.oid:return Kv(e);case ot.json:case ot.jsonb:return Jv(e);case ot.timestamp:return Qv(e);case ot.abstime:case ot.date:case ot.daterange:case ot.int4range:case ot.int8range:case ot.money:case ot.reltime:case ot.text:case ot.time:case ot.timestamptz:case ot.timetz:case ot.tsrange:case ot.tstzrange:return ko(e);default:return ko(e)}},ko=i=>i,Yv=i=>{switch(i){case"t":return!0;case"f":return!1;default:return i}},Kv=i=>{if(typeof i=="string"){const e=parseFloat(i);if(!Number.isNaN(e))return e}return i},Jv=i=>{if(typeof i=="string")try{return JSON.parse(i)}catch(e){return console.log(`JSON parse error: ${e}`),i}return i},Zv=(i,e)=>{if(typeof i!="string")return i;const t=i.length-1,n=i[t];if(i[0]==="{"&&n==="}"){let r;const a=i.slice(1,t);try{r=JSON.parse("["+a+"]")}catch{r=a?a.split(","):[]}return r.map(o=>cd(e,o))}return i},Qv=i=>typeof i=="string"?i.replace(" ","T"):i,ld=i=>{let e=i;return e=e.replace(/^ws/i,"http"),e=e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i,""),e.replace(/\/+$/,"")};class za{constructor(e,t,n={},s=ad){this.channel=e,this.event=t,this.payload=n,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var n;return this._hasReceived(e)&&t((n=this.receivedResp)===null||n===void 0?void 0:n.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(n=>n.status===e).forEach(n=>n.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var Hl;(function(i){i.SYNC="sync",i.JOIN="join",i.LEAVE="leave"})(Hl||(Hl={}));class Rs{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const n=t?.events||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},s=>{const{onJoin:r,onLeave:a,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Rs.syncState(this.state,s,r,a),this.pendingDiffs.forEach(c=>{this.state=Rs.syncDiff(this.state,c,r,a)}),this.pendingDiffs=[],o()}),this.channel._on(n.diff,{},s=>{const{onJoin:r,onLeave:a,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=Rs.syncDiff(this.state,s,r,a),o())}),this.onJoin((s,r,a)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:r,newPresences:a})}),this.onLeave((s,r,a)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:r,leftPresences:a})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,n,s){const r=this.cloneDeep(e),a=this.transformState(t),o={},c={};return this.map(r,(l,u)=>{a[l]||(c[l]=u)}),this.map(a,(l,u)=>{const d=r[l];if(d){const f=u.map(h=>h.presence_ref),m=d.map(h=>h.presence_ref),g=u.filter(h=>m.indexOf(h.presence_ref)<0),y=d.filter(h=>f.indexOf(h.presence_ref)<0);g.length>0&&(o[l]=g),y.length>0&&(c[l]=y)}else o[l]=u}),this.syncDiff(r,{joins:o,leaves:c},n,s)}static syncDiff(e,t,n,s){const{joins:r,leaves:a}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return n||(n=()=>{}),s||(s=()=>{}),this.map(r,(o,c)=>{var l;const u=(l=e[o])!==null&&l!==void 0?l:[];if(e[o]=this.cloneDeep(c),u.length>0){const d=e[o].map(m=>m.presence_ref),f=u.filter(m=>d.indexOf(m.presence_ref)<0);e[o].unshift(...f)}n(o,u,c)}),this.map(a,(o,c)=>{let l=e[o];if(!l)return;const u=c.map(d=>d.presence_ref);l=l.filter(d=>u.indexOf(d.presence_ref)<0),e[o]=l,s(o,l,c),l.length===0&&delete e[o]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(n=>t(n,e[n]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,n)=>{const s=e[n];return"metas"in s?t[n]=s.metas.map(r=>(r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r)):t[n]=s,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var Vl;(function(i){i.ALL="*",i.INSERT="INSERT",i.UPDATE="UPDATE",i.DELETE="DELETE"})(Vl||(Vl={}));var Gl;(function(i){i.BROADCAST="broadcast",i.PRESENCE="presence",i.POSTGRES_CHANGES="postgres_changes"})(Gl||(Gl={}));var $l;(function(i){i.SUBSCRIBED="SUBSCRIBED",i.TIMED_OUT="TIMED_OUT",i.CLOSED="CLOSED",i.CHANNEL_ERROR="CHANNEL_ERROR"})($l||($l={}));class vc{constructor(e,t={config:{}},n){this.topic=e,this.params=t,this.socket=n,this.bindings={},this.state=Vt.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:""},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new za(this,rn.join,this.params,this.timeout),this.rejoinTimer=new od(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=Vt.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=Vt.closed,this.socket._remove(this)}),this._onError(s=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,s),this.state=Vt.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=Vt.errored,this.rejoinTimer.scheduleTimeout())}),this._on(rn.reply,{},(s,r)=>{this._trigger(this._replyEventName(r),s)}),this.presence=new Rs(this),this.broadcastEndpointURL=ld(this.socket.endPoint)+"/api/broadcast"}subscribe(e,t=this.timeout){var n,s;if(this.socket.isConnected()||this.socket.connect(),this.joinedOnce)throw"tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";{const{config:{broadcast:r,presence:a,private:o}}=this.params;this._onError(u=>e&&e("CHANNEL_ERROR",u)),this._onClose(()=>e&&e("CLOSED"));const c={},l={broadcast:r,presence:a,postgres_changes:(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(u=>u.filter))!==null&&s!==void 0?s:[],private:o};this.socket.accessToken&&(c.access_token=this.socket.accessToken),this.updateJoinPayload(Object.assign({config:l},c)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",({postgres_changes:u})=>{var d;if(this.socket.accessToken&&this.socket.setAuth(this.socket.accessToken),u===void 0){e&&e("SUBSCRIBED");return}else{const f=this.bindings.postgres_changes,m=(d=f?.length)!==null&&d!==void 0?d:0,g=[];for(let y=0;y<m;y++){const h=f[y],{filter:{event:p,schema:T,table:b,filter:E}}=h,U=u&&u[y];if(U&&U.event===p&&U.schema===T&&U.table===b&&U.filter===E)g.push(Object.assign(Object.assign({},h),{id:U.id}));else{this.unsubscribe(),e&&e("CHANNEL_ERROR",new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=g,e&&e("SUBSCRIBED");return}}).receive("error",u=>{e&&e("CHANNEL_ERROR",new Error(JSON.stringify(Object.values(u).join(", ")||"error")))}).receive("timeout",()=>{e&&e("TIMED_OUT")})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,n){return this._on(e,t,n)}async send(e,t={}){var n,s;if(!this._canPush()&&e.type==="broadcast"){const{event:r,payload:a}=e,o={method:"POST",headers:{Authorization:this.socket.accessToken?`Bearer ${this.socket.accessToken}`:"",apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"},body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:a}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,o,(n=t.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=c.body)===null||s===void 0?void 0:s.cancel()),c.ok?"ok":"error"}catch(c){return c.name==="AbortError"?"timed out":"error"}}else return new Promise(r=>{var a,o,c;const l=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((c=(o=(a=this.params)===null||a===void 0?void 0:a.config)===null||o===void 0?void 0:o.broadcast)===null||c===void 0)&&c.ack)&&r("ok"),l.receive("ok",()=>r("ok")),l.receive("error",()=>r("error")),l.receive("timeout",()=>r("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=Vt.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(rn.close,"leave",this._joinRef())};return this.rejoinTimer.reset(),this.joinPush.destroy(),new Promise(n=>{const s=new za(this,rn.leave,{},e);s.receive("ok",()=>{t(),n("ok")}).receive("timeout",()=>{t(),n("timed out")}).receive("error",()=>{n("error")}),s.send(),this._canPush()||s.trigger("ok",{})})}async _fetchWithTimeout(e,t,n){const s=new AbortController,r=setTimeout(()=>s.abort(),n),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:s.signal}));return clearTimeout(r),a}_push(e,t,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new za(this,e,t,n);return this._canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}_onMessage(e,t,n){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,n){var s,r;const a=e.toLocaleLowerCase(),{close:o,error:c,leave:l,join:u}=rn;if(n&&[o,c,l,u].indexOf(a)>=0&&n!==this._joinRef())return;let f=this._onMessage(a,t,n);if(t&&!f)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(a)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(m=>{var g,y,h;return((g=m.filter)===null||g===void 0?void 0:g.event)==="*"||((h=(y=m.filter)===null||y===void 0?void 0:y.event)===null||h===void 0?void 0:h.toLocaleLowerCase())===a}).map(m=>m.callback(f,n)):(r=this.bindings[a])===null||r===void 0||r.filter(m=>{var g,y,h,p,T,b;if(["broadcast","presence","postgres_changes"].includes(a))if("id"in m){const E=m.id,U=(g=m.filter)===null||g===void 0?void 0:g.event;return E&&((y=t.ids)===null||y===void 0?void 0:y.includes(E))&&(U==="*"||U?.toLocaleLowerCase()===((h=t.data)===null||h===void 0?void 0:h.type.toLocaleLowerCase()))}else{const E=(T=(p=m?.filter)===null||p===void 0?void 0:p.event)===null||T===void 0?void 0:T.toLocaleLowerCase();return E==="*"||E===((b=t?.event)===null||b===void 0?void 0:b.toLocaleLowerCase())}else return m.type.toLocaleLowerCase()===a}).map(m=>{if(typeof f=="object"&&"ids"in f){const g=f.data,{schema:y,table:h,commit_timestamp:p,type:T,errors:b}=g;f=Object.assign(Object.assign({},{schema:y,table:h,commit_timestamp:p,eventType:T,new:{},old:{},errors:b}),this._getPayloadRecords(g))}m.callback(f,n)})}_isClosed(){return this.state===Vt.closed}_isJoined(){return this.state===Vt.joined}_isJoining(){return this.state===Vt.joining}_isLeaving(){return this.state===Vt.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,n){const s=e.toLocaleLowerCase(),r={type:s,filter:t,callback:n};return this.bindings[s]?this.bindings[s].push(r):this.bindings[s]=[r],this}_off(e,t){const n=e.toLocaleLowerCase();return this.bindings[n]=this.bindings[n].filter(s=>{var r;return!(((r=s.type)===null||r===void 0?void 0:r.toLocaleLowerCase())===n&&vc.isEqual(s.filter,t))}),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(e[n]!==t[n])return!1;return!0}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(rn.close,{},e)}_onError(e){this._on(rn.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=Vt.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=zl(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=zl(e.columns,e.old_record)),t}}const e0=()=>{},t0=typeof WebSocket<"u";class n0{constructor(e,t){var n;this.accessToken=null,this.apiKey=null,this.channels=[],this.endPoint="",this.httpEndpoint="",this.headers=$v,this.params={},this.timeout=ad,this.heartbeatIntervalMs=3e4,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.ref=0,this.logger=e0,this.conn=null,this.sendBuffer=[],this.serializer=new Xv,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this._resolveFetch=r=>{let a;return r?a=r:typeof fetch>"u"?a=(...o)=>es(async()=>{const{default:c}=await Promise.resolve().then(()=>us);return{default:c}},void 0,import.meta.url).then(({default:c})=>c(...o)):a=fetch,(...o)=>a(...o)},this.endPoint=`${e}/${Fo.websocket}`,this.httpEndpoint=ld(e),t?.transport?this.transport=t.transport:this.transport=null,t?.params&&(this.params=t.params),t?.headers&&(this.headers=Object.assign(Object.assign({},this.headers),t.headers)),t?.timeout&&(this.timeout=t.timeout),t?.logger&&(this.logger=t.logger),t?.heartbeatIntervalMs&&(this.heartbeatIntervalMs=t.heartbeatIntervalMs);const s=(n=t?.params)===null||n===void 0?void 0:n.apikey;s&&(this.accessToken=s,this.apiKey=s),this.reconnectAfterMs=t?.reconnectAfterMs?t.reconnectAfterMs:r=>[1e3,2e3,5e3,1e4][r-1]||1e4,this.encode=t?.encode?t.encode:(r,a)=>a(JSON.stringify(r)),this.decode=t?.decode?t.decode:this.serializer.decode.bind(this.serializer),this.reconnectTimer=new od(async()=>{this.disconnect(),this.connect()},this.reconnectAfterMs),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!this.conn){if(this.transport){this.conn=new this.transport(this._endPointURL(),void 0,{headers:this.headers});return}if(t0){this.conn=new WebSocket(this._endPointURL()),this.setupConnection();return}this.conn=new i0(this._endPointURL(),void 0,{close:()=>{this.conn=null}}),es(async()=>{const{default:e}=await import("./browser-D6Hp6uxt.js").then(t=>t.b);return{default:e}},[],import.meta.url).then(({default:e})=>{this.conn=new e(this._endPointURL(),void 0,{headers:this.headers}),this.setupConnection()})}}disconnect(e,t){this.conn&&(this.conn.onclose=function(){},e?this.conn.close(e,t??""):this.conn.close(),this.conn=null,this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.reset())}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.disconnect(),e}log(e,t,n){this.logger(e,t,n)}connectionState(){switch(this.conn&&this.conn.readyState){case ji.connecting:return di.Connecting;case ji.open:return di.Open;case ji.closing:return di.Closing;default:return di.Closed}}isConnected(){return this.connectionState()===di.Open}channel(e,t={config:{}}){const n=new vc(`realtime:${e}`,t,this);return this.channels.push(n),n}push(e){const{topic:t,event:n,payload:s,ref:r}=e,a=()=>{this.encode(e,o=>{var c;(c=this.conn)===null||c===void 0||c.send(o)})};this.log("push",`${t} ${n} (${r})`,s),this.isConnected()?a():this.sendBuffer.push(a)}setAuth(e){this.accessToken=e,this.channels.forEach(t=>{e&&t.updateJoinPayload({access_token:e}),t.joinedOnce&&t._isJoined()&&t._push(rn.access_token,{access_token:e})})}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(n=>n.topic===e&&(n._isJoined()||n._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t._joinRef()!==e._joinRef())}setupConnection(){this.conn&&(this.conn.binaryType="arraybuffer",this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e))}_endPointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:Wv}))}_onConnMessage(e){this.decode(e.data,t=>{let{topic:n,event:s,payload:r,ref:a}=t;(a&&a===this.pendingHeartbeatRef||s===r?.type)&&(this.pendingHeartbeatRef=null),this.log("receive",`${r.status||""} ${n} ${s} ${a&&"("+a+")"||""}`,r),this.channels.filter(o=>o._isMember(n)).forEach(o=>o._trigger(s,r,a)),this.stateChangeCallbacks.message.forEach(o=>o(t))})}_onConnOpen(){this.log("transport",`connected to ${this._endPointURL()}`),this._flushSendBuffer(),this.reconnectTimer.reset(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this._sendHeartbeat(),this.heartbeatIntervalMs),this.stateChangeCallbacks.open.forEach(e=>e())}_onConnClose(e){this.log("transport","close",e),this._triggerChanError(),this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(t=>t(e))}_onConnError(e){this.log("transport",e.message),this._triggerChanError(),this.stateChangeCallbacks.error.forEach(t=>t(e))}_triggerChanError(){this.channels.forEach(e=>e._trigger(rn.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const n=e.match(/\?/)?"&":"?",s=new URLSearchParams(t);return`${e}${n}${s}`}_flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_sendHeartbeat(){var e;if(this.isConnected()){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection"),(e=this.conn)===null||e===void 0||e.close(jv,"hearbeat timeout");return}this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef}),this.setAuth(this.accessToken)}}}class i0{constructor(e,t,n){this.binaryType="arraybuffer",this.onclose=()=>{},this.onerror=()=>{},this.onmessage=()=>{},this.onopen=()=>{},this.readyState=ji.connecting,this.send=()=>{},this.url=null,this.url=e,this.close=n.close}}class yc extends Error{constructor(e){super(e),this.__isStorageError=!0,this.name="StorageError"}}function vt(i){return typeof i=="object"&&i!==null&&"__isStorageError"in i}class s0 extends yc{constructor(e,t){super(e),this.name="StorageApiError",this.status=t}toJSON(){return{name:this.name,message:this.message,status:this.status}}}class Bo extends yc{constructor(e,t){super(e),this.name="StorageUnknownError",this.originalError=t}}var r0=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function c(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})};const ud=i=>{let e;return i?e=i:typeof fetch>"u"?e=(...t)=>es(async()=>{const{default:n}=await Promise.resolve().then(()=>us);return{default:n}},void 0,import.meta.url).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)},a0=()=>r0(void 0,void 0,void 0,function*(){return typeof Response>"u"?(yield es(()=>Promise.resolve().then(()=>us),void 0,import.meta.url)).Response:Response}),zo=i=>{if(Array.isArray(i))return i.map(t=>zo(t));if(typeof i=="function"||i!==Object(i))return i;const e={};return Object.entries(i).forEach(([t,n])=>{const s=t.replace(/([-_][a-z])/gi,r=>r.toUpperCase().replace(/[-_]/g,""));e[s]=zo(n)}),e};var yi=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function c(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})};const Ha=i=>i.msg||i.message||i.error_description||i.error||JSON.stringify(i),o0=(i,e,t)=>yi(void 0,void 0,void 0,function*(){const n=yield a0();i instanceof n&&!t?.noResolveJson?i.json().then(s=>{e(new s0(Ha(s),i.status||500))}).catch(s=>{e(new Bo(Ha(s),s))}):e(new Bo(Ha(i),i))}),c0=(i,e,t,n)=>{const s={method:i,headers:e?.headers||{}};return i==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json"},e?.headers),n&&(s.body=JSON.stringify(n)),Object.assign(Object.assign({},s),t))};function zs(i,e,t,n,s,r){return yi(this,void 0,void 0,function*(){return new Promise((a,o)=>{i(t,c0(e,n,s,r)).then(c=>{if(!c.ok)throw c;return n?.noResolveJson?c:c.json()}).then(c=>a(c)).catch(c=>o0(c,o,n))})})}function Nr(i,e,t,n){return yi(this,void 0,void 0,function*(){return zs(i,"GET",e,t,n)})}function kn(i,e,t,n,s){return yi(this,void 0,void 0,function*(){return zs(i,"POST",e,n,s,t)})}function l0(i,e,t,n,s){return yi(this,void 0,void 0,function*(){return zs(i,"PUT",e,n,s,t)})}function u0(i,e,t,n){return yi(this,void 0,void 0,function*(){return zs(i,"HEAD",e,Object.assign(Object.assign({},t),{noResolveJson:!0}),n)})}function dd(i,e,t,n,s){return yi(this,void 0,void 0,function*(){return zs(i,"DELETE",e,n,s,t)})}var Dt=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function c(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})};const d0={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Wl={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class h0{constructor(e,t={},n,s){this.url=e,this.headers=t,this.bucketId=n,this.fetch=ud(s)}uploadOrUpdate(e,t,n,s){return Dt(this,void 0,void 0,function*(){try{let r;const a=Object.assign(Object.assign({},Wl),s);let o=Object.assign(Object.assign({},this.headers),e==="POST"&&{"x-upsert":String(a.upsert)});const c=a.metadata;typeof Blob<"u"&&n instanceof Blob?(r=new FormData,r.append("cacheControl",a.cacheControl),r.append("",n),c&&r.append("metadata",this.encodeMetadata(c))):typeof FormData<"u"&&n instanceof FormData?(r=n,r.append("cacheControl",a.cacheControl),c&&r.append("metadata",this.encodeMetadata(c))):(r=n,o["cache-control"]=`max-age=${a.cacheControl}`,o["content-type"]=a.contentType,c&&(o["x-metadata"]=this.toBase64(this.encodeMetadata(c)))),s?.headers&&(o=Object.assign(Object.assign({},o),s.headers));const l=this._removeEmptyFolders(t),u=this._getFinalPath(l),d=yield this.fetch(`${this.url}/object/${u}`,Object.assign({method:e,body:r,headers:o},a?.duplex?{duplex:a.duplex}:{})),f=yield d.json();return d.ok?{data:{path:l,id:f.Id,fullPath:f.Key},error:null}:{data:null,error:f}}catch(r){if(vt(r))return{data:null,error:r};throw r}})}upload(e,t,n){return Dt(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",e,t,n)})}uploadToSignedUrl(e,t,n,s){return Dt(this,void 0,void 0,function*(){const r=this._removeEmptyFolders(e),a=this._getFinalPath(r),o=new URL(this.url+`/object/upload/sign/${a}`);o.searchParams.set("token",t);try{let c;const l=Object.assign({upsert:Wl.upsert},s),u=Object.assign(Object.assign({},this.headers),{"x-upsert":String(l.upsert)});typeof Blob<"u"&&n instanceof Blob?(c=new FormData,c.append("cacheControl",l.cacheControl),c.append("",n)):typeof FormData<"u"&&n instanceof FormData?(c=n,c.append("cacheControl",l.cacheControl)):(c=n,u["cache-control"]=`max-age=${l.cacheControl}`,u["content-type"]=l.contentType);const d=yield this.fetch(o.toString(),{method:"PUT",body:c,headers:u}),f=yield d.json();return d.ok?{data:{path:r,fullPath:f.Key},error:null}:{data:null,error:f}}catch(c){if(vt(c))return{data:null,error:c};throw c}})}createSignedUploadUrl(e,t){return Dt(this,void 0,void 0,function*(){try{let n=this._getFinalPath(e);const s=Object.assign({},this.headers);t?.upsert&&(s["x-upsert"]="true");const r=yield kn(this.fetch,`${this.url}/object/upload/sign/${n}`,{},{headers:s}),a=new URL(this.url+r.url),o=a.searchParams.get("token");if(!o)throw new yc("No token returned by API");return{data:{signedUrl:a.toString(),path:e,token:o},error:null}}catch(n){if(vt(n))return{data:null,error:n};throw n}})}update(e,t,n){return Dt(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",e,t,n)})}move(e,t,n){return Dt(this,void 0,void 0,function*(){try{return{data:yield kn(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket},{headers:this.headers}),error:null}}catch(s){if(vt(s))return{data:null,error:s};throw s}})}copy(e,t,n){return Dt(this,void 0,void 0,function*(){try{return{data:{path:(yield kn(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n?.destinationBucket},{headers:this.headers})).Key},error:null}}catch(s){if(vt(s))return{data:null,error:s};throw s}})}createSignedUrl(e,t,n){return Dt(this,void 0,void 0,function*(){try{let s=this._getFinalPath(e),r=yield kn(this.fetch,`${this.url}/object/sign/${s}`,Object.assign({expiresIn:t},n?.transform?{transform:n.transform}:{}),{headers:this.headers});const a=n?.download?`&download=${n.download===!0?"":n.download}`:"";return r={signedUrl:encodeURI(`${this.url}${r.signedURL}${a}`)},{data:r,error:null}}catch(s){if(vt(s))return{data:null,error:s};throw s}})}createSignedUrls(e,t,n){return Dt(this,void 0,void 0,function*(){try{const s=yield kn(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:t,paths:e},{headers:this.headers}),r=n?.download?`&download=${n.download===!0?"":n.download}`:"";return{data:s.map(a=>Object.assign(Object.assign({},a),{signedUrl:a.signedURL?encodeURI(`${this.url}${a.signedURL}${r}`):null})),error:null}}catch(s){if(vt(s))return{data:null,error:s};throw s}})}download(e,t){return Dt(this,void 0,void 0,function*(){const s=typeof t?.transform<"u"?"render/image/authenticated":"object",r=this.transformOptsToQueryString(t?.transform||{}),a=r?`?${r}`:"";try{const o=this._getFinalPath(e);return{data:yield(yield Nr(this.fetch,`${this.url}/${s}/${o}${a}`,{headers:this.headers,noResolveJson:!0})).blob(),error:null}}catch(o){if(vt(o))return{data:null,error:o};throw o}})}info(e){return Dt(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{const n=yield Nr(this.fetch,`${this.url}/object/info/${t}`,{headers:this.headers});return{data:zo(n),error:null}}catch(n){if(vt(n))return{data:null,error:n};throw n}})}exists(e){return Dt(this,void 0,void 0,function*(){const t=this._getFinalPath(e);try{return yield u0(this.fetch,`${this.url}/object/${t}`,{headers:this.headers}),{data:!0,error:null}}catch(n){if(vt(n)&&n instanceof Bo){const s=n.originalError;if([400,404].includes(s?.status))return{data:!1,error:n}}throw n}})}getPublicUrl(e,t){const n=this._getFinalPath(e),s=[],r=t?.download?`download=${t.download===!0?"":t.download}`:"";r!==""&&s.push(r);const o=typeof t?.transform<"u"?"render/image":"object",c=this.transformOptsToQueryString(t?.transform||{});c!==""&&s.push(c);let l=s.join("&");return l!==""&&(l=`?${l}`),{data:{publicUrl:encodeURI(`${this.url}/${o}/public/${n}${l}`)}}}remove(e){return Dt(this,void 0,void 0,function*(){try{return{data:yield dd(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:e},{headers:this.headers}),error:null}}catch(t){if(vt(t))return{data:null,error:t};throw t}})}list(e,t,n){return Dt(this,void 0,void 0,function*(){try{const s=Object.assign(Object.assign(Object.assign({},d0),t),{prefix:e||""});return{data:yield kn(this.fetch,`${this.url}/object/list/${this.bucketId}`,s,{headers:this.headers},n),error:null}}catch(s){if(vt(s))return{data:null,error:s};throw s}})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}}const f0="2.7.0",p0={"X-Client-Info":`storage-js/${f0}`};var ki=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function c(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})};class m0{constructor(e,t={},n){this.url=e,this.headers=Object.assign(Object.assign({},p0),t),this.fetch=ud(n)}listBuckets(){return ki(this,void 0,void 0,function*(){try{return{data:yield Nr(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(e){if(vt(e))return{data:null,error:e};throw e}})}getBucket(e){return ki(this,void 0,void 0,function*(){try{return{data:yield Nr(this.fetch,`${this.url}/bucket/${e}`,{headers:this.headers}),error:null}}catch(t){if(vt(t))return{data:null,error:t};throw t}})}createBucket(e,t={public:!1}){return ki(this,void 0,void 0,function*(){try{return{data:yield kn(this.fetch,`${this.url}/bucket`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(vt(n))return{data:null,error:n};throw n}})}updateBucket(e,t){return ki(this,void 0,void 0,function*(){try{return{data:yield l0(this.fetch,`${this.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:this.headers}),error:null}}catch(n){if(vt(n))return{data:null,error:n};throw n}})}emptyBucket(e){return ki(this,void 0,void 0,function*(){try{return{data:yield kn(this.fetch,`${this.url}/bucket/${e}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(vt(t))return{data:null,error:t};throw t}})}deleteBucket(e){return ki(this,void 0,void 0,function*(){try{return{data:yield dd(this.fetch,`${this.url}/bucket/${e}`,{},{headers:this.headers}),error:null}}catch(t){if(vt(t))return{data:null,error:t};throw t}})}}class g0 extends m0{constructor(e,t={},n){super(e,t,n)}from(e){return new h0(this.url,this.headers,e,this.fetch)}}const _0="2.45.4";let As="";typeof Deno<"u"?As="deno":typeof document<"u"?As="web":typeof navigator<"u"&&navigator.product==="ReactNative"?As="react-native":As="node";const v0={"X-Client-Info":`supabase-js-${As}/${_0}`},y0={headers:v0},x0={schema:"public"},b0={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},S0={};var M0=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function c(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})};const E0=i=>{let e;return i?e=i:typeof fetch>"u"?e=Ku:e=fetch,(...t)=>e(...t)},w0=()=>typeof Headers>"u"?Ju:Headers,T0=(i,e,t)=>{const n=E0(t),s=w0();return(r,a)=>M0(void 0,void 0,void 0,function*(){var o;const c=(o=yield e())!==null&&o!==void 0?o:i;let l=new s(a?.headers);return l.has("apikey")||l.set("apikey",i),l.has("Authorization")||l.set("Authorization",`Bearer ${c}`),n(r,Object.assign(Object.assign({},a),{headers:l}))})};var A0=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function c(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})};function C0(i){return i.replace(/\/$/,"")}function R0(i,e){const{db:t,auth:n,realtime:s,global:r}=i,{db:a,auth:o,realtime:c,global:l}=e,u={db:Object.assign(Object.assign({},a),t),auth:Object.assign(Object.assign({},o),n),realtime:Object.assign(Object.assign({},c),s),global:Object.assign(Object.assign({},l),r),accessToken:()=>A0(this,void 0,void 0,function*(){return""})};return i.accessToken?u.accessToken=i.accessToken:delete u.accessToken,u}const hd="2.65.0",P0="http://localhost:9999",L0="supabase.auth.token",I0={"X-Client-Info":`gotrue-js/${hd}`},jl=10,Ho="X-Supabase-Api-Version",fd={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}};function D0(i){return Math.round(Date.now()/1e3)+i}function U0(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){const e=Math.random()*16|0;return(i=="x"?e:e&3|8).toString(16)})}const nn=()=>typeof document<"u",ri={tested:!1,writable:!1},Ps=()=>{if(!nn())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(ri.tested)return ri.writable;const i=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(i,i),globalThis.localStorage.removeItem(i),ri.tested=!0,ri.writable=!0}catch{ri.tested=!0,ri.writable=!1}return ri.writable};function Va(i){const e={},t=new URL(i);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((s,r)=>{e[r]=s})}catch{}return t.searchParams.forEach((n,s)=>{e[s]=n}),e}const pd=i=>{let e;return i?e=i:typeof fetch>"u"?e=(...t)=>es(async()=>{const{default:n}=await Promise.resolve().then(()=>us);return{default:n}},void 0,import.meta.url).then(({default:n})=>n(...t)):e=fetch,(...t)=>e(...t)},N0=i=>typeof i=="object"&&i!==null&&"status"in i&&"ok"in i&&"json"in i&&typeof i.json=="function",md=async(i,e,t)=>{await i.setItem(e,JSON.stringify(t))},_r=async(i,e)=>{const t=await i.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},vr=async(i,e)=>{await i.removeItem(e)};function O0(i){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";let t="",n,s,r,a,o,c,l,u=0;for(i=i.replace("-","+").replace("_","/");u<i.length;)a=e.indexOf(i.charAt(u++)),o=e.indexOf(i.charAt(u++)),c=e.indexOf(i.charAt(u++)),l=e.indexOf(i.charAt(u++)),n=a<<2|o>>4,s=(o&15)<<4|c>>2,r=(c&3)<<6|l,t=t+String.fromCharCode(n),c!=64&&s!=0&&(t=t+String.fromCharCode(s)),l!=64&&r!=0&&(t=t+String.fromCharCode(r));return t}class Zr{constructor(){this.promise=new Zr.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Zr.promiseConstructor=Promise;function Xl(i){const e=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i,t=i.split(".");if(t.length!==3)throw new Error("JWT is not valid: not a JWT structure");if(!e.test(t[1]))throw new Error("JWT is not valid: payload is not in base64url format");const n=t[1];return JSON.parse(O0(n))}async function F0(i){return await new Promise(e=>{setTimeout(()=>e(null),i)})}function k0(i,e){return new Promise((n,s)=>{(async()=>{for(let r=0;r<1/0;r++)try{const a=await i(r);if(!e(r,null,a)){n(a);return}}catch(a){if(!e(r,a)){s(a);return}}})()})}function B0(i){return("0"+i.toString(16)).substr(-2)}function z0(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=t.length;let s="";for(let r=0;r<56;r++)s+=t.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(e),Array.from(e,B0).join("")}async function H0(i){const t=new TextEncoder().encode(i),n=await crypto.subtle.digest("SHA-256",t),s=new Uint8Array(n);return Array.from(s).map(r=>String.fromCharCode(r)).join("")}function V0(i){return btoa(i).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function G0(i){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),i;const t=await H0(i);return V0(t)}async function Bi(i,e,t=!1){const n=z0();let s=n;t&&(s+="/PASSWORD_RECOVERY"),await md(i,`${e}-code-verifier`,s);const r=await G0(n);return[r,n===r?"plain":"s256"]}const $0=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function W0(i){const e=i.headers.get(Ho);if(!e||!e.match($0))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}class xc extends Error{constructor(e,t,n){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=n}}function Be(i){return typeof i=="object"&&i!==null&&"__isAuthError"in i}class j0 extends xc{constructor(e,t,n){super(e,t,n),this.name="AuthApiError",this.status=t,this.code=n}}function X0(i){return Be(i)&&i.name==="AuthApiError"}class gd extends xc{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class xi extends xc{constructor(e,t,n,s){super(e,n,s),this.name=t,this.status=n}}class On extends xi{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function q0(i){return Be(i)&&i.name==="AuthSessionMissingError"}class Ga extends xi{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class yr extends xi{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class xr extends xi{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class ql extends xi{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Vo extends xi{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function $a(i){return Be(i)&&i.name==="AuthRetryableFetchError"}class Yl extends xi{constructor(e,t,n){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=n}}var Y0=function(i,e){var t={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&e.indexOf(n)<0&&(t[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(t[n[s]]=i[n[s]]);return t};const ci=i=>i.msg||i.message||i.error_description||i.error||JSON.stringify(i),K0=[502,503,504];async function Kl(i){var e;if(!N0(i))throw new Vo(ci(i),0);if(K0.includes(i.status))throw new Vo(ci(i),i.status);let t;try{t=await i.json()}catch(r){throw new gd(ci(r),r)}let n;const s=W0(i);if(s&&s.getTime()>=fd["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?n=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(n=t.error_code),n){if(n==="weak_password")throw new Yl(ci(t),i.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(n==="session_not_found")throw new On}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((r,a)=>r&&typeof a=="string",!0))throw new Yl(ci(t),i.status,t.weak_password.reasons);throw new j0(ci(t),i.status||500,n)}const J0=(i,e,t,n)=>{const s={method:i,headers:e?.headers||{}};return i==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e?.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),t))};async function je(i,e,t,n){var s;const r=Object.assign({},n?.headers);r[Ho]||(r[Ho]=fd["2024-01-01"].name),n?.jwt&&(r.Authorization=`Bearer ${n.jwt}`);const a=(s=n?.query)!==null&&s!==void 0?s:{};n?.redirectTo&&(a.redirect_to=n.redirectTo);const o=Object.keys(a).length?"?"+new URLSearchParams(a).toString():"",c=await Z0(i,e,t+o,{headers:r,noResolveJson:n?.noResolveJson},{},n?.body);return n?.xform?n?.xform(c):{data:Object.assign({},c),error:null}}async function Z0(i,e,t,n,s,r){const a=J0(e,n,s,r);let o;try{o=await i(t,Object.assign({},a))}catch(c){throw console.error(c),new Vo(ci(c),0)}if(o.ok||await Kl(o),n?.noResolveJson)return o;try{return await o.json()}catch(c){await Kl(c)}}function Fn(i){var e;let t=null;ny(i)&&(t=Object.assign({},i),i.expires_at||(t.expires_at=D0(i.expires_in)));const n=(e=i.user)!==null&&e!==void 0?e:i;return{data:{session:t,user:n},error:null}}function Jl(i){const e=Fn(i);return!e.error&&i.weak_password&&typeof i.weak_password=="object"&&Array.isArray(i.weak_password.reasons)&&i.weak_password.reasons.length&&i.weak_password.message&&typeof i.weak_password.message=="string"&&i.weak_password.reasons.reduce((t,n)=>t&&typeof n=="string",!0)&&(e.data.weak_password=i.weak_password),e}function Hn(i){var e;return{data:{user:(e=i.user)!==null&&e!==void 0?e:i},error:null}}function Q0(i){return{data:i,error:null}}function ey(i){const{action_link:e,email_otp:t,hashed_token:n,redirect_to:s,verification_type:r}=i,a=Y0(i,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:n,redirect_to:s,verification_type:r},c=Object.assign({},a);return{data:{properties:o,user:c},error:null}}function ty(i){return i}function ny(i){return i.access_token&&i.refresh_token&&i.expires_in}var iy=function(i,e){var t={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&e.indexOf(n)<0&&(t[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(t[n[s]]=i[n[s]]);return t};class sy{constructor({url:e="",headers:t={},fetch:n}){this.url=e,this.headers=t,this.fetch=pd(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)}}async signOut(e,t="global"){try{return await je(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(n){if(Be(n))return{data:null,error:n};throw n}}async inviteUserByEmail(e,t={}){try{return await je(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Hn})}catch(n){if(Be(n))return{data:{user:null},error:n};throw n}}async generateLink(e){try{const{options:t}=e,n=iy(e,["options"]),s=Object.assign(Object.assign({},n),t);return"newEmail"in n&&(s.new_email=n?.newEmail,delete s.newEmail),await je(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:ey,redirectTo:t?.redirectTo})}catch(t){if(Be(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await je(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Hn})}catch(t){if(Be(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,n,s,r,a,o,c;try{const l={nextPage:null,lastPage:0,total:0},u=await je(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(t=e?.page)===null||t===void 0?void 0:t.toString())!==null&&n!==void 0?n:"",per_page:(r=(s=e?.perPage)===null||s===void 0?void 0:s.toString())!==null&&r!==void 0?r:""},xform:ty});if(u.error)throw u.error;const d=await u.json(),f=(a=u.headers.get("x-total-count"))!==null&&a!==void 0?a:0,m=(c=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&c!==void 0?c:[];return m.length>0&&(m.forEach(g=>{const y=parseInt(g.split(";")[0].split("=")[1].substring(0,1)),h=JSON.parse(g.split(";")[1].split("=")[1]);l[`${h}Page`]=y}),l.total=parseInt(f)),{data:Object.assign(Object.assign({},d),l),error:null}}catch(l){if(Be(l))return{data:{users:[]},error:l};throw l}}async getUserById(e){try{return await je(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Hn})}catch(t){if(Be(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){try{return await je(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Hn})}catch(n){if(Be(n))return{data:{user:null},error:n};throw n}}async deleteUser(e,t=!1){try{return await je(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Hn})}catch(n){if(Be(n))return{data:{user:null},error:n};throw n}}async _listFactors(e){try{const{data:t,error:n}=await je(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:t,error:n}}catch(t){if(Be(t))return{data:null,error:t};throw t}}async _deleteFactor(e){try{return{data:await je(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(Be(t))return{data:null,error:t};throw t}}}const ry={getItem:i=>Ps()?globalThis.localStorage.getItem(i):null,setItem:(i,e)=>{Ps()&&globalThis.localStorage.setItem(i,e)},removeItem:i=>{Ps()&&globalThis.localStorage.removeItem(i)}};function Zl(i={}){return{getItem:e=>i[e]||null,setItem:(e,t)=>{i[e]=t},removeItem:e=>{delete i[e]}}}function ay(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}const zi={debug:!!(globalThis&&Ps()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class _d extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class oy extends _d{}async function cy(i,e,t){zi.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",i,e);const n=new globalThis.AbortController;return e>0&&setTimeout(()=>{n.abort(),zi.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",i)},e),await globalThis.navigator.locks.request(i,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async s=>{if(s){zi.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",i,s.name);try{return await t()}finally{zi.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",i,s.name)}}else{if(e===0)throw zi.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",i),new oy(`Acquiring an exclusive Navigator LockManager lock "${i}" immediately failed`);if(zi.debug)try{const r=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(r,null,"  "))}catch(r){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",r)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}})}ay();const ly={url:P0,storageKey:L0,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:I0,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1},Ss=30*1e3,Ql=3;async function eu(i,e,t){return await t()}class Ds{constructor(e){var t,n;this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log,this.instanceID=Ds.nextInstanceID,Ds.nextInstanceID+=1,this.instanceID>0&&nn()&&console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");const s=Object.assign(Object.assign({},ly),e);if(this.logDebugMessages=!!s.debug,typeof s.debug=="function"&&(this.logger=s.debug),this.persistSession=s.persistSession,this.storageKey=s.storageKey,this.autoRefreshToken=s.autoRefreshToken,this.admin=new sy({url:s.url,headers:s.headers,fetch:s.fetch}),this.url=s.url,this.headers=s.headers,this.fetch=pd(s.fetch),this.lock=s.lock||eu,this.detectSessionInUrl=s.detectSessionInUrl,this.flowType=s.flowType,this.hasCustomAuthorizationHeader=s.hasCustomAuthorizationHeader,s.lock?this.lock=s.lock:nn()&&(!((t=globalThis?.navigator)===null||t===void 0)&&t.locks)?this.lock=cy:this.lock=eu,this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this)},this.persistSession?s.storage?this.storage=s.storage:Ps()?this.storage=ry:(this.memoryStorage={},this.storage=Zl(this.memoryStorage)):(this.memoryStorage={},this.storage=Zl(this.memoryStorage)),nn()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(r){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",r)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async r=>{this._debug("received broadcast notification from other tab or client",r),await this._notifyAllSubscribers(r.data.event,r.data.session,!1)})}this.initialize()}_debug(...e){return this.logDebugMessages&&this.logger(`GoTrueClient@${this.instanceID} (${hd}) ${new Date().toISOString()}`,...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(-1,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){try{const e=nn()?await this._isPKCEFlow():!1;if(this._debug("#_initialize()","begin","is PKCE flow",e),e||this.detectSessionInUrl&&this._isImplicitGrantFlow()){const{data:t,error:n}=await this._getSessionFromURL(e);if(n)return this._debug("#_initialize()","error detecting session from URL",n),n?.message==="Identity is already linked"||n?.message==="Identity is already linked to another user"?{error:n}:(await this._removeSession(),{error:n});const{session:s,redirectType:r}=t;return this._debug("#_initialize()","detected session in URL",s,"redirect type",r),await this._saveSession(s),setTimeout(async()=>{r==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",s):await this._notifyAllSubscribers("SIGNED_IN",s)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return Be(e)?{error:e}:{error:new gd("Unexpected error during initialization",e)}}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,n,s;try{const r=await je(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(t=e?.options)===null||t===void 0?void 0:t.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=e?.options)===null||s===void 0?void 0:s.captchaToken}},xform:Fn}),{data:a,error:o}=r;if(o||!a)return{data:{user:null,session:null},error:o};const c=a.session,l=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(r){if(Be(r))return{data:{user:null,session:null},error:r};throw r}}async signUp(e){var t,n,s;try{let r;if("email"in e){const{email:u,password:d,options:f}=e;let m=null,g=null;this.flowType==="pkce"&&([m,g]=await Bi(this.storage,this.storageKey)),r=await je(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:f?.emailRedirectTo,body:{email:u,password:d,data:(t=f?.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:f?.captchaToken},code_challenge:m,code_challenge_method:g},xform:Fn})}else if("phone"in e){const{phone:u,password:d,options:f}=e;r=await je(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:d,data:(n=f?.data)!==null&&n!==void 0?n:{},channel:(s=f?.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:f?.captchaToken}},xform:Fn})}else throw new yr("You must provide either an email or phone number and a password");const{data:a,error:o}=r;if(o||!a)return{data:{user:null,session:null},error:o};const c=a.session,l=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(r){if(Be(r))return{data:{user:null,session:null},error:r};throw r}}async signInWithPassword(e){try{let t;if("email"in e){const{email:r,password:a,options:o}=e;t=await je(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:a,gotrue_meta_security:{captcha_token:o?.captchaToken}},xform:Jl})}else if("phone"in e){const{phone:r,password:a,options:o}=e;t=await je(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:a,gotrue_meta_security:{captcha_token:o?.captchaToken}},xform:Jl})}else throw new yr("You must provide either an email or phone number and a password");const{data:n,error:s}=t;return s?{data:{user:null,session:null},error:s}:!n||!n.session||!n.user?{data:{user:null,session:null},error:new Ga}:(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),{data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(t){if(Be(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOAuth(e){var t,n,s,r;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(n=e.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=e.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(r=e.options)===null||r===void 0?void 0:r.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(-1,async()=>this._exchangeCodeForSession(e))}async _exchangeCodeForSession(e){const t=await _r(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(t??"").split("/");try{const{data:r,error:a}=await je(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:n},xform:Fn});if(await vr(this.storage,`${this.storageKey}-code-verifier`),a)throw a;return!r||!r.session||!r.user?{data:{user:null,session:null,redirectType:null},error:new Ga}:(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),{data:Object.assign(Object.assign({},r),{redirectType:s??null}),error:a})}catch(r){if(Be(r))return{data:{user:null,session:null,redirectType:null},error:r};throw r}}async signInWithIdToken(e){try{const{options:t,provider:n,token:s,access_token:r,nonce:a}=e,o=await je(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:r,nonce:a,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Fn}),{data:c,error:l}=o;return l?{data:{user:null,session:null},error:l}:!c||!c.session||!c.user?{data:{user:null,session:null},error:new Ga}:(c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers("SIGNED_IN",c.session)),{data:c,error:l})}catch(t){if(Be(t))return{data:{user:null,session:null},error:t};throw t}}async signInWithOtp(e){var t,n,s,r,a;try{if("email"in e){const{email:o,options:c}=e;let l=null,u=null;this.flowType==="pkce"&&([l,u]=await Bi(this.storage,this.storageKey));const{error:d}=await je(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(t=c?.data)!==null&&t!==void 0?t:{},create_user:(n=c?.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:c?.captchaToken},code_challenge:l,code_challenge_method:u},redirectTo:c?.emailRedirectTo});return{data:{user:null,session:null},error:d}}if("phone"in e){const{phone:o,options:c}=e,{data:l,error:u}=await je(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(s=c?.data)!==null&&s!==void 0?s:{},create_user:(r=c?.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:c?.captchaToken},channel:(a=c?.channel)!==null&&a!==void 0?a:"sms"}});return{data:{user:null,session:null,messageId:l?.message_id},error:u}}throw new yr("You must provide either an email or phone number.")}catch(o){if(Be(o))return{data:{user:null,session:null},error:o};throw o}}async verifyOtp(e){var t,n;try{let s,r;"options"in e&&(s=(t=e.options)===null||t===void 0?void 0:t.redirectTo,r=(n=e.options)===null||n===void 0?void 0:n.captchaToken);const{data:a,error:o}=await je(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:s,xform:Fn});if(o)throw o;if(!a)throw new Error("An error occurred on token verification.");const c=a.session,l=a.user;return c?.access_token&&(await this._saveSession(c),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c)),{data:{user:l,session:c},error:null}}catch(s){if(Be(s))return{data:{user:null,session:null},error:s};throw s}}async signInWithSSO(e){var t,n,s;try{let r=null,a=null;return this.flowType==="pkce"&&([r,a]=await Bi(this.storage,this.storageKey)),await je(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(n=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&n!==void 0?n:void 0}),!((s=e?.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:r,code_challenge_method:a}),headers:this.headers,xform:Q0})}catch(r){if(Be(r))return{data:null,error:r};throw r}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:n}=e;if(n)throw n;if(!t)throw new On;const{error:s}=await je(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return{data:{user:null,session:null},error:s}})}catch(e){if(Be(e))return{data:{user:null,session:null},error:e};throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:n,type:s,options:r}=e,{error:a}=await je(this.fetch,"POST",t,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:r?.captchaToken}},redirectTo:r?.emailRedirectTo});return{data:{user:null,session:null},error:a}}else if("phone"in e){const{phone:n,type:s,options:r}=e,{data:a,error:o}=await je(this.fetch,"POST",t,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:r?.captchaToken}}});return{data:{user:null,session:null,messageId:a?.message_id},error:o}}throw new yr("You must provide either an email or phone number and a type")}catch(t){if(Be(t))return{data:{user:null,session:null},error:t};throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(-1,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await t()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const n=t();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await _r(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const n=e.expires_at?e.expires_at<=Date.now()/1e3:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",e.expires_at),!n){if(this.storage.isServer){let a=this.suppressGetSessionWarning;e=new Proxy(e,{get:(c,l,u)=>(!a&&l==="user"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),a=!0,this.suppressGetSessionWarning=!0),Reflect.get(c,l,u))})}return{data:{session:e},error:null}}const{session:s,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{session:null},error:r}:{data:{session:s},error:null}}finally{this._debug("#__loadSession()","end")}}async getUser(e){return e?await this._getUser(e):(await this.initializePromise,await this._acquireLock(-1,async()=>await this._getUser()))}async _getUser(e){try{return e?await je(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Hn}):await this._useSession(async t=>{var n,s,r;const{data:a,error:o}=t;if(o)throw o;return!(!((n=a.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new On}:await je(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(r=(s=a.session)===null||s===void 0?void 0:s.access_token)!==null&&r!==void 0?r:void 0,xform:Hn})})}catch(t){if(Be(t))return q0(t)&&(await this._removeSession(),await vr(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{data:{user:null},error:t};throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async n=>{const{data:s,error:r}=n;if(r)throw r;if(!s.session)throw new On;const a=s.session;let o=null,c=null;this.flowType==="pkce"&&e.email!=null&&([o,c]=await Bi(this.storage,this.storageKey));const{data:l,error:u}=await je(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t?.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:c}),jwt:a.access_token,xform:Hn});if(u)throw u;return a.user=l.user,await this._saveSession(a),await this._notifyAllSubscribers("USER_UPDATED",a),{data:{user:a.user},error:null}})}catch(n){if(Be(n))return{data:{user:null},error:n};throw n}}_decodeJWT(e){return Xl(e)}async setSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new On;const t=Date.now()/1e3;let n=t,s=!0,r=null;const a=Xl(e.access_token);if(a.exp&&(n=a.exp,s=n<=t),s){const{session:o,error:c}=await this._callRefreshToken(e.refresh_token);if(c)return{data:{user:null,session:null},error:c};if(!o)return{data:{user:null,session:null},error:null};r=o}else{const{data:o,error:c}=await this._getUser(e.access_token);if(c)throw c;r={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:n-t,expires_at:n},await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)}return{data:{user:r.user,session:r},error:null}}catch(t){if(Be(t))return{data:{session:null,user:null},error:t};throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var n;if(!e){const{data:a,error:o}=t;if(o)throw o;e=(n=a.session)!==null&&n!==void 0?n:void 0}if(!e?.refresh_token)throw new On;const{session:s,error:r}=await this._callRefreshToken(e.refresh_token);return r?{data:{user:null,session:null},error:r}:s?{data:{user:s.user,session:s},error:null}:{data:{user:null,session:null},error:null}})}catch(t){if(Be(t))return{data:{user:null,session:null},error:t};throw t}}async _getSessionFromURL(e){try{if(!nn())throw new xr("No browser detected.");if(this.flowType==="implicit"&&!this._isImplicitGrantFlow())throw new xr("Not a valid implicit grant flow url.");if(this.flowType=="pkce"&&!e)throw new ql("Not a valid PKCE flow url.");const t=Va(window.location.href);if(e){if(!t.code)throw new ql("No code detected.");const{data:T,error:b}=await this._exchangeCodeForSession(t.code);if(b)throw b;const E=new URL(window.location.href);return E.searchParams.delete("code"),window.history.replaceState(window.history.state,"",E.toString()),{data:{session:T.session,redirectType:null},error:null}}if(t.error||t.error_description||t.error_code)throw new xr(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});const{provider_token:n,provider_refresh_token:s,access_token:r,refresh_token:a,expires_in:o,expires_at:c,token_type:l}=t;if(!r||!o||!a||!l)throw new xr("No session defined in URL");const u=Math.round(Date.now()/1e3),d=parseInt(o);let f=u+d;c&&(f=parseInt(c));const m=f-u;m*1e3<=Ss&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${m}s, should have been closer to ${d}s`);const g=f-d;u-g>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",g,f,u):u-g<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",g,f,u);const{data:y,error:h}=await this._getUser(r);if(h)throw h;const p={provider_token:n,provider_refresh_token:s,access_token:r,expires_in:d,expires_at:f,refresh_token:a,token_type:l,user:y.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),{data:{session:p,redirectType:t.type},error:null}}catch(t){if(Be(t))return{data:{session:null,redirectType:null},error:t};throw t}}_isImplicitGrantFlow(){const e=Va(window.location.href);return!!(nn()&&(e.access_token||e.error_description))}async _isPKCEFlow(){const e=Va(window.location.href),t=await _r(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(-1,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var n;const{data:s,error:r}=t;if(r)return{error:r};const a=(n=s.session)===null||n===void 0?void 0:n.access_token;if(a){const{error:o}=await this.admin.signOut(a,e);if(o&&!(X0(o)&&(o.status===404||o.status===401||o.status===403)))return{error:o}}return e!=="others"&&(await this._removeSession(),await vr(this.storage,`${this.storageKey}-code-verifier`),await this._notifyAllSubscribers("SIGNED_OUT",null)),{error:null}})}onAuthStateChange(e){const t=U0(),n={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,n),(async()=>(await this.initializePromise,await this._acquireLock(-1,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async t=>{var n,s;try{const{data:{session:r},error:a}=t;if(a)throw a;await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(r){await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",r),console.error(r)}})}async resetPasswordForEmail(e,t={}){let n=null,s=null;this.flowType==="pkce"&&([n,s]=await Bi(this.storage,this.storageKey,!0));try{return await je(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(r){if(Be(r))return{data:null,error:r};throw r}}async getUserIdentities(){var e;try{const{data:t,error:n}=await this.getUser();if(n)throw n;return{data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null}}catch(t){if(Be(t))return{data:null,error:t};throw t}}async linkIdentity(e){var t;try{const{data:n,error:s}=await this._useSession(async r=>{var a,o,c,l,u;const{data:d,error:f}=r;if(f)throw f;const m=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(a=e.options)===null||a===void 0?void 0:a.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return await je(this.fetch,"GET",m,{headers:this.headers,jwt:(u=(l=d.session)===null||l===void 0?void 0:l.access_token)!==null&&u!==void 0?u:void 0})});if(s)throw s;return nn()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(n?.url),{data:{provider:e.provider,url:n?.url},error:null}}catch(n){if(Be(n))return{data:{provider:e.provider,url:null},error:n};throw n}}async unlinkIdentity(e){try{return await this._useSession(async t=>{var n,s;const{data:r,error:a}=t;if(a)throw a;return await je(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(s=(n=r.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(t){if(Be(t))return{data:null,error:t};throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const n=Date.now();return await k0(async s=>(s>0&&await F0(200*Math.pow(2,s-1)),this._debug(t,"refreshing attempt",s),await je(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Fn})),(s,r)=>{const a=200*Math.pow(2,s);return r&&$a(r)&&Date.now()+a-n<Ss})}catch(n){if(this._debug(t,"error",n),Be(n))return{data:{session:null,user:null},error:n};throw n}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const n=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",n),nn()&&!t.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n},error:null}}async _recoverAndRefresh(){var e;const t="#_recoverAndRefresh()";this._debug(t,"begin");try{const n=await _r(this.storage,this.storageKey);if(this._debug(t,"session from storage",n),!this._isValidSession(n)){this._debug(t,"session is not valid"),n!==null&&await this._removeSession();return}const s=Math.round(Date.now()/1e3),r=((e=n.expires_at)!==null&&e!==void 0?e:1/0)<s+jl;if(this._debug(t,`session has${r?"":" not"} expired with margin of ${jl}s`),r){if(this.autoRefreshToken&&n.refresh_token){const{error:a}=await this._callRefreshToken(n.refresh_token);a&&(console.error(a),$a(a)||(this._debug(t,"refresh failed with a non-retryable error, removing the session",a),await this._removeSession()))}}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(t,"error",n),console.error(n);return}finally{this._debug(t,"end")}}async _callRefreshToken(e){var t,n;if(!e)throw new On;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new Zr;const{data:r,error:a}=await this._refreshAccessToken(e);if(a)throw a;if(!r.session)throw new On;await this._saveSession(r.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",r.session);const o={session:r.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(r){if(this._debug(s,"error",r),Be(r)){const a={session:null,error:r};return $a(r)||(await this._removeSession(),await this._notifyAllSubscribers("SIGNED_OUT",null)),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(a),a}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(r),r}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,t,n=!0){const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",t,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:t});const r=[],a=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(c){r.push(c)}});if(await Promise.all(a),r.length>0){for(let o=0;o<r.length;o+=1)console.error(r[o]);throw r[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await md(this.storage,this.storageKey,e)}async _removeSession(){this._debug("#_removeSession()"),await vr(this.storage,this.storageKey)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&nn()&&window?.removeEventListener&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Ss);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e),setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:n}}=t;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((n.expires_at*1e3-e)/Ss);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${Ss}ms, refresh threshold is ${Ql} ticks`),s<=Ql&&await this._callRefreshToken(n.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof _d)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!nn()||!window?.addEventListener)return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>await this._onVisibilityChanged(!1),window?.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(-1,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,n){const s=[`provider=${encodeURIComponent(t)}`];if(n?.redirectTo&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n?.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){const[r,a]=await Bi(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(r)}`,code_challenge_method:`${encodeURIComponent(a)}`});s.push(o.toString())}if(n?.queryParams){const r=new URLSearchParams(n.queryParams);s.push(r.toString())}return n?.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var n;const{data:s,error:r}=t;return r?{data:null,error:r}:await je(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(n=s?.session)===null||n===void 0?void 0:n.access_token})})}catch(t){if(Be(t))return{data:null,error:t};throw t}}async _enroll(e){try{return await this._useSession(async t=>{var n,s;const{data:r,error:a}=t;if(a)return{data:null,error:a};const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:{issuer:e.issuer}),{data:c,error:l}=await je(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(n=r?.session)===null||n===void 0?void 0:n.access_token});return l?{data:null,error:l}:(e.factorType==="phone"&&delete c.totp,e.factorType==="totp"&&(!((s=c?.totp)===null||s===void 0)&&s.qr_code)&&(c.totp.qr_code=`data:image/svg+xml;utf-8,${c.totp.qr_code}`),{data:c,error:null})})}catch(t){if(Be(t))return{data:null,error:t};throw t}}async _verify(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var n;const{data:s,error:r}=t;if(r)return{data:null,error:r};const{data:a,error:o}=await je(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:{code:e.code,challenge_id:e.challengeId},headers:this.headers,jwt:(n=s?.session)===null||n===void 0?void 0:n.access_token});return o?{data:null,error:o}:(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",a),{data:a,error:o})})}catch(t){if(Be(t))return{data:null,error:t};throw t}})}async _challenge(e){return this._acquireLock(-1,async()=>{try{return await this._useSession(async t=>{var n;const{data:s,error:r}=t;return r?{data:null,error:r}:await je(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:{channel:e.channel},headers:this.headers,jwt:(n=s?.session)===null||n===void 0?void 0:n.access_token})})}catch(t){if(Be(t))return{data:null,error:t};throw t}})}async _challengeAndVerify(e){const{data:t,error:n}=await this._challenge({factorId:e.factorId});return n?{data:null,error:n}:await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){const{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};const n=e?.factors||[],s=n.filter(a=>a.factor_type==="totp"&&a.status==="verified"),r=n.filter(a=>a.factor_type==="phone"&&a.status==="verified");return{data:{all:n,totp:s,phone:r},error:null}}async _getAuthenticatorAssuranceLevel(){return this._acquireLock(-1,async()=>await this._useSession(async e=>{var t,n;const{data:{session:s},error:r}=e;if(r)return{data:null,error:r};if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const a=this._decodeJWT(s.access_token);let o=null;a.aal&&(o=a.aal);let c=o;((n=(t=s.user.factors)===null||t===void 0?void 0:t.filter(d=>d.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(c="aal2");const u=a.amr||[];return{data:{currentLevel:o,nextLevel:c,currentAuthenticationMethods:u},error:null}}))}}Ds.nextInstanceID=0;const uy=Ds;class dy extends uy{constructor(e){super(e)}}var hy=function(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function c(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})};class fy{constructor(e,t,n){var s,r,a;if(this.supabaseUrl=e,this.supabaseKey=t,!e)throw new Error("supabaseUrl is required.");if(!t)throw new Error("supabaseKey is required.");const o=C0(e);this.realtimeUrl=`${o}/realtime/v1`.replace(/^http/i,"ws"),this.authUrl=`${o}/auth/v1`,this.storageUrl=`${o}/storage/v1`,this.functionsUrl=`${o}/functions/v1`;const c=`sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`,l={db:x0,realtime:S0,auth:Object.assign(Object.assign({},b0),{storageKey:c}),global:y0},u=R0(n??{},l);this.storageKey=(s=u.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(r=u.global.headers)!==null&&r!==void 0?r:{},u.accessToken?(this.accessToken=u.accessToken,this.auth=new Proxy({},{get:(d,f)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(f)} is not possible`)}})):this.auth=this._initSupabaseAuthClient((a=u.auth)!==null&&a!==void 0?a:{},this.headers,u.global.fetch),this.fetch=T0(t,this._getAccessToken.bind(this),u.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers},u.realtime)),this.rest=new Vv(`${o}/rest/v1`,{headers:this.headers,schema:u.db.schema,fetch:this.fetch}),u.accessToken||this._listenForAuthEvents()}get functions(){return new _v(this.functionsUrl,{headers:this.headers,customFetch:this.fetch})}get storage(){return new g0(this.storageUrl,this.headers,this.fetch)}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var e,t;return hy(this,void 0,void 0,function*(){if(this.accessToken)return yield this.accessToken();const{data:n}=yield this.auth.getSession();return(t=(e=n.session)===null||e===void 0?void 0:e.access_token)!==null&&t!==void 0?t:null})}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:s,storageKey:r,flowType:a,lock:o,debug:c},l,u){var d;const f={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new dy({url:this.authUrl,headers:Object.assign(Object.assign({},f),l),storageKey:r,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:s,flowType:a,lock:o,debug:c,fetch:u,hasCustomAuthorizationHeader:(d="Authorization"in this.headers)!==null&&d!==void 0?d:!1})}_initRealtimeClient(e){return new n0(this.realtimeUrl,Object.assign(Object.assign({},e),{params:Object.assign({apikey:this.supabaseKey},e?.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,n)=>{this._handleTokenChanged(t,"CLIENT",n?.access_token)})}_handleTokenChanged(e,t,n){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==n?(this.realtime.setAuth(n??null),this.changedAccessToken=n):e==="SIGNED_OUT"&&(this.realtime.setAuth(this.supabaseKey),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}}const py=(i,e,t)=>new fy(i,e,t),Go="mj7d.sync.cfg",Or="mj7d.sync.last";let Cs=null;function Hs(){try{return JSON.parse(localStorage.getItem(Go)||"null")}catch{return null}}function tu(i){try{i?localStorage.setItem(Go,JSON.stringify(i)):localStorage.removeItem(Go),localStorage.removeItem(Or)}catch{}Cs=null}function bi(){if(Cs)return Cs;const i=Hs();return i?(Cs=py(i.url,i.key,{auth:{persistSession:!0,autoRefreshToken:!0,storageKey:"mj7d.auth"}}),Cs):null}async function $o(){const i=bi();if(!i)return null;const{data:e}=await i.auth.getSession();return e.session?.user?.email??null}async function my(i){const e=bi();if(!e)throw new Error("Synchronisation non configurée");const{error:t}=await e.auth.signInWithOtp({email:i,options:{shouldCreateUser:!0}});if(t)throw t}async function gy(i,e){const t=bi();if(!t)throw new Error("Synchronisation non configurée");const{error:n}=await t.auth.verifyOtp({email:i,token:e.trim(),type:"email"});if(n)throw n}async function _y(i,e){const t=bi();if(!t)throw new Error("Synchronisation non configurée");const{error:n}=await t.auth.signInWithPassword({email:i,password:e});if(n)throw n}async function vy(i,e){const t=bi();if(!t)throw new Error("Synchronisation non configurée");const{data:n,error:s}=await t.auth.signUp({email:i,password:e});if(s)throw s;return!!n.session}async function yy(){const i=bi();i&&await i.auth.signOut();try{localStorage.removeItem(Or)}catch{}}async function xy(i){const e=bi();if(!e)throw new Error("Synchronisation non configurée");const{data:t}=await e.auth.getSession();if(!t.session)throw new Error("Non connecté");let n=0;try{n=Number(localStorage.getItem(Or)||0)}catch{}const s=[];let r=n,a=0;const o=500;for(;;){const{data:u,error:d}=await e.from("mj7_items").select("id,kind,data,updated_at,deleted").gt("updated_at",Math.max(0,n-3e5)).order("updated_at").range(a,a+o-1);if(d)throw d;for(const f of u||[]){r=Math.max(r,Number(f.updated_at));const m=i.find(g=>g.id===f.id);(!m||m.updatedAt<Number(f.updated_at))&&s.push({id:f.id,kind:f.kind,data:f.data,updatedAt:Number(f.updated_at),deleted:f.deleted,dirty:!1})}if(!u||u.length<o)break;a+=o}const c=new Set(s.map(u=>u.id)),l=i.filter(u=>u.dirty&&!c.has(u.id));for(let u=0;u<l.length;u+=200){const d=l.slice(u,u+200).map(m=>({user_id:t.session.user.id,id:m.id,kind:m.kind,data:m.data,updated_at:m.updatedAt,deleted:!!m.deleted})),{error:f}=await e.from("mj7_items").upsert(d,{onConflict:"user_id,id"});if(f)throw f;d.forEach(m=>{r=Math.max(r,m.updated_at)})}try{localStorage.setItem(Or,String(r))}catch{}return{incoming:s,pushedIds:l.map(u=>u.id)}}const by=`create table if not exists public.mj7_items (
  id text not null,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  kind text not null,
  data jsonb not null,
  updated_at bigint not null,
  deleted boolean not null default false,
  primary key (user_id, id)
);
alter table public.mj7_items enable row level security;
create policy "Mes données seulement" on public.mj7_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.mj7_items to authenticated;`,R={recs:new Map,view:"board",month:fn(),scope:"all",actFilter:"",ops:{q:"",space:"",act:"",cat:"",pay:"",period:"month"},budgetSpace:"perso",pendingMode:{},setCatSpace:"perso",setCatType:"dep",sync:{state:"off",email:null,msg:""}},ut={get(i,e=null){try{const t=localStorage.getItem("mj7d."+i);return t===null?e:JSON.parse(t)}catch{return e}},set(i,e){try{localStorage.setItem("mj7d."+i,JSON.stringify(e))}catch{}},del(i){try{localStorage.removeItem("mj7d."+i)}catch{}}},$n={theme:ut.get("theme","dark"),flat:ut.get("flat",!1)},An=i=>[...R.recs.values()].filter(e=>e.kind===i&&!e.deleted),hn=()=>An("tx"),Cn=()=>An("cat").sort((i,e)=>i.data.order-e.data.order),Kt=()=>An("act").sort((i,e)=>i.data.order-e.data.order),vd=()=>An("budget"),yd=()=>An("rec"),Jn=i=>i&&R.recs.get(i)?.data||{name:"Sans catégorie",icon:"•",color:"#9aa0a6",space:"perso",type:"dep",order:99},ds=i=>i&&R.recs.get(i)&&!R.recs.get(i).deleted?R.recs.get(i).data:null;async function yt(i){const e=Date.now();i.forEach(t=>{t.updatedAt=Math.max(e,(t.updatedAt||0)+1),t.dirty=!0,R.recs.set(t.id,t)}),await Xi(i),Td()}async function Ms(i){const e=R.recs.get(i);e&&await yt([{...e,deleted:!0}])}const $e=(i,e=document)=>e.querySelector(i),Re=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let nu=0;function we(i){document.querySelector(".toast")?.remove();const e=document.createElement("div");e.className="toast",e.textContent=i,document.body.appendChild(e),clearTimeout(nu),nu=window.setTimeout(()=>e.remove(),2600)}const Wo=()=>$n.flat||matchMedia("(prefers-reduced-motion: reduce)").matches,Mt={board:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 20V10m6 10V4m6 16v-7m4 7H2"/></svg>',ops:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V12l6 6"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',left:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>',right:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>',x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14"/></svg>',sync:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M6 21v-4h4"/></svg>'},Sy=[["board","Tableau"],["ops","Opérations"],["plan","Répartition"],["settings","Réglages"]];function xd(i){return R.scope==="all"?!0:i.space!==R.scope?!1:R.scope==="act"&&R.actFilter?i.actId===R.actFilter:!0}function bd(i=R.month){return hn().filter(e=>e.data.date.startsWith(i)&&xd(e.data))}function wn(i){let e=0,t=0;return i.forEach(n=>n.data.type==="dep"?e+=n.data.amount:t+=n.data.amount),{dep:e,rev:t,bal:t-e}}function bc(i,e,t=R.month){return hn().filter(n=>n.data.type==="dep"&&n.data.space===i&&n.data.catId===e&&n.data.date.startsWith(t)).reduce((n,s)=>n+s.data.amount,0)}const My=document.getElementById("app");let Wn=null;const jo=document.createElement("div");jo.className="stage";const iu={};function Qr(){document.documentElement.setAttribute("data-theme",$n.theme);const i=$n.theme==="dark"||$n.theme==="system"&&!matchMedia("(prefers-color-scheme: light)").matches;$e("meta[name=theme-color]")?.setAttribute("content",i?"#0b0908":"#f3f1ee"),Wn?.setTheme(i)}function Ey(){const i=Sy.map(([t,n])=>`<a href="#${t}" class="${R.view===t?"on":""}">${Mt[t]}<span>${n}</span></a>`),e=`<span class="sync-dot ${R.sync.state==="on"?"on":R.sync.state==="err"?"err":""}" title="${Re(R.sync.msg)}"><i></i>${R.sync.state==="off"?"Sur cet appareil":R.sync.state==="busy"?"Synchro…":R.sync.state==="err"?"Synchro en pause":"Synchronisé"}</span>`;My.innerHTML=`
  <div class="app">
    <aside class="side">
      <div class="brand"><img src="icons/icon-192.png" alt=""><div>MJ7 Finances<small>Perso · Activités</small></div></div>
      ${i.join("")}
      <button class="fab-wide" data-act="add">${Mt.plus.replace("<svg",'<svg width="18" height="18"')}Nouvelle opération</button>
    </aside>
    <main>
      <div class="topbar"><div class="brand"><img src="icons/icon-192.png" alt=""><div>MJ7 Finances<small>Perso · Activités</small></div></div>${e}</div>
      <div id="view"></div>
    </main>
    <nav class="nav">${i.slice(0,2).join("")}<button class="fab" data-act="add" aria-label="Nouvelle opération">${Mt.plus}</button>${i.slice(2).join("")}</nav>
  </div>`}function Ae(){Ey();const i=$e("#view");if(R.view==="board"?i.innerHTML=Ty():R.view==="ops"?i.innerHTML=Ny():R.view==="plan"?i.innerHTML=zy():i.innerHTML=Ky(),R.view==="board"&&Py(),R.view==="ops"){const e=$e("#q");e&&document.activeElement!==e&&R.ops.q}Uy()}function wy(){const i=Kt();return`<div class="scope">
    <div class="seg" role="tablist">${[["all","Tout"],["perso","Personnel"],["act","Activités"]].map(([e,t])=>`<button class="${R.scope===e?"on":""}" data-act="scope" data-v="${e}">${t}</button>`).join("")}</div>
    ${R.scope==="act"&&i.length?`<div class="chips"><button class="chip ${R.actFilter?"":"on"}" data-act="actf" data-v="">Toutes les activités</button>${i.map(e=>`<button class="chip ${R.actFilter===e.id?"on":""}" data-act="actf" data-v="${e.id}"><i style="background:${e.data.color}"></i>${Re(e.data.name)}</button>`).join("")}</div>`:""}
  </div>`}function Ty(){const i=bd(),e=wn(i),t=wn(hn().filter(c=>c.data.date.startsWith(R.month)&&c.data.space==="perso")),n=wn(hn().filter(c=>c.data.date.startsWith(R.month)&&c.data.space==="act")),s=R.scope==="all"?"Tout":R.scope==="perso"?"Personnel":R.actFilter?ds(R.actFilter)?.name:"Activités",r=Kt().map(c=>{const l=hn().filter(f=>f.data.space==="act"&&f.data.actId===c.id&&f.data.date.startsWith(R.month)),u=wn(l),d=l.length?u.bal>0?["good","Rentable"]:u.bal<0?["bad","En perte"]:["warn","À l'équilibre"]:["neutral","Rien ce mois"];return`<button class="card act-card tilt" data-act="openAct" data-v="${c.id}" style="text-align:left">
      <div class="name"><i style="background:${c.data.color}"></i>${Re(c.data.name)}</div>
      <div class="res num ${u.bal>0?"good":u.bal<0?"bad":""}">${Ne(u.bal,!0)}</div>
      <div class="split"><div class="line"><span class="muted">Revenus</span><span class="num">${Ne(u.rev)}</span></div><div class="line"><span class="muted">Dépenses</span><span class="num">${Ne(u.dep)}</span></div></div>
      <div style="margin-top:12px"><span class="pill ${d[0]}">${d[1]}</span></div>
    </button>`}).join(""),a=Fy().filter(c=>R.scope==="all"||c.space===R.scope).map(c=>{const l=bc(c.space,c.catId);return{b:c,spent:l,p:l/c.amount}}).sort((c,l)=>l.p-c.p).slice(0,5),o=a.length?a.map(({b:c,spent:l,p:u})=>Ay(c,l,u)).join(""):'<div class="muted" style="font-size:13px">Aucune case remplie. <a href="#plan" style="color:var(--accent)">Répartir le salaire</a></div>';return`
  <div class="board-head">
    <div class="month">
      <button class="icon-btn" data-act="month" data-v="-1" aria-label="Mois précédent">${Mt.left}</button>
      <h1>${Ls(R.month)}</h1>
      <button class="icon-btn" data-act="month" data-v="1" aria-label="Mois suivant">${Mt.right}</button>
    </div>
  </div>
  ${wy()}
  <div class="hero">
    <section class="card stage-card" id="stageCard">
      <div class="stage-top"><span class="eyebrow">Où part l'argent · ${Re(s)}</span></div>
      <div id="stageSlot" class="stage"></div>
      <div class="tip" id="tip" hidden></div>
      <div class="legend" id="legend"></div>
      <div class="stage-hint" id="stageHint">Fais tourner la scène · touche une pile pour le détail</div>
    </section>
    <section class="card balance tilt">
      <div><div class="eyebrow">Solde du mois</div><div class="big ${e.bal<0?"bad":""}" data-count="bal" data-val="${e.bal}">${$t(e.bal)}<small>FCFA</small></div></div>
      <div class="kpis">
        <div class="kpi"><div class="eyebrow">Revenus</div><div class="v good">${Ne(e.rev)}</div></div>
        <div class="kpi"><div class="eyebrow">Dépenses</div><div class="v">${Ne(e.dep)}</div></div>
      </div>
      ${R.scope==="all"?`<div class="split">
        <div class="line"><span class="muted">Personnel</span><span class="num ${t.bal<0?"bad":"good"}">${Ne(t.bal,!0)}</span></div>
        <div class="line"><span class="muted">Activités</span><span class="num ${n.bal<0?"bad":"good"}">${Ne(n.bal,!0)}</span></div>
      </div>`:""}
      <div><div class="card-h" style="margin-bottom:10px"><span class="eyebrow">Répartition</span><a href="#plan" class="muted" style="font-size:12px">Tout voir</a></div>${ky()}<div class="grid" style="gap:12px">${o}</div></div>
    </section>
  </div>
  ${Kt().length&&R.scope!=="perso"?`<div class="card-h" style="margin:26px 2px 12px"><h2>Résultat par activité</h2><span class="muted" style="font-size:12px">revenus − dépenses</span></div><div class="acts">${r}</div>`:""}
  <div class="two" style="margin-top:14px">
    <section class="card"><div class="card-h"><span class="eyebrow">6 derniers mois</span><div class="legend-inline"><span><i style="background:var(--gold)"></i>Revenus</span><span><i style="background:var(--accent2)"></i>Dépenses</span></div></div><canvas class="chart" id="evo"></canvas></section>
    <section class="card"><div class="card-h"><span class="eyebrow">Moyens de paiement · dépenses</span></div><div class="grid" style="gap:12px">${Cy(i)}</div></section>
  </div>`}function Ay(i,e,t){const n=Jn(i.catId),s=t>=1?"over":t>=.8?"warn":"",r=t>=1?'<span class="pill bad">Dépassé</span>':t>=.8?`<span class="pill warn">${Math.round(t*100)} %</span>`:`<span class="muted num" style="font-size:12px">${Math.round(t*100)} %</span>`;return`<div class="grid" style="gap:6px"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${n.icon} ${Re(n.name)} <span class="muted" style="font-size:12px">· ${i.space==="perso"?"Perso":"Activités"}</span></span>${r}</div>
    <div class="meter ${s}"><i style="width:${Math.min(100,t*100)}%"></i></div>
    <div class="muted num" style="font-size:12px">${Ne(e)} sur ${Ne(i.amount)}</div></div>`}function Cy(i){const e={};i.filter(n=>n.data.type==="dep").forEach(n=>e[n.data.pay]=(e[n.data.pay]||0)+n.data.amount);const t=Object.values(e).reduce((n,s)=>n+s,0);return t?Object.entries(e).sort((n,s)=>s[1]-n[1]).map(([n,s])=>`<div class="hbar"><span>${Re(n)}</span><span class="num">${Ne(s)} <span class="muted">· ${Math.round(s/t*100)} %</span></span><div class="track"><i style="width:${s/t*100}%;background:${Jo[n]||"var(--accent)"}"></i></div></div>`).join(""):'<div class="muted" style="font-size:13px">Aucune dépense ce mois-ci.</div>'}function Ry(){const i=new Map;return bd().filter(e=>e.data.type==="dep").forEach(e=>i.set(e.data.catId,(i.get(e.data.catId)||0)+e.data.amount)),[...i.entries()].map(([e,t])=>{const n=Jn(e);return{id:e,name:n.name,icon:n.icon,color:n.color,amount:t}}).sort((e,t)=>t.amount-e.amount)}function Py(){const i=$e("#stageSlot"),e=Ry(),t=$e("#legend");if(t.innerHTML=e.slice(0,6).map(n=>`<span><i style="background:${n.color}"></i>${Re(n.name)} · <b class="num">${$t(n.amount)}</b></span>`).join(""),!e.length)i.innerHTML=`<div class="empty-stage"><div><b style="display:block;color:var(--fg);font-family:var(--display);font-size:17px;margin-bottom:6px">Aucune dépense en ${pu[+R.month.slice(5)-1]}</b>Touche « + » pour ajouter ta première dépense,<br>ou active les données d'exemple dans Réglages.</div></div>`,$e("#stageHint").hidden=!0;else if(Wo()||!cv()){const n=Math.max(...e.map(s=>s.amount));i.innerHTML=`<div class="bars2d">${e.slice(0,9).map(s=>`<div style="height:${Math.max(4,s.amount/n*100)}%;background:linear-gradient(180deg,${s.color},color-mix(in srgb,${s.color} 40%,var(--bg2)))" title="${Re(s.name)} : ${Ne(s.amount)}"><span>${s.icon}</span></div>`).join("")}</div>`,$e("#stageHint").textContent="Vue simplifiée (animations réduites)"}else i.appendChild(jo),Wn||(Wn=lv(jo,{onHover(n,s,r){const a=$e("#tip");if(a){if(!n){a.hidden=!0;return}a.hidden=!1,a.style.left=s+"px",a.style.top=r+"px",a.innerHTML=`${n.icon} ${Re(n.name)}<b>${Ne(n.amount)}</b>`}},onPick(n){R.ops={...R.ops,cat:n,period:"month",space:"",act:"",pay:"",q:""},location.hash="#ops"}}),Qr()),Wn.update(e);document.querySelectorAll("[data-count]").forEach(n=>{const s=n.dataset.count,r=Number(n.dataset.val),a=iu[s]??0;if(iu[s]=r,Wo()||a===r)return;const o=performance.now(),c=900,l=u=>{const d=Math.min(1,(u-o)/c),f=1-Math.pow(1-d,4),m=a+(r-a)*f;n.firstChild.textContent=(m<0?"−":"")+$t(m),d<1&&requestAnimationFrame(l)};requestAnimationFrame(l)}),Sc()}function Sc(){const i=$e("#evo");if(!i)return;const e=Math.min(2,devicePixelRatio||1),t=i.clientWidth,n=i.clientHeight;i.width=t*e,i.height=n*e;const s=i.getContext("2d");s.scale(e,e);const r=getComputedStyle(document.documentElement),a=h=>r.getPropertyValue(h).trim(),o=Array.from({length:6},(h,p)=>Xn(R.month,p-5)),c=o.map(h=>wn(hn().filter(p=>p.data.date.startsWith(h)&&xd(p.data)))),l=Math.max(1,...c.map(h=>Math.max(h.dep,h.rev))),u=46,d=26,f=10,m=(t-u-6)/6,g=n-d-f,y=Ly(l);s.font="11px Inter, system-ui",s.fillStyle=a("--faint"),s.strokeStyle=a("--line"),s.lineWidth=1;for(let h=0;h<=3;h++){const p=f+g-g*h/3;s.beginPath(),s.moveTo(u,p+.5),s.lineTo(t-4,p+.5),s.stroke(),s.textAlign="right",s.fillText(Iy(y*h/3),u-8,p+4)}c.forEach((h,p)=>{const T=u+p*m+m*.18,b=m*.3,E=(U,C,A)=>{const N=g*U/y;s.fillStyle=A,Dy(s,C,f+g-N,b,N,4)};E(h.rev,T,a("--gold")),E(h.dep,T+b+3,a("--accent2")),s.fillStyle=o[p]===R.month?a("--fg"):a("--muted"),s.textAlign="center",s.fillText(qd[+o[p].slice(5)-1],u+p*m+m/2,n-8)})}function Ly(i){const e=Math.pow(10,Math.floor(Math.log10(i))),t=i/e;return(t<=1.5?1.5:t<=3?3:t<=6?6:12)*e}function Iy(i){return i>=1e6?(i/1e6).toFixed(i%1e6?1:0).replace(".",",")+" M":i>=1e3?Math.round(i/1e3)+" k":String(Math.round(i))}function Dy(i,e,t,n,s,r){s<=0||(r=Math.min(r,s/2,n/2),i.beginPath(),i.moveTo(e,t+s),i.lineTo(e,t+r),i.quadraticCurveTo(e,t,e+r,t),i.lineTo(e+n-r,t),i.quadraticCurveTo(e+n,t,e+n,t+r),i.lineTo(e+n,t+s),i.closePath(),i.fill())}function Uy(){Wo()||matchMedia("(hover: none)").matches||document.querySelectorAll(".tilt").forEach(i=>{i.onpointermove=e=>{const t=i.getBoundingClientRect(),n=(e.clientX-t.left)/t.width,s=(e.clientY-t.top)/t.height;i.style.transform=`perspective(900px) rotateX(${(.5-s)*6}deg) rotateY(${(n-.5)*8}deg) translateZ(0)`,i.style.setProperty("--mx",n*100+"%"),i.style.setProperty("--my",s*100+"%")},i.onpointerleave=()=>{i.style.transform=""}})}function Mc(){const i=R.ops,e=i.q.trim().toLowerCase();return hn().filter(t=>{const n=t.data;if(i.period==="month"&&!n.date.startsWith(R.month)||i.period==="year"&&!n.date.startsWith(R.month.slice(0,4))||i.space&&n.space!==i.space||i.act&&n.actId!==i.act||i.cat&&n.catId!==i.cat||i.pay&&n.pay!==i.pay)return!1;if(e){const s=Jn(n.catId);if(!`${n.note||""} ${s.name} ${n.pay} ${ds(n.actId)?.name||""} ${n.amount}`.toLowerCase().includes(e))return!1}return!0}).sort((t,n)=>n.data.date.localeCompare(t.data.date)||n.updatedAt-t.updatedAt)}function Ny(){const i=R.ops,e=Mc(),t=wn(e),n=(a,o,c)=>`<option value="${Re(a)}" ${c===a?"selected":""}>${Re(o)}</option>`,s=new Map;e.forEach(a=>{const o=a.data.date;s.set(o,[...s.get(o)||[],a])});const r=[...s.entries()].map(([a,o])=>{const[c,l,u]=a.split("-").map(Number),d=new Date(c,l-1,u).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"}),f=wn(o);return`<div class="day"><span>${d}</span><span class="num">${Ne(f.bal,!0)}</span></div>`+o.map(m=>Oy(m)).join("")}).join("");return`
  <div class="board-head"><div class="month">
    <button class="icon-btn" data-act="month" data-v="-1" aria-label="Période précédente">${Mt.left}</button>
    <h1>${i.period==="year"?R.month.slice(0,4):i.period==="all"?"Toutes les opérations":Ls(R.month)}</h1>
    <button class="icon-btn" data-act="month" data-v="1" aria-label="Période suivante">${Mt.right}</button></div>
    <div class="seg">${[["month","Mois"],["year","Année"],["all","Tout"]].map(([a,o])=>`<button class="${i.period===a?"on":""}" data-act="period" data-v="${a}">${o}</button>`).join("")}</div>
  </div>
  <div class="filters">
    <input type="search" id="q" placeholder="Rechercher (note, catégorie, montant…)" value="${Re(i.q)}" autocomplete="off">
    <select id="f-space">${n("","Tous les espaces",i.space)}${n("perso","Personnel",i.space)}${n("act","Activités",i.space)}</select>
    <select id="f-act">${n("","Toutes les activités",i.act)}${Kt().map(a=>n(a.id,a.data.name,i.act)).join("")}</select>
    <select id="f-cat">${n("","Toutes les catégories",i.cat)}${Cn().map(a=>n(a.id,`${a.data.icon} ${a.data.name} (${a.data.space==="perso"?"Perso":"Act."}${a.data.type==="rev"?", revenu":""})`,i.cat)).join("")}</select>
    <select id="f-pay">${n("","Tous les paiements",i.pay)}${Ko.map(a=>n(a,a,i.pay)).join("")}</select>
  </div>
  <div class="row" style="justify-content:space-between;margin-bottom:6px">
    <div class="totals-bar"><span>${e.length} opération${e.length>1?"s":""}</span><span>Revenus <b class="good">${Ne(t.rev)}</b></span><span>Dépenses <b>${Ne(t.dep)}</b></span><span>Solde <b class="${t.bal<0?"bad":""}">${Ne(t.bal,!0)}</b></span></div>
    <div class="row">${i.q||i.space||i.act||i.cat||i.pay?'<button class="btn ghost" data-act="clearf">Effacer les filtres</button>':""}<button class="btn" data-act="csv">Export CSV</button><button class="btn" data-act="pdf">Export PDF</button></div>
  </div>
  ${r||'<div class="empty"><b>Aucune opération</b>Rien ne correspond à ces filtres pour cette période.</div>'}`}function Oy(i){const e=i.data,t=Jn(e.catId),n=ds(e.actId),s=[e.space==="perso"?"Personnel":n?.name||"Activités",t.name,e.pay].join(" · ");return`<button class="tx" data-act="edit" data-v="${i.id}">
    <span class="ic" style="background:color-mix(in srgb, ${t.color} 18%, var(--bg2))">${t.icon}</span>
    <span style="min-width:0"><div class="t">${Re(e.note||t.name)}</div><div class="s">${Re(s)}${e.recId?" · récurrente":""}${e.receipt?" · reçu":""}</div></span>
    <span class="a ${e.type==="rev"?"good":""}">${e.type==="rev"?"+":"−"}${$t(e.amount)}<small>FCFA</small></span>
  </button>`}function su(){const i=yd();return`<div class="card-h" style="margin:28px 2px 12px"><h2>Opérations récurrentes</h2><button class="btn primary" data-act="addRec">${Mt.plus.replace("<svg",'<svg width="16" height="16"')}Ajouter</button></div>
  <p class="muted" style="margin:0 0 12px;font-size:13px">Loyer, abonnements, internet… Elles s'ajoutent toutes seules chaque mois au jour choisi.</p>
  ${i.length?i.map(e=>{const t=Jn(e.data.catId);return`<button class="tx" data-act="editRec" data-v="${e.id}"><span class="ic" style="background:color-mix(in srgb, ${t.color} 18%, var(--bg2))">${t.icon}</span>
    <span style="min-width:0"><div class="t">${Re(e.data.label)}</div><div class="s">Le ${e.data.day} de chaque mois · ${e.data.space==="perso"?"Personnel":ds(e.data.actId)?.name||"Activités"} · ${Re(e.data.pay)}${e.data.active?"":" · en pause"}</div></span>
    <span class="a ${e.data.type==="rev"?"good":""}">${e.data.type==="rev"?"+":"−"}${$t(e.data.amount)}<small>FCFA / mois</small></span></button>`}).join(""):'<div class="empty"><b>Aucune opération récurrente</b>Ajoute ton loyer ou tes abonnements pour ne plus les saisir.</div>'}`}const ns=()=>An("src").sort((i,e)=>i.data.order-e.data.order),is=()=>Cn().filter(i=>i.data.space==="perso"&&i.data.type==="dep");function mn(i=R.month){const e=R.recs.get("plan_"+i);if(e&&!e.deleted)return{plan:e.data,stored:!0,from:null};const t=An("plan").filter(s=>s.data.month<i).sort((s,r)=>s.data.month<r.data.month?1:-1)[0];if(t)return{plan:{month:i,inc:{...t.data.inc},got:{},alloc:JSON.parse(JSON.stringify(t.data.alloc||{}))},stored:!1,from:t.data.month};const n={};return ns().forEach(s=>{s.data.amount&&(n[s.id]=s.data.amount)}),{plan:{month:i,inc:n,got:{},alloc:{}},stored:!1,from:null}}const ea=i=>ns().reduce((e,t)=>e+(i.inc[t.id]||0),0);function Ec(i){const e=ea(i),t=is().map(a=>({c:a,amount:Hr(i.alloc[a.id],e),spent:bc("perso",a.id,i.month)})),n=t.reduce((a,o)=>a+o.amount,0),s=t.reduce((a,o)=>a+Math.max(0,o.amount-o.spent),0),r=ns().reduce((a,o)=>a+(i.got[o.id]&&R.recs.get(i.got[o.id])&&!R.recs.get(i.got[o.id]).deleted&&i.inc[o.id]||0),0);return{income:e,rows:t,allocated:n,rest:e-n,left:s,received:r}}function Fy(i=R.month){const{plan:e}=mn(i),t=Object.keys(e.alloc).length>0,n=ea(e),s=t?is().map(a=>({space:"perso",catId:a.id,amount:Hr(e.alloc[a.id],n)})):[],r=vd().map(a=>a.data).filter(a=>a.space==="act"||!t);return[...s,...r].filter(a=>a.amount>0)}function ky(){const{plan:i}=mn(),e=Ec(i);return!e.income||R.scope==="act"?"":`<div class="muted" style="font-size:12px;margin:-4px 0 10px">Revenu du foyer ${Ne(e.income)} · ${e.rest===0?'<span class="good">tout est réparti</span>':e.rest>0?`reste à répartir <b class="warn">${Ne(e.rest)}</b>`:`<b class="bad">${Ne(-e.rest)} de trop répartis</b>`}</div>`}async function ss(i){const{plan:e}=mn(),t=JSON.parse(JSON.stringify(e));t.month=R.month,i(t);const n="plan_"+R.month,s=R.recs.get(n);await yt([{id:n,kind:"plan",updatedAt:s?.updatedAt||0,data:t}])}function By(){const i=Cn().filter(e=>e.data.space==="perso"&&e.data.type==="rev");return(i.find(e=>e.data.name==="Salaire")||i[0])?.id||""}const ru=i=>(Math.round(i*10)/10).toString().replace(".",",");function Fr(i){return Number(String(i).replace(/\D/g,"").slice(0,12))||0}function Sd(i){const e=parseFloat(String(i).replace(",",".").replace(/[^\d.]/g,""));return isFinite(e)?Math.min(100,Math.max(0,Math.round(e*10)/10)):0}function zy(){const i=R.budgetSpace,e=`<div class="board-head"><div class="month">
    <button class="icon-btn" data-act="month" data-v="-1" aria-label="Mois précédent">${Mt.left}</button><h1>Répartition · ${Ls(R.month)}</h1><button class="icon-btn" data-act="month" data-v="1" aria-label="Mois suivant">${Mt.right}</button></div>
    <div class="seg">${[["perso","Foyer"],["act","Activités"]].map(([h,p])=>`<button class="${i===h?"on":""}" data-act="bspace" data-v="${h}">${p}</button>`).join("")}</div>
  </div>`;if(i==="act")return e+Hy()+su();const{plan:t,stored:n,from:s}=mn(),r=Ec(t),a=ns(),o=R.month>fn(),c=!n&&s?`<div class="plan-note">Repris de la répartition de ${Ls(s)}. Change un montant pour l'ajuster à ce mois.</div>`:!n&&!r.income?`<div class="plan-note">Commence par saisir ce que vous gagnez ce mois-ci, puis répartis-le dans les cases (en FCFA ou en %). Tu peux aussi partir d'un modèle.</div>`:"",l=Math.max(r.income,r.allocated,1),u=r.rows.filter(h=>h.amount>0).map(h=>`<i data-seg="${h.c.id}" style="width:${h.amount/l*100}%;background:${h.c.data.color}" title="${Re(h.c.data.name)} : ${Ne(h.amount)}"></i>`).join(""),d=r.rest<0?"bad":r.rest===0&&r.income?"good":"warn",f=a.map(h=>{const p=t.inc[h.id]||0,T=t.got[h.id],b=!!(T&&R.recs.get(T)&&!R.recs.get(T).deleted);return`<div class="src-row">
      <span class="src-ic" style="background:color-mix(in srgb, ${h.data.color} 20%, var(--bg2))">${h.data.icon}</span>
      <input type="text" class="src-name" data-act="srcName" data-v="${h.id}" value="${Re(h.data.name)}" aria-label="Nom de la source">
      <label class="money"><input type="text" inputmode="numeric" class="inc" data-src="${h.id}" value="${p?$t(p):""}" placeholder="0" aria-label="Montant ${Re(h.data.name)}"><span>FCFA</span></label>
      <button class="got ${b?"on":""}" data-act="got" data-v="${h.id}" ${o?"disabled":""} title="${b?"Reçu : enregistré dans les opérations":"Marquer comme reçu"}">${b?"✓ Reçu":"Reçu ?"}</button>
      <button class="icon-btn src-del" data-act="srcDel" data-v="${h.id}" aria-label="Supprimer ${Re(h.data.name)}">${Mt.trash}</button>
    </div>`}).join(""),m=r.income?`<div class="shares"><div class="slices thin">${a.filter(h=>t.inc[h.id]).map(h=>`<i data-share="${h.id}" style="width:${(t.inc[h.id]||0)/r.income*100}%;background:${h.data.color}"></i>`).join("")}</div>
    <div class="legend-inline wrap">${a.filter(h=>t.inc[h.id]).map(h=>`<span><i style="background:${h.data.color}"></i>${Re(h.data.name)} · ${Math.round((t.inc[h.id]||0)/r.income*100)} %</span>`).join("")}</div></div>`:"",g=r.rows.map(({c:h,amount:p,spent:T})=>{const b=t.alloc[h.id],E=b?.m||R.pendingMode[h.id]||"f",U=p?T/p:0,C=p?U>=1?"over":U>=.8?"warn":"":"",A=p?U>=1?'<span class="pill bad">Dépassé</span>':U>=.8?`<span class="pill warn">${Math.round(U*100)} % utilisé</span>`:`<span class="pill good">${Math.round(U*100)} % utilisé</span>`:T?'<span class="pill warn">Hors répartition</span>':'<span class="pill neutral">Vide</span>',N=r.income&&p?`<span class="muted" style="font-size:12px">${ru(p/r.income*100)} % du revenu</span>`:"";return`<div class="card env ${p?"filled":""}" style="--c:${h.data.color}">
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="env-name">${h.data.icon} ${Re(h.data.name)}</span>${A}</div>
      <div class="env-in">
        <div class="seg sm">${[["f","FCFA"],["p","%"]].map(([K,_])=>`<button class="${E===K?"on":""}" data-act="amode" data-cat="${h.id}" data-v="${K}">${_}</button>`).join("")}</div>
        <label class="money ${E==="p"?"pct":""}"><input type="text" inputmode="${E==="p"?"decimal":"numeric"}" class="alloc" data-cat="${h.id}" data-mode="${E}" value="${b?E==="p"?ru(b.v):$t(b.v):""}" placeholder="0" aria-label="Part pour ${Re(h.data.name)}"><span>${E==="p"?"%":"FCFA"}</span></label>
      </div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><b class="num" data-calc="${h.id}">${E==="p"?"= "+Ne(p):Ne(p)}</b>${N}</div>
      <div class="meter ${C}"><i style="width:${p?Math.min(100,U*100):0}%"></i></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap;font-size:12px"><span class="muted num">Dépensé ${Ne(T)}</span><span class="num ${p-T<0?"bad":""}">${p?p-T<0?"Dépassé de "+Ne(T-p):"Reste "+Ne(p-T):""}</span></div>
    </div>`}).join(""),y=fu.map(h=>`<button class="preset" data-act="preset" data-v="${h.id}"><b>${Re(h.name)}</b><span class="muted">${Re(h.desc)}</span></button>`).join("");return e+c+`
  <section class="card plan-hero">
    <div class="plan-kpis">
      <div class="kpi"><div class="eyebrow">Revenu du foyer</div><div class="v gold" id="plIncome">${Ne(r.income)}</div>${r.income?`<div class="muted" style="font-size:12px;margin-top:4px">Reçu : ${Ne(r.received)}</div>`:""}</div>
      <div class="kpi"><div class="eyebrow">Réparti</div><div class="v" id="plAlloc">${Ne(r.allocated)}</div></div>
      <div class="kpi"><div class="eyebrow">Reste à répartir</div><div class="v ${d}" id="plRest">${Ne(r.rest)}</div></div>
    </div>
    <div class="slices" id="plSlices" aria-label="Répartition du revenu">${u}</div>
    <div class="row" style="justify-content:space-between;font-size:13px"><span class="muted">Encore disponible dans les cases</span><b class="num">${Ne(r.left)}</b></div>
    <div class="save-bar"><span class="save-state ${n?"saved":"new"}">${n?"✓ Enregistré":s?"Repris du mois dernier":"Pas encore enregistré"}</span><button class="btn primary" data-act="planSave">💾 Enregistrer</button></div>
  </section>
  <div class="two" style="margin-top:14px">
    <section class="card grid" style="gap:12px">
      <div class="card-h" style="margin:0"><h2>Revenus du foyer</h2><span class="muted" style="font-size:12px">ce mois-ci</span></div>
      ${f||'<p class="muted" style="margin:0">Aucune source de revenu.</p>'}
      <div class="row" style="flex-wrap:nowrap"><input type="text" id="newSrc" placeholder="Nouvelle source (ex. Prime, Loyer perçu)"><button class="btn" data-act="srcAdd">Ajouter</button></div>
      ${m}
      <p class="muted" style="margin:0;font-size:12px">« Reçu » enregistre le montant dans tes opérations (revenu, Personnel).</p>
    </section>
    <section class="card grid" style="gap:12px">
      <div class="card-h" style="margin:0"><h2>Répartir en un clic</h2></div>
      <div class="presets">${y}</div>
      <div class="row"><button class="btn" data-act="restSav" ${r.rest>0?"":"disabled"}>🏦 Mettre le reste en Épargne</button>
      ${n?'<button class="btn ghost" data-act="planClear">Vider les cases</button>':""}</div>
      <div id="presetZone"></div>
    </section>
  </div>
  <div class="card-h" style="margin:26px 2px 12px"><h2>Les cases</h2><span class="muted" style="font-size:12px">en FCFA ou en % du revenu</span></div>
  <div class="acts">${g}</div>
  <div class="save-bar" style="margin-top:14px"><span class="save-state ${n?"saved":"new"}">${n?"✓ Enregistré":"Pas encore enregistré"}</span><button class="btn primary" data-act="planSave">💾 Enregistrer la répartition</button></div>
  <div class="row" style="flex-wrap:nowrap;margin-top:14px;max-width:520px"><input type="text" id="newCase" placeholder="Nouvelle case (ex. Vacances, Voiture)"><button class="btn" data-act="caseAdd">Ajouter</button></div>
  ${su()}`}function Hy(){return`<p class="muted" style="margin:0 0 14px;font-size:13px">Budget mensuel par catégorie pour tes activités. La barre passe en jaune à 80 % et en rouge quand le budget est dépassé.</p>
  <div class="acts">${Cn().filter(t=>t.data.space==="act"&&t.data.type==="dep").map(t=>{const n=vd().find(c=>c.data.space==="act"&&c.data.catId===t.id),s=bc("act",t.id),r=n?.data.amount||0,a=r?s/r:0,o=r?a>=1?"over":a>=.8?"warn":"":"";return`<div class="card" style="padding:14px"><div class="row" style="justify-content:space-between;flex-wrap:nowrap;margin-bottom:10px">
      <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600">${t.data.icon} ${Re(t.data.name)}</span>
      ${r?a>=1?'<span class="pill bad">Dépassé</span>':a>=.8?'<span class="pill warn">Attention · '+Math.round(a*100)+" %</span>":'<span class="pill good">'+Math.round(a*100)+" %</span>":'<span class="pill neutral">Pas de budget</span>'}</div>
      <div class="meter ${o}" style="margin-bottom:10px"><i style="width:${r?Math.min(100,a*100):0}%"></i></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="muted num" style="font-size:13px">${Ne(s)} dépensés</span>
      <label class="row" style="gap:6px;flex-wrap:nowrap"><span class="muted" style="font-size:12px">Budget</span><input type="text" inputmode="numeric" class="bud" data-cat="${t.id}" value="${r?$t(r):""}" placeholder="0" style="width:120px;text-align:right" aria-label="Budget ${Re(t.data.name)}"></label></div></div>`}).join("")}</div>`}function Vy(){if(R.view!=="plan"||R.budgetSpace!=="perso")return;let i=0;document.querySelectorAll("input.inc").forEach(o=>i+=Fr(o.value));let e=0;const t=[];document.querySelectorAll("input.alloc").forEach(o=>{const c=o.dataset.mode==="p",l=c?Sd(o.value):Fr(o.value),u=c?Math.round(i*l/100):l;e+=u,t.push([o.dataset.cat,u]);const d=document.querySelector(`[data-calc="${o.dataset.cat}"]`);d&&(d.textContent=(c?"= ":"")+Ne(u))});const n=i-e,s=(o,c,l)=>{const u=document.getElementById(o);u&&(u.textContent=c,l!==void 0&&(u.className="v "+l))};document.querySelectorAll("[data-act=restSav]").forEach(o=>o.disabled=n<=0),s("plIncome",Ne(i)),s("plAlloc",Ne(e)),s("plRest",Ne(n),n<0?"bad":n===0&&i?"good":"warn");const r=Math.max(i,e,1),a=document.getElementById("plSlices");a&&(a.innerHTML=t.filter(([,o])=>o>0).map(([o,c])=>{const l=Jn(o);return`<i style="width:${c/r*100}%;background:${l.color}" title="${Re(l.name)} : ${Ne(c)}"></i>`}).join(""))}function Gy(){const i=document.activeElement;let e="";i&&i.tagName==="INPUT"?i.id?e="#"+i.id:i.dataset.cat?e=`input.${i.classList[0]}[data-cat="${i.dataset.cat}"]`:i.dataset.src?e=`input.${i.classList[0]}[data-src="${i.dataset.src}"]`:i.dataset.v&&(e=`input[data-act="${i.dataset.act}"][data-v="${i.dataset.v}"]`):i&&i.tagName==="BUTTON"&&i.dataset.act&&i.dataset.v&&(e=`button[data-act="${i.dataset.act}"][data-v="${i.dataset.v}"]`);const t=scrollY;if(Ae(),scrollTo({top:t}),e){const n=document.querySelector(e);if(n&&(n.focus({preventScroll:!0}),n.tagName==="INPUT"))try{n.select()}catch{}}}let jn=!1,Xo=0;function Cr(i){document.querySelectorAll(".save-state").forEach(e=>{e.className="save-state "+i,e.textContent=i==="dirty"?"Modifications en cours…":i==="saving"?"Enregistrement…":"✓ Enregistré"})}function _i(i=!1){if(clearTimeout(Xo),!jn&&!i||R.view!=="plan"||R.budgetSpace!=="perso")return jn=!1,Promise.resolve();const e=Md();return jn=!1,e?Ed(e):Promise.resolve()}function Md(){const i=[...document.querySelectorAll("input.inc")],e=[...document.querySelectorAll("input.alloc")];if(!i.length&&!e.length)return null;const t={},n={};return i.forEach(s=>{t[s.dataset.src]=Fr(s.value)}),e.forEach(s=>{const r=s.dataset.mode==="p"?"p":"f";n[s.dataset.cat]={m:r,v:r==="p"?Sd(s.value):Fr(s.value)}}),{month:R.month,inc:t,alloc:n}}function $y(){const i=Md();i&&ut.set("planDraft",i)}function Ed(i){const{plan:e}=mn(i.month),t=JSON.parse(JSON.stringify(e));t.month=i.month;const n=[];Object.entries(i.inc).forEach(([a,o])=>{if(!R.recs.get(a)||R.recs.get(a).deleted)return;o?t.inc[a]=o:delete t.inc[a];const c=R.recs.get(a);c&&o&&c.data.amount!==o&&n.push({...c,data:{...c.data,amount:o}});const l=t.got[a],u=l?R.recs.get(l):null;u&&!u.deleted&&(o?u.data.amount!==o&&n.push({...u,data:{...u.data,amount:o}}):(n.push({...u,deleted:!0}),delete t.got[a]))}),Object.entries(i.alloc).forEach(([a,o])=>{o.v?t.alloc[a]=o:delete t.alloc[a]});const s="plan_"+i.month,r=R.recs.get(s);return n.push({id:s,kind:"plan",updatedAt:r?.updatedAt||0,data:t}),Cr("saving"),yt(n).then(()=>{ut.del("planDraft"),Cr("saved")},()=>{jn=!0,Cr("dirty"),we("Enregistrement impossible, réessaie.")})}const Wy=()=>jn||!!document.activeElement?.matches?.("input.inc, input.alloc");window.addEventListener("pagehide",()=>{_i()});document.addEventListener("visibilitychange",()=>{document.hidden&&_i()});async function jy(i,e){const{plan:t}=mn(),n=t.alloc[i];if((n?.m||"f")===e)return;const s=ea(t);if(!n){R.pendingMode[i]=e,Ae();return}if(e==="p"&&!s){we("Saisis d'abord les revenus du foyer pour utiliser les %.");return}const r=Hr(n,s),a=e==="p"?{m:"p",v:Math.round(r/s*1e3)/10}:{m:"f",v:r};await ss(o=>{o.alloc[i]=a}),Ae()}async function Xy(i){const{plan:e}=mn(),t=e.got[i],n=t?R.recs.get(t):null;if(n&&!n.deleted){await yt([{...n,deleted:!0}]),await ss(o=>{delete o.got[i]}),Ae(),we("Revenu retiré des opérations");return}const s=e.inc[i]||0;if(!s){we("Indique d'abord le montant reçu.");return}if(R.month>fn()){we("Ce mois n'a pas encore commencé.");return}const r=R.recs.get(i)?.data,a="tx_"+un();await yt([{id:a,kind:"tx",updatedAt:0,data:{type:"rev",amount:s,date:R.month===fn()?Vr():Vd(R.month),space:"perso",catId:By(),pay:"Virement",note:r?.name||"Revenu"}}]),await ss(o=>{o.got[i]=a}),Ae(),we("Revenu enregistré dans les opérations")}async function qy(i){const e=fu.find(a=>a.id===i);if(!e)return;const{plan:t}=mn();if(!ea(t)){we("Saisis d'abord les revenus du foyer.");return}const n=is(),s=[],r={};Object.entries(e.pct).forEach(([a,o],c)=>{let l=n.find(u=>u.data.name===a)?.id;l||(l="cat_"+un(),s.push({id:l,kind:"cat",updatedAt:0,data:{name:a,icon:"•",color:"#e8c27e",space:"perso",type:"dep",order:60+c}})),r[l]={m:"p",v:o}}),s.length&&await yt(s),await ss(a=>{a.alloc=r}),Ae(),we(`Modèle « ${e.name} » appliqué`)}async function Yy(){const{plan:i}=mn(),e=Ec(i);if(e.rest<=0)return;let t=is().find(s=>s.data.name==="Épargne")?.id;t||(t="cat_"+un(),await yt([{id:t,kind:"cat",updatedAt:0,data:{name:"Épargne",icon:"🏦",color:"#5FC28A",space:"perso",type:"dep",order:9}}]));const n=Hr(i.alloc[t],e.income);await ss(s=>{s.alloc[t]={m:"f",v:n+e.rest}}),Ae(),we(`${Ne(e.rest)} ajoutés à l'Épargne`)}let kr=null;window.addEventListener("beforeinstallprompt",i=>{i.preventDefault(),kr=i,R.view==="settings"&&Ae()});function Ky(){const i=Hs(),e=ut.get("pin"),t=ut.get("bio"),n=/iphone|ipad|ipod/i.test(navigator.userAgent),s=matchMedia("(display-mode: standalone)").matches||navigator.standalone,r=Kt().map(c=>`<div class="it noic"><input type="color" value="${c.data.color}" data-act="actColor" data-v="${c.id}" aria-label="Couleur"><input type="text" value="${Re(c.data.name)}" data-act="actName" data-v="${c.id}" aria-label="Nom de l'activité"><button class="icon-btn" data-act="actDel" data-v="${c.id}" aria-label="Supprimer">${Mt.trash}</button></div>`).join(""),a=Cn().filter(c=>c.data.space===R.setCatSpace&&c.data.type===R.setCatType).map(c=>`<div class="it"><input type="color" value="${c.data.color}" data-act="catColor" data-v="${c.id}" aria-label="Couleur"><input type="text" class="emo" value="${Re(c.data.icon)}" data-act="catIcon" data-v="${c.id}" aria-label="Icône" maxlength="4"><input type="text" value="${Re(c.data.name)}" data-act="catName" data-v="${c.id}" aria-label="Nom"><button class="icon-btn" data-act="catDel" data-v="${c.id}" aria-label="Supprimer">${Mt.trash}</button></div>`).join(""),o=hn().some(c=>c.data.demo);return`
  <div class="board-head"><h1>Réglages</h1></div>
  <div class="set">
    <section class="card">
      <h2>Installer l'application</h2>
      ${s?`<p class="muted" style="margin:0">L'application est installée sur cet appareil.</p>`:kr?'<p class="muted" style="margin:0">Installe MJ7 Finances comme une vraie application, avec son icône.</p><button class="btn primary" data-act="install">Installer sur cet appareil</button>':n?`<ol class="steps"><li>Ouvre ce lien dans <b>Safari</b>.</li><li>Touche le bouton <b>Partager</b> (carré avec une flèche).</li><li>Choisis <b>Sur l'écran d'accueil</b>, puis <b>Ajouter</b>.</li></ol>`:`<ol class="steps"><li>Dans <b>Chrome</b> ou <b>Edge</b>, clique sur l'icône d'installation à droite de la barre d'adresse.</li><li>Sur Android : menu <b>⋮</b> puis <b>Installer l'application</b>.</li><li>Sur Mac avec Safari : menu <b>Fichier</b> puis <b>Ajouter au Dock</b>.</li></ol>`}
    </section>

    <section class="card">
      <h2>Synchronisation ordinateur ↔ téléphone</h2>
      ${i?R.sync.email?`<p style="margin:0">Connecté : <b>${Re(R.sync.email)}</b></p><p class="muted" style="margin:0;font-size:13px">${Re(R.sync.msg||"")}</p>
        <div class="row"><button class="btn primary" data-act="sbSync">${Mt.sync.replace("<svg",'<svg width="16" height="16"')}Synchroniser maintenant</button><button class="btn ghost" data-act="sbOut">Se déconnecter</button></div>`:`<p class="muted" style="margin:0">Connecte-toi avec l'e-mail et le mot de passe du foyer. <b>Les mêmes sur tous vos appareils</b> (toi et ta femme).</p>
        <label class="f">E-mail du foyer<input type="email" id="sb-mail" placeholder="toi@exemple.com" autocomplete="email" value="${Re(ut.get("mail",""))}"></label>
        <label class="f">Mot de passe (8 caractères minimum)<input type="password" id="sb-pw" placeholder="••••••••" autocomplete="current-password"></label>
        <div class="row"><button class="btn primary" data-act="sbLogin">Se connecter</button><button class="btn" data-act="sbSignup">Créer le compte (1re fois)</button></div>
        <p class="muted" style="margin:0;font-size:12px">« Créer le compte » une seule fois, sur le premier appareil. Ensuite, sur les autres : « Se connecter » avec le même e-mail et le même mot de passe.</p>
        <details><summary class="muted" style="cursor:pointer;font-size:13px">Ou se connecter avec un code reçu par e-mail</summary>
        <div class="grid" style="gap:10px;margin-top:10px"><button class="btn" data-act="sbSend">Recevoir le code</button>
        <label class="f">Code reçu par e-mail<input type="text" id="sb-code" inputmode="numeric" placeholder="123456" autocomplete="one-time-code"></label>
        <button class="btn" data-act="sbVerify">Valider le code</button></div></details>
        <button class="btn ghost" data-act="sbReset">Changer de projet Supabase</button>`:`<p class="muted" style="margin:0">Tes données restent sur cet appareil. Pour les retrouver sur ton téléphone et ton ordinateur, connecte un projet Supabase gratuit (le guide est dans le fichier LISEZ-MOI).</p>
        <label class="f">URL du projet Supabase<input type="text" id="sb-url" placeholder="https://xxxx.supabase.co" autocomplete="off"></label>
        <label class="f">Clé publique (anon public)<input type="text" id="sb-key" placeholder="eyJhbGciOi…" autocomplete="off"></label>
        <button class="btn primary" data-act="sbSave">Enregistrer</button>
        <details><summary class="muted" style="cursor:pointer;font-size:13px">Script SQL à coller dans Supabase</summary><pre class="sql">${Re(by)}</pre></details>`}
    </section>

    <section class="card">
      <h2>Apparence</h2>
      <div class="seg">${[["dark","Sombre"],["light","Clair"],["system","Comme l'appareil"]].map(([c,l])=>`<button class="${$n.theme===c?"on":""}" data-act="theme" data-v="${c}">${l}</button>`).join("")}</div>
      <label class="row" style="justify-content:space-between"><span>Vue simplifiée sans 3D<br><span class="muted" style="font-size:12px">Pour les téléphones lents ou pour économiser la batterie</span></span><input type="checkbox" id="flat" ${$n.flat?"checked":""} style="width:22px;height:22px"></label>
    </section>

    <section class="card">
      <h2>Verrouillage</h2>
      ${e?`<p class="muted" style="margin:0">Un code à 4 chiffres est demandé à l'ouverture.</p>
        <div class="row"><button class="btn" data-act="pinSet">Changer le code</button><button class="btn danger" data-act="pinDel">Retirer le code</button></div>
        ${"PublicKeyCredential"in window?t?'<div class="row"><span class="pill good">Face ID / empreinte activé</span><button class="btn ghost" data-act="bioDel">Désactiver</button></div>':'<button class="btn" data-act="bioSet">Activer Face ID / empreinte</button>':""}`:`<p class="muted" style="margin:0">Protège l'app par un code à 4 chiffres (et Face ID ou empreinte si ton appareil le permet).</p><button class="btn primary" data-act="pinSet">Choisir un code</button>`}
    </section>

    <section class="card">
      <h2>Activités</h2>
      <div class="list-ed">${r||'<p class="muted" style="margin:0">Aucune activité.</p>'}</div>
      <div class="row" style="flex-wrap:nowrap"><input type="text" id="newAct" placeholder="Nouvelle activité (ex. Studio)"><button class="btn primary" data-act="actAdd">Ajouter</button></div>
    </section>

    <section class="card">
      <h2>Catégories</h2>
      <div class="row"><div class="seg">${[["perso","Personnel"],["act","Activités"]].map(([c,l])=>`<button class="${R.setCatSpace===c?"on":""}" data-act="csp" data-v="${c}">${l}</button>`).join("")}</div>
      <div class="seg">${[["dep","Dépenses"],["rev","Revenus"]].map(([c,l])=>`<button class="${R.setCatType===c?"on":""}" data-act="cty" data-v="${c}">${l}</button>`).join("")}</div></div>
      <div class="list-ed">${a}</div>
      <div class="row" style="flex-wrap:nowrap"><input type="text" id="newCat" placeholder="Nouvelle catégorie"><button class="btn primary" data-act="catAdd">Ajouter</button></div>
    </section>

    <section class="card">
      <h2>Sauvegarde</h2>
      <p class="muted" style="margin:0">Un fichier de secours avec toutes tes données, à garder en lieu sûr.</p>
      <div class="row"><button class="btn" data-act="backup">Télécharger une sauvegarde</button><label class="btn">Restaurer un fichier<input type="file" id="restore" accept="application/json,.json" hidden></label></div>
    </section>

    <section class="card">
      <h2>Données d'exemple</h2>
      <p class="muted" style="margin:0">Remplit l'app avec des opérations fictives sur 4 mois pour la tester. Tu peux les retirer d'un clic.</p>
      ${o?`<button class="btn danger" data-act="demoDel">Retirer les données d'exemple</button>`:`<button class="btn" data-act="demoAdd">Ajouter les données d'exemple</button>`}
      <div id="wipeZone"><button class="btn ghost bad" data-act="wipeAsk" style="padding-left:0">Effacer toutes les données de cet appareil</button></div>
    </section>
  </div>`}let Ut=null,Br=!1;function qo(i){const e=ut.get("last",{space:"perso",pay:"Wave",actId:""});if(i){const n=R.recs.get(i).data;Ut={id:i,type:n.type,amount:$t(n.amount),date:n.date,space:n.space,actId:n.actId||"",catId:n.catId,pay:n.pay,note:n.note||"",receipt:n.receipt}}else{const t=R.scope==="act"?"act":R.scope==="perso"?"perso":e.space;Ut={type:"dep",amount:"",date:R.month===fn()?Vr():R.month+"-01",space:t,actId:R.actFilter||e.actId||Kt()[0]?.id||"",catId:"",pay:e.pay,note:""}}Br=!1,Bn(!0)}function Bn(i=!1){if(!Ut)return;document.querySelector(".scrim")?.remove();const e=Ut,t=Cn().filter(r=>r.data.space===e.space&&r.data.type===e.type);t.find(r=>r.id===e.catId)||(e.catId="");const n=document.createElement("div");n.className="scrim",n.innerHTML=`<form class="sheet" id="sheet" novalidate><div class="grab"></div>
    <div class="sheet-h"><div class="seg">${[["dep","Dépense"],["rev","Revenu"]].map(([r,a])=>`<button type="button" class="${e.type===r?"on":""}" data-act="dtype" data-v="${r}">${a}</button>`).join("")}</div>
      <button type="button" class="icon-btn" data-act="close" aria-label="Fermer">${Mt.x}</button></div>
    <div class="amount ${e.type}"><input id="amt" type="text" inputmode="numeric" placeholder="0" value="${Re(e.amount)}" aria-label="Montant" autocomplete="off"><span>FCFA</span></div>
    <div class="fgroup"><div class="seg">${[["perso","Personnel"],["act","Activités"]].map(([r,a])=>`<button type="button" class="${e.space===r?"on":""}" data-act="dspace" data-v="${r}">${a}</button>`).join("")}</div>
      ${e.space==="act"?`<div class="chips">${Kt().map(r=>`<button type="button" class="chip ${e.actId===r.id?"on":""}" data-act="dact" data-v="${r.id}"><i style="background:${r.data.color}"></i>${Re(r.data.name)}</button>`).join("")||'<span class="muted">Crée une activité dans Réglages.</span>'}</div>`:""}</div>
    <div class="fgroup"><span class="eyebrow">Catégorie</span><div class="cats">${t.map(r=>`<button type="button" class="cat ${e.catId===r.id?"on":""}" data-act="dcat" data-v="${r.id}"><em>${r.data.icon}</em>${Re(r.data.name)}</button>`).join("")}</div></div>
    <div class="fgroup"><span class="eyebrow">Moyen de paiement</span><div class="chips">${Ko.map(r=>`<button type="button" class="chip ${e.pay===r?"on":""}" data-act="dpay" data-v="${r}"><i style="background:${Jo[r]}"></i>${r}</button>`).join("")}</div></div>
    <div class="fgroup" style="grid-template-columns:minmax(0,1fr) minmax(0,1.4fr)"><label class="f">Date<input type="date" id="ddate" value="${e.date}"></label><label class="f">Note<input type="text" id="dnote" value="${Re(e.note)}" placeholder="Facultatif"></label></div>
    <div class="fgroup"><div class="receipt">${e.receipt?`<img src="${e.receipt}" alt="Reçu"><button type="button" class="btn ghost" data-act="rcptDel">Retirer le reçu</button>`:'<label class="btn">Ajouter une photo du reçu<input type="file" id="rcpt" accept="image/*" capture="environment" hidden></label>'}</div></div>
    <div id="sheetErr" class="bad" style="font-size:13px;margin-bottom:8px" hidden></div>
    ${Br?'<div class="confirm"><span>Supprimer cette opération ? Cette action est définitive.</span><div class="row"><button type="button" class="btn danger" data-act="delYes">Supprimer</button><button type="button" class="btn ghost" data-act="delNo">Annuler</button></div></div>':`<div class="row" style="justify-content:space-between">${e.id?`<button type="button" class="btn danger" data-act="delAsk">${Mt.trash.replace("<svg",'<svg width="16" height="16"')}Supprimer</button>`:"<span></span>"}<button type="submit" class="btn primary" style="padding:12px 22px">${e.id?"Enregistrer":e.type==="dep"?"Ajouter la dépense":"Ajouter le revenu"}</button></div>`}
  </form>`,document.body.appendChild(n);const s=$e("#amt",n);s.addEventListener("input",()=>{const r=s.value.replace(/\D/g,"").slice(0,12);s.value=r?$t(Number(r)):"",e.amount=s.value}),$e("#ddate",n).addEventListener("change",r=>e.date=r.target.value),$e("#dnote",n).addEventListener("input",r=>e.note=r.target.value),n.addEventListener("click",r=>{r.target===n&&Us()}),$e("#rcpt",n)?.addEventListener("change",async r=>{const a=r.target.files?.[0];a&&(e.receipt=await Zy(a),Bn())}),$e("#sheet",n).addEventListener("submit",r=>{r.preventDefault(),Jy()}),i&&!e.id&&matchMedia("(hover: hover)").matches&&s.focus()}function Us(){Ut=null,document.querySelector(".scrim")?.remove()}async function Jy(){const i=Ut,e=Number(i.amount.replace(/\D/g,"")),t=a=>{const o=$e("#sheetErr");o.textContent=a,o.hidden=!1};if(!e)return t("Indique un montant.");if(!i.catId)return t("Choisis une catégorie.");if(i.space==="act"&&!i.actId)return t("Choisis l'activité concernée.");if(!i.date)return t("Indique la date.");const n=i.id?R.recs.get(i.id):null,s={id:i.id||"tx_"+un(),kind:"tx",updatedAt:n?.updatedAt||0,data:{type:i.type,amount:e,date:i.date,space:i.space,actId:i.space==="act"?i.actId:void 0,catId:i.catId,pay:i.pay,note:i.note.trim()||void 0,receipt:i.receipt,recId:n?.data.recId}};await yt([s]),ut.set("last",{space:i.space,pay:i.pay,actId:i.actId});const r=!i.id;Us(),R.view==="board"?(R.month=i.date.slice(0,7),Ae(),r&&i.type==="dep"&&setTimeout(()=>Wn?.drop(i.catId),350)):Ae(),we(r?i.type==="dep"?"Dépense ajoutée":"Revenu ajouté":"Opération modifiée")}function Zy(i){return new Promise(e=>{const t=new Image,n=URL.createObjectURL(i);t.onload=()=>{const s=Math.min(1,1100/Math.max(t.width,t.height)),r=document.createElement("canvas");r.width=t.width*s,r.height=t.height*s,r.getContext("2d").drawImage(t,0,0,r.width,r.height),URL.revokeObjectURL(n),e(r.toDataURL("image/jpeg",.62))},t.src=n})}let St=null,zr=!1;function au(i){if(i){const e=R.recs.get(i);St={...e.data,id:i,amountS:$t(e.data.amount)}}else St={label:"",type:"dep",amount:0,amountS:"",space:"perso",actId:Kt()[0]?.id,catId:"",pay:"Virement",day:1,active:!0,lastMonth:""};zr=!1,Hi()}function Hi(){const i=St;document.querySelector(".scrim")?.remove();const e=Cn().filter(r=>r.data.space===i.space&&r.data.type===i.type),t=document.createElement("div");t.className="scrim",t.innerHTML=`<form class="sheet" id="rsheet" novalidate><div class="grab"></div>
    <div class="sheet-h"><h2>${i.id?"Opération récurrente":"Nouvelle opération récurrente"}</h2><button type="button" class="icon-btn" data-act="close" aria-label="Fermer">${Mt.x}</button></div>
    <div class="fgroup"><label class="f">Libellé<input type="text" id="r-label" value="${Re(i.label)}" placeholder="Loyer, abonnement, internet…"></label></div>
    <div class="fgroup"><div class="row"><div class="seg">${[["dep","Dépense"],["rev","Revenu"]].map(([r,a])=>`<button type="button" class="${i.type===r?"on":""}" data-act="rtype" data-v="${r}">${a}</button>`).join("")}</div>
      <div class="seg">${[["perso","Personnel"],["act","Activités"]].map(([r,a])=>`<button type="button" class="${i.space===r?"on":""}" data-act="rspace" data-v="${r}">${a}</button>`).join("")}</div></div>
      ${i.space==="act"?`<div class="chips">${Kt().map(r=>`<button type="button" class="chip ${i.actId===r.id?"on":""}" data-act="ract" data-v="${r.id}"><i style="background:${r.data.color}"></i>${Re(r.data.name)}</button>`).join("")}</div>`:""}</div>
    <div class="fgroup" style="grid-template-columns:minmax(0,1.4fr) minmax(0,1fr)"><label class="f">Montant (FCFA)<input type="text" inputmode="numeric" id="r-amt" value="${Re(i.amountS)}" placeholder="0"></label><label class="f">Jour du mois<input type="number" id="r-day" min="1" max="31" value="${i.day}"></label></div>
    <div class="fgroup"><span class="eyebrow">Catégorie</span><div class="cats">${e.map(r=>`<button type="button" class="cat ${i.catId===r.id?"on":""}" data-act="rcat" data-v="${r.id}"><em>${r.data.icon}</em>${Re(r.data.name)}</button>`).join("")}</div></div>
    <div class="fgroup"><span class="eyebrow">Moyen de paiement</span><div class="chips">${Ko.map(r=>`<button type="button" class="chip ${i.pay===r?"on":""}" data-act="rpay" data-v="${r}"><i style="background:${Jo[r]}"></i>${r}</button>`).join("")}</div></div>
    <label class="row fgroup" style="display:flex;justify-content:space-between"><span>Active</span><input type="checkbox" id="r-active" ${i.active?"checked":""} style="width:22px;height:22px"></label>
    <div id="rErr" class="bad" style="font-size:13px;margin-bottom:8px" hidden></div>
    ${zr?'<div class="confirm"><span>Supprimer cette opération récurrente ? Les opérations déjà créées restent.</span><div class="row"><button type="button" class="btn danger" data-act="rdelYes">Supprimer</button><button type="button" class="btn ghost" data-act="rdelNo">Annuler</button></div></div>':`<div class="row" style="justify-content:space-between">${i.id?'<button type="button" class="btn danger" data-act="rdelAsk">Supprimer</button>':"<span></span>"}<button type="submit" class="btn primary">Enregistrer</button></div>`}
  </form>`,document.body.appendChild(t);const n=()=>{i.label=$e("#r-label",t).value,i.amountS=$e("#r-amt",t).value,i.day=Math.max(1,Math.min(31,Number($e("#r-day",t).value)||1)),i.active=$e("#r-active",t).checked};t.addEventListener("input",n);const s=$e("#r-amt",t);s.addEventListener("input",()=>{const r=s.value.replace(/\D/g,"").slice(0,12);s.value=r?$t(Number(r)):"",i.amountS=s.value}),t.addEventListener("click",r=>{r.target===t&&(St=null,t.remove())}),$e("#rsheet",t).addEventListener("submit",async r=>{r.preventDefault(),n();const a=Number(i.amountS.replace(/\D/g,"")),o=m=>{const g=$e("#rErr");g.textContent=m,g.hidden=!1};if(!i.label.trim())return o("Donne un libellé.");if(!a)return o("Indique un montant.");if(!i.catId)return o("Choisis une catégorie.");const c=i.id?R.recs.get(i.id):null,{id:l,amountS:u,...d}=i,f={id:l||"rec_"+un(),kind:"rec",updatedAt:c?.updatedAt||0,data:{...d,label:i.label.trim(),amount:a,actId:i.space==="act"?i.actId:void 0,lastMonth:c?c.data.lastMonth:(i.day<=new Date().getDate(),Xn(fn(),-1))}};await yt([f]),St=null,t.remove(),await wc(),Ae(),we("Opération récurrente enregistrée")})}async function wc(){const{txs:i,updated:e}=Yd(yd());(i.length||e.length)&&await yt([...i,...e]),i.length&&we(`${i.length} opération${i.length>1?"s":""} récurrente${i.length>1?"s":""} ajoutée${i.length>1?"s":""}`)}function wd(i,e,t){const n=document.createElement("a");n.href=URL.createObjectURL(new Blob([e],{type:t})),n.download=i,document.body.appendChild(n),n.click(),setTimeout(()=>{URL.revokeObjectURL(n.href),n.remove()},500)}function Qy(){return R.ops.period==="year"?R.month.slice(0,4):R.ops.period==="all"?"tout":R.month}function ex(){const i=Mc().slice().reverse(),e=["Date","Type","Espace","Activité","Catégorie","Moyen de paiement","Montant (FCFA)","Note"],t=s=>`"${String(s??"").replace(/"/g,'""')}"`,n=i.map(s=>{const r=s.data;return[r.date,r.type==="dep"?"Dépense":"Revenu",r.space==="perso"?"Personnel":"Activités",ds(r.actId)?.name||"",Jn(r.catId).name,r.pay,(r.type==="dep"?-1:1)*r.amount,r.note||""].map(t).join(";")});wd(`MJ7-Finances-${Qy()}.csv`,"\uFEFF"+[e.map(t).join(";"),...n].join(`\r
`),"text/csv;charset=utf-8"),we("Export CSV téléchargé")}function tx(){const i=Mc().slice().reverse(),e=s=>{const r=i.filter(c=>c.data.space===s),a=wn(r);if(!r.length)return`<h2>${s==="perso"?"Personnel":"Activités"}</h2><p>Aucune opération.</p>`;let o="";return s==="act"&&(o=`<table><tr><th>Activité</th><th class="r">Revenus</th><th class="r">Dépenses</th><th class="r">Résultat</th></tr>${Kt().map(c=>{const l=wn(r.filter(u=>u.data.actId===c.id));return`<tr><td>${Re(c.data.name)}</td><td class="r">${Ne(l.rev)}</td><td class="r">${Ne(l.dep)}</td><td class="r">${Ne(l.bal,!0)}</td></tr>`}).join("")}</table>`),`<h2>${s==="perso"?"Personnel":"Activités"}</h2><div class="box"><span>Revenus : <b>${Ne(a.rev)}</b></span><span>Dépenses : <b>${Ne(a.dep)}</b></span><span>Solde : <b>${Ne(a.bal,!0)}</b></span></div>${o}
      <table><tr><th>Date</th><th>Catégorie</th>${s==="act"?"<th>Activité</th>":""}<th>Paiement</th><th>Note</th><th class="r">Montant</th></tr>${r.map(c=>{const l=c.data;return`<tr><td>${l.date.split("-").reverse().join("/")}</td><td>${Re(Jn(l.catId).name)}</td>${s==="act"?`<td>${Re(ds(l.actId)?.name||"")}</td>`:""}<td>${Re(l.pay)}</td><td>${Re(l.note||"")}</td><td class="r">${l.type==="dep"?"−":"+"}${Ne(l.amount)}</td></tr>`}).join("")}</table>`},t=R.ops.period==="year"?`Année ${R.month.slice(0,4)}`:R.ops.period==="all"?"Toutes les opérations":Ls(R.month);let n=document.getElementById("print");n||(n=document.createElement("div"),n.id="print",document.body.appendChild(n)),n.innerHTML=`<h1>MJ7 Finances · ${Re(t)}</h1><p>Édité le ${new Date().toLocaleDateString("fr-FR")}</p>${R.ops.space!=="act"?e("perso"):""}${R.ops.space!=="perso"?e("act"):""}`,setTimeout(()=>window.print(),60)}async function nx(){const i={app:"mj7-finances",version:1,date:new Date().toISOString(),items:[...R.recs.values()]};wd(`MJ7-Finances-sauvegarde-${Vr()}.json`,JSON.stringify(i),"application/json"),we("Sauvegarde téléchargée")}async function ix(i){try{const e=JSON.parse(await i.text());if(e.app!=="mj7-finances"||!Array.isArray(e.items))throw 0;const n=e.items.filter(s=>s&&s.id&&s.kind).filter(s=>{const r=R.recs.get(s.id);return!r||r.updatedAt<s.updatedAt}).map(s=>({...s,dirty:!0}));n.forEach(s=>R.recs.set(s.id,s)),await Xi(n),Td(),Ae(),we(`${n.length} élément${n.length>1?"s":""} restauré${n.length>1?"s":""}`)}catch{we("Ce fichier n'est pas une sauvegarde MJ7 Finances.")}}let ou=0,Wa=!1;function Td(){!Hs()||!R.sync.email||(clearTimeout(ou),ou=window.setTimeout(pi,2500))}async function pi(i=!1){if(!(Wa||!Hs()||!R.sync.email)){if(!navigator.onLine){R.sync.state="err",R.sync.msg="Hors connexion : tes saisies seront envoyées au retour du réseau.",Es();return}Wa=!0,R.sync.state="busy",Es();try{const{incoming:e,pushedIds:t}=await xy([...R.recs.values()]);e.forEach(s=>R.recs.set(s.id,s));const n=t.map(s=>({...R.recs.get(s),dirty:!1}));n.forEach(s=>R.recs.set(s.id,s)),await Xi([...e,...n]),R.sync.state="on",R.sync.msg="Dernière synchro : "+new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),e.length?(await wc(),!Ut&&!St&&!Wy()?Ae():Es()):Es(),i&&we(e.length?`${e.length} mise${e.length>1?"s":""} à jour reçue${e.length>1?"s":""}`:"Tout est à jour")}catch(e){R.sync.state="err",R.sync.msg="Synchro impossible : "+(e?.message||"erreur"),Es(),i&&we(R.sync.msg)}Wa=!1}}function Es(){R.view==="settings"&&document.activeElement?.tagName!=="INPUT"?Ae():document.querySelectorAll(".sync-dot").forEach(i=>{i.className="sync-dot "+(R.sync.state==="on"?"on":R.sync.state==="err"?"err":""),i.setAttribute("title",R.sync.msg),i.lastChild.textContent=R.sync.state==="busy"?"Synchro…":R.sync.state==="err"?"Synchro en pause":R.sync.state==="on"?"Synchronisé":"Sur cet appareil"})}window.addEventListener("online",()=>pi());document.addEventListener("visibilitychange",()=>{document.hidden||pi()});async function Ad(i){const e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("mj7d:"+i));return[...new Uint8Array(e)].map(t=>t.toString(16).padStart(2,"0")).join("")}const sx=i=>btoa(String.fromCharCode(...new Uint8Array(i))),rx=i=>Uint8Array.from(atob(i),e=>e.charCodeAt(0));function Yo(i,e,t={}){const n=document.createElement("div");n.className="lock";let s="";n.innerHTML=`<div class="lock-in"><img src="icons/icon-192.png" alt="" width="64" height="64" style="border-radius:18px"><h2>${i}</h2><div class="dots">${"<i></i>".repeat(4)}</div>
    <div class="pad">${[1,2,3,4,5,6,7,8,9].map(a=>`<button data-n="${a}">${a}</button>`).join("")}<button class="sm" data-n="bio" ${t.bio?"":'style="visibility:hidden"'}>Face ID</button><button data-n="0">0</button><button class="sm" data-n="del">Effacer</button></div>
    ${t.cancel?'<button class="btn ghost" data-n="cancel">Annuler</button>':""}</div>`;const r=()=>n.querySelectorAll(".dots i").forEach((a,o)=>a.classList.toggle("f",o<s.length));return n.addEventListener("click",async a=>{const o=a.target.closest("button")?.dataset.n;if(o){if(o==="cancel"){n.remove();return}if(o==="bio"){await Cd()&&n.remove();return}if(o==="del"?s=s.slice(0,-1):s.length<4&&(s+=o),r(),s.length===4)if(await e(s))n.remove();else{const l=$e(".dots",n);l.classList.add("shake"),setTimeout(()=>{l.classList.remove("shake"),s="",r()},380)}}}),document.body.appendChild(n),n}async function Cd(){const i=ut.get("bio");if(!i)return!1;try{return await navigator.credentials.get({publicKey:{challenge:crypto.getRandomValues(new Uint8Array(32)),allowCredentials:[{id:rx(i),type:"public-key"}],userVerification:"required",timeout:6e4}}),!0}catch{return!1}}async function ax(){try{const i=await navigator.credentials.create({publicKey:{challenge:crypto.getRandomValues(new Uint8Array(32)),rp:{name:"MJ7 Finances"},user:{id:crypto.getRandomValues(new Uint8Array(16)),name:"mj7-finances",displayName:"MJ7 Finances"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required",residentKey:"discouraged"},timeout:6e4}});ut.set("bio",sx(i.rawId)),we("Face ID / empreinte activé"),Ae()}catch{we("Cet appareil n'a pas pu activer Face ID / empreinte.")}}async function ox(){const i=ut.get("pin");i&&await new Promise(e=>{const t=Yo("Entre ton code",async s=>{const r=await Ad(s)===i;return r&&e(),r},{bio:!!ut.get("bio")});ut.get("bio")&&Cd().then(s=>{s&&(t.remove(),e())});const n=new MutationObserver(()=>{t.isConnected||(n.disconnect(),e())});n.observe(document.body,{childList:!0})})}document.addEventListener("click",async i=>{const e=i.target.closest("[data-act]");if(!e)return;const t=e.dataset.act,n=e.dataset.v||"";if(e.tagName!=="INPUT")switch(jn&&await _i(),t){case"planSave":await _i(!0),Ae(),we("Répartition enregistrée");break;case"add":qo();break;case"month":R.month=R.ops.period==="year"&&R.view==="ops"?Xn(R.month,12*+n):Xn(R.month,+n),Ae();break;case"scope":R.scope=n,R.actFilter="",Ae();break;case"actf":R.actFilter=n,Ae();break;case"openAct":R.scope="act",R.actFilter=n,Ae(),scrollTo({top:0,behavior:"smooth"});break;case"period":R.ops.period=n,Ae();break;case"clearf":R.ops={...R.ops,q:"",space:"",act:"",cat:"",pay:""},Ae();break;case"edit":qo(n);break;case"csv":ex();break;case"pdf":tx();break;case"bspace":R.budgetSpace=n,Ae();break;case"addRec":au();break;case"amode":await jy(e.dataset.cat,n);break;case"got":await Xy(n);break;case"preset":{if(Object.keys(mn().plan.alloc).length&&e.dataset.sure!=="1"){document.querySelectorAll("[data-act=preset]").forEach(s=>s.dataset.sure=""),e.dataset.sure="1",e.classList.add("sure"),we("Touche encore pour remplacer tes cases actuelles par ce modèle.");return}await qy(n);break}case"restSav":await Yy();break;case"planClear":if(e.dataset.sure!=="1"){e.dataset.sure="1",e.textContent="Vider toutes les cases ?",e.classList.add("danger");return}await ss(s=>{s.alloc={}}),Ae(),we("Cases vidées");break;case"srcAdd":{const s=$e("#newSrc"),r=s.value.trim();if(!r){s.focus();return}const a=["#5FC28A","#7C9CF2","#3FB6E8","#D98AD9","#F2C230"];await yt([{id:"src_"+un(),kind:"src",updatedAt:0,data:{name:r,icon:"💰",color:a[ns().length%a.length],amount:0,order:ns().length+10}}]),Ae(),we("Source ajoutée");break}case"srcDel":{if(e.dataset.sure!=="1"){e.dataset.sure="1",e.innerHTML="OK ?",e.style.width="auto",we("Touche encore pour supprimer cette source.");return}await Ms(n),Ae(),we("Source supprimée");break}case"caseAdd":{const s=$e("#newCase"),r=s.value.trim();if(!r){s.focus();return}if(is().some(o=>o.data.name.toLowerCase()===r.toLowerCase())){we("Cette case existe déjà.");return}const a=["#E8C27E","#7C9CF2","#5FC28A","#F28CB1","#3FB6E8","#FF9A3D"];await yt([{id:"cat_"+un(),kind:"cat",updatedAt:0,data:{name:r,icon:"•",color:a[is().length%a.length],space:"perso",type:"dep",order:50+Cn().length}}]),Ae(),we("Case ajoutée");break}case"editRec":au(n);break;case"close":Us(),St=null,document.querySelector(".scrim")?.remove();break;case"dtype":Ut.type=n,Bn();break;case"dspace":Ut.space=n,Bn();break;case"dact":Ut.actId=n,Bn();break;case"dcat":Ut.catId=n,document.querySelectorAll(".cat").forEach(s=>s.classList.toggle("on",s.dataset.v===n));break;case"dpay":Ut.pay=n,document.querySelectorAll("[data-act=dpay]").forEach(s=>s.classList.toggle("on",s.dataset.v===n));break;case"rcptDel":Ut.receipt=void 0,Bn();break;case"delAsk":Br=!0,Bn();break;case"delNo":Br=!1,Bn();break;case"delYes":{const s=Ut.id;Us(),await Ms(s),Ae(),we("Opération supprimée");break}case"rtype":St.type=n,St.catId="",Hi();break;case"rspace":St.space=n,St.catId="",Hi();break;case"ract":St.actId=n,Hi();break;case"rcat":St.catId=n,document.querySelectorAll("[data-act=rcat]").forEach(s=>s.classList.toggle("on",s.dataset.v===n));break;case"rpay":St.pay=n,document.querySelectorAll("[data-act=rpay]").forEach(s=>s.classList.toggle("on",s.dataset.v===n));break;case"rdelAsk":zr=!0,Hi();break;case"rdelNo":zr=!1,Hi();break;case"rdelYes":{const s=St.id;St=null,document.querySelector(".scrim")?.remove(),await Ms(s),Ae(),we("Opération récurrente supprimée");break}case"theme":$n.theme=n,ut.set("theme",n),Qr(),Ae();break;case"install":kr?.prompt(),kr=null;break;case"actAdd":{const r=$e("#newAct").value.trim();if(!r)return;const a=["#ff9a3d","#7c9cf2","#5fc28a","#f28cb1","#e8c27e","#3fb6e8"];await yt([{id:"act_"+un(),kind:"act",updatedAt:0,data:{name:r,color:a[Kt().length%a.length],order:Kt().length}}]),Ae(),we("Activité ajoutée");break}case"actDel":{const s=R.recs.get(n),r=hn().some(a=>a.data.actId===n);if(e.dataset.sure!=="1"){e.dataset.sure="1",e.innerHTML="OK ?",e.style.width="auto",e.title=r?"Les opérations liées restent, sans activité.":"",we(r?"Touche encore pour confirmer. Les opérations liées resteront dans « Activités ».":"Touche encore pour confirmer");return}await Ms(s.id),Ae(),we("Activité supprimée");break}case"csp":R.setCatSpace=n,Ae();break;case"cty":R.setCatType=n,Ae();break;case"catAdd":{const r=$e("#newCat").value.trim();if(!r)return;await yt([{id:"cat_"+un(),kind:"cat",updatedAt:0,data:{name:r,icon:"•",color:"#e8c27e",space:R.setCatSpace,type:R.setCatType,order:50+Cn().length}}]),Ae(),we("Catégorie ajoutée");break}case"catDel":{if(e.dataset.sure!=="1"){e.dataset.sure="1",e.innerHTML="OK ?",e.style.width="auto",we("Touche encore pour confirmer. Les opérations gardent leur montant.");return}await Ms(n),Ae(),we("Catégorie supprimée");break}case"pinSet":Yo("Choisis un code à 4 chiffres",async s=>{const r=s;return setTimeout(()=>Yo("Confirme ton code",async a=>a!==r?(we("Les codes ne correspondent pas."),!1):(ut.set("pin",await Ad(a)),Ae(),we("Code enregistré"),!0),{cancel:!0}),50),!0},{cancel:!0});break;case"pinDel":ut.del("pin"),ut.del("bio"),Ae(),we("Code retiré");break;case"bioSet":ax();break;case"bioDel":ut.del("bio"),Ae();break;case"backup":nx();break;case"demoAdd":await yt(Kd(An("cat"),An("act"))),R.month=fn(),Ae(),we("Données d'exemple ajoutées");break;case"demoDel":await yt(hn().filter(s=>s.data.demo).map(s=>({...s,deleted:!0}))),Ae(),we("Données d'exemple retirées");break;case"wipeAsk":$e("#wipeZone").innerHTML='<div class="confirm"><span>Effacer toutes les données de cet appareil ? Si la synchro est active, elles restent dans ton compte Supabase.</span><div class="row"><button class="btn danger" data-act="wipeYes">Tout effacer</button><button class="btn ghost" data-act="wipeNo">Annuler</button></div></div>';break;case"wipeNo":Ae();break;case"wipeYes":await Fd(),R.recs.clear();try{localStorage.removeItem("mj7d.sync.last")}catch{}await Pd(!0),we("Données effacées");break;case"sbSave":{const s=$e("#sb-url").value.trim().replace(/["'\s]/g,""),r=$e("#sb-key").value.trim().replace(/["'\s]/g,""),a=(s.match(/^(?:https?:\/\/)?([a-z0-9-]+)\.supabase\.co/i)||s.match(/\/project\/([a-z0-9]{15,30})/i)||s.match(/^([a-z0-9]{15,30})$/i))?.[1],o=a?`https://${a.toLowerCase()}.supabase.co`:"";if(!o){we("L'URL doit ressembler à https://xxxx.supabase.co (Project Settings > Data API).");return}if(r.length<20){we("La clé semble incomplète : copie la clé anon public (eyJ…) ou publishable (sb_publishable_…) en entier.");return}if(/^sb_secret_/.test(r)||/service_role/.test(r)){we("Ce n'est pas la bonne clé : prends la clé anon public ou publishable, jamais la clé secrète.");return}tu({url:o,key:r}),Ae(),we("Projet enregistré : connecte-toi");break}case"sbReset":tu(null),R.sync={state:"off",email:null,msg:""},Ae();break;case"sbSend":{const s=$e("#sb-mail").value.trim();if(!s){we("Indique ton e-mail.");return}ut.set("mail",s);try{await my(s),we("Code envoyé : regarde tes e-mails")}catch(r){we("Envoi impossible : "+(r?.message||"erreur"))}break}case"sbVerify":{const s=$e("#sb-mail").value.trim(),r=$e("#sb-code").value;try{await gy(s,r),R.sync.email=await $o(),R.sync.state="on",await cu(),Ae(),pi(!0)}catch(a){we("Code refusé : "+(a?.message||"erreur"))}break}case"sbLogin":case"sbSignup":{const s=$e("#sb-mail").value.trim(),r=$e("#sb-pw").value;if(!s||r.length<8){we("Indique l'e-mail et un mot de passe de 8 caractères minimum.");return}ut.set("mail",s);try{if(t==="sbSignup"){if(!await vy(s,r)){we("Compte créé, mais Supabase demande une confirmation par e-mail : désactive « Confirm email » (voir le guide), puis touche « Se connecter ».");return}}else await _y(s,r);R.sync.email=await $o(),R.sync.state="on",await cu(),Ae(),pi(!0),we("Connecté")}catch(a){const o=String(a?.message||"");we(/invalid login/i.test(o)?"E-mail ou mot de passe incorrect. Première fois ? Touche « Créer le compte ».":/already registered|already exists/i.test(o)?"Ce compte existe déjà : touche « Se connecter ».":/not confirmed/i.test(o)?"E-mail non confirmé : désactive « Confirm email » dans Supabase (voir le guide), puis recrée le compte.":"Connexion impossible : "+(o||"erreur"))}break}case"sbSync":pi(!0);break;case"sbOut":await yy(),R.sync={state:"off",email:null,msg:""},Ae();break}});async function cu(){if(ut.get("pushedAll"))return;const i=[...R.recs.values()].map(e=>({...e,dirty:!0}));i.forEach(e=>R.recs.set(e.id,e)),await Xi(i),ut.set("pushedAll",!0)}document.addEventListener("change",async i=>{const e=i.target;if(e.id==="restore"&&e.files?.[0])return ix(e.files[0]);if(e.id==="flat"){$n.flat=e.checked,ut.set("flat",e.checked),e.checked&&Wn&&(Wn.dispose(),Wn=null),Ae();return}if(e.id?.startsWith("f-")){R.ops[e.id.slice(2)]=e.value,Ae();return}if(e.classList.contains("inc")||e.classList.contains("alloc")){jn=!0,await _i();const a=document.activeElement;(a===e||!a?.matches?.("input.inc, input.alloc"))&&Gy();return}if(e.classList.contains("bud")){const a=Number(e.value.replace(/\D/g,"")),o=`bud_${R.budgetSpace}_${e.dataset.cat}`,c=R.recs.get(o);await yt([{id:o,kind:"budget",updatedAt:c?.updatedAt||0,deleted:!a,data:{space:R.budgetSpace,catId:e.dataset.cat,amount:a}}]),Ae(),we(a?"Budget enregistré":"Budget retiré");return}const t=e.dataset.act,n=e.dataset.v;if(!t||!n)return;const s=R.recs.get(n);if(!s)return;const r={actColor:{color:e.value},actName:{name:e.value.trim()},catColor:{color:e.value},catName:{name:e.value.trim()},catIcon:{icon:e.value.trim()||"•"},srcName:{name:e.value.trim()}}[t];!r||r.name===""||(await yt([{...s,data:{...s.data,...r}}]),we("Modifié"))});let lu=0;document.addEventListener("input",i=>{const e=i.target;if(e.id==="q"&&(R.ops.q=e.value,clearTimeout(lu),lu=window.setTimeout(()=>{const t=e.selectionStart;Ae();const n=$e("#q");n.focus(),n.setSelectionRange(t,t)},250)),e.classList.contains("bud")||e.classList.contains("inc")||e.classList.contains("alloc")&&e.dataset.mode!=="p"){const t=e.value.replace(/\D/g,"").slice(0,12);e.value=t?$t(Number(t)):""}if(e.classList.contains("alloc")&&e.dataset.mode==="p"){let t=e.value.replace(".",",").replace(/[^\d,]/g,"");const n=t.indexOf(",");n>=0&&(t=t.slice(0,n+1)+t.slice(n+1).replace(/,/g,"").slice(0,1)),e.value=t.slice(0,5)}(e.classList.contains("inc")||e.classList.contains("alloc"))&&(Vy(),jn=!0,$y(),Cr("dirty"),clearTimeout(Xo),Xo=window.setTimeout(()=>{_i()},400))});document.addEventListener("keydown",i=>{const e=i.target;i.key==="Enter"&&(e.id==="newSrc"||e.id==="newCase")&&(i.preventDefault(),document.querySelector(`[data-act=${e.id==="newSrc"?"srcAdd":"caseAdd"}]`)?.click())});document.addEventListener("keydown",i=>{i.key==="Escape"&&document.querySelector(".scrim")&&(Us(),St=null,document.querySelector(".scrim")?.remove()),(i.key==="n"||i.key==="+")&&!document.querySelector(".scrim, .lock")&&!i.target.matches("input,textarea,select")&&(i.preventDefault(),qo())});window.addEventListener("hashchange",Rd);window.addEventListener("resize",()=>{R.view==="board"&&Sc()});matchMedia("(prefers-color-scheme: light)").addEventListener("change",()=>{Qr(),R.view==="board"&&Sc()});function Rd(){_i();const i=location.hash.slice(1),e=i==="budgets"?"plan":["board","ops","plan","settings"].includes(i)?i:"board";R.view=e,Ae(),scrollTo({top:0})}async function Pd(i=!1){Qr();let e=await Od();e.length||(e=Xd(),await Xi(e)),R.recs=new Map(e.map(s=>[s.id,s]));const t=Hd(R.recs);t.length&&(t.forEach(s=>R.recs.set(s.id,s)),await Xi(t));const n=ut.get("planDraft");if(n&&n.month&&n.inc)try{await Ed(n)}catch{}if(i||await ox(),await wc(),Hs())try{R.sync.email=await $o(),R.sync.email&&(R.sync.state="on")}catch{}Rd(),R.sync.email&&pi()}Pd();"serviceWorker"in navigator&&location.protocol==="https:"&&window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));export{cx as g};
