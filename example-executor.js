const fs = require('fs');
const path = require('path');
const figlet = require('figlet');
const inquirer = require('inquirer');

const scanExamplesByTypology = (typology) => {
    let files = fs.readdirSync(path.resolve(__dirname, 'examples', typology + '-decorators'));
    return files
        .filter((file) => file !== 'index.ts')
        .map((file) => file.split('.')[0]);
}

// Show figlet header
console.log(figlet.textSync('ExampleExecutor', { horizontalLayout: 'default' }));

// Launch questions
inquirer.prompt([
    {
        type: 'list',
        name: 'decoratorType',
        message: 'Select the type of decorator to see its examples',
        choices: ['Class', 'Method', 'Property', 'Parameter', 'Exit']
    }
]).then((firstAnswer) => {
    // The user has chosen to exit
    if(firstAnswer.decoratorType === 'Exit')
        process.exit(0);

    // The user now will choose the concrete example
    let decoratorList = scanExamplesByTypology(firstAnswer.decoratorType.toLowerCase());
    inquirer.prompt([
        {
            type: 'list',
            name: 'exampleToExecute',
            message: 'Select the example to execute',
            choices: decoratorList
        }
    ]).then((secondAnswer) => {
        const execFile = require('child_process').execFile;
        const pathFile = path.resolve(__dirname, 'dist', 'examples', 
                            `${firstAnswer.decoratorType.toLowerCase()}-decorators`, 
                            `${secondAnswer.exampleToExecute}.example.js`);
        const child = execFile('node', [pathFile], (error, stdout, stderr) => {
            if (error) {
                console.error(stderr);
            }
            console.log(stdout);
        });
    });
});