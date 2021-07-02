import hubsTest1 from './src/apps/HubsTest1/hubs.js'
import hubsTest2 from './src/apps/HubsTest2/hubs.js'
import 3D from './src/apps/3D/hubs.js'
import AR-VR from './src/apps/AR-VR/hubs.js'
import Center1 from './src/apps/Center1/hubs.js'
import Center2 from './src/apps/Center2/hubs.js'
import History from './src/apps/History/hubs.js'
import Intro from './src/apps/Intro/hubs.js'



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
export {hubsTest1, hubsTest2, 3D, AR-VR, Center1,Center2, History, Intro}