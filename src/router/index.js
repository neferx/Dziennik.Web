import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TeacherList from '../views/TeacherList.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Subjects from '../components/profile/Subjects.vue'
import Remarks from '../components/profile/Remarks.vue'
import Presences from '../components/profile/Presences.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        children: [
            {
                path: '/subjects',
                name: 'Subjects',
                component: Subjects,
            },
            {
                path: '/presences',
                name: 'Presences',
                component: Presences,
            },
            {
                path: '/remarks',
                name: 'Remarks',
                component: Remarks,
            },
        ],
    },

    {
        path: '/teacherlist',
        name: 'Teacher List',
        component: TeacherList,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
