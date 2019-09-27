import { LitElement, html, customElement, property } from 'lit-element';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import UserService from './helper/user-service';

@customElement('sharepoint-peoplepicker')
export class SharepointPeoplepicker extends LitElement {
    private search$: Subscription;
    private _userService: UserService;

    @property({ type: Array }) availableUsers = []

    render() {
        return html`
            <input type="text"></input>
            <ul>
                ${ this.availableUsers.map(u => html`<li>${JSON.stringify(u)}</li>`) }
            </ul>
        `
    }

    firstUpdated(props) {
        super.firstUpdated(props);

        this._userService = new UserService();
        this.search$ = fromEvent(this.inputEl, 'keydown')
            .pipe(debounceTime(500))
            .subscribe(() => this.searchForUsers())
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.search$.unsubscribe();
    }

    get inputEl() {
        return this.shadowRoot.querySelector('input');
    }

    searchForUsers() {
        this._userService.getUsers(this.inputEl.value)
            .subscribe(u => this.refreshUsers(u));
    }

    refreshUsers(users) {
        this.availableUsers = users;
    }

}
