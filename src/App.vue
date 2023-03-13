<template>
    <div id="app">
        <div class="wrapper">
            <div class="wrapper-block">
                <div class="notes">
                    <FormCreateNoteComponent @send="saveForm" />
                    <template v-for="note in notes" >
                        <NoteComponent 
                            v-if="!isEditNote(note.id)"
                            @edit="editNote"
                            @delete="deleteForm"
                            :key="`note-${note.id}`" 
                            :note="note"
                        />
                        <FormCreateNoteComponent 
                            v-else 
                            @send="saveForm" 
                            @close-edit="closeEdit"
                            :key="`edit-note-${note.id}`" 
                            :note="note"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getNotes, createNote, deleteNote } from '@/api/notes.js'

import FormCreateNoteComponent from '@/components/FormCreateNoteComponent.vue'
import NoteComponent from '@/components/NoteComponent.vue'

export default {
    name: 'App',

    components: {
        FormCreateNoteComponent,
        NoteComponent,
    },

    data: () => ({
        notes: [],

        editNotes: [],
    }),

    created() {
        this.getData()
    },

    methods: {
        async getData() {
            try {
                this.notes = await getNotes()
            } catch (error) {
                console.error(error);
            }
        },

        async saveForm(form) {
            try {
                await createNote(form)
                await this.getData()

                if (this.isEditNote(form.id)) {
                    this.closeEdit(form)
                }

            } catch (error) {
                console.error(error);
            }
        },

        async deleteForm(note) {
            try {
                await deleteNote(note)
                await this.getData()
            } catch (error) {
                console.error(error);
            }
        },

        editNote(note) {
            this.editNotes.push(note)
        },

        isEditNote(id) {
            return !!this.editNotes.find(item => item.id === id)
        },  

        closeEdit(note) {
            this.editNotes = this.editNotes.filter(item => item.id != note.id)
        },  
    },
}
</script>
