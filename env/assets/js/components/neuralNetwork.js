import { Application, Graphics, Text, Container } from "pixi.js";

// Constants
const ACTIVATION_DELAY = 150;
const RESTART_DELAY = 2000;

// Node class for creating and managing node properties
class Node {
  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.activated = false;
    this.label = label;
    this.graphics = new Graphics();
    this.text = new Text({
      text: label,
      style: {
        fontSize: 12,
        fill: 0xffffff,
        align: "center",
      },
    });
    this.text.alpha = 0; // Make text transparent
    this.container = new Container();
    this.container.addChild(this.graphics, this.text);
    this.container.position.set(x, y);
    this.updateGraphics();
  }

  activate() {
    this.activated = true;
    this.updateGraphics();
  }

  deactivate() {
    this.activated = false;
    this.updateGraphics();
  }

  updatePosition() {
    this.container.position.set(this.x, this.y);
  }

  updateGraphics() {
    this.graphics.clear();
    const color = this.activated ? 0xb91c1c : 0x000000;
    this.graphics.circle(0, 0, this.radius).fill(color);
    this.text.position.set(-this.radius, -this.radius - 15);
  }
}

// Edge class for drawing lines between nodes
class Edge {
  constructor(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
    this.activated = false;
    this.graphics = new Graphics();
    this.updateGraphics();
  }

  activate() {
    this.activated = true;
    this.updateGraphics();
  }

  deactivate() {
    this.activated = false;
    this.updateGraphics();
  }

  updateGraphics() {
    this.graphics.clear();
    const color = this.activated ? 0xb91c1c : 0x000000;
    const width = this.activated ? 2 : 1;
    this.graphics
      .moveTo(this.node1.x, this.node1.y)
      .lineTo(this.node2.x, this.node2.y)
      .stroke({ width, color });
  }
}

// Main application logic
async function initializeApplication() {
  const app = new Application();

  try {
    await app.init({
      resizeTo: document.getElementById("pixi-container"),
      backgroundAlpha: 0,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      antialias: true,
      preference: "webgpu",
    });
    console.log(
      "%cNEURAL NETWORK LOADED | ニューラルネットワークが読み込まれました 🇯🇵",
      "color: red; font-size: 20px; font-family: monospace;"
    );
  } catch (error) {
    console.error("Failed to initialize Pixi application:", error);
    return;
  }

  const pixiContainer = document.getElementById("pixi-container");
  pixiContainer.appendChild(app.canvas);

  // Log renderer information

  function logRendererInfo(app) {
    console.log("Renderer Information:");
    console.log("Type:", app.renderer.type);
    console.log("Preference:", app.renderer.preference);
    console.log(
      "Context:",
      app.renderer.gl ? "WebGL" : app.renderer.context ? "WebGPU" : "Unknown"
    );
    console.log("Max Textures:", app.renderer.texture.maxTextures);
    console.log("GPU:", app.renderer.context?.adapter?.name || "Unknown");
    console.log("Supports WebGPU:", "gpu" in navigator);

    // Additional WebGPU-specific information
    if (app.renderer.context && app.renderer.type === "WEBGPU") {
      console.log("WebGPU Device:", app.renderer.context.device);
      console.log("WebGPU Adapter Features:", [
        ...app.renderer.context.adapter.features,
      ]);
    }
  }
  logRendererInfo(app);

  let nodes = [];
  let edges = [];

  function calculateLayers() {
    const containerWidth = pixiContainer.clientWidth;
    return containerWidth < 640
      ? 5
      : Math.min(20, Math.floor((containerWidth - 640) / 64) + 6);
  }

  const numLayers = calculateLayers();
  const layerSizes = Array.from(
    { length: numLayers },
    () => Math.floor(Math.random() * 10) + 2
  );
  const labels = layerSizes.map((size, layerIndex) =>
    Array.from({ length: size }, (_, i) => `L${layerIndex + 1}N${i + 1}`)
  );

  function createNode(x, y, label) {
    let node = new Node(x, y, label);
    nodes.push(node);
    app.stage.addChild(node.container);
    return node;
  }

  function createEdge(node1, node2) {
    let edge = new Edge(node1, node2);
    edges.push(edge);
    app.stage.addChildAt(edge.graphics, 0); // Add edges behind nodes
  }

  function positionNodes() {
    const containerWidth = pixiContainer.clientWidth;
    const containerHeight = pixiContainer.clientHeight;
    const layerSpacing = containerWidth / (layerSizes.length + 1);
    const nodeSpacing = (layerSize) => containerHeight / (layerSize + 1);

    layerSizes.forEach((layerSize, layerIndex) => {
      const x = (layerIndex + 1) * layerSpacing;
      const ySpacing = nodeSpacing(layerSize);
      for (let i = 0; i < layerSize; i++) {
        const y = (i + 1) * ySpacing;
        createNode(x, y, labels[layerIndex][i]);
      }
    });
  }

  positionNodes();

  const layers = [];
  let nodeIndex = 0;
  layerSizes.forEach((layerSize) => {
    const layer = nodes.slice(nodeIndex, nodeIndex + layerSize);
    layers.push(layer);
    nodeIndex += layerSize;
  });

  for (let i = 0; i < layers.length - 1; i++) {
    layers[i].forEach((node1) => {
      layers[i + 1].forEach((node2) => {
        createEdge(node1, node2);
      });
    });
  }

  function activateLayer(layerIndex) {
    if (layerIndex >= layers.length) return;

    deactivateLayer(layerIndex - 1);

    layers[layerIndex].forEach((node) => {
      if (Math.random() > 0.5) {
        node.activate();
      }
    });

    if (layerIndex < layers.length - 1) {
      layers[layerIndex].forEach((node1) => {
        if (node1.activated) {
          layers[layerIndex + 1].forEach((node2) => {
            edges.forEach((edge) => {
              if (edge.node1 === node1 && edge.node2 === node2) {
                edge.activate();
                node2.activate();
              }
            });
          });
        }
      });
    }

    setTimeout(() => activateLayer(layerIndex + 1), ACTIVATION_DELAY);
  }

  function deactivateLayer(layerIndex) {
    if (layerIndex < 0) return;

    layers[layerIndex].forEach((node) => node.deactivate());
    edges.forEach((edge) => {
      if (layers[layerIndex].includes(edge.node1)) {
        edge.deactivate();
      }
    });
  }

  function loopActivation() {
    let layerIndex = 0;
    function loop() {
      if (layerIndex === 0 && layers.length > 0) {
        deactivateLayer(layers.length - 1);
      }

      if (layerIndex >= layers.length) {
        layerIndex = 0;
        setTimeout(loop, RESTART_DELAY);
      } else {
        activateLayer(layerIndex);
        layerIndex++;
        setTimeout(loop, ACTIVATION_DELAY);
      }
    }
    loop();
  }

  app.ticker.add(() => {
    nodes.forEach((node) => node.updatePosition());
    edges.forEach((edge) => edge.updateGraphics());
  });

  loopActivation();

  return app;
}

// Start the application when the window loads
document.addEventListener("DOMContentLoaded", initializeApplication);
