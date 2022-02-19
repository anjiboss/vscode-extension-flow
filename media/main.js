// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

(function () {
  const vscode = acquireVsCodeApi();

  const testButton = /** @type {HTMLElement} */ (
    document.getElementById("click")
  );

  testButton.addEventListener("click", () => {
    console.log("clicked");
    const wsedit = new vscode.WorkspaceEdit();
    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
    const filePath = vscode.Uri.file(wsPath + "/hello/world.md");
    vscode.window.showInformationMessage(filePath.toString());
    wsedit.createFile(filePath, { ignoreIfExists: true });
    vscode.workspace.applyEdit(wsedit);
    vscode.window.showInformationMessage("Created a new file: hello/world.md");
  });
})();
