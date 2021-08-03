
import hubsTest1 from './src/apps/HubsTest1/hubs'
import hubsTest2 from './src/apps/HubsTest2/hubs'

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

import {initializeEthereal, systemTick} from './src/apps/HubsApp'

export {
    // for updating ethereal once per tick
    systemTick, initializeEthereal,

    // Rotunda
    Map, Center1, Center2, Center3, Center4, Center5, Center6, Center7, Monolith1, Monolith2, Monolith3, Monolith4, Monolith5, Monolith6, Monolith7,

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