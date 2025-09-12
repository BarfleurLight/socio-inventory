import consumables from './mock-objects/consumables'
import importList from './mock-objects/import'
import inventoryList from './mock-objects/inventory'
import models from './mock-objects/models'


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
  // getModels ( ) {
  //   const mockResponse = models

  //   return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  // }
  getModels() {
    const token = localStorage.getItem('token')
    
    return fetch(`/api/v1/models/`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': token ? `Token ${token}` : ''
      }
    }).then(this.checkResponse) // ← Используем вашу checkResponse
  }

  // Расходники  
  getConsumables ( ) {
    const mockResponse = consumables

    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

  //ИпортЫ
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
