// Night Shift hero scene: a direct port of the approved "Night Shift Hero v3" prototype (Claude Design).
// Everything below the divider is the prototype's own math, kept as written so the timing, easing and
// choreography match the approved piece exactly: one 11 second loop (D) driven by a single clock `t`,
// with every moving part computed from `t` alone, so the loop has no reset seam. Only the prototype's
// runtime and debug controls were dropped; the drawing code writes SVG attributes directly, so React
// never re-renders per frame.

// ---------------------------------------------------------------------------------------------
const W={lin:p=>p,io:p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,o:p=>1-Math.pow(1-p,3),i:p=>p*p*p,i2:p=>p*p,o2:p=>1-Math.pow(1-p,2.4),back:p=>{const c=1.7;return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2);}};
const D=11,STATIC_T=6.82;
const cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const sg=(t,a,b)=>cl((t-a)/(b-a),0,1);
const mx=(a,b,e)=>typeof a==='number'?a+(b-a)*e:[a[0]+(b[0]-a[0])*e,a[1]+(b[1]-a[1])*e];
const qb=(a,c,b,e)=>{const u=1-e;return[u*u*a[0]+2*u*e*c[0]+e*e*b[0],u*u*a[1]+2*u*e*c[1]+e*e*b[1]];};
const mxA=(a,b,w)=>{const d=((b-a)%360+540)%360-180;return a+d*w;};
function K(t,k){if(t<=k[0][0])return k[0][1];for(let i=1;i<k.length;i++){if(t<k[i][0]){const p=(t-k[i-1][0])/(k[i][0]-k[i-1][0]);return mx(k[i-1][1],k[i][1],W[k[i][2]||'io'](p));}}return k[k.length-1][1];}
const dmp=(d,a,w,k)=>d<0?0:a*Math.exp(-k*d)*Math.sin(w*d);
const f1=n=>Math.round(n*10)/10;
const rot=(v,deg)=>{const a=deg*Math.PI/180,c=Math.cos(a),s=Math.sin(a);return[v[0]*c-v[1]*s,v[0]*s+v[1]*c];};
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1]];
const MODES={
  desktop:{vb:'0 0 1600 900',par:'xMidYMax slice',svgH:'100%',svgAR:'auto',coffee:true},
  tablet:{vb:'120 250 1360 650',par:'xMidYMax slice',svgH:'auto',svgAR:'1360 / 650',coffee:true},
  mobile:{vb:'380 330 860 590',par:'xMidYMax slice',svgH:'auto',svgAR:'860 / 590',coffee:false}
};
const LT=[470,522],LB=[446,800],RT=[1150,548],RB=[1176,800];
const SL=451,SR=1171,PO=352,SC=3.2;
const CUP=[300,760];
const arr=x=>6.86+Math.abs(1150-x)/1900;
const wave=(t,x,a,w,k)=>dmp(t-arr(x),a,w,k);

function gHand(t){
  let h,a,grip=0,point=0,vis=true;
  const fromPinch=(p,ang)=>sub(p,rot([PO,0],ang));
  if(t>=10.55){const e=sg(t,10.55,11);h=qb([-320,1160],[-40,1060],[200,971],W.o(e));a=mx(-70,-40,e);}
  else if(t<0.25){a=-40;h=fromPinch([470,745],a);grip=K(t,[[0.05,0],[0.12,-.15],[0.24,.65,'o']]);}
  else if(t<1.5){const e=W.io(sg(t,.25,1.5));a=mx(-40,-18,e);h=fromPinch([mx(470,1192,e),745+16*Math.sin(Math.PI*e)],a);grip=.65;}
  else if(t<1.62){const e=W.o(sg(t,1.5,1.62));a=mx(-18,-10,e);h=fromPinch([mx(1192,1206,e),745],a);grip=K(t,[[1.5,.65],[1.56,.65],[1.62,0,'o']]);}
  else if(t<2.4){const e=sg(t,1.62,2.4);const h0=fromPinch([1206,745],-10);h=qb(h0,[1560,870],[1880,1220],W.i2(e));a=mx(-10,22,e);}
  else if(t<6.3){h=[2100,1400];a=-110;vis=false;}
  else if(t<6.65){h=mx([2060,1320],[1830,1120],W.o(sg(t,6.3,6.65)));a=-110;point=.2;}
  else if(t<6.8){h=mx([1830,1120],[1560,960],W.o(sg(t,6.65,6.8)));a=mx(-110,-125,sg(t,6.65,6.8));point=K(t,[[6.66,.2],[6.76,1,'o']]);}
  else if(t<6.92){const e=W.i(sg(t,6.8,6.92));h=mx([1560,960],[1500,917],e);a=mx(-125,-162,e);point=1;}
  else if(t<7.15){const e=W.o(sg(t,6.92,7.15));h=qb([1500,917],[1430,1000],fromPinch([1176,745],-120),e);a=mx(-162,-120,e);point=K(t,[[6.98,1],[7.1,0]]);grip=K(t,[[7.05,0],[7.15,.65,'o']]);}
  else if(t<8.0){const e=W.io(sg(t,7.15,8.0));a=mx(-120,-152,e);h=fromPinch([mx(1176,496,e),745+10*Math.sin(Math.PI*e)],a);grip=.65;}
  else if(t<8.7){const e=sg(t,8.0,8.7);const h0=fromPinch([496,745],-152);h=qb(h0,[160,1010],[-320,1160],W.i2(e));a=mx(-152,-70+360*0,e);a=mx(-152,-180,e);grip=K(t,[[8.0,.65],[8.08,0]]);}
  else{h=[-500,1300];a=-70;vis=false;}
  return{h,a,grip,point,vis};
}
function pinchX(t){
  if(t>=0.25&&t<1.62){const g=gHand(t);return add(g.h,rot([PO,0],g.a))[0];}
  if(t>=7.15&&t<8.0){const g=gHand(t);return add(g.h,rot([PO,0],g.a))[0];}
  return null;}
function ubAt(t){
  if(t<0.25||t>=8.0)return .033;
  const px=pinchX(t);if(px!=null)return Math.max(.033,(px-SL)/(SR-SL));
  if(t<7.15)return K(t,[[1.62,(1206-SL)/(SR-SL)],[1.95,.985,'o'],[2.25,1]]);
  return .033;}
function topOff(s,t){
  let o=-K(t,[[0.25,0],[0.8,26],[1.5,12],[1.9,0]])*Math.sin(Math.PI*s);
  o-=dmp(t-1.55,46,12,4)*s*s*s;
  const c1=1-sg(t,1.6,2.6),a1=28*Math.sin(Math.PI*sg(t,1.55,2.7));o-=a1*Math.exp(-Math.pow((s-c1)/.08,2));
  o-=dmp(t-2.6,34,18,6)*Math.pow(1-s,3);
  o+=dmp(t-3.3,18,22,5)*Math.sin(Math.PI*s);
  o+=dmp(t-(6.86+(1-s)*.28),22,26,4.5);
  o+=10*Math.sin(s*22)*sg(t,7.2,7.6)*(1-sg(t,7.9,8.0));
  return o;}
function pageAt(t){
  const ub=ubAt(t),ut=ubAt(t-.09);
  const dy=t>=8.0&&t<8.5?330*W.i(sg(t,8.0,8.5)):t>=8.5&&t<9.3?330:t>=9.3&&t<10.4?330*(1-W.o(sg(t,9.3,10.4))):0;
  const L0=[LT[0],LT[1]+dy],L1=[LB[0],LB[1]+dy];
  const TRc=add(mx(LT,RT,ut),[0,dy]),BRc=add(mx(LB,RB,ub),[0,dy]);
  return{ub,ut,dy,L0,L1,TRc,BRc,t};}
function pageGeo(p){
  const N=16,pts=[];
  for(let i=0;i<=N;i++){const s=i/N;const q=mx(p.L0,p.TRc,s);pts.push([q[0],q[1]+topOff(s,p.t)]);}
  let d=`M${f1(p.L1[0])} ${f1(p.L1[1])}L${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for(let i=1;i<N;i++){const m=mx(pts[i],pts[i+1],.5);d+=`Q${f1(pts[i][0])} ${f1(pts[i][1])} ${f1(m[0])} ${f1(m[1])}`;}
  d+=`L${f1(pts[N][0])} ${f1(pts[N][1])}`;const top=d.slice(d.indexOf('L')+1);
  const bow=(p.ub-p.ut)*170,mR=mx(pts[N],p.BRc,.5);
  d+=`Q${f1(mR[0]+bow)} ${f1(mR[1])} ${f1(p.BRc[0])} ${f1(p.BRc[1])}Z`;
  return{d,edge:'M'+top,pts};}
const PW=680,PH=278;
function affine(p){const ax=(p.TRc[0]-p.L0[0])/PW,ay=(p.TRc[1]-p.L0[1])/PW,bx=(p.L1[0]-p.L0[0])/PH,by=(p.L1[1]-p.L0[1])/PH;return[ax,ay,bx,by,p.L0[0],p.L0[1]];}
const apply=(m,v)=>[m[0]*v[0]+m[2]*v[1]+m[4],m[1]*v[0]+m[3]*v[1]+m[5]];
function cupAt(t){return{p:CUP,r:dmp(t-arr(300),5,34,6)+dmp(t-9.0,6,22,6)};}
const E1=[1110,690],TILE_BL=[400,148],LAND=[800,650];
function chipAt(t){if(t<2.6||t>=3.3)return null;const e=sg(t,2.6,3.3);const end=[575,712];return{p:qb([472,515],[600,400],end,e),r:-420*e+(e>.95?0:0)};}
function bugAt(t,m){
  const o={vis:false,x:0,y:0,rot:-10,legs:0,sx:1,sy:1,ph:0};
  if(t>=8.6&&t<9.0){const e=sg(t,8.6,9.0);o.vis=true;o.x=mx(-100,306,e);o.y=mx(600,690,e)-60*Math.sin(Math.PI*e);o.rot=195+540*(e-1);o.legs=1;o.ph=t*40;return o;}
  if(t<3.35||t>=7.06)return o;o.vis=true;
  if(t<3.75){const e=sg(t,3.35,3.75);const st=m?apply(m,TILE_BL):[870,700];const p=qb(st,[850,470],LAND,e);o.x=p[0];o.y=p[1];o.rot=-10-540*(1-W.o(e));return o;}
  o.legs=cl(W.back(sg(t,3.85,3.95)),0,1.15);
  if(t>=6.86){const e=W.o(sg(t,6.86,7.06));const p=mx(E1,[-240,590],e);o.x=p[0];o.y=p[1];o.rot=-80-1440*e;o.sx=t<6.89?1.45:.7;o.sy=t<6.89?.6:1.5;return o;}
  if(t<3.88){const q=1-sg(t,3.75,3.88);o.sy=1-.3*q;o.sx=1+.25*q;}
  const tq=Math.floor(t*24)/24;let pos=LAND,r=-10;
  const steps=[[4.4,4.47,LAND,[835,664]],[4.5,4.56,[835,664],[868,676]],[4.6,4.66,[868,676],[900,688]],[5.2,5.25,[900,688],[960,690]],[5.28,5.33,[960,690],[1020,694]],[5.36,5.4,[1020,694],[1070,690]],[5.42,5.46,[1070,690],E1]];
  for(const s of steps){if(t<s[0])break;const dr=Math.atan2(s[3][1]-s[2][1],s[3][0]-s[2][0])*57.3+90;pos=mx(s[2],s[3],sg(tq,s[0],s[1]));r=mxA(r,dr,sg(t,s[0],s[0]+.02));if(t<s[1])o.ph=t*90;}
  if(t>=4.9&&t<5.0)o.ph=Math.sin((t-4.9)*70)*3;
  if(t>=5.6)r=mxA(r,-35,W.io(sg(t,5.6,5.75)));
  if(t>=6.1&&t<6.18)o.ph=Math.sin((t-6.1)*90)*3;
  o.x=pos[0];o.y=pos[1];o.rot=r;return o;}
function legsD(k,ph){const A=[[1,12,-11,-3],[1,20,-12,1],[2,29,-10,5],[11,11,10,-6],[18,17,11,-1],[17,26,9,5]];
  return A.map((a,i)=>`M${a[0]} ${a[1]}l${f1(a[2]*k)} ${f1(a[3]*k+Math.sin(ph+i*1.7)*3*k)}`).join('');}
function armGeo(o,h,sag,w0,w1,bul){
  const m=[(o[0]+h[0])/2+sag[0],(o[1]+h[1])/2+sag[1]],c1=mx(o,m,.9),c2=mx(h,m,.9);
  const N=22,L=[],R=[],S=[];
  for(let i=0;i<=N;i++){const s=i/N,u=1-s;
    const p=[u*u*u*o[0]+3*u*u*s*c1[0]+3*u*s*s*c2[0]+s*s*s*h[0],u*u*u*o[1]+3*u*u*s*c1[1]+3*u*s*s*c2[1]+s*s*s*h[1]];
    const d=[3*u*u*(c1[0]-o[0])+6*u*s*(c2[0]-c1[0])+3*s*s*(h[0]-c2[0]),3*u*u*(c1[1]-o[1])+6*u*s*(c2[1]-c1[1])+3*s*s*(h[1]-c2[1])];
    const len=Math.hypot(d[0],d[1])||1,n=[-d[1]/len,d[0]/len];
    const w=(w0+(w1-w0)*Math.pow(s,.8)+bul*Math.sin(Math.PI*s*.9)+5*Math.sin(s*7))/2;
    L.push([p[0]+n[0]*w,p[1]+n[1]*w]);R.push([p[0]-n[0]*w,p[1]-n[1]*w]);S.push([p[0]-n[0]*w*.35,p[1]-n[1]*w*.35]);}
  const J=a=>a.map(q=>f1(q[0])+' '+f1(q[1])).join('L');
  return{d:'M'+J(L)+'L'+J(R.slice().reverse())+'Z',sd:'M'+J(R)+'L'+J(S.slice().reverse())+'Z',L,R};}
function counterGeo(t){
  const N=20,F=[],B=[];
  for(let i=0;i<=N;i++){const s=i/N,x=-200+2000*s;
    F.push([x,mx(910,772,s)-26*Math.sin(Math.PI*s)+wave(t,x,8,30,5)]);
    B.push([x,mx(706,690,s)-14*Math.sin(Math.PI*s)+wave(t,x,3,30,6)]);}
  const J=a=>a.map(q=>f1(q[0])+' '+f1(q[1])).join('L');
  return{surf:'M'+J(B)+'L'+J(F.slice().reverse())+'Z',front:'M'+J(F)+'L1800 1200L-200 1200Z',lip:'M'+J(F)};}

export { D, STATIC_T, MODES }

const REF_KEYS = ['pg','pge','pclipP','band','ct','hd','l0','l1','l2','tl','bt','cup','cupLegs','sp1','sp2','st1','st2','bug','bugLegs','streak','chip','gsh','shelves','body','head','tuft','pupils','lidL','lidR','surf','front','lip','G-c','G-a','G-s','G-h','G-th','G-f0','G-f1','G-f2','G-f3']

export function collectRefs(svg) {
  const el = { root: svg }
  for (const k of REF_KEYS) el[k] = svg.querySelector('[data-ny="' + k + '"]')
  return el
}

// Applies the scene at time `t` (seconds) for the given layout mode ('desktop' | 'tablet' | 'mobile').
export function drawScene(el, t, mode) {
  const coffee = MODES[mode].coffee;
  const set=(n,a,v)=>{if(n&&n.__c!==a+'|'+v){n.setAttribute(a,v);n.__c=a+'|'+v;}};
  const show=(n,v)=>set(n,'display',v?'inline':'none');
  const P=pageAt(t),pgg=pageGeo(P),M=affine(P);
  set(el.pg,'d',pgg.d);set(el.pclipP,'d',pgg.d);set(el.pge,'d',pgg.edge);
  const lag=-P.dy*.12;
  set(el.ct,'transform',`translate(0 ${f1(lag)}) matrix(${M.map((v,i)=>i<4?v.toFixed(4):f1(v)).join(' ')})`);
  const ride=(s,amt)=>topOff(s,t)*amt;
  const pop=(at,dur)=>t<at||t>=8.6?0:W.back(sg(t,at,at+(dur||.22)));
  const el2=[['tl',1.68,.76,[520,148]],['hd',2.17,.23,[34,64]],['l0',2.2,.2,[34,100]],['l1',2.26,.18,[34,124]],['l2',2.22,.19,[34,148]]];
  for(const [k,at,s,pos] of el2){const p=pop(at);show(el[k],p>.001);if(p<=.001)continue;
    const rr=k==='hd'?dmp(t-arr(600),-5,14,4)+K(t,[[6.9,0],[7.2,-2.5]]):k==='tl'?dmp(t-3.3,-3,20,6)+dmp(t-arr(900),3,16,5):0;
    const jy=k==='tl'?dmp(t-3.3,-8,25,8):0;
    set(el[k],'transform',`translate(${pos[0]} ${f1(pos[1]+ride(s,.55)+jy)}) rotate(${f1(rr)}) scale(${(1+(1-Math.min(p,1))*.4).toFixed(3)} ${p.toFixed(3)})`);}
  const bs=K(t,[[3.3,.55],[3.44,1.1,'o'],[3.56,1]]),br=K(t,[[6.9,0],[7.02,14,'o'],[7.2,9]])+dmp(t-arr(575),5,18,4);
  show(el.bt,t>=3.3&&t<8.6);set(el.bt,'transform',`translate(105 ${f1(178+ride(.15,.5))}) rotate(${f1(br)}) scale(${(1+(1-bs)*.5).toFixed(3)} ${bs.toFixed(3)})`);
  const bandOn=t>=1.55&&t<2.7;show(el.band,bandOn);
  if(bandOn){const c1=1-sg(t,1.6,2.6),bx=mx(P.L0[0],P.TRc[0],c1);set(el.band,'transform',`translate(${f1(bx)} 0) skewX(${f1(-4)})`);set(el.band,'opacity',(.14*Math.sin(Math.PI*sg(t,1.55,2.7))).toFixed(3));}
  const ch=chipAt(t);show(el.chip,!!ch);if(ch)set(el.chip,'transform',`translate(${f1(ch.p[0])} ${f1(ch.p[1])}) rotate(${f1(ch.r)})`);
  const B=bugAt(t,M);show(el.bug,B.vis);
  if(B.vis){set(el.bug,'transform',`translate(${f1(B.x)} ${f1(B.y)}) rotate(${f1(B.rot)}) scale(${(1.35*B.sx).toFixed(3)} ${(1.35*B.sy).toFixed(3)})`);set(el.bugLegs,'d',B.legs>.01?legsD(B.legs,B.ph):'M0 0');}
  const st=t>=6.86&&t<7.06;show(el.streak,st);if(st){const b0=bugAt(Math.max(6.86,t-.07),M);set(el.streak,'d',`M${f1(b0.x)} ${f1(b0.y)}L${f1(B.x)} ${f1(B.y)}`);}
  const cg=counterGeo(t);set(el.surf,'d',cg.surf);set(el.front,'d',cg.front);set(el.lip,'d',cg.lip);
  set(el.shelves,'transform',`translate(0 ${f1(wave(t,1450,-7,34,5))})`);
  show(el.cup,coffee);show(el.st1,coffee);show(el.st2,coffee);
  if(coffee){const c=cupAt(t);set(el.cup,'transform',`translate(${c.p[0]} ${c.p[1]}) rotate(${f1(c.r)}) scale(1.2)`);
    const legsOn=t>=9.0||t<3.0;show(el.cupLegs,legsOn);const sink=t<3.0?1-sg(t,2.75,3.0):1;const tw=(t>10.0&&t<10.3)||(t>1.0&&t<1.25)?Math.sin(t*50)*3:0;
    set(el.cupLegs,'transform',`translate(0 ${f1(-66*(1-sink))}) scale(1 ${sink.toFixed(3)}) translate(0 ${f1(66*(1-sink))})`);
    set(el.cupLegs,'d',`M-10 -60l-7 ${f1(-12+tw)}M-3 -61l-2 ${f1(-14-tw)}M4 -61l3 ${f1(-13+tw)}M10 -60l8 ${f1(-10-tw)}`);
    const se=sg(t,9.0,9.2);show(el.sp1,se>0&&se<1);show(el.sp2,se>0&&se<1);
    set(el.sp1,'transform',`translate(${f1(-8-16*se)} ${f1(-34*Math.sin(Math.PI*se))})`);set(el.sp2,'transform',`translate(${f1(10+14*se)} ${f1(-26*Math.sin(Math.PI*se))})`);
    const bend=wave(t,300,-40,7,2.6)+dmp(t-1.0,14,6,3);
    [el.st1,el.st2].forEach((n,k)=>{const bx=c.p[0]-10+k*20,by=c.p[1]-84;let d='M'+bx+' '+by;
      for(let j=1;j<=6;j++){const yy=by-j*14,xx=bx+Math.sin(2*Math.PI*t*3/D+j*.9+k*2)*5+bend*(j/6);d+='L'+f1(xx)+' '+f1(yy);}set(n,'d',d);});}
  const breath=.007*Math.sin(2*Math.PI*t/(D/3)),shift=K(t,[[6.3,0],[6.6,7],[8.1,7],[8.6,0]]),lean=K(t,[[6.3,0],[6.6,-1.6],[8.1,-1.6],[8.6,0]]);
  set(el.body,'transform',`translate(${f1(shift)} 0) rotate(${f1(lean)} 900 762) translate(930 762) scale(1.15 ${(1.15*(1+breath)).toFixed(4)}) translate(-930 -762)`);
  const headRot=K(t,[[0.3,0],[0.5,-2,'o'],[1.6,-2],[2.0,0]])+K(t,[[4.75,0],[4.95,-2],[6.25,-2],[6.4,0]])+wave(t,930,-3,20,5)+K(t,[[7.3,0],[7.5,3],[8.2,3],[8.5,0]]);
  set(el.head,'transform',`rotate(${f1(headRot)} 926 472)`);
  set(el.tuft,'transform',`rotate(${f1(wave(t,930,-9,30,4)+dmp(t-1.55,3,20,5))} 940 372)`);
  const g=gHand(t);
  const pinch=add(g.h,rot([PO,0],g.a));
  const chipP=ch?ch.p:[575,712];
  const segs=[[0,()=>pinch],[1.62,()=>[mx(P.L0[0],P.TRc[0],1-sg(t,1.6,2.6)),640]],[2.6,()=>chipP],[3.3,()=>{const b=bugAt(t-.1,M);return b.vis?[b.x,b.y]:[575,712];}],
    [6.3,()=>[1500,900]],[6.62,()=>E1],[7.22,()=>pinch],[8.0,()=>[470,745]],[8.55,()=>{const b=bugAt(t-.08,M);return b.vis?[b.x,b.y]:[306,690];}],[9.25,()=>[470,Math.min(P.L0[1]+40,745)]],[10.2,()=>[140,900]]];
  let i=segs.length-1;while(i>0&&t<segs[i][0])i--;
  const cur=segs[i][1](),prev=segs[(i-1+segs.length)%segs.length][1]();
  const tg=mx(prev,cur,W.o(sg(t,segs[i][0],segs[i][0]+.09)));
  const dx=tg[0]-927,dy=tg[1]-367,dist=Math.hypot(dx,dy)||1,m=Math.min(6.5,dist/28);
  set(el.pupils,'transform',`translate(${f1(dx/dist*m)} ${f1(dy/dist*m*.85)})`);
  let lid=.2;lid=Math.max(lid,K(t,[[4.75,.2],[4.92,.56,'o'],[6.2,.56],[6.3,.2]]));
  lid=Math.max(lid,Math.sin(Math.PI*sg(t,5.7,6.02)),Math.sin(Math.PI*sg(t,9.7,9.83)),Math.sin(Math.PI*sg(t,2.9,3.02)));
  const lh=f1(lid*28);set(el.lidL,'height',lh);set(el.lidR,'height',lh);
  show(el['G-c'],g.vis);show(el.gsh,g.vis);
  if(g.vis){
    const gp=gHand(t-.07),vx=g.h[0]-gp.h[0];
    const o=[g.h[0]*.55+800*.45,1720];
    const ag=armGeo(o,g.h,[-vx*1.4,40],380,150,40);set(el['G-a'],'d',ag.d);set(el['G-s'],'d',ag.sd);
    const shOff=[-150,-230];set(el.gsh,'d',armGeo(add(o,shOff),add(g.h,shOff),[-vx*1.4,40],380,150,40).d);
    set(el['G-h'],'transform',`translate(${f1(g.h[0])} ${f1(g.h[1])}) rotate(${f1(g.a)}) scale(${SC} ${SC})`);
    const ky=[-24,-8,8,24],open=[-22,-8,6,20];
    for(let k=0;k<4;k++){const gg=cl(gHand(t-k*.03).grip,-.2,1);let a2=mx(open[k],95,gg),len=mx(1,.6,gg);
      if(g.point>0){if(k===0){a2=mx(a2,-4,g.point);len=mx(len,1.6,g.point);}else{a2=mx(a2,92,g.point);len=mx(len,.58,g.point);}}
      set(el['G-f'+k],'transform',`translate(64 ${ky[k]}) rotate(${f1(a2)}) scale(${len.toFixed(3)} 1)`);}
    set(el['G-th'],'transform',`translate(14 -28) rotate(${f1(mx(-20,38,cl(g.grip,0,1))+g.point*30)})`);}
}
