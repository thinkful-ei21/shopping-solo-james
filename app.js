'use strict';

// an array of shopping list items that we store in this variable
const store = [
  { name: 'apples',
    checked: false 
  },
  { name: 'oranges', 
    checked: false 
  },
  { name: 'bananas', 
    checked: false
  },
  { name: 'milk', 
    checked: false 
  }
];

function generateShoppingListString(item) {
  return `<li>
  <span class="shopping-item">${item.name}</span>
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

// this function will be responsible for rendering the shopping list in the DOM
function renderShoppingList(){
  const listElements = store.map(item => generateShoppingListString(item));
  $('.shopping-list').html(listElements);
  // console.log('foo');
}

// this function will be responsible for when users add a new item
function handleItemSubmit(){
  // console.log('bar');
}

// this function will be responsible for when users click on the 'delete' button
function handleItemDelete(){
  // console.log('fizz');
}

// this function will be responsible for when users click on the 'check' button
function handleItemChecked(){
  // console.log('buzz');
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList(){
  renderShoppingList();
  handleItemSubmit();
  handleItemDelete();
  handleItemChecked();
}

$(handleShoppingList);