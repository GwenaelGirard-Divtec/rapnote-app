<template>
    <div class="video-holder">
        <div class="video-controls">
            <div class="background">
                <Button primary class="play-btn" v-if="!this.isPlaying" square @click="playCurrentVideo"><i>play_circle</i></Button>
                <Button primary class="pause-btn" v-else square @click="pauseCurrentVideo"><i>pause_circle</i></Button>
                <Button primary class="stop-btn" square @click="stopCurrentVideo"><i>stop_circle</i></Button>
            </div>
        </div>
        <YoutubeVue3 class="player" ref="youtube" :videoid="playId" :width="360" :height="150" controls="2"
                     @ended="onEnded" @paused="onPaused" @played="onPlayed"/>
    </div>
</template>

<script>
import { YoutubeVue3 } from 'youtube-vue3'
import Button from "@/components/Button";

export default {
    name: 'VideoHolder',
    data() {
        return {
            tempId: "3P1CnWI62Ik",
            playId : "3P1CnWI62Ik",
            isPlaying: false,
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
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>