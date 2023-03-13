<template>
    <div class="note">
        <img :ref="`image-note-${note.id}`" class="note-image">
        <div class="note-data">
            <span class="note-title">{{ note.title }}</span>
            <p class="note-description">{{ note.description }}</p>
            <div class="note-buttons">
                <button @click.prevent="editNote" class="note-button button">Редактировать</button>
                <button @click.prevent="deleteNote" class="note-button button">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoteComponent',

    props: {
        note: {
            type: Object,
            required: true,
        },
    },

    created() {
        this.getImage()
    },

    methods: {
        editNote() {
            this.$emit('edit', this.note)
        },

        deleteNote() {
            this.$emit('delete', this.note)
        },

        getImage() {
            let reader = new FileReader()

            reader.onload = (e) => {
                this.$refs[`image-note-${this.note.id}`].src = e.target.result
            }

            reader.readAsDataURL(this.note.image)       
        },  
    },
}
</script>