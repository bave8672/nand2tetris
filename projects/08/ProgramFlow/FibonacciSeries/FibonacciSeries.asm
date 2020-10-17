// Compiled VM code -> hack
// init SP
@256
D=A
@SP
M=D
// FibonacciSeries.vm:11 push argument 1
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
// FibonacciSeries.vm:12 pop pointer 1           // that = argument[1]
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
// FibonacciSeries.vm:14 push constant 0
@0
D=A
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:15 pop that 0              // first element in the series = 0
@THAT
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
// FibonacciSeries.vm:16 push constant 1
@1
D=A
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:17 pop that 1              // second element in the series = 1
@THAT
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
// FibonacciSeries.vm:19 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:20 push constant 2
@2
D=A
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:21 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// FibonacciSeries.vm:22 pop argument 0          // num_of_elements -= 2 (first 2 elements are set)
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
// FibonacciSeries.vm:24 label MAIN_LOOP_START
(anonymous$MAIN_LOOP_START)
// FibonacciSeries.vm:26 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:27 if-goto COMPUTE_ELEMENT // if num_of_elements > 0, goto COMPUTE_ELEMENT
@SP
AM=M-1
D=M
@anonymous$COMPUTE_ELEMENT
D;JNE
// FibonacciSeries.vm:28 goto END_PROGRAM        // otherwise, goto END_PROGRAM
@anonymous$END_PROGRAM
0;JMP
// FibonacciSeries.vm:30 label COMPUTE_ELEMENT
(anonymous$COMPUTE_ELEMENT)
// FibonacciSeries.vm:32 push that 0
@THAT
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:33 push that 1
@THAT
D=M
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:34 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// FibonacciSeries.vm:35 pop that 2              // that[2] = that[0] + that[1]
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
// FibonacciSeries.vm:37 push pointer 1
@THAT
D=M
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:38 push constant 1
@1
D=A
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:39 add
@SP
AM=M-1
D=M
@SP
AM=M-1
M=D+M
@SP
AM=M+1
// FibonacciSeries.vm:40 pop pointer 1           // that += 1
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
// FibonacciSeries.vm:42 push argument 0
@ARG
A=M
D=M
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:43 push constant 1
@1
D=A
@SP
A=M
M=D
@SP
AM=M+1
// FibonacciSeries.vm:44 sub
@SP
AM=M-1
D=M
@SP
AM=M-1
M=M-D
@SP
AM=M+1
// FibonacciSeries.vm:45 pop argument 0          // num_of_elements--
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
// FibonacciSeries.vm:47 goto MAIN_LOOP_START
@anonymous$MAIN_LOOP_START
0;JMP
// FibonacciSeries.vm:49 label END_PROGRAM
(anonymous$END_PROGRAM)
