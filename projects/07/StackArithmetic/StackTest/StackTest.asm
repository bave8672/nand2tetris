// Compiled VM code -> hack
// init SP
@256
D=A
@SP
M=D
// StackTest.vm:8 push constant 17
@17
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:9 push constant 17
@17
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:10 eq
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@EQ.0.true
D;JEQ
(EQ.0.false)
@SP
A=M
M=0
@EQ.0.end
0;JMP
(EQ.0.true)
@SP
A=M
M=-1
(EQ.0.end)
@SP
AM=M+1
// StackTest.vm:11 push constant 17
@17
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:12 push constant 16
@16
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:13 eq
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@EQ.1.true
D;JEQ
(EQ.1.false)
@SP
A=M
M=0
@EQ.1.end
0;JMP
(EQ.1.true)
@SP
A=M
M=-1
(EQ.1.end)
@SP
AM=M+1
// StackTest.vm:14 push constant 16
@16
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:15 push constant 17
@17
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:16 eq
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@EQ.2.true
D;JEQ
(EQ.2.false)
@SP
A=M
M=0
@EQ.2.end
0;JMP
(EQ.2.true)
@SP
A=M
M=-1
(EQ.2.end)
@SP
AM=M+1
// StackTest.vm:17 push constant 892
@892
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:18 push constant 891
@891
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:19 lt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@LT.3.true
D;JLT
(LT.3.false)
@SP
A=M
M=0
@LT.3.end
0;JMP
(LT.3.true)
@SP
A=M
M=-1
(LT.3.end)
@SP
AM=M+1
// StackTest.vm:20 push constant 891
@891
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:21 push constant 892
@892
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:22 lt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@LT.4.true
D;JLT
(LT.4.false)
@SP
A=M
M=0
@LT.4.end
0;JMP
(LT.4.true)
@SP
A=M
M=-1
(LT.4.end)
@SP
AM=M+1
// StackTest.vm:23 push constant 891
@891
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:24 push constant 891
@891
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:25 lt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@LT.5.true
D;JLT
(LT.5.false)
@SP
A=M
M=0
@LT.5.end
0;JMP
(LT.5.true)
@SP
A=M
M=-1
(LT.5.end)
@SP
AM=M+1
// StackTest.vm:26 push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:27 push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:28 gt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@GT.6.true
D;JGT
(GT.6.false)
@SP
A=M
M=0
@GT.6.end
0;JMP
(GT.6.true)
@SP
A=M
M=-1
(GT.6.end)
@SP
AM=M+1
// StackTest.vm:29 push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:30 push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:31 gt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@GT.7.true
D;JGT
(GT.7.false)
@SP
A=M
M=0
@GT.7.end
0;JMP
(GT.7.true)
@SP
A=M
M=-1
(GT.7.end)
@SP
AM=M+1
// StackTest.vm:32 push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:33 push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:34 gt
@SP
AM=M-1
D=M
@SP
AM=M-1
D=M-D
@GT.8.true
D;JGT
(GT.8.false)
@SP
A=M
M=0
@GT.8.end
0;JMP
(GT.8.true)
@SP
A=M
M=-1
(GT.8.end)
@SP
AM=M+1
// StackTest.vm:35 push constant 57
@57
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:36 push constant 31
@31
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:37 push constant 53
@53
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:38 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// StackTest.vm:39 push constant 112
@112
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:40 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// StackTest.vm:41 neg
@SP
AM=M-1
M=-M
@SP
AM=M+1
// StackTest.vm:42 and
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D&M
@SP
AM=M+1
// StackTest.vm:43 push constant 82
@82
D=A
@SP
A=M
M=D
@SP
AM=M+1
// StackTest.vm:44 or
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D|M
@SP
AM=M+1
// StackTest.vm:45 not
@SP
AM=M-1
M=!M
@SP
AM=M+1
