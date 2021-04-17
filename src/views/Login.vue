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
            user: [],
            class1: [],
            teacher: [],
            subjects: [],
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
        async login() {
            if (this.v$.$invalid) return
            await fetch(`http://localhost:3000/v1/login`, {
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
                    console.log('logged in')
                    const token = Response.token

                    this.user = JSON.stringify(Response.user)
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', this.user)

                    this.user = JSON.parse(this.user)
                    console.log(this.user)

                    this.$router.push({ path: '/' })
                })
                .catch((error) => {
                    this.errorMessage = error.message
                })

            if (this.user.role == 'STUDENT') {
                console.log('User is a student')
                this.getUserStudent(this.user.id)
            } else if (this.user.role == 'PARENT') {
                console.log('User is a parent')
                this.getUserParent(this.user.id)
            } else if (this.user.role == 'TEACHER') {
                console.log('User is a teacher')
                this.getUserTeacher(this.user.id)
            } else {
                console.log('User is a admin?')
                this.getUser(this.user.id)
            }
        },
        async getUserStudent(id) {
            await fetch(`http://localhost:3000/v1/GetStudentByID/` + id, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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
                    if (Response.userList == null) {
                        console.log('This is not a Student')
                    } else {
                        this.user = Response.userList[0]
                        localStorage.setItem(
                            'user',
                            JSON.stringify(Response.userList[0])
                        )

                        console.log('Loaded Student')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
            await this.getClass()
            await this.getStudentsTeacher()
            await this.getClassesSubjects()
            await this.$store.commit('setSubjects', this.subjects)
        },

        async getClass() {
            await fetch(
                `http://localhost:3000/v1/getClassByID/` + this.user.classID,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then((Response) => {
                    if (Response.status == 401) {
                        throw new Error('Invalid credentials')
                    } else if (Response.status == 400) {
                        throw new Error('Invalid data')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    if (Response.list == null) {
                        console.log('Class doesnt exist')
                    } else {
                        localStorage.setItem(
                            'class1',
                            JSON.stringify(Response.list[0])
                        )
                        this.class1 = Response.list[0]
                        console.log('Loaded Class')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
        },

        async getClassesSubjects() {
            await fetch(
                `http://localhost:3000/v1/getAllClassesSubjectsByID/` + 1,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then((Response) => {
                    if (Response.status == 401) {
                        throw new Error('Invalid credentials')
                    } else if (Response.status == 400) {
                        throw new Error('Invalid data')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    if (Response.classesSubjectsList == null) {
                        console.log('This is not Class subjects')
                    } else {
                        this.subjects = Response.classesSubjectsList
                        localStorage.setItem(
                            'subjects',
                            JSON.stringify(Response.classesSubjectsList)
                        )
                        console.log('Loaded class subjects')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
        },

        async getUserParent(id) {
            fetch(`http://localhost:3000/v1/GetParentByID/` + id, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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
                    if (Response.userList == null) {
                        console.log('This is not a Parent')
                    } else {
                        this.user = Response.userList[0]
                        localStorage.setItem(
                            'user',
                            JSON.stringify(Response.userList[0])
                        )
                        console.log('Loaded Parent')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
        },
        async getUserTeacher(id) {
            fetch(`http://localhost:3000/v1/getTeacherByID/` + id, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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
                    if (Response.userList == null) {
                        console.log('This is not a Teacher')
                    } else {
                        this.user = Response.userList[0]
                        localStorage.setItem(
                            'user',
                            JSON.stringify(Response.userList[0])
                        )
                        console.log('Loaded Teacher')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
        },

        async getStudentsTeacher() {
            fetch(
                `http://localhost:3000/v1/getTeacherByID/` +
                    this.class1.teacherID,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then((Response) => {
                    if (Response.status == 401) {
                        throw new Error('Invalid credentials')
                    } else if (Response.status == 400) {
                        throw new Error('Invalid data')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    if (Response.userList == null) {
                        console.log('This is not a Teacher')
                    } else {
                        this.teacher = Response.userList[0]
                        localStorage.setItem(
                            'teacher',
                            JSON.stringify(Response.userList[0])
                        )
                        console.log('Loaded Teacher')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
        },

        async getUser(id) {
            fetch(`http://localhost:3000/v1/getUserByID/` + id, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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
                    if (Response.userList == null) {
                        console.log('This is not a Admin')
                    } else {
                        this.user = Response.userList[0]
                        localStorage.setItem(
                            'user',
                            JSON.stringify(Response.userList[0])
                        )
                        console.log('Loaded Admin')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
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
    background-color: #fafafa;
}
.p-field {
    padding-top: 10px;
}
</style>
