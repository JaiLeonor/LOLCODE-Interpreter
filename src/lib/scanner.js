// const lexemes = {
//   //Start and End
//   HAIlex: "HAI",
//   HAIdesc: "Indicates the start of the program",
//   KTHXBYElex: "KTHXBYE",
//   KTHXBYEdesc: "Indicates the end of the program",

//   //Comment
//   BTWlex: "BTW",
//   BTWdesc: "Indicates the start of a single line comment",
//   OBTWlex: "OBTW",
//   OBTWdesc: "Indicates the start of a multi line comment",
//   TLDRlex: "TLDR",
//   TLDRdesc: "Indicates the end of a multi line comment",

//   //Declaration and Assignment
//   IHASAlex: "I HAS A",
//   IHASAdesc: "",
//   ITZlex: "ITZ",
//   ITZdesc: "",
//   Rlex: "R",
//   Rdesc: "",

//   //Operations and Comparisons
//   SUMOFlex: "SUM OF",
//   SUMOFdesc: "",
//   DIFFOFlex: "DIFF OF",
//   DIFFOFdesc: "",
//   PRODUKTOFlex: "PRODUKT OF",
//   PRODUKTOFdesc: "",
//   QUOSHUNTOFlex: "QUOSHUNT OF",
//   QUOSHUNTOFdesc: "",
//   MODOFlex: "MOD OF",
//   MODOFdesc: "",
//   BIGGROFlex: "BIGGR OF",
//   BIGGROFdesc: "",
//   SMALLROFlex: "SMALLR OF",
//   SMALLROFdesc: "",
//   BOTHOFlex: "BOTH OF",
//   BOTHOFdesc: "",
//   EITHEROFlex: "EITHER OF",
//   EITHEROFdesc: "",
//   WONOFlex: "WON OF",
//   WONOFdesc: "",
//   NOTlex: "NOT",
//   NOTdesc: "",
//   ANYOFlex: "ANY OF",
//   ANYOFdesc: "",
//   ALLOFlex: "ALL OF",
//   ALLOFdesc: "",
//   BOTHSAEMlex: "BOTH SAEM",
//   BOTHSAEMdesc: "",
//   DIFFRINTlex: "DIFFRINT",
//   DIFFRINTdesc: "",
//   ANlex: "AN",
//   ANdesc: "",
  
//   SMOOSHlex: "SMOOSH",
//   SMOOSHdesc: "",
//   MAEKlex: "MAEK",
//   MAEKdesc: "",
//   Alex: "A",
//   Adesc: "",
//   ISNOWAlex: "IS NOW A",
//   ISNOWAdesc: "",

//   //Literals and Delimeters
//   COMMENTdesc: "Comment",
//   VARIABLEdesc: "Variable",
//   NUMBRdesc: "Integer literal",
//   NUMBARdesc: "Float literal",
//   YARNdesc: "String literal",
//   YARNDELIMETER: "\"",
//   YARNDELIMETERdesc: "String delimeter",
// }

const regex = {
  VARIDENT: /^\D\S*/,
  VARDEC: /I HAS A \D\S+ (ITZ "?.+"?)?/,
  NUMBR: /[0-9]+/,
  NUMBAR: /[0-9]+\.[0-9]+/,
  YARN: /".*"/,
  WIN: /WIN/,
  FAIL: /FAIL/,
  TYPE: /NOOB|TROOF|YARN|NUMBR|NUMBAR/,
  VISIBLE: /VISIBLE /
}

let lexemeTable = []

const sample = "HAI 1.2\nI HAS A food ITZ \"111.00033\"\nVISIBLE food\nBTW this is how we do type casting\nMAEK food A NUMBAR\nVISIBLE food\nKTHXBYE"

lines = sample.split('\n')

for(let i = 0; i < lines.length; i++) {
  if(i == 0 && lines[i].match(/HAI/)) lexemeTable.push(["HAI", "Indicates the start of the program"])
  else if(i == lines.length - 1 && lines[i].match(/KTHXBYE/)) lexemeTable.push(["KTHXBYE", "Indicates the end of the program"])
  else {
    if(lines[i].match(regex.VARDEC)) {
      lexemeTable.push(["I HAS A", "Variable declaration"])
      let arg = lines[i].slice("I HAS A ".length).split(' ')
      for(let j = 0; j < arg.length; j++) {
        if(arg[j].match(/ITZ/)) lexemeTable.push([arg[j], "Assigns a value to a newly declared variable"])
        else if(arg[j].match(regex.NUMBR)) lexemeTable.push([arg[j], "Integer literal"])
        else if(arg[j].match(regex.NUMBAR)) lexemeTable.push([arg[j], "Float literal"])
        else if(arg[j].match(regex.YARN)) {
          let str = arg[j].substring(1, arg[j].length - 1)
          lexemeTable.push(["\"", "String delimeter"])
          lexemeTable.push([str, "String literal"])
          lexemeTable.push(["\"", "String delimeter"])
        }
        else lexemeTable.push([arg[j], "Variable"])
      }
    }
    // else if(lines[i].match())
  }
}

console.log(lexemeTable)