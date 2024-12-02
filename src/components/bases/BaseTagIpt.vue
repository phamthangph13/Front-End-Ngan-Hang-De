<template>
    <ul class="tags">
        <li class="addTag">
            <div class="icon">
                <font-awesome-icon :icon="faPlus" />
            </div>
            <div class="input">
                <input type="text" @keyup.enter="addTag" placeholder="Add tag" v-model="components_text" />
            </div>
        </li>


        <li v-for="(tag, index) in components_tags" :key="index" class="tag">
            <div class="text">
                {{ tag }}
            </div>
            <div class="icon" @click="() => components_tags.splice(index, 1)">
                <font-awesome-icon :icon="faXmark" />
            </div>
        </li>

    </ul>
</template>


<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, defineModel } from 'vue'
import type { PropType } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';


// const props = defineProps({
//     tags: {
//         type: Array as PropType<string[]>,
//         default: () => []
//     },
//     text: {
//         type: String,
//         default: ''
//     }
// })

const emits = defineEmits(['update:tags', 'update:text'])

const components_tags = defineModel({
    type: Array as PropType<string[]>,
    default: () => []
})
const components_text =  defineModel('text',{
    type: String,
    default: ''
})
const addTag = () => {

    if (components_text.value === '') return

    const tag = components_text.value.trim()

    if (components_tags.value.includes(tag)) {
        components_text.value = ''
        return
    }

    components_tags.value.push(tag)
    components_text.value = ''

}




</script>

<style>
:root {
    --tag-ipt-height: 30px;
    --tag-ipt-bg-color: #f1f1f1;
    --tag-ipt-icon-color: #333;
    --tag-ipt-font-size: 16px;
    --tag-ipt-font-color: #333;
    --tag-ipt-svg-size: 16px;
}
</style>

<style scoped lang="scss">
.tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;


    .tag {
        display: flex;
        align-items: center;
        background-color: var(--tag-ipt-bg-color);
        border-radius: 999em;
        padding: 4px 15px;
        // margin: 4px;
        margin-left: 4px;
        font-size: var(--tag-ipt-font-size);
        height: var(--tag-ipt-height);
        min-width: 50px;

        .text {
            margin-right: 5px;
            color: var(--tag-ipt-font-color);
        }

        .icon {
            margin-left: auto;
            cursor: pointer;

            svg {
                width: var(--tag-ipt-svg-size);
                height: var(--tag-ipt-svg-size);
                color: var(--tag-ipt-icon-color);
            }
        }
    }

    .addTag {
        display: flex;
        align-items: center;
        background-color: var(--tag-ipt-bg-color);
        border-radius: 999em;
        padding: 4px;
        // margin: 4px;
        font-size: var(--tag-ipt-font-size);
        height: var(--tag-ipt-height);

        .icon {
            width: var(--tag-ipt-height);
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                width: var(--tag-ipt-svg-size);
                height: var(--tag-ipt-svg-size);
                color: var(--tag-ipt-icon-color);
            }

        }

        .input {
            width: 0px;
            transition: width 0.4s ease-in-out;

            input {
                margin-left: 4px;
                border: none;
                outline: none;
                background-color: transparent;
                font-size: var(--tag-ipt-font-size);
                width: 100%;
                animation: fadeOut 0.4s ease-in-out;
                color: var(--tag-ipt-font-color);
                font-family: inherit;
            }
        }

        &:hover,
        &:has(input:focus) {
            .input {
                width: 204px;
                max-width: none;
                animation: fadeIn 0.4s ease-in-out;
            }
        }

    }
}

[disabled] {
    .tags {
        .addTag {
            display: none;
        }
        .tag {
            .icon {
                display: none;
            }
        }
    }

}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }

}
</style>