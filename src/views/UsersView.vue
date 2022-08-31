<script setup>
import axios from 'axios';
import { getToken } from '../scripts/localStorage';
import { ElLoading } from 'element-plus';
import LayoutCompVue from '../components/layout/LayoutComp.vue';
</script>

<template>
  <LayoutCompVue>
    <h2>Users</h2>
    <el-button type="success" @click="this.$router.push('/admin/user-new')">Add an user</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="name" label="Name" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleRedirect(scope.$index)"
            >Detail</el-button
          >
          <el-button link type="danger" size="small" @click="handleRemove(scope.$index)"
            >Remove</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </LayoutCompVue>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      token: '',
      loading: null,
    };
  },
  async created() {
    this.token = await getToken();
    this.showLoader();

    axios
      .get('http://localhost/api/admin/users', {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.tableData = res.data;
        this.loading.close();
      })
      .catch((err) => console.error(err));
  },
  methods: {
    handleRemove(index) {
      this.showLoader();
      const data = this.tableData.find((e, i) => i === index);

      axios
        .delete(`http://localhost/api/admin/user/${data.id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((res) => {
          if (res.data.removed) {
            this.tableData.splice(index, 1);
          }
          this.loading.close();
        })
        .catch((err) => console.error(err));
    },
    handleRedirect(index) {
      const data = this.tableData.find((e, i) => i === index);
      this.$router.push(`/admin/user/${data.id}`);
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

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
