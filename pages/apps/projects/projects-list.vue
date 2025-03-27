<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import projectslist from "@/components/UI/projectslist.vue";

import faces1 from '/images/faces/1.jpg';
import faces2 from '/images/faces/2.jpg';
import faces8 from '/images/faces/8.jpg';
import faces9 from '/images/faces/9.jpg';
import faces10 from '/images/faces/10.jpg';
import faces11 from '/images/faces/11.jpg';
import faces12 from '/images/faces/12.jpg';
import faces13 from '/images/faces/13.jpg';
import faces14 from '/images/faces/14.jpg';
import faces15 from '/images/faces/15.jpg';
import faces16 from '/images/faces/15.jpg';
import faces5 from '/images/faces/5.jpg';
import faces6 from '/images/faces/6.jpg';
import faces7 from '/images/faces/7.jpg';
import faces3 from '/images/faces/3.jpg';
import companyLogo1 from '/images/company-logos/1.png';
import companyLogo2 from '/images/company-logos/2.png';
import companyLogo3 from '/images/company-logos/3.png';
import companyLogo5 from '/images/company-logos/5.png';
import companyLogo8 from '/images/company-logos/8.png';
import companyLogo9 from '/images/company-logos/9.png';
import companyLogo6 from '/images/company-logos/6.png';
import companyLogo10 from '/images/company-logos/10.png';

export default {
    setup() {
        definePageMeta({
            middleware: ["auth"],
        })

    },
    components: {
        PageHeader,
        projectslist
    },
    data() {
        return {
            dataToPass: {
                current: "Projects List",
                list: [
                    'Apps', 'Projects', 'Projects List'
                ]
            },
            sortBySelecteValue: null,
            sortBySelecteOptions: ['A - Z', 'Date Added', 'Newest', 'Type',],
            projectListData: [
                {
                    logo: companyLogo1, title: 'Design & Developing New Project', Color: 'danger', CompletedTasks: '18', TotalTasks: '22', values: '+2', members: [
                        { img: faces2, name: '' },
                        { img: faces8, name: '' },
                        { img: faces9, name: '' },
                        { img: faces10, name: '' },
                        { img: faces11, name: '' },
                        { img: faces12, name: '' },
                    ], priority: 'low', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores similique tempore.', statusClass: '', status: '80', assignedDate: '24,May 2023', dueDate: '12,Jul 2023', badgeColor: "success"
                },
                {
                    logo: companyLogo2, title: 'Content Management System (CMS) Integration', Color: 'warning', CompletedTasks: '26', TotalTasks: '28', values: '+4', members: [
                        { img: faces12, name: '' },
                        { img: faces10, name: '' },
                        { img: faces11, name: '' },
                        { img: faces12, name: '' },
                        { img: faces13, name: '' },
                    ], priority: 'Medium', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores similique tempore.', statusClass: 'bg-info-transparent', status: '45', assignedDate: '20,May 2023', dueDate: '10,Jun 2023', badgeColor: "info"
                },
                {
                    logo: companyLogo3, title: 'Task Scheduler and Automation', Color: 'secondary', CompletedTasks: '21', TotalTasks: '45', values: '+1', members: [
                        { img: faces5, name: '' },
                        { img: faces6, name: '' },
                        { img: faces7, name: '' },
                    ], priority: 'low', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores similique tempore', statusClass: 'text-primary', status: '60', assignedDate: '31,May 2023', dueDate: '10,Jul 2023', badgeColor: "success"
                },
                {
                    logo: companyLogo5, title: 'Advanced Search and Filtering', Color: 'success', CompletedTasks: '45', TotalTasks: '54', values: '+2', members: [
                        { img: faces3, name: '' },
                        { img: faces9, name: '' },
                        { img: faces12, name: '' },
                        { img: faces11, name: '' },
                        { img: faces13, name: '' },
                        { img: faces14, name: '' },
                    ], priority: 'High', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores similique tempore.', statusClass: 'bg-danger-transparent', status: '89', assignedDate: '02,Jun 2023', dueDate: '15,Jun 2023', badgeColor: "danger"
                },
                {
                    logo: companyLogo8, title: 'Data Export and Reporting', Color: 'primary', CompletedTasks: '14', TotalTasks: '26', values: '+1', members: [
                        { img: faces10, name: '' },
                        { img: faces2, name: '' },
                        { img: faces1, name: '' },
                        { img: faces12, name: '' },
                    ], priority: 'Medium', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores similique tempore.', statusClass: 'bg-info-transparent', status: '60', assignedDate: '29,May 2023', dueDate: '08,Jun 2023', badgeColor: "info"
                },
                {
                    logo: companyLogo10, title: 'Activity Log and Audit Trail', Color: 'success', CompletedTasks: '28', TotalTasks: '64', members: [
                        { img: faces7, name: '' },
                        { img: faces13, name: '' },
                    ], priority: 'Low', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores similique tempore.', statusClass: 'bg-success-transparent', status: '45', assignedDate: '04,Jun 2023', dueDate: '15,Jun 2023', badgeColor: "success"
                },
                {
                    logo: companyLogo9, title: 'Role-Based Access Control (RBAC) Implementation', Color: 'info', CompletedTasks: '86', TotalTasks: '122', values: '+2', members: [
                        { img: faces2, name: '' },
                        { img: faces14, name: '' },
                        { img: faces15, name: '' },
                        { img: faces11, name: '' },
                        { img: faces13, name: '' },
                    ], priority: 'High', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores similique tempore.', statusClass: 'bg-danger-transparent', status: '65', assignedDate: '24,Jun 2023', dueDate: '05,Jul 2023', badgeColor: "danger"
                },
                {
                    logo: companyLogo6, title: 'Customizable Themes and Layouts', CompletedTasks: '20', Color: 'teal', TotalTasks: '26', values: '+2', members: [
                        { img: faces13, name: '' },
                        { img: faces16, name: '' },
                        { img: faces8, name: '' },
                        { img: faces12, name: '' },
                        { img: faces13, name: '' },
                    ], priority: 'Medium', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores similique tempore.', statusClass: 'bg-info-transparent', status: '75', assignedDate: '20,Jun 2023', dueDate: '18,Jul 2023', badgeColor: "info"
                },
            ]
        };
    },
};
</script>

<template>
    <PageHeader :propData="dataToPass" />

    <!-- Start::row-1 -->
    <div class="row">
        <div class="col-xl-12">
            <div class="card custom-card">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div class="d-flex flex-wrap gap-1 project-list-main">
                            <NuxtLink to="/apps/projects/create-project" class="btn btn-primary me-2"><i
                                    class="ri-add-line me-1 fw-semibold align-middle"></i>New Project</NuxtLink>
                            <VueMultiselect class="w-150p" :show-labels="false" name="sortBy" id="sortBy"
                                placeholder="Sort By" v-model="sortBySelecteValue" :multiple="false"
                                :options="sortBySelecteOptions">
                            </VueMultiselect>
                        </div>
                        <div class="avatar-list-stacked">
                            <span class="avatar avatar-sm avatar-rounded">
                                <img src="/images/faces/1.jpg" alt="img">
                            </span>
                            <span class="avatar avatar-sm avatar-rounded">
                                <img src="/images/faces/2.jpg" alt="img">
                            </span>
                            <span class="avatar avatar-sm avatar-rounded">
                                <img src="/images/faces/8.jpg" alt="img">
                            </span>
                            <span class="avatar avatar-sm avatar-rounded">
                                <img src="/images/faces/12.jpg" alt="img">
                            </span>
                            <span class="avatar avatar-sm avatar-rounded">
                                <img src="/images/faces/10.jpg" alt="img">
                            </span>
                            <span class="avatar avatar-sm avatar-rounded">
                                <img src="/images/faces/4.jpg" alt="img">
                            </span>
                            <span class="avatar avatar-sm avatar-rounded">
                                <img src="/images/faces/5.jpg" alt="img">
                            </span>
                            <span class="avatar avatar-sm avatar-rounded">
                                <img src="/images/faces/13.jpg" alt="img">
                            </span>
                            <a class="avatar avatar-sm bg-primary avatar-rounded text-fixed-white"
                                href="javascript:void(0);">
                                +8
                            </a>
                        </div>
                        <div class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search Project"
                                aria-label="Search">
                            <button class="btn btn-light" type="submit">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End::row-1 -->

    <!-- Start::row-2 -->
    <div class="row">
        <projectslist :projectListData=projectListData></projectslist>
    </div>
    <!--End::row-2 -->
    <ul class="pagination justify-content-end">
        <li class="page-item disabled">
            <a class="page-link">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">1</a></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
        <li class="page-item">
            <a class="page-link" href="javascript:void(0);">Next</a>
        </li>
    </ul>
</template>

<style scoped></style>
