# Git

## Helpers and tips

### Bash

See the link above

* [Show current branch at shell](http://unix.stackexchange.com/questions/127799/how-can-i-get-my-ps1-prompt-to-show-time-user-host-directories-and-git-branch)

or
```
vim ~/.bashrc
```
And put this:
```
git_branch () { git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'; }

HOST='\[\033[02;36m\]\h'; HOST=' '$HOST
TIME='\[\033[01;31m\]\t \[\033[01;32m\]'
LOCATION=' \[\033[01;34m\]`pwd | sed "s#\(/[^/]\{1,\}/[^/]\{1,\}/[^/]\{1,\}/\).*\(/[^/]\{1,\}/[^/]\{1,\}\)/\{0,1\}#\1_\2#g"`'
BRANCH=' \[\033[00;33m\]$(git_branch)\[\033[00m\]\n\$ '
PS1=$TIME$USER$HOST$LOCATION$BRANCH
PS2='\[\033[01;36m\]>'
```

Will generate this:

![Image](http://i.stack.imgur.com/2XbDD.png)

To see more details, view the Gist: [https://gist.github.com/carlohcs/c0091ed009e36e51e6ef](https://gist.github.com/carlohcs/c0091ed009e36e51e6ef)

Another options

*  [http://mediadoneright.com/content/ultimate-git-ps1-bash-prompt](http://mediadoneright.com/content/ultimate-git-ps1-bash-prompt)

### Show Git options

Press "[tab][tab]" twice to view the commands disponibles.
