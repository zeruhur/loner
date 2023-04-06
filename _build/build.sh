for i in ../loner-ita.md ; do $(pandoc -f gfm -t html -o html/$(basename ${i} .md).html $i) ; done
pandoc -t html -o loner-ita.pdf -s html/*.html --toc --toc-depth=2 --css="style.css" --metadata-file=metadata_ita.yml --template=template_ita.html --pdf-engine=weasyprint
# pandoc -t rtf -o text/plerion.rtf -s html/*.html
rm html/*.html

for i in ../loner-en.md ; do $(pandoc -f gfm -t html -o html/$(basename ${i} .md).html $i) ; done
pandoc -t html -o loner-en.pdf -s html/*.html --toc --toc-depth=2 --css="style.css" --metadata-file=metadata_en.yml --template=template_en.html --pdf-engine=weasyprint
# pandoc -t rtf -o text/plerion.rtf -s html/*.html
rm html/*.html