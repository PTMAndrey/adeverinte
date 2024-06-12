import { useEffect, useState } from 'react'
import axios from 'axios'; // Import Axios

export default function FetchCSVData(props) {
    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        fetchCSVData();
    }, []);

    const fetchCSVData = () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1SJlAVCVtTXyHfcV6vmNEqUBr8BEGVzRuE3nrMh-FRaBIigpjqG77SpuhD0SPXFynExlQTR6E9ykk/pub?output=csv'; // Replace with your Google Sheets CSV file URL

        axios.get(csvUrl)
            .then((response) => {
                const parsedCsvData = parseCSV(response.data);
                setCsvData(parsedCsvData);
                console.log(parsedCsvData);
            })
            .catch((error) => {
                console.error('Error fetching CSV data:', error);
            });
    }
    //? Parse the CSV data into an array of objects

    function parseCSV(csvText) {
        const rows = csvText.split(/\r?\n/); 
        const headers = rows[0].split(',');    
        const data = [];    
        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(',');   
            const rowObject = {};
            for (let j = 0; j < headers.length; j++) {
                rowObject[headers[j]] = rowData[j];
            }
            data.push(rowObject);
        }
        return data;
    }
    return csvData;
}