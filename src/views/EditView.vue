<template>
    <section class="edit" v-if="this.$store.state.currentNote">

        <div class="header">

            <Button primary class="back-btn" @click="this.$router.push('/')"><i>chevron_left</i></Button>

            <div class="wrapper">
                <div class="title">
                    <input v-if="!this.editNameState" readonly class="note-title" :value="this.$store.state.currentNote.titre">
                    <input v-else v-model="this.$store.state.currentNote.titre" ref="nameInput"  class="name-input"
                           type="text" @toggle="this.myFunc">
                    <span class="note-saving-state">{{ this.getSaveState }}</span>
                </div>
                <Button class="title-edit-btn" square v-if="!this.editNameState" @click="this.editNameStateToggle">
                    <i>edit</i>
                </Button>
                <Button class="title-edit-btn" square primary v-else @click="this.editNameStateToggle">
                    <i>check</i>
                </Button>
            </div>
        </div>

        <instrumental-player :link="this.$store.state.currentNote.instrumental"></instrumental-player>

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
import InstrumentalPlayer from "@/components/InstrumentalPlayer";

export default {
    name: "EditView",

    components: {
        QuillEditor,
        Button,
        InstrumentalPlayer
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
    gap: 16px;
    padding-bottom: calc(56px + 32px)
}

.header {
    display: flex;
    gap: 16px;
    align-items: stretch;

    .back-btn {
        width: 50px;

        @media screen and (max-width: 600px) {
            font-size: 40px;
        }
    }

    .wrapper {
        flex: 1;
        display: flex;
        align-items: flex-start;
        gap: 16px;

        @media screen and (max-width: 600px) {
            align-items: center;
        }

        .title {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;

            .note-title {
                background: none;
                border-bottom: 2px solid $lightgray;
                border-top: none;
                border-left: none;
                border-right: none;
                line-height: 10px;
                outline: none;
                font-size: 2em;
                font-weight: bold;
                width: 100%;

                @media screen and (max-width: 600px) {
                    font-size: 1em;
                    border: none;
                }
            }

            .name-input {
                background: none;
                border-bottom: 2px solid $accent;
                border-top: none;
                border-left: none;
                border-right: none;
                line-height: 10px;
                outline: none;
                font-size: 2em;
                font-weight: bold;
                width: 100%;
            }

            .note-saving-state {
                font-family: 'Roboto Mono', monospace;
                color: $overlayblack;

                @media screen and (max-width: 600px) {
                    font-size: 0.8em;
                }
            }
        }

        .title-edit-btn {
            aspect-ratio: 1;
            width: 50px;

            @media screen and (max-width: 600px) {
                width: 40px;
                height: 40px;
            }
        }
    }
}

#toolbar {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding-inline: 0;

    button {
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: $border-radius;
    }
}
</style>