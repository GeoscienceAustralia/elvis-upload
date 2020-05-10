"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var RootCtrl=function e(t){var n=this;_classCallCheck(this,e),t.getConfig().then(function(e){n.data=e,n.state=new State})};RootCtrl.$invoke=["configService"],angular.module("UploadApp",["ngCookies","common.navigation","common.storage","common.templates","common.toolbar","explorer.confirm","explorer.drag","explorer.enter","explorer.flasher","explorer.httpdata","explorer.info","explorer.legend","explorer.message","explorer.modal","explorer.persist","explorer.projects","explorer.tabs","explorer.version","exp.ui.templates","upload.config","upload.file","upload.filedrop","upload.header","upload.templates","ui.bootstrap","ui.bootstrap-slider","page.footer"]).config(["projectsServiceProvider","versionServiceProvider","persistServiceProvider",function(e,t,n){t.url("upload/assets/package.json"),e.setProject("upload"),n.handler("local")}]).factory("userService",["$cookies",function(e){var t=e.get("placenamesUpload").split(";").reduce(function(e,t){var n=t.split("=");return e[n[0]]=n[1],e},{});return{username:function(){return t.username},expires:function(){return new Date(1e3*t.expires)},jurisdiction:function(){return t.jurisdiction},token:function(){return t.token},logout:function(){e.remove("placenamesUpload"),window.location="index.html",t=null}}}]).run(["userService","$timeout","$window",function(e,t,n){try{t(function(){n.location="/"},e.expires().getTime()-Date.now())}catch(e){n.location="/"}}]).controller("RootCtrl",RootCtrl).filter("bytes",function(){return function(e,t){if(isNaN(parseFloat(e))||!isFinite(e))return"-";void 0===t&&(t=0);var n=Math.floor(Math.log(e)/Math.log(1024));return(e/Math.pow(1024,Math.floor(n))).toFixed(t)+" "+["bytes","kB","MB","GB","TB","PB"][n]}});var _config={version:"0.0.1",user:"anon",maxFileSize:67108864,submit:{uploadUrl:"upload"}};function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}angular.module("upload.config",[]).service("configService",["$q",function(n){return{getConfig:function(e){var t=this.config;return e&&(t=t[e]),n.when(t)},get config(){return _config}}}]),angular.module("upload.dialog",["upload.filename","upload.submit"]).directive("acceptProjection",[function(){return{scope:{state:"="},templateUrl:"upload/dialog/isprojection.html"}}]).directive("transformationTarget",["configService",function(e){return{scope:{state:"="},templateUrl:"upload/dialog/transformationtarget.html",link:function(t){e.getConfig("transformation").then(function(e){t.transformations=e})}}}]).directive("uploadDialog",["messageService","submitService","userService",function(n,r,a){return{scope:{state:"=",settings:"="},templateUrl:"upload/dialog/dialog.html",link:function(t){t.cancel=function(){t.state=new State},t.upload=function(){var e=t.state;8388608<=e.file.size?n.warn("File uploading. Large files may take some time."):n.info("Uploading file..."),t.cancel(),r.upload(e.file,a.token()).then(function(e){n.clear(),n.success("File uploaded successfully an email will be sent after it is processed.")}).catch(function(e){n.clear(),n.error("File upload failed. If the file continues to fail, please report.")})}}}}]);var FileController=function e(){_classCallCheck(this,e)};function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}angular.module("upload.file",["upload.dialog"]).directive("file",function(){return{templateUrl:"upload/file/file.html"}}).controller("fileController",FileController),angular.module("upload.filedrop",[]).directive("fileDrop",["messageService",function(o){return{templateUrl:"upload/filedrop/filedrop.html",scope:{state:"="},link:function(i,e){new FileDrop(e[0],function(a){i.$apply(function(){var e,t,n=a.name,r=(r=n.substr(n.lastIndexOf(".")+1))?r.toLowerCase():"";e=r,t=a,i.state.file?o.error('If you are sure you want to replace the file "Remove" the previous file first.'):(i.state.file=t,i.state.type="single",i.state.extension=e,i.state.outputName=t.name.substr(0,t.name.lastIndexOf(".")))})})}}}]),angular.module("upload.filename",[]).directive("filename",[function(){return{scope:{state:"="},templateUrl:"upload/filename/filename.html"}}]),angular.module("upload.header",[]).controller("headerController",["$scope","$q","$timeout",function(n,e,t){n.$on("headerUpdated",function(e,t){n.headerConfig=t})}]).directive("icsmUser",["userService",function(t){return{restrict:"EA",template:"<span><strong>User Name:</strong> {{username}} <strong>Jurisdiction:</strong> {{jurisdiction}}</span>",link:function(e){e.username=t.username(),e.jurisdiction=t.jurisdiction(),e.logout=function(){t.logout()}}}}]).directive("icsmHeader",[function(){var e={heading:"ICSM",headingtitle:"ICSM",helpurl:"help.html",helptitle:"Get help about ICSM",helpalttext:"Get help about ICSM",skiptocontenttitle:"Skip to content",skiptocontent:"Skip to content",quicklinksurl:"/search/api/quickLinks/json?lang=en-US"};return{transclude:!0,restrict:"EA",templateUrl:"upload/header/header.html",scope:{breadcrumbs:"=",current:"=",heading:"=",headingtitle:"=",helpurl:"=",helptitle:"=",helpalttext:"=",skiptocontenttitle:"=",skiptocontent:"=",quicklinksurl:"="},link:function(n){angular.copy(e);angular.forEach(e,function(e,t){t in n||(n[t]=e)})}}}]);var SubmitService=function(){function n(e,t){_classCallCheck(this,n),this.$q=e,this.config=t.config.submit}return _createClass(n,[{key:"upload",value:function(e,t){var n=new FormData,r=this.config;n.append("file",e);var a=new XMLHttpRequest;a.addEventListener("load",function(e){console.log("Completed upload"),200===e.target.status?i.resolve(e.target.response):i.reject(e.target.response)},!1),a.open("POST",r.uploadUrl+"?token="+t),a.send(n);var i=this.$q.defer();return i.promise}}]),n}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}SubmitService.$inject=["$q","configService"],angular.module("upload.submit",[]).service("submitService",SubmitService),angular.module("upload.mandatory",[]).directive("mandatory",function(){return{template:'<span class="mandatory" title="You must provide a value">*</span>'}});var FileDrop=function e(t,n){if(_classCallCheck(this,e),!n||"function"!=typeof n)throw Error("No file handler provided");if(!t)throw Error("No element provided");t.addEventListener("dragenter",function(e){e.stopPropagation(),e.preventDefault(),console.log("dragenter")},!1),t.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),console.log("dragover")},!1),t.addEventListener("drop",function(e){e.stopPropagation(),e.preventDefault(),function(e){if(e)for(var t=0;t<e.length;t++)n(e.item(t))}(e.dataTransfer.files)},!1)};function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}String.prototype.endsWith||(String.prototype.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),Object.values||(Object.values=function(t){return Object.keys(t).map(function(e){return t[e]})});var State=function e(){_classCallCheck(this,e)};angular.module("upload.templates",[]).run(["$templateCache",function(e){e.put("upload/dialog/dialog.html",'<div class="upload-dialog">\r\n   <div class="ud-info" ng-if="!state.file">\r\n      <div style="font-weight: bold">\r\n         <i class="fa fa-hand-o-left point-at-box fa-2x" aria-hidden="true" style="padding-right:12px;"></i>\r\n         Select and drop file for processing\r\n      </div>\r\n      <br/>\r\n      <div>\r\n         <span style="font-weight: bold">Placenames -</span>\r\n         Drop a single file for adding placenames features to the <a href="http://placenames.fsdf.org.au" target="_blank">Placenames Application</a>.\r\n      </div>\r\n\r\n   </div>\r\n\r\n   <div ng-if="state.file">\r\n      <h3>Selected {{state.file.name}} ({{state.file.size | bytes}})</h3>\r\n   </div>\r\n   <div ng-if="state.file.size > settings.maxFileSize">\r\n      The size of the file to be uploaded must not exceed {{settings.maxFileSize | bytes}}. Please select a smaller file.\r\n      <br/><br/>\r\n      <button type="button" class="btn btn-primary" ng-click="cancel()">OK</button>\r\n   </div>\r\n   <div ng-if="state.file.size <= settings.maxFileSize">\r\n      Are you sure you want to upload this file? If this data validates successfully it will overwrite the existing data\r\n      in the <a href="http://placenames.fsdf.org.au" target="_blank"></a>Placenames application</a>.\r\n      <br/>\r\n      <br/>\r\n      <button type="button" class="btn btn-primary" ng-click="upload()">Upload Now</button>\r\n      <button type="button" class="btn btn-primary" ng-click="cancel()">Cancel</button>\r\n   </div>\r\n</div>'),e.put("upload/file/file.html",'<div class="container-fluid file-container" ng-controller="RootCtrl as root">\r\n   <div class="row">\r\n      <div class="col-md-7" style="border-right: 2px solid lightgray">\r\n         <div>\r\n            <h3 style="margin-top:10px">File Drop Directions</h3>\r\n            As a registered submitter of placenames features it is your responsibility to ensure your data is in the approved format. While any file is able to be submitted this page only submits the file for processing. The only message you will receive at this point is that the file has been queued for processing. Later, once the file has been processed you will receive an email describing the success or otherwise of the job.\r\n            <div>\r\n               <div style="padding-bottom:5px">\r\n                  <file-drop state="root.state" />\r\n               </div>\r\n               <input-format list="root.data.fileUploadFormats" />\r\n            </div>\r\n         </div>\r\n\r\n      </div>\r\n      <div class="col-md-5" >\r\n         <upload-dialog state="root.state" settings="root.data"/>\r\n      </div>\r\n   </div>\r\n</div>'),e.put("upload/filedrop/filedrop.html",'<div id="fileDrop" title="Drop a file with Placenames Features here">\r\n   <br/> Drop <br/> File <br/> Here\r\n</div>'),e.put("upload/filename/filename.html",'<div class="input-group">\r\n   <span class="input-group-addon" id="nedf-filename">Filename</span>\r\n   <input type="text" ng-maxlength="30" ng-trim="true" ng-keypress="restrict($event)"\r\n         ng-model="state.outputName" class="form-control"\r\n         placeholder="Filename" aria-describedby="pos-filename" />\r\n   <span class="input-group-addon" id="basic-addon2">.zip</span>\r\n</div>'),e.put("upload/header/header.html",'<div class="container-full common-header" style="padding-right:10px; padding-left:10px">\r\n    <div class="navbar-header">\r\n\r\n        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".ga-header-collapse">\r\n            <span class="sr-only">Toggle navigation</span>\r\n            <span class="icon-bar"></span>\r\n            <span class="icon-bar"></span>\r\n            <span class="icon-bar"></span>\r\n        </button>\r\n        <a href="/" class="appTitle visible-xs">\r\n            <h1 style="font-size:120%">{{heading}}</h1>\r\n        </a>\r\n    </div>\r\n    <div class="navbar-collapse collapse ga-header-collapse">\r\n        <ul class="nav navbar-nav">\r\n            <li class="hidden-xs"><a href="/"><h1 class="applicationTitle">{{heading}}</h1></a></li>\r\n        </ul>\r\n        <ul class="nav navbar-nav navbar-right nav-icons">\r\n        \t<li common-navigation current="current" role="menuitem" style="padding-right:10px"></li>\r\n\t\t\t<li mars-version-display role="menuitem"></li>\r\n\t\t\t<li style="width:10px"></li>\r\n        </ul>\r\n    </div>\x3c!--/.nav-collapse --\x3e\r\n    <div style="position:absolute; bottom:25px; right:15px">\r\n      <icsm-user></icsm-user>\r\n      <button ng-click="logout()" class="btn btn-primary btn-default btn-sm" style="margin-left:20px">Logout</button>\r\n   </div>\r\n</div>\r\n\r\n\x3c!-- Strap --\x3e\r\n<div class="row">\r\n    <div class="col-md-12">\r\n        <div class="strap-blue">\r\n        </div>\r\n        <div class="strap-white">\r\n        </div>\r\n        <div class="strap-red">\r\n        </div>\r\n    </div>\r\n</div>')}]);