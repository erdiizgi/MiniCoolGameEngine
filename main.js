var MCGE;
(function (MCGE) {
    var Core;
    (function (Core) {
        var Scene = (function () {
            function Scene(name) {
                this.id = name;
                this.canvas = document.createElement("canvas");
                this.canvas.setAttribute('id', this.id);
                this.context = this.canvas.getContext('2d');
                this.drawables = [];
            }
            Scene.prototype.addDrawable = function (drawable) {
                drawable.setContext(this.context);
                this.drawables.push(drawable);
            };
            Scene.prototype.clean = function (x, y) {
                this.context.clearRect(0, 0, x, y);
            };
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
            Object.defineProperty(Scene.prototype, "elements", {
                get: function () {
                    return this.drawables;
                },
                enumerable: true,
                configurable: true
            });
            return Scene;
        })();
        Core.Scene = Scene;
    })(Core = MCGE.Core || (MCGE.Core = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
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
    })(Core = MCGE.Core || (MCGE.Core = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
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
                this.container.setAttribute("id", "container");
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
                window.addEventListener('resize', this.resize, false);
            };
            Engine.prototype.run = function () {
                var _this = this;
                for (var i = 0; i < this.world.Scenes.length; i++) {
                    this.world.Scenes[i].clean(this.width, this.height);
                    for (var j = 0; j < this.world.Scenes[i].elements.length; j++) {
                        this.world.Scenes[i].elements[j].update();
                        this.world.Scenes[i].elements[j].draw();
                    }
                }
                window.requestAnimationFrame(function () { return _this.run(); });
            };
            Engine.prototype.resize = function () {
                //TODO write resize funtion 
            };
            return Engine;
        })();
        Core.Engine = Engine;
    })(Core = MCGE.Core || (MCGE.Core = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
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
    })(Helper = MCGE.Helper || (MCGE.Helper = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        var Drawable = (function () {
            function Drawable(x, y) {
                this.x = x;
                this.y = y;
            }
            Drawable.prototype.setContext = function (context) {
                this.context = context;
            };
            Drawable.prototype.draw = function () { };
            Drawable.prototype.update = function () { };
            return Drawable;
        })();
        UI.Drawable = Drawable;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(text, x, y, size, font, color) {
                _super.call(this, x, y);
                this.size = size;
                this.font = font;
                this.color = color;
                this.text = text;
            }
            Label.prototype.draw = function () {
                this.context.beginPath();
                this.context.font = this.size + "em " + this.font;
                this.context.fillStyle = this.color;
                this.context.fillText(this.text, this.x, this.y);
                this.context.closePath();
            };
            return Label;
        })(UI.Drawable);
        UI.Label = Label;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        var Movable = (function (_super) {
            __extends(Movable, _super);
            function Movable(x, y) {
                _super.call(this, x, y);
                this.Key = {
                    _pressed: {},
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    isDown: function (keyCode) {
                        return this._pressed[keyCode];
                    },
                    onKeydown: function (event) {
                        this._pressed[event.keyCode] = true;
                    },
                    onKeyup: function (event) {
                        delete this._pressed[event.keyCode];
                    }
                };
                document.addEventListener("keydown", function (event) {
                    this.Key.onKeydown(event);
                }.bind(this), false);
                document.addEventListener("keyup", function (event) {
                    this.Key.onKeyup(event);
                }.bind(this), false);
            }
            Movable.prototype.draw = function () { };
            Movable.prototype.update = function () { };
            return Movable;
        })(UI.Drawable);
        UI.Movable = Movable;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        var MovableLabel = (function (_super) {
            __extends(MovableLabel, _super);
            function MovableLabel(text, x, y, size, font, color, speed) {
                _super.call(this, x, y);
                this.size = size;
                this.font = font;
                this.color = color;
                this.text = text;
                this.speed = speed;
            }
            MovableLabel.prototype.moveLeft = function () {
                this.x -= this.speed;
            };
            MovableLabel.prototype.moveRight = function () {
                this.x += this.speed;
            };
            MovableLabel.prototype.moveUp = function () {
                this.y -= this.speed;
            };
            MovableLabel.prototype.moveDown = function () {
                this.y += this.speed;
            };
            MovableLabel.prototype.draw = function () {
                this.context.beginPath();
                this.context.font = this.size + "em " + this.font;
                this.context.fillStyle = this.color;
                this.context.fillText(this.text, this.x, this.y);
                this.context.closePath();
            };
            MovableLabel.prototype.update = function () {
                if (this.Key.isDown(this.Key.UP))
                    this.moveUp();
                if (this.Key.isDown(this.Key.LEFT))
                    this.moveLeft();
                if (this.Key.isDown(this.Key.DOWN))
                    this.moveDown();
                if (this.Key.isDown(this.Key.RIGHT))
                    this.moveRight();
            };
            return MovableLabel;
        })(UI.Movable);
        UI.MovableLabel = MovableLabel;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
/// <reference path="./core/Scene.ts"/>
/// <reference path="./core/World.ts"/>
/// <reference path="./core/Engine.ts"/>
/// <reference path="./core/Input"/>
/// <reference path="./helper/Utils.ts"/>
/// <reference path="./ui/Drawable.ts"/>
/// <reference path="./ui/Label.ts"/>
/// <reference path="./ui/Movable.ts"/>
/// <reference path="./ui/MovableLabel.ts"/>
var Scene = MCGE.Core.Scene;
var World = MCGE.Core.World;
var Engine = MCGE.Core.Engine;
var Utils = MCGE.Helper.Utils;
var Label = MCGE.UI.Label;
var MovableLabel = MCGE.UI.MovableLabel;
function Main() {
    //Add some scene
    var scene = new Scene("background");
    var sceneGame = new Scene("game");
    //Add some texts on scenes
    var text = new Label("Test", 100, 100, 5, "Arial", "black");
    var text2 = new Label("Erdi", 250, 300, 10, "Impact", "orange");
    var text3 = new Label("Come!", 500, 400, 6, "Arial", "pink");
    var text4 = new MovableLabel("İremciğim", 600, 550, 6, "Impact", "purple", 5);
    var text5 = new MovableLabel("Dilekcik", 100, 700, 6, "Impact", "blue", 4);
    scene.addDrawable(text);
    scene.addDrawable(text2);
    sceneGame.addDrawable(text3);
    sceneGame.addDrawable(text4);
    sceneGame.addDrawable(text5);
    //Add a world
    var world = new World();
    //Add scene to the world
    world.AddScene(scene);
    world.AddScene(sceneGame);
    //Add an engine to run the world and initialize it
    var engine = new Engine(world);
    engine.init();
    engine.run();
}
//Invoke the Main when page is loaded
window.addEventListener("load", Main, false);
//# sourceMappingURL=main.js.map