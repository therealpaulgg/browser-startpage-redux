<template>
    <div :class="theme">
        <div id="app">
            <sidebar />
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import sidebar from "@/components/sidebar.vue"
@Component({
    components: {
        sidebar,
    },
})
export default class App extends Vue {
    mounted() {
        setInterval(() => {
            this.$store.dispatch("updateTime")
        }, 1000)
        this.$store.dispatch("updateWeather")
    }

    get theme() {
        return this.$store.state.theme
    }
}
</script>

<style lang="sass">
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
html, body
    font-family: "Hack"
#app
    min-height: 100vh
.container
    padding-right: 15px
    padding-left: 15px
    margin-right: auto
    margin-left: auto
.light
    #app
        background-color: white
        color: black
        transition: 0.5s
.dark
    #app
        background-color: #222222
        color: white
        transition: 0.5s
.dracula
    #app
        background-color: #20212b
        color: white
        transition: 0.5s

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
