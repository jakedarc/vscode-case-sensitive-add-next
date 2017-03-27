'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "select-next-better" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.caseSensitiveAddNext', () => {

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }     

        let selection = editor.selection;
        let selectedText = editor.document.getText(selection);
        if (!selectedText) return;

        let regex = new RegExp(selectedText, 'g');
        
        let fullText = editor.document.getText();

        let match;
        let selections = editor.selections; // editor.selections is immutable, apparently
        
        while (match = regex.exec(fullText)) {
            let startPos = editor.document.positionAt(match.index);
            let endPos = editor.document.positionAt(match.index + match[0].length);

            if (!startPos.isAfter(editor.selection.start)) {
                continue;
            }

            selections.push(new vscode.Selection(startPos, endPos)); // We just want to add one selection per command

            break;
        }

        if (selections.length > editor.selections.length) selections.reverse();
        editor.selections = selections;

        return;
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}