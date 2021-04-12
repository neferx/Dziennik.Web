import { createStore } from 'vuex'

export default createStore({
    state: {
        name: '',
        lastname: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        selectedRole: '',
        firstStageDone: null,
        pesel: null,
        city: '',
        street: '',
        buildingNumber: null,
        telephoneNumber: null,
        test: 'test',
    },
    mutations: {
        setName(state, payload) {
            state.name = payload
        },
        setLastName(state, payload) {
            state.lastname = payload
        },
        setEmail(state, payload) {
            state.email = payload
        },
        setEmailConfirm(state, payload) {
            state.emailConfirm = payload
        },
        setPassword(state, payload) {
            state.password = payload
        },
        setPasswordConfirm(state, payload) {
            state.passwordConfirm = payload
        },
        setSelectedRole(state, payload) {
            state.selectedRole = payload
        },
        setFirstStageDone(state, payload) {
            state.firstStageDone = payload
        },
        setPesel(state, payload) {
            state.pesel = payload
        },
        setCity(state, payload) {
            state.city = payload
        },
        setStreet(state, payload) {
            state.street = payload
        },
        setBuildingNumber(state, payload) {
            state.buildingNumber = payload
        },
        setTelephoneNumber(state, payload) {
            state.telephoneNumber = payload
        },
        setTest(state, payload) {
            state.test = payload
        },
    },
    actions: {},
    modules: {},
    getters: {
        getTest(state) {
            return state.test
        },
    },
})
