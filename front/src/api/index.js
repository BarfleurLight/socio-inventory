import consumables from './mock-objects/consumables'
import importList from './mock-objects/import'
import inventoryList from './mock-objects/inventory'
import models from './mock-objects/models'


class Api {
    constructor (url, headers) {
      this._url = url
      this._headers = headers
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
  getModels ( ) {
    const mockResponse = models

    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
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
