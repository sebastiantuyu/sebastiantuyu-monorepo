<template>
  <div class="pl-js">
    <div
      class="pl-circle walk"
      @click="(ev) => mapPosition(ev, 'walk')"
      ref="walk"
    ></div>

    <div
      class="pl-circle look"
      @click="(ev) => mapPosition(ev, 'look')"
      ref="look"
    ></div>
  </div>
</template>

<style src="./Joystick.css" scoped></style>
<script src="./Joystick.ts" lang="ts"></script>
