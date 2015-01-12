﻿var CmdVersion = function(){/*
	Exo-CLI.js by joedf
	Revision Date: 15:04 2015-01-12
	Many thanks to Lexikos for StdOut/StdIn
	Many thanks to Aurelain for [Exo](github.com/Aurelain/Exo)
*/}.toString().slice(15,-3);


var CmdTitle = "AutoHotkey v"+A_AhkVersion+" "+(A_IsUnicode?"Unicode":"ANSI")+" "+(A_PtrSize*8)+"-bit"+" with Exo";
var CmdPrompt = ">> ";

var hCmd = DllCall("AllocConsole");
var CmdPID = WinGet("PID","ahk_id "+GuiControlGet("Hwnd","wb"))

var StdOut = FileOpen("*", "w");
var StdIn = FileOpen("*", "r");
var StdErr = FileOpen("**", "w");

function print(t) {
    StdOut.Write(t);
    StdOut.__Handle; // Flush the buffer.
}
function System(t,lock) {
	if (typeof(lock)==='undefined')
		return RunWait(ComSpec+" /c "+t);
	else
		return Run(ComSpec+" /c "+t);
}
cmd = System; // alias

DllCall("SetConsoleTitle","Str",CmdTitle);
print(CmdTitle);
print("\nType 'Quit', 'Exit' or 'ExitApp()' to exit.");
print("\nEnd lines with ';' to evalute.");
print("\n\n"+CmdPrompt);
System(""); // bug that enables Mouse Scroll?!

var CmdPrompter = CmdPrompt;
var CmdStack = "";
for(;;) {
    var str = RTrim(StdIn.ReadLine(), "\r\n\t ");
	if (str.length > 0) {
		if ( (str.toLowerCase() == "quit") || (str.toLowerCase() == "exit") ) {
			print("\nOk. Good bye!");
			break;
		} else if (str.toLowerCase() == "clear") {
			System("cls");
		} else if (str.toLowerCase() == "version") {
			print("\n"+CmdVersion);
		} else {
			if (StringRight(str,1)==";") {
				CmdPrompter = "\n"+CmdPrompt;
				str = CmdStack + str; CmdStack = "";
				try {
					eval(str); // Execute code
				} catch( e ) {
					StdErr.Write(e.name+" : "+e.message);
					StdErr.__Handle;
				}
			} else { // allow continuing sections
				if (StringRight(str,1)=="\\")
					CmdStack = CmdStack + StringTrimRight(str,1) + "\\n";
				else
					CmdStack = CmdStack + str + "\n";
				CmdPrompter = Chr(192) + "> ";
			}
		}
	} else { CmdPrompter = CmdPrompt; }
	print(CmdPrompter);
}

Sleep(1000);
ExitApp();