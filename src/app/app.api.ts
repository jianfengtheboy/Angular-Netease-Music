import axios from 'axios'
const limit = 20
export default {
    index_rec() {
        // 首页个人推荐内容：歌单，新歌，mv，电台
        const banner = axios('banner');
        const pl = axios('personalized');
        const ns = axios('personalized/newsong');
        const mv = axios('personalized/mv');
        const djprogram = axios('personalized/djprogram');
        return axios.all([banner, pl, ns, mv, djprogram]).then(
            axios.spread(function(a, b, c, d, e) {
                return Promise.resolve([
                    a.data.banners,
                    b.data.result,
                    c.data.result,
                    d.data.result,
                    e.data.result
                ]);
            })
        );
    },
    index_plcate() {
       // 歌单类型分类列表
       return axios('playlist/catlist');
    },
    index_playlist(type, offset) {
        // 根据类型获取歌单列表
        return axios(
            'top/playlist?limit=' + limit + '&offset=' + offset + '&type=' + type
        )
    },
    index_dj() {
        //首页电台页内容：电台分类，推荐节目，推荐电台，电台列表
        const cate = axios('djradio/catelist')
        const rec_p = axios('program/recommend')
        const rec_dj = axios('djradio/recommend')
        const djlist = this.index_djlist(0)
        return axios.all([cate, rec_p, rec_dj, djlist]).then(
            axios.spread(function (a, b, c, d) {
                return Promise.resolve([a, b, c, d])
            })
        )
    },
    index_djlist(offset) {
        //电台列表
        return axios('djradio/hot?limit=' + limit + '&offset=' + offset)
    },
    index_hqpl(cat, offset) {
        //精品歌单
        return axios('top/playlist/highquality', {
            params : {
                type : cat,
                offset : offset,
                limit : limit
            }
        })
    },
    index_sort() {
        return axios('toplist/detail')
    },
    likeall() {
        return axios('likelist')
    },
    playlist(id, offset) {
        return axios.get(
            'playlist/detail?id=' + id + '&offset=' + offset + '&limit=' + limit
        )
    },
    async music_detail(id) {
        return axios('music/detail?id=' + id)
    },
    music_url(id) {
        return axios('music/url?id=' + id + '&br=128000')
    },
    comments(id, offset, type) {
        id = (type === 1 ? '' : type === 3 ? 'A_DJ_1_' : 'R_SO_4_') + id
        return axios('comments?id=' + id + '&offset=' + offset + '&limit=' + limit)
    },
    fm() {
        return axios('fm')
    },
    lyric(id) {
        return axios('lyric?id=' + id)
    },
    search(name, type, offset) {
        // 类型关键词搜索 type:1单曲；10专辑；100歌手；1000歌单；1004mv；1009电台；1002用户
        return axios(
            'search?keywords=' +
                name +
            '&type=' +
                type +
            '&limit=' +
                limit +
            '&offset=' +
                offset
        )
    },
    search_suggest(s) {
        return axios('search/suggest?keywords=' + s)
    },
    search_hot() {
        return axios('search/hot')
    },
    search_multimatch(s, t) {
        return axios('search/multimatch?type=' + t + '&keywords=' + s)
    },
    dj_detail(id) {
        return axios('dj/detail?id=' + id)
    },
    dj_getprogram(id, offset) {
        return axios('dj/program', {
            params : {
                id : id,
                offset : offset,
                limit : limit
            }
        })
    },
    dj_sub(id, t) {
        return axios('dj/sub', {
            params : {
                id : id,
                t : t
            }
        })
    },
    program_detail(id) {
        return axios('program/detail', {
            params : {
                id : id
            }
        })
    },
    program_like(id, t) {
        return axios('resource/like', {
            params : {
                id : id,
                t : t
            }
        })
    },
    user_detail(id) {
        return axios('user/detail?uid=' + id)
    },
    user_playlist(id, offset) {
        return axios(
            'user/playlist?uid=' + id + '&offset=' + offset + '&limit=' + limit
        )
    },
    user_radio(id) {
        return axios('user/radio', {
            params : {
                uid : id
            }
        })
    },
    user_event(id, offset) {
        return axios('event/get', {
            params : {
                id : id,
                offset : offset,
                limit : limit
            }
        })
    },
    user_subcount(id) {
        return axios('user/subcount/' + id)
    },
    user_cloud(offset) {
        return axios('user/cloud', {
            params : {
                offset : offset,
                limit : limit,
                auth : true
            }
        })
    },
    user_recs() {
        return axios('recommend/songs', {
            params : {
                auth : true
            }
        })
    },
    user_sublist(t, offset) {
        return axios('sublist/' + t, {
            params : {
                auth : true,
                offset : offset,
                limit : limit
            }
        })
    },
    event_list(offset) {
        return axios('event/list', {
            params : {
                auth : true,
                offset : offset,
                limit : limit
            }
        })
    },
    video_detail(id) {
        return axios('video/detail', {
            params : {
                id : id
            }
        })
    },
    video_playurl(id, br) {
        return axios('video/playurl', {
            params : {
                id : id,
                br : br
            }
        })
    },
    video_rcmd(id) {
        return axios('video/rcmd', {
            params : {
                id : id
            }
        })
    },
    video_statistic(id) {
        return axios('video/statistic', {
            params : {
                id : id
            }
        })
    },
    video_info(id) {
        return axios('video/info', {
            params : {
                id : id
            }
        })
    },
    topic_detail(id) {
        return axios('topic/detail', {
            params : {
                id : id
            }
        })
    },
    async mine() {
        return await axios('mine')
    }
}
