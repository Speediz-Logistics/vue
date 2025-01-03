<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRouter, useRoute} from "vue-router";
import PackageDetail from "@/components/packageDetail.vue";
import { usePackageStore } from "@/store/package.js";

const router = useRouter();
const route = useRoute();
const backTo = () => {
  router.push({name: "package-management"});
}

const packageStore = usePackageStore();
const packageDetail = ref({});
const fetchPackageDetail = async (id) => {
  try {
    await packageStore.show(id);
    packageDetail.value = packageStore.packageDetail;
    console.log(packageDetail);
  } catch (error) {
    console.error('Error fetching package detail:', error);
  }
};

//timeline
const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
]

const handleTracking = (id) => {
  router.push({
    name: 'view-tracking',
    params: { id: id }
  });
};
onMounted(() => {
  const id = route.params.id;
  fetchPackageDetail(id);
});
</script>

<template>
  <div class="page d-flex">
    <div class="side-bar ">
      <h1>Package Detail</h1>
      <button @click="backTo({name:'package-management'})">
        <font-awesome-icon :icon="['fas', 'arrow-left']"/>
        Package Management
      </button>
    </div>

    <div class="d-flex flex-column gap-3">
      <header>
        <ul class="header-container d-flex gap-3">
          <li>
            <a class href="#">
              <img src="@/assets/images/speediz-logo.png" alt="logo">
            </a>
          </li>
          <li class="w-100">
            <input type="text" placeholder="Search package by phone number" class="search"  />
          </li>
          <li class="icon">
            <a>
              <font-awesome-icon :icon="['far', 'bell']" />
            </a>
          </li>
          <li class="icon">
            <a @click="logout">
              <font-awesome-icon :icon="['far', 'user']" />
            </a>
          </li>
        </ul>
      </header>

      <!--Package Detail-->
      <div class="package-detail-page text-start" v-if="packageDetail.data">
        <table class="d-flex justify-content-between ">
          <tbody class="d-flex flex-row col-span-2">
          <tr class="package-detail d-flex flex-column">
            <th colspan="2" class="fw-bold text-spacing">Package's Detail</th>
            <td>Package ID: {{ packageDetail.data?.id }}</td>
            <td>Customer Name: {{ packageDetail.data?.package?.customer_name }} </td>
            <td>Location: {{ packageDetail.data?.package?.location }}</td>
            <td>Total Price: {{ packageDetail.data?.package?.total_price }}</td>
          </tr>

          <tr class="pickup-info d-flex flex-column">
            <th colspan="2" class="fw-bold text-spacing">Pickup's Information</th>
            <td>Pickup Date: {{ packageDetail.data?.vendor?.pickup_date }}</td>
            <td>Pickup By: {{ packageDetail.data?.vendor?.vendor_name }}</td>
            <td>Location Pickup: {{ packageDetail.data?.vendor?.vendor_address }}</td>
          </tr>
          </tbody>
        </table>
        <div>
          <table >
            <tbody class="d-flex flex-row justify-content-between">
            <tr class="delivery-detail d-flex flex-column">
              <td colspan="2" class="fw-bold text-spacing">Delivery Detail</td>
              <td>Deliver Name: {{ packageDetail.data?.delivery?.driver_name }}</td>
              <td>Deliver Contact: {{ packageDetail.data?.delivery?.driver_phone }}</td>
              <td>Delivery Date: {{ packageDetail.data?.delivery?.shipment_date }}</td>
              <td>Delivery Fee: {{ packageDetail.data?.delivery?.delivery_fee }}</td>
            </tr>

            <tr class="package-image d-flex flex-column ">
              <td colspan="2" class="fw-bold  text-spacing">Package's Image</td>
              <td colspan="2" class="image">
                <img :src="packageDetail.data?.image" alt="Package Image" class="img-fluid" />
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <table >
          <tbody class="d-flex flex-row justify-content-between">
          <!--Timeline Package-->
          <tr class="delivery-detail d-flex flex-column">
            <td>Timeline Package:</td>
            <el-timeline class="w-[600px]">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
            <el-button type="info" class="w-25" @click="handleTracking()">Tracking Detail</el-button>
          </tr>

          <tr class="delivery-detail d-flex flex-column text-spacing">
            <td>Package Status: {{ packageDetail.data?.delivery?.package_status }}</td>
            <td>Package's Payment: {{ packageDetail.data?.package?.total_price }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page{
  background-color: #E8E8E8;
  font-family: Inter, sans-serif;
}
.header-container {
  justify-content: end;
  margin-left: 50px;
  margin-top: 10px;
  align-items: center;
  gap: 20px;
  padding: 10px 60px 10px 10px;
  background: #fff;
  border-radius: 30px;
  width: 1354px;
  height: 91px;
}
.header-container img{
  width: 262px;
  height: 74px;
}
.header-container .icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #E8E8E8;
  justify-content: center;
  align-items: center;
  display: flex;
}
.search {
  margin-left: 50px;
  width: 800px;
  height: 50px;
  border-radius: 20px;
  font-size: 14px;
  border: none;
  background: #E8E8E8;
  padding: 0 20px;
}


.side-bar{
  background-color: #FFBD59;
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: Inter, sans-serif;
}
.side-bar h1{
  margin: 10px;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
}
.side-bar button{
  margin-bottom: 50px;
  padding: 20px;
  width: 300px;
  border: none;
  align-items: center;
  gap:  20px;
}
.side-bar button:hover{
  transform: scale(1.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.side-bar button:active{
  animation: button-animation 0.5s ease-in;
  transform: scale(1.05);
  transform-style: preserve-3d;
}
.package-detail-page {
  width: 1354px;
  height: 700px;
  background-color: #ffffff;
  margin-left: 50px;
  padding: 50px;
  font-family: Inter, sans-serif;
  font-size: 20px;
  border-radius: 20px;
  box-shadow: 1px 1px 3px gray;

}
.image{
  width: 200px;
  height: 200px;
}

.package-detail,
.package-image,
.delivery-detail,
.pickup-info{
  width: 800px;
  height: 200px;
}
.text-spacing {
  margin-bottom: 10px; /* Adds 10px space below each text element */
}

</style>
