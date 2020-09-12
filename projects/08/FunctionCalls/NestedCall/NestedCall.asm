// Compiled VM code -> hack
// init SP
@256
D=A
@SP
A=D
// Call Sys.init()
@return-address.0
D=A
@SP
A=M
M=D
@SP
AM=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
AM=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
AM=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
AM=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
AM=M+1
@SP
D=M
@5
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Sys.init
0;JMP
(return-address.0)
// Sys.vm:8 function Sys.init 0
(Sys.vm.Sys.init)
// Sys.vm:9 push constant 4000	// test THIS and THAT context save
@4000
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:10 pop pointer 0
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
// Sys.vm:11 push constant 5000
@5000
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:12 pop pointer 1
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
// Sys.vm:13 call Sys.main 0
@return-address.1
D=A
@SP
A=M
M=D
@SP
AM=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
AM=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
AM=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
AM=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
AM=M+1
@SP
D=M
@5
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Sys.main
0;JMP
(return-address.1)
// Sys.vm:14 pop temp 1
@6
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// Sys.vm:15 label LOOP
(Sys.vm.$LOOP)
// Sys.vm:16 goto LOOP
@Sys.vm.$LOOP
0;JMP
// Sys.vm:26 function Sys.main 5
(Sys.vm.Sys.main)
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
@0
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:27 push constant 4001
@4001
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:28 pop pointer 0
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
// Sys.vm:29 push constant 5001
@5001
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:30 pop pointer 1
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
// Sys.vm:31 push constant 200
@200
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:32 pop local 1
@LCL
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
// Sys.vm:33 push constant 40
@40
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:34 pop local 2
@LCL
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
// Sys.vm:35 push constant 6
@6
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:36 pop local 3
@LCL
D=M
@3
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
// Sys.vm:37 push constant 123
@123
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:38 call Sys.add12 1
@return-address.2
D=A
@SP
A=M
M=D
@SP
AM=M+1
@LCL
D=M
@SP
A=M
M=D
@SP
AM=M+1
@ARG
D=M
@SP
A=M
M=D
@SP
AM=M+1
@THIS
D=M
@SP
A=M
M=D
@SP
AM=M+1
@THAT
D=M
@SP
A=M
M=D
@SP
AM=M+1
@SP
D=M
@6
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Sys.add12
0;JMP
(return-address.2)
// Sys.vm:39 pop temp 0
@5
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// Sys.vm:40 push local 0
@LCL
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:41 push local 1
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
// Sys.vm:42 push local 2
@LCL
D=M
@2
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:43 push local 3
@LCL
D=M
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:44 push local 4
@LCL
D=M
@4
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:45 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// Sys.vm:46 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// Sys.vm:47 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// Sys.vm:48 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// Sys.vm:49 return
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
// Sys.vm:55 function Sys.add12 0
(Sys.vm.Sys.add12)
// Sys.vm:56 push constant 4002
@4002
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:57 pop pointer 0
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
// Sys.vm:58 push constant 5002
@5002
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:59 pop pointer 1
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
// Sys.vm:60 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:61 push constant 12
@12
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:62 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// Sys.vm:63 return
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
