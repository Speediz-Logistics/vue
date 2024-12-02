<template>
  <div class="d-flex flex-column align-content-center gap-4 content-fade-in login-form-card">
    <h1 class="text-center">Please log in your account.</h1>
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="dynamicValidateForm"
      label-width="auto"
      class="demo-dynamic gap-4"
    >
      <el-form-item class prop="email" :rules="rules.email">
        <el-input
          v-model="dynamicValidateForm.email"
          placeholder="Enter your email"
          size="large"
          autocomplete="on"
          clearable
          :prefix-icon="Message"
        />
      </el-form-item>
      <el-form-item prop="password" :rules="rules.password">
        <el-input
          v-model="dynamicValidateForm.password"
          type="password"
          placeholder="Enter your password"
          show-password
          size="large"
          :prefix-icon="Key"
        />
      </el-form-item>
      <div class="d-flex justify-content-between">
        <el-checkbox v-model="remember" label="Remember me" size="large" />
        <el-form-item>
          <el-button @click="forgotPassword" class="forgot-password">Forgot Password?</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" v-on:click="handleLogin" class="input">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="d-flex">
    <div>You don’t have an account yet ?,</div>
    <div class="bg-transparent ms-2 primary-color cursor-pointer" @click="navigateTo({ name: 'register' })">
      Sign Up Now
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { Message, Key } from '@element-plus/icons-vue';
import useNavigate from '@/composables/useNavigate.js';

const { navigateTo } = useNavigate();

// Define the router for navigation
const router = useRouter();
const remember = ref(false);

// Define the form data using reactive
const dynamicValidateForm = reactive({
  email: '',
  password: '',
});

// Define the rules for form validation
const rules = {
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { type: 'password', message: 'Please input password', trigger: ['blur', 'change'] },
  ],
};

// Reference for form validation
const formRef = ref(null);

// Handle login function
const handleLogin = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('Login successful');
      router.push({ name: 'onboard-Screen' });
    } else {
      ElMessage.error('Please fill in the form correctly');
      return false;
    }
  });
};

// Function for forgot password navigation
const forgotPassword = () => {
  router.push({ name: 'forgot-password' });
};
</script>

<style scoped>
.input {
  width: 100%;
}

.el-form-item .el-input,
.el-form-item .el-button {
  width: 100%;
}

.el-button {
  background: #ffbd59;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}

.el-button:active {
  opacity: 0.7;
}

.forgot-password {
  background-color: transparent;
  display: block;
  margin-top: 2px;
  cursor: pointer;
  color: #ffbd59; /* Element Plus default link color */

  &:hover {
    color: #000000;
    text-decoration: none;
  }
}

.login-form-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 0.5px solid #ffbd59;
  padding: 20px;
}
</style>
