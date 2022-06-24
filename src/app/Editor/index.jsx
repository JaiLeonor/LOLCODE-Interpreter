import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "./Editor.css";

import "prismjs/components/prism-lolcode";
import "prismjs/themes/prism.css";

const hightlightWithLineNumbers = (input, language) =>
	highlight(input, language)
		.split("\n")
		.map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
		.join("\n");

function TextEditor({
	codeValue = `
HAI 1.2
VISIBLE "Hello, World!"
KTHXBYE
`,
	setCodeValue = () => {},
}) {
	function handleValueChange(code) {
		setCodeValue(code);
	}
	return (
		<div
			style={{
				maxHeight: "40vh",
				overflow: "auto",
			}}
		>
			<Editor
				value={codeValue}
				onValueChange={handleValueChange}
				highlight={(code) => hightlightWithLineNumbers(code, languages.lolcode)}
				padding={10}
				textareaId="codeArea"
				className="editor"
				style={{
					fontFamily: '"Fira code", "Fira Mono", monospace',
					fontSize: 12,
					outline: 0,
					background: "#fff",
				}}
			/>
		</div>
	);
}

export default TextEditor;
