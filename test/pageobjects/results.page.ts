import Page from './page.js'

class ResultsPage extends Page {

    get calculatorResultsSection() {
        return $('#calculator-results-section')
    }
    get resultMessage() {
        return $('#result-message')
    }

    get editInfo() {
        return $('button=Edit info')
    }

    get seeFullResults() {
        return $('button=See full results')
    }

}
export default new ResultsPage();