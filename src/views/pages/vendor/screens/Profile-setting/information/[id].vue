<script setup>
import {useRouter} from "vue-router";
import {reactive} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const router = useRouter();
const backTo = () => {
  router.push({name: 'onboard-Screen'})
}
  // do not use same name with ref
  const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

  const onSubmit = () => {
  console.log('submit!')
}
const changePassword = () => {
  router.push({name: 'change-password'})
}
</script>

<template>
  <div class="page d-flex flex-row gap-3">
    <div class="side-bar ">
      <h1>Profile Setting</h1>
      <button @click="backTo({name:'on-board-screen'})">
        <font-awesome-icon :icon="['fas', 'arrow-left']"/>
        Home
      </button>
    </div>
    <div class="info d-flex flex-row gap-3 ">
      <div class="d-flex flex-column gap-3">
        <div class="profile">
          <img src="https://picsum.photos/200/300" class="img rounded-circle p-4"/>
          <p class="justify-content-between text-center">Profile</p>
        </div>
        <div class="information">
          <p class="fw-bold">Information</p>
          <div>
            username:
          </div>
          <div>
            Email:
          </div>
          <div>
            Phone:
          </div>
          <button class="logout">Logout</button>
        </div>
      </div>
      <div class="detail">
        <img src="@/assets/images/speediz-logo.png" alt="logo">
        <p class="fw-bold text-lg-start">Your Profile information</p>
        <el-form :model="form" label-width="auto">
         <el-form class="d-flex flex-row gap-lg-4">
           <el-form-item label="Firstname" required>
             <el-input v-model="form.firstname" />
           </el-form-item>
           <el-form-item label="Lastname" required>
             <el-input v-model="form.lastname" />
           </el-form-item>
         </el-form>
          <el-form-item label="Shop name" required>
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Email" required>
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item  label="Date of Birth" required>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="Pick a day"
              :size="size"
            />
          </el-form-item>
          <el-form-item label="Gender" required>
            <el-select v-model="form.region" placeholder="please select your gender">
              <el-option label="Female" value="shanghai" />
              <el-option label="Male" value="beijing" />
              <el-option label="Prefer not to say" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="Location" required>
            <el-input v-model="form.name" placeholder="No. 12F, st.271, Phnom Penh, Cambodia" />
          </el-form-item>
          <el-form-item label="Contact" required>
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-link @click="changePassword">Change Password</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Edit</el-button>
            <el-button>Save</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page{
  background-color: #E8E8E8;
  font-family: Inter, sans-serif;
}
.side-bar{
  background-color: #FFBD59;
  width: 400px;
  height: 100vh;
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

.information{
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
.logout{
  background-color: #FFBD59;
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
.detail{
  width: 600px;
  height: 620px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0.5px 0.5px 0.5px 0.5px white;
  padding: 20px;
}
.detail p{
  font-family: Inter, sans-serif;
  font-size: 30px;
  padding: 10px;
}
.info{
  padding: 30px;

}
.detail img{
  width: 100px;
  height: 50px;
}
</style>
