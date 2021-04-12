<template>
    <Card id="card">
        <template #title>
            <h3 class="p-text-center">Register</h3>
        </template>
        <template #content>
            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                <div class="p-grid">
                    <div class="p-field p-col-12 p-md-6">
                        <div class="p-float-label p-input-icon-left">
                            <i class="pi pi-user" />
                            <InputText
                                id="firstname"
                                v-model="v$.name.$model"
                                :class="{
                                    'p-invalid': v$.name.$invalid && submitted,
                                }"
                            />
                            <label
                                for="name"
                                :class="{
                                    'p-error': v$.name.$invalid && submitted,
                                }"
                                >Name*</label
                            >
                        </div>
                        <small
                            v-if="
                                (v$.name.$invalid && submitted) ||
                                v$.name.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.name.required.$message.replace(
                                    'Value',
                                    'Name'
                                )
                            }}</small
                        >
                    </div>

                    <div class="p-field p-col-12 p-md-6">
                        <div class="p-float-label">
                            <InputText
                                id="lastname"
                                v-model="v$.lastname.$model"
                                :class="{
                                    'p-invalid':
                                        v$.lastname.$invalid && submitted,
                                }"
                            />
                            <label
                                for="lastname"
                                :class="{
                                    'p-error':
                                        v$.lastname.$invalid && submitted,
                                }"
                                >Last name*</label
                            >
                        </div>
                        <small
                            v-if="
                                (v$.lastname.$invalid && submitted) ||
                                v$.lastname.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.lastname.required.$message.replace(
                                    'Value',
                                    'Name'
                                )
                            }}</small
                        >
                    </div>

                    <div class="p-field p-col-12 p-md-6">
                        <div class="p-float-label p-input-icon-left">
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
                                >Email*</label
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
                                (v$.email.$invalid && submitted) ||
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
                        <small
                            v-else-if="
                                (v$.email.email.$invalid && submitted) ||
                                v$.email.$pending.$response
                            "
                            class="p-error"
                            >Email is not a valid email address</small
                        >
                    </div>

                    <div class="p-field p-col-12 p-md-6">
                        <div class="p-float-label">
                            <InputText
                                id="emailConfirm"
                                v-model="v$.emailConfirm.$model"
                                :class="{
                                    'p-invalid':
                                        v$.emailConfirm.$invalid && submitted,
                                }"
                                aria-describedby="email-error"
                            />
                            <label
                                for="emailConfirm"
                                :class="{
                                    'p-error':
                                        v$.emailConfirm.$invalid && submitted,
                                }"
                                >Confirm email*</label
                            >
                        </div>
                        <span
                            v-if="
                                v$.emailConfirm.$error &&
                                !v$.emailConfirm.sameAsEmail.$invalid &&
                                submitted
                            "
                        >
                            <span
                                id="email-error"
                                v-for="(error, index) of v$.emailConfirm
                                    .$errors"
                                :key="index"
                            >
                                <small class="p-error">{{
                                    error.$message.replace('Value', 'Email')
                                }}</small>
                            </span>
                        </span>
                        <small
                            v-else-if="
                                (v$.emailConfirm.required.$invalid &&
                                    submitted) ||
                                v$.emailConfirm.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.emailConfirm.required.$message.replace(
                                    'Value',
                                    'Email'
                                )
                            }}</small
                        >
                        <small
                            v-else-if="
                                (v$.emailConfirm.sameAsEmail.$invalid &&
                                    submitted) ||
                                v$.emailConfirm.$pending.$response
                            "
                            class="p-error"
                            >Emails must be identical</small
                        >
                        <small
                            v-else-if="
                                (v$.emailConfirm.email.$invalid && submitted) ||
                                v$.emailConfirm.$pending.$response
                            "
                            class="p-error"
                            >Email is not a valid email address</small
                        >
                    </div>

                    <div class="p-field p-col-12 p-md-6">
                        <div class="p-float-label p-input-icon-left">
                            <i class="pi pi-envelope" />
                            <Password
                                id="password"
                                v-model="v$.password.$model"
                                :class="{
                                    'p-invalid':
                                        v$.password.$invalid && submitted,
                                }"
                                toggleMask
                            >
                                <template #header>
                                    <h6>Pick a password</h6>
                                </template>
                                <template #footer="sp">
                                    {{ sp.level }}
                                    <p class="p-mt-2">Suggestions</p>
                                    <ul
                                        class="p-pl-2 p-ml-2 p-mt-0"
                                        style="line-height: 1.5"
                                    >
                                        <li>At least one lowercase</li>
                                        <li>At least one uppercase</li>
                                        <li>At least one numeric</li>
                                        <li>Minimum 6 characters</li>
                                    </ul>
                                </template>
                            </Password>
                            <label
                                for="password"
                                :class="{
                                    'p-error':
                                        v$.password.$invalid && submitted,
                                }"
                                >Password*</label
                            >
                        </div>
                        <!-- <span v-if="(v$.password.$error) && submitted">
                                    <span
                                        id="password-error"
                                        v-for="(error, index) of v$.password
                                            .$errors"
                                        :key="index"
                                    >
                                        <small class="p-error">{{
                                            error.$message.replace(
                                                'Value',
                                                'Password'
                                            )
                                        }}</small>
                                    </span>
                                </span> -->
                        <small
                            v-if="
                                (v$.password.$error &&
                                    !v$.password.required.$invalid &&
                                    submitted) ||
                                v$.password.$pending.$response
                            "
                            class="p-error"
                            >Password is invalid</small
                        >
                        <small
                            v-if="
                                (v$.password.required.$invalid && submitted) ||
                                v$.password.$pending.$response
                            "
                            class="p-error"
                            >Password is required</small
                        >
                    </div>
                    <div class="p-field p-col-12 p-md-6">
                        <div class="p-float-label">
                            <Password
                                id="passwordConfirm"
                                v-model="v$.passwordConfirm.$model"
                                :class="{
                                    'p-invalid':
                                        v$.passwordConfirm.$invalid &&
                                        submitted,
                                }"
                                toggleMask
                                :feedback="false"
                            >
                            </Password>
                            <label
                                for="passwordConfirm"
                                :class="{
                                    'p-error':
                                        v$.password.$invalid && submitted,
                                }"
                                >Confirm Password*</label
                            >
                        </div>
                        <small
                            v-if="
                                (v$.passwordConfirm.required.$invalid &&
                                    submitted) ||
                                v$.passwordConfirm.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.passwordConfirm.required.$message.replace(
                                    'Value',
                                    'Password'
                                )
                            }}</small
                        >
                        <small
                            v-else-if="
                                (v$.passwordConfirm.sameAsPassword.$invalid &&
                                    submitted) ||
                                v$.passwordConfirm.$pending.$response
                            "
                            class="p-error"
                            >Passwords must be identical</small
                        >
                    </div>

                    <div class="p-field p-col-12 p-md-12">
                        <Dropdown
                            v-model="v$.selectedRole.$model"
                            :options="roles"
                            optionLabel="name"
                            optionValue="name"
                            placeholder="Select a Role"
                        />
                        <small
                            v-if="
                                (v$.selectedRole.$invalid && submitted) ||
                                v$.selectedRole.$pending.$response
                            "
                            class="p-error"
                            >{{
                                v$.name.required.$message.replace(
                                    'Value',
                                    'Role'
                                )
                            }}</small
                        >
                    </div>
                    <Button type="submit" label="Next" class="p-mt-2 btn" />
                </div>
            </form>
        </template>
    </Card>
</template>

<script>
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { email, required, sameAs, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

export default {
    name: 'Register',
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            lastname: '',
            email: '',
            emailConfirm: '',
            password: '',
            passwordConfirm: '',
            selectedRole: '',
            roles: [
                { name: 'Student' },
                { name: 'Parent' },
                { name: 'Teacher' },
            ],

            firstStageDone: false,
            submitted: false,
        }
    },
    computed: {},
    components: {
        Card,
        InputText,
        Password,
        Button,
        Dropdown,
    },
    mounted() {
        this.name = this.$store.state.name
        this.lastname = this.$store.state.lastname
        this.email = this.$store.state.email
        this.emailConfirm = this.$store.state.emailConfirm
        this.password = this.$store.state.password
        this.passwordConfirm = this.$store.state.passwordConfirm
        this.selectedRole = this.$store.state.selectedRole
    },
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true

            if (!isFormValid) {
                console.log(this.v$)
                return
            }
            this.firstStageDone = true
            this.$store.commit('setName', this.name)
            this.$store.commit('setLastName', this.lastname)
            this.$store.commit('setEmail', this.email)
            this.$store.commit('setEmailConfirm', this.emailConfirm)
            this.$store.commit('setPassword', this.password)
            this.$store.commit('setPasswordConfirm', this.passwordConfirm)
            this.$store.commit('setSelectedRole', this.selectedRole)
            this.$store.commit('setFirstStageDone', this.firstStageDone)

            //this.register() tymczasowo
        },
    },
    validations() {
        return {
            name: {
                required,
            },
            lastname: {
                required,
            },
            email: {
                required,
                email,
            },
            emailConfirm: {
                required,
                email,
                sameAsEmail: sameAs(this.email),
            },
            password: {
                required,
                minLength: minLength(6),
                containsUppercase: function (value) {
                    return /[A-Z]/.test(value)
                },
                containsLowercase: function (value) {
                    return /[a-z]/.test(value)
                },
                containsNumber: function (value) {
                    return /[0-9]/.test(value)
                },
            },
            passwordConfirm: {
                required,
                sameAsPassword: sameAs(this.password),
            },
            selectedRole: {
                required,
            },
        }
    },
}
</script>
