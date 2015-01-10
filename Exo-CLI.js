//exocli.js test by joedf 19:34 2015-01-09
//many thanks to Lexikos for StdOut/StdIn (2015-01-10)

var hCmd = DllCall("AllocConsole");

var StdOut = FileOpen("*", "w");
var StdIn = FileOpen("*", "r");
var StdErr = FileOpen("**", "w")

function print(t) {
    StdOut.Write(t);
    StdOut.__Handle; // Flush the buffer.
}

print("AutoHotkey v" + A_AhkVersion + " with Exo\n>> ");
for(;;) {
    var str = RTrim(StdIn.ReadLine(), "\r\n");
    if (str.toLowerCase() == "quit") {
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
			print(e.name+" : "+e.message);
		}
		print("\n");
	}
	print(">> ");
}

Sleep(1000);
ExitApp();