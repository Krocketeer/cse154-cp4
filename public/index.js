/**
 * Kenny "Ackerson" Le
 * CSE 154 AF, Winter 2022
 * TA: Ludvig Liljenberg, Marina Wooden
 * 2/25/22
 * Creative Project #4:
 * Description: Provides functionality for the vaccine appointment finder
 * by taking user input for city or one of the three available vaccines
 * and displays the results accordingly
 */

"use strict";
(function() {
  window.addEventListener('load', init);

  /**
   * Provides functionality for searching for vaccines by city or
   * or cities by vaccine
   */
  function init() {
    tabHandler();
    let vaccineButton = document.getElementById('vaccine-search');
    vaccineButton.addEventListener('click', searchCities);

    let cityButton = document.getElementById('city-search');
    cityButton.addEventListener('click', searchVaccines);
  }

  /**
   * Provides functionality for switching tabs and content associated with each tab
   */
  function tabHandler() {
    let tab = document.getElementsByClassName('tab');
    let tabContent = document.getElementsByClassName('tab-content');
    let lastTab = 0;

    for (let i = 0; i < tab.length; i++) {
      tab[i].addEventListener('click', function() {
        if (!tab[i].classList.contains('active')) {
          hideTab(lastTab);
          tab[i].classList.add('active');
          tabContent[i].classList.add('active');
          lastTab = i;
        }
      });
    }
  }

  /**
   * Takes an index (from tab list) and hides the tab
   * @param {Number} index : the index of the tab to be hidden
   */
  function hideTab(index) {
    let tab = document.getElementsByClassName('tab');
    let tabContent = document.getElementsByClassName('tab-content');

    tab[index].classList.remove('active');
    tabContent[index].classList.remove('active');
  }

  /**
   * Makes a request to the Vaccine API and displays cities with a specified vaccine in stock
   */
  async function searchCities() {
    let vaccine = document.getElementById('vaccine').value;
    let cities = await makeRequest('/vaccine/', vaccine, false, 'GET');
    let apiResponse = document.getElementById('api-response');
    let paragraph = document.createElement('p');
    if (cities !== null) {
      clearResponse();
      clearError();
      paragraph.classList.add('tab-panel');
      paragraph.textContent = `You can find ${vaccine} vaccines in ${cities}`;
    }
    apiResponse.appendChild(paragraph);
  }

  /**
   * Makes a request to the Vaccine API and displays the vaccine stock for a specified city
   */
  async function searchVaccines() {
    let city = document.getElementById('city').value;
    let vaccines = await makeRequest('/city/', city, true, 'GET');
    let apiResponse = document.getElementById('api-response');
    clearResponse();
    let paragraph = document.createElement('p');

    if (vaccines !== null) {
      clearError();
      paragraph.classList.add('tab-panel');
      paragraph.textContent = `These are the current 
        vaccine stocks for ${capitalizeFirstLetter(city)}`;
      apiResponse.appendChild(paragraph);

      let table = document.createElement('table');
      table.classList.add('tab-panel');
      for (let entry of vaccines['vaccines']) {
        let tableRow = document.createElement('tr');
        let tableData = document.createElement('td');
        tableData.textContent = `${entry['vaccine-name']}: ${entry['doses']}`;
        tableRow.appendChild(tableData);
        table.appendChild(tableRow);
      }
      apiResponse.appendChild(table);
    }
  }

  /**
   * Takes a string, capitalizes the first letter and lower cases everything else
   * @param {string} str :the input string
   * @returns {string} :the formatted string
   * Base credit: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
   */
  function capitalizeFirstLetter(str) {
    str = String(str).toLowerCase();
    return str[0].toUpperCase() + str.slice(1);
  }

  /**
   * Takes the base url, the parameters, if the response is JSON,
   * and makes an API call using the safeGet() function
   * @param {String} baseUrl the base url for the API call
   * @param {String} params the end point of the base url
   * @param {Boolean} isJSON if the response of the API call is JSON or not
   * @param {String} method GET or POST
   * @param {FormData} methodParams additional parameters for API if POST request, null otherwise
   * @returns {Promise<JSON|null>} the response of the API call
   */
  function makeRequest(baseUrl, params, isJSON, method, methodParams = null) {
    let url = baseUrl + `${params}`;
    let methodRequest = methodParams ? {method: method, body: methodParams} : {method: method};
    return safeGet(url, isJSON, methodRequest);
  }

  /**
   * Makes an API call using the provided API and either
   * returns the JSON data or null if an error occurs
   * @param {String} url the URL for the API call
   * @param {Boolean} isJSON if the response of the API call is JSON or not
   * @param {{method: String, body: FormData}|{method: String}} method URL formatted parameters
   * @returns {Promise.<String|null>} the response of the API call
   */
  async function safeGet(url, isJSON, method) {
    try {
      let response = await fetch(url, method);
      await statusCheck(response);
      if (isJSON) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (err) {
      handleError(err);
      return null;
    }
  }

  /**
   * Displays an error message on the page and the error code
   * when the API call fails
   * @param {Error} err Error message from API call
   */
  function handleError(err) {
    clearResponse();

    let warning = document.getElementById('warning');
    warning.classList.add('active');
    warning.classList.add('active');

    let errorMessage = document.createElement('p');
    errorMessage.textContent = `Full error message: ${err.message}`;
    if (warning.children.length > 1) {
      warning.removeChild(warning.lastChild);
    }
    warning.append(errorMessage);
  }

  /**
   * Clears the section that displays the API data on the page
   */
  function clearResponse() {
    let apiResponse = document.getElementById('api-response');
    apiResponse.innerHTML = '';
  }

  /**
   * Removes the error message from the page
   */
  function clearError() {
    let warning = document.getElementById('warning');
    warning.classList.remove('active');
  }

  /**
   * Takes a response from an API call and throws an error if the
   * response was not successful. Returns the response otherwise
   * @param {Response} res response of an API call
   * @returns {Promise<Response>} the response of the API call
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }
})();