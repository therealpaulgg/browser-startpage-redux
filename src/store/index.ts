import Vue from "vue"
import Vuex from "vuex"

import datetime from "@/services/datetime"
import weather, { WeatherData } from "@/services/weather"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

interface AppState {
    dateTime: string
    theme: "light" | "dark" | "dracula"
    lastDate?: Date
    date: Date
    sunrise?: number
    sunset?: number
    weather?: WeatherData
    tempSetting: "celsius" | "fahrenheit"
    bothDegrees: boolean
}

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: "startpage",
            paths: ["theme", "tempSetting", "bothDegrees"],
        }),
    ],
    state: {
        dateTime: datetime(),
        theme: "light",
        date: new Date(),
        tempSetting: "celsius",
        bothDegrees: true,
    },
    mutations: {
        UPDATE_TIME(state: AppState) {
            state.lastDate = {
                ...state.date,
            }
            state.date = new Date()
            state.dateTime = datetime()
        },
        UPDATE_WEATHER(state: AppState) {
            weather().then((res) => {
                Vue.set(state, "weather", res)
            })
        },
        UPDATE_TEMP_SETTING(state: AppState, val: "celsius" | "fahrenheit") {
            state.tempSetting = val
        },
        UPDATE_BOTH_DEGREES(state: AppState, val: boolean) {
            state.bothDegrees = val
        },
        UPDATE_THEME(state: AppState, val: "light" | "dark" | "dracula") {
            state.theme = val
        },
    },
    actions: {
        updateTime({ commit, state }: { commit: Function; state: AppState }) {
            commit("UPDATE_TIME")
            if (state.lastDate && state.sunset && state.sunrise) {
                const signalUpdate =
                    // if 10 minute have passed
                    state.date.getTime() - state.lastDate.getTime() >=
                        1000 * 60 * 10 ||
                    // if it is sunrise or sunset
                    Math.floor(state.date.getTime() / 1000) === state.sunrise ||
                    Math.floor(state.date.getTime() / 1000) === state.sunset ||
                    // it is the next day
                    state.date.getDay() !== state.lastDate.getDay()
                if (signalUpdate) {
                    commit("UPDATE_WEATHER")
                }
            }
        },
        updateWeather({ commit }: { commit: Function }) {
            commit("UPDATE_WEATHER")
        },
        updateTempSetting(
            { commit }: { commit: Function },
            val: "celsius" | "fahrenheit"
        ) {
            commit("UPDATE_TEMP_SETTING", val)
        },
        updateBothDegrees({ commit }: { commit: Function }, val: boolean) {
            commit("UPDATE_BOTH_DEGREES", val)
        },
        updateTheme(
            { commit }: { commit: Function },
            val: "light" | "dark" | "dracula"
        ) {
            commit("UPDATE_THEME", val)
        },
    },
    modules: {},
})
