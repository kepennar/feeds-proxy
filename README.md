feeds-proxy
===========

![Screenshot](https://raw.githubusercontent.com/kepennar/feeds-proxy/master/doc/feeds-proxy-index.png?raw=true "Screenshot")

http://kepennar-proxy-feeds.herokuapp.com/

#### Installation et lancement

##### Installer les outils Node
```shell
$ sudo npm install -g grunt-cli`
$ sudo npm install -g bower
$ sudo npm install -g pm2
```

##### Installer les dépendances Node
```shell
$ npm install
```

##### Installer les dépendances web
```shell
$ bower install
```

Lancer l'application en remplacant **nb** par le nombre d'instance souhaitée
```shell
$ pm2 start app.js -i nb
```
#### Vérifier le bon fonctionnement
Se rendre sur l'index de l'application



#### Monitoring (avec PM2)

##### Monitorer l'ensemble des process
```shell
$ pm2 monit
```

##### Arréter/Redémarer l'ensemble des process
```shell
$ pm2 stop all
$ pm2 restart all
```

##### Arréter/Redémarer un process spécifique
```shell
$ pm2 stop 0
$ pm2 restart 0
```

##### Plus
Pour plus d'information sur PM2, consulter la doc officielle
https://github.com/unitech/pm2

