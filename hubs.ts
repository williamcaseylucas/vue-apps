
import hubsTest1 from './src/apps/HubsTest1/hubs'
import hubsTest2 from './src/apps/HubsTest2/hubs'

import PortalTitle from './src/apps/PortalTitle/hubs'
import PortalSubtitle from './src/apps/PortalSubtitle/hubs'

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
import Alyx from './src/apps/Room5/Alyx/hubs.js'
import Pokemon from './src/apps/Room5/Pokemon/hubs.js'
import BeatSaber from './src/apps/Room5/BeatSaber/hubs.js'
import WalkingDead from './src/apps/Room5/WalkingDead/hubs.js'
import Apparizione from './src/apps/Room5/Apparizione/hubs.js'
import Minecraft from './src/apps/Room5/Minecraft/hubs.js'
import GamesBanner from './src/apps/Room5/GamesBanner/hubs.js'
import ArtBanner from './src/apps/Room5/ArtBanner/hubs.js'
import {initializeEthereal, systemTick} from './src/apps/HubsApp'

//JP
import ARandPresence from './src/apps/Room6/ARandPresence/hubs.js'
import Aura from './src/apps/Room6/Aura/hubs.js'
import cybersickness from './src/apps/Room6/cybersickness/hubs.js'
import Empathy from './src/apps/Room6/Empathy/hubs.js'
import Empathy_title from './src/apps/Room6/Empathy_title/hubs.js'

import Presence_map from './src/apps/Room6/map/hubs.js'

import Milk from './src/apps/Room6/Milk/hubs.js'
import Milk_pic from './src/apps/Room6/Milk_pic/hubs.js'
import Nonnie from './src/apps/Room6/Nonnie/hubs.js'
import Nonnie_pic from './src/apps/Room6/Nonnie_pic/hubs.js'

import PitExperiment from './src/apps/Room6/PitExperiment/hubs.js'
import Pit_pic from './src/apps/Room6/Pit_pic/hubs.js'

import Presence from './src/apps/Room6/Presence/hubs.js'
import Treehugger from './src/apps/Room6/Treehugger/hubs.js'
import Treehugger_pic from './src/apps/Room6/Treehugger_pic/hubs.js'
import Exit from './src/apps/Room6/Exit/hubs.js'

//Pit
import Pit from './src/apps/Room_pit/Pit/hubs.js'
import PitInstruction from './src/apps/Room_pit/PitInstruction/hubs.js'
import pitSign1 from './src/apps/Room_pit/pitSign1/hubs.js'
import pitSign2 from './src/apps/Room_pit/pitSign2/hubs.js'

export {
    // for updating ethereal once per tick
    systemTick, initializeEthereal,

    // Rotunda
    Map, Center1, Center2, Center3, Center4, Center5, Center6, Center7, Monolith1, Monolith2, Monolith3, Monolith4, Monolith5, Monolith6, Monolith7,
    Alyx, Pokemon, BeatSaber, WalkingDead, Minecraft, Apparizione, GamesBanner, ArtBanner, Milk, Nonnie, Treehugger, Presence, Empathy, Aura, Pit, PitInstruction, pitSign1,PitExperiment,ARandPresence, cybersickness, Presence_map, Milk_pic, Empathy_title, Nonnie_pic, Treehugger_pic, Pit_pic,Exit,

    // Portal titles
    PortalTitle, PortalSubtitle,
    // Tests
    hubsTest1, hubsTest2}



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