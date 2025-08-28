import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    const snippetsPath = path.join(context.extensionPath, 'snippets', 'htmlSnippets.code-snippets');
    
    if (fs.existsSync(snippetsPath)) {
        const snippets = JSON.parse(fs.readFileSync(snippetsPath, 'utf8'));
        const disposable = vscode.languages.registerCompletionItemProvider('html', {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const completionItems: vscode.CompletionItem[] = [];
                for (const [key, value] of Object.entries(snippets)) {
                    const item = new vscode.CompletionItem(value.prefix, vscode.CompletionItemKind.Snippet);
                    item.insertText = new vscode.SnippetString(value.body.join('\n'));
                    item.documentation = value.description;
                    completionItems.push(item);
                }
                return completionItems;
            }
        });

        context.subscriptions.push(disposable);
    }
}

export function deactivate() {}