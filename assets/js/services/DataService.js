export function DataService() {
}

DataService.prototype.fetchData = function (url) {
    try {
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            })
    } catch (error) {
        console.log(error);
    }
}