@256
D=A
@SP
A=D
// SimpleAdd:7 push constant 7
@7
D=A
@SP
A=M
M=D
@SP
AM=M+1
// SimpleAdd:8 push constant 8
@8
D=A
@SP
A=M
M=D
@SP
AM=M+1
// SimpleAdd:9 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
