import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GridMapHelper } from '../../helpers/GridMapHelper'
import 
{
    degreeToRadians,
    resizeCanvasToDisplaySize,
    rotateActorLeft,
    rotateActorRight,
    sceneProperties, 
    translateActorBackward, 
    translateActorFoward,
    printOnConsole,
    loadGLBFile,
    loadOBJFile,
    getTotalTime,
    displayTime,
    //checkPhaseContinuity,
    setTimeForNextPhase 
} from '../../helpers/Util'
import {editor,readOnlyState} from '../../components/global/editor'
import { parseCode } from '../level1Parser'

import Fire from '../src/js/helpers/fire.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, 2, 1, 1000)
camera.position.set(0,15,30)

const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("sceneView")})
renderer.shadowMap.enabled = true;
renderer.shadowMap.type  = THREE.VSMShadowMap; 

window.addEventListener( 'resize', function(){
    resizeCanvasToDisplaySize(renderer,camera);
}, false );

const ambientLight = new THREE.HemisphereLight('white','darkslategreywhi',0.5)

const lightColor = "white"
const dirLight = new THREE.DirectionalLight(lightColor, 0.8)

dirLight.position.set(0,20,15)

dirLight.castShadow = true

dirLight.shadow.mapSize.width = 200
dirLight.shadow.mapSize.height = 200
dirLight.shadow.camera.near = 10
dirLight.shadow.camera.far = 35
dirLight.shadow.camera.left = -12
dirLight.shadow.camera.right = 12
dirLight.shadow.camera.bottom = -12
dirLight.shadow.camera.top = 12
dirLight.shadow.radius = 2

scene.add(dirLight)

//const helper = new THREE.CameraHelper(dirLight.shadow.camera)
//scene.add(helper)

const controls = new OrbitControls(camera, renderer.domElement)

const gridMapHelper = new GridMapHelper()

const plane = gridMapHelper.createGridPlane()
plane.receiveShadow = true 
plane.castShadow = false 

var actorModelPath = new URL('../../../assets/models/eve.glb',import.meta.url).toString()
const actor = new THREE.Object3D()
loadGLBFile(actor,actorModelPath,"eve",2.0)
actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2))
actor.rotateY(degreeToRadians(90))
actor.castShadow = true 
actor.receiveShadow = false 

var crystalModelPath = new URL('../../../assets/models/crystal.obj',import.meta.url).toString()
var crystalTexturePath = new URL('../../../assets/textures/cristal.png',import.meta.url).toString()

const objective1 = new THREE.Object3D()
loadOBJFile(objective1,crystalModelPath,'crystal',crystalTexturePath,2.0)
objective1.rotateX(degreeToRadians(-90))
objective1.castShadow = true 

const objective2 = new THREE.Object3D()
loadOBJFile(objective2,crystalModelPath,'crystal',crystalTexturePath,2.0)
objective2.rotateX(degreeToRadians(-90))
objective2.castShadow = true 

const objective3 = new THREE.Object3D()
loadOBJFile(objective3,crystalModelPath,'crystal',crystalTexturePath,2.0)
objective3.rotateX(degreeToRadians(-90))
objective3.castShadow = true 

objective1.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.0,gridMapHelper.getGlobalZPositionFromCoord(2))
objective2.position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(8))
objective3.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.0,gridMapHelper.getGlobalZPositionFromCoord(5))

var trapModelPath = new URL('../../../assets/models/trap.obj',import.meta.url).toString()
var trapTexturePath = new URL('../../../assets/textures/trap1.png',import.meta.url).toString()

const trap1 = new THREE.Object3D()
loadOBJFile(trap1,trapModelPath,'trap', trapTexturePath, 1.5)
trap1.castShadow = true 

const trap2 = new THREE.Object3D()
loadOBJFile(trap2,trapModelPath,'trap', trapTexturePath, 1.5)
trap2.castShadow = true

const trap3 = new THREE.Object3D()
loadOBJFile(trap3,trapModelPath,'trap', trapTexturePath, 1.5)
trap3.rotateY(degreeToRadians(90))
trap3.castShadow = true 

trap1.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.4,gridMapHelper.getGlobalZPositionFromCoord(8))
trap2.position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0.4,gridMapHelper.getGlobalZPositionFromCoord(5))
trap3.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.4,gridMapHelper.getGlobalZPositionFromCoord(3))

const boxGeometry = new THREE.BoxGeometry(2,2,2)
var aux = new URL('../../../assets/textures/stone.jpg',import.meta.url).toString()
var textureParede = new THREE.TextureLoader().load(aux)
const boxMaterial = new THREE.MeshBasicMaterial({map: textureParede})

const box1 = new THREE.Mesh(boxGeometry,boxMaterial)
box1.castShadow = true 
const box2 = new THREE.Mesh(boxGeometry,boxMaterial)
box2.castShadow = true 
const box3 = new THREE.Mesh(boxGeometry,boxMaterial)
box3.castShadow = true 
box1.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalXPositionFromCoord(7))
box2.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1.0,gridMapHelper.getGlobalZPositionFromCoord(7))
box3.position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1.0,gridMapHelper.getGlobalZPositionFromCoord(7))

const box4 = new THREE.Mesh(boxGeometry,boxMaterial)
box4.castShadow = true 
const box5 = new THREE.Mesh(boxGeometry,boxMaterial)
box5.castShadow = true 
const box6 = new THREE.Mesh(boxGeometry,boxMaterial)
box6.castShadow = true 
box4.position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1.0,gridMapHelper.getGlobalXPositionFromCoord(4))
box5.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1.0,gridMapHelper.getGlobalZPositionFromCoord(4))
box6.position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1.0,gridMapHelper.getGlobalZPositionFromCoord(4))

const box7 = new THREE.Mesh(boxGeometry,boxMaterial)
box7.rotateX(degreeToRadians(-90))
box7.castShadow = true 
const box8 = new THREE.Mesh(boxGeometry,boxMaterial)
box8.rotateX(degreeToRadians(-90))
box8.castShadow = true 
const box9 = new THREE.Mesh(boxGeometry,boxMaterial)
box9.rotateX(degreeToRadians(-90))
box9.castShadow = true 
box7.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalXPositionFromCoord(1))
box8.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalZPositionFromCoord(2))
box9.position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalZPositionFromCoord(3))

//TESTANDO IMPLIMENTAÇÃO DO FOGO 
var clock = new THREE.Clock()

let loader = new THREE.TextureLoader()

let fireTex = loader.load("../assets/textures/fire.png")
let fire = new Fire(fireTex)

fire.scale.set(1.0, 3.0, 1.0)
fire.position.set(0.0, 2.5, 0.0)


scene.add(ambientLight)
scene.add(plane)
scene.add(objective1)
scene.add(objective2)
scene.add(objective3)
scene.add(actor)
scene.add(trap1)
scene.add(trap2)
scene.add(trap3)
scene.add(box1)
scene.add(box2)
scene.add(box3)
scene.add(box4)
scene.add(box5)
scene.add(box6)
scene.add(box7)
scene.add(box8)
scene.add(box9)

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
    let time = getTotalTime(sceneProperties.phaseTimer.getElapsedTime())
    displayTime(time)
}

async function andarFrente(amount)
{
    await translateActorFoward(actor,amount,gridMapHelper,sceneProperties)
}

async function andarTras(amount)
{
    await translateActorBackward(actor,amount,gridMapHelper,sceneProperties)
}

async function girarDireita()
{
    await rotateActorRight(actor,sceneProperties)
}

async function girarEsquerda()
{
    await rotateActorLeft(actor,sceneProperties)
}

function checkCollision(object1,object2)
{
    if(gridMapHelper.getXCoordFromGlobalPosition(object1.position.x) == gridMapHelper.getXCoordFromGlobalPosition(object2.position.x) && gridMapHelper.getZCoordFromGlobalPosition(object1.position.z) == gridMapHelper.getZCoordFromGlobalPosition(object2.position.z))
    {
        return true
    }
    else
    {
        return false
    }
}

function coletarCristal()
{
    if(sceneProperties.cancelExecution)
    {
        return
    }

    if(checkCollision(actor,objective1))
    {
        objective1.visible = false
        printOnConsole("Cristal coletado.")
    }
    else if(checkCollision(actor,objective2))
    {
        objective2.visible = false
        printOnConsole("Cristal coletado.")
    }
    else if(checkCollision(actor,objective3))
    {
        objective3.visible = false
        printOnConsole("Cristal coletado.")
    }
    else
    {
        printOnConsole("Robô não está sobre o cristal.")
    }

    if(!objective1.visible && !objective2.visible && !objective3.visible)
    {
        printOnConsole("Todos os cristais coletados com sucesso!")
    }
}

function resetLevel()
{
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2))
    actor.getObjectByName('eve').rotation.set(0,0,0)
    actor.rotation.set(0,degreeToRadians(90),0)
    objective1.visible = true
    objective2.visible = true
    objective3.visible = true
}

function winCondition()
{
    if(!objective1.visible && !objective2.visible && !objective3.visible)
    {
        return true
    }
    else
    {
        return false
    }
}

const execBtn = document.getElementById("execute")
execBtn.addEventListener("click",async function(){
    let codeParsed = parseCode(editor.state.doc.toString())
    sceneProperties.cancelExecution = false
    if(codeParsed != null)
    {
        resetLevel()
        document.getElementById("execute").disabled = true
        await eval(codeParsed)
        if(winCondition())
        {
            readOnlyState.doc = editor.state.doc
            editor.setState(readOnlyState)
            document.getElementById('winMessage').classList.remove('invisible')
            document.getElementById('advanceBtn').classList.remove('invisible')
            document.getElementById("reset").disabled = true
            sceneProperties.phaseTimer.stop()
        }
        else
        {
            document.getElementById("execute").disabled = false
        }
    }
})

const resetBtn = document.getElementById("reset")
resetBtn.addEventListener("click",function(){
    sceneProperties.cancelExecution = true
    resetLevel()
})

const clsConsoleBtn = document.getElementById("clsConsole")
clsConsoleBtn.addEventListener("click",function(){
    document.getElementById("console-printing").innerHTML = null
})

const advanceBtn = document.getElementById('advanceBtn')
advanceBtn.addEventListener('click',function(e){
    e.preventDefault()
    //if(!storedLevelValue)
    //{
        setTimeForNextPhase('/level1/phase9/',getTotalTime(sceneProperties.phaseTimer.getElapsedTime()))
        window.location.href = advanceBtn.href

        //storedLevelValue = true
    //}
    /*alert("Parabéns, você terminou o primeiro nível do Projeto ELoS!")
    logModal.show()
    configureSaveLogModal(advanceBtn.href,'level1')*/
})

//checkPhaseContinuity('/level1/phase8/')
resizeCanvasToDisplaySize(renderer,camera)
sceneProperties.phaseTimer.start()
animate()