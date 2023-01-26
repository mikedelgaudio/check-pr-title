# Check-PR-Title

This action checks if the title of a PR matches the configured regex.

## Usage

- `checkPrTitle`: enable or disable Regex check for PR titles
- `regexPattern`: regex pattern to match against PR titles, must start with / and end in /

```yaml
name: "Check-PR-Title"
on:
  pull_request:
    types: [opened, edited, ready_for_review]

jobs:
  Check-PR-Title:
    runs-on: ubuntu-latest
    steps:
      - name: Check PR Title
        uses: mikedelgaudio/check-pr-title@main
        with:
          checkPrTitle: true #REQUIRED DEFAULT
          regexPattern: "/^(HRO-.{3,})|(HROIMP-.{3,})$/" # REQUIRED must start and end with /
```

## After setup, example PR title

```markdown
HRO-XYZ Fixing Things
```
