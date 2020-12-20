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
            <em :class="`wi wi-${iconClass}`" />
        </span>
    </div>
</template>

<script lang="ts">
// import { Component, Vue, Prop } from "vue-property-decorator"
import { defineComponent, computed } from "vue"
import weathericonmap from "@/data/weathericonmap"

export default defineComponent({
    props: {
        tempSetting: {
            type: String,
        },
        bothDegrees: {
            type: Boolean,
        },
        location: {
            type: String,
        },
        description: {
            type: String,
        },
        iconID: {
            type: Number,
        },
        sunrise: {
            type: Number,
        },
        sunset: {
            type: Number,
        },
        celsius: {
            type: Number,
        },
        fahrenheit: {
            type: Number,
        },
    },
    setup(props) {
        const iconClass = computed(() => {
            const id = props.iconID as number
            const iconobj = weathericonmap.get(String(id))
            let icon = iconobj ? iconobj.icon : null
            if (
                props.sunset &&
                props.sunrise &&
                iconobj &&
                !(id > 699 && id < 800) &&
                !(id > 899 && id < 1000)
            ) {
                const date = new Date()
                if (
                    date.getTime() / 1000 > props.sunset ||
                    date.getDate() / 1000 < props.sunrise
                ) {
                    icon = "night-" + icon
                } else {
                    icon = "day-" + icon
                }
            }
            return icon
        })
        return {
            iconClass,
        }
    },
})
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
