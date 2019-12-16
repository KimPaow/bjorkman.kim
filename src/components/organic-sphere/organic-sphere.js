import React, { Component } from "react";
import SimplexNoise from "simplex-noise";
import * as THREE from "three";
import styles from "./organic-sphere.module.scss";

class OrganicSphere extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.horizontalCenter =
      typeof window !== `undefined` ? window.innerWidth / 2 : 0;
    this.verticalCenter =
      typeof window !== `undefined` ? window.innerHeight / 2 : 0;
    this.mouseX = null;
    this.mouseY = null;

    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    this.camera.position.z = 3;
    this.camera.position.x = 0;

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //ADD SIMPLEX
    this.simplex = new SimplexNoise();

    //ADD MATERIAL
    let material = new THREE.PointsMaterial({
      size: 0.01,
      color: 0x000000
    });

    //ADD LIGHT
    let lightTop = new THREE.DirectionalLight(0xffffff, 0.7);
    lightTop.position.set(0, 500, 200);
    lightTop.castShadow = true;
    this.scene.add(lightTop);

    let lightBottom = new THREE.DirectionalLight(0xffffff, 0.25);
    lightBottom.position.set(0, -500, 400);
    lightBottom.castShadow = true;
    this.scene.add(lightBottom);

    let ambientLight = new THREE.AmbientLight(0x798296);
    this.scene.add(ambientLight);

    //ADD OBJECT
    const geometry = new THREE.SphereGeometry(0.8, 128, 128);
    this.geometryObj = new THREE.Points(geometry, material);

    this.scene.add(this.geometryObj);

    this.start();
    if (typeof window !== `undefined`) {
      window.addEventListener("mousemove", this.mouseMove);
    }
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  update = () => {
    // smaller time cofactor = slower
    let time = performance.now() * 0.0005;
    let spikes = 0.1 * 10;

    for (let i = 0; i < this.geometryObj.geometry.vertices.length; i++) {
      let p = this.geometryObj.geometry.vertices[i];
      // size of spikes
      p.normalize().multiplyScalar(
        1 +
          0.2 *
            this.simplex.noise3D(
              p.x * spikes,
              p.y * spikes,
              p.z * spikes + time
            )
      );
    }

    this.targetX = this.mouseX * 0.001;
    this.targetY = this.mouseY * 0.001;

    this.geometryObj.rotation.y +=
      0.05 * (this.targetX - this.geometryObj.rotation.y);
    this.geometryObj.rotation.x +=
      0.05 * (this.targetY - this.geometryObj.rotation.x);

    this.geometryObj.geometry.computeVertexNormals();
    this.geometryObj.geometry.normalsNeedUpdate = true;
    this.geometryObj.geometry.verticesNeedUpdate = true;
  };

  animate = () => {
    this.update();
    this.renderScene();
    this.frameId =
      typeof window !== `undefined`
        ? window.requestAnimationFrame(this.animate)
        : null;
  };

  mouseMove = e => {
    this.mouseX = e.clientX - this.horizontalCenter;
    this.mouseY = e.clientY - this.verticalCenter;
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        className={styles.three__scene}
        ref={mount => {
          this.mount = mount;
        }}
      ></div>
    );
  }
}
export default OrganicSphere;
