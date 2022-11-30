require(["esri/Map", "esri/layers/GeoJSONLayer", "esri/views/MapView"], (
    Map,
    GeoJSONLayer,
    MapView
  ) => {
    // If GeoJSON files are not on the same domain as your website, a CORS enabled server
    // or a proxy is required.
    const url = "https://melonpult0.github.io/17514-HW6-TestData/clustering.geojson";

    // Paste the url into a browser's address bar to download and view the attributes
    // in the GeoJSON file. These attributes include:
    // * mag - magnitude
    // * type - earthquake or other event such as nuclear test
    // * place - location of the event
    // * time - the time of the event
    // Use the Arcade Date() function to format time field into a human-readable format

    const template = {
      title: "Temperature clustering",
      content: "Temperature {average_temperature} on {time}",
      fieldInfos: [
        {
          fieldName: 'time',
          format: {
            dateFormat: 'short-date-short-time'
          }
        }
      ]
    };

    const renderer = {
      type: "simple",
      symbol: {
        type: "simple-marker",
        style: "circle",
        color: [250, 250, 250],
        outline: {
          color: [255, 255, 255, 0.5],
          width: 0.5
        },
        size: "12px"
      },

      visualVariables: [
        {
          type: "color",
          field: "average_temperature",
          stops: [
            { value: 20, color: "#2b83ba" },
            { value: 35, color: "#abdda4" },
            { value: 50, color: "#ffffbf" },
            { value: 65, color: "#fdae61" },
            { value: 80, color: "#d7191c" }
          ]
        }
      ]

    };

    const geojsonLayer = new GeoJSONLayer({
      url: url,
      popupTemplate: template,
      renderer: renderer,
      orderBy: {
        field: "average_temperature"
      }
    });

    const map = new Map({
      basemap: "gray-vector",
      // basemap: "Imagery",
      layers: [geojsonLayer]
    });

    const view = new MapView({
      container: "viewDiv",
      center: [-168, 46],
      zoom: 2,
      map: map
    });
  });
