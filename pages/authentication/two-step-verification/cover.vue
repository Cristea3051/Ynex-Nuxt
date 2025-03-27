<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    methods: {
        valueChange(nextInputRef: string) {
            // Type $refs as Record<string, HTMLInputElement | null>
            const nextInput = this.$refs[nextInputRef] as HTMLInputElement | undefined;

            if (nextInput) {
                nextInput.focus();
            }
        }
    },
    setup() {
        definePageMeta({
            layout: 'custom'
        });
        const setBodyClass = (action: string) => {
            if (action === "add") {
                document.body.classList.add("bg-white");
            } else {
                document.body.classList.remove("bg-white");
            }
        };

        onMounted(() => {
            const router = useRouter();

            // Check if the user has visited before
            if (localStorage.getItem("visited") === "true") {
                setBodyClass("add");
            } else {
                setBodyClass("add");
                localStorage.setItem("visited", "true");
            }

            // Listen for route changes to remove class on navigation
            router.beforeEach(() => {
                setBodyClass("remove");
            });

            const handleBeforeUnload = () => {
                setBodyClass("remove");
                localStorage.removeItem("visited");
            };

            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
                setBodyClass("remove");
            };
        });
        return {
            pagination: {
                clickable: true,
            },
            modules: [Navigation, Pagination, Keyboard]
        }
    }
}
</script>

<template>
    <div class="row authentication mx-0">

        <div class="col-xxl-7 col-xl-7 col-lg-7">
            <div class="row justify-content-center align-items-center h-100">
                <div class="col-xxl-6 col-xl-7 col-lg-7 col-md-7 col-sm-8 col-12">
                    <div class="p-5">
                        <div class="mb-3">
                            <NuxtLink to='/'>
                                <img src="/images/brand-logos/desktop-logo.png" alt=""
                                    class="authentication-brand desktop-logo">
                                <img src="/images/brand-logos/desktop-dark.png" alt=""
                                    class="authentication-brand desktop-dark">
                            </NuxtLink>
                        </div>
                        <p class="h5 fw-semibold mb-1">Verify Your Account</p>
                        <p class="mb-4 text-muted op-7 fw-normal">Enter the 4 digit code sent to the registered email
                            Id.
                        </p>
                        <div class="row">
                            <div class="col-xl-12 mb-4">
                                <div class="row">
                                    <div class="col-3">
                                        <input ref="one" type="text" class="form-control form-control-lg text-center"
                                            id="one" maxlength="1" @keyup="valueChange('two')">
                                    </div>
                                    <div class="col-3">
                                        <input ref="two" type="text" class="form-control form-control-lg text-center"
                                            id="two" maxlength="1" @keyup="valueChange('three')">
                                    </div>
                                    <div class="col-3">
                                        <input ref="three" type="text" class="form-control form-control-lg text-center"
                                            id="three" maxlength="1" @keyup="valueChange('four')">
                                    </div>
                                    <div class="col-3">
                                        <input ref="four" type="text" class="form-control form-control-lg text-center"
                                            id="four" maxlength="1">
                                    </div>
                                </div>
                                <div class="form-check mt-2 mb-0">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                    <label class="form-check-label" for="defaultCheck1">
                                        Did not recieve a code ?<NuxtLink to="/pages/email/mail-app"
                                            class="text-primary ms-2 d-inline-block">Resend</NuxtLink>
                                    </label>
                                </div>
                            </div>
                            <div class="col-xl-12 d-grid">
                                <NuxtLink to='/' class="btn btn-lg btn-primary">Verify</NuxtLink>
                            </div>
                        </div>
                        <div class="text-center">
                            <p class="fs-12 text-danger mt-3"><sup><i class="ri-asterisk"></i></sup>Don't share the
                                verification code with anyone !</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xxl-5 col-xl-5 col-lg-5 d-lg-block d-none px-0">
            <div class="authentication-cover">
                <div class="aunthentication-cover-content rounded">
                    <swiper :navigation="true" :pagination="pagination" :keyboard="{ enabled: true, }"
                        :modules="modules" class="swiper-wrapper">
                        <swiper-slide>
                            <div
                                class="text-fixed-white text-center p-5 d-flex align-items-center justify-content-center">
                                <div>
                                    <div class="mb-5">
                                        <img src="/images/authentication/2.png" class="authentication-image" alt="">
                                    </div>
                                    <h6 class="fw-semibold text-fixed-white">Verify Your Account</h6>
                                    <p class="fw-normal fs-14 op-7"> Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit. Ipsa eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
                                        voluptates possimus, ad, autem quae culpa architecto, quam labore blanditiis at
                                        ratione.</p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div
                                class="text-fixed-white text-center p-5 d-flex align-items-center justify-content-center">
                                <div>
                                    <div class="mb-5">
                                        <img src="/images/authentication/3.png" class="authentication-image" alt="">
                                    </div>
                                    <h6 class="fw-semibold text-fixed-white">Verify Your Account</h6>
                                    <p class="fw-normal fs-14 op-7"> Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit. Ipsa eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
                                        voluptates possimus, ad, autem quae culpa architecto, quam labore blanditiis at
                                        ratione.</p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div
                                class="text-fixed-white text-center p-5 d-flex align-items-center justify-content-center">
                                <div>
                                    <div class="mb-5">
                                        <img src="/images/authentication/2.png" class="authentication-image" alt="">
                                    </div>
                                    <h6 class="fw-semibold text-fixed-white">Verify Your Account</h6>
                                    <p class="fw-normal fs-14 op-7"> Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit. Ipsa eligendi expedita aliquam quaerat nulla voluptas facilis. Porro rem
                                        voluptates possimus, ad, autem quae culpa architecto, quam labore blanditiis at
                                        ratione.</p>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
