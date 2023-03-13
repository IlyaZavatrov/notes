import { openRequest } from './base.js'

export const getNotes = async () => {
    const db = await openRequest()

    return new Promise((resolve, reject) => {
        try {
            const notes = []

            let trans = db.transaction(['notes'], 'readonly')

            trans.oncomplete = () => {
                resolve(notes)
            }
    
            const store = trans.objectStore('notes')


            store.openCursor().onsuccess = (e) => {
                const cursor = e.target.result

                if (cursor) {
                    notes.push(cursor.value)
                    cursor.continue()
                }
            }
        } catch (error) {
            reject(error)
        }
    })    
}

export const createNote = async (note) => {
    const db = await openRequest()

    return new Promise((resolve, reject) => {
        try {
            let trans = db.transaction(['notes'], 'readwrite')

            trans.oncomplete = () => {
                resolve()
            }

            let store = trans.objectStore('notes')
            store.put(note)
        } catch (error) {
            reject(error)
        }
    })   
}

export const deleteNote = async (note) => {
    const db = await openRequest()

    return new Promise((resolve, reject) => {
        try {
            let trans = db.transaction(['notes'], 'readwrite')

            trans.oncomplete = () => {
                resolve()
            }

            let store = trans.objectStore('notes')
            store.delete(note.id)
        } catch (error) {
            reject(error)
        }
    })   
}