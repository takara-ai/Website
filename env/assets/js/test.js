{
  {
    /*
<script>
  document.addEventListener("DOMContentLoaded", async function () {
    // Node class for creating and managing node properties
    class Node {
      constructor(x, y) {
        this.x = x; // X position of the node
        this.y = y; // Y position of the node
        this.radius = Math.random() * 20 + 5; // Variable radius
        this.velX = Math.random() * 2 - 1; // Random velocity X
        this.velY = Math.random() * 2 - 1; // Random velocity Y
        this.graphics = new PIXI.Graphics(); // Graphics object for drawing the node
        this.updateGraphics(); // Initial graphics setup for the node
      }

      updatePosition(screenWidth, screenHeight) {
        this.x += this.velX; // Update X position
        this.y += this.velY; // Update Y position

        // Check for collisions with the screen boundaries and reverse velocity if necessary
        if (this.x - this.radius < 0 || this.x + this.radius > screenWidth) {
          this.velX *= -1;
          this.x =
            this.x - this.radius < 0 ? this.radius : screenWidth - this.radius;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > screenHeight) {
          this.velY *= -1;
          this.y =
            this.y - this.radius < 0 ? this.radius : screenHeight - this.radius;
        }
        this.graphics.x = this.x; // Update graphics position X
        this.graphics.y = this.y; // Update graphics position Y
      }

      updateGraphics() {
        this.graphics.clear();
        this.graphics.beginFill(0xffffff); // Start filling the circle with white color
        this.graphics.drawCircle(0, 0, this.radius); // Draw the circle at updated position
        this.graphics.endFill(); // End filling the circle
      }
    }

    // Edge class for drawing lines between nodes
    class Edge {
      constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
        this.graphics = new PIXI.Graphics();
        app.stage.addChild(this.graphics); // Add graphics to PIXI stage
        this.updateGraphics();
      }

      updateGraphics() {
        this.graphics.clear();
        this.graphics.setStrokeStyle({
          width: 1, // Line width
          color: 0xffffff, // Line color, white
          alpha: 1, // Line opacity (fully opaque)
        });
        this.graphics.moveTo(this.node1.x, this.node1.y);
        this.graphics.lineTo(this.node2.x, this.node2.y);
        this.graphics.stroke(); // Explicitly call stroke to draw the lines
      }
    }

    // Collision class for handling node interactions
    class Collision {
      constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
      }

      // Resolve collisions by swapping velocities
      resolve() {
        let tempVelX = this.node1.velX;
        let tempVelY = this.node1.velY;
        this.node1.velX = this.node2.velX;
        this.node1.velY = this.node2.velY;
        this.node2.velX = tempVelX;
        this.node2.velY = tempVelY;
      }
    }

    // Function to check for node collisions
    function checkForCollisions(nodes) {
      let collisions = [];
      nodes.forEach((node1, i) => {
        nodes.slice(i + 1).forEach((node2) => {
          let dx = node1.x - node2.x;
          let dy = node1.y - node2.y;
          let distance = Math.sqrt(dx * dx + dy * dy); // Calculate distance
          if (distance < node1.radius + node2.radius) {
            collisions.push(new Collision(node1, node2)); // Add new collision
          }
        });
      });
      return collisions;
    }

    // Initialize Pixi Application asynchronously with performance optimizations
    const app = new PIXI.Application();
    await app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000, // Set background color to black
      resolution: window.devicePixelRatio, // Adjust for device resolution
      autoDensity: true,
      antialias: false, // Disable antialiasing for performance
      useContextAlpha: false, // Disable context alpha for performance on older devices
    });
    document.getElementById("pixi-container").appendChild(app.canvas);

    let nodes = [];
    let edges = [];

    // Create nodes randomly positioned within the screen
    for (let i = 0; i < 20; i++) {
      let node = new Node(
        Math.random() * app.screen.width,
        Math.random() * app.screen.height
      );
      nodes.push(node);
      app.stage.addChild(node.graphics);
    }

    // Create edges between all pairs of nodes
    nodes.forEach((node1, i) => {
      nodes.slice(i + 1).forEach((node2) => {
        let edge = new Edge(node1, node2);
        edges.push(edge);
      });
    });

    // Animation loop to update node positions and edges
    function animationLoop() {
      nodes.forEach((node) => {
        node.updatePosition(app.screen.width, app.screen.height); // Update node positions
      });
      edges.forEach((edge) => {
        edge.updateGraphics(); // Update graphics for edges
      });
      app.renderer.render(app.stage); // Render the updated stage
      requestAnimationFrame(animationLoop); // Request the next animation frame
    }

    // Optimize event handling
    app.stage.interactiveChildren = false; // Disable interaction checks for children if not needed

    requestAnimationFrame(animationLoop); // Start the animation loop
  });
</script>
*/
  }
}
