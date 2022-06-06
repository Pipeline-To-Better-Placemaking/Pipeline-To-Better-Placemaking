import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import MapPage from './MapPage';
import TabPanel from '../components/ProjectTabPanel';
import ActivityPage from './ActivityPage';
import SurveyorPage from './SurveyorPage';

function ProjectPage(){
    // Project section separated for handling project data
    // can be reached at (url)/u/project/:id 
    // Selected Project's data will be loaded here to pass into its relevant components 

    const drawers = {
        Activities: {
            stationaryCollections: {
                '3/1/22': {
                    '2:00': {
                        surveyor: 'Bob Minns',
                        data: [
                            {
                                point: {
                                    lat: 28.603643447056765,
                                    lng: -81.19916117597768
                                },
                                posture: 'laying'
                            },
                            {
                                point: {
                                    lat: 28.603991964597586,
                                    lng: -81.19940793919763
                                },
                                posture: 'sitting'
                            },
                            {
                                point: {
                                    lat: 28.60417328745557,
                                    lng: -81.19930065084112
                                },
                                posture: 'standing'
                            }
                        ]
                    }
                }
            },
            movingCollections: {},
            orderCollections: {
                '2/22/22': {
                    '18:00': {
                        surveyor: 'Anna Smith',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                result: 'none'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                result: 'Loose Bricks'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                result: 'Trash'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                result: 'none'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                result: 'Full Trash'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889514,
                                    lng: -81.20129371852886
                                },
                                result: 'none'
                            }
                        ]
                    }
                }
            },
            boundariesCollections: {
                '2/29/22': {
                    '16:00': {
                        surveyor: 'Sam Iam',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603369329889514,
                                    lng: -81.20129371852886
                                },
                                result: 'none'
                            },
                        ]
                    }
                }
            },
            lightingCollections: {
                '2/29/22': {
                    '12:00': {
                        surveyor: 'Nick Names',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603369329889514,
                                    lng: -81.20129371852886
                                },
                                result: 'none'
                            },
                        ]
                    }
                }
            },
            natureCollections: {
                '2/29/22': {
                    '12:00': {
                        surveyor: 'Jane Doe',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603369329889514,
                                    lng: -81.20129371852886
                                },
                                result: 'plants'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603868558748708,
                                    lng: -81.19963074866048
                                },
                                result: 'animals'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602512158058847,
                                    lng: -81.19971657935157
                                },
                                result: 'plants'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60181511200448,
                                    lng: -81.19970585051519
                                },
                                result: 'plants'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602578094603327,
                                    lng: -81.20119715877513
                                },
                                result: 'plants'
                            },
                            {
                                standingPoint: {
                                    lat: 28.599999473663722,
                                    lng: -81.20118911211877
                                },
                                result: 'plants'
                            }
                        ]
                    }
                }
            },
            soundCollections: {
                '2/29/22': {
                    '14:00': {
                        surveyor: 'Bob Minns',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: '70'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: '80'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: '33'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: '40'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: '68.8'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: '90'
                            }
                        ]
                    }
                },
                '4/1/22': {
                    '12:00': {
                        surveyor: 'Jane Doe',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: '40'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: '67'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: '44'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: '37'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: '70'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: '75'
                            }
                        ]
                    },
                    '14:00': {
                        surveyor: 'Sam Iam',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: '60'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: '72'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: '39'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: '40'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: '50'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: '40.5'
                            }
                        ]
                    }
                },
                '12/2/21': {
                    '12:00': {
                        surveyor: 'John Smith',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: '50'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: '60'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: '29'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: '35'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: '33.9'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: '50'
                            }
                        ]
                    },
                    '14:00': {
                        surveyor: 'John Smith',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: '70'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: '80'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: '33'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: '40'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: '68.8'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: '90'
                            }
                        ]
                    },
                    '17:00': {
                        surveyor: 'Annie Moore',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: '30'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: '60'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: '40'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: '20'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: '47.8'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: '60'
                            }
                        ]
                    }
                }
            }
        },
        Graphs: {
        },
        Data: {
        }
    }

    return (
        <div id='ProjectPage'>
            <TabPanel />
            <Routes>
                <Route index element={<MapPage drawers={drawers} />} />
                <Route path='map' element={<MapPage drawers={drawers} />} />
                <Route path='activities' element={<ActivityPage drawers={drawers.Activities} />} />
                <Route path='surveyors' element={<SurveyorPage drawers={drawers} />} />
            </Routes>
        </div>
    );
}

export default ProjectPage;