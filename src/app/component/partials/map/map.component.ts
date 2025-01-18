import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { icon, latLng, LatLngTuple, map, Map, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']

})
export class MapComponent  implements OnInit {
private readonly MARKER_ZOOM_LEVEL=16;

private readonly MARKER_ICON=icon({
  iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
})


  private readonly DEFAULT_LATLNG:LatLngTuple  =[13.75,21.62]
  
  @ViewChild('map',{static:true})
  mapRef!:ElementRef;

  map!:Map;
  // currentMarker!Marker
  constructor(private locationService:LocationService ){}

  ngOnInit(): void {
    this.initilizeMap()
  }
  initilizeMap(){
    if(this.map) return;

    this.map= map(this.mapRef.nativeElement,{
      attributionControl:false

    }).setView(this.DEFAULT_LATLNG,1)

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  }
   
  findMyLocation(){
     this.locationService.getCurrentLocation().subscribe({
      next:(latLng) =>{
        console.log(latLng);
        
      }
     })
  }

}
