#!/usr/bin/env node
/**
 * mjo-litui CLI
 * Theme customization and generation tools
 */

import { Command } from "commander";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createThemeCommand } from "../commands/create-theme.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(readFileSync(join(__dirname, "../../package.json"), "utf8"));
const program = new Command();

program.name("mjo-litui").description("mjo-litui theme and customization CLI").version(packageJson.version);

// Register commands
program.addCommand(createThemeCommand);

// Parse and execute
program.parse();
