export const restaurantRow = (restaurant) => {
    const { name, address } = restaurant;
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <th>${name}</th>
        <th>${address}</th>
    `;
    return tr;
  }
  
  export const restaurantModal = (restaurant, menu) => {
    const { name, address, postalCode, city, phone, company } = restaurant;
    const { courses } = menu;
  
    let menuHtml = '<ul>';
    courses.forEach(course => {
        menuHtml += `<li>${course.name}, ${course.price || '?€'}. ${course.diets}</li>`;
    });
    menuHtml += '</ul>';
  
    return `
        <button id="close-button">Close</button>
        <h2>${name}</h2>
        <p>${address}</p>
        <p>${postalCode}, ${city}</p>
        <p>${phone}</p>
        <p>${company}</p>
        ${menuHtml}
    `;
  }
  