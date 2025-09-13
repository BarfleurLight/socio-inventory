import importList from './mock-objects/import'
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
  getInventoryList ( ) {
    const mockResponse = inventoryList
    
    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

  // Конкретное оборудование
  getInventory ({id, serial_number}) {

    const inventory = inventoryList.find(item => item.serial_number === serial_number) || {};
    const mockResponse = inventory

    
    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

  // Модели
  getModels() {
    return fetch(`/api/v1/models/`, {
      method: 'GET',
      headers: {
        ...this._headers,
      }
    }).then(this.checkResponse)
  }

  // Расходники  
  getConsumables ( ) {
    return fetch(`/api/v1/consumables/`, {
      method: 'GET',
      headers: {
        ...this._headers,
      }
    }).then(this.checkResponse)
  }

  //Ипорты
  getImports ( ) {
    const mockResponse = importList

    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

  //Ипорт
  getImport ({id}) {
    const currentImport = importList.find(item => item.id === id) || {};
    const mockResponse = currentImport
    
    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

  //загрузка файла
  downloadFile () {
    console.log('файл загружен')
  }

}

const apiInstance = new Api(process.env.API_URL || 'http://localhost', { 'content-type': 'application/json' });

export default apiInstance;
