'use strict';
var GradientType = require ("openfl/display/GradientType").default;
var Shape = require ("openfl/display/Shape").default;
var Sprite = require ("openfl/display/Sprite").default;
var Matrix = require ("openfl/geom/Matrix").default;

var ProgressBar = function(width, height)
{
    Sprite.call(this);
    this.init(width, height);
}

ProgressBar.prototype = Object.create(Sprite.prototype);
ProgressBar.prototype.constructor = ProgressBar;

ProgressBar.prototype.init = function(width, height)
{
    var padding = height * 0.2;
    var cornerRadius = padding * 2;
    
    // create black rounded box for background
    
    this._background = new Shape();
    this._background.graphics.beginFill(0x0, 0.5);
    this._background.graphics.drawRoundRect(0, 0, width, height, cornerRadius, cornerRadius);
    this._background.graphics.endFill();
    this.addChild(this._background);
    
    // create progress bar shape

    var barWidth  = width  - 2 * padding;
    var barHeight = height - 2 * padding;
    var barMatrix = new Matrix();
    barMatrix.createGradientBox(barWidth, barHeight, Math.PI / 2);

    this._bar = new Shape();
    this._bar.graphics.beginGradientFill(GradientType.LINEAR,
        [0xeeeeee, 0xaaaaaa], [1, 1], [0, 255], barMatrix);
    this._bar.graphics.drawRect(0, 0, barWidth, barHeight);
    this._bar.x = padding;
    this._bar.y = padding;
    this._bar.scaleX = 0.0;
    this.addChild(this._bar);
}

Object.defineProperty(ProgressBar.prototype, "ratio", {
    get: function() { return this._bar.scaleX; },
    set: function(value) { this._bar.scaleX = Math.max(0.0, Math.min(1.0, value)); }
});

module.exports.ProgressBar = ProgressBar;
module.exports.default = ProgressBar;