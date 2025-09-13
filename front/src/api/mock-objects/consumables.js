const consumables = [
    {
        id: 1,
        image: 'URL_photo3',
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

export default consumables