<template>
  <div class="input-group">
    <input
      :type="inputType"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :required="required"
      class="form-control form-control-lg"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button @click="changeInputType" class="btn btn-light" type="button" id="button-addon2">
      <i class="align-middle" :class="inputType === 'text' ? 'ri-eye-line' : 'ri-eye-off-line'"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 🔑 Props explicit pentru modelValue
defineProps({
  modelValue: String,
  name: String,
  id: String,
  placeholder: String,
  required: Boolean,
})

const emit = defineEmits(['update:modelValue'])
const inputType = ref('password')

// 👁️ Toggle tip input
const changeInputType = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}
</script>
