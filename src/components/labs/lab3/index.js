import React, { Component } from "react";
import * as THREE from "three";
import { TouchTexture } from "./TouchTexture";
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  Effect
} from "postprocessing/build/postprocessing.min.js";
import { Plane } from "./Plane";
import styles from "./lab.module.scss";
import HideInStateAndUp from "../../ui-components/hide-in-states";

class WaterEffect extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.plane = new Plane();
  }

  componentDidMount() {
    // setting debug to true will append a canvas to the mount allowing you to better see the touchTexture
    this.touchTexture = new TouchTexture({ debug: false, mount: this.mount });

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;

    this.composer = new EffectComposer(this.renderer);

    this.mount.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 30;

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    this.tick = this.tick.bind(this);

    this.init();
  }

  init() {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", this.onMouseMove.bind(this));
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
    }
    this.touchTexture.initTexture();

    var light = new THREE.AmbientLight(0x404040, 4);
    this.scene.add(light);

    this.planeHeight = this.visibleHeightAtZDepth(0, this.camera);
    this.planeWidth = this.visibleWidthAtZDepth(0, this.camera);

    this.addPlane();
    this.initComposer();
    this.tick();
  }

  initComposer() {
    const renderPass = new RenderPass(this.scene, this.camera);
    const tex = this.touchTexture.texture;
    const fragment = `
      uniform sampler2D uTexture;
      #define PI 3.14159265359

      void mainUv(inout vec2 uv) {
              vec4 tex = texture2D(uTexture, uv);
          // Convert normalized values into regular unit vector
              float vx = -(tex.r *2. - 1.);
              float vy = -(tex.g *2. - 1.);
          // Normalized intensity works just fine for intensity
              float intensity = tex.b;
              float maxAmplitude = 0.2;
              uv.x += vx * intensity * maxAmplitude;
              uv.y += vy * intensity * maxAmplitude;
          }
      `;
    this.waterEffect = new Effect("WaterEffect", fragment, {
      uniforms: new Map([["uTexture", new THREE.Uniform(tex)]])
    });
    const waterPass = new EffectPass(this.camera, this.waterEffect);
    renderPass.renderToScreen = false;
    waterPass.renderToScreen = true;
    this.composer.addPass(renderPass);
    this.composer.addPass(waterPass);
  }

  addPlane() {
    this.plane.loadTexture("/tokyo_storefront.jpg", () => {
      console.log("texture loaded");
      this.scene.add(this.plane.mesh);
      this.onWindowResize();
    });
  }

  visibleHeightAtZDepth(depth, camera) {
    // compensate for cameras not positioned at z=0
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    // vertical fov in radians
    const vFOV = (camera.fov * Math.PI) / 180;

    // Math.abs to ensure the result is always positive
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  visibleWidthAtZDepth(depth, camera) {
    const height = this.visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
  }

  onMouseMove(ev) {
    const point = {
      x: ev.clientX / window.innerWidth,
      y: ev.clientY / window.innerHeight
    };

    this.touchTexture.addPoint(point);
  }

  tick() {
    this.animate();
    this.touchTexture.update();
    requestAnimationFrame(this.tick);
  }

  animate() {
    // this.renderer.render(this.scene, this.camera)
    this.composer.render(this.clock.getDelta());
  }

  onWindowResize() {
    this.scene.width = document.body.clientWidth;
    this.scene.height = document.body.clientHeight;
    this.camera.aspect = document.body.clientWidth / document.body.clientHeight;
    this.camera.updateProjectionMatrix();
    this.plane.mesh.material.uniforms.resolution.value.set(
      document.body.clientWidth,
      document.body.clientHeight
    );

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    return (
      <>
        <HideInStateAndUp />
        <div
          className={styles.root}
          ref={mount => {
            this.mount = mount;
          }}
        ></div>
      </>
    );
  }
}

export default WaterEffect;
