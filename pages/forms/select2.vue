<script>
import pageheader from '~/components/common/pageheader.vue';
import $ from 'jquery';
import Select2 from 'vue3-select2';
import 'select2/dist/css/select2.css';
import { ref } from 'vue';

window.$ = window.jQuery = $;


export default {
    components: {
        pageheader,
        Select2
    },
    data() {
        return {
            dataToPass: {
                current: "vue3 Select2",
                list: ['Forms', 'vue3 Select2']
            },
            myValue: 'option1',
            myOptions: ['option1', 'option2', 'option3'],
            selectedOption1: null,
            options1: [
                { id: '1', text: 'Option 1' },
                { id: '2', text: 'Option 2' },
                { id: '3', text: 'Option 3' }
            ]
        };
    },
    methods: {
        myChangeEvent(val) {
            console.log(val);
        },
        mySelectEvent(selectedOption1) {
            console.log(selectedOption1);
        }
    },
    setup() {
        definePageMeta({

            middleware: ["auth"],
        })
        const selectedOption = ref(null);
        const options = ref([
            { id: '1', text: 'Option 1' },
            { id: '2', text: 'Option 2' },
            { id: '3', text: 'Option 3' },
        ]);
        const isDisabled = ref(false);

        const toggleDisabled = () => {
            isDisabled.value = !isDisabled.value;
        };

        const handleChange = (value) => {
            console.log(value);
        };

        return {
            selectedOption,
            options,
            isDisabled,
            toggleDisabled,
            handleChange,
        };
    },
};
</script>

<template>
    <pageheader :propData="dataToPass"></pageheader>
    <div class="row">
        <div class="col-xl-6">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="card-title">Basic Select2</div>
                </div>
                <div class="card-body">
                    <Select2 v-model="myValue" :options="myOptions" @change="myChangeEvent" @select="mySelectEvent" />
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="card-title">Basic Select2</div>
                </div>
                <div class="card-body">
                    <Select2 v-model="selectedOption1" :options="options1" :multiple="false" />
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="card-title">Disabled Select2 Example</div>
                </div>
                <div class="card-body">
                    <Select2 v-model="selectedOption" :options="options" :disabled="isDisabled"
                        @change="handleChange" />
                    <button @click="toggleDisabled" class="btn btn-primary btn-sm mt-2">
                        {{ isDisabled ? 'Enable' : 'Disable' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
