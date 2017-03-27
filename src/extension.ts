'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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
        let selections = editor.selections.slice(0);
        let selectionsInOrder = editor.selections.sort(sortSelections);
        let selectionBeforeCurrent;
        let selectionAfterCurrent;

        while (match = regex.exec(fullText)) {
            // Get the position of the match
            let startPos = editor.document.positionAt(match.index);
            let endPos = editor.document.positionAt(match.index + match[0].length);

            // If it's currently selected, skip it
            if (selections.find(selection => selection.start.isEqual(startPos))) {
                continue;
            }

            // We'll record the first match that pops up before the current selections
            // and use it if no unselected matches exist after the current selections
            if (startPos.isBefore(selectionsInOrder[0].start)) {
                if (!selectionBeforeCurrent) selectionBeforeCurrent = new vscode.Selection(startPos, endPos);
                continue;
            }

            selectionAfterCurrent = new vscode.Selection(startPos, endPos);
            break;
        }

        if (selectionAfterCurrent) {
            selections.push(selectionAfterCurrent);
        } else if (selectionBeforeCurrent) {
            selections.push(selectionBeforeCurrent);
        }

        if (selections.length > editor.selections.length) {
            selections.reverse();
            editor.selections = selections;
        }

        return;
    });

    context.subscriptions.push(disposable);
}

function sortSelections(a: vscode.Selection, b: vscode.Selection) {
    if (a.start.isBefore(b.start)) return -1;
    if (a.start.isAfter(b.start)) return 1;
    if (a.start.isEqual(b.start)) return 0;
}

export function deactivate() {
}