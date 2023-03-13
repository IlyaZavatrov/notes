export function openRequest() {
    let openRequest = null
    
    return new Promise((resolve, reject) => {
        if (openRequest) {
            return resolve(openRequest)
        }

        const request = indexedDB.open('notes_bg', 1)

        request.onsuccess = (e) => {
            openRequest = e.target.result
            resolve(openRequest)
        }

        request.onupgradeneeded = (e) => {
            let db = e.target.result
            db.createObjectStore('notes', { autoIncrement: true, keyPath: 'id' })
        }       
        
        request.onerror = (e) => {
            reject(e)
        }
    })
}