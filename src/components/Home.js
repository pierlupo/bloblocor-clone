// import useContext, useRef, useEffect, useCallback
import { useContext, useRef, useEffect, useCallback } from 'react';
// import custom components.
import Header from './Header';
import AddressPicker from './AddressPicker';
import RideList from './RideList';
import RideDetail from './RideDetail';
// import Context
import Context from '../Context';
// import leaflet
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

require("leaflet-routing-machine");

const style = {
  width: "100vw",
  height: "100vh"
};

function Home() {

  const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);

  const map = useRef();

  const routeControl = useRef();

  useEffect(() => {
    initMap();
    initRouteControl();
  }, []);

  const drawRoute = useCallback((from, to) => {
    if (shouldRouteDrawed(from, to) && routeControl && routeControl.current) {
      const fromLatLng = new L.LatLng(from.y, from.x);
      const toLatLng = new L.LatLng(to.y, to.x);
      routeControl.current.setWaypoints([fromLatLng, toLatLng]);
    }
  }, []);

  useEffect(() => {
    if (shouldRouteDrawed(selectedFrom, selectedTo)) {
      drawRoute(selectedFrom, selectedTo);
    }
  }, [selectedFrom, selectedTo, drawRoute]);

  /**
   * check a route should be drawed, or not.
   * @param {*} selectedFrom 
   * @param {*} selectedTo 
   */
  const shouldRouteDrawed = (selectedFrom, selectedTo) => {
    return selectedFrom && selectedTo && selectedFrom.label &&
    selectedTo.label && selectedFrom.x && selectedTo.x &&
    selectedFrom.y && selectedTo.y;   
  };

  /**
   * init leaflet map.
   */
  const initMap = () => {

    let container = L.DomUtil.get("map");

    if (container != null) {
    container._leaflet_id = null;
    }

    // map.current = L.map("map",
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }));

    //map.setOptions({ minZoom: 5, maxZoom: 15 });
    
    map.current = L.map("map", {
      
      center: [50.6056026,3.1564854,13],
      zoom: 13,
      // minZoom: 5, 
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          minZoom: 5,
          // noWrap: true,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
       )
      ]
    });
  };
  
  /**
   * init route control.
   */
  const initRouteControl = () => {
    routeControl.current = L.Routing.control({
      show: true,
      fitSelectedRoutes: true,
      plan: false,
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: "0.7",
            weight: 6
          }
        ]
      },
      router: L.Routing.mapbox("pk.eyJ1IjoicGllcmx1cG8iLCJhIjoiY2xtN282b3k1MDJvdjNqbzU0dTlncGE5MCJ9.IHJp1MGDLsHAB94wKBiXBw")
    })
      .addTo(map.current)
      .getPlan();  
  };

  const renderSidebar = () => {
    const isUser = user && user.role === 'user';
    if (isUser && !currentRide) {
      return <AddressPicker />
    } 
    if (isUser && currentRide) {
      return <RideDetail user={currentRide.driver} isDriver={false} currentRide={currentRide} />
    }
    if (!isUser && !currentRide) {
      return <RideList />
    }
    if (!isUser && currentRide) {
      return <RideDetail user={currentRide.requestor} isDriver={true} currentRide={currentRide} />
    }
  }

  return (
    <>
      <Header />
      <div id="map" style={style} />
      {renderSidebar()}
    </>
  );
}

export default Home;