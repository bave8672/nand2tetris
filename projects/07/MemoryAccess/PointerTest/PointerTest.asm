// Compiled VM code -> hack
// init SP
@256
D=A
@SP
M=D
// PointerTest.vm:8 push constant 3030
@3030
D=A
@SP
A=M
M=D
@SP
AM=M+1
// PointerTest.vm:9 pop pointer 0
@THIS
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// PointerTest.vm:10 push constant 3040
@3040
D=A
@SP
A=M
M=D
@SP
AM=M+1
// PointerTest.vm:11 pop pointer 1
@THAT
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// PointerTest.vm:12 push constant 32
@32
D=A
@SP
A=M
M=D
@SP
AM=M+1
// PointerTest.vm:13 pop this 2
@THIS
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
// PointerTest.vm:14 push constant 46
@46
D=A
@SP
A=M
M=D
@SP
AM=M+1
// PointerTest.vm:15 pop that 6
@THAT
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
// PointerTest.vm:16 push pointer 0
@THIS
D=M
@SP
A=M
M=D
@SP
AM=M+1
// PointerTest.vm:17 push pointer 1
@THAT
D=M
@SP
A=M
M=D
@SP
AM=M+1
// PointerTest.vm:18 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// PointerTest.vm:19 push this 2
@THIS
D=M
@2
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// PointerTest.vm:20 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// PointerTest.vm:21 push that 6
@THAT
D=M
@6
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// PointerTest.vm:22 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
