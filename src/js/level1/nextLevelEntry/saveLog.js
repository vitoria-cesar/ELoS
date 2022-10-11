import { saveLog } from "../../helpers/logSaver"

/**
 * A function to configure the modal to save the logs on our drive. The modal has to be implemented in the HTML file and has to have the exact tags below for this function to work.
 * You also have to toggle the final phase mode of the 'setTimeForNextPhase' for the modal be configured, otherwise, the will be redirected to the beggining page.
 * If the upload was successful, the page will be redirected to a desired page. If not, an alert will indicate that something got wrong.
 * @example
 * <input type="text" name="name" id="name" class="form-control">
 * <input type="number" name="age" id="age" class="form-control">
 * <button id="subBtn" type="button" class="btn btn-primary">Avançar</button>
 * @example
 * setTimeForNextPhase('/',getTotalTime(sceneProperties.phaseTimer.getElapsedTime()),true)
 * @param {string} redirectPath - The desired path you wish to redirect the page after the log was uploaded.
 * @param {string} level - Specify the level you wish to save logs
 */
export function configureSaveLogModal(redirectPath,level)
{
    if(window.sessionStorage.getItem('levelTotalTime'))
    {
        let totalTime = parseFloat(window.sessionStorage.getItem('levelTotalTime'))
        let hour = Math.floor(totalTime / 3600)
        let min = Math.floor(totalTime / 60)
        let seg = Math.floor(totalTime % 60)
        var subBtn = document.getElementById("subBtn")
        subBtn.addEventListener('click',async function(e){
            let name = document.getElementById('name').value
            let age = document.getElementById('age').value
            if((name != null && name != '') && (age != null && age!= ''))
            {
                if(parseFloat(age) >= 1)
                {
                    subBtn.disabled = true
                    let data = [
                        ['entry.1024803259',level],
                        ['entry.1819434138',name],
                        ['entry.224960797',age],
                        ['entry.294513867',`${hour < 10 ? '0' + hour : hour}:${(min < 10 ? '0' + min : min)}:${(seg < 10 ? '0' + seg : seg)}`]
                    ]
                    let success = await saveLog(data)
                    if(success)
                    {
                        window.location.href = redirectPath
                    }
                    else
                    {
                        alert("Ops! Algo deu errado!")
                        subBtn.disabled = false
                    }
                }
                else
                {
                    alert("Valor da idade incorreto.")
                }
            }
            else
            {
                alert("É necessário preencher o formulário para avançar.")
            }
        })
    }
    else
    {
        window.location.href = "../../"
    }
}