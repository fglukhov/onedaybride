document.addEventListener("DOMContentLoaded", function (event) {
  ymaps.ready(function () {

    // Создаем карту с добавленными на нее кнопками.
    var myMap = new ymaps.Map('routeMap', {
      center: [55.750625, 37.626],
      zoom: 17
    }, {
      buttonMaxWidth: 300
    });

    var multiRoute = new ymaps.multiRouter.MultiRoute({
      // Описание опорных точек мультимаршрута.
      referencePoints: [
        [58.518787, 31.284665],
        [58.517737, 31.285136],
        [58.517464, 31.284378],
        [58.519305, 31.286492],
        [58.519732, 31.285816]
      ],
      // Параметры маршрутизации.
      params: {
        // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
        //results: 1,
        routingMode: 'pedestrian'
      }
    }, {
      // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
      boundsAutoApply: true
    });

    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);

    var wayPoints = multiRoute.getWayPoints();

    wayPoints.options.set({
      iconLayout: "default#imageWithContent",
      iconImageHref: "images/route-pin.png",
      iconImageSize: [43, 60],
      iconImageOffset: [-21, -60]
    });



  });
});
                      