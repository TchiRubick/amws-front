<script setup>
import axios from 'axios';
import { ElLoading } from 'element-plus';
import { getToken } from '../scripts/localStorage';
import LayoutCompVue from '../components/layout/LayoutComp.vue';
</script>

<template>
  <LayoutCompVue>
    <h2>Detail User</h2>
    <el-row justify="center">
      <el-card class="box-card">
        <el-col :span="24">
          <el-row>
            <el-input v-model="email" type="email" placeholder="Email - Ex: test@mail.com" />
          </el-row>
          <el-row class="input-row-two">
            <el-input v-model="name" placeholder="Name - Ex: Test User" />
          </el-row>
          <el-row class="input-row-two">
            <el-input v-model="password" type="password" placeholder="Password" />
          </el-row>
          <el-row class="input-row-two">
            <el-input v-model="confirmPassword" type="password" placeholder="Confirm password" />
          </el-row>
          <el-row class="input-row-two">
            <el-button
              :disabled="
                !this.name ||
                !this.email ||
                !this.password ||
                this.password == !this.confirmPassword
              "
              @click="handleCreate"
              >create</el-button
            >
            <el-button type="danger" plain @click="this.$router.push('/admin/users')">Cancel</el-button>
          </el-row>
        </el-col>
      </el-card>
    </el-row>
  </LayoutCompVue>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      token: '',
      loading: null,
    };
  },
  async created() {
    this.token = await getToken();
  },
  methods: {
    handleCreate() {
      this.showLoader();
      axios
        .post(
          'http://localhost/api/admin/user',
          {
            name: this.name,
            email: this.email,
            password: this.password,
          },
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        )
        .then(() => {
          this.loading.close();
          this.$router.push('/admin/users');
        })
        .catch((err) => console.error(err));
    },
    showLoader() {
      this.loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    }
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
}

.input-row-two {
  margin-top: 1rem;
}
</style>
