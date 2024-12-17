
<script setup>
import packageTable from '@/components/packageTable.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/store/auth.js";
import { usePackageStore} from "@/store/package.js";

const authStore = useAuthStore();
const router = useRouter();
const packageStore = usePackageStore();
const backhome = () => {
  router.push({name: 'onboard-Screen'})
}


//const selectValue = ref('')
const searchQuery = ref('');
const dateValue = ref([])
const start_date = ref('');
const end_date = ref('');
const tableData = ref([]);



const locationOptions = ref([
  { label: 'All Locations', value: '' },
  { label: 'Toul Kork', value: 'Toul kork' },
  { label: 'Koh pich', value: 'Koh Pich, Phnom Penh' },
]);

const showPackageData = async () => {
  const params = {
    start_date: start_date.value,
    end_date: end_date.value,
    phone_number: searchQuery.value,
    page: packageStore.currentPage,
    per_page: packageStore.pageSize,

  };
  try{
    console.log(params);
    const response = await packageStore.all(params);
    tableData.value = packageStore.data;
    packageStore.setTotal(response.data.total);
    packageStore.setCurrentPage(response.data.current_page);
    console.log('Fetched data:', tableData.value);
  } catch(error){
    console.log('Error show package data',error);
  }
}

const handleLocationChange = () => {
  packageStore.setCurrentPage(1); // Reset to first page when location changes
  showPackageData();
}
// Handle search
const handleSearch = () => {
  packageStore.setCurrentPage(1);
  showPackageData(); }


const handleDateChange = (dates) => {
  if ( dates && dates.length > 0 ) {
    start_date.value = dates[0];
    end_date.value = dates[dates.length - 1];
    packageStore.setCurrentPage(1);
    showPackageData();
  }
}

const handlePageChange = (page) => {
  packageStore.setCurrentPage(page);
  showPackageData();
}

onMounted(() => {

    showPackageData();
});

</script>

<template>
  <div class="page d-flex">
      <div class="side-bar ">
        <h1>Package Management</h1>
        <button @click="backhome({name:'onboard-Screen'})">
          <font-awesome-icon :icon="['fas', 'arrow-left']"/>
          Back Home
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
                <input
                  type="text"
                  placeholder="Search package by phone number"
                  class="search"
                />
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
      <div class="filter d-flex justify-content-between align-items-center">
          <div class="select-location d-flex align-items-center gap-3">
            <span>Location:</span>
            <el-select v-model="selectedLocation" @change="handleLocationChange" placeholder="Select" style="width: 240px">
              <el-option
                v-for="item in locationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
            <div >
              <span>Amount: {{ packageStore.total}}</span>
            </div>
          </div>
        <div class="date-picker ">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              unlink-panels
              range-separator="To"
              start-placeholder="Start_date"
              end-placeholder="End_date"
              :size="size"
              @change="handleDateChange"
            />
        </div>
      </div>
      <!--Package table Section-->
      <div class="package-table">
        <packageTable :data="tableData"/>

        <el-pagination
          class="d-flex justify-content-center align-items-center m-4"
          layout="prev, pager, next"
          :total="packageStore.total"
          :page-size="packageStore.pageSize"
          :current-page="packageStore.currentPage"
          @current-change="handlePageChange"
        />
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
  min-height: 100vh;
  height: auto;
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
.filter{
  margin-left: 40px;
}
.package-table{
  width: 1439px;
  margin-left: 20px;
}
@keyframes button-animation {
  0% {
    opacity: 0.5;
    width: 300px;
  }
  100% {
    opacity: 1;
    width: 310px;
  }
}
</style>
