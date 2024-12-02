<template>
    <div class="view">
        <div class="setting">
            <h2>Cài đặt xuất/in đề thi</h2>
            <div class="option">
                <!-- <div>
                    <label for="exam_name">Tên đề thi:</label>
                    <input type="text" v-model="examStore?.printExam?.title">
                </div> -->
                <!-- <div>
                    <label for="exam_name">Mã đề thi:</label>
                    <input type="text" v-model="examStore?.printExam?.code">
                </div>  -->
            </div>
            <div class="actions">
                <button class="btn-custom" @click="handlePrint">
                    In đề
                    <div class="popup">
                        <span class="popuptext" id="myPopup">In đề thi</span>
                    </div>
                </button>
                <button class="btn-custom" disabled>
                    Xuất PDF
                    <div class="popup">
                        <span class="popuptext" id="myPopup">
                            Tính năng chưa khả dụng ! <br>
                            Bạn có thể thử tính năng SaveAsPdf của Print</span>
                    </div>
                </button>
            </div>
        </div>
        <div class="preview" >
            <div class="actions">
                <div class="dropdown">
                    {{ render_mode }}
                    <ul  class="menu">
                        <li @click="render_mode = 'pagedjs'">pagedjs</li>
                        <li @click="render_mode = 'html'">html</li>
                    </ul>
                </div>
                &nbsp; | &nbsp; 
                <div class="dropdown">
                    {{ exam_mode }}
                    <ul  class="menu">
                        <li @click="exam_mode = 'exam'">exam</li>
                        <li @click="exam_mode = 'answer'">answer</li>
                    </ul>
                </div>
                
            </div>
            <div class="doc" ref="examRef">
                <ExamRenderPagedJS :exam="data" :render_mode="render_mode" :exam_mode="exam_mode"></ExamRenderPagedJS>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, defineAsyncComponent } from 'vue';
import {useVueToPrint, VueToPrint} from 'vue-to-print'; // use for print a vue component


import Exam from '@/classes/exam';
import { useExamStore } from '@/stores/exams';
import {useRoute} from "vue-router";
import {getExam} from "@/api/exam";

import type { RenderMode, ExamMode } from '@/components/ExamRender/ExamRenderPagedJS.vue';
const ExamRenderPagedJS = defineAsyncComponent(() => import('@/components/ExamRender/ExamRenderPagedJS.vue'));

const route = useRoute();

const exam_mode = ref<ExamMode>("exam" as ExamMode);
const render_mode = ref<RenderMode>("pagedjs" as RenderMode);

const examRef = ref();

const data = ref<Exam | null>(null);

const { handlePrint  } = useVueToPrint({
    content: examRef,
    documentTitle: 'output',

})


onMounted(async () => {
    const id = route.params.id;
    await getExam(id).then((res) => {
        data.value = res;
        // log type of data.value
        console.log(data.value);
    })
});

// watch([() => examData.value.exam_name], (newVal) => {
//     docRef.value.render();
// });


</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.view {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    // flex-direction: column;
    // background: red;

    .setting {
        width: 100%;
        padding: 10px;
        font-family: "Roboto", sans-serif;
        display: inline;

        h2 {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 10px;
            margin-top: 0;
        }

        // .func {}
    }


    .preview {
        min-width: 795.511px;
        width: 900px;
        // height: 100%;

        display: flex;
        justify-content: center;
        align-content: center;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: lightgray;
        height: 100%;
        float: right;
        position: absolute;
        right: 0;

        &::-webkit-scrollbar {
            display: none;
        }
        

        .doc {
            width: 100%;
            // position: fixed;
        }

        .actions {
            position: fixed;
            margin-top: 20px;
            // width: 300px;
            // left: 50%; //center
            // background: red;
            padding: 10px 20px;
            z-index: 1;
            border-radius: 999em 999em;
            justify-content: space-between;
            
            border: 1px solid lightgray;
            display: flex;
            flex-direction: row;
            // opacity: 0;
            background: rgba(255, 255, 255, 0.884);

            .dropdown {
                // position: relative;
                display: inline-block;

                .menu {
                    display: none;
                    position: absolute;
                    background-color: #f9f9f9;
                    // min-width: 160px;
                    // box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                    padding: 0;
                    z-index: 1;
                    border-radius: 5px;
                    margin: 0;

                    li {
                        list-style: none;
                        padding: 10px 20px;
                        cursor: pointer;
                        border-radius: 5px;
                        &:hover {
                            background-color: #f1f1f1;
                        }
                    }
                }

                &:hover .menu {
                    display: block;
                }
            }

        }


    }
}

.btn-custom {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 999em;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    margin-right: 10px;

    &:hover {
        background-color: #45a049;

        .popup {
            visibility: visible;
            transition: .3s linear;
            transform: translateY(0px);
            opacity: 1;
        }
    }

    &:disabled {
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }

    .popup {
        position: absolute;
        visibility: hidden;
        z-index: 1;
        opacity: .40;
        background: #f1f1f1;
        border: 1px solid #d3d3d3;
        border-radius: 5px;
        padding: 10px;
        // margin-top: 10px;
        // margin-left: 10px;
        color: black;
        // animation: fadeIn 1s;
        transform: translateY(9px);
        transition: all 0.3s ease-in-out;
        // animation: odsoky 1s ease-in-out infinite  alternate;
        text-align: left;
    }
}
</style>