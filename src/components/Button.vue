<template>
<button>
    <slot></slot>
</button>
</template>

<script>
export default {
    name: "Button",
}
</script>

<style scoped lang="scss">

$small-btn: (icon-size: small, square-padding: 2px, padding: 2px 4px);
$medium-btn: (icon-size: medium, square-padding: 4px, padding: 4px 8px);
$large-btn: (icon-size: large, square-padding: 8px, padding: 8px 16px);


button {
    background-color: $midgray;
    margin: 0;
    border: none;
    box-sizing: border-box;
    border-radius: $border-radius;
    color: $black;
    transition: all 100ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
        color: $white;
    }

    &[primary] {
        background-color: $accent;
        color: $white;

        &:hover {
            background-color: $lightaccent;
        }
    }

    &[square] {
        aspect-ratio: 1;

        &[rounded] {
            border-radius: 1000px;
        }
    }

    &:hover {
        background-color: lightgray;
    }

    &:active {
        transform: scale(0.9);
    }
}
</style>