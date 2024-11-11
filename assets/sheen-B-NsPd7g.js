import{g as de,l as ge,a3 as _e,R as Pe,U as be,a4 as Fe,s as ne,L as Le,a5 as Se,V as c,Z as E,e as ke,d as Ie,u as We,v as Be,w as Ue,M as Z,a6 as qe,y as De,a7 as ze,q as Ce,$ as Te}from"./three.module-DFTz8YJ4.js";import{g as Ve}from"./index-BwRJc8nb.js";import{G as Ne}from"./GLTFLoader-DsL4G3U8.js";class Re extends de{constructor(e,r,i){const a={irradianceProbe:{value:e},radianceProbe:{value:r},iridescenceLookUp:{value:i},color:{value:new ge(1,1,1)},boost:{value:1}};super({uniforms:a,vertexShader:`
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          
          void main() {
              vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
              // normalMatrix is view space... we need world space which is okay here since we're using uniform scaling only
              vec4 viewPos = modelViewMatrix * vec4(position,1.0);
              vWorldNormal = mat3(modelMatrix) * normalize(normal);
              gl_Position = projectionMatrix * viewPos;
          }`,fragmentShader:`
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          
          uniform vec3 color;
          uniform float boost;
          uniform samplerCube radianceProbe;
          uniform samplerCube irradianceProbe;
          uniform sampler2D iridescenceLookUp;
          
          void main() {
          
              vec3 viewWorldDir = normalize(vWorldPosition - cameraPosition);
          
              vec3 normal = normalize(vWorldNormal); //getNormal(normalSample.xy);
              vec3 viewNormal = mat3(viewMatrix) * normal;
          
              vec3 albedo = color;
              vec3 diffuseLight = vec3(0.0);
              vec3 specularLight = vec3(0.0);
          
              vec3 reflectedView = reflect(viewWorldDir, normal);
              float NdotV = max(-dot(viewWorldDir, normal), 0.0);
              float fresnelFactor = pow(1.0 - NdotV, 5.0);
          
              // * .99 to remove the glossy bit
              vec3 airy = texture2D(iridescenceLookUp, vec2(NdotV * .99, 0.0)).xyz;
              airy *= airy;
          
              vec4 reflectionSample = textureCube(radianceProbe, reflectedView);
          
              specularLight = reflectionSample.xyz * reflectionSample.xyz * airy * boost;
          
              vec4 diffuseSample = textureCube(irradianceProbe, normal);
              diffuseLight = diffuseSample.xyz * diffuseSample.xyz;
          
              vec3 final = albedo * diffuseLight + specularLight;
          
              gl_FragColor = vec4(sqrt(final), 1.0);
          }`}),this.extensions.derivatives=!0}get radianceProbe(){return this.uniforms.radianceProbe.value}set radianceProbe(e){this.uniforms.radianceProbe.value=e}get irradianceProbe(){return this.uniforms.irradianceProbe.value}set irradianceProbe(e){this.uniforms.irradianceProbe.value=e}get iridescenceLookUp(){return this.uniforms.iridescenceLookUp.value}set iridescenceLookUp(e){this.uniforms.iridescenceLookUp.value=e}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=e}get boost(){return this.uniforms.boost.value}set boost(e){this.uniforms.boost.value=e}}class Ge extends _e{constructor(e=380,r=2,i=3,a=64){const s=new Uint8Array(a*4);super(s,a,1,Pe,be,Fe,ne,ne,Le,Se),this._filmThickness=e,this._refractiveIndexFilm=r,this._refractiveIndexBase=i,this._size=a,this._data=s,this._updateData(),this.generateMipmaps=!0,this.needsUpdate=!0}get filmThickness(){return this._filmThickness}set filmThickness(e){this._filmThickness=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}get refractiveIndexFilm(){return this._refractiveIndexFilm}set refractiveIndexFilm(e){this._refractiveIndexFilm=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}get refractiveIndexBase(){return this._refractiveIndexBase}set refractiveIndexBase(e){this._refractiveIndexBase=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}updateSettings(e,r,i){this._filmThickness=e||380,this._refractiveIndexFilm=r||2,this._refractiveIndexBase=i||3,this._updateData()}_fresnelRefl(e,r,i,a,s,d){var u=1-i*i,o=e/r;if(o*o*u>1){s.x=1,s.y=1;var l=o*o;d.x=2*Math.atan(-l*Math.sqrt(u-1/l)/i),d.y=2*Math.atan(-Math.sqrt(u-1/l)/i)}else{var x=(r*i-e*a)/(r*i+e*a),y=(e*i-r*a)/(e*i+r*a);d.x=x<0?Math.PI:0,d.y=y<0?Math.PI:0,s.x=x*x,s.y=y*y}}_updateData(){var e=this._filmThickness,r=this._refractiveIndexFilm,i=this._refractiveIndexBase,a=this._size;function s(n){var p=(n-442)*(n<442?.0624:.0374),w=(n-599.8)*(n<599.8?.0264:.0323),ae=(n-501.1)*(n<501.1?.049:.0382);return .362*Math.exp(-.5*p*p)+1.056*Math.exp(-.5*w*w)-.065*Math.exp(-.5*ae*ae)}function d(n){var p=(n-568.8)*(n<568.8?.0213:.0247),w=(n-530.9)*(n<530.9?.0613:.0322);return .821*Math.exp(-.5*p*p)+.286*Math.exp(-.5*w*w)}function u(n){var p=(n-437)*(n<437?.0845:.0278),w=(n-459)*(n<459?.0385:.0725);return 1.217*Math.exp(-.5*p*p)+.681*Math.exp(-.5*w*w)}for(var o=this._data,l=new c,x=new c,y=new c,h=new c,v=new c,M=new c,f=new c,C=new c,P=new c,b=new c,T=new c,V=new c,ue=1/(r*r),he=r*r/(i*i),X=64,me=400,N=0;N<a;++N){var j=N/a,S=Math.sqrt(1-ue*(1-j*j)),xe=Math.sqrt(1-he*(1-S*S)),pe=2*r*e*S,we=2*Math.PI*pe;this._fresnelRefl(1,r,j,S,h,l),v.x=1-h.x,v.y=1-h.y,x.x=Math.PI-l.x,x.y=Math.PI-l.y,this._fresnelRefl(r,i,S,xe,M,y),f.x=Math.sqrt(M.x*h.x),f.y=Math.sqrt(M.y*h.y),C.x=Math.sqrt(v.x*v.x),C.y=Math.sqrt(v.y*v.y),P.x=v.x*v.x*M.x/(1-M.x*h.x),P.y=v.y*v.y*M.y/(1-M.y*h.y),b.x=f.x*f.x,b.y=f.y*f.y,T.x=h.x+P.x,T.y=h.y+P.y,V.x=P.x-C.x,V.y=P.y-C.y;for(var k=0,I=0,W=0,Y=0,$=0,J=0,A=0;A<X;++A){var R=380+A/(X-1)*me,O=we/R,Q=Math.cos(O+y.x+x.x),ee=Math.cos(O+y.y+x.y),ye=T.x+2*(f.x*Q-b.x)/(1-2*f.x*Q+b.x)*V.x,Me=T.y+2*(f.y*ee-b.y)/(1-2*f.y*ee+b.y)*V.y,H=.5*(ye+Me),re=s(R),ie=d(R),te=u(R);Y+=re,$+=ie,J+=te,k+=re*H,I+=ie*H,W+=te*H}k/=Y,I/=$,W/=J;var B=3.2406*k-1.5372*I-.4986*W,U=-.9689*k+1.8758*I+.0415*W,q=.0557*k-.204*I+1.057*W;B=E.clamp(B,0,1),U=E.clamp(U,0,1),q=E.clamp(q,0,1),B=Math.sqrt(B),U=Math.sqrt(U),q=Math.sqrt(q);var G=N<<2;o[G]=Math.floor(B*255),o[G+1]=Math.floor(U*255),o[G+2]=Math.floor(q*255),o[G+3]=255}this.needsUpdate=!0}}class je extends de{constructor(e){const r={envMap:{value:e}};super({uniforms:r,vertexShader:`
          varying vec3 worldViewDir;
          
          void main() {
              vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
              worldViewDir = worldPosition - cameraPosition;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,fragmentShader:`
          varying vec3 worldViewDir;
          uniform samplerCube envMap;
          
          void main() {
              vec3 elementDir = normalize(worldViewDir);
              gl_FragColor = textureCube(envMap, elementDir);
          }`}),this.side=ke}get envMap(){return this.uniforms.envMap.value}set envMap(e){this.uniforms.envMap.value=e}}let oe,_,F,g,se,D,K,z,ve,L;const m=100;let le=0;Ae();Ee();fe();function Ae(){se=new Ge,oe=document.getElementById("container"),F=new Ie,_=new We,_.position.set(0,0,50),_.aspect=window.innerWidth/window.innerHeight,_.updateProjectionMatrix(),g=new Be({antialias:!0,alpha:!0}),g.setClearColor(0,0),g.setSize(window.innerWidth,window.innerHeight),g.shadowMap.enabled=!0,oe.appendChild(g.domElement);const t=1e3;let e=new Ue(t,t,t),r=ce("/central-coast/assets/sheen/skybox/radiance"),i=ce("/central-coast/assets/sheen/skybox/irradiance"),a=new je(r);new Z(e,a);let s=new qe(10,3,100,16);D=new Re(i,r,se),D.boost=7,D.refractiveIndex=6,K=new Z(s,D);const d=window.innerWidth*.135,u=new De(d,30,d/2,30);z=new Z(u,D),z.position.set(0,-10,-100),z.rotation.x=-1,F.add(z);const o=new ze(16777215,.4);F.add(o);const l=new Ce(16777215,2);l.position.set(100,200,100),F.add(l),Ke("/central-coast/assets/sheen/oilrig/scene.gltf"),window.addEventListener("resize",He,!1)}function He(){_.aspect=window.innerWidth/window.innerHeight,_.updateProjectionMatrix(),g.setSize(window.innerWidth,window.innerHeight)}function fe(){requestAnimationFrame(fe),K.rotation.x+=.01,K.rotation.y+=.01,Ze(z.geometry,le),le+=.03,L&&(L.rotation.y+=.01),g.render(F,_)}function ce(t){var e=[t+"/posX.jpg",t+"/negX.jpg",t+"/posY.jpg",t+"/negY.jpg",t+"/posZ.jpg",t+"/negZ.jpg"],r=new Te;return r.load(e)}function Ee(){ve=Ve(m,m,{amplitude:10,frequency:1.5,persistence:.8,lacunarity:2})}function Ze(t,e){const r=t.attributes.position;for(let i=0;i<r.count;i++){const a=r.getX(i),s=r.getY(i),d=Math.floor(a/200*m+m/2)%m,u=Math.floor(s/200*m+m/2)%m,o=d+u*m,l=ve[o]*10+Math.sin(e+o*.1)*2;r.setZ(i,l)}r.needsUpdate=!0,t.computeVertexNormals(),t.computeTangents()}function Ke(t){new Ne().load(t,function(r){L=r.scene,L.position.set(0,-10,0),L.scale.set(.1,.1,.1),F.add(L)},void 0,function(r){console.error("An error occurred while loading the GLTF model:",r)})}
