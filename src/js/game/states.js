FB.States.Splash = function () {
  this.banner = new Image();
  this.banner.src = "assets/images/splash.png";

  this.init = function () {
    FB.Audio.play(FB.Audio.sounds.swoosh);
    FB.distance = 0;
    FB.bg_grad = "day";
    FB.entities = [];
    FB.score.taps = FB.score.coins = 0;
    //Add entities
    FB.entities.push(
      new FB.Entities.Cloud(30, ~~((Math.random() * FB.HEIGHT) / 2)),
    );
    FB.entities.push(
      new FB.Entities.Cloud(130, ~~((Math.random() * FB.HEIGHT) / 2)),
    );
    FB.entities.push(
      new FB.Entities.Cloud(230, ~~((Math.random() * FB.HEIGHT) / 2)),
    );
    for (var i = 0; i < 2; i += 1) {
      FB.entities.push(
        new FB.Entities.BottomBar(FB.WIDTH * i, FB.HEIGHT - 100, FB.WIDTH),
      );
    }
    FB.entities.push(
      new FB.Entities.Tree(~~(Math.random() * FB.WIDTH), FB.HEIGHT - 160),
    );
    FB.entities.push(
      new FB.Entities.Tree(~~(Math.random() * FB.WIDTH + 50), FB.HEIGHT - 160),
    );
    FB.entities.push(
      new FB.Entities.Tree(~~(Math.random() * FB.WIDTH + 100), FB.HEIGHT - 160),
    );
  };

  this.update = function () {
    for (var i = 0; i < FB.entities.length; i += 1) {
      FB.entities[i].update();
    }
    if (FB.Input.tapped) {
      FB.changeState("Play");
      FB.Input.tapped = false;
    }
  };

  this.render = function () {
    FB.Draw.Image(this.banner, 66, 100);
  };
};

FB.States.Play = function () {
  this.init = function () {
    FB.entities.push(new FB.Entities.Pipe(FB.WIDTH * 2, 50));
    FB.entities.push(new FB.Entities.Pipe(FB.WIDTH * 2 + FB.WIDTH / 2, 50));
    FB.entities.push(new FB.Entities.Pipe(FB.WIDTH * 3, 50));

    FB.bird = new FB.Entities.Bird();
    FB.entities.push(FB.bird);
    for (var n = 0; n < 10; n++) {
      var img = new Image();
      img.src = "assets/images/font_small_" + n + ".png";
      FB.fonts.push(img);
    }
    FB.digits = ["0"];
  };

  this.update = function () {
    FB.distance += 1;
    var levelUp = FB.distance % 2048 === 0 ? true : false;
    if (levelUp) {
      var bg = "day";
      var gradients = ["day", "dusk", "night", "dawn"];
      for (var i = 0; i < gradients.length; i++) {
        if (FB.bg_grad === gradients[i]) {
          if (i == gradients.length - 1) {
            bg = "day";
          } else {
            bg = gradients[i + 1];
          }
        }
      }
      FB.bg_grad = bg;
    }

    // if the user has tapped the screen
    if (FB.Input.tapped) {
      // keep track of taps; needed to
      // calculate accuracy
      FB.score.taps += 1;
    }

    // cycle through all entities and update as necessary
    for (var i = 0; i < FB.entities.length; i += 1) {
      FB.entities[i].update();
      if (FB.entities[i].type === "pipe") {
        var hit = FB.Collides(FB.bird, FB.entities[i]);
        if (hit) {
          FB.Audio.play(FB.Audio.sounds.hit);
          FB.changeState("GameOver");
          break;
        }
      }
    }
  };

  this.render = function () {
    //score
    var X = FB.WIDTH / 2 - (FB.digits.length * 14) / 2;
    for (var i = 0; i < FB.digits.length; i++) {
      FB.Draw.Image(FB.fonts[Number(FB.digits[i])], X + i * 14, 10);
    }
  };
};

FB.States.GameOver = function () {
  this.getMedal = function () {
    var score = FB.score.coins;
    var medal = "bronze";
    if (score <= 10) medal = "bronze";
    if (score >= 20) medal = "silver";
    if (score >= 30) medal = "gold";
    if (score >= 40) medal = "platinum";

    return medal;
  };
  this.getHighScore = function () {
    var savedscore = FB.Storage.getCookie("highscore");
    if (savedscore != "") {
      var hs = parseInt(savedscore) || 0;
      if (hs < FB.score.coins) {
        hs = FB.score.coins;
        FB.Storage.setCookie("highscore", hs, 999);
      }
      return hs;
    } else {
      FB.Storage.setCookie("highscore", FB.score.coins, 999);
      return FB.score.coins;
    }
  };
  this.init = function () {
    var that = this;
    setTimeout(function () {
      FB.Audio.play(FB.Audio.sounds.die);
      that.banner = new Image();
      that.banner.src = "assets/images/scoreboard.png";
      var m = that.getMedal();
      that.medal = new Image();
      that.medal.src = "assets/images/medal_" + m + ".png";
      that.replay = new Image();
      that.replay.src = "assets/images/replay.png";
      that.highscore = that.getHighScore();
    }, 500);
  };

  this.update = function () {
    if (FB.Input.tapped) {
      var x = FB.Input.x;
      var y = FB.Input.y;

      if (x >= 102.5 && x <= 102.5 + 115 && y >= 260 && y <= 260 + 70) {
        FB.changeState("Splash");
      }
      FB.Input.tapped = false;
    }
    FB.bird.update();
  };

  this.render = function () {
    if (this.banner) {
      FB.Draw.Image(this.banner, 42, 70);
      FB.Draw.Image(this.medal, 75, 183);
      FB.Draw.Image(this.replay, 102.5, 260);
      FB.Draw.text(FB.score.coins, 220, 185, 15, "black");
      FB.Draw.text(this.highscore, 220, 225, 15, "black");
    }
  };
};
