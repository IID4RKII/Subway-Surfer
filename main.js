// var playerRotation = 0.0;

// Declare objects
var length_of_game = 600;

var player;
var player_texture;
var policeman;
var policeman_texture;
var dog;
var dog_texture;
var tracks = [];
var tracks_texture;
var tracks_parallel = [];
var tracks_parallel_texture;
var wall = [];
var wall_texture;
var floor = [];
var floor_texture;
var trains = [];
var number_of_trains = 8;
var train_texture;
var barricades = [];
var number_of_barricades = 8;
var barricades_texture;
var garbage = [];
var number_of_garbage = 8;
var garbage_texture;
var rats = [];
var number_of_rats = 8;
var rats_texture;
var banners = [];
var number_of_banners = 4;
var banners_texture;
var coins = [];
var number_of_coins = 80;
var coins_texture;
var jumping_boots = [];
var jumping_boots_texture;
var flying_boots = [];
var flying_boots_texture;
var hoverboard;
var hoverboard_texture;

var gameSound;
var collisionSound;
var bonusSound;
var jumpSound;

var fsSource;
var vsSource;
var shaderProgram;
var programInfo;

main();

function main() {


  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // Define objects here
  // base is -3.2
  for (let i = 0; i < length_of_game/10; i++) {
    wall[i] = new Wall(gl, [-20, 0, 10-i*20]);
  }
  for (let i = 0; i < length_of_game/10; i++) {
    wall[length_of_game/10 + i] = new Wall(gl, [20, 0, 10-i*20]);
  }

  for (let i = 0; i < length_of_game/10; i++) {
    floor[i] = new Floor(gl, [0, -15, 10-i*20]);
  }

  for (let i = 0; i < length_of_game/5; i++) {
    tracks[i] = new Tracks(gl, [-5.5, -3.6, 10-i*10]);
  }
  for (let i = 0; i < length_of_game/5; i++) {
    tracks[length_of_game/5 + i] = new Tracks(gl, [-1, -3.6, 10-i*10]);
  }
  for (let i = 0; i < length_of_game/5; i++) {
    tracks[2*length_of_game/5 + i] = new Tracks(gl, [3.5, -3.6, 10-i*10]);
  }
  for (let i = 0; i < length_of_game/5; i++) {
    tracks[3*length_of_game/5 + i] = new Tracks(gl, [-3.5, -3.6, 10-i*10]);
  }
  for (let i = 0; i < length_of_game/5; i++) {
    tracks[4*length_of_game/5 + i] = new Tracks(gl, [1, -3.6, 10-i*10]);
  }
  for (let i = 0; i < length_of_game/5; i++) {
    tracks[5*length_of_game/5 + i] = new Tracks(gl, [5.5, -3.6, 10-i*10]);
  }

  for (let i = 0; i < length_of_game/5; i++) {
    tracks_parallel[i] = new TracksParallel(gl, [-4.5, -3.5, 10-i*10]);
  }
  for (let i = 0; i < length_of_game/5; i++) {
    tracks_parallel[length_of_game/5 + i] = new TracksParallel(gl, [0, -3.5, 10-i*10]);
  }
  for (let i = 0; i < length_of_game/5; i++) {
    tracks_parallel[2*length_of_game/5 + i] = new TracksParallel(gl, [4.5, -3.5, 10-i*10]);
  }

  for(let i = 0; i < number_of_trains; i++){
    trains[i] = new Trains(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -0.7,  -50 - 450*Math.random()]);
  }

  for(let i = 0; i < number_of_barricades; i++){
    barricades[i] = new Barricades(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -1.7,  -50 - 450*Math.random()]);
  }

  for(let i = 0; i < number_of_garbage; i++){
    garbage[i] = new Garbage(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -3,  -50 - 450*Math.random()]);
  }

  for(let i = 0; i < number_of_rats; i++){
    rats[i] = new Rats(gl, [(Math.floor(2*Math.random())) * 4.5 - 2.25, -3,  -50 - 450*Math.random()]);
  }

  for(let i = 0; i < number_of_banners; i++){
    banners[i] = new Banners(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, 0.5,  -50 - 450*Math.random()]);
  }


  for(let i = 0; i < number_of_coins; i++){
    coins[i] = new Coins(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -2.5 + 6*Math.random(),  -50 - 450*Math.random()]);
  }

  jumping_boots[0] = new JumpingBoots(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -1.8, -50 - 150*Math.random()]);
  jumping_boots[1] = new JumpingBoots(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -1.8, -200 - 150*Math.random()]);
  jumping_boots[2] = new JumpingBoots(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -1.8, -350 - 150*Math.random()]);
  
  flying_boots[0] = new FlyingBoots(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -1.8, -100 - 200*Math.random()]);
  flying_boots[1] = new FlyingBoots(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -1.8, -300 - 200*Math.random()]);

  // hoverboard = new Hoverboard(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -1.8, -100 - 400*Math.random()]);

  hoverboard = new Hoverboard(gl, [(Math.floor(3*Math.random()) - 1) * 4.5, -1.8, -10]);
  
  player = new Player(gl, [0, -2.2, 0]);
  policeman = new Policeman(gl, [-2, -2.2, 2]);
  dog = new Dog(gl, [0, -2.2, 2]);

  gameSound = new sound("surfer.mp3");
  gameSound.play();
  collisionSound = new sound("collision.wav");
  bonusSound = new sound("bonus.wav");
  jumpSound = new sound("jump.wav");




  // If we don't have a GL context, give up now
    if (!gl) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }

    // Vertex shader program

    var vs1 = `
      attribute vec4 aVertexPosition;
      attribute vec3 aVertexNormal;
      attribute vec2 aTextureCoord;

      uniform mat4 uNormalMatrix;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      varying highp vec2 vTextureCoord;
      varying highp vec3 vLighting;

      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;

        // Apply lighting effect

        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
      }
    `;

    var vs2 = `
      attribute vec4 aVertexPosition;
      attribute vec3 aVertexNormal;
      attribute vec2 aTextureCoord;

      uniform mat4 uNormalMatrix;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      varying highp vec2 vTextureCoord;
      varying highp vec3 vLighting;

      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;

        // Apply lighting effect

        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        highp vec3 directionalLightColor = vec3(-1, -1, -1);
        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
      }
    `;


    // Fragment shader program
    var view_in_rgb = `gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a); }`;
    var view_in_grayscale = `precision highp float; vec4 color = texture2D(uSampler, vTextureCoord); float gray = dot(color.rgb,vec3(0.299,0.587,0.114)); gl_FragColor = vec4(vec3(gray),1.0); }`;
    var view_fs = `varying highp vec2 vTextureCoord; varying highp vec3 vLighting; uniform sampler2D uSampler; void main(void) { highp vec4 texelColor = texture2D(uSampler, vTextureCoord);`;

    player_texture = loadTexture(gl, 'player.jpeg');
    policeman_texture = loadTexture(gl, 'policeman.jpeg');
    dog_texture = loadTexture(gl, 'dog.jpeg');
    tracks_texture = loadTexture(gl, 'track.jpg');
    tracks_parallel_texture = loadTexture(gl, 'track_parallel.jpeg');
    wall_texture = loadTexture(gl, 'brick.jpeg');
    floor_texture = loadTexture(gl, 'floor.jpeg');
    train_texture = loadTexture(gl, 'trains.jpeg');
    barricades_texture = loadTexture(gl, 'barricades.jpeg');
    garbage_texture = loadTexture(gl, 'garbage.jpeg');
    rats_texture = loadTexture(gl, 'rats.jpeg');
    banners_texture = loadTexture(gl, 'banners.jpeg');
    coins_texture = loadTexture(gl, 'coins.jpeg');
    jumping_boots_texture = loadTexture(gl, 'jumping_boots.jpeg');
    flying_boots_texture = loadTexture(gl, 'flying_boots.png');
    hoverboard_texture = loadTexture(gl, 'hoverboard.jpeg');

  var player_side_movement = 0;
  var toggle_grayscale = false;
  var toggle_flashing = false;
  document.addEventListener('keydown', event1 => {
      if(event1.keyCode == 37){
        document.addEventListener('keyup', event2 => {
          if(event2.keyCode == 37){
           player_side_movement = -1;
          }
        });
      }
      else if(event1.keyCode == 39){
        document.addEventListener('keyup', event2 => {
          if(event2.keyCode == 39){
            player_side_movement = 1;
          }
        });
      }
      else if(event1.keyCode == 84){
        document.addEventListener('keyup', event2 => {
          if(event2.keyCode == 84){
            toggle_grayscale = !toggle_grayscale;
          }
        });
      }
      else if(event1.keyCode == 70){
        document.addEventListener('keyup', event2 => {
          if(event2.keyCode == 70){
            toggle_flashing = !toggle_flashing;
          }
        });
      }
      else if(event1.keyCode == 68){
        player.down();
      }
      else if(event1.keyCode == 32){
        player.jump();
      }
  });
    var then = 0;

  // Draw the scene repeatedly. Game loop
    function render(now) {

      if(toggle_grayscale){
        fsSource = view_fs + view_in_grayscale;
      }
      else{
        fsSource = view_fs + view_in_rgb;
      }
      if(!toggle_flashing){
        vsSource = vs1;
      }
      else{
        vsSource = vs2;
      }
      shaderProgram = initShaderProgram(gl, vsSource, fsSource);
      programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
          textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
          normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
          uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        },
      };


      now *= 0.001;  // convert to seconds
      const deltaTime = now - then;
      then = now;

      if (player_side_movement == -1) {
        player.left()
        player_side_movement = 0;
      }
      else if (player_side_movement == 1) {
        player.right();
        player_side_movement = 0;
      }
      player.run();
      policeman.move(player.pos, ((player.last_hit - player.pos[2] < 50) && player.hit_once));
      dog.move(player.pos, (player.boots_type == "fly"));
      for(let i=0; i< number_of_coins; i++) {
        coins[i].move(player.boots_type == "fly");
      }



      detect_collision_with_trains();
      detect_collision_with_barricades();
      detect_collision_with_banners();
      detect_collision_with_garbage();
      detect_collision_with_rats();
      detect_collision_with_coins();
      detect_collision_with_jumping_boots();
      detect_collision_with_flying_boots();
      detect_collision_with_hoverboard();


      if(player.pos[2] <= -510){
      	window.alert("GAME OVER. YOU WON!!!\n SCORE : " + player.score);
      }


      drawScene(gl, programInfo, deltaTime);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, deltaTime) {

  //  Initial Setting
   	gl.clearColor(0.528, 0.805, 0.918, 1.0);  // Clear to black, fully opaque
  	gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
    var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [0, 7, player.pos[2] + 16]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [0, 0, player.pos[2]], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);


  // Draw objects
  for (let i = 0; i < length_of_game/10; i++) {
    floor[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < 2*length_of_game/10; i++) {
    wall[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < 6*length_of_game/5; i++) {
    tracks[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < 3*length_of_game/5; i++) {
    tracks_parallel[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < number_of_trains; i++) {
    trains[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < number_of_barricades; i++) {
    barricades[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < number_of_garbage; i++) {
    garbage[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < number_of_rats; i++) {
    rats[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < number_of_banners; i++) {
    banners[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < number_of_coins; i++) {
    coins[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < 3; i++) {
    jumping_boots[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for (let i = 0; i < 2; i++) {
    flying_boots[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  player.draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  policeman.draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  dog.draw(gl, viewProjectionMatrix, programInfo, deltaTime);

}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


function detect_collision_with_trains() {
	for (let i = 0; i < number_of_trains; i++) {
    	if(detect_collision(player, trains[i])){
        if(!player.hovering){
      		collisionSound.play();
      		window.alert('GAME OVER. You died.\nSCORE : ' + player.score);
        }
        else {
          player.hovering = false;
          trains[i].pos[2] = 10;
        }
    	}
	}
}

function detect_collision_with_barricades() {
	for (let i = 0; i < number_of_barricades; i++) {
    	if(detect_collision(player, barricades[i])){
        if(!player.hovering){
      		collisionSound.play();
      		window.alert('GAME OVER. You died.\nSCORE : ' + player.score);
        }
        else {
          player.hovering = false;
          barricades[i].pos[2] = 10;
        }
    	}
	}
}

function detect_collision_with_banners() {
	for (let i = 0; i < number_of_banners; i++) {
    	if(detect_collision(player, banners[i])){
        if(!player.hovering) {
      		collisionSound.play();
      		window.alert('GAME OVER. You died.\nSCORE : ' + player.score);
        }
        else {
          player.hovering = false;
          banners[i].pos[2] = 10;
        }
    	}
	}
}

function detect_collision_with_garbage() {
	for (let i = 0; i < number_of_garbage; i++) {
    	if(detect_collision(player, garbage[i])){
        if(!player.hovering){
      		if(player.last_hit - player.pos[2] < 50){
      			collisionSound.play();
      			window.alert('GAME OVER. You died.\nSCORE : ' + player.score);
      		}
      		else {
      			collisionSound.play();
      			player.hit_once = true;
      			player.last_hit = garbage[i].pos[2];
      			garbage[i].pos[2] = 10;
      		}
        }
    	}
      else {
        player.hovering = false;
        garbage[i].pos[2] = 10;
      }
	}
}

function detect_collision_with_rats() {
  for (let i = 0; i < number_of_rats; i++) {
      if(detect_collision(player, rats[i])){
        if(!player.hovering){
          if(player.last_hit - player.pos[2] < 50){
            collisionSound.play();
            window.alert('GAME OVER. You died.\nSCORE : ' + player.score);
          }
          else {
            collisionSound.play();
            player.hit_once = true;
            player.last_hit = rats[i].pos[2];
            rats[i].pos[2] = 10;
          }
        }
        else {
          player.hovering = false;
          rats[i].pos[2] = 10;
        }
      }
  }
}

function detect_collision_with_coins() {
	for (let i = 0; i < number_of_coins; i++) {
    	if(detect_collision(player, coins[i])){
    		bonusSound.play();
    		player.score += 10;
    		coins[i].pos[2] = 10;
    	}
	}
}

function detect_collision_with_jumping_boots() {
	for (let i = 0; i < 3; i++) {
    	if(detect_collision(player, jumping_boots[i])){
    		bonusSound.play();
    		player.score += 50;
    		player.special_jumping_started = jumping_boots[i].pos[2];
    		jumping_boots[i].pos[2] = 10;
    	}
	}
}

function detect_collision_with_flying_boots() {
	for (let i = 0; i < 2; i++) {
    	if(detect_collision(player, flying_boots[i])){
    		bonusSound.play();
    		player.score += 50;
    		player.flying_started = flying_boots[i].pos[2];
    		flying_boots[i].pos[2] = 10;
    	}
	}
}

function detect_collision_with_hoverboard() {
  if(detect_collision(player, hoverboard)){
    bonusSound.play();
    player.score += 50;
    player.flying_started = hoverboard.pos[2];
      hoverboard.pos[2] = 10;
  }
}


function detect_collision(a, b) {
	return (Math.abs(a.pos[0] - b.pos[0]) < (a.width + b.width)) &&
           (Math.abs(a.pos[1] - b.pos[1]) < (a.thickness + b.thickness)) &&
           (Math.abs(a.pos[2] - b.pos[2]) < (a.length + b.length));
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn off mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}