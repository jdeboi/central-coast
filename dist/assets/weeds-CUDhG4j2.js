import{M as ae,u as Oe,l as V,P as xe,m as b,o as fe,A as re,W as Z,H as q,g as Q,E as J,Q as _e,V as L,r as it,G as Et,s as $e,I as Dt,J as Ct,K as kt,O as oe,X as ne,Y as et,Z as jt,d as st,_ as _t,$ as At,a0 as tt,y as Ae,a1 as Ot,v as Ut,a2 as Lt}from"./three.module-DFTz8YJ4.js";import{G as It}from"./GLTFLoader-DsL4G3U8.js";var ue=function(){var M=0,u=document.createElement("div");u.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",u.addEventListener("click",function(s){s.preventDefault(),e(++M%u.children.length)},!1);function a(s){return u.appendChild(s.dom),s}function e(s){for(var m=0;m<u.children.length;m++)u.children[m].style.display=m===s?"block":"none";M=s}var r=(performance||Date).now(),c=r,p=0,f=a(new ue.Panel("FPS","#0ff","#002")),x=a(new ue.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var k=a(new ue.Panel("MB","#f08","#201"));return e(0),{REVISION:16,dom:u,addPanel:a,showPanel:e,begin:function(){r=(performance||Date).now()},end:function(){p++;var s=(performance||Date).now();if(x.update(s-r,200),s>=c+1e3&&(f.update(p*1e3/(s-c),100),c=s,p=0,k)){var m=performance.memory;k.update(m.usedJSHeapSize/1048576,m.jsHeapSizeLimit/1048576)}return s},update:function(){r=this.end()},domElement:u,setMode:e}};ue.Panel=function(M,u,a){var e=1/0,r=0,c=Math.round,p=c(window.devicePixelRatio||1),f=80*p,x=48*p,k=3*p,s=2*p,m=3*p,g=15*p,T=74*p,R=30*p,E=document.createElement("canvas");E.width=f,E.height=x,E.style.cssText="width:80px;height:48px";var d=E.getContext("2d");return d.font="bold "+9*p+"px Helvetica,Arial,sans-serif",d.textBaseline="top",d.fillStyle=a,d.fillRect(0,0,f,x),d.fillStyle=u,d.fillText(M,k,s),d.fillRect(m,g,T,R),d.fillStyle=a,d.globalAlpha=.9,d.fillRect(m,g,T,R),{dom:E,update:function(D,j){e=Math.min(e,D),r=Math.max(r,D),d.fillStyle=a,d.globalAlpha=1,d.fillRect(0,0,f,g),d.fillStyle=u,d.fillText(c(D)+" "+M+" ("+c(e)+"-"+c(r)+")",k,s),d.drawImage(E,m+p,g,T-p,R,m,g,T-p,R),d.fillRect(m+T-p,g,p,R),d.fillStyle=a,d.globalAlpha=.9,d.fillRect(m+T-p,g,p,c((1-D/j)*R))}}};class me extends ae{constructor(u,a={}){super(u),this.isReflector=!0,this.type="Reflector",this.camera=new Oe;const e=this,r=a.color!==void 0?new V(a.color):new V(8355711),c=a.textureWidth||512,p=a.textureHeight||512,f=a.clipBias||0,x=a.shader||me.ReflectorShader,k=a.multisample!==void 0?a.multisample:4,s=new xe,m=new b,g=new b,T=new b,R=new fe,E=new b(0,0,-1),d=new re,D=new b,j=new b,i=new re,w=new fe,l=this.camera,C=new Z(c,p,{samples:k,type:q}),y=new Q({name:x.name!==void 0?x.name:"unspecified",uniforms:J.clone(x.uniforms),fragmentShader:x.fragmentShader,vertexShader:x.vertexShader});y.uniforms.tDiffuse.value=C.texture,y.uniforms.color.value=r,y.uniforms.textureMatrix.value=w,this.material=y,this.onBeforeRender=function(h,O,_){if(g.setFromMatrixPosition(e.matrixWorld),T.setFromMatrixPosition(_.matrixWorld),R.extractRotation(e.matrixWorld),m.set(0,0,1),m.applyMatrix4(R),D.subVectors(g,T),D.dot(m)>0)return;D.reflect(m).negate(),D.add(g),R.extractRotation(_.matrixWorld),E.set(0,0,-1),E.applyMatrix4(R),E.add(T),j.subVectors(g,E),j.reflect(m).negate(),j.add(g),l.position.copy(D),l.up.set(0,1,0),l.up.applyMatrix4(R),l.up.reflect(m),l.lookAt(j),l.far=_.far,l.updateMatrixWorld(),l.projectionMatrix.copy(_.projectionMatrix),w.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),w.multiply(l.projectionMatrix),w.multiply(l.matrixWorldInverse),w.multiply(e.matrixWorld),s.setFromNormalAndCoplanarPoint(m,g),s.applyMatrix4(l.matrixWorldInverse),d.set(s.normal.x,s.normal.y,s.normal.z,s.constant);const A=l.projectionMatrix;i.x=(Math.sign(d.x)+A.elements[8])/A.elements[0],i.y=(Math.sign(d.y)+A.elements[9])/A.elements[5],i.z=-1,i.w=(1+A.elements[10])/A.elements[14],d.multiplyScalar(2/d.dot(i)),A.elements[2]=d.x,A.elements[6]=d.y,A.elements[10]=d.z+1-f,A.elements[14]=d.w,e.visible=!1;const B=h.getRenderTarget(),$=h.xr.enabled,he=h.shadowMap.autoUpdate;h.xr.enabled=!1,h.shadowMap.autoUpdate=!1,h.setRenderTarget(C),h.state.buffers.depth.setMask(!0),h.autoClear===!1&&h.clear(),h.render(O,l),h.xr.enabled=$,h.shadowMap.autoUpdate=he,h.setRenderTarget(B);const ie=_.viewport;ie!==void 0&&h.state.viewport(ie),e.visible=!0},this.getRenderTarget=function(){return C},this.dispose=function(){C.dispose(),e.material.dispose()}}}me.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};class pe extends ae{constructor(u,a={}){super(u),this.isRefractor=!0,this.type="Refractor",this.camera=new Oe;const e=this,r=a.color!==void 0?new V(a.color):new V(8355711),c=a.textureWidth||512,p=a.textureHeight||512,f=a.clipBias||0,x=a.shader||pe.RefractorShader,k=a.multisample!==void 0?a.multisample:4,s=this.camera;s.matrixAutoUpdate=!1,s.userData.refractor=!0;const m=new xe,g=new fe,T=new Z(c,p,{samples:k,type:q});this.material=new Q({name:x.name!==void 0?x.name:"unspecified",uniforms:J.clone(x.uniforms),vertexShader:x.vertexShader,fragmentShader:x.fragmentShader,transparent:!0}),this.material.uniforms.color.value=r,this.material.uniforms.tDiffuse.value=T.texture,this.material.uniforms.textureMatrix.value=g;const R=function(){const i=new b,w=new b,l=new fe,C=new b,y=new b;return function(O){return i.setFromMatrixPosition(e.matrixWorld),w.setFromMatrixPosition(O.matrixWorld),C.subVectors(i,w),l.extractRotation(e.matrixWorld),y.set(0,0,1),y.applyMatrix4(l),C.dot(y)<0}}(),E=function(){const i=new b,w=new b,l=new _e,C=new b;return function(){e.matrixWorld.decompose(w,l,C),i.set(0,0,1).applyQuaternion(l).normalize(),i.negate(),m.setFromNormalAndCoplanarPoint(i,w)}}(),d=function(){const i=new xe,w=new re,l=new re;return function(y){s.matrixWorld.copy(y.matrixWorld),s.matrixWorldInverse.copy(s.matrixWorld).invert(),s.projectionMatrix.copy(y.projectionMatrix),s.far=y.far,i.copy(m),i.applyMatrix4(s.matrixWorldInverse),w.set(i.normal.x,i.normal.y,i.normal.z,i.constant);const h=s.projectionMatrix;l.x=(Math.sign(w.x)+h.elements[8])/h.elements[0],l.y=(Math.sign(w.y)+h.elements[9])/h.elements[5],l.z=-1,l.w=(1+h.elements[10])/h.elements[14],w.multiplyScalar(2/w.dot(l)),h.elements[2]=w.x,h.elements[6]=w.y,h.elements[10]=w.z+1-f,h.elements[14]=w.w}}();function D(i){g.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),g.multiply(i.projectionMatrix),g.multiply(i.matrixWorldInverse),g.multiply(e.matrixWorld)}function j(i,w,l){e.visible=!1;const C=i.getRenderTarget(),y=i.xr.enabled,h=i.shadowMap.autoUpdate;i.xr.enabled=!1,i.shadowMap.autoUpdate=!1,i.setRenderTarget(T),i.autoClear===!1&&i.clear(),i.render(w,s),i.xr.enabled=y,i.shadowMap.autoUpdate=h,i.setRenderTarget(C);const O=l.viewport;O!==void 0&&i.state.viewport(O),e.visible=!0}this.onBeforeRender=function(i,w,l){l.userData.refractor!==!0&&R(l)&&(E(),D(l),d(l),j(i,w,l))},this.getRenderTarget=function(){return T},this.dispose=function(){T.dispose(),e.material.dispose()}}}pe.RefractorShader={name:"RefractorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`

		uniform mat4 textureMatrix;

		varying vec4 vUv;

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec3 color;
		uniform sampler2D tDiffuse;

		varying vec4 vUv;

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};class Se extends ae{constructor(u,a={}){super(u),this.isWater=!0,this.type="Water";const e=this,r=a.color!==void 0?new V(a.color):new V(16777215),c=a.textureWidth!==void 0?a.textureWidth:512,p=a.textureHeight!==void 0?a.textureHeight:512,f=a.clipBias!==void 0?a.clipBias:0,x=a.flowDirection!==void 0?a.flowDirection:new L(1,0),k=a.flowSpeed!==void 0?a.flowSpeed:.03,s=a.reflectivity!==void 0?a.reflectivity:.02,m=a.scale!==void 0?a.scale:1,g=a.shader!==void 0?a.shader:Se.WaterShader,T=new it,R=a.flowMap||void 0,E=a.normalMap0||T.load("textures/water/Water_1_M_Normal.jpg"),d=a.normalMap1||T.load("textures/water/Water_2_M_Normal.jpg"),D=.15,j=D*.5,i=new fe,w=new Dt;if(me===void 0){console.error("THREE.Water: Required component Reflector not found.");return}if(pe===void 0){console.error("THREE.Water: Required component Refractor not found.");return}const l=new me(u,{textureWidth:c,textureHeight:p,clipBias:f}),C=new pe(u,{textureWidth:c,textureHeight:p,clipBias:f});l.matrixAutoUpdate=!1,C.matrixAutoUpdate=!1,this.material=new Q({name:g.name,uniforms:J.merge([Et.fog,g.uniforms]),vertexShader:g.vertexShader,fragmentShader:g.fragmentShader,transparent:!0,fog:!0}),R!==void 0?(this.material.defines.USE_FLOWMAP="",this.material.uniforms.tFlowMap={type:"t",value:R}):this.material.uniforms.flowDirection={type:"v2",value:x},E.wrapS=E.wrapT=$e,d.wrapS=d.wrapT=$e,this.material.uniforms.tReflectionMap.value=l.getRenderTarget().texture,this.material.uniforms.tRefractionMap.value=C.getRenderTarget().texture,this.material.uniforms.tNormalMap0.value=E,this.material.uniforms.tNormalMap1.value=d,this.material.uniforms.color.value=r,this.material.uniforms.reflectivity.value=s,this.material.uniforms.textureMatrix.value=i,this.material.uniforms.config.value.x=0,this.material.uniforms.config.value.y=j,this.material.uniforms.config.value.z=j,this.material.uniforms.config.value.w=m;function y(O){i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(O.projectionMatrix),i.multiply(O.matrixWorldInverse),i.multiply(e.matrixWorld)}function h(){const O=w.getDelta(),_=e.material.uniforms.config;_.value.x+=k*O,_.value.y=_.value.x+j,_.value.x>=D?(_.value.x=0,_.value.y=j):_.value.y>=D&&(_.value.y=_.value.y-D)}this.onBeforeRender=function(O,_,A){y(A),h(),e.visible=!1,l.matrixWorld.copy(e.matrixWorld),C.matrixWorld.copy(e.matrixWorld),l.onBeforeRender(O,_,A),C.onBeforeRender(O,_,A),e.visible=!0}}}Se.WaterShader={name:"WaterShader",uniforms:{color:{type:"c",value:null},reflectivity:{type:"f",value:0},tReflectionMap:{type:"t",value:null},tRefractionMap:{type:"t",value:null},tNormalMap0:{type:"t",value:null},tNormalMap1:{type:"t",value:null},textureMatrix:{type:"m4",value:null},config:{type:"v4",value:new re}},vertexShader:`

		#include <common>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>

		uniform mat4 textureMatrix;

		varying vec4 vCoord;
		varying vec2 vUv;
		varying vec3 vToEye;

		void main() {

			vUv = uv;
			vCoord = textureMatrix * vec4( position, 1.0 );

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vToEye = cameraPosition - worldPosition.xyz;

			vec4 mvPosition =  viewMatrix * worldPosition; // used in fog_vertex
			gl_Position = projectionMatrix * mvPosition;

			#include <logdepthbuf_vertex>
			#include <fog_vertex>

		}`,fragmentShader:`

		#include <common>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>

		uniform sampler2D tReflectionMap;
		uniform sampler2D tRefractionMap;
		uniform sampler2D tNormalMap0;
		uniform sampler2D tNormalMap1;

		#ifdef USE_FLOWMAP
			uniform sampler2D tFlowMap;
		#else
			uniform vec2 flowDirection;
		#endif

		uniform vec3 color;
		uniform float reflectivity;
		uniform vec4 config;

		varying vec4 vCoord;
		varying vec2 vUv;
		varying vec3 vToEye;

		void main() {

			#include <logdepthbuf_fragment>

			float flowMapOffset0 = config.x;
			float flowMapOffset1 = config.y;
			float halfCycle = config.z;
			float scale = config.w;

			vec3 toEye = normalize( vToEye );

			// determine flow direction
			vec2 flow;
			#ifdef USE_FLOWMAP
				flow = texture2D( tFlowMap, vUv ).rg * 2.0 - 1.0;
			#else
				flow = flowDirection;
			#endif
			flow.x *= - 1.0;

			// sample normal maps (distort uvs with flowdata)
			vec4 normalColor0 = texture2D( tNormalMap0, ( vUv * scale ) + flow * flowMapOffset0 );
			vec4 normalColor1 = texture2D( tNormalMap1, ( vUv * scale ) + flow * flowMapOffset1 );

			// linear interpolate to get the final normal color
			float flowLerp = abs( halfCycle - flowMapOffset0 ) / halfCycle;
			vec4 normalColor = mix( normalColor0, normalColor1, flowLerp );

			// calculate normal vector
			vec3 normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );

			// calculate the fresnel term to blend reflection and refraction maps
			float theta = max( dot( toEye, normal ), 0.0 );
			float reflectance = reflectivity + ( 1.0 - reflectivity ) * pow( ( 1.0 - theta ), 5.0 );

			// calculate final uv coords
			vec3 coord = vCoord.xyz / vCoord.w;
			vec2 uv = coord.xy + coord.z * normal.xz * 0.05;

			vec4 reflectColor = texture2D( tReflectionMap, vec2( 1.0 - uv.x, uv.y ) );
			vec4 refractColor = texture2D( tRefractionMap, uv );

			// multiply water color with the mix of both textures
			gl_FragColor = vec4( color, 1.0 ) * mix( refractColor, reflectColor, reflectance );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>

		}`};const ot={type:"change"},De={type:"start"},nt={type:"end"},ye=new Ct,at=new xe,zt=Math.cos(70*jt.DEG2RAD);class Wt extends kt{constructor(u,a){super(),this.object=u,this.domElement=a,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new b,this.cursor=new b,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:oe.ROTATE,MIDDLE:oe.DOLLY,RIGHT:oe.PAN},this.touches={ONE:ne.ROTATE,TWO:ne.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return f.phi},this.getAzimuthalAngle=function(){return f.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",Ee),this._domElementKeyEvents=t},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ee),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(ot),e.update(),c=r.NONE},this.update=function(){const t=new b,n=new _e().setFromUnitVectors(u.up,new b(0,1,0)),v=n.clone().invert(),P=new b,U=new _e,K=new b,I=2*Math.PI;return function(Rt=null){const Qe=e.object.position;t.copy(Qe).sub(e.target),t.applyQuaternion(n),f.setFromVector3(t),e.autoRotate&&c===r.NONE&&B(_(Rt)),e.enableDamping?(f.theta+=x.theta*e.dampingFactor,f.phi+=x.phi*e.dampingFactor):(f.theta+=x.theta,f.phi+=x.phi);let G=e.minAzimuthAngle,N=e.maxAzimuthAngle;isFinite(G)&&isFinite(N)&&(G<-Math.PI?G+=I:G>Math.PI&&(G-=I),N<-Math.PI?N+=I:N>Math.PI&&(N-=I),G<=N?f.theta=Math.max(G,Math.min(N,f.theta)):f.theta=f.theta>(G+N)/2?Math.max(G,f.theta):Math.min(N,f.theta)),f.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,f.phi)),f.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(s,e.dampingFactor):e.target.add(s),e.target.sub(e.cursor),e.target.clampLength(e.minTargetRadius,e.maxTargetRadius),e.target.add(e.cursor);let le=!1;if(e.zoomToCursor&&C||e.object.isOrthographicCamera)f.radius=Te(f.radius);else{const F=f.radius;f.radius=Te(f.radius*k),le=F!=f.radius}if(t.setFromSpherical(f),t.applyQuaternion(v),Qe.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(x.theta*=1-e.dampingFactor,x.phi*=1-e.dampingFactor,s.multiplyScalar(1-e.dampingFactor)):(x.set(0,0,0),s.set(0,0,0)),e.zoomToCursor&&C){let F=null;if(e.object.isPerspectiveCamera){const ce=t.length();F=Te(ce*k);const ve=ce-F;e.object.position.addScaledVector(w,ve),e.object.updateMatrixWorld(),le=!!ve}else if(e.object.isOrthographicCamera){const ce=new b(l.x,l.y,0);ce.unproject(e.object);const ve=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/k)),e.object.updateProjectionMatrix(),le=ve!==e.object.zoom;const Je=new b(l.x,l.y,0);Je.unproject(e.object),e.object.position.sub(Je).add(ce),e.object.updateMatrixWorld(),F=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;F!==null&&(this.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(F).add(e.object.position):(ye.origin.copy(e.object.position),ye.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(ye.direction))<zt?u.lookAt(e.target):(at.setFromNormalAndCoplanarPoint(e.object.up,e.target),ye.intersectPlane(at,e.target))))}else if(e.object.isOrthographicCamera){const F=e.object.zoom;e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/k)),F!==e.object.zoom&&(e.object.updateProjectionMatrix(),le=!0)}return k=1,C=!1,le||P.distanceToSquared(e.object.position)>p||8*(1-U.dot(e.object.quaternion))>p||K.distanceToSquared(e.target)>p?(e.dispatchEvent(ot),P.copy(e.object.position),U.copy(e.object.quaternion),K.copy(e.target),!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",Ze),e.domElement.removeEventListener("pointerdown",Ye),e.domElement.removeEventListener("pointercancel",se),e.domElement.removeEventListener("wheel",Ke),e.domElement.removeEventListener("pointermove",Re),e.domElement.removeEventListener("pointerup",se),e.domElement.getRootNode().removeEventListener("keydown",Xe,{capture:!0}),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",Ee),e._domElementKeyEvents=null)};const e=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let c=r.NONE;const p=1e-6,f=new et,x=new et;let k=1;const s=new b,m=new L,g=new L,T=new L,R=new L,E=new L,d=new L,D=new L,j=new L,i=new L,w=new b,l=new L;let C=!1;const y=[],h={};let O=!1;function _(t){return t!==null?2*Math.PI/60*e.autoRotateSpeed*t:2*Math.PI/60/60*e.autoRotateSpeed}function A(t){const n=Math.abs(t*.01);return Math.pow(.95,e.zoomSpeed*n)}function B(t){x.theta-=t}function $(t){x.phi-=t}const he=function(){const t=new b;return function(v,P){t.setFromMatrixColumn(P,0),t.multiplyScalar(-v),s.add(t)}}(),ie=function(){const t=new b;return function(v,P){e.screenSpacePanning===!0?t.setFromMatrixColumn(P,1):(t.setFromMatrixColumn(P,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(v),s.add(t)}}(),ee=function(){const t=new b;return function(v,P){const U=e.domElement;if(e.object.isPerspectiveCamera){const K=e.object.position;t.copy(K).sub(e.target);let I=t.length();I*=Math.tan(e.object.fov/2*Math.PI/180),he(2*v*I/U.clientHeight,e.object.matrix),ie(2*P*I/U.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(he(v*(e.object.right-e.object.left)/e.object.zoom/U.clientWidth,e.object.matrix),ie(P*(e.object.top-e.object.bottom)/e.object.zoom/U.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function Me(t){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?k/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Ue(t){e.object.isPerspectiveCamera||e.object.isOrthographicCamera?k*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Pe(t,n){if(!e.zoomToCursor)return;C=!0;const v=e.domElement.getBoundingClientRect(),P=t-v.left,U=n-v.top,K=v.width,I=v.height;l.x=P/K*2-1,l.y=-(U/I)*2+1,w.set(l.x,l.y,1).unproject(e.object).sub(e.object.position).normalize()}function Te(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function Le(t){m.set(t.clientX,t.clientY)}function ct(t){Pe(t.clientX,t.clientX),D.set(t.clientX,t.clientY)}function Ie(t){R.set(t.clientX,t.clientY)}function ut(t){g.set(t.clientX,t.clientY),T.subVectors(g,m).multiplyScalar(e.rotateSpeed);const n=e.domElement;B(2*Math.PI*T.x/n.clientHeight),$(2*Math.PI*T.y/n.clientHeight),m.copy(g),e.update()}function dt(t){j.set(t.clientX,t.clientY),i.subVectors(j,D),i.y>0?Me(A(i.y)):i.y<0&&Ue(A(i.y)),D.copy(j),e.update()}function ft(t){E.set(t.clientX,t.clientY),d.subVectors(E,R).multiplyScalar(e.panSpeed),ee(d.x,d.y),R.copy(E),e.update()}function mt(t){Pe(t.clientX,t.clientY),t.deltaY<0?Ue(A(t.deltaY)):t.deltaY>0&&Me(A(t.deltaY)),e.update()}function pt(t){let n=!1;switch(t.code){case e.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?$(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):ee(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?$(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):ee(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?B(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):ee(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?B(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):ee(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function ze(t){if(y.length===1)m.set(t.pageX,t.pageY);else{const n=te(t),v=.5*(t.pageX+n.x),P=.5*(t.pageY+n.y);m.set(v,P)}}function We(t){if(y.length===1)R.set(t.pageX,t.pageY);else{const n=te(t),v=.5*(t.pageX+n.x),P=.5*(t.pageY+n.y);R.set(v,P)}}function Ge(t){const n=te(t),v=t.pageX-n.x,P=t.pageY-n.y,U=Math.sqrt(v*v+P*P);D.set(0,U)}function ht(t){e.enableZoom&&Ge(t),e.enablePan&&We(t)}function vt(t){e.enableZoom&&Ge(t),e.enableRotate&&ze(t)}function Ne(t){if(y.length==1)g.set(t.pageX,t.pageY);else{const v=te(t),P=.5*(t.pageX+v.x),U=.5*(t.pageY+v.y);g.set(P,U)}T.subVectors(g,m).multiplyScalar(e.rotateSpeed);const n=e.domElement;B(2*Math.PI*T.x/n.clientHeight),$(2*Math.PI*T.y/n.clientHeight),m.copy(g)}function Fe(t){if(y.length===1)E.set(t.pageX,t.pageY);else{const n=te(t),v=.5*(t.pageX+n.x),P=.5*(t.pageY+n.y);E.set(v,P)}d.subVectors(E,R).multiplyScalar(e.panSpeed),ee(d.x,d.y),R.copy(E)}function He(t){const n=te(t),v=t.pageX-n.x,P=t.pageY-n.y,U=Math.sqrt(v*v+P*P);j.set(0,U),i.set(0,Math.pow(j.y/D.y,e.zoomSpeed)),Me(i.y),D.copy(j);const K=(t.pageX+n.x)*.5,I=(t.pageY+n.y)*.5;Pe(K,I)}function yt(t){e.enableZoom&&He(t),e.enablePan&&Fe(t)}function gt(t){e.enableZoom&&He(t),e.enableRotate&&Ne(t)}function Ye(t){e.enabled!==!1&&(y.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",Re),e.domElement.addEventListener("pointerup",se)),!Tt(t)&&(Mt(t),t.pointerType==="touch"?Be(t):xt(t)))}function Re(t){e.enabled!==!1&&(t.pointerType==="touch"?St(t):wt(t))}function se(t){switch(Pt(t),y.length){case 0:e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",Re),e.domElement.removeEventListener("pointerup",se),e.dispatchEvent(nt),c=r.NONE;break;case 1:const n=y[0],v=h[n];Be({pointerId:n,pageX:v.x,pageY:v.y});break}}function xt(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case oe.DOLLY:if(e.enableZoom===!1)return;ct(t),c=r.DOLLY;break;case oe.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;Ie(t),c=r.PAN}else{if(e.enableRotate===!1)return;Le(t),c=r.ROTATE}break;case oe.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;Le(t),c=r.ROTATE}else{if(e.enablePan===!1)return;Ie(t),c=r.PAN}break;default:c=r.NONE}c!==r.NONE&&e.dispatchEvent(De)}function wt(t){switch(c){case r.ROTATE:if(e.enableRotate===!1)return;ut(t);break;case r.DOLLY:if(e.enableZoom===!1)return;dt(t);break;case r.PAN:if(e.enablePan===!1)return;ft(t);break}}function Ke(t){e.enabled===!1||e.enableZoom===!1||c!==r.NONE||(t.preventDefault(),e.dispatchEvent(De),mt(bt(t)),e.dispatchEvent(nt))}function bt(t){const n=t.deltaMode,v={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:v.deltaY*=16;break;case 2:v.deltaY*=100;break}return t.ctrlKey&&!O&&(v.deltaY*=10),v}function Xe(t){t.key==="Control"&&(O=!0,e.domElement.getRootNode().addEventListener("keyup",Ve,{passive:!0,capture:!0}))}function Ve(t){t.key==="Control"&&(O=!1,e.domElement.getRootNode().removeEventListener("keyup",Ve,{passive:!0,capture:!0}))}function Ee(t){e.enabled===!1||e.enablePan===!1||pt(t)}function Be(t){switch(qe(t),y.length){case 1:switch(e.touches.ONE){case ne.ROTATE:if(e.enableRotate===!1)return;ze(t),c=r.TOUCH_ROTATE;break;case ne.PAN:if(e.enablePan===!1)return;We(t),c=r.TOUCH_PAN;break;default:c=r.NONE}break;case 2:switch(e.touches.TWO){case ne.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;ht(t),c=r.TOUCH_DOLLY_PAN;break;case ne.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;vt(t),c=r.TOUCH_DOLLY_ROTATE;break;default:c=r.NONE}break;default:c=r.NONE}c!==r.NONE&&e.dispatchEvent(De)}function St(t){switch(qe(t),c){case r.TOUCH_ROTATE:if(e.enableRotate===!1)return;Ne(t),e.update();break;case r.TOUCH_PAN:if(e.enablePan===!1)return;Fe(t),e.update();break;case r.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;yt(t),e.update();break;case r.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;gt(t),e.update();break;default:c=r.NONE}}function Ze(t){e.enabled!==!1&&t.preventDefault()}function Mt(t){y.push(t.pointerId)}function Pt(t){delete h[t.pointerId];for(let n=0;n<y.length;n++)if(y[n]==t.pointerId){y.splice(n,1);return}}function Tt(t){for(let n=0;n<y.length;n++)if(y[n]==t.pointerId)return!0;return!1}function qe(t){let n=h[t.pointerId];n===void 0&&(n=new L,h[t.pointerId]=n),n.set(t.pageX,t.pageY)}function te(t){const n=t.pointerId===y[0]?y[1]:y[0];return h[n]}e.domElement.addEventListener("contextmenu",Ze),e.domElement.addEventListener("pointerdown",Ye),e.domElement.addEventListener("pointercancel",se),e.domElement.addEventListener("wheel",Ke,{passive:!1}),e.domElement.getRootNode().addEventListener("keydown",Xe,{passive:!0,capture:!0}),this.update()}}const Gt={name:"GodRaysDepthMaskShader",uniforms:{tInput:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

		 vUv = uv;
		 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	 }`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tInput;

		void main() {

			gl_FragColor = vec4( 1.0 ) - texture2D( tInput, vUv );

		}`},Nt={name:"GodRaysGenerateShader",uniforms:{tInput:{value:null},fStepSize:{value:1},vSunPositionScreenSpace:{value:new b}},vertexShader:`

		varying vec2 vUv;

		void main() {

		 vUv = uv;
		 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	 }`,fragmentShader:`

		#define TAPS_PER_PASS 6.0

		varying vec2 vUv;

		uniform sampler2D tInput;

		uniform vec3 vSunPositionScreenSpace;
		uniform float fStepSize; // filter step size

		void main() {

		// delta from current pixel to "sun" position

			vec2 delta = vSunPositionScreenSpace.xy - vUv;
			float dist = length( delta );

		// Step vector (uv space)

			vec2 stepv = fStepSize * delta / dist;

		// Number of iterations between pixel and sun

			float iters = dist/fStepSize;

			vec2 uv = vUv.xy;
			float col = 0.0;

		// This breaks ANGLE in Chrome 22
		//	- see http://code.google.com/p/chromium/issues/detail?id=153105

		/*
		// Unrolling didnt do much on my hardware (ATI Mobility Radeon 3450),
		// so i've just left the loop

		"for ( float i = 0.0; i < TAPS_PER_PASS; i += 1.0 ) {",

		// Accumulate samples, making sure we dont walk past the light source.

		// The check for uv.y < 1 would not be necessary with "border" UV wrap
		// mode, with a black border color. I don't think this is currently
		// exposed by three.js. As a result there might be artifacts when the
		// sun is to the left, right or bottom of screen as these cases are
		// not specifically handled.

		"	col += ( i <= iters && uv.y < 1.0 ? texture2D( tInput, uv ).r : 0.0 );",
		"	uv += stepv;",

		"}",
		*/

		// Unrolling loop manually makes it work in ANGLE

			float f = min( 1.0, max( vSunPositionScreenSpace.z / 1000.0, 0.0 ) ); // used to fade out godrays

			if ( 0.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r * f;
			uv += stepv;

			if ( 1.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r * f;
			uv += stepv;

			if ( 2.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r * f;
			uv += stepv;

			if ( 3.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r * f;
			uv += stepv;

			if ( 4.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r * f;
			uv += stepv;

			if ( 5.0 <= iters && uv.y < 1.0 ) col += texture2D( tInput, uv ).r * f;
			uv += stepv;

		// Should technically be dividing by 'iters but 'TAPS_PER_PASS' smooths out
		// objectionable artifacts, in particular near the sun position. The side
		// effect is that the result is darker than it should be around the sun, as
		// TAPS_PER_PASS is greater than the number of samples actually accumulated.
		// When the result is inverted (in the shader 'godrays_combine this produces
		// a slight bright spot at the position of the sun, even when it is occluded.

			gl_FragColor = vec4( col/TAPS_PER_PASS );
			gl_FragColor.a = 1.0;

		}`},Ft={name:"GodRaysCombineShader",uniforms:{tColors:{value:null},tGodRays:{value:null},fGodRayIntensity:{value:.69}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tColors;
		uniform sampler2D tGodRays;

		uniform float fGodRayIntensity;

		void main() {

		// Since THREE.MeshDepthMaterial renders foreground objects white and background
		// objects black, the god-rays will be white streaks. Therefore value is inverted
		// before being combined with tColors

			gl_FragColor = texture2D( tColors, vUv ) + fGodRayIntensity * vec4( 1.0 - texture2D( tGodRays, vUv ).r );
			gl_FragColor.a = 1.0;

		}`},Ht={name:"GodRaysFakeSunShader",uniforms:{vSunPositionScreenSpace:{value:new b},fAspect:{value:1},sunColor:{value:new V(16772608)},bgColor:{value:new V(0)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		varying vec2 vUv;

		uniform vec3 vSunPositionScreenSpace;
		uniform float fAspect;

		uniform vec3 sunColor;
		uniform vec3 bgColor;

		void main() {

			vec2 diff = vUv - vSunPositionScreenSpace.xy;

		// Correct for aspect ratio

			diff.x *= fAspect;

			float prop = clamp( length( diff ) / 0.5, 0.0, 1.0 );
			prop = 0.35 * pow( 1.0 - prop, 3.0 );

			gl_FragColor.xyz = ( vSunPositionScreenSpace.z > 0.0 ) ? mix( sunColor, bgColor, 1.0 - prop ) : bgColor;
			gl_FragColor.w = 1.0;

		}`};let ge,we,Y,X,S,lt,de,W;const Ce=new b(0,1e3,-1e3),z=new re,H=new b,o={enabled:!0},rt=200,Yt=34884,Kt=15658734,be=1/4;Xt();function Xt(){ge=document.createElement("div"),document.body.appendChild(ge),Y=new Oe(70,window.innerWidth/window.innerHeight,1,3e3),Y.position.z=200,X=new st,lt=new _t,new At().load(["./skybox/milkyway/dark-s_px.jpg","./skybox/milkyway/dark-s_nx.jpg","./skybox/milkyway/dark-s_py.jpg","./skybox/milkyway/dark-s_ny.jpg","./skybox/milkyway/dark-s_pz.jpg","./skybox/milkyway/dark-s_nz.jpg"]);const a=new it().load("./water.png"),e=new tt({map:a,transparent:!0,opacity:.5}),r=new Ae(200,200);new ae(r,e).position.set(0,50,100),new It().load("./animated_kelp.glb",function(s){const m=s.scene;m.position.set(0,-1,0),m.scale.set(100,100,100),X.add(m)},void 0,function(s){console.error("An error occurred while loading the GLB file:",s)});const f=new Ot(1,20,10);de=new ae(f,new tt({color:0})),de.scale.multiplyScalar(20),X.add(de),S=new Ut,S.setClearColor(16777215),S.setPixelRatio(window.devicePixelRatio),S.setSize(window.innerWidth,window.innerHeight),S.setAnimationLoop(Zt),ge.appendChild(S.domElement),S.autoClear=!1;const x=new Wt(Y,S.domElement);x.minDistance=50,x.maxDistance=500,we=new ue,ge.appendChild(we.dom);const k=new Ae(20,20);W=new Se(k,{color:255,scale:1,flowDirection:new L(.5,.5),textureWidth:1024,textureHeight:1024}),W.position.y=40,W.rotation.x=Math.PI*.5,W.material.uniforms.color.value.set(255),W.material.uniforms.config.value.w=100,W.material.uniforms.flowDirection.value.x=.5,W.material.uniforms.flowDirection.value.normalize(),W.material.uniforms.flowDirection.value.y=.5,W.material.uniforms.flowDirection.value.normalize(),X.add(W),window.addEventListener("resize",Vt),Bt(window.innerWidth,window.innerHeight)}function Vt(){const M=window.innerWidth,u=window.innerHeight;Y.aspect=M/u,Y.updateProjectionMatrix(),S.setSize(M,u),o.rtTextureColors.setSize(M,u),o.rtTextureDepth.setSize(M,u),o.rtTextureDepthMask.setSize(M,u);const a=M*be,e=u*be;o.rtTextureGodRays1.setSize(a,e),o.rtTextureGodRays2.setSize(a,e)}function Bt(M,u){o.scene=new st,o.camera=new Lt(-.5,.5,.5,-.5,-1e4,1e4),o.camera.position.z=10,o.scene.add(o.camera),o.rtTextureColors=new Z(M,u,{type:q}),o.rtTextureDepth=new Z(M,u,{type:q}),o.rtTextureDepthMask=new Z(M,u,{type:q});const a=M*be,e=u*be;o.rtTextureGodRays1=new Z(a,e,{type:q}),o.rtTextureGodRays2=new Z(a,e,{type:q});const r=Gt;o.godrayMaskUniforms=J.clone(r.uniforms),o.materialGodraysDepthMask=new Q({uniforms:o.godrayMaskUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader});const c=Nt;o.godrayGenUniforms=J.clone(c.uniforms),o.materialGodraysGenerate=new Q({uniforms:o.godrayGenUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader});const p=Ft;o.godrayCombineUniforms=J.clone(p.uniforms),o.materialGodraysCombine=new Q({uniforms:o.godrayCombineUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader});const f=Ht;o.godraysFakeSunUniforms=J.clone(f.uniforms),o.materialGodraysFakeSun=new Q({uniforms:o.godraysFakeSunUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader}),o.godraysFakeSunUniforms.bgColor.value.setHex(Yt),o.godraysFakeSunUniforms.sunColor.value.setHex(Kt),o.godrayCombineUniforms.fGodRayIntensity.value=.75,o.quad=new ae(new Ae(1,1),o.materialGodraysGenerate),o.quad.position.z=-9900,o.scene.add(o.quad)}function Zt(){we.begin(),qt(),we.end()}function ke(M,u,a){return M*Math.pow(u,-a)}function je(M,u,a){o.scene.overrideMaterial=o.materialGodraysGenerate,o.godrayGenUniforms.fStepSize.value=a,o.godrayGenUniforms.tInput.value=M,S.setRenderTarget(u),S.render(o.scene,o.camera),o.scene.overrideMaterial=null}function qt(){const M=Date.now()/4e3;de.position.x=rt*Math.cos(M),de.position.z=rt*Math.sin(M)-100;{z.x=Ce.x,z.y=Ce.y,z.z=Ce.z,z.w=1,z.applyMatrix4(Y.matrixWorldInverse).applyMatrix4(Y.projectionMatrix),z.x/=z.w,z.y/=z.w,H.x=(z.x+1)/2,H.y=(z.y+1)/2,H.z=z.z,o.godrayGenUniforms.vSunPositionScreenSpace.value.copy(H),o.godraysFakeSunUniforms.vSunPositionScreenSpace.value.copy(H),S.setRenderTarget(o.rtTextureColors),S.clear(!0,!0,!1);const u=.74*window.innerHeight,a=.74*window.innerHeight;H.x*=window.innerWidth,H.y*=window.innerHeight,S.setScissor(H.x-a/2,H.y-u/2,a,u),S.setScissorTest(!0),o.godraysFakeSunUniforms.fAspect.value=window.innerWidth/window.innerHeight,o.scene.overrideMaterial=o.materialGodraysFakeSun,S.setRenderTarget(o.rtTextureColors),S.render(o.scene,o.camera),S.setScissorTest(!1),X.overrideMaterial=null,S.setRenderTarget(o.rtTextureColors),S.render(X,Y),X.overrideMaterial=lt,S.setRenderTarget(o.rtTextureDepth),S.clear(),S.render(X,Y),o.godrayMaskUniforms.tInput.value=o.rtTextureDepth.texture,o.scene.overrideMaterial=o.materialGodraysDepthMask,S.setRenderTarget(o.rtTextureDepthMask),S.render(o.scene,o.camera);const e=1,r=6;je(o.rtTextureDepthMask.texture,o.rtTextureGodRays2,ke(e,r,1)),je(o.rtTextureGodRays2.texture,o.rtTextureGodRays1,ke(e,r,2)),je(o.rtTextureGodRays1.texture,o.rtTextureGodRays2,ke(e,r,3)),o.godrayCombineUniforms.tColors.value=o.rtTextureColors.texture,o.godrayCombineUniforms.tGodRays.value=o.rtTextureGodRays2.texture,o.scene.overrideMaterial=o.materialGodraysCombine,S.setRenderTarget(null),S.render(o.scene,o.camera),o.scene.overrideMaterial=null}}
