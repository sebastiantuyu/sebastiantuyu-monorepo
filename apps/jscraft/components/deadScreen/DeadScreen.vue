<template>
  <div class="w-p">
    <span class="w-p-tit">
      You died!

      <div class="w-user">
        {{username}}
      </div>
    </span>

    <BoxButton
      @click="restart"
    >
      Menu principal
    </BoxButton>
  </div>
</template>

<style src="./DeadScreen.css" scoped></style>
<script src="./DeadScreen.ts" lang="ts"></script>
