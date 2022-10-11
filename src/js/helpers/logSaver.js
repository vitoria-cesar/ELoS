const FORM_ACCESS = 'https://docs.google.com/forms/d/e/1FAIpQLSfmjz18LA6e5D3miUTHwSCF_kqlvb4J8w7r9kroEIMpF238uA/formResponse'

/**
 * Send a log with the help of a embeded GF, it normally shows a CORS errors, but it sends the data anyway
 * @async
 * @param {Array<Array<string>>} data - The data that will be sent to the form
 * @returns {Promise<boolean>}
 */
export async function saveLog(data)
{
    let xhr = new XMLHttpRequest()
    xhr.open('POST',FORM_ACCESS,true)

    let formData = new FormData()
    for(let i = 0; i < data.length;i++)
    {
        formData.append(data[i][0],data[i][1])
    }

    xhr.send(formData)

    return true
}

