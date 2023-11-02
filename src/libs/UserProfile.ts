"use client";

export var UserProfile = (function () {
    var getProfile = function () {
        const profile = localStorage.getItem("user");
        if (profile)
            return JSON.parse(profile)
        return undefined;
    }
    var setProfile = function (user: {}) {
        const profile = localStorage.getItem("user");
        if (profile)
            localStorage.setItem('user', JSON.stringify({ ...JSON.parse(profile), ...user }))
    }
    var getRole = function () {
        const profile = localStorage.getItem("user");
        if (profile)
            return JSON.parse(profile).role;  // Or pull this from cookie/localStorage
        return undefined;
    };

    var setRole = function (role: string) {
        const profile = localStorage.getItem("user");
        if (profile)
            localStorage.setItem("user", JSON.stringify({ ...JSON.parse(profile), role: role }));
        else
            localStorage.setItem("user", JSON.stringify({ role: role }));

        // Also set this in cookie/localStorage
    };
    var getId = function () {
        const profile = window.localStorage.getItem("user");
        if (profile)
            return JSON.parse(profile).id;  // Or pull this from cookie/localStorage
        return undefined;
    };

    var setId = function (id: string) {
        const profile = localStorage.getItem("user");
        if (profile)
            localStorage.setItem("user", JSON.stringify({ ...JSON.parse(profile), id: id }));
        else
            localStorage.setItem("user", JSON.stringify({ id: id }));
    };
    return {
        getProfile,
        setProfile,
        getId,
        setId,
        getRole,
        setRole,
    }

})();