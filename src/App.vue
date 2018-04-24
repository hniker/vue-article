<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="css">
  @import "./../static/font/iconfont.css";
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    line-height: 1.6;
  }

  * {
    margin: 0;
    padding: 0;
  }

  a img {
    border: 0;
  }

  a {
    text-decoration: none;
  }
</style>
