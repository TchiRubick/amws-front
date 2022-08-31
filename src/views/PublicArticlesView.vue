<script setup>
  import axios from 'axios';
  import { ElLoading } from 'element-plus';
  import LayoutPublicCompVue from '../components/layout/LayoutPublicComp.vue';
  import CardCompVue from '../components/card/CardComp.vue';
  </script>
  
  <template>
    <LayoutPublicCompVue>
      <h2>Articles</h2>
      <el-row v-if="this.articles.length > 0">
        <el-col 
          v-for="(article, ) in this.articles"
          :key="article.id"
          :span="8"
          :offset="2"
          :xs="12" :sm="6" :md="4" :lg="3" :xl="1"
          style="margin-top: 0.3rem;"
        >
          <CardCompVue v-bind="article" />
        </el-col>
      </el-row>
      <el-row v-else>
        <p>No Articles available.</p>
      </el-row>
    </LayoutPublicCompVue>
  </template>
  
  <script>
  export default {
    data() {
      return {
        articles: [],
        loading: null,
      };
    },
    created() {
      this.showLoader();
  
      axios
        .get('http://localhost/api/articles')
        .then((res) => {
          this.articles = res.data;
          this.loading.close();
        })
        .catch((err) => console.error(err));
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
  