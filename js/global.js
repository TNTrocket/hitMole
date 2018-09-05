define(function () {
    var operate = null;
    if (window.localStorage) {
        operate = localStorage
    } else {
        operate = cookie
    }

    function localStorage() {
        function set(name, value) {
            if (typeof value === "object") {
                value = JSON.stringify(value)
            }
            window.localStorage.setItem(name, value)
        }

        function get(name) {
            return window.localStorage.getItem(name)
        }

        function remove(name) {
            window.localStorage.removeItem(name)
        }

        function clear() {
            window.localStorage.clear()
        }

        return {
            get: get,
            set: set,
            remove: remove,
            clear: clear
        }
    }

    function cookie() {
        function set(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function get(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function remove(name) {
            set(name, '', -1)
        }

        return {
            set: set,
            get: get,
            remove: remove
        }
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2]; return null;
    }
    return {
        operate : operate(),
        getQueryString: getQueryString
    }
});