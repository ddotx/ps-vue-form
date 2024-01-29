<template>
    <div class="border rounded p-1 bg-gray-100">

        <slot></slot>

        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" v-model="model.fullName" :disabled="isDisabled" />
        <label for="company">Company</label>
        <input type="text" id="company" v-model="model.company" :disabled="isDisabled" />
        <label for="address1">Street Address</label>
        <input type="text" id="address1" v-model="model.address.address1" :disabled="isDisabled" />
        <input type="text" id="address2" v-model="model.address.address2" :disabled="isDisabled" />
        <label for="cityTown">City</label>
        <input type="text" id="cityTown" v-model="model.address.cityTown" :disabled="isDisabled" />
        <label for="stateProvince">State/Province</label>
        <select id="stateProvince" v-model="model.address.stateProvince" :disabled="isDisabled">
            <option value="">Select a State/Province</option>
            <option v-for="state in states" :key="state.abbreviation" :value="state.abbreviation">
                {{ formatState(state) }}
            </option>
        </select>
        <label for="postalCode">Postal Code</label>
        <input type="text" id="postalCode" v-model="postalCode" :disabled="isDisabled" />
    </div>
</template>

<script setup>
import states from '@/lookup/states';
import { formatState } from '@/formatters';
import { defineProps, computed } from 'vue';

const props = defineProps({
    model: {
        type: Object,
        required: true
    },
    isDisabled: {
        type: Boolean,
        default: false

    }
})

const postalCode = computed({
    get: () => props.model.address.postalCode,
    // set: (newVal) => { shipping.value.postalCode = newVal}
    set: (newVal) => {
        if (newVal && typeof newVal === 'string') {
            if (newVal.length <= 5 || newVal.indexOf('-') > -1) {
                props.model.address.postalCode = newVal;
            } else {
                props.model.address.postalCode = `${newVal.substring(0, 5)}-${newVal.substring(5)}`;
            }

        } else {
            console.error('Invalid zip code');
        }
    },
})
</script>