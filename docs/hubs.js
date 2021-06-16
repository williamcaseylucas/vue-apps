import "./App.js";
import {g as t} from "./vendor.js";
import "./App2.js";
import "./logo.js";
class e {
  constructor(t3 = 0, e2 = 0) {
    this.x = t3, this.y = e2;
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
e.prototype.isVector2 = true;
const r = [];
for (let Ih = 0; Ih < 256; Ih++)
  r[Ih] = (Ih < 16 ? "0" : "") + Ih.toString(16);
let n = 1234567;
const i = Math.PI / 180, s = 180 / Math.PI;
function a(t3, e2, r2) {
  return Math.max(e2, Math.min(r2, t3));
}
function o(t3, e2) {
  return (t3 % e2 + e2) % e2;
}
function u(t3, e2, r2) {
  return (1 - r2) * t3 + r2 * e2;
}
Object.freeze({__proto__: null, [Symbol.toStringTag]: "Module", DEG2RAD: i, RAD2DEG: s, generateUUID: function() {
  const t3 = 4294967295 * Math.random() | 0, e2 = 4294967295 * Math.random() | 0, n2 = 4294967295 * Math.random() | 0, i2 = 4294967295 * Math.random() | 0;
  return (r[255 & t3] + r[t3 >> 8 & 255] + r[t3 >> 16 & 255] + r[t3 >> 24 & 255] + "-" + r[255 & e2] + r[e2 >> 8 & 255] + "-" + r[e2 >> 16 & 15 | 64] + r[e2 >> 24 & 255] + "-" + r[63 & n2 | 128] + r[n2 >> 8 & 255] + "-" + r[n2 >> 16 & 255] + r[n2 >> 24 & 255] + r[255 & i2] + r[i2 >> 8 & 255] + r[i2 >> 16 & 255] + r[i2 >> 24 & 255]).toUpperCase();
}, clamp: a, euclideanModulo: o, mapLinear: function(t3, e2, r2, n2, i2) {
  return n2 + (t3 - e2) * (i2 - n2) / (r2 - e2);
}, inverseLerp: function(t3, e2, r2) {
  return t3 !== e2 ? (r2 - t3) / (e2 - t3) : 0;
}, lerp: u, damp: function(t3, e2, r2, n2) {
  return u(t3, e2, 1 - Math.exp(-r2 * n2));
}, pingpong: function(t3, e2 = 1) {
  return e2 - Math.abs(o(t3, 2 * e2) - e2);
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
  return t3 * i;
}, radToDeg: function(t3) {
  return t3 * s;
}, isPowerOfTwo: function(t3) {
  return (t3 & t3 - 1) == 0 && t3 !== 0;
}, ceilPowerOfTwo: function(t3) {
  return Math.pow(2, Math.ceil(Math.log(t3) / Math.LN2));
}, floorPowerOfTwo: function(t3) {
  return Math.pow(2, Math.floor(Math.log(t3) / Math.LN2));
}, setQuaternionFromProperEuler: function(t3, e2, r2, n2, i2) {
  const s2 = Math.cos, a2 = Math.sin, o2 = s2(r2 / 2), u2 = a2(r2 / 2), h = s2((e2 + n2) / 2), c2 = a2((e2 + n2) / 2), l2 = s2((e2 - n2) / 2), p2 = a2((e2 - n2) / 2), f2 = s2((n2 - e2) / 2), d = a2((n2 - e2) / 2);
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
      t3.set(o2 * c2, u2 * d, u2 * f2, o2 * h);
      break;
    case "YXY":
      t3.set(u2 * f2, o2 * c2, u2 * d, o2 * h);
      break;
    case "ZYZ":
      t3.set(u2 * d, u2 * f2, o2 * c2, o2 * h);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i2);
  }
}});
class c {
  constructor(t3 = 0, e2 = 0, r2 = 0, n2 = 1) {
    this._x = t3, this._y = e2, this._z = r2, this._w = n2;
  }
  static slerp(t3, e2, r2, n2) {
    return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."), r2.slerpQuaternions(t3, e2, n2);
  }
  static slerpFlat(t3, e2, r2, n2, i2, s2, a2) {
    let o2 = r2[n2 + 0], u2 = r2[n2 + 1], h = r2[n2 + 2], c2 = r2[n2 + 3];
    const l2 = i2[s2 + 0], p2 = i2[s2 + 1], f2 = i2[s2 + 2], d = i2[s2 + 3];
    if (a2 === 0)
      return t3[e2 + 0] = o2, t3[e2 + 1] = u2, t3[e2 + 2] = h, void (t3[e2 + 3] = c2);
    if (a2 === 1)
      return t3[e2 + 0] = l2, t3[e2 + 1] = p2, t3[e2 + 2] = f2, void (t3[e2 + 3] = d);
    if (c2 !== d || o2 !== l2 || u2 !== p2 || h !== f2) {
      let t4 = 1 - a2;
      const e3 = o2 * l2 + u2 * p2 + h * f2 + c2 * d, r3 = e3 >= 0 ? 1 : -1, n3 = 1 - e3 * e3;
      if (n3 > Number.EPSILON) {
        const i4 = Math.sqrt(n3), s3 = Math.atan2(i4, e3 * r3);
        t4 = Math.sin(t4 * s3) / i4, a2 = Math.sin(a2 * s3) / i4;
      }
      const i3 = a2 * r3;
      if (o2 = o2 * t4 + l2 * i3, u2 = u2 * t4 + p2 * i3, h = h * t4 + f2 * i3, c2 = c2 * t4 + d * i3, t4 === 1 - a2) {
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
    return r2 < Number.EPSILON ? (r2 = 0, Math.abs(t3.x) > Math.abs(t3.z) ? (this._x = -t3.y, this._y = t3.x, this._z = 0, this._w = r2) : (this._x = 0, this._y = -t3.z, this._z = t3.y, this._w = r2)) : (this._x = t3.y * e2.z - t3.z * e2.y, this._y = t3.z * e2.x - t3.x * e2.z, this._z = t3.x * e2.y - t3.y * e2.x, this._w = r2), this.normalize();
  }
  angleTo(t3) {
    return 2 * Math.acos(Math.abs(a(this.dot(t3), -1, 1)));
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
  invert() {
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
  slerpQuaternions(t3, e2, r2) {
    this.copy(t3).slerp(e2, r2);
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
c.prototype.isQuaternion = true;
class l {
  constructor(t3 = 0, e2 = 0, r2 = 0) {
    this.x = t3, this.y = e2, this.z = r2;
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
    return t3 && t3.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(f.setFromEuler(t3));
  }
  applyAxisAngle(t3, e2) {
    return this.applyQuaternion(f.setFromAxisAngle(t3, e2));
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
    return p.copy(this).projectOnVector(t3), this.sub(p);
  }
  reflect(t3) {
    return this.sub(p.copy(t3).multiplyScalar(2 * this.dot(t3)));
  }
  angleTo(t3) {
    const e2 = Math.sqrt(this.lengthSq() * t3.lengthSq());
    if (e2 === 0)
      return Math.PI / 2;
    const r2 = this.dot(t3) / e2;
    return Math.acos(a(r2, -1, 1));
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
l.prototype.isVector3 = true;
const p = new l(), f = new c();
class m {
  constructor() {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
  }
  set(t3, e2, r2, n2, i2, s2, a2, o2, u2, h, c2, l2, p2, f2, d, m2) {
    const y2 = this.elements;
    return y2[0] = t3, y2[4] = e2, y2[8] = r2, y2[12] = n2, y2[1] = i2, y2[5] = s2, y2[9] = a2, y2[13] = o2, y2[2] = u2, y2[6] = h, y2[10] = c2, y2[14] = l2, y2[3] = p2, y2[7] = f2, y2[11] = d, y2[15] = m2, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new m().fromArray(this.elements);
  }
  copy(t3) {
    const e2 = this.elements, r2 = t3.elements;
    return e2[0] = r2[0], e2[1] = r2[1], e2[2] = r2[2], e2[3] = r2[3], e2[4] = r2[4], e2[5] = r2[5], e2[6] = r2[6], e2[7] = r2[7], e2[8] = r2[8], e2[9] = r2[9], e2[10] = r2[10], e2[11] = r2[11], e2[12] = r2[12], e2[13] = r2[13], e2[14] = r2[14], e2[15] = r2[15], this;
  }
  copyPosition(t3) {
    const e2 = this.elements, r2 = t3.elements;
    return e2[12] = r2[12], e2[13] = r2[13], e2[14] = r2[14], this;
  }
  setFromMatrix3(t3) {
    const e2 = t3.elements;
    return this.set(e2[0], e2[3], e2[6], 0, e2[1], e2[4], e2[7], 0, e2[2], e2[5], e2[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t3, e2, r2) {
    return t3.setFromMatrixColumn(this, 0), e2.setFromMatrixColumn(this, 1), r2.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t3, e2, r2) {
    return this.set(t3.x, e2.x, r2.x, 0, t3.y, e2.y, r2.y, 0, t3.z, e2.z, r2.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t3) {
    const e2 = this.elements, r2 = t3.elements, n2 = 1 / y.setFromMatrixColumn(t3, 0).length(), i2 = 1 / y.setFromMatrixColumn(t3, 1).length(), s2 = 1 / y.setFromMatrixColumn(t3, 2).length();
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
    return this.compose(v, t3, x);
  }
  lookAt(t3, e2, r2) {
    const n2 = this.elements;
    return _.subVectors(t3, e2), _.lengthSq() === 0 && (_.z = 1), _.normalize(), w.crossVectors(r2, _), w.lengthSq() === 0 && (Math.abs(r2.z) === 1 ? _.x += 1e-4 : _.z += 1e-4, _.normalize(), w.crossVectors(r2, _)), w.normalize(), b.crossVectors(_, w), n2[0] = w.x, n2[4] = b.x, n2[8] = _.x, n2[1] = w.y, n2[5] = b.y, n2[9] = _.y, n2[2] = w.z, n2[6] = b.z, n2[10] = _.z, this;
  }
  multiply(t3, e2) {
    return e2 !== void 0 ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t3, e2)) : this.multiplyMatrices(this, t3);
  }
  premultiply(t3) {
    return this.multiplyMatrices(t3, this);
  }
  multiplyMatrices(t3, e2) {
    const r2 = t3.elements, n2 = e2.elements, i2 = this.elements, s2 = r2[0], a2 = r2[4], o2 = r2[8], u2 = r2[12], h = r2[1], c2 = r2[5], l2 = r2[9], p2 = r2[13], f2 = r2[2], d = r2[6], m2 = r2[10], y2 = r2[14], g2 = r2[3], v2 = r2[7], x2 = r2[11], w2 = r2[15], b2 = n2[0], _2 = n2[4], M = n2[8], N = n2[12], E = n2[1], S = n2[5], T = n2[9], O = n2[13], z = n2[2], C = n2[6], A = n2[10], R = n2[14], D = n2[3], k = n2[7], I = n2[11], L = n2[15];
    return i2[0] = s2 * b2 + a2 * E + o2 * z + u2 * D, i2[4] = s2 * _2 + a2 * S + o2 * C + u2 * k, i2[8] = s2 * M + a2 * T + o2 * A + u2 * I, i2[12] = s2 * N + a2 * O + o2 * R + u2 * L, i2[1] = h * b2 + c2 * E + l2 * z + p2 * D, i2[5] = h * _2 + c2 * S + l2 * C + p2 * k, i2[9] = h * M + c2 * T + l2 * A + p2 * I, i2[13] = h * N + c2 * O + l2 * R + p2 * L, i2[2] = f2 * b2 + d * E + m2 * z + y2 * D, i2[6] = f2 * _2 + d * S + m2 * C + y2 * k, i2[10] = f2 * M + d * T + m2 * A + y2 * I, i2[14] = f2 * N + d * O + m2 * R + y2 * L, i2[3] = g2 * b2 + v2 * E + x2 * z + w2 * D, i2[7] = g2 * _2 + v2 * S + x2 * C + w2 * k, i2[11] = g2 * M + v2 * T + x2 * A + w2 * I, i2[15] = g2 * N + v2 * O + x2 * R + w2 * L, this;
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
  invert() {
    const t3 = this.elements, e2 = t3[0], r2 = t3[1], n2 = t3[2], i2 = t3[3], s2 = t3[4], a2 = t3[5], o2 = t3[6], u2 = t3[7], h = t3[8], c2 = t3[9], l2 = t3[10], p2 = t3[11], f2 = t3[12], d = t3[13], m2 = t3[14], y2 = t3[15], g2 = c2 * m2 * u2 - d * l2 * u2 + d * o2 * p2 - a2 * m2 * p2 - c2 * o2 * y2 + a2 * l2 * y2, v2 = f2 * l2 * u2 - h * m2 * u2 - f2 * o2 * p2 + s2 * m2 * p2 + h * o2 * y2 - s2 * l2 * y2, x2 = h * d * u2 - f2 * c2 * u2 + f2 * a2 * p2 - s2 * d * p2 - h * a2 * y2 + s2 * c2 * y2, w2 = f2 * c2 * o2 - h * d * o2 - f2 * a2 * l2 + s2 * d * l2 + h * a2 * m2 - s2 * c2 * m2, b2 = e2 * g2 + r2 * v2 + n2 * x2 + i2 * w2;
    if (b2 === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _2 = 1 / b2;
    return t3[0] = g2 * _2, t3[1] = (d * l2 * i2 - c2 * m2 * i2 - d * n2 * p2 + r2 * m2 * p2 + c2 * n2 * y2 - r2 * l2 * y2) * _2, t3[2] = (a2 * m2 * i2 - d * o2 * i2 + d * n2 * u2 - r2 * m2 * u2 - a2 * n2 * y2 + r2 * o2 * y2) * _2, t3[3] = (c2 * o2 * i2 - a2 * l2 * i2 - c2 * n2 * u2 + r2 * l2 * u2 + a2 * n2 * p2 - r2 * o2 * p2) * _2, t3[4] = v2 * _2, t3[5] = (h * m2 * i2 - f2 * l2 * i2 + f2 * n2 * p2 - e2 * m2 * p2 - h * n2 * y2 + e2 * l2 * y2) * _2, t3[6] = (f2 * o2 * i2 - s2 * m2 * i2 - f2 * n2 * u2 + e2 * m2 * u2 + s2 * n2 * y2 - e2 * o2 * y2) * _2, t3[7] = (s2 * l2 * i2 - h * o2 * i2 + h * n2 * u2 - e2 * l2 * u2 - s2 * n2 * p2 + e2 * o2 * p2) * _2, t3[8] = x2 * _2, t3[9] = (f2 * c2 * i2 - h * d * i2 - f2 * r2 * p2 + e2 * d * p2 + h * r2 * y2 - e2 * c2 * y2) * _2, t3[10] = (s2 * d * i2 - f2 * a2 * i2 + f2 * r2 * u2 - e2 * d * u2 - s2 * r2 * y2 + e2 * a2 * y2) * _2, t3[11] = (h * a2 * i2 - s2 * c2 * i2 - h * r2 * u2 + e2 * c2 * u2 + s2 * r2 * p2 - e2 * a2 * p2) * _2, t3[12] = w2 * _2, t3[13] = (h * d * n2 - f2 * c2 * n2 + f2 * r2 * l2 - e2 * d * l2 - h * r2 * m2 + e2 * c2 * m2) * _2, t3[14] = (f2 * a2 * n2 - s2 * d * n2 - f2 * r2 * o2 + e2 * d * o2 + s2 * r2 * m2 - e2 * a2 * m2) * _2, t3[15] = (s2 * c2 * n2 - h * a2 * n2 + h * r2 * o2 - e2 * c2 * o2 - s2 * r2 * l2 + e2 * a2 * l2) * _2, this;
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
  makeShear(t3, e2, r2, n2, i2, s2) {
    return this.set(1, r2, i2, 0, t3, 1, s2, 0, e2, n2, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t3, e2, r2) {
    const n2 = this.elements, i2 = e2._x, s2 = e2._y, a2 = e2._z, o2 = e2._w, u2 = i2 + i2, h = s2 + s2, c2 = a2 + a2, l2 = i2 * u2, p2 = i2 * h, f2 = i2 * c2, d = s2 * h, m2 = s2 * c2, y2 = a2 * c2, g2 = o2 * u2, v2 = o2 * h, x2 = o2 * c2, w2 = r2.x, b2 = r2.y, _2 = r2.z;
    return n2[0] = (1 - (d + y2)) * w2, n2[1] = (p2 + x2) * w2, n2[2] = (f2 - v2) * w2, n2[3] = 0, n2[4] = (p2 - x2) * b2, n2[5] = (1 - (l2 + y2)) * b2, n2[6] = (m2 + g2) * b2, n2[7] = 0, n2[8] = (f2 + v2) * _2, n2[9] = (m2 - g2) * _2, n2[10] = (1 - (l2 + d)) * _2, n2[11] = 0, n2[12] = t3.x, n2[13] = t3.y, n2[14] = t3.z, n2[15] = 1, this;
  }
  decompose(t3, e2, r2) {
    const n2 = this.elements;
    let i2 = y.set(n2[0], n2[1], n2[2]).length();
    const s2 = y.set(n2[4], n2[5], n2[6]).length(), a2 = y.set(n2[8], n2[9], n2[10]).length();
    this.determinant() < 0 && (i2 = -i2), t3.x = n2[12], t3.y = n2[13], t3.z = n2[14], g.copy(this);
    const o2 = 1 / i2, u2 = 1 / s2, h = 1 / a2;
    return g.elements[0] *= o2, g.elements[1] *= o2, g.elements[2] *= o2, g.elements[4] *= u2, g.elements[5] *= u2, g.elements[6] *= u2, g.elements[8] *= h, g.elements[9] *= h, g.elements[10] *= h, e2.setFromRotationMatrix(g), r2.x = i2, r2.y = s2, r2.z = a2, this;
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
m.prototype.isMatrix4 = true;
const y = new l(), g = new m(), v = new l(0, 0, 0), x = new l(1, 1, 1), w = new l(), b = new l(), _ = new l();
new m();
class ot {
  constructor() {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
  }
  set(t3, e2, r2, n2, i2, s2, a2, o2, u2) {
    const h = this.elements;
    return h[0] = t3, h[1] = n2, h[2] = a2, h[3] = e2, h[4] = i2, h[5] = o2, h[6] = r2, h[7] = s2, h[8] = u2, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
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
    const r2 = t3.elements, n2 = e2.elements, i2 = this.elements, s2 = r2[0], a2 = r2[3], o2 = r2[6], u2 = r2[1], h = r2[4], c2 = r2[7], l2 = r2[2], p2 = r2[5], f2 = r2[8], d = n2[0], m2 = n2[3], y2 = n2[6], g2 = n2[1], v2 = n2[4], x2 = n2[7], w2 = n2[2], b2 = n2[5], _2 = n2[8];
    return i2[0] = s2 * d + a2 * g2 + o2 * w2, i2[3] = s2 * m2 + a2 * v2 + o2 * b2, i2[6] = s2 * y2 + a2 * x2 + o2 * _2, i2[1] = u2 * d + h * g2 + c2 * w2, i2[4] = u2 * m2 + h * v2 + c2 * b2, i2[7] = u2 * y2 + h * x2 + c2 * _2, i2[2] = l2 * d + p2 * g2 + f2 * w2, i2[5] = l2 * m2 + p2 * v2 + f2 * b2, i2[8] = l2 * y2 + p2 * x2 + f2 * _2, this;
  }
  multiplyScalar(t3) {
    const e2 = this.elements;
    return e2[0] *= t3, e2[3] *= t3, e2[6] *= t3, e2[1] *= t3, e2[4] *= t3, e2[7] *= t3, e2[2] *= t3, e2[5] *= t3, e2[8] *= t3, this;
  }
  determinant() {
    const t3 = this.elements, e2 = t3[0], r2 = t3[1], n2 = t3[2], i2 = t3[3], s2 = t3[4], a2 = t3[5], o2 = t3[6], u2 = t3[7], h = t3[8];
    return e2 * s2 * h - e2 * a2 * u2 - r2 * i2 * h + r2 * a2 * o2 + n2 * i2 * u2 - n2 * s2 * o2;
  }
  invert() {
    const t3 = this.elements, e2 = t3[0], r2 = t3[1], n2 = t3[2], i2 = t3[3], s2 = t3[4], a2 = t3[5], o2 = t3[6], u2 = t3[7], h = t3[8], c2 = h * s2 - a2 * u2, l2 = a2 * o2 - h * i2, p2 = u2 * i2 - s2 * o2, f2 = e2 * c2 + r2 * l2 + n2 * p2;
    if (f2 === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const d = 1 / f2;
    return t3[0] = c2 * d, t3[1] = (n2 * u2 - h * r2) * d, t3[2] = (a2 * r2 - n2 * s2) * d, t3[3] = l2 * d, t3[4] = (h * e2 - n2 * o2) * d, t3[5] = (n2 * i2 - a2 * e2) * d, t3[6] = p2 * d, t3[7] = (r2 * o2 - u2 * e2) * d, t3[8] = (s2 * e2 - r2 * i2) * d, this;
  }
  transpose() {
    let t3;
    const e2 = this.elements;
    return t3 = e2[1], e2[1] = e2[3], e2[3] = t3, t3 = e2[2], e2[2] = e2[6], e2[6] = t3, t3 = e2[5], e2[5] = e2[7], e2[7] = t3, this;
  }
  getNormalMatrix(t3) {
    return this.setFromMatrix4(t3).invert().transpose();
  }
  transposeIntoArray(t3) {
    const e2 = this.elements;
    return t3[0] = e2[0], t3[1] = e2[3], t3[2] = e2[6], t3[3] = e2[1], t3[4] = e2[4], t3[5] = e2[7], t3[6] = e2[2], t3[7] = e2[5], t3[8] = e2[8], this;
  }
  setUvTransform(t3, e2, r2, n2, i2, s2, a2) {
    const o2 = Math.cos(i2), u2 = Math.sin(i2);
    return this.set(r2 * o2, r2 * u2, -r2 * (o2 * s2 + u2 * a2) + s2 + t3, -n2 * u2, n2 * o2, -n2 * (-u2 * s2 + o2 * a2) + a2 + e2, 0, 0, 1), this;
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
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
ot.prototype.isMatrix3 = true;
new ot();
Object.freeze(new e(0, 0));
Object.freeze(new e(1, 1));
Object.freeze(new l(0, 0, 0));
Object.freeze(new l(1, 0, 0));
Object.freeze(new l(0, 1, 0));
Object.freeze(new l(0, 0, 1));
Object.freeze(new l(1, 1, 1));
Object.freeze(new c());
({RIGHT: Object.freeze(new l(1, 0, 0)), UP: Object.freeze(new l(0, 1, 0)), NEAR: Object.freeze(new l(0, 0, 1)), LEFT: Object.freeze(new l(-1, 0, 0)), DOWN: Object.freeze(new l(0, -1, 0)), FAR: Object.freeze(new l(0, 0, -1))});
var ee = function(t3) {
  return function(e2) {
    return 1 - t3(1 - e2);
  };
}, re = function(t3) {
  return function(e2) {
    return e2 <= 0.5 ? t3(2 * e2) / 2 : (2 - t3(2 * (1 - e2))) / 2;
  };
}, ne = ee, ie = re, se = function(t3) {
  return function(e2) {
    return Math.pow(e2, t3);
  };
}, ae = function(t3) {
  return function(e2) {
    return e2 * e2 * ((t3 + 1) * e2 - t3);
  };
}, oe = function(t3) {
  var e2 = ae(t3);
  return function(t4) {
    return (t4 *= 2) < 1 ? 0.5 * e2(t4) : 0.5 * (2 - Math.pow(2, -10 * (t4 - 1)));
  };
}, ue = se(2), he = ee(ue), ce = re(ue), le = function(t3) {
  return 1 - Math.sin(Math.acos(t3));
}, pe = ee(le), fe = re(pe), de = ae(1.525), me = ee(de), ye = re(de), ge = oe(1.525), ve = function(t3) {
  var e2 = t3 * t3;
  return t3 < 0.36363636363636365 ? 7.5625 * e2 : t3 < 0.7272727272727273 ? 9.075 * e2 - 9.9 * t3 + 3.4 : t3 < 0.9 ? 12.066481994459833 * e2 - 19.63545706371191 * t3 + 8.898060941828255 : 10.8 * t3 * t3 - 20.52 * t3 + 10.72;
}, xe = typeof Float32Array != "undefined", we = function(t3, e2) {
  return 1 - 3 * e2 + 3 * t3;
}, be = function(t3, e2) {
  return 3 * e2 - 6 * t3;
}, _e = function(t3) {
  return 3 * t3;
}, Me = function(t3, e2, r2) {
  return 3 * we(e2, r2) * t3 * t3 + 2 * be(e2, r2) * t3 + _e(e2);
}, Ne = function(t3, e2, r2) {
  return ((we(e2, r2) * t3 + be(e2, r2)) * t3 + _e(e2)) * t3;
};
Object.freeze({__proto__: null, [Symbol.toStringTag]: "Module", reversed: ee, mirrored: re, createReversedEasing: ne, createMirroredEasing: ie, createExpoIn: se, createBackIn: ae, createAnticipateEasing: oe, linear: function(t3) {
  return t3;
}, easeIn: ue, easeOut: he, easeInOut: ce, circIn: le, circOut: pe, circInOut: fe, backIn: de, backOut: me, backInOut: ye, anticipate: ge, bounceOut: ve, bounceIn: function(t3) {
  return 1 - ve(1 - t3);
}, bounceInOut: function(t3) {
  return t3 < 0.5 ? 0.5 * (1 - ve(1 - 2 * t3)) : 0.5 * ve(2 * t3 - 1) + 0.5;
}, cubicBezier: function(t3, e2, r2, n2) {
  var i2 = xe ? new Float32Array(11) : new Array(11), s2 = function(e3) {
    for (var n3, s3, a2, o2 = 0, u2 = 1; u2 !== 10 && i2[u2] <= e3; ++u2)
      o2 += 0.1;
    return --u2, n3 = (e3 - i2[u2]) / (i2[u2 + 1] - i2[u2]), (a2 = Me(s3 = o2 + 0.1 * n3, t3, r2)) >= 1e-3 ? function(e4, n4) {
      for (var i3 = 0, s4 = 0; i3 < 8; ++i3) {
        if ((s4 = Me(n4, t3, r2)) === 0)
          return n4;
        n4 -= (Ne(n4, t3, r2) - e4) / s4;
      }
      return n4;
    }(e3, s3) : a2 === 0 ? s3 : function(e4, n4, i3) {
      var s4, a3, o3 = 0;
      do {
        (s4 = Ne(a3 = n4 + (i3 - n4) / 2, t3, r2) - e4) > 0 ? i3 = a3 : n4 = a3;
      } while (Math.abs(s4) > 1e-7 && ++o3 < 10);
      return a3;
    }(e3, o2, o2 + 0.1);
  };
  return function() {
    for (var e3 = 0; e3 < 11; ++e3)
      i2[e3] = Ne(0.1 * e3, t3, r2);
  }(), function(i3) {
    return t3 === e2 && r2 === n2 ? i3 : i3 === 0 ? 0 : i3 === 1 ? 1 : Ne(s2(i3), e2, n2);
  };
}});
function Re(t3) {
  return typeof t3 == "number";
}
function De(t3) {
  return t3 && t3.constructor.prototype.isBigNumber === true || false;
}
function ke(t3) {
  return t3 && typeof t3 == "object" && Object.getPrototypeOf(t3).isComplex === true || false;
}
function Ie(t3) {
  return t3 && typeof t3 == "object" && Object.getPrototypeOf(t3).isFraction === true || false;
}
function Le(t3) {
  return t3 && t3.constructor.prototype.isUnit === true || false;
}
function Be(t3) {
  return typeof t3 == "string";
}
var Fe = Array.isArray;
function Pe(t3) {
  return t3 && t3.constructor.prototype.isMatrix === true || false;
}
function Ue(t3) {
  return Array.isArray(t3) || Pe(t3);
}
function je(t3) {
  return t3 && t3.isDenseMatrix && t3.constructor.prototype.isMatrix === true || false;
}
function qe(t3) {
  return t3 && t3.isSparseMatrix && t3.constructor.prototype.isMatrix === true || false;
}
function He(t3) {
  return t3 && t3.constructor.prototype.isRange === true || false;
}
function Ve(t3) {
  return t3 && t3.constructor.prototype.isIndex === true || false;
}
function $e(t3) {
  return typeof t3 == "boolean";
}
function Ge(t3) {
  return t3 && t3.constructor.prototype.isResultSet === true || false;
}
function We(t3) {
  return t3 && t3.constructor.prototype.isHelp === true || false;
}
function Ye(t3) {
  return typeof t3 == "function";
}
function Ze(t3) {
  return t3 instanceof Date;
}
function Xe(t3) {
  return t3 instanceof RegExp;
}
function Qe(t3) {
  return !(!t3 || typeof t3 != "object" || t3.constructor !== Object || ke(t3) || Ie(t3));
}
function Je(t3) {
  return t3 === null;
}
function Ke(t3) {
  return t3 === void 0;
}
function tr(t3) {
  return t3 && t3.isAccessorNode === true && t3.constructor.prototype.isNode === true || false;
}
function er(t3) {
  return t3 && t3.isArrayNode === true && t3.constructor.prototype.isNode === true || false;
}
function rr(t3) {
  return t3 && t3.isAssignmentNode === true && t3.constructor.prototype.isNode === true || false;
}
function nr(t3) {
  return t3 && t3.isBlockNode === true && t3.constructor.prototype.isNode === true || false;
}
function ir(t3) {
  return t3 && t3.isConditionalNode === true && t3.constructor.prototype.isNode === true || false;
}
function sr(t3) {
  return t3 && t3.isConstantNode === true && t3.constructor.prototype.isNode === true || false;
}
function ar(t3) {
  return t3 && t3.isFunctionAssignmentNode === true && t3.constructor.prototype.isNode === true || false;
}
function or(t3) {
  return t3 && t3.isFunctionNode === true && t3.constructor.prototype.isNode === true || false;
}
function ur(t3) {
  return t3 && t3.isIndexNode === true && t3.constructor.prototype.isNode === true || false;
}
function hr(t3) {
  return t3 && t3.isNode === true && t3.constructor.prototype.isNode === true || false;
}
function cr(t3) {
  return t3 && t3.isObjectNode === true && t3.constructor.prototype.isNode === true || false;
}
function lr(t3) {
  return t3 && t3.isOperatorNode === true && t3.constructor.prototype.isNode === true || false;
}
function pr(t3) {
  return t3 && t3.isParenthesisNode === true && t3.constructor.prototype.isNode === true || false;
}
function fr(t3) {
  return t3 && t3.isRangeNode === true && t3.constructor.prototype.isNode === true || false;
}
function dr(t3) {
  return t3 && t3.isSymbolNode === true && t3.constructor.prototype.isNode === true || false;
}
function mr(t3) {
  return t3 && t3.constructor.prototype.isChain === true || false;
}
function yr(t3) {
  var e2 = typeof t3;
  return e2 === "object" ? t3 === null ? "null" : Array.isArray(t3) ? "Array" : t3 instanceof Date ? "Date" : t3 instanceof RegExp ? "RegExp" : De(t3) ? "BigNumber" : ke(t3) ? "Complex" : Ie(t3) ? "Fraction" : Pe(t3) ? "Matrix" : Le(t3) ? "Unit" : Ve(t3) ? "Index" : He(t3) ? "Range" : Ge(t3) ? "ResultSet" : hr(t3) ? t3.type : mr(t3) ? "Chain" : We(t3) ? "Help" : "Object" : e2 === "function" ? "Function" : e2;
}
function gr(t3) {
  var e2 = typeof t3;
  if (e2 === "number" || e2 === "string" || e2 === "boolean" || t3 == null)
    return t3;
  if (typeof t3.clone == "function")
    return t3.clone();
  if (Array.isArray(t3))
    return t3.map(function(t4) {
      return gr(t4);
    });
  if (t3 instanceof Date)
    return new Date(t3.valueOf());
  if (De(t3))
    return t3;
  if (t3 instanceof RegExp)
    throw new TypeError("Cannot clone " + t3);
  return vr(t3, gr);
}
function vr(t3, e2) {
  var r2 = {};
  for (var n2 in t3)
    Er(t3, n2) && (r2[n2] = e2(t3[n2]));
  return r2;
}
function xr(t3, e2) {
  for (var r2 in e2)
    Er(e2, r2) && (t3[r2] = e2[r2]);
  return t3;
}
function br(t3, e2) {
  var r2, n2, i2;
  if (Array.isArray(t3)) {
    if (!Array.isArray(e2))
      return false;
    if (t3.length !== e2.length)
      return false;
    for (n2 = 0, i2 = t3.length; n2 < i2; n2++)
      if (!br(t3[n2], e2[n2]))
        return false;
    return true;
  }
  if (typeof t3 == "function")
    return t3 === e2;
  if (t3 instanceof Object) {
    if (Array.isArray(e2) || !(e2 instanceof Object))
      return false;
    for (r2 in t3)
      if (!(r2 in e2) || !br(t3[r2], e2[r2]))
        return false;
    for (r2 in e2)
      if (!(r2 in t3) || !br(t3[r2], e2[r2]))
        return false;
    return true;
  }
  return t3 === e2;
}
function Er(t3, e2) {
  return t3 && Object.hasOwnProperty.call(t3, e2);
}
var Ar = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function Rr(t3) {
  return t3 && t3.__esModule && Object.prototype.hasOwnProperty.call(t3, "default") ? t3.default : t3;
}
var kr = function() {
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
    function d(t4) {
      return t4.map(function(t5) {
        var e3 = t5.types.map(M);
        return (t5.restParam ? "..." : "") + e3.join("|");
      }).join(",");
    }
    function m2(t4, e3) {
      var r3 = t4.indexOf("...") === 0, n3 = (r3 ? t4.length > 3 ? t4.slice(3) : "any" : t4).split("|").map(P).filter(U).filter(F), i3 = A(e3, n3), s3 = n3.map(function(t5) {
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
      return t4.trim() !== "" && (n3 = t4.split(",").map(P).map(function(t5, e4, n4) {
        var i3 = m2(t5, r3);
        if (i3.restParam && e4 !== n4.length - 1)
          throw new SyntaxError('Unexpected rest parameter "' + t5 + '": only allowed for the last parameter');
        return i3;
      })), n3.some(q) ? null : {params: n3, fn: e3};
    }
    function g2(t4) {
      var e3 = V(t4);
      return !!e3 && e3.restParam;
    }
    function v2(t4) {
      return t4.types.some(function(t5) {
        return t5.conversion != null;
      });
    }
    function x2(e3) {
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
    function w2(t4) {
      var e3, r3, n3;
      if (g2(t4)) {
        var i3 = (e3 = H(t4).map(x2)).length, s3 = x2(V(t4)), a3 = function(t5) {
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
      } : t4.length === 1 ? (r3 = x2(t4[0]), function(t5) {
        return r3(t5[0]) && t5.length === 1;
      }) : t4.length === 2 ? (r3 = x2(t4[0]), n3 = x2(t4[1]), function(t5) {
        return r3(t5[0]) && n3(t5[1]) && t5.length === 2;
      }) : (e3 = t4.map(x2), function(t5) {
        for (var r4 = 0; r4 < e3.length; r4++)
          if (!e3[r4](t5[r4]))
            return false;
        return t5.length === e3.length;
      });
    }
    function b2(t4, e3) {
      return e3 < t4.params.length ? t4.params[e3] : g2(t4.params) ? V(t4.params) : null;
    }
    function _2(t4, e3, r3) {
      var n3 = b2(t4, e3);
      return (n3 ? r3 ? n3.types.filter(N) : n3.types : []).map(M);
    }
    function M(t4) {
      return t4.name;
    }
    function N(t4) {
      return t4.conversion === null || t4.conversion === void 0;
    }
    function E(t4, e3) {
      var r3 = Z(X(t4, function(t5) {
        return _2(t5, e3, false);
      }));
      return r3.indexOf("any") !== -1 ? ["any"] : r3;
    }
    function S(t4, e3, r3) {
      var n3, i3, s3, a3 = t4 || "unnamed", o3 = r3;
      for (s3 = 0; s3 < e3.length; s3++) {
        var u3 = o3.filter(function(t5) {
          var r4 = x2(b2(t5, s3));
          return (s3 < t5.params.length || g2(t5.params)) && r4(e3[s3]);
        });
        if (u3.length === 0) {
          if ((i3 = E(o3, s3)).length > 0) {
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
        return i3 = E(o3, s3), (n3 = new TypeError("Too few arguments in function " + a3 + " (expected: " + i3.join(" or ") + ", index: " + e3.length + ")")).data = {category: "tooFewArgs", fn: a3, index: e3.length, expected: i3}, n3;
      var p3 = Math.max.apply(null, c3);
      return e3.length > p3 ? ((n3 = new TypeError("Too many arguments in function " + a3 + " (expected: " + p3 + ", actual: " + e3.length + ")")).data = {category: "tooManyArgs", fn: a3, index: e3.length, expectedLength: p3}, n3) : ((n3 = new TypeError('Arguments of type "' + e3.join(", ") + '" do not match any of the defined signatures of function ' + a3 + ".")).data = {category: "mismatch", actual: e3.map(l2)}, n3);
    }
    function T(t4) {
      for (var e3 = 999, r3 = 0; r3 < t4.types.length; r3++)
        N(t4.types[r3]) && (e3 = Math.min(e3, t4.types[r3].typeIndex));
      return e3;
    }
    function O(t4) {
      for (var e3 = 999, r3 = 0; r3 < t4.types.length; r3++)
        N(t4.types[r3]) || (e3 = Math.min(e3, t4.types[r3].conversionIndex));
      return e3;
    }
    function z(t4, e3) {
      var r3;
      return (r3 = t4.restParam - e3.restParam) != 0 || (r3 = v2(t4) - v2(e3)) != 0 || (r3 = T(t4) - T(e3)) != 0 ? r3 : O(t4) - O(e3);
    }
    function C(t4, e3) {
      var r3, n3, i3 = Math.min(t4.params.length, e3.params.length);
      if ((n3 = t4.params.some(v2) - e3.params.some(v2)) != 0)
        return n3;
      for (r3 = 0; r3 < i3; r3++)
        if ((n3 = v2(t4.params[r3]) - v2(e3.params[r3])) != 0)
          return n3;
      for (r3 = 0; r3 < i3; r3++)
        if ((n3 = z(t4.params[r3], e3.params[r3])) !== 0)
          return n3;
      return t4.params.length - e3.params.length;
    }
    function A(t4, e3) {
      var r3 = {};
      return t4.forEach(function(t5) {
        e3.indexOf(t5.from) !== -1 || e3.indexOf(t5.to) === -1 || r3[t5.from] || (r3[t5.from] = t5);
      }), Object.keys(r3).map(function(t5) {
        return r3[t5];
      });
    }
    function R(t4, e3) {
      var r3 = e3;
      if (t4.some(v2)) {
        var n3 = g2(t4), i3 = t4.map(D);
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
    function D(t4) {
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
    function k(t4) {
      var e3 = {};
      return t4.forEach(function(t5) {
        t5.params.some(v2) || I(t5.params, true).forEach(function(r3) {
          e3[d(r3)] = t5.fn;
        });
      }), e3;
    }
    function I(t4, e3) {
      function r3(t5, n3, i3) {
        if (n3 < t5.length) {
          var s3, a3 = t5[n3], o3 = e3 ? a3.types.filter(N) : a3.types;
          if (a3.restParam) {
            var u3 = o3.filter(N);
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
    function L(t4, e3) {
      for (var r3 = Math.max(t4.params.length, e3.params.length), n3 = 0; n3 < r3; n3++)
        if (!W(_2(t4, n3, true), _2(e3, n3, true)))
          return false;
      var i3 = t4.params.length, s3 = e3.params.length, a3 = g2(t4.params), o3 = g2(e3.params);
      return a3 ? o3 ? i3 === s3 : s3 >= i3 : o3 ? i3 >= s3 : i3 === s3;
    }
    function B(t4, n3) {
      if (Object.keys(n3).length === 0)
        throw new SyntaxError("No signatures provided");
      var i3 = [];
      Object.keys(n3).map(function(t5) {
        return y2(t5, n3[t5], u2.conversions);
      }).filter(j).forEach(function(t5) {
        var e3 = Y(i3, function(e4) {
          return L(e4, t5);
        });
        if (e3)
          throw new TypeError('Conflicting signatures "' + d(e3.params) + '" and "' + d(t5.params) + '".');
        i3.push(t5);
      });
      var s3 = X(i3, function(t5) {
        return (t5 ? I(t5.params, false) : []).map(function(e3) {
          return {params: e3, fn: t5.fn};
        });
      }).filter(j);
      s3.sort(C);
      var a3 = s3[0] && s3[0].params.length <= 2 && !g2(s3[0].params), o3 = s3[1] && s3[1].params.length <= 2 && !g2(s3[1].params), h2 = s3[2] && s3[2].params.length <= 2 && !g2(s3[2].params), c3 = s3[3] && s3[3].params.length <= 2 && !g2(s3[3].params), l3 = s3[4] && s3[4].params.length <= 2 && !g2(s3[4].params), p3 = s3[5] && s3[5].params.length <= 2 && !g2(s3[5].params), f3 = a3 && o3 && h2 && c3 && l3 && p3, m3 = s3.map(function(t5) {
        return w2(t5.params);
      }), v3 = a3 ? x2(s3[0].params[0]) : e2, b3 = o3 ? x2(s3[1].params[0]) : e2, _3 = h2 ? x2(s3[2].params[0]) : e2, M2 = c3 ? x2(s3[3].params[0]) : e2, N2 = l3 ? x2(s3[4].params[0]) : e2, E2 = p3 ? x2(s3[5].params[0]) : e2, T2 = a3 ? x2(s3[0].params[1]) : e2, O2 = o3 ? x2(s3[1].params[1]) : e2, z2 = h2 ? x2(s3[2].params[1]) : e2, A2 = c3 ? x2(s3[3].params[1]) : e2, D2 = l3 ? x2(s3[4].params[1]) : e2, B2 = p3 ? x2(s3[5].params[1]) : e2, F2 = s3.map(function(t5) {
        return R(t5.params, t5.fn);
      }), P2 = a3 ? F2[0] : r2, U2 = o3 ? F2[1] : r2, q2 = h2 ? F2[2] : r2, H2 = c3 ? F2[3] : r2, V2 = l3 ? F2[4] : r2, $2 = p3 ? F2[5] : r2, G2 = a3 ? s3[0].params.length : -1, W2 = o3 ? s3[1].params.length : -1, Z2 = h2 ? s3[2].params.length : -1, Q2 = c3 ? s3[3].params.length : -1, J2 = l3 ? s3[4].params.length : -1, K = p3 ? s3[5].params.length : -1, tt = f3 ? 6 : 0, et = s3.length, rt = function() {
        for (var e3 = tt; e3 < et; e3++)
          if (m3[e3](arguments))
            return F2[e3].apply(this, arguments);
        throw S(t4, arguments, s3);
      }, nt = function t5(e3, r3) {
        return arguments.length === G2 && v3(e3) && T2(r3) ? P2.apply(t5, arguments) : arguments.length === W2 && b3(e3) && O2(r3) ? U2.apply(t5, arguments) : arguments.length === Z2 && _3(e3) && z2(r3) ? q2.apply(t5, arguments) : arguments.length === Q2 && M2(e3) && A2(r3) ? H2.apply(t5, arguments) : arguments.length === J2 && N2(e3) && D2(r3) ? V2.apply(t5, arguments) : arguments.length === K && E2(e3) && B2(r3) ? $2.apply(t5, arguments) : rt.apply(t5, arguments);
      };
      try {
        Object.defineProperty(nt, "name", {value: t4});
      } catch (it) {
      }
      return nt.signatures = k(s3), nt;
    }
    function F(t4) {
      return u2.ignore.indexOf(t4) === -1;
    }
    function P(t4) {
      return t4.trim();
    }
    function U(t4) {
      return !!t4;
    }
    function j(t4) {
      return t4 !== null;
    }
    function q(t4) {
      return t4.types.length === 0;
    }
    function H(t4) {
      return t4.slice(0, t4.length - 1);
    }
    function V(t4) {
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
    return (u2 = B("typed", {"string, Object": B, Object: function(t4) {
      var e3 = [];
      for (var r3 in t4)
        t4.hasOwnProperty(r3) && e3.push(t4[r3]);
      return B(Q(e3), t4);
    }, "...Function": function(t4) {
      return B(Q(t4), J(t4));
    }, "string, ...Function": function(t4, e3) {
      return B(t4, J(e3));
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
function Ir(t3) {
  return typeof t3 == "boolean" || !!isFinite(t3) && t3 === Math.round(t3);
}
var Lr = Math.sign || function(t3) {
  return t3 > 0 ? 1 : t3 < 0 ? -1 : 0;
};
function Br(t3, e2) {
  if (typeof e2 == "function")
    return e2(t3);
  if (t3 === 1 / 0)
    return "Infinity";
  if (t3 === -1 / 0)
    return "-Infinity";
  if (isNaN(t3))
    return "NaN";
  var r2, n2 = "auto";
  switch (e2 && (e2.notation && (n2 = e2.notation), Re(e2) ? r2 = e2 : Re(e2.precision) && (r2 = e2.precision)), n2) {
    case "fixed":
      return Pr(t3, r2);
    case "exponential":
      return Ur(t3, r2);
    case "engineering":
      return function(t4, e3) {
        if (isNaN(t4) || !isFinite(t4))
          return String(t4);
        var r3 = jr(Fr(t4), e3), n3 = r3.exponent, i2 = r3.coefficients, s2 = n3 % 3 == 0 ? n3 : n3 < 0 ? n3 - 3 - n3 % 3 : n3 - n3 % 3;
        if (Re(e3))
          for (; e3 > i2.length || n3 - s2 + 1 > i2.length; )
            i2.push(0);
        else
          for (var a2 = Math.abs(n3 - s2) - (i2.length - 1), o2 = 0; o2 < a2; o2++)
            i2.push(0);
        var u2 = Math.abs(n3 - s2), h = 1;
        for (; u2 > 0; )
          h++, u2--;
        var c2 = i2.slice(h).join(""), l2 = Re(e3) && c2.length || c2.match(/[1-9]/) ? "." + c2 : "", p2 = i2.slice(0, h).join("") + l2 + "e" + (n3 >= 0 ? "+" : "") + s2.toString();
        return r3.sign + p2;
      }(t3, r2);
    case "auto":
      return function(t4, e3, r3) {
        if (isNaN(t4) || !isFinite(t4))
          return String(t4);
        var n3 = r3 && r3.lowerExp !== void 0 ? r3.lowerExp : -3, i2 = r3 && r3.upperExp !== void 0 ? r3.upperExp : 5, s2 = Fr(t4), a2 = e3 ? jr(s2, e3) : s2;
        if (a2.exponent < n3 || a2.exponent >= i2)
          return Ur(t4, e3);
        var o2 = a2.coefficients, u2 = a2.exponent;
        o2.length < e3 && (o2 = o2.concat(qr(e3 - o2.length))), o2 = o2.concat(qr(u2 - o2.length + 1 + (o2.length < e3 ? e3 - o2.length : 0)));
        var h = u2 > 0 ? u2 : 0;
        return h < (o2 = qr(-u2).concat(o2)).length - 1 && o2.splice(h + 1, 0, "."), a2.sign + o2.join("");
      }(t3, r2, e2 && e2).replace(/((\.\d*?)(0+))($|e)/, function() {
        var t4 = arguments[2], e3 = arguments[4];
        return t4 !== "." ? t4 + e3 : e3;
      });
    default:
      throw new Error('Unknown notation "' + n2 + '". Choose "auto", "exponential", or "fixed".');
  }
}
function Fr(t3) {
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
function Pr(t3, e2) {
  if (isNaN(t3) || !isFinite(t3))
    return String(t3);
  var r2 = Fr(t3), n2 = typeof e2 == "number" ? jr(r2, r2.exponent + 1 + e2) : r2, i2 = n2.coefficients, s2 = n2.exponent + 1, a2 = s2 + (e2 || 0);
  return i2.length < a2 && (i2 = i2.concat(qr(a2 - i2.length))), s2 < 0 && (i2 = qr(1 - s2).concat(i2), s2 = 1), s2 < i2.length && i2.splice(s2, 0, s2 === 0 ? "0." : "."), n2.sign + i2.join("");
}
function Ur(t3, e2) {
  if (isNaN(t3) || !isFinite(t3))
    return String(t3);
  var r2 = Fr(t3), n2 = e2 ? jr(r2, e2) : r2, i2 = n2.coefficients, s2 = n2.exponent;
  i2.length < e2 && (i2 = i2.concat(qr(e2 - i2.length)));
  var a2 = i2.shift();
  return n2.sign + a2 + (i2.length > 0 ? "." + i2.join("") : "") + "e" + (s2 >= 0 ? "+" : "") + s2;
}
function jr(t3, e2) {
  for (var r2 = {sign: t3.sign, coefficients: t3.coefficients, exponent: t3.exponent}, n2 = r2.coefficients; e2 <= 0; )
    n2.unshift(0), r2.exponent++, e2++;
  if (n2.length > e2 && n2.splice(e2, n2.length - e2)[0] >= 5) {
    var i2 = e2 - 1;
    for (n2[i2]++; n2[i2] === 10; )
      n2.pop(), i2 === 0 && (n2.unshift(0), r2.exponent++, i2++), n2[--i2]++;
  }
  return r2;
}
function qr(t3) {
  for (var e2 = [], r2 = 0; r2 < t3; r2++)
    e2.push(0);
  return e2;
}
var Hr = Number.EPSILON || 2220446049250313e-31;
function Vr(t3, e2, r2) {
  if (r2 == null)
    return t3 === e2;
  if (t3 === e2)
    return true;
  if (isNaN(t3) || isNaN(e2))
    return false;
  if (isFinite(t3) && isFinite(e2)) {
    var n2 = Math.abs(t3 - e2);
    return n2 < Hr || n2 <= Math.max(Math.abs(t3), Math.abs(e2)) * r2;
  }
  return false;
}
function $r(t3, e2) {
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
      return Gr(t3, r2);
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
      return (o2 >= i2 && o2 < s2 ? a2.toFixed() : Gr(t3, r2)).replace(/((\.\d*?)(0+))($|e)/, function() {
        var t4 = arguments[2], e3 = arguments[4];
        return t4 !== "." ? t4 + e3 : e3;
      });
    default:
      throw new Error('Unknown notation "' + n2 + '". Choose "auto", "exponential", or "fixed".');
  }
}
function Gr(t3, e2) {
  return e2 !== void 0 ? t3.toExponential(e2 - 1) : t3.toExponential();
}
function Wr(t3, e2) {
  var r2 = t3.length - e2.length, n2 = t3.length;
  return t3.substring(r2, n2) === e2;
}
function Yr(t3, e2) {
  return typeof t3 == "number" ? Br(t3, e2) : De(t3) ? $r(t3, e2) : function(t4) {
    return t4 && typeof t4 == "object" && typeof t4.s == "number" && typeof t4.n == "number" && typeof t4.d == "number" || false;
  }(t3) ? e2 && e2.fraction === "decimal" ? t3.toString() : t3.s * t3.n + "/" + t3.d : Array.isArray(t3) ? Qr(t3, e2) : Be(t3) ? '"' + t3 + '"' : typeof t3 == "function" ? t3.syntax ? String(t3.syntax) : "function" : t3 && typeof t3 == "object" ? typeof t3.format == "function" ? t3.format(e2) : t3 && t3.toString(e2) !== {}.toString() ? t3.toString(e2) : "{" + Object.keys(t3).map((r2) => '"' + r2 + '": ' + Yr(t3[r2], e2)).join(", ") + "}" : String(t3);
}
function Zr(t3) {
  for (var e2 = String(t3), r2 = "", n2 = 0; n2 < e2.length; ) {
    var i2 = e2.charAt(n2);
    i2 === "\\" ? (r2 += i2, n2++, (i2 = e2.charAt(n2)) !== "" && '"\\/bfnrtu'.indexOf(i2) !== -1 || (r2 += "\\"), r2 += i2) : r2 += i2 === '"' ? '\\"' : i2, n2++;
  }
  return '"' + r2 + '"';
}
function Xr(t3) {
  var e2 = String(t3);
  return e2 = e2.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Qr(t3, e2) {
  if (Array.isArray(t3)) {
    for (var r2 = "[", n2 = t3.length, i2 = 0; i2 < n2; i2++)
      i2 !== 0 && (r2 += ", "), r2 += Qr(t3[i2], e2);
    return r2 += "]";
  }
  return Yr(t3, e2);
}
function Jr(t3, e2, r2) {
  if (!(this instanceof Jr))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = t3, this.expected = e2, this.relation = r2, this.message = "Dimension mismatch (" + (Array.isArray(t3) ? "[" + t3.join(", ") + "]" : t3) + " " + (this.relation || "!=") + " " + (Array.isArray(e2) ? "[" + e2.join(", ") + "]" : e2) + ")", this.stack = new Error().stack;
}
function Kr(t3, e2, r2) {
  if (!(this instanceof Kr))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = t3, arguments.length < 3 ? (this.min = 0, this.max = e2) : (this.min = e2, this.max = r2), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
function tn(t3) {
  for (var e2 = []; Array.isArray(t3); )
    e2.push(t3.length), t3 = t3[0];
  return e2;
}
function en(t3, e2, r2) {
  var n2, i2 = t3.length;
  if (i2 !== e2[r2])
    throw new Jr(i2, e2[r2]);
  if (r2 < e2.length - 1) {
    var s2 = r2 + 1;
    for (n2 = 0; n2 < i2; n2++) {
      var a2 = t3[n2];
      if (!Array.isArray(a2))
        throw new Jr(e2.length - 1, e2.length, "<");
      en(t3[n2], e2, s2);
    }
  } else
    for (n2 = 0; n2 < i2; n2++)
      if (Array.isArray(t3[n2]))
        throw new Jr(e2.length + 1, e2.length, ">");
}
function rn(t3, e2) {
  if (e2.length === 0) {
    if (Array.isArray(t3))
      throw new Jr(t3.length, 0);
  } else
    en(t3, e2, 0);
}
function nn(t3, e2) {
  if (!Re(t3) || !Ir(t3))
    throw new TypeError("Index must be an integer (value: " + t3 + ")");
  if (t3 < 0 || typeof e2 == "number" && t3 >= e2)
    throw new Kr(t3, e2);
}
function sn(t3, e2, r2) {
  if (!Array.isArray(t3) || !Array.isArray(e2))
    throw new TypeError("Array expected");
  if (e2.length === 0)
    throw new Error("Resizing to scalar is not supported");
  return e2.forEach(function(t4) {
    if (!Re(t4) || !Ir(t4) || t4 < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Yr(e2) + ")");
  }), an(t3, e2, 0, r2 !== void 0 ? r2 : 0), t3;
}
function an(t3, e2, r2, n2) {
  var i2, s2, a2 = t3.length, o2 = e2[r2], u2 = Math.min(a2, o2);
  if (t3.length = o2, r2 < e2.length - 1) {
    var h = r2 + 1;
    for (i2 = 0; i2 < u2; i2++)
      s2 = t3[i2], Array.isArray(s2) || (s2 = [s2], t3[i2] = s2), an(s2, e2, h, n2);
    for (i2 = u2; i2 < o2; i2++)
      s2 = [], t3[i2] = s2, an(s2, e2, h, n2);
  } else {
    for (i2 = 0; i2 < u2; i2++)
      for (; Array.isArray(t3[i2]); )
        t3[i2] = t3[i2][0];
    for (i2 = u2; i2 < o2; i2++)
      t3[i2] = n2;
  }
}
function on(t3, e2) {
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
    throw new Jr(0, i2(tn(t3)), "!=");
  for (var s2 = 1, a2 = 0; a2 < e2.length; a2++)
    s2 *= e2[a2];
  if (n2.length !== s2)
    throw new Jr(i2(e2), i2(tn(t3)), "!=");
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
    if (o2 instanceof Jr)
      throw new Jr(i2(e2), i2(tn(t3)), "!=");
    throw o2;
  }
  return r2;
}
function un(t3, e2, r2, n2) {
  var i2 = n2 || tn(t3);
  if (r2)
    for (var s2 = 0; s2 < r2; s2++)
      t3 = [t3], i2.unshift(1);
  for (t3 = hn(t3, e2, 0); i2.length < e2; )
    i2.push(1);
  return t3;
}
function hn(t3, e2, r2) {
  var n2, i2;
  if (Array.isArray(t3)) {
    var s2 = r2 + 1;
    for (n2 = 0, i2 = t3.length; n2 < i2; n2++)
      t3[n2] = hn(t3[n2], e2, s2);
  } else
    for (var a2 = r2; a2 < e2; a2++)
      t3 = [t3];
  return t3;
}
function cn(t3, e2) {
  return Array.prototype.map.call(t3, e2);
}
function ln(t3, e2) {
  Array.prototype.forEach.call(t3, e2);
}
function pn(t3, e2) {
  return Array.prototype.join.call(t3, e2);
}
function fn(t3, e2) {
  for (var r2, n2 = 0, i2 = 0; i2 < t3.length; i2++) {
    var s2 = t3[i2], a2 = Array.isArray(s2);
    if (i2 === 0 && a2 && (n2 = s2.length), a2 && s2.length !== n2)
      return;
    var o2 = a2 ? fn(s2, e2) : e2(s2);
    if (r2 === void 0)
      r2 = o2;
    else if (r2 !== o2)
      return "mixed";
  }
  return r2;
}
function mn(t3, e2, r2, n2) {
  function i2(n3) {
    var i3 = function(t4, e3) {
      for (var r3 = {}, n4 = 0; n4 < e3.length; n4++) {
        var i4 = e3[n4], s2 = t4[i4];
        s2 !== void 0 && (r3[i4] = s2);
      }
      return r3;
    }(n3, e2.map(gn));
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
function gn(t3) {
  return t3 && t3[0] === "?" ? t3.slice(1) : t3;
}
Jr.prototype = new RangeError(), Jr.prototype.constructor = RangeError, Jr.prototype.name = "DimensionError", Jr.prototype.isDimensionError = true, Kr.prototype = new RangeError(), Kr.prototype.constructor = RangeError, Kr.prototype.name = "IndexError", Kr.prototype.isIndexError = true;
var vn = function() {
  return vn = kr.create, kr;
}, xn = mn("typed", ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], function(t3) {
  var {BigNumber: e2, Complex: r2, DenseMatrix: n2, Fraction: i2} = t3, s2 = vn();
  return s2.types = [{name: "number", test: Re}, {name: "Complex", test: ke}, {name: "BigNumber", test: De}, {name: "Fraction", test: Ie}, {name: "Unit", test: Le}, {name: "string", test: Be}, {name: "Chain", test: mr}, {name: "Array", test: Fe}, {name: "Matrix", test: Pe}, {name: "DenseMatrix", test: je}, {name: "SparseMatrix", test: qe}, {name: "Range", test: He}, {name: "Index", test: Ve}, {name: "boolean", test: $e}, {name: "ResultSet", test: Ge}, {name: "Help", test: We}, {name: "function", test: Ye}, {name: "Date", test: Ze}, {name: "RegExp", test: Xe}, {name: "null", test: Je}, {name: "undefined", test: Ke}, {name: "AccessorNode", test: tr}, {name: "ArrayNode", test: er}, {name: "AssignmentNode", test: rr}, {name: "BlockNode", test: nr}, {name: "ConditionalNode", test: ir}, {name: "ConstantNode", test: sr}, {name: "FunctionNode", test: or}, {name: "FunctionAssignmentNode", test: ar}, {name: "IndexNode", test: ur}, {name: "Node", test: hr}, {name: "ObjectNode", test: cr}, {name: "OperatorNode", test: lr}, {name: "ParenthesisNode", test: pr}, {name: "RangeNode", test: fr}, {name: "SymbolNode", test: dr}, {name: "Object", test: Qe}], s2.conversions = [{from: "number", to: "BigNumber", convert: function(t4) {
    if (e2 || wn(t4), t4.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length > 15)
      throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + t4 + "). Use function bignumber(x) to convert to BigNumber.");
    return new e2(t4);
  }}, {from: "number", to: "Complex", convert: function(t4) {
    return r2 || bn(t4), new r2(t4, 0);
  }}, {from: "number", to: "string", convert: function(t4) {
    return t4 + "";
  }}, {from: "BigNumber", to: "Complex", convert: function(t4) {
    return r2 || bn(t4), new r2(t4.toNumber(), 0);
  }}, {from: "Fraction", to: "BigNumber", convert: function(t4) {
    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
  }}, {from: "Fraction", to: "Complex", convert: function(t4) {
    return r2 || bn(t4), new r2(t4.valueOf(), 0);
  }}, {from: "number", to: "Fraction", convert: function(t4) {
    i2 || _n(t4);
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
    e2 || wn(t4);
    try {
      return new e2(t4);
    } catch (r3) {
      throw new Error('Cannot convert "' + t4 + '" to BigNumber');
    }
  }}, {from: "string", to: "Fraction", convert: function(t4) {
    i2 || _n(t4);
    try {
      return new i2(t4);
    } catch (e3) {
      throw new Error('Cannot convert "' + t4 + '" to Fraction');
    }
  }}, {from: "string", to: "Complex", convert: function(t4) {
    r2 || bn(t4);
    try {
      return new r2(t4);
    } catch (e3) {
      throw new Error('Cannot convert "' + t4 + '" to Complex');
    }
  }}, {from: "boolean", to: "number", convert: function(t4) {
    return +t4;
  }}, {from: "boolean", to: "BigNumber", convert: function(t4) {
    return e2 || wn(t4), new e2(+t4);
  }}, {from: "boolean", to: "Fraction", convert: function(t4) {
    return i2 || _n(t4), new i2(+t4);
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
function wn(t3) {
  throw new Error("Cannot convert value ".concat(t3, " into a BigNumber: no class 'BigNumber' provided"));
}
function bn(t3) {
  throw new Error("Cannot convert value ".concat(t3, " into a Complex number: no class 'Complex' provided"));
}
function _n(t3) {
  throw new Error("Cannot convert value ".concat(t3, " into a Fraction, no class 'Fraction' provided."));
}
var Mn, Nn, En = mn("ResultSet", [], () => {
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
}, {isClass: true}), Sn = 9e15, Tn = "0123456789abcdef", On = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", zn = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Cn = {precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -Sn, maxE: Sn, crypto: false}, An = true, Rn = "[DecimalError] Invalid argument: ", Dn = Math.floor, kn = Math.pow, In = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Ln = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Bn = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Fn = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Pn = 1e7, Un = On.length - 1, jn = zn.length - 1, qn = {name: "[object Decimal]"};
function Hn(t3) {
  var e2, r2, n2, i2 = t3.length - 1, s2 = "", a2 = t3[0];
  if (i2 > 0) {
    for (s2 += a2, e2 = 1; e2 < i2; e2++)
      (r2 = 7 - (n2 = t3[e2] + "").length) && (s2 += ti(r2)), s2 += n2;
    (r2 = 7 - (n2 = (a2 = t3[e2]) + "").length) && (s2 += ti(r2));
  } else if (a2 === 0)
    return "0";
  for (; a2 % 10 == 0; )
    a2 /= 10;
  return s2 + a2;
}
function Vn(t3, e2, r2) {
  if (t3 !== ~~t3 || t3 < e2 || t3 > r2)
    throw Error(Rn + t3);
}
function $n(t3, e2, r2, n2) {
  var i2, s2, a2, o2;
  for (s2 = t3[0]; s2 >= 10; s2 /= 10)
    --e2;
  return --e2 < 0 ? (e2 += 7, i2 = 0) : (i2 = Math.ceil((e2 + 1) / 7), e2 %= 7), s2 = kn(10, 7 - e2), o2 = t3[i2] % s2 | 0, n2 == null ? e2 < 3 ? (e2 == 0 ? o2 = o2 / 100 | 0 : e2 == 1 && (o2 = o2 / 10 | 0), a2 = r2 < 4 && o2 == 99999 || r2 > 3 && o2 == 49999 || o2 == 5e4 || o2 == 0) : a2 = (r2 < 4 && o2 + 1 == s2 || r2 > 3 && o2 + 1 == s2 / 2) && (t3[i2 + 1] / s2 / 100 | 0) == kn(10, e2 - 2) - 1 || (o2 == s2 / 2 || o2 == 0) && (t3[i2 + 1] / s2 / 100 | 0) == 0 : e2 < 4 ? (e2 == 0 ? o2 = o2 / 1e3 | 0 : e2 == 1 ? o2 = o2 / 100 | 0 : e2 == 2 && (o2 = o2 / 10 | 0), a2 = (n2 || r2 < 4) && o2 == 9999 || !n2 && r2 > 3 && o2 == 4999) : a2 = ((n2 || r2 < 4) && o2 + 1 == s2 || !n2 && r2 > 3 && o2 + 1 == s2 / 2) && (t3[i2 + 1] / s2 / 1e3 | 0) == kn(10, e2 - 3) - 1, a2;
}
function Gn(t3, e2, r2) {
  for (var n2, i2, s2 = [0], a2 = 0, o2 = t3.length; a2 < o2; ) {
    for (i2 = s2.length; i2--; )
      s2[i2] *= e2;
    for (s2[0] += Tn.indexOf(t3.charAt(a2++)), n2 = 0; n2 < s2.length; n2++)
      s2[n2] > r2 - 1 && (s2[n2 + 1] === void 0 && (s2[n2 + 1] = 0), s2[n2 + 1] += s2[n2] / r2 | 0, s2[n2] %= r2);
  }
  return s2.reverse();
}
qn.absoluteValue = qn.abs = function() {
  var t3 = new this.constructor(this);
  return t3.s < 0 && (t3.s = 1), Yn(t3);
}, qn.ceil = function() {
  return Yn(new this.constructor(this), this.e + 1, 2);
}, qn.comparedTo = qn.cmp = function(t3) {
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
}, qn.cosine = qn.cos = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.d ? r2.d[0] ? (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + Math.max(r2.e, r2.sd()) + 7, n2.rounding = 1, r2 = function(t4, e3) {
    var r3, n3, i2 = e3.d.length;
    i2 < 32 ? n3 = (1 / hi(4, r3 = Math.ceil(i2 / 3))).toString() : (r3 = 16, n3 = "2.3283064365386962890625e-10");
    t4.precision += r3, e3 = ui(t4, 1, e3.times(n3), new t4(1));
    for (var s2 = r3; s2--; ) {
      var a2 = e3.times(e3);
      e3 = a2.times(a2).minus(a2).times(8).plus(1);
    }
    return t4.precision -= r3, e3;
  }(n2, ci(n2, r2)), n2.precision = t3, n2.rounding = e2, Yn(Nn == 2 || Nn == 3 ? r2.neg() : r2, t3, e2, true)) : new n2(1) : new n2(NaN);
}, qn.cubeRoot = qn.cbrt = function() {
  var t3, e2, r2, n2, i2, s2, a2, o2, u2, h, c2 = this, l2 = c2.constructor;
  if (!c2.isFinite() || c2.isZero())
    return new l2(c2);
  for (An = false, (s2 = c2.s * kn(c2.s * c2, 1 / 3)) && Math.abs(s2) != 1 / 0 ? n2 = new l2(s2.toString()) : (r2 = Hn(c2.d), (s2 = ((t3 = c2.e) - r2.length + 1) % 3) && (r2 += s2 == 1 || s2 == -2 ? "0" : "00"), s2 = kn(r2, 1 / 3), t3 = Dn((t3 + 1) / 3) - (t3 % 3 == (t3 < 0 ? -1 : 2)), (n2 = new l2(r2 = s2 == 1 / 0 ? "5e" + t3 : (r2 = s2.toExponential()).slice(0, r2.indexOf("e") + 1) + t3)).s = c2.s), a2 = (t3 = l2.precision) + 3; ; )
    if (h = (u2 = (o2 = n2).times(o2).times(o2)).plus(c2), n2 = Wn(h.plus(c2).times(o2), h.plus(u2), a2 + 2, 1), Hn(o2.d).slice(0, a2) === (r2 = Hn(n2.d)).slice(0, a2)) {
      if ((r2 = r2.slice(a2 - 3, a2 + 1)) != "9999" && (i2 || r2 != "4999")) {
        +r2 && (+r2.slice(1) || r2.charAt(0) != "5") || (Yn(n2, t3 + 1, 1), e2 = !n2.times(n2).times(n2).eq(c2));
        break;
      }
      if (!i2 && (Yn(o2, t3 + 1, 0), o2.times(o2).times(o2).eq(c2))) {
        n2 = o2;
        break;
      }
      a2 += 4, i2 = 1;
    }
  return An = true, Yn(n2, t3, l2.rounding, e2);
}, qn.decimalPlaces = qn.dp = function() {
  var t3, e2 = this.d, r2 = NaN;
  if (e2) {
    if (r2 = 7 * ((t3 = e2.length - 1) - Dn(this.e / 7)), t3 = e2[t3])
      for (; t3 % 10 == 0; t3 /= 10)
        r2--;
    r2 < 0 && (r2 = 0);
  }
  return r2;
}, qn.dividedBy = qn.div = function(t3) {
  return Wn(this, new this.constructor(t3));
}, qn.dividedToIntegerBy = qn.divToInt = function(t3) {
  var e2 = this.constructor;
  return Yn(Wn(this, new e2(t3), 0, 1, 1), e2.precision, e2.rounding);
}, qn.equals = qn.eq = function(t3) {
  return this.cmp(t3) === 0;
}, qn.floor = function() {
  return Yn(new this.constructor(this), this.e + 1, 3);
}, qn.greaterThan = qn.gt = function(t3) {
  return this.cmp(t3) > 0;
}, qn.greaterThanOrEqualTo = qn.gte = function(t3) {
  var e2 = this.cmp(t3);
  return e2 == 1 || e2 === 0;
}, qn.hyperbolicCosine = qn.cosh = function() {
  var t3, e2, r2, n2, i2, s2 = this, a2 = s2.constructor, o2 = new a2(1);
  if (!s2.isFinite())
    return new a2(s2.s ? 1 / 0 : NaN);
  if (s2.isZero())
    return o2;
  r2 = a2.precision, n2 = a2.rounding, a2.precision = r2 + Math.max(s2.e, s2.sd()) + 4, a2.rounding = 1, (i2 = s2.d.length) < 32 ? e2 = (1 / hi(4, t3 = Math.ceil(i2 / 3))).toString() : (t3 = 16, e2 = "2.3283064365386962890625e-10"), s2 = ui(a2, 1, s2.times(e2), new a2(1), true);
  for (var u2, h = t3, c2 = new a2(8); h--; )
    u2 = s2.times(s2), s2 = o2.minus(u2.times(c2.minus(u2.times(c2))));
  return Yn(s2, a2.precision = r2, a2.rounding = n2, true);
}, qn.hyperbolicSine = qn.sinh = function() {
  var t3, e2, r2, n2, i2 = this, s2 = i2.constructor;
  if (!i2.isFinite() || i2.isZero())
    return new s2(i2);
  if (e2 = s2.precision, r2 = s2.rounding, s2.precision = e2 + Math.max(i2.e, i2.sd()) + 4, s2.rounding = 1, (n2 = i2.d.length) < 3)
    i2 = ui(s2, 2, i2, i2, true);
  else {
    t3 = (t3 = 1.4 * Math.sqrt(n2)) > 16 ? 16 : 0 | t3, i2 = ui(s2, 2, i2 = i2.times(1 / hi(5, t3)), i2, true);
    for (var a2, o2 = new s2(5), u2 = new s2(16), h = new s2(20); t3--; )
      a2 = i2.times(i2), i2 = i2.times(o2.plus(a2.times(u2.times(a2).plus(h))));
  }
  return s2.precision = e2, s2.rounding = r2, Yn(i2, e2, r2, true);
}, qn.hyperbolicTangent = qn.tanh = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.isFinite() ? r2.isZero() ? new n2(r2) : (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + 7, n2.rounding = 1, Wn(r2.sinh(), r2.cosh(), n2.precision = t3, n2.rounding = e2)) : new n2(r2.s);
}, qn.inverseCosine = qn.acos = function() {
  var t3, e2 = this, r2 = e2.constructor, n2 = e2.abs().cmp(1), i2 = r2.precision, s2 = r2.rounding;
  return n2 !== -1 ? n2 === 0 ? e2.isNeg() ? Jn(r2, i2, s2) : new r2(0) : new r2(NaN) : e2.isZero() ? Jn(r2, i2 + 4, s2).times(0.5) : (r2.precision = i2 + 6, r2.rounding = 1, e2 = e2.asin(), t3 = Jn(r2, i2 + 4, s2).times(0.5), r2.precision = i2, r2.rounding = s2, t3.minus(e2));
}, qn.inverseHyperbolicCosine = qn.acosh = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.lte(1) ? new n2(r2.eq(1) ? 0 : NaN) : r2.isFinite() ? (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + Math.max(Math.abs(r2.e), r2.sd()) + 4, n2.rounding = 1, An = false, r2 = r2.times(r2).minus(1).sqrt().plus(r2), An = true, n2.precision = t3, n2.rounding = e2, r2.ln()) : new n2(r2);
}, qn.inverseHyperbolicSine = qn.asinh = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return !r2.isFinite() || r2.isZero() ? new n2(r2) : (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + 2 * Math.max(Math.abs(r2.e), r2.sd()) + 6, n2.rounding = 1, An = false, r2 = r2.times(r2).plus(1).sqrt().plus(r2), An = true, n2.precision = t3, n2.rounding = e2, r2.ln());
}, qn.inverseHyperbolicTangent = qn.atanh = function() {
  var t3, e2, r2, n2, i2 = this, s2 = i2.constructor;
  return i2.isFinite() ? i2.e >= 0 ? new s2(i2.abs().eq(1) ? i2.s / 0 : i2.isZero() ? i2 : NaN) : (t3 = s2.precision, e2 = s2.rounding, n2 = i2.sd(), Math.max(n2, t3) < 2 * -i2.e - 1 ? Yn(new s2(i2), t3, e2, true) : (s2.precision = r2 = n2 - i2.e, i2 = Wn(i2.plus(1), new s2(1).minus(i2), r2 + t3, 1), s2.precision = t3 + 4, s2.rounding = 1, i2 = i2.ln(), s2.precision = t3, s2.rounding = e2, i2.times(0.5))) : new s2(NaN);
}, qn.inverseSine = qn.asin = function() {
  var t3, e2, r2, n2, i2 = this, s2 = i2.constructor;
  return i2.isZero() ? new s2(i2) : (e2 = i2.abs().cmp(1), r2 = s2.precision, n2 = s2.rounding, e2 !== -1 ? e2 === 0 ? ((t3 = Jn(s2, r2 + 4, n2).times(0.5)).s = i2.s, t3) : new s2(NaN) : (s2.precision = r2 + 6, s2.rounding = 1, i2 = i2.div(new s2(1).minus(i2.times(i2)).sqrt().plus(1)).atan(), s2.precision = r2, s2.rounding = n2, i2.times(2)));
}, qn.inverseTangent = qn.atan = function() {
  var t3, e2, r2, n2, i2, s2, a2, o2, u2, h = this, c2 = h.constructor, l2 = c2.precision, p2 = c2.rounding;
  if (h.isFinite()) {
    if (h.isZero())
      return new c2(h);
    if (h.abs().eq(1) && l2 + 4 <= jn)
      return (a2 = Jn(c2, l2 + 4, p2).times(0.25)).s = h.s, a2;
  } else {
    if (!h.s)
      return new c2(NaN);
    if (l2 + 4 <= jn)
      return (a2 = Jn(c2, l2 + 4, p2).times(0.5)).s = h.s, a2;
  }
  for (c2.precision = o2 = l2 + 10, c2.rounding = 1, t3 = r2 = Math.min(28, o2 / 7 + 2 | 0); t3; --t3)
    h = h.div(h.times(h).plus(1).sqrt().plus(1));
  for (An = false, e2 = Math.ceil(o2 / 7), n2 = 1, u2 = h.times(h), a2 = new c2(h), i2 = h; t3 !== -1; )
    if (i2 = i2.times(u2), s2 = a2.minus(i2.div(n2 += 2)), i2 = i2.times(u2), (a2 = s2.plus(i2.div(n2 += 2))).d[e2] !== void 0)
      for (t3 = e2; a2.d[t3] === s2.d[t3] && t3--; )
        ;
  return r2 && (a2 = a2.times(2 << r2 - 1)), An = true, Yn(a2, c2.precision = l2, c2.rounding = p2, true);
}, qn.isFinite = function() {
  return !!this.d;
}, qn.isInteger = qn.isInt = function() {
  return !!this.d && Dn(this.e / 7) > this.d.length - 2;
}, qn.isNaN = function() {
  return !this.s;
}, qn.isNegative = qn.isNeg = function() {
  return this.s < 0;
}, qn.isPositive = qn.isPos = function() {
  return this.s > 0;
}, qn.isZero = function() {
  return !!this.d && this.d[0] === 0;
}, qn.lessThan = qn.lt = function(t3) {
  return this.cmp(t3) < 0;
}, qn.lessThanOrEqualTo = qn.lte = function(t3) {
  return this.cmp(t3) < 1;
}, qn.logarithm = qn.log = function(t3) {
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
  if (An = false, a2 = si(h, o2 = l2 + 5), n2 = e2 ? Qn(c2, o2 + 10) : si(t3, o2), $n((u2 = Wn(a2, n2, o2, 1)).d, i2 = l2, p2))
    do {
      if (a2 = si(h, o2 += 10), n2 = e2 ? Qn(c2, o2 + 10) : si(t3, o2), u2 = Wn(a2, n2, o2, 1), !s2) {
        +Hn(u2.d).slice(i2 + 1, i2 + 15) + 1 == 1e14 && (u2 = Yn(u2, l2 + 1, 0));
        break;
      }
    } while ($n(u2.d, i2 += 10, p2));
  return An = true, Yn(u2, l2, p2);
}, qn.minus = qn.sub = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = this, d = f2.constructor;
  if (t3 = new d(t3), !f2.d || !t3.d)
    return f2.s && t3.s ? f2.d ? t3.s = -t3.s : t3 = new d(t3.d || f2.s !== t3.s ? f2 : NaN) : t3 = new d(NaN), t3;
  if (f2.s != t3.s)
    return t3.s = -t3.s, f2.plus(t3);
  if (h = f2.d, p2 = t3.d, o2 = d.precision, u2 = d.rounding, !h[0] || !p2[0]) {
    if (p2[0])
      t3.s = -t3.s;
    else {
      if (!h[0])
        return new d(u2 === 3 ? -0 : 0);
      t3 = new d(f2);
    }
    return An ? Yn(t3, o2, u2) : t3;
  }
  if (r2 = Dn(t3.e / 7), c2 = Dn(f2.e / 7), h = h.slice(), s2 = c2 - r2) {
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
        h[i2] = Pn - 1;
      --h[i2], h[n2] += Pn;
    }
    h[n2] -= p2[n2];
  }
  for (; h[--a2] === 0; )
    h.pop();
  for (; h[0] === 0; h.shift())
    --r2;
  return h[0] ? (t3.d = h, t3.e = Xn(h, r2), An ? Yn(t3, o2, u2) : t3) : new d(u2 === 3 ? -0 : 0);
}, qn.modulo = qn.mod = function(t3) {
  var e2, r2 = this, n2 = r2.constructor;
  return t3 = new n2(t3), !r2.d || !t3.s || t3.d && !t3.d[0] ? new n2(NaN) : !t3.d || r2.d && !r2.d[0] ? Yn(new n2(r2), n2.precision, n2.rounding) : (An = false, n2.modulo == 9 ? (e2 = Wn(r2, t3.abs(), 0, 3, 1)).s *= t3.s : e2 = Wn(r2, t3, 0, n2.modulo, 1), e2 = e2.times(t3), An = true, r2.minus(e2));
}, qn.naturalExponential = qn.exp = function() {
  return ii(this);
}, qn.naturalLogarithm = qn.ln = function() {
  return si(this);
}, qn.negated = qn.neg = function() {
  var t3 = new this.constructor(this);
  return t3.s = -t3.s, Yn(t3);
}, qn.plus = qn.add = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h, c2, l2 = this, p2 = l2.constructor;
  if (t3 = new p2(t3), !l2.d || !t3.d)
    return l2.s && t3.s ? l2.d || (t3 = new p2(t3.d || l2.s === t3.s ? l2 : NaN)) : t3 = new p2(NaN), t3;
  if (l2.s != t3.s)
    return t3.s = -t3.s, l2.minus(t3);
  if (h = l2.d, c2 = t3.d, o2 = p2.precision, u2 = p2.rounding, !h[0] || !c2[0])
    return c2[0] || (t3 = new p2(l2)), An ? Yn(t3, o2, u2) : t3;
  if (s2 = Dn(l2.e / 7), n2 = Dn(t3.e / 7), h = h.slice(), i2 = s2 - n2) {
    for (i2 < 0 ? (r2 = h, i2 = -i2, a2 = c2.length) : (r2 = c2, n2 = s2, a2 = h.length), i2 > (a2 = (s2 = Math.ceil(o2 / 7)) > a2 ? s2 + 1 : a2 + 1) && (i2 = a2, r2.length = 1), r2.reverse(); i2--; )
      r2.push(0);
    r2.reverse();
  }
  for ((a2 = h.length) - (i2 = c2.length) < 0 && (i2 = a2, r2 = c2, c2 = h, h = r2), e2 = 0; i2; )
    e2 = (h[--i2] = h[i2] + c2[i2] + e2) / Pn | 0, h[i2] %= Pn;
  for (e2 && (h.unshift(e2), ++n2), a2 = h.length; h[--a2] == 0; )
    h.pop();
  return t3.d = h, t3.e = Xn(h, n2), An ? Yn(t3, o2, u2) : t3;
}, qn.precision = qn.sd = function(t3) {
  var e2, r2 = this;
  if (t3 !== void 0 && t3 !== !!t3 && t3 !== 1 && t3 !== 0)
    throw Error(Rn + t3);
  return r2.d ? (e2 = Kn(r2.d), t3 && r2.e + 1 > e2 && (e2 = r2.e + 1)) : e2 = NaN, e2;
}, qn.round = function() {
  var t3 = this, e2 = t3.constructor;
  return Yn(new e2(t3), t3.e + 1, e2.rounding);
}, qn.sine = qn.sin = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.isFinite() ? r2.isZero() ? new n2(r2) : (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + Math.max(r2.e, r2.sd()) + 7, n2.rounding = 1, r2 = function(t4, e3) {
    var r3, n3 = e3.d.length;
    if (n3 < 3)
      return ui(t4, 2, e3, e3);
    r3 = (r3 = 1.4 * Math.sqrt(n3)) > 16 ? 16 : 0 | r3, e3 = e3.times(1 / hi(5, r3)), e3 = ui(t4, 2, e3, e3);
    for (var i2, s2 = new t4(5), a2 = new t4(16), o2 = new t4(20); r3--; )
      i2 = e3.times(e3), e3 = e3.times(s2.plus(i2.times(a2.times(i2).minus(o2))));
    return e3;
  }(n2, ci(n2, r2)), n2.precision = t3, n2.rounding = e2, Yn(Nn > 2 ? r2.neg() : r2, t3, e2, true)) : new n2(NaN);
}, qn.squareRoot = qn.sqrt = function() {
  var t3, e2, r2, n2, i2, s2, a2 = this, o2 = a2.d, u2 = a2.e, h = a2.s, c2 = a2.constructor;
  if (h !== 1 || !o2 || !o2[0])
    return new c2(!h || h < 0 && (!o2 || o2[0]) ? NaN : o2 ? a2 : 1 / 0);
  for (An = false, (h = Math.sqrt(+a2)) == 0 || h == 1 / 0 ? (((e2 = Hn(o2)).length + u2) % 2 == 0 && (e2 += "0"), h = Math.sqrt(e2), u2 = Dn((u2 + 1) / 2) - (u2 < 0 || u2 % 2), n2 = new c2(e2 = h == 1 / 0 ? "5e" + u2 : (e2 = h.toExponential()).slice(0, e2.indexOf("e") + 1) + u2)) : n2 = new c2(h.toString()), r2 = (u2 = c2.precision) + 3; ; )
    if (n2 = (s2 = n2).plus(Wn(a2, s2, r2 + 2, 1)).times(0.5), Hn(s2.d).slice(0, r2) === (e2 = Hn(n2.d)).slice(0, r2)) {
      if ((e2 = e2.slice(r2 - 3, r2 + 1)) != "9999" && (i2 || e2 != "4999")) {
        +e2 && (+e2.slice(1) || e2.charAt(0) != "5") || (Yn(n2, u2 + 1, 1), t3 = !n2.times(n2).eq(a2));
        break;
      }
      if (!i2 && (Yn(s2, u2 + 1, 0), s2.times(s2).eq(a2))) {
        n2 = s2;
        break;
      }
      r2 += 4, i2 = 1;
    }
  return An = true, Yn(n2, u2, c2.rounding, t3);
}, qn.tangent = qn.tan = function() {
  var t3, e2, r2 = this, n2 = r2.constructor;
  return r2.isFinite() ? r2.isZero() ? new n2(r2) : (t3 = n2.precision, e2 = n2.rounding, n2.precision = t3 + 10, n2.rounding = 1, (r2 = r2.sin()).s = 1, r2 = Wn(r2, new n2(1).minus(r2.times(r2)).sqrt(), t3 + 10, 0), n2.precision = t3, n2.rounding = e2, Yn(Nn == 2 || Nn == 4 ? r2.neg() : r2, t3, e2, true)) : new n2(NaN);
}, qn.times = qn.mul = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h, c2 = this, l2 = c2.constructor, p2 = c2.d, f2 = (t3 = new l2(t3)).d;
  if (t3.s *= c2.s, !(p2 && p2[0] && f2 && f2[0]))
    return new l2(!t3.s || p2 && !p2[0] && !f2 || f2 && !f2[0] && !p2 ? NaN : p2 && f2 ? 0 * t3.s : t3.s / 0);
  for (r2 = Dn(c2.e / 7) + Dn(t3.e / 7), (u2 = p2.length) < (h = f2.length) && (s2 = p2, p2 = f2, f2 = s2, a2 = u2, u2 = h, h = a2), s2 = [], n2 = a2 = u2 + h; n2--; )
    s2.push(0);
  for (n2 = h; --n2 >= 0; ) {
    for (e2 = 0, i2 = u2 + n2; i2 > n2; )
      o2 = s2[i2] + f2[n2] * p2[i2 - n2 - 1] + e2, s2[i2--] = o2 % Pn | 0, e2 = o2 / Pn | 0;
    s2[i2] = (s2[i2] + e2) % Pn | 0;
  }
  for (; !s2[--a2]; )
    s2.pop();
  return e2 ? ++r2 : s2.shift(), t3.d = s2, t3.e = Xn(s2, r2), An ? Yn(t3, l2.precision, l2.rounding) : t3;
}, qn.toBinary = function(t3, e2) {
  return li(this, 2, t3, e2);
}, qn.toDecimalPlaces = qn.toDP = function(t3, e2) {
  var r2 = this, n2 = r2.constructor;
  return r2 = new n2(r2), t3 === void 0 ? r2 : (Vn(t3, 0, 1e9), e2 === void 0 ? e2 = n2.rounding : Vn(e2, 0, 8), Yn(r2, t3 + r2.e + 1, e2));
}, qn.toExponential = function(t3, e2) {
  var r2, n2 = this, i2 = n2.constructor;
  return t3 === void 0 ? r2 = Zn(n2, true) : (Vn(t3, 0, 1e9), e2 === void 0 ? e2 = i2.rounding : Vn(e2, 0, 8), r2 = Zn(n2 = Yn(new i2(n2), t3 + 1, e2), true, t3 + 1)), n2.isNeg() && !n2.isZero() ? "-" + r2 : r2;
}, qn.toFixed = function(t3, e2) {
  var r2, n2, i2 = this, s2 = i2.constructor;
  return t3 === void 0 ? r2 = Zn(i2) : (Vn(t3, 0, 1e9), e2 === void 0 ? e2 = s2.rounding : Vn(e2, 0, 8), r2 = Zn(n2 = Yn(new s2(i2), t3 + i2.e + 1, e2), false, t3 + n2.e + 1)), i2.isNeg() && !i2.isZero() ? "-" + r2 : r2;
}, qn.toFraction = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = this, d = f2.d, m2 = f2.constructor;
  if (!d)
    return new m2(f2);
  if (h = r2 = new m2(1), n2 = u2 = new m2(0), a2 = (s2 = (e2 = new m2(n2)).e = Kn(d) - f2.e - 1) % 7, e2.d[0] = kn(10, a2 < 0 ? 7 + a2 : a2), t3 == null)
    t3 = s2 > 0 ? e2 : h;
  else {
    if (!(o2 = new m2(t3)).isInt() || o2.lt(h))
      throw Error(Rn + o2);
    t3 = o2.gt(e2) ? s2 > 0 ? e2 : h : o2;
  }
  for (An = false, o2 = new m2(Hn(d)), c2 = m2.precision, m2.precision = s2 = 7 * d.length * 2; l2 = Wn(o2, e2, 0, 1, 1), (i2 = r2.plus(l2.times(n2))).cmp(t3) != 1; )
    r2 = n2, n2 = i2, i2 = h, h = u2.plus(l2.times(i2)), u2 = i2, i2 = e2, e2 = o2.minus(l2.times(i2)), o2 = i2;
  return i2 = Wn(t3.minus(r2), n2, 0, 1, 1), u2 = u2.plus(i2.times(h)), r2 = r2.plus(i2.times(n2)), u2.s = h.s = f2.s, p2 = Wn(h, n2, s2, 1).minus(f2).abs().cmp(Wn(u2, r2, s2, 1).minus(f2).abs()) < 1 ? [h, n2] : [u2, r2], m2.precision = c2, An = true, p2;
}, qn.toHexadecimal = qn.toHex = function(t3, e2) {
  return li(this, 16, t3, e2);
}, qn.toNearest = function(t3, e2) {
  var r2 = this, n2 = r2.constructor;
  if (r2 = new n2(r2), t3 == null) {
    if (!r2.d)
      return r2;
    t3 = new n2(1), e2 = n2.rounding;
  } else {
    if (t3 = new n2(t3), e2 === void 0 ? e2 = n2.rounding : Vn(e2, 0, 8), !r2.d)
      return t3.s ? r2 : t3;
    if (!t3.d)
      return t3.s && (t3.s = r2.s), t3;
  }
  return t3.d[0] ? (An = false, r2 = Wn(r2, t3, 0, e2, 1).times(t3), An = true, Yn(r2)) : (t3.s = r2.s, r2 = t3), r2;
}, qn.toNumber = function() {
  return +this;
}, qn.toOctal = function(t3, e2) {
  return li(this, 8, t3, e2);
}, qn.toPower = qn.pow = function(t3) {
  var e2, r2, n2, i2, s2, a2, o2 = this, u2 = o2.constructor, h = +(t3 = new u2(t3));
  if (!(o2.d && t3.d && o2.d[0] && t3.d[0]))
    return new u2(kn(+o2, h));
  if ((o2 = new u2(o2)).eq(1))
    return o2;
  if (n2 = u2.precision, s2 = u2.rounding, t3.eq(1))
    return Yn(o2, n2, s2);
  if ((e2 = Dn(t3.e / 7)) >= t3.d.length - 1 && (r2 = h < 0 ? -h : h) <= 9007199254740991)
    return i2 = ei(u2, o2, r2, n2), t3.s < 0 ? new u2(1).div(i2) : Yn(i2, n2, s2);
  if ((a2 = o2.s) < 0) {
    if (e2 < t3.d.length - 1)
      return new u2(NaN);
    if ((1 & t3.d[e2]) == 0 && (a2 = 1), o2.e == 0 && o2.d[0] == 1 && o2.d.length == 1)
      return o2.s = a2, o2;
  }
  return (e2 = (r2 = kn(+o2, h)) != 0 && isFinite(r2) ? new u2(r2 + "").e : Dn(h * (Math.log("0." + Hn(o2.d)) / Math.LN10 + o2.e + 1))) > u2.maxE + 1 || e2 < u2.minE - 1 ? new u2(e2 > 0 ? a2 / 0 : 0) : (An = false, u2.rounding = o2.s = 1, r2 = Math.min(12, (e2 + "").length), (i2 = ii(t3.times(si(o2, n2 + r2)), n2)).d && $n((i2 = Yn(i2, n2 + 5, 1)).d, n2, s2) && (e2 = n2 + 10, +Hn((i2 = Yn(ii(t3.times(si(o2, e2 + r2)), e2), e2 + 5, 1)).d).slice(n2 + 1, n2 + 15) + 1 == 1e14 && (i2 = Yn(i2, n2 + 1, 0))), i2.s = a2, An = true, u2.rounding = s2, Yn(i2, n2, s2));
}, qn.toPrecision = function(t3, e2) {
  var r2, n2 = this, i2 = n2.constructor;
  return t3 === void 0 ? r2 = Zn(n2, n2.e <= i2.toExpNeg || n2.e >= i2.toExpPos) : (Vn(t3, 1, 1e9), e2 === void 0 ? e2 = i2.rounding : Vn(e2, 0, 8), r2 = Zn(n2 = Yn(new i2(n2), t3, e2), t3 <= n2.e || n2.e <= i2.toExpNeg, t3)), n2.isNeg() && !n2.isZero() ? "-" + r2 : r2;
}, qn.toSignificantDigits = qn.toSD = function(t3, e2) {
  var r2 = this.constructor;
  return t3 === void 0 ? (t3 = r2.precision, e2 = r2.rounding) : (Vn(t3, 1, 1e9), e2 === void 0 ? e2 = r2.rounding : Vn(e2, 0, 8)), Yn(new r2(this), t3, e2);
}, qn.toString = function() {
  var t3 = this, e2 = t3.constructor, r2 = Zn(t3, t3.e <= e2.toExpNeg || t3.e >= e2.toExpPos);
  return t3.isNeg() && !t3.isZero() ? "-" + r2 : r2;
}, qn.truncated = qn.trunc = function() {
  return Yn(new this.constructor(this), this.e + 1, 1);
}, qn.valueOf = qn.toJSON = function() {
  var t3 = this, e2 = t3.constructor, r2 = Zn(t3, t3.e <= e2.toExpNeg || t3.e >= e2.toExpPos);
  return t3.isNeg() ? "-" + r2 : r2;
};
var Wn = function() {
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
    var h, c2, l2, p2, f2, d, m2, y2, g2, v2, x2, w2, b2, _2, M, N, E, S, T, O, z = n2.constructor, C = n2.s == i2.s ? 1 : -1, A = n2.d, R = i2.d;
    if (!(A && A[0] && R && R[0]))
      return new z(n2.s && i2.s && (A ? !R || A[0] != R[0] : R) ? A && A[0] == 0 || !R ? 0 * C : C / 0 : NaN);
    for (u2 ? (f2 = 1, c2 = n2.e - i2.e) : (u2 = Pn, f2 = 7, c2 = Dn(n2.e / f2) - Dn(i2.e / f2)), T = R.length, E = A.length, v2 = (g2 = new z(C)).d = [], l2 = 0; R[l2] == (A[l2] || 0); l2++)
      ;
    if (R[l2] > (A[l2] || 0) && c2--, s2 == null ? (_2 = s2 = z.precision, a2 = z.rounding) : _2 = o2 ? s2 + (n2.e - i2.e) + 1 : s2, _2 < 0)
      v2.push(1), d = true;
    else {
      if (_2 = _2 / f2 + 2 | 0, l2 = 0, T == 1) {
        for (p2 = 0, R = R[0], _2++; (l2 < E || p2) && _2--; l2++)
          M = p2 * u2 + (A[l2] || 0), v2[l2] = M / R | 0, p2 = M % R | 0;
        d = p2 || l2 < E;
      } else {
        for ((p2 = u2 / (R[0] + 1) | 0) > 1 && (R = t3(R, p2, u2), A = t3(A, p2, u2), T = R.length, E = A.length), N = T, w2 = (x2 = A.slice(0, T)).length; w2 < T; )
          x2[w2++] = 0;
        (O = R.slice()).unshift(0), S = R[0], R[1] >= u2 / 2 && ++S;
        do {
          p2 = 0, (h = e2(R, x2, T, w2)) < 0 ? (b2 = x2[0], T != w2 && (b2 = b2 * u2 + (x2[1] || 0)), (p2 = b2 / S | 0) > 1 ? (p2 >= u2 && (p2 = u2 - 1), (h = e2(m2 = t3(R, p2, u2), x2, y2 = m2.length, w2 = x2.length)) == 1 && (p2--, r2(m2, T < y2 ? O : R, y2, u2))) : (p2 == 0 && (h = p2 = 1), m2 = R.slice()), (y2 = m2.length) < w2 && m2.unshift(0), r2(x2, m2, w2, u2), h == -1 && (h = e2(R, x2, T, w2 = x2.length)) < 1 && (p2++, r2(x2, T < w2 ? O : R, w2, u2)), w2 = x2.length) : h === 0 && (p2++, x2 = [0]), v2[l2++] = p2, h && x2[0] ? x2[w2++] = A[N] || 0 : (x2 = [A[N]], w2 = 1);
        } while ((N++ < E || x2[0] !== void 0) && _2--);
        d = x2[0] !== void 0;
      }
      v2[0] || v2.shift();
    }
    if (f2 == 1)
      g2.e = c2, Mn = d;
    else {
      for (l2 = 1, p2 = v2[0]; p2 >= 10; p2 /= 10)
        l2++;
      g2.e = l2 + c2 * f2 - 1, Yn(g2, o2 ? s2 + g2.e + 1 : s2, a2, d);
    }
    return g2;
  };
}();
function Yn(t3, e2, r2, n2) {
  var i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = t3.constructor;
  t:
    if (e2 != null) {
      if (!(l2 = t3.d))
        return t3;
      for (i2 = 1, o2 = l2[0]; o2 >= 10; o2 /= 10)
        i2++;
      if ((s2 = e2 - i2) < 0)
        s2 += 7, a2 = e2, u2 = (c2 = l2[p2 = 0]) / kn(10, i2 - a2 - 1) % 10 | 0;
      else if ((p2 = Math.ceil((s2 + 1) / 7)) >= (o2 = l2.length)) {
        if (!n2)
          break t;
        for (; o2++ <= p2; )
          l2.push(0);
        c2 = u2 = 0, i2 = 1, a2 = (s2 %= 7) - 7 + 1;
      } else {
        for (c2 = o2 = l2[p2], i2 = 1; o2 >= 10; o2 /= 10)
          i2++;
        u2 = (a2 = (s2 %= 7) - 7 + i2) < 0 ? 0 : c2 / kn(10, i2 - a2 - 1) % 10 | 0;
      }
      if (n2 = n2 || e2 < 0 || l2[p2 + 1] !== void 0 || (a2 < 0 ? c2 : c2 % kn(10, i2 - a2 - 1)), h = r2 < 4 ? (u2 || n2) && (r2 == 0 || r2 == (t3.s < 0 ? 3 : 2)) : u2 > 5 || u2 == 5 && (r2 == 4 || n2 || r2 == 6 && (s2 > 0 ? a2 > 0 ? c2 / kn(10, i2 - a2) : 0 : l2[p2 - 1]) % 10 & 1 || r2 == (t3.s < 0 ? 8 : 7)), e2 < 1 || !l2[0])
        return l2.length = 0, h ? (e2 -= t3.e + 1, l2[0] = kn(10, (7 - e2 % 7) % 7), t3.e = -e2 || 0) : l2[0] = t3.e = 0, t3;
      if (s2 == 0 ? (l2.length = p2, o2 = 1, p2--) : (l2.length = p2 + 1, o2 = kn(10, 7 - s2), l2[p2] = a2 > 0 ? (c2 / kn(10, i2 - a2) % kn(10, a2) | 0) * o2 : 0), h)
        for (; ; ) {
          if (p2 == 0) {
            for (s2 = 1, a2 = l2[0]; a2 >= 10; a2 /= 10)
              s2++;
            for (a2 = l2[0] += o2, o2 = 1; a2 >= 10; a2 /= 10)
              o2++;
            s2 != o2 && (t3.e++, l2[0] == Pn && (l2[0] = 1));
            break;
          }
          if (l2[p2] += o2, l2[p2] != Pn)
            break;
          l2[p2--] = 0, o2 = 1;
        }
      for (s2 = l2.length; l2[--s2] === 0; )
        l2.pop();
    }
  return An && (t3.e > f2.maxE ? (t3.d = null, t3.e = NaN) : t3.e < f2.minE && (t3.e = 0, t3.d = [0])), t3;
}
function Zn(t3, e2, r2) {
  if (!t3.isFinite())
    return ai(t3);
  var n2, i2 = t3.e, s2 = Hn(t3.d), a2 = s2.length;
  return e2 ? (r2 && (n2 = r2 - a2) > 0 ? s2 = s2.charAt(0) + "." + s2.slice(1) + ti(n2) : a2 > 1 && (s2 = s2.charAt(0) + "." + s2.slice(1)), s2 = s2 + (t3.e < 0 ? "e" : "e+") + t3.e) : i2 < 0 ? (s2 = "0." + ti(-i2 - 1) + s2, r2 && (n2 = r2 - a2) > 0 && (s2 += ti(n2))) : i2 >= a2 ? (s2 += ti(i2 + 1 - a2), r2 && (n2 = r2 - i2 - 1) > 0 && (s2 = s2 + "." + ti(n2))) : ((n2 = i2 + 1) < a2 && (s2 = s2.slice(0, n2) + "." + s2.slice(n2)), r2 && (n2 = r2 - a2) > 0 && (i2 + 1 === a2 && (s2 += "."), s2 += ti(n2))), s2;
}
function Xn(t3, e2) {
  var r2 = t3[0];
  for (e2 *= 7; r2 >= 10; r2 /= 10)
    e2++;
  return e2;
}
function Qn(t3, e2, r2) {
  if (e2 > Un)
    throw An = true, r2 && (t3.precision = r2), Error("[DecimalError] Precision limit exceeded");
  return Yn(new t3(On), e2, 1, true);
}
function Jn(t3, e2, r2) {
  if (e2 > jn)
    throw Error("[DecimalError] Precision limit exceeded");
  return Yn(new t3(zn), e2, r2, true);
}
function Kn(t3) {
  var e2 = t3.length - 1, r2 = 7 * e2 + 1;
  if (e2 = t3[e2]) {
    for (; e2 % 10 == 0; e2 /= 10)
      r2--;
    for (e2 = t3[0]; e2 >= 10; e2 /= 10)
      r2++;
  }
  return r2;
}
function ti(t3) {
  for (var e2 = ""; t3--; )
    e2 += "0";
  return e2;
}
function ei(t3, e2, r2, n2) {
  var i2, s2 = new t3(1), a2 = Math.ceil(n2 / 7 + 4);
  for (An = false; ; ) {
    if (r2 % 2 && pi((s2 = s2.times(e2)).d, a2) && (i2 = true), (r2 = Dn(r2 / 2)) === 0) {
      r2 = s2.d.length - 1, i2 && s2.d[r2] === 0 && ++s2.d[r2];
      break;
    }
    pi((e2 = e2.times(e2)).d, a2);
  }
  return An = true, s2;
}
function ri(t3) {
  return 1 & t3.d[t3.d.length - 1];
}
function ni(t3, e2, r2) {
  for (var n2, i2 = new t3(e2[0]), s2 = 0; ++s2 < e2.length; ) {
    if (!(n2 = new t3(e2[s2])).s) {
      i2 = n2;
      break;
    }
    i2[r2](n2) && (i2 = n2);
  }
  return i2;
}
function ii(t3, e2) {
  var r2, n2, i2, s2, a2, o2, u2, h = 0, c2 = 0, l2 = 0, p2 = t3.constructor, f2 = p2.rounding, d = p2.precision;
  if (!t3.d || !t3.d[0] || t3.e > 17)
    return new p2(t3.d ? t3.d[0] ? t3.s < 0 ? 0 : 1 / 0 : 1 : t3.s ? t3.s < 0 ? 0 : t3 : NaN);
  for (e2 == null ? (An = false, u2 = d) : u2 = e2, o2 = new p2(0.03125); t3.e > -2; )
    t3 = t3.times(o2), l2 += 5;
  for (u2 += n2 = Math.log(kn(2, l2)) / Math.LN10 * 2 + 5 | 0, r2 = s2 = a2 = new p2(1), p2.precision = u2; ; ) {
    if (s2 = Yn(s2.times(t3), u2, 1), r2 = r2.times(++c2), Hn((o2 = a2.plus(Wn(s2, r2, u2, 1))).d).slice(0, u2) === Hn(a2.d).slice(0, u2)) {
      for (i2 = l2; i2--; )
        a2 = Yn(a2.times(a2), u2, 1);
      if (e2 != null)
        return p2.precision = d, a2;
      if (!(h < 3 && $n(a2.d, u2 - n2, f2, h)))
        return Yn(a2, p2.precision = d, f2, An = true);
      p2.precision = u2 += 10, r2 = s2 = o2 = new p2(1), c2 = 0, h++;
    }
    a2 = o2;
  }
}
function si(t3, e2) {
  var r2, n2, i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = 1, d = t3, m2 = d.d, y2 = d.constructor, g2 = y2.rounding, v2 = y2.precision;
  if (d.s < 0 || !m2 || !m2[0] || !d.e && m2[0] == 1 && m2.length == 1)
    return new y2(m2 && !m2[0] ? -1 / 0 : d.s != 1 ? NaN : m2 ? 0 : d);
  if (e2 == null ? (An = false, c2 = v2) : c2 = e2, y2.precision = c2 += 10, n2 = (r2 = Hn(m2)).charAt(0), !(Math.abs(s2 = d.e) < 15e14))
    return h = Qn(y2, c2 + 2, v2).times(s2 + ""), d = si(new y2(n2 + "." + r2.slice(1)), c2 - 10).plus(h), y2.precision = v2, e2 == null ? Yn(d, v2, g2, An = true) : d;
  for (; n2 < 7 && n2 != 1 || n2 == 1 && r2.charAt(1) > 3; )
    n2 = (r2 = Hn((d = d.times(t3)).d)).charAt(0), f2++;
  for (s2 = d.e, n2 > 1 ? (d = new y2("0." + r2), s2++) : d = new y2(n2 + "." + r2.slice(1)), l2 = d, u2 = a2 = d = Wn(d.minus(1), d.plus(1), c2, 1), p2 = Yn(d.times(d), c2, 1), i2 = 3; ; ) {
    if (a2 = Yn(a2.times(p2), c2, 1), Hn((h = u2.plus(Wn(a2, new y2(i2), c2, 1))).d).slice(0, c2) === Hn(u2.d).slice(0, c2)) {
      if (u2 = u2.times(2), s2 !== 0 && (u2 = u2.plus(Qn(y2, c2 + 2, v2).times(s2 + ""))), u2 = Wn(u2, new y2(f2), c2, 1), e2 != null)
        return y2.precision = v2, u2;
      if (!$n(u2.d, c2 - 10, g2, o2))
        return Yn(u2, y2.precision = v2, g2, An = true);
      y2.precision = c2 += 10, h = a2 = d = Wn(l2.minus(1), l2.plus(1), c2, 1), p2 = Yn(d.times(d), c2, 1), i2 = o2 = 1;
    }
    u2 = h, i2 += 2;
  }
}
function ai(t3) {
  return String(t3.s * t3.s / 0);
}
function oi(t3, e2) {
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
    t3.d.push(+e2), An && (t3.e > t3.constructor.maxE ? (t3.d = null, t3.e = NaN) : t3.e < t3.constructor.minE && (t3.e = 0, t3.d = [0]));
  } else
    t3.e = 0, t3.d = [0];
  return t3;
}
function ui(t3, e2, r2, n2, i2) {
  var s2, a2, o2, u2, h = t3.precision, c2 = Math.ceil(h / 7);
  for (An = false, u2 = r2.times(r2), o2 = new t3(n2); ; ) {
    if (a2 = Wn(o2.times(u2), new t3(e2++ * e2++), h, 1), o2 = i2 ? n2.plus(a2) : n2.minus(a2), n2 = Wn(a2.times(u2), new t3(e2++ * e2++), h, 1), (a2 = o2.plus(n2)).d[c2] !== void 0) {
      for (s2 = c2; a2.d[s2] === o2.d[s2] && s2--; )
        ;
      if (s2 == -1)
        break;
    }
    s2 = o2, o2 = n2, n2 = a2, a2 = s2;
  }
  return An = true, a2.d.length = c2 + 1, a2;
}
function hi(t3, e2) {
  for (var r2 = t3; --e2; )
    r2 *= t3;
  return r2;
}
function ci(t3, e2) {
  var r2, n2 = e2.s < 0, i2 = Jn(t3, t3.precision, 1), s2 = i2.times(0.5);
  if ((e2 = e2.abs()).lte(s2))
    return Nn = n2 ? 4 : 1, e2;
  if ((r2 = e2.divToInt(i2)).isZero())
    Nn = n2 ? 3 : 2;
  else {
    if ((e2 = e2.minus(r2.times(i2))).lte(s2))
      return Nn = ri(r2) ? n2 ? 2 : 3 : n2 ? 4 : 1, e2;
    Nn = ri(r2) ? n2 ? 1 : 4 : n2 ? 3 : 2;
  }
  return e2.minus(i2).abs();
}
function li(t3, e2, r2, n2) {
  var i2, s2, a2, o2, u2, h, c2, l2, p2, f2 = t3.constructor, d = r2 !== void 0;
  if (d ? (Vn(r2, 1, 1e9), n2 === void 0 ? n2 = f2.rounding : Vn(n2, 0, 8)) : (r2 = f2.precision, n2 = f2.rounding), t3.isFinite()) {
    for (d ? (i2 = 2, e2 == 16 ? r2 = 4 * r2 - 3 : e2 == 8 && (r2 = 3 * r2 - 2)) : i2 = e2, (a2 = (c2 = Zn(t3)).indexOf(".")) >= 0 && (c2 = c2.replace(".", ""), (p2 = new f2(1)).e = c2.length - a2, p2.d = Gn(Zn(p2), 10, i2), p2.e = p2.d.length), s2 = u2 = (l2 = Gn(c2, 10, i2)).length; l2[--u2] == 0; )
      l2.pop();
    if (l2[0]) {
      if (a2 < 0 ? s2-- : ((t3 = new f2(t3)).d = l2, t3.e = s2, l2 = (t3 = Wn(t3, p2, r2, n2, 0, i2)).d, s2 = t3.e, h = Mn), a2 = l2[r2], o2 = i2 / 2, h = h || l2[r2 + 1] !== void 0, h = n2 < 4 ? (a2 !== void 0 || h) && (n2 === 0 || n2 === (t3.s < 0 ? 3 : 2)) : a2 > o2 || a2 === o2 && (n2 === 4 || h || n2 === 6 && 1 & l2[r2 - 1] || n2 === (t3.s < 0 ? 8 : 7)), l2.length = r2, h)
        for (; ++l2[--r2] > i2 - 1; )
          l2[r2] = 0, r2 || (++s2, l2.unshift(1));
      for (u2 = l2.length; !l2[u2 - 1]; --u2)
        ;
      for (a2 = 0, c2 = ""; a2 < u2; a2++)
        c2 += Tn.charAt(l2[a2]);
      if (d) {
        if (u2 > 1)
          if (e2 == 16 || e2 == 8) {
            for (a2 = e2 == 16 ? 4 : 3, --u2; u2 % a2; u2++)
              c2 += "0";
            for (u2 = (l2 = Gn(c2, i2, e2)).length; !l2[u2 - 1]; --u2)
              ;
            for (a2 = 1, c2 = "1."; a2 < u2; a2++)
              c2 += Tn.charAt(l2[a2]);
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
      c2 = d ? "0p+0" : "0";
    c2 = (e2 == 16 ? "0x" : e2 == 2 ? "0b" : e2 == 8 ? "0o" : "") + c2;
  } else
    c2 = ai(t3);
  return t3.s < 0 ? "-" + c2 : c2;
}
function pi(t3, e2) {
  if (t3.length > e2)
    return t3.length = e2, true;
}
function fi(t3) {
  return new this(t3).abs();
}
function di(t3) {
  return new this(t3).acos();
}
function mi(t3) {
  return new this(t3).acosh();
}
function yi(t3, e2) {
  return new this(t3).plus(e2);
}
function gi(t3) {
  return new this(t3).asin();
}
function vi(t3) {
  return new this(t3).asinh();
}
function xi(t3) {
  return new this(t3).atan();
}
function wi(t3) {
  return new this(t3).atanh();
}
function bi(t3, e2) {
  t3 = new this(t3), e2 = new this(e2);
  var r2, n2 = this.precision, i2 = this.rounding, s2 = n2 + 4;
  return t3.s && e2.s ? t3.d || e2.d ? !e2.d || t3.isZero() ? (r2 = e2.s < 0 ? Jn(this, n2, i2) : new this(0)).s = t3.s : !t3.d || e2.isZero() ? (r2 = Jn(this, s2, 1).times(0.5)).s = t3.s : e2.s < 0 ? (this.precision = s2, this.rounding = 1, r2 = this.atan(Wn(t3, e2, s2, 1)), e2 = Jn(this, s2, 1), this.precision = n2, this.rounding = i2, r2 = t3.s < 0 ? r2.minus(e2) : r2.plus(e2)) : r2 = this.atan(Wn(t3, e2, s2, 1)) : (r2 = Jn(this, s2, 1).times(e2.s > 0 ? 0.25 : 0.75)).s = t3.s : r2 = new this(NaN), r2;
}
function _i(t3) {
  return new this(t3).cbrt();
}
function Mi(t3) {
  return Yn(t3 = new this(t3), t3.e + 1, 2);
}
function Ni(t3) {
  if (!t3 || typeof t3 != "object")
    throw Error("[DecimalError] Object expected");
  var e2, r2, n2, i2 = t3.defaults === true, s2 = ["precision", 1, 1e9, "rounding", 0, 8, "toExpNeg", -Sn, 0, "toExpPos", 0, Sn, "maxE", 0, Sn, "minE", -Sn, 0, "modulo", 0, 9];
  for (e2 = 0; e2 < s2.length; e2 += 3)
    if (r2 = s2[e2], i2 && (this[r2] = Cn[r2]), (n2 = t3[r2]) !== void 0) {
      if (!(Dn(n2) === n2 && n2 >= s2[e2 + 1] && n2 <= s2[e2 + 2]))
        throw Error(Rn + r2 + ": " + n2);
      this[r2] = n2;
    }
  if (r2 = "crypto", i2 && (this[r2] = Cn[r2]), (n2 = t3[r2]) !== void 0) {
    if (n2 !== true && n2 !== false && n2 !== 0 && n2 !== 1)
      throw Error(Rn + r2 + ": " + n2);
    if (n2) {
      if (typeof crypto == "undefined" || !crypto || !crypto.getRandomValues && !crypto.randomBytes)
        throw Error("[DecimalError] crypto unavailable");
      this[r2] = true;
    } else
      this[r2] = false;
  }
  return this;
}
function Ei(t3) {
  return new this(t3).cos();
}
function Si(t3) {
  return new this(t3).cosh();
}
function Ti(t3, e2) {
  return new this(t3).div(e2);
}
function Oi(t3) {
  return new this(t3).exp();
}
function zi(t3) {
  return Yn(t3 = new this(t3), t3.e + 1, 3);
}
function Ci() {
  var t3, e2, r2 = new this(0);
  for (An = false, t3 = 0; t3 < arguments.length; )
    if ((e2 = new this(arguments[t3++])).d)
      r2.d && (r2 = r2.plus(e2.times(e2)));
    else {
      if (e2.s)
        return An = true, new this(1 / 0);
      r2 = e2;
    }
  return An = true, r2.sqrt();
}
function Ai(t3) {
  return t3 instanceof Qi || t3 && t3.name === "[object Decimal]" || false;
}
function Ri(t3) {
  return new this(t3).ln();
}
function Di(t3, e2) {
  return new this(t3).log(e2);
}
function ki(t3) {
  return new this(t3).log(2);
}
function Ii(t3) {
  return new this(t3).log(10);
}
function Li() {
  return ni(this, arguments, "lt");
}
function Bi() {
  return ni(this, arguments, "gt");
}
function Fi(t3, e2) {
  return new this(t3).mod(e2);
}
function Pi(t3, e2) {
  return new this(t3).mul(e2);
}
function Ui(t3, e2) {
  return new this(t3).pow(e2);
}
function ji(t3) {
  var e2, r2, n2, i2, s2 = 0, a2 = new this(1), o2 = [];
  if (t3 === void 0 ? t3 = this.precision : Vn(t3, 1, 1e9), n2 = Math.ceil(t3 / 7), this.crypto)
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
  for (t3 %= 7, (n2 = o2[--s2]) && t3 && (i2 = kn(10, 7 - t3), o2[s2] = (n2 / i2 | 0) * i2); o2[s2] === 0; s2--)
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
function qi(t3) {
  return Yn(t3 = new this(t3), t3.e + 1, this.rounding);
}
function Hi(t3) {
  return (t3 = new this(t3)).d ? t3.d[0] ? t3.s : 0 * t3.s : t3.s || NaN;
}
function Vi(t3) {
  return new this(t3).sin();
}
function $i(t3) {
  return new this(t3).sinh();
}
function Gi(t3) {
  return new this(t3).sqrt();
}
function Wi(t3, e2) {
  return new this(t3).sub(e2);
}
function Yi(t3) {
  return new this(t3).tan();
}
function Zi(t3) {
  return new this(t3).tanh();
}
function Xi(t3) {
  return Yn(t3 = new this(t3), t3.e + 1, 1);
}
qn[Symbol.for("nodejs.util.inspect.custom")] = qn.toString, qn[Symbol.toStringTag] = "Decimal";
var Qi = function t2(e2) {
  var r2, n2, i2;
  function s2(t3) {
    var e3, r3, n3, i3 = this;
    if (!(i3 instanceof s2))
      return new s2(t3);
    if (i3.constructor = s2, t3 instanceof s2)
      return i3.s = t3.s, void (An ? !t3.d || t3.e > s2.maxE ? (i3.e = NaN, i3.d = null) : t3.e < s2.minE ? (i3.e = 0, i3.d = [0]) : (i3.e = t3.e, i3.d = t3.d.slice()) : (i3.e = t3.e, i3.d = t3.d ? t3.d.slice() : t3.d));
    if ((n3 = typeof t3) === "number") {
      if (t3 === 0)
        return i3.s = 1 / t3 < 0 ? -1 : 1, i3.e = 0, void (i3.d = [0]);
      if (t3 < 0 ? (t3 = -t3, i3.s = -1) : i3.s = 1, t3 === ~~t3 && t3 < 1e7) {
        for (e3 = 0, r3 = t3; r3 >= 10; r3 /= 10)
          e3++;
        return void (An ? e3 > s2.maxE ? (i3.e = NaN, i3.d = null) : e3 < s2.minE ? (i3.e = 0, i3.d = [0]) : (i3.e = e3, i3.d = [t3]) : (i3.e = e3, i3.d = [t3]));
      }
      return 0 * t3 != 0 ? (t3 || (i3.s = NaN), i3.e = NaN, void (i3.d = null)) : oi(i3, t3.toString());
    }
    if (n3 !== "string")
      throw Error(Rn + t3);
    return (r3 = t3.charCodeAt(0)) === 45 ? (t3 = t3.slice(1), i3.s = -1) : (r3 === 43 && (t3 = t3.slice(1)), i3.s = 1), Fn.test(t3) ? oi(i3, t3) : function(t4, e4) {
      var r4, n4, i4, s3, a2, o2, u2, h, c2;
      if (e4 === "Infinity" || e4 === "NaN")
        return +e4 || (t4.s = NaN), t4.e = NaN, t4.d = null, t4;
      if (Ln.test(e4))
        r4 = 16, e4 = e4.toLowerCase();
      else if (In.test(e4))
        r4 = 2;
      else {
        if (!Bn.test(e4))
          throw Error(Rn + e4);
        r4 = 8;
      }
      for ((s3 = e4.search(/p/i)) > 0 ? (u2 = +e4.slice(s3 + 1), e4 = e4.substring(2, s3)) : e4 = e4.slice(2), a2 = (s3 = e4.indexOf(".")) >= 0, n4 = t4.constructor, a2 && (s3 = (o2 = (e4 = e4.replace(".", "")).length) - s3, i4 = ei(n4, new n4(r4), s3, 2 * s3)), s3 = c2 = (h = Gn(e4, r4, Pn)).length - 1; h[s3] === 0; --s3)
        h.pop();
      return s3 < 0 ? new n4(0 * t4.s) : (t4.e = Xn(h, c2), t4.d = h, An = false, a2 && (t4 = Wn(t4, i4, 4 * o2)), u2 && (t4 = t4.times(Math.abs(u2) < 54 ? kn(2, u2) : Qi.pow(2, u2))), An = true, t4);
    }(i3, t3);
  }
  if (s2.prototype = qn, s2.ROUND_UP = 0, s2.ROUND_DOWN = 1, s2.ROUND_CEIL = 2, s2.ROUND_FLOOR = 3, s2.ROUND_HALF_UP = 4, s2.ROUND_HALF_DOWN = 5, s2.ROUND_HALF_EVEN = 6, s2.ROUND_HALF_CEIL = 7, s2.ROUND_HALF_FLOOR = 8, s2.EUCLID = 9, s2.config = s2.set = Ni, s2.clone = t2, s2.isDecimal = Ai, s2.abs = fi, s2.acos = di, s2.acosh = mi, s2.add = yi, s2.asin = gi, s2.asinh = vi, s2.atan = xi, s2.atanh = wi, s2.atan2 = bi, s2.cbrt = _i, s2.ceil = Mi, s2.cos = Ei, s2.cosh = Si, s2.div = Ti, s2.exp = Oi, s2.floor = zi, s2.hypot = Ci, s2.ln = Ri, s2.log = Di, s2.log10 = Ii, s2.log2 = ki, s2.max = Li, s2.min = Bi, s2.mod = Fi, s2.mul = Pi, s2.pow = Ui, s2.random = ji, s2.round = qi, s2.sign = Hi, s2.sin = Vi, s2.sinh = $i, s2.sqrt = Gi, s2.sub = Wi, s2.tan = Yi, s2.tanh = Zi, s2.trunc = Xi, e2 === void 0 && (e2 = {}), e2 && e2.defaults !== true)
    for (i2 = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r2 = 0; r2 < i2.length; )
      e2.hasOwnProperty(n2 = i2[r2++]) || (e2[n2] = this[n2]);
  return s2.config(e2), s2;
}(Cn);
On = new Qi(On), zn = new Qi(zn);
var Ji, Ki = mn("BigNumber", ["?on", "config"], (t3) => {
  var {on: e2, config: r2} = t3, n2 = Qi.clone({precision: r2.precision, modulo: 9});
  return n2.prototype.type = "BigNumber", n2.prototype.isBigNumber = true, n2.prototype.toJSON = function() {
    return {mathjs: "BigNumber", value: this.toString()};
  }, n2.fromJSON = function(t4) {
    return new n2(t4.value);
  }, e2 && e2("config", function(t4, e3) {
    t4.precision !== e3.precision && n2.config({precision: t4.precision});
  }), n2;
}, {isClass: true}), ts = {exports: {}};
/**
 * @license Complex.js v2.0.13 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
Ji = ts, function(t3) {
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
  }}, s2.ZERO = new s2(0, 0), s2.ONE = new s2(1, 0), s2.I = new s2(0, 1), s2.PI = new s2(Math.PI, 0), s2.E = new s2(Math.E, 0), s2.INFINITY = new s2(1 / 0, 1 / 0), s2.NAN = new s2(NaN, NaN), s2.EPSILON = 1e-15, Object.defineProperty(s2, "__esModule", {value: true}), s2.default = s2, s2.Complex = s2, Ji.exports = s2;
}();
var es = Rr(ts.exports), rs = mn("Complex", [], () => (es.prototype.type = "Complex", es.prototype.isComplex = true, es.prototype.toJSON = function() {
  return {mathjs: "Complex", re: this.re, im: this.im};
}, es.prototype.toPolar = function() {
  return {r: this.abs(), phi: this.arg()};
}, es.prototype.format = function(t3) {
  var e2 = this.im, r2 = this.re, n2 = Br(this.re, t3), i2 = Br(this.im, t3), s2 = Re(t3) ? t3 : t3 ? t3.precision : null;
  if (s2 !== null) {
    var a2 = Math.pow(10, -s2);
    Math.abs(r2 / e2) < a2 && (r2 = 0), Math.abs(e2 / r2) < a2 && (e2 = 0);
  }
  return e2 === 0 ? n2 : r2 === 0 ? e2 === 1 ? "i" : e2 === -1 ? "-i" : i2 + "i" : e2 < 0 ? e2 === -1 ? n2 + " - i" : n2 + " - " + i2.substring(1) + "i" : e2 === 1 ? n2 + " + i" : n2 + " + " + i2 + "i";
}, es.fromPolar = function(t3) {
  switch (arguments.length) {
    case 1:
      var e2 = arguments[0];
      if (typeof e2 == "object")
        return es(e2);
      throw new TypeError("Input has to be an object with r and phi keys.");
    case 2:
      var r2 = arguments[0], n2 = arguments[1];
      if (Re(r2)) {
        if (Le(n2) && n2.hasBase("ANGLE") && (n2 = n2.toNumber("rad")), Re(n2))
          return new es({r: r2, phi: n2});
        throw new TypeError("Phi is not a number nor an angle unit.");
      }
      throw new TypeError("Radius r is not a number.");
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, es.prototype.valueOf = es.prototype.toString, es.fromJSON = function(t3) {
  return new es(t3);
}, es.compare = function(t3, e2) {
  return t3.re > e2.re ? 1 : t3.re < e2.re ? -1 : t3.im > e2.im ? 1 : t3.im < e2.im ? -1 : 0;
}, es), {isClass: true}), ns = {exports: {}};
/**
 * @license Fraction.js v4.1.1 23/05/2021
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
      var n3, s3 = 0, u3 = 1, h2 = 1, c3 = 0, l3 = 0, p2 = 0, f2 = 1, d = 1, m2 = 0, y2 = 1, g2 = 1, v2 = 1, x2 = 1e7;
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
              for (t4 >= 1 && (t4 /= d = Math.pow(10, Math.floor(1 + Math.log(t4) / Math.LN10))); y2 <= x2 && v2 <= x2; ) {
                if (t4 === (n3 = (m2 + g2) / (y2 + v2))) {
                  y2 + v2 <= x2 ? (s3 = m2 + g2, u3 = y2 + v2) : v2 > y2 ? (s3 = g2, u3 = v2) : (s3 = m2, u3 = y2);
                  break;
                }
                t4 > n3 ? (m2 += g2, y2 += v2) : (g2 += m2, v2 += y2), y2 > x2 ? (s3 = g2, u3 = v2) : (s3 = m2, u3 = y2);
              }
              s3 *= d;
            } else
              (isNaN(t4) || isNaN(e4)) && (u3 = s3 = NaN);
            break;
          case "string":
            if ((y2 = t4.match(/\d+|./g)) === null && o2(), y2[m2] === "-" ? (h2 = -1, m2++) : y2[m2] === "+" && m2++, y2.length === m2 + 1 ? l3 = a2(y2[m2++], h2) : y2[m2 + 1] === "." || y2[m2] === "." ? (y2[m2] !== "." && (c3 = a2(y2[m2++], h2)), (++m2 + 1 === y2.length || y2[m2 + 1] === "(" && y2[m2 + 3] === ")" || y2[m2 + 1] === "'" && y2[m2 + 3] === "'") && (l3 = a2(y2[m2], h2), f2 = Math.pow(10, y2[m2].length), m2++), (y2[m2] === "(" && y2[m2 + 2] === ")" || y2[m2] === "'" && y2[m2 + 2] === "'") && (p2 = a2(y2[m2 + 1], h2), d = Math.pow(10, y2[m2 + 1].length) - 1, m2 += 3)) : y2[m2 + 1] === "/" || y2[m2 + 1] === ":" ? (l3 = a2(y2[m2], h2), f2 = a2(y2[m2 + 2], 1), m2 += 3) : y2[m2 + 3] === "/" && y2[m2 + 1] === " " && (c3 = a2(y2[m2], h2), l3 = a2(y2[m2 + 2], h2), f2 = a2(y2[m2 + 4], 1), m2 += 5), y2.length <= m2) {
              h2 = s3 = p2 + (u3 = f2 * d) * c3 + d * l3;
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
      var n3 = u2(this.n), i3 = u2(this.d), s3 = 1, a3 = 1;
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
}(ns);
var is = Rr(ns.exports), ss = mn("Fraction", [], () => (is.prototype.type = "Fraction", is.prototype.isFraction = true, is.prototype.toJSON = function() {
  return {mathjs: "Fraction", n: this.s * this.n, d: this.d};
}, is.fromJSON = function(t3) {
  return new is(t3);
}, is), {isClass: true}), as = mn("Range", [], () => {
  function t3(e2, r2, n2) {
    if (!(this instanceof t3))
      throw new SyntaxError("Constructor must be called with the new operator");
    var i2 = e2 != null, s2 = r2 != null, a2 = n2 != null;
    if (i2) {
      if (De(e2))
        e2 = e2.toNumber();
      else if (typeof e2 != "number")
        throw new TypeError("Parameter start must be a number");
    }
    if (s2) {
      if (De(r2))
        r2 = r2.toNumber();
      else if (typeof r2 != "number")
        throw new TypeError("Parameter end must be a number");
    }
    if (a2) {
      if (De(n2))
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
    return Lr(r2) === Lr(n2) ? t4 = Math.ceil(n2 / r2) : n2 === 0 && (t4 = 0), isNaN(t4) && (t4 = 0), [t4];
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
    var e2 = Br(this.start, t4);
    return this.step !== 1 && (e2 += ":" + Br(this.step, t4)), e2 += ":" + Br(this.end, t4);
  }, t3.prototype.toString = function() {
    return this.format();
  }, t3.prototype.toJSON = function() {
    return {mathjs: "Range", start: this.start, end: this.end, step: this.step};
  }, t3.fromJSON = function(e2) {
    return new t3(e2.start, e2.end, e2.step);
  }, t3;
}, {isClass: true}), os = mn("Matrix", [], () => {
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
}, {isClass: true}), us = mn("DenseMatrix", ["Matrix"], (t3) => {
  var {Matrix: e2} = t3;
  function r2(t4, e3) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (e3 && !Be(e3))
      throw new Error("Invalid datatype: " + e3);
    if (Pe(t4))
      t4.type === "DenseMatrix" ? (this._data = gr(t4._data), this._size = gr(t4._size), this._datatype = e3 || t4._datatype) : (this._data = t4.toArray(), this._size = t4.size(), this._datatype = e3 || t4._datatype);
    else if (t4 && Fe(t4.data) && Fe(t4.size))
      this._data = t4.data, this._size = t4.size, rn(this._data, this._size), this._datatype = e3 || t4.datatype;
    else if (Fe(t4))
      this._data = h(t4), this._size = tn(this._data), rn(this._data, this._size), this._datatype = e3;
    else {
      if (t4)
        throw new TypeError("Unsupported type of data (" + yr(t4) + ")");
      this._data = [], this._size = [0], this._datatype = e3;
    }
  }
  function n2(t4, e3) {
    if (!Ve(e3))
      throw new TypeError("Invalid index");
    if (e3.isScalar())
      return t4.get(e3.min());
    var n3 = e3.size();
    if (n3.length !== t4._size.length)
      throw new Jr(n3.length, t4._size.length);
    for (var s3 = e3.min(), a3 = e3.max(), o3 = 0, u3 = t4._size.length; o3 < u3; o3++)
      nn(s3[o3], t4._size[o3]), nn(a3[o3], t4._size[o3]);
    return new r2(i2(t4._data, e3, n3.length, 0), t4._datatype);
  }
  function i2(t4, e3, r3, n3) {
    var s3 = n3 === r3 - 1, a3 = e3.dimension(n3);
    return s3 ? a3.map(function(e4) {
      return nn(e4, t4.length), t4[e4];
    }).valueOf() : a3.map(function(s4) {
      return nn(s4, t4.length), i2(t4[s4], e3, r3, n3 + 1);
    }).valueOf();
  }
  function s2(t4, e3, r3, n3) {
    if (!e3 || e3.isIndex !== true)
      throw new TypeError("Invalid index");
    var i3, s3 = e3.size(), o3 = e3.isScalar();
    if (Pe(r3) ? (i3 = r3.size(), r3 = r3.valueOf()) : i3 = tn(r3), o3) {
      if (i3.length !== 0)
        throw new TypeError("Scalar expected");
      t4.set(e3.min(), r3, n3);
    } else {
      if (s3.length < t4._size.length)
        throw new Jr(s3.length, t4._size.length, "<");
      if (i3.length < s3.length) {
        for (var h2 = 0, c2 = 0; s3[h2] === 1 && i3[h2] === 1; )
          h2++;
        for (; s3[h2] === 1; )
          c2++, h2++;
        r3 = un(r3, s3.length, c2, i3);
      }
      if (!br(s3, i3))
        throw new Jr(s3, i3, ">");
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
      nn(e4), t4[e4] = r3[n4[0]];
    }) : o3.forEach(function(s4, o4) {
      nn(s4), a2(t4[s4], e3, r3[o4[0]], n3, i3 + 1);
    });
  }
  function o2(t4, e3, r3) {
    if (e3.length === 0) {
      for (var n3 = t4._data; Fe(n3); )
        n3 = n3[0];
      return n3;
    }
    return t4._size = e3.slice(0), t4._data = sn(t4._data, t4._size, r3), t4;
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
      Fe(n3) ? t4[e3] = h(n3) : n3 && n3.isMatrix === true && (t4[e3] = h(n3.valueOf()));
    }
    return t4;
  }
  return r2.prototype = new e2(), r2.prototype.createDenseMatrix = function(t4, e3) {
    return new r2(t4, e3);
  }, r2.prototype.type = "DenseMatrix", r2.prototype.isDenseMatrix = true, r2.prototype.getDataType = function() {
    return fn(this._data, yr);
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
    if (!Fe(t4))
      throw new TypeError("Array expected");
    if (t4.length !== this._size.length)
      throw new Jr(t4.length, this._size.length);
    for (var e3 = 0; e3 < t4.length; e3++)
      nn(t4[e3], this._size[e3]);
    for (var r3 = this._data, n3 = 0, i3 = t4.length; n3 < i3; n3++) {
      var s3 = t4[n3];
      nn(s3, r3.length), r3 = r3[s3];
    }
    return r3;
  }, r2.prototype.set = function(t4, e3, r3) {
    if (!Fe(t4))
      throw new TypeError("Array expected");
    if (t4.length < this._size.length)
      throw new Jr(t4.length, this._size.length, "<");
    var n3, i3, s3;
    u2(this, t4.map(function(t5) {
      return t5 + 1;
    }), r3);
    var a3 = this._data;
    for (n3 = 0, i3 = t4.length - 1; n3 < i3; n3++)
      nn(s3 = t4[n3], a3.length), a3 = a3[s3];
    return nn(s3 = t4[t4.length - 1], a3.length), a3[s3] = e3, this;
  }, r2.prototype.resize = function(t4, e3, r3) {
    if (!Ue(t4))
      throw new TypeError("Array or Matrix expected");
    var n3 = t4.valueOf().map((t5) => Array.isArray(t5) && t5.length === 1 ? t5[0] : t5);
    return o2(r3 ? this.clone() : this, n3, e3);
  }, r2.prototype.reshape = function(t4, e3) {
    var r3 = e3 ? this.clone() : this;
    return r3._data = on(r3._data, t4), r3._size = t4.slice(0), r3;
  }, r2.prototype.clone = function() {
    return new r2({data: gr(this._data), size: gr(this._size), datatype: this._datatype});
  }, r2.prototype.size = function() {
    return this._size.slice(0);
  }, r2.prototype.map = function(t4) {
    var e3 = this, n3 = function r3(n4, i3) {
      return Fe(n4) ? n4.map(function(t5, e4) {
        return r3(t5, i3.concat(e4));
      }) : t4(n4, i3, e3);
    }(this._data, []);
    return new r2(n3, this._datatype !== void 0 ? fn(n3, yr) : void 0);
  }, r2.prototype.forEach = function(t4) {
    var e3 = this;
    !function r3(n3, i3) {
      Fe(n3) ? n3.forEach(function(t5, e4) {
        r3(t5, i3.concat(e4));
      }) : t4(n3, i3, e3);
    }(this._data, []);
  }, r2.prototype.toArray = function() {
    return gr(this._data);
  }, r2.prototype.valueOf = function() {
    return this._data;
  }, r2.prototype.format = function(t4) {
    return Yr(this._data, t4);
  }, r2.prototype.toString = function() {
    return Yr(this._data);
  }, r2.prototype.toJSON = function() {
    return {mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype};
  }, r2.prototype.diagonal = function(t4) {
    if (t4) {
      if (De(t4) && (t4 = t4.toNumber()), !Re(t4) || !Ir(t4))
        throw new TypeError("The parameter k must be an integer number");
    } else
      t4 = 0;
    for (var e3 = t4 > 0 ? t4 : 0, n3 = t4 < 0 ? -t4 : 0, i3 = this._size[0], s3 = this._size[1], a3 = Math.min(i3 - n3, s3 - e3), o3 = [], u3 = 0; u3 < a3; u3++)
      o3[u3] = this._data[u3 + n3][u3 + e3];
    return new r2({data: o3, size: [a3], datatype: this._datatype});
  }, r2.diagonal = function(t4, e3, n3, i3) {
    if (!Fe(t4))
      throw new TypeError("Array expected, size parameter");
    if (t4.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (t4 = t4.map(function(t5) {
      if (De(t5) && (t5 = t5.toNumber()), !Re(t5) || !Ir(t5) || t5 < 1)
        throw new Error("Size values must be positive integers");
      return t5;
    }), n3) {
      if (De(n3) && (n3 = n3.toNumber()), !Re(n3) || !Ir(n3))
        throw new TypeError("The parameter k must be an integer number");
    } else
      n3 = 0;
    var s3, a3 = n3 > 0 ? n3 : 0, o3 = n3 < 0 ? -n3 : 0, u3 = t4[0], h2 = t4[1], c2 = Math.min(u3 - o3, h2 - a3);
    if (Fe(e3)) {
      if (e3.length !== c2)
        throw new Error("Invalid value array length");
      s3 = function(t5) {
        return e3[t5];
      };
    } else if (Pe(e3)) {
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
    i3 || (i3 = De(s3(0)) ? s3(0).mul(0) : 0);
    var p2 = [];
    if (t4.length > 0) {
      p2 = sn(p2, t4, i3);
      for (var f2 = 0; f2 < c2; f2++)
        p2[f2 + o3][f2 + a3] = s3(f2);
    }
    return new r2({data: p2, size: [u3, h2]});
  }, r2.fromJSON = function(t4) {
    return new r2(t4);
  }, r2.prototype.swapRows = function(t4, e3) {
    if (!(Re(t4) && Ir(t4) && Re(e3) && Ir(e3)))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return nn(t4, this._size[0]), nn(e3, this._size[0]), r2._swapRows(t4, e3, this._data), this;
  }, r2._swapRows = function(t4, e3, r3) {
    var n3 = r3[t4];
    r3[t4] = r3[e3], r3[e3] = n3;
  }, r2;
}, {isClass: true});
function hs(t3, e2, r2) {
  return t3 && typeof t3.map == "function" ? t3.map(function(t4) {
    return hs(t4, e2);
  }) : e2(t3);
}
var cs = "number", ls = "number, number";
function ps(t3) {
  return Math.abs(t3);
}
function fs(t3, e2) {
  return t3 + e2;
}
function ds(t3, e2) {
  return t3 * e2;
}
function ms(t3) {
  return -t3;
}
function ys(t3) {
  return Math.ceil(t3);
}
function gs(t3, e2) {
  if (e2 > 0)
    return t3 - e2 * Math.floor(t3 / e2);
  if (e2 === 0)
    return t3;
  throw new Error("Cannot calculate mod for a negative divisor");
}
function vs(t3, e2) {
  return t3 * t3 < 1 && e2 === 1 / 0 || t3 * t3 > 1 && e2 === -1 / 0 ? 0 : Math.pow(t3, e2);
}
function xs(t3) {
  var e2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return parseFloat(Pr(t3, e2));
}
ps.signature = cs, fs.signature = ls, ds.signature = ls, ms.signature = cs, ys.signature = cs, gs.signature = ls, vs.signature = ls, xs.signature = ls;
var ws = mn("isNumeric", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("isNumeric", {"number | BigNumber | Fraction | boolean": function() {
    return true;
  }, "Complex | Unit | string | null | undefined | Node": function() {
    return false;
  }, "Array | Matrix": function(t4) {
    return hs(t4, this);
  }});
});
function bs(t3, e2, r2) {
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
var _s = "equalScalar", Ms = mn(_s, ["typed", "config"], (t3) => {
  var {typed: e2, config: r2} = t3;
  return e2(_s, {"boolean, boolean": function(t4, e3) {
    return t4 === e3;
  }, "number, number": function(t4, e3) {
    return Vr(t4, e3, r2.epsilon);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.eq(e3) || bs(t4, e3, r2.epsilon);
  }, "Fraction, Fraction": function(t4, e3) {
    return t4.equals(e3);
  }, "Complex, Complex": function(t4, e3) {
    return function(t5, e4, r3) {
      return Vr(t5.re, e4.re, r3) && Vr(t5.im, e4.im, r3);
    }(t4, e3, r2.epsilon);
  }, "Unit, Unit": function(t4, e3) {
    if (!t4.equalBase(e3))
      throw new Error("Cannot compare units with different base");
    return this(t4.value, e3.value);
  }});
});
mn(_s, ["typed", "config"], (t3) => {
  var {typed: e2, config: r2} = t3;
  return e2(_s, {"number, number": function(t4, e3) {
    return Vr(t4, e3, r2.epsilon);
  }});
});
var Ns = mn("SparseMatrix", ["typed", "equalScalar", "Matrix"], (t3) => {
  var {typed: e2, equalScalar: r2, Matrix: n2} = t3;
  function i2(t4, e3) {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (e3 && !Be(e3))
      throw new Error("Invalid datatype: " + e3);
    if (Pe(t4))
      !function(t5, e4, r3) {
        e4.type === "SparseMatrix" ? (t5._values = e4._values ? gr(e4._values) : void 0, t5._index = gr(e4._index), t5._ptr = gr(e4._ptr), t5._size = gr(e4._size), t5._datatype = r3 || e4._datatype) : s2(t5, e4.valueOf(), r3 || e4._datatype);
      }(this, t4, e3);
    else if (t4 && Fe(t4.index) && Fe(t4.ptr) && Fe(t4.size))
      this._values = t4.values, this._index = t4.index, this._ptr = t4.ptr, this._size = t4.size, this._datatype = e3 || t4.datatype;
    else if (Fe(t4))
      s2(this, t4, e3);
    else {
      if (t4)
        throw new TypeError("Unsupported type of data (" + yr(t4) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = e3;
    }
  }
  function s2(t4, n3, i3) {
    t4._values = [], t4._index = [], t4._ptr = [], t4._datatype = i3;
    var s3 = n3.length, a3 = 0, o3 = r2, u3 = 0;
    if (Be(i3) && (o3 = e2.find(r2, [i3, i3]) || r2, u3 = e2.convert(0, i3)), s3 > 0) {
      var h2 = 0;
      do {
        t4._ptr.push(t4._index.length);
        for (var c3 = 0; c3 < s3; c3++) {
          var l3 = n3[c3];
          if (Fe(l3)) {
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
    if (!Ve(e3))
      throw new TypeError("Invalid index");
    if (e3.isScalar())
      return t4.get(e3.min());
    var r3, n3, s3, a3, o3 = e3.size();
    if (o3.length !== t4._size.length)
      throw new Jr(o3.length, t4._size.length);
    var u3 = e3.min(), h2 = e3.max();
    for (r3 = 0, n3 = t4._size.length; r3 < n3; r3++)
      nn(u3[r3], t4._size[r3]), nn(h2[r3], t4._size[r3]);
    var c3 = t4._values, l3 = t4._index, p2 = t4._ptr, f2 = e3.dimension(0), d = e3.dimension(1), m2 = [], y2 = [];
    f2.forEach(function(t5, e4) {
      y2[t5] = e4[0], m2[t5] = true;
    });
    var g2 = c3 ? [] : void 0, v2 = [], x2 = [];
    return d.forEach(function(t5) {
      for (x2.push(v2.length), s3 = p2[t5], a3 = p2[t5 + 1]; s3 < a3; s3++)
        r3 = l3[s3], m2[r3] === true && (v2.push(y2[r3]), g2 && g2.push(c3[s3]));
    }), x2.push(v2.length), new i2({values: g2, index: v2, ptr: x2, size: o3, datatype: t4._datatype});
  }
  function o2(t4, e3, r3, n3) {
    if (!e3 || e3.isIndex !== true)
      throw new TypeError("Invalid index");
    var i3, s3 = e3.size(), a3 = e3.isScalar();
    if (Pe(r3) ? (i3 = r3.size(), r3 = r3.toArray()) : i3 = tn(r3), a3) {
      if (i3.length !== 0)
        throw new TypeError("Scalar expected");
      t4.set(e3.min(), r3, n3);
    } else {
      if (s3.length !== 1 && s3.length !== 2)
        throw new Jr(s3.length, t4._size.length, "<");
      if (i3.length < s3.length) {
        for (var o3 = 0, u3 = 0; s3[o3] === 1 && i3[o3] === 1; )
          o3++;
        for (; s3[o3] === 1; )
          u3++, o3++;
        r3 = un(r3, s3.length, u3, i3);
      }
      if (!br(s3, i3))
        throw new Jr(s3, i3, ">");
      for (var h2 = e3.min()[0], c3 = e3.min()[1], l3 = i3[0], p2 = i3[1], f2 = 0; f2 < l3; f2++)
        for (var d = 0; d < p2; d++) {
          var m2 = r3[f2][d];
          t4.set([f2 + h2, d + c3], m2, n3);
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
    Be(t4._datatype) && (o3 = e2.find(r2, [t4._datatype, t4._datatype]) || r2, u3 = e2.convert(0, t4._datatype), a3 = e2.convert(a3, t4._datatype));
    var h2, c3, l3, p2 = !o3(a3, u3), f2 = t4._size[0], d = t4._size[1];
    if (i3 > d) {
      for (c3 = d; c3 < i3; c3++)
        if (t4._ptr[c3] = t4._values.length, p2)
          for (h2 = 0; h2 < f2; h2++)
            t4._values.push(a3), t4._index.push(h2);
      t4._ptr[i3] = t4._values.length;
    } else
      i3 < d && (t4._ptr.splice(i3 + 1, d - i3), t4._values.splice(t4._ptr[i3], t4._values.length), t4._index.splice(t4._ptr[i3], t4._index.length));
    if (d = i3, n3 > f2) {
      if (p2) {
        var m2 = 0;
        for (c3 = 0; c3 < d; c3++) {
          t4._ptr[c3] = t4._ptr[c3] + m2, l3 = t4._ptr[c3 + 1] + m2;
          var y2 = 0;
          for (h2 = f2; h2 < n3; h2++, y2++)
            t4._values.splice(l3 + y2, 0, a3), t4._index.splice(l3 + y2, 0, h2), m2++;
        }
        t4._ptr[d] = t4._values.length;
      }
    } else if (n3 < f2) {
      var g2 = 0;
      for (c3 = 0; c3 < d; c3++) {
        t4._ptr[c3] = t4._ptr[c3] - g2;
        var v2 = t4._ptr[c3], x2 = t4._ptr[c3 + 1] - g2;
        for (l3 = v2; l3 < x2; l3++)
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
        h2[s3 = e3[p2]][a3] = t4 ? i3 ? gr(t4[p2]) : t4[p2] : 1;
    return h2;
  }
  return i2.prototype = new n2(), i2.prototype.createSparseMatrix = function(t4, e3) {
    return new i2(t4, e3);
  }, i2.prototype.type = "SparseMatrix", i2.prototype.isSparseMatrix = true, i2.prototype.getDataType = function() {
    return fn(this._values, yr);
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
    if (!Fe(t4))
      throw new TypeError("Array expected");
    if (t4.length !== this._size.length)
      throw new Jr(t4.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var e3 = t4[0], r3 = t4[1];
    nn(e3, this._size[0]), nn(r3, this._size[1]);
    var n3 = u2(e3, this._ptr[r3], this._ptr[r3 + 1], this._index);
    return n3 < this._ptr[r3 + 1] && this._index[n3] === e3 ? this._values[n3] : 0;
  }, i2.prototype.set = function(t4, n3, i3) {
    if (!Fe(t4))
      throw new TypeError("Array expected");
    if (t4.length !== this._size.length)
      throw new Jr(t4.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var s3 = t4[0], a3 = t4[1], o3 = this._size[0], l3 = this._size[1], p2 = r2, f2 = 0;
    Be(this._datatype) && (p2 = e2.find(r2, [this._datatype, this._datatype]) || r2, f2 = e2.convert(0, this._datatype)), (s3 > o3 - 1 || a3 > l3 - 1) && (c2(this, Math.max(s3 + 1, o3), Math.max(a3 + 1, l3), i3), o3 = this._size[0], l3 = this._size[1]), nn(s3, o3), nn(a3, l3);
    var d = u2(s3, this._ptr[a3], this._ptr[a3 + 1], this._index);
    return d < this._ptr[a3 + 1] && this._index[d] === s3 ? p2(n3, f2) ? function(t5, e3, r3, n4, i4) {
      r3.splice(t5, 1), n4.splice(t5, 1);
      for (var s4 = e3 + 1; s4 < i4.length; s4++)
        i4[s4]--;
    }(d, a3, this._values, this._index, this._ptr) : this._values[d] = n3 : h(d, s3, a3, n3, this._values, this._index, this._ptr), this;
  }, i2.prototype.resize = function(t4, e3, r3) {
    if (!Ue(t4))
      throw new TypeError("Array or Matrix expected");
    var n3 = t4.valueOf().map((t5) => Array.isArray(t5) && t5.length === 1 ? t5[0] : t5);
    if (n3.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    return n3.forEach(function(t5) {
      if (!Re(t5) || !Ir(t5) || t5 < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Yr(n3) + ")");
    }), c2(r3 ? this.clone() : this, n3[0], n3[1], e3);
  }, i2.prototype.reshape = function(t4, e3) {
    if (!Fe(t4))
      throw new TypeError("Array expected");
    if (t4.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    if (t4.forEach(function(e4) {
      if (!Re(e4) || !Ir(e4) || e4 < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Yr(t4) + ")");
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
    for (var d = 0; d < r3._ptr.length; d++)
      r3._ptr[d] = 0;
    for (var m2 = 0; m2 < a3.length; m2++) {
      var y2 = o3[m2], g2 = n3[m2], v2 = a3[m2];
      h(u2(y2, r3._ptr[g2], r3._ptr[g2 + 1], r3._index), y2, g2, v2, r3._values, r3._index, r3._ptr);
    }
    return r3;
  }, i2.prototype.clone = function() {
    return new i2({values: this._values ? gr(this._values) : void 0, index: gr(this._index), ptr: gr(this._ptr), size: gr(this._size), datatype: this._datatype});
  }, i2.prototype.size = function() {
    return this._size.slice(0);
  }, i2.prototype.map = function(t4, n3) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var s3 = this;
    return function(t5, n4, s4, a3, o3, u3, h2) {
      var c3 = [], l3 = [], p2 = [], f2 = r2, d = 0;
      Be(t5._datatype) && (f2 = e2.find(r2, [t5._datatype, t5._datatype]) || r2, d = e2.convert(0, t5._datatype));
      for (var m2 = function(t6, e3, r3) {
        t6 = u3(t6, e3, r3), f2(t6, d) || (c3.push(t6), l3.push(e3));
      }, y2 = a3; y2 <= o3; y2++) {
        p2.push(c3.length);
        var g2 = t5._ptr[y2], v2 = t5._ptr[y2 + 1];
        if (h2)
          for (var x2 = g2; x2 < v2; x2++) {
            var w2 = t5._index[x2];
            w2 >= n4 && w2 <= s4 && m2(t5._values[x2], w2 - n4, y2 - a3);
          }
        else {
          for (var b2 = {}, _2 = g2; _2 < v2; _2++) {
            b2[t5._index[_2]] = t5._values[_2];
          }
          for (var M = n4; M <= s4; M++) {
            m2(M in b2 ? b2[M] : 0, M - n4, y2 - a3);
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
    for (var e3 = this._size[0], r3 = this._size[1], n3 = this.density(), i3 = "Sparse Matrix [" + Yr(e3, t4) + " x " + Yr(r3, t4) + "] density: " + Yr(n3, t4) + "\n", s3 = 0; s3 < r3; s3++)
      for (var a3 = this._ptr[s3], o3 = this._ptr[s3 + 1], u3 = a3; u3 < o3; u3++) {
        i3 += "\n    (" + Yr(this._index[u3], t4) + ", " + Yr(s3, t4) + ") ==> " + (this._values ? Yr(this._values[u3], t4) : "X");
      }
    return i3;
  }, i2.prototype.toString = function() {
    return Yr(this.toArray());
  }, i2.prototype.toJSON = function() {
    return {mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype};
  }, i2.prototype.diagonal = function(t4) {
    if (t4) {
      if (De(t4) && (t4 = t4.toNumber()), !Re(t4) || !Ir(t4))
        throw new TypeError("The parameter k must be an integer number");
    } else
      t4 = 0;
    var e3 = t4 > 0 ? t4 : 0, r3 = t4 < 0 ? -t4 : 0, n3 = this._size[0], s3 = this._size[1], a3 = Math.min(n3 - r3, s3 - e3), o3 = [], u3 = [], h2 = [];
    h2[0] = 0;
    for (var c3 = e3; c3 < s3 && o3.length < a3; c3++)
      for (var l3 = this._ptr[c3], p2 = this._ptr[c3 + 1], f2 = l3; f2 < p2; f2++) {
        var d = this._index[f2];
        if (d === c3 - e3 + r3) {
          o3.push(this._values[f2]), u3[o3.length - 1] = d - r3;
          break;
        }
      }
    return h2.push(o3.length), new i2({values: o3, index: u3, ptr: h2, size: [a3, 1]});
  }, i2.fromJSON = function(t4) {
    return new i2(t4);
  }, i2.diagonal = function(t4, n3, s3, a3, o3) {
    if (!Fe(t4))
      throw new TypeError("Array expected, size parameter");
    if (t4.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (t4 = t4.map(function(t5) {
      if (De(t5) && (t5 = t5.toNumber()), !Re(t5) || !Ir(t5) || t5 < 1)
        throw new Error("Size values must be positive integers");
      return t5;
    }), s3) {
      if (De(s3) && (s3 = s3.toNumber()), !Re(s3) || !Ir(s3))
        throw new TypeError("The parameter k must be an integer number");
    } else
      s3 = 0;
    var u3 = r2, h2 = 0;
    Be(o3) && (u3 = e2.find(r2, [o3, o3]) || r2, h2 = e2.convert(0, o3));
    var c3, l3 = s3 > 0 ? s3 : 0, p2 = s3 < 0 ? -s3 : 0, f2 = t4[0], d = t4[1], m2 = Math.min(f2 - p2, d - l3);
    if (Fe(n3)) {
      if (n3.length !== m2)
        throw new Error("Invalid value array length");
      c3 = function(t5) {
        return n3[t5];
      };
    } else if (Pe(n3)) {
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
    for (var g2 = [], v2 = [], x2 = [], w2 = 0; w2 < d; w2++) {
      x2.push(g2.length);
      var b2 = w2 - l3;
      if (b2 >= 0 && b2 < m2) {
        var _2 = c3(b2);
        u3(_2, h2) || (v2.push(b2 + p2), g2.push(_2));
      }
    }
    return x2.push(g2.length), new i2({values: g2, index: v2, ptr: x2, size: [f2, d]});
  }, i2.prototype.swapRows = function(t4, e3) {
    if (!(Re(t4) && Ir(t4) && Re(e3) && Ir(e3)))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return nn(t4, this._size[0]), nn(e3, this._size[0]), i2._swapRows(t4, e3, this._size[1], this._values, this._index, this._ptr), this;
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
        var d = n3 ? n3[l3] : void 0;
        i3.splice(c3, 0, t4), n3 && n3.splice(c3, 0, d), i3.splice(c3 <= l3 ? l3 + 1 : l3, 1), n3 && n3.splice(c3 <= l3 ? l3 + 1 : l3, 1);
      }
    }
  }, i2;
}, {isClass: true}), Es = mn("number", ["typed"], (t3) => {
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
    return hs(t4, this);
  }});
  return r2.fromJSON = function(t4) {
    return parseFloat(t4.value);
  }, r2;
}), Ss = mn("bignumber", ["typed", "BigNumber"], (t3) => {
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
    return hs(t4, this);
  }});
}), Ts = mn("fraction", ["typed", "Fraction"], (t3) => {
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
    return hs(t4, this);
  }});
}), Os = mn("matrix", ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], (t3) => {
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
}), zs = mn("unaryMinus", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("unaryMinus", {number: ms, Complex: function(t4) {
    return t4.neg();
  }, BigNumber: function(t4) {
    return t4.neg();
  }, Fraction: function(t4) {
    return t4.neg();
  }, Unit: function(t4) {
    var e3 = t4.clone();
    return e3.value = this(t4.value), e3;
  }, "Array | Matrix": function(t4) {
    return hs(t4, this);
  }});
}), Cs = mn("abs", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("abs", {number: ps, Complex: function(t4) {
    return t4.abs();
  }, BigNumber: function(t4) {
    return t4.abs();
  }, Fraction: function(t4) {
    return t4.abs();
  }, "Array | Matrix": function(t4) {
    return hs(t4, this);
  }, Unit: function(t4) {
    return t4.abs();
  }});
}), As = mn("addScalar", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("addScalar", {"number, number": fs, "Complex, Complex": function(t4, e3) {
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
}), Rs = mn("algorithm11", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return function(t4, n2, i2, s2) {
    var a2 = t4._values, o2 = t4._index, u2 = t4._ptr, h = t4._size, c2 = t4._datatype;
    if (!a2)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var l2, p2 = h[0], f2 = h[1], d = r2, m2 = 0, y2 = i2;
    typeof c2 == "string" && (l2 = c2, d = e2.find(r2, [l2, l2]), m2 = e2.convert(0, l2), n2 = e2.convert(n2, l2), y2 = e2.find(i2, [l2, l2]));
    for (var g2 = [], v2 = [], x2 = [], w2 = 0; w2 < f2; w2++) {
      x2[w2] = v2.length;
      for (var b2 = u2[w2], _2 = u2[w2 + 1], M = b2; M < _2; M++) {
        var N = o2[M], E = s2 ? y2(n2, a2[M]) : y2(a2[M], n2);
        d(E, m2) || (v2.push(N), g2.push(E));
      }
    }
    return x2[f2] = v2.length, t4.createSparseMatrix({values: g2, index: v2, ptr: x2, size: [p2, f2], datatype: l2});
  };
}), Ds = mn("algorithm14", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return function(t4, n2, i2, s2) {
    var a2, o2 = t4._data, u2 = t4._size, h = t4._datatype, c2 = i2;
    typeof h == "string" && (a2 = h, n2 = e2.convert(n2, a2), c2 = e2.find(i2, [a2, a2]));
    var l2 = u2.length > 0 ? r2(c2, 0, u2, u2[0], o2, n2, s2) : [];
    return t4.createDenseMatrix({data: l2, size: gr(u2), datatype: a2});
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
}), ks = mn("ceil", ["typed", "config", "round", "matrix", "equalScalar"], (t3) => {
  var {typed: e2, config: r2, round: n2, matrix: i2, equalScalar: s2} = t3, a2 = Rs({typed: e2, equalScalar: s2}), o2 = Ds({typed: e2});
  return e2("ceil", {number: function(t4) {
    return Vr(t4, n2(t4), r2.epsilon) ? n2(t4) : ys(t4);
  }, "number, number": function(t4, e3) {
    if (Vr(t4, n2(t4, e3), r2.epsilon))
      return n2(t4, e3);
    var [i3, s3] = "".concat(t4, "e").split("e"), a3 = Math.ceil(Number("".concat(i3, "e").concat(Number(s3) + e3)));
    return [i3, s3] = "".concat(a3, "e").split("e"), Number("".concat(i3, "e").concat(Number(s3) - e3));
  }, Complex: function(t4) {
    return t4.ceil();
  }, "Complex, number": function(t4, e3) {
    return t4.ceil(e3);
  }, BigNumber: function(t4) {
    return bs(t4, n2(t4), r2.epsilon) ? n2(t4) : t4.ceil();
  }, "BigNumber, BigNumber": function(t4, e3) {
    return bs(t4, n2(t4, e3), r2.epsilon) ? n2(t4, e3) : t4.toDecimalPlaces(e3.toNumber(), Qi.ROUND_CEIL);
  }, Fraction: function(t4) {
    return t4.ceil();
  }, "Fraction, number": function(t4, e3) {
    return t4.ceil(e3);
  }, "Array | Matrix": function(t4) {
    return hs(t4, this);
  }, "Array | Matrix, number": function(t4, e3) {
    return hs(t4, (t5) => this(t5, e3));
  }, "SparseMatrix, number | BigNumber": function(t4, e3) {
    return a2(t4, e3, this, false);
  }, "DenseMatrix, number | BigNumber": function(t4, e3) {
    return o2(t4, e3, this, false);
  }, "number | Complex | BigNumber, Array": function(t4, e3) {
    return o2(i2(e3), t4, this, true).valueOf();
  }});
}), Is = mn("fix", ["typed", "Complex", "matrix", "ceil", "floor"], (t3) => {
  var {typed: e2, Complex: r2, matrix: n2, ceil: i2, floor: s2} = t3, a2 = Ds({typed: e2});
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
    return hs(t4, this);
  }, "Array | Matrix, number | BigNumber": function(t4, e3) {
    return hs(t4, (t5) => this(t5, e3));
  }, "number | Complex | BigNumber, Array": function(t4, e3) {
    return a2(n2(e3), t4, this, true).valueOf();
  }});
}), Ls = mn("floor", ["typed", "config", "round", "matrix", "equalScalar"], (t3) => {
  var {typed: e2, config: r2, round: n2, matrix: i2, equalScalar: s2} = t3, a2 = Rs({typed: e2, equalScalar: s2}), o2 = Ds({typed: e2});
  return e2("floor", {number: function(t4) {
    return Vr(t4, n2(t4), r2.epsilon) ? n2(t4) : Math.floor(t4);
  }, "number, number": function(t4, e3) {
    if (Vr(t4, n2(t4, e3), r2.epsilon))
      return n2(t4, e3);
    var [i3, s3] = "".concat(t4, "e").split("e"), a3 = Math.floor(Number("".concat(i3, "e").concat(Number(s3) + e3)));
    return [i3, s3] = "".concat(a3, "e").split("e"), Number("".concat(i3, "e").concat(Number(s3) - e3));
  }, Complex: function(t4) {
    return t4.floor();
  }, "Complex, number": function(t4, e3) {
    return t4.floor(e3);
  }, BigNumber: function(t4) {
    return bs(t4, n2(t4), r2.epsilon) ? n2(t4) : t4.floor();
  }, "BigNumber, BigNumber": function(t4, e3) {
    return bs(t4, n2(t4, e3), r2.epsilon) ? n2(t4, e3) : t4.toDecimalPlaces(e3.toNumber(), Qi.ROUND_FLOOR);
  }, Fraction: function(t4) {
    return t4.floor();
  }, "Fraction, number": function(t4, e3) {
    return t4.floor(e3);
  }, "Array | Matrix": function(t4) {
    return hs(t4, this);
  }, "Array | Matrix, number": function(t4, e3) {
    return hs(t4, (t5) => this(t5, e3));
  }, "SparseMatrix, number | BigNumber": function(t4, e3) {
    return a2(t4, e3, this, false);
  }, "DenseMatrix, number | BigNumber": function(t4, e3) {
    return o2(t4, e3, this, false);
  }, "number | Complex | BigNumber, Array": function(t4, e3) {
    return o2(i2(e3), t4, this, true).valueOf();
  }});
}), Bs = mn("algorithm01", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return function(t4, r2, n2, i2) {
    var s2 = t4._data, a2 = t4._size, o2 = t4._datatype, u2 = r2._values, h = r2._index, c2 = r2._ptr, l2 = r2._size, p2 = r2._datatype;
    if (a2.length !== l2.length)
      throw new Jr(a2.length, l2.length);
    if (a2[0] !== l2[0] || a2[1] !== l2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + a2 + ") must match Matrix B (" + l2 + ")");
    if (!u2)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var f2, d, m2 = a2[0], y2 = a2[1], g2 = typeof o2 == "string" && o2 === p2 ? o2 : void 0, v2 = g2 ? e2.find(n2, [g2, g2]) : n2, x2 = [];
    for (f2 = 0; f2 < m2; f2++)
      x2[f2] = [];
    var w2 = [], b2 = [];
    for (d = 0; d < y2; d++) {
      for (var _2 = d + 1, M = c2[d], N = c2[d + 1], E = M; E < N; E++)
        w2[f2 = h[E]] = i2 ? v2(u2[E], s2[f2][d]) : v2(s2[f2][d], u2[E]), b2[f2] = _2;
      for (f2 = 0; f2 < m2; f2++)
        b2[f2] === _2 ? x2[f2][d] = w2[f2] : x2[f2][d] = s2[f2][d];
    }
    return t4.createDenseMatrix({data: x2, size: [m2, y2], datatype: g2});
  };
}), Fs = mn("algorithm04", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return function(t4, n2, i2) {
    var s2 = t4._values, a2 = t4._index, o2 = t4._ptr, u2 = t4._size, h = t4._datatype, c2 = n2._values, l2 = n2._index, p2 = n2._ptr, f2 = n2._size, d = n2._datatype;
    if (u2.length !== f2.length)
      throw new Jr(u2.length, f2.length);
    if (u2[0] !== f2[0] || u2[1] !== f2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + u2 + ") must match Matrix B (" + f2 + ")");
    var m2, y2 = u2[0], g2 = u2[1], v2 = r2, x2 = 0, w2 = i2;
    typeof h == "string" && h === d && (m2 = h, v2 = e2.find(r2, [m2, m2]), x2 = e2.convert(0, m2), w2 = e2.find(i2, [m2, m2]));
    var b2, _2, M, N, E, S = s2 && c2 ? [] : void 0, T = [], O = [], z = s2 && c2 ? [] : void 0, C = s2 && c2 ? [] : void 0, A = [], R = [];
    for (_2 = 0; _2 < g2; _2++) {
      O[_2] = T.length;
      var D = _2 + 1;
      for (N = o2[_2], E = o2[_2 + 1], M = N; M < E; M++)
        b2 = a2[M], T.push(b2), A[b2] = D, z && (z[b2] = s2[M]);
      for (N = p2[_2], E = p2[_2 + 1], M = N; M < E; M++)
        if (A[b2 = l2[M]] === D) {
          if (z) {
            var k = w2(z[b2], c2[M]);
            v2(k, x2) ? A[b2] = null : z[b2] = k;
          }
        } else
          T.push(b2), R[b2] = D, C && (C[b2] = c2[M]);
      if (z && C)
        for (M = O[_2]; M < T.length; )
          A[b2 = T[M]] === D ? (S[M] = z[b2], M++) : R[b2] === D ? (S[M] = C[b2], M++) : T.splice(M, 1);
    }
    return O[g2] = T.length, t4.createSparseMatrix({values: S, index: T, ptr: O, size: [y2, g2], datatype: m2});
  };
}), Ps = mn("algorithm10", ["typed", "DenseMatrix"], (t3) => {
  var {typed: e2, DenseMatrix: r2} = t3;
  return function(t4, n2, i2, s2) {
    var a2 = t4._values, o2 = t4._index, u2 = t4._ptr, h = t4._size, c2 = t4._datatype;
    if (!a2)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var l2, p2 = h[0], f2 = h[1], d = i2;
    typeof c2 == "string" && (l2 = c2, n2 = e2.convert(n2, l2), d = e2.find(i2, [l2, l2]));
    for (var m2 = [], y2 = [], g2 = [], v2 = 0; v2 < f2; v2++) {
      for (var x2 = v2 + 1, w2 = u2[v2], b2 = u2[v2 + 1], _2 = w2; _2 < b2; _2++) {
        var M = o2[_2];
        y2[M] = a2[_2], g2[M] = x2;
      }
      for (var N = 0; N < p2; N++)
        v2 === 0 && (m2[N] = []), g2[N] === x2 ? m2[N][v2] = s2 ? d(n2, y2[N]) : d(y2[N], n2) : m2[N][v2] = n2;
    }
    return new r2({data: m2, size: [p2, f2], datatype: l2});
  };
}), Us = mn("algorithm13", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return function(t4, n2, i2) {
    var s2, a2 = t4._data, o2 = t4._size, u2 = t4._datatype, h = n2._data, c2 = n2._size, l2 = n2._datatype, p2 = [];
    if (o2.length !== c2.length)
      throw new Jr(o2.length, c2.length);
    for (var f2 = 0; f2 < o2.length; f2++) {
      if (o2[f2] !== c2[f2])
        throw new RangeError("Dimension mismatch. Matrix A (" + o2 + ") must match Matrix B (" + c2 + ")");
      p2[f2] = o2[f2];
    }
    var d = i2;
    typeof u2 == "string" && u2 === l2 && (s2 = u2, d = e2.find(i2, [s2, s2]));
    var m2 = p2.length > 0 ? r2(d, 0, p2, p2[0], a2, h) : [];
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
}), js = mn("algorithm02", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return function(t4, n2, i2, s2) {
    var a2 = t4._data, o2 = t4._size, u2 = t4._datatype, h = n2._values, c2 = n2._index, l2 = n2._ptr, p2 = n2._size, f2 = n2._datatype;
    if (o2.length !== p2.length)
      throw new Jr(o2.length, p2.length);
    if (o2[0] !== p2[0] || o2[1] !== p2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + o2 + ") must match Matrix B (" + p2 + ")");
    if (!h)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var d, m2 = o2[0], y2 = o2[1], g2 = r2, v2 = 0, x2 = i2;
    typeof u2 == "string" && u2 === f2 && (d = u2, g2 = e2.find(r2, [d, d]), v2 = e2.convert(0, d), x2 = e2.find(i2, [d, d]));
    for (var w2 = [], b2 = [], _2 = [], M = 0; M < y2; M++) {
      _2[M] = b2.length;
      for (var N = l2[M], E = l2[M + 1], S = N; S < E; S++) {
        var T = c2[S], O = s2 ? x2(h[S], a2[T][M]) : x2(a2[T][M], h[S]);
        g2(O, v2) || (b2.push(T), w2.push(O));
      }
    }
    return _2[y2] = b2.length, n2.createSparseMatrix({values: w2, index: b2, ptr: _2, size: [m2, y2], datatype: d});
  };
}), qs = mn("algorithm03", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return function(t4, r2, n2, i2) {
    var s2 = t4._data, a2 = t4._size, o2 = t4._datatype, u2 = r2._values, h = r2._index, c2 = r2._ptr, l2 = r2._size, p2 = r2._datatype;
    if (a2.length !== l2.length)
      throw new Jr(a2.length, l2.length);
    if (a2[0] !== l2[0] || a2[1] !== l2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + a2 + ") must match Matrix B (" + l2 + ")");
    if (!u2)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var f2, d = a2[0], m2 = a2[1], y2 = 0, g2 = n2;
    typeof o2 == "string" && o2 === p2 && (f2 = o2, y2 = e2.convert(0, f2), g2 = e2.find(n2, [f2, f2]));
    for (var v2 = [], x2 = 0; x2 < d; x2++)
      v2[x2] = [];
    for (var w2 = [], b2 = [], _2 = 0; _2 < m2; _2++) {
      for (var M = _2 + 1, N = c2[_2], E = c2[_2 + 1], S = N; S < E; S++) {
        var T = h[S];
        w2[T] = i2 ? g2(u2[S], s2[T][_2]) : g2(s2[T][_2], u2[S]), b2[T] = M;
      }
      for (var O = 0; O < d; O++)
        b2[O] === M ? v2[O][_2] = w2[O] : v2[O][_2] = i2 ? g2(y2, s2[O][_2]) : g2(s2[O][_2], y2);
    }
    return t4.createDenseMatrix({data: v2, size: [d, m2], datatype: f2});
  };
}), Hs = mn("algorithm05", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return function(t4, n2, i2) {
    var s2 = t4._values, a2 = t4._index, o2 = t4._ptr, u2 = t4._size, h = t4._datatype, c2 = n2._values, l2 = n2._index, p2 = n2._ptr, f2 = n2._size, d = n2._datatype;
    if (u2.length !== f2.length)
      throw new Jr(u2.length, f2.length);
    if (u2[0] !== f2[0] || u2[1] !== f2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + u2 + ") must match Matrix B (" + f2 + ")");
    var m2, y2 = u2[0], g2 = u2[1], v2 = r2, x2 = 0, w2 = i2;
    typeof h == "string" && h === d && (m2 = h, v2 = e2.find(r2, [m2, m2]), x2 = e2.convert(0, m2), w2 = e2.find(i2, [m2, m2]));
    var b2, _2, M, N, E = s2 && c2 ? [] : void 0, S = [], T = [], O = E ? [] : void 0, z = E ? [] : void 0, C = [], A = [];
    for (_2 = 0; _2 < g2; _2++) {
      T[_2] = S.length;
      var R = _2 + 1;
      for (M = o2[_2], N = o2[_2 + 1]; M < N; M++)
        b2 = a2[M], S.push(b2), C[b2] = R, O && (O[b2] = s2[M]);
      for (M = p2[_2], N = p2[_2 + 1]; M < N; M++)
        C[b2 = l2[M]] !== R && S.push(b2), A[b2] = R, z && (z[b2] = c2[M]);
      if (E)
        for (M = T[_2]; M < S.length; ) {
          var D = C[b2 = S[M]], k = A[b2];
          if (D === R || k === R) {
            var I = w2(D === R ? O[b2] : x2, k === R ? z[b2] : x2);
            v2(I, x2) ? S.splice(M, 1) : (E.push(I), M++);
          }
        }
    }
    return T[g2] = S.length, t4.createSparseMatrix({values: E, index: S, ptr: T, size: [y2, g2], datatype: m2});
  };
}), Vs = mn("algorithm12", ["typed", "DenseMatrix"], (t3) => {
  var {typed: e2, DenseMatrix: r2} = t3;
  return function(t4, n2, i2, s2) {
    var a2 = t4._values, o2 = t4._index, u2 = t4._ptr, h = t4._size, c2 = t4._datatype;
    if (!a2)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var l2, p2 = h[0], f2 = h[1], d = i2;
    typeof c2 == "string" && (l2 = c2, n2 = e2.convert(n2, l2), d = e2.find(i2, [l2, l2]));
    for (var m2 = [], y2 = [], g2 = [], v2 = 0; v2 < f2; v2++) {
      for (var x2 = v2 + 1, w2 = u2[v2], b2 = u2[v2 + 1], _2 = w2; _2 < b2; _2++) {
        var M = o2[_2];
        y2[M] = a2[_2], g2[M] = x2;
      }
      for (var N = 0; N < p2; N++)
        v2 === 0 && (m2[N] = []), g2[N] === x2 ? m2[N][v2] = s2 ? d(n2, y2[N]) : d(y2[N], n2) : m2[N][v2] = s2 ? d(n2, 0) : d(0, n2);
    }
    return new r2({data: m2, size: [p2, f2], datatype: l2});
  };
});
mn("mod", ["typed", "matrix", "equalScalar", "DenseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, equalScalar: n2, DenseMatrix: i2} = t3, s2 = js({typed: e2, equalScalar: n2}), a2 = qs({typed: e2}), o2 = Hs({typed: e2, equalScalar: n2}), u2 = Rs({typed: e2, equalScalar: n2}), h = Vs({typed: e2, DenseMatrix: i2}), c2 = Us({typed: e2}), l2 = Ds({typed: e2});
  return e2("mod", {"number, number": gs, "BigNumber, BigNumber": function(t4, e3) {
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
var Gs = mn("multiplyScalar", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("multiplyScalar", {"number, number": ds, "Complex, Complex": function(t4, e3) {
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
}), Ws = mn("multiply", ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], (t3) => {
  var {typed: e2, matrix: r2, addScalar: n2, multiplyScalar: i2, equalScalar: s2, dot: a2} = t3, o2 = Rs({typed: e2, equalScalar: s2}), u2 = Ds({typed: e2});
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
      var s3, a3 = t5._data, o3 = t5._size, u3 = t5._datatype, h2 = r4._data, c3 = r4._size, l3 = r4._datatype, p3 = o3[0], f2 = c3[1], d = n2, m2 = i2;
      u3 && l3 && u3 === l3 && typeof u3 == "string" && (s3 = u3, d = e2.find(n2, [s3, s3]), m2 = e2.find(i2, [s3, s3]));
      for (var y2 = [], g2 = 0; g2 < f2; g2++) {
        for (var v2 = m2(a3[0], h2[0][g2]), x2 = 1; x2 < p3; x2++)
          v2 = d(v2, m2(a3[x2], h2[x2][g2]));
        y2[g2] = v2;
      }
      return t5.createDenseMatrix({data: y2, size: [f2], datatype: s3});
    }(t4, r3);
  }
  var l2 = e2("_multiplyMatrixVector", {"DenseMatrix, any": function(t4, r3) {
    var s3, a3 = t4._data, o3 = t4._size, u3 = t4._datatype, h2 = r3._data, c3 = r3._datatype, l3 = o3[0], p3 = o3[1], f2 = n2, d = i2;
    u3 && c3 && u3 === c3 && typeof u3 == "string" && (s3 = u3, f2 = e2.find(n2, [s3, s3]), d = e2.find(i2, [s3, s3]));
    for (var m2 = [], y2 = 0; y2 < l3; y2++) {
      for (var g2 = a3[y2], v2 = d(g2[0], h2[0]), x2 = 1; x2 < p3; x2++)
        v2 = f2(v2, d(g2[x2], h2[x2]));
      m2[y2] = v2;
    }
    return t4.createDenseMatrix({data: m2, size: [l3], datatype: s3});
  }, "SparseMatrix, any": function(t4, r3) {
    var a3 = t4._values, o3 = t4._index, u3 = t4._ptr, h2 = t4._datatype;
    if (!a3)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var c3, l3 = r3._data, p3 = r3._datatype, f2 = t4._size[0], d = r3._size[0], m2 = [], y2 = [], g2 = [], v2 = n2, x2 = i2, w2 = s2, b2 = 0;
    h2 && p3 && h2 === p3 && typeof h2 == "string" && (c3 = h2, v2 = e2.find(n2, [c3, c3]), x2 = e2.find(i2, [c3, c3]), w2 = e2.find(s2, [c3, c3]), b2 = e2.convert(0, c3));
    var _2 = [], M = [];
    g2[0] = 0;
    for (var N = 0; N < d; N++) {
      var E = l3[N];
      if (!w2(E, b2))
        for (var S = u3[N], T = u3[N + 1], O = S; O < T; O++) {
          var z = o3[O];
          M[z] ? _2[z] = v2(_2[z], x2(E, a3[O])) : (M[z] = true, y2.push(z), _2[z] = x2(E, a3[O]));
        }
    }
    for (var C = y2.length, A = 0; A < C; A++) {
      var R = y2[A];
      m2[A] = _2[R];
    }
    return g2[1] = y2.length, t4.createSparseMatrix({values: m2, index: y2, ptr: g2, size: [f2, 1], datatype: c3});
  }}), p2 = e2("_multiplyMatrixMatrix", {"DenseMatrix, DenseMatrix": function(t4, r3) {
    var s3, a3 = t4._data, o3 = t4._size, u3 = t4._datatype, h2 = r3._data, c3 = r3._size, l3 = r3._datatype, p3 = o3[0], f2 = o3[1], d = c3[1], m2 = n2, y2 = i2;
    u3 && l3 && u3 === l3 && typeof u3 == "string" && (s3 = u3, m2 = e2.find(n2, [s3, s3]), y2 = e2.find(i2, [s3, s3]));
    for (var g2 = [], v2 = 0; v2 < p3; v2++) {
      var x2 = a3[v2];
      g2[v2] = [];
      for (var w2 = 0; w2 < d; w2++) {
        for (var b2 = y2(x2[0], h2[0][w2]), _2 = 1; _2 < f2; _2++)
          b2 = m2(b2, y2(x2[_2], h2[_2][w2]));
        g2[v2][w2] = b2;
      }
    }
    return t4.createDenseMatrix({data: g2, size: [p3, d], datatype: s3});
  }, "DenseMatrix, SparseMatrix": function(t4, r3) {
    var a3 = t4._data, o3 = t4._size, u3 = t4._datatype, h2 = r3._values, c3 = r3._index, l3 = r3._ptr, p3 = r3._size, f2 = r3._datatype;
    if (!h2)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var d, m2 = o3[0], y2 = p3[1], g2 = n2, v2 = i2, x2 = s2, w2 = 0;
    u3 && f2 && u3 === f2 && typeof u3 == "string" && (d = u3, g2 = e2.find(n2, [d, d]), v2 = e2.find(i2, [d, d]), x2 = e2.find(s2, [d, d]), w2 = e2.convert(0, d));
    for (var b2 = [], _2 = [], M = [], N = r3.createSparseMatrix({values: b2, index: _2, ptr: M, size: [m2, y2], datatype: d}), E = 0; E < y2; E++) {
      M[E] = _2.length;
      var S = l3[E], T = l3[E + 1];
      if (T > S)
        for (var O = 0, z = 0; z < m2; z++) {
          for (var C = z + 1, A = void 0, R = S; R < T; R++) {
            var D = c3[R];
            O !== C ? (A = v2(a3[z][D], h2[R]), O = C) : A = g2(A, v2(a3[z][D], h2[R]));
          }
          O !== C || x2(A, w2) || (_2.push(z), b2.push(A));
        }
    }
    return M[y2] = _2.length, N;
  }, "SparseMatrix, DenseMatrix": function(t4, r3) {
    var a3 = t4._values, o3 = t4._index, u3 = t4._ptr, h2 = t4._datatype;
    if (!a3)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var c3, l3 = r3._data, p3 = r3._datatype, f2 = t4._size[0], d = r3._size[0], m2 = r3._size[1], y2 = n2, g2 = i2, v2 = s2, x2 = 0;
    h2 && p3 && h2 === p3 && typeof h2 == "string" && (c3 = h2, y2 = e2.find(n2, [c3, c3]), g2 = e2.find(i2, [c3, c3]), v2 = e2.find(s2, [c3, c3]), x2 = e2.convert(0, c3));
    for (var w2 = [], b2 = [], _2 = [], M = t4.createSparseMatrix({values: w2, index: b2, ptr: _2, size: [f2, m2], datatype: c3}), N = [], E = [], S = 0; S < m2; S++) {
      _2[S] = b2.length;
      for (var T = S + 1, O = 0; O < d; O++) {
        var z = l3[O][S];
        if (!v2(z, x2))
          for (var C = u3[O], A = u3[O + 1], R = C; R < A; R++) {
            var D = o3[R];
            E[D] !== T ? (E[D] = T, b2.push(D), N[D] = g2(z, a3[R])) : N[D] = y2(N[D], g2(z, a3[R]));
          }
      }
      for (var k = _2[S], I = b2.length, L = k; L < I; L++) {
        var B = b2[L];
        w2[L] = N[B];
      }
    }
    return _2[m2] = b2.length, M;
  }, "SparseMatrix, SparseMatrix": function(t4, r3) {
    var s3, a3 = t4._values, o3 = t4._index, u3 = t4._ptr, h2 = t4._datatype, c3 = r3._values, l3 = r3._index, p3 = r3._ptr, f2 = r3._datatype, d = t4._size[0], m2 = r3._size[1], y2 = a3 && c3, g2 = n2, v2 = i2;
    h2 && f2 && h2 === f2 && typeof h2 == "string" && (s3 = h2, g2 = e2.find(n2, [s3, s3]), v2 = e2.find(i2, [s3, s3]));
    for (var x2, w2, b2, _2, M, N, E, S, T = y2 ? [] : void 0, O = [], z = [], C = t4.createSparseMatrix({values: T, index: O, ptr: z, size: [d, m2], datatype: s3}), A = y2 ? [] : void 0, R = [], D = 0; D < m2; D++) {
      z[D] = O.length;
      var k = D + 1;
      for (M = p3[D], N = p3[D + 1], _2 = M; _2 < N; _2++)
        if (S = l3[_2], y2)
          for (w2 = u3[S], b2 = u3[S + 1], x2 = w2; x2 < b2; x2++)
            E = o3[x2], R[E] !== k ? (R[E] = k, O.push(E), A[E] = v2(c3[_2], a3[x2])) : A[E] = g2(A[E], v2(c3[_2], a3[x2]));
        else
          for (w2 = u3[S], b2 = u3[S + 1], x2 = w2; x2 < b2; x2++)
            E = o3[x2], R[E] !== k && (R[E] = k, O.push(E));
      if (y2)
        for (var I = z[D], L = O.length, B = I; B < L; B++) {
          var F = O[B];
          T[B] = A[F];
        }
    }
    return z[m2] = O.length, C;
  }});
  return e2("multiply", xr({"Array, Array": function(t4, e3) {
    h(tn(t4), tn(e3));
    var n3 = this(r2(t4), r2(e3));
    return Pe(n3) ? n3.valueOf() : n3;
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
}), Ys = mn("subtract", ["typed", "matrix", "equalScalar", "addScalar", "unaryMinus", "DenseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, equalScalar: n2, addScalar: i2, unaryMinus: s2, DenseMatrix: a2} = t3, o2 = Bs({typed: e2}), u2 = qs({typed: e2}), h = Hs({typed: e2, equalScalar: n2}), c2 = Ps({typed: e2, DenseMatrix: a2}), l2 = Us({typed: e2}), p2 = Ds({typed: e2});
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
    return Zs(t4, e3), h(t4, e3, this);
  }, "SparseMatrix, DenseMatrix": function(t4, e3) {
    return Zs(t4, e3), u2(e3, t4, this, true);
  }, "DenseMatrix, SparseMatrix": function(t4, e3) {
    return Zs(t4, e3), o2(t4, e3, this, false);
  }, "DenseMatrix, DenseMatrix": function(t4, e3) {
    return Zs(t4, e3), l2(t4, e3, this);
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
function Zs(t3, e2) {
  var r2 = t3.size(), n2 = e2.size();
  if (r2.length !== n2.length)
    throw new Jr(r2.length, n2.length);
}
var Xs = mn("algorithm07", ["typed", "DenseMatrix"], (t3) => {
  var {typed: e2, DenseMatrix: r2} = t3;
  return function(t4, i2, s2) {
    var a2 = t4._size, o2 = t4._datatype, u2 = i2._size, h = i2._datatype;
    if (a2.length !== u2.length)
      throw new Jr(a2.length, u2.length);
    if (a2[0] !== u2[0] || a2[1] !== u2[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + a2 + ") must match Matrix B (" + u2 + ")");
    var c2, l2, p2, f2 = a2[0], d = a2[1], m2 = 0, y2 = s2;
    typeof o2 == "string" && o2 === h && (c2 = o2, m2 = e2.convert(0, c2), y2 = e2.find(s2, [c2, c2]));
    var g2 = [];
    for (l2 = 0; l2 < f2; l2++)
      g2[l2] = [];
    var v2 = [], x2 = [], w2 = [], b2 = [];
    for (p2 = 0; p2 < d; p2++) {
      var _2 = p2 + 1;
      for (n2(t4, p2, w2, v2, _2), n2(i2, p2, b2, x2, _2), l2 = 0; l2 < f2; l2++) {
        var M = w2[l2] === _2 ? v2[l2] : m2, N = b2[l2] === _2 ? x2[l2] : m2;
        g2[l2][p2] = y2(M, N);
      }
    }
    return new r2({data: g2, size: [f2, d], datatype: c2});
  };
  function n2(t4, e3, r3, n3, i2) {
    for (var s2 = t4._values, a2 = t4._index, o2 = t4._ptr, u2 = o2[e3], h = o2[e3 + 1]; u2 < h; u2++) {
      var c2 = a2[u2];
      r3[c2] = i2, n3[c2] = s2[u2];
    }
  }
}), Qs = mn("conj", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("conj", {number: function(t4) {
    return t4;
  }, BigNumber: function(t4) {
    return t4;
  }, Complex: function(t4) {
    return t4.conjugate();
  }, "Array | Matrix": function(t4) {
    return hs(t4, this);
  }});
});
function Js(t3) {
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
function Ks(t3) {
  var {hasher: e2, limit: r2} = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return r2 = r2 == null ? Number.POSITIVE_INFINITY : r2, e2 = e2 == null ? JSON.stringify : e2, function n2() {
    typeof n2.cache != "object" && (n2.cache = {values: new Map(), lru: Js(r2 || Number.POSITIVE_INFINITY)});
    for (var i2 = [], s2 = 0; s2 < arguments.length; s2++)
      i2[s2] = arguments[s2];
    var a2 = e2(i2);
    if (n2.cache.values.has(a2))
      return n2.cache.lru.hit(a2), n2.cache.values.get(a2);
    var o2 = t3.apply(t3, i2);
    return n2.cache.values.set(a2, o2), n2.cache.values.delete(n2.cache.lru.hit(a2)), o2;
  };
}
var ta = mn("identity", ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], (t3) => {
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
    var n3 = De(t4) || De(e3) ? i2 : null;
    if (De(t4) && (t4 = t4.toNumber()), De(e3) && (e3 = e3.toNumber()), !Ir(t4) || t4 < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!Ir(e3) || e3 < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var o3 = n3 ? new i2(1) : 1, u3 = n3 ? new n3(0) : 0, h = [t4, e3];
    if (r3) {
      if (r3 === "sparse")
        return a2.diagonal(h, o3, 0, u3);
      if (r3 === "dense")
        return s2.diagonal(h, o3, 0, u3);
      throw new TypeError('Unknown matrix type "'.concat(r3, '"'));
    }
    for (var c2 = sn([], h, u3), l2 = t4 < e3 ? t4 : e3, p2 = 0; p2 < l2; p2++)
      c2[p2][p2] = o3;
    return c2;
  }
});
function ea() {
  throw new Error('No "bignumber" implementation available');
}
function ra() {
  throw new Error('No "fraction" implementation available');
}
function na(t3, e2, r2, n2) {
  if (!(this instanceof na))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.fn = t3, this.count = e2, this.min = r2, this.max = n2, this.message = "Wrong number of arguments in function " + t3 + " (" + e2 + " provided, " + r2 + (n2 != null ? "-" + n2 : "") + " expected)", this.stack = new Error().stack;
}
na.prototype = new Error(), na.prototype.constructor = Error, na.prototype.name = "ArgumentsError", na.prototype.isArgumentsError = true;
var ia = mn("size", ["typed", "config", "?matrix"], (t3) => {
  var {typed: e2, config: r2, matrix: n2} = t3;
  return e2("size", {Matrix: function(t4) {
    return t4.create(t4.size());
  }, Array: tn, string: function(t4) {
    return r2.matrix === "Array" ? [t4.length] : n2([t4.length]);
  }, "number | Complex | BigNumber | Unit | boolean | null": function(t4) {
    return r2.matrix === "Array" ? [] : n2 ? n2([]) : function() {
      throw new Error('No "matrix" implementation available');
    }();
  }});
});
function sa(t3, e2) {
  if (ha(t3) && oa(t3, e2))
    return t3[e2];
  if (typeof t3[e2] == "function" && ua(t3, e2))
    throw new Error('Cannot access method "' + e2 + '" as a property');
  throw new Error('No access to property "' + e2 + '"');
}
function aa(t3, e2, r2) {
  if (ha(t3) && oa(t3, e2))
    return t3[e2] = r2, r2;
  throw new Error('No access to property "' + e2 + '"');
}
function oa(t3, e2) {
  return !(!t3 || typeof t3 != "object") && (!!Er(ca, e2) || !(e2 in Object.prototype) && !(e2 in Function.prototype));
}
function ua(t3, e2) {
  return t3 != null && typeof t3[e2] == "function" && (!(Er(t3, e2) && Object.getPrototypeOf && e2 in Object.getPrototypeOf(t3)) && (!!Er(la, e2) || !(e2 in Object.prototype) && !(e2 in Function.prototype)));
}
function ha(t3) {
  return typeof t3 == "object" && t3 && t3.constructor === Object;
}
var ca = {length: true, name: true}, la = {toString: true, valueOf: true, toLocaleString: true}, pa = mn("subset", ["typed", "matrix"], (t3) => {
  var {typed: e2, matrix: r2} = t3;
  return e2("subset", {"Array, Index": function(t4, e3) {
    var n2 = r2(t4).subset(e3);
    return e3.isScalar() ? n2 : n2.valueOf();
  }, "Matrix, Index": function(t4, e3) {
    return t4.subset(e3);
  }, "Object, Index": ma, "string, Index": fa, "Array, Index, any": function(t4, e3, n2) {
    return r2(gr(t4)).subset(e3, n2, void 0).valueOf();
  }, "Array, Index, any, any": function(t4, e3, n2, i2) {
    return r2(gr(t4)).subset(e3, n2, i2).valueOf();
  }, "Matrix, Index, any": function(t4, e3, r3) {
    return t4.clone().subset(e3, r3);
  }, "Matrix, Index, any, any": function(t4, e3, r3, n2) {
    return t4.clone().subset(e3, r3, n2);
  }, "string, Index, string": da, "string, Index, string, string": da, "Object, Index, any": ya});
});
function fa(t3, e2) {
  if (!Ve(e2))
    throw new TypeError("Index expected");
  if (e2.size().length !== 1)
    throw new Jr(e2.size().length, 1);
  var r2 = t3.length;
  nn(e2.min()[0], r2), nn(e2.max()[0], r2);
  var n2 = e2.dimension(0), i2 = "";
  return n2.forEach(function(e3) {
    i2 += t3.charAt(e3);
  }), i2;
}
function da(t3, e2, r2, n2) {
  if (!e2 || e2.isIndex !== true)
    throw new TypeError("Index expected");
  if (e2.size().length !== 1)
    throw new Jr(e2.size().length, 1);
  if (n2 !== void 0) {
    if (typeof n2 != "string" || n2.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    n2 = " ";
  var i2 = e2.dimension(0);
  if (i2.size()[0] !== r2.length)
    throw new Jr(i2.size()[0], r2.length);
  var s2 = t3.length;
  nn(e2.min()[0]), nn(e2.max()[0]);
  for (var a2 = [], o2 = 0; o2 < s2; o2++)
    a2[o2] = t3.charAt(o2);
  if (i2.forEach(function(t4, e3) {
    a2[t4] = r2.charAt(e3[0]);
  }), a2.length > s2)
    for (var u2 = s2 - 1, h = a2.length; u2 < h; u2++)
      a2[u2] || (a2[u2] = n2);
  return a2.join("");
}
function ma(t3, e2) {
  if (e2.size().length !== 1)
    throw new Jr(e2.size(), 1);
  var r2 = e2.dimension(0);
  if (typeof r2 != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  return sa(t3, r2);
}
function ya(t3, e2, r2) {
  if (e2.size().length !== 1)
    throw new Jr(e2.size(), 1);
  var n2 = e2.dimension(0);
  if (typeof n2 != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var i2 = gr(t3);
  return aa(i2, n2, r2), i2;
}
var ga = mn("zeros", ["typed", "config", "matrix", "BigNumber"], (t3) => {
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
        De(t6) && (e4 = true, n3[r4] = t6.toNumber());
      }), e4;
    }(t4) ? new i2(0) : 0;
    if (function(t5) {
      t5.forEach(function(t6) {
        if (typeof t6 != "number" || !Ir(t6) || t6 < 0)
          throw new Error("Parameters in function zeros must be positive integers");
      });
    }(t4), e3) {
      var s3 = n2(e3);
      return t4.length > 0 ? s3.resize(t4, r3) : s3;
    }
    var a2 = [];
    return t4.length > 0 ? sn(a2, t4, r3) : a2;
  }
}), va = mn("format", ["typed"], (t3) => {
  var {typed: e2} = t3;
  return e2("format", {any: Yr, "any, Object | function | number": Yr});
}), xa = mn("numeric", ["number", "?bignumber", "?fraction"], (t3) => {
  var {number: e2, bignumber: r2, fraction: n2} = t3, i2 = {string: true, number: true, BigNumber: true, Fraction: true}, s2 = {number: (t4) => e2(t4), BigNumber: r2 ? (t4) => r2(t4) : ea, Fraction: n2 ? (t4) => n2(t4) : ra};
  return function(t4, e3) {
    var r3 = yr(t4);
    if (!(r3 in i2))
      throw new TypeError("Cannot convert " + t4 + ' of type "' + r3 + '"; valid input types are ' + Object.keys(i2).join(", "));
    if (!(e3 in s2))
      throw new TypeError("Cannot convert " + t4 + ' to type "' + e3 + '"; valid output types are ' + Object.keys(s2).join(", "));
    return e3 === r3 ? t4 : s2[e3](t4);
  };
}), wa = mn("divideScalar", ["typed", "numeric"], (t3) => {
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
    var n2 = t4.clone(), i2 = r2(1, yr(e3));
    return n2.value = this(n2.value === null ? n2._normalize(i2) : n2.value, e3), n2;
  }, "number | Fraction | BigNumber, Unit": function(t4, e3) {
    var n2 = e3.clone();
    n2 = n2.pow(-1);
    var i2 = r2(1, yr(t4));
    return n2.value = this(t4, e3.value === null ? e3._normalize(i2) : e3.value), n2;
  }, "Unit, Unit": function(t4, e3) {
    return t4.divide(e3);
  }});
}), ba = mn("pow", ["typed", "config", "identity", "multiply", "matrix", "fraction", "number", "Complex"], (t3) => {
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
    if (r2.predictable && !Ir(e3) && t4 < 0)
      try {
        var n3 = o2(e3), i3 = a2(n3);
        if ((e3 === i3 || Math.abs((e3 - i3) / e3) < 1e-14) && n3.d % 2 == 1)
          return (n3.n % 2 == 0 ? 1 : -1) * Math.pow(-t4, e3);
      } catch (s3) {
      }
    return r2.predictable && (t4 < -1 && e3 === 1 / 0 || t4 > -1 && t4 < 0 && e3 === -1 / 0) ? NaN : Ir(e3) || t4 >= 0 || r2.predictable ? vs(t4, e3) : t4 * t4 < 1 && e3 === 1 / 0 || t4 * t4 > 1 && e3 === -1 / 0 ? 0 : new u2(t4, 0).pow(e3, 0);
  }
  function c2(t4, e3) {
    if (!Ir(e3) || e3 < 0)
      throw new TypeError("For A^b, b must be a positive integer (value is " + e3 + ")");
    var r3 = tn(t4);
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
function _a(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(t3);
    e2 && (n2 = n2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, n2);
  }
  return r2;
}
function Ma(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = arguments[e2] != null ? arguments[e2] : {};
    e2 % 2 ? _a(Object(r2), true).forEach(function(e3) {
      Na(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : _a(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
function Na(t3, e2, r2) {
  return e2 in t3 ? Object.defineProperty(t3, e2, {value: r2, enumerable: true, configurable: true, writable: true}) : t3[e2] = r2, t3;
}
var Ea = "Number of decimals in function round must be an integer", Sa = mn("round", ["typed", "matrix", "equalScalar", "zeros", "BigNumber", "DenseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, equalScalar: n2, zeros: i2, BigNumber: s2, DenseMatrix: a2} = t3, o2 = Rs({typed: e2, equalScalar: n2}), u2 = Vs({typed: e2, DenseMatrix: a2}), h = Ds({typed: e2});
  return e2("round", Ma(Ma({}, Ta), {}, {Complex: function(t4) {
    return t4.round();
  }, "Complex, number": function(t4, e3) {
    if (e3 % 1)
      throw new TypeError(Ea);
    return t4.round(e3);
  }, "Complex, BigNumber": function(t4, e3) {
    if (!e3.isInteger())
      throw new TypeError(Ea);
    var r3 = e3.toNumber();
    return t4.round(r3);
  }, "number, BigNumber": function(t4, e3) {
    if (!e3.isInteger())
      throw new TypeError(Ea);
    return new s2(t4).toDecimalPlaces(e3.toNumber());
  }, BigNumber: function(t4) {
    return t4.toDecimalPlaces(0);
  }, "BigNumber, BigNumber": function(t4, e3) {
    if (!e3.isInteger())
      throw new TypeError(Ea);
    return t4.toDecimalPlaces(e3.toNumber());
  }, Fraction: function(t4) {
    return t4.round();
  }, "Fraction, number": function(t4, e3) {
    if (e3 % 1)
      throw new TypeError(Ea);
    return t4.round(e3);
  }, "Array | Matrix": function(t4) {
    return hs(t4, this);
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
}), Ta = {number: xs, "number, number": function(t3, e2) {
  if (!Ir(e2))
    throw new TypeError(Ea);
  if (e2 < 0 || e2 > 15)
    throw new Error("Number of decimals in function round must be in te range of 0-15");
  return xs(t3, e2);
}}, Oa = mn("equal", ["typed", "matrix", "equalScalar", "DenseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, equalScalar: n2, DenseMatrix: i2} = t3, s2 = qs({typed: e2}), a2 = Xs({typed: e2, DenseMatrix: i2}), o2 = Vs({typed: e2, DenseMatrix: i2}), u2 = Us({typed: e2}), h = Ds({typed: e2});
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
mn("equal", ["typed", "equalScalar"], (t3) => {
  var {typed: e2, equalScalar: r2} = t3;
  return e2("equal", {"any, any": function(t4, e3) {
    return t4 === null ? e3 === null : e3 === null ? t4 === null : t4 === void 0 ? e3 === void 0 : e3 === void 0 ? t4 === void 0 : r2(t4, e3);
  }});
});
var za = mn("smaller", ["typed", "config", "matrix", "DenseMatrix"], (t3) => {
  var {typed: e2, config: r2, matrix: n2, DenseMatrix: i2} = t3, s2 = qs({typed: e2}), a2 = Xs({typed: e2, DenseMatrix: i2}), o2 = Vs({typed: e2, DenseMatrix: i2}), u2 = Us({typed: e2}), h = Ds({typed: e2});
  return e2("smaller", {"boolean, boolean": function(t4, e3) {
    return t4 < e3;
  }, "number, number": function(t4, e3) {
    return t4 < e3 && !Vr(t4, e3, r2.epsilon);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.lt(e3) && !bs(t4, e3, r2.epsilon);
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
}), Ca = mn("larger", ["typed", "config", "matrix", "DenseMatrix"], (t3) => {
  var {typed: e2, config: r2, matrix: n2, DenseMatrix: i2} = t3, s2 = qs({typed: e2}), a2 = Xs({typed: e2, DenseMatrix: i2}), o2 = Vs({typed: e2, DenseMatrix: i2}), u2 = Us({typed: e2}), h = Ds({typed: e2});
  return e2("larger", {"boolean, boolean": function(t4, e3) {
    return t4 > e3;
  }, "number, number": function(t4, e3) {
    return t4 > e3 && !Vr(t4, e3, r2.epsilon);
  }, "BigNumber, BigNumber": function(t4, e3) {
    return t4.gt(e3) && !bs(t4, e3, r2.epsilon);
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
}), Aa = mn("FibonacciHeap", ["smaller", "larger"], (t3) => {
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
      for (var d = 0; d < a4; d++)
        (s4 = u3[d]) && (t5 ? (s4.left.right = s4.right, s4.right.left = s4.left, s4.left = t5, s4.right = t5.right, t5.right = s4, s4.right.left = s4, e2(s4.key, t5.key) && (t5 = s4)) : t5 = s4);
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
}, {isClass: true}), Ra = mn("Spa", ["addScalar", "equalScalar", "FibonacciHeap"], (t3) => {
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
Ks(function(t3) {
  return new t3(1).exp();
}, {hasher: ka}), Ks(function(t3) {
  return new t3(1).plus(new t3(5).sqrt()).div(2);
}, {hasher: ka});
var Da = Ks(function(t3) {
  return t3.acos(-1);
}, {hasher: ka});
function ka(t3) {
  return t3[0].precision;
}
function Ia() {
  return (Ia = Object.assign || function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2)
        Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
    }
    return t3;
  }).apply(this, arguments);
}
function La(t3, e2) {
  var r2 = Object.keys(t3);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(t3);
    e2 && (n2 = n2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
    })), r2.push.apply(r2, n2);
  }
  return r2;
}
function Ba(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = arguments[e2] != null ? arguments[e2] : {};
    e2 % 2 ? La(Object(r2), true).forEach(function(e3) {
      Fa(t3, e3, r2[e3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : La(Object(r2)).forEach(function(e3) {
      Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
    });
  }
  return t3;
}
function Fa(t3, e2, r2) {
  return e2 in t3 ? Object.defineProperty(t3, e2, {value: r2, enumerable: true, configurable: true, writable: true}) : t3[e2] = r2, t3;
}
Ks(function(t3) {
  return Da(t3).times(2);
}, {hasher: ka});
var Pa = mn("Unit", ["?on", "config", "addScalar", "subtract", "multiplyScalar", "divideScalar", "pow", "abs", "fix", "round", "equal", "isNumeric", "format", "number", "Complex", "BigNumber", "Fraction"], (t3) => {
  var e2, r2, n2, {on: i2, config: s2, addScalar: a2, subtract: o2, multiplyScalar: u2, divideScalar: h, pow: c2, abs: l2, fix: p2, round: f2, equal: d, isNumeric: m2, format: y2, number: g2, Complex: v2, BigNumber: x2, Fraction: w2} = t3, b2 = g2;
  function _2(t4, e3) {
    if (!(this instanceof _2))
      throw new Error("Constructor must be called with the new operator");
    if (t4 != null && !m2(t4) && !ke(t4))
      throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");
    if (e3 !== void 0 && (typeof e3 != "string" || e3 === ""))
      throw new TypeError("Second parameter in Unit constructor must be a string");
    if (e3 !== void 0) {
      var r3 = _2.parse(e3);
      this.units = r3.units, this.dimensions = r3.dimensions;
    } else {
      this.units = [{unit: L, prefix: R.NONE, power: 0}], this.dimensions = [];
      for (var n3 = 0; n3 < D.length; n3++)
        this.dimensions[n3] = 0;
    }
    this.value = t4 != null ? this._normalize(t4) : null, this.fixPrefix = false, this.skipAutomaticSimplification = true;
  }
  function M() {
    for (; n2 === " " || n2 === "	"; )
      E();
  }
  function N(t4) {
    return t4 >= "0" && t4 <= "9";
  }
  function E() {
    r2++, n2 = e2.charAt(r2);
  }
  function S(t4) {
    r2 = t4, n2 = e2.charAt(r2);
  }
  function T() {
    var t4, e3 = "", i3 = r2;
    if (n2 === "+" ? E() : n2 === "-" && (e3 += n2, E()), !((t4 = n2) >= "0" && t4 <= "9" || t4 === "."))
      return S(i3), null;
    if (n2 === ".") {
      if (e3 += n2, E(), !N(n2))
        return S(i3), null;
    } else {
      for (; N(n2); )
        e3 += n2, E();
      n2 === "." && (e3 += n2, E());
    }
    for (; N(n2); )
      e3 += n2, E();
    if (n2 === "E" || n2 === "e") {
      var s3 = "", a3 = r2;
      if (s3 += n2, E(), n2 !== "+" && n2 !== "-" || (s3 += n2, E()), !N(n2))
        return S(a3), e3;
      for (e3 += s3; N(n2); )
        e3 += n2, E();
    }
    return e3;
  }
  function O() {
    for (var t4 = ""; N(n2) || _2.isValidAlpha(n2); )
      t4 += n2, E();
    var e3 = t4.charAt(0);
    return _2.isValidAlpha(e3) ? t4 : null;
  }
  function z(t4) {
    return n2 === t4 ? (E(), t4) : null;
  }
  _2.prototype.type = "Unit", _2.prototype.isUnit = true, _2.parse = function(t4, i3) {
    if (i3 = i3 || {}, r2 = -1, n2 = "", typeof (e2 = t4) != "string")
      throw new TypeError("Invalid argument in Unit.parse, string expected");
    var a3 = new _2();
    a3.units = [];
    var o3 = 1, u3 = false;
    E(), M();
    var h2 = T(), c3 = null;
    if (h2) {
      if (s2.number === "BigNumber")
        c3 = new x2(h2);
      else if (s2.number === "Fraction")
        try {
          c3 = new w2(h2);
        } catch (N2) {
          c3 = parseFloat(h2);
        }
      else
        c3 = parseFloat(h2);
      M(), z("*") ? (o3 = 1, u3 = true) : z("/") && (o3 = -1, u3 = true);
    }
    for (var l3 = [], p3 = 1; ; ) {
      for (M(); n2 === "("; )
        l3.push(o3), p3 *= o3, o3 = 1, E(), M();
      var f3 = void 0;
      if (!n2)
        break;
      var d2 = n2;
      if ((f3 = O()) === null)
        throw new SyntaxError('Unexpected "' + d2 + '" in "' + e2 + '" at index ' + r2.toString());
      var m3 = C(f3);
      if (m3 === null)
        throw new SyntaxError('Unit "' + f3 + '" not found.');
      var y3 = o3 * p3;
      if (M(), z("^")) {
        M();
        var g3 = T();
        if (g3 === null)
          throw new SyntaxError('In "' + t4 + '", "^" must be followed by a floating-point number');
        y3 *= g3;
      }
      a3.units.push({unit: m3.unit, prefix: m3.prefix, power: y3});
      for (var v3 = 0; v3 < D.length; v3++)
        a3.dimensions[v3] += (m3.unit.dimensions[v3] || 0) * y3;
      for (M(); n2 === ")"; ) {
        if (l3.length === 0)
          throw new SyntaxError('Unmatched ")" in "' + e2 + '" at index ' + r2.toString());
        p3 /= l3.pop(), E(), M();
      }
      if (u3 = false, z("*") ? (o3 = 1, u3 = true) : z("/") ? (o3 = -1, u3 = true) : o3 = 1, m3.unit.base) {
        var b3 = m3.unit.base.key;
        U.auto[b3] = {unit: m3.unit, prefix: m3.prefix};
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
  }, _2.prototype.clone = function() {
    var t4 = new _2();
    t4.fixPrefix = this.fixPrefix, t4.skipAutomaticSimplification = this.skipAutomaticSimplification, t4.value = gr(this.value), t4.dimensions = this.dimensions.slice(0), t4.units = [];
    for (var e3 = 0; e3 < this.units.length; e3++)
      for (var r3 in t4.units[e3] = {}, this.units[e3])
        Er(this.units[e3], r3) && (t4.units[e3][r3] = this.units[e3][r3]);
    return t4;
  }, _2.prototype._isDerived = function() {
    return this.units.length !== 0 && (this.units.length > 1 || Math.abs(this.units[0].power - 1) > 1e-15);
  }, _2.prototype._normalize = function(t4) {
    var e3, r3, n3, i3, s3;
    if (t4 == null || this.units.length === 0)
      return t4;
    if (this._isDerived()) {
      var o3 = t4;
      s3 = _2._getNumberConverter(yr(t4));
      for (var h2 = 0; h2 < this.units.length; h2++)
        e3 = s3(this.units[h2].unit.value), i3 = s3(this.units[h2].prefix.value), n3 = s3(this.units[h2].power), o3 = u2(o3, c2(u2(e3, i3), n3));
      return o3;
    }
    return e3 = (s3 = _2._getNumberConverter(yr(t4)))(this.units[0].unit.value), r3 = s3(this.units[0].unit.offset), i3 = s3(this.units[0].prefix.value), u2(a2(t4, r3), u2(e3, i3));
  }, _2.prototype._denormalize = function(t4, e3) {
    var r3, n3, i3, s3, a3;
    if (t4 == null || this.units.length === 0)
      return t4;
    if (this._isDerived()) {
      var l3 = t4;
      a3 = _2._getNumberConverter(yr(t4));
      for (var p3 = 0; p3 < this.units.length; p3++)
        r3 = a3(this.units[p3].unit.value), s3 = a3(this.units[p3].prefix.value), i3 = a3(this.units[p3].power), l3 = h(l3, c2(u2(r3, s3), i3));
      return l3;
    }
    return r3 = (a3 = _2._getNumberConverter(yr(t4)))(this.units[0].unit.value), s3 = a3(this.units[0].prefix.value), n3 = a3(this.units[0].unit.offset), o2(h(h(t4, r3), e3 == null ? s3 : e3), n3);
  };
  var C = Ks((t4) => {
    if (Er(B, t4)) {
      var e3 = B[t4];
      return {unit: e3, prefix: e3.prefixes[""]};
    }
    for (var r3 in B)
      if (Er(B, r3) && Wr(t4, r3)) {
        var n3 = B[r3], i3 = t4.length - r3.length, s3 = t4.substring(0, i3), a3 = Er(n3.prefixes, s3) ? n3.prefixes[s3] : void 0;
        if (a3 !== void 0)
          return {unit: n3, prefix: a3};
      }
    return null;
  }, {hasher: (t4) => t4[0], limit: 100});
  function A(t4) {
    return t4.equalBase(k.NONE) && t4.value !== null && !s2.predictable ? t4.value : t4;
  }
  _2.isValuelessUnit = function(t4) {
    return C(t4) !== null;
  }, _2.prototype.hasBase = function(t4) {
    if (typeof t4 == "string" && (t4 = k[t4]), !t4)
      return false;
    for (var e3 = 0; e3 < D.length; e3++)
      if (Math.abs((this.dimensions[e3] || 0) - (t4.dimensions[e3] || 0)) > 1e-12)
        return false;
    return true;
  }, _2.prototype.equalBase = function(t4) {
    for (var e3 = 0; e3 < D.length; e3++)
      if (Math.abs((this.dimensions[e3] || 0) - (t4.dimensions[e3] || 0)) > 1e-12)
        return false;
    return true;
  }, _2.prototype.equals = function(t4) {
    return this.equalBase(t4) && d(this.value, t4.value);
  }, _2.prototype.multiply = function(t4) {
    for (var e3 = this.clone(), r3 = 0; r3 < D.length; r3++)
      e3.dimensions[r3] = (this.dimensions[r3] || 0) + (t4.dimensions[r3] || 0);
    for (var n3 = 0; n3 < t4.units.length; n3++) {
      var i3 = Ba({}, t4.units[n3]);
      e3.units.push(i3);
    }
    if (this.value !== null || t4.value !== null) {
      var s3 = this.value === null ? this._normalize(1) : this.value, a3 = t4.value === null ? t4._normalize(1) : t4.value;
      e3.value = u2(s3, a3);
    } else
      e3.value = null;
    return e3.skipAutomaticSimplification = false, A(e3);
  }, _2.prototype.divide = function(t4) {
    for (var e3 = this.clone(), r3 = 0; r3 < D.length; r3++)
      e3.dimensions[r3] = (this.dimensions[r3] || 0) - (t4.dimensions[r3] || 0);
    for (var n3 = 0; n3 < t4.units.length; n3++) {
      var i3 = Ba(Ba({}, t4.units[n3]), {}, {power: -t4.units[n3].power});
      e3.units.push(i3);
    }
    if (this.value !== null || t4.value !== null) {
      var s3 = this.value === null ? this._normalize(1) : this.value, a3 = t4.value === null ? t4._normalize(1) : t4.value;
      e3.value = h(s3, a3);
    } else
      e3.value = null;
    return e3.skipAutomaticSimplification = false, A(e3);
  }, _2.prototype.pow = function(t4) {
    for (var e3 = this.clone(), r3 = 0; r3 < D.length; r3++)
      e3.dimensions[r3] = (this.dimensions[r3] || 0) * t4;
    for (var n3 = 0; n3 < e3.units.length; n3++)
      e3.units[n3].power *= t4;
    return e3.value !== null ? e3.value = c2(e3.value, t4) : e3.value = null, e3.skipAutomaticSimplification = false, A(e3);
  }, _2.prototype.abs = function() {
    var t4 = this.clone();
    for (var e3 in t4.value = t4.value !== null ? l2(t4.value) : null, t4.units)
      t4.units[e3].unit.name !== "VA" && t4.units[e3].unit.name !== "VAR" || (t4.units[e3].unit = B.W);
    return t4;
  }, _2.prototype.to = function(t4) {
    var e3, r3 = this.value === null ? this._normalize(1) : this.value;
    if (typeof t4 == "string") {
      if (e3 = _2.parse(t4), !this.equalBase(e3))
        throw new Error("Units do not match ('".concat(e3.toString(), "' != '").concat(this.toString(), "')"));
      if (e3.value !== null)
        throw new Error("Cannot convert to a unit with a value");
      return e3.value = gr(r3), e3.fixPrefix = true, e3.skipAutomaticSimplification = true, e3;
    }
    if (Le(t4)) {
      if (!this.equalBase(t4))
        throw new Error("Units do not match ('".concat(t4.toString(), "' != '").concat(this.toString(), "')"));
      if (t4.value !== null)
        throw new Error("Cannot convert to a unit with a value");
      return (e3 = t4.clone()).value = gr(r3), e3.fixPrefix = true, e3.skipAutomaticSimplification = true, e3;
    }
    throw new Error("String or Unit expected as parameter");
  }, _2.prototype.toNumber = function(t4) {
    return b2(this.toNumeric(t4));
  }, _2.prototype.toNumeric = function(t4) {
    var e3;
    return (e3 = t4 ? this.to(t4) : this.clone())._isDerived() || e3.units.length === 0 ? e3._denormalize(e3.value) : e3._denormalize(e3.value, e3.units[0].prefix.value);
  }, _2.prototype.toString = function() {
    return this.format();
  }, _2.prototype.toJSON = function() {
    return {mathjs: "Unit", value: this._denormalize(this.value), unit: this.formatUnits(), fixPrefix: this.fixPrefix};
  }, _2.fromJSON = function(t4) {
    var e3 = new _2(t4.value, t4.unit);
    return e3.fixPrefix = t4.fixPrefix || false, e3;
  }, _2.prototype.valueOf = _2.prototype.toString, _2.prototype.simplify = function() {
    var t4, e3, r3 = this.clone(), n3 = [];
    for (var i3 in j)
      if (Er(j, i3) && r3.hasBase(k[i3])) {
        t4 = i3;
        break;
      }
    if (t4 === "NONE")
      r3.units = [];
    else if (t4 && Er(j, t4) && (e3 = j[t4]), e3)
      r3.units = [{unit: e3.unit, prefix: e3.prefix, power: 1}];
    else {
      for (var s3 = false, a3 = 0; a3 < D.length; a3++) {
        var o3 = D[a3];
        Math.abs(r3.dimensions[a3] || 0) > 1e-12 && (Er(j, o3) ? n3.push({unit: j[o3].unit, prefix: j[o3].prefix, power: r3.dimensions[a3] || 0}) : s3 = true);
      }
      n3.length < r3.units.length && !s3 && (r3.units = n3);
    }
    return r3;
  }, _2.prototype.toSI = function() {
    for (var t4 = this.clone(), e3 = [], r3 = 0; r3 < D.length; r3++) {
      var n3 = D[r3];
      if (Math.abs(t4.dimensions[r3] || 0) > 1e-12) {
        if (!Er(U.si, n3))
          throw new Error("Cannot express custom unit " + n3 + " in SI units");
        e3.push({unit: U.si[n3].unit, prefix: U.si[n3].prefix, power: t4.dimensions[r3] || 0});
      }
    }
    return t4.units = e3, t4.fixPrefix = true, t4.skipAutomaticSimplification = true, t4;
  }, _2.prototype.formatUnits = function() {
    for (var t4 = "", e3 = "", r3 = 0, n3 = 0, i3 = 0; i3 < this.units.length; i3++)
      this.units[i3].power > 0 ? (r3++, t4 += " " + this.units[i3].prefix.name + this.units[i3].unit.name, Math.abs(this.units[i3].power - 1) > 1e-15 && (t4 += "^" + this.units[i3].power)) : this.units[i3].power < 0 && n3++;
    if (n3 > 0)
      for (var s3 = 0; s3 < this.units.length; s3++)
        this.units[s3].power < 0 && (r3 > 0 ? (e3 += " " + this.units[s3].prefix.name + this.units[s3].unit.name, Math.abs(this.units[s3].power + 1) > 1e-15 && (e3 += "^" + -this.units[s3].power)) : (e3 += " " + this.units[s3].prefix.name + this.units[s3].unit.name, e3 += "^" + this.units[s3].power));
    t4 = t4.substr(1), e3 = e3.substr(1), r3 > 1 && n3 > 0 && (t4 = "(" + t4 + ")"), n3 > 1 && r3 > 0 && (e3 = "(" + e3 + ")");
    var a3 = t4;
    return r3 > 0 && n3 > 0 && (a3 += " / "), a3 += e3;
  }, _2.prototype.format = function(t4) {
    var e3 = this.skipAutomaticSimplification || this.value === null ? this.clone() : this.simplify(), r3 = false;
    for (var n3 in e3.value !== void 0 && e3.value !== null && ke(e3.value) && (r3 = Math.abs(e3.value.re) < 1e-14), e3.units)
      Er(e3.units, n3) && e3.units[n3].unit && (e3.units[n3].unit.name === "VA" && r3 ? e3.units[n3].unit = B.VAR : e3.units[n3].unit.name !== "VAR" || r3 || (e3.units[n3].unit = B.VA));
    e3.units.length !== 1 || e3.fixPrefix || Math.abs(e3.units[0].power - Math.round(e3.units[0].power)) < 1e-14 && (e3.units[0].prefix = e3._bestPrefix());
    var i3 = e3._denormalize(e3.value), s3 = e3.value !== null ? y2(i3, t4 || {}) : "", a3 = e3.formatUnits();
    return e3.value && ke(e3.value) && (s3 = "(" + s3 + ")"), a3.length > 0 && s3.length > 0 && (s3 += " "), s3 += a3;
  }, _2.prototype._bestPrefix = function() {
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
      if (Er(s3, a3)) {
        var o3 = s3[a3];
        if (o3.scientific) {
          var u3 = Math.abs(Math.log(t4 / Math.pow(o3.value * e3, n3)) / Math.LN10 - 1.2);
          (u3 < i3 || u3 === i3 && o3.name.length < r3.name.length) && (r3 = o3, i3 = u3);
        }
      }
    return r3;
  }, _2.prototype.splitUnit = function(t4) {
    for (var e3 = this.clone(), r3 = [], n3 = 0; n3 < t4.length && (e3 = e3.to(t4[n3]), n3 !== t4.length - 1); n3++) {
      var i3 = e3.toNumeric(), s3 = f2(i3), u3 = new _2(d(s3, i3) ? s3 : p2(e3.toNumeric()), t4[n3].toString());
      r3.push(u3), e3 = o2(e3, u3);
    }
    for (var h2 = 0, c3 = 0; c3 < r3.length; c3++)
      h2 = a2(h2, r3[c3].value);
    return d(h2, this.value) && (e3.value = 0), r3.push(e3), r3;
  };
  var R = {NONE: {"": {name: "", value: 1, scientific: true}}, SHORT: {"": {name: "", value: 1, scientific: true}, da: {name: "da", value: 10, scientific: false}, h: {name: "h", value: 100, scientific: false}, k: {name: "k", value: 1e3, scientific: true}, M: {name: "M", value: 1e6, scientific: true}, G: {name: "G", value: 1e9, scientific: true}, T: {name: "T", value: 1e12, scientific: true}, P: {name: "P", value: 1e15, scientific: true}, E: {name: "E", value: 1e18, scientific: true}, Z: {name: "Z", value: 1e21, scientific: true}, Y: {name: "Y", value: 1e24, scientific: true}, d: {name: "d", value: 0.1, scientific: false}, c: {name: "c", value: 0.01, scientific: false}, m: {name: "m", value: 1e-3, scientific: true}, u: {name: "u", value: 1e-6, scientific: true}, n: {name: "n", value: 1e-9, scientific: true}, p: {name: "p", value: 1e-12, scientific: true}, f: {name: "f", value: 1e-15, scientific: true}, a: {name: "a", value: 1e-18, scientific: true}, z: {name: "z", value: 1e-21, scientific: true}, y: {name: "y", value: 1e-24, scientific: true}}, LONG: {"": {name: "", value: 1, scientific: true}, deca: {name: "deca", value: 10, scientific: false}, hecto: {name: "hecto", value: 100, scientific: false}, kilo: {name: "kilo", value: 1e3, scientific: true}, mega: {name: "mega", value: 1e6, scientific: true}, giga: {name: "giga", value: 1e9, scientific: true}, tera: {name: "tera", value: 1e12, scientific: true}, peta: {name: "peta", value: 1e15, scientific: true}, exa: {name: "exa", value: 1e18, scientific: true}, zetta: {name: "zetta", value: 1e21, scientific: true}, yotta: {name: "yotta", value: 1e24, scientific: true}, deci: {name: "deci", value: 0.1, scientific: false}, centi: {name: "centi", value: 0.01, scientific: false}, milli: {name: "milli", value: 1e-3, scientific: true}, micro: {name: "micro", value: 1e-6, scientific: true}, nano: {name: "nano", value: 1e-9, scientific: true}, pico: {name: "pico", value: 1e-12, scientific: true}, femto: {name: "femto", value: 1e-15, scientific: true}, atto: {name: "atto", value: 1e-18, scientific: true}, zepto: {name: "zepto", value: 1e-21, scientific: true}, yocto: {name: "yocto", value: 1e-24, scientific: true}}, SQUARED: {"": {name: "", value: 1, scientific: true}, da: {name: "da", value: 100, scientific: false}, h: {name: "h", value: 1e4, scientific: false}, k: {name: "k", value: 1e6, scientific: true}, M: {name: "M", value: 1e12, scientific: true}, G: {name: "G", value: 1e18, scientific: true}, T: {name: "T", value: 1e24, scientific: true}, P: {name: "P", value: 1e30, scientific: true}, E: {name: "E", value: 1e36, scientific: true}, Z: {name: "Z", value: 1e42, scientific: true}, Y: {name: "Y", value: 1e48, scientific: true}, d: {name: "d", value: 0.01, scientific: false}, c: {name: "c", value: 1e-4, scientific: false}, m: {name: "m", value: 1e-6, scientific: true}, u: {name: "u", value: 1e-12, scientific: true}, n: {name: "n", value: 1e-18, scientific: true}, p: {name: "p", value: 1e-24, scientific: true}, f: {name: "f", value: 1e-30, scientific: true}, a: {name: "a", value: 1e-36, scientific: true}, z: {name: "z", value: 1e-42, scientific: true}, y: {name: "y", value: 1e-48, scientific: true}}, CUBIC: {"": {name: "", value: 1, scientific: true}, da: {name: "da", value: 1e3, scientific: false}, h: {name: "h", value: 1e6, scientific: false}, k: {name: "k", value: 1e9, scientific: true}, M: {name: "M", value: 1e18, scientific: true}, G: {name: "G", value: 1e27, scientific: true}, T: {name: "T", value: 1e36, scientific: true}, P: {name: "P", value: 1e45, scientific: true}, E: {name: "E", value: 1e54, scientific: true}, Z: {name: "Z", value: 1e63, scientific: true}, Y: {name: "Y", value: 1e72, scientific: true}, d: {name: "d", value: 1e-3, scientific: false}, c: {name: "c", value: 1e-6, scientific: false}, m: {name: "m", value: 1e-9, scientific: true}, u: {name: "u", value: 1e-18, scientific: true}, n: {name: "n", value: 1e-27, scientific: true}, p: {name: "p", value: 1e-36, scientific: true}, f: {name: "f", value: 1e-45, scientific: true}, a: {name: "a", value: 1e-54, scientific: true}, z: {name: "z", value: 1e-63, scientific: true}, y: {name: "y", value: 1e-72, scientific: true}}, BINARY_SHORT_SI: {"": {name: "", value: 1, scientific: true}, k: {name: "k", value: 1e3, scientific: true}, M: {name: "M", value: 1e6, scientific: true}, G: {name: "G", value: 1e9, scientific: true}, T: {name: "T", value: 1e12, scientific: true}, P: {name: "P", value: 1e15, scientific: true}, E: {name: "E", value: 1e18, scientific: true}, Z: {name: "Z", value: 1e21, scientific: true}, Y: {name: "Y", value: 1e24, scientific: true}}, BINARY_SHORT_IEC: {"": {name: "", value: 1, scientific: true}, Ki: {name: "Ki", value: 1024, scientific: true}, Mi: {name: "Mi", value: Math.pow(1024, 2), scientific: true}, Gi: {name: "Gi", value: Math.pow(1024, 3), scientific: true}, Ti: {name: "Ti", value: Math.pow(1024, 4), scientific: true}, Pi: {name: "Pi", value: Math.pow(1024, 5), scientific: true}, Ei: {name: "Ei", value: Math.pow(1024, 6), scientific: true}, Zi: {name: "Zi", value: Math.pow(1024, 7), scientific: true}, Yi: {name: "Yi", value: Math.pow(1024, 8), scientific: true}}, BINARY_LONG_SI: {"": {name: "", value: 1, scientific: true}, kilo: {name: "kilo", value: 1e3, scientific: true}, mega: {name: "mega", value: 1e6, scientific: true}, giga: {name: "giga", value: 1e9, scientific: true}, tera: {name: "tera", value: 1e12, scientific: true}, peta: {name: "peta", value: 1e15, scientific: true}, exa: {name: "exa", value: 1e18, scientific: true}, zetta: {name: "zetta", value: 1e21, scientific: true}, yotta: {name: "yotta", value: 1e24, scientific: true}}, BINARY_LONG_IEC: {"": {name: "", value: 1, scientific: true}, kibi: {name: "kibi", value: 1024, scientific: true}, mebi: {name: "mebi", value: Math.pow(1024, 2), scientific: true}, gibi: {name: "gibi", value: Math.pow(1024, 3), scientific: true}, tebi: {name: "tebi", value: Math.pow(1024, 4), scientific: true}, pebi: {name: "pebi", value: Math.pow(1024, 5), scientific: true}, exi: {name: "exi", value: Math.pow(1024, 6), scientific: true}, zebi: {name: "zebi", value: Math.pow(1024, 7), scientific: true}, yobi: {name: "yobi", value: Math.pow(1024, 8), scientific: true}}, BTU: {"": {name: "", value: 1, scientific: true}, MM: {name: "MM", value: 1e6, scientific: true}}};
  R.SHORTLONG = Ia({}, R.SHORT, R.LONG), R.BINARY_SHORT = Ia({}, R.BINARY_SHORT_SI, R.BINARY_SHORT_IEC), R.BINARY_LONG = Ia({}, R.BINARY_LONG_SI, R.BINARY_LONG_IEC);
  var D = ["MASS", "LENGTH", "TIME", "CURRENT", "TEMPERATURE", "LUMINOUS_INTENSITY", "AMOUNT_OF_SUBSTANCE", "ANGLE", "BIT"], k = {NONE: {dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0]}, MASS: {dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0]}, LENGTH: {dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0]}, TIME: {dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0]}, CURRENT: {dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0]}, TEMPERATURE: {dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0]}, LUMINOUS_INTENSITY: {dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0]}, AMOUNT_OF_SUBSTANCE: {dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0]}, FORCE: {dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0]}, SURFACE: {dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0]}, VOLUME: {dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0]}, ENERGY: {dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0]}, POWER: {dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0]}, PRESSURE: {dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0]}, ELECTRIC_CHARGE: {dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0]}, ELECTRIC_CAPACITANCE: {dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0]}, ELECTRIC_POTENTIAL: {dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0]}, ELECTRIC_RESISTANCE: {dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0]}, ELECTRIC_INDUCTANCE: {dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0]}, ELECTRIC_CONDUCTANCE: {dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0]}, MAGNETIC_FLUX: {dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0]}, MAGNETIC_FLUX_DENSITY: {dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0]}, FREQUENCY: {dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0]}, ANGLE: {dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0]}, BIT: {dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1]}};
  for (var I in k)
    Er(k, I) && (k[I].key = I);
  var L = {name: "", base: {}, value: 1, offset: 0, dimensions: D.map((t4) => 0)}, B = {meter: {name: "meter", base: k.LENGTH, prefixes: R.LONG, value: 1, offset: 0}, inch: {name: "inch", base: k.LENGTH, prefixes: R.NONE, value: 0.0254, offset: 0}, foot: {name: "foot", base: k.LENGTH, prefixes: R.NONE, value: 0.3048, offset: 0}, yard: {name: "yard", base: k.LENGTH, prefixes: R.NONE, value: 0.9144, offset: 0}, mile: {name: "mile", base: k.LENGTH, prefixes: R.NONE, value: 1609.344, offset: 0}, link: {name: "link", base: k.LENGTH, prefixes: R.NONE, value: 0.201168, offset: 0}, rod: {name: "rod", base: k.LENGTH, prefixes: R.NONE, value: 5.0292, offset: 0}, chain: {name: "chain", base: k.LENGTH, prefixes: R.NONE, value: 20.1168, offset: 0}, angstrom: {name: "angstrom", base: k.LENGTH, prefixes: R.NONE, value: 1e-10, offset: 0}, m: {name: "m", base: k.LENGTH, prefixes: R.SHORT, value: 1, offset: 0}, in: {name: "in", base: k.LENGTH, prefixes: R.NONE, value: 0.0254, offset: 0}, ft: {name: "ft", base: k.LENGTH, prefixes: R.NONE, value: 0.3048, offset: 0}, yd: {name: "yd", base: k.LENGTH, prefixes: R.NONE, value: 0.9144, offset: 0}, mi: {name: "mi", base: k.LENGTH, prefixes: R.NONE, value: 1609.344, offset: 0}, li: {name: "li", base: k.LENGTH, prefixes: R.NONE, value: 0.201168, offset: 0}, rd: {name: "rd", base: k.LENGTH, prefixes: R.NONE, value: 5.02921, offset: 0}, ch: {name: "ch", base: k.LENGTH, prefixes: R.NONE, value: 20.1168, offset: 0}, mil: {name: "mil", base: k.LENGTH, prefixes: R.NONE, value: 254e-7, offset: 0}, m2: {name: "m2", base: k.SURFACE, prefixes: R.SQUARED, value: 1, offset: 0}, sqin: {name: "sqin", base: k.SURFACE, prefixes: R.NONE, value: 64516e-8, offset: 0}, sqft: {name: "sqft", base: k.SURFACE, prefixes: R.NONE, value: 0.09290304, offset: 0}, sqyd: {name: "sqyd", base: k.SURFACE, prefixes: R.NONE, value: 0.83612736, offset: 0}, sqmi: {name: "sqmi", base: k.SURFACE, prefixes: R.NONE, value: 2589988110336e-6, offset: 0}, sqrd: {name: "sqrd", base: k.SURFACE, prefixes: R.NONE, value: 25.29295, offset: 0}, sqch: {name: "sqch", base: k.SURFACE, prefixes: R.NONE, value: 404.6873, offset: 0}, sqmil: {name: "sqmil", base: k.SURFACE, prefixes: R.NONE, value: 64516e-14, offset: 0}, acre: {name: "acre", base: k.SURFACE, prefixes: R.NONE, value: 4046.86, offset: 0}, hectare: {name: "hectare", base: k.SURFACE, prefixes: R.NONE, value: 1e4, offset: 0}, m3: {name: "m3", base: k.VOLUME, prefixes: R.CUBIC, value: 1, offset: 0}, L: {name: "L", base: k.VOLUME, prefixes: R.SHORT, value: 1e-3, offset: 0}, l: {name: "l", base: k.VOLUME, prefixes: R.SHORT, value: 1e-3, offset: 0}, litre: {name: "litre", base: k.VOLUME, prefixes: R.LONG, value: 1e-3, offset: 0}, cuin: {name: "cuin", base: k.VOLUME, prefixes: R.NONE, value: 16387064e-12, offset: 0}, cuft: {name: "cuft", base: k.VOLUME, prefixes: R.NONE, value: 0.028316846592, offset: 0}, cuyd: {name: "cuyd", base: k.VOLUME, prefixes: R.NONE, value: 0.764554857984, offset: 0}, teaspoon: {name: "teaspoon", base: k.VOLUME, prefixes: R.NONE, value: 5e-6, offset: 0}, tablespoon: {name: "tablespoon", base: k.VOLUME, prefixes: R.NONE, value: 15e-6, offset: 0}, drop: {name: "drop", base: k.VOLUME, prefixes: R.NONE, value: 5e-8, offset: 0}, gtt: {name: "gtt", base: k.VOLUME, prefixes: R.NONE, value: 5e-8, offset: 0}, minim: {name: "minim", base: k.VOLUME, prefixes: R.NONE, value: 6161152e-14, offset: 0}, fluiddram: {name: "fluiddram", base: k.VOLUME, prefixes: R.NONE, value: 36966911e-13, offset: 0}, fluidounce: {name: "fluidounce", base: k.VOLUME, prefixes: R.NONE, value: 2957353e-11, offset: 0}, gill: {name: "gill", base: k.VOLUME, prefixes: R.NONE, value: 1182941e-10, offset: 0}, cc: {name: "cc", base: k.VOLUME, prefixes: R.NONE, value: 1e-6, offset: 0}, cup: {name: "cup", base: k.VOLUME, prefixes: R.NONE, value: 2365882e-10, offset: 0}, pint: {name: "pint", base: k.VOLUME, prefixes: R.NONE, value: 4731765e-10, offset: 0}, quart: {name: "quart", base: k.VOLUME, prefixes: R.NONE, value: 9463529e-10, offset: 0}, gallon: {name: "gallon", base: k.VOLUME, prefixes: R.NONE, value: 3785412e-9, offset: 0}, beerbarrel: {name: "beerbarrel", base: k.VOLUME, prefixes: R.NONE, value: 0.1173478, offset: 0}, oilbarrel: {name: "oilbarrel", base: k.VOLUME, prefixes: R.NONE, value: 0.1589873, offset: 0}, hogshead: {name: "hogshead", base: k.VOLUME, prefixes: R.NONE, value: 0.238481, offset: 0}, fldr: {name: "fldr", base: k.VOLUME, prefixes: R.NONE, value: 36966911e-13, offset: 0}, floz: {name: "floz", base: k.VOLUME, prefixes: R.NONE, value: 2957353e-11, offset: 0}, gi: {name: "gi", base: k.VOLUME, prefixes: R.NONE, value: 1182941e-10, offset: 0}, cp: {name: "cp", base: k.VOLUME, prefixes: R.NONE, value: 2365882e-10, offset: 0}, pt: {name: "pt", base: k.VOLUME, prefixes: R.NONE, value: 4731765e-10, offset: 0}, qt: {name: "qt", base: k.VOLUME, prefixes: R.NONE, value: 9463529e-10, offset: 0}, gal: {name: "gal", base: k.VOLUME, prefixes: R.NONE, value: 3785412e-9, offset: 0}, bbl: {name: "bbl", base: k.VOLUME, prefixes: R.NONE, value: 0.1173478, offset: 0}, obl: {name: "obl", base: k.VOLUME, prefixes: R.NONE, value: 0.1589873, offset: 0}, g: {name: "g", base: k.MASS, prefixes: R.SHORT, value: 1e-3, offset: 0}, gram: {name: "gram", base: k.MASS, prefixes: R.LONG, value: 1e-3, offset: 0}, ton: {name: "ton", base: k.MASS, prefixes: R.SHORT, value: 907.18474, offset: 0}, t: {name: "t", base: k.MASS, prefixes: R.SHORT, value: 1e3, offset: 0}, tonne: {name: "tonne", base: k.MASS, prefixes: R.LONG, value: 1e3, offset: 0}, grain: {name: "grain", base: k.MASS, prefixes: R.NONE, value: 6479891e-11, offset: 0}, dram: {name: "dram", base: k.MASS, prefixes: R.NONE, value: 0.0017718451953125, offset: 0}, ounce: {name: "ounce", base: k.MASS, prefixes: R.NONE, value: 0.028349523125, offset: 0}, poundmass: {name: "poundmass", base: k.MASS, prefixes: R.NONE, value: 0.45359237, offset: 0}, hundredweight: {name: "hundredweight", base: k.MASS, prefixes: R.NONE, value: 45.359237, offset: 0}, stick: {name: "stick", base: k.MASS, prefixes: R.NONE, value: 0.115, offset: 0}, stone: {name: "stone", base: k.MASS, prefixes: R.NONE, value: 6.35029318, offset: 0}, gr: {name: "gr", base: k.MASS, prefixes: R.NONE, value: 6479891e-11, offset: 0}, dr: {name: "dr", base: k.MASS, prefixes: R.NONE, value: 0.0017718451953125, offset: 0}, oz: {name: "oz", base: k.MASS, prefixes: R.NONE, value: 0.028349523125, offset: 0}, lbm: {name: "lbm", base: k.MASS, prefixes: R.NONE, value: 0.45359237, offset: 0}, cwt: {name: "cwt", base: k.MASS, prefixes: R.NONE, value: 45.359237, offset: 0}, s: {name: "s", base: k.TIME, prefixes: R.SHORT, value: 1, offset: 0}, min: {name: "min", base: k.TIME, prefixes: R.NONE, value: 60, offset: 0}, h: {name: "h", base: k.TIME, prefixes: R.NONE, value: 3600, offset: 0}, second: {name: "second", base: k.TIME, prefixes: R.LONG, value: 1, offset: 0}, sec: {name: "sec", base: k.TIME, prefixes: R.LONG, value: 1, offset: 0}, minute: {name: "minute", base: k.TIME, prefixes: R.NONE, value: 60, offset: 0}, hour: {name: "hour", base: k.TIME, prefixes: R.NONE, value: 3600, offset: 0}, day: {name: "day", base: k.TIME, prefixes: R.NONE, value: 86400, offset: 0}, week: {name: "week", base: k.TIME, prefixes: R.NONE, value: 604800, offset: 0}, month: {name: "month", base: k.TIME, prefixes: R.NONE, value: 2629800, offset: 0}, year: {name: "year", base: k.TIME, prefixes: R.NONE, value: 31557600, offset: 0}, decade: {name: "decade", base: k.TIME, prefixes: R.NONE, value: 315576e3, offset: 0}, century: {name: "century", base: k.TIME, prefixes: R.NONE, value: 315576e4, offset: 0}, millennium: {name: "millennium", base: k.TIME, prefixes: R.NONE, value: 315576e5, offset: 0}, hertz: {name: "Hertz", base: k.FREQUENCY, prefixes: R.LONG, value: 1, offset: 0, reciprocal: true}, Hz: {name: "Hz", base: k.FREQUENCY, prefixes: R.SHORT, value: 1, offset: 0, reciprocal: true}, rad: {name: "rad", base: k.ANGLE, prefixes: R.SHORT, value: 1, offset: 0}, radian: {name: "radian", base: k.ANGLE, prefixes: R.LONG, value: 1, offset: 0}, deg: {name: "deg", base: k.ANGLE, prefixes: R.SHORT, value: null, offset: 0}, degree: {name: "degree", base: k.ANGLE, prefixes: R.LONG, value: null, offset: 0}, grad: {name: "grad", base: k.ANGLE, prefixes: R.SHORT, value: null, offset: 0}, gradian: {name: "gradian", base: k.ANGLE, prefixes: R.LONG, value: null, offset: 0}, cycle: {name: "cycle", base: k.ANGLE, prefixes: R.NONE, value: null, offset: 0}, arcsec: {name: "arcsec", base: k.ANGLE, prefixes: R.NONE, value: null, offset: 0}, arcmin: {name: "arcmin", base: k.ANGLE, prefixes: R.NONE, value: null, offset: 0}, A: {name: "A", base: k.CURRENT, prefixes: R.SHORT, value: 1, offset: 0}, ampere: {name: "ampere", base: k.CURRENT, prefixes: R.LONG, value: 1, offset: 0}, K: {name: "K", base: k.TEMPERATURE, prefixes: R.NONE, value: 1, offset: 0}, degC: {name: "degC", base: k.TEMPERATURE, prefixes: R.NONE, value: 1, offset: 273.15}, degF: {name: "degF", base: k.TEMPERATURE, prefixes: R.NONE, value: 1 / 1.8, offset: 459.67}, degR: {name: "degR", base: k.TEMPERATURE, prefixes: R.NONE, value: 1 / 1.8, offset: 0}, kelvin: {name: "kelvin", base: k.TEMPERATURE, prefixes: R.NONE, value: 1, offset: 0}, celsius: {name: "celsius", base: k.TEMPERATURE, prefixes: R.NONE, value: 1, offset: 273.15}, fahrenheit: {name: "fahrenheit", base: k.TEMPERATURE, prefixes: R.NONE, value: 1 / 1.8, offset: 459.67}, rankine: {name: "rankine", base: k.TEMPERATURE, prefixes: R.NONE, value: 1 / 1.8, offset: 0}, mol: {name: "mol", base: k.AMOUNT_OF_SUBSTANCE, prefixes: R.SHORT, value: 1, offset: 0}, mole: {name: "mole", base: k.AMOUNT_OF_SUBSTANCE, prefixes: R.LONG, value: 1, offset: 0}, cd: {name: "cd", base: k.LUMINOUS_INTENSITY, prefixes: R.SHORT, value: 1, offset: 0}, candela: {name: "candela", base: k.LUMINOUS_INTENSITY, prefixes: R.LONG, value: 1, offset: 0}, N: {name: "N", base: k.FORCE, prefixes: R.SHORT, value: 1, offset: 0}, newton: {name: "newton", base: k.FORCE, prefixes: R.LONG, value: 1, offset: 0}, dyn: {name: "dyn", base: k.FORCE, prefixes: R.SHORT, value: 1e-5, offset: 0}, dyne: {name: "dyne", base: k.FORCE, prefixes: R.LONG, value: 1e-5, offset: 0}, lbf: {name: "lbf", base: k.FORCE, prefixes: R.NONE, value: 4.4482216152605, offset: 0}, poundforce: {name: "poundforce", base: k.FORCE, prefixes: R.NONE, value: 4.4482216152605, offset: 0}, kip: {name: "kip", base: k.FORCE, prefixes: R.LONG, value: 4448.2216, offset: 0}, kilogramforce: {name: "kilogramforce", base: k.FORCE, prefixes: R.NONE, value: 9.80665, offset: 0}, J: {name: "J", base: k.ENERGY, prefixes: R.SHORT, value: 1, offset: 0}, joule: {name: "joule", base: k.ENERGY, prefixes: R.SHORT, value: 1, offset: 0}, erg: {name: "erg", base: k.ENERGY, prefixes: R.NONE, value: 1e-7, offset: 0}, Wh: {name: "Wh", base: k.ENERGY, prefixes: R.SHORT, value: 3600, offset: 0}, BTU: {name: "BTU", base: k.ENERGY, prefixes: R.BTU, value: 1055.05585262, offset: 0}, eV: {name: "eV", base: k.ENERGY, prefixes: R.SHORT, value: 1602176565e-28, offset: 0}, electronvolt: {name: "electronvolt", base: k.ENERGY, prefixes: R.LONG, value: 1602176565e-28, offset: 0}, W: {name: "W", base: k.POWER, prefixes: R.SHORT, value: 1, offset: 0}, watt: {name: "watt", base: k.POWER, prefixes: R.LONG, value: 1, offset: 0}, hp: {name: "hp", base: k.POWER, prefixes: R.NONE, value: 745.6998715386, offset: 0}, VAR: {name: "VAR", base: k.POWER, prefixes: R.SHORT, value: v2.I, offset: 0}, VA: {name: "VA", base: k.POWER, prefixes: R.SHORT, value: 1, offset: 0}, Pa: {name: "Pa", base: k.PRESSURE, prefixes: R.SHORT, value: 1, offset: 0}, psi: {name: "psi", base: k.PRESSURE, prefixes: R.NONE, value: 6894.75729276459, offset: 0}, atm: {name: "atm", base: k.PRESSURE, prefixes: R.NONE, value: 101325, offset: 0}, bar: {name: "bar", base: k.PRESSURE, prefixes: R.SHORTLONG, value: 1e5, offset: 0}, torr: {name: "torr", base: k.PRESSURE, prefixes: R.NONE, value: 133.322, offset: 0}, mmHg: {name: "mmHg", base: k.PRESSURE, prefixes: R.NONE, value: 133.322, offset: 0}, mmH2O: {name: "mmH2O", base: k.PRESSURE, prefixes: R.NONE, value: 9.80665, offset: 0}, cmH2O: {name: "cmH2O", base: k.PRESSURE, prefixes: R.NONE, value: 98.0665, offset: 0}, coulomb: {name: "coulomb", base: k.ELECTRIC_CHARGE, prefixes: R.LONG, value: 1, offset: 0}, C: {name: "C", base: k.ELECTRIC_CHARGE, prefixes: R.SHORT, value: 1, offset: 0}, farad: {name: "farad", base: k.ELECTRIC_CAPACITANCE, prefixes: R.LONG, value: 1, offset: 0}, F: {name: "F", base: k.ELECTRIC_CAPACITANCE, prefixes: R.SHORT, value: 1, offset: 0}, volt: {name: "volt", base: k.ELECTRIC_POTENTIAL, prefixes: R.LONG, value: 1, offset: 0}, V: {name: "V", base: k.ELECTRIC_POTENTIAL, prefixes: R.SHORT, value: 1, offset: 0}, ohm: {name: "ohm", base: k.ELECTRIC_RESISTANCE, prefixes: R.SHORTLONG, value: 1, offset: 0}, henry: {name: "henry", base: k.ELECTRIC_INDUCTANCE, prefixes: R.LONG, value: 1, offset: 0}, H: {name: "H", base: k.ELECTRIC_INDUCTANCE, prefixes: R.SHORT, value: 1, offset: 0}, siemens: {name: "siemens", base: k.ELECTRIC_CONDUCTANCE, prefixes: R.LONG, value: 1, offset: 0}, S: {name: "S", base: k.ELECTRIC_CONDUCTANCE, prefixes: R.SHORT, value: 1, offset: 0}, weber: {name: "weber", base: k.MAGNETIC_FLUX, prefixes: R.LONG, value: 1, offset: 0}, Wb: {name: "Wb", base: k.MAGNETIC_FLUX, prefixes: R.SHORT, value: 1, offset: 0}, tesla: {name: "tesla", base: k.MAGNETIC_FLUX_DENSITY, prefixes: R.LONG, value: 1, offset: 0}, T: {name: "T", base: k.MAGNETIC_FLUX_DENSITY, prefixes: R.SHORT, value: 1, offset: 0}, b: {name: "b", base: k.BIT, prefixes: R.BINARY_SHORT, value: 1, offset: 0}, bits: {name: "bits", base: k.BIT, prefixes: R.BINARY_LONG, value: 1, offset: 0}, B: {name: "B", base: k.BIT, prefixes: R.BINARY_SHORT, value: 8, offset: 0}, bytes: {name: "bytes", base: k.BIT, prefixes: R.BINARY_LONG, value: 8, offset: 0}}, F = {meters: "meter", inches: "inch", feet: "foot", yards: "yard", miles: "mile", links: "link", rods: "rod", chains: "chain", angstroms: "angstrom", lt: "l", litres: "litre", liter: "litre", liters: "litre", teaspoons: "teaspoon", tablespoons: "tablespoon", minims: "minim", fluiddrams: "fluiddram", fluidounces: "fluidounce", gills: "gill", cups: "cup", pints: "pint", quarts: "quart", gallons: "gallon", beerbarrels: "beerbarrel", oilbarrels: "oilbarrel", hogsheads: "hogshead", gtts: "gtt", grams: "gram", tons: "ton", tonnes: "tonne", grains: "grain", drams: "dram", ounces: "ounce", poundmasses: "poundmass", hundredweights: "hundredweight", sticks: "stick", lb: "lbm", lbs: "lbm", kips: "kip", kgf: "kilogramforce", acres: "acre", hectares: "hectare", sqfeet: "sqft", sqyard: "sqyd", sqmile: "sqmi", sqmiles: "sqmi", mmhg: "mmHg", mmh2o: "mmH2O", cmh2o: "cmH2O", seconds: "second", secs: "second", minutes: "minute", mins: "minute", hours: "hour", hr: "hour", hrs: "hour", days: "day", weeks: "week", months: "month", years: "year", decades: "decade", centuries: "century", millennia: "millennium", hertz: "hertz", radians: "radian", degrees: "degree", gradians: "gradian", cycles: "cycle", arcsecond: "arcsec", arcseconds: "arcsec", arcminute: "arcmin", arcminutes: "arcmin", BTUs: "BTU", watts: "watt", joules: "joule", amperes: "ampere", coulombs: "coulomb", volts: "volt", ohms: "ohm", farads: "farad", webers: "weber", teslas: "tesla", electronvolts: "electronvolt", moles: "mole", bit: "bits", byte: "bytes"};
  function P(t4) {
    if (t4.number === "BigNumber") {
      var e3 = Da(x2);
      B.rad.value = new x2(1), B.deg.value = e3.div(180), B.grad.value = e3.div(200), B.cycle.value = e3.times(2), B.arcsec.value = e3.div(648e3), B.arcmin.value = e3.div(10800);
    } else
      B.rad.value = 1, B.deg.value = Math.PI / 180, B.grad.value = Math.PI / 200, B.cycle.value = 2 * Math.PI, B.arcsec.value = Math.PI / 648e3, B.arcmin.value = Math.PI / 10800;
    B.radian.value = B.rad.value, B.degree.value = B.deg.value, B.gradian.value = B.grad.value;
  }
  P(s2), i2 && i2("config", function(t4, e3) {
    t4.number !== e3.number && P(t4);
  });
  var U = {si: {NONE: {unit: L, prefix: R.NONE[""]}, LENGTH: {unit: B.m, prefix: R.SHORT[""]}, MASS: {unit: B.g, prefix: R.SHORT.k}, TIME: {unit: B.s, prefix: R.SHORT[""]}, CURRENT: {unit: B.A, prefix: R.SHORT[""]}, TEMPERATURE: {unit: B.K, prefix: R.SHORT[""]}, LUMINOUS_INTENSITY: {unit: B.cd, prefix: R.SHORT[""]}, AMOUNT_OF_SUBSTANCE: {unit: B.mol, prefix: R.SHORT[""]}, ANGLE: {unit: B.rad, prefix: R.SHORT[""]}, BIT: {unit: B.bits, prefix: R.SHORT[""]}, FORCE: {unit: B.N, prefix: R.SHORT[""]}, ENERGY: {unit: B.J, prefix: R.SHORT[""]}, POWER: {unit: B.W, prefix: R.SHORT[""]}, PRESSURE: {unit: B.Pa, prefix: R.SHORT[""]}, ELECTRIC_CHARGE: {unit: B.C, prefix: R.SHORT[""]}, ELECTRIC_CAPACITANCE: {unit: B.F, prefix: R.SHORT[""]}, ELECTRIC_POTENTIAL: {unit: B.V, prefix: R.SHORT[""]}, ELECTRIC_RESISTANCE: {unit: B.ohm, prefix: R.SHORT[""]}, ELECTRIC_INDUCTANCE: {unit: B.H, prefix: R.SHORT[""]}, ELECTRIC_CONDUCTANCE: {unit: B.S, prefix: R.SHORT[""]}, MAGNETIC_FLUX: {unit: B.Wb, prefix: R.SHORT[""]}, MAGNETIC_FLUX_DENSITY: {unit: B.T, prefix: R.SHORT[""]}, FREQUENCY: {unit: B.Hz, prefix: R.SHORT[""]}}};
  U.cgs = JSON.parse(JSON.stringify(U.si)), U.cgs.LENGTH = {unit: B.m, prefix: R.SHORT.c}, U.cgs.MASS = {unit: B.g, prefix: R.SHORT[""]}, U.cgs.FORCE = {unit: B.dyn, prefix: R.SHORT[""]}, U.cgs.ENERGY = {unit: B.erg, prefix: R.NONE[""]}, U.us = JSON.parse(JSON.stringify(U.si)), U.us.LENGTH = {unit: B.ft, prefix: R.NONE[""]}, U.us.MASS = {unit: B.lbm, prefix: R.NONE[""]}, U.us.TEMPERATURE = {unit: B.degF, prefix: R.NONE[""]}, U.us.FORCE = {unit: B.lbf, prefix: R.NONE[""]}, U.us.ENERGY = {unit: B.BTU, prefix: R.BTU[""]}, U.us.POWER = {unit: B.hp, prefix: R.NONE[""]}, U.us.PRESSURE = {unit: B.psi, prefix: R.NONE[""]}, U.auto = JSON.parse(JSON.stringify(U.si));
  var j = U.auto;
  for (var q in _2.setUnitSystem = function(t4) {
    if (!Er(U, t4))
      throw new Error("Unit system " + t4 + " does not exist. Choices are: " + Object.keys(U).join(", "));
    j = U[t4];
  }, _2.getUnitSystem = function() {
    for (var t4 in U)
      if (Er(U, t4) && U[t4] === j)
        return t4;
  }, _2.typeConverters = {BigNumber: function(t4) {
    return new x2(t4 + "");
  }, Fraction: function(t4) {
    return new w2(t4);
  }, Complex: function(t4) {
    return t4;
  }, number: function(t4) {
    return t4;
  }}, _2._getNumberConverter = function(t4) {
    if (!_2.typeConverters[t4])
      throw new TypeError('Unsupported type "' + t4 + '"');
    return _2.typeConverters[t4];
  }, B)
    if (Er(B, q)) {
      var H = B[q];
      H.dimensions = H.base.dimensions;
    }
  for (var V in F)
    if (Er(F, V)) {
      var $ = B[F[V]], G = {};
      for (var W in $)
        Er($, W) && (G[W] = $[W]);
      G.name = V, B[V] = G;
    }
  return _2.isValidAlpha = function(t4) {
    return /^[a-zA-Z]$/.test(t4);
  }, _2.createUnit = function(t4, e3) {
    if (typeof t4 != "object")
      throw new TypeError("createUnit expects first parameter to be of type 'Object'");
    if (e3 && e3.override) {
      for (var r3 in t4)
        if (Er(t4, r3) && _2.deleteUnit(r3), t4[r3].aliases)
          for (var n3 = 0; n3 < t4[r3].aliases.length; n3++)
            _2.deleteUnit(t4[r3].aliases[n3]);
    }
    var i3;
    for (var s3 in t4)
      Er(t4, s3) && (i3 = _2.createUnitSingle(s3, t4[s3]));
    return i3;
  }, _2.createUnitSingle = function(t4, e3, r3) {
    if (e3 == null && (e3 = {}), typeof t4 != "string")
      throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");
    if (Er(B, t4))
      throw new Error('Cannot create unit "' + t4 + '": a unit with that name already exists');
    !function(t5) {
      for (var e4 = 0; e4 < t5.length; e4++) {
        if (n2 = t5.charAt(e4), e4 === 0 && !_2.isValidAlpha(n2))
          throw new Error('Invalid unit name (must begin with alpha character): "' + t5 + '"');
        if (e4 > 0 && !_2.isValidAlpha(n2) && !N(n2))
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
        if (Er(B, u3[c3]))
          throw new Error('Cannot create alias "' + u3[c3] + '": a unit with that name already exists');
    }
    if (i3 && typeof i3 == "string" && !o3)
      try {
        o3 = _2.parse(i3, {allowNoUnits: true});
      } catch (S2) {
        throw S2.message = 'Could not create unit "' + t4 + '" from "' + i3 + '": ' + S2.message, S2;
      }
    else
      i3 && i3.type === "Unit" && (o3 = i3.clone());
    u3 = u3 || [], h2 = h2 || 0, s3 = s3 && s3.toUpperCase && R[s3.toUpperCase()] || R.NONE;
    var l3 = {};
    if (o3) {
      l3 = {name: t4, value: o3.value, dimensions: o3.dimensions.slice(0), prefixes: s3, offset: h2};
      var p3 = false;
      for (var f3 in k)
        if (Er(k, f3)) {
          for (var d2 = true, m3 = 0; m3 < D.length; m3++)
            if (Math.abs((l3.dimensions[m3] || 0) - (k[f3].dimensions[m3] || 0)) > 1e-12) {
              d2 = false;
              break;
            }
          if (d2) {
            p3 = true, l3.base = k[f3];
            break;
          }
        }
      if (!p3) {
        a3 = a3 || t4 + "_STUFF";
        var y3 = {dimensions: o3.dimensions.slice(0)};
        y3.key = a3, k[a3] = y3, j[a3] = {unit: l3, prefix: R.NONE[""]}, l3.base = k[a3];
      }
    } else {
      if (a3 = a3 || t4 + "_STUFF", D.indexOf(a3) >= 0)
        throw new Error('Cannot create new base unit "' + t4 + '": a base unit with that name already exists (and cannot be overridden)');
      for (var g3 in D.push(a3), k)
        Er(k, g3) && (k[g3].dimensions[D.length - 1] = 0);
      for (var v3 = {dimensions: []}, x3 = 0; x3 < D.length; x3++)
        v3.dimensions[x3] = 0;
      v3.dimensions[D.length - 1] = 1, v3.key = a3, k[a3] = v3, l3 = {name: t4, value: 1, dimensions: k[a3].dimensions.slice(0), prefixes: s3, offset: h2, base: k[a3]}, j[a3] = {unit: l3, prefix: R.NONE[""]};
    }
    _2.UNITS[t4] = l3;
    for (var w3 = 0; w3 < u3.length; w3++) {
      var b3 = u3[w3], M2 = {};
      for (var E2 in l3)
        Er(l3, E2) && (M2[E2] = l3[E2]);
      M2.name = b3, _2.UNITS[b3] = M2;
    }
    return delete C.cache, new _2(null, t4);
  }, _2.deleteUnit = function(t4) {
    delete _2.UNITS[t4];
  }, _2.PREFIXES = R, _2.BASE_DIMENSIONS = D, _2.BASE_UNITS = k, _2.UNIT_SYSTEMS = U, _2.UNITS = B, _2;
}, {isClass: true});
mn("unit", ["typed", "Unit"], (t3) => {
  var {typed: e2, Unit: r2} = t3;
  return e2("unit", {Unit: function(t4) {
    return t4.clone();
  }, string: function(t4) {
    return r2.isValuelessUnit(t4) ? new r2(null, t4) : r2.parse(t4, {allowNoUnits: true});
  }, "number | BigNumber | Fraction | Complex, string": function(t4, e3) {
    return new r2(t4, e3);
  }, "Array | Matrix": function(t4) {
    return hs(t4, this);
  }});
});
mn("createUnit", ["typed", "Unit"], (t3) => {
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
mn("add", ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix"], (t3) => {
  var {typed: e2, matrix: r2, addScalar: n2, equalScalar: i2, DenseMatrix: s2, SparseMatrix: a2} = t3, o2 = Bs({typed: e2}), u2 = Fs({typed: e2, equalScalar: i2}), h = Ps({typed: e2, DenseMatrix: s2}), c2 = Us({typed: e2}), l2 = Ds({typed: e2});
  return e2("add", xr({"DenseMatrix, DenseMatrix": function(t4, e3) {
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
var Ha = mn("dot", ["typed", "addScalar", "multiplyScalar", "conj", "size"], (t3) => {
  var {typed: e2, addScalar: r2, multiplyScalar: n2, conj: i2, size: s2} = t3;
  return e2("dot", {"Array | DenseMatrix, Array | DenseMatrix": function(t4, s3) {
    var u2 = a2(t4, s3), h = Pe(t4) ? t4._data : t4, c2 = Pe(t4) ? t4._datatype : void 0, l2 = Pe(s3) ? s3._data : s3, p2 = Pe(s3) ? s3._datatype : void 0, f2 = o2(t4).length === 2, d = o2(s3).length === 2, m2 = r2, y2 = n2;
    if (c2 && p2 && c2 === p2 && typeof c2 == "string") {
      var g2 = c2;
      m2 = e2.find(r2, [g2, g2]), y2 = e2.find(n2, [g2, g2]);
    }
    if (!f2 && !d) {
      for (var v2 = y2(i2(h[0]), l2[0]), x2 = 1; x2 < u2; x2++)
        v2 = m2(v2, y2(i2(h[x2]), l2[x2]));
      return v2;
    }
    if (!f2 && d) {
      for (var w2 = y2(i2(h[0]), l2[0][0]), b2 = 1; b2 < u2; b2++)
        w2 = m2(w2, y2(i2(h[b2]), l2[b2][0]));
      return w2;
    }
    if (f2 && !d) {
      for (var _2 = y2(i2(h[0][0]), l2[0]), M = 1; M < u2; M++)
        _2 = m2(_2, y2(i2(h[M][0]), l2[M]));
      return _2;
    }
    if (f2 && d) {
      for (var N = y2(i2(h[0][0]), l2[0][0]), E = 1; E < u2; E++)
        N = m2(N, y2(i2(h[E][0]), l2[E][0]));
      return N;
    }
  }, "SparseMatrix, SparseMatrix": function(t4, e3) {
    a2(t4, e3);
    var i3 = t4._index, s3 = t4._values, o3 = e3._index, u2 = e3._values, h = 0, c2 = r2, l2 = n2, p2 = 0, f2 = 0;
    for (; p2 < i3.length && f2 < o3.length; ) {
      var d = i3[p2], m2 = o3[f2];
      d < m2 ? p2++ : d > m2 ? f2++ : d === m2 && (h = c2(h, l2(s3[p2], u2[f2])), p2++, f2++);
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
    return Pe(t4) ? t4.size() : s2(t4);
  }
}), Va = {end: true}, $a = mn("Node", ["mathWithTransform"], (t3) => {
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
          if (Er(t5, e4) && e4 in Va)
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
    if (!hr(t4))
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
    return !!t4 && br(this, t4);
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
function Ga(t3) {
  return t3 && t3.isIndexError ? new Kr(t3.index + 1, t3.min + 1, t3.max !== void 0 ? t3.max + 1 : void 0) : t3;
}
function Wa(t3) {
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
        return sa(t4, r2.getObjectProperty());
      }
      throw new TypeError("Cannot apply index: unsupported type of object");
    } catch (n2) {
      throw Ga(n2);
    }
  };
}
var Ya = mn("AccessorNode", ["subset", "Node"], (t3) => {
  var {subset: e2, Node: r2} = t3, n2 = Wa({subset: e2});
  function i2(t4, e3) {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!hr(t4))
      throw new TypeError('Node expected for parameter "object"');
    if (!ur(e3))
      throw new TypeError('IndexNode expected for parameter "index"');
    this.object = t4 || null, this.index = e3, Object.defineProperty(this, "name", {get: function() {
      return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
    }.bind(this), set: function() {
      throw new Error("Cannot assign a new name, name is read-only");
    }});
  }
  function s2(t4) {
    return !(tr(t4) || er(t4) || sr(t4) || or(t4) || cr(t4) || pr(t4) || dr(t4));
  }
  return i2.prototype = new r2(), i2.prototype.type = "AccessorNode", i2.prototype.isAccessorNode = true, i2.prototype._compile = function(t4, e3) {
    var r3 = this.object._compile(t4, e3), i3 = this.index._compile(t4, e3);
    if (this.index.isObjectProperty()) {
      var s3 = this.index.getObjectProperty();
      return function(t5, e4, n3) {
        return sa(r3(t5, e4, n3), s3);
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
}, {isClass: true, isNode: true}), Za = mn("ArrayNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (this.items = t4 || [], !Array.isArray(this.items) || !this.items.every(hr))
      throw new TypeError("Array containing Nodes expected");
  }
  return r2.prototype = new e2(), r2.prototype.type = "ArrayNode", r2.prototype.isArrayNode = true, r2.prototype._compile = function(t4, e3) {
    var r3 = cn(this.items, function(r4) {
      return r4._compile(t4, e3);
    });
    if (t4.config.matrix !== "Array") {
      var n2 = t4.matrix;
      return function(t5, e4, i2) {
        return n2(cn(r3, function(r4) {
          return r4(t5, e4, i2);
        }));
      };
    }
    return function(t5, e4, n3) {
      return cn(r3, function(r4) {
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
var Xa = [{AssignmentNode: {}, FunctionAssignmentNode: {}}, {ConditionalNode: {latexLeftParens: false, latexRightParens: false, latexParens: false}}, {"OperatorNode:or": {associativity: "left", associativeWith: []}}, {"OperatorNode:xor": {associativity: "left", associativeWith: []}}, {"OperatorNode:and": {associativity: "left", associativeWith: []}}, {"OperatorNode:bitOr": {associativity: "left", associativeWith: []}}, {"OperatorNode:bitXor": {associativity: "left", associativeWith: []}}, {"OperatorNode:bitAnd": {associativity: "left", associativeWith: []}}, {"OperatorNode:equal": {associativity: "left", associativeWith: []}, "OperatorNode:unequal": {associativity: "left", associativeWith: []}, "OperatorNode:smaller": {associativity: "left", associativeWith: []}, "OperatorNode:larger": {associativity: "left", associativeWith: []}, "OperatorNode:smallerEq": {associativity: "left", associativeWith: []}, "OperatorNode:largerEq": {associativity: "left", associativeWith: []}, RelationalNode: {associativity: "left", associativeWith: []}}, {"OperatorNode:leftShift": {associativity: "left", associativeWith: []}, "OperatorNode:rightArithShift": {associativity: "left", associativeWith: []}, "OperatorNode:rightLogShift": {associativity: "left", associativeWith: []}}, {"OperatorNode:to": {associativity: "left", associativeWith: []}}, {RangeNode: {}}, {"OperatorNode:add": {associativity: "left", associativeWith: ["OperatorNode:add", "OperatorNode:subtract"]}, "OperatorNode:subtract": {associativity: "left", associativeWith: []}}, {"OperatorNode:multiply": {associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"]}, "OperatorNode:divide": {associativity: "left", associativeWith: [], latexLeftParens: false, latexRightParens: false, latexParens: false}, "OperatorNode:dotMultiply": {associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "OperatorNode:dotMultiply", "OperatorNode:doDivide"]}, "OperatorNode:dotDivide": {associativity: "left", associativeWith: []}, "OperatorNode:mod": {associativity: "left", associativeWith: []}}, {"OperatorNode:unaryPlus": {associativity: "right"}, "OperatorNode:unaryMinus": {associativity: "right"}, "OperatorNode:bitNot": {associativity: "right"}, "OperatorNode:not": {associativity: "right"}}, {"OperatorNode:pow": {associativity: "right", associativeWith: [], latexRightParens: false}, "OperatorNode:dotPow": {associativity: "right", associativeWith: []}}, {"OperatorNode:factorial": {associativity: "left"}}, {"OperatorNode:transpose": {associativity: "left"}}];
function Qa(t3, e2) {
  var r2 = t3;
  e2 !== "keep" && (r2 = t3.getContent());
  for (var n2 = r2.getIdentifier(), i2 = 0; i2 < Xa.length; i2++)
    if (n2 in Xa[i2])
      return i2;
  return null;
}
function Ja(t3, e2) {
  var r2 = t3;
  e2 !== "keep" && (r2 = t3.getContent());
  var n2 = r2.getIdentifier(), i2 = Qa(r2, e2);
  if (i2 === null)
    return null;
  var s2 = Xa[i2][n2];
  if (Er(s2, "associativity")) {
    if (s2.associativity === "left")
      return "left";
    if (s2.associativity === "right")
      return "right";
    throw Error("'" + n2 + "' has the invalid associativity '" + s2.associativity + "'.");
  }
  return null;
}
function Ka(t3, e2, r2) {
  var n2 = r2 !== "keep" ? t3.getContent() : t3, i2 = r2 !== "keep" ? t3.getContent() : e2, s2 = n2.getIdentifier(), a2 = i2.getIdentifier(), o2 = Qa(n2, r2);
  if (o2 === null)
    return null;
  var u2 = Xa[o2][s2];
  if (Er(u2, "associativeWith") && u2.associativeWith instanceof Array) {
    for (var h = 0; h < u2.associativeWith.length; h++)
      if (u2.associativeWith[h] === a2)
        return true;
    return false;
  }
  return null;
}
var to = mn("AssignmentNode", ["subset", "?matrix", "Node"], (t3) => {
  var {subset: e2, matrix: r2, Node: n2} = t3, i2 = Wa({subset: e2}), s2 = function(t4) {
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
          return aa(t5, n3.getObjectProperty(), i3), t5;
        }
        throw new TypeError("Cannot apply index: unsupported type of object");
      } catch (s3) {
        throw Ga(s3);
      }
    };
  }({subset: e2, matrix: r2});
  function a2(t4, e3, r3) {
    if (!(this instanceof a2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (this.object = t4, this.index = r3 ? e3 : null, this.value = r3 || e3, !dr(t4) && !tr(t4))
      throw new TypeError('SymbolNode or AccessorNode expected as "object"');
    if (dr(t4) && t4.name === "end")
      throw new Error('Cannot assign to symbol "end"');
    if (this.index && !ur(this.index))
      throw new TypeError('IndexNode expected as "index"');
    if (!hr(this.value))
      throw new TypeError('Node expected as "value"');
    Object.defineProperty(this, "name", {get: function() {
      return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
    }.bind(this), set: function() {
      throw new Error("Cannot assign a new name, name is read-only");
    }});
  }
  function o2(t4, e3) {
    e3 || (e3 = "keep");
    var r3 = Qa(t4, e3), n3 = Qa(t4.value, e3);
    return e3 === "all" || n3 !== null && n3 <= r3;
  }
  return a2.prototype = new n2(), a2.prototype.type = "AssignmentNode", a2.prototype.isAssignmentNode = true, a2.prototype._compile = function(t4, e3) {
    var r3 = this.object._compile(t4, e3), n3 = this.index ? this.index._compile(t4, e3) : null, a3 = this.value._compile(t4, e3), o3 = this.object.name;
    if (this.index) {
      if (this.index.isObjectProperty()) {
        var u2 = this.index.getObjectProperty();
        return function(t5, e4, n4) {
          var i3 = r3(t5, e4, n4), s3 = a3(t5, e4, n4);
          return aa(i3, u2, s3);
        };
      }
      if (dr(this.object))
        return function(t5, e4, i3) {
          var u3 = r3(t5, e4, i3), h2 = a3(t5, e4, i3), c3 = n3(t5, e4, u3);
          return aa(t5, o3, s2(u3, c3, h2)), h2;
        };
      var h = this.object.object._compile(t4, e3);
      if (this.object.index.isObjectProperty()) {
        var c2 = this.object.index.getObjectProperty();
        return function(t5, e4, r4) {
          var i3 = h(t5, e4, r4), o4 = sa(i3, c2), u3 = n3(t5, e4, o4), l3 = a3(t5, e4, r4);
          return aa(i3, c2, s2(o4, u3, l3)), l3;
        };
      }
      var l2 = this.object.index._compile(t4, e3);
      return function(t5, e4, r4) {
        var o4 = h(t5, e4, r4), u3 = l2(t5, e4, o4), c3 = i2(o4, u3), p2 = n3(t5, e4, c3), f2 = a3(t5, e4, r4);
        return s2(o4, u3, s2(c3, p2, f2)), f2;
      };
    }
    if (!dr(this.object))
      throw new TypeError("SymbolNode expected as object");
    return function(t5, e4, r4) {
      return aa(t5, o3, a3(t5, e4, r4));
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
}, {isClass: true, isNode: true}), eo = mn("BlockNode", ["ResultSet", "Node"], (t3) => {
  var {ResultSet: e2, Node: r2} = t3;
  function n2(t4) {
    if (!(this instanceof n2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!Array.isArray(t4))
      throw new Error("Array expected");
    this.blocks = t4.map(function(t5) {
      var e3 = t5 && t5.node, r3 = !t5 || t5.visible === void 0 || t5.visible;
      if (!hr(e3))
        throw new TypeError('Property "node" must be a Node');
      if (typeof r3 != "boolean")
        throw new TypeError('Property "visible" must be a boolean');
      return {node: e3, visible: r3};
    });
  }
  return n2.prototype = new r2(), n2.prototype.type = "BlockNode", n2.prototype.isBlockNode = true, n2.prototype._compile = function(t4, r3) {
    var n3 = cn(this.blocks, function(e3) {
      return {evaluate: e3.node._compile(t4, r3), visible: e3.visible};
    });
    return function(t5, r4, i2) {
      var s2 = [];
      return ln(n3, function(e3) {
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
}, {isClass: true, isNode: true}), ro = mn("ConditionalNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4, e3, n2) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!hr(t4))
      throw new TypeError("Parameter condition must be a Node");
    if (!hr(e3))
      throw new TypeError("Parameter trueExpr must be a Node");
    if (!hr(n2))
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
          if (De(t6))
            return !t6.isZero();
          if (ke(t6))
            return !(!t6.re && !t6.im);
          if (Le(t6))
            return !!t6.value;
        }
        if (t6 == null)
          return false;
        throw new TypeError('Unsupported type of condition "' + yr(t6) + '"');
      }(r3(t5, e4, s2)) ? n2(t5, e4, s2) : i2(t5, e4, s2);
    };
  }, r2.prototype.forEach = function(t4) {
    t4(this.condition, "condition", this), t4(this.trueExpr, "trueExpr", this), t4(this.falseExpr, "falseExpr", this);
  }, r2.prototype.map = function(t4) {
    return new r2(this._ifNode(t4(this.condition, "condition", this)), this._ifNode(t4(this.trueExpr, "trueExpr", this)), this._ifNode(t4(this.falseExpr, "falseExpr", this)));
  }, r2.prototype.clone = function() {
    return new r2(this.condition, this.trueExpr, this.falseExpr);
  }, r2.prototype._toString = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Qa(this, e3), n2 = this.condition.toString(t4), i2 = Qa(this.condition, e3);
    (e3 === "all" || this.condition.type === "OperatorNode" || i2 !== null && i2 <= r3) && (n2 = "(" + n2 + ")");
    var s2 = this.trueExpr.toString(t4), a2 = Qa(this.trueExpr, e3);
    (e3 === "all" || this.trueExpr.type === "OperatorNode" || a2 !== null && a2 <= r3) && (s2 = "(" + s2 + ")");
    var o2 = this.falseExpr.toString(t4), u2 = Qa(this.falseExpr, e3);
    return (e3 === "all" || this.falseExpr.type === "OperatorNode" || u2 !== null && u2 <= r3) && (o2 = "(" + o2 + ")"), n2 + " ? " + s2 + " : " + o2;
  }, r2.prototype.toJSON = function() {
    return {mathjs: "ConditionalNode", condition: this.condition, trueExpr: this.trueExpr, falseExpr: this.falseExpr};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.condition, t4.trueExpr, t4.falseExpr);
  }, r2.prototype.toHTML = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Qa(this, e3), n2 = this.condition.toHTML(t4), i2 = Qa(this.condition, e3);
    (e3 === "all" || this.condition.type === "OperatorNode" || i2 !== null && i2 <= r3) && (n2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + n2 + '<span class="math-parenthesis math-round-parenthesis">)</span>');
    var s2 = this.trueExpr.toHTML(t4), a2 = Qa(this.trueExpr, e3);
    (e3 === "all" || this.trueExpr.type === "OperatorNode" || a2 !== null && a2 <= r3) && (s2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + s2 + '<span class="math-parenthesis math-round-parenthesis">)</span>');
    var o2 = this.falseExpr.toHTML(t4), u2 = Qa(this.falseExpr, e3);
    return (e3 === "all" || this.falseExpr.type === "OperatorNode" || u2 !== null && u2 <= r3) && (o2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + o2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), n2 + '<span class="math-operator math-conditional-operator">?</span>' + s2 + '<span class="math-operator math-conditional-operator">:</span>' + o2;
  }, r2.prototype._toTex = function(t4) {
    return "\\begin{cases} {" + this.trueExpr.toTex(t4) + "}, &\\quad{\\text{if }\\;" + this.condition.toTex(t4) + "}\\\\{" + this.falseExpr.toTex(t4) + "}, &\\quad{\\text{otherwise}}\\end{cases}";
  }, r2;
}, {isClass: true, isNode: true}), no = Object.assign || function(t3) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var r2 = arguments[e2];
    for (var n2 in r2)
      Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
  }
  return t3;
}, io = {"{": "\\{", "}": "\\}", "\\": "\\textbackslash{}", "#": "\\#", $: "\\$", "%": "\\%", "&": "\\&", "^": "\\textasciicircum{}", _: "\\_", "~": "\\textasciitilde{}"}, so = {"\u2013": "\\--", "\u2014": "\\---", " ": "~", "	": "\\qquad{}", "\r\n": "\\newline{}", "\n": "\\newline{}"}, ao = function(t3, e2) {
  return no({}, t3, e2);
}, oo = {Alpha: "A", alpha: "\\alpha", Beta: "B", beta: "\\beta", Gamma: "\\Gamma", gamma: "\\gamma", Delta: "\\Delta", delta: "\\delta", Epsilon: "E", epsilon: "\\epsilon", varepsilon: "\\varepsilon", Zeta: "Z", zeta: "\\zeta", Eta: "H", eta: "\\eta", Theta: "\\Theta", theta: "\\theta", vartheta: "\\vartheta", Iota: "I", iota: "\\iota", Kappa: "K", kappa: "\\kappa", varkappa: "\\varkappa", Lambda: "\\Lambda", lambda: "\\lambda", Mu: "M", mu: "\\mu", Nu: "N", nu: "\\nu", Xi: "\\Xi", xi: "\\xi", Omicron: "O", omicron: "o", Pi: "\\Pi", pi: "\\pi", varpi: "\\varpi", Rho: "P", rho: "\\rho", varrho: "\\varrho", Sigma: "\\Sigma", sigma: "\\sigma", varsigma: "\\varsigma", Tau: "T", tau: "\\tau", Upsilon: "\\Upsilon", upsilon: "\\upsilon", Phi: "\\Phi", phi: "\\phi", varphi: "\\varphi", Chi: "X", chi: "\\chi", Psi: "\\Psi", psi: "\\psi", Omega: "\\Omega", omega: "\\omega", true: "\\mathrm{True}", false: "\\mathrm{False}", i: "i", inf: "\\infty", Inf: "\\infty", infinity: "\\infty", Infinity: "\\infty", oo: "\\infty", lim: "\\lim", undefined: "\\mathbf{?}"}, uo = {transpose: "^\\top", ctranspose: "^H", factorial: "!", pow: "^", dotPow: ".^\\wedge", unaryPlus: "+", unaryMinus: "-", bitNot: "\\~", not: "\\neg", multiply: "\\cdot", divide: "\\frac", dotMultiply: ".\\cdot", dotDivide: ".:", mod: "\\mod", add: "+", subtract: "-", to: "\\rightarrow", leftShift: "<<", rightArithShift: ">>", rightLogShift: ">>>", equal: "=", unequal: "\\neq", smaller: "<", larger: ">", smallerEq: "\\leq", largerEq: "\\geq", bitAnd: "\\&", bitXor: "\\underline{|}", bitOr: "|", and: "\\wedge", xor: "\\veebar", or: "\\vee"}, ho = {abs: {1: "\\left|${args[0]}\\right|"}, add: {2: "\\left(${args[0]}".concat(uo.add, "${args[1]}\\right)")}, cbrt: {1: "\\sqrt[3]{${args[0]}}"}, ceil: {1: "\\left\\lceil${args[0]}\\right\\rceil"}, cube: {1: "\\left(${args[0]}\\right)^3"}, divide: {2: "\\frac{${args[0]}}{${args[1]}}"}, dotDivide: {2: "\\left(${args[0]}".concat(uo.dotDivide, "${args[1]}\\right)")}, dotMultiply: {2: "\\left(${args[0]}".concat(uo.dotMultiply, "${args[1]}\\right)")}, dotPow: {2: "\\left(${args[0]}".concat(uo.dotPow, "${args[1]}\\right)")}, exp: {1: "\\exp\\left(${args[0]}\\right)"}, expm1: "\\left(e".concat(uo.pow, "{${args[0]}}-1\\right)"), fix: {1: "\\mathrm{${name}}\\left(${args[0]}\\right)"}, floor: {1: "\\left\\lfloor${args[0]}\\right\\rfloor"}, gcd: "\\gcd\\left(${args}\\right)", hypot: "\\hypot\\left(${args}\\right)", log: {1: "\\ln\\left(${args[0]}\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}\\right)"}, log10: {1: "\\log_{10}\\left(${args[0]}\\right)"}, log1p: {1: "\\ln\\left(${args[0]}+1\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}+1\\right)"}, log2: "\\log_{2}\\left(${args[0]}\\right)", mod: {2: "\\left(${args[0]}".concat(uo.mod, "${args[1]}\\right)")}, multiply: {2: "\\left(${args[0]}".concat(uo.multiply, "${args[1]}\\right)")}, norm: {1: "\\left\\|${args[0]}\\right\\|", 2: void 0}, nthRoot: {2: "\\sqrt[${args[1]}]{${args[0]}}"}, nthRoots: {2: "\\{y : $y^{args[1]} = {${args[0]}}\\}"}, pow: {2: "\\left(${args[0]}\\right)".concat(uo.pow, "{${args[1]}}")}, round: {1: "\\left\\lfloor${args[0]}\\right\\rceil", 2: void 0}, sign: {1: "\\mathrm{${name}}\\left(${args[0]}\\right)"}, sqrt: {1: "\\sqrt{${args[0]}}"}, square: {1: "\\left(${args[0]}\\right)^2"}, subtract: {2: "\\left(${args[0]}".concat(uo.subtract, "${args[1]}\\right)")}, unaryMinus: {1: "".concat(uo.unaryMinus, "\\left(${args[0]}\\right)")}, unaryPlus: {1: "".concat(uo.unaryPlus, "\\left(${args[0]}\\right)")}, bitAnd: {2: "\\left(${args[0]}".concat(uo.bitAnd, "${args[1]}\\right)")}, bitNot: {1: uo.bitNot + "\\left(${args[0]}\\right)"}, bitOr: {2: "\\left(${args[0]}".concat(uo.bitOr, "${args[1]}\\right)")}, bitXor: {2: "\\left(${args[0]}".concat(uo.bitXor, "${args[1]}\\right)")}, leftShift: {2: "\\left(${args[0]}".concat(uo.leftShift, "${args[1]}\\right)")}, rightArithShift: {2: "\\left(${args[0]}".concat(uo.rightArithShift, "${args[1]}\\right)")}, rightLogShift: {2: "\\left(${args[0]}".concat(uo.rightLogShift, "${args[1]}\\right)")}, bellNumbers: {1: "\\mathrm{B}_{${args[0]}}"}, catalan: {1: "\\mathrm{C}_{${args[0]}}"}, stirlingS2: {2: "\\mathrm{S}\\left(${args}\\right)"}, arg: {1: "\\arg\\left(${args[0]}\\right)"}, conj: {1: "\\left(${args[0]}\\right)^*"}, im: {1: "\\Im\\left\\lbrace${args[0]}\\right\\rbrace"}, re: {1: "\\Re\\left\\lbrace${args[0]}\\right\\rbrace"}, and: {2: "\\left(${args[0]}".concat(uo.and, "${args[1]}\\right)")}, not: {1: uo.not + "\\left(${args[0]}\\right)"}, or: {2: "\\left(${args[0]}".concat(uo.or, "${args[1]}\\right)")}, xor: {2: "\\left(${args[0]}".concat(uo.xor, "${args[1]}\\right)")}, cross: {2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"}, ctranspose: {1: "\\left(${args[0]}\\right)".concat(uo.ctranspose)}, det: {1: "\\det\\left(${args[0]}\\right)"}, dot: {2: "\\left(${args[0]}\\cdot${args[1]}\\right)"}, expm: {1: "\\exp\\left(${args[0]}\\right)"}, inv: {1: "\\left(${args[0]}\\right)^{-1}"}, sqrtm: {1: "{${args[0]}}".concat(uo.pow, "{\\frac{1}{2}}")}, trace: {1: "\\mathrm{tr}\\left(${args[0]}\\right)"}, transpose: {1: "\\left(${args[0]}\\right)".concat(uo.transpose)}, combinations: {2: "\\binom{${args[0]}}{${args[1]}}"}, combinationsWithRep: {2: "\\left(\\!\\!{\\binom{${args[0]}}{${args[1]}}}\\!\\!\\right)"}, factorial: {1: "\\left(${args[0]}\\right)".concat(uo.factorial)}, gamma: {1: "\\Gamma\\left(${args[0]}\\right)"}, equal: {2: "\\left(${args[0]}".concat(uo.equal, "${args[1]}\\right)")}, larger: {2: "\\left(${args[0]}".concat(uo.larger, "${args[1]}\\right)")}, largerEq: {2: "\\left(${args[0]}".concat(uo.largerEq, "${args[1]}\\right)")}, smaller: {2: "\\left(${args[0]}".concat(uo.smaller, "${args[1]}\\right)")}, smallerEq: {2: "\\left(${args[0]}".concat(uo.smallerEq, "${args[1]}\\right)")}, unequal: {2: "\\left(${args[0]}".concat(uo.unequal, "${args[1]}\\right)")}, erf: {1: "erf\\left(${args[0]}\\right)"}, max: "\\max\\left(${args}\\right)", min: "\\min\\left(${args}\\right)", variance: "\\mathrm{Var}\\left(${args}\\right)", acos: {1: "\\cos^{-1}\\left(${args[0]}\\right)"}, acosh: {1: "\\cosh^{-1}\\left(${args[0]}\\right)"}, acot: {1: "\\cot^{-1}\\left(${args[0]}\\right)"}, acoth: {1: "\\coth^{-1}\\left(${args[0]}\\right)"}, acsc: {1: "\\csc^{-1}\\left(${args[0]}\\right)"}, acsch: {1: "\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"}, asec: {1: "\\sec^{-1}\\left(${args[0]}\\right)"}, asech: {1: "\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"}, asin: {1: "\\sin^{-1}\\left(${args[0]}\\right)"}, asinh: {1: "\\sinh^{-1}\\left(${args[0]}\\right)"}, atan: {1: "\\tan^{-1}\\left(${args[0]}\\right)"}, atan2: {2: "\\mathrm{atan2}\\left(${args}\\right)"}, atanh: {1: "\\tanh^{-1}\\left(${args[0]}\\right)"}, cos: {1: "\\cos\\left(${args[0]}\\right)"}, cosh: {1: "\\cosh\\left(${args[0]}\\right)"}, cot: {1: "\\cot\\left(${args[0]}\\right)"}, coth: {1: "\\coth\\left(${args[0]}\\right)"}, csc: {1: "\\csc\\left(${args[0]}\\right)"}, csch: {1: "\\mathrm{csch}\\left(${args[0]}\\right)"}, sec: {1: "\\sec\\left(${args[0]}\\right)"}, sech: {1: "\\mathrm{sech}\\left(${args[0]}\\right)"}, sin: {1: "\\sin\\left(${args[0]}\\right)"}, sinh: {1: "\\sinh\\left(${args[0]}\\right)"}, tan: {1: "\\tan\\left(${args[0]}\\right)"}, tanh: {1: "\\tanh\\left(${args[0]}\\right)"}, to: {2: "\\left(${args[0]}".concat(uo.to, "${args[1]}\\right)")}, numeric: function(t3, e2) {
  return t3.args[0].toTex();
}, number: {0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"}, string: {0: '\\mathtt{""}', 1: "\\mathrm{string}\\left(${args[0]}\\right)"}, bignumber: {0: "0", 1: "\\left(${args[0]}\\right)"}, complex: {0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)+".concat(oo.i, "\\cdot\\left(${args[1]}\\right)\\right)")}, matrix: {0: "\\begin{bmatrix}\\end{bmatrix}", 1: "\\left(${args[0]}\\right)", 2: "\\left(${args[0]}\\right)"}, sparse: {0: "\\begin{bsparse}\\end{bsparse}", 1: "\\left(${args[0]}\\right)"}, unit: {1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"}}, co = {deg: "^\\circ"};
function lo(t3) {
  return function(t4) {
    for (var e2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r2 = e2.preserveFormatting, n2 = r2 !== void 0 && r2, i2 = e2.escapeMapFn, s2 = i2 === void 0 ? ao : i2, a2 = String(t4), o2 = "", u2 = s2(no({}, io), n2 ? no({}, so) : {}), h = Object.keys(u2), c2 = function() {
      var t5 = false;
      h.forEach(function(e3, r3) {
        t5 || a2.length >= e3.length && a2.slice(0, e3.length) === e3 && (o2 += u2[h[r3]], a2 = a2.slice(e3.length, a2.length), t5 = true);
      }), t5 || (o2 += a2.slice(0, 1), a2 = a2.slice(1, a2.length));
    }; a2; )
      c2();
    return o2;
  }(t3, {preserveFormatting: true});
}
function po(t3, e2) {
  return (e2 = e2 !== void 0 && e2) ? Er(co, t3) ? co[t3] : "\\mathrm{" + lo(t3) + "}" : Er(oo, t3) ? oo[t3] : lo(t3);
}
var fo = mn("ConstantNode", ["Node"], (t3) => {
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
    return Yr(this.value, t4);
  }, r2.prototype.toHTML = function(t4) {
    var e3 = this._toString(t4);
    switch (yr(this.value)) {
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
    switch (yr(this.value)) {
      case "string":
        return "\\mathtt{" + lo(e3) + "}";
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
}, {isClass: true, isNode: true}), mo = mn("FunctionAssignmentNode", ["typed", "Node"], (t3) => {
  var {typed: e2, Node: r2} = t3;
  function n2(t4, e3, r3) {
    if (!(this instanceof n2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (typeof t4 != "string")
      throw new TypeError('String expected for parameter "name"');
    if (!Array.isArray(e3))
      throw new TypeError('Array containing strings or objects expected for parameter "params"');
    if (!hr(r3))
      throw new TypeError('Node expected for parameter "expr"');
    if (t4 in Va)
      throw new Error('Illegal function name, "' + t4 + '" is a reserved keyword');
    this.name = t4, this.params = e3.map(function(t5) {
      return t5 && t5.name || t5;
    }), this.types = e3.map(function(t5) {
      return t5 && t5.type || "any";
    }), this.expr = r3;
  }
  function i2(t4, e3) {
    var r3 = Qa(t4, e3), n3 = Qa(t4.expr, e3);
    return e3 === "all" || n3 !== null && n3 <= r3;
  }
  return n2.prototype = new r2(), n2.prototype.type = "FunctionAssignmentNode", n2.prototype.isFunctionAssignmentNode = true, n2.prototype._compile = function(t4, r3) {
    var n3 = Object.create(r3);
    ln(this.params, function(t5) {
      n3[t5] = true;
    });
    var i3 = this.expr._compile(t4, n3), s2 = this.name, a2 = this.params, o2 = pn(this.types, ","), u2 = s2 + "(" + pn(this.params, ", ") + ")";
    return function(t5, r4, n4) {
      var h = {};
      h[o2] = function() {
        for (var e3 = Object.create(r4), s3 = 0; s3 < a2.length; s3++)
          e3[a2[s3]] = arguments[s3];
        return i3(t5, e3, n4);
      };
      var c2 = e2(s2, h);
      return c2.syntax = u2, aa(t5, s2, c2), c2;
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
      r3.push('<span class="math-symbol math-parameter">' + Xr(this.params[n3]) + "</span>");
    var s2 = this.expr.toHTML(t4);
    return i2(this, e3) && (s2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + s2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), '<span class="math-function">' + Xr(this.name) + '</span><span class="math-parenthesis math-round-parenthesis">(</span>' + r3.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + s2;
  }, n2.prototype._toTex = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = this.expr.toTex(t4);
    return i2(this, e3) && (r3 = "\\left(".concat(r3, "\\right)")), "\\mathrm{" + this.name + "}\\left(" + this.params.map(po).join(",") + "\\right):=" + r3;
  }, n2;
}, {isClass: true, isNode: true}), yo = mn("IndexNode", ["Range", "Node", "size"], (t3) => {
  var {Range: e2, Node: r2, size: n2} = t3;
  function i2(t4, e3) {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (this.dimensions = t4, this.dotNotation = e3 || false, !Array.isArray(t4) || !t4.every(hr))
      throw new TypeError('Array containing Nodes expected for parameter "dimensions"');
    if (this.dotNotation && !this.isObjectProperty())
      throw new Error("dotNotation only applicable for object properties");
  }
  function s2(t4, r3, n3) {
    return new e2(De(t4) ? t4.toNumber() : t4, De(r3) ? r3.toNumber() : r3, De(n3) ? n3.toNumber() : n3);
  }
  return i2.prototype = new r2(), i2.prototype.type = "IndexNode", i2.prototype.isIndexNode = true, i2.prototype._compile = function(t4, e3) {
    var r3 = cn(this.dimensions, function(r4, i4) {
      if (fr(r4)) {
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
      if (dr(r4) && r4.name === "end") {
        var f2 = Object.create(e3);
        f2.end = true;
        var d = r4._compile(t4, f2);
        return function(t5, e4, r5) {
          var s3 = n2(r5).valueOf(), a3 = Object.create(e4);
          return a3.end = s3[i4], d(t5, a3, r5);
        };
      }
      var m2 = r4._compile(t4, e3);
      return function(t5, e4, r5) {
        return m2(t5, e4, r5);
      };
    }), i3 = sa(t4, "index");
    return function(t5, e4, n3) {
      var s3 = cn(r3, function(r4) {
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
    return this.dimensions.length === 1 && sr(this.dimensions[0]) && typeof this.dimensions[0].value == "string";
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
    return this.dotNotation ? '<span class="math-operator math-accessor-operator">.</span><span class="math-symbol math-property">' + Xr(this.getObjectProperty()) + "</span>" : '<span class="math-parenthesis math-square-parenthesis">[</span>' + e3.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
  }, i2.prototype._toTex = function(t4) {
    var e3 = this.dimensions.map(function(e4) {
      return e4.toTex(t4);
    });
    return this.dotNotation ? "." + this.getObjectProperty() : "_{" + e3.join(",") + "}";
  }, i2;
}, {isClass: true, isNode: true}), go = mn("ObjectNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (this.properties = t4 || {}, t4 && (typeof t4 != "object" || !Object.keys(t4).every(function(e3) {
      return hr(t4[e3]);
    })))
      throw new TypeError("Object containing Nodes expected");
  }
  return r2.prototype = new e2(), r2.prototype.type = "ObjectNode", r2.prototype.isObjectNode = true, r2.prototype._compile = function(t4, e3) {
    var r3 = {};
    for (var n2 in this.properties)
      if (Er(this.properties, n2)) {
        var i2 = Zr(n2), s2 = JSON.parse(i2);
        if (!oa(this.properties, s2))
          throw new Error('No access to property "' + s2 + '"');
        r3[s2] = this.properties[n2]._compile(t4, e3);
      }
    return function(t5, e4, n3) {
      var i3 = {};
      for (var s3 in r3)
        Er(r3, s3) && (i3[s3] = r3[s3](t5, e4, n3));
      return i3;
    };
  }, r2.prototype.forEach = function(t4) {
    for (var e3 in this.properties)
      Er(this.properties, e3) && t4(this.properties[e3], "properties[" + Zr(e3) + "]", this);
  }, r2.prototype.map = function(t4) {
    var e3 = {};
    for (var n2 in this.properties)
      Er(this.properties, n2) && (e3[n2] = this._ifNode(t4(this.properties[n2], "properties[" + Zr(n2) + "]", this)));
    return new r2(e3);
  }, r2.prototype.clone = function() {
    var t4 = {};
    for (var e3 in this.properties)
      Er(this.properties, e3) && (t4[e3] = this.properties[e3]);
    return new r2(t4);
  }, r2.prototype._toString = function(t4) {
    var e3 = [];
    for (var r3 in this.properties)
      Er(this.properties, r3) && e3.push(Zr(r3) + ": " + this.properties[r3].toString(t4));
    return "{" + e3.join(", ") + "}";
  }, r2.prototype.toJSON = function() {
    return {mathjs: "ObjectNode", properties: this.properties};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.properties);
  }, r2.prototype.toHTML = function(t4) {
    var e3 = [];
    for (var r3 in this.properties)
      Er(this.properties, r3) && e3.push('<span class="math-symbol math-property">' + Xr(r3) + '</span><span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' + this.properties[r3].toHTML(t4));
    return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + e3.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>';
  }, r2.prototype._toTex = function(t4) {
    var e3 = [];
    for (var r3 in this.properties)
      Er(this.properties, r3) && e3.push("\\mathbf{" + r3 + ":} & " + this.properties[r3].toTex(t4) + "\\\\");
    return "\\left\\{\\begin{array}{ll}".concat(e3.join("\n"), "\\end{array}\\right\\}");
  }, r2;
}, {isClass: true, isNode: true}), vo = mn("OperatorNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4, e3, n3, i2) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (typeof t4 != "string")
      throw new TypeError('string expected for parameter "op"');
    if (typeof e3 != "string")
      throw new TypeError('string expected for parameter "fn"');
    if (!Array.isArray(n3) || !n3.every(hr))
      throw new TypeError('Array containing Nodes expected for parameter "args"');
    this.implicit = i2 === true, this.op = t4, this.fn = e3, this.args = n3 || [];
  }
  function n2(t4, e3, r3, n3, i2) {
    var s2, a2 = Qa(t4, e3), o2 = Ja(t4, e3);
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
        var u2 = Qa(n3[0], e3);
        if (i2 && u2 !== null) {
          var h, c2;
          if (e3 === "keep" ? (h = n3[0].getIdentifier(), c2 = t4.getIdentifier()) : (h = n3[0].getContent().getIdentifier(), c2 = t4.getContent().getIdentifier()), Xa[a2][c2].latexLeftParens === false) {
            s2 = [false];
            break;
          }
          if (Xa[u2][h].latexParens === false) {
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
        var l2, p2, f2 = Qa(n3[0], e3), d = Ka(t4, n3[0], e3);
        l2 = f2 !== null && (f2 === a2 && o2 === "right" && !d || f2 < a2);
        var m2, y2, g2, v2 = Qa(n3[1], e3), x2 = Ka(t4, n3[1], e3);
        if (p2 = v2 !== null && (v2 === a2 && o2 === "left" && !x2 || v2 < a2), i2)
          e3 === "keep" ? (m2 = t4.getIdentifier(), y2 = t4.args[0].getIdentifier(), g2 = t4.args[1].getIdentifier()) : (m2 = t4.getContent().getIdentifier(), y2 = t4.args[0].getContent().getIdentifier(), g2 = t4.args[1].getContent().getIdentifier()), f2 !== null && (Xa[a2][m2].latexLeftParens === false && (l2 = false), Xa[f2][y2].latexParens === false && (l2 = false)), v2 !== null && (Xa[a2][m2].latexRightParens === false && (p2 = false), Xa[v2][g2].latexParens === false && (p2 = false));
        s2 = [l2, p2];
        break;
      default:
        t4.getIdentifier() !== "OperatorNode:add" && t4.getIdentifier() !== "OperatorNode:multiply" || (s2 = n3.map(function(r4) {
          var n4 = Qa(r4, e3), i3 = Ka(t4, r4, e3), s3 = Ja(r4, e3);
          return n4 !== null && (a2 === n4 && o2 === s3 && !i3 || n4 < a2);
        }));
    }
    return n3.length >= 2 && t4.getIdentifier() === "OperatorNode:multiply" && t4.implicit && e3 === "auto" && r3 === "hide" && (s2 = n3.map(function(t5, e4) {
      var r4 = t5.getIdentifier() === "ParenthesisNode";
      return !(!s2[e4] && !r4);
    })), s2;
  }
  return r2.prototype = new e2(), r2.prototype.type = "OperatorNode", r2.prototype.isOperatorNode = true, r2.prototype._compile = function(t4, e3) {
    if (typeof this.fn != "string" || !ua(t4, this.fn))
      throw t4[this.fn] ? new Error('No access to function "' + this.fn + '"') : new Error("Function " + this.fn + ' missing in provided namespace "math"');
    var r3 = sa(t4, this.fn), n3 = cn(this.args, function(r4) {
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
      return r3.apply(null, cn(n3, function(r4) {
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
      var a2 = Ja(this, e3), o2 = i2[0].toString(t4);
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
      var a2 = Ja(this, e3), o2 = i2[0].toHTML(t4);
      return s2[0] && (o2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + o2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), a2 === "right" ? '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + Xr(this.op) + "</span>" + o2 : o2 + '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + Xr(this.op) + "</span>";
    }
    if (i2.length === 2) {
      var u2 = i2[0].toHTML(t4), h = i2[1].toHTML(t4);
      return s2[0] && (u2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + u2 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), s2[1] && (h = '<span class="math-parenthesis math-round-parenthesis">(</span>' + h + '<span class="math-parenthesis math-round-parenthesis">)</span>'), this.implicit && this.getIdentifier() === "OperatorNode:multiply" && r3 === "hide" ? u2 + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + h : u2 + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + Xr(this.op) + "</span>" + h;
    }
    var c2 = i2.map(function(e4, r4) {
      return e4 = e4.toHTML(t4), s2[r4] && (e4 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + e4 + '<span class="math-parenthesis math-round-parenthesis">)</span>'), e4;
    });
    return i2.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply") ? this.implicit && this.getIdentifier() === "OperatorNode:multiply" && r3 === "hide" ? c2.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>') : c2.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + Xr(this.op) + "</span>") : '<span class="math-function">' + Xr(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + c2.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
  }, r2.prototype._toTex = function(t4) {
    var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = t4 && t4.implicit ? t4.implicit : "hide", i2 = this.args, s2 = n2(this, e3, r3, i2, true), a2 = uo[this.fn];
    if (a2 = a2 === void 0 ? this.op : a2, i2.length === 1) {
      var o2 = Ja(this, e3), u2 = i2[0].toTex(t4);
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
}, {isClass: true, isNode: true}), xo = mn("ParenthesisNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!hr(t4))
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
}, {isClass: true, isNode: true}), wo = mn("RangeNode", ["Node"], (t3) => {
  var {Node: e2} = t3;
  function r2(t4, e3, n3) {
    if (!(this instanceof r2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!hr(t4))
      throw new TypeError("Node expected");
    if (!hr(e3))
      throw new TypeError("Node expected");
    if (n3 && !hr(n3))
      throw new TypeError("Node expected");
    if (arguments.length > 3)
      throw new Error("Too many arguments");
    this.start = t4, this.end = e3, this.step = n3 || null;
  }
  function n2(t4, e3) {
    var r3 = Qa(t4, e3), n3 = {}, i2 = Qa(t4.start, e3);
    if (n3.start = i2 !== null && i2 <= r3 || e3 === "all", t4.step) {
      var s2 = Qa(t4.step, e3);
      n3.step = s2 !== null && s2 <= r3 || e3 === "all";
    }
    var a2 = Qa(t4.end, e3);
    return n3.end = a2 !== null && a2 <= r3 || e3 === "all", n3;
  }
  return r2.prototype = new e2(), r2.prototype.type = "RangeNode", r2.prototype.isRangeNode = true, r2.prototype.needsEnd = function() {
    return this.filter(function(t4) {
      return dr(t4) && t4.name === "end";
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
}, {isClass: true, isNode: true}), bo = mn("RelationalNode", ["Node"], (t3) => {
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
        if (a2 = o2, o2 = n2[u2 + 1](e4, i2, s2), !sa(t4, r3.conditionals[u2])(a2, o2))
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
    for (var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Qa(this, e3), n2 = this.params.map(function(n3, i3) {
      var s3 = Qa(n3, e3);
      return e3 === "all" || s3 !== null && s3 <= r3 ? "(" + n3.toString(t4) + ")" : n3.toString(t4);
    }), i2 = {equal: "==", unequal: "!=", smaller: "<", larger: ">", smallerEq: "<=", largerEq: ">="}, s2 = n2[0], a2 = 0; a2 < this.conditionals.length; a2++)
      s2 += " " + i2[this.conditionals[a2]] + " " + n2[a2 + 1];
    return s2;
  }, r2.prototype.toJSON = function() {
    return {mathjs: "RelationalNode", conditionals: this.conditionals, params: this.params};
  }, r2.fromJSON = function(t4) {
    return new r2(t4.conditionals, t4.params);
  }, r2.prototype.toHTML = function(t4) {
    for (var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Qa(this, e3), n2 = this.params.map(function(n3, i3) {
      var s3 = Qa(n3, e3);
      return e3 === "all" || s3 !== null && s3 <= r3 ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + n3.toHTML(t4) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : n3.toHTML(t4);
    }), i2 = {equal: "==", unequal: "!=", smaller: "<", larger: ">", smallerEq: "<=", largerEq: ">="}, s2 = n2[0], a2 = 0; a2 < this.conditionals.length; a2++)
      s2 += '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + Xr(i2[this.conditionals[a2]]) + "</span>" + n2[a2 + 1];
    return s2;
  }, r2.prototype._toTex = function(t4) {
    for (var e3 = t4 && t4.parenthesis ? t4.parenthesis : "keep", r3 = Qa(this, e3), n2 = this.params.map(function(n3, i3) {
      var s3 = Qa(n3, e3);
      return e3 === "all" || s3 !== null && s3 <= r3 ? "\\left(" + n3.toTex(t4) + "\right)" : n3.toTex(t4);
    }), i2 = n2[0], s2 = 0; s2 < this.conditionals.length; s2++)
      i2 += uo[this.conditionals[s2]] + n2[s2 + 1];
    return i2;
  }, r2;
}, {isClass: true, isNode: true});
function _o() {
  return (_o = Object.assign || function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2)
        Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
    }
    return t3;
  }).apply(this, arguments);
}
function Mo() {
  return (Mo = Object.assign || function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2)
        Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
    }
    return t3;
  }).apply(this, arguments);
}
var No = {createBigNumberClass: Ki}, Eo = {createComplexClass: rs}, So = {createMatrixClass: os}, To = {MatrixDependencies: So, createDenseMatrixClass: us}, Oo = {createFractionClass: ss}, zo = {BigNumberDependencies: No, ComplexDependencies: Eo, DenseMatrixDependencies: To, FractionDependencies: Oo, createTyped: xn}, Co = {typedDependencies: zo, createEqualScalar: Ms}, Ao = {MatrixDependencies: So, equalScalarDependencies: Co, typedDependencies: zo, createSparseMatrixClass: Ns}, Ro = {typedDependencies: zo, createNumber: Es}, Do = {FractionDependencies: Oo, typedDependencies: zo, createFraction: Ts}, ko = {DenseMatrixDependencies: To, MatrixDependencies: So, SparseMatrixDependencies: Ao, typedDependencies: zo, createMatrix: Os}, Io = {typedDependencies: zo, createUnaryMinus: zs}, Lo = {typedDependencies: zo, createAbs: Cs}, Bo = {typedDependencies: zo, createAddScalar: As}, Fo = {BigNumberDependencies: No, DenseMatrixDependencies: To, equalScalarDependencies: Co, matrixDependencies: ko, typedDependencies: zo, zerosDependencies: {BigNumberDependencies: No, matrixDependencies: ko, typedDependencies: zo, createZeros: ga}, createRound: Sa}, Uo = {typedDependencies: zo, createMultiplyScalar: Gs}, jo = {matrixDependencies: ko, typedDependencies: zo, createSize: ia}, qo = {addScalarDependencies: Bo, dotDependencies: {addScalarDependencies: Bo, conjDependencies: {typedDependencies: zo, createConj: Qs}, multiplyScalarDependencies: Uo, sizeDependencies: jo, typedDependencies: zo, createDot: Ha}, equalScalarDependencies: Co, matrixDependencies: ko, multiplyScalarDependencies: Uo, typedDependencies: zo, createMultiply: Ws}, Ho = {DenseMatrixDependencies: To, addScalarDependencies: Bo, equalScalarDependencies: Co, matrixDependencies: ko, typedDependencies: zo, unaryMinusDependencies: Io, createSubtract: Ys}, Vo = {DenseMatrixDependencies: To, matrixDependencies: ko, typedDependencies: zo, createLarger: Ca}, $o = {BigNumberDependencies: No, DenseMatrixDependencies: To, SparseMatrixDependencies: Ao, matrixDependencies: ko, typedDependencies: zo, createIdentity: ta}, Wo = {bignumberDependencies: {BigNumberDependencies: No, typedDependencies: zo, createBignumber: Ss}, fractionDependencies: Do, numberDependencies: Ro, createNumeric: xa}, Yo = {numericDependencies: Wo, typedDependencies: zo, createDivideScalar: wa}, Zo = {matrixDependencies: ko, typedDependencies: zo, createSubset: pa}, Xo = {BigNumberDependencies: No, ComplexDependencies: Eo, FractionDependencies: Oo, absDependencies: Lo, addScalarDependencies: Bo, divideScalarDependencies: Yo, equalDependencies: {DenseMatrixDependencies: To, equalScalarDependencies: Co, matrixDependencies: ko, typedDependencies: zo, createEqual: Oa}, fixDependencies: {ComplexDependencies: Eo, ceilDependencies: {equalScalarDependencies: Co, matrixDependencies: ko, roundDependencies: Fo, typedDependencies: zo, createCeil: ks}, floorDependencies: {equalScalarDependencies: Co, matrixDependencies: ko, roundDependencies: Fo, typedDependencies: zo, createFloor: Ls}, matrixDependencies: ko, typedDependencies: zo, createFix: Is}, formatDependencies: {typedDependencies: zo, createFormat: va}, isNumericDependencies: {typedDependencies: zo, createIsNumeric: ws}, multiplyScalarDependencies: Uo, numberDependencies: Ro, powDependencies: {ComplexDependencies: Eo, fractionDependencies: Do, identityDependencies: $o, matrixDependencies: ko, multiplyDependencies: qo, numberDependencies: Ro, typedDependencies: zo, createPow: ba}, roundDependencies: Fo, subtractDependencies: Ho, createUnitClass: Pa}, Ko = {createNode: $a}, tu = {UnitDependencies: Xo, NodeDependencies: Ko, createSymbolNode: mn("SymbolNode", ["math", "?Unit", "Node"], (t3) => {
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
        return sa(n3 in e4 ? e4 : t4, n3);
      };
    var s3 = i2(n3);
    return function(t5, e4, i3) {
      return n3 in t5 ? sa(t5, n3) : s3 ? new r2(null, n3) : function(t6) {
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
    var e3 = Xr(this.name);
    return e3 === "true" || e3 === "false" ? '<span class="math-symbol math-boolean">' + e3 + "</span>" : e3 === "i" ? '<span class="math-symbol math-imaginary-symbol">' + e3 + "</span>" : e3 === "Infinity" ? '<span class="math-symbol math-infinity-symbol">' + e3 + "</span>" : e3 === "NaN" ? '<span class="math-symbol math-nan-symbol">' + e3 + "</span>" : e3 === "null" ? '<span class="math-symbol math-null-symbol">' + e3 + "</span>" : e3 === "undefined" ? '<span class="math-symbol math-undefined-symbol">' + e3 + "</span>" : '<span class="math-symbol">' + e3 + "</span>";
  }, s2.prototype.toJSON = function() {
    return {mathjs: "SymbolNode", name: this.name};
  }, s2.fromJSON = function(t4) {
    return new s2(t4.name);
  }, s2.prototype._toTex = function(t4) {
    var r3 = false;
    e2[this.name] === void 0 && i2(this.name) && (r3 = true);
    var n3 = po(this.name, r3);
    return n3[0] === "\\" ? n3 : " " + n3;
  }, s2;
}, {isClass: true, isNode: true})};
({parseDependencies: {AccessorNodeDependencies: {NodeDependencies: Ko, subsetDependencies: Zo, createAccessorNode: Ya}, ArrayNodeDependencies: {NodeDependencies: Ko, createArrayNode: Za}, AssignmentNodeDependencies: {matrixDependencies: ko, NodeDependencies: Ko, subsetDependencies: Zo, createAssignmentNode: to}, BlockNodeDependencies: {NodeDependencies: Ko, ResultSetDependencies: {createResultSet: En}, createBlockNode: eo}, ConditionalNodeDependencies: {NodeDependencies: Ko, createConditionalNode: ro}, ConstantNodeDependencies: {NodeDependencies: Ko, createConstantNode: fo}, FunctionAssignmentNodeDependencies: {NodeDependencies: Ko, typedDependencies: zo, createFunctionAssignmentNode: mo}, FunctionNodeDependencies: {NodeDependencies: Ko, SymbolNodeDependencies: tu, createFunctionNode: mn("FunctionNode", ["math", "Node", "SymbolNode"], (t3) => {
  var {math: e2, Node: r2, SymbolNode: n2} = t3;
  function i2(t4, e3) {
    if (!(this instanceof i2))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (typeof t4 == "string" && (t4 = new n2(t4)), !hr(t4))
      throw new TypeError('Node expected as parameter "fn"');
    if (!Array.isArray(e3) || !e3.every(hr))
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
    var r3 = cn(this.args, function(r4) {
      return r4._compile(t4, e3);
    });
    if (dr(this.fn)) {
      var n3 = this.fn.name, s3 = n3 in t4 ? sa(t4, n3) : void 0;
      if (typeof s3 == "function" && s3.rawArgs === true) {
        var a3 = this.args;
        return function(e4, r4, i3) {
          return (n3 in e4 ? sa(e4, n3) : s3)(a3, t4, _o({}, e4, r4));
        };
      }
      if (r3.length === 1) {
        var o3 = r3[0];
        return function(t5, e4, r4) {
          return (n3 in t5 ? sa(t5, n3) : s3)(o3(t5, e4, r4));
        };
      }
      if (r3.length === 2) {
        var u2 = r3[0], h = r3[1];
        return function(t5, e4, r4) {
          return (n3 in t5 ? sa(t5, n3) : s3)(u2(t5, e4, r4), h(t5, e4, r4));
        };
      }
      return function(t5, e4, i3) {
        return (n3 in t5 ? sa(t5, n3) : s3).apply(null, cn(r3, function(r4) {
          return r4(t5, e4, i3);
        }));
      };
    }
    if (tr(this.fn) && ur(this.fn.index) && this.fn.index.isObjectProperty()) {
      var c2 = this.fn.object._compile(t4, e3), l2 = this.fn.index.getObjectProperty(), p2 = this.args;
      return function(e4, n4, i3) {
        var s4 = c2(e4, n4, i3);
        return function(t5, e5) {
          if (!ua(t5, e5))
            throw new Error('No access to method "' + e5 + '"');
        }(s4, l2), s4[l2] && s4[l2].rawArgs ? s4[l2](p2, t4, _o({}, e4, n4)) : s4[l2].apply(s4, cn(r3, function(t5) {
          return t5(e4, n4, i3);
        }));
      };
    }
    var f2 = this.fn._compile(t4, e3), d = this.args;
    return function(e4, n4, i3) {
      var s4 = f2(e4, n4, i3);
      return s4 && s4.rawArgs ? s4(d, t4, _o({}, e4, n4)) : s4.apply(s4, cn(r3, function(t5) {
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
              if (hr(o3))
                i3 += o3.toTex(r3);
              else {
                if (!Array.isArray(o3))
                  throw new TypeError("Template: " + n3[1] + " has to be a Node, String or array of Nodes");
                i3 += o3.map(function(t5, e4) {
                  if (hr(t5))
                    return t5.toTex(r3);
                  throw new TypeError("Template: " + n3[1] + "[" + e4 + "] is not a Node.");
                }).join(",");
              }
              break;
            default:
              throw new TypeError("Template: " + n3[1] + " has to be a Node, String or array of Nodes");
          }
        else {
          if (!hr(o3[n3[2]] && o3[n3[2]]))
            throw new TypeError("Template: " + n3[1] + "[" + n3[2] + "] is not a Node.");
          i3 += o3[n3[2]].toTex(r3);
        }
      }
    return i3 += t4.slice(a3);
  }
  i2.prototype.toString = function(t4) {
    var e3, r3 = this.fn.toString(t4);
    return t4 && typeof t4.handler == "object" && Er(t4.handler, r3) && (e3 = t4.handler[r3](this, t4)), e3 !== void 0 ? e3 : s2.call(this, t4);
  }, i2.prototype._toString = function(t4) {
    var e3 = this.args.map(function(e4) {
      return e4.toString(t4);
    });
    return (ar(this.fn) ? "(" + this.fn.toString(t4) + ")" : this.fn.toString(t4)) + "(" + e3.join(", ") + ")";
  }, i2.prototype.toJSON = function() {
    return {mathjs: "FunctionNode", fn: this.fn, args: this.args};
  }, i2.fromJSON = function(t4) {
    return new i2(t4.fn, t4.args);
  }, i2.prototype.toHTML = function(t4) {
    var e3 = this.args.map(function(e4) {
      return e4.toHTML(t4);
    });
    return '<span class="math-function">' + Xr(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + e3.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
  };
  var o2 = i2.prototype.toTex;
  return i2.prototype.toTex = function(t4) {
    var e3;
    return t4 && typeof t4.handler == "object" && Er(t4.handler, this.name) && (e3 = t4.handler[this.name](this, t4)), e3 !== void 0 ? e3 : o2.call(this, t4);
  }, i2.prototype._toTex = function(t4) {
    var r3, n3, i3 = this.args.map(function(e3) {
      return e3.toTex(t4);
    });
    switch (ho[this.name] && (r3 = ho[this.name]), !e2[this.name] || typeof e2[this.name].toTex != "function" && typeof e2[this.name].toTex != "object" && typeof e2[this.name].toTex != "string" || (r3 = e2[this.name].toTex), typeof r3) {
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
}, {isClass: true, isNode: true})}, IndexNodeDependencies: {NodeDependencies: Ko, RangeDependencies: {createRangeClass: as}, sizeDependencies: jo, createIndexNode: yo}, ObjectNodeDependencies: {NodeDependencies: Ko, createObjectNode: go}, OperatorNodeDependencies: {NodeDependencies: Ko, createOperatorNode: vo}, ParenthesisNodeDependencies: {NodeDependencies: Ko, createParenthesisNode: xo}, RangeNodeDependencies: {NodeDependencies: Ko, createRangeNode: wo}, RelationalNodeDependencies: {NodeDependencies: Ko, createRelationalNode: bo}, SymbolNodeDependencies: tu, numericDependencies: Wo, typedDependencies: zo, createParse: mn("parse", ["typed", "numeric", "config", "AccessorNode", "ArrayNode", "AssignmentNode", "BlockNode", "ConditionalNode", "ConstantNode", "FunctionAssignmentNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "RangeNode", "RelationalNode", "SymbolNode"], (t3) => {
  var {typed: e2, numeric: r2, config: n2, AccessorNode: i2, ArrayNode: s2, AssignmentNode: a2, BlockNode: o2, ConditionalNode: u2, ConstantNode: h, FunctionAssignmentNode: c2, FunctionNode: l2, IndexNode: p2, ObjectNode: f2, OperatorNode: d, ParenthesisNode: m2, RangeNode: y2, RelationalNode: g2, SymbolNode: v2} = t3, x2 = e2("parse", {string: function(t4) {
    return P(t4, {});
  }, "Array | Matrix": function(t4) {
    return w2(t4, {});
  }, "string, Object": function(t4, e3) {
    return P(t4, e3.nodes !== void 0 ? e3.nodes : {});
  }, "Array | Matrix, Object": w2});
  function w2(t4) {
    var e3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r3 = e3.nodes !== void 0 ? e3.nodes : {};
    return hs(t4, function(t5) {
      if (typeof t5 != "string")
        throw new TypeError("String expected");
      return P(t5, r3);
    });
  }
  var b2 = 0, _2 = 1, M = 2, N = 3, E = 4, S = {",": true, "(": true, ")": true, "[": true, "]": true, "{": true, "}": true, '"': true, "'": true, ";": true, "+": true, "-": true, "*": true, ".*": true, "/": true, "./": true, "%": true, "^": true, ".^": true, "~": true, "!": true, "&": true, "|": true, "^|": true, "=": true, ":": true, "?": true, "==": true, "!=": true, "<": true, ">": true, "<=": true, ">=": true, "<<": true, ">>": true, ">>>": true}, T = {mod: true, to: true, in: true, and: true, xor: true, or: true, not: true}, O = {true: true, false: false, null: null, undefined: void 0}, z = ["NaN", "Infinity"];
  function C(t4, e3) {
    return t4.expression.substr(t4.index, e3);
  }
  function A(t4) {
    return C(t4, 1);
  }
  function R(t4) {
    t4.index++;
  }
  function D(t4) {
    return t4.expression.charAt(t4.index - 1);
  }
  function k(t4) {
    return t4.expression.charAt(t4.index + 1);
  }
  function I(t4) {
    for (t4.tokenType = b2, t4.token = "", t4.comment = ""; x2.isWhitespace(A(t4), t4.nestingLevel); )
      R(t4);
    if (A(t4) === "#")
      for (; A(t4) !== "\n" && A(t4) !== ""; )
        t4.comment += A(t4), R(t4);
    if (A(t4) !== "") {
      if (A(t4) === "\n" && !t4.nestingLevel)
        return t4.tokenType = _2, t4.token = A(t4), void R(t4);
      var e3 = A(t4), r3 = C(t4, 2), n3 = C(t4, 3);
      if (n3.length === 3 && S[n3])
        return t4.tokenType = _2, t4.token = n3, R(t4), R(t4), void R(t4);
      if (r3.length === 2 && S[r3])
        return t4.tokenType = _2, t4.token = r3, R(t4), void R(t4);
      if (S[e3])
        return t4.tokenType = _2, t4.token = e3, void R(t4);
      if (x2.isDigitDot(e3)) {
        t4.tokenType = M;
        var i3 = C(t4, 2);
        if (i3 === "0b" || i3 === "0o" || i3 === "0x") {
          for (t4.token += A(t4), R(t4), t4.token += A(t4), R(t4); x2.isHexDigit(A(t4)); )
            t4.token += A(t4), R(t4);
          return;
        }
        if (A(t4) === ".")
          t4.token += A(t4), R(t4), x2.isDigit(A(t4)) || (t4.tokenType = _2);
        else {
          for (; x2.isDigit(A(t4)); )
            t4.token += A(t4), R(t4);
          x2.isDecimalMark(A(t4), k(t4)) && (t4.token += A(t4), R(t4));
        }
        for (; x2.isDigit(A(t4)); )
          t4.token += A(t4), R(t4);
        if (A(t4) === "E" || A(t4) === "e") {
          if (x2.isDigit(k(t4)) || k(t4) === "-" || k(t4) === "+") {
            if (t4.token += A(t4), R(t4), A(t4) !== "+" && A(t4) !== "-" || (t4.token += A(t4), R(t4)), !x2.isDigit(A(t4)))
              throw at(t4, 'Digit expected, got "' + A(t4) + '"');
            for (; x2.isDigit(A(t4)); )
              t4.token += A(t4), R(t4);
            if (x2.isDecimalMark(A(t4), k(t4)))
              throw at(t4, 'Digit expected, got "' + A(t4) + '"');
          } else if (k(t4) === ".")
            throw R(t4), at(t4, 'Digit expected, got "' + A(t4) + '"');
        }
      } else {
        if (!x2.isAlpha(A(t4), D(t4), k(t4))) {
          for (t4.tokenType = E; A(t4) !== ""; )
            t4.token += A(t4), R(t4);
          throw at(t4, 'Syntax error in part "' + t4.token + '"');
        }
        for (; x2.isAlpha(A(t4), D(t4), k(t4)) || x2.isDigit(A(t4)); )
          t4.token += A(t4), R(t4);
        Er(T, t4.token) ? t4.tokenType = _2 : t4.tokenType = N;
      }
    } else
      t4.tokenType = _2;
  }
  function L(t4) {
    do {
      I(t4);
    } while (t4.token === "\n");
  }
  function B(t4) {
    t4.nestingLevel++;
  }
  function F(t4) {
    t4.nestingLevel--;
  }
  function P(t4, e3) {
    var r3 = {extraNodes: {}, expression: "", comment: "", index: 0, token: "", tokenType: b2, nestingLevel: 0, conditionalLevel: null};
    Mo(r3, {expression: t4, extraNodes: e3}), I(r3);
    var n3 = function(t5) {
      var e4, r4, n4 = [];
      t5.token !== "" && t5.token !== "\n" && t5.token !== ";" && ((e4 = U(t5)).comment = t5.comment);
      for (; t5.token === "\n" || t5.token === ";"; )
        n4.length === 0 && e4 && (r4 = t5.token !== ";", n4.push({node: e4, visible: r4})), I(t5), t5.token !== "\n" && t5.token !== ";" && t5.token !== "" && ((e4 = U(t5)).comment = t5.comment, r4 = t5.token !== ";", n4.push({node: e4, visible: r4}));
      return n4.length > 0 ? new o2(n4) : (e4 || ((e4 = new h(void 0)).comment = t5.comment), e4);
    }(r3);
    if (r3.token !== "")
      throw r3.tokenType === _2 ? ot2(r3, "Unexpected operator " + r3.token) : at(r3, 'Unexpected part "' + r3.token + '"');
    return n3;
  }
  function U(t4) {
    var e3, r3, n3, i3, s3 = function(t5) {
      var e4 = function(t6) {
        var e5 = j(t6);
        for (; t6.token === "or"; )
          L(t6), e5 = new d("or", "or", [e5, j(t6)]);
        return e5;
      }(t5);
      for (; t5.token === "?"; ) {
        var r4 = t5.conditionalLevel;
        t5.conditionalLevel = t5.nestingLevel, L(t5);
        var n4 = e4, i4 = U(t5);
        if (t5.token !== ":")
          throw at(t5, "False part of conditional expression expected");
        t5.conditionalLevel = null, L(t5);
        var s4 = U(t5);
        e4 = new u2(n4, i4, s4), t5.conditionalLevel = r4;
      }
      return e4;
    }(t4);
    if (t4.token === "=") {
      if (dr(s3))
        return e3 = s3.name, L(t4), n3 = U(t4), new a2(new v2(e3), n3);
      if (tr(s3))
        return L(t4), n3 = U(t4), new a2(s3.object, s3.index, n3);
      if (or(s3) && dr(s3.fn) && (i3 = true, r3 = [], e3 = s3.name, s3.args.forEach(function(t5, e4) {
        dr(t5) ? r3[e4] = t5.name : i3 = false;
      }), i3))
        return L(t4), n3 = U(t4), new c2(e3, r3, n3);
      throw at(t4, "Invalid left hand side of assignment operator =");
    }
    return s3;
  }
  function j(t4) {
    for (var e3 = q(t4); t4.token === "xor"; )
      L(t4), e3 = new d("xor", "xor", [e3, q(t4)]);
    return e3;
  }
  function q(t4) {
    for (var e3 = H(t4); t4.token === "and"; )
      L(t4), e3 = new d("and", "and", [e3, H(t4)]);
    return e3;
  }
  function H(t4) {
    for (var e3 = V(t4); t4.token === "|"; )
      L(t4), e3 = new d("|", "bitOr", [e3, V(t4)]);
    return e3;
  }
  function V(t4) {
    for (var e3 = $(t4); t4.token === "^|"; )
      L(t4), e3 = new d("^|", "bitXor", [e3, $(t4)]);
    return e3;
  }
  function $(t4) {
    for (var e3 = G(t4); t4.token === "&"; )
      L(t4), e3 = new d("&", "bitAnd", [e3, G(t4)]);
    return e3;
  }
  function G(t4) {
    for (var e3 = [W(t4)], r3 = [], n3 = {"==": "equal", "!=": "unequal", "<": "smaller", ">": "larger", "<=": "smallerEq", ">=": "largerEq"}; Er(n3, t4.token); ) {
      var i3 = {name: t4.token, fn: n3[t4.token]};
      r3.push(i3), L(t4), e3.push(W(t4));
    }
    return e3.length === 1 ? e3[0] : e3.length === 2 ? new d(r3[0].name, r3[0].fn, e3) : new g2(r3.map((t5) => t5.fn), e3);
  }
  function W(t4) {
    var e3, r3, n3, i3;
    e3 = Y(t4);
    for (var s3 = {"<<": "leftShift", ">>": "rightArithShift", ">>>": "rightLogShift"}; Er(s3, t4.token); )
      n3 = s3[r3 = t4.token], L(t4), i3 = [e3, Y(t4)], e3 = new d(r3, n3, i3);
    return e3;
  }
  function Y(t4) {
    var e3, r3, n3, i3;
    e3 = Z(t4);
    for (var s3 = {to: "to", in: "to"}; Er(s3, t4.token); )
      n3 = s3[r3 = t4.token], L(t4), r3 === "in" && t4.token === "" ? e3 = new d("*", "multiply", [e3, new v2("in")], true) : (i3 = [e3, Z(t4)], e3 = new d(r3, n3, i3));
    return e3;
  }
  function Z(t4) {
    var e3, r3 = [];
    if (e3 = t4.token === ":" ? new h(1) : X(t4), t4.token === ":" && t4.conditionalLevel !== t4.nestingLevel) {
      for (r3.push(e3); t4.token === ":" && r3.length < 3; )
        L(t4), t4.token === ")" || t4.token === "]" || t4.token === "," || t4.token === "" ? r3.push(new v2("end")) : r3.push(X(t4));
      e3 = r3.length === 3 ? new y2(r3[0], r3[2], r3[1]) : new y2(r3[0], r3[1]);
    }
    return e3;
  }
  function X(t4) {
    var e3, r3, n3, i3;
    e3 = Q(t4);
    for (var s3 = {"+": "add", "-": "subtract"}; Er(s3, t4.token); )
      n3 = s3[r3 = t4.token], L(t4), i3 = [e3, Q(t4)], e3 = new d(r3, n3, i3);
    return e3;
  }
  function Q(t4) {
    var e3, r3, n3, i3;
    r3 = e3 = J(t4);
    for (var s3 = {"*": "multiply", ".*": "dotMultiply", "/": "divide", "./": "dotDivide", "%": "mod", mod: "mod"}; Er(s3, t4.token); )
      i3 = s3[n3 = t4.token], L(t4), r3 = J(t4), e3 = new d(n3, i3, [e3, r3]);
    return e3;
  }
  function J(t4) {
    var e3, r3;
    for (r3 = e3 = K(t4); t4.tokenType === N || t4.token === "in" && sr(e3) || !(t4.tokenType !== M || sr(r3) || lr(r3) && r3.op !== "!") || t4.token === "("; )
      r3 = K(t4), e3 = new d("*", "multiply", [e3, r3], true);
    return e3;
  }
  function K(t4) {
    for (var e3 = tt(t4), r3 = e3, n3 = []; t4.token === "/" && sr(r3); ) {
      if (n3.push(Mo({}, t4)), L(t4), t4.tokenType !== M) {
        Mo(t4, n3.pop());
        break;
      }
      if (n3.push(Mo({}, t4)), L(t4), t4.tokenType !== N && t4.token !== "(") {
        n3.pop(), Mo(t4, n3.pop());
        break;
      }
      Mo(t4, n3.pop()), n3.pop(), r3 = tt(t4), e3 = new d("/", "divide", [e3, r3]);
    }
    return e3;
  }
  function tt(t4) {
    var e3, i3, a3, o3 = {"-": "unaryMinus", "+": "unaryPlus", "~": "bitNot", not: "not"};
    return Er(o3, t4.token) ? (a3 = o3[t4.token], e3 = t4.token, L(t4), i3 = [tt(t4)], new d(e3, a3, i3)) : function(t5) {
      var e4, i4, a4, o4;
      e4 = function(t6) {
        var e5, i5, a5;
        e5 = function(t7) {
          var e6 = [];
          if (t7.tokenType === N && Er(t7.extraNodes, t7.token)) {
            var i6 = t7.extraNodes[t7.token];
            if (I(t7), t7.token === "(") {
              if (e6 = [], B(t7), I(t7), t7.token !== ")")
                for (e6.push(U(t7)); t7.token === ","; )
                  I(t7), e6.push(U(t7));
              if (t7.token !== ")")
                throw at(t7, "Parenthesis ) expected");
              F(t7), I(t7);
            }
            return new i6(e6);
          }
          return function(t8) {
            var e7;
            if (t8.tokenType === N || t8.tokenType === _2 && t8.token in T)
              return e7 = t8.token, I(t8), et(t8, Er(O, e7) ? new h(O[e7]) : z.indexOf(e7) !== -1 ? new h(r2(e7, "number")) : new v2(e7));
            return function(t9) {
              var e8;
              if (t9.token === '"')
                return e8 = rt(t9), et(t9, new h(e8));
              return function(t10) {
                var e9;
                if (t10.token === "'")
                  return e9 = nt(t10), et(t10, new h(e9));
                return function(t11) {
                  var e10, i7, a6, o6;
                  if (t11.token === "[") {
                    if (B(t11), I(t11), t11.token !== "]") {
                      var u3 = it(t11);
                      if (t11.token === ";") {
                        for (a6 = 1, i7 = [u3]; t11.token === ";"; )
                          I(t11), i7[a6] = it(t11), a6++;
                        if (t11.token !== "]")
                          throw at(t11, "End of matrix ] expected");
                        F(t11), I(t11), o6 = i7[0].items.length;
                        for (var c3 = 1; c3 < a6; c3++)
                          if (i7[c3].items.length !== o6)
                            throw ot2(t11, "Column dimensions mismatch (" + i7[c3].items.length + " !== " + o6 + ")");
                        e10 = new s2(i7);
                      } else {
                        if (t11.token !== "]")
                          throw at(t11, "End of matrix ] expected");
                        F(t11), I(t11), e10 = u3;
                      }
                    } else
                      F(t11), I(t11), e10 = new s2([]);
                    return et(t11, e10);
                  }
                  return function(t12) {
                    if (t12.token === "{") {
                      var e11;
                      B(t12);
                      var i8 = {};
                      do {
                        if (I(t12), t12.token !== "}") {
                          if (t12.token === '"')
                            e11 = rt(t12);
                          else if (t12.token === "'")
                            e11 = nt(t12);
                          else {
                            if (!(t12.tokenType === N || t12.tokenType === _2 && t12.token in T))
                              throw at(t12, "Symbol or string expected as object key");
                            e11 = t12.token, I(t12);
                          }
                          if (t12.token !== ":")
                            throw at(t12, "Colon : expected after object key");
                          I(t12), i8[e11] = U(t12);
                        }
                      } while (t12.token === ",");
                      if (t12.token !== "}")
                        throw at(t12, "Comma , or bracket } expected after object value");
                      F(t12), I(t12);
                      var s3 = new f2(i8);
                      return s3 = et(t12, s3);
                    }
                    return function(t13) {
                      var e12;
                      if (t13.tokenType === M)
                        return e12 = t13.token, I(t13), new h(r2(e12, n2.number));
                      return function(t14) {
                        var e13;
                        if (t14.token === "(") {
                          if (B(t14), I(t14), e13 = U(t14), t14.token !== ")")
                            throw at(t14, "Parenthesis ) expected");
                          return F(t14), I(t14), e13 = et(t14, e13 = new m2(e13));
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
        for (; Er(o5, t6.token); )
          a5 = o5[i5 = t6.token], I(t6), e5 = et(t6, e5 = new d(i5, a5, [e5]));
        return e5;
      }(t5), (t5.token === "^" || t5.token === ".^") && (a4 = (i4 = t5.token) === "^" ? "pow" : "dotPow", L(t5), o4 = [e4, tt(t5)], e4 = new d(i4, a4, o4));
      return e4;
    }(t4);
  }
  function et(t4, e3, r3) {
    for (var n3; !(t4.token !== "(" && t4.token !== "[" && t4.token !== "." || r3 && r3.indexOf(t4.token) === -1); )
      if (n3 = [], t4.token === "(") {
        if (!dr(e3) && !tr(e3))
          return e3;
        if (B(t4), I(t4), t4.token !== ")")
          for (n3.push(U(t4)); t4.token === ","; )
            I(t4), n3.push(U(t4));
        if (t4.token !== ")")
          throw at(t4, "Parenthesis ) expected");
        F(t4), I(t4), e3 = new l2(e3, n3);
      } else if (t4.token === "[") {
        if (B(t4), I(t4), t4.token !== "]")
          for (n3.push(U(t4)); t4.token === ","; )
            I(t4), n3.push(U(t4));
        if (t4.token !== "]")
          throw at(t4, "Parenthesis ] expected");
        F(t4), I(t4), e3 = new i2(e3, new p2(n3));
      } else {
        if (I(t4), t4.tokenType !== N)
          throw at(t4, "Property name expected after dot");
        n3.push(new h(t4.token)), I(t4);
        e3 = new i2(e3, new p2(n3, true));
      }
    return e3;
  }
  function rt(t4) {
    for (var e3 = ""; A(t4) !== "" && A(t4) !== '"'; )
      A(t4) === "\\" && (e3 += A(t4), R(t4)), e3 += A(t4), R(t4);
    if (I(t4), t4.token !== '"')
      throw at(t4, 'End of string " expected');
    return I(t4), JSON.parse('"' + e3 + '"');
  }
  function nt(t4) {
    for (var e3 = ""; A(t4) !== "" && A(t4) !== "'"; )
      A(t4) === "\\" && (e3 += A(t4), R(t4)), e3 += A(t4), R(t4);
    if (I(t4), t4.token !== "'")
      throw at(t4, "End of string ' expected");
    return I(t4), JSON.parse('"' + e3 + '"');
  }
  function it(t4) {
    for (var e3 = [U(t4)], r3 = 1; t4.token === ","; )
      I(t4), e3[r3] = U(t4), r3++;
    return new s2(e3);
  }
  function st(t4) {
    return t4.index - t4.token.length + 1;
  }
  function at(t4, e3) {
    var r3 = st(t4), n3 = new SyntaxError(e3 + " (char " + r3 + ")");
    return n3.char = r3, n3;
  }
  function ot2(t4, e3) {
    var r3 = st(t4), n3 = new SyntaxError(e3 + " (char " + r3 + ")");
    return n3.char = r3, n3;
  }
  return x2.isAlpha = function(t4, e3, r3) {
    return x2.isValidLatinOrGreek(t4) || x2.isValidMathSymbol(t4, r3) || x2.isValidMathSymbol(e3, t4);
  }, x2.isValidLatinOrGreek = function(t4) {
    return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(t4);
  }, x2.isValidMathSymbol = function(t4, e3) {
    return /^[\uD835]$/.test(t4) && /^[\uDC00-\uDFFF]$/.test(e3) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(e3);
  }, x2.isWhitespace = function(t4, e3) {
    return t4 === " " || t4 === "	" || t4 === "\n" && e3 > 0;
  }, x2.isDecimalMark = function(t4, e3) {
    return t4 === "." && e3 !== "/" && e3 !== "*" && e3 !== "^";
  }, x2.isDigitDot = function(t4) {
    return t4 >= "0" && t4 <= "9" || t4 === ".";
  }, x2.isDigit = function(t4) {
    return t4 >= "0" && t4 <= "9";
  }, x2.isHexDigit = function(t4) {
    return t4 >= "0" && t4 <= "9" || t4 >= "a" && t4 <= "f" || t4 >= "A" && t4 <= "F";
  }, x2;
})}, typedDependencies: zo, createEvaluate: mn("evaluate", ["typed", "parse"], (t3) => {
  var {typed: e2, parse: r2} = t3;
  return e2("evaluate", {string: function(t4) {
    return r2(t4).compile().evaluate({});
  }, "string, Object": function(t4, e3) {
    return r2(t4).compile().evaluate(e3);
  }, "Array | Matrix": function(t4) {
    var e3 = {};
    return hs(t4, function(t5) {
      return r2(t5).compile().evaluate(e3);
    });
  }, "Array | Matrix, Object": function(t4, e3) {
    return hs(t4, function(t5) {
      return r2(t5).compile().evaluate(e3);
    });
  }});
})});
({divideScalarDependencies: Yo, equalScalarDependencies: Co, invDependencies: {absDependencies: Lo, addScalarDependencies: Bo, detDependencies: {lupDependencies: {DenseMatrixDependencies: To, SpaDependencies: {FibonacciHeapDependencies: {largerDependencies: Vo, smallerDependencies: {DenseMatrixDependencies: To, matrixDependencies: ko, typedDependencies: zo, createSmaller: za}, createFibonacciHeapClass: Aa}, addScalarDependencies: Bo, equalScalarDependencies: Co, createSpaClass: Ra}, SparseMatrixDependencies: Ao, absDependencies: Lo, addScalarDependencies: Bo, divideScalarDependencies: Yo, equalScalarDependencies: Co, largerDependencies: Vo, matrixDependencies: ko, multiplyScalarDependencies: Uo, subtractDependencies: Ho, typedDependencies: zo, unaryMinusDependencies: Io, createLup: mn("lup", ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtract", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], (t3) => {
  var {typed: e2, matrix: r2, abs: n2, addScalar: i2, divideScalar: s2, multiplyScalar: a2, subtract: o2, larger: u2, equalScalar: h, unaryMinus: c2, DenseMatrix: l2, SparseMatrix: p2, Spa: f2} = t3;
  return e2("lup", {DenseMatrix: function(t4) {
    return d(t4);
  }, SparseMatrix: function(t4) {
    return function(t5) {
      var e3, r3, i3, o3 = t5._size[0], l3 = t5._size[1], d2 = Math.min(o3, l3), m2 = t5._values, y2 = t5._index, g2 = t5._ptr, v2 = [], x2 = [], w2 = [], b2 = [o3, d2], _2 = [], M = [], N = [], E = [d2, l3], S = [], T = [];
      for (e3 = 0; e3 < o3; e3++)
        S[e3] = e3, T[e3] = e3;
      var O = function(t6, e4) {
        var r4 = T[t6], n3 = T[e4];
        S[r4] = e4, S[n3] = t6, T[t6] = n3, T[e4] = r4;
      }, z = function() {
        var t6 = new f2();
        r3 < o3 && (w2.push(v2.length), v2.push(1), x2.push(r3)), N.push(_2.length);
        var l4 = g2[r3], d3 = g2[r3 + 1];
        for (i3 = l4; i3 < d3; i3++)
          e3 = y2[i3], t6.set(S[e3], m2[i3]);
        r3 > 0 && t6.forEach(0, r3 - 1, function(e4, r4) {
          p2._forEachRow(e4, v2, x2, w2, function(n3, i4) {
            n3 > e4 && t6.accumulate(n3, c2(a2(i4, r4)));
          });
        });
        var T2 = r3, z2 = t6.get(r3), C = n2(z2);
        t6.forEach(r3 + 1, o3 - 1, function(t7, e4) {
          var r4 = n2(e4);
          u2(r4, C) && (T2 = t7, C = r4, z2 = e4);
        }), r3 !== T2 && (p2._swapRows(r3, T2, b2[1], v2, x2, w2), p2._swapRows(r3, T2, E[1], _2, M, N), t6.swap(r3, T2), O(r3, T2)), t6.forEach(0, o3 - 1, function(t7, e4) {
          t7 <= r3 ? (_2.push(e4), M.push(t7)) : (e4 = s2(e4, z2), h(e4, 0) || (v2.push(e4), x2.push(t7)));
        });
      };
      for (r3 = 0; r3 < l3; r3++)
        z();
      return N.push(_2.length), w2.push(v2.length), {L: new p2({values: v2, index: x2, ptr: w2, size: b2}), U: new p2({values: _2, index: M, ptr: N, size: E}), p: S, toString: function() {
        return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
      }};
    }(t4);
  }, Array: function(t4) {
    var e3 = d(r2(t4));
    return {L: e3.L.valueOf(), U: e3.U.valueOf(), p: e3.p};
  }});
  function d(t4) {
    var e3, r3, c3, p3 = t4._size[0], f3 = t4._size[1], d2 = Math.min(p3, f3), m2 = gr(t4._data), y2 = [], g2 = [p3, d2], v2 = [], x2 = [d2, f3], w2 = [];
    for (e3 = 0; e3 < p3; e3++)
      w2[e3] = e3;
    for (r3 = 0; r3 < f3; r3++) {
      if (r3 > 0)
        for (e3 = 0; e3 < p3; e3++) {
          var b2 = Math.min(e3, r3), _2 = 0;
          for (c3 = 0; c3 < b2; c3++)
            _2 = i2(_2, a2(m2[e3][c3], m2[c3][r3]));
          m2[e3][r3] = o2(m2[e3][r3], _2);
        }
      var M = r3, N = 0, E = 0;
      for (e3 = r3; e3 < p3; e3++) {
        var S = m2[e3][r3], T = n2(S);
        u2(T, N) && (M = e3, N = T, E = S);
      }
      if (r3 !== M && (w2[r3] = [w2[M], w2[M] = w2[r3]][0], l2._swapRows(r3, M, m2)), r3 < p3)
        for (e3 = r3 + 1; e3 < p3; e3++) {
          var O = m2[e3][r3];
          h(O, 0) || (m2[e3][r3] = s2(m2[e3][r3], E));
        }
    }
    for (r3 = 0; r3 < f3; r3++)
      for (e3 = 0; e3 < p3; e3++)
        r3 === 0 && (e3 < f3 && (v2[e3] = []), y2[e3] = []), e3 < r3 ? (e3 < f3 && (v2[e3][r3] = m2[e3][r3]), r3 < p3 && (y2[e3][r3] = 0)) : e3 !== r3 ? (e3 < f3 && (v2[e3][r3] = 0), r3 < p3 && (y2[e3][r3] = m2[e3][r3])) : (e3 < f3 && (v2[e3][r3] = m2[e3][r3]), r3 < p3 && (y2[e3][r3] = 1));
    var z = new l2({data: y2, size: g2}), C = new l2({data: v2, size: x2}), A = [];
    for (e3 = 0, d2 = w2.length; e3 < d2; e3++)
      A[w2[e3]] = e3;
    return {L: z, U: C, p: A, toString: function() {
      return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
    }};
  }
})}, matrixDependencies: ko, multiplyDependencies: qo, subtractDependencies: Ho, typedDependencies: zo, unaryMinusDependencies: Io, createDet: mn("det", ["typed", "matrix", "subtract", "multiply", "unaryMinus", "lup"], (t3) => {
  var {typed: e2, matrix: r2, subtract: n2, multiply: i2, unaryMinus: s2, lup: a2} = t3;
  return e2("det", {any: function(t4) {
    return gr(t4);
  }, "Array | Matrix": function(t4) {
    var e3;
    switch ((e3 = Pe(t4) ? t4.size() : Array.isArray(t4) ? (t4 = r2(t4)).size() : []).length) {
      case 0:
        return gr(t4);
      case 1:
        if (e3[0] === 1)
          return gr(t4.valueOf()[0]);
        throw new RangeError("Matrix must be square (size: " + Yr(e3) + ")");
      case 2:
        var o2 = e3[0];
        if (o2 === e3[1])
          return function(t5, e4, r3) {
            if (e4 === 1)
              return gr(t5[0][0]);
            if (e4 === 2)
              return n2(i2(t5[0][0], t5[1][1]), i2(t5[1][0], t5[0][1]));
            for (var o3 = a2(t5), u2 = o3.U[0][0], h = 1; h < e4; h++)
              u2 = i2(u2, o3.U[h][h]);
            for (var c2 = 0, l2 = 0, p2 = []; ; ) {
              for (; p2[l2]; )
                l2++;
              if (l2 >= e4)
                break;
              for (var f2 = l2, d = 0; !p2[o3.p[f2]]; )
                p2[o3.p[f2]] = true, f2 = o3.p[f2], d++;
              d % 2 == 0 && c2++;
            }
            return c2 % 2 == 0 ? u2 : s2(u2);
          }(t4.clone().valueOf(), o2);
        throw new RangeError("Matrix must be square (size: " + Yr(e3) + ")");
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Yr(e3) + ")");
    }
  }});
})}, divideScalarDependencies: Yo, identityDependencies: $o, matrixDependencies: ko, multiplyDependencies: qo, typedDependencies: zo, unaryMinusDependencies: Io, createInv: mn("inv", ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], (t3) => {
  var {typed: e2, matrix: r2, divideScalar: n2, addScalar: i2, multiply: s2, unaryMinus: a2, det: o2, identity: u2, abs: h} = t3;
  return e2("inv", {"Array | Matrix": function(t4) {
    var e3 = Pe(t4) ? t4.size() : tn(t4);
    switch (e3.length) {
      case 1:
        if (e3[0] === 1)
          return Pe(t4) ? r2([n2(1, t4.valueOf()[0])]) : [n2(1, t4[0])];
        throw new RangeError("Matrix must be square (size: " + Yr(e3) + ")");
      case 2:
        var i3 = e3[0], s3 = e3[1];
        if (i3 === s3)
          return Pe(t4) ? r2(c2(t4.valueOf(), i3, s3), t4.storage()) : c2(t4, i3, s3);
        throw new RangeError("Matrix must be square (size: " + Yr(e3) + ")");
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Yr(e3) + ")");
    }
  }, any: function(t4) {
    return n2(1, t4);
  }});
  function c2(t4, e3, r3) {
    var c3, l2, p2, f2, d;
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
    for (var g2 = u2(e3).valueOf(), v2 = 0; v2 < r3; v2++) {
      var x2 = h(y2[v2][v2]), w2 = v2;
      for (c3 = v2 + 1; c3 < e3; )
        h(y2[c3][v2]) > x2 && (x2 = h(y2[c3][v2]), w2 = c3), c3++;
      if (x2 === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      (c3 = w2) !== v2 && (d = y2[v2], y2[v2] = y2[c3], y2[c3] = d, d = g2[v2], g2[v2] = g2[c3], g2[c3] = d);
      var b2 = y2[v2], _2 = g2[v2];
      for (c3 = 0; c3 < e3; c3++) {
        var M = y2[c3], N = g2[c3];
        if (c3 !== v2) {
          if (M[v2] !== 0) {
            for (p2 = n2(a2(M[v2]), b2[v2]), l2 = v2; l2 < r3; l2++)
              M[l2] = i2(M[l2], s2(p2, b2[l2]));
            for (l2 = 0; l2 < r3; l2++)
              N[l2] = i2(N[l2], s2(p2, _2[l2]));
          }
        } else {
          for (p2 = b2[v2], l2 = v2; l2 < r3; l2++)
            M[l2] = n2(M[l2], p2);
          for (l2 = 0; l2 < r3; l2++)
            N[l2] = n2(N[l2], p2);
        }
      }
    }
    return g2;
  }
})}, matrixDependencies: ko, multiplyDependencies: qo, typedDependencies: zo, createDivide: mn("divide", ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], (t3) => {
  var {typed: e2, matrix: r2, multiply: n2, equalScalar: i2, divideScalar: s2, inv: a2} = t3, o2 = Rs({typed: e2, equalScalar: i2}), u2 = Ds({typed: e2});
  return e2("divide", xr({"Array | Matrix, Array | Matrix": function(t4, e3) {
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
var nu = {exports: {}};
function iu() {
}
iu.prototype = {on: function(t3, e2, r2) {
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
}}, nu.exports = iu, nu.exports.TinyEmitter = iu;
function pu(t3, e2, r2, n2 = 0) {
  n2++;
  for (let i2 = t3.firstChild; i2; i2 = i2.nextSibling)
    if (i2.nodeType === Node.ELEMENT_NODE) {
      const t4 = i2;
      e2.call(r2, t4, n2) && pu(t4, e2, r2, n2);
    }
}
function fu(t3, e2, r2, n2) {
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
}(typeof window != "undefined" ? window : Ar);
class du {
  constructor() {
    this.left = 0, this.top = 0, this.width = 0, this.height = 0;
  }
  copy(t3) {
    return this.top = t3.top, this.left = t3.left, this.width = t3.width, this.height = t3.height, this;
  }
}
class mu {
  constructor() {
    this.left = 0, this.top = 0, this.right = 0, this.bottom = 0;
  }
  copy(t3) {
    return this.top = t3.top, this.left = t3.left, this.right = t3.right, this.bottom = t3.bottom, this;
  }
}
function yu(t3, e2 = new du(), r2) {
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
  for (h && r2 && h.contains(r2) && h !== r2 && (yu(r2, e2, h), p2 -= e2.left, l2 -= e2.top); (u2 = u2.parentElement) && u2 !== s2 && u2 !== i2 && u2 !== r2 && c2.position !== "fixed"; )
    o2 = a2.getComputedStyle(u2, null), l2 -= u2.scrollTop, p2 -= u2.scrollLeft, u2 === h && (l2 += u2.offsetTop, p2 += u2.offsetLeft, l2 += parseFloat(o2.borderTopWidth) || 0, p2 += parseFloat(o2.borderLeftWidth) || 0, h = u2.offsetParent), c2 = o2;
  return c2.position === "fixed" && (l2 += Math.max(i2.scrollTop, s2.scrollTop), p2 += Math.max(i2.scrollLeft, s2.scrollLeft)), e2.left = p2, e2.top = l2, e2.width = t3.offsetWidth, e2.height = t3.offsetHeight, e2;
}
const gu = document.createElement("div");
function vu(t3) {
  const e2 = document.createElement("div");
  e2.innerHTML = t3;
  const r2 = e2.firstElementChild;
  return e2.removeChild(r2), r2;
}
gu.id = "VIEWPORT", gu.style.position = "fixed", gu.style.width = "100vw", gu.style.height = "100vh", gu.style.visibility = "hidden", gu.style.pointerEvents = "none";
var xu = {};
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
}(xu);
var wu = {exports: {}};
function bu(t3, e2) {
  return " " + t3 + '="' + function(t4) {
    return t4.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }(e2) + '"';
}
function _u(t3) {
  var e2 = t3.tagName;
  return t3.namespaceURI === "http://www.w3.org/1999/xhtml" && (e2 = e2.toLowerCase()), e2;
}
function Mu(t3, e2) {
  let r2 = "";
  for (const n2 of t3.childNodes)
    r2 += Nu(n2, e2);
  return r2;
}
function Nu(t3, e2) {
  var r2;
  const n2 = (r2 = e2.replacer) == null ? void 0 : r2.call(e2, t3);
  if (typeof n2 == "string")
    return n2;
  if (t3.nodeName === "#document" || t3.nodeName === "#document-fragment")
    return Mu(t3, e2);
  if (t3.tagName)
    return function(t4, e3) {
      let r3 = "<" + _u(t4);
      r3 += function(t5, e4) {
        return t5.hasAttribute("xmlns") || !e4 && t5.namespaceURI === t5.parentElement.namespaceURI ? "" : ' xmlns="' + t5.namespaceURI + '"';
      }(t4, e3.depth === 0);
      for (const n3 of t4.attributes)
        r3 += bu(n3.name, n3.value);
      return t4.childNodes.length > 0 ? (e3.depth++, r3 += ">", r3 += Mu(t4, e3), r3 += "</" + _u(t4) + ">", e3.depth--) : r3 += "/>", r3;
    }(t3, e2);
  if (t3.nodeName === "#text")
    return function(t4) {
      return (t4.nodeValue || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }(t3);
  if (t3.nodeName === "#comment")
    ;
  else if (t3.nodeName === "#cdata-section")
    return function(t4) {
      return "<![CDATA[" + t4.nodeValue + "]]>";
    }(t3);
  return "";
}
!function(t3) {
  !function(e2, r2) {
    var n2 = {};
    !function(t4) {
      t4.__esModule = true, t4.digestLength = 32, t4.blockSize = 64;
      var e3 = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
      function r3(t5, r4, n4, i4, s4) {
        for (var a3, o3, u3, h2, c3, l2, p2, f2, d, m2, y2, g2, v2; s4 >= 64; ) {
          for (a3 = r4[0], o3 = r4[1], u3 = r4[2], h2 = r4[3], c3 = r4[4], l2 = r4[5], p2 = r4[6], f2 = r4[7], m2 = 0; m2 < 16; m2++)
            y2 = i4 + 4 * m2, t5[m2] = (255 & n4[y2]) << 24 | (255 & n4[y2 + 1]) << 16 | (255 & n4[y2 + 2]) << 8 | 255 & n4[y2 + 3];
          for (m2 = 16; m2 < 64; m2++)
            g2 = ((d = t5[m2 - 2]) >>> 17 | d << 15) ^ (d >>> 19 | d << 13) ^ d >>> 10, v2 = ((d = t5[m2 - 15]) >>> 7 | d << 25) ^ (d >>> 18 | d << 14) ^ d >>> 3, t5[m2] = (g2 + t5[m2 - 7] | 0) + (v2 + t5[m2 - 16] | 0);
          for (m2 = 0; m2 < 64; m2++)
            g2 = (((c3 >>> 6 | c3 << 26) ^ (c3 >>> 11 | c3 << 21) ^ (c3 >>> 25 | c3 << 7)) + (c3 & l2 ^ ~c3 & p2) | 0) + (f2 + (e3[m2] + t5[m2] | 0) | 0) | 0, v2 = ((a3 >>> 2 | a3 << 30) ^ (a3 >>> 13 | a3 << 19) ^ (a3 >>> 22 | a3 << 10)) + (a3 & o3 ^ a3 & u3 ^ o3 & u3) | 0, f2 = p2, p2 = l2, l2 = c3, c3 = h2 + g2 | 0, h2 = u3, u3 = o3, o3 = a3, a3 = g2 + v2 | 0;
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
        for (var s4 = new Uint8Array([1]), h2 = a2(e4, t5), c3 = new i3(h2), l2 = new Uint8Array(c3.digestLength), p2 = l2.length, f2 = new Uint8Array(n4), d = 0; d < n4; d++)
          p2 === l2.length && (o2(l2, c3, r4, s4), p2 = 0), f2[d] = l2[p2++];
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
            for (var d = 0; d < a3; d++)
              u3[d] ^= h2[d];
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
}(wu);
const Eu = class {
  constructor(t3, e2) {
    this.element = t3, this.eventCallback = e2, this.needsRefresh = true, this.needsRemoval = false, this.pseudoStates = {hover: false, active: false, focus: false, target: false}, this.svgImage = new Image(), this.bounds = new du(), this.padding = new mu(), this.margin = new mu(), this.border = new mu(), this.childLayers = [], this.cachedBounds = new Map(), this.cachedMargin = new Map(), this._dynamicAttributes = "", this._svgDocument = "", this._rasterizingDocument = "", this._svgSrc = "", this._hashingCanvas = document.createElement("canvas"), this.serializationReplacer = (t4) => {
      if (this.element === t4)
        return;
      const e3 = t4, r2 = xh.layers.get(e3);
      if (r2) {
        const t5 = r2.bounds;
        let n2 = "";
        const i2 = `min-width:${t5.width}px;min-height:${t5.height}px;visibility:hidden`;
        let s2 = false;
        for (const e4 of r2.element.attributes)
          e4.name == "style" ? (n2 += bu(e4.name, e4.value + ";" + i2), s2 = true) : n2 += bu(e4.name, e4.value);
        s2 || (n2 += bu("style", i2));
        const a2 = e3.tagName.toLowerCase();
        return `<${a2} ${n2}></${a2}>`;
      }
    }, xh.layers.set(t3, this), this.id = t3.getAttribute(xh.ELEMENT_UID_ATTRIBUTE) || xh.generateElementUID(), t3.setAttribute(xh.ELEMENT_UID_ATTRIBUTE, this.id), t3.setAttribute(xh.LAYER_ATTRIBUTE, ""), this.parentLayer = xh.getClosestLayer(this.element.parentElement), this.eventCallback("layercreated", {target: t3}), Eu.cachedCanvases.limit = xh.layers.size * Eu.DEFAULT_CACHE_SIZE, this._hashingCanvas.width = 20, this._hashingCanvas.height = 20;
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
    yu(this.element, this.bounds, this.parentLayer && this.parentLayer.element), this.needsRefresh = false, this._updateParentAndChildLayers(), xh.addToSerializeQueue(this);
  }
  _updateParentAndChildLayers() {
    const t3 = this.element, e2 = this.childLayers, r2 = e2.slice(), n2 = this.parentLayer;
    this.parentLayer = xh.getClosestLayer(this.element.parentElement), n2 !== this.parentLayer && (this.parentLayer && this.parentLayer.childLayers.push(this), this.eventCallback("layermoved", {target: t3})), e2.length = 0, pu(t3, this._tryConvertElementToWebLayer, this);
    for (const i2 of r2) {
      xh.getClosestLayer(i2.element.parentElement) || (i2.needsRemoval = true, e2.push(i2));
    }
  }
  _tryConvertElementToWebLayer(t3) {
    if (this.needsRemoval)
      return false;
    const e2 = t3, r2 = getComputedStyle(e2);
    e2.getAttribute(xh.ELEMENT_UID_ATTRIBUTE) || e2.setAttribute(xh.ELEMENT_UID_ATTRIBUTE, xh.generateElementUID());
    if (e2.hasAttribute(xh.LAYER_ATTRIBUTE) || e2.nodeName === "VIDEO" || r2.transform !== "none") {
      let t4 = xh.layers.get(e2);
      return t4 || (t4 = new Eu(e2, this.eventCallback)), this.childLayers.push(t4), false;
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
      const i2 = xh.attributeHTML(xh.ELEMENT_UID_ATTRIBUTE, "" + this.id), s2 = this.element, a2 = getComputedStyle(s2).display === "inline";
      xh.updateInputAttributes(s2);
      const o2 = (r2 = s2, n2 = this.serializationReplacer, Nu(r2, {depth: 0, replacer: n2}).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")).replace(i2, `${i2} ${xh.RENDERING_ATTRIBUTE}="" ${a2 ? `${xh.RENDERING_INLINE_ATTRIBUTE}="" ` : " "} ` + xh.getPsuedoAttributes(this.pseudoStates)), u2 = this._getParentsHTML(s2);
      u2[0] = u2[0].replace("html", "html " + xh.RENDERING_DOCUMENT_ATTRIBUTE + '="" ');
      const [h] = await Promise.all([xh.getEmbeddedCSS(this.element), xh.embedExternalResources(this.element)]), c2 = '<svg width="' + t3 + '" height="' + e2 + '" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[a[href]{color:#0000EE;text-decoration:underline;}' + h.join("") + ']]></style></defs><foreignObject x="0" y="0" width="' + t3 + '" height="' + e2 + '">' + u2[0] + o2 + u2[1] + "</foreignObject></svg>", l2 = this._svgDocument = c2, p2 = Eu.canvasHashes.get(l2);
      if (p2 && Eu.cachedCanvases.has(p2))
        return void (this.canvas = Eu.cachedCanvases.get(p2));
      this.cachedBounds.set(l2, new du().copy(this.bounds)), this.cachedMargin.set(l2, new mu().copy(this.margin)), xh.addToRasterizeQueue(this);
    }
    var r2, n2;
  }
  async rasterize() {
    return new Promise((t3) => {
      this.svgImage.onload = () => {
        xh.addToRenderQueue(this), t3();
      }, this._rasterizingDocument = this._svgDocument, this.svgImage.src = this._svgSrc = "data:image/svg+xml;utf8," + encodeURIComponent(this._svgDocument), this.svgImage.complete && this.svgImage.currentSrc === this.svgImage.src && (xh.addToRenderQueue(this), this.svgImage.onload = null, t3());
    });
  }
  render() {
    const t3 = this._rasterizingDocument;
    if (!this.cachedBounds.has(t3) || !this.cachedMargin.has(t3))
      return void (this.needsRefresh = true);
    if (!this.svgImage.complete)
      return void xh.addToRenderQueue(this);
    let {width: e2, height: r2} = this.cachedBounds.get(t3), {left: n2, top: i2} = this.cachedMargin.get(t3);
    const s2 = this._hashingCanvas;
    let a2 = s2.width, o2 = s2.height;
    const u2 = s2.getContext("2d");
    u2.clearRect(0, 0, a2, o2), u2.imageSmoothingEnabled = false, u2.drawImage(this.svgImage, n2, i2, e2, r2, 0, 0, a2, o2);
    const h = u2.getImageData(0, 0, a2, o2).data, c2 = xh.arrayBufferToBase64(wu.exports.hash(new Uint8Array(h))) + "?w=" + e2 + ";h=" + r2;
    Eu.canvasHashes.set(t3, c2);
    const l2 = Eu.blankRetryCounts.get(t3) || 0;
    if (xh.isBlankImage(h) && l2 < 10)
      return Eu.blankRetryCounts.set(t3, l2 + 1), void setTimeout(() => xh.addToRenderQueue(this), 500);
    if (Eu.cachedCanvases.has(c2))
      return void (this.canvas = Eu.cachedCanvases.get(c2));
    const p2 = this.pixelRatio || parseFloat(this.element.getAttribute(xh.PIXEL_RATIO_ATTRIBUTE)) || window.devicePixelRatio, f2 = Eu.cachedCanvases.size === Eu.cachedCanvases.limit ? Eu.cachedCanvases.shift()[1] : document.createElement("canvas");
    let d = f2.width = e2 * p2, m2 = f2.height = r2 * p2;
    const y2 = f2.getContext("2d");
    y2.imageSmoothingEnabled = false, y2.clearRect(0, 0, d, m2), y2.drawImage(this.svgImage, n2, i2, e2, r2, 0, 0, d, m2), Eu.cachedCanvases.set(c2, f2), this.canvas = f2;
  }
  _getParentsHTML(t3) {
    const e2 = [], r2 = [];
    let n2 = t3.parentElement;
    n2 || (n2 = document.documentElement);
    do {
      let t4 = n2.tagName.toLowerCase(), i2 = " ";
      for (const e3 of n2.attributes)
        e3.name !== "style" && (i2 += `${e3.name}="${e3.value}" `);
      const s2 = "<" + t4 + (t4 === "html" ? ` xmlns="http://www.w3.org/1999/xhtml" style="--x-width:${this.bounds.width}px;--x-height:${this.bounds.height}px;--x-inline-top:${this.border.top + this.margin.top + this.padding.top}px" ` : "") + i2 + `${xh.RENDERING_PARENT_ATTRIBUTE}=""  >`;
      e2.unshift(s2);
      const a2 = "</" + t4 + ">";
      if (r2.push(a2), t4 == "html")
        break;
    } while (n2 = n2.parentElement);
    return [e2.join(""), r2.join("")];
  }
};
let Su = Eu;
Su.DEFAULT_CACHE_SIZE = 4, Su.blankRetryCounts = new Map(), Su.canvasHashes = new xu.LRUMap(1e3), Su.cachedCanvases = new xu.LRUMap(Eu.DEFAULT_CACHE_SIZE);
var Tu, Ou, zu = [], Cu = "ResizeObserver loop completed with undelivered notifications.";
(Ou = Tu || (Tu = {})).BORDER_BOX = "border-box", Ou.CONTENT_BOX = "content-box", Ou.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
var Au, Ru = function(t3) {
  return Object.freeze(t3);
}, Du = function(t3, e2) {
  this.inlineSize = t3, this.blockSize = e2, Ru(this);
}, ku = function() {
  function t3(t4, e2, r2, n2) {
    return this.x = t4, this.y = e2, this.width = r2, this.height = n2, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Ru(this);
  }
  return t3.prototype.toJSON = function() {
    var t4 = this;
    return {x: t4.x, y: t4.y, top: t4.top, right: t4.right, bottom: t4.bottom, left: t4.left, width: t4.width, height: t4.height};
  }, t3.fromRect = function(e2) {
    return new t3(e2.x, e2.y, e2.width, e2.height);
  }, t3;
}(), Iu = function(t3) {
  return t3 instanceof SVGElement && "getBBox" in t3;
}, Lu = function(t3) {
  if (Iu(t3)) {
    var e2 = t3.getBBox(), r2 = e2.width, n2 = e2.height;
    return !r2 && !n2;
  }
  var i2 = t3, s2 = i2.offsetWidth, a2 = i2.offsetHeight;
  return !(s2 || a2 || t3.getClientRects().length);
}, Bu = function(t3) {
  var e2, r2;
  if (t3 instanceof Element)
    return true;
  var n2 = (r2 = (e2 = t3) === null || e2 === void 0 ? void 0 : e2.ownerDocument) === null || r2 === void 0 ? void 0 : r2.defaultView;
  return !!(n2 && t3 instanceof n2.Element);
}, Fu = typeof window != "undefined" ? window : {}, Pu = new WeakMap(), Uu = /auto|scroll/, ju = /^tb|vertical/, qu = /msie|trident/i.test(Fu.navigator && Fu.navigator.userAgent), Hu = function(t3) {
  return parseFloat(t3 || "0");
}, Vu = function(t3, e2, r2) {
  return t3 === void 0 && (t3 = 0), e2 === void 0 && (e2 = 0), r2 === void 0 && (r2 = false), new Du((r2 ? e2 : t3) || 0, (r2 ? t3 : e2) || 0);
}, $u = Ru({devicePixelContentBoxSize: Vu(), borderBoxSize: Vu(), contentBoxSize: Vu(), contentRect: new ku(0, 0, 0, 0)}), Gu = function(t3, e2) {
  if (e2 === void 0 && (e2 = false), Pu.has(t3) && !e2)
    return Pu.get(t3);
  if (Lu(t3))
    return Pu.set(t3, $u), $u;
  var r2 = getComputedStyle(t3), n2 = Iu(t3) && t3.ownerSVGElement && t3.getBBox(), i2 = !qu && r2.boxSizing === "border-box", s2 = ju.test(r2.writingMode || ""), a2 = !n2 && Uu.test(r2.overflowY || ""), o2 = !n2 && Uu.test(r2.overflowX || ""), u2 = n2 ? 0 : Hu(r2.paddingTop), h = n2 ? 0 : Hu(r2.paddingRight), c2 = n2 ? 0 : Hu(r2.paddingBottom), l2 = n2 ? 0 : Hu(r2.paddingLeft), p2 = n2 ? 0 : Hu(r2.borderTopWidth), f2 = n2 ? 0 : Hu(r2.borderRightWidth), d = n2 ? 0 : Hu(r2.borderBottomWidth), m2 = l2 + h, y2 = u2 + c2, g2 = (n2 ? 0 : Hu(r2.borderLeftWidth)) + f2, v2 = p2 + d, x2 = o2 ? t3.offsetHeight - v2 - t3.clientHeight : 0, w2 = a2 ? t3.offsetWidth - g2 - t3.clientWidth : 0, b2 = i2 ? m2 + g2 : 0, _2 = i2 ? y2 + v2 : 0, M = n2 ? n2.width : Hu(r2.width) - b2 - w2, N = n2 ? n2.height : Hu(r2.height) - _2 - x2, E = M + m2 + w2 + g2, S = N + y2 + x2 + v2, T = Ru({devicePixelContentBoxSize: Vu(Math.round(M * devicePixelRatio), Math.round(N * devicePixelRatio), s2), borderBoxSize: Vu(E, S, s2), contentBoxSize: Vu(M, N, s2), contentRect: new ku(l2, u2, M, N)});
  return Pu.set(t3, T), T;
}, Wu = function(t3, e2, r2) {
  var n2 = Gu(t3, r2), i2 = n2.borderBoxSize, s2 = n2.contentBoxSize, a2 = n2.devicePixelContentBoxSize;
  switch (e2) {
    case Tu.DEVICE_PIXEL_CONTENT_BOX:
      return a2;
    case Tu.BORDER_BOX:
      return i2;
    default:
      return s2;
  }
}, Yu = function(t3) {
  var e2 = Gu(t3);
  this.target = t3, this.contentRect = e2.contentRect, this.borderBoxSize = Ru([e2.borderBoxSize]), this.contentBoxSize = Ru([e2.contentBoxSize]), this.devicePixelContentBoxSize = Ru([e2.devicePixelContentBoxSize]);
}, Zu = function(t3) {
  if (Lu(t3))
    return 1 / 0;
  for (var e2 = 0, r2 = t3.parentNode; r2; )
    e2 += 1, r2 = r2.parentNode;
  return e2;
}, Xu = function() {
  var t3 = 1 / 0, e2 = [];
  zu.forEach(function(r3) {
    if (r3.activeTargets.length !== 0) {
      var n3 = [];
      r3.activeTargets.forEach(function(e3) {
        var r4 = new Yu(e3.target), i2 = Zu(e3.target);
        n3.push(r4), e3.lastReportedSize = Wu(e3.target, e3.observedBox), i2 < t3 && (t3 = i2);
      }), e2.push(function() {
        r3.callback.call(r3.observer, n3, r3.observer);
      }), r3.activeTargets.splice(0, r3.activeTargets.length);
    }
  });
  for (var r2 = 0, n2 = e2; r2 < n2.length; r2++) {
    (0, n2[r2])();
  }
  return t3;
}, Qu = function(t3) {
  zu.forEach(function(e2) {
    e2.activeTargets.splice(0, e2.activeTargets.length), e2.skippedTargets.splice(0, e2.skippedTargets.length), e2.observationTargets.forEach(function(r2) {
      r2.isActive() && (Zu(r2.target) > t3 ? e2.activeTargets.push(r2) : e2.skippedTargets.push(r2));
    });
  });
}, Ju = function() {
  var t3, e2 = 0;
  for (Qu(e2); zu.some(function(t4) {
    return t4.activeTargets.length > 0;
  }); )
    e2 = Xu(), Qu(e2);
  return zu.some(function(t4) {
    return t4.skippedTargets.length > 0;
  }) && (typeof ErrorEvent == "function" ? t3 = new ErrorEvent("error", {message: Cu}) : ((t3 = document.createEvent("Event")).initEvent("error", false, false), t3.message = Cu), window.dispatchEvent(t3)), e2 > 0;
}, Ku = [], th = function(t3) {
  if (!Au) {
    var e2 = 0, r2 = document.createTextNode("");
    new MutationObserver(function() {
      return Ku.splice(0).forEach(function(t4) {
        return t4();
      });
    }).observe(r2, {characterData: true}), Au = function() {
      r2.textContent = "" + (e2 ? e2-- : e2++);
    };
  }
  Ku.push(t3), Au();
}, eh = 0, rh = {attributes: true, characterData: true, childList: true, subtree: true}, nh = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"], ih = function(t3) {
  return t3 === void 0 && (t3 = 0), Date.now() + t3;
}, sh = false, ah = new (function() {
  function t3() {
    var t4 = this;
    this.stopped = true, this.listener = function() {
      return t4.schedule();
    };
  }
  return t3.prototype.run = function(t4) {
    var e2 = this;
    if (t4 === void 0 && (t4 = 250), !sh) {
      sh = true;
      var r2, n2 = ih(t4);
      r2 = function() {
        var r3 = false;
        try {
          r3 = Ju();
        } finally {
          if (sh = false, t4 = n2 - ih(), !eh)
            return;
          r3 ? e2.run(1e3) : t4 > 0 ? e2.run(t4) : e2.start();
        }
      }, th(function() {
        requestAnimationFrame(r2);
      });
    }
  }, t3.prototype.schedule = function() {
    this.stop(), this.run();
  }, t3.prototype.observe = function() {
    var t4 = this, e2 = function() {
      return t4.observer && t4.observer.observe(document.body, rh);
    };
    document.body ? e2() : Fu.addEventListener("DOMContentLoaded", e2);
  }, t3.prototype.start = function() {
    var t4 = this;
    this.stopped && (this.stopped = false, this.observer = new MutationObserver(this.listener), this.observe(), nh.forEach(function(e2) {
      return Fu.addEventListener(e2, t4.listener, true);
    }));
  }, t3.prototype.stop = function() {
    var t4 = this;
    this.stopped || (this.observer && this.observer.disconnect(), nh.forEach(function(e2) {
      return Fu.removeEventListener(e2, t4.listener, true);
    }), this.stopped = true);
  }, t3;
}())(), oh = function(t3) {
  !eh && t3 > 0 && ah.start(), !(eh += t3) && ah.stop();
}, uh = function() {
  function t3(t4, e2) {
    this.target = t4, this.observedBox = e2 || Tu.CONTENT_BOX, this.lastReportedSize = {inlineSize: 0, blockSize: 0};
  }
  return t3.prototype.isActive = function() {
    var t4, e2 = Wu(this.target, this.observedBox, true);
    return t4 = this.target, Iu(t4) || function(t5) {
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
}(), hh = function(t3, e2) {
  this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t3, this.callback = e2;
}, ch = new WeakMap(), lh = function(t3, e2) {
  for (var r2 = 0; r2 < t3.length; r2 += 1)
    if (t3[r2].target === e2)
      return r2;
  return -1;
}, ph = function() {
  function t3() {
  }
  return t3.connect = function(t4, e2) {
    var r2 = new hh(t4, e2);
    ch.set(t4, r2);
  }, t3.observe = function(t4, e2, r2) {
    var n2 = ch.get(t4), i2 = n2.observationTargets.length === 0;
    lh(n2.observationTargets, e2) < 0 && (i2 && zu.push(n2), n2.observationTargets.push(new uh(e2, r2 && r2.box)), oh(1), ah.schedule());
  }, t3.unobserve = function(t4, e2) {
    var r2 = ch.get(t4), n2 = lh(r2.observationTargets, e2), i2 = r2.observationTargets.length === 1;
    n2 >= 0 && (i2 && zu.splice(zu.indexOf(r2), 1), r2.observationTargets.splice(n2, 1), oh(-1));
  }, t3.disconnect = function(t4) {
    var e2 = this, r2 = ch.get(t4);
    r2.observationTargets.slice().forEach(function(r3) {
      return e2.unobserve(t4, r3.target);
    }), r2.activeTargets.splice(0, r2.activeTargets.length);
  }, t3;
}(), fh = function() {
  function t3(t4) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t4 != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    ph.connect(this, t4);
  }
  return t3.prototype.observe = function(t4, e2) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Bu(t4))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    ph.observe(this, t4, e2);
  }, t3.prototype.unobserve = function(t4) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Bu(t4))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    ph.unobserve(this, t4);
  }, t3.prototype.disconnect = function() {
    ph.disconnect(this);
  }, t3.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, t3;
}();
const dh = self.ResizeObserver || fh;
const mh = new m(), yh = new m(), gh = new TextDecoder(), vh = class {
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
    if (fu(s2, `[${vh.RENDERING_DOCUMENT_ATTRIBUTE}] *`, "transform: none !important;", a2++), fu(s2, `[${vh.RENDERING_ATTRIBUTE}], [${vh.RENDERING_ATTRIBUTE}] *`, "visibility: visible !important;", a2++), fu(s2, `[${vh.RENDERING_ATTRIBUTE}] [${vh.LAYER_ATTRIBUTE}], [${vh.RENDERING_ATTRIBUTE}] [${vh.LAYER_ATTRIBUTE}] *`, "visibility: hidden !important;", a2++), fu(s2, `[${vh.RENDERING_ATTRIBUTE}]`, "position: relative; top: 0 !important; left: 0 !important; float: none; box-sizing:border-box; min-width:var(--x-width); min-height:var(--x-height); display:block !important;", a2++), fu(s2, `[${vh.RENDERING_INLINE_ATTRIBUTE}]`, "top: var(--x-inline-top) !important; width:auto !important", a2++), fu(s2, `[${vh.RENDERING_PARENT_ATTRIBUTE}]`, "transform: none !important; left: 0 !important; top: 0 !important; margin: 0 !important; border:0 !important; border-radius:0 !important; height:100% !important; padding:0 !important; position:static !important; display:block !important; background: rgba(0,0,0,0) none !important; box-shadow:none !important", a2++), fu(s2, `[${vh.RENDERING_PARENT_ATTRIBUTE}]::before, [${vh.RENDERING_PARENT_ATTRIBUTE}]::after`, "content:none !important; box-shadow:none !important;", a2++), r2 === e2) {
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
    vh.tasksPending = false;
    const t3 = vh.serializeQueue, e2 = vh.rasterizeQueue, r2 = vh.renderQueue, n2 = vh.TASK_SYNC_MAX_TIME / 2;
    let i2 = performance.now();
    for (; r2.length && performance.now() - i2 < n2; )
      r2.shift().render();
    for (i2 = performance.now(); t3.length && performance.now() - i2 < n2; )
      t3.shift().serialize();
    e2.length && vh.rasterizeTaskCount < vh.TASK_ASYNC_MAX_COUNT && (vh.rasterizeTaskCount++, e2.shift().rasterize().then(() => {
      vh.rasterizeTaskCount--;
    }));
  }
  static scheduleTasksIfNeeded() {
    this.tasksPending || vh.serializeQueue.length === 0 && vh.renderQueue.length === 0 && (vh.rasterizeQueue.length === 0 || vh.rasterizeTaskCount === vh.TASK_ASYNC_MAX_COUNT) || (this.tasksPending = true, vh.scheduleIdle(vh._runTasks));
  }
  static scheduleIdle(t3) {
    setTimeout(t3, 1);
  }
  static setLayerNeedsRefresh(t3) {
    t3.needsRefresh = true;
  }
  static createLayerTree(t3, e2) {
    if (vh.getClosestLayer(t3))
      throw new Error("A root WebLayer for the given element already exists");
    !function(t4) {
      const e3 = t4.ownerDocument, r3 = t4.getRootNode();
      if (e3.contains(t4) || e3.contains(r3 == null ? void 0 : r3.host))
        return t4;
      const n3 = r3.host || e3.createElement("div");
      n3.setAttribute(xh.RENDERING_CONTAINER_ATTRIBUTE, ""), n3.style.position = "fixed", n3.style.width = "100%", n3.style.height = "100%", n3.style.top = "-100000px", n3.style.contain = "strict", r3.host || n3.appendChild(t4), e3.documentElement.appendChild(n3);
    }(t3), vh.initRootNodeObservation(t3);
    const r2 = new MutationObserver(vh._handleMutations);
    this.mutationObservers.set(t3, r2), this.startMutationObserver(t3);
    const n2 = new dh((t4) => {
      for (const e3 of t4) {
        const t5 = this.getClosestLayer(e3.target);
        t5.traverseLayers(vh.setLayerNeedsRefresh), t5.traverseParentLayers(vh.setLayerNeedsRefresh);
      }
    });
    n2.observe(t3), this.resizeObservers.set(t3, n2), t3.addEventListener("input", this._triggerRefresh, {capture: true}), t3.addEventListener("keydown", this._triggerRefresh, {capture: true}), t3.addEventListener("submit", this._triggerRefresh, {capture: true}), t3.addEventListener("change", this._triggerRefresh, {capture: true}), t3.addEventListener("focus", this._triggerRefresh, {capture: true}), t3.addEventListener("blur", this._triggerRefresh, {capture: true}), t3.addEventListener("transitionend", this._triggerRefresh, {capture: true});
    const i2 = new Su(t3, e2);
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
    const e2 = t3 && t3.closest(`[${vh.LAYER_ATTRIBUTE}]`);
    return this.layers.get(e2);
  }
  static parseCSSTransform(t3, e2, r2, n2, i2 = new m()) {
    const s2 = t3.transform, a2 = t3.transformOrigin;
    if (s2.indexOf("matrix(") == 0) {
      i2.identity();
      var o2 = s2.substring(7, s2.length - 1).split(", ").map(parseFloat);
      i2.elements[0] = o2[0], i2.elements[1] = o2[1], i2.elements[4] = o2[2], i2.elements[5] = o2[3], i2.elements[12] = o2[4], i2.elements[13] = o2[5];
    } else {
      if (s2.indexOf("matrix3d(") != 0)
        return null;
      o2 = s2.substring(9, s2.length - 1).split(", ").map(parseFloat);
      i2.fromArray(o2);
    }
    i2.elements[0] === 0 && (i2.elements[0] = 1e-15), i2.elements[5] === 0 && (i2.elements[5] = 1e-15), i2.elements[10] === 0 && (i2.elements[10] = 1e-15), i2.elements[12] *= n2, i2.elements[13] *= -1 * n2;
    var u2 = a2.split(" ").map(parseFloat), h = (u2[0] - e2 / 2) * n2, c2 = (u2[1] - r2 / 2) * n2 * -1, l2 = u2[2] || 0, p2 = mh.identity().makeTranslation(-h, -c2, -l2), f2 = yh.identity().makeTranslation(h, c2, l2);
    for (const d of i2.elements)
      if (isNaN(d))
        return null;
    return i2.premultiply(f2).multiply(p2);
  }
  static async embedExternalResources(t3) {
    const e2 = [], r2 = t3.querySelectorAll("*");
    for (const i2 of r2) {
      const t4 = i2.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      t4 && e2.push(vh.getDataURL(t4).then((t5) => {
        i2.removeAttributeNS("http://www.w3.org/1999/xlink", "href"), i2.setAttribute("href", t5);
      }));
      const r3 = i2;
      if (i2.tagName == "IMG" && r3.src.substr(0, 4) != "data" && e2.push(vh.getDataURL(r3.src).then((t5) => {
        i2.setAttribute("src", t5);
      })), i2.namespaceURI == "http://www.w3.org/1999/xhtml" && i2.hasAttribute("style")) {
        const t5 = i2.getAttribute("style") || "";
        e2.push(vh.generateEmbeddedCSS(window.location.href, t5).then((e3) => {
          t5 != e3 && i2.setAttribute("style", e3);
        }));
      }
    }
    const n2 = t3.querySelectorAll("style");
    for (const i2 of n2)
      e2.push(vh.generateEmbeddedCSS(window.location.href, i2.innerHTML).then((t4) => {
        i2.innerHTML != t4 && (i2.innerHTML = t4);
      }));
    return Promise.all(e2);
  }
  static pauseMutationObservers() {
    const t3 = vh.mutationObservers.values();
    for (const e2 of t3)
      vh._handleMutations(e2.takeRecords()), e2.disconnect();
  }
  static resumeMutationObservers() {
    for (const [t3] of vh.mutationObservers)
      this.startMutationObserver(t3);
  }
  static startMutationObserver(t3) {
    vh.mutationObservers.get(t3).observe(t3, {attributes: true, childList: true, subtree: true, characterData: true, characterDataOldValue: true, attributeOldValue: true});
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
          i2[r2].cssText.indexOf(":hover") > -1 && a2.push(i2[r2].cssText.replace(new RegExp(":hover", "g"), `[${vh.HOVER_ATTRIBUTE}]`)), i2[r2].cssText.indexOf(":active") > -1 && a2.push(i2[r2].cssText.replace(new RegExp(":active", "g"), `[${vh.ACTIVE_ATTRIBUTE}]`)), i2[r2].cssText.indexOf(":focus") > -1 && a2.push(i2[r2].cssText.replace(new RegExp(":focus", "g"), `[${vh.FOCUS_ATTRIBUTE}]`)), i2[r2].cssText.indexOf(":target") > -1 && a2.push(i2[r2].cssText.replace(new RegExp(":target", "g"), `[${vh.TARGET_ATTRIBUTE}]`));
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
            var r3 = gh.decode(t4.response);
            return this.generateEmbeddedCSS(window.location.href, r3);
          }));
    return i2 && this._addDynamicPseudoClassRules(e2), Promise.all(r2.values());
  }
  static async getDataURL(t3) {
    var e2;
    const r2 = await this.getURL(t3), n2 = new Uint8Array(r2.response), i2 = (e2 = r2.getResponseHeader("Content-Type")) == null ? void 0 : e2.split(";")[0];
    if (i2 == "text/css") {
      let e3 = gh.decode(n2);
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
let xh = vh;
if (xh.ATTRIBUTE_PREFIX = "xr", xh._nextUID = 0, xh.serializer = new XMLSerializer(), xh.rootLayers = new Map(), xh.layers = new Map(), xh.mutationObservers = new Map(), xh.resizeObservers = new Map(), xh.serializeQueue = [], xh.rasterizeQueue = [], xh.renderQueue = [], xh.focusElement = null, xh.activeElement = null, xh.targetElement = null, xh.rootNodeObservers = new Map(), xh.TASK_ASYNC_MAX_COUNT = 2, xh.TASK_SYNC_MAX_TIME = 200, xh.rasterizeTaskCount = 0, xh.tasksPending = false, xh._handleMutations = (t3) => {
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
    const r2 = vh.getClosestLayer(t4);
    if (r2) {
      if (e2.type === "attributes" && e2.attributeName === "class") {
        if ((e2.oldValue ? e2.oldValue : "") === e2.target.className)
          continue;
      }
      r2.parentLayer ? r2.parentLayer.traverseChildLayers(vh.setLayerNeedsRefresh) : r2.traverseLayers(vh.setLayerNeedsRefresh);
    }
  }
}, xh._triggerRefresh = async (t3) => {
  const e2 = vh.getClosestLayer(t3.target);
  e2 && (e2.parentLayer ? e2.parentLayer.traverseChildLayers(vh.setLayerNeedsRefresh) : e2.traverseLayers(vh.setLayerNeedsRefresh));
}, xh.embeddedCSS = new Map(), self.THREE)
  var wh = self.THREE;
else
  wh = t;
const bh = new wh.Matrix4(), _h = new wh.Vector3(), Mh = new wh.Vector3(), Nh = new du(), Eh = new du(), Sh = Symbol("ON_BEFORE_UPDATE");
class Th extends wh.Object3D {
  constructor(t3, e2 = {}) {
    super(), this.element = t3, this.options = e2, this.isRoot = false, this._localZ = 0, this._viewZ = 0, this._renderZ = 0, this.textures = new Map(), this.textureNeedsUpdate = false, this.contentMesh = new wh.Mesh(zh.GEOMETRY, new wh.MeshBasicMaterial({side: wh.DoubleSide, transparent: true, alphaTest: 1e-3, opacity: 1})), this._boundsMesh = new wh.Mesh(zh.GEOMETRY, new wh.MeshBasicMaterial({visible: false})), this.cursor = new wh.Object3D(), this.depthMaterial = new wh.MeshDepthMaterial({depthPacking: wh.RGBADepthPacking, alphaTest: 1e-3}), this.domLayout = new wh.Object3D(), this.domSize = new wh.Vector3(1, 1, 1), this.childWebLayers = [], this.shouldApplyDOMLayout = "auto", this.name = t3.id, this._webLayer = xh.getClosestLayer(t3), this.add(this.contentMesh), this.add(this._boundsMesh), this.cursor.visible = false, this.matrixAutoUpdate = true, this.contentMesh.matrixAutoUpdate = true, this.contentMesh.visible = false, this.contentMesh.customDepthMaterial = this.depthMaterial, this.contentMesh.onBeforeRender = (t4, e3, r2) => {
      this._camera = r2;
    }, this._boundsMesh.matrixAutoUpdate = true, zh.layersByElement.set(this.element, this), zh.layersByMesh.set(this.contentMesh, this);
  }
  get currentTexture() {
    if (this._webLayer.element.tagName === "VIDEO") {
      const t4 = this._webLayer.element;
      let e3 = this.textures.get(t4);
      return e3 || (e3 = new wh.VideoTexture(t4), e3.wrapS = wh.ClampToEdgeWrapping, e3.wrapT = wh.ClampToEdgeWrapping, e3.minFilter = wh.LinearFilter, this.options.textureEncoding && (e3.encoding = this.options.textureEncoding), this.textures.set(t4, e3)), e3;
    }
    const t3 = this._webLayer.canvas;
    let e2 = this.textures.get(t3);
    return e2 ? this.textureNeedsUpdate && (this.textureNeedsUpdate = false, e2.needsUpdate = true) : (e2 = new wh.Texture(t3), e2.needsUpdate = true, e2.wrapS = wh.ClampToEdgeWrapping, e2.wrapT = wh.ClampToEdgeWrapping, e2.minFilter = wh.LinearFilter, this.options.textureEncoding && (e2.encoding = this.options.textureEncoding), this.textures.set(t3, e2)), e2;
  }
  get pseudoStates() {
    return this._webLayer.pseudoStates;
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
    this._webLayer.traverseLayers(xh.setLayerNeedsRefresh);
  }
  get needsRemoval() {
    return this._webLayer.needsRemoval;
  }
  get bounds() {
    return this._webLayer.bounds;
  }
  get parentWebLayer() {
    return this._webLayer.parentLayer && zh.layersByElement.get(this._webLayer.parentLayer.element);
  }
  refresh(t3 = false) {
    this._webLayer.refresh(), this.childWebLayers.length = 0;
    for (const e2 of this._webLayer.childLayers) {
      const r2 = zh.getClosestLayerForElement(e2.element);
      r2 && (this.childWebLayers.push(r2), t3 && r2.refresh(t3));
    }
    this._refreshVideoBounds(), this._refreshDOMLayout();
  }
  updateLayout() {
    this.position.copy(this.domLayout.position), this.quaternion.copy(this.domLayout.quaternion), this.scale.copy(this.domLayout.scale), this.contentMesh.position.set(0, 0, 0), this.contentMesh.scale.copy(this.domSize), this.contentMesh.quaternion.set(0, 0, 0, 1), this._boundsMesh.position.set(0, 0, 0), this._boundsMesh.scale.copy(this.domSize), this._boundsMesh.quaternion.set(0, 0, 0, 1);
  }
  updateContent() {
    const t3 = this.contentMesh, e2 = this.currentTexture, r2 = t3.material;
    e2.image && r2.map !== e2 && (r2.map = e2, r2.depthWrite = false, r2.needsUpdate = true, this.depthMaterial.map = e2, this.depthMaterial.needsUpdate = true), r2.transparent = true;
    const n2 = t3.material.opacity < 5e-3;
    if (n2 ? t3.visible = false : t3.material.map && (t3.visible = true), this.needsRemoval && n2 && (this.parent && this.parent.remove(this), this.dispose()), !this._camera)
      return;
    this._localZ = Math.abs(_h.setFromMatrixPosition(this.matrix).z + _h.setFromMatrixPosition(this.contentMesh.matrix).z), this._viewZ = Math.abs(this.contentMesh.getWorldPosition(_h).applyMatrix4(this._camera.matrixWorldInverse).z);
    let i2 = this.parentWebLayer ? this.parentWebLayer._renderZ : this._viewZ;
    this._localZ < 1e-8 ? this._renderZ = i2 : this._renderZ = this._viewZ, this.contentMesh.renderOrder = (this.options.renderOrderOffset || 0) + (1 - Math.log(this._renderZ + 1) / Math.log(this._camera.far + 1)) + 1e-7 * (this.depth + 1e-3 * this.index);
  }
  get rootWebLayer() {
    return zh.layersByElement.get(this._webLayer.rootLayer.element);
  }
  [Sh]() {
  }
  _doUpdate() {
    this[Sh](), this.updateContent(), this.updateLayout(), this.needsRefresh && this.options.autoRefresh !== false && this.refresh(), xh.scheduleTasksIfNeeded();
  }
  update(t3 = false) {
    t3 ? this.traverseLayersPreOrder(this._doUpdate) : this._doUpdate();
  }
  querySelector(t3) {
    const e2 = this.element.querySelector(t3);
    if (e2)
      return zh.layersByElement.get(e2);
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
    this.contentMesh.geometry.dispose(), this._boundsMesh.geometry.dispose(), xh.disposeLayer(this._webLayer);
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
    const t3 = this.bounds, e2 = t3.width, r2 = t3.height, n2 = 1 / zh.DEFAULT_PIXELS_PER_UNIT;
    if (this.domSize.set(Math.max(n2 * e2, 1e-5), Math.max(n2 * r2, 1e-5), 1), !zh.shouldApplyDOMLayout(this))
      return;
    const i2 = this.parentWebLayer instanceof Th ? this.parentWebLayer.bounds : function(t4) {
      return gu.parentNode || document.documentElement.append(gu), t4.left = pageXOffset, t4.top = pageYOffset, t4.width = gu.offsetWidth, t4.height = gu.offsetHeight, t4;
    }(Nh), s2 = -i2.width / 2 + e2 / 2, a2 = i2.height / 2 - r2 / 2;
    this.domLayout.position.set(n2 * (s2 + t3.left), n2 * (a2 - t3.top), 0);
    const o2 = getComputedStyle(this.element), u2 = o2.transform;
    if (u2 && u2 !== "none") {
      const t4 = xh.parseCSSTransform(o2, e2, r2, n2, bh);
      t4 && (this.domLayout.updateMatrix(), this.domLayout.matrix.multiply(t4), this.domLayout.matrix.decompose(this.domLayout.position, this.domLayout.quaternion, this.domLayout.scale));
    }
  }
}
const Oh = class extends wh.Object3D {
  constructor(t3, e2 = {}) {
    super(), this.options = e2, this._interactionRays = [], this._raycaster = new wh.Raycaster(), this._hitIntersections = [], this._previousHoverLayers = new Set(), this._contentMeshes = [], this._prepareHitTest = (t4) => {
      t4.pseudoStates.hover && this._previousHoverLayers.add(t4), t4.cursor.visible = false, t4.pseudoStates.hover = false, this._contentMeshes.push(t4.contentMesh);
    };
    const r2 = typeof t3 == "string" ? vu(t3) : t3;
    xh.createLayerTree(r2, (t4, {target: e3}) => {
      var n2, i2;
      if (t4 === "layercreated") {
        const t5 = new Th(e3, this.options);
        e3 === r2 ? (t5[Sh] = () => this._updateInteractions(), t5.isRoot = true, this.rootLayer = t5, this.add(t5)) : (n2 = t5.parentWebLayer) == null || n2.add(t5), this.options.onLayerCreate && this.options.onLayerCreate(t5);
      } else if (t4 === "layerpainted") {
        const t5 = xh.layers.get(e3);
        Oh.layersByElement.get(t5.element).textureNeedsUpdate = true;
      } else if (t4 === "layermoved") {
        const t5 = Oh.layersByElement.get(e3);
        (i2 = t5.parentWebLayer) == null || i2.add(t5);
      }
    }), this.refresh(), this.update();
  }
  static shouldApplyDOMLayout(t3) {
    const e2 = t3.shouldApplyDOMLayout;
    return e2 === "always" || e2 === true || e2 !== "never" && e2 !== false && !(e2 !== "auto" || !t3.parentWebLayer || t3.parent !== t3.parentWebLayer);
  }
  get interactionRays() {
    return this._interactionRays;
  }
  set interactionRays(t3) {
    this._interactionRays = t3;
  }
  querySelector(t3) {
    return this.rootLayer.querySelector(t3);
  }
  refresh() {
    this.rootLayer.refresh(true);
  }
  update() {
    this.rootLayer.update(true);
  }
  get contentMesh() {
    return this.rootLayer.contentMesh;
  }
  _intersectionSort(t3, e2) {
    const r2 = t3.object.parent, n2 = e2.object.parent;
    return r2.depth !== n2.depth ? n2.depth - r2.depth : n2.index - r2.index;
  }
  _updateInteractions() {
    const t3 = this._previousHoverLayers;
    t3.clear(), this._contentMeshes.length = 0, this.rootLayer.traverseLayersPreOrder(this._prepareHitTest);
    for (const e2 of this._interactionRays) {
      e2 instanceof wh.Ray ? this._raycaster.ray.copy(e2) : this._raycaster.ray.set(e2.getWorldPosition(_h), e2.getWorldDirection(Mh)), this._hitIntersections.length = 0;
      const r2 = this._raycaster.intersectObjects(this._contentMeshes, false, this._hitIntersections);
      r2.sort(this._intersectionSort);
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
    return Oh.layersByElement.get(e2);
  }
  static getClosestLayerForElement(t3) {
    const e2 = t3 && t3.closest(`[${xh.LAYER_ATTRIBUTE}]`);
    return Oh.layersByElement.get(e2);
  }
  hitTest(t3) {
    const e2 = this._raycaster, r2 = this._hitIntersections, n2 = Oh.layersByMesh;
    e2.ray.copy(t3), r2.length = 0, e2.intersectObject(this, true, r2), r2.sort(this._intersectionSort);
    for (const i2 of r2) {
      const t4 = n2.get(i2.object);
      if (!t4)
        continue;
      const e3 = yu(t4.element, Nh);
      if (!e3.width || !e3.height)
        continue;
      let r3 = t4.element;
      const s2 = i2.uv.x * e3.width, a2 = (1 - i2.uv.y) * e3.height;
      return pu(t4.element, (t5) => {
        if (!r3.contains(t5))
          return false;
        const n3 = yu(t5, Eh), i3 = n3.left - e3.left, o2 = n3.top - e3.top, {width: u2, height: h} = n3;
        return s2 > i3 && s2 < i3 + u2 && a2 > o2 && a2 < o2 + h && (r3 = t5, true);
      }), {layer: t4, intersection: i2, target: r3};
    }
  }
};
let zh = Oh;
zh.layersByElement = new WeakMap(), zh.layersByMesh = new WeakMap(), zh.DEFAULT_LAYER_SEPARATION = 1e-3, zh.DEFAULT_PIXELS_PER_UNIT = 1e3, zh.GEOMETRY = new wh.PlaneGeometry(1, 1, 2, 2);
