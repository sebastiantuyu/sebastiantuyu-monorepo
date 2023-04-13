<template>
  <div class="pl-i-wrapper">
    <div class="pl-i-box">
      <div
        v-for="(item, idx) in inventory"
        :key="idx"
        :class="['pl-i-item', { 'active': idx === activeElement }]"
      >
        <img
          class="pl-i-item-image"
          :src="item.itemSrc"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script src="./Inventory.ts" lang="ts"></script>
<style src="./Inventory.css" scoped></style>
