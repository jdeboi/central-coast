import{g as ue,l as ge,a3 as _e,R as Pe,U as be,a4 as Fe,s as se,L as Le,a5 as Se,V as m,Z as J,e as ke,d as Ie,u as We,v as qe,w as Ne,M as le,a6 as Ue,y as Be,a7 as Ce,q as De,$ as ze}from"./three.module-DFTz8YJ4.js";import{G as Te}from"./GLTFLoader-DsL4G3U8.js";var Ve=Re;function Re(a,e,r){r=r||{};var t=r.octaveCount||4,n=r.amplitude||.1,l=r.persistence||.2,v=Ae(a,e),f=new Array(t),i;for(i=0;i<t;++i)f[i]=x(i);var s=new Array(a*e),h=0;for(i=t-1;i>=0;--i){n*=l,h+=n;for(var d=0;d<s.length;++d)s[d]=s[d]||0,s[d]+=f[i][d]*n}for(i=0;i<s.length;++i)s[i]/=h;return s;function x(u){for(var y=new Array(a*e),o=Math.pow(2,u),b=1/o,w=0,p=0;p<e;++p)for(var M=Math.floor(p/o)*o,F=(M+o)%e,G=(p-M)*b,W=0;W<a;++W){var L=Math.floor(W/o)*o,H=(L+o)%a,q=(W-L)*b,B=O(v[M*a+L],v[F*a+L],G),S=O(v[M*a+H],v[F*a+H],G);y[w]=O(B,S,q),w+=1}return y}}function Ae(a,e){for(var r=new Array(a*e),t=0;t<r.length;++t)r[t]=Math.random();return r}function O(a,e,r){return a*(1-r)+r*e}class Ge extends ue{constructor(e,r,t){const n={irradianceProbe:{value:e},radianceProbe:{value:r},iridescenceLookUp:{value:t},color:{value:new ge(1,1,1)},boost:{value:1}};super({uniforms:n,vertexShader:`
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
          }`}),this.extensions.derivatives=!0}get radianceProbe(){return this.uniforms.radianceProbe.value}set radianceProbe(e){this.uniforms.radianceProbe.value=e}get irradianceProbe(){return this.uniforms.irradianceProbe.value}set irradianceProbe(e){this.uniforms.irradianceProbe.value=e}get iridescenceLookUp(){return this.uniforms.iridescenceLookUp.value}set iridescenceLookUp(e){this.uniforms.iridescenceLookUp.value=e}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=e}get boost(){return this.uniforms.boost.value}set boost(e){this.uniforms.boost.value=e}}class He extends _e{constructor(e=380,r=2,t=3,n=64){const l=new Uint8Array(n*4);super(l,n,1,Pe,be,Fe,se,se,Le,Se),this._filmThickness=e,this._refractiveIndexFilm=r,this._refractiveIndexBase=t,this._size=n,this._data=l,this._updateData(),this.generateMipmaps=!0,this.needsUpdate=!0}get filmThickness(){return this._filmThickness}set filmThickness(e){this._filmThickness=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}get refractiveIndexFilm(){return this._refractiveIndexFilm}set refractiveIndexFilm(e){this._refractiveIndexFilm=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}get refractiveIndexBase(){return this._refractiveIndexBase}set refractiveIndexBase(e){this._refractiveIndexBase=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}updateSettings(e,r,t){this._filmThickness=e||380,this._refractiveIndexFilm=r||2,this._refractiveIndexBase=t||3,this._updateData()}_fresnelRefl(e,r,t,n,l,v){var f=1-t*t,i=e/r;if(i*i*f>1){l.x=1,l.y=1;var s=i*i;v.x=2*Math.atan(-s*Math.sqrt(f-1/s)/t),v.y=2*Math.atan(-Math.sqrt(f-1/s)/t)}else{var h=(r*t-e*n)/(r*t+e*n),d=(e*t-r*n)/(e*t+r*n);v.x=h<0?Math.PI:0,v.y=d<0?Math.PI:0,l.x=h*h,l.y=d*d}}_updateData(){var e=this._filmThickness,r=this._refractiveIndexFilm,t=this._refractiveIndexBase,n=this._size;function l(c){var _=(c-442)*(c<442?.0624:.0374),P=(c-599.8)*(c<599.8?.0264:.0323),oe=(c-501.1)*(c<501.1?.049:.0382);return .362*Math.exp(-.5*_*_)+1.056*Math.exp(-.5*P*P)-.065*Math.exp(-.5*oe*oe)}function v(c){var _=(c-568.8)*(c<568.8?.0213:.0247),P=(c-530.9)*(c<530.9?.0613:.0322);return .821*Math.exp(-.5*_*_)+.286*Math.exp(-.5*P*P)}function f(c){var _=(c-437)*(c<437?.0845:.0278),P=(c-459)*(c<459?.0385:.0725);return 1.217*Math.exp(-.5*_*_)+.681*Math.exp(-.5*P*P)}for(var i=this._data,s=new m,h=new m,d=new m,x=new m,u=new m,y=new m,o=new m,b=new m,w=new m,p=new m,M=new m,F=new m,G=1/(r*r),W=r*r/(t*t),L=64,H=400,q=0;q<n;++q){var B=q/n,S=Math.sqrt(1-G*(1-B*B)),xe=Math.sqrt(1-W*(1-S*S)),pe=2*r*e*S,ye=2*Math.PI*pe;this._fresnelRefl(1,r,B,S,x,s),u.x=1-x.x,u.y=1-x.y,h.x=Math.PI-s.x,h.y=Math.PI-s.y,this._fresnelRefl(r,t,S,xe,y,d),o.x=Math.sqrt(y.x*x.x),o.y=Math.sqrt(y.y*x.y),b.x=Math.sqrt(u.x*u.x),b.y=Math.sqrt(u.y*u.y),w.x=u.x*u.x*y.x/(1-y.x*x.x),w.y=u.y*u.y*y.y/(1-y.y*x.y),p.x=o.x*o.x,p.y=o.y*o.y,M.x=x.x+w.x,M.y=x.y+w.y,F.x=w.x-b.x,F.y=w.y-b.y;for(var C=0,D=0,z=0,Q=0,X=0,Y=0,K=0;K<L;++K){var j=380+K/(L-1)*H,ee=ye/j,re=Math.cos(ee+d.x+h.x),te=Math.cos(ee+d.y+h.y),we=M.x+2*(o.x*re-p.x)/(1-2*o.x*re+p.x)*F.x,Me=M.y+2*(o.y*te-p.y)/(1-2*o.y*te+p.y)*F.y,$=.5*(we+Me),ae=l(j),ie=v(j),ne=f(j);Q+=ae,X+=ie,Y+=ne,C+=ae*$,D+=ie*$,z+=ne*$}C/=Q,D/=X,z/=Y;var T=3.2406*C-1.5372*D-.4986*z,V=-.9689*C+1.8758*D+.0415*z,R=.0557*C-.204*D+1.057*z;T=J.clamp(T,0,1),V=J.clamp(V,0,1),R=J.clamp(R,0,1),T=Math.sqrt(T),V=Math.sqrt(V),R=Math.sqrt(R);var E=q<<2;i[E]=Math.floor(T*255),i[E+1]=Math.floor(V*255),i[E+2]=Math.floor(R*255),i[E+3]=255}this.needsUpdate=!0}}class je extends ue{constructor(e){const r={envMap:{value:e}};super({uniforms:r,vertexShader:`
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
          }`}),this.side=ke}get envMap(){return this.uniforms.envMap.value}set envMap(e){this.uniforms.envMap.value=e}}let ce,I,N,k,ve,Z,A,me,U;const g=100;let de=0;Ee();Ke();he();function Ee(){ve=new He,ce=document.getElementById("container"),N=new Ie,I=new We,I.position.set(0,0,50),I.aspect=window.innerWidth/window.innerHeight,I.updateProjectionMatrix(),k=new qe({antialias:!0,alpha:!0}),k.setClearColor(0,0),k.setSize(window.innerWidth,window.innerHeight),k.shadowMap.enabled=!0,ce.appendChild(k.domElement);const a=1e3;let e=new Ne(a,a,a),r=fe("/central-coast/assets/sheen/skybox/radiance"),t=fe("/central-coast/assets/sheen/skybox/irradiance"),n=new je(r);new le(e,n),new Ue(10,3,100,16),Z=new Ge(t,r,ve),Z.boost=7,Z.refractiveIndex=6;const l=window.innerWidth*.135,v=new Be(l,30,l/2,30);A=new le(v,Z),A.position.set(0,-10,-100),A.rotation.x=-1,N.add(A);const f=new Ce(16777215,.4);N.add(f);const i=new De(16777215,2);i.position.set(100,200,100),N.add(i),Je("/central-coast/assets/sheen/oilrig/scene.gltf"),window.addEventListener("resize",Ze,!1)}function Ze(){I.aspect=window.innerWidth/window.innerHeight,I.updateProjectionMatrix(),k.setSize(window.innerWidth,window.innerHeight)}function he(){requestAnimationFrame(he),$e(A.geometry,de),de+=.03,U&&(U.rotation.y+=.01),k.render(N,I)}function fe(a){var e=[a+"/posX.jpg",a+"/negX.jpg",a+"/posY.jpg",a+"/negY.jpg",a+"/posZ.jpg",a+"/negZ.jpg"],r=new ze;return r.load(e)}function Ke(){me=Ve(g,g,{amplitude:10,frequency:1.5,persistence:.8,lacunarity:2})}function $e(a,e){const r=a.attributes.position;for(let t=0;t<r.count;t++){const n=r.getX(t),l=r.getY(t),v=Math.floor(n/200*g+g/2)%g,f=Math.floor(l/200*g+g/2)%g,i=v+f*g,s=me[i]*10+Math.sin(e+i*.1)*2;r.setZ(t,s)}r.needsUpdate=!0,a.computeVertexNormals(),a.computeTangents()}function Je(a){new Te().load(a,function(r){U=r.scene,U.position.set(0,-10,0),U.scale.set(.1,.1,.1),N.add(U)},void 0,function(r){console.error("An error occurred while loading the GLTF model:",r)})}
