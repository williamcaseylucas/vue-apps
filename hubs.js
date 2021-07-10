
import Map from './src/apps/Center_Map/hubs.js'
import Center1 from './src/apps/Center1_Intro/hubs.js'
import Center2 from './src/apps/Center2_History/hubs.js'
import Center3 from './src/apps/Center3_3D-Tracking/hubs.js'
import Center4 from './src/apps/Center4_Presence/hubs.js'
import Center5 from './src/apps/Center5_Genres/hubs.js'
import Center6 from './src/apps/Center6_Future/hubs.js'
import Center7 from './src/apps/Center7_Privacy/hubs.js'

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
export {Map, Center1, Center2, Center3, Center4, Center5, Center6, Center7}