// Compiled VM code -> hack
// init SP
@256
D=A
@SP
M=D
// BasicLoop.vm:9 push constant 0    
@0
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicLoop.vm:10 pop local 0         // initializes sum = 0
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
// BasicLoop.vm:11 label LOOP_START
(anonymous$LOOP_START)
// BasicLoop.vm:12 push argument 0    
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicLoop.vm:13 push local 0
@LCL
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicLoop.vm:14 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// BasicLoop.vm:15 pop local 0	        // sum = sum + counter
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
// BasicLoop.vm:16 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicLoop.vm:17 push constant 1
@1
D=A
@SP
A=M
M=D
@SP
AM=M+1
// BasicLoop.vm:18 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// BasicLoop.vm:19 pop argument 0      // counter--
@ARG
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
// BasicLoop.vm:20 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// BasicLoop.vm:21 if-goto LOOP_START  // If counter > 0, goto LOOP_START
@SP
AM=M-1
D=M
@anonymous$LOOP_START
D;JNE
// BasicLoop.vm:22 push local 0
@LCL
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
