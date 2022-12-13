<template>
    <div class="instrumental-player" v-if="this.link !== null && !this.editMode">
        <Button v-if="!this.readonly" square @click="toggleEditMode" class="edit"><i>settings</i></Button>
        <div class="video-controls">
            <div class="background">
                <Button primary class="play-btn" v-if="!this.isPlaying" square @click="playCurrentVideo">
                    <i>play_circle</i></Button>
                <Button primary class="pause-btn" v-else square @click="pauseCurrentVideo"><i>pause_circle</i></Button>
                <Button primary class="stop-btn" square @click="stopCurrentVideo"><i>stop_circle</i></Button>
            </div>
        </div>
        <YoutubeVue3 style="border-radius: 10px; padding: 4px;" ref="youtube" :videoid="this.videoId" :height="200" controls="2"
                     @paused="onPaused" @played="onPlayed"/>
    </div>

    <div class="add-instrumental" v-else>
        <input type="text" placeholder="Lien de l'instrumental..." v-model="tempLink">
        <Button primary square @click="this.addInstrumental"><i>check</i></Button>
    </div>
</template>

<script>
import {YoutubeVue3} from 'youtube-vue3'
import Button from "@/components/Button";

export default {
    name: 'InstrumentalPlaer',
    data() {
        return {
            isPlaying: false,
            editMode: false,
            tempLink: "",
        }
    },

    props: {
        link: {
            type: String,
        },

        readonly: {
            type: Boolean,
            default: false,
        }
    },

    computed: {
        videoId() {
            return this.link !== null ? this.link.slice(-11) : null;
        }
    },

    components: {
        YoutubeVue3,
        Button,
    },
    methods: {
        applyConfig() {
            this.play = Object.assign(this.play, this.temp)
        },
        playCurrentVideo() {
            this.$refs.youtube.player.playVideo();
        },
        stopCurrentVideo() {
            this.$refs.youtube.player.pauseVideo();
            this.$refs.youtube.player.stopVideo();
        },
        pauseCurrentVideo() {
            this.$refs.youtube.player.pauseVideo();
        },
        onPaused() {
            console.log("## OnPaused")
            this.isPlaying = false;
        },
        onPlayed() {
            console.log("## OnPlayed")
            this.isPlaying = true;
        },

        toggleEditMode() {
            this.editMode = !this.editMode;
        },

        addInstrumental() {
            if (this.tempLink !== "") {
                if (this.tempLink !== this.link) {
                    this.$store.dispatch('updateInstrumental', {
                        id: this.$route.params.id,
                        instrumental: this.tempLink,
                    }).then(() => {
                        window.location.reload()
                    })
                } else {
                    this.toggleEditMode()
                }
            }
        },
    },

    mounted() {
        this.tempLink = this.link
    }
}
</script>

<style lang="scss" scoped>
.instrumental-player {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;

    .edit {
        position: absolute;
        top: 0;
        right: 0;
    }

    .video-controls {

        display: flex;
        justify-content: flex-end;
        position: fixed;
        bottom: 16px;
        left: 32px;
        right: 32px;
        z-index: 1000;

        .background {
            display: flex;
            gap: 16px;
            border-radius: $border-radius;
        }

        .play-btn, .pause-btn, .stop-btn {
            width: 40px;
        }
    }

    .player {
        aspect-ratio: 16/9;
        border-radius: $border-radius !important;
        overflow: hidden !important;
    }
}

.add-instrumental {
    display: flex;
    gap: 16px;

    input {
        border: none;
        outline: none;
        border-radius: $border-radius;
        padding-inline: 8px;
        width: 100%;
    }
}
</style>