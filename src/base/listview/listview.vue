<template>
    <scroll
            :data="data"
            class="listview"
            ref="listview"
            :listen-scroll='listenScroll'
            :probe-type="probeType"
            @scroll="scroll"
    >
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <uL>
                    <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </uL>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li v-for="(item, index) in shortcutList"
                    @touchstart.stop.prevent="onShortcutTouchStart(index,$event)"
                    @touchmove.stop.prevent="onShortcutTouchMove(index,$event)"
                    @touchend.stop
                    class="item"
                    ref="navList"
                    :class="{'current':currentIndex===index}"
                >{{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixedTitle">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div v-show="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import "listview.less";
</style>
<script type="text/ecmascript-6">
    import Scroll from '../../base/scroll/scroll.vue';
    import Loading from '../../base/loading/loading.vue';
    export default{
        data() {
            return {
                scrollY: -1,
                currentIndex: 0,
                diff: -1,
                fixedHeight:0
            }
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        components: {
            Scroll,
            Loading
        },
        created() {
            this.probeType = 3;
            this.listenScroll = true;
            this.touch = {};
            this.listHeight = [];
        },
        computed: {
            shortcutList() {
                return this.data.map(group => group.title.substr(0, 1))
            },
            fixedTitle(){
                if (this.scrollY > 0) {
                    return '';
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        methods: {
            selectItem(item){
                this.$emit('select',item)
            },
            onShortcutTouchStart(index, event){
                this.touch.y1 = event.touches[0].pageY;
                this.touch.anchorIndex = index;
                this.touch.itemHeight = this.$refs.navList[0].getBoundingClientRect().height;
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
                this.scrollY = -this.listHeight[index];
            },
            onShortcutTouchMove(index, event){
                this.touch.y2 = event.touches[0].pageY;
                let anchorIndex = (this.touch.y2 - this.touch.y1) / this.touch.itemHeight | 0;
                let srcollIndex = (anchorIndex + this.touch.anchorIndex);
                this.$refs.listview.scrollToElement(this.$refs.listGroup[srcollIndex]);
            },
            scroll(pos){
                this.scrollY = pos.y;
            },
            _calculateHeight(){
                const list = this.$refs.listGroup;
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._calculateHeight()
                }, 20)
            },
            scrollY(newY) {
                const listHeight = this.listHeight;
                // 当滚动到顶部，newY>0
                if (newY > 0) {
                    this.currentIndex = 0;
                    return
                }
                // 在中间部分滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return
                    }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2
            },
            diff(newVal){
                if(!this.fixedHeight){
                    this.fixedHeight=this.$refs.fixedTitle.getBoundingClientRect().height;
                }
                let fixedTop = (newVal > 0 && newVal < this.fixedHeight) ?
                        (newVal - this.fixedHeight) :
                        0;
                if (this.fixedTop === fixedTop) {
                    return;
                }
                this.fixedTop = fixedTop;
                this.$refs.fixedTitle.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        }
    }
</script>
