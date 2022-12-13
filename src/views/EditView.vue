<template>
    <section class="edit" v-if="this.$store.state.currentNote">

        <div class="header">

            <Button primary class="back-btn" @click="this.$router.push('/')"><i>chevron_left</i></Button>

            <div class="wrapper">
                <div class="title">
                    <span v-if="!this.editNameState" class="note-title">{{ this.$store.state.currentNote.titre }}</span>
                    <input v-else v-model="this.$store.state.currentNote.titre" ref="nameInput"  class="name-input"
                           type="text" @toggle="this.myFunc">
                    <Button square v-if="!this.editNameState" @click="this.editNameStateToggle">
                        <i>edit</i>
                    </Button>
                    <Button square primary v-else @click="this.editNameStateToggle">
                        <i>check</i>
                    </Button>
                </div>
                <span class="note-saving-state">{{ this.getSaveState }}</span>
            </div>
        </div>

        <div id="toolbar">
            <div class="ql-formats-wrapper">
              <span class="ql-formats">
                  <button type="button" class="ql-bold"><i>close</i></button>
                  <button type="button" class="ql-italic"></button>
                  <button type="button" class="ql-underline"></button>
                  <button type="button" class="ql-strike"></button>
              </span>

                <span class="ql-formats">
                  <button type="button" class="ql-blockquote"></button>
              </span>

                <span class="ql-formats">
                  <button type="button" class="ql-header" value="1"></button>
                  <button type="button" class="ql-header" value="2"></button>
              </span>

                <span class="ql-formats">
                  <button type="button" class="ql-list" value="ordered"></button>
                  <button type="button" class="ql-list" value="bullet"></button>
              </span>

                <span class="ql-formats">
                  <button type="button" class="ql-clean"></button>
              </span>
            </div>
            <button class="primary ql-custom" @click="saveCurrentNote">
                <i v-if="this.$store.state.saveChargingState" class="turning">autorenew</i>
                <i v-else>save_as</i>
            </button>
        </div>
        <QuillEditor theme="snow" v-model:content="this.$store.state.currentContent" toolbar="#toolbar" :options="options"/>
    </section>


</template>

<script>
import {QuillEditor} from '@vueup/vue-quill'
import '@/style/vue-quill.snow.scss';
import Button from "@/components/Button";

export default {
    name: "NewEditView",

    components: {
        QuillEditor,
        Button,
    },

    watch: {
        getCurrentContent() {
            this.$store.state.currentNote.contenu = JSON.stringify(this.$store.state.currentContent)
        },

        getIsCurrentNoteSaved() {
            if(!this.getIsCurrentNoteSaved) {
                this.savingInterval = setInterval(() => {
                    this.saveCurrentNote()
                }, 10000)
            } else {
                clearInterval(this.savingInterval)
            }
        }
    },

    data() {
        return {
            editNameState: false,

            savingInterval: null,

            options: {
                debug: 'info',
                placeholder: 'Commencer à écrire...',
                readOnly: false,
                theme: 'snow'
            },
        }
    },

    computed: {

        getCurrentContent() {
            return this.$store.state.currentContent;
        },

        getIsCurrentNoteSaved() {
            return this.$store.getters.isCurrentNoteSaved
        },

        getSaveState() {
            let message = ""

            if (this.$store.state.saveChargingState) {
                message = "enregistrement..."
            } else {
                if (this.$store.getters.isCurrentNoteSaved) {
                    message = "enregistré"
                } else {
                    message = "modifié"
                }
            }

            return message
        }
    },

    methods: {
        saveCurrentNote() {
            this.editNameState = false;
            if(this.$store.getters.isCurrentNoteSaved === false) {
                this.$store.commit('setCurrentNote', this.$store.state.currentNote)
                this.$store.dispatch('updateNote',this.$store.state.currentNote)
            }
        },

        editNameStateToggle() {
            this.editNameState = !this.editNameState

            if(this.editNameState) {
                setTimeout(() => {
                    this.$refs.nameInput.focus();
                }, 100)
            }
        }
    },

    mounted() {
        this.$store.dispatch('getOneNote', this.$route.params.id)

        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveCurrentNote()
            }

            if(e.key === 'Escape') {
                this.$router.push('/')
            }
        })
    },

    unmounted() {
        this.$store.state.currentNote = null;
        this.$store.state.referenceNote = null;
        this.$store.state.currentContent = null;
    }
}
</script>

<style lang="scss" scoped>

section {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    display: flex;
    gap: 16px;
    align-items: flex-start;

    .wrapper {
        flex: 1;

        .title {
            display: flex;
            align-items: center;
            gap: 16px;
            justify-content: flex-start;

            .note-title {
                font-size: 2em;
                font-weight: bold;
            }

            .name-input {
                background: none;
                border: none;
                font-size: 2em;
                font-weight: bold;
                width: 100%;
            }

        }

        .note-saving-state {
            font-family: 'Roboto Mono', monospace;
            color: $overlayblack;
        }
    }
}

#toolbar {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding-inline: 0;
}
</style>