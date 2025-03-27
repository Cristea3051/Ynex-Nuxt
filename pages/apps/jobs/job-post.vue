<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import { startOfQuarter } from "date-fns";
import { ref } from 'vue'


export default {
    setup() {

        definePageMeta({
            middleware: ["auth"],
        })
        const picked = ref(new Date());
        const picked2 = ref(new Date());
        const lowerpicked = new Date(picked2.value);
        const picked3 = ref(new Date());
        const picked4 = ref(new Date());
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

        return { lowerpicked, picked, picked1, picked2, picked3, picked4, date, date1, time, month, quarter, weekPicker, inlinedate }
    },
    components: {
        PageHeader,
    },
    data() {
        return {
            dataToPass: {
                current: "Job Post",
                list: [
                    'Apps', 'Jobs', 'Job Post'
                ]
            },
            categorySelecteValue: ['Development'],
            categorySelecteOptions: ['Development', 'Marketing', 'IT Software'],
            workingExperienceValue: ['0 - 1 Years'],
            workingExperienceOptions: ['0 - 1 Years', '1 - 3 Years', '3 - 5 Years'],
            jobTypeValue: ['Contract'],
            jobTypeOptions: ['Contract', 'Freelance', 'Full Time', 'Part Time', 'Internship'],
            priorityValue: ['Normal'],
            priorityOptions: ['Normal', 'Urgent'],
            vacanciesValue: ['10'],
            vacanciesOptions: ['10', '20', '30', '40'],
            salaryValue: ['0 - $1,00,000 / Year'],
            salaryOptions: ['0 - $1,00,000 / Year', '$1,00,000 - $3,00,000 / Year', '$3,00,000 - $5,00,000 / Year'],
            genderRequirementValue: ['No Preferences'],
            genderRequirementOptions: ['No Preferences', 'Male Only', 'Female Only'],
            employerNameValue: ['Obligation Pvt.Ltd'],
            employerNameOptions: ['Obligation Pvt.Ltd', 'Voluptatem Pvt.Ltd', 'BloomTech.Inc', 'Spotech Technical Solutions'],
            countryValue: ['India'],
            countryOptions: ['India', 'USA', 'Germany', 'Spain', 'Urgentina'],
            skillsSelecteValue: null,
            skillsSelecteOptions: [{ name: 'React', code: 'React' }, { name: 'JavaScript', code: 'JavaScript' }, { name: 'CSS', code: 'CSS' }, { name: 'HTML', code: 'HTML' }],
            languagesSelecteValue: null,
            languagesSelecteOptions: [{ name: 'English', code: 'English' }, { name: 'French', code: 'French' }, { name: 'Arabic', code: 'Arabic' }, { name: 'Hindi', code: 'Hindi' }],
            qualificationSelecteValue: null,
            qualificationSelecteOptions: [{ name: 'Diploma', code: 'Diploma' }, { name: 'MBA', code: 'MBA' }, { name: 'MCA', code: 'MCA' }, { name: 'Graduate', code: 'Graduate' }],
            tagValue: [{ name: "English", code: 'English' }, { name: "Hindi", code: 'Hindi' },],
            skills: [{ name: 'React', code: 'React' }, { name: 'JavaScript', code: 'JavaScript' }, { name: 'CSS', code: 'CSS' },],
            qualificationSelecteOption: [{ name: 'Diploma', code: 'Diploma' }, { name: 'MBA', code: 'MBA' }, { name: 'MCA', code: 'MCA' },]
        };
    },
    methods: {
        nameWithLang({ name, language }: any) {
            return `${name} — [${language}]`
        },
        addTag(newTag: string) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.$options.push(tag)
            this.tagValue.push(tag)
        },
        customLabel({ title, desc }: any) {
            return `${title} – ${desc}`
        }
    }
};
</script>

<template>
    <PageHeader :propData="dataToPass" />

    <!-- Start::row-1 -->
    <div class="row">
        <div class="col-xxl-9 col-xl-8">
            <div class="card custom-card">
                <div class="card-header justify-content-between">
                    <div class="card-title">
                        Post New Job
                    </div>
                </div>
                <div class="card-body">
                    <div class="row gy-4 mb-4">
                        <div class="col-xl-6">
                            <label for="job-title" class="form-label">Job Title</label>
                            <input type="text" class="form-control" id="job-title" placeholder="Job Title"
                                value="Web Developer">
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Job Category</label>
                            <VueMultiselect :show-labels="false" name="assigned-team-members"
                                :value="categorySelecteValue" id="assigned-team-members" v-model="categorySelecteValue"
                                :multiple="false" :options="categorySelecteOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Working Experience</label>
                            <VueMultiselect :show-labels="false" name="assigned-team-members"
                                :value="workingExperienceValue" id="assigned-team-members"
                                v-model="workingExperienceValue" :multiple="false" :options="workingExperienceOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Job Type</label>
                            <VueMultiselect :show-labels="false" :value="jobTypeValue" name="assigned-team-members"
                                id="assigned-team-members" v-model="jobTypeValue" :multiple="false"
                                :options="jobTypeOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Priority</label>
                            <VueMultiselect :show-labels="false" name="assigned-team-members" :value="priorityValue"
                                id="assigned-team-members" v-model="priorityValue" :multiple="false"
                                :options="priorityOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Vacancies</label>
                            <VueMultiselect :show-labels="false" name="assigned-team-members" :value="vacanciesValue"
                                id="assigned-team-members" v-model="vacanciesValue" :multiple="false"
                                :options="vacanciesOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Salary</label>
                            <VueMultiselect :show-labels="false" :value="salaryValue" name="assigned-team-members"
                                id="assigned-team-members" v-model="salaryValue" :multiple="false"
                                :options="salaryOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label for="skills" class="form-label">Skills :</label>
                            <VueMultiselect :show-labels="false" v-model="skills" tag-placeholder="Add this as new tag"
                                placeholder="Search or add a tag" label="name" track-by="code"
                                :options="skillsSelecteOptions" :multiple="true" :taggable="true" @tag="addTag">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label for="job-deadline" class="form-label">Job Deadline</label>
                            <div class="input-group flex-nowrap input-group-custom">
                                <div class="input-group-text text-muted"> <i class="ri-calendar-line"></i> </div>
                                <Datepicker class="form-control" placeholder="Choose date" v-model="picked" />
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <label class="form-label">Gender Requirement</label>
                            <VueMultiselect :show-labels="false" name="assigned-team-members"
                                :value="genderRequirementValue" id="assigned-team-members"
                                v-model="genderRequirementValue" :multiple="false" :options="genderRequirementOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label for="language" class="form-label">Languages :</label>
                            <VueMultiselect :show-labels="false" v-model="tagValue"
                                tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name"
                                track-by="code" :options="languagesSelecteOptions" :multiple="true" :taggable="true"
                                @tag="addTag"></VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label for="qualification" class="form-label">Qualification :</label>
                            <VueMultiselect :show-labels="false" v-model="qualificationSelecteOption"
                                tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name"
                                track-by="code" :options="qualificationSelecteOptions" :multiple="true" :taggable="true"
                                @tag="addTag"></VueMultiselect>
                        </div>
                        <div class="col-xl-12">
                            <label for="job-description" class="form-label">Job Description :</label>
                            <textarea class="form-control" id="job-description"
                                rows="4">Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit impedit, officiis non minima saepe voluptates a magnam enim sequi porro veniam ea suscipit dolorum vel mollitia voluptate iste nemo!</textarea>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a href="javascript:void(0);" class="btn btn-primary btn-wave waves-effect waves-light">
                        <i class="bi bi-plus-circle"></i> Post Job
                    </a>
                </div>
            </div>
        </div>
        <div class="col-xxl-3 col-xl-4">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="card-title">Assign To Employer</div>
                </div>
                <div class="card-body">
                    <div class="col-xl-12">
                        <label class="form-label">Employer Name</label>
                        <VueMultiselect :show-labels="false" :value="employerNameValue" name="assigned-team-members"
                            id="assigned-team-members" v-model="employerNameValue" :multiple="false"
                            :options="employerNameOptions">
                        </VueMultiselect>
                    </div>
                </div>
            </div>
            <div class="card custom-card">
                <div class="card-header">
                    <div class="card-title">Company Details</div>
                </div>
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-xl-12">
                            <label for="Company-Name" class="form-label">Company Name</label>
                            <input type="text" class="form-control" id="Company-Name" placeholder="Company Name"
                                value="Obligation Pvt.Ltd">
                        </div>
                        <div class="col-xl-12">
                            <label for="Company-Website" class="form-label">Company Website</label>
                            <input type="text" class="form-control" id="Company-Website" placeholder="Company Website"
                                value="http//www.obligationpvtltd.com">
                        </div>
                        <div class="col-xl-12">
                            <label class="form-label">Country</label>
                            <VueMultiselect :show-labels="false" :value="countryValue" name="assigned-team-members"
                                id="assigned-team-members" v-model="countryValue" :multiple="false"
                                :options="countryOptions">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-12">
                            <label for="Company-Address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="Company-Address" placeholder="Company Address"
                                value="USA">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End::row-1 -->
</template>

<style scoped></style>
