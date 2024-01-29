import { ShippingModel, BillingModel, CreditCardModel } from '@/models'
import { reactive } from 'vue'

export default reactive({
  shipping: new ShippingModel(),
  billing: new BillingModel(),
  creditCard: new CreditCardModel(),
  error: ''
})

console.error(new BillingModel())
