<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useProfileStore } from '@/store/profile.js';
import { ElMessage } from 'element-plus'; // Import ElMessage for success/error messages

// Router instance
const router = useRouter();

// Accessing profile store
const profileStore = useProfileStore();
const form = reactive({
  first_name: '',
  last_name: '',
  business_name: '',
  email: '',
  dob: '',
  gender: '',
  address: '',
  contact_number: '',
  image: null,
  full_name: '',
  image_url: '', // Image URL to display the profile picture
});

// To toggle between edit and view modes
const isEditing = ref(false);

// Fetch profile details on mount
const fetchProfileDetail = async () => {
  const response = await profileStore.profile(form); // Fetch profile data
  const profile = response?.data || {};
  form.first_name = profile.first_name || '';
  form.last_name = profile.last_name || '';
  form.business_name = profile.business_name || '';
  form.email = profile.email || '';
  form.dob = profile.dob || '';
  form.gender = profile.gender || '';
  form.address = profile.address || '';
  form.contact_number = profile.contact_number || '';
  form.full_name = profile.full_name || '';

  // Set the image URL properly (assuming profile has a field 'image_url')
  form.image_url = profile.image || '';
};

// Toggle between edit and view modes
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const saveProfile = async () => {
  try {
    const formData = new FormData();

    // Append text fields to FormData
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('business_name', form.business_name);
    formData.append('email', form.email);
    formData.append('dob', form.dob);
    formData.append('gender', form.gender);
    formData.append('address', form.address);
    formData.append('contact_number', form.contact_number);
    formData.append('full_name', form.full_name);

    // Append image if available
    if (form.image) {
      formData.append('image', form.image); // Append the image file (make sure it's a file)
    }

    // Send FormData to the updateProfile method
    const response = await profileStore.updateProfile(formData);
    ElMessage.success('Profile updated successfully!');
    fetchProfileDetail(); // Refresh the profile after saving
    isEditing.value = false; // Switch back to view mode
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    ElMessage.error('Failed to update profile. Please try again.');
  }
};

// Call fetchProfileDetail on component mount
onMounted(fetchProfileDetail);

// Logout handler
const handleLogout = () => {
  router.push({ name: 'logout' });
};

// Navigation handler
const backTo = () => {
  router.push({ name: 'onboard-Screen' });
};

// Change password handler
const changePassword = () => {
  router.push({ name: 'change-password' });
};

// Handle the upload success
const handleUploadSuccess = (response, file, fileList) => {
  form.image = file.raw; // Store the file in the form (use file.raw to access the file object directly)
  form.image_url = URL.createObjectURL(file.raw); // Create a URL to display the image
};

// Handle the removal of an image
const handleRemove = (file, fileList) => {
  form.image = null; // Reset the image when removed
  form.image_url = ''; // Clear the image URL
};
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
          <el-form-item required prop="image" class="rounded">
            <el-upload
              v-model="form.image"
              list-type="picture-card"
              :on-success="handleUploadSuccess"
              :on-remove="handleRemove"
              :file-list="form.image ? [form.image] : []"
              :limit="1"
              accept=".jpeg, .png, .jpg"
              :auto-upload="false"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <p class="justify-content-between text-center">{{ form.full_name }}</p>
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
