# Git

## Configurations

#### Configure the merge tool

1. Install [MeldMerge](http://meldmerge.org/)
2. Configure at terminal:
```
git config --global merge.tool meld
```
3. **For Windows**, add this:
```
git config --global mergetool.meld.path "C:\Program Files (x86)\Meld\Meld.exe"
```

#### Define push to current branch
```
git config --global push.default current
```

#### Define colors to git
```
git config --global color.branch auto
git config --global color.diff auto
git config --global color.status auto
```

#### Doesn't keep unwanted orig files in Merge tool
```
git config --global mergetool.keepBackup false
```

### Git alias

```
vim ~./.gitconfig
```

```
[alias]
lg = log --oneline --decorate --graph --all -n100
st = status -vsb
totalCommits = shortlog -s -n --all
```
