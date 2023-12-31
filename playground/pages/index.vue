<template>
  <div>
    Hello Unibas Brain
  </div>
</template>

<script setup lang="ts">
import {unibasHelper , useUnibasHead} from "#imports";

console.log(unibasHelper.handler.empty('' , 'sallam'))
useUnibasHead({
  title:'sallam'
})
</script>
