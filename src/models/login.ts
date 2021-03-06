import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin, getRegister } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export type CurrentUser = {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
};

export type StateType = {
  currentUser?: CurrentUser;
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<StateType>;
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      if (payload.type === "mobile") {
        const response = yield call(getRegister, payload);
        if (response && response.data) {
          response.data.currentAuthority = 'admin'
        }
        yield put({
          type: 'changeLoginStatus',
          payload: response.data,
        });
        
      } else {
        const response = yield call(fakeAccountLogin, payload);
        if (response && response.data) {
          response.data.currentAuthority = 'admin'
          // response.data.status = 'ok'
        }
        yield put({
          type: 'changeLoginStatus',
          payload: response.data,
        });
        // Login successfully
        if (response.code === 200) {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          message.success('🎉 🎉 🎉  登录成功！');
          // const res = yield call(queryCurrent);
          yield put({
            type: 'saveCurrentUser',
            payload: response.data,
          });
          localStorage.setItem('currentUser', JSON.stringify(response.data))
          let { redirect } = params as { redirect: string };
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }
          history.replace(redirect || '/');
        }
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        localStorage.removeItem('currentUser')
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeLoginStatus(state, { payload }) {
      console.log(8, state, payload)
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
