import pandas as pd
import numpy as np

# read nouns and adjectives text file and make dataframes
nouns = pd.read_csv('physical_nouns.txt', header = None)
adjectives = pd.read_csv('adjectives.txt', header = None)

# make an unique dataframe with nouns and adjective, dropping last 4 rows
df = pd.concat([adjectives, nouns], axis=1).iloc[:-4]

# splitting dataframe in list of dataframes i.e. 180 rows in 9 df with 20 rows each
split = np.split(np.array(df),9)

# make an unique csv output file appending each dataframe with added columns and custom index
with open('sparks.csv','a', newline='') as f:
    for a in split:
        dfm = pd.DataFrame(data = a,
            index=list(map(str, list(range(1, 21)))), #set index to a numeric range from 1 to 20, mapping it into a list of strings
            columns=["Spark One", "Spark Two"] # naming custom columns
            )
        dfm.index.name = 'D20' # naming index column
        dfm.to_csv(f, sep=',') # write each dataframe to csv
        f.write("\r\n") # adding a blank row after each csv table