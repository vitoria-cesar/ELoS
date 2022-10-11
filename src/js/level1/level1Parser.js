/**
 * An array of objects with the regex of the available functions for the user and the type of treatment the parser will do to the functions.
 * Types: "sequential" stands for functions that has can't be executed synchronously with other functions;
 * "normal" stands for execute the function without a previous treatment.
 */
const functionFilter = [
    {
        filter: new RegExp('^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'normal'
    }
]

/**
 * This function will print an error message on the phase console, indicating the code and line. This function will only work on a HTML tag that has "console-printing" id.
 * @example
 * <div id="console-printing">
 * </div>
 * @param {string} content - The line content that the error ocurred.
 * @param {number} line - The line number that the error ocurred.
 */
function printErrorOnConsole(content,line)
{
    let consoleToPrint = document.getElementById("console-printing")
    consoleToPrint.innerHTML += `Código Inválido:<br> ${content} linha: ${line}<br>`
}

/**
Analisa o código digitado pelo usuário. Se for válido, retorna uma string processada com o código pronto para ser executado. Se não, retorna null. 
* @param {string} code - O código digitado pelo usuário.
 * @returns {string | null}
 */
export function parseCode(code)
{
    let codeParsed = "async function runCode(){\n";
    let lines = code.split('\n')
    let valid = true
    for(let i = 0;i < lines.length;i++)
    {
        let validLine = false
        let lineType
        if(lines[i].trim() != "")
        {
            for(let j = 0;j < functionFilter.length;j++)
            {
                validLine = functionFilter[j].filter.test(lines[i].trim())
                if(validLine)
                {
                    lineType = functionFilter[j].type   
                    break
                }
            }
            if(validLine)
            {
                if(lineType === "sequential")
                {
                    let lineParsed = "await " + lines[i].trim() + "\n"
                    codeParsed += lineParsed
                }
                else
                {
                    let lineParsed = lines[i].trim() + "\n"
                    codeParsed += lineParsed   
                }
            }
            else
            {
                printErrorOnConsole(lines[i],i+1)
                valid = false
                break
            }
        }
        else
        {
            continue
        }
    }

    if(valid)
    {
        codeParsed += "}\nrunCode()"
        return codeParsed
    }
    else
    {
        return null
    }
}