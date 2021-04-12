<template>
    <div class="p-d-flex p-jc-center wrapper">
        <Card id="card">
            <template #title>
                <h3>Login</h3>
            </template>
            <template #content>
                <form
                    @submit.prevent="handleSubmit(!v$.$invalid)"
                    class="p-fluid"
                >
                    <div class="p-field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-envelope" />
                            <InputText
                                id="email"
                                v-model="v$.email.$model"
                                :class="{
                                    'p-invalid': v$.email.$invalid && submitted,
                                }"
                                aria-describedby="email-error"
                            />
                            <label
                                for="email"
                                :class="{
                                    'p-error': v$.email.$invalid && submitted,
                                }"
                                >Email</label
                            >
                        </div>
                        <span v-if="v$.email.$error && submitted">
                            <span
                                id="email-error"
                                v-for="(error, index) of v$.email.$errors"
                                :key="index"
                            >
                                <small class="p-error">{{
                                    error.$message.replace('Value', 'Email')
                                }}</small>
                            </span>
                        </span>
                        <small
                            v-else-if="
                                (v$.email.required.$invalid && submitted) ||
                                v$.email.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.email.required.$message.replace(
                                    'Value',
                                    'Email'
                                )
                            }}</small
                        >
                    </div>
                    <div class="p-field">
                        <div class="p-float-label">
                            <Password
                                id="password"
                                v-model="v$.password.$model"
                                :class="{
                                    'p-invalid':
                                        v$.password.$invalid && submitted,
                                }"
                                :feedback="false"
                                toggleMask
                            >
                            </Password>
                            <label
                                for="password"
                                :class="{
                                    'p-error':
                                        v$.password.$invalid && submitted,
                                }"
                                >Password</label
                            >
                        </div>
                        <small
                            v-if="
                                (v$.password.$invalid && submitted) ||
                                v$.password.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.password.required.$message.replace(
                                    'Value',
                                    'Password'
                                )
                            }}</small
                        >
                    </div>
                    <Button
                        id="btn"
                        type="submit"
                        label="Submit"
                        class="p-mt-2"
                    />
                </form>
            </template>
        </Card>
    </div>
</template>

<script>
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
    name: 'Login',
    setup: () => ({ v$: useVuelidate() }),
    components: {
        Password,
        Button,
        Card,
        InputText,
    },
    data() {
        return {
            email: '',
            password: '',
            submitted: false,
        }
    },
    validations() {
        return {
            email: {
                required,
                email,
            },

            password: {
                required,
            },
        }
    },
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true
            console.log(this.v$)
            if (!isFormValid) {
                return
            }
            this.login()
            //this.toggleDialog();
        },
        login() {
            if (this.v$.$invalid) return
            fetch(`http://localhost:3000/v1/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            })
                .then((Response) => {
                    if (Response.status == 401) {
                        throw new Error('Invalid credentials')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    console.log(Response.token)
                    const token = Response.token
                    let user = JSON.stringify(Response.user)
                    console.log(user)
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', user)
                    //eventBus.$emit("user", userResponse);
                    //localStorage.setItem("user", userResponse);
                    this.$router.push({ path: '/' })
                    //this.$router.go(0);
                })
                .catch((error) => {
                    this.errorMessage = error.message
                })
        },
    },
}
</script>

<style lang="scss" scoped>
#card {
    min-width: 300px;
    width: 20%;
    margin: auto;
}
.p-field {
    padding-top: 10px;
}
</style>
