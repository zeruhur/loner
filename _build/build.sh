for i in ../loner-ita.md ; do $(pandoc -f gfm -t html -o html/$(basename ${i} .md).html $i) ; done
pandoc -t html -o loner-ita.pdf -s html/*.html --toc --toc-depth=2 --css="style.css" --metadata-file=metadata.yml --template=template.html --pdf-engine=weasyprint
# pandoc -t rtf -o text/plerion.rtf -s html/*.html
#rm html/*.html