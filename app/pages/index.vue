<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard-layout",
});
</script>

<template>
  <div>
    <h1>
      Home Page
      <UIcon
        name="i-lucide-house"
        class="size-5"
      />
    </h1>
  </div>
</template>
