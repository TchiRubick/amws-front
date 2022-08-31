<script setup>
import axios from 'axios';
import { ElLoading } from 'element-plus';
import { storeToken, removeToken } from '../scripts/localStorage';
</script>

<template>
  <main>
    <el-main>
      <el-row justify="center">
        <el-card class="box-card">
          <el-col :span="24">
            <el-row>
              <el-input v-model="email" placeholder="test@example.com" />
            </el-row>
            <el-row class="input-row-two">
              <el-input type="password" show-password v-model="password" placeholder="********" />
            </el-row>
            <el-row class="input-row-two">
              <el-button @click="onClick" :disabled="!email || !password">Login</el-button>
            </el-row>
          </el-col>
        </el-card>
      </el-row>
    </el-main>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: 'test@example.com',
      password: 'password',
      message: ''
    }
  },
  methods: {
    onClick() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      axios.post('http://localhost/api/login', { email: this.email, password: this.password })
      .then((res) => {
        storeToken(res.data.access_token);
        this.$router.push('/admin/users');
        loading.close();
      })
      .catch((err) => this.message = err.message);
    }
  },
  mounted() {
    removeToken();
  }
}


</script>

<style scoped>
.box-card {
  min-width: 20rem;
  margin-top: 15%;
}

.input-row-two {
  margin-top: 1rem;
}
</style>
