<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import blogSuggestion from "@/components/@spk/pages/blog-suggestion.vue";


import media39 from "/images/media/media-39.jpg";
import media56 from "/images/media/media-56.jpg";
import media54 from "/images/media/media-54.jpg";
import media52 from "/images/media/media-52.jpg";
import media74 from "/images/media/media-74.jpg";
import media49 from "/images/media/media-49.jpg";
import media76 from "/images/media/media-76.jpg";

export default {
    setup() {
        definePageMeta({
            middleware: ["auth"],
        })

        const picked = ref(new Date());
        const time = ref({
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
        })
        return { picked, time, }
    },
    components: {
        PageHeader,
        blogSuggestion
    },
    data() {
        return {
            dataToPass: {
                current: "Create Blog",
                list: [
                    'Blog ', 'Create Blog'
                ]
            },
            categorySelect: null,
            categoryOptions: [
                { name: 'Beauty', code: 'Beauty' },
                { name: 'Fashion', code: 'Fashion' },
                { name: 'Travel', code: 'Travel' },
                { name: 'Food', code: 'Food' },
                { name: 'Sports', code: 'Sports' },
                { name: 'Nature', code: 'Nature' },
            ],
            publishSelect: null,
            publishOptions: [
                { name: 'Published', code: 'Published' },
                { name: 'Hold', code: 'Hold' },
            ],
            blogSelect: null,
            blogOptions: ['Top Blog', 'Blogger', 'Adventure', 'Landscape'],
            content: '',
            tagValue: [
                { name: 'Landscape', code: 'Landscape' },
                { name: 'Blogger', code: 'Blogger' },
            ],
            tagOptions: [
                { name: 'Top Blog', code: 'Top Blog' },
                { name: 'Blogger', code: 'Blogger' },
                { name: 'Adventure', code: 'Adventure' },
                { name: 'Landscape', code: 'Landscape' }
            ],
            recentPosts: [
                { id: 1, img: media39, size: "xl", title: "Animals", description: "There are many variations of passages of Lorem Ipsum available", created_at: "24,Nov 2022 - 18:27", },
                { id: 2, img: media56, size: "xl", title: "Travel", description: "Latin words, combined with a handful of model sentence", created_at: "28,Nov 2022 - 10:45", },
                { id: 3, img: media54, size: "xl", title: "Interior", description: "Contrary to popular belief, Lorem Ipsum is not simply random", created_at: "30,Nov 2022 - 08:32", },
                { id: 4, img: media52, size: "xl", title: "Nature", description: "It was popularised in the 1960s with the release of Letraset sheets containing", created_at: "3,Dec 2022 - 12:56", },
                { id: 4, img: media74, size: "xl", title: "Health", description: "It was popularised in the 1960s with the release of Letraset sheets containing", created_at: "16,Dec 2022 - 04:56", },
                { id: 4, img: media49, size: "xl", title: "Food", description: "It was popularised in the 1960s with the release of Letraset sheets containing", created_at: "31,Dec 2022 - 18:06", },
                { id: 4, img: media76, size: "xl", title: "Travel", description: "It was popularised in the 1960s with the release of Letraset sheets containing", created_at: "15,Dec 2022 - 14:31", },
            ],

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
            this.tagOptions.push(tag)
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
        <div class="col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="card-title">New Blog</div>
                </div>
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-xl-12">
                            <label for="blog-title" class="form-label">Blog Title</label>
                            <input type="text" class="form-control" id="blog-title" placeholder="Blog Title">
                        </div>
                        <div class="col-xl-12">
                            <label for="blog-category" class="form-label">Blog Category</label>
                            <VueMultiselect :show-labels="false" v-model="categorySelect"
                                tag-placeholder="Add this as new tag" placeholder="Select Category" label="name"
                                track-by="code" :options="categoryOptions" :multiple="true" @tag="addTag">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label for="blog-author" class="form-label">Blog Author</label>
                            <input type="text" class="form-control" id="blog-author" placeholder="Enter Name">
                        </div>
                        <div class="col-xl-6">
                            <label for="blog-author-email" class="form-label">Email</label>
                            <input type="text" class="form-control" id="blog-author-email" placeholder="Enter Email">
                        </div>
                        <div class="col-xl-6">
                            <label for="publish-date" class="form-label">Publish Date</label>
                            <div class="form-group">
                                <div class="input-group flex-nowrap input-group-custom">
                                    <div class="input-group-text text-muted"> <i class="ri-calendar-line"></i> </div>
                                    <Datepicker placeholder="Choose Date" class="form-control" autoApply
                                        v-model="picked" />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <label for="publish-time" class="form-label">Publish Time</label>
                            <div class="input-group input-group-custom">
                                <div class="input-group-text text-muted"> <i class="ri-calendar-line"></i> </div>
                                <Datepicker placeholder="Date Time" class="form-control datepicker-here" autoApply
                                    time-picker v-model="time">
                                    <template #input-icon>
                                        <div class="input-group-text text-muted"> <i class="ri-calendar-line"></i>
                                        </div>
                                    </template>
                                </Datepicker>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <label for="product-status-add" class="form-label">Published Status</label>
                            <VueMultiselect :show-labels="false" v-model="publishSelect"
                                tag-placeholder="Add this as new tag" placeholder="Select" label="name" track-by="code"
                                :options="publishOptions" :multiple="true" @tag="addTag">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-6">
                            <label for="blog-tags" class="form-label">Blog Tags</label>
                            <VueMultiselect :show-labels="false" v-model="tagValue"
                                tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name"
                                track-by="code" :options="tagOptions" :multiple="true" :taggable="true" @tag="addTag">
                            </VueMultiselect>
                        </div>
                        <div class="col-xl-12">
                            <label class="form-label">Blog Content</label>
                            <vue-editor v-model="content"></vue-editor>
                        </div>
                        <div class="col-xl-12 blog-images-container">
                            <label for="blog-author-email" class="form-label">Blog Images</label>
                            <DropZone :maxFiles="4" :uploadOnDrop="true" :multipleUpload="true" :parallelUpload="3" />
                        </div>
                        <div class="col-xl-12">
                            <label class="form-label">Blog Type</label>
                            <div class="d-flex align-items-center">
                                <div class="form-check me-3">
                                    <input class="form-check-input" type="radio" name="blog-type" id="blog-free1"
                                        checked>
                                    <label class="form-check-label" for="blog-free1">
                                        Free
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="blog-type" id="blog-paid1">
                                    <label class="form-check-label" for="blog-paid1">
                                        Paid
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="btn-list text-end">
                        <button type="button" class="btn btn-sm btn-light">Save As Draft</button>
                        <button type="button" class="btn btn-sm btn-primary">Post Blog</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xxl-3 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="card-title">
                        Recent Blogs
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="post in recentPosts" :key="post.id">
                            <blogSuggestion :post="post" :showIcon="true" />
                        </li>
                        <li class="list-group-item text-center">
                            <button type="button" class="btn btn-primary-light">Load more</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--End::row-1 -->
</template>

<style scoped></style>
