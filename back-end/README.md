# Setup

For the setup of the application we need to download the [CORD-19 dataset](https://www.semanticscholar.org/cord19).</br>
Unzip and move `document_parses` folder, as well as `metadata.csv` into `back-end/import/` so that the folder structure looks like this:</br>
         
    back-end
    ├── ...
    ├── import                   
    │   ├── import.js          
    │   ├── metadata.csv         
    │   └── document_parses
    │         ├── pdf_json
    │         └── pmc_json
    └── ...
         
Additionaly mongod has to be running, before we can go on to import data.

## Inside **back-end** folder:

* `npm install` to download dependencies

* `node --max-old-space-size=5000 ./import/import.js` to import data into MongoDB.</br>
**Important note:** The default memory of NodeJS will not suffice for the import of the dataset, because of the length of some texts. I managed to decrease the memory requirements considerably by using a stream to parse the JSON files. Still, it is necessary to adjust Node's old-space-size as shown in the command above (has been tested with 5000MB and works fine). Please be patient while importing. The operation for the full dataset (~200.000 csv lines, ~90.000 full texts) usually takes around 12 minutes.

## To run:

* `node server` inside back-end folder