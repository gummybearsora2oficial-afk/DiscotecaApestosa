import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/MTLLoader.js';

const dances=[
 ['Baile clásico','🪩','bounce'],['Robot','🤖','robot'],['Disco','✨','disco'],['Saltitos','🐇','hops'],
 ['Baile loco','🤪','crazy'],['Moonwalk','🌙','moon'],['Giro','💫','turn'],['Brazos arriba','🙌','arms'],
 ['Rebote','🫧','pulse'],['Baile final','🎉','final']
];
const grid=document.querySelector('#danceGrid');
let selectedDance='bounce',selectedCharacter='rony';
let models={rony:null,prima:null}, mixerRoot=null, clock=new THREE.Clock();
const viewer=document.querySelector('#viewer');
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(32,1,.1,100);
camera.position.set(0,1.25,5.6); camera.lookAt(0,1,0);
const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.outputColorSpace=THREE.SRGBColorSpace;
viewer.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x56366e,2));
const key=new THREE.DirectionalLight(0xffffff,2.4);key.position.set(-3,5,4);scene.add(key);
const rim=new THREE.PointLight(0xff65b5,20,10);rim.position.set(2,2,1);scene.add(rim);
const floor=new THREE.Mesh(new THREE.CircleGeometry(1.5,48),new THREE.MeshBasicMaterial({color:0x9a54c9,transparent:true,opacity:.18}));
floor.rotation.x=-Math.PI/2;floor.position.y=-.015;scene.add(floor);
let placeholder;
function makePlaceholder(letter,color){
 const group=new THREE.Group();
 const mat=new THREE.MeshStandardMaterial({color,roughness:.28,metalness:.05});
 const body=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.85,6,12),mat);body.position.y=1.05;group.add(body);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.36,24,16),mat);head.position.y=1.85;group.add(head);
 const eyeMat=new THREE.MeshBasicMaterial({color:0x171027});
 for(const x of [-.13,.13]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.035,8,8),eyeMat);eye.position.set(x,1.9,.32);group.add(eye)}
 for(const x of [-.53,.53]){const arm=new THREE.Mesh(new THREE.CapsuleGeometry(.12,.62,4,8),mat);arm.position.set(x,1.15,0);arm.rotation.z=x<0?-.25:.25;group.add(arm)}
 for(const x of [-.2,.2]){const leg=new THREE.Mesh(new THREE.CapsuleGeometry(.14,.65,4,8),mat);leg.position.set(x,.35,0);group.add(leg)}
 group.userData.placeholder=true;group.userData.baseY=0;return group;
}
function showCurrent(){
 if(mixerRoot)scene.remove(mixerRoot);
 mixerRoot=models[selectedCharacter]||makePlaceholder(selectedCharacter==='rony'?'R': 'P',selectedCharacter==='rony'?0x55dba5:0xff70b4);
 mixerRoot.position.set(0,0,0);mixerRoot.scale.setScalar(1);
 scene.add(mixerRoot);
 document.querySelector('#stageHint').textContent=models[selectedCharacter]?'Modelo cargado · baile en bucle':'Vista previa · importa tu modelo 3D';
}
showCurrent();
function resize(){const w=viewer.clientWidth||320,h=viewer.clientHeight||260;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
new ResizeObserver(resize).observe(viewer);resize();

function renderDance(t){
 if(!mixerRoot)return;
 const root=mixerRoot;const phase=t*2.6;
 root.rotation.set(0,0,0);root.position.y=0;
 switch(selectedDance){
  case 'bounce':root.position.y=Math.abs(Math.sin(phase))*.18;root.rotation.z=Math.sin(phase)*.08;break;
  case 'robot':root.rotation.y=Math.sin(phase)*.22;root.position.y=(Math.sin(phase*2)>.7)?.06:0;break;
  case 'disco':root.rotation.z=Math.sin(phase)*.18;root.rotation.y=Math.sin(phase*.5)*.25;root.position.y=.08+Math.sin(phase)*.07;break;
  case 'hops':root.position.y=Math.abs(Math.sin(phase*1.5))*.27;root.rotation.z=Math.sin(phase*1.5)*.1;break;
  case 'crazy':root.rotation.z=Math.sin(phase*2.1)*.24;root.rotation.y=Math.cos(phase*1.3)*.35;root.position.y=Math.abs(Math.sin(phase*2))*.12;break;
  case 'moon':root.position.x=Math.sin(phase)*.25;root.rotation.y=.12;break;
  case 'turn':root.rotation.y=phase*.45;root.position.y=.05+Math.sin(phase)*.06;break;
  case 'arms':root.rotation.z=Math.sin(phase)*.12;root.position.y=.04+Math.abs(Math.sin(phase))*.08;break;
  case 'pulse':root.scale.setScalar(1+Math.sin(phase*2)*.045);root.position.y=.04;break;
  case 'final':root.rotation.y=Math.sin(phase)*.3;root.rotation.z=Math.sin(phase*2)*.13;root.position.y=Math.abs(Math.sin(phase))*.2;break;
 }
}
function loop(){requestAnimationFrame(loop);const t=clock.getElapsedTime();renderDance(t);renderer.render(scene,camera)}
loop();

dances.forEach(([name,icon,id],i)=>{
 const b=document.createElement('button');b.className='dance'+(i===0?' active':'');
 b.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><span class="dance-name">${name}</span><span class="dance-icon">${icon}</span>`;
 b.addEventListener('click',()=>{selectedDance=id;document.querySelectorAll('.dance').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector('#stageStatus').textContent='BAILANDO: '+name.toUpperCase()});
 grid.appendChild(b);
});
document.querySelectorAll('.character').forEach(b=>b.addEventListener('click',()=>{
 selectedCharacter=b.dataset.character;document.querySelectorAll('.character').forEach(x=>x.classList.toggle('active',x===b));showCurrent();
}));
async function importFiles(inputId,character){
 const files=[...document.getElementById(inputId).files];
 const obj=files.find(f=>f.name.toLowerCase().endsWith('.obj'));
 if(!obj){alert('Selecciona también el archivo .OBJ del personaje.');return}
 const urls=new Map(files.map(f=>[f.name,URL.createObjectURL(f)]));
 const manager=new THREE.LoadingManager();
 manager.setURLModifier(url=>{const name=decodeURIComponent(url.split('/').pop());return urls.get(name)||url});
 try{
  const mtl=files.find(f=>f.name.toLowerCase().endsWith('.mtl'));
  let loader=new OBJLoader(manager);
  if(mtl){const text=await mtl.text();const ml=new MTLLoader(manager);const materials=ml.parse(text,'');materials.preload();loader.setMaterials(materials)}
  const object=loader.parse(await obj.text());
  const box=new THREE.Box3().setFromObject(object),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
  object.position.sub(center);const scale=2.15/Math.max(size.y,size.x,size.z);object.scale.setScalar(scale);object.position.y=0;
  object.traverse(n=>{if(n.isMesh){n.castShadow=true;n.material.side=THREE.DoubleSide}});
  models[character]=object;
  if(selectedCharacter===character)showCurrent();
  document.querySelector('#stageStatus').textContent='MODELO '+character.toUpperCase()+' CARGADO';
  document.querySelector('#stageHint').textContent='Modelo importado · movimientos de escenario';
 }catch(e){console.error(e);alert('No se pudo cargar el OBJ/MTL. Revisa que las texturas PNG estén seleccionadas también.')}
}
document.querySelector('#ronyFiles').addEventListener('change',()=>importFiles('ronyFiles','rony'));
document.querySelector('#primaFiles').addEventListener('change',()=>importFiles('prima','prima'));
