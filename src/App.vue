<template>
    <div :class="theme">
        <div id="app" class="jumbotron jumbotron-fluid">
            <sidebar />
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import store from "./store/index"
import sidebar from "@/components/sidebar.vue"
export default defineComponent({
    components: {
        sidebar,
    },
    setup() {
        const theme = computed(() => store.state.theme)

        onMounted(() => {
            setInterval(() => {
                store.dispatch("updateTime")
            }, 1000)
            store.dispatch("updateWeather")
        })

        return {
            theme,
        }
    },
})
</script>

<style lang="sass">
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
@import url("https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.css")
@import url(https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css)
html, body
    font-family: "Hack"
#app
    min-height: 100vh
.container
    padding-right: 15px
    padding-left: 15px
    margin-right: auto
    margin-left: auto
.jumbotron
    margin: 0
.light
    #app
        background-color: white
        color: black
        transition: 0.5s
    a
        color: black
        transition: 0.25s
    a:hover
        color: #02d4fa
        transition: 0.25s
    .btn:hover
        color: #02d4fa
    .btn.selected
        background-color: black
        color: white
    .btn:hover
        color: #02d4fa
    .jumbotron
        background-color: white
.dark
    #app
        background-color: #222222
        color: white
        transition: 0.5s
    a
        color: white
        transition: 0.25s
    a:hover
        color: #ff98dd
        transition: 0.25s
    .btn:hover
        color: #ff98dd
    .btn.selected
        background-color: #4c5254
        color: white
    .btn.selected:hover
        color: #ff98dd
    .jumbotron
        background-color: #222222
.dracula
    #app
        background-color: #20212b
        color: white
        transition: 0.5s
    a
        color: white
        transition: 0.25s
    a:hover
        color: #ff98dd
        transition: 0.25s
    .btn:hover
        color: #ff98dd
    .btn.selected
        background-color: #4f5067
        color: white
    .btn.selected:hover
        color: #ff98dd
    .jumbotron
        background-color: #20212b

@media (min-width: 768px)
    .container
        width: 750px

@media (min-width: 992px)
    .container
        width: 970px

@media (min-width: 1200px)
    .container
        width: 1170px
</style>
