function $parcel$export(e,o,t,r){Object.defineProperty(e,o,{get:t,set:r,enumerable:!0,configurable:!0})}var $parcel$global="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},$parcel$modules={},$parcel$inits={},parcelRequire=$parcel$global.parcelRequiredf3e;null==parcelRequire&&(parcelRequire=function(e){if(e in $parcel$modules)return $parcel$modules[e].exports;if(e in $parcel$inits){var o=$parcel$inits[e];delete $parcel$inits[e];var t={id:e,exports:{}};return $parcel$modules[e]=t,o.call(t.exports,t,t.exports),t.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r},parcelRequire.register=function(e,o){$parcel$inits[e]=o},$parcel$global.parcelRequiredf3e=parcelRequire),parcelRequire.register("dRo73",(function(e,o){var t,r;$parcel$export(e.exports,"register",(()=>t),(e=>t=e)),$parcel$export(e.exports,"resolve",(()=>r),(e=>r=e));var a={};t=function(e){for(var o=Object.keys(e),t=0;t<o.length;t++)a[o[t]]=e[o[t]]},r=function(e){var o=a[e];if(null==o)throw new Error("Could not resolve bundle with id "+e);return o}})),parcelRequire.register("hktkA",(function(module,exports){var $4xklQ=parcelRequire("4xklQ"),$6WmIx=parcelRequire("6WmIx"),$9CUYQ=parcelRequire("9CUYQ"),$apQQe=parcelRequire("apQQe"),$czjZ1=parcelRequire("czjZ1"),$iw8wP=parcelRequire("iw8wP");const scene=new $4xklQ.Scene,camera=new $4xklQ.PerspectiveCamera(45,2,1,1e3);camera.position.set(0,15,30);const renderer=new $4xklQ.WebGLRenderer({canvas:document.getElementById("sceneView")});renderer.shadowMap.enabled=!0,renderer.shadowMap.type=$4xklQ.VSMShadowMap,window.addEventListener("resize",(function(){(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera)}),!1);const ambientLight=new $4xklQ.HemisphereLight("white","darkslategreywhi",.5),lightColor="white",dirLight=new $4xklQ.DirectionalLight(lightColor,.8);dirLight.position.set(0,20,15),dirLight.castShadow=!0,dirLight.shadow.mapSize.width=200,dirLight.shadow.mapSize.height=200,dirLight.shadow.camera.near=10,dirLight.shadow.camera.far=35,dirLight.shadow.camera.left=-12,dirLight.shadow.camera.right=12,dirLight.shadow.camera.bottom=-12,dirLight.shadow.camera.top=12,dirLight.shadow.radius=2,scene.add(dirLight);const controls=new(0,$6WmIx.OrbitControls)(camera,renderer.domElement),gridMapHelper=new(0,$9CUYQ.GridMapHelper),plane=gridMapHelper.createGridPlane();plane.receiveShadow=!0,plane.castShadow=!1;var actorModelPath=new URL(parcelRequire("8jwWx")).toString();const actor=new $4xklQ.Object3D;(0,$apQQe.loadGLBFile)(actor,actorModelPath,"eve",2),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2)),actor.rotateY((0,$apQQe.degreeToRadians)(90)),actor.castShadow=!0,actor.receiveShadow=!1;var crystalModelPath=new URL(parcelRequire("kgSYq")).toString(),crystalTexturePath=new URL(parcelRequire("4sKsP")).toString();const objective1=new $4xklQ.Object3D;(0,$apQQe.loadOBJFile)(objective1,crystalModelPath,"crystal",crystalTexturePath,2),objective1.rotateX((0,$apQQe.degreeToRadians)(-90)),objective1.castShadow=!0;const objective2=new $4xklQ.Object3D;(0,$apQQe.loadOBJFile)(objective2,crystalModelPath,"crystal",crystalTexturePath,2),objective2.rotateX((0,$apQQe.degreeToRadians)(-90)),objective2.castShadow=!0;const objective3=new $4xklQ.Object3D;(0,$apQQe.loadOBJFile)(objective3,crystalModelPath,"crystal",crystalTexturePath,2),objective3.rotateX((0,$apQQe.degreeToRadians)(-90)),objective3.castShadow=!0,objective1.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(2)),objective2.position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(8)),objective3.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(5));var trapModelPath=new URL(parcelRequire("3SQE2")).toString(),trapTexturePath=new URL(parcelRequire("lXrwy")).toString();const trap1=new $4xklQ.Object3D;(0,$apQQe.loadOBJFile)(trap1,trapModelPath,"trap",trapTexturePath,1.5),trap1.castShadow=!0;const trap2=new $4xklQ.Object3D;(0,$apQQe.loadOBJFile)(trap2,trapModelPath,"trap",trapTexturePath,1.5),trap2.castShadow=!0;const trap3=new $4xklQ.Object3D;(0,$apQQe.loadOBJFile)(trap3,trapModelPath,"trap",trapTexturePath,1.5),trap3.rotateY((0,$apQQe.degreeToRadians)(90)),trap3.castShadow=!0,trap1.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),.4,gridMapHelper.getGlobalZPositionFromCoord(8)),trap2.position.set(gridMapHelper.getGlobalXPositionFromCoord(1),.4,gridMapHelper.getGlobalZPositionFromCoord(5)),trap3.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),.4,gridMapHelper.getGlobalZPositionFromCoord(3));const boxGeometry=new $4xklQ.BoxGeometry(2,2,2);var aux=new URL(parcelRequire("4Op5W")).toString(),textureParede=(new $4xklQ.TextureLoader).load(aux);const boxMaterial=new $4xklQ.MeshBasicMaterial({map:textureParede}),box1=new $4xklQ.Mesh(boxGeometry,boxMaterial);box1.castShadow=!0;const box2=new $4xklQ.Mesh(boxGeometry,boxMaterial);box2.castShadow=!0;const box3=new $4xklQ.Mesh(boxGeometry,boxMaterial);box3.castShadow=!0,box1.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalXPositionFromCoord(7)),box2.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(7)),box3.position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(7));const box4=new $4xklQ.Mesh(boxGeometry,boxMaterial);box4.castShadow=!0;const box5=new $4xklQ.Mesh(boxGeometry,boxMaterial);box5.castShadow=!0;const box6=new $4xklQ.Mesh(boxGeometry,boxMaterial);box6.castShadow=!0,box4.position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalXPositionFromCoord(4)),box5.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(4)),box6.position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(4));const box7=new $4xklQ.Mesh(boxGeometry,boxMaterial);box7.rotateX((0,$apQQe.degreeToRadians)(-90)),box7.castShadow=!0;const box8=new $4xklQ.Mesh(boxGeometry,boxMaterial);box8.rotateX((0,$apQQe.degreeToRadians)(-90)),box8.castShadow=!0;const box9=new $4xklQ.Mesh(boxGeometry,boxMaterial);function animate(){requestAnimationFrame(animate),controls.update(),renderer.render(scene,camera);let e=(0,$apQQe.getTotalTime)($apQQe.sceneProperties.phaseTimer.getElapsedTime());(0,$apQQe.displayTime)(e)}async function andarFrente(e){await(0,$apQQe.translateActorFoward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function andarTras(e){await(0,$apQQe.translateActorBackward)(actor,e,gridMapHelper,$apQQe.sceneProperties)}async function girarDireita(){await(0,$apQQe.rotateActorRight)(actor,$apQQe.sceneProperties)}async function girarEsquerda(){await(0,$apQQe.rotateActorLeft)(actor,$apQQe.sceneProperties)}function checkCollision(e,o){return gridMapHelper.getXCoordFromGlobalPosition(e.position.x)==gridMapHelper.getXCoordFromGlobalPosition(o.position.x)&&gridMapHelper.getZCoordFromGlobalPosition(e.position.z)==gridMapHelper.getZCoordFromGlobalPosition(o.position.z)}function coletarCristal(){$apQQe.sceneProperties.cancelExecution||(checkCollision(actor,objective1)?(objective1.visible=!1,(0,$apQQe.printOnConsole)("Cristal coletado.")):checkCollision(actor,objective2)?(objective2.visible=!1,(0,$apQQe.printOnConsole)("Cristal coletado.")):checkCollision(actor,objective3)?(objective3.visible=!1,(0,$apQQe.printOnConsole)("Cristal coletado.")):(0,$apQQe.printOnConsole)("Robô não está sobre o cristal."),objective1.visible||objective2.visible||objective3.visible||(0,$apQQe.printOnConsole)("Todos os cristais coletados com sucesso!"))}function resetLevel(){actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2)),actor.getObjectByName("eve").rotation.set(0,0,0),actor.rotation.set(0,(0,$apQQe.degreeToRadians)(90),0),objective1.visible=!0,objective2.visible=!0,objective3.visible=!0}function winCondition(){return!(objective1.visible||objective2.visible||objective3.visible)}box9.rotateX((0,$apQQe.degreeToRadians)(-90)),box9.castShadow=!0,box7.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalXPositionFromCoord(1)),box8.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2)),box9.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(3)),scene.add(ambientLight),scene.add(plane),scene.add(objective1),scene.add(objective2),scene.add(objective3),scene.add(actor),scene.add(trap1),scene.add(trap2),scene.add(trap3),scene.add(box1),scene.add(box2),scene.add(box3),scene.add(box4),scene.add(box5),scene.add(box6),scene.add(box7),scene.add(box8),scene.add(box9);const execBtn=document.getElementById("execute");execBtn.addEventListener("click",(async function(){let codeParsed=(0,$iw8wP.parseCode)($czjZ1.editor.state.doc.toString());$apQQe.sceneProperties.cancelExecution=!1,null!=codeParsed&&(resetLevel(),document.getElementById("execute").disabled=!0,await eval(codeParsed),winCondition()?($czjZ1.readOnlyState.doc=$czjZ1.editor.state.doc,$czjZ1.editor.setState($czjZ1.readOnlyState),document.getElementById("winMessage").classList.remove("invisible"),document.getElementById("advanceBtn").classList.remove("invisible"),document.getElementById("reset").disabled=!0,$apQQe.sceneProperties.phaseTimer.stop()):document.getElementById("execute").disabled=!1)}));const resetBtn=document.getElementById("reset");resetBtn.addEventListener("click",(function(){$apQQe.sceneProperties.cancelExecution=!0,resetLevel()}));const clsConsoleBtn=document.getElementById("clsConsole");clsConsoleBtn.addEventListener("click",(function(){document.getElementById("console-printing").innerHTML=null}));const advanceBtn=document.getElementById("advanceBtn");advanceBtn.addEventListener("click",(function(e){e.preventDefault(),(0,$apQQe.setTimeForNextPhase)("/level1/phase9/",(0,$apQQe.getTotalTime)($apQQe.sceneProperties.phaseTimer.getElapsedTime())),window.location.href=advanceBtn.href})),(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera),$apQQe.sceneProperties.phaseTimer.start(),animate()})),parcelRequire.register("iw8wP",(function(e,o){$parcel$export(e.exports,"parseCode",(()=>r));const t=[{filter:new RegExp("^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"normal"}];function r(e){let o="async function runCode(){\n",r=e.split("\n"),a=!0;for(let e=0;e<r.length;e++){let l,s=!1;if(""!=r[e].trim()){for(let o=0;o<t.length;o++)if(s=t[o].filter.test(r[e].trim()),s){l=t[o].type;break}if(!s){i=r[e],n=e+1,document.getElementById("console-printing").innerHTML+=`Código Inválido:<br> ${i} linha: ${n}<br>`,a=!1;break}if("sequential"===l){o+="await "+r[e].trim()+"\n"}else{o+=r[e].trim()+"\n"}}}var i,n;return a?(o+="}\nrunCode()",o):null}})),parcelRequire.register("8jwWx",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("6UgDP"),import.meta.url).toString()})),parcelRequire.register("kgSYq",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("2fkcW"),import.meta.url).toString()})),parcelRequire.register("4sKsP",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("jMxmz"),import.meta.url).toString()})),parcelRequire.register("3SQE2",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("dutcn"),import.meta.url).toString()})),parcelRequire.register("lXrwy",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("dss99"),import.meta.url).toString()})),parcelRequire.register("4Op5W",(function(e,o){e.exports=new URL("../../"+parcelRequire("dRo73").resolve("5js9q"),import.meta.url).toString()}));var $e3befad39a237f0b$exports={};parcelRequire("dRo73").register(JSON.parse('{"84qfS":"index.35d99488.js","6UgDP":"eve.1d379c98.glb","2fkcW":"crystal.b05326a7.obj","jMxmz":"cristal.27772d55.png","dutcn":"trap.092ba82a.obj","dss99":"trap1.1b18add7.png","5js9q":"stone.33b4a84b.jpg","kPc2l":"index.e28e1ca2.js"}')),parcelRequire("hktkA");