<template>
    <div class="home">
        <div class="container text-center">
            <template v-if="!loading">
                <div style="font-size: 40px" class="mb-4">Hello There</div>
                <weather
                    v-if="$store.state.weather"
                    :tempSetting="$store.state.tempSetting"
                    :bothDegrees="$store.state.bothDegrees"
                    :location="$store.state.weather.location"
                    :description="$store.state.weather.description"
                    :iconID="$store.state.weather.id"
                    :sunrise="$store.state.weather.sunrise"
                    :sunset="$store.state.weather.sunset"
                    :celsius="$store.state.weather.celsius"
                    :fahrenheit="$store.state.weather.fahrenheit"
                />
                <div style="font-size: 32px">{{ $store.state.dateTime }}</div>
                <searchbar />
                <div>
                    <button
                        class="btn m-2"
                        :class="{ selected: category === cat.value }"
                        v-for="(cat, i) in cats"
                        :key="'cat' + i"
                        @click="switchCategory(cat.value)"
                    >
                        {{ cat.name }}
                    </button>
                    <template v-if="news">
                        <news
                            class="mt-4 mb-4"
                            v-for="(article, i) in news"
                            :key="'article' + i"
                            :article="article"
                        />
                    </template>
                </div>
            </template>
            <template v-else>
                <h1>Loading...</h1>
                <h2>{{ $store.state.errorMessage }}</h2>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import weather from "@/components/weather.vue"
import searchbar from "@/components/searchbar.vue"
import newsComponent from "@/components/news.vue"
import store from "../store/index"
import { categories } from "@/services/news"
export default defineComponent({
    components: {
        weather,
        searchbar,
        news: newsComponent,
    },
    setup() {
        const loading = computed(
            () =>
                store.state.weather === undefined ||
                store.state.news === undefined
        )

        const category = computed<string | null>({
            get: () => store.state.selectedCategory,
            set: (val) => store.dispatch("updateCategory", val),
        })

        const source = computed(() => store.state.newsSource)

        const news = computed(() => {
            return store.state.news
                ? store.state.news.get(source.value + category.value)
                : undefined
        })

        const cats = computed(() => {
            if (source.value === "google") {
                return categories.google
            } else {
                return categories.newsapi
            }
        })

        onMounted(() => {
            store.dispatch("fetchNews", false)
        })

        function switchCategory(cat: string) {
            category.value = cat
            store.dispatch("fetchNews", false)
        }
        return {
            loading,
            category,
            switchCategory,
            news,
            cats,
        }
    },
})
</script>
