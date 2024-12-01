<template>
  <div>
    <div class="container">
      <img src="@/assets/icon/logo.svg" alt="logo">
      <h1 class="ms-3"><strong>Welcome to our page!</strong></h1>
      <span style="color: #A9A9A9; font-size: 15px; padding-bottom: 10px" class="ms-3 pb-3">Please fill your information to register with us.</span>
    </div>
    <el-form :model="form" label-width="auto">
        <el-form-item label="Firstname">
          <el-input v-model="form.firstname" placeholder="Enter your firstname" />
        </el-form-item>
        <el-form-item label="Lastname">
          <el-input v-model="form.lastname" placeholder="Enter your lastname"/>
        </el-form-item>
      <el-form-item label="Business name">
        <el-input v-model="form.businessName" placeholder="Enter your Business name"/>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" placeholder="Enter your email"/>
      </el-form-item>
      <el-form-item label="Date of Birth">
          <el-date-picker
            v-model="form.dateOfBirth"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
      </el-form-item>
      <el-form-item label="Gender">
        <el-select v-model="form.gender" placeholder="please select your gender">
          <el-option label="Male" value="male" />
          <el-option label="Female" value="female" />
          <el-option label="Prefer not to say" value="prefer not to say" />
        </el-select>
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="form.address" placeholder="Enter your address" />
      </el-form-item><el-form-item label="Contact">
      <el-input v-model="form.contact" placeholder="Enter your contact" />
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="button-submit">Create</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  firstname: '',
  lastname: '',
  businessName: '',
  email: '',
  dateOfBirth: '',
  gender:'',
  address: '',
  contact: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style scoped>
.container {
  font-family: Inter;
  top:10px;
  left: 0;
  justify-content: center;
  align-items: center;
}
.button-submit{
  background: #FFBD59;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-left: 200px; ;

}
.button-submit:active {
  opacity: 0.7;
}
.input {
  width: 100px;
}
</style>
