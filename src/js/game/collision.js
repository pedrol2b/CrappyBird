         // checks if two entities are touching
        FB.Collides = function (bird, pipe) {
		
			if(bird.vy >=370){				  
				 
				 return true;
			}
            if (pipe.coin && bird.vx > pipe.centerX + pipe.w / 2 - 5) {
                pipe.coin = false;
                FB.score.coins += 1;
				FB.digits = FB.score.coins.toString().split('');
                FB.Audio.play(FB.Audio.sounds.score);
            }

            var bx1 = bird.vx - bird.width / 2;
            var by1 = bird.vy - bird.height / 2;
            var bx2 = bird.vx + bird.width / 2;
            var by2 = bird.vy + bird.height / 2;

            var upx1 = pipe.centerX;
            var upy1 = 0;
            var upx2 = pipe.centerX + pipe.w;
            var upy2 = pipe.centerY - 50;


            var lpx1 = pipe.centerX;
            var lpy1 = pipe.centerY + 50;
            var lpx2 = upx2;
            var lpy2 = pipe.h;

            var c1 = !(bx1 > upx2 ||
                bx2 < upx1 ||
                by1 > upy2 ||
                by2 < upy1)
            var c2 = !(bx1 > lpx2 ||
                bx2 < lpx1 ||
                by1 > lpy2 ||
                by2 < lpy1)

            return (c1 || c2)

        };
