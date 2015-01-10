//exocli.js test by joedf 23:38 2015-01-09 EST time
//many thanks to Lexikos for StdOut/StdIn (2015-01-09)

var CmdTitle = "AutoHotkey v"+A_AhkVersion+" "+(A_IsUnicode?"Unicode":"ANSI")+" "+(A_PtrSize*8)+"-bit"+" with Exo";
var CmdPrompt = ">> ";

var hCmd = DllCall("AllocConsole");

var StdOut = FileOpen("*", "w");
var StdIn = FileOpen("*", "r");
var StdErr = FileOpen("**", "w");

function print(t) {
    StdOut.Write(t);
    StdOut.__Handle; // Flush the buffer.
}

DllCall("SetConsoleTitle","Str",CmdTitle);
print(CmdTitle+"\nType 'Quit', 'Exit' or 'ExitApp()' to exit.\n"+CmdPrompt);

for(;;) {
    var str = RTrim(StdIn.ReadLine(), "\r\n");
    if ( (str.toLowerCase() == "quit") || (str.toLowerCase() == "exit") ) {
        print("\nOk. Good bye!");
        break;
    } else if (StrLen(Trim(str))) {
		try {
			//var eval_start = (new Date()).getTime();
			eval(str);
			//var eval_end = (new Date()).getTime();
			//var eval_diff = (eval_end - eval_start);
			//Show execution time
			//print("Execution time : " + (eval_diff/1000) + ' seconds');
		} catch( e ) {
			StdErr.Write(e.name+" : "+e.message);
			StdErr.__Handle;
		}
		print("\n");
	}
	print(CmdPrompt);
}

Sleep(1000);
ExitApp();