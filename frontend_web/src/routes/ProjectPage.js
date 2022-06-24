import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import MapPage from './MapPage';
import TabPanel from '../components/ProjectTabPanel';
import ActivityPage from './ActivityPage';
import SurveyorPage from './SurveyorPage';
import NewActivityTimes from './NewActivityTimes';

function ProjectPage(){
    // Project section separated for handling project data
    // can be reached at (heroku-url)/home/teams/:id/project/:id 
    // Selected Project's data will be loaded here to pass into its relevant components 

    const drawers = {
        Activities: {
            stationary_collections: {
                '3/1/22': {
                    '2:00': {
                        researcher: 'Bob Minns',
                        data: [
                            {
                                point: {
                                    lat: 28.603643447056765,
                                    lng: -81.19916117597768
                                },
                                posture: 'Laying',
                                age: '22-30',
                                gender: 'Male',
                                activity: ['Solitary', 'Waiting']
                            },
                            {
                                point: {
                                    lat: 28.603991964597586,
                                    lng: -81.19940793919763
                                },
                                posture: 'Sitting',
                                age: '30-50',
                                gender: 'Female',
                                activity: ['Socializing', 'Eating']
                            },
                            {
                                point: {
                                    lat: 28.60417328745557,
                                    lng: -81.19930065084112
                                },
                                posture: 'Standing',
                                age: '30-50',
                                gender: 'Male',
                                activity: 'Socializing'
                            }
                        ]
                    }
                }
            },
            moving_collections: {
                '3/2/22': {
                    '2:00': {
                        researcher: 'Bob Minns',
                        data: [
                            {
                                mode: 'Walking',
                                path: [
                                    {
                                        lat: 28.60362836407018, 
                                        lng: -81.19919623114687
                                    },
                                    { 
                                        lat: 28.6036848805148, 
                                        lng: -81.19915331580425
                                    },
                                    {
                                        lat: 28.603783784219722, 
                                        lng:- 81.19921768881817
                                    }

                                ]
                            },
                            {
                                mode: 'Running',
                                path: [
                                    {
                                        lat: 28.60394862352107, 
                                        lng: -81.19951273179854
                                    },
                                    {
                                        lat: 28.60407578509113, 
                                        lng: -81.19949663854507
                                    },
                                    {
                                        lat: 28.604240623934345, 
                                        lng:-81.19939471460638
                                    }

                                ]
                            },
                            {
                                mode: 'Handicap Assisted Wheels',
                                path: [
                                    {
                                        lat: 28.60335637825532, 
                                        lng:-81.1993517992638
                                    },
                                    {
                                        lat: 28.60338699141251, 
                                        lng:-81.19940142012868
                                    },
                                    {
                                        lat: 28.603442330558636, 
                                        lng:-81.19949395633616
                                    },
                                    {
                                        lat: 28.603469411406763, 
                                        lng:-81.19955028272332
                                    }

                                ]
                            }
                        ]
                    }
                }

            },
            order_collections: {
                '2/22/22': {
                    '18:00': {
                        researcher: 'Anna Smith',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                result: 'built',
                                type: 'Loose Bricks'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                result: 'built',
                                type: 'Loose Bricks'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                result: 'human',
                                type: 'Trash'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                result: 'human',
                                type: 'none'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                result: 'human',
                                type: 'Full Trash'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889514,
                                    lng: -81.20129371852886
                                },
                                result: 'built',
                                type: 'Structure Damage'
                            }
                        ]
                    }
                }
            },
            boundaries_collections: {
                '2/29/22': {
                    '16:00': {
                        researcher: 'Sam Iam',
                        data: [
                            {
                                path: [
                                    {
                                        lat: 28.60291560437277, 
                                        lng: -81.20098575289026
                                    },
                                    {
                                        lat: 28.602907362332807, 
                                        lng: -81.20094619030888
                                    }, 
                                    {
                                        lat: 28.602830829073785, 
                                        lng: -81.20096563632346
                                    },
                                    {
                                        lat: 28.602837893684644, 
                                        lng: -81.20100385780037
                                    }
                                ],
                                kind: 'Material',
                                description: 'bricks',
                                value: 80
                            },
                            {
                                path: [
                                    {
                                        lat: 28.602674408332604, 
                                        lng: -81.2008203704324
                                    },
                                    {
                                        lat: 28.602775562223734, 
                                        lng: -81.20056833834718
                                    },
                                    {
                                        lat: 28.6025163551828, 
                                        lng: -81.20042071955443
                                    },
                                    {
                                        lat: 28.602377268214305, 
                                        lng: -81.20079876768224
                                    }
                                ],
                                kind: 'Shelter',
                                description: 'constructed',
                                value: 300
                            },
                            {
                                path:[
                                    {
                                        lat: 28.602559620802463, 
                                        lng: -81.20132648151288
                                    },
                                    {
                                        lat: 28.60227126142984, 
                                        lng: -81.20074444139789
                                    }
                                ],
                                kind: 'Constructed',
                                description: 'building wall',
                                value: 200
                            },
                            {
                                path:[
                                    {
                                        lat: 28.603032029455452, 
                                        lng:-81.2001763275537
                                    },
                                    {
                                        lat: 28.60312103727488, 
                                        lng: -81.19993530957748
                                    },
                                    {
                                        lat: 28.602761646749155, 
                                        lng: -81.20003669015477
                                    }
                                ],
                                kind: 'Shelter',
                                description: 'canopy',
                                value: 276
                            }
                        ]
                    },
                    '18:00':{
                        researcher: 'Billy Bob',
                        data: [
                            {
                                path: [
                                    {
                                        lat: 28.602212394739325, 
                                        lng: -81.1999053211601
                                    },
                                    {
                                        lat: 28.60225825467047, 
                                        lng: -81.19961280856944
                                    },
                                    {
                                        lat: 28.60203124781571, 
                                        lng:- 81.19971727735182
                                    }
                                ],
                                kind: 'Shelter',
                                description: 'canopy',
                                value: 350
                            },
                            {
                                path: [
                                    {
                                        lat: 28.60225366867824, 
                                        lng: -81.20014298764002
                                    },
                                    {
                                        lat: 28.602065642825217, 
                                        lng: -81.19978518206037
                                    }
                                ],
                                kind: 'Constructed',
                                description: 'building wall',
                                value: 100
                            }
                        ]
                    }
                }
            },
            lighting_collections: {
                '2/29/22': {
                    '12:00': {
                        researcher: 'Nick Names',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603369329889514,
                                    lng: -81.20129371852886
                                },
                                result: 'Rhythmatic'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60162517274116, 
                                    lng:-81.20074305288507
                                },
                                result: 'Building'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601574899251066, 
                                    lng: -81.20058558490983
                                },
                                result: 'Building'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601684872479424, 
                                    lng: -81.2010866193765
                                },
                                result: 'Building'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60143350493119, 
                                    lng: -81.2008217868727
                                },
                                result: 'Task'
                            }
                        ]
                    }
                }
            },
            nature_collections: {
                '2/29/22': {
                    '12:00': {
                        researcher: 'Jane Doe',
                        data: [
                            {
                                point: {
                                    lat: 28.603369329889514,
                                    lng: -81.20129371852886
                                },
                                result: 'plants'
                            },
                            {
                                point: {
                                    lat: 28.603868558748708,
                                    lng: -81.19963074866048
                                },
                                result: 'animals'
                            },
                            {
                                point: {
                                    lat: 28.602512158058847,
                                    lng: -81.19971657935157
                                },
                                result: 'plants'
                            },
                            {
                                point: {
                                    lat: 28.60181511200448,
                                    lng: -81.19970585051519
                                },
                                result: 'plants'
                            },
                            {
                                point: {
                                    lat: 28.602578094603327,
                                    lng: -81.20119715877513
                                },
                                result: 'plants'
                            },
                            {
                                point: {
                                    lat: 28.599999473663722,
                                    lng: -81.20118911211877
                                },
                                result: 'plants'
                            },
                            {
                                path: [
                                    {
                                        lat: 28.603006681174694,
                                        lng: -81.20089406924859
                                    },
                                    {
                                        lat: 28.603216264077535,
                                        lng: -81.2005319710454
                                    },
                                    {
                                        lat: 28.603263361301526,
                                        lng: -81.20017255505111
                                    },
                                    {
                                        lat: 28.603230393246935,
                                        lng: -81.19990969857767
                                    },
                                    {
                                        lat: 28.603112650110408,
                                        lng: -81.2000867243659
                                    },
                                    {
                                        lat: 28.60299726170858,
                                        lng: -81.20042200047997
                                    },
                                    {
                                        lat: 28.6029407448941,
                                        lng: -81.20043809373345
                                    },
                                    {
                                        lat: 28.60296900330514,
                                        lng: -81.2006178017306
                                    },
                                    {
                                        lat: 28.60290071213211,
                                        lng: -81.20068753916232
                                    },
                                    {
                                        lat: 28.602994906841896,
                                        lng: -81.20091016250205
                                    }
                                ],
                                result: 'Water',
                                value: 400
                            }
                        ]
                    }
                }
            },
            sound_collections: {
                '2/29/22': {
                    '14:00': {
                        researcher: 'Bob Minns',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: 70,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: 80,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: 33,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: 40,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: 68.8,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: 90,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            }
                        ]
                    }
                },
                '4/1/22': {
                    '12:00': {
                        researcher: 'Jane Doe',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: 40,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: 67,
                                sound_type: ['animals', 'wind', 'music (entertainment)'],
                                source: 'music (entertainment)'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: 44,
                                sound_type: ['water feature', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: 37,
                                sound_type: ['water feature', 'wind', 'people sounds'],
                                source: 'water feature'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: 70,
                                sound_type: ['music (entertainment)', 'traffic', 'people sounds'],
                                source: 'music (entertainment)'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: 75,
                                sound_type: ['animals', 'traffic', 'people sounds', 'music (entertainment)'],
                                source: 'people sounds'
                            }
                        ]
                    },
                    '14:00': {
                        researcher: 'Sam Iam',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: 60,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: 72,
                                sound_type: ['traffic', 'music (entertainment)', 'people sounds'],
                                source: 'music (entertainment)'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: 39,
                                sound_type: ['water feature', 'wind', 'people sounds'],
                                source: 'water feature'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: 40,
                                sound_type: ['wind', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: 50,
                                sound_type: ['traffic', 'people sounds'],
                                source: 'traffic'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: 40.5,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            }
                        ]
                    }
                },
                '12/2/21': {
                    '12:00': {
                        researcher: 'John Smith',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: 50, 
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: 60, 
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: 29, 
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: 35, 
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: 33.9,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: 50,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            }
                        ]
                    },
                    '14:00': {
                        researcher: 'John Smith',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: 70, 
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: 80,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: 33,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: 40, 
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: 68.8,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: 90,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            }
                        ]
                    },
                    '17:00': {
                        researcher: 'Annie Moore',
                        data: [
                            {
                                standingPoint: {
                                    lat: 28.603797368242464,
                                    lng: -81.19945207347551
                                },
                                average: 30,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.60161204591758,
                                    lng: -81.20087900870764
                                },
                                average: 60,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.601207002735954,
                                    lng: -81.19759598512186
                                },
                                average: 40,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.59915350397974,
                                    lng: -81.20035329578052
                                },
                                average: 20,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.603369329889580,
                                    lng: -81.20129371852886
                                },
                                average: 47.8,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
                            },
                            {
                                standingPoint: {
                                    lat: 28.602728806480098,
                                    lng: -81.19716311630009
                                },
                                average: 60,
                                sound_type: ['water feature', 'traffic', 'people sounds'],
                                source: 'people sounds'
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

    //load project area and location data here as well and pass to Map Page

    //loc state recieved from (project type) Display Cards on TeamHome(listing team projects)
    const loc = useLocation();
    //loc.state will be used for maintaining project title across the project sub-pages(map, activities, and researchers)

    return (
        <div id='ProjectPage'>
            <TabPanel state={loc.state}/>
            <Routes>
                <Route index element={<MapPage title={ loc.state } drawers={ drawers } />} />
                <Route path='map' element={<MapPage title={ loc.state } drawers={ drawers } />} />
                <Route path='activities' element={<ActivityPage title={ loc.state }  drawers={ drawers.Activities } />} />
                <Route path='activities/times' element={<NewActivityTimes />}/>
                <Route path='surveyors' element={<SurveyorPage title={ loc.state } drawers={ drawers } />} />
            </Routes>
        </div>
    );
}

export default ProjectPage;