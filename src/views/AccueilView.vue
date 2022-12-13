<template>
    <section class="page">

        <h2 class="site-title">RapNote</h2>

        <Button primary class="add-note-btn" @click="this.$store.dispatch('createBlankNote')" square rounded><i>add</i></Button>

        <div class="notes" v-if="this.$store.state.notes !== null">
            <div class="note" v-for="note in this.sortedNotes">
                <div class="wrapper">
                    <div class="left" @click="this.$router.push('/read/'+note.id)">
                        <span class="title">{{note.titre}}</span>
                        <div class="save_date"><i small>save</i><span>{{this.formatDate(new Date(note.updated_at))}}</span></div>
                    </div>
                    <div class="right" @click="this.$router.push('/edit/'+note.id)">
                        <i class="edit">edit</i>
                    </div>
                </div>
                <Button square rounded class="delete-btn" @click="this.$store.dispatch('deleteNote', note.id)"><i>close</i></Button>
            </div>
        </div>
    </section>
</template>

<script>

import Button from "@/components/Button";
export default {
    name: 'AccueilView',
    components: {Button},

    computed: {
        sortedNotes() {
            return this.$store.state.notes.sort((a, b) => {
                const dateA = new Date(a.updated_at);
                const dateB = new Date(b.updated_at);

                return dateB - dateA;
            })
        }
    },

    methods: {
            formatDate(date) {
            let formatedDate = ""

            if(date instanceof Date) {
                formatedDate = `${this.twoDigit(date.getDay())}.${this.twoDigit(date.getMonth()+1)}.${date.getFullYear()}
                                ${this.twoDigit(date.getHours())}:${this.twoDigit(date.getMinutes())}`
            }

            return formatedDate
        },

        twoDigit(num) {
            return num.toString().length === 1 ? '0' + num : num;
        },
    },

    mounted() {
        this.$store.dispatch('getAllNotes')
    }
}
</script>

<style lang="scss">

section.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .site-title {
        font-size: 3em;
    }

    .add-note-btn {
        margin-block: 32px 48px;
        position: sticky;
        top: 16px;
        width: 40px;
    }
}

.notes {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    max-width: 600px;
    width: 100%;

    .note {
        border-radius: $border-radius;
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;

        .wrapper {
            background-color: darken($white, 3%);
            border-radius: $border-radius;
            display: flex;
            align-items: stretch;
            width: 100%;
            position: relative;
            overflow: hidden;

            .left {
                padding: 16px;
                width: calc(100% - 50px);

                .title {
                    font-size: 1.5em;
                    font-weight: bold;
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: clip ellipsis;
                }

                .save_date {
                    color: $overlayblack;
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    span {
                        display: block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: clip ellipsis;
                    }
                }
            }

            .right {
                width: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: darken($white, 3%);
                border-left: 2px solid $midgray;

                i {
                    transition: all 100ms ease-in-out;
                }

                &:hover {
                    background-color: $lightgray;
                    i {
                        transform: scale(1.1);
                        transform-origin: center;
                    }
                }

                &:active {
                    i {
                        transform: scale(0.9);
                        transform-origin: center;
                    }
                }
            }
        }

        .delete-btn {
            vertical-align: center;
            margin-inline: 16px;
            width: 40px;
        }

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
