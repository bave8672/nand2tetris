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
// Class1.vm:7 function Class1.set 0
(Class1.vm.Class1.set)
// Class1.vm:8 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Class1.vm:9 pop static 0
@Class1.vm.0
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// Class1.vm:10 push argument 1
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
// Class1.vm:11 pop static 1
@Class1.vm.1
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// Class1.vm:12 push constant 0
@0
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Class1.vm:13 return
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
// Class1.vm:16 function Class1.get 0
(Class1.vm.Class1.get)
// Class1.vm:17 push static 0
@Class1.vm.0
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Class1.vm:18 push static 1
@Class1.vm.1
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Class1.vm:19 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// Class1.vm:20 return
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
// Class2.vm:7 function Class2.set 0
(Class2.vm.Class2.set)
// Class2.vm:8 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Class2.vm:9 pop static 0
@Class2.vm.0
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// Class2.vm:10 push argument 1
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
// Class2.vm:11 pop static 1
@Class2.vm.1
D=A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D
// Class2.vm:12 push constant 0
@0
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Class2.vm:13 return
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
// Class2.vm:16 function Class2.get 0
(Class2.vm.Class2.get)
// Class2.vm:17 push static 0
@Class2.vm.0
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Class2.vm:18 push static 1
@Class2.vm.1
D=M
@SP
A=M
M=D
@SP
AM=M+1
// Class2.vm:19 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// Class2.vm:20 return
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
// Sys.vm:8 function Sys.init 0
(Sys.vm.Sys.init)
// Sys.vm:9 push constant 6
@6
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:10 push constant 8
@8
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:11 call Class1.set 2
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
@7
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Class1.set
0;JMP
(return-address.1)
// Sys.vm:12 pop temp 0 // Dumps the return value
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
// Sys.vm:13 push constant 23
@23
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:14 push constant 15
@15
D=A
@SP
A=M
M=D
@SP
AM=M+1
// Sys.vm:15 call Class2.set 2
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
@7
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Class2.set
0;JMP
(return-address.2)
// Sys.vm:16 pop temp 0 // Dumps the return value
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
// Sys.vm:17 call Class1.get 0
@return-address.3
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
@Class1.get
0;JMP
(return-address.3)
// Sys.vm:18 call Class2.get 0
@return-address.4
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
@Class2.get
0;JMP
(return-address.4)
// Sys.vm:19 label WHILE
(Sys.vm.$WHILE)
// Sys.vm:20 goto WHILE
@Sys.vm.$WHILE
0;JMP
