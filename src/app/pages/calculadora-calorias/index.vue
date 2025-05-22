<template>
  <Card>
    <template #title>
      <div class="text-2xl font-bold">
        <i class="pi pi-calculator icon-custom"></i>
        Calculadora de Calorias
      </div>
    </template>
    <template #content>
      <Form
        ref="formRef"
        v-slot="$form"
        :initialValues
        :resolver
        @submit="onFormSubmit"
        class="space-y-6 max-w-7xl mx-auto p-4"
      >
        <div class="space-y-4 p-4 text-justify">
          <h2 class="text-2xl font-bold text-green-600">
            🧮 Calculadora de Calorías: Conoce tus Necesidades Energéticas
            Diarias
          </h2>
          <p>
            Nuestra calculadora de calorías te ayuda a estimar cuántas calorías
            necesitas al día según tu sexo, peso, altura, edad, nivel de
            actividad física y objetivo personal (mantener el peso, perder grasa
            o ganar masa muscular).
          </p>
          <p>Este cálculo se basa en dos factores fundamentales:</p>
          <ul class="list-disc list-inside pl-4">
            <li>
              <strong>TMB (Tasa Metabólica Basal):</strong> La cantidad de
              energía que tu cuerpo necesita en reposo para mantener funciones
              vitales como respirar, digerir o mantener la temperatura corporal.
            </li>
            <li>
              <strong>TDEE (Gasto Energético Diario Total):</strong> Es tu TMB
              ajustado según tu nivel de actividad física diaria, representando
              las calorías que realmente necesitas para mantener tu peso actual.
            </li>
          </ul>
          <p>
            Una vez conocidos estos valores, podrás ajustar tu ingesta calórica
            diaria de forma personalizada y segura para lograr tus objetivos de
            salud y composición corporal.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <label for="sexo" class="font-semibold mb-2">Sexo</label>
            <div
              class="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center"
            >
              <img
                src="/assets/imgs/form_sex.png"
                alt="Campo Sexo"
                class="w-3/5 h-3/5 object-contain"
              />
            </div>
            <RadioButtonGroup name="sexo" class="flex flex-wrap gap-4 mt-2">
              <div class="flex items-center gap-2">
                <RadioButton inputId="mujer" value="M" />
                <label for="mujer">Mujer</label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton inputId="hombre" value="H" />
                <label for="hombre">Hombre</label>
              </div>
            </RadioButtonGroup>
            <Message
              v-if="$form.sexo?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.sexo.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col">
            <label for="peso" class="font-semibold mb-2">Peso (kg)</label>
            <div
              class="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center"
            >
              <img
                src="/assets/imgs/form_scale.png"
                alt="Campo Peso"
                class="w-3/5 h-3/5 object-contain"
              />
            </div>
            <InputNumber name="peso" placeholder="Peso" fluid class="mt-2" />
            <Message
              v-if="$form.peso?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.peso.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col">
            <label for="altura" class="font-semibold mb-2">Altura (cm)</label>
            <div
              class="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center"
            >
              <img
                src="/assets/imgs/form_height.png"
                alt="Campo Altura"
                class="w-3/5 h-3/5 object-contain"
              />
            </div>
            <InputNumber
              name="altura"
              placeholder="Altura"
              fluid
              class="mt-2"
            />
            <Message
              v-if="$form.altura?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.altura.error?.message }}</Message
            >
          </div>
          <div class="flex flex-col">
            <label for="edad" class="font-semibold mb-2">Edad (años)</label>
            <div
              class="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center"
            >
              <img
                src="/assets/imgs/form_calendar.png"
                alt="Campo Edad"
                class="w-3/5 h-3/5 object-contain"
              />
            </div>
            <InputNumber name="edad" placeholder="Edad" fluid class="mt-2" />
            <Message
              v-if="$form.edad?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.edad.error?.message }}</Message
            >
          </div>
        </div>

        <div class="flex flex-col text-center" v-if="!nivelesActividad.data">
          <label class="font-semibold mb-2">Cargando Nivel de Actividad</label>
          <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>

        <div class="mt-6" v-else>
          <label class="block font-semibold mb-2" for="factor_actividad">
            Nivel de Actividad
          </label>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            <div
              v-for="item in nivelesActividad.data"
              :key="item.ccniac_codigo"
              class="flex flex-col items-center text-center p-4 border rounded shadow-md bg-white dark:bg-gray-800"
            >
              <img
                :src="item.ccniac_urlimg"
                alt="Nivel de Actividad"
                class="w-30 h-30 object-contain mb-2"
              />

              <div class="flex items-center gap-2 mb-2">
                <RadioButton
                  name="factor_actividad"
                  :inputId="item.ccniac_codigo"
                  :value="item.ccniac_factor"
                />
                <label :for="item.ccniac_factor">{{
                  item.ccniac_nombre
                }}</label>
              </div>

              <p class="text-sm text-justify">
                {{ item.ccniac_descripcion }}
              </p>
            </div>
            <Message
              v-if="$form.factor_actividad?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.factor_actividad.error?.message }}</Message
            >
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex justify-center items-center">
            <label for="tdee" class="font-semibold"
              >¿Qué deseas conseguir?:</label
            >
          </div>
          <div class="flex flex-col">
            <Select
              :options="objetivos"
              optionLabel="name"
              optionValue="code"
              placeholder="Seleccione un Objetivo"
              name="objetivo"
              fluid
            ></Select>
            <Message
              v-if="$form.objetivo?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.objetivo.error?.message }}</Message
            >
          </div>
        </div>

        <div class="flex flex-col text-center" v-if="resultado.show === false">
          <label class="font-semibold mb-2">Cargando Resultados</label>
          <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>

        <CalculadoraCaloriasResultados
          v-else-if="resultado.show === true"
          :objetivo="$form.objetivo?.value"
          :tmb="resultado.tmb"
          :tdee="resultado.tdee"
          :show="resultado.show"
        />

        <div class="grid grid-cols-1">
          <Button type="submit" icon="pi pi-check" label="Calcular" />
        </div>
      </Form>
    </template>
  </Card>
</template>

<style scoped>
.icon-custom {
  --p-icon-size: 30px;
}
</style>

<script setup>
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";

const formRef = ref();
const nivelesActividad = ref([]);
const objetivos = ref([
  { name: "Mantener el Peso", code: "MP" },
  { name: "Perdida de Grasa", code: "PG" },
  { name: "Ganancia Muscular", code: "GM" },
]);
const resultado = ref({
  tmb: 0,
  tdee: 0,
  show: null,
});

const initialValues = ref({
  sexo: "",
  peso: null,
  altura: null,
  edad: null,
  factor_actividad: null,
  objetivo: "",
});

const resolver = ref(
  yupResolver(
    yup.object().shape({
      sexo: yup.string().required(),
      peso: yup.number().required(),
      altura: yup.number().required(),
      edad: yup.number().required(),
      factor_actividad: yup.string().required(),
      objetivo: yup.string().required(),
    })
  )
);

onMounted(() => {
  getAllNivelActividad();
});

const getAllNivelActividad = async () => {
  const { getAll } = useNivelActividad();
  nivelesActividad.value = await getAll();
};

const onFormSubmit = ({ valid, values }) => {
  if (!valid) return;

  resultado.value.show = false;

  setTimeout(() => {
    const { sexo, peso, altura, edad, factor_actividad } = values;

    if (sexo === "H")
      resultado.value.tmb = 10 * peso + 6.25 * altura - 5 * edad + 5;
    else resultado.value.tmb = 10 * peso + 6.25 * altura - 5 * edad - 161;

    resultado.value.tmb = Math.round(resultado.value.tmb);
    resultado.value.tdee = resultado.value.tmb * parseFloat(factor_actividad);
    resultado.value.tdee = Math.round(resultado.value.tdee);

    resultado.value.show = true;
  }, 2000);

  // formRef.value.setFieldValue("tmb", parseFloat(tmb.toFixed(2)));
  // formRef.value.setFieldValue("tdee", parseFloat(tdee.toFixed(2)));
};
</script>
