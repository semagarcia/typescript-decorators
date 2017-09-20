import { LoggerProperty } from '../../src/property-decorators';

export class LoggerPropertyExample {
    @LoggerProperty()
    private name: string;

    @LoggerProperty({
        prefix: '[PROP-GETTER-LOGGER]',
        getter: false
    })
    public surname: string;

    @LoggerProperty({
        prefix: '[PROP-GET/SET-LOGGER]',
        getter: true,
        setter: true
    })
    city: string;

    getName() {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }
}

let exampleClass = new LoggerPropertyExample();

// Name property
exampleClass.setName('Sema');

// Surname property
exampleClass.surname = 'García';
const surname = exampleClass.surname;

// City property
exampleClass.city = 'Córdoba';
const city = exampleClass.city;