// Compiled VM code -> hack
// init SP
@256
D=A
@SP
A=D
// BasicTest.vm:7 push constant 10
@10
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:8 pop local 0
@LCL
A=M
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// BasicTest.vm:9 push constant 21
@21
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:10 push constant 22
@22
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:11 pop argument 2
@ARG
D=M
@2
A=D+A
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// BasicTest.vm:12 pop argument 1
@ARG
D=M
@1
A=D+A
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// BasicTest.vm:13 push constant 36
@36
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:14 pop this 6
@THIS
D=M
@6
A=D+A
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// BasicTest.vm:15 push constant 42
@42
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:16 push constant 45
@45
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:17 pop that 5
@THAT
D=M
@5
A=D+A
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// BasicTest.vm:18 pop that 2
@THAT
D=M
@2
A=D+A
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// BasicTest.vm:19 push constant 510
@510
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:20 pop temp 6
@11
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// BasicTest.vm:21 push local 0
@LCL
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:22 push that 5
@THAT
D=M
@5
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:23 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// BasicTest.vm:24 push argument 1
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
// BasicTest.vm:25 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// BasicTest.vm:26 push this 6
@THIS
D=M
@6
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:27 push this 6
@THIS
D=M
@6
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:28 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// BasicTest.vm:29 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// BasicTest.vm:30 push temp 6
@11
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicTest.vm:31 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
