import Http from './http';
import { from, Subject } from 'rxjs';
import { pipeValue } from 'piepe';
import { tap } from 'rxjs/operators';

export default class UserService {
    private endpoint = `${'a' || _spPageContextInfo.webAbsoluteUrl}/_vti_bin/ListData.svc/UserInformationList`;
    private properties = ['Id', 'Name', 'WorkEmail', 'Account'];
    private http = new Http();

    getUsers(search: string) {
        const uri = this.getRequestUri(search);
        return from(this.http.get(uri));
    }

    private getRequestUri(search: string) {
        return pipeValue(this.endpoint).to(
            addFilter(search),
            addSelect(this.properties),
            convertAmpersandToQuestionMark()
        )
    }
}

function addFilter(searchString) {
    return (url) => `${url}&filter=substringof('${searchString}',Name)`
}

function addSelect(properties: string[]) {
    return (url) => `${url}&$select=${properties.join(',')}`;
}

function convertAmpersandToQuestionMark() {
    return (url) => url.replace('$', '?');
}