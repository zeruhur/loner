#read -p "Enter filename : " file
if [ ! -f ~/.fonts/PermanentMarker-Regular.ttf ]
then
    cp ../../assets/fonts/PermanentMarker-Regular.ttf ~/.fonts
fi
dir=$(pwd)
for file in *.dot
do
    filename=$(basename "$file")
    f=${filename%.*}
    cd ../../assets/sketchviz-master/
    node sketch.js $dir/$f.dot $dir/$f.svg
    cd ..
    cd ..
    cd $dir/
    inkscape --actions="select-by-element:text;object-to-path" --export-area-drawing --export-background=white  --export-filename=$f.png --export-width=2000 $f.svg
done