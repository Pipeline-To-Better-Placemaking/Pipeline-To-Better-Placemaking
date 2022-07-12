import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from '../api/axios.js';
import MapPage from './MapPage';
import TabPanel from '../components/ProjectTabPanel';
import ActivityPage from './ActivityPage';
import SurveyorPage from './SurveyorPage';
import NewActivityTimes from './NewActivityTimes';

function ProjectPage(){
    /*const templateDrawers = {
        Results: {
            stationary_maps: {
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
                },
                '5/13/22': {
                    '4:00': {
                        researcher: 'Sally Lynn',
                        data: [
                            {
                                point: {
                                    lat: 28.603232199908305,
                                    lng: -81.1995854914737
                                },
                                posture: 'Standing',
                                age: '15-21',
                                gender: 'Female',
                                activity: 'Socializing'
                            },
                            {
                                point: {
                                    lat: 28.603253393658516,
                                    lng: -81.19965254669451
                                },
                                posture: 'Standing',
                                age: '15-21',
                                gender: 'Female',
                                activity: 'Socializing'
                            },
                            {
                                point: {
                                    lat: 28.603430029048898,
                                    lng: -81.19939323473407
                                },
                                posture: 'Laying',
                                age: '15-21',
                                gender: 'Male',
                                activity: 'Solitary'
                            },

                        ]

                    }
                }
            },
            moving_maps: {
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
                                        lng: - 81.19921768881817
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
                                        lng: -81.19939471460638
                                    }

                                ]
                            },
                            {
                                mode: 'Handicap Assisted Wheels',
                                path: [
                                    {
                                        lat: 28.60335637825532,
                                        lng: -81.1993517992638
                                    },
                                    {
                                        lat: 28.60338699141251,
                                        lng: -81.19940142012868
                                    },
                                    {
                                        lat: 28.603442330558636,
                                        lng: -81.19949395633616
                                    },
                                    {
                                        lat: 28.603469411406763,
                                        lng: -81.19955028272332
                                    }

                                ]
                            },
                            {
                                mode: 'Walking',
                                path: [
                                    {
                                        lat: 28.603656543435022,
                                        lng: -81.1996947201365
                                    },
                                    {
                                        lat: 28.603533283354167,
                                        lng: -81.19973601274066
                                    },
                                    {
                                        lat: 28.60345110988662,
                                        lng: -81.19951853835869
                                    },
                                    {
                                        lat: 28.60327709527261,
                                        lng: -81.19961488776843
                                    }
                                ]
                            }
                        ]
                    },
                    '6:00': {
                        researcher: 'Billy Joe',
                        data: [
                            {
                                mode: 'Walking',
                                path: [
                                    {
                                        lat: 28.60396106772952,
                                        lng: -81.19966719174398
                                    },
                                    {
                                        lat: 28.604367098737516,
                                        lng: -81.1994276946398
                                    },
                                    {
                                        lat: 28.604526610489927,
                                        lng: -81.1993643793134
                                    }
                                ]
                            },
                            {
                                mode: 'Activity on Wheels',
                                path: [
                                    {
                                        lat: 28.604108495836478,
                                        lng: -81.1987449902508
                                    },
                                    {
                                        lat: 28.603944149736797,
                                        lng: -81.1988083055772
                                    },
                                    {
                                        lat: 28.603622707357623,
                                        lng: -81.1989872401953
                                    }
                                ]
                            }
                        ]
                    }
                }

            },
            order_maps: {
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
            boundaries_maps: {
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
                                path: [
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
                                path: [
                                    {
                                        lat: 28.603032029455452,
                                        lng: -81.2001763275537
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
                    '18:00': {
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
                                        lng: - 81.19971727735182
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
            lighting_maps: {
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
                                    lng: -81.20074305288507
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
            nature_maps: {
                '2/29/22': {
                    '12:00': {
                        researcher: 'Jane Doe',
                        data: [
                            {
                                animal: [

                                    {
                                        marker: {
                                            lat: 28.602512158058847,
                                            lng: -81.19971657935157
                                        },
                                        description: 'Dog',
                                        kind: 'Wild'
                                    },
                                    {
                                        marker: {
                                            lat: 28.60181511200448,
                                            lng: -81.19970585051519
                                        },
                                        description: 'Bird',
                                        kind: 'Wild'
                                    },
                                    {
                                        marker: {
                                            lat: 28.602578094603327,
                                            lng: -81.20119715877513
                                        },
                                        description: 'Dog',
                                        kind: 'Domesticated'
                                    },
                                    {
                                        marker: {
                                            lat: 28.599999473663722,
                                            lng: -81.20118911211877
                                        },
                                        description: 'Cat',
                                        kind: 'Domesticated'
                                    }
                                ],
                                water: [
                                    {
                                        location: [
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
                                        description: 'Lake',
                                        area: 400.64
                                    }
                                ],
                                vegetation: [
                                    {
                                        location: [
                                            {
                                                lat: 28.60343502765433,
                                                lng: -81.20112589672814
                                            },
                                            {
                                                lat: 28.60370371997612,
                                                lng: -81.20121631882381
                                            },
                                            {
                                                lat: 28.603257934612053,
                                                lng: -81.20164292563418
                                            }
                                        ],
                                        description: 'Design',
                                        area: 400.94
                                    },
                                    {
                                        location: [
                                            {
                                                lat: 28.603868558748708,
                                                lng: -81.19963074866048
                                            },
                                            {
                                                lat: 28.603710972773605,
                                                lng: -81.19975755193431
                                            },
                                            {
                                                lat: 28.60363211744467,
                                                lng: -81.19953575813689
                                            },
                                            {
                                                lat: 28.60365947542264,
                                                lng: -81.1993982826426
                                            },
                                            {
                                                lat: 28.603532341229318,
                                                lng: -81.19932496237898
                                            },
                                            {
                                                lat: 28.60341808125346,
                                                lng: -81.19913432969358
                                            },
                                            {
                                                lat: 28.60363372673768,
                                                lng: - 81.19902618230475
                                            }

                                        ],
                                        description: 'Native',
                                        area: 250
                                    },
                                    {
                                        location: [
                                            {
                                                lat: 28.602997644416632,
                                                lng: -81.2009270644679
                                            },
                                            {
                                                lat: 28.60239335916406,
                                                lng: -81.20078274707231
                                            },
                                            {
                                                lat: 28.60229589347528,
                                                lng: -81.20013331879221
                                            },
                                            {
                                                lat: 28.602086341938286,
                                                lng: - 81.1997947279795
                                            },
                                            {
                                                lat: 28.601467431470592,
                                                lng: -81.1996948159364
                                            },
                                            {
                                                lat: 28.60238361259924,
                                                lng: -81.19903983698723
                                            },
                                            {
                                                lat: 28.603265673053194,
                                                lng: -81.2002609841806
                                            }
                                        ],
                                        description: 'Native',
                                        area: 20544
                                    }
                                ]
                            }
                        ]
                    }
                },
                '4/16/22': {
                    '1:00': {
                        researcher: 'Nick Names',
                        data: [
                            {
                                animal: [
                                    {
                                        marker: {
                                            lat: 28.60400662742351, lng: -81.19915996167126
                                        },
                                        description: 'Dog',
                                        kind: 'Domesticated'
                                    }
                                ],
                                water: [
                                    {
                                        location: [
                                            {
                                                lat: 28.60292191958614,
                                                lng: -81.1994307139586
                                            },
                                            {
                                                lat: 28.60257186563576,
                                                lng: -81.19919044158637
                                            },
                                            {
                                                lat: 28.602175951683893,
                                                lng: -81.19915736060757
                                            },
                                            {
                                                lat: 28.60189621235522,
                                                lng: -81.19925486243979
                                            },
                                            {
                                                lat: 28.60169290406697,
                                                lng: -81.19946727714618
                                            },
                                            {
                                                lat: 28.60206741902445,
                                                lng: -81.19935236427251
                                            },
                                            {
                                                lat: 28.60240218840762,
                                                lng: -81.19929142562737
                                            },
                                            {
                                                lat: 28.60261160980823,
                                                lng: -81.19951080474986
                                            }
                                        ],
                                        description: 'Lake',
                                        area: 1000
                                    }
                                ],
                                vegetation: [
                                    {
                                        location: [
                                            {
                                                lat: 28.606273297480485,
                                                lng: -81.19839454889278
                                            },
                                            {
                                                lat: 28.603696745776244,
                                                lng: -81.19974962765141
                                            },
                                            {
                                                lat: 28.603422075434583,
                                                lng: -81.19914709587648
                                            },
                                            {
                                                lat: 28.606087364724456,
                                                lng: -81.19751330779448
                                            }
                                        ],
                                        description: 'Open Field',
                                        area: 37965
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            sound_maps: {
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
    }*/

    //loc state recieved from (project type) Display Cards on TeamHome(listing team projects)
    const loc = useLocation();
    //var loaded = { test: false };
    //Holds basic projects info including map ids, default data overwritten on async function
    const [projectInfo, setProjectInfo] = React.useState();
    //Holds specifics like results, locations, and types of markers, boundaries, etc.
    const [results, setResults] = React.useState({});
    const user = loc.state ? loc.state.userToken : {};

    // page url: path (split index)
    // can be reached at (heroku-url)/home (1)/teams (2)/ :id (3) /projects (4)/:id (5)
    // Selected Project's data will be loaded here to pass into its relevant components 
    const projectId = loc.pathname.split('/')[5];
    //console.log(projectId);

    //load project area and location data here as well and pass to Map Page
    var area = [
        { lat: 28.60554990612719, lng: -81.20110596383721 },
        { lat: 28.606199831533385, lng: -81.19778002454426 },
        { lat: 28.603392878566126, lng: -81.19546259587324 },
        { lat: 28.600755404733533, lng: -81.19444335642248 },
        { lat: 28.598011890739404, lng: -81.1974018330677 },
        { lat: 28.59642933335552, lng: -81.19959051571513 },
        { lat: 28.59729597487453, lng: - 81.20322759118913 },
        { lat: 28.599839338049176, lng: -81.20663936117703 },
        { lat: 28.601506620541844, lng: -81.20608146164412 },
        { lat: 28.604549107390945, lng: -81.2062102077004 },
        { lat: 28.60644237514531, lng: -81.20359237160903 }
    ];

    // loc.state will be used for maintaining project title across the project sub-pages(map, activities, and researchers)
    const projectData = async() => {
        try {

            const response = await axios.get(`/projects/${projectId}`, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${user.token}`
                },
                withCredentials: true
            });

            // console.log(response.data);
            setProjectInfo(response.data);

            //get Map data for activity results (needed in drawers)
            projectInfo?.boundariesCollections.map((collection) => (
                collection.maps.map((id) => (
                    collectionPoints(id, 'bounds', collection.date)
                ))
            ))
            projectInfo?.lightCollections.map((collection) => (
                collection.maps.map((id) => (
                    collectionPoints(id, 'light', collection.date)
                ))
            ))
            projectInfo?.movingCollections.map((collection) => (
                collection.maps.map((id) => (
                    collectionPoints(id, 'moving', collection.date)
                ))
            ))
            projectInfo?.natureCollections.map((collection) => (
                collection.maps.map((id) => (
                    collectionPoints(id, 'nature', collection.date)
                ))
            ))
            projectInfo?.orderCollections.map((collection) => (
                collection.maps.map((id) => (
                    collectionPoints(id, 'order', collection.date)
                ))
            ))
            projectInfo?.soundCollections.map((collection) => (
                collection.maps.map((id) => (
                    collectionPoints(id, 'sound', collection.date)
                ))
            ))
            projectInfo?.stationaryCollections.map((collection) => (
                collection.maps.map((id) => (
                    collectionPoints(id, 'stationary', collection.date)
                ))
            ))
            
        } catch(error){
            //project api get error
            console.log('ERROR: ', error);
            return;
        }
    }

    const collectionPoints = async (id, cat, dateTime) => {
        const apiCategory = {
            bounds: 'boundaries_maps',
            light: 'light_maps',
            moving: 'moving_maps',
            nature: 'nature_maps',
            order: 'order_maps',
            sound: 'sound_maps',
            stationary: 'stationary_maps'
        }

        try {

            const response = await axios.get(`/${apiCategory[cat]}/${id}`, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${user.token}`
                },
                withCredentials: true
            });

            // console.log(response.data);
            var date = new Date(dateTime);
            var map = results;
            //console.log(typeof (dateTime));
            map[apiCategory[cat]] = {};
            map[apiCategory[cat]][date.toLocaleDateString()] = {};
            map[apiCategory[cat]][date.toLocaleDateString()][date.toLocaleTimeString()] = response.data;
            setResults(map);
            //console.log(map);

        } catch (error) {
            //project api get error
            console.log('ERROR: ', error);
            return;
        }
    }

    //need to pull each collection object to pass into the drawer
    //projectInfo?.boundariesCollections, projectInfo?.standingPoints, projectInfo?.stationaryCollections, projectInfo?.movingCollections, projectInfo?.soundCollections, projectInfo?.surveyCollections]

    React.useEffect(() => {
        projectData();
    }, []);

    //loading in center from project
    var center = { lat: projectInfo?.standingPoints[0].latitude, lng: projectInfo?.standingPoints[0].longitude };
    area =  projectInfo?.areas

    //console.log(projectInfo)
    //console.log(templateDrawers)
    //console.log(center)

    return (
        <div id='ProjectPage'>
            <TabPanel state={ loc.state }/>
            {/* data passed into drawers needs map data and to match the format drawers component above */}
            {/* made it check for projectInfo.title before loading routes, later it will need to render on map data passed into drawers hopefully this helps */}
            { results?.stationary_maps ?
                <Routes>
                    <Route index element={<MapPage title={ projectInfo.title } 
                    drawers={{ Results: results, Data: '', Graphs: '' }} 
                        area={ area } 
                        center={ center } />} />
                    <Route path='map' element={<MapPage title={ projectInfo.title } 
                    drawers={{ Results: results, Data: '', Graphs: '' }}  
                        area={ area } 
                        center={ center }/>} />
                    <Route path='activities' element={<ActivityPage title={ projectInfo.title }  
                    drawers={ results }  />} />
                    <Route path='activities/times' element={<NewActivityTimes />}/>
                    <Route path='surveyors' element={<SurveyorPage title={ projectInfo.title } 
                    drawers={ results }  />} />
                </Routes> 
                : 
                null
            }
        </div>
    );
}

export default ProjectPage;