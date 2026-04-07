        FB.Cloud = function (x, y) {

            this.x = x;
            this.y = y;
            this.r = 30;
            this.col = 'rgba(255,255,255,1)';
            this.type = 'cloud';
            // random values so particles do no
            // travel at the same speeds
            this.vx = -0.10;

            this.remove = false;

            this.update = function () {

                // update coordinates
                this.x += this.vx;
                if (this.x < (0 - 115)) {
                    this.respawn();
                }

            };


            this.render = function () {

                FB.Draw.circle(this.x + this.r, (this.y + this.r), this.r, this.col);
                FB.Draw.circle(this.x + 55, (this.y + this.r / 2), this.r / 0.88, this.col);
                FB.Draw.circle(this.x + 55, (this.y + this.r + 15), this.r, this.col);
                FB.Draw.circle(this.x + 85, (this.y + this.r), this.r, this.col);


            };

            this.respawn = function () {

                this.x = ~~ (Math.random() * this.r * 2) + FB.WIDTH;
                this.y = ~~ (Math.random() * FB.HEIGHT / 2)


            };

        };

        FB.BottomBar = function (x, y, r) {

            this.x = x;
            this.y = y
            this.r = r;
            this.vx = -1;
            this.name = 'BottomBar';

            this.update = function () {
                // update coordinates
                this.x += this.vx;
                if (this.x < (0 - this.r)) {
                    this.respawn();
                }
            };

            this.render = function () {
                FB.Draw.rect(this.x, this.y, this.r, 100, '#D2691E');
                for (var i = 0; i < 10; i++) {
                    FB.Draw.semiCircle(this.x + i * (this.r / 9), this.y, 20, '#050');
                }
            }

            this.respawn = function () {
                this.x = FB.WIDTH - 1;
            }

        }

        FB.Tree = function (x, y) {

            this.x = x;
            this.y = y
            this.r = 30;
            this.h = 50;
            this.w = this.r * 2;
            this.vx = -1;
            this.type = 'Tree';

            this.update = function () {
                // update coordinates
                this.x += this.vx;
                if (this.x < (0 - this.r * 2)) {
                    this.respawn();
                }
            };

            this.render = function () {

                //FB.Draw.rect(this.x, this.y, this.w, this.h, '#c20');
                FB.Draw.circle(this.x + this.r, (this.y + this.r) - 10, this.r, 'green', '#050');
                FB.Draw.circle(this.x + (this.r / 2), (this.y + this.r) - 10, this.r / 3, 'rgba(0,0,0,0.08)');
                FB.Draw.rect(this.x + this.r, this.y + this.r, 10, this.r, 'brown', '#d20');
            }

            this.respawn = function () {
                this.x = FB.WIDTH + this.r;
            }


        }

        FB.Pipe = function (x, w) {

            this.centerX = x;
            this.coin = true
            this.w = w;
            this.h = FB.HEIGHT - 150;
            this.vx = -1;
            this.type = 'pipe';


            this.update = function () {
                // update coordinates
                this.centerX += this.vx;
                if (this.centerX == (0 - this.w)) {
                    this.respawn();
                }
            };

            this.render = function () {

                if (this.coin) {
                    FB.Draw.circle(this.centerX + this.w / 2 - 5, this.centerY - 5, 5, "Gold")
                }
                FB.Draw.rect(this.centerX, 0, this.w, this.centerY - 50, '#8ED6FF');
                FB.Draw.rect(this.centerX, this.centerY + 50, this.w, this.h - this.centerY, '#8ED6FF');
            }

            this.respawn = function () {
                this.centerY = this.randomIntFromInterval(70, 220);
                this.centerX = 320 - this.w + 160;
                this.coin = true;
            }

            this.randomIntFromInterval = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            this.centerY = this.randomIntFromInterval(70, 220);
        }

        FB.Bird = function () {

            this.img = new Image();
            this.img.src = 'assets/images/bird.png';
            this.gravity = 0.25;
            this.width = 34;
            this.height = 24;
            this.ix = 0;
            this.iy = 0;
            this.fr = 0;
            this.vy = 180;
            this.vx = 70;
            this.velocity = 0;
            this.play = false;
            this.jump = -4.6;
            this.rotation = 0;
            this.type = 'bird';
            this.update = function () {
                if (this.fr++ > 5) {
                    this.fr = 0;
                    if (this.iy == this.height * 3) {
                        this.iy = 0
                    }
                    this.iy += this.height;
                }
                if (this.play) {
                    this.velocity += this.gravity;
                    this.vy += this.velocity;
                    if (this.vy <= 0) {
                        this.vy = 0;
                    }
                    if (this.vy >= 370) {
                        this.vy = 370;
                    }
                    this.rotation = Math.min((this.velocity / 10) * 90, 90);
                }
                if (FB.Input.tapped) {
                    this.play = true;
                    play_sound(soundJump);
                    this.velocity = this.jump;
                }
            };

            this.render = function () {

                FB.Draw.Sprite(this.img, this.ix, this.iy, this.width, this.height, this.vx, this.vy, this.width, this.height, this.rotation);
            }

        }

        FB.Particle = function (x, y, r, col, type) {

            this.x = x;
            this.y = y;
            this.r = r;
            this.col = col;
            this.type = type || 'circle';
            this.name = 'particle';

            // determines whether particle will
            // travel to the right of left
            // 50% chance of either happening
            this.dir = (Math.random() * 2 > 1) ? 1 : -1;

            // random values so particles do no
            // travel at the same speeds
            this.vx = ~~ (Math.random() * 4) * this.dir;
            this.vy = ~~ (Math.random() * 7);

            this.remove = false;

            this.update = function () {

                // update coordinates
                this.x += this.vx;
                this.y -= this.vy;

                // increase velocity so particle
                // accelerates off screen
                this.vx *= 0.99;
                this.vy *= 0.99;

                // adding this negative amount to the
                // y velocity exerts an upward pull on
                // the particle, as if drawn to the
                // surface
                this.vy -= 0.35;

                // offscreen
                if (this.y > FB.HEIGHT) {
                    this.remove = true;
                }

            };


            this.render = function () {
                if (this.type === 'star') {
                    FB.Draw.star(this.x, this.y, this.col);
                } else {
                    FB.Draw.circle(this.x, this.y, this.r, this.col);
                }
            };

        };
