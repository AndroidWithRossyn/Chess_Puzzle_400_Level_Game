
function getJsonFromUrl() {
    for (var a = {}, b = location.search.substr(1).split("&"), c = 0; c < b.length; c++) {
        var d = b[c].indexOf("="),
            d = [b[c].substring(0, d), b[c].substring(d + 1)];
        a[d[0]] = decodeURIComponent(d[1])
    }
    return a
};
SoundManager = function(a) {
    this.game = a;
    try {
        this.soundPlaying = !RUNNING_ON_WP, this.musicPlaying = !RUNNING_ON_WP, localStorage.getItem(GameData.ProfileName + "-sounds") && (this.soundPlaying = !RUNNING_ON_WP && !0 === JSON.parse(localStorage.getItem(GameData.ProfileName + "-sounds"))), localStorage.getItem(GameData.ProfileName + "-music") && (this.musicPlaying = !RUNNING_ON_WP && !0 === JSON.parse(localStorage.getItem(GameData.ProfileName + "-music")))
    } catch (b) {
        this.soundPlaying = !RUNNING_ON_WP, this.musicPlaying = !RUNNING_ON_WP
    }
    GameData.BuildDebug &&
        (this.soundPlaying = this.musicPlaying = !1);
    this.music = [];
    this.sounds = [];
    this.actualMusic = null
};
SoundManager.prototype = {
    constructor: SoundManager,
    create: function() {
        this.addMusic("menu", .3, !0);
        this.addSound("click", .5);
        this.addSound("claim", .5);
        this.addSound("flagChange", .5);
        this.addSound("gameFinish", .5);
        this.addSound("start", .5);
        this.addSound("win", .5);
        this.addSound("move1", .5);
        this.addSound("move2", .5);
        this.addSound("move3", .5)
    },
    addMusic: function(a, b, c) {
        void 0 === c && (c = !1);
        this.music[a] = game.add.audio(a, b, c)
    },
    addSound: function(a, b, c) {
        void 0 === c && (c = !1);
        this.sounds[a] = game.add.audio(a, b, c)
    },
    playMusic: function(a, b) {
        void 0 === b && (b = !1);
        if (a !== this.actualMusic || b) this.actualMusic = a;
        if (this.musicPlaying)
            for (var c in this.music) "contains" !== c && (c === this.actualMusic ? this.music[c].play() : this.music[c].stop())
    },
    playSound: function(a) {
        if (this.soundPlaying) try {
            this.sounds[a].play()
        } catch (b) {
            console.error(b), LOG("Failed to play sound : " + a)
        }
    },
    pauseMusic: function() {
        if (this.musicPlaying)
            for (var a in this.music) "contains" !== a && a === this.actualMusic && this.music[a].pause()
    },
    resumeMusic: function() {
        if (this.musicPlaying)
            for (var a in this.music) "contains" !==
                a && a === this.actualMusic && this.music[a].resume()
    },
    stopMusic: function() {
        for (var a in this.music) "contains" !== a && this.music[a].stop()
    },
    stopSound: function() {
        for (var a in this.sounds) "contains" !== a && this.sounds[a].stop()
    },
    toggleMusic: function(a) {
        this.musicPlaying ? (this.musicPlaying = !1, this.stopMusic()) : (this.musicPlaying = !0, this.playMusic(a));
        try {
            localStorage.setItem(GameData.ProfileName + "-music", this.musicPlaying)
        } catch (b) {}
    },
    toggleSounds: function() {
        if (this.soundPlaying) {
            this.musicPlaying = this.soundPlaying = !1;
            for (var a in this.sounds) "contains" !== a && this.sounds[a].stop()
        } else this.musicPlaying = this.soundPlaying = !0;
        try {
            localStorage.setItem(GameData.ProfileName + "-sounds", this.soundPlaying)
        } catch (b) {}
    }
};
var ANIMATION_CUBIC_IO = Phaser.Easing.Cubic.InOut;
countOfAvatars = 14;
ACTIONS = {
    PAUSE: 0,
    INSTR: 1,
    GAMEOVER: 2,
    START: 3,
    GAME_TO_MENU: 4,
    LOST_PROGRESS_FROM_GAME: 5,
    UNPAUSE: 6,
    RESTART_MODE: 7,
    WIN: 8,
    LOSE: 9,
    SPIDERETTE_DLG_ACTIVE: 10,
    SPIDERETTE_DLG_DISABLE: 11,
    ARE_YOU_SURE: 12,
    QUIT_APP: 13
};
var tmp_sprites = [];

function radToDeg(a) {
    return 180 / Math.PI * (a || 0)
}

function degToRad(a) {
    return Math.PI / 180 * (a || 0)
}

function angleBetween(a, b, c, d, e) {
    a = a || 0;
    b = b || 0;
    c = c || 0;
    d = d || 0;
    "undefined" === typeof e && (e = !1);
    return e ? radToDeg(Math.atan2(d - b, c - a)) : Math.atan2(d - b, c - a)
}

function getRestrictedValueInRange(a, b, c) {
    return Math.min(b, Math.max(a, c))
}

function getRandomUInt(a) {
    return Math.floor(Math.random() * a)
}

function getRandomInt(a) {
    return Math.floor(Math.random() * a) * (50 < getRandomUInt(100) ? -1 : 1)
}

function getRandomUIntInRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function getRandomIntInRange(a, b) {
    return getRandomUIntInRange(a, b) * (50 < getRandomUInt(100)) ? -1 : 1
}
String.prototype.replaceAll = function(a, b) {
    return this.split(a).join(b)
};

function cloneObject(a) {
    if (null == a || "object" !== typeof a) return a;
    var b = a.constructor(),
        c;
    for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
    return b
}

function isUpperCase(a) {
    return a === a.toUpperCase()
}

function isLowerCase(a) {
    return a === a.toLowerCase()
}

function LOG(a) {}
Array.prototype.contains = function(a) {
    for (var b = this.length; b--;)
        if (this[b] === a) return !0;
    return !1
};

function shuffleArray(a) {
    for (var b = a.length, c, d; 0 !== b;) d = Math.floor(Math.random() * b), --b, c = a[b], a[b] = a[d], a[d] = c;
    return a
}

function arrayContainsInt(a, b) {
    return -1 !== a.indexOf(b)
}

function addIntsToArray(a, b) {
    for (var c = 0; c < b.length; c++) addUniqueIntToArray(a, b[c])
}

function addUniqueIntToArray(a, b) {
    arrayContainsInt(a, b) || a.push(b)
}

function removeIntFromArray(a, b) {
    for (var c = 0; c < a.length; c++) a[c] === b && a.splice(c, 1)
}

function isNumeric(a) {
    return !isNaN(parseFloat(a)) && isFinite(a)
}

function getCorrectAnchorX(a, b) {
    return Math.round(a.width * b) / a.width
}

function getCorrectAnchorY(a, b) {
    return Math.round(a.height * b) / a.height
}

function getAndroidVersion(a) {
    a = (a || navigator.userAgent).toLowerCase();
    return (a = a.match(/android\s([0-9.]*)/)) ? a[1] : !1
}

function updateTextToHeight(a, b, c, d) {
    for (a.style.font = b + 'px "' + c + '"'; a.height > d;) b--, c = a.style, c.font = b + "px gameFont", a.setStyle(c)
}

function updateTextToWidth(a, b, c, d) {
    for (a.style.font = b + 'px "' + c + '"'; a.width > d;) {
        b--;
        var e = a.style;
        e.font = b + 'px "' + c + '"';
        a.setStyle(e)
    }
}

function createBoardSpr(a, b, c, d, e, f, g, h, k, l) {
    void 0 === g && (g = 0);
    void 0 === h && (h = 0);
    void 0 === k && (k = c);
    void 0 === l && (l = d);
    tmp_sprites.contains(e) || (tmp_sprites[e] = game.make.sprite(-1E4, -1E4, e));
    var n, m;
    n = getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0).width;
    m = getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0).height;
    c = Math.floor(c / n + .5) * n;
    d = Math.floor(d / m + .5) * m;
    var q = game.make.bitmapData(c, d);
    q.smoothed = !1;
    var t = c / n - 2,
        u = d / m - 2;
    c = 0 + c;
    var p = 0,
        r = 0;
    q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0), 0, 0);
    for (p = 0; p <
        t; p++) q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 1), 0 + n * (p + 1), 0);
    q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 2), c - n, 0);
    for (r = 0; r < u; r++)
        for (q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 3), 0, 0 + m * (r + 1)), q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 5), c - n, 0 + m * (r + 1)), p = 0; p < t; p++) q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 4), 0 + n * (p + 1), 0 + m * (r + 1));
    q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 6), 0, 0 + d - m);
    for (p = 0; p < t; p++) q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 7),
        0 + n * (p + 1), 0 + d - m);
    q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 8), c - n, 0 + d - m);
    f = makeSprite(0, 0, "void");
    d = game.rnd.uuid();
    q.generateTexture(d, function(a) {
        LOG("bmpData.generateTexture");
        this.sprite.loadTexture(a);
        this.sprite.scale.set(1);
        this.sprite.width = this.scaledW;
        this.sprite.height = this.scaledH;
        this.sprite.anchor.setTo(this.anchorX, this.anchorY)
    }, {
        sprite: f,
        anchorX: g,
        anchorY: h,
        scaledW: k,
        scaledH: l
    });
    f.x = a;
    f.y = b;
    q.destroy();
    q = null;
    return f
}

function createDialogSpr(a, b, c, d, e, f, g, h, k, l) {
    var n, m;
    void 0 === g && (g = 0);
    void 0 === h && (h = 0);
    void 0 === k && (k = c);
    void 0 === l && (l = d);
    tmp_sprites.contains(e) || (tmp_sprites[e] = game.make.sprite(-1E4, -1E4, e));
    n = getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0).width;
    m = getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0).height;
    c = game.make.bitmapData(c, d);
    c.smoothed = !1;
    c.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0), 0, 0);
    c.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 1), 0, 0 + m, n, d - 2 * m);
    c.draw(getSpriteFrameWithinAtlas(tmp_sprites[e],
        f, 2), 0, 0 + d - m);
    f = makeSprite(0, 0, "void");
    d = game.rnd.uuid();
    c.generateTexture(d, function(a) {
        LOG("bmpData.generateTexture");
        this.sprite.loadTexture(a);
        this.sprite.width = this.scaledW;
        this.sprite.height = this.scaledH;
        this.sprite.anchor.setTo(this.anchorX, this.anchorY)
    }, {
        sprite: f,
        anchorX: g,
        anchorY: h,
        scaledW: k,
        scaledH: l
    });
    f.x = a;
    f.y = b;
    c.destroy();
    c = null;
    return f
}

function createButtonSpr(a, b, c, d, e, f, g, h, k) {
    void 0 === f && (f = 0);
    void 0 === g && (g = 0);
    void 0 === h && (h = 1);
    void 0 === k && (k = 1);
    tmp_sprites.contains(d) || (tmp_sprites[d] = game.make.sprite(-1E4, -1E4, d));
    _width = c;
    var l, n;
    l = game.cache.getFrameByName(d, e + "_0.png").width;
    n = game.cache.getFrameByName(d, e + "_0.png").height;
    var m = game.make.bitmapData(c, n);
    m.smoothed = !1;
    var q = c / l - 2,
        t = 0 + c,
        u = 0;
    m.draw(getSpriteFrameWithinAtlas(tmp_sprites[d], e, 0), 0, 0);
    for (u = 0; u < q; u++) m.draw(getSpriteFrameWithinAtlas(tmp_sprites[d], e, 1), 0 + l *
        (u + 1), 0);
    m.draw(getSpriteFrameWithinAtlas(tmp_sprites[d], e, 2), t - l, 0);
    e = makeSprite(0, 0, "void");
    d = game.rnd.uuid();
    m.generateTexture(d, function(a) {
        this.sprite.loadTexture(a);
        this.sprite.anchor.setTo(this.anchorX, this.anchorY);
        this.sprite.scale.setTo(this.scaleX, this.scaleY)
    }, {
        sprite: e,
        anchorX: f,
        anchorY: g,
        scaleX: h,
        scaleY: k
    });
    e.x = a;
    e.y = b;
    e.width = c * h;
    e.height = n * k;
    m.destroy();
    m = null;
    return e
}

function getSpriteFrame(a, b) {
    a.frame = b;
    return a
}

function getSpriteFrameWithinAtlas(a, b, c) {
    a.frameName = b + "_" + c;
    return a
}

function makeSprite(a, b, c, d) {
    return c = game.make.sprite(a, b, c, d || 0)
}

function addSprite(a, b, c, d) {
    return c = game.add.sprite(a, b, c, d || 0)
}

function leadingZero(a, b) {
    for (var c = "" + a; c.length < b;) c = "0" + c;
    return c
}

function setPoingScaleTween(a, b, c, d) {
    var e = 0 > a.scale.x,
        f = 0 > a.scale.y;
    void 0 === b && (b = 150);
    void 0 === c && (c = 0);
    void 0 === d && (d = null);
    var g = a.scale.x;
    game.add.tween(a.scale).to({
        x: g * (e ? -1 : 1),
        y: g * (f ? -1 : 1)
    }, b, Phaser.Easing.Quadratic.Out, !0, c, 0).onStart.add(function() {
        null != this.callbackOnStart && this.callbackOnStart();
        this.obj.scale.setTo(1.3 * g * (e ? -1 : 1), 1.3 * g * (f ? -1 : 1))
    }, {
        obj: a,
        callbackOnStart: d
    })
}

function setTextColor(a, b) {
    a.tint = b
}

function wiggle(a, b, c) {
    c = a * (2 * Math.PI * c + Math.PI / 2);
    return Math.sin(a * Math.PI * 2 * b) * Math.cos(c)
}

function moveSpriteBezier(a, b, c, d, e, f) {
    tmpLine.start.x = a.world.x;
    tmpLine.start.y = a.world.y;
    tmpLine.end.x = b;
    tmpLine.end.y = c;
    var g = tmpLine.coordinatesOnLine(Math.floor(tmpLine.length / 5 + .5));
    LOG("coords.lenght = " + g.length);
    5 > g.length && (g[4] = [], g[4][0] = g[3][0], g[4][1] = g[3][1]);
    tmpLineNormal1.fromAngle(g[1][0], g[1][1], tmpLine.normalAngle, 1 * (Math.floor(tmpLine.length / 4) + getRandomInt(10)));
    tmpLineNormal2.fromAngle(g[4][0], g[4][1], tmpLine.normalAngle, 1 * (Math.floor(tmpLine.length / 8) + getRandomInt(20)));
    tmpCircle1.x =
        tmpLineNormal1.end.x;
    tmpCircle1.y = tmpLineNormal1.end.y;
    tmpCircle2.x = tmpLineNormal2.end.x;
    tmpCircle2.y = tmpLineNormal2.end.y;
    g = [];
    g[0] = {
        x: a.world.x,
        y: a.world.y
    };
    g[1] = {
        x: tmpLineNormal1.end.x,
        y: tmpLineNormal1.end.y
    };
    g[2] = {
        x: tmpLineNormal2.end.x,
        y: tmpLineNormal2.end.y
    };
    g[3] = {
        x: b,
        y: c
    };
    tween = game.add.tween(a.position).to({
        x: [g[0].x, g[1].x, g[2].x, g[3].x],
        y: [g[0].y, g[1].y, g[2].y, g[3].y]
    }, d, Phaser.Easing.Linear.Out, !0, 0, 0).interpolation(function(a, b) {
        return Phaser.Math.bezierInterpolation(a, b)
    });
    null != e && tween.onComplete.add(e,
        f)
}

function createIngameText(a, b, c, d, e, f) {
    f = f || "#000000";
    a = new Phaser.Text(game, a, b, c, {
        fill: e || "#FFFFFF",
        font: (d || "25") + "px gameFont"
    });
    a.anchor.x = getCorrectAnchorX(a, .5);
    a.anchor.y = getCorrectAnchorY(a, .5);
    a.shadowOffsetX = 3;
    a.shadowOffsetY = 3;
    a.shadowColor = f;
    return a
}

function createResultText(a, b, c, d) {
    a = new Phaser.Text(game, a, b, c, {
        fill: "#ffffff",
        font: (d || "25") + "px gameFont"
    });
    a.anchor.x = getCorrectAnchorX(a, .5);
    a.anchor.y = getCorrectAnchorY(a, .5);
    a.shadowOffsetX = 2;
    a.shadowOffsetY = 2;
    a.shadowColor = "#5b2121";
    a.shadowFill = "#5b2121";
    return a
}

function createInstructionsText(a, b, c, d) {
    a = new Phaser.Text(game, a, b, c, {
        fill: "#FFFFFF",
        font: "24px gameFont",
        wordWrap: !0,
        wordWrapWidth: d,
        align: "center"
    });
    a.anchor.x = getCorrectAnchorX(a, .5);
    a.anchor.y = getCorrectAnchorY(a, .5);
    a.shadowOffsetX = 2;
    a.shadowOffsetY = 2;
    a.shadowColor = "#555555";
    a.shadowFill = "#555555";
    return a
}

function tweenTint(a, b, c, d) {
    var e = {
        step: 0
    };
    d = game.add.tween(e).to({
        step: 100
    }, d);
    d.onUpdateCallback(function() {
        a.tint = Phaser.Color.interpolateColor(b, c, 100, e.step)
    });
    a.tint = b;
    d.start()
}

function tweenBackgroundColor(a, b, c, d, e, f) {
    var g = {
        step: 0
    };
    f = game.add.tween(g).to({
        step: 10
    }, f);
    f.onUpdateCallback(function() {
        a.backgroundColor = Phaser.Color.interpolateColorWithRGB(b, c, d, e, 10, g.step)
    });
    a.backgroundColor = b;
    f.start()
}

function updateScaleByHeight(a, b) {
    for (; a.height > b;) a.scale.setTo(a.scale.y - .01), a.width = Math.floor(a.width), a.height = Math.floor(a.height)
}

function updateScaleByWidth(a, b) {
    for (a.scale.set(1); a.width > b;) a.scale.setTo(a.scale.x - .01), a.width = Math.floor(a.width), a.height = Math.floor(a.height)
}

function updateScaleByMaxWidth(a, b) {
    for (; a.width < b;) a.scale.x += .1, a.scale.y += .1;
    for (; a.width > b;) a.scale.x -= .01, a.scale.y -= .01;
    a.scale.x = Math.floor(100 * a.scale.x) / 100;
    a.scale.y = Math.floor(100 * a.scale.y) / 100;
    a.width = Math.floor(a.width);
    a.height = Math.floor(a.height)
}

function updateScaleByMaxWidthOnly(a, b) {
    for (; a.width < b;) a.scale.x += .1;
    for (; a.width > b;) a.scale.x -= .01;
    a.scale.x = Math.floor(100 * a.scale.x) / 100;
    a.width = Math.floor(a.width)
}

function updateScaleByMaxHeight(a, b) {
    for (; a.height < b;) a.scale.x += .1, a.scale.y += .1;
    for (; a.height > b;) a.scale.x -= .01, a.scale.y -= .01;
    a.scale.x = Math.floor(100 * a.scale.x) / 100;
    a.scale.y = Math.floor(100 * a.scale.y) / 100;
    a.width = Math.floor(a.width);
    a.height = Math.floor(a.height)
}

function updateScaleByMaxHeightWithWordWrap(a, b) {
    for (var c = a.wordWrapWidth; a.height < b || a.width < c;) a.scale.x += .1, a.scale.y += .1;
    for (; a.height > b || a.width > c;) a.scale.x -= .01, a.scale.y -= .01
}

function formatOnTwoDecimals(a) {
    return 10 > a ? "0" + a : a
}

function formatTimer(a) {
    var b = parseInt(a) % 60;
    a = parseInt(a / 60) % 60;
    return formatOnTwoDecimals(a) + " : " + formatOnTwoDecimals(b)
}

function exitApp() {
    navigator.app.exitApp()
}

function createBtn(a, b, c, d, e) {
    a = d ? game.add.sprite(a, b, c, d) : game.add.sprite(a, b, c);
    a.inputEnabled = !0;
    a.anchor.set(.5);
    a.isClickable = !0;
    a.events.onInputUp.add(function(a) {
        e();
        a.tint = 16777215
    }, this);
    a.events.onInputOver.add(function(a) {
        a.tint = 10066329
    }, this);
    a.events.onInputOut.add(function(a) {
        a.tint = 16777215
    }, this);
    return a
}

function createTextBtn(a, b, c, d, e, f, g, h) {
    b = e ? createBtn(b, c, d, e, g) : createBtn(b, c, d, null, g);
    f = createText(game, 0, 0, f, h, "#FFFFFF", .98 * b.width);
    f.anchor.setTo(.5);
    b.addChild(f);
    a && (a.type === Phaser.GROUP && a.add(b), a.type === Phaser.SPRITE && a.addChild(b));
    return b
}

function drawBitmap(a, b, c, d, e) {
    c = game.make.image(0, 0, c, d);
    e.draw(c, a, b)
}

function createDialog3x3(a, b, c, d, e, f, g) {
    var h = game.cache.getFrameByName(b, c + 0).width,
        k = game.cache.getFrameByName(b, c + 0).height;
    d = Math.floor(d / h);
    e = Math.floor(e / k);
    var l = game.make.bitmapData(d * h, e * k);
    drawBitmap(0, 0, b, c + 0, l);
    drawBitmap((d - 1) * h, 0, b, c + 2, l);
    drawBitmap(0, (e - 1) * k, b, c + 6, l);
    drawBitmap((d - 1) * h, (e - 1) * k, b, c + 8, l);
    for (var n = 1; n < d - 1; n++) drawBitmap(h * n, 0, b, c + 1, l), drawBitmap(h * n, (e - 1) * k, b, c + 7, l);
    for (var m = 1; m < e - 1; m++) drawBitmap(0, k * m, b, c + 3, l), drawBitmap((d - 1) * h, k * m, b, c + 5, l);
    for (n = 1; n < d - 1; n++)
        for (m =
            1; m < e - 1; m++) drawBitmap(h * n, k * m, b, c + 4, l);
    l.generateTexture(a, function(a) {
        f.call(g)
    });
    l.destroy()
}

function disableButton(a) {
    a.tint = 10066329;
    a.inputEnabled = !1
}

function enableButton(a) {
    a.tint = 16777215;
    a.inputEnabled = !0
}

function createBtnOnUp(a, b, c) {
    a.inputEnabled = !0;
    a.events.onInputUp.add(function(a) {
        c ? b(c) : b();
        a.tint = 16777215
    }, this);
    a.events.onInputOver.add(function(a) {
        a.tint = 10066329
    }, this);
    a.events.onInputOut.add(function(a) {
        a.tint = 16777215
    }, this)
}

function createBtnOnDown(a, b, c) {
    a.inputEnabled = !0;
    a.events.onInputDown.add(function(a) {
        c ? b(c) : b()
    }, this)
}

function createText(a, b, c, d, e, f, g) {
    g = g || a.width;
    return new Phaser.Text(a, b, c, d, {
        font: e + "px gameFont",
        fill: f,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: g
    })
}
var startSwipeX = -1,
    startSwipeY = -1;

function startSwipe() {
    startSwipeX = game.input.x;
    startSwipeY = game.input.y
}

function stopSwipe() {
    -1 < startSwipeX && -1 < startSwipeY && (startSwipeX = startSwipeY = -1)
}

function swipe(a, b, c, d) {
    50 < Math.abs(a - c) && (startSwipeX = game.input.x, startSwipeY = game.input.y)
}

function toggleMusic() {
    soundManager.playSound("click");
    soundManager.soundPlaying ? (soundManager.stopMusic(), soundManager.soundPlaying = !1, soundManager.musicPlaying = !1, SceneMenu.instance.music.frameName = "Asset 27", ScenePause.instance.music.frameName = "Asset 27", dataMusic = !1) : (dataMusic = !0, soundManager.soundPlaying = !0, soundManager.musicPlaying = !0, dataMusic && soundManager.playMusic("menu"), SceneMenu.instance.music.frameName = "Asset 20", ScenePause.instance.music.frameName = "Asset 20");
    GameData.Save()
}

function calcWidthSpriteWithAngle(a) {
    var b = a.height;
    a = Math.sin((90 - a.angle) * Math.PI / 180) * b / Math.sin(90 * Math.PI / 180);
    return Math.abs(a)
}

function createGroup(a, b) {
    var c = game.add.group();
    c.name = "grp_" + a;
    b && (b.type === Phaser.GROUP && b.add(c), b.type === Phaser.SPRITE && b.addChild(c));
    return c
}

function createSprite(a, b, c, d, e, f) {
    if (a) return b = game.add.sprite(b, c, d, e), b.name = "img " + d, e && (b.frameName = e), f && b.anchor.set(f), a.type === Phaser.GROUP && a.add(b), a.type === Phaser.SPRITE && a.addChild(b), b
}

function checkOverlap(a, b) {
    var c = a.getBounds(),
        d = b.getBounds();
    return Phaser.Rectangle.intersects(c, d)
}

function checkOverlapWithMouse(a, b) {
    return b.x < a.x || b.x > a.x + a.width || b.y > a.y + a.height || b.y < a.y
}

function randomRotateObject(a, b) {
    a && b && (a.angle = b)
}

function isNumber(a) {
    return /^\d+$/.test(a)
}

function createInitScroll(a, b) {
    a.scrollGrp = b;
    a.dragInfo = {
        dragTime: 1300,
        minScrollY: 0,
        maxScrollY: a.scrollGrp.bottom,
        fadeOutTween: null,
        averageDelta: 0,
        averageDeltaCount: 0,
        deltaY: 0,
        prevY: -1,
        init_y_position: -1,
        init_x_position: -1,
        dragging: !1,
        canDrag: !0,
        xDiff: 0
    };
    a.scrollGrp.overlapY = 0;
    game.input.onDown.add(function() {
        this.grpScene.visible && (this.scrollGrp.overlapY = 0, 0 < game.input.y && game.input.y < game.height && this.dragInfo.canDrag && (this.dragInfo.fadeOutTween && (this.dragInfo.fadeOutTween.stop(), this.dragInfo.fadeOutTween =
            null), this.dragInfo.averageDelta = 0, this.dragInfo.averageDeltaCount = 0, this.dragInfo.deltaY = 0, this.dragInfo.prevY = game.input.y, this.dragInfo.init_y_position = game.input.y, this.dragInfo.init_x_position = game.input.x, this.dragInfo.dragging = !1, this.dragInfo.canDrag = !1))
    }, a);
    game.input.onUp.add(function() {
        if (this.grpScene.visible) {
            this.dragInfo.touchContentMove = Math.abs(this.dragInfo.init_y_position - game.input.y);
            this.dragInfo.xDiff = Math.abs(this.dragInfo.init_x_position - game.input.x);
            if (!this.dragInfo.canDrag) {
                this.dragInfo.canDrag = !0;
                this.dragInfo.deltaY = this.dragInfo.dragging ? 0 : this.dragInfo.averageDelta / this.dragInfo.averageDeltaCount;
                if (5 < Math.abs(this.dragInfo.deltaY)) this.dragInfo.fadeOutTween.onUpdateCallback(function() {
                    this.moveScreenContent(this.dragInfo.deltaY)
                }, this);
                null == this.dragInfo.fadeOutTween && this.moveScreenContent(0)
            }
            this.scrollGrp.y >= this.dragInfo.minScrollY && game.add.tween(this.scrollGrp).to({
                y: this.dragInfo.minScrollY
            }, 150, Phaser.Easing.Exponential.Out, !0);
            this.scrollGrp.y <= this.dragInfo.maxScrollY && game.add.tween(this.scrollGrp).to({
                    y: this.dragInfo.maxScrollY
                },
                150, Phaser.Easing.Exponential.Out, !0)
        }
    }, a);
    game.input.addMoveCallback(function() {
        if (this.grpScene.visible && !this.dragInfo.canDrag) {
            !this.dragInfo.dragging && 15 < Math.abs(this.dragInfo.prevY - this.dragInfo.init_y_position) && (this.dragInfo.dragging = !0);
            var a = game.input.y - this.dragInfo.prevY;
            this.dragInfo.prevY = game.input.y;
            this.dragInfo.deltaY = a;
            this.dragInfo.averageDelta += a;
            this.dragInfo.averageDeltaCount++;
            5 < Math.abs(a) ? this.dragInfo.dragging = !0 : this.dragInfo.averageDelta /= 2;
            this.moveScreenContent(a, !0)
        }
    }, a);
    a.moveScreenContent = function(a, b) {
        if (0 != a) {
            var e = this.scrollGrp;
            SceneLevels.instance.grpScene.visible && (updateChildrenVisible(e, 1), updateLevelsVisible(SceneLevels.instance.grpLevels));
            e.y += a;
            e.y = Math.floor(e.y);
            b ? e.y <= this.dragInfo.maxScrollY && 0 > a ? (e.overlapY -= a, e.y = this.dragInfo.maxScrollY - Math.floor(e.overlapY / 10)) : e.y >= this.dragInfo.minScrollY && 0 < a ? (e.overlapY += a, e.y = Math.floor(e.overlapY / 10)) : e.overlapY = 0 : e.y <= this.dragInfo.maxScrollY && 0 > a ? (e.y = this.dragInfo.maxScrollY, this.wheelScrolled =
                0) : e.y >= this.dragInfo.minScrollY && 0 < a ? (e.y = this.dragInfo.minScrollY, this.wheelScrolled = 0) : e.overlapY = 0
        }
    }.bind(a);
    a.updateLevelsScroll = function() {
        this.scrollGrp.y <= this.dragInfo.maxScrollY ? this.scrollGrp.y = this.dragInfo.maxScrollY : this.scrollGrp.y >= this.dragInfo.minScrollY && (this.scrollGrp.y = this.dragInfo.minScrollY)
    }.bind(a)
}

function toggleFullscreen() {
    soundManager.playSound("click");
    SceneMenu.instance.fullscreen.frameName = screenfull.isFullscreen ? "Asset 17" : "Asset 26";
    ScenePause.instance.fullscreen.frameName = screenfull.isFullscreen ? "Asset 17" : "Asset 26";
    SceneLevels.instance.fullscreen.frameName = screenfull.isFullscreen ? "Asset 17" : "Asset 26";
    screenfull.toggle()
}

function animationAlpha(a, b, c, d, e) {
    e || (e = 0);
    a.visible = 1 === b;
    a.startAlpha = b;
    game.add.tween(a).to({
        alpha: c
    }, d, Phaser.Easing.Linear.None, !0, e).onComplete.add(function() {
        a.visible = 1 === c
    })
}

function animationByXPosition(a, b, c, d, e, f, g) {
    d || (d = Phaser.Timer.HALF);
    e || (e = 0);
    a.visible || (a.visible = !0);
    a.x = b;
    game.add.tween(a.position).to({
        x: c
    }, d, Phaser.Easing.Back.Out, !0, e)
}
var __fps = 60;

function _debugWriteFPS() {
    this.fpsActual = __fps;
    this.lastUpdate = Date.now();
    null == this.fpsText && (this.fpsText = game.add.text(game.width - 10, game.height / 2, "", {
        fill: "#FFFFFF"
    }), this.fpsText.anchor.x = 1, this.fpsText.fontSize = 20);
    this.fpsText.text = this.fpsActual
}

function updateChildrenVisible(a, b) {
    for (var c = 0; c < a.children.length; c++) {
        var d = a.children[c];
        d.type === Phaser.GROUP ? (b++, updateChildrenVisible(d, b)) : (d.visible = !0, d.updateTransform(), d.visible = d.worldPosition.y > -game.height && d.worldPosition.y < 1.5 * game.height)
    }
}

function updateLevelsVisible(a) {
    for (var b = [], c = 0; c < a.children.length; c++) {
        var d = a.children[c],
            e = d.visible,
            f = !0;
        d.visible = !0;
        d.updateTransform();
        f = d.worldPosition.y > .3 * -game.height && d.worldPosition.y < 1.2 * game.height;
        e && !f && (e = c < .5 * a.children.length ? d.levelInfo.idx + a.children.length : d.levelInfo.idx - a.children.length, 0 > e || e > LEVELS_COUNTER - 1 || b.push({
            changeIdx: c,
            nextIdx: e,
            levelBtn: d
        }))
    }
    for (d = 0; d < b.length; d++) e = b[d], -1 < e.changeIdx && (c = levelsDetail[e.nextIdx], e.levelBtn.levelInfo = c, e.levelBtn.position.set(c.x,
        c.y), e.levelBtn.frameName = c.frameName, e.levelBtn.inputEnabled = c.inputEnabled, e.levelBtn.children[0].text = c.number, e.levelBtn.children[0].style.fill = c.fillColor, e.levelBtn.children[0].y = c.numberPos), SceneLevels.instance.grpLevels.sort("y", Phaser.Group.SORT_DESCENDING);
    if (.3 * -game.height > SceneLevels.instance.grpLevels.children[SceneLevels.instance.grpLevels.children.length - 1].worldPosition.y || SceneLevels.instance.grpLevels.children[0].worldPosition.y > 1.2 * game.height) {
        b = [];
        c = -1;
        for (e = d = 0; e < a.children.length; e++)
            if (f =
                a.children[e], .3 * -game.height > f.worldPosition.y || f.worldPosition.y > 1.2 * game.height) b.push({
                idx: e,
                number: f.levelInfo.idx,
                nextIdx: -1
            });
            else if (0 > c) c = f.levelInfo.idx;
        else {
            if (c + 1 !== f.levelInfo.idx)
                for (var g = c + 1; g < f.levelInfo.idx && b.length > d; g++) b[d].nextIdx = g, d++, c++;
            c++
        }
        for (d = 0; d < b.length; d++) c = b[d], -1 < c.nextIdx && (e = a.children[c.idx], c = levelsDetail[c.nextIdx], e.levelInfo = c, e.position.set(c.x, c.y), e.frameName = c.frameName, e.inputEnabled = c.inputEnabled, e.children[0].text = c.number, e.children[0].style.fill =
            c.fillColor, e.children[0].y = c.numberPos);
        SceneLevels.instance.grpLevels.sort("y", Phaser.Group.SORT_DESCENDING)
    }
}

function _debug_sumSpritesGroupsTexts(a) {
    var b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = 0,
        g = function(a) {
            for (var k = 0; k < a.children.length; k++) a.getChildAt(k) instanceof Phaser.Text ? e++ : a.getChildAt(k) instanceof Phaser.Sprite ? c++ : a.getChildAt(k) instanceof Phaser.Button ? d++ : a.getChildAt(k) instanceof Phaser.Group ? b++ : f++, g(a.getChildAt(k))
        };
    void 0 == a ? g(game.world) : g(a)
}

function groupInfo(a, b, c) {
    console.log(c, b, a.name, a.children.length, a.children);
    for (var d = 0; d < a.children.length; d++) {
        var e = a.children[d];
        e.type === Phaser.GROUP && groupInfo(e, b + "/" + a.name, c++)
    }
};

function AddButtonEvents(a, b, c, d, e) {
    void 0 === e && (e = null);
    a.inputEnabled = !0;
    a.buttonPressed = !1;
    a.onInputOut = d;
    a.onInputUp = e;
    a.events.onInputDown.add(ButtonOnInputDown, {
        button: a,
        callback: b
    });
    a.events.onInputOver.add(c, {
        button: a
    });
    a.events.onInputOut.add(d, {
        button: a
    });
    null != e && a.events.onInputUp.add(e, {
        button: a
    })
}

function ButtonOnInputDown() {
    ScenesTransitions.transitionActive || (this.button.hasOwnProperty("spriteHighlighted") && (this.button.spriteHighlighted.tint = 16777215), this.button.tint = 16777215, this.callback(), this.button.onInputOut(this.button), this.button.buttonPressed = !0, this.button.buttonPressedTime = game.time.totalElapsedSeconds())
}

function ButtonOnInputDownNoCallback() {
    ScenesTransitions.transitionActive || (this.button.tint = 16777215, this.button.buttonPressed = !0, this.button.buttonPressedTime = game.time.totalElapsedSeconds())
}

function ButtonOnInputOver(a) {
    a = a || this.button;
    Phaser.Device.desktop && (void 0 === a.overFrame ? (a.hasOwnProperty("spriteHighlighted") && (a.spriteHighlighted.tint = 10066329), a.tint = 10066329) : a.frameName = a.overFrame, a.cachedTint = -1)
}

function ButtonOnInputOut(a) {
    a = a || this.button;
    Phaser.Device.desktop && (void 0 === a.outFrame ? (a.hasOwnProperty("spriteHighlighted") && (a.spriteHighlighted.tint = 16777215), a.tint = 16777215) : a.frameName = a.outFrame, a.cachedTint = -1)
};

function showDiv(a, b) {
    null == b && (b = !1);
    if (!game.device.desktop || b) document.getElementById(a).style.display = "block"
}

function hideDiv(a, b) {
    null == b && (b = !1);
    if (!game.device.desktop || b) document.getElementById(a).style.display = "none"
};
var Particles = function(a) {
    this.group = game.add.group();
    null != a && a.add(this.group);
    this.MAX_PARTICLES = Phaser.Device.desktop ? 100 : 50;
    this.init();
    Particles.instance = this
};
Particles.instance = null;
Particles.prototype = {
    constructor: Particles,
    init: function() {
        for (var a = {
                sprite: "pak1",
                frameName: "particle_1"
            }, b = 0; b < this.MAX_PARTICLES; b++) this.createParticle(0, 0, a);
        this.reset()
    },
    createParticle: function(a, b, c) {
        c.hasOwnProperty("tag") || (c.tag = "");
        c.hasOwnProperty("frame") || (c.frame = 0);
        c.hasOwnProperty("blendMode") || (c.blendMode = PIXI.blendModes.NORMAL);
        c.hasOwnProperty("life") || (c.life = 500 + getRandomInt(200));
        c.hasOwnProperty("velX") || (c.velX = 0);
        c.hasOwnProperty("velY") || (c.velY = 0);
        c.hasOwnProperty("accX") ||
            (c.accX = 0);
        c.hasOwnProperty("accY") || (c.accY = 0);
        c.hasOwnProperty("rotation") || (c.rotation = 0);
        c.hasOwnProperty("scale") ? (c.scale.hasOwnProperty("start") || (c.scale.start = 1), c.scale.hasOwnProperty("end") || (c.scale.end = c.scale.start)) : c.scale = {
            start: 1,
            end: 1
        };
        c.scale.delta = c.scale.start - c.scale.end;
        c.hasOwnProperty("alpha") ? (c.alpha.hasOwnProperty("start") || (c.alpha.start = 1), c.alpha.hasOwnProperty("end") || (c.alpha.end = c.alpha.start)) : c.alpha = {
            start: 1,
            end: 1
        };
        c.alpha.delta = c.alpha.start - c.alpha.end;
        var d =
            this.group.getFirstDead(this.group.children.length < this.MAX_PARTICLES, -1E3, -1E3, c.sprite, c.frame);
        if (null == d) return null;
        d.anchor.set(.5);
        c.hasOwnProperty("frameName") && (d.frameName = c.frameName);
        game.world.bringToTop(d);
        d.visible = !0;
        d.alpha = c.alpha.start;
        d.angle = 0;
        d.x = a;
        d.y = b;
        d.scale.set(1);
        d.tint = 16777215;
        d.blendMode = c.blendMode;
        d.data = c;
        d.data.lifeInit = c.life;
        return d
    },
    reset: function() {
        this.group.killAll()
    },
    getActiveCount: function(a) {
        return null != a ? this.group.getAll("tag", a).length : this.group.countLiving()
    },
    update: function() {
        this.group.forEachAlive(function(a) {
            var b = game.time.elapsedMS / game.time.physicsElapsedMS;
            a.data.life -= game.time.elapsedMS;
            0 >= a.data.life ? a.kill() : (a.alpha = a.data.alpha.start - a.data.alpha.delta + a.data.life / a.data.lifeInit * a.data.alpha.delta, a.scale.set(a.data.scale.start - a.data.scale.delta + a.data.life / a.data.lifeInit * a.data.scale.delta), a.angle += a.data.rotation * b, a.x += a.data.velX * b, a.y += a.data.velY * b, a.data.velX += a.data.accX * b, a.data.velY += a.data.accY * b)
        }, this)
    },
    destroy: function() {
        this.group.destroy();
        this.group = null
    },
    createParts: function(a, b, c, d, e, f) {
        e || (e = 10);
        f || (f = 2E3);
        var g = {
            start: .4,
            end: .7
        };
        actualSize === SMALL_PIECE && (g = {
            start: .2,
            end: .4
        }, f = 750);
        for (var h = 0; h < e; h++) {
            var k = {
                velX: .2 * Math.random() * (50 < getRandomUInt(100) ? -1 : 1),
                velY: .2 * Math.random() * (50 < getRandomUInt(100) ? -1 : 1),
                scale: g,
                alpha: {
                    start: 1,
                    end: .7
                },
                life: f,
                frameName: "particle_" + (getRandomUInt(3) + 1)
            };
            this.createParticle(a + getRandomInt(c), b + getRandomInt(d), k)
        }
    }
};
TextParticles = function() {
    this.MAX_PARTICLES = 3;
    this.objTextParticles = [];
    this._init();
    TextParticles.instance = this
};
TextParticles.instance = null;
TextParticles.prototype = {
    constructor: TextParticles,
    _init: function() {
        this.grpTextParticles = game.add.group();
        this.grpTextParticles.name = "grp TEXT PARTICLES";
        for (var a = {
                tag: "",
                velX: 0,
                velY: 0,
                accX: 0,
                accY: 0
            }, b = 0, b = 0; b < this.MAX_PARTICLES; b++) this.CreateTextParticle(0, 0, "DUMMY", a);
        for (b = 0; b < this.MAX_PARTICLES; b++) this.objTextParticles[b].sprite.visible = !1
    },
    CreateTextParticle: function(a, b, c, d) {
        d.hasOwnProperty("tag") || (d.tag = "");
        d.hasOwnProperty("style") || (d.style = {});
        d.hasOwnProperty("blendMode") || (d.blendMode =
            PIXI.blendModes.NORMAL);
        d.hasOwnProperty("life") || (d.life = 500 + getRandomUInt(200));
        d.hasOwnProperty("velX") || (d.velX = 0);
        d.hasOwnProperty("velY") || (d.velY = 0);
        d.hasOwnProperty("accX") || (d.accX = 0);
        d.hasOwnProperty("accY") || (d.accY = 0);
        d.hasOwnProperty("rotation") || (d.rotation = 0);
        d.hasOwnProperty("scale") ? (d.scale.hasOwnProperty("start") || (d.scale.start = 1), d.scale.hasOwnProperty("end") || (d.scale.end = d.scale.start)) : d.scale = {
            start: 1,
            end: 1
        };
        d.scale.delta = d.scale.start - d.scale.end;
        d.hasOwnProperty("alpha") ?
            (d.alpha.hasOwnProperty("start") || (d.alpha.start = 1), d.alpha.hasOwnProperty("end") || (d.alpha.end = d.alpha.start)) : d.alpha = {
                start: 1,
                end: 1
            };
        d.alpha.delta = d.alpha.start - d.alpha.end;
        for (var e = null, f = 0; f < this.objTextParticles.length && null == e; f++) this.objTextParticles[f].sprite.visible || (e = this.objTextParticles[f], e.sprite.text = c, e.sprite.setStyle(d.style));
        null === e && (e = this.objTextParticles[this.objTextParticles.length] = {}, e.sprite = new Phaser.Text(game, -100, -100, c, d.style), this.grpTextParticles.add(e.sprite),
            e.sprite.anchor.set(.5));
        game.world.bringToTop(e.sprite);
        e.sprite.visible = !0;
        e.sprite.alpha = d.alpha.start;
        e.sprite.angle = 0;
        e.sprite.x = a;
        e.sprite.y = b;
        e.sprite.scale.set(1);
        e.sprite.tint = 16777215;
        e.sprite.blendMode = d.blendMode;
        e.data = d;
        e.data.lifeInit = d.life;
        0 < d.tag.length && LOG("TILES : " + Particles.instance.GetActiveCount(d.tag));
        return e
    },
    Reset: function() {
        for (var a = 0; a < this.objTextParticles.length; a++) this.objTextParticles[a].sprite.visible = !1
    },
    GetActiveCount: function(a) {
        a = a || null;
        for (var b = 0, c = 0; c <
            this.objTextParticles.length; c++)(null == a || this.objTextParticles[c].data.tag === a) && this.objTextParticles[c].sprite.visible && 0 < this.objTextParticles[c].data.life && b++;
        return b
    },
    Update: function() {
        for (var a = 0; a < this.objTextParticles.length; a++) this.objTextParticles[a].sprite.visible && (this.objTextParticles[a].data.life -= game.time.elapsedMS, 0 >= this.objTextParticles[a].data.life ? this.objTextParticles[a].sprite.visible = !1 : (this.objTextParticles[a].sprite.alpha = this.objTextParticles[a].data.alpha.start -
            this.objTextParticles[a].data.alpha.delta + this.objTextParticles[a].data.life / this.objTextParticles[a].data.lifeInit * this.objTextParticles[a].data.alpha.delta, this.objTextParticles[a].sprite.scale.set(this.objTextParticles[a].data.scale.start - this.objTextParticles[a].data.scale.delta + this.objTextParticles[a].data.life / this.objTextParticles[a].data.lifeInit * this.objTextParticles[a].data.scale.delta), this.objTextParticles[a].sprite.angle += this.objTextParticles[a].data.rotation, this.objTextParticles[a].sprite.x +=
            this.objTextParticles[a].data.velX, this.objTextParticles[a].sprite.y += this.objTextParticles[a].data.velY, this.objTextParticles[a].data.velX += this.objTextParticles[a].data.accX, this.objTextParticles[a].data.velY += this.objTextParticles[a].data.accY))
    },
    Destroy: function() {
        for (var a = 0; a < this.objTextParticles.length; a++) this.objTextParticles[a].sprite.Destroy(), this.objTextParticles[a].sprite = null, this.objTextParticles[a] = null;
        this.objTextParticles = null
    },
    CreateTextParticle1: function(a, b, c, d, e, f) {
        f = f || PIXI.blendModes.NORMAL;
        tmpY = game.rnd.integerInRange(-100, -50) / 50;
        this.CreateTextParticle(a, b, c, {
            velX: 0,
            velY: tmpY,
            accX: 0,
            accY: 0 >= tmpY ? .02 : -.02,
            style: {
                font: d + "px gameFont",
                fill: e,
                stroke: "#FFFFFF",
                strokeThickness: 4
            },
            blendMode: f,
            rotation: 0,
            scale: {
                start: 1.2,
                end: 1
            },
            alpha: {
                start: .9,
                end: 0
            },
            life: 1E3
        })
    }
};
Figure = function(a, b, c, d, e, f, g, h, k) {
    Phaser.Sprite.call(this, a, b, c, f, g);
    this.color = h;
    this.typeOfFigure = k;
    this.previouslyPosition = {
        x: -1,
        y: -1
    };
    this.possibleMoves = [];
    this.row = d;
    this.col = e;
    this.movesCounter = 0;
    this.wrongMoves = [];
    this.sameColorMoves = [];
    this.allMoves = [];
    this.anchor.set(.5)
};
Figure.prototype = Object.create(Phaser.Sprite.prototype);
Figure.prototype.constructor = Figure;
Figure.prototype.markFigure = function() {
    if (!(animationIsRunning || isWhiteTurn && this.color !== COLOR_WHITE || !isWhiteTurn && this.color === COLOR_WHITE))
        if (selectedFigure) selectedFigure.figure.unmarkFigure();
        else if (this.setPreviouslyPosition(this.x, this.y), game.world.bringToTop(this), this.bringToTop(), aiTurn || showPossibleMoves(this), 0 < this.allMoves.length || aiTurn) selectedFigure = {
        figure: this,
        markedTiles: []
    }, SceneGame.instance.selectedFigureGrp.add(selectedFigure.figure), markTile(this.row, this.col, !0)
};
Figure.prototype.unmarkFigure = function() {
    if (!animationIsRunning) {
        if (selectedFigure) {
            for (var a = 0; a < selectedFigure.markedTiles.length; a++) aiTurn || markTile(selectedFigure.markedTiles[a].row, selectedFigure.markedTiles[a].col, !1);
            addFigureToPlayer()
        }
        selectedFigure = null
    }
};
Figure.prototype.checkMove = function() {
    for (var a = !0, b = SceneGame.instance.board.tiles, c = 0; c < this.allMoves.length; c++) {
        var d = this.allMoves[c].row,
            e = this.allMoves[c].col,
            f = b.children[d].children[e];
        if (checkOverlap(this, f.overlap)) {
            SceneGame.instance.checkMove(this, f.row, f.col, promotionFigure) && (SceneGame.instance.placeFigure(this, d, e), this.movesCounter++, a = !1);
            break
        }
    }
    a && this.returnBack()
};
Figure.prototype.setPreviouslyPosition = function(a, b) {
    this.previouslyPosition = {
        x: a,
        y: b
    }
};
Figure.prototype.returnBack = function() {
    startAnimation();
    game.add.tween(this).to({
        x: this.previouslyPosition.x,
        y: this.previouslyPosition.y
    }, 150, Phaser.Easing.Linear.None, !0, 0).onComplete.add(function() {
        stopAnimation();
        markTile(this.row, this.col, !1)
    }.bind(this))
};
Figure.prototype.addWrongMove = function(a, b) {
    this.wrongMoves.push({
        row: a,
        col: b
    })
};
Figure.prototype.resetWrongMoves = function() {
    this.wrongMoves = []
};
Figure.prototype.resetMoves = function() {
    this.sameColorMoves = [];
    this.allMoves = []
};
Figure.prototype.resetDiagonalMoves = function() {
    for (var a = 0; a < this.allMoves.length; a++) this.allMoves[a].col !== this.col && (this.allMoves.splice(a, 1), a--)
};
Figure.prototype.resetVerticalMoves = function() {
    for (var a = 0; a < this.allMoves.length; a++) this.allMoves[a].col === this.col && (this.allMoves.splice(a, 1), a--)
};
Figure.prototype.resetHorizontalMoves = function() {
    for (var a = 0; a < this.allMoves.length; a++) this.allMoves[a].row === this.row && (this.allMoves.splice(a, 1), a--)
};
var MAX_ACHIEVEMENTS = 13,
    gameover = !1,
    isSuccessfully = !1,
    gameTime = 0,
    hintTime = 0,
    level = null,
    selectedTheme = -1,
    animationIsRunning = !1,
    castlingInfo = null,
    isWhiteTurn = !1,
    gameMoves = 0,
    alphabet = "ABCDEFGH".split(""),
    selectedFigure = null,
    chessTile = null,
    redTile = null,
    aiTurn = !1,
    aiTurnMarked = [],
    isLastMove = !1,
    promotionFigure = null,
    removeFigure = !1,
    hintInfo = null,
    isPromotion = null,
    hintIsReady = !1,
    currentLevel = 0,
    currentFlagFrameName = null,
    prefixTheme = "lon_",
    noHintsGame = !0,
    queenCheckmate = !1,
    colorGreen = 16777215,
    levelsDetail = [],
    theme = {
        berlin: 0,
        london: 1,
        new_york: 2
    };
Game = function() {};

function startGame(a) {
    game.paused = !1;
    _startGame(a);
}

function _startGame(a) {
    isSuccessfully = gameover = !1;
    gameTime = 0;
    hintTime = ONE_MINUTE;
    gamePaused = !1;
    noHintsGame = !0;
    queenCheckmate = !1;
    aiTurnMarked = [];
    updateTime();
    onGameStart();
    SceneLevels.instance.HideAnimated(0);
    SceneLevelInfo.instance.HideAnimated(0);
    SceneGame.instance.resetBoard();
    SceneGame.instance.prepareBoard(a);
    SceneGame.instance.createDotsForLevel();
    SceneGame.instance.ShowAnimated(100); - 1 < SceneLevelInfo.instance.level.moves[SceneLevelInfo.instance.level.moves.length - 1].indexOf("#") && -1 < SceneLevelInfo.instance.level.moves[SceneLevelInfo.instance.level.moves.length -
        1].indexOf("Q") && (queenCheckmate = !0);
    setTimeout(function() {
        startTimer = gameRunning = !0;
        prevHintTimeTrack = game.time.time
    }, Phaser.Timer.SECOND);
    soundManager.stopMusic("menu")
}

function endGame(a) {
    gameover = a.isGameOver;
    isSuccessfully = a.isDone;
    gameRunning = startTimer = !1;
    isSuccessfully ? (soundManager.playSound("gameFinish"), SceneLevels.instance.unlockLevel(), SceneGame.instance.showResultTxt(isLastMove ? STR("CHECKMATE") : STR("WELL_DONE")), queenCheckmate && !dataQueenGames.includes(SceneLevelInfo.instance.level.level) && (dataQueenGames.push(SceneLevelInfo.instance.level.level), GameData.Save(), dataAchievements[4] = dataAchievements[8] = dataQueenGames.length), noHintsGame && !dataNoHintGames.includes(SceneLevelInfo.instance.level.level) &&
        (dataNoHintGames.push(SceneLevelInfo.instance.level.level), GameData.Save(), dataAchievements[2] = dataAchievements[6] = dataNoHintGames.length), game.time.events.add(Phaser.Timer.SECOND, function() {
            game.input.enabled = !0;
            onGameOver(GAME_OVER_GAME);
            SceneGame.instance.HideAnimated();
            SceneResult.instance.ShowAnimated()
        })) : ScenePause.instance.HideAnimated()
}

function changeTheme(a) {
    selectedTheme = a;
    a = 0;
    var b = 16777215;
    switch (selectedTheme) {
        case theme.berlin:
            prefixTheme = "ber_";
            SceneGame.instance.board.loadTexture("board2");
            SceneGame.instance.bg.loadTexture("berlinBG");
            SceneResult.instance.bg.loadTexture("berlinBG");
            colorGreen = 14375680;
            a = 15784373;
            b = 13080949;
            break;
        case theme.london:
            prefixTheme = "lon_";
            SceneGame.instance.board.loadTexture("board4");
            SceneGame.instance.bg.loadTexture("londonBG");
            SceneResult.instance.bg.loadTexture("londonBG");
            colorGreen = 1710618;
            a = 14474460;
            b = 11250603;
            break;
        case theme.new_york:
            prefixTheme = "new_", SceneGame.instance.board.loadTexture("board6"), SceneGame.instance.bg.loadTexture("newYorkBG"), SceneResult.instance.bg.loadTexture("newYorkBG"), colorGreen = 1855208, a = 15134975, b = 8955862
    }
    SceneGame.instance.createFigures();
    ScenePromotion.instance.fillPromotionDialog();
    ScenePromotion.instance.promotionDialog.white.bg.tint = a;
    ScenePromotion.instance.promotionDialog.white.fg.tint = b;
    ScenePromotion.instance.promotionDialog.black.bg.tint = b;
    ScenePromotion.instance.promotionDialog.black.fg.tint =
        a
}

function startAnimation() {
    animationIsRunning = !0
}

function stopAnimation() {
    animationIsRunning = !1;
    game.input.enabled = !0
}

function addMoves(a, b) {
    for (var c = 0; c < a.length; c++) b.push(a[c])
}

function checkPossibleMoves(a, b) {
    switch (a.typeOfFigure) {
        case typeOfFigure.pawn:
            addMoves(getPossibleMovesPawn(a), b);
            break;
        case typeOfFigure.rook:
            addMoves(getPossibleMovesRook(a), b);
            break;
        case typeOfFigure.knight:
            addMoves(getPossibleMovesKnight(a), b);
            break;
        case typeOfFigure.bishop:
            addMoves(getPossibleMovesBishop(a), b);
            break;
        case typeOfFigure.king:
            addMoves(getPossibleMovesKing(a), b);
            break;
        case typeOfFigure.queen:
            addMoves(getPossibleMovesQueen(a), b)
    }
}

function getPossibleMovesPawn(a) {
    var b = [];
    a.color === COLOR_WHITE ? SceneGame.instance.checkTileIsFree(a.row - 1, a.col) && (b.push({
        row: a.row - 1,
        col: a.col,
        figure: a.typeOfFigure,
        color: a.color
    }), SceneGame.instance.checkTileIsFree(a.row - 2, a.col) && 6 === a.row && b.push({
        row: a.row - 2,
        col: a.col,
        figure: a.typeOfFigure,
        color: a.color
    })) : SceneGame.instance.checkTileIsFree(a.row + 1, a.col) && (b.push({
        row: a.row + 1,
        col: a.col,
        figure: a.typeOfFigure,
        color: a.color
    }), SceneGame.instance.checkTileIsFree(a.row + 2, a.col) && 1 === a.row && b.push({
        row: a.row +
            2,
        col: a.col,
        figure: a.typeOfFigure,
        color: a.color
    }));
    checkOutOfBounceFigureMoves(b);
    checkEnPassantMoves(b);
    addCrossMove(b, a);
    filterSameColorFigureMoves(b, a);
    return b
}

function getPossibleMovesRook(a) {
    var b = [];
    addHorizontalAndVerticalMoves(b, a);
    checkOutOfBounceFigureMoves(b);
    filterSameColorFigureMoves(b, a);
    return b
}

function getPossibleMovesKnight(a) {
    var b = [];
    b.push({
        row: a.row - 2,
        col: a.col - 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row - 2,
        col: a.col + 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row - 1,
        col: a.col - 2,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row - 1,
        col: a.col + 2,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row + 1,
        col: a.col - 2,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row + 1,
        col: a.col + 2,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row + 2,
        col: a.col - 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row + 2,
        col: a.col + 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    checkOutOfBounceFigureMoves(b);
    filterSameColorFigureMoves(b, a);
    return b
}

function getPossibleMovesBishop(a) {
    var b = [];
    addDiagonalMoves(b, a);
    checkOutOfBounceFigureMoves(b);
    filterSameColorFigureMoves(b, a);
    return b
}

function getPossibleMovesQueen(a) {
    var b = [];
    addHorizontalAndVerticalMoves(b, a);
    addDiagonalMoves(b, a);
    checkOutOfBounceFigureMoves(b);
    filterSameColorFigureMoves(b, a);
    return b
}

function getPossibleMovesKing(a) {
    var b = [];
    b.push({
        row: a.row - 1,
        col: a.col - 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row - 1,
        col: a.col,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row - 1,
        col: a.col + 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row,
        col: a.col - 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row,
        col: a.col + 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row + 1,
        col: a.col - 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row + 1,
        col: a.col,
        figure: a.typeOfFigure,
        color: a.color
    });
    b.push({
        row: a.row + 1,
        col: a.col + 1,
        figure: a.typeOfFigure,
        color: a.color
    });
    checkOutOfBounceFigureMoves(b);
    addCastlingFigureMoves(b, a);
    filterSameColorFigureMoves(b, a);
    return b
}

function addHorizontalAndVerticalMoves(a, b) {
    for (var c = b.row - 1; 0 <= c && (a.push({
            row: c,
            col: b.col,
            figure: b.typeOfFigure,
            color: b.color
        }), SceneGame.instance.checkTileIsFree(c, b.col)); c--);
    for (c = b.row + 1; c < ROWS && (a.push({
            row: c,
            col: b.col,
            figure: b.typeOfFigure,
            color: b.color
        }), SceneGame.instance.checkTileIsFree(c, b.col)); c++);
    for (c = b.col - 1; 0 <= c && (a.push({
            row: b.row,
            col: c,
            figure: b.typeOfFigure,
            color: b.color
        }), SceneGame.instance.checkTileIsFree(b.row, c)); c--);
    for (c = b.col + 1; c < COLS && (a.push({
            row: b.row,
            col: c,
            figure: b.typeOfFigure,
            color: b.color
        }), SceneGame.instance.checkTileIsFree(b.row, c)); c++);
}

function addDiagonalMoves(a, b) {
    for (var c = 1; c <= Math.min(b.row, b.col) && (a.push({
            row: b.row - c,
            col: b.col - c,
            figure: b.typeOfFigure,
            color: b.color
        }), SceneGame.instance.checkTileIsFree(b.row - c, b.col - c)); c++);
    for (c = 1; 0 <= b.row - c && b.col + c < COLS && (a.push({
            row: b.row - c,
            col: b.col + c,
            figure: b.typeOfFigure,
            color: b.color
        }), SceneGame.instance.checkTileIsFree(b.row - c, b.col + c)); c++);
    for (c = 1; b.row + c < ROWS && 0 <= b.col - c && (a.push({
            row: b.row + c,
            col: b.col - c,
            figure: b.typeOfFigure,
            color: b.color
        }), SceneGame.instance.checkTileIsFree(b.row +
            c, b.col - c)); c++);
    for (c = 1; c + Math.max(b.row, b.col) < ROWS && (a.push({
            row: b.row + c,
            col: b.col + c,
            figure: b.typeOfFigure,
            color: b.color
        }), SceneGame.instance.checkTileIsFree(b.row + c, b.col + c)); c++);
}

function checkEnPassantMoves(a, b) {}

function checkOutOfBounceFigureMoves(a) {
    for (var b = 0; b < a.length; b++)
        if (0 > a[b].row || 0 > a[b].col || a[b].row >= ROWS || a[b].col >= COLS) a.splice(b, 1), b--
}

function addCrossMove(a, b) {
    for (var c = b.color === COLOR_WHITE ? SceneGame.instance.blackPlayer : SceneGame.instance.whitePlayer, d = 0; d < c.children.length; d++) {
        var e = c.children[d];
        b.color === COLOR_WHITE ? e.row !== b.row - 1 || e.col !== b.col - 1 && e.col !== b.col + 1 || a.push({
            row: e.row,
            col: e.col,
            figure: b.typeOfFigure,
            color: b.color
        }) : e.row !== b.row + 1 || e.col !== b.col - 1 && e.col !== b.col + 1 || a.push({
            row: e.row,
            col: e.col,
            figure: b.typeOfFigure,
            color: b.color
        })
    }
}

function addCastlingFigureMoves(a, b) {
    var c = b.color === COLOR_WHITE ? SceneGame.instance.whitePlayer : SceneGame.instance.blackPlayer;
    if (0 === c.king.movesCounter)
        for (var d = 0; d < c.children.length; d++) {
            var e = c.children[d];
            if (e.typeOfFigure === typeOfFigure.rook && 0 === e.movesCounter) {
                for (var f = Math.min(e.col, b.col) + 1, g = Math.max(e.col, b.col), h = !0; f < g; f++)
                    if (!SceneGame.instance.checkTileIsFree(b.row, f)) {
                        h = !1;
                        break
                    }
                h && a.push({
                    row: b.row,
                    col: b.col + (0 === e.col ? -2 : 2),
                    figure: b.typeOfFigure,
                    color: b.color
                })
            }
        }
}

function filterSameColorFigureMoves(a, b) {
    for (var c = b.color === COLOR_WHITE ? SceneGame.instance.whitePlayer : SceneGame.instance.blackPlayer, d = 0; d < a.length; d++)
        for (var e = 0; e < c.children.length; e++) {
            var f = c.children[e];
            if (b !== f && b.color === f.color && f.row === a[d].row && f.col === a[d].col) {
                b.sameColorMoves.push({
                    row: a[d].row,
                    col: a[d].col,
                    figure: a[d].typeOfFigure,
                    color: a[d].color
                });
                a.splice(d, 1);
                d--;
                break
            }
        }
}

function filterChessFigureMoves(a, b) {
    for (var c = b.color === COLOR_WHITE ? SceneGame.instance.blackPlayer : SceneGame.instance.whitePlayer, d = 0; d < a.length; d++)
        for (var e = 0; e < c.children.length; e++) {
            for (var f = c.children[e], g = 0; g < f.allMoves.length; g++)
                if (!(0 > d || f.typeOfFigure === typeOfFigure.pawn && f.allMoves[g].col === f.col || f.allMoves[g].row !== a[d].row || f.allMoves[g].col !== a[d].col)) {
                    a.splice(d, 1);
                    d--;
                    break
                }
            for (var h = 0; h < f.sameColorMoves.length; h++)
                if (!(0 > d || f.typeOfFigure === typeOfFigure.pawn && f.allMoves[g].col ===
                        f.col || f.sameColorMoves[h].row !== a[d].row || f.sameColorMoves[h].col !== a[d].col)) {
                    a.splice(d, 1);
                    d--;
                    break
                }
        }
}

function getTile(a, b) {
    return SceneGame.instance.board.tiles ? SceneGame.instance.board.tiles.children[a].children[b] : null
}

function showPossibleMoves(a) {
    0 < SceneGame.instance.availableMoves.children.length && SceneGame.instance.availableMoves.removeAll();
    for (var b = 0; b < a.allMoves.length; b++)
        for (var c = a.allMoves[b].row, d = a.allMoves[b].col, e = SceneGame.instance.board.tiles.children[c].children[d], e = createSprite(SceneGame.instance.availableMoves, e.x, e.y, "figures", prefixTheme + "move", .5), f = 0; f < a.wrongMoves.length; f++) {
            var g = a.wrongMoves[f];
            if (g.row === c && g.col === d) {
                e.frameName = "wrong_move";
                break
            }
        }
}

function hidePossibleMoves() {
    0 < SceneGame.instance.availableMoves.children.length && SceneGame.instance.availableMoves.removeAll()
}

function markOpponentMove(a, b, c, d) {
    if (c) c = createSprite(SceneGame.instance.grpOpponentTiles, d.x - .5 * SceneGame.instance.board.width, d.y - .5 * SceneGame.instance.board.height, "pak", "square_68x68", .5), c.tint = colorGreen, c.alpha = .5, c.row = a, c.col = b;
    else
        for (d = 0; d < SceneGame.instance.grpOpponentTiles.children.length; d++)
            if (c = SceneGame.instance.grpOpponentTiles.children[d], c.row === a && c.col === b) {
                SceneGame.instance.grpOpponentTiles.removeChildAt(d);
                break
            }
}

function markTile(a, b, c, d) {
    var e = SceneGame.instance.board.tiles.children[a].children[b];
    if (aiTurn) markOpponentMove(a, b, c, e), aiTurnMarked.push({
        row: a,
        col: b
    });
    else if (d) markOpponentMove(a, b, c, e);
    else if (c) d = createSprite(SceneGame.instance.grpGreenTiles, e.x - .5 * SceneGame.instance.board.width, e.y - .5 * SceneGame.instance.board.height, "pak", "square_68x68", .5), d.tint = 65280, d.alpha = .5, d.row = a, d.col = b;
    else
        for (e = 0; e < SceneGame.instance.grpGreenTiles.children.length; e++)
            if (d = SceneGame.instance.grpGreenTiles.children[e],
                d.row === a && d.col === b) {
                SceneGame.instance.grpGreenTiles.removeChildAt(e);
                break
            }
    selectedFigure && c && selectedFigure.markedTiles.push({
        row: a,
        col: b
    })
}

function blickingHintTile(a, b) {
    var c;
    if (0 === SceneGame.instance.grpHintBlinkTiles.children.length)
        for (var d = isWhiteTurn ? SceneGame.instance.whitePlayer : SceneGame.instance.blackPlayer, e = 0; e < d.children.length; e++) {
            var f = d.children[e];
            if (f.row === a && f.col === b) {
                c = createSprite(SceneGame.instance.grpHintBlinkTiles, f.x, f.y, "pak", "square_68x68", .5);
                c.tint = 65280;
                c.alpha = 0;
                c.row = a;
                c.col = b;
                break
            }
        } else c = SceneGame.instance.grpHintBlinkTiles.children[0], c = createSprite(SceneGame.instance.grpHintBlinkTiles, c.x - SceneGame.instance.board.width /
            COLS * (c.col - b), c.y - SceneGame.instance.board.height / ROWS * (c.row - a), "pak", "square_68x68", .5), c.tint = 65280, c.alpha = 0, c.row = a, c.col = b;
    game.add.tween(c).to({
        alpha: .5
    }, Phaser.Timer.HALF, Phaser.Easing.Linear.None, !0, 0, -1, !0)
}

function stopBlickingHintTiles() {
    if (hintInfo) {
        for (var a = 0; a < SceneGame.instance.grpHintBlinkTiles.children.length; a++) game.tweens.removeFrom(SceneGame.instance.grpHintBlinkTiles.children[a]);
        SceneGame.instance.grpHintBlinkTiles.removeAll();
        hintInfo = null
    }
}

function moveFigureAnimation(a, b, c, d, e) {
    var f = SceneGame.instance.getPosition(b, c),
        g = SceneGame.instance.getPosition(a.row, a.col),
        h = Phaser.Timer.QUARTER;
    d ? dataWrongMoves++ : dataCorrectMoves++;
    GameData.Save();
    if (a.typeOfFigure === typeOfFigure.knight) game.add.tween(a.position).to({
        x: f.x
    }, .5 * h, Phaser.Easing.Linear.None, !0, 0), game.add.tween(a.position).to({
        y: f.y
    }, h, Phaser.Easing.Linear.None, !0, .75 * h).onComplete.add(function() {
        soundManager.playSound("move" + (getRandomUInt(3) + 1));
        if (d) {
            startAnimation();
            for (var e =
                    0; e < aiTurnMarked.length; e++) markTile(aiTurnMarked[e].row, aiTurnMarked[e].col, !1, !0);
            game.add.tween(a.position).to({
                y: g.y
            }, h, Phaser.Easing.Linear.None, !0, h);
            game.add.tween(a.position).to({
                x: g.x
            }, .5 * h, Phaser.Easing.Linear.None, !0, 2.25 * h).onComplete.add(function() {
                soundManager.playSound("move" + (getRandomUInt(3) + 1));
                a.addWrongMove(b, c);
                selectedFigure.figure.unmarkFigure();
                for (var d = 0; d < aiTurnMarked.length; d++) markTile(aiTurnMarked[d].row, aiTurnMarked[d].col, !0, !0)
            });
            redTile.position.set(a.position.x,
                a.position.y);
            redTile.alpha = 0;
            game.add.tween(redTile).to({
                alpha: .5
            }, 300, Phaser.Easing.Linear.None, !0, 0, 1, !0).onComplete.add(stopAnimation);
            game.add.tween(SceneGame.instance.movesOfPlayer.children[Math.floor(gameMoves / 2)].wrong).to({
                alpha: 1
            }, 300, Phaser.Easing.Linear.None, !0, 0, 1, !0)
        } else {
            for (e = 0; e < aiTurnMarked.length; e++) markTile(aiTurnMarked[e].row, aiTurnMarked[e].col, !1, !0);
            SceneGame.instance.placeFigure(selectedFigure.figure, b, c)
        }
    });
    else if (a.typeOfFigure === typeOfFigure.king && 2 === Math.abs(a.col -
            c)) {
        for (var k = a.color === COLOR_WHITE ? SceneGame.instance.whitePlayer : SceneGame.instance.blackPlayer, l, n, m, q = 0; q < k.children.length; q++) {
            var t = k.children[q];
            t.typeOfFigure === typeOfFigure.rook && (0 === t.col && c < a.col || 7 === t.col && c > a.col) && (l = t, n = SceneGame.instance.getPosition(l.row, t.col < a.col ? a.col - 1 : a.col + 1), m = SceneGame.instance.getPosition(l.row, l.col))
        }
        game.add.tween(l.position).to({
            x: n.x
        }, h, Phaser.Easing.Linear.None, !0, 0);
        game.add.tween(a.position).to({
            x: f.x
        }, h, Phaser.Easing.Linear.None, !0, 0).onComplete.add(function() {
            soundManager.playSound("move" +
                (getRandomUInt(3) + 1));
            if (d) {
                startAnimation();
                for (var e = 0; e < aiTurnMarked.length; e++) markTile(aiTurnMarked[e].row, aiTurnMarked[e].col, !1, !0);
                game.add.tween(l.position).to({
                    x: m.x,
                    y: m.y
                }, h, Phaser.Easing.Linear.None, !0, h);
                game.add.tween(a.position).to({
                    x: g.x,
                    y: g.y
                }, h, Phaser.Easing.Linear.None, !0, h).onComplete.add(function() {
                    soundManager.playSound("move" + (getRandomUInt(3) + 1));
                    a.addWrongMove(b, c);
                    selectedFigure.figure.unmarkFigure();
                    for (var d = 0; d < aiTurnMarked.length; d++) markTile(aiTurnMarked[d].row, aiTurnMarked[d].col, !0, !0)
                });
                redTile.position.set(a.position.x, a.position.y);
                redTile.alpha = 0;
                game.add.tween(redTile).to({
                    alpha: .5
                }, 300, Phaser.Easing.Linear.None, !0, 0, 1, !0).onComplete.add(stopAnimation);
                game.add.tween(SceneGame.instance.movesOfPlayer.children[Math.floor(gameMoves / 2)].wrong).to({
                    alpha: 1
                }, 300, Phaser.Easing.Linear.None, !0, 0, 1, !0)
            } else {
                for (e = 0; e < aiTurnMarked.length; e++) markTile(aiTurnMarked[e].row, aiTurnMarked[e].col, !1, !0);
                SceneGame.instance.placeFigure(selectedFigure.figure, b, c)
            }
        })
    } else game.add.tween(a.position).to({
        x: f.x,
        y: f.y
    }, h, Phaser.Easing.Linear.None, !0, 0).onComplete.add(function() {
        soundManager.playSound("move" + (getRandomUInt(3) + 1));
        if (e) ScenePromotion.instance.ShowAnimated(), ScenePromotion.instance.setWrongMove({
            figure: a,
            isWrongMove: d,
            prevPosition: g,
            timer: h,
            row: b,
            col: c
        });
        else if (d) {
            startAnimation();
            for (var f = 0; f < aiTurnMarked.length; f++) markTile(aiTurnMarked[f].row, aiTurnMarked[f].col, !1, !0);
            game.add.tween(a.position).to({
                x: g.x,
                y: g.y
            }, h, Phaser.Easing.Linear.None, !0, h).onComplete.add(function() {
                soundManager.playSound("move" +
                    (getRandomUInt(3) + 1));
                a.addWrongMove(b, c);
                selectedFigure.figure.unmarkFigure();
                for (var d = 0; d < aiTurnMarked.length; d++) markTile(aiTurnMarked[d].row, aiTurnMarked[d].col, !0, !0)
            });
            redTile.position.set(a.position.x, a.position.y);
            redTile.alpha = 0;
            game.add.tween(redTile).to({
                alpha: .5
            }, 300, Phaser.Easing.Linear.None, !0, 0, 1, !0).onComplete.add(stopAnimation);
            game.add.tween(SceneGame.instance.movesOfPlayer.children[Math.floor(gameMoves / 2)].wrong).to({
                alpha: 1
            }, 300, Phaser.Easing.Linear.None, !0, 0, 1, !0)
        } else {
            for (f =
                0; f < aiTurnMarked.length; f++) markTile(aiTurnMarked[f].row, aiTurnMarked[f].col, !1, !0);
            SceneGame.instance.placeFigure(selectedFigure.figure, b, c)
        }
    })
}

function checkBoard() {
    setMovesForFigures(SceneGame.instance.whitePlayer);
    setMovesForFigures(SceneGame.instance.blackPlayer);
    filterKingMovesForChess();
    filterFigureCoverChess(COLOR_BLACK);
    filterFigureCoverChess(COLOR_WHITE);
    checkChessInBoard(SceneGame.instance.board.tiles)
}

function filterKingMovesForChess() {
    filterChessFigureMoves(SceneGame.instance.blackPlayer.king.allMoves, SceneGame.instance.blackPlayer.king);
    filterChessFigureMoves(SceneGame.instance.whitePlayer.king.allMoves, SceneGame.instance.whitePlayer.king)
}

function filterFigureCoverChess(a) {
    var b = a === COLOR_WHITE ? SceneGame.instance.whitePlayer : SceneGame.instance.blackPlayer;
    a = a === COLOR_WHITE ? SceneGame.instance.blackPlayer : SceneGame.instance.whitePlayer;
    for (var c = 0; c < b.children.length; c++) {
        var d = b.children[c];
        if (d.typeOfFigure !== typeOfFigure.king)
            for (idxOpponent = 0; idxOpponent < a.children.length; idxOpponent++) {
                var e = a.children[idxOpponent],
                    f = 0,
                    g = 0,
                    h = !0;
                if (e.typeOfFigure !== typeOfFigure.knight && e.typeOfFigure !== typeOfFigure.king && e.typeOfFigure !== typeOfFigure.pawn)
                    if (b.king.row ===
                        d.row && e.row === d.row && (e.typeOfFigure === typeOfFigure.rook || e.typeOfFigure === typeOfFigure.queen))
                        if (b.king.col < d.col && d.col < e.col) {
                            for (g = b.king.col + 1; g < e.col && h; g++) g !== d.col && (getTile(b.king.row, g).isFree || (h = !1));
                            h && d.resetMoves()
                        } else {
                            if (b.king.col > d.col && d.col > e.col) {
                                for (g = b.king.col - 1; 0 < g && h; g--) g !== d.col && (getTile(b.king.row, g).isFree || (h = !1));
                                h && d.resetMoves()
                            }
                        }
                else if (b.king.col === d.col && e.col === d.col && (e.typeOfFigure === typeOfFigure.rook || e.typeOfFigure === typeOfFigure.queen))
                    if (b.king.row <
                        d.row && d.row < e.row) {
                        for (f = b.king.row + 1; f < e.row && h; f++) f !== d.row && (getTile(f, b.king.col).isFree || (h = !1));
                        h && (d.resetDiagonalMoves(), d.typeOfFigure === typeOfFigure.queen || d.typeOfFigure === typeOfFigure.rook ? d.resetHorizontalMoves() : d.typeOfFigure === typeOfFigure.knight && d.resetMoves())
                    } else {
                        if (b.king.row > d.row && d.row > e.row) {
                            for (f = b.king.row - 1; f > e.row && h; f--) f !== d.row && (getTile(f, b.king.col).isFree || (h = !1));
                            h && (d.resetDiagonalMoves(), d.typeOfFigure === typeOfFigure.queen || d.typeOfFigure === typeOfFigure.rook ?
                                d.resetHorizontalMoves() : d.typeOfFigure === typeOfFigure.knight && d.resetMoves())
                        }
                    }
                else if (Math.abs(b.king.row - d.row) === Math.abs(b.king.col - d.col) && (e.typeOfFigure === typeOfFigure.bishop || e.typeOfFigure === typeOfFigure.queen) && Math.abs(e.row - d.row) === Math.abs(e.col - d.col)) {
                    var f = 0 < b.king.row - d.row ? 1 : -1,
                        g = 0 < b.king.col - d.col ? 1 : -1,
                        k = 0 < d.col - e.col ? 1 : -1;
                    if (f === (0 < d.row - e.row ? 1 : -1) && g === k)
                        if (0 > f && 0 < g) {
                            f = b.king.row + 1;
                            for (g = b.king.col - 1; f < e.row && h; f++, g--) f !== d.row && (getTile(f, g).isFree || (h = !1));
                            h && (d.resetVerticalMoves(),
                                d.resetHorizontalMoves(), d.typeOfFigure === typeOfFigure.knight && d.resetMoves())
                        } else if (0 > f && 0 > g) {
                        f = b.king.row + 1;
                        for (g = b.king.col + 1; f < e.row && h; f++, g++) f !== d.row && (getTile(f, g).isFree || (h = !1));
                        h && (d.resetVerticalMoves(), d.resetHorizontalMoves(), d.typeOfFigure === typeOfFigure.knight && d.resetMoves())
                    } else if (0 < f && 0 < g) {
                        f = b.king.row - 1;
                        for (g = b.king.col - 1; f > e.row && h; f--, g--) f !== d.row && (getTile(f, g).isFree || (h = !1));
                        h && (d.resetVerticalMoves(), d.resetHorizontalMoves(), d.typeOfFigure === typeOfFigure.knight && d.resetMoves())
                    } else if (0 <
                        f && 0 > g) {
                        f = b.king.row - 1;
                        for (g = b.king.col + 1; f > e.row && h; f--, g++) f !== d.row && (getTile(f, g).isFree || (h = !1));
                        h && (d.resetVerticalMoves(), d.resetHorizontalMoves(), d.typeOfFigure === typeOfFigure.knight && d.resetMoves())
                    }
                }
            }
    }
}

function setMovesForFigures(a) {
    for (var b = 0; b < a.children.length; b++) {
        var c = a.children[b];
        c.allMoves = [];
        c.sameColorMoves = [];
        checkPossibleMoves(c, c.allMoves)
    }
}

function checkChessInBoard(a) {
    checkChessByPlayer(a, SceneGame.instance.whitePlayer, SceneGame.instance.blackPlayer);
    checkChessByPlayer(a, SceneGame.instance.blackPlayer, SceneGame.instance.whitePlayer)
}

function checkChessByPlayer(a, b, c) {
    a = b.king;
    for (b = 0; b < c.children.length; b++)
        for (var d = c.children[b], e = 0; e < d.allMoves.length; e++) {
            var f = d.allMoves[e];
            if (f.row === a.row && f.col === a.col) {
                chessTile.position.set(a.position.x, a.position.y);
                chessTile.scale.set(a.scale.x, a.scale.y);
                chessTile.angle = a.angle;
                chessTile.alpha = 1;
                return
            }
        }
}

function getNextMove() {
    var a = SceneLevelInfo.instance.level.moves;
    if (gameMoves >= a.length) endGame({
        isGameOver: !0,
        isDone: !0
    });
    else {
        var b = a[gameMoves].match("O(-O)?(-O)([\\+#])?|([KQRBN])?([a-h])?([1-8])?(x)?([a-h])([1-8])(=[QNRB])?(\\+)?(#)?"),
            c = null,
            d = null,
            e = null,
            f = null,
            g = null,
            h, k, l, n, m;
        n = b[2] ? b[1] ? 2 : 1 : 0;
        l = !(!b[12] && !b[3]);
        h = !!b[11];
        a = isWhiteTurn ? COLOR_WHITE : COLOR_BLACK;
        k = !!b[7];
        m = b[10] ? b[10].split("=")[1] : null;
        if (0 < n) c = typeOfFigure.king, d = isWhiteTurn ? SceneGame.instance.whitePlayer.king.row : SceneGame.instance.blackPlayer.king.row,
            e = isWhiteTurn ? SceneGame.instance.whitePlayer.king.col : SceneGame.instance.blackPlayer.king.col, 1 === n ? (f = isWhiteTurn ? SceneGame.instance.whitePlayer.king.row : SceneGame.instance.blackPlayer.king.row, g = isWhiteTurn ? SceneGame.instance.whitePlayer.king.col + 2 : SceneGame.instance.blackPlayer.king.col - 2) : (f = isWhiteTurn ? SceneGame.instance.whitePlayer.king.row : SceneGame.instance.blackPlayer.king.row, g = isWhiteTurn ? SceneGame.instance.whitePlayer.king.col - 2 : SceneGame.instance.blackPlayer.king.col + 2);
        else
            for (var g =
                    alphabet.indexOf(b[8].toUpperCase()), f = 8 - parseInt(b[9]), c = b[4] || typeOfFigure.pawn, q = a === COLOR_WHITE ? SceneGame.instance.whitePlayer : SceneGame.instance.blackPlayer, t = b[5], b = b[6], u = 0; u < q.children.length; u++) {
                var p = q.children[u];
                if (p.typeOfFigure === c)
                    for (var r = 0; r < p.allMoves.length; r++) {
                        var v = p.allMoves[r];
                        if (!b && !t) {
                            if (v.row === f && v.col === g) {
                                d = p.row;
                                e = p.col;
                                break
                            }
                        } else if (b && b.toUpperCase() === p.row && t && t.toUpperCase() === alphabet[p.col]) {
                            d = p.row;
                            e = p.col;
                            break
                        } else if (b && b == ROWS - p.row) {
                            for (r = 0; r < p.allMoves.length; r++) p.allMoves[r].row ===
                                f && (d = p.row, e = p.col);
                            break
                        } else if (t && t.toUpperCase() === alphabet[p.col]) {
                            for (r = 0; r < p.allMoves.length; r++) p.allMoves[r].col === g && (d = p.row, e = p.col);
                            break
                        }
                    }
            }
        return {
            rowStart: d,
            colStart: e,
            rowDestination: f,
            colDestination: g,
            figureType: c,
            color: a,
            isCastling: n,
            isEnPassant: null,
            promotionFigure: m,
            isChess: h,
            kickFigure: k,
            chessMate: l
        }
    }
}

function removePlayerWrongMoves(a) {
    for (var b = 0; b < a.children.length; b++) a.children[b].resetWrongMoves()
}

function addFigureToPlayer() {
    0 < SceneGame.instance.selectedFigureGrp.children.length && (isWhiteTurn ? SceneGame.instance.whitePlayer.add(SceneGame.instance.selectedFigureGrp.children[0]) : SceneGame.instance.blackPlayer.add(SceneGame.instance.selectedFigureGrp.children[0]))
};
Tile = function(a, b, c, d, e) {
    Phaser.Sprite.call(this, game, b, c, "");
    this.isFree = !0;
    this.color = COLOR_EMPTY;
    this.row = d;
    this.col = e;
    this.figure = null;
    this.overlap = createSprite(this, 0, 0, "pak", "square_68x68", .5);
    this.overlap.alpha = .2;
    createBtnOnUp(this.overlap, this.tileOnUpCallback.bind(this));
    if (0 === this.row || this.row === ROWS - 1 || 0 === this.col || this.col === COLS - 1) this.rowText = createText(game, .9 * -this.width, .9 * -this.height, 8 - this.row, 12), this.colText = createText(game, .97 * this.width, .97 * this.height, alphabet[this.col],
        12), this.colText.anchor.set(1), this.addChild(this.rowText), this.addChild(this.colText), this.rowText.alpha = 0 === e ? 1 : 0, this.colText.alpha = d === ROWS - 1 ? 1 : 0;
    this.overlap.alpha = 0;
    a.add(this)
};
Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.tileOnUpCallback = function() {
    if (selectedFigure)
        if (hidePossibleMoves(), selectedFigure.figure === this.figure) selectedFigure.figure.unmarkFigure();
        else {
            for (var a = 0; a < selectedFigure.figure.allMoves.length; a++) {
                var b = selectedFigure.figure.allMoves[a];
                if (this.row === b.row && this.col === b.col) {
                    chessTile && (chessTile.alpha = 0);
                    a = selectedFigure.figure.typeOfFigure === typeOfFigure.pawn && selectedFigure.figure.color === COLOR_WHITE && 0 === b.row || selectedFigure.figure.typeOfFigure === typeOfFigure.pawn && selectedFigure.figure.color ===
                        COLOR_BLACK && 7 === b.row;
                    SceneGame.instance.checkMove(selectedFigure.figure, this.row, this.col) ? moveFigureAnimation(selectedFigure.figure, this.row, this.col, !1, a) : moveFigureAnimation(selectedFigure.figure, this.row, this.col, !0, a);
                    game.input.enabled = !1;
                    return
                }
            }
            this.figure && this.figure.color === selectedFigure.figure.color ? (selectedFigure.figure.unmarkFigure(), this.figure.markFigure()) : selectedFigure && selectedFigure.figure.unmarkFigure()
        }
    else this.figure && this.figure.markFigure()
};
Tile.prototype.setFigure = function(a) {
    a ? (this.figure = a, this.isFree = !1, this.color = a.color) : (this.figure = null, this.isFree = !0, this.color = COLOR_EMPTY)
};
var Languages = function() {
    if (null != Languages.instance) return Languages.instance;
    Languages.instance = this;
    this.xml = this.gameTextsParsed = null;
    this.gameTextsLists = [];
    for (var a = game.cache.getText("lang_strings2"), a = JSON.parse(a).stringresources.strings.string, b, c = 0; c < a.length; c++) {
        b = a[c]["-id"];
        null == this.gameTextsLists[b] && (this.gameTextsLists[b] = []);
        for (var d = 0; d < LANGUAGES.length; d++) this.gameTextsLists[b][LANGUAGES[d]] = a[c][LANGUAGES[d]]
    }
};
LANGUAGES = "en de es fr it pt ru ar".split(" ");
Languages.instance = null;
Languages.prototype = {};

function STR(a) {
    return void 0 === Languages.instance.gameTextsLists[a] || void 0 === Languages.instance.gameTextsLists[a][Languages.instance.language] ? (LOG("STR(" + a + ") MISSING!"), "NAN") : Languages.instance.gameTextsLists[a][Languages.instance.language].replaceAll("\\n", "\n")
};
var ORIENTATION_PORTRAIT = 0,
    ORIENTATION_LANDSCAPE = 1,
    GAME_CURRENT_ORIENTATION = ORIENTATION_PORTRAIT,
    game_resolutions = {
        0: {
            xMin: 450,
            xMax: 800,
            y: 960
        },
        1: {
            xMin: 420,
            xMax: 650,
            y: 800
        }
    },
    maxGameResolution = {
        x: game_resolutions[GAME_CURRENT_ORIENTATION].xMax,
        y: game_resolutions[GAME_CURRENT_ORIENTATION].y
    },
    minGameWidth = game_resolutions[GAME_CURRENT_ORIENTATION].xMin;
var IMAGE_FOLDER = "images/";

function loadSplash(a) {
    a.load.text("lang_strings2", "texts.json");
    a.load.text("levels", "levels.json");
    a.load.text("dailylevels", "dailypuzzles.json");
    a.load.image("void", IMAGE_FOLDER + "void.png");
    a.load.image("bgSplash", IMAGE_FOLDER + "background_loading.png");
    a.load.image("logo2", IMAGE_FOLDER + "logo_2.png");
    a.load.image("name", IMAGE_FOLDER + "name.png");
    a.load.image("emptyProgress", IMAGE_FOLDER + "progress_bar_empty_small.png");
    a.load.image("fillProgress", IMAGE_FOLDER + "progress_bar_fill_small.png")
}

function loadImages(a) {
    a.load.atlas("pak", IMAGE_FOLDER + "spritesheet.png", IMAGE_FOLDER + "spritesheet.json");
    a.load.atlas("figures", IMAGE_FOLDER + "figures.png", IMAGE_FOLDER + "figures.json");
    a.load.atlas("flags", IMAGE_FOLDER + "flags.png", IMAGE_FOLDER + "flags.json");
    a.load.spritesheet("fire", IMAGE_FOLDER + "fire.png", 23, 45, 9);
    a.load.image("levelsBG_1", IMAGE_FOLDER + "background_tower_1.png");
    a.load.image("levelsBG_2", IMAGE_FOLDER + "background_tower_2.png");
    a.load.image("levelsBG_3", IMAGE_FOLDER + "background_tower_3.png");
    a.load.image("levelsBG_4", IMAGE_FOLDER + "background_tower_4.png");
    a.load.image("board1", IMAGE_FOLDER + "board_beijing.png");
    a.load.image("board2", IMAGE_FOLDER + "board_berlin.png");
    a.load.image("board3", IMAGE_FOLDER + "board_chennai.png");
    a.load.image("board4", IMAGE_FOLDER + "board_london.png");
    a.load.image("board5", IMAGE_FOLDER + "board_moscow.png");
    a.load.image("board6", IMAGE_FOLDER + "board_new_york.png");
    a.load.image("board7", IMAGE_FOLDER + "board_paris.png");
    a.load.image("newYorkBG", IMAGE_FOLDER + "BG_New_York.png");
    a.load.image("berlinBG", IMAGE_FOLDER + "BG_Berlin.png");
    a.load.image("londonBG", IMAGE_FOLDER + "BG_London.png");
    a.load.image("profileBG", IMAGE_FOLDER + "BG_Profile.png");
    a.load.image("vezaBG", IMAGE_FOLDER + "BG_veza.png");
    a.load.image("overlay", IMAGE_FOLDER + "overlay.png")
}

function loadSounds(a) {
    a.load.audio("click", ["audio/button.ogg", "audio/button.mp3"]);
    a.load.audio("claim", ["audio/claim.ogg", "audio/claim.mp3"]);
    a.load.audio("menu", ["audio/music_menu.ogg", "audio/music_menu.mp3"]);
    a.load.audio("flagChange", ["audio/flag_change.ogg", "audio/flag_change.mp3"]);
    a.load.audio("gameFinish", ["audio/game_finish.ogg", "audio/game_finish.mp3"]);
    a.load.audio("start", ["audio/level_start.ogg", "audio/level_start.mp3"]);
    a.load.audio("win", ["audio/level_win.ogg", "audio/level_win.mp3"]);
    a.load.audio("move1", ["audio/piece_1.ogg", "audio/piece_1.mp3"]);
    a.load.audio("move2", ["audio/piece_2.ogg", "audio/piece_2.mp3"]);
    a.load.audio("move3", ["audio/piece_3.ogg", "audio/piece_3.mp3"])
};
var logo, Splash = function(a) {};

function enterIncorrectOrientation() {
    if (!game.device.desktop) {
        LOG("enterIncorrectOrientation()");
        showDiv("wrongRotation");
        hideDiv("gameCanvas");
        if (null != gameState) gameState.onGamePause();
        ScenePause.instance && !ScenePause.instance.grpScene.visible && SceneGame.instance && SceneGame.instance.grpScene.visible && !gameover && (gamePaused = !0);
        soundManager && soundManager.pauseMusic()
    }
}

function leaveIncorrectOrientation() {
    if (!game.device.desktop) {
        LOG("leaveIncorrectOrientation()");
        hideDiv("wrongRotation");
        showDiv("gameCanvas");
        if (null != gameState) gameState.onGameResume();
        soundManager && soundManager.resumeMusic()
    }
}
Splash.prototype = {
    preload: function() {
        this.game.load.crossOrigin = "Anonymous";
        game.canvas.id = "gameCanvas";
        document.getElementById("gameCanvas").style.position = "fixed";
        this.game.stage.backgroundColor = 7829367;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = !0;
        game.scale.pageAlignVertically = !0;
        game.scale.refresh();
        window.addEventListener("resize", function() {
            onGameResize()
        });
        onGameResize();
        loadSplash(this.game)
    },
    create: function() {
        logo = this.add.sprite(game.world.centerX, game.world.centerY, "void");
        logo.anchor.set(.5);
        logo.alpha = 1;
        this.loadContinue()
    },
    loadContinue: function() {
        logo.inputEnabled = false;
        //logo.events.onInputDown.add(this.startPreload, this);
        this.startPreload();
    },
    hideLogo: function() {
        game.add.tween(logo).to({
            alpha: 0
        }, 3 * ScenesTransitions.TRANSITION_LENGTH, ANIMATION_CUBIC_IO, !0, 0, 0, !1)
    },
    startPreload: function() {
        game.state.start("PreloadState")
    }
};
var savedClientWidth = 0,
    savedClientHeight = 0;

function onGameResize() {
    if (null !== game && null !== game) {
        var a = document.documentElement.clientWidth,
            b = document.documentElement.clientHeight;
        RUNNING_ON_IOS && a > b && (a = window.innerWidth, b = window.innerHeight);
        GAME_CURRENT_ORIENTATION = ORIENTATION_PORTRAIT;
        resolutionY = game_resolutions[GAME_CURRENT_ORIENTATION].y;
        resolutionX = Math.floor(a / b * resolutionY);
        isNaN(resolutionX) && (resolutionX = 0);
        resolutionX < game_resolutions[GAME_CURRENT_ORIENTATION].xMin && (resolutionX = game_resolutions[GAME_CURRENT_ORIENTATION].xMin);
        resolutionX >
            game_resolutions[GAME_CURRENT_ORIENTATION].xMax && (resolutionX = game_resolutions[GAME_CURRENT_ORIENTATION].xMax);
        b > a || (GAME_CURRENT_ORIENTATION = ORIENTATION_LANDSCAPE);
        GAME_CURRENT_ORIENTATION === ORIENTATION_PORTRAIT ? leaveIncorrectOrientation() : enterIncorrectOrientation();
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = !0;
        game.scale.pageAlignVertically = !0;
        game.scale.refresh();
        game.scale.setGameSize(Math.floor(resolutionX),
            Math.floor(resolutionY));
        if (null != gameState && GAME_CURRENT_ORIENTATION === ORIENTATION_PORTRAIT) gameState.onResolutionChange();
        if (null != preloadState) preloadState.onResolutionChange();
        logo && logo.position.set(.5 * game.width, .5 * game.height)
    }
};
var Preloader = function(a) {},
    loaderPosY, preloadState;
Preloader.prototype = {
    preload: function() {
        game.input.maxPointers = 1;
        sceneLanguages = null;
        startTime = Date.now();
        game.stage.backgroundColor = 7829367;
        preloadState = this;
        loaderPosY = game.world.height / 5 * 4.5;
        grpSplash = createGroup("SPLASH");
        bg = createSprite(grpSplash, 0, 0, "bgSplash", null, .5);
        gameName = createSprite(grpSplash, 0, .25 * -game.height, "name", null, .5);
        logo2 = createSprite(grpSplash, 0, .1 * game.height, "logo2", null, .5);
        updateScaleByMaxWidth(bg, 1.1 * game.width);
        grpProgressBar = createGroup("PROGRESS BAR");
        emptyProgress = createSprite(grpProgressBar, .5 * game.width, logo2.y + .7 * logo2.height, "emptyProgress");
        emptyProgress.x -= .5 * emptyProgress.width;
        emptyProgress.y -= .5 * emptyProgress.height;
        fillProgress = createSprite(grpProgressBar, .5 * game.width, logo2.y + .7 * logo2.height, "fillProgress");
        fillProgress.x -= .5 * fillProgress.width;
        fillProgress.y -= .5 * fillProgress.height;
        fillProgress.originalWidth = fillProgress.width;
        fillProgress.width = 0;
        imgBtn = game.add.sprite(game.width / 2, game.height / 2, "void");
        imgBtn.anchor.set(.5);
        imgBtn.scale.x = game.width / 100 + .2;
        imgBtn.scale.y = game.height / 100 + .2;
        new Languages;
        percentageText = game.add.text(game.world.centerX, game.height - 20, "0 %", {
            font: "40px gameFont",
            fill: "#FFFFFF"
        });
        percentageText.anchor.set(.5);
        game.load.onFileComplete.add(this.fileComplete, this);
        loadImages(game);
        (RUNNING_ON_WP = -1 < navigator.userAgent.indexOf("Windows Phone")) || loadSounds(game);
        this.loadLanguageSettings();
        this.onResolutionChange();
        game.input.onDown.add(function() {
            game.paused && (game.paused = !1)
        })
    },
    fileComplete: function(a, b, c, d, e) {
        percentageText.text =
            a + " %";
        fillProgress.width = Math.floor(fillProgress.originalWidth / 100 * a);
        100 <= a && this._create()
    },
    _create: function() {
        imgBtn.inputEnabled = !0;
        imgBtn.events.onInputDown.add(this.inputListener, this);
        game.add.tween(percentageText).to({
            alpha: 0
        }, 1.4 * ScenesTransitions.TRANSITION_LENGTH, "Linear", !0, 3 * ScenesTransitions.TRANSITION_LENGTH, -1, !0);
        
		/*var a = Date.now() - startTime;
        2E3 > a ? game.time.events.add(2E3 - a, function() {
            this.startGame()
        }, this) : this.startGame()*/
		this.startGame();
    },
    createMenuText: function(a, b, c) {
        a = new Phaser.Text(game, a,
            b, c, {
                fill: "#FED87F"
            });
        a.anchor.x = getCorrectAnchorX(a, .5);
        a.anchor.y = getCorrectAnchorY(a, .5);
        a.shadowOffsetX = 3;
        a.shadowOffsetY = 3;
        a.shadowColor = "#660000";
        return a
    },
    loadLanguageSettings: function() {
        Languages.instance.language = "en";
        var a = navigator.userLanguage || navigator.language;
		console.log(a);
        if ("en" == a || "" === dataLang || "en" === dataLang) Languages.instance.language = "en";
        if ("fr" == a || "fr" === dataLang || "fr" === a.substring(0, 2)) Languages.instance.language = "fr";
        if ("it" == a || "it" === dataLang || "it" === a.substring(0, 2)) Languages.instance.language =
            "it";
        if ("de" == a || "de" === dataLang || "de" === a.substring(0, 2)) Languages.instance.language = "de";
        if ("es" == a || "es" === dataLang || "es" === a.substring(0, 2)) Languages.instance.language = "es";
        if ("br" == a || "br" === dataLang || "br" === a.substring(0, 2) || "pt" === a.substring(0, 2)) Languages.instance.language = "pt";
        if ("ru" == a || "ru" === dataLang || "ru" === a.substring(0, 2)) Languages.instance.language = "ru";
        if ("ar" == a || "ar" === dataLang || "ar" === a.substring(0, 2)) Languages.instance.language = "ar";
		
        dataLang = Languages.instance.language;
    },
    inputListener: function() {
        this.startGame()
    },
    startGame: function() {
        if (null == sceneLanguages) {
            imgBtn.inputEnabled = !1;
            imgBtn.events.onInputDown.dispose();
            game.world.remove(imgBtn);
            game.world.remove(grpSplash);
            game.world.remove(bg);
            game.world.remove(gameName);
            game.world.remove(logo2);
            game.world.remove(grpProgressBar);
            game.world.remove(emptyProgress);
            game.world.remove(fillProgress);
            ScenesTransitions.hideSceneAlpha(percentageText);
            try {
				console.log(Languages.instance.language);
                localStorage.setItem("pwrwl-lang", "" + Languages.instance.language)
            } catch (a) {}
            languageLoaded = !0;
            null == gameState && game.state.start("GameState")
        }
    },
    onResolutionChange: function() {
        loaderPosY =
            game.world.height / 5 * 4.5;
        grpSplash.position.set(.5 * game.width, .5 * game.height);
        imgBtn.reset(game.width >> 1, game.height >> 1);
        imgBtn.scale.x = game.width / 100 + .2;
        imgBtn.scale.y = game.height / 100 + .2;
        emptyProgress.position.set(.5 * game.width - .5 * emptyProgress.width, .85 * game.height - .5 * emptyProgress.height);
        fillProgress.position.set(emptyProgress.position.x, emptyProgress.position.y);
        percentageText.reset(.5 * game.width, emptyProgress.y + 2.25 * emptyProgress.height);
        updateScaleByMaxWidth(bg, 1.1 * game.width);
        updateScaleByMaxWidth(grpSplash.children[0],
            1.1 * game.width)
    }
};
var RUNNING_ON_IOS = !1,
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) RUNNING_ON_IOS = !0;
var GameData = function() {};
GameData.BuildTitle = "Chess Mania";
GameData.BuildString = "16.10.2021 14:44";
GameData.BuildVersion = "2.0.0";
GameData.BuildDebug = !1;
GameData.Copyright = "Gradle Games 2021";
GameData.ProfileName = "gradle";
//console.info("%c %c   " + GameData.Copyright + " | " + GameData.BuildTitle + " " + GameData.BuildVersion + " | " + GameData.BuildString + "  %c ", "background:#353AFB", "background:#000080;color:#fff", "background:#353AFB");
var partnerName = "gradlecode";
window.partnerName = partnerName;
var dataMusic = !0,
    dataLang = "",
    dataFlags = [],
    dataSelectedFlag = -1,
    dataLastLevel = 0;
GameData.Reset = function() {
    dataMusic = !0;
    dataLang = "";
    dataFlags = [0];
    dataSelectedFlag = 1;
    dataLastLevel = 0;
    dataAchievements = [];
    dataClaimedAchievements = [];
    dataCorrectMoves = dataWrongMoves = dataHintsUsed = 0;
    dataNoHintGames = [];
    dataQueenGames = [];
    for (var a = 0; a < MAX_ACHIEVEMENTS; a++) dataAchievements.push(0)
};
GameData.Load = function() {
    GameData.Reset();
    var a = null,
        a = JSON.parse(localStorage.getItem(GameData.ProfileName));
    if (null === a) this.Save(), this.Load();
    else if (dataMusic = a.dataMusic, dataLang = a.dataLang, dataFlags = a.dataFlags, dataSelectedFlag = a.dataSelectedFlag, dataLastLevel = a.dataLastLevel, dataAchievements = a.dataAchievements, dataClaimedAchievements = a.dataClaimedAchievements, dataHintsUsed = a.dataHintsUsed, dataWrongMoves = a.dataWrongMoves, dataCorrectMoves = a.dataCorrectMoves, dataNoHintGames = a.dataNoHintGames,
        dataQueenGames = a.dataQueenGames, "" === dataLang || void 0 === dataLang) dataLang = "en"
};
GameData.Save = function() {
    var a = {};
    a.dataMusic = dataMusic;
    a.dataLang = dataLang;
    a.dataFlags = dataFlags;
    a.dataSelectedFlag = dataSelectedFlag;
    a.dataLastLevel = dataLastLevel;
    a.dataAchievements = dataAchievements;
    a.dataClaimedAchievements = dataClaimedAchievements;
    a.dataHintsUsed = dataHintsUsed;
    a.dataWrongMoves = dataWrongMoves;
    a.dataCorrectMoves = dataCorrectMoves;
    a.dataNoHintGames = dataNoHintGames;
    a.dataQueenGames = dataQueenGames;
    try {
        localStorage.setItem(GameData.ProfileName, JSON.stringify(a))
    } catch (b) {}
};
GameData.ProfileResetVars = function() {};
GameData.ProfileSetVars = function() {};
GameData.ProfileGetVars = function(a) {};
MIN_LEVEL_NUMBER = 0;
MAX_LEVEL_NUMBER = 75;
var ReadLevels = function() {},
    levels = null,
    dailyLevels = null,
    pathLevels = "levels.json";
ReadLevels.Load = function() {
    try {
        var a = JSON.parse(game.cache.getText("levels")),
            b = JSON.parse(game.cache.getText("dailylevels"));
        null !== a && null !== b && (levels = a.levels, dailyLevels = b.levels, this.parseMoves(levels), this.parseMoves(dailyLevels))
    } catch (c) {
        console.error("ERROR READ LEVELS: ", c)
    }
};
ReadLevels.readLevelById = function(a) {
    return 0 <= a && a <= MAX_LEVEL_NUMBER ? levels[a] : null
};
ReadLevels.parseMoves = function(a) {
    for (var b = 0; b < a.length; b++) a[b].moves = a[b].moves.split(" ")
};
var SceneBackground = function() {
    SceneBackground.instance || (SceneBackground.instance = this);
    this.init();
    this.create()
};
SceneBackground.prototype = {
    init: function() {
        this.grpScene = null
    },
    create: function() {
        this.grpScene = createGroup("BACKGROUND CENTER");
        this.bg = createSprite(this.grpScene, 0, 0, "bgSplash", null, .5);
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    onResolutionChange: function() {
        this.bg.position.set(.5 * game.width, .5 * game.height);
        updateScaleByMaxWidth(this.bg, 1.2 * game.width)
    },
    ShowAnimated: function() {
        this.grpScene.visible = !0;
        this.grpScene.alpha = 1
    },
    HideAnimated: function() {
        ScenesTransitions.hideSceneAlpha(this.grpScene)
    }
};
var gamePaused = !1,
    startTimer = !1,
    prevTimeTrack = 0,
    prevHintTimeTrack = 0,
    ROWS = 8,
    COLS = 8,
    COLOR_BLACK = "b",
    COLOR_WHITE = "w",
    COLOR_EMPTY = " ",
    ONE_MINUTE = 6E4,
    typeOfFigure = {
        pawn: "P",
        bishop: "B",
        rook: "R",
        knight: "N",
        queen: "Q",
        king: "K",
        empty: " "
    },
    ENTER = null,
    LEFT = null,
    RIGHT = null,
    ESC = null,
    isAndroidVersion = !1,
    SceneGame = function() {
        SceneGame.instance || (SceneGame.instance = this);
        this.init();
        this.create()
    };
SceneGame.prototype = {
    init: function() {
        this.board = this.timer = this.pause = this.level = this.allGameBoard = this.grpScene = null;
        this.figuresList = [];
        this.grpOpponentTiles = this.grpGreenTiles = this.grpHintBlinkTiles = this.bg = this.chessMate = this.selectedFigureGrp = this.availableMoves = this.promotionDialog = this.blackPlayer = this.whitePlayer = this.movesOfPlayer = this.hint = this.moves = this.typeOfGameInfo = null
    },
    create: function() {
        this.grpScene = createGroup("GAME");
        this.bg = createSprite(this.grpScene, 0, 0, "newYorkBG", "", .5);
        this.createUI();
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    createUI: function() {
        this.pause = createSprite(this.grpScene, 0, 0, "pak", "button_menu");
        this.pause.anchor.set(1, 0);
        this.createInfoLevel();
        this.createBoard();
        this.createMovesIndicator();
        this.createHintBlinkTiles();
        chessTile = createSprite(this.allGameBoard, 0, 0, "figures", "king_highlight_3", .5);
        redTile = createSprite(this.allGameBoard, 0, 0, "pak", "square_68x68", .5);
        redTile.tint = 16711680;
        redTile.alpha = 0;
        this.grpGreenTiles = createGroup("GREEN TILES", this.allGameBoard);
        this.grpOpponentTiles = createGroup("OPPONENT TILES", this.allGameBoard);
        this.resetPlayers();
        this.availableMoves = createGroup("AVAILABLE MOVES", this.allGameBoard);
        this.selectedFigureGrp = createGroup("SELECTED FIGURE GROUP", this.allGameBoard);
        this.createChessMate();
        this.hint = createSprite(this.grpScene, 0, 0, "pak", "button_shop_buy", .5);
        var a = createText(game, 0, 0, STR("HINT"), 25, "#FFFFFF", .9 * this.hint.width);
        a.anchor.set(.5);
        var b = createText(game, 0, .75 * -this.hint.height, "00", 20, "#FFFFFF", .9 * this.hint.width);
        b.anchor.set(.5);
        this.hint.addChild(a);
        this.hint.addChild(b);
        createBtnOnUp(this.hint, SceneGame.instance.hintCallback);
        createBtnOnUp(this.pause, SceneGame.instance.pauseCallback);
        disableButton(this.hint)
    },
    createInfoLevel: function() {
        this.typeOfGameInfo = createSprite(this.grpScene, 0, 0, "pak", "background_turn");
        var a = createSprite(this.typeOfGameInfo, 8, .5 * this.typeOfGameInfo.height + 1, "pak", "square_68x68");
        a.anchor.set(0, .5);
        var b = createSprite(a, .375 * a.width, .3 * a.height, "figures", prefixTheme + "pawn_white",
                .5),
            c = createText(game, a.x + .7 * a.width, .5 * this.typeOfGameInfo.height + 3, "", 25, "#FFFFFF");
        a.tint = 16774118;
        a.alpha = .84;
        a.scale.set(.5);
        b.scale.set(.5);
        c.anchor.set(0, .5);
        b.alpha = 0;
        this.typeOfGameInfo.infoBGSquare = a;
        this.typeOfGameInfo.figure = b;
        this.typeOfGameInfo.infoLevel = c;
        this.typeOfGameInfo.addChild(a);
        this.typeOfGameInfo.addChild(b);
        this.typeOfGameInfo.addChild(c);
        updateScaleByWidth(this.typeOfGameInfo.infoLevel, .7 * game.width)
    },
    createMovesIndicator: function() {
        this.moves = createGroup("MOVES INDICATOR",
            this.grpScene);
        var a = createText(game, 0, 0, STR("MOVES") + ": ", 30, "#FFFFFF");
        a.anchor.set(0, .5);
        this.movesOfPlayer = createGroup("MOVES OF PLAYER", this.moves);
        this.moves.text = a;
        this.moves.addChild(a)
    },
    createHintBlinkTiles: function() {
        this.grpHintBlinkTiles = createGroup("HINT BLINK TILES", this.allGameBoard)
    },
    createDotsForLevel: function() {
        this.movesOfPlayer.removeAll();
        for (var a = 0, b = 0; a < SceneLevelInfo.instance.level.moveCounter; a++) {
            var c = createSprite(this.movesOfPlayer, b, 0, "pak", "icon_move", .5);
            c.tint = 5526095;
            c.wrong = createSprite(c, 0, 0, "pak", "icon_move", .5);
            c.wrong.tint = 14559290;
            c.wrong.alpha = 0;
            c.correct = createSprite(c, 0, 0, "pak", "icon_move", .5);
            c.correct.tint = 2204037;
            c.correct.alpha = 0;
            b += 1.5 * c.width
        }
        this.movesOfPlayer.position.x = this.moves.text.x + 1.1 * this.moves.text.width;
        this.moves.position.x = .5 * game.width - .5 * this.moves.width
    },
    hintCallback: function() {
        if (hintIsReady && (!hintInfo || !hintInfo.showEnd)) {
            soundManager.playSound("click");
            noHintsGame && (noHintsGame = !1);
            selectedFigure && (selectedFigure.figure.unmarkFigure(),
                hidePossibleMoves());
            var a = getNextMove();
            hintInfo ? hintInfo && !hintInfo.showEnd && (hintInfo.showEnd = !0, hintInfo.rowDestination = a.rowDestination, hintInfo.colDestination = a.colDestination, blickingHintTile(a.rowDestination, a.colDestination)) : (hintInfo = {
                showStart: !0,
                rowStart: a.rowStart,
                colStart: a.colStart,
                showEnd: !1,
                rowDestination: -1,
                colDestination: -1
            }, blickingHintTile(a.rowStart, a.colStart), dataHintsUsed++, GameData.Save())
        }
    },
    pauseCallback: function() {
        gameover || (soundManager.playSound("click"), ScenePause.instance.ShowAnimated(),
            gamePaused = !0)
    },
    createBoard: function() {
        this.allGameBoard = createGroup("ALL GAME BOARD", this.grpScene);
        this.board = createSprite(this.allGameBoard, .5 * game.width, .5 * game.height, "board" + (getRandomUInt(7) + 1));
        this.board.tiles = createGroup("TILES BOARD", this.board)
    },
    resetPlayers: function() {
        this.blackPlayer = createGroup("BLACK PLAYER", this.allGameBoard);
        this.whitePlayer = createGroup("WHITE PLAYER", this.allGameBoard)
    },
    createChessMate: function() {
        this.chessMate = createGroup("CHESS MATE", this.grpScene);
        var a = createSprite(this.chessMate,
                0, 0, "pak", "chessmate", .5),
            b = createText(game, 0, 5, STR("CHECKMATE"), 40, "#FFFFFF");
        b.anchor.set(.5);
        a.addChild(b);
        this.chessMate.visible = !1
    },
    showResultTxt: function(a) {
        soundManager.playSound("win");
        this.chessMate.visible = !0;
        this.chessMate.children[0].children[0].text = a
    },
    resetBoard: function() {
        isLastMove = !1;
        isPromotion = null;
        gameMoves = 0;
        for (var a = this.blackPlayer.children.length; 0 < a; a--) this.blackPlayer.children[a - 1].destroy();
        for (a = this.whitePlayer.children.length; 0 < a; a--) this.whitePlayer.children[a - 1].destroy();
        for (a = this.board.tiles.children.length; 0 < a; a--) this.board.tiles.children[a - 1].destroy();
        this.whitePlayer.removeAll();
        this.blackPlayer.removeAll();
        this.board.tiles.removeAll();
        this.availableMoves.removeAll();
        this.grpHintBlinkTiles.removeAll();
        this.grpGreenTiles.removeAll();
        this.grpOpponentTiles.removeAll();
        selectedFigure && (selectedFigure.figure.destroy(), selectedFigure = null);
        this.figuresList = [];
        aiTurn = !1;
        chessTile.alpha = 0
    },
    prepareBoard: function(a) {
        for (var b = a.board.split("/"), c = this.board.width / COLS,
                d = this.board.height / ROWS, e = 0; e < b.length; e++) {
            for (var f = [], g = createGroup("TILES ROW " + e, this.board.tiles), h = 0, k = 0; h < b[e].length; h++) {
                var l = b[e][h],
                    n = 0,
                    m = 0;
                if (isNumber(l))
                    for (var q = 0; q < l; q++) f.push(" "), n = .5 * c + c * k, m = .5 * d + d * e, new Tile(g, n, m, e, k), k++;
                else f.push(l), n = .5 * c + c * k, m = .5 * d + d * e, new Tile(g, n, m, e, k), k++
            }
            this.figuresList.push(f);
            this.board.tiles.add(g)
        }
        castlingInfo = a.castling;
        changeTheme(getRandomUInt(3));
        isWhiteTurn = a.color === COLOR_WHITE;
        this.typeOfGameInfo.figure.alpha = 1;
        this.typeOfGameInfo.figure.frameName =
            prefixTheme + (isWhiteTurn ? "pawn_white" : "pawn_black");
        this.typeOfGameInfo.infoBGSquare.tint = isWhiteTurn ? 591106 : 16774118;
        checkBoard()
    },
    createFigures: function() {
        for (var a = 0; a < this.figuresList.length; a++)
            for (var b = 0; b < this.figuresList[a].length; b++) this.createFigure(this.figuresList[a][b], a, b)
    },
    createFigure: function(a, b, c) {
        var d = null,
            e = null,
            f = null,
            g = null;
        0 < a.length && (f = a === a.toUpperCase() ? COLOR_WHITE : COLOR_BLACK);
        switch (a) {
            case "K":
            case "k":
                d = "kral";
                e = f === COLOR_WHITE ? "king_white" : "king_black";
                g = typeOfFigure.king;
                break;
            case "Q":
            case "q":
                d = "kralovna";
                e = f === COLOR_WHITE ? "queen_white" : "queen_black";
                g = typeOfFigure.queen;
                break;
            case "P":
            case "p":
                d = "pesiak";
                e = f === COLOR_WHITE ? "pawn_white" : "pawn_black";
                g = typeOfFigure.pawn;
                break;
            case "N":
            case "n":
                d = "jazdec";
                e = f === COLOR_WHITE ? "knight_white" : "knight_black";
                g = typeOfFigure.knight;
                break;
            case "B":
            case "b":
                d = "strelec";
                e = f === COLOR_WHITE ? "bishop_white" : "bishop_black";
                g = typeOfFigure.bishop;
                break;
            case "R":
            case "r":
                d = "veza", e = f === COLOR_WHITE ? "rook_white" : "rook_black", g = typeOfFigure.rook
        }
        d &&
            (a = this.getPosition(b, c), e = new Figure(game, a.x, a.y, b, c, "figures", prefixTheme + e, f, g), this.board.tiles.children[b].children[c].setFigure(e), this.addFigureToPlayer(e), e.typeOfFigure == typeOfFigure.rook && (e.color === COLOR_WHITE ? 7 !== e.row ? e.movesCounter++ : 0 === e.col && -1 < castlingInfo.indexOf("K") || 7 === e.col && -1 < castlingInfo.indexOf("Q") ? (0 === e.col && castlingInfo.indexOf("K"), 7 === e.col && castlingInfo.indexOf("Q")) : e.movesCounter++ : 0 === e.col && -1 < castlingInfo.indexOf("q") || 7 === e.col && -1 < castlingInfo.indexOf("k") ?
                (0 === e.col && castlingInfo.indexOf("q"), 7 === e.col && castlingInfo.indexOf("k")) : e.movesCounter++))
    },
    createMoves: function() {
        for (var a = 0; a < ROWS; a++)
            for (var b = createGroup(a + ". ROW AVAILABLE MOVES", this.availableMoves), c = 0; c < COLS; c++) {
                var d = getTile(a, c),
                    e = createGroup(c + ". COL AVAILABLE MOVES", b);
                e.wrong = createSprite(e, d.x, d.y, "figures", "wrong_move", .5);
                e.correct = createSprite(e, d.x, d.y, "figures", prefixTheme + "move", .5);
                e.wrong.alpha = 0;
                e.correct.alpha = 0
            }
    },
    getPosition: function(a, b) {
        var c = SceneGame.instance.board.width /
            COLS,
            d = SceneGame.instance.board.height / ROWS;
        return {
            x: SceneGame.instance.board.x + .5 * c + c * b,
            y: SceneGame.instance.board.y + .5 * d + d * a
        }
    },
    addFigureToPlayer: function(a) {
        this.board.tiles.children[a.row].children[a.col].isFree = !1;
        a.color === COLOR_WHITE ? (this.whitePlayer.addChild(a), a.typeOfFigure === typeOfFigure.king && (this.whitePlayer.king = a)) : a.color === COLOR_BLACK && (this.blackPlayer.addChild(a), a.typeOfFigure === typeOfFigure.king && (this.blackPlayer.king = a))
    },
    setInputEnableToPlayer: function(a, b) {
        for (var c = 0; c <
            b.children.length; c++) b.children[c].inputEnabled = a
    },
    checkTileIsFree: function(a, b) {
        return 0 > a || 7 < a ? null : this.board.tiles.children[a].children[b].isFree
    },
    checkMove: function(a, b, c, d) {
        d = getNextMove();
        if (!d) return !1;
        promotionFigure = d.promotionFigure;
        return d.figureType !== a.typeOfFigure || d.rowDestination !== b || d.colDestination !== c || null !== d.rowStart && d.rowStart !== a.row || null !== d.colStart && d.colStart !== a.col ? !1 : (removeFigure = d.kickFigure, isLastMove = d.chessMate, !0)
    },
    setTileIsFree: function(a, b, c) {
        this.board.tiles.children[c.row].children[c.col].setFigure();
        c.row = a;
        c.col = b;
        this.board.tiles.children[a].children[b].setFigure(c)
    },
    placeFigure: function(a, b, c) {
        stopBlickingHintTiles();
        removeFigure && !this.board.tiles.children[b].children[c].isFree && this.board.tiles.children[b].children[c].figure.destroy();
        this.setTileIsFree(b, c, a);
        a.movesCounter++;
        markTile(b, c, !0);
        if (isLastMove || gameMoves === SceneLevelInfo.instance.level.moves.length - 1) gameover = !0;
        aiTurn ? (isWhiteTurn ? SceneGame.instance.whitePlayer.add(SceneGame.instance.selectedFigureGrp.children[0]) : SceneGame.instance.blackPlayer.add(SceneGame.instance.selectedFigureGrp.children[0]),
            isWhiteTurn = !isWhiteTurn, aiTurn = !1, game.input.enabled = !0) : (this.movesOfPlayer.children[Math.floor(gameMoves / 2)].correct.alpha = 1, addFigureToPlayer(), removePlayerWrongMoves(isWhiteTurn ? this.whitePlayer : this.blackPlayer), setTimeout(function() {
            selectedFigure.figure.unmarkFigure();
            isWhiteTurn = !isWhiteTurn;
            aiTurn = !0;
            isLastMove || gameMoves === SceneLevelInfo.instance.level.moves.length || SceneGame.instance.moveAI()
        }, Phaser.Timer.SECOND));
        hintIsReady && (hintTime = ONE_MINUTE, prevHintTimeTrack = game.time.time, hintIsReady = !1, disableButton(this.hint), this.hint.children[1].alpha = 1);
        gameMoves++;
        checkBoard()
    },
    moveAI: function() {
        var a = getNextMove();
        aiTurnMarked = [];
        chessTile && (chessTile.alpha = 0);
        this.executeMove(isWhiteTurn ? this.whitePlayer : this.blackPlayer, a)
    },
    executeMove: function(a, b) {
        for (var c = 0; c < a.children.length; c++) {
            var d = a.children[c];
            if (d.typeOfFigure === b.figureType && d.row === b.rowStart && d.col === b.colStart) {
                d.markFigure();
                removeFigure = b.kickFigure;
                isLastMove = b.chessMate;
                var c = this.getPosition(b.rowDestination, b.colDestination),
                    e = Phaser.Timer.HALF;
                d.typeOfFigure === typeOfFigure.knight ? (game.add.tween(d.position).to({
                    x: c.x
                }, .5 * e, Phaser.Easing.Linear.None, !0, 0), game.add.tween(d.position).to({
                    y: c.y
                }, .5 * e, Phaser.Easing.Linear.None, !0, .75 * e).onComplete.add(function() {
                    SceneGame.instance.placeFigure(d, b.rowDestination, b.colDestination);
                    selectedFigure.figure.unmarkFigure()
                })) : game.add.tween(d.position).to({
                    x: c.x,
                    y: c.y
                }, e, Phaser.Easing.Linear.None, !0, 0).onComplete.add(function() {
                    SceneGame.instance.placeFigure(d, b.rowDestination, b.colDestination);
                    selectedFigure.figure.unmarkFigure()
                });
                break
            }
        }
    },
    rightRotateBoard: function() {
        if (SceneLevelInfo.instance.level.color === COLOR_BLACK) {
            this.allGameBoard.angle = 180;
            for (var a = 0; a < this.whitePlayer.children.length; a++) {
                var b = this.whitePlayer.children[a];
                b.angle = 180
            }
            for (a = 0; a < this.blackPlayer.children.length; a++) b = this.blackPlayer.children[a], b.angle = 180;
            for (a = 0; a < this.board.tiles.children.length; a++)
                for (b = 0; b < this.board.tiles.children[a].children.length; b++) {
                    var c = this.board.tiles.children[a].children[b];
                    c.colText && (c.colText.alpha = 0 === a ? 1 : 0, c.rowText.alpha = b === COLS - 1 ? 1 : 0, c.angle = 180)
                }
        } else {
            for (a = this.allGameBoard.angle = 0; a < this.whitePlayer.children.length; a++) b = this.whitePlayer.children[a], b.angle = 0;
            for (a = 0; a < this.blackPlayer.children.length; a++) b = this.blackPlayer.children[a], b.angle = 0;
            for (a = 0; a < this.board.tiles.children.length; a++)
                for (b = 0; b < this.board.tiles.children[a].children.length; b++) c = this.board.tiles.children[a].children[b], c.colText && (c.colText.alpha = a === ROWS - 1 ? 1 : 0, c.rowText.alpha = 0 === b ?
                    1 : 0, c.angle = 0)
        }
    },
    onResolutionChange: function() {
        this.bg.width = 1.1 * game.width;
        this.bg.height = 1.1 * game.height;
        this.bg.position.set(.5 * game.width, .5 * game.height);
        this.typeOfGameInfo.position.set(10, 10);
        this.board.position.set(.5 * -this.board.width, .5 * -this.board.height);
        this.availableMoves.position.set(this.board.position.x, this.board.position.y);
        this.hint.position.set(.5 * game.width, game.height - 10 - .5 * this.hint.height);
        this.chessMate.position.set(.5 * game.width, .5 * game.height);
        this.pause.position.set(game.width -
            10, 10);
        updateScaleByWidth(this.hint.children[0], .9 * this.hint.width);
        updateScaleByWidth(this.typeOfGameInfo.infoLevel, .7 * game.width);
        updateScaleByMaxWidth(this.allGameBoard, .9 * game.width);
        updateScaleByHeight(this.allGameBoard, .65 * game.height);
        this.allGameBoard.position.set(.5 * game.width, .45 * game.height);
        updateScaleByWidth(this.moves, .8 * game.width);
        this.moves.position.set(.5 * game.width - .5 * this.moves.width, this.allGameBoard.y + .57 * this.allGameBoard.height)
    },
    update: function() {
        if (gameRunning)
            if (gameover) endGame({
                isGameOver: gameover,
                isDone: !0
            });
            else if (startTimer && !gamePaused) {
            var a = game.time.time;
            hintIsReady || (hintTime -= a - prevHintTimeTrack, prevHintTimeTrack = a, 0 >= hintTime && (hintTime = 0, hintIsReady = !0, enableButton(this.hint), this.hint.children[1].alpha = 0), updateTime())
        }
    },
    ShowAnimated: function() {
        ScenesTransitions.showSceneAlpha(this.grpScene);
        this.rightRotateBoard()
    },
    HideAnimated: function() {
        ScenesTransitions.hideSceneAlpha(this.grpScene);
        this.chessMate.visible = !1
    },
    onPause: function() {},
    onResume: function() {
        ScenePause.instance.grpScene.visible ||
            !SceneGame.instance.grpScene.visible || gameover || (gamePaused = !0, ScenePause.instance.ShowAnimated(100));
        prevHintTimeTrack = game.time.time
    }
};

function onGameStart() {}
var GAME_OVER_GAME = 0,
    GAME_OVER_USER = 1;

function onGameOver(a) {}

function updateTime() {
    SceneGame.instance.hint.children[1].text = formatTimer(hintTime / 1E3)
};
var SceneInfo = function() {
    SceneInfo.instance || (SceneInfo.instance = this);
    this.init();
    this.create()
};
SceneInfo.prototype = {
    init: function() {
        this.lastScene = this.back = this.versionTxt = this.logo = this.dialog = this.grpScene = null
    },
    create: function() {
        this.grpScene = createGroup("INSTRUCTION");
        this.createUI();
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    createUI: function() {
        this.createDialog();
        this.logo = createSprite(this.grpScene, 0, 0, "void", null, .5);
        this.logo.scale.set(.7);
        this.versionTxt = createText(game, 0, 0, nameOfGame + "\n" + versionOfGame[versions.HTML], 30, "#FFFFFF");
        this.versionTxt.anchor.set(.5);
        this.grpScene.addChild(this.versionTxt);
        this.back = createSprite(this.grpScene, 0, 0, "pak", "Asset 14");
        this.back.anchor.set(1, 0);
        createBtnOnUp(this.back, SceneInfo.instance.goToBack)
    },
    createDialog: function() {
        this.dialog = createGroup("DIALOG INSTRUCTIONS", this.grpScene);
        this.dialog.title = createText(game, 0, 0, STR("INSTR_TXT"), 35, "#FFFFFF", .8 * bg.width);
        this.dialog.title.anchor.set(.5);
        this.dialog.text = createText(game, 0, 0, STR("INSTRUCTIONS"), 25, "#FFFFFF", .8 * bg.width);
        this.dialog.text.anchor.set(.5, 0);
        this.dialog.text.wordWrap = !0;
        this.dialog.addChild(this.dialog.title);
        this.dialog.addChild(this.dialog.text)
    },
    setLastScene: function(a) {
        this.lastScene = a
    },
    goToBack: function() {
        soundManager.playSound("click");
        SceneInfo.instance.HideAnimated();
        console.log(SceneInfo.instance.lastScene === SceneMenu.instance, SceneInfo.instance.lastScene == ScenePause.instance);
        SceneInfo.instance.lastScene === SceneMenu.instance ? (SceneMenu.instance.ShowAnimated(), SceneLogo.instance.ShowAnimated()) : SceneInfo.instance.lastScene === ScenePause.instance && (SceneBackground.instance.HideAnimated(),
            SceneGame.instance.ShowAnimated(), ScenePause.instance.ShowAnimated())
    },
    onResolutionChange: function() {
        this.dialog.title.position.set(.5 * game.width, .1 * game.height);
        this.dialog.text.position.set(.5 * game.width, this.dialog.title.y + 2 * this.dialog.title.height);
        this.logo.position.set(.5 * game.width, .75 * game.height);
        this.versionTxt.position.set(.5 * game.width, this.logo.y + .75 * this.logo.height);
        this.back.position.set(game.width - 10, 10);
        this.dialog.text.wordWrapWidth = .85 * game.width
    },
    ShowAnimated: function(a) {
        a ||
            (a = 100);
        ScenesTransitions.showSceneAlpha(this.grpScene, a)
    },
    HideAnimated: function(a) {
        ScenesTransitions.hideSceneAlpha(this.grpScene)
    }
};
var LEVELS_COUNTER = 400,
    BG_TILES = 17,
    flagLevels = [6, 36, 60, 78, 108, 132, 150, 180, 204, 222, 252, 276, 294, 324, 348, 366],
    firesData = [1, 19, 25, 43, 55, 67, 73, 91, 97, 115, 127, 139, 145, 163, 169, 187, 199, 211, 217, 235, 241, 259, 271, 283, 289, 307, 313, 331, 343, 355, 361, 379, 385],
    holderFlagsIdx = [0, 3, 4, 5, 6, 9, 2, 8, 7, 3, 3, 4, 3, 3, 5, 9, 8, 6, 9, 8, 4, 7, 3, 5, 9, 3, 4, 5, 6, 9, 5, 4, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    selectedLevel = -1,
    selectedLevelIdx = -1,
    SceneLevels = function() {
        SceneLevels.instance || (SceneLevels.instance = this);
        this.init();
        this.create()
    };
SceneLevels.prototype = {
    init: function() {
        this.bgLevels = this.uiButtons = this.grpLevels = this.grpScene = this.bg = null;
        this.levelsBGArray = [];
        this.scrollGrp = this.menu = this.profile = null;
		//this.fullscreen = null;
    },
    create: function() {
        this.grpScene = createGroup("SELECT MODE");
        this.bg = createSprite(this.grpScene, 0, 0, "vezaBG", "", .5);
        this.createBGLevels();
        this.grpFires = createGroup("FIRES", this.bgLevels);
        this.grpFlags = createGroup("FLAGS", this.bgLevels);
        this.createLevels();
        this.createFires();
        this.createFlags();
        this.createMarker();
        this.createUIButtons();
        this.grpScene.visible = !1;
        createInitScroll(this, this.bgLevels);
        this.onResolutionChange()
    },
    createBGLevels: function() {
        var a = 0;
        this.bgLevels = createGroup("BG LEVELS", this.grpScene);
        var b = {
                x: 0,
                y: a,
                key: "levelsBG_4",
                visible: !0
            },
            c = createSprite(this.bgLevels, b.x, b.y, b.key);
        c.visible = b.visible;
        this.levelsBGArray.push(b);
        a += c.height;
        for (b = BG_TILES - 1; 0 < b; b--) {
            var c = {
                    x: 0,
                    y: a,
                    key: "levelsBG_" + (0 === b % 3 ? 3 : b % 3),
                    visible: !0
                },
                d = createSprite(this.bgLevels, c.x, c.y, c.key);
            d.visible = c.visible;
            this.levelsBGArray.push(c);
            a += d.height
        }
    },
    createFires: function() {
        for (var a = 0; a < firesData.length; a++) {
            var b = this.grpLevels.children[0],
                c = levelsDetail[firesData[a]];
            this.createFire(a, c.x + .5 * b.width, c.y - 2.5 * b.height)
        }
    },
    createFire: function(a, b, c) {
        var d = createGroup("FLARE " + a, this.grpFires);
        a = createSprite(d, b, c - 10, "pak", "torch_light", .5);
        b = createSprite(d, b, c, "fire", null, .5);
        game.add.tween(a).to({
            alpha: .5
        }, Phaser.Timer.HALF, Phaser.Easing.Linear.None, !0, 0, -1, !0);
        c = b.animations.add("walk");
        c.enableUpdate = !0;
        c.play(7, !0);
        b = createSprite(b,
            0, .4 * b.height, "pak", "torch_handle", .5);
        b.y += .5 * b.height
    },
    createFlags: function() {
        currentFlagFrameName = "flag_00_big";
        for (var a = 0; a < flagLevels.length; a++) {
            var b = this.grpLevels.children[0],
                c = levelsDetail[flagLevels[a] + 1];
            this.createFlag(c.x + .5 * b.width, c.y - 1.5 * b.height)
        }
    },
    createFlag: function(a, b) {
        var c = createSprite(this.grpFlags, a, b - 15, "flags", currentFlagFrameName, .5);
        createSprite(c, 0, .33 * -c.height, "flags", "holder_" + holderFlagsIdx[0]).anchor.set(.5, 1)
    },
    updateFlagsFrame: function() {
        for (var a = 0; a < flagLevels.length; a++)
            if (flagLevels[a] <
                dataLastLevel) {
                var b = this.grpFlags.children[a],
                    c = b.children[0];
                b.frameName = "flag_" + (10 > dataSelectedFlag ? "0" + dataSelectedFlag : dataSelectedFlag) + "_big";
                c.frameName = "holder_" + holderFlagsIdx[dataSelectedFlag]
            }
    },
    createMarker: function() {
        this.marker = createSprite(this.bgLevels, 0, 0, "pak", "avatar_king", .5);
        this.marker.scale.set(.9);
        this.hideMarker()
    },
    showMarker: function() {
        if (dataLastLevel === LEVELS_COUNTER) this.marker.alpha = 0;
        else {
            var a = this.grpLevels.children[0],
                b = levelsDetail[dataLastLevel];
            this.marker.alpha =
                1;
            this.marker.position.set(b.x + .5 * a.width, b.y - .5 * this.marker.height);
            game.add.tween(this.marker.position).to({
                y: this.marker.position.y - 6
            }, 500, Phaser.Easing.Quadratic.InOut, !0, 0, -1, !0)
        }
    },
    hideMarker: function() {
        game.tweens.removeFrom(this.marker);
        this.marker.alpha = 0
    },
    createLevels: function() {
        var a = 55,
            b = this.bgLevels.height - 80,
            c = !0,
            d = 0;
        this.grpLevels = createGroup("LEVELS", this.bgLevels);
        for (var e = 0; e < LEVELS_COUNTER; e++) {
            0 === e % 6 && 0 < e && (c = !c, b -= 16);
            84 !== e && 108 !== e && 132 !== e && 180 !== e && 204 !== e && 222 !== e && 252 !==
                e && 276 !== e && 294 !== e && 324 !== e && 348 !== e && 366 !== e && 385 !== e && 390 !== e || b++;
            108 === e && b++;
            387 <= e && b++;
            391 <= e && 393 > e && b++;
            var f = "level_locked";
            e < dataLastLevel ? f = "level_completed_star" : e === dataLastLevel && (f = "level_completed");
            var g = game.cache.getFrameByName("pak", "level_locked_flag").width,
                h = game.cache.getFrameByName("pak", "level_locked_flag").height,
                k = .4 * h,
                l = 0;
            e === flagLevels[d] && (f = e > dataLastLevel ? "level_locked_flag" : e < dataLastLevel ? "level_completed_star_flag" : "level_completed_flag", k = .65 * h, l -= .3 * h, d++);
            if (61 <= e && 65 > e || 68 <= e && 70 > e || 74 <= e && 109 > e) l += 1;
            levelsDetail.push({
                x: a,
                y: b + l,
                frameName: f,
                inputEnabled: e <= dataLastLevel,
                idx: e,
                fillColor: e <= dataLastLevel ? "#FFF2BD" : "#8C7661",
                number: e + 1,
                numberPos: k
            });
            a += c ? 1.3 * g : 1.3 * -g;
            b -= 30
        }
        for (a = dataLastLevel - 20; 40 > this.grpLevels.children.length; a++) 0 > a || a >= LEVELS_COUNTER || (c = levelsDetail[a], b = createSprite(this.grpLevels, c.x, c.y, "pak", c.frameName), b.levelInfo = c, c = createText(game, .5 * b.width, c.numberPos + 2, c.idx + 1, 18, c.fillColor), c.anchor.set(.5), b.addChild(c), createBtnOnUp(b,
            SceneLevels.instance.showInfoLevel.bind(b)))
    },
    createUIButtons: function() {
        this.uiButtons = createGroup("LEVELS BUTTON UI", this.grpScene);
        this.profile = createSprite(this.uiButtons, 0, 0, "pak", "Asset 18", .5);
        this.menu = createSprite(this.uiButtons, 0, 0, "pak", "Asset 36");
        this.menu.anchor.set(1, 0);
        //screenfull.isEnabled && (this.fullscreen = createSprite(this.grpScene, 0, 0, "pak", "Asset 17", .5), this.fullscreen.anchor.set(1, 0), createBtnOnUp(this.fullscreen, toggleFullscreen));
        createBtnOnUp(this.profile, SceneLevels.instance.clickToProfile);
        createBtnOnUp(this.menu, SceneLevels.instance.clickToMenu)
    },
    clickToProfile: function() {
        soundManager.playSound("click");
        SceneLevels.instance.HideAnimated();
        SceneProfile.instance.ShowAnimated()
    },
    clickToMenu: function() {
        SceneLevels.instance.HideAnimated();
        SceneBackground.instance.ShowAnimated();
        SceneLogo.instance.ShowAnimated();
        SceneMenu.instance.ShowAnimated()
    },
    showInfoLevel: function() {
        SceneLevels.instance.dragInfo.dragging || (soundManager.playSound("click"), selectedLevel = this.z, selectedLevelIdx = this.levelInfo.idx,
            SceneLevelInfo.instance.setValues(this.levelInfo.idx), SceneLevelInfo.instance.ShowAnimated())
    },
    update: function() {
        this.grpScene.visible && (.3 * -game.height > this.grpLevels.children[this.grpLevels.children.length - 1].worldPosition.y || this.grpLevels.children[0].worldPosition.y > 1.2 * game.height) && updateLevelsVisible(SceneLevels.instance.grpLevels)
    },
    onResolutionChange: function() {
        this.bg.scale.set(1.1);
        this.bg.position.set(.5 * game.width, .5 * game.height);
        this.bgLevels.x = .5 * game.width - .5 * this.bgLevels.children[0].width;
        this.profile.position.set(10 + .5 * this.profile.width, 10 + .5 * this.profile.height);
        this.menu.position.set(game.width - 10, 10);
        //this.fullscreen && this.fullscreen.position.set(game.width - 10, 10);
        //this.fullscreen && this.menu.position.set(game.width - 10 - 10 - this.fullscreen.width, 10);
        this.dragInfo.maxScrollY = -(this.scrollGrp.children[BG_TILES - 1].height + this.scrollGrp.children[BG_TILES - 1].y) + game.height
    },
    unlockLevel: function() {
        if (SceneLevelInfo.instance.level.level - 1 === dataLastLevel) {
            var a = this.grpLevels.children[selectedLevel];
            flagLevels.includes(selectedLevelIdx) ? a.frameName = "level_completed_star_flag" : a.frameName = "level_completed_star";
            levelsDetail[dataLastLevel].frameName = a.frameName;
            levelsDetail[dataLastLevel].fillColor = "#FFF2BD";
            dataLastLevel++;
            selectedLevel++;
            selectedLevelIdx++;
            dataLastLevel !== LEVELS_COUNTER && (dataAchievements[0] = dataAchievements[1] = dataAchievements[3] = dataAchievements[7] = dataAchievements[9] = dataAchievements[11] = dataLastLevel, a = this.grpLevels.children[selectedLevel], a.inputEnabled = !0, a.children[0].fill =
                "#FFF2BD", flagLevels.includes(selectedLevelIdx) ? a.frameName = "level_completed_flag" : a.frameName = "level_completed", levelsDetail[dataLastLevel].frameName = a.frameName, levelsDetail[dataLastLevel].fillColor = "#FFF2BD", levelsDetail[dataLastLevel].inputEnabled = !0);
            GameData.Save()
        }
    },
    updateByLastLevelPosition: function() {
        if (this.scrollGrp) {
            var a = this.grpLevels.children[0],
                b = -levelsDetail[dataLastLevel].y + .5 * game.height;
            SceneLevels.instance.dragInfo.maxScrollY = -(this.scrollGrp.children[BG_TILES - 1].height + this.scrollGrp.children[BG_TILES -
                1].y) + game.height;
            this.scrollGrp.y = b < this.dragInfo.maxScrollY ? this.dragInfo.maxScrollY : 0 < b ? 0 : b - .5 * a.height
        }
    },
    ShowAnimated: function(a) {
        this.showMarker();
        this.updateFlagsFrame();
        this.updateByLastLevelPosition();
        ScenesTransitions.showSceneAlpha(this.grpScene, a)
    },
    HideAnimated: function() {
        this.hideMarker();
        ScenesTransitions.hideSceneAlpha(this.grpScene)
    }
};
var SceneLevelInfo = function() {
    SceneLevelInfo.instance || (SceneLevelInfo.instance = this);
    this.init();
    this.create()
};
SceneLevelInfo.prototype = {
    init: function() {
        this.level = this.play = this.info = this.icon = this.exit = this.levelNumber = this.dialog = this.grpScene = null
    },
    create: function() {
        this.grpScene = createGroup("SCENE LEVEL INFO");
        this.createDialog();
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    createDialog: function() {
        this.dialog = createSprite(this.grpScene, .5 * game.width, .5 * game.height, "pak", "dialog_window");
        this.dialog.x -= .5 * this.dialog.width;
        this.dialog.y -= .5 * this.dialog.height;
        this.levelNumber = createText(game, .5 *
            this.dialog.width, .1 * this.dialog.height, STR("LEVEL") + " XX", 35, "#8D2C01");
        this.levelNumber.anchor.set(.5);
        this.dialog.addChild(this.levelNumber);
        this.exit = createSprite(this.dialog, .9 * this.dialog.width, .1 * this.dialog.height, "pak", "Asset 14", .5);
        createBtnOnUp(this.exit, SceneLevelInfo.instance.cancelDialog);
        this.dialog.hardGroupRibbon = createGroup("HARD INFO", this.dialog);
        createSprite(this.dialog.hardGroupRibbon, 0, 0, "pak", "ribbon_red", .5);
        var a = createText(game, 0, -2, STR("HARD"), 25, "#ffffff");
        a.anchor.set(.5);
        this.dialog.hardGroupRibbon.addChild(a);
        this.dialog.hardGroupRibbon.visible = !1;
        this.dialog.hardGroupRibbon.position.set(.5 * this.dialog.width, this.levelNumber.y + 1.2 * this.levelNumber.height);
        this.icon = createSprite(this.dialog, .5 * this.dialog.width, .5 * this.dialog.height, "pak", "icon_pawns_black", .5);
        this.info = createText(game, .5 * this.dialog.width, this.icon.y + .5 * this.icon.height, "MATE IN", 25, "#8D2C01");
        this.info.anchor.set(.5);
        this.dialog.addChild(this.info);
        this.play = createSprite(this.dialog, .5 * this.dialog.width,
            .88 * this.dialog.height, "pak", "button_start", .5);
        createSprite(this.play, 0, 0, "pak", "Chess_play_btn", .5);
        createBtnOnUp(this.play, SceneLevelInfo.instance.playGame)
    },
    playGame: function() {
        soundManager.playSound("start");
        startGame(SceneLevelInfo.instance.level)
    },
    cancelDialog: function() {
        soundManager.playSound("click");
        SceneLevelInfo.instance.HideAnimated()
    },
    setValues: function(a) {
        this.level = levels[a];
        this.levelNumber.text = STR("LEVEL") + " " + this.level.level;
        this.icon.frameName = "w" === this.level.color ? "icon_pawns_white" :
            "icon_pawns_black"; - 1 < this.level.moves[this.level.moves.length - 1].indexOf("#") ? this.info.text = STR("MATE_IN") + " " + this.level.moveCounter : this.info.text = STR("BEST_MOVE") + " " + this.level.moveCounter;
        updateScaleByWidth(this.info, .95 * this.info.parent.width);
        this.dialog.frameName = 1 > this.level.difficulty ? "dialog_window" : "start_dialog_hard";
        this.dialog.hardGroupRibbon.visible = 1 === this.level.difficulty;
        SceneGame.instance.typeOfGameInfo.infoLevel.text = this.info.text
    },
    onResolutionChange: function() {
        this.dialog.position.set(.5 *
            game.width - .5 * this.dialog.width, .5 * game.height - .5 * this.dialog.height)
    },
    ShowAnimated: function() {
        SceneOverlay.instance.ShowAnimated(.5);
        ScenesTransitions.showSceneAlpha(this.grpScene)
    },
    HideAnimated: function() {
        SceneOverlay.instance.HideAnimated();
        ScenesTransitions.hideSceneAlpha(this.grpScene)
    }
};
var SceneLogo = function() {
    SceneLogo.instance || (SceneLogo.instance = this);
    this.create()
};
SceneLogo.prototype = {
    init: function() {
        this.logoOfGame = this.grpScene = null
    },
    create: function() {
        this.grpScene = createGroup("LOGO");
        this.logoOfGame = createSprite(this.grpScene, 0, 0, "name", null, .5);
        this.logoOfGame.anchor.set(.5);
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    onResolutionChange: function() {
        this.logoOfGame.position.set(.5 * game.width, .25 * game.height)
    },
    ShowAnimated: function() {
        ScenesTransitions.showSceneAlpha(this.grpScene)
    },
    HideAnimated: function() {
        ScenesTransitions.hideSceneAlpha(this.grpScene)
    }
};
var SceneMenu = function() {
    SceneMenu.instance || (SceneMenu.instance = this);
    this.init();
    this.create()
};
SceneMenu.prototype = {
    init: function() {
        this.currentLevelValue = this.currentLevelTxt = this.instructions = this.music = this.goToLevels = this.grpScene = null;
		//this.fullscreen = null;
    },
    create: function() {
        this.grpScene = createGroup("SCENE MENU");
        this.createButtons();
        this.createCurrentLevel();
        this.setTextCurrentLevel();
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    createButtons: function() {
        this.goToLevels = createSprite(this.grpScene, 0, 0, "pak", "Asset 25");
        this.goToLevels.anchor.set(.5);
        createBtnOnUp(this.goToLevels, SceneMenu.instance.clickToLevels);
        this.music = createSprite(this.grpScene, 0, 0, "pak", soundManager.soundPlaying ? "Asset 20" : "Asset 27");
        this.music.anchor.set(.5);
        createBtnOnUp(this.music, toggleMusic);
        //screenfull.isEnabled && (this.fullscreen = createSprite(this.grpScene, 0, 0, "pak", "Asset 17", .5), this.fullscreen.anchor.set(1, 0), createBtnOnUp(this.fullscreen, toggleFullscreen));
        this.instructions = createSprite(this.grpScene, 0, 0, "pak", "Asset 16");
        this.instructions.anchor.set(.5);
        createBtnOnUp(this.instructions, SceneMenu.instance.clickToInstructions)
    },
    createCurrentLevel: function() {
        this.currentLevelTxt = createText(game, 0, 0, STR("LEVEL"), 40, "#FFFFFF");
        this.currentLevelTxt.anchor.set(.5);
        this.currentLevelValue = createText(game, 0, 0, "999", 30, "#FFFFFF");
        this.currentLevelValue.anchor.set(.5);
        this.grpScene.addChild(this.currentLevelTxt);
        this.grpScene.addChild(this.currentLevelValue)
    },
    setTextCurrentLevel: function() {
        this.currentLevelValue.text = Math.min(dataLastLevel + 1, LEVELS_COUNTER)
    },
    clickToLevels: function() {
		gradle.event('btn_play');
        soundManager.playSound("click");
        SceneLogo.instance.HideAnimated();
        SceneMenu.instance.HideAnimated();
        SceneBackground.instance.HideAnimated();
        SceneLevels.instance.ShowAnimated(200)
    },
    clickToInstructions: function() {
        soundManager.playSound("click");
        SceneLogo.instance.HideAnimated();
        SceneMenu.instance.HideAnimated();
        SceneInfo.instance.setLastScene(SceneMenu.instance);
        SceneInfo.instance.ShowAnimated()
    },
    onResolutionChange: function() {
        this.goToLevels.position.set(.5 * game.width, .55 * game.height);
        this.music.position.set(.4 * game.width, this.goToLevels.y + .7 * this.goToLevels.height);
        this.instructions.position.set(.6 * game.width, this.music.y);
        //this.fullscreen && this.fullscreen.position.set(game.width - 10, 10);
        this.currentLevelTxt.position.set(.5 * game.width, .8 * game.height);
        this.currentLevelValue.position.set(.5 * game.width, this.currentLevelTxt.y + this.currentLevelTxt.height)
    },
    ShowAnimated: function() {
        ScenesTransitions.showSceneAlpha(this.grpScene)
    },
    HideAnimated: function() {
        ScenesTransitions.hideSceneAlpha(this.grpScene)
    }
};
var titleTxt = "TITLE_00 TITLE_01 TITLE_02 TITLE_03 TITLE_04 TITLE_05 TITLE_06 TITLE_07 TITLE_08 TITLE_09 TITLE_10 TITLE_11 TITLE_12 TITLE_13 TITLE_14 TITLE_15 TITLE_16 TITLE_17 TITLE_18 TITLE_19".split(" "),
    subtitleTxt = "SUBTITLE_00 SUBTITLE_01 SUBTITLE_02 SUBTITLE_03 SUBTITLE_04 SUBTITLE_05 SUBTITLE_06 SUBTITLE_07 SUBTITLE_08 SUBTITLE_09 SUBTITLE_10 SUBTITLE_11 SUBTITLE_12 SUBTITLE_13 SUBTITLE_14 SUBTITLE_15 SUBTITLE_16 SUBTITLE_17 SUBTITLE_18 SUBTITLE_19".split(" "),
    SceneProfile = function() {
        SceneProfile.instance ||
            (SceneProfile.instance = this);
        this.init();
        this.create()
    };
SceneProfile.prototype = {
    init: function() {
        this.back = this.correctMoves = this.wrongMoves = this.hintsUsed = this.levelSolvedWithoutHints = this.currentProgress = this.flagsOwned = this.correctMovesTxt = this.wrongMovesTxt = this.hintsUsedTxt = this.levelSolvedWithoutHintsTxt = this.currentProgressTxt = this.flagsOwnedTxt = this.flag = this.grpAchievements = this.achievementTxt = this.grpStats = this.grpFlag = this.bg = this.grpScene = null;
        this.achievementValues = []
    },
    create: function() {
        this.grpScene = createGroup("SCENE PROFILE");
        this.bg = createSprite(this.grpScene,
            0, 0, "profileBG", "", .5);
        this.grpAll = createGroup("ACHIEVEMENTS + STATS + FLAG", this.grpScene);
        this.createFlag();
        this.createStats();
        this.createAchievements();
        this.updateProgressbarInAchievements();
        this.back = createSprite(this.grpScene, 0, 0, "pak", "Asset 14");
        this.back.anchor.set(1, 0);
        createBtnOnUp(this.back, SceneProfile.instance.returnToLevels);
        this.grpScene.visible = !1;
        this.back.visible = !1;
        createInitScroll(this, this.grpAll);
        this.onResolutionChange()
    },
    createFlag: function() {
        this.grpFlag = createGroup("PROFILE FLAG",
            this.grpAll);
        this.grpFlag.bg = createSprite(this.grpFlag, 0, 0, "pak", "background_flag_profile", .5);
        this.grpFlag.flag = createSprite(this.grpFlag, 0, .1 * -this.grpFlag.bg.height, "flags", "flag_" + (10 > dataSelectedFlag ? "0" + dataSelectedFlag : dataSelectedFlag), .5);
        this.grpFlag.flag.scale.set(.8);
        this.grpFlag.selectBtn = createTextBtn(this.grpFlag, 0, .35 * this.grpFlag.bg.height, "pak", "Asset 4", STR("CHANGE"), SceneProfile.instance.changeFlag, 15);
        this.grpFlag.selectBtn.children[0].y += 2;
        updateScaleByWidth(this.grpFlag.selectBtn.children[0],
            .7 * this.grpFlag.selectBtn.width)
    },
    createStats: function() {
        this.grpStats = createGroup("PROFILE STATISTICS", this.grpAll);
        var a = game.width,
            b = 0;
        this.flagsOwnedTxt = createText(game, 0, b, STR("FLAGS_OWNED") + ":", 20, "#ffffff", a);
        this.flagsOwnedTxt.anchor.set(0, .5);
        this.flagsOwned = createText(game, a, b, "888", 20, "#ffffff", a);
        this.flagsOwned.anchor.set(1, .5);
        b += 30;
        this.currentProgressTxt = createText(game, 0, b, STR("LEVEL_PROGRESS") + ":", 20, "#ffffff", a);
        this.currentProgressTxt.anchor.set(0, .5);
        this.currentProgress = createText(game,
            a, b, "400", 20, "#ffffff", a);
        this.currentProgress.anchor.set(1, .5);
        b += 30;
        this.levelSolvedWithoutHintsTxt = createText(game, 0, b, STR("WITHOUT_HINTS") + ":", 20, "#ffffff", a);
        this.levelSolvedWithoutHintsTxt.anchor.set(0, .5);
        this.levelSolvedWithoutHints = createText(game, a, b, "400", 20, "#ffffff", a);
        this.levelSolvedWithoutHints.anchor.set(1, .5);
        b += 30;
        this.hintsUsedTxt = createText(game, 0, b, STR("HINTS_USED") + ":", 20, "#ffffff", a);
        this.hintsUsedTxt.anchor.set(0, .5);
        this.hintsUsed = createText(game, a, b, "1200", 20, "#ffffff",
            a);
        this.hintsUsed.anchor.set(1, .5);
        b += 30;
        this.wrongMovesTxt = createText(game, 0, b, STR("WRONG_MOVES") + ":", 20, "#ffffff", a);
        this.wrongMovesTxt.anchor.set(0, .5);
        this.wrongMoves = createText(game, a, b, "10000", 20, "#ffffff", a);
        this.wrongMoves.anchor.set(1, .5);
        b += 30;
        this.correctMovesTxt = createText(game, 0, b, STR("CORRECT_MOVES") + ":", 20, "#ffffff", a);
        this.correctMovesTxt.anchor.set(0, .5);
        this.correctMoves = createText(game, a, b, "888888", 20, "#ffffff", a);
        this.correctMoves.anchor.set(1, .5);
        this.grpStats.addChild(this.flagsOwnedTxt);
        this.grpStats.addChild(this.flagsOwned);
        this.grpStats.addChild(this.currentProgressTxt);
        this.grpStats.addChild(this.currentProgress);
        this.grpStats.addChild(this.levelSolvedWithoutHintsTxt);
        this.grpStats.addChild(this.levelSolvedWithoutHints);
        this.grpStats.addChild(this.hintsUsedTxt);
        this.grpStats.addChild(this.hintsUsed);
        this.grpStats.addChild(this.wrongMovesTxt);
        this.grpStats.addChild(this.wrongMoves);
        this.grpStats.addChild(this.correctMovesTxt);
        this.grpStats.addChild(this.correctMoves);
        this.updateStats()
    },
    createAchievements: function() {
        this.achievementTxt = createText(game, 0, 0, STR("ACHIEVEMENTS"), 30, "#FFFFFF");
        this.achievementTxt.anchor.set(.5);
        this.grpAll.addChild(this.achievementTxt);
        this.achievementValues = [25, 50, 50, 100, 50, 4, 100, 200, 100, 300, 8, 400, 12];
        this.grpAchievements = createGroup("PROFILE ACHIEVEMENTS", this.grpAll);
        for (var a = 0; a < MAX_ACHIEVEMENTS; a++) this.createAchievement(a)
    },
    updateProgressbarInAchievements: function(a) {
        for (var b = 0; b < MAX_ACHIEVEMENTS; b++) {
            var c = this.grpAchievements.children[b],
                d =
                c.idx;
            if (dataClaimedAchievements.includes(d)) this.lockAchievement(d);
            else {
                var e = Math.min(dataAchievements[d], this.achievementValues[d]);
                c.progressTxt.text = e + "/" + this.achievementValues[d];
                c.progressbar.width = 0 < e ? Math.floor(c.progressbarWidth * e / this.achievementValues[d]) : 0;
                e === this.achievementValues[d] && (c.claim.visible = !0, c.lock.visible = !1)
            }
        }
        a || this.changeOrderAchievements()
    },
    lockAchievement: function(a, b) {
        for (var c = null, d = 0; d < this.grpAchievements.children.length; d++)
            if (this.grpAchievements.children[d].idx ===
                a) {
                c = this.grpAchievements.children[d];
                break
            }
        b ? (animationAlpha(c.progressTxt, 1, 0, Phaser.Timer.HALF, 0), animationAlpha(c.progress, 1, 0, Phaser.Timer.HALF, 0), animationAlpha(c.claim, 1, 0, Phaser.Timer.HALF, 0), animationAlpha(c.flagLock, 1, 0, Phaser.Timer.HALF, 0), animationAlpha(c.claimed, 0, 1, Phaser.Timer.HALF, Phaser.Timer.HALF), animationAlpha(c.flagUnlock, 0, 1, Phaser.Timer.HALF, Phaser.Timer.HALF)) : (c.progressTxt.alpha = 0, c.progress.alpha = 0, c.claimed.visible = c.flagUnlock.visible = !0, c.claimed.alpha = c.flagUnlock.alpha =
            1);
        c = c.lock.visible = !1;
        dataClaimedAchievements.includes(a) || (dataClaimedAchievements.push(a), c = !0);
        dataFlags.includes(a + 1) || (dataFlags.push(a + 1), c = !0, SceneFlags.instance.unlockFlags(a + 1));
        c && (dataAchievements[5] = dataAchievements[10] = dataAchievements[12] = dataClaimedAchievements.length, SceneProfile.instance.updateProgressbarInAchievements(!0), GameData.Save())
    },
    createAchievement: function(a) {
        var b = createGroup(a + ". ACHIEVEMENT", this.grpAchievements);
        b.idx = a;
        var c = createSprite(b, 0, 0, "pak", "Asset 12"),
            d =
            createSprite(b, .1 * c.width, .5 * c.height, "pak", "Asset 9", .5),
            e = createSprite(d, 0, 0, "flags", "flag_locked", .5),
            f = createSprite(d, 0, 0, "flags", "flag_" + (10 > a + 2 ? "0" + (a + 2) : a + 2), .5);
        f.scale.set(.55);
        var g = createText(game, .5 * c.width, .25 * c.height, STR(titleTxt[a]), 30, "#FFFFFF");
        g.anchor.set(.5);
        b.addChild(g);
        var h = createText(game, g.x, g.y + .7 * g.height, STR(subtitleTxt[a]), 20, "#FFFFFF");
        h.anchor.set(.5);
        b.addChild(h);
        var k = createSprite(b, .5 * c.width, .8 * c.height, "pak", "Asset 11", .5),
            l = createSprite(k, 0, 0, "pak", "Asset 10");
        l.position.set(.5 * -l.width, .5 * -l.height);
        k.scale.set(.85);
        var n = createText(game, .5 * c.width, .825 * c.height, dataAchievements[a] + " / " + this.achievementValues[a], 15, "#FFFFFF");
        n.anchor.set(.5);
        b.addChild(n);
        var m = createSprite(b, .9 * c.width, .5 * c.height, "pak", "Asset 30", .5),
            q = createSprite(b, .9 * c.width, .5 * c.height, "pak", "Asset 32", .5),
            c = createSprite(b, .9 * c.width, .5 * c.height, "pak", "Asset 8", .5);
        createBtnOnUp(q, SceneProfile.instance.claimFlag, {
            id: a
        });
        q.visible = !1;
        f.alpha = 0;
        c.alpha = 0;
        b.flagLock = e;
        b.flagUnlock =
            f;
        b.progressbarWidth = l.width;
        b.progressbar = l;
        b.progressTxt = n;
        b.lock = m;
        b.claim = q;
        b.claimed = c;
        b.progress = k;
        updateTextToWidth(g, 30, "gameFont", .65 * b.width);
        updateTextToWidth(h, 30, "gameFont", .65 * b.width);
        d.scale.set(.8);
        m.scale.set(.8);
        q.scale.set(.8);
        c.scale.set(.8)
    },
    changeOrderAchievements: function() {
        for (var a = this.grpAchievements.children.length, b = 0, c = 0; c < a - b; c++) {
            var d = this.grpAchievements.children[c];
            if (dataClaimedAchievements.includes(d.idx)) {
                for (var e = d.position.x, f = d.position.y, g = c + 1; g < a; g++) {
                    var h =
                        this.grpAchievements.children[g],
                        k = h.position.x,
                        l = h.position.y;
                    h.position.set(e, f);
                    d.position.set(k, l);
                    h.z--;
                    d.z++;
                    e = k;
                    f = l
                }
                this.grpAchievements.sort("y", Phaser.Group.SORT_ASCENDING);
                b++
            }
        }
    },
    claimFlag: function(a) {
        soundManager.playSound("claim");
        SceneProfile.instance.lockAchievement(a.id, !0)
    },
    updateAchievements: function() {
        for (var a = 0, b = this.grpStats.y + 1.3 * this.grpStats.height; a < this.grpAchievements.children.length; a++) {
            var c = this.grpAchievements.children[a];
            c.position.set(.5 * game.width - .5 * c.width, b);
            b += 1.2 * c.height;
            updateScaleByWidth(c, .9 * game.width)
        }
    },
    changeFlag: function() {
        soundManager.playSound("click");
        SceneProfile.instance.HideAnimated();
        SceneFlags.instance.ShowAnimated()
    },
    returnToLevels: function() {
        soundManager.playSound("click");
        SceneProfile.instance.HideAnimated();
        SceneLevels.instance.ShowAnimated(1.1375 * Phaser.Timer.SECOND)
    },
    updateStats: function() {
        this.flagsOwned.text = dataFlags.length;
        this.currentProgress.text = dataLastLevel + 1;
        this.levelSolvedWithoutHints.text = dataNoHintGames.length;
        this.hintsUsed.text =
            dataHintsUsed;
        this.wrongMoves.text = dataWrongMoves;
        this.correctMoves.text = dataCorrectMoves;
        updateScaleByWidth(this.levelSolvedWithoutHintsTxt, .8 * game.width);
        this.flagsOwnedTxt.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.currentProgressTxt.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.hintsUsedTxt.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.wrongMovesTxt.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.correctMovesTxt.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.flagsOwned.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.currentProgress.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.levelSolvedWithoutHints.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.hintsUsed.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.wrongMoves.scale.set(this.levelSolvedWithoutHintsTxt.scale.x);
        this.correctMoves.scale.set(this.levelSolvedWithoutHintsTxt.scale.x)
    },
    onResolutionChange: function() {
        this.bg.scale.set(1.1);
        this.bg.position.set(.5 * game.width,
            .5 * game.height);
        this.back.position.set(game.width - 10, 10);
        this.grpFlag.position.set(.5 * game.width, .15 * game.height);
        for (var a = 1; a < this.grpStats.children.length; a += 2) this.grpStats.children[a].position.x = .9 * game.width;
        this.grpStats.position.set(.05 * game.width, this.grpFlag.position.y + .8 * this.grpStats.height);
        this.achievementTxt.position.set(.5 * game.width, this.grpStats.position.y + 1.1 * this.grpStats.height);
        this.updateAchievements();
        this.updateStats();
        this.dragInfo.maxScrollY = -this.grpAll.height + .9 * game.height
    },
    ShowAnimated: function(a) {
        this.grpScene.visible = !0;
        this.updateStats();
        this.updateProgressbarInAchievements();
        ScenesTransitions.showSceneAlpha(this.grpScene);
        var b = 1.275 * Phaser.Timer.QUARTER;
        a || (a = 0);
        animationByXPosition(this.grpFlag, -game.width, .5 * game.width, b, a, 0, 1);
        a += b;
        animationByXPosition(this.grpStats, -game.width, .05 * game.width, b, a, 0, 1);
        a += b;
        animationByXPosition(this.achievementTxt, -game.width, .5 * game.width, b, a, 0, 1);
        a += b;
        animationByXPosition(this.grpAchievements, -game.width, 0, b, a, 0, 1);
        animationAlpha(this.back,
            0, 1, b, a)
    },
    HideAnimated: function(a) {
        var b = 1.125 * Phaser.Timer.QUARTER;
        a || (a = 0);
        this.back.visible = !1;
        animationByXPosition(this.grpFlag, this.grpFlag.x, -this.grpFlag.width, b, a);
        a += b;
        animationByXPosition(this.grpStats, this.grpStats.x, -this.grpStats.width, b, a);
        a += b;
        animationByXPosition(this.achievementTxt, this.achievementTxt.x, -this.achievementTxt.width, b, a);
        a += b;
        animationByXPosition(this.grpAchievements, this.grpAchievements.x, -game.width, b, a);
        ScenesTransitions.hideSceneAlpha(this.grpScene, a + b + b, b)
    }
};
var selectedFlag = 0,
    FLAG_COUNT = 44,
    SceneFlags = function() {
        SceneFlags.instance || (SceneFlags.instance = this);
        this.init();
        this.create()
    };
SceneFlags.prototype = {
    init: function() {
        this.subtitle = this.title = this.back = this.scrollGrp = this.grpFlags = this.bg = this.grpScene = null
    },
    create: function() {
        this.grpScene = createGroup("SCENE FLAGS");
        this.bg = createSprite(this.grpScene, 0, 0, "profileBG", "", .5);
        this.grpAllScroll = createGroup("SCROLL FLAGS", this.grpScene);
        this.title = createText(game, 0, 0, STR("PICK_YOUR_FLAG"), 40, "#FFFFFF");
        this.title.anchor.set(.5);
        this.grpAllScroll.addChild(this.title);
        this.subtitle = createText(game, 0, 0, STR("EARN_ACHIEVEMENTS"), 25,
            "#FFFFFF");
        this.subtitle.anchor.set(.5);
        this.grpAllScroll.addChild(this.subtitle);
        this.createFlags();
        for (var a = 0; a < dataFlags.length; a++) this.unlockFlags(dataFlags[a]);
        this.selectFlag({
            id: dataSelectedFlag
        });
        createInitScroll(this, this.grpAllScroll);
        this.back = createSprite(this.grpScene, 0, 0, "pak", "Asset 14");
        this.back.anchor.set(1, 0);
        createBtnOnUp(this.back, SceneFlags.instance.returnToProfile);
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    returnToProfile: function() {
        soundManager.playSound("click");
        SceneFlags.instance.HideAnimated();
        SceneProfile.instance.ShowAnimated(.75 * Phaser.Timer.SECOND)
    },
    createFlags: function() {
        this.grpFlags = createGroup("FLAGS", this.grpAllScroll);
        for (var a = 1, b = 0, c = 0; a <= FLAG_COUNT; a++, b += 1.2 * this.grpFlags.children[0].width) 1 < a && 1 === a % 3 && (b = 0, c += 1.2 * this.grpFlags.children[0].height), this.createFlag(a, b, c)
    },
    createFlag: function(a, b, c) {
        var d = 10 > a ? "0" + a : a;
        c = createSprite(this.grpFlags, b, c, "pak", "background_flag");
        c.flag = createSprite(c, .5 * c.width, .5 * c.height, "flags", "flag_" + d, .5);
        c.flag.scale.set(.55);
        c.flag.alpha = 0;
        c.flagLocked = createSprite(c, .5 * c.width, .5 * c.height, "flags", "flag_locked", .5);
        c.marker = createSprite(c, .95 * c.width, .95 * c.height, "pak", "selected_flag", .5);
        c.marker.alpha = 0;
        c.xAnim = b;
        createBtnOnUp(c, SceneFlags.instance.selectFlag, {
            id: a
        });
        disableButton(c)
    },
    unlockFlags: function(a) {
        1 === this.grpFlags.children[a].flagLocked.alpha && (this.grpFlags.children[a].flagLocked.alpha = 0, this.grpFlags.children[a].flag.alpha = 1, enableButton(this.grpFlags.children[a]));
        dataFlags.includes(a) ||
            (dataFlags.push(a), GameData.Save())
    },
    selectFlag: function(a) {
        SceneFlags.instance.unselectFlag();
        a.id !== dataSelectedFlag && soundManager.playSound("flagChange");
        if (-1 < a.id) {
            var b = SceneFlags.instance.grpFlags.children[a.id - 1];
            b.frameName = "background_flag_selected";
            b.marker.alpha = 1;
            SceneProfile.instance.grpFlag.flag.frameName = "flag_" + (10 > a.id ? "0" + a.id : a.id);
            dataSelectedFlag = a.id;
            GameData.Save();
            SceneLevels.instance.updateFlagsFrame()
        }
    },
    unselectFlag: function() {
        if (-1 < dataSelectedFlag) {
            var a = SceneFlags.instance.grpFlags.children[dataSelectedFlag -
                1];
            a.marker.alpha = 0;
            a.frameName = "background_flag"
        }
    },
    onResolutionChange: function() {
        this.bg.scale.set(1.1);
        this.bg.position.set(.5 * game.width, .5 * game.height);
        this.title.position.set(.5 * game.width, .1 * game.height);
        this.subtitle.position.set(.5 * game.width, this.title.y + 1.2 * this.title.height);
        this.grpFlags.position.set(.5 * game.width - .5 * this.grpFlags.width, this.subtitle.y + 1.5 * this.subtitle.height);
        this.back.position.set(game.width - 10, 10);
        updateScaleByWidth(this.title, .75 * game.width);
        updateScaleByWidth(this.subtitle,
            .85 * game.width);
        this.dragInfo.maxScrollY = -this.scrollGrp.height + .9 * game.height
    },
    ShowAnimated: function() {
        this.grpScene.visible = !0;
        ScenesTransitions.showSceneAlpha(this.grpScene);
        var a = 1.275 * Phaser.Timer.QUARTER,
            b = 0;
        animationByXPosition(this.title, -game.width, .5 * game.width, a, b, 0, 1);
        b += a;
        animationByXPosition(this.subtitle, -game.width, .5 * game.width, a, b, 0, 1);
        b += a;
        animationByXPosition(this.grpFlags, -game.width, .5 * game.width - .5 * this.grpFlags.width, a, b, 0, 1);
        animationAlpha(this.back, 0, 1, a, b)
    },
    HideAnimated: function() {
        var a =
            1.125 * Phaser.Timer.QUARTER,
            b = 0;
        this.back.visible = !1;
        animationByXPosition(this.title, this.title.x, -game.width, a, b);
        b += a;
        animationByXPosition(this.subtitle, this.subtitle.x, -game.width, a, b);
        b += a;
        animationByXPosition(this.grpFlags, this.grpFlags.x, -game.width, a, b);
        ScenesTransitions.hideSceneAlpha(this.grpScene, b + a, a)
    }
};
var SceneOverlay = function() {
    SceneOverlay.instance || (SceneOverlay.instance = this);
    this.init();
    this.create()
};
SceneOverlay.prototype = {
    init: function() {
        this.grpScene = null
    },
    create: function() {
        this.grpScene = createGroup("OVERLAY");
        this.overlay = this.grpScene.create(0, 0, "overlay");
        this.overlay.anchor.setTo(.5);
        this.overlay.alpha = .9;
        this.overlay.inputEnabled = !0;
        this.grpScene.visible = !1;
        this.overlay.events.onInputDown.add(SceneOverlay.instance.overlayClick);
        this.onResolutionChange()
    },
    overlayClick: function(a, b) {},
    onResolutionChange: function() {
        this.overlay.reset(game.width >> 1, game.height >> 1);
        this.overlay.width = 1.1 * game.width;
        this.overlay.height = 1.1 * game.height
    },
    ShowAnimated: function(a) {
        this.overlay.alpha = a ? a : .9;
        SceneOverlay.instance.onResolutionChange();
        ScenesTransitions.showSceneAlpha(this.grpScene, 0, ScenesTransitions.TRANSITION_LENGTH)
    },
    HideAnimated: function() {
        ScenesTransitions.hideSceneAlpha(this.grpScene, 0, ScenesTransitions.TRANSITION_LENGTH)
    }
};
var ScenePromotion = function() {
    ScenePromotion.instance || (ScenePromotion.instance = this);
    this.init();
    this.create()
};
ScenePromotion.prototype = {
    init: function() {
        this.dataFromBoard = this.promotionDialog = this.grpScene = null
    },
    create: function() {
        this.grpScene = createGroup("SCENE PROMOTION");
        this.createPromotionDialog();
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    createPromotionDialog: function() {
        this.promotionDialog = createGroup("PROMOTION DIALOG", this.grpScene);
        this.promotionDialog.black = createGroup("WHITE", this.promotionDialog);
        this.promotionDialog.black.bg = createSprite(this.promotionDialog.black, 0, 0, "pak", "promotion_outer",
            .5);
        this.promotionDialog.black.fg = createSprite(this.promotionDialog.black.bg, 0, 0, "pak", "promotion_inner", .5);
        this.promotionDialog.white = createGroup("BLACK", this.promotionDialog);
        this.promotionDialog.white.bg = createSprite(this.promotionDialog.white, 0, 0, "pak", "promotion_outer", .5);
        this.promotionDialog.white.fg = createSprite(this.promotionDialog.white.bg, 0, 0, "pak", "promotion_inner", .5)
    },
    fillPromotionDialog: function() {
        this.promotionDialog.white.fg.children = [];
        this.promotionDialog.black.fg.children = [];
        var a = createSprite(this.promotionDialog.black.fg, .3 * -this.promotionDialog.black.fg.width, 0, "figures", prefixTheme + "knight_black", .5),
            b = createSprite(this.promotionDialog.black.fg, .1 * -this.promotionDialog.black.fg.width, 0, "figures", prefixTheme + "bishop_black", .5),
            c = createSprite(this.promotionDialog.black.fg, .1 * this.promotionDialog.black.fg.width, 0, "figures", prefixTheme + "rook_black", .5),
            d = createSprite(this.promotionDialog.black.fg, .3 * this.promotionDialog.black.fg.width, 0, "figures", prefixTheme + "queen_black",
                .5);
        a.scale.set(1.1);
        b.scale.set(1.2);
        c.scale.set(1.3);
        d.scale.set(1.4);
        createBtnOnUp(a, ScenePromotion.instance.promote.bind(this), typeOfFigure.knight);
        createBtnOnUp(b, ScenePromotion.instance.promote.bind(this), typeOfFigure.bishop);
        createBtnOnUp(c, ScenePromotion.instance.promote.bind(this), typeOfFigure.rook);
        createBtnOnUp(d, ScenePromotion.instance.promote.bind(this), typeOfFigure.queen);
        a = createSprite(this.promotionDialog.white.fg, .3 * -this.promotionDialog.white.fg.width, 0, "figures", prefixTheme + "knight_white",
            .5);
        b = createSprite(this.promotionDialog.white.fg, .1 * -this.promotionDialog.white.fg.width, 0, "figures", prefixTheme + "bishop_white", .5);
        c = createSprite(this.promotionDialog.white.fg, .1 * this.promotionDialog.white.fg.width, 0, "figures", prefixTheme + "rook_white", .5);
        d = createSprite(this.promotionDialog.white.fg, .3 * this.promotionDialog.white.fg.width, 0, "figures", prefixTheme + "queen_white", .5);
        a.scale.set(1.1);
        b.scale.set(1.2);
        c.scale.set(1.3);
        d.scale.set(1.4);
        createBtnOnUp(a, ScenePromotion.instance.promote.bind(this),
            typeOfFigure.knight);
        createBtnOnUp(b, ScenePromotion.instance.promote.bind(this), typeOfFigure.bishop);
        createBtnOnUp(c, ScenePromotion.instance.promote.bind(this), typeOfFigure.rook);
        createBtnOnUp(d, ScenePromotion.instance.promote.bind(this), typeOfFigure.queen)
    },
    setWrongMove: function(a) {
        this.dataFromBoard = a
    },
    promote: function(a) {
        a === promotionFigure ? (this.changeFigure(a), this.rightMoveExecute()) : (this.changeFigure(a), this.wrongMoveExecute());
        ScenePromotion.instance.HideAnimated()
    },
    changeFigure: function(a) {
        var b =
            this.dataFromBoard.figure;
        b.typeOfFigure = a;
        switch (a) {
            case typeOfFigure.pawn:
                b.frameName = prefixTheme + (isWhiteTurn ? "pawn_white" : "pawn_black");
                break;
            case typeOfFigure.knight:
                b.frameName = prefixTheme + (isWhiteTurn ? "knight_white" : "knight_black");
                break;
            case typeOfFigure.bishop:
                b.frameName = prefixTheme + (isWhiteTurn ? "bishop_white" : "bishop_black");
                break;
            case typeOfFigure.rook:
                b.frameName = prefixTheme + (isWhiteTurn ? "rook_white" : "rook_black");
                break;
            case typeOfFigure.queen:
                b.frameName = prefixTheme + (isWhiteTurn ? "queen_white" :
                    "queen_black")
        }
    },
    wrongMoveExecute: function() {
        for (var a = 2 * this.dataFromBoard.timer, b = this.dataFromBoard.prevPosition, c = this.dataFromBoard.figure, d = 0; d < aiTurnMarked.length; d++) markTile(aiTurnMarked[d].row, aiTurnMarked[d].col, !1, !0);
        game.time.events.add(a, function() {
            ScenePromotion.instance.changeFigure(typeOfFigure.pawn)
        });
        game.add.tween(c.position).to({
            x: b.x,
            y: b.y
        }, a, Phaser.Easing.Linear.None, !0, a).onComplete.add(function() {
            selectedFigure.figure.unmarkFigure();
            for (var a = 0; a < aiTurnMarked.length; a++) markTile(aiTurnMarked[a].row,
                aiTurnMarked[a].col, !0, !0)
        });
        redTile.position.set(c.position.x, c.position.y);
        redTile.alpha = 0;
        game.add.tween(redTile).to({
            alpha: .5
        }, 300, Phaser.Easing.Linear.None, !0, 0, 1, !0);
        game.add.tween(SceneGame.instance.movesOfPlayer.children[Math.floor(gameMoves / 2)].wrong).to({
            alpha: 1
        }, 300, Phaser.Easing.Linear.None, !0, 0, 1, !0)
    },
    rightMoveExecute: function() {
        for (var a = this.dataFromBoard.row, b = this.dataFromBoard.col, c = 0; c < aiTurnMarked.length; c++) markTile(aiTurnMarked[c].row, aiTurnMarked[c].col, !1, !0);
        SceneGame.instance.placeFigure(selectedFigure.figure,
            a, b)
    },
    onResolutionChange: function() {
        this.promotionDialog.white.position.set(.5 * game.width, .5 * game.height);
        this.promotionDialog.black.position.set(.5 * game.width, .5 * game.height)
    },
    ShowAnimated: function() {
        isWhiteTurn ? (this.promotionDialog.white.visible = !0, this.promotionDialog.black.visible = !1) : (this.promotionDialog.black.visible = !0, this.promotionDialog.white.visible = !1);
        SceneOverlay.instance.ShowAnimated(.5);
        ScenesTransitions.showSceneAlpha(this.grpScene)
    },
    HideAnimated: function() {
        SceneOverlay.instance.HideAnimated();
        ScenesTransitions.hideSceneAlpha(this.grpScene)
    }
};
var ScenePause = function() {
    ScenePause.instance || (ScenePause.instance = this);
    this.init();
    this.create()
};
ScenePause.prototype = {
    init: function() {
        this.continue = this.levels = this.restart = this.about = this.music = this.dialog = this.title = this.grpScene = null;
		//this.fullscreen = null;
    },
    create: function() {
        this.grpScene = createGroup("PAUSE");
        this.createDialog();
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    createDialog: function() {
        this.dialog = createSprite(this.grpScene, 0, 0, "pak", "Asset 13");
        this.music = createSprite(this.dialog, .13 * this.dialog.width, .5 * this.dialog.height, "pak", soundManager.soundPlaying ? "Asset 20" : "Asset 27",
            .5);
        this.about = createSprite(this.dialog, .3 * this.dialog.width, .5 * this.dialog.height, "pak", "Asset 16", .5);
        this.restart = createSprite(this.dialog, .47 * this.dialog.width, .5 * this.dialog.height, "pak", "Asset 19", .5);
        this.levels = createSprite(this.dialog, .66 * this.dialog.width, .5 * this.dialog.height, "pak", "Asset 22", .5);
        this.continue = createSprite(this.dialog, .86 * this.dialog.width, .5 * this.dialog.height, "pak", "Asset 28", .5);
        createBtnOnUp(this.music, toggleMusic);
        createBtnOnUp(this.about, ScenePause.instance.aboutCallback);
        createBtnOnUp(this.restart, ScenePause.instance.restartCallback);
        createBtnOnUp(this.levels, ScenePause.instance.levelsCallback);
        createBtnOnUp(this.continue, ScenePause.instance.continueCallback);
        //screenfull.isEnabled && (this.fullscreen = createSprite(this.dialog, .25 * this.dialog.width, .5 * this.dialog.height, "pak", "Asset 17", .5), this.music.position.set(.1 * this.dialog.width, .5 * this.dialog.height), this.about.position.set(.4 * this.dialog.width, .5 * this.dialog.height), this.restart.position.set(.55 * this.dialog.width, .5 * this.dialog.height), this.levels.position.set(.72 * this.dialog.width, .5 * this.dialog.height), this.continue.position.set(.89 * this.dialog.width, .5 * this.dialog.height), createBtnOnUp(this.fullscreen, toggleFullscreen));
        this.title = createText(game, 0, 0, STR("PAUSE"), 40, "#FFFFFF");
        this.title.anchor.set(.5);
        this.grpScene.addChild(this.title)
    },
    aboutCallback: function() {
        soundManager.playSound("click");
        ScenePause.instance.HideAnimated();
        SceneGame.instance.HideAnimated();
        SceneBackground.instance.ShowAnimated();
        SceneInfo.instance.setLastScene(ScenePause.instance);
        SceneInfo.instance.ShowAnimated()
    },
    restartCallback: function() {
        soundManager.playSound("click");
        endGame({
            isGameOver: !0,
            isDone: !1
        });
        onGameOver(GAME_OVER_USER);
        startGame(SceneLevelInfo.instance.level)
    },
    levelsCallback: function() {
        soundManager.playSound("click");
        soundManager.playMusic("menu");
        onGameOver(GAME_OVER_USER);
        endGame({
            isGameOver: !0,
            isDone: !1
        });
        ScenePause.instance.HideAnimated();
        SceneGame.instance.HideAnimated();
        SceneLevels.instance.ShowAnimated()
    },
    continueCallback: function() {
        soundManager.playSound("click");
        ScenePause.instance.HideAnimated();
        prevHintTimeTrack = game.time.time;
        gamePaused && (gamePaused = !1)
    },
    onResolutionChange: function() {
        this.dialog.position.set(.5 * game.width - .5 * this.dialog.width, .5 * game.height - .5 * this.dialog.height);
        this.title.position.set(.5 * game.width, this.dialog.y - .6 * this.title.height)
    },
    ShowAnimated: function() {
        game.input.enabled || (game.input.enabled = !0);
        game.tweens.pauseAll();
        game.pause = !0;
        SceneOverlay.instance.ShowAnimated(.5);
        ScenesTransitions.showSceneAlpha(this.grpScene)
    },
    HideAnimated: function() {
        game.tweens.resumeAll();
        game.pause = !1;
        SceneOverlay.instance.HideAnimated();
        ScenesTransitions.hideSceneAlpha(this.grpScene)
    }
};
var SceneResult = function() {
    SceneResult.instance || (SceneResult.instance = this);
    this.init();
    this.create()
};
SceneResult.prototype = {
    init: function() {
        this.next = this.board = this.title = this.bg = this.grpScene = null
    },
    create: function() {
        this.grpScene = createGroup("RESULT");
        this.bg = createSprite(this.grpScene, 0, 0, "newYorkBG", "", .5);
        this.createTitle();
        this.createBoard();
        this.createNext();
        this.grpScene.visible = !1;
        this.onResolutionChange()
    },
    createTitle: function() {
        this.title = createGroup("TITLE RESULT", this.grpScene);
        var a = createSprite(this.title, 0, 0, "pak", "ribbon_green", .5),
            b = createText(game, 0, -5, STR("WELL_DONE"), 25, "#FFFFFF",
                .8 * a.width);
        b.anchor.set(.5);
        a.addChild(b);
        this.title.alpha = 0
    },
    createBoard: function() {
        this.board = createSprite(this.grpScene, 0, 0, SceneGame.instance.board.key, null, .5)
    },
    removeFiguresFromBoard: function() {
        for (var a = this.board.children.length - 1; 0 <= a; a--) this.board.children[a].destroy()
    },
    addFiguresToBoard: function() {
        this.board.loadTexture(SceneGame.instance.board.key);
        var a = SceneLevelInfo.instance.level.color === COLOR_BLACK;
        this.board.angle = a ? 180 : 0;
        for (var b = SceneGame.instance.board.tiles, c = 0; c < b.children.length; c++)
            for (var d =
                    0; d < b.children[c].children.length; d++) {
                var e = b.children[c].children[d],
                    f = e.figure;
                f && (createSprite(this.board, e.position.x - .5 * this.board.width, e.position.y - .5 * this.board.height, f.key, f.frameName, .5).angle = a ? 180 : 0)
            }
    },
    createNext: function() {
        this.next = createSprite(this.grpScene, 0, 0, "pak", "button_grey", .5);
        createSprite(this.next, 0, 0, "pak", "icon_next", .5);
        createBtnOnUp(this.next, SceneResult.instance.returnToLevels);
        this.next.inputEnabled = !1;
        this.next.alpha = 0
    },
    returnToLevels: function() {
		gradle.event('btn_next');
        soundManager.playSound("click");
        soundManager.stopSound("gameFinish");
        soundManager.playMusic("menu");
        SceneResult.instance.HideAnimated();
        SceneLevels.instance.ShowAnimated();
        SceneMenu.instance.setTextCurrentLevel()
    },
    onResolutionChange: function() {
        this.bg.width = 1.1 * game.width;
        this.bg.height = 1.1 * game.height;
        this.bg.position.set(.5 * game.width, .5 * game.height);
        this.title.position.set(.5 * game.width, .15 * game.height);
        this.board.position.set(.5 * game.width, .5 * game.height);
        this.next.position.set(.5 * game.width, .85 * game.height)
    },
    ShowAnimated: function() {
        this.grpScene.visible = !0;
        this.grpScene.alpha = 1;
        SceneResult.instance.next.inputEnabled = !1;
        this.addFiguresToBoard();
        var a = SceneGame.instance.allGameBoard.scale.x,
            b = SceneGame.instance.allGameBoard.scale.y;
        this.board.scale.set(a, b);
        var c = Phaser.Timer.HALF;
        game.add.tween(this.board.scale).to({
            x: a - .2,
            y: b - .2
        }, c, Phaser.Easing.Linear.None, !0, 0).onComplete.add(function() {
            SceneResult.instance.title.alpha = 1
        });
        game.add.tween(this.title).to({
            alpha: 1
        }, c, Phaser.Easing.Linear.None, !0, c);
        game.add.tween(this.next).to({
            alpha: 1
        }, c, Phaser.Easing.Linear.None, !0, 2 * c).onComplete.add(function() {
            SceneResult.instance.next.inputEnabled = !0
        })
    },
    HideAnimated: function() {
        SceneOverlay.instance.HideAnimated();
        ScenesTransitions.hideSceneAlpha(this.grpScene);
        this.removeFiguresFromBoard();
        this.title.alpha = 0;
        this.board.scale.set(1);
        this.next.inputEnabled = !1;
        this.next.alpha = 0
    }
};
var ScenesTransitions = function() {};
ScenesTransitions.TRANSITION_LENGTH = 200;
ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In;
ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out;
ScenesTransitions.transitionActive = !1;
ScenesTransitions.transitionStarted = function() {
    ScenesTransitions.transitionActive = !0
};
ScenesTransitions.transitionFinished = function() {
    ScenesTransitions.transitionActive = !1
};
ScenesTransitions.shakeScene = function(a, b, c, d, e, f) {
    void 0 === b && (b = 3);
    void 0 === c && (c = 0);
    void 0 === d && (d = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === e && (e = null);
    void 0 === f && (f = null);
    game.tweens.removeFrom(a, !0);
    var g = game.add.tween(a.position);
    a.position.orgX = a.position.x;
    a.position.orgY = a.position.y;
    a.position.shakeAmount = b;
    g.to({
        x: a.position.x,
        y: a.position.y
    }, d, Phaser.Easing.Cubic.InOut, !0, c);
    g.onUpdateCallback(function(a, b, c) {
        a.target.x = a.target.orgX + getRandomInt(a.target.shakeAmount);
        a.target.y =
            a.target.orgY + getRandomInt(a.target.shakeAmount);
        null != this.callbackOnUpdate && this.callbackOnUpdate(b)
    }, {
        callbackOnUpdate: f
    });
    g.onComplete.add(function() {
        this.scene.position.x = this.scene.position.orgX;
        this.scene.position.y = this.scene.position.orgY;
        null != this.callbackOnComplete && this.callbackOnComplete()
    }, {
        scene: a,
        callbackOnComplete: e
    });
    return g
};
ScenesTransitions.showSceneAlpha = function(a, b, c, d, e) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH / 2);
    void 0 === d && (d = null);
    void 0 === e && (e = 1);
    game.tweens.removeFrom(a, !1);
    a.visible = !0;
    a.alpha = 0;
    b = game.add.tween(a).to({
        alpha: e
    }, c, ScenesTransitions.TRANSITION_EFFECT_IN, !1, b);
    b.onComplete.add(ScenesTransitions.onSceneShown, {
        shownScene: a,
        callback: d
    });
    b.start();
    a.showTween = b
};
ScenesTransitions.showSceneH = function(a, b, c, d, e) {
    void 0 === d && (d = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === e && (e = null);
    game.tweens.removeFrom(a, !0);
    a.visible = !0;
    a.x = game.width * (b ? -2 : 2);
    a.y = 0;
    showTween = game.add.tween(a).to({
        x: 0
    }, d, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
    showTween.onComplete.add(ScenesTransitions.onSceneShown, {
        shownScene: a,
        callback: e
    });
    showTween.start();
    a.showTween = showTween
};
ScenesTransitions.showSceneFromLeft = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === d && (d = null);
    return ScenesTransitions.showSceneH(a, !0, b, c, d)
};
ScenesTransitions.showSceneV = function(a, b, c, d, e) {
    void 0 === c && (c = 0);
    void 0 === d && (d = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === e && (e = null);
    game.tweens.removeFrom(a, !0);
    a.visible = !0;
    a.x = 0;
    a.y = game.height * (b ? -2 : 2);
    showTween = game.add.tween(a).to({
        y: 0
    }, d, ScenesTransitions.TRANSITION_EFFECT_IN, !1, c);
    showTween.onComplete.add(ScenesTransitions.onSceneShown, {
        shownScene: a,
        callback: e
    });
    showTween.start();
    a.showTween = showTween
};
ScenesTransitions.showSceneFromTop = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === d && (d = null);
    ScenesTransitions.showSceneV(a, !0, b, c, d)
};
ScenesTransitions.showSceneFromBottom = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === d && (d = null);
    return ScenesTransitions.showSceneV(a, !1, b, c, d)
};
ScenesTransitions.showSceneFromRight = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === d && (d = null);
    return ScenesTransitions.showSceneH(a, !1, b, c, d)
};
ScenesTransitions.hideSceneAlpha = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH / 2);
    void 0 === d && (d = null);
    game.tweens.removeFrom(a, !0);
    var e = game.add.tween(a);
    e.to({
        alpha: 0
    }, c, ScenesTransitions.TRANSITION_EFFECT_OUT, !1, b);
    e.onComplete.add(ScenesTransitions.onSceneHidden, {
        hiddenScene: a,
        callback: d
    });
    e.start();
    return a.hideTween = e
};
ScenesTransitions.hideSceneH = function(a, b, c, d, e) {
    void 0 === c && (c = 0);
    void 0 === e && (e = null);
    game.tweens.removeFrom(a, !0);
    d = game.add.tween(a);
    d.to({
        x: game.width * (b ? -2 : 2)
    }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_OUT, c);
    d.onComplete.add(ScenesTransitions.onSceneHidden, {
        hiddenScene: a,
        callback: e
    });
    d.start();
    return a.hideTween = d
};
ScenesTransitions.hideSceneToLeft = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === d && (d = null);
    return ScenesTransitions.hideSceneH(a, !0, b, c, d)
};
ScenesTransitions.hideSceneToRight = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === d && (d = null);
    return ScenesTransitions.hideSceneH(a, !1, b, c, d)
};
ScenesTransitions.hideSceneV = function(a, b, c, d, e) {
    void 0 === e && (e = null);
    game.tweens.removeFrom(a, !0);
    c = game.add.tween(a);
    c.to({
        y: game.height * (b ? -2 : 2)
    }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_OUT);
    c.onComplete.add(ScenesTransitions.onSceneHidden, {
        hiddenScene: a,
        callback: e
    });
    c.start();
    return a.hideTween = c
};
ScenesTransitions.hideSceneToTop = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === d && (d = null);
    return ScenesTransitions.hideSceneV(a, !0, b, c, d)
};
ScenesTransitions.hideSceneToBottom = function(a, b, c, d) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
    void 0 === d && (d = null);
    return ScenesTransitions.hideSceneV(a, !1, b, c, d)
};
ScenesTransitions.onSceneHidden = function() {
    LOG("onSceneHidden : " + this.hiddenScene.name);
    this.hiddenScene.visible = !1;
    null != this.callback && this.callback()
};
ScenesTransitions.onSceneShown = function() {
    LOG("onSceneShown: " + this.shownScene.name);
    null != this.callback && this.callback()
};
ScenesTransitions.showSceneScale = function(a, b, c, d, e, f) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH / 2);
    void 0 === d && (d = null);
    void 0 === e && (e = ScenesTransitions.TRANSITION_EFFECT_IN);
    void 0 === f && (f = 1);
    a.scale.set(0);
    a.visible = !0;
    b = game.add.tween(a.scale).to({
        x: f,
        y: f
    }, c, e, !1, b);
    b.onComplete.add(ScenesTransitions.onSceneShown, {
        shownScene: a,
        callback: d
    });
    b.start();
    a.showTween = b
};
ScenesTransitions.hideSceneScale = function(a, b, c, d, e) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH / 2);
    void 0 === d && (d = null);
    void 0 === e && (e = ScenesTransitions.TRANSITION_EFFECT_IN);
    a.visible = !0;
    b = game.add.tween(a.scale).to({
        x: 0,
        y: 0
    }, c, e, !1, b);
    b.onComplete.add(ScenesTransitions.onSceneHidden, {
        hiddenScene: a,
        callback: d
    });
    b.start();
    a.hideTween = b
};
ScenesTransitions.enableButton = function(a, b) {
    void 0 === b && (b = 0);
    void 0 !== a && game.time.events.add(b, function() {
        void 0 !== a && (a.input.enabled = !0)
    }, this, a)
};
ScenesTransitions.disableButton = function(a, b) {
    void 0 === b && (b = 0);
    void 0 !== a && game.time.events.add(b, function() {
        void 0 !== a && (a.input.enabled = !1)
    }, this, a)
};
ScenesTransitions.endPlayerAnim = function(a, b, c) {
    void 0 === b && (b = 0);
    void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH >> 1);
    var d = game.add.tween(a);
    b = game.add.tween(a).to({
        alpha: 0
    }, c, ScenesTransitions.TRANSITION_EFFECT_OUT, !1, b);
    game.add.tween(a.scale).to({
        x: .5,
        y: .5
    }, c, Phaser.Easing.Linear.None, !0);
    d.start();
    b.start();
    return d
};
var GameState = function(a) {};
restartGame = !1;
var gameState = null,
    soundManager = null,
    particles = null,
    textParticles = null;
GameState.prototype = {
    preload: function() {
        game.input.onDown.add(function() {
            game.paused && (game.paused = !1)
        })
    },
    create: function() {
        game.stage.backgroundColor = 16777215;
        game.renderer.renderSession.roundPixels = !0;
        gameState = this;
        gameRunning = !1;
        soundManager = new SoundManager(game);
        soundManager.create();
        new GameData;
        GameData.Load();
        dataAchievements[0] = dataAchievements[1] = dataAchievements[3] = dataAchievements[7] = dataAchievements[9] = dataAchievements[11] = dataLastLevel;
        dataAchievements[5] = dataAchievements[10] = dataAchievements[12] =
            dataClaimedAchievements.length;
        dataAchievements[4] = dataAchievements[8] = dataQueenGames.length;
        dataAchievements[2] = dataAchievements[6] = dataNoHintGames.length;
        soundManager.soundPlaying = dataMusic;
        soundManager.musicPlaying = dataMusic;
        new ReadLevels;
        ReadLevels.Load();
        scenes = [];
        scenes.push(new SceneBackground);
        scenes.push(new SceneLogo);
        scenes.push(new SceneMenu);
        scenes.push(new SceneProfile);
        scenes.push(new SceneGame);
        scenes.push(new SceneLevels);
        scenes.push(new SceneFlags);
        scenes.push(new SceneOverlay);
        scenes.push(new SceneLevelInfo);
        scenes.push(new SceneInfo);
        scenes.push(new ScenePromotion);
        scenes.push(new SceneResult);
        scenes.push(new ScenePause);
        this.game.stage.backgroundColor = 7829367;
        SceneBackground.instance.ShowAnimated();
        startMenu();
        game.onPause.add(this.onGamePause, this);
        game.onResume.add(this.onGameResume, this);
        game.input.mouseWheel.callback = this.wheelCallback;
        onGameResize();
        dataMusic && soundManager.playMusic("menu")
    },
    wheelCallback: function(a) {
        SceneLevels.instance.grpScene.visible ? (SceneLevels.instance.dragInfo.maxScrollY = -(SceneLevels.instance.scrollGrp.children[BG_TILES - 1].height + SceneLevels.instance.scrollGrp.children[BG_TILES - 1].y) + game.height, 0 < a.deltaY ? SceneLevels.instance.moveScreenContent(-50) : 0 > a.deltaY && SceneLevels.instance.moveScreenContent(50)) : SceneFlags.instance.grpScene.visible ? (SceneFlags.instance.dragInfo.maxScrollY = -SceneFlags.instance.scrollGrp.height + .9 * game.height, 0 < a.deltaY ? SceneFlags.instance.moveScreenContent(-50) : 0 > a.deltaY && SceneFlags.instance.moveScreenContent(50)) : SceneProfile.instance.grpScene.visible &&
            (SceneProfile.instance.dragInfo.maxScrollY = -SceneProfile.instance.scrollGrp.height + .9 * game.height, 0 < a.deltaY ? SceneProfile.instance.moveScreenContent(-50) : 0 > a.deltaY && SceneProfile.instance.moveScreenContent(50))
    },
    update: function() {
        scenes.forEach(function(a) {
            "function" === typeof a.update && a.update()
        });
        particles && particles.update();
        game.time.physicsElapsed = (Date.now() - this.lastUpdate) / 1E3;
        __fps = Math.floor(1E3 / (Date.now() - this.lastUpdate));
        this.lastUpdate = Date.now()
    },
    updateTexts: function() {
        scenes.forEach(function(a) {
            "function" ===
            typeof a.updateTexts && a.updateTexts()
        })
    },
    onResolutionChange: function() {
        scenes.forEach(function(a) {
            if ("function" === typeof a.onResolutionChange) a.onResolutionChange()
        })
    },
    onGamePause: function() {
        LOG("onGamePause");
        scenes.forEach(function(a) {
            if ("function" === typeof a.onPause) a.onPause()
        });
        paused = !0
    },
    onGameResume: function() {
        LOG("onGameResume");
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = !0;
        game.scale.pageAlignVertically = !0;
        game.scale.setGameSize(resolutionX, resolutionY);
        game.scale.refresh();
        scenes.forEach(function(a) {
            if ("function" === typeof a.onResume) a.onResume()
        });
        paused = !1;
        soundManager.soundPlaying && soundManager.musicPlaying && !gameover && soundManager.playMusic(soundManager.actualMusic)
    },
    render: function() {
        scenes.forEach(function(a) {
            "function" === typeof a.render && a.render()
        })
    }
};

function startMenu() {
    SceneBackground.instance.ShowAnimated();
    SceneLogo.instance.ShowAnimated();
    SceneMenu.instance.ShowAnimated()
};
var resolutionX = maxGameResolution.x,
    resolutionY = maxGameResolution.y,
    languageLoaded = !1,
    isIOS = !1,
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) isIOS = !0;
var aspect = window.innerWidth / window.innerHeight,
    androidVersionString = getAndroidVersion(),
    androidVersionMajor = 4;
!1 !== androidVersionString && (androidVersionMajor = parseInt(getAndroidVersion(), 10));
var GAME_FONT = "gameFont";
4 > androidVersionMajor && (GAME_FONT = "arial");
var chromeVersion = null,
    bdBrowser = null,
    selectedRenderer = null,
    defaultBrowser40 = null;
try {
    chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10)
} catch (e$$1350) {}
try {
    bdBrowser = -1 < window.navigator.appVersion.indexOf("bdbrowser"), defaultBrowser40 = -1 < window.navigator.appVersion.indexOf("Version/4.0")
} catch (e$$1351) {}
selectedRenderer = Phaser.AUTO;
!Phaser.Device.desktop && (null != bdBrowser && 1 == bdBrowser || null != defaultBrowser40 && 1 == defaultBrowser40) && (selectedRenderer = Phaser.CANVAS);
var config = {
    width: resolutionX,
    height: resolutionY,
    renderer: Phaser.CANVAS,
    enableDebug: !0,
    forceSetTimeOut: !1
};
nameOfGame = "Chess Puzzle";
versions = {
    HTML: 0,
    ANDROID: 1
};
versionOfGame = ["2.0.0", "2.0.0"];
var game;

function phaserInit() {
    game = new Phaser.Game(config);
    game.state.add("SplashState", Splash);
    game.state.add("PreloadState", Preloader);
    game.state.add("GameState", GameState);
    game.state.start("SplashState");
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";

}
phaserInit();

function isPortrait() {
    switch (window.orientation) {
        case 0:
        case 180:
            return !0
    }
    return !1
}
RUNNING_ON_IOS || (document.addEventListener("touchstart", function(a) {
    a.preventDefault()
}), document.addEventListener("touchmove", function(a) {
    a.preventDefault()
}));
window.addEventListener("touchend", function() {
    if (null !== game) try {
        "running" !== game.sound.context.state && game.sound.context.resume()
    } catch (a) {}
}, !1);
window.addEventListener("contextmenu", function(a) {
    a.preventDefault()
});
document.addEventListener("keydown", function(a) {
    //a.preventDefault()
});
document.addEventListener("keyup", function(a) {
    //a.preventDefault()
});
window.onscroll = function() {
    window.scrollTo(0, 0)
};