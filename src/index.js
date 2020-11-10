import css from './index.less';

import axios from 'axios';


axios.get("/api/info").then(res => {
  console.log('====================================');
  console.log(res);
  console.log('====================================');
});

