// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

    // darken if key is pressed, lighten otherwise
    @KBD
    D=M
    @DARKEN
    D;JNE
(LIGHTEN)
    // set a counter to the start of the screen memory
    @SCREEN
    D=A
    @i
    M=D
(LIGHTENLOOP)
    // exit when  we have reached the end of the screen
    @i
    D=M
    @KBD
    D=D-A
    @0
    D;JGE
    // lighten the current word
    @i
    A=M
    M=0;
    // increment i
    @i
    M=M+1
    // continue lighten loop
    @LIGHTENLOOP
    0;JMP
(DARKEN)
    // set a counter to the start of the screen memory
    @SCREEN
    D=A
    @i
    M=D
(DARKENLOOP)
    // exit when  we have reached the end of the screen
    @i
    D=M
    @KBD
    D=D-A
    @0
    D;JGE
    // darken the current word
    @0
    D=!A
    @i
    A=M
    M=D;
    // increment i
    @i
    M=M+1
    // continue darken loop
    @DARKENLOOP
    0;JMP
