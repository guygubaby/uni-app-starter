enum storageKeys {
  'OPENID' = 'epac_wx_h5_openid',
  'PERSON_NAME' = 'epac_user_real_name',
  'TOKEN' = 'epac_auth_token',
  'ACCOUNT_TYPE' = 'epac_account_type',
  'WORKER_TOKEN' = 'epac_worker_token',
  'USER_TOKEN' = 'epac_user_token',
  'LAST_TIME_LOCATION' = 'epac_last_time_location',
}
enum httpCode {
  'SUCCESS' = 1000,
  'FAIL' = 1001,
  'TOKEN_EXPIRED' = 1002,
  'TOKEN_INVALID' = 1003,
  'NO_AUTH' = 1401,
}
export { storageKeys, httpCode }
