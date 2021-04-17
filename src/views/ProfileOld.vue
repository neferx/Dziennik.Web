<template>
    <Card id="card">
        <template #content>
            <div class="wrapper">
                <div class="profile">
                    <div class="user">
                        <img id="avatar" src="../assets/avatar.png" />
                        <div class="fullname">
                            {{ user.name + ' ' + user.lastname }}
                        </div>
                    </div>
                    <div class="divider" />
                    <div class="userInfo">
                        <div class="header">
                            <div class="label">Contact</div>
                            <div
                                class="contact"
                                v-bind:style="
                                    role == 'STUDENT'
                                        ? 'gap: 265px'
                                        : 'gap: 0px;'
                                "
                            >
                                <div class="details">
                                    Email: {{ user.email }}
                                </div>
                                <div v-if="role == 'TEACHER'" class="details">
                                    Telephone number: {{ user.telephoneNumber }}
                                </div>
                                <div class="details">Role: {{ user.role }}</div>
                            </div>
                        </div>

                        <div v-if="role == 'STUDENT'" class="header">
                            <div class="label">Address</div>
                            <div class="contact">
                                <div class="details">City: {{ user.city }}</div>
                                <div class="details">
                                    Street: {{ user.street }}
                                </div>
                                <div class="details">
                                    Building number: {{ user.buildingNumber }}
                                </div>
                            </div>
                        </div>
                        <div v-if="role == 'STUDENT'" class="header">
                            <div class="label">Teacher</div>
                            <div class="contact">
                                <div class="details">
                                    Class name: {{ class1.className }}
                                </div>
                                <div class="details">
                                    First name: {{ teacher.name }}
                                </div>
                                <div class="details">
                                    Last name: {{ teacher.lastname }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="informations">
                    <div class="grades">Oceny</div>
                    <div class="remarks">Uwagi</div>
                    <div class="absences">Nieobecności</div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script>
//name,lastname,email,role,telephoneNumber,city,street,buildingNumber,class1.className,teacher.name,teacher.lastname
//import Button from 'primevue/button'
//import Chip from 'primevue/chip'
import Card from 'primevue/card'

export default {
    components: {
        //Button,
        //Chip,
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
.p-card-content {
    padding-top: 100px !important;
}

.field {
    text-align: center;
    padding-top: 20px;
}

.content {
    font-weight: 400;
    text-align: center;
    overflow-wrap: break-word;
}

.wrapper {
    text-align: justify;
    display: flex;
    flex-direction: column;
}
.profile {
    height: 350px;
    width: 100%;
    //border: 5px solid; //tymczasowo
    margin: auto;
    display: flex;
}
.informations {
    display: flex;
    flex-direction: row;
    margin: auto;
}
.user {
    margin: left;
    width: 25%;
    //border: solid 5px; //tymczasowo
    display: flex;
    flex-direction: column;
}
.userInfo {
    width: 75%;
}

.fullname {
    text-align: center;
    color: #2196f3;
    font-weight: 600;
    font-size: 22px;
}

#avatar {
    margin: 15% auto;
    margin-bottom: 15px;
    object-fit: cover;
    object-position: top;
    border-radius: 100px;
    height: 200px;
    width: 200px;
}

.header {
    margin: 15px;
    font-weight: 600;
    margin-bottom: 50px;
}

.contact {
    display: flex;
    justify-content: flex-start;
    //gap: 100px;
}

.details {
    font-weight: 100;
    width: 300px;
    min-width: 100px;
    text-align: left;
}

.divider {
    display: flex;
    width: 1px;
    height: 95%;
    margin: auto;
    border-right: 1px solid rgba(128, 128, 128, 0.301);
}
//uczen@gmail.com;uczenA1
//nauczyciel@gmail.com;nauczycielA1
//rodzic@gmail.com;rodzicA1
</style>
