
export const TestData = {
  urls: {
    login: 'https://middleofficeqa.croeminc.com:9083/auth/login',
    idsLogin: 'https://middleoffice-qa-ids.croeminc.com:8443/web/Account/Login',
    appHome: 'https://middleofficeqa.croeminc.com:9083/',
  },
  users: {
    qaUser: {
      username: process.env.QA_USERNAME ?? '',
      password: process.env.QA_PASSWORD ?? '',
    },
  },
};
