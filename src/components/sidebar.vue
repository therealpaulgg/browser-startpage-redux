<template>
    <div v-click-outside="() => (isClosed = true)">
        <div class="settings-button" @click="toggleSidebar">
            <font-awesome-icon icon="bars" size="2x" />
        </div>
        <div class="sidebar" :class="{ closed: isClosed }">
            <h3>Settings</h3>
            <hr />
            <p>Degree Mode</p>
            <div>
                <label
                    v-for="item of tempSettings"
                    :key="item.name"
                    class="radio"
                >
                    <input
                        type="radio"
                        v-model="tempSetting"
                        name="degreegrp"
                        :value="item.value"
                        class="hidden"
                    />
                    <span class="label"></span>{{ item.name }}
                </label>
            </div>
            <div class="pt-2 pb-2">
                Both Degrees
                <toggle-button v-model="bothDegrees" />
            </div>
            <p>Theme</p>
            <label v-for="item of themeSettings" :key="item.name" class="radio">
                <input
                    type="radio"
                    v-model="theme"
                    name="themegrp"
                    :value="item.value"
                    class="hidden"
                />
                <span class="label"></span>{{ item.name }}
            </label>
            <p>News Source</p>
            <label v-for="item of newsSources" :key="item.name" class="radio">
                <input
                    type="radio"
                    v-model="newsSource"
                    name="newsgrp"
                    :value="item.value"
                    class="hidden"
                />
                <span class="label"></span>{{ item.name }}
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue"
import store from "../store/index"
import toggle from "@/components/toggle.vue"
export default defineComponent({
    components: {
        "toggle-button": toggle,
    },
    setup() {
        const isClosed = ref(true)
        const tempSettings = ref([
            {
                name: "Celsius",
                value: "celsius",
            },
            {
                name: "Fahrenheit",
                value: "fahrenheit",
            },
        ])
        const themeSettings = ref([
            {
                name: "Light Mode",
                value: "light",
            },
            {
                name: "Dark Mode",
                value: "dark",
            },
            {
                name: "Dracula Theme",
                value: "dracula",
            },
        ])
        const newsSources = ref([
            {
                name: "NewsCatcher",
                value: "newscatcher",
            },
            {
                name: "Google News",
                value: "google",
            },
            {
                name: "NewsAPI",
                value: "newsapi",
            },
        ])

        const tempSetting = computed({
            get: () => store.state.tempSetting,
            set: (val) => store.dispatch("updateTempSetting", val),
        })
        const bothDegrees = computed({
            get: () => store.state.bothDegrees,
            set: (val) => store.dispatch("updateBothDegrees", val),
        })

        const theme = computed({
            get: () => store.state.theme,
            set: (val) => store.dispatch("updateTheme", val),
        })

        const newsSource = computed({
            get: () => store.state.newsSource,
            set: (val) => store.dispatch("updateNewsSource", val),
        })

        function toggleSidebar() {
            isClosed.value = !isClosed.value
        }
        return {
            isClosed,
            tempSetting,
            bothDegrees,
            theme,
            newsSource,
            newsSources,
            toggleSidebar,
            tempSettings,
            themeSettings,
        }
    },
})
</script>

<style lang="sass" scoped>
.sidebar
    visibility: visible
    position: fixed
    right: 0px
    top: 0
    width: 200px
    height: 100%
    word-wrap: break-word
    padding: 10px
    -webkit-transition: 0.5s
    transition: 0.5s
    z-index: 1
    background-color: rgb(68, 68, 68)
    color: white
.sidebar.closed
    visibility: hidden
    right: -200px
.light
    a
        color: rgb(44,44,44)
    .sidebar
        background-color: #dddddd
        color: black
    hr
        border-color: black
.dark
    a
        color: #bbbbbb
    .sidebar
        background-color: rgb(68,68,68)
        color: white
    hr
        border-color: white
.dracula
    a
        color: #bbbbbb
    .sidebar
        background-color: #2a2c39
        color: white
    hr
        border-color: white
.settings-label
    float: left

.settings-button
    margin: 20px
    -webkit-transition: 1s
    transition: 1s
    position: absolute
    right: 0
    top: 0
    cursor: pointer

.hidden
    display: none

.hidden
    display: none

.radio
    position: relative
    cursor: pointer
    line-height: 20px
    font-size: 14px

.radio .label
    position: relative
    display: block
    float: left
    margin-right: 10px
    width: 20px
    height: 20px
    border: 2px solid #c8ccd4
    border-radius: 100%
    -webkit-tap-highlight-color: transparent

.um
    position: relative
    display: block
    float: left
    margin-right: 10px
    width: 20px
    height: 20px

.radio .label:after
    content: ''
    position: absolute
    top: 3px
    left: 3px
    width: 10px
    height: 10px
    border-radius: 100%
    background: #225cff
    transform: scale(0)
    transition: all 0.2s ease
    opacity: 0.08
    pointer-events: none

.radio:hover .label:after
    transform: scale(3.6)

input[type="radio"]:checked + .label
    border-color: #225cff


input[type="radio"]:checked + .label:after
    transform: scale(1)
    transition: all 0.2s cubic-bezier(0.35, 0.9, 0.4, 0.9)
    opacity: 1

.cntr
    position: absolute
    top: calc(50% - 10px)
    left: 0
    width: 100%
    text-align: center

.hidden
    display: none

.radio-label
    font-size: 16px
</style>
