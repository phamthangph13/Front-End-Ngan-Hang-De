<template>
    <div class="base">
        <div class="ipt">
            <input type="text" :placeholder v-model="text" @keydown="onKeyDown" ref="iptRef"
                @focusin="() => { isFocus = true }" @focusout="() => { isFocus = false }">
            <div class="notfocus" v-if="showTutorial">
                <div v-show="!isFocus">
                    <kbd>Ctrl</kbd> +
                    <kbd>k</kbd>
                </div>
                <div v-show="isFocus">
                    <kbd>Tab</kbd>
                </div>


            </div>
        </div>
        <ul class="tags" v-if="showTag">
            <li class="tag" v-for="tag in tags" :key="tag">
                <span class="text">{{ tag }}</span>
                <span class="close" @click="removeTag(tag)">
                    <FontAwesomeIcon :icon="faXmark" />
                </span>
            </li>
        </ul>
        <!-- {{ tags }} -->
    </div>
</template>



<script setup lang="ts">
import { ref, onMounted, defineProps, defineExpose } from 'vue';
import type { PropType } from 'vue';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';



const props = defineProps({
    placeholder: {
        type: String,
        default: 'Tìm kiếm'
    },
    showTutorial: {
        type: Boolean,
        default: true
    },
    doFocusEvent: {
        type: Boolean,
        default: true
    },
    showTag: {
        type: Boolean,
        default: true
    },
    initTags: {
        type: Array as PropType<string[]>,
        default: () => []
    }
})

const text = ref('')
const tags = ref<string[]>(props.initTags)
const iptRef = ref<HTMLInputElement | null>(null)
const isFocus = ref(false)

const onKeyDown = (event: KeyboardEvent) => {
    // tab key
    if (event.key === 'Tab') {

        event.preventDefault()

        // if text field is empty, do nothing
        if (!text.value) return
        // if field containt only white space
        if (!text.value.trim()) return

        addTag(text.value)
        text.value = ''
    }
}

const addTag = (tag: string) => {
    if (!tag) return
    if (tags.value.includes(tag)) return
    tags.value.push(tag.trim())
}

const removeTag = (tag: string) => {
    tags.value = tags.value.filter(t => t !== tag)
}

onMounted(() => {
    if (props.doFocusEvent) {
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault()
                event.stopPropagation()
                iptRef.value?.focus()
            }
        })
    }
})


defineExpose({
    tags,
    searchText: text,
    addTag,
    removeTag
})

</script>

<style>

:root {
    --tags-base-input-border: 1px solid #ccc;
}

</style>

<style scoped lang="scss">
.base {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // gap: 10px;
    width: 100%;

    .ipt {
        position: relative;
        // height: 50px;
        width: 100%;
        border: var(--tags-base-input-border);
        border-radius: 5px;
        display: flex;
        align-items: center;

        input {
            flex: 1;
            width: calc(100% - 20px);
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 16px;

            &:focus {
                outline: none;
                // border-color: transparent;
            }
        }

        .notfocus {
            // display: none;
            // position: absolute;
            // right: 10px;
            // top: 10px;
            display: inline;
            float: left;
            margin: 10px;

            kbd {
                background-color: #eee;
                border-radius: 3px;
                border: 1px solid #b4b4b4;
                box-shadow:
                    0 1px 1px rgba(0, 0, 0, 0.2),
                    0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
                color: #333;
                display: inline-block;
                font-size: 0.85em;
                font-weight: 700;
                line-height: 1;
                padding: 2px 4px;
                white-space: nowrap;

            }
        }

    }

    .tags {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 5px;

        .tag {
            display: flex;
            // align-items: center;
            gap: 5px;
            padding: 5px 10px;
            background-color: #ccc;
            border-radius: 5px;

            span {
                white-space: nowrap;
            }

            .close {
                cursor: pointer;
                // font-size: 12px;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                float: left;
            }

            .text {
                white-space: nowrap;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 5px;
            }


        }

    }
}
</style>