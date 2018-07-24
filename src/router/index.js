import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const Recommend = resolve => require(['../components/recommend/recommend'], resolve);
const Singer = resolve => require(['../components/singer/singer'], resolve);
const Rank = resolve => require(['../components/rank/rank'], resolve);
const Search = resolve => require(['../components/search/search'], resolve);
const SingerDeatail = resolve => require(['../components/singer-detail/singer-detail'], resolve);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend', component: Recommend,
      name: 'recommend',
      meta: {title: '推荐页面'}
    },
    {
      path: '/singer',
      component: Singer,
      name: 'Singer',
      meta: {title: ' 歌手页面'},
      children: [
        {
          path:':id',
          component:SingerDeatail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      name: 'rank',
      meta: {title: ' 歌手页面'}
    },
    {
      path: '/search',
      component: Search,
      name: 'search',
      meta: {title: ' 歌手页面'}
    }
  ]
})
