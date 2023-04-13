<template>
  <div class="loading-wrapper">
    <span>
      Desarrollado por
      <a href="https://sebastiantuyu.com/contact">@sebastiantuyu</a>
    </span>

    <BoxButton
      @click="$router.push('/')"
    >
      Regresar
    </BoxButton>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import BoxButton from '~/components/boxButton/BoxButton';

  export default Vue.extend({
    components: {
      BoxButton
    }
  })
</script>

<style>
  body, html {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: white;
    margin-left: 10px;
  }

  .loading-wrapper{
    --b-size: 90px;
    background: url('https://static.planetminecraft.com/files/image/minecraft/texture-pack/2022/399/15399869-abccfdffcdeddbf_m.jpg');
    background-size: var(--b-size);

    width:100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 45px;
    text-shadow: 5px 5px black;
    text-align: center;
  }

  @media screen and (max-width: 450px){
    .loading-wrapper {
      font-size: 30px;
    }
  }
</style>
