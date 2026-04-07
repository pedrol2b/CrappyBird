         //sounds

        var soundJump = new Audio("assets/audio/wing.ogg");
        var soundScore = new Audio("assets/audio/point.ogg");
        var soundHit = new Audio("assets/audio/hit.ogg");
        var soundDie = new Audio("assets/audio/die.ogg");
        var soundSwoosh = new Audio("assets/audio/swooshing.ogg");
         //http://www.storiesinflight.com/html5/audio.html
        var channel_max = 10; // number of channels
        audiochannels = new Array();
        for (a = 0; a < channel_max; a++) { // prepare the channels
            audiochannels[a] = new Array();
            audiochannels[a]['channel'] = new Audio(); // create a new audio object
            audiochannels[a]['finished'] = -1; // expected end time for this channel
        }

        function play_sound(s) {
            for (a = 0; a < audiochannels.length; a++) {
                thistime = new Date();
                if (audiochannels[a]['finished'] < thistime.getTime()) { // is this channel finished?
                    audiochannels[a]['finished'] = thistime.getTime() + s.duration * 1000;
                    audiochannels[a]['channel'].src = s.src;
                    audiochannels[a]['channel'].load();
                    audiochannels[a]['channel'].play();
                    break;
                }
            }
        }
