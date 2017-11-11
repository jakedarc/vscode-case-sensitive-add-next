# vscode-case-sensitive-add-next README

This extension adds a keybinding for "Case-Sensitive Add Next Occurrence" (either Ctrl+Shift+D or Cmd+Shift+D by default) that acts like the default Ctrl/Cmd+D but is always case-sensitive. It's pretty quick and dirty; I just needed to write something to do this to keep myself sane working with Code. I personally remapped it to Cmd+D and don't use the default functionality at all but I didn't want to presume that everyone installing the extension would want to do that.

## Features

See description. There's not much to it. :)

## Requirements

VSCode >= 1.1.0

## Extension Settings

Nothing aside from its keybinding.

## Known Issues

- None at present.

## Release Notes

### 0.0.6

- Fixed issue with special characters affecting selections

### 0.0.5

- Focuses primary selection when no others are found (again matching existing command).

### 0.0.4

- Using command when selections don't have matching content now does nothing (like existing Add Next Occurrence command).
- New selections now get focus if they're outside of the current view.

### 0.0.3

- Fix for behavior when multiple selections exist that have different content.
- Changed default keybinding so it doesn't clobber existing Add Next Occurrence command.

### 0.0.2

- Fixed extension only selecting instances after the last selected instance.

### 0.0.1

- Initial release!
