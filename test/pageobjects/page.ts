export default class Page {

    get acceptCookiesBtn() {return $('#onetrust-accept-btn-handler')}

    async open (path: string) {
        return await browser.url(path);
    }
    
    /**
     * Method to accept Cookies after opening the web page
     */
    public async acceptCookies(){
        await browser.pause(3000)
        if(await this.acceptCookiesBtn.isExisting()){
            await this.acceptCookiesBtn.waitForClickable({timeout: 10000})
            await this.acceptCookiesBtn.click();
        }
        
    }
}
