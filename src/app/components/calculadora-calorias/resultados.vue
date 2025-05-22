<template>
  <div class="grid grid-cols-1 text-center">
    <h2 class="font-mono text-2xl text-green-500">Resultados</h2>
  </div>
  <DataTable :value="resultados" tableStyle="min-width: 50rem">
    <Column field="nivel" header="Nivel">
      <template #body="slotProps">
        <span class="text-green-500">{{ slotProps.data.nivel }}</span>
      </template>
    </Column>
    <Column field="calorias" header="Calorias"></Column>
    <Column field="caloriasWithTdee" header="Calorias Para Ti">
      <!-- <template #body="slotProps">
        {{ formatearMiles(slotProps.data.caloriasWithTdee) }}
      </template> -->
    </Column>
    <Column field="comentario" header="Comentario"></Column>
  </DataTable>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="flex justify-center items-center">
      <label for="tmb" class="font-semibold"
        >Su TMB (Tasa Metabólica Basal) es:</label
      >
    </div>
    <div class="flex">
      <InputNumber
        v-model="tmb"
        disabled="true"
        name="tmb"
        placeholder="TMB"
        fluid
      />
    </div>

    <div class="flex justify-center items-center">
      <label for="tdee" class="font-semibold"
        >Su TDEE (Gasto Energético Diario Total) es:</label
      >
    </div>
    <div class="flex">
      <InputNumber
        v-model="tdee"
        disabled="true"
        name="tdee"
        placeholder="TDEE"
        fluid
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["objetivo", "tmb", "tdee", "show"]);
const { objetivo, tmb, tdee, show } = toRefs(props);

const resultados = ref([]);
const resultadosDefault = ref({
  mp: [
    {
      nivel: "estricto",
      calorias: 50,
      comentario: "Ideal si eres constante con tu actividad y alimentación",
    },
    {
      nivel: "flexible",
      calorias: 100,
      comentario:
        "Compensa pequeños cambios en el día a día sin afectar el peso",
    },
  ],
  pg: [
    {
      nivel: "Déficit leve",
      calorias: 250,
      comentario: "Pérdida lenta de grasa (0.25–0.35 kg/semana)",
    },
    {
      nivel: "Déficit moderado",
      calorias: 450,
      comentario: "Pérdida sostenible (0.4–0.6 kg/semana)",
    },
    {
      nivel: "Déficit intenso",
      calorias: 700,
      comentario:
        "Pérdida rápida (0.7–1 kg/semana), cuidado con la masa muscular",
    },
  ],
  gm: [
    {
      nivel: "Superávit leve",
      calorias: 200,
      comentario: "Ganancia muscular lenta, mínima grasa",
    },
    {
      nivel: "Superávit moderado",
      calorias: 400,
      comentario: "Ganancia muscular más notoria, algo de grasa",
    },
    {
      nivel: "Superávit intenso",
      calorias: 700,
      comentario: "Ganancia rápida, mayor riesgo de acumular grasa",
    },
  ],
});

const calcularDatos = (objetivo, tdee) => {
  resultadosDefault.value[objetivo.toLowerCase()].forEach((value) => {
    resultados.value.push({
      nivel: value.nivel,
      calorias:
        objetivo === "MP" || objetivo === "GM"
          ? `+${value.calorias} kcal`
          : `-${value.calorias} kcal`,
      caloriasWithTdee:
        objetivo === "MP" || objetivo === "GM"
          ? `${formatearMiles(tdee + value.calorias)} kcal x día`
          : `${formatearMiles(tdee - value.calorias)} kcal x día`,
      comentario: value.comentario,
    });
  });
};

const formatearMiles = (numero) => {
  const entero = Math.floor(numero);
  return entero.toLocaleString("es-CO");
};

watch(
  show,
  () => {
    if (!objetivo.value || !tdee.value) return;
    calcularDatos(objetivo.value, tdee.value);
  },
  { immediate: true }
);
</script>
