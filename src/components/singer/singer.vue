<template>
    <div class="singer" ref="singer">
        <list-view
                :data="singers"
                ref="list"
                @select="selectSinger"
        >
        </list-view>
        <router-view></router-view>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
    .singer {
        position: fixed;
        top: 176px;
        bottom: 0;
        height: ~ 'calc(100% - 176px )';
        width: 100%;
    }
</style>
<script type="text/ecmascript-6">
    import {getSingerList} from '../../api/singer';
    import {ERR_OK} from '../../api/config';
    import Singer from '../../common/js/singer';
    import listView from '../../base/listview/listview.vue';
    import {mapMutations} from 'vuex';
    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;
    export default{
        data(){
            return {
                singers: []
            }
        },
        created(){
            this._getSingerList()
        },
        components: {
            listView
        },
        methods: {
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            selectSinger(singer){
                this.setSinger(singer);
                this.$router.push({
                    path: `/singer/${singer.mid}`
                })
            },
            _getSingerList(){
                getSingerList().then(res=> {
                    if (res.code === ERR_OK) {
                        this.singers = this._normalizeSinger(res.data.list);
                    }
                })
            },
            _normalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    },
                    other: {
                        title: '其他',
                        items: []
                    }
                };
                for (let [index,item] of Array.entries(list)) {
//                   热门
                    if (index < HOT_SINGER_LEN) {
                        map.hot.items.push(new Singer({
                            id: item.Fsinger_id,
                            name: item.Fsinger_name,
                            mid: item.Fsinger_mid
                        }));
                    }
//                  a-z
                    if (!map[item.Findex] && /[a-zA-Z]/.test(item.Findex)) {
                        map[item.Findex] = {
                            title: item.Findex,
                            items: []
                        }
                    }
                    if (/[a-zA-Z]/.test(item.Findex)) {
                        map[item.Findex].items.push(new Singer({
                            id: item.Fsinger_id,
                            name: item.Fsinger_name,
                            mid: item.Fsinger_mid
                        }));
                    } else {
                        map.other.items.push(new Singer({
                            id: item.Fsinger_id,
                            name: item.Fsinger_name,
                            mid: item.Fsinger_mid
                        }))
                    }
                }
                let ret = [];
                for (let key in map) {
                    let val = map[key];
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    }
                }
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                });
                return [map.hot, ...ret, map.other];
            }
        }
    }
</script>
