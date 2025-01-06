<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useProfileStore } from '@/store/profile.js';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

const router = useRouter();
const profileStore = useProfileStore();

// Reactive form data
const form = reactive({
  first_name: '',
  last_name: '',
  business_name: '',
  email: '',
  dob: '',
  gender: '',
  address: '',
  contact_number: '',
  image: null, // To hold the selected file
  full_name: '',
  image_url: '', // Display the avatar image
});

// Track edit mode
const isEditing = ref(false);

// Fetch profile details
const fetchProfileDetail = async () => {
  try {
    const response = await profileStore.profile();
    const profile = response?.data || {};
    Object.assign(form, profile);
    form.image_url = profile.image || '';
  } catch (error) {
    console.error('Failed to fetch profile details:', error);
  }
};

// Toggle between edit and view modes
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

// Handle avatar upload
const handleAvatarChange = (file) => {
  form.image = file; // Set the selected file to form.image
  const reader = new FileReader();
  reader.onload = (e) => {
    form.image_url = e.target.result; // Preview the uploaded image
  };
  reader.readAsDataURL(file);
};

// Save profile changes
const saveProfile = async () => {
  try {
    const formData = new FormData();
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('business_name', form.business_name);
    formData.append('email', form.email);
    formData.append('dob', form.dob);
    formData.append('gender', form.gender);
    formData.append('address', form.address);
    formData.append('contact_number', form.contact_number);
    formData.append('full_name', form.full_name);

    // Append image if updated
    if (form.image) {
      formData.append('image', form.image);
    }

    await profileStore.updateProfile(formData);
    ElMessage.success('Profile updated successfully!');
    fetchProfileDetail(); // Refresh data
    isEditing.value = false; // Exit edit mode
  } catch (error) {
    console.error('Error updating profile:', error);
    ElMessage.error('Failed to update profile. Please try again.');
  }
};

// Logout handler
const handleLogout = () => {
  router.push({ name: 'logout' });
};

// Navigation handler
const backTo = () => {
  router.push({ name: 'onboard-Screen' });
};

// Password change handler
const changePassword = () => {
  router.push({ name: 'change-password' });
};

const handleUpload = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    handleAvatarChange(file);
  };
  input.click();
};

onMounted(fetchProfileDetail);
</script>

<template>
  <div class="page d-flex flex-row gap-3">
    <!-- Sidebar -->
    <div class="side-bar">
      <h1>Profile Settings</h1>
      <button @click="backTo">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Home
      </button>
    </div>

    <!-- Profile and Form -->
    <div class="info d-flex flex-row gap-3">
      <div class="d-flex flex-column gap-3">
        <!-- Profile Picture -->
        <div class="profile">

          <img
            v-if="form.image_url"
            :src="form.image_url"
            alt="Avatar"
            class="avatar w-50 h-50"
          />
          <div class="mb-4 mt-1" v-if="isEditing">
            <el-button type="primary" size="mini" @click="handleUpload">Select Image</el-button>
          </div>
          <p class="text-center">{{ form.full_name }}</p>
        </div>

        <!-- Information Section -->
        <div class="information">
          <p class="fw-bold">Information</p>
          <div>Email: {{ form.email }}</div>
          <div>Phone: {{ form.contact_number }}</div>
          <button class="logout" @click="handleLogout">Logout</button>
        </div>
      </div>

      <!-- Detail Form -->
      <div class="detail">
        <img src="@/assets/images/speediz-logo.png" alt="logo" />
        <p class="fw-bold text-lg-start">Your Profile Information</p>

        <el-form :model="form" label-width="auto">
          <!-- Name Fields -->
          <el-form class="d-flex flex-row gap-lg-4">
            <el-form-item label="Firstname" required>
              <el-input v-model="form.first_name" :disabled="!isEditing" />
            </el-form-item>
            <el-form-item label="Lastname" required>
              <el-input v-model="form.last_name" :disabled="!isEditing" />
            </el-form-item>
          </el-form>

          <!-- Other Form Fields -->
          <el-form-item label="Shop Name" required>
            <el-input v-model="form.business_name" :disabled="!isEditing" />
          </el-form-item>
          <el-form-item label="Date of Birth" required>
            <el-date-picker v-model="form.dob" type="date" placeholder="Pick a day" :disabled="!isEditing" />
          </el-form-item>
          <el-form-item label="Gender" required>
            <el-select v-model="form.gender" :disabled="!isEditing" placeholder="Please select your gender">
              <el-option label="Female" value="female" />
              <el-option label="Male" value="male" />
              <el-option label="Prefer not to say" value="prefer_not_to_say" />
            </el-select>
          </el-form-item>
          <el-form-item label="Location" required>
            <el-input v-model="form.address" :disabled="!isEditing" placeholder="No. 12F, st.271, Phnom Penh, Cambodia" />
          </el-form-item>
          <el-form-item label="Contact" required>
            <el-input v-model="form.contact_number" :disabled="!isEditing" />
          </el-form-item>

          <!-- Password and Buttons -->
          <el-form-item>
            <el-link @click="changePassword">Change Password</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toggleEdit" :disabled="isEditing">Edit</el-button>
            <el-button @click="saveProfile" :disabled="!isEditing">Save</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  background-color: #e8e8e8;
  font-family: Inter, sans-serif;
}

.side-bar {
  background-color: #ffbd59;
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: Inter, sans-serif;
}

.side-bar h1 {
  margin: 10px;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
}

.side-bar button {
  margin-bottom: 50px;
  padding: 20px;
  width: 300px;
  border: none;
  align-items: center;
  gap: 20px;
}

.side-bar button:hover {
  transform: scale(1.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.side-bar button:active {
  animation: button-animation 0.5s ease-in;
  transform: scale(1.05);
  transform-style: preserve-3d;
}

.profile {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0.5px 0.5px 0.5px 0.5px white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile .img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.information {
  background-color: white;
  width: 300px;
  height: 300px;
  text-align: left;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px 0.5px 0.5px white;
  display: flex;
  flex-direction: column;
  padding: 50px;
}
.logout {
  background-color: #ffbd59;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  padding: 10px;
  margin-top: 20px;
  margin-left: 50px;
  border: none;
  border-radius: 10px;
}
.detail {
  width: 600px;
  height: 620px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0.5px 0.5px 0.5px 0.5px white;
  padding: 20px;
}
.detail p {
  font-family: Inter, sans-serif;
  font-size: 30px;
  padding: 10px;
}
.info {
  padding: 30px;
}
.detail img {
  width: 100px;
  height: 50px;
}
</style>
