<script setup>
  import axios from 'axios';
  import { ElLoading } from 'element-plus';
  import { getToken } from '../scripts/localStorage';
  import LayoutCompVue from '../components/layout/LayoutComp.vue';
  </script>
  
  <template>
    <LayoutCompVue>
      <h2>Create an Article</h2>
      <el-row justify="center">
        <el-card class="box-card">
          <el-col :span="24">
            <el-row class="input-row-two">
              <el-input v-model="title" placeholder="Title - Example: Vax-Resistant Conspiracy Machine" />
            </el-row>
            <el-row class="input-row-two">
              <el-input v-model="subtitle" placeholder="Sub title - Example: Alt-health meets alt-right in the ‘conspirituality’ movement" />
            </el-row>
            <el-row class="input-row-two">
              <el-input v-model="description" type="textarea" placeholder="Description - Example: The video, called “Love in the Time of Covid,” hit a number of now-familiar conspiracy theories..." />
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
                :disabled="!this.title || !this.subtitle || !this.description || !this.file"
                @click="handleCreate"
                >create</el-button
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
        subtitle: '',
        description: '',
        token: '',
        file: null,
        loading: null,
      };
    },
    async created() {
      this.token = await getToken();
    },
    methods: {
      handleCreate() {
        this.showLoader();
        const formData = new FormData();

        formData.append('image', this.file);
        formData.append('title', this.title);
        formData.append('subtitle', this.subtitle);
        formData.append('description', this.description);
  
        axios
          .post('http://localhost/api/admin/article-new', formData, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            this.loading.close();
            this.$router.push('/admin/articles');
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
    /* min-width: 60rem; */
    width: 100%;
  }
  
  .input-row-two {
    margin-top: 1rem;
  }
  </style>
  