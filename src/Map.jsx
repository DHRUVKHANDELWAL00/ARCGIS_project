import React from 'react'
import { useRef,useEffect} from 'react'
import {loadModules} from 'esri-loader'
const Map = () => {
    const MapElement=useRef(null);
    useEffect(()=>{
        let view;
        loadModules(["esri/views/MapView","esri/WebMap", "esri/layers/GeoJSONLayer"],{
            css:true
        }).then(([MapView,WebMap,GeoJSONLayer])=>{
            const webmap=new WebMap({
                basemap:'topo-vector'
            })
            // const template={
            //     title:"Information",
            //     content:"Name of BC : {Name of BC}, Contact Number: {Contact Number}, Gender: {Gender}, Bank Name: {Bank Name}",
            // }
            const template = {
            // autocasts as new PopupTemplate()
            title: "Information",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "Name of BC",
                    label: "Name of BC",
                    format: {
                      places: 0,
                      digitSeparator: true
                    }
                  },
                  {
                    fieldName: "Contact Number",
                    label: "Contact Number",
                    
                  },
                  {
                    fieldName: "Gender",
                    label: "Gender",
                    format: {
                      places: 0,
                      digitSeparator: true
                    }
                  },
                  {
                    fieldName: "Bank Name",
                    label: "Bank Name",
                    format: {
                      places: 0,
                      digitSeparator: true
                    }
                  },
                  {
                    fieldName: "State",
                    label: "State",
                    format: {
                      places: 0,
                      digitSeparator: true
                    }
                  },
                  {
                    fieldName: "District",
                    label: "District",
                    format: {
                      places: 0,
                      digitSeparator: true
                    }
                  },
                  {
                    fieldName: "Pincode",
                    label: "Pincode",
                    
                  },
                  
                ]
              }
            ]
          };
            view=new MapView({
                map:webmap,
                center:[50,30],
                zoom:4,
                //yaha pe useref as conatiner hain
                container:MapElement.current
            })
        //     const featureLayer = new FeatureLayer({
        //     url: "https://raw.githubusercontent.com/DHRUVKHANDELWAL00/geojson/main/final_data_set.geojson",
        //     outFields: ["GENDER", "NAME OF BC"], // used by queryFeatures
        //     popupTemplate: template
        //   });
        //   webmap.add(featureLayer);

        //   let graphics;

        //   const layerView =view.whenLayerView(featureLayer);
        

          
            const colors = ["rgba(115, 0, 115, 0)", "#820082", "#910091", "#a000a0", "#af00af", "#c300c3", "#d700d7", "#eb00eb", "#ff00ff", "#ff58a0", "#ff896b", "#ffb935", "#ffea00"];

        const renderer = {
          type: "heatmap",
          colorStops: [
            { color: colors[0], ratio: 0 },
            { color: colors[1], ratio: 0.083 },
            { color: colors[2], ratio: 0.166 },
            { color: colors[3], ratio: 0.249 },
            { color: colors[4], ratio: 0.332 },
            { color: colors[5], ratio: 0.415 },
            { color: colors[6], ratio: 0.498 },
            { color: colors[7], ratio: 0.581 },
            { color: colors[8], ratio: 0.664 },
            { color: colors[9], ratio: 0.747 },
            { color: colors[10], ratio: 0.83 },
            { color: colors[11], ratio: 0.913 },
            { color: colors[12], ratio: 1 }
          ],
          radius: 18,
          maxDensity: 0.04625,
          minDensity: 0
        };
            const geojsonLayer = new GeoJSONLayer({
                url: "https://raw.githubusercontent.com/DHRUVKHANDELWAL00/geojson/main/final_data_set.geojson",
                renderer: renderer,
                popupTemplate:template,
        orderBy: {
          field: "CROP PRODUCTION"
        }
            });
            webmap.add(geojsonLayer)
            
       
        })
        
        
        return()=>{
            //close karega map view jab kuch bhi use nhi karenge taaki memory leak na ho
            if(!!view){
                view.destroy()
                view=null
            }
        }
    })
  return (
<div style={{ height: '100vh' }} ref={MapElement}></div>
  )
}

export default Map
