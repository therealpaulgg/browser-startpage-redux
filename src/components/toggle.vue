<template>
    <label class="switch">
        <input type="checkbox" v-model="value" :disabled="disabled" />
        <div>
            <span></span>
        </div>
    </label>
</template>

<style lang="scss" scoped>
.switch {
    --line: #505162;
    --dot: #f7f8ff;
    --circle: #9ea0be;
    --duration: 0.3s;
    --text: #9ea0be;
    cursor: pointer;
    input {
        display: none;
        & + div {
            position: relative;
            &:before,
            &:after {
                --s: 1;
                content: "";
                position: absolute;
                height: 4px;
                top: 10px;
                width: 24px;
                background: var(--line);
                transform: scaleX(var(--s));
                transition: transform var(--duration) ease;
            }
            &:before {
                --s: 0;
                left: 0;
                transform-origin: 0 50%;
                border-radius: 2px 0 0 2px;
            }
            &:after {
                left: 28px;
                transform-origin: 100% 50%;
                border-radius: 0 2px 2px 0;
            }
            span {
                padding-left: 56px;
                line-height: 24px;
                color: var(--text);
                &:before {
                    --x: 0;
                    --b: var(--circle);
                    --s: 4px;
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    box-shadow: inset 0 0 0 var(--s) var(--b);
                    transform: translateX(var(--x));
                    transition: box-shadow var(--duration) ease,
                        transform var(--duration) ease;
                }
                &:not(:empty) {
                    padding-left: 64px;
                }
            }
        }
        &:checked {
            & + div {
                &:before {
                    --s: 1;
                }
                &:after {
                    --s: 0;
                }
                span {
                    &:before {
                        --x: 28px;
                        --s: 12px;
                        --b: var(--dot);
                    }
                }
            }
        }
    }
}

html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

* {
    box-sizing: inherit;
    &:before,
    &:after {
        box-sizing: inherit;
    }
}

// Center & dribbble
body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    background: #262730;
    .switch {
        & + .switch {
            margin-top: 32px;
        }
    }
    .dribbble {
        position: fixed;
        display: block;
        right: 20px;
        bottom: 20px;
        img {
            display: block;
            height: 28px;
        }
    }
}
</style>

<script lang="ts">
import { defineComponent, computed } from "vue"
export default defineComponent({
    props: {
        label: String,
        id: String,
        modelValue: Boolean,
        disabled: Boolean,
        color: String,
        labelClass: String,
    },
    setup(props, { emit }) {
        const value = computed({
            get: () => props.modelValue,
            set: (modelValue) => emit("update:modelValue", modelValue),
        })
        return {
            value,
        }
    },
})
</script>
