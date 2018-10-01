document.addEventListener("DOMContentLoaded", function (event) {
  ymaps.ready(function () {

    var myMap = new ymaps.Map('officesMap', {
        center: [58.518787, 31.284665],
        zoom: 16
      }, {}),

      myPlacemark1 = new ymaps.Placemark([58.518787, 31.284665], {
        hintContent: '',
        balloonContent: ''
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/map-pin.png',
        // Размеры метки.
        iconImageSize: [43, 60],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-21, -60]
      }),
      myPlacemark2 = new ymaps.Placemark([58.517737, 31.285136], {
        hintContent: '',
        balloonContent: ''
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/map-pin.png',
        // Размеры метки.
        iconImageSize: [43, 60],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-21, -60]
      }),
      myPlacemark3 = new ymaps.Placemark([58.517464, 31.284378], {
        hintContent: '',
        balloonContent: ''
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/map-pin.png',
        // Размеры метки.
        iconImageSize: [43, 60],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-21, -60]
      }),
      myPlacemark4 = new ymaps.Placemark([58.519305, 31.286492], {
        hintContent: '',
        balloonContent: ''
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/map-pin.png',
        // Размеры метки.
        iconImageSize: [43, 60],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-21, -60]
      }),
      myPlacemark5 = new ymaps.Placemark([58.519732, 31.285816], {
        hintContent: '',
        balloonContent: ''
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/map-pin.png',
        // Размеры метки.
        iconImageSize: [43, 60],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-21, -60]
      });

    myMap.geoObjects
      .add(myPlacemark1)
      .add(myPlacemark2)
      .add(myPlacemark3)
      .add(myPlacemark4)
      .add(myPlacemark5);

  });
});
                      