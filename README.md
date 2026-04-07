CrappyBird
==========

Clone of Flappy Bird game in JavaScript and Canvas 2D

Run locally
----

- Windows: `start.bat`
- macOS/Linux: `sh start.sh`
- Custom host/port:
  - macOS/Linux: `HOST=0.0.0.0 PORT=3000 sh start.sh`
  - Windows (PowerShell): `$env:HOST='0.0.0.0'; $env:PORT='3000'; .\start.bat`

Project structure
----

- `index.html`: App entry point (minimal HTML shell)
- `src/js/game/`: Game logic split by concern (`core`, `states`, `entities`, `audio`, etc.)
- `src/js/game.js`: Legacy entry placeholder
- `src/css/styles.css`: Page styles
- `assets/images/`: Image assets
- `assets/audio/`: Audio assets
- `docs/screenshots/`: Project screenshots
- `scripts/serve.js`: Lightweight static server (Node.js)

License
----

This project is licensed under the MIT License. See `LICENSE`.

**Here are some screen shots**

![CrappyBird screenshot 1](docs/screenshots/SS1.PNG)
![CrappyBird screenshot 2](docs/screenshots/SS2.PNG)

![CrappyBird screenshot 3](docs/screenshots/SS3.PNG)
![CrappyBird screenshot 4](docs/screenshots/SS4.PNG)


Play it [here](http://varunpant.com/resources/CrappyBird/index.html)
