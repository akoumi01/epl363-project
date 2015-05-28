describe('Testing for sTeamCollaboration platform', function() {
    it('It should redirect to "/" because havent logged in yet', function() {
        browser.get('http://127.0.0.1/epl363-project/app/#/home');
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual("http://127.0.0.1/epl363-project/app/#/");
    });
    it('The navigation bar must contain the above because it s not login', function() {
        expect(element(by.id('homePage')).isDisplayed()).toBe(true);
        expect(element(by.id('signInModalLink')).isDisplayed()).toBe(true);
        expect(element(by.id('signUpModalLink')).isDisplayed()).toBe(true);
        expect(element(by.id('roomPage')).isDisplayed()).toBe(false);
        expect(element(by.id('messagesPage')).isDisplayed()).toBe(false);
        expect(element(by.id('adminPanelPage')).isDisplayed()).toBe(false);
        expect(element(by.id('editProfilePage')).isDisplayed()).toBe(false);
        expect(element(by.id('navLogOut')).isDisplayed()).toBe(false);
        expect(element(by.id('adminPanelPage')).isDisplayed()).toBe(false);
    });
    it('It should log in', function() {
        element(by.id('signInModalLink')).click();
        element(by.model('userSignIn')).sendKeys('akoumi');
        element(by.model('signInpwd')).sendKeys('123456');
        element(by.id('btnSignIn')).click();
        browser.sleep(2000)
    });
    it('The navigation bar must contain the above because the login was execute', function() {
        expect(element(by.id('roomPage')).isDisplayed()).toBe(true);
        expect(element(by.id('messagesPage')).isDisplayed()).toBe(true);
        expect(element(by.id('adminPanelPage')).isDisplayed()).toBe(true);
        expect(element(by.id('editProfilePage')).isDisplayed()).toBe(true);
        expect(element(by.id('navLogOut')).isDisplayed()).toBe(true);
        expect(element(by.id('adminPanelPage')).isDisplayed()).toBe(true);
        expect(element(by.id('adminPanelPage')).isDisplayed()).toBe(true);
        expect(element(by.id('homePage')).isDisplayed()).toBe(false);
        expect(element(by.id('signInModalLink')).isDisplayed()).toBe(false);
    });
    it('It should open room navigation page', function() {
        element(by.id('roomPage')).click();
            browser.sleep(2000);
    });
    it('It should open akoumi room', function() {
        element(by.id('open12015')).click();
        browser.sleep(2000);
    });
    it('It should creates Room', function() {
        element(by.id('btncreateRoomModal')).click();
        element(by.model('roomName')).sendKeys('Test Room');
        element(by.id('btnCreateRoom')).click();
        browser.sleep(2000);
        var alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual("The room was successfully created.");
        alertDialog.accept();
    });
    it('It should creates  a new text document', function() {
        element(by.id('btncreateNewTextDocumentModal')).click();
        element(by.model('newtxtFileName')).sendKeys('Test document');
        element(by.model('newtxtContent')).sendKeys('My content');
        element(by.id('btnSavaNewTextDocument')).click();
        browser.sleep(2000);
        var alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual("The file was successfully created.");
        alertDialog.accept();
    });
        it('It should opens test text document', function() {
        element(by.id('open12042')).click();
        browser.sleep(2000);
    });
    it('It should change test text document', function() {
        element(by.id('saveTextContent')).sendKeys('Test document');
        element(by.id('btnSavaTextDocument')).click();
        browser.sleep(2000);
        var alertDialog = browser.switchTo().alert();
        expect(alertDialog.getText()).toEqual("The document was saved successfully.");
        alertDialog.accept();
    });
    it('Navigate to home from Navigation pane', function() {

    });
    it('It should log out', function() {
        element(by.id('navLogOut')).click();
    });
}); 
