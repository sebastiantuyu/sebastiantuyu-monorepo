<template>
  <input
    type="text"
    class="box-text"
    :placeholder="placeholder"
    v-model="username"
    onpaste="return false;"
    maxlength="10"
  >
</template>

<script src="./BoxText.ts" lang="ts"></script>
<style scoped>
  .box-text {
    min-height: 55px;
    min-width: 300px;

    border: 3px solid black;
    background: rgba(0, 0, 0, 0.7);
    font-family: 'VT323', monospace;
    padding: 0;
    width: 100%;
    line-height: 30px;
    color: white;
    font-size: 30px;
    margin: 10px 0;
    align-self: center;
    padding-left: 10px ;
  }
</style>
