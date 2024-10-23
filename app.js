
//Функция для выполнения запроса
// async function fetchData() {
//   try {
//     const response = await fetch('http://localhost:3000/items'); // Пример API

//     if (!response.ok) {
//       throw new Error(`Ошибка: ${response.status}`);
//     }

//     const data = await response.json();
//     displayData(data); // Функция для отображения данных
//   } catch (error) {
//     console.error('Ошибка при выполнении запроса:', error);
//     displayError(error); // Функция для отображения ошибки
//   }
// }
// function displayData(data) {
//   const outputDiv = document.getElementById('output');
//   outputDiv.innerHTML = '<ol></ol>'; // Создаем пустой упорядоченный список

//   const olElement = outputDiv.querySelector('ol'); // Получаем ссылку на список

//   data.forEach(item => {
//     olElement.innerHTML += `
//         <div class="card">
//           <li>
//             <h4>${item.name} (ID: ${item.id})</h4>
//             <p><strong>Description:</strong> ${item.description}</p>
//             <p><strong>Quantity:</strong> ${item.quantity}</p>
//           </li>
//           <button class="action-btn delete-btn" onclick="deleteItem(${item.id})">Delete</button>
//           <button id="change">change</button>
//         </div>
//       `;
//   });
  
// }

// // Функция для удаления элемента по ID
// async function deleteItem(id) {
//   try {
//     const response = await fetch(`http://localhost:3000/items/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`Ошибка: ${response.status}`);
//     }

//     // Здесь можно добавить логику для обновления интерфейса после успешного удаления
//     console.log(`Элемент с ID ${id} успешно удален.`);
//   } catch (error) {
//     console.error('Ошибка при удалении элемента:', error);
//     displayError(error);
//   }
// }

// Функция для отображения ошибки на странице
function displayError(error) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
}

// Обработчик нажатия на кнопку
document.getElementById('fetchDataBtn').addEventListener('click', fetchData);


const form = document.querySelector('.form');
form.style.transform = 'scale(1)';

document.getElementById('btnInsert').addEventListener('click', function () {
    const form = document.querySelector('.form');
    form.style.transform = 'scale(1)';
  })


document.getElementById('close').addEventListener('click', function () {
    const form = document.querySelector('.form');
    form.style.transform = 'scale(0)';
  })




// // document.getElementById('btn').addEventListener ('submit', async function (event){
// //     event.preventDefault();
// // });


// //   // Получаем данные из полей формы
// //   const name = document.getElementById('name').value;
// //   const description = document.getElementById('description').value;
// //   const quantity = document.getElementById('quantity').value;


// //   const data = {
// //     name: name,
// //     description: description,
// //     quantity: parseInt(quantity, 10) // Преобразуем значение quantity в число
// //   };




// //   // Обработчик отправки формы
// // document.getElementById('itemForm').addEventListener('submit', async function (event) {
// //     event.preventDefault(); // Предотвращаем стандартное поведение формы
  
// //     const name = document.getElementById('name').value;
// //     const description = document.getElementById('description').value;
  
// //     // Создание POST-запроса
// //     try {
// //       const response = await fetch('http://localhost:3000/items', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ name, description }), // Передаем данные формы
// //       });
  
// //       if (!response.ok) {
// //         throw new Error(`Ошибка: ${response.status}`);
// //       }
  
// //       const data = await response.json();
// //       displayData(data); // Функция для отображения данных
// //     } catch (error) {
// //       console.error('Ошибка при выполнении запроса:', error);
// //       displayError(error); // Функция для отображения ошибки
// //     }
// //   });





// Переключить видимость формы
function toggleForm() {
  const form = document.getElementById('formContainer');
  form.style.transform = form.style.transform === 'scale(1)' ? 'scale(0)' : 'scale(1)';
}

// Close the form
function closeForm() {
  const form = document.getElementById('formContainer');
  form.style.transform = 'scale(0)';
}

// Fetch data and display
async function fetchData() {
  try {
      const response = await fetch('http://localhost:3000/items');
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      const data = await response.json();
      displayData(data);
  } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      displayError(error);
  }
}

// Display fetched data in a styled card format
function displayData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous content

  if (data.length === 0) {
      outputDiv.innerHTML = '<p>No items found.</p>';
      return;
  }

  data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
          <h4>${item.name}</h4>
          <p>Description: ${item.description}</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="action-btn edit-btn" onclick="editItem(${item.id})">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteItem(${item.id})">Delete</button>
      `;

      outputDiv.appendChild(card);
  });
}

// Display error
function displayError(error) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
}

// Handle form submission
document.getElementById('itemForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const quantity = document.getElementById('quantity').value;

  try {
      const response = await fetch('http://localhost:3000/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, quantity }),
      });

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      const data = await response.json();
      displayData(data);
      closeForm(); // Close form on successful submission
  } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      displayError(error);
  }
});

// Edit item
function editItem(id) {
  alert(`Edit functionality for item with ID ${id} is not yet implemented.`);
}

// Delete item
async function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;

  try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
          method: 'DELETE',
      });

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      fetchData(); // Refresh data after deletion
  } catch (error) {
      console.error('Ошибка при удалении:', error);
      displayError(error);
  }
}

