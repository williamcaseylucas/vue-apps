import hubsTest1 from './src/apps/HubsTest1/hubs.js'
import hubsTest2 from './src/apps/HubsTest2/hubs.js'
import my3D from './src/apps/3D/hubs.js'

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
export {hubsTest1, hubsTest2, my3D}