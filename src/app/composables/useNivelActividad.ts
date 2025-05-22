export const useNivelActividad = () => {
  const config = useRuntimeConfig();

  const getAll = async () => {
    return await $fetch(`${config.public.apiBase}nivel-actividad/listar`);
  };

  return { getAll };
};
