import {createStore} from 'vuex'
import axios from "axios";
import router from "@/router";
import {toRaw} from "vue";

export default createStore({
    state: {
        notes: null,
        currentNote: null,
        referenceNote: null,
        currentContent: null,
        chargingState: true,
        saveChargingState: false,
    },

    getters: {
        isCurrentNoteSaved(state) {
            return JSON.stringify(state.currentNote).replace(/\s+/g, '') === JSON.stringify(state.referenceNote).replace(/\s+/g, '')
        }
    },

    mutations: {
        setAllNotes(state, notes) {
            state.notes = notes;
            this.commit('setChargingState', false)
        },

        setCurrentNote(state, note) {
            state.currentNote = note;
            state.referenceNote = { ...note};
            state.currentContent = JSON.parse(note.contenu)
            console.log(toRaw(state.currentNote))
            this.commit('setChargingState', false)
        },

        setChargingState(state, newCharginState) {
            state.chargingState = newCharginState;
        },

        setSaveChargingState(state, newSaveCharginState) {
            state.saveChargingState = newSaveCharginState;
        }
    },
    actions: {
        getAllNotes({commit}) {
            commit('setChargingState', true)
            axios.get('http://localhost:8000/api/notes')
                    .then(response => {
                        console.log(response.data)
                        commit('setAllNotes', response.data)
                    })
        },

        getOneNote({commit}, id) {
            commit('setChargingState', true)
            axios.get('http://localhost:8000/api/notes/' + id)
                    .then(async response => {
                        console.log(response.data)
                        commit('setCurrentNote', response.data)
                    })
        },

        updateNote({commit}, newNote) {
            commit('setSaveChargingState', true)
            axios.put('http://localhost:8000/api/notes/' + newNote.id, newNote)
                    .then(response => {
                        console.log(response.data)
                        commit('setSaveChargingState', false)
                    })
        },

        createBlankNote({dispatch, commit}) {

            commit('setChargingState', true)

            axios.post('http://localhost:8000/api/notes')
                    .then(response => {
                        dispatch('getAllNotes')
                        console.log(response.data)
                        router.push('/edit/' + response.data.id)
                        commit('setChargingState', false)
                    })
        },

        deleteNote({dispatch, commit}, id) {
            commit('setChargingState', true)
            axios.delete('http://localhost:8000/api/notes/' + id)
                    .then(response => {
                        dispatch('getAllNotes')
                    })
                    .catch(err => {
                        console.error(err)
                    })
        },

        async updateInstrumental({dispatch, commit}, options) {
            commit('setChargingState', true)
            return axios.put(`http://localhost:8000/api/notes/${options.id}/instrumental`, {
                "instrumental": options.instrumental,
            })
                    .then(response => {
                        console.log(response.data)
                        commit('setChargingState', false)
                    })
        }

    },
    modules: {}
})
