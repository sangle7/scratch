import {
    observable
} from 'mobx';

export const AppState = observable({
    login: sessionStorage['scratchLogin'] || 0,
    user: 'sangle',
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

AppState.updateMynotes = function(data) {
    this.mynotes.push(...data)
}
