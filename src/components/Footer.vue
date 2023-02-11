<template>
  <footer>
    <p>William Moraes</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  width: 100%;
  height: 60px;
  background-color: var(--color-background-nav);
  display: flex;
  justify-content: center;
  align-items: center;
}

.socialLink {
  border: 2px solid var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 10px;
}

.socialLink img {
  width: 20px;
}
</style>

<!--
mounted: usado quando a pagina for montada

 -->
