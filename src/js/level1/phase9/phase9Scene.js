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
import { Modal } from 'bootstrap'
import { configureSaveLogModal } from '../nextLevelEntry/saveLog'

const logModal = new Modal(document.getElementById('logModal'))

var storedLevelValue = false

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, 2, 1, 1000)
camera.position.set(0,15,30)

const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("sceneView")})
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

window.addEventListener( 'resize', function(){
    resizeCanvasToDisplaySize(renderer,camera);
}, false );

const ambientLight = new THREE.HemisphereLight('white','darkslategrey',0.5)

const mainLight = new THREE.DirectionalLight('white', 0.7)
mainLight.position.set(0,1,0) 

const light = new THREE.DirectionalLight( 0xffffff, 0.5 )
light.position.set( 0, 30, 35)
light.castShadow = true


//TESTE DE LUZ

/*var greylight = new THREE.DirectionalLight('grey', 0.5)
var purplelight =new THREE.DirectionalLight('purple', 0.9)
greylight.position.set(0,3,0)
purplelight.position.set(0,3,9)
scene.add(purplelight)
purplelight.castshadow=true*/
//scene.add(greylight)
const controls = new OrbitControls(camera, renderer.domElement)

const gridMapHelper = new GridMapHelper()

const plane = gridMapHelper.createGridPlane()
plane.receiveShadow = true
plane.castShadow = false
var actorModelPath = new URL('../../../assets/models/eve.glb',import.meta.url).toString()
const actor = new THREE.Object3D()
loadGLBFile(actor,actorModelPath,"eve",2.0)
actor.castShadow = true;
actor.receiveShadow = false
actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2))
actor.rotateY(degreeToRadians(90))

const objective1 = new THREE.Object3D()
var crystalModelPath = new URL('../../../assets/models/crystal.obj',import.meta.url).toString()
var crystalTexturePath = new URL('../../../assets/textures/crystal.jpg',import.meta.url).toString()
loadOBJFile(objective1,crystalModelPath,'crystal',crystalTexturePath,2.0)
objective1.rotateX(degreeToRadians(-90))
const objective2 = new THREE.Object3D()
loadOBJFile(objective2,crystalModelPath,'crystal',crystalTexturePath,2.0)
objective2.rotateX(degreeToRadians(-90))
objective1.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.0,gridMapHelper.getGlobalZPositionFromCoord(2))
objective2.position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(8))
const objective3 = new THREE.Object3D()
loadOBJFile(objective3,crystalModelPath,'crystal',crystalTexturePath,2.0)
objective3.rotateX(degreeToRadians(-90))
objective3.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.0,gridMapHelper.getGlobalZPositionFromCoord(5))

const boxGeometry = new THREE.BoxGeometry(6,2,0.2)
const boxGeometry2 = new THREE.BoxGeometry(4,2,0.2)
var aux = new URL('../../../assets/textures/gradegrossa.png',import.meta.url).toString()
var textureParede = new THREE.TextureLoader().load(aux)
const boxMaterial = new THREE.MeshBasicMaterial({map: textureParede, transparent: true, wireframe: false})
const box = new THREE.Mesh(boxGeometry,boxMaterial)

box.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1.0,gridMapHelper.getGlobalXPositionFromCoord(7.5))

const box2 = new THREE.Mesh(boxGeometry2,boxMaterial)
box2.rotateY(degreeToRadians(90))
box2.position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1.0,gridMapHelper.getGlobalZPositionFromCoord(2.5))

const box3 = new THREE.Mesh(boxGeometry,boxMaterial)
box3.position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1.0,gridMapHelper.getGlobalZPositionFromCoord(4.5))


/*const trapGeometry = new THREE.BoxGeometry(2,1,2)
var aux1 = new URL('../../../assets/textures/trap.jpg',import.meta.url).toString()
var texturetrap = new THREE.TextureLoader().load(aux1)
const trapMaterial = new THREE.MeshBasicMaterial({map: texturetrap, transparent: true})*/

const geometry1 = new THREE.ConeGeometry( 0.4, 0.5, 4, 4);
const geometry2 = new THREE.ConeGeometry( 0.3, 1.2, 4, 4);
const geometry3 = new THREE.ConeGeometry( 0.3, 1, 4, 4);
const geometry4 = new THREE.ConeGeometry( 0.4, 1.4, 4, 4);
const geometry5 = new THREE.ConeGeometry( 0.25, 1, 4, 4);
const geometry6 = new THREE.ConeGeometry( 0.3, 2, 4, 4);

const material = new THREE.MeshBasicMaterial( {color: "DarkKhaki"} );

//PRIMEIRA ARMADILHA
const trap1 = new THREE.Mesh(geometry1,material)
trap1.position.set(gridMapHelper.getGlobalXPositionFromCoord(0.6),0.2,gridMapHelper.getGlobalZPositionFromCoord(5.25))
//gridMapHelper.addTrap(1,5)

const trap2 = new THREE.Mesh(geometry2,material)
trap2.position.set(gridMapHelper.getGlobalXPositionFromCoord(0.8),0.6,gridMapHelper.getGlobalZPositionFromCoord(4.6))
//gridMapHelper.addTrap(6,3)

const trap3 = new THREE.Mesh(geometry3,material)
trap3.position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0.5,gridMapHelper.getGlobalZPositionFromCoord(5))
//gridMapHelper.addTrap(5,8)

const trap4 = new THREE.Mesh(geometry4,material)
trap4.position.set(gridMapHelper.getGlobalXPositionFromCoord(1.3),0.7,gridMapHelper.getGlobalZPositionFromCoord(4.7))
//gridMapHelper.addTrap(5,8)

const trap5 = new THREE.Mesh(geometry5,material)
trap5.position.set(gridMapHelper.getGlobalXPositionFromCoord(1.4),0.5,gridMapHelper.getGlobalZPositionFromCoord(5.3))
//gridMapHelper.addTrap(5,8)

const trap6 = new THREE.Mesh(geometry6,material)
trap6.position.set(gridMapHelper.getGlobalXPositionFromCoord(0.7),1,gridMapHelper.getGlobalZPositionFromCoord(5))
//gridMapHelper.addTrap(5,8)

//SEGUNDA ARMADILHA -------------------------------------------------------------------------------------------
const trap7 = new THREE.Mesh(geometry1,material)
trap7.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.2,gridMapHelper.getGlobalZPositionFromCoord(3))
//gridMapHelper.addTrap(5,8)

const trap8 = new THREE.Mesh(geometry2,material)
trap8.position.set(gridMapHelper.getGlobalXPositionFromCoord(6.2),0.6,gridMapHelper.getGlobalZPositionFromCoord(3.2))
//gridMapHelper.addTrap(5,8)

const trap9 = new THREE.Mesh(geometry3,material)
trap9.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.5,gridMapHelper.getGlobalZPositionFromCoord(3.4))
//gridMapHelper.addTrap(5,8)

const trap10 = new THREE.Mesh(geometry4,material)
trap10.position.set(gridMapHelper.getGlobalXPositionFromCoord(6.3),0.7,gridMapHelper.getGlobalZPositionFromCoord(2.9))
//gridMapHelper.addTrap(5,8)

const trap11 = new THREE.Mesh(geometry5,material)
trap11.position.set(gridMapHelper.getGlobalXPositionFromCoord(5.8),0.5,gridMapHelper.getGlobalZPositionFromCoord(3))
//gridMapHelper.addTrap(5,8)

const trap12 = new THREE.Mesh(geometry6,material)
trap12.position.set(gridMapHelper.getGlobalXPositionFromCoord(5.9),1,gridMapHelper.getGlobalZPositionFromCoord(2.7))
//gridMapHelper.addTrap(5,8)

//TERCEIRA ARMADILHA-----------------------------------------------------------------------------------------------
const trap13 = new THREE.Mesh(geometry1,material)
trap13.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.2,gridMapHelper.getGlobalZPositionFromCoord(8.2))
//gridMapHelper.addTrap(5,8)

const trap14 = new THREE.Mesh(geometry2,material)
trap14.position.set(gridMapHelper.getGlobalXPositionFromCoord(6.2),0.6,gridMapHelper.getGlobalZPositionFromCoord(8.35))
//gridMapHelper.addTrap(5,8)

const trap15 = new THREE.Mesh(geometry3,material)
trap15.position.set(gridMapHelper.getGlobalXPositionFromCoord(5.65),0.5,gridMapHelper.getGlobalZPositionFromCoord(8.3))
//gridMapHelper.addTrap(5,8)

const trap16 = new THREE.Mesh(geometry4,material)
trap16.position.set(gridMapHelper.getGlobalXPositionFromCoord(6.3),0.7,gridMapHelper.getGlobalZPositionFromCoord(7.9))
//gridMapHelper.addTrap(5,8)

const trap17 = new THREE.Mesh(geometry5,material)
trap17.position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.5,gridMapHelper.getGlobalZPositionFromCoord(7.7))
//gridMapHelper.addTrap(5,8)

const trap18 = new THREE.Mesh(geometry6,material)
trap18.position.set(gridMapHelper.getGlobalXPositionFromCoord(5.7),1,gridMapHelper.getGlobalZPositionFromCoord(8))
//gridMapHelper.addTrap(5,8)

gridMapHelper.addObstacle(5,7,7,7)
gridMapHelper.addObstacle(5,5,2,3)


scene.add(ambientLight)
scene.add(mainLight)
scene.add( light )

scene.add(plane)
scene.add(objective1)
scene.add(objective2)
scene.add(objective3)
scene.add(actor)
scene.add(box)
scene.add(box2)
scene.add(box3)
scene.add(trap1)
scene.add(trap2)
scene.add(trap3)
scene.add(trap4)
scene.add(trap5)
scene.add(trap6)
scene.add(trap7)
scene.add(trap8)
scene.add(trap9)
scene.add(trap10)
scene.add(trap11)
scene.add(trap12)
scene.add(trap13)
scene.add(trap14)
scene.add(trap15)
scene.add(trap16)
scene.add(trap17)
scene.add(trap18)

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
        setTimeForNextPhase('/level1/phase10/',getTotalTime(sceneProperties.phaseTimer.getElapsedTime()))
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