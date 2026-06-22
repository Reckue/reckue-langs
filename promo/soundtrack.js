const fs = require("fs");
const path = require("path");

const SR = 44100, DUR = 10.0, N = Math.floor(SR * DUR);
const buf = new Float32Array(N);

function wave(type, ph){
  if(type==="sine")     return Math.sin(ph);
  if(type==="square")   return Math.sin(ph)>=0 ? 1 : -1;
  if(type==="triangle") return Math.asin(Math.sin(ph))*(2/Math.PI);
  return Math.sin(ph);
}
// тон с глайдом частоты f1->f2, быстрый attack + экспоненциальный decay
function tone(t0,f1,f2,dur,type,gain){
  const s=Math.floor(t0*SR), e=Math.min(N,Math.floor((t0+dur)*SR));
  let ph=0;
  for(let i=s;i<e;i++){
    const x=(i-s)/SR, p=x/dur;
    const f=f1*Math.pow(f2/f1,p);
    ph+=2*Math.PI*f/SR;
    const atk=Math.min(x/0.006,1), env=atk*Math.exp(-9.2*p);
    buf[i]+=wave(type,ph)*env*gain;
  }
}
function noise(t0,dur,gain){
  const s=Math.floor(t0*SR), e=Math.min(N,Math.floor((t0+dur)*SR)), len=e-s;
  for(let i=s;i<e;i++) buf[i]+=(Math.random()*2-1)*(1-(i-s)/len)*gain;
}

const kick =t=>tone(t,150,48,0.16,"sine",0.5);
const hat  =t=>noise(t,0.02,0.08);
const click=t=>{tone(t,900,420,0.06,"square",0.22);noise(t,0.03,0.10);};
const pop  =t=>tone(t,520,880,0.12,"sine",0.34);
const tick =t=>tone(t,1300,1100,0.05,"triangle",0.20);
const bass =t=>{tone(t,110,40,0.8,"sine",0.7);tone(t,220,80,0.5,"triangle",0.28);};

// бит ~128 BPM до бренд-кадра
let i=0;
for(let t=0.528;t<6.2;t+=0.468){ kick(t); if(i%2) hat(t+0.234); i++; }
// UI-звуки по таймингам ролика
[1.26,2.26,2.64,3.02,3.40].forEach(click);
[1.80,2.80,3.18,3.56,3.94].forEach(pop);
[3.82,4.08,5.24,5.38,5.52].forEach(tick);
bass(6.20);

// мягкий лимитер + 16-bit PCM WAV
const out=Buffer.alloc(44+N*2);
out.write("RIFF",0); out.writeUInt32LE(36+N*2,4); out.write("WAVE",8);
out.write("fmt ",12); out.writeUInt32LE(16,16); out.writeUInt16LE(1,20);
out.writeUInt16LE(1,22); out.writeUInt32LE(SR,24); out.writeUInt32LE(SR*2,28);
out.writeUInt16LE(2,32); out.writeUInt16LE(16,34);
out.write("data",36); out.writeUInt32LE(N*2,40);
for(let n=0;n<N;n++){
  let v=Math.tanh(buf[n]*0.9);            // мягкое насыщение вместо жёсткого клипа
  out.writeInt16LE(Math.max(-32767,Math.min(32767,Math.round(v*32767))),44+n*2);
}
const f=path.join(__dirname,"soundtrack.wav");
fs.writeFileSync(f,out);
console.log("WAV:"+f);
