////Seleciona o elemento de input pelo ID "amount" do HTML
const amount = document.getElementById("amount")

//Adiciona um evento que é acionado sempre que houver entrada de dados no input
amount.oninput = () => {
     // Obtêm o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")

    //Atualiza o valor do input apenas com os números
    amount.value = value
}