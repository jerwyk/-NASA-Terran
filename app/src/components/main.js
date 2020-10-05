import React, { Component } from 'react'
import Heatmap from "./heatMap"
import Popper from '@material-ui/core/Popper'
import {Box, Button, Paper} from '@material-ui/core'
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import * as data from "../data.json"

const API_KEY = "AIzaSyC6PUOxo26piQBw2RGg6uLjEtVQY4XzN9Y";

export default class Main extends Component {
    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(p => {
                this.location = {
                    lng: p.coords.longitude,
                    lat: p.coords.latitude
                };
                this.setState({mapReady: true});
            })
        }
    }
    
    handleClick = (event) => {
        this.setState({anchorEl: this.state.anchorEl ? null : event.currentTarget});
    };

    location = {};

    state = {mapReady:false, anchorEl: null};

    render() {
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popper' : undefined;

        if(this.state.mapReady) {
            return (
                <div>
                    
                    <div style={{ display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <div style={{ height: '80vh', width: '75%', marginTop:'10vh'}}>
                            <Heatmap data={data.position} />
                        </div>
                    </div>
                    <Button style={{position:'absolute', top:'10vh', left:'12.5%', fontSize:'25px'}} onClick={this.handleClick}>
                        Administrative Unit Center Point
                    </Button>
                    <Popper id={id} open={open} anchorEl={this.state.anchorEl} placement="bottom-start" transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={600}>
                            <Paper elevation={4} style={{width:'450px', margin:'4px', padding:'8px'}}>
                                <div>
                                    <p>
                                        The map is used to observe the population density globally. Each administrative unit will be count as one point. When there are more points in a certain area, the color observed on that specific area will be darker, and hence demonstrates the high population density in that area. Conversely, if the color in an area is lighter compared to the other parts, it means that the number of administrative units in that area is less than others. It can also be used to represent the population density and technical development in a specific country.
                                    </p>
                                </div>
                            </Paper>
                        </Fade>
                    )}
                    </Popper>
                </div>
            );
        } else {
            return null; 
        }
    }
}
