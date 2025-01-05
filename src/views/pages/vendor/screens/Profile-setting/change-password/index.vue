<template>
  <div class="reset-form d-flex flex-column align-content-center gap-4 content-fade-in">
    <h1 class="text-center">Reset Your Password</h1>
    <el-form
      ref="formRef"
      :model="resetForm"
      :rules="rules"
      label-width="auto"
      class="demo-dynamic gap-4"
    >
      <!-- Old Password Field -->
      <el-form-item prop="oldPassword">
        <el-input
          v-model="resetForm.old_password"
          type="password"
          placeholder="Enter your current password"
          show-password
          size="large"
          :prefix-icon="Key"
        />
      </el-form-item>

      <!-- New Password Field -->
      <el-form-item prop="newPassword">
        <el-input
          v-model="resetForm.password"
          type="password"
          placeholder="Enter new password"
          show-password
          size="large"
          :prefix-icon="Key"
        />
      </el-form-item>

      <!-- Confirm Password Field -->
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="resetForm.password_confirmation"
          type="password"
          placeholder="Confirm new password"
          show-password
          size="large"
          :prefix-icon="Key"
        />
      </el-form-item>

      <!-- Submit Button -->
      <el-form-item>
        <el-button type="primary" v-on:click="handleResetPassword" class="input">
          Reset Password
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Key } from '@element-plus/icons-vue';  // Ensure proper icon import
import { useResetPasswordStore } from "@/store/resetPassword.js";  // Assuming store exists
import {useRouter} from 'vue-router';
const formRef = ref(null);
const resetStore = useResetPasswordStore();  // Assuming this store will handle API calls or state management
const router = useRouter();
// Reset password form data
const resetForm = reactive({
  old_password: '',
  password: '',
  password_confirmation: '',
});

// Form validation rules
const rules = {
  old_password: [
    { required: true, message: 'Please enter your current password', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please enter your new password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
  ],
  password_confirmation: [
    {
      required: true,
      message: 'Please confirm your new password',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value !== resetForm.password) {
          callback(new Error("Passwords don't match"));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};

const handleResetPassword = async () => {
  try {
    // Validate the form
    const isValid = await formRef.value.validate();

    if (isValid) {
      // Call the reset password logic (API call)
      await resetStore.resetPassword(resetForm);
      ElMessage.success('Password reset successfully!');
      // Navigate to profile settings upon success
      router.push({ name: 'profile-setting' });
    } else {
      ElMessage.error('Please fill in the form correctly.');
    }
  } catch (error) {
    // Handle API or validation errors
    alert('Failed to reset password. Please try again.');
  }
};

</script>

<style scoped>
.input {
  width: 100%;
  background-color: #FFBD59;
  border: none;
  padding: 10px;
  border-radius: 10px;
}

.el-form-item .el-input,
.el-form-item .el-button {
  width: 100%;
}

.reset-form {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 500px;
  height: 500px;
  justify-content: center;
  margin: 200px 200px 100px 700px;
}.reset-form h1{
  font-size: 32px;
  font-family: Inter, sans-serif;
 }
</style>
