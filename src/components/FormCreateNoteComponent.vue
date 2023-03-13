<template>
    <form class="form">
        <div class="form-image">
            <label :for="getImageId" ></label>
            <input @change="setImage" type="file" :id="getImageId"  accept=".jpg,.jpeg,.png">
            <img 
                v-show="isShowImage" 
                :ref="getImageId" 
                class="form-image-block"
            >
        </div>
        <div class="form-group">
            <div class="form-item">
                <input v-model="form.title" type="text" placeholder="Заголовок" class="input">
            </div>
            <div class="form-item">
                <textarea 
                    v-model="form.description" 
                    cols="30" 
                    rows="10" 
                    placeholder="Описание"
                    class="input textarea"
                ></textarea>
            </div>
            <div class="form-buttons">
                <button @click.prevent="sendForm" class="form-button button">Сохранить</button>
                <button 
                    v-if="note" 
                    @click.prevent="closeEdit" 
                    class="form-button button"
                >Отмена</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'FormCreateNoteComponent',

    props: {
        note: {
            type: Object,
            default: null,
        },
    },

    data: () => ({
        isShowImage: false,

        form: {
            title: '',
            description: '',
            image: null,
        },
    }),

    computed: {
        getImageId() {
            return this.note ? `formImageBlock-${this.note.id}` : 'formImageBlock'
        },
    },

    created() {
        if (this.note) {
            Object.assign(this.form, this.note)

            this.setStartImage()
        }
    },

    methods: {
        setStartImage() {
            let reader = new FileReader()

            reader.onload = (e) => {
                this.$refs[`formImageBlock-${this.note.id}`].src = e.target.result
            }

            reader.readAsDataURL(this.note.image)   
            
            this.isShowImage = true
        },

        setImage(e) {
            const image = e.target.files[0]

            this.form.image = image

            let reader = new FileReader()

            reader.onload = (e) => {
                if (this.note) {
                    this.$refs[`formImageBlock-${this.note.id}`].src = e.target.result
                } else {
                    this.$refs[`formImageBlock`].src = e.target.result
                }
            }

            reader.readAsDataURL(image)    

            this.isShowImage = true
        },

        sendForm() {
            this.$emit('send', this.form)

            this.clearForm()
        },

        clearForm() {
            this.form = {
                title: '',
                description: '',
                image: null,
            }

            this.isShowImage = false
        },
    }
}
</script>