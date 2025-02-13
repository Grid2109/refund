//Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span ")

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
    
    //chama a função que adiciona novo item na lista
    expenseAdd(newExpense)
    //console.log(newExpense)
}

//Função que adiciona uma nova despesa na lista
function expenseAdd(newExpense) {
 try {
  //Cria o elemento para adicionar o item(li) na lista(ul)
  const expenseItem = document.createElement("li")
  expenseItem.classList.add("expense")

  //Cria o ícone da categoria
  const expenseIcon = document.createElement("img")
  expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
  expenseIcon.setAttribute("alt", newExpense.category_name)

  //Cria a info da despesa
  const expenseInfo = document.createElement("div")
  expenseInfo.classList.add("expense-info")

  //Cria o nome da despesa
  const expenseName = document.createElement("strong")
  expenseName.textContent = newExpense.expense

  //Cria a categoria da despesa
  const expenseCategory = document.createElement("span")
  expenseCategory.textContent = newExpense.category_name

  //Adiciona o nome e a categoria na div das informações da despesa
  expenseInfo.append(expenseName, expenseCategory)

 //Cria o valor da despesa
  const expenseAmount = document.createElement("span")
  expenseAmount.classList.add("expense-amount")
  expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

  //Cria o ícone de remover
  const removeIcon = document.createElement("img")
  removeIcon.classList.add("remove-icon")
  removeIcon.setAttribute("src", "./img/remove.svg")
  removeIcon.setAttribute("alt", "Remover")
  
  //Adiciona as informações no item
  expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

  //Adiciona o item na lista
  expenseList.append(expenseItem)

  //Atualiza os totais
  updateTotals()
 }  catch (error) {
     alert("Não foi possível atualizar a lista de despesas.")
     console.log(error)
 }
}

function updateTotals() {
  try {
    //Recupera todos os itens(li) da lista(ul)
    const items = expenseList.children
    
    //Atualiza a quantidade de itens na lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
  } catch (error) {
     alert("Não foi possivel atualizar os totais.")
     console.log(error)
  }
}
