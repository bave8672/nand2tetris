// Compiled VM code -> hack
// init SP
@256
D=A
@SP
M=D
// SimpleFunction.vm:7 function SimpleFunction.test 2
(SimpleFunction.test)
@0
D=A
@SP
A=M
M=D
@SP
AM=M+1
@0
D=A
@SP
A=M
M=D
@SP
AM=M+1
// SimpleFunction.vm:8 push local 0
@LCL
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// SimpleFunction.vm:9 push local 1
@LCL
D=M
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// SimpleFunction.vm:10 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// SimpleFunction.vm:11 not
@SP
AM=M-1
M=!M
@SP
AM=M+1
// SimpleFunction.vm:12 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// SimpleFunction.vm:13 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// SimpleFunction.vm:14 push argument 1
@ARG
D=M
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// SimpleFunction.vm:15 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// SimpleFunction.vm:16 return
@LCL
D=M
@R13
M=D
@5
A=D-A
D=M
@R14
M=D
@SP
AM=M-1
D=M
@ARG
A=M
M=D
@ARG
D=M+1
@SP
M=D
@R13
AM=M-1
D=M
@THAT
M=D
@R13
AM=M-1
D=M
@THIS
M=D
@R13
AM=M-1
D=M
@ARG
M=D
@R13
AM=M-1
D=M
@LCL
M=D
@R14
A=M
0;JMP
