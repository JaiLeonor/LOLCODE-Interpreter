import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import Editor from "./Editor";
import Button from "./Button";
import LexicalAnalyzer from "../lib/lexicalAnalyzer";
import SyntaxAnalyzer from "../lib/syntax-analyzer";
import SemanticAnalyzer from "../lib/semantic-analyzer";
import yungKayJai from "../lib/interpreter";

function readFileContent(file) {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onload = (event) => resolve(event.target.result);
		reader.onerror = (error) => reject(error);
		reader.readAsText(file);
	});
}

let symbolTable = [
	{
		variableName: "IT",
		type: null,
		value: null,
	},
];

function App() {
	const inputRef = useRef();
	// const [file, setFile] = useState(null);
	const [code, setCode] = useState(`HAI 1.2
	VISIBLE "Hello, World!"
KTHXBYE`);
	const [tokens, setTokens] = useState([]);

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
		const { tokens = [] } = lex.data();
		if (tokens && tokens.length > 0) {
			setTokens([...tokens]);
		}
	}

	function runSyntaxAnalyzer() {
		const syntaxAnalyzer = new SyntaxAnalyzer(code);
		console.log(syntaxAnalyzer.parse());
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
		runLexicalAnalyzer();
		runSyntaxAnalyzer();
		yungKayJai(tokens);
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
									<th>Type</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody style={{ padding: "5px" }}>
								{symbolTable.map((symbol, idx) => (
									<tr key={idx}>
										<td style={{ border: "1px solid #000" }}>
											{symbol.variableName}
										</td>
										<td style={{ border: "1px solid #000" }}>
											{JSON.stringify(symbol.type)}
										</td>
										<td style={{ border: "1px solid #000" }}>
											{JSON.stringify(symbol.value)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</header>
			<main className="exec">
				<Button onClick={execute}>Execute</Button>
				{/* exec button and interpreter run goes here */}
			</main>
		</div>
	);
}

export default App;
