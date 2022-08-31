<script setup>
import { removeToken } from '../../scripts/localStorage';
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <el-link type="success" class="menu-link" href="/admin/users">Users</el-link>
        <el-link type="success" class="menu-link" href="/admin/articles">Articles</el-link>
        <el-link type="danger" class="menu-link" @click="() => removeToken()" href="/">Logout</el-link>
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