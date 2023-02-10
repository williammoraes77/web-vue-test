<template>
  <main>
    <div>
      <img src="" alt="" />
      <h3></h3>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--color-background);
  justify-content: center;
  align-items: center;
}

.text-top {
  color: var(--color-text-light);
  font-size: 22px;
  margin-bottom: 20px;
}

.text-bottom {
  color: var(--color-text-light);
  font-size: 18px;
  margin-top: 20px;
}

#subscribe {
  width: 340px;
}

@media (min-width: 700px) {
  #subscribe {
    width: 370px;
  }
}
</style>
