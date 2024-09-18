const importList = [
    {
      id: 1,
      fullname: "USB флеш-накопитель TECHKEY, водонепроницаемый флеш-накопитель 64 ГБ 32 ГБ 16 ГБ 8 ГБ 4 ГБ, серебристая флешка, U-диск,",
      serial_number: "000156",
      status_doc: "К списанию",
      current_responsible: "Синяков Алексей Викторович",
      according_data: "23.05.2020",
      balans_price: "17500.60"
    },
    {
      id: 2,
      fullname: "Ноутбук ASUS ZenBook 14, Intel Core i7, 16 ГБ ОЗУ, 512 ГБ SSD",
      serial_number: "001245",
      status_doc: "Используется",
      current_responsible: "Иванова Ольга Сергеевна",
      according_data: "12.08.2021",
      balans_price: "85000.00"
    },
    {
      id: 3,
      fullname: "Монитор Samsung 24 дюйма, Full HD",
      serial_number: "002365",
      status_doc: "Используется",
      current_responsible: "Петров Иван Дмитриевич",
      according_data: "05.11.2019",
      balans_price: "18000.00"
    },
    {
      id: 4,
      fullname: "Клавиатура Logitech K120, USB",
      serial_number: "003478",
      status_doc: "Используется",
      current_responsible: "Смирнова Мария Алексеевна",
      according_data: "20.03.2022",
      balans_price: "1200.00"
    },
    {
      id: 5,
      fullname: "Мышь Logitech M185, беспроводная",
      serial_number: "004587",
      status_doc: "Используется",
      current_responsible: "Федоров Алексей Николаевич",
      according_data: "15.01.2020",
      balans_price: "950.00"
    },
    {
      id: 6,
      fullname: "Принтер HP LaserJet Pro MFP M428fdw",
      serial_number: "005698",
      status_doc: "Используется",
      current_responsible: "Кузнецова Наталья Петровна",
      according_data: "02.06.2018",
      balans_price: "23500.00"
    },
    {
      id: 7,
      fullname: "Смартфон Apple iPhone 12, 128 ГБ",
      serial_number: "006789",
      status_doc: "Используется",
      current_responsible: "Николаев Сергей Владимирович",
      according_data: "22.11.2020",
      balans_price: "75000.00"
    },
    {
      id: 8,
      fullname: "Планшет Samsung Galaxy Tab S7, 256 ГБ",
      serial_number: "007891",
      status_doc: "Используется",
      current_responsible: "Лебедева Анна Дмитриевна",
      according_data: "10.10.2021",
      balans_price: "55000.00"
    },
    {
      id: 9,
      fullname: "Док-станция Dell D6000",
      serial_number: "008912",
      status_doc: "Используется",
      current_responsible: "Васильев Павел Игоревич",
      according_data: "05.07.2019",
      balans_price: "12000.00"
    },
    {
      id: 10,
      fullname: "Наушники Sony WH-1000XM4, беспроводные",
      serial_number: "009023",
      status_doc: "Используется",
      current_responsible: "Григорьева Екатерина Андреевна",
      according_data: "30.09.2020",
      balans_price: "20000.00"
    },
    {
      id: 11,
      fullname: "Системный блок Dell OptiPlex 3080",
      serial_number: "010134",
      status_doc: "Используется",
      current_responsible: "Морозов Дмитрий Олегович",
      according_data: "17.04.2018",
      balans_price: "45000.00"
    },
    {
      id: 12,
      fullname: "Проектор Epson EB-X41",
      serial_number: "011245",
      status_doc: "Используется",
      current_responsible: "Соколова Алина Викторовна",
      according_data: "08.12.2019",
      balans_price: "32000.00"
    },
    {
      id: 13,
      fullname: "Сканер Canon CanoScan LiDE 400",
      serial_number: "012356",
      status_doc: "Используется",
      current_responsible: "Романов Алексей Петрович",
      according_data: "28.02.2021",
      balans_price: "7000.00"
    },
    {
      id: 14,
      fullname: "Внешний жесткий диск Seagate 2 ТБ",
      serial_number: "013467",
      status_doc: "Используется",
      current_responsible: "Тихонов Михаил Сергеевич",
      according_data: "14.06.2022",
      balans_price: "8000.00"
    },
    {
      id: 15,
      fullname: "Кофеварка Philips HD7769",
      serial_number: "014578",
      status_doc: "Используется",
      current_responsible: "Фролова Ольга Владимировна",
      according_data: "03.03.2019",
      balans_price: "12000.00"
    },
    {
      id: 16,
      fullname: "Маршрутизатор TP-Link Archer C7",
      serial_number: "015689",
      status_doc: "Используется",
      current_responsible: "Денисов Павел Андреевич",
      according_data: "21.08.2018",
      balans_price: "5000.00"
    },
    {
      id: 17,
      fullname: "Увлажнитель воздуха Xiaomi Mi Air Humidifier",
      serial_number: "016790",
      status_doc: "Используется",
      current_responsible: "Юрьев Игорь Николаевич",
      according_data: "12.12.2020",
      balans_price: "3500.00"
    },
    {
      id: 18,
      fullname: "МФУ Canon PIXMA G3411",
      serial_number: "017891",
      status_doc: "Используется",
      current_responsible: "Павлова Марина Сергеевна",
      according_data: "25.04.2021",
      balans_price: "18000.00"
    },
    {
      id: 19,
      fullname: "Телевизор Samsung 50 дюймов, 4K",
      serial_number: "018902",
      status_doc: "Используется",
      current_responsible: "Зайцев Виктор Александрович",
      according_data: "19.11.2019",
      balans_price: "65000.00"
    },
    {
      id: 20,
      fullname: "Факс Panasonic KX-FP701RU",
      serial_number: "019013",
      status_doc: "Используется",
      current_responsible: "Киселева Юлия Владимировна",
      according_data: "01.03.2017",
      balans_price: "9000.00"
    }
  ] 

  export default importList
  