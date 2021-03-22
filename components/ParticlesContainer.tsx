import React from 'react';
import Particles from 'react-particles-js';


export default function ParticlesContainer() {
    return ( 
        <Particles
            height="100vh"
            params={{
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "value_area": 1803.4120608655228
                        }
                    },
                    "color": {
                        "value": "#FCD34D"
                    },
                    "shape": {
                        "type": "triangle",
                        "stroke": {
                            "width": 2,
                            "color": "#FCD34D"
                        },
                    },
                    "opacity": {
                        "value": 0.25,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 10,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 0,
                        "color": "#ffffff",
                        "opacity": 0.3687847739990702,
                        "width": 0.6413648243462091
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {},
                "retina_detect": true
            }} />
    )

}