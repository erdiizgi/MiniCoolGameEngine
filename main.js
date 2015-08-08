var Core;
(function (Core) {
    var Scene = (function () {
        function Scene(name) {
            this.id = name;
            this.canvas = document.createElement("canvas");
            this.canvas.setAttribute('id', this.id);
        }
        Object.defineProperty(Scene.prototype, "scene", {
            get: function () {
                return this.canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "name", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        return Scene;
    })();
    Core.Scene = Scene;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var World = (function () {
        function World() {
            this.sceneDeck = [];
        }
        World.prototype.AddScene = function (scene) {
            this.sceneDeck.push(scene);
        };
        Object.defineProperty(World.prototype, "Scenes", {
            get: function () {
                return this.sceneDeck;
            },
            enumerable: true,
            configurable: true
        });
        return World;
    })();
    Core.World = World;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Engine = (function () {
        function Engine(world, aspectRatio) {
            this.aspectRatio = 4 / 3;
            this.world = world;
            if (aspectRatio != null)
                this.aspectRatio = aspectRatio;
            this.height = window.innerHeight;
            this.width = (this.height * this.aspectRatio + 0.5) | 0;
            this.container = document.createElement("div");
            Utils.containerCss(this.container, this.width, this.height);
        }
        Engine.prototype.init = function () {
            //Append the canvas' to the page
            for (var i = 0; i < this.world.Scenes.length; i++) {
                var scene = this.world.Scenes[i].scene;
                Utils.canvasCss(scene, this.width, this.height);
                this.container.appendChild(scene);
            }
            document.body.appendChild(this.container);
        };
        Engine.prototype.run = function () {
        };
        return Engine;
    })();
    Core.Engine = Engine;
})(Core || (Core = {}));
var Helper;
(function (Helper) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.containerCss = function (container, width, height) {
            container.style.position = "absolute";
            container.style.left = "50%";
            container.style.top = "50%";
            container.style.marginTop = -height / 2 + 'px';
            container.style.marginLeft = -width / 2 + 'px';
        };
        Utils.canvasCss = function (scene, width, height) {
            scene.style.width = width + "px";
            scene.style.height = height + "px";
            scene.style.position = "absolute";
            scene.width = width;
            scene.height = height;
        };
        return Utils;
    })();
    Helper.Utils = Utils;
})(Helper || (Helper = {}));
/// <reference path="./core/Scene.ts"/>
/// <reference path="./core/World.ts"/>
/// <reference path="./core/Engine.ts"/>
/// <reference path="./helper/Utils.ts"/>
var Scene = Core.Scene;
var World = Core.World;
var Engine = Core.Engine;
var Utils = Helper.Utils;
function Main() {
    var TAG = "MAIN";
    console.log(TAG, "It is working");
    //Add some scene
    var scene = new Scene("background");
    var sceneGame = new Scene("game");
    //Add a world
    var world = new World();
    //Add scene to the world
    world.AddScene(scene);
    world.AddScene(sceneGame);
    //Add an engine to run the world and initialize it
    var engine = new Engine(world);
    engine.init();
}
//Invoke the Main when page is loaded
window.addEventListener("load", Main, false);
//# sourceMappingURL=main.js.map