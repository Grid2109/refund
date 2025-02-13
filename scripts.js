//Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Adiciona um evento que é acionado sempre que houver entrada de dados no input
amount.oninput = () => {
    
     // Obtêm o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")

     //Transforma o valor em centavos (exemplo: 150/100 = 1.5)
     value = Number(value) / 100 

    //Atualiza o valor do input 
    amount.value = formatCurrencyBRL(value)
}

//Função que recebe um valor numérico e retorna uma string formatada como moeda brasileira
function formatCurrencyBRL(value) {
     //Usa o método toLocaleString para formatar o número conforme as regras locais do Brasil
  value = value.toLocaleString("pt-BR", {
    style: "currency", //Define que a formatação será monetária
    currency: "BRL",     //Especifica que a moeda é o Real brasileiro
  })

  //Retorna o valor formatado
  return value
}


//Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  //Previne o comportamento padrão do formulário de recarregar a página
    event.preventDefault()

    //Cria um objeto com os dados da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    //console.log(newExpense)
}