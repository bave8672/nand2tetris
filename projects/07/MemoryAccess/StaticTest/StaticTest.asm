// Compiled VM code -> hack
// init SP
@256
D=A
@SP
M=D
// StaticTest.vm:7 push constant 111
@111
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StaticTest.vm:8 push constant 333
@333
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StaticTest.vm:9 push constant 888
@888
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StaticTest.vm:10 pop static 8
@StaticTest.vm.8
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// StaticTest.vm:11 pop static 3
@StaticTest.vm.3
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// StaticTest.vm:12 pop static 1
@StaticTest.vm.1
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// StaticTest.vm:13 push static 3
@StaticTest.vm.3
D=M
@SP
A=M
M=D
@SP
AM=M+1
// StaticTest.vm:14 push static 1
@StaticTest.vm.1
D=M
@SP
A=M
M=D
@SP
AM=M+1
// StaticTest.vm:15 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// StaticTest.vm:16 push static 8
@StaticTest.vm.8
D=M
@SP
A=M
M=D
@SP
AM=M+1
// StaticTest.vm:17 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
