angular.module('starter.controllers')

function App(id) {
    this.id = id;
    return (this === window)? new App(id) : this;
}
App.prototype = {
    fetch: function() {
        return true;
    }
}
function Cyan() {
    return (this === window) ? new Cyan() : this;
}
Cyan.prototype = {
    USER: null,
    COOKIE: "cookie",

    _listAppsCallback: null,
    _createAccountCallback: null,
    _welcomeCallback: null,

    getUrl: function(page) {
        var proto = (this.tls == true) ? "https" : "http";
        return proto + "://" + this.host + ":" + this.port + "/" + page;
    },
    
  listApps: function(callback) {
        this._listAppsCallback = callback;
        var url = this.getUrl("api/list_apps");
        var that = this;
        console.log(url);
        document.getElementById('wait_app').style.display = '';
        $.ajax({
            url: url,
            data: JSON.stringify({
                username: that.USER.username,
                password: that.USER.password
            }),
            dataType: "json",
            contentType: "application/json",
            type: "POST",
             crossDomain: true,
            success: function(data, textStatus, jqXHR) {
                console.log(textStatus);
                console.log(jqXHR);
                that._listAppsCallback(data);
            },
            error: function(data, textStatus, jqXHR) {
                that._listAppsCallback(null);
                console.log(textStatus);
                console.log(jqXHR);
            },
            complete : function(resultat, statut){
                document.getElementById('wait_app').style.display = 'none';
            }
        });
    },
    
    createAccount: function(callback) {
        this._createAccountCallback = callback;
        var url = this.getUrl("api/create_account");
        var that = this;
        $.ajax({
            url: url,
            data: JSON.stringify({
                username: that.USER.username,
                password: that.USER.password
            }),
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            crossDomain: true
        }).done(function(data, textStatus, jqXHR) {
            that._createAccountCallback(data);
        }).fail(function(data, textStatus, jqXHR) {
            that._createAccountCallback(data);
        });
    },
    welcome: function(callback) {
        this._welcomeCallback = callback;
        var url = this.getUrl("api/welcome");
        var that = this;
        var obj = $.ajax({
            url: url,
            data: JSON.stringify({
                username: that.USER.username,
                password: that.USER.password
            }),
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            success: function(data) {
                that._welcomeCallback(data);
            }
        }).fail(function(data, textStatus, jqXHR) {
            console.log(textStatus);
            that._welcomeCallback(null);
        });
    },

    getAccount: function(callback) {
        this._getAccountCallback = callback;
        var url = this.getUrl("api/get_account");
        var that = this;
        console.log(url);
        document.getElementById('wait').style.display = '';
        $.ajax({
            url: url,
            data: JSON.stringify({
                username: that.USER.username,
                password: that.USER.password
            }),
      //      console.log(data);
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            crossDomain: true,
            success: function(data, textStatus, jqXHR) {
                console.log(textStatus);
                console.log(jqXHR);
                that._getAccountCallback(data);
            },
            error: function(data, textStatus, jqXHR) {
                that._getAccountCallback(null);
                console.log(textStatus);
                console.log(jqXHR);
            },
            complete : function(resultat, statut){
                document.getElementById('wait').style.display = 'none';
            }
        });
    },

    // Set variable username, password into cyan(this)
    use: function(username, password) {
        // Here, do a request to the server to get all the missing informations (email, id, *)
        this.USER = {
            username: username,
            password: password,
            email: "john.doe@gmail.com"
        };
    },
    setCookie: function() {
        // intel.xdk.cache.setCookie(
        //     this.COOKIE,
        //     JSON.stringify({
        //         username: this.USER.username,
        //         password: this.USER.password
        //     }),
        //     -1
        // );
    },
    loadCookie: function() {
        // this.USER = null;
        // var value = intel.xdk.cache.getCookie(this.COOKIE);
        // if (typeof value != "undefined") {
        //     value = JSON.parse(value);
        //     this.use(value.username, value.password)
        // }
    },

    sendJson: function() {
        this._sendJsonCallback = cyan.appSendingFinished;
        var url = this.getUrl("api/send_app");
        var that = this;
        console.log(url);
        document.getElementById('wait_editor').style.display = '';
        tape = new Tar();
        var out = tape.append('index.json', '[{"type": "Title","parameters": {"id": "page_title","importance": 1,"value": "JSON 2 HTML","style": {"text-align": "center"}}},{"type": "Text","parameters": {"id": "text0","value":This is just for the PoC\nTest1\nTest2\n","style": {"font-family": "Droid Sans Mono"}}},{type":Button","parameters": {"id": "button0","action": {"onclick": "alert(\'test\');"},"style": {"label": "hello world","color": "#EDB832","background-color": "#424242","width": "10em","height": "5em"}}}]');
        $.ajax({
            url: url,
            data: JSON.stringify({
                //username: that.USER.username,
                username: "foo",
                password: "foobar",
                //password: that.USER.password,
                name: "App",
                app: out
            }),
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            crossDomain: true,
            success: function(data, textStatus, jqXHR) {
                console.log("SUCCESS");
                console.log(textStatus);
                console.log(jqXHR);
                that._sendJsonCallback(data);
            },
            error: function(data, textStatus, jqXHR) {
                console.log("ERROR");
                console.log(textStatus);
                console.log(jqXHR);
                that._sendJsonCallback(data);
            },
            complete : function(resultat, statut){
                console.log("COMPLETE");
                document.getElementById('wait_editor').style.display = 'none';
            }
        }); 
    },
    
    appSendingFinished: function(data) {
        console.log(data);
    },

    // CallBack GetAccount
    userIdentified: function(data)
    {
        if (data == null || data.status == "KO")
        {
            this.errorMessage = (data) ? (data.msg) : ("An unknown error occured.");
            document.getElementById('error_block').style.display = '';
            document.getElementById('error_message').innerHTML = this.errorMessage;
        }
        else
        {
            this.updateDisplayedUsername();
            loadPage('cyan.main-logged-panel', 'false', 'false', 'fade');
        }
    },

    //Call by button login
    userIdentification: function(username, password)
    {
        console.log(username);
        console.log(password);
        this.use(username, password);
        this.loginFailed = false;
        document.getElementById('error_block').style.display = 'none';
        this.getAccount(cyan.userIdentified);
    },

    appsListingFinish: function(data)
    {
        console.log("appsListingFinish");
        if (data == null || data.status == "KO")
        {
            this.errorMessage = (data) ? (data.msg) : ("An unknown error occured.");
            document.getElementById('error_block_logged').style.display = '';
            document.getElementById('error_message_logged').innerHTML = this.errorMessage;
        }
        else
        {
            v_div_parent = document.getElementById("list-apps-content");
            console.log("v_div_parent = ");
            console.log(v_div_parent);
            for(var key in data.names)
            {
               // $(key).exists(function() {
                 //   this.append('<p>I exist!</p>');
               // });
               //if (!($(key).existe()))
               if(!(document.getElementById(key))) {
                    v_div_enfant = document.createElement("li");
                    v_div_enfant.setAttribute("class","resizable-button");
                    v_div_enfant.setAttribute("id",key);
                    v_div_enfant.setAttribute("value", key);
                    v_div_enfant1 = document.createElement("a");
                    v_div_enfant1.setAttribute("class","button");
                    v_div_enfant1.setAttribute("onclick", "showMoreSheet()");
                  //  v_div_enfant1.setAttribute("id", "idApp" + key);
                    v_div_enfant1.setAttribute("data-toggle", "collapse");
                   // v_div_enfant1.setAttribute("href", "#idApp" + key);
                   // v_div_enfant1.setAttribute("aria-expanded", "true");
                    v_div_enfant1.appendChild(document.createTextNode(data.names[key]));
                    v_div_enfant2 = document.createElement("div");
                    v_div_enfant2.setAttribute("class","collapse");
                    v_div_enfant2.setAttribute("id", "idApp" + key);
                    v_div_enfant2.appendChild(document.createTextNode("test"));
                    v_div_enfant.appendChild(v_div_enfant1);
                    v_div_enfant.appendChild(v_div_enfant2);
                    v_div_parent.appendChild(v_div_enfant);
                } else {
                    v_div_enfant = document.getElementById(key);
                }
            }
        //    v_a_addthis_share = document.createElement("a");
          //v_a_addthis_share.setAttribute("onclick","return false");
          //v_a_addthis_share.setAttribute("href","http://www.addthis.com/bookmark.php?v=250&amp;pub=<username>");
            console.log(data);
            console.log(data.names);
            console.log(data.names[0]);
            console.log(data.status);
            loadPage('#cyan/list-apps-panel', 'false', 'false', 'fade');
        }
    },

    //Call by button list Apps
    appsListing: function()
    {
        document.getElementById('error_block').style.display = 'none';
        this.listApps(cyan.appsListingFinish);
    },

    createNewApp: function(appName)
    {
        console.log("createNewApp");
        document.getElementById('error_block').style.display = 'none';
        var oFiles = document.getElementById('my-file').files[0];
        var nBytes = 0,
            nFiles = oFiles.length;

        for (var nFileId = 0; nFileId < nFiles; nFileId++) {
            nBytes += oFiles[nFileId].size;
        }
        var sOutput = nBytes + " bytes";
          // optional code for multiples approximation
        for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
       }
        this.sendJson(appName, oFiles);
       console.log(nFiles);
       console.log(sOutput);
    },

     userFactory: function(username, password)
    {
        this.use(username, password);
        //this.loginFailed = false;
        document.getElementById('error_block').style.display = 'none';
        this.createAccount(cyan.userIdentified);
    },

    getUsername: function()
    {
        return (this.USER.username);
    },
    
    getUserEmail: function()
    {
        return (this.USER.email);
    },
    getUserPassword: function()
    {
        return (this.USER.password);
    },
    
    updateProfile: function()
    {
        /*var list = document.getElementsByName("displayedEmail");
        var i = 0;
        while (i < list.length)
        {
            list.item(i).prop('readonly', false);
            ++i;
        }*/
        $('[name^="displayed"]').prop('readOnly', false);
        $('[name="lock"]').attr('src', 'images/icon-unlocked-200x200.png');
        $('[name="editProfileButton"]').hide();
        $('[name="saveProfileButton"]').show();
        $('[name="resetProfileButton"]').show();


    },
    resetProfile: function()
    {
        this.updateDisplayedUsername();
        this.updateDisplayedEmail();
        this.updateDisplayedPassword();
        $('[name^="displayed"]').prop('readOnly', true);
        $('[name="lock"]').attr('src', 'images/icon-locked-200x200.png');
        $('[name="saveProfileButton"]').hide();
        $('[name="resetProfileButton"]').hide();
        $('[name="editProfileButton"]').show();

    },
    // Maybe we can merge the following functions into a single one, taking everything as a parameter.
    updateDisplayedUsername: function()
    {
        var list = document.getElementsByName("displayedUsername");
        var i = 0;
        while (i < list.length)
        {
            list.item(i).innerHTML = this.getUsername();
            list.item(i).value = this.getUsername();
            ++i;
        }
    },
    updateDisplayedEmail: function()
    {
        var list = document.getElementsByName("displayedEmail");
        var i = 0;
        while (i < list.length)
        {
            list.item(i).value = this.getUserEmail();
            ++i;
        }
    },
    updateDisplayedPassword: function()
    {
        var list = document.getElementsByName("displayedPassword");
        var i = 0;
        while (i < list.length)
        {
            //list.item(i).innerHTML = this.getUserPassword().replace(/[\S\s]/g, '*');
            list.item(i).value = this.getUserPassword();
            ++i;
        }
    },
      disableSplitView: function()
    {
        var $el=$(document.body);
        $el.removeClass("splitview");
    },
};

document.addEventListener("intel.xdk.device.orientation.change",orientationchange,false);
function orientationchange(value)
{
//Portrait orientation
    var x;
    var i;
    if(value.orientation === 0 || value.orientation == 180)
    {
        x = document.getElementsByClassName("resizable-button");
        for (i = 0; i < x.length; i++) {
            x[i].style.width="90%";
        }
    }
//Landscape orientation
    else
    {
        x = document.getElementsByClassName("resizable-button");
        for (i = 0; i < x.length; i++) {
            x[i].style.width="40%";
        }
    }
}

function loadPage(page, unknown1, unknown2, loadingAnimation)
{
    loadPageControler(page);
}
