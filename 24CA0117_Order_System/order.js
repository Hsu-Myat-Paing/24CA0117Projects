// Function to navigate to different pages (including checkout)
function goToPage(type) {
  const pageMappings = {
    'eat-in_menu': 'eat-in_menu.html',
    'take-out_menu': 'take-out_menu.html',
    'Don': 'Don.html',
    'Ramen': 'Ramen.html',
    'checkout': 'checkout.html'
  };

  const destination = pageMappings[type];
  if (destination) {
    window.location.href = destination;
  } else {
    console.error('Unknown page type:', type);
  }
}

// Initialize global variables
let orderCount = 0;
let totalAllOrders = 0;

// Updated menu with rice, set, and topping prices included
const menu = {
  gyudon: { name: "牛丼", price: 700, qtyId: "GQty" },
  butadon: { name: "豚丼", price: 650, qtyId: "BQty" },
  torinegi: { name: "鶏ネギ丼", price: 750, qtyId: "CQty" },
  kaisen: { name: "海鮮丼", price: 850, qtyId: "KQty" },
  maguro: { name: "マグロ丼", price: 1200, qtyId: "MQty" },
  katsudon: { name: "かつ丼", price: 950, qtyId: "KaQty" },
  unagi: { name: "うなぎ丼", price: 1500, qtyId: "UQty" },
  tendon: { name: "天丼", price: 950, qtyId: "TQty" },
  vegetable: { name: "野菜丼", price: 650, qtyId: "VQty" },
  oyakodon: { name: "おやこ丼", price: 700, qtyId: "OQty" },
  salmon: { name: "サーモン丼", price: 1300, qtyId: "SQty" },

  shoyuRamen: { name: "醤油ラーメン", price: 1100, qtyId: "shoyuQty" },
  misoRamen: { name: "味噌ラーメン", price: 1100, qtyId: "misoQty" },
  shioRamen: { name: "塩ラーメン", price: 1100, qtyId: "shioQty" },
  tonkotsuRamen: { name: "豚骨ラーメン", price: 1200, qtyId: "tonkotsuQty" },
  spicyMisoRamen: { name: "辛味噌ラーメン", price: 1100, qtyId: "spicyMisoQty" },
  tantanMen: { name: "担々麵", price: 1100, qtyId: "tantanmen" },
  chashuRamen: { name: "チャーシューラーメン", price: 2500, qtyId: "chashuRamenoQty" },
  hotateShioRamen: { name: "帆立塩ラーメン", price: 1800, qtyId: "hotateShioRamenoQty" },
  beefRamen: { name: "牛肉ラーメン", price: 1500, qtyId: "beefRamenoQty" },
  spicyKimchiRamen: { name: "辛キムチラーメン", price: 1200, qtyId: "spicykimchiQty" },
  vegetableRamen: { name: "野菜たぷりラーメン", price: 1100, qtyId: "vegetableramenoQty" },

  greenTea: { name: "緑茶", price: 240, qtyId: "greenTeaQty" },
  oolongTea: { name: "ウーロン茶", price: 240, qtyId: "oolongTeaQty" },
  cola: { name: "コーラ", price: 240, qtyId: "colaQty" },
  orange: { name: "オレンジ", price: 240, qtyId: "OrQty" },
  beer: { name: "生ビール", price: 560, qtyId: "BeerQty" },

  //riceSizes
  normal: { name: "普通", price: 0, qtyId: "normalQty" },
  large: { name: "大盛り", price: 100, qtyId: "largeQty" },
  extraLarge: { name: "特盛り", price: 200, qtyId: "extraLargeQty" },
  //setOption: 
  set:{ name: "セット", price: 200, qtyId: "setQty" },
  
  //Toppings
  ajitama: { name: "味玉", price: 120, qtyId: "ajitamaQty" },
  rice: { name: "ライス", price: 100, qtyId: "riceQty" },
  chashu: { name: "チャーシュー", price: 300, qtyId: "chashuQty" },
  nori: { name: "のり", price: 100, qtyId: "noriQty" },
  butter: { name: "バター", price: 100, qtyId: "butterQty" }
};

// Function to place the order and redirect to checkout page
function placeOrder() {
  let total = 0;
  let hasItem = false;
  let orderData = []; // To store order details

  // Reset error backgrounds before validation
  resetErrorBackground();

  // Validate and calculate the main menu items
  for (let key in menu) {
   

    const input = document.getElementById(menu[key].qtyId);
    if (!input) continue;
    const qty = validateInput(input);
    if (qty > 0) {
      const subtotal = qty * menu[key].price;
      total += subtotal;
      insertRow(orderData, menu[key].name, qty, subtotal);
      hasItem = true;
    }
  }

 
  // If no valid items were ordered, show an alert and prevent going to checkout
  if (!hasItem) {
    alert("すべての注文個数が0です。");
    return;  // Prevent redirect if no items are ordered
  }

    // Confirmation prompt before proceeding to checkout
    const confirmation = confirm("この注文でよろしいでしょうか?");
    if (!confirmation) {
      return; // Stop the order process if the user cancels
    }

  // Store the order data in localStorage for use in checkout page
  
  localStorage.setItem("orderHistory", JSON.stringify(orderData));
  localStorage.setItem("orderTotal", total); // Store total amount as well

  // Reset the form (unfinished)
  // resetForm(menu);
  
  

  // Redirect to checkout page after placing the order
  window.location.href = "checkout.html"; // Automatically go to checkout after placing the order
}



// Helper function to reset the error background color for inputs
function resetErrorBackground() {
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach(input => {
    input.classList.remove("error-input");  // Reset the red background
  });
}

// Helper function to insert row into order table
function insertRow(orderData, name, qty, subtotal) {
  orderData.push({ name, qty, subtotal });  // Store each ordered item in orderData
}

// Function to go back to the previous page
function goBack() {
  window.history.back(); // Go back to the previous page
}

// Function to validate input fields
function validateInput(input) {
  const qty = parseInt(input.value || 0);
  if (isNaN(qty) || qty < 1) {
    input.classList.add("error-input");  // Add red background if invalid or 0
    return 0;
  } else {
    input.classList.remove("error-input");  // Remove red background if valid
    return qty;
  }
}

// Load order history from localStorage on checkout page
window.onload = function() {
  loadOrderHistory();  // Load and display the order history on checkout page
};

// Function to load order data from localStorage and display it
function loadOrderHistory() {
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
  const table = document.getElementById("orderHistory");
  let total = 0;  // Variable to store the total amount

  // Check if orderHistory is available in localStorage
  if (orderHistory && orderHistory.length > 0) {
    orderHistory.forEach(item => {
      // Insert each order item into the table
      const row = table.insertRow();
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>¥${item.subtotal}</td>
      `;
      total += item.subtotal;  // Add the item's subtotal to the total
    });

    // Add the total amount at the bottom
    const totalRow = table.insertRow();
    totalRow.innerHTML = `
      <td colspan="2"><strong>合計</strong></td>
      <td><strong>¥${total}</strong></td>
    `;
  } else {
    const row = table.insertRow();
    row.innerHTML = "<td colspan='3'>注文がありません。</td>"; // Message when no order data is available
  }
}

window.onload = function() {
  loadOrderHistory();  // Load and display the order history on checkout page
};
