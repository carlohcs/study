# DevOps

## Minhas dependências e objetos de desenvolvimento

### Sumário

* [Sistema Operacional](#sistema-operacional)
* [Servidor e dependências](#servidor-e-depend-ncias)
* [IDEs](#ides)
* [Browsers](#browsers)
* [Scripts e automatizações](./scripts-automatizacoes/README.md)

### Sistema Operacional

#### Linux Ubuntu - 15.10 (versão atual)
  * Gnome-shell (apt://gnome-shell) `Substitui o gerenciador de janelas Unity`
  * [Cairo-Dock](http://glx-dock.org) `Adiciona barra de aplicativos na parte inferior da tela`
  * [Drop Down Terminal](https://github.com/zzrough/gs-extensions-drop-down-terminal)
  * [Drop Down Terminal](extragear.kde.org/apps/yakuake/)
  * Nemo File Manager(apt://nemo) `Substitui o gerenciador de arquivos`
    * Para instalar
    ```
    sudo add-apt-repository ppa:noobslab/nemo
    sudo apt-get update
    sudo apt-get install nemo
    ```
    * Para definir como gerenciador de arquivos padrão
    ```
    xdg-mime default nemo.desktop inode/directory application/x-gnome-saved-search
    gsettings set org.gnome.desktop.background show-desktop-icons false
    gsettings set org.nemo.desktop show-desktop-icons true
    ```
    * Extensões para usar com o gerenciador
    ```
    sudo apt-get install nemo-compare nemo-audio-tab nemo-emblems nemo-filename-repairer nemo-fileroller nemo-gtkhash nemo-image-converter nemo-media-columns nemo-pastebin python-nemo nemo-rabbitvcs nemo-seahorse nemo-share nemo-terminal
    ```

#### Coisas a se fazer após instalar o Linux Ubuntu

##### Desabilitar buscas online do dash

```
sudo apt-get install unity-tweak-tool
```

Configurar shell para visualizar - Tweak-tool - alternar para slideDown


##### Mostrar o username no painel

```
gsettings set com.canonical.indicator.session show-real-name-on-panel true
```

##### Instalar o Adobe Flash Player plugin

```
sudo apt-get install flashplugin-installer
```

##### Integrar contas online no Ubuntu

Ir em **Configurações** > **Contas online** e configurar. (Verificar se possui algum script para isso)

* Ferramentas/Tweaks para o gerenciamento de energia do Laptop

```
sudo apt-get install laptop-mode-tools
```

##### Desabilitar a reportagem do System Crash (aquelas mensagens de erro que aparecem quando há erro)

```
sudo gedit /etc/default/apport
```

No editor, **"enabled=1"** mude para **"enabled=0"**. Salve e feche o arquivo.

##### Instalar extras restritos

```
sudo apt-get install ubuntu-restricted-extras
```

##### Codecs e habilitar reprodução de DVD

```
sudo apt-get install ffmpeg gstreamer0.10-plugins-ugly gxine libdvdread4 icedax tagtool easytag id3tool lame libxine2-ffmpeg nautilus-script-audio-convert libmad0 mpg321 libavcodec-extra gstreamer1.0-libav
```

Para habilitar a repodução de DVD

```
sudo /usr/share/doc/libdvdread4/install-css.sh
```

##### Ferramentas de Compressão/Descompressão

```
sudo apt-get install p7zip-rar p7zip-full unace unrar zip unzip sharutils rar uudeview mpack arj cabextract file-roller
```

#### Bash

* [Melhorias no bash](http://unix.stackexchange.com/questions/127799/how-can-i-get-my-ps1-prompt-to-show-time-user-host-directories-and-git-branch)

```
vim ~/.bashrc


```

Variação:

```
HOST='\033[02;36m\]\h'
HOST=' '$HOST
parse_git_branch () { git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'; }
TIME='\033[01;31m\]\t \033[01;32m\]'
LOCATION=' \033[01;34m\]`pwd | sed "s#\(/[^/]\{1,\}/[^/]\{1,\}/[^/]\{1,\}/\).*\(/[^/]\{1,\}/[^/]\{1,\}\)/\{0,1\}#\1_\2#g"`'
BRANCH=' \033[00;33m\]$(parse_git_branch)\[\033[00m\]\n\$ '
PS1=$TIME$USER$HOST$LOCATION$BRANCH
PS2='\[\033[01;36m\]>'
```

Para ter isso

![Image](http://i.stack.imgur.com/2XbDD.png)

Gist no Github: https://gist.github.com/carlohcs/c0091ed009e36e51e6ef

Outras opções:

[http://mediadoneright.com/content/ultimate-git-ps1-bash-prompt](http://mediadoneright.com/content/ultimate-git-ps1-bash-prompt)

#### Show Git options

Press "[tab][tab]" twice to view the commands disponibles.


#### Vim

Tips:

http://vim.wikia.com/wiki/

##### Outros

* [Top Things and Tweaks to do after install of Ubuntu 15.10 Wily Werewolf](http://www.noobslab.com/2015/10/top-things-and-tweaks-to-do-after.html)

### Servidor e dependências

##### PHP / Apache / MySQL

```
sudo apt-get install lamp-server^
sudo apt-get install phpmyadmin
sudo ln -s /usr/share/phpmyadmin /var/www
sudo apt-get autoremove
sudo chown -R carlohcs /var/www
chmod -R 755 /var/www
```

Para o PHPMyAdmin funcionar, é necessário incluí-lo nas configurações do apache.

```
echo "Include /etc/phpmyadmin/apache.conf" >>  /etc/apache2/apache2.conf
sudo service apache2 restart
```

##### Node.js

Node.js v4:

```
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Node.js v5:

```
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Padrão Ubuntu:

```
sudo apt-get install nodejs
```

##### NPM

```
sudo apt-get install npm
```

##### Bower

```
npm install bower -g
```

If this error appears when `node -v` is executed at terminal:

```
/usr/bin/env: node: No such file or directory
```

Run this command in terminal:

```
ln -s /usr/bin/nodejs /usr/bin/node
```

Para que alguns pacotes do npm funcionem (tais como aqueles que requerem compilação do fonte), você precisará instalar o pacote build-essentials:

```
sudo apt-get install build-essential
```

##### Gulp [Automatização de tarefas]

```
npm install --global gulp-cli
```

### IDEs

##### Sublime-text

Para Sublime-Text-2:

```
sudo add-apt-repository ppa:webupd8team/sublime-text-2
sudo apt-get update
sudo apt-get install sublime-text
```

Para Sublime-Text-3:

```
sudo add-apt-repository ppa:webupd8team/sublime-text-3
sudo apt-get update
sudo apt-get install sublime-text-installer
```

##### Atom

Ambos 32/64 Bits:

```
sudo add-apt-repository ppa:webupd8team/atom
sudo apt-get update
sudo apt-get install atom
```

###### Extensões/Plugins

* [open-in-browsers](https://atom.io/packages/open-in-browsers)
* [git-plus](https://atom.io/packages/git-plus)
* [highlight-selected](https://atom.io/packages/highlight-selected)


### GIT

* **Mergetool** - [Meld](http://meldmerge.org/)
```
sudo apt-get install meld
```

##### Configs

Configurate the mergetool

```
git config --global merge.tool meld
```

### Browsers

##### Google Chrome

```
sudo vim /etc/apt/sources.list
deb http://dl.google.com/linux/chrome/deb/ stable main
sudo apt-get update
sudo apt-get install google-chrome-stable
```

##### Mozilla FireFox

```
sudo add-apt-repository ppa:ubuntu-mozilla-security/ppa
sudo apt-get update
sudo apt-get install firefox
```
