import pandas as pd
import numpy as np

df = pd.read_csv('list.txt', header = None)
div = 1 # number of group to divide the input
split = np.split(np.array(df),div)

with open('list.csv','a', newline='') as f:
    for a in split:
        m = a.reshape(6, 6)
        dfm = pd.DataFrame(data = m, index=["1", "2", "3", "4", "5", "6"], columns=["1", "2", "3", "4", "5", "6"])
        dfm.index.name = ''
        dfm.to_csv(f, sep=',')
        f.write("\r\n")
        #dfm.to_csv('names.csv', sep=',')
        #print(dfm)