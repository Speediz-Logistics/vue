<template>
  <div class="content-fade-in">
    <h1>Welcome to Speediz</h1>
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="dynamicValidateForm"
      label-width="auto"
      class="demo-dynamic"
    >
      <el-form-item
        class
        prop="email"
        label="Email"
        :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="dynamicValidateForm.email" autocomplete="off" placeholder="Enter your email" />
      </el-form-item>
      <el-form-item
        prop="password"
        label="Password"
        :rules="[
          { required: true, message: 'Please enter password', trigger: 'blur' },
          { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] } ]" >
        <el-input type="password" v-model="dynamicValidateForm.password" autocomplete="off" placeholder="Enter your password" />
      </el-form-item>
      <el-form-item>
        <el-link @click="forgotPassword" class="forgot-password">Forgot Password?</el-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="handleLogin" class="input">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

// Define the router for navigation
const router = useRouter();

// Define the form data using reactive
const dynamicValidateForm = reactive({
  email: '',
  password: ''
});

// Define the rules for form validation
const rules = {
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { type: 'password', message: 'Please input password', trigger: ['blur', 'change'] }
  ]
};

// Reference for form validation
const formRef = ref(null);

// Handle login function
const handleLogin = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('Login successful');
      router.push('/onboardScreen');
    } else {
      ElMessage.error('Please fill in the form correctly');
      return false;
    }
  });
};

// Function for forgot password navigation
const forgotPassword = () => {
  router.push({ name: 'forgotPassword' });
};
</script>

<style scoped>
h1{
  text-align: center;
  padding-top: 1em ;
  padding-bottom: 1em;
  font-size: 2em;
  font-weight: bold;
  color: #FFBD59;
}
.input {
  width: 100%;
}

.el-form-item .el-input,
.el-form-item .el-button {
  width: 100%;
}

.el-button {
  background: #FFBD59;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}
.el-button:active {
  opacity: 0.7;
}

.forgot-password {
  display: block;
  margin-top: 10px;
  cursor: pointer;
  color: #FFBD59; /* Element Plus default link color */
}

</style>
