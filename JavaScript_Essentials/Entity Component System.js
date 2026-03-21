class World {
  constructor() {
    this.entities    = new Map(); 
    this.components  = new Map(); 
    this.systems     = [];
    this.nextId      = 1;
  }

  createEntity() {
    const id = this.nextId++;
    this.entities.set(id, new Set());
    return id;
  }

  destroyEntity(id) {
    for (const [, store] of this.components) store.delete(id);
    this.entities.delete(id);
  }

  addComponent(entityId, name, data) {
    if (!this.components.has(name)) this.components.set(name, new Map());
    this.components.get(name).set(entityId, data);
    this.entities.get(entityId)?.add(name);
    return this;
  }

  getComponent(entityId, name) {
    return this.components.get(name)?.get(entityId);
  }

  removeComponent(entityId, name) {
    this.components.get(name)?.delete(entityId);
    this.entities.get(entityId)?.delete(name);
  }

  query(...componentNames) {
    const results = [];
    for (const [id, comps] of this.entities) {
      if (componentNames.every(c => comps.has(c))) results.push(id);
    }
    return results;
  }

  addSystem(system) { this.systems.push(system); return this; }

  update(dt) {
    for (const system of this.systems) system(this, dt);
  }
}

const MovementSystem = (world, dt) => {
  world.query("Position", "Velocity").forEach(id => {
    const pos = world.getComponent(id, "Position");
    const vel = world.getComponent(id, "Velocity");
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
  });
};

const GravitySystem = (world, dt) => {
  const GRAVITY = 9.8;
  world.query("Velocity", "Gravity").forEach(id => {
    const vel = world.getComponent(id, "Velocity");
    vel.y -= GRAVITY * dt;
  });
};

const BoundsSystem = (world) => {
  world.query("Position", "Velocity").forEach(id => {
    const pos = world.getComponent(id, "Position");
    const vel = world.getComponent(id, "Velocity");
    if (pos.y < 0) { pos.y = 0; vel.y = Math.abs(vel.y) * 0.8; } // Bounce
    if (pos.x < 0 || pos.x > 100) vel.x *= -1;
  });
};

const RenderSystem = (world) => {
  world.query("Position", "Renderable").forEach(id => {
    const pos  = world.getComponent(id, "Position");
    const meta = world.getComponent(id, "Renderable");
    console.log(`[${meta.symbol}] ${meta.name}: (${pos.x.toFixed(1)}, ${pos.y.toFixed(1)})`);
  });
};

const HealthSystem = (world) => {
  world.query("Health").forEach(id => {
    const hp = world.getComponent(id, "Health");
    if (hp.current <= 0) {
      const meta = world.getComponent(id, "Renderable");
      console.log(`💀 ${meta?.name || "Entity"} (id:${id}) died!`);
      world.destroyEntity(id);
    }
  });
};

const world = new World();

world.addSystem(GravitySystem)
     .addSystem(MovementSystem)
     .addSystem(BoundsSystem)
     .addSystem(HealthSystem)
     .addSystem(RenderSystem);

const player = world.createEntity();
world
  .addComponent(player, "Position",   { x: 10, y: 50 })
  .addComponent(player, "Velocity",   { x: 5, y: 0 })
  .addComponent(player, "Gravity",    {})
  .addComponent(player, "Health",     { current: 100, max: 100 })
  .addComponent(player, "Renderable", { name: "Player", symbol: "🧑" });

const enemy = world.createEntity();
world
  .addComponent(enemy, "Position",   { x: 80, y: 30 })
  .addComponent(enemy, "Velocity",   { x: -3, y: 0 })
  .addComponent(enemy, "Health",     { current: 10, max: 10 })
  .addComponent(enemy, "Renderable", { name: "Enemy", symbol: "👾" });

console.log("=== Tick 1 ===");
world.update(0.016); 

console.log("\n=== Tick 2 ===");
world.update(0.016);

world.getComponent(enemy, "Health").current = 0;
console.log("\n=== Tick 3 (enemy dies) ===");
world.update(0.016);

console.log("\n=== Tick 4 (enemy gone) ===");
world.update(0.016);