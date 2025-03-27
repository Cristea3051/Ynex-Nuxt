<script lang="ts">
import { ref } from "vue";
import PageHeader from "@/components/common/pageheader.vue";

export default {
    setup() {
        const picked = ref(new Date());
        const picked1 = ref(new Date());
        return { picked, picked1 };
    },
    components: {
        PageHeader,
    },
    data() {
        return {
            dataToPass: {
                current: "Create Project",
                list: [
                    'Apps', 'Projects', 'Create Project'
                ]
            },
            tagValue: [
                { name: 'Research', code: 're' },
                { name: 'Design', code: 'des' },
                { name: 'Development', code: 'dev' },
                { name: 'Marketing', code: 'mark' },
            ],
            tagOptions: [
                { name: 'Research', code: 're' },
                { name: 'Design', code: 'des' },
                { name: 'Development', code: 'dev' },
                { name: 'Marketing', code: 'mark' },
                { name: 'Sales', code: 'sales' }
            ],
            AssignedSelecteOption: [
                { name: 'Angelina May' },
                { name: 'Kiara advain' },
                { name: 'Hercules Jhon' },
            ],
            prioritySelecteValue: null,
            prioritySelecteOptions: ['Low', 'Medium', 'High'],
            statusSelecteValue: null,
            statusSelecteOptions: ['Inprogress', 'On-hold', 'Completed'],
            AssignedSelecteValue: null,
            AssignedSelecteOptions: [
                { name: 'Angelina May' },
                { name: 'Kiara advain' },
                { name: 'Hercules Jhon' },
                { name: 'Mayor Kim' },
                { name: 'Alexa Biss' },
                { name: 'Karley Dia' },
                { name: 'Kim Jong' },
                { name: 'Darren Sami' },
                { name: 'Elizabeth' },
                { name: 'Bear Gills' },
                { name: 'Alex Carey' }
            ],
            content: '<p>lorem Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33.</p> <p><br></p>  <ol> <li class="ql-size-normal">Conducting a comprehensive analysis of the existing website design.</li> <li class="">Collaborating with the UI/UX team to develop wireframes and mockups.</li> <li class="">Iteratively refining the design based on feedback..</li> <li class="">Implementing the finalized design changes using HTML, CSS, and JavaScript. </li> <li class="">Testing the website across different devices and browsers.</li> </ol>'
        };
    },
    methods: {

        addTag(newTag: string) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.tagOptions.push(tag)
            this.tagValue.push(tag)
        },
    },
};
</script>

<template>
    <PageHeader :propData="dataToPass" />

    <!-- Start::row-1 -->
    <div class="row">
        <div class="col-xl-12">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="card-title">
                        Create Project
                    </div>
                </div>
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-xl-4">
                            <label for="input-label" class="form-label">Project Name :</label>
                            <input type="text" class="form-control" id="input-label" placeholder="Enter Project Name">
                        </div>
                        <div class="col-xl-4">
                            <label for="input-label11" class="form-label">Project Manager :</label>
                            <input type="text" class="form-control" id="input-label11"
                                placeholder="Project Manager Name">
                        </div>
                        <div class="col-xl-4">
                            <label for="input-label1" class="form-label">Client / Stakeholder :</label>
                            <input type="text" class="form-control" id="input-label1" placeholder="Enter Client Name">
                        </div>
                        <div class="col-xl-12">
                            <label class="form-label">Project Description :</label>
                            <vue-editor id="project-descriptioin-editor" v-model="content"></vue-editor>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Start Date :</label>
                            <div class="form-group">
                                <div class="input-group flex-nowrap input-group-custom">
                                    <div class="input-group-text text-muted"> <i class="ri-calendar-line"></i> </div>
                                    <Datepicker placeholder="Date Time" class="form-control" autoApply v-model="picked"
                                        time-picker-inline />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">End Date :</label>
                            <div class="form-group">
                                <div class="input-group flex-nowrap input-group-custom">
                                    <div class="input-group-text text-muted"> <i class="ri-calendar-line"></i> </div>
                                    <Datepicker placeholder="Date Time" class="form-control" autoApply v-model="picked1"
                                        time-picker-inline />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Status :</label>
                            <VueMultiselect :show-labels="false" name="status" id="status" v-model="statusSelecteValue"
                                :multiple="false" :options="statusSelecteOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Priority :</label>
                            <VueMultiselect :show-labels="false" name="priority" id="priority"
                                v-model="prioritySelecteValue" :multiple="false" :options="prioritySelecteOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Assigned To</label>
                            <VueMultiselect :show-labels="false" v-model="AssignedSelecteOption"
                                tag-placeholder="Add this as new tag" label="name" track-by="code"
                                :options="AssignedSelecteOptions" :multiple="true" :taggable="true">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Tags</label>
                            <VueMultiselect :show-labels="false" v-model="tagValue"
                                tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name"
                                track-by="code" :options="tagOptions" :multiple="true" :taggable="true" @tag="addTag">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-12">
                            <label class="form-label">Attachments</label>
                            <DropZone class="multiple-filepond overflow-hidden" :maxFiles="6" :uploadOnDrop="true"
                                :multipleUpload="true" :parallelUpload="3" />
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary-light btn-wave ms-auto float-end">Create Project</button>
                </div>
            </div>
        </div>
    </div>
    <!--End::row-1 -->
</template>

<style scoped></style>
