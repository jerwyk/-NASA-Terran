import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const API_KEY = "AIzaSyC6PUOxo26piQBw2RGg6uLjEtVQY4XzN9Y";

const dataTest = {
    pos: [
        {
            lng: 176.7529046,
            lat: -38.02476884
        },
    ]
};

export default class Heatmap extends Component {

    static defaultProps = {
        center: {
          lat: -33.95605127,
          lng: 151.0278964
        },
        zoom: 11,
        data: null
    };

    render() {
        console.log(this.props.data.position);
        return (
            <GoogleMapReact 
            bootstrapURLKeys={{
                key: [API_KEY],
                libraries:['visualization']
                }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            heatmapLibrary={true}  
            heatmap={{positions:this.props.data}}>
            </GoogleMapReact>
        )
    }
}
