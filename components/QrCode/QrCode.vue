<script>
import UQRCode from "./uqrcode";
// const UQRCode = require("./uqrcode");

export default {
  name: "hello",
  props: {
    options: Object,
  },
  mounted() {
    const qr = new UQRCode();
    for (let key in this.options) {
      qr[key] = this.options[key];
    }
    qr.make();
    const canvasContext = uni.createCanvasContext("qrcode", this);
    qr.canvasContext = canvasContext;
    qr.drawCanvas();
  },
};
</script>

<template>
  <canvas id="qrcode" canvas-id="qrcode" :style="`width: 200px; height: 200px`"></canvas>
</template>

<style lang="scss" scoped></style>
