'use strict';
/* eslint-env jquery */

// an array of shopping list items that we store in this variable
const STORE = {
  items: [
    { name: 'apples',checked: false },
    { name: 'oranges', checked: false },
    { name: 'milk', checked: false},
    { name: 'bread', checked: false}
  ],
  hideChecked: false
};

function generateItemElement(item, index) {
  let isChecked = '';
  if (item.checked === true) isChecked = 'shopping-item__checked'; 

  let isDisplayed = '';
  if (STORE.hideChecked === true && item.checked === true) isDisplayed = 'not-displayed';

  return `<li data-item-index="${index}" class="${isDisplayed}">
  <span class="shopping-item js-shopping-item ${isChecked}">${item.name}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
</li>`;
}

function generateShoppingItemsString(shoppingList) {
  const listElements = shoppingList.map((item, index) => generateItemElement(item, index));
  return listElements;
}

// this function will be responsible for rendering the shopping list in the DOM
function renderShoppingList(listItems = [...STORE.items]){
  const shoppingList = $('.shopping-list');
  shoppingList.html(generateShoppingItemsString(listItems));
}

function pushNewItem(newItemName) {
  if (newItemName) {
    STORE.items.push({name: newItemName, checked: false});
  }
}

// this function will be responsible for when users add a new item
function handleItemSubmit(){
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    pushNewItem(newItemName);

    renderShoppingList();
    $(event.target).trigger('reset'); // resets the form element to blank after submit
  });
}

function toggleChecked(index) {
  
  STORE.items[index].checked = !STORE.items[index].checked;
}


// this function will be responsible for when users click on the 'check' button
function handleItemChecked(){
  
  $('.js-shopping-list').on('click','.shopping-item-toggle', function(event){
    const itemIndex = $(event.currentTarget).closest('li').attr('data-item-index');
    
    toggleChecked(itemIndex);
    renderShoppingList();
  });
}

function isChecked() {
  $('.switch').change(function() {
    STORE.hideChecked = !STORE.hideChecked;
    renderShoppingList();
  });
}

function deleteItem(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

// this function will be responsible for when users click on the 'delete' button
function handleItemDelete(){
  $('.shopping-list').on('click','.shopping-item-delete', function(event){
    const itemIndex = $(event.target).closest('li').attr('data-item-index');
    deleteItem(itemIndex);
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList(){
  renderShoppingList();
  handleItemSubmit();
  handleItemChecked();
  isChecked();
  handleItemDelete();
}

$(handleShoppingList);