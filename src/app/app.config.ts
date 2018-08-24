export const config = {
    filters: {
        orderBy: ['asc','dsc'],
        sortByProp: ['name','population','capital']
    },
    http: {
        hostUrl: 'https://restcountries.eu/rest/v2'
    },
    map: {
        apiKey: 'AIzaSyA5InJmMKA_Avqg24sTgIeYrLZJZiL62Yo',
        regions: [
            {code: "002", name: "Africa", counter: 1},
            {code: "150", name: "Europe", counter: 2},
            {code: "019", name: "Americas", counter: 3},
            {code: "142", name: "Asia", counter: 4},
            {code: "009", name: "Oceania", counter: 5}
        ],
        options: {
            region: 'world',
            resolution: 'continents',
            colorAxis: { colors: ['#af2fbb', '#1986f3', '#0bcc7a', '#f3c936', '#c30101'] },
            backgroundColor: '#453122',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
            displayMode: 'auto',
            showTooltip: true,
            legend: 'none'
          }
    }
}