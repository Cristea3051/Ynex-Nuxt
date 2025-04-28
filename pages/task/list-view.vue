<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import { listViewOptions, listViewSeries, totalTasks } from '@/data/list-view.js';

import { startOfQuarter } from "date-fns";

export default {
    setup() {
        definePageMeta({
            middleware: ["auth"],
        })

        const picked = ref(new Date());
        const picked2 = ref(new Date());
        const lowerpicked = new Date(picked2.value);
        const date = ref();
        const date1 = ref();

        const quarter = ref(startOfQuarter(new Date()));
        // Get the day of the month
        const currentDay = picked.value.getDate();

        const time = ref({
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
        })
        const month = ref({
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        });
        // Calculate the date of the next 5th day
        const picked1 = new Date(picked.value);
        picked1.setDate(currentDay + 5);
        lowerpicked.setDate(currentDay - 5);
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
        date.value = [startDate, endDate];
        date1.value = [startDate, endDate];


        const weekPicker = ref();
        const inlinedate = ref(new Date());

        return { lowerpicked, picked, picked1, picked2, date, date1, time, month, quarter, weekPicker, inlinedate }

    },
    components: {
        PageHeader,
    },
    data() {
        return {
            dataToPass: {
                current: "List View",
                list: [
                    'Task', 'List View'
                ]
            },
            totalTasks,
            listViewSeries, listViewOptions,
            priorityValue: null,
            priorityOptions: ['Low', 'Medium', 'High'],


            statusValue: null,
            statusOptions: ['New', 'Completed', 'Inprogress', 'Pending'],


            assignToValue: null,
            assignToOptions: ['Angelina May', 'Kiara advain', 'Hercules Jhon', 'Mayor Kim'],

        };
    },
    methods: {

        selectAllProducts(event: Event) {
            if (event.currentTarget) {
                let element = event.currentTarget as HTMLInputElement;
                const elements = this.$refs['checkOption'];
                if (elements) {
                    const elementsArray = Array.isArray(elements) ? elements : [elements];
                    if (element.checked) {
                        elementsArray?.forEach((e) => {
                            e.checked = true;
                        });
                    } else {
                        elementsArray?.forEach((e) => {
                            e.checked = false;
                        });
                    }
                }
            }
        },
        checkFn(event: Event) {
            let element = event.currentTarget as HTMLInputElement;
            let allChecked = true;
            const elements = this.$refs['checkOption'];
            if (elements) {
                const elementsArray = Array.isArray(elements) ? elements : [elements];
                if (element.checked) {
                    elementsArray?.forEach((e) => {
                        if (!e.checked) {
                            allChecked = false;
                        }
                    });
                } else {
                    elementsArray?.forEach((e) => {
                        if (!e.checked) {
                            allChecked = false;
                        }
                    });
                }
                let checkAll = this.$refs['checkall'] as HTMLInputElement;
                if (allChecked) {
                    checkAll.checked = true;
                } else {
                    checkAll.checked = false;
                }
            }
        },
        deleteProducts(item: any) {
            this.totalTasks = this.totalTasks.filter(itm => itm.id != item.id);

        }

    },

};
</script>

<template>
    <PageHeader :propData="dataToPass" />
    <!-- Start::row-1 -->
    <div class="row">
        <div class="col-xxl-12 col-xl-8">
            <div class="card custom-card">
                <div class="card-header justify-content-between">
                    <div class="card-title">
                        Total Tasks
                    </div>
                    <div class="d-flex">
                        <button class="btn btn-sm btn-primary btn-wave waves-light" data-bs-toggle="modal"
                            data-bs-target="#create-task"><i class="ri-add-line fw-semibold align-middle me-1"></i>
                            Create
                            Task</button>
                        <!-- Start::add task modal -->
                        <div class="modal fade" id="create-task" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h6 class="modal-title">Add Task</h6>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body px-4">
                                        <div class="row gy-2">
                                            <div class="col-xl-6">
                                                <label for="task-name" class="form-label">Task Name</label>
                                                <input type="text" class="form-control" id="task-name"
                                                    placeholder="Task Name">
                                            </div>
                                            <div class="col-xl-6">
                                                <label for="task-id" class="form-label">Task ID</label>
                                                <input type="text" class="form-control" id="task-id"
                                                    placeholder="Task ID">
                                            </div>
                                            <div class="col-xl-6">
                                                <label class="form-label">Assigned Date</label>
                                                <div class="form-group">
                                                    <div class="input-group flex-nowrap input-group-custom">
                                                        <div class="input-group-text text-muted"> <i
                                                                class="ri-calendar-line"></i> </div>
                                                        <Datepicker placeholder="Date Time" class="form-control"
                                                            autoApply v-model="picked" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-6">
                                                <label class="form-label">Due Date</label>
                                                <div class="form-group">
                                                    <div class="input-group flex-nowrap input-group-custom">
                                                        <div class="input-group-text text-muted"> <i
                                                                class="ri-calendar-line"></i> </div>
                                                        <Datepicker placeholder="Date Time" class="form-control"
                                                            autoApply v-model="picked2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-6">
                                                <label class="form-label">Status</label>
                                                <VueMultiselect :show-labels="false" v-model="statusValue"
                                                    :options="statusOptions" placeholder="Status">
                                                </VueMultiselect>
                                            </div>
                                            <div class="col-xl-6">
                                                <label class="form-label">Priority</label>
                                                <VueMultiselect :show-labels="false" v-model="priorityValue"
                                                    :options="priorityOptions" placeholder="Priority">
                                                </VueMultiselect>
                                            </div>
                                            <div class="col-xl-12">
                                                <label class="form-label">Assign To</label>
                                                <VueMultiselect :show-labels="false" v-model="assignToValue"
                                                    :options="assignToOptions" placeholder="Assign">
                                                </VueMultiselect>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-light"
                                            data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary">Add Task</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End::add task modal -->
                        <div class="dropdown ms-2">
                            <button class="btn btn-icon btn-secondary-light btn-sm btn-wave waves-light" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="ti ti-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="javascript:void(0);">New Tasks</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Pending Tasks</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Completed Tasks</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Inprogress Tasks</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table text-nowrap table-bordered">
                            <thead>
                                <tr>
                                    <th>
                                        <input ref="checkall" @click="selectAllProducts"
                                            class="form-check-input check-all" type="checkbox" id="all-tasks" value=""
                                            aria-label="...">
                                    </th>
                                    <th scope="col">Task</th>
                                    <th scope="col">Task ID</th>
                                    <th scope="col">Assigned Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Assigned To</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, key) in totalTasks" :key="key" class="task-list">
                                    <td class="task-checkbox"><input @click="checkFn" ref="checkOption"
                                            class="form-check-input" type="checkbox" value="" aria-label="..."></td>
                                    <td>
                                        <span class="fw-semibold">{{ item.task }}</span>
                                    </td>
                                    <td>
                                        <span class="fw-semibold">{{ item.taskId }}</span>
                                    </td>
                                    <td>
                                        {{ item.assignedDate }}
                                    </td>
                                    <td>
                                        <span class="fw-semibold " :class="item.statusClass">{{ item.status }}</span>
                                    </td>
                                    <td>
                                        {{ item.dueDate }}
                                    </td>
                                    <td>
                                        <span class="badge" :class="item.priorityClass">{{ item.priority }}</span>
                                    </td>
                                    <td>
                                        <div class="avatar-list-stacked">
                                            <span v-for="(img, index) in item.assignedTo.slice(0, 3)"
                                                :key="'img' + index" class="avatar avatar-sm avatar-rounded">
                                                <img :src="img.img" alt="img" />
                                            </span>
                                            <a v-if="item.assignedTo?.length - 3 >= 1"
                                                class="avatar avatar-sm bg-primary avatar-rounded text-fixed-white"
                                                href="javascript:void(0);">
                                                +{{ item.assignedTo?.length - 3 }}
                                            </a>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary-light btn-icon btn-sm">
                                            <v-tooltip activator="parent" location="top">Edit</v-tooltip><i
                                                class="ri-edit-line"></i></button>
                                        <button @click="deleteProducts(item)"
                                            class="btn btn-danger-light btn-icon ms-1 btn-sm task-delete-btn"><v-tooltip
                                                activator="parent" location="top">Delete</v-tooltip><i
                                                class="ri-delete-bin-5-line"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <nav aria-label="Page navigation">
                        <ul class="pagination mb-0 float-end">
                            <li class="page-item disabled">
                                <a class="page-link">Previous</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="javascript:void(0);">1</a></li>
                            <li class="page-item active" aria-current="page">
                                <a class="page-link" href="javascript:void(0);">2</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="javascript:void(0);">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
