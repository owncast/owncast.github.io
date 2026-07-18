Output owncast-install.mp4

Set Shell bash

Set BorderRadius 20
Set Width 1920
Set Height 1080
Set LineHeight 1.1
Set TypingSpeed 120ms

Set Theme { "name": "Terminal", "black": "#000000", "red": "#c91b00", "green": "#00c200", "yellow": "#c7c400", "blue": "#2225c4", "magenta": "#ca30c7", "cyan": "#00c5c7", "white": "#c7c7c7", "brightBlack": "#686868", "brightRed": "#ff6e67", "brightGreen": "#5ffa68", "brightYellow": "#fffc67", "brightBlue": "#6871ff", "brightMagenta": "#ff77ff", "brightCyan": "#60fdff", "brightWhite": "#ffffff", "background": "#0e0e0e", "foreground": "#c7c7c7", "selection": "#3a3d41", "cursor": "#c7c7c7" }
Set Margin 40
Set MarginFill "#101010"
Set FontSize 28
Set BorderRadius 20
Set WindowBar Colorful
Set WindowBarSize 80

Set Framerate 60

Hide
Type@10ms "tmp_dir=$(mktemp -d -t ci-XXXXXXXXXX) && export HOME=$tmp_dir && cd"
Enter
Type@10ms "PS1='\[\e[01;32m\]owncast@stream.gingervitis.net\[\e[0m\]:\[\e[01;34m\]\w\[\e[0m\]\$ '"
Enter
Type@10ms "clear"
Enter
Show

Sleep 0.6
Type@0ms "curl -s https://owncast.online/install.sh | bash"
Sleep 0.545
Enter
Sleep 6
Type "cd owncast"
Enter
Sleep 0.4
Type "./owncast"
Enter
Sleep 8