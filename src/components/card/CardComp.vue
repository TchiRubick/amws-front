<template>
  <el-card style="padding: 0.2rem; width: 12.2rem; height: 18rem;">
    <el-image
      :src="`http://localhost/images/${image}`"
      class="image"
      fit="cover"
      style="width: 150px; height: 150px; text-align: center; cursor: pointer;"
      @click="this.$router.push(`/article/${this.id}`)"
    />
    <div>
      <div>
        <span class="title">{{ title }}</span>
      </div>
      <div>
        <span class="subtitle">{{ subtitle }}</span>
      </div>
      <div class="bottom">
        <p class="description">{{ description }}</p>
        <el-button text class="button" @click="this.$router.push(`/article/${this.id}`)">See more</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      id: Number,
      title: String,
      subtitle: String,
      description: String,
      image: String,
    }
  }
</script>

<style scoped>

.title{
  font-size: 18px;
  font-weight: bold;
}
.subtitle{
  font-size: 13px;
  font-weight: bold;
  color: gray;
}

p {
  font-size: 12px;
}
.description {
  word-break: break-all;
  white-space: nowrap;
  width: 9rem;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
