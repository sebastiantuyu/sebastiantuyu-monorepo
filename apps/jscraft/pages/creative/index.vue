<template>
  <div class="wrapper"
    v-if="isConnected"
  >
    <div
      v-if="showCover"
      :class="'i-box ' + (showCover ? 'shadow' : '')"
    >
    <ConfigurationMenu
      @start="startDemo"
      @changed="onToggle"
      :is-creative-mode="true"
    />
    </div>
    <div
      v-else
      class="loadding-wrapper"
    >
      <div
        v-show="isLoading"
      >

      <loader :msg="loaderMessage"/>
      </div>
      <div v-show="!isLoading">
        <div class="middle">
          +
        </div>
        <canvas id="webgl-target" ref="canvasTarget"></canvas>
        <socket-room />
        <inventory/>
        <instructions />
        <dead-screen v-if="isDead"/>
      </div>
    </div>
  </div>
  <div
    v-else
    class="wrapper">
    <div class="msg">
      Connecting with the server...
    </div>
  </div>
</template>

<style src="./index.css"></style>
<script src="./index.ts" lang="ts"></script>
