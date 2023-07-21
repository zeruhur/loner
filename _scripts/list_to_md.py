import csv
import sys
import re

def csv_to_markdown(csv_data):
    markdown_table = []
    alignment_row = None

    for row in csv_data:
        if len(row) == 0:
            continue
        # Check if the row contains alignment information using regex
        align_match = re.match(r'^(:?-+:?)$', row[0].strip())
        if align_match:
            alignment_row = ['---' if align == ':' else '---:' for align in align_match.group(1).split('|')]
        else:
            markdown_table.append(row)

    if not alignment_row:
        return None

    # Create the Markdown table
    markdown_output = []
    for row in markdown_table:
        markdown_output.append('| ' + ' | '.join(row) + ' |')

    markdown_output.insert(1, '| ' + ' | '.join(alignment_row) + ' |')

    return '\n'.join(markdown_output) + '\n\n'

def main(input_file, output_file):
    with open(input_file, newline='') as txtfile:
        txt_content = txtfile.read()

    # Use regex to find each table (assuming tables are separated by a line with 3 or more commas)
    tables = re.split(r'^,,+[\r\n]+', txt_content, flags=re.MULTILINE)
    markdown_output = ""

    for table in tables:
        csv_data = list(csv.reader(table.strip().splitlines()))
        markdown_table = csv_to_markdown(csv_data)
        if markdown_table:
            markdown_output += markdown_table

    if markdown_output:
        with open(output_file, 'w') as mdfile:
            mdfile.write(markdown_output)
        print(f"Conversione completata. Tabelle Markdown salvate in {output_file}")
    else:
        print("Nessuna tabella valida trovata nel file di input.")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Utilizzo: python csv_to_markdown.py <file_input.txt> <file_output.md>")
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        main(input_file, output_file)
