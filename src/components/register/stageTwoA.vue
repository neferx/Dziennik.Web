<template>
    <!-- <Card id="card" v-show="firstStageDone && selectedRole == 'Student'"> -->
    <Card id="card">
        <template #title>
            <h3 class="p-text-center">Register {{ selectedRole }}</h3>
        </template>
        <template #content>
            <form @submit.prevent="handleSubmit2(!v$.$invalid)" class="p-fluid">
                <div class="p-grid">
                    <div
                        v-if="selectedRole == 'Student'"
                        class="p-field p-col-12 p-md-6"
                    >
                        <div class="p-float-label p-input-icon-left">
                            <i class="pi pi-users" />
                            <InputText
                                id="pesel"
                                v-model="v$.pesel.$model"
                                :class="{
                                    'p-invalid':
                                        v$.pesel.$invalid && submitted2,
                                }"
                                aria-describedby="pesel-error"
                            />
                            <label
                                for="pesel"
                                :class="{
                                    'p-error': v$.pesel.$invalid && submitted2,
                                }"
                                >PESEL*</label
                            >
                        </div>
                        <span v-if="v$.pesel.$error && submitted2">
                            <span
                                id="pesel-error"
                                v-for="(error, index) of v$.pesel.$errors"
                                :key="index"
                            >
                                <small v-if="index == 0" class="p-error">{{
                                    error.$message
                                        .replace('Value', 'PESEL')
                                        .replace('This field', 'PESEL')
                                }}</small>
                            </span>
                        </span>
                        <small
                            v-else-if="
                                (v$.pesel.$invalid && submitted2) ||
                                v$.pesel.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.pesel.required.$message.replace(
                                    'Value',
                                    'PESEL'
                                )
                            }}</small
                        >
                    </div>

                    <div
                        v-if="selectedRole == 'Student'"
                        class="p-field p-col-12 p-md-6"
                    >
                        <div class="p-float-label p-input-icon-left">
                            <i class="pi pi-home" />
                            <InputText
                                id="city"
                                v-model="v$.city.$model"
                                :class="{
                                    'p-invalid': v$.city.$invalid && submitted2,
                                }"
                                aria-describedby="city-error"
                            />
                            <label
                                for="city"
                                :class="{
                                    'p-error': v$.city.$invalid && submitted2,
                                }"
                                >City*</label
                            >
                        </div>
                        <span v-if="v$.city.$error && submitted2">
                            <span
                                id="city-error"
                                v-for="(error, index) of v$.city.$errors"
                                :key="index"
                            >
                                <small v-if="index == 0" class="p-error">{{
                                    error.$message.replace('Value', 'City')
                                }}</small>
                            </span>
                        </span>
                        <small
                            v-else-if="
                                (v$.city.$invalid && submitted2) ||
                                v$.city.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.city.required.$message.replace(
                                    'Value',
                                    'City'
                                )
                            }}</small
                        >
                    </div>

                    <div
                        v-if="selectedRole == 'Student'"
                        class="p-field p-col-12 p-md-6"
                    >
                        <div class="p-float-label p-input-icon-left">
                            <i class="pi pi-directions" />
                            <InputText
                                id="street"
                                v-model="v$.street.$model"
                                :class="{
                                    'p-invalid':
                                        v$.street.$invalid && submitted2,
                                }"
                                aria-describedby="street-error"
                            />
                            <label
                                for="street"
                                :class="{
                                    'p-error': v$.street.$invalid && submitted2,
                                }"
                                >Street*</label
                            >
                        </div>
                        <span v-if="v$.street.$error && submitted2">
                            <span
                                id="street-error"
                                v-for="(error, index) of v$.street.$errors"
                                :key="index"
                            >
                                <small v-if="index == 0" class="p-error">{{
                                    error.$message.replace('Value', 'Street')
                                }}</small>
                            </span>
                        </span>
                        <small
                            v-else-if="
                                (v$.street.$invalid && submitted2) ||
                                v$.street.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.street.required.$message.replace(
                                    'Value',
                                    'Street'
                                )
                            }}</small
                        >
                    </div>

                    <div
                        v-if="selectedRole == 'Student'"
                        class="p-field p-col-12 p-md-6"
                    >
                        <div class="p-float-label p-input-icon-left">
                            <i class="pi pi-inbox" />
                            <InputText
                                id="buildingNumber"
                                v-model="v$.buildingNumber.$model"
                                :class="{
                                    'p-invalid':
                                        v$.buildingNumber.$invalid &&
                                        submitted2,
                                }"
                                aria-describedby="buildingNumber-error"
                            />
                            <label
                                for="buildingNumber"
                                :class="{
                                    'p-error':
                                        v$.buildingNumber.$invalid &&
                                        submitted2,
                                }"
                                >Building number*</label
                            >
                        </div>
                        <span v-if="v$.buildingNumber.$error && submitted2">
                            <span
                                id="buildingNumber-error"
                                v-for="(error, index) of v$.buildingNumber
                                    .$errors"
                                :key="index"
                            >
                                <small v-if="index == 0" class="p-error">{{
                                    error.$message.replace(
                                        'Value',
                                        'Building number'
                                    )
                                }}</small>
                            </span>
                        </span>
                        <small
                            v-else-if="
                                (v$.buildingNumber.$invalid && submitted2) ||
                                v$.buildingNumber.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.buildingNumber.required.$message.replace(
                                    'Value',
                                    'Building number'
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
import { required, numeric, minLength, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Button from 'primevue/button'

export default {
    name: 'stageTwoA',
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            pesel: null,
            city: '',
            street: '',
            buildingNumber: null,

            //selectedRole: '',
            submitted2: false,
            id: null,
        }
    },
    components: {
        Card,
        InputText,
        Button,
    },
    mounted() {
        this.pesel = this.$store.state.pesel
        this.city = this.$store.state.city
        this.street = this.$store.state.street
        this.buildingNumber = this.$store.state.buildingNumber
    },
    computed: {
        selectedRole() {
            return this.$store.state.selectedRole
        },
    },

    methods: {
        back() {
            this.$store.commit('setPesel', this.pesel)
            this.$store.commit('setCity', this.city)
            this.$store.commit('setStreet', this.street)
            this.$store.commit('setBuildingNumber', this.buildingNumber)
            this.$store.commit('setFirstStageDone', false)
        },
        async handleSubmit2(isFormValid) {
            this.submitted2 = true
            //console.log(this.v$)
            //this.firstStageDone = true //przeniesc za ifa na koniec
            if (!isFormValid) {
                console.log(this.v$)
                return
            }

            await this.register()
            await this.addStudent()
            await this.$router.push({ path: '/' })

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

        async addStudent() {
            if (this.v$.$invalid) return
            await fetch(`http://localhost:3000/v1/addNewStudent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idStudent: this.id,
                    pesel: this.pesel,
                    city: this.city,
                    street: this.street,
                    buildingNumber: this.buildingNumber,
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
                    if (Response.status == 200) {
                        console.log('ok')
                        console.log(Response)
                    }
                    console.log('Added Student')
                    return Response.json()
                })
                .catch((error) => {
                    this.errorMessage = error.message
                })
        },
    },
    validations() {
        return {
            // telephoneNumber: {
            //     required,
            //     numeric,
            // },
            pesel: {
                required,
                minLength: minLength(11),
                maxLength: maxLength(11),
                numeric,
            },
            city: {
                required,
            },
            street: {
                required,
            },
            buildingNumber: {
                required,
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
