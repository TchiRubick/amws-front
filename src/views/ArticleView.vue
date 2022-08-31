<script setup>
import axios from 'axios';
import { ElLoading } from 'element-plus';
import { getToken } from '../scripts/localStorage';
import LayoutCompVue from '../components/layout/LayoutComp.vue';
</script>

<template>
  <LayoutCompVue>
    <h2>Detail Article</h2>
    <el-row justify="center">
      <el-card class="box-card">
        <el-col :span="24">
          <el-row>
            <el-image style="width: 100px; height: 100px" :src="image" fit="contain" />
          </el-row>
          <el-row class="input-row-two">
            <el-input v-model="title" />
          </el-row>
          <el-row class="input-row-two">
            <el-input v-model="subtitle" />
          </el-row>
          <el-row class="input-row-two">
            <el-input v-model="description" type="textarea" />
          </el-row>
          <el-row class="input-row-two">
            <el-upload
              ref="uploadRef"
              class="upload-demo"
              action=""
              :on-change="handleUploadChange"
              :auto-upload="false"
            >
              <template #trigger>
                <el-button type="primary">select file</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip">
                  jpeg/png/jpg/gif/svg files with a size less than 2048kb
                </div>
              </template>
            </el-upload>
          </el-row>
          <el-row class="input-row-two">
            <el-button
              :disabled="!this.title || !this.subtitle || !this.description"
              @click="handleUpdate"
              >update</el-button
            >
            <el-button type="danger" plain @click="this.$router.push('/admin/articles')">Cancel</el-button>
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
      title: '',
      oldtitle: '',
      subtitle: '',
      oldsubtitle: '',
      description: '',
      olddescription: '',
      image: '',
      token: '',
      file: null,
      loading: null,
    };
  },
  async created() {
    this.token = await getToken();
    this.showLoader();
    axios
      .get(`http://localhost/api/article/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then((res) => {
        this.title = res.data.title;
        this.oldtitle = res.data.title;
        this.subtitle = res.data.subtitle;
        this.oldsubtitle = res.data.subtitle;
        this.description = res.data.description;
        this.olddescription = res.data.description;
        this.image = `http://localhost/images/${res.data.image}`;
        this.loading.close();
      });
  },
  methods: {
    handleUpdate() {
      const formData = new FormData();

      if (this.file) {
        formData.append('image', this.file);
      }

      if (this.title !== this.oldtitle) {
        formData.append('title', this.title);
      }

      if (this.subtitle !== this.oldsubtitle) {
        formData.append('subtitle', this.subtitle);
      }

      if (this.description !== this.olddescription) {
        formData.append('description', this.description);
      }

      this.showLoader();

      axios
        .post(`http://localhost/api/admin/article/${this.$route.params.id}`, formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.image = `http://localhost/images/${res.data[0].image}`;
          this.loading.close();
        })
        .catch((err) => console.error(err));
    },
    handleUploadChange(file) {
      this.file = file.raw;
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
