<script setup>
import { defineProps } from "vue";

const props = defineProps({
  packageDetail: {
    id : 'id',
    customer_name : 'customer_name',
    customer_phone : ' customer_phone',
    location : 'location',
    total_price : 'total_price',
  }
})

</script>

<template>
<div class="package-detail text-start" v-if="props.packageDetail">
 <div class="d-flex  justify-content-between mb-lg-5 text-start">
   <ul>
     <li class="fw-bold">
       <Strong>Package's Detail: </Strong>
     </li>
     <li>
       Package ID: {{packageDetail.id }}
     </li>
     <li>
       Customer Name: {{packageDetail.package.customer_name }}
     </li>
     <li>
       Phone Number: {{packageDetail.package.customer_phone}}
     </li>
     <li>
       Location: {{packageDetail.package.location}}
     </li>
     <li>
       Total price: {{packageDetail.package.total_price}}
     </li>
   </ul>
    <ul>
      <li class="fw-bold">
        <Strong>Pickup's Information: </Strong>
      </li>
      <li>
        Pickup Date: {{packageDetail.vendor.pickup_date}}
      </li>
      <li>
        Pickup By: {{packageDetail.delivery.vendor_name}}
      </li>
    </ul>
  </div>
  <div class="d-flex  justify-content-between text-start">
    <ul>
      <li class="fw-bold">
        <Strong>Delivery Detail: </Strong>
      </li>
      <li>
        Deliver Name: {{packageDetail.delivery.driver_name}}
      </li>
      <li>
        Deliver Contact: {{packageDetail.delivery.driver_phone}}
      </li>
      <li>
        Telegram contact: {{telegramContact}}
      </li>
      <li>
        Delivery Date: {{packageDetail.delivery.shipment_date}}
      </li>
      <li>
        Delivery Fee: {{packageDetail.delivery.delivery_fee}}
      </li>
    </ul>

    <ul>
      <li class="fw-bold">
        Packaga's image: {{image}}
      </li>
    </ul>
  </div>
  <div class="mt-lg-5 text-start">
    <ul>
      <li class="fw-bold">
        Package Status: {{packageStatus}}
      </li>
      <li class="fw-bold">
        Package Payment: {{packagePayment}}
      </li>
    </ul>
  </div>
</div>
  <div v-else class="flex justify-content-between mb-lg-5 align-items-center">
    <p>Loading package details...</p>
  </div>
</template>

<style scoped lang="scss">
.package-detail{
  width: 1354px;
  height: 700px;
  background-color: #ffffff;
  margin-left: 50px;
  padding: 50px;
}
</style>
