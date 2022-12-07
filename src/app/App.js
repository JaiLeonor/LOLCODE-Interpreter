import React, { useRef, useState } from "react";
import "./App.css";
import Editor from "./Editor";
import Button from "./Button";
import { LexicalAnalyzer } from "../lib/lexicalAnalyzer";
import { SyntaxAnalyzer } from "../lib/syntaxAnalyzer";
import { SemanticAnalyzer } from "../lib/semanticAnalyzer";

function readFileContent(file) {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onload = (event) => resolve(event.target.result);
		reader.onerror = (error) => reject(error);
		reader.readAsText(file);
	});
}

function App() {
	const inputRef = useRef();
	// const [file, setFile] = useState(null);
	const [code, setCode] = useState(`HAI 1.2
	VISIBLE "Hello, World!"
KTHXBYE`);
	const [tokens, setTokens] = useState([]);
	const [symbolTable, setSymbolTable] = useState({IT: null})
	const [terminal, setTerminal] = useState('');

	function triggerUpload() {
		if (inputRef && inputRef.current !== null) {
			// fix issue of not uploading the same file twice
			// just set the value of inputRef to null before triggering a click
			inputRef.current.value = null;
			inputRef.current.click();
		}
	}

	function runLexicalAnalyzer() {
		const lex = new LexicalAnalyzer(code);
		lex.run();
		return lex.data();
	}

	function runSyntaxAnalyzer(tokens) {
		const syntaxAnalyzer = new SyntaxAnalyzer([...tokens]);
		syntaxAnalyzer.run();
		return syntaxAnalyzer.data();
	}

	function runSemanticAnalyzer(tokens) {
		const semanticAnalyzer = new SemanticAnalyzer([...tokens]);
		semanticAnalyzer.run();
		return semanticAnalyzer.data()
	}

	async function handleFileUpload(e) {
		if (e.target.files.length === 0) return;
		const [file] = e.target.files;
		try {
			const content = await readFileContent(file);
			setCode(content);
		} catch (error) {
			console.log(error);
		}
	}

	function execute() {
		const lexer = runLexicalAnalyzer();
		if(lexer.error === "") {
			const syntax = runSyntaxAnalyzer([...lexer.tokens]);
			if(syntax.error === "") {
				const semantic = runSemanticAnalyzer([...lexer.tokens]);
				if(semantic.error === "") {
					setTokens([...lexer.tokens]);
					setSymbolTable({...semantic.symbolTable});
					setTerminal(semantic.output);
				}
				else {
					setTokens([...lexer.tokens]);
					setSymbolTable({...semantic.symbolTable});
					setTerminal(`${semantic.output}${semantic.error}`);
				}
			}
			else {
				setTokens([...lexer.tokens]);
				setTerminal(syntax.error);
			}
		}
		else {
			setTokens([...lexer.tokens]);
			setTerminal(lexer.error);
		}
	}

	function TerminalOutput(props) {
		const text = props.text;
		return text.split('\n').map(str => <p>{str}</p>)
	}

	return (
		<div className="App">
			<header className="header">
				{/* text editor here */}
				<div>
					<Button onClick={triggerUpload}>
						Click to upload your LOLCODE file
					</Button>
					<input
						type="file"
						hidden
						ref={inputRef}
						accept=".lol"
						onChange={handleFileUpload}
					/>
					<Editor codeValue={code} setCodeValue={setCode} />
				</div>

				{/* Lexemes table here */}
				<div style={{ maxHeight: "40vh", overflowY: "scroll" }}>
					{tokens.length > 0 && (
						<table
							style={{
								background: "white",

								border: "1px solid #000",
								borderSpacing: 0,
							}}
						>
							<thead style={{ background: "grey", padding: "5px" }}>
								<tr style={{ border: "1px solid #000" }}>
									<th>Lexeme</th>
									<th>Description</th>
									<th>line</th>
								</tr>
							</thead>
							<tbody style={{ padding: "5px" }}>
								{tokens.map((token, idx) => (
									<tr key={idx}>
										<td style={{ border: "1px solid #000" }}>{token.lexeme}</td>
										<td style={{ border: "1px solid #000" }}>
											{token.description}
										</td>
										<td style={{ border: "1px solid #000" }}>{token.line}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>

				{/* symbol table here */}
				<div style={{ maxHeight: "40vh", overflowY: "scroll" }}>
					{tokens.length > 0 && (
						<table
							style={{
								background: "white",

								border: "1px solid #000",
								borderSpacing: 0,
							}}
						>
							<thead style={{ background: "grey", padding: "5px" }}>
								<tr style={{ border: "1px solid #000" }}>
									<th>Variable Name</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody style={{ padding: "5px" }}>
								{Object.entries(symbolTable).map(([key, value]) => 
									<tr key = {key}>
										<td style={{ border: "1px solid #000" }}>
											{key}
										</td>
										<td style={{ border: "1px solid #000" }}>
											{value === null
												? "NOOB"
												: typeof value === 'boolean'
													? value ? "WIN" : "FAIL"
													: value
											}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</div>
			</header>
			<main className="exec">
				<Button onClick={execute}>Execute</Button>
				<div style = {{ height: "20px" }}></div>
				<div style = {{ background: "#000", width: "100%", height: "400px", color: "#FFF" }}>
					<TerminalOutput text={terminal}/>
				</div>
			</main>
		</div>
	);
}

export default App;
