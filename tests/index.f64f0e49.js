var $parcel$global="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},$parcel$modules={},$parcel$inits={},parcelRequire=$parcel$global.parcelRequiredf3e;null==parcelRequire&&(parcelRequire=function(e){if(e in $parcel$modules)return $parcel$modules[e].exports;if(e in $parcel$inits){var n=$parcel$inits[e];delete $parcel$inits[e];var t={id:e,exports:{}};return $parcel$modules[e]=t,n.call(t.exports,t,t.exports),t.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r},parcelRequire.register=function(e,n){$parcel$inits[e]=n},$parcel$global.parcelRequiredf3e=parcelRequire),parcelRequire.register("5cRLJ",(function(module,exports){var $4xklQ=parcelRequire("4xklQ"),$6WmIx=parcelRequire("6WmIx"),$9CUYQ=parcelRequire("9CUYQ"),$apQQe=parcelRequire("apQQe"),$czjZ1=parcelRequire("czjZ1"),cancelExecution=!1;const functionFilter=[{filter:new RegExp("^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"sequential"},{filter:new RegExp("^if(\\s+)?\\((\\s+)?.+\\)$"),type:"normal"},{filter:new RegExp("^if(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$"),type:"blockValidation"},{filter:new RegExp("^contemEsfera(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"normal"},{filter:new RegExp("^{$"),type:"blockValidation"},{filter:new RegExp("^removeEsfera(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),type:"normal"},{filter:new RegExp("^}$"),type:"normal"}],scene=new $4xklQ.Scene,camera=new $4xklQ.PerspectiveCamera(45,2,1,1e3);camera.position.set(0,15,30);const renderer=new $4xklQ.WebGLRenderer({canvas:document.getElementById("sceneView")});window.addEventListener("resize",(function(){(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera)}),!1);const ambientLight=new $4xklQ.HemisphereLight("white","darkslategrey",.5),mainLight=new $4xklQ.DirectionalLight("white",.7);mainLight.position.set(2,1,1);const controls=new(0,$6WmIx.OrbitControls)(camera,renderer.domElement),gridMapHelper=new(0,$9CUYQ.GridMapHelper),plane=gridMapHelper.createGridPlane();gridMapHelper.addObstacle(1,4,1,4);const coneGeometry=new $4xklQ.ConeGeometry(1,2),coneMaterial=new $4xklQ.MeshLambertMaterial({color:"rgb(255,0,0)"}),cone=new $4xklQ.Mesh(coneGeometry,coneMaterial);cone.rotateX((0,$apQQe.degreeToRadians)(90));const actor=new $4xklQ.Object3D;actor.add(cone),actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(0));const sphereGeometry=new $4xklQ.SphereGeometry(1),sphereMaterial=new $4xklQ.MeshLambertMaterial({color:"rgb(0,0,255)"}),sphere=new $4xklQ.Mesh(sphereGeometry,sphereMaterial);var spherePosX=Math.floor(8*Math.random())+1,spherePosZ=Math.floor(8*Math.random())+1;function animate(){requestAnimationFrame(animate),controls.update(),renderer.render(scene,camera)}function andarFrente(e){let n=actor.clone();n.translateZ(gridMapHelper.getMultiplier()*e);let t,r=n.position,o=.01;return new Promise((function(e){t=requestAnimationFrame((function i(){let a=gridMapHelper.collisionTests(actor.position);actor.position.x.toFixed(2)==r.x.toFixed(2)&&actor.position.z.toFixed(2)==r.z.toFixed(2)||cancelExecution||a?(a&&(printOnConsole("Não há como prosseguir por esse caminho."),cancelExecution=!0),cancelAnimationFrame(t),n.children[0].geometry.dispose(),n.children[0].material.dispose(),e()):(actor.position.lerp(r,o),o+=.001,t=requestAnimationFrame(i))}))}))}function andarTras(e){let n=actor.clone();n.translateZ(-gridMapHelper.getMultiplier()*e);let t,r=n.position,o=.01;return new Promise((function(e){t=requestAnimationFrame((function i(){let a=gridMapHelper.collisionTests(actor.position);actor.position.x.toFixed(2)==r.x.toFixed(2)&&actor.position.z.toFixed(2)==r.z.toFixed(2)||cancelExecution||a?(a&&(printOnConsole("Não há como prosseguir por esse caminho."),cancelExecution=!0),cancelAnimationFrame(t),n.children[0].geometry.dispose(),n.children[0].material.dispose(),e()):(actor.position.lerp(r,o),o+=.001,t=requestAnimationFrame(i))}))}))}function girarDireita(){let e=actor.clone();e.rotateY((0,$apQQe.degreeToRadians)(-90));let n,t=new $4xklQ.Quaternion;return t.setFromEuler(e.rotation),new Promise((function(r){n=requestAnimationFrame((function o(){actor.quaternion.equals(t)||cancelExecution?(cancelAnimationFrame(n),e.children[0].geometry.dispose(),e.children[0].material.dispose(),r()):(actor.quaternion.rotateTowards(t,(0,$apQQe.degreeToRadians)(1)),n=requestAnimationFrame(o))}))}))}function girarEsquerda(){let e=actor.clone();e.rotateY((0,$apQQe.degreeToRadians)(90));let n,t=new $4xklQ.Quaternion;return t.setFromEuler(e.rotation.clone()),new Promise((function(r){n=requestAnimationFrame((function o(){actor.quaternion.equals(t)||cancelExecution?(cancelAnimationFrame(n),e.children[0].geometry.dispose(),e.children[0].material.dispose(),r()):(actor.quaternion.rotateTowards(t,(0,$apQQe.degreeToRadians)(1)),n=requestAnimationFrame(o))}))}))}function checkCollision(e,n){return gridMapHelper.getXCoordFromGlobalPosition(e.position.x)==gridMapHelper.getXCoordFromGlobalPosition(n.position.x)&&gridMapHelper.getZCoordFromGlobalPosition(e.position.z)==gridMapHelper.getZCoordFromGlobalPosition(n.position.z)}function contemEsfera(){if(cancelExecution)return;let e=checkCollision(actor,sphere);return e||printOnConsole("Esfera não encontrada"),e}function removeEsfera(){cancelExecution||(sphere.visible=!1,printOnConsole("Esfera removida"))}function printOnConsole(e){document.getElementById("console-printing").innerHTML+=`${e}<br>`}function printErrorOnConsole(e,n){document.getElementById("console-printing").innerHTML+=`Código Inválido:<br> ${e} linha: ${n}<br>`}function blockValidation(e,n){let t=!1,r=0;for(let o=n+1;o<e.length;o++)if(e[o].includes("}")){if(0==r){t=!0;break}r--}else e[o].includes("{")&&r++;return t}function parseCode(e){let n="async function runCode(){\n",t=e.split("\n"),r=!0;for(let e=0;e<t.length;e++){let o,i=!1;if(""!=t[e].trim()){for(let n=0;n<functionFilter.length;n++)if(i=functionFilter[n].filter.test(t[e].trim()),i){o=functionFilter[n].type;break}if(!i){printErrorOnConsole(t[e],e+1),r=!1;break}if("sequential"===o){n+="await "+t[e].trim()+"\n"}else if("blockValidation"===o){if(!blockValidation(t,e)){printErrorOnConsole(`${t[e]} (Bloco é aberto mas nunca é fechado)`,e+1),r=!1;break}n+=t[e].trim()+"\n"}else{n+=t[e].trim()+"\n"}}}return r?(n+="}\nrunCode()",n):null}function resetLevel(){actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(0)),actor.rotation.set(0,0,0),sphere.visible=!0}function winCondition(){return!(!checkCollision(actor,sphere)||sphere.visible)}sphere.position.set(gridMapHelper.getGlobalXPositionFromCoord(spherePosX),1,gridMapHelper.getGlobalZPositionFromCoord(spherePosZ)),scene.add(ambientLight),scene.add(mainLight),scene.add(plane),scene.add(sphere),scene.add(actor);const execBtn=document.getElementById("execute");execBtn.addEventListener("click",(async function(){let codeParsed=parseCode($czjZ1.editor.state.doc.toString());cancelExecution=!1,null!=codeParsed&&(resetLevel(),document.getElementById("execute").disabled=!0,await eval(codeParsed),winCondition()?($czjZ1.readOnlyState.doc=$czjZ1.editor.state.doc,$czjZ1.editor.setState($czjZ1.readOnlyState),document.getElementById("winMessage").classList.remove("invisible"),document.getElementById("advanceBtn").classList.remove("invisible"),document.getElementById("reset").disabled=!0):document.getElementById("execute").disabled=!1)}));const resetBtn=document.getElementById("reset");resetBtn.addEventListener("click",(function(){cancelExecution=!0,resetLevel()}));const clsConsoleBtn=document.getElementById("clsConsole");clsConsoleBtn.addEventListener("click",(function(){document.getElementById("console-printing").innerHTML=null})),(0,$apQQe.resizeCanvasToDisplaySize)(renderer,camera),animate()})),parcelRequire("5cRLJ");