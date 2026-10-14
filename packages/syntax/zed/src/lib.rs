// rat for zed: starts the language server for .rat and .rat.js. highlighting
// comes from the tree-sitter grammars in grammars/, this crate only knows how
// to launch rat-language-server.

use std::fs;
use zed_extension_api::{self as zed, LanguageServerId, LanguageServerInstallationStatus, Result};

const PACKAGE: &str = "@rat/language-server";
const SERVER: &str = "node_modules/@rat/language-server/node.js";

struct Rat {
    installed: bool,
}

impl Rat {
    // the server from npm, installed into the extension's work directory and
    // updated when a newer version is out
    fn installed_server(&mut self, id: &LanguageServerId) -> Result<String> {
        if self.installed && fs::metadata(SERVER).is_ok() {
            return Ok(SERVER.to_string());
        }

        zed::set_language_server_installation_status(id, &LanguageServerInstallationStatus::CheckingForUpdate);
        let latest = zed::npm_package_latest_version(PACKAGE)?;

        if zed::npm_package_installed_version(PACKAGE)?.as_deref() != Some(latest.as_str()) {
            zed::set_language_server_installation_status(id, &LanguageServerInstallationStatus::Downloading);
            zed::npm_install_package(PACKAGE, &latest)?;
        }

        self.installed = true;
        Ok(SERVER.to_string())
    }
}

impl zed::Extension for Rat {
    fn new() -> Self {
        Rat { installed: false }
    }

    fn language_server_command(&mut self, id: &LanguageServerId, worktree: &zed::Worktree) -> Result<zed::Command> {
        // a rat-language-server on the path wins: a checkout linked with npm link, a global install
        if let Some(path) = worktree.which("rat-language-server") {
            return Ok(zed::Command { command: path, args: vec!["--stdio".into()], env: vec![] });
        }

        let server = self.installed_server(id)?;
        let absolute = std::env::current_dir().map_err(|error| error.to_string())?.join(server);

        Ok(zed::Command {
            command: zed::node_binary_path()?,
            args: vec![absolute.to_string_lossy().into_owned(), "--stdio".into()],
            env: vec![],
        })
    }
}

zed::register_extension!(Rat);
