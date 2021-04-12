<template>
    <Card id="card">
        <template #title> User </template>
        <template #content>
            <div class="wrapper p-grid">
                <div class="user p-grid p-col-12">
                    <div class="field p-grid p-col-12 p-md-6 p-lg-3">
                        <p class="p-col-12 p-md-6 p-lg-3 label">Name:</p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ user.name }}
                        </p>
                    </div>
                    <div class="field p-grid p-col-12 p-md-6 p-lg-3">
                        <p class="p-col-12 p-md-6 p-lg-3 label">Last name:</p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ user.lastname }}
                        </p>
                    </div>
                    <div class="field p-grid p-col-12 p-md-6 p-lg-3">
                        <p class="p-col-12 p-md-6 p-lg-3 label">Email:</p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ user.email }}
                        </p>
                    </div>
                    <div class="field p-grid p-col-12 p-md-6 p-lg-3">
                        <p class="p-col-12 p-md-6 p-lg-3 label">Status:</p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            <Chip class="chip">{{ user.role }}</Chip>
                        </p>
                    </div>
                    <div
                        v-if="role == 'PARENT' || role == 'TEACHER'"
                        class="field p-grid p-col-12 p-md-12 p-lg-12"
                    >
                        <p
                            style="text-align: right"
                            class="p-col-12 p-md-6 p-lg-6 label"
                        >
                            Telephone number:
                        </p>
                        <p
                            style="text-align: left"
                            class="p-col-12 p-md-6 p-lg-6 content"
                        >
                            {{ user.telephoneNumber }}
                        </p>
                    </div>
                    <div
                        v-if="role == 'STUDENT'"
                        class="field p-grid p-col-12 p-md-6 p-lg-3"
                    >
                        <p class="p-col-12 p-md-6 p-lg-3 label">PESEL:</p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ user.PESEL }}
                        </p>
                    </div>
                    <div
                        v-if="role == 'STUDENT'"
                        class="field p-grid p-col-12 p-md-6 p-lg-3"
                    >
                        <p class="p-col-12 p-md-6 p-lg-3 label">City:</p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ user.city }}
                        </p>
                    </div>
                    <div
                        v-if="role == 'STUDENT'"
                        class="field p-grid p-col-12 p-md-6 p-lg-3"
                    >
                        <p class="p-col-12 p-md-6 p-lg-3 label">Street:</p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ user.street }}
                        </p>
                    </div>
                    <div
                        v-if="role == 'STUDENT'"
                        class="field p-grid p-col-12 p-md-6 p-lg-3"
                    >
                        <p class="p-col-12 p-md-6 p-lg-3 label">
                            Building number:
                        </p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ user.buildingNumber }}
                        </p>
                    </div>
                    <div
                        v-if="role == 'STUDENT'"
                        class="field p-grid p-col-12 p-md-6 p-lg-3"
                    >
                        <p class="p-col-12 p-md-6 p-lg-3 label">Class:</p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ class1.className }}
                        </p>
                    </div>
                    <div
                        v-if="role == 'STUDENT'"
                        class="field p-grid p-col-12 p-md-6 p-lg-3"
                    >
                        <p class="p-col-12 p-md-6 p-lg-3 label">
                            Teacher name:
                        </p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ teacher.name }}
                        </p>
                    </div>
                    <div
                        v-if="role == 'STUDENT'"
                        class="field p-grid p-col-12 p-md-6 p-lg-3"
                    >
                        <p class="p-col-12 p-md-6 p-lg-3 label">
                            Teacher last name:
                        </p>
                        <p class="p-col-12 p-md-6 p-lg-9 content">
                            {{ teacher.lastname }}
                        </p>
                    </div>
                </div>
                <div class="other p-col-12">
                    <!-- <h1>TEST</h1> -->
                </div>
            </div>
        </template>
    </Card>
</template>

<script>
//name,lastname,email,role,telephoneNumber,city,street,buildingNumber,class1.className,teacher.name,teacher.lastname
//import Button from 'primevue/button'
import Chip from 'primevue/chip'
import Card from 'primevue/card'

export default {
    components: {
        //Button,
        Chip,
        Card,
    },
    data() {
        return {
            user: [],
            teacher: [],
            class1: [],
            id: null,
            //role: '',
        }
    },
    methods: {
        async getUserStudent() {
            await fetch(`http://localhost:3000/v1/GetStudentByID/` + this.id, {
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

        async getUserParent() {
            fetch(`http://localhost:3000/v1/GetParentByID/` + this.id, {
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
                        console.log('Loaded Parent')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
        },
        async getUserTeacher() {
            fetch(`http://localhost:3000/v1/getTeacherByID/` + this.id, {
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
                        console.log('Loaded Teacher')
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
        },

        async getUser() {
            fetch(`http://localhost:3000/v1/getUserByID/` + this.id, {
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
    mounted() {
        this.id = JSON.parse(localStorage.getItem('user')).id
        //this.role = JSON.parse(localStorage.getItem('user')).role
        if (this.role == 'STUDENT') this.getUserStudent()
        else if (this.role == 'PARENT') this.getUserParent()
        else if (this.role == 'TEACHER') this.getUserTeacher()
        else this.getUser()
    },
    computed: {
        role() {
            return JSON.parse(localStorage.getItem('user')).role
        },
    },
}
</script>

<style lang="scss" scoped>
h1 {
    margin: auto;
}
.chip {
    background: #2196f3;
}
#card {
    width: 60%;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.field {
    text-align: center;
    padding-top: 20px;
}
.label {
    color: #2196f3;
    font-weight: bold;
    text-align: justify;
}
.content {
    font-weight: 400;
    text-align: center;
    overflow-wrap: break-word;
}
.divider {
    //background: #2196f3;
    width: 4px;
    border-left: 2px solid #2196f3;
    border-right: 2px solid #2196f3;
    border-radius: 50px;
}
.wrapper {
    text-align: justify;
}
.user {
    margin: auto;
}
//uczen@gmail.com;uczenA1
//nauczyciel@gmail.com;nauczycielA1
//rodzic@gmail.com;rodzicA1
</style>
