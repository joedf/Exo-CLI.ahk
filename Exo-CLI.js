//exocli.js test by joedf 19:34 2015-01-09

var hCmd = DllCall("AllocConsole");
function print(t) {
	h = DllCall("GetStdHandle", "UInt", -11, "UPtr");
	return DllCall("WriteConsole", "UPtr", h, "Str", t, "UInt", StrLen(t), "UInt*", 0, "UInt", 0);
}
function getch() {
	//return DllCall("msvcrt.dll\_getch","int"); //not working ...
	var k = Input("L1","{BackSpace}{Enter}{Up}{Down}{Left}{Right}");
	var e = ErrorLevel;
	if (InStr(e,"EndKey:") != 0) {
		return e;
	} else {
		return k;
	}
}

print("AutoHotkey v" + A_AhkVersion + " with Exo\n>> ");

var StackHistory = [];
var StackHistoryPos = 0;
var CurrentLine = "";
var CurrentPos = 0;

for(;;) {
	var key = getch();
	if (InStr(key,"Enter") != 0) {
		if (InStr(CurrentLine,"Quit") != 0) {
			print("\nOk. Goob bye!");
			break;
		}
		if (StrLen(Trim(CurrentLine))) {
			print("\n");
			StackHistory.push(CurrentLine);
			StackHistoryPos = StackHistory.length;
			try {
				var eval_start = (new Date()).getTime();
				eval(CurrentLine);
				var eval_end = (new Date()).getTime();
				var eval_diff = (eval_end - eval_start);
				//Show execution time
				//print("\nExecution time : " + (eval_diff/1000) + ' seconds');
			} catch( e ) {
				print(e.name+" : "+e.message);
			}
		}
		print("\n>> ");
		CurrentLine = "";
	} else {
		if (SubStr(key,1,7) == "EndKey:") {
			var k = SubStr(key,8);
			switch(k) {
				case "Backspace":
					if (StrLen(CurrentLine) >= 1) {
						print("\b \b");
						CurrentLine = StringTrimRight(CurrentLine,1);
						CurrentPos-=1;
					}
					break;
				case "Up":
					if (StackHistoryPos >0) {
						for(i=0;i<CurrentPos;i++) {
							print("\b")
						}
						StackHistoryPos-=1;
						CurrentLine=StackHistory[StackHistoryPos];
						print(">> "+CurrentLine);
						CurrentPos=StrLen(CurrentLine);
					} else if (StackHistory.length < 1) {
						print("\nError : No lines currently in StackHistory[]\n>> ");
					}
					break;
				case "Down":
					break;
				case "Left":
					//print("\b");
					break;
				case "Right":
					break;
				default:
					print('\nUnsupported key : "'+k+'"\n>> ');
			}
		} else {
			CurrentLine = CurrentLine + key;
			print(key);
			CurrentPos += 1;
		}
	}
}

Sleep(1000);
ExitApp();