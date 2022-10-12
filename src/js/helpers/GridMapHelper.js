import * as THREE from 'three'
import { degreeToRadians, printOnConsole } from './Util'

/**
 * Classe que cria e gerencia um NxN Gridded Square Plane, definindo dimensões, cores e obstáculos.
 */
export class GridMapHelper {
    
    /**
     * Cria um objeto "auxiliar de"
     * @param {number} [divisions=10] -Número de divisões que os eixos X e Z terão. O padrão é 10
     * @param {string} [divisionsColor="rgb(0,0,0)"] - Cor das linhas de divisão no plano. O padrão é "rgb(0,0,0)".
     * @param {string} [planeColor="rgb(200,200,200)"] -  Cor do plano. O padrão é "rgb(200.200.200)"
     */
    constructor(divisions = 10, divisionsColor = "rgb(0,0,0)", planeColor = "rgb(200,200,200)")
    {
        this.divisions = divisions
        this.divisionsColor = divisionsColor
        this.planeColor = planeColor
        this.initialX = (divisions - 1) * -1
        this.initialZ = (divisions - 1) * -1
        this.endX = divisions - 1
        this.endZ = divisions - 1
        this.obstacles = []
        this.traps = []
    }
    
    /**
     *Retorna o plano de malha previamente construído na classe.
     * @returns {THREE.Mesh<THREE.PlaneGeometry,THREE.MeshLambertMaterial>} 
     */
    createGridPlane()
    {
        let planeGeometry = new THREE.PlaneGeometry(this.getMultiplier()*this.divisions,this.getMultiplier()*this.divisions,this.divisions,this.divisions)

        let grid = new THREE.GridHelper(this.getMultiplier()*this.divisions,this.divisions,this.divisionsColor,this.divisionsColor)
        grid.rotateX(degreeToRadians(90))
        grid.translateY(0.02)

        let planeMaterial = new THREE.MeshLambertMaterial({color: this.planeColor, side: THREE.DoubleSide})

        let plane = new THREE.Mesh(planeGeometry,planeMaterial)
        plane.add(grid)
        plane.receiveShadow = true
        plane.rotateX(degreeToRadians(-90))

        return plane
    }

    /**
     * Obtenha a posição X global da cena com base na coordenada da grade.
     * @param {number} xcoord -Coordenada X da grade
     * @returns {number}
     */
    getGlobalXPositionFromCoord(xcoord)
    {
        let pos = this.initialX + this.getMultiplier()*xcoord
        return pos
    }

    /**
     * Obtenha a posição Z global da cena com base na coordenada da grade.
     * @param {number} zcoord - Coordenada Z da grade
     * @returns {number}
     */
    getGlobalZPositionFromCoord(zcoord)
    {
        let pos = this.initialZ + this.getMultiplier()*zcoord
        return pos
    }

    /**
     * Obtenha a coordenada X na grade com base na posição X global na cena.
     * @param {number} x - Posição global do X na cena.
     * @param {number} [mode=0] - O método pelo qual a função ajustará o número float para um inteiro.
     * Modos:
     * 0 significa redondo;
     * 1 arquibancada;
     * 2 significa teto.
     * O padrão é 0.
     * @returns {number} 
     */
    getXCoordFromGlobalPosition(x,mode = 0)
    {
        let coord
        if(mode == 1)
        {
            coord = Math.floor((Math.floor(x) - this.initialX)/this.getMultiplier())
        }
        else if(mode == 2)
        {
            coord = Math.ceil((Math.ceil(x) - this.initialX)/this.getMultiplier())   
        }
        else
        {
            coord = Math.round((Math.round(x) - this.initialX)/this.getMultiplier())    
        }
        return coord
    }

    /**
     * Get the Z coordinate in grid based on the global Z position in scene.
     * @param {number} z - Global Z position in scene.
     * @param {number} [mode=0] - The method that the function will adjust the float number to a integer. 
     * Modes:
     * 0 stands for round;
     * 1 stands floor; 
     * 2 stands for ceil. 
     * Default is 0.
     * @returns {number} 
     */
    getZCoordFromGlobalPosition(z,mode = 0)
    {
        let coord
        if(mode == 1)
        {
            coord = Math.floor((Math.floor(z) - this.initialZ)/this.getMultiplier())
        }
        else if(mode == 2)
        {
            coord = Math.ceil((Math.ceil(z) - this.initialZ)/this.getMultiplier())   
        }
        else
        {
            coord = Math.round((Math.round(z) - this.initialZ)/this.getMultiplier())
        }
        return coord   
    }

    /**
     * Get the multiplier of the global position to make the grid metrics.
     * @returns {2}
     */
    getMultiplier()
    {
        return 2
    }

    /**
     * Check if the X global position given is on the edge of the Grid Map.
     * @param {number} x - X global position.
     * @param {number} [mode] - The method that the function will adjust the float number to a integer. 
     * Modes:
     * 0 stands for round;
     * 1 stands floor; 
     * 2 stands for ceil. 
     * Default is 0. 
     * @returns {boolean}
     * @private
     */
    borderXOfMap(x,mode)
    {
        if(this.getXCoordFromGlobalPosition(x,mode) >= 0 && this.getXCoordFromGlobalPosition(x,mode) <= this.getXCoordFromGlobalPosition(this.endX))
        {
            return false
        }
        else
        {
            return true
        }
    }

    /**
     * Check if the Z global position given is on the edge of the Grid Map.
     * @param {number} z - Z global position.
     * @param {number} [mode] - The method that the function will adjust the float number to a integer. 
     * Modes:
     * 0 stands for round;
     * 1 stands floor; 
     * 2 stands for ceil. 
     * Default is 0. 
     * @returns {boolean}
     * @private
     */
    borderZOfMap(z,mode)
    {
        if(this.getXCoordFromGlobalPosition(z,mode) >= 0 && this.getXCoordFromGlobalPosition(z,mode) <= this.getXCoordFromGlobalPosition(this.endZ))
        {
            return false
        }
        else
        {
            return true
        }   
    }

    /**
     * Check if the actor reach one of the Map edges.
     * @param {THREE.Vector3} position - Current position of the actor.
     * @param {THREE.Vector3} newPosition - Destiny position of the actor.
     * @returns {boolean}
     * @private
     */
    borderMapCollision(position,newPosition)
    {
        let modeX = position.x >= newPosition.x ? 1 : 2
        let modeZ = position.z >= newPosition.z ? 1 : 2
        if(this.borderXOfMap(position.x,modeX)||this.borderZOfMap(position.z,modeZ))
        {
            return true
        }
        else
        {
            return false
        }
    }

    /**
     * * Remove os argumentos passados, se estiverem presentes.
     *
     * Lança uma DOMException "SyntaxError" se um dos argumentos for a string vazia.
     *
        Defina um espaço quadrangular que o ator não pode passar.
     * @param {number} minX - A menor coordenada X que o objeto cobrirá.
     * @param {number} maxX - A maior coordenada X que o objeto cobrirá.
     * @param {number} minZ - A menor coordenada Z que o objeto cobrirá.
     * @param {number} maxZ -A maior coordenada Z que o objeto cobrirá.
     */
    addObstacle(minX,maxX,minZ,maxZ)
    {
        this.obstacles.push(
            {
                minX: minX,
                maxX: maxX,
                minZ: minZ,
                maxZ: maxZ
            }
        )
    }

    /**
     * Check if the actor is in collision route with an obstacle.
     * @param {THREE.Vector3} position - Current position of the actor.
     * @param {THREE.Vector3} newPosition - Destiny position of the actor.
     * @param {Object} obstacle - Obstacle analised at the moment.
     * @param {number} obstacle.minX - The smallest X coordinate the object will cover. 
     * @param {number} obstacle.maxX - The largest X coordinate the object will cover.
     * @param {number} obstacle.minZ - The smallest Z coordinate the object will cover.
     * @param {number} obstacle.maxZ - The largest Z coordinate the object will cover.
     * @returns {boolean}
     * @private
     */
    obstacleCollision(position,newPosition,obstacle)
    {
        let positionXCoord = this.getXCoordFromGlobalPosition(position.x)
        let positionZCoord = this.getZCoordFromGlobalPosition(position.z)
        let newPositionXCoord = this.getXCoordFromGlobalPosition(newPosition.x)
        let newPositionZCoord = this.getZCoordFromGlobalPosition(newPosition.z)

        let nextPosX
        let nextPosZ
        if(positionXCoord < newPositionXCoord)
        {
            nextPosX = positionXCoord + 1
        }
        else if(positionXCoord > newPositionXCoord)
        {
            nextPosX = positionXCoord - 1
        }
        else
        {
            nextPosX = positionXCoord
        }

        if(positionZCoord < newPositionZCoord)
        {
            nextPosZ = positionZCoord + 1
        }
        else if(positionZCoord > newPositionZCoord)
        {
            nextPosZ = positionZCoord - 1
        }
        else
        {
            nextPosZ = positionZCoord
        }

        if((nextPosX < obstacle.minX || nextPosZ < obstacle.minZ) || (nextPosX > obstacle.maxX || nextPosZ > obstacle.maxZ))
        {
            return false
        }
        else
        {
            return true
        }
    }

    /**
     * Define uma coordenada que causa um game over (ou qualquer evento desejado) se o ator entrar.
     * @param {number} x - X Coordenada
     * @param {number} z - Z Coordenada
     */
    addTrap(x,z)
    {
        this.traps.push({
            x:x,
            z:z
        })
    }

    /**
     * Check if the actor stepped on a trap.
     * @param {THREE.Vector3} position - Current position of the actor.
     * @returns {boolean}
     */
    trapCollision(position)
    {
        for(let i = 0;i < this.traps.length;i++)
        {
            if(this.getXCoordFromGlobalPosition(position.x) == this.traps[i].x && this.getZCoordFromGlobalPosition(position.z) == this.traps[i].z)
            {
                return true
            }
            else
            {
                continue
            }
        }

        return false
    }

    /**
     * Check if the actor collided on the edge of the map or one of the obstacles.
     * @param {THREE.Vector3} position - Current position of the actor. 
     * @param {THREE.Vector3} newPosition - Destiny position of the actor.
     * @returns {boolean}
     */
    collisionTests(position,newPosition)
    {
        if(!this.borderMapCollision(position,newPosition))
        {
            for(let i = 0;i < this.obstacles.length;i++)
            {
                if(this.obstacleCollision(position,newPosition,this.obstacles[i]))
                {
                    let newPositionUpdate = new THREE.Vector3(this.getGlobalXPositionFromCoord(this.getXCoordFromGlobalPosition(position.x)),newPosition.y,this.getGlobalZPositionFromCoord(this.getZCoordFromGlobalPosition(position.z)))
                    printOnConsole("Aviso: Não é possível avançar mais por este caminho, seguindo para o próximo comando.")
                    return newPositionUpdate
                }
                else
                {
                    continue
                }
            }
            
            return newPosition
        }
        else
        {
            let newPositionUpdate = new THREE.Vector3(this.getGlobalXPositionFromCoord(this.getXCoordFromGlobalPosition(position.x)),newPosition.y,this.getGlobalZPositionFromCoord(this.getZCoordFromGlobalPosition(position.z)))
            printOnConsole("Aviso: Não é possível avançar mais por este caminho, seguindo para o próximo comando.")
            return newPositionUpdate   
        }
    }

}