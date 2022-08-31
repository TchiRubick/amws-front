<script setup>
import axios from 'axios';
import { ElLoading } from 'element-plus';
import LayoutPublicCompVue from '../components/layout/LayoutPublicComp.vue';
</script>

<template>
  <LayoutPublicCompVue>
    <h2>Article</h2>
    <el-card style="padding: 0.2rem; width: 100%; text-align: center;">
      <el-image
        :src="image"
        class="image"
        fit="contain"
        style="max-height: 30rem; text-align: center"
      />
      <div style="text-align: start;">
        <div>
          <span class="title">{{ title }}</span>
        </div>
        <div>
          <span class="subtitle">{{ subtitle }}</span>
        </div>
        <div class="bottom">
          <p class="description">{{ description }}</p>
          <p class="time">{{ new Date(created_at) }}</p>
        </div>
      </div>
    </el-card>
  </LayoutPublicCompVue>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      subtitle: '',
      description: '',
      image: '',
      created_at: '',
      loading: null,
    };
  },
  created() {
    this.showLoader();
    axios.get(`http://localhost/api/article/${this.$route.params.id}`).then((res) => {
      this.title = res.data.title;
      this.subtitle = res.data.subtitle;
      this.description = res.data.description;
      this.created_at = res.data.created_at;
      this.image = `http://localhost/images/${res.data.image}`;
      this.loading.close();
    });
  },
  methods: {
    showLoader() {
      this.loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
}
.subtitle {
  font-size: 13px;
  font-weight: bold;
  color: gray;
}

p {
  font-size: 12px;
}

.time {
  font-size: 10px;
}

</style>
