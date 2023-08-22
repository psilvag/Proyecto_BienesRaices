
(
    function() {
    
    const lat = -16.5230037;
    const lng = -68.1415526;
    const mapa = L.map('mapa').setView([lat, lng ], 15); // el numero 15 es el zoom del mapa
    let marker

    // utilizamos lealeft y geocoder que ya instalamos
    const geocodeService=L.esri.Geocoding.geocodeService()

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    
    // creamos el pin de ubicacion
    marker= new L.marker([lat,lng],{
        draggable:true, // permite mover el pin 
        autoPan:true    // sigue el mapa
    }).addTo(mapa)

    // 
    marker.on('moveend',e=>{
        marker=e.target
        const posicion =marker.getLatLng()// devuelve la posicion del PIN
        console.log(posicion);
        mapa.panTo(new L.LatLng(posicion.lat,posicion.lng)) // centra el mapa 

    // Obtener la info de las calles al soltar el PIN
      geocodeService.reverse().latlng(posicion,15).run((err,res)=>{
           if(err){console.log(err)} 
           marker.bindPopup(res.address.LongLabel)
      })

    })
}
) ()  // es una funcion que se invoca a si misma, se caracteriza por el scope de sus variables solo estan para la funcion