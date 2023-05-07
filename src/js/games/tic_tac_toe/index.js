window.onload = function() {
    (new Image).src = "https://app-98511.games.s3.yandex.net/98511/zao1bol1ycwnujsdqdma9hcpx4myxcka/images/k.svg",
    (new Image).src = "https://app-98511.games.s3.yandex.net/98511/zao1bol1ycwnujsdqdma9hcpx4myxcka/images/n.svg";
    let t, e, i, s = !0;
    const h = new Vue({
        el: ".game",
        data: {
            menu: !0,
            content: !1,
            levels: !1,
            field: [],
            size: 3,
            allMoves: 0,
            myStroke: "O",
            allWinsArr: [],
            enemyStroke: "X",
            withoutBorder: !1,
            aiMoving: !1,
            numOfGames: 0,
            winArr: [],
            isTwo: !1,
            isEnding: !1
        },
        methods: {
            clickCell(t, e) {
                this.aiMoving || this.isEnding || 0 === this.field[t][e] && (this.field[t].splice(e, 1, this.myStroke),
                this.allMoves++,
                this.testEnd(!0, t, e) || (this.withoutBorder && this.allMoves % 11 == 0 && this.expandBorders(),
                this.isTwo ? this.changeStroke() : this.withoutBorder ? this.aiWithoutBorderMove() : this.aiMove()))
            },
            expandBorders() {
                let t = this.field.length + 2;
                this.size = t;
                let e = [[]];
                for (let i = 0; i < t; i++)
                    e[0].push(0);
                for (let i = 1; i < t - 1; i++) {
                    e.push([0]);
                    for (let t = 0; t < this.field.length; t++)
                        e[i].push(this.field[i - 1][t]);
                    e[i].push(0)
                }
                e.push([]);
                for (let i = 0; i < t; i++)
                    e[e.length - 1].push(0);
                this.field = e
            },
            aiMove() {
                this.aiMoving = !0;
                let t = function(t) {
                    let e = h.enemyStroke
                      , i = h.myStroke
                      , s = h.allWinsArr
                      , r = n(t, s, e);
                    if (r)
                        return r;
                    let l = n(t, s, i);
                    if (l)
                        return l;
                    let a = o(t, s, e, i)
                      , c = o(t, s, i, e);
                    if (a && c)
                        for (let t = 0; t < a.length; t++) {
                            let e = a[t][0]
                              , i = a[t][1];
                            for (let t = 0; t < c.length; t++)
                                if (e === c[t][0] && i === c[t][1])
                                    return [e, i]
                        }
                    if (a) {
                        let t = a[Math.floor(Math.random() * a.length)];
                        return [(t = t[Math.floor(Math.random() * t.length)])[0], t[1]]
                    }
                    let u = Math.floor(t.length / 2);
                    if (t.length % 2 == 0) {
                        let e = u - (Math.random() > .5 ? 1 : 0)
                          , i = u - (Math.random() > .5 ? 1 : 0);
                        if (0 === t[e][i])
                            return [e, i]
                    }
                    return 0 === t[u][u] ? [u, u] : function t(e) {
                        let i = Math.floor(e.length * Math.random())
                          , s = Math.floor(e.length * Math.random());
                        return 0 === e[i][s] ? [i, s] : t(e)
                    }(t)
                }(this.field);
                this.move(t[0], t[1])
            },
            restartGame() {
                this.allMoves = 0,
                this.withoutBorder && (this.size = 5),
                this.startLevel(this.size)
            },
            gameWithoutBorder() {
                this.withoutBorder = !0,
                this.allMoves = 0,
                this.startLevel(5)
            },
            aiWithoutBorderMove() {
                this.aiMoving = !0;
                let t = i.whereToGo();
                this.move(t[0], t[1])
            },
            move(t, e) {
                let i = this.numOfGames;
                setTimeout(()=>{
                    i === this.numOfGames && (this.field[t].splice(e, 1, this.enemyStroke),
                    this.aiMoving = !1,
                    this.allMoves++,
                    this.testEnd(!1, t, e) || this.withoutBorder && this.allMoves % 11 == 0 && this.expandBorders())
                }
                , 800)
            },
            testEnd(t, i, s) {
                let h = this.withoutBorder ? e.checkWin(i, s) : function(t, e) {
                    for (let i = 0; i < e.length; i++) {
                        let s;
                        for (let h = 0; h < e[i].length; h++) {
                            let r = e[i][h];
                            if (0 === t[r[0]][r[1]])
                                break;
                            if (0 === h && (s = t[r[0]][r[1]]),
                            t[r[0]][r[1]] !== s)
                                break;
                            if (h === t[0].length - 1)
                                return e[i]
                        }
                    }
                    return []
                }(this.field, this.allWinsArr);
                if (0 !== h.length) {
                    this.winArr = [];
                    for (let t = 0; t < h.length; t++)
                        this.winArr.push(h[t][0] + "-" + h[t][1]);
                    return this.isEnding = !0,
                    this.showEnd(),
                    !0
                }
                if (this.withoutBorder)
                    return !1;
                for (let t = 0; t < this.size; t++)
                    for (let e = 0; e < this.size; e++)
                        if (0 === this.field[t][e])
                            return !1;
                return this.isEnding = !0,
                this.showEnd(),
                !0
            },
            showEnd() {
                let e = this.numOfGames;
                setTimeout(()=>{
                    s && t && t(),
                    this.numOfGames === e && this.restartGame()
                }
                , 2e3)
            },
            getLevels() {
                this.withoutBorder = !1,
                this.menu = !1,
                this.levels = !0
            },
            changeStroke() {
                let t = this.myStroke;
                this.myStroke = this.enemyStroke,
                this.enemyStroke = t
            },
            startLevel(t) {
                this.menu = !1,
                this.isEnding = !1,
                this.winArr = [],
                this.aiMoving = !1,
                this.levels = !1,
                this.content = !0,
                this.numOfGames++,
                this.changeStroke(),
                this.size = t,
                this.allWinsArr = function(t) {
                    let e = [];
                    for (let i = 0; i < t; i++) {
                        let s = []
                          , h = [];
                        for (let e = 0; e < t; e++)
                            s.push([i, e]),
                            h.push([e, i]);
                        e.push(s),
                        e.push(h)
                    }
                    let i = []
                      , s = []
                      , h = t;
                    for (let e = 0; e < t; e++)
                        h--,
                        i.push([e, e]),
                        s.push([e, h]);
                    return e.push(i),
                    e.push(s),
                    e
                }(t);
                let e = [];
                for (let i = 0; i < t; i++) {
                    e.push([]);
                    for (let s = 0; s < t; s++)
                        e[i].push(0)
                }
                this.field = e,
                this.myStroke = "X",
                this.enemyStroke = "O",
                this.isTwo || this.numOfGames % 2 == 0 && (this.myStroke = "O",
                this.enemyStroke = "X",
                this.withoutBorder ? this.aiWithoutBorderMove() : this.aiMove())
            },
            returnMenu() {
                this.numOfGames += 2,
                this.content = !1,
                this.levels = !1,
                this.result = !1,
                this.menu = !0
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                document.querySelector(".start").remove()
            })
        }
    });
    window.YaGames && window.YaGames.init({
        adv: {
            onAdvClose: t=>{
                t || (s = !0)
            }
        }
    }).then(e=>{
        var i = e.yandexApp && e.yandexApp.enabled;
        "serviceWorker"in navigator && !i && navigator.serviceWorker.register("sw.js").then(function(t) {
            console.log("Registration succeeded. Scope is " + t.scope)
        }).catch(function(t) {
            console.error("Trouble with sw: ", t)
        }),
        t = (()=>{
            s = !1,
            e.adv.showFullscreenAdv(),
            setTimeout(()=>{
                s = !0
            }
            , 2e5)
        }
        )
    }
    );
    const r = [[], [], [], [], [], []];
    r[1][1] = .1,
    r[2][1] = 2,
    r[3][1] = 4,
    r[4][1] = 6,
    r[5][1] = 200,
    r[1][2] = .25,
    r[2][2] = 5,
    r[3][2] = 7,
    r[4][2] = 100,
    r[5][2] = 200,
    r[5][0] = 200;
    class l {
        constructor(t=0, e=0, i=1) {
            this.capability = t,
            this.potential = e,
            this.divider = i
        }
        countWeigth() {
            return r[(this.capability,
            this.potential)] / this.divider
        }
    }
    function n(t, e, i) {
        for (let s = 0; s < e.length; s++) {
            let h, r = 0;
            for (let l = 0; l < e[s].length; l++) {
                let n = e[s][l];
                if (t[n[0]][n[1]] === i)
                    r++;
                else {
                    if (t[n[0]][n[1]] !== i && 0 !== t[n[0]][n[1]]) {
                        r = -100;
                        break
                    }
                    h = [n[0], n[1]]
                }
            }
            if (r === t[0].length - 1)
                return h
        }
        return !1
    }
    function o(t, e, i, s) {
        let h = {};
        for (let r = 0; r < e.length; r++) {
            let l = 0
              , n = !1
              , o = [];
            for (let h = 0; h < e[r].length; h++) {
                let a = e[r][h];
                if (t[a[0]][a[1]] === i)
                    l++;
                else {
                    if (t[a[0]][a[1]] === s) {
                        n = !0;
                        break
                    }
                    o.push(a)
                }
            }
            n || l > 0 && (h[l] || (h[l] = []),
            h[l].push(o))
        }
        let r = Object.keys(h);
        return 0 !== r.length && h[r[r.length - 1]]
    }
    e = new class {
        constructor() {
            this.gBorder = {
                left: 1 / 0,
                top: 1 / 0,
                right: -1,
                bottom: -1
            },
            this.preFig = null,
            this.score = 0
        }
        checkWin(t, e) {
            let i = r(t, e);
            if (!i)
                return !1;
            let s = [];
            return l(t, e, 1, 0),
            l(t, e, 0, 1),
            l(t, e, 1, 1),
            l(t, e, 1, -1),
            s.length >= 5 ? s : [];
            function r(t, e) {
                return h.field[t] && void 0 !== h.field[t][e] ? h.field[t][e] : "b"
            }
            function l(t, e, h, l) {
                if (!(s.length >= 5)) {
                    for (s = [],
                    t = +t,
                    e = +e; r(t - h, e - l) === i; )
                        t -= h,
                        e -= l;
                    for (; r(t, e) === i; )
                        s.push([t, e]),
                        t += h,
                        e += l
                }
            }
        }
        countWeight(t, e) {
            let i = this.getAllAttacks(t, e);
            if (!i)
                return;
            let s = 0;
            return (s += l.call(this, i.x, "X")) + l.call(this, i.o, "O");
            function l(t, e) {
                let i = 0
                  , s = 0;
                return ["0", "45", "90", "135"].forEach(l=>{
                    this.isBreakPoint(t[l]) && 2 == ++s ? i += 100 : t[l].forEach(t=>{
                        t.capability >= 5 && e === h.enemyStroke && (i += 100);
                        try {
                            i += r[t.capability][t.potential] / t.divider
                        } catch (t) {}
                    }
                    )
                }
                ),
                i
            }
        }
        getAllAttacks(t, e) {
            if (0 !== h.field[t][e])
                return !1;
            let i = []
              , s = [];
            return i[0] = this.getAttacksLine(t, e, "X", 1, 0),
            i[90] = this.getAttacksLine(t, e, "X", 0, 1),
            i[45] = this.getAttacksLine(t, e, "X", 1, -1),
            i[135] = this.getAttacksLine(t, e, "X", 1, 1),
            s[0] = this.getAttacksLine(t, e, "O", 1, 0),
            s[90] = this.getAttacksLine(t, e, "O", 0, 1),
            s[45] = this.getAttacksLine(t, e, "O", 1, -1),
            s[135] = this.getAttacksLine(t, e, "O", 1, 1),
            {
                x: i,
                o: s
            }
        }
        getAttacksLine(t, e, i, s, r) {
            let n = new class {
                constructor() {
                    this.subFig = "X",
                    this.Attacks = [],
                    this.curAttack = new l,
                    this.iter = 1,
                    this.checkEdge = !1,
                    this.attackplace = 1
                }
                getAttacks(t, e, i, s, h) {
                    this.substitudeFigure(i);
                    for (let i = t - s, r = e - h; Math.abs(i - t) <= 5 && Math.abs(r - e) <= 5 && !this.checkCell(i, r); i -= s,
                    r -= h)
                        ;
                    this.turnAround();
                    for (let i = t + s, r = e + h; Math.abs(i - t) <= 5 && Math.abs(r - e) <= 5 && !this.checkCell(i, r); i += s,
                    r += h)
                        ;
                    return this.Attacks
                }
                checkCell(t, e) {
                    let i = h.field[t] && void 0 !== h.field[t][e] ? h.field[t][e] : "b";
                    if (4 === this.iter && i === this.subFig)
                        this.checkEdge = !0;
                    else if (5 === this.iter)
                        return this.checkEdgeCell(t, e),
                        0;
                    if (this.iter++,
                    "O" === i || "X" === i) {
                        if (this.subFig !== i)
                            return this.Attacks.push(this.curAttack),
                            i;
                        this.curAttack.capability++,
                        this.attackplace++
                    } else {
                        if ("b" === i)
                            return this.Attacks.push(this.curAttack),
                            "b";
                        this.curAttack.capability && (this.curAttack.potential++,
                        this.Attacks.push(this.curAttack),
                        this.curAttack = new l,
                        this.curAttack.potential++),
                        this.curAttack.divider++,
                        this.attackplace++
                    }
                }
                substitudeFigure(t) {
                    this.subFig = t,
                    this.curAttack.capability++
                }
                checkEdgeCell(t, e) {
                    if (this.checkEdge) {
                        let i = h.field[t] && void 0 !== h.field[t][e] ? h.field[t][e] : "b";
                        i !== this.curFig && 0 !== i || this.curAttack.potential++,
                        this.curAttack.capability && this.Attacks.push(this.curAttack)
                    }
                }
                turnAround() {
                    this.iter = 1,
                    this.checkEdge = !1,
                    this.curAttack = this.Attacks[0],
                    this.Attacks.splice(0, 1)
                }
            }
            ;
            return n.getAttacks(t, e, i, s, r),
            this.filterAttacks(n)
        }
        filterAttacks(t) {
            let e = [];
            return t.attackplace >= 5 && t.Attacks.forEach(t=>{
                (t.capability && t.potential || t.capability >= 5) && e.push(t)
            }
            ),
            t.Attacks = e,
            e
        }
        isBreakPoint(t) {
            if (!t || !t.length)
                return !1;
            let e;
            if (t.forEach(t=>{
                1 === t.divider && (e = t)
            }
            ),
            e.capability >= 4)
                return !0;
            if (2 === e.potential && e.capability >= 3)
                return !0;
            let i = !1;
            return t.forEach(t=>{
                let s = e.capability;
                2 === t.divider && (2 === e.potential && 2 === t.potential && s++,
                s + t.capability >= 4 && (i = !0))
            }
            ),
            i
        }
    }
    ,
    i = new class {
        constructor(t) {
            this.botFig = t,
            this.lock = !1
        }
        whereToGo() {
            let t = 0
              , i = 0
              , s = 0;
            for (let r = 0; r < h.size; r++)
                for (let l = 0; l < h.size; l++) {
                    let h = e.countWeight(l, r);
                    h > t && (t = h,
                    i = l,
                    s = r)
                }
            return [i, s]
        }
    }
    ("O")
}
;
