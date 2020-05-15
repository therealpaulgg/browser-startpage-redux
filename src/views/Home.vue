<template>
    <div class="home">
        <div class="container text-center">
            <template v-if="!loading">
                <div style="font-size: 40px" class="mt-4 mb-4">Hello There</div>
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
@Component({
    components: {
        weather,
        searchbar,
    },
})
export default class Home extends Vue {
    get loading() {
        return this.$store.state.weather === undefined
    }
}
</script>

<style lang="sass" scoped>
.home
    padding-top: 10px
</style>
