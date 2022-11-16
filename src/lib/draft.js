if (this.tokens[0].description === "Start of the program") {
  //Check for mutiple HAIs
  if (this.start) this.errorMessage = `Duplicate HAI at line ${this.tokens[0].line}`;

  //Find KTHXBYE index
  const endIndex = this.tokens.findIndex(token => { return token.description === "End of program" });

  //If KTHXBYE is not found, send error
  if (!endIndex) this.errorMessage = "Expected KTHXBYE at end of file";

  //If KTHXBYE is in line with the token before it, send error
  if (this.tokens[endIndex - 1].line === this.tokens[endIndex].line) this.errorMessage = "Expected KTHXBYE at end of file";

  //Remove KTHXBYE and anything after it.
  for(let i = endIndex; i < this.tokens.length; i++)
    this.tokens.splice(i, 1);
  
  //Remove HAI from stack
  this.tokens.shift();
  
  this.start = true;
}
else if (this.tokens[0].description === "LOLCODE version")
  this.tokens.shift();
else if (this.tokens[0].description === "Variable declaration") {
  if (this.tokens[1].description !== "Variable identifier") this.errorMessage = `Expected identifier at line ${this.tokens[0].line}`;
  if (this.tokens[2].description !== "")
}