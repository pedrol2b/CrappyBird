FB.Audio.sounds = {
  jump: new Audio("assets/audio/wing.ogg"),
  score: new Audio("assets/audio/point.ogg"),
  hit: new Audio("assets/audio/hit.ogg"),
  die: new Audio("assets/audio/die.ogg"),
  swoosh: new Audio("assets/audio/swooshing.ogg"),
};

FB.Audio.channels = [];
FB.Audio.channelMax = 10;

for (var a = 0; a < FB.Audio.channelMax; a++) {
  FB.Audio.channels[a] = [];
  FB.Audio.channels[a].channel = new Audio();
  FB.Audio.channels[a].finished = -1;
}

FB.Audio.play = function (sound) {
  for (var i = 0; i < FB.Audio.channels.length; i++) {
    var now = new Date();
    if (FB.Audio.channels[i].finished < now.getTime()) {
      FB.Audio.channels[i].finished = now.getTime() + sound.duration * 1000;
      FB.Audio.channels[i].channel.src = sound.src;
      FB.Audio.channels[i].channel.load();
      FB.Audio.channels[i].channel.play();
      break;
    }
  }
};
