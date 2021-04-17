<template>
    <div class="wrapper">
        <div class="profile">
            <Avatar :name="user.name" :lastname="user.lastname" />
            <div class="profile-info">
                <div class="contact">
                    <div class="contact-email">
                        <font-awesome-icon class="email-icon" icon="envelope" />
                        <p class="email">{{ user.email }}</p>
                    </div>
                    <div class="contact-telephone">
                        <font-awesome-icon class="phone-icon" icon="phone" />
                        <p class="phone">123 456 789</p>
                    </div>
                </div>

                <div class="address">
                    <div class="address-city">
                        <font-awesome-icon class="city-icon" icon="city" />
                        <p class="city">{{ user.city }}</p>
                    </div>
                    <div class="address-street">
                        <font-awesome-icon
                            class="street-icon"
                            icon="building"
                        />

                        <p class="street">
                            {{ user.street + ' ' + user.buildingNumber }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="class">
                <p class="class-header">Class</p>
                <div class="class-info">
                    <div class="class-teacher">
                        <span>Educator: </span
                        >{{ teacher.name + ' ' + teacher.lastname }}
                    </div>
                    <div class="class-name">
                        <span>Name: </span>{{ class1.className }}
                    </div>
                </div>
            </div>
        </div>
        <div class="informations">
            <TabMenu class="informations-menu" :model="items" />
            <router-view />
        </div>
    </div>
</template>

<script>
//class1.className,teacher.name,teacher.lastname
//import Button from 'primevue/button'
//import Chip from 'primevue/chip'
//import Card from 'primevue/card'
import Avatar from '../components/Avatar'
import TabMenu from 'primevue/tabmenu'

export default {
    components: {
        Avatar,
        TabMenu,
        //Button,
        //Chip,
        //Card,
    },
    data() {
        return {
            user: [],
            teacher: [],
            class1: [],
            subjects: [],
            id: null,
            //role: '',
            items: [
                {
                    label: 'Subjects',
                    icon: 'fas pi-fw fa-book',
                    to: '/subjects',
                },

                {
                    label: 'Presences',
                    icon: 'fas pi-fw fa-clock',
                    to: '/presences',
                },
                {
                    label: 'Remarks',
                    icon: 'fas pi-fw fa-exclamation',
                    to: '/remarks',
                },
            ],
        }
    },
    methods: {
        setData() {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.teacher = JSON.parse(localStorage.getItem('teacher'))
            this.class1 = JSON.parse(localStorage.getItem('class1'))
            this.subjects = JSON.parse(localStorage.getItem('subjects'))
            console.log(this.user)
            console.log(this.teacher)
            console.log(this.class1)
            console.log(this.subjects)
        },
    },
    async mounted() {
        this.setData() //ładuje date

        this.id = JSON.parse(localStorage.getItem('user')).id
        this.$router.replace({ name: 'Subjects' }) //ustawia subjects jako domyślny route dla router <TabMenu>

        //this.role = JSON.parse(localStorage.getItem('user')).role
        // if (this.role == 'STUDENT') {
        //     await this.getUserStudent()
        // } else if (this.role == 'PARENT') this.getUserParent()
        // else if (this.role == 'TEACHER') this.getUserTeacher()
        // else this.getUser()
    },
    computed: {
        role() {
            return JSON.parse(localStorage.getItem('user')).role
        },
    },
}
</script>

<style lang="scss" scoped>
.my-icon {
    background-image: url('test.jpg') !important;
}
.chip {
    background: #2196f3;
}

.wrapper {
    display: flex;
    width: 80vw;
    margin: auto;
    border-radius: 50px;
    background-color: #fafafa;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    height: 650px;
    .profile {
        width: 30%;
        //height: 600px;
        padding: 40px;

        &-info {
            .contact {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 50px;
                margin: auto;
                .contact-email,
                .contact-telephone {
                    width: 165px;
                    gap: 15px;
                    display: flex;
                    align-items: center;
                    .email,
                    .phone {
                        font-size: 16px;
                        color: var(--text-color-2);
                    }
                    .email-icon,
                    .phone-icon {
                        font-size: 16px;
                        color: var(--text-color-2);
                    }
                }
            }
            .address {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 50px;

                .address-city,
                .address-street {
                    width: 165px;
                    gap: 15px;
                    display: flex;
                    align-items: center;
                    .city,
                    .street {
                        font-size: 16px;
                        color: var(--text-color-2);
                    }
                    .city-icon,
                    .street-icon {
                        font-size: 16px;
                        color: var(--text-color-2);
                    }
                }
            }
        }
        .class {
            margin-top: 25px;
            font-size: 22px;
            font-weight: bold;
            color: var(--text-color-1);
            &-info {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 20px;
                .class-teacher,
                .class-name {
                    font-weight: normal;
                    color: var(--text-color-2);
                    font-size: 16px;
                    span {
                        font-weight: bold;
                    }
                }
            }
        }
    }
    .informations {
        width: 70%;
        //height: 700px;

        ::v-deep(.p-tabmenu) {
            border-top-right-radius: 70px;
            .p-tabmenu-nav {
                background-color: #fafafa !important;
                border-top-right-radius: 70px;
                .p-tabmenuitem {
                    width: 200px;
                    background-color: #fafafa;
                    color: var(--text-color-2);
                    .p-menuitem-link {
                        background-color: #fafafa;
                    }
                }
            }
        }

        .informations-menu {
            background-color: #fafafa;
        }
    }

    @media screen and (max-width: 1340px) {
        .informations {
            margin-left: 50px;
            //height: 300px;
        }
    }
    @media screen and (max-width: 1110px) {
        .informations {
            margin-left: 100px;
            //height: 300px;
        }
    }
}

//uczen@gmail.com;uczenA1
//nauczyciel@gmail.com;nauczycielA1
//rodzic@gmail.com;rodzicA1
</style>
