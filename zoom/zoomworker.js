﻿function SinXDivX(n){var t=-2,i,r;return n=Math.abs(n),i=n*n,r=i*n,n<=1?(t+2)*r-(t+3)*i+1:n<=2?t*r-5*t*i+8*t*n-4*t:0}function border_color(n){return n<=0?0:n>=255?255:n}function ThreeOrder0(n,t,i,r,u,f){for(var y=Math.floor(i),p=Math.floor(r),a=i-y,v=r-p,l=[],s,h,o,e=0;e<4;e++)for(o=0;o<4;o++){var rt=y-1+o,ut=p-1+e,c=4*(t*ut+rt);c<0&&(c=0);c+4>n.length&&(c=n.length-4);l[e*4+o]=[n[c],n[c+1],n[c+2],n[c+3]]}s=[];h=[];s[0]=SinXDivX(1+a);s[1]=SinXDivX(a);s[2]=SinXDivX(1-a);s[3]=SinXDivX(2-a);h[0]=SinXDivX(1+v);h[1]=SinXDivX(v);h[2]=SinXDivX(1-v);h[3]=SinXDivX(2-v);var w=0,b=0,k=0,d=0;for(e=0;e<4;++e){var g=0,nt=0,tt=0,it=0;for(o=0;o<4;++o)it+=s[o]*l[e*4+o][3],g+=s[o]*l[e*4+o][0],nt+=s[o]*l[e*4+o][1],tt+=s[o]*l[e*4+o][2];d+=it*h[e];w+=g*h[e];b+=nt*h[e];k+=tt*h[e]}u[f+3]=d;u[f]=w;u[f+1]=b;u[f+2]=k}onmessage=function(n){for(var r=n.data.width,e=n.data.height,t=n.data.scale,o=n.data.imageData,u=new Array(r*e*t*t*4),f=r*t,i=0,s=u.length;i<s;i+=4){var h=i/4%f,c=parseInt(i/4/f),l=h/t,a=c/t;ThreeOrder0(o,r,l,a,u,i)}postMessage({result:u})}