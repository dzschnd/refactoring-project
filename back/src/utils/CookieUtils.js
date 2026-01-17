export const setAuthCookies = (res, refreshToken, accessToken) => {
    const isSecure = process.env.COOKIE_SECURE === 'true';
    const sameSite = isSecure ? 'None' : 'Lax';
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: sameSite,
        path: '/auth/refresh',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: sameSite,
        path: '/',
        maxAge: 60 * 60 * 1000
    });
}

export const clearAuthCookies = (res) => {
    const isSecure = process.env.COOKIE_SECURE === 'true';
    const sameSite = isSecure ? 'None' : 'Lax';
    res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: isSecure,
        sameSite: sameSite,
        path: '/auth/refresh',
        maxAge: 0
    });

    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: isSecure,
        sameSite: sameSite,
        path: '/',
        maxAge: 0
    });
}
