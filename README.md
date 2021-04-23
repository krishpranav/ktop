# ktop
A terminal based graphical activity monitor inspired by htop

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

How to install
---

If you haven't already got Node.js, then [go get it](http://nodejs.org/).

```
git clone https://github.com/krishpranav/ktop
cd ktop
npm install
node app.js
```
or you can run
```
npm install ktop
```
If you *really* like ktop, but your finger muscle memory means you keep typing 'top' then why not add an alias to ~/.bashrc.

```
alias top="ktop"
alias oldtop="/usr/bin/top"
```

Keyboard shortcuts
---

* Press 'u' to update to the latest version of ktop.
* Arrow up or k to move up the process list.
* Arrow down or j to move down.
* Arrow left or h to zoom the graphs in.
* Arrow right or l to zoom the graphs out.
* g to go to the top of the process list.
* G to move to the end of the list.
* dd to kill all the processes in that group

Mouse control
---

If your terminal supports mouse events (like iTerm) then
you can click on the items in the process list. As well as
use the scroll wheel. You can disable mouse control with
the `ktop --no-mouse` option.

Color Scheme
```
ktop --theme wizard
ktop --theme acid
```
