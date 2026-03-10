// EpicQuest - A Fully Featured 2D RPG
// Controls:
// - WASD: Move
// - E: Interact/Talk/Pick up
// - Space: Attack
// - Shift: Sprint/Roll
// - I: Inventory
// - C: Character Stats
// - K: Skills
// - J: Journal/Quests
// - M: Map
// - T: Trade (near merchants)
// - F: Fast Travel (at camps)
// - 1-6: Use hotbar items
// - ESC: Pause

let player;
let npcs = [];
let items = [];
let enemies = [];
let quests = [];
let dialogues = [];
let projectiles = [];
let chests = [];
let camps = [];
let pets = [];
let spells = [];
let achievements = [];
let weather = 'clear';
let timeOfDay = 12;

let gameState = 'playing';
let currentDialogue = null;
let inventory = [];
let hotbar = [null, null, null, null, null, null];
let equipment = {
  weapon: null,
  armor: null,
  accessory: null
};

let gold = 100;
let gems = 10;
let experience = 0;
let level = 1;
let skillPoints = 0;
let reputation = 0;

let skills = {
  warrior: { level: 1, exp: 0 },
  mage: { level: 0, exp: 0 },
  rogue: { level: 0, exp: 0 },
  crafting: { level: 1, exp: 0 }
};

let craftingRecipes = [];
let discoveredLocations = ['Village'];
let currentLocation = 'Village';

function setup() {
  createCanvas(1024, 768);
  
  // Initialize player with full stats
  player = {
    x: 500,
    y: 400,
    size: 24,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    stamina: 100,
    maxStamina: 100,
    attack: 12,
    defense: 8,
    magic: 5,
    speed: 4,
    sprintSpeed: 7,
    critChance: 5,
    critDamage: 150,
    direction: 'down',
    moving: false,
    sprinting: false,
    rollCooldown: 0,
    buffs: [],
    debuffs: []
  };
  
  // Create all game content
  createNPCs();
  createItems();
  createEnemies();
  createQuests();
  createChests();
  createCamps();
  createSpells();
  createAchievements();
  createCraftingRecipes();
  
  // Give starter items
  inventory.push(items.find(i => i.id === 'health_potion'));
  inventory.push(items.find(i => i.id === 'health_potion'));
  inventory.push(items.find(i => i.id === 'mana_potion'));
  inventory.push(items.find(i => i.id === 'wooden_sword'));
  
  // Setup hotbar
  hotbar[0] = items.find(i => i.id === 'health_potion');
  hotbar[1] = items.find(i => i.id === 'mana_potion');
}

function draw() {
  // Update time and weather
  updateEnvironment();
  
  // Game logic based on state
  if (gameState === 'playing') {
    handleMovement();
    updateGame();
    updateCooldowns();
  }
  
  // Draw everything
  drawGame();
  drawUI();
  drawEffects();
  
  // Draw overlays
  if (currentDialogue) drawDialogue();
  if (gameState === 'inventory') drawInventory();
  if (gameState === 'character') drawCharacterStats();
  if (gameState === 'skills') drawSkillTree();
  if (gameState === 'journal') drawJournal();
  if (gameState === 'map') drawMap();
  if (gameState === 'pause') drawPause();
  if (gameState === 'crafting') drawCrafting();
  if (gameState === 'shop') drawShop();
}

function updateEnvironment() {
  // Time cycle
  timeOfDay += 0.01;
  if (timeOfDay >= 24) timeOfDay = 0;
  
  // Weather system
  if (frameCount % 600 === 0) {
    let rand = random();
    if (rand < 0.6) weather = 'clear';
    else if (rand < 0.8) weather = 'cloudy';
    else if (rand < 0.95) weather = 'rain';
    else weather = 'storm';
  }
}

function createNPCs() {
  npcs = [
    {
      id: 'elder',
      name: 'Elder Thomas',
      x: 200,
      y: 200,
      size: 25,
      type: 'quest',
      dialogues: {
        greeting: "Ah, welcome young one!",
        quest1: "The goblins have become more aggressive.",
        quest2: "Please talk to the blacksmith first.",
        quest3: "He needs materials for better weapons.",
        farewell: "May the gods protect you."
      },
      quest: 'talk_to_blacksmith',
      color: [100, 150, 255],
      shop: null
    },
    {
      id: 'blacksmith',
      name: 'Blacksmith Greg',
      x: 600,
      y: 400,
      size: 30,
      type: 'blacksmith',
      dialogues: {
        greeting: "Need some weapons?",
        quest1: "I need 5 iron ore for a special sword.",
        quest2: "Goblins drop them sometimes.",
        quest3: "Bring them back and I'll reward you.",
        trade: "Want to see my wares?"
      },
      quest: 'gather_ore',
      color: [150, 100, 50],
      shop: {
        buys: ['ore', 'weapon'],
        sells: [
          { item: 'iron_sword', price: 150 },
          { item: 'steel_sword', price: 300 },
          { item: 'health_potion', price: 25 },
          { item: 'mana_potion', price: 30 }
        ]
      }
    },
    {
      id: 'merchant',
      name: 'Merchant Sarah',
      x: 500,
      y: 150,
      size: 22,
      type: 'merchant',
      dialogues: {
        greeting: "Welcome to my shop!",
        trade: "Take a look at my wares.",
        rumor: "I heard there's treasure in the dark forest.",
        gossip: "The wizard is looking for an apprentice."
      },
      color: [255, 200, 150],
      shop: {
        buys: ['any'],
        sells: [
          { item: 'health_potion', price: 30 },
          { item: 'greater_potion', price: 75 },
          { item: 'mana_potion', price: 35 },
          { item: 'antidote', price: 20 },
          { item: 'torch', price: 15 },
          { item: 'rope', price: 25 }
        ]
      }
    },
    {
      id: 'wizard',
      name: 'Wizard Alatar',
      x: 700,
      y: 100,
      size: 25,
      type: 'trainer',
      dialogues: {
        greeting: "You have magical potential...",
        train: "I can teach you spells for a price.",
        quest1: "Find my lost spellbook in the ruins.",
        quest2: "It contains powerful magic.",
        quest3: "Be careful, the ruins are dangerous."
      },
      quest: 'find_spellbook',
      color: [100, 0, 150],
      shop: {
        sells: [
          { item: 'fireball_scroll', price: 200 },
          { item: 'ice_scroll', price: 200 },
          { item: 'teleport_scroll', price: 150 },
          { item: 'mana_potion', price: 40 }
        ]
      }
    },
    {
      id: 'innkeeper',
      name: 'Innkeeper Rose',
      x: 250,
      y: 350,
      size: 25,
      type: 'service',
      dialogues: {
        greeting: "Welcome to the Sleeping Dragon!",
        rest: "Rest for 50 gold?",
        food: "Our stew restores 50 HP for 20 gold.",
        rumor: "I hear bandits are hiding in the caves."
      },
      color: [255, 150, 150],
      services: ['rest', 'food']
    },
    {
      id: 'guard',
      name: 'Captain Marcus',
      x: 350,
      y: 500,
      size: 28,
      type: 'quest',
      dialogues: {
        greeting: "Hail, adventurer!",
        quest1: "Bandits have been attacking caravans.",
        quest2: "Clear out their camp in the eastern forest.",
        quest3: "I'll reward you handsomely."
      },
      quest: 'clear_bandits',
      color: [200, 100, 100]
    },
    {
      id: 'healer',
      name: 'Sister Agnes',
      x: 150,
      y: 450,
      size: 22,
      type: 'healer',
      dialogues: {
        greeting: "Blessings of the light upon you.",
        heal: "I can heal you for 30 gold.",
        cure: "I can cure poison for 50 gold.",
        blessing: "Would you like a blessing? 100 gold."
      },
      color: [255, 255, 255],
      services: ['heal', 'cure', 'bless']
    },
    {
      id: 'miner',
      name: 'Dwarf Miner',
      x: 550,
      y: 550,
      size: 25,
      type: 'merchant',
      dialogues: {
        greeting: "Ho there, surface dweller!",
        trade: "Got some fine ores for sale.",
        rumor: "Deep in the mines, there's a dragon sleeping.",
        quest1: "Bring me 10 mithril ore for a special reward."
      },
      quest: 'gather_mithril',
      color: [139, 69, 19],
      shop: {
        sells: [
          { item: 'iron_ore', price: 15 },
          { item: 'coal', price: 10 },
          { item: 'mithril_ore', price: 50 },
          { item: 'pickaxe', price: 100 }
        ]
      }
    }
  ];
}

function createItems() {
  items = [
    // Potions
    {
      id: 'health_potion',
      name: 'Health Potion',
      type: 'consumable',
      effect: 'heal',
      value: 30,
      hpRestore: 50,
      color: [255, 0, 0],
      stackable: true,
      maxStack: 10,
      value: 25,
      sellPrice: 12
    },
    {
      id: 'greater_potion',
      name: 'Greater Health Potion',
      type: 'consumable',
      effect: 'heal',
      hpRestore: 100,
      color: [255, 50, 50],
      stackable: true,
      maxStack: 5,
      value: 75,
      sellPrice: 37
    },
    {
      id: 'mana_potion',
      name: 'Mana Potion',
      type: 'consumable',
      effect: 'mana',
      mpRestore: 40,
      color: [0, 0, 255],
      stackable: true,
      maxStack: 10,
      value: 30,
      sellPrice: 15
    },
    {
      id: 'antidote',
      name: 'Antidote',
      type: 'consumable',
      effect: 'cure',
      cures: 'poison',
      color: [0, 255, 0],
      stackable: true,
      value: 20,
      sellPrice: 10
    },
    {
      id: 'elixir',
      name: 'Mysterious Elixir',
      type: 'consumable',
      effect: 'buff',
      buff: { attack: 10, defense: 5, duration: 60 },
      color: [255, 0, 255],
      value: 200,
      sellPrice: 100
    },
    
    // Weapons
    {
      id: 'wooden_sword',
      name: 'Wooden Sword',
      type: 'weapon',
      equip: true,
      slot: 'weapon',
      attack: 5,
      color: [139, 69, 19],
      value: 30,
      sellPrice: 15
    },
    {
      id: 'iron_sword',
      name: 'Iron Sword',
      type: 'weapon',
      equip: true,
      slot: 'weapon',
      attack: 12,
      color: [192, 192, 192],
      value: 150,
      sellPrice: 75
    },
    {
      id: 'steel_sword',
      name: 'Steel Sword',
      type: 'weapon',
      equip: true,
      slot: 'weapon',
      attack: 20,
      color: [100, 100, 100],
      value: 300,
      sellPrice: 150
    },
    {
      id: 'magic_staff',
      name: 'Magic Staff',
      type: 'weapon',
      equip: true,
      slot: 'weapon',
      magic: 15,
      color: [150, 0, 150],
      value: 250,
      sellPrice: 125
    },
    {
      id: 'bow',
      name: 'Hunting Bow',
      type: 'weapon',
      equip: true,
      slot: 'weapon',
      attack: 15,
      range: true,
      color: [160, 82, 45],
      value: 200,
      sellPrice: 100
    },
    
    // Armor
    {
      id: 'leather_armor',
      name: 'Leather Armor',
      type: 'armor',
      equip: true,
      slot: 'armor',
      defense: 8,
      color: [139, 90, 43],
      value: 100,
      sellPrice: 50
    },
    {
      id: 'iron_armor',
      name: 'Iron Armor',
      type: 'armor',
      equip: true,
      slot: 'armor',
      defense: 15,
      color: [192, 192, 192],
      value: 250,
      sellPrice: 125
    },
    {
      id: 'magic_robe',
      name: 'Magic Robe',
      type: 'armor',
      equip: true,
      slot: 'armor',
      defense: 5,
      magic: 10,
      color: [100, 0, 100],
      value: 200,
      sellPrice: 100
    },
    
    // Accessories
    {
      id: 'ring_of_strength',
      name: 'Ring of Strength',
      type: 'accessory',
      equip: true,
      slot: 'accessory',
      attack: 8,
      color: [255, 215, 0],
      value: 300,
      sellPrice: 150
    },
    {
      id: 'ring_of_protection',
      name: 'Ring of Protection',
      type: 'accessory',
      equip: true,
      slot: 'accessory',
      defense: 8,
      color: [0, 255, 255],
      value: 300,
      sellPrice: 150
    },
    {
      id: 'amulet_of_magic',
      name: 'Amulet of Magic',
      type: 'accessory',
      equip: true,
      slot: 'accessory',
      magic: 12,
      mana: 30,
      color: [255, 0, 255],
      value: 400,
      sellPrice: 200
    },
    
    // Materials
    {
      id: 'iron_ore',
      name: 'Iron Ore',
      type: 'material',
      color: [100, 100, 100],
      value: 10,
      sellPrice: 5
    },
    {
      id: 'coal',
      name: 'Coal',
      type: 'material',
      color: [50, 50, 50],
      value: 8,
      sellPrice: 4
    },
    {
      id: 'mithril_ore',
      name: 'Mithril Ore',
      type: 'material',
      color: [150, 150, 255],
      value: 50,
      sellPrice: 25
    },
    {
      id: 'herb',
      name: 'Magic Herb',
      type: 'material',
      color: [0, 255, 0],
      value: 15,
      sellPrice: 7
    },
    
    // Quest items
    {
      id: 'spellbook',
      name: 'Ancient Spellbook',
      type: 'quest',
      color: [150, 0, 150],
      value: 0
    },
    {
      id: 'bandit_head',
      name: 'Bandit Head',
      type: 'quest',
      color: [100, 0, 0],
      value: 0
    },
    
    // Spells
    {
      id: 'fireball_scroll',
      name: 'Fireball Scroll',
      type: 'spell',
      spell: 'fireball',
      manaCost: 15,
      damage: 30,
      color: [255, 100, 0],
      value: 200,
      sellPrice: 100
    },
    {
      id: 'ice_scroll',
      name: 'Ice Shard Scroll',
      type: 'spell',
      spell: 'ice',
      manaCost: 12,
      damage: 25,
      slow: true,
      color: [100, 200, 255],
      value: 200,
      sellPrice: 100
    }
  ];
  
  // Place items in world
  for (let i = 0; i < 15; i++) {
    items.push({
      id: 'herb',
      name: 'Magic Herb',
      x: random(200, 700),
      y: random(200, 500),
      type: 'material',
      color: [0, 255, 0],
      collected: false
    });
  }
}

function createEnemies() {
  enemies = [
    {
      id: 'goblin1',
      type: 'Goblin',
      name: 'Goblin Scout',
      x: 550,
      y: 300,
      health: 40,
      maxHealth: 40,
      attack: 8,
      defense: 2,
      exp: 20,
      level: 2,
      gold: random(5, 15),
      color: [0, 150, 0],
      size: 20,
      active: true,
      lootTable: [
        { item: 'iron_ore', chance: 0.4 },
        { item: 'health_potion', chance: 0.2 },
        { item: 'coal', chance: 0.3 },
        { item: 'gold', amount: 5, chance: 0.5 }
      ],
      abilities: ['bite', 'scratch'],
      detectionRange: 200,
      attackRange: 40,
      moveSpeed: 1.5,
      patrol: { x1: 500, x2: 600, y1: 250, y2: 350 }
    },
    {
      id: 'goblin2',
      type: 'Goblin Warrior',
      name: 'Goblin Warrior',
      x: 650,
      y: 350,
      health: 70,
      maxHealth: 70,
      attack: 15,
      defense: 5,
      exp: 35,
      level: 3,
      gold: random(10, 25),
      color: [0, 100, 0],
      size: 25,
      active: true,
      lootTable: [
        { item: 'iron_ore', chance: 0.6 },
        { item: 'health_potion', chance: 0.3 },
        { item: 'iron_sword', chance: 0.1 },
        { item: 'gold', amount: 10, chance: 0.7 }
      ],
      abilities: ['power_attack', 'block'],
      detectionRange: 180,
      attackRange: 40,
      moveSpeed: 1.2
    },
    {
      id: 'wolf',
      type: 'Wolf',
      name: 'Forest Wolf',
      x: 300,
      y: 450,
      health: 50,
      maxHealth: 50,
      attack: 12,
      defense: 3,
      exp: 25,
      level: 2,
      gold: random(3, 8),
      color: [100, 100, 100],
      size: 22,
      active: true,
      lootTable: [
        { item: 'herb', chance: 0.3 },
        { item: 'meat', chance: 0.8 },
        { item: 'gold', amount: 3, chance: 0.3 }
      ],
      abilities: ['bite', 'howl'],
      detectionRange: 250,
      attackRange: 35,
      moveSpeed: 2
    },
    {
      id: 'bandit',
      type: 'Bandit',
      name: 'Bandit',
      x: 400,
      y: 550,
      health: 60,
      maxHealth: 60,
      attack: 14,
      defense: 4,
      exp: 30,
      level: 3,
      gold: random(15, 30),
      color: [150, 50, 50],
      size: 24,
      active: true,
      lootTable: [
        { item: 'gold', amount: 20, chance: 0.8 },
        { item: 'health_potion', chance: 0.4 },
        { item: 'leather_armor', chance: 0.2 }
      ],
      abilities: ['backstab', 'taunt'],
      detectionRange: 180,
      attackRange: 40,
      moveSpeed: 1.3
    },
    {
      id: 'bandit_leader',
      type: 'Bandit Leader',
      name: 'Bandit Leader',
      x: 400,
      y: 550,
      health: 150,
      maxHealth: 150,
      attack: 25,
      defense: 10,
      exp: 100,
      level: 5,
      gold: random(50, 100),
      color: [200, 0, 0],
      size: 30,
      active: false,
      lootTable: [
        { item: 'gold', amount: 100, chance: 1 },
        { item: 'steel_sword', chance: 0.5 },
        { item: 'ring_of_strength', chance: 0.3 }
      ],
      abilities: ['power_attack', 'roar', 'summon'],
      detectionRange: 200,
      attackRange: 45,
      moveSpeed: 1.1,
      isBoss: true
    },
    {
      id: 'skeleton',
      type: 'Skeleton',
      name: 'Skeleton Warrior',
      x: 200,
      y: 200,
      health: 45,
      maxHealth: 45,
      attack: 10,
      defense: 6,
      exp: 25,
      level: 2,
      gold: random(5, 10),
      color: [255, 255, 255],
      size: 23,
      active: true,
      lootTable: [
        { item: 'bone', chance: 0.8 },
        { item: 'iron_sword', chance: 0.1 },
        { item: 'gold', amount: 5, chance: 0.5 }
      ],
      abilities: ['slash', 'shield_block'],
      detectionRange: 150,
      attackRange: 40,
      moveSpeed: 1
    },
    {
      id: 'ghost',
      type: 'Ghost',
      name: 'Wailing Ghost',
      x: 250,
      y: 250,
      health: 30,
      maxHealth: 30,
      attack: 20,
      defense: 2,
      exp: 30,
      level: 3,
      gold: random(10, 20),
      color: [200, 200, 255],
      size: 22,
      active: true,
      abilities: ['possession', 'scream'],
      detectionRange: 200,
      attackRange: 30,
      moveSpeed: 0.8,
      ethereal: true
    }
  ];
}

function createChests() {
  chests = [
    {
      id: 'chest1',
      x: 300,
      y: 300,
      locked: false,
      opened: false,
      loot: [
        { item: 'health_potion', chance: 1 },
        { item: 'gold', amount: 50, chance: 1 },
        { item: 'iron_sword', chance: 0.5 }
      ],
      color: [160, 82, 45]
    },
    {
      id: 'chest2',
      x: 700,
      y: 200,
      locked: true,
      lockLevel: 2,
      opened: false,
      loot: [
        { item: 'greater_potion', chance: 1 },
        { item: 'gold', amount: 100, chance: 1 },
        { item: 'ring_of_strength', chance: 0.8 }
      ],
      color: [184, 115, 51]
    },
    {
      id: 'chest3',
      x: 450,
      y: 600,
      locked: false,
      opened: false,
      loot: [
        { item: 'herb', chance: 1, amount: 3 },
        { item: 'coal', chance: 1, amount: 2 }
      ],
      color: [139, 69, 19]
    }
  ];
}

function createCamps() {
  camps = [
    {
      id: 'village_camp',
      name: 'Village Center',
      x: 400,
      y: 300,
      discovered: true,
      fastTravel: true,
      locations: ['Forest', 'Mountains', 'Ruins']
    },
    {
      id: 'forest_camp',
      name: 'Forest Clearing',
      x: 600,
      y: 200,
      discovered: false,
      fastTravel: true,
      locations: ['Village', 'Mountains']
    }
  ];
}

function createSpells() {
  spells = [
    {
      id: 'fireball',
      name: 'Fireball',
      manaCost: 15,
      damage: 30,
      cooldown: 10,
      learned: false,
      icon: [255, 100, 0]
    },
    {
      id: 'ice',
      name: 'Ice Shard',
      manaCost: 12,
      damage: 25,
      cooldown: 8,
      slow: true,
      learned: false,
      icon: [100, 200, 255]
    },
    {
      id: 'heal',
      name: 'Heal',
      manaCost: 20,
      healAmount: 40,
      cooldown: 15,
      learned: false,
      icon: [255, 255, 255]
    },
    {
      id: 'lightning',
      name: 'Lightning Bolt',
      manaCost: 25,
      damage: 45,
      cooldown: 20,
      learned: false,
      icon: [255, 255, 0]
    }
  ];
}

function createAchievements() {
  achievements = [
    {
      id: 'first_kill',
      name: 'First Blood',
      description: 'Defeat your first enemy',
      reward: { exp: 50, gold: 25 },
      completed: false
    },
    {
      id: 'level_5',
      name: 'Getting Stronger',
      description: 'Reach level 5',
      reward: { exp: 100, skillPoint: 1 },
      completed: false
    },
    {
      id: 'rich',
      name: 'Rich Adventurer',
      description: 'Accumulate 1000 gold',
      reward: { title: 'Wealthy' },
      completed: false
    },
    {
      id: 'explorer',
      name: 'Explorer',
      description: 'Discover 5 locations',
      reward: { exp: 200 },
      completed: false
    }
  ];
}

function createCraftingRecipes() {
  craftingRecipes = [
    {
      id: 'health_potion',
      name: 'Health Potion',
      ingredients: [
        { item: 'herb', amount: 2 },
        { item: 'water', amount: 1 }
      ],
      result: { item: 'health_potion', amount: 1 },
      skill: 'crafting',
      level: 1
    },
    {
      id: 'mana_potion',
      name: 'Mana Potion',
      ingredients: [
        { item: 'herb', amount: 3 },
        { item: 'water', amount: 1 },
        { item: 'coal', amount: 1 }
      ],
      result: { item: 'mana_potion', amount: 1 },
      skill: 'crafting',
      level: 1
    },
    {
      id: 'iron_sword',
      name: 'Iron Sword',
      ingredients: [
        { item: 'iron_ore', amount: 3 },
        { item: 'coal', amount: 2 }
      ],
      result: { item: 'iron_sword', amount: 1 },
      skill: 'crafting',
      level: 2
    },
    {
      id: 'greater_potion',
      name: 'Greater Potion',
      ingredients: [
        { item: 'herb', amount: 5 },
        { item: 'health_potion', amount: 2 }
      ],
      result: { item: 'greater_potion', amount: 1 },
      skill: 'crafting',
      level: 3
    }
  ];
}

function createQuests() {
  quests = [
    {
      id: 'talk_to_blacksmith',
      name: 'Meet the Blacksmith',
      description: 'Talk to the blacksmith in the village',
      objectives: ['Talk to Blacksmith Greg'],
      reward: { exp: 50, gold: 30 },
      completed: false,
      type: 'main'
    },
    {
      id: 'gather_ore',
      name: 'Gather Iron Ore',
      description: 'Bring 5 iron ore to the blacksmith',
      objectives: ['Collect iron ore: 0/5'],
      progress: 0,
      required: 5,
      reward: { exp: 150, gold: 100, item: 'iron_sword' },
      completed: false,
      type: 'side'
    },
    {
      id: 'clear_bandits',
      name: 'Clear the Bandits',
      description: 'Defeat the bandit leader in the forest',
      objectives: ['Defeat Bandit Leader: 0/1', 'Clear bandit camp'],
      progress: 0,
      required: 1,
      reward: { exp: 300, gold: 200, item: 'ring_of_strength' },
      completed: false,
      type: 'main'
    },
    {
      id: 'find_spellbook',
      name: 'The Lost Spellbook',
      description: 'Find the wizard\'s spellbook in the ruins',
      objectives: ['Find Ancient Spellbook'],
      reward: { exp: 200, gold: 150, spell: 'fireball' },
      completed: false,
      type: 'side'
    },
    {
      id: 'gather_mithril',
      name: 'Mithril Hunt',
      description: 'Bring 10 mithril ore to the miner',
      objectives: ['Collect mithril ore: 0/10'],
      progress: 0,
      required: 10,
      reward: { exp: 500, gold: 500, item: 'steel_sword' },
      completed: false,
      type: 'side'
    },
    {
      id: 'help_villagers',
      name: 'Hero of the People',
      description: 'Complete 5 side quests',
      objectives: ['Side quests completed: 0/5'],
      progress: 0,
      required: 5,
      reward: { exp: 1000, title: 'Hero' },
      completed: false,
      type: 'achievement'
    }
  ];
}

function handleMovement() {
  let moveX = 0;
  let moveY = 0;
  let currentSpeed = player.sprinting ? player.sprintSpeed : player.speed;
  
  if (keyIsDown(87)) moveY = -1; // W
  if (keyIsDown(83)) moveY = 1;  // S
  if (keyIsDown(65)) moveX = -1; // A
  if (keyIsDown(68)) moveX = 1;  // D
  
  if (moveX !== 0 || moveY !== 0) {
    // Normalize diagonal movement
    let len = sqrt(moveX * moveX + moveY * moveY);
    moveX = moveX / len * currentSpeed;
    moveY = moveY / len * currentSpeed;
    
    // Update direction
    if (abs(moveX) > abs(moveY)) {
      player.direction = moveX > 0 ? 'right' : 'left';
    } else {
      player.direction = moveY > 0 ? 'down' : 'up';
    }
    
    // Check collision with NPCs
    let canMove = true;
    let newX = player.x + moveX;
    let newY = player.y + moveY;
    
    // Check boundaries
    if (newX < 50 || newX > 974 || newY < 50 || newY > 718) {
      canMove = false;
    }
    
    // Check NPC collision
    for (let npc of npcs) {
      if (dist(newX, newY, npc.x, npc.y) < player.size + npc.size) {
        canMove = false;
        break;
      }
    }
    
    if (canMove) {
      player.x = newX;
      player.y = newY;
      player.moving = true;
    }
  } else {
    player.moving = false;
  }
  
  // Sprint drain
  if (player.sprinting && player.moving) {
    player.stamina -= 0.5;
    if (player.stamina <= 0) {
      player.sprinting = false;
      player.stamina = 0;
    }
  } else {
    player.stamina = min(player.maxStamina, player.stamina + 0.3);
  }
}

function updateGame() {
  // Update enemy AI
  for (let enemy of enemies) {
    if (!enemy.active) continue;
    
    let d = dist(player.x, player.y, enemy.x, enemy.y);
    
    // Check detection
    if (d < enemy.detectionRange) {
      // Move toward player
      let angle = atan2(player.y - enemy.y, player.x - enemy.x);
      enemy.x += cos(angle) * enemy.moveSpeed;
      enemy.y += sin(angle) * enemy.moveSpeed;
      
      // Attack if in range
      if (d < enemy.attackRange && frameCount % 30 === 0) {
        let damage = max(1, enemy.attack - player.defense);
        player.health -= damage;
        
        // Show damage number
        dialogues.push({
          text: '-' + damage,
          x: player.x,
          y: player.y - 30,
          timer: 30
        });
      }
    } else if (enemy.patrol) {
      // Patrol behavior
      enemy.x += sin(frameCount * 0.02) * 0.5;
      enemy.y += cos(frameCount * 0.02) * 0.5;
    }
  }
  
  // Update projectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    
    // Draw projectile
    fill(p.color);
    ellipse(p.x, p.y, p.size);
    
    // Check collision with enemies
    if (p.fromPlayer) {
      for (let enemy of enemies) {
        if (enemy.active && dist(p.x, p.y, enemy.x, enemy.y) < enemy.size) {
          let damage = p.damage;
          enemy.health -= damage;
          
          // Show damage number
          dialogues.push({
            text: '-' + damage,
            x: enemy.x,
            y: enemy.y - 30,
            timer: 20,
            color: [255, 0, 0]
          });
          
          // Check if enemy died
          if (enemy.health <= 0) {
            enemy.active = false;
            experience += enemy.exp;
            gold += floor(enemy.gold);
            
            // Check level up
            checkLevelUp();
            
            // Drop loot
            if (enemy.lootTable) {
              for (let loot of enemy.lootTable) {
                if (random() < loot.chance) {
                  if (loot.item === 'gold') {
                    gold += loot.amount || 5;
                  } else {
                    let item = items.find(i => i.id === loot.item);
                    if (item) {
                      let newItem = { ...item, collected: true };
                      inventory.push(newItem);
                    }
                  }
                }
              }
            }
            
            // Quest progress for bandit leader
            if (enemy.id === 'bandit_leader') {
              let quest = quests.find(q => q.id === 'clear_bandits');
              if (quest && !quest.completed) {
                quest.progress = 1;
                quest.objectives[0] = 'Defeat Bandit Leader: 1/1';
                completeQuest('clear_bandits');
              }
            }
          }
          
          projectiles.splice(i, 1);
          break;
        }
      }
    }
    
    if (p.life <= 0) {
      projectiles.splice(i, 1);
    }
  }
  
  // Update buffs/debuffs
  for (let i = player.buffs.length - 1; i >= 0; i--) {
    player.buffs[i].duration--;
    if (player.buffs[i].duration <= 0) {
      // Remove buff effect
      if (player.buffs[i].type === 'attack') {
        player.attack -= player.buffs[i].value;
      }
      player.buffs.splice(i, 1);
    }
  }
}

function checkLevelUp() {
  let expNeeded = level * 100;
  if (experience >= expNeeded) {
    level++;
    experience -= expNeeded;
    skillPoints++;
    
    player.maxHealth += 20;
    player.health = player.maxHealth;
    player.maxMana += 10;
    player.mana = player.maxMana;
    player.attack += 3;
    player.defense += 2;
    
    // Level up message
    dialogues.push({
      text: 'LEVEL UP! Now level ' + level,
      x: player.x,
      y: player.y - 50,
      timer: 60,
      color: [255, 215, 0]
    });
    
    // Check achievement
    if (level >= 5) {
      let achievement = achievements.find(a => a.id === 'level_5');
      if (achievement && !achievement.completed) {
        completeAchievement('level_5');
      }
    }
  }
}

function completeQuest(questId) {
  let quest = quests.find(q => q.id === questId);
  if (quest && !quest.completed) {
    quest.completed = true;
    gold += quest.reward.gold || 0;
    experience += quest.reward.exp || 0;
    
    if (quest.reward.item) {
      let item = items.find(i => i.id === quest.reward.item);
      if (item) {
        inventory.push({ ...item, collected: true });
      }
    }
    
    if (quest.reward.spell) {
      let spell = spells.find(s => s.id === quest.reward.spell);
      if (spell) spell.learned = true;
    }
    
    dialogues.push({
      text: 'QUEST COMPLETE!',
      x: player.x,
      y: player.y - 60,
      timer: 60,
      color: [0, 255, 0]
    });
    
    // Check help villagers quest
    if (quest.type === 'side') {
      let helpQuest = quests.find(q => q.id === 'help_villagers');
      if (helpQuest && !helpQuest.completed) {
        helpQuest.progress++;
        helpQuest.objectives[0] = 'Side quests completed: ' + helpQuest.progress + '/5';
        if (helpQuest.progress >= helpQuest.required) {
          completeQuest('help_villagers');
        }
      }
    }
    
    checkLevelUp();
  }
}

function completeAchievement(achievementId) {
  let achievement = achievements.find(a => a.id === achievementId);
  if (achievement && !achievement.completed) {
    achievement.completed = true;
    if (achievement.reward.exp) experience += achievement.reward.exp;
    if (achievement.reward.gold) gold += achievement.reward.gold;
    if (achievement.reward.skillPoint) skillPoints++;
    
    dialogues.push({
      text: 'ACHIEVEMENT: ' + achievement.name,
      x: width/2,
      y: 200,
      timer: 120,
      color: [255, 215, 0]
    });
  }
}

function updateCooldowns() {
  if (player.rollCooldown > 0) player.rollCooldown--;
}

function drawGame() {
  // Dynamic sky color based on time
  let skyColor;
  if (timeOfDay < 6) skyColor = [20, 20, 50]; // Night
  else if (timeOfDay < 8) skyColor = [100, 50, 50]; // Dawn
  else if (timeOfDay < 18) skyColor = [135, 206, 235]; // Day
  else skyColor = [80, 40, 40]; // Dusk
  
  background(skyColor);
  
  // Draw ground with texture
  for (let x = 0; x < width; x += 50) {
    for (let y = 0; y < height; y += 50) {
      fill(34, 139, 34, 200);
      if ((x + y) % 100 === 0) fill(30, 130, 30, 200);
      rect(x, y, 50, 50);
    }
  }
  
  // Draw weather effects
  if (weather === 'rain') {
    for (let i = 0; i < 50; i++) {
      stroke(100, 100, 255, 100);
      line(random(width), random(height), random(width)-5, random(height)+10);
    }
  } else if (weather === 'storm') {
    if (frameCount % 30 === 0) {
      fill(255, 255, 0, 100);
      ellipse(random(width), random(height), 20);
    }
  }
  
  // Draw camps
  for (let camp of camps) {
    if (camp.discovered) {
      push();
      translate(camp.x, camp.y);
      
      // Campfire
      fill(139, 69, 19);
      ellipse(0, 5, 30, 15);
      
      // Fire animation
      let flameSize = 10 + sin(frameCount * 0.2) * 3;
      if (frameCount % 10 < 5) fill(255, 100, 0);
      else fill(255, 200, 0);
      triangle(-5, -5, 5, -5, 0, -15 - flameSize);
      
      // Camp name
      fill(255);
      textSize(12);
      textAlign(CENTER);
      text(camp.name, 0, -40);
      pop();
    }
  }
  
  // Draw chests
  for (let chest of chests) {
    if (!chest.opened) {
      push();
      translate(chest.x, chest.y);
      
      // Chest body
      fill(chest.color);
      rect(-15, -10, 30, 20, 5);
      
      // Lock
      if (chest.locked) {
        fill(255, 215, 0);
        ellipse(0, 0, 8);
      }
      
      // Highlight when nearby
      if (dist(player.x, player.y, chest.x, chest.y) < 50) {
        fill(255, 255, 0, 50);
        ellipse(0, 0, 40);
      }
      pop();
    }
  }
  
  // Draw items
  for (let item of items) {
    if (!item.collected && item.x && item.y) {
      push();
      // Glow effect
      for (let i = 3; i > 0; i--) {
        fill(item.color[0], item.color[1], item.color[2], 50);
        ellipse(item.x, item.y, 12 + i * 4);
      }
      
      // Item
      fill(item.color);
      ellipse(item.x, item.y, 12);
      
      // Item name on hover
      if (dist(player.x, player.y, item.x, item.y) < 50) {
        fill(255);
        textSize(12);
        textAlign(CENTER);
        text(item.name, item.x, item.y - 25);
      }
      pop();
    }
  }
  
  // Draw enemies
  for (let enemy of enemies) {
    if (enemy.active) {
      push();
      translate(enemy.x, enemy.y);
      
      // Enemy body
      fill(enemy.color);
      ellipse(0, 0, enemy.size);
      
      // Eyes (follow player)
      fill(255);
      let eyeOffset = enemy.size / 4;
      let pupilOffset = 2;
      
      if (player.x > enemy.x) {
        ellipse(eyeOffset, -3, 4);
        ellipse(eyeOffset, 3, 4);
        fill(0);
        ellipse(eyeOffset + pupilOffset, -3, 2);
        ellipse(eyeOffset + pupilOffset, 3, 2);
      } else {
        ellipse(-eyeOffset, -3, 4);
        ellipse(-eyeOffset, 3, 4);
        fill(0);
        ellipse(-eyeOffset - pupilOffset, -3, 2);
        ellipse(-eyeOffset - pupilOffset, 3, 2);
      }
      
      // Health bar
      fill(255, 0, 0);
      rect(-20, -30, 40, 5);
      fill(0, 255, 0);
      let healthPercent = enemy.health / enemy.maxHealth;
      rect(-20, -30, 40 * healthPercent, 5);
      
      // Enemy name
      fill(255);
      textSize(10);
      textAlign(CENTER);
      text(enemy.name, 0, -40);
      
      // Level
      fill(255, 215, 0);
      textSize(8);
      text('Lvl ' + enemy.level, 0, -50);
      
      pop();
    }
  }
  
  // Draw projectiles
  for (let p of projectiles) {
    push();
    translate(p.x, p.y);
    fill(p.color);
    ellipse(0, 0, p.size);
    pop();
  }
  
  // Draw NPCs
  for (let npc of npcs) {
    push();
    translate(npc.x, npc.y);
    
    // NPC body
    fill(npc.color);
    ellipse(0, 0, npc.size);
    
    // NPC head details
    fill(255);
    ellipse(-3, -3, 4);
    ellipse(3, -3, 4);
    fill(0);
    ellipse(-3, -3, 2);
    ellipse(3, -3, 2);
    
    // NPC name
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(npc.name, 0, -30);
    
    // Quest indicator
    if (npc.quest) {
      let quest = quests.find(q => q.id === npc.quest);
      if (quest && !quest.completed) {
        fill(255, 255, 0);
        ellipse(15, -15, 10);
      }
    }
    
    // Shop indicator
    if (npc.shop) {
      fill(0, 255, 0);
      ellipse(-15, -15, 8);
    }
    
    pop();
  }
  
  // Draw player
  push();
  translate(player.x, player.y);
  
  // Shadow
  fill(0, 0, 0, 50);
  ellipse(0, 5, player.size, player.size/2);
  
  // Player body
  fill(50, 150, 255);
  ellipse(0, 0, player.size);
  
  // Equipment visuals
  if (equipment.weapon) {
    if (player.direction === 'right') {
      fill(200, 200, 200);
      rect(15, -5, 15, 5);
    } else if (player.direction === 'left') {
      fill(200, 200, 200);
      rect(-30, -5, 15, 5);
    }
  }
  
  if (equipment.armor) {
    fill(100, 100, 100, 100);
    ellipse(0, 5, player.size + 5);
  }
  
  // Player face
  fill(255);
  if (player.direction === 'right') {
    ellipse(5, -3, 4);
    ellipse(5, 3, 4);
    fill(0);
    ellipse(7, -3, 2);
    ellipse(7, 3, 2);
  } else if (player.direction === 'left') {
    ellipse(-5, -3, 4);
    ellipse(-5, 3, 4);
    fill(0);
    ellipse(-7, -3, 2);
    ellipse(-7, 3, 2);
  } else if (player.direction === 'up') {
    ellipse(-3, -5, 4);
    ellipse(3, -5, 4);
    fill(0);
    ellipse(-3, -7, 2);
    ellipse(3, -7, 2);
  } else {
    ellipse(-3, 5, 4);
    ellipse(3, 5, 4);
    fill(0);
    ellipse(-3, 7, 2);
    ellipse(3, 7, 2);
  }
  
  // Health bar
  fill(255, 0, 0);
  rect(-20, -35, 40, 5);
  fill(0, 255, 0);
  rect(-20, -35, 40 * (player.health / player.maxHealth), 5);
  
  // Mana bar
  fill(0, 0, 255);
  rect(-20, -40, 40, 3);
  fill(50, 50, 255);
  rect(-20, -40, 40 * (player.mana / player.maxMana), 3);
  
  pop();
  
  // Draw damage numbers
  for (let i = dialogues.length - 1; i >= 0; i--) {
    let d = dialogues[i];
    if (d.x && d.y) {
      push();
      fill(d.color || [255, 255, 255]);
      textSize(16);
      textAlign(CENTER);
      text(d.text, d.x, d.y - d.timer);
      d.timer--;
      if (d.timer <= 0) dialogues.splice(i, 1);
      pop();
    }
  }
}

function drawUI() {
  // Top bar
  fill(0, 0, 0, 150);
  rect(0, 0, width, 60);
  
  // Health bar
  fill(255, 0, 0);
  rect(10, 10, 300, 20);
  fill(0, 255, 0);
  rect(10, 10, 300 * (player.health / player.maxHealth), 20);
  fill(255);
  textSize(14);
  text('HP: ' + floor(player.health) + '/' + player.maxHealth, 15, 25);
  
  // Mana bar
  fill(0, 0, 255);
  rect(10, 35, 300, 15);
  fill(50, 50, 255);
  rect(10, 35, 300 * (player.mana / player.maxMana), 15);
  fill(255);
  textSize(12);
  text('MP: ' + floor(player.mana) + '/' + player.maxMana, 15, 48);
  
  // Stamina bar
  fill(255, 255, 0);
  rect(320, 10, 150, 10);
  fill(255, 255, 0, 100);
  rect(320, 10, 150 * (player.stamina / player.maxStamina), 10);
  
  // Level and exp
  fill(255, 215, 0);
  textSize(16);
  text('Level ' + level, 320, 40);
  
  let expNeeded = level * 100;
  fill(100, 100, 100);
  rect(320, 45, 150, 8);
  fill(255, 215, 0);
  rect(320, 45, 150 * (experience / expNeeded), 8);
  
  // Gold and gems
  fill(255, 215, 0);
  textSize(18);
  textAlign(RIGHT);
  text('💰 ' + gold, width - 20, 25);
  fill(150, 0, 255);
  text('💎 ' + gems, width - 20, 50);
  
  // Hotbar
  for (let i = 0; i < 6; i++) {
    let x = width/2 - 150 + i * 55;
    let y = height - 70;
    
    // Slot background
    fill(0, 0, 0, 150);
    rect(x, y, 45, 45, 5);
    
    if (hotbar[i]) {
      fill(hotbar[i].color);
      ellipse(x + 22, y + 22, 25);
      
      // Key number
      fill(255);
      textSize(12);
      textAlign(CENTER);
      text(i + 1, x + 22, y + 40);
    } else {
      fill(100);
      textSize(12);
      textAlign(CENTER);
      text(i + 1, x + 22, y + 30);
    }
  }
  
  // Location name
  fill(255, 255, 255, 100);
  textSize(18);
  textAlign(CENTER);
  text(currentLocation, width/2, 40);
  
  // Time and weather
  let timeString = floor(timeOfDay) + ':00';
  fill(255, 255, 255, 100);
  textSize(14);
  text(timeString + ' - ' + weather.toUpperCase(), width/2, 60);
  
  // Controls hint
  fill(255, 255, 255, 50);
  textSize(12);
  textAlign(LEFT);
  text('WASD: Move | Shift: Sprint | Space: Attack | E: Interact | I: Inventory | C: Stats | K: Skills | J: Journal | M: Map | ESC: Pause', 10, height - 10);
}

function drawDialogue() {
  if (!currentDialogue) return;
  
  // Dialogue box
  fill(0, 0, 0, 200);
  rect(50, height - 250, width - 100, 200, 10);
  
  // NPC name
  fill(currentDialogue.npc.color);
  textSize(24);
  textAlign(LEFT);
  text(currentDialogue.npc.name, 70, height - 220);
  
  // Dialogue text
  fill(255);
  textSize(18);
  let dialogueKey = 'greeting';
  if (currentDialogue.npc.dialogues[currentDialogue.stage]) {
    dialogueKey = currentDialogue.stage;
  }
  text(currentDialogue.npc.dialogues[dialogueKey], 70, height - 180, width - 140, 120);
  
  // Options
  let options = ['Continue'];
  if (currentDialogue.npc.shop) options.push('Trade');
  if (currentDialogue.npc.services) {
    if (currentDialogue.npc.services.includes('rest')) options.push('Rest');
    if (currentDialogue.npc.services.includes('heal')) options.push('Heal');
  }
  if (currentDialogue.npc.quest) {
    let quest = quests.find(q => q.id === currentDialogue.npc.quest);
    if (quest && !quest.completed) options.push('About Quest');
  }
  
  for (let i = 0; i < options.length; i++) {
    let y = height - 80 + i * 25;
    fill(200, 200, 200);
    if (currentDialogue.selectedOption === i) fill(255, 255, 0);
    textSize(16);
    text('> ' + options[i], 70, y);
  }
}

function drawInventory() {
  // Inventory background
  fill(0, 0, 0, 220);
  rect(width/2 - 350, height/2 - 300, 700, 600, 10);
  
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('Inventory', width/2, height/2 - 260);
  
  // Equipment slots
  let equipY = height/2 - 200;
  fill(100, 100, 100);
  rect(width/2 - 300, equipY, 120, 120, 5); // Weapon
  rect(width/2 - 150, equipY, 120, 120, 5); // Armor
  rect(width/2, equipY, 120, 120, 5); // Accessory
  
  fill(255);
  textSize(14);
  text('Weapon', width/2 - 240, equipY + 140);
  text('Armor', width/2 - 90, equipY + 140);
  text('Accessory', width/2 + 60, equipY + 140);
  
  if (equipment.weapon) {
    fill(equipment.weapon.color);
    ellipse(width/2 - 240, equipY + 60, 40);
  }
  if (equipment.armor) {
    fill(equipment.armor.color);
    ellipse(width/2 - 90, equipY + 60, 40);
  }
  if (equipment.accessory) {
    fill(equipment.accessory.color);
    ellipse(width/2 + 60, equipY + 60, 40);
  }
  
  // Inventory slots
  let startX = width/2 - 300;
  let startY = height/2 + 20;
  
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 6; j++) {
      let x = startX + j * 100;
      let y = startY + i * 80;
      
      // Slot background
      fill(50, 50, 50);
      rect(x, y, 70, 70, 5);
      
      // Draw item if exists
      let index = i * 6 + j;
      if (index < inventory.length) {
        let item = inventory[index];
        fill(item.color);
        ellipse(x + 35, y + 35, 30);
        
        // Item name
        fill(255);
        textSize(10);
        textAlign(CENTER);
        text(item.name, x + 35, y + 60);
      }
    }
  }
  
  // Stats
  fill(255);
  textSize(18);
  text('Stats:', width/2 + 200, height/2 - 200);
  text('Attack: ' + player.attack, width/2 + 200, height/2 - 170);
  text('Defense: ' + player.defense, width/2 + 200, height/2 - 140);
  text('Magic: ' + player.magic, width/2 + 200, height/2 - 110);
  text('Crit: ' + player.critChance + '%', width/2 + 200, height/2 - 80);
  
  // Close instruction
  fill(255, 255, 0);
  text('Press I to close', width/2, height/2 + 280);
}

function drawCharacterStats() {
  // Stats background
  fill(0, 0, 0, 220);
  rect(width/2 - 300, height/2 - 300, 600, 500, 10);
  
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('Character Stats', width/2, height/2 - 260);
  
  let y = height/2 - 200;
  fill(255);
  textSize(18);
  textAlign(LEFT);
  
  // Basic stats
  text('Level: ' + level, width/2 - 250, y); y += 30;
  text('Experience: ' + experience + '/' + (level * 100), width/2 - 250, y); y += 30;
  text('Health: ' + player.health + '/' + player.maxHealth, width/2 - 250, y); y += 30;
  text('Mana: ' + player.mana + '/' + player.maxMana, width/2 - 250, y); y += 30;
  text('Stamina: ' + floor(player.stamina) + '/' + player.maxStamina, width/2 - 250, y); y += 30;
  text('Attack: ' + player.attack, width/2 - 250, y); y += 30;
  text('Defense: ' + player.defense, width/2 - 250, y); y += 30;
  text('Magic: ' + player.magic, width/2 - 250, y); y += 30;
  text('Crit Chance: ' + player.critChance + '%', width/2 - 250, y); y += 30;
  text('Crit Damage: ' + player.critDamage + '%', width/2 - 250, y); y += 50;
  
  // Resources
  fill(255, 215, 0);
  text('Gold: ' + gold, width/2 + 50, height/2 - 170);
  fill(150, 0, 255);
  text('Gems: ' + gems, width/2 + 50, height/2 - 140);
  fill(0, 255, 255);
  text('Skill Points: ' + skillPoints, width/2 + 50, height/2 - 110);
  
  // Reputation
  fill(255);
  text('Reputation: ' + reputation, width/2 + 50, height/2 - 60);
  
  // Close instruction
  fill(255, 255, 0);
  text('Press C to close', width/2, height/2 + 180);
}

function drawSkillTree() {
  // Skills background
  fill(0, 0, 0, 220);
  rect(width/2 - 400, height/2 - 300, 800, 600, 10);
  
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('Skill Tree', width/2, height/2 - 260);
  textSize(18);
  text('Skill Points: ' + skillPoints, width/2, height/2 - 220);
  
  let skills_list = ['warrior', 'mage', 'rogue', 'crafting'];
  let colors = [[200, 50, 50], [50, 50, 200], [50, 200, 50], [200, 200, 50]];
  
  for (let s = 0; s < skills_list.length; s++) {
    let skillName = skills_list[s];
    let skill = skills[skillName];
    let x = width/2 - 300 + s * 200;
    let y = height/2 - 150;
    
    // Skill category
    fill(colors[s]);
    textSize(20);
    text(skillName.toUpperCase(), x, y); y += 30;
    
    // Skill level
    fill(255);
    textSize(16);
    text('Level: ' + skill.level, x, y); y += 30;
    text('EXP: ' + skill.exp + '/100', x, y); y += 40;
    
    // Upgrade button
    if (skillPoints > 0 && skill.level < 10) {
      fill(0, 255, 0);
      rect(x, y, 80, 30, 5);
      fill(0);
      textSize(14);
      text('Upgrade', x + 40, y + 20);
    }
  }
  
  // Close instruction
  fill(255, 255, 0);
  text('Press K to close', width/2, height/2 + 280);
}

function drawJournal() {
  // Journal background
  fill(0, 0, 0, 220);
  rect(width/2 - 350, height/2 - 300, 700, 600, 10);
  
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('Quest Journal', width/2, height/2 - 260);
  
  let y = height/2 - 200;
  
  // Active quests
  fill(255, 255, 0);
  textSize(20);
  textAlign(LEFT);
  text('Active Quests:', width/2 - 300, y); y += 30;
  
  let hasActive = false;
  for (let quest of quests) {
    if (!quest.completed) {
      hasActive = true;
      fill(255);
      textSize(16);
      text('• ' + quest.name, width/2 - 300, y); y += 20;
      fill(200, 200, 200);
      textSize(14);
      text('  ' + quest.description, width/2 - 280, y); y += 25;
      
      // Objectives
      for (let obj of quest.objectives) {
        text('  - ' + obj, width/2 - 280, y); y += 20;
      }
      y += 10;
    }
  }
  
  if (!hasActive) {
    fill(200, 200, 200);
    text('No active quests', width/2 - 300, y);
  }
  
  y = height/2 - 200;
  
  // Completed quests
  fill(0, 255, 0);
  textSize(20);
  text('Completed Quests:', width/2 + 50, y); y += 30;
  
  for (let quest of quests) {
    if (quest.completed) {
      fill(150, 150, 150);
      textSize(14);
      text('✓ ' + quest.name, width/2 + 50, y); y += 20;
    }
  }
  
  // Achievements
  y = height/2 + 150;
  fill(255, 215, 0);
  textSize(20);
  text('Achievements:', width/2 - 300, y); y += 30;
  
  for (let ach of achievements) {
    if (ach.completed) {
      fill(0, 255, 0);
      text('✓ ' + ach.name, width/2 - 300, y);
    } else {
      fill(100, 100, 100);
      text('○ ' + ach.name, width/2 - 300, y);
    }
    y += 20;
  }
  
  // Close instruction
  fill(255, 255, 0);
  text('Press J to close', width/2, height/2 + 280);
}

function drawMap() {
  // Map background
  fill(0, 0, 0, 220);
  rect(width/2 - 350, height/2 - 300, 700, 600, 10);
  
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('World Map', width/2, height/2 - 260);
  
  // Draw world map
  push();
  translate(width/2 - 250, height/2 - 150);
  scale(0.5);
  
  // Map background
  fill(34, 139, 34);
  rect(0, 0, 1000, 800);
  
  // Locations
  fill(255, 255, 0);
  ellipse(400, 300, 30); // Village
  fill(0, 255, 0);
  ellipse(600, 200, 30); // Forest
  fill(100, 100, 100);
  ellipse(700, 500, 30); // Mountains
  fill(150, 0, 0);
  ellipse(200, 400, 30); // Ruins
  
  // Location names
  fill(255);
  textSize(20);
  text('Village', 380, 280);
  text('Forest', 580, 180);
  text('Mountains', 680, 480);
  text('Ruins', 180, 380);
  
  // Player position
  fill(0, 255, 0);
  ellipse(player.x, player.y, 15);
  
  pop();
  
  // Legend
  fill(255);
  textSize(16);
  text('Fast Travel Points:', width/2 - 100, height/2 + 200);
  
  for (let camp of camps) {
    if (camp.discovered) {
      fill(0, 255, 0);
      text('• ' + camp.name, width/2 - 100, height/2 + 220 + camps.indexOf(camp) * 20);
    }
  }
  
  // Close instruction
  fill(255, 255, 0);
  text('Press M to close', width/2, height/2 + 280);
}

function drawPause() {
  fill(0, 0, 0, 200);
  rect(width/2 - 200, height/2 - 200, 400, 400, 10);
  
  fill(255);
  textSize(48);
  textAlign(CENTER);
  text('PAUSED', width/2, height/2 - 120);
  
  textSize(24);
  let options = ['Resume', 'Save Game', 'Load Game', 'Options', 'Quit to Menu'];
  let y = height/2 - 40;
  
  for (let i = 0; i < options.length; i++) {
    if (currentDialogue && currentDialogue.selectedOption === i) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    text(options[i], width/2, y);
    y += 40;
  }
}

function drawCrafting() {
  // Crafting background
  fill(0, 0, 0, 220);
  rect(width/2 - 350, height/2 - 300, 700, 600, 10);
  
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text('Crafting', width/2, height/2 - 260);
  
  let y = height/2 - 200;
  
  for (let recipe of craftingRecipes) {
    if (recipe.level <= skills.crafting.level) {
      // Recipe background
      fill(50, 50, 50);
      rect(width/2 - 300, y - 15, 600, 40, 5);
      
      // Recipe name
      fill(255);
      textSize(18);
    }
  }
}