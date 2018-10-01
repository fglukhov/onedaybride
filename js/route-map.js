var pointsArray =

  {
    "points": [
      {
        "id":"1",
        "name": "Ярославово дворище",
        "coords": [58.518787, 31.284665]
      },
      {
        "id":"2",
        "name": "Никольский собор на ярославовом дворище",
        "coords": [58.517737, 31.285136]
      },
      {
        "id":"3",
        "name": "Воротная башня гостиного двора",
        "coords": [58.517464, 31.284378]
      },
      {
        "id":"4",
        "name": "Георгиевская церковь",
        "coords": [58.519305, 31.286492]
      },
      {
        "id":"5",
        "name": "Церковь иоанна предтечи",
        "coords": [58.519732, 31.285816]
      },
    ]
  };

document.addEventListener("DOMContentLoaded", function (event) {
  ymaps.ready(function () {

    // Создаем карту с добавленными на нее кнопками.
    var myMap = new ymaps.Map('routeMap', {
      center: [55.750625, 37.626],
      zoom: 17
    }, {
      buttonMaxWidth: 300
    });

    var routePoints = new Array();

    for (i = 0; i < pointsArray.points.length; i++) {

      pointPlacemark = new ymaps.Placemark(pointsArray.points[i].coords, {
        balloonContent: pointsArray.points[i].name
      }, {

      },{

      });

      routePoints.push(pointPlacemark);

    }


    var myRoute = new ymaps.multiRouter.MultiRoute({
      // Описание опорных точек мультимаршрута.
      referencePoints: routePoints,
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
    myMap.geoObjects.add(myRoute);

    myRoute.events.add("update",function () {
      var wayPoints = myRoute.getWayPoints();

      wayPoints.options.set({

        iconLayout: "default#imageWithContent",
        iconImageHref: "images/route-pin.png",
        iconImageSize: [43, 60],
        iconImageOffset: [-21, -60]
      });

      // wayPoints.get(0).properties.set({
      //   iconContent: "1"
      // });

      //console.log(wayPoints.get(0).properties.get("iconContent"))

      for (i = 0; i < wayPoints.getLength(); i++) {

        wayPoints.get(i).options.set({
          iconContentLayout: ymaps.templateLayoutFactory.createClass(
            '<div class="route-icon-content">' + parseInt(i + 1) +'</div>'
          ),
        })

      }

    });









  });
});