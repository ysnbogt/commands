printf "" > commands.sh

for file in dist/*; do
  filename=$(basename -- "$file")
  extension="${filename##*.}"
  filename_without_extension="${filename%.*}"
  if [ "$extension" != "js" ]; then
    continue
  fi
  echo "alias $filename_without_extension=\"node $(pwd)/dist/$filename\"" >> commands.sh
done
