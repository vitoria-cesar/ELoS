import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import { GridMapHelper } from './GridMapHelper'

/**
 * Convert an angle from degree to radian.
 * @param {number} angle - The angle you wish to convert
 * @returns {number}
 */
export function degreeToRadians(angle) //FUNÇÃO CONVERTE O ÂNGULO DE GRAUS PARA RADIANOS
{
    let radianAngle = angle * (Math.PI/180) 
    return radianAngle //RETORNA O ÂNGULO EM RADIANOS
}

/**
 * Uma função que redimensiona o renderizador e o aspecto da câmera para o tamanho atual da tela.
 * @param {THREE.WebGLRenderer} renderer - Scene's renderer
 * @param {THREE.PerspectiveCamera} camera - Scene's camera
 */
export function resizeCanvasToDisplaySize(renderer,camera) //FUNÇÃO QUE FAZ COM QUE O JOGO FIQUE DO TAMANHO DA TELA SEMPRE
{
    let canvas = renderer.domElement;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    if(canvas.width !== width ||canvas.height !== height) 
    {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix(); //Atualiza a matriz de projeção da câmera. Deve ser chamado após a mudança de parâmetros.
    }
}

/**
 * Um objeto contendo as propriedades gerais de uma cena de fase.
 * @namespace
 * @property {boolean} [cancelExecution=false] - Use isso para verificar se o código do usuário precisa ser encerrado antes do final da execução. O padrão é falso.
 * @property {THREE.Clock} phaseTimer - O temporizador usado especificamente para uma fase. Precisa ser iniciado.
 */
export var sceneProperties = {
    cancelExecution: false,
    phaseTimer: new THREE.Clock(false)
}

/**
 * Uma função para executar um movimento de inclinação para uma direção indicada.
 * @param {THREE.Object3D} object - Objeto que você deseja executar o movimento lean.
 * @param {boolean} [direction=true] - Change it's default value if you want the object to return to the origin rotation instead to lean. Default is true.
 * @param {number} [positionMultiplier=1] - Altere o multiplicador do movimento de inclinação para reduzir ou aumentar a inclinação, o valor base é de 15 graus. Alterar o valor padrão para um negativo faz com que o Objeto se incline para trás. O padrão é 1.
 */
export function leanMovement(object,direction = true,positionMultiplier = 1)
{
    let objCopy = object.clone()
    if(direction)
    {
        objCopy.rotation.set(degreeToRadians(15*positionMultiplier),0,0)
    }
    else
    {
        objCopy.rotation.set(0,0,0)
    }
    let newPosition = new THREE.Quaternion()
    newPosition.setFromEuler(objCopy.rotation)
    let requestID
    function rotate()
    {
        if(!object.quaternion.equals(newPosition) && !sceneProperties.cancelExecution)
        {
            object.quaternion.slerp(newPosition,0.2)
            requestID = requestAnimationFrame(rotate)
        }
        else
        {
            cancelAnimationFrame(requestID)
        }
    }
    requestID = requestAnimationFrame(rotate)   
}


/**
 * Uma função para traduzir o ator em uma direção positiva.
 * @param {THREE.Object3D} actor - Objeto que irá executar a translação.
 * @param {number} amount - Quantidade de quadrícula que o objeto irá transladar.
 * @param {GridMapHelper} gridMapHelper - Objeto gridMapHelper da fase para detectar colisões, armadilhas e determinar posições globais.
 * @param {Object} sceneProperties - SceneProperties da fase para determinar se a execução precisa ser encerrada.
 * @param {boolean} sceneProperties.cancelExecution - Use isso para verificar se o código do usuário precisa ser encerrado antes do final da execução. O padrão é falso.
 * @returns {Promise}
 */
export function translateActorFoward(actor,amount,gridMapHelper,sceneProperties) //TRANSLAÇÃO PARA FRENTE
{
    let objectCopy = actor.clone()
    objectCopy.translateZ(gridMapHelper.getMultiplier()*amount)
    let newPosition = objectCopy.position
    let requestID
    let alpha = 0.01
    leanMovement(actor.getObjectByName('eve'))
    return new Promise(function(resolve){
        function translateActor()
        {
            newPosition = gridMapHelper.collisionTests(actor.position,newPosition)
            let trap = gridMapHelper.trapCollision(actor.position)
            if((actor.position.x.toFixed(2) != newPosition.x.toFixed(2)||actor.position.z.toFixed(2) != newPosition.z.toFixed(2)) && !sceneProperties.cancelExecution && !trap)
            {
                actor.position.lerp(newPosition,alpha)
                alpha += 0.001
                requestID = requestAnimationFrame(translateActor)
            }
            else
            {
                if(trap && !sceneProperties.cancelExecution)
                {
                    printOnConsole("Você caiu na armadilha.")
                    sceneProperties.cancelExecution = true   
                }
                leanMovement(actor.getObjectByName('eve'),false)
                cancelAnimationFrame(requestID)
                resolve()
            }
        }
        
        requestID = requestAnimationFrame(translateActor)
    })
}

/**
 * A function to translate the actor in a negative direction.
 * @param {THREE.Object3D} actor - Object that will execute the translation.
 * @param {number} amount - Amount of grid square the object will translate.
 * @param {GridMapHelper} gridMapHelper - Phase's gridMapHelper object to detect collisions, traps and determine global positions.
 * @param {Object} sceneProperties - Phase's sceneProperties to determine if the execution needs to be terminated.
 * @param {boolean} sceneProperties.cancelExecution - Use this to verify if the user's code needs to be terminated before the end of the execution. Default is false.
 * @returns {Promise}
 */
export function translateActorBackward(actor,amount,gridMapHelper,sceneProperties) //TRANSLAÇÃO PARA TRÁS
{
    let objectCopy = actor.clone()
    objectCopy.translateZ(-(gridMapHelper.getMultiplier()*amount))
    let newPosition = objectCopy.position
    let requestID
    let alpha = 0.01
    leanMovement(actor.getObjectByName('eve'),true,-1) //RETORNA O PRIMEIRO "FILHO" DO OBJETO COM O NOME 'EVE'
    return new Promise(function(resolve){
        function translateActor() //TRANSLAÇÃO DO ROBÔ
        {
            newPosition = gridMapHelper.collisionTests(actor.position,newPosition)
            let trap = gridMapHelper.trapCollision(actor.position)
            if((actor.position.x.toFixed(2) != newPosition.x.toFixed(2)||actor.position.z.toFixed(2) != newPosition.z.toFixed(2)) && !sceneProperties.cancelExecution && !trap)
            {
                actor.position.lerp(newPosition,alpha)
                alpha += 0.001
                requestID = requestAnimationFrame(translateActor)
            }
            else
            {
                if(trap && !sceneProperties.cancelExecution)
                {
                    printOnConsole("Você caiu na armadilha.")
                    sceneProperties.cancelExecution = true   
                }
                leanMovement(actor.getObjectByName('eve'),false)
                cancelAnimationFrame(requestID)
                resolve()
            }
        }
        
        requestID = requestAnimationFrame(translateActor)
    })
}

/**
 * Rotate actor in -90 degrees.
 * @param {THREE.Object3D} actor 
 * @param {Object} sceneProperties - Phase's sceneProperties to determine if the execution needs to be terminated.
 * @param {boolean} sceneProperties.cancelExecution - Use this to verify if the user's code needs to be terminated before the end of the execution. Default is false. 
 * @returns {Promise}
 */
export function rotateActorRight(actor,sceneProperties) //ROTACIONA O ROBÔ EM 90° PARA A DIREITA 
{
    let objectCopy = actor.clone()
    objectCopy.rotateY(degreeToRadians(-90))
    let newPosition = new THREE.Quaternion()
    newPosition.setFromEuler(objectCopy.rotation)
    let requestID
    return new Promise(function(resolve){
        function rotateActor()
        {
            if(!actor.quaternion.equals(newPosition) && !sceneProperties.cancelExecution)
            {
                actor.quaternion.rotateTowards(newPosition,degreeToRadians(1))
                requestID = requestAnimationFrame(rotateActor)
            }
            else
            {
                cancelAnimationFrame(requestID)
                resolve()
            }
        }

        requestID = requestAnimationFrame(rotateActor)
    })
}

/**
 * Rotate actor in 90 degrees.
 * @param {THREE.Object3D} actor 
 * @param {Object} sceneProperties - Phase's sceneProperties to determine if the execution needs to be terminated.
 * @param {boolean} sceneProperties.cancelExecution - Use this to verify if the user's code needs to be terminated before the end of the execution. Default is false. 
 * @returns {Promise}
 */
export function rotateActorLeft(actor,sceneProperties) //ROTACIONA O ROBÔ EM 90° PARA A ESQUERDA
{
    let objectCopy = actor.clone()
    objectCopy.rotateY(degreeToRadians(90))
    let newPosition = new THREE.Quaternion()
    newPosition.setFromEuler(objectCopy.rotation.clone())
    let requestID
    return new Promise(function(resolve){
        function rotateActor()
        {
            if(!actor.quaternion.equals(newPosition) && !sceneProperties.cancelExecution)
            {
                actor.quaternion.rotateTowards(newPosition,degreeToRadians(1))
                requestID = requestAnimationFrame(rotateActor)
            }
            else
            {
                cancelAnimationFrame(requestID)
                resolve()
            }
        }

        requestID = requestAnimationFrame(rotateActor)
    })
}

/**
 * Imprime algo no console da fase. Esta função só funcionará se a tag HTML do console tiver o id "console-printing".
 * @example
 * <div id="console-printing">
 * </div>
 * @param {string} content -O conteúdo que você deseja imprimir.
 */
export function printOnConsole(content)
{
    let consoleToPrint = document.getElementById("console-printing")
    consoleToPrint.innerHTML += `${content}<br>`
}

/**
 * Get the maximum size of a Mesh.
 * @param {THREE.Object3D} object - Object you want to get it's max size.
 * @returns {number}
 */
export function getMaxSize(object)
{
    let maxSize

    let box = new THREE.Box3().setFromObject(object)
    let min = box.min
    let max = box.max

    let size = new THREE.Box3()
    size.x = max.x - min.x
    size.y = max.y - min.y
    size.z = max.z - min.z

    if(size.x >= size.y && size.x >= size.z)
    {
        maxSize = size.x
    }
    else
    {
        if(size.y >= size.z)
        {
            maxSize = size.y
        }
        else
        {
            maxSize = size.z
        }
    }
    
    return maxSize
}

/**
 * Normaliza a escala padrão do objeto para as medidas da cena e redimensiona para um tamanho desejado.
 * @param {THREE.Object3D} object - Objeto para nomarlizar e redimensionar.
 * @param {number} newScale - Nova escala desejada.
 */
export function normalizeAndRescale(object,newScale)
{
    let scale = getMaxSize(object)
    object.scale.set(newScale * 1.0/scale, newScale * 1.0/scale, newScale * 1.0/scale)
}

/**
 * Carregue uma malha de um arquivo .glb e anexe-a a um Object3D.
 * @param {THREE.Object3D} objectToAdd - Objeto que irá adicionar a Malha
 * @param {string} path - O caminho do arquivo. No momento estamos usando o Parsel.js para empacotar este projeto, então para o empacotador importar o arquivo para a compilação você precisa gerar uma URL relativa no arquivo js que você chamou esta função.
 * @example 
 * var p = new URL('./relativePathtoTheFile',import.meta.url).toString()
 * loadGLBFile(obj,p,model,scale)
 * @param {string} modelName - O nome que o modelo será chamado, este nome pode ser usado para obter o Mesh carregado dentro do Object3D que o anexa.
 * @param {number} scale - O tamanho que você quer que o modelo tenha.
 */
export function loadGLBFile(objectToAdd,path,modelName,scale) //FUNÇÃO CARREGA O PLANO E ANEXA O OBJETO NELA
{
    let loader = new GLTFLoader()
    loader.load(path,function(gltf){
        let obj = gltf.scene
        obj.name = modelName
        obj.visible = true
        obj.traverse(function(child){
            if(child)
            {
                child.castShadow = true
            }
        })
        obj.traverse(function(node){
            if(node.material)
            {
                node.material.side = THREE.DoubleSide
            }
        })
        normalizeAndRescale(obj,scale)
        objectToAdd.add(obj)
    })
}

/**
 * Carrega uma malha de um arquivo .obj e anexa a um Object3D.
 * @param {THREE.Object3D} objectToAdd - Objeto que irá adicionar a Malha
 * @param {string} path - O caminho do arquivo. No momento estamos usando o Parsel.js para empacotar este projeto, então para o empacotador importar o arquivo para a compilação você precisa gerar uma URL relativa no arquivo js que você chamou esta função.
 * @example 
 * var fp = new URL('./relativePathtoTheFile',import.meta.url).toString()
 * loadOBJFile(obj,fp,model,tp,scale)
 * @param {string} modelName - O nome que o modelo será chamado, este nome pode ser usado para obter o Mesh carregado dentro do Object3D que o anexa.
 * @param {string} texture - O caminho do arquivo de textura. No momento estamos usando o Parsel.js para empacotar este projeto, então para o empacotador importar o arquivo para a compilação você precisa gerar uma URL relativa no arquivo js que você chamou esta função.
 * @example 
 * var tp = new URL('./relativePathtoTheFile',import.meta.url).toString()
 * loadOBJFile(obj,fp,model,tp,scale)
 * @param {number} scale - O tamanho que você quer que o modelo tenha.
 */
export function loadOBJFile(objectToAdd,path,modelName,texture,scale) //CARREGA O PLANO E ANEXA A UM OBJETO
{
    let objLoader = new OBJLoader()
    let textureLoader = new THREE.TextureLoader()
    let tex
    if(texture)
    {
        tex = textureLoader.load(texture)
    }
    objLoader.load(path,function(object){
        object.name = modelName
        object.visible = true
        object.traverse(function(child){
            if(child)
            {
                child.castShadow = true
            }
        })
        object.traverse(function(node){
            if(node.material)
            {
                node.material.side = THREE.DoubleSide
                if(texture)
                {
                    node.material.map = tex
                }
            }
        })
        normalizeAndRescale(object,scale)
        objectToAdd.add(object)
    })
}

/**
 *Verifique se o usuário está na fase correta com base no que foi armazenado no armazenamento de sessão do navegador. Caso não esteja, a função redirecionará o usuário para o endereço que foi armazenado no armazenamento de sessão ou na página de índice.
 * @param {string} currentPhasePath - O caminho da fase atual, não precisa do caminho do buraco, apenas parte do subdiretório.
 * @example
 * checkPhaseContinuity('/level1/phase1/')
 */
export function checkPhaseContinuity(currentPhasePath) //FUNÇÃO NÃO DEIXA O JOGADOR PULAR DE FASE 
{
    let phasePath = window.sessionStorage.getItem('phasePath')
    if(phasePath != null)
    {
        if(phasePath != currentPhasePath)
        {
            document.location.href = '../..' + phasePath
        }
    }
    else
    {
        document.location.href = '../../'   
    }
}

/**
 * Retorna o tempo total que o usuário gastou nas fases anteriores mais a fase atual.
 * @param {number} time - O tempo gasto na fase atual será somado aos tempos anteriores.
 * @returns {number}
 */
export function getTotalTime(time)
{
    let initialTime = parseFloat(window.sessionStorage.getItem('elapsedTime'))
    let totalTime = initialTime + time

    return totalTime
}

/**
* Define no armazenamento da sessão do navegador o caminho da próxima fase, o tempo total gasto até esta fase. Se for a fase final, a função limpará o armazenamento da sessão. * @param {string} nextPhasePath - The path of the next phase, doesn't need the hole path, just subdirectory part.
 * @example
 * setTimeForNextPhase('/level1/phase2/',getTotalTime(timer.getElapsedTime()))
 * @param {number} time - O tempo total gasto até esta fase.
 * @param {boolean} [finalPhase=false] - Altere seu valor padrão se for a fase final deste nível, isso fará com que a função limpe o armazenamento da sessão. O padrão é falso.
 */
export function setTimeForNextPhase(nextPhasePath,time,finalPhase = false)
{
    if(!finalPhase)
    {
        window.sessionStorage.setItem('phasePath',nextPhasePath)
        window.sessionStorage.setItem('elapsedTime',time)
    }
    else
    {
        window.sessionStorage.setItem("levelTotalTime",time)
        window.sessionStorage.removeItem('phasePath')
        window.sessionStorage.removeItem('elapsedTime')
    }
}

/**
 * Exiba e atualize o timer no formato HH:MM:SS na tag "timer" no arquivo HTML da fase. Esta função só funcionará se houver uma tag HTML na fase que tenha um id de "timer".
 * @example
 * <div id="timer">
 * </div>
 * @param {number} time - A hora que será exibida.
 */
export function displayTime(time)
{
    let timerDisplay = document.getElementById("timer")
    let hour = Math.floor(time / 3600)
    let min = Math.floor(time / 60)
    let seg = Math.floor(time % 60)
    timerDisplay.innerText = `Tempo: ${hour < 10 ? '0' + hour : hour}:${(min < 10 ? '0' + min : min)}:${(seg < 10 ? '0' + seg : seg)}`
}
