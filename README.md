feeds-proxy
===========

#### Installation et lancement

##### Installer les outils Node
```Shell
$ sudo npm install -g grunt-cli`
$ sudo npm install -g bower
$ sudo npm install -g pm2
```

##### Installer les dépendances Node
```Shell
$ npm install
```

##### Installer les dépendances web
```Shell
$ bower install
```

Lancer l'application en remplacant **nb** par le nombre d'instance souhaitée
```Shell
$ pm2 start app.js -i nb
```


#### Monitoring (avec PM2)

##### Monitorer l'ensemble des process
```Shell
$ pm2 monit
```

##### Arréter/Redémarer l'ensemble des process
```Shell
$ pm2 stop all
$ pm2 restart all
```

##### Arréter/Redémarer un process spécifique
```Shell
$ pm2 stop 0
$ pm2 restart 0
```

##### Plus
Pour plus d'information sur PM2, consulter la doc officielle
https://github.com/unitech/pm2

