import "./App.js";
import {g as t} from "./vendor.js";
import "./App2.js";
import "./logo.js";
class e {
  constructor(t3 = 0, e2 = 0) {
    Object.defineProperty(this, "isVector2", {value: true}), this.x = t3, this.y = e2;
  }
  get width() {
    return this.x;
  }
  set width(t3) {
    this.x = t3;
  }
  get height() {
    return this.y;
  }
  set height(t3) {
    this.y = t3;
  }
  set(t3, e2) {
    return this.x = t3, this.y = e2, this;
  }
  setScalar(t3) {
    return this.x = t3, this.y = t3, this;
  }
  setX(t3) {
    return this.x = t3, this;
  }
  setY(t3) {
    return this.y = t3, this;
  }
  setComponent(t3, e2) {
    switch (t3) {
      case 0:
        this.x = e2;
        break;
      case 1:
        this.y = e2;
        break;
      default:
        throw new Error("index is out of range: " + t3);
    }
    return this;
  }
  getComponent(t3) {
    switch (t3) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t3);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t3) {
    return this.x = t3.x, this.y = t3.y, this;
  }
  add(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t3, e2)) : (this.x += t3.x, this.y += t3.y, this);
  }
  addScalar(t3) {
    return this.x += t3, this.y += t3, this;
  }
  addVectors(t3, e2) {
    return this.x = t3.x + e2.x, this.y = t3.y + e2.y, this;
  }
  addScaledVector(t3, e2) {
    return this.x += t3.x * e2, this.y += t3.y * e2, this;
  }
  sub(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t3, e2)) : (this.x -= t3.x, this.y -= t3.y, this);
  }
  subScalar(t3) {
    return this.x -= t3, this.y -= t3, this;
  }
  subVectors(t3, e2) {
    return this.x = t3.x - e2.x, this.y = t3.y - e2.y, this;
  }
  multiply(t3) {
    return this.x *= t3.x, this.y *= t3.y, this;
  }
  multiplyScalar(t3) {
    return this.x *= t3, this.y *= t3, this;
  }
  divide(t3) {
    return this.x /= t3.x, this.y /= t3.y, this;
  }
  divideScalar(t3) {
    return this.multiplyScalar(1 / t3);
  }
  applyMatrix3(t3) {
    const e2 = this.x, r2 = this.y, n2 = t3.elements;
    return this.x = n2[0] * e2 + n2[3] * r2 + n2[6], this.y = n2[1] * e2 + n2[4] * r2 + n2[7], this;
  }
  min(t3) {
    return this.x = Math.min(this.x, t3.x), this.y = Math.min(this.y, t3.y), this;
  }
  max(t3) {
    return this.x = Math.max(this.x, t3.x), this.y = Math.max(this.y, t3.y), this;
  }
  clamp(t3, e2) {
    return this.x = Math.max(t3.x, Math.min(e2.x, this.x)), this.y = Math.max(t3.y, Math.min(e2.y, this.y)), this;
  }
  clampScalar(t3, e2) {
    return this.x = Math.max(t3, Math.min(e2, this.x)), this.y = Math.max(t3, Math.min(e2, this.y)), this;
  }
  clampLength(t3, e2) {
    const r2 = this.length();
    return this.divideScalar(r2 || 1).multiplyScalar(Math.max(t3, Math.min(e2, r2)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t3) {
    return this.x * t3.x + this.y * t3.y;
  }
  cross(t3) {
    return this.x * t3.y - this.y * t3.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  distanceTo(t3) {
    return Math.sqrt(this.distanceToSquared(t3));
  }
  distanceToSquared(t3) {
    const e2 = this.x - t3.x, r2 = this.y - t3.y;
    return e2 * e2 + r2 * r2;
  }
  manhattanDistanceTo(t3) {
    return Math.abs(this.x - t3.x) + Math.abs(this.y - t3.y);
  }
  setLength(t3) {
    return this.normalize().multiplyScalar(t3);
  }
  lerp(t3, e2) {
    return this.x += (t3.x - this.x) * e2, this.y += (t3.y - this.y) * e2, this;
  }
  lerpVectors(t3, e2, r2) {
    return this.x = t3.x + (e2.x - t3.x) * r2, this.y = t3.y + (e2.y - t3.y) * r2, this;
  }
  equals(t3) {
    return t3.x === this.x && t3.y === this.y;
  }
  fromArray(t3, e2 = 0) {
    return this.x = t3[e2], this.y = t3[e2 + 1], this;
  }
  toArray(t3 = [], e2 = 0) {
    return t3[e2] = this.x, t3[e2 + 1] = this.y, t3;
  }
  fromBufferAttribute(t3, e2, r2) {
    return r2 !== void 0 && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = t3.getX(e2), this.y = t3.getY(e2), this;
  }
  rotateAround(t3, e2) {
    const r2 = Math.cos(e2), n2 = Math.sin(e2), i2 = this.x - t3.x, s2 = this.y - t3.y;
    return this.x = i2 * r2 - s2 * n2 + t3.x, this.y = i2 * n2 + s2 * r2 + t3.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
}
const r = [];
for (let Oh = 0; Oh < 256; Oh++)
  r[Oh] = (Oh < 16 ? "0" : "") + Oh.toString(16);
let n = 1234567;
const i = {DEG2RAD: Math.PI / 180, RAD2DEG: 180 / Math.PI, generateUUID: function() {
  const t3 = 4294967295 * Math.random() | 0, e2 = 4294967295 * Math.random() | 0, n2 = 4294967295 * Math.random() | 0, i2 = 4294967295 * Math.random() | 0;
  return (r[255 & t3] + r[t3 >> 8 & 255] + r[t3 >> 16 & 255] + r[t3 >> 24 & 255] + "-" + r[255 & e2] + r[e2 >> 8 & 255] + "-" + r[e2 >> 16 & 15 | 64] + r[e2 >> 24 & 255] + "-" + r[63 & n2 | 128] + r[n2 >> 8 & 255] + "-" + r[n2 >> 16 & 255] + r[n2 >> 24 & 255] + r[255 & i2] + r[i2 >> 8 & 255] + r[i2 >> 16 & 255] + r[i2 >> 24 & 255]).toUpperCase();
}, clamp: function(t3, e2, r2) {
  return Math.max(e2, Math.min(r2, t3));
}, euclideanModulo: function(t3, e2) {
  return (t3 % e2 + e2) % e2;
}, mapLinear: function(t3, e2, r2, n2, i2) {
  return n2 + (t3 - e2) * (i2 - n2) / (r2 - e2);
}, lerp: function(t3, e2, r2) {
  return (1 - r2) * t3 + r2 * e2;
}, smoothstep: function(t3, e2, r2) {
  return t3 <= e2 ? 0 : t3 >= r2 ? 1 : (t3 = (t3 - e2) / (r2 - e2)) * t3 * (3 - 2 * t3);
}, smootherstep: function(t3, e2, r2) {
  return t3 <= e2 ? 0 : t3 >= r2 ? 1 : (t3 = (t3 - e2) / (r2 - e2)) * t3 * t3 * (t3 * (6 * t3 - 15) + 10);
}, randInt: function(t3, e2) {
  return t3 + Math.floor(Math.random() * (e2 - t3 + 1));
}, randFloat: function(t3, e2) {
  return t3 + Math.random() * (e2 - t3);
}, randFloatSpread: function(t3) {
  return t3 * (0.5 - Math.random());
}, seededRandom: function(t3) {
  return t3 !== void 0 && (n = t3 % 2147483647), n = 16807 * n % 2147483647, (n - 1) / 2147483646;
}, degToRad: function(t3) {
  return t3 * i.DEG2RAD;
}, radToDeg: function(t3) {
  return t3 * i.RAD2DEG;
}, isPowerOfTwo: function(t3) {
  return (t3 & t3 - 1) == 0 && t3 !== 0;
}, ceilPowerOfTwo: function(t3) {
  return Math.pow(2, Math.ceil(Math.log(t3) / Math.LN2));
}, floorPowerOfTwo: function(t3) {
  return Math.pow(2, Math.floor(Math.log(t3) / Math.LN2));
}, setQuaternionFromProperEuler: function(t3, e2, r2, n2, i2) {
  const s2 = Math.cos, a2 = Math.sin, o2 = s2(r2 / 2), u2 = a2(r2 / 2), h = s2((e2 + n2) / 2), c2 = a2((e2 + n2) / 2), l2 = s2((e2 - n2) / 2), p2 = a2((e2 - n2) / 2), f2 = s2((n2 - e2) / 2), d2 = a2((n2 - e2) / 2);
  switch (i2) {
    case "XYX":
      t3.set(o2 * c2, u2 * l2, u2 * p2, o2 * h);
      break;
    case "YZY":
      t3.set(u2 * p2, o2 * c2, u2 * l2, o2 * h);
      break;
    case "ZXZ":
      t3.set(u2 * l2, u2 * p2, o2 * c2, o2 * h);
      break;
    case "XZX":
      t3.set(o2 * c2, u2 * d2, u2 * f2, o2 * h);
      break;
    case "YXY":
      t3.set(u2 * f2, o2 * c2, u2 * d2, o2 * h);
      break;
    case "ZYZ":
      t3.set(u2 * d2, u2 * f2, o2 * c2, o2 * h);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i2);
  }
}};
class s {
  constructor(t3 = 0, e2 = 0, r2 = 0, n2 = 1) {
    Object.defineProperty(this, "isQuaternion", {value: true}), this._x = t3, this._y = e2, this._z = r2, this._w = n2;
  }
  static slerp(t3, e2, r2, n2) {
    return r2.copy(t3).slerp(e2, n2);
  }
  static slerpFlat(t3, e2, r2, n2, i2, s2, a2) {
    let o2 = r2[n2 + 0], u2 = r2[n2 + 1], h = r2[n2 + 2], c2 = r2[n2 + 3];
    const l2 = i2[s2 + 0], p2 = i2[s2 + 1], f2 = i2[s2 + 2], d2 = i2[s2 + 3];
    if (c2 !== d2 || o2 !== l2 || u2 !== p2 || h !== f2) {
      let t4 = 1 - a2;
      const e3 = o2 * l2 + u2 * p2 + h * f2 + c2 * d2, r3 = e3 >= 0 ? 1 : -1, n3 = 1 - e3 * e3;
      if (n3 > Number.EPSILON) {
        const i4 = Math.sqrt(n3), s3 = Math.atan2(i4, e3 * r3);
        t4 = Math.sin(t4 * s3) / i4, a2 = Math.sin(a2 * s3) / i4;
      }
      const i3 = a2 * r3;
      if (o2 = o2 * t4 + l2 * i3, u2 = u2 * t4 + p2 * i3, h = h * t4 + f2 * i3, c2 = c2 * t4 + d2 * i3, t4 === 1 - a2) {
        const t5 = 1 / Math.sqrt(o2 * o2 + u2 * u2 + h * h + c2 * c2);
        o2 *= t5, u2 *= t5, h *= t5, c2 *= t5;
      }
    }
    t3[e2] = o2, t3[e2 + 1] = u2, t3[e2 + 2] = h, t3[e2 + 3] = c2;
  }
  static multiplyQuaternionsFlat(t3, e2, r2, n2, i2, s2) {
    const a2 = r2[n2], o2 = r2[n2 + 1], u2 = r2[n2 + 2], h = r2[n2 + 3], c2 = i2[s2], l2 = i2[s2 + 1], p2 = i2[s2 + 2], f2 = i2[s2 + 3];
    return t3[e2] = a2 * f2 + h * c2 + o2 * p2 - u2 * l2, t3[e2 + 1] = o2 * f2 + h * l2 + u2 * c2 - a2 * p2, t3[e2 + 2] = u2 * f2 + h * p2 + a2 * l2 - o2 * c2, t3[e2 + 3] = h * f2 - a2 * c2 - o2 * l2 - u2 * p2, t3;
  }
  get x() {
    return this._x;
  }
  set x(t3) {
    this._x = t3, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t3) {
    this._y = t3, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t3) {
    this._z = t3, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t3) {
    this._w = t3, this._onChangeCallback();
  }
  set(t3, e2, r2, n2) {
    return this._x = t3, this._y = e2, this._z = r2, this._w = n2, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t3) {
    return this._x = t3.x, this._y = t3.y, this._z = t3.z, this._w = t3.w, this._onChangeCallback(), this;
  }
  setFromEuler(t3, e2) {
    if (!t3 || !t3.isEuler)
      throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
    const r2 = t3._x, n2 = t3._y, i2 = t3._z, s2 = t3._order, a2 = Math.cos, o2 = Math.sin, u2 = a2(r2 / 2), h = a2(n2 / 2), c2 = a2(i2 / 2), l2 = o2(r2 / 2), p2 = o2(n2 / 2), f2 = o2(i2 / 2);
    switch (s2) {
      case "XYZ":
        this._x = l2 * h * c2 + u2 * p2 * f2, this._y = u2 * p2 * c2 - l2 * h * f2, this._z = u2 * h * f2 + l2 * p2 * c2, this._w = u2 * h * c2 - l2 * p2 * f2;
        break;
      case "YXZ":
        this._x = l2 * h * c2 + u2 * p2 * f2, this._y = u2 * p2 * c2 - l2 * h * f2, this._z = u2 * h * f2 - l2 * p2 * c2, this._w = u2 * h * c2 + l2 * p2 * f2;
        break;
      case "ZXY":
        this._x = l2 * h * c2 - u2 * p2 * f2, this._y = u2 * p2 * c2 + l2 * h * f2, this._z = u2 * h * f2 + l2 * p2 * c2, this._w = u2 * h * c2 - l2 * p2 * f2;
        break;
      case "ZYX":
        this._x = l2 * h * c2 - u2 * p2 * f2, this._y = u2 * p2 * c2 + l2 * h * f2, this._z = u2 * h * f2 - l2 * p2 * c2, this._w = u2 * h * c2 + l2 * p2 * f2;
        break;
      case "YZX":
        this._x = l2 * h * c2 + u2 * p2 * f2, this._y = u2 * p2 * c2 + l2 * h * f2, this._z = u2 * h * f2 - l2 * p2 * c2, this._w = u2 * h * c2 - l2 * p2 * f2;
        break;
      case "XZY":
        this._x = l2 * h * c2 - u2 * p2 * f2, this._y = u2 * p2 * c2 - l2 * h * f2, this._z = u2 * h * f2 + l2 * p2 * c2, this._w = u2 * h * c2 + l2 * p2 * f2;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + s2);
    }
    return e2 !== false && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t3, e2) {
    const r2 = e2 / 2, n2 = Math.sin(r2);
    return this._x = t3.x * n2, this._y = t3.y * n2, this._z = t3.z * n2, this._w = Math.cos(r2), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t3) {
    const e2 = t3.elements, r2 = e2[0], n2 = e2[4], i2 = e2[8], s2 = e2[1], a2 = e2[5], o2 = e2[9], u2 = e2[2], h = e2[6], c2 = e2[10], l2 = r2 + a2 + c2;
    if (l2 > 0) {
      const t4 = 0.5 / Math.sqrt(l2 + 1);
      this._w = 0.25 / t4, this._x = (h - o2) * t4, this._y = (i2 - u2) * t4, this._z = (s2 - n2) * t4;
    } else if (r2 > a2 && r2 > c2) {
      const t4 = 2 * Math.sqrt(1 + r2 - a2 - c2);
      this._w = (h - o2) / t4, this._x = 0.25 * t4, this._y = (n2 + s2) / t4, this._z = (i2 + u2) / t4;
    } else if (a2 > c2) {
      const t4 = 2 * Math.sqrt(1 + a2 - r2 - c2);
      this._w = (i2 - u2) / t4, this._x = (n2 + s2) / t4, this._y = 0.25 * t4, this._z = (o2 + h) / t4;
    } else {
      const t4 = 2 * Math.sqrt(1 + c2 - r2 - a2);
      this._w = (s2 - n2) / t4, this._x = (i2 + u2) / t4, this._y = (o2 + h) / t4, this._z = 0.25 * t4;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t3, e2) {
    let r2 = t3.dot(e2) + 1;
    return r2 < 1e-6 ? (r2 = 0, Math.abs(t3.x) > Math.abs(t3.z) ? (this._x = -t3.y, this._y = t3.x, this._z = 0, this._w = r2) : (this._x = 0, this._y = -t3.z, this._z = t3.y, this._w = r2)) : (this._x = t3.y * e2.z - t3.z * e2.y, this._y = t3.z * e2.x - t3.x * e2.z, this._z = t3.x * e2.y - t3.y * e2.x, this._w = r2), this.normalize();
  }
  angleTo(t3) {
    return 2 * Math.acos(Math.abs(i.clamp(this.dot(t3), -1, 1)));
  }
  rotateTowards(t3, e2) {
    const r2 = this.angleTo(t3);
    if (r2 === 0)
      return this;
    const n2 = Math.min(1, e2 / r2);
    return this.slerp(t3, n2), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  inverse() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(t3) {
    return this._x * t3._x + this._y * t3._y + this._z * t3._z + this._w * t3._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t3 = this.length();
    return t3 === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t3 = 1 / t3, this._x = this._x * t3, this._y = this._y * t3, this._z = this._z * t3, this._w = this._w * t3), this._onChangeCallback(), this;
  }
  multiply(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t3, e2)) : this.multiplyQuaternions(this, t3);
  }
  premultiply(t3) {
    return this.multiplyQuaternions(t3, this);
  }
  multiplyQuaternions(t3, e2) {
    const r2 = t3._x, n2 = t3._y, i2 = t3._z, s2 = t3._w, a2 = e2._x, o2 = e2._y, u2 = e2._z, h = e2._w;
    return this._x = r2 * h + s2 * a2 + n2 * u2 - i2 * o2, this._y = n2 * h + s2 * o2 + i2 * a2 - r2 * u2, this._z = i2 * h + s2 * u2 + r2 * o2 - n2 * a2, this._w = s2 * h - r2 * a2 - n2 * o2 - i2 * u2, this._onChangeCallback(), this;
  }
  slerp(t3, e2) {
    if (e2 === 0)
      return this;
    if (e2 === 1)
      return this.copy(t3);
    const r2 = this._x, n2 = this._y, i2 = this._z, s2 = this._w;
    let a2 = s2 * t3._w + r2 * t3._x + n2 * t3._y + i2 * t3._z;
    if (a2 < 0 ? (this._w = -t3._w, this._x = -t3._x, this._y = -t3._y, this._z = -t3._z, a2 = -a2) : this.copy(t3), a2 >= 1)
      return this._w = s2, this._x = r2, this._y = n2, this._z = i2, this;
    const o2 = 1 - a2 * a2;
    if (o2 <= Number.EPSILON) {
      const t4 = 1 - e2;
      return this._w = t4 * s2 + e2 * this._w, this._x = t4 * r2 + e2 * this._x, this._y = t4 * n2 + e2 * this._y, this._z = t4 * i2 + e2 * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const u2 = Math.sqrt(o2), h = Math.atan2(u2, a2), c2 = Math.sin((1 - e2) * h) / u2, l2 = Math.sin(e2 * h) / u2;
    return this._w = s2 * c2 + this._w * l2, this._x = r2 * c2 + this._x * l2, this._y = n2 * c2 + this._y * l2, this._z = i2 * c2 + this._z * l2, this._onChangeCallback(), this;
  }
  equals(t3) {
    return t3._x === this._x && t3._y === this._y && t3._z === this._z && t3._w === this._w;
  }
  fromArray(t3, e2 = 0) {
    return this._x = t3[e2], this._y = t3[e2 + 1], this._z = t3[e2 + 2], this._w = t3[e2 + 3], this._onChangeCallback(), this;
  }
  toArray(t3 = [], e2 = 0) {
    return t3[e2] = this._x, t3[e2 + 1] = this._y, t3[e2 + 2] = this._z, t3[e2 + 3] = this._w, t3;
  }
  fromBufferAttribute(t3, e2) {
    return this._x = t3.getX(e2), this._y = t3.getY(e2), this._z = t3.getZ(e2), this._w = t3.getW(e2), this;
  }
  _onChange(t3) {
    return this._onChangeCallback = t3, this;
  }
  _onChangeCallback() {
  }
}
class a {
  constructor(t3 = 0, e2 = 0, r2 = 0) {
    Object.defineProperty(this, "isVector3", {value: true}), this.x = t3, this.y = e2, this.z = r2;
  }
  set(t3, e2, r2) {
    return r2 === void 0 && (r2 = this.z), this.x = t3, this.y = e2, this.z = r2, this;
  }
  setScalar(t3) {
    return this.x = t3, this.y = t3, this.z = t3, this;
  }
  setX(t3) {
    return this.x = t3, this;
  }
  setY(t3) {
    return this.y = t3, this;
  }
  setZ(t3) {
    return this.z = t3, this;
  }
  setComponent(t3, e2) {
    switch (t3) {
      case 0:
        this.x = e2;
        break;
      case 1:
        this.y = e2;
        break;
      case 2:
        this.z = e2;
        break;
      default:
        throw new Error("index is out of range: " + t3);
    }
    return this;
  }
  getComponent(t3) {
    switch (t3) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t3);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t3) {
    return this.x = t3.x, this.y = t3.y, this.z = t3.z, this;
  }
  add(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t3, e2)) : (this.x += t3.x, this.y += t3.y, this.z += t3.z, this);
  }
  addScalar(t3) {
    return this.x += t3, this.y += t3, this.z += t3, this;
  }
  addVectors(t3, e2) {
    return this.x = t3.x + e2.x, this.y = t3.y + e2.y, this.z = t3.z + e2.z, this;
  }
  addScaledVector(t3, e2) {
    return this.x += t3.x * e2, this.y += t3.y * e2, this.z += t3.z * e2, this;
  }
  sub(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t3, e2)) : (this.x -= t3.x, this.y -= t3.y, this.z -= t3.z, this);
  }
  subScalar(t3) {
    return this.x -= t3, this.y -= t3, this.z -= t3, this;
  }
  subVectors(t3, e2) {
    return this.x = t3.x - e2.x, this.y = t3.y - e2.y, this.z = t3.z - e2.z, this;
  }
  multiply(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t3, e2)) : (this.x *= t3.x, this.y *= t3.y, this.z *= t3.z, this);
  }
  multiplyScalar(t3) {
    return this.x *= t3, this.y *= t3, this.z *= t3, this;
  }
  multiplyVectors(t3, e2) {
    return this.x = t3.x * e2.x, this.y = t3.y * e2.y, this.z = t3.z * e2.z, this;
  }
  applyEuler(t3) {
    return t3 && t3.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(u.setFromEuler(t3));
  }
  applyAxisAngle(t3, e2) {
    return this.applyQuaternion(u.setFromAxisAngle(t3, e2));
  }
  applyMatrix3(t3) {
    const e2 = this.x, r2 = this.y, n2 = this.z, i2 = t3.elements;
    return this.x = i2[0] * e2 + i2[3] * r2 + i2[6] * n2, this.y = i2[1] * e2 + i2[4] * r2 + i2[7] * n2, this.z = i2[2] * e2 + i2[5] * r2 + i2[8] * n2, this;
  }
  applyNormalMatrix(t3) {
    return this.applyMatrix3(t3).normalize();
  }
  applyMatrix4(t3) {
    const e2 = this.x, r2 = this.y, n2 = this.z, i2 = t3.elements, s2 = 1 / (i2[3] * e2 + i2[7] * r2 + i2[11] * n2 + i2[15]);
    return this.x = (i2[0] * e2 + i2[4] * r2 + i2[8] * n2 + i2[12]) * s2, this.y = (i2[1] * e2 + i2[5] * r2 + i2[9] * n2 + i2[13]) * s2, this.z = (i2[2] * e2 + i2[6] * r2 + i2[10] * n2 + i2[14]) * s2, this;
  }
  applyQuaternion(t3) {
    const e2 = this.x, r2 = this.y, n2 = this.z, i2 = t3.x, s2 = t3.y, a2 = t3.z, o2 = t3.w, u2 = o2 * e2 + s2 * n2 - a2 * r2, h = o2 * r2 + a2 * e2 - i2 * n2, c2 = o2 * n2 + i2 * r2 - s2 * e2, l2 = -i2 * e2 - s2 * r2 - a2 * n2;
    return this.x = u2 * o2 + l2 * -i2 + h * -a2 - c2 * -s2, this.y = h * o2 + l2 * -s2 + c2 * -i2 - u2 * -a2, this.z = c2 * o2 + l2 * -a2 + u2 * -s2 - h * -i2, this;
  }
  project(t3) {
    return this.applyMatrix4(t3.matrixWorldInverse).applyMatrix4(t3.projectionMatrix);
  }
  unproject(t3) {
    return this.applyMatrix4(t3.projectionMatrixInverse).applyMatrix4(t3.matrixWorld);
  }
  transformDirection(t3) {
    const e2 = this.x, r2 = this.y, n2 = this.z, i2 = t3.elements;
    return this.x = i2[0] * e2 + i2[4] * r2 + i2[8] * n2, this.y = i2[1] * e2 + i2[5] * r2 + i2[9] * n2, this.z = i2[2] * e2 + i2[6] * r2 + i2[10] * n2, this.normalize();
  }
  divide(t3) {
    return this.x /= t3.x, this.y /= t3.y, this.z /= t3.z, this;
  }
  divideScalar(t3) {
    return this.multiplyScalar(1 / t3);
  }
  min(t3) {
    return this.x = Math.min(this.x, t3.x), this.y = Math.min(this.y, t3.y), this.z = Math.min(this.z, t3.z), this;
  }
  max(t3) {
    return this.x = Math.max(this.x, t3.x), this.y = Math.max(this.y, t3.y), this.z = Math.max(this.z, t3.z), this;
  }
  clamp(t3, e2) {
    return this.x = Math.max(t3.x, Math.min(e2.x, this.x)), this.y = Math.max(t3.y, Math.min(e2.y, this.y)), this.z = Math.max(t3.z, Math.min(e2.z, this.z)), this;
  }
  clampScalar(t3, e2) {
    return this.x = Math.max(t3, Math.min(e2, this.x)), this.y = Math.max(t3, Math.min(e2, this.y)), this.z = Math.max(t3, Math.min(e2, this.z)), this;
  }
  clampLength(t3, e2) {
    const r2 = this.length();
    return this.divideScalar(r2 || 1).multiplyScalar(Math.max(t3, Math.min(e2, r2)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t3) {
    return this.x * t3.x + this.y * t3.y + this.z * t3.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t3) {
    return this.normalize().multiplyScalar(t3);
  }
  lerp(t3, e2) {
    return this.x += (t3.x - this.x) * e2, this.y += (t3.y - this.y) * e2, this.z += (t3.z - this.z) * e2, this;
  }
  lerpVectors(t3, e2, r2) {
    return this.x = t3.x + (e2.x - t3.x) * r2, this.y = t3.y + (e2.y - t3.y) * r2, this.z = t3.z + (e2.z - t3.z) * r2, this;
  }
  cross(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t3, e2)) : this.crossVectors(this, t3);
  }
  crossVectors(t3, e2) {
    const r2 = t3.x, n2 = t3.y, i2 = t3.z, s2 = e2.x, a2 = e2.y, o2 = e2.z;
    return this.x = n2 * o2 - i2 * a2, this.y = i2 * s2 - r2 * o2, this.z = r2 * a2 - n2 * s2, this;
  }
  projectOnVector(t3) {
    const e2 = t3.lengthSq();
    if (e2 === 0)
      return this.set(0, 0, 0);
    const r2 = t3.dot(this) / e2;
    return this.copy(t3).multiplyScalar(r2);
  }
  projectOnPlane(t3) {
    return o.copy(this).projectOnVector(t3), this.sub(o);
  }
  reflect(t3) {
    return this.sub(o.copy(t3).multiplyScalar(2 * this.dot(t3)));
  }
  angleTo(t3) {
    const e2 = Math.sqrt(this.lengthSq() * t3.lengthSq());
    if (e2 === 0)
      return Math.PI / 2;
    const r2 = this.dot(t3) / e2;
    return Math.acos(i.clamp(r2, -1, 1));
  }
  distanceTo(t3) {
    return Math.sqrt(this.distanceToSquared(t3));
  }
  distanceToSquared(t3) {
    const e2 = this.x - t3.x, r2 = this.y - t3.y, n2 = this.z - t3.z;
    return e2 * e2 + r2 * r2 + n2 * n2;
  }
  manhattanDistanceTo(t3) {
    return Math.abs(this.x - t3.x) + Math.abs(this.y - t3.y) + Math.abs(this.z - t3.z);
  }
  setFromSpherical(t3) {
    return this.setFromSphericalCoords(t3.radius, t3.phi, t3.theta);
  }
  setFromSphericalCoords(t3, e2, r2) {
    const n2 = Math.sin(e2) * t3;
    return this.x = n2 * Math.sin(r2), this.y = Math.cos(e2) * t3, this.z = n2 * Math.cos(r2), this;
  }
  setFromCylindrical(t3) {
    return this.setFromCylindricalCoords(t3.radius, t3.theta, t3.y);
  }
  setFromCylindricalCoords(t3, e2, r2) {
    return this.x = t3 * Math.sin(e2), this.y = r2, this.z = t3 * Math.cos(e2), this;
  }
  setFromMatrixPosition(t3) {
    const e2 = t3.elements;
    return this.x = e2[12], this.y = e2[13], this.z = e2[14], this;
  }
  setFromMatrixScale(t3) {
    const e2 = this.setFromMatrixColumn(t3, 0).length(), r2 = this.setFromMatrixColumn(t3, 1).length(), n2 = this.setFromMatrixColumn(t3, 2).length();
    return this.x = e2, this.y = r2, this.z = n2, this;
  }
  setFromMatrixColumn(t3, e2) {
    return this.fromArray(t3.elements, 4 * e2);
  }
  setFromMatrix3Column(t3, e2) {
    return this.fromArray(t3.elements, 3 * e2);
  }
  equals(t3) {
    return t3.x === this.x && t3.y === this.y && t3.z === this.z;
  }
  fromArray(t3, e2 = 0) {
    return this.x = t3[e2], this.y = t3[e2 + 1], this.z = t3[e2 + 2], this;
  }
  toArray(t3 = [], e2 = 0) {
    return t3[e2] = this.x, t3[e2 + 1] = this.y, t3[e2 + 2] = this.z, t3;
  }
  fromBufferAttribute(t3, e2, r2) {
    return r2 !== void 0 && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = t3.getX(e2), this.y = t3.getY(e2), this.z = t3.getZ(e2), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
}
const o = new a(), u = new s();
class c {
  constructor() {
    Object.defineProperty(this, "isMatrix4", {value: true}), this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
  }
  set(t3, e2, r2, n2, i2, s2, a2, o2, u2, h, c2, l2, p2, f2, d2, m2) {
    const y2 = this.elements;
    return y2[0] = t3, y2[4] = e2, y2[8] = r2, y2[12] = n2, y2[1] = i2, y2[5] = s2, y2[9] = a2, y2[13] = o2, y2[2] = u2, y2[6] = h, y2[10] = c2, y2[14] = l2, y2[3] = p2, y2[7] = f2, y2[11] = d2, y2[15] = m2, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new c().fromArray(this.elements);
  }
  copy(t3) {
    const e2 = this.elements, r2 = t3.elements;
    return e2[0] = r2[0], e2[1] = r2[1], e2[2] = r2[2], e2[3] = r2[3], e2[4] = r2[4], e2[5] = r2[5], e2[6] = r2[6], e2[7] = r2[7], e2[8] = r2[8], e2[9] = r2[9], e2[10] = r2[10], e2[11] = r2[11], e2[12] = r2[12], e2[13] = r2[13], e2[14] = r2[14], e2[15] = r2[15], this;
  }
  copyPosition(t3) {
    const e2 = this.elements, r2 = t3.elements;
    return e2[12] = r2[12], e2[13] = r2[13], e2[14] = r2[14], this;
  }
  extractBasis(t3, e2, r2) {
    return t3.setFromMatrixColumn(this, 0), e2.setFromMatrixColumn(this, 1), r2.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t3, e2, r2) {
    return this.set(t3.x, e2.x, r2.x, 0, t3.y, e2.y, r2.y, 0, t3.z, e2.z, r2.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t3) {
    const e2 = this.elements, r2 = t3.elements, n2 = 1 / l.setFromMatrixColumn(t3, 0).length(), i2 = 1 / l.setFromMatrixColumn(t3, 1).length(), s2 = 1 / l.setFromMatrixColumn(t3, 2).length();
    return e2[0] = r2[0] * n2, e2[1] = r2[1] * n2, e2[2] = r2[2] * n2, e2[3] = 0, e2[4] = r2[4] * i2, e2[5] = r2[5] * i2, e2[6] = r2[6] * i2, e2[7] = 0, e2[8] = r2[8] * s2, e2[9] = r2[9] * s2, e2[10] = r2[10] * s2, e2[11] = 0, e2[12] = 0, e2[13] = 0, e2[14] = 0, e2[15] = 1, this;
  }
  makeRotationFromEuler(t3) {
    t3 && t3.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
    const e2 = this.elements, r2 = t3.x, n2 = t3.y, i2 = t3.z, s2 = Math.cos(r2), a2 = Math.sin(r2), o2 = Math.cos(n2), u2 = Math.sin(n2), h = Math.cos(i2), c2 = Math.sin(i2);
    if (t3.order === "XYZ") {
      const t4 = s2 * h, r3 = s2 * c2, n3 = a2 * h, i3 = a2 * c2;
      e2[0] = o2 * h, e2[4] = -o2 * c2, e2[8] = u2, e2[1] = r3 + n3 * u2, e2[5] = t4 - i3 * u2, e2[9] = -a2 * o2, e2[2] = i3 - t4 * u2, e2[6] = n3 + r3 * u2, e2[10] = s2 * o2;
    } else if (t3.order === "YXZ") {
      const t4 = o2 * h, r3 = o2 * c2, n3 = u2 * h, i3 = u2 * c2;
      e2[0] = t4 + i3 * a2, e2[4] = n3 * a2 - r3, e2[8] = s2 * u2, e2[1] = s2 * c2, e2[5] = s2 * h, e2[9] = -a2, e2[2] = r3 * a2 - n3, e2[6] = i3 + t4 * a2, e2[10] = s2 * o2;
    } else if (t3.order === "ZXY") {
      const t4 = o2 * h, r3 = o2 * c2, n3 = u2 * h, i3 = u2 * c2;
      e2[0] = t4 - i3 * a2, e2[4] = -s2 * c2, e2[8] = n3 + r3 * a2, e2[1] = r3 + n3 * a2, e2[5] = s2 * h, e2[9] = i3 - t4 * a2, e2[2] = -s2 * u2, e2[6] = a2, e2[10] = s2 * o2;
    } else if (t3.order === "ZYX") {
      const t4 = s2 * h, r3 = s2 * c2, n3 = a2 * h, i3 = a2 * c2;
      e2[0] = o2 * h, e2[4] = n3 * u2 - r3, e2[8] = t4 * u2 + i3, e2[1] = o2 * c2, e2[5] = i3 * u2 + t4, e2[9] = r3 * u2 - n3, e2[2] = -u2, e2[6] = a2 * o2, e2[10] = s2 * o2;
    } else if (t3.order === "YZX") {
      const t4 = s2 * o2, r3 = s2 * u2, n3 = a2 * o2, i3 = a2 * u2;
      e2[0] = o2 * h, e2[4] = i3 - t4 * c2, e2[8] = n3 * c2 + r3, e2[1] = c2, e2[5] = s2 * h, e2[9] = -a2 * h, e2[2] = -u2 * h, e2[6] = r3 * c2 + n3, e2[10] = t4 - i3 * c2;
    } else if (t3.order === "XZY") {
      const t4 = s2 * o2, r3 = s2 * u2, n3 = a2 * o2, i3 = a2 * u2;
      e2[0] = o2 * h, e2[4] = -c2, e2[8] = u2 * h, e2[1] = t4 * c2 + i3, e2[5] = s2 * h, e2[9] = r3 * c2 - n3, e2[2] = n3 * c2 - r3, e2[6] = a2 * h, e2[10] = i3 * c2 + t4;
    }
    return e2[3] = 0, e2[7] = 0, e2[11] = 0, e2[12] = 0, e2[13] = 0, e2[14] = 0, e2[15] = 1, this;
  }
  makeRotationFromQuaternion(t3) {
    return this.compose(f, t3, d);
  }
  lookAt(t3, e2, r2) {
    const n2 = this.elements;
    return g.subVectors(t3, e2), g.lengthSq() === 0 && (g.z = 1), g.normalize(), m.crossVectors(r2, g), m.lengthSq() === 0 && (Math.abs(r2.z) === 1 ? g.x += 1e-4 : g.z += 1e-4, g.normalize(), m.crossVectors(r2, g)), m.normalize(), y.crossVectors(g, m), n2[0] = m.x, n2[4] = y.x, n2[8] = g.x, n2[1] = m.y, n2[5] = y.y, n2[9] = g.y, n2[2] = m.z, n2[6] = y.z, n2[10] = g.z, this;
  }
  multiply(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t3, e2)) : this.multiplyMatrices(this, t3);
  }
  premultiply(t3) {
    return this.multiplyMatrices(t3, this);
  }
  multiplyMatrices(t3, e2) {
    const r2 = t3.elements, n2 = e2.elements, i2 = this.elements, s2 = r2[0], a2 = r2[4], o2 = r2[8], u2 = r2[12], h = r2[1], c2 = r2[5], l2 = r2[9], p2 = r2[13], f2 = r2[2], d2 = r2[6], m2 = r2[10], y2 = r2[14], g2 = r2[3], v = r2[7], x = r2[11], w = r2[15], b = n2[0], _ = n2[4], M = n2[8], E = n2[12], N = n2[1], S = n2[5], T = n2[9], O2 = n2[13], z2 = n2[2], A2 = n2[6], C2 = n2[10], R2 = n2[14], D2 = n2[3], k2 = n2[7], I2 = n2[11], L2 = n2[15];
    return i2[0] = s2 * b + a2 * N + o2 * z2 + u2 * D2, i2[4] = s2 * _ + a2 * S + o2 * A2 + u2 * k2, i2[8] = s2 * M + a2 * T + o2 * C2 + u2 * I2, i2[12] = s2 * E + a2 * O2 + o2 * R2 + u2 * L2, i2[1] = h * b + c2 * N + l2 * z2 + p2 * D2, i2[5] = h * _ + c2 * S + l2 * A2 + p2 * k2, i2[9] = h * M + c2 * T + l2 * C2 + p2 * I2, i2[13] = h * E + c2 * O2 + l2 * R2 + p2 * L2, i2[2] = f2 * b + d2 * N + m2 * z2 + y2 * D2, i2[6] = f2 * _ + d2 * S + m2 * A2 + y2 * k2, i2[10] = f2 * M + d2 * T + m2 * C2 + y2 * I2, i2[14] = f2 * E + d2 * O2 + m2 * R2 + y2 * L2, i2[3] = g2 * b + v * N + x * z2 + w * D2, i2[7] = g2 * _ + v * S + x * A2 + w * k2, i2[11] = g2 * M + v * T + x * C2 + w * I2, i2[15] = g2 * E + v * O2 + x * R2 + w * L2, this;
  }
  multiplyScalar(t3) {
    const e2 = this.elements;
    return e2[0] *= t3, e2[4] *= t3, e2[8] *= t3, e2[12] *= t3, e2[1] *= t3, e2[5] *= t3, e2[9] *= t3, e2[13] *= t3, e2[2] *= t3, e2[6] *= t3, e2[10] *= t3, e2[14] *= t3, e2[3] *= t3, e2[7] *= t3, e2[11] *= t3, e2[15] *= t3, this;
  }
  determinant() {
    const t3 = this.elements, e2 = t3[0], r2 = t3[4], n2 = t3[8], i2 = t3[12], s2 = t3[1], a2 = t3[5], o2 = t3[9], u2 = t3[13], h = t3[2], c2 = t3[6], l2 = t3[10], p2 = t3[14];
    return t3[3] * (+i2 * o2 * c2 - n2 * u2 * c2 - i2 * a2 * l2 + r2 * u2 * l2 + n2 * a2 * p2 - r2 * o2 * p2) + t3[7] * (+e2 * o2 * p2 - e2 * u2 * l2 + i2 * s2 * l2 - n2 * s2 * p2 + n2 * u2 * h - i2 * o2 * h) + t3[11] * (+e2 * u2 * c2 - e2 * a2 * p2 - i2 * s2 * c2 + r2 * s2 * p2 + i2 * a2 * h - r2 * u2 * h) + t3[15] * (-n2 * a2 * h - e2 * o2 * c2 + e2 * a2 * l2 + n2 * s2 * c2 - r2 * s2 * l2 + r2 * o2 * h);
  }
  transpose() {
    const t3 = this.elements;
    let e2;
    return e2 = t3[1], t3[1] = t3[4], t3[4] = e2, e2 = t3[2], t3[2] = t3[8], t3[8] = e2, e2 = t3[6], t3[6] = t3[9], t3[9] = e2, e2 = t3[3], t3[3] = t3[12], t3[12] = e2, e2 = t3[7], t3[7] = t3[13], t3[13] = e2, e2 = t3[11], t3[11] = t3[14], t3[14] = e2, this;
  }
  setPosition(t3, e2, r2) {
    const n2 = this.elements;
    return t3.isVector3 ? (n2[12] = t3.x, n2[13] = t3.y, n2[14] = t3.z) : (n2[12] = t3, n2[13] = e2, n2[14] = r2), this;
  }
  getInverse(t3, e2) {
    e2 !== void 0 && console.warn("THREE.Matrix4: .getInverse() can no longer be configured to throw on degenerate.");
    const r2 = this.elements, n2 = t3.elements, i2 = n2[0], s2 = n2[1], a2 = n2[2], o2 = n2[3], u2 = n2[4], h = n2[5], c2 = n2[6], l2 = n2[7], p2 = n2[8], f2 = n2[9], d2 = n2[10], m2 = n2[11], y2 = n2[12], g2 = n2[13], v = n2[14], x = n2[15], w = f2 * v * l2 - g2 * d2 * l2 + g2 * c2 * m2 - h * v * m2 - f2 * c2 * x + h * d2 * x, b = y2 * d2 * l2 - p2 * v * l2 - y2 * c2 * m2 + u2 * v * m2 + p2 * c2 * x - u2 * d2 * x, _ = p2 * g2 * l2 - y2 * f2 * l2 + y2 * h * m2 - u2 * g2 * m2 - p2 * h * x + u2 * f2 * x, M = y2 * f2 * c2 - p2 * g2 * c2 - y2 * h * d2 + u2 * g2 * d2 + p2 * h * v - u2 * f2 * v, E = i2 * w + s2 * b + a2 * _ + o2 * M;
    if (E === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const N = 1 / E;
    return r2[0] = w * N, r2[1] = (g2 * d2 * o2 - f2 * v * o2 - g2 * a2 * m2 + s2 * v * m2 + f2 * a2 * x - s2 * d2 * x) * N, r2[2] = (h * v * o2 - g2 * c2 * o2 + g2 * a2 * l2 - s2 * v * l2 - h * a2 * x + s2 * c2 * x) * N, r2[3] = (f2 * c2 * o2 - h * d2 * o2 - f2 * a2 * l2 + s2 * d2 * l2 + h * a2 * m2 - s2 * c2 * m2) * N, r2[4] = b * N, r2[5] = (p2 * v * o2 - y2 * d2 * o2 + y2 * a2 * m2 - i2 * v * m2 - p2 * a2 * x + i2 * d2 * x) * N, r2[6] = (y2 * c2 * o2 - u2 * v * o2 - y2 * a2 * l2 + i2 * v * l2 + u2 * a2 * x - i2 * c2 * x) * N, r2[7] = (u2 * d2 * o2 - p2 * c2 * o2 + p2 * a2 * l2 - i2 * d2 * l2 - u2 * a2 * m2 + i2 * c2 * m2) * N, r2[8] = _ * N, r2[9] = (y2 * f2 * o2 - p2 * g2 * o2 - y2 * s2 * m2 + i2 * g2 * m2 + p2 * s2 * x - i2 * f2 * x) * N, r2[10] = (u2 * g2 * o2 - y2 * h * o2 + y2 * s2 * l2 - i2 * g2 * l2 - u2 * s2 * x + i2 * h * x) * N, r2[11] = (p2 * h * o2 - u2 * f2 * o2 - p2 * s2 * l2 + i2 * f2 * l2 + u2 * s2 * m2 - i2 * h * m2) * N, r2[12] = M * N, r2[13] = (p2 * g2 * a2 - y2 * f2 * a2 + y2 * s2 * d2 - i2 * g2 * d2 - p2 * s2 * v + i2 * f2 * v) * N, r2[14] = (y2 * h * a2 - u2 * g2 * a2 - y2 * s2 * c2 + i2 * g2 * c2 + u2 * s2 * v - i2 * h * v) * N, r2[15] = (u2 * f2 * a2 - p2 * h * a2 + p2 * s2 * c2 - i2 * f2 * c2 - u2 * s2 * d2 + i2 * h * d2) * N, this;
  }
  scale(t3) {
    const e2 = this.elements, r2 = t3.x, n2 = t3.y, i2 = t3.z;
    return e2[0] *= r2, e2[4] *= n2, e2[8] *= i2, e2[1] *= r2, e2[5] *= n2, e2[9] *= i2, e2[2] *= r2, e2[6] *= n2, e2[10] *= i2, e2[3] *= r2, e2[7] *= n2, e2[11] *= i2, this;
  }
  getMaxScaleOnAxis() {
    const t3 = this.elements, e2 = t3[0] * t3[0] + t3[1] * t3[1] + t3[2] * t3[2], r2 = t3[4] * t3[4] + t3[5] * t3[5] + t3[6] * t3[6], n2 = t3[8] * t3[8] + t3[9] * t3[9] + t3[10] * t3[10];
    return Math.sqrt(Math.max(e2, r2, n2));
  }
  makeTranslation(t3, e2, r2) {
    return this.set(1, 0, 0, t3, 0, 1, 0, e2, 0, 0, 1, r2, 0, 0, 0, 1), this;
  }
  makeRotationX(t3) {
    const e2 = Math.cos(t3), r2 = Math.sin(t3);
    return this.set(1, 0, 0, 0, 0, e2, -r2, 0, 0, r2, e2, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t3) {
    const e2 = Math.cos(t3), r2 = Math.sin(t3);
    return this.set(e2, 0, r2, 0, 0, 1, 0, 0, -r2, 0, e2, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t3) {
    const e2 = Math.cos(t3), r2 = Math.sin(t3);
    return this.set(e2, -r2, 0, 0, r2, e2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t3, e2) {
    const r2 = Math.cos(e2), n2 = Math.sin(e2), i2 = 1 - r2, s2 = t3.x, a2 = t3.y, o2 = t3.z, u2 = i2 * s2, h = i2 * a2;
    return this.set(u2 * s2 + r2, u2 * a2 - n2 * o2, u2 * o2 + n2 * a2, 0, u2 * a2 + n2 * o2, h * a2 + r2, h * o2 - n2 * s2, 0, u2 * o2 - n2 * a2, h * o2 + n2 * s2, i2 * o2 * o2 + r2, 0, 0, 0, 0, 1), this;
  }
  makeScale(t3, e2, r2) {
    return this.set(t3, 0, 0, 0, 0, e2, 0, 0, 0, 0, r2, 0, 0, 0, 0, 1), this;
  }
  makeShear(t3, e2, r2) {
    return this.set(1, e2, r2, 0, t3, 1, r2, 0, t3, e2, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t3, e2, r2) {
    const n2 = this.elements, i2 = e2._x, s2 = e2._y, a2 = e2._z, o2 = e2._w, u2 = i2 + i2, h = s2 + s2, c2 = a2 + a2, l2 = i2 * u2, p2 = i2 * h, f2 = i2 * c2, d2 = s2 * h, m2 = s2 * c2, y2 = a2 * c2, g2 = o2 * u2, v = o2 * h, x = o2 * c2, w = r2.x, b = r2.y, _ = r2.z;
    return n2[0] = (1 - (d2 + y2)) * w, n2[1] = (p2 + x) * w, n2[2] = (f2 - v) * w, n2[3] = 0, n2[4] = (p2 - x) * b, n2[5] = (1 - (l2 + y2)) * b, n2[6] = (m2 + g2) * b, n2[7] = 0, n2[8] = (f2 + v) * _, n2[9] = (m2 - g2) * _, n2[10] = (1 - (l2 + d2)) * _, n2[11] = 0, n2[12] = t3.x, n2[13] = t3.y, n2[14] = t3.z, n2[15] = 1, this;
  }
  decompose(t3, e2, r2) {
    const n2 = this.elements;
    let i2 = l.set(n2[0], n2[1], n2[2]).length();
    const s2 = l.set(n2[4], n2[5], n2[6]).length(), a2 = l.set(n2[8], n2[9], n2[10]).length();
    this.determinant() < 0 && (i2 = -i2), t3.x = n2[12], t3.y = n2[13], t3.z = n2[14], p.copy(this);
    const o2 = 1 / i2, u2 = 1 / s2, h = 1 / a2;
    return p.elements[0] *= o2, p.elements[1] *= o2, p.elements[2] *= o2, p.elements[4] *= u2, p.elements[5] *= u2, p.elements[6] *= u2, p.elements[8] *= h, p.elements[9] *= h, p.elements[10] *= h, e2.setFromRotationMatrix(p), r2.x = i2, r2.y = s2, r2.z = a2, this;
  }
  makePerspective(t3, e2, r2, n2, i2, s2) {
    s2 === void 0 && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
    const a2 = this.elements, o2 = 2 * i2 / (e2 - t3), u2 = 2 * i2 / (r2 - n2), h = (e2 + t3) / (e2 - t3), c2 = (r2 + n2) / (r2 - n2), l2 = -(s2 + i2) / (s2 - i2), p2 = -2 * s2 * i2 / (s2 - i2);
    return a2[0] = o2, a2[4] = 0, a2[8] = h, a2[12] = 0, a2[1] = 0, a2[5] = u2, a2[9] = c2, a2[13] = 0, a2[2] = 0, a2[6] = 0, a2[10] = l2, a2[14] = p2, a2[3] = 0, a2[7] = 0, a2[11] = -1, a2[15] = 0, this;
  }
  makeOrthographic(t3, e2, r2, n2, i2, s2) {
    const a2 = this.elements, o2 = 1 / (e2 - t3), u2 = 1 / (r2 - n2), h = 1 / (s2 - i2), c2 = (e2 + t3) * o2, l2 = (r2 + n2) * u2, p2 = (s2 + i2) * h;
    return a2[0] = 2 * o2, a2[4] = 0, a2[8] = 0, a2[12] = -c2, a2[1] = 0, a2[5] = 2 * u2, a2[9] = 0, a2[13] = -l2, a2[2] = 0, a2[6] = 0, a2[10] = -2 * h, a2[14] = -p2, a2[3] = 0, a2[7] = 0, a2[11] = 0, a2[15] = 1, this;
  }
  equals(t3) {
    const e2 = this.elements, r2 = t3.elements;
    for (let n2 = 0; n2 < 16; n2++)
      if (e2[n2] !== r2[n2])
        return false;
    return true;
  }
  fromArray(t3, e2 = 0) {
    for (let r2 = 0; r2 < 16; r2++)
      this.elements[r2] = t3[r2 + e2];
    return this;
  }
  toArray(t3 = [], e2 = 0) {
    const r2 = this.elements;
    return t3[e2] = r2[0], t3[e2 + 1] = r2[1], t3[e2 + 2] = r2[2], t3[e2 + 3] = r2[3], t3[e2 + 4] = r2[4], t3[e2 + 5] = r2[5], t3[e2 + 6] = r2[6], t3[e2 + 7] = r2[7], t3[e2 + 8] = r2[8], t3[e2 + 9] = r2[9], t3[e2 + 10] = r2[10], t3[e2 + 11] = r2[11], t3[e2 + 12] = r2[12], t3[e2 + 13] = r2[13], t3[e2 + 14] = r2[14], t3[e2 + 15] = r2[15], t3;
  }
}
const l = new a(), p = new c(), f = new a(0, 0, 0), d = new a(1, 1, 1), m = new a(), y = new a(), g = new a();
new c();
new s();
const O = new e();
class z {
  constructor(t3, r2) {
    Object.defineProperty(this, "isBox2", {value: true}), this.min = t3 !== void 0 ? t3 : new e(1 / 0, 1 / 0), this.max = r2 !== void 0 ? r2 : new e(-1 / 0, -1 / 0);
  }
  set(t3, e2) {
    return this.min.copy(t3), this.max.copy(e2), this;
  }
  setFromPoints(t3) {
    this.makeEmpty();
    for (let e2 = 0, r2 = t3.length; e2 < r2; e2++)
      this.expandByPoint(t3[e2]);
    return this;
  }
  setFromCenterAndSize(t3, e2) {
    const r2 = O.copy(e2).multiplyScalar(0.5);
    return this.min.copy(t3).sub(r2), this.max.copy(t3).add(r2), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t3) {
    return this.min.copy(t3.min), this.max.copy(t3.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y;
  }
  getCenter(t3) {
    return t3 === void 0 && (console.warn("THREE.Box2: .getCenter() target is now required"), t3 = new e()), this.isEmpty() ? t3.set(0, 0) : t3.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t3) {
    return t3 === void 0 && (console.warn("THREE.Box2: .getSize() target is now required"), t3 = new e()), this.isEmpty() ? t3.set(0, 0) : t3.subVectors(this.max, this.min);
  }
  expandByPoint(t3) {
    return this.min.min(t3), this.max.max(t3), this;
  }
  expandByVector(t3) {
    return this.min.sub(t3), this.max.add(t3), this;
  }
  expandByScalar(t3) {
    return this.min.addScalar(-t3), this.max.addScalar(t3), this;
  }
  containsPoint(t3) {
    return !(t3.x < this.min.x || t3.x > this.max.x || t3.y < this.min.y || t3.y > this.max.y);
  }
  containsBox(t3) {
    return this.min.x <= t3.min.x && t3.max.x <= this.max.x && this.min.y <= t3.min.y && t3.max.y <= this.max.y;
  }
  getParameter(t3, r2) {
    return r2 === void 0 && (console.warn("THREE.Box2: .getParameter() target is now required"), r2 = new e()), r2.set((t3.x - this.min.x) / (this.max.x - this.min.x), (t3.y - this.min.y) / (this.max.y - this.min.y));
  }
  intersectsBox(t3) {
    return !(t3.max.x < this.min.x || t3.min.x > this.max.x || t3.max.y < this.min.y || t3.min.y > this.max.y);
  }
  clampPoint(t3, r2) {
    return r2 === void 0 && (console.warn("THREE.Box2: .clampPoint() target is now required"), r2 = new e()), r2.copy(t3).clamp(this.min, this.max);
  }
  distanceToPoint(t3) {
    return O.copy(t3).clamp(this.min, this.max).sub(t3).length();
  }
  intersect(t3) {
    return this.min.max(t3.min), this.max.min(t3.max), this;
  }
  union(t3) {
    return this.min.min(t3.min), this.max.max(t3.max), this;
  }
  translate(t3) {
    return this.min.add(t3), this.max.add(t3), this;
  }
  equals(t3) {
    return t3.min.equals(this.min) && t3.max.equals(this.max);
  }
}
class A {
  constructor(t3, e2) {
    Object.defineProperty(this, "isBox3", {value: true}), this.min = t3 !== void 0 ? t3 : new a(1 / 0, 1 / 0, 1 / 0), this.max = e2 !== void 0 ? e2 : new a(-1 / 0, -1 / 0, -1 / 0);
  }
  set(t3, e2) {
    return this.min.copy(t3), this.max.copy(e2), this;
  }
  setFromArray(t3) {
    let e2 = 1 / 0, r2 = 1 / 0, n2 = 1 / 0, i2 = -1 / 0, s2 = -1 / 0, a2 = -1 / 0;
    for (let o2 = 0, u2 = t3.length; o2 < u2; o2 += 3) {
      const u3 = t3[o2], h = t3[o2 + 1], c2 = t3[o2 + 2];
      u3 < e2 && (e2 = u3), h < r2 && (r2 = h), c2 < n2 && (n2 = c2), u3 > i2 && (i2 = u3), h > s2 && (s2 = h), c2 > a2 && (a2 = c2);
    }
    return this.min.set(e2, r2, n2), this.max.set(i2, s2, a2), this;
  }
  setFromBufferAttribute(t3) {
    let e2 = 1 / 0, r2 = 1 / 0, n2 = 1 / 0, i2 = -1 / 0, s2 = -1 / 0, a2 = -1 / 0;
    for (let o2 = 0, u2 = t3.count; o2 < u2; o2++) {
      const u3 = t3.getX(o2), h = t3.getY(o2), c2 = t3.getZ(o2);
      u3 < e2 && (e2 = u3), h < r2 && (r2 = h), c2 < n2 && (n2 = c2), u3 > i2 && (i2 = u3), h > s2 && (s2 = h), c2 > a2 && (a2 = c2);
    }
    return this.min.set(e2, r2, n2), this.max.set(i2, s2, a2), this;
  }
  setFromPoints(t3) {
    this.makeEmpty();
    for (let e2 = 0, r2 = t3.length; e2 < r2; e2++)
      this.expandByPoint(t3[e2]);
    return this;
  }
  setFromCenterAndSize(t3, e2) {
    const r2 = D.copy(e2).multiplyScalar(0.5);
    return this.min.copy(t3).sub(r2), this.max.copy(t3).add(r2), this;
  }
  setFromObject(t3) {
    return this.makeEmpty(), this.expandByObject(t3);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t3) {
    return this.min.copy(t3.min), this.max.copy(t3.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t3) {
    return t3 === void 0 && (console.warn("THREE.Box3: .getCenter() target is now required"), t3 = new a()), this.isEmpty() ? t3.set(0, 0, 0) : t3.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t3) {
    return t3 === void 0 && (console.warn("THREE.Box3: .getSize() target is now required"), t3 = new a()), this.isEmpty() ? t3.set(0, 0, 0) : t3.subVectors(this.max, this.min);
  }
  expandByPoint(t3) {
    return this.min.min(t3), this.max.max(t3), this;
  }
  expandByVector(t3) {
    return this.min.sub(t3), this.max.add(t3), this;
  }
  expandByScalar(t3) {
    return this.min.addScalar(-t3), this.max.addScalar(t3), this;
  }
  expandByObject(t3) {
    t3.updateWorldMatrix(false, false);
    const e2 = t3.geometry;
    e2 !== void 0 && (e2.boundingBox === null && e2.computeBoundingBox(), k.copy(e2.boundingBox), k.applyMatrix4(t3.matrixWorld), this.union(k));
    const r2 = t3.children;
    for (let n2 = 0, i2 = r2.length; n2 < i2; n2++)
      this.expandByObject(r2[n2]);
    return this;
  }
  containsPoint(t3) {
    return !(t3.x < this.min.x || t3.x > this.max.x || t3.y < this.min.y || t3.y > this.max.y || t3.z < this.min.z || t3.z > this.max.z);
  }
  containsBox(t3) {
    return this.min.x <= t3.min.x && t3.max.x <= this.max.x && this.min.y <= t3.min.y && t3.max.y <= this.max.y && this.min.z <= t3.min.z && t3.max.z <= this.max.z;
  }
  getParameter(t3, e2) {
    return e2 === void 0 && (console.warn("THREE.Box3: .getParameter() target is now required"), e2 = new a()), e2.set((t3.x - this.min.x) / (this.max.x - this.min.x), (t3.y - this.min.y) / (this.max.y - this.min.y), (t3.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(t3) {
    return !(t3.max.x < this.min.x || t3.min.x > this.max.x || t3.max.y < this.min.y || t3.min.y > this.max.y || t3.max.z < this.min.z || t3.min.z > this.max.z);
  }
  intersectsSphere(t3) {
    return this.clampPoint(t3.center, D), D.distanceToSquared(t3.center) <= t3.radius * t3.radius;
  }
  intersectsPlane(t3) {
    let e2, r2;
    return t3.normal.x > 0 ? (e2 = t3.normal.x * this.min.x, r2 = t3.normal.x * this.max.x) : (e2 = t3.normal.x * this.max.x, r2 = t3.normal.x * this.min.x), t3.normal.y > 0 ? (e2 += t3.normal.y * this.min.y, r2 += t3.normal.y * this.max.y) : (e2 += t3.normal.y * this.max.y, r2 += t3.normal.y * this.min.y), t3.normal.z > 0 ? (e2 += t3.normal.z * this.min.z, r2 += t3.normal.z * this.max.z) : (e2 += t3.normal.z * this.max.z, r2 += t3.normal.z * this.min.z), e2 <= -t3.constant && r2 >= -t3.constant;
  }
  intersectsTriangle(t3) {
    if (this.isEmpty())
      return false;
    this.getCenter(j), q.subVectors(this.max, j), I.subVectors(t3.a, j), L.subVectors(t3.b, j), B.subVectors(t3.c, j), F.subVectors(L, I), P.subVectors(B, L), U.subVectors(I, B);
    let e2 = [0, -F.z, F.y, 0, -P.z, P.y, 0, -U.z, U.y, F.z, 0, -F.x, P.z, 0, -P.x, U.z, 0, -U.x, -F.y, F.x, 0, -P.y, P.x, 0, -U.y, U.x, 0];
    return !!C(e2, I, L, B, q) && (e2 = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!C(e2, I, L, B, q) && (H.crossVectors(F, P), e2 = [H.x, H.y, H.z], C(e2, I, L, B, q)));
  }
  clampPoint(t3, e2) {
    return e2 === void 0 && (console.warn("THREE.Box3: .clampPoint() target is now required"), e2 = new a()), e2.copy(t3).clamp(this.min, this.max);
  }
  distanceToPoint(t3) {
    return D.copy(t3).clamp(this.min, this.max).sub(t3).length();
  }
  getBoundingSphere(t3) {
    return t3 === void 0 && console.error("THREE.Box3: .getBoundingSphere() target is now required"), this.getCenter(t3.center), t3.radius = 0.5 * this.getSize(D).length(), t3;
  }
  intersect(t3) {
    return this.min.max(t3.min), this.max.min(t3.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t3) {
    return this.min.min(t3.min), this.max.max(t3.max), this;
  }
  applyMatrix4(t3) {
    return this.isEmpty() || (R[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t3), R[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t3), R[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t3), R[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t3), R[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t3), R[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t3), R[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t3), R[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t3), this.setFromPoints(R)), this;
  }
  translate(t3) {
    return this.min.add(t3), this.max.add(t3), this;
  }
  equals(t3) {
    return t3.min.equals(this.min) && t3.max.equals(this.max);
  }
}
function C(t3, e2, r2, n2, i2) {
  for (let s2 = 0, a2 = t3.length - 3; s2 <= a2; s2 += 3) {
    V.fromArray(t3, s2);
    const a3 = i2.x * Math.abs(V.x) + i2.y * Math.abs(V.y) + i2.z * Math.abs(V.z), o2 = e2.dot(V), u2 = r2.dot(V), h = n2.dot(V);
    if (Math.max(-Math.max(o2, u2, h), Math.min(o2, u2, h)) > a3)
      return false;
  }
  return true;
}
const R = [new a(), new a(), new a(), new a(), new a(), new a(), new a(), new a()], D = new a(), k = new A(), I = new a(), L = new a(), B = new a(), F = new a(), P = new a(), U = new a(), j = new a(), q = new a(), H = new a(), V = new a();
new a();
new a();
new a();
new a();
new a();
new a();
new a();
new a();
new a();
class rt {
  constructor() {
    Object.defineProperty(this, "isMatrix3", {value: true}), this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
  }
  set(t3, e2, r2, n2, i2, s2, a2, o2, u2) {
    const h = this.elements;
    return h[0] = t3, h[1] = n2, h[2] = a2, h[3] = e2, h[4] = i2, h[5] = o2, h[6] = r2, h[7] = s2, h[8] = u2, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
  copy(t3) {
    const e2 = this.elements, r2 = t3.elements;
    return e2[0] = r2[0], e2[1] = r2[1], e2[2] = r2[2], e2[3] = r2[3], e2[4] = r2[4], e2[5] = r2[5], e2[6] = r2[6], e2[7] = r2[7], e2[8] = r2[8], this;
  }
  extractBasis(t3, e2, r2) {
    return t3.setFromMatrix3Column(this, 0), e2.setFromMatrix3Column(this, 1), r2.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t3) {
    const e2 = t3.elements;
    return this.set(e2[0], e2[4], e2[8], e2[1], e2[5], e2[9], e2[2], e2[6], e2[10]), this;
  }
  multiply(t3) {
    return this.multiplyMatrices(this, t3);
  }
  premultiply(t3) {
    return this.multiplyMatrices(t3, this);
  }
  multiplyMatrices(t3, e2) {
    const r2 = t3.elements, n2 = e2.elements, i2 = this.elements, s2 = r2[0], a2 = r2[3], o2 = r2[6], u2 = r2[1], h = r2[4], c2 = r2[7], l2 = r2[2], p2 = r2[5], f2 = r2[8], d2 = n2[0], m2 = n2[3], y2 = n2[6], g2 = n2[1], v = n2[4], x = n2[7], w = n2[2], b = n2[5], _ = n2[8];
    return i2[0] = s2 * d2 + a2 * g2 + o2 * w, i2[3] = s2 * m2 + a2 * v + o2 * b, i2[6] = s2 * y2 + a2 * x + o2 * _, i2[1] = u2 * d2 + h * g2 + c2 * w, i2[4] = u2 * m2 + h * v + c2 * b, i2[7] = u2 * y2 + h * x + c2 * _, i2[2] = l2 * d2 + p2 * g2 + f2 * w, i2[5] = l2 * m2 + p2 * v + f2 * b, i2[8] = l2 * y2 + p2 * x + f2 * _, this;
  }
  multiplyScalar(t3) {
    const e2 = this.elements;
    return e2[0] *= t3, e2[3] *= t3, e2[6] *= t3, e2[1] *= t3, e2[4] *= t3, e2[7] *= t3, e2[2] *= t3, e2[5] *= t3, e2[8] *= t3, this;
  }
  determinant() {
    const t3 = this.elements, e2 = t3[0], r2 = t3[1], n2 = t3[2], i2 = t3[3], s2 = t3[4], a2 = t3[5], o2 = t3[6], u2 = t3[7], h = t3[8];
    return e2 * s2 * h - e2 * a2 * u2 - r2 * i2 * h + r2 * a2 * o2 + n2 * i2 * u2 - n2 * s2 * o2;
  }
  getInverse(t3, e2) {
    e2 !== void 0 && console.warn("THREE.Matrix3: .getInverse() can no longer be configured to throw on degenerate.");
    const r2 = t3.elements, n2 = this.elements, i2 = r2[0], s2 = r2[1], a2 = r2[2], o2 = r2[3], u2 = r2[4], h = r2[5], c2 = r2[6], l2 = r2[7], p2 = r2[8], f2 = p2 * u2 - h * l2, d2 = h * c2 - p2 * o2, m2 = l2 * o2 - u2 * c2, y2 = i2 * f2 + s2 * d2 + a2 * m2;
    if (y2 === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const g2 = 1 / y2;
    return n2[0] = f2 * g2, n2[1] = (a2 * l2 - p2 * s2) * g2, n2[2] = (h * s2 - a2 * u2) * g2, n2[3] = d2 * g2, n2[4] = (p2 * i2 - a2 * c2) * g2, n2[5] = (a2 * o2 - h * i2) * g2, n2[6] = m2 * g2, n2[7] = (s2 * c2 - l2 * i2) * g2, n2[8] = (u2 * i2 - s2 * o2) * g2, this;
  }
  transpose() {
    let t3;
    const e2 = this.elements;
    return t3 = e2[1], e2[1] = e2[3], e2[3] = t3, t3 = e2[2], e2[2] = e2[6], e2[6] = t3, t3 = e2[5], e2[5] = e2[7], e2[7] = t3, this;
  }
  getNormalMatrix(t3) {
    return this.setFromMatrix4(t3).getInverse(this).transpose();
  }
  transposeIntoArray(t3) {
    const e2 = this.elements;
    return t3[0] = e2[0], t3[1] = e2[3], t3[2] = e2[6], t3[3] = e2[1], t3[4] = e2[4], t3[5] = e2[7], t3[6] = e2[2], t3[7] = e2[5], t3[8] = e2[8], this;
  }
  setUvTransform(t3, e2, r2, n2, i2, s2, a2) {
    const o2 = Math.cos(i2), u2 = Math.sin(i2);
    this.set(r2 * o2, r2 * u2, -r2 * (o2 * s2 + u2 * a2) + s2 + t3, -n2 * u2, n2 * o2, -n2 * (-u2 * s2 + o2 * a2) + a2 + e2, 0, 0, 1);
  }
  scale(t3, e2) {
    const r2 = this.elements;
    return r2[0] *= t3, r2[3] *= t3, r2[6] *= t3, r2[1] *= e2, r2[4] *= e2, r2[7] *= e2, this;
  }
  rotate(t3) {
    const e2 = Math.cos(t3), r2 = Math.sin(t3), n2 = this.elements, i2 = n2[0], s2 = n2[3], a2 = n2[6], o2 = n2[1], u2 = n2[4], h = n2[7];
    return n2[0] = e2 * i2 + r2 * o2, n2[3] = e2 * s2 + r2 * u2, n2[6] = e2 * a2 + r2 * h, n2[1] = -r2 * i2 + e2 * o2, n2[4] = -r2 * s2 + e2 * u2, n2[7] = -r2 * a2 + e2 * h, this;
  }
  translate(t3, e2) {
    const r2 = this.elements;
    return r2[0] += t3 * r2[2], r2[3] += t3 * r2[5], r2[6] += t3 * r2[8], r2[1] += e2 * r2[2], r2[4] += e2 * r2[5], r2[7] += e2 * r2[8], this;
  }
  equals(t3) {
    const e2 = this.elements, r2 = t3.elements;
    for (let n2 = 0; n2 < 9; n2++)
      if (e2[n2] !== r2[n2])
        return false;
    return true;
  }
  fromArray(t3, e2 = 0) {
    for (let r2 = 0; r2 < 9; r2++)
      this.elements[r2] = t3[r2 + e2];
    return this;
  }
  toArray(t3 = [], e2 = 0) {
    const r2 = this.elements;
    return t3[e2] = r2[0], t3[e2 + 1] = r2[1], t3[e2 + 2] = r2[2], t3[e2 + 3] = r2[3], t3[e2 + 4] = r2[4], t3[e2 + 5] = r2[5], t3[e2 + 6] = r2[6], t3[e2 + 7] = r2[7], t3[e2 + 8] = r2[8], t3;
  }
}
new a();
new a();
new rt();
Object.freeze(new e(0, 0));
Object.freeze(new e(1, 1));
Object.freeze(new a(0, 0, 0));
Object.freeze(new a(1, 0, 0));
Object.freeze(new a(0, 1, 0));
Object.freeze(new a(0, 0, 1));
Object.freeze(new a(1, 1, 1));
Object.freeze(new s());
({RIGHT: Object.freeze(new a(1, 0, 0)), UP: Object.freeze(new a(0, 1, 0)), NEAR: Object.freeze(new a(0, 0, 1)), LEFT: Object.freeze(new a(-1, 0, 0)), DOWN: Object.freeze(new a(0, -1, 0)), FAR: Object.freeze(new a(0, 0, -1))});
new a();
(() => {
  const t3 = 2 * Math.PI, e2 = new a(0, 0, 1), r2 = new s(), n2 = new s(), i2 = new a(), o2 = new s();
  return function(s2 = 1, a2 = 1) {
    var u2 = (Math.random() - 0.5) * t3 * s2, h = Math.random() * t3, c2 = Math.random() * Math.PI * a2;
    return i2.set(1, 0, 0).applyAxisAngle(e2, h), r2.setFromAxisAngle(e2, u2), n2.setFromAxisAngle(i2, c2), o2.multiplyQuaternions(n2, r2);
  };
})();
(() => {
  const t3 = new a();
  return function(e2, r2, n2) {
    const i2 = t3.set(e2.x, e2.y, e2.z), s2 = r2.dot(i2), a2 = t3.copy(r2).multiplyScalar(s2), o2 = n2.set(a2.x, a2.y, a2.z, e2.w).normalize();
    return s2 < 0 && (o2.x = -o2.x, o2.y = -o2.y, o2.z = -o2.z, o2.w = -o2.w), o2;
  };
})();
new z(), new z(), new e(), new e();
new a(), new a(), new a(), new a(), new a(), new a(), new a();
var Xt = function(t3) {
  return function(e2) {
    return 1 - t3(1 - e2);
  };
}, Qt = function(t3) {
  return function(e2) {
    return e2 <= 0.5 ? t3(2 * e2) / 2 : (2 - t3(2 * (1 - e2))) / 2;
  };
}, Jt = Xt, Kt = Qt, te = function(t3) {
  return function(e2) {
    return Math.pow(e2, t3);
  };
}, ee = function(t3) {
  return function(e2) {
    return e2 * e2 * ((t3 + 1) * e2 - t3);
  };
}, re = function(t3) {
  var e2 = ee(t3);
  return function(t4) {
    return (t4 *= 2) < 1 ? 0.5 * e2(t4) : 0.5 * (2 - Math.pow(2, -10 * (t4 - 1)));
  };
}, ne = te(2), ie = Xt(ne), se = Qt(ne), ae = function(t3) {
  return 1 - Math.sin(Math.acos(t3));
}, oe = Xt(ae), ue = Qt(oe), he = ee(1.525), ce = Xt(he), le = Qt(he), pe = re(1.525), fe = function(t3) {
  var e2 = t3 * t3;
  return t3 < 0.36363636363636365 ? 7.5625 * e2 : t3 < 0.7272727272727273 ? 9.075 * e2 - 9.9 * t3 + 3.4 : t3 < 0.9 ? 12.066481994459833 * e2 - 19.63545706371191 * t3 + 8.898060941828255 : 10.8 * t3 * t3 - 20.52 * t3 + 10.72;
}, de = typeof Float32Array != "undefined", me = function(t3, e2) {
  return 1 - 3 * e2 + 3 * t3;
}, ye = function(t3, e2) {
  return 3 * e2 - 6 * t3;
}, ge = function(t3) {
  return 3 * t3;
}, ve = function(t3, e2, r2) {
  return 3 * me(e2, r2) * t3 * t3 + 2 * ye(e2, r2) * t3 + ge(e2);
}, xe = function(t3, e2, r2) {
  return ((me(e2, r2) * t3 + ye(e2, r2)) * t3 + ge(e2)) * t3;
};
Object.freeze({__proto__: null, [Symbol.toStringTag]: "Module", reversed: Xt, mirrored: Qt, createReversedEasing: Jt, createMirroredEasing: Kt, createExpoIn: te, createBackIn: ee, createAnticipateEasing: re, linear: function(t3) {
  return t3;
}, easeIn: ne, easeOut: ie, easeInOut: se, circIn: ae, circOut: oe, circInOut: ue, backIn: he, backOut: ce, backInOut: le, anticipate: pe, bounceOut: fe, bounceIn: function(t3) {
  return 1 - fe(1 - t3);
}, bounceInOut: function(t3) {
  return t3 < 0.5 ? 0.5 * (1 - fe(1 - 2 * t3)) : 0.5 * fe(2 * t3 - 1) + 0.5;
}, cubicBezier: function(t3, e2, r2, n2) {
  var i2 = de ? new Float32Array(11) : new Array(11), s2 = function(e3) {
    for (var n3, s3, a2, o2 = 0, u2 = 1; u2 !== 10 && i2[u2] <= e3; ++u2)
      o2 += 0.1;
    return --u2, n3 = (e3 - i2[u2]) / (i2[u2 + 1] - i2[u2]), (a2 = ve(s3 = o2 + 0.1 * n3, t3, r2)) >= 1e-3 ? function(e4, n4) {
      for (var i3 = 0, s4 = 0; i3 < 8; ++i3) {
        if ((s4 = ve(n4, t3, r2)) === 0)
          return n4;
        n4 -= (xe(n4, t3, r2) - e4) / s4;
      }
      return n4;
    }(e3, s3) : a2 === 0 ? s3 : function(e4, n4, i3) {
      var s4, a3, o3 = 0;
      do {
        (s4 = xe(a3 = n4 + (i3 - n4) / 2, t3, r2) - e4) > 0 ? i3 = a3 : n4 = a3;
      } while (Math.abs(s4) > 1e-7 && ++o3 < 10);
      return a3;
    }(e3, o2, o2 + 0.1);
  };
  return function() {
    for (var e3 = 0; e3 < 11; ++e3)
      i2[e3] = xe(0.1 * e3, t3, r2);
  }(), function(i3) {
    return t3 === e2 && r2 === n2 ? i3 : i3 === 0 ? 0 : i3 === 1 ? 1 : xe(s2(i3), e2, n2);
  };
}});
function Te(t3) {
  return typeof t3 == "number";
}
function Oe(t3) {
  return t3 && t3.constructor.prototype.isBigNumber === true || false;
}
function ze(t3) {
  return t3 && typeof t3 == "object" && Object.getPrototypeOf(t3).isComplex === true || false;
}
function Ae(t3) {
  return t3 && typeof t3 == "object" && Object.getPrototypeOf(t3).isFraction === true || false;
}
function Ce(t3) {
  return t3 && t3.constructor.prototype.isUnit === true || false;
}
function Re(t3) {
  return typeof t3 == "string";
}
var De = Array.isArray;
function ke(t3) {
  return t3 && t3.constructor.prototype.isMatrix === true || false;
}
function Ie(t3) {
  return Array.isArray(t3) || ke(t3);
}
function Le(t3) {
  return t3 && t3.isDenseMatrix && t3.constructor.prototype.isMatrix === true || false;
}
function Be(t3) {
  return t3 && t3.isSparseMatrix && t3.constructor.prototype.isMatrix === true || false;
}
function Fe(t3) {
  return t3 && t3.constructor.prototype.isRange === true || false;
}
function Pe(t3) {
  return t3 && t3.constructor.prototype.isIndex === true || false;
}
function Ue(t3) {
  return typeof t3 == "boolean";
}
function je(t3) {
  return t3 && t3.constructor.prototype.isResultSet === true || false;
}
function qe(t3) {
  return t3 && t3.constructor.prototype.isHelp === true || false;
}
function He(t3) {
  return typeof t3 == "function";
}
function Ve(t3) {
  return t3 instanceof Date;
}
function $e(t3) {
  return t3 instanceof RegExp;
}
function Ge(t3) {
  return !(!t3 || typeof t3 != "object" || t3.constructor !== Object || ze(t3) || Ae(t3));
}
function We(t3) {
  return t3 === null;
}
function Ye(t3) {
  return t3 === void 0;
}
function Ze(t3) {
  return t3 && t3.isAccessorNode === true && t3.constructor.prototype.isNode === true || false;
}
function Xe(t3) {
  return t3 && t3.isArrayNode === true && t3.constructor.prototype.isNode === true || false;
}
function Qe(t3) {
  return t3 && t3.isAssignmentNode === true && t3.constructor.prototype.isNode === true || false;
}
function Je(t3) {
  return t3 && t3.isBlockNode === true && t3.constructor.prototype.isNode === true || false;
}
function Ke(t3) {
  return t3 && t3.isConditionalNode === true && t3.constructor.prototype.isNode === true || false;
}
function tr(t3) {
  return t3 && t3.isConstantNode === true && t3.constructor.prototype.isNode === true || false;
}
function er(t3) {
  return t3 && t3.isFunctionAssignmentNode === true && t3.constructor.prototype.isNode === true || false;
}
function rr(t3) {
  return t3 && t3.isFunctionNode === true && t3.constructor.prototype.isNode === true || false;
}
function nr(t3) {
  return t3 && t3.isIndexNode === true && t3.constructor.prototype.isNode === true || false;
}
function ir(t3) {
  return t3 && t3.isNode === true && t3.constructor.prototype.isNode === true || false;
}
function sr(t3) {
  return t3 && t3.isObjectNode === true && t3.constructor.prototype.isNode === true || false;
}
function ar(t3) {
  return t3 && t3.isOperatorNode === true && t3.constructor.prototype.isNode === true || false;
}
function or(t3) {
  return t3 && t3.isParenthesisNode === true && t3.constructor.prototype.isNode === true || false;
}
function ur(t3) {
  return t3 && t3.isRangeNode === true && t3.constructor.prototype.isNode === true || false;
}
function hr(t3) {
  return t3 && t3.isSymbolNode === true && t3.constructor.prototype.isNode === true || false;
}
function cr(t3) {
  return t3 && t3.constructor.prototype.isChain === true || false;
}
function lr(t3) {
  var e2 = typeof t3;
  return e2 === "object" ? t3 === null ? "null" : Array.isArray(t3) ? "Array" : t3 instanceof Date ? "Date" : t3 instanceof RegExp ? "RegExp" : Oe(t3) ? "BigNumber" : ze(t3) ? "Complex" : Ae(t3) ? "Fraction" : ke(t3) ? "Matrix" : Ce(t3) ? "Unit" : Pe(t3) ? "Index" : Fe(t3) ? "Range" : je(t3) ? "ResultSet" : ir(t3) ? t3.type : cr(t3) ? "Chain" : qe(t3) ? "Help" : "Object" : e2 === "function" ? "Function" : e2;
}
function pr(t3) {
  var e2 = typeof t3;
  if (e2 === "number" || e2 === "string" || e2 === "boolean" || t3 == null)
    return t3;
  if (typeof t3.clone == "function")
    return t3.clone();
  if (Array.isArray(t3))
    return t3.map(function(t4) {
      return pr(t4);
    });
  if (t3 instanceof Date)
    return new Date(t3.valueOf());
  if (Oe(t3))
    return t3;
  if (t3 instanceof RegExp)
    throw new TypeError("Cannot clone " + t3);
  return fr(t3, pr);
}
function fr(t3, e2) {
  var r2 = {};
  for (var n2 in t3)
    wr(t3, n2) && (r2[n2] = e2(t3[n2]));
  return r2;
}
function dr(t3, e2) {
  for (var r2 in e2)
    wr(e2, r2) && (t3[r2] = e2[r2]);
  return t3;
}
function yr(t3, e2) {
  var r2, n2, i2;
  if (Array.isArray(t3)) {
    if (!Array.isArray(e2))
      return false;
    if (t3.length !== e2.length)
      return false;
    for (n2 = 0, i2 = t3.length; n2 < i2; n2++)
      if (!yr(t3[n2], e2[n2]))
        return false;
    return true;
  }
  if (typeof t3 == "function")
    return t3 === e2;
  if (t3 instanceof Object) {
    if (Array.isArray(e2) || !(e2 instanceof Object))
      return false;
    for (r2 in t3)
      if (!(r2 in e2) || !yr(t3[r2], e2[r2]))
        return false;
    for (r2 in e2)
      if (!(r2 in t3) || !yr(t3[r2], e2[r2]))
        return false;
    return true;
  }
  return t3 === e2;
}
function wr(t3, e2) {
  return t3 && Object.hasOwnProperty.call(t3, e2);
}
var Sr = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function Tr(t3) {
  return t3 && t3.__esModule && Object.prototype.hasOwnProperty.call(t3, "default") ? t3.default : t3;
}
var zr = function() {
  function t3() {
    return true;
  }
  function e2() {
    return false;
  }
  function r2() {
  }
  function n2() {
    var i2 = [{name: "number", test: function(t4) {
      return typeof t4 == "number";
    }}, {name: "string", test: function(t4) {
      return typeof t4 == "string";
    }}, {name: "boolean", test: function(t4) {
      return typeof t4 == "boolean";
    }}, {name: "Function", test: function(t4) {
      return typeof t4 == "function";
    }}, {name: "Array", test: Array.isArray}, {name: "Date", test: function(t4) {
      return t4 instanceof Date;
    }}, {name: "RegExp", test: function(t4) {
      return t4 instanceof RegExp;
    }}, {name: "Object", test: function(t4) {
      return typeof t4 == "object" && t4 !== null && t4.constructor === Object;
    }}, {name: "null", test: function(t4) {
      return t4 === null;
    }}, {name: "undefined", test: function(t4) {
      return t4 === void 0;
    }}], s2 = {name: "any", test: t3}, a2 = [], o2 = [], u2 = {types: i2, conversions: o2, ignore: a2};
    function h(t4) {
      var e3 = Y(u2.types, function(e4) {
        return e4.name === t4;
      });
      if (e3)
        return e3;
      if (t4 === "any")
        return s2;
      var r3 = Y(u2.types, function(e4) {
        return e4.name.toLowerCase() === t4.toLowerCase();
      });
      throw new TypeError('Unknown type "' + t4 + '"' + (r3 ? '. Did you mean "' + r3.name + '"?' : ""));
    }
    function c2(t4) {
      return t4 === s2 ? 999 : u2.types.indexOf(t4);
    }
    function l2(t4) {
      var e3 = Y(u2.types, function(e4) {
        return e4.test(t4);
      });
      if (e3)
        return e3.name;
      throw new TypeError("Value has unknown type. Value: " + t4);
    }
    function p2(t4, e3) {
      if (!t4.signatures)
        throw new TypeError("Function is no typed-function");
      var r3;
      if (typeof e3 == "string") {
        r3 = e3.split(",");
        for (var n3 = 0; n3 < r3.length; n3++)
          r3[n3] = r3[n3].trim();
      } else {
        if (!Array.isArray(e3))
          throw new TypeError("String array or a comma separated string expected");
        r3 = e3;
      }
      var i3 = r3.join(","), s3 = t4.signatures[i3];
      if (s3)
        return s3;
      throw new TypeError("Signature not found (signature: " + (t4.name || "unnamed") + "(" + r3.join(", ") + "))");
    }
    function f2(t4, e3) {
      var r3 = l2(t4);
      if (e3 === r3)
        return t4;
      for (var n3 = 0; n3 < u2.conversions.length; n3++) {
        var i3 = u2.conversions[n3];
        if (i3.from === r3 && i3.to === e3)
          return i3.convert(t4);
      }
      throw new Error("Cannot convert from " + r3 + " to " + e3);
    }
    function d2(t4) {
      return t4.map(function(t5) {
        var e3 = t5.types.map(M);
        return (t5.restParam ? "..." : "") + e3.join("|");
      }).join(",");
    }
    function m2(t4, e3) {
      var r3 = t4.indexOf("...") === 0, n3 = (r3 ? t4.length > 3 ? t4.slice(3) : "any" : t4).split("|").map(P2).filter(U2).filter(F2), i3 = C2(e3, n3), s3 = n3.map(function(t5) {
        var e4 = h(t5);
        return {name: t5, typeIndex: c2(e4), test: e4.test, conversion: null, conversionIndex: -1};
      }), a3 = i3.map(function(t5) {
        var r4 = h(t5.from);
        return {name: t5.from, typeIndex: c2(r4), test: r4.test, conversion: t5, conversionIndex: e3.indexOf(t5)};
      });
      return {types: s3.concat(a3), restParam: r3};
    }
    function y2(t4, e3, r3) {
      var n3 = [];
      return t4.trim() !== "" && (n3 = t4.split(",").map(P2).map(function(t5, e4, n4) {
        var i3 = m2(t5, r3);
        if (i3.restParam && e4 !== n4.length - 1)
          throw new SyntaxError('Unexpected rest parameter "' + t5 + '": only allowed for the last parameter');
        return i3;
      })), n3.some(q2) ? null : {params: n3, fn: e3};
    }
    function g2(t4) {
      var e3 = V2(t4);
      return !!e3 && e3.restParam;
    }
    function v(t4) {
      return t4.types.some(function(t5) {
        return t5.conversion != null;
      });
    }
    function x(e3) {
      if (e3 && e3.types.length !== 0) {
        if (e3.types.length === 1)
          return h(e3.types[0].name).test;
        if (e3.types.length === 2) {
          var r3 = h(e3.types[0].name).test, n3 = h(e3.types[1].name).test;
          return function(t4) {
            return r3(t4) || n3(t4);
          };
        }
        var i3 = e3.types.map(function(t4) {
          return h(t4.name).test;
        });
        return function(t4) {
          for (var e4 = 0; e4 < i3.length; e4++)
            if (i3[e4](t4))
              return true;
          return false;
        };
      }
      return t3;
    }
    function w(t4) {
      var e3, r3, n3;
      if (g2(t4)) {
        var i3 = (e3 = H2(t4).map(x)).length, s3 = x(V2(t4)), a3 = function(t5) {
          for (var e4 = i3; e4 < t5.length; e4++)
            if (!s3(t5[e4]))
              return false;
          return true;
        };
        return function(t5) {
          for (var r4 = 0; r4 < e3.length; r4++)
            if (!e3[r4](t5[r4]))
              return false;
          return a3(t5) && t5.length >= i3 + 1;
        };
      }
      return t4.length === 0 ? function(t5) {
        return t5.length === 0;
      } : t4.length === 1 ? (r3 = x(t4[0]), function(t5) {
        return r3(t5[0]) && t5.length === 1;
      }) : t4.length === 2 ? (r3 = x(t4[0]), n3 = x(t4[1]), function(t5) {
        return r3(t5[0]) && n3(t5[1]) && t5.length === 2;
      }) : (e3 = t4.map(x), function(t5) {
        for (var r4 = 0; r4 < e3.length; r4++)
          if (!e3[r4](t5[r4]))
            return false;
        return t5.length === e3.length;
      });
    }
    function b(t4, e3) {
      return e3 < t4.params.length ? t4.params[e3] : g2(t4.params) ? V2(t4.params) : null;
    }
    function _(t4, e3, r3) {
      var n3 = b(t4, e3);
      return (n3 ? r3 ? n3.types.filter(E) : n3.types : []).map(M);
    }
    function M(t4) {
      return t4.name;
    }
    function E(t4) {
      return t4.conversion === null || t4.conversion === void 0;
    }
    function N(t4, e3) {
      var r3 = Z(X(t4, function(t5) {
        return _(t5, e3, false);
      }));
      return r3.indexOf("any") !== -1 ? ["any"] : r3;
    }
    function S(t4, e3, r3) {
      var n3, i3, s3, a3 = t4 || "unnamed", o3 = r3;
      for (s3 = 0; s3 < e3.length; s3++) {
        var u3 = o3.filter(function(t5) {
          var r4 = x(b(t5, s3));
          return (s3 < t5.params.length || g2(t5.params)) && r4(e3[s3]);
        });
        if (u3.length === 0) {
          if ((i3 = N(o3, s3)).length > 0) {
            var h2 = l2(e3[s3]);
            return (n3 = new TypeError("Unexpected type of argument in function " + a3 + " (expected: " + i3.join(" or ") + ", actual: " + h2 + ", index: " + s3 + ")")).data = {category: "wrongType", fn: a3, index: s3, actual: h2, expected: i3}, n3;
          }
        } else
          o3 = u3;
      }
      var c3 = o3.map(function(t5) {
        return g2(t5.params) ? 1 / 0 : t5.params.length;
      });
      if (e3.length < Math.min.apply(null, c3))
        return i3 = N(o3, s3), (n3 = new TypeError("Too few arguments in function " + a3 + " (expected: " + i3.join(" or ") + ", index: " + e3.length + ")")).data = {category: "tooFewArgs", fn: a3, index: e3.length, expected: i3}, n3;
      var p3 = Math.max.apply(null, c3);
      return e3.length > p3 ? ((n3 = new TypeError("Too many arguments in function " + a3 + " (expected: " + p3 + ", actual: " + e3.length + ")")).data = {category: "tooManyArgs", fn: a3, index: e3.length, expectedLength: p3}, n3) : ((n3 = new TypeError('Arguments of type "' + e3.join(", ") + '" do not match any of the defined signatures of function ' + a3 + ".")).data = {category: "mismatch", actual: e3.map(l2)}, n3);
    }
    function T(t4) {
      for (var e3 = 999, r3 = 0; r3 < t4.types.length; r3++)
        E(t4.types[r3]) && (e3 = Math.min(e3, t4.types[r3].typeIndex));
      return e3;
    }
    function O2(t4) {
      for (var e3 = 999, r3 = 0; r3 < t4.types.length; r3++)
        E(t4.types[r3]) || (e3 = Math.min(e3, t4.types[r3].conversionIndex));
      return e3;
    }
    function z2(t4, e3) {
      var r3;
      return (r3 = t4.restParam - e3.restParam) != 0 || (r3 = v(t4) - v(e3)) != 0 || (r3 = T(t4) - T(e3)) != 0 ? r3 : O2(t4) - O2(e3);
    }
    function A2(t4, e3) {
      var r3, n3, i3 = Math.min(t4.params.length, e3.params.length);
      if ((n3 = t4.params.some(v) - e3.params.some(v)) != 0)
        return n3;
      for (r3 = 0; r3 < i3; r3++)
        if ((n3 = v(t4.params[r3]) - v(e3.params[r3])) != 0)
          return n3;
      for (r3 = 0; r3 < i3; r3++)
        if ((n3 = z2(t4.params[r3], e3.params[r3])) !== 0)
          return n3;
      return t4.params.length - e3.params.length;
    }
    function C2(t4, e3) {
      var r3 = {};
      return t4.forEach(function(t5) {
        e3.indexOf(t5.from) !== -1 || e3.indexOf(t5.to) === -1 || r3[t5.from] || (r3[t5.from] = t5);
      }), Object.keys(r3).map(function(t5) {
        return r3[t5];
      });
    }
    function R2(t4, e3) {
      var r3 = e3;
      if (t4.some(v)) {
        var n3 = g2(t4), i3 = t4.map(D2);
        r3 = function() {
          for (var t5 = [], r4 = n3 ? arguments.length - 1 : arguments.length, s4 = 0; s4 < r4; s4++)
            t5[s4] = i3[s4](arguments[s4]);
          return n3 && (t5[r4] = arguments[r4].map(i3[r4])), e3.apply(this, t5);
        };
      }
      var s3 = r3;
      if (g2(t4)) {
        var a3 = t4.length - 1;
        s3 = function() {
          return r3.apply(this, $(arguments, 0, a3).concat([$(arguments, a3)]));
        };
      }
      return s3;
    }
    function D2(t4) {
      var e3, r3, n3, i3, s3 = [], a3 = [];
      switch (t4.types.forEach(function(t5) {
        t5.conversion && (s3.push(h(t5.conversion.from).test), a3.push(t5.conversion.convert));
      }), a3.length) {
        case 0:
          return function(t5) {
            return t5;
          };
        case 1:
          return e3 = s3[0], n3 = a3[0], function(t5) {
            return e3(t5) ? n3(t5) : t5;
          };
        case 2:
          return e3 = s3[0], r3 = s3[1], n3 = a3[0], i3 = a3[1], function(t5) {
            return e3(t5) ? n3(t5) : r3(t5) ? i3(t5) : t5;
          };
        default:
          return function(t5) {
            for (var e4 = 0; e4 < a3.length; e4++)
              if (s3[e4](t5))
                return a3[e4](t5);
            return t5;
          };
      }
    }
    function k2(t4) {
      var e3 = {};
      return t4.forEach(function(t5) {
        t5.params.some(v) || I2(t5.params, true).forEach(function(r3) {
          e3[d2(r3)] = t5.fn;
        });
      }), e3;
    }
    function I2(t4, e3) {
      function r3(t5, n3, i3) {
        if (n3 < t5.length) {
          var s3, a3 = t5[n3], o3 = e3 ? a3.types.filter(E) : a3.types;
          if (a3.restParam) {
            var u3 = o3.filter(E);
            s3 = u3.length < o3.length ? [u3, o3] : [o3];
          } else
            s3 = o3.map(function(t6) {
              return [t6];
            });
          return X(s3, function(e4) {
            return r3(t5, n3 + 1, i3.concat([e4]));
          });
        }
        return [i3.map(function(e4, r4) {
          return {types: e4, restParam: r4 === t5.length - 1 && g2(t5)};
        })];
      }
      return r3(t4, 0, []);
    }
    function L2(t4, e3) {
      for (var r3 = Math.max(t4.params.length, e3.params.length), n3 = 0; n3 < r3; n3++)
        if (!W(_(t4, n3, true), _(e3, n3, true)))
          return false;
      var i3 = t4.params.length, s3 = e3.params.length, a3 = g2(t4.params), o3 = g2(e3.params);
      return a3 ? o3 ? i3 === s3 : s3 >= i3 : o3 ? i3 >= s3 : i3 === s3;
    }
    function B2(t4, n3) {
      if (Object.keys(n3).length === 0)
        throw new SyntaxError("No signatures provided");
      var i3 = [];
      Object.keys(n3).map(function(t5) {
        return y2(t5, n3[t5], u2.conversions);
      }).filter(j2).forEach(function(t5) {
        var e3 = Y(i3, function(e4) {
          return L2(e4, t5);
        });
        if (e3)
          throw new TypeError('Conflicting signatures "' + d2(e3.params) + '" and "' + d2(t5.params) + '".');
        i3.push(t5);
      });
      var s3 = X(i3, function(t5) {
        return (t5 ? I2(t5.params, false) : []).map(function(e3) {
          return {params: e3, fn: t5.fn};
        });
      }).filter(j2);
      s3.sort(A2);
      var a3 = s3[0] && s3[0].params.length <= 2 && !g2(s3[0].params), o3 = s3[1] && s3[1].params.length <= 2 && !g2(s3[1].params), h2 = s3[2] && s3[2].params.length <= 2 && !g2(s3[2].params), c3 = s3[3] && s3[3].params.length <= 2 && !g2(s3[3].params), l3 = s3[4] && s3[4].params.length <= 2 && !g2(s3[4].params), p3 = s3[5] && s3[5].params.length <= 2 && !g2(s3[5].params), f3 = a3 && o3 && h2 && c3 && l3 && p3, m3 = s3.map(function(t5) {
        return w(t5.params);
      }), v2 = a3 ? x(s3[0].params[0]) : e2, b2 = o3 ? x(s3[1].params[0]) : e2, _2 = h2 ? x(s3[2].params[0]) : e2, M2 = c3 ? x(s3[3].params[0]) : e2, E2 = l3 ? x(s3[4].params[0]) : e2, N2 = p3 ? x(s3[5].params[0]) : e2, T2 = a3 ? x(s3[0].params[1]) : e2, O3 = o3 ? x(s3[1].params[1]) : e2, z3 = h2 ? x(s3[2].params[1]) : e2, C3 = c3 ? x(s3[3].params[1]) : e2, D3 = l3 ? x(s3[4].params[1]) : e2, B3 = p3 ? x(s3[5].params[1]) : e2, F3 = s3.map(function(t5) {
        return R2(t5.params, t5.fn);
      }), P3 = a3 ? F3[0] : r2, U3 = o3 ? F3[1] : r2, q3 = h2 ? F3[2] : r2, H3 = c3 ? F3[3] : r2, V3 = l3 ? F3[4] : r2, $2 = p3 ? F3[5] : r2, G2 = a3 ? s3[0].params.length : -1, W2 = o3 ? s3[1].params.length : -1, Z2 = h2 ? s3[2].params.length : -1, Q2 = c3 ? s3[3].params.length : -1, J2 = l3 ? s3[4].params.length : -1, K = p3 ? s3[5].params.length : -1, tt = f3 ? 6 : 0, et = s3.length, rt2 = function() {
        for (var e3 = tt; e3 < et; e3++)
          if (m3[e3](arguments))
            return F3[e3].apply(this, arguments);
        throw S(t4, arguments, s3);
      }, nt = function t5(e3, r3) {
        return arguments.length === G2 && v2(e3) && T2(r3) ? P3.apply(t5, arguments) : arguments.length === W2 && b2(e3) && O3(r3) ? U3.apply(t5, arguments) : arguments.length === Z2 && _2(e3) && z3(r3) ? q3.apply(t5, arguments) : arguments.length === Q2 && M2(e3) && C3(r3) ? H3.apply(t5, arguments) : arguments.length === J2 && E2(e3) && D3(r3) ? V3.apply(t5, arguments) : arguments.length === K && N2(e3) && B3(r3) ? $2.apply(t5, arguments) : rt2.apply(t5, arguments);
      };
      try {
        Object.defineProperty(nt, "name", {value: t4});
      } catch (it) {
      }
      return nt.signatures = k2(s3), nt;
    }
    function F2(t4) {
      return u2.ignore.indexOf(t4) === -1;
    }
    function P2(t4) {
      return t4.trim();
    }
    function U2(t4) {
      return !!t4;
    }
    function j2(t4) {
      return t4 !== null;
    }
    function q2(t4) {
      return t4.types.length === 0;
    }
    function H2(t4) {
      return t4.slice(0, t4.length - 1);
    }
    function V2(t4) {
      return t4[t4.length - 1];
    }
    function $(t4, e3, r3) {
      return Array.prototype.slice.call(t4, e3, r3);
    }
    function G(t4, e3) {
      return t4.indexOf(e3) !== -1;
    }
    function W(t4, e3) {
      for (var r3 = 0; r3 < t4.length; r3++)
        if (G(e3, t4[r3]))
          return true;
      return false;
    }
    function Y(t4, e3) {
      for (var r3 = 0; r3 < t4.length; r3++)
        if (e3(t4[r3]))
          return t4[r3];
    }
    function Z(t4) {
      for (var e3 = {}, r3 = 0; r3 < t4.length; r3++)
        e3[t4[r3]] = true;
      return Object.keys(e3);
    }
    function X(t4, e3) {
      return Array.prototype.concat.apply([], t4.map(e3));
    }
    function Q(t4) {
      for (var e3 = "", r3 = 0; r3 < t4.length; r3++) {
        var n3 = t4[r3];
        if ((typeof n3.signatures == "object" || typeof n3.signature == "string") && n3.name !== "") {
          if (e3 === "")
            e3 = n3.name;
          else if (e3 !== n3.name) {
            var i3 = new Error("Function names do not match (expected: " + e3 + ", actual: " + n3.name + ")");
            throw i3.data = {actual: n3.name, expected: e3}, i3;
          }
        }
      }
      return e3;
    }
    function J(t4) {
      var e3, r3 = {};
      function n3(t5, n4) {
        if (r3.hasOwnProperty(t5) && n4 !== r3[t5])
          throw (e3 = new Error('Signature "' + t5 + '" is defined twice')).data = {signature: t5}, e3;
      }
      for (var i3 = 0; i3 < t4.length; i3++) {
        var s3 = t4[i3];
        if (typeof s3.signatures == "object")
          for (var a3 in s3.signatures)
            s3.signatures.hasOwnProperty(a3) && (n3(a3, s3.signatures[a3]), r3[a3] = s3.signatures[a3]);
        else {
          if (typeof s3.signature != "string")
            throw (e3 = new TypeError("Function is no typed-function (index: " + i3 + ")")).data = {index: i3}, e3;
          n3(s3.signature, s3), r3[s3.signature] = s3;
        }
      }
      return r3;
    }
    return (u2 = B2("typed", {"string, Object": B2, Object: function(t4) {
      var e3 = [];
      for (var r3 in t4)
        t4.hasOwnProperty(r3) && e3.push(t4[r3]);
      return B2(Q(e3), t4);
    }, "...Function": function(t4) {
      return B2(Q(t4), J(t4));
    }, "string, ...Function": function(t4, e3) {
      return B2(t4, J(e3));
    }})).create = n2, u2.types = i2, u2.conversions = o2, u2.ignore = a2, u2.convert = f2, u2.find = p2, u2.addType = function(t4, e3) {
      if (!t4 || typeof t4.name != "string" || typeof t4.test != "function")
        throw new TypeError("Object with properties {name: string, test: function} expected");
      if (e3 !== false) {
        for (var r3 = 0; r3 < u2.types.length; r3++)
          if (u2.types[r3].name === "Object")
            return void u2.types.splice(r3, 0, t4);
      }
      u2.types.push(t4);
    }, u2.addConversion = function(t4) {
      if (!t4 || typeof t4.from != "string" || typeof t4.to != "string" || typeof t4.convert != "function")
        throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
      u2.conversions.push(t4);
    }, u2;
  }
  return n2();
}();
function Ar(t3) {
  return typeof t3 == "boolean" || !!isFinite(t3) && t3 === Math.round(t3);
}
var Cr = Math.sign || function(t3) {
  return t3 > 0 ? 1 : t3 < 0 ? -1 : 0;
};
function Rr(t3, e2) {
  if (typeof e2 == "function")
    return e2(t3);
  if (t3 === 1 / 0)
    return "Infinity";
  if (t3 === -1 / 0)
    return "-Infinity";
  if (isNaN(t3))
    return "NaN";
  var r2, n2 = "auto";
  switch (e2 && (e2.notation && (n2 = e2.notation), Te(e2) ? r2 = e2 : Te(e2.precision) && (r2 = e2.precision)), n2) {
    case "fixed":
      return kr(t3, r2);
    case "exponential":
      return Ir(t3, r2);
    case "engineering":
      return function(t4, e3) {
        if (isNaN(t4) || !isFinite(t4))
          return String(t4);
        var r3 = Lr(Dr(t4), e3), n3 = r3.exponent, i2 = r3.coefficients, s2 = n3 % 3 == 0 ? n3 : n3 < 0 ? n3 - 3 - n3 % 3 : n3 - n3 % 3;
        if (Te(e3))
          for (; e3 > i2.length || n3 - s2 + 1 > i2.length; )
            i2.push(0);
        else
          for (var a2 = Math.abs(n3 - s2) - (i2.length - 1), o2 = 0; o2 < a2; o2++)
            i2.push(0);
        var u2 = Math.abs(n3 - s2), h = 1;
        for (; u2 > 0; )
          h++, u2--;
        var c2 = i2.slice(h).join(""), l2 = Te(e3) && c2.length || c2.match(/[1-9]/) ? "." + c2 : "", p2 = i2.slice(0, h).join("") + l2 + "e" + (n3 >= 0 ? "+" : "") + s2.toString();
        return r3.sign + p2;
      }(t3, r2);
    case "auto":
      return function(t4, e3, r3) {
        if (isNaN(t4) || !isFinite(t4))
          return String(t4);
        var n3 = r3 && r3.lowerExp !== void 0 ? r3.lowerExp : -3, i2 = r3 && r3.upperExp !== void 0 ? r3.upperExp : 5, s2 = Dr(t4), a2 = e3 ? Lr(s2, e3) : s2;
        if (a2.exponent < n3 || a2.exponent >= i2)
          return Ir(t4, e3);
        var o2 = a2.coefficients, u2 = a2.exponent;
        o2.length < e3 && (o2 = o2.concat(Br(e3 - o2.length))), o2 = o2.concat(Br(u2 - o2.length + 1 + (o2.length < e3 ? e3 - o2.length : 0)));
        var h = u2 > 0 ? u2 : 0;
        return h < (o2 = Br(-u2).concat(o2)).length - 1 && o2.splice(h + 1, 0, "."), a2.sign + o2.join("");
      }(t3, r2, e2 && e2).replace(/((\.\d*?)(0+))($|e)/, function() {
        var t4 = arguments[2], e3 = arguments[4];
        return t4 !== "." ? t4 + e3 : e3;
      });
    default:
      throw new Error('Unknown notation "' + n2 + '". Choose "auto", "exponential", or "fixed".');
  }
}
function Dr(t3) {
  var e2 = String(t3).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!e2)
    throw new SyntaxError("Invalid number " + t3);
  var r2 = e2[1], n2 = e2[2], i2 = parseFloat(e2[4] || "0"), s2 = n2.indexOf(".");
  i2 += s2 !== -1 ? s2 - 1 : n2.length - 1;
  var a2 = n2.replace(".", "").replace(/^0*/, function(t4) {
    return i2 -= t4.length, "";
  }).replace(/0*$/, "").split("").map(function(t4) {
    return parseInt(t4);
  });
  return a2.length === 0 && (a2.push(0), i2++), {sign: r2, coefficients: a2, exponent: i2};
}
function kr(t3, e2) {
  if (isNaN(t3) || !isFinite(t3))
    return String(t3);
  var r2 = Dr(t3), n2 = typeof e2 == "number" ? Lr(r2, r2.exponent + 1 + e2) : r2, i2 = n2.coefficients, s2 = n2.exponent + 1, a2 = s2 + (e2 || 0);
  return i2.length < a2 && (i2 = i2.concat(Br(a2 - i2.length))), s2 < 0 && (i2 = Br(1 - s2).concat(i2), s2 = 1), s2 < i2.length && i2.splice(s2, 0, s2 === 0 ? "0." : "."), n2.sign + i2.join("");
}
function Ir(t3, e2) {
  if (isNaN(t3) || !isFinite(t3))
    return String(t3);
  var r2 = Dr(t3), n2 = e2 ? Lr(r2, e2) : r2, i2 = n2.coefficients, s2 = n2.exponent;
  i2.length < e2 && (i2 = i2.concat(Br(e2 - i2.length)));
  var a2 = i2.shift();
  return n2.sign + a2 + (i2.length > 0 ? "." + i2.join("") : "") + "e" + (s2 >= 0 ? "+" : "") + s2;
}
function Lr(t3, e2) {
  for (var r2 = {sign: t3.sign, coefficients: t3.coefficients, exponent: t3.exponent}, n2 = r2.coefficients; e2 <= 0; )
    n2.unshift(0), r2.exponent++, e2++;
  if (n2.length > e2 && n2.splice(e2, n2.length - e2)[0] >= 5) {
    var i2 = e2 - 1;
    for (n2[i2]++; n2[i2] === 10; )
      n2.pop(), i2 === 0 && (n2.unshift(0), r2.exponent++, i2++), n2[--i2]++;
  }
  return r2;
}
function Br(t3) {
  for (var e2 = [], r2 = 0; r2 < t3; r2++)
    e2.push(0);
  return e2;
}
var Fr = Number.EPSILON || 2220446049250313e-31;
function Pr(t3, e2, r2) {
  if (r2 == null)
    return t3 === e2;
  if (t3 === e2)
    return true;
  if (isNaN(t3) || isNaN(e2))
    return false;
  if (isFinite(t3) && isFinite(e2)) {
    var n2 = Math.abs(t3 - e2);
    return n2 < Fr || n2 <= Math.max(Math.abs(t3), Math.abs(e2)) * r2;
  }
  return false;
}
function Ur(t3, e2) {
  if (typeof e2 == "function")
    return e2(t3);
  if (!t3.isFinite())
    return t3.isNaN() ? "NaN" : t3.gt(0) ? "Infinity" : "-Infinity";
  var r2, n2 = "auto";
  switch (e2 !== void 0 && (e2.notation && (n2 = e2.notation), typeof e2 == "number" ? r2 = e2 : e2.precision && (r2 = e2.precision)), n2) {
    case "fixed":
      return function(t4, e3) {
        return t4.toFixed(e3);
      }(t3, r2);
    case "exponential":
      return jr(t3, r2);
    case "engineering":
      return function(t4, e3) {
        var r3 = t4.e, n3 = r3 % 3 == 0 ? r3 : r3 < 0 ? r3 - 3 - r3 % 3 : r3 - r3 % 3, i3 = t4.mul(Math.pow(10, -n3)), s3 = i3.toPrecision(e3);
        s3.indexOf("e") !== -1 && (s3 = i3.toString());
        return s3 + "e" + (r3 >= 0 ? "+" : "") + n3.toString();
      }(t3, r2);
    case "auto":
      var i2 = e2 && e2.lowerExp !== void 0 ? e2.lowerExp : -3, s2 = e2 && e2.upperExp !== void 0 ? e2.upperExp : 5;
      if (t3.isZero())
        return "0";
      var a2 = t3.toSignificantDigits(r2), o2 = a2.e;
      return (o2 >= i2 && o2 < s2 ? a2.toFixed() : jr(t3, r2)).replace(/((\.\d*?)(0+))($|e)/, function() {
        var t4 = arguments[2], e3 = arguments[4];
        return t4 !== "." ? t4 + e3 : e3;
      });
    default:
      throw new Error('Unknown notation "' + n2 + '". Choose "auto", "exponential", or "fixed".');
  }
}
function jr(t3, e2) {
  return e2 !== void 0 ? t3.toExponential(e2 - 1) : t3.toExponential();
}
function qr(t3, e2) {
  var r2 = t3.length - e2.length, n2 = t3.length;
  return t3.substring(r2, n2) === e2;
}
function Hr(t3, e2) {
  return typeof t3 == "number" ? Rr(t3, e2) : Oe(t3) ? Ur(t3, e2) : function(t4) {
    return t4 && typeof t4 == "object" && typeof t4.s == "number" && typeof t4.n == "number" && typeof t4.d == "number" || false;
  }(t3) ? e2 && e2.fraction === "decimal" ? t3.toString() : t3.s * t3.n + "/" + t3.d : Array.isArray(t3) ? Gr(t3, e2) : Re(t3) ? '"' + t3 + '"' : typeof t3 == "function" ? t3.syntax ? String(t3.syntax) : "function" : t3 && typeof t3 == "object" ? typeof t3.format == "function" ? t3.format(e2) : t3 && t3.toString(e2) !== {}.toString() ? t3.toString(e2) : "{" + Object.keys(t3).map((r2) => '"' + r2 + '": ' + Hr(t3[r2], e2)).join(", ") + "}" : String(t3);
}
function Vr(t3) {
  for (var e2 = String(t3), r2 = "", n2 = 0; n2 < e2.length; ) {
    var i2 = e2.charAt(n2);
    i2 === "\\" ? (r2 += i2, n2++, (i2 = e2.charAt(n2)) !== "" && '"\\/bfnrtu'.indexOf(i2) !== -1 || (r2 += "\\"), r2 += i2) : r2 += i2 === '"' ? '\\"' : i2, n2++;
  }
  return '"' + r2 + '"';
}
function $r(t3) {
  var e2 = String(t3);
  return e2 = e2.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Gr(t3, e2) {
  if (Array.isArray(t3)) {
    for (var r2 = "[", n2 = t3.length, i2 = 0; i2 < n2; i2++)
      i2 !== 0 && (r2 += ", "), r2 += Gr(t3[i2], e2);
    return r2 += "]";
  }
  return Hr(t3, e2);
}
function Wr(t3, e2, r2) {
  if (!(this instanceof Wr))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = t3, this.expected = e2, this.relation = r2, this.message = "Dimension mismatch (" + (Array.isArray(t3) ? "[" + t3.join(", ") + "]" : t3) + " " + (this.relation || "!=") + " " + (Array.isArray(e2) ? "[" + e2.join(", ") + "]" : e2) + ")", this.stack = new Error().stack;
}
function Yr(t3, e2, r2) {
  if (!(this instanceof Yr))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = t3, arguments.length < 3 ? (this.min = 0, this.max = e2) : (this.min = e2, this.max = r2), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
function Zr(t3) {
  for (var e2 = []; Array.isArray(t3); )
    e2.push(t3.length), t3 = t3[0];
  return e2;
}
function Xr(t3, e2, r2) {
  var n2, i2 = t3.length;
  if (i2 !== e2[r2])
    throw new Wr(i2, e2[r2]);
  if (r2 < e2.length - 1) {
    var s2 = r2 + 1;
    for (n2 = 0; n2 < i2; n2++) {
      var a2 = t3[n2];
      if (!Array.isArray(a2))
        throw new Wr(e2.length - 1, e2.length, "<");
      Xr(t3[n2], e2, s2);
    }
  } else
    for (n2 = 0; n2 < i2; n2++)
      if (Array.isArray(t3[n2]))
        throw new Wr(e2.length + 1, e2.length, ">");
}
function Qr(t3, e2) {
  if (e2.length === 0) {
    if (Array.isArray(t3))
      throw new Wr(t3.length, 0);
  } else
    Xr(t3, e2, 0);
}
function Jr(t3, e2) {
  if (!Te(t3) || !Ar(t3))
    throw new TypeError("Index must be an integer (value: " + t3 + ")");
  if (t3 < 0 || typeof e2 == "number" && t3 >= e2)
    throw new Yr(t3, e2);
}
function Kr(t3, e2, r2) {
  if (!Array.isArray(t3) || !Array.isArray(e2))
    throw new TypeError("Array expected");
  if (e2.length === 0)
    throw new Error("Resizing to scalar is not supported");
  return e2.forEach(function(t4) {
    if (!Te(t4) || !Ar(t4) || t4 < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Hr(e2) + ")");
  }), tn(t3, e2, 0, r2 !== void 0 ? r2 : 0), t3;
}
function tn(t3, e2, r2, n2) {
  var i2, s2, a2 = t3.length, o2 = e2[r2], u2 = Math.min(a2, o2);
  if (t3.length = o2, r2 < e2.length - 1) {
    var h = r2 + 1;
    for (i2 = 0; i2 < u2; i2++)
      s2 = t3[i2], Array.isArray(s2) || (s2 = [s2], t3[i2] = s2), tn(s2, e2, h, n2);
    for (i2 = u2; i2 < o2; i2++)
      s2 = [], t3[i2] = s2, tn(s2, e2, h, n2);
  } else {
    for (i2 = 0; i2 < u2; i2++)
      for (; Array.isArray(t3[i2]); )
        t3[i2] = t3[i2][0];
    for (i2 = u2; i2 < o2; i2++)
      t3[i2] = n2;
  }
}
function en(t3, e2) {
  var r2, n2 = function(t4) {
    if (!Array.isArray(t4))
      return t4;
    var e3 = [];
    return t4.forEach(function t5(r3) {
      Array.isArray(r3) ? r3.forEach(t5) : e3.push(r3);
    }), e3;
  }(t3);
  function i2(t4) {
    return t4.reduce((t5, e3) => t5 * e3);
  }
  if (!Array.isArray(t3) || !Array.isArray(e2))
    throw new TypeError("Array expected");
  if (e2.length === 0)
    throw new Wr(0, i2(Zr(t3)), "!=");
  for (var s2 = 1, a2 = 0; a2 < e2.length; a2++)
    s2 *= e2[a2];
  if (n2.length !== s2)
    throw new Wr(i2(e2), i2(Zr(t3)), "!=");
  try {
    r2 = function(t4, e3) {
      for (var r3, n3 = t4, i3 = e3.length - 1; i3 > 0; i3--) {
        var s3 = e3[i3];
        r3 = [];
        for (var a3 = n3.length / s3, o2 = 0; o2 < a3; o2++)
          r3.push(n3.slice(o2 * s3, (o2 + 1) * s3));
        n3 = r3;
      }
      return n3;
    }(n2, e2);
  } catch (o2) {
    if (o2 instanceof Wr)
      throw new Wr(i2(e2), i2(Zr(t3)), "!=");
    throw o2;
  }
  return r2;
}
function rn(t3, e2, r2, n2) {
  var i2 = n2 || Zr(t3);
  if (r2)
    for (var s2 = 0; s2 < r2; s2++)
      t3 = [t3], i2.unshift(1);
  for (t3 = nn(t3, e2, 0); i2.length < e2; )
    i2.push(1);
  return t3;
}
function nn(t3, e2, r2) {
  var n2, i2;
  if (Array.isArray(t3)) {
    var s2 = r2 + 1;
    for (n2 = 0, i2 = t3.length; n2 < i2; n2++)
      t3[n2] = nn(t3[n2], e2, s2);
  } else
    for (var a2 = r2; a2 < e2; a2++)
      t3 = [t3];
  return t3;
}
function sn(t3, e2) {
  return Array.prototype.map.call(t3, e2);
}
function an(t3, e2) {
  Array.prototype.forEach.call(t3, e2);
}
function on(t3, e2) {
  return Array.prototype.join.call(t3, e2);
}
function un(t3, e2) {
  for (var r2, n2 = 0, i2 = 0; i2 < t3.length; i2++) {
    var s2 = t3[i2], a2 = Array.isArray(s2);
    if (i2 === 0 && a2 && (n2 = s2.length), a2 && s2.length !== n2)
      return;
    var o2 = a2 ? un(s2, e2) : e2(s2);
    if (r2 === void 0)
      r2 = o2;
    else if (r2 !== o2)
      return "mixed";
  }
  return r2;
}
function cn(t3, e2, r2, n2) {
  function i2(n3) {
    var i3 = function(t4, e3) {
      for (var r3 = {}, n4 = 0; n4 < e3.length; n4++) {
        var i4 = e3[n4], s2 = t4[i4];
        s2 !== void 0 && (r3[i4] = s2);
      }
      return r3;
    }(n3, e2.map(pn));
    return function(t4, e3, r3) {
      if (!e3.filter((t5) => !function(t6) {
        return t6 && t6[0] === "?";
      }(t5)).every((t5) => r3[t5] !== void 0)) {
        var n4 = e3.filter((t5) => r3[t5] === void 0);
        throw new Error('Cannot create function "'.concat(t4, '", ') + "some dependencies are missing: ".concat(n4.map((t5) => '"'.concat(t5, '"')).join(", "), "."));
      }
    }(t3, e2, n3), r2(i3);
  }
  return i2.isFactory = true, i2.fn = t3, i2.dependencies = e2.slice().sort(), n2 && (i2.meta = n2), i2;
}
function pn(t3) {
  return t3 && t3[0] === "?" ? t3.slice(1) : t3;
}
Wr.prototype = new RangeError(), Wr.prototype.constructor = RangeError, Wr.prototype.name = "DimensionError", Wr.prototype.isDimensionError = true, Yr.prototype = new RangeError(), Yr.prototype.constructor = RangeError, Yr.prototype.name = "IndexError", Yr.prototype.isIndexError = true;
var fn = function() {
  return fn = zr.create, zr;
}, dn = cn("typed", ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], function(t3) {
  var {BigNumber: e2, Complex: r2, DenseMatrix: n2, Fraction: i2} = t3, s2 = fn();
  return s2.types = [{name: "number", test: Te}, {name: "Complex", test: ze}, {name: "BigNumber", test: Oe}, {name: "Fraction", test: Ae}, {name: "Unit", test: Ce}, {name: "string", test: Re}, {name: "Chain", test: cr}, {name: "Array", test: De}, {name: "Matrix", test: ke}, {name: "DenseMatrix", test: Le}, {name: "SparseMatrix", test: Be}, {name: "Range", test: Fe}, {name: "Index", test: Pe}, {name: "boolean", test: Ue}, {name: "ResultSet", test: je}, {name: "Help", test: qe}, {name: "function", test: He}, {name: "Date", test: Ve}, {name: "RegExp", test: $e}, {name: "null", test: We}, {name: "undefined", test: Ye}, {name: "AccessorNode", test: Ze}, {name: "ArrayNode", test: Xe}, {name: "AssignmentNode", test: Qe}, {name: "BlockNode", test: Je}, {name: "ConditionalNode", test: Ke}, {name: "ConstantNode", test: tr}, {name: "FunctionNode", test: rr}, {name: "FunctionAssignmentNode", test: er}, {name: "IndexNode", test: nr}, {name: "Node", test: ir}, {name: "ObjectNode", test: sr}, {name: "OperatorNode", test: ar}, {name: "ParenthesisNode", test: or}, {name: "RangeNode", test: ur}, {name: "SymbolNode", test: hr}, {name: "Object", test: Ge}], s2.conversions = [{from: "number", to: "BigNumber", convert: function(t4) {
    if (e2 || mn(t4), t4.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length > 15)
      throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + t4 + "). Use function bignumber(x) to convert to BigNumber.");
    return new e2(t4);
  }}, {from: "number", to: "Complex", convert: function(t4) {
    return r2 || yn(t4), new r2(t4, 0);
  }}, {from: "number", to: "string", convert: function(t4) {
    return t4 + "";
  }}, {from: "BigNumber", to: "Complex", convert: function(t4) {
    return r2 || yn(t4), new r2(t4.toNumber(), 0);
  }}, {from: "Fraction", to: "BigNumber", convert: function(t4) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  }}, {from: "Fraction", to: "Complex", convert: function(t4) {
    return r2 || yn(t4), new r2(t4.valueOf(), 0);
  }}, {from: "number", to: "Fraction", convert: function(t4) {
    i2 || gn(t4);
    var e3 = new i2(t4);
    if (e3.valueOf() !== t4)
      throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + t4 + "). Use function fraction(x) to convert to Fraction.");
    return e3;
  }}, {from: "string", to: "number", convert: function(t4) {
    var e3 = Number(t4);
    if (isNaN(e3))
      throw new Error('Cannot convert "' + t4 + '" to a number');
    return e3;
  }}, {from: "string", to: "BigNumber", convert: function(t4) {
    e2 || mn(t4);
    try {
      return new e2(t4);
    } catch (r3) {
      throw new Error('Cannot convert "' + t4 + '" to BigNumber');
    }
  }}, {from: "string", to: "Fraction", convert: function(t4) {
    i2 || gn(t4);
    try {
      return new i2(t4);
    } catch (e3) {
      throw new Error('Cannot convert "' + t4 + '" to Fraction');
    }
  }}, {from: "string", to: "Complex", convert: function(t4) {
    r2 || yn(t4);
    try {
      return new r2(t4);
    } catch (e3) {
      throw new Error('Cannot convert "' + t4 + '" to Complex');
    }
  }}, {from: "boolean", to: "number", convert: function(t4) {
    return +t4;
  }}, {from: "boolean", to: "BigNumber", convert: function(t4) {
    return e2 || mn(t4), new e2(+t4);
  }}, {from: "boolean", to: "Fraction", convert: function(t4) {
    return i2 || gn(t4), new i2(+t4);
  }}, {from: "boolean", to: "string", convert: function(t4) {
    return String(t4);
  }}, {from: "Array", to: "Matrix", convert: function(t4) {
    return n2 || function() {
      throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
    }(), new n2(t4);
  }}, {from: "Matrix", to: "Array", convert: function(t4) {
    return t4.valueOf();
  }}], s2;
});
function mn(t3) {
  throw new Error("Cannot convert value ".concat(t3, " into a BigNumber: no class 'BigNumber' provided"));
}
function yn(t3) {
  throw new Error("Cannot convert value ".concat(t3, " into a Complex number: no class 'Complex' provided"));
}
function gn(t3) {
  throw new Error("Cannot convert value ".concat(t3, " into a Fraction, no class 'Fraction' provided."));
}
var vn, xn, wn = cn("ResultSet", [], () => {
  function t3(e2) {
    if (!(this instanceof t3))
      throw new SyntaxError("Constructor must be called with the new operator");
    this.entries = e2 || [];
  }
  return t3.prototype.type = "ResultSet", t3.prototype.isResultSet = true, t3.prototype.valueOf = function() {
    return this.entries;
  }, t3.prototype.toString = function() {
    return "[" + this.entries.join(", ") + "]";
  }, t3.prototype.toJSON = function() {
    return {mathjs: "ResultSet", entries: this.entries};
  }, t3.fromJSON = function(e2) {
    return new t3(e2.entries);
  }, t3;
}, {isClass: true}), bn = 9e15, _n = "0123456789abcdef", Mn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", En = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Nn = {precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -bn, maxE: bn, crypto: false}, Sn = true, Tn = "[DecimalError] Invalid argument: ", On = Math.floor, zn = Math.pow, An = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Cn = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Rn = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Dn = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, kn = 1e7, In = Mn.length - 1, Ln = En.length - 1, Bn = {name: "[object Decimal]"};
function Fn(t3) {
  var e2, r2, n2, i2 = t3.length - 1, s2 = "", a2 = t3[0];
  if (i2 > 0) {
    for (s2 += a2, e2 = 1; e2 < i2; e2++)
      (r2 = 7 - (n2 = t3[e2] + "").length) && (s2 += Zn(r2)), s2 += n2;
    (r2 = 7 - (n2 = (a2 = t3[e2]) + "").length) && (s2 += Zn(r2));
  } else if (a2 === 0)
    return "0";
  for (; a2 % 10 == 0; )
    a2 /= 10;
  return s2 + a2;
}
function Pn(t3, e2, r2) {
  if (t3 !== ~~t3 || t3 < e2 || t3 > r2)
    throw Error(Tn + t3);
}
function Un(t3, e2, r2, n2) {
  var i2, s2, a2, o2;
  for (s2 = t3[0]; s2 >= 10; s2 /= 10)
    --e2;
  return --e2 < 0 ? (e2 += 7, i2 = 0) : (i2 = Math.ceil((e2 + 1) / 7), e2 %= 7), s2 = zn(10, 7 - e2), o2 = t3[i2] % s2 | 0, n2 == null ? e2 < 3 ? (e2 == 0 ? o2 = o2 / 100 | 0 : e2 == 1 && (o2 = o2 / 10 | 0), a2 = r2 < 4 && o2 == 99999 || r2 > 3 && o2 == 49999 || o2 == 5e4 || o2 == 0) : a2 = (r2 < 4 && o2 + 1 == s2 || r2 > 3 && o2 + 1 == s2 / 2) && (t3[i2 + 1] / s2 / 100 | 0) == zn(10, e2 - 2) - 1 || (o2 == s2 / 2 || o2 == 0) && (t3[i2 + 1] / s2 / 100 | 0) == 0 : e2 < 4 ? (e2 == 0 ? o2 = o2 / 1e3 | 0 : e2 == 1 ? o2 = o2 / 100 | 0 : e2 == 2 && (o2 = o2 / 10 | 0), a2 = (n2 || r2 < 4) && o2 == 9999 || !n2 && r2 > 3 && o2 == 4999) : a2 = ((n2 || r2 < 4) && o2 + 1 == s2 || !n2 && r2 > 3 && o2 + 1 == s2 / 2) && (t3[i2 + 1] / s2 / 1e3 | 0) == zn(10, e2 - 3) - 1, a2;
}
function jn(t3, e2, r2) {
  for (var n2, i2, s2 = [0], a2 = 0, o2 = t3.length; a2 < o2; ) {
    for (i2 = s2.length; i2--; )
      s2[i2] *= e2;
    for (s2[0] += _n.indexOf(t3.charAt(a2++)), n2 = 0; n2 < s2.length; n2++)
      s2[n2] > r2 - 1 && (s2[n2 + 1] === void 0 && (s2[n2 + 1] = 0), s2[n2 + 1] += s2[n2] / r2 | 0, s2[n2] %= r2);
  }
  return s2.reverse();
}
Bn.absoluteValue = Bn.abs = function() {
  var t3 = new this.constructor(this);
  return t3.s < 0 && (t3.s = 1), Hn(t3);
}, Bn.ceil = function() {
  return Hn(new this.constructor(this), this.e + 1, 2);
}, Bn.comparedTo = Bn.cmp = function(t3) {
  var e2, r2, n2, i2, s2 = this, a2 = s2.d, o2 = (t3 = new s2.constructor(t3)).d, u2 = s2.s, h = t3.s;
  if (!a2 || !o2)
    return u2 && h ? u2 !== h ? u2 : a2 === o2 ? 0 : !a2 ^ u2 < 0 ? 1 : -1 : NaN;
  if (!a2[0] || !o2[0])
    return a2[0] ? u2 : o2[0] ? -h : 0;
  if (u2 !== h)
    return u2;
  if (s2.e !== t3.e)
    return s2.e > t3.e ^ u2 < 0 ? 1 : -1;
  for (e2 = 0, r2 = (n2 = a2.length) < (i2 = o2.length) ? n2 : i2; e2 < r2; ++e2)
    if (a2[e2] !== o2[e2])
      return a2[e2] > o2[e2] ^ u2 < 0 ? 1 : -1;
  return n2 === i2 ? 0 : n2 > i2 ^ u2 < 0 ? 1 : -1;
}, Bn.cosine = Bn.cos = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.d ? r2.d[0] ? (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + Math.max(r2.e, r2.sd()) + 7, n2.rounding = 1, r2 = function(t4, e3) {
    var r3, n3, i2 = e3.d.length;
    i2 < 32 ? n3 = (1 / ii(4, r3 = Math.ceil(i2 / 3))).toString() : (r3 = 16, n3 = "2.3283064365386962890625e-10");
    t4.precision += r3, e3 = ni(t4, 1, e3.times(n3), new t4(1));
    for (var s2 = r3; s2--; ) {
      var a2 = e3.times(e3);
      e3 = a2.times(a2).minus(a2).times(8).plus(1);
    }
    return t4.precision -= r3, e3;
  }(n2, si(n2, r2)), n2.precision = t3, n2.rounding = e2, Hn(xn == 2 || xn == 3 ? r2.neg() : r2, t3, e2, true)) : new n2(1) : new n2(NaN);
}, Bn.cubeRoot = Bn.cbrt = function() {
  var t3, e2, r2, n2, i2, s2, a2, o2, u2, h, c2 = this, l2 = c2.constructor;
  if (!c2.isFinite() || c2.isZero())
    return new l2(c2);
  for (Sn = false, (s2 = c2.s * zn(c2.s * c2, 1 / 3)) && Math.abs(s2) != 1 / 0 ? n2 = new l2(s2.toString()) : (r2 = Fn(c2.d), (s2 = ((t3 = c2.e) - r2.length + 1) % 3) && (r2 += s2 == 1 || s2 == -2 ? "0" : "00"), s2 = zn(r2, 1 / 3), t3 = On((t3 + 1) / 3) - (t3 % 3 == (t3 < 0 ? -1 : 2)), (n2 = new l2(r2 = s2 == 1 / 0 ? "5e" + t3 : (r2 = s2.toExponential()).slice(0, r2.indexOf("e") + 1) + t3)).s = c2.s), a2 = (t3 = l2.precision) + 3; ; )
    if (h = (u2 = (o2 = n2).times(o2).times(o2)).plus(c2), n2 = qn(h.plus(c2).times(o2), h.plus(u2), a2 + 2, 1), Fn(o2.d).slice(0, a2) === (r2 = Fn(n2.d)).slice(0, a2)) {
      if ((r2 = r2.slice(a2 - 3, a2 + 1)) != "9999" && (i2 || r2 != "4999")) {
        +r2 && (+r2.slice(1) || r2.charAt(0) != "5") || (Hn(n2, t3 + 1, 1), e2 = !n2.times(n2).times(n2).eq(c2));
        break;
      }
      if (!i2 && (Hn(o2, t3 + 1, 0), o2.times(o2).times(o2).eq(c2))) {
        n2 = o2;
        break;
      }
      a2 += 4, i2 = 1;
    }
  return Sn = true, Hn(n2, t3, l2.rounding, e2);
}, Bn.decimalPlaces = Bn.dp = function() {
  var t3, e2 = this.d, r2 = NaN;
  if (e2) {
    if (r2 = 7 * ((t3 = e2.length - 1) - On(this.e / 7)), t3 = e2[t3])
      for (; t3 % 10 == 0; t3 /= 10)
        r2--;
    r2 < 0 && (r2 = 0);
  }
  return r2;
}, Bn.dividedBy = Bn.div = function(t3) {
  return qn(this, new this.constructor(t3));
}, Bn.dividedToIntegerBy = Bn.divToInt = function(t3) {
  var e2 = this.constructor;
  return Hn(qn(this, new e2(t3), 0, 1, 1), e2.precision, e2.rounding);
}, Bn.equals = Bn.eq = function(t3) {
  return this.cmp(t3) === 0;
}, Bn.floor = function() {
  return Hn(new this.constructor(this), this.e + 1, 3);
}, Bn.greaterThan = Bn.gt = function(t3) {
  return this.cmp(t3) > 0;
}, Bn.greaterThanOrEqualTo = Bn.gte = function(t3) {
  var e2 = this.cmp(t3);
  return e2 == 1 || e2 === 0;
}, Bn.hyperbolicCosine = Bn.cosh = function() {
  var t3, e2, r2, n2, i2, s2 = this, a2 = s2.constructor, o2 = new a2(1);
  if (!s2.isFinite())
    return new a2(s2.s ? 1 / 0 : NaN);
  if (s2.isZero())
    return o2;
  r2 = a2.precision, n2 = a2.rounding, a2.precision = r2 + Math.max(s2.e, s2.sd()) + 4, a2.rounding = 1, (i2 = s2.d.length) < 32 ? e2 = (1 / ii(4, t3 = Math.ceil(i2 / 3))).toString() : (t3 = 16, e2 = "2.3283064365386962890625e-10"), s2 = ni(a2, 1, s2.times(e2), new a2(1), true);
  for (var u2, h = t3, c2 = new a2(8); h--; )
    u2 = s2.times(s2), s2 = o2.minus(u2.times(c2.minus(u2.times(c2))));
  return Hn(s2, a2.precision = r2, a2.rounding = n2, true);
}, Bn.hyperbolicSine = Bn.sinh = function() {
  var t3, e2, r2, n2, i2 = this, s2 = i2.constructor;
  if (!i2.isFinite() || i2.isZero())
    return new s2(i2);
  if (e2 = s2.precision, r2 = s2.rounding, s2.precision = e2 + Math.max(i2.e, i2.sd()) + 4, s2.rounding = 1, (n2 = i2.d.length) < 3)
    i2 = ni(s2, 2, i2, i2, true);
  else {
    t3 = (t3 = 1.4 * Math.sqrt(n2)) > 16 ? 16 : 0 | t3, i2 = ni(s2, 2, i2 = i2.times(1 / ii(5, t3)), i2, true);
    for (var a2, o2 = new s2(5), u2 = new s2(16), h = new s2(20); t3--; )
      a2 = i2.times(i2), i2 = i2.times(o2.plus(a2.times(u2.times(a2).plus(h))));
  }
  return s2.precision = e2, s2.rounding = r2, Hn(i2, e2, r2, true);
}, Bn.hyperbolicTangent = Bn.tanh = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.isFinite() ? r2.isZero() ? new n2(r2) : (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + 7, n2.rounding = 1, qn(r2.sinh(), r2.cosh(), n2.precision = t3, n2.rounding = e2)) : new n2(r2.s);
}, Bn.inverseCosine = Bn.acos = function() {
  var t3, e2 = this, r2 = e2.constructor, n2 = e2.abs().cmp(1), i2 = r2.precision, s2 = r2.rounding;
  return n2 !== -1 ? n2 === 0 ? e2.isNeg() ? Wn(r2, i2, s2) : new r2(0) : new r2(NaN) : e2.isZero() ? Wn(r2, i2 + 4, s2).times(0.5) : (r2.precision = i2 + 6, r2.rounding = 1, e2 = e2.asin(), t3 = Wn(r2, i2 + 4, s2).times(0.5), r2.precision = i2, r2.rounding = s2, t3.minus(e2));
}, Bn.inverseHyperbolicCosine = Bn.acosh = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.lte(1) ? new n2(r2.eq(1) ? 0 : NaN) : r2.isFinite() ? (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + Math.max(Math.abs(r2.e), r2.sd()) + 4, n2.rounding = 1, Sn = false, r2 = r2.times(r2).minus(1).sqrt().plus(r2), Sn = true, n2.precision = t3, n2.rounding = e2, r2.ln()) : new n2(r2);
}, Bn.inverseHyperbolicSine = Bn.asinh = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return !r2.isFinite() || r2.isZero() ? new n2(r2) : (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + 2 * Math.max(Math.abs(r2.e), r2.sd()) + 6, n2.rounding = 1, Sn = false, r2 = r2.times(r2).plus(1).sqrt().plus(r2), Sn = true, n2.precision = t3, n2.rounding = e2, r2.ln());
}, Bn.inverseHyperbolicTangent = Bn.atanh = function() {
  var t3, e2, r2, n2, i2 = this, s2 = i2.constructor;
  return i2.isFinite() ? i2.e >= 0 ? new s2(i2.abs().eq(1) ? i2.s / 0 : i2.isZero() ? i2 : NaN) : (t3 = s2.precision, e2 = s2.rounding, n2 = i2.sd(), Math.max(n2, t3) < 2 * -i2.e - 1 ? Hn(new s2(i2), t3, e2, true) : (s2.precision = r2 = n2 - i2.e, i2 = qn(i2.plus(1), new s2(1).minus(i2), r2 + t3, 1), s2.precision = t3 + 4, s2.rounding = 1, i2 = i2.ln(), s2.precision = t3, s2.rounding = e2, i2.times(0.5))) : new s2(NaN);
}, Bn.inverseSine = Bn.asin = function() {
  var t3, e2, r2, n2, i2 = this, s2 = i2.constructor;
  return i2.isZero() ? new s2(i2) : (e2 = i2.abs().cmp(1), r2 = s2.precision, n2 = s2.rounding, e2 !== -1 ? e2 === 0 ? ((t3 = Wn(s2, r2 + 4, n2).times(0.5)).s = i2.s, t3) : new s2(NaN) : (s2.precision = r2 + 6, s2.rounding = 1, i2 = i2.div(new s2(1).minus(i2.times(i2)).sqrt().plus(1)).atan(), s2.precision = r2, s2.rounding = n2, i2.times(2)));
}, Bn.inverseTangent = Bn.atan = function() {
  var t3, e2, r2, n2, i2, s2, a2, o2, u2, h = this, c2 = h.constructor, l2 = c2.precision, p2 = c2.rounding;
  if (h.isFinite()) {
    if (h.isZero())
      return new c2(h);
    if (h.abs().eq(1) && l2 + 4 <= Ln)
      return (a2 = Wn(c2, l2 + 4, p2).times(0.25)).s = h.s, a2;
  } else {
    if (!h.s)
      return new c2(NaN);
    if (l2 + 4 <= Ln)
      return (a2 = Wn(c2, l2 + 4, p2).times(0.5)).s = h.s, a2;
  }
  for (c2.precision = o2 = l2 + 10, c2.rounding = 1, t3 = r2 = Math.min(28, o2 / 7 + 2 | 0); t3; --t3)
    h = h.div(h.times(h).plus(1).sqrt().plus(1));
  for (Sn = false, e2 = Math.ceil(o2 / 7), n2 = 1, u2 = h.times(h), a2 = new c2(h), i2 = h; t3 !== -1; )
    if (i2 = i2.times(u2), s2 = a2.minus(i2.div(n2 += 2)), i2 = i2.times(u2), (a2 = s2.plus(i2.div(n2 += 2))).d[e2] !== void 0)
      for (t3 = e2; a2.d[t3] === s2.d[t3] && t3--; )
        ;
  return r2 && (a2 = a2.times(2 << r2 - 1)), Sn = true, Hn(a2, c2.precision = l2, c2.rounding = p2, true);
}, Bn.isFinite = function() {
  return !!this.d;
}, Bn.isInteger = Bn.isInt = function() {
  return !!this.d && On(this.e / 7) > this.d.length - 2;
}, Bn.isNaN = function() {
  return !this.s;
}, Bn.isNegative = Bn.isNeg = function() {
  return this.s < 0;
}, Bn.isPositive = Bn.isPos = function() {
  return this.s > 0;
}, Bn.isZero = function() {
  return !!this.d && this.d[0] === 0;
}, Bn.lessThan = Bn.lt = function(t3) {
  return this.cmp(t3) < 0;
}, Bn.lessThanOrEqualTo = Bn.lte = function(t3) {
  return this.cmp(t3) < 1;
}, Bn.logarithm = Bn.log = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h = this, c2 = h.constructor, l2 = c2.precision, p2 = c2.rounding;
  if (t3 == null)
    t3 = new c2(10), e2 = true;
  else {
    if (r2 = (t3 = new c2(t3)).d, t3.s < 0 || !r2 || !r2[0] || t3.eq(1))
      return new c2(NaN);
    e2 = t3.eq(10);
  }
  if (r2 = h.d, h.s < 0 || !r2 || !r2[0] || h.eq(1))
    return new c2(r2 && !r2[0] ? -1 / 0 : h.s != 1 ? NaN : r2 ? 0 : 1 / 0);
  if (e2)
    if (r2.length > 1)
      s2 = true;
    else {
      for (i2 = r2[0]; i2 % 10 == 0; )
        i2 /= 10;
      s2 = i2 !== 1;
    }
  if (Sn = false, a2 = ti(h, o2 = l2 + 5), n2 = e2 ? Gn(c2, o2 + 10) : ti(t3, o2), Un((u2 = qn(a2, n2, o2, 1)).d, i2 = l2, p2))
    do {
      if (a2 = ti(h, o2 += 10), n2 = e2 ? Gn(c2, o2 + 10) : ti(t3, o2), u2 = qn(a2, n2, o2, 1), !s2) {
        +Fn(u2.d).slice(i2 + 1, i2 + 15) + 1 == 1e14 && (u2 = Hn(u2, l2 + 1, 0));
        break;
      }
    } while (Un(u2.d, i2 += 10, p2));
  return Sn = true, Hn(u2, l2, p2);
}, Bn.minus = Bn.sub = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = this, d2 = f2.constructor;
  if (t3 = new d2(t3), !f2.d || !t3.d)
    return f2.s && t3.s ? f2.d ? t3.s = -t3.s : t3 = new d2(t3.d || f2.s !== t3.s ? f2 : NaN) : t3 = new d2(NaN), t3;
  if (f2.s != t3.s)
    return t3.s = -t3.s, f2.plus(t3);
  if (h = f2.d, p2 = t3.d, o2 = d2.precision, u2 = d2.rounding, !h[0] || !p2[0]) {
    if (p2[0])
      t3.s = -t3.s;
    else {
      if (!h[0])
        return new d2(u2 === 3 ? -0 : 0);
      t3 = new d2(f2);
    }
    return Sn ? Hn(t3, o2, u2) : t3;
  }
  if (r2 = On(t3.e / 7), c2 = On(f2.e / 7), h = h.slice(), s2 = c2 - r2) {
    for ((l2 = s2 < 0) ? (e2 = h, s2 = -s2, a2 = p2.length) : (e2 = p2, r2 = c2, a2 = h.length), s2 > (n2 = Math.max(Math.ceil(o2 / 7), a2) + 2) && (s2 = n2, e2.length = 1), e2.reverse(), n2 = s2; n2--; )
      e2.push(0);
    e2.reverse();
  } else {
    for ((l2 = (n2 = h.length) < (a2 = p2.length)) && (a2 = n2), n2 = 0; n2 < a2; n2++)
      if (h[n2] != p2[n2]) {
        l2 = h[n2] < p2[n2];
        break;
      }
    s2 = 0;
  }
  for (l2 && (e2 = h, h = p2, p2 = e2, t3.s = -t3.s), a2 = h.length, n2 = p2.length - a2; n2 > 0; --n2)
    h[a2++] = 0;
  for (n2 = p2.length; n2 > s2; ) {
    if (h[--n2] < p2[n2]) {
      for (i2 = n2; i2 && h[--i2] === 0; )
        h[i2] = kn - 1;
      --h[i2], h[n2] += kn;
    }
    h[n2] -= p2[n2];
  }
  for (; h[--a2] === 0; )
    h.pop();
  for (; h[0] === 0; h.shift())
    --r2;
  return h[0] ? (t3.d = h, t3.e = $n(h, r2), Sn ? Hn(t3, o2, u2) : t3) : new d2(u2 === 3 ? -0 : 0);
}, Bn.modulo = Bn.mod = function(t3) {
  var e2, r2 = this, n2 = r2.constructor;
  return t3 = new n2(t3), !r2.d || !t3.s || t3.d && !t3.d[0] ? new n2(NaN) : !t3.d || r2.d && !r2.d[0] ? Hn(new n2(r2), n2.precision, n2.rounding) : (Sn = false, n2.modulo == 9 ? (e2 = qn(r2, t3.abs(), 0, 3, 1)).s *= t3.s : e2 = qn(r2, t3, 0, n2.modulo, 1), e2 = e2.times(t3), Sn = true, r2.minus(e2));
}, Bn.naturalExponential = Bn.exp = function() {
  return Kn(this);
}, Bn.naturalLogarithm = Bn.ln = function() {
  return ti(this);
}, Bn.negated = Bn.neg = function() {
  var t3 = new this.constructor(this);
  return t3.s = -t3.s, Hn(t3);
}, Bn.plus = Bn.add = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h, c2, l2 = this, p2 = l2.constructor;
  if (t3 = new p2(t3), !l2.d || !t3.d)
    return l2.s && t3.s ? l2.d || (t3 = new p2(t3.d || l2.s === t3.s ? l2 : NaN)) : t3 = new p2(NaN), t3;
  if (l2.s != t3.s)
    return t3.s = -t3.s, l2.minus(t3);
  if (h = l2.d, c2 = t3.d, o2 = p2.precision, u2 = p2.rounding, !h[0] || !c2[0])
    return c2[0] || (t3 = new p2(l2)), Sn ? Hn(t3, o2, u2) : t3;
  if (s2 = On(l2.e / 7), n2 = On(t3.e / 7), h = h.slice(), i2 = s2 - n2) {
    for (i2 < 0 ? (r2 = h, i2 = -i2, a2 = c2.length) : (r2 = c2, n2 = s2, a2 = h.length), i2 > (a2 = (s2 = Math.ceil(o2 / 7)) > a2 ? s2 + 1 : a2 + 1) && (i2 = a2, r2.length = 1), r2.reverse(); i2--; )
      r2.push(0);
    r2.reverse();
  }
  for ((a2 = h.length) - (i2 = c2.length) < 0 && (i2 = a2, r2 = c2, c2 = h, h = r2), e2 = 0; i2; )
    e2 = (h[--i2] = h[i2] + c2[i2] + e2) / kn | 0, h[i2] %= kn;
  for (e2 && (h.unshift(e2), ++n2), a2 = h.length; h[--a2] == 0; )
    h.pop();
  return t3.d = h, t3.e = $n(h, n2), Sn ? Hn(t3, o2, u2) : t3;
}, Bn.precision = Bn.sd = function(t3) {
  var e2, r2 = this;
  if (t3 !== void 0 && t3 !== !!t3 && t3 !== 1 && t3 !== 0)
    throw Error(Tn + t3);
  return r2.d ? (e2 = Yn(r2.d), t3 && r2.e + 1 > e2 && (e2 = r2.e + 1)) : e2 = NaN, e2;
}, Bn.round = function() {
  var t3 = this, e2 = t3.constructor;
  return Hn(new e2(t3), t3.e + 1, e2.rounding);
}, Bn.sine = Bn.sin = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.isFinite() ? r2.isZero() ? new n2(r2) : (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + Math.max(r2.e, r2.sd()) + 7, n2.rounding = 1, r2 = function(t4, e3) {
    var r3, n3 = e3.d.length;
    if (n3 < 3)
      return ni(t4, 2, e3, e3);
    r3 = (r3 = 1.4 * Math.sqrt(n3)) > 16 ? 16 : 0 | r3, e3 = e3.times(1 / ii(5, r3)), e3 = ni(t4, 2, e3, e3);
    for (var i2, s2 = new t4(5), a2 = new t4(16), o2 = new t4(20); r3--; )
      i2 = e3.times(e3), e3 = e3.times(s2.plus(i2.times(a2.times(i2).minus(o2))));
    return e3;
  }(n2, si(n2, r2)), n2.precision = t3, n2.rounding = e2, Hn(xn > 2 ? r2.neg() : r2, t3, e2, true)) : new n2(NaN);
}, Bn.squareRoot = Bn.sqrt = function() {
  var t3, e2, r2, n2, i2, s2, a2 = this, o2 = a2.d, u2 = a2.e, h = a2.s, c2 = a2.constructor;
  if (h !== 1 || !o2 || !o2[0])
    return new c2(!h || h < 0 && (!o2 || o2[0]) ? NaN : o2 ? a2 : 1 / 0);
  for (Sn = false, (h = Math.sqrt(+a2)) == 0 || h == 1 / 0 ? (((e2 = Fn(o2)).length + u2) % 2 == 0 && (e2 += "0"), h = Math.sqrt(e2), u2 = On((u2 + 1) / 2) - (u2 < 0 || u2 % 2), n2 = new c2(e2 = h == 1 / 0 ? "5e" + u2 : (e2 = h.toExponential()).slice(0, e2.indexOf("e") + 1) + u2)) : n2 = new c2(h.toString()), r2 = (u2 = c2.precision) + 3; ; )
    if (n2 = (s2 = n2).plus(qn(a2, s2, r2 + 2, 1)).times(0.5), Fn(s2.d).slice(0, r2) === (e2 = Fn(n2.d)).slice(0, r2)) {
      if ((e2 = e2.slice(r2 - 3, r2 + 1)) != "9999" && (i2 || e2 != "4999")) {
        +e2 && (+e2.slice(1) || e2.charAt(0) != "5") || (Hn(n2, u2 + 1, 1), t3 = !n2.times(n2).eq(a2));
        break;
      }
      if (!i2 && (Hn(s2, u2 + 1, 0), s2.times(s2).eq(a2))) {
        n2 = s2;
        break;
      }
      r2 += 4, i2 = 1;
    }
  return Sn = true, Hn(n2, u2, c2.rounding, t3);
}, Bn.tangent = Bn.tan = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.isFinite() ? r2.isZero() ? new n2(r2) : (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + 10, n2.rounding = 1, (r2 = r2.sin()).s = 1, r2 = qn(r2, new n2(1).minus(r2.times(r2)).sqrt(), t3 + 10, 0), n2.precision = t3, n2.rounding = e2, Hn(xn == 2 || xn == 4 ? r2.neg() : r2, t3, e2, true)) : new n2(NaN);
}, Bn.times = Bn.mul = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h, c2 = this, l2 = c2.constructor, p2 = c2.d, f2 = (t3 = new l2(t3)).d;
  if (t3.s *= c2.s, !(p2 && p2[0] && f2 && f2[0]))
    return new l2(!t3.s || p2 && !p2[0] && !f2 || f2 && !f2[0] && !p2 ? NaN : p2 && f2 ? 0 * t3.s : t3.s / 0);
  for (r2 = On(c2.e / 7) + On(t3.e / 7), (u2 = p2.length) < (h = f2.length) && (s2 = p2, p2 = f2, f2 = s2, a2 = u2, u2 = h, h = a2), s2 = [], n2 = a2 = u2 + h; n2--; )
    s2.push(0);
  for (n2 = h; --n2 >= 0; ) {
    for (e2 = 0, i2 = u2 + n2; i2 > n2; )
      o2 = s2[i2] + f2[n2] * p2[i2 - n2 - 1] + e2, s2[i2--] = o2 % kn | 0, e2 = o2 / kn | 0;
    s2[i2] = (s2[i2] + e2) % kn | 0;
  }
  for (; !s2[--a2]; )
    s2.pop();
  return e2 ? ++r2 : s2.shift(), t3.d = s2, t3.e = $n(s2, r2), Sn ? Hn(t3, l2.precision, l2.rounding) : t3;
}, Bn.toBinary = function(t3, e2) {
  return ai(this, 2, t3, e2);
}, Bn.toDecimalPlaces = Bn.toDP = function(t3, e2) {
  var r2 = this, n2 = r2.constructor;
  return r2 = new n2(r2), t3 === void 0 ? r2 : (Pn(t3, 0, 1e9), e2 === void 0 ? e2 = n2.rounding : Pn(e2, 0, 8), Hn(r2, t3 + r2.e + 1, e2));
}, Bn.toExponential = function(t3, e2) {
  var r2, n2 = this, i2 = n2.constructor;
  return t3 === void 0 ? r2 = Vn(n2, true) : (Pn(t3, 0, 1e9), e2 === void 0 ? e2 = i2.rounding : Pn(e2, 0, 8), r2 = Vn(n2 = Hn(new i2(n2), t3 + 1, e2), true, t3 + 1)), n2.isNeg() && !n2.isZero() ? "-" + r2 : r2;
}, Bn.toFixed = function(t3, e2) {
  var r2, n2, i2 = this, s2 = i2.constructor;
  return t3 === void 0 ? r2 = Vn(i2) : (Pn(t3, 0, 1e9), e2 === void 0 ? e2 = s2.rounding : Pn(e2, 0, 8), r2 = Vn(n2 = Hn(new s2(i2), t3 + i2.e + 1, e2), false, t3 + n2.e + 1)), i2.isNeg() && !i2.isZero() ? "-" + r2 : r2;
}, Bn.toFraction = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = this, d2 = f2.d, m2 = f2.constructor;
  if (!d2)
    return new m2(f2);
  if (h = r2 = new m2(1), n2 = u2 = new m2(0), a2 = (s2 = (e2 = new m2(n2)).e = Yn(d2) - f2.e - 1) % 7, e2.d[0] = zn(10, a2 < 0 ? 7 + a2 : a2), t3 == null)
    t3 = s2 > 0 ? e2 : h;
  else {
    if (!(o2 = new m2(t3)).isInt() || o2.lt(h))
      throw Error(Tn + o2);
    t3 = o2.gt(e2) ? s2 > 0 ? e2 : h : o2;
  }
  for (Sn = false, o2 = new m2(Fn(d2)), c2 = m2.precision, m2.precision = s2 = 7 * d2.length * 2; l2 = qn(o2, e2, 0, 1, 1), (i2 = r2.plus(l2.times(n2))).cmp(t3) != 1; )
    r2 = n2, n2 = i2, i2 = h, h = u2.plus(l2.times(i2)), u2 = i2, i2 = e2, e2 = o2.minus(l2.times(i2)), o2 = i2;
  return i2 = qn(t3.minus(r2), n2, 0, 1, 1), u2 = u2.plus(i2.times(h)), r2 = r2.plus(i2.times(n2)), u2.s = h.s = f2.s, p2 = qn(h, n2, s2, 1).minus(f2).abs().cmp(qn(u2, r2, s2, 1).minus(f2).abs()) < 1 ? [h, n2] : [u2, r2], m2.precision = c2, Sn = true, p2;
}, Bn.toHexadecimal = Bn.toHex = function(t3, e2) {
  return ai(this, 16, t3, e2);
}, Bn.toNearest = function(t3, e2) {
  var r2 = this, n2 = r2.constructor;
  if (r2 = new n2(r2), t3 == null) {
    if (!r2.d)
      return r2;
    t3 = new n2(1), e2 = n2.rounding;
  } else {
    if (t3 = new n2(t3), e2 === void 0 ? e2 = n2.rounding : Pn(e2, 0, 8), !r2.d)
      return t3.s ? r2 : t3;
    if (!t3.d)
      return t3.s && (t3.s = r2.s), t3;
  }
  return t3.d[0] ? (Sn = false, r2 = qn(r2, t3, 0, e2, 1).times(t3), Sn = true, Hn(r2)) : (t3.s = r2.s, r2 = t3), r2;
}, Bn.toNumber = function() {
  return +this;
}, Bn.toOctal = function(t3, e2) {
  return ai(this, 8, t3, e2);
}, Bn.toPower = Bn.pow = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2 = this, u2 = o2.constructor, h = +(t3 = new u2(t3));
  if (!(o2.d && t3.d && o2.d[0] && t3.d[0]))
    return new u2(zn(+o2, h));
  if ((o2 = new u2(o2)).eq(1))
    return o2;
  if (n2 = u2.precision, s2 = u2.rounding, t3.eq(1))
    return Hn(o2, n2, s2);
  if ((e2 = On(t3.e / 7)) >= t3.d.length - 1 && (r2 = h < 0 ? -h : h) <= 9007199254740991)
    return i2 = Xn(u2, o2, r2, n2), t3.s < 0 ? new u2(1).div(i2) : Hn(i2, n2, s2);
  if ((a2 = o2.s) < 0) {
    if (e2 < t3.d.length - 1)
      return new u2(NaN);
    if ((1 & t3.d[e2]) == 0 && (a2 = 1), o2.e == 0 && o2.d[0] == 1 && o2.d.length == 1)
      return o2.s = a2, o2;
  }
  return (e2 = (r2 = zn(+o2, h)) != 0 && isFinite(r2) ? new u2(r2 + "").e : On(h * (Math.log("0." + Fn(o2.d)) / Math.LN10 + o2.e + 1))) > u2.maxE + 1 || e2 < u2.minE - 1 ? new u2(e2 > 0 ? a2 / 0 : 0) : (Sn = false, u2.rounding = o2.s = 1, r2 = Math.min(12, (e2 + "").length), (i2 = Kn(t3.times(ti(o2, n2 + r2)), n2)).d && Un((i2 = Hn(i2, n2 + 5, 1)).d, n2, s2) && (e2 = n2 + 10, +Fn((i2 = Hn(Kn(t3.times(ti(o2, e2 + r2)), e2), e2 + 5, 1)).d).slice(n2 + 1, n2 + 15) + 1 == 1e14 && (i2 = Hn(i2, n2 + 1, 0))), i2.s = a2, Sn = true, u2.rounding = s2, Hn(i2, n2, s2));
}, Bn.toPrecision = function(t3, e2) {
  var r2, n2 = this, i2 = n2.constructor;
  return t3 === void 0 ? r2 = Vn(n2, n2.e <= i2.toExpNeg || n2.e >= i2.toExpPos) : (Pn(t3, 1, 1e9), e2 === void 0 ? e2 = i2.rounding : Pn(e2, 0, 8), r2 = Vn(n2 = Hn(new i2(n2), t3, e2), t3 <= n2.e || n2.e <= i2.toExpNeg, t3)), n2.isNeg() && !n2.isZero() ? "-" + r2 : r2;
}, Bn.toSignificantDigits = Bn.toSD = function(t3, e2) {
  var r2 = this.constructor;
  return t3 === void 0 ? (t3 = r2.precision, e2 = r2.rounding) : (Pn(t3, 1, 1e9), e2 === void 0 ? e2 = r2.rounding : Pn(e2, 0, 8)), Hn(new r2(this), t3, e2);
}, Bn.toString = function() {
  var t3 = this, e2 = t3.constructor, r2 = Vn(t3, t3.e <= e2.toExpNeg || t3.e >= e2.toExpPos);
  return t3.isNeg() && !t3.isZero() ? "-" + r2 : r2;
}, Bn.truncated = Bn.trunc = function() {
  return Hn(new this.constructor(this), this.e + 1, 1);
}, Bn.valueOf = Bn.toJSON = function() {
  var t3 = this, e2 = t3.constructor, r2 = Vn(t3, t3.e <= e2.toExpNeg || t3.e >= e2.toExpPos);
  return t3.isNeg() ? "-" + r2 : r2;
};
var qn = function() {
  function t3(t4, e3, r3) {
    var n2, i2 = 0, s2 = t4.length;
    for (t4 = t4.slice(); s2--; )
      n2 = t4[s2] * e3 + i2, t4[s2] = n2 % r3 | 0, i2 = n2 / r3 | 0;
    return i2 && t4.unshift(i2), t4;
  }
  function e2(t4, e3, r3, n2) {
    var i2, s2;
    if (r3 != n2)
      s2 = r3 > n2 ? 1 : -1;
    else
      for (i2 = s2 = 0; i2 < r3; i2++)
        if (t4[i2] != e3[i2]) {
          s2 = t4[i2] > e3[i2] ? 1 : -1;
          break;
        }
    return s2;
  }
  function r2(t4, e3, r3, n2) {
    for (var i2 = 0; r3--; )
      t4[r3] -= i2, i2 = t4[r3] < e3[r3] ? 1 : 0, t4[r3] = i2 * n2 + t4[r3] - e3[r3];
    for (; !t4[0] && t4.length > 1; )
      t4.shift();
  }
  return function(n2, i2, s2, a2, o2, u2) {
    var h, c2, l2, p2, f2, d2, m2, y2, g2, v, x, w, b, _, M, E, N, S, T, O2, z2 = n2.constructor, A2 = n2.s == i2.s ? 1 : -1, C2 = n2.d, R2 = i2.d;
    if (!(C2 && C2[0] && R2 && R2[0]))
      return new z2(n2.s && i2.s && (C2 ? !R2 || C2[0] != R2[0] : R2) ? C2 && C2[0] == 0 || !R2 ? 0 * A2 : A2 / 0 : NaN);
    for (u2 ? (f2 = 1, c2 = n2.e - i2.e) : (u2 = kn, f2 = 7, c2 = On(n2.e / f2) - On(i2.e / f2)), T = R2.length, N = C2.length, v = (g2 = new z2(A2)).d = [], l2 = 0; R2[l2] == (C2[l2] || 0); l2++)
      ;
    if (R2[l2] > (C2[l2] || 0) && c2--, s2 == null ? (_ = s2 = z2.precision, a2 = z2.rounding) : _ = o2 ? s2 + (n2.e - i2.e) + 1 : s2, _ < 0)
      v.push(1), d2 = true;
    else {
      if (_ = _ / f2 + 2 | 0, l2 = 0, T == 1) {
        for (p2 = 0, R2 = R2[0], _++; (l2 < N || p2) && _--; l2++)
          M = p2 * u2 + (C2[l2] || 0), v[l2] = M / R2 | 0, p2 = M % R2 | 0;
        d2 = p2 || l2 < N;
      } else {
        for ((p2 = u2 / (R2[0] + 1) | 0) > 1 && (R2 = t3(R2, p2, u2), C2 = t3(C2, p2, u2), T = R2.length, N = C2.length), E = T, w = (x = C2.slice(0, T)).length; w < T; )
          x[w++] = 0;
        (O2 = R2.slice()).unshift(0), S = R2[0], R2[1] >= u2 / 2 && ++S;
        do {
          p2 = 0, (h = e2(R2, x, T, w)) < 0 ? (b = x[0], T != w && (b = b * u2 + (x[1] || 0)), (p2 = b / S | 0) > 1 ? (p2 >= u2 && (p2 = u2 - 1), (h = e2(m2 = t3(R2, p2, u2), x, y2 = m2.length, w = x.length)) == 1 && (p2--, r2(m2, T < y2 ? O2 : R2, y2, u2))) : (p2 == 0 && (h = p2 = 1), m2 = R2.slice()), (y2 = m2.length) < w && m2.unshift(0), r2(x, m2, w, u2), h == -1 && (h = e2(R2, x, T, w = x.length)) < 1 && (p2++, r2(x, T < w ? O2 : R2, w, u2)), w = x.length) : h === 0 && (p2++, x = [0]), v[l2++] = p2, h && x[0] ? x[w++] = C2[E] || 0 : (x = [C2[E]], w = 1);
        } while ((E++ < N || x[0] !== void 0) && _--);
        d2 = x[0] !== void 0;
      }
      v[0] || v.shift();
    }
    if (f2 == 1)
      g2.e = c2, vn = d2;
    else {
      for (l2 = 1, p2 = v[0]; p2 >= 10; p2 /= 10)
        l2++;
      g2.e = l2 + c2 * f2 - 1, Hn(g2, o2 ? s2 + g2.e + 1 : s2, a2, d2);
    }
    return g2;
  };
}();
function Hn(t3, e2, r2, n2) {
  var i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = t3.constructor;
  t:
    if (e2 != null) {
      if (!(l2 = t3.d))
        return t3;
      for (i2 = 1, o2 = l2[0]; o2 >= 10; o2 /= 10)
        i2++;
      if ((s2 = e2 - i2) < 0)
        s2 += 7, a2 = e2, u2 = (c2 = l2[p2 = 0]) / zn(10, i2 - a2 - 1) % 10 | 0;
      else if ((p2 = Math.ceil((s2 + 1) / 7)) >= (o2 = l2.length)) {
        if (!n2)
          break t;
        for (; o2++ <= p2; )
          l2.push(0);
        c2 = u2 = 0, i2 = 1, a2 = (s2 %= 7) - 7 + 1;
      } else {
        for (c2 = o2 = l2[p2], i2 = 1; o2 >= 10; o2 /= 10)
          i2++;
        u2 = (a2 = (s2 %= 7) - 7 + i2) < 0 ? 0 : c2 / zn(10, i2 - a2 - 1) % 10 | 0;
      }
      if (n2 = n2 || e2 < 0 || l2[p2 + 1] !== void 0 || (a2 < 0 ? c2 : c2 % zn(10, i2 - a2 - 1)), h = r2 < 4 ? (u2 || n2) && (r2 == 0 || r2 == (t3.s < 0 ? 3 : 2)) : u2 > 5 || u2 == 5 && (r2 == 4 || n2 || r2 == 6 && (s2 > 0 ? a2 > 0 ? c2 / zn(10, i2 - a2) : 0 : l2[p2 - 1]) % 10 & 1 || r2 == (t3.s < 0 ? 8 : 7)), e2 < 1 || !l2[0])
        return l2.length = 0, h ? (e2 -= t3.e + 1, l2[0] = zn(10, (7 - e2 % 7) % 7), t3.e = -e2 || 0) : l2[0] = t3.e = 0, t3;
      if (s2 == 0 ? (l2.length = p2, o2 = 1, p2--) : (l2.length = p2 + 1, o2 = zn(10, 7 - s2), l2[p2] = a2 > 0 ? (c2 / zn(10, i2 - a2) % zn(10, a2) | 0) * o2 : 0), h)
        for (; ; ) {
          if (p2 == 0) {
            for (s2 = 1, a2 = l2[0]; a2 >= 10; a2 /= 10)
              s2++;
            for (a2 = l2[0] += o2, o2 = 1; a2 >= 10; a2 /= 10)
              o2++;
            s2 != o2 && (t3.e++, l2[0] == kn && (l2[0] = 1));
            break;
          }
          if (l2[p2] += o2, l2[p2] != kn)
            break;
          l2[p2--] = 0, o2 = 1;
        }
      for (s2 = l2.length; l2[--s2] === 0; )
        l2.pop();
    }
  return Sn && (t3.e > f2.maxE ? (t3.d = null, t3.e = NaN) : t3.e < f2.minE && (t3.e = 0, t3.d = [0])), t3;
}
function Vn(t3, e2, r2) {
  if (!t3.isFinite())
    return ei(t3);
  var n2, i2 = t3.e, s2 = Fn(t3.d), a2 = s2.length;
  return e2 ? (r2 && (n2 = r2 - a2) > 0 ? s2 = s2.charAt(0) + "." + s2.slice(1) + Zn(n2) : a2 > 1 && (s2 = s2.charAt(0) + "." + s2.slice(1)), s2 = s2 + (t3.e < 0 ? "e" : "e+") + t3.e) : i2 < 0 ? (s2 = "0." + Zn(-i2 - 1) + s2, r2 && (n2 = r2 - a2) > 0 && (s2 += Zn(n2))) : i2 >= a2 ? (s2 += Zn(i2 + 1 - a2), r2 && (n2 = r2 - i2 - 1) > 0 && (s2 = s2 + "." + Zn(n2))) : ((n2 = i2 + 1) < a2 && (s2 = s2.slice(0, n2) + "." + s2.slice(n2)), r2 && (n2 = r2 - a2) > 0 && (i2 + 1 === a2 && (s2 += "."), s2 += Zn(n2))), s2;
}
function $n(t3, e2) {
  var r2 = t3[0];
  for (e2 *= 7; r2 >= 10; r2 /= 10)
    e2++;
  return e2;
}
function Gn(t3, e2, r2) {
  if (e2 > In)
    throw Sn = true, r2 && (t3.precision = r2), Error("[DecimalError] Precision limit exceeded");
  return Hn(new t3(Mn), e2, 1, true);
}
function Wn(t3, e2, r2) {
  if (e2 > Ln)
    throw Error("[DecimalError] Precision limit exceeded");
  return Hn(new t3(En), e2, r2, true);
}
function Yn(t3) {
  var e2 = t3.length - 1, r2 = 7 * e2 + 1;
  if (e2 = t3[e2]) {
    for (; e2 % 10 == 0; e2 /= 10)
      r2--;
    for (e2 = t3[0]; e2 >= 10; e2 /= 10)
      r2++;
  }
  return r2;
}
function Zn(t3) {
  for (var e2 = ""; t3--; )
    e2 += "0";
  return e2;
}
function Xn(t3, e2, r2, n2) {
  var i2, s2 = new t3(1), a2 = Math.ceil(n2 / 7 + 4);
  for (Sn = false; ; ) {
    if (r2 % 2 && oi((s2 = s2.times(e2)).d, a2) && (i2 = true), (r2 = On(r2 / 2)) === 0) {
      r2 = s2.d.length - 1, i2 && s2.d[r2] === 0 && ++s2.d[r2];
      break;
    }
    oi((e2 = e2.times(e2)).d, a2);
  }
  return Sn = true, s2;
}
function Qn(t3) {
  return 1 & t3.d[t3.d.length - 1];
}
function Jn(t3, e2, r2) {
  for (var n2, i2 = new t3(e2[0]), s2 = 0; ++s2 < e2.length; ) {
    if (!(n2 = new t3(e2[s2])).s) {
      i2 = n2;
      break;
    }
    i2[r2](n2) && (i2 = n2);
  }
  return i2;
}
function Kn(t3, e2) {
  var r2, n2, i2, s2, a2, o2, u2, h = 0, c2 = 0, l2 = 0, p2 = t3.constructor, f2 = p2.rounding, d2 = p2.precision;
  if (!t3.d || !t3.d[0] || t3.e > 17)
    return new p2(t3.d ? t3.d[0] ? t3.s < 0 ? 0 : 1 / 0 : 1 : t3.s ? t3.s < 0 ? 0 : t3 : NaN);
  for (e2 == null ? (Sn = false, u2 = d2) : u2 = e2, o2 = new p2(0.03125); t3.e > -2; )
    t3 = t3.times(o2), l2 += 5;
  for (u2 += n2 = Math.log(zn(2, l2)) / Math.LN10 * 2 + 5 | 0, r2 = s2 = a2 = new p2(1), p2.precision = u2; ; ) {
    if (s2 = Hn(s2.times(t3), u2, 1), r2 = r2.times(++c2), Fn((o2 = a2.plus(qn(s2, r2, u2, 1))).d).slice(0, u2) === Fn(a2.d).slice(0, u2)) {
      for (i2 = l2; i2--; )
        a2 = Hn(a2.times(a2), u2, 1);
      if (e2 != null)
        return p2.precision = d2, a2;
      if (!(h < 3 && Un(a2.d, u2 - n2, f2, h)))
        return Hn(a2, p2.precision = d2, f2, Sn = true);
      p2.precision = u2 += 10, r2 = s2 = o2 = new p2(1), c2 = 0, h++;
    }
    a2 = o2;
  }
}
function ti(t3, e2) {
  var r2, n2, i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = 1, d2 = t3, m2 = d2.d, y2 = d2.constructor, g2 = y2.rounding, v = y2.precision;
  if (d2.s < 0 || !m2 || !m2[0] || !d2.e && m2[0] == 1 && m2.length == 1)
    return new y2(m2 && !m2[0] ? -1 / 0 : d2.s != 1 ? NaN : m2 ? 0 : d2);
  if (e2 == null ? (Sn = false, c2 = v) : c2 = e2, y2.precision = c2 += 10, n2 = (r2 = Fn(m2)).charAt(0), !(Math.abs(s2 = d2.e) < 15e14))
    return h = Gn(y2, c2 + 2, v).times(s2 + ""), d2 = ti(new y2(n2 + "." + r2.slice(1)), c2 - 10).plus(h), y2.precision = v, e2 == null ? Hn(d2, v, g2, Sn = true) : d2;
  for (; n2 < 7 && n2 != 1 || n2 == 1 && r2.charAt(1) > 3; )
    n2 = (r2 = Fn((d2 = d2.times(t3)).d)).charAt(0), f2++;
  for (s2 = d2.e, n2 > 1 ? (d2 = new y2("0." + r2), s2++) : d2 = new y2(n2 + "." + r2.slice(1)), l2 = d2, u2 = a2 = d2 = qn(d2.minus(1), d2.plus(1), c2, 1), p2 = Hn(d2.times(d2), c2, 1), i2 = 3; ; ) {
    if (a2 = Hn(a2.times(p2), c2, 1), Fn((h = u2.plus(qn(a2, new y2(i2), c2, 1))).d).slice(0, c2) === Fn(u2.d).slice(0, c2)) {
      if (u2 = u2.times(2), s2 !== 0 && (u2 = u2.plus(Gn(y2, c2 + 2, v).times(s2 + ""))), u2 = qn(u2, new y2(f2), c2, 1), e2 != null)
        return y2.precision = v, u2;
      if (!Un(u2.d, c2 - 10, g2, o2))
        return Hn(u2, y2.precision = v, g2, Sn = true);
      y2.precision = c2 += 10, h = a2 = d2 = qn(l2.minus(1), l2.plus(1), c2, 1), p2 = Hn(d2.times(d2), c2, 1), i2 = o2 = 1;
    }
    u2 = h, i2 += 2;
  }
}
function ei(t3) {
  return String(t3.s * t3.s / 0);
}
function ri(t3, e2) {
  var r2, n2, i2;
  for ((r2 = e2.indexOf(".")) > -1 && (e2 = e2.replace(".", "")), (n2 = e2.search(/e/i)) > 0 ? (r2 < 0 && (r2 = n2), r2 += +e2.slice(n2 + 1), e2 = e2.substring(0, n2)) : r2 < 0 && (r2 = e2.length), n2 = 0; e2.charCodeAt(n2) === 48; n2++)
    ;
  for (i2 = e2.length; e2.charCodeAt(i2 - 1) === 48; --i2)
    ;
  if (e2 = e2.slice(n2, i2)) {
    if (i2 -= n2, t3.e = r2 = r2 - n2 - 1, t3.d = [], n2 = (r2 + 1) % 7, r2 < 0 && (n2 += 7), n2 < i2) {
      for (n2 && t3.d.push(+e2.slice(0, n2)), i2 -= 7; n2 < i2; )
        t3.d.push(+e2.slice(n2, n2 += 7));
      n2 = 7 - (e2 = e2.slice(n2)).length;
    } else
      n2 -= i2;
    for (; n2--; )
      e2 += "0";
    t3.d.push(+e2), Sn && (t3.e > t3.constructor.maxE ? (t3.d = null, t3.e = NaN) : t3.e < t3.constructor.minE && (t3.e = 0, t3.d = [0]));
  } else
    t3.e = 0, t3.d = [0];
  return t3;
}
function ni(t3, e2, r2, n2, i2) {
  var s2, a2, o2, u2, h = t3.precision, c2 = Math.ceil(h / 7);
  for (Sn = false, u2 = r2.times(r2), o2 = new t3(n2); ; ) {
    if (a2 = qn(o2.times(u2), new t3(e2++ * e2++), h, 1), o2 = i2 ? n2.plus(a2) : n2.minus(a2), n2 = qn(a2.times(u2), new t3(e2++ * e2++), h, 1), (a2 = o2.plus(n2)).d[c2] !== void 0) {
      for (s2 = c2; a2.d[s2] === o2.d[s2] && s2--; )
        ;
      if (s2 == -1)
        break;
    }
    s2 = o2, o2 = n2, n2 = a2, a2 = s2;
  }
  return Sn = true, a2.d.length = c2 + 1, a2;
}
function ii(t3, e2) {
  for (var r2 = t3; --e2; )
    r2 *= t3;
  return r2;
}
function si(t3, e2) {
  var r2, n2 = e2.s < 0, i2 = Wn(t3, t3.precision, 1), s2 = i2.times(0.5);
  if ((e2 = e2.abs()).lte(s2))
    return xn = n2 ? 4 : 1, e2;
  if ((r2 = e2.divToInt(i2)).isZero())
    xn = n2 ? 3 : 2;
  else {
    if ((e2 = e2.minus(r2.times(i2))).lte(s2))
      return xn = Qn(r2) ? n2 ? 2 : 3 : n2 ? 4 : 1, e2;
    xn = Qn(r2) ? n2 ? 1 : 4 : n2 ? 3 : 2;
  }
  return e2.minus(i2).abs();
}
function ai(t3, e2, r2, n2) {
  var i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = t3.constructor, d2 = r2 !== void 0;
  if (d2 ? (Pn(r2, 1, 1e9), n2 === void 0 ? n2 = f2.rounding : Pn(n2, 0, 8)) : (r2 = f2.precision, n2 = f2.rounding), t3.isFinite()) {
    for (d2 ? (i2 = 2, e2 == 16 ? r2 = 4 * r2 - 3 : e2 == 8 && (r2 = 3 * r2 - 2)) : i2 = e2, (a2 = (c2 = Vn(t3)).indexOf(".")) >= 0 && (c2 = c2.replace(".", ""), (p2 = new f2(1)).e = c2.length - a2, p2.d = jn(Vn(p2), 10, i2), p2.e = p2.d.length), s2 = u2 = (l2 = jn(c2, 10, i2)).length; l2[--u2] == 0; )
      l2.pop();
    if (l2[0]) {
      if (a2 < 0 ? s2-- : ((t3 = new f2(t3)).d = l2, t3.e = s2, l2 = (t3 = qn(t3, p2, r2, n2, 0, i2)).d, s2 = t3.e, h = vn), a2 = l2[r2], o2 = i2 / 2, h = h || l2[r2 + 1] !== void 0, h = n2 < 4 ? (a2 !== void 0 || h) && (n2 === 0 || n2 === (t3.s < 0 ? 3 : 2)) : a2 > o2 || a2 === o2 && (n2 === 4 || h || n2 === 6 && 1 & l2[r2 - 1] || n2 === (t3.s < 0 ? 8 : 7)), l2.length = r2, h)
        for (; ++l2[--r2] > i2 - 1; )
          l2[r2] = 0, r2 || (++s2, l2.unshift(1));
      for (u2 = l2.length; !l2[u2 - 1]; --u2)
        ;
      for (a2 = 0, c2 = ""; a2 < u2; a2++)
        c2 += _n.charAt(l2[a2]);
      if (d2) {
        if (u2 > 1)
          if (e2 == 16 || e2 == 8) {
            for (a2 = e2 == 16 ? 4 : 3, --u2; u2 % a2; u2++)
              c2 += "0";
            for (u2 = (l2 = jn(c2, i2, e2)).length; !l2[u2 - 1]; --u2)
              ;
            for (a2 = 1, c2 = "1."; a2 < u2; a2++)
              c2 += _n.charAt(l2[a2]);
          } else
            c2 = c2.charAt(0) + "." + c2.slice(1);
        c2 = c2 + (s2 < 0 ? "p" : "p+") + s2;
      } else if (s2 < 0) {
        for (; ++s2; )
          c2 = "0" + c2;
        c2 = "0." + c2;
      } else if (++s2 > u2)
        for (s2 -= u2; s2--; )
          c2 += "0";
      else
        s2 < u2 && (c2 = c2.slice(0, s2) + "." + c2.slice(s2));
    } else
      c2 = d2 ? "0p+0" : "0";
    c2 = (e2 == 16 ? "0x" : e2 == 2 ? "0b" : e2 == 8 ? "0o" : "") + c2;
  } else
    c2 = ei(t3);
  return t3.s < 0 ? "-" + c2 : c2;
}
function oi(t3, e2) {
  if (t3.length > e2)
    return t3.length = e2, true;
}
function ui(t3) {
  return new this(t3).abs();
}
function hi(t3) {
  return new this(t3).acos();
}
function ci(t3) {
  return new this(t3).acosh();
}
function li(t3, e2) {
  return new this(t3).plus(e2);
}
function pi(t3) {
  return new this(t3).asin();
}
function fi(t3) {
  return new this(t3).asinh();
}
function di(t3) {
  return new this(t3).atan();
}
function mi(t3) {
  return new this(t3).atanh();
}
function yi(t3, e2) {
  t3 = new this(t3), e2 = new this(e2);
  var r2, n2 = this.precision, i2 = this.rounding, s2 = n2 + 4;
  return t3.s && e2.s ? t3.d || e2.d ? !e2.d || t3.isZero() ? (r2 = e2.s < 0 ? Wn(this, n2, i2) : new this(0)).s = t3.s : !t3.d || e2.isZero() ? (r2 = Wn(this, s2, 1).times(0.5)).s = t3.s : e2.s < 0 ? (this.precision = s2, this.rounding = 1, r2 = this.atan(qn(t3, e2, s2, 1)), e2 = Wn(this, s2, 1), this.precision = n2, this.rounding = i2, r2 = t3.s < 0 ? r2.minus(e2) : r2.plus(e2)) : r2 = this.atan(qn(t3, e2, s2, 1)) : (r2 = Wn(this, s2, 1).times(e2.s > 0 ? 0.25 : 0.75)).s = t3.s : r2 = new this(NaN), r2;
}
function gi(t3) {
  return new this(t3).cbrt();
}
function vi(t3) {
  return Hn(t3 = new this(t3), t3.e + 1, 2);
}
function xi(t3) {
  if (!t3 || typeof t3 != "object")
    throw Error("[DecimalError] Object expected");
  var e2, r2, n2, i2 = t3.defaults === true, s2 = ["precision", 1, 1e9, "rounding", 0, 8, "toExpNeg", -bn, 0, "toExpPos", 0, bn, "maxE", 0, bn, "minE", -bn, 0, "modulo", 0, 9];
  for (e2 = 0; e2 < s2.length; e2 += 3)
    if (r2 = s2[e2], i2 && (this[r2] = Nn[r2]), (n2 = t3[r2]) !== void 0) {
      if (!(On(n2) === n2 && n2 >= s2[e2 + 1] && n2 <= s2[e2 + 2]))
        throw Error(Tn + r2 + ": " + n2);
      this[r2] = n2;
    }
  if (r2 = "crypto", i2 && (this[r2] = Nn[r2]), (n2 = t3[r2]) !== void 0) {
    if (n2 !== true && n2 !== false && n2 !== 0 && n2 !== 1)
      throw Error(Tn + r2 + ": " + n2);
    if (n2) {
      if (typeof crypto == "undefined" || !crypto || !crypto.getRandomValues && !crypto.randomBytes)
        throw Error("[DecimalError] crypto unavailable");
      this[r2] = true;
    } else
      this[r2] = false;
  }
  return this;
}
function wi(t3) {
  return new this(t3).cos();
}
function bi(t3) {
  return new this(t3).cosh();
}
function _i(t3, e2) {
  return new this(t3).div(e2);
}
function Mi(t3) {
  return new this(t3).exp();
}
function Ei(t3) {
  return Hn(t3 = new this(t3), t3.e + 1, 3);
}
function Ni() {
  var t3, e2, r2 = new this(0);
  for (Sn = false, t3 = 0; t3 < arguments.length; )
    if ((e2 = new this(arguments[t3++])).d)
      r2.d && (r2 = r2.plus(e2.times(e2)));
    else {
      if (e2.s)
        return Sn = true, new this(1 / 0);
      r2 = e2;
    }
  return Sn = true, r2.sqrt();
}
function Si(t3) {
  return t3 instanceof Gi || t3 && t3.name === "[object Decimal]" || false;
}
function Ti(t3) {
  return new this(t3).ln();
}
function Oi(t3, e2) {
  return new this(t3).log(e2);
}
function zi(t3) {
  return new this(t3).log(2);
}
function Ai(t3) {
  return new this(t3).log(10);
}
function Ci() {
  return Jn(this, arguments, "lt");
}
function Ri() {
  return Jn(this, arguments, "gt");
}
function Di(t3, e2) {
  return new this(t3).mod(e2);
}
function ki(t3, e2) {
  return new this(t3).mul(e2);
}
function Ii(t3, e2) {
  return new this(t3).pow(e2);
}
function Li(t3) {
  var e2, r2, n2, i2, s2 = 0, a2 = new this(1), o2 = [];
  if (t3 === void 0 ? t3 = this.precision : Pn(t3, 1, 1e9), n2 = Math.ceil(t3 / 7), this.crypto)
    if (crypto.getRandomValues)
      for (e2 = crypto.getRandomValues(new Uint32Array(n2)); s2 < n2; )
        (i2 = e2[s2]) >= 429e7 ? e2[s2] = crypto.getRandomValues(new Uint32Array(1))[0] : o2[s2++] = i2 % 1e7;
    else {
      if (!crypto.randomBytes)
        throw Error("[DecimalError] crypto unavailable");
      for (e2 = crypto.randomBytes(n2 *= 4); s2 < n2; )
        (i2 = e2[s2] + (e2[s2 + 1] << 8) + (e2[s2 + 2] << 16) + ((127 & e2[s2 + 3]) << 24)) >= 214e7 ? crypto.randomBytes(4).copy(e2, s2) : (o2.push(i2 % 1e7), s2 += 4);
      s2 = n2 / 4;
    }
  else
    for (; s2 < n2; )
      o2[s2++] = 1e7 * Math.random() | 0;
  for (t3 %= 7, (n2 = o2[--s2]) && t3 && (i2 = zn(10, 7 - t3), o2[s2] = (n2 / i2 | 0) * i2); o2[s2] === 0; s2--)
    o2.pop();
  if (s2 < 0)
    r2 = 0, o2 = [0];
  else {
    for (r2 = -1; o2[0] === 0; r2 -= 7)
      o2.shift();
    for (n2 = 1, i2 = o2[0]; i2 >= 10; i2 /= 10)
      n2++;
    n2 < 7 && (r2 -= 7 - n2);
  }
  return a2.e = r2, a2.d = o2, a2;
}
function Bi(t3) {
  return Hn(t3 = new this(t3), t3.e + 1, this.rounding);
}
function Fi(t3) {
  return (t3 = new this(t3)).d ? t3.d[0] ? t3.s : 0 * t3.s : t3.s || NaN;
}
function Pi(t3) {
  return new this(t3).sin();
}
function Ui(t3) {
  return new this(t3).sinh();
}
function ji(t3) {
  return new this(t3).sqrt();
}
function qi(t3, e2) {
  return new this(t3).sub(e2);
}
function Hi(t3) {
  return new this(t3).tan();
}
function Vi(t3) {
  return new this(t3).tanh();
}
function $i(t3) {
  return Hn(t3 = new this(t3), t3.e + 1, 1);
}
Bn[Symbol.for("nodejs.util.inspect.custom")] = Bn.toString, Bn[Symbol.toStringTag] = "Decimal";
var Gi = function t2(e2) {
  var r2, n2, i2;
  function s2(t3) {
    var e3, r3, n3, i3 = this;
    if (!(i3 instanceof s2))
      return new s2(t3);
    if (i3.constructor = s2, t3 instanceof s2)
      return i3.s = t3.s, void (Sn ? !t3.d || t3.e > s2.maxE ? (i3.e = NaN, i3.d = null) : t3.e < s2.minE ? (i3.e = 0, i3.d = [0]) : (i3.e = t3.e, i3.d = t3.d.slice()) : (i3.e = t3.e, i3.d = t3.d ? t3.d.slice() : t3.d));
    if ((n3 = typeof t3) === "number") {
      if (t3 === 0)
        return i3.s = 1 / t3 < 0 ? -1 : 1, i3.e = 0, void (i3.d = [0]);
      if (t3 < 0 ? (t3 = -t3, i3.s = -1) : i3.s = 1, t3 === ~~t3 && t3 < 1e7) {
        for (e3 = 0, r3 = t3; r3 >= 10; r3 /= 10)
          e3++;
        return void (Sn ? e3 > s2.maxE ? (i3.e = NaN, i3.d = null) : e3 < s2.minE ? (i3.e = 0, i3.d = [0]) : (i3.e = e3, i3.d = [t3]) : (i3.e = e3, i3.d = [t3]));
      }
      return 0 * t3 != 0 ? (t3 || (i3.s = NaN), i3.e = NaN, void (i3.d = null)) : ri(i3, t3.toString());
    }
    if (n3 !== "string")
      throw Error(Tn + t3);
    return (r3 = t3.charCodeAt(0)) === 45 ? (t3 = t3.slice(1), i3.s = -1) : (r3 === 43 && (t3 = t3.slice(1)), i3.s = 1), Dn.test(t3) ? ri(i3, t3) : function(t4, e4) {
      var r4, n4, i4, s3, a2, o2, u2, h, c2;
      if (e4 === "Infinity" || e4 === "NaN")
        return +e4 || (t4.s = NaN), t4.e = NaN, t4.d = null, t4;
      if (Cn.test(e4))
        r4 = 16, e4 = e4.toLowerCase();
      else if (An.test(e4))
        r4 = 2;
      else {
        if (!Rn.test(e4))
          throw Error(Tn + e4);
        r4 = 8;
      }
      for ((s3 = e4.search(/p/i)) > 0 ? (u2 = +e4.slice(s3 + 1), e4 = e4.substring(2, s3)) : e4 = e4.slice(2), a2 = (s3 = e4.indexOf(".")) >= 0, n4 = t4.constructor, a2 && (s3 = (o2 = (e4 = e4.replace(".", "")).length) - s3, i4 = Xn(n4, new n4(r4), s3, 2 * s3)), s3 = c2 = (h = jn(e4, r4, kn)).length - 1; h[s3] === 0; --s3)
        h.pop();
      return s3 < 0 ? new n4(0 * t4.s) : (t4.e = $n(h, c2), t4.d = h, Sn = false, a2 && (t4 = qn(t4, i4, 4 * o2)), u2 && (t4 = t4.times(Math.abs(u2) < 54 ? zn(2, u2) : Gi.pow(2, u2))), Sn = true, t4);
    }(i3, t3);
  }
  if (s2.prototype = Bn, s2.ROUND_UP = 0, s2.ROUND_DOWN = 1, s2.ROUND_CEIL = 2, s2.ROUND_FLOOR = 3, s2.ROUND_HALF_UP = 4, s2.ROUND_HALF_DOWN = 5, s2.ROUND_HALF_EVEN = 6, s2.ROUND_HALF_CEIL = 7, s2.ROUND_HALF_FLOOR = 8, s2.EUCLID = 9, s2.config = s2.set = xi, s2.clone = t2, s2.isDecimal = Si, s2.abs = ui, s2.acos = hi, s2.acosh = ci, s2.add = li, s2.asin = pi, s2.asinh = fi, s2.atan = di, s2.atanh = mi, s2.atan2 = yi, s2.cbrt = gi, s2.ceil = vi, s2.cos = wi, s2.cosh = bi, s2.div = _i, s2.exp = Mi, s2.floor = Ei, s2.hypot = Ni, s2.ln = Ti, s2.log = Oi, s2.log10 = Ai, s2.log2 = zi, s2.max = Ci, s2.min = Ri, s2.mod = Di, s2.mul = ki, s2.pow = Ii, s2.random = Li, s2.round = Bi, s2.sign = Fi, s2.sin = Pi, s2.sinh = Ui, s2.sqrt = ji, s2.sub = qi, s2.tan = Hi, s2.tanh = Vi, s2.trunc = $i, e2 === void 0 && (e2 = {}), e2 && e2.defaults !== true)
    for (i2 = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r2 = 0; r2 < i2.length; )
      e2.hasOwnProperty(n2 = i2[r2++]) || (e2[n2] = this[n2]);
  return s2.config(e2), s2;
}(Nn);
Mn = new Gi(Mn), En = new Gi(En);
var Wi, Yi = cn("BigNumber", ["?on", "config"], (t3) => {
  var {on: e2, config: r2} = t3, n2 = Gi.clone({precision: r2.precision, modulo: 9});
  return n2.prototype.type = "BigNumber", n2.prototype.isBigNumber = true, n2.prototype.toJSON = function() {
    return {mathjs: "BigNumber", value: this.toString()};
  }, n2.fromJSON = function(t4) {
    return new n2(t4.value);
  }, e2 && e2("config", function(t4, e3) {
    t4.precision !== e3.precision && n2.config({precision: t4.precision});
  }), n2;
}, {isClass: true}), Zi = {exports: {}};
/**
 * @license Complex.js v2.0.13 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
Wi = Zi, function(t3) {
  var e2 = function(t4) {
    return 0.5 * (Math.exp(t4) + Math.exp(-t4));
  }, r2 = function(t4) {
    return 0.5 * (Math.exp(t4) - Math.exp(-t4));
  }, n2 = function() {
    throw SyntaxError("Invalid Param");
  };
  function i2(t4, e3) {
    var r3 = Math.abs(t4), n3 = Math.abs(e3);
    return t4 === 0 ? Math.log(n3) : e3 === 0 ? Math.log(r3) : r3 < 3e3 && n3 < 3e3 ? 0.5 * Math.log(t4 * t4 + e3 * e3) : Math.log(t4 / Math.cos(Math.atan2(e3, t4)));
  }
  function s2(t4, e3) {
    if (!(this instanceof s2))
      return new s2(t4, e3);
    var r3 = function(t5, e4) {
      var r4 = {re: 0, im: 0};
      if (t5 == null)
        r4.re = r4.im = 0;
      else if (e4 !== void 0)
        r4.re = t5, r4.im = e4;
      else
        switch (typeof t5) {
          case "object":
            if ("im" in t5 && "re" in t5)
              r4.re = t5.re, r4.im = t5.im;
            else if ("abs" in t5 && "arg" in t5) {
              if (!Number.isFinite(t5.abs) && Number.isFinite(t5.arg))
                return s2.INFINITY;
              r4.re = t5.abs * Math.cos(t5.arg), r4.im = t5.abs * Math.sin(t5.arg);
            } else if ("r" in t5 && "phi" in t5) {
              if (!Number.isFinite(t5.r) && Number.isFinite(t5.phi))
                return s2.INFINITY;
              r4.re = t5.r * Math.cos(t5.phi), r4.im = t5.r * Math.sin(t5.phi);
            } else
              t5.length === 2 ? (r4.re = t5[0], r4.im = t5[1]) : n2();
            break;
          case "string":
            r4.im = r4.re = 0;
            var i3 = t5.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), a2 = 1, o2 = 0;
            i3 === null && n2();
            for (var u2 = 0; u2 < i3.length; u2++) {
              var h = i3[u2];
              h === " " || h === "	" || h === "\n" || (h === "+" ? a2++ : h === "-" ? o2++ : h === "i" || h === "I" ? (a2 + o2 === 0 && n2(), i3[u2 + 1] === " " || isNaN(i3[u2 + 1]) ? r4.im += parseFloat((o2 % 2 ? "-" : "") + "1") : (r4.im += parseFloat((o2 % 2 ? "-" : "") + i3[u2 + 1]), u2++), a2 = o2 = 0) : ((a2 + o2 === 0 || isNaN(h)) && n2(), i3[u2 + 1] === "i" || i3[u2 + 1] === "I" ? (r4.im += parseFloat((o2 % 2 ? "-" : "") + h), u2++) : r4.re += parseFloat((o2 % 2 ? "-" : "") + h), a2 = o2 = 0));
            }
            a2 + o2 > 0 && n2();
            break;
          case "number":
            r4.im = 0, r4.re = t5;
            break;
          default:
            n2();
        }
      return r4;
    }(t4, e3);
    this.re = r3.re, this.im = r3.im;
  }
  s2.prototype = {re: 0, im: 0, sign: function() {
    var t4 = this.abs();
    return new s2(this.re / t4, this.im / t4);
  }, add: function(t4, e3) {
    var r3 = new s2(t4, e3);
    return this.isInfinite() && r3.isInfinite() ? s2.NAN : this.isInfinite() || r3.isInfinite() ? s2.INFINITY : new s2(this.re + r3.re, this.im + r3.im);
  }, sub: function(t4, e3) {
    var r3 = new s2(t4, e3);
    return this.isInfinite() && r3.isInfinite() ? s2.NAN : this.isInfinite() || r3.isInfinite() ? s2.INFINITY : new s2(this.re - r3.re, this.im - r3.im);
  }, mul: function(t4, e3) {
    var r3 = new s2(t4, e3);
    return this.isInfinite() && r3.isZero() || this.isZero() && r3.isInfinite() ? s2.NAN : this.isInfinite() || r3.isInfinite() ? s2.INFINITY : r3.im === 0 && this.im === 0 ? new s2(this.re * r3.re, 0) : new s2(this.re * r3.re - this.im * r3.im, this.re * r3.im + this.im * r3.re);
  }, div: function(t4, e3) {
    var r3 = new s2(t4, e3);
    if (this.isZero() && r3.isZero() || this.isInfinite() && r3.isInfinite())
      return s2.NAN;
    if (this.isInfinite() || r3.isZero())
      return s2.INFINITY;
    if (this.isZero() || r3.isInfinite())
      return s2.ZERO;
    t4 = this.re, e3 = this.im;
    var n3, i3, a2 = r3.re, o2 = r3.im;
    return o2 === 0 ? new s2(t4 / a2, e3 / a2) : Math.abs(a2) < Math.abs(o2) ? new s2((t4 * (i3 = a2 / o2) + e3) / (n3 = a2 * i3 + o2), (e3 * i3 - t4) / n3) : new s2((t4 + e3 * (i3 = o2 / a2)) / (n3 = o2 * i3 + a2), (e3 - t4 * i3) / n3);
  }, pow: function(t4, e3) {
    var r3 = new s2(t4, e3);
    if (t4 = this.re, e3 = this.im, r3.isZero())
      return s2.ONE;
    if (r3.im === 0) {
      if (e3 === 0 && t4 > 0)
        return new s2(Math.pow(t4, r3.re), 0);
      if (t4 === 0)
        switch ((r3.re % 4 + 4) % 4) {
          case 0:
            return new s2(Math.pow(e3, r3.re), 0);
          case 1:
            return new s2(0, Math.pow(e3, r3.re));
          case 2:
            return new s2(-Math.pow(e3, r3.re), 0);
          case 3:
            return new s2(0, -Math.pow(e3, r3.re));
        }
    }
    if (t4 === 0 && e3 === 0 && r3.re > 0 && r3.im >= 0)
      return s2.ZERO;
    var n3 = Math.atan2(e3, t4), a2 = i2(t4, e3);
    return t4 = Math.exp(r3.re * a2 - r3.im * n3), e3 = r3.im * a2 + r3.re * n3, new s2(t4 * Math.cos(e3), t4 * Math.sin(e3));
  }, sqrt: function() {
    var t4, e3, r3 = this.re, n3 = this.im, i3 = this.abs();
    if (r3 >= 0) {
      if (n3 === 0)
        return new s2(Math.sqrt(r3), 0);
      t4 = 0.5 * Math.sqrt(2 * (i3 + r3));
    } else
      t4 = Math.abs(n3) / Math.sqrt(2 * (i3 - r3));
    return e3 = r3 <= 0 ? 0.5 * Math.sqrt(2 * (i3 - r3)) : Math.abs(n3) / Math.sqrt(2 * (i3 + r3)), new s2(t4, n3 < 0 ? -e3 : e3);
  }, exp: function() {
    var t4 = Math.exp(this.re);
    return this.im, new s2(t4 * Math.cos(this.im), t4 * Math.sin(this.im));
  }, expm1: function() {
    var t4 = this.re, e3 = this.im;
    return new s2(Math.expm1(t4) * Math.cos(e3) + function(t5) {
      var e4 = Math.PI / 4;
      if (t5 < -e4 || t5 > e4)
        return Math.cos(t5) - 1;
      var r3 = t5 * t5;
      return r3 * (r3 * (1 / 24 + r3 * (-1 / 720 + r3 * (1 / 40320 + r3 * (-1 / 3628800 + r3 * (1 / 4790014600 + r3 * (-1 / 87178291200 + r3 * (1 / 20922789888e3))))))) - 0.5);
    }(e3), Math.exp(t4) * Math.sin(e3));
  }, log: function() {
    var t4 = this.re, e3 = this.im;
    return new s2(i2(t4, e3), Math.atan2(e3, t4));
  }, abs: function() {
    return t4 = this.re, e3 = this.im, r3 = Math.abs(t4), n3 = Math.abs(e3), r3 < 3e3 && n3 < 3e3 ? Math.sqrt(r3 * r3 + n3 * n3) : (r3 < n3 ? (r3 = n3, n3 = t4 / e3) : n3 = e3 / t4, r3 * Math.sqrt(1 + n3 * n3));
    var t4, e3, r3, n3;
  }, arg: function() {
    return Math.atan2(this.im, this.re);
  }, sin: function() {
    var t4 = this.re, n3 = this.im;
    return new s2(Math.sin(t4) * e2(n3), Math.cos(t4) * r2(n3));
  }, cos: function() {
    var t4 = this.re, n3 = this.im;
    return new s2(Math.cos(t4) * e2(n3), -Math.sin(t4) * r2(n3));
  }, tan: function() {
    var t4 = 2 * this.re, n3 = 2 * this.im, i3 = Math.cos(t4) + e2(n3);
    return new s2(Math.sin(t4) / i3, r2(n3) / i3);
  }, cot: function() {
    var t4 = 2 * this.re, n3 = 2 * this.im, i3 = Math.cos(t4) - e2(n3);
    return new s2(-Math.sin(t4) / i3, r2(n3) / i3);
  }, sec: function() {
    var t4 = this.re, n3 = this.im, i3 = 0.5 * e2(2 * n3) + 0.5 * Math.cos(2 * t4);
    return new s2(Math.cos(t4) * e2(n3) / i3, Math.sin(t4) * r2(n3) / i3);
  }, csc: function() {
    var t4 = this.re, n3 = this.im, i3 = 0.5 * e2(2 * n3) - 0.5 * Math.cos(2 * t4);
    return new s2(Math.sin(t4) * e2(n3) / i3, -Math.cos(t4) * r2(n3) / i3);
  }, asin: function() {
    var t4 = this.re, e3 = this.im, r3 = new s2(e3 * e3 - t4 * t4 + 1, -2 * t4 * e3).sqrt(), n3 = new s2(r3.re - e3, r3.im + t4).log();
    return new s2(n3.im, -n3.re);
  }, acos: function() {
    var t4 = this.re, e3 = this.im, r3 = new s2(e3 * e3 - t4 * t4 + 1, -2 * t4 * e3).sqrt(), n3 = new s2(r3.re - e3, r3.im + t4).log();
    return new s2(Math.PI / 2 - n3.im, n3.re);
  }, atan: function() {
    var t4 = this.re, e3 = this.im;
    if (t4 === 0) {
      if (e3 === 1)
        return new s2(0, 1 / 0);
      if (e3 === -1)
        return new s2(0, -1 / 0);
    }
    var r3 = t4 * t4 + (1 - e3) * (1 - e3), n3 = new s2((1 - e3 * e3 - t4 * t4) / r3, -2 * t4 / r3).log();
    return new s2(-0.5 * n3.im, 0.5 * n3.re);
  }, acot: function() {
    var t4 = this.re, e3 = this.im;
    if (e3 === 0)
      return new s2(Math.atan2(1, t4), 0);
    var r3 = t4 * t4 + e3 * e3;
    return r3 !== 0 ? new s2(t4 / r3, -e3 / r3).atan() : new s2(t4 !== 0 ? t4 / 0 : 0, e3 !== 0 ? -e3 / 0 : 0).atan();
  }, asec: function() {
    var t4 = this.re, e3 = this.im;
    if (t4 === 0 && e3 === 0)
      return new s2(0, 1 / 0);
    var r3 = t4 * t4 + e3 * e3;
    return r3 !== 0 ? new s2(t4 / r3, -e3 / r3).acos() : new s2(t4 !== 0 ? t4 / 0 : 0, e3 !== 0 ? -e3 / 0 : 0).acos();
  }, acsc: function() {
    var t4 = this.re, e3 = this.im;
    if (t4 === 0 && e3 === 0)
      return new s2(Math.PI / 2, 1 / 0);
    var r3 = t4 * t4 + e3 * e3;
    return r3 !== 0 ? new s2(t4 / r3, -e3 / r3).asin() : new s2(t4 !== 0 ? t4 / 0 : 0, e3 !== 0 ? -e3 / 0 : 0).asin();
  }, sinh: function() {
    var t4 = this.re, n3 = this.im;
    return new s2(r2(t4) * Math.cos(n3), e2(t4) * Math.sin(n3));
  }, cosh: function() {
    var t4 = this.re, n3 = this.im;
    return new s2(e2(t4) * Math.cos(n3), r2(t4) * Math.sin(n3));
  }, tanh: function() {
    var t4 = 2 * this.re, n3 = 2 * this.im, i3 = e2(t4) + Math.cos(n3);
    return new s2(r2(t4) / i3, Math.sin(n3) / i3);
  }, coth: function() {
    var t4 = 2 * this.re, n3 = 2 * this.im, i3 = e2(t4) - Math.cos(n3);
    return new s2(r2(t4) / i3, -Math.sin(n3) / i3);
  }, csch: function() {
    var t4 = this.re, n3 = this.im, i3 = Math.cos(2 * n3) - e2(2 * t4);
    return new s2(-2 * r2(t4) * Math.cos(n3) / i3, 2 * e2(t4) * Math.sin(n3) / i3);
  }, sech: function() {
    var t4 = this.re, n3 = this.im, i3 = Math.cos(2 * n3) + e2(2 * t4);
    return new s2(2 * e2(t4) * Math.cos(n3) / i3, -2 * r2(t4) * Math.sin(n3) / i3);
  }, asinh: function() {
    var t4 = this.im;
    this.im = -this.re, this.re = t4;
    var e3 = this.asin();
    return this.re = -this.im, this.im = t4, t4 = e3.re, e3.re = -e3.im, e3.im = t4, e3;
  }, acosh: function() {
    var t4 = this.acos();
    if (t4.im <= 0) {
      var e3 = t4.re;
      t4.re = -t4.im, t4.im = e3;
    } else
      e3 = t4.im, t4.im = -t4.re, t4.re = e3;
    return t4;
  }, atanh: function() {
    var t4 = this.re, e3 = this.im, r3 = t4 > 1 && e3 === 0, n3 = 1 - t4, a2 = 1 + t4, o2 = n3 * n3 + e3 * e3, u2 = o2 !== 0 ? new s2((a2 * n3 - e3 * e3) / o2, (e3 * n3 + a2 * e3) / o2) : new s2(t4 !== -1 ? t4 / 0 : 0, e3 !== 0 ? e3 / 0 : 0), h = u2.re;
    return u2.re = i2(u2.re, u2.im) / 2, u2.im = Math.atan2(u2.im, h) / 2, r3 && (u2.im = -u2.im), u2;
  }, acoth: function() {
    var t4 = this.re, e3 = this.im;
    if (t4 === 0 && e3 === 0)
      return new s2(0, Math.PI / 2);
    var r3 = t4 * t4 + e3 * e3;
    return r3 !== 0 ? new s2(t4 / r3, -e3 / r3).atanh() : new s2(t4 !== 0 ? t4 / 0 : 0, e3 !== 0 ? -e3 / 0 : 0).atanh();
  }, acsch: function() {
    var t4 = this.re, e3 = this.im;
    if (e3 === 0)
      return new s2(t4 !== 0 ? Math.log(t4 + Math.sqrt(t4 * t4 + 1)) : 1 / 0, 0);
    var r3 = t4 * t4 + e3 * e3;
    return r3 !== 0 ? new s2(t4 / r3, -e3 / r3).asinh() : new s2(t4 !== 0 ? t4 / 0 : 0, e3 !== 0 ? -e3 / 0 : 0).asinh();
  }, asech: function() {
    var t4 = this.re, e3 = this.im;
    if (this.isZero())
      return s2.INFINITY;
    var r3 = t4 * t4 + e3 * e3;
    return r3 !== 0 ? new s2(t4 / r3, -e3 / r3).acosh() : new s2(t4 !== 0 ? t4 / 0 : 0, e3 !== 0 ? -e3 / 0 : 0).acosh();
  }, inverse: function() {
    if (this.isZero())
      return s2.INFINITY;
    if (this.isInfinite())
      return s2.ZERO;
    var t4 = this.re, e3 = this.im, r3 = t4 * t4 + e3 * e3;
    return new s2(t4 / r3, -e3 / r3);
  }, conjugate: function() {
    return new s2(this.re, -this.im);
  }, neg: function() {
    return new s2(-this.re, -this.im);
  }, ceil: function(t4) {
    return t4 = Math.pow(10, t4 || 0), new s2(Math.ceil(this.re * t4) / t4, Math.ceil(this.im * t4) / t4);
  }, floor: function(t4) {
    return t4 = Math.pow(10, t4 || 0), new s2(Math.floor(this.re * t4) / t4, Math.floor(this.im * t4) / t4);
  }, round: function(t4) {
    return t4 = Math.pow(10, t4 || 0), new s2(Math.round(this.re * t4) / t4, Math.round(this.im * t4) / t4);
  }, equals: function(t4, e3) {
    var r3 = new s2(t4, e3);
    return Math.abs(r3.re - this.re) <= s2.EPSILON && Math.abs(r3.im - this.im) <= s2.EPSILON;
  }, clone: function() {
    return new s2(this.re, this.im);
  }, toString: function() {
    var t4 = this.re, e3 = this.im, r3 = "";
    return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(t4) < s2.EPSILON && (t4 = 0), Math.abs(e3) < s2.EPSILON && (e3 = 0), e3 === 0 ? r3 + t4 : (t4 !== 0 ? (r3 += t4, r3 += " ", e3 < 0 ? (e3 = -e3, r3 += "-") : r3 += "+", r3 += " ") : e3 < 0 && (e3 = -e3, r3 += "-"), e3 !== 1 && (r3 += e3), r3 + "i"));
  }, toVector: function() {
    return [this.re, this.im];
  }, valueOf: function() {
    return this.im === 0 ? this.re : null;
  }, isNaN: function() {
    return isNaN(this.re) || isNaN(this.im);
  }, isZero: function() {
    return this.im === 0 && this.re === 0;
  }, isFinite: function() {
    return isFinite(this.re) && isFinite(this.im);
  }, isInfinite: function() {
    return !(this.isNaN() || this.isFinite());
  }}, s2.ZERO = new s2(0, 0), s2.ONE = new s2(1, 0), s2.I = new s2(0, 1), s2.PI = new s2(Math.PI, 0), s2.E = new s2(Math.E, 0), s2.INFINITY = new s2(1 / 0, 1 / 0), s2.NAN = new s2(NaN, NaN), s2.EPSILON = 1e-15, Object.defineProperty(s2, "__esModule", {value: true}), s2.default = s2, s2.Complex = s2, Wi.exports = s2;
}();
var Xi = Tr(Zi.exports), Qi = cn("Complex", [], () => (Xi.prototype.type = "Complex", Xi.prototype.isComplex = true, Xi.prototype.toJSON = function() {
  return {mathjs: "Complex", re: this.re, im: this.im};
}, Xi.prototype.toPolar = function() {
  return {r: this.abs(), phi: this.arg()};
}, Xi.prototype.format = function(t3) {
  var e2 = this.im, r2 = this.re, n2 = Rr(this.re, t3), i2 = Rr(this.im, t3), s2 = Te(t3) ? t3 : t3 ? t3.precision : null;
  if (s2 !== null) {
    var a2 = Math.pow(10, -s2);
    Math.abs(r2 / e2) < a2 && (r2 = 0), Math.abs(e2 / r2) < a2 && (e2 = 0);
  }
  return e2 === 0 ? n2 : r2 === 0 ? e2 === 1 ? "i" : e2 === -1 ? "-i" : i2 + "i" : e2 < 0 ? e2 === -1 ? n2 + " - i" : n2 + " - " + i2.substring(1) + "i" : e2 === 1 ? n2 + " + i" : n2 + " + " + i2 + "i";
}, Xi.fromPolar = function(t3) {
  switch (arguments.length) {
    case 1:
      var e2 = arguments[0];
      if (typeof e2 == "object")
        return Xi(e2);
      throw new TypeError("Input has to be an object with r and phi keys.");
    case 2:
      var r2 = arguments[0], n2 = arguments[1];
      if (Te(r2)) {
        if (Ce(n2) && n2.hasBase("ANGLE") && (n2 = n2.toNumber("rad")), Te(n2))
          return new Xi({r: r2, phi: n2});
        throw new TypeError("Phi is not a number nor an angle unit.");
      }
      throw new TypeError("Radius r is not a number.");
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Xi.prototype.valueOf = Xi.prototype.toString, Xi.fromJSON = function(t3) {
  return new Xi(t3);
}, Xi.compare = function(t3, e2) {
  return t3.re > e2.re ? 1 : t3.re < e2.re ? -1 : t3.im > e2.im ? 1 : t3.im < e2.im ? -1 : 0;
}, Xi), {isClass: true}), Ji = {exports: {}};
/**
 * @license Fraction.js v4.1.0 13/05/2021
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2021, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
!function(t3, e2) {
  !function(e3) {
    var r2 = {s: 1, n: 0, d: 1};
    function n2(t4) {
      function e4() {
        var e5 = Error.apply(this, arguments);
        e5.name = this.name = t4, this.stack = e5.stack, this.message = e5.message;
      }
      function r3() {
      }
      return r3.prototype = Error.prototype, e4.prototype = new r3(), e4;
    }
    var i2 = l2.DivisionByZero = n2("DivisionByZero"), s2 = l2.InvalidParameter = n2("InvalidParameter");
    function a2(t4, e4) {
      return isNaN(t4 = parseInt(t4, 10)) && o2(), t4 * e4;
    }
    function o2() {
      throw new s2();
    }
    function u2(t4) {
      for (var e4 = {}, r3 = t4, n3 = 2, i3 = 4; i3 <= r3; ) {
        for (; r3 % n3 == 0; )
          r3 /= n3, e4[n3] = (e4[n3] || 0) + 1;
        i3 += 1 + 2 * n3++;
      }
      return r3 !== t4 ? r3 > 1 && (e4[r3] = (e4[r3] || 0) + 1) : e4[t4] = (e4[t4] || 0) + 1, e4;
    }
    var h = function(t4, e4) {
      var n3, s3 = 0, u3 = 1, h2 = 1, c3 = 0, l3 = 0, p2 = 0, f2 = 1, d2 = 1, m2 = 0, y2 = 1, g2 = 1, v = 1, x = 1e7;
      if (t4 == null)
        ;
      else if (e4 !== void 0)
        h2 = (s3 = t4) * (u3 = e4);
      else
        switch (typeof t4) {
          case "object":
            "d" in t4 && "n" in t4 ? (s3 = t4.n, u3 = t4.d, "s" in t4 && (s3 *= t4.s)) : 0 in t4 ? (s3 = t4[0], 1 in t4 && (u3 = t4[1])) : o2(), h2 = s3 * u3;
            break;
          case "number":
            if (t4 < 0 && (h2 = t4, t4 = -t4), t4 % 1 == 0)
              s3 = t4;
            else if (t4 > 0) {
              for (t4 >= 1 && (t4 /= d2 = Math.pow(10, Math.floor(1 + Math.log(t4) / Math.LN10))); y2 <= x && v <= x; ) {
                if (t4 === (n3 = (m2 + g2) / (y2 + v))) {
                  y2 + v <= x ? (s3 = m2 + g2, u3 = y2 + v) : v > y2 ? (s3 = g2, u3 = v) : (s3 = m2, u3 = y2);
                  break;
                }
                t4 > n3 ? (m2 += g2, y2 += v) : (g2 += m2, v += y2), y2 > x ? (s3 = g2, u3 = v) : (s3 = m2, u3 = y2);
              }
              s3 *= d2;
            } else
              (isNaN(t4) || isNaN(e4)) && (u3 = s3 = NaN);
            break;
          case "string":
            if ((y2 = t4.match(/\d+|./g)) === null && o2(), y2[m2] === "-" ? (h2 = -1, m2++) : y2[m2] === "+" && m2++, y2.length === m2 + 1 ? l3 = a2(y2[m2++], h2) : y2[m2 + 1] === "." || y2[m2] === "." ? (y2[m2] !== "." && (c3 = a2(y2[m2++], h2)), (++m2 + 1 === y2.length || y2[m2 + 1] === "(" && y2[m2 + 3] === ")" || y2[m2 + 1] === "'" && y2[m2 + 3] === "'") && (l3 = a2(y2[m2], h2), f2 = Math.pow(10, y2[m2].length), m2++), (y2[m2] === "(" && y2[m2 + 2] === ")" || y2[m2] === "'" && y2[m2 + 2] === "'") && (p2 = a2(y2[m2 + 1], h2), d2 = Math.pow(10, y2[m2 + 1].length) - 1, m2 += 3)) : y2[m2 + 1] === "/" || y2[m2 + 1] === ":" ? (l3 = a2(y2[m2], h2), f2 = a2(y2[m2 + 2], 1), m2 += 3) : y2[m2 + 3] === "/" && y2[m2 + 1] === " " && (c3 = a2(y2[m2], h2), l3 = a2(y2[m2 + 2], h2), f2 = a2(y2[m2 + 4], 1), m2 += 5), y2.length <= m2) {
              h2 = s3 = p2 + (u3 = f2 * d2) * c3 + d2 * l3;
              break;
            }
          default:
            o2();
        }
      if (u3 === 0)
        throw new i2();
      r2.s = h2 < 0 ? -1 : 1, r2.n = Math.abs(s3), r2.d = Math.abs(u3);
    };
    function c2(t4, e4) {
      if (!t4)
        return e4;
      if (!e4)
        return t4;
      for (; ; ) {
        if (!(t4 %= e4))
          return e4;
        if (!(e4 %= t4))
          return t4;
      }
    }
    function l2(t4, e4) {
      if (!(this instanceof l2))
        return new l2(t4, e4);
      h(t4, e4), t4 = l2.REDUCE ? c2(r2.d, r2.n) : 1, this.s = r2.s, this.n = r2.n / t4, this.d = r2.d / t4;
    }
    l2.REDUCE = 1, l2.prototype = {s: 1, n: 0, d: 1, abs: function() {
      return new l2(this.n, this.d);
    }, neg: function() {
      return new l2(-this.s * this.n, this.d);
    }, add: function(t4, e4) {
      return h(t4, e4), new l2(this.s * this.n * r2.d + r2.s * this.d * r2.n, this.d * r2.d);
    }, sub: function(t4, e4) {
      return h(t4, e4), new l2(this.s * this.n * r2.d - r2.s * this.d * r2.n, this.d * r2.d);
    }, mul: function(t4, e4) {
      return h(t4, e4), new l2(this.s * r2.s * this.n * r2.n, this.d * r2.d);
    }, div: function(t4, e4) {
      return h(t4, e4), new l2(this.s * r2.s * this.n * r2.d, this.d * r2.n);
    }, clone: function() {
      return new l2(this);
    }, mod: function(t4, e4) {
      return isNaN(this.n) || isNaN(this.d) ? new l2(NaN) : t4 === void 0 ? new l2(this.s * this.n % this.d, 1) : (h(t4, e4), r2.n === 0 && this.d === 0 && l2(0, 0), new l2(this.s * (r2.d * this.n) % (r2.n * this.d), r2.d * this.d));
    }, gcd: function(t4, e4) {
      return h(t4, e4), new l2(c2(r2.n, this.n) * c2(r2.d, this.d), r2.d * this.d);
    }, lcm: function(t4, e4) {
      return h(t4, e4), r2.n === 0 && this.n === 0 ? new l2() : new l2(r2.n * this.n, c2(r2.n, this.n) * c2(r2.d, this.d));
    }, ceil: function(t4) {
      return t4 = Math.pow(10, t4 || 0), isNaN(this.n) || isNaN(this.d) ? new l2(NaN) : new l2(Math.ceil(t4 * this.s * this.n / this.d), t4);
    }, floor: function(t4) {
      return t4 = Math.pow(10, t4 || 0), isNaN(this.n) || isNaN(this.d) ? new l2(NaN) : new l2(Math.floor(t4 * this.s * this.n / this.d), t4);
    }, round: function(t4) {
      return t4 = Math.pow(10, t4 || 0), isNaN(this.n) || isNaN(this.d) ? new l2(NaN) : new l2(Math.round(t4 * this.s * this.n / this.d), t4);
    }, inverse: function() {
      return new l2(this.s * this.d, this.n);
    }, pow: function(t4, e4) {
      if (h(t4, e4), r2.d === 1)
        return r2.s < 0 ? new l2(Math.pow(this.s * this.d, r2.n), Math.pow(this.n, r2.n)) : new l2(Math.pow(this.s * this.n, r2.n), Math.pow(this.d, r2.n));
      if (this.s < 0)
        return null;
      var n3 = u2(this.n), i3 = u2(this.d), s3 = this.s, a3 = 1;
      for (var o3 in n3)
        if (o3 !== "1") {
          if (o3 === "0") {
            s3 = 0;
            break;
          }
          if (n3[o3] *= r2.n, n3[o3] % r2.d != 0)
            return null;
          n3[o3] /= r2.d, s3 *= Math.pow(o3, n3[o3]);
        }
      for (var o3 in i3)
        if (o3 !== "1") {
          if (i3[o3] *= r2.n, i3[o3] % r2.d != 0)
            return null;
          i3[o3] /= r2.d, a3 *= Math.pow(o3, i3[o3]);
        }
      return r2.s < 0 ? new l2(a3, s3) : new l2(s3, a3);
    }, equals: function(t4, e4) {
      return h(t4, e4), this.s * this.n * r2.d == r2.s * r2.n * this.d;
    }, compare: function(t4, e4) {
      h(t4, e4);
      var n3 = this.s * this.n * r2.d - r2.s * r2.n * this.d;
      return (0 < n3) - (n3 < 0);
    }, simplify: function(t4) {
      if (isNaN(this.n) || isNaN(this.d))
        return this;
      var e4 = this.abs().toContinued();
      function r3(t5) {
        return t5.length === 1 ? new l2(t5[0]) : r3(t5.slice(1)).inverse().add(t5[0]);
      }
      t4 = t4 || 1e-3;
      for (var n3 = 0; n3 < e4.length; n3++) {
        var i3 = r3(e4.slice(0, n3 + 1));
        if (i3.sub(this.abs()).abs().valueOf() < t4)
          return i3.mul(this.s);
      }
      return this;
    }, divisible: function(t4, e4) {
      return h(t4, e4), !(!(r2.n * this.d) || this.n * r2.d % (r2.n * this.d));
    }, valueOf: function() {
      return this.s * this.n / this.d;
    }, toFraction: function(t4) {
      var e4, r3 = "", n3 = this.n, i3 = this.d;
      return this.s < 0 && (r3 += "-"), i3 === 1 ? r3 += n3 : (t4 && (e4 = Math.floor(n3 / i3)) > 0 && (r3 += e4, r3 += " ", n3 %= i3), r3 += n3, r3 += "/", r3 += i3), r3;
    }, toLatex: function(t4) {
      var e4, r3 = "", n3 = this.n, i3 = this.d;
      return this.s < 0 && (r3 += "-"), i3 === 1 ? r3 += n3 : (t4 && (e4 = Math.floor(n3 / i3)) > 0 && (r3 += e4, n3 %= i3), r3 += "\\frac{", r3 += n3, r3 += "}{", r3 += i3, r3 += "}"), r3;
    }, toContinued: function() {
      var t4, e4 = this.n, r3 = this.d, n3 = [];
      if (isNaN(e4) || isNaN(r3))
        return n3;
      do {
        n3.push(Math.floor(e4 / r3)), t4 = e4 % r3, e4 = r3, r3 = t4;
      } while (e4 !== 1);
      return n3;
    }, toString: function(t4) {
      var e4, r3 = this.n, n3 = this.d;
      if (isNaN(r3) || isNaN(n3))
        return "NaN";
      l2.REDUCE || (r3 /= e4 = c2(r3, n3), n3 /= e4), t4 = t4 || 15;
      var i3 = function(t5, e5) {
        for (; e5 % 2 == 0; e5 /= 2)
          ;
        for (; e5 % 5 == 0; e5 /= 5)
          ;
        if (e5 === 1)
          return 0;
        for (var r4 = 10 % e5, n4 = 1; r4 !== 1; n4++)
          if (r4 = 10 * r4 % e5, n4 > 2e3)
            return 0;
        return n4;
      }(0, n3), s3 = function(t5, e5, r4) {
        for (var n4 = 1, i4 = function(t6, e6, r5) {
          for (var n5 = 1; e6 > 0; t6 = t6 * t6 % r5, e6 >>= 1)
            1 & e6 && (n5 = n5 * t6 % r5);
          return n5;
        }(10, r4, e5), s4 = 0; s4 < 300; s4++) {
          if (n4 === i4)
            return s4;
          n4 = 10 * n4 % e5, i4 = 10 * i4 % e5;
        }
        return 0;
      }(0, n3, i3), a3 = this.s === -1 ? "-" : "";
      if (a3 += r3 / n3 | 0, r3 %= n3, (r3 *= 10) && (a3 += "."), i3) {
        for (var o3 = s3; o3--; )
          a3 += r3 / n3 | 0, r3 %= n3, r3 *= 10;
        a3 += "(";
        for (o3 = i3; o3--; )
          a3 += r3 / n3 | 0, r3 %= n3, r3 *= 10;
        a3 += ")";
      } else
        for (o3 = t4; r3 && o3--; )
          a3 += r3 / n3 | 0, r3 %= n3, r3 *= 10;
      return a3;
    }}, Object.defineProperty(l2, "__esModule", {value: true}), l2.default = l2, l2.Fraction = l2, t3.exports = l2;
  }();
}(Ji);
var Ki = Tr(Ji.exports), ts = cn("Fraction", [], () => (Ki.prototype.type = "Fraction", Ki.prototype.isFraction = true, Ki.prototype.toJSON = function() {
  return {mathjs: "Fraction", n: this.s * this.n, d: this.d};
}, Ki.fromJSON = function(t3) {
  return new Ki(t3);
}, Ki), {isClass: true}), es = cn("Range", [], () => {
  function t3(e2, r2, n2) {
    if (!(this instanceof t3))
      throw new SyntaxError("Constructor must be called with the new operator");
    var i2 = e2 != null, s2 = r2 != null, a2 = n2 != null;
    if (i2) {
      if (Oe(e2))
        e2 = e2.toNumber();
      else if (typeof e2 != "number")
        throw new TypeError("Parameter start must be a number");
    }
    if (s2) {
      if (Oe(r2))
        r2 = r2.toNumber();
      else if (typeof r2 != "number")
        throw new TypeError("Parameter end must be a number");
    }
    if (a2) {
      if (Oe(n2))
        n2 = n2.toNumber();
      else if (typeof n2 != "number")
        throw new TypeError("Parameter step must be a number");
    }
    this.start = i2 ? parseFloat(e2) : 0, this.end = s2 ? parseFloat(r2) : 0, this.step = a2 ? parseFloat(n2) : 1;
  }
  return t3.prototype.type = "Range", t3.prototype.isRange = true, t3.parse = function(e2) {
    if (typeof e2 != "string")
      return null;
    var r2 = e2.split(":").map(function(t4) {
      return parseFloat(t4);
    });
    if (r2.some(function(t4) {
      return isNaN(t4);
    }))
      return null;
    switch (r2.length) {
      case 2:
        return new t3(r2[0], r2[1]);
      case 3:
        return new t3(r2[0], r2[2], r2[1]);
      default:
        return null;
    }
  }, t3.prototype.clone = function() {
    return new t3(this.start, this.end, this.step);
  }, t3.prototype.size = function() {
    var t4 = 0, e2 = this.start, r2 = this.step, n2 = this.end - e2;
    return Cr(r2) === Cr(n2) ? t4 = Math.ceil(n2 / r2) : n2 === 0 && (t4 = 0), isNaN(t4) && (t4 = 0), [t4];
  }, t3.prototype.min = function() {
    var t4 = this.size()[0];
    return t4 > 0 ? this.step > 0 ? this.start : this.start + (t4 - 1) * this.step : void 0;
  }, t3.prototype.max = function() {
    var t4 = this.size()[0];
    return t4 > 0 ? this.step > 0 ? this.start + (t4 - 1) * this.step : this.start : void 0;
  }, t3.prototype.forEach = function(t4) {
    var e2 = this.start, r2 = this.step, n2 = this.end, i2 = 0;
    if (r2 > 0)
      for (; e2 < n2; )
        t4(e2, [i2], this), e2 += r2, i2++;
    else if (r2 < 0)
      for (; e2 > n2; )
        t4(e2, [i2], this), e2 += r2, i2++;
  }, t3.prototype.map = function(t4) {
    var e2 = [];
    return this.forEach(function(r2, n2, i2) {
      e2[n2[0]] = t4(r2, n2, i2);
    }), e2;
  }, t3.prototype.toArray = function() {
    var t4 = [];
    return this.forEach(function(e2, r2) {
      t4[r2[0]] = e2;
    }), t4;
  }, t3.prototype.valueOf = function() {
    return this.toArray();
  }, t3.prototype.format = function(t4) {
    var e2 = Rr(this.start, t4);
    return this.step !== 1 && (e2 += ":" + Rr(this.step, t4)), e2 += ":" + Rr(this.end, t4);
  }, t3.prototype.toString = function() {
    return this.format();
  }, t3.prototype.toJSON = function() {
    return {mathjs: "Range", start: this.start, end: this.end, step: this.step};
  }, t3.fromJSON = function(e2) {
    return new t3(e2.start, e2.end, e2.step);
  }, t3;
}, {isClass: true}), rs = cn("Matrix", [], () => {
  function t3() {
    if (!(this instanceof t3))
      throw new SyntaxError("Constructor must be called with the new operator");
  }
  return t3.prototype.type = "Matrix", t3.prototype.isMatrix = true, t3.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  }, t3.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  }, t3.prototype.create = function(t4, e2) {
    throw new Error("Cannot invoke create on a Matrix interface");
  }, t3.prototype.subset = function(t4, e2, r2) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  }, t3.prototype.get = function(t4) {
    throw new Error("Cannot invoke get on a Matrix interface");
  }, t3.prototype.set = function(t4, e2, r2) {
    throw new Error("Cannot invoke set on a Matrix interface");
  }, t3.prototype.resize = function(t4, e2) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  }, t3.prototype.reshape = function(t4, e2) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  }, t3.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  }, t3.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  }, t3.prototype.map = function(t4, e2) {
    throw new Error("Cannot invoke map on a Matrix interface");
  }, t3.prototype.forEach = function(t4) {
    throw new Error("Cannot invoke forEach on a Matrix interface");
  }, t3.prototype.toArray = function() {
    throw new Error("Cannot invoke toArray on a Matrix interface");
  }, t3.prototype.valueOf = function() {
    throw new Error("Cannot invoke valueOf on a Matrix interface");
  }, t3.prototype.format = function(t4) {
    throw new Error("Cannot invoke format on a Matrix interface");
  }, t3.prototype.toString = function() {
    throw new Error("Cannot invoke toString on a Matrix interface");
  }, t3;
}, {isClass: true}), ns = cn("DenseMatrix", ["Matrix"], (t3) => {
  var {Matrix: e2} = t3;
  function r2(t4, e3) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (e3 && !Re(e3))
      throw new Error("Invalid datatype: " + e3);
    if (ke(t4))
      t4.type === "DenseMatrix" ? (this._data = pr(t4._data), this._size = pr(t4._size), this._datatype = e3 || t4._datatype) : (this._data = t4.toArray(), this._size = t4.size(), this._datatype = e3 || t4._datatype);
    else if (t4 && De(t4.data) && De(t4.size))
      this._data = t4.data, this._size = t4.size, Qr(this._data, this._size), this._datatype = e3 || t4.datatype;
    else if (De(t4))
      this._data = h(t4), this._size = Zr(this._data), Qr(this._data, this._size), this._datatype = e3;
    else {
      if (t4)
        throw new TypeError("Unsupported type of data (" + lr(t4) + ")");
      this._data = [], this._size = [0], this._datatype = e3;
    }
  }
  function n2(t4, e3) {
    if (!Pe(e3))
      throw new TypeError("Invalid index");
    if (e3.isScalar())
      return t4.get(e3.min());
    var n3 = e3.size();
    if (n3.length !== t4._size.length)
      throw new Wr(n3.length, t4._size.length);
    for (var s3 = e3.min(), a3 = e3.max(), o3 = 0, u3 = t4._size.length; o3 < u3; o3++)
      Jr(s3[o3], t4._size[o3]), Jr(a3[o3], t4._size[o3]);
    return new r2(i2(t4._data, e3, n3.length, 0), t4._datatype);
  }
  function i2(t4, e3, r3, n3) {
    var s3 = n3 === r3 - 1, a3 = e3.dimension(n3);
    return s3 ? a3.map(function(e4) {
      return Jr(e4, t4.length), t4[e4];
    }).valueOf() : a3.map(function(s4) {
      return Jr(s4, t4.length), i2(t4[s4], e3, r3, n3 + 1);
    }).valueOf();
  }
  function s2(t4, e3, r3, n3) {
    if (!e3 || e3.isIndex !== true)
      throw new TypeError("Invalid index");
    var i3, s3 = e3.size(), o3 = e3.isScalar();
    if (ke(r3) ? (i3 = r3.size(), r3 = r3.valueOf()) : i3 = Zr(r3), o3) {
      if (i3.length !== 0)
        throw new TypeError("Scalar expected");
      t4.set(e3.min(), r3, n3);
    } else {
      if (s3.length < t4._size.length)
        throw new Wr(s3.length, t4._size.length, "<");
      if (i3.length < s3.length) {
        for (var h2 = 0, c2 = 0; s3[h2] === 1 && i3[h2] === 1; )
          h2++;
        for (; s3[h2] === 1; )
          c2++, h2++;
        r3 = rn(r3, s3.length, c2, i3);
      }
      if (!yr(s3, i3))
        throw new Wr(s3, i3, ">");
      u2(t4, e3.max().map(function(t5) {
        return t5 + 1;
      }), n3);
      var l2 = s3.length;
      a2(t4._data, e3, r3, l2, 0);
    }
    return t4;
  }
  function a2(t4, e3, r3, n3, i3) {
    var s3 = i3 === n3 - 1, o3 = e3.dimension(i3);
    s3 ? o3.forEach(function(e4, n4) {
      Jr(e4), t4[e4] = r3[n4[0]];
    }) : o3.forEach(function(s4, o4) {
      Jr(s4), a2(t4[s4], e3, r3[o4[0]], n3, i3 + 1);
    });
  }
  function o2(t4, e3, r3) {
    if (e3.length === 0) {
      for (var n3 = t4._data; De(n3); )
        n3 = n3[0];
      return n3;
    }
    return t4._size = e3.slice(0), t4._data = Kr(t4._data, t4._size, r3), t4;
  }
  function u2(t4, e3, r3) {
    for (var n3 = t4._size.slice(0), i3 = false; n3.length < e3.length; )
      n3.push(0), i3 = true;
    for (var s3 = 0, a3 = e3.length; s3 < a3; s3++)
      e3[s3] > n3[s3] && (n3[s3] = e3[s3], i3 = true);
    i3 && o2(t4, n3, r3);
  }
  function h(t4) {
    for (var e3 = 0, r3 = t4.length; e3 < r3; e3++) {
      var n3 = t4[e3];
      De(n3) ? t4[e3] = h(n3) : n3 && n3.isMatrix === true && (t4[e3] = h(n3.valueOf()));
    }
    return t4;
  }
  return r2.prototype = new e2(), r2.prototype.createDenseMatrix = function(t4, e3) {
    return new r2(t4, e3);
  }, r2.prototype.type = "DenseMatrix", r2.prototype.isDenseMatrix = true, r2.prototype.getDataType = function() {
    return un(this._data, lr);
  }, r2.prototype.storage = function() {
    return "dense";
  }, r2.prototype.datatype = function() {
    return this._datatype;
  }, r2.prototype.create = function(t4, e3) {
    return new r2(t4, e3);
  }, r2.prototype.subset = function(t4, e3, r3) {
    switch (arguments.length) {
      case 1:
        return n2(this, t4);
      case 2:
      case 3:
        return s2(this, t4, e3, r3);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, r2.prototype.get = function(t4) {
    if (!De(t4))
      throw new TypeError("Array expected");
    if (t4.length !== this._size.length)
      throw new Wr(t4.length, this._size.length);
    for (var e3 = 0; e3 < t4.length; e3++)
      Jr(t4[e3], this._size[e3]);
    for (var r3 = this._data, n3 = 0, i3 = t4.length; n3 < i3; n3++) {
      var s3 = t4[n3];
      Jr(s3, r3.length), r3 = r3[s3];
    }
    return r3;
  }, r2.prototype.set = function(t4, e3, r3) {
    if (!De(t4))
      throw new TypeError("Array expected");
    if (t4.length < this._size.length)
      throw new Wr(t4.length, this._size.length, "<");
    var n3, i3, s3;
    u2(this, t4.map(function(t5) {
      return t5 + 1;
    }), r3);
    var a3 = this._data;
    for (n3 = 0, i3 = t4.length - 1; n3 < i3; n3++)
      Jr(s3 = t4[n3], a3.length), a3 = a3[s3];
    return Jr(s3 = t4[t4.length - 1], a3.length), a3[s3] = e3, this;
  }, r2.prototype.resize = function(t4, e3, r3) {
    if (!Ie(t4))
      throw new TypeError("Array or Matrix expected");
    var n3 = t4.valueOf().map((t5) => Array.isArray(t5) && t5.length === 1 ? t5[0] : t5);
    return o2(r3 ? this.clone() : this, n3, e3);
  }, r2.prototype.reshape = function(t4, e3) {
    var r3 = e3 ? this.clone() : this;
    return r3._data = en(r3._data, t4), r3._size = t4.slice(0), r3;
  }, r2.prototype.clone = function() {
    return new r2({data: pr(this._data), size: pr(this._size), datatype: this._datatype});
  }, r2.prototype.size = function() {
    return this._size.slice(0);
  }, r2.prototype.map = function(t4) {
    var e3 = this, n3 = function r3(n4, i3) {
      return De(n4) ? n4.map(function(t5, e4) {
        return r3(t5, i3.concat(e4));
      }) : t4(n4, i3, e3);
    }(this._data, []);
    return new r2(n3, this._datatype !== void 0 ? un(n3, lr) : void 0);
  }, r2.prototype.forEach = function(t4) {
    var e3 = this;
    !function r3(n3, i3) {
      De(n3) ? n3.forEach(function(t5, e4) {
        r3(t5, i3.concat(e4));
      }) : t4(n3, i3, e3);
    }(this._data, []);
  }, r2.prototype.toArray = function() {
    return pr(this._data);
  }, r2.prototype.valueOf = function() {
    return this._data;
  }, r2.prototype.format = function(t4) {
    return Hr(this._data, t4);
  }, r2.prototype.toString = function() {
    return Hr(this._data);
  }, r2.prototype.toJSON = function() {
    return {mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype};
  }, r2.prototype.diagonal = function(t4) {
    if (t4) {
      if (Oe(t4) && (t4 = t4.toNumber()), !Te(t4) || !Ar(t4))
        throw new TypeError("The parameter k must be an integer number");
    } else
      t4 = 0;
    for (var e3 = t4 > 0 ? t4 : 0, n3 = t4 < 0 ? -t4 : 0, i3 = this._size[0], s3 = this._size[1], a3 = Math.min(i3 - n3, s3 - e3), o3 = [], u3 = 0; u3 < a3; u3++)
      o3[u3] = this._data[u3 + n3][u3 + e3];
    return new r2({data: o3, size: [a3], datatype: this._datatype});
  }, r2.diagonal = function(t4, e3, n3, i3) {
    if (!De(t4))
      throw new TypeError("Array expected, size parameter");
    if (t4.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (t4 = t4.map(function(t5) {
      if (Oe(t5) && (t5 = t5.toNumber()), !Te(t5) || !Ar(t5) || t5 < 1)
        throw new Error("Size values must be positive integers");
      return t5;
    }), n3) {
      if (Oe(n3) && (n3 = n3.toNumber()), !Te(n3) || !Ar(n3))
        throw new TypeError("The parameter k must be an integer number");
    } else
      n3 = 0;
    var s3, a3 = n3 > 0 ? n3 : 0, o3 = n3 < 0 ? -n3 : 0, u3 = t4[0], h2 = t4[1], c2 = Math.min(u3 - o3, h2 - a3);
    if (De(e3)) {
      if (e3.length !== c2)
        throw new Error("Invalid value array length");
      s3 = function(t5) {
        return e3[t5];
      };
    } else if (ke(e3)) {
      var l2 = e3.size();
      if (l2.length !== 1 || l2[0] !== c2)
        throw new Error("Invalid matrix length");
      s3 = function(t5) {
        return e3.get([t5]);
      };
    } else
      s3 = function() {
        return e3;
      };
    i3 || (i3 = Oe(s3(0)) ? s3(0).mul(0) : 0);
    var p2 = [];
    if (t4.length > 0) {
      p2 = Kr(p2, t4, i3);
      for (var f2 = 0; f2 < c2; f2++)
        p2[f2 + o3][f2 + a3] = s3(f2);
    }
    return new r2({data: p2, size: [u3, h2]});
  }, r2.fromJSON = function(t4) {
    return new r2(t4);
  }, r2.prototype.swapRows = function(t4, e3) {
    if (!(Te(t4) && Ar(t4) && Te(e3) && Ar(e3)))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Jr(t4, this._size[0]), Jr(e3, this._size[0]), r2._swapRows(t4, e3, this._data), this;
  }, r2._swapRows = function(t4, e3, r3) {
    var n3 = r3[t4];
    r3[t4] = r3[e3], r3[e3] = n3;
  }, r2;
}, {isClass: true});
function is(t3, e2, r2) {
  return t3 && typeof t3.map == "function" ? t3.map(function(t4) {
    return is(t4, e2);
  }) : e2(t3);
}
var ss = "number", as = "number, number";
function os(t3) {
  return Math.abs(t3);
}
function us(t3, e2) {
  return t3 + e2;
}
function hs(t3, e2) {
  return t3 * e2;
}
function cs(t3) {
  return -t3;
}
function ls(t3) {
  return Math.ceil(t3);
}
function ps(t3, e2) {
  if (e2 > 0)
    return t3 - e2 * Math.floor(t3 / e2);
  if (e2 === 0)
    return t3;
  throw new Error("Cannot calculate mod for a negative divisor");
}
function fs(t3, e2) {
  return t3 * t3 < 1 && e2 === 1 / 0 || t3 * t3 > 1 && e2 === -1 / 0 ? 0 : Math.pow(t3, e2);
}
function ds(t3) {
  var e2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return parseFloat(kr(t3, e2));
}
os.signature = ss, us.signature = as, hs.signature = as, cs.signature = ss, ls.signature = ss, ps.signature = as, fs.signature = as, ds.signature = as;
var ms = cn("isNumeric", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("isNumeric", {"number | BigNumber | Fraction | boolean": function() {
    return true;
  }, "Complex | Unit | string | null | undefined | Node": function() {
    return false;
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }});
});
function ys(t3, e2, r2) {
  if (r2 == null)
    return t3.eq(e2);
  if (t3.eq(e2))
    return true;
  if (t3.isNaN() || e2.isNaN())
    return false;
  if (t3.isFinite() && e2.isFinite()) {
    var n2 = t3.minus(e2).abs();
    if (n2.isZero())
      return true;
    var i2 = t3.constructor.max(t3.abs(), e2.abs());
    return n2.lte(i2.times(r2));
  }
  return false;
}
var gs = "equalScalar", vs = cn(gs, ["typed", "config"], (t3) => {
  var {typed: e2, config: r2} = t3;
  return e2(gs, {"boolean, boolean": function(t4, e3) {
    return t4 === e3;
  }, "number, number": function(t4, e3) {
    return Pr(t4, e3, r2.epsilon);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.eq(e3) || ys(t4, e3, r2.epsilon);
  }, "Fraction, Fraction": function(t4, e3) {
    return t4.equals(e3);
  }, "Complex, Complex": function(t4, e3) {
    return function(t5, e4, r3) {
      return Pr(t5.re, e4.re, r3) && Pr(t5.im, e4.im, r3);
    }(t4, e3, r2.epsilon);
  }, "Unit, Unit": function(t4, e3) {
    if (!t4.equalBase(e3))
      throw new Error("Cannot compare units with different base");
    return this(t4.value, e3.value);
  }});
});
cn(gs, ["typed", "config"], (t3) => {
  var {typed: e2, config: r2} = t3;
  return e2(gs, {"number, number": function(t4, e3) {
    return Pr(t4, e3, r2.epsilon);
  }});
});
var xs = cn("SparseMatrix", ["typed", "equalScalar", "Matrix"], (t3) => {
  var {typed: e2, equalScalar: r2, Matrix: n2} = t3;
  function i2(t4, e3) {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (e3 && !Re(e3))
      throw new Error("Invalid datatype: " + e3);
    if (ke(t4))
      !function(t5, e4, r3) {
        e4.type === "SparseMatrix" ? (t5._values = e4._values ? pr(e4._values) : void 0, t5._index = pr(e4._index), t5._ptr = pr(e4._ptr), t5._size = pr(e4._size), t5._datatype = r3 || e4._datatype) : s2(t5, e4.valueOf(), r3 || e4._datatype);
      }(this, t4, e3);
    else if (t4 && De(t4.index) && De(t4.ptr) && De(t4.size))
      this._values = t4.values, this._index = t4.index, this._ptr = t4.ptr, this._size = t4.size, this._datatype = e3 || t4.datatype;
    else if (De(t4))
      s2(this, t4, e3);
    else {
      if (t4)
        throw new TypeError("Unsupported type of data (" + lr(t4) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = e3;
    }
  }
  function s2(t4, n3, i3) {
    t4._values = [], t4._index = [], t4._ptr = [], t4._datatype = i3;
    var s3 = n3.length, a3 = 0, o3 = r2, u3 = 0;
    if (Re(i3) && (o3 = e2.find(r2, [i3, i3]) || r2, u3 = e2.convert(0, i3)), s3 > 0) {
      var h2 = 0;
      do {
        t4._ptr.push(t4._index.length);
        for (var c3 = 0; c3 < s3; c3++) {
          var l3 = n3[c3];
          if (De(l3)) {
            if (h2 === 0 && a3 < l3.length && (a3 = l3.length), h2 < l3.length) {
              var p2 = l3[h2];
              o3(p2, u3) || (t4._values.push(p2), t4._index.push(c3));
            }
          } else
            h2 === 0 && a3 < 1 && (a3 = 1), o3(l3, u3) || (t4._values.push(l3), t4._index.push(c3));
        }
        h2++;
      } while (h2 < a3);
    }
    t4._ptr.push(t4._index.length), t4._size = [s3, a3];
  }
  function a2(t4, e3) {
    if (!Pe(e3))
      throw new TypeError("Invalid index");
    if (e3.isScalar())
      return t4.get(e3.min());
    var r3, n3, s3, a3, o3 = e3.size();
    if (o3.length !== t4._size.length)
      throw new Wr(o3.length, t4._size.length);
    var u3 = e3.min(), h2 = e3.max();
    for (r3 = 0, n3 = t4._size.length; r3 < n3; r3++)
      Jr(u3[r3], t4._size[r3]), Jr(h2[r3], t4._size[r3]);
    var c3 = t4._values, l3 = t4._index, p2 = t4._ptr, f2 = e3.dimension(0), d2 = e3.dimension(1), m2 = [], y2 = [];
    f2.forEach(function(t5, e4) {
      y2[t5] = e4[0], m2[t5] = true;
    });
    var g2 = c3 ? [] : void 0, v = [], x = [];
    return d2.forEach(function(t5) {
      for (x.push(v.length), s3 = p2[t5], a3 = p2[t5 + 1]; s3 < a3; s3++)
        r3 = l3[s3], m2[r3] === true && (v.push(y2[r3]), g2 && g2.push(c3[s3]));
    }), x.push(v.length), new i2({values: g2, index: v, ptr: x, size: o3, datatype: t4._datatype});
  }
  function o2(t4, e3, r3, n3) {
    if (!e3 || e3.isIndex !== true)
      throw new TypeError("Invalid index");
    var i3, s3 = e3.size(), a3 = e3.isScalar();
    if (ke(r3) ? (i3 = r3.size(), r3 = r3.toArray()) : i3 = Zr(r3), a3) {
      if (i3.length !== 0)
        throw new TypeError("Scalar expected");
      t4.set(e3.min(), r3, n3);
    } else {
      if (s3.length !== 1 && s3.length !== 2)
        throw new Wr(s3.length, t4._size.length, "<");
      if (i3.length < s3.length) {
        for (var o3 = 0, u3 = 0; s3[o3] === 1 && i3[o3] === 1; )
          o3++;
        for (; s3[o3] === 1; )
          u3++, o3++;
        r3 = rn(r3, s3.length, u3, i3);
      }
      if (!yr(s3, i3))
        throw new Wr(s3, i3, ">");
      for (var h2 = e3.min()[0], c3 = e3.min()[1], l3 = i3[0], p2 = i3[1], f2 = 0; f2 < l3; f2++)
        for (var d2 = 0; d2 < p2; d2++) {
          var m2 = r3[f2][d2];
          t4.set([f2 + h2, d2 + c3], m2, n3);
        }
    }
    return t4;
  }
  function u2(t4, e3, r3, n3) {
    if (r3 - e3 == 0)
      return r3;
    for (var i3 = e3; i3 < r3; i3++)
      if (n3[i3] === t4)
        return i3;
    return e3;
  }
  function h(t4, e3, r3, n3, i3, s3, a3) {
    i3.splice(t4, 0, n3), s3.splice(t4, 0, e3);
    for (var o3 = r3 + 1; o3 < a3.length; o3++)
      a3[o3]++;
  }
  function c2(t4, n3, i3, s3) {
    var a3 = s3 || 0, o3 = r2, u3 = 0;
    Re(t4._datatype) && (o3 = e2.find(r2, [t4._datatype, t4._datatype]) || r2, u3 = e2.convert(0, t4._datatype), a3 = e2.convert(a3, t4._datatype));
    var h2, c3, l3, p2 = !o3(a3, u3), f2 = t4._size[0], d2 = t4._size[1];
    if (i3 > d2) {
      for (c3 = d2; c3 < i3; c3++)
        if (t4._ptr[c3] = t4._values.length, p2)
          for (h2 = 0; h2 < f2; h2++)
            t4._values.push(a3), t4._index.push(h2);
      t4._ptr[i3] = t4._values.length;
    } else
      i3 < d2 && (t4._ptr.splice(i3 + 1, d2 - i3), t4._values.splice(t4._ptr[i3], t4._values.length), t4._index.splice(t4._ptr[i3], t4._index.length));
    if (d2 = i3, n3 > f2) {
      if (p2) {
        var m2 = 0;
        for (c3 = 0; c3 < d2; c3++) {
          t4._ptr[c3] = t4._ptr[c3] + m2, l3 = t4._ptr[c3 + 1] + m2;
          var y2 = 0;
          for (h2 = f2; h2 < n3; h2++, y2++)
            t4._values.splice(l3 + y2, 0, a3), t4._index.splice(l3 + y2, 0, h2), m2++;
        }
        t4._ptr[d2] = t4._values.length;
      }
    } else if (n3 < f2) {
      var g2 = 0;
      for (c3 = 0; c3 < d2; c3++) {
        t4._ptr[c3] = t4._ptr[c3] - g2;
        var v = t4._ptr[c3], x = t4._ptr[c3 + 1] - g2;
        for (l3 = v; l3 < x; l3++)
          (h2 = t4._index[l3]) > n3 - 1 && (t4._values.splice(l3, 1), t4._index.splice(l3, 1), g2++);
      }
      t4._ptr[c3] = t4._values.length;
    }
    return t4._size[0] = n3, t4._size[1] = i3, t4;
  }
  function l2(t4, e3, r3, n3, i3) {
    var s3, a3, o3 = n3[0], u3 = n3[1], h2 = [];
    for (s3 = 0; s3 < o3; s3++)
      for (h2[s3] = [], a3 = 0; a3 < u3; a3++)
        h2[s3][a3] = 0;
    for (a3 = 0; a3 < u3; a3++)
      for (var c3 = r3[a3], l3 = r3[a3 + 1], p2 = c3; p2 < l3; p2++)
        h2[s3 = e3[p2]][a3] = t4 ? i3 ? pr(t4[p2]) : t4[p2] : 1;
    return h2;
  }
  return i2.prototype = new n2(), i2.prototype.createSparseMatrix = function(t4, e3) {
    return new i2(t4, e3);
  }, i2.prototype.type = "SparseMatrix", i2.prototype.isSparseMatrix = true, i2.prototype.getDataType = function() {
    return un(this._values, lr);
  }, i2.prototype.storage = function() {
    return "sparse";
  }, i2.prototype.datatype = function() {
    return this._datatype;
  }, i2.prototype.create = function(t4, e3) {
    return new i2(t4, e3);
  }, i2.prototype.density = function() {
    var t4 = this._size[0], e3 = this._size[1];
    return t4 !== 0 && e3 !== 0 ? this._index.length / (t4 * e3) : 0;
  }, i2.prototype.subset = function(t4, e3, r3) {
    if (!this._values)
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return a2(this, t4);
      case 2:
      case 3:
        return o2(this, t4, e3, r3);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, i2.prototype.get = function(t4) {
    if (!De(t4))
      throw new TypeError("Array expected");
    if (t4.length !== this._size.length)
      throw new Wr(t4.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var e3 = t4[0], r3 = t4[1];
    Jr(e3, this._size[0]), Jr(r3, this._size[1]);
    var n3 = u2(e3, this._ptr[r3], this._ptr[r3 + 1], this._index);
    return n3 < this._ptr[r3 + 1] && this._index[n3] === e3 ? this._values[n3] : 0;
  }, i2.prototype.set = function(t4, n3, i3) {
    if (!De(t4))
      throw new TypeError("Array expected");
    if (t4.length !== this._size.length)
      throw new Wr(t4.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var s3 = t4[0], a3 = t4[1], o3 = this._size[0], l3 = this._size[1], p2 = r2, f2 = 0;
    Re(this._datatype) && (p2 = e2.find(r2, [this._datatype, this._datatype]) || r2, f2 = e2.convert(0, this._datatype)), (s3 > o3 - 1 || a3 > l3 - 1) && (c2(this, Math.max(s3 + 1, o3), Math.max(a3 + 1, l3), i3), o3 = this._size[0], l3 = this._size[1]), Jr(s3, o3), Jr(a3, l3);
    var d2 = u2(s3, this._ptr[a3], this._ptr[a3 + 1], this._index);
    return d2 < this._ptr[a3 + 1] && this._index[d2] === s3 ? p2(n3, f2) ? function(t5, e3, r3, n4, i4) {
      r3.splice(t5, 1), n4.splice(t5, 1);
      for (var s4 = e3 + 1; s4 < i4.length; s4++)
        i4[s4]--;
    }(d2, a3, this._values, this._index, this._ptr) : this._values[d2] = n3 : h(d2, s3, a3, n3, this._values, this._index, this._ptr), this;
  }, i2.prototype.resize = function(t4, e3, r3) {
    if (!Ie(t4))
      throw new TypeError("Array or Matrix expected");
    var n3 = t4.valueOf().map((t5) => Array.isArray(t5) && t5.length === 1 ? t5[0] : t5);
    if (n3.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    return n3.forEach(function(t5) {
      if (!Te(t5) || !Ar(t5) || t5 < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Hr(n3) + ")");
    }), c2(r3 ? this.clone() : this, n3[0], n3[1], e3);
  }, i2.prototype.reshape = function(t4, e3) {
    if (!De(t4))
      throw new TypeError("Array expected");
    if (t4.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    if (t4.forEach(function(e4) {
      if (!Te(e4) || !Ar(e4) || e4 < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Hr(t4) + ")");
    }), this._size[0] * this._size[1] != t4[0] * t4[1])
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var r3 = e3 ? this.clone() : this;
    if (this._size[0] === t4[0] && this._size[1] === t4[1])
      return r3;
    for (var n3 = [], i3 = 0; i3 < r3._ptr.length; i3++)
      for (var s3 = 0; s3 < r3._ptr[i3 + 1] - r3._ptr[i3]; s3++)
        n3.push(i3);
    for (var a3 = r3._values.slice(), o3 = r3._index.slice(), c3 = 0; c3 < r3._index.length; c3++) {
      var l3 = o3[c3], p2 = n3[c3], f2 = l3 * r3._size[1] + p2;
      n3[c3] = f2 % t4[1], o3[c3] = Math.floor(f2 / t4[1]);
    }
    r3._values.length = 0, r3._index.length = 0, r3._ptr.length = t4[1] + 1, r3._size = t4.slice();
    for (var d2 = 0; d2 < r3._ptr.length; d2++)
      r3._ptr[d2] = 0;
    for (var m2 = 0; m2 < a3.length; m2++) {
      var y2 = o3[m2], g2 = n3[m2], v = a3[m2];
      h(u2(y2, r3._ptr[g2], r3._ptr[g2 + 1], r3._index), y2, g2, v, r3._values, r3._index, r3._ptr);
    }
    return r3;
  }, i2.prototype.clone = function() {
    return new i2({values: this._values ? pr(this._values) : void 0, index: pr(this._index), ptr: pr(this._ptr), size: pr(this._size), datatype: this._datatype});
  }, i2.prototype.size = function() {
    return this._size.slice(0);
  }, i2.prototype.map = function(t4, n3) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var s3 = this;
    return function(t5, n4, s4, a3, o3, u3, h2) {
      var c3 = [], l3 = [], p2 = [], f2 = r2, d2 = 0;
      Re(t5._datatype) && (f2 = e2.find(r2, [t5._datatype, t5._datatype]) || r2, d2 = e2.convert(0, t5._datatype));
      for (var m2 = function(t6, e3, r3) {
        t6 = u3(t6, e3, r3), f2(t6, d2) || (c3.push(t6), l3.push(e3));
      }, y2 = a3; y2 <= o3; y2++) {
        p2.push(c3.length);
        var g2 = t5._ptr[y2], v = t5._ptr[y2 + 1];
        if (h2)
          for (var x = g2; x < v; x++) {
            var w = t5._index[x];
            w >= n4 && w <= s4 && m2(t5._values[x], w - n4, y2 - a3);
          }
        else {
          for (var b = {}, _ = g2; _ < v; _++) {
            b[t5._index[_]] = t5._values[_];
          }
          for (var M = n4; M <= s4; M++) {
            m2(M in b ? b[M] : 0, M - n4, y2 - a3);
          }
        }
      }
      return p2.push(c3.length), new i2({values: c3, index: l3, ptr: p2, size: [s4 - n4 + 1, o3 - a3 + 1]});
    }(this, 0, this._size[0] - 1, 0, this._size[1] - 1, function(e3, r3, n4) {
      return t4(e3, [r3, n4], s3);
    }, n3);
  }, i2.prototype.forEach = function(t4, e3) {
    if (!this._values)
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var r3 = this._size[0], n3 = this._size[1], i3 = 0; i3 < n3; i3++) {
      var s3 = this._ptr[i3], a3 = this._ptr[i3 + 1];
      if (e3)
        for (var o3 = s3; o3 < a3; o3++) {
          var u3 = this._index[o3];
          t4(this._values[o3], [u3, i3], this);
        }
      else {
        for (var h2 = {}, c3 = s3; c3 < a3; c3++) {
          h2[this._index[c3]] = this._values[c3];
        }
        for (var l3 = 0; l3 < r3; l3++) {
          t4(l3 in h2 ? h2[l3] : 0, [l3, i3], this);
        }
      }
    }
  }, i2.prototype.toArray = function() {
    return l2(this._values, this._index, this._ptr, this._size, true);
  }, i2.prototype.valueOf = function() {
    return l2(this._values, this._index, this._ptr, this._size, false);
  }, i2.prototype.format = function(t4) {
    for (var e3 = this._size[0], r3 = this._size[1], n3 = this.density(), i3 = "Sparse Matrix [" + Hr(e3, t4) + " x " + Hr(r3, t4) + "] density: " + Hr(n3, t4) + "\n", s3 = 0; s3 < r3; s3++)
      for (var a3 = this._ptr[s3], o3 = this._ptr[s3 + 1], u3 = a3; u3 < o3; u3++) {
        i3 += "\n    (" + Hr(this._index[u3], t4) + ", " + Hr(s3, t4) + ") ==> " + (this._values ? Hr(this._values[u3], t4) : "X");
      }
    return i3;
  }, i2.prototype.toString = function() {
    return Hr(this.toArray());
  }, i2.prototype.toJSON = function() {
    return {mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype};
  }, i2.prototype.diagonal = function(t4) {
    if (t4) {
      if (Oe(t4) && (t4 = t4.toNumber()), !Te(t4) || !Ar(t4))
        throw new TypeError("The parameter k must be an integer number");
    } else
      t4 = 0;
    var e3 = t4 > 0 ? t4 : 0, r3 = t4 < 0 ? -t4 : 0, n3 = this._size[0], s3 = this._size[1], a3 = Math.min(n3 - r3, s3 - e3), o3 = [], u3 = [], h2 = [];
    h2[0] = 0;
    for (var c3 = e3; c3 < s3 && o3.length < a3; c3++)
      for (var l3 = this._ptr[c3], p2 = this._ptr[c3 + 1], f2 = l3; f2 < p2; f2++) {
        var d2 = this._index[f2];
        if (d2 === c3 - e3 + r3) {
          o3.push(this._values[f2]), u3[o3.length - 1] = d2 - r3;
          break;
        }
      }
    return h2.push(o3.length), new i2({values: o3, index: u3, ptr: h2, size: [a3, 1]});
  }, i2.fromJSON = function(t4) {
    return new i2(t4);
  }, i2.diagonal = function(t4, n3, s3, a3, o3) {
    if (!De(t4))
      throw new TypeError("Array expected, size parameter");
    if (t4.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (t4 = t4.map(function(t5) {
      if (Oe(t5) && (t5 = t5.toNumber()), !Te(t5) || !Ar(t5) || t5 < 1)
        throw new Error("Size values must be positive integers");
      return t5;
    }), s3) {
      if (Oe(s3) && (s3 = s3.toNumber()), !Te(s3) || !Ar(s3))
        throw new TypeError("The parameter k must be an integer number");
    } else
      s3 = 0;
    var u3 = r2, h2 = 0;
    Re(o3) && (u3 = e2.find(r2, [o3, o3]) || r2, h2 = e2.convert(0, o3));
    var c3, l3 = s3 > 0 ? s3 : 0, p2 = s3 < 0 ? -s3 : 0, f2 = t4[0], d2 = t4[1], m2 = Math.min(f2 - p2, d2 - l3);
    if (De(n3)) {
      if (n3.length !== m2)
        throw new Error("Invalid value array length");
      c3 = function(t5) {
        return n3[t5];
      };
    } else if (ke(n3)) {
      var y2 = n3.size();
      if (y2.length !== 1 || y2[0] !== m2)
        throw new Error("Invalid matrix length");
      c3 = function(t5) {
        return n3.get([t5]);
      };
    } else
      c3 = function() {
        return n3;
      };
    for (var g2 = [], v = [], x = [], w = 0; w < d2; w++) {
      x.push(g2.length);
      var b = w - l3;
      if (b >= 0 && b < m2) {
        var _ = c3(b);
        u3(_, h2) || (v.push(b + p2), g2.push(_));
      }
    }
    return x.push(g2.length), new i2({values: g2, index: v, ptr: x, size: [f2, d2]});
  }, i2.prototype.swapRows = function(t4, e3) {
    if (!(Te(t4) && Ar(t4) && Te(e3) && Ar(e3)))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Jr(t4, this._size[0]), Jr(e3, this._size[0]), i2._swapRows(t4, e3, this._size[1], this._values, this._index, this._ptr), this;
  }, i2._forEachRow = function(t4, e3, r3, n3, i3) {
    for (var s3 = n3[t4], a3 = n3[t4 + 1], o3 = s3; o3 < a3; o3++)
      i3(r3[o3], e3[o3]);
  }, i2._swapRows = function(t4, e3, r3, n3, i3, s3) {
    for (var a3 = 0; a3 < r3; a3++) {
      var o3 = s3[a3], h2 = s3[a3 + 1], c3 = u2(t4, o3, h2, i3), l3 = u2(e3, o3, h2, i3);
      if (c3 < h2 && l3 < h2 && i3[c3] === t4 && i3[l3] === e3) {
        if (n3) {
          var p2 = n3[c3];
          n3[c3] = n3[l3], n3[l3] = p2;
        }
      } else if (c3 < h2 && i3[c3] === t4 && (l3 >= h2 || i3[l3] !== e3)) {
        var f2 = n3 ? n3[c3] : void 0;
        i3.splice(l3, 0, e3), n3 && n3.splice(l3, 0, f2), i3.splice(l3 <= c3 ? c3 + 1 : c3, 1), n3 && n3.splice(l3 <= c3 ? c3 + 1 : c3, 1);
      } else if (l3 < h2 && i3[l3] === e3 && (c3 >= h2 || i3[c3] !== t4)) {
        var d2 = n3 ? n3[l3] : void 0;
        i3.splice(c3, 0, t4), n3 && n3.splice(c3, 0, d2), i3.splice(c3 <= l3 ? l3 + 1 : l3, 1), n3 && n3.splice(c3 <= l3 ? l3 + 1 : l3, 1);
      }
    }
  }, i2;
}, {isClass: true}), ws = cn("number", ["typed"], (t3) => {
  var {typed: e2} = t3, r2 = e2("number", {"": function() {
    return 0;
  }, number: function(t4) {
    return t4;
  }, string: function(t4) {
    if (t4 === "NaN")
      return NaN;
    var e3 = Number(t4);
    if (isNaN(e3))
      throw new SyntaxError('String "' + t4 + '" is no valid number');
    if (["0b", "0o", "0x"].includes(t4.substring(0, 2))) {
      if (e3 > 2 ** 32 - 1)
        throw new SyntaxError('String "'.concat(t4, '" is out of range'));
      2147483648 & e3 && (e3 = -1 * ~(e3 - 1));
    }
    return e3;
  }, BigNumber: function(t4) {
    return t4.toNumber();
  }, Fraction: function(t4) {
    return t4.valueOf();
  }, Unit: function(t4) {
    throw new Error("Second argument with valueless unit expected");
  }, null: function(t4) {
    return 0;
  }, "Unit, string | Unit": function(t4, e3) {
    return t4.toNumber(e3);
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }});
  return r2.fromJSON = function(t4) {
    return parseFloat(t4.value);
  }, r2;
}), bs = cn("bignumber", ["typed", "BigNumber"], (t3) => {
  var {typed: e2, BigNumber: r2} = t3;
  return e2("bignumber", {"": function() {
    return new r2(0);
  }, number: function(t4) {
    return new r2(t4 + "");
  }, string: function(t4) {
    return new r2(t4);
  }, BigNumber: function(t4) {
    return t4;
  }, Fraction: function(t4) {
    return new r2(t4.n).div(t4.d).times(t4.s);
  }, null: function(t4) {
    return new r2(0);
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }});
}), _s = cn("fraction", ["typed", "Fraction"], (t3) => {
  var {typed: e2, Fraction: r2} = t3;
  return e2("fraction", {number: function(t4) {
    if (!isFinite(t4) || isNaN(t4))
      throw new Error(t4 + " cannot be represented as a fraction");
    return new r2(t4);
  }, string: function(t4) {
    return new r2(t4);
  }, "number, number": function(t4, e3) {
    return new r2(t4, e3);
  }, null: function(t4) {
    return new r2(0);
  }, BigNumber: function(t4) {
    return new r2(t4.toString());
  }, Fraction: function(t4) {
    return t4;
  }, Object: function(t4) {
    return new r2(t4);
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }});
}), Ms = cn("matrix", ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], (t3) => {
  var {typed: e2, Matrix: r2, DenseMatrix: n2, SparseMatrix: i2} = t3;
  return e2("matrix", {"": function() {
    return s2([]);
  }, string: function(t4) {
    return s2([], t4);
  }, "string, string": function(t4, e3) {
    return s2([], t4, e3);
  }, Array: function(t4) {
    return s2(t4);
  }, Matrix: function(t4) {
    return s2(t4, t4.storage());
  }, "Array | Matrix, string": s2, "Array | Matrix, string, string": s2});
  function s2(t4, e3, r3) {
    if (e3 === "dense" || e3 === "default" || e3 === void 0)
      return new n2(t4, r3);
    if (e3 === "sparse")
      return new i2(t4, r3);
    throw new TypeError("Unknown matrix type " + JSON.stringify(e3) + ".");
  }
}), Es = cn("unaryMinus", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("unaryMinus", {number: cs, Complex: function(t4) {
    return t4.neg();
  }, BigNumber: function(t4) {
    return t4.neg();
  }, Fraction: function(t4) {
    return t4.neg();
  }, Unit: function(t4) {
    var e3 = t4.clone();
    return e3.value = this(t4.value), e3;
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }});
}), Ns = cn("abs", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("abs", {number: os, Complex: function(t4) {
    return t4.abs();
  }, BigNumber: function(t4) {
    return t4.abs();
  }, Fraction: function(t4) {
    return t4.abs();
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }, Unit: function(t4) {
    return t4.abs();
  }});
}), Ss = cn("addScalar", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("addScalar", {"number, number": us, "Complex, Complex": function(t4, e3) {
    return t4.add(e3);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.plus(e3);
  }, "Fraction, Fraction": function(t4, e3) {
    return t4.add(e3);
  }, "Unit, Unit": function(t4, e3) {
    if (t4.value === null || t4.value === void 0)
      throw new Error("Parameter x contains a unit with undefined value");
    if (e3.value === null || e3.value === void 0)
      throw new Error("Parameter y contains a unit with undefined value");
    if (!t4.equalBase(e3))
      throw new Error("Units do not match");
    var r2 = t4.clone();
    return r2.value = this(r2.value, e3.value), r2.fixPrefix = false, r2;
  }});
}), Ts = cn("algorithm11", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return function(t4, n2, i2, s2) {
    var a2 = t4._values, o2 = t4._index, u2 = t4._ptr, h = t4._size, c2 = t4._datatype;
    if (!a2)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var l2, p2 = h[0], f2 = h[1], d2 = r2, m2 = 0, y2 = i2;
    typeof c2 == "string" && (l2 = c2, d2 = e2.find(r2, [l2, l2]), m2 = e2.convert(0, l2), n2 = e2.convert(n2, l2), y2 = e2.find(i2, [l2, l2]));
    for (var g2 = [], v = [], x = [], w = 0; w < f2; w++) {
      x[w] = v.length;
      for (var b = u2[w], _ = u2[w + 1], M = b; M < _; M++) {
        var E = o2[M], N = s2 ? y2(n2, a2[M]) : y2(a2[M], n2);
        d2(N, m2) || (v.push(E), g2.push(N));
      }
    }
    return x[f2] = v.length, t4.createSparseMatrix({values: g2, index: v, ptr: x, size: [p2, f2], datatype: l2});
  };
}), Os = cn("algorithm14", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return function(t4, n2, i2, s2) {
    var a2, o2 = t4._data, u2 = t4._size, h = t4._datatype, c2 = i2;
    typeof h == "string" && (a2 = h, n2 = e2.convert(n2, a2), c2 = e2.find(i2, [a2, a2]));
    var l2 = u2.length > 0 ? r2(c2, 0, u2, u2[0], o2, n2, s2) : [];
    return t4.createDenseMatrix({data: l2, size: pr(u2), datatype: a2});
  };
  function r2(t4, e3, n2, i2, s2, a2, o2) {
    var u2 = [];
    if (e3 === n2.length - 1)
      for (var h = 0; h < i2; h++)
        u2[h] = o2 ? t4(a2, s2[h]) : t4(s2[h], a2);
    else
      for (var c2 = 0; c2 < i2; c2++)
        u2[c2] = r2(t4, e3 + 1, n2, n2[e3 + 1], s2[c2], a2, o2);
    return u2;
  }
}), zs = cn("ceil", ["typed", "config", "round", "matrix", "equalScalar"], (t3) => {
  var {typed: e2, config: r2, round: n2, matrix: i2, equalScalar: s2} = t3, a2 = Ts({typed: e2, equalScalar: s2}), o2 = Os({typed: e2});
  return e2("ceil", {number: function(t4) {
    return Pr(t4, n2(t4), r2.epsilon) ? n2(t4) : ls(t4);
  }, "number, number": function(t4, e3) {
    if (Pr(t4, n2(t4, e3), r2.epsilon))
      return n2(t4, e3);
    var [i3, s3] = "".concat(t4, "e").split("e"), a3 = Math.ceil(Number("".concat(i3, "e").concat(Number(s3) + e3)));
    return [i3, s3] = "".concat(a3, "e").split("e"), Number("".concat(i3, "e").concat(Number(s3) - e3));
  }, Complex: function(t4) {
    return t4.ceil();
  }, "Complex, number": function(t4, e3) {
    return t4.ceil(e3);
  }, BigNumber: function(t4) {
    return ys(t4, n2(t4), r2.epsilon) ? n2(t4) : t4.ceil();
  }, "BigNumber, BigNumber": function(t4, e3) {
    return ys(t4, n2(t4, e3), r2.epsilon) ? n2(t4, e3) : t4.toDecimalPlaces(e3.toNumber(), Gi.ROUND_CEIL);
  }, Fraction: function(t4) {
    return t4.ceil();
  }, "Fraction, number": function(t4, e3) {
    return t4.ceil(e3);
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }, "Array | Matrix, number": function(t4, e3) {
    return is(t4, (t5) => this(t5, e3));
  }, "SparseMatrix, number | BigNumber": function(t4, e3) {
    return a2(t4, e3, this, false);
  }, "DenseMatrix, number | BigNumber": function(t4, e3) {
    return o2(t4, e3, this, false);
  }, "number | Complex | BigNumber, Array": function(t4, e3) {
    return o2(i2(e3), t4, this, true).valueOf();
  }});
}), As = cn("fix", ["typed", "Complex", "matrix", "ceil", "floor"], (t3) => {
  var {typed: e2, Complex: r2, matrix: n2, ceil: i2, floor: s2} = t3, a2 = Os({typed: e2});
  return e2("fix", {number: function(t4) {
    return t4 > 0 ? s2(t4) : i2(t4);
  }, "number, number | BigNumber": function(t4, e3) {
    return t4 > 0 ? s2(t4, e3) : i2(t4, e3);
  }, Complex: function(t4) {
    return new r2(t4.re > 0 ? Math.floor(t4.re) : Math.ceil(t4.re), t4.im > 0 ? Math.floor(t4.im) : Math.ceil(t4.im));
  }, "Complex, number | BigNumber": function(t4, e3) {
    return new r2(t4.re > 0 ? s2(t4.re, e3) : i2(t4.re, e3), t4.im > 0 ? s2(t4.im, e3) : i2(t4.im, e3));
  }, BigNumber: function(t4) {
    return t4.isNegative() ? i2(t4) : s2(t4);
  }, "BigNumber, number | BigNumber": function(t4, e3) {
    return t4.isNegative() ? i2(t4, e3) : s2(t4, e3);
  }, Fraction: function(t4) {
    return t4.s < 0 ? t4.ceil() : t4.floor();
  }, "Fraction, number | BigNumber": function(t4, e3) {
    return t4.s < 0 ? t4.ceil(e3) : t4.floor(e3);
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }, "Array | Matrix, number | BigNumber": function(t4, e3) {
    return is(t4, (t5) => this(t5, e3));
  }, "number | Complex | BigNumber, Array": function(t4, e3) {
    return a2(n2(e3), t4, this, true).valueOf();
  }});
}), Cs = cn("floor", ["typed", "config", "round", "matrix", "equalScalar"], (t3) => {
  var {typed: e2, config: r2, round: n2, matrix: i2, equalScalar: s2} = t3, a2 = Ts({typed: e2, equalScalar: s2}), o2 = Os({typed: e2});
  return e2("floor", {number: function(t4) {
    return Pr(t4, n2(t4), r2.epsilon) ? n2(t4) : Math.floor(t4);
  }, "number, number": function(t4, e3) {
    if (Pr(t4, n2(t4, e3), r2.epsilon))
      return n2(t4, e3);
    var [i3, s3] = "".concat(t4, "e").split("e"), a3 = Math.floor(Number("".concat(i3, "e").concat(Number(s3) + e3)));
    return [i3, s3] = "".concat(a3, "e").split("e"), Number("".concat(i3, "e").concat(Number(s3) - e3));
  }, Complex: function(t4) {
    return t4.floor();
  }, "Complex, number": function(t4, e3) {
    return t4.floor(e3);
  }, BigNumber: function(t4) {
    return ys(t4, n2(t4), r2.epsilon) ? n2(t4) : t4.floor();
  }, "BigNumber, BigNumber": function(t4, e3) {
    return ys(t4, n2(t4, e3), r2.epsilon) ? n2(t4, e3) : t4.toDecimalPlaces(e3.toNumber(), Gi.ROUND_FLOOR);
  }, Fraction: function(t4) {
    return t4.floor();
  }, "Fraction, number": function(t4, e3) {
    return t4.floor(e3);
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }, "Array | Matrix, number": function(t4, e3) {
    return is(t4, (t5) => this(t5, e3));
  }, "SparseMatrix, number | BigNumber": function(t4, e3) {
    return a2(t4, e3, this, false);
  }, "DenseMatrix, number | BigNumber": function(t4, e3) {
    return o2(t4, e3, this, false);
  }, "number | Complex | BigNumber, Array": function(t4, e3) {
    return o2(i2(e3), t4, this, true).valueOf();
  }});
}), Rs = cn("algorithm01", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return function(t4, r2, n2, i2) {
    var s2 = t4._data, a2 = t4._size, o2 = t4._datatype, u2 = r2._values, h = r2._index, c2 = r2._ptr, l2 = r2._size, p2 = r2._datatype;
    if (a2.length !== l2.length)
      throw new Wr(a2.length, l2.length);
    if (a2[0] !== l2[0] || a2[1] !== l2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + a2 + ") must match Matrix B (" + l2 + ")");
    if (!u2)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var f2, d2, m2 = a2[0], y2 = a2[1], g2 = typeof o2 == "string" && o2 === p2 ? o2 : void 0, v = g2 ? e2.find(n2, [g2, g2]) : n2, x = [];
    for (f2 = 0; f2 < m2; f2++)
      x[f2] = [];
    var w = [], b = [];
    for (d2 = 0; d2 < y2; d2++) {
      for (var _ = d2 + 1, M = c2[d2], E = c2[d2 + 1], N = M; N < E; N++)
        w[f2 = h[N]] = i2 ? v(u2[N], s2[f2][d2]) : v(s2[f2][d2], u2[N]), b[f2] = _;
      for (f2 = 0; f2 < m2; f2++)
        b[f2] === _ ? x[f2][d2] = w[f2] : x[f2][d2] = s2[f2][d2];
    }
    return t4.createDenseMatrix({data: x, size: [m2, y2], datatype: g2});
  };
}), Ds = cn("algorithm04", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return function(t4, n2, i2) {
    var s2 = t4._values, a2 = t4._index, o2 = t4._ptr, u2 = t4._size, h = t4._datatype, c2 = n2._values, l2 = n2._index, p2 = n2._ptr, f2 = n2._size, d2 = n2._datatype;
    if (u2.length !== f2.length)
      throw new Wr(u2.length, f2.length);
    if (u2[0] !== f2[0] || u2[1] !== f2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + u2 + ") must match Matrix B (" + f2 + ")");
    var m2, y2 = u2[0], g2 = u2[1], v = r2, x = 0, w = i2;
    typeof h == "string" && h === d2 && (m2 = h, v = e2.find(r2, [m2, m2]), x = e2.convert(0, m2), w = e2.find(i2, [m2, m2]));
    var b, _, M, E, N, S = s2 && c2 ? [] : void 0, T = [], O2 = [], z2 = s2 && c2 ? [] : void 0, A2 = s2 && c2 ? [] : void 0, C2 = [], R2 = [];
    for (_ = 0; _ < g2; _++) {
      O2[_] = T.length;
      var D2 = _ + 1;
      for (E = o2[_], N = o2[_ + 1], M = E; M < N; M++)
        b = a2[M], T.push(b), C2[b] = D2, z2 && (z2[b] = s2[M]);
      for (E = p2[_], N = p2[_ + 1], M = E; M < N; M++)
        if (C2[b = l2[M]] === D2) {
          if (z2) {
            var k2 = w(z2[b], c2[M]);
            v(k2, x) ? C2[b] = null : z2[b] = k2;
          }
        } else
          T.push(b), R2[b] = D2, A2 && (A2[b] = c2[M]);
      if (z2 && A2)
        for (M = O2[_]; M < T.length; )
          C2[b = T[M]] === D2 ? (S[M] = z2[b], M++) : R2[b] === D2 ? (S[M] = A2[b], M++) : T.splice(M, 1);
    }
    return O2[g2] = T.length, t4.createSparseMatrix({values: S, index: T, ptr: O2, size: [y2, g2], datatype: m2});
  };
}), ks = cn("algorithm10", ["typed", "DenseMatrix"], (t3) => {
  var {typed: e2, DenseMatrix: r2} = t3;
  return function(t4, n2, i2, s2) {
    var a2 = t4._values, o2 = t4._index, u2 = t4._ptr, h = t4._size, c2 = t4._datatype;
    if (!a2)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var l2, p2 = h[0], f2 = h[1], d2 = i2;
    typeof c2 == "string" && (l2 = c2, n2 = e2.convert(n2, l2), d2 = e2.find(i2, [l2, l2]));
    for (var m2 = [], y2 = [], g2 = [], v = 0; v < f2; v++) {
      for (var x = v + 1, w = u2[v], b = u2[v + 1], _ = w; _ < b; _++) {
        var M = o2[_];
        y2[M] = a2[_], g2[M] = x;
      }
      for (var E = 0; E < p2; E++)
        v === 0 && (m2[E] = []), g2[E] === x ? m2[E][v] = s2 ? d2(n2, y2[E]) : d2(y2[E], n2) : m2[E][v] = n2;
    }
    return new r2({data: m2, size: [p2, f2], datatype: l2});
  };
}), Is = cn("algorithm13", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return function(t4, n2, i2) {
    var s2, a2 = t4._data, o2 = t4._size, u2 = t4._datatype, h = n2._data, c2 = n2._size, l2 = n2._datatype, p2 = [];
    if (o2.length !== c2.length)
      throw new Wr(o2.length, c2.length);
    for (var f2 = 0; f2 < o2.length; f2++) {
      if (o2[f2] !== c2[f2])
        throw new RangeError("Dimension mismatch. Matrix A (" + o2 + ") must match Matrix B (" + c2 + ")");
      p2[f2] = o2[f2];
    }
    var d2 = i2;
    typeof u2 == "string" && u2 === l2 && (s2 = u2, d2 = e2.find(i2, [s2, s2]));
    var m2 = p2.length > 0 ? r2(d2, 0, p2, p2[0], a2, h) : [];
    return t4.createDenseMatrix({data: m2, size: p2, datatype: s2});
  };
  function r2(t4, e3, n2, i2, s2, a2) {
    var o2 = [];
    if (e3 === n2.length - 1)
      for (var u2 = 0; u2 < i2; u2++)
        o2[u2] = t4(s2[u2], a2[u2]);
    else
      for (var h = 0; h < i2; h++)
        o2[h] = r2(t4, e3 + 1, n2, n2[e3 + 1], s2[h], a2[h]);
    return o2;
  }
}), Ls = cn("algorithm02", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return function(t4, n2, i2, s2) {
    var a2 = t4._data, o2 = t4._size, u2 = t4._datatype, h = n2._values, c2 = n2._index, l2 = n2._ptr, p2 = n2._size, f2 = n2._datatype;
    if (o2.length !== p2.length)
      throw new Wr(o2.length, p2.length);
    if (o2[0] !== p2[0] || o2[1] !== p2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + o2 + ") must match Matrix B (" + p2 + ")");
    if (!h)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var d2, m2 = o2[0], y2 = o2[1], g2 = r2, v = 0, x = i2;
    typeof u2 == "string" && u2 === f2 && (d2 = u2, g2 = e2.find(r2, [d2, d2]), v = e2.convert(0, d2), x = e2.find(i2, [d2, d2]));
    for (var w = [], b = [], _ = [], M = 0; M < y2; M++) {
      _[M] = b.length;
      for (var E = l2[M], N = l2[M + 1], S = E; S < N; S++) {
        var T = c2[S], O2 = s2 ? x(h[S], a2[T][M]) : x(a2[T][M], h[S]);
        g2(O2, v) || (b.push(T), w.push(O2));
      }
    }
    return _[y2] = b.length, n2.createSparseMatrix({values: w, index: b, ptr: _, size: [m2, y2], datatype: d2});
  };
}), Bs = cn("algorithm03", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return function(t4, r2, n2, i2) {
    var s2 = t4._data, a2 = t4._size, o2 = t4._datatype, u2 = r2._values, h = r2._index, c2 = r2._ptr, l2 = r2._size, p2 = r2._datatype;
    if (a2.length !== l2.length)
      throw new Wr(a2.length, l2.length);
    if (a2[0] !== l2[0] || a2[1] !== l2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + a2 + ") must match Matrix B (" + l2 + ")");
    if (!u2)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var f2, d2 = a2[0], m2 = a2[1], y2 = 0, g2 = n2;
    typeof o2 == "string" && o2 === p2 && (f2 = o2, y2 = e2.convert(0, f2), g2 = e2.find(n2, [f2, f2]));
    for (var v = [], x = 0; x < d2; x++)
      v[x] = [];
    for (var w = [], b = [], _ = 0; _ < m2; _++) {
      for (var M = _ + 1, E = c2[_], N = c2[_ + 1], S = E; S < N; S++) {
        var T = h[S];
        w[T] = i2 ? g2(u2[S], s2[T][_]) : g2(s2[T][_], u2[S]), b[T] = M;
      }
      for (var O2 = 0; O2 < d2; O2++)
        b[O2] === M ? v[O2][_] = w[O2] : v[O2][_] = i2 ? g2(y2, s2[O2][_]) : g2(s2[O2][_], y2);
    }
    return t4.createDenseMatrix({data: v, size: [d2, m2], datatype: f2});
  };
}), Fs = cn("algorithm05", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return function(t4, n2, i2) {
    var s2 = t4._values, a2 = t4._index, o2 = t4._ptr, u2 = t4._size, h = t4._datatype, c2 = n2._values, l2 = n2._index, p2 = n2._ptr, f2 = n2._size, d2 = n2._datatype;
    if (u2.length !== f2.length)
      throw new Wr(u2.length, f2.length);
    if (u2[0] !== f2[0] || u2[1] !== f2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + u2 + ") must match Matrix B (" + f2 + ")");
    var m2, y2 = u2[0], g2 = u2[1], v = r2, x = 0, w = i2;
    typeof h == "string" && h === d2 && (m2 = h, v = e2.find(r2, [m2, m2]), x = e2.convert(0, m2), w = e2.find(i2, [m2, m2]));
    var b, _, M, E, N = s2 && c2 ? [] : void 0, S = [], T = [], O2 = N ? [] : void 0, z2 = N ? [] : void 0, A2 = [], C2 = [];
    for (_ = 0; _ < g2; _++) {
      T[_] = S.length;
      var R2 = _ + 1;
      for (M = o2[_], E = o2[_ + 1]; M < E; M++)
        b = a2[M], S.push(b), A2[b] = R2, O2 && (O2[b] = s2[M]);
      for (M = p2[_], E = p2[_ + 1]; M < E; M++)
        A2[b = l2[M]] !== R2 && S.push(b), C2[b] = R2, z2 && (z2[b] = c2[M]);
      if (N)
        for (M = T[_]; M < S.length; ) {
          var D2 = A2[b = S[M]], k2 = C2[b];
          if (D2 === R2 || k2 === R2) {
            var I2 = w(D2 === R2 ? O2[b] : x, k2 === R2 ? z2[b] : x);
            v(I2, x) ? S.splice(M, 1) : (N.push(I2), M++);
          }
        }
    }
    return T[g2] = S.length, t4.createSparseMatrix({values: N, index: S, ptr: T, size: [y2, g2], datatype: m2});
  };
}), Ps = cn("algorithm12", ["typed", "DenseMatrix"], (t3) => {
  var {typed: e2, DenseMatrix: r2} = t3;
  return function(t4, n2, i2, s2) {
    var a2 = t4._values, o2 = t4._index, u2 = t4._ptr, h = t4._size, c2 = t4._datatype;
    if (!a2)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var l2, p2 = h[0], f2 = h[1], d2 = i2;
    typeof c2 == "string" && (l2 = c2, n2 = e2.convert(n2, l2), d2 = e2.find(i2, [l2, l2]));
    for (var m2 = [], y2 = [], g2 = [], v = 0; v < f2; v++) {
      for (var x = v + 1, w = u2[v], b = u2[v + 1], _ = w; _ < b; _++) {
        var M = o2[_];
        y2[M] = a2[_], g2[M] = x;
      }
      for (var E = 0; E < p2; E++)
        v === 0 && (m2[E] = []), g2[E] === x ? m2[E][v] = s2 ? d2(n2, y2[E]) : d2(y2[E], n2) : m2[E][v] = s2 ? d2(n2, 0) : d2(0, n2);
    }
    return new r2({data: m2, size: [p2, f2], datatype: l2});
  };
});
cn("mod", ["typed", "matrix", "equalScalar", "DenseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, equalScalar: n2, DenseMatrix: i2} = t3, s2 = Ls({typed: e2, equalScalar: n2}), a2 = Bs({typed: e2}), o2 = Fs({typed: e2, equalScalar: n2}), u2 = Ts({typed: e2, equalScalar: n2}), h = Ps({typed: e2, DenseMatrix: i2}), c2 = Is({typed: e2}), l2 = Os({typed: e2});
  return e2("mod", {"number, number": ps, "BigNumber, BigNumber": function(t4, e3) {
    if (e3.isNeg())
      throw new Error("Cannot calculate mod for a negative divisor");
    return e3.isZero() ? t4 : t4.mod(e3);
  }, "Fraction, Fraction": function(t4, e3) {
    if (e3.compare(0) < 0)
      throw new Error("Cannot calculate mod for a negative divisor");
    return t4.compare(0) >= 0 ? t4.mod(e3) : t4.mod(e3).add(e3).mod(e3);
  }, "SparseMatrix, SparseMatrix": function(t4, e3) {
    return o2(t4, e3, this, false);
  }, "SparseMatrix, DenseMatrix": function(t4, e3) {
    return s2(e3, t4, this, true);
  }, "DenseMatrix, SparseMatrix": function(t4, e3) {
    return a2(t4, e3, this, false);
  }, "DenseMatrix, DenseMatrix": function(t4, e3) {
    return c2(t4, e3, this);
  }, "Array, Array": function(t4, e3) {
    return this(r2(t4), r2(e3)).valueOf();
  }, "Array, Matrix": function(t4, e3) {
    return this(r2(t4), e3);
  }, "Matrix, Array": function(t4, e3) {
    return this(t4, r2(e3));
  }, "SparseMatrix, any": function(t4, e3) {
    return u2(t4, e3, this, false);
  }, "DenseMatrix, any": function(t4, e3) {
    return l2(t4, e3, this, false);
  }, "any, SparseMatrix": function(t4, e3) {
    return h(e3, t4, this, true);
  }, "any, DenseMatrix": function(t4, e3) {
    return l2(e3, t4, this, true);
  }, "Array, any": function(t4, e3) {
    return l2(r2(t4), e3, this, false).valueOf();
  }, "any, Array": function(t4, e3) {
    return l2(r2(e3), t4, this, true).valueOf();
  }});
});
var js = cn("multiplyScalar", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("multiplyScalar", {"number, number": hs, "Complex, Complex": function(t4, e3) {
    return t4.mul(e3);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.times(e3);
  }, "Fraction, Fraction": function(t4, e3) {
    return t4.mul(e3);
  }, "number | Fraction | BigNumber | Complex, Unit": function(t4, e3) {
    var r2 = e3.clone();
    return r2.value = r2.value === null ? r2._normalize(t4) : this(r2.value, t4), r2;
  }, "Unit, number | Fraction | BigNumber | Complex": function(t4, e3) {
    var r2 = t4.clone();
    return r2.value = r2.value === null ? r2._normalize(e3) : this(r2.value, e3), r2;
  }, "Unit, Unit": function(t4, e3) {
    return t4.multiply(e3);
  }});
}), qs = cn("multiply", ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], (t3) => {
  var {typed: e2, matrix: r2, addScalar: n2, multiplyScalar: i2, equalScalar: s2, dot: a2} = t3, o2 = Ts({typed: e2, equalScalar: s2}), u2 = Os({typed: e2});
  function h(t4, e3) {
    switch (t4.length) {
      case 1:
        switch (e3.length) {
          case 1:
            if (t4[0] !== e3[0])
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (t4[0] !== e3[0])
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + t4[0] + ") must match Matrix rows (" + e3[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + e3.length + " dimensions)");
        }
        break;
      case 2:
        switch (e3.length) {
          case 1:
            if (t4[1] !== e3[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + t4[1] + ") must match Vector length (" + e3[0] + ")");
            break;
          case 2:
            if (t4[1] !== e3[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + t4[1] + ") must match Matrix B rows (" + e3[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + e3.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + t4.length + " dimensions)");
    }
  }
  function c2(t4, r3) {
    if (r3.storage() !== "dense")
      throw new Error("Support for SparseMatrix not implemented");
    return function(t5, r4) {
      var s3, a3 = t5._data, o3 = t5._size, u3 = t5._datatype, h2 = r4._data, c3 = r4._size, l3 = r4._datatype, p3 = o3[0], f2 = c3[1], d2 = n2, m2 = i2;
      u3 && l3 && u3 === l3 && typeof u3 == "string" && (s3 = u3, d2 = e2.find(n2, [s3, s3]), m2 = e2.find(i2, [s3, s3]));
      for (var y2 = [], g2 = 0; g2 < f2; g2++) {
        for (var v = m2(a3[0], h2[0][g2]), x = 1; x < p3; x++)
          v = d2(v, m2(a3[x], h2[x][g2]));
        y2[g2] = v;
      }
      return t5.createDenseMatrix({data: y2, size: [f2], datatype: s3});
    }(t4, r3);
  }
  var l2 = e2("_multiplyMatrixVector", {"DenseMatrix, any": function(t4, r3) {
    var s3, a3 = t4._data, o3 = t4._size, u3 = t4._datatype, h2 = r3._data, c3 = r3._datatype, l3 = o3[0], p3 = o3[1], f2 = n2, d2 = i2;
    u3 && c3 && u3 === c3 && typeof u3 == "string" && (s3 = u3, f2 = e2.find(n2, [s3, s3]), d2 = e2.find(i2, [s3, s3]));
    for (var m2 = [], y2 = 0; y2 < l3; y2++) {
      for (var g2 = a3[y2], v = d2(g2[0], h2[0]), x = 1; x < p3; x++)
        v = f2(v, d2(g2[x], h2[x]));
      m2[y2] = v;
    }
    return t4.createDenseMatrix({data: m2, size: [l3], datatype: s3});
  }, "SparseMatrix, any": function(t4, r3) {
    var a3 = t4._values, o3 = t4._index, u3 = t4._ptr, h2 = t4._datatype;
    if (!a3)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var c3, l3 = r3._data, p3 = r3._datatype, f2 = t4._size[0], d2 = r3._size[0], m2 = [], y2 = [], g2 = [], v = n2, x = i2, w = s2, b = 0;
    h2 && p3 && h2 === p3 && typeof h2 == "string" && (c3 = h2, v = e2.find(n2, [c3, c3]), x = e2.find(i2, [c3, c3]), w = e2.find(s2, [c3, c3]), b = e2.convert(0, c3));
    var _ = [], M = [];
    g2[0] = 0;
    for (var E = 0; E < d2; E++) {
      var N = l3[E];
      if (!w(N, b))
        for (var S = u3[E], T = u3[E + 1], O2 = S; O2 < T; O2++) {
          var z2 = o3[O2];
          M[z2] ? _[z2] = v(_[z2], x(N, a3[O2])) : (M[z2] = true, y2.push(z2), _[z2] = x(N, a3[O2]));
        }
    }
    for (var A2 = y2.length, C2 = 0; C2 < A2; C2++) {
      var R2 = y2[C2];
      m2[C2] = _[R2];
    }
    return g2[1] = y2.length, t4.createSparseMatrix({values: m2, index: y2, ptr: g2, size: [f2, 1], datatype: c3});
  }}), p2 = e2("_multiplyMatrixMatrix", {"DenseMatrix, DenseMatrix": function(t4, r3) {
    var s3, a3 = t4._data, o3 = t4._size, u3 = t4._datatype, h2 = r3._data, c3 = r3._size, l3 = r3._datatype, p3 = o3[0], f2 = o3[1], d2 = c3[1], m2 = n2, y2 = i2;
    u3 && l3 && u3 === l3 && typeof u3 == "string" && (s3 = u3, m2 = e2.find(n2, [s3, s3]), y2 = e2.find(i2, [s3, s3]));
    for (var g2 = [], v = 0; v < p3; v++) {
      var x = a3[v];
      g2[v] = [];
      for (var w = 0; w < d2; w++) {
        for (var b = y2(x[0], h2[0][w]), _ = 1; _ < f2; _++)
          b = m2(b, y2(x[_], h2[_][w]));
        g2[v][w] = b;
      }
    }
    return t4.createDenseMatrix({data: g2, size: [p3, d2], datatype: s3});
  }, "DenseMatrix, SparseMatrix": function(t4, r3) {
    var a3 = t4._data, o3 = t4._size, u3 = t4._datatype, h2 = r3._values, c3 = r3._index, l3 = r3._ptr, p3 = r3._size, f2 = r3._datatype;
    if (!h2)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var d2, m2 = o3[0], y2 = p3[1], g2 = n2, v = i2, x = s2, w = 0;
    u3 && f2 && u3 === f2 && typeof u3 == "string" && (d2 = u3, g2 = e2.find(n2, [d2, d2]), v = e2.find(i2, [d2, d2]), x = e2.find(s2, [d2, d2]), w = e2.convert(0, d2));
    for (var b = [], _ = [], M = [], E = r3.createSparseMatrix({values: b, index: _, ptr: M, size: [m2, y2], datatype: d2}), N = 0; N < y2; N++) {
      M[N] = _.length;
      var S = l3[N], T = l3[N + 1];
      if (T > S)
        for (var O2 = 0, z2 = 0; z2 < m2; z2++) {
          for (var A2 = z2 + 1, C2 = void 0, R2 = S; R2 < T; R2++) {
            var D2 = c3[R2];
            O2 !== A2 ? (C2 = v(a3[z2][D2], h2[R2]), O2 = A2) : C2 = g2(C2, v(a3[z2][D2], h2[R2]));
          }
          O2 !== A2 || x(C2, w) || (_.push(z2), b.push(C2));
        }
    }
    return M[y2] = _.length, E;
  }, "SparseMatrix, DenseMatrix": function(t4, r3) {
    var a3 = t4._values, o3 = t4._index, u3 = t4._ptr, h2 = t4._datatype;
    if (!a3)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var c3, l3 = r3._data, p3 = r3._datatype, f2 = t4._size[0], d2 = r3._size[0], m2 = r3._size[1], y2 = n2, g2 = i2, v = s2, x = 0;
    h2 && p3 && h2 === p3 && typeof h2 == "string" && (c3 = h2, y2 = e2.find(n2, [c3, c3]), g2 = e2.find(i2, [c3, c3]), v = e2.find(s2, [c3, c3]), x = e2.convert(0, c3));
    for (var w = [], b = [], _ = [], M = t4.createSparseMatrix({values: w, index: b, ptr: _, size: [f2, m2], datatype: c3}), E = [], N = [], S = 0; S < m2; S++) {
      _[S] = b.length;
      for (var T = S + 1, O2 = 0; O2 < d2; O2++) {
        var z2 = l3[O2][S];
        if (!v(z2, x))
          for (var A2 = u3[O2], C2 = u3[O2 + 1], R2 = A2; R2 < C2; R2++) {
            var D2 = o3[R2];
            N[D2] !== T ? (N[D2] = T, b.push(D2), E[D2] = g2(z2, a3[R2])) : E[D2] = y2(E[D2], g2(z2, a3[R2]));
          }
      }
      for (var k2 = _[S], I2 = b.length, L2 = k2; L2 < I2; L2++) {
        var B2 = b[L2];
        w[L2] = E[B2];
      }
    }
    return _[m2] = b.length, M;
  }, "SparseMatrix, SparseMatrix": function(t4, r3) {
    var s3, a3 = t4._values, o3 = t4._index, u3 = t4._ptr, h2 = t4._datatype, c3 = r3._values, l3 = r3._index, p3 = r3._ptr, f2 = r3._datatype, d2 = t4._size[0], m2 = r3._size[1], y2 = a3 && c3, g2 = n2, v = i2;
    h2 && f2 && h2 === f2 && typeof h2 == "string" && (s3 = h2, g2 = e2.find(n2, [s3, s3]), v = e2.find(i2, [s3, s3]));
    for (var x, w, b, _, M, E, N, S, T = y2 ? [] : void 0, O2 = [], z2 = [], A2 = t4.createSparseMatrix({values: T, index: O2, ptr: z2, size: [d2, m2], datatype: s3}), C2 = y2 ? [] : void 0, R2 = [], D2 = 0; D2 < m2; D2++) {
      z2[D2] = O2.length;
      var k2 = D2 + 1;
      for (M = p3[D2], E = p3[D2 + 1], _ = M; _ < E; _++)
        if (S = l3[_], y2)
          for (w = u3[S], b = u3[S + 1], x = w; x < b; x++)
            N = o3[x], R2[N] !== k2 ? (R2[N] = k2, O2.push(N), C2[N] = v(c3[_], a3[x])) : C2[N] = g2(C2[N], v(c3[_], a3[x]));
        else
          for (w = u3[S], b = u3[S + 1], x = w; x < b; x++)
            N = o3[x], R2[N] !== k2 && (R2[N] = k2, O2.push(N));
      if (y2)
        for (var I2 = z2[D2], L2 = O2.length, B2 = I2; B2 < L2; B2++) {
          var F2 = O2[B2];
          T[B2] = C2[F2];
        }
    }
    return z2[m2] = O2.length, A2;
  }});
  return e2("multiply", dr({"Array, Array": function(t4, e3) {
    h(Zr(t4), Zr(e3));
    var n3 = this(r2(t4), r2(e3));
    return ke(n3) ? n3.valueOf() : n3;
  }, "Matrix, Matrix": function(t4, e3) {
    var r3 = t4.size(), n3 = e3.size();
    return h(r3, n3), r3.length === 1 ? n3.length === 1 ? function(t5, e4, r4) {
      if (r4 === 0)
        throw new Error("Cannot multiply two empty vectors");
      return a2(t5, e4);
    }(t4, e3, r3[0]) : c2(t4, e3) : n3.length === 1 ? l2(t4, e3) : p2(t4, e3);
  }, "Matrix, Array": function(t4, e3) {
    return this(t4, r2(e3));
  }, "Array, Matrix": function(t4, e3) {
    return this(r2(t4, e3.storage()), e3);
  }, "SparseMatrix, any": function(t4, e3) {
    return o2(t4, e3, i2, false);
  }, "DenseMatrix, any": function(t4, e3) {
    return u2(t4, e3, i2, false);
  }, "any, SparseMatrix": function(t4, e3) {
    return o2(e3, t4, i2, true);
  }, "any, DenseMatrix": function(t4, e3) {
    return u2(e3, t4, i2, true);
  }, "Array, any": function(t4, e3) {
    return u2(r2(t4), e3, i2, false).valueOf();
  }, "any, Array": function(t4, e3) {
    return u2(r2(e3), t4, i2, true).valueOf();
  }, "any, any": i2, "any, any, ...any": function(t4, e3, r3) {
    for (var n3 = this(t4, e3), i3 = 0; i3 < r3.length; i3++)
      n3 = this(n3, r3[i3]);
    return n3;
  }}, i2.signatures));
}), Hs = cn("subtract", ["typed", "matrix", "equalScalar", "addScalar", "unaryMinus", "DenseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, equalScalar: n2, addScalar: i2, unaryMinus: s2, DenseMatrix: a2} = t3, o2 = Rs({typed: e2}), u2 = Bs({typed: e2}), h = Fs({typed: e2, equalScalar: n2}), c2 = ks({typed: e2, DenseMatrix: a2}), l2 = Is({typed: e2}), p2 = Os({typed: e2});
  return e2("subtract", {"number, number": function(t4, e3) {
    return t4 - e3;
  }, "Complex, Complex": function(t4, e3) {
    return t4.sub(e3);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.minus(e3);
  }, "Fraction, Fraction": function(t4, e3) {
    return t4.sub(e3);
  }, "Unit, Unit": function(t4, e3) {
    if (t4.value === null)
      throw new Error("Parameter x contains a unit with undefined value");
    if (e3.value === null)
      throw new Error("Parameter y contains a unit with undefined value");
    if (!t4.equalBase(e3))
      throw new Error("Units do not match");
    var r3 = t4.clone();
    return r3.value = this(r3.value, e3.value), r3.fixPrefix = false, r3;
  }, "SparseMatrix, SparseMatrix": function(t4, e3) {
    return Vs(t4, e3), h(t4, e3, this);
  }, "SparseMatrix, DenseMatrix": function(t4, e3) {
    return Vs(t4, e3), u2(e3, t4, this, true);
  }, "DenseMatrix, SparseMatrix": function(t4, e3) {
    return Vs(t4, e3), o2(t4, e3, this, false);
  }, "DenseMatrix, DenseMatrix": function(t4, e3) {
    return Vs(t4, e3), l2(t4, e3, this);
  }, "Array, Array": function(t4, e3) {
    return this(r2(t4), r2(e3)).valueOf();
  }, "Array, Matrix": function(t4, e3) {
    return this(r2(t4), e3);
  }, "Matrix, Array": function(t4, e3) {
    return this(t4, r2(e3));
  }, "SparseMatrix, any": function(t4, e3) {
    return c2(t4, s2(e3), i2);
  }, "DenseMatrix, any": function(t4, e3) {
    return p2(t4, e3, this);
  }, "any, SparseMatrix": function(t4, e3) {
    return c2(e3, t4, this, true);
  }, "any, DenseMatrix": function(t4, e3) {
    return p2(e3, t4, this, true);
  }, "Array, any": function(t4, e3) {
    return p2(r2(t4), e3, this, false).valueOf();
  }, "any, Array": function(t4, e3) {
    return p2(r2(e3), t4, this, true).valueOf();
  }});
});
function Vs(t3, e2) {
  var r2 = t3.size(), n2 = e2.size();
  if (r2.length !== n2.length)
    throw new Wr(r2.length, n2.length);
}
var $s = cn("algorithm07", ["typed", "DenseMatrix"], (t3) => {
  var {typed: e2, DenseMatrix: r2} = t3;
  return function(t4, i2, s2) {
    var a2 = t4._size, o2 = t4._datatype, u2 = i2._size, h = i2._datatype;
    if (a2.length !== u2.length)
      throw new Wr(a2.length, u2.length);
    if (a2[0] !== u2[0] || a2[1] !== u2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + a2 + ") must match Matrix B (" + u2 + ")");
    var c2, l2, p2, f2 = a2[0], d2 = a2[1], m2 = 0, y2 = s2;
    typeof o2 == "string" && o2 === h && (c2 = o2, m2 = e2.convert(0, c2), y2 = e2.find(s2, [c2, c2]));
    var g2 = [];
    for (l2 = 0; l2 < f2; l2++)
      g2[l2] = [];
    var v = [], x = [], w = [], b = [];
    for (p2 = 0; p2 < d2; p2++) {
      var _ = p2 + 1;
      for (n2(t4, p2, w, v, _), n2(i2, p2, b, x, _), l2 = 0; l2 < f2; l2++) {
        var M = w[l2] === _ ? v[l2] : m2, E = b[l2] === _ ? x[l2] : m2;
        g2[l2][p2] = y2(M, E);
      }
    }
    return new r2({data: g2, size: [f2, d2], datatype: c2});
  };
  function n2(t4, e3, r3, n3, i2) {
    for (var s2 = t4._values, a2 = t4._index, o2 = t4._ptr, u2 = o2[e3], h = o2[e3 + 1]; u2 < h; u2++) {
      var c2 = a2[u2];
      r3[c2] = i2, n3[c2] = s2[u2];
    }
  }
}), Gs = cn("conj", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("conj", {number: function(t4) {
    return t4;
  }, BigNumber: function(t4) {
    return t4;
  }, Complex: function(t4) {
    return t4.conjugate();
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }});
});
function Ws(t3) {
  var e2 = 0, r2 = 1, n2 = Object.create(null), i2 = Object.create(null), s2 = 0, a2 = function(t4) {
    var a3 = i2[t4];
    if (a3 && (delete n2[a3], delete i2[t4], --e2, r2 === a3)) {
      if (!e2)
        return s2 = 0, void (r2 = 1);
      for (; !hasOwnProperty.call(n2, ++r2); )
        ;
    }
  };
  return t3 = Math.abs(t3), {hit: function(o2) {
    var u2 = i2[o2], h = ++s2;
    if (n2[h] = o2, i2[o2] = h, !u2) {
      if (++e2 <= t3)
        return;
      return o2 = n2[r2], a2(o2), o2;
    }
    if (delete n2[u2], r2 === u2)
      for (; !hasOwnProperty.call(n2, ++r2); )
        ;
  }, delete: a2, clear: function() {
    e2 = s2 = 0, r2 = 1, n2 = Object.create(null), i2 = Object.create(null);
  }};
}
function Ys(t3) {
  var {hasher: e2, limit: r2} = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return r2 = r2 == null ? Number.POSITIVE_INFINITY : r2, e2 = e2 == null ? JSON.stringify : e2, function n2() {
    typeof n2.cache != "object" && (n2.cache = {values: new Map(), lru: Ws(r2 || Number.POSITIVE_INFINITY)});
    for (var i2 = [], s2 = 0; s2 < arguments.length; s2++)
      i2[s2] = arguments[s2];
    var a2 = e2(i2);
    if (n2.cache.values.has(a2))
      return n2.cache.lru.hit(a2), n2.cache.values.get(a2);
    var o2 = t3.apply(t3, i2);
    return n2.cache.values.set(a2, o2), n2.cache.values.delete(n2.cache.lru.hit(a2)), o2;
  };
}
var Zs = cn("identity", ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], (t3) => {
  var {typed: e2, config: r2, matrix: n2, BigNumber: i2, DenseMatrix: s2, SparseMatrix: a2} = t3;
  return e2("identity", {"": function() {
    return r2.matrix === "Matrix" ? n2([]) : [];
  }, string: function(t4) {
    return n2(t4);
  }, "number | BigNumber": function(t4) {
    return u2(t4, t4, r2.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, string": function(t4, e3) {
    return u2(t4, t4, e3);
  }, "number | BigNumber, number | BigNumber": function(t4, e3) {
    return u2(t4, e3, r2.matrix === "Matrix" ? "dense" : void 0);
  }, "number | BigNumber, number | BigNumber, string": function(t4, e3, r3) {
    return u2(t4, e3, r3);
  }, Array: function(t4) {
    return o2(t4);
  }, "Array, string": function(t4, e3) {
    return o2(t4, e3);
  }, Matrix: function(t4) {
    return o2(t4.valueOf(), t4.storage());
  }, "Matrix, string": function(t4, e3) {
    return o2(t4.valueOf(), e3);
  }});
  function o2(t4, e3) {
    switch (t4.length) {
      case 0:
        return e3 ? n2(e3) : [];
      case 1:
        return u2(t4[0], t4[0], e3);
      case 2:
        return u2(t4[0], t4[1], e3);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function u2(t4, e3, r3) {
    var n3 = Oe(t4) || Oe(e3) ? i2 : null;
    if (Oe(t4) && (t4 = t4.toNumber()), Oe(e3) && (e3 = e3.toNumber()), !Ar(t4) || t4 < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!Ar(e3) || e3 < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var o3 = n3 ? new i2(1) : 1, u3 = n3 ? new n3(0) : 0, h = [t4, e3];
    if (r3) {
      if (r3 === "sparse")
        return a2.diagonal(h, o3, 0, u3);
      if (r3 === "dense")
        return s2.diagonal(h, o3, 0, u3);
      throw new TypeError('Unknown matrix type "'.concat(r3, '"'));
    }
    for (var c2 = Kr([], h, u3), l2 = t4 < e3 ? t4 : e3, p2 = 0; p2 < l2; p2++)
      c2[p2][p2] = o3;
    return c2;
  }
});
function Xs() {
  throw new Error('No "bignumber" implementation available');
}
function Qs() {
  throw new Error('No "fraction" implementation available');
}
function Js(t3, e2, r2, n2) {
  if (!(this instanceof Js))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.fn = t3, this.count = e2, this.min = r2, this.max = n2, this.message = "Wrong number of arguments in function " + t3 + " (" + e2 + " provided, " + r2 + (n2 != null ? "-" + n2 : "") + " expected)", this.stack = new Error().stack;
}
Js.prototype = new Error(), Js.prototype.constructor = Error, Js.prototype.name = "ArgumentsError", Js.prototype.isArgumentsError = true;
var Ks = cn("size", ["typed", "config", "?matrix"], (t3) => {
  var {typed: e2, config: r2, matrix: n2} = t3;
  return e2("size", {Matrix: function(t4) {
    return t4.create(t4.size());
  }, Array: Zr, string: function(t4) {
    return r2.matrix === "Array" ? [t4.length] : n2([t4.length]);
  }, "number | Complex | BigNumber | Unit | boolean | null": function(t4) {
    return r2.matrix === "Array" ? [] : n2 ? n2([]) : function() {
      throw new Error('No "matrix" implementation available');
    }();
  }});
});
function ta(t3, e2) {
  if (ia(t3) && ra(t3, e2))
    return t3[e2];
  if (typeof t3[e2] == "function" && na(t3, e2))
    throw new Error('Cannot access method "' + e2 + '" as a property');
  throw new Error('No access to property "' + e2 + '"');
}
function ea(t3, e2, r2) {
  if (ia(t3) && ra(t3, e2))
    return t3[e2] = r2, r2;
  throw new Error('No access to property "' + e2 + '"');
}
function ra(t3, e2) {
  return !(!t3 || typeof t3 != "object") && (!!wr(sa, e2) || !(e2 in Object.prototype) && !(e2 in Function.prototype));
}
function na(t3, e2) {
  return t3 != null && typeof t3[e2] == "function" && (!(wr(t3, e2) && Object.getPrototypeOf && e2 in Object.getPrototypeOf(t3)) && (!!wr(aa, e2) || !(e2 in Object.prototype) && !(e2 in Function.prototype)));
}
function ia(t3) {
  return typeof t3 == "object" && t3 && t3.constructor === Object;
}
var sa = {length: true, name: true}, aa = {toString: true, valueOf: true, toLocaleString: true}, oa = cn("subset", ["typed", "matrix"], (t3) => {
  var {typed: e2, matrix: r2} = t3;
  return e2("subset", {"Array, Index": function(t4, e3) {
    var n2 = r2(t4).subset(e3);
    return e3.isScalar() ? n2 : n2.valueOf();
  }, "Matrix, Index": function(t4, e3) {
    return t4.subset(e3);
  }, "Object, Index": ca, "string, Index": ua, "Array, Index, any": function(t4, e3, n2) {
    return r2(pr(t4)).subset(e3, n2, void 0).valueOf();
  }, "Array, Index, any, any": function(t4, e3, n2, i2) {
    return r2(pr(t4)).subset(e3, n2, i2).valueOf();
  }, "Matrix, Index, any": function(t4, e3, r3) {
    return t4.clone().subset(e3, r3);
  }, "Matrix, Index, any, any": function(t4, e3, r3, n2) {
    return t4.clone().subset(e3, r3, n2);
  }, "string, Index, string": ha, "string, Index, string, string": ha, "Object, Index, any": la});
});
function ua(t3, e2) {
  if (!Pe(e2))
    throw new TypeError("Index expected");
  if (e2.size().length !== 1)
    throw new Wr(e2.size().length, 1);
  var r2 = t3.length;
  Jr(e2.min()[0], r2), Jr(e2.max()[0], r2);
  var n2 = e2.dimension(0), i2 = "";
  return n2.forEach(function(e3) {
    i2 += t3.charAt(e3);
  }), i2;
}
function ha(t3, e2, r2, n2) {
  if (!e2 || e2.isIndex !== true)
    throw new TypeError("Index expected");
  if (e2.size().length !== 1)
    throw new Wr(e2.size().length, 1);
  if (n2 !== void 0) {
    if (typeof n2 != "string" || n2.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    n2 = " ";
  var i2 = e2.dimension(0);
  if (i2.size()[0] !== r2.length)
    throw new Wr(i2.size()[0], r2.length);
  var s2 = t3.length;
  Jr(e2.min()[0]), Jr(e2.max()[0]);
  for (var a2 = [], o2 = 0; o2 < s2; o2++)
    a2[o2] = t3.charAt(o2);
  if (i2.forEach(function(t4, e3) {
    a2[t4] = r2.charAt(e3[0]);
  }), a2.length > s2)
    for (var u2 = s2 - 1, h = a2.length; u2 < h; u2++)
      a2[u2] || (a2[u2] = n2);
  return a2.join("");
}
function ca(t3, e2) {
  if (e2.size().length !== 1)
    throw new Wr(e2.size(), 1);
  var r2 = e2.dimension(0);
  if (typeof r2 != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  return ta(t3, r2);
}
function la(t3, e2, r2) {
  if (e2.size().length !== 1)
    throw new Wr(e2.size(), 1);
  var n2 = e2.dimension(0);
  if (typeof n2 != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var i2 = pr(t3);
  return ea(i2, n2, r2), i2;
}
var pa = cn("zeros", ["typed", "config", "matrix", "BigNumber"], (t3) => {
  var {typed: e2, config: r2, matrix: n2, BigNumber: i2} = t3;
  return e2("zeros", {"": function() {
    return r2.matrix === "Array" ? s2([]) : s2([], "default");
  }, "...number | BigNumber | string": function(t4) {
    if (typeof t4[t4.length - 1] == "string") {
      var e3 = t4.pop();
      return s2(t4, e3);
    }
    return r2.matrix === "Array" ? s2(t4) : s2(t4, "default");
  }, Array: s2, Matrix: function(t4) {
    var e3 = t4.storage();
    return s2(t4.valueOf(), e3);
  }, "Array | Matrix, string": function(t4, e3) {
    return s2(t4.valueOf(), e3);
  }});
  function s2(t4, e3) {
    var r3 = function(t5) {
      var e4 = false;
      return t5.forEach(function(t6, r4, n3) {
        Oe(t6) && (e4 = true, n3[r4] = t6.toNumber());
      }), e4;
    }(t4) ? new i2(0) : 0;
    if (function(t5) {
      t5.forEach(function(t6) {
        if (typeof t6 != "number" || !Ar(t6) || t6 < 0)
          throw new Error("Parameters in function zeros must be positive integers");
      });
    }(t4), e3) {
      var s3 = n2(e3);
      return t4.length > 0 ? s3.resize(t4, r3) : s3;
    }
    var a2 = [];
    return t4.length > 0 ? Kr(a2, t4, r3) : a2;
  }
}), fa = cn("format", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("format", {any: Hr, "any, Object | function | number": Hr});
}), da = cn("numeric", ["number", "?bignumber", "?fraction"], (t3) => {
  var {number: e2, bignumber: r2, fraction: n2} = t3, i2 = {string: true, number: true, BigNumber: true, Fraction: true}, s2 = {number: (t4) => e2(t4), BigNumber: r2 ? (t4) => r2(t4) : Xs, Fraction: n2 ? (t4) => n2(t4) : Qs};
  return function(t4, e3) {
    var r3 = lr(t4);
    if (!(r3 in i2))
      throw new TypeError("Cannot convert " + t4 + ' of type "' + r3 + '"; valid input types are ' + Object.keys(i2).join(", "));
    if (!(e3 in s2))
      throw new TypeError("Cannot convert " + t4 + ' to type "' + e3 + '"; valid output types are ' + Object.keys(s2).join(", "));
    return e3 === r3 ? t4 : s2[e3](t4);
  };
}), ma = cn("divideScalar", ["typed", "numeric"], (t3) => {
  var {typed: e2, numeric: r2} = t3;
  return e2("divideScalar", {"number, number": function(t4, e3) {
    return t4 / e3;
  }, "Complex, Complex": function(t4, e3) {
    return t4.div(e3);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.div(e3);
  }, "Fraction, Fraction": function(t4, e3) {
    return t4.div(e3);
  }, "Unit, number | Fraction | BigNumber": function(t4, e3) {
    var n2 = t4.clone(), i2 = r2(1, lr(e3));
    return n2.value = this(n2.value === null ? n2._normalize(i2) : n2.value, e3), n2;
  }, "number | Fraction | BigNumber, Unit": function(t4, e3) {
    var n2 = e3.clone();
    n2 = n2.pow(-1);
    var i2 = r2(1, lr(t4));
    return n2.value = this(t4, e3.value === null ? e3._normalize(i2) : e3.value), n2;
  }, "Unit, Unit": function(t4, e3) {
    return t4.divide(e3);
  }});
}), ya = cn("pow", ["typed", "config", "identity", "multiply", "matrix", "fraction", "number", "Complex"], (t3) => {
  var {typed: e2, config: r2, identity: n2, multiply: i2, matrix: s2, number: a2, fraction: o2, Complex: u2} = t3;
  return e2("pow", {"number, number": h, "Complex, Complex": function(t4, e3) {
    return t4.pow(e3);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return e3.isInteger() || t4 >= 0 || r2.predictable ? t4.pow(e3) : new u2(t4.toNumber(), 0).pow(e3.toNumber(), 0);
  }, "Fraction, Fraction": function(t4, e3) {
    if (e3.d !== 1) {
      if (r2.predictable)
        throw new Error("Function pow does not support non-integer exponents for fractions.");
      return h(t4.valueOf(), e3.valueOf());
    }
    return t4.pow(e3);
  }, "Array, number": c2, "Array, BigNumber": function(t4, e3) {
    return c2(t4, e3.toNumber());
  }, "Matrix, number": l2, "Matrix, BigNumber": function(t4, e3) {
    return l2(t4, e3.toNumber());
  }, "Unit, number | BigNumber": function(t4, e3) {
    return t4.pow(e3);
  }});
  function h(t4, e3) {
    if (r2.predictable && !Ar(e3) && t4 < 0)
      try {
        var n3 = o2(e3), i3 = a2(n3);
        if ((e3 === i3 || Math.abs((e3 - i3) / e3) < 1e-14) && n3.d % 2 == 1)
          return (n3.n % 2 == 0 ? 1 : -1) * Math.pow(-t4, e3);
      } catch (s3) {
      }
    return r2.predictable && (t4 < -1 && e3 === 1 / 0 || t4 > -1 && t4 < 0 && e3 === -1 / 0) ? NaN : Ar(e3) || t4 >= 0 || r2.predictable ? fs(t4, e3) : t4 * t4 < 1 && e3 === 1 / 0 || t4 * t4 > 1 && e3 === -1 / 0 ? 0 : new u2(t4, 0).pow(e3, 0);
  }
  function c2(t4, e3) {
    if (!Ar(e3) || e3 < 0)
      throw new TypeError("For A^b, b must be a positive integer (value is " + e3 + ")");
    var r3 = Zr(t4);
    if (r3.length !== 2)
      throw new Error("For A^b, A must be 2 dimensional (A has " + r3.length + " dimensions)");
    if (r3[0] !== r3[1])
      throw new Error("For A^b, A must be square (size is " + r3[0] + "x" + r3[1] + ")");
    for (var s3 = n2(r3[0]).valueOf(), a3 = t4; e3 >= 1; )
      (1 & e3) == 1 && (s3 = i2(a3, s3)), e3 >>= 1, a3 = i2(a3, a3);
    return s3;
  }
  function l2(t4, e3) {
    return s2(c2(t4.valueOf(), e3));
  }
});
function ga(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(t3);
    e2 && (n2 = n2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, n2);
  }
  return r2;
}
function va(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = arguments[e2] != null ? arguments[e2] : {};
    e2 % 2 ? ga(Object(r2), true).forEach(function(e3) {
      xa(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : ga(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
function xa(t3, e2, r2) {
  return e2 in t3 ? Object.defineProperty(t3, e2, {value: r2, enumerable: true, configurable: true, writable: true}) : t3[e2] = r2, t3;
}
var wa = "Number of decimals in function round must be an integer", ba = cn("round", ["typed", "matrix", "equalScalar", "zeros", "BigNumber", "DenseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, equalScalar: n2, zeros: i2, BigNumber: s2, DenseMatrix: a2} = t3, o2 = Ts({typed: e2, equalScalar: n2}), u2 = Ps({typed: e2, DenseMatrix: a2}), h = Os({typed: e2});
  return e2("round", va(va({}, _a), {}, {Complex: function(t4) {
    return t4.round();
  }, "Complex, number": function(t4, e3) {
    if (e3 % 1)
      throw new TypeError(wa);
    return t4.round(e3);
  }, "Complex, BigNumber": function(t4, e3) {
    if (!e3.isInteger())
      throw new TypeError(wa);
    var r3 = e3.toNumber();
    return t4.round(r3);
  }, "number, BigNumber": function(t4, e3) {
    if (!e3.isInteger())
      throw new TypeError(wa);
    return new s2(t4).toDecimalPlaces(e3.toNumber());
  }, BigNumber: function(t4) {
    return t4.toDecimalPlaces(0);
  }, "BigNumber, BigNumber": function(t4, e3) {
    if (!e3.isInteger())
      throw new TypeError(wa);
    return t4.toDecimalPlaces(e3.toNumber());
  }, Fraction: function(t4) {
    return t4.round();
  }, "Fraction, number": function(t4, e3) {
    if (e3 % 1)
      throw new TypeError(wa);
    return t4.round(e3);
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }, "SparseMatrix, number | BigNumber": function(t4, e3) {
    return o2(t4, e3, this, false);
  }, "DenseMatrix, number | BigNumber": function(t4, e3) {
    return h(t4, e3, this, false);
  }, "number | Complex | BigNumber, SparseMatrix": function(t4, e3) {
    return n2(t4, 0) ? i2(e3.size(), e3.storage()) : u2(e3, t4, this, true);
  }, "number | Complex | BigNumber, DenseMatrix": function(t4, e3) {
    return n2(t4, 0) ? i2(e3.size(), e3.storage()) : h(e3, t4, this, true);
  }, "Array, number | BigNumber": function(t4, e3) {
    return h(r2(t4), e3, this, false).valueOf();
  }, "number | Complex | BigNumber, Array": function(t4, e3) {
    return h(r2(e3), t4, this, true).valueOf();
  }}));
}), _a = {number: ds, "number, number": function(t3, e2) {
  if (!Ar(e2))
    throw new TypeError(wa);
  if (e2 < 0 || e2 > 15)
    throw new Error("Number of decimals in function round must be in te range of 0-15");
  return ds(t3, e2);
}}, Ma = cn("equal", ["typed", "matrix", "equalScalar", "DenseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, equalScalar: n2, DenseMatrix: i2} = t3, s2 = Bs({typed: e2}), a2 = $s({typed: e2, DenseMatrix: i2}), o2 = Ps({typed: e2, DenseMatrix: i2}), u2 = Is({typed: e2}), h = Os({typed: e2});
  return e2("equal", {"any, any": function(t4, e3) {
    return t4 === null ? e3 === null : e3 === null ? t4 === null : t4 === void 0 ? e3 === void 0 : e3 === void 0 ? t4 === void 0 : n2(t4, e3);
  }, "SparseMatrix, SparseMatrix": function(t4, e3) {
    return a2(t4, e3, n2);
  }, "SparseMatrix, DenseMatrix": function(t4, e3) {
    return s2(e3, t4, n2, true);
  }, "DenseMatrix, SparseMatrix": function(t4, e3) {
    return s2(t4, e3, n2, false);
  }, "DenseMatrix, DenseMatrix": function(t4, e3) {
    return u2(t4, e3, n2);
  }, "Array, Array": function(t4, e3) {
    return this(r2(t4), r2(e3)).valueOf();
  }, "Array, Matrix": function(t4, e3) {
    return this(r2(t4), e3);
  }, "Matrix, Array": function(t4, e3) {
    return this(t4, r2(e3));
  }, "SparseMatrix, any": function(t4, e3) {
    return o2(t4, e3, n2, false);
  }, "DenseMatrix, any": function(t4, e3) {
    return h(t4, e3, n2, false);
  }, "any, SparseMatrix": function(t4, e3) {
    return o2(e3, t4, n2, true);
  }, "any, DenseMatrix": function(t4, e3) {
    return h(e3, t4, n2, true);
  }, "Array, any": function(t4, e3) {
    return h(r2(t4), e3, n2, false).valueOf();
  }, "any, Array": function(t4, e3) {
    return h(r2(e3), t4, n2, true).valueOf();
  }});
});
cn("equal", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return e2("equal", {"any, any": function(t4, e3) {
    return t4 === null ? e3 === null : e3 === null ? t4 === null : t4 === void 0 ? e3 === void 0 : e3 === void 0 ? t4 === void 0 : r2(t4, e3);
  }});
});
var Ea = cn("smaller", ["typed", "config", "matrix", "DenseMatrix"], (t3) => {
  var {typed: e2, config: r2, matrix: n2, DenseMatrix: i2} = t3, s2 = Bs({typed: e2}), a2 = $s({typed: e2, DenseMatrix: i2}), o2 = Ps({typed: e2, DenseMatrix: i2}), u2 = Is({typed: e2}), h = Os({typed: e2});
  return e2("smaller", {"boolean, boolean": function(t4, e3) {
    return t4 < e3;
  }, "number, number": function(t4, e3) {
    return t4 < e3 && !Pr(t4, e3, r2.epsilon);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.lt(e3) && !ys(t4, e3, r2.epsilon);
  }, "Fraction, Fraction": function(t4, e3) {
    return t4.compare(e3) === -1;
  }, "Complex, Complex": function(t4, e3) {
    throw new TypeError("No ordering relation is defined for complex numbers");
  }, "Unit, Unit": function(t4, e3) {
    if (!t4.equalBase(e3))
      throw new Error("Cannot compare units with different base");
    return this(t4.value, e3.value);
  }, "SparseMatrix, SparseMatrix": function(t4, e3) {
    return a2(t4, e3, this);
  }, "SparseMatrix, DenseMatrix": function(t4, e3) {
    return s2(e3, t4, this, true);
  }, "DenseMatrix, SparseMatrix": function(t4, e3) {
    return s2(t4, e3, this, false);
  }, "DenseMatrix, DenseMatrix": function(t4, e3) {
    return u2(t4, e3, this);
  }, "Array, Array": function(t4, e3) {
    return this(n2(t4), n2(e3)).valueOf();
  }, "Array, Matrix": function(t4, e3) {
    return this(n2(t4), e3);
  }, "Matrix, Array": function(t4, e3) {
    return this(t4, n2(e3));
  }, "SparseMatrix, any": function(t4, e3) {
    return o2(t4, e3, this, false);
  }, "DenseMatrix, any": function(t4, e3) {
    return h(t4, e3, this, false);
  }, "any, SparseMatrix": function(t4, e3) {
    return o2(e3, t4, this, true);
  }, "any, DenseMatrix": function(t4, e3) {
    return h(e3, t4, this, true);
  }, "Array, any": function(t4, e3) {
    return h(n2(t4), e3, this, false).valueOf();
  }, "any, Array": function(t4, e3) {
    return h(n2(e3), t4, this, true).valueOf();
  }});
}), Na = cn("larger", ["typed", "config", "matrix", "DenseMatrix"], (t3) => {
  var {typed: e2, config: r2, matrix: n2, DenseMatrix: i2} = t3, s2 = Bs({typed: e2}), a2 = $s({typed: e2, DenseMatrix: i2}), o2 = Ps({typed: e2, DenseMatrix: i2}), u2 = Is({typed: e2}), h = Os({typed: e2});
  return e2("larger", {"boolean, boolean": function(t4, e3) {
    return t4 > e3;
  }, "number, number": function(t4, e3) {
    return t4 > e3 && !Pr(t4, e3, r2.epsilon);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.gt(e3) && !ys(t4, e3, r2.epsilon);
  }, "Fraction, Fraction": function(t4, e3) {
    return t4.compare(e3) === 1;
  }, "Complex, Complex": function() {
    throw new TypeError("No ordering relation is defined for complex numbers");
  }, "Unit, Unit": function(t4, e3) {
    if (!t4.equalBase(e3))
      throw new Error("Cannot compare units with different base");
    return this(t4.value, e3.value);
  }, "SparseMatrix, SparseMatrix": function(t4, e3) {
    return a2(t4, e3, this);
  }, "SparseMatrix, DenseMatrix": function(t4, e3) {
    return s2(e3, t4, this, true);
  }, "DenseMatrix, SparseMatrix": function(t4, e3) {
    return s2(t4, e3, this, false);
  }, "DenseMatrix, DenseMatrix": function(t4, e3) {
    return u2(t4, e3, this);
  }, "Array, Array": function(t4, e3) {
    return this(n2(t4), n2(e3)).valueOf();
  }, "Array, Matrix": function(t4, e3) {
    return this(n2(t4), e3);
  }, "Matrix, Array": function(t4, e3) {
    return this(t4, n2(e3));
  }, "SparseMatrix, any": function(t4, e3) {
    return o2(t4, e3, this, false);
  }, "DenseMatrix, any": function(t4, e3) {
    return h(t4, e3, this, false);
  }, "any, SparseMatrix": function(t4, e3) {
    return o2(e3, t4, this, true);
  }, "any, DenseMatrix": function(t4, e3) {
    return h(e3, t4, this, true);
  }, "Array, any": function(t4, e3) {
    return h(n2(t4), e3, this, false).valueOf();
  }, "any, Array": function(t4, e3) {
    return h(n2(e3), t4, this, true).valueOf();
  }});
}), Sa = cn("FibonacciHeap", ["smaller", "larger"], (t3) => {
  var {smaller: e2, larger: r2} = t3, n2 = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function i2() {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  function s2(t4, e3, r3) {
    e3.left.right = e3.right, e3.right.left = e3.left, r3.degree--, r3.child === e3 && (r3.child = e3.right), r3.degree === 0 && (r3.child = null), e3.left = t4, e3.right = t4.right, t4.right = e3, e3.right.left = e3, e3.parent = null, e3.mark = false;
  }
  function a2(t4, e3) {
    var r3 = e3.parent;
    r3 && (e3.mark ? (s2(t4, e3, r3), a2(r3)) : e3.mark = true);
  }
  i2.prototype.type = "FibonacciHeap", i2.prototype.isFibonacciHeap = true, i2.prototype.insert = function(t4, r3) {
    var n3 = {key: t4, value: r3, degree: 0};
    if (this._minimum) {
      var i3 = this._minimum;
      n3.left = i3, n3.right = i3.right, i3.right = n3, n3.right.left = n3, e2(t4, i3.key) && (this._minimum = n3);
    } else
      n3.left = n3, n3.right = n3, this._minimum = n3;
    return this._size++, n3;
  }, i2.prototype.size = function() {
    return this._size;
  }, i2.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, i2.prototype.isEmpty = function() {
    return this._size === 0;
  }, i2.prototype.extractMinimum = function() {
    var t4 = this._minimum;
    if (t4 === null)
      return t4;
    for (var i3 = this._minimum, s3 = t4.degree, a3 = t4.child; s3 > 0; ) {
      var u2 = a3.right;
      a3.left.right = a3.right, a3.right.left = a3.left, a3.left = i3, a3.right = i3.right, i3.right = a3, a3.right.left = a3, a3.parent = null, a3 = u2, s3--;
    }
    return t4.left.right = t4.right, t4.right.left = t4.left, i3 = t4 === t4.right ? null : function(t5, i4) {
      var s4, a4 = Math.floor(Math.log(i4) * n2) + 1, u3 = new Array(a4), h = 0, c2 = t5;
      if (c2)
        for (h++, c2 = c2.right; c2 !== t5; )
          h++, c2 = c2.right;
      for (; h > 0; ) {
        for (var l2 = c2.degree, p2 = c2.right; s4 = u3[l2]; ) {
          if (r2(c2.key, s4.key)) {
            var f2 = s4;
            s4 = c2, c2 = f2;
          }
          o2(s4, c2), u3[l2] = null, l2++;
        }
        u3[l2] = c2, c2 = p2, h--;
      }
      t5 = null;
      for (var d2 = 0; d2 < a4; d2++)
        (s4 = u3[d2]) && (t5 ? (s4.left.right = s4.right, s4.right.left = s4.left, s4.left = t5, s4.right = t5.right, t5.right = s4, s4.right.left = s4, e2(s4.key, t5.key) && (t5 = s4)) : t5 = s4);
      return t5;
    }(i3 = t4.right, this._size), this._size--, this._minimum = i3, t4;
  }, i2.prototype.remove = function(t4) {
    this._minimum = function(t5, r3, n3) {
      r3.key = n3;
      var i3 = r3.parent;
      i3 && e2(r3.key, i3.key) && (s2(t5, r3, i3), a2(t5, i3));
      e2(r3.key, t5.key) && (t5 = r3);
      return t5;
    }(this._minimum, t4, -1), this.extractMinimum();
  };
  var o2 = function(t4, e3) {
    t4.left.right = t4.right, t4.right.left = t4.left, t4.parent = e3, e3.child ? (t4.left = e3.child, t4.right = e3.child.right, e3.child.right = t4, t4.right.left = t4) : (e3.child = t4, t4.right = t4, t4.left = t4), e3.degree++, t4.mark = false;
  };
  return i2;
}, {isClass: true}), Ta = cn("Spa", ["addScalar", "equalScalar", "FibonacciHeap"], (t3) => {
  var {addScalar: e2, equalScalar: r2, FibonacciHeap: n2} = t3;
  function i2() {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new n2();
  }
  return i2.prototype.type = "Spa", i2.prototype.isSpa = true, i2.prototype.set = function(t4, e3) {
    if (this._values[t4])
      this._values[t4].value = e3;
    else {
      var r3 = this._heap.insert(t4, e3);
      this._values[t4] = r3;
    }
  }, i2.prototype.get = function(t4) {
    var e3 = this._values[t4];
    return e3 ? e3.value : 0;
  }, i2.prototype.accumulate = function(t4, r3) {
    var n3 = this._values[t4];
    n3 ? n3.value = e2(n3.value, r3) : (n3 = this._heap.insert(t4, r3), this._values[t4] = n3);
  }, i2.prototype.forEach = function(t4, e3, n3) {
    var i3 = this._heap, s2 = this._values, a2 = [], o2 = i3.extractMinimum();
    for (o2 && a2.push(o2); o2 && o2.key <= e3; )
      o2.key >= t4 && (r2(o2.value, 0) || n3(o2.key, o2.value, this)), (o2 = i3.extractMinimum()) && a2.push(o2);
    for (var u2 = 0; u2 < a2.length; u2++) {
      var h = a2[u2];
      s2[(o2 = i3.insert(h.key, h.value)).key] = o2;
    }
  }, i2.prototype.swap = function(t4, e3) {
    var r3 = this._values[t4], n3 = this._values[e3];
    if (!r3 && n3)
      r3 = this._heap.insert(t4, n3.value), this._heap.remove(n3), this._values[t4] = r3, this._values[e3] = void 0;
    else if (r3 && !n3)
      n3 = this._heap.insert(e3, r3.value), this._heap.remove(r3), this._values[e3] = n3, this._values[t4] = void 0;
    else if (r3 && n3) {
      var i3 = r3.value;
      r3.value = n3.value, n3.value = i3;
    }
  }, i2;
}, {isClass: true});
Ys(function(t3) {
  return new t3(1).exp();
}, {hasher: za}), Ys(function(t3) {
  return new t3(1).plus(new t3(5).sqrt()).div(2);
}, {hasher: za});
var Oa = Ys(function(t3) {
  return t3.acos(-1);
}, {hasher: za});
function za(t3) {
  return t3[0].precision;
}
function Aa() {
  return (Aa = Object.assign || function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2)
        Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
    }
    return t3;
  }).apply(this, arguments);
}
function Ca(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(t3);
    e2 && (n2 = n2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, n2);
  }
  return r2;
}
function Ra(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = arguments[e2] != null ? arguments[e2] : {};
    e2 % 2 ? Ca(Object(r2), true).forEach(function(e3) {
      Da(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : Ca(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
function Da(t3, e2, r2) {
  return e2 in t3 ? Object.defineProperty(t3, e2, {value: r2, enumerable: true, configurable: true, writable: true}) : t3[e2] = r2, t3;
}
Ys(function(t3) {
  return Oa(t3).times(2);
}, {hasher: za});
var ka = cn("Unit", ["?on", "config", "addScalar", "subtract", "multiplyScalar", "divideScalar", "pow", "abs", "fix", "round", "equal", "isNumeric", "format", "number", "Complex", "BigNumber", "Fraction"], (t3) => {
  var e2, r2, n2, {on: i2, config: s2, addScalar: a2, subtract: o2, multiplyScalar: u2, divideScalar: h, pow: c2, abs: l2, fix: p2, round: f2, equal: d2, isNumeric: m2, format: y2, number: g2, Complex: v, BigNumber: x, Fraction: w} = t3, b = g2;
  function _(t4, e3) {
    if (!(this instanceof _))
      throw new Error("Constructor must be called with the new operator");
    if (t4 != null && !m2(t4) && !ze(t4))
      throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");
    if (e3 !== void 0 && (typeof e3 != "string" || e3 === ""))
      throw new TypeError("Second parameter in Unit constructor must be a string");
    if (e3 !== void 0) {
      var r3 = _.parse(e3);
      this.units = r3.units, this.dimensions = r3.dimensions;
    } else {
      this.units = [{unit: L2, prefix: R2.NONE, power: 0}], this.dimensions = [];
      for (var n3 = 0; n3 < D2.length; n3++)
        this.dimensions[n3] = 0;
    }
    this.value = t4 != null ? this._normalize(t4) : null, this.fixPrefix = false, this.skipAutomaticSimplification = true;
  }
  function M() {
    for (; n2 === " " || n2 === "	"; )
      N();
  }
  function E(t4) {
    return t4 >= "0" && t4 <= "9";
  }
  function N() {
    r2++, n2 = e2.charAt(r2);
  }
  function S(t4) {
    r2 = t4, n2 = e2.charAt(r2);
  }
  function T() {
    var t4, e3 = "", i3 = r2;
    if (n2 === "+" ? N() : n2 === "-" && (e3 += n2, N()), !((t4 = n2) >= "0" && t4 <= "9" || t4 === "."))
      return S(i3), null;
    if (n2 === ".") {
      if (e3 += n2, N(), !E(n2))
        return S(i3), null;
    } else {
      for (; E(n2); )
        e3 += n2, N();
      n2 === "." && (e3 += n2, N());
    }
    for (; E(n2); )
      e3 += n2, N();
    if (n2 === "E" || n2 === "e") {
      var s3 = "", a3 = r2;
      if (s3 += n2, N(), n2 !== "+" && n2 !== "-" || (s3 += n2, N()), !E(n2))
        return S(a3), e3;
      for (e3 += s3; E(n2); )
        e3 += n2, N();
    }
    return e3;
  }
  function O2() {
    for (var t4 = ""; E(n2) || _.isValidAlpha(n2); )
      t4 += n2, N();
    var e3 = t4.charAt(0);
    return _.isValidAlpha(e3) ? t4 : null;
  }
  function z2(t4) {
    return n2 === t4 ? (N(), t4) : null;
  }
  _.prototype.type = "Unit", _.prototype.isUnit = true, _.parse = function(t4, i3) {
    if (i3 = i3 || {}, r2 = -1, n2 = "", typeof (e2 = t4) != "string")
      throw new TypeError("Invalid argument in Unit.parse, string expected");
    var a3 = new _();
    a3.units = [];
    var o3 = 1, u3 = false;
    N(), M();
    var h2 = T(), c3 = null;
    if (h2) {
      if (s2.number === "BigNumber")
        c3 = new x(h2);
      else if (s2.number === "Fraction")
        try {
          c3 = new w(h2);
        } catch (E2) {
          c3 = parseFloat(h2);
        }
      else
        c3 = parseFloat(h2);
      M(), z2("*") ? (o3 = 1, u3 = true) : z2("/") && (o3 = -1, u3 = true);
    }
    for (var l3 = [], p3 = 1; ; ) {
      for (M(); n2 === "("; )
        l3.push(o3), p3 *= o3, o3 = 1, N(), M();
      var f3 = void 0;
      if (!n2)
        break;
      var d3 = n2;
      if ((f3 = O2()) === null)
        throw new SyntaxError('Unexpected "' + d3 + '" in "' + e2 + '" at index ' + r2.toString());
      var m3 = A2(f3);
      if (m3 === null)
        throw new SyntaxError('Unit "' + f3 + '" not found.');
      var y3 = o3 * p3;
      if (M(), z2("^")) {
        M();
        var g3 = T();
        if (g3 === null)
          throw new SyntaxError('In "' + t4 + '", "^" must be followed by a floating-point number');
        y3 *= g3;
      }
      a3.units.push({unit: m3.unit, prefix: m3.prefix, power: y3});
      for (var v2 = 0; v2 < D2.length; v2++)
        a3.dimensions[v2] += (m3.unit.dimensions[v2] || 0) * y3;
      for (M(); n2 === ")"; ) {
        if (l3.length === 0)
          throw new SyntaxError('Unmatched ")" in "' + e2 + '" at index ' + r2.toString());
        p3 /= l3.pop(), N(), M();
      }
      if (u3 = false, z2("*") ? (o3 = 1, u3 = true) : z2("/") ? (o3 = -1, u3 = true) : o3 = 1, m3.unit.base) {
        var b2 = m3.unit.base.key;
        U2.auto[b2] = {unit: m3.unit, prefix: m3.prefix};
      }
    }
    if (M(), n2)
      throw new SyntaxError('Could not parse: "' + t4 + '"');
    if (u3)
      throw new SyntaxError('Trailing characters: "' + t4 + '"');
    if (l3.length !== 0)
      throw new SyntaxError('Unmatched "(" in "' + e2 + '"');
    if (a3.units.length === 0 && !i3.allowNoUnits)
      throw new SyntaxError('"' + t4 + '" contains no units');
    return a3.value = c3 !== void 0 ? a3._normalize(c3) : null, a3;
  }, _.prototype.clone = function() {
    var t4 = new _();
    t4.fixPrefix = this.fixPrefix, t4.skipAutomaticSimplification = this.skipAutomaticSimplification, t4.value = pr(this.value), t4.dimensions = this.dimensions.slice(0), t4.units = [];
    for (var e3 = 0; e3 < this.units.length; e3++)
      for (var r3 in t4.units[e3] = {}, this.units[e3])
        wr(this.units[e3], r3) && (t4.units[e3][r3] = this.units[e3][r3]);
    return t4;
  }, _.prototype._isDerived = function() {
    return this.units.length !== 0 && (this.units.length > 1 || Math.abs(this.units[0].power - 1) > 1e-15);
  }, _.prototype._normalize = function(t4) {
    var e3, r3, n3, i3, s3;
    if (t4 == null || this.units.length === 0)
      return t4;
    if (this._isDerived()) {
      var o3 = t4;
      s3 = _._getNumberConverter(lr(t4));
      for (var h2 = 0; h2 < this.units.length; h2++)
        e3 = s3(this.units[h2].unit.value), i3 = s3(this.units[h2].prefix.value), n3 = s3(this.units[h2].power), o3 = u2(o3, c2(u2(e3, i3), n3));
      return o3;
    }
    return e3 = (s3 = _._getNumberConverter(lr(t4)))(this.units[0].unit.value), r3 = s3(this.units[0].unit.offset), i3 = s3(this.units[0].prefix.value), u2(a2(t4, r3), u2(e3, i3));
  }, _.prototype._denormalize = function(t4, e3) {
    var r3, n3, i3, s3, a3;
    if (t4 == null || this.units.length === 0)
      return t4;
    if (this._isDerived()) {
      var l3 = t4;
      a3 = _._getNumberConverter(lr(t4));
      for (var p3 = 0; p3 < this.units.length; p3++)
        r3 = a3(this.units[p3].unit.value), s3 = a3(this.units[p3].prefix.value), i3 = a3(this.units[p3].power), l3 = h(l3, c2(u2(r3, s3), i3));
      return l3;
    }
    return r3 = (a3 = _._getNumberConverter(lr(t4)))(this.units[0].unit.value), s3 = a3(this.units[0].prefix.value), n3 = a3(this.units[0].unit.offset), o2(h(h(t4, r3), e3 == null ? s3 : e3), n3);
  };
  var A2 = Ys((t4) => {
    if (wr(B2, t4)) {
      var e3 = B2[t4];
      return {unit: e3, prefix: e3.prefixes[""]};
    }
    for (var r3 in B2)
      if (wr(B2, r3) && qr(t4, r3)) {
        var n3 = B2[r3], i3 = t4.length - r3.length, s3 = t4.substring(0, i3), a3 = wr(n3.prefixes, s3) ? n3.prefixes[s3] : void 0;
        if (a3 !== void 0)
          return {unit: n3, prefix: a3};
      }
    return null;
  }, {hasher: (t4) => t4[0], limit: 100});
  function C2(t4) {
    return t4.equalBase(k2.NONE) && t4.value !== null && !s2.predictable ? t4.value : t4;
  }
  _.isValuelessUnit = function(t4) {
    return A2(t4) !== null;
  }, _.prototype.hasBase = function(t4) {
    if (typeof t4 == "string" && (t4 = k2[t4]), !t4)
      return false;
    for (var e3 = 0; e3 < D2.length; e3++)
      if (Math.abs((this.dimensions[e3] || 0) - (t4.dimensions[e3] || 0)) > 1e-12)
        return false;
    return true;
  }, _.prototype.equalBase = function(t4) {
    for (var e3 = 0; e3 < D2.length; e3++)
      if (Math.abs((this.dimensions[e3] || 0) - (t4.dimensions[e3] || 0)) > 1e-12)
        return false;
    return true;
  }, _.prototype.equals = function(t4) {
    return this.equalBase(t4) && d2(this.value, t4.value);
  }, _.prototype.multiply = function(t4) {
    for (var e3 = this.clone(), r3 = 0; r3 < D2.length; r3++)
      e3.dimensions[r3] = (this.dimensions[r3] || 0) + (t4.dimensions[r3] || 0);
    for (var n3 = 0; n3 < t4.units.length; n3++) {
      var i3 = Ra({}, t4.units[n3]);
      e3.units.push(i3);
    }
    if (this.value !== null || t4.value !== null) {
      var s3 = this.value === null ? this._normalize(1) : this.value, a3 = t4.value === null ? t4._normalize(1) : t4.value;
      e3.value = u2(s3, a3);
    } else
      e3.value = null;
    return e3.skipAutomaticSimplification = false, C2(e3);
  }, _.prototype.divide = function(t4) {
    for (var e3 = this.clone(), r3 = 0; r3 < D2.length; r3++)
      e3.dimensions[r3] = (this.dimensions[r3] || 0) - (t4.dimensions[r3] || 0);
    for (var n3 = 0; n3 < t4.units.length; n3++) {
      var i3 = Ra(Ra({}, t4.units[n3]), {}, {power: -t4.units[n3].power});
      e3.units.push(i3);
    }
    if (this.value !== null || t4.value !== null) {
      var s3 = this.value === null ? this._normalize(1) : this.value, a3 = t4.value === null ? t4._normalize(1) : t4.value;
      e3.value = h(s3, a3);
    } else
      e3.value = null;
    return e3.skipAutomaticSimplification = false, C2(e3);
  }, _.prototype.pow = function(t4) {
    for (var e3 = this.clone(), r3 = 0; r3 < D2.length; r3++)
      e3.dimensions[r3] = (this.dimensions[r3] || 0) * t4;
    for (var n3 = 0; n3 < e3.units.length; n3++)
      e3.units[n3].power *= t4;
    return e3.value !== null ? e3.value = c2(e3.value, t4) : e3.value = null, e3.skipAutomaticSimplification = false, C2(e3);
  }, _.prototype.abs = function() {
    var t4 = this.clone();
    for (var e3 in t4.value = t4.value !== null ? l2(t4.value) : null, t4.units)
      t4.units[e3].unit.name !== "VA" && t4.units[e3].unit.name !== "VAR" || (t4.units[e3].unit = B2.W);
    return t4;
  }, _.prototype.to = function(t4) {
    var e3, r3 = this.value === null ? this._normalize(1) : this.value;
    if (typeof t4 == "string") {
      if (e3 = _.parse(t4), !this.equalBase(e3))
        throw new Error("Units do not match ('".concat(e3.toString(), "' != '").concat(this.toString(), "')"));
      if (e3.value !== null)
        throw new Error("Cannot convert to a unit with a value");
      return e3.value = pr(r3), e3.fixPrefix = true, e3.skipAutomaticSimplification = true, e3;
    }
    if (Ce(t4)) {
      if (!this.equalBase(t4))
        throw new Error("Units do not match ('".concat(t4.toString(), "' != '").concat(this.toString(), "')"));
      if (t4.value !== null)
        throw new Error("Cannot convert to a unit with a value");
      return (e3 = t4.clone()).value = pr(r3), e3.fixPrefix = true, e3.skipAutomaticSimplification = true, e3;
    }
    throw new Error("String or Unit expected as parameter");
  }, _.prototype.toNumber = function(t4) {
    return b(this.toNumeric(t4));
  }, _.prototype.toNumeric = function(t4) {
    var e3;
    return (e3 = t4 ? this.to(t4) : this.clone())._isDerived() || e3.units.length === 0 ? e3._denormalize(e3.value) : e3._denormalize(e3.value, e3.units[0].prefix.value);
  }, _.prototype.toString = function() {
    return this.format();
  }, _.prototype.toJSON = function() {
    return {mathjs: "Unit", value: this._denormalize(this.value), unit: this.formatUnits(), fixPrefix: this.fixPrefix};
  }, _.fromJSON = function(t4) {
    var e3 = new _(t4.value, t4.unit);
    return e3.fixPrefix = t4.fixPrefix || false, e3;
  }, _.prototype.valueOf = _.prototype.toString, _.prototype.simplify = function() {
    var t4, e3, r3 = this.clone(), n3 = [];
    for (var i3 in j2)
      if (wr(j2, i3) && r3.hasBase(k2[i3])) {
        t4 = i3;
        break;
      }
    if (t4 === "NONE")
      r3.units = [];
    else if (t4 && wr(j2, t4) && (e3 = j2[t4]), e3)
      r3.units = [{unit: e3.unit, prefix: e3.prefix, power: 1}];
    else {
      for (var s3 = false, a3 = 0; a3 < D2.length; a3++) {
        var o3 = D2[a3];
        Math.abs(r3.dimensions[a3] || 0) > 1e-12 && (wr(j2, o3) ? n3.push({unit: j2[o3].unit, prefix: j2[o3].prefix, power: r3.dimensions[a3] || 0}) : s3 = true);
      }
      n3.length < r3.units.length && !s3 && (r3.units = n3);
    }
    return r3;
  }, _.prototype.toSI = function() {
    for (var t4 = this.clone(), e3 = [], r3 = 0; r3 < D2.length; r3++) {
      var n3 = D2[r3];
      if (Math.abs(t4.dimensions[r3] || 0) > 1e-12) {
        if (!wr(U2.si, n3))
          throw new Error("Cannot express custom unit " + n3 + " in SI units");
        e3.push({unit: U2.si[n3].unit, prefix: U2.si[n3].prefix, power: t4.dimensions[r3] || 0});
      }
    }
    return t4.units = e3, t4.fixPrefix = true, t4.skipAutomaticSimplification = true, t4;
  }, _.prototype.formatUnits = function() {
    for (var t4 = "", e3 = "", r3 = 0, n3 = 0, i3 = 0; i3 < this.units.length; i3++)
      this.units[i3].power > 0 ? (r3++, t4 += " " + this.units[i3].prefix.name + this.units[i3].unit.name, Math.abs(this.units[i3].power - 1) > 1e-15 && (t4 += "^" + this.units[i3].power)) : this.units[i3].power < 0 && n3++;
    if (n3 > 0)
      for (var s3 = 0; s3 < this.units.length; s3++)
        this.units[s3].power < 0 && (r3 > 0 ? (e3 += " " + this.units[s3].prefix.name + this.units[s3].unit.name, Math.abs(this.units[s3].power + 1) > 1e-15 && (e3 += "^" + -this.units[s3].power)) : (e3 += " " + this.units[s3].prefix.name + this.units[s3].unit.name, e3 += "^" + this.units[s3].power));
    t4 = t4.substr(1), e3 = e3.substr(1), r3 > 1 && n3 > 0 && (t4 = "(" + t4 + ")"), n3 > 1 && r3 > 0 && (e3 = "(" + e3 + ")");
    var a3 = t4;
    return r3 > 0 && n3 > 0 && (a3 += " / "), a3 += e3;
  }, _.prototype.format = function(t4) {
    var e3 = this.skipAutomaticSimplification || this.value === null ? this.clone() : this.simplify(), r3 = false;
    for (var n3 in e3.value !== void 0 && e3.value !== null && ze(e3.value) && (r3 = Math.abs(e3.value.re) < 1e-14), e3.units)
      wr(e3.units, n3) && e3.units[n3].unit && (e3.units[n3].unit.name === "VA" && r3 ? e3.units[n3].unit = B2.VAR : e3.units[n3].unit.name !== "VAR" || r3 || (e3.units[n3].unit = B2.VA));
    e3.units.length !== 1 || e3.fixPrefix || Math.abs(e3.units[0].power - Math.round(e3.units[0].power)) < 1e-14 && (e3.units[0].prefix = e3._bestPrefix());
    var i3 = e3._denormalize(e3.value), s3 = e3.value !== null ? y2(i3, t4 || {}) : "", a3 = e3.formatUnits();
    return e3.value && ze(e3.value) && (s3 = "(" + s3 + ")"), a3.length > 0 && s3.length > 0 && (s3 += " "), s3 += a3;
  }, _.prototype._bestPrefix = function() {
    if (this.units.length !== 1)
      throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
    if (Math.abs(this.units[0].power - Math.round(this.units[0].power)) >= 1e-14)
      throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
    var t4 = this.value !== null ? l2(this.value) : 0, e3 = l2(this.units[0].unit.value), r3 = this.units[0].prefix;
    if (t4 === 0)
      return r3;
    var n3 = this.units[0].power, i3 = Math.log(t4 / Math.pow(r3.value * e3, n3)) / Math.LN10 - 1.2;
    if (i3 > -2.200001 && i3 < 1.800001)
      return r3;
    i3 = Math.abs(i3);
    var s3 = this.units[0].unit.prefixes;
    for (var a3 in s3)
      if (wr(s3, a3)) {
        var o3 = s3[a3];
        if (o3.scientific) {
          var u3 = Math.abs(Math.log(t4 / Math.pow(o3.value * e3, n3)) / Math.LN10 - 1.2);
          (u3 < i3 || u3 === i3 && o3.name.length < r3.name.length) && (r3 = o3, i3 = u3);
        }
      }
    return r3;
  }, _.prototype.splitUnit = function(t4) {
    for (var e3 = this.clone(), r3 = [], n3 = 0; n3 < t4.length && (e3 = e3.to(t4[n3]), n3 !== t4.length - 1); n3++) {
      var i3 = e3.toNumeric(), s3 = f2(i3), u3 = new _(d2(s3, i3) ? s3 : p2(e3.toNumeric()), t4[n3].toString());
      r3.push(u3), e3 = o2(e3, u3);
    }
    for (var h2 = 0, c3 = 0; c3 < r3.length; c3++)
      h2 = a2(h2, r3[c3].value);
    return d2(h2, this.value) && (e3.value = 0), r3.push(e3), r3;
  };
  var R2 = {NONE: {"": {name: "", value: 1, scientific: true}}, SHORT: {"": {name: "", value: 1, scientific: true}, da: {name: "da", value: 10, scientific: false}, h: {name: "h", value: 100, scientific: false}, k: {name: "k", value: 1e3, scientific: true}, M: {name: "M", value: 1e6, scientific: true}, G: {name: "G", value: 1e9, scientific: true}, T: {name: "T", value: 1e12, scientific: true}, P: {name: "P", value: 1e15, scientific: true}, E: {name: "E", value: 1e18, scientific: true}, Z: {name: "Z", value: 1e21, scientific: true}, Y: {name: "Y", value: 1e24, scientific: true}, d: {name: "d", value: 0.1, scientific: false}, c: {name: "c", value: 0.01, scientific: false}, m: {name: "m", value: 1e-3, scientific: true}, u: {name: "u", value: 1e-6, scientific: true}, n: {name: "n", value: 1e-9, scientific: true}, p: {name: "p", value: 1e-12, scientific: true}, f: {name: "f", value: 1e-15, scientific: true}, a: {name: "a", value: 1e-18, scientific: true}, z: {name: "z", value: 1e-21, scientific: true}, y: {name: "y", value: 1e-24, scientific: true}}, LONG: {"": {name: "", value: 1, scientific: true}, deca: {name: "deca", value: 10, scientific: false}, hecto: {name: "hecto", value: 100, scientific: false}, kilo: {name: "kilo", value: 1e3, scientific: true}, mega: {name: "mega", value: 1e6, scientific: true}, giga: {name: "giga", value: 1e9, scientific: true}, tera: {name: "tera", value: 1e12, scientific: true}, peta: {name: "peta", value: 1e15, scientific: true}, exa: {name: "exa", value: 1e18, scientific: true}, zetta: {name: "zetta", value: 1e21, scientific: true}, yotta: {name: "yotta", value: 1e24, scientific: true}, deci: {name: "deci", value: 0.1, scientific: false}, centi: {name: "centi", value: 0.01, scientific: false}, milli: {name: "milli", value: 1e-3, scientific: true}, micro: {name: "micro", value: 1e-6, scientific: true}, nano: {name: "nano", value: 1e-9, scientific: true}, pico: {name: "pico", value: 1e-12, scientific: true}, femto: {name: "femto", value: 1e-15, scientific: true}, atto: {name: "atto", value: 1e-18, scientific: true}, zepto: {name: "zepto", value: 1e-21, scientific: true}, yocto: {name: "yocto", value: 1e-24, scientific: true}}, SQUARED: {"": {name: "", value: 1, scientific: true}, da: {name: "da", value: 100, scientific: false}, h: {name: "h", value: 1e4, scientific: false}, k: {name: "k", value: 1e6, scientific: true}, M: {name: "M", value: 1e12, scientific: true}, G: {name: "G", value: 1e18, scientific: true}, T: {name: "T", value: 1e24, scientific: true}, P: {name: "P", value: 1e30, scientific: true}, E: {name: "E", value: 1e36, scientific: true}, Z: {name: "Z", value: 1e42, scientific: true}, Y: {name: "Y", value: 1e48, scientific: true}, d: {name: "d", value: 0.01, scientific: false}, c: {name: "c", value: 1e-4, scientific: false}, m: {name: "m", value: 1e-6, scientific: true}, u: {name: "u", value: 1e-12, scientific: true}, n: {name: "n", value: 1e-18, scientific: true}, p: {name: "p", value: 1e-24, scientific: true}, f: {name: "f", value: 1e-30, scientific: true}, a: {name: "a", value: 1e-36, scientific: true}, z: {name: "z", value: 1e-42, scientific: true}, y: {name: "y", value: 1e-48, scientific: true}}, CUBIC: {"": {name: "", value: 1, scientific: true}, da: {name: "da", value: 1e3, scientific: false}, h: {name: "h", value: 1e6, scientific: false}, k: {name: "k", value: 1e9, scientific: true}, M: {name: "M", value: 1e18, scientific: true}, G: {name: "G", value: 1e27, scientific: true}, T: {name: "T", value: 1e36, scientific: true}, P: {name: "P", value: 1e45, scientific: true}, E: {name: "E", value: 1e54, scientific: true}, Z: {name: "Z", value: 1e63, scientific: true}, Y: {name: "Y", value: 1e72, scientific: true}, d: {name: "d", value: 1e-3, scientific: false}, c: {name: "c", value: 1e-6, scientific: false}, m: {name: "m", value: 1e-9, scientific: true}, u: {name: "u", value: 1e-18, scientific: true}, n: {name: "n", value: 1e-27, scientific: true}, p: {name: "p", value: 1e-36, scientific: true}, f: {name: "f", value: 1e-45, scientific: true}, a: {name: "a", value: 1e-54, scientific: true}, z: {name: "z", value: 1e-63, scientific: true}, y: {name: "y", value: 1e-72, scientific: true}}, BINARY_SHORT_SI: {"": {name: "", value: 1, scientific: true}, k: {name: "k", value: 1e3, scientific: true}, M: {name: "M", value: 1e6, scientific: true}, G: {name: "G", value: 1e9, scientific: true}, T: {name: "T", value: 1e12, scientific: true}, P: {name: "P", value: 1e15, scientific: true}, E: {name: "E", value: 1e18, scientific: true}, Z: {name: "Z", value: 1e21, scientific: true}, Y: {name: "Y", value: 1e24, scientific: true}}, BINARY_SHORT_IEC: {"": {name: "", value: 1, scientific: true}, Ki: {name: "Ki", value: 1024, scientific: true}, Mi: {name: "Mi", value: Math.pow(1024, 2), scientific: true}, Gi: {name: "Gi", value: Math.pow(1024, 3), scientific: true}, Ti: {name: "Ti", value: Math.pow(1024, 4), scientific: true}, Pi: {name: "Pi", value: Math.pow(1024, 5), scientific: true}, Ei: {name: "Ei", value: Math.pow(1024, 6), scientific: true}, Zi: {name: "Zi", value: Math.pow(1024, 7), scientific: true}, Yi: {name: "Yi", value: Math.pow(1024, 8), scientific: true}}, BINARY_LONG_SI: {"": {name: "", value: 1, scientific: true}, kilo: {name: "kilo", value: 1e3, scientific: true}, mega: {name: "mega", value: 1e6, scientific: true}, giga: {name: "giga", value: 1e9, scientific: true}, tera: {name: "tera", value: 1e12, scientific: true}, peta: {name: "peta", value: 1e15, scientific: true}, exa: {name: "exa", value: 1e18, scientific: true}, zetta: {name: "zetta", value: 1e21, scientific: true}, yotta: {name: "yotta", value: 1e24, scientific: true}}, BINARY_LONG_IEC: {"": {name: "", value: 1, scientific: true}, kibi: {name: "kibi", value: 1024, scientific: true}, mebi: {name: "mebi", value: Math.pow(1024, 2), scientific: true}, gibi: {name: "gibi", value: Math.pow(1024, 3), scientific: true}, tebi: {name: "tebi", value: Math.pow(1024, 4), scientific: true}, pebi: {name: "pebi", value: Math.pow(1024, 5), scientific: true}, exi: {name: "exi", value: Math.pow(1024, 6), scientific: true}, zebi: {name: "zebi", value: Math.pow(1024, 7), scientific: true}, yobi: {name: "yobi", value: Math.pow(1024, 8), scientific: true}}, BTU: {"": {name: "", value: 1, scientific: true}, MM: {name: "MM", value: 1e6, scientific: true}}};
  R2.SHORTLONG = Aa({}, R2.SHORT, R2.LONG), R2.BINARY_SHORT = Aa({}, R2.BINARY_SHORT_SI, R2.BINARY_SHORT_IEC), R2.BINARY_LONG = Aa({}, R2.BINARY_LONG_SI, R2.BINARY_LONG_IEC);
  var D2 = ["MASS", "LENGTH", "TIME", "CURRENT", "TEMPERATURE", "LUMINOUS_INTENSITY", "AMOUNT_OF_SUBSTANCE", "ANGLE", "BIT"], k2 = {NONE: {dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0]}, MASS: {dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0]}, LENGTH: {dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0]}, TIME: {dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0]}, CURRENT: {dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0]}, TEMPERATURE: {dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0]}, LUMINOUS_INTENSITY: {dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0]}, AMOUNT_OF_SUBSTANCE: {dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0]}, FORCE: {dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0]}, SURFACE: {dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0]}, VOLUME: {dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0]}, ENERGY: {dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0]}, POWER: {dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0]}, PRESSURE: {dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0]}, ELECTRIC_CHARGE: {dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0]}, ELECTRIC_CAPACITANCE: {dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0]}, ELECTRIC_POTENTIAL: {dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0]}, ELECTRIC_RESISTANCE: {dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0]}, ELECTRIC_INDUCTANCE: {dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0]}, ELECTRIC_CONDUCTANCE: {dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0]}, MAGNETIC_FLUX: {dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0]}, MAGNETIC_FLUX_DENSITY: {dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0]}, FREQUENCY: {dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0]}, ANGLE: {dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0]}, BIT: {dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1]}};
  for (var I2 in k2)
    wr(k2, I2) && (k2[I2].key = I2);
  var L2 = {name: "", base: {}, value: 1, offset: 0, dimensions: D2.map((t4) => 0)}, B2 = {meter: {name: "meter", base: k2.LENGTH, prefixes: R2.LONG, value: 1, offset: 0}, inch: {name: "inch", base: k2.LENGTH, prefixes: R2.NONE, value: 0.0254, offset: 0}, foot: {name: "foot", base: k2.LENGTH, prefixes: R2.NONE, value: 0.3048, offset: 0}, yard: {name: "yard", base: k2.LENGTH, prefixes: R2.NONE, value: 0.9144, offset: 0}, mile: {name: "mile", base: k2.LENGTH, prefixes: R2.NONE, value: 1609.344, offset: 0}, link: {name: "link", base: k2.LENGTH, prefixes: R2.NONE, value: 0.201168, offset: 0}, rod: {name: "rod", base: k2.LENGTH, prefixes: R2.NONE, value: 5.0292, offset: 0}, chain: {name: "chain", base: k2.LENGTH, prefixes: R2.NONE, value: 20.1168, offset: 0}, angstrom: {name: "angstrom", base: k2.LENGTH, prefixes: R2.NONE, value: 1e-10, offset: 0}, m: {name: "m", base: k2.LENGTH, prefixes: R2.SHORT, value: 1, offset: 0}, in: {name: "in", base: k2.LENGTH, prefixes: R2.NONE, value: 0.0254, offset: 0}, ft: {name: "ft", base: k2.LENGTH, prefixes: R2.NONE, value: 0.3048, offset: 0}, yd: {name: "yd", base: k2.LENGTH, prefixes: R2.NONE, value: 0.9144, offset: 0}, mi: {name: "mi", base: k2.LENGTH, prefixes: R2.NONE, value: 1609.344, offset: 0}, li: {name: "li", base: k2.LENGTH, prefixes: R2.NONE, value: 0.201168, offset: 0}, rd: {name: "rd", base: k2.LENGTH, prefixes: R2.NONE, value: 5.02921, offset: 0}, ch: {name: "ch", base: k2.LENGTH, prefixes: R2.NONE, value: 20.1168, offset: 0}, mil: {name: "mil", base: k2.LENGTH, prefixes: R2.NONE, value: 254e-7, offset: 0}, m2: {name: "m2", base: k2.SURFACE, prefixes: R2.SQUARED, value: 1, offset: 0}, sqin: {name: "sqin", base: k2.SURFACE, prefixes: R2.NONE, value: 64516e-8, offset: 0}, sqft: {name: "sqft", base: k2.SURFACE, prefixes: R2.NONE, value: 0.09290304, offset: 0}, sqyd: {name: "sqyd", base: k2.SURFACE, prefixes: R2.NONE, value: 0.83612736, offset: 0}, sqmi: {name: "sqmi", base: k2.SURFACE, prefixes: R2.NONE, value: 2589988110336e-6, offset: 0}, sqrd: {name: "sqrd", base: k2.SURFACE, prefixes: R2.NONE, value: 25.29295, offset: 0}, sqch: {name: "sqch", base: k2.SURFACE, prefixes: R2.NONE, value: 404.6873, offset: 0}, sqmil: {name: "sqmil", base: k2.SURFACE, prefixes: R2.NONE, value: 64516e-14, offset: 0}, acre: {name: "acre", base: k2.SURFACE, prefixes: R2.NONE, value: 4046.86, offset: 0}, hectare: {name: "hectare", base: k2.SURFACE, prefixes: R2.NONE, value: 1e4, offset: 0}, m3: {name: "m3", base: k2.VOLUME, prefixes: R2.CUBIC, value: 1, offset: 0}, L: {name: "L", base: k2.VOLUME, prefixes: R2.SHORT, value: 1e-3, offset: 0}, l: {name: "l", base: k2.VOLUME, prefixes: R2.SHORT, value: 1e-3, offset: 0}, litre: {name: "litre", base: k2.VOLUME, prefixes: R2.LONG, value: 1e-3, offset: 0}, cuin: {name: "cuin", base: k2.VOLUME, prefixes: R2.NONE, value: 16387064e-12, offset: 0}, cuft: {name: "cuft", base: k2.VOLUME, prefixes: R2.NONE, value: 0.028316846592, offset: 0}, cuyd: {name: "cuyd", base: k2.VOLUME, prefixes: R2.NONE, value: 0.764554857984, offset: 0}, teaspoon: {name: "teaspoon", base: k2.VOLUME, prefixes: R2.NONE, value: 5e-6, offset: 0}, tablespoon: {name: "tablespoon", base: k2.VOLUME, prefixes: R2.NONE, value: 15e-6, offset: 0}, drop: {name: "drop", base: k2.VOLUME, prefixes: R2.NONE, value: 5e-8, offset: 0}, gtt: {name: "gtt", base: k2.VOLUME, prefixes: R2.NONE, value: 5e-8, offset: 0}, minim: {name: "minim", base: k2.VOLUME, prefixes: R2.NONE, value: 6161152e-14, offset: 0}, fluiddram: {name: "fluiddram", base: k2.VOLUME, prefixes: R2.NONE, value: 36966911e-13, offset: 0}, fluidounce: {name: "fluidounce", base: k2.VOLUME, prefixes: R2.NONE, value: 2957353e-11, offset: 0}, gill: {name: "gill", base: k2.VOLUME, prefixes: R2.NONE, value: 1182941e-10, offset: 0}, cc: {name: "cc", base: k2.VOLUME, prefixes: R2.NONE, value: 1e-6, offset: 0}, cup: {name: "cup", base: k2.VOLUME, prefixes: R2.NONE, value: 2365882e-10, offset: 0}, pint: {name: "pint", base: k2.VOLUME, prefixes: R2.NONE, value: 4731765e-10, offset: 0}, quart: {name: "quart", base: k2.VOLUME, prefixes: R2.NONE, value: 9463529e-10, offset: 0}, gallon: {name: "gallon", base: k2.VOLUME, prefixes: R2.NONE, value: 3785412e-9, offset: 0}, beerbarrel: {name: "beerbarrel", base: k2.VOLUME, prefixes: R2.NONE, value: 0.1173478, offset: 0}, oilbarrel: {name: "oilbarrel", base: k2.VOLUME, prefixes: R2.NONE, value: 0.1589873, offset: 0}, hogshead: {name: "hogshead", base: k2.VOLUME, prefixes: R2.NONE, value: 0.238481, offset: 0}, fldr: {name: "fldr", base: k2.VOLUME, prefixes: R2.NONE, value: 36966911e-13, offset: 0}, floz: {name: "floz", base: k2.VOLUME, prefixes: R2.NONE, value: 2957353e-11, offset: 0}, gi: {name: "gi", base: k2.VOLUME, prefixes: R2.NONE, value: 1182941e-10, offset: 0}, cp: {name: "cp", base: k2.VOLUME, prefixes: R2.NONE, value: 2365882e-10, offset: 0}, pt: {name: "pt", base: k2.VOLUME, prefixes: R2.NONE, value: 4731765e-10, offset: 0}, qt: {name: "qt", base: k2.VOLUME, prefixes: R2.NONE, value: 9463529e-10, offset: 0}, gal: {name: "gal", base: k2.VOLUME, prefixes: R2.NONE, value: 3785412e-9, offset: 0}, bbl: {name: "bbl", base: k2.VOLUME, prefixes: R2.NONE, value: 0.1173478, offset: 0}, obl: {name: "obl", base: k2.VOLUME, prefixes: R2.NONE, value: 0.1589873, offset: 0}, g: {name: "g", base: k2.MASS, prefixes: R2.SHORT, value: 1e-3, offset: 0}, gram: {name: "gram", base: k2.MASS, prefixes: R2.LONG, value: 1e-3, offset: 0}, ton: {name: "ton", base: k2.MASS, prefixes: R2.SHORT, value: 907.18474, offset: 0}, t: {name: "t", base: k2.MASS, prefixes: R2.SHORT, value: 1e3, offset: 0}, tonne: {name: "tonne", base: k2.MASS, prefixes: R2.LONG, value: 1e3, offset: 0}, grain: {name: "grain", base: k2.MASS, prefixes: R2.NONE, value: 6479891e-11, offset: 0}, dram: {name: "dram", base: k2.MASS, prefixes: R2.NONE, value: 0.0017718451953125, offset: 0}, ounce: {name: "ounce", base: k2.MASS, prefixes: R2.NONE, value: 0.028349523125, offset: 0}, poundmass: {name: "poundmass", base: k2.MASS, prefixes: R2.NONE, value: 0.45359237, offset: 0}, hundredweight: {name: "hundredweight", base: k2.MASS, prefixes: R2.NONE, value: 45.359237, offset: 0}, stick: {name: "stick", base: k2.MASS, prefixes: R2.NONE, value: 0.115, offset: 0}, stone: {name: "stone", base: k2.MASS, prefixes: R2.NONE, value: 6.35029318, offset: 0}, gr: {name: "gr", base: k2.MASS, prefixes: R2.NONE, value: 6479891e-11, offset: 0}, dr: {name: "dr", base: k2.MASS, prefixes: R2.NONE, value: 0.0017718451953125, offset: 0}, oz: {name: "oz", base: k2.MASS, prefixes: R2.NONE, value: 0.028349523125, offset: 0}, lbm: {name: "lbm", base: k2.MASS, prefixes: R2.NONE, value: 0.45359237, offset: 0}, cwt: {name: "cwt", base: k2.MASS, prefixes: R2.NONE, value: 45.359237, offset: 0}, s: {name: "s", base: k2.TIME, prefixes: R2.SHORT, value: 1, offset: 0}, min: {name: "min", base: k2.TIME, prefixes: R2.NONE, value: 60, offset: 0}, h: {name: "h", base: k2.TIME, prefixes: R2.NONE, value: 3600, offset: 0}, second: {name: "second", base: k2.TIME, prefixes: R2.LONG, value: 1, offset: 0}, sec: {name: "sec", base: k2.TIME, prefixes: R2.LONG, value: 1, offset: 0}, minute: {name: "minute", base: k2.TIME, prefixes: R2.NONE, value: 60, offset: 0}, hour: {name: "hour", base: k2.TIME, prefixes: R2.NONE, value: 3600, offset: 0}, day: {name: "day", base: k2.TIME, prefixes: R2.NONE, value: 86400, offset: 0}, week: {name: "week", base: k2.TIME, prefixes: R2.NONE, value: 604800, offset: 0}, month: {name: "month", base: k2.TIME, prefixes: R2.NONE, value: 2629800, offset: 0}, year: {name: "year", base: k2.TIME, prefixes: R2.NONE, value: 31557600, offset: 0}, decade: {name: "decade", base: k2.TIME, prefixes: R2.NONE, value: 315576e3, offset: 0}, century: {name: "century", base: k2.TIME, prefixes: R2.NONE, value: 315576e4, offset: 0}, millennium: {name: "millennium", base: k2.TIME, prefixes: R2.NONE, value: 315576e5, offset: 0}, hertz: {name: "Hertz", base: k2.FREQUENCY, prefixes: R2.LONG, value: 1, offset: 0, reciprocal: true}, Hz: {name: "Hz", base: k2.FREQUENCY, prefixes: R2.SHORT, value: 1, offset: 0, reciprocal: true}, rad: {name: "rad", base: k2.ANGLE, prefixes: R2.SHORT, value: 1, offset: 0}, radian: {name: "radian", base: k2.ANGLE, prefixes: R2.LONG, value: 1, offset: 0}, deg: {name: "deg", base: k2.ANGLE, prefixes: R2.SHORT, value: null, offset: 0}, degree: {name: "degree", base: k2.ANGLE, prefixes: R2.LONG, value: null, offset: 0}, grad: {name: "grad", base: k2.ANGLE, prefixes: R2.SHORT, value: null, offset: 0}, gradian: {name: "gradian", base: k2.ANGLE, prefixes: R2.LONG, value: null, offset: 0}, cycle: {name: "cycle", base: k2.ANGLE, prefixes: R2.NONE, value: null, offset: 0}, arcsec: {name: "arcsec", base: k2.ANGLE, prefixes: R2.NONE, value: null, offset: 0}, arcmin: {name: "arcmin", base: k2.ANGLE, prefixes: R2.NONE, value: null, offset: 0}, A: {name: "A", base: k2.CURRENT, prefixes: R2.SHORT, value: 1, offset: 0}, ampere: {name: "ampere", base: k2.CURRENT, prefixes: R2.LONG, value: 1, offset: 0}, K: {name: "K", base: k2.TEMPERATURE, prefixes: R2.NONE, value: 1, offset: 0}, degC: {name: "degC", base: k2.TEMPERATURE, prefixes: R2.NONE, value: 1, offset: 273.15}, degF: {name: "degF", base: k2.TEMPERATURE, prefixes: R2.NONE, value: 1 / 1.8, offset: 459.67}, degR: {name: "degR", base: k2.TEMPERATURE, prefixes: R2.NONE, value: 1 / 1.8, offset: 0}, kelvin: {name: "kelvin", base: k2.TEMPERATURE, prefixes: R2.NONE, value: 1, offset: 0}, celsius: {name: "celsius", base: k2.TEMPERATURE, prefixes: R2.NONE, value: 1, offset: 273.15}, fahrenheit: {name: "fahrenheit", base: k2.TEMPERATURE, prefixes: R2.NONE, value: 1 / 1.8, offset: 459.67}, rankine: {name: "rankine", base: k2.TEMPERATURE, prefixes: R2.NONE, value: 1 / 1.8, offset: 0}, mol: {name: "mol", base: k2.AMOUNT_OF_SUBSTANCE, prefixes: R2.SHORT, value: 1, offset: 0}, mole: {name: "mole", base: k2.AMOUNT_OF_SUBSTANCE, prefixes: R2.LONG, value: 1, offset: 0}, cd: {name: "cd", base: k2.LUMINOUS_INTENSITY, prefixes: R2.SHORT, value: 1, offset: 0}, candela: {name: "candela", base: k2.LUMINOUS_INTENSITY, prefixes: R2.LONG, value: 1, offset: 0}, N: {name: "N", base: k2.FORCE, prefixes: R2.SHORT, value: 1, offset: 0}, newton: {name: "newton", base: k2.FORCE, prefixes: R2.LONG, value: 1, offset: 0}, dyn: {name: "dyn", base: k2.FORCE, prefixes: R2.SHORT, value: 1e-5, offset: 0}, dyne: {name: "dyne", base: k2.FORCE, prefixes: R2.LONG, value: 1e-5, offset: 0}, lbf: {name: "lbf", base: k2.FORCE, prefixes: R2.NONE, value: 4.4482216152605, offset: 0}, poundforce: {name: "poundforce", base: k2.FORCE, prefixes: R2.NONE, value: 4.4482216152605, offset: 0}, kip: {name: "kip", base: k2.FORCE, prefixes: R2.LONG, value: 4448.2216, offset: 0}, kilogramforce: {name: "kilogramforce", base: k2.FORCE, prefixes: R2.NONE, value: 9.80665, offset: 0}, J: {name: "J", base: k2.ENERGY, prefixes: R2.SHORT, value: 1, offset: 0}, joule: {name: "joule", base: k2.ENERGY, prefixes: R2.SHORT, value: 1, offset: 0}, erg: {name: "erg", base: k2.ENERGY, prefixes: R2.NONE, value: 1e-7, offset: 0}, Wh: {name: "Wh", base: k2.ENERGY, prefixes: R2.SHORT, value: 3600, offset: 0}, BTU: {name: "BTU", base: k2.ENERGY, prefixes: R2.BTU, value: 1055.05585262, offset: 0}, eV: {name: "eV", base: k2.ENERGY, prefixes: R2.SHORT, value: 1602176565e-28, offset: 0}, electronvolt: {name: "electronvolt", base: k2.ENERGY, prefixes: R2.LONG, value: 1602176565e-28, offset: 0}, W: {name: "W", base: k2.POWER, prefixes: R2.SHORT, value: 1, offset: 0}, watt: {name: "watt", base: k2.POWER, prefixes: R2.LONG, value: 1, offset: 0}, hp: {name: "hp", base: k2.POWER, prefixes: R2.NONE, value: 745.6998715386, offset: 0}, VAR: {name: "VAR", base: k2.POWER, prefixes: R2.SHORT, value: v.I, offset: 0}, VA: {name: "VA", base: k2.POWER, prefixes: R2.SHORT, value: 1, offset: 0}, Pa: {name: "Pa", base: k2.PRESSURE, prefixes: R2.SHORT, value: 1, offset: 0}, psi: {name: "psi", base: k2.PRESSURE, prefixes: R2.NONE, value: 6894.75729276459, offset: 0}, atm: {name: "atm", base: k2.PRESSURE, prefixes: R2.NONE, value: 101325, offset: 0}, bar: {name: "bar", base: k2.PRESSURE, prefixes: R2.SHORTLONG, value: 1e5, offset: 0}, torr: {name: "torr", base: k2.PRESSURE, prefixes: R2.NONE, value: 133.322, offset: 0}, mmHg: {name: "mmHg", base: k2.PRESSURE, prefixes: R2.NONE, value: 133.322, offset: 0}, mmH2O: {name: "mmH2O", base: k2.PRESSURE, prefixes: R2.NONE, value: 9.80665, offset: 0}, cmH2O: {name: "cmH2O", base: k2.PRESSURE, prefixes: R2.NONE, value: 98.0665, offset: 0}, coulomb: {name: "coulomb", base: k2.ELECTRIC_CHARGE, prefixes: R2.LONG, value: 1, offset: 0}, C: {name: "C", base: k2.ELECTRIC_CHARGE, prefixes: R2.SHORT, value: 1, offset: 0}, farad: {name: "farad", base: k2.ELECTRIC_CAPACITANCE, prefixes: R2.LONG, value: 1, offset: 0}, F: {name: "F", base: k2.ELECTRIC_CAPACITANCE, prefixes: R2.SHORT, value: 1, offset: 0}, volt: {name: "volt", base: k2.ELECTRIC_POTENTIAL, prefixes: R2.LONG, value: 1, offset: 0}, V: {name: "V", base: k2.ELECTRIC_POTENTIAL, prefixes: R2.SHORT, value: 1, offset: 0}, ohm: {name: "ohm", base: k2.ELECTRIC_RESISTANCE, prefixes: R2.SHORTLONG, value: 1, offset: 0}, henry: {name: "henry", base: k2.ELECTRIC_INDUCTANCE, prefixes: R2.LONG, value: 1, offset: 0}, H: {name: "H", base: k2.ELECTRIC_INDUCTANCE, prefixes: R2.SHORT, value: 1, offset: 0}, siemens: {name: "siemens", base: k2.ELECTRIC_CONDUCTANCE, prefixes: R2.LONG, value: 1, offset: 0}, S: {name: "S", base: k2.ELECTRIC_CONDUCTANCE, prefixes: R2.SHORT, value: 1, offset: 0}, weber: {name: "weber", base: k2.MAGNETIC_FLUX, prefixes: R2.LONG, value: 1, offset: 0}, Wb: {name: "Wb", base: k2.MAGNETIC_FLUX, prefixes: R2.SHORT, value: 1, offset: 0}, tesla: {name: "tesla", base: k2.MAGNETIC_FLUX_DENSITY, prefixes: R2.LONG, value: 1, offset: 0}, T: {name: "T", base: k2.MAGNETIC_FLUX_DENSITY, prefixes: R2.SHORT, value: 1, offset: 0}, b: {name: "b", base: k2.BIT, prefixes: R2.BINARY_SHORT, value: 1, offset: 0}, bits: {name: "bits", base: k2.BIT, prefixes: R2.BINARY_LONG, value: 1, offset: 0}, B: {name: "B", base: k2.BIT, prefixes: R2.BINARY_SHORT, value: 8, offset: 0}, bytes: {name: "bytes", base: k2.BIT, prefixes: R2.BINARY_LONG, value: 8, offset: 0}}, F2 = {meters: "meter", inches: "inch", feet: "foot", yards: "yard", miles: "mile", links: "link", rods: "rod", chains: "chain", angstroms: "angstrom", lt: "l", litres: "litre", liter: "litre", liters: "litre", teaspoons: "teaspoon", tablespoons: "tablespoon", minims: "minim", fluiddrams: "fluiddram", fluidounces: "fluidounce", gills: "gill", cups: "cup", pints: "pint", quarts: "quart", gallons: "gallon", beerbarrels: "beerbarrel", oilbarrels: "oilbarrel", hogsheads: "hogshead", gtts: "gtt", grams: "gram", tons: "ton", tonnes: "tonne", grains: "grain", drams: "dram", ounces: "ounce", poundmasses: "poundmass", hundredweights: "hundredweight", sticks: "stick", lb: "lbm", lbs: "lbm", kips: "kip", kgf: "kilogramforce", acres: "acre", hectares: "hectare", sqfeet: "sqft", sqyard: "sqyd", sqmile: "sqmi", sqmiles: "sqmi", mmhg: "mmHg", mmh2o: "mmH2O", cmh2o: "cmH2O", seconds: "second", secs: "second", minutes: "minute", mins: "minute", hours: "hour", hr: "hour", hrs: "hour", days: "day", weeks: "week", months: "month", years: "year", decades: "decade", centuries: "century", millennia: "millennium", hertz: "hertz", radians: "radian", degrees: "degree", gradians: "gradian", cycles: "cycle", arcsecond: "arcsec", arcseconds: "arcsec", arcminute: "arcmin", arcminutes: "arcmin", BTUs: "BTU", watts: "watt", joules: "joule", amperes: "ampere", coulombs: "coulomb", volts: "volt", ohms: "ohm", farads: "farad", webers: "weber", teslas: "tesla", electronvolts: "electronvolt", moles: "mole", bit: "bits", byte: "bytes"};
  function P2(t4) {
    if (t4.number === "BigNumber") {
      var e3 = Oa(x);
      B2.rad.value = new x(1), B2.deg.value = e3.div(180), B2.grad.value = e3.div(200), B2.cycle.value = e3.times(2), B2.arcsec.value = e3.div(648e3), B2.arcmin.value = e3.div(10800);
    } else
      B2.rad.value = 1, B2.deg.value = Math.PI / 180, B2.grad.value = Math.PI / 200, B2.cycle.value = 2 * Math.PI, B2.arcsec.value = Math.PI / 648e3, B2.arcmin.value = Math.PI / 10800;
    B2.radian.value = B2.rad.value, B2.degree.value = B2.deg.value, B2.gradian.value = B2.grad.value;
  }
  P2(s2), i2 && i2("config", function(t4, e3) {
    t4.number !== e3.number && P2(t4);
  });
  var U2 = {si: {NONE: {unit: L2, prefix: R2.NONE[""]}, LENGTH: {unit: B2.m, prefix: R2.SHORT[""]}, MASS: {unit: B2.g, prefix: R2.SHORT.k}, TIME: {unit: B2.s, prefix: R2.SHORT[""]}, CURRENT: {unit: B2.A, prefix: R2.SHORT[""]}, TEMPERATURE: {unit: B2.K, prefix: R2.SHORT[""]}, LUMINOUS_INTENSITY: {unit: B2.cd, prefix: R2.SHORT[""]}, AMOUNT_OF_SUBSTANCE: {unit: B2.mol, prefix: R2.SHORT[""]}, ANGLE: {unit: B2.rad, prefix: R2.SHORT[""]}, BIT: {unit: B2.bits, prefix: R2.SHORT[""]}, FORCE: {unit: B2.N, prefix: R2.SHORT[""]}, ENERGY: {unit: B2.J, prefix: R2.SHORT[""]}, POWER: {unit: B2.W, prefix: R2.SHORT[""]}, PRESSURE: {unit: B2.Pa, prefix: R2.SHORT[""]}, ELECTRIC_CHARGE: {unit: B2.C, prefix: R2.SHORT[""]}, ELECTRIC_CAPACITANCE: {unit: B2.F, prefix: R2.SHORT[""]}, ELECTRIC_POTENTIAL: {unit: B2.V, prefix: R2.SHORT[""]}, ELECTRIC_RESISTANCE: {unit: B2.ohm, prefix: R2.SHORT[""]}, ELECTRIC_INDUCTANCE: {unit: B2.H, prefix: R2.SHORT[""]}, ELECTRIC_CONDUCTANCE: {unit: B2.S, prefix: R2.SHORT[""]}, MAGNETIC_FLUX: {unit: B2.Wb, prefix: R2.SHORT[""]}, MAGNETIC_FLUX_DENSITY: {unit: B2.T, prefix: R2.SHORT[""]}, FREQUENCY: {unit: B2.Hz, prefix: R2.SHORT[""]}}};
  U2.cgs = JSON.parse(JSON.stringify(U2.si)), U2.cgs.LENGTH = {unit: B2.m, prefix: R2.SHORT.c}, U2.cgs.MASS = {unit: B2.g, prefix: R2.SHORT[""]}, U2.cgs.FORCE = {unit: B2.dyn, prefix: R2.SHORT[""]}, U2.cgs.ENERGY = {unit: B2.erg, prefix: R2.NONE[""]}, U2.us = JSON.parse(JSON.stringify(U2.si)), U2.us.LENGTH = {unit: B2.ft, prefix: R2.NONE[""]}, U2.us.MASS = {unit: B2.lbm, prefix: R2.NONE[""]}, U2.us.TEMPERATURE = {unit: B2.degF, prefix: R2.NONE[""]}, U2.us.FORCE = {unit: B2.lbf, prefix: R2.NONE[""]}, U2.us.ENERGY = {unit: B2.BTU, prefix: R2.BTU[""]}, U2.us.POWER = {unit: B2.hp, prefix: R2.NONE[""]}, U2.us.PRESSURE = {unit: B2.psi, prefix: R2.NONE[""]}, U2.auto = JSON.parse(JSON.stringify(U2.si));
  var j2 = U2.auto;
  for (var q2 in _.setUnitSystem = function(t4) {
    if (!wr(U2, t4))
      throw new Error("Unit system " + t4 + " does not exist. Choices are: " + Object.keys(U2).join(", "));
    j2 = U2[t4];
  }, _.getUnitSystem = function() {
    for (var t4 in U2)
      if (wr(U2, t4) && U2[t4] === j2)
        return t4;
  }, _.typeConverters = {BigNumber: function(t4) {
    return new x(t4 + "");
  }, Fraction: function(t4) {
    return new w(t4);
  }, Complex: function(t4) {
    return t4;
  }, number: function(t4) {
    return t4;
  }}, _._getNumberConverter = function(t4) {
    if (!_.typeConverters[t4])
      throw new TypeError('Unsupported type "' + t4 + '"');
    return _.typeConverters[t4];
  }, B2)
    if (wr(B2, q2)) {
      var H2 = B2[q2];
      H2.dimensions = H2.base.dimensions;
    }
  for (var V2 in F2)
    if (wr(F2, V2)) {
      var $ = B2[F2[V2]], G = {};
      for (var W in $)
        wr($, W) && (G[W] = $[W]);
      G.name = V2, B2[V2] = G;
    }
  return _.isValidAlpha = function(t4) {
    return /^[a-zA-Z]$/.test(t4);
  }, _.createUnit = function(t4, e3) {
    if (typeof t4 != "object")
      throw new TypeError("createUnit expects first parameter to be of type 'Object'");
    if (e3 && e3.override) {
      for (var r3 in t4)
        if (wr(t4, r3) && _.deleteUnit(r3), t4[r3].aliases)
          for (var n3 = 0; n3 < t4[r3].aliases.length; n3++)
            _.deleteUnit(t4[r3].aliases[n3]);
    }
    var i3;
    for (var s3 in t4)
      wr(t4, s3) && (i3 = _.createUnitSingle(s3, t4[s3]));
    return i3;
  }, _.createUnitSingle = function(t4, e3, r3) {
    if (e3 == null && (e3 = {}), typeof t4 != "string")
      throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");
    if (wr(B2, t4))
      throw new Error('Cannot create unit "' + t4 + '": a unit with that name already exists');
    !function(t5) {
      for (var e4 = 0; e4 < t5.length; e4++) {
        if (n2 = t5.charAt(e4), e4 === 0 && !_.isValidAlpha(n2))
          throw new Error('Invalid unit name (must begin with alpha character): "' + t5 + '"');
        if (e4 > 0 && !_.isValidAlpha(n2) && !E(n2))
          throw new Error('Invalid unit name (only alphanumeric characters are allowed): "' + t5 + '"');
      }
    }(t4);
    var i3, s3, a3, o3 = null, u3 = [], h2 = 0;
    if (e3 && e3.type === "Unit")
      o3 = e3.clone();
    else if (typeof e3 == "string")
      e3 !== "" && (i3 = e3);
    else {
      if (typeof e3 != "object")
        throw new TypeError('Cannot create unit "' + t4 + '" from "' + e3.toString() + '": expecting "string" or "Unit" or "Object"');
      i3 = e3.definition, s3 = e3.prefixes, h2 = e3.offset, a3 = e3.baseName, e3.aliases && (u3 = e3.aliases.valueOf());
    }
    if (u3) {
      for (var c3 = 0; c3 < u3.length; c3++)
        if (wr(B2, u3[c3]))
          throw new Error('Cannot create alias "' + u3[c3] + '": a unit with that name already exists');
    }
    if (i3 && typeof i3 == "string" && !o3)
      try {
        o3 = _.parse(i3, {allowNoUnits: true});
      } catch (S2) {
        throw S2.message = 'Could not create unit "' + t4 + '" from "' + i3 + '": ' + S2.message, S2;
      }
    else
      i3 && i3.type === "Unit" && (o3 = i3.clone());
    u3 = u3 || [], h2 = h2 || 0, s3 = s3 && s3.toUpperCase && R2[s3.toUpperCase()] || R2.NONE;
    var l3 = {};
    if (o3) {
      l3 = {name: t4, value: o3.value, dimensions: o3.dimensions.slice(0), prefixes: s3, offset: h2};
      var p3 = false;
      for (var f3 in k2)
        if (wr(k2, f3)) {
          for (var d3 = true, m3 = 0; m3 < D2.length; m3++)
            if (Math.abs((l3.dimensions[m3] || 0) - (k2[f3].dimensions[m3] || 0)) > 1e-12) {
              d3 = false;
              break;
            }
          if (d3) {
            p3 = true, l3.base = k2[f3];
            break;
          }
        }
      if (!p3) {
        a3 = a3 || t4 + "_STUFF";
        var y3 = {dimensions: o3.dimensions.slice(0)};
        y3.key = a3, k2[a3] = y3, j2[a3] = {unit: l3, prefix: R2.NONE[""]}, l3.base = k2[a3];
      }
    } else {
      if (a3 = a3 || t4 + "_STUFF", D2.indexOf(a3) >= 0)
        throw new Error('Cannot create new base unit "' + t4 + '": a base unit with that name already exists (and cannot be overridden)');
      for (var g3 in D2.push(a3), k2)
        wr(k2, g3) && (k2[g3].dimensions[D2.length - 1] = 0);
      for (var v2 = {dimensions: []}, x2 = 0; x2 < D2.length; x2++)
        v2.dimensions[x2] = 0;
      v2.dimensions[D2.length - 1] = 1, v2.key = a3, k2[a3] = v2, l3 = {name: t4, value: 1, dimensions: k2[a3].dimensions.slice(0), prefixes: s3, offset: h2, base: k2[a3]}, j2[a3] = {unit: l3, prefix: R2.NONE[""]};
    }
    _.UNITS[t4] = l3;
    for (var w2 = 0; w2 < u3.length; w2++) {
      var b2 = u3[w2], M2 = {};
      for (var N2 in l3)
        wr(l3, N2) && (M2[N2] = l3[N2]);
      M2.name = b2, _.UNITS[b2] = M2;
    }
    return delete A2.cache, new _(null, t4);
  }, _.deleteUnit = function(t4) {
    delete _.UNITS[t4];
  }, _.PREFIXES = R2, _.BASE_DIMENSIONS = D2, _.BASE_UNITS = k2, _.UNIT_SYSTEMS = U2, _.UNITS = B2, _;
}, {isClass: true});
cn("unit", ["typed", "Unit"], (t3) => {
  var {typed: e2, Unit: r2} = t3;
  return e2("unit", {Unit: function(t4) {
    return t4.clone();
  }, string: function(t4) {
    return r2.isValuelessUnit(t4) ? new r2(null, t4) : r2.parse(t4, {allowNoUnits: true});
  }, "number | BigNumber | Fraction | Complex, string": function(t4, e3) {
    return new r2(t4, e3);
  }, "Array | Matrix": function(t4) {
    return is(t4, this);
  }});
});
cn("createUnit", ["typed", "Unit"], (t3) => {
  var {typed: e2, Unit: r2} = t3;
  return e2("createUnit", {"Object, Object": function(t4, e3) {
    return r2.createUnit(t4, e3);
  }, Object: function(t4) {
    return r2.createUnit(t4, {});
  }, "string, Unit | string | Object, Object": function(t4, e3, n2) {
    var i2 = {};
    return i2[t4] = e3, r2.createUnit(i2, n2);
  }, "string, Unit | string | Object": function(t4, e3) {
    var n2 = {};
    return n2[t4] = e3, r2.createUnit(n2, {});
  }, string: function(t4) {
    var e3 = {};
    return e3[t4] = {}, r2.createUnit(e3, {});
  }});
});
cn("add", ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, addScalar: n2, equalScalar: i2, DenseMatrix: s2, SparseMatrix: a2} = t3, o2 = Rs({typed: e2}), u2 = Ds({typed: e2, equalScalar: i2}), h = ks({typed: e2, DenseMatrix: s2}), c2 = Is({typed: e2}), l2 = Os({typed: e2});
  return e2("add", dr({"DenseMatrix, DenseMatrix": function(t4, e3) {
    return c2(t4, e3, n2);
  }, "DenseMatrix, SparseMatrix": function(t4, e3) {
    return o2(t4, e3, n2, false);
  }, "SparseMatrix, DenseMatrix": function(t4, e3) {
    return o2(e3, t4, n2, true);
  }, "SparseMatrix, SparseMatrix": function(t4, e3) {
    return u2(t4, e3, n2);
  }, "Array, Array": function(t4, e3) {
    return this(r2(t4), r2(e3)).valueOf();
  }, "Array, Matrix": function(t4, e3) {
    return this(r2(t4), e3);
  }, "Matrix, Array": function(t4, e3) {
    return this(t4, r2(e3));
  }, "DenseMatrix, any": function(t4, e3) {
    return l2(t4, e3, n2, false);
  }, "SparseMatrix, any": function(t4, e3) {
    return h(t4, e3, n2, false);
  }, "any, DenseMatrix": function(t4, e3) {
    return l2(e3, t4, n2, true);
  }, "any, SparseMatrix": function(t4, e3) {
    return h(e3, t4, n2, true);
  }, "Array, any": function(t4, e3) {
    return l2(r2(t4), e3, n2, false).valueOf();
  }, "any, Array": function(t4, e3) {
    return l2(r2(e3), t4, n2, true).valueOf();
  }, "any, any": n2, "any, any, ...any": function(t4, e3, r3) {
    for (var n3 = this(t4, e3), i3 = 0; i3 < r3.length; i3++)
      n3 = this(n3, r3[i3]);
    return n3;
  }}, n2.signatures));
});
var Fa = cn("dot", ["typed", "addScalar", "multiplyScalar", "conj", "size"], (t3) => {
  var {typed: e2, addScalar: r2, multiplyScalar: n2, conj: i2, size: s2} = t3;
  return e2("dot", {"Array | DenseMatrix, Array | DenseMatrix": function(t4, s3) {
    var u2 = a2(t4, s3), h = ke(t4) ? t4._data : t4, c2 = ke(t4) ? t4._datatype : void 0, l2 = ke(s3) ? s3._data : s3, p2 = ke(s3) ? s3._datatype : void 0, f2 = o2(t4).length === 2, d2 = o2(s3).length === 2, m2 = r2, y2 = n2;
    if (c2 && p2 && c2 === p2 && typeof c2 == "string") {
      var g2 = c2;
      m2 = e2.find(r2, [g2, g2]), y2 = e2.find(n2, [g2, g2]);
    }
    if (!f2 && !d2) {
      for (var v = y2(i2(h[0]), l2[0]), x = 1; x < u2; x++)
        v = m2(v, y2(i2(h[x]), l2[x]));
      return v;
    }
    if (!f2 && d2) {
      for (var w = y2(i2(h[0]), l2[0][0]), b = 1; b < u2; b++)
        w = m2(w, y2(i2(h[b]), l2[b][0]));
      return w;
    }
    if (f2 && !d2) {
      for (var _ = y2(i2(h[0][0]), l2[0]), M = 1; M < u2; M++)
        _ = m2(_, y2(i2(h[M][0]), l2[M]));
      return _;
    }
    if (f2 && d2) {
      for (var E = y2(i2(h[0][0]), l2[0][0]), N = 1; N < u2; N++)
        E = m2(E, y2(i2(h[N][0]), l2[N][0]));
      return E;
    }
  }, "SparseMatrix, SparseMatrix": function(t4, e3) {
    a2(t4, e3);
    var i3 = t4._index, s3 = t4._values, o3 = e3._index, u2 = e3._values, h = 0, c2 = r2, l2 = n2, p2 = 0, f2 = 0;
    for (; p2 < i3.length && f2 < o3.length; ) {
      var d2 = i3[p2], m2 = o3[f2];
      d2 < m2 ? p2++ : d2 > m2 ? f2++ : d2 === m2 && (h = c2(h, l2(s3[p2], u2[f2])), p2++, f2++);
    }
    return h;
  }});
  function a2(t4, e3) {
    var r3, n3, i3 = o2(t4), s3 = o2(e3);
    if (i3.length === 1)
      r3 = i3[0];
    else {
      if (i3.length !== 2 || i3[1] !== 1)
        throw new RangeError("Expected a column vector, instead got a matrix of size (" + i3.join(", ") + ")");
      r3 = i3[0];
    }
    if (s3.length === 1)
      n3 = s3[0];
    else {
      if (s3.length !== 2 || s3[1] !== 1)
        throw new RangeError("Expected a column vector, instead got a matrix of size (" + s3.join(", ") + ")");
      n3 = s3[0];
    }
    if (r3 !== n3)
      throw new RangeError("Vectors must have equal length (" + r3 + " != " + n3 + ")");
    if (r3 === 0)
      throw new RangeError("Cannot calculate the dot product of empty vectors");
    return r3;
  }
  function o2(t4) {
    return ke(t4) ? t4.size() : s2(t4);
  }
}), Pa = {end: true}, Ua = cn("Node", ["mathWithTransform"], (t3) => {
  var {mathWithTransform: e2} = t3;
  function r2() {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
  }
  return r2.prototype.evaluate = function(t4) {
    return this.compile().evaluate(t4);
  }, r2.prototype.type = "Node", r2.prototype.isNode = true, r2.prototype.comment = "", r2.prototype.compile = function() {
    var t4 = this._compile(e2, {}), r3 = {};
    return {evaluate: function(e3) {
      var n2 = e3 || {};
      return function(t5) {
        for (var e4 in t5)
          if (wr(t5, e4) && e4 in Pa)
            throw new Error('Scope contains an illegal symbol, "' + e4 + '" is a reserved keyword');
      }(n2), t4(n2, r3, null);
    }};
  }, r2.prototype._compile = function(t4, e3) {
    throw new Error("Method _compile should be implemented by type " + this.type);
  }, r2.prototype.forEach = function(t4) {
    throw new Error("Cannot run forEach on a Node interface");
  }, r2.prototype.map = function(t4) {
    throw new Error("Cannot run map on a Node interface");
  }, r2.prototype._ifNode = function(t4) {
    if (!ir(t4))
      throw new TypeError("Callback function must return a Node");
    return t4;
  }, r2.prototype.traverse = function(t4) {
    t4(this, null, null), function t5(e3, r3) {
      e3.forEach(function(e4, n2, i2) {
        r3(e4, n2, i2), t5(e4, r3);
      });
    }(this, t4);
  }, r2.prototype.transform = function(t4) {
    return function e3(r3, n2, i2) {
      var s2 = t4(r3, n2, i2);
      return s2 !== r3 ? s2 : r3.map(e3);
    }(this, null, null);
  }, r2.prototype.filter = function(t4) {
    var e3 = [];
    return this.traverse(function(r3, n2, i2) {
      t4(r3, n2, i2) && e3.push(r3);
    }), e3;
  }, r2.prototype.clone = function() {
    throw new Error("Cannot clone a Node interface");
  }, r2.prototype.cloneDeep = function() {
    return this.map(function(t4) {
      return t4.cloneDeep();
    });
  }, r2.prototype.equals = function(t4) {
    return !!t4 && yr(this, t4);
  }, r2.prototype.toString = function(t4) {
    var e3;
    if (t4 && typeof t4 == "object")
      switch (typeof t4.handler) {
        case "object":
        case "undefined":
          break;
        case "function":
          e3 = t4.handler(this, t4);
          break;
        default:
          throw new TypeError("Object or function expected as callback");
      }
    return e3 !== void 0 ? e3 : this._toString(t4);
  }, r2.prototype.toJSON = function() {
    throw new Error("Cannot serialize object: toJSON not implemented by " + this.type);
  }, r2.prototype.toHTML = function(t4) {
    var e3;
    if (t4 && typeof t4 == "object")
      switch (typeof t4.handler) {
        case "object":
        case "undefined":
          break;
        case "function":
          e3 = t4.handler(this, t4);
          break;
        default:
          throw new TypeError("Object or function expected as callback");
      }
    return e3 !== void 0 ? e3 : this.toHTML(t4);
  }, r2.prototype._toString = function() {
    throw new Error("_toString not implemented for " + this.type);
  }, r2.prototype.toTex = function(t4) {
    var e3;
    if (t4 && typeof t4 == "object")
      switch (typeof t4.handler) {
        case "object":
        case "undefined":
          break;
        case "function":
          e3 = t4.handler(this, t4);
          break;
        default:
          throw new TypeError("Object or function expected as callback");
      }
    return e3 !== void 0 ? e3 : this._toTex(t4);
  }, r2.prototype._toTex = function(t4) {
    throw new Error("_toTex not implemented for " + this.type);
  }, r2.prototype.getIdentifier = function() {
    return this.type;
  }, r2.prototype.getContent = function() {
    return this;
  }, r2;
}, {isClass: true, isNode: true});
function ja(t3) {
  return t3 && t3.isIndexError ? new Yr(t3.index + 1, t3.min + 1, t3.max !== void 0 ? t3.max + 1 : void 0) : t3;
}
function qa(t3) {
  var {subset: e2} = t3;
  return function(t4, r2) {
    try {
      if (Array.isArray(t4))
        return e2(t4, r2);
      if (t4 && typeof t4.subset == "function")
        return t4.subset(r2);
      if (typeof t4 == "string")
        return e2(t4, r2);
      if (typeof t4 == "object") {
        if (!r2.isObjectProperty())
          throw new TypeError("Cannot apply a numeric index as object property");
        return ta(t4, r2.getObjectProperty());
      }
      throw new TypeError("Cannot apply index: unsupported type of object");
    } catch (n2) {
      throw ja(n2);
    }
  };
}
var Ha = cn("AccessorNode", ["subset", "Node"], (t3) => {
  var {subset: e2, Node: r2} = t3, n2 = qa({subset: e2});
  function i2(t4, e3) {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!ir(t4))
      throw new TypeError('Node expected for parameter "object"');
    if (!nr(e3))
      throw new TypeError('IndexNode expected for parameter "index"');
    this.object = t4 || null, this.index = e3, Object.defineProperty(this, "name", {get: function() {
      return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
    }.bind(this), set: function() {
      throw new Error("Cannot assign a new name, name is read-only");
    }});
  }
  function s2(t4) {
    return !(Ze(t4) || Xe(t4) || tr(t4) || rr(t4) || sr(t4) || or(t4) || hr(t4));
  }
  return i2.prototype = new r2(), i2.prototype.type = "AccessorNode", i2.prototype.isAccessorNode = true, i2.prototype._compile = function(t4, e3) {
    var r3 = this.object._compile(t4, e3), i3 = this.index._compile(t4, e3);
    if (this.index.isObjectProperty()) {
      var s3 = this.index.getObjectProperty();
      return function(t5, e4, n3) {
        return ta(r3(t5, e4, n3), s3);
      };
    }
    return function(t5, e4, s4) {
      var a2 = r3(t5, e4, s4), o2 = i3(t5, e4, a2);
      return n2(a2, o2);
    };
  }, i2.prototype.forEach = function(t4) {
    t4(this.object, "object", this), t4(this.index, "index", this);
  }, i2.prototype.map = function(t4) {
    return new i2(this._ifNode(t4(this.object, "object", this)), this._ifNode(t4(this.index, "index", this)));
  }, i2.prototype.clone = function() {
    return new i2(this.object, this.index);
  }, i2.prototype._toString = function(t4) {
    var e3 = this.object.toString(t4);
    return s2(this.object) && (e3 = "(" + e3 + ")"), e3 + this.index.toString(t4);
  }, i2.prototype.toHTML = function(t4) {
    var e3 = this.object.toHTML(t4);
    return s2(this.object) && (e3 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + e3 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), e3 + this.index.toHTML(t4);
  }, i2.prototype._toTex = function(t4) {
    var e3 = this.object.toTex(t4);
    return s2(this.object) && (e3 = "\\left(' + object + '\\right)"), e3 + this.index.toTex(t4);
  }, i2.prototype.toJSON = function() {
    return {mathjs: "AccessorNode", object: this.object, index: this.index};
  }, i2.fromJSON = function(t4) {
    return new i2(t4.object, t4.index);
  }, i2;
}, {isClass: true, isNode: true}), Va = cn("ArrayNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (this.items = t4 || [], !Array.isArray(this.items) || !this.items.every(ir))
      throw new TypeError("Array containing Nodes expected");
  }
  return r2.prototype = new e2(), r2.prototype.type = "ArrayNode", r2.prototype.isArrayNode = true, r2.prototype._compile = function(t4, e3) {
    var r3 = sn(this.items, function(r4) {
      return r4._compile(t4, e3);
    });
    if (t4.config.matrix !== "Array") {
      var n2 = t4.matrix;
      return function(t5, e4, i2) {
        return n2(sn(r3, function(r4) {
          return r4(t5, e4, i2);
        }));
      };
    }
    return function(t5, e4, n3) {
      return sn(r3, function(r4) {
        return r4(t5, e4, n3);
      });
    };
  }, r2.prototype.forEach = function(t4) {
    for (var e3 = 0; e3 < this.items.length; e3++) {
      t4(this.items[e3], "items[" + e3 + "]", this);
    }
  }, r2.prototype.map = function(t4) {
    for (var e3 = [], n2 = 0; n2 < this.items.length; n2++)
      e3[n2] = this._ifNode(t4(this.items[n2], "items[" + n2 + "]", this));
    return new r2(e3);
  }, r2.prototype.clone = function() {
    return new r2(this.items.slice(0));
  }, r2.prototype._toString = function(t4) {
    return "[" + this.items.map(function(e3) {
      return e3.toString(t4);
    }).join(", ") + "]";
  }, r2.prototype.toJSON = function() {
    return {mathjs: "ArrayNode", items: this.items};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.items);
  }, r2.prototype.toHTML = function(t4) {
    return '<span class="math-parenthesis math-square-parenthesis">[</span>' + this.items.map(function(e3) {
      return e3.toHTML(t4);
    }).join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
  }, r2.prototype._toTex = function(t4) {
    var e3 = "\\begin{bmatrix}";
    return this.items.forEach(function(r3) {
      r3.items ? e3 += r3.items.map(function(e4) {
        return e4.toTex(t4);
      }).join("&") : e3 += r3.toTex(t4), e3 += "\\\\";
    }), e3 += "\\end{bmatrix}";
  }, r2;
}, {isClass: true, isNode: true});
var $a = [{AssignmentNode: {}, FunctionAssignmentNode: {}}, {ConditionalNode: {latexLeftParens: false, latexRightParens: false, latexParens: false}}, {"OperatorNode:or": {associativity: "left", associativeWith: []}}, {"OperatorNode:xor": {associativity: "left", associativeWith: []}}, {"OperatorNode:and": {associativity: "left", associativeWith: []}}, {"OperatorNode:bitOr": {associativity: "left", associativeWith: []}}, {"OperatorNode:bitXor": {associativity: "left", associativeWith: []}}, {"OperatorNode:bitAnd": {associativity: "left", associativeWith: []}}, {"OperatorNode:equal": {associativity: "left", associativeWith: []}, "OperatorNode:unequal": {associativity: "left", associativeWith: []}, "OperatorNode:smaller": {associativity: "left", associativeWith: []}, "OperatorNode:larger": {associativity: "left", associativeWith: []}, "OperatorNode:smallerEq": {associativity: "left", associativeWith: []}, "OperatorNode:largerEq": {associativity: "left", associativeWith: []}, RelationalNode: {associativity: "left", associativeWith: []}}, {"OperatorNode:leftShift": {associativity: "left", associativeWith: []}, "OperatorNode:rightArithShift": {associativity: "left", associativeWith: []}, "OperatorNode:rightLogShift": {associativity: "left", associativeWith: []}}, {"OperatorNode:to": {associativity: "left", associativeWith: []}}, {RangeNode: {}}, {"OperatorNode:add": {associativity: "left", associativeWith: ["OperatorNode:add", "OperatorNode:subtract"]}, "OperatorNode:subtract": {associativity: "left", associativeWith: []}}, {"OperatorNode:multiply": {associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"]}, "OperatorNode:divide": {associativity: "left", associativeWith: [], latexLeftParens: false, latexRightParens: false, latexParens: false}, "OperatorNode:dotMultiply": {associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "OperatorNode:dotMultiply", "OperatorNode:doDivide"]}, "OperatorNode:dotDivide": {associativity: "left", associativeWith: []}, "OperatorNode:mod": {associativity: "left", associativeWith: []}}, {"OperatorNode:unaryPlus": {associativity: "right"}, "OperatorNode:unaryMinus": {associativity: "right"}, "OperatorNode:bitNot": {associativity: "right"}, "OperatorNode:not": {associativity: "right"}}, {"OperatorNode:pow": {associativity: "right", associativeWith: [], latexRightParens: false}, "OperatorNode:dotPow": {associativity: "right", associativeWith: []}}, {"OperatorNode:factorial": {associativity: "left"}}, {"OperatorNode:transpose": {associativity: "left"}}];
function Ga(t3, e2) {
  var r2 = t3;
  e2 !== "keep" && (r2 = t3.getContent());
  for (var n2 = r2.getIdentifier(), i2 = 0; i2 < $a.length; i2++)
    if (n2 in $a[i2])
      return i2;
  return null;
}
function Wa(t3, e2) {
  var r2 = t3;
  e2 !== "keep" && (r2 = t3.getContent());
  var n2 = r2.getIdentifier(), i2 = Ga(r2, e2);
  if (i2 === null)
    return null;
  var s2 = $a[i2][n2];
  if (wr(s2, "associativity")) {
    if (s2.associativity === "left")
      return "left";
    if (s2.associativity === "right")
      return "right";
    throw Error("'" + n2 + "' has the invalid associativity '" + s2.associativity + "'.");
  }
  return null;
}
function Ya(t3, e2, r2) {
  var n2 = r2 !== "keep" ? t3.getContent() : t3, i2 = r2 !== "keep" ? t3.getContent() : e2, s2 = n2.getIdentifier(), a2 = i2.getIdentifier(), o2 = Ga(n2, r2);
  if (o2 === null)
    return null;
  var u2 = $a[o2][s2];
  if (wr(u2, "associativeWith") && u2.associativeWith instanceof Array) {
    for (var h = 0; h < u2.associativeWith.length; h++)
      if (u2.associativeWith[h] === a2)
        return true;
    return false;
  }
  return null;
}
var Za = cn("AssignmentNode", ["subset", "?matrix", "Node"], (t3) => {
  var {subset: e2, matrix: r2, Node: n2} = t3, i2 = qa({subset: e2}), s2 = function(t4) {
    var {subset: e3, matrix: r3} = t4;
    return function(t5, n3, i3) {
      try {
        if (Array.isArray(t5))
          return r3(t5).subset(n3, i3).valueOf();
        if (t5 && typeof t5.subset == "function")
          return t5.subset(n3, i3);
        if (typeof t5 == "string")
          return e3(t5, n3, i3);
        if (typeof t5 == "object") {
          if (!n3.isObjectProperty())
            throw TypeError("Cannot apply a numeric index as object property");
          return ea(t5, n3.getObjectProperty(), i3), t5;
        }
        throw new TypeError("Cannot apply index: unsupported type of object");
      } catch (s3) {
        throw ja(s3);
      }
    };
  }({subset: e2, matrix: r2});
  function a2(t4, e3, r3) {
    if (!(this instanceof a2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (this.object = t4, this.index = r3 ? e3 : null, this.value = r3 || e3, !hr(t4) && !Ze(t4))
      throw new TypeError('SymbolNode or AccessorNode expected as "object"');
    if (hr(t4) && t4.name === "end")
      throw new Error('Cannot assign to symbol "end"');
    if (this.index && !nr(this.index))
      throw new TypeError('IndexNode expected as "index"');
    if (!ir(this.value))
      throw new TypeError('Node expected as "value"');
    Object.defineProperty(this, "name", {get: function() {
      return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
    }.bind(this), set: function() {
      throw new Error("Cannot assign a new name, name is read-only");
    }});
  }
  function o2(t4, e3) {
    e3 || (e3 = "keep");
    var r3 = Ga(t4, e3), n3 = Ga(t4.value, e3);
    return e3 === "all" || n3 !== null && n3 <= r3;
  }
  return a2.prototype = new n2(), a2.prototype.type = "AssignmentNode", a2.prototype.isAssignmentNode = true, a2.prototype._compile = function(t4, e3) {
    var r3 = this.object._compile(t4, e3), n3 = this.index ? this.index._compile(t4, e3) : null, a3 = this.value._compile(t4, e3), o3 = this.object.name;
    if (this.index) {
      if (this.index.isObjectProperty()) {
        var u2 = this.index.getObjectProperty();
        return function(t5, e4, n4) {
          var i3 = r3(t5, e4, n4), s3 = a3(t5, e4, n4);
          return ea(i3, u2, s3);
        };
      }
      if (hr(this.object))
        return function(t5, e4, i3) {
          var u3 = r3(t5, e4, i3), h2 = a3(t5, e4, i3), c3 = n3(t5, e4, u3);
          return ea(t5, o3, s2(u3, c3, h2)), h2;
        };
      var h = this.object.object._compile(t4, e3);
      if (this.object.index.isObjectProperty()) {
        var c2 = this.object.index.getObjectProperty();
        return function(t5, e4, r4) {
          var i3 = h(t5, e4, r4), o4 = ta(i3, c2), u3 = n3(t5, e4, o4), l3 = a3(t5, e4, r4);
          return ea(i3, c2, s2(o4, u3, l3)), l3;
        };
      }
      var l2 = this.object.index._compile(t4, e3);
      return function(t5, e4, r4) {
        var o4 = h(t5, e4, r4), u3 = l2(t5, e4, o4), c3 = i2(o4, u3), p2 = n3(t5, e4, c3), f2 = a3(t5, e4, r4);
        return s2(o4, u3, s2(c3, p2, f2)), f2;
      };
    }
    if (!hr(this.object))
      throw new TypeError("SymbolNode expected as object");
    return function(t5, e4, r4) {
      return ea(t5, o3, a3(t5, e4, r4));
    };
  }, a2.prototype.forEach = function(t4) {
    t4(this.object, "object", this), this.index && t4(this.index, "index", this), t4(this.value, "value", this);
  }, a2.prototype.map = function(t4) {
    return new a2(this._ifNode(t4(this.object, "object", this)), this.index ? this._ifNode(t4(this.index, "index", this)) : null, this._ifNode(t4(this.value, "value", this)));
  }, a2.prototype.clone = function() {
    return new a2(this.object, this.index, this.value);
  }, a2.prototype._toString = function(t4) {
    var e3 = this.object.toString(t4), r3 = this.index ? this.index.toString(t4) : "", n3 = this.value.toString(t4);
    return o2(this, t4 && t4.parenthesis) && (n3 = "(" + n3 + ")"), e3 + r3 + " = " + n3;
  }, a2.prototype.toJSON = function() {
    return {mathjs: "AssignmentNode", object: this.object, index: this.index, value: this.value};
  }, a2.fromJSON = function(t4) {
    return new a2(t4.object, t4.index, t4.value);
  }, a2.prototype.toHTML = function(t4) {
    var e3 = this.object.toHTML(t4), r3 = this.index ? this.index.toHTML(t4) : "", n3 = this.value.toHTML(t4);
    return o2(this, t4 && t4.parenthesis) && (n3 = '<span class="math-paranthesis math-round-parenthesis">(</span>' + n3 + '<span class="math-paranthesis math-round-parenthesis">)</span>'), e3 + r3 + '<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + n3;
  }, a2.prototype._toTex = function(t4) {
    var e3 = this.object.toTex(t4), r3 = this.index ? this.index.toTex(t4) : "", n3 = this.value.toTex(t4);
    return o2(this, t4 && t4.parenthesis) && (n3 = "\\left(".concat(n3, "\\right)")), e3 + r3 + ":=" + n3;
  }, a2;
}, {isClass: true, isNode: true}), Xa = cn("BlockNode", ["ResultSet", "Node"], (t3) => {
  var {ResultSet: e2, Node: r2} = t3;
  function n2(t4) {
    if (!(this instanceof n2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!Array.isArray(t4))
      throw new Error("Array expected");
    this.blocks = t4.map(function(t5) {
      var e3 = t5 && t5.node, r3 = !t5 || t5.visible === void 0 || t5.visible;
      if (!ir(e3))
        throw new TypeError('Property "node" must be a Node');
      if (typeof r3 != "boolean")
        throw new TypeError('Property "visible" must be a boolean');
      return {node: e3, visible: r3};
    });
  }
  return n2.prototype = new r2(), n2.prototype.type = "BlockNode", n2.prototype.isBlockNode = true, n2.prototype._compile = function(t4, r3) {
    var n3 = sn(this.blocks, function(e3) {
      return {evaluate: e3.node._compile(t4, r3), visible: e3.visible};
    });
    return function(t5, r4, i2) {
      var s2 = [];
      return an(n3, function(e3) {
        var n4 = e3.evaluate(t5, r4, i2);
        e3.visible && s2.push(n4);
      }), new e2(s2);
    };
  }, n2.prototype.forEach = function(t4) {
    for (var e3 = 0; e3 < this.blocks.length; e3++)
      t4(this.blocks[e3].node, "blocks[" + e3 + "].node", this);
  }, n2.prototype.map = function(t4) {
    for (var e3 = [], r3 = 0; r3 < this.blocks.length; r3++) {
      var i2 = this.blocks[r3], s2 = this._ifNode(t4(i2.node, "blocks[" + r3 + "].node", this));
      e3[r3] = {node: s2, visible: i2.visible};
    }
    return new n2(e3);
  }, n2.prototype.clone = function() {
    return new n2(this.blocks.map(function(t4) {
      return {node: t4.node, visible: t4.visible};
    }));
  }, n2.prototype._toString = function(t4) {
    return this.blocks.map(function(e3) {
      return e3.node.toString(t4) + (e3.visible ? "" : ";");
    }).join("\n");
  }, n2.prototype.toJSON = function() {
    return {mathjs: "BlockNode", blocks: this.blocks};
  }, n2.fromJSON = function(t4) {
    return new n2(t4.blocks);
  }, n2.prototype.toHTML = function(t4) {
    return this.blocks.map(function(e3) {
      return e3.node.toHTML(t4) + (e3.visible ? "" : '<span class="math-separator">;</span>');
    }).join('<span class="math-separator"><br /></span>');
  }, n2.prototype._toTex = function(t4) {
    return this.blocks.map(function(e3) {
      return e3.node.toTex(t4) + (e3.visible ? "" : ";");
    }).join("\\;\\;\n");
  }, n2;
}, {isClass: true, isNode: true}), Qa = cn("ConditionalNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4, e3, n2) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!ir(t4))
      throw new TypeError("Parameter condition must be a Node");
    if (!ir(e3))
      throw new TypeError("Parameter trueExpr must be a Node");
    if (!ir(n2))
      throw new TypeError("Parameter falseExpr must be a Node");
    this.condition = t4, this.trueExpr = e3, this.falseExpr = n2;
  }
  return r2.prototype = new e2(), r2.prototype.type = "ConditionalNode", r2.prototype.isConditionalNode = true, r2.prototype._compile = function(t4, e3) {
    var r3 = this.condition._compile(t4, e3), n2 = this.trueExpr._compile(t4, e3), i2 = this.falseExpr._compile(t4, e3);
    return function(t5, e4, s2) {
      return function(t6) {
        if (typeof t6 == "number" || typeof t6 == "boolean" || typeof t6 == "string")
          return !!t6;
        if (t6) {
          if (Oe(t6))
            return !t6.isZero();
          if (ze(t6))
            return !(!t6.re && !t6.im);
          if (Ce(t6))
            return !!t6.value;
        }
        if (t6 == null)
          return false;
        throw new TypeError('Unsupported type of condition "' + lr(t6) + '"');
      }(r3(t5, e4, s2)) ? n2(t5, e4, s2) : i2(t5, e4, s2);
    };
  }, r2.prototype.forEach = function(t4) {
    t4(this.condition, "condition", this), t4(this.trueExpr, "trueExpr", this), t4(this.falseExpr, "falseExpr", this);
  }, r2.prototype.map = function(t4) {
    return new r2(this._ifNode(t4(this.condition, "condition", this)), this._ifNode(t4(this.trueExpr, "trueExpr", this)), this._ifNode(t4(this.falseExpr, "falseExpr", this)));
  }, r2.prototype.clone = function() {
    return new r2(this.condition, this.trueExpr, this.falseExpr);
  }, r2.prototype._toString = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Ga(this, e3), n2 = this.condition.toString(t4), i2 = Ga(this.condition, e3);
    (e3 === "all" || this.condition.type === "OperatorNode" || i2 !== null && i2 <= r3) && (n2 = "(" + n2 + ")");
    var s2 = this.trueExpr.toString(t4), a2 = Ga(this.trueExpr, e3);
    (e3 === "all" || this.trueExpr.type === "OperatorNode" || a2 !== null && a2 <= r3) && (s2 = "(" + s2 + ")");
    var o2 = this.falseExpr.toString(t4), u2 = Ga(this.falseExpr, e3);
    return (e3 === "all" || this.falseExpr.type === "OperatorNode" || u2 !== null && u2 <= r3) && (o2 = "(" + o2 + ")"), n2 + " ? " + s2 + " : " + o2;
  }, r2.prototype.toJSON = function() {
    return {mathjs: "ConditionalNode", condition: this.condition, trueExpr: this.trueExpr, falseExpr: this.falseExpr};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.condition, t4.trueExpr, t4.falseExpr);
  }, r2.prototype.toHTML = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Ga(this, e3), n2 = this.condition.toHTML(t4), i2 = Ga(this.condition, e3);
    (e3 === "all" || this.condition.type === "OperatorNode" || i2 !== null && i2 <= r3) && (n2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + n2 + '<span class="math-parenthesis math-round-parenthesis">)</span>');
    var s2 = this.trueExpr.toHTML(t4), a2 = Ga(this.trueExpr, e3);
    (e3 === "all" || this.trueExpr.type === "OperatorNode" || a2 !== null && a2 <= r3) && (s2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + s2 + '<span class="math-parenthesis math-round-parenthesis">)</span>');
    var o2 = this.falseExpr.toHTML(t4), u2 = Ga(this.falseExpr, e3);
    return (e3 === "all" || this.falseExpr.type === "OperatorNode" || u2 !== null && u2 <= r3) && (o2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + o2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), n2 + '<span class="math-operator math-conditional-operator">?</span>' + s2 + '<span class="math-operator math-conditional-operator">:</span>' + o2;
  }, r2.prototype._toTex = function(t4) {
    return "\\begin{cases} {" + this.trueExpr.toTex(t4) + "}, &\\quad{\\text{if }\\;" + this.condition.toTex(t4) + "}\\\\{" + this.falseExpr.toTex(t4) + "}, &\\quad{\\text{otherwise}}\\end{cases}";
  }, r2;
}, {isClass: true, isNode: true}), Ja = Object.assign || function(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = arguments[e2];
    for (var n2 in r2)
      Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
  }
  return t3;
}, Ka = {"{": "\\{", "}": "\\}", "\\": "\\textbackslash{}", "#": "\\#", $: "\\$", "%": "\\%", "&": "\\&", "^": "\\textasciicircum{}", _: "\\_", "~": "\\textasciitilde{}"}, to = {"\u2013": "\\--", "\u2014": "\\---", " ": "~", "	": "\\qquad{}", "\r\n": "\\newline{}", "\n": "\\newline{}"}, eo = function(t3, e2) {
  return Ja({}, t3, e2);
}, ro = {Alpha: "A", alpha: "\\alpha", Beta: "B", beta: "\\beta", Gamma: "\\Gamma", gamma: "\\gamma", Delta: "\\Delta", delta: "\\delta", Epsilon: "E", epsilon: "\\epsilon", varepsilon: "\\varepsilon", Zeta: "Z", zeta: "\\zeta", Eta: "H", eta: "\\eta", Theta: "\\Theta", theta: "\\theta", vartheta: "\\vartheta", Iota: "I", iota: "\\iota", Kappa: "K", kappa: "\\kappa", varkappa: "\\varkappa", Lambda: "\\Lambda", lambda: "\\lambda", Mu: "M", mu: "\\mu", Nu: "N", nu: "\\nu", Xi: "\\Xi", xi: "\\xi", Omicron: "O", omicron: "o", Pi: "\\Pi", pi: "\\pi", varpi: "\\varpi", Rho: "P", rho: "\\rho", varrho: "\\varrho", Sigma: "\\Sigma", sigma: "\\sigma", varsigma: "\\varsigma", Tau: "T", tau: "\\tau", Upsilon: "\\Upsilon", upsilon: "\\upsilon", Phi: "\\Phi", phi: "\\phi", varphi: "\\varphi", Chi: "X", chi: "\\chi", Psi: "\\Psi", psi: "\\psi", Omega: "\\Omega", omega: "\\omega", true: "\\mathrm{True}", false: "\\mathrm{False}", i: "i", inf: "\\infty", Inf: "\\infty", infinity: "\\infty", Infinity: "\\infty", oo: "\\infty", lim: "\\lim", undefined: "\\mathbf{?}"}, no = {transpose: "^\\top", ctranspose: "^H", factorial: "!", pow: "^", dotPow: ".^\\wedge", unaryPlus: "+", unaryMinus: "-", bitNot: "\\~", not: "\\neg", multiply: "\\cdot", divide: "\\frac", dotMultiply: ".\\cdot", dotDivide: ".:", mod: "\\mod", add: "+", subtract: "-", to: "\\rightarrow", leftShift: "<<", rightArithShift: ">>", rightLogShift: ">>>", equal: "=", unequal: "\\neq", smaller: "<", larger: ">", smallerEq: "\\leq", largerEq: "\\geq", bitAnd: "\\&", bitXor: "\\underline{|}", bitOr: "|", and: "\\wedge", xor: "\\veebar", or: "\\vee"}, io = {abs: {1: "\\left|${args[0]}\\right|"}, add: {2: "\\left(${args[0]}".concat(no.add, "${args[1]}\\right)")}, cbrt: {1: "\\sqrt[3]{${args[0]}}"}, ceil: {1: "\\left\\lceil${args[0]}\\right\\rceil"}, cube: {1: "\\left(${args[0]}\\right)^3"}, divide: {2: "\\frac{${args[0]}}{${args[1]}}"}, dotDivide: {2: "\\left(${args[0]}".concat(no.dotDivide, "${args[1]}\\right)")}, dotMultiply: {2: "\\left(${args[0]}".concat(no.dotMultiply, "${args[1]}\\right)")}, dotPow: {2: "\\left(${args[0]}".concat(no.dotPow, "${args[1]}\\right)")}, exp: {1: "\\exp\\left(${args[0]}\\right)"}, expm1: "\\left(e".concat(no.pow, "{${args[0]}}-1\\right)"), fix: {1: "\\mathrm{${name}}\\left(${args[0]}\\right)"}, floor: {1: "\\left\\lfloor${args[0]}\\right\\rfloor"}, gcd: "\\gcd\\left(${args}\\right)", hypot: "\\hypot\\left(${args}\\right)", log: {1: "\\ln\\left(${args[0]}\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}\\right)"}, log10: {1: "\\log_{10}\\left(${args[0]}\\right)"}, log1p: {1: "\\ln\\left(${args[0]}+1\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}+1\\right)"}, log2: "\\log_{2}\\left(${args[0]}\\right)", mod: {2: "\\left(${args[0]}".concat(no.mod, "${args[1]}\\right)")}, multiply: {2: "\\left(${args[0]}".concat(no.multiply, "${args[1]}\\right)")}, norm: {1: "\\left\\|${args[0]}\\right\\|", 2: void 0}, nthRoot: {2: "\\sqrt[${args[1]}]{${args[0]}}"}, nthRoots: {2: "\\{y : $y^{args[1]} = {${args[0]}}\\}"}, pow: {2: "\\left(${args[0]}\\right)".concat(no.pow, "{${args[1]}}")}, round: {1: "\\left\\lfloor${args[0]}\\right\\rceil", 2: void 0}, sign: {1: "\\mathrm{${name}}\\left(${args[0]}\\right)"}, sqrt: {1: "\\sqrt{${args[0]}}"}, square: {1: "\\left(${args[0]}\\right)^2"}, subtract: {2: "\\left(${args[0]}".concat(no.subtract, "${args[1]}\\right)")}, unaryMinus: {1: "".concat(no.unaryMinus, "\\left(${args[0]}\\right)")}, unaryPlus: {1: "".concat(no.unaryPlus, "\\left(${args[0]}\\right)")}, bitAnd: {2: "\\left(${args[0]}".concat(no.bitAnd, "${args[1]}\\right)")}, bitNot: {1: no.bitNot + "\\left(${args[0]}\\right)"}, bitOr: {2: "\\left(${args[0]}".concat(no.bitOr, "${args[1]}\\right)")}, bitXor: {2: "\\left(${args[0]}".concat(no.bitXor, "${args[1]}\\right)")}, leftShift: {2: "\\left(${args[0]}".concat(no.leftShift, "${args[1]}\\right)")}, rightArithShift: {2: "\\left(${args[0]}".concat(no.rightArithShift, "${args[1]}\\right)")}, rightLogShift: {2: "\\left(${args[0]}".concat(no.rightLogShift, "${args[1]}\\right)")}, bellNumbers: {1: "\\mathrm{B}_{${args[0]}}"}, catalan: {1: "\\mathrm{C}_{${args[0]}}"}, stirlingS2: {2: "\\mathrm{S}\\left(${args}\\right)"}, arg: {1: "\\arg\\left(${args[0]}\\right)"}, conj: {1: "\\left(${args[0]}\\right)^*"}, im: {1: "\\Im\\left\\lbrace${args[0]}\\right\\rbrace"}, re: {1: "\\Re\\left\\lbrace${args[0]}\\right\\rbrace"}, and: {2: "\\left(${args[0]}".concat(no.and, "${args[1]}\\right)")}, not: {1: no.not + "\\left(${args[0]}\\right)"}, or: {2: "\\left(${args[0]}".concat(no.or, "${args[1]}\\right)")}, xor: {2: "\\left(${args[0]}".concat(no.xor, "${args[1]}\\right)")}, cross: {2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"}, ctranspose: {1: "\\left(${args[0]}\\right)".concat(no.ctranspose)}, det: {1: "\\det\\left(${args[0]}\\right)"}, dot: {2: "\\left(${args[0]}\\cdot${args[1]}\\right)"}, expm: {1: "\\exp\\left(${args[0]}\\right)"}, inv: {1: "\\left(${args[0]}\\right)^{-1}"}, sqrtm: {1: "{${args[0]}}".concat(no.pow, "{\\frac{1}{2}}")}, trace: {1: "\\mathrm{tr}\\left(${args[0]}\\right)"}, transpose: {1: "\\left(${args[0]}\\right)".concat(no.transpose)}, combinations: {2: "\\binom{${args[0]}}{${args[1]}}"}, combinationsWithRep: {2: "\\left(\\!\\!{\\binom{${args[0]}}{${args[1]}}}\\!\\!\\right)"}, factorial: {1: "\\left(${args[0]}\\right)".concat(no.factorial)}, gamma: {1: "\\Gamma\\left(${args[0]}\\right)"}, equal: {2: "\\left(${args[0]}".concat(no.equal, "${args[1]}\\right)")}, larger: {2: "\\left(${args[0]}".concat(no.larger, "${args[1]}\\right)")}, largerEq: {2: "\\left(${args[0]}".concat(no.largerEq, "${args[1]}\\right)")}, smaller: {2: "\\left(${args[0]}".concat(no.smaller, "${args[1]}\\right)")}, smallerEq: {2: "\\left(${args[0]}".concat(no.smallerEq, "${args[1]}\\right)")}, unequal: {2: "\\left(${args[0]}".concat(no.unequal, "${args[1]}\\right)")}, erf: {1: "erf\\left(${args[0]}\\right)"}, max: "\\max\\left(${args}\\right)", min: "\\min\\left(${args}\\right)", variance: "\\mathrm{Var}\\left(${args}\\right)", acos: {1: "\\cos^{-1}\\left(${args[0]}\\right)"}, acosh: {1: "\\cosh^{-1}\\left(${args[0]}\\right)"}, acot: {1: "\\cot^{-1}\\left(${args[0]}\\right)"}, acoth: {1: "\\coth^{-1}\\left(${args[0]}\\right)"}, acsc: {1: "\\csc^{-1}\\left(${args[0]}\\right)"}, acsch: {1: "\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"}, asec: {1: "\\sec^{-1}\\left(${args[0]}\\right)"}, asech: {1: "\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"}, asin: {1: "\\sin^{-1}\\left(${args[0]}\\right)"}, asinh: {1: "\\sinh^{-1}\\left(${args[0]}\\right)"}, atan: {1: "\\tan^{-1}\\left(${args[0]}\\right)"}, atan2: {2: "\\mathrm{atan2}\\left(${args}\\right)"}, atanh: {1: "\\tanh^{-1}\\left(${args[0]}\\right)"}, cos: {1: "\\cos\\left(${args[0]}\\right)"}, cosh: {1: "\\cosh\\left(${args[0]}\\right)"}, cot: {1: "\\cot\\left(${args[0]}\\right)"}, coth: {1: "\\coth\\left(${args[0]}\\right)"}, csc: {1: "\\csc\\left(${args[0]}\\right)"}, csch: {1: "\\mathrm{csch}\\left(${args[0]}\\right)"}, sec: {1: "\\sec\\left(${args[0]}\\right)"}, sech: {1: "\\mathrm{sech}\\left(${args[0]}\\right)"}, sin: {1: "\\sin\\left(${args[0]}\\right)"}, sinh: {1: "\\sinh\\left(${args[0]}\\right)"}, tan: {1: "\\tan\\left(${args[0]}\\right)"}, tanh: {1: "\\tanh\\left(${args[0]}\\right)"}, to: {2: "\\left(${args[0]}".concat(no.to, "${args[1]}\\right)")}, numeric: function(t3, e2) {
  return t3.args[0].toTex();
}, number: {0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"}, string: {0: '\\mathtt{""}', 1: "\\mathrm{string}\\left(${args[0]}\\right)"}, bignumber: {0: "0", 1: "\\left(${args[0]}\\right)"}, complex: {0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)+".concat(ro.i, "\\cdot\\left(${args[1]}\\right)\\right)")}, matrix: {0: "\\begin{bmatrix}\\end{bmatrix}", 1: "\\left(${args[0]}\\right)", 2: "\\left(${args[0]}\\right)"}, sparse: {0: "\\begin{bsparse}\\end{bsparse}", 1: "\\left(${args[0]}\\right)"}, unit: {1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"}}, so = {deg: "^\\circ"};
function ao(t3) {
  return function(t4) {
    for (var e2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r2 = e2.preserveFormatting, n2 = r2 !== void 0 && r2, i2 = e2.escapeMapFn, s2 = i2 === void 0 ? eo : i2, a2 = String(t4), o2 = "", u2 = s2(Ja({}, Ka), n2 ? Ja({}, to) : {}), h = Object.keys(u2), c2 = function() {
      var t5 = false;
      h.forEach(function(e3, r3) {
        t5 || a2.length >= e3.length && a2.slice(0, e3.length) === e3 && (o2 += u2[h[r3]], a2 = a2.slice(e3.length, a2.length), t5 = true);
      }), t5 || (o2 += a2.slice(0, 1), a2 = a2.slice(1, a2.length));
    }; a2; )
      c2();
    return o2;
  }(t3, {preserveFormatting: true});
}
function oo(t3, e2) {
  return (e2 = e2 !== void 0 && e2) ? wr(so, t3) ? so[t3] : "\\mathrm{" + ao(t3) + "}" : wr(ro, t3) ? ro[t3] : ao(t3);
}
var uo = cn("ConstantNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    this.value = t4;
  }
  return r2.prototype = new e2(), r2.prototype.type = "ConstantNode", r2.prototype.isConstantNode = true, r2.prototype._compile = function(t4, e3) {
    var r3 = this.value;
    return function() {
      return r3;
    };
  }, r2.prototype.forEach = function(t4) {
  }, r2.prototype.map = function(t4) {
    return this.clone();
  }, r2.prototype.clone = function() {
    return new r2(this.value);
  }, r2.prototype._toString = function(t4) {
    return Hr(this.value, t4);
  }, r2.prototype.toHTML = function(t4) {
    var e3 = this._toString(t4);
    switch (lr(this.value)) {
      case "number":
      case "BigNumber":
      case "Fraction":
        return '<span class="math-number">' + e3 + "</span>";
      case "string":
        return '<span class="math-string">' + e3 + "</span>";
      case "boolean":
        return '<span class="math-boolean">' + e3 + "</span>";
      case "null":
        return '<span class="math-null-symbol">' + e3 + "</span>";
      case "undefined":
        return '<span class="math-undefined">' + e3 + "</span>";
      default:
        return '<span class="math-symbol">' + e3 + "</span>";
    }
  }, r2.prototype.toJSON = function() {
    return {mathjs: "ConstantNode", value: this.value};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.value);
  }, r2.prototype._toTex = function(t4) {
    var e3 = this._toString(t4);
    switch (lr(this.value)) {
      case "string":
        return "\\mathtt{" + ao(e3) + "}";
      case "number":
      case "BigNumber":
        if (!isFinite(this.value))
          return this.value.valueOf() < 0 ? "-\\infty" : "\\infty";
        var r3 = e3.toLowerCase().indexOf("e");
        return r3 !== -1 ? e3.substring(0, r3) + "\\cdot10^{" + e3.substring(r3 + 1) + "}" : e3;
      case "Fraction":
        return this.value.toLatex();
      default:
        return e3;
    }
  }, r2;
}, {isClass: true, isNode: true}), ho = cn("FunctionAssignmentNode", ["typed", "Node"], (t3) => {
  var {typed: e2, Node: r2} = t3;
  function n2(t4, e3, r3) {
    if (!(this instanceof n2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (typeof t4 != "string")
      throw new TypeError('String expected for parameter "name"');
    if (!Array.isArray(e3))
      throw new TypeError('Array containing strings or objects expected for parameter "params"');
    if (!ir(r3))
      throw new TypeError('Node expected for parameter "expr"');
    if (t4 in Pa)
      throw new Error('Illegal function name, "' + t4 + '" is a reserved keyword');
    this.name = t4, this.params = e3.map(function(t5) {
      return t5 && t5.name || t5;
    }), this.types = e3.map(function(t5) {
      return t5 && t5.type || "any";
    }), this.expr = r3;
  }
  function i2(t4, e3) {
    var r3 = Ga(t4, e3), n3 = Ga(t4.expr, e3);
    return e3 === "all" || n3 !== null && n3 <= r3;
  }
  return n2.prototype = new r2(), n2.prototype.type = "FunctionAssignmentNode", n2.prototype.isFunctionAssignmentNode = true, n2.prototype._compile = function(t4, r3) {
    var n3 = Object.create(r3);
    an(this.params, function(t5) {
      n3[t5] = true;
    });
    var i3 = this.expr._compile(t4, n3), s2 = this.name, a2 = this.params, o2 = on(this.types, ","), u2 = s2 + "(" + on(this.params, ", ") + ")";
    return function(t5, r4, n4) {
      var h = {};
      h[o2] = function() {
        for (var e3 = Object.create(r4), s3 = 0; s3 < a2.length; s3++)
          e3[a2[s3]] = arguments[s3];
        return i3(t5, e3, n4);
      };
      var c2 = e2(s2, h);
      return c2.syntax = u2, ea(t5, s2, c2), c2;
    };
  }, n2.prototype.forEach = function(t4) {
    t4(this.expr, "expr", this);
  }, n2.prototype.map = function(t4) {
    var e3 = this._ifNode(t4(this.expr, "expr", this));
    return new n2(this.name, this.params.slice(0), e3);
  }, n2.prototype.clone = function() {
    return new n2(this.name, this.params.slice(0), this.expr);
  }, n2.prototype._toString = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = this.expr.toString(t4);
    return i2(this, e3) && (r3 = "(" + r3 + ")"), this.name + "(" + this.params.join(", ") + ") = " + r3;
  }, n2.prototype.toJSON = function() {
    var t4 = this.types;
    return {mathjs: "FunctionAssignmentNode", name: this.name, params: this.params.map(function(e3, r3) {
      return {name: e3, type: t4[r3]};
    }), expr: this.expr};
  }, n2.fromJSON = function(t4) {
    return new n2(t4.name, t4.params, t4.expr);
  }, n2.prototype.toHTML = function(t4) {
    for (var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = [], n3 = 0; n3 < this.params.length; n3++)
      r3.push('<span class="math-symbol math-parameter">' + $r(this.params[n3]) + "</span>");
    var s2 = this.expr.toHTML(t4);
    return i2(this, e3) && (s2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + s2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), '<span class="math-function">' + $r(this.name) + '</span><span class="math-parenthesis math-round-parenthesis">(</span>' + r3.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + s2;
  }, n2.prototype._toTex = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = this.expr.toTex(t4);
    return i2(this, e3) && (r3 = "\\left(".concat(r3, "\\right)")), "\\mathrm{" + this.name + "}\\left(" + this.params.map(oo).join(",") + "\\right):=" + r3;
  }, n2;
}, {isClass: true, isNode: true}), co = cn("IndexNode", ["Range", "Node", "size"], (t3) => {
  var {Range: e2, Node: r2, size: n2} = t3;
  function i2(t4, e3) {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (this.dimensions = t4, this.dotNotation = e3 || false, !Array.isArray(t4) || !t4.every(ir))
      throw new TypeError('Array containing Nodes expected for parameter "dimensions"');
    if (this.dotNotation && !this.isObjectProperty())
      throw new Error("dotNotation only applicable for object properties");
  }
  function s2(t4, r3, n3) {
    return new e2(Oe(t4) ? t4.toNumber() : t4, Oe(r3) ? r3.toNumber() : r3, Oe(n3) ? n3.toNumber() : n3);
  }
  return i2.prototype = new r2(), i2.prototype.type = "IndexNode", i2.prototype.isIndexNode = true, i2.prototype._compile = function(t4, e3) {
    var r3 = sn(this.dimensions, function(r4, i4) {
      if (ur(r4)) {
        if (r4.needsEnd()) {
          var a2 = Object.create(e3);
          a2.end = true;
          var o2 = r4.start._compile(t4, a2), u2 = r4.end._compile(t4, a2), h = r4.step ? r4.step._compile(t4, a2) : function() {
            return 1;
          };
          return function(t5, e4, r5) {
            var a3 = n2(r5).valueOf(), c3 = Object.create(e4);
            return c3.end = a3[i4], s2(o2(t5, c3, r5), u2(t5, c3, r5), h(t5, c3, r5));
          };
        }
        var c2 = r4.start._compile(t4, e3), l2 = r4.end._compile(t4, e3), p2 = r4.step ? r4.step._compile(t4, e3) : function() {
          return 1;
        };
        return function(t5, e4, r5) {
          return s2(c2(t5, e4, r5), l2(t5, e4, r5), p2(t5, e4, r5));
        };
      }
      if (hr(r4) && r4.name === "end") {
        var f2 = Object.create(e3);
        f2.end = true;
        var d2 = r4._compile(t4, f2);
        return function(t5, e4, r5) {
          var s3 = n2(r5).valueOf(), a3 = Object.create(e4);
          return a3.end = s3[i4], d2(t5, a3, r5);
        };
      }
      var m2 = r4._compile(t4, e3);
      return function(t5, e4, r5) {
        return m2(t5, e4, r5);
      };
    }), i3 = ta(t4, "index");
    return function(t5, e4, n3) {
      var s3 = sn(r3, function(r4) {
        return r4(t5, e4, n3);
      });
      return i3(...s3);
    };
  }, i2.prototype.forEach = function(t4) {
    for (var e3 = 0; e3 < this.dimensions.length; e3++)
      t4(this.dimensions[e3], "dimensions[" + e3 + "]", this);
  }, i2.prototype.map = function(t4) {
    for (var e3 = [], r3 = 0; r3 < this.dimensions.length; r3++)
      e3[r3] = this._ifNode(t4(this.dimensions[r3], "dimensions[" + r3 + "]", this));
    return new i2(e3, this.dotNotation);
  }, i2.prototype.clone = function() {
    return new i2(this.dimensions.slice(0), this.dotNotation);
  }, i2.prototype.isObjectProperty = function() {
    return this.dimensions.length === 1 && tr(this.dimensions[0]) && typeof this.dimensions[0].value == "string";
  }, i2.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this.dimensions[0].value : null;
  }, i2.prototype._toString = function(t4) {
    return this.dotNotation ? "." + this.getObjectProperty() : "[" + this.dimensions.join(", ") + "]";
  }, i2.prototype.toJSON = function() {
    return {mathjs: "IndexNode", dimensions: this.dimensions, dotNotation: this.dotNotation};
  }, i2.fromJSON = function(t4) {
    return new i2(t4.dimensions, t4.dotNotation);
  }, i2.prototype.toHTML = function(t4) {
    for (var e3 = [], r3 = 0; r3 < this.dimensions.length; r3++)
      e3[r3] = this.dimensions[r3].toHTML();
    return this.dotNotation ? '<span class="math-operator math-accessor-operator">.</span><span class="math-symbol math-property">' + $r(this.getObjectProperty()) + "</span>" : '<span class="math-parenthesis math-square-parenthesis">[</span>' + e3.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
  }, i2.prototype._toTex = function(t4) {
    var e3 = this.dimensions.map(function(e4) {
      return e4.toTex(t4);
    });
    return this.dotNotation ? "." + this.getObjectProperty() : "_{" + e3.join(",") + "}";
  }, i2;
}, {isClass: true, isNode: true}), lo = cn("ObjectNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (this.properties = t4 || {}, t4 && (typeof t4 != "object" || !Object.keys(t4).every(function(e3) {
      return ir(t4[e3]);
    })))
      throw new TypeError("Object containing Nodes expected");
  }
  return r2.prototype = new e2(), r2.prototype.type = "ObjectNode", r2.prototype.isObjectNode = true, r2.prototype._compile = function(t4, e3) {
    var r3 = {};
    for (var n2 in this.properties)
      if (wr(this.properties, n2)) {
        var i2 = Vr(n2), s2 = JSON.parse(i2);
        if (!ra(this.properties, s2))
          throw new Error('No access to property "' + s2 + '"');
        r3[s2] = this.properties[n2]._compile(t4, e3);
      }
    return function(t5, e4, n3) {
      var i3 = {};
      for (var s3 in r3)
        wr(r3, s3) && (i3[s3] = r3[s3](t5, e4, n3));
      return i3;
    };
  }, r2.prototype.forEach = function(t4) {
    for (var e3 in this.properties)
      wr(this.properties, e3) && t4(this.properties[e3], "properties[" + Vr(e3) + "]", this);
  }, r2.prototype.map = function(t4) {
    var e3 = {};
    for (var n2 in this.properties)
      wr(this.properties, n2) && (e3[n2] = this._ifNode(t4(this.properties[n2], "properties[" + Vr(n2) + "]", this)));
    return new r2(e3);
  }, r2.prototype.clone = function() {
    var t4 = {};
    for (var e3 in this.properties)
      wr(this.properties, e3) && (t4[e3] = this.properties[e3]);
    return new r2(t4);
  }, r2.prototype._toString = function(t4) {
    var e3 = [];
    for (var r3 in this.properties)
      wr(this.properties, r3) && e3.push(Vr(r3) + ": " + this.properties[r3].toString(t4));
    return "{" + e3.join(", ") + "}";
  }, r2.prototype.toJSON = function() {
    return {mathjs: "ObjectNode", properties: this.properties};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.properties);
  }, r2.prototype.toHTML = function(t4) {
    var e3 = [];
    for (var r3 in this.properties)
      wr(this.properties, r3) && e3.push('<span class="math-symbol math-property">' + $r(r3) + '</span><span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' + this.properties[r3].toHTML(t4));
    return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + e3.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>';
  }, r2.prototype._toTex = function(t4) {
    var e3 = [];
    for (var r3 in this.properties)
      wr(this.properties, r3) && e3.push("\\mathbf{" + r3 + ":} & " + this.properties[r3].toTex(t4) + "\\\\");
    return "\\left\\{\\begin{array}{ll}".concat(e3.join("\n"), "\\end{array}\\right\\}");
  }, r2;
}, {isClass: true, isNode: true}), po = cn("OperatorNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4, e3, n3, i2) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (typeof t4 != "string")
      throw new TypeError('string expected for parameter "op"');
    if (typeof e3 != "string")
      throw new TypeError('string expected for parameter "fn"');
    if (!Array.isArray(n3) || !n3.every(ir))
      throw new TypeError('Array containing Nodes expected for parameter "args"');
    this.implicit = i2 === true, this.op = t4, this.fn = e3, this.args = n3 || [];
  }
  function n2(t4, e3, r3, n3, i2) {
    var s2, a2 = Ga(t4, e3), o2 = Wa(t4, e3);
    if (e3 === "all" || n3.length > 2 && t4.getIdentifier() !== "OperatorNode:add" && t4.getIdentifier() !== "OperatorNode:multiply")
      return n3.map(function(t5) {
        switch (t5.getContent().type) {
          case "ArrayNode":
          case "ConstantNode":
          case "SymbolNode":
          case "ParenthesisNode":
            return false;
          default:
            return true;
        }
      });
    switch (n3.length) {
      case 0:
        s2 = [];
        break;
      case 1:
        var u2 = Ga(n3[0], e3);
        if (i2 && u2 !== null) {
          var h, c2;
          if (e3 === "keep" ? (h = n3[0].getIdentifier(), c2 = t4.getIdentifier()) : (h = n3[0].getContent().getIdentifier(), c2 = t4.getContent().getIdentifier()), $a[a2][c2].latexLeftParens === false) {
            s2 = [false];
            break;
          }
          if ($a[u2][h].latexParens === false) {
            s2 = [false];
            break;
          }
        }
        if (u2 === null) {
          s2 = [false];
          break;
        }
        if (u2 <= a2) {
          s2 = [true];
          break;
        }
        s2 = [false];
        break;
      case 2:
        var l2, p2, f2 = Ga(n3[0], e3), d2 = Ya(t4, n3[0], e3);
        l2 = f2 !== null && (f2 === a2 && o2 === "right" && !d2 || f2 < a2);
        var m2, y2, g2, v = Ga(n3[1], e3), x = Ya(t4, n3[1], e3);
        if (p2 = v !== null && (v === a2 && o2 === "left" && !x || v < a2), i2)
          e3 === "keep" ? (m2 = t4.getIdentifier(), y2 = t4.args[0].getIdentifier(), g2 = t4.args[1].getIdentifier()) : (m2 = t4.getContent().getIdentifier(), y2 = t4.args[0].getContent().getIdentifier(), g2 = t4.args[1].getContent().getIdentifier()), f2 !== null && ($a[a2][m2].latexLeftParens === false && (l2 = false), $a[f2][y2].latexParens === false && (l2 = false)), v !== null && ($a[a2][m2].latexRightParens === false && (p2 = false), $a[v][g2].latexParens === false && (p2 = false));
        s2 = [l2, p2];
        break;
      default:
        t4.getIdentifier() !== "OperatorNode:add" && t4.getIdentifier() !== "OperatorNode:multiply" || (s2 = n3.map(function(r4) {
          var n4 = Ga(r4, e3), i3 = Ya(t4, r4, e3), s3 = Wa(r4, e3);
          return n4 !== null && (a2 === n4 && o2 === s3 && !i3 || n4 < a2);
        }));
    }
    return n3.length >= 2 && t4.getIdentifier() === "OperatorNode:multiply" && t4.implicit && e3 === "auto" && r3 === "hide" && (s2 = n3.map(function(t5, e4) {
      var r4 = t5.getIdentifier() === "ParenthesisNode";
      return !(!s2[e4] && !r4);
    })), s2;
  }
  return r2.prototype = new e2(), r2.prototype.type = "OperatorNode", r2.prototype.isOperatorNode = true, r2.prototype._compile = function(t4, e3) {
    if (typeof this.fn != "string" || !na(t4, this.fn))
      throw t4[this.fn] ? new Error('No access to function "' + this.fn + '"') : new Error("Function " + this.fn + ' missing in provided namespace "math"');
    var r3 = ta(t4, this.fn), n3 = sn(this.args, function(r4) {
      return r4._compile(t4, e3);
    });
    if (n3.length === 1) {
      var i2 = n3[0];
      return function(t5, e4, n4) {
        return r3(i2(t5, e4, n4));
      };
    }
    if (n3.length === 2) {
      var s2 = n3[0], a2 = n3[1];
      return function(t5, e4, n4) {
        return r3(s2(t5, e4, n4), a2(t5, e4, n4));
      };
    }
    return function(t5, e4, i3) {
      return r3.apply(null, sn(n3, function(r4) {
        return r4(t5, e4, i3);
      }));
    };
  }, r2.prototype.forEach = function(t4) {
    for (var e3 = 0; e3 < this.args.length; e3++)
      t4(this.args[e3], "args[" + e3 + "]", this);
  }, r2.prototype.map = function(t4) {
    for (var e3 = [], n3 = 0; n3 < this.args.length; n3++)
      e3[n3] = this._ifNode(t4(this.args[n3], "args[" + n3 + "]", this));
    return new r2(this.op, this.fn, e3, this.implicit);
  }, r2.prototype.clone = function() {
    return new r2(this.op, this.fn, this.args.slice(0), this.implicit);
  }, r2.prototype.isUnary = function() {
    return this.args.length === 1;
  }, r2.prototype.isBinary = function() {
    return this.args.length === 2;
  }, r2.prototype._toString = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = t4 && t4.implicit ? t4.implicit : "hide", i2 = this.args, s2 = n2(this, e3, r3, i2, false);
    if (i2.length === 1) {
      var a2 = Wa(this, e3), o2 = i2[0].toString(t4);
      s2[0] && (o2 = "(" + o2 + ")");
      var u2 = /[a-zA-Z]+/.test(this.op);
      return a2 === "right" ? this.op + (u2 ? " " : "") + o2 : a2 === "left" ? o2 + (u2 ? " " : "") + this.op : o2 + this.op;
    }
    if (i2.length === 2) {
      var h = i2[0].toString(t4), c2 = i2[1].toString(t4);
      return s2[0] && (h = "(" + h + ")"), s2[1] && (c2 = "(" + c2 + ")"), this.implicit && this.getIdentifier() === "OperatorNode:multiply" && r3 === "hide" ? h + " " + c2 : h + " " + this.op + " " + c2;
    }
    if (i2.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply")) {
      var l2 = i2.map(function(e4, r4) {
        return e4 = e4.toString(t4), s2[r4] && (e4 = "(" + e4 + ")"), e4;
      });
      return this.implicit && this.getIdentifier() === "OperatorNode:multiply" && r3 === "hide" ? l2.join(" ") : l2.join(" " + this.op + " ");
    }
    return this.fn + "(" + this.args.join(", ") + ")";
  }, r2.prototype.toJSON = function() {
    return {mathjs: "OperatorNode", op: this.op, fn: this.fn, args: this.args, implicit: this.implicit};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.op, t4.fn, t4.args, t4.implicit);
  }, r2.prototype.toHTML = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = t4 && t4.implicit ? t4.implicit : "hide", i2 = this.args, s2 = n2(this, e3, r3, i2, false);
    if (i2.length === 1) {
      var a2 = Wa(this, e3), o2 = i2[0].toHTML(t4);
      return s2[0] && (o2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + o2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), a2 === "right" ? '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + $r(this.op) + "</span>" + o2 : o2 + '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + $r(this.op) + "</span>";
    }
    if (i2.length === 2) {
      var u2 = i2[0].toHTML(t4), h = i2[1].toHTML(t4);
      return s2[0] && (u2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + u2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), s2[1] && (h = '<span class="math-parenthesis math-round-parenthesis">(</span>' + h + '<span class="math-parenthesis math-round-parenthesis">)</span>'), this.implicit && this.getIdentifier() === "OperatorNode:multiply" && r3 === "hide" ? u2 + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + h : u2 + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + $r(this.op) + "</span>" + h;
    }
    var c2 = i2.map(function(e4, r4) {
      return e4 = e4.toHTML(t4), s2[r4] && (e4 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + e4 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), e4;
    });
    return i2.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply") ? this.implicit && this.getIdentifier() === "OperatorNode:multiply" && r3 === "hide" ? c2.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>') : c2.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + $r(this.op) + "</span>") : '<span class="math-function">' + $r(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + c2.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
  }, r2.prototype._toTex = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = t4 && t4.implicit ? t4.implicit : "hide", i2 = this.args, s2 = n2(this, e3, r3, i2, true), a2 = no[this.fn];
    if (a2 = a2 === void 0 ? this.op : a2, i2.length === 1) {
      var o2 = Wa(this, e3), u2 = i2[0].toTex(t4);
      return s2[0] && (u2 = "\\left(".concat(u2, "\\right)")), o2 === "right" ? a2 + u2 : u2 + a2;
    }
    if (i2.length === 2) {
      var h = i2[0], c2 = h.toTex(t4);
      s2[0] && (c2 = "\\left(".concat(c2, "\\right)"));
      var l2, p2 = i2[1].toTex(t4);
      switch (s2[1] && (p2 = "\\left(".concat(p2, "\\right)")), l2 = e3 === "keep" ? h.getIdentifier() : h.getContent().getIdentifier(), this.getIdentifier()) {
        case "OperatorNode:divide":
          return a2 + "{" + c2 + "}{" + p2 + "}";
        case "OperatorNode:pow":
          switch (c2 = "{" + c2 + "}", p2 = "{" + p2 + "}", l2) {
            case "ConditionalNode":
            case "OperatorNode:divide":
              c2 = "\\left(".concat(c2, "\\right)");
          }
          break;
        case "OperatorNode:multiply":
          if (this.implicit && r3 === "hide")
            return c2 + "~" + p2;
      }
      return c2 + a2 + p2;
    }
    if (i2.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply")) {
      var f2 = i2.map(function(e4, r4) {
        return e4 = e4.toTex(t4), s2[r4] && (e4 = "\\left(".concat(e4, "\\right)")), e4;
      });
      return this.getIdentifier() === "OperatorNode:multiply" && this.implicit ? f2.join("~") : f2.join(a2);
    }
    return "\\mathrm{" + this.fn + "}\\left(" + i2.map(function(e4) {
      return e4.toTex(t4);
    }).join(",") + "\\right)";
  }, r2.prototype.getIdentifier = function() {
    return this.type + ":" + this.fn;
  }, r2;
}, {isClass: true, isNode: true}), fo = cn("ParenthesisNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!ir(t4))
      throw new TypeError('Node expected for parameter "content"');
    this.content = t4;
  }
  return r2.prototype = new e2(), r2.prototype.type = "ParenthesisNode", r2.prototype.isParenthesisNode = true, r2.prototype._compile = function(t4, e3) {
    return this.content._compile(t4, e3);
  }, r2.prototype.getContent = function() {
    return this.content.getContent();
  }, r2.prototype.forEach = function(t4) {
    t4(this.content, "content", this);
  }, r2.prototype.map = function(t4) {
    return new r2(t4(this.content, "content", this));
  }, r2.prototype.clone = function() {
    return new r2(this.content);
  }, r2.prototype._toString = function(t4) {
    return !t4 || t4 && !t4.parenthesis || t4 && t4.parenthesis === "keep" ? "(" + this.content.toString(t4) + ")" : this.content.toString(t4);
  }, r2.prototype.toJSON = function() {
    return {mathjs: "ParenthesisNode", content: this.content};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.content);
  }, r2.prototype.toHTML = function(t4) {
    return !t4 || t4 && !t4.parenthesis || t4 && t4.parenthesis === "keep" ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + this.content.toHTML(t4) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : this.content.toHTML(t4);
  }, r2.prototype._toTex = function(t4) {
    return !t4 || t4 && !t4.parenthesis || t4 && t4.parenthesis === "keep" ? "\\left(".concat(this.content.toTex(t4), "\\right)") : this.content.toTex(t4);
  }, r2;
}, {isClass: true, isNode: true}), mo = cn("RangeNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4, e3, n3) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!ir(t4))
      throw new TypeError("Node expected");
    if (!ir(e3))
      throw new TypeError("Node expected");
    if (n3 && !ir(n3))
      throw new TypeError("Node expected");
    if (arguments.length > 3)
      throw new Error("Too many arguments");
    this.start = t4, this.end = e3, this.step = n3 || null;
  }
  function n2(t4, e3) {
    var r3 = Ga(t4, e3), n3 = {}, i2 = Ga(t4.start, e3);
    if (n3.start = i2 !== null && i2 <= r3 || e3 === "all", t4.step) {
      var s2 = Ga(t4.step, e3);
      n3.step = s2 !== null && s2 <= r3 || e3 === "all";
    }
    var a2 = Ga(t4.end, e3);
    return n3.end = a2 !== null && a2 <= r3 || e3 === "all", n3;
  }
  return r2.prototype = new e2(), r2.prototype.type = "RangeNode", r2.prototype.isRangeNode = true, r2.prototype.needsEnd = function() {
    return this.filter(function(t4) {
      return hr(t4) && t4.name === "end";
    }).length > 0;
  }, r2.prototype._compile = function(t4, e3) {
    var r3 = t4.range, n3 = this.start._compile(t4, e3), i2 = this.end._compile(t4, e3);
    if (this.step) {
      var s2 = this.step._compile(t4, e3);
      return function(t5, e4, a2) {
        return r3(n3(t5, e4, a2), i2(t5, e4, a2), s2(t5, e4, a2));
      };
    }
    return function(t5, e4, s3) {
      return r3(n3(t5, e4, s3), i2(t5, e4, s3));
    };
  }, r2.prototype.forEach = function(t4) {
    t4(this.start, "start", this), t4(this.end, "end", this), this.step && t4(this.step, "step", this);
  }, r2.prototype.map = function(t4) {
    return new r2(this._ifNode(t4(this.start, "start", this)), this._ifNode(t4(this.end, "end", this)), this.step && this._ifNode(t4(this.step, "step", this)));
  }, r2.prototype.clone = function() {
    return new r2(this.start, this.end, this.step && this.step);
  }, r2.prototype._toString = function(t4) {
    var e3, r3 = n2(this, t4 && t4.parenthesis ? t4.parenthesis : "keep"), i2 = this.start.toString(t4);
    if (r3.start && (i2 = "(" + i2 + ")"), e3 = i2, this.step) {
      var s2 = this.step.toString(t4);
      r3.step && (s2 = "(" + s2 + ")"), e3 += ":" + s2;
    }
    var a2 = this.end.toString(t4);
    return r3.end && (a2 = "(" + a2 + ")"), e3 += ":" + a2;
  }, r2.prototype.toJSON = function() {
    return {mathjs: "RangeNode", start: this.start, end: this.end, step: this.step};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.start, t4.end, t4.step);
  }, r2.prototype.toHTML = function(t4) {
    var e3, r3 = n2(this, t4 && t4.parenthesis ? t4.parenthesis : "keep"), i2 = this.start.toHTML(t4);
    if (r3.start && (i2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + i2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), e3 = i2, this.step) {
      var s2 = this.step.toHTML(t4);
      r3.step && (s2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + s2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), e3 += '<span class="math-operator math-range-operator">:</span>' + s2;
    }
    var a2 = this.end.toHTML(t4);
    return r3.end && (a2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + a2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), e3 += '<span class="math-operator math-range-operator">:</span>' + a2;
  }, r2.prototype._toTex = function(t4) {
    var e3 = n2(this, t4 && t4.parenthesis ? t4.parenthesis : "keep"), r3 = this.start.toTex(t4);
    if (e3.start && (r3 = "\\left(".concat(r3, "\\right)")), this.step) {
      var i2 = this.step.toTex(t4);
      e3.step && (i2 = "\\left(".concat(i2, "\\right)")), r3 += ":" + i2;
    }
    var s2 = this.end.toTex(t4);
    return e3.end && (s2 = "\\left(".concat(s2, "\\right)")), r3 += ":" + s2;
  }, r2;
}, {isClass: true, isNode: true}), yo = cn("RelationalNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4, e3) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!Array.isArray(t4))
      throw new TypeError("Parameter conditionals must be an array");
    if (!Array.isArray(e3))
      throw new TypeError("Parameter params must be an array");
    if (t4.length !== e3.length - 1)
      throw new TypeError("Parameter params must contain exactly one more element than parameter conditionals");
    this.conditionals = t4, this.params = e3;
  }
  return r2.prototype = new e2(), r2.prototype.type = "RelationalNode", r2.prototype.isRelationalNode = true, r2.prototype._compile = function(t4, e3) {
    var r3 = this, n2 = this.params.map((r4) => r4._compile(t4, e3));
    return function(e4, i2, s2) {
      for (var a2, o2 = n2[0](e4, i2, s2), u2 = 0; u2 < r3.conditionals.length; u2++) {
        if (a2 = o2, o2 = n2[u2 + 1](e4, i2, s2), !ta(t4, r3.conditionals[u2])(a2, o2))
          return false;
      }
      return true;
    };
  }, r2.prototype.forEach = function(t4) {
    this.params.forEach((e3, r3) => t4(e3, "params[" + r3 + "]", this), this);
  }, r2.prototype.map = function(t4) {
    return new r2(this.conditionals.slice(), this.params.map((e3, r3) => this._ifNode(t4(e3, "params[" + r3 + "]", this)), this));
  }, r2.prototype.clone = function() {
    return new r2(this.conditionals, this.params);
  }, r2.prototype._toString = function(t4) {
    for (var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Ga(this, e3), n2 = this.params.map(function(n3, i3) {
      var s3 = Ga(n3, e3);
      return e3 === "all" || s3 !== null && s3 <= r3 ? "(" + n3.toString(t4) + ")" : n3.toString(t4);
    }), i2 = {equal: "==", unequal: "!=", smaller: "<", larger: ">", smallerEq: "<=", largerEq: ">="}, s2 = n2[0], a2 = 0; a2 < this.conditionals.length; a2++)
      s2 += " " + i2[this.conditionals[a2]] + " " + n2[a2 + 1];
    return s2;
  }, r2.prototype.toJSON = function() {
    return {mathjs: "RelationalNode", conditionals: this.conditionals, params: this.params};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.conditionals, t4.params);
  }, r2.prototype.toHTML = function(t4) {
    for (var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Ga(this, e3), n2 = this.params.map(function(n3, i3) {
      var s3 = Ga(n3, e3);
      return e3 === "all" || s3 !== null && s3 <= r3 ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + n3.toHTML(t4) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : n3.toHTML(t4);
    }), i2 = {equal: "==", unequal: "!=", smaller: "<", larger: ">", smallerEq: "<=", largerEq: ">="}, s2 = n2[0], a2 = 0; a2 < this.conditionals.length; a2++)
      s2 += '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + $r(i2[this.conditionals[a2]]) + "</span>" + n2[a2 + 1];
    return s2;
  }, r2.prototype._toTex = function(t4) {
    for (var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Ga(this, e3), n2 = this.params.map(function(n3, i3) {
      var s3 = Ga(n3, e3);
      return e3 === "all" || s3 !== null && s3 <= r3 ? "\\left(" + n3.toTex(t4) + "\right)" : n3.toTex(t4);
    }), i2 = n2[0], s2 = 0; s2 < this.conditionals.length; s2++)
      i2 += no[this.conditionals[s2]] + n2[s2 + 1];
    return i2;
  }, r2;
}, {isClass: true, isNode: true});
function go() {
  return (go = Object.assign || function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2)
        Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
    }
    return t3;
  }).apply(this, arguments);
}
function vo() {
  return (vo = Object.assign || function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2)
        Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
    }
    return t3;
  }).apply(this, arguments);
}
var xo = {createBigNumberClass: Yi}, wo = {createComplexClass: Qi}, bo = {createMatrixClass: rs}, _o = {MatrixDependencies: bo, createDenseMatrixClass: ns}, Mo = {createFractionClass: ts}, Eo = {BigNumberDependencies: xo, ComplexDependencies: wo, DenseMatrixDependencies: _o, FractionDependencies: Mo, createTyped: dn}, No = {typedDependencies: Eo, createEqualScalar: vs}, So = {MatrixDependencies: bo, equalScalarDependencies: No, typedDependencies: Eo, createSparseMatrixClass: xs}, To = {typedDependencies: Eo, createNumber: ws}, Oo = {FractionDependencies: Mo, typedDependencies: Eo, createFraction: _s}, zo = {DenseMatrixDependencies: _o, MatrixDependencies: bo, SparseMatrixDependencies: So, typedDependencies: Eo, createMatrix: Ms}, Ao = {typedDependencies: Eo, createUnaryMinus: Es}, Co = {typedDependencies: Eo, createAbs: Ns}, Ro = {typedDependencies: Eo, createAddScalar: Ss}, Do = {BigNumberDependencies: xo, DenseMatrixDependencies: _o, equalScalarDependencies: No, matrixDependencies: zo, typedDependencies: Eo, zerosDependencies: {BigNumberDependencies: xo, matrixDependencies: zo, typedDependencies: Eo, createZeros: pa}, createRound: ba}, Io = {typedDependencies: Eo, createMultiplyScalar: js}, Lo = {matrixDependencies: zo, typedDependencies: Eo, createSize: Ks}, Bo = {addScalarDependencies: Ro, dotDependencies: {addScalarDependencies: Ro, conjDependencies: {typedDependencies: Eo, createConj: Gs}, multiplyScalarDependencies: Io, sizeDependencies: Lo, typedDependencies: Eo, createDot: Fa}, equalScalarDependencies: No, matrixDependencies: zo, multiplyScalarDependencies: Io, typedDependencies: Eo, createMultiply: qs}, Fo = {DenseMatrixDependencies: _o, addScalarDependencies: Ro, equalScalarDependencies: No, matrixDependencies: zo, typedDependencies: Eo, unaryMinusDependencies: Ao, createSubtract: Hs}, Po = {DenseMatrixDependencies: _o, matrixDependencies: zo, typedDependencies: Eo, createLarger: Na}, Uo = {BigNumberDependencies: xo, DenseMatrixDependencies: _o, SparseMatrixDependencies: So, matrixDependencies: zo, typedDependencies: Eo, createIdentity: Zs}, qo = {bignumberDependencies: {BigNumberDependencies: xo, typedDependencies: Eo, createBignumber: bs}, fractionDependencies: Oo, numberDependencies: To, createNumeric: da}, Ho = {numericDependencies: qo, typedDependencies: Eo, createDivideScalar: ma}, Vo = {matrixDependencies: zo, typedDependencies: Eo, createSubset: oa}, $o = {BigNumberDependencies: xo, ComplexDependencies: wo, FractionDependencies: Mo, absDependencies: Co, addScalarDependencies: Ro, divideScalarDependencies: Ho, equalDependencies: {DenseMatrixDependencies: _o, equalScalarDependencies: No, matrixDependencies: zo, typedDependencies: Eo, createEqual: Ma}, fixDependencies: {ComplexDependencies: wo, ceilDependencies: {equalScalarDependencies: No, matrixDependencies: zo, roundDependencies: Do, typedDependencies: Eo, createCeil: zs}, floorDependencies: {equalScalarDependencies: No, matrixDependencies: zo, roundDependencies: Do, typedDependencies: Eo, createFloor: Cs}, matrixDependencies: zo, typedDependencies: Eo, createFix: As}, formatDependencies: {typedDependencies: Eo, createFormat: fa}, isNumericDependencies: {typedDependencies: Eo, createIsNumeric: ms}, multiplyScalarDependencies: Io, numberDependencies: To, powDependencies: {ComplexDependencies: wo, fractionDependencies: Oo, identityDependencies: Uo, matrixDependencies: zo, multiplyDependencies: Bo, numberDependencies: To, typedDependencies: Eo, createPow: ya}, roundDependencies: Do, subtractDependencies: Fo, createUnitClass: ka}, Yo = {createNode: Ua}, Zo = {UnitDependencies: $o, NodeDependencies: Yo, createSymbolNode: cn("SymbolNode", ["math", "?Unit", "Node"], (t3) => {
  var {math: e2, Unit: r2, Node: n2} = t3;
  function i2(t4) {
    return !!r2 && r2.isValuelessUnit(t4);
  }
  function s2(t4) {
    if (!(this instanceof s2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (typeof t4 != "string")
      throw new TypeError('String expected for parameter "name"');
    this.name = t4;
  }
  return s2.prototype = new n2(), s2.prototype.type = "SymbolNode", s2.prototype.isSymbolNode = true, s2.prototype._compile = function(t4, e3) {
    var n3 = this.name;
    if (e3[n3] === true)
      return function(t5, e4, r3) {
        return e4[n3];
      };
    if (n3 in t4)
      return function(e4, r3, i3) {
        return ta(n3 in e4 ? e4 : t4, n3);
      };
    var s3 = i2(n3);
    return function(t5, e4, i3) {
      return n3 in t5 ? ta(t5, n3) : s3 ? new r2(null, n3) : function(t6) {
        throw new Error("Undefined symbol " + t6);
      }(n3);
    };
  }, s2.prototype.forEach = function(t4) {
  }, s2.prototype.map = function(t4) {
    return this.clone();
  }, s2.prototype.clone = function() {
    return new s2(this.name);
  }, s2.prototype._toString = function(t4) {
    return this.name;
  }, s2.prototype.toHTML = function(t4) {
    var e3 = $r(this.name);
    return e3 === "true" || e3 === "false" ? '<span class="math-symbol math-boolean">' + e3 + "</span>" : e3 === "i" ? '<span class="math-symbol math-imaginary-symbol">' + e3 + "</span>" : e3 === "Infinity" ? '<span class="math-symbol math-infinity-symbol">' + e3 + "</span>" : e3 === "NaN" ? '<span class="math-symbol math-nan-symbol">' + e3 + "</span>" : e3 === "null" ? '<span class="math-symbol math-null-symbol">' + e3 + "</span>" : e3 === "undefined" ? '<span class="math-symbol math-undefined-symbol">' + e3 + "</span>" : '<span class="math-symbol">' + e3 + "</span>";
  }, s2.prototype.toJSON = function() {
    return {mathjs: "SymbolNode", name: this.name};
  }, s2.fromJSON = function(t4) {
    return new s2(t4.name);
  }, s2.prototype._toTex = function(t4) {
    var r3 = false;
    e2[this.name] === void 0 && i2(this.name) && (r3 = true);
    var n3 = oo(this.name, r3);
    return n3[0] === "\\" ? n3 : " " + n3;
  }, s2;
}, {isClass: true, isNode: true})};
({parseDependencies: {AccessorNodeDependencies: {NodeDependencies: Yo, subsetDependencies: Vo, createAccessorNode: Ha}, ArrayNodeDependencies: {NodeDependencies: Yo, createArrayNode: Va}, AssignmentNodeDependencies: {matrixDependencies: zo, NodeDependencies: Yo, subsetDependencies: Vo, createAssignmentNode: Za}, BlockNodeDependencies: {NodeDependencies: Yo, ResultSetDependencies: {createResultSet: wn}, createBlockNode: Xa}, ConditionalNodeDependencies: {NodeDependencies: Yo, createConditionalNode: Qa}, ConstantNodeDependencies: {NodeDependencies: Yo, createConstantNode: uo}, FunctionAssignmentNodeDependencies: {NodeDependencies: Yo, typedDependencies: Eo, createFunctionAssignmentNode: ho}, FunctionNodeDependencies: {NodeDependencies: Yo, SymbolNodeDependencies: Zo, createFunctionNode: cn("FunctionNode", ["math", "Node", "SymbolNode"], (t3) => {
  var {math: e2, Node: r2, SymbolNode: n2} = t3;
  function i2(t4, e3) {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (typeof t4 == "string" && (t4 = new n2(t4)), !ir(t4))
      throw new TypeError('Node expected as parameter "fn"');
    if (!Array.isArray(e3) || !e3.every(ir))
      throw new TypeError('Array containing Nodes expected for parameter "args"');
    this.fn = t4, this.args = e3 || [], Object.defineProperty(this, "name", {get: function() {
      return this.fn.name || "";
    }.bind(this), set: function() {
      throw new Error("Cannot assign a new name, name is read-only");
    }});
  }
  i2.prototype = new r2(), i2.prototype.type = "FunctionNode", i2.prototype.isFunctionNode = true, i2.prototype._compile = function(t4, e3) {
    if (!(this instanceof i2))
      throw new TypeError("No valid FunctionNode");
    var r3 = sn(this.args, function(r4) {
      return r4._compile(t4, e3);
    });
    if (hr(this.fn)) {
      var n3 = this.fn.name, s3 = n3 in t4 ? ta(t4, n3) : void 0;
      if (typeof s3 == "function" && s3.rawArgs === true) {
        var a3 = this.args;
        return function(e4, r4, i3) {
          return (n3 in e4 ? ta(e4, n3) : s3)(a3, t4, go({}, e4, r4));
        };
      }
      if (r3.length === 1) {
        var o3 = r3[0];
        return function(t5, e4, r4) {
          return (n3 in t5 ? ta(t5, n3) : s3)(o3(t5, e4, r4));
        };
      }
      if (r3.length === 2) {
        var u2 = r3[0], h = r3[1];
        return function(t5, e4, r4) {
          return (n3 in t5 ? ta(t5, n3) : s3)(u2(t5, e4, r4), h(t5, e4, r4));
        };
      }
      return function(t5, e4, i3) {
        return (n3 in t5 ? ta(t5, n3) : s3).apply(null, sn(r3, function(r4) {
          return r4(t5, e4, i3);
        }));
      };
    }
    if (Ze(this.fn) && nr(this.fn.index) && this.fn.index.isObjectProperty()) {
      var c2 = this.fn.object._compile(t4, e3), l2 = this.fn.index.getObjectProperty(), p2 = this.args;
      return function(e4, n4, i3) {
        var s4 = c2(e4, n4, i3);
        return function(t5, e5) {
          if (!na(t5, e5))
            throw new Error('No access to method "' + e5 + '"');
        }(s4, l2), s4[l2] && s4[l2].rawArgs ? s4[l2](p2, t4, go({}, e4, n4)) : s4[l2].apply(s4, sn(r3, function(t5) {
          return t5(e4, n4, i3);
        }));
      };
    }
    var f2 = this.fn._compile(t4, e3), d2 = this.args;
    return function(e4, n4, i3) {
      var s4 = f2(e4, n4, i3);
      return s4 && s4.rawArgs ? s4(d2, t4, go({}, e4, n4)) : s4.apply(s4, sn(r3, function(t5) {
        return t5(e4, n4, i3);
      }));
    };
  }, i2.prototype.forEach = function(t4) {
    t4(this.fn, "fn", this);
    for (var e3 = 0; e3 < this.args.length; e3++)
      t4(this.args[e3], "args[" + e3 + "]", this);
  }, i2.prototype.map = function(t4) {
    for (var e3 = this._ifNode(t4(this.fn, "fn", this)), r3 = [], n3 = 0; n3 < this.args.length; n3++)
      r3[n3] = this._ifNode(t4(this.args[n3], "args[" + n3 + "]", this));
    return new i2(e3, r3);
  }, i2.prototype.clone = function() {
    return new i2(this.fn, this.args.slice(0));
  };
  var s2 = i2.prototype.toString;
  function a2(t4, e3, r3) {
    for (var n3, i3 = "", s3 = /\$(?:\{([a-z_][a-z_0-9]*)(?:\[([0-9]+)\])?\}|\$)/gi, a3 = 0; (n3 = s3.exec(t4)) !== null; )
      if (i3 += t4.substring(a3, n3.index), a3 = n3.index, n3[0] === "$$")
        i3 += "$", a3++;
      else {
        a3 += n3[0].length;
        var o3 = e3[n3[1]];
        if (!o3)
          throw new ReferenceError("Template: Property " + n3[1] + " does not exist.");
        if (n3[2] === void 0)
          switch (typeof o3) {
            case "string":
              i3 += o3;
              break;
            case "object":
              if (ir(o3))
                i3 += o3.toTex(r3);
              else {
                if (!Array.isArray(o3))
                  throw new TypeError("Template: " + n3[1] + " has to be a Node, String or array of Nodes");
                i3 += o3.map(function(t5, e4) {
                  if (ir(t5))
                    return t5.toTex(r3);
                  throw new TypeError("Template: " + n3[1] + "[" + e4 + "] is not a Node.");
                }).join(",");
              }
              break;
            default:
              throw new TypeError("Template: " + n3[1] + " has to be a Node, String or array of Nodes");
          }
        else {
          if (!ir(o3[n3[2]] && o3[n3[2]]))
            throw new TypeError("Template: " + n3[1] + "[" + n3[2] + "] is not a Node.");
          i3 += o3[n3[2]].toTex(r3);
        }
      }
    return i3 += t4.slice(a3);
  }
  i2.prototype.toString = function(t4) {
    var e3, r3 = this.fn.toString(t4);
    return t4 && typeof t4.handler == "object" && wr(t4.handler, r3) && (e3 = t4.handler[r3](this, t4)), e3 !== void 0 ? e3 : s2.call(this, t4);
  }, i2.prototype._toString = function(t4) {
    var e3 = this.args.map(function(e4) {
      return e4.toString(t4);
    });
    return (er(this.fn) ? "(" + this.fn.toString(t4) + ")" : this.fn.toString(t4)) + "(" + e3.join(", ") + ")";
  }, i2.prototype.toJSON = function() {
    return {mathjs: "FunctionNode", fn: this.fn, args: this.args};
  }, i2.fromJSON = function(t4) {
    return new i2(t4.fn, t4.args);
  }, i2.prototype.toHTML = function(t4) {
    var e3 = this.args.map(function(e4) {
      return e4.toHTML(t4);
    });
    return '<span class="math-function">' + $r(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + e3.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
  };
  var o2 = i2.prototype.toTex;
  return i2.prototype.toTex = function(t4) {
    var e3;
    return t4 && typeof t4.handler == "object" && wr(t4.handler, this.name) && (e3 = t4.handler[this.name](this, t4)), e3 !== void 0 ? e3 : o2.call(this, t4);
  }, i2.prototype._toTex = function(t4) {
    var r3, n3, i3 = this.args.map(function(e3) {
      return e3.toTex(t4);
    });
    switch (io[this.name] && (r3 = io[this.name]), !e2[this.name] || typeof e2[this.name].toTex != "function" && typeof e2[this.name].toTex != "object" && typeof e2[this.name].toTex != "string" || (r3 = e2[this.name].toTex), typeof r3) {
      case "function":
        n3 = r3(this, t4);
        break;
      case "string":
        n3 = a2(r3, this, t4);
        break;
      case "object":
        switch (typeof r3[i3.length]) {
          case "function":
            n3 = r3[i3.length](this, t4);
            break;
          case "string":
            n3 = a2(r3[i3.length], this, t4);
        }
    }
    return n3 !== void 0 ? n3 : a2("\\mathrm{${name}}\\left(${args}\\right)", this, t4);
  }, i2.prototype.getIdentifier = function() {
    return this.type + ":" + this.name;
  }, i2;
}, {isClass: true, isNode: true})}, IndexNodeDependencies: {NodeDependencies: Yo, RangeDependencies: {createRangeClass: es}, sizeDependencies: Lo, createIndexNode: co}, ObjectNodeDependencies: {NodeDependencies: Yo, createObjectNode: lo}, OperatorNodeDependencies: {NodeDependencies: Yo, createOperatorNode: po}, ParenthesisNodeDependencies: {NodeDependencies: Yo, createParenthesisNode: fo}, RangeNodeDependencies: {NodeDependencies: Yo, createRangeNode: mo}, RelationalNodeDependencies: {NodeDependencies: Yo, createRelationalNode: yo}, SymbolNodeDependencies: Zo, numericDependencies: qo, typedDependencies: Eo, createParse: cn("parse", ["typed", "numeric", "config", "AccessorNode", "ArrayNode", "AssignmentNode", "BlockNode", "ConditionalNode", "ConstantNode", "FunctionAssignmentNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "RangeNode", "RelationalNode", "SymbolNode"], (t3) => {
  var {typed: e2, numeric: r2, config: n2, AccessorNode: i2, ArrayNode: s2, AssignmentNode: a2, BlockNode: o2, ConditionalNode: u2, ConstantNode: h, FunctionAssignmentNode: c2, FunctionNode: l2, IndexNode: p2, ObjectNode: f2, OperatorNode: d2, ParenthesisNode: m2, RangeNode: y2, RelationalNode: g2, SymbolNode: v} = t3, x = e2("parse", {string: function(t4) {
    return P2(t4, {});
  }, "Array | Matrix": function(t4) {
    return w(t4, {});
  }, "string, Object": function(t4, e3) {
    return P2(t4, e3.nodes !== void 0 ? e3.nodes : {});
  }, "Array | Matrix, Object": w});
  function w(t4) {
    var e3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r3 = e3.nodes !== void 0 ? e3.nodes : {};
    return is(t4, function(t5) {
      if (typeof t5 != "string")
        throw new TypeError("String expected");
      return P2(t5, r3);
    });
  }
  var b = 0, _ = 1, M = 2, E = 3, N = 4, S = {",": true, "(": true, ")": true, "[": true, "]": true, "{": true, "}": true, '"': true, "'": true, ";": true, "+": true, "-": true, "*": true, ".*": true, "/": true, "./": true, "%": true, "^": true, ".^": true, "~": true, "!": true, "&": true, "|": true, "^|": true, "=": true, ":": true, "?": true, "==": true, "!=": true, "<": true, ">": true, "<=": true, ">=": true, "<<": true, ">>": true, ">>>": true}, T = {mod: true, to: true, in: true, and: true, xor: true, or: true, not: true}, O2 = {true: true, false: false, null: null, undefined: void 0}, z2 = ["NaN", "Infinity"];
  function A2(t4, e3) {
    return t4.expression.substr(t4.index, e3);
  }
  function C2(t4) {
    return A2(t4, 1);
  }
  function R2(t4) {
    t4.index++;
  }
  function D2(t4) {
    return t4.expression.charAt(t4.index - 1);
  }
  function k2(t4) {
    return t4.expression.charAt(t4.index + 1);
  }
  function I2(t4) {
    for (t4.tokenType = b, t4.token = "", t4.comment = ""; x.isWhitespace(C2(t4), t4.nestingLevel); )
      R2(t4);
    if (C2(t4) === "#")
      for (; C2(t4) !== "\n" && C2(t4) !== ""; )
        t4.comment += C2(t4), R2(t4);
    if (C2(t4) !== "") {
      if (C2(t4) === "\n" && !t4.nestingLevel)
        return t4.tokenType = _, t4.token = C2(t4), void R2(t4);
      var e3 = C2(t4), r3 = A2(t4, 2), n3 = A2(t4, 3);
      if (n3.length === 3 && S[n3])
        return t4.tokenType = _, t4.token = n3, R2(t4), R2(t4), void R2(t4);
      if (r3.length === 2 && S[r3])
        return t4.tokenType = _, t4.token = r3, R2(t4), void R2(t4);
      if (S[e3])
        return t4.tokenType = _, t4.token = e3, void R2(t4);
      if (x.isDigitDot(e3)) {
        t4.tokenType = M;
        var i3 = A2(t4, 2);
        if (i3 === "0b" || i3 === "0o" || i3 === "0x") {
          for (t4.token += C2(t4), R2(t4), t4.token += C2(t4), R2(t4); x.isHexDigit(C2(t4)); )
            t4.token += C2(t4), R2(t4);
          return;
        }
        if (C2(t4) === ".")
          t4.token += C2(t4), R2(t4), x.isDigit(C2(t4)) || (t4.tokenType = _);
        else {
          for (; x.isDigit(C2(t4)); )
            t4.token += C2(t4), R2(t4);
          x.isDecimalMark(C2(t4), k2(t4)) && (t4.token += C2(t4), R2(t4));
        }
        for (; x.isDigit(C2(t4)); )
          t4.token += C2(t4), R2(t4);
        if (C2(t4) === "E" || C2(t4) === "e") {
          if (x.isDigit(k2(t4)) || k2(t4) === "-" || k2(t4) === "+") {
            if (t4.token += C2(t4), R2(t4), C2(t4) !== "+" && C2(t4) !== "-" || (t4.token += C2(t4), R2(t4)), !x.isDigit(C2(t4)))
              throw at(t4, 'Digit expected, got "' + C2(t4) + '"');
            for (; x.isDigit(C2(t4)); )
              t4.token += C2(t4), R2(t4);
            if (x.isDecimalMark(C2(t4), k2(t4)))
              throw at(t4, 'Digit expected, got "' + C2(t4) + '"');
          } else if (k2(t4) === ".")
            throw R2(t4), at(t4, 'Digit expected, got "' + C2(t4) + '"');
        }
      } else {
        if (!x.isAlpha(C2(t4), D2(t4), k2(t4))) {
          for (t4.tokenType = N; C2(t4) !== ""; )
            t4.token += C2(t4), R2(t4);
          throw at(t4, 'Syntax error in part "' + t4.token + '"');
        }
        for (; x.isAlpha(C2(t4), D2(t4), k2(t4)) || x.isDigit(C2(t4)); )
          t4.token += C2(t4), R2(t4);
        wr(T, t4.token) ? t4.tokenType = _ : t4.tokenType = E;
      }
    } else
      t4.tokenType = _;
  }
  function L2(t4) {
    do {
      I2(t4);
    } while (t4.token === "\n");
  }
  function B2(t4) {
    t4.nestingLevel++;
  }
  function F2(t4) {
    t4.nestingLevel--;
  }
  function P2(t4, e3) {
    var r3 = {extraNodes: {}, expression: "", comment: "", index: 0, token: "", tokenType: b, nestingLevel: 0, conditionalLevel: null};
    vo(r3, {expression: t4, extraNodes: e3}), I2(r3);
    var n3 = function(t5) {
      var e4, r4, n4 = [];
      t5.token !== "" && t5.token !== "\n" && t5.token !== ";" && ((e4 = U2(t5)).comment = t5.comment);
      for (; t5.token === "\n" || t5.token === ";"; )
        n4.length === 0 && e4 && (r4 = t5.token !== ";", n4.push({node: e4, visible: r4})), I2(t5), t5.token !== "\n" && t5.token !== ";" && t5.token !== "" && ((e4 = U2(t5)).comment = t5.comment, r4 = t5.token !== ";", n4.push({node: e4, visible: r4}));
      return n4.length > 0 ? new o2(n4) : (e4 || ((e4 = new h(void 0)).comment = t5.comment), e4);
    }(r3);
    if (r3.token !== "")
      throw r3.tokenType === _ ? ot(r3, "Unexpected operator " + r3.token) : at(r3, 'Unexpected part "' + r3.token + '"');
    return n3;
  }
  function U2(t4) {
    var e3, r3, n3, i3, s3 = function(t5) {
      var e4 = function(t6) {
        var e5 = j2(t6);
        for (; t6.token === "or"; )
          L2(t6), e5 = new d2("or", "or", [e5, j2(t6)]);
        return e5;
      }(t5);
      for (; t5.token === "?"; ) {
        var r4 = t5.conditionalLevel;
        t5.conditionalLevel = t5.nestingLevel, L2(t5);
        var n4 = e4, i4 = U2(t5);
        if (t5.token !== ":")
          throw at(t5, "False part of conditional expression expected");
        t5.conditionalLevel = null, L2(t5);
        var s4 = U2(t5);
        e4 = new u2(n4, i4, s4), t5.conditionalLevel = r4;
      }
      return e4;
    }(t4);
    if (t4.token === "=") {
      if (hr(s3))
        return e3 = s3.name, L2(t4), n3 = U2(t4), new a2(new v(e3), n3);
      if (Ze(s3))
        return L2(t4), n3 = U2(t4), new a2(s3.object, s3.index, n3);
      if (rr(s3) && hr(s3.fn) && (i3 = true, r3 = [], e3 = s3.name, s3.args.forEach(function(t5, e4) {
        hr(t5) ? r3[e4] = t5.name : i3 = false;
      }), i3))
        return L2(t4), n3 = U2(t4), new c2(e3, r3, n3);
      throw at(t4, "Invalid left hand side of assignment operator =");
    }
    return s3;
  }
  function j2(t4) {
    for (var e3 = q2(t4); t4.token === "xor"; )
      L2(t4), e3 = new d2("xor", "xor", [e3, q2(t4)]);
    return e3;
  }
  function q2(t4) {
    for (var e3 = H2(t4); t4.token === "and"; )
      L2(t4), e3 = new d2("and", "and", [e3, H2(t4)]);
    return e3;
  }
  function H2(t4) {
    for (var e3 = V2(t4); t4.token === "|"; )
      L2(t4), e3 = new d2("|", "bitOr", [e3, V2(t4)]);
    return e3;
  }
  function V2(t4) {
    for (var e3 = $(t4); t4.token === "^|"; )
      L2(t4), e3 = new d2("^|", "bitXor", [e3, $(t4)]);
    return e3;
  }
  function $(t4) {
    for (var e3 = G(t4); t4.token === "&"; )
      L2(t4), e3 = new d2("&", "bitAnd", [e3, G(t4)]);
    return e3;
  }
  function G(t4) {
    for (var e3 = [W(t4)], r3 = [], n3 = {"==": "equal", "!=": "unequal", "<": "smaller", ">": "larger", "<=": "smallerEq", ">=": "largerEq"}; wr(n3, t4.token); ) {
      var i3 = {name: t4.token, fn: n3[t4.token]};
      r3.push(i3), L2(t4), e3.push(W(t4));
    }
    return e3.length === 1 ? e3[0] : e3.length === 2 ? new d2(r3[0].name, r3[0].fn, e3) : new g2(r3.map((t5) => t5.fn), e3);
  }
  function W(t4) {
    var e3, r3, n3, i3;
    e3 = Y(t4);
    for (var s3 = {"<<": "leftShift", ">>": "rightArithShift", ">>>": "rightLogShift"}; wr(s3, t4.token); )
      n3 = s3[r3 = t4.token], L2(t4), i3 = [e3, Y(t4)], e3 = new d2(r3, n3, i3);
    return e3;
  }
  function Y(t4) {
    var e3, r3, n3, i3;
    e3 = Z(t4);
    for (var s3 = {to: "to", in: "to"}; wr(s3, t4.token); )
      n3 = s3[r3 = t4.token], L2(t4), r3 === "in" && t4.token === "" ? e3 = new d2("*", "multiply", [e3, new v("in")], true) : (i3 = [e3, Z(t4)], e3 = new d2(r3, n3, i3));
    return e3;
  }
  function Z(t4) {
    var e3, r3 = [];
    if (e3 = t4.token === ":" ? new h(1) : X(t4), t4.token === ":" && t4.conditionalLevel !== t4.nestingLevel) {
      for (r3.push(e3); t4.token === ":" && r3.length < 3; )
        L2(t4), t4.token === ")" || t4.token === "]" || t4.token === "," || t4.token === "" ? r3.push(new v("end")) : r3.push(X(t4));
      e3 = r3.length === 3 ? new y2(r3[0], r3[2], r3[1]) : new y2(r3[0], r3[1]);
    }
    return e3;
  }
  function X(t4) {
    var e3, r3, n3, i3;
    e3 = Q(t4);
    for (var s3 = {"+": "add", "-": "subtract"}; wr(s3, t4.token); )
      n3 = s3[r3 = t4.token], L2(t4), i3 = [e3, Q(t4)], e3 = new d2(r3, n3, i3);
    return e3;
  }
  function Q(t4) {
    var e3, r3, n3, i3;
    r3 = e3 = J(t4);
    for (var s3 = {"*": "multiply", ".*": "dotMultiply", "/": "divide", "./": "dotDivide", "%": "mod", mod: "mod"}; wr(s3, t4.token); )
      i3 = s3[n3 = t4.token], L2(t4), r3 = J(t4), e3 = new d2(n3, i3, [e3, r3]);
    return e3;
  }
  function J(t4) {
    var e3, r3;
    for (r3 = e3 = K(t4); t4.tokenType === E || t4.token === "in" && tr(e3) || !(t4.tokenType !== M || tr(r3) || ar(r3) && r3.op !== "!") || t4.token === "("; )
      r3 = K(t4), e3 = new d2("*", "multiply", [e3, r3], true);
    return e3;
  }
  function K(t4) {
    for (var e3 = tt(t4), r3 = e3, n3 = []; t4.token === "/" && tr(r3); ) {
      if (n3.push(vo({}, t4)), L2(t4), t4.tokenType !== M) {
        vo(t4, n3.pop());
        break;
      }
      if (n3.push(vo({}, t4)), L2(t4), t4.tokenType !== E && t4.token !== "(") {
        n3.pop(), vo(t4, n3.pop());
        break;
      }
      vo(t4, n3.pop()), n3.pop(), r3 = tt(t4), e3 = new d2("/", "divide", [e3, r3]);
    }
    return e3;
  }
  function tt(t4) {
    var e3, i3, a3, o3 = {"-": "unaryMinus", "+": "unaryPlus", "~": "bitNot", not: "not"};
    return wr(o3, t4.token) ? (a3 = o3[t4.token], e3 = t4.token, L2(t4), i3 = [tt(t4)], new d2(e3, a3, i3)) : function(t5) {
      var e4, i4, a4, o4;
      e4 = function(t6) {
        var e5, i5, a5;
        e5 = function(t7) {
          var e6 = [];
          if (t7.tokenType === E && wr(t7.extraNodes, t7.token)) {
            var i6 = t7.extraNodes[t7.token];
            if (I2(t7), t7.token === "(") {
              if (e6 = [], B2(t7), I2(t7), t7.token !== ")")
                for (e6.push(U2(t7)); t7.token === ","; )
                  I2(t7), e6.push(U2(t7));
              if (t7.token !== ")")
                throw at(t7, "Parenthesis ) expected");
              F2(t7), I2(t7);
            }
            return new i6(e6);
          }
          return function(t8) {
            var e7;
            if (t8.tokenType === E || t8.tokenType === _ && t8.token in T)
              return e7 = t8.token, I2(t8), et(t8, wr(O2, e7) ? new h(O2[e7]) : z2.indexOf(e7) !== -1 ? new h(r2(e7, "number")) : new v(e7));
            return function(t9) {
              var e8;
              if (t9.token === '"')
                return e8 = rt2(t9), et(t9, new h(e8));
              return function(t10) {
                var e9;
                if (t10.token === "'")
                  return e9 = nt(t10), et(t10, new h(e9));
                return function(t11) {
                  var e10, i7, a6, o6;
                  if (t11.token === "[") {
                    if (B2(t11), I2(t11), t11.token !== "]") {
                      var u3 = it(t11);
                      if (t11.token === ";") {
                        for (a6 = 1, i7 = [u3]; t11.token === ";"; )
                          I2(t11), i7[a6] = it(t11), a6++;
                        if (t11.token !== "]")
                          throw at(t11, "End of matrix ] expected");
                        F2(t11), I2(t11), o6 = i7[0].items.length;
                        for (var c3 = 1; c3 < a6; c3++)
                          if (i7[c3].items.length !== o6)
                            throw ot(t11, "Column dimensions mismatch (" + i7[c3].items.length + " !== " + o6 + ")");
                        e10 = new s2(i7);
                      } else {
                        if (t11.token !== "]")
                          throw at(t11, "End of matrix ] expected");
                        F2(t11), I2(t11), e10 = u3;
                      }
                    } else
                      F2(t11), I2(t11), e10 = new s2([]);
                    return et(t11, e10);
                  }
                  return function(t12) {
                    if (t12.token === "{") {
                      var e11;
                      B2(t12);
                      var i8 = {};
                      do {
                        if (I2(t12), t12.token !== "}") {
                          if (t12.token === '"')
                            e11 = rt2(t12);
                          else if (t12.token === "'")
                            e11 = nt(t12);
                          else {
                            if (!(t12.tokenType === E || t12.tokenType === _ && t12.token in T))
                              throw at(t12, "Symbol or string expected as object key");
                            e11 = t12.token, I2(t12);
                          }
                          if (t12.token !== ":")
                            throw at(t12, "Colon : expected after object key");
                          I2(t12), i8[e11] = U2(t12);
                        }
                      } while (t12.token === ",");
                      if (t12.token !== "}")
                        throw at(t12, "Comma , or bracket } expected after object value");
                      F2(t12), I2(t12);
                      var s3 = new f2(i8);
                      return s3 = et(t12, s3);
                    }
                    return function(t13) {
                      var e12;
                      if (t13.tokenType === M)
                        return e12 = t13.token, I2(t13), new h(r2(e12, n2.number));
                      return function(t14) {
                        var e13;
                        if (t14.token === "(") {
                          if (B2(t14), I2(t14), e13 = U2(t14), t14.token !== ")")
                            throw at(t14, "Parenthesis ) expected");
                          return F2(t14), I2(t14), e13 = et(t14, e13 = new m2(e13));
                        }
                        return function(t15) {
                          throw t15.token === "" ? at(t15, "Unexpected end of expression") : at(t15, "Value expected");
                        }(t14);
                      }(t13);
                    }(t12);
                  }(t11);
                }(t10);
              }(t9);
            }(t8);
          }(t7);
        }(t6);
        var o5 = {"!": "factorial", "'": "ctranspose"};
        for (; wr(o5, t6.token); )
          a5 = o5[i5 = t6.token], I2(t6), e5 = et(t6, e5 = new d2(i5, a5, [e5]));
        return e5;
      }(t5), (t5.token === "^" || t5.token === ".^") && (a4 = (i4 = t5.token) === "^" ? "pow" : "dotPow", L2(t5), o4 = [e4, tt(t5)], e4 = new d2(i4, a4, o4));
      return e4;
    }(t4);
  }
  function et(t4, e3, r3) {
    for (var n3; !(t4.token !== "(" && t4.token !== "[" && t4.token !== "." || r3 && r3.indexOf(t4.token) === -1); )
      if (n3 = [], t4.token === "(") {
        if (!hr(e3) && !Ze(e3))
          return e3;
        if (B2(t4), I2(t4), t4.token !== ")")
          for (n3.push(U2(t4)); t4.token === ","; )
            I2(t4), n3.push(U2(t4));
        if (t4.token !== ")")
          throw at(t4, "Parenthesis ) expected");
        F2(t4), I2(t4), e3 = new l2(e3, n3);
      } else if (t4.token === "[") {
        if (B2(t4), I2(t4), t4.token !== "]")
          for (n3.push(U2(t4)); t4.token === ","; )
            I2(t4), n3.push(U2(t4));
        if (t4.token !== "]")
          throw at(t4, "Parenthesis ] expected");
        F2(t4), I2(t4), e3 = new i2(e3, new p2(n3));
      } else {
        if (I2(t4), t4.tokenType !== E)
          throw at(t4, "Property name expected after dot");
        n3.push(new h(t4.token)), I2(t4);
        e3 = new i2(e3, new p2(n3, true));
      }
    return e3;
  }
  function rt2(t4) {
    for (var e3 = ""; C2(t4) !== "" && C2(t4) !== '"'; )
      C2(t4) === "\\" && (e3 += C2(t4), R2(t4)), e3 += C2(t4), R2(t4);
    if (I2(t4), t4.token !== '"')
      throw at(t4, 'End of string " expected');
    return I2(t4), JSON.parse('"' + e3 + '"');
  }
  function nt(t4) {
    for (var e3 = ""; C2(t4) !== "" && C2(t4) !== "'"; )
      C2(t4) === "\\" && (e3 += C2(t4), R2(t4)), e3 += C2(t4), R2(t4);
    if (I2(t4), t4.token !== "'")
      throw at(t4, "End of string ' expected");
    return I2(t4), JSON.parse('"' + e3 + '"');
  }
  function it(t4) {
    for (var e3 = [U2(t4)], r3 = 1; t4.token === ","; )
      I2(t4), e3[r3] = U2(t4), r3++;
    return new s2(e3);
  }
  function st(t4) {
    return t4.index - t4.token.length + 1;
  }
  function at(t4, e3) {
    var r3 = st(t4), n3 = new SyntaxError(e3 + " (char " + r3 + ")");
    return n3.char = r3, n3;
  }
  function ot(t4, e3) {
    var r3 = st(t4), n3 = new SyntaxError(e3 + " (char " + r3 + ")");
    return n3.char = r3, n3;
  }
  return x.isAlpha = function(t4, e3, r3) {
    return x.isValidLatinOrGreek(t4) || x.isValidMathSymbol(t4, r3) || x.isValidMathSymbol(e3, t4);
  }, x.isValidLatinOrGreek = function(t4) {
    return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(t4);
  }, x.isValidMathSymbol = function(t4, e3) {
    return /^[\uD835]$/.test(t4) && /^[\uDC00-\uDFFF]$/.test(e3) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(e3);
  }, x.isWhitespace = function(t4, e3) {
    return t4 === " " || t4 === "	" || t4 === "\n" && e3 > 0;
  }, x.isDecimalMark = function(t4, e3) {
    return t4 === "." && e3 !== "/" && e3 !== "*" && e3 !== "^";
  }, x.isDigitDot = function(t4) {
    return t4 >= "0" && t4 <= "9" || t4 === ".";
  }, x.isDigit = function(t4) {
    return t4 >= "0" && t4 <= "9";
  }, x.isHexDigit = function(t4) {
    return t4 >= "0" && t4 <= "9" || t4 >= "a" && t4 <= "f" || t4 >= "A" && t4 <= "F";
  }, x;
})}, typedDependencies: Eo, createEvaluate: cn("evaluate", ["typed", "parse"], (t3) => {
  var {typed: e2, parse: r2} = t3;
  return e2("evaluate", {string: function(t4) {
    return r2(t4).compile().evaluate({});
  }, "string, Object": function(t4, e3) {
    return r2(t4).compile().evaluate(e3);
  }, "Array | Matrix": function(t4) {
    var e3 = {};
    return is(t4, function(t5) {
      return r2(t5).compile().evaluate(e3);
    });
  }, "Array | Matrix, Object": function(t4, e3) {
    return is(t4, function(t5) {
      return r2(t5).compile().evaluate(e3);
    });
  }});
})});
({divideScalarDependencies: Ho, equalScalarDependencies: No, invDependencies: {absDependencies: Co, addScalarDependencies: Ro, detDependencies: {lupDependencies: {DenseMatrixDependencies: _o, SpaDependencies: {FibonacciHeapDependencies: {largerDependencies: Po, smallerDependencies: {DenseMatrixDependencies: _o, matrixDependencies: zo, typedDependencies: Eo, createSmaller: Ea}, createFibonacciHeapClass: Sa}, addScalarDependencies: Ro, equalScalarDependencies: No, createSpaClass: Ta}, SparseMatrixDependencies: So, absDependencies: Co, addScalarDependencies: Ro, divideScalarDependencies: Ho, equalScalarDependencies: No, largerDependencies: Po, matrixDependencies: zo, multiplyScalarDependencies: Io, subtractDependencies: Fo, typedDependencies: Eo, unaryMinusDependencies: Ao, createLup: cn("lup", ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtract", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], (t3) => {
  var {typed: e2, matrix: r2, abs: n2, addScalar: i2, divideScalar: s2, multiplyScalar: a2, subtract: o2, larger: u2, equalScalar: h, unaryMinus: c2, DenseMatrix: l2, SparseMatrix: p2, Spa: f2} = t3;
  return e2("lup", {DenseMatrix: function(t4) {
    return d2(t4);
  }, SparseMatrix: function(t4) {
    return function(t5) {
      var e3, r3, i3, o3 = t5._size[0], l3 = t5._size[1], d3 = Math.min(o3, l3), m2 = t5._values, y2 = t5._index, g2 = t5._ptr, v = [], x = [], w = [], b = [o3, d3], _ = [], M = [], E = [], N = [d3, l3], S = [], T = [];
      for (e3 = 0; e3 < o3; e3++)
        S[e3] = e3, T[e3] = e3;
      var O2 = function(t6, e4) {
        var r4 = T[t6], n3 = T[e4];
        S[r4] = e4, S[n3] = t6, T[t6] = n3, T[e4] = r4;
      }, z2 = function() {
        var t6 = new f2();
        r3 < o3 && (w.push(v.length), v.push(1), x.push(r3)), E.push(_.length);
        var l4 = g2[r3], d4 = g2[r3 + 1];
        for (i3 = l4; i3 < d4; i3++)
          e3 = y2[i3], t6.set(S[e3], m2[i3]);
        r3 > 0 && t6.forEach(0, r3 - 1, function(e4, r4) {
          p2._forEachRow(e4, v, x, w, function(n3, i4) {
            n3 > e4 && t6.accumulate(n3, c2(a2(i4, r4)));
          });
        });
        var T2 = r3, z3 = t6.get(r3), A2 = n2(z3);
        t6.forEach(r3 + 1, o3 - 1, function(t7, e4) {
          var r4 = n2(e4);
          u2(r4, A2) && (T2 = t7, A2 = r4, z3 = e4);
        }), r3 !== T2 && (p2._swapRows(r3, T2, b[1], v, x, w), p2._swapRows(r3, T2, N[1], _, M, E), t6.swap(r3, T2), O2(r3, T2)), t6.forEach(0, o3 - 1, function(t7, e4) {
          t7 <= r3 ? (_.push(e4), M.push(t7)) : (e4 = s2(e4, z3), h(e4, 0) || (v.push(e4), x.push(t7)));
        });
      };
      for (r3 = 0; r3 < l3; r3++)
        z2();
      return E.push(_.length), w.push(v.length), {L: new p2({values: v, index: x, ptr: w, size: b}), U: new p2({values: _, index: M, ptr: E, size: N}), p: S, toString: function() {
        return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
      }};
    }(t4);
  }, Array: function(t4) {
    var e3 = d2(r2(t4));
    return {L: e3.L.valueOf(), U: e3.U.valueOf(), p: e3.p};
  }});
  function d2(t4) {
    var e3, r3, c3, p3 = t4._size[0], f3 = t4._size[1], d3 = Math.min(p3, f3), m2 = pr(t4._data), y2 = [], g2 = [p3, d3], v = [], x = [d3, f3], w = [];
    for (e3 = 0; e3 < p3; e3++)
      w[e3] = e3;
    for (r3 = 0; r3 < f3; r3++) {
      if (r3 > 0)
        for (e3 = 0; e3 < p3; e3++) {
          var b = Math.min(e3, r3), _ = 0;
          for (c3 = 0; c3 < b; c3++)
            _ = i2(_, a2(m2[e3][c3], m2[c3][r3]));
          m2[e3][r3] = o2(m2[e3][r3], _);
        }
      var M = r3, E = 0, N = 0;
      for (e3 = r3; e3 < p3; e3++) {
        var S = m2[e3][r3], T = n2(S);
        u2(T, E) && (M = e3, E = T, N = S);
      }
      if (r3 !== M && (w[r3] = [w[M], w[M] = w[r3]][0], l2._swapRows(r3, M, m2)), r3 < p3)
        for (e3 = r3 + 1; e3 < p3; e3++) {
          var O2 = m2[e3][r3];
          h(O2, 0) || (m2[e3][r3] = s2(m2[e3][r3], N));
        }
    }
    for (r3 = 0; r3 < f3; r3++)
      for (e3 = 0; e3 < p3; e3++)
        r3 === 0 && (e3 < f3 && (v[e3] = []), y2[e3] = []), e3 < r3 ? (e3 < f3 && (v[e3][r3] = m2[e3][r3]), r3 < p3 && (y2[e3][r3] = 0)) : e3 !== r3 ? (e3 < f3 && (v[e3][r3] = 0), r3 < p3 && (y2[e3][r3] = m2[e3][r3])) : (e3 < f3 && (v[e3][r3] = m2[e3][r3]), r3 < p3 && (y2[e3][r3] = 1));
    var z2 = new l2({data: y2, size: g2}), A2 = new l2({data: v, size: x}), C2 = [];
    for (e3 = 0, d3 = w.length; e3 < d3; e3++)
      C2[w[e3]] = e3;
    return {L: z2, U: A2, p: C2, toString: function() {
      return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
    }};
  }
})}, matrixDependencies: zo, multiplyDependencies: Bo, subtractDependencies: Fo, typedDependencies: Eo, unaryMinusDependencies: Ao, createDet: cn("det", ["typed", "matrix", "subtract", "multiply", "unaryMinus", "lup"], (t3) => {
  var {typed: e2, matrix: r2, subtract: n2, multiply: i2, unaryMinus: s2, lup: a2} = t3;
  return e2("det", {any: function(t4) {
    return pr(t4);
  }, "Array | Matrix": function(t4) {
    var e3;
    switch ((e3 = ke(t4) ? t4.size() : Array.isArray(t4) ? (t4 = r2(t4)).size() : []).length) {
      case 0:
        return pr(t4);
      case 1:
        if (e3[0] === 1)
          return pr(t4.valueOf()[0]);
        throw new RangeError("Matrix must be square (size: " + Hr(e3) + ")");
      case 2:
        var o2 = e3[0];
        if (o2 === e3[1])
          return function(t5, e4, r3) {
            if (e4 === 1)
              return pr(t5[0][0]);
            if (e4 === 2)
              return n2(i2(t5[0][0], t5[1][1]), i2(t5[1][0], t5[0][1]));
            for (var o3 = a2(t5), u2 = o3.U[0][0], h = 1; h < e4; h++)
              u2 = i2(u2, o3.U[h][h]);
            for (var c2 = 0, l2 = 0, p2 = []; ; ) {
              for (; p2[l2]; )
                l2++;
              if (l2 >= e4)
                break;
              for (var f2 = l2, d2 = 0; !p2[o3.p[f2]]; )
                p2[o3.p[f2]] = true, f2 = o3.p[f2], d2++;
              d2 % 2 == 0 && c2++;
            }
            return c2 % 2 == 0 ? u2 : s2(u2);
          }(t4.clone().valueOf(), o2);
        throw new RangeError("Matrix must be square (size: " + Hr(e3) + ")");
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Hr(e3) + ")");
    }
  }});
})}, divideScalarDependencies: Ho, identityDependencies: Uo, matrixDependencies: zo, multiplyDependencies: Bo, typedDependencies: Eo, unaryMinusDependencies: Ao, createInv: cn("inv", ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], (t3) => {
  var {typed: e2, matrix: r2, divideScalar: n2, addScalar: i2, multiply: s2, unaryMinus: a2, det: o2, identity: u2, abs: h} = t3;
  return e2("inv", {"Array | Matrix": function(t4) {
    var e3 = ke(t4) ? t4.size() : Zr(t4);
    switch (e3.length) {
      case 1:
        if (e3[0] === 1)
          return ke(t4) ? r2([n2(1, t4.valueOf()[0])]) : [n2(1, t4[0])];
        throw new RangeError("Matrix must be square (size: " + Hr(e3) + ")");
      case 2:
        var i3 = e3[0], s3 = e3[1];
        if (i3 === s3)
          return ke(t4) ? r2(c2(t4.valueOf(), i3, s3), t4.storage()) : c2(t4, i3, s3);
        throw new RangeError("Matrix must be square (size: " + Hr(e3) + ")");
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Hr(e3) + ")");
    }
  }, any: function(t4) {
    return n2(1, t4);
  }});
  function c2(t4, e3, r3) {
    var c3, l2, p2, f2, d2;
    if (e3 === 1) {
      if ((f2 = t4[0][0]) === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[n2(1, f2)]];
    }
    if (e3 === 2) {
      var m2 = o2(t4);
      if (m2 === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[n2(t4[1][1], m2), n2(a2(t4[0][1]), m2)], [n2(a2(t4[1][0]), m2), n2(t4[0][0], m2)]];
    }
    var y2 = t4.concat();
    for (c3 = 0; c3 < e3; c3++)
      y2[c3] = y2[c3].concat();
    for (var g2 = u2(e3).valueOf(), v = 0; v < r3; v++) {
      var x = h(y2[v][v]), w = v;
      for (c3 = v + 1; c3 < e3; )
        h(y2[c3][v]) > x && (x = h(y2[c3][v]), w = c3), c3++;
      if (x === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      (c3 = w) !== v && (d2 = y2[v], y2[v] = y2[c3], y2[c3] = d2, d2 = g2[v], g2[v] = g2[c3], g2[c3] = d2);
      var b = y2[v], _ = g2[v];
      for (c3 = 0; c3 < e3; c3++) {
        var M = y2[c3], E = g2[c3];
        if (c3 !== v) {
          if (M[v] !== 0) {
            for (p2 = n2(a2(M[v]), b[v]), l2 = v; l2 < r3; l2++)
              M[l2] = i2(M[l2], s2(p2, b[l2]));
            for (l2 = 0; l2 < r3; l2++)
              E[l2] = i2(E[l2], s2(p2, _[l2]));
          }
        } else {
          for (p2 = b[v], l2 = v; l2 < r3; l2++)
            M[l2] = n2(M[l2], p2);
          for (l2 = 0; l2 < r3; l2++)
            E[l2] = n2(E[l2], p2);
        }
      }
    }
    return g2;
  }
})}, matrixDependencies: zo, multiplyDependencies: Bo, typedDependencies: Eo, createDivide: cn("divide", ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], (t3) => {
  var {typed: e2, matrix: r2, multiply: n2, equalScalar: i2, divideScalar: s2, inv: a2} = t3, o2 = Ts({typed: e2, equalScalar: i2}), u2 = Os({typed: e2});
  return e2("divide", dr({"Array | Matrix, Array | Matrix": function(t4, e3) {
    return n2(t4, a2(e3));
  }, "DenseMatrix, any": function(t4, e3) {
    return u2(t4, e3, s2, false);
  }, "SparseMatrix, any": function(t4, e3) {
    return o2(t4, e3, s2, false);
  }, "Array, any": function(t4, e3) {
    return u2(r2(t4), e3, s2, false).valueOf();
  }, "any, Array | Matrix": function(t4, e3) {
    return n2(t4, a2(e3));
  }}, s2.signatures));
})});
var Jo = {exports: {}};
function Ko() {
}
Ko.prototype = {on: function(t3, e2, r2) {
  var n2 = this.e || (this.e = {});
  return (n2[t3] || (n2[t3] = [])).push({fn: e2, ctx: r2}), this;
}, once: function(t3, e2, r2) {
  var n2 = this;
  function i2() {
    n2.off(t3, i2), e2.apply(r2, arguments);
  }
  return i2._ = e2, this.on(t3, i2, r2);
}, emit: function(t3) {
  for (var e2 = [].slice.call(arguments, 1), r2 = ((this.e || (this.e = {}))[t3] || []).slice(), n2 = 0, i2 = r2.length; n2 < i2; n2++)
    r2[n2].fn.apply(r2[n2].ctx, e2);
  return this;
}, off: function(t3, e2) {
  var r2 = this.e || (this.e = {}), n2 = r2[t3], i2 = [];
  if (n2 && e2)
    for (var s2 = 0, a2 = n2.length; s2 < a2; s2++)
      n2[s2].fn !== e2 && n2[s2].fn._ !== e2 && i2.push(n2[s2]);
  return i2.length ? r2[t3] = i2 : delete r2[t3], this;
}}, Jo.exports = Ko, Jo.exports.TinyEmitter = Ko;
new a();
function ou(t3, e2, r2, n2 = 0) {
  n2++;
  for (let i2 = t3.firstChild; i2; i2 = i2.nextSibling)
    if (i2.nodeType === Node.ELEMENT_NODE) {
      const t4 = i2;
      e2.call(r2, t4, n2) && ou(t4, e2, r2, n2);
    }
}
function uu(t3, e2, r2, n2) {
  "insertRule" in t3 ? t3.insertRule(e2 + "{" + r2 + "}", n2) : "addRule" in t3 && t3.addRule(e2, r2, n2);
}
!function(t3) {
  function e2() {
  }
  function r2(t4, e3) {
    if (t4 = t4 === void 0 ? "utf-8" : t4, e3 = e3 === void 0 ? {fatal: false} : e3, i2.indexOf(t4.toLowerCase()) === -1)
      throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('" + t4 + "') is invalid.");
    if (e3.fatal)
      throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");
  }
  function n2(t4) {
    for (var e3 = 0, r3 = Math.min(65536, t4.length + 1), n3 = new Uint16Array(r3), i3 = [], s3 = 0; ; ) {
      var a2 = e3 < t4.length;
      if (!a2 || s3 >= r3 - 1) {
        if (i3.push(String.fromCharCode.apply(null, n3.subarray(0, s3))), !a2)
          return i3.join("");
        t4 = t4.subarray(e3), s3 = e3 = 0;
      }
      if ((128 & (a2 = t4[e3++])) == 0)
        n3[s3++] = a2;
      else if ((224 & a2) == 192) {
        var o2 = 63 & t4[e3++];
        n3[s3++] = (31 & a2) << 6 | o2;
      } else if ((240 & a2) == 224) {
        o2 = 63 & t4[e3++];
        var u2 = 63 & t4[e3++];
        n3[s3++] = (31 & a2) << 12 | o2 << 6 | u2;
      } else if ((248 & a2) == 240) {
        65535 < (a2 = (7 & a2) << 18 | (o2 = 63 & t4[e3++]) << 12 | (u2 = 63 & t4[e3++]) << 6 | 63 & t4[e3++]) && (a2 -= 65536, n3[s3++] = a2 >>> 10 & 1023 | 55296, a2 = 56320 | 1023 & a2), n3[s3++] = a2;
      }
    }
  }
  if (t3.TextEncoder && t3.TextDecoder)
    return false;
  var i2 = ["utf-8", "utf8", "unicode-1-1-utf-8"];
  Object.defineProperty(e2.prototype, "encoding", {value: "utf-8"}), e2.prototype.encode = function(t4, e3) {
    if ((e3 = e3 === void 0 ? {stream: false} : e3).stream)
      throw Error("Failed to encode: the 'stream' option is unsupported.");
    e3 = 0;
    for (var r3 = t4.length, n3 = 0, i3 = Math.max(32, r3 + (r3 >>> 1) + 7), s3 = new Uint8Array(i3 >>> 3 << 3); e3 < r3; ) {
      var a2 = t4.charCodeAt(e3++);
      if (55296 <= a2 && 56319 >= a2) {
        if (e3 < r3) {
          var o2 = t4.charCodeAt(e3);
          (64512 & o2) == 56320 && (++e3, a2 = ((1023 & a2) << 10) + (1023 & o2) + 65536);
        }
        if (55296 <= a2 && 56319 >= a2)
          continue;
      }
      if (n3 + 4 > s3.length && (i3 += 8, i3 = (i3 *= 1 + e3 / t4.length * 2) >>> 3 << 3, (o2 = new Uint8Array(i3)).set(s3), s3 = o2), (4294967168 & a2) == 0)
        s3[n3++] = a2;
      else {
        if ((4294965248 & a2) == 0)
          s3[n3++] = a2 >>> 6 & 31 | 192;
        else if ((4294901760 & a2) == 0)
          s3[n3++] = a2 >>> 12 & 15 | 224, s3[n3++] = a2 >>> 6 & 63 | 128;
        else {
          if ((4292870144 & a2) != 0)
            continue;
          s3[n3++] = a2 >>> 18 & 7 | 240, s3[n3++] = a2 >>> 12 & 63 | 128, s3[n3++] = a2 >>> 6 & 63 | 128;
        }
        s3[n3++] = 63 & a2 | 128;
      }
    }
    return s3.slice ? s3.slice(0, n3) : s3.subarray(0, n3);
  }, Object.defineProperty(r2.prototype, "encoding", {value: "utf-8"}), Object.defineProperty(r2.prototype, "fatal", {value: false}), Object.defineProperty(r2.prototype, "ignoreBOM", {value: false});
  var s2 = n2;
  typeof Buffer == "function" && Buffer.from ? s2 = function(t4) {
    return Buffer.from(t4.buffer, t4.byteOffset, t4.byteLength).toString("utf-8");
  } : typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function" && (s2 = function(t4) {
    var e3 = URL.createObjectURL(new Blob([t4], {type: "text/plain;charset=UTF-8"}));
    try {
      var r3 = new XMLHttpRequest();
      return r3.open("GET", e3, false), r3.send(), r3.responseText;
    } catch (i3) {
      return n2(t4);
    } finally {
      URL.revokeObjectURL(e3);
    }
  }), r2.prototype.decode = function(t4, e3) {
    if ((e3 = e3 === void 0 ? {stream: false} : e3).stream)
      throw Error("Failed to decode: the 'stream' option is unsupported.");
    return t4 = t4 instanceof Uint8Array ? t4 : t4.buffer instanceof ArrayBuffer ? new Uint8Array(t4.buffer) : new Uint8Array(t4), s2(t4);
  }, t3.TextEncoder = e2, t3.TextDecoder = r2;
}(typeof window != "undefined" ? window : Sr);
class hu {
  constructor() {
    this.left = 0, this.top = 0, this.width = 0, this.height = 0;
  }
  copy(t3) {
    return this.top = t3.top, this.left = t3.left, this.width = t3.width, this.height = t3.height, this;
  }
}
class cu {
  constructor() {
    this.left = 0, this.top = 0, this.right = 0, this.bottom = 0;
  }
  copy(t3) {
    return this.top = t3.top, this.left = t3.left, this.right = t3.right, this.bottom = t3.bottom, this;
  }
}
function lu(t3, e2 = new hu(), r2) {
  const n2 = t3.ownerDocument, i2 = n2.documentElement, s2 = n2.body;
  if (t3 === i2)
    return function(t4, e3) {
      const r3 = t4.documentElement, n3 = t4.body, i3 = getComputedStyle(r3), s3 = getComputedStyle(n3);
      return e3.top = n3.offsetTop + parseFloat(i3.marginTop) || 0 + parseFloat(s3.marginTop) || 0, e3.left = n3.offsetLeft + parseFloat(i3.marginLeft) || 0 + parseFloat(s3.marginLeft) || 0, e3.width = Math.max(Math.max(n3.scrollWidth, r3.scrollWidth), Math.max(n3.offsetWidth, r3.offsetWidth), Math.max(n3.clientWidth, r3.clientWidth)), e3.height = Math.max(Math.max(n3.scrollHeight, r3.scrollHeight), Math.max(n3.offsetHeight, r3.offsetHeight), Math.max(n3.clientHeight, r3.clientHeight)), e3;
    }(n2, e2);
  if (r2 === t3)
    return e2.left = 0, e2.top = 0, e2.width = t3.offsetWidth, void (e2.height = t3.offsetHeight);
  const a2 = t3.ownerDocument.defaultView;
  let o2, u2 = t3, h = u2.offsetParent, c2 = a2.getComputedStyle(u2, null), l2 = u2.offsetTop, p2 = u2.offsetLeft;
  for (h && r2 && h.contains(r2) && h !== r2 && (lu(r2, e2, h), p2 -= e2.left, l2 -= e2.top); (u2 = u2.parentElement) && u2 !== s2 && u2 !== i2 && u2 !== r2 && c2.position !== "fixed"; )
    o2 = a2.getComputedStyle(u2, null), l2 -= u2.scrollTop, p2 -= u2.scrollLeft, u2 === h && (l2 += u2.offsetTop, p2 += u2.offsetLeft, l2 += parseFloat(o2.borderTopWidth) || 0, p2 += parseFloat(o2.borderLeftWidth) || 0, h = u2.offsetParent), c2 = o2;
  return c2.position === "fixed" && (l2 += Math.max(i2.scrollTop, s2.scrollTop), p2 += Math.max(i2.scrollLeft, s2.scrollLeft)), e2.left = p2, e2.top = l2, e2.width = t3.offsetWidth, e2.height = t3.offsetHeight, e2;
}
const pu = document.createElement("div");
function fu(t3) {
  const e2 = document.createElement("div");
  e2.innerHTML = t3;
  const r2 = e2.firstElementChild;
  return e2.removeChild(r2), r2;
}
pu.id = "VIEWPORT", pu.style.position = "fixed", pu.style.width = "100vw", pu.style.height = "100vh", pu.style.visibility = "hidden", pu.style.pointerEvents = "none";
var du = {};
!function(t3) {
  const e2 = Symbol("newer"), r2 = Symbol("older");
  function n2(t4, e3) {
    typeof t4 != "number" && (e3 = t4, t4 = 0), this.size = 0, this.limit = t4, this.oldest = this.newest = void 0, this._keymap = new Map(), e3 && (this.assign(e3), t4 < 1 && (this.limit = this.size));
  }
  function i2(t4, n3) {
    this.key = t4, this.value = n3, this[e2] = void 0, this[r2] = void 0;
  }
  function s2(t4) {
    this.entry = t4;
  }
  function a2(t4) {
    this.entry = t4;
  }
  function o2(t4) {
    this.entry = t4;
  }
  t3.LRUMap = n2, n2.prototype._markEntryAsUsed = function(t4) {
    t4 !== this.newest && (t4[e2] && (t4 === this.oldest && (this.oldest = t4[e2]), t4[e2][r2] = t4[r2]), t4[r2] && (t4[r2][e2] = t4[e2]), t4[e2] = void 0, t4[r2] = this.newest, this.newest && (this.newest[e2] = t4), this.newest = t4);
  }, n2.prototype.assign = function(t4) {
    let n3, s3 = this.limit || Number.MAX_VALUE;
    this._keymap.clear();
    let a3 = t4[Symbol.iterator]();
    for (let o3 = a3.next(); !o3.done; o3 = a3.next()) {
      let t5 = new i2(o3.value[0], o3.value[1]);
      if (this._keymap.set(t5.key, t5), n3 ? (n3[e2] = t5, t5[r2] = n3) : this.oldest = t5, n3 = t5, s3-- == 0)
        throw new Error("overflow");
    }
    this.newest = n3, this.size = this._keymap.size;
  }, n2.prototype.get = function(t4) {
    var e3 = this._keymap.get(t4);
    if (e3)
      return this._markEntryAsUsed(e3), e3.value;
  }, n2.prototype.set = function(t4, n3) {
    var s3 = this._keymap.get(t4);
    return s3 ? (s3.value = n3, this._markEntryAsUsed(s3), this) : (this._keymap.set(t4, s3 = new i2(t4, n3)), this.newest ? (this.newest[e2] = s3, s3[r2] = this.newest) : this.oldest = s3, this.newest = s3, ++this.size, this.size > this.limit && this.shift(), this);
  }, n2.prototype.shift = function() {
    var t4 = this.oldest;
    if (t4)
      return this.oldest[e2] ? (this.oldest = this.oldest[e2], this.oldest[r2] = void 0) : (this.oldest = void 0, this.newest = void 0), t4[e2] = t4[r2] = void 0, this._keymap.delete(t4.key), --this.size, [t4.key, t4.value];
  }, n2.prototype.find = function(t4) {
    let e3 = this._keymap.get(t4);
    return e3 ? e3.value : void 0;
  }, n2.prototype.has = function(t4) {
    return this._keymap.has(t4);
  }, n2.prototype.delete = function(t4) {
    var n3 = this._keymap.get(t4);
    if (n3)
      return this._keymap.delete(n3.key), n3[e2] && n3[r2] ? (n3[r2][e2] = n3[e2], n3[e2][r2] = n3[r2]) : n3[e2] ? (n3[e2][r2] = void 0, this.oldest = n3[e2]) : n3[r2] ? (n3[r2][e2] = void 0, this.newest = n3[r2]) : this.oldest = this.newest = void 0, this.size--, n3.value;
  }, n2.prototype.clear = function() {
    this.oldest = this.newest = void 0, this.size = 0, this._keymap.clear();
  }, s2.prototype[Symbol.iterator] = function() {
    return this;
  }, s2.prototype.next = function() {
    let t4 = this.entry;
    return t4 ? (this.entry = t4[e2], {done: false, value: [t4.key, t4.value]}) : {done: true, value: void 0};
  }, a2.prototype[Symbol.iterator] = function() {
    return this;
  }, a2.prototype.next = function() {
    let t4 = this.entry;
    return t4 ? (this.entry = t4[e2], {done: false, value: t4.key}) : {done: true, value: void 0};
  }, o2.prototype[Symbol.iterator] = function() {
    return this;
  }, o2.prototype.next = function() {
    let t4 = this.entry;
    return t4 ? (this.entry = t4[e2], {done: false, value: t4.value}) : {done: true, value: void 0};
  }, n2.prototype.keys = function() {
    return new a2(this.oldest);
  }, n2.prototype.values = function() {
    return new o2(this.oldest);
  }, n2.prototype.entries = function() {
    return this;
  }, n2.prototype[Symbol.iterator] = function() {
    return new s2(this.oldest);
  }, n2.prototype.forEach = function(t4, r3) {
    typeof r3 != "object" && (r3 = this);
    let n3 = this.oldest;
    for (; n3; )
      t4.call(r3, n3.value, n3.key, this), n3 = n3[e2];
  }, n2.prototype.toJSON = function() {
    for (var t4 = new Array(this.size), r3 = 0, n3 = this.oldest; n3; )
      t4[r3++] = {key: n3.key, value: n3.value}, n3 = n3[e2];
    return t4;
  }, n2.prototype.toString = function() {
    for (var t4 = "", r3 = this.oldest; r3; )
      t4 += String(r3.key) + ":" + r3.value, (r3 = r3[e2]) && (t4 += " < ");
    return t4;
  };
}(du);
var mu = {exports: {}};
!function(t3) {
  !function(e2, r2) {
    var n2 = {};
    !function(t4) {
      t4.__esModule = true, t4.digestLength = 32, t4.blockSize = 64;
      var e3 = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
      function r3(t5, r4, n4, i4, s4) {
        for (var a3, o3, u3, h2, c3, l2, p2, f2, d2, m2, y2, g2, v; s4 >= 64; ) {
          for (a3 = r4[0], o3 = r4[1], u3 = r4[2], h2 = r4[3], c3 = r4[4], l2 = r4[5], p2 = r4[6], f2 = r4[7], m2 = 0; m2 < 16; m2++)
            y2 = i4 + 4 * m2, t5[m2] = (255 & n4[y2]) << 24 | (255 & n4[y2 + 1]) << 16 | (255 & n4[y2 + 2]) << 8 | 255 & n4[y2 + 3];
          for (m2 = 16; m2 < 64; m2++)
            g2 = ((d2 = t5[m2 - 2]) >>> 17 | d2 << 15) ^ (d2 >>> 19 | d2 << 13) ^ d2 >>> 10, v = ((d2 = t5[m2 - 15]) >>> 7 | d2 << 25) ^ (d2 >>> 18 | d2 << 14) ^ d2 >>> 3, t5[m2] = (g2 + t5[m2 - 7] | 0) + (v + t5[m2 - 16] | 0);
          for (m2 = 0; m2 < 64; m2++)
            g2 = (((c3 >>> 6 | c3 << 26) ^ (c3 >>> 11 | c3 << 21) ^ (c3 >>> 25 | c3 << 7)) + (c3 & l2 ^ ~c3 & p2) | 0) + (f2 + (e3[m2] + t5[m2] | 0) | 0) | 0, v = ((a3 >>> 2 | a3 << 30) ^ (a3 >>> 13 | a3 << 19) ^ (a3 >>> 22 | a3 << 10)) + (a3 & o3 ^ a3 & u3 ^ o3 & u3) | 0, f2 = p2, p2 = l2, l2 = c3, c3 = h2 + g2 | 0, h2 = u3, u3 = o3, o3 = a3, a3 = g2 + v | 0;
          r4[0] += a3, r4[1] += o3, r4[2] += u3, r4[3] += h2, r4[4] += c3, r4[5] += l2, r4[6] += p2, r4[7] += f2, i4 += 64, s4 -= 64;
        }
        return i4;
      }
      var n3 = function() {
        function e4() {
          this.digestLength = t4.digestLength, this.blockSize = t4.blockSize, this.state = new Int32Array(8), this.temp = new Int32Array(64), this.buffer = new Uint8Array(128), this.bufferLength = 0, this.bytesHashed = 0, this.finished = false, this.reset();
        }
        return e4.prototype.reset = function() {
          return this.state[0] = 1779033703, this.state[1] = 3144134277, this.state[2] = 1013904242, this.state[3] = 2773480762, this.state[4] = 1359893119, this.state[5] = 2600822924, this.state[6] = 528734635, this.state[7] = 1541459225, this.bufferLength = 0, this.bytesHashed = 0, this.finished = false, this;
        }, e4.prototype.clean = function() {
          for (var t5 = 0; t5 < this.buffer.length; t5++)
            this.buffer[t5] = 0;
          for (t5 = 0; t5 < this.temp.length; t5++)
            this.temp[t5] = 0;
          this.reset();
        }, e4.prototype.update = function(t5, e5) {
          if (e5 === void 0 && (e5 = t5.length), this.finished)
            throw new Error("SHA256: can't update because hash was finished.");
          var n4 = 0;
          if (this.bytesHashed += e5, this.bufferLength > 0) {
            for (; this.bufferLength < 64 && e5 > 0; )
              this.buffer[this.bufferLength++] = t5[n4++], e5--;
            this.bufferLength === 64 && (r3(this.temp, this.state, this.buffer, 0, 64), this.bufferLength = 0);
          }
          for (e5 >= 64 && (n4 = r3(this.temp, this.state, t5, n4, e5), e5 %= 64); e5 > 0; )
            this.buffer[this.bufferLength++] = t5[n4++], e5--;
          return this;
        }, e4.prototype.finish = function(t5) {
          if (!this.finished) {
            var e5 = this.bytesHashed, n4 = this.bufferLength, i4 = e5 / 536870912 | 0, s4 = e5 << 3, a3 = e5 % 64 < 56 ? 64 : 128;
            this.buffer[n4] = 128;
            for (var o3 = n4 + 1; o3 < a3 - 8; o3++)
              this.buffer[o3] = 0;
            this.buffer[a3 - 8] = i4 >>> 24 & 255, this.buffer[a3 - 7] = i4 >>> 16 & 255, this.buffer[a3 - 6] = i4 >>> 8 & 255, this.buffer[a3 - 5] = i4 >>> 0 & 255, this.buffer[a3 - 4] = s4 >>> 24 & 255, this.buffer[a3 - 3] = s4 >>> 16 & 255, this.buffer[a3 - 2] = s4 >>> 8 & 255, this.buffer[a3 - 1] = s4 >>> 0 & 255, r3(this.temp, this.state, this.buffer, 0, a3), this.finished = true;
          }
          for (o3 = 0; o3 < 8; o3++)
            t5[4 * o3 + 0] = this.state[o3] >>> 24 & 255, t5[4 * o3 + 1] = this.state[o3] >>> 16 & 255, t5[4 * o3 + 2] = this.state[o3] >>> 8 & 255, t5[4 * o3 + 3] = this.state[o3] >>> 0 & 255;
          return this;
        }, e4.prototype.digest = function() {
          var t5 = new Uint8Array(this.digestLength);
          return this.finish(t5), t5;
        }, e4.prototype._saveState = function(t5) {
          for (var e5 = 0; e5 < this.state.length; e5++)
            t5[e5] = this.state[e5];
        }, e4.prototype._restoreState = function(t5, e5) {
          for (var r4 = 0; r4 < this.state.length; r4++)
            this.state[r4] = t5[r4];
          this.bytesHashed = e5, this.finished = false, this.bufferLength = 0;
        }, e4;
      }();
      t4.Hash = n3;
      var i3 = function() {
        function t5(t6) {
          this.inner = new n3(), this.outer = new n3(), this.blockSize = this.inner.blockSize, this.digestLength = this.inner.digestLength;
          var e4 = new Uint8Array(this.blockSize);
          if (t6.length > this.blockSize)
            new n3().update(t6).finish(e4).clean();
          else
            for (var r4 = 0; r4 < t6.length; r4++)
              e4[r4] = t6[r4];
          for (r4 = 0; r4 < e4.length; r4++)
            e4[r4] ^= 54;
          this.inner.update(e4);
          for (r4 = 0; r4 < e4.length; r4++)
            e4[r4] ^= 106;
          this.outer.update(e4), this.istate = new Uint32Array(8), this.ostate = new Uint32Array(8), this.inner._saveState(this.istate), this.outer._saveState(this.ostate);
          for (r4 = 0; r4 < e4.length; r4++)
            e4[r4] = 0;
        }
        return t5.prototype.reset = function() {
          return this.inner._restoreState(this.istate, this.inner.blockSize), this.outer._restoreState(this.ostate, this.outer.blockSize), this;
        }, t5.prototype.clean = function() {
          for (var t6 = 0; t6 < this.istate.length; t6++)
            this.ostate[t6] = this.istate[t6] = 0;
          this.inner.clean(), this.outer.clean();
        }, t5.prototype.update = function(t6) {
          return this.inner.update(t6), this;
        }, t5.prototype.finish = function(t6) {
          return this.outer.finished ? this.outer.finish(t6) : (this.inner.finish(t6), this.outer.update(t6, this.digestLength).finish(t6)), this;
        }, t5.prototype.digest = function() {
          var t6 = new Uint8Array(this.digestLength);
          return this.finish(t6), t6;
        }, t5;
      }();
      function s3(t5) {
        var e4 = new n3().update(t5), r4 = e4.digest();
        return e4.clean(), r4;
      }
      function a2(t5, e4) {
        var r4 = new i3(t5).update(e4), n4 = r4.digest();
        return r4.clean(), n4;
      }
      function o2(t5, e4, r4, n4) {
        var i4 = n4[0];
        if (i4 === 0)
          throw new Error("hkdf: cannot expand more");
        e4.reset(), i4 > 1 && e4.update(t5), r4 && e4.update(r4), e4.update(n4), e4.finish(t5), n4[0]++;
      }
      t4.HMAC = i3, t4.hash = s3, t4.default = s3, t4.hmac = a2;
      var u2 = new Uint8Array(t4.digestLength);
      function h(t5, e4, r4, n4) {
        e4 === void 0 && (e4 = u2), n4 === void 0 && (n4 = 32);
        for (var s4 = new Uint8Array([1]), h2 = a2(e4, t5), c3 = new i3(h2), l2 = new Uint8Array(c3.digestLength), p2 = l2.length, f2 = new Uint8Array(n4), d2 = 0; d2 < n4; d2++)
          p2 === l2.length && (o2(l2, c3, r4, s4), p2 = 0), f2[d2] = l2[p2++];
        return c3.clean(), l2.fill(0), s4.fill(0), f2;
      }
      function c2(t5, e4, r4, n4) {
        for (var s4 = new i3(t5), a3 = s4.digestLength, o3 = new Uint8Array(4), u3 = new Uint8Array(a3), h2 = new Uint8Array(a3), c3 = new Uint8Array(n4), l2 = 0; l2 * a3 < n4; l2++) {
          var p2 = l2 + 1;
          o3[0] = p2 >>> 24 & 255, o3[1] = p2 >>> 16 & 255, o3[2] = p2 >>> 8 & 255, o3[3] = p2 >>> 0 & 255, s4.reset(), s4.update(e4), s4.update(o3), s4.finish(h2);
          for (var f2 = 0; f2 < a3; f2++)
            u3[f2] = h2[f2];
          for (f2 = 2; f2 <= r4; f2++) {
            s4.reset(), s4.update(h2).finish(h2);
            for (var d2 = 0; d2 < a3; d2++)
              u3[d2] ^= h2[d2];
          }
          for (f2 = 0; f2 < a3 && l2 * a3 + f2 < n4; f2++)
            c3[l2 * a3 + f2] = u3[f2];
        }
        for (l2 = 0; l2 < a3; l2++)
          u3[l2] = h2[l2] = 0;
        for (l2 = 0; l2 < 4; l2++)
          o3[l2] = 0;
        return s4.clean(), c3;
      }
      t4.hkdf = h, t4.pbkdf2 = c2;
    }(n2);
    var i2 = n2.default;
    for (var s2 in n2)
      i2[s2] = n2[s2];
    t3.exports = i2;
  }();
}(mu);
const yu = class {
  constructor(t3, e2) {
    this.element = t3, this.eventCallback = e2, this.needsRefresh = true, this.needsRemoval = false, this.psuedoStates = {hover: false, active: false, focus: false, target: false}, this.svgImage = new Image(), this.bounds = new hu(), this.padding = new cu(), this.margin = new cu(), this.border = new cu(), this.childLayers = [], this.cachedBounds = new Map(), this.cachedMargin = new Map(), this._dynamicAttributes = "", this._svgDocument = "", this._rasterizingDocument = "", this._svgSrc = "", this._hashingCanvas = document.createElement("canvas"), ch.layers.set(t3, this), this.id = t3.getAttribute(ch.ELEMENT_UID_ATTRIBUTE) || ch.generateElementUID(), t3.setAttribute(ch.ELEMENT_UID_ATTRIBUTE, this.id), t3.setAttribute(ch.LAYER_ATTRIBUTE, ""), this.parentLayer = ch.getClosestLayer(this.element.parentElement), this.eventCallback("layercreated", {target: t3}), yu.cachedCanvases.limit = ch.layers.size * yu.DEFAULT_CACHE_SIZE, this._hashingCanvas.width = 20, this._hashingCanvas.height = 20;
  }
  set canvas(t3) {
    this._canvas !== t3 && (this._canvas = t3, this.eventCallback && this.eventCallback("layerpainted", {target: this.element}));
  }
  get canvas() {
    return this._canvas;
  }
  get depth() {
    let t3 = 0, e2 = this;
    for (; e2.parentLayer; )
      e2 = e2.parentLayer, t3++;
    return t3;
  }
  get rootLayer() {
    let t3 = this;
    for (; t3.parentLayer; )
      t3 = t3.parentLayer;
    return t3;
  }
  traverseParentLayers(t3) {
    const e2 = this.parentLayer;
    e2 && (e2.traverseParentLayers(t3), t3(e2));
  }
  traverseLayers(t3) {
    t3(this), this.traverseChildLayers(t3);
  }
  traverseChildLayers(t3) {
    for (const e2 of this.childLayers)
      e2.traverseLayers(t3);
  }
  refresh() {
    lu(this.element, this.bounds, this.parentLayer && this.parentLayer.element), this.needsRefresh = false, this._updateParentAndChildLayers(), ch.addToSerializeQueue(this);
  }
  _updateParentAndChildLayers() {
    const t3 = this.element, e2 = this.childLayers, r2 = e2.slice(), n2 = this.parentLayer;
    this.parentLayer = ch.getClosestLayer(this.element.parentElement), n2 !== this.parentLayer && (this.parentLayer && this.parentLayer.childLayers.push(this), this.eventCallback("layermoved", {target: t3})), e2.length = 0, ou(t3, this._tryConvertElementToWebLayer, this);
    for (const i2 of r2) {
      ch.getClosestLayer(i2.element.parentElement) || (i2.needsRemoval = true, e2.push(i2));
    }
  }
  _tryConvertElementToWebLayer(t3) {
    if (this.needsRemoval)
      return false;
    const e2 = t3, r2 = getComputedStyle(e2);
    e2.getAttribute(ch.ELEMENT_UID_ATTRIBUTE) || e2.setAttribute(ch.ELEMENT_UID_ATTRIBUTE, ch.generateElementUID());
    if (e2.hasAttribute(ch.LAYER_ATTRIBUTE) || e2.nodeName === "VIDEO" || r2.transform !== "none") {
      let t4 = ch.layers.get(e2);
      return t4 || (t4 = new yu(e2, this.eventCallback)), this.childLayers.push(t4), false;
    }
    return true;
  }
  async serialize() {
    if (this.element.nodeName === "VIDEO")
      return;
    let {width: t3, height: e2} = this.bounds;
    if (t3 * e2 > 0) {
      !function(t4, e3) {
        let r3 = getComputedStyle(t4);
        e3.left = parseFloat(r3.paddingLeft) || 0, e3.right = parseFloat(r3.paddingRight) || 0, e3.top = parseFloat(r3.paddingTop) || 0, e3.bottom = parseFloat(r3.paddingBottom) || 0;
      }(this.element, this.padding), function(t4, e3) {
        let r3 = getComputedStyle(t4);
        e3.left = parseFloat(r3.marginLeft) || 0, e3.right = parseFloat(r3.marginRight) || 0, e3.top = parseFloat(r3.marginTop) || 0, e3.bottom = parseFloat(r3.marginBottom) || 0;
      }(this.element, this.margin), function(t4, e3) {
        let r3 = getComputedStyle(t4);
        e3.left = parseFloat(r3.borderLeftWidth) || 0, e3.right = parseFloat(r3.borderRightWidth) || 0, e3.top = parseFloat(r3.borderTopWidth) || 0, e3.bottom = parseFloat(r3.borderBottomWidth) || 0;
      }(this.element, this.border), t3 += Math.max(this.margin.left, 0) + Math.max(this.margin.right, 0), e2 += Math.max(this.margin.top, 0) + Math.max(this.margin.bottom, 0);
      const r2 = ch.attributeHTML(ch.ELEMENT_UID_ATTRIBUTE, "" + this.id), n2 = this.element, i2 = getComputedStyle(n2).display === "inline";
      ch.updateInputAttributes(n2);
      const s2 = ch.serializer.serializeToString(n2).replace(r2, `${r2} ${ch.RENDERING_ATTRIBUTE}="" ${i2 ? `${ch.RENDERING_INLINE_ATTRIBUTE}="" ` : " "} ` + ch.getPsuedoAttributes(this.psuedoStates)), a2 = this._getParentsHTML(n2);
      a2[0] = a2[0].replace("html", "html " + ch.RENDERING_DOCUMENT_ATTRIBUTE + '="" ');
      const [o2] = await Promise.all([ch.getEmbeddedCSS(this.element), ch.embedExternalResources(this.element)]), u2 = '<svg width="' + t3 + '" height="' + e2 + '" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[a[href]{color:#0000EE;text-decoration:underline;}' + o2.join("") + ']]></style></defs><foreignObject x="0" y="0" width="' + t3 + '" height="' + e2 + '">' + a2[0] + s2 + a2[1] + "</foreignObject></svg>", h = this._svgDocument = u2, c2 = yu.canvasHashes.get(h);
      if (c2 && yu.cachedCanvases.has(c2))
        return void (this.canvas = yu.cachedCanvases.get(c2));
      this.cachedBounds.set(h, new hu().copy(this.bounds)), this.cachedMargin.set(h, new cu().copy(this.margin)), ch.addToRasterizeQueue(this);
    }
  }
  async rasterize() {
    return new Promise((t3) => {
      this.svgImage.onload = () => {
        ch.addToRenderQueue(this), t3();
      }, this._rasterizingDocument = this._svgDocument, this.svgImage.src = this._svgSrc = "data:image/svg+xml;utf8," + encodeURIComponent(this._svgDocument), this.svgImage.complete && this.svgImage.currentSrc === this.svgImage.src && (ch.addToRenderQueue(this), this.svgImage.onload = null, t3());
    });
  }
  render() {
    const t3 = this._rasterizingDocument;
    if (!this.cachedBounds.has(t3) || !this.cachedMargin.has(t3))
      return void (this.needsRefresh = true);
    if (!this.svgImage.complete)
      return void ch.addToRenderQueue(this);
    let {width: e2, height: r2} = this.cachedBounds.get(t3), {left: n2, top: i2} = this.cachedMargin.get(t3);
    const s2 = this._hashingCanvas;
    let a2 = s2.width, o2 = s2.height;
    const u2 = s2.getContext("2d");
    u2.clearRect(0, 0, a2, o2), u2.imageSmoothingEnabled = false, u2.drawImage(this.svgImage, n2, i2, e2, r2, 0, 0, a2, o2);
    const h = u2.getImageData(0, 0, a2, o2).data, c2 = ch.arrayBufferToBase64(mu.exports.hash(new Uint8Array(h))) + "?w=" + e2 + ";h=" + r2;
    yu.canvasHashes.set(t3, c2);
    const l2 = yu.blankRetryCounts.get(t3) || 0;
    if (ch.isBlankImage(h) && l2 < 10)
      return yu.blankRetryCounts.set(t3, l2 + 1), void setTimeout(() => ch.addToRenderQueue(this), 500);
    if (yu.cachedCanvases.has(c2))
      return void (this.canvas = yu.cachedCanvases.get(c2));
    const p2 = this.pixelRatio || parseFloat(this.element.getAttribute(ch.PIXEL_RATIO_ATTRIBUTE)) || window.devicePixelRatio, f2 = yu.cachedCanvases.size === yu.cachedCanvases.limit ? yu.cachedCanvases.shift()[1] : document.createElement("canvas");
    let d2 = f2.width = e2 * p2, m2 = f2.height = r2 * p2;
    const y2 = f2.getContext("2d");
    y2.imageSmoothingEnabled = false, y2.clearRect(0, 0, d2, m2), y2.drawImage(this.svgImage, n2, i2, e2, r2, 0, 0, d2, m2), yu.cachedCanvases.set(c2, f2), this.canvas = f2;
  }
  _getParentsHTML(t3) {
    const e2 = [], r2 = [];
    let n2 = t3.parentElement;
    n2 || (n2 = document.documentElement);
    do {
      let t4 = n2.tagName.toLowerCase(), i2 = " ";
      for (const e3 of n2.attributes)
        e3.name !== "style" && (i2 += `${e3.name}="${e3.value}" `);
      const s2 = "<" + t4 + (t4 === "html" ? ` xmlns="http://www.w3.org/1999/xhtml" style="--x-width:${this.bounds.width}px;--x-height:${this.bounds.height}px;--x-inline-top:${this.border.top + this.margin.top + this.padding.top}px" ` : "") + i2 + `${ch.RENDERING_PARENT_ATTRIBUTE}=""  >`;
      e2.unshift(s2);
      const a2 = "</" + t4 + ">";
      if (r2.push(a2), t4 == "html")
        break;
    } while (n2 = n2.parentElement);
    return [e2.join(""), r2.join("")];
  }
};
let gu = yu;
gu.DEFAULT_CACHE_SIZE = 4, gu.blankRetryCounts = new Map(), gu.canvasHashes = new du.LRUMap(1e3), gu.cachedCanvases = new du.LRUMap(yu.DEFAULT_CACHE_SIZE);
var vu, xu, wu = [], bu = "ResizeObserver loop completed with undelivered notifications.";
(xu = vu || (vu = {})).BORDER_BOX = "border-box", xu.CONTENT_BOX = "content-box", xu.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
var _u, Mu = function(t3) {
  return Object.freeze(t3);
}, Eu = function(t3, e2) {
  this.inlineSize = t3, this.blockSize = e2, Mu(this);
}, Nu = function() {
  function t3(t4, e2, r2, n2) {
    return this.x = t4, this.y = e2, this.width = r2, this.height = n2, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Mu(this);
  }
  return t3.prototype.toJSON = function() {
    var t4 = this;
    return {x: t4.x, y: t4.y, top: t4.top, right: t4.right, bottom: t4.bottom, left: t4.left, width: t4.width, height: t4.height};
  }, t3.fromRect = function(e2) {
    return new t3(e2.x, e2.y, e2.width, e2.height);
  }, t3;
}(), Su = function(t3) {
  return t3 instanceof SVGElement && "getBBox" in t3;
}, Tu = function(t3) {
  if (Su(t3)) {
    var e2 = t3.getBBox(), r2 = e2.width, n2 = e2.height;
    return !r2 && !n2;
  }
  var i2 = t3, s2 = i2.offsetWidth, a2 = i2.offsetHeight;
  return !(s2 || a2 || t3.getClientRects().length);
}, Ou = function(t3) {
  var e2, r2;
  if (t3 instanceof Element)
    return true;
  var n2 = (r2 = (e2 = t3) === null || e2 === void 0 ? void 0 : e2.ownerDocument) === null || r2 === void 0 ? void 0 : r2.defaultView;
  return !!(n2 && t3 instanceof n2.Element);
}, zu = typeof window != "undefined" ? window : {}, Au = new WeakMap(), Cu = /auto|scroll/, Ru = /^tb|vertical/, Du = /msie|trident/i.test(zu.navigator && zu.navigator.userAgent), ku = function(t3) {
  return parseFloat(t3 || "0");
}, Iu = function(t3, e2, r2) {
  return t3 === void 0 && (t3 = 0), e2 === void 0 && (e2 = 0), r2 === void 0 && (r2 = false), new Eu((r2 ? e2 : t3) || 0, (r2 ? t3 : e2) || 0);
}, Lu = Mu({devicePixelContentBoxSize: Iu(), borderBoxSize: Iu(), contentBoxSize: Iu(), contentRect: new Nu(0, 0, 0, 0)}), Bu = function(t3, e2) {
  if (e2 === void 0 && (e2 = false), Au.has(t3) && !e2)
    return Au.get(t3);
  if (Tu(t3))
    return Au.set(t3, Lu), Lu;
  var r2 = getComputedStyle(t3), n2 = Su(t3) && t3.ownerSVGElement && t3.getBBox(), i2 = !Du && r2.boxSizing === "border-box", s2 = Ru.test(r2.writingMode || ""), a2 = !n2 && Cu.test(r2.overflowY || ""), o2 = !n2 && Cu.test(r2.overflowX || ""), u2 = n2 ? 0 : ku(r2.paddingTop), h = n2 ? 0 : ku(r2.paddingRight), c2 = n2 ? 0 : ku(r2.paddingBottom), l2 = n2 ? 0 : ku(r2.paddingLeft), p2 = n2 ? 0 : ku(r2.borderTopWidth), f2 = n2 ? 0 : ku(r2.borderRightWidth), d2 = n2 ? 0 : ku(r2.borderBottomWidth), m2 = l2 + h, y2 = u2 + c2, g2 = (n2 ? 0 : ku(r2.borderLeftWidth)) + f2, v = p2 + d2, x = o2 ? t3.offsetHeight - v - t3.clientHeight : 0, w = a2 ? t3.offsetWidth - g2 - t3.clientWidth : 0, b = i2 ? m2 + g2 : 0, _ = i2 ? y2 + v : 0, M = n2 ? n2.width : ku(r2.width) - b - w, E = n2 ? n2.height : ku(r2.height) - _ - x, N = M + m2 + w + g2, S = E + y2 + x + v, T = Mu({devicePixelContentBoxSize: Iu(Math.round(M * devicePixelRatio), Math.round(E * devicePixelRatio), s2), borderBoxSize: Iu(N, S, s2), contentBoxSize: Iu(M, E, s2), contentRect: new Nu(l2, u2, M, E)});
  return Au.set(t3, T), T;
}, Fu = function(t3, e2, r2) {
  var n2 = Bu(t3, r2), i2 = n2.borderBoxSize, s2 = n2.contentBoxSize, a2 = n2.devicePixelContentBoxSize;
  switch (e2) {
    case vu.DEVICE_PIXEL_CONTENT_BOX:
      return a2;
    case vu.BORDER_BOX:
      return i2;
    default:
      return s2;
  }
}, Pu = function(t3) {
  var e2 = Bu(t3);
  this.target = t3, this.contentRect = e2.contentRect, this.borderBoxSize = Mu([e2.borderBoxSize]), this.contentBoxSize = Mu([e2.contentBoxSize]), this.devicePixelContentBoxSize = Mu([e2.devicePixelContentBoxSize]);
}, Uu = function(t3) {
  if (Tu(t3))
    return 1 / 0;
  for (var e2 = 0, r2 = t3.parentNode; r2; )
    e2 += 1, r2 = r2.parentNode;
  return e2;
}, ju = function() {
  var t3 = 1 / 0, e2 = [];
  wu.forEach(function(r3) {
    if (r3.activeTargets.length !== 0) {
      var n3 = [];
      r3.activeTargets.forEach(function(e3) {
        var r4 = new Pu(e3.target), i2 = Uu(e3.target);
        n3.push(r4), e3.lastReportedSize = Fu(e3.target, e3.observedBox), i2 < t3 && (t3 = i2);
      }), e2.push(function() {
        r3.callback.call(r3.observer, n3, r3.observer);
      }), r3.activeTargets.splice(0, r3.activeTargets.length);
    }
  });
  for (var r2 = 0, n2 = e2; r2 < n2.length; r2++) {
    (0, n2[r2])();
  }
  return t3;
}, qu = function(t3) {
  wu.forEach(function(e2) {
    e2.activeTargets.splice(0, e2.activeTargets.length), e2.skippedTargets.splice(0, e2.skippedTargets.length), e2.observationTargets.forEach(function(r2) {
      r2.isActive() && (Uu(r2.target) > t3 ? e2.activeTargets.push(r2) : e2.skippedTargets.push(r2));
    });
  });
}, Hu = function() {
  var t3, e2 = 0;
  for (qu(e2); wu.some(function(t4) {
    return t4.activeTargets.length > 0;
  }); )
    e2 = ju(), qu(e2);
  return wu.some(function(t4) {
    return t4.skippedTargets.length > 0;
  }) && (typeof ErrorEvent == "function" ? t3 = new ErrorEvent("error", {message: bu}) : ((t3 = document.createEvent("Event")).initEvent("error", false, false), t3.message = bu), window.dispatchEvent(t3)), e2 > 0;
}, Vu = [], $u = function(t3) {
  if (!_u) {
    var e2 = 0, r2 = document.createTextNode("");
    new MutationObserver(function() {
      return Vu.splice(0).forEach(function(t4) {
        return t4();
      });
    }).observe(r2, {characterData: true}), _u = function() {
      r2.textContent = "" + (e2 ? e2-- : e2++);
    };
  }
  Vu.push(t3), _u();
}, Gu = 0, Wu = {attributes: true, characterData: true, childList: true, subtree: true}, Yu = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"], Zu = function(t3) {
  return t3 === void 0 && (t3 = 0), Date.now() + t3;
}, Xu = false, Qu = new (function() {
  function t3() {
    var t4 = this;
    this.stopped = true, this.listener = function() {
      return t4.schedule();
    };
  }
  return t3.prototype.run = function(t4) {
    var e2 = this;
    if (t4 === void 0 && (t4 = 250), !Xu) {
      Xu = true;
      var r2, n2 = Zu(t4);
      r2 = function() {
        var r3 = false;
        try {
          r3 = Hu();
        } finally {
          if (Xu = false, t4 = n2 - Zu(), !Gu)
            return;
          r3 ? e2.run(1e3) : t4 > 0 ? e2.run(t4) : e2.start();
        }
      }, $u(function() {
        requestAnimationFrame(r2);
      });
    }
  }, t3.prototype.schedule = function() {
    this.stop(), this.run();
  }, t3.prototype.observe = function() {
    var t4 = this, e2 = function() {
      return t4.observer && t4.observer.observe(document.body, Wu);
    };
    document.body ? e2() : zu.addEventListener("DOMContentLoaded", e2);
  }, t3.prototype.start = function() {
    var t4 = this;
    this.stopped && (this.stopped = false, this.observer = new MutationObserver(this.listener), this.observe(), Yu.forEach(function(e2) {
      return zu.addEventListener(e2, t4.listener, true);
    }));
  }, t3.prototype.stop = function() {
    var t4 = this;
    this.stopped || (this.observer && this.observer.disconnect(), Yu.forEach(function(e2) {
      return zu.removeEventListener(e2, t4.listener, true);
    }), this.stopped = true);
  }, t3;
}())(), Ju = function(t3) {
  !Gu && t3 > 0 && Qu.start(), !(Gu += t3) && Qu.stop();
}, Ku = function() {
  function t3(t4, e2) {
    this.target = t4, this.observedBox = e2 || vu.CONTENT_BOX, this.lastReportedSize = {inlineSize: 0, blockSize: 0};
  }
  return t3.prototype.isActive = function() {
    var t4, e2 = Fu(this.target, this.observedBox, true);
    return t4 = this.target, Su(t4) || function(t5) {
      switch (t5.tagName) {
        case "INPUT":
          if (t5.type !== "image")
            break;
        case "VIDEO":
        case "AUDIO":
        case "EMBED":
        case "OBJECT":
        case "CANVAS":
        case "IFRAME":
        case "IMG":
          return true;
      }
      return false;
    }(t4) || getComputedStyle(t4).display !== "inline" || (this.lastReportedSize = e2), this.lastReportedSize.inlineSize !== e2.inlineSize || this.lastReportedSize.blockSize !== e2.blockSize;
  }, t3;
}(), th = function(t3, e2) {
  this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t3, this.callback = e2;
}, eh = new WeakMap(), rh = function(t3, e2) {
  for (var r2 = 0; r2 < t3.length; r2 += 1)
    if (t3[r2].target === e2)
      return r2;
  return -1;
}, nh = function() {
  function t3() {
  }
  return t3.connect = function(t4, e2) {
    var r2 = new th(t4, e2);
    eh.set(t4, r2);
  }, t3.observe = function(t4, e2, r2) {
    var n2 = eh.get(t4), i2 = n2.observationTargets.length === 0;
    rh(n2.observationTargets, e2) < 0 && (i2 && wu.push(n2), n2.observationTargets.push(new Ku(e2, r2 && r2.box)), Ju(1), Qu.schedule());
  }, t3.unobserve = function(t4, e2) {
    var r2 = eh.get(t4), n2 = rh(r2.observationTargets, e2), i2 = r2.observationTargets.length === 1;
    n2 >= 0 && (i2 && wu.splice(wu.indexOf(r2), 1), r2.observationTargets.splice(n2, 1), Ju(-1));
  }, t3.disconnect = function(t4) {
    var e2 = this, r2 = eh.get(t4);
    r2.observationTargets.slice().forEach(function(r3) {
      return e2.unobserve(t4, r3.target);
    }), r2.activeTargets.splice(0, r2.activeTargets.length);
  }, t3;
}(), ih = function() {
  function t3(t4) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t4 != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    nh.connect(this, t4);
  }
  return t3.prototype.observe = function(t4, e2) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Ou(t4))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    nh.observe(this, t4, e2);
  }, t3.prototype.unobserve = function(t4) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Ou(t4))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    nh.unobserve(this, t4);
  }, t3.prototype.disconnect = function() {
    nh.disconnect(this);
  }, t3.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, t3;
}();
const sh = self.ResizeObserver || ih;
const ah = new c(), oh = new c(), uh = new TextDecoder(), hh = class {
  static get ELEMENT_UID_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-uid";
  }
  static get HOVER_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-hover";
  }
  static get ACTIVE_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-active";
  }
  static get FOCUS_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-focus";
  }
  static get TARGET_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-target";
  }
  static get LAYER_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-layer";
  }
  static get PIXEL_RATIO_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-pixel-ratio";
  }
  static get RENDERING_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering";
  }
  static get RENDERING_PARENT_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering-parent";
  }
  static get RENDERING_CONTAINER_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering-container";
  }
  static get RENDERING_INLINE_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering-inline";
  }
  static get RENDERING_DOCUMENT_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering-document";
  }
  static generateElementUID() {
    return "" + this._nextUID++;
  }
  static getPsuedoAttributes(t3) {
    return `${t3.hover ? `${this.HOVER_ATTRIBUTE}="" ` : " "}${t3.focus ? `${this.FOCUS_ATTRIBUTE}="" ` : " "}${t3.active ? `${this.ACTIVE_ATTRIBUTE}="" ` : " "}${t3.target ? `${this.TARGET_ATTRIBUTE}="" ` : " "}`;
  }
  static initRootNodeObservation(t3) {
    const e2 = t3.ownerDocument, r2 = t3.getRootNode(), n2 = "head" in r2 ? r2.head : r2;
    if (this.rootNodeObservers.get(r2))
      return;
    const i2 = e2.createElement("style");
    n2.append(i2);
    const s2 = i2.sheet;
    let a2 = 0;
    if (uu(s2, `[${hh.RENDERING_DOCUMENT_ATTRIBUTE}] *`, "transform: none !important;", a2++), uu(s2, `[${hh.RENDERING_ATTRIBUTE}], [${hh.RENDERING_ATTRIBUTE}] *`, "visibility: visible !important;", a2++), uu(s2, `[${hh.RENDERING_ATTRIBUTE}] [${hh.LAYER_ATTRIBUTE}], [${hh.RENDERING_ATTRIBUTE}] [${hh.LAYER_ATTRIBUTE}] *`, "visibility: hidden !important;", a2++), uu(s2, `[${hh.RENDERING_ATTRIBUTE}]`, "position: relative; top: 0 !important; left: 0 !important; float: none; box-sizing:border-box; min-width:var(--x-width); min-height:var(--x-height); display:block !important;", a2++), uu(s2, `[${hh.RENDERING_INLINE_ATTRIBUTE}]`, "top: var(--x-inline-top) !important; width:auto !important", a2++), uu(s2, `[${hh.RENDERING_PARENT_ATTRIBUTE}]`, "transform: none !important; left: 0 !important; top: 0 !important; margin: 0 !important; border:0 !important; border-radius:0 !important; height:100% !important; padding:0 !important; position:static !important; display:block !important; background: rgba(0,0,0,0) none !important; box-shadow:none !important", a2++), uu(s2, `[${hh.RENDERING_PARENT_ATTRIBUTE}]::before, [${hh.RENDERING_PARENT_ATTRIBUTE}]::after`, "content:none !important; box-shadow:none !important;", a2++), r2 === e2) {
      let t4 = "";
      const e3 = () => {
        if (t4 != window.location.hash && window.location.hash)
          try {
            this.targetElement = r2.querySelector(window.location.hash);
          } catch {
          }
        t4 = window.location.hash;
      };
      window.addEventListener("hashchange", e3, false), e3(), window.addEventListener("focusin", (t5) => {
        this.focusElement = t5.target;
      }, false), window.addEventListener("focusout", (t5) => {
        this.focusElement = null;
      }, false), window.addEventListener("load", (t5) => {
        o2();
      });
    }
    const o2 = () => {
      for (const [t4, e3] of this.layers)
        e3.needsRefresh = true;
    }, u2 = (t4) => {
      var e3 = t4.nodeName.toUpperCase();
      h.indexOf(e3) !== -1 && t4.addEventListener("load", o2);
    }, h = ["STYLE", "LINK"], c2 = new MutationObserver((t4) => {
      var r3;
      for (const n3 of t4) {
        h.indexOf(n3.target.nodeName.toUpperCase()) !== -1 && (o2(), (r3 = this.embeddedCSS.get(e2)) == null || r3.delete(n3.target));
        for (const t5 of n3.addedNodes)
          u2(t5);
      }
    });
    c2.observe(e2, {childList: true, attributes: true, characterData: true, subtree: true, attributeOldValue: true, characterDataOldValue: true}), this.rootNodeObservers.set(r2, c2);
  }
  static addToSerializeQueue(t3) {
    this.serializeQueue.indexOf(t3) === -1 && this.serializeQueue.push(t3);
  }
  static addToRasterizeQueue(t3) {
    this.rasterizeQueue.indexOf(t3) === -1 && this.rasterizeQueue.push(t3);
  }
  static addToRenderQueue(t3) {
    this.renderQueue.indexOf(t3) === -1 && this.renderQueue.push(t3);
  }
  static _runTasks() {
    hh.tasksPending = false;
    const t3 = hh.serializeQueue, e2 = hh.rasterizeQueue, r2 = hh.renderQueue, n2 = hh.TASK_SYNC_MAX_TIME / 2;
    let i2 = performance.now();
    for (; r2.length && performance.now() - i2 < n2; )
      r2.shift().render();
    for (i2 = performance.now(); t3.length && performance.now() - i2 < n2; )
      t3.shift().serialize();
    e2.length && hh.rasterizeTaskCount < hh.TASK_ASYNC_MAX_COUNT && (hh.rasterizeTaskCount++, e2.shift().rasterize().then(() => {
      hh.rasterizeTaskCount--;
    }));
  }
  static scheduleTasksIfNeeded() {
    this.tasksPending || hh.serializeQueue.length === 0 && hh.renderQueue.length === 0 && (hh.rasterizeQueue.length === 0 || hh.rasterizeTaskCount === hh.TASK_ASYNC_MAX_COUNT) || (this.tasksPending = true, hh.scheduleIdle(hh._runTasks));
  }
  static scheduleIdle(t3) {
    setTimeout(t3, 1);
  }
  static setLayerNeedsRefresh(t3) {
    t3.needsRefresh = true;
  }
  static createLayerTree(t3, e2) {
    if (hh.getClosestLayer(t3))
      throw new Error("A root WebLayer for the given element already exists");
    !function(t4) {
      const e3 = t4.ownerDocument, r3 = t4.getRootNode();
      if (e3.contains(t4) || e3.contains(r3 == null ? void 0 : r3.host))
        return t4;
      const n3 = r3.host || e3.createElement("div");
      n3.setAttribute(ch.RENDERING_CONTAINER_ATTRIBUTE, ""), n3.style.position = "fixed", n3.style.width = "100%", n3.style.height = "100%", n3.style.top = "-100000px", n3.style.contain = "strict", r3.host || n3.appendChild(t4), e3.documentElement.appendChild(n3);
    }(t3), hh.initRootNodeObservation(t3);
    const r2 = new MutationObserver(hh._handleMutations);
    this.mutationObservers.set(t3, r2), this.startMutationObserver(t3);
    const n2 = new sh((t4) => {
      for (const e3 of t4) {
        const t5 = this.getClosestLayer(e3.target);
        t5.traverseLayers(hh.setLayerNeedsRefresh), t5.traverseParentLayers(hh.setLayerNeedsRefresh);
      }
    });
    n2.observe(t3), this.resizeObservers.set(t3, n2), t3.addEventListener("input", this._triggerRefresh, {capture: true}), t3.addEventListener("keydown", this._triggerRefresh, {capture: true}), t3.addEventListener("submit", this._triggerRefresh, {capture: true}), t3.addEventListener("change", this._triggerRefresh, {capture: true}), t3.addEventListener("focus", this._triggerRefresh, {capture: true}), t3.addEventListener("blur", this._triggerRefresh, {capture: true}), t3.addEventListener("transitionend", this._triggerRefresh, {capture: true});
    const i2 = new gu(t3, e2);
    return this.rootLayers.set(t3, i2), i2;
  }
  static disposeLayer(t3) {
    if (this.rootLayers.has(t3.element)) {
      this.rootLayers.delete(t3.element);
      this.mutationObservers.get(t3.element).disconnect(), this.mutationObservers.delete(t3.element);
      this.resizeObservers.get(t3.element).disconnect(), this.resizeObservers.delete(t3.element), t3.element.removeEventListener("input", this._triggerRefresh, {capture: true}), t3.element.removeEventListener("keydown", this._triggerRefresh, {capture: true}), t3.element.removeEventListener("submit", this._triggerRefresh, {capture: true}), t3.element.removeEventListener("change", this._triggerRefresh, {capture: true}), t3.element.removeEventListener("focus", this._triggerRefresh, {capture: true}), t3.element.removeEventListener("blur", this._triggerRefresh, {capture: true}), t3.element.removeEventListener("transitionend", this._triggerRefresh, {capture: true});
    }
  }
  static getClosestLayer(t3) {
    const e2 = t3 && t3.closest(`[${hh.LAYER_ATTRIBUTE}]`);
    return this.layers.get(e2);
  }
  static getCSSTransformForElement(t3, e2 = new c()) {
    const r2 = getComputedStyle(t3);
    var n2 = r2.transform;
    if (n2.indexOf("matrix(") == 0) {
      e2.identity();
      var i2 = n2.substring(7, n2.length - 1).split(", ").map(parseFloat);
      e2.elements[0] = i2[0], e2.elements[1] = i2[1], e2.elements[4] = i2[2], e2.elements[5] = i2[3], e2.elements[12] = i2[4], e2.elements[13] = i2[5];
    } else {
      if (n2.indexOf("matrix3d(") != 0)
        return e2.identity();
      i2 = n2.substring(9, n2.length - 1).split(", ").map(parseFloat);
      e2.fromArray(i2);
    }
    var s2 = r2.transformOrigin.split(" ").map(parseFloat), a2 = s2[0], o2 = s2[1], u2 = s2[2] || 0, h = ah.identity().makeTranslation(-a2, -o2, -u2), l2 = oh.identity().makeTranslation(a2, o2, u2);
    return e2.premultiply(l2).multiply(h);
  }
  static async embedExternalResources(t3) {
    const e2 = [], r2 = t3.querySelectorAll("*");
    for (const i2 of r2) {
      const t4 = i2.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      t4 && e2.push(hh.getDataURL(t4).then((t5) => {
        i2.removeAttributeNS("http://www.w3.org/1999/xlink", "href"), i2.setAttribute("href", t5);
      }));
      const r3 = i2;
      if (i2.tagName == "IMG" && r3.src.substr(0, 4) != "data" && e2.push(hh.getDataURL(r3.src).then((t5) => {
        i2.setAttribute("src", t5);
      })), i2.namespaceURI == "http://www.w3.org/1999/xhtml" && i2.hasAttribute("style")) {
        const t5 = i2.getAttribute("style") || "";
        e2.push(hh.generateEmbeddedCSS(window.location.href, t5).then((e3) => {
          t5 != e3 && i2.setAttribute("style", e3);
        }));
      }
    }
    const n2 = t3.querySelectorAll("style");
    for (const i2 of n2)
      e2.push(hh.generateEmbeddedCSS(window.location.href, i2.innerHTML).then((t4) => {
        i2.innerHTML != t4 && (i2.innerHTML = t4);
      }));
    return Promise.all(e2);
  }
  static pauseMutationObservers() {
    const t3 = hh.mutationObservers.values();
    for (const e2 of t3)
      hh._handleMutations(e2.takeRecords()), e2.disconnect();
  }
  static resumeMutationObservers() {
    for (const [t3] of hh.mutationObservers)
      this.startMutationObserver(t3);
  }
  static startMutationObserver(t3) {
    hh.mutationObservers.get(t3).observe(t3, {attributes: true, childList: true, subtree: true, characterData: true, characterDataOldValue: true, attributeOldValue: true});
  }
  static _addDynamicPseudoClassRules(t3) {
    const e2 = t3.styleSheets;
    for (let s2 = 0; s2 < e2.length; s2++)
      try {
        const t4 = e2[s2], i2 = t4.cssRules;
        if (!i2)
          continue;
        const a2 = [];
        for (var r2 = 0; r2 < i2.length; r2++) {
          i2[r2].cssText.indexOf(":hover") > -1 && a2.push(i2[r2].cssText.replace(new RegExp(":hover", "g"), `[${hh.HOVER_ATTRIBUTE}]`)), i2[r2].cssText.indexOf(":active") > -1 && a2.push(i2[r2].cssText.replace(new RegExp(":active", "g"), `[${hh.ACTIVE_ATTRIBUTE}]`)), i2[r2].cssText.indexOf(":focus") > -1 && a2.push(i2[r2].cssText.replace(new RegExp(":focus", "g"), `[${hh.FOCUS_ATTRIBUTE}]`)), i2[r2].cssText.indexOf(":target") > -1 && a2.push(i2[r2].cssText.replace(new RegExp(":target", "g"), `[${hh.TARGET_ATTRIBUTE}]`));
          var n2 = a2.indexOf(i2[r2].cssText);
          n2 > -1 && a2.splice(n2, 1);
        }
        for (r2 = 0; r2 < a2.length; r2++)
          t4.insertRule(a2[r2]);
      } catch (i2) {
      }
  }
  static arrayBufferToBase64(t3) {
    for (var e2 = "", r2 = t3.byteLength, n2 = 0; n2 < r2; n2++)
      e2 += String.fromCharCode(t3[n2]);
    return window.btoa(e2);
  }
  static attributeCSS(t3, e2) {
    return e2 ? `[${t3}]=${e2}` : `[${t3}]`;
  }
  static attributeHTML(t3, e2) {
    return e2 ? `${t3}="${e2}"` : `${t3}=""`;
  }
  static async generateEmbeddedCSS(t3, e2) {
    let r2;
    const n2 = [];
    e2 = (e2 = (e2 = (e2 = e2.replace(new RegExp(":hover", "g"), this.attributeCSS(this.HOVER_ATTRIBUTE))).replace(new RegExp(":active", "g"), this.attributeCSS(this.ACTIVE_ATTRIBUTE))).replace(new RegExp(":focus", "g"), this.attributeCSS(this.FOCUS_ATTRIBUTE))).replace(new RegExp(":target", "g"), this.attributeCSS(this.TARGET_ATTRIBUTE));
    const i2 = RegExp(/url\((?!['"]?(?:data):)['"]?([^'"\)]*)['"]?\)/gi);
    for (; r2 = i2.exec(e2); ) {
      const i3 = r2[1];
      n2.push(this.getDataURL(new URL(i3, t3).href).then((t4) => {
        e2 = e2.replace(i3, t4);
      }));
    }
    return await Promise.all(n2), e2;
  }
  static async getURL(t3) {
    return t3 = new URL(t3, window.location.href).href, new Promise((e2) => {
      var r2 = new XMLHttpRequest();
      r2.open("GET", t3, true), r2.responseType = "arraybuffer", r2.onload = () => {
        e2(r2);
      }, r2.onerror = () => {
        e2(r2);
      }, r2.send();
    });
  }
  static async getEmbeddedCSS(t3) {
    const e2 = t3.getRootNode(), r2 = this.embeddedCSS.get(e2) || new Map();
    this.embeddedCSS.set(e2, r2);
    const n2 = Array.from(e2.querySelectorAll("style, link[type='text/css'], link[rel='stylesheet']"));
    let i2 = false;
    for (const s2 of n2)
      if (!r2.has(s2))
        if (i2 = true, s2.tagName == "STYLE") {
          const t4 = s2.sheet;
          let e3 = "";
          for (const r3 of t4.cssRules)
            e3 += r3.cssText + "\n";
          r2.set(s2, this.generateEmbeddedCSS(window.location.href, e3));
        } else
          r2.set(s2, this.getURL(s2.getAttribute("href")).then((t4) => {
            if (!t4.response)
              return "";
            this._addDynamicPseudoClassRules(e2);
            var r3 = uh.decode(t4.response);
            return this.generateEmbeddedCSS(window.location.href, r3);
          }));
    return i2 && this._addDynamicPseudoClassRules(e2), Promise.all(r2.values());
  }
  static async getDataURL(t3) {
    var e2;
    const r2 = await this.getURL(t3), n2 = new Uint8Array(r2.response), i2 = (e2 = r2.getResponseHeader("Content-Type")) == null ? void 0 : e2.split(";")[0];
    if (i2 == "text/css") {
      let e3 = uh.decode(n2);
      e3 = await this.generateEmbeddedCSS(t3, e3);
      const r3 = window.btoa(e3);
      return r3.length > 0 ? "data:" + i2 + ";base64," + r3 : "";
    }
    return "data:" + i2 + ";base64," + this.arrayBufferToBase64(n2);
  }
  static updateInputAttributes(t3) {
    t3.matches("input") && this._updateInputAttribute(t3);
    for (const e2 of t3.getElementsByTagName("input"))
      this._updateInputAttribute(e2);
  }
  static _updateInputAttribute(t3) {
    t3.hasAttribute("checked") ? t3.checked || t3.removeAttribute("checked") : t3.checked && t3.setAttribute("checked", ""), t3.getAttribute("value") !== t3.value && t3.setAttribute("value", t3.value);
  }
  static isBlankImage(t3) {
    return !new Uint32Array(t3.buffer).some((t4) => t4 !== 0);
  }
};
let ch = hh;
if (ch.ATTRIBUTE_PREFIX = "xr", ch._nextUID = 0, ch.serializer = new XMLSerializer(), ch.rootLayers = new Map(), ch.layers = new Map(), ch.mutationObservers = new Map(), ch.resizeObservers = new Map(), ch.serializeQueue = [], ch.rasterizeQueue = [], ch.renderQueue = [], ch.focusElement = null, ch.activeElement = null, ch.targetElement = null, ch.rootNodeObservers = new Map(), ch.TASK_ASYNC_MAX_COUNT = 2, ch.TASK_SYNC_MAX_TIME = 200, ch.rasterizeTaskCount = 0, ch.tasksPending = false, ch._handleMutations = (t3) => {
  for (const e2 of t3) {
    if (e2.type === "attributes") {
      if (e2.target.getAttribute(e2.attributeName) === e2.oldValue)
        continue;
    }
    if (e2.type === "characterData") {
      if (e2.target.data === e2.oldValue)
        continue;
    }
    const t4 = e2.target.nodeType === Node.ELEMENT_NODE ? e2.target : e2.target.parentElement;
    if (!t4)
      continue;
    const r2 = hh.getClosestLayer(t4);
    if (r2) {
      if (e2.type === "attributes" && e2.attributeName === "class") {
        if ((e2.oldValue ? e2.oldValue : "") === e2.target.className)
          continue;
      }
      r2.parentLayer ? r2.parentLayer.traverseChildLayers(hh.setLayerNeedsRefresh) : r2.traverseLayers(hh.setLayerNeedsRefresh);
    }
  }
}, ch._triggerRefresh = async (t3) => {
  const e2 = hh.getClosestLayer(t3.target);
  e2 && (e2.parentLayer ? e2.parentLayer.traverseChildLayers(hh.setLayerNeedsRefresh) : e2.traverseLayers(hh.setLayerNeedsRefresh));
}, ch.embeddedCSS = new Map(), self.THREE)
  var lh = self.THREE;
else
  lh = t;
const ph = new lh.Vector3(), fh = new lh.Vector3(), dh = new hu(), mh = new hu();
class yh extends lh.Group {
  constructor(t3, e2 = {}) {
    super(), this.options = e2, this.textures = new Map(), this.textureNeedsUpdate = false, this.contentMesh = new lh.Mesh(vh.GEOMETRY, new lh.MeshBasicMaterial({transparent: true, alphaTest: 1e-3, opacity: 1})), this._boundsMesh = new lh.Mesh(vh.GEOMETRY, new lh.MeshBasicMaterial({visible: false})), this.cursor = new lh.Object3D(), this.depthMaterial = new lh.MeshDepthMaterial({depthPacking: lh.RGBADepthPacking, alphaTest: 0.01}), this.domLayout = new lh.Object3D(), this.domSize = new lh.Vector3(1, 1, 1), this.childWebLayers = [], this.shouldApplyDOMLayout = "auto";
    const r2 = this.element = typeof t3 == "string" ? fu(t3) : t3;
    this.name = r2.id, this._webLayer = ch.getClosestLayer(r2), this.add(this.contentMesh), this.add(this._boundsMesh), this.cursor.visible = false, this.matrixAutoUpdate = true, this.contentMesh.matrixAutoUpdate = true, this.contentMesh.material.toneMapped = false, this.contentMesh.visible = false, this.contentMesh.customDepthMaterial = this.depthMaterial, this._boundsMesh.matrixAutoUpdate = true, vh.layersByElement.set(this.element, this), vh.layersByMesh.set(this.contentMesh, this);
  }
  get currentTexture() {
    if (this._webLayer.element.tagName === "VIDEO") {
      const t4 = this._webLayer.element;
      let e3 = this.textures.get(t4);
      return e3 || (e3 = new lh.VideoTexture(t4), e3.wrapS = lh.ClampToEdgeWrapping, e3.wrapT = lh.ClampToEdgeWrapping, e3.minFilter = lh.LinearFilter, this.options.textureEncoding && (e3.encoding = this.options.textureEncoding), this.textures.set(t4, e3)), e3;
    }
    const t3 = this._webLayer.canvas;
    let e2 = this.textures.get(t3);
    return e2 ? this.textureNeedsUpdate && (this.textureNeedsUpdate = false, e2.needsUpdate = true) : (e2 = new lh.Texture(t3), e2.needsUpdate = true, e2.wrapS = lh.ClampToEdgeWrapping, e2.wrapT = lh.ClampToEdgeWrapping, e2.minFilter = lh.LinearFilter, this.options.textureEncoding && (e2.encoding = this.options.textureEncoding), this.textures.set(t3, e2)), e2;
  }
  get pseudoStates() {
    return this._webLayer.psuedoStates;
  }
  get depth() {
    return this._webLayer.depth;
  }
  get index() {
    return this.parentWebLayer ? this.parentWebLayer.childWebLayers.indexOf(this) : 0;
  }
  get needsRefresh() {
    return this._webLayer.needsRefresh;
  }
  setNeedsRefresh() {
    this._webLayer.traverseLayers(ch.setLayerNeedsRefresh);
  }
  get needsRemoval() {
    return this._webLayer.needsRemoval;
  }
  get bounds() {
    return this._webLayer.bounds;
  }
  get parentWebLayer() {
    return this._webLayer.parentLayer && vh.layersByElement.get(this._webLayer.parentLayer.element);
  }
  refresh(t3 = false) {
    this._webLayer.refresh(), this.childWebLayers.length = 0;
    for (const e2 of this._webLayer.childLayers) {
      const r2 = vh.getClosestLayerForElement(e2.element);
      r2 && (this.childWebLayers.push(r2), t3 && r2.refresh(t3));
    }
    this._refreshVideoBounds(), this._refreshDOMLayout();
  }
  updateLayout() {
    this.position.copy(this.domLayout.position), this.quaternion.copy(this.domLayout.quaternion), this.scale.copy(this.domLayout.scale), this.contentMesh.scale.copy(this.domSize), this._boundsMesh.scale.copy(this.domSize);
    const t3 = this.contentMesh, e2 = t3.material.opacity < 5e-3;
    e2 ? t3.visible = false : t3.material.map && (t3.visible = true), this.needsRemoval && e2 && (this.parent && this.parent.remove(this), this.dispose());
  }
  updateContent() {
    const t3 = this.contentMesh, e2 = this.currentTexture, r2 = t3.material;
    e2.image && r2.map !== e2 && (r2.map = e2, this.depthMaterial.map = e2, this.depthMaterial.needsUpdate = true, r2.depthWrite = false, this.renderOrder = this.depth + 1e-3 * this.index + (this.options.renderOrderOffset || 0), r2.needsUpdate = true);
  }
  _doUpdate() {
    this.updateLayout(), this.updateContent(), this.needsRefresh && this.options.autoRefresh && this.refresh(), ch.scheduleTasksIfNeeded();
  }
  update(t3 = false) {
    t3 ? this.traverseLayersPreOrder(this._doUpdate) : this._doUpdate();
  }
  querySelector(t3) {
    const e2 = this.element.querySelector(t3);
    if (e2)
      return vh.layersByElement.get(e2);
  }
  traverseLayerAncestors(t3) {
    const e2 = this.parentWebLayer;
    e2 && (e2.traverseLayerAncestors(t3), t3.call(this, e2));
  }
  traverseLayersPreOrder(t3) {
    if (t3.call(this, this) === false)
      return false;
    for (const e2 of this.childWebLayers)
      if (e2.traverseLayersPreOrder(t3) === false)
        return false;
    return true;
  }
  traverseLayersPostOrder(t3) {
    for (const e2 of this.childWebLayers)
      if (e2.traverseLayersPostOrder(t3) === false)
        return false;
    return t3.call(this, this) || true;
  }
  dispose() {
    for (const t3 of this.textures.values())
      t3.dispose();
    this.contentMesh.geometry.dispose(), this._boundsMesh.geometry.dispose(), ch.disposeLayer(this._webLayer);
    for (const t3 of this.childWebLayers)
      t3.dispose();
  }
  _refreshVideoBounds() {
    if (this.element.nodeName === "VIDEO") {
      const t3 = this.element, e2 = this.currentTexture, r2 = getComputedStyle(this.element), {objectFit: n2} = r2, {width: i2, height: s2} = this.bounds, {videoWidth: a2, videoHeight: o2} = t3, u2 = a2 / o2, h = i2 / s2;
      switch (e2.center.set(0.5, 0.5), n2) {
        case "none":
          e2.repeat.set(i2 / a2, s2 / o2).clampScalar(0, 1);
          break;
        case "contain":
        case "scale-down":
          if (e2.repeat.set(1, 1), h > u2) {
            const t4 = this.bounds.height * u2 || 0;
            this.bounds.left += (this.bounds.width - t4) / 2, this.bounds.width = t4;
          } else {
            const t4 = this.bounds.width / u2 || 0;
            this.bounds.top += (this.bounds.height - t4) / 2, this.bounds.height = t4;
          }
          break;
        case "cover":
          if (e2.repeat.set(i2 / a2, s2 / o2), h < u2) {
            const t4 = this.bounds.height * u2 || 0;
            this.bounds.left += (this.bounds.width - t4) / 2, this.bounds.width = t4;
          } else {
            const t4 = this.bounds.width / u2 || 0;
            this.bounds.top += (this.bounds.height - t4) / 2, this.bounds.height = t4;
          }
          break;
        default:
        case "fill":
          e2.repeat.set(1, 1);
      }
    }
  }
  _refreshDOMLayout() {
    if (this.needsRemoval)
      return;
    this.domLayout.position.set(0, 0, 0), this.domLayout.scale.set(1, 1, 1), this.domLayout.quaternion.set(0, 0, 0, 1);
    const t3 = this.bounds, e2 = t3.width, r2 = t3.height, n2 = 1 / vh.DEFAULT_PIXELS_PER_UNIT;
    if (this.domSize.set(Math.max(n2 * e2, 1e-5), Math.max(n2 * r2, 1e-5), 1), !vh.shouldApplyDOMLayout(this))
      return;
    const i2 = this.parentWebLayer instanceof yh ? this.parentWebLayer.bounds : function(t4) {
      return pu.parentNode || document.documentElement.append(pu), t4.left = pageXOffset, t4.top = pageYOffset, t4.width = pu.offsetWidth, t4.height = pu.offsetHeight, t4;
    }(dh), s2 = -i2.width / 2 + e2 / 2, a2 = i2.height / 2 - r2 / 2;
    this.options.layerSeparation || vh.DEFAULT_LAYER_SEPARATION, this.domLayout.position.set(n2 * (s2 + t3.left), n2 * (a2 - t3.top), 0);
  }
}
const gh = class extends yh {
  constructor(t3, e2 = {}) {
    super(t3, e2), this.options = e2, this._interactionRays = [], this._raycaster = new lh.Raycaster(), this._hitIntersections = [], this._previousHoverLayers = new Set(), this._contentMeshes = [], this._prepareHitTest = (t4) => {
      t4.pseudoStates.hover && this._previousHoverLayers.add(t4), t4.cursor.visible = false, t4.pseudoStates.hover = false, this._contentMeshes.push(t4.contentMesh);
    }, this._webLayer = ch.createLayerTree(this.element, (t4, {target: e3}) => {
      var r2, n2;
      if (t4 === "layercreated") {
        if (e3 === this.element)
          return;
        const t5 = new yh(e3, this.options);
        (r2 = t5.parentWebLayer) == null || r2.add(t5), this.options.onLayerCreate && this.options.onLayerCreate(t5);
      } else if (t4 === "layerpainted") {
        const t5 = ch.layers.get(e3);
        gh.layersByElement.get(t5.element).textureNeedsUpdate = true;
      } else if (t4 === "layermoved") {
        const t5 = gh.layersByElement.get(e3);
        (n2 = t5.parentWebLayer) == null || n2.add(t5);
      }
    }), this.options.onLayerCreate && this.options.onLayerCreate(this), this.refresh(true), this.update();
  }
  static computeNaturalDistance(t3, e2) {
    let r2 = t3;
    t3.isCamera && (r2 = t3.projectionMatrix);
    const n2 = e2.getPixelRatio(), i2 = e2.domElement.width / n2, s2 = gh.DEFAULT_PIXELS_PER_UNIT * i2, a2 = function(t4) {
      const e3 = xh, r3 = wh.getInverse(t4), n3 = bh;
      return e3.left = n3.set(-1, 0, -1).applyMatrix4(r3).angleTo(_h), e3.right = n3.set(1, 0, -1).applyMatrix4(r3).angleTo(_h), e3.top = n3.set(0, 1, -1).applyMatrix4(r3).angleTo(_h), e3.bottom = n3.set(0, -1, -1).applyMatrix4(r3).angleTo(_h), e3.horizontal = e3.right + e3.left, e3.vertical = e3.top + e3.bottom, e3;
    }(r2).horizontal;
    return s2 / 2 / Math.tan(a2 / 2);
  }
  static shouldApplyDOMLayout(t3) {
    const e2 = t3.shouldApplyDOMLayout;
    return e2 === "always" || e2 === true || e2 !== "never" && e2 !== false && !(e2 !== "auto" || !t3.parentWebLayer || t3.parent !== t3.parentWebLayer);
  }
  get parentWebLayer() {
    return super.parentWebLayer;
  }
  get interactionRays() {
    return this._interactionRays;
  }
  set interactionRays(t3) {
    this._interactionRays = t3;
  }
  update(t3 = false) {
    this._updateInteractions(), super.update(t3);
  }
  _intersectionGetGroupOrder(t3) {
    let e2 = t3.object;
    for (; e2.parent && !e2.isGroup; )
      e2 = e2.parent;
    t3.groupOrder = e2.renderOrder;
  }
  _intersectionSort(t3, e2) {
    return t3.groupOrder !== e2.groupOrder ? e2.groupOrder - t3.groupOrder : t3.object.renderOrder !== e2.object.renderOrder ? e2.object.renderOrder - t3.object.renderOrder : t3.distance - e2.distance;
  }
  _updateInteractions() {
    const t3 = this._previousHoverLayers;
    t3.clear(), this._contentMeshes.length = 0, this.traverseLayersPreOrder(this._prepareHitTest);
    for (const e2 of this._interactionRays) {
      e2 instanceof lh.Ray ? this._raycaster.ray.copy(e2) : this._raycaster.ray.set(e2.getWorldPosition(ph), e2.getWorldDirection(fh)), this._hitIntersections.length = 0;
      const r2 = this._raycaster.intersectObjects(this._contentMeshes, false, this._hitIntersections);
      r2.forEach(this._intersectionGetGroupOrder), r2.sort(this._intersectionSort);
      const n2 = r2[0];
      if (n2) {
        const e3 = n2.object.parent;
        e3.cursor.position.copy(n2.point), e3.cursor.visible = true, e3.pseudoStates.hover = true, t3.has(e3) || e3.setNeedsRefresh();
      }
    }
    for (const e2 of t3)
      e2.pseudoStates.hover || e2.setNeedsRefresh();
  }
  static getLayerForQuery(t3) {
    const e2 = document.querySelector(t3);
    return gh.layersByElement.get(e2);
  }
  static getClosestLayerForElement(t3) {
    const e2 = t3 && t3.closest(`[${ch.LAYER_ATTRIBUTE}]`);
    return gh.layersByElement.get(e2);
  }
  hitTest(t3) {
    const e2 = this._raycaster, r2 = this._hitIntersections, n2 = gh.layersByMesh;
    e2.ray.copy(t3), r2.length = 0, e2.intersectObject(this, true, r2), r2.forEach(this._intersectionGetGroupOrder), r2.sort(this._intersectionSort);
    for (const i2 of r2) {
      const t4 = n2.get(i2.object);
      if (!t4)
        continue;
      const e3 = lu(t4.element, dh);
      if (!e3.width || !e3.height)
        continue;
      let r3 = t4.element;
      const s2 = i2.uv.x * e3.width, a2 = (1 - i2.uv.y) * e3.height;
      return ou(t4.element, (t5) => {
        if (!r3.contains(t5))
          return false;
        const n3 = lu(t5, mh), i3 = n3.left - e3.left, o2 = n3.top - e3.top, {width: u2, height: h} = n3;
        return s2 > i3 && s2 < i3 + u2 && a2 > o2 && a2 < o2 + h && (r3 = t5, true);
      }), {layer: t4, intersection: i2, target: r3};
    }
  }
};
let vh = gh;
vh.layersByElement = new WeakMap(), vh.layersByMesh = new WeakMap(), vh.DEFAULT_LAYER_SEPARATION = 1e-3, vh.DEFAULT_PIXELS_PER_UNIT = 1e3, vh.GEOMETRY = new lh.PlaneGeometry(1, 1, 2, 2);
const xh = new class {
  constructor() {
    this.top = 0, this.left = 0, this.bottom = 0, this.right = 0, this.horizontal = 0, this.vertical = 0;
  }
}(), wh = new lh.Matrix4(), bh = new lh.Vector3(), _h = new lh.Vector3(0, 0, -1);
