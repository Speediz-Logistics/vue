<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
defineProps({
 data: Array,

});


const handleViewDetails = (id) => {
  router.push({
    name: 'detail',
    params: { id: id }
  });
};
</script>

<template>
    <el-table :data="data" class="package-table">
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

</template>

<style scoped lang="scss">
.el-table-column {
  font-weight: bold;
  font-size: 1em;
  font-family: Inter, sans-serif;
  color: black;
}
</style>
