import * as fs from "fs";
import * as vscode from "vscode";
import * as path from "path";

export const makeDirSync = (absolutePath: string) => {
  if (fs.existsSync(absolutePath)) {
    vscode.window.showErrorMessage("Folder already existed");
    return false;
  }
  // if (!fs.existsSync(path.dirname(absolutePath))) {
  //   makeDirSync(path.dirname(absolutePath));
  // }
  fs.mkdirSync(absolutePath);
  return true;
};

export const makeFileSync = (filename: string) => {
  if (!fs.existsSync(filename)) {
    // makeDirSync(path.dirname(filename));
    const file = fs.createWriteStream(filename);
    file.write("enity");
    file.close();
  }
};
