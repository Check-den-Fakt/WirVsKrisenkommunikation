export default {
  postData: async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  },
  postMultiData: async (url = '', postData = {}) => {
    function buildFormData(formData, data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = data == null ? '' : data;

        formData.append(parentKey, value);
      }
    }

    const formData = new FormData();

    buildFormData(formData, postData)

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: formData // body data type must match "Content-Type" header
    });
    if (response === undefined) return response;
    return await response.json(); // parses JSON response into native JavaScript objects
  },
  getData: async (url = '') => {
    const response = await fetch(url, {
      
    });
    const data = await response.json();
    return data;
  }
}