
import hubsTest1 from './src/apps/Testing/HubsTest1/hubs'
import hubsTest2 from './src/apps/Testing/HubsTest2/hubs'
import hubsTest3 from './src/apps/Testing/HubsTest3/hubs'

import PortalTitle from './src/apps/Portal/PortalTitle/hubs'
import PortalSubtitle from './src/apps/Portal/PortalSubtitle/hubs'
import GraphLabel from './src/apps/GraphLabel/hubs'

import Map from './src/apps/Center_Map/hubs'
import Center1 from './src/apps/Center1_Intro/hubs'
import Center2 from './src/apps/Center2_History/hubs'
import Center3 from './src/apps/Center3_3D-Tracking/hubs'
import Center4 from './src/apps/Center4_Presence/hubs'
import Center5 from './src/apps/Center5_Genres/hubs'
import Center6 from './src/apps/Center6_Future/hubs'
import Center7 from './src/apps/Center7_Privacy/hubs'
import Monolith1 from './src/apps/Monolith1_Intro/hubs'
import Monolith2 from './src/apps/Monolith2_History/hubs'
import Monolith3 from './src/apps/Monolith3_3D-Tracking/hubs'
import Monolith4 from './src/apps/Monolith4_Presence/hubs'
import Monolith5 from './src/apps/Monolith5_Genres/hubs'
import Monolith6 from './src/apps/Monolith6_Future/hubs'
import Monolith7 from './src/apps/Monolith7_Privacy/hubs'
import Alyx from './src/apps/Room5/Alyx/hubs'
import Pokemon from './src/apps/Room5/Pokemon/hubs'
import BeatSaber from './src/apps/Room5/BeatSaber/hubs'
import WalkingDead from './src/apps/Room5/WalkingDead/hubs'
import Apparizione from './src/apps/Room5/Apparizione/hubs'
import Minecraft from './src/apps/Room5/Minecraft/hubs'
import GamesBanner from './src/apps/Room5/GamesBanner/hubs'
import ArtBanner from './src/apps/Room5/ArtBanner/hubs'
import {initializeEthereal, systemTick} from './src/apps/HubsApp'


// Presence and Aura Room 
import Aura from './src/apps/Room6/Aura/hubs'
import Absence_Mediation from './src/apps/Room6/Absence_Mediation/hubs'
import Gaudi from './src/apps/Room6/Gaudi/hubs'
import Gaudi_pic from './src/apps/Room6/Gaudi_pic/hubs'
import cybersickness from './src/apps/Room6/cybersickness/hubs'
import cybersickness_pic from './src/apps/Room6/cybersickness_pic/hubs'
import Empathy from './src/apps/Room6/Empathy/hubs'
import Mainmap_black from './src/apps/Room6/Mainmap_black/hubs'
import Presence_map from './src/apps/Room6/Room6_map/hubs'
import Presence_map2 from './src/apps/Room6/Room6_map_2/hubs'
import Presence_map3 from './src/apps/Room6/Room6_map_3/hubs'
import Milk from './src/apps/Room6/Milk/hubs'
import Milk_pic from './src/apps/Room6/Milk_pic/hubs'
import Nonnie from './src/apps/Room6/Nonnie/hubs'
import Nonnie_pic from './src/apps/Room6/Nonnie_pic/hubs'
import Pit_Experiment from './src/apps/Room6/Pit_Experiment/hubs'
import Pit_AR from './src/apps/Room6/Pit_AR/hubs'
import Presence from './src/apps/Room6/Presence/hubs'
import Treehugger from './src/apps/Room6/Treehugger/hubs'
import Laciotat from './src/apps/Room6/Laciotat/hubs'
import PlaceandSpace from './src/apps/Room6/PlaceandSpace/hubs'
import Parthenon from './src/apps/Room6/Parthenon/hubs'
import TerracottaPic from './src/apps/Room6/TerracottaPic/hubs'
import Terracotta from './src/apps/Room6/Terracotta/hubs'

//Pit
import Pit from './src/apps/Room_Pit/Pit/hubs'
import PitInstruction from './src/apps/Room_Pit/PitInstruction/hubs'
import pitSign1 from './src/apps/Room_Pit/pitSign1/hubs'
import pitSign2 from './src/apps/Room_Pit/pitSign2/hubs'
import pitSign3 from './src/apps/Room_Pit/pitSign3/hubs'

//Onboarding Room
import Welcome from './src/apps/Onboarding/Welcome/hubs'
import MitPress from './src/apps/Onboarding/MitPress/hubs'
import MitText from './src/apps/Onboarding/MitText/hubs'

import HubsPlatform from './src/apps/Onboarding/HubsPlatform/hubs'
import HubsPlatform2 from './src/apps/Onboarding/HubsPlatform2/hubs'

import HubsFeatures from './src/apps/Onboarding/HubsFeatures/hubs'
import AudioText from './src/apps/Onboarding/AudioText/hubs'
import Sharing from './src/apps/Onboarding/Sharing/hubs'
import rotundaMap from './src/apps/Onboarding/rotundaMap/hubs'
import Overview from './src/apps/Onboarding/Overview/hubs'
import Back from './src/apps/Onboarding/Back/hubs'
import Exit from './src/apps/Room6/Exit/hubs'

import ARVR_monolith from './src/apps/Onboarding/ARVR_monolith/hubs'
import History_monolith from './src/apps/Onboarding/History_monolith/hubs'
import Graphics_monolith from './src/apps/Onboarding/Graphics_monolith/hubs'
import Presence_monolith from './src/apps/Onboarding/Presence_monolith/hubs'
import Genres_monolith from './src/apps/Onboarding/Genres_monolith/hubs'
import Privacy_monolith from './src/apps/Onboarding/Privacy_monolith/hubs'
import Future_monolith from './src/apps/Onboarding/Future_monolith/hubs'

//test
import AudioPad from './src/apps/AudioPad/hubs'
import Label from './src/apps/Label/hubs'
import Label_lg from './src/apps/Label_lg_text/hubs'
import Title from './src/apps/Title/hubs'

export {
    // for updating ethereal once per tick
    systemTick, initializeEthereal,

    //General Use
    Label,Title,Label_lg,
    // Rotunda
    Map, Center1, Center2, Center3, Center4, Center5, Center6, Center7, Monolith1, Monolith2, Monolith3, Monolith4, Monolith5, Monolith6, Monolith7,
    Alyx, Pokemon, BeatSaber, WalkingDead, Minecraft, Apparizione, GamesBanner, ArtBanner, 
    
    // Presence and Aura
    Milk, Nonnie, Treehugger, Presence, Empathy, Aura,  cybersickness, Presence_map, Presence_map2, Presence_map3, Milk_pic,  Nonnie_pic, AudioText, Parthenon, Terracotta, TerracottaPic, AudioPad, Gaudi, Gaudi_pic, cybersickness_pic,  Pit_AR, Laciotat, PlaceandSpace, Mainmap_black,Pit_Experiment, Absence_Mediation,
    
    //Onboarding and Rotunda
    Exit, Welcome, MitPress, HubsPlatform, HubsFeatures,rotundaMap, Sharing,MitText, HubsPlatform2, Overview, Back, ARVR_monolith, History_monolith,Graphics_monolith,Presence_monolith,Genres_monolith,Privacy_monolith,Future_monolith,
    //Pit 
    Pit, PitInstruction, pitSign1,pitSign2,pitSign3,
    // Portal titles
    PortalTitle, PortalSubtitle, GraphLabel,
    // Tests
    hubsTest1, hubsTest2, hubsTest3}



// need to wait until we have some reasonable performance optimizations
// such as shadow dom support for Ethereal
//   import hubsRevealTest from './src/apps/HubsRevealTest/hubs.js'

// if (THREE.Object3D.applyMatrix4) {
//     THREE.Object3D.prototype.applyMatrix4 = function(matrix ) {
// 		if ( this.matrixAutoUpdate ) this.updateMatrix();
// 		this.matrix.premultiply( matrix );
// 		this.matrix.decompose( this.position, this.quaternion, this.scale )
// 	}
// }