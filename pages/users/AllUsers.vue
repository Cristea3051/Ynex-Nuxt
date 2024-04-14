<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import auth from '@/middleware/auth';

export default {
    setup() {

        definePageMeta({
            middleware: [auth],
        })
    },
    components: {
        PageHeader,
    },
    data() {
        return {
            dataToPass: {
                current: "Users",
                list: [
                    'Pages', 'Users'
                ]
            },
            teamLimitValue: null,
            teamLimitOptions: [10, 20, 30]
        };
    },
};
</script>

<template>
    <PageHeader :propData="dataToPass" />

    <div class="row mt-4">
        <div class="col-xl-12">
            <div class="team-members" id="team-members">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card custom-card">
                            <div class="card-body">
                                <div class="team-header">
                                    <div class="d-flex flex-wrap align-items-center justify-content-between">
                                        <div class="h5 fw-semibold mb-0">Users</div>
                                        <div class="d-flex align-items-center">
                                            <div class="input-group">
                                                <input type="text" class="form-control bg-light border-0"
                                                    placeholder="Search Person Name" aria-describedby="search-team-member">
                                                <button class="btn btn-light" type="button" id="search-team-member"><i
                                                        class="ri-search-line text-muted"></i></button>
                                            </div>
                                            <div class="dropdown ms-2">
                                                <button class="btn btn-light btn-wave waves-effect waves-light px-2"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="ti ti-dots-vertical fs-18"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="javascript:void(0);">Delete Team</a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="javascript:void(0);">Edit</a></li>
                                                    <li><a class="dropdown-item" href="javascript:void(0);">Add Member</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-4 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card team-member-card">
                            <div class="teammember-cover-image">
                                <img src="/images/media/team-covers/1.jpg" class="card-img-top" alt="...">
                                <span class="avatar avatar-xl avatar-rounded">
                                    <img src="/images/faces/11.jpg" alt="">
                                </span>
                                <a href="javascript:void(0);" class="team-member-star text-warning">
                                    <i class="ri-star-fill fs-16"></i>
                                </a>
                            </div>
                            <div class="card-body p-0">
                                <div
                                    class="d-flex flex-wrap align-item-center mt-sm-0 mt-5 justify-content-between border-bottom border-block-end-dashed p-3">
                                    <div class="team-member-details flex-fill">
                                        <p class="mb-0 fw-semibold fs-16 text-truncate">
                                            <a href="javascript:void(0);">Alexander Smith</a>
                                        </p>
                                        <p class="mb-0 fs-12 text-muted text-break">alexandersmith2135@gmail.com</p>
                                    </div>
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-icon btn-light btn-wave" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="ti ti-dots-vertical"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="javascript:void(0);">Move To</a></li>
                                            <li><a class="dropdown-item" href="javascript:void(0);">Edit</a></li>
                                            <li><a class="dropdown-item" href="javascript:void(0);">Remove</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="team-member-stats d-sm-flex justify-content-evenly">
                                    <div class="text-center p-3 my-auto">
                                        <p class="fw-semibold mb-0">Member Since</p>
                                        <span class="text-muted fs-12">16 Months</span>
                                    </div>
                                    <div class="text-center p-3 my-auto">
                                        <p class="fw-semibold mb-0">Projects</p>
                                        <span class="text-muted fs-12">45</span>
                                    </div>
                                    <div class="text-center p-3 my-auto">
                                        <p class="fw-semibold mb-0">Position</p>
                                        <span class="text-muted fs-12">Member</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer border-block-start-dashed text-center">
                                <div class="btn-list">
                                    <div class="btn-list">
                                        <button class="btn btn-sm btn-icon btn-light btn-wave waves-effect waves-light">
                                            <i class="ri-facebook-line fw-bold"></i>
                                        </button>
                                        <button
                                            class="btn btn-sm btn-icon btn-secondary-light btn-wave waves-effect waves-light">
                                            <i class="ri-twitter-line fw-bold"></i>
                                        </button>
                                        <button
                                            class="btn btn-sm btn-icon btn-warning-light btn-wave waves-effect waves-light">
                                            <i class="ri-instagram-line fw-bold"></i>
                                        </button>
                                        <button
                                            class="btn btn-sm btn-icon btn-success-light btn-wave waves-effect waves-light">
                                            <i class="ri-github-line fw-bold"></i>
                                        </button>
                                        <button
                                            class="btn btn-sm btn-icon btn-danger-light btn-wave waves-effect waves-light">
                                            <i class="ri-youtube-line fw-bold"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav aria-label="...">
                        <ul class="pagination justify-content-end">
                            <li class="page-item disabled">
                                <span class="page-link">Previous</span>
                            </li>
                            <li class="page-item"><a class="page-link" href="javascript:void(0);">1</a></li>
                            <li class="page-item active" aria-current="page">
                                <span class="page-link">2</span>
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