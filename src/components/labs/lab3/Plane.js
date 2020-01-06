import * as THREE from "three";

export class Plane {
  constructor() {
    this.uniforms = {};
    this.texture = null;
    this.mesh = null;
    this.vs = `
      attribute vec3 position;
      attribute vec2 uv;

      varying vec2 vUv;

      void main(void) {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;
    this.fs = `
      precision highp float;

      uniform vec2 resolution;
      uniform vec2 imageResolution;
      uniform sampler2D texture;

      varying vec2 vUv;

      void main(void) {
        vec2 ratio = vec2(
            min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
            min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
          );

        vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
        gl_FragColor = texture2D(texture, uv);
      }
    `;
  }
  loadTexture(image, callback) {
    const loader = new THREE.TextureLoader();
    loader.load(image, texture => {
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      this.texture = texture;
      this.mesh = this.createMesh();
      callback();
    });
  }
  createMesh() {
    this.uniforms = {
      resolution: {
        type: "v2",
        value: new THREE.Vector2(
          document.body.clientWidth,
          document.body.clientHeight
        )
      },
      imageResolution: {
        type: "v2",
        value: new THREE.Vector2(2048, 1356)
      },
      texture: {
        type: "t",
        value: this.texture
      }
    };
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vs,
        fragmentShader: this.fs
      })
    );
  }
  render(time) {
    if (this.stop) return;
    this.uniforms.time.value += time / this.interval;
    if (this.uniforms.time.value > 1) {
      this.uniforms.time.value = 0;
      this.prev_num = this.next_num;
      this.uniforms.texPrev.value = this.textures[this.next_num];
      while (this.next_num === this.prev_num) {
        this.next_num = Math.floor(Math.random() * this.textures.length);
      }
      this.uniforms.texNext.value = this.textures[this.next_num];
    }
  }
  resize() {
    this.uniforms.resolution.value.set(
      document.body.clientWidth,
      document.body.clientHeight
    );
  }
}
