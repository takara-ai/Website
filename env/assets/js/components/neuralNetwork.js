import { Application, Graphics, Text } from "pixi.js";

window.addEventListener("load", async function () {
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
      this.graphics.zIndex = 2;
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
      this.graphics.x = this.x;
      this.graphics.y = this.y;
      this.text.x = this.x - this.radius;
      this.text.y = this.y - this.radius - 15;
    }

    updateGraphics() {
      this.graphics.clear();
      const color = this.activated ? 0xb91c1c : 0x000000;
      this.graphics.circle(0, 0, this.radius);
      this.graphics.fill(color);
    }
  }

  // Edge class for drawing lines between nodes
  class Edge {
    constructor(node1, node2) {
      this.node1 = node1;
      this.node2 = node2;
      this.activated = false;
      this.graphics = new Graphics();
      app.stage.addChild(this.graphics);
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
      this.graphics.moveTo(this.node1.x, this.node1.y);
      this.graphics.lineTo(this.node2.x, this.node2.y);
      this.graphics.setStrokeStyle({ width: width, color: color });
      this.graphics.stroke();
    }
  }

  // Initialize Pixi Application asynchronously with performance optimizations
  const app = new Application();
  try {
    await app.init({
      resizeTo: document.getElementById("pixi-container"),
      backgroundAlpha: 0,
      resolution: 2,
      autoDensity: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    console.error("Failed to initialize Pixi application:", error);
    return;
  }

  const pixiContainer = document.getElementById("pixi-container");
  pixiContainer.appendChild(app.canvas);

  window.addEventListener("resize", () => {
    app.renderer.resize(pixiContainer.clientWidth, pixiContainer.clientHeight);
  });

  let nodes = [];
  let edges = [];

  function calculateLayers() {
    const windowWidth = window.innerWidth;
    return windowWidth < 640
      ? 5
      : Math.min(20, Math.floor((windowWidth - 640) / 64) + 6);
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
    app.stage.addChild(node.graphics);
    app.stage.addChild(node.text);
    return node;
  }

  function createEdge(node1, node2) {
    let edge = new Edge(node1, node2);
    edges.push(edge);
  }

  const layerSpacing = app.screen.width / (layerSizes.length + 1);
  const nodeSpacing = (screenHeight, layerSize) =>
    screenHeight / (layerSize + 1);

  layerSizes.forEach((layerSize, layerIndex) => {
    const x = (layerIndex + 1) * layerSpacing;
    const ySpacing = nodeSpacing(app.screen.height, layerSize);
    for (let i = 0; i < layerSize; i++) {
      const y = (i + 1) * ySpacing;
      createNode(x, y, labels[layerIndex][i]);
    }
  });

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

  function animationLoop() {
    nodes.forEach((node) => {
      node.updatePosition();
    });
    edges.forEach((edge) => {
      edge.updateGraphics();
    });
    app.renderer.render(app.stage);
    requestAnimationFrame(animationLoop);
  }

  requestAnimationFrame(animationLoop);
  loopActivation();
});
