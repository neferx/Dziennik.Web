<template>
    <!-- <Card id="card" v-show="firstStageDone && selectedRole != 'Student'"> -->
    <Card id="card">
        <template #title>
            <h3 class="p-text-center">Register {{ selectedRole }}</h3>
        </template>
        <template #content>
            <form @submit.prevent="handleSubmit2(!v$.$invalid)" class="p-fluid">
                <div class="p-grid">
                    <div
                        v-if="
                            selectedRole == 'Teacher' ||
                            selectedRole == 'Parent'
                        "
                        class="p-field p-col-12 p-md-12"
                    >
                        <div class="p-float-label p-input-icon-left">
                            <i class="pi pi-phone" />
                            <InputText
                                id="telephoneNumber"
                                v-model="v$.telephoneNumber.$model"
                                :class="{
                                    'p-invalid':
                                        v$.telephoneNumber.$invalid &&
                                        submitted2,
                                }"
                            />
                            <label
                                for="name"
                                :class="{
                                    'p-error':
                                        v$.telephoneNumber.$invalid &&
                                        submitted2,
                                }"
                                >Telephone number*</label
                            >
                        </div>
                        <span v-if="v$.telephoneNumber.$error && submitted2">
                            <span
                                id="telephoneNumber-error"
                                v-for="(error, index) of v$.telephoneNumber
                                    .$errors"
                                :key="index"
                            >
                                <small v-if="index == 0" class="p-error">{{
                                    error.$message.replace(
                                        'Value',
                                        'Telephone number'
                                    )
                                }}</small>
                            </span>
                        </span>
                        <small
                            v-else-if="
                                (v$.telephoneNumber.$invalid && submitted2) ||
                                v$.telephoneNumber.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.telephoneNumber.required.$message.replace(
                                    'Value',
                                    'Telephone number'
                                )
                            }}</small
                        >
                    </div>

                    <div class="p-field p-col-12 p-md-6">
                        <Button type="button" label="Back" v-on:click="back" />
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <Button type="submit" label="Submit" />
                    </div>
                </div>
            </form>
        </template>
    </Card>
</template>

<script>
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { required, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Button from 'primevue/button'

export default {
    name: 'stageTwoB',
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            telephoneNumber: '',

            submitted2: false,
        }
    },
    components: {
        Card,
        InputText,
        Button,
    },
    computed: {
        selectedRole() {
            return this.$store.state.selectedRole
        },
    },
    mounted() {
        this.telephoneNumber = this.$store.state.telephoneNumber
    },
    methods: {
        back() {
            this.$store.commit('setTelephoneNumber', this.telephoneNumber)
            this.$store.commit('setFirstStageDone', false)
        },

        async handleSubmit2(isFormValid) {
            this.submitted2 = true

            this.$store.commit('setTelephoneNumber', this.telephoneNumber)

            if (!isFormValid) {
                console.log(this.v$)
                return
            }

            await this.register()
            console.log(this.selectedRole)
            if (this.selectedRole == 'Teacher') await this.addTeacher()
            if (this.selectedRole == 'Parent') await this.addParent()
            this.$router.push({ path: '/' })
            //this.toggleDialog();
        },
        async register() {
            if (this.v$.$invalid) return
            await fetch(`http://localhost:3000/v1/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.$store.state.email,
                    password: this.$store.state.password,
                    name: this.$store.state.name,
                    lastname: this.$store.state.lastname,
                    role: this.$store.state.selectedRole,
                }),
            })
                .then((Response) => {
                    if (Response.status == 401) {
                        throw new Error('Invalid credentials')
                    } else if (Response.status == 400) {
                        throw new Error('Invalid data')
                    } else if (Response.status == 409) {
                        throw new Error('Email is already taken')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    if (Response.status == 200) console.log('ok')
                    console.log('Created User')
                    this.id = Response.user.id

                    return Response.json()
                })

                .catch((error) => {
                    this.errorMessage = error.message
                })
        },

        async addParent() {
            if (this.v$.$invalid) return
            await fetch(`http://localhost:3000/v1/addNewParent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idParent: this.id,
                    telephoneNumber: this.telephoneNumber,
                }),
            })
                .then((Response) => {
                    if (Response.status == 401) {
                        throw new Error('Invalid credentials')
                    } else if (Response.status == 400) {
                        throw new Error('Invalid data')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    if (Response.status == 200) console.log('ok')
                    console.log(Response)

                    return Response.json()
                })
                .catch((error) => {
                    this.errorMessage = error.message
                })
        },
        async addTeacher() {
            if (this.v$.$invalid) return
            await fetch(`http://localhost:3000/v1/addNewTeacher`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idTeacher: this.id,
                    telephoneNumber: this.telephoneNumber,
                }),
            })
                .then((Response) => {
                    if (Response.status == 401) {
                        throw new Error('Invalid credentials')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    if (Response.status === 200) console.log('ok')
                    console.log(Response)
                    return Response.json()
                })
                .then((Response) => {
                    if (Response.status == 400) {
                        throw new Error('Invalid data')
                    } else return Response.json()
                })
                .catch((error) => {
                    this.errorMessage = error.message
                })
        },
    },
    validations() {
        return {
            telephoneNumber: {
                required,
                numeric,
            },
        }
    },
}
</script>

<style lang="scss" scoped>
#card {
    background-color: #fafafa;
}
.p-inputtext {
    background-color: #fafafa;
}
</style>
