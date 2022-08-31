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
            <el-input v-model="email" disabled />
          </el-row>
          <el-row class="input-row-two">
            <el-input v-model="name" />
          </el-row>
          <el-row class="input-row-two">
            <el-button :disabled="!this.name || this.name === this.oldName" @click="handleUpdate"
              >update</el-button
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
      oldName: '',
      token: '',
      loading: null,
    };
  },
  async created() {
    this.token = await getToken();
    this.showLoader();
    axios
      .get(`http://localhost/api/admin/user/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.email = res.data.email;
        this.name = res.data.name;
        this.oldName = res.data.name;
        this.loading.close();
      });
  },
  methods: {
    handleUpdate() {
      this.showLoader();
      axios
        .put(
          `http://localhost/api/admin/user/${this.$route.params.id}`,
          {
            name: this.name,
          },
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        )
        .then(() => this.loading.close())
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
