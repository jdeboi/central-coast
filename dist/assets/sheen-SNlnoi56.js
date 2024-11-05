import{ag as ue,C as ge,aJ as _e,aG as Pe,av as be,aK as Se,R as le,l as ke,aL as Fe,V as m,E as J,aC as Le,ap as Ie,A as We,au as Ce,aH as Ne,v as O,aM as qe,as as Be,aN as De,D as Ue,ar as ze}from"./three.module-C22ZGVHY.js";var Ve=Re;function Re(t,e,r){r=r||{};var a=r.octaveCount||4,n=r.amplitude||.1,c=r.persistence||.2,l=Te(t,e),f=new Array(a),i;for(i=0;i<a;++i)f[i]=x(i);var o=new Array(t*e),h=0;for(i=a-1;i>=0;--i){n*=c,h+=n;for(var d=0;d<o.length;++d)o[d]=o[d]||0,o[d]+=f[i][d]*n}for(i=0;i<o.length;++i)o[i]/=h;return o;function x(u){for(var y=new Array(t*e),s=Math.pow(2,u),b=1/s,w=0,p=0;p<e;++p)for(var M=Math.floor(p/s)*s,S=(M+s)%e,G=(p-M)*b,W=0;W<t;++W){var k=Math.floor(W/s)*s,H=(k+s)%t,C=(W-k)*b,N=Q(l[M*t+k],l[S*t+k],G),F=Q(l[M*t+H],l[S*t+H],G);y[w]=Q(N,F,C),w+=1}return y}}function Te(t,e){for(var r=new Array(t*e),a=0;a<r.length;++a)r[a]=Math.random();return r}function Q(t,e,r){return t*(1-r)+r*e}class Ae extends ue{constructor(e,r,a){const n={irradianceProbe:{value:e},radianceProbe:{value:r},iridescenceLookUp:{value:a},color:{value:new ge(1,1,1)},boost:{value:1}};super({uniforms:n,vertexShader:`
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
          }`}),this.extensions.derivatives=!0}get radianceProbe(){return this.uniforms.radianceProbe.value}set radianceProbe(e){this.uniforms.radianceProbe.value=e}get irradianceProbe(){return this.uniforms.irradianceProbe.value}set irradianceProbe(e){this.uniforms.irradianceProbe.value=e}get iridescenceLookUp(){return this.uniforms.iridescenceLookUp.value}set iridescenceLookUp(e){this.uniforms.iridescenceLookUp.value=e}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=e}get boost(){return this.uniforms.boost.value}set boost(e){this.uniforms.boost.value=e}}class Ge extends _e{constructor(e=380,r=2,a=3,n=64){const c=new Uint8Array(n*4);super(c,n,1,Pe,be,Se,le,le,ke,Fe),this._filmThickness=e,this._refractiveIndexFilm=r,this._refractiveIndexBase=a,this._size=n,this._data=c,this._updateData(),this.generateMipmaps=!0,this.needsUpdate=!0}get filmThickness(){return this._filmThickness}set filmThickness(e){this._filmThickness=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}get refractiveIndexFilm(){return this._refractiveIndexFilm}set refractiveIndexFilm(e){this._refractiveIndexFilm=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}get refractiveIndexBase(){return this._refractiveIndexBase}set refractiveIndexBase(e){this._refractiveIndexBase=e,this.updateSettings(this._filmThickness,this._refractiveIndexFilm,this._refractiveIndexBase)}updateSettings(e,r,a){this._filmThickness=e||380,this._refractiveIndexFilm=r||2,this._refractiveIndexBase=a||3,this._updateData()}_fresnelRefl(e,r,a,n,c,l){var f=1-a*a,i=e/r;if(i*i*f>1){c.x=1,c.y=1;var o=i*i;l.x=2*Math.atan(-o*Math.sqrt(f-1/o)/a),l.y=2*Math.atan(-Math.sqrt(f-1/o)/a)}else{var h=(r*a-e*n)/(r*a+e*n),d=(e*a-r*n)/(e*a+r*n);l.x=h<0?Math.PI:0,l.y=d<0?Math.PI:0,c.x=h*h,c.y=d*d}}_updateData(){var e=this._filmThickness,r=this._refractiveIndexFilm,a=this._refractiveIndexBase,n=this._size;function c(v){var _=(v-442)*(v<442?.0624:.0374),P=(v-599.8)*(v<599.8?.0264:.0323),se=(v-501.1)*(v<501.1?.049:.0382);return .362*Math.exp(-.5*_*_)+1.056*Math.exp(-.5*P*P)-.065*Math.exp(-.5*se*se)}function l(v){var _=(v-568.8)*(v<568.8?.0213:.0247),P=(v-530.9)*(v<530.9?.0613:.0322);return .821*Math.exp(-.5*_*_)+.286*Math.exp(-.5*P*P)}function f(v){var _=(v-437)*(v<437?.0845:.0278),P=(v-459)*(v<459?.0385:.0725);return 1.217*Math.exp(-.5*_*_)+.681*Math.exp(-.5*P*P)}for(var i=this._data,o=new m,h=new m,d=new m,x=new m,u=new m,y=new m,s=new m,b=new m,w=new m,p=new m,M=new m,S=new m,G=1/(r*r),W=r*r/(a*a),k=64,H=400,C=0;C<n;++C){var N=C/n,F=Math.sqrt(1-G*(1-N*N)),xe=Math.sqrt(1-W*(1-F*F)),pe=2*r*e*F,ye=2*Math.PI*pe;this._fresnelRefl(1,r,N,F,x,o),u.x=1-x.x,u.y=1-x.y,h.x=Math.PI-o.x,h.y=Math.PI-o.y,this._fresnelRefl(r,a,F,xe,y,d),s.x=Math.sqrt(y.x*x.x),s.y=Math.sqrt(y.y*x.y),b.x=Math.sqrt(u.x*u.x),b.y=Math.sqrt(u.y*u.y),w.x=u.x*u.x*y.x/(1-y.x*x.x),w.y=u.y*u.y*y.y/(1-y.y*x.y),p.x=s.x*s.x,p.y=s.y*s.y,M.x=x.x+w.x,M.y=x.y+w.y,S.x=w.x-b.x,S.y=w.y-b.y;for(var q=0,B=0,D=0,X=0,Y=0,ee=0,K=0;K<k;++K){var E=380+K/(k-1)*H,re=ye/E,ae=Math.cos(re+d.x+h.x),te=Math.cos(re+d.y+h.y),we=M.x+2*(s.x*ae-p.x)/(1-2*s.x*ae+p.x)*S.x,Me=M.y+2*(s.y*te-p.y)/(1-2*s.y*te+p.y)*S.y,Z=.5*(we+Me),ie=c(E),ne=l(E),oe=f(E);X+=ie,Y+=ne,ee+=oe,q+=ie*Z,B+=ne*Z,D+=oe*Z}q/=X,B/=Y,D/=ee;var U=3.2406*q-1.5372*B-.4986*D,z=-.9689*q+1.8758*B+.0415*D,V=.0557*q-.204*B+1.057*D;U=J.clamp(U,0,1),z=J.clamp(z,0,1),V=J.clamp(V,0,1),U=Math.sqrt(U),z=Math.sqrt(z),V=Math.sqrt(V);var j=C<<2;i[j]=Math.floor(U*255),i[j+1]=Math.floor(z*255),i[j+2]=Math.floor(V*255),i[j+3]=255}this.needsUpdate=!0}}class He extends ue{constructor(e){const r={envMap:{value:e}};super({uniforms:r,vertexShader:`
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
          }`}),this.side=Le}get envMap(){return this.uniforms.envMap.value}set envMap(e){this.uniforms.envMap.value=e}}let ve,I,T,L,ce,R,$,A,me;const g=100;let de=0;Ee();Ke();he();function Ee(){ce=new Ge,ve=document.getElementById("container"),T=new Ie,I=new We,I.position.set(0,0,50),I.aspect=window.innerWidth/window.innerHeight,I.updateProjectionMatrix(),L=new Ce({antialias:!0,alpha:!0}),L.setClearColor(0,0),L.setSize(window.innerWidth,window.innerHeight),L.shadowMap.enabled=!0,ve.appendChild(L.domElement);const t=1e3;let e=new Ne(t,t,t),r=fe("/central-coast/assets/sheen/skybox/radiance"),a=fe("/central-coast/assets/sheen/skybox/irradiance"),n=new He(r);new O(e,n);let c=new qe(10,3,100,16);R=new Ae(a,r,ce),R.boost=7,R.refractiveIndex=6,$=new O(c,R);const l=window.innerWidth*.135,f=new Be(l,30,l/2,30);A=new O(f,R),A.position.set(0,-10,-100),A.rotation.x=-1,T.add(A);const i=new De(16777215,.4);T.add(i);const o=new Ue(16777215,2);o.position.set(100,200,100),T.add(o),window.addEventListener("resize",je,!1)}function je(){I.aspect=window.innerWidth/window.innerHeight,I.updateProjectionMatrix(),L.setSize(window.innerWidth,window.innerHeight)}function he(){requestAnimationFrame(he),$.rotation.x+=.01,$.rotation.y+=.01,Ze(A.geometry,de),de+=.03,L.render(T,I)}function fe(t){var e=[t+"/posX.jpg",t+"/negX.jpg",t+"/posY.jpg",t+"/negY.jpg",t+"/posZ.jpg",t+"/negZ.jpg"],r=new ze;return r.load(e)}function Ke(){me=Ve(g,g,{amplitude:10,frequency:1.5,persistence:.8,lacunarity:2})}function Ze(t,e){const r=t.attributes.position;for(let a=0;a<r.count;a++){const n=r.getX(a),c=r.getY(a),l=Math.floor(n/200*g+g/2)%g,f=Math.floor(c/200*g+g/2)%g,i=l+f*g,o=me[i]*10+Math.sin(e+i*.1)*2;r.setZ(a,o)}r.needsUpdate=!0,t.computeVertexNormals(),t.computeTangents()}
