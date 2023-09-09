const { format } = require("date-fns");

class Validates {
    static formatDate(date) {
        const dateFormated = format(new Date(date), "dd/MM/yyyy")
        return dateFormated 
    }
}

module.exports = { Validates };