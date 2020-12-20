import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home",
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

const title = "Startpage"
router.afterEach(
    (to) => (document.title = `${to.meta.title} | ${title}` || title)
)

export default router
