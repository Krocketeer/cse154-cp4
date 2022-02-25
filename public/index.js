/**
 * Kenny "Ackerson" Le
 * CSE 154 AF, Winter 2022
 * TA: Ludvig Liljenberg, Marina Wooden
 * 2/22/22
 * Creative Project #4
 * Description: Javascript file to control accordion element on about page
 */

"use strict";
(function() {
  window.addEventListener('load', init);

  function init() {
    let t = document.getElementsByClassName('tab');
    let tc = document.getElementsByClassName('tab-content');
    let lastTab = 0;

    for (let i = 0; i < t.length; i++){
      t[i].addEventListener('click', function() {
        if (!t[i].classList.contains('active')){
          hideTab(lastTab);
          t[i].classList.add('active');
          tc[i].classList.add('active');
          lastTab = i;
        }
      })
    }

    let testButton = document.getElementById('testy-test');
    testButton.addEventListener('click', async function() {
      console.log('Do I get here?');
      let thing = await makeRequest('/', 'jokebook/categories', false, 'GET');
      console.log(`This is the thing: ${thing}`)
    })

    function hideTab(index) {
      t[index].classList.remove('active');
      tc[index].classList.remove('active');
    }
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
    console.log(`This is the url: ${url}`);
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
      console.error(err);
      return null;
    }
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