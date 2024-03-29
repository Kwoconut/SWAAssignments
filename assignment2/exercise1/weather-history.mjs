class WeatherHistory {
    constructor(data) {
        this.data = data;
    }

    forPlace = place => new WeatherHistory(this.data.filter(weatherData => weatherData.getPlace() === place));

    forType = type => new WeatherHistory(this.data.filter(weatherData => weatherData.getType() === type));

    forPeriod = period => new WeatherHistory(this.data.filter(weatherData => period.contains(weatherData.getTime())));

    including = data => new WeatherHistory([...this.data, ...data]);

    convertToUsUnits = () => new WeatherHistory(this.data.map(data => {
        if (data.getType() === 'Temperature') {
            return data.convertToF();
        }
        if (data.getType() === 'Precipitation') {
            return data.convertToInches();
        }
        if (data.getType() === 'Wind') {
            return data.convertToMPH();
        }
    }));

    convertToInternationalUnits = () => new WeatherHistory(this.data.map(data => {
        if (data.getType() === 'Temperature') {
            return data.convertToC();
        }
        if (data.getType() === 'Precipitation') {
            return data.convertToMM();
        }
        if (data.getType() === 'Wind') {
            return data.convertToMS();
        }
    }));

    lowestValue = () => { 
        if (this.data.length == 0) {
            return undefined;
        }

        const result = this.data.reduce((acc, entry) => {
            const type = entry.getType();
            const value = entry.getValue();

            acc.types[type] = acc.types[type] + 1 || 1;

            if (acc.lowestValue > value) {
                acc.lowestValue = value;
            }

            return acc;
        }, {types: [], lowestValue: Number.MAX_SAFE_INTEGER});

        return Object.keys(result.types).length > 1 ? undefined : result.lowestValue;
    }

    getData = () => {
        return new WeatherHistory(this.data);
    }
}