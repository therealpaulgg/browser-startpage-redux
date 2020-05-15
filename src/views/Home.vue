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
                        v-for="(cat, i) in categories"
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
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import weather from "@/components/weather.vue"
import searchbar from "@/components/searchbar.vue"
import news from "@/components/news.vue"
import { categories } from "@/services/news"
@Component({
    components: {
        weather,
        searchbar,
        news,
    },
})
export default class Home extends Vue {
    get loading() {
        return (
            this.$store.state.weather === undefined ||
            this.$store.state.news === undefined
        )
    }

    get category() {
        return this.$store.state.selectedCategory
    }
    set category(val: string) {
        this.$store.dispatch("updateCategory", val)
    }

    mounted() {
        this.$store.dispatch("fetchNews", false)
    }

    switchCategory(cat: string) {
        this.category = cat
        this.$store.dispatch("fetchNews", false)
    }

    get news() {
        // reactivity hack required for map
        this.$store.state.newsReact
        return this.$store.state.news
            ? this.$store.state.news.get(this.source + this.category)
            : undefined
    }

    get source() {
        return this.$store.state.newsSource
    }

    get categories() {
        if (this.source === "google") {
            return categories.google
        } else {
            return categories.newsapi
        }
    }
}
</script>
