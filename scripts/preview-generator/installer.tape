Output owncast-install.gif
Output owncast-install.mp4

Set Shell bash

Set BorderRadius 20
Set Width 1700
Set Height 1150
Set LineHeight 1.1
Set TypingSpeed 160ms

Set Theme { "name": "Whimsy", "black": "#12161d", "red": "#ff4b39", "green": "#42bea6", "yellow": "#ffc655", "blue": "#2386e2", "magenta": "#da9eff", "cyan": "#43c1be", "white": "#f0f3f8", "brightBlack": "#535178", "brightRed": "#ef6487", "brightGreen": "#5eca89", "brightYellow": "#fdd877", "brightBlue": "#65aef7", "brightMagenta": "#aa7ff0", "brightCyan": "#43c1be", "brightWhite": "#ffffff", "background": "#2d3748", "foreground": "#e2e8f0", "selection": "#3d3c58", "cursor": "#b3b0d6" }
Set Margin 40
Set MarginFill "#1c1a3b"
Set FontSize 30
Set BorderRadius 20
Set WindowBar Colorful
Set WindowBarSize 80

Set Framerate 60
Set PlaybackSpeed 1.2

Hide
Type@10ms "tmp_dir=$(mktemp -d -t ci-XXXXXXXXXX) && cd $tmp_dir"
Enter
Type@10ms "pwd"
Enter
Type@10ms "clear"
Enter
Show

Sleep 2
Type@200ms "curl -s https://owncast.online/install.sh | bash"
Sleep 1
Enter
Sleep 5
Type "cd owncast"
Enter
Type "./owncast"
Enter
Sleep 4
Enter
Type@220ms "# And now you're ready to stream!"
Sleep 9