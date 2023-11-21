import json
import os
import re


def get_file_names(directory: str) -> list[str]:
    """Returns the names of the files contained in the directory"""
    return [
        f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))
    ]


def update_webpack_config() -> None:
    """
    Update the entry of webpack.config.js (file name and path in src/commands)
    NOTE: Assuming that there is an entry property in webpack.config.js
    """
    file_names = get_file_names("./src/commands")
    entries = {name.split(".")[0]: f"./src/commands/{name}" for name in file_names}

    with open("webpack.config.js", "r", encoding="utf-8") as file:
        lines = file.readlines()

    entry_start_pattern = re.compile(r"^.*entry *: *{$ *")
    entry_end_pattern = re.compile(r"^.*} *, *$")

    for line_number, line in enumerate(lines):
        if entry_start_pattern.match(line):
            start = line_number
        elif entry_end_pattern.match(line):
            end = line_number
            # NOTE: Exit at the end of the entry object
            break

    entries_json = json.dumps(entries, indent=2)
    entries_json = "entry: " + entries_json
    entries_json += ","

    lines[start : end + 1] = entries_json

    with open("webpack.config.js", "w", encoding="utf-8") as file:
        file.writelines(lines)


if __name__ == "__main__":
    update_webpack_config()
