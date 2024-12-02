<template>
  <div class="register-form-card">
    <div class="container gap-4">
      <img class="logo-image" src="@/assets/icon/logo.svg" alt="logo" />
      <h1><strong>Welcome to our page!</strong></h1>
      <span style="color: #a9a9a9; font-size: 15px; padding-bottom: 10px" class="pb-3"
      >Please fill your information to register with us.</span
      >
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
      <div class="d-flex gap-4">
        <el-form-item prop="firstname">
          <div class="d-flex flex-column w-100">
            <label for="firstname">First Name</label>
            <el-input v-model="form.firstname" placeholder="Enter your firstname" />
          </div>
        </el-form-item>
        <el-form-item prop="lastname">
          <div class="d-flex flex-column w-100">
            <label for="lastname">Last Name</label>
            <el-input v-model="form.lastname" placeholder="Enter your lastname" />
          </div>
        </el-form-item>
      </div>
      <el-form-item prop="businessName">
        <div class="d-flex flex-column w-100">
          <label for="businessName">Business name</label>
          <el-input v-model="form.businessName" placeholder="Enter your Business name" />
        </div>
      </el-form-item>
      <el-form-item prop="email">
        <div class="d-flex flex-column w-100">
          <label for="email">Email</label>
          <el-input v-model="form.email" placeholder="Enter your email" />
        </div>
      </el-form-item>
      <div class="d-flex gap-4 w-100">
        <el-form-item prop="dateOfBirth">
          <div class="d-flex flex-column w-100">
            <label for="dateOfBirth">Date of Birth</label>
            <el-date-picker v-model="form.dateOfBirth" type="date" placeholder="Pick a date" style="width: 100%" />
          </div>
        </el-form-item>
        <el-form-item prop="gender">
          <div class="d-flex flex-column selection">
            <label for="gender">Gender</label>
            <el-select v-model="form.gender" placeholder="Select Gender">
              <el-option label="Male" value="male" />
              <el-option label="Female" value="female" />
              <el-option label="Prefer not to say" value="prefer not to say" />
            </el-select>
          </div>
        </el-form-item>
      </div>

      <el-form-item prop="address">
        <div class="d-flex flex-column w-100">
          <label for="address">Address</label>
          <el-input v-model="form.address" placeholder="Enter your address" />
        </div>
      </el-form-item>
      <el-form-item prop="contact">
        <div class="d-flex flex-column w-100">
          <label for="contact">Contact</label>
          <el-input v-model="form.contact" placeholder="Enter your contact" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="button-submit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  firstname: '',
  lastname: '',
  businessName: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  contact: '',
});

const formRef = ref(null);

const rules = {
  firstname: [{ required: true, message: 'First name is required', trigger: 'blur' }],
  lastname: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
  businessName: [{ required: true, message: 'Business name is required', trigger: 'blur' }],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
  ],
  dateOfBirth: [{ required: true, message: 'Date of birth is required', trigger: 'change' }],
  gender: [{ required: true, message: 'Gender is required', trigger: 'change' }],
  address: [{ required: true, message: 'Address is required', trigger: 'blur' }],
  contact: [{ required: true, message: 'Contact is required', trigger: 'blur' }],
};

const onSubmit = async () => {
  try {
    await formRef.value.validate();
    console.log('Form submitted!', form);
  } catch (error) {
    console.log('Validation failed:', error);
  }
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button-submit {
  background: #ffbd59;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
}

.button-submit:active {
  opacity: 0.7;
}

.input {
  width: 100px;
}

.logo-image {
  width: 100px;
}

.register-form-card {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #ffbd59;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: content-fade-in 0.6s;
}

.input {
  width: 100%;
}

.el-form-item .el-input,
.el-form-item .el-select,
.el-form-item .el-button {
  width: 100%;
}

.selection {
  width: 190px;
}
</style>
