<template>
    <div class="weatherfont">
        <span
            v-if="tempSetting === 'celsius' || bothDegrees"
            :class="{
                secondary: tempSetting !== 'celsius' && bothDegrees,
            }"
            >{{ celsius }} °C
        </span>
        <span v-if="bothDegrees"> / </span>
        <span
            v-if="tempSetting === 'fahrenheit' || bothDegrees"
            :class="{
                secondary: tempSetting !== 'fahrenheit' && bothDegrees,
            }"
            >{{ fahrenheit }} °F
        </span>
        <span>
            in {{ location }} - {{ description }}
            <i :class="`wi wi-${iconClass}`" />
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import weathericonmap from "@/data/weathericonmap"
@Component
export default class Weather extends Vue {
    @Prop(String) readonly tempSetting?: string
    @Prop(Boolean) readonly bothDegrees?: boolean
    @Prop(String) readonly location?: string
    @Prop(String) readonly description?: string
    @Prop(Number) readonly iconID?: number
    @Prop(Number) readonly sunrise?: number
    @Prop(Number) readonly sunset?: number
    @Prop(Number) readonly celsius?: number
    @Prop(Number) readonly fahrenheit?: number

    get iconClass() {
        const id = this.iconID as number
        const iconobj = weathericonmap.get(String(id))
        let icon = iconobj ? iconobj.icon : null
        if (
            this.sunset &&
            this.sunrise &&
            iconobj &&
            !(id > 699 && id < 800) &&
            !(id > 899 && id < 1000)
        ) {
            const date = new Date()
            if (
                date.getTime() / 1000 > this.sunset ||
                date.getDate() / 1000 < this.sunrise
            ) {
                icon = "night-" + icon
            } else {
                icon = "day-" + icon
            }
        }
        return icon
    }
}
</script>

<style lang="sass" scoped>
.hidden
    display: none

.primary
    color: white

.secondary
    color: gray
.weatherfont
    font-size: 32px
</style>
