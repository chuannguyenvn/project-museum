(()=>{"use strict";var t,e={796:(t,e,s)=>{var i,n=s(260),a=s.n(n);!function(t){t.WELCOME="welcome-scene",t.LEVEL_SELECTION="level-selection-scene",t.PLAY="play-scene"}(i||(i={}));const o=i;var r;!function(t){t.LEVEL_DATA="level-data"}(r||(r={}));const l=r,h=JSON.parse('[{"levelNumber":1,"levelSize":{"x":10,"y":10},"wallLayout":[],"cornerLayout":[],"paintingLayout":[{"position":{"x":5,"y":0},"size":{"x":2,"y":0},"color":"ff0000"}],"wallColor":"2b313d","groundColor":"0a0d12"},{"levelNumber":2,"levelSize":{"x":12,"y":5},"wallLayout":[],"cornerLayout":[],"paintingLayout":[{"position":{"x":4,"y":0},"size":{"x":2,"y":0},"color":"ff0000"},{"position":{"x":8,"y":0},"size":{"x":2,"y":0},"color":"ff0000"}],"wallColor":"2b313d","groundColor":"0a0d12"},{"levelNumber":3,"levelSize":{"x":16,"y":8},"wallLayout":[],"cornerLayout":[],"paintingLayout":[{"position":{"x":4,"y":0},"size":{"x":2,"y":0},"color":"ff0000"},{"position":{"x":8,"y":0},"size":{"x":2,"y":0},"color":"ff0000"},{"position":{"x":12,"y":0},"size":{"x":2,"y":0},"color":"ff0000"}],"wallColor":"2b313d","groundColor":"0a0d12"},{"levelNumber":4,"levelSize":{"x":16,"y":6},"wallLayout":[[{"x":0,"y":0},{"x":0,"y":1},{"x":1,"y":0},{"x":1,"y":1},{"x":2,"y":0},{"x":2,"y":1},{"x":3,"y":0},{"x":3,"y":1},{"x":0,"y":2},{"x":0,"y":3},{"x":1,"y":2},{"x":1,"y":3}]],"cornerLayout":[[{"x":0,"y":4},{"x":2,"y":4},{"x":2,"y":2},{"x":4,"y":2},{"x":4,"y":0},{"x":0,"y":0}]],"paintingLayout":[{"position":{"x":4,"y":1},"size":{"x":0,"y":2},"color":"ff0000"},{"position":{"x":2,"y":3},"size":{"x":0,"y":2},"color":"ff0000"},{"position":{"x":0,"y":5},"size":{"x":0,"y":2},"color":"ff0000"}],"wallColor":"2b313d","groundColor":"0a0d12"},{"levelNumber":5,"levelSize":{"x":8,"y":8},"wallLayout":[[{"x":5,"y":5},{"x":6,"y":5},{"x":5,"y":6},{"x":6,"y":6}]],"cornerLayout":[[{"x":5,"y":5},{"x":5,"y":7},{"x":7,"y":7},{"x":7,"y":5}]],"paintingLayout":[{"position":{"x":6,"y":5},"size":{"x":2,"y":0},"color":"ff0000"},{"position":{"x":5,"y":6},"size":{"x":0,"y":2},"color":"ff0000"}],"wallColor":"2b313d","groundColor":"0a0d12"}]');var c;!function(t){t.LIGHT="light",t.DEFAULT_BUTTON="place-button",t.SQUARE="square"}(c||(c={}));const y=c,u={[l.LEVEL_DATA]:h,[y.LIGHT]:"../../assets/images/Light.png",[y.DEFAULT_BUTTON]:"../../assets/images/Place Button.png",[y.SQUARE]:"../../assets/images/Square.png"};class g{constructor(){this._eventCallbacks=[]}subscribe(t){this._eventCallbacks.push(t)}unsubscribe(t){this._eventCallbacks=this._eventCallbacks.filter((e=>e!==t))}invoke(){for(const t of this._eventCallbacks)t()}}var d=Phaser.GameObjects.NineSlice,x=Phaser.Display.Color,p=Phaser.Math.Vector2;const w=class extends d{constructor(t,e=y.DEFAULT_BUTTON){super(t,0,0,e,void 0,136,136,15,15,15,15),this.clicked=new g,this.pointerOverTint=new x(225,225,225),this.pointerOutTint=new x(255,255,255),this.pointerDownTint=new x(160,160,160),this.anchor=new p(.5,.5),this.pivot=new p(.5,.5),this.offset=new p(0,0),t.add.existing(this),this.setInteractive(),this.setTintFill(this.pointerOutTint.color),this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,(()=>this.setTintFill(this.pointerDownTint.color))),this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,(()=>{this.clicked.invoke(),this.setTintFill(this.pointerOverTint.color)})),this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,(()=>this.setTintFill(this.pointerOverTint.color))),this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,(()=>this.setTintFill(this.pointerOutTint.color))),this.depth=1e4,addEventListener("resize",(t=>{this.handleWindowSizeChange()})),this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,(()=>{this.clicked.invoke()})),this.text=this.scene.add.text(this.x,this.y,"Text"),this.text.setColor("0x000000"),this.text.setOrigin(.5,.5),this.text.depth=10001,this.setAnchor(.5,.5),this.setPivot(.5,.5)}setAnchor(t,e){this.anchor=new p(t,e);const s=this.scene.cameras.main;this.x=s.midPoint.x+s.displayWidth*(t-.5),this.y=s.midPoint.y+s.displayHeight*(e-.5),this.adjustText()}setPivot(t,e){this.pivot=new p(t,e),this.setOrigin(t,e),this.adjustText()}setOffset(t,e){this.offset=new p(t,e),this.x+=t,this.y+=e,this.adjustText()}handleWindowSizeChange(){this.setAnchor(this.anchor.x,this.anchor.y),this.setPivot(this.pivot.x,this.pivot.y),this.setOffset(this.offset.x,this.offset.y)}adjustText(){if(this.getCenter()){const t=this.getCenter();this.text.x=t.x,this.text.y=t.y}}},v=class extends w{constructor(t,e,s=y.DEFAULT_BUTTON){super(t,s),this.levelSelectionScene=t,this.text.setFill(16711680)}};class L extends n.Scene{constructor(){super({key:o.LEVEL_SELECTION})}create(){for(let t=0;t<u[l.LEVEL_DATA].length;t++){const e=new v(this,t+1);e.setOffset(200*t-500,0),e.clicked.subscribe((()=>{this.changeToPlayScene(t)}))}}changeToPlayScene(t){this.scene.stop(o.LEVEL_SELECTION),this.scene.start(o.PLAY,{selectedLevelIndex:t})}}const f=L;var P;!function(t){t.WALL="wall",t.LIGHT="light",t.BOUNDARY="boundary"}(P||(P={}));const E=P,b=50,T=45,C=20,m=.001;var O=Phaser.Math.Vector2;const A=class{static ToVector2(t){return new O(t.x,t.y)}};class S{constructor(t){this.array=t}toArray(){return this.array}all(t){for(let e=0;e<this.array.length;e++)if(!t(this.array[e]))return!1;return!0}any(t){return this.array.some(((e,s,i)=>t(e)))}concat(t){return new S(this.array.concat(t.array))}first(t){return this.array.find(((e,s,i)=>t(e)))}orderByAscending(t){return new S(this.array.sort(((e,s)=>t(e)>t(s)?1:-1)))}orderByDescending(t){return new S(this.array.sort(((e,s)=>t(e)>t(s)?-1:1)))}select(t){const e=[];for(let s=0;s<this.array.length;s++)e.push(t(this.array[s]));return new S(e)}where(t){return new S(this.array.filter(((e,s,i)=>t(e))))}}const z=function(t){return new S(JSON.parse(JSON.stringify(t)))};var _=Phaser.GameObjects.GameObject,M=Phaser.Math.Vector2,D=Phaser.Display.Color;const k=class extends _{constructor(t,e,s,i){super(t,E.WALL),this.worldCellPositions=[],this.worldCornerPositions=[],t.add.existing(this),this.normalizedCellPositions=z(e).select(A.ToVector2).toArray(),this.normalizedCornerPositions=z(s).select(A.ToVector2).toArray(),this.worldCellPositions=z(e).select((t=>new M(t.x*b,t.y*b))).toArray(),this.worldCornerPositions=z(s).select((t=>new M(t.x*b,t.y*b))).toArray(),this.wallPolygon=t.add.polygon(0,0,this.worldCornerPositions,D.HexStringToColor(i).color),this.wallPolygon.setOrigin(0,0),this.wallPolygon.setDepth(9999);for(let t=0;t<this.worldCellPositions.length;t++)this.scene.matter.add.rectangle(this.worldCellPositions[t].x+b/2,this.worldCellPositions[t].y+b/2,b,b,{isStatic:!0})}};class R{constructor(t,e,s){this.state=t,this.guid=e,this.callback=s}}var I=Phaser.Math.Vector3;const B=class{static DegreeAngleBetween(t,e){const s=t.clone(),i=e.clone();return Math.acos((s.x*i.x+s.y*i.y)/(t.length()*e.length()))*Phaser.Math.RAD_TO_DEG}static SignedDegreeAngleBetween(t,e){const s=t.clone(),i=e.clone(),n=Math.acos((s.x*i.x+s.y*i.y)/(t.length()*e.length()))*Phaser.Math.RAD_TO_DEG,a=new I(0,0,s.x*i.y-i.x*s.y);return I.FORWARD.clone().dot(a)<0?n:-n}static IsPointBetween(t,e,s){const i=Phaser.Math.Distance.BetweenPoints(e,s),n=Phaser.Math.Distance.BetweenPoints(t,e),a=Phaser.Math.Distance.BetweenPoints(t,s);return Math.abs(n+a-i)<Phaser.Math.EPSILON}static clampLength(t,e){return(t=t.clone()).length()>e&&(t=t.scale(t.length()/e)),t}};var U=a().GameObjects.Polygon,N=a().Math.Vector2;const G=class extends U{constructor(t,e){super(t,0,0,[new N(0,0)],15658734),this.scene.add.existing(this),this.playScene=t,this.setOrigin(0,0),this.setAlpha(.5),this.setDepth(100),this.on(a().Input.Events.GAMEOBJECT_POINTER_DOWN,(()=>{e.stateMachine.changeState(V.Rotating);const s=t.input.activePointer.position.clone(),i=t.cameras.main.getWorldPoint(s.x,s.y).clone().subtract(new N(e.x,e.y)).normalize();e.directionAngleOffset=B.SignedDegreeAngleBetween(e.direction,i)}))}changeShape(t){this.setInteractive(new(a().Geom.Polygon)(t),a().Geom.Polygon.Contains),this.setTo(t)}};var V,W=a().Math.Vector2,F=a().Physics.Matter.Sprite;class j extends F{constructor(t){super(t.matter.world,0,0,y.LIGHT),this.stateMachine=new class{constructor(t){this.onEntryCallbacks=[],this.onExitCallbacks=[],this._currentState=t}get currentState(){return this._currentState}changeState(t){if(this._currentState!==t){for(let t=0;t<this.onExitCallbacks.length;t++)this.onExitCallbacks[t].state===this._currentState&&this.onExitCallbacks[t].callback();for(let e=0;e<this.onEntryCallbacks.length;e++)this.onEntryCallbacks[e].state===t&&this.onEntryCallbacks[e].callback();this._currentState=t}}configure(t){return this.configuringState=t,this}onEntry(t,e){return this.onEntryCallbacks.push(new R(this.configuringState,t,e)),this}onExit(t,e){return this.onExitCallbacks.push(new R(this.configuringState,t,e)),this}removeAllOf(t){this.onEntryCallbacks.filter((e=>e.guid===t)),this.onExitCallbacks.filter((e=>e.guid===t))}}(V.Init),this.direction=new W,this.directionAngleOffset=0,this.raycastLines=[],this.raycastArc=[],t.add.existing(this),this.scene=t,this.stateMachine.changeState(V.Moving),this.scale=.1,a().Math.RandomXY(this.direction),this.lightArea=new G(this.scene,this),this.setCircle(10),this.setFixedRotation(),this.setInteractive(),this.scene.input.setDraggable(this),this.on(a().Input.Events.GAMEOBJECT_DRAG_START,(()=>{this.stateMachine.changeState(V.Moving)})),this.setPosition(100,100),this.stateMachine.configure(V.Idle).onEntry(-1,(()=>this.setVelocity(0,0)))}handlePointerUp(){switch(this.stateMachine.currentState){case V.Moving:case V.Rotating:this.stateMachine.changeState(V.Idle)}}update(t){switch(this.stateMachine.currentState){case V.Moving:const e=B.clampLength(new W(t.x-this.x,t.y-this.y),1e3);this.setVelocity(e.x,e.y),this.castLight();break;case V.Rotating:this.direction=t.clone().subtract(new W(this.x,this.y)).normalize().rotate(this.directionAngleOffset*a().Math.DEG_TO_RAD),this.setVelocity(0,0),this.castLight()}}castLight(){this.resetDebugVisuals(),this.calculatePosition(),this.castAgainstWalls(),this.castAgainstPaintings()}raycast(t,e){const s=new W(Math.sqrt(1+e.y/e.x*(e.y/e.x)),Math.sqrt(1+e.x/e.y*(e.x/e.y))),i=new W(Math.floor(t.x),Math.floor(t.y)),n=new W(0,0),a=new W(0,0);e.x>0?(n.x=1,a.x=(i.x+1-t.x)*s.x):(n.x=-1,a.x=(t.x-i.x)*s.x),e.y>0?(n.y=1,a.y=(i.y+1-t.y)*s.y):(n.y=-1,a.y=(t.y-i.y)*s.y);let o=0;for(;a.x<1e4&&a.y<1e4&&(a.x<a.y?(i.x+=n.x,o=a.x,a.x+=s.x):(i.y+=n.y,o=a.y,a.y+=s.y),i.x>=0&&i.x<this.scene.currentLevel.levelSize.x&&i.y>=0&&i.y<this.scene.currentLevel.levelSize.y);)if(this.scene.blockFlags[i.x][i.y]){new W(t.x,t.y);const s=t.add(e.scale(o));return new W(s.x*b,s.y*b)}return new W((1e3*e.x+t.x)*b,(1e3*e.y+t.y)*b)}resetDebugVisuals(){this.raycastLines.forEach((t=>t.destroy())),this.raycastLines=[],this.raycastArc.forEach((t=>t.destroy())),this.raycastArc=[]}calculatePosition(){this.normalizedPosition=new W(this.x/b,this.y/b)}castAgainstWalls(){const t=z(this.scene.allWorldCorners).select(A.ToVector2).where((t=>{const e=t.clone().subtract(new W(this.x,this.y)).normalize(),s=B.DegreeAngleBetween(new W(this.direction.x,this.direction.y),e);return Math.abs(s)<T/2})).toArray();let e=[];for(let s=0;s<t.length;s++){const i=t[s],n=t[(s+1)%t.length],a=m;if(i.y===n.y){const t=new W(i.x-this.x-a,i.y-this.y-a).normalize(),s=new W(i.x-this.x+a,i.y-this.y+a).normalize();e.push(this.raycast(this.normalizedPosition.clone(),t)),e.push(this.raycast(this.normalizedPosition.clone(),s))}else{const t=new W(i.x-this.x+a,i.y-this.y-a).normalize(),s=new W(i.x-this.x-a,i.y-this.y+a).normalize();e.push(this.raycast(this.normalizedPosition.clone(),t)),e.push(this.raycast(this.normalizedPosition.clone(),s))}}e=z(e).select(A.ToVector2).orderByAscending((t=>B.DegreeAngleBetween(t.clone().subtract(new W(this.x,this.y)),this.direction.clone().rotate(a().Math.DEG_TO_RAD*T/2)))).toArray(),e.unshift(this.raycast(this.normalizedPosition.clone(),this.direction.clone().rotate(a().Math.DEG_TO_RAD*T/2))),e.push(this.raycast(this.normalizedPosition.clone(),this.direction.clone().rotate(-a().Math.DEG_TO_RAD*T/2))),e.push(new W(this.x,this.y)),this.lightArea.destroy(),this.lightArea=new G(this.scene,this),this.lightArea.changeShape(e)}castAgainstPaintings(){for(let t=0;t<this.scene.allPaintings.length;t++){let e=!0;const s=this.scene.allPaintings[t];for(let t=0;t<s.paintingRaycastPoints.length;t++){const i=s.paintingRaycastPoints[t].clone(),n=i.clone().subtract(new W(this.x,this.y)).normalize(),a=B.DegreeAngleBetween(new W(this.direction.x,this.direction.y),n);if(Math.abs(a)>T/2){e=!1;break}const o=this.raycast(this.normalizedPosition.clone(),n);if(o.clone().subtract(i.clone()).length()>m&&o.length()<1e4){e=!1;break}}s.setLightStatus(e)}}drawRay(t,e){this.raycastLines.push(this.scene.add.line(0,0,t.x,t.y,e.x,e.y,16777215).setOrigin(0,0)),this.raycastArc.push(this.scene.add.arc(e.x,e.y,5,0,359,!1,16711680).setDepth(100))}}!function(t){t[t.Init=0]="Init",t[t.Moving=1]="Moving",t[t.Rotating=2]="Rotating",t[t.Idle=3]="Idle"}(V||(V={}));var H=Phaser.Display.Color,J=Phaser.GameObjects.Rectangle,Y=Phaser.Math.Vector2;const q=class extends J{constructor(t,e,s,i){if(super(t,e.x*b,e.y*b,0===s.x?C:s.x*b,0===s.y?C:s.y*b,i.color),this.paintingRaycastPoints=[],this.isFullyLit=!0,this.scene.add.existing(this),this.playScene=t,0===s.x){const t=e.subtract(new Y(0,s.y/2));for(let e=0;e<=s.y;e++)this.paintingRaycastPoints.push(t.clone().add(new Y(0,e)).scale(b));this.paintingRaycastPoints[0].y+=m,this.paintingRaycastPoints[this.paintingRaycastPoints.length-1].y-=m}else{const t=e.subtract(new Y(s.x/2,0));for(let e=0;e<=s.x;e++)this.paintingRaycastPoints.push(t.clone().add(new Y(e,0)).scale(b));this.paintingRaycastPoints[0].x+=m,this.paintingRaycastPoints[this.paintingRaycastPoints.length-1].x-=m}this.setDepth(1e3),this.setLightStatus(!1)}setLightStatus(t){this.isFullyLit!==t&&(t?(this.fillColor=new H(255,0,0).color,this.playScene.paintingLit.invoke()):(this.fillColor=new H(0,0,0).color,this.playScene.paintingUnlit.invoke()),this.isFullyLit=t)}};var Q=Phaser.GameObjects.GameObject,X=Phaser.GameObjects.Rectangle,Z=Phaser.Display.Color;const K=class extends Q{constructor(t,e,s){super(t,E.BOUNDARY),this.walls=[];const i=Z.HexStringToColor(s).color;this.walls.push(new X(t,-5e3,0,1e4,1e5,i)),this.walls.push(new X(t,0,-5e3,1e5,1e4,i)),this.walls.push(new X(t,0,e.y*b+5e3,1e5,1e4,i)),this.walls.push(new X(t,e.x*b+5e3,0,1e4,1e5,i));for(let e=0;e<this.walls.length;e++)this.walls[e].depth=5e3,t.add.existing(this.walls[e]),t.matter.add.rectangle(this.walls[e].x,this.walls[e].y,this.walls[e].width,this.walls[e].height)}};var $=a().Display.Color;class tt extends a().Scene{constructor(){super({key:o.PLAY}),this.paintingLit=new g,this.paintingUnlit=new g,this.gameWon=new g,this.paintingUnlitCount=0}update(t,e){const s=this.input.activePointer.position.clone();this.light.update(this.cameras.main.getWorldPoint(s.x,s.y))}init(t){this.currentLevel=u[l.LEVEL_DATA][t.selectedLevelIndex]}preload(){this.load.image(y.LIGHT,u[y.LIGHT]),this.load.image(y.DEFAULT_BUTTON,u[y.DEFAULT_BUTTON]),this.load.image(y.SQUARE,u[y.SQUARE])}create(){this.adjustCamera(),this.initializePhysics(),this.initializeWallsAndBoundaries(),this.initializePaintings(),this.initializeLights(),this.initializeEvents()}adjustCamera(){this.cameras.main.zoom=1,this.cameras.main.centerOn(this.currentLevel.levelSize.x*b/2,this.currentLevel.levelSize.y*b/2),this.cameras.main.backgroundColor=$.HexStringToColor(this.currentLevel.groundColor)}initializePhysics(){this.matter.world.setBounds(0,0,this.currentLevel.levelSize.x*b,this.currentLevel.levelSize.y*b,1e4)}initializeWallsAndBoundaries(){this.allBlocks=[],this.allWorldCorners=[],this.blockFlags=[];for(let t=0;t<this.currentLevel.levelSize.x;t++){this.blockFlags.push([]);for(let e=0;e<this.currentLevel.levelSize.y;e++)this.blockFlags[t].push(!1)}for(let t=0;t<this.currentLevel.wallLayout.length;t++){const e=new k(this,this.currentLevel.wallLayout[t],this.currentLevel.cornerLayout[t],this.currentLevel.wallColor);this.allBlocks.push(e),this.allWorldCorners=this.allWorldCorners.concat(e.worldCornerPositions);for(let e=0;e<this.currentLevel.wallLayout[t].length;e++){const s=this.currentLevel.wallLayout[t][e];this.blockFlags[s.x][s.y]=!0}}this.boundary=new K(this,A.ToVector2(this.currentLevel.levelSize),this.currentLevel.wallColor)}initializePaintings(){this.allPaintings=[];for(let t=0;t<this.currentLevel.paintingLayout.length;t++){const e=A.ToVector2(this.currentLevel.paintingLayout[t].position),s=A.ToVector2(this.currentLevel.paintingLayout[t].size),i=new q(this,e,s,new $(255,0,0));this.allPaintings.push(i)}this.paintingUnlitCount=this.currentLevel.paintingLayout.length}initializeLights(){this.light=new j(this),this.light.setPosition(100,100)}initializeEvents(){this.input.on(a().Input.Events.POINTER_UP,(()=>{this.light.handlePointerUp()})),this.paintingLit.subscribe(this.paintingLitHandler.bind(this)),this.paintingUnlit.subscribe(this.paintingUnlitHandler.bind(this)),this.gameWon.subscribe(this.gameWonHandler.bind(this))}paintingLitHandler(){this.paintingUnlitCount--,0===this.paintingUnlitCount&&this.gameWon.invoke()}paintingUnlitHandler(){this.paintingUnlitCount++}gameWonHandler(){console.log("WON")}}const et=tt,st=class extends w{constructor(t){super(t),this.welcomeScene=t,this.setSize(200,200),this.setAnchor(.5,1),this.setPivot(.5,1),this.setOffset(0,-100),this.text.text="Play"}};class it extends n.Scene{constructor(){super({key:o.WELCOME})}create(){new st(this).clicked.subscribe(this.changeToLevelSelectionScene.bind(this))}changeToLevelSelectionScene(){this.scene.stop(o.WELCOME),this.scene.start(o.LEVEL_SELECTION)}}const nt=it,at={title:"Project Museum",width:960,height:540,parent:"game",scale:{mode:a().Scale.RESIZE},scene:[nt,f,et],backgroundColor:1118481,physics:{default:"matter",matter:{gravity:{x:0,y:0}}}};class ot extends a().Game{constructor(t){super(t)}}window.addEventListener("load",(()=>{new ot(at)}))}},s={};function i(t){var n=s[t];if(void 0!==n)return n.exports;var a=s[t]={exports:{}};return e[t].call(a.exports,a,a.exports,i),a.exports}i.m=e,t=[],i.O=(e,s,n,a)=>{if(!s){var o=1/0;for(c=0;c<t.length;c++){for(var[s,n,a]=t[c],r=!0,l=0;l<s.length;l++)(!1&a||o>=a)&&Object.keys(i.O).every((t=>i.O[t](s[l])))?s.splice(l--,1):(r=!1,a<o&&(o=a));if(r){t.splice(c--,1);var h=n();void 0!==h&&(e=h)}}return e}a=a||0;for(var c=t.length;c>0&&t[c-1][2]>a;c--)t[c]=t[c-1];t[c]=[s,n,a]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={179:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var n,a,[o,r,l]=s,h=0;if(o.some((e=>0!==t[e]))){for(n in r)i.o(r,n)&&(i.m[n]=r[n]);if(l)var c=l(i)}for(e&&e(s);h<o.length;h++)a=o[h],i.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return i.O(c)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var n=i.O(void 0,[216],(()=>i(796)));n=i.O(n)})();