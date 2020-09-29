import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SafetyPratices from "./views/SafetyPratices.vue"

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/safety-pratices",
            name: "good pratices",
            component: SafetyPratices,
        }
    ]
});