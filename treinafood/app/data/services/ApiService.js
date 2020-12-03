const api = 'http://192.168.15.60:3002/api/treinafood/';

export const ApiService = {
    get(endpoint){
        return fetch(`${api}${endpoint}`)
            .then(response => response.json())
    },
    post(endpoitn, data){
        return fetch(`${api}${endpoitn}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
    }
}