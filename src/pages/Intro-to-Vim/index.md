---
title: "Intro to Vim" 
date: "2019-01-31T23:46:37.121Z"
---
This blog is about introduction to one of the coolest, highly configurable text editor for efficiently creating and changing any kind of text i.e ```Vim```.

## Why to use Vim 
> Learning to drive a car takes effort. 
> Is that a reason to keep driving your bicycle? No, you realize you need to invest time to learn a skill.
> Text editing isn’t different.
> You need to learn new commands and turn them into a habit.

 *- Bram Moolenaar*

- It's fast
- I don't need to remember
- Light on fingers
- persistent, multi-level undo tree
- extensive plugin system
- support for hundreds of programming languages and file formats
- powerful search and replace
- integrates with many tools


### History
[Bram Moolenaar](https://en.wikipedia.org/wiki/Bram_Moolenaar) began working on *Vim* in 1988 for a company called [Amiga](https://www.amigaos.net/). He published first public release of Vim in 1991. 
The name *Vim* is an acronym for **VI improved** because *Vim* is an extended version of [vi](https://en.wikipedia.org/wiki/Vi) editor. It was built with the aim of adding some additional features designed to help in source code editing. 

### Interface of Vim
Vim is based on text user interface and like other text editors, it also has a GUI mode, [gVim](http://vimdoc.sourceforge.net/htmldoc/gui.html#GUI). Vim has a built-in tutorial for beginners(```vimtutor``` command). Vim also has a built-in facility (```:help``` command) which allow the user to search, explore and query commands.

### A little Walk-through of Vim

#### Starting Vim
``` 
    vim <file name>
    vim +NUM <file-name>
    vim +/{pattern} <file-name>
    vim +cmd or -c cmd <file-name>
```

#### Exiting Vim 
- In normal mode
    - ```:q!```               Quit Vim without saving the changes to the file.
    - ```ZQ```                Same as :q! Quits Vim without writing changes
- Or 
    - ```Ctrl + z```          To send vim back in background
    - ``` $fg```              To get back in vim

#### Save
- ```:w```                    Save the file
- ```:w new_name```           Save the file with the new_name filename
- ```:wq```                   Save the file and quit Vim.
- ```ZZ```                    Write file, if modified, and quit Vim

#### Special inserts
- ```:r [filename]```         Insert the file [filename] below the cursor
- ```:r ![command]```         Execute [command] and insert its output below the cursor
     
#### Delete text
- ```x```                             delete the character at cursor
- ```dw```                            delete a word.
- ```d0```                            delete to the beginning of a line.
- ```d$```                            delete to the end of a line.
- ```d)```                            delete to the end of the sentence.
- ```dgg```                           delete to the beginning of the file.
- ```dG```                            delete to the end of the file.
- ```dd```                            delete line
- ```3dd```                           delete three lines
     
#### Simple replace text
- ```r{text}```                       Replace the character under the cursor with {text}
- ```R```                             Replace characters instead of inserting them
     
#### Copy/Paste text
- ```yy```                            copy current line into storage buffer
- ```p```                             paste storage buffer after current line
- ```P```                             paste storage buffer before current line
     
#### Undo/Redo operation
- ```u```                             undo the last operation.
- ```Ctrl+r```                        redo the last undo.
     
#### Search and Replace keys
- ```/search_text```                  search document for search_text going forward
- ```?search_text```                  search document for search_text going backwards
- ```n```                             move to the next instance of the result from the search
- ```N```                             move to the previous instance of the result
- ```:%s/original/replacement```      Search for the first occurrence of the string “original” and replace it with “replacement”
- ```:%s/original/replacement/g```    Search and replace all occurrences of the string “original” with “replacement”
- ```:%s/original/replacement/gc```   Search for all occurrences of the string “original” but ask for confirmation before replacing them with “replacement”

#### Navigation keys
- ```h```                             moves the cursor one character to the left.
- ```j or Ctrl + J```                 moves the cursor down one line.
- ```k or Ctrl + P```                 moves the cursor up one line.
- ```l```                             moves the cursor one character to the right.
- ```0```                             moves the cursor to the beginning of the line.
- ```$```                             moves the cursor to the end of the line.
- ```^```                             moves the cursor to the first non-empty character of the line
- ```w```                             move forward one word (next alphanumeric word)
- ```W```                             move forward one word (delimited by a white space)
- ```5w```                            move forward five words
- ```b```                             move backward one word (previous alphanumeric word)
- ```B```                             move backward one word (delimited by a white space)
- ```5b```                            move backward five words
- ```G```                             move to the end of the file
- ```gg```                            move to the beginning of the file.

#### Modes
- Normal Mode
- Insert Mode
- Command Mode
- Visual Mode

##### Insert Mode -> Normal Mode
- ```Esc```     Normal Mode
- ```Ctrl [```  Same as above


#### Auto Completion
You can start from a built-in omnifunc setting.
Just put:
```
filetype plugin on
au FileType php setl ofu=phpcomplete#CompletePHP
au FileType ruby,eruby setl ofu=rubycomplete#Complete
au FileType html,xhtml setl ofu=htmlcomplete#CompleteTags
au FileType c setl ofu=ccomplete#CompleteCpp
au FileType css setl ofu=csscomplete#CompleteCSS
```
on the bottom of your .vimrc, then type <Ctrl-X><Ctrl-O> in insert mode.

### NeoVim
[NeoVim](https://neovim.io/) also quoted as **Literally the future of Vim** is known for the cool and awesome features.
- Powerful
    The Nvim msgpack API enables structured communication to and from any programming language. Remote plugins run as co-processes that communicate with Neovim safely and asynchronously.
- Usable
    - Strong defaults
    - Works the same everywhere: one build-type, one command
    - Modern terminal features such as cursor styling, focus events, bracketed paste
    - Built-in terminal emulator
- Embeddable
    GUIs and other applications can nvim --embed to discover the msgpack API dynamically.
- Drop-in Vim
    Neovim is an extension of Vim: feature-parity and backwards-compatibility are high priorities. If you already use Vim, see :help nvim-from-vim.

#### Other features

 And below are some of the simple and elegant commands used to indent lines quickly in Vim or gVim.

- ```gg=G```    The master of all commands is. This indents the entire file!

- ```==```      To indent the current line
    
- ```=G```      To indent all the lines below the current line

- ```n==```     To indent n lines below the current line

- ```=%```      To indent a block of code, go to one of the braces and use the command
    
These are the simplest, yet powerful commands to indent multiple lines.


#### [CheatSheet](https://vim.rtorr.com/)
