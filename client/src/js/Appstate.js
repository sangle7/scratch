import {
    observable
} from 'mobx';

export const AppState = observable({
    login: sessionStorage['scratchLogin'] || 0,
    user: null,
    mynotes: []
});
AppState.handleLogin = function() {

    this.login = 1
    sessionStorage.setItem('scratchLogin', '1');
}

AppState.handleLogout = function() {
    this.login = 0
    sessionStorage.setItem('scratchLogin', '0');
}
