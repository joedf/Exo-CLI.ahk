﻿if (!A_IsCompiled) {
	Progress, 0, Reading Exo.ahk, Compiling Exo-CLI ...
	FileRead,d, % f:="Exo.ahk"
	Progress, 10, Backing Up Exo.ahk, Compiling Exo-CLI ...
	bkp:=d
	Progress, 20, Configuring Exo.ahk, Compiling Exo-CLI ...

	; Inject Exo-CLI code
	var_b:="FileRead, mainContent, %mainPath%"
	var_c:="if (!mainPath) {",rep_c:="`ngosub,loadExoCLI_values`n`nif (!mainPath) {"
	StringReplace,d,d,%var_b%
	StringReplace,d,d,%var_c%,%rep_c%
	
	FileDelete,%f%
	FileAppend,%d%,%f%
	Progress, 35, Calling Ahk2Exe, Compiling Exo-CLI ...
	regread,ahkdir,HKLM,SOFTWARE\AutoHotkey,InstallDir
	AhkCompiler:=ahkdir "\Compiler\Ahk2Exe.exe"
	bin:=ahkdir "\Compiler\Unicode 32-bit.bin"
	RunWait, %AhkCompiler% /in "%A_ScriptFullPath%" /out "%A_ScriptDir%\Exo-CLI.exe" /icon "%A_ScriptDir%\Resources\logo.ico" /mpress 1 /bin "%bin%",,UseErrorLevel
	if ErrorLevel
		MsgBox An Error occurred.
	Progress, 80, Restoring Exo.ahk, Compiling Exo-CLI ...
	FileDelete,%f%
	FileAppend,%bkp%,%f%
	Progress, 100, Done!, Compiling Exo-CLI ...
	Sleep,1000
	ExitApp
}
hRSrc := DllCall("FindResource", "ptr", 0, "str", "Exo-CLI.js", "ptr", 10, "ptr")
sData := DllCall("SizeofResource", "ptr", 0, "ptr", hRSrc, "uint")
hRes := DllCall("LoadResource", "ptr", 0, "ptr", hRSrc, "ptr")
pData := DllCall("LockResource", "ptr", hRes, "ptr")

main:=0
#NoTrayIcon
#Include Exo.ahk

return
FileInstall, Exo-CLI.js, NEVER

loadExoCLI_values:
	mainPath:=A_ScriptDir
	mainContent:=StrGet(pData,sData,"UTF-8")
	return