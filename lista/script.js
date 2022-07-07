const nameList = ['Feijão', 'Arroz', 'Pão', 'Chocolate', 'Biscoito', ]

const listEl = document.getElementById('list');
const searchField = document.getElementById('searchField');
searchField.addEventListener('input', inputHandler);
this.fillList();

function fillList(list = nameList) {
  for(let i=0; i < list.length; i++) {
    let listItems = document.createElement("li");
    listItems.innerHTML = list[i];
    listEl.appendChild(listItems);
  }
}

function inputHandler() {
  const filteredList =  nameList.filter(el => el.includes(searchField.value));
  fillList(filteredList);
}
