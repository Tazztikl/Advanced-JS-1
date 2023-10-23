'use strict';

import { baseUrl } from './variables.js';
import { fetchData } from './utils.js';
import { restaurantRow, restaurantModal } from './components.js';

let restaurants = [];
const table = document.querySelector('table tbody');
const dialog = document.querySelector('dialog');

const getData = async () => {
    try {
        const url = `${baseUrl}restaurants`;
        restaurants = await fetchData(url);
        console.log(restaurants);

        restaurants.forEach(restaurant => {
            const row = restaurantRow(restaurant);
            table.appendChild(row);

            row.addEventListener('click', () => {
                createModal(restaurant);
                dialog.showModal();
            });
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const createModal = async (restaurant) => {
    dialog.innerHTML = '';

    try {
        const menuUrl = `${baseUrl}restaurants/daily/${restaurant._id}/fi`;
        const menu = await fetchData(menuUrl);
        const modalContent = restaurantModal(restaurant, menu);
        dialog.innerHTML = modalContent;

        const closeButton = dialog.querySelector('#close-button');
        closeButton.addEventListener('click', () => {
            dialog.close();
        });

        window.addEventListener('click', (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
        dialog.innerHTML = '<p>Failed to load menu. Please try again later.</p>';
    }
};

getData();
