<template>
    <div>
        <form
            action="https://www.google.com/search"
            method="get"
            target="_blank"
            ref="searchbarform"
        >
            <div class="input-group">
                <input
                    autocomplete="off"
                    class="form-control search-bar"
                    name="q"
                    placeholder="search the web"
                    type="searchEngine"
                    v-model="searchInput"
                    @input="autocomplete"
                    ref="searchinput"
                />
                <span class="input-group-btn">
                    <button type="submit" class="btn" :disabled="!searchInput">
                        Submit
                    </button>
                </span>
            </div>
            <br />
            <div style="text-align: left;">
                <div>
                    <div
                        v-for="(sug, i) of dataService"
                        :key="'suggest' + i"
                        @click="submit(sug)"
                        class="searchsuggestion"
                    >
                        <p style="white-space: pre;" v-if="sug.length == 3">
                            {{ sug[0]
                            }}<b style="text-decoration:  underline;">{{
                                sug[1]
                            }}</b
                            >{{ sug[2] }}
                        </p>
                        <p style="white-space: pre;" v-if="sug.length == 1">
                            {{ sug[0] }}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Axios from "axios"
import jsonpAdapter from "axios-jsonp"

@Component
export default class SearchBar extends Vue {
    searchInput = ""
    dataService: string[][] = []

    submit(suggestion: string[]) {
        // This code basically bypasses the Vue framework and does direct DOM manipulation.
        // Sorry. Sue me.
        this.searchInput = suggestion.join("")
        const bar = this.$refs.searchbarform as HTMLFormElement
        const input = this.$refs.searchinput as HTMLInputElement
        input.value = this.searchInput
        bar.submit()
        this.autocomplete()
    }

    autocomplete() {
        const input = encodeURIComponent(this.searchInput)
        const uri = `https://suggestqueries.google.com/complete/search?q=${input}&client=chrome&hl=fr`
        Axios({
            url: uri,
            adapter: jsonpAdapter,
        }).then((res) => {
            this.dataService = []
            const items: string[] = [...res.data[1]]
            items.forEach((item) => {
                const index = item.indexOf(this.searchInput.toLowerCase())
                const part: string[] = []
                if (index != -1) {
                    const first = item.substring(0, index)
                    const second = item.substring(
                        index,
                        index + this.searchInput.length
                    )
                    const third = item.substring(
                        index + this.searchInput.length,
                        item.length
                    )
                    part.push(first)
                    part.push(second)
                    part.push(third)
                    this.dataService.push(part)
                } else {
                    part.push(item)
                    this.dataService.push(part)
                }
            })
        })
    }
}
</script>

<style lang="sass">
.light
    .search-bar
        color: #000000
        background-color: #cfcfcf
        border-color: #a7a7a7
        border-left-color: #a7a7a7
    button
        background-color: #cfcfcf
        color: black
    .searchsuggestion:hover
        color: #02d4fa
.dark
    .search-bar
        color: #ffffff
        background-color: #292929
        border-color: #555555
        border-left-color: #555555
    button
        background-color: #292929
        color: white
    .searchsuggestion:hover
        color: #ff98dd
.dracula
    .search-bar
        color: #ffffff
        background-color: #2A2C39
        border-color: #474B63
        border-left-color: #474B63
    button
        background-color: #2A2C39
        color: white
    .searchsuggestion:hover
        color: #ff98dd
.search-bar
    border-radius: 5px
    padding: 10px
    -webkit-transition: 0.5s
    transition: 0.5s
.hoverpointer:hover
    cursor: pointer
    transition: 0.25s
.searchsuggestion
    transition: 0.25s
.searchsuggestion:hover
    cursor: pointer
    transition: 0.25s
</style>
