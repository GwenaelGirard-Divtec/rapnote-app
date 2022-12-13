<template>
    <Charging v-if="this.$store.state.chargingState"></Charging>
  <router-view/>
</template>

<script>
import Charging from "@/components/Charging";

export default {
    name: 'App',
    components: {
        Charging
    }
}
</script>

<style lang="scss">
* {
    font-family: "Poppins", sans-serif;
    box-sizing: border-box;
}

body {
    background-color: $white;
    margin: 0;
    color: $black;
}

h2, h3 {
    margin-bottom: 0;
}

i {
    --icon-size: 24px;
    font-family: 'Material Symbols Outlined',sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: var(--icon-size);
    aspect-ratio: 1;
    width: var(--icon-size);
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    font-variation-settings:
            'FILL' 1,
            'wght' 500,
            'GRAD' -25,
            'opsz' 48;
    user-select: none;
    user-focus: none;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';

    &[small] {
        --icon-size: 20px;
    }

    &[large] {
        --icon-size: 28px;
    }

    &[filled] {
        font-variation-settings:
                'FILL' 1,
                'wght' 500,
                'GRAD' -25,
                'opsz' 48;
    }
}

section {
    padding: 16px;
}

.turning {
    animation: turning 1s linear infinite;
}

@keyframes turning {
    from {transform: rotate(0)}
    to {transform: rotate(360deg)}
}
</style>