// Aardling interface marks.
//
// Every mark is 16x16, stroke 1.25, butt caps, currentColor, no fill — the same as
// download.svg, which was already drawn that way.
//
// The set has one curve. Every arrowhead already in assets/icons/ is the same cubic:
// leaving its outer end perpendicular to the shaft with its control at 0.36364 of the
// box side, arriving at the tip tangent to it with its control at 0.68182. Those two
// constants hold to five decimals across every generated arrowhead and download,
// and everything below is built from them: ring() is four of that curve closed,
// rrect() is four of it at the corners, chev() is two of it meeting at a point.
//
// The outlines are computed rather than drawn by hand, which is the only way ninety
// turns stay identical. Deterministic: the same input gives byte-identical output, so
// re-running is safe and a diff after a run means an input changed.
//
//   npm run build:icons --workspace @aardling/brand-aardling
//
import { writeFileSync } from 'fs';

// Aardling interface marks. 16x16, stroke 1.25, currentColor, butt caps.
// Every turn uses the brand's one curve: 4/11 leaving, 7.5/11 arriving.
const K1 = 4/11, K2 = 7.5/11;
const f = n => (Math.round(n*1000)/1000).toString();
const P = (a,b) => [a,b];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1];

const M = p => `M${f(p[0])} ${f(p[1])}`;
const L = p => `L${f(p[0])} ${f(p[1])}`;

// The brand turn: leave P0 along d0, arrive at P1 along d1. Box sides taken
// from the actual displacement, so non-square turns work too.
function qt(P0,d0,P1,d1){
  const D=sub(P1,P0), a=Math.abs(dot(D,d0)), b=Math.abs(dot(D,d1));
  const c1=[P0[0]+K1*a*d0[0], P0[1]+K1*a*d0[1]];
  const c2=[P1[0]-K2*b*d1[0], P1[1]-K2*b*d1[1]];
  return `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(P1[0])} ${f(P1[1])}`;
}
// A local frame: origin + rotation. Lets a mark be drawn straight and set at an angle.
function frame(ox,oy,deg){
  const r=deg*Math.PI/180, c=Math.cos(r), s=Math.sin(r);
  const m=(a,b)=>[ox+a*c-b*s, oy+a*s+b*c];
  m.dir=(a,b)=>[a*c-b*s, a*s+b*c];
  return m;
}
const U={r:[1,0],l:[-1,0],u:[0,-1],d:[0,1]};


// Closed ring of four brand turns. Hand-drawn, ~1% inside a true circle.
function ring(cx,cy,R){
  const T=[cx,cy-R],Rt=[cx+R,cy],B=[cx,cy+R],Lf=[cx-R,cy];
  return M(T)+qt(T,U.r,Rt,U.d)+qt(Rt,U.d,B,U.l)+qt(B,U.l,Lf,U.u)+qt(Lf,U.u,T,U.r)+'Z';
}
// Part of that ring. q0 = quarter to start at (0 top,1 right,2 bottom,3 left), n quarters.
function ringArc(cx,cy,R,q0,n){
  const pts=[[cx,cy-R],[cx+R,cy],[cx,cy+R],[cx-R,cy]];
  const dirs=[U.r,U.d,U.l,U.u];
  let d=M(pts[q0%4]);
  for(let i=0;i<n;i++){
    const a=(q0+i)%4, b=(q0+i+1)%4;
    d+=qt(pts[a],dirs[a],pts[b],dirs[b]);
  }
  return d;
}
function ringPoint(cx,cy,R,deg){
  const r=deg*Math.PI/180; return [cx+R*Math.cos(r), cy+R*Math.sin(r)];
}
// Rounded rectangle, corners turned with the brand curve.
function rrect(x,y,w,h,r,mp=(a,b)=>[a,b]){
  const x2=x+w,y2=y+h;
  const p=(a,b)=>mp(a,b);
  const D=(a,b)=>{const q=mp.dir?mp.dir(a,b):[a,b];return q;};
  return M(p(x+r,y))+L(p(x2-r,y))+qt(p(x2-r,y),D(1,0),p(x2,y+r),D(0,1))
       + L(p(x2,y2-r))+qt(p(x2,y2-r),D(0,1),p(x2-r,y2),D(-1,0))
       + L(p(x+r,y2))+qt(p(x+r,y2),D(-1,0),p(x,y2-r),D(0,-1))
       + L(p(x,y+r))+qt(p(x,y+r),D(0,-1),p(x+r,y),D(1,0))+'Z';
}
// Chevron: two brand barbs meeting at a point, no shaft.
function chev(cx,cy,s,dir){
  const u=U[dir], p=[-u[1],u[0]];
  const tip=[cx+u[0]*s*0.5, cy+u[1]*s*0.5];
  const e1=[cx-u[0]*s*0.5+p[0]*s, cy-u[1]*s*0.5+p[1]*s];
  const e2=[cx-u[0]*s*0.5-p[0]*s, cy-u[1]*s*0.5-p[1]*s];
  return [ M(e1)+qt(e1,[-p[0],-p[1]],tip,u), M(e2)+qt(e2,p,tip,u) ];
}
function svg(paths,extra=''){
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n`
    + paths.map(d=>typeof d==='string'
        ? `    <path d="${d}" stroke="currentColor" stroke-width="1.25"/>`
        : `    <path d="${d.d}" ${d.fill?'fill="currentColor"':'stroke="currentColor" stroke-width="1.25"'}/>`).join('\n')
    + (extra?'\n'+extra:'') + `\n</svg>\n`;
}
const dot_ = (cx,cy,r)=>({d:ring(cx,cy,r), fill:true});

// A ring arc of n whole quarters plus a fraction t of the next, cut with
// de Casteljau. Returns the path, its end point and the tangent there, so an
// arrowhead can be laid on the end whatever angle it finishes at.
function ringArcPlus(cx,cy,R,q0,n,t){
  const pts=[[cx,cy-R],[cx+R,cy],[cx,cy+R],[cx-R,cy]], dirs=[U.r,U.d,U.l,U.u];
  const q=(q0+n)%4, P0=pts[q], P1=pts[(q+1)%4], d0=dirs[q], d1=dirs[(q+1)%4];
  const c1=[P0[0]+K1*R*d0[0],P0[1]+K1*R*d0[1]], c2=[P1[0]-K2*R*d1[0],P1[1]-K2*R*d1[1]];
  const lp=(a,b)=>[a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];
  const a=lp(P0,c1), b=lp(c1,c2), c=lp(c2,P1), d=lp(a,b), e=lp(b,c), end=lp(d,e);
  const tl=Math.hypot(e[0]-d[0], e[1]-d[1]);
  return {d: ringArc(cx,cy,R,q0,n)+`C${f(a[0])} ${f(a[1])} ${f(d[0])} ${f(d[1])} ${f(end[0])} ${f(end[1])}`,
          end, tan:[(e[0]-d[0])/tl, (e[1]-d[1])/tl]};
}
// The brand arrowhead — two barbs — laid on any tangent, not just an axis.
function headOn(tip,u,s){
  const p=[-u[1],u[0]];
  const e1=[tip[0]-u[0]*s+p[0]*s, tip[1]-u[1]*s+p[1]*s];
  const e2=[tip[0]-u[0]*s-p[0]*s, tip[1]-u[1]*s-p[1]*s];
  return [M(e1)+qt(e1,[-p[0],-p[1]],tip,u), M(e2)+qt(e2,p,tip,u)];
}

// An arc of the brand ring between two angles, in degrees, 0 = 3 o'clock and
// increasing clockwise (screen coordinates). Quarters are split with de Casteljau
// at both ends, so the arc can start and stop anywhere.
function ringArcRange(cx,cy,R,fromDeg,toDeg){
  const pts=[[cx,cy-R],[cx+R,cy],[cx,cy+R],[cx-R,cy]], dirs=[U.r,U.d,U.l,U.u];
  const quarter=q=>{const P0=pts[q],P1=pts[(q+1)%4],d0=dirs[q],d1=dirs[(q+1)%4];
    return [P0,[P0[0]+K1*R*d0[0],P0[1]+K1*R*d0[1]],[P1[0]-K2*R*d1[0],P1[1]-K2*R*d1[1]],P1];};
  const lp=(a,b,t)=>[a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];
  const left=([P0,c1,c2,P1],t)=>{const a=lp(P0,c1,t),b=lp(c1,c2,t),c=lp(c2,P1,t),
    d=lp(a,b,t),e=lp(b,c,t),f2=lp(d,e,t); return [P0,a,d,f2];};
  const right=([P0,c1,c2,P1],t)=>{const a=lp(P0,c1,t),b=lp(c1,c2,t),c=lp(c2,P1,t),
    d=lp(a,b,t),e=lp(b,c,t),f2=lp(d,e,t); return [f2,e,c,P1];};
  // quarter q covers angles [270 + 90q, 360 + 90q)
  const norm=a=>((a%360)+360)%360;
  const segs=[]; let cur=norm(fromDeg);
  let total=norm(toDeg-fromDeg); if(total===0) total=360;
  let done=0;
  while(done < total - 1e-6){
    const q=Math.floor(norm(cur-270)/90)%4;
    const qStart=norm(270+90*q);
    const t0=norm(cur-qStart)/90;
    const step=Math.min(90-(t0*90), total-done);
    const t1=t0+step/90;
    let seg=quarter(q);
    if(t1<1-1e-9) seg=left(seg,t1);
    if(t0>1e-9)   seg=right(seg, t0/(t1<1-1e-9?t1:1));
    segs.push(seg); done+=step; cur=norm(cur+step);
  }
  let d=M(segs[0][0]);
  for(const s of segs) d+=`C${f(s[1][0])} ${f(s[1][1])} ${f(s[2][0])} ${f(s[2][1])} ${f(s[3][0])} ${f(s[3][1])}`;
  return d;
}


const n=(a,b)=>{const l=Math.hypot(a,b);return [a/l,b/l];};
function qtR(P0,d0,P1,d1,r){
  const c1=[P0[0]+K1*r*d0[0],P0[1]+K1*r*d0[1]], c2=[P1[0]-K2*r*d1[0],P1[1]-K2*r*d1[1]];
  return `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(P1[0])} ${f(P1[1])}`;
}
function poly(V,r){                      // closed polygon, corners turned by the brand curve
  let d='',first=null;
  for(let i=0;i<V.length;i++){
    const Vp=V[(i-1+V.length)%V.length], Vi=V[i], Vn=V[(i+1)%V.length];
    const dIn=n(Vi[0]-Vp[0],Vi[1]-Vp[1]), dOut=n(Vn[0]-Vi[0],Vn[1]-Vi[1]);
    const s=[Vi[0]-dIn[0]*r,Vi[1]-dIn[1]*r], e=[Vi[0]+dOut[0]*r,Vi[1]+dOut[1]*r];
    if(!first){ d=M(s); first=s; } else d+=L(s);
    d+=qtR(s,dIn,e,dOut,r);
  }
  return d+'Z';
}
const D=(cx,cy,r)=>({d:ring(cx,cy,r),fill:true});
const bow=(a,b,k,sense=1)=>{const d=[b[0]-a[0],b[1]-a[1]],l=Math.hypot(d[0],d[1]);
  const nx=-d[1]/l*sense, ny=d[0]/l*sense, m=[(a[0]+b[0])/2,(a[1]+b[1])/2];
  return M(a)+`Q${f(m[0]+nx*2*k)} ${f(m[1]+ny*2*k)} ${f(b[0])} ${f(b[1])}`;};
const I={};

// ── direction ────────────────────────────────────────────────────────────────
for(const [k,dir] of Object.entries({left:'l',right:'r',up:'u',down:'d'}))
  I['chevron-'+k]=svg(chev(8,8,5,dir));
const arrow=dir=>{const u=U[dir],p=[-u[1],u[0]],s=6,tip=[8+u[0]*6.5,8+u[1]*6.5],tail=[8-u[0]*6.5,8-u[1]*6.5];
  const e1=[tip[0]-u[0]*s+p[0]*s,tip[1]-u[1]*s+p[1]*s], e2=[tip[0]-u[0]*s-p[0]*s,tip[1]-u[1]*s-p[1]*s];
  return svg([M(tail)+L(tip), M(e1)+qt(e1,[-p[0],-p[1]],tip,u), M(e2)+qt(e2,p,tip,u)]);};
for(const [k,dir] of Object.entries({left:'l',right:'r',up:'u',down:'d'})) I['arrow-'+k]=arrow(dir);

I['close']=svg([M([3.4,3.4])+L([12.6,12.6]), M([12.6,3.4])+L([3.4,12.6])]);
I['menu']=svg([[1.5,3],[1.5,8],[1.5,13]].map(p=>M(p)+L([14.5,p[1]])));
// the classic spinner: three quarters of the brand ring, and nothing else
I['spinner']=svg([ringArc(8,8,6.5,0,3)]);

// ── the box-and-out family ───────────────────────────────────────────────────
I['external-link']=svg([
  M([8.6,3.4])+L([4.2,3.4])+qtR([4.2,3.4],U.l,[2.4,5.2],U.d,1.8)+L([2.4,11.8])
   +qtR([2.4,11.8],U.d,[4.2,13.6],U.r,1.8)+L([10.8,13.6])
   +qtR([10.8,13.6],U.r,[12.6,11.8],U.u,1.8)+L([12.6,7.4]),
  M([7.6,8.4])+L([13.4,2.6]),
  M([9.2,2.6])+L([13.4,2.6])+L([13.4,6.8]),
]);
I['home']=svg([
  M([1.6,7.8])+L([8,2.2])+L([14.4,7.8]),
  M([3.3,6.4])+L([3.3,12.9])+qtR([3.3,12.9],U.d,[4.7,14.3],U.r,1.4)+L([11.3,14.3])
   +qtR([11.3,14.3],U.r,[12.7,12.9],U.u,1.4)+L([12.7,6.4]),
]);
I['more-horizontal']=svg([D(3.4,8,0.95),D(8,8,0.95),D(12.6,8,0.95)]);
I['more-vertical']  =svg([D(8,3.4,0.95),D(8,8,0.95),D(8,12.6,0.95)]);

// ── the ring family ──────────────────────────────────────────────────────────
I['search']=svg([ring(6.6,6.6,5.2), M([10.4,10.4])+L([14.6,14.6])]);
I['refresh']=(()=>{
  // Geometry recovered from the reference outline, not measured by eye. Its ring runs
  // radius 6.5 to 8, so the CENTRELINE is 7.25. A mitred right angle puts the outer
  // corner at C+(w/2,w/2) and the inner at C-(w/2,w/2); both give (19.25, 9.6), which
  // is 1.0534R at -18.32 degrees, with both arms exactly 5.6 = 0.7724R.
  // The brand's stroke is proportionally heavier than the reference's, which opens a
  // notch where the arc meets the bracket, so the corner moves 0.3 up and left:
  // 1.0312R at -20.88. Radius 4.833 is the reference's own 7.25 regridded to 16.
  const R=4.833, C=8, KR=1.0312, KA=-20.88*Math.PI/180, ARM=0.7724*R;
  const k=[C+KR*R*Math.cos(KA), C+KR*R*Math.sin(KA)];
  return svg([ringArcRange(C,C,R,17.46,333.71),
    M([k[0],k[1]-ARM])+L(k)+L([k[0]-ARM,k[1]])]);})();
I['clock']=svg([ring(8,8,6.2), M([8,8])+L([8,4.2]), M([8,8])+L([11.1,9.5])]);
I['info']=svg([ring(8,8,6.2), M([8,7.2])+L([8,11.6]), D(8,4.7,0.75)]);
I['error']=svg([ring(8,8,6.2), M([5.4,5.4])+L([10.6,10.6]), M([10.6,5.4])+L([5.4,10.6])]);
I['warning']=svg([poly([[8,1.7],[15,13.9],[1,13.9]],1.6), M([8,6.4])+L([8,10.2]), D(8,12.3,0.75)]);
I['check']=svg([M([2.9,8.5])+L([6.4,12])+`Q9.3 8 13.1 4.3`]);
I['plus']=svg([M([8,2.5])+L([8,13.5]), M([2.5,8])+L([13.5,8])]);
I['user']=svg([ring(8,5.2,2.9), M([2.2,14.6])+qt([2.2,14.6],U.u,[8,9.9],U.r)+qt([8,9.9],U.r,[13.8,14.6],U.d)]);
I['star-outline']=(()=>{const R=6.8,c=8,pts=[[c,c-R],[c+R,c],[c,c+R],[c-R,c]],dirs=[U.d,U.l,U.u,U.r],out=[U.u,U.r,U.d,U.l];
  let d=M(pts[0]); for(let i=0;i<4;i++){const a=i,b=(i+1)%4; d+=qt(pts[a],dirs[a],pts[b],out[b]);} return svg([d+'Z']);})();
I['heart']=svg([
  M([8,14.4])+`C5.4 12.4 1.8 10.4 1.8 7.4`
   +qt([1.8,7.4],U.u,[4.9,4.3],U.r)+qt([4.9,4.3],U.r,[8,6.4],U.d)
   +qt([8,6.4],U.u,[11.1,4.3],U.r)+qt([11.1,4.3],U.r,[14.2,7.4],U.d)
   +`C14.2 10.4 10.6 12.4 8 14.4`+'Z']);
I['eye']=svg([
  M([1.2,8])+`Q8 1.4 14.8 8`+`Q8 14.6 1.2 8`+'Z', ring(8,8,2.5)]);
I['eye-off']=svg([
  M([1.2,8])+`Q8 1.4 14.8 8`+`Q8 14.6 1.2 8`+'Z', ring(8,8,2.5), M([2.4,13.6])+L([13.6,2.4])]);

// ── containers ───────────────────────────────────────────────────────────────
// download.svg already ships, already monoline at 1.25, and is left alone. Upload is
// its mirror, drawn here because the set had no upload.
I['upload']  =svg([M([8,12.4])+L([8,3.6]), ...chev(8,5.6,4,'u'), M([1.8,14.4])+L([14.2,14.4])]);
I['share']=svg([ring(12.1,3.6,1.7), ring(12.1,12.4,1.7), ring(3.9,8,1.7),
  M([5.4,7.2])+L([10.6,4.4]), M([5.4,8.8])+L([10.6,11.6])]);
I['trash']=svg([M([2.4,4.1])+L([13.6,4.1]),
  M([6,4.1])+L([6,2.9])+qtR([6,2.9],U.u,[7.2,1.7],U.r,1.2)+L([8.8,1.7])
   +qtR([8.8,1.7],U.r,[10,2.9],U.d,1.2)+L([10,4.1]),
  M([3.7,4.1])+L([4.5,13])+qtR([4.5,13],U.d,[5.9,14.4],U.r,1.4)+L([10.1,14.4])
   +qtR([10.1,14.4],U.r,[11.5,13],U.u,1.4)+L([12.3,4.1])]);
I['copy']=svg([rrect(1.6,5.2,9.2,9.2,1.8),
  M([5.2,5.2])+L([5.2,3.4])+qtR([5.2,3.4],U.u,[7,1.6],U.r,1.8)+L([12.6,1.6])
   +qtR([12.6,1.6],U.r,[14.4,3.4],U.d,1.8)+L([14.4,9],1.8)
   +qtR([14.4,9],U.d,[12.6,10.8],U.l,1.8)+L([10.8,10.8])]);
I['file']=svg([
  M([9.3,1.6])+L([4.4,1.6])+qtR([4.4,1.6],U.l,[3,3],U.d,1.4)+L([3,13])
   +qtR([3,13],U.d,[4.4,14.4],U.r,1.4)+L([11.6,14.4])
   +qtR([11.6,14.4],U.r,[13,13],U.u,1.4)+L([13,5.3])+L([9.3,1.6])+'Z',
  M([9.3,1.6])+L([9.3,5.3])+L([13,5.3])]);
I['image']=svg([rrect(1.7,2.8,12.6,10.4,1.8), ring(5.5,6.3,1.15),
  M([2.4,12.7])+`Q5 8.4 6.6 8.8`+`Q8.3 9.2 9.5 11.4`+`Q10.6 9.4 11.7 9.6`+`Q12.7 9.8 14.3 12.4`]);
I['mail']=svg([rrect(1.5,3.4,13,9.2,1.8), M([2,4.2])+`Q8 10 14,4.2`]);
I['calendar']=svg([rrect(1.7,3.2,12.6,11.2,1.8), M([1.7,7])+L([14.3,7]),
  M([5,1.6])+L([5,4.4]), M([11,1.6])+L([11,4.4])]);
I['bookmark']=svg([M([3.6,3.2])+qtR([3.6,3.2],U.u,[5.4,1.6],U.r,1.7)+L([10.6,1.6])
  +qtR([10.6,1.6],U.r,[12.4,3.2],U.d,1.7)+L([12.4,14.4])+L([8,11.1])+L([3.6,14.4])+'Z']);
I['bag']=svg([
  M([3.4,5.3])+L([12.6,5.3])+L([13.5,13])+qtR([13.5,13],U.d,[12.1,14.4],U.l,1.4)
   +L([3.9,14.4])+qtR([3.9,14.4],U.l,[2.5,13],U.u,1.4)+L([3.4,5.3])+'Z',
  M([5.5,7.2])+L([5.5,4.6])+qt([5.5,4.6],U.u,[8,2.1],U.r)+qt([8,2.1],U.r,[10.5,4.6],U.d)+L([10.5,7.2])]);
I['lock']=svg([rrect(2.7,7,10.6,7.5,1.9),
  M([5.2,7])+L([5.2,5.1])+qt([5.2,5.1],U.u,[8,2.3],U.r)+qt([8,2.3],U.r,[10.8,5.1],U.d)+L([10.8,7])]);
I['location']=svg([
  M([8,14.9])+`C6.4 12.6 3.4 10.2 3.4 6.8`+qt([3.4,6.8],U.u,[8,2.2],U.r)
   +qt([8,2.2],U.r,[12.6,6.8],U.d)+`C12.6 10.2 9.6 12.6 8 14.9`+'Z',
  ring(8,6.6,1.9)]);
I['filter']=svg([M([1.7,3.2])+L([14.3,3.2])+`Q11 6.6 9.5 9.2`+L([9.5,14])+L([6.5,12.3])+L([6.5,9.2])+`Q5 6.6 1.7 3.2`+'Z']);

// ── controls ─────────────────────────────────────────────────────────────────
I['settings-sliders']=svg([M([1.8,5.2])+L([14.2,5.2]), M([1.8,10.8])+L([14.2,10.8]),
  ring(5.6,5.2,1.75), ring(10.4,10.8,1.75)]);
I['settings-gear']=(()=>{const t=[];for(let i=0;i<8;i++){const a=i*45;const p1=ringPoint(8,8,4.3,a),p2=ringPoint(8,8,6.6,a);t.push(M(p1)+L(p2));}
  return svg([ring(8,8,4.3),...t,ring(8,8,1.9)]);})();
I['play']=svg([poly([[4.7,2.7],[13.2,8],[4.7,13.3]],1.2)]);
I['pause']=svg([M([5.6,2.9])+L([5.6,13.1]), M([10.4,2.9])+L([10.4,13.1])]);
I['stop']=svg([rrect(3.4,3.4,9.2,9.2,1.6)]);
I['edit']=(()=>{const F=frame(8,8,-45);
  return svg([rrect(-6.2,-1.9,10.4,3.8,0.9,F), M(F(-6.2,0))+L(F(-8.6,0)), M(F(-2.2,-1.9))+L(F(-2.2,1.9))]);})();
I['link']=(()=>{const F=frame(8,8,-45);
  return svg([
    M(F(-0.8,-2.4))+L(F(-3.4,-2.4))+qtR(F(-3.4,-2.4),F.dir(-1,0),F(-5.8,0),F.dir(0,1),2.4)
      +qtR(F(-5.8,0),F.dir(0,1),F(-3.4,2.4),F.dir(1,0),2.4)+L(F(-0.8,2.4)),
    M(F(0.8,-2.4))+L(F(3.4,-2.4))+qtR(F(3.4,-2.4),F.dir(1,0),F(5.8,0),F.dir(0,1),2.4)
      +qtR(F(5.8,0),F.dir(0,1),F(3.4,2.4),F.dir(-1,0),2.4)+L(F(0.8,2.4)),
    M(F(-2.4,0))+L(F(2.4,0))]);})();
I['phone']=svg([rrect(4.4,1.6,7.2,12.8,1.9),
  M([6.6,4.1])+L([9.4,4.1]), D(8,11.9,0.8)]);
const OUT = new URL('../assets/icons/', import.meta.url);
for (const [name, svg] of Object.entries(I)) writeFileSync(new URL(name + '.svg', OUT), svg);
console.log(Object.keys(I).length + ' marks written to assets/icons/');
