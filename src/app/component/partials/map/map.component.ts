 import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { icon, LatLng, latLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shread/models/order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']

})
export class MapComponent  implements OnInit {
  @Input()
  order!:Order
 private readonly MARKER_ZOOM_LEVEL =16;
 private readonly MARKER_ICON=icon({
  iconUrl:
  'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
 })
  private readonly DEFAULT_LATLNG:LatLngTuple=[13.75, 21.62]
@ViewChild('map',{static:true})
mapref!:ElementRef;

map!:Map;
currentMarker!:Marker;
constructor(private locatopnervice:LocationService){

}
  
  ngOnInit(): void {

    this.initilizeMap()
  }

  initilizeMap(){
    if(this.map) return;

    this.map=map(this.mapref.nativeElement,{
      attributionControl:false
    }).setView(this.DEFAULT_LATLNG,1)

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click',(e:LeafletMouseEvent)=>{
      this.setmarker(e.latlng)
    })
  }
  findMyLocation(){
   this.locatopnervice.getCurrentLocation().subscribe({
    next:(latLng)=>{
      this.map.setView(latLng,this.MARKER_ZOOM_LEVEL)
      // console.log(latLng);
      this.setmarker(latLng)
      
    }
   })
  }
setmarker(latLng:LatLngExpression){
  this.addressLatLng =latLng as LatLng;
  if(this.currentMarker){
    this.currentMarker.setLatLng(latLng);
    return;
  }
  this.currentMarker=marker(latLng,{
    draggable:true,
    icon:this.MARKER_ICON
  }).addTo(this.map);

  this.currentMarker.on('dragend',()=>{
    this.addressLatLng =this.currentMarker.getLatLng();
  })
}
      set addressLatLng(latLng:LatLng){
      latLng.lat =parseFloat(latLng.lat.toFixed(8));
      latLng.lat =parseFloat(latLng.lat.toFixed(8));
      this.order.addressLatLng=latLng;
      console.log(this.order.addressLatLng);
      
      }
}
