<template>
  <header
    class="fixed top-0 left-0 z-50 flex items-center justify-between px-4 py-2 shadow-md w-full bg-surface-950"
  >
    <!-- Sección izquierda -->
    <div class="flex items-center gap-3">
      <!-- Botón hamburguesa en móvil -->
      <Button
        icon="pi pi-align-justify"
        severity="success"
        v-if="isMobile"
        @click="sidebarVisible = true"
      />

      <div class="flex items-center">
        <img src="/assets/imgs/logo_playgroud.png" class="w-15 h-15" />
        <span class="logo-playgroud-custom">Playground</span>
      </div>
    </div>

    <!-- Sección Mitad -->
    <div class="flex">
      <!-- MenuBar en escritorio -->
      <MenuBar v-if="!isMobile" :model="menuItems" class="menu-bar-custom" />
    </div>

    <!-- Sección derecha -->
    <div class="flex items-center gap-3">
      <a href="https://github.com/Miguel199627" target="_blank"
        ><img src="/assets/imgs/logo_github.png" class="w-12 h-12"
      /></a>
      <a href="https://www.marcsoft.com.co/" target="_blank"
        ><img src="/assets/imgs/logo_marcsoft.png" class="w-12 h-12"
      /></a>

      <!-- Avatar -->
      <!-- <Avatar
        icon="pi pi-user"
        shape="circle"
        class="cursor-pointer"
        @click="toggleAvatarMenu"
      />
      <Menu ref="avatarMenu" :model="avatarItems" :popup="true" /> -->
    </div>

    <!-- Sidebar en móvil -->
    <Drawer v-model:visible="sidebarVisible" position="left" class="w-72">
      <template #header>
        <h3 class="font-semibold text-lg">Menú</h3>
      </template>
      <ul class="list-none p-0 m-0">
        <li v-for="item in menuItems" :key="item.label" class="mb-2">
          <Button
            :label="item.label"
            :icon="item.icon"
            class="w-full text-left"
            @click="item.command?.()"
          />
        </li>
      </ul>
    </Drawer>
  </header>
</template>

<style scoped>
.menu-bar-custom {
  --p-menubar-item-focus-background: green;
  --p-menubar-border-color: none;
}

.logo-playgroud-custom {
  font-family: cursive;
  font-size: 20px;
}
</style>

<script setup>
const sidebarVisible = ref(false);
// const avatarMenu = ref();
const isMobile = ref(false);
const router = useRouter();

const menuItems = [
  // { label: "Inicio", icon: "pi pi-home", command: () => router.push("/") },
  {
    label: "Calculadora de Calorias",
    icon: "pi pi-calculator",
    command: () => router.push("/calculadora-calorias"),
  },
];

// const avatarItems = [
//   { label: "Perfil", icon: "pi pi-user", command: () => navigate("perfil") },
//   { label: "Salir", icon: "pi pi-sign-out", command: () => logout() },
// ];

const updateScreenSize = () => {
  isMobile.value = window.innerWidth <= 960;
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);
});

// function toggleAvatarMenu(event) {
//   avatarMenu.value.toggle(event);
// }

// function navigate(ruta) {
//   alert(`Navegar a: ${ruta}`);
// }

// function logout() {
//   alert("Cerrar sesión");
// }
</script>
