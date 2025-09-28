import inventoryList from './mock-objects/inventory'


class Api {
    constructor (url, headers) {
      this._url = url
      this._headers = headers
    }

  checkResponse(res) {
    if (!(res instanceof Response)) {
      return Promise.resolve(res); 
    }
    
    return new Promise((resolve, reject) => {
      if (res.status === 204) {
        return resolve(res);
      }
      const func = res.status < 400 ? resolve : reject;
      res.json().then(data => func(data));
    });
  }

  // Список всего оборудования
  getInventoryList ( {
    page = 1,
    limit = 20,
  } = {})  {
    return fetch(`/api/v1/inventory/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        ...this._headers,
      }
    }).then(this.checkResponse)
  }

  // Конкретное оборудование
  getInventory ({id, serial_number}) {

    const inventory = inventoryList.find(item => item.serial_number === serial_number) || {};
    const mockResponse = inventory
    
    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

  // Модели
  getModels ( {
    page = 1,
    limit = 9,
  } = {}) {

    return fetch(`/api/v1/models/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        ...this._headers,
      }
    }).then(this.checkResponse)
  }

  // Расходники  
  getConsumables ( {
    page = 1,
    limit = 20,
  } = {}) {

    return fetch(`/api/v1/consumables/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        ...this._headers,
      }
    }).then(this.checkResponse)
  }

  //загрузка файла
  downloadFile (file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`/api/v1/import/`, {
      method: 'POST',
      body: formData,
    }).then(this.checkResponse);
  }

}

const apiInstance = new Api(process.env.API_URL || 'http://localhost', { 'content-type': 'application/json' });

export default apiInstance;
