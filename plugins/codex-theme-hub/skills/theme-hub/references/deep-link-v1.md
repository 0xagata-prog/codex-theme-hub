# Website to Codex deep link v1

Use an explicit Skill invocation followed by a small structured request:

```text
$theme-hub
请安装并应用我选择的主题。
theme_hub_request={"version":"1","action":"install","themeId":"chalkboard-green","manifestUrl":"https://example.com/themes/chalkboard-green.json"}
要求：验证兼容性与完整性，创建恢复点，失败时不要改变当前主题。
```

Generate the URL in the browser with:

```js
const url = `codex://new?prompt=${encodeURIComponent(prompt)}`;
```

The deep link opens a new local Codex chat and pre-fills the composer. It does not send automatically. The user sending the prompt is the install intent boundary.

The standalone `theme-hub` Skill must already exist in the user's Skill directory. A deep link never installs the Skill; if `$theme-hub` is unavailable, direct the user to the website download and manual Skill installation flow. Plugin distribution remains deferred until a public listing exists.

## Installer handoff

The website may open a separate Codex task that asks Codex to install the Skill from the official GitHub Release. That prompt must not invoke `$theme-hub`, because the Skill is not installed yet. It must name the official repository and target directory, require source and archive inspection, disclose the files to be written, preserve or back up an existing installation, and wait for user confirmation. Treat this as guided installation, not silent one-click installation.

Do not add a local filesystem `path` to a public website link. Do not put package bytes, secrets, arbitrary instructions, or executable commands in the prompt.
