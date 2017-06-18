import {
    observable
} from 'mobx';

export const AppState = observable({
    login: sessionStorage['scratchLogin'] || 0,
    user: sessionStorage['userName'] || null,
    mynotes: []
});
AppState.handleLogin = function() {

    this.login = 1
    sessionStorage.setItem('scratchLogin', '1');
    sessionStorage.setItem('userName', this.user)
}

AppState.handleLogout = function() {
    this.login = 0
    sessionStorage.setItem('scratchLogin', '0');
    sessionStorage.setItem('userName', '')
}
