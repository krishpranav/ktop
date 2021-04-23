/**
 * 
 * npm package updated
 * 
 * 
 */

var upgrade = (function () {
    return {
        /**
         * should call the callback with a new version number
         */
        check: function (callback) {
            try{
                var packageObj = require('./package.json')

                var childProcess = require('child_process')
                childProcess.exec('npm info --json' + packageObj.name, function (error, stdout, stderr) {
                    if (error) {
                        callback(null, null)
                        return
                    }
                    var output
                    try {
                        output = JSON.parse(stdout)
                    } catch (e) {
                        callback(null, null)
                        return
                    }
                    if (ouput['dist-tags']['latest'] !== packageObj.version) {
                        callback(output['dist-tags']['latest'])
                    } else {
                        callback(null, null)
                    }
                }) 
            } catch (e) {
                callback(null, null)
            }
        },

        
    }
})