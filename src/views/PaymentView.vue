<template>
    <div class="container bg-slate-300 mx-auto p-2">
        <h2>Payment</h2>
        <div>
            <form novalidate @submit.prevent="onSubmit">
                <div class="grid grid-cols-2 gap-2">
                    <div>

                        <AddressView :model="state.shipping">
                            <h3 class="mb-6">Shipping Address</h3>
                        </AddressView>
                    </div>
                    <div>


                        <AddressView :model="state.billing" :isDisabled="state.billing.sameAsShipping">
                            <h3>Billing</h3>
                            <label class="flex">
                                <input type="checkbox" v-model="state.billing.sameAsShipping" />
                                &nbsp;Same as shipping?
                            </label>
                        </AddressView>
                        <!-- <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" v-model="billing.fullName" :disabled="sameAsShipping" />
                        <label for="company">Company</label>
                        <input type="text" id="company" v-model="billing.company" :disabled="sameAsShipping" />
                        <label for="address1">Street Address</label>
                        <input type="text" id="address1" v-model="billing.address1" :disabled="sameAsShipping" />
                        <input type="text" id="address2" v-model="billing.address2" :disabled="sameAsShipping" />
                        <label for="cityTown">City</label>
                        <input type="text" id="cityTown" v-model="billing.cityTown" :disabled="sameAsShipping" />
                        <label for="stateProvince">State/Province</label>
                        <select id="stateProvince" v-model="billing.stateProvince" :disabled="sameAsShipping">
                            <option value="">Select a State/Province</option>
                            <option v-for="state in states" :key="state.abbreviation" :value="state.abbreviation">
                                {{ formatState(state) }}
                            </option>
                        </select>
                        <label for="postalCode">Postal Code</label>
                        <input type="text" id="postalCode" v-model="billZip" :disabled="sameAsShipping" /> -->
                    </div>
                </div>
                <div class="w-1/2">
                    <h3>Payment Information</h3>
                    <label for="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" v-model="state.creditCard.cardNumber" />
                    <label for="cardHolder">Card Holder</label>
                    <input type="text" id="cardHolder" v-model="state.creditCard.cardHolder" />

                    <div class="grid grid-cols-3 gap-2">
                        <div>
                            <label for="exMonth">Expiration Month</label>
                            <select id="exMonth" v-model="state.creditCard.exMonth">
                                <option value="">Select a Month</option>
                                <option v-for="month in months" :key="month" :value="month.number">
                                    {{ month.name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label for="exYear">Expiration Year</label>
                            <select id="exYear" v-model="state.creditCard.exYear">
                                <option value="">Select a Year</option>
                                <option v-for="year in years" :key="year" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label for="ccv">Security Code</label>
                            <input type="text" id="ccv" v-model="state.creditCard.ccv" />
                        </div>

                    </div>
                </div>

                <button type="submit">Next</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import months from '@/lookup/months';
import AddressView from "@/views/AddressView.vue";
import state from "@/state";

/* const shipping = ref({
    fullName: "",
    company: "",
    address1: "",
    address2: "",
    cityTown: "",
    stateProvince: "",
    postalCode: "",
});

const billing = ref({
    fullName: "",
    company: "",
    address1: "",
    address2: "",
    cityTown: "",
    stateProvince: "",
    postalCode: "",
});

const card = ref({
    cardNumber: "",
    cardHolder: "",
    exMonth: "",
    exYear: "",
    ccv: "",
}); */

const emits = defineEmits(["onError"]);

const years = Array.from({ length: 10 }, (v, i) => new Date().getFullYear() + i);

const onSubmit = () => {
    // alert("Form submitted!");
    // error.value = "Can't save yet, no API call";
    // emits("onError", "Can't save yet, no API call");
    state.error = "Can't save yet, no API call";
};



const billZip = computed({
    get: () => billing.value.postalCode,
    set: (newVal) => {
        if (newVal && typeof newVal === 'string') {
            if (newVal.length <= 5 || newVal.indexOf('-') > -1) {
                billing.value.postalCode = newVal;
            } else {
                billing.value.postalCode = `${newVal.substring(0, 5)}-${newVal.substring(5)}`;
            }

        } else {
            console.error('Invalid zip code');
        }
    },
})

// const sameAsShipping = ref(false);
/* watch(
    () => sameAsShipping.value,
    () => {
        if (sameAsShipping.value) {
            billing.value = { ...shipping.value };
        }
    }) */
watch(
    () => state.billing.sameAsShipping,
    () => {
        if (state.billing.sameAsShipping) {
            state.billing.fullName = state.shipping.fullName;
            state.billing.company = state.shipping.company;
            state.billing.address.address1 = state.shipping.address.address1;
            state.billing.address.address2 = state.shipping.address.address2;
            state.billing.address.cityTown = state.shipping.address.cityTown;
            state.billing.address.stateProvince = state.shipping.address.stateProvince;
            state.billing.address.postalCode = state.shipping.address.postalCode;
        }
    })
</script>