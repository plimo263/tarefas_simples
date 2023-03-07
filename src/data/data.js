const URL_DADOS_STORAGE = "TAREFAS_SIMPLES";

export const salvarDados = (dados) => {
  const local = window.localStorage || null;
  if (!local) return;
  local.setItem(URL_DADOS_STORAGE, JSON.stringify(dados));
};
// Recupera os dados salvos no localStorage
export const recuperarDados = () => {
  const initialData = {
    tarefas: {},
    quadros: {},
    ordemQuadros: [],
  };
  const local = window.localStorage || null;
  if (!local) return initialData;
  // Verifica se existe o storage
  if (!local.getItem(URL_DADOS_STORAGE)) {
    local.setItem(URL_DADOS_STORAGE, JSON.stringify(initialData));
    return initialData;
  }
  // Existe, desconverte do JSON e o retorna
  return JSON.parse(local.getItem(URL_DADOS_STORAGE));
};

const initialData = recuperarDados();

export default initialData;
