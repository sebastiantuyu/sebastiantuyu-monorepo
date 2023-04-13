<template>
  <div
    v-if="iState"
    class="i-wrapper"
  >
    <div class="i-logo">
      <img src="https://res.cloudinary.com/dwd2eaext/image/upload/v1653943657/6b37b15e49093c4451b01e2c5e291e4ccb2d1229da39a3ee5e6b4b0d3255bfef95601890afd80709da39a3ee5e6b4b0d3255bfef95601890afd80709dd8064321d2ed3ec39c690ed6c39ecff_sdrxqz.png" alt="javascraft title">
    </div>

    <div class="i-box">
      <div class="i-list">
        <BoxButton>
          Press H to Play/Pause
        </BoxButton>

        <BoxButton>
          W to go forward
        </BoxButton>

        <BoxButton>
          A to go left
        </BoxButton>

        <BoxButton>
          S to go back
        </BoxButton>

        <BoxButton>
          D to go right
        </BoxButton>
      </div>
    </div>
  </div>
</template>

<script src="./Instructions.ts" lang="ts"></script>
<style scoped>
  .i-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .i-box {
    margin-top: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .i-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .i-list div {
    height: 40px;
    width: 90%;
    background: gray;
    margin: 10px 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
