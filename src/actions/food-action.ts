export async function getFood() {
  const response = await fetch("https://caloriasporalimentoapi.herokuapp.com/api/calorias/?descricao=Frango");
  response.json().then(console.log);
}
