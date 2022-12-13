<template>
<div class="charging-background">
    <i class="turning">autorenew</i>
</div>
</template>

<script>
export default {
    name: "Charging"
}
</script>

<style scoped lang="scss">
.charging-background {
    z-index: 90000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparentize($white, .5);
    display: flex;
    align-items: center;
    justify-content: center;

    i {
        font-size: 100px;
        width: 100px;
    }
}


</style>