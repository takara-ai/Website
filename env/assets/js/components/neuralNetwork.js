document.addEventListener("DOMContentLoaded", async function () {
  // Node class for creating and managing node properties
  class Node {
    constructor(x, y, label) {
      this.x = x; // X position of the node
      this.y = y; // Y position of the node
      this.radius = 10; // Fixed radius for neural network nodes
      this.activated = false; // Activation state of the node
      this.label = label; // Label for the node
      this.graphics = new PIXI.Graphics(); // Graphics object for drawing the node
      this.text = new PIXI.Text(label, {
        fontSize: 12,
        fill: 0xffffff, // Black color for text
        align: "center",
      });
      this.updateGraphics(); // Initial graphics setup for the node
    }

    activate() {
      this.activated = true; // Set the node to activated state
      this.updateGraphics();
    }

    deactivate() {
      this.activated = false; // Set the node to deactivated state
      this.updateGraphics();
    }

    updatePosition() {
      // Nodes in a neural network are usually fixed, so no position updates
      this.graphics.x = this.x;
      this.graphics.y = this.y;
      this.text.x = this.x - this.radius; // Adjust text position to be centered
      this.text.y = this.y - this.radius - 15; // Position text above the node
    }

    updateGraphics() {
      this.graphics.clear();
      const color = this.activated ? 0xcc3333 : 0x000000; // Red if activated, black if not
      this.graphics.circle(0, 0, this.radius); // Draw the circle at updated position
      this.graphics.fill(color); // Start filling the circle with color based on activation state
    }
  }

  // Edge class for drawing lines between nodes
  class Edge {
    constructor(node1, node2) {
      this.node1 = node1;
      this.node2 = node2;
      this.activated = false; // Activation state of the edge
      this.graphics = new PIXI.Graphics();
      app.stage.addChild(this.graphics); // Add graphics to PIXI stage
      this.updateGraphics();
    }

    activate() {
      this.activated = true; // Set the edge to activated state
      this.updateGraphics();
    }

    deactivate() {
      this.activated = false; // Set the edge to deactivated state
      this.updateGraphics();
    }

    updateGraphics() {
      this.graphics.clear();
      const color = this.activated ? 0xff0000 : 0x000000; // Red if activated, black if not
      const width = this.activated ? 2 : 1; // Thicker if activated
      this.graphics.moveTo(this.node1.x, this.node1.y);
      this.graphics.lineTo(this.node2.x, this.node2.y);
      this.graphics.setStrokeStyle({ width: width, color: color, alpha: 1 });
      this.graphics.stroke(); // Explicitly call stroke to draw the lines
    }
  }

  // Initialize Pixi Application asynchronously with performance optimizations
  const app = new PIXI.Application();
  await app.init({
    resizeTo: document.getElementById("pixi-container"), // Automatically resize to the container
    backgroundAlpha: 0, // Set background to transparent
    resolution: window.devicePixelRatio, // Adjust for device resolution
    autoDensity: true,
    antialias: true, // Disable antialiasing for performance
    powerPreference: "high-performance", // Use GPU for rendering
  });
  document.getElementById("pixi-container").appendChild(app.canvas);

  document.getElementById("pixi-container").appendChild(app.view);

  // Other code...

  // Handle window resize
  window.addEventListener("resize", () => {
    app.renderer.resize(
      document.getElementById("pixi-container").clientWidth,
      document.getElementById("pixi-container").clientHeight
    );
  });

  // Initial resize to fit the container
  app.renderer.resize(
    document.getElementById("pixi-container").clientWidth,
    document.getElementById("pixi-container").clientHeight
  );

  let nodes = [];
  let edges = [];

  function calculateLayers() {
    const windowWidth = window.innerWidth;
    let numLayers;

    if (windowWidth < 640) {
      // Mobile screens
      numLayers = 5;
    } else {
      // Larger screens
      numLayers = Math.min(20, Math.floor((windowWidth - 640) / 64) + 6);
    }

    return numLayers;
  }

  // Define the number of nodes in each layer (80 layers with 5 to 10 nodes each)
  const numLayers = calculateLayers();
  const layerSizes = Array.from(
    { length: numLayers },
    () => Math.floor(Math.random() * 10) + 2
  );
  // Generate labels for each node in each layer
  const labels = layerSizes.map((size, layerIndex) =>
    Array.from({ length: size }, (_, i) => `L${layerIndex + 1}N${i + 1}`)
  );

  // Function to create a node at a specific position
  function createNode(x, y, label) {
    let node = new Node(x, y, label);
    nodes.push(node);
    app.stage.addChild(node.graphics);
    app.stage.addChild(node.text);
    return node;
  }

  // Function to create an edge between two nodes
  function createEdge(node1, node2) {
    let edge = new Edge(node1, node2);
    edges.push(edge);
  }

  // Calculate positions of nodes in each layer
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

  // Create edges between nodes in consecutive layers
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

  // Function to randomly activate nodes and edges in a layer
  function activateLayer(layerIndex) {
    if (layerIndex >= layers.length) return;

    // Deactivate previous layer's nodes and edges
    if (layerIndex > 0) {
      layers[layerIndex - 1].forEach((node) => node.deactivate());
      edges.forEach((edge) => {
        if (layers[layerIndex - 1].includes(edge.node1)) {
          edge.deactivate();
        }
      });
    }

    // Randomly activate nodes in the current layer
    layers[layerIndex].forEach((node) => {
      if (Math.random() > 0.5) {
        node.activate();
      }
    });

    // Activate edges connecting to the next layer based on node activation
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

    // Activate the next layer after a reduced delay
    setTimeout(() => {
      activateLayer(layerIndex + 1);
    }, 50); // Reduced delay for faster activation
  }

  // Function to loop through the activation process
  function loopActivation() {
    let layerIndex = 0;
    function loop() {
      // Deactivate the last layer's nodes and edges before restarting
      if (layerIndex === 0 && layers.length > 0) {
        layers[layers.length - 1].forEach((node) => node.deactivate());
        edges.forEach((edge) => {
          if (layers[layers.length - 1].includes(edge.node1)) {
            edge.deactivate();
          }
        });
      }

      if (layerIndex >= layers.length) {
        layerIndex = 0;
        setTimeout(loop, 2000); // Wait a bit before restarting the loop
      } else {
        activateLayer(layerIndex);
        layerIndex++;
        setTimeout(loop, 50); // Reduced delay between layer activations
      }
    }
    loop();
  }

  // Animation loop to update node positions and edges
  function animationLoop() {
    nodes.forEach((node) => {
      node.updatePosition(); // Nodes remain static in a neural network
    });
    edges.forEach((edge) => {
      edge.updateGraphics(); // Update graphics for edges
    });
    app.renderer.render(app.stage); // Render the updated stage
    requestAnimationFrame(animationLoop); // Request the next animation frame
  }

  // Optimize event handling
  app.stage.interactiveChildren = false; // Disable interaction checks for children if not needed

  // Start the animation loop and activation sequence
  requestAnimationFrame(animationLoop);
  loopActivation(); // Start the looping activation
});
