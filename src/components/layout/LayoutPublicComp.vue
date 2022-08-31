<template>
  <div>
    <el-container>
      <el-header>
        <el-link type="success" class="menu-link" href="/">Home</el-link>
        <el-link type="danger" class="menu-link" href="/admin">Admin Portal</el-link>
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.menu-link {
  margin-right: 1rem;
}
</style>