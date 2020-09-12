// Compiled VM code -> hack
// init SP
@256
D=A
@SP
A=D
// SimpleAdd.vm:7 push constant 7
@7
D=A
@SP
A=M
M=D
@SP
AM=M+1
// SimpleAdd.vm:8 push constant 8
@8
D=A
@SP
A=M
M=D
@SP
AM=M+1
// SimpleAdd.vm:9 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
