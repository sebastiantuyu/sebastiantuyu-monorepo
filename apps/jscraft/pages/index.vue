<template>
  <div class="pl-wrapper">
    <div
      v-if="showCover"
      class="pl-cover"
    >
      <div class="bd-gm">
        <div class="pl-tit">
          <img
            class="logo-img"
            src="https://res.cloudinary.com/dwd2eaext/image/upload/v1653943657/6b37b15e49093c4451b01e2c5e291e4ccb2d1229da39a3ee5e6b4b0d3255bfef95601890afd80709da39a3ee5e6b4b0d3255bfef95601890afd80709dd8064321d2ed3ec39c690ed6c39ecff_sdrxqz.png" alt="javascraft title">
        </div>

        <div class="m-list">
          <BoxText
            placeholder="usuario"
            @input="(e) => username = e"
          />

          <BoxButton
            v-if="!isMobile"
            @click="startConfigMenu"
            :is-active="isUsernameValid"
          >
            Jugar
          </BoxButton>

          <BoxButton
            v-if="!isMobile"
            @click="hardRedirect('/creative')"
            :is-active="isUsernameValid"
          >
            Creativo
          </BoxButton>

          <BoxButton
            v-if="isMobile"
          >
            Disponible para PC :(
          </BoxButton>

          <BoxButton
            @click="$router.push('/about')"
          >
            Creditos
          </BoxButton>

          <div class="version">
            version: {{ version }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="loadding-wrapper"
    >
      <div
        v-if="shouldShowConfig"
        class="f-screen"
      >
        <ConfigurationMenu
          @start="startDemo"
        />
        <div class="l-shadow"></div>
      </div>

      <div
        v-show="isLoading && !shouldShowConfig"
      >

      <loader :msg="loaderMessage"/>
      </div>
      <div v-show="!isLoading">
        <div class="middle">
          +
        </div>
        <canvas id="webgl-target" ref="canvasTarget"></canvas>
        <inventory/>
        <instructions />
        <dead-screen v-if="isDead"/>
      </div>
    </div>
  </div>
</template>

<style src="./index.css"></style>
<script src="./index.ts" lang="ts"></script>
