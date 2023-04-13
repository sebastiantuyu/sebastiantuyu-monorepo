<template>
    <div class="i-box-wp">
      <div class="i-logo">
          <img src="https://res.cloudinary.com/dwd2eaext/image/upload/v1653943657/6b37b15e49093c4451b01e2c5e291e4ccb2d1229da39a3ee5e6b4b0d3255bfef95601890afd80709da39a3ee5e6b4b0d3255bfef95601890afd80709dd8064321d2ed3ec39c690ed6c39ecff_sdrxqz.png" alt="javascraft title">
          <span>
            CREATIVO
          </span>
        </div>

          <div class="c-box">
            <div class="c-item">
              <span>
                Renderizar nubes
              </span>

              <BoxToggle
                :options="['ON', 'OFF']"
                @changed="(e) => onToggle('clouds',e)"
              ></BoxToggle>
            </div>

            <div
              v-if="isCreativeMode"
              class="c-item"
            >
              <span>
                Objecto a renderizar
              </span>

              <BoxToggle
                :options="modelsAvailables"
                @changed="(e) => onToggle('render', e)"
              ></BoxToggle>
            </div>

            <div class="c-item">
              <span>
                Pack de textura
              </span>

              <BoxToggle
                :options="texturePacksAvailables"
                @changed="(e) => onToggle('texture',e)"
              ></BoxToggle>
            </div>

            <div class="c-item">
              <span>
                Generar hierba
              </span>

              <BoxToggle
                :options="['ON', 'OFF']"
                @changed="(e) => onToggle('grass',e)"
              ></BoxToggle>
            </div>
          </div>

          <BoxButton
            @click="$emit('start')"
          >
            Iniciar
            <span
              v-if="isCreativeMode"
            > creativo </span>
            <span
              v-else
            > juego </span>
          </BoxButton>
      </div>
</template>

<style src="./ConfigurationMenu.css" scoped></style>
<script src="./ConfigurationMenu.ts" lang="ts"></script>
