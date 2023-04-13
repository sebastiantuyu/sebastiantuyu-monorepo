<template>
  <button
    @click="switchOptions"
    class="box-button"
  >
    {{ optionDisplayed }}
    <div class="--btn-shadow"></div>
  </button>
</template>

<script src="./BoxToggle.ts" lang="ts"></script>

<style scoped>
  :root {
    --m-grey: #6F6F6F;
    --s-grey: #565857;
    --border-w: 2px;
  }

  .box-button {
    min-height: 55px;
    min-width: 300px;
    padding: 0px 25px;
    background-color: #6F6F6F;
    border: 3px solid black;
    position: relative;
    color: white;
    cursor: pointer;
    font-size: 27px;

    font-family: 'VT323', monospace;
    margin: 10px 0;
  }

  .--btn-shadow {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 7px;
    background-color: #565857;
    opacity: 0.5;
  }

  .deactivated {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
