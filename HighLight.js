var map, searchManager;

function GetMap1() {
    map = new Microsoft.Maps.Map('#highlightMap', {
        credentials: "ArFLUOUeMeUPD1ulz1rsGKvWAGuFMZwfl_rV76KumMXyPuY4thtuKrUYFI1F43f2"
    });
    map = map;

    //Load the Bing Spatial Data Services and Search modules, then create an instance of the search manager.
    Microsoft.Maps.loadModule(['Microsoft.Maps.SpatialDataService',
        'Microsoft.Maps.Search'], function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
        });
}

function HighLight() {
    //Remove all data from the map.
    map.entities.clear();

    //Create the geocode request.
    var geocodeRequest = {
        where: document.getElementById('highlightTbx').value,
        callback: getBoundary,
        errorCallback: function (e) {
            //If there is an error, alert the user about it.
            alert("No results found.");
        }
    };

    //Make the geocode request.
    searchManager.geocode(geocodeRequest);
}

function getBoundary(geocodeResult){
    //Add the first result to the map and zoom into it.
    if (geocodeResult && geocodeResult.results && geocodeResult.results.length > 0) {
        //Zoom into the location.
        map.setView({ bounds: geocodeResult.results[0].bestView });

        //Create the request options for the GeoData API.
        var geoDataRequestOptions = {
            lod: 1,
            getAllPolygons: true
        };

        //Verify that the geocoded location has a supported entity type.
        switch (geocodeResult.results[0].entityType) {
            case "CountryRegion":
            case "AdminDivision1":
            case "AdminDivision2":
            case "Postcode1":
            case "Postcode2":
            case "Postcode3":
            case "Postcode4":
            case "Neighborhood":
            case "PopulatedPlace":
                geoDataRequestOptions.entityType = geocodeResult.results[0].entityType;
                break;
            default:
                //Display a pushpin if GeoData API does not support EntityType.
                var pin = new Microsoft.Maps.Pushpin(geocodeResult.results[0].location);
                map.entities.push(pin);
                return;
        }

        //Use the GeoData API manager to get the boundaries of the zip codes.
        Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(
            geocodeResult.results[0].location,
            geoDataRequestOptions,
            map,
            function (data) {
                //Add the polygons to the map.
                if (data.results && data.results.length > 0) {
                    map.entities.push(data.results[0].Polygons);
                } else {
                    //Display a pushpin if a boundary isn't found.
                    var pin = new Microsoft.Maps.Pushpin(data.location);
                    map.entities.push(pin);
                }
            });
    }
}
