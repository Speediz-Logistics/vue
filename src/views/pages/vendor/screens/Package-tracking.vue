
<script setup>
import packageTable from '@/components/packageTable.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/store/auth.js";
import { usePackageStore} from "@/store/package.js";
import {useDebounce} from "@/composables/useDebounce.js";

const authStore = useAuthStore();
const router = useRouter();
const packageStore = usePackageStore();
const backhome = () => {
  router.push({name: 'onboard-Screen'})
}

const { debounce } = useDebounce();
const searchQuery = ref('');
const start_date = ref('');
const end_date = ref('');
const tableData = ref([]);



const showPackageData = async () => {
  const params = {
    start_date: start_date.value,
    end_date: end_date.value,
    search: searchQuery.value,
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


// Handle search
const handleSearch = debounce(() => {
  packageStore.setCurrentPage(1);
  showPackageData();
}, 300);

const handlePageChange = (page) => {
  packageStore.setCurrentPage(page);
  showPackageData();
}

const handleViewDetails = (id) => {
  router.push({
    name: 'tracking-detail',
    params: { id: id }
  });
};
onMounted(() => {

  showPackageData();
});

</script>

<template>
  <div class="page d-flex">
    <div class="side-bar ">
      <h1>Package Tracking</h1>
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
            <el-input
              v-model="searchQuery"
              placeholder="Search package by package number"
              @input="handleSearch"
              clearable
              class="search-input"
            >
              <template #prefix>
                <font-awesome-icon :icon="['fas', 'search']" />
              </template>
            </el-input>
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
          <div >
            <span>Amount: {{ packageStore.total}}</span>
          </div>
        </div>
      </div>

      <!--Package table Section-->
      <div class="package-table">
        <el-table :data="tableData" class="package-table">
          <el-table-column prop="package_number" label="Package Number" width="180" />
          <el-table-column prop="customer_name" label="Customer Name" width="180" />
          <el-table-column prop="customer_phone" label="Contact" width="180" />
          <el-table-column prop="shipment_date" label="Date" width="180" />
          <el-table-column prop="location" label="location"  width="360" />
          <el-table-column prop="status" label="Status" width="120" />
          <el-table-column prop="detail" label="Detail" width="120" >
            <template #default="scope">
              <el-button type="primary" @click="handleViewDetails(scope.row.id)">View Detail</el-button>
            </template>
          </el-table-column>
        </el-table>

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
