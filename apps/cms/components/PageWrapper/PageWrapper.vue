<template>
    <div class="sdl-a__wrapper">
      <div class="sdl-a__wrapper--side-menu">
        <div
          class="sdl-a__wrapper--side-menu--item"
          @click="$router.push('/')"
          data-hover-name="Home"
        >
          <font-awesome-icon icon="fa-solid fa-house" />
        </div>
        <div
          class="sdl-a__wrapper--side-menu--item"
          @click="$router.push('/tutoriales')"
          data-hover-name="Tutoriales"
        >
          <font-awesome-icon icon="fa-solid fa-pen-clip"  />
        </div>
        <div
          class="sdl-a__wrapper--side-menu--item"
          @click="$router.push('/promo')"
          data-hover-name="Banners promocionales"
        >
          <font-awesome-icon icon="fa-solid fa-receipt"/>
        </div>

        <div
          class="sdl-a__wrapper--side-menu--item"
          @click="$router.push('/productos')"
          data-hover-name="Productos"
        >
          <font-awesome-icon icon="fa-solid fa-box" />
        </div>

        <div
          class="sdl-a__wrapper--side-menu--item logout"
          @click="logout"
          data-hover-name="Cerrar sesion"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        </div>
      </div>

      <div class="sdl-a__wrapper--body">
          <slot></slot>
      </div>
    </div>
</template>

<style src="./PageWrapper.scss" lang="scss" scoped></style>
<script src="./PageWrapper.ts" lang="ts"></script>
