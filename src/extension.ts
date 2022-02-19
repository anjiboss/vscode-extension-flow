import * as vscode from "vscode";
// import { HelloWorldPanel } from "./HelloWorldPanel";
import { makeDirSync, makeFileSync } from "./Utils";

export function activate(context: vscode.ExtensionContext) {
  // context.subscriptions.push(
  //   vscode.commands.registerCommand("todo.helloWorld", () => {
  //     HelloWorldPanel.createOrShow(context.extensionUri);
  //   })
  // );
  context.subscriptions.push(
    vscode.commands.registerCommand("todo.askQuestion", async () => {
      if (vscode.workspace.workspaceFolders) {
        const answer = await vscode.window.showInputBox({
          placeHolder: "folder name",
          prompt: "enter folder name..",
        });
        if (answer) {
          console.log(vscode.workspace.workspaceFolders[0].uri.fsPath);
          const resutl = makeDirSync(
            `${vscode.workspace.workspaceFolders[0].uri.fsPath}/${answer}`
          );
          if (resutl) {
            makeFileSync(
              `${vscode.workspace.workspaceFolders[0].uri.fsPath}/${answer}/test.ts`
            );
          }
        }
      } else {
        vscode.window.showInformationMessage("No Workspace");
      }
      vscode.workspace.onDidChangeWorkspaceFolders((e) => {
        console.log("workspace event", e);
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("todo.getCurrentFile", async () => {
      if (vscode.workspace.workspaceFolders !== undefined) {
        let wf = vscode.workspace.workspaceFolders[0].uri.path;
        let f = vscode.workspace.workspaceFolders[0].uri.fsPath;

        const message = `YOUR-EXTENSION: folder: ${wf} - ${f}`;
        console.log(vscode.window.activeTextEditor?.document.uri.fsPath);

        vscode.window.showInformationMessage(message);
      } else {
        const message =
          "YOUR-EXTENSION: Working folder not found, open a folder an try again";

        vscode.window.showErrorMessage(message);
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
