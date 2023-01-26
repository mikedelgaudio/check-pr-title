import * as core from "@actions/core";
const { getOctokit, context } = require("@actions/github");

function isValidRegexPattern(regex) {
  if (!isValidString(regex)) return false;
  const SLASH_REGEX_PATTERN = /^\/.+\/$/;
  const SLASH_REGEX = new RegExp(SLASH_REGEX_PATTERN, "g");
  if (!SLASH_REGEX.test(regex)) return false;
  return true;
}

function isValidString(string) {
  if (!string) return false;
  if (typeof string !== "string") return false;
  if (string.length === 0) return false;
  if (!string.trim().length) return false;
  return true;
}

async function run() {
  try {
    // Acquire GitHub Token
    // const token = core.getInput("GITHUB_TOKEN", { required: true });
    // const octokit = getOctokit(token);

    // Acquire booleans from user's YAML workflow config
    const checkPrTitle = core.getBooleanInput("checkPrTitle", {
      required: true,
    });
    const regexPattern = core.getInput("regexPattern", {
      required: true,
    });
    core.debug(JSON.stringify(context.payload));

    if (!checkPrTitle) return;

    if (!isValidRegexPattern(regexPattern)) {
      core.setFailed(
        "Invalid regex pattern provided in YAML config. You must be a valid string starting with a / and ending with /. Please review your regex pattern."
      );
      return;
    }

    // Ignore dependabot PRs
    const prAuthor = context.payload.pull_request.user.login.toLowerCase();
    if (prAuthor === "dependabot[bot]") return;

    // Acquire PR title
    const PR_TITLE = context.payload.pull_request.title;
    if (!isValidString(PR_TITLE)) {
      core.setFailed(
        "PRs should have a message or body, add a description before proceeding to help the other developers."
      );
      return;
    }

    const REGEX = new RegExp(regexPattern, "g");

    // Ensure the PR Title meets regex pattern
    if (!REGEX.test(PR_TITLE)) {
      core.setFailed(
        `Invalid PR title. Please ensure your PR title matches the desired configuration pattern expected: ${regexPattern}`
      );
      return;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
