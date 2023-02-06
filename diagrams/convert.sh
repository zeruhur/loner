read -p "Enter filename : " file
cd ..
cd assets/sketchviz-master/
node sketch.js ../../diagrams/$file.dot ../../diagrams/$file.svg
cd ..
cd ..
cd diagrams/
inkscape --actions="select-by-element:text;object-to-path" --export-area-drawing --export-background=white  --export-filename=$file.png --export-width=2000 $file.svg