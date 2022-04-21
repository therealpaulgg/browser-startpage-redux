<template>
    <div class="text-left newscomponent">
        <div class="row" :class="{ 'mb-4': article.urlToImage }">
            <template v-if="article.urlToImage">
                <div class="col-12 col-md-8">
                    <h3>
                        <a :href="article.url" target="_blank">
                            {{ article.title }}</a
                        >
                    </h3>
                    <p v-if="article.publishedAt">
                        {{ translateDate(article.publishedAt) }}
                    </p>
                    <p v-if="article.author">By: {{ article.author }}</p>
                    <p v-if="article.source">From: {{ article.source }}</p>
                </div>
                <div class="col-12 col-md-4">
                    <img
                        v-if="article.urlToImage"
                        class="img-fluid"
                        style="border-radius: 10px"
                        :src="article.urlToImage"
                    />
                </div>
            </template>
            <template v-else>
                <div class="col-12 col-md-12">
                    <h3>
                        <a :href="article.url" target="_blank">
                            {{ article.title }}</a
                        >
                    </h3>
                    <p v-if="article.publishedAt">
                        {{ translateDate(article.publishedAt) }}
                    </p>
                    <p v-if="article.author">By: {{ article.author }}</p>
                    <p v-if="article.source">From: {{ article.source }}</p>
                </div>
            </template>
        </div>
        <div style="white-space: pre-line">{{ article.description }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { NewsArticle } from "@/services/news"
import dayjs from "dayjs"

export default defineComponent({
    props: {
        article: {
            type: Object as () => PropType<NewsArticle>,
        },
    },
    setup() {
        function translateDate(datestr: string) {
            return dayjs(new Date(datestr)).toLocaleString()
        }
        return {
            translateDate,
        }
    },
})
</script>

<style lang="sass" scoped>
.newscomponent
    padding: 20px
    border-radius: 10px
.light
    .newscomponent
        background-color: #cfcfcf
.dark
    .newscomponent
        background-color: #323435
.dracula
    .newscomponent
        background-color: #303142
</style>
