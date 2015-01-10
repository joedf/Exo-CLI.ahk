// Exo-CLI.js by joedf 23:38 2015-01-09 EST time
// Many thanks to Lexikos for StdOut/StdIn (2015-01-09)

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
function System(t,lock) {
	if(typeof(lock)==='undefined') lock = true;
	if (lock)
		return RunWait(ComSpec+" /c "+t);
	else
		return Run(ComSpec+" /c "+t);
}
cmd = System; // alias

DllCall("SetConsoleTitle","Str",CmdTitle);
print(CmdTitle+"\nType 'Quit', 'Exit' or 'ExitApp()' to exit.\n"+CmdPrompt);
System(""); // bug that enables Mouse Scroll?!

for(;;) {
    var str = RTrim(StdIn.ReadLine(), "\r\n");
    if ( (str.toLowerCase() == "quit") || (str.toLowerCase() == "exit") ) {
        print("\nOk. Good bye!");
        break;
    } else if (StrLen(Trim(str))) {
		try {
			eval(str);
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