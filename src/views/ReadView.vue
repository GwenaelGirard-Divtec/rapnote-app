<template>
    <section class="edit" v-if="this.$store.state.currentNote">

        <div class="header">

            <Button primary class="back-btn" @click="this.$router.push('/')"><i>chevron_left</i></Button>

            <div class="wrapper">
                <div class="title">
                    <input v-if="!this.editNameState" readonly class="note-title" :value="this.$store.state.currentNote.titre">
                </div>
                <Button class="title-edit-btn" square v-if="!this.editNameState" @click="this.goToEdit">
                    <i>edit</i>
                </Button>
            </div>
        </div>

        <instrumental-player readonly :link="this.$store.state.currentNote.instrumental"></instrumental-player>

        <div id="toolbar">
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
    name: "ReadView",

    components: {
        QuillEditor,
        Button,
        InstrumentalPlayer
    },

    data() {
        return {
            editNameState: false,

            options: {
                debug: 'info',
                placeholder: 'Commencer à écrire...',
                readOnly: true,
                theme: 'snow'
            },
        }
    },

    computed: {
        getCurrentContent() {
            return this.$store.state.currentContent;
        },
    },

    methods: {
        goToEdit() {
            this.$router.push('/edit/' + this.$route.params.id);
        }
    },

    mounted() {
        this.$store.dispatch('getOneNote', this.$route.params.id)
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