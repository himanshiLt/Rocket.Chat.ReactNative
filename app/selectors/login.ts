import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import { IApplicationState, IUser } from '../definitions';

export interface IServices {
	facebook: { clientId: string };
	github: { clientId: string };
	gitlab: { clientId: string };
	google: { clientId: string };
	linkedin: { clientId: string };
	'meteor-developer': { clientId: string };
	wordpress: { clientId: string; serverURL: string };
}

const getUser = (state: IApplicationState): Partial<IUser> => {
	if (!isEmpty(state.share?.user)) {
		return state.share.user;
	}
	return state.login?.user;
};
const getLoginServices = (state: IApplicationState) => (state.login.services as IServices) || {};
const getShowFormLoginSetting = (state: IApplicationState) => (state.settings.Accounts_ShowFormLogin as boolean) || false;
const getIframeEnabledSetting = (state: IApplicationState) => (state.settings.Accounts_iframe_enabled as boolean) || false;

// TODO: we need to change 42 files to fix a correct type, i believe is better to do this later
export const getUserSelector = createSelector([getUser], user => user) as any;

export const getShowLoginButton = createSelector(
	[getLoginServices, getShowFormLoginSetting, getIframeEnabledSetting],
	(loginServices, showFormLogin, iframeEnabled) =>
		(showFormLogin || Object.values(loginServices).length || iframeEnabled) as boolean
);
