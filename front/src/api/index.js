class Api {
    constructor (url, headers) {
      this._url = url
      this._headers = headers
    }

  // Inventory
  getInventoryList ( ) {
    const mockResponse = [
        {
            id: 1,
            image: 'https://foodgram.mvobr.ru/backend_media/recipes/images/temp.jpeg',
            fullname: 'МФУ SHARP MX-M266NVEU',
            shortname: 'SHARP 266NV',
            // model object
            model: {
              id: 0,
              name: 'SHARP',
             },
            serial_number: '000999111',
            status_real: 'Действ',
            status_doc: 'Действ',
            status_online: 'n дней назад',
            current_responsible: 'Обришти Марк Валерьевич',
            room_real: 101,
            room_doc: 207
          },{
            id: 2,
            image: 'URL_photo2',
            fullname: 'Моноблок MSI Adora 20 2M-026RU White',
            shortname: 'MSI Adora 20 2BT',
            model: {
              id: 2,
              name: 'MSI Andora 20',
             },
            serial_number: '000999222000999222000999222000999222000999222000999222',
            status_real: 'К списанию',
            status_doc: 'К списанию',
            status_online: '3 часа назад',
            current_responsible: 'Синяков Алексей Викторович',
            room_real: 403,
            room_doc: 419
          },{
            id: 3,
            image: 'URL_photo3',
            fullname: '23.8" Моноблок Lenovo V530-24ICB',
            shortname: 'Lenovo V530',
            model: {
              id: 3,
              name: 'Lenovo V530',
             },
            serial_number: '000999333',
            status_real: 'Действ',
            status_doc: 'Списан',
            status_online: 'now',
            current_responsible: 'Синяков',
            room_real: 413,
            room_doc: 19
          }
    ]

    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

  // Models
  getModels ( ) {
    const mockResponse = [
        {
            id: 1,
            image: 'https://foodgram.mvobr.ru/backend_media/recipes/images/temp.jpeg',
            name: 'SHARP 266NV',
            type: 'printer',
            all: 5,
          },{
            id: 2,
            image: 'URL_photo2',
            name: 'MSI Adora 20 2BT',
            type: 'computer',
            all: 7,
          },{
            id: 3,
            image: 'URL_photo3',
            name: 'Lenovo V530',
            type: 'none',
            all: 3,
          }
    ]

    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

  getConsumables ( ) {
    const mockResponse = [
        {
            id: 1,
            image: 'https://foodgram.mvobr.ru/backend_media/recipes/images/temp.jpeg',
            name: 'USB флеш-накопитель TECHKEY, водонепроницаемый флеш-накопитель 64 ГБ 32 ГБ 16 ГБ 8 ГБ 4 ГБ, серебристая флешка, U-диск,',
            type: 'usb-flash',
            models: [],
            count: 5,
          },{
            id: 2,
            image: 'URL_photo2',
            name: 'Картридж Q5942A , № 42A, совместимый для принтеров HP',
            type: 'computer',
            models: [
              {
                id: 1,
                name: 'Hp 4250'
              },
              {
                id: 2,
                name: 'hp4200'
              },
              {
                id: 3,
                name: 'Hp 4250'
              },
              {
                id: 4,
                name: 'hp4200'
              },
              {
                id: 5,
                name: 'Hp 4250'
              },
              {
                id: 6,
                name: 'hp4200'
              },
            ],
            count: 7,
          },{
            id: 3,
            image: 'URL_photo3',
            name: 'Картридж Sakura SP330H для Ricoh Aficio SP330series, черный, 7000 к.',
            type: 'none',
            models: [
              {
                id: 4,
                name: 'RICOH SP330 SN'
              },
            ],
            count: 3,
          }
    ]

    return Promise.resolve({ results: mockResponse }).then(this.checkResponse);
  }

}

const apiInstance = new Api(process.env.API_URL || 'http://localhost', { 'content-type': 'application/json' });

export default apiInstance;