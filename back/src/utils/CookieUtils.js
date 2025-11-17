export const setAuthCookies = (res, refreshToken, accessToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/auth/refresh',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: 60 * 60 * 1000
    });
}

export const clearAuthCookies = (res) => {
    res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/auth/refresh',
        maxAge: 0
    });

    res.cookie('accessToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: 0
    });
}