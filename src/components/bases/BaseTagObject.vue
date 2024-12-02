<template>
    <component :is="elem" class="componment" @click="emits('click', $event)">
        <div class="head">
            <div class="right">
                <slot name="right">

                </slot>
            </div>
            <div class="tags" v-show="!hideTags">
                <slot name="tags" :item="item" :tagKeys>
                    <template v-for="(property, i) in tagKeys" :key="i"  >
                        <template v-if="getNestedProperty(item, property.value)">
                            <template v-if="!Array.isArray(getNestedProperty(item, property.value))">
                                <div :class="{
                                    tag: true,
                                    clickable: property.clickable,
                                    [property.name]: true
                                }">
                                    <slot :name="`tag-${property.name}`" :tag="property" :value="getNestedProperty(item, property.value)">
                                        <span v-if="!property.hideName">{{ property.name }}&nbsp:&nbsp</span> 
                                        <span>{{ getNestedProperty(item, property.value) }}</span> 
                                    </slot>
                                </div>
                            </template>
                            <template v-else>
                                <slot :name="`list-${property.name}`">
                                    <template v-for="(child, j) in getNestedProperty(item, property.value)" :key="j">
                                        <div :class="{
                                            tag: true,
                                            clickable: property.clickable,
                                            [property.name]: true
                                        }">
                                            <span v-if="!property.hideName">{{ property.name }}&nbsp:&nbsp</span> 
                                            <span>{{ child }}</span> 
                                        </div>
                                    </template>
                                </slot>
                            </template>
                        </template>
                        <!-- <div>
                            <span>{{ property }}</span>
                        </div> -->
                    </template>
                </slot>
            </div>
            <div class="left">
                <slot name="left">

                </slot>
            </div>
        </div>
        <slot name="body" :item :bodyKeys>
            <div class="body">
                <template v-for="(obj, i) in bodyKeys" :key="i">
                    <div :class="{
                        item: true,
                        [obj.name]: true
                    }">
                        <slot :name="`body-${obj.name}`" :body="obj">
                            <u class="title"><strong>{{ obj.name }}</strong></u>
                            <div class="data">{{ item[obj.value as keyof typeof item] }}</div>
                        </slot>
                    </div>
                </template>
            </div>
        </slot>
        <div class="foot">
            <slot name="foot">
            </slot>
        </div>  
    </component>
</template>



<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits } from 'vue'
import type { PropType } from 'vue'

export interface ObjKey {
    name: string,
    value: string,
    clickable?: boolean,
    className?: string,
    isList?: boolean
    hideName?: boolean
}

export interface ObjItem extends Object {
    [key: string]: any
}

defineProps(
    {
        tagKeys: {
            type: Array as PropType<ObjKey[]>,
            default: () => [
                { name: 'foo', value: 'foo', clickable: true },
                { name: 'baz', value: 'baz' },
                { name: 'parent', value: 'parent.child' },
                
            ]
        },
        bodyKeys: {
            type: Array as PropType<ObjKey[]>,
            default: () => [
                // { name: 'bar', value: 'bar' },
                { name: 'chicken', value: 'chicken' }
            ]
        },
        item: {
            type: Object,
            default: {
                foo: 'foo',
                bar: 'bar',
                baz: 'baz',
                chicken: 'chicken',
                parent: {
                    child: 'child'
                }
            }
        },
        elem: {
            type: String,
            default: 'div'
        },
        hideTags: {
            type: Boolean,
            default: false
        }
    }
)

const emits = defineEmits(['click'])

function getNestedProperty(obj: any, path: string) {
    const keys = path.split('.');
    let current = obj;


    for (const key of keys) {
        if (current?.[key] === undefined) {
            return undefined;
        }
        current = current?.[key];
    }

    // console.log(current);
    return current;
}

onMounted(() => {
    // console.log(Object.keys(props.item));
})

</script>

<style lang="scss">
:root {
    --tag-object-border: 1px solid #ccc;
    --tag-object-bg: #f9f9f9;
    --tag-object-tag-bg: #f0f0f0;
    --tag-object-tag-border: var(--tag-object-border);
    --tag-object-tag-hover-bg: #aaa;
    --tag-object-font-family: 'Times New Roman', Times, serif;
}

</style>

<style scoped lang="scss">
.componment {
    display: flex;
    flex-direction: column;
    border: var(--tag-object-border);
    background-color: var(--tag-object-bg);
    padding: 0.5rem;
    border-radius: 0.3rem;
    font-family: var(--tag-object-font-family);
    gap: 0.25rem;
    

    .head {
        display: flex;

        .tags {
            display: flex;
            flex-direction: row;
            // justify-content: space-between;
            // border-bottom: var(--tag-object-border);
            // padding-bottom: 0.5rem;
            // margin-bottom: 0.5rem;
            // break tag
            flex-wrap: wrap;
            gap: 0.3rem;
    
            .tag {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                // margin-right: 0.3rem;
                // margin-bottom: 0.2rem;
                padding: 0.2rem 0.3rem;
                border: var(--tag-object-tag-border);
                border-radius: 999rem;
                
                background-color: var(--tag-object-tag-bg);
                // pointer-events: none;
                pointer-events: none;
                white-space: nowrap;
                font-size: 0.8rem;
                &:slotted(span) {
                    font-size: 0.8rem;
                }
    
                &.clickable {
                    cursor: pointer;
                    pointer-events: auto;
                }
    
                &:hover {
                    background-color: var(--tag-object-tag-hover-bg);
                }
            }
        }

        .left {
            margin-left: auto;
        }
    }

    .body {
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        //margin-top: 0.5rem;

        .item {
            display: flex;
            flex-direction: column;
            // justify-content: space-between;
            padding: 0.275rem 0.3rem;
            border-bottom: var(--tag-object-border);
            // border-radius: 0.3rem;
            margin-bottom: 0.3rem;
            font-size: 1rem;

            &:only-child {
                border-bottom: none;
                margin-bottom: 0;
                .title {
                    display: none;
                }
            }

            .title {
                font-size: 1.075rem;
                margin-bottom: 0.3rem;
            }
        } 
    }

    .foot {
        display: flex;
        // flex-direction: row-reverse;
        margin-top: 0.5rem;
    }
}

</style>