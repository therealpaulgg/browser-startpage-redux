import { createStore } from "vuex"

import datetime from "@/services/datetime"
import weather, { WeatherData } from "@/services/weather"
import news, { NewsArticle } from "@/services/news"
import createPersistedState from "vuex-persistedstate"

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
    news: Map<string, NewsArticle[]>
    // reactivity hack for map
    newsReact: number
    newsSource: "google" | "newsapi" | "newscatcher"
    selectedCategory: string | null
    errorMessage: string
}

export default createStore({
    plugins: [
        createPersistedState({
            key: "startpage",
            paths: ["theme", "tempSetting", "bothDegrees", "newsSource"],
        }),
    ],
    state: {
        dateTime: datetime(),
        theme: "light",
        date: new Date(),
        tempSetting: "celsius",
        bothDegrees: true,
        news: new Map(),
        newsReact: 0,
        newsSource: "newscatcher",
        selectedCategory: null,
        errorMessage: "",
    } as AppState,
    mutations: {
        UPDATE_CATEGORY(state: AppState, val: string) {
            state.selectedCategory = val
        },
        FETCH_NEWS(state: AppState, refreshing: boolean) {
            if (
                state.selectedCategory !== null &&
                (state.news.get(state.selectedCategory) === undefined ||
                    refreshing)
            ) {
                news(state.selectedCategory, state.newsSource).then((res) => {
                    state.news.set(
                        state.newsSource + state.selectedCategory,
                        res
                    )
                    state.newsReact++
                })
            }
        },
        UPDATE_TIME(state: AppState) {
            state.lastDate = {
                ...state.date,
            }
            state.date = new Date()
            state.dateTime = datetime()
        },
        UPDATE_WEATHER(state: AppState) {
            weather()
                .then((res) => {
                    state.weather = res
                })
                .catch((err) => {
                    if (err.response) {
                        state.errorMessage = err.response.data
                    } else {
                        state.errorMessage = err.message
                    }
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
        UPDATE_NEWS_SOURCE(state: AppState, val: "newsapi" | "google") {
            state.newsSource = val
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
        fetchNews(
            {
                state,
                dispatch,
                commit,
            }: { state: AppState; dispatch: Function; commit: Function },
            refreshing: boolean
        ) {
            if (state.selectedCategory === null) {
                if (state.newsSource === "google") {
                    dispatch("updateCategory", "top")
                } else if (state.newsSource === "newscatcher") {
                    dispatch("updateCategory", "news")
                } else {
                    dispatch("updateCategory", "general")
                }
            }
            commit("FETCH_NEWS", refreshing)
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
        updateNewsSource(
            { commit, dispatch }: { commit: Function; dispatch: Function },
            val: "newsapi" | "google"
        ) {
            commit("UPDATE_NEWS_SOURCE", val)
            commit("UPDATE_CATEGORY", null)
            dispatch("fetchNews", false)
        },
        updateCategory({ commit }: { commit: Function }, val: string) {
            commit("UPDATE_CATEGORY", val)
        },
    },
    modules: {},
})
